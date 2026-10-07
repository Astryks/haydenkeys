import { createTunerWidget } from "./pitch.js";
import { renderKeyboard, playTone } from "./keyboard.js";
import { saveCalibration, getCalibration } from "./storage.js";

const REFERENCE_MIDI = 60; // Middle C, 261.63 Hz
const REFERENCE_FREQ = 261.63;

// Two-part calibration:
//  1. Audio pitch-match anchor — play a reference tone, listen via mic,
//     use real autocorrelation pitch detection (pitch.js, reused from
//     Dawsons) to confirm/correct which physical key the user found.
//  2. Visual/on-screen width calibration — MVP substitute for a full
//     camera overlay (explicitly out of scope this release, see
//     README): user taps two keys on our own virtual keyboard to
//     confirm octave range instead of a camera-detected physical one.
function initCalibration(root, { onComplete, showSkip = true } = {}) {
  let tuner = null;
  let heardIt = false;
  let audioConfirmedMidi = null;

  function render() {
    root.innerHTML = `
      <div class="hk-calibration">
        <h3>Step 1 of 2: find Middle C</h3>
        <div id="hk-cal-keyboard-step1" class="hk-keyboard-wrap"></div>
        <p>The <strong>white keys</strong> are the musical alphabet, A to G, repeating. The <strong>black keys</strong>
           come in groups of 2 and 3, so you can always find your place.</p>
        <p>Find the group of <strong>2 black keys</strong> nearest the middle of your piano. Middle C is the
           <strong>white key just to its left</strong> (lit up above).</p>
        <p class="hk-honest-note">Quick guide by size: count the C's from the LEFT end.</p>
        <table class="hk-size-table">
          <tr><th>Keys on your keyboard</th><th>Middle C is…</th></tr>
          <tr><td>88 (full piano)</td><td>the 4th C from the left</td></tr>
          <tr><td>76 or 61</td><td>the 3rd C from the left</td></tr>
          <tr><td>49</td><td>the 3rd C from the left (the middle one)</td></tr>
          <tr><td>37 or 25</td><td>usually the 2nd C (octave buttons can move it)</td></tr>
        </table>
        <p class="hk-honest-note">Not sure? The listening check below will tell you.</p>
        <p class="hk-honest-note">Black keys are named after their neighbours: the one just right of C is
           <strong>C#</strong> ("C sharp"), also called <strong>D♭</strong> ("D flat"). The pattern repeats every
           <strong>octave</strong> (12 keys), so there's a C every 7 white keys.</p>
        <h3>Check it by ear</h3>
        <p>Tap <strong>Start listening</strong>, then press and hold the key you think is Middle C. The meter
           turns <strong>green</strong> when it's right. If not, it tells you which way to move.</p>
        <button class="hk-btn" id="hk-play-ref">&#9658; Hear Middle C first</button>
        <div id="hk-cal-tuner"></div>
        <p id="hk-cal-status" class="hk-cal-status"></p>
        ${showSkip ? `<button class="hk-btn hk-btn-small" id="hk-skip">Skip the sound check</button>` : ""}
      </div>`;

    // Item 50: show the actual physical landmark, not just describe it
    // in text — the group of 2 black keys (C#/D#, MIDI 61 and 63)
    // highlighted right alongside Middle C (60) itself, so the learner
    // sees exactly which black-key pair to look for on their own
    // instrument instead of reading a description and guessing. Same
    // renderKeyboard + highlightChord component/styling used everywhere
    // else (e.g. Lesson 1's "this is the 1/G") — reused directly.
    const kb = renderKeyboard(root.querySelector("#hk-cal-keyboard-step1"), { startMidi: 48, endMidi: 72 });
    kb.highlightChord([REFERENCE_MIDI, REFERENCE_MIDI + 1, REFERENCE_MIDI + 3], {
      number: "C", letter: "middle", rootMidi: REFERENCE_MIDI,
    });

    root.querySelector("#hk-play-ref").addEventListener("click", () => playTone(REFERENCE_MIDI, { duration: 1.2, gain: 0.2 }));

    // Item 58: the shared tuner widget (pitch.js) — needle, "how many
    // keys away", and a green matched state — instead of a text-only
    // status line. Turning green IS the confirmation.
    tuner = createTunerWidget(root.querySelector("#hk-cal-tuner"), REFERENCE_MIDI, {
      label: "🎤 Start listening",
      targetName: "Middle C (C4)",
      onMatch: (result) => {
        audioConfirmedMidi = result.noteMidi;
        root.querySelector("#hk-cal-status").textContent = "Found it! Moving on…";
        finishListening();
      },
    });
    root.querySelector("#hk-skip")?.addEventListener("click", () => {
      if (tuner) tuner.stop();
      renderStepTwo();
    });
  }

  function finishListening() {
    if (heardIt) return;
    heardIt = true;
    // Leave the green "✓ That's Middle C" on screen for a moment, then move on.
    setTimeout(() => {
      if (tuner) tuner.stop();
      tuner = null;
      if (root.isConnected) renderStepTwo();
    }, 1400);
  }

  function renderStepTwo() {
    root.innerHTML = `
      <div class="hk-calibration">
        <h3>Step 2 of 2: match the screen</h3>
        <p>Tap <strong>Middle C</strong>, then the <strong>C one octave higher</strong> on the keyboard below.</p>
        <div id="hk-cal-keyboard" class="hk-keyboard-wrap"></div>
        <p id="hk-cal-status2" class="hk-cal-status">Tap Middle C first.</p>
      </div>`;
    const kbWrap = root.querySelector("#hk-cal-keyboard");
    const kb = renderKeyboard(kbWrap, { startMidi: 48, endMidi: 84 });
    let firstTap = null;
    let saved = false;
    kb.onKeyPress((midi) => {
      if (saved) return;
      const status = root.querySelector("#hk-cal-status2");
      if (firstTap === null) {
        // Only a C counts: C is the white key just left of the 2 black keys.
        if (midi % 12 !== 0) { status.textContent = "That's not a C. Look for the white key just left of the 2 black keys."; return; }
        firstTap = midi;
        status.textContent = "Now tap the C one octave higher.";
      } else if (midi !== firstTap + 12) {
        status.textContent = "Not quite. The next C up is 7 white keys to the right.";
      } else {
        saved = true;
        const offset = firstTap; // visual offset from theoretical C4=60
        saveCalibration({ audioConfirmedMidi, visualOffsetMidi: offset - 60 });
        root.querySelector("#hk-cal-status2").textContent = "Calibration saved.";
        setTimeout(() => onComplete && onComplete(getCalibration()), 500);
      }
    });
  }

  render();

  // Item 56: callers close the calibration panel (or leave the screen)
  // without finishing — release the mic when they do.
  return {
    destroy() {
      if (tuner) tuner.stop();
      tuner = null;
    },
  };
}

export { initCalibration, REFERENCE_MIDI, REFERENCE_FREQ };
