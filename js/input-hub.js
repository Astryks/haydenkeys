// Item 59: one place every "a key was played" signal flows through, so
// wait mode, the daily review and the sheet-music lessons can listen to
// all input sources the same way:
//   - tapping/clicking the on-screen keyboard (keyboard.js)
//   - the laptop keyboard (computer-keys.js)
//   - a real USB / Bluetooth MIDI keyboard (Web MIDI — Chrome, Edge and
//     other Chromium browsers; NOT Safari or the iOS app, which don't
//     implement Web MIDI)
//   - the microphone, for single notes (monophonic pitch tracking — it
//     can't reliably pick out several notes of a chord at once)
// Listeners get (midi, source). Sources that make their own sound (a
// real piano/keyboard via MIDI or mic) are flagged so callers don't
// play a second, synthesized copy of the note.

import { startLivePitchDetection } from "./pitch.js";

const listeners = new Set();

function onNoteOn(cb) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function emitNoteOn(midi, source = "screen") {
  listeners.forEach((cb) => {
    try {
      cb(midi, source);
    } catch (e) {
      console.error(e);
    }
  });
}

// --- Web MIDI ------------------------------------------------------------
let midiAccess = null;
let midiStatus = "off"; // off | unsupported | denied | ready
const midiStatusListeners = new Set();

function midiSupported() {
  return typeof navigator !== "undefined" && typeof navigator.requestMIDIAccess === "function";
}

function attachInput(input) {
  input.onmidimessage = (msg) => {
    const [status, note, velocity] = msg.data;
    const kind = status & 0xf0;
    if (kind === 0x90 && velocity > 0) emitNoteOn(note, "midi");
  };
}

function connectedMidiNames() {
  if (!midiAccess) return [];
  return [...midiAccess.inputs.values()].filter((i) => i.state === "connected").map((i) => i.name || "MIDI keyboard");
}

async function enableMidi() {
  if (!midiSupported()) {
    midiStatus = "unsupported";
    midiStatusListeners.forEach((cb) => cb(midiStatus));
    return midiStatus;
  }
  if (midiAccess) return midiStatus;
  try {
    midiAccess = await navigator.requestMIDIAccess();
    midiAccess.inputs.forEach(attachInput);
    midiAccess.onstatechange = (e) => {
      if (e.port.type === "input" && e.port.state === "connected") attachInput(e.port);
      midiStatusListeners.forEach((cb) => cb(midiStatus));
    };
    midiStatus = "ready";
  } catch (e) {
    midiStatus = "denied";
  }
  midiStatusListeners.forEach((cb) => cb(midiStatus));
  return midiStatus;
}

function onMidiStatus(cb) {
  midiStatusListeners.add(cb);
  return () => midiStatusListeners.delete(cb);
}

// --- Microphone (single notes) --------------------------------------------
// A note counts once the same pitch is heard on 3 consecutive analysis
// frames (≈50ms) and in tune within ±40 cents; it can't fire again until
// the pitch changes or there's a gap, so one held note is one press.
// Chroma frames for chord recognition (see pitch.js): cb(chroma[12], level).
const chromaListeners = new Set();
function onChroma(cb) {
  chromaListeners.add(cb);
  return () => chromaListeners.delete(cb);
}

let stopMic = null;
async function enableMic() {
  if (stopMic) return true;
  let candidate = null;
  let frames = 0;
  let lastEmitted = null;
  try {
    stopMic = await startLivePitchDetection((r) => {
      if (!r || Math.abs(r.cents) >= 40) {
        candidate = null;
        frames = 0;
        if (!r) lastEmitted = null;
        return;
      }
      if (r.noteMidi === candidate) frames++;
      else {
        candidate = r.noteMidi;
        frames = 1;
      }
      if (frames >= 3 && candidate !== lastEmitted) {
        lastEmitted = candidate;
        emitNoteOn(candidate, "mic");
      }
    }, { onChroma: (c, level) => chromaListeners.forEach((cb) => cb(c, level)) });
    return true;
  } catch (e) {
    stopMic = null;
    throw e;
  }
}

function disableMic() {
  if (stopMic) stopMic();
  stopMic = null;
}

function micOn() {
  return Boolean(stopMic);
}

export {
  onNoteOn,
  onChroma,
  emitNoteOn,
  midiSupported,
  enableMidi,
  onMidiStatus,
  connectedMidiNames,
  enableMic,
  disableMic,
  micOn,
};
