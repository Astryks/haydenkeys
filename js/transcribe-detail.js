// "Every note" helpers for uploaded songs: find the beat and the bars,
// line the notes up with them (gently), and decide which hand plays
// each note. Pure functions on note lists, no DOM, so they can be
// tested on their own.
//
// Notes here are the highway's format: { midi, time, duration,
// velocity? (0-127) }.

const BIN = 0.01; // 10 ms

// ----- Beat tracking -----
// An onset-strength curve built from the notes (louder notes and chords
// count more), its tempo from autocorrelation (gently preferring
// 80-140 BPM), then the beats themselves with dynamic programming
// (Ellis 2007, the method librosa uses): every beat sits on or near a
// note onset, and the gap between beats stays close to the tempo, so the
// grid can follow a player who speeds up or slows down a little.
function onsetEnvelope(notes, end) {
  const env = new Float32Array(Math.ceil(end / BIN) + 4);
  notes.forEach((n) => {
    const w = n.velocity != null ? 0.4 + n.velocity / 127 : 1;
    const i = Math.round(n.time / BIN);
    if (i >= 0 && i < env.length) env[i] += w;
  });
  // compress chords (6 notes isn't 6x more of a beat) and smooth by ±2 bins
  const out = new Float32Array(env.length);
  for (let i = 0; i < env.length; i++) {
    const v = Math.log1p(env[i]);
    if (!v) continue;
    for (let k = -2; k <= 2; k++) {
      const j = i + k;
      if (j >= 0 && j < out.length) out[j] += v * [0.25, 0.6, 1, 0.6, 0.25][k + 2];
    }
  }
  return out;
}

function estimateTempo(env) {
  let best = null;
  const minLag = Math.round(60 / 200 / BIN);
  const maxLag = Math.round(60 / 50 / BIN);
  const ac = new Float32Array(maxLag * 4 + 2);
  for (let lag = minLag; lag < ac.length; lag++) {
    let s = 0;
    for (let i = 0; i + lag < env.length; i++) if (env[i]) s += env[i] * env[i + lag];
    ac[lag] = s;
  }
  for (let lag = minLag; lag <= maxLag; lag++) {
    // the beat, plus credit for 2 and 4 beats later (bars of chords)
    const score = ac[lag] + 0.5 * (ac[2 * lag] || 0) + 0.25 * (ac[4 * lag] || 0) + 0.25 * ((ac[lag - 1] || 0) + (ac[lag + 1] || 0));
    const bpm = 60 / (lag * BIN);
    const w = score * Math.exp(-Math.pow(Math.log2(bpm / 110), 2) / (2 * 0.7 * 0.7));
    if (!best || w > best.w) best = { lag, w };
  }
  return best && best.w > 0 ? best.lag : null;
}

function trackBeats(rawEnv, period, tightness = 30) {
  // unit standard deviation, as librosa does before the same search
  let mean = 0;
  for (const v of rawEnv) mean += v;
  mean /= rawEnv.length;
  let sd = 0;
  for (const v of rawEnv) sd += (v - mean) ** 2;
  sd = Math.sqrt(sd / rawEnv.length) || 1;
  const env = rawEnv.map((v) => v / sd);
  const n = env.length;
  const score = new Float32Array(n);
  const back = new Int32Array(n).fill(-1);
  const lo = Math.round(period * 0.6);
  const hi = Math.round(period * 1.6);
  for (let t = 0; t < n; t++) {
    let bestVal = 0;
    let bestTau = -1;
    for (let d = lo; d <= hi && t - d >= 0; d++) {
      const pen = Math.log(d / period);
      const v = score[t - d] - tightness * pen * pen;
      if (bestTau < 0 || v > bestVal) { bestVal = v; bestTau = t - d; }
    }
    score[t] = env[t] + (bestTau >= 0 ? Math.max(0, bestVal) : 0);
    back[t] = bestTau >= 0 && bestVal > 0 ? bestTau : -1;
  }
  // end on the best-scoring beat in the last period
  let t = n - 1;
  let bestT = t;
  for (let k = Math.max(0, n - hi); k < n; k++) if (score[k] > score[bestT]) bestT = k;
  t = bestT;
  const beats = [];
  while (t >= 0) {
    beats.push(t * BIN);
    t = back[t];
  }
  beats.reverse();
  return beats;
}

// Fills gaps (long silences) with evenly spaced beats and extends the
// grid to cover the whole song.
function completeGrid(beats, period, start, end) {
  if (!beats.length) return [];
  const out = [];
  let b = beats[0];
  const pre = [];
  while (b - period >= start - period * 0.5) { b -= period; pre.unshift(b); }
  out.push(...pre.filter((x) => x >= 0));
  beats.forEach((bt, i) => {
    if (i > 0) {
      const gap = bt - beats[i - 1];
      const k = Math.round(gap / period);
      if (gap > period * 1.6 && k > 1) for (let j = 1; j < k; j++) out.push(beats[i - 1] + (gap * j) / k);
    }
    out.push(bt);
  });
  let last = out[out.length - 1];
  while (last + period <= end + period * 0.5) { last += period; out.push(last); }
  return out;
}

// Evens out the tracked beats (each one onto a straight line fitted
// through its neighbours), so a slightly early or late note doesn't drag
// the grid with it, while real tempo changes still come through.
function smoothBeats(beats, half = 3) {
  const src = beats.slice();
  for (let i = 0; i < src.length; i++) {
    const a = Math.max(0, i - half);
    const b = Math.min(src.length - 1, i + half);
    const n = b - a + 1;
    if (n < 3) continue;
    let sx = 0, sy = 0, sxx = 0, sxy = 0;
    for (let k = a; k <= b; k++) { sx += k; sy += src[k]; sxx += k * k; sxy += k * src[k]; }
    const slope = (n * sxy - sx * sy) / (n * sxx - sx * sx);
    beats[i] = (sy - slope * sx) / n + slope * i;
  }
}

// Which beat starts each bar: try 4/4 and 3/4 and every offset; the
// winner has the most bass notes, long notes and chord changes landing
// on beat 1. 4/4 wins ties (most songs).
function findDownbeats(beats, notes) {
  if (beats.length < 6) return { beatsPerBar: 4, first: 0 };
  const evidence = beats.map((bt, i) => {
    const prev = beats[i - 1] ?? bt - (beats[1] - beats[0]);
    const next = beats[i + 1] ?? bt + (beats[1] - beats[0]);
    const prev2 = beats[i - 2] ?? bt - 2 * (beats[1] - beats[0]);
    const next2 = beats[i + 2] ?? bt + 2 * (beats[1] - beats[0]);
    const tol = Math.min(0.08, (next - bt) * 0.3);
    // "bass" = the lowest notes around here (within 2 beats either side)
    const span = (next - prev) * 1.5;
    let localMin = Infinity;
    notes.forEach((n) => { if (n.time > bt - span && n.time < bt + span && n.midi < localMin) localMin = n.midi; });
    const bassCut = Math.min(localMin + 3, 60);
    let bass = 0;
    let loud = 0;
    const before = new Float32Array(12);
    const after = new Float32Array(12);
    notes.forEach((n) => {
      const vel = n.velocity != null ? n.velocity / 100 : 1;
      if (Math.abs(n.time - bt) <= tol) {
        if (n.midi < bassCut) bass += vel;
        loud = Math.max(loud, vel);
      }
      const pc = ((n.midi % 12) + 12) % 12;
      // harmony over the 2 beats before vs the 2 beats after (chords
      // usually change on beat 1; melody notes change every beat)
      const w = Math.min(n.duration, 2 * (next - bt));
      if (n.time >= prev2 - tol && n.time < bt - tol) before[pc] += w;
      if (n.time >= bt - tol && n.time < next2 - tol) after[pc] += w;
    });
    let dot = 0, na = 0, nb = 0;
    for (let k = 0; k < 12; k++) { dot += before[k] * after[k]; na += before[k] ** 2; nb += after[k] ** 2; }
    const change = na && nb ? 1 - dot / Math.sqrt(na * nb) : 0;
    return { bass: Math.min(2, bass), loud, change };
  });
  // Accents count relative to the beats around them.
  const ev = evidence.map((e, i) => {
    const nb = [evidence[i - 1], evidence[i + 1]].filter(Boolean);
    const around = nb.reduce((a, x) => a + x.loud, 0) / (nb.length || 1);
    return e.bass * 0.6 + e.change + Math.max(0, e.loud - around) * 3;
  });
  // Most songs start on beat 1: a small nudge toward the first beat
  // that has a note on it.
  const firstPlayed = beats.findIndex((bt) => notes.some((n) => Math.abs(n.time - bt) < 0.08));
  let best = null;
  for (const m of [4, 3]) {
    for (let ph = 0; ph < m; ph++) {
      let on = 0, onN = 0, off = 0, offN = 0;
      ev.forEach((e, i) => {
        if ((i - ph) % m === 0) { on += e; onN++; } else { off += e; offN++; }
      });
      let score = (onN ? on / onN : 0) - (offN ? off / offN : 0);
      if (firstPlayed >= 0 && (firstPlayed - ph) % m === 0) score += 0.1;
      const adj = m === 4 ? score : score * 0.85 - 0.05;
      if (!best || adj > best.adj) best = { beatsPerBar: m, first: ph, adj };
    }
  }
  return best;
}

// Returns { bpm, beats: [s], bars: [s], beatsPerBar } or null.
function analyzeBeat(notes) {
  if (notes.length < 8) return null;
  const end = Math.max(...notes.map((n) => n.time + n.duration));
  const start = Math.min(...notes.map((n) => n.time));
  const env = onsetEnvelope(notes, end);
  const lag = estimateTempo(env);
  if (!lag) return null;
  const tracked = trackBeats(env, lag);
  // drop leading beats before the music starts
  const firstNote = start - lag * BIN * 0.3;
  const beats = completeGrid(tracked.filter((b) => b >= firstNote), lag * BIN, start, end);
  if (beats.length < 4) return null;
  smoothBeats(beats);
  const { beatsPerBar, first } = findDownbeats(beats, notes);
  // Bars: beat `first`, then every beatsPerBar beats. A pickup (beats
  // before the first downbeat) gets a bar line at the first downbeat.
  const bars = [];
  for (let i = first; i < beats.length; i += beatsPerBar) bars.push(beats[i]);
  const gaps = [];
  for (let i = 1; i < beats.length; i++) gaps.push(beats[i] - beats[i - 1]);
  gaps.sort((a, b) => a - b);
  const median = gaps[Math.floor(gaps.length / 2)];
  return { bpm: Math.round(60 / median), beatSec: median, beats, bars, beatsPerBar, firstBeatIndex: first };
}

// ----- Gentle quantizing -----
// Each note's start moves onto the nearest 16th note (or triplet 8th, if
// the song is in triplets) of its own beat, but only when it's already
// close (within about a third of a step) — so sloppy timing is tidied,
// chord notes that were rolled a little start together, and ornaments
// or rubato stay where they were. Nothing is merged or dropped, so the
// number of presses in every bar stays exactly what was played.
function quantizeNotes(notes, grid) {
  if (!grid || grid.beats.length < 2) return notes.map((n) => ({ ...n }));
  const beats = grid.beats;
  const beatIndex = (t) => {
    let lo = 0, hi = beats.length - 2;
    if (t <= beats[0]) return 0;
    while (lo < hi) {
      const mid = (lo + hi + 1) >> 1;
      if (beats[mid] <= t) lo = mid; else hi = mid - 1;
    }
    return lo;
  };
  const snap = (t, steps) => {
    const i = beatIndex(t);
    const b0 = beats[i];
    const len = (beats[i + 1] ?? b0 + grid.beatSec) - b0;
    const step = len / steps;
    const k = Math.round((t - b0) / step);
    return { at: b0 + k * step, step };
  };
  // Straight 16ths or triplets? Whichever fits the onsets better.
  const err = (steps) => notes.reduce((a, n) => {
    const s = snap(n.time, steps);
    return a + Math.min(1, Math.abs(n.time - s.at) / (s.step * 0.5));
  }, 0);
  const steps = err(3) < err(4) * 0.8 ? 3 : 4;
  const out = notes.map((n) => {
    const s = snap(n.time, steps);
    const close = Math.abs(n.time - s.at) <= Math.min(0.06, s.step * 0.35);
    const time = close ? Math.max(0, s.at) : n.time;
    let end = n.time + n.duration;
    const e = snap(end, steps);
    if (Math.abs(end - e.at) <= Math.min(0.08, e.step * 0.4)) end = e.at;
    return { ...n, rawTime: n.time, time, duration: Math.max(0.08, end - time) };
  });
  // Two presses of the same key must not land on the same moment.
  const byKey = new Map();
  out.sort((a, b) => a.rawTime - b.rawTime).forEach((n) => {
    const prev = byKey.get(n.midi);
    if (prev && n.time <= prev.time + 0.02) n.time = Math.max(n.rawTime, prev.time + 0.03);
    if (prev && prev.time + prev.duration > n.time) prev.duration = Math.max(0.05, n.time - prev.time - 0.01);
    byKey.set(n.midi, n);
  });
  return out.sort((a, b) => a.time - b.time || a.midi - b.midi);
}

// ----- Left / right hand -----
// Goes through the song chord by chord (notes starting together) and
// picks the split that keeps each hand within a comfortable span
// (an octave, a 10th at most), no more than 5 notes per hand, and close
// to where that hand was a moment ago — so a melody that dips below
// Middle C stays in the right hand, and a bass line that climbs stays in
// the left.
function assignHands(notes) {
  if (!notes.length) return [];
  const sorted = [...notes].sort((a, b) => a.time - b.time || a.midi - b.midi);
  const pitches = sorted.map((n) => n.midi).sort((a, b) => a - b);
  const pct = (p) => pitches[Math.min(pitches.length - 1, Math.floor(p * pitches.length))];
  let L = Math.min(pct(0.2), 55);
  let R = Math.max(pct(0.8), 64);
  if (R - L < 7) { L = Math.min(L, R - 7); }
  const out = [];
  let i = 0;
  while (i < sorted.length) {
    const group = [sorted[i]];
    let j = i + 1;
    while (j < sorted.length && sorted[j].time - sorted[i].time < 0.045) group.push(sorted[j++]);
    i = j;
    group.sort((a, b) => a.midi - b.midi);
    const n = group.length;
    let best = null;
    for (let k = 0; k <= n; k++) {
      const left = group.slice(0, k).map((x) => x.midi);
      const right = group.slice(k).map((x) => x.midi);
      let cost = 0;
      for (const [hand, center] of [[left, L], [right, R]]) {
        if (!hand.length) continue;
        const span = hand[hand.length - 1] - hand[0];
        if (span > 16) cost += 60;
        else if (span > 12) cost += 6 * (span - 12);
        if (hand.length > 5) cost += 60;
        const mean = hand.reduce((a, b) => a + b, 0) / hand.length;
        cost += Math.abs(mean - center) * 0.35 * Math.sqrt(hand.length);
      }
      left.forEach((p) => { if (p > 74) cost += (p - 74) * 0.6; });
      right.forEach((p) => { if (p < 45) cost += (45 - p) * 0.6; });
      if (!best || cost < best.cost) best = { k, cost };
    }
    const left = group.slice(0, best.k);
    const right = group.slice(best.k);
    left.forEach((x) => out.push({ ...x, hand: "left" }));
    right.forEach((x) => out.push({ ...x, hand: "right" }));
    if (left.length) L = 0.65 * L + 0.35 * (left.reduce((a, x) => a + x.midi, 0) / left.length);
    if (right.length) R = 0.65 * R + 0.35 * (right.reduce((a, x) => a + x.midi, 0) / right.length);
    if (R - L < 5) { const mid = (R + L) / 2; L = mid - 2.5; R = mid + 2.5; }
  }
  return out;
}

// Bar number (1-based) of time t, or 0 before the first bar line.
function barAt(bars, t) {
  let lo = 0, hi = bars.length - 1, ans = -1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (bars[mid] <= t + 1e-6) { ans = mid; lo = mid + 1; } else hi = mid - 1;
  }
  return ans + 1;
}

export { analyzeBeat, quantizeNotes, assignHands, barAt };
