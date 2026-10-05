// On-screen piano keyboard component — pure DOM/CSS, no canvas, no
// dependencies. Renders a chromatic range of keys, supports highlighting
// a set of notes (for chord-shape teaching), click/tap-to-play with a
// synthesized tone, and reports which MIDI note was pressed.

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
  if (sharedAudioCtx.state === "suspended") sharedAudioCtx.resume();
  return sharedAudioCtx;
}

function freqFromMidi(midi) {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

function playTone(midi, { duration = 0.6, gain = 0.18, delay = 0 } = {}) {
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

function playChord(midiNotes, opts = {}) {
  midiNotes.forEach((m) => playTone(m, opts));
}

// Renders a keyboard into `container` and returns a control API.
function renderKeyboard(container, { startMidi = 60, endMidi = 84 } = {}) {
  container.innerHTML = "";
  container.classList.add("hk-keyboard");

  const whiteKeys = [];
  const blackKeys = [];
  for (let midi = startMidi; midi <= endMidi; midi++) {
    (isBlackKey(midi) ? blackKeys : whiteKeys).push(midi);
  }

  const whiteKeyWidthPct = 100 / whiteKeys.length;
  const keyElements = new Map();

  whiteKeys.forEach((midi, i) => {
    const el = document.createElement("div");
    el.className = "hk-key hk-key-white";
    el.style.left = `${i * whiteKeyWidthPct}%`;
    el.style.width = `${whiteKeyWidthPct}%`;
    el.dataset.midi = String(midi);
    container.appendChild(el);
    keyElements.set(midi, el);
  });

  // Position black keys relative to the white key they sit between.
  blackKeys.forEach((midi) => {
    // Count how many white keys precede this black key to find its
    // fractional position.
    const whiteBefore = whiteKeys.filter((w) => w < midi).length;
    const el = document.createElement("div");
    el.className = "hk-key hk-key-black";
    el.style.left = `${whiteBefore * whiteKeyWidthPct - whiteKeyWidthPct * 0.3}%`;
    el.style.width = `${whiteKeyWidthPct * 0.6}%`;
    el.dataset.midi = String(midi);
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
      const badge = el.querySelector(".hk-key-badge");
      if (badge) badge.remove();
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

  return { clearHighlights, highlightChord, highlightHands, onKeyPress, getKeyElement, keyElements };
}

export { renderKeyboard, playTone, playChord, midiToName, isBlackKey, freqFromMidi, getAudioContext };
