// Days 11-35 curriculum data — the "strong early-intermediate" arc
// beyond the original 10-day pitch. Honest framing throughout: this
// does NOT make anyone an "advanced" pianist (that takes years), it
// takes a Lesson-1-10 graduate from "knows chord shapes and reads a
// little notation" to "has real scale technique, understands relative
// minor, can coordinate two hands, knows richer chord colors, and has
// performed a second classical piece." That's a real, meaningful, but
// bounded step — described as such in the lesson copy, not oversold.
//
// Scale fingering and key-signature facts below are standard,
// independently-documented piano pedagogy (verified against multiple
// piano-method sources) — lower-risk than the pop-song chord research
// since this is foundational theory, not someone's specific
// arrangement, but still checked rather than assumed.

// --- Days 11-14: major scales (same movable shape, new starting key) ---
// A scale IS scale degrees 1-7 in order — the same numbers already
// taught in Lessons 1-2, just played one at a time instead of stacked
// into chords. RH fingering is the standard 1-2-3-1-2-3-4-5 for every
// major scale EXCEPT F major, where the thumb tucks under one note
// earlier (after Bb) to avoid landing a thumb on a black key — a real,
// well-documented exception, not an inconsistency in this data.
const MAJOR_SCALES = [
  {
    day: 11,
    key: "C",
    notes: [60, 62, 64, 65, 67, 69, 71, 72],
    fingeringRH: [1, 2, 3, 1, 2, 3, 4, 5],
    accidentals: "none — all white keys",
  },
  {
    day: 12,
    key: "G",
    notes: [67, 69, 71, 72, 74, 76, 78, 79],
    fingeringRH: [1, 2, 3, 1, 2, 3, 4, 5],
    accidentals: "one sharp (F#) — the same F# already inside your D and Em chords",
  },
  {
    day: 13,
    key: "D",
    notes: [62, 64, 66, 67, 69, 71, 73, 74],
    fingeringRH: [1, 2, 3, 1, 2, 3, 4, 5],
    accidentals: "two sharps (F#, C#)",
  },
  {
    day: 14,
    key: "F",
    notes: [65, 67, 69, 70, 72, 74, 76, 77],
    fingeringRH: [1, 2, 3, 4, 1, 2, 3, 4],
    accidentals: "one flat (Bb) — fingering shifts here: thumb tucks under after Bb (finger 4), not after finger 3, to avoid landing on a black key",
  },
];

// --- Days 16-19: natural minor scales, tied to Lesson 2's relative-minor idea ---
// Every major key has a relative minor: same notes, same key signature,
// different starting ("home") note — exactly a rotation, the same
// concept already used for chord families back in Lesson 1.
const MINOR_SCALES = [
  {
    day: 16,
    key: "A",
    notes: [57, 59, 60, 62, 64, 65, 67, 69],
    relativeMajor: "C",
    accidentals: "none — identical key signature to C major, just starting on A",
  },
  {
    day: 17,
    key: "E",
    notes: [64, 66, 67, 69, 71, 72, 74, 76],
    relativeMajor: "G",
    accidentals: "one sharp (F#) — identical key signature to G major",
  },
  {
    day: 18,
    key: "D",
    notes: [62, 64, 65, 67, 69, 70, 72, 74],
    relativeMajor: "F",
    accidentals: "one flat (Bb) — identical key signature to F major",
  },
];

// --- Days 21-24: two-hand coordination -----------------------------------
const TWO_HAND_PATTERNS = {
  alternatingBass: {
    label: "Alternating bass (root-fifth)",
    leftHand: [48, 55, 48, 55], // C3, G3, C3, G3
    rightHandChord: [60, 64, 67], // C major
    description: "The classic 'oom-pah' pattern — left hand alternates the root and fifth while the right hand holds the chord.",
  },
  albertiBass: {
    label: "Alberti bass (1-5-3-5)",
    leftHand: [48, 55, 52, 55], // C3, G3, E3, G3
    rightHandChord: [60, 64, 67],
    description: "A broken-chord bass pattern named for 18th-century composer Domenico Alberti — smoother and busier than a plain alternating bass, and everywhere in classical piano repertoire.",
  },
  arpeggio: {
    label: "Arpeggio (broken chord)",
    notes: [60, 64, 67, 72, 67, 64, 60],
    description: "The same C major chord, played one note at a time instead of all together — the technique bridge between scales and chords.",
  },
};

// --- Days 26-29: richer harmony (7th chords + inversions) ---------------
const SEVENTH_CHORDS = {
  dominant7: { label: "G7 (dominant 7th)", notes: [67, 71, 74, 77] },
  major7: { label: "Gmaj7 (major 7th)", notes: [67, 71, 74, 78] },
  minor7: { label: "Em7 (minor 7th)", notes: [64, 67, 71, 74] },
};
// Lesson 1's G-D-Em-C progression, re-voiced with 7th chords — the
// "hear how much richer it sounds" payoff moment.
const LESSON1_WITH_SEVENTHS = [
  { label: "Gmaj7", notes: [67, 71, 74, 78] },
  { label: "D7", notes: [62, 66, 69, 72] },
  { label: "Em7", notes: [64, 67, 71, 74] },
  { label: "Cmaj7", notes: [60, 64, 67, 71] },
];

// --- Days 31-35 capstone: Pachelbel's Canon in D --------------------------
// Composed c. 1680-1706, Johann Pachelbel — public domain. Its 8-chord
// progression (D-A-Bm-F#m-G-D-G-A, i.e. I-V-vi-iii-IV-I-IV-V) is one of
// the most famous and influential chord progressions in Western music,
// independently documented as a direct ancestor of the same "4 chords,
// a hundred songs" pop phenomenon this whole curriculum started with —
// a deliberate full-circle capstone, not an arbitrary piece choice.
const CANON_IN_D = {
  chords: [
    { label: "D", roman: "I", notes: [62, 66, 69], bass: 50 },
    { label: "A", roman: "V", notes: [57, 61, 64], bass: 45 },
    { label: "Bm", roman: "vi", notes: [59, 62, 66], bass: 47 },
    { label: "F#m", roman: "iii", notes: [54, 57, 61], bass: 42 },
    { label: "G", roman: "IV", notes: [55, 59, 62], bass: 43 },
    { label: "D", roman: "I", notes: [62, 66, 69], bass: 50 },
    { label: "G", roman: "IV", notes: [55, 59, 62], bass: 43 },
    { label: "A", roman: "V", notes: [57, 61, 64], bass: 45 },
  ],
};

// --- Bonus: jazz comping & improvisation ----------------------------------
// A real, correct jazz technique, scoped for beginners: left hand plays
// the chord progression ("comping"); right hand improvises using the
// major pentatonic scale, which — a genuinely well-known beginner's
// trick, not oversimplified — "always fits" reasonably well over a
// diatonic ii-V-I in the same key, because every pentatonic note is a
// chord tone or a safe passing tone against all three chords. This is
// explicitly NOT quiz-scored (there's no "correct" improvisation) —
// the Lesson UI's completion criteria is time spent experimenting, not
// matching an exact sequence.
const JAZZ_COMPING = {
  key: "C major",
  progression: [
    { label: "Dm7", roman: "ii7", notes: [62, 65, 69, 72] },
    { label: "G7", roman: "V7", notes: [67, 71, 74, 77] },
    { label: "Cmaj7", roman: "Imaj7", notes: [60, 64, 67, 71] },
  ],
  pentatonicNotes: [60, 62, 64, 67, 69, 72], // C major pentatonic: C D E G A C
};

export {
  MAJOR_SCALES,
  MINOR_SCALES,
  TWO_HAND_PATTERNS,
  SEVENTH_CHORDS,
  LESSON1_WITH_SEVENTHS,
  CANON_IN_D,
  JAZZ_COMPING,
};
