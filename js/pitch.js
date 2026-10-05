// Monophonic pitch detection — normalized autocorrelation with parabolic
// interpolation. Reused, unmodified in its core algorithm, from the
// Dawsons project's `website/js/pitch.js` (same author/org, MIT-style
// "do what you want with your own code" reuse — not a third-party
// dependency). That version already fixed a harmonic-misdetection bug
// (picking a subharmonic/overtone instead of the true fundamental) by
// scanning from the shortest lag upward and taking the *first* local
// peak that clears the correlation threshold, rather than the global
// max. See THIRD_PARTY_NOTICES.md for provenance.
//
// This file adds a thin "live" wrapper around the original frame-based
// detector so it can run continuously against a Web Audio
// AnalyserNode/ScriptProcessor for Hayden Keys' keyboard calibration
// flow (listening to a single played note, not a melody).

const MIN_FREQ = 70; // covers piano range we care about for calibration
const MAX_FREQ = 1200;
const CORRELATION_THRESHOLD = 0.35;

function midiFromFreq(freq) {
  return 69 + 12 * Math.log2(freq / 440);
}

function freqFromMidi(midi) {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

// Estimates one frame's fundamental frequency via normalized
// autocorrelation, or null if no confident pitch is found.
function detectPitchInFrame(frame, sampleRate) {
  const minLag = Math.floor(sampleRate / MAX_FREQ);
  const maxLag = Math.min(frame.length - 1, Math.ceil(sampleRate / MIN_FREQ));
  if (maxLag <= minLag) return null;

  let rootMeanSquare = 0;
  for (let i = 0; i < frame.length; i++) rootMeanSquare += frame[i] * frame[i];
  rootMeanSquare = Math.sqrt(rootMeanSquare / frame.length);
  if (rootMeanSquare < 0.01) return null; // silence/noise floor

  const correlations = new Array(maxLag - minLag + 1);
  for (let lag = minLag; lag <= maxLag; lag++) {
    let sum = 0;
    let normA = 0;
    let normB = 0;
    for (let i = 0; i + lag < frame.length; i++) {
      sum += frame[i] * frame[i + lag];
      normA += frame[i] * frame[i];
      normB += frame[i + lag] * frame[i + lag];
    }
    const denom = Math.sqrt(normA * normB);
    correlations[lag - minLag] = denom > 0 ? sum / denom : 0;
  }

  // First local peak clearing the threshold, scanning from the
  // shortest lag upward — avoids locking onto a harmonic/subharmonic
  // of the true fundamental (the bug documented in Dawsons' STATUS.md).
  for (let i = 1; i < correlations.length - 1; i++) {
    if (
      correlations[i] >= CORRELATION_THRESHOLD &&
      correlations[i] >= correlations[i - 1] &&
      correlations[i] >= correlations[i + 1]
    ) {
      return sampleRate / refineLag(correlations, i, minLag);
    }
  }

  let bestIndex = 0;
  for (let i = 1; i < correlations.length; i++) {
    if (correlations[i] > correlations[bestIndex]) bestIndex = i;
  }
  if (correlations[bestIndex] < CORRELATION_THRESHOLD) return null;
  return sampleRate / (minLag + bestIndex);
}

function refineLag(correlations, index, minLag) {
  if (index <= 0 || index + 1 >= correlations.length) return minLag + index;
  const y0 = correlations[index - 1];
  const y1 = correlations[index];
  const y2 = correlations[index + 1];
  const denom = 2 * (2 * y1 - y2 - y0);
  if (Math.abs(denom) < 1e-9) return minLag + index;
  return minLag + index + (y2 - y0) / denom;
}

// --- Live wrapper for keyboard calibration (new in Hayden Keys) -----

// Wraps getUserMedia + an AnalyserNode and calls `onPitch({freq, midi,
// note, cents})` repeatedly while listening, or `onPitch(null)` when no
// confident pitch is present in the current frame. Returns a `stop()`
// function to release the mic.
async function startLivePitchDetection(onPitch, { fftSize = 2048 } = {}) {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  // Item 56: created after the permission prompt, i.e. outside the tap
  // that started this — WebKit (Safari / the iOS app) can then hand
  // back a suspended context whose analyser only ever reads silence.
  if (audioCtx.state === "suspended") await audioCtx.resume().catch(() => {});
  const source = audioCtx.createMediaStreamSource(stream);
  const analyser = audioCtx.createAnalyser();
  analyser.fftSize = fftSize;
  source.connect(analyser);

  const buffer = new Float32Array(analyser.fftSize);
  let running = true;

  function tick() {
    if (!running) return;
    analyser.getFloatTimeDomainData(buffer);
    const freq = detectPitchInFrame(buffer, audioCtx.sampleRate);
    if (freq) {
      const midi = midiFromFreq(freq);
      const rounded = Math.round(midi);
      const cents = Math.round((midi - rounded) * 100);
      onPitch({ freq, midi, noteMidi: rounded, cents });
    } else {
      onPitch(null);
    }
    requestAnimationFrame(tick);
  }
  tick();

  return function stop() {
    running = false;
    stream.getTracks().forEach((t) => t.stop());
    source.disconnect();
    audioCtx.close();
  };
}

// --- Shared tuner-style "match this note" widget (item 41) ----------
//
// A real guitar-tuner-style UI (needle + flat/in-tune/sharp readout)
// built on the exact same startLivePitchDetection() used by Get Started
// calibration (item 29) and Practice's Ear Check (item 4/27) — not a
// second pitch-detection implementation. Both calibration.js and
// lessons-ui.js call this one function so there's a single place that
// owns "what does tuning feedback look like."
//
// Renders a small, self-contained widget into `container`:
//   [Tune this note button] -> on click: mic starts, needle + label
//   appear and update live as the user plays, button becomes "Stop".
// Calls onMatch() once when the target is heard in tune (not
// repeatedly), but keeps listening so the user can see the needle
// settle — they close it themselves via the Stop button.
function createTunerWidget(container, targetMidi, { label = "Tune this note" } = {}) {
  let stopListening = null;
  let matched = false;

  container.innerHTML = `
    <div class="hk-tuner">
      <button class="hk-btn hk-tuner-toggle" type="button">${label}</button>
      <div class="hk-tuner-display" style="display:none">
        <div class="hk-tuner-dial">
          <div class="hk-tuner-needle"></div>
          <div class="hk-tuner-center-mark"></div>
        </div>
        <p class="hk-tuner-readout">Listening...</p>
      </div>
    </div>`;

  const toggleBtn = container.querySelector(".hk-tuner-toggle");
  const display = container.querySelector(".hk-tuner-display");
  const needle = container.querySelector(".hk-tuner-needle");
  const readout = container.querySelector(".hk-tuner-readout");

  async function start() {
    matched = false;
    display.style.display = "flex";
    toggleBtn.textContent = "Stop tuning";
    readout.textContent = "Listening — play the note on your real piano.";
    needle.style.transform = "translateX(-50%) rotate(0deg)";
    needle.className = "hk-tuner-needle";
    try {
      stopListening = await startLivePitchDetection((result) => {
        // Item 56: the lesson step this tuner lived on was replaced (Next,
        // Back, or leaving the lesson) while it was still listening —
        // release the mic instead of keeping it open off-screen.
        if (!container.isConnected) {
          stop();
          return;
        }
        if (!result) {
          readout.textContent = "Listening — play the note on your real piano.";
          return;
        }
        const diffSemitones = result.midi - targetMidi;
        // Clamp the needle's visual swing to +/- 1 semitone (100 cents)
        // either side of the target, same range a real tuner app shows.
        const clampedCents = Math.max(-100, Math.min(100, diffSemitones * 100));
        const angle = (clampedCents / 100) * 45; // +/- 45 degrees
        needle.style.transform = `translateX(-50%) rotate(${angle}deg)`;

        const inTune = result.noteMidi === targetMidi && Math.abs(result.cents) < 15;
        const closeOctaveOff = Math.abs(diffSemitones) >= 11 && Math.abs(diffSemitones) <= 13;
        if (inTune) {
          needle.className = "hk-tuner-needle hk-tuner-in-tune";
          readout.textContent = `In tune — ${result.freq.toFixed(1)} Hz. Nice.`;
          if (!matched) {
            matched = true;
          }
        } else if (closeOctaveOff) {
          needle.className = "hk-tuner-needle hk-tuner-off";
          readout.textContent = `Close, but that's an octave ${diffSemitones > 0 ? "too high" : "too low"}.`;
        } else if (diffSemitones > 0) {
          needle.className = "hk-tuner-needle hk-tuner-off";
          readout.textContent = `Sharp — a bit higher than this note. Try a key to the left.`;
        } else if (diffSemitones < 0) {
          needle.className = "hk-tuner-needle hk-tuner-off";
          readout.textContent = `Flat — a bit lower than this note. Try a key to the right.`;
        }
      });
    } catch (err) {
      readout.textContent = `Microphone access failed (${err.message}).`;
    }
  }

  function stop() {
    if (stopListening) {
      stopListening();
      stopListening = null;
    }
    display.style.display = "none";
    toggleBtn.textContent = label;
  }

  toggleBtn.addEventListener("click", () => {
    if (stopListening) stop();
    else start();
  });

  return {
    stop,
    destroy() {
      stop();
      container.innerHTML = "";
    },
  };
}

export {
  detectPitchInFrame,
  startLivePitchDetection,
  midiFromFreq,
  freqFromMidi,
  createTunerWidget,
};
