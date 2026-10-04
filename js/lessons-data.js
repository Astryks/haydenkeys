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
];

export {
  LESSON1_CHORDS,
  LESSON1_SEQUENCE,
  LESSON2_DEGREES,
  MINOR_DEGREES,
  ODE_TO_JOY_MELODY,
  LESSONS,
};
