// Item 45: a simple, optional rhythmic layer under Follow Along
// playback — "a basic kick/snare/hi-hat pattern roughly matched to the
// song's tempo, not a full drum machine." Each voice is synthesized
// live via plain Web Audio nodes (an oscillator with a falling pitch
// for the kick, filtered white noise for snare/hi-hat) — the same
// "real DSP, no sample files" approach the sibling Dawsons project
// uses for its own drum kit (website/js/synth.js's DRUM_VOICES), just
// re-expressed as live-triggered nodes instead of pre-rendered buffer
// writes, since this plays along in real time rather than rendering a
// track offline.

let noiseBufferCache = null;
function getNoiseBuffer(ctx) {
  if (noiseBufferCache && noiseBufferCache.sampleRate === ctx.sampleRate) return noiseBufferCache;
  const buf = ctx.createBuffer(1, ctx.sampleRate * 0.5, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  noiseBufferCache = buf;
  return buf;
}

function playKick(ctx, time) {
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(120, time);
  osc.frequency.exponentialRampToValueAtTime(42, time + 0.14);
  g.gain.setValueAtTime(0.55, time);
  g.gain.exponentialRampToValueAtTime(0.001, time + 0.16);
  osc.connect(g).connect(ctx.destination);
  osc.start(time);
  osc.stop(time + 0.18);
}

function playSnare(ctx, time) {
  const src = ctx.createBufferSource();
  src.buffer = getNoiseBuffer(ctx);
  const filter = ctx.createBiquadFilter();
  filter.type = "highpass";
  filter.frequency.value = 900;
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.3, time);
  g.gain.exponentialRampToValueAtTime(0.001, time + 0.13);
  src.connect(filter).connect(g).connect(ctx.destination);
  src.start(time);
  src.stop(time + 0.14);
}

function playHihat(ctx, time) {
  const src = ctx.createBufferSource();
  src.buffer = getNoiseBuffer(ctx);
  const filter = ctx.createBiquadFilter();
  filter.type = "highpass";
  filter.frequency.value = 6000;
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.14, time);
  g.gain.exponentialRampToValueAtTime(0.001, time + 0.045);
  src.connect(filter).connect(g).connect(ctx.destination);
  src.start(time);
  src.stop(time + 0.05);
}

// A plain, genre-agnostic 4-on-the-floor-ish pattern: kick on beat 1,
// snare on beat 3 (the classic "backbeat"), hi-hat on every beat —
// deliberately simple, not trying to match any specific song's real
// drum part (this app has no real drum transcription data to match).
function playBeat(ctx, beatIndexInBar, time) {
  const beat = ((beatIndexInBar % 4) + 4) % 4;
  if (beat === 0) playKick(ctx, time);
  if (beat === 2) playSnare(ctx, time);
  playHihat(ctx, time);
}

export { playBeat };
