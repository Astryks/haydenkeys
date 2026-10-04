// Minimal chord-symbol parser: turns a chord name like "Bm7" or "C#m"
// into a set of MIDI notes for playback/highlighting in the Practice
// tab. Intentionally simple — covers the qualities that actually show
// up in songs-data.js. Music-theory facts only (interval formulas),
// nothing copyrighted.

const PITCH_CLASS = {
  C: 0, "C#": 1, Db: 1, D: 2, "D#": 3, Eb: 3, E: 4, F: 5, "F#": 6, Gb: 6,
  G: 7, "G#": 8, Ab: 8, A: 9, "A#": 10, Bb: 10, B: 11,
};

const QUALITY_INTERVALS = [
  { suffix: "maj7", intervals: [0, 4, 7, 11] },
  { suffix: "m7", intervals: [0, 3, 7, 10] },
  { suffix: "dim", intervals: [0, 3, 6] },
  { suffix: "add9", intervals: [0, 4, 7, 14] },
  { suffix: "sus4", intervals: [0, 5, 7] },
  { suffix: "7", intervals: [0, 4, 7, 10] },
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
  const quality = QUALITY_INTERVALS.find((q) => rest.toLowerCase().startsWith(q.suffix));
  return { root, intervals: quality ? quality.intervals : [0, 4, 7] };
}

// Returns MIDI notes for a chord symbol in a comfortable octave
// (root between C4 and B4).
function chordSymbolToMidi(symbol, baseOctaveMidi = 60) {
  const parsed = parseChordSymbol(symbol);
  if (!parsed) return [];
  return parsed.intervals.map((iv) => baseOctaveMidi + parsed.root + iv);
}

export { parseChordSymbol, chordSymbolToMidi, PITCH_CLASS };
