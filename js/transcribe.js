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
import { onNoteOn, enableMic, micOn } from "./input-hub.js";
import { parseChordSymbol } from "./chord-utils.js";
import { analyzeBeat, quantizeNotes, assignHands, barAt } from "./transcribe-detail.js";

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

// "Guess the song": read the ORIGINAL file again at full quality (44.1 kHz;
// the note-finding copy is 22 kHz, too dull for Shazam's fingerprint) and
// try a few 12-second windows (start, ~10 s, ~20 s) until one matches.
async function recognizeFile(file) {
  const cap = window.Capacitor;
  if (!cap?.isNativePlatform?.() || !file) return null;
  const plugin = cap.registerPlugin ? cap.registerPlugin("SongRecognizer") : cap.Plugins?.SongRecognizer;
  if (!plugin?.match || !plugin.beginFile) return null;
  const ext = (file.name.match(/\.([a-z0-9]+)$/i)?.[1] || (file.type.split("/")[1] || "m4a")).toLowerCase().replace("quicktime", "mov");
  const { id } = await plugin.beginFile();
  const PIECE = 2 * 1024 * 1024;
  for (let at = 0; at < file.size; at += PIECE) {
    const bytes = new Uint8Array(await readFileBuffer(file.slice(at, at + PIECE)));
    let bin = "";
    for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
    await plugin.appendFile({ id, data: btoa(bin) });
  }
  const RATE = 44100;
  const res = await plugin.decodeAudio({ id, ext, sampleRate: RATE, maxSeconds: 40 });
  const raw = Uint8Array.from(atob(res.pcm16), (c) => c.charCodeAt(0));
  const samples = Math.floor(raw.length / 2);
  const pcm = new Int16Array(raw.buffer, 0, samples);
  let start = 0;
  while (start < samples && Math.abs(pcm[start]) < 300) start++;
  const WIN = RATE * 12;
  let lastError = "";
  for (const offset of [start, start + RATE * 10, start + RATE * 20]) {
    if (offset >= samples - RATE * 3) break;
    const slice = raw.subarray(offset * 2, Math.min(samples, offset + WIN) * 2);
    let bin = "";
    for (let i = 0; i < slice.length; i += 0x8000) bin += String.fromCharCode.apply(null, slice.subarray(i, i + 0x8000));
    try {
      const r = await plugin.match({ pcm16: btoa(bin), sampleRate: RATE });
      if (r?.found) return r;
      lastError = r?.error || lastError;
    } catch (e) {
      lastError = e?.message || String(e);
    }
  }
  return { found: false, error: lastError };
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
  // Send the file in 2 MB pieces: one huge message can fail for long songs or videos.
  const ext = (file.name.match(/\.([a-z0-9]+)$/i)?.[1] || (file.type.split("/")[1] || "m4a")).toLowerCase().replace("quicktime", "mov");
  const { id } = await plugin.beginFile();
  const PIECE = 2 * 1024 * 1024;
  for (let at = 0; at < file.size; at += PIECE) {
    const bytes = new Uint8Array(await readFileBuffer(file.slice(at, at + PIECE)));
    let bin = "";
    for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
    await plugin.appendFile({ id, data: btoa(bin) });
  }
  const res = await plugin.decodeAudio({ id, ext, sampleRate: 22050, maxSeconds: 420 });
  const raw = Uint8Array.from(atob(res.pcm16), (c) => c.charCodeAt(0));
  const pcm = new Int16Array(raw.buffer, 0, Math.floor(raw.length / 2));
  const buf = ctx.createBuffer(1, pcm.length, res.sampleRate || 22050);
  const out = buf.getChannelData(0);
  for (let i = 0; i < pcm.length; i++) out[i] = pcm[i] / 32768;
  return buf;
}

// ----- Which note finder -----
// "auto"  : Onsets and Frames (Google Magenta, piano-only, every note with
//           how hard it was played) when the recording sounds piano-led,
//           otherwise Basic Pitch (Spotify, any instrument).
// "piano" : always Onsets and Frames ("Detailed piano").
// "any"   : always Basic Pitch.
// Both run on this device; nothing is uploaded anywhere.
const FINDER_KEY = "hk-note-finder";
function getNoteFinder() {
  try { return localStorage.getItem(FINDER_KEY) || "auto"; } catch (e) { return "auto"; }
}
function setNoteFinder(v) {
  try { localStorage.setItem(FINDER_KEY, v); } catch (e) { /* private mode: just this time */ }
}

let bpModulePromise = null;
function loadBasicPitchModule() {
  if (!bpModulePromise) {
    bpModulePromise = import("./vendor/basic-pitch/basic-pitch.bundle.js").catch((err) => {
      bpModulePromise = null;
      throw err;
    });
  }
  return bpModulePromise;
}

let bpInstance = null;
// Basic Pitch on a mono 22050 Hz AudioBuffer → cleaned notes.
async function runBasicPitch(audioBuffer, onProgress = () => {}) {
  const { BasicPitch, outputToNotesPoly, addPitchBendsToNoteEvents, noteFramesToTime } = await loadBasicPitchModule();
  // One model for the whole visit: making a new one per song kept every
  // earlier copy's weights in memory.
  if (!bpInstance) bpInstance = new BasicPitch(new URL("./vendor/basic-pitch/model/model.json", import.meta.url).href);
  const basicPitch = bpInstance;
  const frames = [];
  const onsets = [];
  const contours = [];
  // basic-pitch 1.0.1 never frees the tensors it makes for each 2-second
  // window (about 400 for a 40-second song), so memory grew with every
  // upload. A manual scope frees them; the model's own weights are loaded
  // first so they stay.
  const { tf } = await loadBasicPitchModule();
  await basicPitch.model;
  tf.engine().startScope();
  try {
    await basicPitch.evaluateModel(
      audioBuffer,
      (f, o, c) => {
        frames.push(...f);
        onsets.push(...o);
        contours.push(...c);
      },
      onProgress
    );
  } finally {
    tf.engine().endScope();
  }
  // Item 44: the library's own defaults (0.5/0.3), plus cleanupNotes().
  const rawNotes = noteFramesToTime(addPitchBendsToNoteEvents(contours, outputToNotesPoly(frames, onsets)));
  const notes = cleanupNotes(rawNotes);
  console.log(`Hayden Keys: basic-pitch — ${rawNotes.length} raw notes, ${notes.length} after cleanup`);
  return notes;
}

let oafPromise = null;
function loadOnsetsFrames(onStatus) {
  if (!oafPromise) {
    oafPromise = (async () => {
      const [{ tf }, oaf] = await Promise.all([
        loadBasicPitchModule(),
        import("./vendor/onsets-frames/onsets-frames.js"),
      ]);
      await tf.ready();
      const model = await oaf.createOnsetsFrames(tf, new URL("./vendor/onsets-frames/model", import.meta.url).href, { onStatus });
      return { model, oaf, tf };
    })().catch((err) => {
      oafPromise = null;
      throw err;
    });
  }
  return oafPromise;
}

function excerpt(samples, rate, fromSec, lenSec) {
  const a = Math.max(0, Math.floor(fromSec * rate));
  return samples.subarray(a, Math.min(samples.length, a + Math.floor(lenSec * rate)));
}

// How well two note lists agree (same key, starting within 70 ms): F1.
function agreement(a, b) {
  if (!a.length || !b.length) return 0;
  const used = new Set();
  let hit = 0;
  a.forEach((x) => {
    const i = b.findIndex((y, k) => !used.has(k) && y.pitchMidi === x.pitchMidi && Math.abs(y.startTimeSeconds - x.startTimeSeconds) < 0.07);
    if (i >= 0) { used.add(i); hit++; }
  });
  const p = hit / a.length;
  const r = hit / b.length;
  return p + r ? (2 * p * r) / (p + r) : 0;
}
const PIANO_AGREEMENT = 0.5;

function secondsText(s) {
  return s >= 90 ? `about ${Math.round(s / 60)} min left` : `about ${Math.max(1, Math.round(s))} s left`;
}

async function transcribeFile(file, onStatus = () => {}, { engine = getNoteFinder() } = {}) {
  let audioBuffer;
  let decoded = null;
  const audioCtx = getAudioContext();
  try {
    onStatus("Reading your song...");
    var nativeError = null;
    try {
      decoded = await decodeNatively(file, audioCtx);
    } catch (nativeErr) {
      console.warn("Hayden Keys: native decode failed, trying the web decoder", nativeErr);
      nativeError = nativeErr;
    }
    if (!decoded) try {
      decoded = await decodeWith(audioCtx, await readFileBuffer(file));
    } catch (firstErr) {
      onStatus("Listening to your file once (it stays silent)...");
      decoded = await captureViaMediaElement(file, audioCtx, onStatus);
    }
    lastDecoded = decoded;
    lastRecognition = null;
    onStatus("Getting your song ready...");
    audioBuffer = await resampleToMono22050(decoded);
  } catch (err) {
    const why = nativeError?.message || (err && err.message) || "unsupported format";
    throw new Error(`Couldn't read the audio in this file (${why}). Try an mp3, m4a or wav file, or a video saved to Files.`);
  }

  // basic-pitch (code + model weights) is vendored locally in
  // js/vendor/basic-pitch/ — no runtime CDN dependency. A failure to
  // start it means the browser lacks WebGL/WASM that TensorFlow.js needs.
  const basic = async (why) => {
    if (why) onStatus(why);
    try {
      await loadBasicPitchModule();
    } catch (err) {
      throw new Error(`Couldn't start the note finder (${err.message}). Try updating your browser or using a different one.`);
    }
    try {
      onStatus("Finding the notes (long songs take a while)...");
      const notes = await runBasicPitch(audioBuffer, (progress) => onStatus(`Finding the notes... ${Math.round(progress * 100)}%`));
      notes.engine = "basic-pitch";
      return notes;
    } catch (err) {
      throw new Error(`Couldn't find the notes: ${err.message}.`);
    }
  };

  if (engine === "any") return basic();

  // ----- Onsets and Frames (piano), vendored in js/vendor/onsets-frames/ -----
  let oafKit;
  try {
    onStatus("Getting the piano note finder ready...");
    oafKit = await loadOnsetsFrames(onStatus);
  } catch (err) {
    console.warn("Hayden Keys: Onsets and Frames couldn't start, using Basic Pitch", err);
    return basic("Using the everyday note finder...");
  }
  const { model, oaf } = oafKit;
  let y16;
  try {
    y16 = await oaf.toMono16k(decoded);
  } catch (err) {
    return basic();
  }
  const duration = y16.length / oaf.SAMPLE_RATE;

  if (engine === "auto") {
    // Is it piano-led? Run both note finders on ~20 s of the music: on a
    // piano recording they hear (nearly) the same notes; with a band or a
    // singer, Basic Pitch also hears the voice, guitar and bass that the
    // piano model leaves out.
    onStatus("Listening to which instruments are playing...");
    let start = 0;
    while (start < y16.length && Math.abs(y16[start]) < 0.02) start++;
    const fromSec = Math.min(Math.max(0, start / oaf.SAMPLE_RATE - 0.2), Math.max(0, duration - 20));
    const lenSec = Math.min(20, duration - fromSec);
    try {
      const exOaf = await model.transcribe(excerpt(y16, oaf.SAMPLE_RATE, fromSec, lenSec));
      const bpSamples = excerpt(audioBuffer.getChannelData(0), 22050, fromSec, lenSec);
      const exBuf = audioCtx.createBuffer(1, bpSamples.length, 22050);
      exBuf.getChannelData(0).set(bpSamples);
      const exBp = await runBasicPitch(exBuf);
      const f1 = agreement(exOaf, exBp);
      lastPianoCheck = { oaf: exOaf.length, basicPitch: exBp.length, agreement: f1 };
      console.log(`Hayden Keys: piano check — ${exOaf.length} piano-model notes, ${exBp.length} Basic Pitch notes, agreement ${f1.toFixed(2)}`);
      if (f1 < PIANO_AGREEMENT) return basic("This sounds like more than a piano, so we'll use the everyday note finder...");
    } catch (err) {
      console.warn("Hayden Keys: piano check failed", err);
      return basic();
    }
  }

  try {
    onStatus("Finding every note...");
    const notes = await model.transcribe(y16, {
      // In auto mode, a device that would take more than ~2.5 minutes
      // switches to the quicker everyday note finder instead.
      budgetSec: engine === "auto" ? Math.max(150, duration * 0.8) : Infinity,
      onProgress: (frac, left) => onStatus(`Finding every note... ${Math.round(frac * 100)}%${frac < 1 && frac > 0.05 ? ` (${secondsText(left)})` : ""}`),
    });
    notes.engine = "onsets-frames";
    console.log(`Hayden Keys: Onsets and Frames — ${notes.length} notes in ${duration.toFixed(1)} s of audio`);
    return notes;
  } catch (err) {
    if (err?.code === "too-slow") {
      console.warn(`Hayden Keys: piano model too slow here (${Math.round(err.projectedSec)} s), using Basic Pitch`);
      return basic("This device is a bit slow for the detailed piano finder, so we'll use the quicker one...");
    }
    console.warn("Hayden Keys: Onsets and Frames failed, using Basic Pitch", err);
    return basic("Using the everyday note finder...");
  }
}
let lastPianoCheck = null;

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
    <div class="hk-upload-match-list">${m.slice(0, 4).map((s) => `<button class="hk-match-chip" data-match="${s.title.replace(/"/g, "&quot;")}">${s.title}</button>`).join("")}</div></div>` : "");
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

  el.querySelectorAll(".hk-upload-match-box [data-match]").forEach((b) => b.addEventListener("click", () => {
    window.dispatchEvent(new CustomEvent("hk-open-song", { detail: { title: b.dataset.match } }));
  }));
}

function showRecognition(box, btn) {
  if (!box || !lastRecognition) return;
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  box.innerHTML = `<div class="hk-upload-rec-box">Listening for the song name…</div>`;
  lastRecognition.then((r) => {
    if (btn) { btn.disabled = false; btn.innerHTML = `${icon("search", 20)} Guess the song`; }
    if (!box.isConnected) return;
    if (!r || !r.found) {
      console.warn("Hayden Keys: Guess the song found nothing", r?.error);
      box.innerHTML = `<div class="hk-upload-rec-box">Couldn't name this song. Try the original recording, with a clear chorus.${r?.error ? `<br><small>(${esc(r.error)})</small>` : ""}</div>`;
      return;
    }
    const inLib = SONGS.find((s) => s.title.toLowerCase() === String(r.title).toLowerCase());
    box.innerHTML = `<div class="hk-upload-rec-box">
      ${r.artworkURL ? `<img src="${esc(r.artworkURL)}" alt="" class="hk-upload-rec-art">` : ""}
      <div><div>We think this is</div><b>${esc(r.title)}</b><div class="hk-upload-rec-artist">${esc(r.artist)}</div>
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
  // The previous upload's "Wait for me" note listener goes too.
  if (container._hkOffNote) container._hkOffNote();
  container._hkOffNote = null;
  if (container._hkObjectUrl) URL.revokeObjectURL(container._hkObjectUrl);
  container._hkObjectUrl = null;
  if (!notes.length) {
    container.innerHTML = `<p class="hk-honest-note">We couldn't hear any notes in this clip.</p>`;
    return;
  }
  // Which note finder made these notes: Onsets and Frames notes carry a
  // velocity (saved uploads keep it, even when the array's own `engine`
  // tag is lost).
  const engine = notes.engine || (notes.some((n) => n.velocity != null) ? "onsets-frames" : "basic-pitch");
  const midiValues = notes.map((n) => n.pitchMidi).sort((a, b) => a - b);
  // Item 57: wide enough for Easy mode's shapes (roots 42-54, triads up
  // to 73) even when the recording itself sits higher or lower.
  const minMidi = Math.max(21, Math.min(41, midiValues[0] - 3));
  const maxMidi = Math.min(108, Math.max(74, midiValues[midiValues.length - 1] + 3));

  // Every note: the beat and bars first, then each note's start lined up
  // with them (gently — see transcribe-detail.js; nothing is merged or
  // dropped, so every bar keeps the presses that were played), then a
  // hand for every note, chord by chord, keeping each hand's span
  // comfortable and close to where it just was.
  const rawNotes = notes
    .slice()
    .sort((a, b) => a.startTimeSeconds - b.startTimeSeconds)
    .map((n) => ({
      midi: n.pitchMidi,
      time: n.startTimeSeconds,
      duration: Math.max(0.12, n.durationSeconds),
      velocity: n.velocity != null ? n.velocity : n.amplitude != null ? Math.round(Math.min(1, n.amplitude) * 127) : null,
    }));
  const grid = analyzeBeat(rawNotes);
  const detailedNotes = assignHands(quantizeNotes(rawNotes, grid)).map((n) => ({ ...n, duration: Math.max(0.12, n.duration) }));
  const bars = grid ? grid.bars : [];
  const beatGuess = grid
    ? { beatSec: grid.beatSec, offsetSec: bars[0] ?? grid.beats[0], bpm: grid.bpm }
    : estimateBeat(detailedNotes);
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

  // Item 56: the original recording, played in sync. When it's on, it IS
  // the clock: the highway and keyboard follow the media element's own
  // position, so they can't drift from the audio.
  let originalEl = null;
  if (file) {
    originalEl = document.createElement("audio");
    originalEl.preload = "auto";
    originalEl.src = container._hkObjectUrl = URL.createObjectURL(file);
    originalEl.preservesPitch = true;
    originalEl.webkitPreservesPitch = true;
  }
  let soundMode = originalEl ? "original" : "piano"; // "original" | "piano" | "both"
  let originalOn = soundMode !== "piano";
  let pianoOn = soundMode !== "original";
  let drumsOn = false;
  let lastBeatSlot = null;

  // A piano recording opens on Every note; a band recording (Basic
  // Pitch) opens on Easy chords, which are much easier to follow there.
  let mode = engine === "onsets-frames" || !easyNotes.length ? "detailed" : "easy";
  let handsMode = "both"; // "both" | "left" | "right": the other hand is drawn faded and played for you
  let baseNotes = mode === "easy" ? easyNotes : detailedNotes;
  let highwayNotes = baseNotes;
  let totalDuration = 0;
  function computeTotal() {
    totalDuration = Math.max(...baseNotes.map((n) => n.time + n.duration)) + 0.5;
  }
  function applyHands() {
    highwayNotes = handsMode === "both" ? baseNotes : baseNotes.map((n) => ({ ...n, ghost: n.hand !== handsMode }));
  }
  computeTotal();

  const finder = getNoteFinder();
  const seg = (name, items, active) => `<div class="hk-seg">${items.map(([v, label]) => `<button class="${v === active ? "hk-speed-active" : ""}" data-${name}="${v}">${label}</button>`).join("")}</div>`;
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
      <div class="hk-upload-quick">
        ${seg("mode", [["easy", "Easy chords"], ["detailed", "Every note"]], mode)}
        ${seg("loop", [["off", "No loop"], ["1", "Loop 1 bar"], ["2", "2 bars"], ["4", "4 bars"]], "off")}
      </div>
      <p class="hk-upload-loopnote hk-hidden" id="hk-upload-loopnote"></p>
      <p class="hk-upload-hands"><span class="hk-hand-l">L</span> left hand &nbsp;·&nbsp; <span class="hk-hand-r">R</span> right hand<span class="hk-upload-vel-legend" id="hk-upload-vel-legend"> &nbsp;·&nbsp; <span class="hk-vel-soft"></span> soft <span class="hk-vel-strong"></span> strong</span></p>
      <div class="hk-upload-wait hk-hidden" id="hk-upload-wait"></div>
      ${window.Capacitor?.isNativePlatform?.() ? `<button class="hk-btn hk-upload-guess" id="hk-upload-guess">${icon("search", 20)} Guess the song</button><div id="hk-upload-recognized"></div>` : ""}
      <div class="hk-upload-match" id="hk-upload-match"></div>
      <details class="hk-upload-settings">
        <summary>${icon("gear", 22)} Settings</summary>
        <div class="hk-set-row"><span>Speed</span><div class="hk-seg">${SPEEDS.map((s) => `<button class="${s === 1 ? "hk-speed-active" : ""}" data-speed="${s}">${s === 1 ? "Normal" : s === 0.5 ? "Slow" : "0.75×"}</button>`).join("")}</div></div>
        <div class="hk-set-row"><span>Wait for me</span><div class="hk-seg"><button class="hk-speed-active" data-wait="off">Off</button><button data-wait="on">On</button></div></div>
        <div class="hk-set-row"><span>Hands</span>${seg("hands", [["both", "Both"], ["left", "Left"], ["right", "Right"]], "both")}</div>
        ${originalEl ? `<div class="hk-set-row"><span>Sound</span><div class="hk-seg"><button class="hk-speed-active" data-sound="original">Song</button><button data-sound="piano">Piano</button><button data-sound="both">Both</button></div></div>` : ""}
        ${beat ? `<div class="hk-set-row"><span>Drum beat</span><div class="hk-seg"><button class="hk-speed-active" data-beat="off">Off</button><button data-beat="on">On</button></div></div>` : ""}
        ${file ? `<div class="hk-set-row"><span>Note finder</span>${seg("finder", [["auto", "Auto"], ["piano", "Piano"], ["any", "Any"]], finder)}</div>
        <p class="hk-upload-fine" id="hk-upload-finder-note">Piano: every note and how hard it's played (best for solo piano). Any: any instrument, for songs with singing, guitar or a band. Auto picks for you. Both work on your device.</p>` : ""}
        <p class="hk-honest-note" id="hk-upload-summary"></p>
      </details>
    </div>`;

  const kb = renderKeyboard(container.querySelector("#hk-upload-kb"), { startMidi: minMidi, endMidi: maxMidi });
  const highway = renderNoteHighway(container.querySelector("#hk-upload-highway"), kb.keyLayout);
  const playBtn = container.querySelector("#hk-upload-playpause");
  setTimeout(() => playBtn.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  const seek = container.querySelector("#hk-upload-seek");
  const clock = container.querySelector("#hk-upload-clock");
  const nowEl = container.querySelector("#hk-upload-now");
  const loopNote = container.querySelector("#hk-upload-loopnote");

  function updateSummary() {
    const finderName = engine === "onsets-frames" ? "the piano note finder (Onsets and Frames)" : "the everyday note finder (Basic Pitch)";
    const timing = grid ? ` About ${grid.bpm} beats a minute, ${grid.beatsPerBar} beats in a bar, ${bars.length} bars.` : "";
    container.querySelector("#hk-upload-summary").textContent = mode === "easy"
      ? `Easy: ${new Set(easyNotes.map((n) => n.chord)).size} simple chords.${timing}`
      : `Every note: ${detailedNotes.length} notes, found by ${finderName}.${timing} Our best guess from the recording.`;
    container.querySelector("#hk-upload-vel-legend").classList.toggle("hk-hidden", mode === "easy" || !detailedNotes.some((n) => n.velocity != null));
    seek.max = String(totalDuration);
    container.querySelector("#hk-upload-total").textContent = formatClock(totalDuration);
  }
  updateSummary();
  // Finer chord windows (one beat) for matching than for playing.
  showSongMatches(container.querySelector("#hk-upload-match"), simplifyToChords(detailedNotes, { windowSec: beatGuess ? beatGuess.beatSec : 0.5, offsetSec: beatGuess ? beatGuess.offsetSec : 0 }));

  container.querySelector("#hk-upload-guess")?.addEventListener("click", (e) => {
    e.currentTarget.disabled = true;
    e.currentTarget.textContent = "Listening…";
    lastRecognition = file ? recognizeFile(file).catch((err) => ({ found: false, error: err?.message || String(err) })) : (lastDecoded ? recognizeSong(lastDecoded) : Promise.resolve(null));
    showRecognition(container.querySelector("#hk-upload-recognized"), e.currentTarget);
  });

  let speed = 1;
  let playing = false;
  let pausedAt = 0;
  let playStartedAt = 0;
  let raf = null;
  let scheduled = []; // setTimeout ids for audio
  let lastActiveKey = "";
  let loopBars = 0; // 0 = off
  let loopRange = null; // { start, end, fromBar, toBar }

  function currentTime() {
    if (!playing || holding) return pausedAt;
    if (originalOn && originalEl && !originalEl.paused) return originalEl.currentTime;
    return pausedAt + ((performance.now() - playStartedAt) / 1000) * speed;
  }

  function clearScheduled() {
    scheduled.forEach((id) => clearTimeout(id));
    scheduled = [];
  }

  function scheduleAudioFrom(t) {
    clearScheduled();
    // When practising one hand, the other hand is always played for you.
    const ghostsOnly = !pianoOn && handsMode !== "both";
    if (!pianoOn && !ghostsOnly) return;
    const end = loopRange ? loopRange.end : Infinity;
    highwayNotes.forEach((n) => {
      if (n.time < t || n.time >= end) return; // already started, or after the loop point
      if (ghostsOnly && !n.ghost) return;
      const delayMs = ((n.time - t) / speed) * 1000;
      scheduled.push(setTimeout(() => playTone(n.midi, { duration: n.duration / speed, velocity: n.velocity ?? 100 }), delayMs));
    });
  }

  function drawFrame(t) {
    highway.render(t, highwayNotes, { bars, velocity: mode === "detailed", loop: loopRange });
    const active = highwayNotes.filter((n) => t >= n.time && t < n.time + n.duration);
    const barNo = bars.length ? barAt(bars, t) : 0;
    const key = active.map((n) => `${n.midi}${n.hand[0]}`).sort().join(",") + `|${barNo}`;
    if (key !== lastActiveKey) {
      lastActiveKey = key;
      kb.keyElements.forEach((el) => el.querySelector(".hk-key-notename")?.remove());
      const barText = barNo ? `<span class="hk-upload-bar">Bar ${barNo}</span> ` : "";
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
          const isLeft = active.some((n) => n.midi === midi && n.hand === "left");
          label.textContent = midiToName(midi);
          label.classList.add(isLeft ? "hk-notename-l" : "hk-notename-r");
          el.appendChild(label);
        });
        const chordLabel = active.find((n) => n.chord)?.chord;
        const lh = [...new Set(active.filter((n) => n.hand === "left").map((n) => n.midi))].sort((a, b) => a - b).map(midiToName);
        const rh = [...new Set(active.filter((n) => n.hand === "right").map((n) => n.midi))].sort((a, b) => a - b).map(midiToName);
        nowEl.innerHTML = `${barText}${chordLabel ? `<b>${chordLabel}</b> &nbsp;` : ""}${lh.length ? `<span class="hk-hand-l">L</span> ${lh.join(" ")}` : ""}${lh.length && rh.length ? " &nbsp; " : ""}${rh.length ? `<span class="hk-hand-r">R</span> ${rh.join(" ")}` : ""}`;
      } else {
        kb.clearHighlights();
        nowEl.innerHTML = barText || "&nbsp;";
      }
    }
    if (!seekDragging) seek.value = String(Math.min(t, totalDuration));
    clock.textContent = formatClock(t);
  }

  // Jump the clock (and everything that follows it) to time t.
  function jumpTo(t) {
    pausedAt = t;
    holding = false;
    nextGroup = groupAt(t);
    lastBeatSlot = null;
    if (!playing) { drawFrame(t); return; }
    playStartedAt = performance.now();
    if (originalOn && originalEl) { originalEl.currentTime = t; originalEl.play().catch(() => {}); }
    scheduleAudioFrom(t);
  }

  function loop() {
    // Stop cleanly if the user navigated away (tab hidden or this view
    // replaced) instead of playing audio into a screen nobody can see.
    if (!container.isConnected || container.offsetParent === null) {
      pause();
      return;
    }
    let t = holding ? pausedAt : currentTime();
    if (loopRange && !holding && t >= loopRange.end) {
      jumpTo(loopRange.start);
      t = loopRange.start;
    }
    if (waitOn && !holding && nextGroup && t >= nextGroup.time) { hold(nextGroup); t = pausedAt; }
    drawFrame(t);
    if (drumsOn && beat && t >= beat.offsetSec) {
      const slot = grid ? grid.beats.findIndex((b, i) => t >= b && t < (grid.beats[i + 1] ?? Infinity)) : Math.floor((t - beat.offsetSec) / beat.beatSec);
      if (slot !== lastBeatSlot) {
        lastBeatSlot = slot;
        // beat 1 of each bar gets the bar's first drum hit
        const inBar = grid ? ((slot - grid.firstBeatIndex) % grid.beatsPerBar + grid.beatsPerBar) % grid.beatsPerBar : slot;
        playBeat(getAudioContext(), inBar, getAudioContext().currentTime);
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
    if (loopRange && (pausedAt < loopRange.start - 0.01 || pausedAt >= loopRange.end)) pausedAt = loopRange.start;
    holding = false;
    nextGroup = groupAt(pausedAt);
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

  // Restarts playback around a settings change.
  function restartAround(fn) {
    const wasPlaying = playing;
    if (playing) pause();
    fn();
    if (wasPlaying) play();
  }

  playBtn.addEventListener("click", () => {
    if (playing) pause();
    else play();
  });
  container.querySelectorAll("[data-speed]").forEach((btn) => {
    btn.addEventListener("click", () => restartAround(() => {
      speed = Number(btn.dataset.speed);
      container.querySelectorAll("[data-speed]").forEach((b) => b.classList.toggle("hk-speed-active", b === btn));
    }));
  });
  container.querySelectorAll("[data-sound]").forEach((btn) => {
    btn.addEventListener("click", () => restartAround(() => {
      soundMode = btn.dataset.sound;
      originalOn = soundMode !== "piano";
      pianoOn = soundMode !== "original";
      container.querySelectorAll("[data-sound]").forEach((b) => b.classList.toggle("hk-speed-active", b === btn));
    }));
  });
  container.querySelectorAll("[data-beat]").forEach((btn) => {
    btn.addEventListener("click", () => {
      drumsOn = btn.dataset.beat === "on";
      lastBeatSlot = null;
      container.querySelectorAll("[data-beat]").forEach((b) => b.classList.toggle("hk-speed-active", b === btn));
    });
  });
  container.querySelectorAll("[data-hands]").forEach((btn) => {
    btn.addEventListener("click", () => restartAround(() => {
      handsMode = btn.dataset.hands;
      applyHands();
      lastActiveKey = null;
      nextGroup = groupAt(pausedAt);
      container.querySelectorAll("[data-hands]").forEach((b) => b.classList.toggle("hk-speed-active", b === btn));
      drawFrame(pausedAt);
    }));
  });

  // ----- Loop a section: 1, 2 or 4 bars from the bar you're in -----
  function setLoop(nBars, at) {
    loopBars = nBars;
    if (!nBars) {
      loopRange = null;
    } else if (bars.length) {
      let i = Math.max(0, barAt(bars, at) - 1);
      if (at < bars[0]) i = 0;
      const start = i === 0 && at < bars[0] ? Math.max(0, bars[0] - (grid.beatSec * grid.beatsPerBar)) : bars[i];
      const barLen = grid.beatSec * grid.beatsPerBar;
      const end = bars[i + nBars] ?? start + nBars * barLen;
      loopRange = { start, end, fromBar: i + 1, toBar: i + nBars };
    } else {
      // No beat found: loop 4-second pieces instead of bars.
      const start = Math.floor(at / 4) * 4;
      loopRange = { start, end: start + 4 * nBars };
    }
    container.querySelectorAll("[data-loop]").forEach((b) => b.classList.toggle("hk-speed-active", b.dataset.loop === (nBars ? String(nBars) : "off")));
    loopNote.classList.toggle("hk-hidden", !loopRange);
    if (loopRange) {
      loopNote.innerHTML = `${icon("review", 18)} ${loopRange.fromBar ? (loopRange.fromBar === loopRange.toBar ? `Looping bar ${loopRange.fromBar}` : `Looping bars ${loopRange.fromBar}–${loopRange.toBar}`) : `Looping ${formatClock(loopRange.start)}–${formatClock(loopRange.end)}`}. Move the slider to loop somewhere else.`;
    }
  }
  container.querySelectorAll("[data-loop]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const n = btn.dataset.loop === "off" ? 0 : Number(btn.dataset.loop);
      const at = currentTime();
      restartAround(() => {
        setLoop(n, at);
        if (loopRange) pausedAt = loopRange.start;
        drawFrame(pausedAt);
      });
    });
  });

  // ----- Wait for me: the notes stop at the line until you play them -----
  // (screen keys, a MIDI keyboard, or your real piano through the
  // microphone, which is used only to hear your piano keys).
  let waitOn = false;
  let holding = false;
  let heldGroup = null;
  let heard = [];
  const waitEl = container.querySelector("#hk-upload-wait");
  // The next chord (notes starting together) the learner has to play —
  // the hand the app plays for you doesn't wait.
  const groupAt = (t0) => {
    const first = highwayNotes.find((n) => !n.ghost && n.time >= t0 - 0.001);
    if (!first) return null;
    return { time: first.time, notes: highwayNotes.filter((n) => !n.ghost && Math.abs(n.time - first.time) < 0.06) };
  };
  let nextGroup = null;
  function showWait(html, ok = false) {
    waitEl.classList.toggle("hk-hidden", !waitOn);
    waitEl.classList.toggle("hk-wait-ok", ok);
    waitEl.innerHTML = html;
  }
  function hold(g) {
    holding = true;
    heldGroup = g;
    heard = [];
    pausedAt = g.time;
    if (originalEl) originalEl.pause();
    clearScheduled();
    const left = g.notes.filter((n) => n.hand === "left").map((n) => midiToName(n.midi));
    const right = g.notes.filter((n) => n.hand === "right").map((n) => midiToName(n.midi));
    showWait(`${icon("hand", 20)} Your turn: ${left.length ? `<b>left hand</b> ${left.join(" ")}` : ""}${left.length && right.length ? " + " : ""}${right.length ? `<b>right hand</b> ${right.join(" ")}` : ""}`);
  }
  function release() {
    if (!holding) return;
    holding = false;
    showWait(`${icon("check", 20)} Nice!`, true);
    nextGroup = groupAt(heldGroup.time + 0.07);
    playStartedAt = performance.now();
    if (originalOn && originalEl) { originalEl.currentTime = pausedAt; originalEl.play().catch(() => {}); }
    scheduleAudioFrom(pausedAt);
  }
  const offNote = onNoteOn((midi, source) => {
    if (!waitOn || !holding || !container.isConnected) return;
    const want = [...new Set(heldGroup.notes.map((n) => ((n.midi % 12) + 12) % 12))];
    heard.push(((midi % 12) + 12) % 12);
    const got = want.filter((pc) => heard.includes(pc)).length;
    // The microphone hears one clear note at a time: one right note (or two
    // for a chord) is enough. On screen or MIDI, play all of them.
    if (source === "mic" ? got >= Math.min(2, want.length) : got >= Math.min(3, want.length)) release();
  });
  container._hkOffNote = offNote;
  container.querySelectorAll("[data-wait]").forEach((btn) => btn.addEventListener("click", async () => {
    waitOn = btn.dataset.wait === "on";
    container.querySelectorAll("[data-wait]").forEach((b) => b.classList.toggle("hk-speed-active", b === btn));
    holding = false;
    nextGroup = groupAt(currentTime());
    if (waitOn) {
      showWait(`${icon("hand", 20)} The notes will wait for you. Play them on screen or on your piano. <button class="hk-btn hk-btn-small" id="hk-upload-mic">${icon("mic", 16)} Use my microphone</button><br><small>The microphone only listens for your piano.</small>`);
      waitEl.querySelector("#hk-upload-mic")?.addEventListener("click", async (e) => {
        // currentTarget is null once the await below has run, so keep the button.
        const micBtn = e.currentTarget;
        try { if (!micOn()) await enableMic(); micBtn.textContent = "Listening to your piano"; }
        catch (err) { micBtn.textContent = "Microphone not available"; }
      });
    } else showWait("");
  }));
  container.querySelectorAll("[data-mode]").forEach((btn) => {
    btn.addEventListener("click", () => restartAround(() => {
      mode = btn.dataset.mode;
      baseNotes = mode === "easy" && easyNotes.length ? easyNotes : detailedNotes;
      applyHands();
      computeTotal();
      pausedAt = Math.min(pausedAt, totalDuration);
      lastActiveKey = null; // force a full keyboard redraw for the new note set
      nextGroup = groupAt(pausedAt);
      container.querySelectorAll("[data-mode]").forEach((b) => b.classList.toggle("hk-speed-active", b === btn));
      updateSummary();
      drawFrame(pausedAt);
    }));
  });
  // Note finder: remembered for next time, and (when we still have the
  // file) this song is listened to again with the chosen one.
  container.querySelectorAll("[data-finder]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const v = btn.dataset.finder;
      setNoteFinder(v);
      container.querySelectorAll("[data-finder]").forEach((b) => b.classList.toggle("hk-speed-active", b === btn));
      const want = v === "piano" ? "onsets-frames" : v === "any" ? "basic-pitch" : null;
      if (!file || !want || want === engine) return;
      pause();
      const note = container.querySelector("#hk-upload-finder-note");
      container.querySelectorAll("[data-finder]").forEach((b) => { b.disabled = true; });
      try {
        const again = await transcribeFile(file, (text) => { note.textContent = text; }, { engine: v });
        if (container.isConnected) renderTranscribedPlayback(container, again, { file });
      } catch (err) {
        note.textContent = err.message;
        container.querySelectorAll("[data-finder]").forEach((b) => { b.disabled = false; });
      }
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
    // Moving outside the loop moves the loop to where you are.
    if (loopRange && (pausedAt < loopRange.start || pausedAt >= loopRange.end)) setLoop(loopBars, pausedAt);
    drawFrame(pausedAt);
    if (resumeAfterSeek) play();
    resumeAfterSeek = false;
  });

  // For tests and debugging: what the view is showing.
  container._hkDetail = { engine, grid, detailedNotes, easyNotes, get mode() { return mode; }, get loopRange() { return loopRange; }, seekTo: (t) => { pausedAt = t; drawFrame(t); } };
  drawFrame(0);
}

export { transcribeFile, resampleToMono22050, renderTranscribedPlayback, getNoteFinder, setNoteFinder };
