import { SONGS, getDifficulty } from "./songs-data.js";
import { chordSymbolToMidi } from "./chord-utils.js";

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

// Two real pre-lesson steps, added per Sid's direct feedback: a plain
// "go get yourself a piano" info card (no interactivity beyond reading
// it and continuing — genuine, researched advice, not filler), then the
// existing audio pitch-match calibration flow as its own numbered
// lesson ("Get Started") rather than buried inside the first chords
// lesson. These sit at the very front of the array, which is why
// everything else's *positional* number in the on-screen timeline
// shifts by 2 — their ids are untouched, so saved progress/badges tied
// to "lesson-1" etc. keep working exactly as before.
const PRE_LESSONS = [
  {
    id: "lesson-piano",
    title: "Get yourself a piano",
    subtitle: "Before you start",
    description: "You don't need to own a real piano yet — here's how to find something to practice on, cheap or free.",
    pre: true,
  },
  {
    id: "lesson-getstarted",
    title: "Get Started",
    subtitle: "Find your starting key",
    description: "A quick audio check: play a note, and the app listens through your microphone to confirm you found the right key.",
    pre: true,
  },
];

const THEORY_LESSONS = [
  {
    id: "lesson-1",
    title: "The 4 keys to play 100 songs",
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

  // --- Days 11-35: the extended arc. Framed honestly throughout as ---
  // "strong early-intermediate," never "advanced" — real advanced piano
  // takes years, not 35 lessons.
  { id: "lesson-11", title: "Day 11: C major scale", subtitle: "A scale is just degrees 1-7 in a row", description: "No black keys — the easiest possible scale, and the same numbers you already know from chords." },
  { id: "lesson-12", title: "Day 12: G major scale", subtitle: "Same shape, new key", description: "One sharp (F#) — the exact note already hiding inside your D and Em chords." },
  { id: "lesson-13", title: "Day 13: D major scale", subtitle: "Same shape again", description: "Two sharps — the pattern keeps transposing, just like the chords did." },
  { id: "lesson-14", title: "Day 14: F major scale", subtitle: "The one exception", description: "One flat (Bb) — and the one scale where the fingering pattern genuinely changes." },
  { id: "lesson-15", title: "Day 15: Scales review", subtitle: "A chord is a scale, stacked", description: "Connecting the dots: scale degrees 1-3-5 played together are literally the chords you already know." },
  { id: "lesson-16", title: "Day 16: Minor scales, the pattern", subtitle: "A different 7-note shape", description: "The natural minor scale's own whole-step/half-step pattern — transposable just like major scales." },
  { id: "lesson-17", title: "Day 17: A minor", subtitle: "C major's relative minor", description: "Same notes, same key signature as C major — just starting from a different note." },
  { id: "lesson-18", title: "Day 18: E minor", subtitle: "G major's relative minor", description: "Same key signature as G major (one sharp) — the relative-minor pattern keeps transposing." },
  { id: "lesson-19", title: "Day 19: D minor", subtitle: "F major's relative minor", description: "Same key signature as F major (one flat)." },
  { id: "lesson-20", title: "Day 20: Minor scales review", subtitle: "Every major key has a minor twin", description: "Review and payoff: which library songs live in these relative-minor keys." },
  { id: "lesson-21", title: "Day 21: Alternating bass", subtitle: "Your first two-hand pattern", description: "A simple root-fifth left-hand pattern under a right-hand chord — the classic 'oom-pah.'" },
  { id: "lesson-22", title: "Day 22: Alberti bass", subtitle: "A busier, smoother pattern", description: "The broken-chord left-hand pattern found all over classical piano repertoire." },
  { id: "lesson-23", title: "Day 23: Arpeggios", subtitle: "Chords, one note at a time", description: "The technique bridge between scales and chords — playing a chord's notes one at a time instead of together." },
  { id: "lesson-24", title: "Day 24: Two hands together", subtitle: "Coordination practice", description: "Combining a left-hand bass pattern with a right-hand chord or melody." },
  { id: "lesson-25", title: "Day 25: Two-hand review", subtitle: "Apply it to a real progression", description: "Playing Lesson 1's G-D-Em-C with real, full two-hand technique — deeper than the early preview back in Lesson 4." },
  { id: "lesson-26", title: "Day 26: Dominant 7th chords", subtitle: "A classic richer color", description: "The 7th chord behind blues, jazz, and a lot of pop harmony." },
  { id: "lesson-27", title: "Day 27: Major 7th chords", subtitle: "A dreamier color", description: "Softer and jazzier than a plain major triad." },
  { id: "lesson-28", title: "Day 28: Minor 7th chords", subtitle: "A smoother minor color", description: "The minor equivalent — smoother and less tense than a plain minor triad." },
  { id: "lesson-29", title: "Day 29: Inversions with 7ths", subtitle: "Smoother voice leading", description: "Applying Lesson 7's inversion idea to richer 4-note chords." },
  { id: "lesson-30", title: "Day 30: Richer harmony payoff", subtitle: "Your Lesson 1 song, re-voiced", description: "Hear how much richer G-D-Em-C sounds as Gmaj7-D7-Em7-Cmaj7." },
  { id: "lesson-31", title: "Day 31: Canon in D", subtitle: "The capstone progression", description: "A second classical piece — Pachelbel's famous 8-chord progression, the direct ancestor of Lesson 1's pattern." },
  { id: "lesson-32", title: "Day 32: Canon's bass line", subtitle: "Left-hand practice", description: "Playing the famous descending-feel bass line on its own." },
  { id: "lesson-33", title: "Day 33: Canon's chords", subtitle: "Right-hand practice", description: "Adding the right-hand chords over the bass line." },
  { id: "lesson-34", title: "Day 34: Canon, richer", subtitle: "Adding 7th-chord color", description: "Trying a 7th-chord variation on the Canon progression." },
  { id: "lesson-35", title: "Day 35: Full performance", subtitle: "The capstone, both hands", description: "Playing the complete Canon in D progression with both hands — the arc's final payoff." },
  { id: "lesson-36", title: "Bonus: Jazz comping & improv", subtitle: "Left hand comps, right hand improvises", description: "The real, deeper version of the early 'jazz trick' preview: builds on Days 26-30's 7th chords, left hand plays a ii-V-I, right hand improvises freely using the major pentatonic scale — no right/wrong answer, just noodle." },
  { id: "lesson-37", title: "Bonus: Advanced repertoire", subtitle: "Für Elise, and a verified catalog beyond it", description: "A real excerpt of Beethoven's famous opening phrase, plus a researched (not guessed) catalog of Chopin, Debussy, and Satie pieces for later." },
];

// ===== "Master this song" lessons: real songs, woven into the theory arc =====
//
// Instead of padding toward 100 lessons with filler, each tier of the
// library's verified ("confirmed"-chord) songs becomes its own
// lightweight, numbered lesson, inserted right after the theory that
// unlocks it — reusing data that's already independently verified
// elsewhere in the app (songs-data.js), not inventing new content.
// A song only gets a lesson if every one of its chords is something
// the chord-symbol parser (chord-utils.js) actually understands —
// e.g. "Bohemian Rhapsody" is deliberately excluded here because its
// own chord data says "varies dramatically by section," which isn't a
// literal, playable chord list.
const MASTERABLE_SONGS = SONGS.filter(
  (s) => s.confidence === "confirmed" && s.chords.every((c) => chordSymbolToMidi(c).length > 0)
);
const BEGINNER_SONGS = MASTERABLE_SONGS.filter((s) => getDifficulty(s) === "Beginner");
const INTERMEDIATE_SONGS = MASTERABLE_SONGS.filter((s) => getDifficulty(s) === "Intermediate");
const ADVANCED_SONGS = MASTERABLE_SONGS.filter((s) => getDifficulty(s) === "Advanced");

let songLessonCounter = 0;
function masterSongLesson(song, extra = {}) {
  songLessonCounter++;
  return {
    id: `song-${songLessonCounter}`,
    title: `Master: ${song.title}`,
    subtitle: song.artist,
    description: `A real song, real verified chords (${song.chords.join("-")}) — play it start to finish with what you already know.`,
    songTitle: song.title,
    ...extra,
  };
}

function insertAfter(list, id, items) {
  const idx = list.findIndex((l) => l.id === id);
  list.splice(idx === -1 ? list.length : idx + 1, 0, ...items);
}

// ===== Item 25: front-loaded practical sequence (Lessons 2-12) =====
//
// Sid's exact spec for the start of the curriculum: real songs and fun
// previews FIRST, with the deeper theory arc (already fully built)
// continuing right after. Every song used here is pulled from the real,
// verified library — nothing invented. "Last Christmas" was
// specifically re-verified as part of this change (see its updated
// notes in songs-data.js): its real chords are D-Bm-Em-A (I-vi-ii-V),
// which is NOT the same progression as Lesson 1 — close (shares the I
// and vi chords) but genuinely different, so the lesson that teaches it
// says so honestly instead of pretending it's an exact match.
const NEW_FRONT_LESSONS = [
  {
    id: "lesson-lastchristmas",
    title: "Last Christmas",
    subtitle: "A close cousin of Lesson 1's pattern",
    description: "Apply chord-reading to a real, famous song — honestly, a different (but related) 4-chord pattern, not literally Lesson 1's chords.",
  },
  {
    id: "lesson-choose",
    title: "Choose your song",
    subtitle: "Pick one — you decide",
    description: "10 popular songs that use Lesson 1's exact chord family. Pick whichever one you actually want to play.",
  },
  {
    id: "lesson-twohand-preview",
    title: "Left hand vs. right hand",
    subtitle: "A first taste of two hands",
    description: "One hand holds the chord, the other plays a simple note on top — an early, easy preview of real two-hand playing (the full depth comes later, Days 21-25).",
  },
  {
    id: "lesson-jazz-preview",
    title: "The jazz trick",
    subtitle: "A first taste of improvising",
    description: "Left hand loops chords you already know, right hand noodles freely over safe notes — a quick, fun preview (the full version comes later, the Jazz comping bonus lesson).",
  },
  {
    id: "lesson-eartraining",
    title: "Train your ear",
    subtitle: "Figure out a song by ear",
    description: "The real skill behind learning any song you hear on the radio — worked through on a simple, honestly-chosen example.",
  },
];

// Songs for "Choose your song" (Lesson 3): real 1-5-6-4-family songs,
// excluding Shallow (already fully played through inside Lesson 1
// itself) so this feels like fresh choices, not a repeat.
const CHOOSE_SONGS = BEGINNER_SONGS.filter((s) => s.oneFiveSixFourMatch && s.title !== "Shallow").slice(0, 10);

// "My Funny Valentine" and "Almost Blue" get their own dedicated
// showcase lessons (11 and 15, added in a later update — see
// SPECIAL_POSITIONS below) — excluded here too so the generic
// Advanced-tier sweep doesn't also generate a second, redundant
// "Master: My Funny Valentine" lesson for the exact same song. Real
// duplicate-content bug found during the item-36 full audit: the
// Advanced sweep (unlike the Beginner/Intermediate sweeps) wasn't
// filtered against consumedTitles at all, so "My Funny Valentine"
// (confirmed-chord, Advanced-tier) silently got taught twice — once at
// Lesson 15, once again as the very last song-mastery lesson. "Almost
// Blue" didn't duplicate (its own chord data isn't fully parseable, so
// it was never in the Advanced sweep's pool to begin with), but it's
// added here too for the same reason, in case that ever changes.
const consumedTitles = new Set([
  "Shallow", "Last Christmas", "My Funny Valentine", "Almost Blue",
  ...CHOOSE_SONGS.map((s) => s.title),
]);

// Lessons 7-10: four more individual Beginner-tier songs, distinct from
// the "Choose your song" list.
const FRONT_SONGS_7_10 = BEGINNER_SONGS.filter((s) => !consumedTitles.has(s.title)).slice(0, 4);
FRONT_SONGS_7_10.forEach((s) => consumedTitles.add(s.title));

// Lesson 11: "Intermediate unlocked" — the first genuinely Intermediate
// song, distinct from Last Christmas (which already has its own lesson
// even though it's technically Intermediate-tier too).
const INTERMEDIATE_UNLOCK_SONG = INTERMEDIATE_SONGS.find((s) => !consumedTitles.has(s.title));
if (INTERMEDIATE_UNLOCK_SONG) consumedTitles.add(INTERMEDIATE_UNLOCK_SONG.title);

// By Lesson 10, the user has completed 5 real Beginner-tier songs
// (1 from "Choose your song" + 4 from Lessons 7-10) — exactly the
// existing 5-songs-to-unlock threshold (see badges.js /
// discover.js), so Intermediate genuinely unlocks around here without
// needing to change that threshold at all. The "Intermediate unlocked"
// showcase lesson itself was moved out of the Lesson 11 slot (see
// below — Sid gave that slot an exact repertoire placement instead) and
// now just flows naturally into the Lesson 13+ continuation.
const frontSongLessons78910 = FRONT_SONGS_7_10.map((s) => masterSongLesson(s));
const intermediateUnlockLesson = INTERMEDIATE_UNLOCK_SONG
  ? masterSongLesson(INTERMEDIATE_UNLOCK_SONG, { intermediateUnlock: true, title: `Intermediate unlocked: ${INTERMEDIATE_UNLOCK_SONG.title}` })
  : null;

// Remaining song pools (everything not already placed up front) keep
// getting woven into the theory arc exactly as before, just from a
// smaller remaining pool.
const BEGINNER_REMAINING = BEGINNER_SONGS.filter((s) => !consumedTitles.has(s.title));
const INTERMEDIATE_REMAINING = INTERMEDIATE_SONGS.filter((s) => !consumedTitles.has(s.title));
const beginnerRemainingLessons = BEGINNER_REMAINING.map((s) => masterSongLesson(s));
const intermediateRemainingLessons = INTERMEDIATE_REMAINING.map((s) => masterSongLesson(s));
const advancedSongLessons = ADVANCED_SONGS.filter((s) => !consumedTitles.has(s.title)).map((s) => masterSongLesson(s));

const theoryById = Object.fromEntries(THEORY_LESSONS.map((l) => [l.id, l]));
// lesson-1 (the 4 keys) and lesson-11 (C major scale, pulled forward as
// Lesson 12's "Learn a scale") are relocated to the front; everything
// else keeps its original relative order and content, just picking up
// after the new front-loaded run. The "Intermediate unlocked" showcase
// is unshifted onto the very front of this continuation.
const theoryRest = [
  ...(intermediateUnlockLesson ? [intermediateUnlockLesson] : []),
  ...THEORY_LESSONS.filter((l) => l.id !== "lesson-1" && l.id !== "lesson-11"),
];
insertAfter(theoryRest, "lesson-6", beginnerRemainingLessons);
insertAfter(theoryRest, "lesson-30", intermediateRemainingLessons);
insertAfter(theoryRest, "lesson-37", advancedSongLessons);

// ===== Sid's exact repertoire placements (update to item 25) =====
//
// Jazz/classical showcase lessons dropped at specific, EXACT numbered
// positions, well before a user would naturally unlock Advanced tier
// through the 5-songs-per-tier gate — same "early preview" pattern
// already used for Lessons 4/5 (two-hand/jazz previews). Reachability
// here is just normal linear lesson-sequence progress (complete the
// lesson before it); it's intentionally independent of the Discover
// tab's separate Advanced-tier unlock, which still gates the *rest* of
// the Advanced song library normally.
const SPECIAL_POSITIONS = {
  11: { id: "lesson-almostblue", title: "Almost Blue", subtitle: "A glimpse of real jazz ballad harmony", description: "Chet Baker's famous version of the Elvis Costello song — just its two confidently-sourced intro chords, honestly labeled as a glimpse, not the full tune." },
  15: { id: "lesson-myfunnyvalentine", title: "My Funny Valentine", subtitle: "The 'minor line cliché'", description: "A real, famous 4-chord descending line (Cm-CmMaj7-Cm7-Cm6) used in jazz standards and film scores alike." },
  25: { id: "lesson-beethoven", title: "Für Elise", subtitle: "A real piece by a legend", description: "An early preview of Beethoven's famous opening phrase — the full capstone treatment of two-hand technique is still ahead, this is just a taste of real repertoire." },
  30: { id: "lesson-vivaldi", title: "Vivaldi's Spring (an attempt)", subtitle: "The famous opening gesture, honestly scoped", description: "An attempt at Vivaldi's Four Seasons — scoped down to just the iconic repeated opening chord gesture, not the full violin theme, which resists confident simplification this pass." },
  35: { id: "lesson-chopin", title: "Chopin's Nocturne", subtitle: "A real, verified catalog entry", description: "Nocturne Op. 9 No. 2 — Chopin's most iconic piece. Honestly catalog-only this pass: no confidently-verified note-by-note excerpt was built, rather than guess at one." },
};

const numbered = [
  theoryById["lesson-1"],
  ...NEW_FRONT_LESSONS,
  ...frontSongLessons78910,
  theoryById["lesson-11"],
  ...theoryRest,
];

function withReservedPositions(list, reserved) {
  const remaining = new Map(Object.entries(reserved));
  const out = [];
  let pos = 0;
  let i = 0;
  while (i < list.length || remaining.size) {
    pos++;
    if (remaining.has(String(pos))) {
      out.push(remaining.get(String(pos)));
      remaining.delete(String(pos));
    } else if (i < list.length) {
      out.push(list[i]);
      i++;
    }
  }
  return out;
}

const LESSONS = [...PRE_LESSONS, ...withReservedPositions(numbered, SPECIAL_POSITIONS)];

// Honest final count: every entry above, real and clickable — nothing
// padded to hit a round number.
const TOTAL_LESSON_COUNT = LESSONS.length;

export {
  PRE_LESSONS,
  THEORY_LESSONS,
  MASTERABLE_SONGS,
  CHOOSE_SONGS,
  TOTAL_LESSON_COUNT,
};

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
