// Shared computer-keyboard-as-piano input (item 28, generalized in item
// 42). One mapping, one listener, reused everywhere a rendered
// keyboard.js keyboard wants to be playable from a physical laptop
// keyboard (the MIDI tab, Lesson 1). Factored out here so there is
// exactly one place that owns "what key plays what note."
//
// Item 56 redesign. The item 50 mapping put every semitone in a straight
// line (Q W E R T Y U I O P = C4..A4, then A S D F G H J K L = A#4..F#5):
// white and black notes were mixed along one row with no piano shape,
// the right hand sat directly under the left, and only 19 notes
// (C4-F#5) existed at all. Replaced with the layout every typing-piano
// tool uses (GarageBand Musical Typing, Ableton, FL Studio, trackers):
// PIANO-SHAPED — white notes along one row, black notes on the row
// above, sitting in the gaps between the white keys exactly where a
// piano's black keys sit — plus octave shifting, so the whole 88-key
// range (A0-C8) is reachable. Two layouts, remembered per device:
//
// "split" (default) — two hands, physically apart. Left hand bottom-left,
// right hand top-right, so they don't stack on top of each other:
//   LEFT   blacks:  S D   G H J          (C# D#  F# G# A#)
//          whites: Z X C V B N M         (C D E F G A B)      C3-B3
//   RIGHT  blacks:  6 7   9 0 -          (C# D#  F# G# A#)
//          whites: T Y U I O P [ ] \     (C D E F G A B C D)  C4-D5
//   Left hand octave: Down/Up arrows. Right hand octave: Left/Right arrows.
//   The right hand gets 9 white keys (to D5) so Lesson 1's whole G-D-Em-C
//   progression (MIDI 60-74) fits without shifting.
//
// "piano" — one hand, GarageBand-style, on the home row:
//   blacks:  W E   T Y U   O P           (C# D#  F# G# A#  C# D#)
//   whites: A S D F G H J K L ; '         (C D E F G A B C D E F)  C4-F5
//   Octave: Z / X, or Left/Right arrows.
//
// Physical key positions (KeyboardEvent.code), not typed characters, so
// Shift/Caps Lock and non-US keyboard layouts all map the same way.

import { playTone } from "./keyboard.js";

const PIANO_MIN = 21; // A0
const PIANO_MAX = 108; // C8
const LAYOUT_STORAGE_KEY = "hk_midi_layout";

// Each zone: codes -> semitone offset from that zone's base C.
const ZONES = {
  split: [
    {
      hand: "left",
      defaultBase: 48, // C3
      octaveDown: "ArrowDown",
      octaveUp: "ArrowUp",
      keys: {
        KeyZ: 0, KeyS: 1, KeyX: 2, KeyD: 3, KeyC: 4, KeyV: 5, KeyG: 6,
        KeyB: 7, KeyH: 8, KeyN: 9, KeyJ: 10, KeyM: 11,
      },
    },
    {
      hand: "right",
      defaultBase: 60, // C4
      octaveDown: "ArrowLeft",
      octaveUp: "ArrowRight",
      keys: {
        KeyT: 0, Digit6: 1, KeyY: 2, Digit7: 3, KeyU: 4, KeyI: 5, Digit9: 6,
        KeyO: 7, Digit0: 8, KeyP: 9, Minus: 10, BracketLeft: 11,
        BracketRight: 12, Backslash: 14,
      },
    },
  ],
  piano: [
    {
      hand: null, // colored by register: below Middle C = left, else right
      defaultBase: 60, // C4
      octaveDown: ["KeyZ", "ArrowLeft"],
      octaveUp: ["KeyX", "ArrowRight"],
      keys: {
        KeyA: 0, KeyW: 1, KeyS: 2, KeyE: 3, KeyD: 4, KeyF: 5, KeyT: 6,
        KeyG: 7, KeyY: 8, KeyH: 9, KeyU: 10, KeyJ: 11, KeyK: 12, KeyO: 13,
        KeyL: 14, KeyP: 15, Semicolon: 16, Quote: 17,
      },
    },
  ],
};

const CODE_LABELS = {
  Semicolon: ";", Quote: "'", Minus: "-", BracketLeft: "[", BracketRight: "]", Backslash: "\\",
};
function codeLabel(code) {
  if (CODE_LABELS[code]) return CODE_LABELS[code];
  return code.replace(/^Key|^Digit/, "");
}

function loadSettings() {
  try {
    const raw = JSON.parse(localStorage.getItem(LAYOUT_STORAGE_KEY) || "null");
    if (raw && ZONES[raw.layout]) return raw;
  } catch (e) {
    // fall through to defaults
  }
  return { layout: "split" };
}

let layout = loadSettings().layout;
let bases = ZONES[layout].map((z) => z.defaultBase);
const listeners = new Set();

function saveSettings() {
  try {
    localStorage.setItem(LAYOUT_STORAGE_KEY, JSON.stringify({ layout }));
  } catch (e) {
    // private mode etc. — the layout just won't be remembered
  }
}

function notifyChange() {
  listeners.forEach((cb) => cb());
}

function zoneSpan(zone) {
  const offsets = Object.values(zone.keys);
  return { lo: Math.min(...offsets), hi: Math.max(...offsets) };
}

// Shifting stops once a zone would leave the 88-key range entirely, so
// every shift keeps at least some of the zone's keys on real piano
// notes (that's how the lowest A0-B0 and the top C8 are reached).
function shiftOctave(zoneIndex, delta) {
  const zone = ZONES[layout][zoneIndex];
  const { lo, hi } = zoneSpan(zone);
  const next = bases[zoneIndex] + 12 * delta;
  if (next + hi < PIANO_MIN || next + lo > PIANO_MAX) return;
  bases[zoneIndex] = next;
  notifyChange();
}

function setLayout(name) {
  if (!ZONES[name] || name === layout) return;
  layout = name;
  bases = ZONES[layout].map((z) => z.defaultBase);
  saveSettings();
  releaseAll();
  notifyChange();
}

function getLayout() {
  return layout;
}

function handForMidi(zone, midi) {
  return zone.hand || (midi < 60 ? "left" : "right");
}

function codeToMidi(code) {
  const zones = ZONES[layout];
  for (let i = 0; i < zones.length; i++) {
    const offset = zones[i].keys[code];
    if (offset === undefined) continue;
    const midi = bases[i] + offset;
    if (midi < PIANO_MIN || midi > PIANO_MAX) return null;
    return { midi, hand: handForMidi(zones[i], midi) };
  }
  return null;
}

// Every currently-mapped note -> { label, hand }. If two zones reach the
// same note (only after moving them to overlap), the first one wins.
function currentMapping() {
  const map = new Map();
  ZONES[layout].forEach((zone, i) => {
    Object.entries(zone.keys).forEach(([code, offset]) => {
      const midi = bases[i] + offset;
      if (midi < PIANO_MIN || midi > PIANO_MAX || map.has(midi)) return;
      map.set(midi, { label: codeLabel(code), hand: handForMidi(zone, midi) });
    });
  });
  return map;
}

// Human-readable summary of each zone's current range and octave keys,
// for on-screen instructions.
function describeZones() {
  return ZONES[layout].map((zone, i) => {
    const { lo, hi } = zoneSpan(zone);
    const down = [].concat(zone.octaveDown).map(prettyKey).join(" / ");
    const up = [].concat(zone.octaveUp).map(prettyKey).join(" / ");
    return {
      index: i,
      hand: zone.hand,
      lowMidi: Math.max(PIANO_MIN, bases[i] + lo),
      highMidi: Math.min(PIANO_MAX, bases[i] + hi),
      octaveDownKeys: down,
      octaveUpKeys: up,
    };
  });
}

function prettyKey(code) {
  return { ArrowLeft: "←", ArrowRight: "→", ArrowUp: "↑", ArrowDown: "↓" }[code] || codeLabel(code);
}

function onMappingChange(cb) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

// --- Single shared document-level listener, many possible targets ---
//
// Multiple screens can each render their own keyboard.js keyboard (MIDI
// tab, Lesson 1, ...) while only one is actually visible at a time.
// There is exactly one listener, routed to whichever registered
// target's container element is currently visible (`offsetParent !==
// null` — covers the app's `.hk-hidden { display: none }` tab switching
// and any lesson step that swaps its content out).
const targets = []; // [{ kb, container }], most-recently-registered first
let listenersInstalled = false;

function visibleTarget() {
  for (const t of targets) {
    if (t.container && t.container.offsetParent !== null && document.body.contains(t.container)) return t;
  }
  return null;
}

function isTypingTarget() {
  const el = document.activeElement;
  return el && (["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName) || el.isContentEditable);
}

const heldLeft = new Set();
const heldRight = new Set();
const activeCodes = new Map(); // code -> { midi, hand, kb } as pressed (dedupes OS key-repeat)

function refreshHighlight(kb) {
  if (heldLeft.size === 0 && heldRight.size === 0) {
    kb.clearHighlights();
    return;
  }
  kb.highlightHands({ left: [...heldLeft], right: [...heldRight], leftLabel: "L", rightLabel: "R" });
}

function releaseAll() {
  activeCodes.forEach(({ kb }) => {
    heldLeft.clear();
    heldRight.clear();
    refreshHighlight(kb);
  });
  activeCodes.clear();
}

function ensureListenersInstalled() {
  if (listenersInstalled) return;
  listenersInstalled = true;
  document.addEventListener("keydown", (e) => {
    // Never intercept while the user is typing somewhere else (a search
    // box, etc.) or using a browser/OS shortcut.
    if (isTypingTarget() || e.metaKey || e.ctrlKey || e.altKey) return;
    const target = visibleTarget();
    if (!target) return;

    const zones = ZONES[layout];
    for (let i = 0; i < zones.length; i++) {
      const down = [].concat(zones[i].octaveDown);
      const up = [].concat(zones[i].octaveUp);
      if (down.includes(e.code) || up.includes(e.code)) {
        e.preventDefault(); // arrows would otherwise scroll the page
        if (!e.repeat) shiftOctave(i, down.includes(e.code) ? -1 : 1);
        return;
      }
    }

    if (activeCodes.has(e.code)) return;
    const mapped = codeToMidi(e.code);
    if (!mapped) return;
    e.preventDefault();
    activeCodes.set(e.code, { ...mapped, kb: target.kb });
    (mapped.hand === "left" ? heldLeft : heldRight).add(mapped.midi);
    playTone(mapped.midi, { duration: 0.6 });
    refreshHighlight(target.kb);
  });
  document.addEventListener("keyup", (e) => {
    // Release exactly what this key pressed, even if the octave changed
    // while it was held.
    const pressed = activeCodes.get(e.code);
    if (!pressed) return;
    activeCodes.delete(e.code);
    (pressed.hand === "left" ? heldLeft : heldRight).delete(pressed.midi);
    refreshHighlight(pressed.kb);
  });
  // Switching windows mid-press never delivers the keyup.
  window.addEventListener("blur", releaseAll);
}

// Registers `kb` (a keyboard.js renderKeyboard() instance) + its
// `container` DOM element as a candidate target for computer-keyboard
// input. Safe to call repeatedly — the same container just moves to the
// front of the list.
function registerComputerKeyboardTarget(kb, container) {
  ensureListenersInstalled();
  const existingIdx = targets.findIndex((t) => t.container === container);
  if (existingIdx !== -1) targets.splice(existingIdx, 1);
  targets.unshift({ kb, container });
}

export {
  PIANO_MIN,
  PIANO_MAX,
  getLayout,
  setLayout,
  shiftOctave,
  currentMapping,
  describeZones,
  onMappingChange,
  registerComputerKeyboardTarget,
};
