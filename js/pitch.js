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

export {
  detectPitchInFrame,
  startLivePitchDetection,
  midiFromFreq,
  freqFromMidi,
};
