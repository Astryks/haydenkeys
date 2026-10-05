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
//
// Item 42: the mapping/listener itself now lives in computer-keys.js,
// a shared module, so lesson/chord screens can reuse the exact same
// logic instead of a second parallel implementation.

import { renderKeyboard } from "./keyboard.js";
import { MIN_MIDI, MAX_MIDI, labelForMidi, registerComputerKeyboardTarget } from "./computer-keys.js";

function initMidiTab(root) {
  root.innerHTML = `
    <div class="hk-midi">
      <h2>MIDI: play with your computer keyboard</h2>
      <div class="hk-mascot-row">
        <img src="assets/mascot-face.png" alt="" class="hk-mascot-avatar" />
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

  const keyboardWrap = root.querySelector("#hk-midi-keyboard");
  const kb = renderKeyboard(keyboardWrap, { startMidi: MIN_MIDI, endMidi: MAX_MIDI });

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

  // Registers this keyboard as a candidate for the shared computer-key
  // listener (computer-keys.js) — it only actually reacts while this
  // tab's panel is the visible one (checked via offsetParent there).
  registerComputerKeyboardTarget(kb, keyboardWrap);

  // Tapping/clicking a key directly — keyboard.js's renderKeyboard
  // already wires pointerdown/pointerup (the unified Pointer Events
  // API, so this covers mouse AND touch taps with no extra code) — also
  // shows the same left/right hand coloring as the computer-key
  // mapping, not just the plain default "pressed" flash.
  kb.onKeyPress((midi) => {
    const hand = midi < 60 ? "left" : "right";
    kb.highlightHands({
      left: hand === "left" ? [midi] : [],
      right: hand === "right" ? [midi] : [],
      leftLabel: "L",
      rightLabel: "R",
    });
    setTimeout(() => kb.clearHighlights(), 400);
  });
}

export { initMidiTab };
