// Hyper-detailed songs (Oct 2026): every library song bar by bar, from
// song-detail-data.js (built by scripts/build-song-detail.mjs). This file
// turns one song's data into timed music:
//   - bars: when each bar starts and how long it lasts, at the real tempo
//     (sections can change tempo), in the song's real time signature;
//   - chords: which chord sounds when, changing on the right beat;
//   - events: the notes to play (falling blocks + sound): the right hand
//     presses the chord as many times a bar as the "piano" field says,
//     the left hand holds the low note on the strong beats;
//   - the tune, for the public-domain pieces that have one.
// Times are seconds at normal speed (divide by the speed multiplier).

import { SONG_DETAIL } from "./song-detail-data.js";
import { chordSymbolToMidi, parseChordSymbol, PITCH_CLASS } from "./chord-utils.js";

const cache = new Map();

function rawDetail(song) {
  return song ? SONG_DETAIL[`${song.title}|${song.artist}`] || null : null;
}
function hasSongDetail(song) {
  return Boolean(rawDetail(song));
}

const isRest = (c) => !c || c === "N.C." || !parseChordSymbol(c);

// The song, expanded: { key, ts: [N, D], verified, bpm, pulseSec,
// sections: [{ name, index, start, bars }], bars: [{ si, bi, t, dur,
// units, pulses, chords: [{ c, t, dur }], at: [press fractions], arp }],
// total, melody }.
function getSongDetail(song) {
  const raw = rawDetail(song);
  if (!raw) return null;
  const id = `${song.title}|${song.artist}`;
  if (cache.has(id)) return cache.get(id);
  const [N, D] = raw.ts.split("/").map(Number);
  const q = raw.q || 4 / D; // quarter notes per bpm beat
  const u = raw.u; // quarter notes per chord beat
  const sections = [];
  const bars = [];
  let t = 0;
  let units = 0;
  const unitMap = []; // [{ units, t, secPerUnit }] at each bar start, for the tune
  raw.s.forEach((sec, si) => {
    const secPerUnit = (60 / ((sec.t || raw.bpm) * q)) * u;
    const pattern = typeof sec.p === "number" ? Array.from({ length: sec.p }, (_, i) => i / sec.p) : sec.p;
    const list = sec.b.split("|");
    sections.push({ name: sec.n, index: si, start: t, bars: list.length, bpm: sec.t || raw.bpm });
    list.forEach((bar, bi) => {
      let at = t;
      let barUnits = 0;
      const chords = bar.split(" ").map((tok) => {
        const k = tok.lastIndexOf(":");
        const c = tok.slice(0, k);
        const n = Number(tok.slice(k + 1));
        const item = { c, t: at, dur: n * secPerUnit };
        at += n * secPerUnit;
        barUnits += n;
        return item;
      });
      const dur = barUnits * secPerUnit;
      unitMap.push({ units, t, secPerUnit });
      // Pulses (the beat you'd tap): bar quarters / q.
      const pulses = Math.max(1, Math.round((barUnits * u) / q));
      bars.push({ si, bi, t, dur, units: barUnits, pulses, chords, at: pattern, arp: Boolean(sec.a) });
      t += dur;
      units += barUnits;
    });
  });
  const unitsToSec = (x) => {
    let lo = 0;
    let hi = unitMap.length - 1;
    while (lo < hi) {
      const mid = (lo + hi + 1) >> 1;
      if (unitMap[mid].units <= x + 1e-9) lo = mid; else hi = mid - 1;
    }
    const m = unitMap[lo];
    return m.t + (x - m.units) * m.secPerUnit;
  };
  const melody = raw.m ? raw.m.map(([midi, s, d]) => {
    const start = unitsToSec(s);
    return { midi, t: start, dur: unitsToSec(s + d) - start };
  }) : null;
  const detail = {
    key: raw.k, ts: [N, D], tsLabel: raw.ts, verified: raw.v === 1, bpm: raw.bpm,
    pulseSec: 60 / raw.bpm, sections, bars, total: t, melody,
  };
  cache.set(id, detail);
  return detail;
}

// Index of the bar playing at `t` seconds (normal speed).
function barIndexAt(detail, t) {
  const { bars } = detail;
  let lo = 0;
  let hi = bars.length - 1;
  while (lo < hi) {
    const mid = (lo + hi + 1) >> 1;
    if (bars[mid].t <= t + 1e-6) lo = mid; else hi = mid - 1;
  }
  return lo;
}
// "Chorus · bar 3 of 8"
function whereLabel(detail, t) {
  const bar = detail.bars[barIndexAt(detail, t)];
  const sec = detail.sections[bar.si];
  return `${sec.name} · bar ${bar.bi + 1} of ${sec.bars}`;
}
// The beat (pulse) at `t`: { n: overall count, inBar, perBar, strong }.
function pulseAt(detail, t) {
  const i = barIndexAt(detail, t);
  const bar = detail.bars[i];
  const len = bar.dur / bar.pulses;
  const inBar = Math.min(bar.pulses - 1, Math.max(0, Math.floor((t - bar.t + 1e-6) / len)));
  const strong = inBar === 0 || (bar.pulses % 2 === 0 && inBar === bar.pulses / 2);
  return { n: i * 64 + inBar, inBar, perBar: bar.pulses, strong, bar: i };
}

// Moves a chord name by `n` keys (semitones): "E/G#" -2 -> "D/F#".
const SHIFT_NAMES = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];
function transposeChord(symbol, n) {
  if (!n || isRest(symbol)) return symbol;
  return symbol.replace(/([A-G])(##|#|bb|b)?/g, (m, letter, acc) => {
    const pc = PITCH_CLASS[letter + (acc || "")];
    return pc === undefined ? m : SHIFT_NAMES[(((pc + n) % 12) + 12) % 12];
  });
}
const prettyChord = (c) => (isRest(c) ? "Rest" : c.replace(/##/g, "𝄪").replace(/#/g, "♯").replace(/([A-G])bb/g, "$1𝄫").replace(/([A-G])b/g, "$1♭"));

// The practice keyboard's voicing: the right hand plays every note of the
// chord (root position, root from middle C up, down an octave if it runs
// off the top), the left hand the bass note (the slash bass if there is
// one) low, from C3 to B3.
function voicePractice(symbol, { lo = 48, hi = 84 } = {}) {
  const parsed = parseChordSymbol(symbol);
  if (!parsed || isRest(symbol)) return { left: [], right: [] };
  let right = parsed.intervals.map((iv) => 60 + parsed.root + iv);
  while (Math.max(...right) > hi && Math.min(...right) - 12 >= lo + 12) right = right.map((m) => m - 12);
  // Big chords (9ths, 13ths): a note still off the top comes down an octave.
  right = [...new Set(right.map((m) => (m > hi ? m - 12 : m)))].sort((a, b) => a - b);
  let bass = lo + (((parsed.bass ?? parsed.root) - lo) % 12 + 12) % 12;
  if (bass >= Math.min(...right)) bass -= 12;
  if (bass < lo) bass += 12;
  return { left: [bass], right };
}

// Sorted times with near-duplicates (within 1 ms) merged.
function uniqTimes(list) {
  return list.sort((a, b) => a - b).filter((t, i, a) => i === 0 || t - a[i - 1] > 1e-3);
}

// Falling-block events for the whole song: [{ midi, time, duration, hand }]
// plus marks ([{ t, label, chord, where }]) at every chord change.
// `voice(symbol)` -> { left, right }; `shift` moves the song to another key.
function songEvents(detail, { voice = voicePractice, shift = 0 } = {}) {
  const events = [];
  const marks = [];
  detail.bars.forEach((bar) => {
    const end = bar.t + bar.dur;
    // Press points: the "piano" rhythm, plus every chord change.
    const presses = uniqTimes([...bar.at.map((f) => bar.t + f * bar.dur), ...bar.chords.map((ch) => ch.t)]);
    // Left hand: the bar's strong beats (start, and halfway when the bar
    // has an even number of beats) plus every chord change.
    const lhPts = uniqTimes([bar.t, ...(bar.pulses % 2 === 0 ? [bar.t + bar.dur / 2] : []), ...bar.chords.map((ch) => ch.t)]);
    const chordAt = (t) => bar.chords.find((ch) => t >= ch.t - 1e-4 && t < ch.t + ch.dur - 1e-4) || bar.chords[bar.chords.length - 1];
    // A mark at every bar and every chord change, so the banner's
    // "Chorus · bar 3 of 8" follows the music.
    const where = `${detail.sections[bar.si].name} · bar ${bar.bi + 1} of ${detail.sections[bar.si].bars}`;
    bar.chords.forEach((ch) => {
      const sym = transposeChord(ch.c, shift);
      marks.push({ t: ch.t, label: prettyChord(sym), chord: sym, where });
    });
    let arpI = 0;
    let arpChord = null;
    presses.forEach((p, i) => {
      const ch = chordAt(p);
      if (isRest(ch.c)) return;
      const { right } = voice(transposeChord(ch.c, shift));
      const next = Math.min(presses[i + 1] ?? end, ch.t + ch.dur);
      const dur = Math.max(0.08, (next - p) * 0.9);
      if (bar.arp) {
        if (arpChord !== ch) { arpChord = ch; arpI = 0; }
        const sorted = [...right].sort((a, b) => a - b);
        events.push({ midi: sorted[arpI++ % sorted.length], time: p, duration: dur, hand: "right" });
      } else right.forEach((midi) => events.push({ midi, time: p, duration: dur, hand: "right" }));
    });
    lhPts.forEach((p, i) => {
      const ch = chordAt(p);
      if (isRest(ch.c)) return;
      const { left } = voice(transposeChord(ch.c, shift));
      const next = Math.min(lhPts[i + 1] ?? end, ch.t + ch.dur);
      left.forEach((midi) => events.push({ midi, time: p, duration: Math.max(0.1, (next - p) * 0.94), hand: "left" }));
    });
  });
  events.sort((a, b) => a.time - b.time);
  return { events, marks, total: detail.total };
}

// The chord steps a player moves through: one per chord change (the same
// chord again in the same section is one longer step). len in seconds.
function songChordSteps(detail) {
  const steps = [];
  detail.bars.forEach((bar) => bar.chords.forEach((ch) => {
    const last = steps[steps.length - 1];
    const chord = isRest(ch.c) ? "N.C." : ch.c;
    if (last && last.chord === chord && last.section === String(bar.si)) last.len += ch.dur;
    else steps.push({ chord, section: String(bar.si), len: ch.dur, t: ch.t });
  }));
  return steps;
}

const NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const noteName = (m) => NOTE_NAMES[((m % 12) + 12) % 12];

// The tune (right hand), note for note, over a soft left-hand bass on the
// chord changes. Ends at the end of the bar with the last note.
// Returns { events, steps (one per note onset, len in seconds), total, range }.
function tuneEvents(detail, { voice = voicePractice } = {}) {
  if (!detail.melody || !detail.melody.length) return null;
  const mel = detail.melody;
  const lastEnd = Math.max(...mel.map((n) => n.t + n.dur));
  const lastBar = detail.bars[barIndexAt(detail, lastEnd - 1e-3)];
  const total = lastBar.t + lastBar.dur;
  // Several notes at once (e.g. Bach's prelude): the low ones are the left hand.
  const poly = mel.some((n, i) => i && n.t < mel[i - 1].t + mel[i - 1].dur - 1e-3);
  const handOf = (m) => (poly && m < 60 ? "left" : "right");
  const events = mel.map((n) => ({ midi: n.midi, time: n.t, duration: Math.max(0.06, n.dur * 0.92), hand: handOf(n.midi) }));
  if (!poly) {
    detail.bars.forEach((bar) => bar.chords.forEach((ch) => {
      if (ch.t >= total - 1e-3 || isRest(ch.c)) return;
      voice(ch.c).left.forEach((midi) => events.push({ midi, time: ch.t, duration: Math.max(0.1, Math.min(ch.dur, total - ch.t) * 0.94), hand: "left", accomp: true }));
    }));
  }
  events.sort((a, b) => a.time - b.time);
  // Steps: each moment a tune note starts (a rest first if it starts late).
  const starts = [...new Set(mel.map((n) => +n.t.toFixed(4)))].sort((a, b) => a - b);
  const steps = [];
  if (starts[0] > 1e-3) steps.push({ chord: "N.C.", midis: [], section: String(detail.bars[0].si), len: starts[0], t: 0 });
  starts.forEach((s, i) => {
    const notes = mel.filter((n) => Math.abs(n.t - s) < 1e-3).map((n) => n.midi);
    const top = Math.max(...notes);
    steps.push({
      chord: noteName(top), midis: notes, hands: notes.map(handOf),
      section: String(detail.bars[barIndexAt(detail, s)].si), len: (starts[i + 1] ?? total) - s, t: s,
    });
  });
  const all = events.map((e) => e.midi);
  return { events, steps, total, range: [Math.min(...all), Math.max(...all)] };
}

// The song's chords section by section, for "The chords in this song":
// neighbouring sections with the same chords are grouped.
function sectionRows(detail) {
  const rows = [];
  detail.sections.forEach((sec) => {
    const chords = [];
    detail.bars.filter((b) => b.si === sec.index).forEach((b) => b.chords.forEach((ch) => {
      if (!isRest(ch.c) && chords[chords.length - 1] !== ch.c) chords.push(ch.c);
    }));
    const last = rows[rows.length - 1];
    const name = sec.name;
    if (last && last.chords.join() === chords.join()) last.names.push(name);
    else rows.push({ names: [name], chords });
  });
  return rows.filter((r) => r.chords.length).map((r) => ({ label: r.names.join(" · "), chords: r.chords }));
}

export {
  hasSongDetail, getSongDetail, songEvents, songChordSteps, tuneEvents, sectionRows,
  whereLabel, barIndexAt, pulseAt, transposeChord, prettyChord, voicePractice, isRest,
};
