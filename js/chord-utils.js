// Minimal chord-symbol parser: turns a chord name like "Bm7" or "C#m"
// into a set of MIDI notes for playback/highlighting in the Practice
// tab. Intentionally simple — covers the qualities that actually show
// up in songs-data.js. Music-theory facts only (interval formulas),
// nothing copyrighted.

const PITCH_CLASS = {
  C: 0, "C#": 1, Db: 1, D: 2, "D#": 3, Eb: 3, E: 4, F: 5, "F#": 6, Gb: 6,
  G: 7, "G#": 8, Ab: 8, A: 9, "A#": 10, Bb: 10, B: 11,
};

// Order matters: more specific/longer suffixes must be checked before
// shorter ones they'd otherwise be swallowed by (e.g. "mmaj7" and "m6"
// both start with "m", so they have to come before the plain "m" entry
// or they'd silently lose their defining color note — a real bug found
// and fixed while building the "My Funny Valentine" lesson, whose whole
// point is the Cm -> CmMaj7 -> Cm7 -> Cm6 descending line).
// Item 56: added 9ths and altered 7ths — "Dm9" used to match plain "m"
// and light up an ordinary Dm, "C9" played a C7, "G7b9"/"D7b5" lost
// their defining note, and "6/9" had no 9th.
const QUALITY_INTERVALS = [
  { suffix: "mmaj7", intervals: [0, 3, 7, 11] },
  { suffix: "maj9", intervals: [0, 4, 7, 11, 14] },
  { suffix: "m9", intervals: [0, 3, 7, 10, 14] },
  { suffix: "7b9", intervals: [0, 4, 7, 10, 13] },
  { suffix: "7#9", intervals: [0, 4, 7, 10, 15] },
  { suffix: "7b5", intervals: [0, 4, 6, 10] },
  { suffix: "7#5", intervals: [0, 4, 8, 10] },
  { suffix: "7sus4", intervals: [0, 5, 7, 10] },
  { suffix: "m(maj7)", intervals: [0, 3, 7, 11] },
  { suffix: "m7b5", intervals: [0, 3, 6, 10] },
  { suffix: "m7", intervals: [0, 3, 7, 10] },
  { suffix: "m6", intervals: [0, 3, 7, 9] },
  { suffix: "dim7", intervals: [0, 3, 6, 9] },
  { suffix: "dim", intervals: [0, 3, 6] },
  { suffix: "maj7", intervals: [0, 4, 7, 11] },
  { suffix: "add9", intervals: [0, 4, 7, 14] },
  { suffix: "sus2", intervals: [0, 2, 7] },
  { suffix: "sus4", intervals: [0, 5, 7] },
  { suffix: "aug", intervals: [0, 4, 8] },
  { suffix: "6/9", intervals: [0, 4, 7, 9, 14] },
  { suffix: "6", intervals: [0, 4, 7, 9] },
  { suffix: "9", intervals: [0, 4, 7, 10, 14] },
  { suffix: "7", intervals: [0, 4, 7, 10] },
  { suffix: "5", intervals: [0, 7] }, // power chord: root + fifth
  { suffix: "m", intervals: [0, 3, 7] },
  { suffix: "", intervals: [0, 4, 7] }, // bare major, must be last (empty match)
];

// Parses "C#m7" -> { root: 1, intervals: [0,3,7,10] }. Returns null if
// the symbol can't be parsed (caller should skip/fallback gracefully).
function parseChordSymbol(symbol) {
  const match = /^([A-G])(#|b)?(.*)$/.exec(symbol.trim());
  if (!match) return null;
  const [, letter, accidental, rest] = match;
  const rootName = `${letter}${accidental || ""}`;
  const root = PITCH_CLASS[rootName];
  if (root === undefined) return null;
  // Slash chords ("D/F#"): the part after "/" is the bass note. ("6/9"
  // is a quality, not a slash chord, so it's matched first.)
  let qualityPart = rest;
  let bass = null;
  const slash = /^(.*)\/([A-G](#|b)?)$/.exec(rest);
  if (slash && !/^6\/9$/i.test(rest)) {
    qualityPart = slash[1];
    bass = PITCH_CLASS[slash[2]];
  }
  const quality = QUALITY_INTERVALS.find((q) => qualityPart.toLowerCase().startsWith(q.suffix));
  return { root, intervals: quality ? quality.intervals : [0, 4, 7], bass: bass ?? null };
}

// Returns MIDI notes for a chord symbol in a comfortable octave
// (root between C4 and B4).
function chordSymbolToMidi(symbol, baseOctaveMidi = 60) {
  const parsed = parseChordSymbol(symbol);
  if (!parsed) return [];
  const notes = parsed.intervals.map((iv) => baseOctaveMidi + parsed.root + iv);
  if (parsed.bass !== null && parsed.bass !== parsed.root) {
    // Bass note goes below the chord (the next one down from the root).
    let bassMidi = baseOctaveMidi + parsed.bass;
    while (bassMidi >= notes[0]) bassMidi -= 12;
    notes.unshift(bassMidi);
  }
  return notes;
}

export { parseChordSymbol, chordSymbolToMidi, PITCH_CLASS };
