// Shared computer-keyboard-as-piano input (item 28, generalized in item
// 42). One mapping, one listener, reused everywhere a rendered
// keyboard.js keyboard wants to be playable from a physical laptop
// keyboard — originally built standalone for the MIDI tab, now also
// available to lesson/chord screens so someone on a laptop can press
// real keys to play along while learning a chord, not just click with
// a mouse. Factored out here specifically so there is exactly one
// place that owns "what key plays what note," per Sid's instruction
// not to duplicate that logic in two places.
//
// Key mapping (unchanged from item 28's spec): the home row is one
// hand's full range, the top letter row is the other hand's full
// range — the same left/right-hand convention and coloring already
// used by the falling-note highway and every two-hand lesson
// (keyboard.js's highlightHands()).
//   Home row  A S D F G H J K L ; '   (11 keys) -> LEFT hand,  C3-A#3
//   Top row   Q W E R T Y U I O P [ ] (12 keys) -> RIGHT hand, C4-B4

import { playTone } from "./keyboard.js";

const LEFT_KEYS = ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'"];
const RIGHT_KEYS = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]"];
const LEFT_BASE_MIDI = 48; // C3
const RIGHT_BASE_MIDI = 60; // C4
const MIN_MIDI = LEFT_BASE_MIDI;
const MAX_MIDI = RIGHT_BASE_MIDI + RIGHT_KEYS.length - 1; // B4

function keyToMidi(key) {
  const li = LEFT_KEYS.indexOf(key);
  if (li !== -1) return { midi: LEFT_BASE_MIDI + li, hand: "left" };
  const ri = RIGHT_KEYS.indexOf(key);
  if (ri !== -1) return { midi: RIGHT_BASE_MIDI + ri, hand: "right" };
  return null;
}

function labelForMidi(midi) {
  const li = midi - LEFT_BASE_MIDI;
  if (li >= 0 && li < LEFT_KEYS.length) return LEFT_KEYS[li].toUpperCase();
  const ri = midi - RIGHT_BASE_MIDI;
  if (ri >= 0 && ri < RIGHT_KEYS.length) return RIGHT_KEYS[ri].toUpperCase();
  return "";
}

// --- Single shared document-level listener, many possible targets ---
//
// Multiple screens can each render their own keyboard.js keyboard (MIDI
// tab, Lesson 1, Practice, ...) while only one is actually visible at a
// time. Rather than each screen installing its own document keydown
// listener (item 28's original approach, which this replaces), there is
// exactly one listener, routed to whichever registered target's
// container element is currently visible (`offsetParent !== null`,
// the standard cheap check for "not display:none/hidden" — covers the
// app's existing `.hk-hidden { display: none }` tab-switching and any
// lesson step that swaps `content.innerHTML` out from under it).
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
  return el && ["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName);
}

const heldLeft = new Set();
const heldRight = new Set();
const activeKeys = new Set(); // dedupes OS key-repeat

function refreshHighlight(kb) {
  if (heldLeft.size === 0 && heldRight.size === 0) {
    kb.clearHighlights();
    return;
  }
  kb.highlightHands({ left: [...heldLeft], right: [...heldRight], leftLabel: "L", rightLabel: "R" });
}

function pressMidi(kb, midi, hand) {
  (hand === "left" ? heldLeft : heldRight).add(midi);
  playTone(midi, { duration: 0.6 });
  refreshHighlight(kb);
}

function releaseMidi(kb, midi, hand) {
  (hand === "left" ? heldLeft : heldRight).delete(midi);
  refreshHighlight(kb);
}

function ensureListenersInstalled() {
  if (listenersInstalled) return;
  listenersInstalled = true;
  document.addEventListener("keydown", (e) => {
    // Same guard item 28 had: never intercept while the user is
    // actually typing somewhere else (a search box, etc).
    if (isTypingTarget()) return;
    const target = visibleTarget();
    if (!target) return;
    const key = e.key.toLowerCase();
    if (activeKeys.has(key)) return;
    const mapped = keyToMidi(key);
    if (!mapped) return;
    activeKeys.add(key);
    pressMidi(target.kb, mapped.midi, mapped.hand);
  });
  document.addEventListener("keyup", (e) => {
    const target = visibleTarget();
    const key = e.key.toLowerCase();
    activeKeys.delete(key);
    const mapped = keyToMidi(key);
    if (!mapped || !target) return;
    releaseMidi(target.kb, mapped.midi, mapped.hand);
  });
}

// Registers `kb` (a keyboard.js renderKeyboard() instance) + its
// `container` DOM element as a candidate target for computer-keyboard
// input. Call this once per rendered keyboard that should support it —
// safe to call repeatedly (e.g. once per lesson step) since the same
// container is simply moved to the front of the list.
function registerComputerKeyboardTarget(kb, container) {
  ensureListenersInstalled();
  const existingIdx = targets.findIndex((t) => t.container === container);
  if (existingIdx !== -1) targets.splice(existingIdx, 1);
  targets.unshift({ kb, container });
}

export {
  LEFT_KEYS,
  RIGHT_KEYS,
  LEFT_BASE_MIDI,
  RIGHT_BASE_MIDI,
  MIN_MIDI,
  MAX_MIDI,
  keyToMidi,
  labelForMidi,
  registerComputerKeyboardTarget,
};
