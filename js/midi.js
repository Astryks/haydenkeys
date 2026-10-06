import { pandaSvg } from "./panda.js";
// "MIDI" tab — a fully playable on-screen keyboard driven by the
// computer's physical keyboard, for anyone exploring Hayden Keys
// without a real piano/keyboard nearby. Reuses the exact same
// keyboard.js component (rendering, pointer/touch handling, synth,
// per-hand highlight coloring) every other tab already uses.
//
// Item 56: shows the FULL 88-key piano (A0-C8) instead of just the 19
// mapped notes, so it's always clear where your hands are on a real
// piano. The mapping itself (piano-shaped, two-hand split or one-hand
// layout, octave shifting across the whole range) lives in
// computer-keys.js — see the comment there for the full key chart.

import { renderKeyboard, midiToName } from "./keyboard.js";
import {
  PIANO_MIN,
  PIANO_MAX,
  getLayout,
  setLayout,
  shiftOctave,
  currentMapping,
  describeZones,
  onMappingChange,
  registerComputerKeyboardTarget,
} from "./computer-keys.js";

const HAND_NAMES = { left: "Left hand", right: "Right hand" };

function initMidiTab(root) {
  root.innerHTML = `
    <div class="hk-midi">
      <h2>MIDI: play with your computer keyboard</h2>
      <div class="hk-mascot-row">
        <div class="hk-mascot-avatar">${pandaSvg("play")}</div>
        <div class="hk-mascot-bubble">
          <p>This is handy for exploring without a piano nearby, but your fingers won't build the real
             muscle memory they need this way. Practicing on an actual keyboard — even a cheap one, see
             the "Get yourself a piano" lesson — is what actually makes you better.</p>
        </div>
      </div>
      <div class="hk-speed-picker hk-midi-layout-picker">
        <span class="hk-speed-label">Layout:</span>
        <button class="hk-speed-btn" data-layout="split">Two hands</button>
        <button class="hk-speed-btn" data-layout="piano">One hand (GarageBand-style)</button>
      </div>
      <div class="hk-midi-instructions" id="hk-midi-instructions"></div>
      <div class="hk-midi-zones" id="hk-midi-zones"></div>
      <div class="hk-midi-scroll" id="hk-midi-scroll">
        <div id="hk-midi-keyboard" class="hk-keyboard-wrap hk-midi-full"></div>
      </div>
      <p class="hk-honest-note">Every note on a real piano is here — all 88 keys, black and white. You don't need
         to pick a musical key first: the white/black layout matches a real piano, so any song or scale works
         by moving your hands, just like on the real thing.</p>
    </div>`;

  const keyboardWrap = root.querySelector("#hk-midi-keyboard");
  const kb = renderKeyboard(keyboardWrap, { startMidi: PIANO_MIN, endMidi: PIANO_MAX });

  // Middle C landmark, so the full-size keyboard has an anchor.
  const middleC = kb.getKeyElement(60);
  if (middleC) {
    const mark = document.createElement("div");
    mark.className = "hk-midi-middlec";
    mark.textContent = "C4";
    mark.title = "Middle C";
    middleC.appendChild(mark);
  }

  function renderInstructions() {
    const isSplit = getLayout() === "split";
    root.querySelectorAll("[data-layout]").forEach((b) => b.classList.toggle("hk-speed-active", b.dataset.layout === getLayout()));
    root.querySelector("#hk-midi-instructions").innerHTML = isSplit
      ? `<p>Laid out like a real piano: each hand's <strong>white keys</strong> are one row of letters, and its
           <strong>black keys</strong> are the row just above, sitting in the gaps — exactly where they are on a piano.</p>
         <p><span class="hk-hand-left-label">Left hand</span>: white keys <kbd>Z X C V B N M</kbd>, black keys
           <kbd>S D</kbd> <kbd>G H J</kbd>. <span class="hk-hand-right-label">Right hand</span>: white keys
           <kbd>T Y U I O P [ ] \\</kbd>, black keys <kbd>6 7</kbd> <kbd>9 0 -</kbd>.</p>`
      : `<p>One hand, laid out like a real piano (the same layout GarageBand and most music apps use):
           <strong>white keys</strong> <kbd>A S D F G H J K L ; '</kbd>, <strong>black keys</strong> on the row above
           <kbd>W E</kbd> <kbd>T Y U</kbd> <kbd>O P</kbd>.</p>`;
  }

  function renderZones() {
    root.querySelector("#hk-midi-zones").innerHTML = describeZones().map((z) => {
      const name = z.hand ? HAND_NAMES[z.hand] : "Your hand";
      const cls = z.hand === "left" ? "hk-hand-left-label" : z.hand === "right" ? "hk-hand-right-label" : "";
      return `<div class="hk-midi-zone">
          <span><span class="${cls}">${name}</span>: ${midiToName(z.lowMidi)}–${midiToName(z.highMidi)}</span>
          <button class="hk-btn hk-btn-small" data-octave="${z.index}" data-delta="-1" aria-label="${name} down an octave">− Octave</button>
          <button class="hk-btn hk-btn-small" data-octave="${z.index}" data-delta="1" aria-label="${name} up an octave">+ Octave</button>
          <span class="hk-midi-octave-keys">(keys: <kbd>${z.octaveDownKeys}</kbd> down, <kbd>${z.octaveUpKeys}</kbd> up)</span>
        </div>`;
    }).join("");
    root.querySelectorAll("[data-octave]").forEach((btn) => {
      btn.addEventListener("click", () => shiftOctave(Number(btn.dataset.octave), Number(btn.dataset.delta)));
    });
  }

  // Label each mapped on-screen key with the computer key that plays it,
  // and tint each hand's current zone. Separate elements/classes from
  // keyboard.js's own highlight badges, so clearHighlights() and
  // highlightHands() never remove them.
  function renderLabels() {
    const mapping = currentMapping();
    kb.keyElements.forEach((el, midi) => {
      el.querySelector(".hk-midi-keylabel")?.remove();
      el.classList.remove("hk-midi-zone-left", "hk-midi-zone-right");
      const m = mapping.get(midi);
      if (!m) return;
      el.classList.add(m.hand === "left" ? "hk-midi-zone-left" : "hk-midi-zone-right");
      const label = document.createElement("div");
      label.className = "hk-midi-keylabel";
      label.textContent = m.label;
      el.appendChild(label);
    });
  }

  // Keep the currently-mapped area in view on narrow screens, where the
  // full 88-key keyboard scrolls sideways.
  function scrollToZones() {
    const scroller = root.querySelector("#hk-midi-scroll");
    if (scroller.scrollWidth <= scroller.clientWidth) return;
    const zones = describeZones();
    const lo = kb.getKeyElement(Math.min(...zones.map((z) => z.lowMidi)));
    const hi = kb.getKeyElement(Math.max(...zones.map((z) => z.highMidi)));
    if (!lo || !hi) return;
    const center = (lo.offsetLeft + hi.offsetLeft + hi.offsetWidth) / 2;
    scroller.scrollTo({ left: center - scroller.clientWidth / 2, behavior: "smooth" });
  }

  function refresh() {
    renderInstructions();
    renderZones();
    renderLabels();
    scrollToZones();
  }

  root.querySelectorAll("[data-layout]").forEach((btn) => {
    btn.addEventListener("click", () => setLayout(btn.dataset.layout));
  });
  onMappingChange(refresh);
  refresh();

  // Registers this keyboard as a candidate for the shared computer-key
  // listener (computer-keys.js) — it only reacts while this tab's panel
  // is the visible one.
  registerComputerKeyboardTarget(kb, keyboardWrap);

  // Tapping/clicking a key directly (keyboard.js already plays it) also
  // shows hand coloring, using the zone the key belongs to.
  kb.onKeyPress((midi) => {
    const hand = currentMapping().get(midi)?.hand || (midi < 60 ? "left" : "right");
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
