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
import { SONGS } from "./songs-data.js";
import { icon } from "./icons.js";
import { parseChordSymbol } from "./chord-utils.js";

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
// Reads a File into an ArrayBuffer (File.arrayBuffer is missing on
// older iOS; FileReader works everywhere).
function readFileBuffer(file) {
  if (file.arrayBuffer) return file.arrayBuffer();
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = () => reject(r.error || new Error("couldn't read the file"));
    r.readAsArrayBuffer(file);
  });
}

// decodeAudioData, in the callback form older WebKit needs as well as
// the promise form.
function decodeWith(ctx, buf) {
  return new Promise((resolve, reject) => {
    const p = ctx.decodeAudioData(buf, resolve, (e) => reject(e || new Error("unsupported format")));
    if (p && p.then) p.then(resolve, reject);
  });
}

// Last resort for files the decoder can't open directly (common on
// iPhone for videos from the photo library: Safari plays them fine but
// decodeAudioData rejects the container). Plays the file silently
// through a media element and records the audio as it plays — so it
// takes as long as the clip itself.
function captureViaMediaElement(file, ctx, onStatus) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const el = document.createElement(file.type.startsWith("video") ? "video" : "audio");
    el.src = url;
    el.playsInline = true;
    el.setAttribute("playsinline", "");
    el.preload = "auto";
    const chunks = [];
    let node = null;
    let src = null;
    const cleanup = () => {
      try { node && node.disconnect(); src && src.disconnect(); } catch (e) { /* ignore */ }
      el.pause();
      URL.revokeObjectURL(url);
    };
    el.onerror = () => { cleanup(); reject(new Error("this file type can't be played here")); };
    el.onloadedmetadata = async () => {
      try {
        src = ctx.createMediaElementSource(el);
        node = ctx.createScriptProcessor(4096, 1, 1);
        const mute = ctx.createGain();
        mute.gain.value = 0; // record it without playing it out loud
        node.onaudioprocess = (e) => chunks.push(new Float32Array(e.inputBuffer.getChannelData(0)));
        src.connect(node);
        node.connect(mute).connect(ctx.destination);
        const total = el.duration;
        const tick = setInterval(() => onStatus(`Listening to your file… ${Math.round(el.currentTime)}s of ${Math.round(total)}s`), 500);
        el.onended = () => {
          clearInterval(tick);
          cleanup();
          const len = chunks.reduce((a, c) => a + c.length, 0);
          if (!len) return reject(new Error("no audio was heard in this file"));
          const buf = ctx.createBuffer(1, len, ctx.sampleRate);
          const out = buf.getChannelData(0);
          let o = 0;
          chunks.forEach((c) => { out.set(c, o); o += c.length; });
          resolve(buf);
        };
        await ctx.resume?.();
        await el.play();
      } catch (err) {
        cleanup();
        reject(err);
      }
    };
  });
}

// ----- "Which song is this?" (iPhone/iPad app only, Apple's ShazamKit) -----
// Sends ~12 seconds of mono 16-bit audio to the app's native SongRecognizer
// plugin, which makes a ShazamKit fingerprint and asks Apple's catalog.
// Runs in the background only when a song is uploaded; the website skips it.
let lastRecognition = null;
let lastDecoded = null;
async function recognizeSong(decoded) {
  const cap = window.Capacitor;
  if (!cap?.isNativePlatform?.()) return null;
  const plugin = cap.registerPlugin ? cap.registerPlugin("SongRecognizer") : cap.Plugins?.SongRecognizer;
  if (!plugin) return null;
  let buf = decoded;
  if (![44100, 48000].includes(buf.sampleRate)) {
    const off = new OfflineAudioContext(1, Math.ceil(buf.duration * 44100), 44100);
    const src = off.createBufferSource();
    src.buffer = buf;
    src.connect(off.destination);
    src.start(0);
    buf = await off.startRendering();
  }
  const rate = buf.sampleRate;
  const ch = [...Array(buf.numberOfChannels).keys()].map((c) => buf.getChannelData(c));
  // Skip leading silence, then take up to 12 seconds.
  let start = 0;
  while (start < ch[0].length && Math.abs(ch[0][start]) < 0.01) start++;
  const len = Math.min(ch[0].length - start, rate * 12);
  if (len < rate * 3) return null;
  const pcm = new Int16Array(len);
  for (let i = 0; i < len; i++) {
    let v = 0;
    for (const c of ch) v += c[start + i];
    v /= ch.length;
    pcm[i] = Math.max(-32768, Math.min(32767, Math.round(v * 32767)));
  }
  const bytes = new Uint8Array(pcm.buffer);
  let bin = "";
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
  try {
    return await plugin.match({ pcm16: btoa(bin), sampleRate: rate });
  } catch (e) {
    console.warn("Hayden Keys: song recognition failed", e);
    return null;
  }
}

// iPhone/iPad app: decode with AVFoundation (SongRecognizer.decodeAudio),
// which opens every format iOS plays, including iPhone videos and m4a
// files the web view's decoder rejects. Returns an AudioBuffer (mono,
// 22050 Hz), or null on the website / if the native decoder isn't there.
async function decodeNatively(file, ctx) {
  const cap = window.Capacitor;
  if (!cap?.isNativePlatform?.()) return null;
  const plugin = cap.registerPlugin ? cap.registerPlugin("SongRecognizer") : cap.Plugins?.SongRecognizer;
  if (!plugin?.decodeAudio) return null;
  const bytes = new Uint8Array(await readFileBuffer(file));
  let bin = "";
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
  const ext = (file.name.match(/\.([a-z0-9]+)$/i)?.[1] || (file.type.split("/")[1] || "m4a")).toLowerCase().replace("quicktime", "mov");
  const res = await plugin.decodeAudio({ data: btoa(bin), ext, sampleRate: 22050, maxSeconds: 600 });
  const raw = Uint8Array.from(atob(res.pcm16), (c) => c.charCodeAt(0));
  const pcm = new Int16Array(raw.buffer, 0, Math.floor(raw.length / 2));
  const buf = ctx.createBuffer(1, pcm.length, res.sampleRate || 22050);
  const out = buf.getChannelData(0);
  for (let i = 0; i < pcm.length; i++) out[i] = pcm[i] / 32768;
  return buf;
}

async function transcribeFile(file, onStatus = () => {}) {
  let audioBuffer;
  const audioCtx = getAudioContext();
  try {
    onStatus("Decoding audio...");
    let decoded = null;
    try {
      decoded = await decodeNatively(file, audioCtx);
    } catch (nativeErr) {
      console.warn("Hayden Keys: native decode failed, trying the web decoder", nativeErr);
    }
    if (!decoded) try {
      decoded = await decodeWith(audioCtx, await readFileBuffer(file));
    } catch (firstErr) {
      onStatus("This file needs to be played through once to read its audio — listening now (it stays silent)...");
      decoded = await captureViaMediaElement(file, audioCtx, onStatus);
    }
    lastDecoded = decoded;
    lastRecognition = null;
    onStatus(`Resampling from ${decoded.sampleRate} Hz / ${decoded.numberOfChannels}ch to 22050 Hz mono...`);
    audioBuffer = await resampleToMono22050(decoded);
  } catch (err) {
    throw new Error(`Couldn't read the audio in this file (${err && err.message ? err.message : "unsupported format"}). Try an mp3, m4a or wav file, or a video saved to Files.`);
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

// Item 57: "Easy mode" = the song's CHORDS, as simple shapes you can
// actually play. (Item 56's version only thinned the raw notes out,
// which still left awkward 4-note clusters spread over the keyboard.)
// For each time window, every detected note adds its overlap time to
// its pitch class (bass notes count extra — they usually spell the
// root); each of the 24 major/minor triads is scored by how much of
// that weight its 3 notes cover minus a penalty for weight outside it,
// with a small bonus when the bass note is the chord's root. The
// winner is drawn as a beginner shape: left hand = the root below
// Middle C, right hand = the root-position triad in the octave around
// Middle C. Back-to-back windows with the same chord merge into one
// held block. A best guess from the recording — labelled as such.
// Spellings as most chord charts write them (Eb/Ab/Bb majors, C#m/F#m/G#m minors).
const MAJOR_NAMES = ["C", "Db", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];
const MINOR_NAMES = ["Cm", "C#m", "Dm", "D#m", "Em", "Fm", "F#m", "Gm", "G#m", "Am", "Bbm", "Bm"];
function chordName(pc, minor) {
  return (minor ? MINOR_NAMES : MAJOR_NAMES)[pc];
}

// `keyProfile` = the whole song's pitch-class weights (0-1). When a
// moment only has a root and fifth (no third — common in bass + power
// chords), major and minor tie; the song's own key decides which third
// it most likely is, instead of always picking major (which put
// non-key chords like Ab major into a B-major song).
function recognizeChord(weights, bassPc, keyProfile) {
  const total = weights.reduce((a, b) => a + b, 0);
  if (total < 0.05) return null;
  let best = null;
  for (let root = 0; root < 12; root++) {
    for (const minor of [false, true]) {
      const pcs = [root, (root + (minor ? 3 : 4)) % 12, (root + 7) % 12];
      const inside = pcs.reduce((a, pc) => a + weights[pc], 0);
      const third = (root + (minor ? 3 : 4)) % 12;
      let score = inside - 0.5 * (total - inside) + (bassPc === root ? 0.15 * total : 0);
      if (keyProfile) score += 0.1 * total * keyProfile[third];
      // The chord must actually contain its root and third or fifth.
      if (weights[root] < 0.05 * total) score -= total;
      if (!best || score > best.score) best = { root, minor, score };
    }
  }
  return best;
}

function simplifyToChords(highwayNotes, { windowSec = 1, offsetSec = 0 } = {}) {
  if (!highwayNotes.length) return [];
  const end = Math.max(...highwayNotes.map((n) => n.time + n.duration));
  const keyProfile = new Array(12).fill(0);
  highwayNotes.forEach((n) => { keyProfile[n.midi % 12] += n.duration; });
  const maxPc = Math.max(...keyProfile) || 1;
  for (let i = 0; i < 12; i++) keyProfile[i] /= maxPc;
  const blocks = [];
  for (let t = Math.max(0, offsetSec % windowSec); t < end; t += windowSec) {
    const w = new Array(12).fill(0);
    let bass = null;
    highwayNotes.forEach((n) => {
      const ov = Math.min(t + windowSec, n.time + n.duration) - Math.max(t, n.time);
      if (ov <= 0) return;
      w[n.midi % 12] += ov * (n.midi < 52 ? 1.5 : 1);
      if (n.midi < 55 && (!bass || n.midi < bass.midi || (n.midi === bass.midi && ov > bass.ov))) bass = { midi: n.midi, ov };
    });
    const chord = recognizeChord(w, bass ? bass.midi % 12 : null, keyProfile);
    const prev = blocks[blocks.length - 1];
    if (!chord) continue;
    if (prev && prev.root === chord.root && prev.minor === chord.minor && Math.abs(prev.end - t) < 1e-6) {
      prev.end = t + windowSec;
      continue;
    }
    blocks.push({ root: chord.root, minor: chord.minor, start: t, end: t + windowSec });
  }
  const out = [];
  blocks.forEach((b) => {
    const label = chordName(b.root, b.minor);
    let rh = 60 + b.root;
    if (rh > 66) rh -= 12; // keep the right hand's root within F#3..F#4, around Middle C
    const triad = [rh, rh + (b.minor ? 3 : 4), rh + 7];
    const duration = Math.max(0.2, b.end - b.start - 0.05);
    out.push({ midi: rh - 12, time: b.start, duration, hand: "left", chord: label });
    triad.forEach((midi) => out.push({ midi, time: b.start, duration, hand: "right", chord: label }));
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

// "Which song might this be?" A few seconds of audio can't be identified
// like Shazam does (that needs a huge online fingerprint database). What
// we CAN do offline: compare the chord loop we heard with every song in
// the library, in any key, and suggest the songs that use the same loop.
function chordLoopShape(chords) {
  // Intervals between consecutive roots plus major/minor: key-independent.
  const parsed = chords.map((c) => parseChordSymbol(c)).filter(Boolean);
  return parsed.map((p, i) => {
    const next = parsed[(i + 1) % parsed.length];
    const minor = p.intervals.includes(3) && !p.intervals.includes(4);
    return `${minor ? "m" : "M"}${(next.root - p.root + 12) % 12}`;
  });
}
function songMatches(easyNotes) {
  const seq = [];
  easyNotes.filter((n) => n.hand === "left").forEach((n) => { if (seq[seq.length - 1] !== n.chord) seq.push(n.chord); });
  if (seq.length < 3) return [];
  const heard = chordLoopShape(seq).join(",");
  const out = [];
  SONGS.forEach((song) => {
    const ch = (song.chords || []).filter((c) => /^[A-G]/.test(c)).map((c) => c.replace(/\/.*$/, "").replace(/maj7$/, "").replace(/m7$/, "m").replace(/(7|sus\d|add9|6)$/, ""));
    if (ch.length < 3) return;
    const loop = chordLoopShape(ch);
    // Every rotation of the song's loop, found anywhere in what we heard.
    for (let r = 0; r < loop.length; r++) {
      const rot = loop.slice(r).concat(loop.slice(0, r)).join(",");
      if (rot && heard.includes(rot)) { out.push(song); break; }
    }
  });
  return out.sort((a, b) => (b.confidence === "confirmed") - (a.confidence === "confirmed") || (a.popularityRank || 999) - (b.popularityRank || 999));
}
function showSongMatches(el, easyNotes) {
  if (!el) return;
  const m = songMatches(easyNotes);
  el.innerHTML = `<div class="hk-upload-recognized" id="hk-upload-recognized"></div>` + (m.length ? `<div class="hk-upload-match-box">${icon("song", 20)} <b>These songs use the same chords:</b>
    <div class="hk-upload-match-list">${m.slice(0, 6).map((s) => `<button class="hk-btn hk-btn-small" data-match="${s.title.replace(/"/g, "&quot;")}">${s.title} <span>· ${s.artist}</span></button>`).join("")}</div>
    <small>Lots of songs share the same chords, so this is a hint, not an exact match. Tap one to learn the whole song.</small></div>` : "");
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

  el.querySelectorAll(".hk-upload-match-box [data-match]").forEach((b) => b.addEventListener("click", () => {
    window.dispatchEvent(new CustomEvent("hk-open-song", { detail: { title: b.dataset.match } }));
  }));
}

function showRecognition(box, btn) {
  if (!box || !lastRecognition) return;
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  box.innerHTML = `<div class="hk-upload-rec-box">🎧 Listening for the song name…</div>`;
  lastRecognition.then((r) => {
    if (btn) { btn.disabled = false; btn.innerHTML = `${icon("search", 20)} Guess the song`; }
    if (!box.isConnected) return;
    if (!r || !r.found) { box.innerHTML = `<div class="hk-upload-rec-box">🤔 Couldn't find this song. Try a clearer part of it.</div>`; return; }
    const inLib = SONGS.find((s) => s.title.toLowerCase() === String(r.title).toLowerCase());
    box.innerHTML = `<div class="hk-upload-rec-box">
      ${r.artworkURL ? `<img src="${esc(r.artworkURL)}" alt="" class="hk-upload-rec-art">` : ""}
      <div><div>🎵 We think this is</div><b>${esc(r.title)}</b><div class="hk-upload-rec-artist">${esc(r.artist)}</div>
      <div class="hk-upload-rec-links">${inLib ? `<button class="hk-btn hk-btn-small hk-btn-primary" data-match="${esc(inLib.title)}">Learn the whole song</button>` : ""}
      ${r.appleMusicURL ? `<a class="hk-btn hk-btn-small" href="${esc(r.appleMusicURL)}" target="_blank" rel="noopener">Open in Apple Music</a>` : ""}</div></div></div>`;
    box.querySelector("[data-match]")?.addEventListener("click", (e) => window.dispatchEvent(new CustomEvent("hk-open-song", { detail: { title: e.currentTarget.dataset.match } })));
  });
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
  // Item 57: wide enough for Easy mode's shapes (roots 42-54, triads up
  // to 73) even when the recording itself sits higher or lower.
  const minMidi = Math.max(21, Math.min(41, midiValues[0] - 3));
  const maxMidi = Math.min(108, Math.max(74, midiValues[midiValues.length - 1] + 3));
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
  const beatGuess = estimateBeat(detailedNotes);
  // Easy chords change at most every 2 beats when the tempo is known
  // (every second otherwise) — about as fast as a beginner can follow.
  // Slow songs (a beat of 0.75s or more) can change chord every beat;
  // faster ones get two beats per chord so it stays playable.
  const chordWindow = beatGuess ? (beatGuess.beatSec >= 0.75 ? beatGuess.beatSec : beatGuess.beatSec * 2) : 1;
  const easyNotes = simplifyToChords(detailedNotes, beatGuess
    ? { windowSec: chordWindow, offsetSec: beatGuess.offsetSec }
    : {});
  const SPEEDS = [0.5, 0.75, 1];
  const beat = beatGuess;

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
  // Item 57: three ways to listen — the original recording on its own,
  // piano only (the recording muted, just the detected notes on piano),
  // or the piano laid over the recording.
  let soundMode = originalEl ? "original" : "piano"; // "original" | "piano" | "both"
  let originalOn = soundMode !== "piano";
  let pianoOn = soundMode !== "original";
  let drumsOn = false;
  let lastBeatSlot = null;

  // Easy mode (just chords) is the default; Hard mode shows every note.
  let highwayNotes = easyNotes.length ? easyNotes : detailedNotes;
  let totalDuration = 0;
  function computeTotal() {
    totalDuration = Math.max(...highwayNotes.map((n) => n.time + n.duration)) + 0.5;
  }
  computeTotal();

  container.innerHTML = `
    <div class="hk-upload-player">
      <button class="hk-upload-bigplay" id="hk-upload-playpause" aria-label="Play">▶ Play</button>
      <p class="hk-upload-now" id="hk-upload-now" aria-live="off">&nbsp;</p>
      <div class="hk-upload-highway" id="hk-upload-highway"></div>
      <div id="hk-upload-kb" class="hk-keyboard-wrap"></div>
      <div class="hk-upload-seek">
        <span class="hk-upload-clock" id="hk-upload-clock">0:00</span>
        <input type="range" id="hk-upload-seek" class="hk-upload-seek-range" min="0" step="0.05" value="0" aria-label="Playback position" />
        <span class="hk-upload-clock" id="hk-upload-total">0:00</span>
      </div>
      <details class="hk-upload-settings">
        <summary>${icon("gear", 22)} Customise: speed, easy or hard, sound, guess the song</summary>
      <div class="hk-speed-picker">
        <span class="hk-speed-label">Speed:</span>
        ${SPEEDS.map((s) => `<button class="hk-speed-btn ${s === 1 ? "hk-speed-active" : ""}" data-speed="${s}">${s}×${s === 1 ? " (normal)" : s === 0.5 ? " (slow)" : ""}</button>`).join("")}
        <span class="hk-speed-label hk-upload-mode-label">View:</span>
        <button class="hk-speed-btn ${easyNotes.length ? "hk-speed-active" : ""}" data-mode="easy" title="The song's chords as simple, playable shapes">${icon("star", 18)} Easy mode (just chords)</button>
        <button class="hk-speed-btn ${easyNotes.length ? "" : "hk-speed-active"}" data-mode="detailed" title="Every note we heard">${icon("trophy", 18)} Hard mode (every note)</button>
      </div>
      <div class="hk-speed-picker">
        <span class="hk-speed-label">Hear:</span>
        ${originalEl ? `
          <button class="hk-speed-btn hk-speed-active" data-sound="original" title="Your recording, in sync with the falling notes">${icon("song", 18)} Original song</button>
          <button class="hk-speed-btn" data-sound="piano" title="Mutes the recording — only the notes on piano">${icon("piano", 18)} Piano only</button>
          <button class="hk-speed-btn" data-sound="both" title="The notes on piano, on top of your recording">${icon("piano", 18)} Piano + song</button>` : `<span class="hk-speed-label">${icon("piano", 18)} Piano notes</span>`}
        ${beat ? `<button class="hk-speed-btn" data-toggle="drums" title="A simple beat at the song's estimated tempo">${icon("drum", 18)} Beat (~${beat.bpm} BPM)</button>` : ""}
      </div>
        ${window.Capacitor?.isNativePlatform?.() ? `<div class="hk-speed-picker"><button class="hk-btn hk-upload-guess" id="hk-upload-guess">${icon("search", 20)} Guess the song</button></div>` : ""}
        <div class="hk-upload-match" id="hk-upload-match"></div>
        <p class="hk-honest-note" id="hk-upload-summary"></p>
        <p class="hk-upload-legend">${icon("fact", 18)} <b>C4</b> = middle C. The number says which group of keys: <b>smaller = further left</b> (lower), bigger = further right. So <b>A3</b> is the A just left of middle C, and <b>A2</b> is the A one group further left.</p>
      </details>
    </div>`;

  const kb = renderKeyboard(container.querySelector("#hk-upload-kb"), { startMidi: minMidi, endMidi: maxMidi });
  const highway = renderNoteHighway(container.querySelector("#hk-upload-highway"), kb.keyLayout);
  const playBtn = container.querySelector("#hk-upload-playpause");
  setTimeout(() => playBtn.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  const seek = container.querySelector("#hk-upload-seek");
  const clock = container.querySelector("#hk-upload-clock");
  const nowEl = container.querySelector("#hk-upload-now");

  function updateSummary() {
    container.querySelector("#hk-upload-summary").textContent = highwayNotes === easyNotes
      ? `Easy mode: the song as ${new Set(easyNotes.map((n) => n.chord)).size} simple chords (${easyNotes.filter((n) => n.hand === "left").length} chord changes) — left hand plays the root, right hand the 3-note chord near Middle C. A best guess from the recording; switch to Hard mode for every note.`
      : `Detected ${detailedNotes.length} notes. This plays back exactly what was detected — try Easy mode for just the chords. Turning it into a full lesson (chords, structure, etc.) is still a Phase 2 item.`;
    seek.max = String(totalDuration);
    container.querySelector("#hk-upload-total").textContent = formatClock(totalDuration);
  }
  updateSummary();
  // Finer chord windows (one beat) for matching than for playing.
  showSongMatches(container.querySelector("#hk-upload-match"), simplifyToChords(detailedNotes, { windowSec: beatGuess ? beatGuess.beatSec : 0.5, offsetSec: beatGuess ? beatGuess.offsetSec : 0 }));

  container.querySelector("#hk-upload-guess")?.addEventListener("click", (e) => {
    e.currentTarget.disabled = true;
    e.currentTarget.textContent = "🎧 Listening…";
    lastRecognition = lastDecoded ? recognizeSong(lastDecoded) : Promise.resolve(null);
    showRecognition(container.querySelector("#hk-upload-recognized"), e.currentTarget);
  });

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
        const chordLabel = active.find((n) => n.chord)?.chord;
        nowEl.textContent = chordLabel
          ? `Chord: ${chordLabel} — ${midis.map(midiToName).join(" · ")}`
          : `Now playing: ${midis.map(midiToName).join(" · ")}`;
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
    playBtn.textContent = "⏸ Pause";
    raf = requestAnimationFrame(loop);
  }

  function pause() {
    pausedAt = currentTime();
    playing = false;
    clearScheduled();
    if (originalEl) originalEl.pause();
    if (raf) cancelAnimationFrame(raf);
    raf = null;
    playBtn.textContent = "▶ Play";
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
  container.querySelectorAll("[data-sound]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const wasPlaying = playing;
      if (playing) pause();
      soundMode = btn.dataset.sound;
      originalOn = soundMode !== "piano";
      pianoOn = soundMode !== "original";
      container.querySelectorAll("[data-sound]").forEach((b) => b.classList.toggle("hk-speed-active", b === btn));
      if (wasPlaying) play();
    });
  });
  container.querySelectorAll("[data-toggle]").forEach((btn) => {
    btn.addEventListener("click", () => {
      drumsOn = !drumsOn;
      lastBeatSlot = null;
      btn.classList.toggle("hk-speed-active", drumsOn);
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
