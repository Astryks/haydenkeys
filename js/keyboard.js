// On-screen piano keyboard component — pure DOM/CSS, no canvas, no
// dependencies. Renders a chromatic range of keys, supports highlighting
// a set of notes (for chord-shape teaching), click/tap-to-play with a
// synthesized tone, and reports which MIDI note was pressed.

import { loadSampledPiano, getSampledPianoIfReady, resetSampledPiano } from "./piano-sample.js";
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
function freshAudioContext() {
  try { sharedAudioCtx && sharedAudioCtx.close(); } catch (e) { /* ignore */ }
  sharedAudioCtx = null;
  resetSampledPiano();
  return getAudioContext();
}
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
  let c = getAudioContext();
  // Back from YouTube (or a call): iOS can hand back an "interrupted" engine
  // that never plays again. Replace it right here, inside the tap, where iOS
  // lets a new one start straight away.
  if (c.state === "interrupted" || c.state === "closed") { c = freshAudioContext(); c.resume?.().catch(() => {}); }
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
  if (c.state !== "running") {
    c.resume?.().catch(() => {});
    // Still stuck a moment later (iOS "interrupted"): use a fresh engine.
    setTimeout(() => { if (sharedAudioCtx === c && c.state !== "running") freshAudioContext(); }, 400);
  }
  // Load the real piano sound early, so the first notes aren't the backup tone.
  loadSampledPiano(getAudioContext());
}
if (typeof document !== "undefined") document.addEventListener("visibilitychange", () => {
  if (document.hidden) return;
  // Coming back to the app: wake the sound; if iOS left it stuck, the next tap
  // (unlockAudio) swaps in a fresh engine.
  const c = getAudioContext();
  if (c.state !== "running") c.resume?.().catch(() => {});
});
if (typeof window !== "undefined") window.addEventListener("pageshow", () => { const c = getAudioContext(); if (c.state !== "running") c.resume?.().catch(() => {}); });
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
  // iOS can hand back a paused audio engine for a moment (after a call, the
  // photo picker, or the first tap). A note scheduled then is never heard,
  // so wait for the engine to wake up and play it then.
  // If iOS won't wake it (it can stay "interrupted" after a call, Siri or
  // the microphone, and then every note in the app is silent), start a
  // fresh audio engine and play the note on that.
  if (ctx.state !== "running" && !opts._retried) {
    let done = false;
    const go = () => { if (!done) { done = true; playTone(midi, { ...opts, _retried: true }); } };
    ctx.resume?.().then(go).catch(() => {});
    setTimeout(() => { if (done) return; if (ctx.state !== "running") freshAudioContext(); go(); }, 350);
    return;
  }
  loadSampledPiano(ctx);
  const piano = getSampledPianoIfReady();
  // velocity 1-127 (default 100): how hard the key is pressed.
  const velocity = opts.velocity ?? 100;
  if (piano) {
    const { duration = 0.6, delay = 0 } = opts;
    // Only the velocity 85-100 sample layer is loaded (piano-sample.js),
    // and the sampler stays SILENT for any velocity outside it, so soft
    // (e.g. 35) and strong (e.g. 120) notes used to make no sound at all.
    // Keep the velocity inside the loaded layer; a strong note gets a
    // second identical voice (+6 dB) so soft vs strong is still clear.
    const sv = Math.max(85, Math.min(100, velocity));
    const time = ctx.currentTime + delay;
    piano.start({ note: midi, duration, time, velocity: sv });
    if (velocity >= 110) piano.start({ note: midi, duration, time, velocity: sv });
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
  // happen to be highlighted. Each note also gets its own "L"/"R" tag.
  function highlightHands({ left = [], right = [], leftLabel, rightLabel } = {}) {
    clearHighlights();
    // Every lit key says which hand plays it: a pink "L" or a blue "R".
    const mark = (list, hand, label) => list.forEach((midi, i) => {
      const el = keyElements.get(midi);
      if (!el) return;
      el.classList.add(`hk-key-hand-${hand}`);
      const badge = document.createElement("div");
      badge.className = `hk-key-badge hk-key-badge-${hand}`;
      badge.innerHTML = `<span class="hk-badge-hand">${hand === "left" ? "L" : "R"}</span>${i === 0 && label ? `<span class="hk-badge-letter">${label}</span>` : ""}`;
      el.appendChild(badge);
    });
    mark(left, "left", leftLabel);
    mark(right, "right", rightLabel);
  }

  // Cartoon hands over the keys, with the real fingering: a right-hand
  // chord is thumb (1) · middle (3) · pinky (5) from the bottom note up; a
  // left-hand low note is the pinky (5); a left-hand chord is 5 · 3 · 1.
  // Fingers that play reach down onto their key; the rest stay curled.
  const whiteCount = [...keyLayout.values()].filter((p) => !p.isBlack).length;
  const whiteW = 100 / whiteCount;
  const handsEl = document.createElement("div");
  handsEl.className = "hk-hands";
  container.appendChild(handsEl);
  const centre = (m) => { const p = keyLayout.get(m); return p ? p.xPct + p.widthPct / 2 : null; };
  function fingering(notes, side) {
    const n = [...notes].sort((a, b) => a - b);
    const pick = side === "right"
      ? (n.length === 1 ? [1] : n.length === 2 ? [1, 5] : n.length === 3 ? [1, 3, 5] : [1, 2, 3, 5].slice(0, n.length))
      : (n.length === 1 ? [5] : n.length === 2 ? [5, 1] : n.length === 3 ? [5, 3, 1] : [5, 3, 2, 1].slice(0, n.length));
    const map = new Map();
    n.forEach((m, i) => map.set(pick[i], m));
    return map; // finger -> midi
  }
  function handHtml(notes, side) {
    if (!notes.length) return "";
    const fm = fingering(notes, side);
    const dir = side === "right" ? 1 : -1; // finger 1 → 5 goes right for the right hand, left for the left hand
    const [f0, m0] = [...fm.entries()][0];
    const x1 = centre(m0) - dir * (f0 - 1) * whiteW;
    const xs = {};
    for (let f = 1; f <= 5; f++) xs[f] = fm.has(f) ? centre(fm.get(f)) : x1 + dir * (f - 1) * whiteW;
    const lo = Math.min(...Object.values(xs)) - whiteW * 0.55, hi = Math.max(...Object.values(xs)) + whiteW * 0.55;
    let h = `<div class="hk-hand hk-hand-${side}"><div class="hk-palm" style="left:${lo}%;width:${hi - lo}%"></div>`;
    for (let f = 1; f <= 5; f++) {
      const m = fm.get(f);
      const down = m !== undefined;
      const tip = down ? (isBlackKey(m) ? 46 : 70) : f === 1 ? 22 : 30;
      h += `<div class="hk-finger ${down ? "hk-finger-down" : ""} ${f === 1 ? "hk-thumb" : ""}" style="left:${xs[f] - whiteW * 0.31}%;width:${whiteW * 0.62}%;--tip:${tip}%"><span>${f}</span></div>`;
    }
    return h + "</div>";
  }
  function showHands({ left = [], right = [] } = {}) {
    handsEl.innerHTML = handHtml(left, "left") + handHtml(right, "right");
    handsEl.classList.remove("hk-hands-on");
    requestAnimationFrame(() => requestAnimationFrame(() => handsEl.classList.add("hk-hands-on")));
  }
  function hideHands() { handsEl.innerHTML = ""; }

  function onKeyPress(cb) {
    pressHandler = cb;
  }

  function getKeyElement(midi) {
    return keyElements.get(midi);
  }

  return { clearHighlights, highlightChord, highlightHands, showHands, hideHands, onKeyPress, getKeyElement, keyElements, keyLayout, startMidi, endMidi };
}

export { renderKeyboard, computeKeyLayout, playTone, playChord, midiToName, isBlackKey, freqFromMidi, getAudioContext };
