// On-screen piano keyboard component — pure DOM/CSS, no canvas, no
// dependencies. Renders a chromatic range of keys, supports highlighting
// a set of notes (for chord-shape teaching), click/tap-to-play with a
// synthesized tone, and reports which MIDI note was pressed.

import { loadSampledPiano, getSampledPianoIfReady } from "./piano-sample.js";
import { emitNoteOn } from "./input-hub.js";

const NOTE_NAMES = [
  "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B",
];
const BLACK_PITCH_CLASSES = new Set([1, 3, 6, 8, 10]);

function midiToName(midi) {
  const pitchClass = ((midi % 12) + 12) % 12;
  const octave = Math.floor(midi / 12) - 1;
  return `${NOTE_NAMES[pitchClass]}${octave}`;
}

function isBlackKey(midi) {
  return BLACK_PITCH_CLASSES.has(((midi % 12) + 12) % 12);
}

// Shared audio context + simple triangle-wave synth so every part of the
// app (keyboard clicks, lesson playback, calibration tone) shares one
// context instead of fighting over autoplay permission.
let sharedAudioCtx = null;
function getAudioContext() {
  if (!sharedAudioCtx) {
    sharedAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  // iOS also has an "interrupted" state (after a call, Siri, or switching
  // apps) — resume from anything that isn't running.
  if (sharedAudioCtx.state !== "running") sharedAudioCtx.resume?.().catch?.(() => {});
  return sharedAudioCtx;
}

// iOS: Web Audio stays silent until it's resumed inside a real tap, and
// in Safari/the app it follows the ringer switch unless the page asks for
// "playback" audio (like a music app). Unlock on the first touch, with a
// one-sample silent buffer, so the very first key/strum is heard.
if (typeof navigator !== "undefined" && navigator.audioSession) {
  try { navigator.audioSession.type = "playback"; } catch (e) { /* older Safari */ }
}
function unlockAudio() {
  const c = getAudioContext();
  try {
    const b = c.createBuffer(1, 1, c.sampleRate);
    const s = c.createBufferSource();
    s.buffer = b;
    s.connect(c.destination);
    s.start(0);
  } catch (e) { /* ignore */ }
  // Keep listening for taps for the whole session: iOS can suspend or
  // "interrupt" audio later (a call, Siri, the app going to the
  // background), and it only comes back from inside a real tap.
  if (c.state !== "running") c.resume?.();
}
if (typeof document !== "undefined") document.addEventListener("visibilitychange", () => { if (!document.hidden) getAudioContext(); });
if (typeof window !== "undefined") ["touchend", "pointerdown", "keydown"].forEach((t) => window.addEventListener(t, unlockAudio, true));

function freqFromMidi(midi) {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

function playSynthTone(midi, { duration = 0.6, gain = 0.18, delay = 0 } = {}) {
  const ctx = getAudioContext();
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = "triangle";
  osc.frequency.value = freqFromMidi(midi);
  const startAt = ctx.currentTime + delay;
  g.gain.setValueAtTime(0, startAt);
  g.gain.linearRampToValueAtTime(gain, startAt + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);
  osc.connect(g).connect(ctx.destination);
  osc.start(startAt);
  osc.stop(startAt + duration + 0.05);
}

// Item 45: richer piano timbre, as a progressive enhancement over the
// plain oscillator synth above. Kicks off loading the real sampled
// piano (piano-sample.js) on first call (idempotent, safe to call
// repeatedly) but NEVER waits on it — if it's not ready yet (or never
// becomes ready, e.g. offline), this plays the exact same synth tone
// as before with zero behavior change. Once it IS ready, every note
// everywhere that calls playTone/playChord sounds like a real sampled
// piano instead, with no caller-side code changes needed.
function playTone(midi, opts = {}) {
  const ctx = getAudioContext();
  loadSampledPiano(ctx);
  const piano = getSampledPianoIfReady();
  // velocity 1-127 (default 100): how hard the key is pressed.
  const velocity = opts.velocity ?? 100;
  if (piano) {
    const { duration = 0.6, delay = 0 } = opts;
    piano.start({ note: midi, duration, time: ctx.currentTime + delay, velocity });
    return;
  }
  playSynthTone(midi, { ...opts, gain: (opts.gain ?? 0.18) * (velocity / 100) });
}

function playChord(midiNotes, opts = {}) {
  midiNotes.forEach((m) => playTone(m, opts));
}

// Computes each key's horizontal position/width as a percentage of the
// full keyboard width, for a given MIDI range. Shared by the keyboard
// renderer itself and by the falling-note highway (note-highway.js),
// so falling blocks land in exact horizontal alignment with the real
// keys underneath them — one source of layout truth, not two.
function computeKeyLayout(startMidi, endMidi) {
  const whiteKeys = [];
  const blackKeys = [];
  for (let midi = startMidi; midi <= endMidi; midi++) {
    (isBlackKey(midi) ? blackKeys : whiteKeys).push(midi);
  }
  const whiteKeyWidthPct = 100 / whiteKeys.length;
  const layout = new Map();
  whiteKeys.forEach((midi, i) => {
    layout.set(midi, { xPct: i * whiteKeyWidthPct, widthPct: whiteKeyWidthPct, isBlack: false });
  });
  blackKeys.forEach((midi) => {
    const whiteBefore = whiteKeys.filter((w) => w < midi).length;
    layout.set(midi, {
      xPct: whiteBefore * whiteKeyWidthPct - whiteKeyWidthPct * 0.3,
      widthPct: whiteKeyWidthPct * 0.6,
      isBlack: true,
    });
  });
  return layout;
}

// Renders a keyboard into `container` and returns a control API.
function renderKeyboard(container, { startMidi = 60, endMidi = 84, markMiddleC = true } = {}) {
  container.innerHTML = "";
  container.classList.add("hk-keyboard");

  const keyLayout = computeKeyLayout(startMidi, endMidi);
  const keyElements = new Map();

  keyLayout.forEach((pos, midi) => {
    const el = document.createElement("div");
    el.className = `hk-key ${pos.isBlack ? "hk-key-black" : "hk-key-white"}`;
    el.style.left = `${pos.xPct}%`;
    el.style.width = `${pos.widthPct}%`;
    el.dataset.midi = String(midi);
    // Item 56: a permanent Middle C marker on every keyboard, so the
    // landmark every lesson counts from is always visible on screen.
    if (midi === 60 && markMiddleC) {
      el.classList.add("hk-key-middlec");
      el.title = "Middle C";
    }
    container.appendChild(el);
    keyElements.set(midi, el);
  });

  let pressHandler = null;

  container.addEventListener("pointerdown", (e) => {
    const target = e.target.closest(".hk-key");
    if (!target) return;
    const midi = Number(target.dataset.midi);
    target.classList.add("hk-key-pressed");
    playTone(midi, { duration: 0.5 });
    if (pressHandler) pressHandler(midi);
    emitNoteOn(midi, "screen");
  });
  container.addEventListener("pointerup", (e) => {
    const target = e.target.closest(".hk-key");
    if (target) target.classList.remove("hk-key-pressed");
  });
  container.addEventListener("pointerleave", (e) => {
    const target = e.target.closest(".hk-key");
    if (target) target.classList.remove("hk-key-pressed");
  });

  function clearHighlights() {
    keyElements.forEach((el) => {
      el.classList.remove("hk-key-highlight", "hk-key-hand-left", "hk-key-hand-right");
      el.querySelectorAll(".hk-key-badge, .hk-key-notename, .hk-key-letter, .hk-finger-badge").forEach((b) => b.remove());
    });
  }

  // Highlights a chord's notes. `rootMidi` gets the big number/letter
  // badge (numbers-first pedagogy); other notes just light up.
  function highlightChord(midiNotes, { number, letter, rootMidi } = {}) {
    clearHighlights();
    midiNotes.forEach((midi) => {
      const el = keyElements.get(midi);
      if (!el) return;
      el.classList.add("hk-key-highlight");
      // Item 56: in a chord, every lit key shows its own note letter
      // (G · B · D), so "the G chord" reads as three named keys rather
      // than one labelled key plus two anonymous ones.
      if (midiNotes.length > 1) {
        const tag = document.createElement("div");
        tag.className = "hk-key-letter";
        tag.textContent = midiToName(midi).replace(/-?\d+$/, "");
        el.appendChild(tag);
      }
      if (midi === (rootMidi ?? midiNotes[0]) && (number || letter)) {
        const badge = document.createElement("div");
        badge.className = "hk-key-badge";
        badge.innerHTML = `<span class="hk-badge-number">${number ?? ""}</span><span class="hk-badge-letter">${letter ?? ""}</span>`;
        el.appendChild(badge);
      }
    });
  }

  // Highlights two independent note sets by hand, each at its own real
  // absolute octave/position on the keyboard — e.g. a left-hand bass
  // note down in a low octave and a right-hand chord an octave or more
  // away render with genuine spatial distance between them (the
  // keyboard always spans real piano key widths across its MIDI range,
  // never compressed), with a distinct color per hand so register
  // separation is visible at a glance, not just implied by which notes
  // happen to be highlighted. Each note also gets a small "L"/"R" tag.
  function highlightHands({ left = [], right = [], leftLabel, rightLabel } = {}) {
    clearHighlights();
    left.forEach((midi, i) => {
      const el = keyElements.get(midi);
      if (!el) return;
      el.classList.add("hk-key-hand-left");
      if (i === 0) {
        const badge = document.createElement("div");
        badge.className = "hk-key-badge hk-key-badge-left";
        badge.innerHTML = `<span class="hk-badge-hand">L</span><span class="hk-badge-letter">${leftLabel ?? ""}</span>`;
        el.appendChild(badge);
      }
    });
    right.forEach((midi, i) => {
      const el = keyElements.get(midi);
      if (!el) return;
      el.classList.add("hk-key-hand-right");
      if (i === 0) {
        const badge = document.createElement("div");
        badge.className = "hk-key-badge hk-key-badge-right";
        badge.innerHTML = `<span class="hk-badge-hand">R</span><span class="hk-badge-letter">${rightLabel ?? ""}</span>`;
        el.appendChild(badge);
      }
    });
  }

  function onKeyPress(cb) {
    pressHandler = cb;
  }

  function getKeyElement(midi) {
    return keyElements.get(midi);
  }

  return { clearHighlights, highlightChord, highlightHands, onKeyPress, getKeyElement, keyElements, keyLayout, startMidi, endMidi };
}

export { renderKeyboard, computeKeyLayout, playTone, playChord, midiToName, isBlackKey, freqFromMidi, getAudioContext };
