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
        <h3>Step 1 of 2 — find Middle C by ear</h3>
        <div id="hk-cal-keyboard-step1" class="hk-keyboard-wrap"></div>
        <p>Quick basics first: the <strong>white keys</strong> are the main notes — just the musical alphabet,
           A through G, repeating up and down the whole keyboard. The <strong>black keys</strong> are the notes
           "in between" two white keys. They're raised up and bunched into groups of 2 and 3 specifically so
           your fingers (and eyes) can feel/see a repeating landmark instead of a featureless wall of identical
           keys — which is exactly the pattern we're about to use to find Middle C.</p>
        <p>Every piano/keyboard repeats the same pattern of black keys, over and over: a group of
           <strong>2 black keys</strong>, then a group of <strong>3 black keys</strong>, then back to 2, and so
           on — <strong>this repeats no matter how big or small your keyboard is</strong>. Find the group of 2
           black keys closest to the middle of your instrument (highlighted above, next to the C) — Middle C
           is the <strong>white key immediately to its left</strong> (the lit-up white key above — the two
           lit black keys are just the landmark, not keys to press).</p>
        <p class="hk-honest-note">On a real piano, that's usually close to dead-center. Quick guide by size —
           count the C's (the white key just left of each group of 2 black keys) from the LEFT end:</p>
        <table class="hk-size-table">
          <tr><th>Keys on your keyboard</th><th>Middle C is…</th></tr>
          <tr><td>88 (full piano)</td><td>the 4th C from the left</td></tr>
          <tr><td>76 or 61</td><td>the 3rd C from the left</td></tr>
          <tr><td>49</td><td>the 3rd C from the left (the middle one)</td></tr>
          <tr><td>37 or 25</td><td>usually the 2nd C — but small keyboards often have octave (+/−) buttons that move it</td></tr>
        </table>
        <p class="hk-honest-note">Not sure? That's what the listening check below is for — it tells you for certain.</p>
        <p class="hk-honest-note">Black keys are named after their white neighbours: the black key just right
           of C is <strong>C#</strong> ("C sharp"); the same key, seen as just left of D, is <strong>D♭</strong>
           ("D flat"). Every 12 keys (white and black together) the pattern repeats one <strong>octave</strong>
           higher — so there's a C every 8 white keys.</p>
        <h3>Check it by ear — like tuning a guitar</h3>
        <p>Tap <strong>Start listening</strong>, then press the key you think is Middle C on your real piano and
           hold it. The meter turns <strong>green</strong> when it hears Middle C. Wrong key? It tells you how many
           keys to move, and which way.</p>
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
        <h3>Step 2 of 2 — match the on-screen keyboard</h3>
        <p>Tap <strong>Middle C</strong> and then the <strong>C one octave higher</strong> on the keyboard below,
           so the app knows how your on-screen keys line up for practice.</p>
        <div id="hk-cal-keyboard" class="hk-keyboard-wrap"></div>
        <p id="hk-cal-status2" class="hk-cal-status">Tap Middle C first.</p>
      </div>`;
    const kbWrap = root.querySelector("#hk-cal-keyboard");
    const kb = renderKeyboard(kbWrap, { startMidi: 48, endMidi: 84 });
    let firstTap = null;
    kb.onKeyPress((midi) => {
      if (firstTap === null) {
        firstTap = midi;
        root.querySelector("#hk-cal-status2").textContent = "Now tap the C one octave higher.";
      } else {
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
