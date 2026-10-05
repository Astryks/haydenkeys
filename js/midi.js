// "MIDI" tab — a fully playable on-screen keyboard driven by the
// computer's physical keyboard, for anyone exploring Hayden Keys
// without a real piano/keyboard nearby. Reuses the exact same
// keyboard.js component (rendering, pointer/touch handling, synth,
// per-hand highlight coloring) every other tab already uses — no
// second parallel piano-rendering or audio system.
//
// Key mapping (per Sid's exact spec): the home row is one hand's full
// range, the top letter row is the other hand's full range — mirroring
// the same left/right-hand convention and coloring already used by the
// falling-note highway and every two-hand lesson (keyboard.js's
// highlightHands()), not just "more keys, more range."
//   Home row  A S D F G H J K L ; '   (11 keys) -> LEFT hand,  C3-A#3
//   Top row   Q W E R T Y U I O P [ ] (12 keys) -> RIGHT hand, C4-B4
// Left hand gets the lower range, right hand the higher range — the
// same register convention real two-hand piano playing uses, and the
// top physical row maps to the higher pitch range, a natural visual
// correspondence (higher row = higher pitch).

import { renderKeyboard, playTone } from "./keyboard.js";

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

function initMidiTab(root) {
  root.innerHTML = `
    <div class="hk-midi">
      <h2>MIDI: play with your computer keyboard</h2>
      <div class="hk-mascot-row">
        <img src="assets/mascot-face.svg" alt="" class="hk-mascot-avatar" />
        <div class="hk-mascot-bubble">
          <p>This is handy for exploring without a piano nearby, but your fingers won't build the real
             muscle memory they need this way. Practicing on an actual keyboard — even a cheap one, see
             the "Get yourself a piano" lesson — is what actually makes you better.</p>
        </div>
      </div>
      <p class="hk-midi-instructions">
        <span class="hk-hand-left-label">Home row (A S D F G H J K L ; ')</span> is your left hand's range.
        <span class="hk-hand-right-label">Top row (Q W E R T Y U I O P [ ])</span> is your right hand's range.
        No physical keyboard? Just tap the keys below directly.
      </p>
      <div id="hk-midi-keyboard" class="hk-keyboard-wrap"></div>
    </div>`;

  const kb = renderKeyboard(root.querySelector("#hk-midi-keyboard"), { startMidi: MIN_MIDI, endMidi: MAX_MIDI });

  // Label each on-screen key with the computer key that plays it — a
  // separate class/element from keyboard.js's own highlight badges, so
  // clearHighlights()/highlightHands() (which only ever touch
  // .hk-key-badge) never remove these labels.
  for (let midi = MIN_MIDI; midi <= MAX_MIDI; midi++) {
    const el = kb.getKeyElement(midi);
    if (!el) continue;
    const label = document.createElement("div");
    label.className = "hk-midi-keylabel";
    label.textContent = labelForMidi(midi);
    el.appendChild(label);
  }

  const heldLeft = new Set();
  const heldRight = new Set();
  function refreshHighlight() {
    if (heldLeft.size === 0 && heldRight.size === 0) {
      kb.clearHighlights();
      return;
    }
    kb.highlightHands({ left: [...heldLeft], right: [...heldRight], leftLabel: "L", rightLabel: "R" });
  }
  function pressMidi(midi, hand) {
    (hand === "left" ? heldLeft : heldRight).add(midi);
    playTone(midi, { duration: 0.6 });
    refreshHighlight();
  }
  function releaseMidi(midi, hand) {
    (hand === "left" ? heldLeft : heldRight).delete(midi);
    refreshHighlight();
  }

  // Only react to physical-keyboard events while this tab is actually
  // visible — this listener is attached to `document` (so it works
  // regardless of DOM focus), so it must stay inert while another tab
  // (e.g. Discover's search box) is the one on screen.
  const activeKeys = new Set(); // dedupes OS key-repeat
  function isVisible() {
    return !root.classList.contains("hk-hidden");
  }
  function onKeyDown(e) {
    if (!isVisible()) return;
    if (document.activeElement && ["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) return;
    const key = e.key.toLowerCase();
    if (activeKeys.has(key)) return;
    const mapped = keyToMidi(key);
    if (!mapped) return;
    activeKeys.add(key);
    pressMidi(mapped.midi, mapped.hand);
  }
  function onKeyUp(e) {
    const key = e.key.toLowerCase();
    activeKeys.delete(key);
    const mapped = keyToMidi(key);
    if (!mapped) return;
    releaseMidi(mapped.midi, mapped.hand);
  }
  document.addEventListener("keydown", onKeyDown);
  document.addEventListener("keyup", onKeyUp);

  // Tapping/clicking a key directly — keyboard.js's renderKeyboard
  // already wires pointerdown/pointerup (the unified Pointer Events
  // API, so this covers mouse AND touch taps with no extra code) — also
  // shows the same left/right hand coloring as the computer-key
  // mapping, not just the plain default "pressed" flash.
  kb.onKeyPress((midi) => {
    const hand = midi < RIGHT_BASE_MIDI ? "left" : "right";
    pressMidi(midi, hand);
    setTimeout(() => releaseMidi(midi, hand), 400);
  });
}

export { initMidiTab };
