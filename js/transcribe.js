// Shared "upload your own recording → notes" pipeline — used by both
// the Practice tab and the Discover tab's upload entry point, so there
// is exactly one real implementation, not two parallel copies.
//
// Item 44: renderTranscribedPlayback() below replaces the old bare
// "Play it + one highlighted key" view in both callers with the same
// falling-notes highway the curated lesson/song-mastery flow uses
// (note-highway.js), plus a real speed control — not a second
// visualizer built just for uploads.

import { renderKeyboard, playTone, midiToName } from "./keyboard.js";
import { renderNoteHighway } from "./note-highway.js";
import { playBeat } from "./drums.js";
import { getAudioContext } from "./keyboard.js";

// Item 44: a short cleanup pass on basic-pitch's raw note output.
//
// Item 56, re-tuned after testing against recordings with KNOWN notes
// (a melody, a chord progression, and both together). basic-pitch's
// pitches and onsets were right for every real note (within ~10ms) —
// the problems were all in this cleanup step:
//  - It merged any same-pitch notes that touched. But two presses of
//    the same key always touch, so "E E F G G" came back as one long E
//    and one long G. Same-pitch fragments are now only joined when the
//    later one is a tiny sliver (a pitch wobble), never a full note.
//  - Faint overtones came through as notes: a quiet copy an octave,
//    a 12th, two octaves or a 17th above a louder note starting at the
//    same moment (the piano's own harmonics). Those are dropped when
//    they're well under half as loud as the note they shadow — a real
//    played octave is about as loud as its partner, so it stays.
//  - Very short, quiet blips (under ~0.12s and quiet) are dropped.
const OVERTONE_INTERVALS = new Set([12, 19, 24, 28]);
function cleanupNotes(rawNotes) {
  const MIN_DURATION_SEC = 0.06;
  const SLIVER_SEC = 0.08;
  const MERGE_GAP_SEC = 0.03;
  const sorted = [...rawNotes].sort((a, b) => a.startTimeSeconds - b.startTimeSeconds);
  const amp = (n) => n.amplitude ?? 0.5;

  // 1. Re-join pitch-wobble slivers onto the note they broke off from.
  const lastByPitch = new Map();
  const joined = [];
  for (const note of sorted) {
    const prev = lastByPitch.get(note.pitchMidi);
    const gap = prev ? note.startTimeSeconds - (prev.startTimeSeconds + prev.durationSeconds) : Infinity;
    if (prev && gap <= MERGE_GAP_SEC && note.durationSeconds < SLIVER_SEC) {
      prev.durationSeconds = Math.max(prev.durationSeconds, note.startTimeSeconds + note.durationSeconds - prev.startTimeSeconds);
      continue;
    }
    const copy = { ...note };
    joined.push(copy);
    lastByPitch.set(copy.pitchMidi, copy);
  }

  // 2. Drop overtones of a louder note that starts at (about) the same time.
  const withoutOvertones = joined.filter((n) =>
    !joined.some((other) =>
      other !== n &&
      OVERTONE_INTERVALS.has(n.pitchMidi - other.pitchMidi) &&
      Math.abs(other.startTimeSeconds - n.startTimeSeconds) <= 0.06 &&
      amp(n) < 0.6 * amp(other)
    )
  );

  // 3. Drop short, quiet blips and anything too short to be a played note.
  return withoutOvertones.filter((n) =>
    n.durationSeconds >= MIN_DURATION_SEC && !(n.durationSeconds < 0.12 && amp(n) < 0.45)
  );
}

// basic-pitch requires mono audio at exactly 22050 Hz. decodeAudioData
// gives back whatever sample rate the source file/container actually
// used (commonly 44100/48000 Hz, and stereo) — e.g. a real bug caught
// in testing: uploading a real mp4 decoded fine (decodeAudioData
// already pulls the audio track out of a video container on its own)
// but then failed inside basic-pitch with "Input audio buffer is not
// at correct sample rate! Is 48000. Should be 22050." This resamples
// AND downmixes to mono via an OfflineAudioContext rendered at the
// target rate — a standard technique, no new dependency. Connecting a
// multi-channel source to a 1-channel destination downmixes
// automatically per the Web Audio spec's channel-interpretation rules
// (equal-power sum of channels), which is the normal mono-summing
// approach.
async function resampleToMono22050(audioBuffer) {
  const targetRate = 22050;
  if (audioBuffer.sampleRate === targetRate && audioBuffer.numberOfChannels === 1) {
    return audioBuffer; // already in the right format, nothing to do
  }
  const length = Math.ceil(audioBuffer.duration * targetRate);
  const offlineCtx = new OfflineAudioContext(1, length, targetRate);
  const source = offlineCtx.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(offlineCtx.destination);
  source.start(0);
  return offlineCtx.startRendering();
}

// Transcribes a user-provided audio/video File to a note list using the
// locally-vendored basic-pitch (no CDN). `onStatus(text)` is called with
// human-readable progress messages throughout — callers render it
// however fits their UI. Returns the note array, or throws with a
// message already distinguishing decode/model-load/transcription
// failures (callers should catch and display `err.message` as-is).
async function transcribeFile(file, onStatus = () => {}) {
  let audioBuffer;
  try {
    onStatus("Decoding audio...");
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const arrayBuffer = await file.arrayBuffer();
    const decoded = await audioCtx.decodeAudioData(arrayBuffer);
    onStatus(`Resampling from ${decoded.sampleRate} Hz / ${decoded.numberOfChannels}ch to 22050 Hz mono...`);
    audioBuffer = await resampleToMono22050(decoded);
  } catch (err) {
    throw new Error(`Couldn't decode this file: ${err.message}. Try a standard mp3, wav, or mp4/mov file.`);
  }

  // basic-pitch (code + model weights) is vendored locally in
  // js/vendor/basic-pitch/ — no runtime CDN dependency. See
  // THIRD_PARTY_NOTICES.md for exact version/provenance. A failure here
  // means a genuinely different problem than "no internet" (nothing is
  // fetched remotely anymore) — most likely the browser lacking
  // WebGL/WASM support that TensorFlow.js needs.
  let BasicPitch, outputToNotesPoly, addPitchBendsToNoteEvents, noteFramesToTime, basicPitch;
  try {
    onStatus("Loading transcription model (vendored locally, no network needed)...");
    ({ BasicPitch, outputToNotesPoly, addPitchBendsToNoteEvents, noteFramesToTime } =
      await import("./vendor/basic-pitch/basic-pitch.bundle.js"));
    basicPitch = new BasicPitch(new URL("./vendor/basic-pitch/model/model.json", import.meta.url).href);
  } catch (err) {
    throw new Error(`Couldn't load the local transcription model (${err.message}). This usually means your browser lacks WebGL/WASM support for TensorFlow.js.`);
  }

  try {
    const frames = [];
    const onsets = [];
    const contours = [];
    onStatus("Transcribing in your browser (this can take a while for longer clips)...");
    await basicPitch.evaluateModel(
      audioBuffer,
      (f, o, c) => {
        frames.push(...f);
        onsets.push(...o);
        contours.push(...c);
      },
      (progress) => onStatus(`Transcribing... ${Math.round(progress * 100)}%`)
    );
    // Item 44: this used to call outputToNotesPoly with onsetThresh/
    // frameThresh loosened to 0.25/0.25 — the library's own real
    // defaults, visible in its source, are 0.5/0.3. That's a real cause
    // of the reported "6233 notes for one song" explosion: a much more
    // sensitive-than-default detector picks up far more noise/harmonic
    // blips as if they were genuine note onsets. Using the library's
    // own defaults instead, plus a short post-filter pass below,
    // meaningfully cuts that down without a different model/algorithm.
    const rawNotes = noteFramesToTime(
      addPitchBendsToNoteEvents(contours, outputToNotesPoly(frames, onsets))
    );
    const notes = cleanupNotes(rawNotes);
    console.log(`Hayden Keys: basic-pitch transcription result — ${rawNotes.length} raw notes, ${notes.length} after cleanup`, notes);
    return notes;
  } catch (err) {
    throw new Error(`Transcription failed: ${err.message}.`);
  }
}

// Item 56: "Easy mode" for uploaded-song playback. Even after item 44's
// cleanup, a full-detail transcription of a simple song can still be
// dozens of overlapping notes a second — technically accurate, but
// intimidating to a beginner. This groups onsets into fixed time
// windows and keeps at most `maxNotes` per window (one per pitch class,
// preferring whichever sounded longest — the notes the ear actually
// hears as "the chord"), then merges a block into the one before it
// when it adds no new pitch classes (an arpeggiated/broken chord, or
// the same chord re-struck) so it reads as one held chord. Lowest note of each block is the left hand, the rest
// the right — the same bass-under-chord convention the lessons use.
// Opt-in only; the detailed view stays the default.
function simplifyToBlocks(highwayNotes, { windowSec = 1, maxNotes = 4 } = {}) {
  const buckets = new Map();
  highwayNotes.forEach((n) => {
    const b = Math.floor(n.time / windowSec);
    if (!buckets.has(b)) buckets.set(b, []);
    buckets.get(b).push(n);
  });
  const blocks = [...buckets.keys()].sort((a, b) => a - b).map((b) => {
    const inWindow = buckets.get(b);
    const byPitchClass = new Map();
    inWindow.forEach((n) => {
      const pc = n.midi % 12;
      const cur = byPitchClass.get(pc);
      if (!cur || n.duration > cur.duration) byPitchClass.set(pc, n);
    });
    const midis = [...byPitchClass.values()]
      .sort((x, y) => y.duration - x.duration)
      .slice(0, maxNotes)
      .map((n) => n.midi)
      .sort((x, y) => x - y);
    // Block starts at its first real onset, not the grid line, so Easy
    // mode never shifts a chord earlier than it was actually played.
    return { time: Math.min(...inWindow.map((n) => n.time)), midis, end: Math.max(...inWindow.map((n) => n.time + n.duration)) };
  });
  const merged = [];
  blocks.forEach((blk) => {
    const prev = merged[merged.length - 1];
    // Nothing new versus the block right before it (every pitch class
    // already in that chord, any octave) → extend that block instead,
    // keeping its voicing.
    const prevPcs = prev ? new Set(prev.midis.map((x) => x % 12)) : null;
    if (prev && blk.midis.every((x) => prevPcs.has(x % 12)) && blk.time - prev.end <= windowSec) {
      prev.end = Math.max(prev.end, blk.end, blk.time + windowSec);
      return;
    }
    merged.push({ ...blk, end: Math.max(blk.end, blk.time + windowSec) });
  });
  const out = [];
  merged.forEach((blk, i) => {
    const next = merged[i + 1];
    const end = next ? Math.min(blk.end, next.time) : blk.end;
    const duration = Math.max(0.15, end - blk.time);
    blk.midis.forEach((midi, j) => out.push({ midi, time: blk.time, duration, hand: j === 0 && blk.midis.length > 1 ? "left" : "right" }));
  });
  return out;
}

// Item 56: a beat for uploaded songs (which come with no tempo data).
// Estimates the beat from the detected note onsets: autocorrelate an
// onset-strength signal (10ms bins) over 60-180 BPM, gently preferring
// the 80-140 BPM range most songs sit in (so it doesn't lock onto half
// or double time as easily), then pick the phase that lines up with the
// most onsets. Returns null when there's too little to go on. An
// estimate, labelled as one in the UI — not real drum transcription.
function estimateBeat(notes) {
  if (notes.length < 8) return null;
  const BIN = 0.01;
  const end = Math.max(...notes.map((n) => n.time));
  const env = new Float32Array(Math.ceil(end / BIN) + 2);
  notes.forEach((n) => { env[Math.round(n.time / BIN)] += 1; });
  let best = null;
  for (let lag = Math.round(60 / 180 / BIN); lag <= Math.round(60 / 60 / BIN); lag++) {
    let score = 0;
    for (let i = 0; i + lag < env.length; i++) {
      if (!env[i]) continue;
      // ±1 bin tolerance for slightly uneven playing
      score += env[i] * (env[i + lag] + 0.5 * ((env[i + lag - 1] || 0) + (env[i + lag + 1] || 0)));
      // Also credit onsets two beats later, so a song whose chords only
      // change every other beat (or every bar) still finds its beat.
      score += 0.5 * env[i] * (env[i + 2 * lag] || 0);
    }
    const bpm = 60 / (lag * BIN);
    score *= Math.exp(-Math.pow(Math.log2(bpm / 110), 2) / (2 * 0.6 * 0.6));
    if (!best || score > best.score) best = { lag, score };
  }
  if (!best || best.score <= 0) return null;
  let bestOffset = 0;
  let bestHits = -1;
  for (let off = 0; off < best.lag; off++) {
    let hits = 0;
    for (let i = off; i < env.length; i += best.lag) hits += env[i] + 0.5 * ((env[i - 1] || 0) + (env[i + 1] || 0));
    if (hits > bestHits) { bestHits = hits; bestOffset = off; }
  }
  return { beatSec: best.lag * BIN, offsetSec: bestOffset * BIN, bpm: Math.round(60 / (best.lag * BIN)) };
}

function formatClock(sec) {
  const s = Math.max(0, Math.floor(sec));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

// Renders a full falling-notes playback UI for a transcribed note list
// into `container`: the same renderNoteHighway() visualization the
// curated lesson/song-mastery flow uses, a real speed picker (0.5x/
// 0.75x/1x, same values Practice's Follow Along offers), and a
// keyboard that highlights whatever's actually sounding at the current
// playback time — not a single highlighted key with no sense of
// rhythm. Hand coloring is a simple median-pitch split (just a visual
// cue here, there's no real per-hand data from a single-mic upload).
//
// Item 56 adds: a seek bar (drag to rewind/fast-forward, driven by the
// same currentTime()/pausedAt clock as the highway), a note-name label
// on every currently-highlighted key plus a "Now playing" readout, and
// the opt-in Easy mode above.
function renderTranscribedPlayback(container, notes, { file = null } = {}) {
  // A second upload into the same container must stop the first one's
  // scheduled audio, not play both on top of each other.
  if (container._hkStopPlayback) container._hkStopPlayback();
  if (container._hkObjectUrl) URL.revokeObjectURL(container._hkObjectUrl);
  container._hkObjectUrl = null;
  if (!notes.length) {
    container.innerHTML = `<p class="hk-honest-note">No notes were detected in this clip.</p>`;
    return;
  }
  const midiValues = notes.map((n) => n.pitchMidi).sort((a, b) => a - b);
  const minMidi = Math.max(21, midiValues[0] - 3);
  const maxMidi = Math.min(108, midiValues[midiValues.length - 1] + 3);
  // Item 56: split hands at Middle C like real piano music, not at the
  // median note — on a full band recording most detected notes are bass,
  // so a median split painted half the bass line as "right hand". Falls
  // back to the median only if nearly everything is on one side.
  const aboveMiddleC = midiValues.filter((m) => m >= 60).length / midiValues.length;
  const handSplitMidi = aboveMiddleC >= 0.1 && aboveMiddleC <= 0.9 ? 60 : midiValues[Math.floor(midiValues.length / 2)];
  const detailedNotes = notes
    .slice()
    .sort((a, b) => a.startTimeSeconds - b.startTimeSeconds)
    .map((n) => ({
      midi: n.pitchMidi,
      time: n.startTimeSeconds,
      duration: Math.max(0.15, n.durationSeconds),
      hand: n.pitchMidi < handSplitMidi ? "left" : "right",
    }));
  const easyNotes = simplifyToBlocks(detailedNotes);
  const SPEEDS = [0.5, 0.75, 1];
  const beat = estimateBeat(detailedNotes);

  // Item 56: the original recording, played in sync. Hearing the actual
  // song (vocals included) is what tells you where you are in it — the
  // piano re-synthesis alone doesn't. When it's on, it IS the clock:
  // the highway and keyboard follow the media element's own position,
  // so they can't drift from the audio. Slower speeds keep the pitch
  // (browsers' default preservesPitch). Original on + piano notes off is
  // the default whenever the file is available.
  let originalEl = null;
  if (file) {
    originalEl = document.createElement("audio");
    originalEl.preload = "auto";
    originalEl.src = container._hkObjectUrl = URL.createObjectURL(file);
    originalEl.preservesPitch = true;
    originalEl.webkitPreservesPitch = true;
  }
  let originalOn = Boolean(originalEl);
  let pianoOn = !originalEl;
  let drumsOn = false;
  let lastBeatSlot = null;

  let highwayNotes = detailedNotes;
  let totalDuration = 0;
  function computeTotal() {
    totalDuration = Math.max(...highwayNotes.map((n) => n.time + n.duration)) + 0.5;
  }
  computeTotal();

  container.innerHTML = `
    <div class="hk-upload-player">
      <p class="hk-honest-note" id="hk-upload-summary"></p>
      <div class="hk-speed-picker">
        <span class="hk-speed-label">Speed:</span>
        ${SPEEDS.map((s) => `<button class="hk-speed-btn ${s === 1 ? "hk-speed-active" : ""}" data-speed="${s}">${s}×${s === 1 ? " (normal)" : s === 0.5 ? " (slow)" : ""}</button>`).join("")}
        <span class="hk-speed-label hk-upload-mode-label">View:</span>
        <button class="hk-speed-btn hk-speed-active" data-mode="detailed">Detailed</button>
        <button class="hk-speed-btn" data-mode="easy" title="Groups notes into simple chord-sized blocks">Easy</button>
        <button class="hk-btn hk-btn-primary" id="hk-upload-playpause">Play</button>
      </div>
      <div class="hk-speed-picker">
        <span class="hk-speed-label">Hear:</span>
        ${originalEl ? `<button class="hk-speed-btn ${originalOn ? "hk-speed-active" : ""}" data-toggle="original" title="Your recording, in sync with the falling notes">🎵 Original recording</button>` : ""}
        <button class="hk-speed-btn ${pianoOn ? "hk-speed-active" : ""}" data-toggle="piano" title="The detected notes, played on piano">🎹 Piano notes</button>
        ${beat ? `<button class="hk-speed-btn" data-toggle="drums" title="A simple beat at the song's estimated tempo">🥁 Beat (~${beat.bpm} BPM)</button>` : ""}
      </div>
      <div class="hk-upload-seek">
        <span class="hk-upload-clock" id="hk-upload-clock">0:00</span>
        <input type="range" id="hk-upload-seek" class="hk-upload-seek-range" min="0" step="0.05" value="0" aria-label="Playback position" />
        <span class="hk-upload-clock" id="hk-upload-total">0:00</span>
      </div>
      <p class="hk-upload-now" id="hk-upload-now" aria-live="off">&nbsp;</p>
      <div class="hk-upload-highway" id="hk-upload-highway"></div>
      <div id="hk-upload-kb" class="hk-keyboard-wrap"></div>
    </div>`;

  const kb = renderKeyboard(container.querySelector("#hk-upload-kb"), { startMidi: minMidi, endMidi: maxMidi });
  const highway = renderNoteHighway(container.querySelector("#hk-upload-highway"), kb.keyLayout);
  const playBtn = container.querySelector("#hk-upload-playpause");
  const seek = container.querySelector("#hk-upload-seek");
  const clock = container.querySelector("#hk-upload-clock");
  const nowEl = container.querySelector("#hk-upload-now");

  function updateSummary() {
    container.querySelector("#hk-upload-summary").textContent = highwayNotes === easyNotes
      ? `Easy mode: ${detailedNotes.length} detected notes grouped into simpler chord-sized blocks (${easyNotes.length} notes). Switch back to Detailed for everything that was detected.`
      : `Detected ${detailedNotes.length} notes. This plays back exactly what was detected — try Easy for a simpler view. Turning it into a full lesson (chords, structure, etc.) is still a Phase 2 item.`;
    seek.max = String(totalDuration);
    container.querySelector("#hk-upload-total").textContent = formatClock(totalDuration);
  }
  updateSummary();

  let speed = 1;
  let playing = false;
  let pausedAt = 0;
  let playStartedAt = 0;
  let raf = null;
  let scheduled = []; // setTimeout ids for audio
  let lastActiveKey = "";

  function currentTime() {
    if (!playing) return pausedAt;
    if (originalOn && originalEl && !originalEl.paused) return originalEl.currentTime;
    return pausedAt + ((performance.now() - playStartedAt) / 1000) * speed;
  }

  function clearScheduled() {
    scheduled.forEach((id) => clearTimeout(id));
    scheduled = [];
  }

  function scheduleAudioFrom(t) {
    clearScheduled();
    if (!pianoOn) return;
    highwayNotes.forEach((n) => {
      if (n.time < t) return; // already started — don't replay it mid-note on resume/seek
      const delayMs = ((n.time - t) / speed) * 1000;
      scheduled.push(setTimeout(() => playTone(n.midi, { duration: n.duration / speed }), delayMs));
    });
  }

  // Item 55: use the SAME left/right hand split the highway already
  // colors notes by, instead of a generic single-color highlight. Item
  // 56: only touches the DOM when the set of sounding notes actually
  // changes (not every animation frame), and labels each lit key with
  // its note name via midiToName().
  function drawFrame(t) {
    highway.render(t, highwayNotes);
    const active = highwayNotes.filter((n) => t >= n.time && t < n.time + n.duration);
    const key = active.map((n) => `${n.midi}${n.hand[0]}`).sort().join(",");
    if (key !== lastActiveKey) {
      lastActiveKey = key;
      kb.keyElements.forEach((el) => el.querySelector(".hk-key-notename")?.remove());
      if (active.length) {
        kb.highlightHands({
          left: active.filter((n) => n.hand === "left").map((n) => n.midi),
          right: active.filter((n) => n.hand === "right").map((n) => n.midi),
        });
        // highlightHands() puts an "L"/"R" badge on each hand's first
        // key; the note-name label replaces that here so a key never
        // carries two stacked labels.
        kb.keyElements.forEach((el) => el.querySelector(".hk-key-badge")?.remove());
        const midis = [...new Set(active.map((n) => n.midi))].sort((a, b) => a - b);
        midis.forEach((midi) => {
          const el = kb.getKeyElement(midi);
          if (!el) return;
          const label = document.createElement("div");
          label.className = "hk-key-notename";
          label.textContent = midiToName(midi);
          el.appendChild(label);
        });
        nowEl.textContent = `Now playing: ${midis.map(midiToName).join(" · ")}`;
      } else {
        kb.clearHighlights();
        nowEl.innerHTML = "&nbsp;";
      }
    }
    if (!seekDragging) seek.value = String(Math.min(t, totalDuration));
    clock.textContent = formatClock(t);
  }

  function loop() {
    // Stop cleanly if the user navigated away (tab hidden or this view
    // replaced) instead of playing audio into a screen nobody can see.
    if (!container.isConnected || container.offsetParent === null) {
      pause();
      return;
    }
    const t = currentTime();
    drawFrame(t);
    if (drumsOn && beat && t >= beat.offsetSec) {
      const slot = Math.floor((t - beat.offsetSec) / beat.beatSec);
      if (slot !== lastBeatSlot) {
        lastBeatSlot = slot;
        playBeat(getAudioContext(), slot, getAudioContext().currentTime);
      }
    }
    if (t >= totalDuration) {
      pause();
      pausedAt = 0;
      drawFrame(0);
      return;
    }
    if (playing) raf = requestAnimationFrame(loop);
  }

  function play() {
    if (pausedAt >= totalDuration) pausedAt = 0;
    playing = true;
    playStartedAt = performance.now();
    lastBeatSlot = null;
    if (originalOn && originalEl) {
      originalEl.playbackRate = speed;
      originalEl.currentTime = pausedAt;
      originalEl.play().catch(() => {});
    }
    scheduleAudioFrom(pausedAt);
    playBtn.textContent = "Pause";
    raf = requestAnimationFrame(loop);
  }

  function pause() {
    pausedAt = currentTime();
    playing = false;
    clearScheduled();
    if (originalEl) originalEl.pause();
    if (raf) cancelAnimationFrame(raf);
    raf = null;
    playBtn.textContent = "Play";
  }
  container._hkStopPlayback = pause;

  playBtn.addEventListener("click", () => {
    if (playing) pause();
    else play();
  });
  container.querySelectorAll("[data-speed]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const wasPlaying = playing;
      if (playing) pause();
      speed = Number(btn.dataset.speed);
      container.querySelectorAll("[data-speed]").forEach((b) => b.classList.toggle("hk-speed-active", b === btn));
      if (wasPlaying) play();
    });
  });
  container.querySelectorAll("[data-toggle]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const wasPlaying = playing;
      if (playing) pause();
      const which = btn.dataset.toggle;
      if (which === "original") originalOn = !originalOn;
      if (which === "piano") pianoOn = !pianoOn;
      if (which === "drums") drumsOn = !drumsOn;
      btn.classList.toggle("hk-speed-active", which === "original" ? originalOn : which === "piano" ? pianoOn : drumsOn);
      if (wasPlaying) play();
    });
  });
  container.querySelectorAll("[data-mode]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const wasPlaying = playing;
      if (playing) pause();
      highwayNotes = btn.dataset.mode === "easy" ? easyNotes : detailedNotes;
      computeTotal();
      pausedAt = Math.min(pausedAt, totalDuration);
      lastActiveKey = null; // force a full keyboard redraw for the new note set
      container.querySelectorAll("[data-mode]").forEach((b) => b.classList.toggle("hk-speed-active", b === btn));
      updateSummary();
      drawFrame(pausedAt);
      if (wasPlaying) play();
    });
  });

  // Seek bar: dragging pauses audio and scrubs the highway/keyboard
  // live; releasing resumes from the new position if it was playing.
  let seekDragging = false;
  let resumeAfterSeek = false;
  seek.addEventListener("input", () => {
    if (!seekDragging) {
      seekDragging = true;
      resumeAfterSeek = playing;
      if (playing) pause();
    }
    pausedAt = Number(seek.value);
    drawFrame(pausedAt);
  });
  seek.addEventListener("change", () => {
    pausedAt = Number(seek.value);
    seekDragging = false;
    drawFrame(pausedAt);
    if (resumeAfterSeek) play();
    resumeAfterSeek = false;
  });

  drawFrame(0);
}

export { transcribeFile, resampleToMono22050, renderTranscribedPlayback };
