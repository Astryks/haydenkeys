// Onsets and Frames piano transcription (Google Magenta), running on the
// device. Adapted from Magenta.js (@magenta/music 1.23.1,
// src/transcription/*.ts and src/core/audio_utils.ts), Apache License 2.0,
// Copyright 2018 The Magenta Team — see LICENSE-magenta.txt next to this
// file and THIRD_PARTY_NOTICES.md.
//
// Changes from Magenta.js (as Apache-2.0 section 4(b) asks us to say):
//  - The model is the same `onsets_frames_uni` checkpoint, but its large
//    weight tensors are stored as 8-bit numbers (per output channel), so
//    the download is 15.7 MB instead of 62.5 MB. See model/model.json.
//  - The audio is processed in chunks of about 8 seconds (plus 3 frames of
//    context on each side for the convolutions), and the unidirectional
//    LSTMs carry their state from one chunk to the next, so memory stays
//    the same whether the song is 10 seconds or 7 minutes long. Magenta.js
//    ran every chunk through the network at once.
//  - The two LSTMs run as plain JavaScript loops (the TensorFlow.js part
//    does the convolutions and big matrix products), which avoids
//    thousands of tiny GPU calls per second of audio.
//  - Batch norm is folded into the convolution weights; no tfjs-layers.
//  - Output is a plain list of notes (pitch, start, length, velocity)
//    instead of a NoteSequence protobuf.
// The maths (mel spectrogram, network, note decoding with 0.5/0.5
// thresholds) is otherwise the same as Magenta.js.
//
// `tf` is passed in by the caller: it is the TensorFlow.js instance that
// is already bundled with basic-pitch (js/vendor/basic-pitch/), so the
// page never loads two copies of TensorFlow.js.

const SAMPLE_RATE = 16000;
const HOP = 512;
const N_FFT = 2048;
const N_MELS = 229;
const F_MIN = 30;
const MIN_MIDI = 21;
const PITCHES = 88;
const UNITS = 384;
const FRAME_SEC = HOP / SAMPLE_RATE; // 0.032 s
const RF_PAD = 3; // frames of context the three 3x3 convolutions need
const BN_EPS = 0.001;

// ---------- Mel spectrogram (same as Magenta.js core/audio_utils) ----------

let melCache = null;
function melSetup() {
  if (melCache) return melCache;
  const nBins = N_FFT / 2 + 1; // 1025
  const fftFreqs = new Float32Array(nBins);
  for (let i = 0; i < nBins; i++) fftFreqs[i] = (i * (SAMPLE_RATE / 2)) / (nBins - 1);
  const hzToMel = (hz) => 1125.0 * Math.log(1 + hz / 700.0);
  const melToHz = (mel) => 700.0 * (Math.exp(mel / 1125.0) - 1);
  const count = N_MELS + 2;
  const mMin = hzToMel(F_MIN);
  const mMax = hzToMel(SAMPLE_RATE / 2);
  const melFreqs = new Float32Array(count);
  for (let i = 0; i < count; i++) melFreqs[i] = melToHz(mMin + ((mMax - mMin) * i) / (count - 1));
  const filters = [];
  for (let i = 0; i < N_MELS; i++) {
    const d0 = melFreqs[i + 1] - melFreqs[i];
    const d1 = melFreqs[i + 2] - melFreqs[i + 1];
    const enorm = 2.0 / (melFreqs[i + 2] - melFreqs[i]);
    let start = -1;
    const vals = [];
    for (let j = 0; j < nBins; j++) {
      const lower = -(melFreqs[i] - fftFreqs[j]) / d0;
      const upper = (melFreqs[i + 2] - fftFreqs[j]) / d1;
      const w = Math.max(0, Math.min(lower, upper)) * enorm;
      if (w > 0) {
        if (start < 0) start = j;
        vals.length = j - start + 1;
        vals[j - start] = w;
      }
    }
    for (let k = 0; k < vals.length; k++) if (vals[k] === undefined) vals[k] = 0;
    filters.push({ start: Math.max(0, start), w: Float32Array.from(vals) });
  }
  // Symmetric Hann window, as Magenta.js uses.
  const win = new Float32Array(N_FFT);
  for (let i = 0; i < N_FFT; i++) win[i] = 0.5 * (1 - Math.cos((2 * Math.PI * i) / (N_FFT - 1)));
  // FFT tables
  const levels = Math.log2(N_FFT);
  const rev = new Uint32Array(N_FFT);
  for (let i = 0; i < N_FFT; i++) {
    let r = 0;
    for (let b = 0; b < levels; b++) r |= ((i >> b) & 1) << (levels - 1 - b);
    rev[i] = r;
  }
  const cos = new Float64Array(N_FFT / 2);
  const sin = new Float64Array(N_FFT / 2);
  for (let i = 0; i < N_FFT / 2; i++) {
    cos[i] = Math.cos((2 * Math.PI * i) / N_FFT);
    sin[i] = -Math.sin((2 * Math.PI * i) / N_FFT);
  }
  melCache = { filters, win, rev, cos, sin, re: new Float64Array(N_FFT), im: new Float64Array(N_FFT), power: new Float64Array(nBins) };
  return melCache;
}

function fftPower(frame, m) {
  const { rev, cos, sin, re, im, power } = m;
  for (let i = 0; i < N_FFT; i++) {
    re[rev[i]] = frame[i];
    im[rev[i]] = 0;
  }
  for (let size = 2; size <= N_FFT; size <<= 1) {
    const half = size >> 1;
    const step = N_FFT / size;
    for (let i = 0; i < N_FFT; i += size) {
      for (let j = 0, k = 0; j < half; j++, k += step) {
        const a = i + j;
        const b = a + half;
        const tr = re[b] * cos[k] - im[b] * sin[k];
        const ti = re[b] * sin[k] + im[b] * cos[k];
        re[b] = re[a] - tr;
        im[b] = im[a] - ti;
        re[a] += tr;
        im[a] += ti;
      }
    }
  }
  for (let k = 0; k <= N_FFT / 2; k++) power[k] = re[k] * re[k] + im[k] * im[k];
  return power;
}

// Number of spectrogram frames for `n` samples (Magenta: centre-padded STFT).
function frameCount(n) {
  return Math.floor(n / HOP) + 1;
}

// Log-mel frames [from, to) of 16 kHz mono audio `y`, into a Float32Array
// of (to - from) * 229 values. Each frame only needs its own 2048 samples,
// so any range can be computed on its own (that is what makes chunking
// possible).
function melFrames(y, from, to) {
  const m = melSetup();
  const out = new Float32Array((to - from) * N_MELS);
  const frame = new Float32Array(N_FFT);
  const n = y.length;
  const pad = N_FFT / 2;
  // Reflect-padded sample at padded index p (Magenta's padReflect).
  const sample = (p) => {
    let i = p - pad;
    if (i < 0) i = -i; // left reflection: out[i] = out[2*pad - i]
    else if (i >= n) i = 2 * n - 2 - i; // right reflection
    return i >= 0 && i < n ? y[i] : 0;
  };
  for (let f = from; f < to; f++) {
    const p0 = f * HOP;
    for (let i = 0; i < N_FFT; i++) {
      const p = p0 + i;
      const s = p >= pad && p - pad < n ? y[p - pad] : sample(p);
      frame[i] = s * m.win[i];
    }
    const power = fftPower(frame, m);
    const row = (f - from) * N_MELS;
    let maxDb = -Infinity;
    for (let b = 0; b < N_MELS; b++) {
      const { start, w } = m.filters[b];
      let acc = 0;
      for (let k = 0; k < w.length; k++) acc += w[k] * power[start + k];
      const db = 10 * Math.log10(Math.max(1e-10, acc));
      out[row + b] = db;
      if (db > maxDb) maxDb = db;
    }
    const floor = maxDb - 80; // top_db = 80, per frame as Magenta.js does
    for (let b = 0; b < N_MELS; b++) if (out[row + b] < floor) out[row + b] = floor;
  }
  return out;
}

// ---------- Weights ----------

async function loadWeights(baseUrl, onStatus) {
  const manifest = await (await fetch(`${baseUrl}/model.json`)).json();
  const resp = await fetch(`${baseUrl}/${manifest.weightsFile}`);
  if (!resp.ok) throw new Error(`model file ${resp.status}`);
  let bytes;
  const total = Number(resp.headers.get("content-length")) || 0;
  if (resp.body && resp.body.getReader && total) {
    // Stream it so we can show progress on a slow connection.
    bytes = new Uint8Array(total);
    const reader = resp.body.getReader();
    let got = 0;
    let lastPct = -1;
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes.set(value, got);
      got += value.length;
      const pct = Math.floor((got / total) * 100);
      if (pct !== lastPct && pct % 5 === 0) { lastPct = pct; onStatus?.(`Getting the piano note finder ready... ${pct}%`); }
    }
    if (got !== total) bytes = bytes.subarray(0, got);
  } else {
    bytes = new Uint8Array(await resp.arrayBuffer());
  }
  const vars = {};
  for (const w of manifest.weights) {
    const n = w.shape.reduce((a, b) => a * b, 1);
    let data;
    if (w.dtype === "float32") {
      data = new Float32Array(bytes.buffer.slice(bytes.byteOffset + w.offset, bytes.byteOffset + w.offset + n * 4));
    } else if (w.dtype === "uint8") {
      const ch = w.perChannel;
      const head = new Float32Array(bytes.buffer.slice(bytes.byteOffset + w.offset, bytes.byteOffset + w.offset + ch * 8));
      const q = bytes.subarray(w.offset + ch * 8, w.offset + ch * 8 + n);
      data = new Float32Array(n);
      for (let i = 0, c = 0; i < n; i++) {
        data[i] = head[c] + q[i] * head[ch + c];
        if (++c === ch) c = 0;
      }
    } else {
      throw new Error(`unknown weight type ${w.dtype}`);
    }
    vars[w.name] = { shape: w.shape, data };
  }
  return vars;
}

// ---------- The network ----------

function buildCnn(tf, vars, scope, finalName) {
  const get = (name) => {
    const v = vars[`${scope}/${name}`];
    if (!v) throw new Error(`missing weight ${scope}/${name}`);
    return v;
  };
  const convs = [0, 1, 2].map((i) => {
    const w = get(`conv${i}/weights`);
    const beta = get(`conv${i}/BatchNorm/beta`).data;
    const mean = get(`conv${i}/BatchNorm/moving_mean`).data;
    const variance = get(`conv${i}/BatchNorm/moving_variance`).data;
    const outCh = w.shape[3];
    const scale = new Float32Array(outCh);
    const bias = new Float32Array(outCh);
    for (let c = 0; c < outCh; c++) {
      scale[c] = 1 / Math.sqrt(variance[c] + BN_EPS);
      bias[c] = beta[c] - mean[c] * scale[c];
    }
    const folded = new Float32Array(w.data.length);
    for (let i = 0; i < folded.length; i++) folded[i] = w.data[i] * scale[i % outCh];
    return { filter: tf.tensor4d(folded, w.shape), bias: tf.tensor1d(bias) };
  });
  const fcW = get("fc_end/weights");
  const net = {
    convs,
    fcW: tf.tensor2d(fcW.data, fcW.shape),
    fcB: tf.tensor1d(get("fc_end/biases").data),
  };
  if (finalName) {
    const w = get(`${finalName}/weights`);
    net.outW = tf.tensor2d(w.data, w.shape);
    net.outB = tf.tensor1d(get(`${finalName}/biases`).data);
  }
  return net;
}

function runCnn(tf, net, x, frames, finalActivation) {
  // x: [1, T, 229, 1]
  let y = x;
  net.convs.forEach((c, i) => {
    y = tf.fused.conv2d({ x: y, filter: c.filter, strides: 1, pad: "same", bias: c.bias, activation: "relu" });
    if (i > 0) y = tf.maxPool(y, [1, 2], [1, 2], "valid");
  });
  const [, , width, ch] = y.shape;
  y = y.reshape([frames, width * ch]);
  y = tf.fused.matMul({ a: y, b: net.fcW, bias: net.fcB, activation: "relu" });
  if (net.outW) {
    y = tf.fused.matMul({ a: y, b: net.outW, bias: net.outB, activation: finalActivation === "sigmoid" ? "sigmoid" : "linear" });
  }
  return y;
}

function buildLstm(tf, vars, scope, outName) {
  const P = "cudnn_lstm/rnn/multi_rnn_cell/cell_0/cudnn_compatible_lstm_cell";
  const kernel = vars[`${scope}/${P}/kernel`];
  const bias = Float32Array.from(vars[`${scope}/${P}/bias`].data);
  // Gate order in the checkpoint is [input, cell, forget, output];
  // Magenta.js adds 1.0 to the forget-gate bias when it loads it.
  for (let j = 2 * UNITS; j < 3 * UNITS; j++) bias[j] += 1.0;
  const inDim = kernel.shape[0] - UNITS;
  const G = 4 * UNITS;
  const wx = kernel.data.subarray(0, inDim * G);
  const wh = Float32Array.from(kernel.data.subarray(inDim * G));
  const out = vars[`${scope}/${outName}/weights`].data; // [384, 88]
  const outB = vars[`${scope}/${outName}/biases`].data;
  return {
    inDim,
    wx: tf.tensor2d(Float32Array.from(wx), [inDim, G]),
    bias: tf.tensor1d(bias),
    wh,
    out: Float32Array.from(out),
    outB: Float32Array.from(outB),
    h: new Float32Array(UNITS),
    c: new Float32Array(UNITS),
    z: new Float32Array(G),
  };
}

const sigmoid = (v) => 1 / (1 + Math.exp(-v));

// Runs the LSTM over T frames whose input projections (x·Wx + b) are in
// `xp` ([T, 1536]); writes sigmoid(dense(h)) into `probs` ([T, 88]).
function runLstm(l, xp, T, probs) {
  const G = 4 * UNITS;
  const { wh, h, c, z, out, outB } = l;
  for (let t = 0; t < T; t++) {
    z.set(xp.subarray(t * G, t * G + G));
    for (let k = 0; k < UNITS; k++) {
      const hk = h[k];
      const row = k * G;
      for (let j = 0; j < G; j++) z[j] += hk * wh[row + j];
    }
    for (let u = 0; u < UNITS; u++) {
      const ig = sigmoid(z[u]);
      const cand = Math.tanh(z[UNITS + u]);
      const fg = sigmoid(z[2 * UNITS + u]);
      const og = sigmoid(z[3 * UNITS + u]);
      c[u] = fg * c[u] + ig * cand;
      h[u] = og * Math.tanh(c[u]);
    }
    const o = t * PITCHES;
    for (let p = 0; p < PITCHES; p++) probs[o + p] = outB[p];
    for (let k = 0; k < UNITS; k++) {
      const hk = h[k];
      const row = k * PITCHES;
      for (let p = 0; p < PITCHES; p++) probs[o + p] += hk * out[row + p];
    }
    for (let p = 0; p < PITCHES; p++) probs[o + p] = sigmoid(probs[o + p]);
  }
}

// Magenta.js pianorollToNoteSequence, same thresholds, as a plain list.
function decodeNotes(frameProbs, onsetProbs, velocities, numFrames, onsetThreshold = 0.5, frameThreshold = 0.5) {
  const notes = [];
  const startPlusOne = new Uint32Array(PITCHES);
  const startVel = new Uint8Array(PITCHES);
  let prevOnsets = new Uint8Array(PITCHES);
  const endPitch = (p, f) => {
    const start = (startPlusOne[p] - 1) * FRAME_SEC;
    const end = f * FRAME_SEC;
    notes.push({
      pitchMidi: p + MIN_MIDI,
      startTimeSeconds: start,
      durationSeconds: end - start,
      velocity: startVel[p],
      amplitude: startVel[p] / 127,
    });
    startPlusOne[p] = 0;
  };
  for (let f = 0; f <= numFrames; f++) {
    const onsetsNow = new Uint8Array(PITCHES);
    for (let p = 0; p < PITCHES; p++) {
      const i = f * PITCHES + p;
      const on = f < numFrames && onsetProbs[i] > onsetThreshold;
      const fr = f < numFrames && (frameProbs[i] > frameThreshold || on);
      onsetsNow[p] = on ? 1 : 0;
      if (on) {
        const vel = velocities[i];
        if (startPlusOne[p]) {
          if (!prevOnsets[p]) {
            endPitch(p, f);
            startPlusOne[p] = f + 1;
            startVel[p] = vel;
          }
        } else {
          startPlusOne[p] = f + 1;
          startVel[p] = vel;
        }
      } else if (!fr && startPlusOne[p]) {
        endPitch(p, f);
      }
    }
    prevOnsets = onsetsNow;
  }
  return notes.sort((a, b) => a.startTimeSeconds - b.startTimeSeconds || a.pitchMidi - b.pitchMidi);
}

// Turns any AudioBuffer into 16 kHz mono samples.
async function toMono16k(audioBuffer) {
  if (audioBuffer.sampleRate === SAMPLE_RATE && audioBuffer.numberOfChannels === 1) return audioBuffer.getChannelData(0);
  try {
    const len = Math.ceil(audioBuffer.duration * SAMPLE_RATE);
    const off = new OfflineAudioContext(1, len, SAMPLE_RATE);
    const src = off.createBufferSource();
    src.buffer = audioBuffer;
    src.connect(off.destination);
    src.start(0);
    return (await off.startRendering()).getChannelData(0);
  } catch (e) {
    // Older WebKit can't render at 16 kHz: average the channels, low-pass
    // with a small moving average, then interpolate.
    const chs = [...Array(audioBuffer.numberOfChannels).keys()].map((c) => audioBuffer.getChannelData(c));
    const n = audioBuffer.length;
    const mono = new Float32Array(n);
    for (const ch of chs) for (let i = 0; i < n; i++) mono[i] += ch[i] / chs.length;
    const ratio = audioBuffer.sampleRate / SAMPLE_RATE;
    const taps = Math.max(1, Math.round(ratio));
    const out = new Float32Array(Math.floor(n / ratio));
    for (let i = 0; i < out.length; i++) {
      const at = i * ratio;
      const i0 = Math.floor(at);
      let acc = 0;
      let cnt = 0;
      for (let k = i0 - (taps >> 1); k <= i0 + (taps >> 1); k++) if (k >= 0 && k < n) { acc += mono[k]; cnt++; }
      out[i] = cnt ? acc / cnt : 0;
    }
    return out;
  }
}

class TooSlowError extends Error {
  constructor(projectedSec) {
    super(`this device would take about ${Math.round(projectedSec)} seconds`);
    this.code = "too-slow";
    this.projectedSec = projectedSec;
  }
}

async function createOnsetsFrames(tf, baseUrl, { onStatus } = {}) {
  const vars = await loadWeights(baseUrl, onStatus);
  const nets = {
    onsetsCnn: buildCnn(tf, vars, "onsets", null),
    activationCnn: buildCnn(tf, vars, "frame", "activation_probs"),
    velocityCnn: buildCnn(tf, vars, "velocity", "onset_velocities"),
  };
  const keep = [];
  for (const net of Object.values(nets)) {
    net.convs.forEach((c) => keep.push(c.filter, c.bias));
    keep.push(net.fcW, net.fcB);
    if (net.outW) keep.push(net.outW, net.outB);
  }
  const onsetsLstm = buildLstm(tf, vars, "onsets", "onset_probs");
  const frameLstm = buildLstm(tf, vars, "frame", "frame_probs");
  keep.push(onsetsLstm.wx, onsetsLstm.bias, frameLstm.wx, frameLstm.bias);
  for (const k of Object.keys(vars)) delete vars[k];

  // Transcribes 16 kHz mono audio. Options:
  //  chunkFrames: frames per chunk (256 = 8.2 s)
  //  onProgress(fraction, secondsLeft)
  //  budgetSec: after the second chunk, if the whole file is projected
  //             to take longer than this, throws a TooSlowError.
  async function transcribe(y, { chunkFrames = 256, onProgress, budgetSec = Infinity } = {}) {
    const N = frameCount(y.length);
    const frameProbs = new Float32Array(N * PITCHES);
    const onsetProbs = new Float32Array(N * PITCHES);
    const velocities = new Uint8Array(N * PITCHES);
    for (const l of [onsetsLstm, frameLstm]) { l.h.fill(0); l.c.fill(0); }
    const chunks = Math.ceil(N / chunkFrames);
    const t0 = performance.now();
    let tSecond = 0;
    for (let ci = 0; ci < chunks; ci++) {
      const s = ci * chunkFrames;
      const e = Math.min(N, s + chunkFrames);
      const cs = Math.max(0, s - RF_PAD);
      const ce = Math.min(N, e + RF_PAD);
      const T = e - s;
      const mel = melFrames(y, cs, ce);
      const [onsetXp, act, vel] = tf.tidy(() => {
        const x = tf.tensor4d(mel, [1, ce - cs, N_MELS, 1]);
        const crop = (t) => t.slice([s - cs, 0], [T, -1]);
        const onsetFeat = crop(runCnn(tf, nets.onsetsCnn, x, ce - cs));
        const onsetXp = tf.add(tf.matMul(onsetFeat, onsetsLstm.wx), onsetsLstm.bias);
        const act = crop(runCnn(tf, nets.activationCnn, x, ce - cs, "sigmoid"));
        const vel = crop(runCnn(tf, nets.velocityCnn, x, ce - cs, "linear"));
        return [onsetXp, act, vel];
      });
      const [onsetXpData, actData, velData] = await Promise.all([onsetXp.data(), act.data(), vel.data()]);
      onsetXp.dispose();
      act.dispose();
      vel.dispose();
      const onsetChunk = onsetProbs.subarray(s * PITCHES, e * PITCHES);
      runLstm(onsetsLstm, onsetXpData, T, onsetChunk);
      // Frame LSTM input = [onset probs, activation probs].
      const frameIn = new Float32Array(T * 2 * PITCHES);
      for (let t = 0; t < T; t++) {
        frameIn.set(onsetChunk.subarray(t * PITCHES, (t + 1) * PITCHES), t * 2 * PITCHES);
        frameIn.set(actData.subarray(t * PITCHES, (t + 1) * PITCHES), t * 2 * PITCHES + PITCHES);
      }
      const frameXp = tf.tidy(() => tf.add(tf.matMul(tf.tensor2d(frameIn, [T, 2 * PITCHES]), frameLstm.wx), frameLstm.bias));
      const frameXpData = await frameXp.data();
      frameXp.dispose();
      runLstm(frameLstm, frameXpData, T, frameProbs.subarray(s * PITCHES, e * PITCHES));
      for (let i = 0; i < T * PITCHES; i++) {
        const v = Math.min(1, Math.max(0, velData[i]));
        velocities[s * PITCHES + i] = Math.trunc(v * 80 + 10);
      }
      const now = performance.now();
      if (ci === 0) tSecond = now;
      const done = (ci + 1) / chunks;
      // The first chunk includes GPU warm-up, so project from the later ones.
      const per = ci >= 1 ? (now - tSecond) / ci : now - t0;
      const left = (per * (chunks - ci - 1)) / 1000;
      onProgress?.(done, left);
      if (ci === 1 && (now - t0) / 1000 + left > budgetSec) throw new TooSlowError((now - t0) / 1000 + left);
      await new Promise((r) => setTimeout(r, 0)); // let the page breathe
    }
    return decodeNotes(frameProbs, onsetProbs, velocities, N);
  }

  function dispose() {
    keep.forEach((t) => t.dispose());
  }

  return { transcribe, dispose, toMono16k, sampleRate: SAMPLE_RATE };
}

export { createOnsetsFrames, toMono16k, melFrames, decodeNotes, TooSlowError, SAMPLE_RATE };
