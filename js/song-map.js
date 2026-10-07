// A song's whole-song map, bar by bar. Shared with Jaxx Guitar (same file).
//
// Each section in SONG_STRUCTURES is { section, chords, per, bars }:
// `chords` is one pass of the section's pattern, each chord lasts `per`
// bars (default 1; 0.5 = two chords in a bar, 2 = held for two bars), and
// the pattern repeats until the section's `bars` are filled. This is how
// the song really goes (a 16-bar verse looping G D Em C plays each chord
// 4 times, not once for 4 bars).

import { parseChordSymbol } from "./chord-utils.js";

// [{ chord, section, len }] where len is in bars, start to finish. The
// same chord twice in a row inside a section is one longer step.
function songSteps(structure) {
  const steps = [];
  (structure || []).forEach((part) => {
    const chords = part.chords.filter((c) => parseChordSymbol(c) !== null);
    if (!chords.length) return;
    const per = part.per > 0 ? part.per : 1;
    const bars = part.bars > 0 ? part.bars : chords.length * per;
    let filled = 0;
    for (let i = 0; filled < bars - 1e-9; i++) {
      const len = Math.min(per, bars - filled);
      const chord = chords[i % chords.length];
      const last = steps[steps.length - 1];
      if (last && last.chord === chord && last.section === part.section) last.len += len;
      else steps.push({ chord, section: part.section, len });
      filled += len;
    }
  });
  return steps;
}

// Seconds per bar at the recording's tempo, or null when we don't know it.
function barSeconds(song) {
  return song && song.bpm > 0 ? ((song.beatsPerBar || 4) * 60) / song.bpm : null;
}

export { songSteps, barSeconds };
