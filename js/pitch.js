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
// `onChroma` (optional) also gets a 12-number "chroma" every ~100ms: how
// strong each pitch class (C, C#, D … B) is in the sound right now, from
// a larger FFT. That's what lets "Wait for me" recognise a whole chord,
// which a single-pitch detector can't. Nothing is recorded or kept.
async function startLivePitchDetection(onPitch, { fftSize = 2048, onChroma = null } = {}) {
  // The sound is set to "playback" (so it plays with the ringer on silent),
  // and iOS refuses the microphone in that mode. Listening needs "play and
  // record", which still plays out loud.
  try { if (navigator.audioSession) navigator.audioSession.type = "play-and-record"; } catch (e) { /* older Safari */ }
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
  let chromaAnalyser = null;
  let spectrum = null;
  let tickCount = 0;
  if (onChroma) {
    chromaAnalyser = audioCtx.createAnalyser();
    chromaAnalyser.fftSize = 8192;
    chromaAnalyser.smoothingTimeConstant = 0.4;
    source.connect(chromaAnalyser);
    spectrum = new Float32Array(chromaAnalyser.frequencyBinCount);
  }
  function emitChroma(level) {
    chromaAnalyser.getFloatFrequencyData(spectrum);
    const binHz = audioCtx.sampleRate / chromaAnalyser.fftSize;
    const chroma = new Array(12).fill(0);
    for (let k = Math.ceil(60 / binHz); k < Math.min(spectrum.length, 2100 / binHz); k++) {
      const mag = Math.pow(10, spectrum[k] / 20);
      if (!isFinite(mag) || mag <= 0) continue;
      const pc = ((Math.round(12 * Math.log2((k * binHz) / 440) + 69) % 12) + 12) % 12;
      chroma[pc] += mag * mag;
    }
    const max = Math.max(...chroma);
    onChroma(max > 0 ? chroma.map((c) => c / max) : chroma, level);
  }

  function tick() {
    if (!running) return;
    analyser.getFloatTimeDomainData(buffer);
    if (chromaAnalyser && ++tickCount % 6 === 0) {
      let sum = 0;
      for (let i = 0; i < buffer.length; i++) sum += buffer[i] * buffer[i];
      emitChroma(Math.sqrt(sum / buffer.length));
    }
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
    try { if (navigator.audioSession) navigator.audioSession.type = "playback"; } catch (e) { /* older Safari */ }
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
//
// Item 58: works like a guitar tuner, but for "did I find the right
// key?" — a piano player can't retune their instrument, so the goal is
// the right KEY, not perfect cents. The whole widget turns GREEN once
// the target note is heard steadily (in tune within ±40 cents — wide
// enough for an older acoustic piano that's a little out of tune — for
// about a third of a second, so a passing blip can't trigger it). The
// needle still shows flat/sharp, and wrong notes say exactly how many
// keys away and which way to move. `onMatch` fires once on the first
// green. `autoStart` starts listening immediately (the caller's own
// button tap counts as the user gesture).
const NOTE_LABELS = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
function tunerNoteName(midi) {
  return `${NOTE_LABELS[((midi % 12) + 12) % 12]}${Math.floor(midi / 12) - 1}`;
}

function createTunerWidget(container, targetMidi, { label = "Tune this note", onMatch, autoStart = false, targetName } = {}) {
  let stopListening = null;
  let matched = false;
  let inTuneSince = null;
  const HOLD_MS = 350;
  const RIGHT_KEY_CENTS = 40;
  const name = targetName || tunerNoteName(targetMidi);

  container.innerHTML = `
    <div class="hk-tuner">
      <button class="hk-btn hk-tuner-toggle" type="button">${label}</button>
      <div class="hk-tuner-display" style="display:none">
        <div class="hk-tuner-target">Play <strong>${name}</strong></div>
        <div class="hk-tuner-dial">
          <div class="hk-tuner-needle"></div>
          <div class="hk-tuner-center-mark"></div>
        </div>
        <div class="hk-tuner-scale"><span>flat</span><span>in tune</span><span>sharp</span></div>
        <p class="hk-tuner-heard">&nbsp;</p>
        <p class="hk-tuner-readout">Listening...</p>
      </div>
    </div>`;

  const root = container.querySelector(".hk-tuner");
  const toggleBtn = container.querySelector(".hk-tuner-toggle");
  const display = container.querySelector(".hk-tuner-display");
  const needle = container.querySelector(".hk-tuner-needle");
  const readout = container.querySelector(".hk-tuner-readout");
  const heard = container.querySelector(".hk-tuner-heard");

  // True while the microphone permission prompt is open: a second tap
  // then must not start a second listening session.
  let starting = false;
  async function start() {
    if (starting) return;
    starting = true;
    matched = false;
    inTuneSince = null;
    root.classList.remove("hk-tuner-matched");
    display.style.display = "flex";
    toggleBtn.textContent = "Stop listening";
    readout.textContent = `Listening. Play ${name} on your real piano.`;
    needle.style.transform = "translateX(-50%) rotate(0deg)";
    needle.className = "hk-tuner-needle";
    try {
      const stop = await startLivePitchDetection((result) => {
        // The step this tuner lived on was replaced (Next, Back, or
        // leaving the lesson) while it was still listening — release
        // the mic instead of keeping it open off-screen.
        if (!container.isConnected) {
          stopNow();
          return;
        }
        if (!result) {
          inTuneSince = null;
          if (!matched) {
            heard.innerHTML = "&nbsp;";
            readout.textContent = `Listening. Play ${name} on your real piano.`;
          }
          return;
        }
        const diffSemitones = result.midi - targetMidi;
        // Needle swings ±1 semitone (100 cents) either side, like a tuner.
        const clampedCents = Math.max(-100, Math.min(100, diffSemitones * 100));
        needle.style.transform = `translateX(-50%) rotate(${(clampedCents / 100) * 45}deg)`;
        heard.textContent = `Hearing: ${tunerNoteName(result.noteMidi)}`;

        const rightKey = result.noteMidi === targetMidi && Math.abs(result.cents) < RIGHT_KEY_CENTS;
        const keysAway = result.noteMidi - targetMidi;
        if (rightKey) {
          needle.className = "hk-tuner-needle hk-tuner-in-tune";
          if (inTuneSince === null) inTuneSince = performance.now();
          if (performance.now() - inTuneSince >= HOLD_MS && !matched) {
            matched = true;
            root.classList.add("hk-tuner-matched");
            readout.textContent = `✓ That's ${name}! (${result.freq.toFixed(1)} Hz)`;
            if (onMatch) onMatch(result);
          } else if (!matched) {
            readout.textContent = "That's it! Hold it…";
          }
          return;
        }
        inTuneSince = null;
        if (matched) return; // stay green; the needle keeps moving for info
        needle.className = "hk-tuner-needle hk-tuner-off";
        if (Math.abs(keysAway) === 12 || Math.abs(keysAway) === 24) {
          readout.textContent = `Right letter, wrong octave: ${Math.abs(keysAway) / 12} octave${Math.abs(keysAway) === 24 ? "s" : ""} too ${keysAway > 0 ? "high. Try the same key further LEFT" : "low. Try the same key further RIGHT"}.`;
        } else if (keysAway !== 0) {
          const n = Math.abs(keysAway);
          readout.textContent = `${n} key${n === 1 ? "" : "s"} too ${keysAway > 0 ? "high. Move LEFT" : "low. Move RIGHT"} (counting black keys too).`;
        } else {
          readout.textContent = `Right key, a little ${result.cents > 0 ? "sharp" : "flat"}. Keep holding it.`;
        }
      });
      if (!toggleBtn.isConnected || !display.isConnected) stop();
      else stopListening = stop;
    } catch (err) {
      readout.textContent = `The microphone isn't working (${err.message}).`;
      toggleBtn.textContent = label;
    } finally {
      starting = false;
    }
  }

  function stopNow() {
    if (stopListening) {
      stopListening();
      stopListening = null;
    }
  }

  function stop() {
    stopNow();
    display.style.display = "none";
    toggleBtn.textContent = label;
  }

  toggleBtn.addEventListener("click", () => {
    if (starting) return;
    if (stopListening) stop();
    else start();
  });
  if (autoStart) start();

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
