// Lesson content/data. Three real, fully-interactive lessons ship in
// this release (see README "What's built vs Phase 2"): the core
// 1-5-6-4 pattern, the major/minor-by-scale-degree pattern, and a first
// taste of traditional staff notation. The full 10-day curriculum
// implied by the original pitch is a Phase 2 roadmap item, not faked
// here with empty placeholder screens.

// Chord shapes used by Lesson 1 — G major's 1-5-6-4 (NOT G-A-C-D; the
// musically-correct I-V-vi-IV built on G is G-D-Em-C).
const LESSON1_CHORDS = {
  G: { notes: [67, 71, 74], root: 67, number: "1", letter: "G", quality: "major" },
  D: { notes: [62, 66, 69], root: 62, number: "5", letter: "D", quality: "major" },
  Em: { notes: [64, 67, 71], root: 64, number: "6", letter: "Em", quality: "minor" },
  C: { notes: [60, 64, 67], root: 60, number: "4", letter: "C", quality: "major" },
};
const LESSON1_SEQUENCE = ["G", "D", "Em", "C"];

// Diatonic triads built on every degree of the G major scale, for
// Lesson 2's "major/minor is a pattern, not memorization" teaching:
// in ANY major key, scale degrees 1/4/5 are major, 2/3/6 are minor,
// and 7 is diminished.
const LESSON2_DEGREES = [
  { degree: 1, letter: "G", notes: [67, 71, 74], quality: "major" },
  { degree: 2, letter: "Am", notes: [69, 72, 76], quality: "minor" },
  { degree: 3, letter: "Bm", notes: [71, 74, 78], quality: "minor" },
  { degree: 4, letter: "C", notes: [72, 76, 79], quality: "major" },
  { degree: 5, letter: "D", notes: [74, 78, 81], quality: "major" },
  { degree: 6, letter: "Em", notes: [76, 79, 83], quality: "minor" },
  { degree: 7, letter: "F#dim", notes: [78, 81, 84], quality: "diminished" },
];
const MINOR_DEGREES = [2, 3, 6];

// "Ode to Joy" (Beethoven, Symphony No. 9, 1824) — melody only, public
// domain, used here purely as a vehicle to introduce staff notation.
// No lyrics, no copyrighted arrangement.
const ODE_TO_JOY_MELODY = [
  64, 64, 65, 67, 67, 65, 64, 62, 60, 60, 62, 64, 64, 62, 62,
];

// Lesson 4 — same four chords as Lesson 1, reordered to I-vi-IV-V
// (the "Perfect"/"Photograph" shape). Reuses LESSON1_CHORDS' shapes.
const LESSON4_SEQUENCE = ["G", "Em", "C", "D"];

// Lesson 5 — the 2 chord (ii), beyond the core four. In G major, ii is
// A minor.
const LESSON5_CHORD = { notes: [69, 72, 76], root: 69, number: "2", letter: "Am", quality: "minor" };

// Lesson 6 — natural-minor diatonic triads built on every degree of A
// natural minor, teaching that minor keys have their own major/minor
// pattern too: i, iv, v minor; III, VI, VII major; ii diminished.
const LESSON6_DEGREES = [
  { degree: "1", roman: "i", letter: "Am", notes: [57, 60, 64], quality: "minor" },
  { degree: "2", roman: "ii°", letter: "Bdim", notes: [59, 62, 65], quality: "diminished" },
  { degree: "3", roman: "III", letter: "C", notes: [60, 64, 67], quality: "major" },
  { degree: "4", roman: "iv", letter: "Dm", notes: [62, 65, 69], quality: "minor" },
  { degree: "5", roman: "v", letter: "Em", notes: [64, 67, 71], quality: "minor" },
  { degree: "6", roman: "VI", letter: "F", notes: [65, 69, 72], quality: "major" },
  { degree: "7", roman: "VII", letter: "G", notes: [67, 71, 74], quality: "major" },
];
const MINOR_KEY_MINOR_DEGREES = ["1", "4", "5"]; // i, iv, v are minor in a natural minor key

// Lesson 7 — inversions: the same C major triad in root position, 1st,
// and 2nd inversion, to demonstrate smoother voice leading from G.
const LESSON7_CHORDS = [
  { label: "G (root position)", notes: [67, 71, 74] },
  { label: "C (root position) — biggest jump", notes: [60, 64, 67] },
  { label: "C (1st inversion) — smoother from G", notes: [64, 67, 72] },
];

// Lesson 8 — seventh chords: the flavor behind several library songs'
// jazzier harmony (Die With a Smile's Amaj7/Dmaj7, Closer's Fm7).
const LESSON8_CHORDS = [
  { label: "G (triad)", notes: [67, 71, 74] },
  { label: "G7 (dominant 7th)", notes: [67, 71, 74, 77] },
  { label: "Gmaj7 (major 7th)", notes: [67, 71, 74, 78] },
  { label: "Em7", notes: [64, 67, 71, 74] },
];

// Lesson 9 — key signatures: G major has one sharp (F#), which is
// exactly the F# already played inside the D and Em chords since
// Lesson 1 — the key signature is just a shorthand for "every F in
// this piece is F#", not new information.
const G_MAJOR_SCALE_FOR_STAFF = [67, 69, 71, 72, 74, 76, 78, 79]; // G4..G5, F# not F

// Lesson 10 capstone — "Minuet in G" (BWV Anh. 114, composed by
// Christian Petzold c.1720-25; long misattributed to J.S. Bach because
// it appeared in the Notebook for Anna Magdalena Bach — public domain
// either way). This is the famous opening phrase only: a stepwise
// ascending run from G to D, bracketed by the melody's opening and
// closing D/G — not a full transcription of the piece.
const MINUET_IN_G_OPENING = [74, 67, 69, 71, 72, 74, 67, 67];

const LESSONS = [
  {
    id: "lesson-1",
    title: "Your first 4 chords",
    subtitle: "The 1-5-6-4 pattern",
    description:
      "The chord pattern behind more pop songs than any other. Learn it once, recognize it everywhere.",
  },
  {
    id: "lesson-2",
    title: "Major or minor?",
    subtitle: "It's a pattern, not memorization",
    description:
      "In every major key, degrees 1/4/5 are major and 2/3/6 are minor. Always. Learn the shape, not the list.",
  },
  {
    id: "lesson-3",
    title: "Go deeper",
    subtitle: "Reading real notation",
    description:
      "An optional first look at the staff notation professional musicians use — starting with a famous, simple melody.",
  },
  {
    id: "lesson-4",
    title: "Flip the order",
    subtitle: "The 1-6-4-5 pattern",
    description:
      "Same four chords as Lesson 1, different order — the shape behind a different set of songs.",
  },
  {
    id: "lesson-5",
    title: "A fifth chord",
    subtitle: "Meet the 2",
    description: "One more shape beyond the core four unlocks even more of the library.",
  },
  {
    id: "lesson-6",
    title: "Minor keys have a pattern too",
    subtitle: "i, iv, v minor; III, VI, VII major",
    description:
      "Most of the library's songs are actually in minor keys — this is the pattern that unlocks them.",
  },
  {
    id: "lesson-7",
    title: "Same chord, different shape",
    subtitle: "Inversions",
    description: "Rearranging a chord's notes for smoother, more professional-sounding transitions.",
  },
  {
    id: "lesson-8",
    title: "A touch of jazz",
    subtitle: "Seventh chords",
    description: "The richer, 4-note chords behind some of the library's more sophisticated songs.",
  },
  {
    id: "lesson-9",
    title: "Reading key signatures",
    subtitle: "One sharp = the key of G",
    description:
      "The staff shorthand for 'every F in this piece is F#' — notation catching up to a shape you already know.",
  },
  {
    id: "lesson-10",
    title: "Day 10: a classical piece",
    subtitle: "Minuet in G",
    description:
      "The capstone: reading a real, famous classical melody from notation, in the key you just learned.",
  },
];

export {
  LESSON1_CHORDS,
  LESSON1_SEQUENCE,
  LESSON2_DEGREES,
  MINOR_DEGREES,
  ODE_TO_JOY_MELODY,
  LESSON4_SEQUENCE,
  LESSON5_CHORD,
  LESSON6_DEGREES,
  MINOR_KEY_MINOR_DEGREES,
  LESSON7_CHORDS,
  LESSON8_CHORDS,
  G_MAJOR_SCALE_FOR_STAFF,
  MINUET_IN_G_OPENING,
  LESSONS,
};
