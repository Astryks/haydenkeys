// Shared "upload your own recording → notes" pipeline — used by both
// the Practice tab and the Discover tab's upload entry point, so there
// is exactly one real implementation, not two parallel copies.
//
// Item 44: renderTranscribedPlayback() below replaces the old bare
// "Play it + one highlighted key" view in both callers with the same
// falling-notes highway the curated lesson/song-mastery flow uses
// (note-highway.js), plus a real speed control — not a second
// visualizer built just for uploads.

import { renderKeyboard, playTone } from "./keyboard.js";
import { renderNoteHighway } from "./note-highway.js";

// Item 44: a short cleanup pass on basic-pitch's raw note output.
// Real piano notes are rarely shorter than ~60ms and rarely have a
// same-pitch repeat land within ~30ms of the previous one ending — both
// patterns are typical artifacts of an over-sensitive frame-by-frame
// detector (a sustained note's pitch wobbling in and out of the
// detection threshold for a frame or two, reported as several tiny
// notes instead of one). This merges those back together and drops
// anything left that's still too short to be a real played note,
// rather than rendering every raw detection as its own note.
function cleanupNotes(rawNotes) {
  const MIN_DURATION_SEC = 0.06;
  const MERGE_GAP_SEC = 0.03;
  const sorted = [...rawNotes].sort((a, b) => a.startTimeSeconds - b.startTimeSeconds);
  const merged = [];
  for (const note of sorted) {
    const prev = merged[merged.length - 1];
    if (
      prev &&
      prev.pitchMidi === note.pitchMidi &&
      note.startTimeSeconds - (prev.startTimeSeconds + prev.durationSeconds) <= MERGE_GAP_SEC
    ) {
      prev.durationSeconds = Math.max(
        prev.durationSeconds,
        note.startTimeSeconds + note.durationSeconds - prev.startTimeSeconds
      );
      continue;
    }
    merged.push({ ...note });
  }
  return merged.filter((n) => n.durationSeconds >= MIN_DURATION_SEC);
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

// Renders a full falling-notes playback UI for a transcribed note list
// into `container`: the same renderNoteHighway() visualization the
// curated lesson/song-mastery flow uses, a real speed picker (0.5x/
// 0.75x/1x, same values Practice's Follow Along offers), and a
// keyboard that highlights whatever's actually sounding at the current
// playback time — not a single highlighted key with no sense of
// rhythm. Hand coloring is a simple median-pitch split (just a visual
// cue here, there's no real per-hand data from a single-mic upload).
function renderTranscribedPlayback(container, notes) {
  if (!notes.length) {
    container.innerHTML = `<p class="hk-honest-note">No notes were detected in this clip.</p>`;
    return;
  }
  const midiValues = notes.map((n) => n.pitchMidi).sort((a, b) => a - b);
  const minMidi = Math.max(21, midiValues[0] - 3);
  const maxMidi = Math.min(108, midiValues[midiValues.length - 1] + 3);
  const medianMidi = midiValues[Math.floor(midiValues.length / 2)];
  const highwayNotes = notes
    .slice()
    .sort((a, b) => a.startTimeSeconds - b.startTimeSeconds)
    .map((n) => ({
      midi: n.pitchMidi,
      time: n.startTimeSeconds,
      duration: Math.max(0.15, n.durationSeconds),
      hand: n.pitchMidi < medianMidi ? "left" : "right",
    }));
  const totalDuration = Math.max(...highwayNotes.map((n) => n.time + n.duration)) + 0.5;
  const SPEEDS = [0.5, 0.75, 1];

  container.innerHTML = `
    <div class="hk-upload-player">
      <p class="hk-honest-note">Detected ${notes.length} notes. This plays back exactly what was detected —
         turning it into a full lesson (chords, structure, etc.) is still a Phase 2 item.</p>
      <div class="hk-speed-picker">
        <span class="hk-speed-label">Speed:</span>
        ${SPEEDS.map((s) => `<button class="hk-speed-btn ${s === 1 ? "hk-speed-active" : ""}" data-speed="${s}">${s}×${s === 1 ? " (normal)" : s === 0.5 ? " (slow)" : ""}</button>`).join("")}
        <button class="hk-btn hk-btn-primary" id="hk-upload-playpause">Play</button>
      </div>
      <div class="hk-upload-highway" id="hk-upload-highway"></div>
      <div id="hk-upload-kb" class="hk-keyboard-wrap"></div>
    </div>`;

  const kb = renderKeyboard(container.querySelector("#hk-upload-kb"), { startMidi: minMidi, endMidi: maxMidi });
  const highway = renderNoteHighway(container.querySelector("#hk-upload-highway"), kb.keyLayout);

  let speed = 1;
  let playing = false;
  let pausedAt = 0;
  let playStartedAt = 0;
  let raf = null;
  let scheduled = []; // setTimeout ids for audio

  function currentTime() {
    if (!playing) return pausedAt;
    return pausedAt + ((performance.now() - playStartedAt) / 1000) * speed;
  }

  function clearScheduled() {
    scheduled.forEach((id) => clearTimeout(id));
    scheduled = [];
  }

  function scheduleAudioFrom(t) {
    clearScheduled();
    highwayNotes.forEach((n) => {
      if (n.time + n.duration < t) return;
      const delayMs = Math.max(0, (n.time - t) / speed) * 1000;
      scheduled.push(setTimeout(() => playTone(n.midi, { duration: n.duration }), delayMs));
    });
  }

  function loop() {
    const t = currentTime();
    highway.render(t, highwayNotes);
    const active = highwayNotes.filter((n) => t >= n.time && t < n.time + n.duration).map((n) => n.midi);
    if (active.length) kb.highlightChord(active, { rootMidi: active[0] });
    else kb.clearHighlights();
    if (t >= totalDuration) {
      playing = false;
      pausedAt = 0;
      container.querySelector("#hk-upload-playpause").textContent = "Play";
      kb.clearHighlights();
      highway.render(0, highwayNotes);
      clearScheduled();
      return;
    }
    if (playing) raf = requestAnimationFrame(loop);
  }

  function play() {
    playing = true;
    playStartedAt = performance.now();
    scheduleAudioFrom(pausedAt);
    container.querySelector("#hk-upload-playpause").textContent = "Pause";
    raf = requestAnimationFrame(loop);
  }

  function pause() {
    pausedAt = currentTime();
    playing = false;
    clearScheduled();
    if (raf) cancelAnimationFrame(raf);
    container.querySelector("#hk-upload-playpause").textContent = "Play";
  }

  container.querySelector("#hk-upload-playpause").addEventListener("click", () => {
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
}

export { transcribeFile, resampleToMono22050, renderTranscribedPlayback };
