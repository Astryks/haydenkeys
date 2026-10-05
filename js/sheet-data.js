// Item 59: pieces for the sheet-music lessons, with real rhythm (not
// just pitch order) so they can be drawn as notation and played in time.
// All three are public domain. `start`/`dur` are in beats (a quarter
// note = 1). Hands: "right" = treble staff, "left" = bass staff.

import { BACH_PRELUDE_C } from "./lessons-data-advanced.js";

const q = 1;
const h = 2;
const w = 4;
const e8 = 0.5;

// Builds events from per-bar lists of [midi, duration] (a midi array
// means a chord), laid end to end.
function line(bars, hand, beatsPerBar) {
  const events = [];
  bars.forEach((bar, b) => {
    let t = b * beatsPerBar;
    bar.forEach(([midi, dur]) => {
      (Array.isArray(midi) ? midi : [midi]).forEach((m) => events.push({ midi: m, start: t, dur, hand, bar: b }));
      t += dur;
    });
  });
  return events;
}

// Ode to Joy — Beethoven, Symphony No. 9 (1824), the famous theme, in C.
// Right hand: the melody (the same notes as Lessons 3 and 6, now with
// their rhythm, including the dotted "E. D D" ending of the phrase).
// Left hand: one low note per bar — the root of the chord the melody
// implies there (C or G), the simplest standard harmonization.
const ODE_RH = [
  [[64, q], [64, q], [65, q], [67, q]],
  [[67, q], [65, q], [64, q], [62, q]],
  [[60, q], [60, q], [62, q], [64, q]],
  [[64, 1.5], [62, e8], [62, h]],
  [[64, q], [64, q], [65, q], [67, q]],
  [[67, q], [65, q], [64, q], [62, q]],
  [[60, q], [60, q], [62, q], [64, q]],
  [[62, 1.5], [60, e8], [60, h]],
];
const ODE_LH = [
  [[48, w]], [[43, w]], [[48, w]], [[43, w]],
  [[48, w]], [[43, w]], [[48, w]], [[43, h], [48, h]],
];
const ODE_TO_JOY = {
  id: "ode",
  title: "Ode to Joy",
  composer: "Ludwig van Beethoven",
  beatsPerBar: 4,
  beatUnit: 4,
  bpm: 84,
  keySig: [],
  bars: 8,
  events: [...line(ODE_RH, "right", 4), ...line(ODE_LH, "left", 4)],
};

// Minuet in G (BWV Anh. 114, Christian Petzold, c. 1725) — the right
// hand's first 8 bars, in 3/4 with its one-sharp (F#) key signature.
const MINUET_RH = [
  [[74, q], [67, e8], [69, e8], [71, e8], [72, e8]],
  [[74, q], [67, q], [67, q]],
  [[76, q], [72, e8], [74, e8], [76, e8], [78, e8]],
  [[79, q], [67, q], [67, q]],
  [[72, q], [74, e8], [72, e8], [71, e8], [69, e8]],
  [[71, q], [72, e8], [71, e8], [69, e8], [67, e8]],
  [[66, q], [67, e8], [69, e8], [71, e8], [67, e8]],
  [[69, 3]],
];
const MINUET_IN_G = {
  id: "minuet",
  title: "Minuet in G",
  composer: "Christian Petzold",
  beatsPerBar: 3,
  beatUnit: 4,
  bpm: 96,
  keySig: [6], // F#
  bars: 8,
  events: line(MINUET_RH, "right", 3),
};

// Bach, Prelude in C major BWV 846 — bars 1-4 written out note by note
// (the pattern from the Bach lesson): each half bar, the left hand plays
// the two lowest notes and holds them, the right hand plays the top
// three notes twice, in sixteenths.
function bachEvents(barsData) {
  const ev = [];
  barsData.forEach((bar, b) => {
    const n = bar.notes;
    for (let half = 0; half < 2; half++) {
      const t = b * 4 + half * 2;
      ev.push({ midi: n[0], start: t, dur: 2, hand: "left", bar: b });
      ev.push({ midi: n[1], start: t + 0.25, dur: 1.75, hand: "left", bar: b });
      [n[2], n[3], n[4], n[2], n[3], n[4]].forEach((m, i) => ev.push({ midi: m, start: t + 0.5 + i * 0.25, dur: 0.25, hand: "right", bar: b }));
    }
  });
  return ev;
}
const BACH_PRELUDE_SHEET = {
  id: "bach",
  title: "Prelude in C major, BWV 846 (bars 1-4)",
  composer: "Johann Sebastian Bach",
  beatsPerBar: 4,
  beatUnit: 4,
  bpm: 60,
  keySig: [],
  bars: 4,
  events: bachEvents(BACH_PRELUDE_C.slice(0, 4)),
  chordNames: BACH_PRELUDE_C.slice(0, 4).map((b) => b.chord),
};
// The same, bars 1-8 — for hands-separately and looping practice.
const BACH_PRELUDE_8 = {
  ...BACH_PRELUDE_SHEET,
  id: "bach8",
  title: "Prelude in C major, BWV 846 (bars 1-8)",
  bars: 8,
  events: bachEvents(BACH_PRELUDE_C),
  chordNames: BACH_PRELUDE_C.map((b) => b.chord),
};

// Intermediate wait-mode material: the Ode to Joy melody alone (single
// notes — works with the microphone too), then Lesson 1's chords.
const ODE_MELODY_ONLY = { ...ODE_TO_JOY, id: "ode-rh", events: line(ODE_RH, "right", 4) };
const LESSON1_CHORD_DRILL = {
  id: "chords-g",
  title: "G - D - Em - C",
  beatsPerBar: 4,
  beatUnit: 4,
  bpm: 72,
  keySig: [6],
  bars: 4,
  events: line(
    [[[[67, 71, 74], w]], [[[62, 66, 69], w]], [[[64, 67, 71], w]], [[[60, 64, 67], w]]],
    "right",
    4
  ),
  chordNames: ["G", "D", "Em", "C"],
};

// The waltz accompaniment pattern ("oom-pah-pah", 3/4): left hand plays
// the chord's root on beat 1, right hand the chord on beats 2 and 3.
// D major and A7 — the two chords a waltz in D leans on most.
const WALTZ_PATTERN = {
  id: "waltz",
  title: "Waltz pattern in D",
  beatsPerBar: 3,
  beatUnit: 4,
  bpm: 108,
  keySig: [6, 1],
  bars: 4,
  events: [
    ...line([[[50, 1]], [[50, 1]], [[45, 1]], [[45, 1]]], "left", 3),
    ...[0, 1, 2, 3].flatMap((b) => {
      const chord = b < 2 ? [62, 66, 69] : [61, 64, 67];
      return [1, 2].flatMap((beat) => chord.map((midi) => ({ midi, start: b * 3 + beat, dur: 1, hand: "right", bar: b })));
    }),
  ],
};

export { WALTZ_PATTERN, ODE_TO_JOY, ODE_MELODY_ONLY, MINUET_IN_G, BACH_PRELUDE_SHEET, BACH_PRELUDE_8, LESSON1_CHORD_DRILL };
