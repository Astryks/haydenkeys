import { startLivePitchDetection, midiFromFreq } from "./pitch.js";
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
function initCalibration(root, { onComplete } = {}) {
  let stopListening = null;
  let audioConfirmedMidi = null;

  function render() {
    root.innerHTML = `
      <div class="hk-calibration">
        <h3>Step 1 of 2 — find Middle C by ear</h3>
        <div id="hk-cal-keyboard-step1" class="hk-keyboard-wrap"></div>
        <p>Every piano/keyboard repeats the same pattern of black keys, over and over: a group of
           <strong>2 black keys</strong>, then a group of <strong>3 black keys</strong>, then back to 2, and so
           on — <strong>this repeats no matter how big or small your keyboard is</strong>. Find the group of 2
           black keys closest to the middle of your instrument (highlighted above, next to the C) — Middle C
           is the <strong>white key immediately to its left</strong> (also highlighted above).</p>
        <p class="hk-honest-note">On a real piano, that's usually close to dead-center. On a small 25-key
           keyboard, there might only be one group of 2 black keys total — that one is it.</p>
        <button class="hk-btn" id="hk-play-ref">Play reference tone (Middle C)</button>
        <button class="hk-btn hk-btn-primary" id="hk-start-listen">Start listening &amp; play your key</button>
        <p id="hk-cal-status" class="hk-cal-status"></p>
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
      number: "Middle", letter: "C", rootMidi: REFERENCE_MIDI,
    });

    root.querySelector("#hk-play-ref").addEventListener("click", () => playTone(REFERENCE_MIDI, { duration: 1.2, gain: 0.2 }));

    root.querySelector("#hk-start-listen").addEventListener("click", async () => {
      const statusEl = root.querySelector("#hk-cal-status");
      statusEl.textContent = "Listening... play the key you found.";
      try {
        stopListening = await startLivePitchDetection((result) => {
          if (!result) return;
          const diff = result.noteMidi - REFERENCE_MIDI;
          if (Math.abs(diff) <= 0 && Math.abs(result.cents) < 40) {
            statusEl.textContent = `Got it — that's Middle C (${result.freq.toFixed(1)} Hz). Nice.`;
            audioConfirmedMidi = result.noteMidi;
            finishListening();
          } else if (Math.abs(diff) === 12) {
            statusEl.textContent = `Close — that sounds like an octave ${diff > 0 ? "high" : "low"}. Try the ${diff > 0 ? "next C down" : "next C up"}.`;
          } else if (Math.abs(result.cents) >= 40) {
            statusEl.textContent = `Detecting a pitch near there but out of tune — keep trying.`;
          } else {
            statusEl.textContent = `Heard a note, but not quite Middle C yet. Keep trying.`;
          }
        });
      } catch (err) {
        statusEl.textContent = `Microphone access failed (${err.message}). You can skip audio calibration and continue.`;
        root.insertAdjacentHTML(
          "beforeend",
          `<button class="hk-btn" id="hk-skip">Skip audio calibration</button>`
        );
        root.querySelector("#hk-skip").addEventListener("click", () => renderStepTwo());
      }
    });
  }

  function finishListening() {
    if (stopListening) stopListening();
    setTimeout(renderStepTwo, 900);
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
}

export { initCalibration, REFERENCE_MIDI, REFERENCE_FREQ };
