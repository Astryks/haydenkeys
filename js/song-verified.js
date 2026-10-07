// Verified song data, shared by Hayden Keys and Jaxx Guitar (same file in both apps).
// Researched 2026-10-07 against the original recordings: key at concert pitch, tempo, the
// whole song section by section (intro, verses, choruses, bridges, solos, outro) and, for
// guitar songs, the scale to use over each solo. No lyrics. songs-data.js applies this on
// top of the library. status: "verified" (old data was right), "corrected", or "uncertain"
// (sources disagreed; best guide).
const VERIFIED = {
 "Ode to Joy": {
  "status": "corrected",
  "key": "D major",
  "bpm": 100,
  "beatsPerBar": 4,
  "durationSec": 58,
  "chords": [
   "D",
   "A",
   "D",
   "A"
  ],
  "structure": [
   {
    "section": "Phrase A",
    "chords": [
     "D",
     "A",
     "D",
     "A"
    ],
    "bars": 4
   },
   {
    "section": "Phrase A (cadence)",
    "chords": [
     "D",
     "D",
     "A",
     "A",
     "D",
     "D",
     "A",
     "D"
    ],
    "per": 0.5,
    "bars": 4
   },
   {
    "section": "Phrase B",
    "chords": [
     "A",
     "D",
     "A",
     "D",
     "A",
     "D",
     "E",
     "A"
    ],
    "per": 0.5,
    "bars": 4
   },
   {
    "section": "Phrase A (cadence)",
    "chords": [
     "D",
     "D",
     "A",
     "A",
     "D",
     "D",
     "A",
     "D"
    ],
    "per": 0.5,
    "bars": 4
   },
   {
    "section": "Phrase B (repeat)",
    "chords": [
     "A",
     "D",
     "A",
     "D",
     "A",
     "D",
     "E",
     "A"
    ],
    "per": 0.5,
    "bars": 4
   },
   {
    "section": "Phrase A (final cadence)",
    "chords": [
     "D",
     "D",
     "A",
     "A",
     "D",
     "D",
     "A",
     "D"
    ],
    "per": 0.5,
    "bars": 4
   }
  ]
 },
 "Minuet in G Major": {
  "status": "corrected",
  "key": "G major",
  "bpm": 120,
  "beatsPerBar": 3,
  "durationSec": 96,
  "chords": [
   "G",
   "C",
   "D7",
   "G"
  ],
  "structure": [
   {
    "section": "Part A",
    "chords": [
     "G",
     "G",
     "C",
     "G",
     "Am",
     "G",
     "D",
     "D",
     "G",
     "G",
     "C",
     "G",
     "Am",
     "G",
     "D7",
     "G"
    ],
    "bars": 16
   },
   {
    "section": "Part A (repeat)",
    "chords": [
     "G",
     "G",
     "C",
     "G",
     "Am",
     "G",
     "D",
     "D",
     "G",
     "G",
     "C",
     "G",
     "Am",
     "G",
     "D7",
     "G"
    ],
    "bars": 16
   },
   {
    "section": "Part B (to D major and back)",
    "chords": [
     "G",
     "D",
     "Em",
     "A",
     "D",
     "A7",
     "A7",
     "D",
     "G",
     "C",
     "G",
     "D",
     "C",
     "G",
     "D7",
     "G"
    ],
    "bars": 16
   },
   {
    "section": "Part B (repeat)",
    "chords": [
     "G",
     "D",
     "Em",
     "A",
     "D",
     "A7",
     "A7",
     "D",
     "G",
     "C",
     "G",
     "D",
     "C",
     "G",
     "D7",
     "G"
    ],
    "bars": 16
   }
  ]
 },
 "Für Elise": {
  "status": "corrected",
  "key": "A minor",
  "capoNote": "Optional: no capo, Am shapes",
  "bpm": 125,
  "beatsPerBar": 3,
  "durationSec": 180,
  "chords": [
   "Am",
   "E",
   "Am",
   "C",
   "G",
   "Am",
   "E"
  ],
  "structure": [
   {
    "section": "Theme A",
    "chords": [
     "Am",
     "Am",
     "E",
     "Am",
     "Am",
     "Am",
     "E",
     "Am"
    ],
    "bars": 8
   },
   {
    "section": "Theme A (repeat)",
    "chords": [
     "Am",
     "Am",
     "E",
     "Am",
     "Am",
     "Am",
     "E",
     "Am"
    ],
    "bars": 8
   },
   {
    "section": "Theme A middle phrase and return",
    "chords": [
     "C",
     "G",
     "Am",
     "E",
     "E",
     "E",
     "E",
     "Am",
     "Am",
     "E",
     "Am",
     "Am",
     "E",
     "Am"
    ],
    "bars": 14
   },
   {
    "section": "Theme A middle phrase and return (repeat)",
    "chords": [
     "C",
     "G",
     "Am",
     "E",
     "E",
     "E",
     "E",
     "Am",
     "Am",
     "E",
     "Am",
     "Am",
     "E",
     "Am"
    ],
    "bars": 14
   },
   {
    "section": "Episode B (F major)",
    "chords": [
     "F",
     "C",
     "F",
     "C",
     "G7",
     "C",
     "G7",
     "C"
    ],
    "bars": 8
   },
   {
    "section": "Episode B (C major run)",
    "chords": [
     "C",
     "G7",
     "C"
    ],
    "bars": 3
   },
   {
    "section": "Link (dominant E, D-sharp trills)",
    "chords": [
     "E7"
    ],
    "bars": 4
   },
   {
    "section": "Theme A return",
    "chords": [
     "Am",
     "Am",
     "E",
     "Am",
     "Am",
     "Am",
     "E",
     "Am",
     "C",
     "G",
     "Am",
     "E",
     "E",
     "E",
     "E",
     "Am",
     "Am",
     "E",
     "Am",
     "Am",
     "E"
    ],
    "bars": 21
   },
   {
    "section": "Episode C (A pedal, D minor colour)",
    "chords": [
     "Dm/A",
     "Dm/A",
     "C#dim7",
     "Dm/A"
    ],
    "bars": 12
   },
   {
    "section": "Episode C climax (B-flat)",
    "chords": [
     "Bb",
     "Bb",
     "Bb",
     "A7",
     "A7",
     "A7"
    ],
    "bars": 6
   },
   {
    "section": "Arpeggio transition",
    "chords": [
     "Am",
     "Dm",
     "E7",
     "E7"
    ],
    "bars": 4
   },
   {
    "section": "Chromatic descent",
    "chords": [
     "E"
    ],
    "bars": 2
   },
   {
    "section": "Theme A (final)",
    "chords": [
     "Am",
     "Am",
     "E",
     "Am",
     "Am",
     "Am",
     "E",
     "Am",
     "C",
     "G",
     "Am",
     "E",
     "E",
     "E",
     "E",
     "Am",
     "Am",
     "E",
     "Am",
     "Am",
     "E"
    ],
    "bars": 21
   }
  ]
 },
 "Canon in D": {
  "status": "corrected",
  "key": "D major",
  "bpm": 50,
  "beatsPerBar": 4,
  "durationSec": 274,
  "chords": [
   "D",
   "A",
   "Bm",
   "F#m",
   "G",
   "D",
   "G",
   "A"
  ],
  "structure": [
   {
    "section": "Ground bass alone",
    "chords": [
     "D",
     "A",
     "Bm",
     "F#m",
     "G",
     "D",
     "G",
     "A"
    ],
    "per": 0.25,
    "bars": 2
   },
   {
    "section": "Violin entries (quarter-note theme)",
    "chords": [
     "D",
     "A",
     "Bm",
     "F#m",
     "G",
     "D",
     "G",
     "A"
    ],
    "per": 0.25,
    "bars": 6
   },
   {
    "section": "Eighth- and sixteenth-note variations",
    "chords": [
     "D",
     "A",
     "Bm",
     "F#m",
     "G",
     "D",
     "G",
     "A"
    ],
    "per": 0.25,
    "bars": 12
   },
   {
    "section": "Fast runs and leaping variations",
    "chords": [
     "D",
     "A",
     "Bm",
     "F#m",
     "G",
     "D",
     "G",
     "A"
    ],
    "per": 0.25,
    "bars": 16
   },
   {
    "section": "Lyrical and repeated-note variations",
    "chords": [
     "D",
     "A",
     "Bm",
     "F#m",
     "G",
     "D",
     "G",
     "A"
    ],
    "per": 0.25,
    "bars": 20
   },
   {
    "section": "Final chord",
    "chords": [
     "D"
    ],
    "bars": 1
   }
  ]
 },
 "Symphony No. 5 (Theme)": {
  "status": "corrected",
  "key": "C minor",
  "capoNote": "Optional: capo 3, Am shapes",
  "bpm": 170,
  "beatsPerBar": 2,
  "durationSec": 442,
  "chords": [
   "Cm",
   "Fm",
   "G7",
   "Cm"
  ],
  "structure": [
   {
    "section": "Motto (opening)",
    "chords": [
     "Cm",
     "Cm",
     "G",
     "G",
     "G"
    ],
    "bars": 5
   },
   {
    "section": "First theme (C minor)",
    "chords": [
     "Cm",
     "Cm",
     "Cm",
     "Cm",
     "G7",
     "G7",
     "G7",
     "G7"
    ],
    "bars": 19
   },
   {
    "section": "Transition (to E-flat)",
    "chords": [
     "Cm",
     "Ab",
     "Fm",
     "Bb7"
    ],
    "per": 2,
    "bars": 34
   },
   {
    "section": "Horn call (E-flat)",
    "chords": [
     "Bb7",
     "Bb7",
     "Eb",
     "Eb"
    ],
    "bars": 4
   },
   {
    "section": "Second theme (E-flat major)",
    "chords": [
     "Eb",
     "Bb7",
     "Eb",
     "Ab",
     "Eb",
     "Bb7"
    ],
    "per": 2,
    "bars": 31
   },
   {
    "section": "Closing (E-flat major)",
    "chords": [
     "Eb",
     "Ab",
     "Bb7",
     "Eb"
    ],
    "per": 2,
    "bars": 31
   },
   {
    "section": "Motto (opening) (exposition repeat)",
    "chords": [
     "Cm",
     "Cm",
     "G",
     "G",
     "G"
    ],
    "bars": 5
   },
   {
    "section": "First theme (C minor) (exposition repeat)",
    "chords": [
     "Cm",
     "Cm",
     "Cm",
     "Cm",
     "G7",
     "G7",
     "G7",
     "G7"
    ],
    "bars": 19
   },
   {
    "section": "Transition (to E-flat) (exposition repeat)",
    "chords": [
     "Cm",
     "Ab",
     "Fm",
     "Bb7"
    ],
    "per": 2,
    "bars": 34
   },
   {
    "section": "Horn call (E-flat) (exposition repeat)",
    "chords": [
     "Bb7",
     "Bb7",
     "Eb",
     "Eb"
    ],
    "bars": 4
   },
   {
    "section": "Second theme (E-flat major) (exposition repeat)",
    "chords": [
     "Eb",
     "Bb7",
     "Eb",
     "Ab",
     "Eb",
     "Bb7"
    ],
    "per": 2,
    "bars": 31
   },
   {
    "section": "Closing (E-flat major) (exposition repeat)",
    "chords": [
     "Eb",
     "Ab",
     "Bb7",
     "Eb"
    ],
    "per": 2,
    "bars": 31
   },
   {
    "section": "Development (motto in F minor)",
    "chords": [
     "Fm",
     "C7",
     "Fm",
     "Bbm",
     "G7",
     "Cm"
    ],
    "per": 2,
    "bars": 55
   },
   {
    "section": "Development (horn-call fragments, block chords)",
    "chords": [
     "Bbm",
     "Bbm",
     "Gb",
     "Gb",
     "F#m",
     "F#m",
     "G7",
     "G7"
    ],
    "per": 2,
    "bars": 68
   },
   {
    "section": "Recapitulation (first theme)",
    "chords": [
     "Cm",
     "Cm",
     "Fm",
     "G7"
    ],
    "per": 2,
    "bars": 20
   },
   {
    "section": "Oboe cadenza",
    "chords": [
     "G"
    ],
    "bars": 1
   },
   {
    "section": "Transition",
    "chords": [
     "Cm",
     "Ab",
     "Fm",
     "G7"
    ],
    "per": 2,
    "bars": 34
   },
   {
    "section": "Horn call (bassoons, C major)",
    "chords": [
     "G7",
     "G7",
     "C",
     "C"
    ],
    "bars": 4
   },
   {
    "section": "Second theme in C major",
    "chords": [
     "C",
     "G7",
     "C",
     "F",
     "C",
     "G7"
    ],
    "per": 2,
    "bars": 39
   },
   {
    "section": "Closing (C major)",
    "chords": [
     "C",
     "F",
     "G7",
     "C"
    ],
    "per": 2,
    "bars": 28
   },
   {
    "section": "Coda",
    "chords": [
     "Cm",
     "Fm",
     "G7",
     "Cm"
    ],
    "per": 2,
    "bars": 129
   }
  ]
 },
 "Morning Mood": {
  "status": "uncertain",
  "key": "E major",
  "bpm": 44,
  "beatsPerBar": 2,
  "durationSec": 237,
  "chords": [
   "E",
   "C#m",
   "A",
   "B"
  ],
  "structure": [
   {
    "section": "Theme (flute, then oboe, E major)",
    "chords": [
     "E",
     "E",
     "C#m",
     "B"
    ],
    "per": 2,
    "bars": 8
   },
   {
    "section": "Theme in G-sharp major",
    "chords": [
     "G#",
     "G#",
     "D#7",
     "G#"
    ],
    "per": 2,
    "bars": 8
   },
   {
    "section": "Modulation (building)",
    "chords": [
     "B",
     "B",
     "C",
     "B7"
    ],
    "bars": 4
   },
   {
    "section": "Climax (full orchestra, E major)",
    "chords": [
     "E",
     "E",
     "A",
     "B7"
    ],
    "per": 2,
    "bars": 8
   },
   {
    "section": "Strings continuation",
    "chords": [
     "E",
     "C#m",
     "A",
     "B7"
    ],
    "per": 2,
    "bars": 8
   },
   {
    "section": "Middle section (cellos, darker keys)",
    "chords": [
     "B",
     "B",
     "Em",
     "Em",
     "G",
     "G",
     "B7",
     "B7"
    ],
    "per": 2,
    "bars": 20
   },
   {
    "section": "Return of theme (horns, then flute)",
    "chords": [
     "E",
     "E",
     "C#m",
     "B"
    ],
    "per": 2,
    "bars": 16
   },
   {
    "section": "Coda (fading, trills)",
    "chords": [
     "E",
     "A",
     "E",
     "E"
    ],
    "per": 2,
    "bars": 15
   }
  ]
 },
 "Moonlight Sonata (3rd Movement)": {
  "status": "corrected",
  "key": "C# minor",
  "capoNote": "Optional: capo 4, Am shapes",
  "bpm": 152,
  "beatsPerBar": 4,
  "durationSec": 417,
  "chords": [
   "C#m",
   "G#",
   "F#m/A",
   "G#"
  ],
  "structure": [
   {
    "section": "First theme (arpeggios)",
    "chords": [
     "C#m",
     "G#",
     "C#7/B",
     "F#m/A",
     "G#",
     "G#",
     "G#",
     "G#"
    ],
    "bars": 8
   },
   {
    "section": "First theme (sforzando chords)",
    "chords": [
     "G#"
    ],
    "bars": 6
   },
   {
    "section": "Transition",
    "chords": [
     "C#m",
     "D#7",
     "G#m",
     "D#7"
    ],
    "bars": 6
   },
   {
    "section": "Second theme (G-sharp minor)",
    "chords": [
     "G#m",
     "D#7",
     "G#m",
     "D#7"
    ],
    "bars": 22
   },
   {
    "section": "Closing theme",
    "chords": [
     "G#m",
     "D#7",
     "G#m",
     "D#7"
    ],
    "bars": 14
   },
   {
    "section": "Codetta",
    "chords": [
     "G#m",
     "C#m",
     "D#7",
     "G#m"
    ],
    "bars": 8
   },
   {
    "section": "First theme (arpeggios) (exposition repeat)",
    "chords": [
     "C#m",
     "G#",
     "C#7/B",
     "F#m/A",
     "G#",
     "G#",
     "G#",
     "G#"
    ],
    "bars": 8
   },
   {
    "section": "First theme (sforzando chords) (exposition repeat)",
    "chords": [
     "G#"
    ],
    "bars": 6
   },
   {
    "section": "Transition (exposition repeat)",
    "chords": [
     "C#m",
     "D#7",
     "G#m",
     "D#7"
    ],
    "bars": 6
   },
   {
    "section": "Second theme (G-sharp minor) (exposition repeat)",
    "chords": [
     "G#m",
     "D#7",
     "G#m",
     "D#7"
    ],
    "bars": 22
   },
   {
    "section": "Closing theme (exposition repeat)",
    "chords": [
     "G#m",
     "D#7",
     "G#m",
     "D#7"
    ],
    "bars": 14
   },
   {
    "section": "Codetta (exposition repeat)",
    "chords": [
     "G#m",
     "C#m",
     "D#7",
     "G#m"
    ],
    "bars": 8
   },
   {
    "section": "Development (F-sharp minor)",
    "chords": [
     "C#7",
     "F#m",
     "G#7",
     "C#m"
    ],
    "bars": 23
   },
   {
    "section": "Dominant pedal (retransition)",
    "chords": [
     "G#7"
    ],
    "bars": 14
   },
   {
    "section": "Recapitulation (first theme)",
    "chords": [
     "C#m",
     "G#",
     "C#7/B",
     "F#m/A",
     "G#",
     "G#",
     "G#",
     "G#",
     "G#",
     "G#",
     "G#",
     "G#",
     "G#",
     "G#"
    ],
    "bars": 14
   },
   {
    "section": "Second theme (C-sharp minor)",
    "chords": [
     "C#m",
     "G#7",
     "C#m",
     "G#7"
    ],
    "bars": 21
   },
   {
    "section": "Closing theme (C-sharp minor)",
    "chords": [
     "C#m",
     "G#7",
     "C#m",
     "G#7"
    ],
    "bars": 21
   },
   {
    "section": "Coda",
    "chords": [
     "C#m",
     "F#m",
     "G#7",
     "C#m"
    ],
    "bars": 28
   },
   {
    "section": "Cadenza and Adagio",
    "chords": [
     "G#7"
    ],
    "bars": 4
   },
   {
    "section": "Final arpeggios and chords",
    "chords": [
     "C#m",
     "G#7",
     "C#m",
     "C#m"
    ],
    "bars": 11
   }
  ]
 },
 "La Campanella": {
  "status": "uncertain",
  "key": "G# minor",
  "capoNote": "Optional: capo 4, Em shapes",
  "bpm": 58,
  "beatsPerBar": 2,
  "durationSec": 281,
  "chords": [
   "G#m",
   "D#7",
   "C#m",
   "D#7"
  ],
  "structure": [
   {
    "section": "Intro (D-sharp octaves)",
    "chords": [
     "D#7"
    ],
    "bars": 4
   },
   {
    "section": "Theme",
    "chords": [
     "G#m",
     "D#7",
     "G#m",
     "D#7",
     "G#m",
     "C#m",
     "D#7",
     "G#m"
    ],
    "per": 2,
    "bars": 16
   },
   {
    "section": "Episode (B major)",
    "chords": [
     "B",
     "F#7",
     "B",
     "F#7",
     "B",
     "E",
     "D#7",
     "D#7"
    ],
    "per": 2,
    "bars": 16
   },
   {
    "section": "Theme return",
    "chords": [
     "G#m",
     "D#7",
     "G#m",
     "D#7"
    ],
    "per": 2,
    "bars": 8
   },
   {
    "section": "Variation 1 (trills, repeated notes)",
    "chords": [
     "G#m",
     "D#7",
     "G#m",
     "D#7",
     "G#m",
     "C#m",
     "D#7",
     "G#m"
    ],
    "per": 2,
    "bars": 16
   },
   {
    "section": "Episode (B major)",
    "chords": [
     "B",
     "F#7",
     "B",
     "F#7",
     "B",
     "E",
     "D#7",
     "D#7"
    ],
    "bars": 8
   },
   {
    "section": "Variation 2 (chromatic runs)",
    "chords": [
     "G#m",
     "D#7",
     "G#m",
     "D#7",
     "G#m",
     "C#m",
     "D#7",
     "G#m"
    ],
    "per": 2,
    "bars": 16
   },
   {
    "section": "Episode (B major)",
    "chords": [
     "B",
     "F#7",
     "B",
     "F#7",
     "B",
     "E",
     "D#7",
     "D#7"
    ],
    "bars": 8
   },
   {
    "section": "Variation 3 (wide leaps)",
    "chords": [
     "G#m",
     "D#7",
     "G#m",
     "D#7",
     "G#m",
     "C#m",
     "D#7",
     "G#m"
    ],
    "per": 2,
    "bars": 16
   },
   {
    "section": "Coda (climax)",
    "chords": [
     "G#m",
     "C#m",
     "D#7",
     "G#m"
    ],
    "per": 2,
    "bars": 28
   }
  ]
 },
 "Fantaisie-Impromptu": {
  "status": "uncertain",
  "key": "C# minor",
  "capoNote": "Optional: capo 4, Am shapes (capo 1, C shapes for the D-flat section)",
  "bpm": 56,
  "beatsPerBar": 2,
  "durationSec": 296,
  "chords": [
   "C#m",
   "C#m",
   "G#7",
   "C#m"
  ],
  "structure": [
   {
    "section": "Intro (G-sharp octave, left-hand arpeggios)",
    "chords": [
     "G#",
     "C#m",
     "C#m",
     "C#m"
    ],
    "bars": 4
   },
   {
    "section": "A (Allegro agitato)",
    "chords": [
     "C#m",
     "C#m",
     "G#7",
     "C#m",
     "C#m",
     "D#dim7",
     "G#7",
     "C#m"
    ],
    "bars": 20
   },
   {
    "section": "A second part (E major colour)",
    "chords": [
     "E",
     "B7",
     "E",
     "E",
     "F#m",
     "G#7",
     "C#m",
     "G#7"
    ],
    "bars": 16
   },
   {
    "section": "Transition (Largo)",
    "chords": [
     "Ab7"
    ],
    "bars": 2
   },
   {
    "section": "B (Moderato cantabile, D-flat major)",
    "chords": [
     "Db",
     "Bbm",
     "Ebm7",
     "Ab7",
     "Db",
     "Gb",
     "Ab7",
     "Db"
    ],
    "per": 2,
    "bars": 16
   },
   {
    "section": "B middle strain",
    "chords": [
     "Ebm",
     "Bbm",
     "Ab7",
     "Db"
    ],
    "per": 2,
    "bars": 8
   },
   {
    "section": "B return",
    "chords": [
     "Db",
     "Bbm",
     "Ebm7",
     "Ab7",
     "Db",
     "Gb",
     "Ab7",
     "Db"
    ],
    "per": 2,
    "bars": 16
   },
   {
    "section": "A return (Presto)",
    "chords": [
     "C#m",
     "C#m",
     "G#7",
     "C#m",
     "C#m",
     "D#dim7",
     "G#7",
     "C#m"
    ],
    "bars": 36
   },
   {
    "section": "Coda (B melody in the bass)",
    "chords": [
     "C#m",
     "G#7"
    ],
    "bars": 10
   },
   {
    "section": "Ending (C-sharp major)",
    "chords": [
     "C#"
    ],
    "bars": 10
   }
  ]
 },
 "Piano Concerto No. 2": {
  "status": "uncertain",
  "key": "C minor",
  "capoNote": "Optional: capo 3, Am shapes",
  "bpm": 80,
  "beatsPerBar": 4,
  "durationSec": 678,
  "chords": [
   "Cm",
   "Ab",
   "Fm",
   "G7"
  ],
  "structure": [
   {
    "section": "Intro (piano bell chords)",
    "chords": [
     "Fm",
     "Fm",
     "Fm",
     "Fm",
     "Fm",
     "Fm",
     "G",
     "G"
    ],
    "bars": 8
   },
   {
    "section": "First theme (C minor, strings)",
    "chords": [
     "Cm",
     "Cm",
     "Ab",
     "Ab",
     "Fm",
     "Fm",
     "G7",
     "G7"
    ],
    "bars": 32
   },
   {
    "section": "Transition",
    "chords": [
     "Fm",
     "Bb7",
     "Eb",
     "Cm"
    ],
    "bars": 16
   },
   {
    "section": "Second theme (E-flat major, piano)",
    "chords": [
     "Eb",
     "Ab",
     "Eb/Bb",
     "Bb7"
    ],
    "per": 2,
    "bars": 30
   },
   {
    "section": "Development",
    "chords": [
     "Fm",
     "Cm",
     "Ab",
     "G7"
    ],
    "per": 2,
    "bars": 72
   },
   {
    "section": "Recapitulation (march)",
    "chords": [
     "Cm",
     "Ab",
     "Fm",
     "G7"
    ],
    "per": 2,
    "bars": 24
   },
   {
    "section": "Second theme (A-flat major, horn)",
    "chords": [
     "Ab",
     "Db",
     "Eb7",
     "Ab"
    ],
    "per": 2,
    "bars": 24
   },
   {
    "section": "Coda (Meno mosso)",
    "chords": [
     "Cm",
     "Fm",
     "G7",
     "Cm"
    ],
    "per": 2,
    "bars": 20
   }
  ]
 },
 "Chasse-Neige": {
  "status": "uncertain",
  "key": "Bb minor",
  "capoNote": "Optional: capo 1, Am shapes",
  "bpm": 66,
  "beatsPerBar": 4,
  "durationSec": 320,
  "chords": [
   "Bbm",
   "Gb",
   "Ebm",
   "F7"
  ],
  "structure": [
   {
    "section": "Intro (tremolo)",
    "chords": [
     "Bbm"
    ],
    "bars": 4
   },
   {
    "section": "Theme",
    "chords": [
     "Bbm",
     "Gb",
     "Ebm",
     "F7"
    ],
    "bars": 16
   },
   {
    "section": "Theme continued",
    "chords": [
     "Bbm",
     "Ebm",
     "F7",
     "Bbm"
    ],
    "bars": 12
   },
   {
    "section": "Development (rising chromatic tremolos)",
    "chords": [
     "Gb",
     "Ebm",
     "F7",
     "Bbm"
    ],
    "bars": 24
   },
   {
    "section": "Climax",
    "chords": [
     "Bbm",
     "Gb",
     "Ebm",
     "F7"
    ],
    "bars": 16
   },
   {
    "section": "Coda",
    "chords": [
     "Bbm",
     "Ebm",
     "F7",
     "Bbm"
    ],
    "bars": 16
   }
  ]
 },
 "Clair de Lune": {
  "status": "corrected",
  "key": "Db major",
  "capoNote": "Optional: capo 1, C shapes",
  "bpm": 43,
  "beatsPerBar": 3,
  "durationSec": 301,
  "chords": [
   "Db",
   "Fm",
   "E/G#",
   "Ebm7",
   "Ab7"
  ],
  "structure": [
   {
    "section": "A (opening)",
    "chords": [
     "Db",
     "Db",
     "Dbm",
     "Dbm",
     "Bbm",
     "Bbm",
     "Bbm",
     "Bbm"
    ],
    "bars": 8
   },
   {
    "section": "A continued",
    "chords": [
     "Bbm",
     "Gbmaj7"
    ],
    "per": 3,
    "bars": 6
   },
   {
    "section": "Build (tempo rubato)",
    "chords": [
     "Ebm7",
     "Ab7",
     "Ab7"
    ],
    "bars": 12
   },
   {
    "section": "B (Un poco mosso)",
    "chords": [
     "Db",
     "Db",
     "Fm",
     "E/G#",
     "Ebm7",
     "Ebm7",
     "Abaug",
     "Ab7"
    ],
    "bars": 8
   },
   {
    "section": "B variant (En animant)",
    "chords": [
     "Db",
     "Fm",
     "C#m",
     "F#m7"
    ],
    "bars": 8
   },
   {
    "section": "Climax and Calmato",
    "chords": [
     "Ab7",
     "Ab7",
     "Gb6",
     "Gb6",
     "Gbm6",
     "Gbm6",
     "Ab7",
     "Ab7"
    ],
    "bars": 8
   },
   {
    "section": "A return",
    "chords": [
     "Db",
     "Db",
     "Dbm",
     "Dbm",
     "Bbm",
     "Bbm",
     "Bbm",
     "Bbm"
    ],
    "bars": 8
   },
   {
    "section": "A continued",
    "chords": [
     "Db7",
     "Db7",
     "Db7",
     "Gb",
     "Gb",
     "Gb",
     "Ab7"
    ],
    "bars": 7
   },
   {
    "section": "Coda (Morendo)",
    "chords": [
     "Db",
     "Fm",
     "E/G#",
     "Db",
     "Db",
     "Db",
     "Db"
    ],
    "bars": 7
   }
  ]
 },
 "Nocturne in E-flat Major, Op. 9 No. 2": {
  "status": "corrected",
  "key": "Eb major",
  "capoNote": "Optional: capo 1, D shapes",
  "bpm": 32,
  "beatsPerBar": 4,
  "durationSec": 255,
  "chords": [
   "Eb",
   "Bb7",
   "Ab",
   "Fm",
   "Bb7"
  ],
  "structure": [
   {
    "section": "A",
    "chords": [
     "Eb",
     "Bb7",
     "Eb",
     "Eb7",
     "Ab",
     "Fm",
     "Bb7",
     "Eb"
    ],
    "per": 0.5,
    "bars": 4
   },
   {
    "section": "A (repeat)",
    "chords": [
     "Eb",
     "Bb7",
     "Eb",
     "Eb7",
     "Ab",
     "Fm",
     "Bb7",
     "Eb"
    ],
    "per": 0.5,
    "bars": 4
   },
   {
    "section": "B (B-flat major)",
    "chords": [
     "Bb",
     "F7",
     "Gm",
     "Cm",
     "F7",
     "Bb",
     "Bb7",
     "Bb7"
    ],
    "per": 0.5,
    "bars": 4
   },
   {
    "section": "A (ornamented)",
    "chords": [
     "Eb",
     "Bb7",
     "Eb",
     "Eb7",
     "Ab",
     "Fm",
     "Bb7",
     "Eb"
    ],
    "per": 0.5,
    "bars": 4
   },
   {
    "section": "B (ornamented)",
    "chords": [
     "Bb",
     "F7",
     "Gm",
     "Cm",
     "F7",
     "Bb",
     "Bb7",
     "Bb7"
    ],
    "per": 0.5,
    "bars": 4
   },
   {
    "section": "A (more ornamented)",
    "chords": [
     "Eb",
     "Bb7",
     "Eb",
     "Eb7",
     "Ab",
     "Fm",
     "Bb7",
     "Eb"
    ],
    "per": 0.5,
    "bars": 4
   },
   {
    "section": "C (climax)",
    "chords": [
     "Cm",
     "Gm",
     "F7",
     "Bb7",
     "Eb",
     "Bb7"
    ],
    "bars": 6
   },
   {
    "section": "Cadenza and final cadence",
    "chords": [
     "Eb",
     "Ab",
     "Bb7",
     "Eb"
    ],
    "bars": 4
   }
  ]
 },
 "Rondo alla Turca": {
  "status": "corrected",
  "key": "A minor",
  "bpm": 120,
  "beatsPerBar": 2,
  "durationSec": 199,
  "chords": [
   "Am",
   "E",
   "C",
   "G"
  ],
  "structure": [
   {
    "section": "A theme (A minor)",
    "chords": [
     "Am",
     "Am",
     "Am",
     "E",
     "Am",
     "Am",
     "E",
     "Am"
    ],
    "bars": 8
   },
   {
    "section": "A theme (repeat)",
    "chords": [
     "Am",
     "Am",
     "Am",
     "E",
     "Am",
     "Am",
     "E",
     "Am"
    ],
    "bars": 8
   },
   {
    "section": "A middle (C major) and return",
    "chords": [
     "C",
     "G",
     "C",
     "G",
     "C",
     "G",
     "C",
     "E",
     "Am",
     "Am",
     "Am",
     "E",
     "Am",
     "Am",
     "E",
     "Am"
    ],
    "bars": 16
   },
   {
    "section": "A middle and return (repeat)",
    "chords": [
     "C",
     "G",
     "C",
     "G",
     "C",
     "G",
     "C",
     "E",
     "Am",
     "Am",
     "Am",
     "E",
     "Am",
     "Am",
     "E",
     "Am"
    ],
    "bars": 16
   },
   {
    "section": "Refrain (A major march)",
    "chords": [
     "A",
     "A",
     "D",
     "E",
     "A",
     "D",
     "E7",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Episode (F-sharp minor)",
    "chords": [
     "F#m",
     "F#m",
     "C#",
     "F#m",
     "F#m",
     "Bm",
     "C#",
     "F#m"
    ],
    "bars": 8
   },
   {
    "section": "Episode (F-sharp minor, repeat)",
    "chords": [
     "F#m",
     "F#m",
     "C#",
     "F#m",
     "F#m",
     "Bm",
     "C#",
     "F#m"
    ],
    "bars": 8
   },
   {
    "section": "Episode (A major, running sixteenths)",
    "chords": [
     "A",
     "E",
     "A",
     "E",
     "A",
     "D",
     "E",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Episode (F-sharp minor return)",
    "chords": [
     "F#m",
     "C#",
     "F#m",
     "F#7",
     "Bm",
     "F#m",
     "C#7",
     "F#m"
    ],
    "bars": 8
   },
   {
    "section": "Episode (A major, repeat)",
    "chords": [
     "A",
     "E",
     "A",
     "E",
     "A",
     "D",
     "E",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Episode (F-sharp minor return, repeat)",
    "chords": [
     "F#m",
     "C#",
     "F#m",
     "F#7",
     "Bm",
     "F#m",
     "C#7",
     "F#m"
    ],
    "bars": 8
   },
   {
    "section": "Refrain (A major march)",
    "chords": [
     "A",
     "A",
     "D",
     "E",
     "A",
     "D",
     "E7",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "A theme return",
    "chords": [
     "Am",
     "Am",
     "Am",
     "E",
     "Am",
     "Am",
     "E",
     "Am"
    ],
    "bars": 8
   },
   {
    "section": "A theme return (repeat)",
    "chords": [
     "Am",
     "Am",
     "Am",
     "E",
     "Am",
     "Am",
     "E",
     "Am"
    ],
    "bars": 8
   },
   {
    "section": "A middle and return",
    "chords": [
     "C",
     "G",
     "C",
     "G",
     "C",
     "G",
     "C",
     "E",
     "Am",
     "Am",
     "Am",
     "E",
     "Am",
     "Am",
     "E",
     "Am"
    ],
    "bars": 16
   },
   {
    "section": "A middle and return (repeat)",
    "chords": [
     "C",
     "G",
     "C",
     "G",
     "C",
     "G",
     "C",
     "E",
     "Am",
     "Am",
     "Am",
     "E",
     "Am",
     "Am",
     "E",
     "Am"
    ],
    "bars": 16
   },
   {
    "section": "Refrain (A major march)",
    "chords": [
     "A",
     "A",
     "D",
     "E",
     "A",
     "D",
     "E7",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Coda (A major)",
    "chords": [
     "A",
     "A",
     "D",
     "E7"
    ],
    "bars": 31
   }
  ]
 },
 "Revolutionary Étude": {
  "status": "corrected",
  "key": "C minor",
  "capoNote": "Optional: capo 3, Am shapes",
  "bpm": 126,
  "beatsPerBar": 4,
  "durationSec": 160,
  "chords": [
   "Cm",
   "Fm",
   "G7",
   "Cm"
  ],
  "structure": [
   {
    "section": "Intro (descending runs on dominant ninth)",
    "chords": [
     "G7b9",
     "G7b9",
     "Bdim7",
     "G7"
    ],
    "bars": 10
   },
   {
    "section": "Theme",
    "chords": [
     "Cm",
     "Cm",
     "Cm",
     "G7",
     "Cm",
     "Fm",
     "G7",
     "Cm"
    ],
    "bars": 8
   },
   {
    "section": "Theme continued",
    "chords": [
     "Bb7",
     "Eb",
     "Ab",
     "Fm",
     "G7"
    ],
    "per": 2,
    "bars": 10
   },
   {
    "section": "Middle section",
    "chords": [
     "Fm",
     "Fm",
     "Bbm",
     "Bbm",
     "Eb7",
     "Eb7",
     "Ab",
     "Ab",
     "Dbmaj7",
     "G7",
     "G7"
    ],
    "bars": 22
   },
   {
    "section": "Intro return",
    "chords": [
     "G7b9",
     "G7b9",
     "Bdim7",
     "G7"
    ],
    "per": 2,
    "bars": 8
   },
   {
    "section": "Theme return",
    "chords": [
     "Cm",
     "Cm",
     "Fm",
     "G7",
     "Cm",
     "Cm"
    ],
    "per": 2,
    "bars": 12
   },
   {
    "section": "Coda (ends on C major)",
    "chords": [
     "Cm",
     "Ab",
     "Fm",
     "G7",
     "Cm",
     "Cm",
     "C"
    ],
    "per": 2,
    "bars": 14
   }
  ]
 },
 "Tennessee Whiskey": {
  "status": "corrected",
  "key": "A major",
  "bpm": 49,
  "beatsPerBar": 4,
  "durationSec": 293,
  "chords": [
   "A",
   "Bm"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "A",
     "Bm"
    ],
    "bars": 4
   },
   {
    "section": "Verse 1",
    "chords": [
     "A",
     "Bm"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "A",
     "Bm"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "A",
     "Bm"
    ],
    "bars": 8
   },
   {
    "section": "Guitar solo",
    "chords": [
     "A",
     "Bm"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "A",
     "Bm"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "A",
     "Bm"
    ],
    "bars": 8
   },
   {
    "section": "Outro",
    "chords": [
     "A",
     "Bm"
    ],
    "bars": 8
   }
  ],
  "solos": [
   {
    "section": "Guitar solo",
    "scale": "A major pentatonic (F# minor pentatonic box 1 at 2nd fret / A minor pentatonic box 1 at 5th fret for bluesy bends)",
    "tips": "Mix A major and A minor pentatonic: lean on C# over the A chord and on D/B over Bm. Play slowly with lots of space and wide vibrato - the 12/8 groove is very laid back.",
    "chords": [
     "A",
     "Bm"
    ]
   }
  ]
 },
 "Everything In Its Right Place": {
  "status": "corrected",
  "key": "C Phrygian (C, Db, Eb with F)",
  "bpm": 124,
  "beatsPerBar": 5,
  "durationSec": 251,
  "chords": [
   "C",
   "Dbmaj7",
   "Eb6",
   "F"
  ],
  "structure": [
   {
    "section": "Intro (keys)",
    "chords": [
     "C",
     "C",
     "Dbmaj7",
     "Eb6"
    ],
    "per": 0.5,
    "bars": 14
   },
   {
    "section": "Chorus",
    "chords": [
     "F",
     "C",
     "Dbmaj7",
     "Eb6"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Chorus tag",
    "chords": [
     "C",
     "C",
     "Dbmaj7",
     "Eb6"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "Dbmaj7",
     "Dbmaj7",
     "C",
     "Eb6"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "F",
     "C",
     "Dbmaj7",
     "Eb6"
    ],
    "per": 0.5,
    "bars": 6
   },
   {
    "section": "Chorus tag",
    "chords": [
     "C",
     "C",
     "Dbmaj7",
     "Eb6"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "Dbmaj7",
     "Dbmaj7",
     "C",
     "Eb6"
    ],
    "per": 0.5,
    "bars": 16
   },
   {
    "section": "Instrumental",
    "chords": [
     "F",
     "C",
     "Dbmaj7",
     "Eb6"
    ],
    "per": 0.5,
    "bars": 12
   },
   {
    "section": "Outro (fade)",
    "chords": [
     "C",
     "C",
     "Dbmaj7",
     "Eb6"
    ],
    "per": 0.5,
    "bars": 22
   }
  ]
 },
 "Pyramid Song": {
  "status": "corrected",
  "key": "F# major (F# Phrygian colour)",
  "bpm": 50,
  "beatsPerBar": 4,
  "durationSec": 289,
  "chords": [
   "F#",
   "Gmaj7",
   "A6",
   "Gmaj7"
  ],
  "structure": [
   {
    "section": "Intro (piano)",
    "chords": [
     "F#",
     "F#",
     "F#",
     "Gmaj7",
     "Gmaj7",
     "Gmaj7",
     "A6",
     "A6",
     "A6",
     "A6",
     "Gmaj7",
     "Gmaj7",
     "Gmaj7",
     "F#",
     "F#",
     "F#"
    ],
    "per": 0.125,
    "bars": 4
   },
   {
    "section": "Verse 1",
    "chords": [
     "F#",
     "F#",
     "F#",
     "Gmaj7",
     "Gmaj7",
     "Gmaj7",
     "A6",
     "A6",
     "A6",
     "A6",
     "Gmaj7",
     "Gmaj7",
     "Gmaj7",
     "F#",
     "F#",
     "F#"
    ],
    "per": 0.125,
    "bars": 8
   },
   {
    "section": "Verse 1 (second half)",
    "chords": [
     "F#m",
     "F#m",
     "F#m",
     "E9",
     "E9",
     "E9",
     "E9",
     "E9",
     "E9",
     "E9",
     "Gmaj7",
     "Gmaj7",
     "Gmaj7",
     "Gmaj7",
     "Gmaj7",
     "Gmaj7",
     "F#",
     "F#",
     "F#",
     "Gmaj7",
     "Gmaj7",
     "Gmaj7",
     "A6",
     "A6",
     "A6",
     "A6",
     "Gmaj7",
     "Gmaj7",
     "Gmaj7",
     "F#",
     "F#",
     "F#"
    ],
    "per": 0.125,
    "bars": 16
   },
   {
    "section": "Interlude (band enters)",
    "chords": [
     "F#",
     "F#",
     "F#",
     "Gmaj7",
     "Gmaj7",
     "Gmaj7",
     "A6",
     "A6",
     "A6",
     "A6",
     "Gmaj7",
     "Gmaj7",
     "Gmaj7",
     "F#",
     "F#",
     "F#"
    ],
    "per": 0.125,
    "bars": 6
   },
   {
    "section": "Verse 2",
    "chords": [
     "F#m",
     "F#m",
     "F#m",
     "E9",
     "E9",
     "E9",
     "E9",
     "E9",
     "E9",
     "E9",
     "Gmaj7",
     "Gmaj7",
     "Gmaj7",
     "Gmaj7",
     "Gmaj7",
     "Gmaj7",
     "F#",
     "F#",
     "F#",
     "Gmaj7",
     "Gmaj7",
     "Gmaj7",
     "A6",
     "A6",
     "A6",
     "A6",
     "Gmaj7",
     "Gmaj7",
     "Gmaj7",
     "F#",
     "F#",
     "F#"
    ],
    "per": 0.125,
    "bars": 12
   },
   {
    "section": "Bridge",
    "chords": [
     "F#m",
     "F#m",
     "F#m",
     "F#m",
     "F#m",
     "F#m",
     "Gmaj7",
     "Gmaj7",
     "Gmaj7",
     "Gmaj7",
     "Gmaj7",
     "Gmaj7",
     "F#",
     "F#",
     "F#",
     "F#"
    ],
    "per": 0.125,
    "bars": 6
   },
   {
    "section": "Outro",
    "chords": [
     "F#",
     "F#",
     "F#",
     "Gmaj7",
     "Gmaj7",
     "Gmaj7",
     "A6",
     "A6",
     "A6",
     "A6",
     "Gmaj7",
     "Gmaj7",
     "Gmaj7",
     "F#",
     "F#",
     "F#"
    ],
    "per": 0.125,
    "bars": 8
   }
  ]
 },
 "I Want It That Way": {
  "status": "corrected",
  "key": "A major (modulates up to B major for the last choruses)",
  "capoNote": "Capo 2, Em/C/G/D shapes (after the key change, F#m/D/E shapes)",
  "bpm": 99,
  "beatsPerBar": 4,
  "durationSec": 214,
  "chords": [
   "F#m",
   "D",
   "A",
   "E"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "F#m",
     "D",
     "A",
     "A"
    ],
    "bars": 4
   },
   {
    "section": "Verse 1",
    "chords": [
     "F#m",
     "D",
     "A",
     "F#m",
     "D",
     "A",
     "F#m",
     "F#m",
     "D",
     "A",
     "A",
     "A",
     "F#m",
     "E",
     "A",
     "A"
    ],
    "per": 0.5,
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "D",
     "D",
     "E",
     "F#m",
     "D",
     "D",
     "E",
     "F#m",
     "D",
     "E",
     "A",
     "A",
     "F#m",
     "E",
     "A",
     "A"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "F#m",
     "D",
     "A",
     "F#m",
     "D",
     "A",
     "F#m",
     "F#m",
     "D",
     "A",
     "A",
     "A",
     "F#m",
     "E",
     "A",
     "A"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "D",
     "D",
     "E",
     "F#m",
     "D",
     "D",
     "E",
     "F#m",
     "D",
     "E",
     "A",
     "A",
     "F#m",
     "E",
     "A",
     "A"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Chorus lead-out",
    "chords": [
     "F#m",
     "C#sus4",
     "C#",
     "C#"
    ],
    "per": 0.5,
    "bars": 2
   },
   {
    "section": "Bridge",
    "chords": [
     "F#m",
     "A/E",
     "D",
     "Bm",
     "F#m",
     "A/E",
     "D",
     "E"
    ],
    "bars": 8
   },
   {
    "section": "Instrumental",
    "chords": [
     "F#m",
     "D",
     "A",
     "A"
    ],
    "bars": 4
   },
   {
    "section": "Chorus (breakdown)",
    "chords": [
     "D",
     "E",
     "F#m",
     "F#m"
    ],
    "bars": 8
   },
   {
    "section": "Chorus (key change to B)",
    "chords": [
     "E",
     "E",
     "F#",
     "G#m",
     "E",
     "E",
     "F#",
     "G#m",
     "E",
     "F#",
     "B",
     "B",
     "G#m",
     "F#",
     "B",
     "B"
    ],
    "per": 0.5,
    "bars": 16
   },
   {
    "section": "Outro",
    "chords": [
     "E",
     "E",
     "F#",
     "G#m",
     "E",
     "E",
     "F#",
     "G#m",
     "E",
     "F#",
     "B",
     "B",
     "G#m",
     "F#",
     "B",
     "B"
    ],
    "per": 0.5,
    "bars": 8
   }
  ]
 },
 "Man! I Feel Like a Woman!": {
  "status": "corrected",
  "key": "Bb major (Bb Dorian riff verses, chorus centred on F)",
  "capoNote": "Capo 1, A-shape riff (A-D), G-A pre-chorus, E-C#m-A chorus",
  "bpm": 125,
  "beatsPerBar": 4,
  "durationSec": 234,
  "chords": [
   "F",
   "Dm",
   "Bb",
   "Gm7"
  ],
  "structure": [
   {
    "section": "Intro (spoken + riff)",
    "chords": [
     "Bb5",
     "Eb5"
    ],
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "Bb5",
     "Eb5"
    ],
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Ab",
     "Bb",
     "Gm7",
     "Bb"
    ],
    "per": 2,
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "F",
     "Dm",
     "Bb",
     "F",
     "Dm",
     "Bb",
     "Gm7",
     "Bb"
    ],
    "bars": 8
   },
   {
    "section": "Riff break",
    "chords": [
     "Bb5",
     "Eb5"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "Bb5",
     "Eb5"
    ],
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Ab",
     "Bb",
     "Gm7",
     "Bb"
    ],
    "per": 2,
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "F",
     "Dm",
     "Bb",
     "F",
     "Dm",
     "Bb",
     "Gm7",
     "Bb"
    ],
    "bars": 8
   },
   {
    "section": "Guitar solo",
    "chords": [
     "Ab",
     "Eb",
     "Bb",
     "Bb"
    ],
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Ab",
     "Bb",
     "Gm7",
     "Bb"
    ],
    "per": 2,
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "F",
     "Dm",
     "Bb",
     "F",
     "Dm",
     "Bb",
     "Gm7",
     "Bb"
    ],
    "bars": 8
   },
   {
    "section": "Outro (riff)",
    "chords": [
     "Bb5",
     "Eb5"
    ],
    "bars": 8
   }
  ],
  "solos": [
   {
    "section": "Guitar solo",
    "scale": "Bb major pentatonic around the 6th fret (Bb-C-D-F-G), adding Ab from Bb Mixolydian over the Ab chord",
    "tips": "Lean on the root of each chord as it changes (Ab, Eb, Bb). Use short bluesy bends and leave gaps; it is a country-rock break, not a shred solo.",
    "chords": [
     "Ab",
     "Eb",
     "Bb",
     "Bb"
    ]
   }
  ]
 },
 "Total Eclipse of the Heart": {
  "status": "corrected",
  "key": "Ab major (verses in Bb minor)",
  "bpm": 130,
  "beatsPerBar": 4,
  "durationSec": 270,
  "chords": [
   "Ab",
   "Fm",
   "Db",
   "Eb"
  ],
  "structure": [
   {
    "section": "Intro (piano)",
    "chords": [
     "Bbm"
    ],
    "bars": 4
   },
   {
    "section": "Verse 1",
    "chords": [
     "Bbm",
     "Ab"
    ],
    "per": 2,
    "bars": 16
   },
   {
    "section": "Verse 1 (lift)",
    "chords": [
     "Db",
     "B"
    ],
    "per": 2,
    "bars": 8
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "E",
     "A",
     "E",
     "A",
     "Ab",
     "Ab"
    ],
    "bars": 6
   },
   {
    "section": "Verse 2",
    "chords": [
     "Bbm",
     "Ab"
    ],
    "per": 2,
    "bars": 16
   },
   {
    "section": "Verse 2 (lift)",
    "chords": [
     "Db",
     "B"
    ],
    "per": 2,
    "bars": 8
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "E",
     "A",
     "E",
     "A",
     "Ab",
     "Ab"
    ],
    "bars": 6
   },
   {
    "section": "Pre-chorus 2",
    "chords": [
     "Fm",
     "Db",
     "Eb",
     "Ab",
     "Fm",
     "Db",
     "Eb",
     "Ab",
     "Fm",
     "Db",
     "Eb",
     "Db",
     "Eb",
     "Eb",
     "Eb",
     "Eb"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "Db/F",
     "Eb/G",
     "Fm",
     "Bb",
     "Ab",
     "Ab",
     "Db/F",
     "Eb/G",
     "Fm",
     "Bb",
     "Fm",
     "Ab",
     "Db",
     "Fm",
     "Eb",
     "Ab"
    ],
    "bars": 16
   },
   {
    "section": "Refrain",
    "chords": [
     "Fm",
     "Cm",
     "Db",
     "Bbm",
     "Eb",
     "Eb",
     "Ab",
     "Ab"
    ],
    "bars": 16
   },
   {
    "section": "Bridge",
    "chords": [
     "Bbm",
     "Ab"
    ],
    "per": 2,
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "Db/F",
     "Eb/G",
     "Fm",
     "Bb",
     "Ab",
     "Ab",
     "Db/F",
     "Eb/G",
     "Fm",
     "Bb",
     "Fm",
     "Ab",
     "Db",
     "Fm",
     "Eb",
     "Ab"
    ],
    "bars": 16
   },
   {
    "section": "Outro (fade)",
    "chords": [
     "Ab",
     "Fm",
     "C",
     "Db",
     "Bbm7",
     "Bbm7",
     "Eb",
     "Eb"
    ],
    "bars": 8
   }
  ]
 },
 "Take On Me": {
  "status": "corrected",
  "key": "A major (bridge in C# minor)",
  "bpm": 169,
  "beatsPerBar": 4,
  "durationSec": 225,
  "chords": [
   "A",
   "E/G#",
   "F#m",
   "D"
  ],
  "structure": [
   {
    "section": "Intro (synth riff)",
    "chords": [
     "Bm",
     "E",
     "A",
     "D",
     "Bm",
     "E",
     "D/F#",
     "E"
    ],
    "bars": 16
   },
   {
    "section": "Verse 1",
    "chords": [
     "Bm",
     "E",
     "A",
     "D",
     "Bm",
     "E",
     "A",
     "D",
     "Bm",
     "E",
     "F#m",
     "D",
     "Bm",
     "E",
     "F#m",
     "D"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "A",
     "E/G#",
     "F#m",
     "D",
     "A",
     "E/G#",
     "F#m",
     "D",
     "A",
     "E/G#",
     "F#m",
     "D",
     "A",
     "E",
     "D/F#",
     "E"
    ],
    "bars": 16
   },
   {
    "section": "Synth riff",
    "chords": [
     "Bm",
     "E",
     "A",
     "D",
     "Bm",
     "E",
     "D/F#",
     "E"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "Bm",
     "E",
     "A",
     "D",
     "Bm",
     "E",
     "A",
     "D",
     "Bm",
     "E",
     "F#m",
     "D",
     "Bm",
     "E",
     "F#m",
     "D"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "A",
     "E/G#",
     "F#m",
     "D",
     "A",
     "E/G#",
     "F#m",
     "D",
     "A",
     "E/G#",
     "F#m",
     "D",
     "A",
     "E",
     "D/F#",
     "E"
    ],
    "bars": 16
   },
   {
    "section": "Bridge",
    "chords": [
     "C#m",
     "G"
    ],
    "bars": 8
   },
   {
    "section": "Bridge build",
    "chords": [
     "Bm",
     "E"
    ],
    "bars": 4
   },
   {
    "section": "Synth riff",
    "chords": [
     "Bm",
     "E",
     "A",
     "D",
     "Bm",
     "E",
     "D/F#",
     "E"
    ],
    "bars": 8
   },
   {
    "section": "Verse 3",
    "chords": [
     "Bm",
     "E",
     "A",
     "D",
     "Bm",
     "E",
     "A",
     "D",
     "Bm",
     "E",
     "F#m",
     "D",
     "Bm",
     "E",
     "F#m",
     "D"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "A",
     "E/G#",
     "F#m",
     "D",
     "A",
     "E/G#",
     "F#m",
     "D",
     "A",
     "E/G#",
     "F#m",
     "D",
     "A",
     "E",
     "D/F#",
     "E"
    ],
    "bars": 16
   },
   {
    "section": "Outro (chorus fade)",
    "chords": [
     "A",
     "E/G#",
     "F#m",
     "D",
     "A",
     "E/G#",
     "F#m",
     "D",
     "A",
     "E/G#",
     "F#m",
     "D",
     "A",
     "E",
     "D/F#",
     "E"
    ],
    "bars": 16
   }
  ]
 },
 "Like a Prayer": {
  "status": "corrected",
  "key": "F major (intro and bridge in D minor)",
  "bpm": 111,
  "beatsPerBar": 4,
  "durationSec": 343,
  "chords": [
   "F",
   "C",
   "Bb",
   "F/A",
   "Dm"
  ],
  "structure": [
   {
    "section": "Intro (guitar, choir, rubato)",
    "chords": [
     "Dm",
     "C",
     "Gm",
     "Dm",
     "Dm",
     "C",
     "Gm",
     "F",
     "Bb",
     "F",
     "C",
     "Dm"
    ],
    "per": 2,
    "bars": 24
   },
   {
    "section": "Chorus",
    "chords": [
     "F",
     "C",
     "Bb",
     "F/A",
     "Dm",
     "C",
     "F",
     "F"
    ],
    "bars": 16
   },
   {
    "section": "Verse 1",
    "chords": [
     "Bb",
     "F",
     "C",
     "Dm",
     "Bb",
     "F",
     "C",
     "C"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "F",
     "C",
     "Bb",
     "F/A",
     "Dm",
     "C",
     "F",
     "F"
    ],
    "bars": 16
   },
   {
    "section": "Verse 2",
    "chords": [
     "Bb",
     "F",
     "C",
     "Dm",
     "Bb",
     "F",
     "C",
     "C"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "F",
     "C",
     "Bb",
     "F/A",
     "Dm",
     "C",
     "F",
     "F"
    ],
    "bars": 16
   },
   {
    "section": "Bridge (gospel groove)",
    "chords": [
     "Dm",
     "Gm/D"
    ],
    "bars": 24
   },
   {
    "section": "Outro (choir)",
    "chords": [
     "F",
     "C",
     "Bb",
     "Am7",
     "Gm",
     "Gm"
    ],
    "bars": 32
   }
  ]
 },
 "Valerie": {
  "status": "corrected",
  "key": "Eb major",
  "capoNote": "Capo 3, Cmaj7-Dm7 / F-Em-G shapes",
  "bpm": 106,
  "beatsPerBar": 4,
  "durationSec": 219,
  "chords": [
   "Ebmaj7",
   "Fm7",
   "Ab",
   "Gm"
  ],
  "structure": [
   {
    "section": "Intro (drums, then band)",
    "chords": [
     "Ebmaj7",
     "Fm7"
    ],
    "bars": 4
   },
   {
    "section": "Verse 1",
    "chords": [
     "Ebmaj7",
     "Fm7"
    ],
    "bars": 8
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Ab",
     "Gm",
     "Ab",
     "Gm",
     "Ab",
     "Gm",
     "Bb",
     "Bb"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "Ebmaj7",
     "Fm7"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "Ebmaj7",
     "Fm7"
    ],
    "bars": 8
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Ab",
     "Gm",
     "Ab",
     "Gm",
     "Ab",
     "Gm",
     "Bb",
     "Bb"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "Ebmaj7",
     "Fm7"
    ],
    "bars": 8
   },
   {
    "section": "Verse 3 (breakdown)",
    "chords": [
     "Ebmaj7",
     "Fm7"
    ],
    "bars": 8
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Ab",
     "Gm",
     "Ab",
     "Gm",
     "Ab",
     "Gm",
     "Bb",
     "Bb"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "Ebmaj7",
     "Fm7"
    ],
    "bars": 8
   },
   {
    "section": "Outro (chorus repeat)",
    "chords": [
     "Ebmaj7",
     "Fm7"
    ],
    "bars": 20
   }
  ]
 },
 "Before He Cheats": {
  "status": "corrected",
  "key": "F# minor (bridge leans to A major)",
  "bpm": 148,
  "beatsPerBar": 4,
  "durationSec": 200,
  "chords": [
   "F#m",
   "E",
   "D",
   "C#"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "F#m",
     "E",
     "D",
     "E",
     "F#m",
     "E",
     "D",
     "C#"
    ],
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "F#m",
     "E",
     "D",
     "C#7",
     "F#m",
     "E",
     "D",
     "C#7",
     "F#m",
     "E",
     "D",
     "C#7",
     "F#m",
     "E",
     "B7",
     "C#"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "D",
     "D",
     "F#m",
     "F#m",
     "D",
     "D",
     "C#",
     "C#",
     "D",
     "D",
     "F#m",
     "F#m",
     "D",
     "D",
     "F#",
     "F#"
    ],
    "bars": 16
   },
   {
    "section": "Interlude",
    "chords": [
     "F#m",
     "E",
     "D",
     "C#"
    ],
    "bars": 4
   },
   {
    "section": "Verse 2",
    "chords": [
     "F#m",
     "E",
     "D",
     "C#7",
     "F#m",
     "E",
     "D",
     "C#7",
     "F#m",
     "E",
     "D",
     "C#7",
     "F#m",
     "E",
     "B7",
     "C#"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "D",
     "D",
     "F#m",
     "F#m",
     "D",
     "D",
     "C#",
     "C#",
     "D",
     "D",
     "F#m",
     "F#m",
     "D",
     "D",
     "F#",
     "F#"
    ],
    "bars": 16
   },
   {
    "section": "Bridge",
    "chords": [
     "A",
     "E",
     "D",
     "E",
     "A",
     "E",
     "D",
     "C#"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "D",
     "D",
     "F#m",
     "F#m",
     "D",
     "D",
     "C#",
     "C#",
     "D",
     "D",
     "F#m",
     "F#m",
     "D",
     "D",
     "F#",
     "F#"
    ],
    "bars": 16
   },
   {
    "section": "Chorus tag",
    "chords": [
     "D",
     "D",
     "F#m",
     "F#m"
    ],
    "bars": 8
   },
   {
    "section": "Outro",
    "chords": [
     "A",
     "E",
     "F#m",
     "E"
    ],
    "bars": 8
   }
  ]
 },
 "Pata Pata": {
  "status": "corrected",
  "key": "Eb major",
  "capoNote": "Capo 1, D-G-D-A shapes",
  "bpm": 125,
  "beatsPerBar": 4,
  "durationSec": 204,
  "chords": [
   "Eb",
   "Ab",
   "Eb",
   "Bb"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "Eb",
     "Ab",
     "Eb",
     "Bb"
    ],
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "Eb",
     "Ab",
     "Eb",
     "Bb"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "Eb",
     "Ab",
     "Eb",
     "Bb"
    ],
    "bars": 16
   },
   {
    "section": "Spoken section",
    "chords": [
     "Eb",
     "Ab",
     "Eb",
     "Bb"
    ],
    "bars": 16
   },
   {
    "section": "Verse 2",
    "chords": [
     "Eb",
     "Ab",
     "Eb",
     "Bb"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "Eb",
     "Ab",
     "Eb",
     "Bb"
    ],
    "bars": 16
   },
   {
    "section": "Instrumental",
    "chords": [
     "Eb",
     "Ab",
     "Eb",
     "Bb"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "Eb",
     "Ab",
     "Eb",
     "Bb"
    ],
    "bars": 8
   },
   {
    "section": "Outro",
    "chords": [
     "Eb",
     "Ab",
     "Eb",
     "Bb",
     "Eb",
     "Eb",
     "Eb",
     "Eb"
    ],
    "bars": 4
   }
  ]
 },
 "Hava Nagila": {
  "status": "uncertain",
  "key": "E Phrygian dominant (A harmonic minor)",
  "bpm": 120,
  "beatsPerBar": 4,
  "durationSec": 192,
  "chords": [
   "E",
   "Am",
   "Dm",
   "E7"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "E",
     "E",
     "E7",
     "E7"
    ],
    "bars": 4
   },
   {
    "section": "Part A",
    "chords": [
     "E",
     "E",
     "E7",
     "E7",
     "Am",
     "Am",
     "E",
     "E"
    ],
    "bars": 16
   },
   {
    "section": "Part B",
    "chords": [
     "E",
     "E",
     "Dm",
     "Dm",
     "E",
     "E",
     "E",
     "E"
    ],
    "bars": 16
   },
   {
    "section": "Part C",
    "chords": [
     "Am",
     "Am",
     "Am",
     "Am",
     "Dm",
     "Dm",
     "E",
     "Am"
    ],
    "bars": 16
   },
   {
    "section": "Part A",
    "chords": [
     "E",
     "E",
     "E7",
     "E7",
     "Am",
     "Am",
     "E",
     "E"
    ],
    "bars": 16
   },
   {
    "section": "Part B",
    "chords": [
     "E",
     "E",
     "Dm",
     "Dm",
     "E",
     "E",
     "E",
     "E"
    ],
    "bars": 8
   },
   {
    "section": "Part C (accelerando)",
    "chords": [
     "Am",
     "Am",
     "Am",
     "Am",
     "Dm",
     "Dm",
     "E",
     "Am"
    ],
    "bars": 16
   },
   {
    "section": "Outro",
    "chords": [
     "Dm",
     "E",
     "Am",
     "Am"
    ],
    "bars": 4
   }
  ]
 },
 "Hoppípolla": {
  "status": "corrected",
  "key": "B major",
  "bpm": 140,
  "beatsPerBar": 4,
  "durationSec": 269,
  "chords": [
   "B/D#",
   "E",
   "B",
   "G#m",
   "F#"
  ],
  "structure": [
   {
    "section": "Intro (piano)",
    "chords": [
     "B/D#",
     "E",
     "B",
     "G#m",
     "F#",
     "E"
    ],
    "per": 2,
    "bars": 12
   },
   {
    "section": "Verse 1",
    "chords": [
     "B/D#",
     "E",
     "B",
     "G#m",
     "F#",
     "E"
    ],
    "per": 2,
    "bars": 24
   },
   {
    "section": "Chorus (build)",
    "chords": [
     "B",
     "F#",
     "E",
     "B/D#",
     "B",
     "F#",
     "E",
     "F#"
    ],
    "per": 2,
    "bars": 16
   },
   {
    "section": "Verse 2",
    "chords": [
     "B/D#",
     "E",
     "B",
     "G#m",
     "F#",
     "E"
    ],
    "per": 2,
    "bars": 24
   },
   {
    "section": "Climax (full band and strings)",
    "chords": [
     "B",
     "F#",
     "E",
     "B/D#",
     "B",
     "F#",
     "E",
     "F#"
    ],
    "per": 2,
    "bars": 32
   },
   {
    "section": "Instrumental",
    "chords": [
     "B/D#",
     "E",
     "B",
     "G#m",
     "F#",
     "E"
    ],
    "per": 2,
    "bars": 16
   },
   {
    "section": "Outro",
    "chords": [
     "B/D#",
     "E",
     "B",
     "G#m",
     "F#",
     "E"
    ],
    "per": 2,
    "bars": 24
   }
  ]
 },
 "Dilemma": {
  "status": "verified",
  "key": "D minor",
  "bpm": 84,
  "beatsPerBar": 4,
  "durationSec": 289,
  "chords": [
   "Gm7",
   "C",
   "Am7",
   "Dm"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "Gm7",
     "C",
     "Am7",
     "Dm"
    ],
    "bars": 8
   },
   {
    "section": "Hook",
    "chords": [
     "Gm7",
     "C",
     "Am7",
     "Dm"
    ],
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "Gm7",
     "C",
     "Am7",
     "Dm"
    ],
    "bars": 16
   },
   {
    "section": "Hook",
    "chords": [
     "Gm7",
     "C",
     "Am7",
     "Dm"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "Gm7",
     "C",
     "Am7",
     "Dm"
    ],
    "bars": 16
   },
   {
    "section": "Hook",
    "chords": [
     "Gm7",
     "C",
     "Am7",
     "Dm"
    ],
    "bars": 8
   },
   {
    "section": "Bridge",
    "chords": [
     "Gm7",
     "C",
     "Am7",
     "Dm"
    ],
    "bars": 8
   },
   {
    "section": "Verse 3",
    "chords": [
     "Gm7",
     "C",
     "Am7",
     "Dm"
    ],
    "bars": 16
   },
   {
    "section": "Hook",
    "chords": [
     "Gm7",
     "C",
     "Am7",
     "Dm"
    ],
    "bars": 8
   },
   {
    "section": "Outro",
    "chords": [
     "Gm7",
     "C",
     "Am7",
     "Dm"
    ],
    "bars": 8
   }
  ]
 },
 "Hot in Herre": {
  "status": "corrected",
  "key": "E minor (E Phrygian groove)",
  "bpm": 107,
  "beatsPerBar": 4,
  "durationSec": 228,
  "chords": [
   "Em",
   "F",
   "G",
   "F#"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "G",
     "F#",
     "F#",
     "F"
    ],
    "per": 0.5,
    "bars": 4
   },
   {
    "section": "Intro groove",
    "chords": [
     "Em",
     "F",
     "Em",
     "F",
     "Em",
     "F",
     "G",
     "F#"
    ],
    "bars": 4
   },
   {
    "section": "Hook",
    "chords": [
     "Em",
     "F",
     "Em",
     "F",
     "Em",
     "F",
     "G",
     "F#"
    ],
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "Em",
     "F",
     "Em",
     "F",
     "Em",
     "F",
     "G",
     "F#"
    ],
    "bars": 24
   },
   {
    "section": "Hook",
    "chords": [
     "Em",
     "F",
     "Em",
     "F",
     "Em",
     "F",
     "G",
     "F#"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "Em",
     "F",
     "Em",
     "F",
     "Em",
     "F",
     "G",
     "F#"
    ],
    "bars": 24
   },
   {
    "section": "Hook",
    "chords": [
     "Em",
     "F",
     "Em",
     "F",
     "Em",
     "F",
     "G",
     "F#"
    ],
    "bars": 8
   },
   {
    "section": "Bridge",
    "chords": [
     "Em",
     "F",
     "Em",
     "F",
     "Em",
     "F",
     "G",
     "F#"
    ],
    "bars": 8
   },
   {
    "section": "Hook",
    "chords": [
     "Em",
     "F",
     "Em",
     "F",
     "Em",
     "F",
     "G",
     "F#"
    ],
    "bars": 8
   },
   {
    "section": "Outro (drums)",
    "chords": [
     "G",
     "F#"
    ],
    "bars": 4
   }
  ]
 },
 "I'm Like a Bird": {
  "status": "corrected",
  "key": "Bb major (intro in G minor)",
  "capoNote": "Capo 3, G-D-Am-C chorus shapes",
  "bpm": 90,
  "beatsPerBar": 4,
  "durationSec": 243,
  "chords": [
   "Bb",
   "F",
   "Cm",
   "Eb"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "Gm",
     "Bb",
     "Cm",
     "Eb",
     "Bb",
     "Dm",
     "Cm",
     "Eb"
    ],
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "Bb",
     "Gm",
     "Bb",
     "F",
     "Bb",
     "Gm",
     "Bb",
     "F",
     "Eb",
     "F",
     "Eb",
     "F"
    ],
    "bars": 12
   },
   {
    "section": "Chorus",
    "chords": [
     "Bb",
     "F",
     "Cm",
     "Eb"
    ],
    "bars": 12
   },
   {
    "section": "Verse 2",
    "chords": [
     "Bb",
     "Gm",
     "Bb",
     "F",
     "Bb",
     "Gm",
     "Bb",
     "F",
     "Eb",
     "F",
     "Eb",
     "F"
    ],
    "bars": 12
   },
   {
    "section": "Chorus",
    "chords": [
     "Bb",
     "F",
     "Cm",
     "Eb"
    ],
    "bars": 12
   },
   {
    "section": "Bridge",
    "chords": [
     "Ebmaj7",
     "Gm",
     "Ebmaj7",
     "Fsus2",
     "Ebmaj7",
     "Gm",
     "Eb",
     "F"
    ],
    "bars": 8
   },
   {
    "section": "Interlude",
    "chords": [
     "Eb",
     "F"
    ],
    "bars": 8
   },
   {
    "section": "Chorus (repeats to end)",
    "chords": [
     "Bb",
     "F",
     "Cm7",
     "Eb"
    ],
    "bars": 24
   }
  ]
 },
 "Bubbly": {
  "status": "uncertain",
  "key": "A major",
  "tuning": "open D (D A D F# A D)",
  "capoNote": "Capo 7 in open D tuning on the record; in standard tuning play A and Dsus2 with no capo",
  "bpm": 128,
  "beatsPerBar": 4,
  "durationSec": 197,
  "chords": [
   "A",
   "Dsus2"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "A",
     "Dsus2"
    ],
    "per": 2,
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "A",
     "Dsus2"
    ],
    "per": 2,
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "A",
     "Dsus2"
    ],
    "per": 2,
    "bars": 16
   },
   {
    "section": "Verse 2",
    "chords": [
     "A",
     "Dsus2"
    ],
    "per": 2,
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "A",
     "Dsus2"
    ],
    "per": 2,
    "bars": 16
   },
   {
    "section": "Bridge",
    "chords": [
     "F#m",
     "D",
     "A",
     "E"
    ],
    "per": 2,
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "A",
     "Dsus2"
    ],
    "per": 2,
    "bars": 16
   },
   {
    "section": "Outro",
    "chords": [
     "A",
     "Dsus2"
    ],
    "per": 2,
    "bars": 9
   }
  ]
 },
 "Like a Star": {
  "status": "corrected",
  "key": "A minor",
  "bpm": 60,
  "beatsPerBar": 4,
  "durationSec": 243,
  "chords": [
   "Dm7",
   "E7",
   "Am7",
   "F#m7b5/A"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "Dm7",
     "E7",
     "Am7",
     "F#m7b5/A"
    ],
    "bars": 4
   },
   {
    "section": "Verse 1",
    "chords": [
     "Dm7",
     "E7",
     "Am7",
     "F#m7b5/A"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "Fmaj7",
     "Eaug",
     "Am7",
     "Gm7",
     "C9"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "Dm7",
     "E7",
     "Am7",
     "F#m7b5/A"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "Fmaj7",
     "Eaug",
     "Am7",
     "Gm7",
     "C9"
    ],
    "bars": 8
   },
   {
    "section": "Bridge",
    "chords": [
     "Dm7",
     "E7",
     "Am7",
     "F#m7b5/A"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "Fmaj7",
     "Eaug",
     "Am7",
     "Gm7",
     "C9"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "Fmaj7",
     "Eaug",
     "Am7",
     "Gm7",
     "C9"
    ],
    "bars": 8
   },
   {
    "section": "Outro",
    "chords": [
     "Dm7",
     "Am7"
    ],
    "bars": 2
   }
  ]
 },
 "Anak": {
  "status": "uncertain",
  "key": "A minor",
  "bpm": 78,
  "beatsPerBar": 4,
  "durationSec": 233,
  "chords": [
   "Am",
   "Dm",
   "G",
   "C",
   "F",
   "Dm",
   "E",
   "Am"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "Am",
     "Dm",
     "G",
     "C",
     "F",
     "Dm",
     "E",
     "Am"
    ],
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "Am",
     "Dm",
     "G",
     "C",
     "F",
     "Dm",
     "E",
     "Am"
    ],
    "bars": 16
   },
   {
    "section": "Verse 2",
    "chords": [
     "Am",
     "Dm",
     "G",
     "C",
     "F",
     "Dm",
     "E",
     "Am"
    ],
    "bars": 16
   },
   {
    "section": "Instrumental",
    "chords": [
     "Am",
     "Dm",
     "G",
     "C",
     "F",
     "Dm",
     "E",
     "Am"
    ],
    "bars": 8
   },
   {
    "section": "Verse 3",
    "chords": [
     "Am",
     "Dm",
     "G",
     "C",
     "F",
     "Dm",
     "E",
     "Am"
    ],
    "bars": 16
   },
   {
    "section": "Outro",
    "chords": [
     "Am",
     "Dm",
     "G",
     "C",
     "F",
     "Dm",
     "E",
     "Am"
    ],
    "bars": 8
   }
  ]
 },
 "Tadhana": {
  "status": "uncertain",
  "key": "F# major (D# minor feel)",
  "bpm": 78,
  "beatsPerBar": 4,
  "durationSec": 222,
  "chords": [
   "B",
   "C#",
   "D#m"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "B",
     "C#",
     "D#m",
     "D#m"
    ],
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "B",
     "C#",
     "D#m",
     "D#m",
     "B",
     "C#",
     "D#m",
     "D#m",
     "B",
     "C#",
     "D#m",
     "D#m",
     "G#m",
     "A#m",
     "B",
     "B"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "B",
     "C#",
     "D#m",
     "D#m",
     "B",
     "C#",
     "D#m",
     "D#m",
     "B",
     "C#",
     "D#m",
     "D#m",
     "G#m",
     "A#m",
     "B",
     "B"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "B",
     "D#m",
     "B",
     "D#m",
     "B",
     "D#m",
     "G#m",
     "A#m"
    ],
    "bars": 8
   },
   {
    "section": "Instrumental",
    "chords": [
     "B",
     "D#m",
     "B",
     "C#",
     "D#m",
     "G#m",
     "B",
     "C#"
    ],
    "bars": 8
   },
   {
    "section": "Verse 3",
    "chords": [
     "B",
     "C#",
     "D#m",
     "D#m",
     "B",
     "C#",
     "D#m",
     "D#m",
     "B",
     "C#",
     "D#m",
     "D#m",
     "G#m",
     "A#m",
     "B",
     "B"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "B",
     "D#m",
     "B",
     "D#m",
     "B",
     "D#m",
     "G#m",
     "A#m"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "B",
     "D#m",
     "B",
     "D#m",
     "B",
     "D#m",
     "G#m",
     "A#m"
    ],
    "bars": 8
   },
   {
    "section": "Outro",
    "chords": [
     "B",
     "D#m",
     "B",
     "C#",
     "D#m",
     "D#m",
     "B",
     "B"
    ],
    "bars": 8
   }
  ]
 },
 "Sukiyaki": {
  "status": "uncertain",
  "key": "G major",
  "bpm": 76,
  "beatsPerBar": 4,
  "durationSec": 185,
  "chords": [
   "G",
   "Em",
   "C",
   "D"
  ],
  "structure": [
   {
    "section": "Intro (whistling)",
    "chords": [
     "G",
     "D7"
    ],
    "bars": 2
   },
   {
    "section": "Verse 1",
    "chords": [
     "G",
     "Em",
     "G",
     "Em",
     "G",
     "Bm",
     "Em",
     "D"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "G",
     "Am",
     "C6",
     "B7",
     "Em",
     "C",
     "D7",
     "G"
    ],
    "bars": 8
   },
   {
    "section": "Bridge",
    "chords": [
     "C",
     "G",
     "G7",
     "Cm",
     "G/B",
     "A7",
     "D7",
     "D7"
    ],
    "bars": 8
   },
   {
    "section": "Verse 3",
    "chords": [
     "G",
     "Am",
     "C6",
     "B7",
     "Em",
     "C",
     "D7",
     "G"
    ],
    "bars": 8
   },
   {
    "section": "Whistling interlude",
    "chords": [
     "G",
     "Em",
     "G",
     "Em",
     "G",
     "Bm",
     "Em",
     "D"
    ],
    "bars": 8
   },
   {
    "section": "Bridge",
    "chords": [
     "C",
     "G",
     "G7",
     "Cm",
     "G/B",
     "A7",
     "D7",
     "D7"
    ],
    "bars": 8
   },
   {
    "section": "Verse 4",
    "chords": [
     "G",
     "Am",
     "C6",
     "B7",
     "Em",
     "C",
     "D7",
     "G"
    ],
    "bars": 8
   },
   {
    "section": "Outro (whistling)",
    "chords": [
     "C",
     "G"
    ],
    "bars": 2
   }
  ]
 },
 "Kal Ho Naa Ho": {
  "status": "uncertain",
  "key": "Db major",
  "capoNote": "Guitar: capo 1 and play the C-major shapes (C, Am, F, G, Dm7, Gm7)",
  "bpm": 86,
  "beatsPerBar": 4,
  "durationSec": 323,
  "chords": [
   "Db",
   "Bbm",
   "Gb",
   "Abm7"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "Gb",
     "Fm/Ab",
     "Db",
     "Db"
    ],
    "bars": 8
   },
   {
    "section": "Mukhda (verse)",
    "chords": [
     "Db",
     "Bbm"
    ],
    "bars": 8
   },
   {
    "section": "Refrain",
    "chords": [
     "Gb",
     "Db",
     "Gb",
     "Abm7",
     "Db",
     "Db",
     "Gb",
     "Db"
    ],
    "bars": 8
   },
   {
    "section": "Mukhda (verse)",
    "chords": [
     "Db",
     "Bbm"
    ],
    "bars": 8
   },
   {
    "section": "Refrain",
    "chords": [
     "Gb",
     "Db",
     "Gb",
     "Abm7",
     "Db",
     "Db",
     "Gb",
     "Db"
    ],
    "bars": 8
   },
   {
    "section": "Instrumental interlude",
    "chords": [
     "Gb",
     "Fm/Ab",
     "Db",
     "Db"
    ],
    "bars": 8
   },
   {
    "section": "Antara 1",
    "chords": [
     "Ab",
     "Ebm7",
     "Ab",
     "Ebm7",
     "Db",
     "Db",
     "Db",
     "Db"
    ],
    "bars": 16
   },
   {
    "section": "Refrain",
    "chords": [
     "Gb",
     "Db",
     "Gb",
     "Abm7",
     "Db",
     "Db",
     "Gb",
     "Db"
    ],
    "bars": 8
   },
   {
    "section": "Instrumental interlude",
    "chords": [
     "Gb",
     "Fm/Ab",
     "Db",
     "Db"
    ],
    "bars": 8
   },
   {
    "section": "Antara 2",
    "chords": [
     "Ab",
     "Ebm7",
     "Ab",
     "Ebm7",
     "Db",
     "Db",
     "Db",
     "Db"
    ],
    "bars": 16
   },
   {
    "section": "Refrain",
    "chords": [
     "Gb",
     "Db",
     "Gb",
     "Abm7",
     "Db",
     "Db",
     "Gb",
     "Db"
    ],
    "bars": 8
   },
   {
    "section": "Mukhda (verse)",
    "chords": [
     "Db",
     "Bbm"
    ],
    "bars": 8
   },
   {
    "section": "Refrain / Outro",
    "chords": [
     "Gb",
     "Db",
     "Gb",
     "Abm7",
     "Db",
     "Db",
     "Gb",
     "Db"
    ],
    "bars": 8
   }
  ]
 },
 "Volare (Nel blu, dipinto di blu)": {
  "status": "uncertain",
  "key": "Bb major",
  "bpm": 129,
  "beatsPerBar": 4,
  "durationSec": 209,
  "chords": [
   "Bb",
   "Gm",
   "Cm7",
   "F7"
  ],
  "structure": [
   {
    "section": "Intro / prelude (rubato verse)",
    "chords": [
     "Bb",
     "Bb",
     "Cm",
     "F7",
     "Bb",
     "Dm",
     "Cm",
     "F7"
    ],
    "per": 2,
    "bars": 16
   },
   {
    "section": "Chorus A",
    "chords": [
     "Bb",
     "Gm",
     "Cm7",
     "F7",
     "Cm7",
     "F7",
     "Bb",
     "Bb"
    ],
    "per": 2,
    "bars": 16
   },
   {
    "section": "Chorus B (secondary dominants)",
    "chords": [
     "D7",
     "D7",
     "Gm",
     "Gm",
     "C7",
     "C7",
     "F7",
     "F7"
    ],
    "bars": 8
   },
   {
    "section": "Chorus A (return)",
    "chords": [
     "Bb",
     "Gm",
     "Cm7",
     "F7",
     "Cm7",
     "F7",
     "Bb",
     "Bb"
    ],
    "bars": 8
   },
   {
    "section": "Chorus A",
    "chords": [
     "Bb",
     "Gm",
     "Cm7",
     "F7",
     "Cm7",
     "F7",
     "Bb",
     "Bb"
    ],
    "per": 2,
    "bars": 16
   },
   {
    "section": "Chorus B (secondary dominants)",
    "chords": [
     "D7",
     "D7",
     "Gm",
     "Gm",
     "C7",
     "C7",
     "F7",
     "F7"
    ],
    "bars": 8
   },
   {
    "section": "Chorus A (return)",
    "chords": [
     "Bb",
     "Gm",
     "Cm7",
     "F7",
     "Cm7",
     "F7",
     "Bb",
     "Bb"
    ],
    "bars": 8
   },
   {
    "section": "Chorus A",
    "chords": [
     "Bb",
     "Gm",
     "Cm7",
     "F7",
     "Cm7",
     "F7",
     "Bb",
     "Bb"
    ],
    "per": 2,
    "bars": 16
   },
   {
    "section": "Chorus B (secondary dominants)",
    "chords": [
     "D7",
     "D7",
     "Gm",
     "Gm",
     "C7",
     "C7",
     "F7",
     "F7"
    ],
    "bars": 8
   },
   {
    "section": "Chorus A (return) / Outro",
    "chords": [
     "Bb",
     "Gm",
     "Cm7",
     "F7",
     "Cm7",
     "F7",
     "Bb",
     "Bb"
    ],
    "bars": 8
   }
  ]
 },
 "Dragostea Din Tei": {
  "status": "corrected",
  "key": "A minor",
  "bpm": 130,
  "beatsPerBar": 4,
  "durationSec": 213,
  "chords": [
   "F",
   "C",
   "G",
   "Am"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "F",
     "C",
     "G",
     "Am"
    ],
    "bars": 8
   },
   {
    "section": "Post-chorus hook",
    "chords": [
     "F",
     "C",
     "G",
     "Am"
    ],
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "Am",
     "F",
     "C",
     "G"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "F",
     "C",
     "G",
     "Am"
    ],
    "bars": 16
   },
   {
    "section": "Post-chorus hook",
    "chords": [
     "F",
     "C",
     "G",
     "Am"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "Am",
     "F",
     "C",
     "G"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "F",
     "C",
     "G",
     "Am"
    ],
    "bars": 16
   },
   {
    "section": "Post-chorus hook",
    "chords": [
     "F",
     "C",
     "G",
     "Am"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "F",
     "C",
     "G",
     "Am"
    ],
    "bars": 16
   },
   {
    "section": "Outro",
    "chords": [
     "F",
     "C",
     "G",
     "Am"
    ],
    "bars": 4
   }
  ]
 },
 "Jerusalema": {
  "status": "uncertain",
  "key": "Db major",
  "capoNote": "Capo 1, C-family shapes (Am F C G)",
  "bpm": 124,
  "beatsPerBar": 4,
  "durationSec": 341,
  "chords": [
   "Bbm",
   "Gb",
   "Db",
   "Ab"
  ],
  "structure": [
   {
    "section": "Intro (drums and keys)",
    "chords": [
     "Bbm",
     "Gb",
     "Db",
     "Ab"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "Bbm",
     "Gb",
     "Db",
     "Ab"
    ],
    "bars": 16
   },
   {
    "section": "Verse 1",
    "chords": [
     "Bbm",
     "Gb",
     "Db",
     "Ab"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "Bbm",
     "Gb",
     "Db",
     "Ab"
    ],
    "bars": 16
   },
   {
    "section": "Instrumental",
    "chords": [
     "Bbm",
     "Gb",
     "Db",
     "Ab"
    ],
    "bars": 16
   },
   {
    "section": "Verse 2",
    "chords": [
     "Bbm",
     "Gb",
     "Db",
     "Ab"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "Bbm",
     "Gb",
     "Db",
     "Ab"
    ],
    "bars": 16
   },
   {
    "section": "Breakdown",
    "chords": [
     "Bbm",
     "Gb",
     "Db",
     "Ab"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "Bbm",
     "Gb",
     "Db",
     "Ab"
    ],
    "bars": 16
   },
   {
    "section": "Instrumental",
    "chords": [
     "Bbm",
     "Gb",
     "Db",
     "Ab"
    ],
    "bars": 16
   },
   {
    "section": "Outro chorus",
    "chords": [
     "Bbm",
     "Gb",
     "Db",
     "Ab"
    ],
    "bars": 16
   },
   {
    "section": "Outro (fade)",
    "chords": [
     "Bbm",
     "Gb",
     "Db",
     "Ab"
    ],
    "bars": 8
   }
  ]
 },
 "Vintersaga": {
  "status": "uncertain",
  "key": "A minor",
  "bpm": 113,
  "beatsPerBar": 4,
  "durationSec": 229,
  "chords": [
   "Am",
   "C",
   "Dm",
   "Em",
   "F",
   "G"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "Am",
     "Em",
     "F",
     "G"
    ],
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "Am",
     "C",
     "Dm",
     "Am",
     "Em",
     "Dm",
     "Am",
     "Am"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "F",
     "G",
     "Am",
     "Am",
     "F",
     "G",
     "Em",
     "Am"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "Am",
     "C",
     "Dm",
     "Am",
     "Em",
     "Dm",
     "Am",
     "Am"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "F",
     "G",
     "Am",
     "Am",
     "F",
     "G",
     "Em",
     "Am"
    ],
    "bars": 8
   },
   {
    "section": "Instrumental interlude",
    "chords": [
     "Am",
     "Em",
     "F",
     "G"
    ],
    "bars": 8
   },
   {
    "section": "Verse 3",
    "chords": [
     "Am",
     "C",
     "Dm",
     "Am",
     "Em",
     "Dm",
     "Am",
     "Am"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "F",
     "G",
     "Am",
     "Am",
     "F",
     "G",
     "Em",
     "Am"
    ],
    "bars": 16
   },
   {
    "section": "Outro",
    "chords": [
     "Am",
     "Em",
     "F",
     "G",
     "Am",
     "Am"
    ],
    "bars": 12
   }
  ]
 },
 "Creep": {
  "status": "corrected",
  "key": "G major",
  "bpm": 92,
  "beatsPerBar": 4,
  "durationSec": 235,
  "chords": [
   "G",
   "B",
   "C",
   "Cm"
  ],
  "structure": [
   {
    "section": "Intro (clean arpeggios)",
    "chords": [
     "G",
     "B",
     "C",
     "Cm"
    ],
    "bars": 4
   },
   {
    "section": "Verse 1",
    "chords": [
     "G",
     "B",
     "C",
     "Cm"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "G",
     "B",
     "C",
     "Cm"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "G",
     "B",
     "C",
     "Cm"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "G",
     "B",
     "C",
     "Cm"
    ],
    "bars": 8
   },
   {
    "section": "Bridge (loud, high vocal)",
    "chords": [
     "G",
     "B",
     "C",
     "Cm"
    ],
    "bars": 16
   },
   {
    "section": "Verse 3 (quiet)",
    "chords": [
     "G",
     "B",
     "C",
     "Cm"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "G",
     "B",
     "C",
     "Cm"
    ],
    "bars": 8
   },
   {
    "section": "Outro (ends on G)",
    "chords": [
     "G",
     "B",
     "C",
     "Cm",
     "G",
     "G"
    ],
    "bars": 6
   }
  ]
 },
 "Linger": {
  "status": "verified",
  "key": "D major",
  "bpm": 95,
  "beatsPerBar": 4,
  "durationSec": 263,
  "chords": [
   "D",
   "A",
   "C",
   "G"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "D",
     "A",
     "C",
     "G"
    ],
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "D",
     "A",
     "C",
     "G"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "D",
     "A",
     "C",
     "G"
    ],
    "bars": 16
   },
   {
    "section": "Verse 2",
    "chords": [
     "D",
     "A",
     "C",
     "G"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "D",
     "A",
     "C",
     "G"
    ],
    "bars": 16
   },
   {
    "section": "Instrumental interlude (strings)",
    "chords": [
     "D",
     "A",
     "C",
     "G"
    ],
    "bars": 8
   },
   {
    "section": "Final chorus",
    "chords": [
     "D",
     "A",
     "C",
     "G"
    ],
    "bars": 16
   },
   {
    "section": "Outro",
    "chords": [
     "D",
     "A",
     "C",
     "G"
    ],
    "bars": 8
   }
  ]
 },
 "Love Story": {
  "status": "corrected",
  "key": "D major",
  "capoNote": "Capo 2, C shapes (C G Am F); final chorus up a whole step to E (capo 4 with C shapes, or capo 2 with D shapes)",
  "bpm": 119,
  "beatsPerBar": 4,
  "durationSec": 234,
  "chords": [
   "D",
   "A",
   "Bm",
   "G"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "D",
     "A",
     "Bm",
     "G"
    ],
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "D",
     "G",
     "Bm",
     "G"
    ],
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "G",
     "A",
     "Bm",
     "G"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "D",
     "A",
     "Bm",
     "G",
     "D",
     "A",
     "G",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "D",
     "G",
     "Bm",
     "G"
    ],
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "G",
     "A",
     "Bm",
     "G"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "D",
     "A",
     "Bm",
     "G",
     "D",
     "A",
     "G",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Bridge (quiet)",
    "chords": [
     "Bm",
     "G",
     "D",
     "A"
    ],
    "bars": 16
   },
   {
    "section": "Build into key change",
    "chords": [
     "G",
     "A",
     "Bm",
     "G"
    ],
    "bars": 8
   },
   {
    "section": "Final chorus (key change to E major)",
    "chords": [
     "E",
     "B",
     "C#m",
     "A",
     "E",
     "B",
     "A",
     "B"
    ],
    "bars": 16
   },
   {
    "section": "Outro (E major)",
    "chords": [
     "E",
     "B",
     "C#m",
     "A"
    ],
    "bars": 4
   }
  ]
 },
 "Bad Guy": {
  "status": "corrected",
  "key": "G minor",
  "bpm": 135,
  "beatsPerBar": 4,
  "durationSec": 192,
  "chords": [
   "Gm",
   "Cm",
   "D7"
  ],
  "structure": [
   {
    "section": "Intro (bass and snaps)",
    "chords": [
     "Gm",
     "Gm",
     "Cm",
     "D7"
    ],
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "Gm",
     "Gm",
     "Cm",
     "D7"
    ],
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Gm",
     "Gm",
     "Cm",
     "D7"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "Gm",
     "Gm",
     "Cm",
     "D7"
    ],
    "bars": 4
   },
   {
    "section": "Drop (synth instrumental)",
    "chords": [
     "Gm",
     "Gm",
     "Cm",
     "D7"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "Gm",
     "Gm",
     "Cm",
     "D7"
    ],
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Gm",
     "Gm",
     "Cm",
     "D7"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "Gm",
     "Gm",
     "Cm",
     "D7"
    ],
    "bars": 4
   },
   {
    "section": "Drop (synth instrumental)",
    "chords": [
     "Gm",
     "Gm",
     "Cm",
     "D7"
    ],
    "bars": 8
   },
   {
    "section": "Outro (slow half-time beat switch)",
    "chords": [
     "Gm",
     "Gm",
     "Cm",
     "D7"
    ],
    "bars": 28
   }
  ]
 },
 "Last Christmas": {
  "status": "corrected",
  "key": "D major",
  "bpm": 107,
  "beatsPerBar": 4,
  "durationSec": 260,
  "chords": [
   "D",
   "Bm",
   "Em",
   "A"
  ],
  "structure": [
   {
    "section": "Intro (synth bells)",
    "chords": [
     "D",
     "Bm",
     "Em",
     "A"
    ],
    "per": 2,
    "bars": 8
   },
   {
    "section": "Chorus 1",
    "chords": [
     "D",
     "Bm",
     "Em",
     "A"
    ],
    "per": 2,
    "bars": 16
   },
   {
    "section": "Verse 1",
    "chords": [
     "D",
     "Bm",
     "Em",
     "A"
    ],
    "per": 2,
    "bars": 16
   },
   {
    "section": "Chorus 2",
    "chords": [
     "D",
     "Bm",
     "Em",
     "A"
    ],
    "per": 2,
    "bars": 16
   },
   {
    "section": "Verse 2",
    "chords": [
     "D",
     "Bm",
     "Em",
     "A"
    ],
    "per": 2,
    "bars": 16
   },
   {
    "section": "Chorus 3",
    "chords": [
     "D",
     "Bm",
     "Em",
     "A"
    ],
    "per": 2,
    "bars": 16
   },
   {
    "section": "Instrumental",
    "chords": [
     "D",
     "Bm",
     "Em",
     "A"
    ],
    "per": 2,
    "bars": 8
   },
   {
    "section": "Outro (chorus fade)",
    "chords": [
     "D",
     "Bm",
     "Em",
     "A"
    ],
    "per": 2,
    "bars": 20
   }
  ]
 },
 "All I Want for Christmas Is You": {
  "status": "corrected",
  "key": "G major",
  "bpm": 150,
  "beatsPerBar": 4,
  "durationSec": 241,
  "chords": [
   "G",
   "B7",
   "Em",
   "Cm"
  ],
  "structure": [
   {
    "section": "Intro (rubato, celesta and vocal)",
    "chords": [
     "G",
     "Em",
     "C",
     "D"
    ],
    "per": 4,
    "bars": 32
   },
   {
    "section": "Band intro (bells and piano groove)",
    "chords": [
     "G"
    ],
    "bars": 4
   },
   {
    "section": "Verse 1",
    "chords": [
     "G",
     "G",
     "G",
     "G",
     "C",
     "C",
     "Cm",
     "Cm"
    ],
    "bars": 8
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "G",
     "B7",
     "Em",
     "Cm",
     "G",
     "E7",
     "Am",
     "D"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "G",
     "Em",
     "Am",
     "D"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "G",
     "G",
     "G",
     "G",
     "C",
     "C",
     "Cm",
     "Cm"
    ],
    "bars": 8
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "G",
     "B7",
     "Em",
     "Cm",
     "G",
     "E7",
     "Am",
     "D"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "G",
     "Em",
     "Am",
     "D"
    ],
    "bars": 8
   },
   {
    "section": "Bridge",
    "chords": [
     "B7",
     "B7",
     "Em",
     "Em",
     "B7",
     "B7",
     "Em",
     "Em",
     "Am",
     "Am",
     "Cm",
     "Cm",
     "G",
     "E7",
     "Am",
     "D"
    ],
    "bars": 16
   },
   {
    "section": "Verse 3",
    "chords": [
     "G",
     "G",
     "G",
     "G",
     "C",
     "C",
     "Cm",
     "Cm"
    ],
    "bars": 8
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "G",
     "B7",
     "Em",
     "Cm",
     "G",
     "E7",
     "Am",
     "D"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "G",
     "Em",
     "Am",
     "D"
    ],
    "bars": 8
   },
   {
    "section": "Outro (repeated tag, ending on G)",
    "chords": [
     "G",
     "Em",
     "Am",
     "D"
    ],
    "bars": 24
   }
  ]
 },
 "Die With a Smile": {
  "status": "corrected",
  "key": "A major (chorus centres on F# minor)",
  "bpm": 158,
  "beatsPerBar": 6,
  "durationSec": 251,
  "chords": [
   "Amaj7",
   "Dmaj7",
   "Bm7",
   "E7",
   "C#m7",
   "F#m"
  ],
  "structure": [
   {
    "section": "Intro (guitar)",
    "chords": [
     "Amaj7",
     "Dmaj7"
    ],
    "bars": 4
   },
   {
    "section": "Verse 1",
    "chords": [
     "Amaj7",
     "Dmaj7"
    ],
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Amaj7",
     "Dmaj7"
    ],
    "bars": 8
   },
   {
    "section": "Chorus 1",
    "chords": [
     "Bm7",
     "E7",
     "C#m7",
     "F#m"
    ],
    "bars": 16
   },
   {
    "section": "Verse 2",
    "chords": [
     "Amaj7",
     "Dmaj7"
    ],
    "bars": 8
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Amaj7",
     "Dmaj7"
    ],
    "bars": 8
   },
   {
    "section": "Chorus 2",
    "chords": [
     "Bm7",
     "E7",
     "C#m7",
     "F#m"
    ],
    "bars": 16
   },
   {
    "section": "Bridge",
    "chords": [
     "Bm7",
     "E7",
     "C#m7",
     "F#m"
    ],
    "bars": 8
   },
   {
    "section": "Instrumental (guitar solo)",
    "chords": [
     "Bm7",
     "E7",
     "C#m7",
     "F#m"
    ],
    "bars": 8
   },
   {
    "section": "Final chorus",
    "chords": [
     "Bm7",
     "E7",
     "C#m7",
     "F#m"
    ],
    "bars": 16
   },
   {
    "section": "Outro",
    "chords": [
     "Bm7",
     "E7",
     "A",
     "E6",
     "F#m",
     "F#m"
    ],
    "bars": 4
   }
  ],
  "solos": [
   {
    "section": "Instrumental (guitar solo)",
    "scale": "F# minor pentatonic, box 1 at 2nd fret (or 14th fret); add G# and D from F# natural minor / A major for colour",
    "tips": "Bend the 3rd-string notes slowly to match the soulful 6/8 feel; target C# over C#m7 and F# over F#m to sound resolved.",
    "chords": [
     "Bm7",
     "E7",
     "C#m7",
     "F#m"
    ]
   }
  ]
 },
 "Blinding Lights": {
  "status": "corrected",
  "key": "F minor (F Dorian)",
  "bpm": 171,
  "beatsPerBar": 4,
  "durationSec": 202,
  "chords": [
   "Fm",
   "Cm",
   "Eb",
   "Bb"
  ],
  "structure": [
   {
    "section": "Intro (drums and synth riff)",
    "chords": [
     "Fm",
     "Cm",
     "Eb",
     "Bb"
    ],
    "per": 2,
    "bars": 16
   },
   {
    "section": "Verse 1",
    "chords": [
     "Fm",
     "Cm",
     "Eb",
     "Bb"
    ],
    "per": 2,
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Fm",
     "Cm",
     "Eb",
     "Eb"
    ],
    "per": 2,
    "bars": 8
   },
   {
    "section": "Chorus 1",
    "chords": [
     "Fm",
     "Cm",
     "Eb",
     "Bb",
     "Fm",
     "Cm",
     "Eb",
     "Eb"
    ],
    "per": 2,
    "bars": 16
   },
   {
    "section": "Post-chorus (synth riff)",
    "chords": [
     "Fm",
     "Cm",
     "Eb",
     "Bb"
    ],
    "per": 2,
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "Fm",
     "Cm",
     "Eb",
     "Bb"
    ],
    "per": 2,
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Fm",
     "Cm",
     "Eb",
     "Eb"
    ],
    "per": 2,
    "bars": 8
   },
   {
    "section": "Chorus 2",
    "chords": [
     "Fm",
     "Cm",
     "Eb",
     "Bb",
     "Fm",
     "Cm",
     "Eb",
     "Eb"
    ],
    "per": 2,
    "bars": 16
   },
   {
    "section": "Post-chorus (synth riff)",
    "chords": [
     "Fm",
     "Cm",
     "Eb",
     "Bb"
    ],
    "per": 2,
    "bars": 8
   },
   {
    "section": "Bridge",
    "chords": [
     "Fm",
     "Cm",
     "Eb",
     "Eb"
    ],
    "per": 2,
    "bars": 8
   },
   {
    "section": "Final chorus",
    "chords": [
     "Fm",
     "Cm",
     "Eb",
     "Bb",
     "Fm",
     "Cm",
     "Eb",
     "Eb"
    ],
    "per": 2,
    "bars": 16
   },
   {
    "section": "Outro (synth riff, ending)",
    "chords": [
     "Fm",
     "Cm",
     "Eb",
     "Gm7"
    ],
    "per": 2,
    "bars": 8
   }
  ]
 },
 "Shape of You": {
  "status": "corrected",
  "key": "C# minor",
  "bpm": 96,
  "beatsPerBar": 4,
  "durationSec": 234,
  "chords": [
   "C#m",
   "F#m",
   "A",
   "B"
  ],
  "structure": [
   {
    "section": "Intro (marimba riff)",
    "chords": [
     "C#m",
     "F#m",
     "A",
     "B"
    ],
    "bars": 4
   },
   {
    "section": "Verse 1",
    "chords": [
     "C#m",
     "F#m",
     "A",
     "Bsus4"
    ],
    "bars": 8
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "C#m",
     "F#m",
     "A",
     "Bsus4"
    ],
    "bars": 8
   },
   {
    "section": "Chorus 1",
    "chords": [
     "C#m",
     "F#m",
     "A",
     "B"
    ],
    "bars": 8
   },
   {
    "section": "Post-chorus",
    "chords": [
     "C#m",
     "F#m",
     "A",
     "B"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "C#m",
     "F#m",
     "A",
     "Bsus4"
    ],
    "bars": 8
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "C#m",
     "F#m",
     "A",
     "Bsus4"
    ],
    "bars": 8
   },
   {
    "section": "Chorus 2",
    "chords": [
     "C#m",
     "F#m",
     "A",
     "B"
    ],
    "bars": 8
   },
   {
    "section": "Post-chorus",
    "chords": [
     "C#m",
     "F#m",
     "A",
     "B"
    ],
    "bars": 8
   },
   {
    "section": "Bridge",
    "chords": [
     "C#m",
     "F#m",
     "A",
     "B"
    ],
    "bars": 8
   },
   {
    "section": "Final chorus",
    "chords": [
     "C#m",
     "F#m",
     "A",
     "B"
    ],
    "bars": 8
   },
   {
    "section": "Outro",
    "chords": [
     "C#m",
     "F#m",
     "A",
     "B"
    ],
    "bars": 8
   }
  ]
 },
 "Sweater Weather": {
  "status": "corrected",
  "key": "G minor (relative Bb major)",
  "bpm": 124,
  "beatsPerBar": 4,
  "durationSec": 240,
  "chords": [
   "Eb",
   "Gm",
   "Cm",
   "Bb"
  ],
  "structure": [
   {
    "section": "Intro (guitar)",
    "chords": [
     "Eb",
     "Gm",
     "Cm",
     "Bb"
    ],
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "Eb",
     "Gm",
     "Cm",
     "Bb"
    ],
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Eb",
     "Cm",
     "Gm",
     "Bb"
    ],
    "bars": 8
   },
   {
    "section": "Chorus 1",
    "chords": [
     "Eb",
     "Cm",
     "Gm",
     "Bb"
    ],
    "bars": 16
   },
   {
    "section": "Verse 2",
    "chords": [
     "Eb",
     "Gm",
     "Cm",
     "Bb"
    ],
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Eb",
     "Cm",
     "Gm",
     "Bb"
    ],
    "bars": 8
   },
   {
    "section": "Chorus 2",
    "chords": [
     "Eb",
     "Cm",
     "Gm",
     "Bb"
    ],
    "bars": 16
   },
   {
    "section": "Bridge",
    "chords": [
     "Cm",
     "Bb",
     "F",
     "F"
    ],
    "bars": 16
   },
   {
    "section": "Final chorus",
    "chords": [
     "Eb",
     "Cm",
     "Gm",
     "Bb"
    ],
    "bars": 16
   },
   {
    "section": "Outro",
    "chords": [
     "Eb",
     "Gm",
     "Cm",
     "Bb"
    ],
    "bars": 4
   }
  ]
 },
 "Starboy": {
  "status": "corrected",
  "key": "A minor",
  "bpm": 93,
  "beatsPerBar": 4,
  "durationSec": 230,
  "chords": [
   "Am",
   "G",
   "F",
   "G",
   "Em"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "Am",
     "G",
     "F",
     "G"
    ],
    "bars": 4
   },
   {
    "section": "Verse 1",
    "chords": [
     "Am",
     "G",
     "F",
     "G"
    ],
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Am",
     "Am",
     "G",
     "G",
     "F",
     "F",
     "G",
     "Em"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "Am",
     "Am",
     "G",
     "G",
     "F",
     "F",
     "G",
     "Em"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "Am",
     "G",
     "F",
     "G"
    ],
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Am",
     "Am",
     "G",
     "G",
     "F",
     "F",
     "G",
     "Em"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "Am",
     "Am",
     "G",
     "G",
     "F",
     "F",
     "G",
     "Em"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Pre-chorus 3",
    "chords": [
     "Am",
     "Am",
     "G",
     "G",
     "F",
     "F",
     "G",
     "Em"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "Am",
     "Am",
     "G",
     "G",
     "F",
     "F",
     "G",
     "Em"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Outro",
    "chords": [
     "Am",
     "G",
     "F",
     "G"
    ],
    "bars": 4
   }
  ]
 },
 "As It Was": {
  "status": "uncertain",
  "key": "A major",
  "bpm": 174,
  "beatsPerBar": 4,
  "durationSec": 167,
  "chords": [
   "D",
   "Bm",
   "E",
   "A"
  ],
  "structure": [
   {
    "section": "Intro (synth riff)",
    "chords": [
     "D",
     "Bm",
     "E",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "D",
     "Bm",
     "E",
     "A"
    ],
    "bars": 16
   },
   {
    "section": "Chorus 1",
    "chords": [
     "D",
     "Bm",
     "E",
     "A"
    ],
    "bars": 16
   },
   {
    "section": "Instrumental (synth riff)",
    "chords": [
     "Bm",
     "E",
     "A",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "D",
     "Bm",
     "E",
     "A"
    ],
    "bars": 16
   },
   {
    "section": "Chorus 2",
    "chords": [
     "D",
     "Bm",
     "E",
     "A"
    ],
    "bars": 16
   },
   {
    "section": "Bridge (half-time feel)",
    "chords": [
     "Bm",
     "E",
     "A",
     "A"
    ],
    "per": 2,
    "bars": 16
   },
   {
    "section": "Final chorus",
    "chords": [
     "D",
     "Bm",
     "E",
     "A"
    ],
    "bars": 16
   },
   {
    "section": "Outro",
    "chords": [
     "D",
     "Bm",
     "E",
     "A"
    ],
    "bars": 8
   }
  ]
 },
 "Someone You Loved": {
  "status": "corrected",
  "key": "Db major",
  "capoNote": "Guitar: capo 1 with C-G-Am-F shapes (sounds Db-Ab-Bbm-Gb)",
  "bpm": 110,
  "beatsPerBar": 4,
  "durationSec": 182,
  "chords": [
   "Db",
   "Ab",
   "Bbm",
   "Gb"
  ],
  "structure": [
   {
    "section": "Intro (piano)",
    "chords": [
     "Db",
     "Ab",
     "Bbm",
     "Gb"
    ],
    "bars": 4
   },
   {
    "section": "Verse 1",
    "chords": [
     "Db",
     "Ab",
     "Bbm",
     "Gb"
    ],
    "bars": 8
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Db",
     "Ab",
     "Bbm",
     "Gb"
    ],
    "bars": 8
   },
   {
    "section": "Chorus 1",
    "chords": [
     "Db",
     "Ab",
     "Bbm",
     "Gb"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "Db",
     "Ab",
     "Bbm",
     "Gb"
    ],
    "bars": 8
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Db",
     "Ab",
     "Bbm",
     "Gb"
    ],
    "bars": 8
   },
   {
    "section": "Chorus 2",
    "chords": [
     "Db",
     "Ab",
     "Bbm",
     "Gb"
    ],
    "bars": 8
   },
   {
    "section": "Bridge",
    "chords": [
     "Ebm",
     "Bbm",
     "Ab",
     "Bbm"
    ],
    "bars": 8
   },
   {
    "section": "Final chorus",
    "chords": [
     "Db",
     "Ab",
     "Bbm",
     "Gb"
    ],
    "bars": 16
   },
   {
    "section": "Outro (piano)",
    "chords": [
     "Db",
     "Ab",
     "Bbm",
     "Gb"
    ],
    "bars": 4
   }
  ]
 },
 "Sunflower": {
  "status": "corrected",
  "key": "D major",
  "bpm": 90,
  "beatsPerBar": 4,
  "durationSec": 158,
  "chords": [
   "Dmaj7",
   "Gmaj7",
   "Em7",
   "Gmaj7"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "Dmaj7",
     "Gmaj7",
     "Em7",
     "Gmaj7"
    ],
    "bars": 4
   },
   {
    "section": "Chorus 1",
    "chords": [
     "Dmaj7",
     "Gmaj7",
     "Em7",
     "Gmaj7"
    ],
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "Dmaj7",
     "Gmaj7",
     "Em7",
     "Gmaj7"
    ],
    "bars": 8
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Em7",
     "Gmaj7"
    ],
    "bars": 4
   },
   {
    "section": "Chorus 2",
    "chords": [
     "Dmaj7",
     "Gmaj7",
     "Em7",
     "Gmaj7"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "Dmaj7",
     "Gmaj7",
     "Em7",
     "Gmaj7"
    ],
    "bars": 8
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Em7",
     "Gmaj7"
    ],
    "bars": 4
   },
   {
    "section": "Chorus 3",
    "chords": [
     "Dmaj7",
     "Gmaj7",
     "Em7",
     "Gmaj7"
    ],
    "bars": 8
   },
   {
    "section": "Outro",
    "chords": [
     "Dmaj7",
     "Gmaj7",
     "Em7",
     "Gmaj7"
    ],
    "bars": 6
   }
  ]
 },
 "One Dance": {
  "status": "uncertain",
  "key": "Bb minor",
  "bpm": 104,
  "beatsPerBar": 4,
  "durationSec": 173,
  "chords": [
   "Bbm",
   "Db",
   "Ebm",
   "Ebm"
  ],
  "structure": [
   {
    "section": "Intro (vocal sample)",
    "chords": [
     "Bbm",
     "Db",
     "Ebm",
     "Ebm"
    ],
    "bars": 8
   },
   {
    "section": "Chorus 1",
    "chords": [
     "Bbm",
     "Db",
     "Ebm",
     "Ebm"
    ],
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "Bbm",
     "Db",
     "Ebm",
     "Ebm"
    ],
    "bars": 16
   },
   {
    "section": "Chorus 2",
    "chords": [
     "Bbm",
     "Db",
     "Ebm",
     "Ebm"
    ],
    "bars": 8
   },
   {
    "section": "Bridge (featured vocal)",
    "chords": [
     "Bbm",
     "Db",
     "Ebm",
     "Ebm"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "Bbm",
     "Db",
     "Ebm",
     "Ebm"
    ],
    "bars": 12
   },
   {
    "section": "Chorus 3",
    "chords": [
     "Bbm",
     "Db",
     "Ebm",
     "Ebm"
    ],
    "bars": 8
   },
   {
    "section": "Outro (vocal sample)",
    "chords": [
     "Bbm",
     "Db",
     "Ebm",
     "Ebm"
    ],
    "bars": 8
   }
  ]
 },
 "Perfect": {
  "status": "corrected",
  "key": "Ab major",
  "capoNote": "Capo 1, G-Em-C-D shapes (sounds Ab-Fm-Db-Eb)",
  "bpm": 63,
  "beatsPerBar": 4,
  "durationSec": 263,
  "chords": [
   "Ab",
   "Fm",
   "Db",
   "Eb"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "Ab",
     "Fm",
     "Db",
     "Eb"
    ],
    "bars": 4
   },
   {
    "section": "Verse 1",
    "chords": [
     "Ab",
     "Fm",
     "Db",
     "Eb"
    ],
    "bars": 8
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Fm",
     "Db",
     "Ab",
     "Eb"
    ],
    "bars": 4
   },
   {
    "section": "Chorus 1",
    "chords": [
     "Fm",
     "Db",
     "Ab",
     "Eb"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "Ab",
     "Fm",
     "Db",
     "Eb"
    ],
    "bars": 8
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Fm",
     "Db",
     "Ab",
     "Eb"
    ],
    "bars": 4
   },
   {
    "section": "Chorus 2",
    "chords": [
     "Fm",
     "Db",
     "Ab",
     "Eb"
    ],
    "bars": 8
   },
   {
    "section": "Instrumental",
    "chords": [
     "Ab",
     "Fm",
     "Db",
     "Eb"
    ],
    "bars": 4
   },
   {
    "section": "Final chorus",
    "chords": [
     "Fm",
     "Db",
     "Ab",
     "Eb"
    ],
    "bars": 12
   },
   {
    "section": "Outro",
    "chords": [
     "Ab",
     "Fm",
     "Db",
     "Eb"
    ],
    "bars": 6
   }
  ]
 },
 "Stay": {
  "status": "corrected",
  "key": "Bb minor (relative Db major)",
  "bpm": 170,
  "beatsPerBar": 4,
  "durationSec": 141,
  "chords": [
   "Gb",
   "Ab",
   "Bbm",
   "Fm"
  ],
  "structure": [
   {
    "section": "Intro (synth riff)",
    "chords": [
     "Gb",
     "Ab",
     "Bbm",
     "Fm"
    ],
    "per": 2,
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "Gb",
     "Ab",
     "Bbm",
     "Fm"
    ],
    "per": 2,
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Gb",
     "Ab",
     "Bbm",
     "Fm"
    ],
    "per": 2,
    "bars": 8
   },
   {
    "section": "Chorus 1",
    "chords": [
     "Gb",
     "Ab",
     "Bbm",
     "Fm"
    ],
    "per": 2,
    "bars": 16
   },
   {
    "section": "Verse 2",
    "chords": [
     "Gb",
     "Ab",
     "Bbm",
     "Fm"
    ],
    "per": 2,
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Gb",
     "Ab",
     "Bbm",
     "Fm"
    ],
    "per": 2,
    "bars": 8
   },
   {
    "section": "Chorus 2",
    "chords": [
     "Gb",
     "Ab",
     "Bbm",
     "Fm"
    ],
    "per": 2,
    "bars": 16
   },
   {
    "section": "Outro (riff)",
    "chords": [
     "Gb",
     "Ab",
     "Bbm",
     "Fm"
    ],
    "per": 2,
    "bars": 12
   }
  ]
 },
 "Believer": {
  "status": "corrected",
  "key": "Bb minor",
  "bpm": 125,
  "beatsPerBar": 4,
  "durationSec": 204,
  "chords": [
   "Bbm",
   "Bbm",
   "Gb",
   "F/A"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "Bbm"
    ],
    "bars": 4
   },
   {
    "section": "Verse 1",
    "chords": [
     "Bbm",
     "Bbm",
     "Gb",
     "F/A"
    ],
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Bbm",
     "Bbm",
     "Gb",
     "F/A"
    ],
    "bars": 8
   },
   {
    "section": "Chorus 1",
    "chords": [
     "Bbm",
     "Bbm",
     "Gb",
     "F/A"
    ],
    "bars": 16
   },
   {
    "section": "Verse 2",
    "chords": [
     "Bbm",
     "Bbm",
     "Gb",
     "F/A"
    ],
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Bbm",
     "Bbm",
     "Gb",
     "F/A"
    ],
    "bars": 8
   },
   {
    "section": "Chorus 2",
    "chords": [
     "Bbm",
     "Bbm",
     "Gb",
     "F/A"
    ],
    "bars": 16
   },
   {
    "section": "Bridge (build)",
    "chords": [
     "Gb",
     "Ab",
     "Adim",
     "Adim"
    ],
    "bars": 8
   },
   {
    "section": "Final chorus",
    "chords": [
     "Bbm",
     "Bbm",
     "Gb",
     "F/A"
    ],
    "bars": 16
   }
  ]
 },
 "I Wanna Be Yours": {
  "status": "corrected",
  "key": "C minor",
  "bpm": 68,
  "beatsPerBar": 4,
  "durationSec": 184,
  "chords": [
   "Cm",
   "Fm",
   "Gm",
   "Cm"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "Cm"
    ],
    "bars": 4
   },
   {
    "section": "Verse 1",
    "chords": [
     "Cm"
    ],
    "bars": 8
   },
   {
    "section": "Chorus 1",
    "chords": [
     "Fm",
     "Gm",
     "Cm",
     "Cm"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "Cm"
    ],
    "bars": 8
   },
   {
    "section": "Chorus 2",
    "chords": [
     "Fm",
     "Gm",
     "Cm",
     "Cm"
    ],
    "bars": 8
   },
   {
    "section": "Chorus 3",
    "chords": [
     "Fm",
     "Gm",
     "Cm",
     "Cm"
    ],
    "bars": 8
   },
   {
    "section": "Outro",
    "chords": [
     "Cm"
    ],
    "bars": 8
   }
  ]
 },
 "Heat Waves": {
  "status": "corrected",
  "key": "B major (C# Dorian feel)",
  "bpm": 81,
  "beatsPerBar": 4,
  "durationSec": 238,
  "chords": [
   "C#m",
   "B",
   "G#m",
   "F#",
   "E"
  ],
  "structure": [
   {
    "section": "Intro (vocal hook)",
    "chords": [
     "C#m",
     "C#m",
     "B",
     "B",
     "G#m",
     "F#",
     "E",
     "E"
    ],
    "per": 0.5,
    "bars": 4
   },
   {
    "section": "Chorus 1",
    "chords": [
     "C#m",
     "C#m",
     "B",
     "B",
     "G#m",
     "F#",
     "E",
     "E"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "C#m",
     "C#m",
     "B",
     "B",
     "G#m",
     "F#",
     "E",
     "E"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Chorus 2",
    "chords": [
     "C#m",
     "C#m",
     "B",
     "B",
     "G#m",
     "F#",
     "E",
     "E"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "C#m",
     "C#m",
     "B",
     "B",
     "G#m",
     "F#",
     "E",
     "E"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Chorus 3",
    "chords": [
     "C#m",
     "C#m",
     "B",
     "B",
     "G#m",
     "F#",
     "E",
     "E"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Bridge",
    "chords": [
     "E",
     "F#",
     "G#m",
     "B"
    ],
    "bars": 8
   },
   {
    "section": "Breakdown",
    "chords": [
     "C#m",
     "C#m",
     "B",
     "B",
     "G#m",
     "F#",
     "E",
     "E"
    ],
    "per": 0.5,
    "bars": 4
   },
   {
    "section": "Final chorus",
    "chords": [
     "C#m",
     "C#m",
     "B",
     "B",
     "G#m",
     "F#",
     "E",
     "E"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Outro",
    "chords": [
     "C#m",
     "C#m",
     "B",
     "B",
     "G#m",
     "F#",
     "E",
     "E"
    ],
    "per": 0.5,
    "bars": 16
   }
  ]
 },
 "Yellow": {
  "status": "corrected",
  "key": "B major",
  "tuning": "standard (the recording's clean guitars use an open-style E A B G B D# tuning; standard tuning shapes work for learners)",
  "bpm": 87,
  "beatsPerBar": 4,
  "durationSec": 269,
  "chords": [
   "B",
   "F#6",
   "Emaj7",
   "Emaj7"
  ],
  "structure": [
   {
    "section": "Intro (riff)",
    "chords": [
     "B",
     "F#6",
     "Emaj7",
     "Emaj7"
    ],
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "B",
     "F#6",
     "Emaj7",
     "Emaj7"
    ],
    "bars": 16
   },
   {
    "section": "Interlude (riff)",
    "chords": [
     "B",
     "F#6",
     "Emaj7",
     "Emaj7"
    ],
    "bars": 4
   },
   {
    "section": "Verse 2",
    "chords": [
     "B",
     "F#6",
     "Emaj7",
     "Emaj7"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "Emaj7",
     "G#m",
     "F#6",
     "Emaj7"
    ],
    "bars": 16
   },
   {
    "section": "Instrumental (riff)",
    "chords": [
     "B",
     "F#6",
     "Emaj7",
     "Emaj7"
    ],
    "bars": 8
   },
   {
    "section": "Verse 3",
    "chords": [
     "B",
     "F#6",
     "Emaj7",
     "Emaj7"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "Emaj7",
     "G#m",
     "F#6",
     "Emaj7"
    ],
    "bars": 16
   },
   {
    "section": "Outro (quiet)",
    "chords": [
     "B",
     "F#m7",
     "Emaj7",
     "B"
    ],
    "bars": 8
   }
  ]
 },
 "The Night We Met": {
  "status": "corrected",
  "key": "A major (verse centres on F#m)",
  "capoNote": "Capo 2, Em-D-G-C shapes (sounds F#m-E-A-D)",
  "bpm": 58,
  "beatsPerBar": 2,
  "durationSec": 208,
  "chords": [
   "F#m",
   "E",
   "A",
   "F#m",
   "A"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "F#m",
     "E",
     "A",
     "F#m"
    ],
    "per": 2,
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "F#m",
     "E",
     "A",
     "F#m",
     "A"
    ],
    "bars": 15
   },
   {
    "section": "Verse 2",
    "chords": [
     "F#m",
     "E",
     "A",
     "F#m",
     "A"
    ],
    "bars": 15
   },
   {
    "section": "Chorus",
    "chords": [
     "D",
     "A",
     "E",
     "F#m"
    ],
    "bars": 8
   },
   {
    "section": "Instrumental",
    "chords": [
     "F#m",
     "E",
     "A",
     "F#m"
    ],
    "bars": 8
   },
   {
    "section": "Verse 3",
    "chords": [
     "F#m",
     "E",
     "A",
     "F#m",
     "A"
    ],
    "bars": 15
   },
   {
    "section": "Chorus",
    "chords": [
     "D",
     "A",
     "E",
     "F#m"
    ],
    "bars": 8
   },
   {
    "section": "Instrumental (strings)",
    "chords": [
     "D",
     "A",
     "E",
     "F#m"
    ],
    "bars": 8
   },
   {
    "section": "Outro",
    "chords": [
     "F#m",
     "E",
     "A",
     "F#m",
     "A"
    ],
    "bars": 15
   }
  ]
 },
 "Closer": {
  "status": "corrected",
  "key": "Ab major",
  "capoNote": "Optional: capo 1 with C-D-Em7-D shapes (sounds Db-Eb-Fm7-Eb)",
  "bpm": 95,
  "beatsPerBar": 4,
  "durationSec": 244,
  "chords": [
   "Dbadd9",
   "Eb",
   "Fm7",
   "Eb"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "Dbadd9",
     "Eb",
     "Fm7",
     "Eb"
    ],
    "bars": 4
   },
   {
    "section": "Verse 1",
    "chords": [
     "Dbadd9",
     "Eb",
     "Fm7",
     "Eb"
    ],
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Dbadd9",
     "Eb",
     "Fm7",
     "Eb"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "Dbadd9",
     "Eb",
     "Fm7",
     "Eb"
    ],
    "bars": 8
   },
   {
    "section": "Drop (instrumental)",
    "chords": [
     "Dbadd9",
     "Eb",
     "Fm7",
     "Eb"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "Dbadd9",
     "Eb",
     "Fm7",
     "Eb"
    ],
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Dbadd9",
     "Eb",
     "Fm7",
     "Eb"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "Dbadd9",
     "Eb",
     "Fm7",
     "Eb"
    ],
    "bars": 8
   },
   {
    "section": "Drop (instrumental)",
    "chords": [
     "Dbadd9",
     "Eb",
     "Fm7",
     "Eb"
    ],
    "bars": 8
   },
   {
    "section": "Final chorus (duet)",
    "chords": [
     "Dbadd9",
     "Eb",
     "Fm7",
     "Eb"
    ],
    "bars": 8
   },
   {
    "section": "Outro",
    "chords": [
     "Dbadd9",
     "Eb",
     "Fm7",
     "Eb"
    ],
    "bars": 4
   }
  ]
 },
 "Riptide": {
  "status": "corrected",
  "key": "Db major (verse centres on Bbm)",
  "capoNote": "Capo 1, Am-G-C-F shapes (sounds Bbm-Ab-Db-Gb); same shapes on ukulele",
  "bpm": 102,
  "beatsPerBar": 4,
  "durationSec": 204,
  "chords": [
   "Bbm",
   "Ab",
   "Db",
   "Db"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "Bbm",
     "Ab",
     "Db",
     "Db"
    ],
    "per": 0.5,
    "bars": 4
   },
   {
    "section": "Verse 1",
    "chords": [
     "Bbm",
     "Ab",
     "Db",
     "Db"
    ],
    "per": 0.5,
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Bbm",
     "Ab",
     "Db",
     "Db"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "Bbm",
     "Ab",
     "Db",
     "Db"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "Bbm",
     "Ab",
     "Db",
     "Db"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Bbm",
     "Ab",
     "Db",
     "Db"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "Bbm",
     "Ab",
     "Db",
     "Db"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Bridge",
    "chords": [
     "Bbm",
     "Ab",
     "Db",
     "Gb"
    ],
    "bars": 12
   },
   {
    "section": "Chorus",
    "chords": [
     "Bbm",
     "Ab",
     "Db",
     "Db"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Final chorus",
    "chords": [
     "Bbm",
     "Ab",
     "Db",
     "Db"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Outro",
    "chords": [
     "Bbm",
     "Ab",
     "Db",
     "Db"
    ],
    "per": 0.5,
    "bars": 2
   }
  ]
 },
 "Levitating": {
  "status": "corrected",
  "key": "B minor",
  "bpm": 103,
  "beatsPerBar": 4,
  "durationSec": 203,
  "chords": [
   "Bm7",
   "F#m7",
   "Em7",
   "Em7"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "Bm7",
     "F#m7",
     "Em7",
     "Em7"
    ],
    "bars": 4
   },
   {
    "section": "Verse 1",
    "chords": [
     "Bm7",
     "F#m7",
     "Em7",
     "Em7"
    ],
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Em7",
     "F#m7",
     "Bm7",
     "Bm7"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "Bm7",
     "F#m7",
     "Em7",
     "Em7"
    ],
    "bars": 8
   },
   {
    "section": "Post-chorus (stripped back)",
    "chords": [
     "Bm7",
     "F#m7",
     "Em7",
     "Em7"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "Bm7",
     "F#m7",
     "Em7",
     "Em7"
    ],
    "bars": 8
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Em7",
     "F#m7",
     "Bm7",
     "Bm7"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "Bm7",
     "F#m7",
     "Em7",
     "Em7"
    ],
    "bars": 8
   },
   {
    "section": "Bridge (rap)",
    "chords": [
     "Bm7",
     "F#m7",
     "Em7",
     "Em7"
    ],
    "bars": 8
   },
   {
    "section": "A cappella break",
    "chords": [
     "Bm7"
    ],
    "per": 2,
    "bars": 2
   },
   {
    "section": "Final chorus",
    "chords": [
     "Bm7",
     "F#m7",
     "Em7",
     "Em7"
    ],
    "bars": 8
   },
   {
    "section": "Outro",
    "chords": [
     "Bm7"
    ],
    "per": 2,
    "bars": 2
   }
  ]
 },
 "Lucid Dreams": {
  "status": "corrected",
  "key": "F# minor",
  "bpm": 84,
  "beatsPerBar": 4,
  "durationSec": 240,
  "chords": [
   "F#m",
   "C#m/E",
   "Bm",
   "C#sus4",
   "C#"
  ],
  "structure": [
   {
    "section": "Intro (guitar sample)",
    "chords": [
     "F#m",
     "F#m",
     "C#m/E",
     "C#m/E",
     "Bm",
     "Bm",
     "C#sus4",
     "C#"
    ],
    "per": 0.5,
    "bars": 4
   },
   {
    "section": "Chorus 1",
    "chords": [
     "F#m",
     "F#m",
     "C#m/E",
     "C#m/E",
     "Bm",
     "Bm",
     "C#sus4",
     "C#"
    ],
    "per": 0.5,
    "bars": 16
   },
   {
    "section": "Verse 1",
    "chords": [
     "F#m",
     "F#m",
     "C#m/E",
     "C#m/E",
     "Bm",
     "Bm",
     "C#sus4",
     "C#"
    ],
    "per": 0.5,
    "bars": 16
   },
   {
    "section": "Chorus 2",
    "chords": [
     "F#m",
     "F#m",
     "C#m/E",
     "C#m/E",
     "Bm",
     "Bm",
     "C#sus4",
     "C#"
    ],
    "per": 0.5,
    "bars": 16
   },
   {
    "section": "Verse 2",
    "chords": [
     "F#m",
     "F#m",
     "C#m/E",
     "C#m/E",
     "Bm",
     "Bm",
     "C#sus4",
     "C#"
    ],
    "per": 0.5,
    "bars": 16
   },
   {
    "section": "Chorus 3 / Outro",
    "chords": [
     "F#m",
     "F#m",
     "C#m/E",
     "C#m/E",
     "Bm",
     "Bm",
     "C#sus4",
     "C#"
    ],
    "per": 0.5,
    "bars": 16
   }
  ]
 },
 "Photograph": {
  "status": "corrected",
  "key": "E major",
  "capoNote": "Capo 4, C-Am-G-F shapes (sounds E-C#m-B-A)",
  "bpm": 108,
  "beatsPerBar": 4,
  "durationSec": 258,
  "chords": [
   "E",
   "C#m",
   "B",
   "A"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "E",
     "C#m",
     "B",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "E",
     "C#m",
     "B",
     "A"
    ],
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "C#m",
     "A",
     "E",
     "B"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "E",
     "Bsus4",
     "C#m",
     "Asus2"
    ],
    "bars": 8
   },
   {
    "section": "Interlude",
    "chords": [
     "E",
     "C#m",
     "B",
     "A"
    ],
    "bars": 4
   },
   {
    "section": "Verse 2",
    "chords": [
     "E",
     "C#m",
     "B",
     "A"
    ],
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "C#m",
     "A",
     "E",
     "B"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "E",
     "Bsus4",
     "C#m",
     "Asus2"
    ],
    "bars": 8
   },
   {
    "section": "Bridge",
    "chords": [
     "E",
     "C#m",
     "B",
     "A"
    ],
    "bars": 16
   },
   {
    "section": "Final chorus",
    "chords": [
     "E",
     "Bsus4",
     "C#m",
     "Asus2"
    ],
    "bars": 8
   },
   {
    "section": "Outro",
    "chords": [
     "C#m",
     "A",
     "E",
     "B"
    ],
    "bars": 16
   }
  ]
 },
 "You Belong With Me": {
  "status": "corrected",
  "key": "F# major",
  "capoNote": "Capo 4, D-A-Em-G shapes (sounds F#-C#-G#m-B)",
  "bpm": 130,
  "beatsPerBar": 4,
  "durationSec": 236,
  "chords": [
   "F#",
   "C#",
   "G#m",
   "B"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "F#"
    ],
    "bars": 4
   },
   {
    "section": "Verse 1",
    "chords": [
     "F#",
     "C#",
     "G#m",
     "B"
    ],
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "G#m",
     "B",
     "F#",
     "C#"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "F#",
     "C#",
     "G#m",
     "B"
    ],
    "bars": 16
   },
   {
    "section": "Interlude",
    "chords": [
     "F#"
    ],
    "bars": 4
   },
   {
    "section": "Verse 2",
    "chords": [
     "F#",
     "C#",
     "G#m",
     "B"
    ],
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "G#m",
     "B",
     "F#",
     "C#"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "F#",
     "C#",
     "G#m",
     "B"
    ],
    "bars": 16
   },
   {
    "section": "Bridge",
    "chords": [
     "G#m",
     "B",
     "F#",
     "C#"
    ],
    "bars": 16
   },
   {
    "section": "Final chorus",
    "chords": [
     "F#",
     "C#",
     "G#m",
     "B"
    ],
    "bars": 16
   },
   {
    "section": "Outro",
    "chords": [
     "F#",
     "C#",
     "G#m",
     "B"
    ],
    "bars": 8
   }
  ]
 },
 "Lover": {
  "status": "corrected",
  "key": "G major",
  "bpm": 69,
  "beatsPerBar": 4,
  "durationSec": 221,
  "chords": [
   "G",
   "D/F#",
   "C"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "G",
     "D/F#",
     "C",
     "C"
    ],
    "bars": 4
   },
   {
    "section": "Verse 1",
    "chords": [
     "G",
     "D/F#",
     "C",
     "C"
    ],
    "bars": 8
   },
   {
    "section": "Chorus 1",
    "chords": [
     "G",
     "Bm/F#",
     "C",
     "C"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "G",
     "D/F#",
     "C",
     "C"
    ],
    "bars": 8
   },
   {
    "section": "Chorus 2",
    "chords": [
     "G",
     "Bm/F#",
     "C",
     "C"
    ],
    "bars": 8
   },
   {
    "section": "Interlude",
    "chords": [
     "G",
     "D/F#",
     "C",
     "C"
    ],
    "bars": 4
   },
   {
    "section": "Bridge",
    "chords": [
     "G",
     "Bm/F#",
     "Em",
     "D"
    ],
    "bars": 8
   },
   {
    "section": "Final chorus",
    "chords": [
     "G",
     "Bm/F#",
     "C",
     "C"
    ],
    "bars": 12
   },
   {
    "section": "Outro",
    "chords": [
     "G",
     "D/F#",
     "C",
     "G"
    ],
    "bars": 4
   }
  ]
 },
 "Shake It Off": {
  "status": "corrected",
  "key": "G major (G Mixolydian flavour)",
  "bpm": 160,
  "beatsPerBar": 4,
  "durationSec": 219,
  "chords": [
   "Am7",
   "C",
   "G",
   "G"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "Am7",
     "C",
     "G",
     "G"
    ],
    "bars": 4
   },
   {
    "section": "Verse 1",
    "chords": [
     "Am7",
     "C",
     "G",
     "G"
    ],
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Am7",
     "C",
     "G",
     "G"
    ],
    "bars": 8
   },
   {
    "section": "Chorus 1",
    "chords": [
     "Am7",
     "C",
     "G",
     "G"
    ],
    "bars": 16
   },
   {
    "section": "Post-chorus",
    "chords": [
     "Am7",
     "C",
     "G",
     "G"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "Am7",
     "C",
     "G",
     "G"
    ],
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Am7",
     "C",
     "G",
     "G"
    ],
    "bars": 8
   },
   {
    "section": "Chorus 2",
    "chords": [
     "Am7",
     "C",
     "G",
     "G"
    ],
    "bars": 16
   },
   {
    "section": "Post-chorus",
    "chords": [
     "Am7",
     "C",
     "G",
     "G"
    ],
    "bars": 8
   },
   {
    "section": "Bridge (spoken)",
    "chords": [
     "Am7",
     "C",
     "G",
     "G"
    ],
    "bars": 16
   },
   {
    "section": "Breakdown",
    "chords": [
     "Am7",
     "C",
     "G",
     "G"
    ],
    "bars": 8
   },
   {
    "section": "Final chorus",
    "chords": [
     "Am7",
     "C",
     "G",
     "G"
    ],
    "bars": 16
   },
   {
    "section": "Outro",
    "chords": [
     "Am7",
     "C",
     "G",
     "G"
    ],
    "bars": 8
   }
  ]
 },
 "Wildest Dreams": {
  "status": "corrected",
  "key": "Ab major",
  "capoNote": "Capo 1, G shapes (G D Am C = Ab Eb Bbm Db)",
  "bpm": 140,
  "beatsPerBar": 4,
  "durationSec": 220,
  "chords": [
   "Ab",
   "Eb",
   "Bbm",
   "Db"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "Db",
     "Fm",
     "Eb",
     "Eb"
    ],
    "bars": 4
   },
   {
    "section": "Verse 1",
    "chords": [
     "Db",
     "Fm",
     "Eb",
     "Eb"
    ],
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Ab",
     "Eb",
     "Bbm",
     "Db"
    ],
    "bars": 8
   },
   {
    "section": "Chorus 1",
    "chords": [
     "Ab",
     "Eb",
     "Bbm",
     "Db"
    ],
    "bars": 16
   },
   {
    "section": "Verse 2",
    "chords": [
     "Db",
     "Fm",
     "Eb",
     "Eb"
    ],
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Ab",
     "Eb",
     "Bbm",
     "Db"
    ],
    "bars": 8
   },
   {
    "section": "Chorus 2",
    "chords": [
     "Ab",
     "Eb",
     "Bbm",
     "Db"
    ],
    "bars": 16
   },
   {
    "section": "Bridge",
    "chords": [
     "Ab",
     "Eb",
     "Db",
     "Eb"
    ],
    "bars": 16
   },
   {
    "section": "Final chorus",
    "chords": [
     "Ab",
     "Eb",
     "Bbm",
     "Db"
    ],
    "bars": 16
   },
   {
    "section": "Outro",
    "chords": [
     "Ab",
     "Eb",
     "Db",
     "Db"
    ],
    "bars": 8
   }
  ]
 },
 "Shallow": {
  "status": "corrected",
  "key": "G major (bridge leans E Dorian)",
  "bpm": 96,
  "beatsPerBar": 4,
  "durationSec": 217,
  "chords": [
   "Em7",
   "D/F#",
   "G",
   "C",
   "G",
   "D"
  ],
  "structure": [
   {
    "section": "Intro (guitar)",
    "chords": [
     "Em7",
     "D/F#",
     "G",
     "G"
    ],
    "bars": 4
   },
   {
    "section": "Verse 1 (male)",
    "chords": [
     "Em7",
     "D/F#",
     "G",
     "G",
     "C",
     "G",
     "D",
     "D"
    ],
    "bars": 16
   },
   {
    "section": "Verse 2 (female)",
    "chords": [
     "Em7",
     "D/F#",
     "G",
     "G",
     "C",
     "G",
     "D",
     "D"
    ],
    "bars": 16
   },
   {
    "section": "Chorus 1",
    "chords": [
     "Am",
     "D/F#",
     "G",
     "D",
     "Em",
     "Em"
    ],
    "bars": 12
   },
   {
    "section": "Interlude",
    "chords": [
     "Em7",
     "D/F#",
     "G",
     "G"
    ],
    "bars": 4
   },
   {
    "section": "Bridge (vocal wail)",
    "chords": [
     "Bm",
     "D",
     "A",
     "Em"
    ],
    "bars": 8
   },
   {
    "section": "Final chorus (duet)",
    "chords": [
     "Am",
     "D/F#",
     "G",
     "D",
     "Em",
     "Em"
    ],
    "bars": 12
   },
   {
    "section": "Outro",
    "chords": [
     "Am",
     "D/F#",
     "G",
     "D",
     "Em",
     "Em"
    ],
    "bars": 12
   }
  ]
 },
 "Million Reasons": {
  "status": "corrected",
  "key": "C major",
  "bpm": 65,
  "beatsPerBar": 4,
  "durationSec": 205,
  "chords": [
   "C",
   "Am",
   "F",
   "G"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "C",
     "Am",
     "F",
     "G"
    ],
    "bars": 4
   },
   {
    "section": "Verse 1",
    "chords": [
     "C",
     "Am",
     "F",
     "G"
    ],
    "bars": 8
   },
   {
    "section": "Chorus 1",
    "chords": [
     "F",
     "C",
     "Am",
     "G"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "C",
     "Am",
     "F",
     "G"
    ],
    "bars": 8
   },
   {
    "section": "Chorus 2",
    "chords": [
     "F",
     "C",
     "Am",
     "G"
    ],
    "bars": 8
   },
   {
    "section": "Bridge (half time)",
    "chords": [
     "Am",
     "F",
     "C",
     "G"
    ],
    "bars": 8
   },
   {
    "section": "Final chorus",
    "chords": [
     "F",
     "C",
     "Am",
     "G"
    ],
    "bars": 8
   },
   {
    "section": "Outro",
    "chords": [
     "C",
     "Am",
     "F",
     "G"
    ],
    "bars": 4
   }
  ]
 },
 "Always Remember Us This Way": {
  "status": "corrected",
  "key": "A minor (chorus lifts to C major)",
  "bpm": 65,
  "beatsPerBar": 4,
  "durationSec": 210,
  "chords": [
   "Am",
   "F",
   "C",
   "G"
  ],
  "structure": [
   {
    "section": "Intro (piano)",
    "chords": [
     "Am",
     "F",
     "C",
     "G"
    ],
    "bars": 2
   },
   {
    "section": "Verse 1 (piano only)",
    "chords": [
     "Am",
     "F",
     "C",
     "G"
    ],
    "bars": 8
   },
   {
    "section": "Chorus 1",
    "chords": [
     "F",
     "C",
     "Am",
     "G"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2 (band enters)",
    "chords": [
     "Am",
     "F",
     "C",
     "G"
    ],
    "bars": 8
   },
   {
    "section": "Chorus 2",
    "chords": [
     "F",
     "C",
     "Am",
     "G"
    ],
    "bars": 8
   },
   {
    "section": "Bridge",
    "chords": [
     "Am",
     "F",
     "C",
     "G"
    ],
    "bars": 8
   },
   {
    "section": "Final chorus",
    "chords": [
     "F",
     "C",
     "Am",
     "G"
    ],
    "bars": 12
   },
   {
    "section": "Outro",
    "chords": [
     "F",
     "C/G",
     "Am",
     "Am"
    ],
    "bars": 4
   }
  ]
 },
 "Have Yourself a Merry Little Christmas": {
  "status": "uncertain",
  "key": "C major",
  "bpm": 58,
  "beatsPerBar": 4,
  "durationSec": 165,
  "chords": [
   "C",
   "Am7",
   "Dm7",
   "G7"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "C",
     "Am7",
     "Dm7",
     "G7"
    ],
    "per": 0.5,
    "bars": 4
   },
   {
    "section": "A section 1",
    "chords": [
     "C",
     "Am7",
     "Dm7",
     "G7",
     "C",
     "Am7",
     "Dm7",
     "G7",
     "C",
     "Am7",
     "Dm7",
     "G7",
     "E7",
     "A7",
     "D7",
     "G7"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "A section 2",
    "chords": [
     "C",
     "Am7",
     "Dm7",
     "G7",
     "C",
     "Am7",
     "Dm7",
     "G7",
     "C",
     "Am7",
     "Dm7",
     "G7",
     "E7",
     "A7",
     "D7",
     "G7"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Bridge (B section)",
    "chords": [
     "Em",
     "Am7",
     "Em",
     "Am7",
     "Fmaj7",
     "Em7",
     "Dm7",
     "G7",
     "C",
     "Am",
     "B7",
     "Em",
     "Dm7",
     "D7",
     "Dm7",
     "G7"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "A section 3",
    "chords": [
     "C",
     "Am7",
     "Dm7",
     "G7",
     "C",
     "Am7",
     "Dm7",
     "G7",
     "C",
     "Am7",
     "Dm7",
     "G7",
     "E7",
     "A7",
     "D7",
     "G7"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Ending tag",
    "chords": [
     "C",
     "Am7",
     "Dm7",
     "G7",
     "C",
     "C",
     "C",
     "C"
    ],
    "per": 0.5,
    "bars": 4
   }
  ]
 },
 "Thinking Out Loud": {
  "status": "corrected",
  "key": "D major",
  "bpm": 79,
  "beatsPerBar": 4,
  "durationSec": 281,
  "chords": [
   "D",
   "D/F#",
   "G",
   "A"
  ],
  "structure": [
   {
    "section": "Intro (riff)",
    "chords": [
     "D",
     "D/F#",
     "G",
     "A"
    ],
    "per": 0.5,
    "bars": 4
   },
   {
    "section": "Verse 1",
    "chords": [
     "D",
     "D/F#",
     "G",
     "A"
    ],
    "per": 0.5,
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "D/F#",
     "G",
     "A",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "Em",
     "A",
     "D",
     "D",
     "Em",
     "A",
     "G",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "D",
     "D/F#",
     "G",
     "A"
    ],
    "per": 0.5,
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "D/F#",
     "G",
     "A",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "Em",
     "A",
     "D",
     "D",
     "Em",
     "A",
     "G",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Guitar solo",
    "chords": [
     "D",
     "D/F#",
     "G",
     "A"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Chorus (breakdown)",
    "chords": [
     "Em",
     "A",
     "D",
     "D",
     "Em",
     "A",
     "G",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Final chorus / Outro",
    "chords": [
     "Em",
     "A",
     "D",
     "D",
     "Em",
     "A",
     "G",
     "A"
    ],
    "bars": 8
   }
  ],
  "solos": [
   {
    "section": "Guitar solo",
    "scale": "B minor pentatonic (= D major pentatonic), box 1 at the 7th fret; add the G# from D major/B dorian only as a passing note",
    "tips": "Lean on long, singing bends from the 9th to 10th fret on the G string and leave space between phrases - the solo is slow and bluesy, so fewer notes sound better. Land phrases on D or F# as the chord changes back to D.",
    "chords": [
     "D",
     "D/F#",
     "G",
     "A"
    ]
   }
  ]
 },
 "The A Team": {
  "status": "corrected",
  "key": "A major",
  "capoNote": "Capo 2, G shapes: verse G-D/F#-Em7-C, chorus Am7-C-G-D (sounds A-E/G#-F#m7-D and Bm7-D-A-E)",
  "bpm": 85,
  "beatsPerBar": 4,
  "durationSec": 258,
  "chords": [
   "A",
   "E/G#",
   "F#m7",
   "D"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "A",
     "E/G#",
     "F#m7",
     "D"
    ],
    "bars": 4
   },
   {
    "section": "Verse 1",
    "chords": [
     "A",
     "E/G#",
     "F#m7",
     "D"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "Bm7",
     "D",
     "A",
     "E"
    ],
    "bars": 16
   },
   {
    "section": "Verse 2",
    "chords": [
     "A",
     "E/G#",
     "F#m7",
     "D"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "Bm7",
     "D",
     "A",
     "E"
    ],
    "bars": 16
   },
   {
    "section": "Bridge",
    "chords": [
     "Bm7",
     "D",
     "A",
     "E"
    ],
    "bars": 8
   },
   {
    "section": "Final chorus",
    "chords": [
     "Bm7",
     "D",
     "A",
     "E"
    ],
    "bars": 12
   },
   {
    "section": "Outro",
    "chords": [
     "A",
     "E/G#",
     "F#m7",
     "D"
    ],
    "bars": 4
   }
  ]
 },
 "Galway Girl": {
  "status": "corrected",
  "key": "A major",
  "capoNote": "Capo 2, Em-G-D-C shapes for the verse (sounds F#m-A-E-D)",
  "bpm": 100,
  "beatsPerBar": 4,
  "durationSec": 171,
  "chords": [
   "F#m",
   "A",
   "E",
   "D"
  ],
  "structure": [
   {
    "section": "Intro (fiddle)",
    "chords": [
     "F#m",
     "A",
     "E",
     "D"
    ],
    "bars": 4
   },
   {
    "section": "Verse 1",
    "chords": [
     "F#m",
     "A",
     "E",
     "D"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "D",
     "A",
     "E",
     "E",
     "D",
     "A",
     "E",
     "F#m"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "F#m",
     "A",
     "E",
     "D"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "D",
     "A",
     "E",
     "E",
     "D",
     "A",
     "E",
     "F#m"
    ],
    "bars": 8
   },
   {
    "section": "Breakdown",
    "chords": [
     "F#m",
     "A",
     "E",
     "D"
    ],
    "bars": 8
   },
   {
    "section": "Final chorus",
    "chords": [
     "D",
     "A",
     "E",
     "E",
     "D",
     "A",
     "E",
     "F#m"
    ],
    "bars": 8
   },
   {
    "section": "Outro (fiddle)",
    "chords": [
     "F#m",
     "A",
     "E",
     "D"
    ],
    "bars": 4
   }
  ]
 },
 "Drop It Like It's Hot": {
  "status": "corrected",
  "key": "C# minor",
  "bpm": 92,
  "beatsPerBar": 4,
  "durationSec": 266,
  "chords": [
   "F#m7",
   "E7",
   "A7",
   "G#sus4",
   "G#"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "F#m7",
     "E7",
     "A7",
     "G#sus4",
     "G#"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "F#m7",
     "E7",
     "A7",
     "G#sus4",
     "G#"
    ],
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "F#m7",
     "E7",
     "A7",
     "G#sus4",
     "G#"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "F#m7",
     "E7",
     "A7",
     "G#sus4",
     "G#"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "F#m7",
     "E7",
     "A7",
     "G#sus4",
     "G#"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "F#m7",
     "E7",
     "A7",
     "G#sus4",
     "G#"
    ],
    "bars": 8
   },
   {
    "section": "Verse 3",
    "chords": [
     "F#m7",
     "E7",
     "A7",
     "G#sus4",
     "G#"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "F#m7",
     "E7",
     "A7",
     "G#sus4",
     "G#"
    ],
    "bars": 8
   },
   {
    "section": "Outro",
    "chords": [
     "F#m7",
     "E7",
     "A7",
     "G#sus4",
     "G#"
    ],
    "bars": 8
   }
  ]
 },
 "Gin and Juice": {
  "status": "corrected",
  "key": "F minor (F Phrygian)",
  "bpm": 95,
  "beatsPerBar": 4,
  "durationSec": 211,
  "chords": [
   "Fm",
   "Fm",
   "Ebm/Gb",
   "Cm7b5"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "Fm",
     "Fm",
     "Ebm/Gb",
     "Cm7b5"
    ],
    "per": 0.5,
    "bars": 4
   },
   {
    "section": "Verse 1",
    "chords": [
     "Fm",
     "Fm",
     "Ebm/Gb",
     "Cm7b5"
    ],
    "per": 0.5,
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "Fm",
     "Ebm/Gb"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "Fm",
     "Fm",
     "Ebm/Gb",
     "Cm7b5"
    ],
    "per": 0.5,
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "Fm",
     "Ebm/Gb"
    ],
    "bars": 8
   },
   {
    "section": "Verse 3",
    "chords": [
     "Fm",
     "Fm",
     "Ebm/Gb",
     "Cm7b5"
    ],
    "per": 0.5,
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "Fm",
     "Ebm/Gb"
    ],
    "bars": 8
   },
   {
    "section": "Outro (instrumental)",
    "chords": [
     "Fm",
     "Fm",
     "Ebm/Gb",
     "Cm7b5"
    ],
    "per": 0.5,
    "bars": 8
   }
  ]
 },
 "Young, Wild & Free": {
  "status": "verified",
  "key": "D major",
  "bpm": 95,
  "beatsPerBar": 4,
  "durationSec": 207,
  "chords": [
   "G",
   "D",
   "G",
   "Bm"
  ],
  "structure": [
   {
    "section": "Intro (chorus)",
    "chords": [
     "G",
     "D",
     "G",
     "Bm"
    ],
    "bars": 8
   },
   {
    "section": "Verse 1 (rap)",
    "chords": [
     "G",
     "D",
     "G",
     "Bm"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "G",
     "D",
     "G",
     "Bm"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2 (rap)",
    "chords": [
     "G",
     "D",
     "G",
     "Bm"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "G",
     "D",
     "G",
     "Bm"
    ],
    "bars": 8
   },
   {
    "section": "Verse 3 (rap)",
    "chords": [
     "G",
     "D",
     "G",
     "Bm"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "G",
     "D",
     "G",
     "Bm"
    ],
    "bars": 8
   },
   {
    "section": "Outro",
    "chords": [
     "G",
     "D"
    ],
    "bars": 4
   }
  ]
 },
 "Let It Be": {
  "status": "corrected",
  "key": "C major",
  "bpm": 72,
  "beatsPerBar": 4,
  "durationSec": 230,
  "chords": [
   "C",
   "G",
   "Am",
   "F"
  ],
  "structure": [
   {
    "section": "Intro (piano)",
    "chords": [
     "C",
     "G",
     "Am",
     "F",
     "C",
     "G",
     "F",
     "C"
    ],
    "per": 0.5,
    "bars": 4
   },
   {
    "section": "Verse 1",
    "chords": [
     "C",
     "G",
     "Am",
     "F",
     "C",
     "G",
     "F",
     "C"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "Am",
     "G",
     "F",
     "C",
     "C",
     "G",
     "F",
     "C"
    ],
    "per": 0.5,
    "bars": 4
   },
   {
    "section": "Verse 2",
    "chords": [
     "C",
     "G",
     "Am",
     "F",
     "C",
     "G",
     "F",
     "C"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Chorus (x2)",
    "chords": [
     "Am",
     "G",
     "F",
     "C",
     "C",
     "G",
     "F",
     "C"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Instrumental interlude (x2)",
    "chords": [
     "F",
     "C/E",
     "Dm7",
     "C",
     "Bb",
     "F/A",
     "G",
     "F"
    ],
    "per": 0.25,
    "bars": 4
   },
   {
    "section": "Guitar solo",
    "chords": [
     "C",
     "G",
     "Am",
     "F",
     "C",
     "G",
     "F",
     "C"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Verse 3",
    "chords": [
     "C",
     "G",
     "Am",
     "F",
     "C",
     "G",
     "F",
     "C"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Chorus (x2)",
    "chords": [
     "Am",
     "G",
     "F",
     "C",
     "C",
     "G",
     "F",
     "C"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Outro tag",
    "chords": [
     "C",
     "G",
     "F",
     "C"
    ],
    "per": 0.5,
    "bars": 2
   },
   {
    "section": "Outro (descending ending)",
    "chords": [
     "F",
     "C/E",
     "Dm7",
     "C",
     "Bb",
     "F/A",
     "G",
     "F"
    ],
    "per": 0.25,
    "bars": 2
   },
   {
    "section": "Final chord",
    "chords": [
     "C"
    ],
    "bars": 2
   }
  ],
  "solos": [
   {
    "section": "Guitar solo",
    "scale": "C major pentatonic (A minor pentatonic box 1 at the 5th fret), adding F for a full C major colour",
    "tips": "Play the solo over the verse changes: aim for C on the C chord, B or D on G, A on Am and A or C on F. Keep it lyrical and slow, using a few bends from D to E on the G string rather than fast runs.",
    "chords": [
     "C",
     "G",
     "Am",
     "F",
     "C",
     "G",
     "F",
     "C"
    ]
   }
  ],
  "pianoVideo": {
   "id": "CGj85pVzRJs",
   "title": "The Beatles - The Beatles - Let It Be (Official Music Video) [Remastered 2015]",
   "channel": "TheBeatlesVEVO"
  }
 },
 "No Woman No Cry": {
  "status": "uncertain",
  "key": "C major (the famous Live! 1975 recording sounds sharp of C, near Db)",
  "bpm": 78,
  "beatsPerBar": 4,
  "durationSec": 427,
  "chords": [
   "C",
   "G/B",
   "Am",
   "F"
  ],
  "structure": [
   {
    "section": "Intro (organ)",
    "chords": [
     "C",
     "G/B",
     "Am",
     "F"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "C",
     "G/B",
     "Am",
     "F"
    ],
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "C",
     "G/B",
     "Am",
     "F"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "C",
     "G/B",
     "Am",
     "F"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "C",
     "G/B",
     "Am",
     "F"
    ],
    "bars": 16
   },
   {
    "section": "Bridge (chant section)",
    "chords": [
     "C",
     "G/B",
     "Am",
     "F"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "C",
     "G/B",
     "Am",
     "F"
    ],
    "bars": 8
   },
   {
    "section": "Guitar solo",
    "chords": [
     "C",
     "G/B",
     "Am",
     "F"
    ],
    "bars": 16
   },
   {
    "section": "Verse 3",
    "chords": [
     "C",
     "G/B",
     "Am",
     "F"
    ],
    "bars": 16
   },
   {
    "section": "Chorus (x2)",
    "chords": [
     "C",
     "G/B",
     "Am",
     "F"
    ],
    "bars": 16
   },
   {
    "section": "Outro",
    "chords": [
     "C",
     "G/B",
     "Am",
     "F"
    ],
    "bars": 8
   }
  ],
  "solos": [
   {
    "section": "Guitar solo",
    "scale": "C major pentatonic (A minor pentatonic box 1 at the 5th fret)",
    "tips": "Use short, laid-back phrases that start just after the beat to sit with the reggae groove. Target C over C, B over G/B and A over Am so the solo follows the walking bass line.",
    "chords": [
     "C",
     "G/B",
     "Am",
     "F"
    ]
   }
  ]
 },
 "With or Without You": {
  "status": "corrected",
  "key": "D major",
  "bpm": 110,
  "beatsPerBar": 4,
  "durationSec": 296,
  "chords": [
   "D",
   "A",
   "Bm",
   "G"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "D",
     "A",
     "Bm",
     "G"
    ],
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "D",
     "A",
     "Bm",
     "G"
    ],
    "bars": 16
   },
   {
    "section": "Verse 2",
    "chords": [
     "D",
     "A",
     "Bm",
     "G"
    ],
    "bars": 16
   },
   {
    "section": "Chorus 1",
    "chords": [
     "D",
     "A",
     "Bm",
     "G"
    ],
    "bars": 8
   },
   {
    "section": "Verse 3",
    "chords": [
     "D",
     "A",
     "Bm",
     "G"
    ],
    "bars": 16
   },
   {
    "section": "Chorus 2",
    "chords": [
     "D",
     "A",
     "Bm",
     "G"
    ],
    "bars": 8
   },
   {
    "section": "Pre-chorus 1",
    "chords": [
     "D",
     "A",
     "Bm",
     "G"
    ],
    "bars": 8
   },
   {
    "section": "Middle eight (climax)",
    "chords": [
     "D",
     "A",
     "Bm",
     "G"
    ],
    "bars": 8
   },
   {
    "section": "Pre-chorus 2",
    "chords": [
     "D",
     "A",
     "Bm",
     "G"
    ],
    "bars": 8
   },
   {
    "section": "Chorus 3",
    "chords": [
     "D",
     "A",
     "Bm",
     "G"
    ],
    "bars": 8
   },
   {
    "section": "Bridge (quiet breakdown)",
    "chords": [
     "D",
     "A",
     "Bm",
     "G"
    ],
    "bars": 8
   },
   {
    "section": "Chorus 4",
    "chords": [
     "D",
     "A",
     "Bm",
     "G"
    ],
    "bars": 8
   },
   {
    "section": "Outro (guitar figure, fade)",
    "chords": [
     "D",
     "A",
     "Bm",
     "G"
    ],
    "bars": 16
   }
  ]
 },
 "Don't Stop Believin'": {
  "status": "corrected",
  "key": "E major",
  "bpm": 118,
  "beatsPerBar": 4,
  "durationSec": 251,
  "chords": [
   "E",
   "B",
   "C#m",
   "A",
   "E",
   "B",
   "G#m",
   "A"
  ],
  "structure": [
   {
    "section": "Intro (piano)",
    "chords": [
     "E",
     "B",
     "C#m",
     "A",
     "E",
     "B",
     "G#m",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "E",
     "B",
     "C#m",
     "A",
     "E",
     "B",
     "G#m",
     "A"
    ],
    "bars": 16
   },
   {
    "section": "Instrumental",
    "chords": [
     "E",
     "B",
     "C#m",
     "A",
     "E",
     "B",
     "G#m",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2 (half-length)",
    "chords": [
     "E",
     "B",
     "C#m",
     "A",
     "E",
     "B",
     "G#m",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Pre-chorus 1",
    "chords": [
     "A",
     "E",
     "A",
     "E",
     "A",
     "E",
     "A",
     "B"
    ],
    "bars": 16
   },
   {
    "section": "Guitar interlude",
    "chords": [
     "E",
     "B",
     "C#m",
     "A",
     "E",
     "B",
     "G#m",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Verse 3",
    "chords": [
     "E",
     "B",
     "C#m",
     "A",
     "E",
     "B",
     "G#m",
     "A"
    ],
    "bars": 16
   },
   {
    "section": "Pre-chorus 2",
    "chords": [
     "A",
     "E",
     "A",
     "E",
     "A",
     "E",
     "A",
     "B"
    ],
    "bars": 16
   },
   {
    "section": "Instrumental (chorus melody on guitar)",
    "chords": [
     "E",
     "B",
     "C#m",
     "A",
     "E",
     "B",
     "G#m",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Chorus (to fade)",
    "chords": [
     "E",
     "B",
     "C#m",
     "A",
     "E",
     "B",
     "G#m",
     "A"
    ],
    "bars": 20
   }
  ],
  "solos": [
   {
    "section": "Guitar interlude",
    "scale": "E major pentatonic (same shape as C# minor pentatonic box 1 at the 9th fret); add the 4th (A) and 7th (D#) from E major for colour",
    "tips": "Aim long notes at the root of each chord as it changes (E, B, C#, A). Leave space: phrase in two-bar ideas and let notes ring with gentle vibrato.",
    "chords": [
     "E",
     "B",
     "C#m",
     "A",
     "E",
     "B",
     "G#m",
     "A"
    ]
   },
   {
    "section": "Instrumental (chorus melody on guitar)",
    "scale": "E major scale / E major pentatonic, 9th to 12th fret area",
    "tips": "This part follows the vocal melody, so sing it in your head while playing. Keep the rhythm steady at 118 BPM before adding bends.",
    "chords": [
     "E",
     "B",
     "C#m",
     "A",
     "E",
     "B",
     "G#m",
     "A"
    ]
   }
  ]
 },
 "I'm Yours": {
  "status": "corrected",
  "key": "B major",
  "capoNote": "Capo 4, G shapes (G, D, Em, C; bridge G, D/F#, Em, D, C)",
  "bpm": 151,
  "beatsPerBar": 4,
  "durationSec": 243,
  "chords": [
   "B",
   "F#",
   "G#m",
   "E"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "B",
     "F#",
     "G#m",
     "E"
    ],
    "per": 2,
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "B",
     "F#",
     "G#m",
     "E"
    ],
    "per": 2,
    "bars": 24
   },
   {
    "section": "Chorus 1",
    "chords": [
     "B",
     "F#",
     "G#m",
     "E"
    ],
    "per": 2,
    "bars": 16
   },
   {
    "section": "Verse 2",
    "chords": [
     "B",
     "F#",
     "G#m",
     "E"
    ],
    "per": 2,
    "bars": 24
   },
   {
    "section": "Chorus 2",
    "chords": [
     "B",
     "F#",
     "G#m",
     "E"
    ],
    "per": 2,
    "bars": 16
   },
   {
    "section": "Bridge",
    "chords": [
     "B",
     "B",
     "F#/A#",
     "F#/A#",
     "G#m",
     "G#m",
     "F#",
     "E"
    ],
    "bars": 24
   },
   {
    "section": "Verse 3",
    "chords": [
     "B",
     "F#",
     "G#m",
     "E"
    ],
    "per": 2,
    "bars": 16
   },
   {
    "section": "Chorus 3",
    "chords": [
     "B",
     "F#",
     "G#m",
     "E"
    ],
    "per": 2,
    "bars": 16
   },
   {
    "section": "Outro",
    "chords": [
     "B",
     "F#",
     "G#m",
     "E"
    ],
    "per": 2,
    "bars": 8
   }
  ]
 },
 "Despacito": {
  "status": "corrected",
  "key": "B minor",
  "bpm": 89,
  "beatsPerBar": 4,
  "durationSec": 228,
  "chords": [
   "Bm",
   "G",
   "D",
   "A"
  ],
  "structure": [
   {
    "section": "Intro (cuatro and guitar)",
    "chords": [
     "Bm",
     "G",
     "D",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Verse 1 (Fonsi)",
    "chords": [
     "Bm",
     "G",
     "D",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Pre-chorus 1",
    "chords": [
     "Bm",
     "G",
     "D",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Chorus 1",
    "chords": [
     "Bm",
     "G",
     "D",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Post-chorus 1",
    "chords": [
     "Bm",
     "G",
     "D",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2 (Daddy Yankee rap)",
    "chords": [
     "Bm",
     "G",
     "D",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Pre-chorus 2",
    "chords": [
     "Bm",
     "G",
     "D",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Chorus 2",
    "chords": [
     "Bm",
     "G",
     "D",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Post-chorus 2",
    "chords": [
     "Bm",
     "G",
     "D",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Bridge",
    "chords": [
     "Bm",
     "G",
     "D",
     "A"
    ],
    "bars": 4
   },
   {
    "section": "Final chorus",
    "chords": [
     "Bm",
     "G",
     "D",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Outro (a cappella hook)",
    "chords": [
     "Bm",
     "G"
    ],
    "bars": 2
   }
  ]
 },
 "Someone Like You": {
  "status": "corrected",
  "key": "A major",
  "bpm": 68,
  "beatsPerBar": 4,
  "durationSec": 285,
  "chords": [
   "A",
   "C#m/G#",
   "F#m",
   "D"
  ],
  "structure": [
   {
    "section": "Intro (piano)",
    "chords": [
     "A",
     "C#m/G#",
     "F#m",
     "D"
    ],
    "bars": 4
   },
   {
    "section": "Verse 1",
    "chords": [
     "A",
     "C#m/G#",
     "F#m",
     "D"
    ],
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "E",
     "E",
     "F#m7",
     "D"
    ],
    "bars": 6
   },
   {
    "section": "Chorus",
    "chords": [
     "A",
     "E",
     "F#m",
     "D"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "A",
     "C#m/G#",
     "F#m",
     "D"
    ],
    "bars": 8
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "E",
     "E",
     "F#m7",
     "D"
    ],
    "bars": 6
   },
   {
    "section": "Chorus",
    "chords": [
     "A",
     "E",
     "F#m",
     "D"
    ],
    "bars": 8
   },
   {
    "section": "Bridge",
    "chords": [
     "E",
     "F#m",
     "D",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Chorus (quiet)",
    "chords": [
     "A",
     "E",
     "F#m",
     "D"
    ],
    "bars": 8
   },
   {
    "section": "Final chorus",
    "chords": [
     "A",
     "E",
     "F#m",
     "D"
    ],
    "bars": 8
   },
   {
    "section": "Outro",
    "chords": [
     "A"
    ],
    "bars": 2
   }
  ]
 },
 "Let Her Go": {
  "status": "corrected",
  "key": "G major",
  "capoNote": "Capo 7, C shapes (C-shape F G Am sounds as C D Em)",
  "bpm": 75,
  "beatsPerBar": 4,
  "durationSec": 253,
  "chords": [
   "C",
   "D",
   "Em",
   "D"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "C",
     "D",
     "Em",
     "D"
    ],
    "bars": 4
   },
   {
    "section": "Chorus 1",
    "chords": [
     "C",
     "D",
     "Em",
     "Em",
     "C",
     "D",
     "G",
     "G"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Interlude",
    "chords": [
     "C",
     "D",
     "Em",
     "D"
    ],
    "bars": 4
   },
   {
    "section": "Verse 1",
    "chords": [
     "Em",
     "C",
     "D",
     "Bm",
     "Em",
     "C",
     "D",
     "D"
    ],
    "bars": 8
   },
   {
    "section": "Chorus 2",
    "chords": [
     "C",
     "D",
     "Em",
     "Em",
     "C",
     "D",
     "G",
     "G"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Interlude",
    "chords": [
     "C",
     "D",
     "Em",
     "D"
    ],
    "bars": 4
   },
   {
    "section": "Verse 2",
    "chords": [
     "Em",
     "C",
     "D",
     "Bm",
     "Em",
     "C",
     "D",
     "D"
    ],
    "bars": 8
   },
   {
    "section": "Chorus 3",
    "chords": [
     "C",
     "D",
     "Em",
     "Em",
     "C",
     "D",
     "G",
     "G"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Chorus 4 (quiet)",
    "chords": [
     "C",
     "D",
     "Em",
     "Em",
     "C",
     "D",
     "G",
     "G"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Chorus 5 (full)",
    "chords": [
     "C",
     "D",
     "Em",
     "Em",
     "C",
     "D",
     "G",
     "G"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Outro",
    "chords": [
     "C",
     "D",
     "Em",
     "D"
    ],
    "bars": 4
   }
  ]
 },
 "Stand By Me": {
  "status": "corrected",
  "key": "A major",
  "bpm": 119,
  "beatsPerBar": 4,
  "durationSec": 178,
  "chords": [
   "A",
   "F#m",
   "D",
   "E"
  ],
  "structure": [
   {
    "section": "Intro (bass line)",
    "chords": [
     "A",
     "A",
     "F#m",
     "F#m",
     "D",
     "E",
     "A",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "A",
     "A",
     "F#m",
     "F#m",
     "D",
     "E",
     "A",
     "A"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "A",
     "A",
     "F#m",
     "F#m",
     "D",
     "E",
     "A",
     "A"
    ],
    "bars": 16
   },
   {
    "section": "Verse 2",
    "chords": [
     "A",
     "A",
     "F#m",
     "F#m",
     "D",
     "E",
     "A",
     "A"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "A",
     "A",
     "F#m",
     "F#m",
     "D",
     "E",
     "A",
     "A"
    ],
    "bars": 16
   },
   {
    "section": "String interlude",
    "chords": [
     "A",
     "A",
     "F#m",
     "F#m",
     "D",
     "E",
     "A",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Chorus (fade out)",
    "chords": [
     "A",
     "A",
     "F#m",
     "F#m",
     "D",
     "E",
     "A",
     "A"
    ],
    "bars": 8
   }
  ]
 },
 "A Horse With No Name": {
  "status": "corrected",
  "key": "E minor (E Dorian)",
  "bpm": 123,
  "beatsPerBar": 4,
  "durationSec": 250,
  "chords": [
   "Em",
   "D6/9"
  ],
  "structure": [
   {
    "section": "Intro (guitar)",
    "chords": [
     "Em",
     "D6/9"
    ],
    "bars": 4
   },
   {
    "section": "Verse 1",
    "chords": [
     "Em",
     "D6/9"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "Em",
     "D6/9"
    ],
    "bars": 16
   },
   {
    "section": "Verse 2",
    "chords": [
     "Em",
     "D6/9"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "Em",
     "D6/9"
    ],
    "bars": 16
   },
   {
    "section": "Instrumental (bass and guitar)",
    "chords": [
     "Em",
     "D6/9"
    ],
    "bars": 16
   },
   {
    "section": "Verse 3",
    "chords": [
     "Em",
     "D6/9"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "Em",
     "D6/9"
    ],
    "bars": 16
   },
   {
    "section": "Outro (chorus repeats, fade)",
    "chords": [
     "Em",
     "D6/9"
    ],
    "bars": 12
   }
  ]
 },
 "Knockin' on Heaven's Door": {
  "status": "corrected",
  "key": "G major",
  "bpm": 70,
  "beatsPerBar": 4,
  "durationSec": 150,
  "chords": [
   "G",
   "D",
   "Am",
   "G",
   "D",
   "C"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "G",
     "D",
     "Am",
     "Am",
     "G",
     "D",
     "C",
     "C"
    ],
    "per": 0.5,
    "bars": 4
   },
   {
    "section": "Verse 1",
    "chords": [
     "G",
     "D",
     "Am",
     "Am",
     "G",
     "D",
     "C",
     "C"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "G",
     "D",
     "Am",
     "Am",
     "G",
     "D",
     "C",
     "C"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "G",
     "D",
     "Am",
     "Am",
     "G",
     "D",
     "C",
     "C"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "G",
     "D",
     "Am",
     "Am",
     "G",
     "D",
     "C",
     "C"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Outro (chorus repeats, fade)",
    "chords": [
     "G",
     "D",
     "Am",
     "Am",
     "G",
     "D",
     "C",
     "C"
    ],
    "per": 0.5,
    "bars": 8
   }
  ]
 },
 "Wonderwall": {
  "status": "corrected",
  "key": "F# minor",
  "capoNote": "Capo 2, Em7-G-Dsus4-A7sus4 shapes (sounds F#m7-A-Esus4-B7sus4)",
  "bpm": 87,
  "beatsPerBar": 4,
  "durationSec": 258,
  "chords": [
   "F#m7",
   "A",
   "Esus4",
   "B7"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "F#m7",
     "A",
     "Esus4",
     "B7"
    ],
    "bars": 4
   },
   {
    "section": "Verse 1",
    "chords": [
     "F#m7",
     "A",
     "Esus4",
     "B7"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "F#m7",
     "A",
     "Esus4",
     "B7"
    ],
    "bars": 8
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "D",
     "E",
     "F#m7",
     "F#m7",
     "D",
     "E",
     "F#m7",
     "F#m7",
     "D",
     "E",
     "B7",
     "B7"
    ],
    "bars": 12
   },
   {
    "section": "Chorus",
    "chords": [
     "D",
     "F#m7",
     "A",
     "F#m7"
    ],
    "bars": 8
   },
   {
    "section": "Interlude",
    "chords": [
     "F#m7",
     "A",
     "Esus4",
     "B7"
    ],
    "bars": 4
   },
   {
    "section": "Verse 3",
    "chords": [
     "F#m7",
     "A",
     "Esus4",
     "B7"
    ],
    "bars": 8
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "D",
     "E",
     "F#m7",
     "F#m7",
     "D",
     "E",
     "F#m7",
     "F#m7",
     "D",
     "E",
     "B7",
     "B7"
    ],
    "bars": 12
   },
   {
    "section": "Chorus",
    "chords": [
     "D",
     "F#m7",
     "A",
     "F#m7"
    ],
    "bars": 8
   },
   {
    "section": "Chorus (repeat)",
    "chords": [
     "D",
     "F#m7",
     "A",
     "F#m7"
    ],
    "bars": 8
   },
   {
    "section": "Outro (strings and chorus loop, fade)",
    "chords": [
     "D",
     "F#m7",
     "A",
     "F#m7"
    ],
    "bars": 14
   }
  ]
 },
 "Love Yourself": {
  "status": "corrected",
  "key": "E major",
  "bpm": 100,
  "beatsPerBar": 4,
  "durationSec": 234,
  "chords": [
   "E",
   "B/D#",
   "C#m",
   "F#m7"
  ],
  "structure": [
   {
    "section": "Intro (guitar)",
    "chords": [
     "E",
     "B/D#",
     "C#m",
     "F#m7"
    ],
    "bars": 4
   },
   {
    "section": "Verse 1",
    "chords": [
     "E",
     "B/D#",
     "C#m",
     "F#m7"
    ],
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "C#m",
     "A",
     "E/B",
     "E/B"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "C#m",
     "A",
     "E/B",
     "E/B"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "E",
     "B/D#",
     "C#m",
     "F#m7"
    ],
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "C#m",
     "A",
     "E/B",
     "E/B"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "C#m",
     "A",
     "E/B",
     "E/B"
    ],
    "bars": 8
   },
   {
    "section": "Trumpet solo",
    "chords": [
     "E",
     "B/D#",
     "C#m",
     "F#m7"
    ],
    "bars": 8
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "C#m",
     "A",
     "E/B",
     "E/B"
    ],
    "bars": 8
   },
   {
    "section": "Final chorus",
    "chords": [
     "C#m",
     "A",
     "E/B",
     "E/B"
    ],
    "bars": 8
   },
   {
    "section": "Outro",
    "chords": [
     "E",
     "B/D#",
     "C#m",
     "F#m7"
    ],
    "bars": 4
   }
  ],
  "solos": [
   {
    "section": "Trumpet solo",
    "scale": "E major pentatonic (on guitar: box 1 at the 12th fret or open position); C# minor pentatonic covers the same notes",
    "tips": "Play it softly with fingers rather than a pick to match the trumpet tone, and aim to land on the chord's root as each new chord arrives.",
    "chords": [
     "E",
     "B/D#",
     "C#m",
     "F#m7"
    ]
   }
  ]
 },
 "Count on Me": {
  "status": "corrected",
  "key": "C major",
  "bpm": 89,
  "beatsPerBar": 4,
  "durationSec": 197,
  "chords": [
   "C",
   "Em",
   "Am",
   "G",
   "F"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "C",
     "Em",
     "Am",
     "G"
    ],
    "bars": 4
   },
   {
    "section": "Verse 1",
    "chords": [
     "C",
     "Em",
     "Am",
     "G"
    ],
    "bars": 8
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "F",
     "G",
     "Em",
     "Am",
     "F",
     "G",
     "G",
     "G"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "C",
     "Em",
     "Am",
     "G",
     "C",
     "Em",
     "Am",
     "G",
     "F",
     "G",
     "C",
     "C"
    ],
    "bars": 12
   },
   {
    "section": "Verse 2",
    "chords": [
     "C",
     "Em",
     "Am",
     "G"
    ],
    "bars": 8
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "F",
     "G",
     "Em",
     "Am",
     "F",
     "G",
     "G",
     "G"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "C",
     "Em",
     "Am",
     "G",
     "C",
     "Em",
     "Am",
     "G",
     "F",
     "G",
     "C",
     "C"
    ],
    "bars": 12
   },
   {
    "section": "Bridge",
    "chords": [
     "Dm",
     "Em",
     "Am",
     "G",
     "Dm",
     "Em",
     "F",
     "G"
    ],
    "bars": 8
   },
   {
    "section": "Final chorus",
    "chords": [
     "C",
     "Em",
     "Am",
     "G",
     "C",
     "Em",
     "Am",
     "G"
    ],
    "bars": 8
   },
   {
    "section": "Outro",
    "chords": [
     "F",
     "G",
     "C",
     "C"
    ],
    "bars": 4
   }
  ]
 },
 "Zombie": {
  "status": "corrected",
  "key": "E minor",
  "bpm": 84,
  "beatsPerBar": 4,
  "durationSec": 306,
  "chords": [
   "Em",
   "Cmaj7",
   "G",
   "D/F#"
  ],
  "structure": [
   {
    "section": "Intro (distorted guitar)",
    "chords": [
     "Em",
     "Cmaj7",
     "G",
     "D/F#"
    ],
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "Em",
     "Cmaj7",
     "G",
     "D/F#"
    ],
    "bars": 8
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Em",
     "Cmaj7",
     "G",
     "D/F#"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "Em",
     "Cmaj7",
     "G",
     "D/F#"
    ],
    "bars": 8
   },
   {
    "section": "Post-chorus (wordless vocal)",
    "chords": [
     "Em",
     "Cmaj7",
     "G",
     "D/F#"
    ],
    "bars": 8
   },
   {
    "section": "Interlude (guitar riff)",
    "chords": [
     "Em",
     "Cmaj7",
     "G",
     "D/F#"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "Em",
     "Cmaj7",
     "G",
     "D/F#"
    ],
    "bars": 8
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Em",
     "Cmaj7",
     "G",
     "D/F#"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "Em",
     "Cmaj7",
     "G",
     "D/F#"
    ],
    "bars": 8
   },
   {
    "section": "Post-chorus (wordless vocal)",
    "chords": [
     "Em",
     "Cmaj7",
     "G",
     "D/F#"
    ],
    "bars": 8
   },
   {
    "section": "Guitar solo / instrumental break",
    "chords": [
     "Em",
     "Cmaj7",
     "G",
     "D/F#"
    ],
    "bars": 12
   },
   {
    "section": "Final chorus",
    "chords": [
     "Em",
     "Cmaj7",
     "G",
     "D/F#"
    ],
    "bars": 8
   },
   {
    "section": "Outro",
    "chords": [
     "Em",
     "Cmaj7",
     "G",
     "D/F#"
    ],
    "bars": 9
   }
  ],
  "solos": [
   {
    "section": "Guitar solo / instrumental break",
    "scale": "E minor pentatonic, box 1 at the 12th fret (or open position); add F# for E natural minor colour",
    "tips": "Lean on long sustained notes with heavy distortion rather than fast runs, and target E over Em and B over Cmaj7 to stay with the moody feel.",
    "chords": [
     "Em",
     "Cmaj7",
     "G",
     "D/F#"
    ]
   }
  ]
 },
 "Hey Soul Sister": {
  "status": "corrected",
  "key": "E major",
  "tuning": "standard (ukulele part in standard GCEA)",
  "bpm": 97,
  "beatsPerBar": 4,
  "durationSec": 217,
  "chords": [
   "E",
   "B",
   "C#m",
   "A"
  ],
  "structure": [
   {
    "section": "Intro (ukulele)",
    "chords": [
     "E",
     "B",
     "C#m",
     "A"
    ],
    "bars": 4
   },
   {
    "section": "Verse 1",
    "chords": [
     "E",
     "B",
     "C#m",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "E",
     "B",
     "C#m",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "A",
     "B",
     "E",
     "B"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "E",
     "B",
     "C#m",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "E",
     "B",
     "C#m",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "A",
     "B",
     "E",
     "B"
    ],
    "bars": 8
   },
   {
    "section": "Interlude (ukulele)",
    "chords": [
     "E",
     "B",
     "C#m",
     "A"
    ],
    "bars": 4
   },
   {
    "section": "Bridge",
    "chords": [
     "C#m",
     "A",
     "E",
     "B"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "A",
     "B",
     "E",
     "B"
    ],
    "bars": 8
   },
   {
    "section": "Chorus (repeat)",
    "chords": [
     "A",
     "B",
     "E",
     "B"
    ],
    "bars": 8
   },
   {
    "section": "Outro",
    "chords": [
     "E",
     "B",
     "C#m",
     "A"
    ],
    "bars": 4
   }
  ]
 },
 "Viva La Vida": {
  "status": "corrected",
  "key": "Ab major",
  "capoNote": "Capo 1, C-D-G-Em shapes (sounds Db-Eb-Ab-Fm)",
  "bpm": 138,
  "beatsPerBar": 4,
  "durationSec": 242,
  "chords": [
   "Db",
   "Eb",
   "Ab",
   "Fm"
  ],
  "structure": [
   {
    "section": "Intro (strings)",
    "chords": [
     "Db",
     "Eb",
     "Ab",
     "Fm"
    ],
    "bars": 16
   },
   {
    "section": "Verse 1",
    "chords": [
     "Db",
     "Eb",
     "Ab",
     "Fm"
    ],
    "bars": 16
   },
   {
    "section": "Verse 2",
    "chords": [
     "Db",
     "Eb",
     "Ab",
     "Fm"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "Db",
     "Eb7",
     "Ab",
     "Fm"
    ],
    "bars": 16
   },
   {
    "section": "Interlude (strings)",
    "chords": [
     "Db",
     "Eb",
     "Ab",
     "Fm"
    ],
    "bars": 8
   },
   {
    "section": "Verse 3",
    "chords": [
     "Db",
     "Eb",
     "Ab",
     "Fm"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "Db",
     "Eb7",
     "Ab",
     "Fm"
    ],
    "bars": 16
   },
   {
    "section": "Bridge (wordless vocals)",
    "chords": [
     "Db",
     "Fm",
     "Db",
     "Fm",
     "Db",
     "Fm",
     "Eb",
     "Eb"
    ],
    "bars": 16
   },
   {
    "section": "Final chorus",
    "chords": [
     "Db",
     "Eb7",
     "Ab",
     "Fm"
    ],
    "bars": 16
   },
   {
    "section": "Outro",
    "chords": [
     "Db",
     "Eb",
     "Ab",
     "Fm"
    ],
    "bars": 4
   }
  ]
 },
 "Let It Go": {
  "status": "corrected",
  "key": "Ab major (verses in relative F minor)",
  "capoNote": "Capo 1, play Em-C-D-G family shapes (sound as Fm-Db-Eb-Ab)",
  "bpm": 137,
  "beatsPerBar": 4,
  "durationSec": 224,
  "chords": [
   "Ab",
   "Eb",
   "Fm",
   "Db"
  ],
  "structure": [
   {
    "section": "Intro (piano)",
    "chords": [
     "Fm",
     "Dbmaj7",
     "Ebsus4",
     "Bbsus4"
    ],
    "per": 2,
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "Fm",
     "Dbmaj7",
     "Eb",
     "Bbsus4"
    ],
    "per": 2,
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Eb",
     "Db"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "Ab",
     "Eb",
     "Fm",
     "Db"
    ],
    "bars": 16
   },
   {
    "section": "Verse 2",
    "chords": [
     "Fm",
     "Dbmaj7",
     "Eb",
     "Bbsus4"
    ],
    "per": 2,
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Eb",
     "Db"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "Ab",
     "Eb",
     "Fm",
     "Db"
    ],
    "bars": 18
   },
   {
    "section": "Bridge",
    "chords": [
     "Db",
     "Db7"
    ],
    "per": 2,
    "bars": 12
   },
   {
    "section": "Instrumental build",
    "chords": [
     "Db",
     "Dbm6"
    ],
    "per": 2,
    "bars": 8
   },
   {
    "section": "Final chorus",
    "chords": [
     "Ab",
     "Eb",
     "Fm",
     "Db"
    ],
    "bars": 18
   },
   {
    "section": "Outro",
    "chords": [
     "Fm",
     "Db",
     "Eb",
     "Ab"
    ],
    "bars": 4
   }
  ]
 },
 "Budapest": {
  "status": "corrected",
  "key": "F major",
  "capoNote": "Capo 3, D shapes (D-G-A sound as F-Bb-C) or play open F/Bb/C",
  "bpm": 128,
  "beatsPerBar": 4,
  "durationSec": 201,
  "chords": [
   "F",
   "Bb",
   "C"
  ],
  "structure": [
   {
    "section": "Intro (guitar)",
    "chords": [
     "F"
    ],
    "bars": 4
   },
   {
    "section": "Verse 1",
    "chords": [
     "F",
     "F",
     "F",
     "F",
     "Bb",
     "Bb",
     "F",
     "F"
    ],
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Bb",
     "Bb",
     "F",
     "F"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "C",
     "Bb",
     "F",
     "F"
    ],
    "bars": 8
   },
   {
    "section": "Post-chorus (vocal hook)",
    "chords": [
     "F",
     "Bb",
     "F",
     "F"
    ],
    "bars": 4
   },
   {
    "section": "Verse 2",
    "chords": [
     "F",
     "F",
     "F",
     "F",
     "Bb",
     "Bb",
     "F",
     "F"
    ],
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Bb",
     "Bb",
     "F",
     "F"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "C",
     "Bb",
     "F",
     "F"
    ],
    "bars": 8
   },
   {
    "section": "Post-chorus (vocal hook)",
    "chords": [
     "F",
     "Bb",
     "F",
     "F"
    ],
    "bars": 4
   },
   {
    "section": "Breakdown (quiet verse)",
    "chords": [
     "F",
     "F",
     "F",
     "F",
     "Bb",
     "Bb",
     "F",
     "F"
    ],
    "bars": 8
   },
   {
    "section": "Chorus x2",
    "chords": [
     "C",
     "Bb",
     "F",
     "F"
    ],
    "bars": 16
   },
   {
    "section": "Outro",
    "chords": [
     "F",
     "Bb",
     "F",
     "F"
    ],
    "bars": 4
   }
  ]
 },
 "Banana Pancakes": {
  "status": "uncertain",
  "key": "G major",
  "bpm": 113,
  "beatsPerBar": 4,
  "durationSec": 192,
  "chords": [
   "G7",
   "D7",
   "Am7",
   "C7"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "G7",
     "D7",
     "Am7",
     "C7"
    ],
    "per": 0.5,
    "bars": 4
   },
   {
    "section": "Verse 1",
    "chords": [
     "G7",
     "D7",
     "Am7",
     "C7"
    ],
    "per": 0.5,
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "G7",
     "D7",
     "Am7",
     "C7"
    ],
    "per": 2,
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "G7",
     "D7",
     "Am7",
     "C7"
    ],
    "per": 0.5,
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "G7",
     "D7",
     "Am7",
     "C7"
    ],
    "per": 2,
    "bars": 8
   },
   {
    "section": "Bridge",
    "chords": [
     "Am7",
     "D7",
     "Bm7",
     "Em7",
     "Am7",
     "D7",
     "C",
     "D7"
    ],
    "bars": 8
   },
   {
    "section": "Verse 3",
    "chords": [
     "G7",
     "D7",
     "Am7",
     "C7"
    ],
    "per": 0.5,
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "G7",
     "D7",
     "Am7",
     "C7"
    ],
    "per": 2,
    "bars": 8
   },
   {
    "section": "Outro",
    "chords": [
     "G7",
     "D7",
     "Am7",
     "C7"
    ],
    "per": 0.5,
    "bars": 4
   }
  ]
 },
 "Can You Feel the Love Tonight": {
  "status": "corrected",
  "key": "Bb major",
  "capoNote": "Capo 3, G shapes",
  "bpm": 62,
  "beatsPerBar": 4,
  "durationSec": 241,
  "chords": [
   "Bb",
   "F/A",
   "Gm",
   "Eb"
  ],
  "structure": [
   {
    "section": "Piano intro",
    "chords": [
     "Bb",
     "F/A",
     "Eb/G",
     "Bb/F",
     "Eb",
     "Eb",
     "F",
     "F"
    ],
    "per": 0.5,
    "bars": 4
   },
   {
    "section": "Verse 1",
    "chords": [
     "Eb",
     "Bb/D",
     "Eb",
     "Bb/D",
     "Eb",
     "Bb/D",
     "Cm",
     "F"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "Bb",
     "F/A",
     "Gm",
     "Eb",
     "Bb",
     "Eb",
     "Cm",
     "F"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "Eb",
     "Bb/D",
     "Eb",
     "Bb/D",
     "Eb",
     "Bb/D",
     "Cm",
     "F"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "Bb",
     "F/A",
     "Gm",
     "Eb",
     "Bb",
     "Eb",
     "Cm",
     "F"
    ],
    "bars": 8
   },
   {
    "section": "Bridge",
    "chords": [
     "Gm",
     "Eb",
     "Cm",
     "F"
    ],
    "per": 2,
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "Bb",
     "F/A",
     "Gm",
     "Eb",
     "Bb",
     "Eb",
     "Cm",
     "F"
    ],
    "bars": 8
   },
   {
    "section": "Final chorus",
    "chords": [
     "Bb",
     "F/A",
     "Gm",
     "Eb",
     "Bb",
     "Eb",
     "Cm",
     "F"
    ],
    "bars": 8
   },
   {
    "section": "Outro",
    "chords": [
     "Eb",
     "F",
     "Bb",
     "Bb"
    ],
    "bars": 4
   }
  ]
 },
 "Sweet Caroline": {
  "status": "corrected",
  "key": "B major",
  "capoNote": "Capo 4, G shapes",
  "bpm": 127,
  "beatsPerBar": 4,
  "durationSec": 204,
  "chords": [
   "B",
   "E",
   "F#",
   "G#m"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "B",
     "B",
     "E",
     "E",
     "B",
     "B",
     "F#",
     "F#"
    ],
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "B",
     "B",
     "E",
     "E",
     "B",
     "B",
     "F#",
     "F#"
    ],
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "B",
     "G#m/B",
     "F#7",
     "F#7",
     "E",
     "E",
     "F#",
     "F#"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "B",
     "B",
     "E",
     "E",
     "F#",
     "F#",
     "F#",
     "F#",
     "B",
     "B",
     "E",
     "E",
     "F#",
     "F#",
     "E",
     "F#"
    ],
    "bars": 16
   },
   {
    "section": "Verse 2",
    "chords": [
     "B",
     "B",
     "E",
     "E",
     "B",
     "B",
     "F#",
     "F#"
    ],
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "B",
     "G#m/B",
     "F#7",
     "F#7",
     "E",
     "E",
     "F#",
     "F#"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "B",
     "B",
     "E",
     "E",
     "F#",
     "F#",
     "F#",
     "F#",
     "B",
     "B",
     "E",
     "E",
     "F#",
     "F#",
     "E",
     "F#"
    ],
    "bars": 16
   },
   {
    "section": "Chorus repeat",
    "chords": [
     "B",
     "B",
     "E",
     "E",
     "F#",
     "F#",
     "F#",
     "F#",
     "B",
     "B",
     "E",
     "E",
     "F#",
     "F#",
     "E",
     "F#"
    ],
    "bars": 16
   },
   {
    "section": "Outro (fade)",
    "chords": [
     "B",
     "B",
     "E",
     "F#"
    ],
    "bars": 4
   }
  ]
 },
 "Livin' on a Prayer": {
  "status": "corrected",
  "key": "E minor (final choruses modulate to G minor)",
  "bpm": 123,
  "beatsPerBar": 4,
  "durationSec": 244,
  "chords": [
   "Em",
   "C",
   "D",
   "G"
  ],
  "structure": [
   {
    "section": "Intro (synth, then bass and talk-box riff)",
    "chords": [
     "Em",
     "Em",
     "C",
     "D"
    ],
    "bars": 16
   },
   {
    "section": "Verse 1",
    "chords": [
     "Em",
     "Em",
     "C",
     "D"
    ],
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "C",
     "D",
     "Em",
     "Em",
     "C",
     "D",
     "Em",
     "D"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "Em",
     "Em",
     "C",
     "D",
     "G",
     "G",
     "C",
     "D"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "Em",
     "Em",
     "C",
     "D"
    ],
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "C",
     "D",
     "Em",
     "Em",
     "C",
     "D",
     "Em",
     "D"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "Em",
     "Em",
     "C",
     "D",
     "G",
     "G",
     "C",
     "D"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Guitar solo",
    "chords": [
     "Em",
     "Em",
     "C",
     "D"
    ],
    "bars": 16
   },
   {
    "section": "Final chorus (key change up to G minor)",
    "chords": [
     "Gm",
     "Gm",
     "Eb",
     "F",
     "Bb",
     "Bb",
     "Eb",
     "F"
    ],
    "per": 0.5,
    "bars": 24
   },
   {
    "section": "Outro (fade, G minor)",
    "chords": [
     "Gm",
     "Eb",
     "F",
     "Gm"
    ],
    "bars": 4
   }
  ],
  "solos": [
   {
    "section": "Guitar solo",
    "scale": "E minor pentatonic, box 1 at the 12th fret (or open position); add F# and C from E natural minor for colour",
    "tips": "Target the root note E whenever the backing returns to Em, and aim for D or F# when it moves to D. Use wide bends and a little vibrato on held notes for an arena-rock feel.",
    "chords": [
     "Em",
     "Em",
     "C",
     "D"
    ]
   }
  ]
 },
 "I Will Survive": {
  "status": "corrected",
  "key": "A minor",
  "bpm": 116,
  "beatsPerBar": 4,
  "durationSec": 195,
  "chords": [
   "Am",
   "Dm7",
   "G",
   "Cmaj7",
   "Fmaj7",
   "Bm7b5",
   "Esus4",
   "E"
  ],
  "structure": [
   {
    "section": "Intro (free-time piano and vocal, first verse)",
    "chords": [
     "Am",
     "Dm7",
     "G",
     "Cmaj7",
     "Fmaj7",
     "Bm7b5",
     "Esus4",
     "E"
    ],
    "bars": 12
   },
   {
    "section": "Verse 1",
    "chords": [
     "Am",
     "Dm7",
     "G",
     "Cmaj7",
     "Fmaj7",
     "Bm7b5",
     "Esus4",
     "E"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "Am",
     "Dm7",
     "G",
     "Cmaj7",
     "Fmaj7",
     "Bm7b5",
     "Esus4",
     "E"
    ],
    "bars": 16
   },
   {
    "section": "Verse 2",
    "chords": [
     "Am",
     "Dm7",
     "G",
     "Cmaj7",
     "Fmaj7",
     "Bm7b5",
     "Esus4",
     "E"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "Am",
     "Dm7",
     "G",
     "Cmaj7",
     "Fmaj7",
     "Bm7b5",
     "Esus4",
     "E"
    ],
    "bars": 16
   },
   {
    "section": "Instrumental break",
    "chords": [
     "Am",
     "Dm7",
     "G",
     "Cmaj7",
     "Fmaj7",
     "Bm7b5",
     "Esus4",
     "E"
    ],
    "bars": 8
   },
   {
    "section": "Outro chorus (fade)",
    "chords": [
     "Am",
     "Dm7",
     "G",
     "Cmaj7",
     "Fmaj7",
     "Bm7b5",
     "Esus4",
     "E"
    ],
    "bars": 8
   }
  ]
 },
 "Mr. Brightside": {
  "status": "corrected",
  "key": "Db major",
  "capoNote": "Capo 1, C shapes (C-Cmaj7-F verse, F-C-Am7-G chorus)",
  "bpm": 148,
  "beatsPerBar": 4,
  "durationSec": 222,
  "chords": [
   "Db",
   "Gb",
   "Bbm7",
   "Ab"
  ],
  "structure": [
   {
    "section": "Intro (guitar riff)",
    "chords": [
     "Db",
     "Dbmaj7",
     "Gb",
     "Gb"
    ],
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "Db",
     "Dbmaj7",
     "Gb",
     "Gb"
    ],
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Bbm",
     "Absus4",
     "Gb",
     "Gb"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "Db",
     "Gb",
     "Bbm7",
     "Ab"
    ],
    "bars": 16
   },
   {
    "section": "Interlude (riff)",
    "chords": [
     "Db",
     "Dbmaj7",
     "Gb",
     "Gb"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2 (repeat of verse 1)",
    "chords": [
     "Db",
     "Dbmaj7",
     "Gb",
     "Gb"
    ],
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Bbm",
     "Absus4",
     "Gb",
     "Gb"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "Db",
     "Gb",
     "Bbm7",
     "Ab"
    ],
    "bars": 16
   },
   {
    "section": "Outro (lead guitar over chorus chords)",
    "chords": [
     "Db",
     "Gb",
     "Bbm7",
     "Ab"
    ],
    "bars": 16
   },
   {
    "section": "Ending",
    "chords": [
     "Db",
     "Gb",
     "Bbm7",
     "Ab"
    ],
    "bars": 8
   }
  ],
  "solos": [
   {
    "section": "Outro (lead guitar over chorus chords)",
    "scale": "Db major pentatonic (same shapes as Bb minor pentatonic, box 1 at 6th fret); Db major scale for passing notes",
    "tips": "Let notes ring and repeat a short motif rather than playing fast runs. Land on Db over the Db chord and on Ab or C over the Ab chord to match the changes.",
    "chords": [
     "Db",
     "Gb",
     "Bbm7",
     "Ab"
    ]
   }
  ]
 },
 "Dancing Queen": {
  "status": "uncertain",
  "key": "A major",
  "bpm": 100,
  "beatsPerBar": 4,
  "durationSec": 230,
  "chords": [
   "A",
   "D/A",
   "F#m",
   "E"
  ],
  "structure": [
   {
    "section": "Intro (piano glissando and riff)",
    "chords": [
     "A",
     "D/A"
    ],
    "bars": 4
   },
   {
    "section": "Opening refrain",
    "chords": [
     "A",
     "D/A",
     "A",
     "F#m",
     "B7",
     "B7",
     "E",
     "E"
    ],
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "A",
     "D",
     "A",
     "F#m",
     "E",
     "E",
     "E7",
     "E7"
    ],
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "D",
     "Bm",
     "E",
     "E"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "A",
     "D/A",
     "A",
     "D/A",
     "A",
     "F#m",
     "B7",
     "E"
    ],
    "bars": 16
   },
   {
    "section": "Verse 2",
    "chords": [
     "A",
     "D",
     "A",
     "F#m",
     "E",
     "E",
     "E7",
     "E7"
    ],
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "D",
     "Bm",
     "E",
     "E"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "A",
     "D/A",
     "A",
     "D/A",
     "A",
     "F#m",
     "B7",
     "E"
    ],
    "bars": 16
   },
   {
    "section": "Outro (riff, fade)",
    "chords": [
     "A",
     "D/A"
    ],
    "bars": 4
   }
  ]
 },
 "Summer Nights": {
  "status": "uncertain",
  "key": "D major",
  "bpm": 124,
  "beatsPerBar": 4,
  "durationSec": 217,
  "chords": [
   "D",
   "G",
   "A",
   "Em7"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "D",
     "G",
     "A",
     "A"
    ],
    "bars": 4
   },
   {
    "section": "Verse 1",
    "chords": [
     "D",
     "G",
     "A",
     "G"
    ],
    "bars": 16
   },
   {
    "section": "Refrain",
    "chords": [
     "D",
     "G",
     "A",
     "Em7",
     "D",
     "G",
     "E7",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "D",
     "G",
     "A",
     "G"
    ],
    "bars": 16
   },
   {
    "section": "Refrain",
    "chords": [
     "D",
     "G",
     "A",
     "Em7",
     "D",
     "G",
     "E7",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Verse 3",
    "chords": [
     "D",
     "G",
     "A",
     "G"
    ],
    "bars": 16
   },
   {
    "section": "Refrain",
    "chords": [
     "D",
     "G",
     "A",
     "Em7",
     "D",
     "G",
     "E7",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Verse 4",
    "chords": [
     "D",
     "G",
     "A",
     "G"
    ],
    "bars": 16
   },
   {
    "section": "Refrain",
    "chords": [
     "D",
     "G",
     "A",
     "Em7",
     "D",
     "G",
     "E7",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Final slow section (ritardando)",
    "chords": [
     "Bm",
     "G",
     "Em",
     "A"
    ],
    "per": 2,
    "bars": 8
   },
   {
    "section": "Outro",
    "chords": [
     "D",
     "G",
     "A",
     "D"
    ],
    "bars": 4
   }
  ]
 },
 "Africa": {
  "status": "verified",
  "key": "B major verses / A major chorus (intro riff in C# minor)",
  "bpm": 93,
  "beatsPerBar": 4,
  "durationSec": 279,
  "chords": [
   "F#m",
   "Dsus2",
   "A",
   "E"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "A",
     "G#m",
     "C#m7",
     "C#m7"
    ],
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "B",
     "D#m7",
     "G#m7",
     "B/F#",
     "G#m/D#",
     "G#m/D#"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "F#m",
     "Dsus2",
     "A",
     "E"
    ],
    "bars": 8
   },
   {
    "section": "Chorus lead-out",
    "chords": [
     "F#m",
     "Dsus2",
     "A",
     "C#m7",
     "E"
    ],
    "bars": 4
   },
   {
    "section": "Interlude",
    "chords": [
     "A",
     "G#m",
     "C#m7",
     "C#m7"
    ],
    "bars": 4
   },
   {
    "section": "Verse 2",
    "chords": [
     "B",
     "D#m7",
     "G#m7",
     "B/F#",
     "G#m/D#",
     "G#m/D#"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "F#m",
     "Dsus2",
     "A",
     "E"
    ],
    "bars": 8
   },
   {
    "section": "Chorus lead-out",
    "chords": [
     "F#m",
     "Dsus2",
     "A",
     "C#m7",
     "E"
    ],
    "bars": 4
   },
   {
    "section": "Instrumental solo",
    "chords": [
     "B",
     "D#m7",
     "G#m7",
     "B/F#",
     "G#m/D#",
     "G#m/D#"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "F#m",
     "Dsus2",
     "A",
     "E"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "F#m",
     "Dsus2",
     "A",
     "E"
    ],
    "bars": 8
   },
   {
    "section": "Outro",
    "chords": [
     "F#m",
     "Dsus2",
     "A",
     "C#m7",
     "E"
    ],
    "bars": 8
   }
  ],
  "solos": [
   {
    "section": "Instrumental solo",
    "scale": "B major pentatonic (B C# D# F# G#), box 1 at the 7th fret; G# minor pentatonic is the same notes",
    "tips": "Land on B or F# when the B chord comes round. Keep phrases short and melodic like the synth lead rather than fast runs.",
    "chords": [
     "B",
     "D#m7",
     "G#m7",
     "B/F#",
     "G#m/D#",
     "G#m/D#"
    ]
   }
  ]
 },
 "Bohemian Rhapsody": {
  "status": "corrected",
  "key": "Bb major (ballad), Eb major (guitar solo, hard rock, outro), A major opening of opera section",
  "bpm": 72,
  "beatsPerBar": 4,
  "durationSec": 355,
  "chords": [
   "Bb",
   "Gm",
   "Cm",
   "F7"
  ],
  "structure": [
   {
    "section": "Intro (a cappella)",
    "chords": [
     "Gm7",
     "C7",
     "F7",
     "Bb",
     "Gm7",
     "C7",
     "F7",
     "Bb",
     "Bb7",
     "Eb",
     "Bb",
     "F"
    ],
    "bars": 15
   },
   {
    "section": "Ballad verse 1",
    "chords": [
     "Bb",
     "Gm",
     "Cm",
     "Cm/Bb",
     "Am7b5",
     "D7",
     "Gm",
     "Gm/F",
     "Eb",
     "Bb/D",
     "Cm",
     "F7",
     "Eb",
     "Bb/D",
     "Fm",
     "Bb7",
     "Eb",
     "Bb"
    ],
    "bars": 18
   },
   {
    "section": "Ballad verse 2",
    "chords": [
     "Bb",
     "Gm",
     "Cm",
     "Cm/Bb",
     "Am7b5",
     "D7",
     "Gm",
     "Gm/F",
     "Eb",
     "Bb/D",
     "Fm",
     "Bb7",
     "Eb",
     "Ab"
    ],
    "bars": 14
   },
   {
    "section": "Guitar solo",
    "chords": [
     "Eb",
     "Bb/D",
     "Cm",
     "Gm",
     "Ab",
     "Eb/G",
     "Fm",
     "Bb7"
    ],
    "bars": 8
   },
   {
    "section": "Opera section",
    "chords": [
     "A",
     "A",
     "Ab",
     "A",
     "A",
     "Ab",
     "Bb",
     "Eb",
     "Bb",
     "F",
     "Bb",
     "Eb",
     "Ab",
     "Eb",
     "Bb",
     "Bb"
    ],
    "per": 0.5,
    "bars": 19
   },
   {
    "section": "Hard rock section",
    "chords": [
     "Eb",
     "Eb",
     "Db",
     "Eb",
     "Eb",
     "Db",
     "F",
     "Bb",
     "Eb",
     "Ab",
     "Eb",
     "F",
     "Bb",
     "Bb"
    ],
    "per": 0.5,
    "bars": 14
   },
   {
    "section": "Outro",
    "chords": [
     "Eb",
     "Bb/D",
     "Cm",
     "G/B",
     "Cm",
     "Gm",
     "Cm",
     "Gm",
     "Cm",
     "Fm",
     "Bb7",
     "Eb",
     "Ab",
     "Eb",
     "Ab",
     "Eb",
     "F",
     "F"
    ],
    "bars": 18
   }
  ],
  "solos": [
   {
    "section": "Guitar solo",
    "scale": "Eb major pentatonic / C minor pentatonic, box 1 at the 8th fret (C minor shape); add the Eb major scale for the singing melodic notes",
    "tips": "Think like a singer: play a slow, held melody with wide vibrato rather than fast licks. Aim for the root of each chord on the first beat of the bar so the line follows the changes.",
    "chords": [
     "Eb",
     "Bb/D",
     "Cm",
     "Gm",
     "Ab",
     "Eb/G",
     "Fm",
     "Bb7"
    ]
   }
  ]
 },
 "Autumn Leaves": {
  "status": "corrected",
  "key": "G minor (standard jazz/Real Book key; the original 1945 song is in E minor/G major)",
  "bpm": 130,
  "beatsPerBar": 4,
  "durationSec": 251,
  "chords": [
   "Cm7",
   "F7",
   "Bbmaj7",
   "Ebmaj7",
   "Am7b5",
   "D7",
   "Gm6"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "Am7b5",
     "D7",
     "Gm6",
     "Gm6"
    ],
    "bars": 4
   },
   {
    "section": "Head A1",
    "chords": [
     "Cm7",
     "F7",
     "Bbmaj7",
     "Ebmaj7",
     "Am7b5",
     "D7",
     "Gm6",
     "Gm6"
    ],
    "bars": 8
   },
   {
    "section": "Head A2",
    "chords": [
     "Cm7",
     "F7",
     "Bbmaj7",
     "Ebmaj7",
     "Am7b5",
     "D7",
     "Gm6",
     "Gm6"
    ],
    "bars": 8
   },
   {
    "section": "Head B",
    "chords": [
     "Am7b5",
     "D7",
     "Gm6",
     "Gm6",
     "Cm7",
     "F7",
     "Bbmaj7",
     "Ebmaj7"
    ],
    "bars": 8
   },
   {
    "section": "Head C",
    "chords": [
     "Am7b5",
     "Am7b5",
     "D7",
     "D7",
     "Gm7",
     "C7",
     "Fm7",
     "Bb7",
     "Ebmaj7",
     "Ebmaj7",
     "Am7b5",
     "D7",
     "Gm6",
     "Gm6",
     "Gm6",
     "Gm6"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Solo chorus 1 A1",
    "chords": [
     "Cm7",
     "F7",
     "Bbmaj7",
     "Ebmaj7",
     "Am7b5",
     "D7",
     "Gm6",
     "Gm6"
    ],
    "bars": 8
   },
   {
    "section": "Solo chorus 1 A2",
    "chords": [
     "Cm7",
     "F7",
     "Bbmaj7",
     "Ebmaj7",
     "Am7b5",
     "D7",
     "Gm6",
     "Gm6"
    ],
    "bars": 8
   },
   {
    "section": "Solo chorus 1 B",
    "chords": [
     "Am7b5",
     "D7",
     "Gm6",
     "Gm6",
     "Cm7",
     "F7",
     "Bbmaj7",
     "Ebmaj7"
    ],
    "bars": 8
   },
   {
    "section": "Solo chorus 1 C",
    "chords": [
     "Am7b5",
     "Am7b5",
     "D7",
     "D7",
     "Gm7",
     "C7",
     "Fm7",
     "Bb7",
     "Ebmaj7",
     "Ebmaj7",
     "Am7b5",
     "D7",
     "Gm6",
     "Gm6",
     "Gm6",
     "Gm6"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Solo chorus 2 A1",
    "chords": [
     "Cm7",
     "F7",
     "Bbmaj7",
     "Ebmaj7",
     "Am7b5",
     "D7",
     "Gm6",
     "Gm6"
    ],
    "bars": 8
   },
   {
    "section": "Solo chorus 2 A2",
    "chords": [
     "Cm7",
     "F7",
     "Bbmaj7",
     "Ebmaj7",
     "Am7b5",
     "D7",
     "Gm6",
     "Gm6"
    ],
    "bars": 8
   },
   {
    "section": "Solo chorus 2 B",
    "chords": [
     "Am7b5",
     "D7",
     "Gm6",
     "Gm6",
     "Cm7",
     "F7",
     "Bbmaj7",
     "Ebmaj7"
    ],
    "bars": 8
   },
   {
    "section": "Solo chorus 2 C",
    "chords": [
     "Am7b5",
     "Am7b5",
     "D7",
     "D7",
     "Gm7",
     "C7",
     "Fm7",
     "Bb7",
     "Ebmaj7",
     "Ebmaj7",
     "Am7b5",
     "D7",
     "Gm6",
     "Gm6",
     "Gm6",
     "Gm6"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Head out A1",
    "chords": [
     "Cm7",
     "F7",
     "Bbmaj7",
     "Ebmaj7",
     "Am7b5",
     "D7",
     "Gm6",
     "Gm6"
    ],
    "bars": 8
   },
   {
    "section": "Head out A2",
    "chords": [
     "Cm7",
     "F7",
     "Bbmaj7",
     "Ebmaj7",
     "Am7b5",
     "D7",
     "Gm6",
     "Gm6"
    ],
    "bars": 8
   },
   {
    "section": "Head out B",
    "chords": [
     "Am7b5",
     "D7",
     "Gm6",
     "Gm6",
     "Cm7",
     "F7",
     "Bbmaj7",
     "Ebmaj7"
    ],
    "bars": 8
   },
   {
    "section": "Head out C",
    "chords": [
     "Am7b5",
     "Am7b5",
     "D7",
     "D7",
     "Gm7",
     "C7",
     "Fm7",
     "Bb7",
     "Ebmaj7",
     "Ebmaj7",
     "Am7b5",
     "D7",
     "Gm6",
     "Gm6",
     "Gm6",
     "Gm6"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Ending",
    "chords": [
     "Am7b5",
     "D7",
     "Gm6",
     "Gm6",
     "Gm6",
     "Gm6",
     "Gm6",
     "Gm6"
    ],
    "per": 0.5,
    "bars": 4
   }
  ],
  "solos": [
   {
    "section": "Solo chorus 1 / Solo chorus 2",
    "scale": "G natural minor = Bb major scale over the Cm7-F7-Bbmaj7-Ebmaj7 bars; G harmonic minor over Am7b5-D7-Gm6. Guitar: G minor pentatonic box 1 at the 3rd fret as a safe start.",
    "tips": "Target the 3rd of each chord on beat 1 (Eb on Cm7, A on F7, D on Bbmaj7). Switch to F# (from G harmonic minor) whenever D7 arrives.",
    "chords": [
     "Cm7",
     "F7",
     "Bbmaj7",
     "Ebmaj7",
     "Am7b5",
     "D7",
     "Gm6",
     "Gm6"
    ]
   }
  ]
 },
 "All the Things You Are": {
  "status": "corrected",
  "key": "Ab major (opens on Fm7; passes through C, Eb, G and E major)",
  "bpm": 160,
  "beatsPerBar": 4,
  "durationSec": 216,
  "chords": [
   "Fm7",
   "Bbm7",
   "Eb7",
   "Abmaj7"
  ],
  "structure": [
   {
    "section": "Head A1",
    "chords": [
     "Fm7",
     "Fm7",
     "Bbm7",
     "Bbm7",
     "Eb7",
     "Eb7",
     "Abmaj7",
     "Abmaj7",
     "Dbmaj7",
     "Dbmaj7",
     "Dm7",
     "G7",
     "Cmaj7",
     "Cmaj7",
     "Cmaj7",
     "Cmaj7"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Head A2",
    "chords": [
     "Cm7",
     "Cm7",
     "Fm7",
     "Fm7",
     "Bb7",
     "Bb7",
     "Ebmaj7",
     "Ebmaj7",
     "Abmaj7",
     "Abmaj7",
     "Am7b5",
     "D7",
     "Gmaj7",
     "Gmaj7",
     "Gmaj7",
     "Gmaj7"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Head Bridge",
    "chords": [
     "Am7",
     "D7",
     "Gmaj7",
     "Gmaj7",
     "F#m7b5",
     "B7",
     "Emaj7",
     "Caug"
    ],
    "bars": 8
   },
   {
    "section": "Head A3",
    "chords": [
     "Fm7",
     "Fm7",
     "Bbm7",
     "Bbm7",
     "Eb7",
     "Eb7",
     "Abmaj7",
     "Abmaj7",
     "Dbmaj7",
     "Dbmaj7",
     "Dbm7",
     "Dbm7",
     "Cm7",
     "Cm7",
     "Bdim7",
     "Bdim7",
     "Bbm7",
     "Bbm7",
     "Eb7",
     "Eb7",
     "Abmaj7",
     "Abmaj7",
     "Gm7b5",
     "C7"
    ],
    "per": 0.5,
    "bars": 12
   },
   {
    "section": "Solo chorus 1 A1",
    "chords": [
     "Fm7",
     "Fm7",
     "Bbm7",
     "Bbm7",
     "Eb7",
     "Eb7",
     "Abmaj7",
     "Abmaj7",
     "Dbmaj7",
     "Dbmaj7",
     "Dm7",
     "G7",
     "Cmaj7",
     "Cmaj7",
     "Cmaj7",
     "Cmaj7"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Solo chorus 1 A2",
    "chords": [
     "Cm7",
     "Cm7",
     "Fm7",
     "Fm7",
     "Bb7",
     "Bb7",
     "Ebmaj7",
     "Ebmaj7",
     "Abmaj7",
     "Abmaj7",
     "Am7b5",
     "D7",
     "Gmaj7",
     "Gmaj7",
     "Gmaj7",
     "Gmaj7"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Solo chorus 1 Bridge",
    "chords": [
     "Am7",
     "D7",
     "Gmaj7",
     "Gmaj7",
     "F#m7b5",
     "B7",
     "Emaj7",
     "Caug"
    ],
    "bars": 8
   },
   {
    "section": "Solo chorus 1 A3",
    "chords": [
     "Fm7",
     "Fm7",
     "Bbm7",
     "Bbm7",
     "Eb7",
     "Eb7",
     "Abmaj7",
     "Abmaj7",
     "Dbmaj7",
     "Dbmaj7",
     "Dbm7",
     "Dbm7",
     "Cm7",
     "Cm7",
     "Bdim7",
     "Bdim7",
     "Bbm7",
     "Bbm7",
     "Eb7",
     "Eb7",
     "Abmaj7",
     "Abmaj7",
     "Gm7b5",
     "C7"
    ],
    "per": 0.5,
    "bars": 12
   },
   {
    "section": "Solo chorus 2 A1",
    "chords": [
     "Fm7",
     "Fm7",
     "Bbm7",
     "Bbm7",
     "Eb7",
     "Eb7",
     "Abmaj7",
     "Abmaj7",
     "Dbmaj7",
     "Dbmaj7",
     "Dm7",
     "G7",
     "Cmaj7",
     "Cmaj7",
     "Cmaj7",
     "Cmaj7"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Solo chorus 2 A2",
    "chords": [
     "Cm7",
     "Cm7",
     "Fm7",
     "Fm7",
     "Bb7",
     "Bb7",
     "Ebmaj7",
     "Ebmaj7",
     "Abmaj7",
     "Abmaj7",
     "Am7b5",
     "D7",
     "Gmaj7",
     "Gmaj7",
     "Gmaj7",
     "Gmaj7"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Solo chorus 2 Bridge",
    "chords": [
     "Am7",
     "D7",
     "Gmaj7",
     "Gmaj7",
     "F#m7b5",
     "B7",
     "Emaj7",
     "Caug"
    ],
    "bars": 8
   },
   {
    "section": "Solo chorus 2 A3",
    "chords": [
     "Fm7",
     "Fm7",
     "Bbm7",
     "Bbm7",
     "Eb7",
     "Eb7",
     "Abmaj7",
     "Abmaj7",
     "Dbmaj7",
     "Dbmaj7",
     "Dbm7",
     "Dbm7",
     "Cm7",
     "Cm7",
     "Bdim7",
     "Bdim7",
     "Bbm7",
     "Bbm7",
     "Eb7",
     "Eb7",
     "Abmaj7",
     "Abmaj7",
     "Gm7b5",
     "C7"
    ],
    "per": 0.5,
    "bars": 12
   },
   {
    "section": "Head out A1",
    "chords": [
     "Fm7",
     "Fm7",
     "Bbm7",
     "Bbm7",
     "Eb7",
     "Eb7",
     "Abmaj7",
     "Abmaj7",
     "Dbmaj7",
     "Dbmaj7",
     "Dm7",
     "G7",
     "Cmaj7",
     "Cmaj7",
     "Cmaj7",
     "Cmaj7"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Head out A2",
    "chords": [
     "Cm7",
     "Cm7",
     "Fm7",
     "Fm7",
     "Bb7",
     "Bb7",
     "Ebmaj7",
     "Ebmaj7",
     "Abmaj7",
     "Abmaj7",
     "Am7b5",
     "D7",
     "Gmaj7",
     "Gmaj7",
     "Gmaj7",
     "Gmaj7"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Head out Bridge",
    "chords": [
     "Am7",
     "D7",
     "Gmaj7",
     "Gmaj7",
     "F#m7b5",
     "B7",
     "Emaj7",
     "Caug"
    ],
    "bars": 8
   },
   {
    "section": "Head out A3",
    "chords": [
     "Fm7",
     "Fm7",
     "Bbm7",
     "Bbm7",
     "Eb7",
     "Eb7",
     "Abmaj7",
     "Abmaj7",
     "Dbmaj7",
     "Dbmaj7",
     "Dbm7",
     "Dbm7",
     "Cm7",
     "Cm7",
     "Bdim7",
     "Bdim7",
     "Bbm7",
     "Bbm7",
     "Eb7",
     "Eb7",
     "Abmaj7",
     "Abmaj7",
     "Gm7b5",
     "C7"
    ],
    "per": 0.5,
    "bars": 12
   }
  ],
  "solos": [
   {
    "section": "Solo choruses",
    "scale": "Follow the key centres: Ab major (A1), Eb major (A2), G major then E major (bridge), Ab major (A3). Guitar: stay in one position around the 4th-6th fret and shift only the notes that change.",
    "tips": "Practise the guide tones (3rds and 7ths) of each chord first, one note per bar. Notice how often a single note is shared between two keys and use it to glide across the modulation.",
    "chords": [
     "Fm7",
     "Fm7",
     "Bbm7",
     "Bbm7",
     "Eb7",
     "Eb7",
     "Abmaj7",
     "Abmaj7",
     "Dbmaj7",
     "Dbmaj7",
     "Dm7",
     "G7",
     "Cmaj7",
     "Cmaj7",
     "Cmaj7",
     "Cmaj7"
    ]
   }
  ]
 },
 "Blue Bossa": {
  "status": "corrected",
  "key": "C minor (4 bars in Db major)",
  "bpm": 150,
  "beatsPerBar": 4,
  "durationSec": 483,
  "chords": [
   "Cm7",
   "Fm7",
   "Dm7b5",
   "G7"
  ],
  "structure": [
   {
    "section": "Head (played twice)",
    "chords": [
     "Cm7",
     "Cm7",
     "Cm7",
     "Cm7",
     "Fm7",
     "Fm7",
     "Fm7",
     "Fm7",
     "Dm7b5",
     "Dm7b5",
     "G7",
     "G7",
     "Cm7",
     "Cm7",
     "Cm7",
     "Cm7",
     "Ebm7",
     "Ebm7",
     "Ab7",
     "Ab7",
     "Dbmaj7",
     "Dbmaj7",
     "Dbmaj7",
     "Dbmaj7",
     "Dm7b5",
     "Dm7b5",
     "G7",
     "G7",
     "Cm7",
     "Cm7",
     "Dm7b5",
     "G7"
    ],
    "per": 0.5,
    "bars": 32
   },
   {
    "section": "Solos (trumpet, tenor sax, piano)",
    "chords": [
     "Cm7",
     "Cm7",
     "Cm7",
     "Cm7",
     "Fm7",
     "Fm7",
     "Fm7",
     "Fm7",
     "Dm7b5",
     "Dm7b5",
     "G7",
     "G7",
     "Cm7",
     "Cm7",
     "Cm7",
     "Cm7",
     "Ebm7",
     "Ebm7",
     "Ab7",
     "Ab7",
     "Dbmaj7",
     "Dbmaj7",
     "Dbmaj7",
     "Dbmaj7",
     "Dm7b5",
     "Dm7b5",
     "G7",
     "G7",
     "Cm7",
     "Cm7",
     "Dm7b5",
     "G7"
    ],
    "per": 0.5,
    "bars": 224
   },
   {
    "section": "Head out (played twice)",
    "chords": [
     "Cm7",
     "Cm7",
     "Cm7",
     "Cm7",
     "Fm7",
     "Fm7",
     "Fm7",
     "Fm7",
     "Dm7b5",
     "Dm7b5",
     "G7",
     "G7",
     "Cm7",
     "Cm7",
     "Cm7",
     "Cm7",
     "Ebm7",
     "Ebm7",
     "Ab7",
     "Ab7",
     "Dbmaj7",
     "Dbmaj7",
     "Dbmaj7",
     "Dbmaj7",
     "Dm7b5",
     "Dm7b5",
     "G7",
     "G7",
     "Cm7",
     "Cm7",
     "Dm7b5",
     "G7"
    ],
    "per": 0.5,
    "bars": 32
   },
   {
    "section": "Ending tag",
    "chords": [
     "Dm7b5",
     "G7",
     "Cm7",
     "Cm7"
    ],
    "bars": 4
   }
  ],
  "solos": [
   {
    "section": "Solos (trumpet, tenor sax, piano)",
    "scale": "C minor pentatonic / C natural minor (Eb major) over the C minor bars, C harmonic minor over Dm7b5-G7, Db major scale over Ebm7-Ab7-Dbmaj7. Guitar: C minor pentatonic box 1 at the 8th fret.",
    "tips": "Hear the Db bars coming and move your phrase up a half step (C becomes Db) to land in the new key. Use B natural over G7 to pull back to C minor.",
    "chords": [
     "Cm7",
     "Cm7",
     "Cm7",
     "Cm7",
     "Fm7",
     "Fm7",
     "Fm7",
     "Fm7",
     "Dm7b5",
     "Dm7b5",
     "G7",
     "G7",
     "Cm7",
     "Cm7",
     "Cm7",
     "Cm7",
     "Ebm7",
     "Ebm7",
     "Ab7",
     "Ab7",
     "Dbmaj7",
     "Dbmaj7",
     "Dbmaj7",
     "Dbmaj7",
     "Dm7b5",
     "Dm7b5",
     "G7",
     "G7",
     "Cm7",
     "Cm7",
     "Dm7b5",
     "G7"
    ]
   }
  ]
 },
 "There Will Never Be Another You": {
  "status": "corrected",
  "key": "Eb major",
  "bpm": 180,
  "beatsPerBar": 4,
  "durationSec": 181,
  "chords": [
   "Ebmaj7",
   "Dm7b5",
   "G7",
   "Cm7",
   "Bbm7",
   "Eb7",
   "Abmaj7",
   "Db7"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "Fm7",
     "Bb7",
     "Fm7",
     "Bb7"
    ],
    "bars": 4
   },
   {
    "section": "Head (bars 1-16)",
    "chords": [
     "Ebmaj7",
     "Ebmaj7",
     "Dm7b5",
     "G7",
     "Cm7",
     "Cm7",
     "Bbm7",
     "Eb7",
     "Abmaj7",
     "Db7",
     "Ebmaj7",
     "Cm7",
     "F7",
     "F7",
     "Fm7",
     "Bb7"
    ],
    "bars": 16
   },
   {
    "section": "Head (bars 17-32)",
    "chords": [
     "Ebmaj7",
     "Ebmaj7",
     "Ebmaj7",
     "Ebmaj7",
     "Dm7b5",
     "Dm7b5",
     "G7",
     "G7",
     "Cm7",
     "Cm7",
     "Cm7",
     "Cm7",
     "Bbm7",
     "Bbm7",
     "Eb7",
     "Eb7",
     "Abmaj7",
     "Abmaj7",
     "Db7",
     "Db7",
     "Ebmaj7",
     "Ebmaj7",
     "Gm7",
     "C7",
     "Fm7",
     "Fm7",
     "Bb7",
     "Bb7",
     "Eb6",
     "Eb6",
     "Fm7",
     "Bb7"
    ],
    "per": 0.5,
    "bars": 16
   },
   {
    "section": "Solo chorus 1 (bars 1-16)",
    "chords": [
     "Ebmaj7",
     "Ebmaj7",
     "Dm7b5",
     "G7",
     "Cm7",
     "Cm7",
     "Bbm7",
     "Eb7",
     "Abmaj7",
     "Db7",
     "Ebmaj7",
     "Cm7",
     "F7",
     "F7",
     "Fm7",
     "Bb7"
    ],
    "bars": 16
   },
   {
    "section": "Solo chorus 1 (bars 17-32)",
    "chords": [
     "Ebmaj7",
     "Ebmaj7",
     "Ebmaj7",
     "Ebmaj7",
     "Dm7b5",
     "Dm7b5",
     "G7",
     "G7",
     "Cm7",
     "Cm7",
     "Cm7",
     "Cm7",
     "Bbm7",
     "Bbm7",
     "Eb7",
     "Eb7",
     "Abmaj7",
     "Abmaj7",
     "Db7",
     "Db7",
     "Ebmaj7",
     "Ebmaj7",
     "Gm7",
     "C7",
     "Fm7",
     "Fm7",
     "Bb7",
     "Bb7",
     "Eb6",
     "Eb6",
     "Fm7",
     "Bb7"
    ],
    "per": 0.5,
    "bars": 16
   },
   {
    "section": "Solo chorus 2 (bars 1-16)",
    "chords": [
     "Ebmaj7",
     "Ebmaj7",
     "Dm7b5",
     "G7",
     "Cm7",
     "Cm7",
     "Bbm7",
     "Eb7",
     "Abmaj7",
     "Db7",
     "Ebmaj7",
     "Cm7",
     "F7",
     "F7",
     "Fm7",
     "Bb7"
    ],
    "bars": 16
   },
   {
    "section": "Solo chorus 2 (bars 17-32)",
    "chords": [
     "Ebmaj7",
     "Ebmaj7",
     "Ebmaj7",
     "Ebmaj7",
     "Dm7b5",
     "Dm7b5",
     "G7",
     "G7",
     "Cm7",
     "Cm7",
     "Cm7",
     "Cm7",
     "Bbm7",
     "Bbm7",
     "Eb7",
     "Eb7",
     "Abmaj7",
     "Abmaj7",
     "Db7",
     "Db7",
     "Ebmaj7",
     "Ebmaj7",
     "Gm7",
     "C7",
     "Fm7",
     "Fm7",
     "Bb7",
     "Bb7",
     "Eb6",
     "Eb6",
     "Fm7",
     "Bb7"
    ],
    "per": 0.5,
    "bars": 16
   },
   {
    "section": "Head out (bars 1-16)",
    "chords": [
     "Ebmaj7",
     "Ebmaj7",
     "Dm7b5",
     "G7",
     "Cm7",
     "Cm7",
     "Bbm7",
     "Eb7",
     "Abmaj7",
     "Db7",
     "Ebmaj7",
     "Cm7",
     "F7",
     "F7",
     "Fm7",
     "Bb7"
    ],
    "bars": 16
   },
   {
    "section": "Head out (bars 17-32)",
    "chords": [
     "Ebmaj7",
     "Ebmaj7",
     "Ebmaj7",
     "Ebmaj7",
     "Dm7b5",
     "Dm7b5",
     "G7",
     "G7",
     "Cm7",
     "Cm7",
     "Cm7",
     "Cm7",
     "Bbm7",
     "Bbm7",
     "Eb7",
     "Eb7",
     "Abmaj7",
     "Abmaj7",
     "Db7",
     "Db7",
     "Ebmaj7",
     "Ebmaj7",
     "Gm7",
     "C7",
     "Fm7",
     "Fm7",
     "Bb7",
     "Bb7",
     "Eb6",
     "Eb6",
     "Fm7",
     "Bb7"
    ],
    "per": 0.5,
    "bars": 16
   },
   {
    "section": "Ending",
    "chords": [
     "Fm7",
     "Bb7",
     "Eb6",
     "Eb6"
    ],
    "bars": 4
   }
  ],
  "solos": [
   {
    "section": "Solo choruses",
    "scale": "Eb major scale throughout; C harmonic minor over Dm7b5-G7; Eb major pentatonic is a safe start. Guitar: Eb major pattern at the 6th fret.",
    "tips": "Over Bbm7-Eb7 and Db7 swap D for Db (Eb mixolydian / Ab major colour). Keep eighth notes swung and aim for chord tones on beats 1 and 3.",
    "chords": [
     "Ebmaj7",
     "Ebmaj7",
     "Dm7b5",
     "G7",
     "Cm7",
     "Cm7",
     "Bbm7",
     "Eb7",
     "Abmaj7",
     "Db7",
     "Ebmaj7",
     "Cm7",
     "F7",
     "F7",
     "Fm7",
     "Bb7"
    ]
   }
  ]
 },
 "Misty": {
  "status": "corrected",
  "key": "Eb major",
  "bpm": 66,
  "beatsPerBar": 4,
  "durationSec": 196,
  "chords": [
   "Ebmaj7",
   "Bbm7",
   "Eb7",
   "Abmaj7",
   "Abm7",
   "Db7"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "Fm7",
     "Bb7",
     "Fm7",
     "Bb7"
    ],
    "per": 0.5,
    "bars": 2
   },
   {
    "section": "A1",
    "chords": [
     "Ebmaj7",
     "Ebmaj7",
     "Bbm7",
     "Eb7",
     "Abmaj7",
     "Abmaj7",
     "Abm7",
     "Db7",
     "Ebmaj7",
     "Cm7",
     "Fm7",
     "Bb7",
     "Gm7",
     "C7",
     "Fm7",
     "Bb7"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "A2",
    "chords": [
     "Ebmaj7",
     "Ebmaj7",
     "Bbm7",
     "Eb7",
     "Abmaj7",
     "Abmaj7",
     "Abm7",
     "Db7",
     "Ebmaj7",
     "Cm7",
     "Fm7",
     "Bb7",
     "Eb6",
     "Eb6",
     "Eb6",
     "Eb6"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Bridge",
    "chords": [
     "Bbm7",
     "Bbm7",
     "Eb7",
     "Eb7",
     "Abmaj7",
     "Abmaj7",
     "Abmaj7",
     "Abmaj7",
     "Am7",
     "Am7",
     "D7",
     "D7",
     "Gm7",
     "C7",
     "Fm7",
     "Bb7"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "A3",
    "chords": [
     "Ebmaj7",
     "Ebmaj7",
     "Bbm7",
     "Eb7",
     "Abmaj7",
     "Abmaj7",
     "Abm7",
     "Db7",
     "Ebmaj7",
     "Cm7",
     "Fm7",
     "Bb7",
     "Eb6",
     "Eb6",
     "Eb6",
     "Eb6"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Second half: Bridge",
    "chords": [
     "Bbm7",
     "Bbm7",
     "Eb7",
     "Eb7",
     "Abmaj7",
     "Abmaj7",
     "Abmaj7",
     "Abmaj7",
     "Am7",
     "Am7",
     "D7",
     "D7",
     "Gm7",
     "C7",
     "Fm7",
     "Bb7"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Second half: A3",
    "chords": [
     "Ebmaj7",
     "Ebmaj7",
     "Bbm7",
     "Eb7",
     "Abmaj7",
     "Abmaj7",
     "Abm7",
     "Db7",
     "Ebmaj7",
     "Cm7",
     "Fm7",
     "Bb7",
     "Eb6",
     "Eb6",
     "Eb6",
     "Eb6"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Tag ending",
    "chords": [
     "Fm7",
     "Bb7",
     "Gm7",
     "C7",
     "Fm7",
     "Bb7",
     "Ebmaj7",
     "Ebmaj7"
    ],
    "per": 0.5,
    "bars": 4
   }
  ]
 },
 "Take the A Train": {
  "status": "corrected",
  "key": "C major (modulates to Eb major for the last chorus)",
  "bpm": 169,
  "beatsPerBar": 4,
  "durationSec": 170,
  "chords": [
   "C6",
   "D7b5",
   "Dm7",
   "G7"
  ],
  "structure": [
   {
    "section": "Piano intro",
    "chords": [
     "C6",
     "D7b5"
    ],
    "per": 2,
    "bars": 4
   },
   {
    "section": "Chorus 1 - melody (AABA, C)",
    "chords": [
     "C6",
     "C6",
     "D7b5",
     "D7b5",
     "Dm7",
     "G7",
     "C6",
     "G7",
     "C6",
     "C6",
     "D7b5",
     "D7b5",
     "Dm7",
     "G7",
     "C6",
     "C6",
     "Fmaj7",
     "Fmaj7",
     "Fmaj7",
     "Fmaj7",
     "D7",
     "D7",
     "Dm7",
     "G7",
     "C6",
     "C6",
     "D7b5",
     "D7b5",
     "Dm7",
     "G7",
     "C6",
     "C6"
    ],
    "bars": 32
   },
   {
    "section": "Chorus 2 - trumpet solo (AABA, C)",
    "chords": [
     "C6",
     "C6",
     "D7b5",
     "D7b5",
     "Dm7",
     "G7",
     "C6",
     "G7",
     "C6",
     "C6",
     "D7b5",
     "D7b5",
     "Dm7",
     "G7",
     "C6",
     "C6",
     "Fmaj7",
     "Fmaj7",
     "Fmaj7",
     "Fmaj7",
     "D7",
     "D7",
     "Dm7",
     "G7",
     "C6",
     "C6",
     "D7b5",
     "D7b5",
     "Dm7",
     "G7",
     "C6",
     "C6"
    ],
    "bars": 32
   },
   {
    "section": "Modulation interlude",
    "chords": [
     "Bb7"
    ],
    "bars": 4
   },
   {
    "section": "Chorus 3 - ensemble melody (AABA, Eb)",
    "chords": [
     "Eb6",
     "Eb6",
     "F7",
     "F7",
     "Fm7",
     "Bb7",
     "Eb6",
     "Bb7",
     "Eb6",
     "Eb6",
     "F7",
     "F7",
     "Fm7",
     "Bb7",
     "Eb6",
     "Eb6",
     "Abmaj7",
     "Abmaj7",
     "Abmaj7",
     "Abmaj7",
     "F7",
     "F7",
     "Fm7",
     "Bb7",
     "Eb6",
     "Eb6",
     "F7",
     "F7",
     "Fm7",
     "Bb7",
     "Eb6",
     "Eb6"
    ],
    "bars": 32
   },
   {
    "section": "Coda - last A repeated, fade (Eb)",
    "chords": [
     "Eb6",
     "Eb6",
     "F7",
     "F7",
     "Fm7",
     "Bb7",
     "Eb6",
     "Eb6"
    ],
    "bars": 16
   }
  ],
  "solos": [
   {
    "section": "Chorus 2 - trumpet solo (AABA, C)",
    "scale": "C major pentatonic over C6; add F# (C Lydian / D7 arpeggio D-F#-A-C with Ab for the b5) over D7b5; D Dorian over Dm7-G7",
    "tips": "Target the F# when the D7b5 arrives - it is the sound of the tune. Keep phrases short and swung, resting on the bridge's long Fmaj7.",
    "chords": [
     "C6",
     "C6",
     "D7b5",
     "D7b5",
     "Dm7",
     "G7",
     "C6",
     "G7",
     "C6",
     "C6",
     "D7b5",
     "D7b5",
     "Dm7",
     "G7",
     "C6",
     "C6",
     "Fmaj7",
     "Fmaj7",
     "Fmaj7",
     "Fmaj7",
     "D7",
     "D7",
     "Dm7",
     "G7",
     "C6",
     "C6",
     "D7b5",
     "D7b5",
     "Dm7",
     "G7",
     "C6",
     "C6"
    ]
   }
  ]
 },
 "So What": {
  "status": "corrected",
  "key": "D Dorian (bridge in Eb Dorian)",
  "bpm": 137,
  "beatsPerBar": 4,
  "durationSec": 557,
  "chords": [
   "Dm7",
   "Ebm7"
  ],
  "structure": [
   {
    "section": "Intro (piano & bass, free time)",
    "chords": [
     "Dm7"
    ],
    "bars": 18
   },
   {
    "section": "Head (AABA, bass call / horn answer)",
    "chords": [
     "Dm7",
     "Dm7",
     "Ebm7",
     "Dm7"
    ],
    "per": 8,
    "bars": 32
   },
   {
    "section": "Trumpet solo (2 choruses)",
    "chords": [
     "Dm7",
     "Dm7",
     "Ebm7",
     "Dm7"
    ],
    "per": 8,
    "bars": 64
   },
   {
    "section": "Tenor sax solo (2 choruses)",
    "chords": [
     "Dm7",
     "Dm7",
     "Ebm7",
     "Dm7"
    ],
    "per": 8,
    "bars": 64
   },
   {
    "section": "Alto sax solo (2 choruses)",
    "chords": [
     "Dm7",
     "Dm7",
     "Ebm7",
     "Dm7"
    ],
    "per": 8,
    "bars": 64
   },
   {
    "section": "Piano solo (1 chorus)",
    "chords": [
     "Dm7",
     "Dm7",
     "Ebm7",
     "Dm7"
    ],
    "per": 8,
    "bars": 32
   },
   {
    "section": "Head out",
    "chords": [
     "Dm7",
     "Dm7",
     "Ebm7",
     "Dm7"
    ],
    "per": 8,
    "bars": 32
   },
   {
    "section": "Outro (bass figure, fade on Dm7)",
    "chords": [
     "Dm7"
    ],
    "bars": 12
   }
  ],
  "solos": [
   {
    "section": "Trumpet solo (2 choruses)",
    "scale": "D Dorian (D E F G A B C), shift to Eb Dorian for the 8-bar bridge",
    "tips": "Leave space like the original - play a short idea, rest, then answer it. Practise moving the same phrase up a half step when the bridge arrives.",
    "chords": [
     "Dm7",
     "Dm7",
     "Ebm7",
     "Dm7"
    ]
   },
   {
    "section": "Tenor sax solo (2 choruses)",
    "scale": "D Dorian / D minor pentatonic; Eb Dorian on the bridge",
    "tips": "Try stacking fourths from D, E and A for a modern modal sound. Mark each 8-bar block so you never miss the move to Eb.",
    "chords": [
     "Dm7",
     "Dm7",
     "Ebm7",
     "Dm7"
    ]
   },
   {
    "section": "Alto sax solo (2 choruses)",
    "scale": "D Dorian with D blues colour (Ab passing note); Eb Dorian on the bridge",
    "tips": "Mix bluesy pentatonic licks with Dorian scale runs. Land on the 6th (B) to bring out the Dorian sound.",
    "chords": [
     "Dm7",
     "Dm7",
     "Ebm7",
     "Dm7"
    ]
   },
   {
    "section": "Piano solo (1 chorus)",
    "scale": "D Dorian; comp with 'So What' voicings (stacked fourths with a major third on top) on D and Eb",
    "tips": "Play the two-chord horn answer shape and slide it within the mode. Keep the left hand light while the bass walks.",
    "chords": [
     "Dm7",
     "Dm7",
     "Ebm7",
     "Dm7"
    ]
   }
  ]
 },
 "Stella by Starlight": {
  "status": "uncertain",
  "key": "Bb major",
  "bpm": 85,
  "beatsPerBar": 4,
  "durationSec": 294,
  "chords": [
   "Em7b5",
   "A7",
   "Cm7",
   "F7",
   "Fm7",
   "Bb7",
   "Ebmaj7"
  ],
  "structure": [
   {
    "section": "Intro (piano)",
    "chords": [
     "Em7b5",
     "A7"
    ],
    "bars": 4
   },
   {
    "section": "Head - A",
    "chords": [
     "Em7b5",
     "A7",
     "Cm7",
     "F7",
     "Fm7",
     "Bb7",
     "Ebmaj7",
     "Ab7"
    ],
    "bars": 8
   },
   {
    "section": "Head - B",
    "chords": [
     "Bbmaj7",
     "Bbmaj7",
     "Em7b5",
     "A7",
     "Dm7",
     "Dm7",
     "Bbm7",
     "Eb7",
     "Fmaj7",
     "Fmaj7",
     "Em7b5",
     "A7",
     "Am7b5",
     "Am7b5",
     "D7",
     "D7"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Head - C",
    "chords": [
     "G7#5",
     "G7",
     "Cm7",
     "Cm7",
     "Ab7",
     "Ab7",
     "Bbmaj7",
     "Bbmaj7"
    ],
    "bars": 8
   },
   {
    "section": "Head - D",
    "chords": [
     "Em7b5",
     "A7",
     "Dm7b5",
     "G7",
     "Cm7b5",
     "F7",
     "Bbmaj7",
     "Bbmaj7"
    ],
    "bars": 8
   },
   {
    "section": "Solo chorus (tenor sax / piano) - A",
    "chords": [
     "Em7b5",
     "A7",
     "Cm7",
     "F7",
     "Fm7",
     "Bb7",
     "Ebmaj7",
     "Ab7"
    ],
    "bars": 8
   },
   {
    "section": "Solo chorus (tenor sax / piano) - B",
    "chords": [
     "Bbmaj7",
     "Bbmaj7",
     "Em7b5",
     "A7",
     "Dm7",
     "Dm7",
     "Bbm7",
     "Eb7",
     "Fmaj7",
     "Fmaj7",
     "Em7b5",
     "A7",
     "Am7b5",
     "Am7b5",
     "D7",
     "D7"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Solo chorus (tenor sax / piano) - C",
    "chords": [
     "G7#5",
     "G7",
     "Cm7",
     "Cm7",
     "Ab7",
     "Ab7",
     "Bbmaj7",
     "Bbmaj7"
    ],
    "bars": 8
   },
   {
    "section": "Solo chorus (tenor sax / piano) - D",
    "chords": [
     "Em7b5",
     "A7",
     "Dm7b5",
     "G7",
     "Cm7b5",
     "F7",
     "Bbmaj7",
     "Bbmaj7"
    ],
    "bars": 8
   },
   {
    "section": "Head out - A",
    "chords": [
     "Em7b5",
     "A7",
     "Cm7",
     "F7",
     "Fm7",
     "Bb7",
     "Ebmaj7",
     "Ab7"
    ],
    "bars": 8
   },
   {
    "section": "Head out - B",
    "chords": [
     "Bbmaj7",
     "Bbmaj7",
     "Em7b5",
     "A7",
     "Dm7",
     "Dm7",
     "Bbm7",
     "Eb7",
     "Fmaj7",
     "Fmaj7",
     "Em7b5",
     "A7",
     "Am7b5",
     "Am7b5",
     "D7",
     "D7"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Head out - C",
    "chords": [
     "G7#5",
     "G7",
     "Cm7",
     "Cm7",
     "Ab7",
     "Ab7",
     "Bbmaj7",
     "Bbmaj7"
    ],
    "bars": 8
   },
   {
    "section": "Head out - D",
    "chords": [
     "Em7b5",
     "A7",
     "Dm7b5",
     "G7",
     "Cm7b5",
     "F7",
     "Bbmaj7",
     "Bbmaj7"
    ],
    "bars": 8
   },
   {
    "section": "Ending",
    "chords": [
     "Bbmaj7"
    ],
    "bars": 4
   }
  ],
  "solos": [
   {
    "section": "Solo chorus (tenor sax / piano)",
    "scale": "Bb major overall; D harmonic minor over Em7b5-A7, Eb major/Bb Mixolydian over Fm7-Bb7, C harmonic minor colour over Dm7b5-G7",
    "tips": "Outline each ii-V with a simple 1-3-5-7 arpeggio before adding scale notes. The bars change fast in the B section, so practise just the chord tones there first.",
    "chords": [
     "Em7b5",
     "A7",
     "Cm7",
     "F7",
     "Fm7",
     "Bb7",
     "Ebmaj7",
     "Ab7"
    ]
   }
  ]
 },
 "Blue Monk": {
  "status": "uncertain",
  "key": "Bb major (12-bar blues)",
  "bpm": 140,
  "beatsPerBar": 4,
  "durationSec": 466,
  "chords": [
   "Bb7",
   "Eb7",
   "Edim7",
   "F7"
  ],
  "structure": [
   {
    "section": "Piano intro",
    "chords": [
     "Bb7",
     "F7"
    ],
    "bars": 4
   },
   {
    "section": "Head (2 choruses)",
    "chords": [
     "Bb7",
     "Eb7",
     "Bb7",
     "Bb7",
     "Eb7",
     "Edim7",
     "Bb7",
     "Bb7",
     "Eb7",
     "Eb7",
     "Edim7",
     "Edim7",
     "Bb7",
     "Bb7",
     "G7",
     "G7",
     "F7",
     "F7",
     "F7",
     "F7",
     "Bb7",
     "Eb7",
     "Bb7",
     "F7"
    ],
    "per": 0.5,
    "bars": 24
   },
   {
    "section": "Piano solo (14 choruses)",
    "chords": [
     "Bb7",
     "Eb7",
     "Bb7",
     "Bb7",
     "Eb7",
     "Edim7",
     "Bb7",
     "Bb7",
     "Eb7",
     "Eb7",
     "Edim7",
     "Edim7",
     "Bb7",
     "Bb7",
     "G7",
     "G7",
     "F7",
     "F7",
     "F7",
     "F7",
     "Bb7",
     "Eb7",
     "Bb7",
     "F7"
    ],
    "per": 0.5,
    "bars": 168
   },
   {
    "section": "Bass solo (4 choruses)",
    "chords": [
     "Bb7",
     "Eb7",
     "Bb7",
     "Bb7",
     "Eb7",
     "Edim7",
     "Bb7",
     "Bb7",
     "Eb7",
     "Eb7",
     "Edim7",
     "Edim7",
     "Bb7",
     "Bb7",
     "G7",
     "G7",
     "F7",
     "F7",
     "F7",
     "F7",
     "Bb7",
     "Eb7",
     "Bb7",
     "F7"
    ],
    "per": 0.5,
    "bars": 48
   },
   {
    "section": "Head out (2 choruses)",
    "chords": [
     "Bb7",
     "Eb7",
     "Bb7",
     "Bb7",
     "Eb7",
     "Edim7",
     "Bb7",
     "Bb7",
     "Eb7",
     "Eb7",
     "Edim7",
     "Edim7",
     "Bb7",
     "Bb7",
     "G7",
     "G7",
     "F7",
     "F7",
     "F7",
     "F7",
     "Bb7",
     "Eb7",
     "Bb7",
     "F7"
    ],
    "per": 0.5,
    "bars": 24
   },
   {
    "section": "Ending",
    "chords": [
     "Bb7"
    ],
    "bars": 4
   }
  ],
  "solos": [
   {
    "section": "Piano solo (14 choruses)",
    "scale": "Bb blues scale (Bb Db Eb E F Ab) plus Bb Mixolydian; chromatic approach notes to Monk-style",
    "tips": "Borrow Monk's trick of repeating one short motif and moving it around the bar. Hit the E natural over Edim7 - it links Eb7 back to Bb7.",
    "chords": [
     "Bb7",
     "Eb7",
     "Bb7",
     "Bb7",
     "Eb7",
     "Edim7",
     "Bb7",
     "Bb7",
     "Eb7",
     "Eb7",
     "Edim7",
     "Edim7",
     "Bb7",
     "Bb7",
     "G7",
     "G7",
     "F7",
     "F7",
     "F7",
     "F7",
     "Bb7",
     "Eb7",
     "Bb7",
     "F7"
    ]
   },
   {
    "section": "Bass solo (4 choruses)",
    "scale": "Bb major pentatonic / Bb Mixolydian, root-fifth outlines of each chord",
    "tips": "Comp very sparsely behind the bass so it can be heard. Follow the 12-bar shape by counting each 4-bar line.",
    "chords": [
     "Bb7",
     "Eb7",
     "Bb7",
     "Bb7",
     "Eb7",
     "Edim7",
     "Bb7",
     "Bb7",
     "Eb7",
     "Eb7",
     "Edim7",
     "Edim7",
     "Bb7",
     "Bb7",
     "G7",
     "G7",
     "F7",
     "F7",
     "F7",
     "F7",
     "Bb7",
     "Eb7",
     "Bb7",
     "F7"
    ]
   }
  ]
 },
 "My Funny Valentine": {
  "status": "corrected",
  "key": "C minor",
  "bpm": 64,
  "beatsPerBar": 4,
  "durationSec": 146,
  "chords": [
   "Cm",
   "Cm",
   "Cm7",
   "Cm6"
  ],
  "structure": [
   {
    "section": "Piano intro",
    "chords": [
     "Cm",
     "G7"
    ],
    "bars": 2
   },
   {
    "section": "A1",
    "chords": [
     "Cm",
     "Cm",
     "Cm7",
     "Cm6",
     "Abmaj7",
     "Fm7",
     "Dm7b5",
     "G7"
    ],
    "bars": 8
   },
   {
    "section": "A2",
    "chords": [
     "Cm",
     "Cm",
     "Cm7",
     "Cm6",
     "Abmaj7",
     "Fm7",
     "Fm7",
     "Bb7"
    ],
    "bars": 8
   },
   {
    "section": "Bridge (B)",
    "chords": [
     "Ebmaj7",
     "Fm7",
     "Gm7",
     "Fm7",
     "Ebmaj7",
     "Fm7",
     "Gm7",
     "Fm7",
     "Ebmaj7",
     "Gm7",
     "Am7b5",
     "D7",
     "Gm",
     "Gm/F",
     "Dm7b5",
     "G7"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "A3 (extended)",
    "chords": [
     "Cm",
     "Cm",
     "Cm",
     "Cm",
     "Cm7",
     "Cm7",
     "Cm6",
     "Cm6",
     "Abmaj7",
     "Abmaj7",
     "Dm7b5",
     "Dm7b5",
     "Fm7",
     "Fm7",
     "Bb7",
     "Bb7",
     "Ebmaj7",
     "Ebmaj7",
     "Abmaj7",
     "Abmaj7",
     "Dm7b5",
     "G7",
     "Cm",
     "Cm"
    ],
    "per": 0.5,
    "bars": 12
   },
   {
    "section": "Ending",
    "chords": [
     "Cm"
    ],
    "bars": 1
   }
  ]
 },
 "Almost Blue": {
  "status": "corrected",
  "key": "A minor",
  "bpm": 60,
  "beatsPerBar": 4,
  "durationSec": 184,
  "chords": [
   "Am",
   "Am/G#",
   "Am7/G",
   "Bm7b5",
   "E7"
  ],
  "structure": [
   {
    "section": "Piano intro",
    "chords": [
     "Am",
     "Am",
     "Am/G#",
     "Am/G#",
     "Am7/G",
     "Am7/G",
     "Bm7b5",
     "E7"
    ],
    "per": 0.5,
    "bars": 2
   },
   {
    "section": "Verse 1",
    "chords": [
     "Am",
     "Am",
     "Am/G#",
     "Am/G#",
     "Am7/G",
     "Am7/G",
     "Bm7b5",
     "E7"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "Am",
     "Am",
     "Bm7b5",
     "Adim",
     "C",
     "C",
     "Bb6",
     "A",
     "Dm",
     "Dm/C",
     "Bm7b5",
     "E7",
     "Am",
     "Am",
     "Am",
     "Am"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Bridge",
    "chords": [
     "F",
     "F",
     "Bm7b5",
     "Bm7b5",
     "C",
     "C#dim",
     "Dm",
     "Dm",
     "Bm7b5",
     "Bm7b5",
     "E7",
     "E7",
     "Am",
     "Am",
     "E7",
     "E7"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Piano solo",
    "chords": [
     "Am",
     "Am",
     "Am/G#",
     "Am/G#",
     "Am7/G",
     "Am7/G",
     "Bm7b5",
     "E7"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Verse 3",
    "chords": [
     "Am",
     "Am",
     "Bm7b5",
     "Adim",
     "C",
     "C",
     "Bb6",
     "A",
     "Dm",
     "Dm/C",
     "Bm7b5",
     "E7",
     "Am",
     "Am",
     "Am",
     "Am"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Outro",
    "chords": [
     "Am",
     "Am/G#",
     "Am7/G",
     "Am"
    ],
    "bars": 4
   }
  ],
  "solos": [
   {
    "section": "Piano solo",
    "scale": "A harmonic minor (G# leading note) over the descending Am line; A natural minor elsewhere",
    "tips": "Follow the falling bass line (A, G#, G, F#) with your left hand and keep the right hand to a few slow, sustained notes. Let the E7 resolve to Am every time.",
    "chords": [
     "Am",
     "Am",
     "Am/G#",
     "Am/G#",
     "Am7/G",
     "Am7/G",
     "Bm7b5",
     "E7"
    ]
   }
  ]
 },
 "Amazing Grace": {
  "status": "corrected",
  "key": "G major",
  "bpm": 72,
  "beatsPerBar": 3,
  "durationSec": 180,
  "chords": [
   "G",
   "C",
   "D",
   "Em"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "G",
     "C",
     "D",
     "G"
    ],
    "bars": 4
   },
   {
    "section": "Verse 1",
    "chords": [
     "G",
     "G",
     "C",
     "G",
     "G",
     "Em",
     "D",
     "D",
     "G",
     "G7",
     "C",
     "G",
     "Em",
     "D",
     "G",
     "G"
    ],
    "bars": 16
   },
   {
    "section": "Verse 2",
    "chords": [
     "G",
     "G",
     "C",
     "G",
     "G",
     "Em",
     "D",
     "D",
     "G",
     "G7",
     "C",
     "G",
     "Em",
     "D",
     "G",
     "G"
    ],
    "bars": 16
   },
   {
    "section": "Verse 3",
    "chords": [
     "G",
     "G",
     "C",
     "G",
     "G",
     "Em",
     "D",
     "D",
     "G",
     "G7",
     "C",
     "G",
     "Em",
     "D",
     "G",
     "G"
    ],
    "bars": 16
   },
   {
    "section": "Verse 4 (slower ending)",
    "chords": [
     "G",
     "G",
     "C",
     "G",
     "G",
     "Em",
     "D",
     "D",
     "G",
     "G7",
     "C",
     "G",
     "Em",
     "D",
     "G",
     "G"
    ],
    "bars": 16
   },
   {
    "section": "Ending",
    "chords": [
     "G"
    ],
    "bars": 4
   }
  ]
 },
 "When I Was Your Man": {
  "status": "verified",
  "key": "C major",
  "bpm": 73,
  "beatsPerBar": 4,
  "durationSec": 204,
  "chords": [
   "F",
   "G",
   "Em",
   "Am",
   "Dm",
   "G",
   "C"
  ],
  "structure": [
   {
    "section": "Intro (piano)",
    "chords": [
     "C",
     "Am"
    ],
    "bars": 2
   },
   {
    "section": "Verse 1",
    "chords": [
     "Am",
     "Am",
     "C",
     "C",
     "Dm",
     "G",
     "C",
     "C"
    ],
    "bars": 8
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Am",
     "Am",
     "Em",
     "Em",
     "Bb",
     "Bb",
     "C/G",
     "G"
    ],
    "per": 0.5,
    "bars": 4
   },
   {
    "section": "Chorus",
    "chords": [
     "F",
     "G",
     "Em",
     "Am",
     "Dm",
     "G",
     "C",
     "C"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "Am",
     "Am",
     "C",
     "C",
     "Dm",
     "G",
     "C",
     "C"
    ],
    "bars": 8
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Am",
     "Am",
     "Em",
     "Em",
     "Bb",
     "Bb",
     "C/G",
     "G"
    ],
    "per": 0.5,
    "bars": 4
   },
   {
    "section": "Chorus",
    "chords": [
     "F",
     "G",
     "Em",
     "Am",
     "Dm",
     "G",
     "C",
     "C"
    ],
    "bars": 8
   },
   {
    "section": "Bridge",
    "chords": [
     "F",
     "G",
     "C",
     "G/B",
     "Am",
     "Am",
     "Dm",
     "G"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "F",
     "G",
     "Em",
     "Am",
     "Dm",
     "G",
     "C",
     "C"
    ],
    "bars": 8
   },
   {
    "section": "Outro",
    "chords": [
     "F",
     "G",
     "C",
     "C"
    ],
    "bars": 4
   }
  ],
  "pianoVideo": {
   "id": "ekzHIouo8Q4",
   "title": "Bruno Mars - When I Was Your Man (Official Music Video)",
   "channel": "Bruno Mars"
  }
 },
 "Break My Heart Again": {
  "status": "uncertain",
  "key": "G major (centres on E minor)",
  "bpm": 73,
  "beatsPerBar": 4,
  "durationSec": 238,
  "chords": [
   "C",
   "D",
   "G",
   "Em"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "C",
     "D",
     "Bm",
     "Em"
    ],
    "bars": 4
   },
   {
    "section": "Verse 1",
    "chords": [
     "C",
     "D",
     "G",
     "Em"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "C",
     "D",
     "G",
     "Em"
    ],
    "bars": 12
   },
   {
    "section": "Verse 2",
    "chords": [
     "C",
     "D",
     "G",
     "Em"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "C",
     "D",
     "G",
     "Em"
    ],
    "bars": 12
   },
   {
    "section": "Bridge",
    "chords": [
     "C",
     "D",
     "B",
     "Em"
    ],
    "bars": 8
   },
   {
    "section": "Final chorus",
    "chords": [
     "C",
     "D",
     "G",
     "Em"
    ],
    "bars": 12
   },
   {
    "section": "Outro",
    "chords": [
     "C",
     "D",
     "Bm",
     "Em"
    ],
    "bars": 4
   }
  ]
 },
 "Can't Help Falling in Love": {
  "status": "corrected",
  "key": "D major",
  "bpm": 67,
  "beatsPerBar": 4,
  "durationSec": 179,
  "chords": [
   "D",
   "F#m",
   "Bm",
   "G",
   "A"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "D",
     "A"
    ],
    "bars": 2
   },
   {
    "section": "Verse 1",
    "chords": [
     "D",
     "F#m",
     "Bm",
     "Bm",
     "G",
     "D",
     "A",
     "A",
     "G",
     "A",
     "Bm",
     "G",
     "D",
     "A",
     "D",
     "D"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "D",
     "F#m",
     "Bm",
     "Bm",
     "G",
     "D",
     "A",
     "A",
     "G",
     "A",
     "Bm",
     "G",
     "D",
     "A",
     "D",
     "D"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Bridge",
    "chords": [
     "F#m",
     "C#7",
     "F#m",
     "C#7",
     "F#m",
     "C#7",
     "F#m",
     "B7",
     "Em",
     "Em",
     "A",
     "A"
    ],
    "per": 0.5,
    "bars": 6
   },
   {
    "section": "Verse 3",
    "chords": [
     "D",
     "F#m",
     "Bm",
     "Bm",
     "G",
     "D",
     "A",
     "A",
     "G",
     "A",
     "Bm",
     "G",
     "D",
     "A",
     "D",
     "D"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Bridge",
    "chords": [
     "F#m",
     "C#7",
     "F#m",
     "C#7",
     "F#m",
     "C#7",
     "F#m",
     "B7",
     "Em",
     "Em",
     "A",
     "A"
    ],
    "per": 0.5,
    "bars": 6
   },
   {
    "section": "Final verse",
    "chords": [
     "D",
     "F#m",
     "Bm",
     "Bm",
     "G",
     "D",
     "A",
     "A",
     "G",
     "A",
     "Bm",
     "G",
     "D",
     "A",
     "D",
     "D"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Outro tag",
    "chords": [
     "G",
     "A",
     "Bm",
     "G",
     "D",
     "A",
     "D",
     "D",
     "D",
     "D",
     "D",
     "D"
    ],
    "per": 0.5,
    "bars": 6
   }
  ]
 },
 "Say You Won't Let Go": {
  "status": "corrected",
  "key": "Bb major",
  "capoNote": "Capo 3, G shapes (G-D-Em-C)",
  "bpm": 96,
  "beatsPerBar": 4,
  "durationSec": 211,
  "chords": [
   "Bb",
   "F",
   "Gm",
   "Eb"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "Bb",
     "F",
     "Gm",
     "Eb"
    ],
    "bars": 4
   },
   {
    "section": "Verse 1",
    "chords": [
     "Bb",
     "F",
     "Gm",
     "Eb"
    ],
    "bars": 16
   },
   {
    "section": "Verse 2",
    "chords": [
     "Bb",
     "F",
     "Gm",
     "Eb"
    ],
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Bb",
     "F",
     "Gm",
     "Eb"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "Bb",
     "F",
     "Gm",
     "Eb"
    ],
    "bars": 8
   },
   {
    "section": "Verse 3",
    "chords": [
     "Bb",
     "F",
     "Gm",
     "Eb"
    ],
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Bb",
     "F",
     "Gm",
     "Eb"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "Bb",
     "F",
     "Gm",
     "Eb"
    ],
    "bars": 8
   },
   {
    "section": "Outro",
    "chords": [
     "Bb",
     "F",
     "Gm",
     "Eb",
     "Bb"
    ],
    "bars": 5
   }
  ]
 },
 "Die for You": {
  "status": "corrected",
  "key": "C# minor",
  "bpm": 134,
  "beatsPerBar": 4,
  "durationSec": 260,
  "chords": [
   "Amaj7",
   "G#m7",
   "C#m7",
   "F#m7"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "Amaj7",
     "G#m7",
     "C#m7",
     "F#m7"
    ],
    "per": 2,
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "Amaj7",
     "G#m7",
     "C#m7",
     "F#m7"
    ],
    "per": 2,
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Amaj7",
     "G#m7",
     "C#m7",
     "F#m7"
    ],
    "per": 2,
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "Amaj7",
     "G#m7",
     "C#m7",
     "F#m7"
    ],
    "per": 2,
    "bars": 16
   },
   {
    "section": "Verse 2",
    "chords": [
     "Amaj7",
     "G#m7",
     "C#m7",
     "F#m7"
    ],
    "per": 2,
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Amaj7",
     "G#m7",
     "C#m7",
     "F#m7"
    ],
    "per": 2,
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "Amaj7",
     "G#m7",
     "C#m7",
     "F#m7"
    ],
    "per": 2,
    "bars": 16
   },
   {
    "section": "Bridge",
    "chords": [
     "Amaj7",
     "G#m7",
     "C#m7",
     "F#m7"
    ],
    "per": 2,
    "bars": 16
   },
   {
    "section": "Final chorus",
    "chords": [
     "Amaj7",
     "G#m7",
     "C#m7",
     "F#m7"
    ],
    "per": 2,
    "bars": 24
   },
   {
    "section": "Outro",
    "chords": [
     "Amaj7",
     "G#m7",
     "C#m7",
     "F#m7"
    ],
    "per": 2,
    "bars": 12
   }
  ]
 },
 "All of Me": {
  "status": "corrected",
  "key": "Ab major",
  "capoNote": "Capo 1, G shapes (Em-C-G-D)",
  "bpm": 63,
  "beatsPerBar": 4,
  "durationSec": 270,
  "chords": [
   "Fm",
   "Db",
   "Ab",
   "Eb"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "Fm",
     "Db",
     "Ab",
     "Eb"
    ],
    "bars": 4
   },
   {
    "section": "Verse 1",
    "chords": [
     "Fm",
     "Db",
     "Ab",
     "Eb"
    ],
    "bars": 8
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Bbm",
     "Ab",
     "Eb"
    ],
    "bars": 6
   },
   {
    "section": "Chorus",
    "chords": [
     "Ab",
     "Fm",
     "Db",
     "Eb"
    ],
    "bars": 12
   },
   {
    "section": "Verse 2",
    "chords": [
     "Fm",
     "Db",
     "Ab",
     "Eb"
    ],
    "bars": 8
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Bbm",
     "Ab",
     "Eb"
    ],
    "bars": 6
   },
   {
    "section": "Chorus",
    "chords": [
     "Ab",
     "Fm",
     "Db",
     "Eb"
    ],
    "bars": 12
   },
   {
    "section": "Bridge",
    "chords": [
     "Fm",
     "Db",
     "Ab",
     "Eb"
    ],
    "bars": 8
   },
   {
    "section": "Final chorus",
    "chords": [
     "Ab",
     "Fm",
     "Db",
     "Eb"
    ],
    "bars": 8
   },
   {
    "section": "Outro",
    "chords": [
     "Fm",
     "Db",
     "Ab",
     "Eb"
    ],
    "bars": 4
   }
  ],
  "pianoVideo": {
   "id": "450p7goxZqg",
   "title": "John Legend - All of Me (Official Video)",
   "channel": "johnlegendVEVO"
  }
 },
 "Just the Way You Are": {
  "status": "corrected",
  "key": "F major",
  "capoNote": "Capo 5, C shapes (C-Am-F-C)",
  "bpm": 109,
  "beatsPerBar": 4,
  "durationSec": 221,
  "chords": [
   "F",
   "Dm",
   "Bb",
   "F"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "F",
     "Dm",
     "Bb",
     "F"
    ],
    "per": 2,
    "bars": 4
   },
   {
    "section": "Verse 1",
    "chords": [
     "F",
     "Dm",
     "Bb",
     "F"
    ],
    "per": 2,
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "F",
     "Dm",
     "Bb",
     "F"
    ],
    "per": 2,
    "bars": 4
   },
   {
    "section": "Chorus",
    "chords": [
     "F",
     "Dm",
     "Bb",
     "F"
    ],
    "per": 2,
    "bars": 16
   },
   {
    "section": "Verse 2",
    "chords": [
     "F",
     "Dm",
     "Bb",
     "F"
    ],
    "per": 2,
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "F",
     "Dm",
     "Bb",
     "F"
    ],
    "per": 2,
    "bars": 4
   },
   {
    "section": "Chorus",
    "chords": [
     "F",
     "Dm",
     "Bb",
     "F"
    ],
    "per": 2,
    "bars": 16
   },
   {
    "section": "Bridge",
    "chords": [
     "F",
     "Dm",
     "Bb",
     "F"
    ],
    "per": 2,
    "bars": 8
   },
   {
    "section": "Final chorus",
    "chords": [
     "F",
     "Dm",
     "Bb",
     "F"
    ],
    "per": 2,
    "bars": 16
   }
  ]
 },
 "November Rain": {
  "status": "corrected",
  "key": "B major (outro in B minor)",
  "tuning": "half step down",
  "bpm": 78,
  "beatsPerBar": 4,
  "durationSec": 537,
  "chords": [
   "E",
   "C#m7",
   "B",
   "F#"
  ],
  "structure": [
   {
    "section": "Piano intro",
    "chords": [
     "E",
     "G#m/D#",
     "C#m7",
     "B"
    ],
    "bars": 16
   },
   {
    "section": "Verse 1",
    "chords": [
     "Emaj7",
     "C#m7",
     "B",
     "B"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "C#m7",
     "F#",
     "B",
     "B"
    ],
    "bars": 8
   },
   {
    "section": "Chorus lead-out",
    "chords": [
     "E",
     "F#"
    ],
    "bars": 2
   },
   {
    "section": "Guitar solo 1",
    "chords": [
     "E",
     "C#m7",
     "B",
     "B"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "Emaj7",
     "C#m7",
     "B",
     "B"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "C#m7",
     "F#",
     "B",
     "B"
    ],
    "bars": 8
   },
   {
    "section": "Chorus lead-out",
    "chords": [
     "E",
     "F#"
    ],
    "bars": 2
   },
   {
    "section": "Bridge",
    "chords": [
     "D#m",
     "E",
     "B",
     "B"
    ],
    "bars": 12
   },
   {
    "section": "Chorus",
    "chords": [
     "C#m7",
     "F#",
     "B",
     "B"
    ],
    "bars": 8
   },
   {
    "section": "Chorus lead-out",
    "chords": [
     "E",
     "F#"
    ],
    "bars": 2
   },
   {
    "section": "Pre-outro",
    "chords": [
     "C#m",
     "F#",
     "B",
     "D#m/A#",
     "G#m",
     "G#m"
    ],
    "bars": 8
   },
   {
    "section": "Orchestral interlude",
    "chords": [
     "Bm",
     "G",
     "A",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Outro guitar solo",
    "chords": [
     "Bm",
     "G",
     "A",
     "A"
    ],
    "bars": 32
   },
   {
    "section": "Heavy outro",
    "chords": [
     "B5",
     "F#5",
     "E5",
     "D5",
     "G5",
     "G5"
    ],
    "bars": 16
   },
   {
    "section": "Piano ending",
    "chords": [
     "Bm",
     "Bm"
    ],
    "bars": 4
   }
  ],
  "solos": [
   {
    "section": "Guitar solo 1",
    "scale": "B major pentatonic / G# minor pentatonic (concert); in half-step-down tuning use C major / A minor pentatonic shapes around the 5th fret",
    "tips": "Aim long bends at the B and F# notes so they land on the chord tones; leave space between phrases like the piano does.",
    "chords": [
     "E",
     "C#m7",
     "B",
     "B"
    ]
   },
   {
    "section": "Outro guitar solo",
    "scale": "B minor pentatonic with B natural minor colour notes (concert); in half-step-down tuning use C minor pentatonic box 1 at the 8th fret",
    "tips": "Build slowly: start with whole-note bends, then add faster runs as the band gets louder. Target G and A chord tones when the chords change.",
    "chords": [
     "Bm",
     "G",
     "A",
     "A"
    ]
   }
  ]
 },
 "Sweet Child O' Mine": {
  "status": "corrected",
  "key": "Db major (Db Mixolydian feel); bridge and outro in Eb minor",
  "tuning": "half step down",
  "bpm": 125,
  "beatsPerBar": 4,
  "durationSec": 356,
  "chords": [
   "Db",
   "B",
   "Gb",
   "Db"
  ],
  "structure": [
   {
    "section": "Intro riff",
    "chords": [
     "Db",
     "Db",
     "B",
     "B",
     "Gb",
     "Gb",
     "Db",
     "Db"
    ],
    "bars": 16
   },
   {
    "section": "Verse 1",
    "chords": [
     "Db",
     "Db",
     "B",
     "B",
     "Gb",
     "Gb",
     "Db",
     "Db"
    ],
    "bars": 16
   },
   {
    "section": "Chorus 1",
    "chords": [
     "Ab",
     "B",
     "Db",
     "Db"
    ],
    "bars": 8
   },
   {
    "section": "Riff interlude",
    "chords": [
     "Db",
     "Db",
     "B",
     "B",
     "Gb",
     "Gb",
     "Db",
     "Db"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "Db",
     "Db",
     "B",
     "B",
     "Gb",
     "Gb",
     "Db",
     "Db"
    ],
    "bars": 16
   },
   {
    "section": "Chorus 2",
    "chords": [
     "Ab",
     "B",
     "Db",
     "Db"
    ],
    "bars": 8
   },
   {
    "section": "Guitar solo 1 (melodic, over verse chords)",
    "chords": [
     "Db",
     "Db",
     "B",
     "B",
     "Gb",
     "Gb",
     "Db",
     "Db"
    ],
    "bars": 16
   },
   {
    "section": "Chorus 3",
    "chords": [
     "Ab",
     "B",
     "Db",
     "Db"
    ],
    "bars": 16
   },
   {
    "section": "Breakdown / guitar solo 2 (harmonic minor run)",
    "chords": [
     "Ebm",
     "B",
     "Bb7",
     "Abm"
    ],
    "bars": 16
   },
   {
    "section": "Guitar solo 3 (wah)",
    "chords": [
     "Ebm",
     "Gb",
     "Ab",
     "B",
     "Db",
     "Gb"
    ],
    "bars": 32
   },
   {
    "section": "Outro (vocal breakdown)",
    "chords": [
     "Ebm",
     "Gb",
     "Ab",
     "B",
     "Db",
     "Gb"
    ],
    "bars": 32
   }
  ],
  "solos": [
   {
    "section": "Guitar solo 1 (melodic, over verse chords)",
    "scale": "Db Mixolydian (play D Mixolydian / B minor pentatonic shapes in the tuned-down guitar, around the 10th-15th frets)",
    "tips": "Target the chord tones of each change (Db, B, Gb) on the downbeat; use slow, wide bends rather than speed.",
    "chords": [
     "Db",
     "Db",
     "B",
     "B",
     "Gb",
     "Gb",
     "Db",
     "Db"
    ]
   },
   {
    "section": "Breakdown / guitar solo 2 (harmonic minor run)",
    "scale": "Eb harmonic minor (E harmonic minor shapes in the tuned-down guitar); the raised 7th fits the Bb7 chord",
    "tips": "Practise the scale in 3-note-per-string groups slowly with a metronome before pushing tempo.",
    "chords": [
     "Ebm",
     "B",
     "Bb7",
     "Abm"
    ]
   },
   {
    "section": "Guitar solo 3 (wah)",
    "scale": "Eb minor pentatonic, box 1 (E minor pentatonic box at 12th fret in the tuned-down guitar), add Eb natural minor colour notes",
    "tips": "Rock the wah in time with the beat; repeat short phrases instead of playing constantly.",
    "chords": [
     "Ebm",
     "Gb",
     "Ab",
     "B",
     "Db",
     "Gb"
    ]
   }
  ]
 },
 "Hotel California": {
  "status": "corrected",
  "key": "B minor",
  "capoNote": "Capo 2, Am shapes (Am E7 G D F C Dm E7)",
  "bpm": 75,
  "beatsPerBar": 4,
  "durationSec": 391,
  "chords": [
   "Bm",
   "F#7",
   "A",
   "E",
   "G",
   "D",
   "Em",
   "F#7"
  ],
  "structure": [
   {
    "section": "Intro (12-string arpeggios)",
    "chords": [
     "Bm",
     "F#7",
     "A",
     "E",
     "G",
     "D",
     "Em",
     "F#7"
    ],
    "bars": 16
   },
   {
    "section": "Verse 1",
    "chords": [
     "Bm",
     "F#7",
     "A",
     "E",
     "G",
     "D",
     "Em",
     "F#7"
    ],
    "bars": 16
   },
   {
    "section": "Chorus 1",
    "chords": [
     "G",
     "D",
     "F#7",
     "Bm",
     "G",
     "D",
     "Em",
     "F#7"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "Bm",
     "F#7",
     "A",
     "E",
     "G",
     "D",
     "Em",
     "F#7"
    ],
    "bars": 16
   },
   {
    "section": "Chorus 2",
    "chords": [
     "G",
     "D",
     "F#7",
     "Bm",
     "G",
     "D",
     "Em",
     "F#7"
    ],
    "bars": 8
   },
   {
    "section": "Verse 3",
    "chords": [
     "Bm",
     "F#7",
     "A",
     "E",
     "G",
     "D",
     "Em",
     "F#7"
    ],
    "bars": 16
   },
   {
    "section": "Guitar solo (trading leads)",
    "chords": [
     "Bm",
     "F#7",
     "A",
     "E",
     "G",
     "D",
     "Em",
     "F#7"
    ],
    "bars": 24
   },
   {
    "section": "Dual-guitar harmony outro",
    "chords": [
     "Bm",
     "F#7",
     "A",
     "E",
     "G",
     "D",
     "Em",
     "F#7"
    ],
    "bars": 16
   }
  ],
  "solos": [
   {
    "section": "Guitar solo (trading leads)",
    "scale": "B minor pentatonic box 1 at 7th fret, plus B harmonic minor (A# note) over the F#7 chords",
    "tips": "Change position with the chords: land on the 3rd of each chord (D over Bm, A# over F#7). Learn the 8-bar loop by ear first.",
    "chords": [
     "Bm",
     "F#7",
     "A",
     "E",
     "G",
     "D",
     "Em",
     "F#7"
    ]
   },
   {
    "section": "Dual-guitar harmony outro",
    "scale": "B harmonic minor / arpeggios of each chord (Bm, F#, A, E, G, D, Em, F#)",
    "tips": "Practise plain arpeggios of each chord over the loop; a friend can play the same arpeggio a third higher.",
    "chords": [
     "Bm",
     "F#7",
     "A",
     "E",
     "G",
     "D",
     "Em",
     "F#7"
    ]
   }
  ]
 },
 "Summer of '69": {
  "status": "corrected",
  "key": "D major (bridge in F major)",
  "bpm": 139,
  "beatsPerBar": 4,
  "durationSec": 216,
  "chords": [
   "D",
   "A",
   "Bm",
   "G"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "D",
     "D",
     "A",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "D",
     "D",
     "A",
     "A"
    ],
    "bars": 16
   },
   {
    "section": "Chorus 1",
    "chords": [
     "Bm",
     "A",
     "D",
     "G",
     "Bm",
     "A",
     "D",
     "G",
     "Bm",
     "A",
     "D",
     "A"
    ],
    "bars": 12
   },
   {
    "section": "Interlude",
    "chords": [
     "D",
     "D",
     "A",
     "A"
    ],
    "bars": 4
   },
   {
    "section": "Verse 2",
    "chords": [
     "D",
     "D",
     "A",
     "A"
    ],
    "bars": 16
   },
   {
    "section": "Chorus 2",
    "chords": [
     "Bm",
     "A",
     "D",
     "G",
     "Bm",
     "A",
     "D",
     "G",
     "Bm",
     "A",
     "D",
     "A"
    ],
    "bars": 12
   },
   {
    "section": "Interlude",
    "chords": [
     "D",
     "D",
     "A",
     "A"
    ],
    "bars": 4
   },
   {
    "section": "Bridge (key of F)",
    "chords": [
     "F",
     "Bb",
     "C",
     "Bb",
     "F",
     "Bb",
     "C",
     "C"
    ],
    "bars": 8
   },
   {
    "section": "Guitar instrumental",
    "chords": [
     "D",
     "D",
     "A",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Verse 3",
    "chords": [
     "D",
     "D",
     "A",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Chorus 3",
    "chords": [
     "Bm",
     "A",
     "D",
     "G",
     "Bm",
     "A",
     "D",
     "G",
     "Bm",
     "A",
     "D",
     "A"
    ],
    "bars": 12
   },
   {
    "section": "Outro",
    "chords": [
     "D",
     "D",
     "A",
     "A"
    ],
    "bars": 16
   }
  ],
  "solos": [
   {
    "section": "Guitar instrumental",
    "scale": "D major pentatonic (B minor pentatonic box 1 at 7th fret)",
    "tips": "Keep the D-A rhythm feel driving; play short phrases that end on D or A as the chord changes.",
    "chords": [
     "D",
     "D",
     "A",
     "A"
    ]
   }
  ]
 },
 "Make You Feel My Love": {
  "status": "corrected",
  "key": "Bb major",
  "capoNote": "Capo 3, G shapes (G D/F# F C Cm G A7 D7)",
  "bpm": 77,
  "beatsPerBar": 4,
  "durationSec": 212,
  "chords": [
   "Bb",
   "F/A",
   "Ab",
   "Eb/G",
   "Ebm/Gb",
   "Bb/F",
   "C7",
   "F7"
  ],
  "structure": [
   {
    "section": "Piano intro",
    "chords": [
     "Bb",
     "Bb",
     "F/A",
     "F/A",
     "Ab",
     "Ab",
     "Eb/G",
     "Eb/G",
     "Ebm/Gb",
     "Ebm/Gb",
     "Bb/F",
     "Bb/F",
     "C7",
     "F7",
     "Bb",
     "Bb"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "Bb",
     "Bb",
     "F/A",
     "F/A",
     "Ab",
     "Ab",
     "Eb/G",
     "Eb/G",
     "Ebm/Gb",
     "Ebm/Gb",
     "Bb/F",
     "Bb/F",
     "C7",
     "F7",
     "Bb",
     "Bb"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "Bb",
     "Bb",
     "F/A",
     "F/A",
     "Ab",
     "Ab",
     "Eb/G",
     "Eb/G",
     "Ebm/Gb",
     "Ebm/Gb",
     "Bb/F",
     "Bb/F",
     "C7",
     "F7",
     "Bb",
     "Bb"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Bridge 1",
    "chords": [
     "Eb",
     "Bb",
     "Daug",
     "Eb",
     "Eb",
     "Bb",
     "C7",
     "F7"
    ],
    "bars": 8
   },
   {
    "section": "Verse 3",
    "chords": [
     "Bb",
     "Bb",
     "F/A",
     "F/A",
     "Ab",
     "Ab",
     "Eb/G",
     "Eb/G",
     "Ebm/Gb",
     "Ebm/Gb",
     "Bb/F",
     "Bb/F",
     "C7",
     "F7",
     "Bb",
     "Bb"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Piano interlude",
    "chords": [
     "Bb",
     "Bb",
     "F/A",
     "F/A",
     "Ab",
     "Ab",
     "Eb/G",
     "Eb/G",
     "Ebm/Gb",
     "Ebm/Gb",
     "Bb/F",
     "Bb/F",
     "C7",
     "F7",
     "Bb",
     "Bb"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Bridge 2",
    "chords": [
     "Eb",
     "Bb",
     "Daug",
     "Eb",
     "Eb",
     "Bb",
     "Cm7",
     "F7"
    ],
    "bars": 8
   },
   {
    "section": "Verse 4",
    "chords": [
     "Bb",
     "Bb",
     "F/A",
     "F/A",
     "Ab",
     "Ab",
     "Eb/G",
     "Eb/G",
     "Ebm/Gb",
     "Ebm/Gb",
     "Bb/F",
     "Bb/F",
     "C7",
     "F7",
     "Bb",
     "Bb"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Outro tag",
    "chords": [
     "C7",
     "F7",
     "Bb",
     "Bb"
    ],
    "bars": 4
   }
  ]
 },
 "Set Fire to the Rain": {
  "status": "corrected",
  "key": "D minor",
  "capoNote": "Capo 5, Am shapes (Am C G Dm)",
  "bpm": 108,
  "beatsPerBar": 4,
  "durationSec": 242,
  "chords": [
   "Dm",
   "F",
   "C",
   "Gm"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "Dm",
     "F",
     "C",
     "Gm"
    ],
    "bars": 4
   },
   {
    "section": "Verse 1",
    "chords": [
     "Dm",
     "F",
     "C",
     "Gm"
    ],
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Bb",
     "Gm",
     "Dm",
     "Dm",
     "Bb",
     "Bb",
     "C",
     "C"
    ],
    "bars": 8
   },
   {
    "section": "Chorus 1",
    "chords": [
     "Dm",
     "Dm",
     "C",
     "C",
     "Gm",
     "Gm",
     "Gm",
     "Bb"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "Dm",
     "F",
     "C",
     "Gm"
    ],
    "bars": 8
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Bb",
     "Gm",
     "Dm",
     "Dm",
     "Bb",
     "Bb",
     "C",
     "C"
    ],
    "bars": 8
   },
   {
    "section": "Chorus 2 (x2)",
    "chords": [
     "Dm",
     "Dm",
     "C",
     "C",
     "Gm",
     "Gm",
     "Gm",
     "Bb"
    ],
    "bars": 16
   },
   {
    "section": "Bridge",
    "chords": [
     "Bb",
     "F/A",
     "Am",
     "C"
    ],
    "bars": 16
   },
   {
    "section": "Chorus 3 (x2)",
    "chords": [
     "Dm",
     "Dm",
     "C",
     "C",
     "Gm",
     "Gm",
     "Gm",
     "Bb"
    ],
    "bars": 16
   },
   {
    "section": "Outro",
    "chords": [
     "Dm",
     "C",
     "Gm",
     "Gm",
     "Dm",
     "C",
     "Bb",
     "C"
    ],
    "bars": 8
   }
  ]
 },
 "Somebody's Me": {
  "status": "uncertain",
  "key": "Ab major",
  "capoNote": "Capo 1, G shapes (G C Am D Bm)",
  "bpm": 83,
  "beatsPerBar": 4,
  "durationSec": 238,
  "chords": [
   "Ab",
   "Db",
   "Bbm",
   "Eb"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "Ab",
     "Db"
    ],
    "bars": 4
   },
   {
    "section": "Verse 1",
    "chords": [
     "Ab",
     "Db",
     "Ab",
     "Db"
    ],
    "bars": 16
   },
   {
    "section": "Chorus 1",
    "chords": [
     "Bbm",
     "Db",
     "Ab",
     "Eb"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "Ab",
     "Db",
     "Ab",
     "Db"
    ],
    "bars": 8
   },
   {
    "section": "Chorus 2",
    "chords": [
     "Bbm",
     "Db",
     "Ab",
     "Eb"
    ],
    "bars": 8
   },
   {
    "section": "Bridge",
    "chords": [
     "Cm",
     "Cm",
     "Db",
     "Db",
     "Ab",
     "Ab",
     "Eb",
     "Eb"
    ],
    "bars": 8
   },
   {
    "section": "Verse 3",
    "chords": [
     "Ab",
     "Db",
     "Ab",
     "Db"
    ],
    "bars": 8
   },
   {
    "section": "Final chorus (x2)",
    "chords": [
     "Bbm",
     "Db",
     "Ab",
     "Eb"
    ],
    "bars": 16
   },
   {
    "section": "Outro",
    "chords": [
     "Ab",
     "Db"
    ],
    "bars": 6
   }
  ]
 },
 "Still D.R.E.": {
  "status": "uncertain",
  "key": "Bb minor (recording sits between A minor and Bb minor; many piano tutorials teach it in A minor as Am, Am, Am9, Em)",
  "bpm": 93,
  "beatsPerBar": 4,
  "durationSec": 274,
  "chords": [
   "Bbm",
   "Bbm",
   "Bbm7",
   "Fm"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "Bbm",
     "Bbm",
     "Bbm7",
     "Fm"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "Bbm",
     "Bbm",
     "Bbm7",
     "Fm"
    ],
    "per": 0.5,
    "bars": 16
   },
   {
    "section": "Hook",
    "chords": [
     "Bbm",
     "Bbm",
     "Bbm7",
     "Fm"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "Bbm",
     "Bbm",
     "Bbm7",
     "Fm"
    ],
    "per": 0.5,
    "bars": 16
   },
   {
    "section": "Hook",
    "chords": [
     "Bbm",
     "Bbm",
     "Bbm7",
     "Fm"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Verse 3",
    "chords": [
     "Bbm",
     "Bbm",
     "Bbm7",
     "Fm"
    ],
    "per": 0.5,
    "bars": 16
   },
   {
    "section": "Hook",
    "chords": [
     "Bbm",
     "Bbm",
     "Bbm7",
     "Fm"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Outro (instrumental)",
    "chords": [
     "Bbm",
     "Bbm",
     "Bbm7",
     "Fm"
    ],
    "per": 0.5,
    "bars": 24
   }
  ]
 },
 "25 Minutes": {
  "status": "corrected",
  "key": "F# major",
  "tuning": "half step down",
  "capoNote": "Tune half step down and play G shapes (G D Em Bm C A F)",
  "bpm": 82,
  "beatsPerBar": 4,
  "durationSec": 264,
  "chords": [
   "F#",
   "C#",
   "B",
   "C#"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "F#",
     "C#",
     "B",
     "C#"
    ],
    "bars": 4
   },
   {
    "section": "Verse 1",
    "chords": [
     "F#",
     "C#",
     "D#m",
     "A#m",
     "B",
     "F#",
     "G#",
     "C#"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Refrain",
    "chords": [
     "C#",
     "F#",
     "C#",
     "F#",
     "A#m",
     "B",
     "F#",
     "C#",
     "C#",
     "F#",
     "C#",
     "F#",
     "D#m",
     "B",
     "F#",
     "C#"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Chorus 1",
    "chords": [
     "F#",
     "C#",
     "B",
     "C#"
    ],
    "bars": 8
   },
   {
    "section": "Interlude",
    "chords": [
     "F#",
     "C#",
     "B",
     "C#"
    ],
    "bars": 4
   },
   {
    "section": "Verse 2",
    "chords": [
     "F#",
     "C#",
     "D#m",
     "A#m",
     "B",
     "F#",
     "G#",
     "C#"
    ],
    "per": 0.5,
    "bars": 4
   },
   {
    "section": "Refrain",
    "chords": [
     "C#",
     "F#",
     "C#",
     "F#",
     "A#m",
     "B",
     "F#",
     "C#",
     "C#",
     "F#",
     "C#",
     "F#",
     "D#m",
     "B",
     "F#",
     "C#"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Chorus 2",
    "chords": [
     "F#",
     "C#",
     "B",
     "C#"
    ],
    "bars": 8
   },
   {
    "section": "Bridge",
    "chords": [
     "E",
     "B",
     "F#",
     "C#"
    ],
    "bars": 8
   },
   {
    "section": "Final chorus (x3)",
    "chords": [
     "F#",
     "C#",
     "B",
     "C#"
    ],
    "bars": 24
   },
   {
    "section": "Outro",
    "chords": [
     "F#",
     "C#",
     "B",
     "C#",
     "F#",
     "F#",
     "F#",
     "F#"
    ],
    "per": 0.5,
    "bars": 4
   }
  ]
 },
 "Someday": {
  "status": "uncertain",
  "key": "D major",
  "bpm": 82,
  "beatsPerBar": 4,
  "durationSec": 233,
  "chords": [
   "Bm",
   "G",
   "D",
   "A"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "Bm",
     "G",
     "D",
     "A"
    ],
    "bars": 4
   },
   {
    "section": "Verse 1",
    "chords": [
     "Bm",
     "G",
     "D",
     "A"
    ],
    "bars": 16
   },
   {
    "section": "Chorus 1",
    "chords": [
     "D",
     "A",
     "Bm",
     "G",
     "D",
     "A",
     "G",
     "A"
    ],
    "bars": 12
   },
   {
    "section": "Verse 2",
    "chords": [
     "Bm",
     "G",
     "D",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Chorus 2",
    "chords": [
     "D",
     "A",
     "Bm",
     "G",
     "D",
     "A",
     "G",
     "A"
    ],
    "bars": 12
   },
   {
    "section": "Bridge",
    "chords": [
     "G",
     "Gm",
     "C",
     "D",
     "G",
     "Gm",
     "A",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Instrumental (guitar)",
    "chords": [
     "Bm",
     "G",
     "D",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Final chorus",
    "chords": [
     "D",
     "A",
     "Bm",
     "G",
     "D",
     "A",
     "G",
     "A"
    ],
    "bars": 12
   }
  ],
  "solos": [
   {
    "section": "Instrumental (guitar)",
    "scale": "B minor pentatonic box 1 at 7th fret (D major pentatonic)",
    "tips": "Follow the vocal melody of the chorus by ear first, then add a bend on the last note of each phrase.",
    "chords": [
     "Bm",
     "G",
     "D",
     "A"
    ]
   }
  ]
 },
 "My Love Mine All Mine": {
  "status": "corrected",
  "key": "A major (recording tuned to A4=434 Hz, slightly flat)",
  "bpm": 57,
  "beatsPerBar": 4,
  "durationSec": 137,
  "chords": [
   "Amaj7",
   "C#7",
   "D",
   "Dm"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "Amaj7",
     "Dm6"
    ],
    "bars": 2
   },
   {
    "section": "Verse 1",
    "chords": [
     "Amaj7",
     "C#7",
     "D",
     "Dm"
    ],
    "bars": 8
   },
   {
    "section": "Chorus 1",
    "chords": [
     "Amaj7",
     "C#7",
     "D",
     "Dm"
    ],
    "bars": 8
   },
   {
    "section": "Post-chorus",
    "chords": [
     "Amaj7",
     "C#7",
     "D",
     "Dm"
    ],
    "per": 0.5,
    "bars": 2
   },
   {
    "section": "Verse 2",
    "chords": [
     "Amaj7",
     "C#7",
     "D",
     "Dm"
    ],
    "bars": 4
   },
   {
    "section": "Final chorus",
    "chords": [
     "Amaj7",
     "C#7",
     "D",
     "Dm"
    ],
    "bars": 8
   }
  ]
 },
 "Heart and Soul": {
  "status": "uncertain",
  "key": "C major",
  "bpm": 120,
  "beatsPerBar": 4,
  "durationSec": 128,
  "chords": [
   "C",
   "Am",
   "F",
   "G"
  ],
  "structure": [
   {
    "section": "Intro (bass loop)",
    "chords": [
     "C",
     "Am",
     "F",
     "G"
    ],
    "bars": 4
   },
   {
    "section": "A section",
    "chords": [
     "C",
     "Am",
     "F",
     "G"
    ],
    "bars": 8
   },
   {
    "section": "A section",
    "chords": [
     "C",
     "Am",
     "F",
     "G"
    ],
    "bars": 8
   },
   {
    "section": "Bridge",
    "chords": [
     "C",
     "C7",
     "F",
     "C",
     "F",
     "C",
     "G",
     "G7"
    ],
    "bars": 8
   },
   {
    "section": "A section",
    "chords": [
     "C",
     "Am",
     "F",
     "G"
    ],
    "bars": 8
   },
   {
    "section": "Instrumental A",
    "chords": [
     "C",
     "Am",
     "F",
     "G"
    ],
    "bars": 8
   },
   {
    "section": "Bridge",
    "chords": [
     "C",
     "C7",
     "F",
     "C",
     "F",
     "C",
     "G",
     "G7"
    ],
    "bars": 8
   },
   {
    "section": "A section",
    "chords": [
     "C",
     "Am",
     "F",
     "G"
    ],
    "bars": 8
   },
   {
    "section": "Outro",
    "chords": [
     "F",
     "G",
     "C",
     "C"
    ],
    "bars": 4
   }
  ]
 },
 "Hallelujah": {
  "status": "corrected",
  "key": "C major",
  "capoNote": "Guitar: capo 5 with G shapes (G Em C D B7) also sounds in C",
  "bpm": 76,
  "beatsPerBar": 4,
  "durationSec": 279,
  "chords": [
   "C",
   "Am",
   "F",
   "G",
   "E7"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "C",
     "Am"
    ],
    "bars": 4
   },
   {
    "section": "Verse 1",
    "chords": [
     "C",
     "C",
     "Am",
     "Am",
     "C",
     "C",
     "Am",
     "Am",
     "F",
     "G",
     "C",
     "G",
     "C",
     "F",
     "G",
     "G",
     "Am",
     "Am",
     "F",
     "F",
     "G",
     "E7",
     "Am",
     "Am"
    ],
    "per": 0.5,
    "bars": 12
   },
   {
    "section": "Chorus 1",
    "chords": [
     "F",
     "Am",
     "F",
     "C",
     "G",
     "C",
     "G",
     "C"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "C",
     "C",
     "Am",
     "Am",
     "C",
     "C",
     "Am",
     "Am",
     "F",
     "G",
     "C",
     "G",
     "C",
     "F",
     "G",
     "G",
     "Am",
     "Am",
     "F",
     "F",
     "G",
     "E7",
     "Am",
     "Am"
    ],
    "per": 0.5,
    "bars": 12
   },
   {
    "section": "Chorus 2",
    "chords": [
     "F",
     "Am",
     "F",
     "C",
     "G",
     "C",
     "G",
     "C"
    ],
    "bars": 8
   },
   {
    "section": "Verse 3",
    "chords": [
     "C",
     "C",
     "Am",
     "Am",
     "C",
     "C",
     "Am",
     "Am",
     "F",
     "G",
     "C",
     "G",
     "C",
     "F",
     "G",
     "G",
     "Am",
     "Am",
     "F",
     "F",
     "G",
     "E7",
     "Am",
     "Am"
    ],
    "per": 0.5,
    "bars": 12
   },
   {
    "section": "Chorus 3",
    "chords": [
     "F",
     "Am",
     "F",
     "C",
     "G",
     "C",
     "G",
     "C"
    ],
    "bars": 8
   },
   {
    "section": "Verse 4",
    "chords": [
     "C",
     "C",
     "Am",
     "Am",
     "C",
     "C",
     "Am",
     "Am",
     "F",
     "G",
     "C",
     "G",
     "C",
     "F",
     "G",
     "G",
     "Am",
     "Am",
     "F",
     "F",
     "G",
     "E7",
     "Am",
     "Am"
    ],
    "per": 0.5,
    "bars": 12
   },
   {
    "section": "Final chorus (extended)",
    "chords": [
     "F",
     "Am",
     "F",
     "C",
     "G",
     "C",
     "G",
     "C"
    ],
    "bars": 16
   }
  ]
 },
 "Imagine": {
  "status": "corrected",
  "key": "C major",
  "bpm": 76,
  "beatsPerBar": 4,
  "durationSec": 183,
  "chords": [
   "C",
   "Cmaj7",
   "F"
  ],
  "structure": [
   {
    "section": "Piano intro",
    "chords": [
     "C",
     "Cmaj7",
     "F",
     "F"
    ],
    "per": 0.5,
    "bars": 4
   },
   {
    "section": "Verse 1",
    "chords": [
     "C",
     "Cmaj7",
     "F",
     "F"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Pre-chorus 1",
    "chords": [
     "F",
     "Am/E",
     "Dm7",
     "F/C",
     "G",
     "G",
     "C/G",
     "G7"
    ],
    "per": 0.5,
    "bars": 4
   },
   {
    "section": "Verse 2",
    "chords": [
     "C",
     "Cmaj7",
     "F",
     "F"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Pre-chorus 2",
    "chords": [
     "F",
     "Am/E",
     "Dm7",
     "F/C",
     "G",
     "G",
     "C/G",
     "G7"
    ],
    "per": 0.5,
    "bars": 4
   },
   {
    "section": "Chorus 1",
    "chords": [
     "F",
     "G",
     "C",
     "E7"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Verse 3",
    "chords": [
     "C",
     "Cmaj7",
     "F",
     "F"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Pre-chorus 3",
    "chords": [
     "F",
     "Am/E",
     "Dm7",
     "F/C",
     "G",
     "G",
     "C/G",
     "G7"
    ],
    "per": 0.5,
    "bars": 4
   },
   {
    "section": "Final chorus",
    "chords": [
     "F",
     "G",
     "C",
     "E7",
     "F",
     "G",
     "C",
     "E7",
     "F",
     "G",
     "C",
     "E7",
     "F",
     "G",
     "C",
     "C"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Ending",
    "chords": [
     "C"
    ],
    "bars": 1
   }
  ],
  "pianoVideo": {
   "id": "YkgkThdzX-8",
   "title": "IMAGINE. (Ultimate Mix, 2020) - John Lennon & The Plastic Ono Band (with the Flux Fiddlers) HD",
   "channel": "johnlennon"
  }
 },
 "Happy Birthday to You": {
  "status": "corrected",
  "key": "C major",
  "bpm": 100,
  "beatsPerBar": 3,
  "durationSec": 29,
  "chords": [
   "C",
   "G7",
   "C7",
   "F"
  ],
  "structure": [
   {
    "section": "Song (once through)",
    "chords": [
     "C",
     "C",
     "G7",
     "G7",
     "G7",
     "G7",
     "C",
     "C",
     "C7",
     "C7",
     "F",
     "F",
     "C",
     "G7",
     "C",
     "C"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Repeat (optional, with name)",
    "chords": [
     "C",
     "C",
     "G7",
     "G7",
     "G7",
     "G7",
     "C",
     "C",
     "C7",
     "C7",
     "F",
     "F",
     "C",
     "G7",
     "C",
     "C"
    ],
    "per": 0.5,
    "bars": 8
   }
  ]
 },
 "Twinkle Twinkle Little Star": {
  "status": "verified",
  "key": "C major",
  "bpm": 100,
  "beatsPerBar": 4,
  "durationSec": 58,
  "chords": [
   "C",
   "F",
   "C",
   "G7"
  ],
  "structure": [
   {
    "section": "A section",
    "chords": [
     "C",
     "C",
     "F",
     "C",
     "F",
     "C",
     "G7",
     "C"
    ],
    "per": 0.5,
    "bars": 4
   },
   {
    "section": "B section",
    "chords": [
     "C",
     "F",
     "C",
     "G7",
     "C",
     "F",
     "C",
     "G7"
    ],
    "per": 0.5,
    "bars": 4
   },
   {
    "section": "A section (return)",
    "chords": [
     "C",
     "C",
     "F",
     "C",
     "F",
     "C",
     "G7",
     "C"
    ],
    "per": 0.5,
    "bars": 4
   },
   {
    "section": "A section (verse 2)",
    "chords": [
     "C",
     "C",
     "F",
     "C",
     "F",
     "C",
     "G7",
     "C"
    ],
    "per": 0.5,
    "bars": 4
   },
   {
    "section": "B section",
    "chords": [
     "C",
     "F",
     "C",
     "G7",
     "C",
     "F",
     "C",
     "G7"
    ],
    "per": 0.5,
    "bars": 4
   },
   {
    "section": "A section (return)",
    "chords": [
     "C",
     "C",
     "F",
     "C",
     "F",
     "C",
     "G7",
     "C"
    ],
    "per": 0.5,
    "bars": 4
   }
  ]
 },
 "Brown Eyed Girl": {
  "status": "corrected",
  "key": "G major",
  "bpm": 150,
  "beatsPerBar": 4,
  "durationSec": 184,
  "chords": [
   "G",
   "C",
   "G",
   "D"
  ],
  "structure": [
   {
    "section": "Intro riff",
    "chords": [
     "G",
     "C",
     "G",
     "D"
    ],
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "G",
     "C",
     "G",
     "D"
    ],
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "C",
     "D",
     "G",
     "Em",
     "C",
     "D",
     "G",
     "D"
    ],
    "bars": 8
   },
   {
    "section": "Riff interlude",
    "chords": [
     "G",
     "C",
     "G",
     "D"
    ],
    "bars": 4
   },
   {
    "section": "Verse 2",
    "chords": [
     "G",
     "C",
     "G",
     "D"
    ],
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "C",
     "D",
     "G",
     "Em",
     "C",
     "D",
     "G",
     "D"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "D7",
     "D7",
     "G",
     "C",
     "G",
     "D",
     "G",
     "C",
     "G",
     "D"
    ],
    "bars": 10
   },
   {
    "section": "Instrumental break",
    "chords": [
     "G",
     "C",
     "G",
     "D"
    ],
    "bars": 8
   },
   {
    "section": "Verse 3",
    "chords": [
     "G",
     "C",
     "G",
     "D"
    ],
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "C",
     "D",
     "G",
     "Em",
     "C",
     "D",
     "G",
     "D"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "D7",
     "D7",
     "G",
     "C",
     "G",
     "D",
     "G",
     "C",
     "G",
     "D"
    ],
    "bars": 10
   },
   {
    "section": "Outro chorus",
    "chords": [
     "G",
     "C",
     "G",
     "D"
    ],
    "bars": 8
   }
  ]
 },
 "Three Little Birds": {
  "status": "corrected",
  "key": "A major",
  "bpm": 74,
  "beatsPerBar": 4,
  "durationSec": 180,
  "chords": [
   "A",
   "D",
   "A",
   "E"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "A",
     "A",
     "D",
     "A"
    ],
    "bars": 4
   },
   {
    "section": "Chorus",
    "chords": [
     "A",
     "A",
     "D",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "A",
     "E",
     "A",
     "D",
     "A",
     "E",
     "D",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "A",
     "A",
     "D",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "A",
     "E",
     "A",
     "D",
     "A",
     "E",
     "D",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "A",
     "A",
     "D",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Outro chorus (repeats to fade)",
    "chords": [
     "A",
     "A",
     "D",
     "A"
    ],
    "bars": 12
   }
  ]
 },
 "Jingle Bells": {
  "status": "corrected",
  "key": "G major",
  "bpm": 110,
  "beatsPerBar": 4,
  "durationSec": 140,
  "chords": [
   "G",
   "C",
   "D7",
   "G"
  ],
  "structure": [
   {
    "section": "Verse 1",
    "chords": [
     "G",
     "G",
     "G",
     "C",
     "C",
     "D7",
     "D7",
     "G",
     "G",
     "G",
     "G",
     "C",
     "C",
     "Am",
     "D7",
     "D7"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "G",
     "G",
     "G",
     "G",
     "C",
     "G",
     "A7",
     "D7",
     "G",
     "G",
     "G",
     "G",
     "C",
     "G",
     "D7",
     "G"
    ],
    "bars": 16
   },
   {
    "section": "Verse 2",
    "chords": [
     "G",
     "G",
     "G",
     "C",
     "C",
     "D7",
     "D7",
     "G",
     "G",
     "G",
     "G",
     "C",
     "C",
     "Am",
     "D7",
     "D7"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "G",
     "G",
     "G",
     "G",
     "C",
     "G",
     "A7",
     "D7",
     "G",
     "G",
     "G",
     "G",
     "C",
     "G",
     "D7",
     "G"
    ],
    "bars": 16
   }
  ]
 },
 "Hey Jude": {
  "status": "corrected",
  "key": "F major",
  "bpm": 74,
  "beatsPerBar": 4,
  "durationSec": 431,
  "chords": [
   "F",
   "C",
   "C7",
   "F",
   "Bb",
   "F",
   "C7",
   "F"
  ],
  "structure": [
   {
    "section": "Verse 1",
    "chords": [
     "F",
     "C",
     "C7",
     "F",
     "Bb",
     "F",
     "C7",
     "F"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "F",
     "C",
     "C7",
     "F",
     "Bb",
     "F",
     "C7",
     "F"
    ],
    "bars": 8
   },
   {
    "section": "Bridge 1",
    "chords": [
     "Bb",
     "Bb/A",
     "Gm",
     "C7",
     "F",
     "F7",
     "Bb",
     "Bb/A",
     "Gm",
     "C7",
     "F",
     "C7",
     "C7"
    ],
    "bars": 13
   },
   {
    "section": "Verse 3",
    "chords": [
     "F",
     "C",
     "C7",
     "F",
     "Bb",
     "F",
     "C7",
     "F"
    ],
    "bars": 8
   },
   {
    "section": "Bridge 2",
    "chords": [
     "Bb",
     "Bb/A",
     "Gm",
     "C7",
     "F",
     "F7",
     "Bb",
     "Bb/A",
     "Gm",
     "C7",
     "F",
     "C7",
     "C7"
    ],
    "bars": 13
   },
   {
    "section": "Verse 4 (extended ending)",
    "chords": [
     "F",
     "C",
     "C7",
     "F",
     "Bb",
     "F",
     "C7",
     "F",
     "F",
     "F"
    ],
    "bars": 10
   },
   {
    "section": "Coda (repeats to fade)",
    "chords": [
     "F",
     "Eb",
     "Bb",
     "F"
    ],
    "bars": 72
   }
  ]
 },
 "Take Me Home, Country Roads": {
  "status": "corrected",
  "key": "A major",
  "capoNote": "Capo 2, G shapes (G-Em-D-C)",
  "bpm": 82,
  "beatsPerBar": 4,
  "durationSec": 190,
  "chords": [
   "A",
   "F#m",
   "E",
   "D"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "A"
    ],
    "bars": 2
   },
   {
    "section": "Verse 1",
    "chords": [
     "A",
     "F#m",
     "E",
     "D",
     "A",
     "F#m",
     "E",
     "D"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "A",
     "E",
     "F#m",
     "D",
     "A",
     "E",
     "D",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "A",
     "F#m",
     "E",
     "D",
     "A",
     "F#m",
     "E",
     "D"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "A",
     "E",
     "F#m",
     "D",
     "A",
     "E",
     "D",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Bridge",
    "chords": [
     "F#m",
     "E",
     "A",
     "D",
     "A",
     "E",
     "F#m",
     "G",
     "D",
     "A",
     "E",
     "E7"
    ],
    "bars": 12
   },
   {
    "section": "Chorus",
    "chords": [
     "A",
     "E",
     "F#m",
     "D",
     "A",
     "E",
     "D",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "A",
     "E",
     "F#m",
     "D",
     "A",
     "E",
     "D",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Outro tag",
    "chords": [
     "E",
     "A"
    ],
    "bars": 4
   }
  ]
 },
 "Autumn Leaves (Chet Baker, simplified)": {
  "status": "uncertain",
  "key": "G minor",
  "bpm": 93,
  "beatsPerBar": 4,
  "durationSec": 422,
  "chords": [
   "Cm7",
   "F7",
   "Bbmaj7",
   "Ebmaj7",
   "Am7b5",
   "D7",
   "Gm"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "Am7b5",
     "D7",
     "Gm",
     "Gm"
    ],
    "bars": 4
   },
   {
    "section": "Head in - A1",
    "chords": [
     "Cm7",
     "F7",
     "Bbmaj7",
     "Ebmaj7",
     "Am7b5",
     "D7",
     "Gm",
     "Gm"
    ],
    "bars": 8
   },
   {
    "section": "Head in - A2",
    "chords": [
     "Cm7",
     "F7",
     "Bbmaj7",
     "Ebmaj7",
     "Am7b5",
     "D7",
     "Gm",
     "Gm"
    ],
    "bars": 8
   },
   {
    "section": "Head in - B",
    "chords": [
     "Am7b5",
     "D7",
     "Gm",
     "Gm",
     "Cm7",
     "F7",
     "Bbmaj7",
     "Ebmaj7"
    ],
    "bars": 8
   },
   {
    "section": "Head in - C",
    "chords": [
     "Am7b5",
     "Am7b5",
     "D7",
     "D7",
     "Gm7",
     "C7",
     "Fm7",
     "Bb7",
     "Ebmaj7",
     "Ebmaj7",
     "Am7b5",
     "D7",
     "Gm",
     "Gm",
     "Gm",
     "Gm"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Solo chorus 1 (alto sax) - A1",
    "chords": [
     "Cm7",
     "F7",
     "Bbmaj7",
     "Ebmaj7",
     "Am7b5",
     "D7",
     "Gm",
     "Gm"
    ],
    "bars": 8
   },
   {
    "section": "Solo chorus 1 (alto sax) - A2",
    "chords": [
     "Cm7",
     "F7",
     "Bbmaj7",
     "Ebmaj7",
     "Am7b5",
     "D7",
     "Gm",
     "Gm"
    ],
    "bars": 8
   },
   {
    "section": "Solo chorus 1 (alto sax) - B",
    "chords": [
     "Am7b5",
     "D7",
     "Gm",
     "Gm",
     "Cm7",
     "F7",
     "Bbmaj7",
     "Ebmaj7"
    ],
    "bars": 8
   },
   {
    "section": "Solo chorus 1 (alto sax) - C",
    "chords": [
     "Am7b5",
     "Am7b5",
     "D7",
     "D7",
     "Gm7",
     "C7",
     "Fm7",
     "Bb7",
     "Ebmaj7",
     "Ebmaj7",
     "Am7b5",
     "D7",
     "Gm",
     "Gm",
     "Gm",
     "Gm"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Solo chorus 2 (trumpet) - A1",
    "chords": [
     "Cm7",
     "F7",
     "Bbmaj7",
     "Ebmaj7",
     "Am7b5",
     "D7",
     "Gm",
     "Gm"
    ],
    "bars": 8
   },
   {
    "section": "Solo chorus 2 (trumpet) - A2",
    "chords": [
     "Cm7",
     "F7",
     "Bbmaj7",
     "Ebmaj7",
     "Am7b5",
     "D7",
     "Gm",
     "Gm"
    ],
    "bars": 8
   },
   {
    "section": "Solo chorus 2 (trumpet) - B",
    "chords": [
     "Am7b5",
     "D7",
     "Gm",
     "Gm",
     "Cm7",
     "F7",
     "Bbmaj7",
     "Ebmaj7"
    ],
    "bars": 8
   },
   {
    "section": "Solo chorus 2 (trumpet) - C",
    "chords": [
     "Am7b5",
     "Am7b5",
     "D7",
     "D7",
     "Gm7",
     "C7",
     "Fm7",
     "Bb7",
     "Ebmaj7",
     "Ebmaj7",
     "Am7b5",
     "D7",
     "Gm",
     "Gm",
     "Gm",
     "Gm"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Solo chorus 3 (electric piano) - A1",
    "chords": [
     "Cm7",
     "F7",
     "Bbmaj7",
     "Ebmaj7",
     "Am7b5",
     "D7",
     "Gm",
     "Gm"
    ],
    "bars": 8
   },
   {
    "section": "Solo chorus 3 (electric piano) - A2",
    "chords": [
     "Cm7",
     "F7",
     "Bbmaj7",
     "Ebmaj7",
     "Am7b5",
     "D7",
     "Gm",
     "Gm"
    ],
    "bars": 8
   },
   {
    "section": "Solo chorus 3 (electric piano) - B",
    "chords": [
     "Am7b5",
     "D7",
     "Gm",
     "Gm",
     "Cm7",
     "F7",
     "Bbmaj7",
     "Ebmaj7"
    ],
    "bars": 8
   },
   {
    "section": "Solo chorus 3 (electric piano) - C",
    "chords": [
     "Am7b5",
     "Am7b5",
     "D7",
     "D7",
     "Gm7",
     "C7",
     "Fm7",
     "Bb7",
     "Ebmaj7",
     "Ebmaj7",
     "Am7b5",
     "D7",
     "Gm",
     "Gm",
     "Gm",
     "Gm"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Head out - A1",
    "chords": [
     "Cm7",
     "F7",
     "Bbmaj7",
     "Ebmaj7",
     "Am7b5",
     "D7",
     "Gm",
     "Gm"
    ],
    "bars": 8
   },
   {
    "section": "Head out - A2",
    "chords": [
     "Cm7",
     "F7",
     "Bbmaj7",
     "Ebmaj7",
     "Am7b5",
     "D7",
     "Gm",
     "Gm"
    ],
    "bars": 8
   },
   {
    "section": "Head out - B",
    "chords": [
     "Am7b5",
     "D7",
     "Gm",
     "Gm",
     "Cm7",
     "F7",
     "Bbmaj7",
     "Ebmaj7"
    ],
    "bars": 8
   },
   {
    "section": "Head out - C",
    "chords": [
     "Am7b5",
     "Am7b5",
     "D7",
     "D7",
     "Gm7",
     "C7",
     "Fm7",
     "Bb7",
     "Ebmaj7",
     "Ebmaj7",
     "Am7b5",
     "D7",
     "Gm",
     "Gm",
     "Gm",
     "Gm"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Ending",
    "chords": [
     "Am7b5",
     "D7",
     "Gm",
     "Gm"
    ],
    "bars": 4
   }
  ],
  "solos": [
   {
    "section": "Solo choruses",
    "scale": "G minor pentatonic (box 1 at 3rd fret or 10th fret) for the Gm/Cm7 bars, Bb major scale over Cm7-F7-Bbmaj7-Ebmaj7, G harmonic minor over Am7b5-D7",
    "tips": "Aim for the chord tone that changes between each pair (Bb on Cm7 moving to A on F7). Leave space at the end of every 4 bars, the way the horns breathe between phrases.",
    "chords": [
     "Cm7",
     "F7",
     "Bbmaj7",
     "Ebmaj7",
     "Am7b5",
     "D7",
     "Gm",
     "Gm"
    ]
   }
  ]
 },
 "My Funny Valentine (easy version)": {
  "status": "corrected",
  "key": "C minor",
  "bpm": 66,
  "beatsPerBar": 4,
  "durationSec": 141,
  "chords": [
   "Cm",
   "Cm/B",
   "Cm7/Bb",
   "Cm6/A"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "Dm7b5",
     "G7"
    ],
    "bars": 2
   },
   {
    "section": "A1",
    "chords": [
     "Cm",
     "Cm/B",
     "Cm7/Bb",
     "Cm6/A",
     "Abmaj7",
     "Fm7",
     "Dm7b5",
     "G7"
    ],
    "bars": 8
   },
   {
    "section": "A2",
    "chords": [
     "Cm",
     "Cm/B",
     "Cm7/Bb",
     "Cm6/A",
     "Abmaj7",
     "Fm7",
     "Dm7b5",
     "G7"
    ],
    "bars": 8
   },
   {
    "section": "Bridge",
    "chords": [
     "Ebmaj7",
     "Fm7",
     "Gm7",
     "Fm7",
     "Ebmaj7",
     "Fm7",
     "Gm7",
     "Fm7",
     "Ebmaj7",
     "Gm7",
     "Cm7",
     "F7",
     "Fm7",
     "Bb7",
     "Dm7b5",
     "G7"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "A3 (extended to 12 bars)",
    "chords": [
     "Cm",
     "Cm/B",
     "Cm7/Bb",
     "Cm6/A",
     "Abmaj7",
     "Fm7",
     "Bb7",
     "Ebmaj7",
     "Abmaj7",
     "Dm7b5",
     "G7",
     "Cm"
    ],
    "bars": 12
   }
  ]
 },
 "Clocks": {
  "status": "corrected",
  "key": "Eb major (Eb Mixolydian; bridge in Db)",
  "bpm": 131,
  "beatsPerBar": 4,
  "durationSec": 308,
  "chords": [
   "Eb",
   "Bbm",
   "Bbm",
   "Fm"
  ],
  "structure": [
   {
    "section": "Intro (piano riff)",
    "chords": [
     "Eb",
     "Bbm",
     "Bbm",
     "Fm"
    ],
    "bars": 16
   },
   {
    "section": "Verse 1",
    "chords": [
     "Eb",
     "Bbm",
     "Bbm",
     "Fm"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "Eb",
     "Bbm",
     "Bbm",
     "Fm"
    ],
    "bars": 16
   },
   {
    "section": "Piano riff interlude",
    "chords": [
     "Eb",
     "Bbm",
     "Bbm",
     "Fm"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "Eb",
     "Bbm",
     "Bbm",
     "Fm"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "Eb",
     "Bbm",
     "Bbm",
     "Fm"
    ],
    "bars": 16
   },
   {
    "section": "Piano riff interlude",
    "chords": [
     "Eb",
     "Bbm",
     "Bbm",
     "Fm"
    ],
    "bars": 16
   },
   {
    "section": "Bridge",
    "chords": [
     "Gbmaj7",
     "Db",
     "Ab",
     "Ab"
    ],
    "bars": 16
   },
   {
    "section": "Piano riff (full band)",
    "chords": [
     "Eb",
     "Bbm",
     "Bbm",
     "Fm"
    ],
    "bars": 16
   },
   {
    "section": "Outro (fades)",
    "chords": [
     "Gbmaj7",
     "Db",
     "Ab",
     "Ab"
    ],
    "bars": 28
   }
  ]
 },
 "Piano Man": {
  "status": "corrected",
  "key": "C major",
  "bpm": 178,
  "beatsPerBar": 3,
  "durationSec": 339,
  "chords": [
   "C",
   "G/B",
   "F/A",
   "C/G",
   "F",
   "C/E",
   "D7",
   "G"
  ],
  "structure": [
   {
    "section": "Intro (solo piano lick)",
    "chords": [
     "Dm7",
     "Bdim/F"
    ],
    "per": 3,
    "bars": 6
   },
   {
    "section": "Intro (piano + harmonica)",
    "chords": [
     "C",
     "G/B",
     "F/A",
     "C/G",
     "F",
     "C/E",
     "D7",
     "G",
     "C",
     "G/B",
     "F/A",
     "C/G",
     "F",
     "G",
     "C",
     "C"
    ],
    "bars": 32
   },
   {
    "section": "Verse 1",
    "chords": [
     "C",
     "G/B",
     "F/A",
     "C/G",
     "F",
     "C/E",
     "D7",
     "G",
     "C",
     "G/B",
     "F/A",
     "C/G",
     "F",
     "G",
     "C",
     "C"
    ],
    "bars": 16
   },
   {
    "section": "Verse 2",
    "chords": [
     "C",
     "G/B",
     "F/A",
     "C/G",
     "F",
     "C/E",
     "D7",
     "G",
     "C",
     "G/B",
     "F/A",
     "C/G",
     "F",
     "G",
     "C",
     "C"
    ],
    "bars": 16
   },
   {
    "section": "Interlude (vocal hum)",
    "chords": [
     "Am",
     "Am/G",
     "D/F#",
     "F",
     "Am",
     "Am/G",
     "D/F#",
     "G",
     "G/F",
     "C/E",
     "D7",
     "G"
    ],
    "bars": 12
   },
   {
    "section": "Chorus 1",
    "chords": [
     "C",
     "G/B",
     "F/A",
     "C/G",
     "F",
     "C/E",
     "D7",
     "G",
     "C",
     "G/B",
     "F/A",
     "C/G",
     "F",
     "G",
     "C",
     "C"
    ],
    "bars": 32
   },
   {
    "section": "Harmonica break",
    "chords": [
     "C",
     "G/B",
     "F/A",
     "C/G",
     "F",
     "C/E",
     "D7",
     "G",
     "C",
     "G/B",
     "F/A",
     "C/G",
     "F",
     "G",
     "C",
     "C"
    ],
    "bars": 16
   },
   {
    "section": "Verse 3",
    "chords": [
     "C",
     "G/B",
     "F/A",
     "C/G",
     "F",
     "C/E",
     "D7",
     "G",
     "C",
     "G/B",
     "F/A",
     "C/G",
     "F",
     "G",
     "C",
     "C"
    ],
    "bars": 16
   },
   {
    "section": "Verse 4",
    "chords": [
     "C",
     "G/B",
     "F/A",
     "C/G",
     "F",
     "C/E",
     "D7",
     "G",
     "C",
     "G/B",
     "F/A",
     "C/G",
     "F",
     "G",
     "C",
     "C"
    ],
    "bars": 16
   },
   {
    "section": "Interlude (vocal hum)",
    "chords": [
     "Am",
     "Am/G",
     "D/F#",
     "F",
     "Am",
     "Am/G",
     "D/F#",
     "G",
     "G/F",
     "C/E",
     "D7",
     "G"
    ],
    "bars": 12
   },
   {
    "section": "Chorus 2",
    "chords": [
     "C",
     "G/B",
     "F/A",
     "C/G",
     "F",
     "C/E",
     "D7",
     "G",
     "C",
     "G/B",
     "F/A",
     "C/G",
     "F",
     "G",
     "C",
     "C"
    ],
    "bars": 32
   },
   {
    "section": "Harmonica break",
    "chords": [
     "C",
     "G/B",
     "F/A",
     "C/G",
     "F",
     "C/E",
     "D7",
     "G",
     "C",
     "G/B",
     "F/A",
     "C/G",
     "F",
     "G",
     "C",
     "C"
    ],
    "bars": 16
   },
   {
    "section": "Verse 5",
    "chords": [
     "C",
     "G/B",
     "F/A",
     "C/G",
     "F",
     "C/E",
     "D7",
     "G",
     "C",
     "G/B",
     "F/A",
     "C/G",
     "F",
     "G",
     "C",
     "C"
    ],
    "bars": 16
   },
   {
    "section": "Verse 6",
    "chords": [
     "C",
     "G/B",
     "F/A",
     "C/G",
     "F",
     "C/E",
     "D7",
     "G",
     "C",
     "G/B",
     "F/A",
     "C/G",
     "F",
     "G",
     "C",
     "C"
    ],
    "bars": 16
   },
   {
    "section": "Interlude (vocal hum)",
    "chords": [
     "Am",
     "Am/G",
     "D/F#",
     "F",
     "Am",
     "Am/G",
     "D/F#",
     "G",
     "G/F",
     "C/E",
     "D7",
     "G"
    ],
    "bars": 12
   },
   {
    "section": "Final chorus",
    "chords": [
     "C",
     "G/B",
     "F/A",
     "C/G",
     "F",
     "C/E",
     "D7",
     "G",
     "C",
     "G/B",
     "F/A",
     "C/G",
     "F",
     "G",
     "C",
     "C"
    ],
    "bars": 32
   },
   {
    "section": "Outro (harmonica)",
    "chords": [
     "C",
     "G/B",
     "F/A",
     "C/G",
     "F",
     "C/E",
     "D7",
     "G",
     "C",
     "G/B",
     "F/A",
     "C/G",
     "F",
     "G",
     "C",
     "C"
    ],
    "bars": 32
   }
  ],
  "pianoVideo": {
   "id": "gxEPV4kolz0",
   "title": "Billy Joel - Piano Man (Official HD Video)",
   "channel": "billyjoelVEVO"
  }
 },
 "Hello": {
  "status": "corrected",
  "key": "F minor",
  "capoNote": "Capo 1, Em-G-D-C shapes (sounds Fm-Ab-Eb-Db)",
  "bpm": 79,
  "beatsPerBar": 4,
  "durationSec": 295,
  "chords": [
   "Fm",
   "Ab",
   "Eb",
   "Db"
  ],
  "structure": [
   {
    "section": "Intro (piano)",
    "chords": [
     "Fm",
     "Ab",
     "Eb",
     "Db"
    ],
    "bars": 4
   },
   {
    "section": "Verse 1",
    "chords": [
     "Fm",
     "Ab",
     "Eb",
     "Db"
    ],
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Fm",
     "Eb",
     "Cm",
     "Db",
     "Fm7",
     "Eb",
     "Db",
     "Db"
    ],
    "bars": 8
   },
   {
    "section": "Chorus 1",
    "chords": [
     "Fm",
     "Db",
     "Ab",
     "Eb"
    ],
    "bars": 16
   },
   {
    "section": "Verse 2",
    "chords": [
     "Fm",
     "Ab",
     "Eb",
     "Db"
    ],
    "bars": 8
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Fm",
     "Eb",
     "Cm",
     "Db",
     "Fm7",
     "Eb",
     "Db",
     "Db"
    ],
    "bars": 8
   },
   {
    "section": "Chorus 2",
    "chords": [
     "Fm",
     "Db",
     "Ab",
     "Eb"
    ],
    "bars": 16
   },
   {
    "section": "Bridge",
    "chords": [
     "Ab",
     "Eb",
     "Fm",
     "Db"
    ],
    "bars": 8
   },
   {
    "section": "Final chorus",
    "chords": [
     "Fm",
     "Db",
     "Ab",
     "Eb"
    ],
    "bars": 16
   }
  ]
 },
 "Counting Stars": {
  "status": "corrected",
  "key": "C# minor",
  "capoNote": "Capo 4, Am-C-G-F shapes (sounds C#m-E-B-A)",
  "bpm": 122,
  "beatsPerBar": 4,
  "durationSec": 257,
  "chords": [
   "C#m",
   "E",
   "B",
   "A"
  ],
  "structure": [
   {
    "section": "Intro (acoustic guitar)",
    "chords": [
     "C#m",
     "E",
     "B",
     "A"
    ],
    "bars": 4
   },
   {
    "section": "Chorus hook (soft)",
    "chords": [
     "C#m",
     "E",
     "B",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "C#m",
     "E",
     "B",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "C#m",
     "E",
     "B",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "C#m",
     "E",
     "B",
     "A"
    ],
    "bars": 16
   },
   {
    "section": "Post-chorus (instrumental)",
    "chords": [
     "C#m",
     "E",
     "B",
     "A"
    ],
    "bars": 4
   },
   {
    "section": "Verse 2",
    "chords": [
     "C#m",
     "E",
     "B",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "C#m",
     "E",
     "B",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "C#m",
     "E",
     "B",
     "A"
    ],
    "bars": 16
   },
   {
    "section": "Post-chorus (instrumental)",
    "chords": [
     "C#m",
     "E",
     "B",
     "A"
    ],
    "bars": 4
   },
   {
    "section": "Bridge",
    "chords": [
     "C#m",
     "E",
     "B",
     "A"
    ],
    "bars": 16
   },
   {
    "section": "Breakdown / build",
    "chords": [
     "C#m",
     "E",
     "B",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Final chorus",
    "chords": [
     "C#m",
     "E",
     "B",
     "A"
    ],
    "bars": 16
   },
   {
    "section": "Outro",
    "chords": [
     "C#m",
     "E",
     "B",
     "A"
    ],
    "bars": 4
   }
  ]
 },
 "Comptine d'un autre été": {
  "status": "corrected",
  "key": "E minor",
  "bpm": 100,
  "beatsPerBar": 4,
  "durationSec": 140,
  "chords": [
   "Em",
   "G/D",
   "Bm/D",
   "D"
  ],
  "structure": [
   {
    "section": "Intro (left-hand pattern alone)",
    "chords": [
     "Em",
     "G/D",
     "Bm/D",
     "D"
    ],
    "bars": 4
   },
   {
    "section": "Theme A",
    "chords": [
     "Em",
     "G/D",
     "Bm/D",
     "D"
    ],
    "bars": 16
   },
   {
    "section": "Theme A variation (octave melody)",
    "chords": [
     "Em",
     "G/D",
     "Bm/D",
     "D"
    ],
    "bars": 16
   },
   {
    "section": "Theme B (running sixteenths, climax)",
    "chords": [
     "Em",
     "G/D",
     "Bm/D",
     "D"
    ],
    "bars": 16
   },
   {
    "section": "Outro (thins out)",
    "chords": [
     "Em",
     "G/D",
     "Bm/D",
     "D"
    ],
    "bars": 4
   }
  ]
 },
 "River Flows in You": {
  "status": "corrected",
  "key": "A major",
  "bpm": 68,
  "beatsPerBar": 4,
  "durationSec": 190,
  "chords": [
   "F#m",
   "Dsus2",
   "A",
   "E"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "F#m",
     "Dsus2"
    ],
    "bars": 4
   },
   {
    "section": "Theme A",
    "chords": [
     "F#m",
     "Dsus2",
     "A",
     "E"
    ],
    "bars": 8
   },
   {
    "section": "Theme A (repeat)",
    "chords": [
     "F#m",
     "Dsus2",
     "A",
     "E"
    ],
    "bars": 8
   },
   {
    "section": "Theme B",
    "chords": [
     "D",
     "E",
     "C#m",
     "F#m",
     "D",
     "E",
     "A",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Theme A (return)",
    "chords": [
     "F#m",
     "Dsus2",
     "A",
     "E"
    ],
    "bars": 8
   },
   {
    "section": "Theme A (fuller, octaves)",
    "chords": [
     "F#m",
     "Dsus2",
     "A",
     "E"
    ],
    "bars": 8
   },
   {
    "section": "Theme B",
    "chords": [
     "D",
     "E",
     "C#m",
     "F#m",
     "D",
     "E",
     "A",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Outro",
    "chords": [
     "F#m",
     "Dsus2",
     "A",
     "A"
    ],
    "bars": 4
   }
  ]
 },
 "Radioactive": {
  "status": "corrected",
  "key": "B minor (Dorian)",
  "bpm": 136,
  "beatsPerBar": 4,
  "durationSec": 187,
  "chords": [
   "Bm",
   "Dsus2",
   "A",
   "E"
  ],
  "structure": [
   {
    "section": "Intro (guitar + vocal hum)",
    "chords": [
     "Bm",
     "Dsus2",
     "A",
     "E"
    ],
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "B5",
     "D5",
     "A5",
     "E5"
    ],
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Bm",
     "Dsus2",
     "A",
     "E"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "Bm",
     "Dsus2",
     "A",
     "E"
    ],
    "bars": 16
   },
   {
    "section": "Verse 2",
    "chords": [
     "B5",
     "D5",
     "A5",
     "E5"
    ],
    "bars": 8
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Bm",
     "Dsus2",
     "A",
     "E"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "Bm",
     "Dsus2",
     "A",
     "E"
    ],
    "bars": 16
   },
   {
    "section": "Bridge (breakdown on Bm)",
    "chords": [
     "Bm"
    ],
    "per": 4,
    "bars": 8
   },
   {
    "section": "Final chorus",
    "chords": [
     "Bm",
     "Dsus2",
     "A",
     "E"
    ],
    "bars": 16
   }
  ]
 },
 "Billie Jean": {
  "status": "uncertain",
  "key": "F# minor",
  "bpm": 117,
  "beatsPerBar": 4,
  "durationSec": 294,
  "chords": [
   "F#m",
   "G#m/F#",
   "A/F#",
   "G#m/F#"
  ],
  "structure": [
   {
    "section": "Intro (drums, then bass riff and synth)",
    "chords": [
     "F#m"
    ],
    "bars": 14
   },
   {
    "section": "Verse 1",
    "chords": [
     "F#m",
     "G#m/F#",
     "A/F#",
     "G#m/F#"
    ],
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "D",
     "F#m",
     "D",
     "F#m",
     "D",
     "F#m",
     "Bm",
     "C#7"
    ],
    "bars": 8
   },
   {
    "section": "Chorus 1",
    "chords": [
     "F#m",
     "G#m/F#",
     "A/F#",
     "G#m/F#"
    ],
    "bars": 16
   },
   {
    "section": "Verse 2",
    "chords": [
     "F#m",
     "G#m/F#",
     "A/F#",
     "G#m/F#"
    ],
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "D",
     "F#m",
     "D",
     "F#m",
     "D",
     "F#m",
     "Bm",
     "C#7"
    ],
    "bars": 8
   },
   {
    "section": "Chorus 2",
    "chords": [
     "F#m",
     "G#m/F#",
     "A/F#",
     "G#m/F#"
    ],
    "bars": 16
   },
   {
    "section": "Instrumental break (strings, guitar)",
    "chords": [
     "F#m",
     "G#m/F#",
     "A/F#",
     "G#m/F#"
    ],
    "bars": 8
   },
   {
    "section": "Final chorus + outro vamp (fade)",
    "chords": [
     "F#m",
     "G#m/F#",
     "A/F#",
     "G#m/F#"
    ],
    "bars": 40
   }
  ]
 },
 "Sweet Dreams (Are Made of This)": {
  "status": "corrected",
  "key": "C minor",
  "bpm": 126,
  "beatsPerBar": 4,
  "durationSec": 216,
  "chords": [
   "Cm",
   "Cm",
   "Ab",
   "G"
  ],
  "structure": [
   {
    "section": "Intro (synth riff)",
    "chords": [
     "Cm",
     "Cm",
     "Ab",
     "G"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "Cm",
     "Cm",
     "Ab",
     "G"
    ],
    "per": 0.5,
    "bars": 16
   },
   {
    "section": "Verse 2",
    "chords": [
     "Cm",
     "Cm",
     "Ab",
     "G"
    ],
    "per": 0.5,
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Ab",
     "G",
     "Cm",
     "Fm"
    ],
    "bars": 8
   },
   {
    "section": "Bridge (Dorian vamp)",
    "chords": [
     "C7",
     "F7"
    ],
    "bars": 8
   },
   {
    "section": "Verse 3",
    "chords": [
     "Cm",
     "Cm",
     "Ab",
     "G"
    ],
    "per": 0.5,
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Ab",
     "G",
     "Cm",
     "Fm"
    ],
    "bars": 8
   },
   {
    "section": "Instrumental (synth riff)",
    "chords": [
     "Cm",
     "Cm",
     "Ab",
     "G"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Outro verses (repeat to fade)",
    "chords": [
     "Cm",
     "Cm",
     "Ab",
     "G"
    ],
    "per": 0.5,
    "bars": 24
   }
  ]
 },
 "Fly Me to the Moon": {
  "status": "uncertain",
  "key": "C major (A sections start on A minor)",
  "bpm": 119,
  "beatsPerBar": 4,
  "durationSec": 147,
  "chords": [
   "Am7",
   "Dm7",
   "G7",
   "Cmaj7",
   "Fmaj7",
   "Bm7b5",
   "E7",
   "Am7"
  ],
  "structure": [
   {
    "section": "Intro (band)",
    "chords": [
     "Dm7",
     "G7",
     "Cmaj7",
     "E7"
    ],
    "bars": 4
   },
   {
    "section": "Chorus 1 - A1",
    "chords": [
     "Am7",
     "Am7",
     "Dm7",
     "Dm7",
     "G7",
     "G7",
     "Cmaj7",
     "C7",
     "Fmaj7",
     "Fmaj7",
     "Bm7b5",
     "Bm7b5",
     "E7",
     "E7",
     "Am7",
     "A7"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Chorus 1 - B1",
    "chords": [
     "Dm7",
     "Dm7",
     "G7",
     "G7",
     "Cmaj7",
     "Am7",
     "Dm7",
     "Dm7",
     "G7",
     "G7",
     "Cmaj7",
     "Cmaj7",
     "Bm7b5",
     "Bm7b5",
     "E7",
     "E7"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Chorus 1 - A2",
    "chords": [
     "Am7",
     "Am7",
     "Dm7",
     "Dm7",
     "G7",
     "G7",
     "Cmaj7",
     "C7",
     "Fmaj7",
     "Fmaj7",
     "Bm7b5",
     "Bm7b5",
     "E7",
     "E7",
     "Am7",
     "A7"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Chorus 1 - C",
    "chords": [
     "Dm7",
     "Dm7",
     "G7",
     "G7",
     "Em7",
     "A7",
     "Dm7",
     "Dm7",
     "G7",
     "G7",
     "C6",
     "C6",
     "Bm7b5",
     "Bm7b5",
     "E7",
     "E7"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Band interlude - A1",
    "chords": [
     "Am7",
     "Am7",
     "Dm7",
     "Dm7",
     "G7",
     "G7",
     "Cmaj7",
     "C7",
     "Fmaj7",
     "Fmaj7",
     "Bm7b5",
     "Bm7b5",
     "E7",
     "E7",
     "Am7",
     "A7"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Band interlude - B1",
    "chords": [
     "Dm7",
     "Dm7",
     "G7",
     "G7",
     "Cmaj7",
     "Am7",
     "Dm7",
     "Dm7",
     "G7",
     "G7",
     "Cmaj7",
     "Cmaj7",
     "Bm7b5",
     "Bm7b5",
     "E7",
     "E7"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Chorus 2 - A2",
    "chords": [
     "Am7",
     "Am7",
     "Dm7",
     "Dm7",
     "G7",
     "G7",
     "Cmaj7",
     "C7",
     "Fmaj7",
     "Fmaj7",
     "Bm7b5",
     "Bm7b5",
     "E7",
     "E7",
     "Am7",
     "A7"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Chorus 2 - C",
    "chords": [
     "Dm7",
     "Dm7",
     "G7",
     "G7",
     "Em7",
     "A7",
     "Dm7",
     "Dm7",
     "G7",
     "G7",
     "C6",
     "C6",
     "Bm7b5",
     "Bm7b5",
     "E7",
     "E7"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Tag ending",
    "chords": [
     "Dm7",
     "G7",
     "Dm7",
     "G7",
     "C6"
    ],
    "bars": 5
   }
  ],
  "solos": [
   {
    "section": "Band interlude",
    "scale": "C major scale (same notes as A natural minor), around the 5th-8th fret on guitar or middle C position on piano; add G# over the E7 bars (A harmonic minor)",
    "tips": "Target the 3rd of each chord as it changes (C over Am7, F over Dm7, B over G7). Keep phrases short and swing the eighth notes."
   }
  ]
 },
 "Take Five": {
  "status": "corrected",
  "key": "Eb minor",
  "bpm": 174,
  "beatsPerBar": 5,
  "durationSec": 324,
  "chords": [
   "Ebm",
   "Bbm7"
  ],
  "structure": [
   {
    "section": "Intro (drums, then piano vamp)",
    "chords": [
     "Ebm",
     "Bbm7"
    ],
    "bars": 8
   },
   {
    "section": "Head - A1",
    "chords": [
     "Ebm",
     "Bbm7"
    ],
    "bars": 8
   },
   {
    "section": "Head - A2",
    "chords": [
     "Ebm",
     "Bbm7"
    ],
    "bars": 8
   },
   {
    "section": "Head - B (bridge, played twice)",
    "chords": [
     "Bmaj7",
     "Abm7",
     "Bbm7",
     "Ebm7",
     "Abm7",
     "Db7",
     "Gbmaj7",
     "Gbmaj7"
    ],
    "bars": 16
   },
   {
    "section": "Head - A3",
    "chords": [
     "Ebm",
     "Bbm7"
    ],
    "bars": 8
   },
   {
    "section": "Alto sax solo (over vamp)",
    "chords": [
     "Ebm",
     "Bbm7"
    ],
    "bars": 40
   },
   {
    "section": "Drum solo (piano keeps vamp)",
    "chords": [
     "Ebm",
     "Bbm7"
    ],
    "bars": 72
   },
   {
    "section": "Head out - A",
    "chords": [
     "Ebm",
     "Bbm7"
    ],
    "bars": 8
   },
   {
    "section": "Head out - A",
    "chords": [
     "Ebm",
     "Bbm7"
    ],
    "bars": 8
   },
   {
    "section": "Tag ending (fade on vamp)",
    "chords": [
     "Ebm",
     "Bbm7"
    ],
    "bars": 12
   }
  ],
  "solos": [
   {
    "section": "Alto sax solo (over vamp)",
    "scale": "Eb minor pentatonic or Eb Dorian (Eb F Gb Ab Bb C Db); on guitar box 1 at the 11th fret, on piano mostly black keys",
    "tips": "Count 3+2 in every bar and start phrases on beat 1 of the Ebm bar. Play the black-key Eb minor pentatonic first, then add the C for Dorian colour.",
    "chords": [
     "Ebm",
     "Bbm7"
    ]
   }
  ]
 },
 "All of Me (jazz standard)": {
  "status": "uncertain",
  "key": "C major",
  "bpm": 130,
  "beatsPerBar": 4,
  "durationSec": 192,
  "chords": [
   "C6",
   "E7",
   "A7",
   "Dm7",
   "E7",
   "Am7",
   "D7",
   "G7"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "Dm7",
     "G7"
    ],
    "bars": 4
   },
   {
    "section": "Head - A1",
    "chords": [
     "C6",
     "C6",
     "E7",
     "E7",
     "A7",
     "A7",
     "Dm7",
     "Dm7"
    ],
    "bars": 8
   },
   {
    "section": "Head - B",
    "chords": [
     "E7",
     "E7",
     "Am7",
     "Am7",
     "D7",
     "D7",
     "Dm7",
     "G7"
    ],
    "bars": 8
   },
   {
    "section": "Head - A2",
    "chords": [
     "C6",
     "C6",
     "E7",
     "E7",
     "A7",
     "A7",
     "Dm7",
     "Dm7"
    ],
    "bars": 8
   },
   {
    "section": "Head - C",
    "chords": [
     "F6",
     "Fm6",
     "C6",
     "A7",
     "Dm7",
     "G7",
     "C6",
     "G7"
    ],
    "bars": 8
   },
   {
    "section": "Solo chorus (full 32-bar form)",
    "chords": [
     "C6",
     "C6",
     "E7",
     "E7",
     "A7",
     "A7",
     "Dm7",
     "Dm7",
     "E7",
     "E7",
     "Am7",
     "Am7",
     "D7",
     "D7",
     "Dm7",
     "G7",
     "C6",
     "C6",
     "E7",
     "E7",
     "A7",
     "A7",
     "Dm7",
     "Dm7",
     "F6",
     "Fm6",
     "C6",
     "A7",
     "Dm7",
     "G7",
     "C6",
     "G7"
    ],
    "bars": 32
   },
   {
    "section": "Head out - A1",
    "chords": [
     "C6",
     "C6",
     "E7",
     "E7",
     "A7",
     "A7",
     "Dm7",
     "Dm7"
    ],
    "bars": 8
   },
   {
    "section": "Head out - B",
    "chords": [
     "E7",
     "E7",
     "Am7",
     "Am7",
     "D7",
     "D7",
     "Dm7",
     "G7"
    ],
    "bars": 8
   },
   {
    "section": "Head out - A2",
    "chords": [
     "C6",
     "C6",
     "E7",
     "E7",
     "A7",
     "A7",
     "Dm7",
     "Dm7"
    ],
    "bars": 8
   },
   {
    "section": "Head out - C (ending)",
    "chords": [
     "F6",
     "Fm6",
     "C6",
     "A7",
     "Dm7",
     "G7",
     "C6",
     "C6"
    ],
    "bars": 8
   },
   {
    "section": "Tag",
    "chords": [
     "Dm7",
     "G7",
     "C6",
     "C6"
    ],
    "bars": 4
   }
  ],
  "solos": [
   {
    "section": "Solo chorus (full 32-bar form)",
    "scale": "C major pentatonic as home base; switch to the arpeggio of each dominant chord (E7, A7, D7) when it arrives - on guitar around the 8th fret, on piano around middle C",
    "tips": "Land on the 3rd of each new chord (G# on E7, C# on A7, F# on D7) - those notes make the changes audible. Keep a light swing feel.",
    "chords": [
     "C6",
     "C6",
     "E7",
     "E7",
     "A7",
     "A7",
     "Dm7",
     "Dm7",
     "E7",
     "E7",
     "Am7",
     "Am7",
     "D7",
     "D7",
     "Dm7",
     "G7",
     "C6",
     "C6",
     "E7",
     "E7",
     "A7",
     "A7",
     "Dm7",
     "Dm7",
     "F6",
     "Fm6",
     "C6",
     "A7",
     "Dm7",
     "G7",
     "C6",
     "G7"
    ]
   }
  ]
 },
 "Summertime": {
  "status": "corrected",
  "key": "A minor",
  "bpm": 90,
  "beatsPerBar": 4,
  "durationSec": 192,
  "chords": [
   "Am6",
   "E7",
   "Dm6",
   "Bm7b5",
   "E7",
   "Am6"
  ],
  "structure": [
   {
    "section": "Intro (vamp)",
    "chords": [
     "Am6",
     "E7"
    ],
    "bars": 4
   },
   {
    "section": "Head - verse 1 (16 bars)",
    "chords": [
     "Am6",
     "Am6",
     "Bm7b5",
     "E7",
     "Am6",
     "Am6",
     "Am6",
     "Am6",
     "Dm6",
     "Dm6",
     "Dm6",
     "Dm6",
     "Bm7b5",
     "Bm7b5",
     "E7",
     "E7",
     "Am6",
     "Am6",
     "Bm7b5",
     "E7",
     "Am6",
     "Am6",
     "Am6",
     "Am6",
     "C",
     "C",
     "A7",
     "A7",
     "Dm7",
     "E7",
     "Am6",
     "E7"
    ],
    "per": 0.5,
    "bars": 16
   },
   {
    "section": "Verse 2 (16 bars)",
    "chords": [
     "Am6",
     "Am6",
     "Bm7b5",
     "E7",
     "Am6",
     "Am6",
     "Am6",
     "Am6",
     "Dm6",
     "Dm6",
     "Dm6",
     "Dm6",
     "Bm7b5",
     "Bm7b5",
     "E7",
     "E7",
     "Am6",
     "Am6",
     "Bm7b5",
     "E7",
     "Am6",
     "Am6",
     "Am6",
     "Am6",
     "C",
     "C",
     "A7",
     "A7",
     "Dm7",
     "E7",
     "Am6",
     "E7"
    ],
    "per": 0.5,
    "bars": 16
   },
   {
    "section": "Solo (16-bar form)",
    "chords": [
     "Am6",
     "Am6",
     "Bm7b5",
     "E7",
     "Am6",
     "Am6",
     "Am6",
     "Am6",
     "Dm6",
     "Dm6",
     "Dm6",
     "Dm6",
     "Bm7b5",
     "Bm7b5",
     "E7",
     "E7",
     "Am6",
     "Am6",
     "Bm7b5",
     "E7",
     "Am6",
     "Am6",
     "Am6",
     "Am6",
     "C",
     "C",
     "A7",
     "A7",
     "Dm7",
     "E7",
     "Am6",
     "E7"
    ],
    "per": 0.5,
    "bars": 16
   },
   {
    "section": "Head out (16 bars)",
    "chords": [
     "Am6",
     "Am6",
     "Bm7b5",
     "E7",
     "Am6",
     "Am6",
     "Am6",
     "Am6",
     "Dm6",
     "Dm6",
     "Dm6",
     "Dm6",
     "Bm7b5",
     "Bm7b5",
     "E7",
     "E7",
     "Am6",
     "Am6",
     "Bm7b5",
     "E7",
     "Am6",
     "Am6",
     "Am6",
     "Am6",
     "C",
     "C",
     "A7",
     "A7",
     "Dm7",
     "E7",
     "Am6",
     "E7"
    ],
    "per": 0.5,
    "bars": 16
   },
   {
    "section": "Ending vamp",
    "chords": [
     "Am6",
     "E7",
     "Am6",
     "Am6"
    ],
    "bars": 4
   }
  ],
  "solos": [
   {
    "section": "Solo (16-bar form)",
    "scale": "A minor pentatonic (box 1 at the 5th fret on guitar; white keys A C D E G on piano), adding F# from A Dorian over the Am6 bars and G# over E7",
    "tips": "The melody itself is pentatonic, so start by decorating it before improvising freely. Leave space - it is a slow lullaby, so hold notes longer than you think.",
    "chords": [
     "Am6",
     "Am6",
     "Bm7b5",
     "E7",
     "Am6",
     "Am6",
     "Am6",
     "Am6",
     "Dm6",
     "Dm6",
     "Dm6",
     "Dm6",
     "Bm7b5",
     "Bm7b5",
     "E7",
     "E7",
     "Am6",
     "Am6",
     "Bm7b5",
     "E7",
     "Am6",
     "Am6",
     "Am6",
     "Am6",
     "C",
     "C",
     "A7",
     "A7",
     "Dm7",
     "E7",
     "Am6",
     "E7"
    ]
   }
  ]
 },
 "Satin Doll": {
  "status": "corrected",
  "key": "C major",
  "bpm": 120,
  "beatsPerBar": 4,
  "durationSec": 184,
  "chords": [
   "Dm7",
   "G7",
   "Em7",
   "A7",
   "Am7",
   "D7",
   "Abm7",
   "Db7",
   "Cmaj7"
  ],
  "structure": [
   {
    "section": "Intro (piano)",
    "chords": [
     "Dm7",
     "G7"
    ],
    "bars": 8
   },
   {
    "section": "Head - A1",
    "chords": [
     "Dm7",
     "G7",
     "Dm7",
     "G7",
     "Em7",
     "A7",
     "Em7",
     "A7",
     "Am7",
     "D7",
     "Abm7",
     "Db7",
     "Cmaj7",
     "Cmaj7",
     "Dm7",
     "G7"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Head - A2",
    "chords": [
     "Dm7",
     "G7",
     "Dm7",
     "G7",
     "Em7",
     "A7",
     "Em7",
     "A7",
     "Am7",
     "D7",
     "Abm7",
     "Db7",
     "Cmaj7",
     "Cmaj7",
     "Dm7",
     "G7"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Head - B (bridge, up to F)",
    "chords": [
     "Gm7",
     "C7",
     "Gm7",
     "C7",
     "Fmaj7",
     "Fmaj7",
     "Fmaj7",
     "Fmaj7",
     "Am7",
     "D7",
     "Am7",
     "D7",
     "Dm7",
     "Dm7",
     "G7",
     "G7"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Head - A3",
    "chords": [
     "Dm7",
     "G7",
     "Dm7",
     "G7",
     "Em7",
     "A7",
     "Em7",
     "A7",
     "Am7",
     "D7",
     "Abm7",
     "Db7",
     "Cmaj7",
     "Cmaj7",
     "Dm7",
     "G7"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Solo chorus (AABA)",
    "chords": [
     "Dm7",
     "G7",
     "Dm7",
     "G7",
     "Em7",
     "A7",
     "Em7",
     "A7",
     "Am7",
     "D7",
     "Abm7",
     "Db7",
     "Cmaj7",
     "Cmaj7",
     "Dm7",
     "G7",
     "Dm7",
     "G7",
     "Dm7",
     "G7",
     "Em7",
     "A7",
     "Em7",
     "A7",
     "Am7",
     "D7",
     "Abm7",
     "Db7",
     "Cmaj7",
     "Cmaj7",
     "Dm7",
     "G7",
     "Gm7",
     "C7",
     "Gm7",
     "C7",
     "Fmaj7",
     "Fmaj7",
     "Fmaj7",
     "Fmaj7",
     "Am7",
     "D7",
     "Am7",
     "D7",
     "Dm7",
     "Dm7",
     "G7",
     "G7",
     "Dm7",
     "G7",
     "Dm7",
     "G7",
     "Em7",
     "A7",
     "Em7",
     "A7",
     "Am7",
     "D7",
     "Abm7",
     "Db7",
     "Cmaj7",
     "Cmaj7",
     "Dm7",
     "G7"
    ],
    "per": 0.5,
    "bars": 32
   },
   {
    "section": "Head out - B (bridge)",
    "chords": [
     "Gm7",
     "C7",
     "Gm7",
     "C7",
     "Fmaj7",
     "Fmaj7",
     "Fmaj7",
     "Fmaj7",
     "Am7",
     "D7",
     "Am7",
     "D7",
     "Dm7",
     "Dm7",
     "G7",
     "G7"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Head out - A (ending)",
    "chords": [
     "Dm7",
     "G7",
     "Dm7",
     "G7",
     "Em7",
     "A7",
     "Em7",
     "A7",
     "Am7",
     "D7",
     "Abm7",
     "Db7",
     "Cmaj7",
     "Cmaj7",
     "Cmaj7",
     "Cmaj7"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Tag",
    "chords": [
     "Am7",
     "D7",
     "Abm7",
     "Db7",
     "Cmaj7",
     "Cmaj7",
     "Cmaj7",
     "Cmaj7"
    ],
    "per": 0.5,
    "bars": 4
   }
  ],
  "solos": [
   {
    "section": "Solo chorus (AABA)",
    "scale": "C major scale over the A sections, but follow each ii-V pair (Dm7-G7, Em7-A7, Am7-D7, Abm7-Db7) as a short trip into a new key; F major over the bridge",
    "tips": "Practise one chord-tone arpeggio per half bar so you hear each ii-V move. Over Abm7-Db7 just slide your Am7-D7 idea down a half step.",
    "chords": [
     "Dm7",
     "G7",
     "Dm7",
     "G7",
     "Em7",
     "A7",
     "Em7",
     "A7",
     "Am7",
     "D7",
     "Abm7",
     "Db7",
     "Cmaj7",
     "Cmaj7",
     "Dm7",
     "G7",
     "Dm7",
     "G7",
     "Dm7",
     "G7",
     "Em7",
     "A7",
     "Em7",
     "A7",
     "Am7",
     "D7",
     "Abm7",
     "Db7",
     "Cmaj7",
     "Cmaj7",
     "Dm7",
     "G7",
     "Gm7",
     "C7",
     "Gm7",
     "C7",
     "Fmaj7",
     "Fmaj7",
     "Fmaj7",
     "Fmaj7",
     "Am7",
     "D7",
     "Am7",
     "D7",
     "Dm7",
     "Dm7",
     "G7",
     "G7",
     "Dm7",
     "G7",
     "Dm7",
     "G7",
     "Em7",
     "A7",
     "Em7",
     "A7",
     "Am7",
     "D7",
     "Abm7",
     "Db7",
     "Cmaj7",
     "Cmaj7",
     "Dm7",
     "G7"
    ]
   }
  ]
 },
 "Cantaloupe Island": {
  "status": "corrected",
  "key": "F minor",
  "bpm": 116,
  "beatsPerBar": 4,
  "durationSec": 333,
  "chords": [
   "Fm7",
   "Db7",
   "Dm7",
   "Fm7"
  ],
  "structure": [
   {
    "section": "Intro (piano vamp)",
    "chords": [
     "Fm7"
    ],
    "bars": 4
   },
   {
    "section": "Head (x2)",
    "chords": [
     "Fm7",
     "Fm7",
     "Fm7",
     "Fm7",
     "Db7",
     "Db7",
     "Db7",
     "Db7",
     "Dm7",
     "Dm7",
     "Dm7",
     "Dm7",
     "Fm7",
     "Fm7",
     "Fm7",
     "Fm7"
    ],
    "bars": 32
   },
   {
    "section": "Cornet solo (Freddie Hubbard, 3 choruses)",
    "chords": [
     "Fm7",
     "Fm7",
     "Fm7",
     "Fm7",
     "Db7",
     "Db7",
     "Db7",
     "Db7",
     "Dm7",
     "Dm7",
     "Dm7",
     "Dm7",
     "Fm7",
     "Fm7",
     "Fm7",
     "Fm7"
    ],
    "bars": 48
   },
   {
    "section": "Piano solo (3 choruses)",
    "chords": [
     "Fm7",
     "Fm7",
     "Fm7",
     "Fm7",
     "Db7",
     "Db7",
     "Db7",
     "Db7",
     "Dm7",
     "Dm7",
     "Dm7",
     "Dm7",
     "Fm7",
     "Fm7",
     "Fm7",
     "Fm7"
    ],
    "bars": 48
   },
   {
    "section": "Head out (x2)",
    "chords": [
     "Fm7",
     "Fm7",
     "Fm7",
     "Fm7",
     "Db7",
     "Db7",
     "Db7",
     "Db7",
     "Dm7",
     "Dm7",
     "Dm7",
     "Dm7",
     "Fm7",
     "Fm7",
     "Fm7",
     "Fm7"
    ],
    "bars": 32
   }
  ],
  "solos": [
   {
    "section": "Cornet solo",
    "scale": "F minor pentatonic / F Dorian over Fm7 (box 1 at the 1st or 13th fret on guitar); Db Lydian (Db mixolydian #4 colour) over Db7; D Dorian over Dm7",
    "tips": "Hold a long note through each 4-bar chord change and notice how it changes colour. Try the same short riff on Fm7 and move it up a half step to D Dorian for the Dm7 bars.",
    "chords": [
     "Fm7",
     "Fm7",
     "Fm7",
     "Fm7",
     "Db7",
     "Db7",
     "Db7",
     "Db7",
     "Dm7",
     "Dm7",
     "Dm7",
     "Dm7",
     "Fm7",
     "Fm7",
     "Fm7",
     "Fm7"
    ]
   },
   {
    "section": "Piano solo",
    "scale": "Same as cornet: F Dorian, Db7 (Db mixolydian), D Dorian",
    "tips": "Keep the left-hand comping riff going while the right hand plays short pentatonic phrases.",
    "chords": [
     "Fm7",
     "Fm7",
     "Fm7",
     "Fm7",
     "Db7",
     "Db7",
     "Db7",
     "Db7",
     "Dm7",
     "Dm7",
     "Dm7",
     "Dm7",
     "Fm7",
     "Fm7",
     "Fm7",
     "Fm7"
    ]
   }
  ]
 },
 "Gymnopédie No. 1": {
  "status": "uncertain",
  "key": "D major (second half turns to D minor / Dorian)",
  "bpm": 77,
  "beatsPerBar": 3,
  "durationSec": 182,
  "chords": [
   "Gmaj7",
   "Dmaj7"
  ],
  "structure": [
   {
    "section": "Intro (left-hand sway)",
    "chords": [
     "Gmaj7",
     "Dmaj7"
    ],
    "bars": 4
   },
   {
    "section": "Theme A (first half)",
    "chords": [
     "Gmaj7",
     "Dmaj7"
    ],
    "bars": 8
   },
   {
    "section": "Middle phrase (first half)",
    "chords": [
     "Em7",
     "A",
     "Bm",
     "F#m7"
    ],
    "bars": 9
   },
   {
    "section": "Closing phrase (first half)",
    "chords": [
     "Bm",
     "Bm",
     "Em7",
     "Em7"
    ],
    "bars": 18
   },
   {
    "section": "Interlude (sway returns)",
    "chords": [
     "Gmaj7",
     "Dmaj7"
    ],
    "bars": 4
   },
   {
    "section": "Theme A (second half)",
    "chords": [
     "Gmaj7",
     "Dmaj7"
    ],
    "bars": 8
   },
   {
    "section": "Middle phrase (second half)",
    "chords": [
     "Em7",
     "A",
     "Bm",
     "F#m7"
    ],
    "bars": 9
   },
   {
    "section": "Closing phrase in D minor (Dorian) to final cadence",
    "chords": [
     "Dm",
     "Am",
     "Em7/D",
     "Dm"
    ],
    "bars": 18
   }
  ]
 },
 "Prelude in C major, BWV 846": {
  "status": "corrected",
  "key": "C major",
  "bpm": 66,
  "beatsPerBar": 4,
  "durationSec": 135,
  "chords": [
   "C",
   "Dm7/C",
   "G7/B",
   "C"
  ],
  "structure": [
   {
    "section": "Opening on tonic (bars 1-4)",
    "chords": [
     "C",
     "Dm7/C",
     "G7/B",
     "C"
    ],
    "bars": 4
   },
   {
    "section": "Move to G major (bars 5-11)",
    "chords": [
     "Am/C",
     "D7/C",
     "G/B",
     "Cmaj7/B",
     "Am7",
     "D7",
     "G"
    ],
    "bars": 7
   },
   {
    "section": "Chromatic return to C (bars 12-19)",
    "chords": [
     "C#dim7/G",
     "Dm/F",
     "Fdim7",
     "C/E",
     "Fmaj7/E",
     "Dm7",
     "G7",
     "C"
    ],
    "bars": 8
   },
   {
    "section": "Tension build (bars 20-23)",
    "chords": [
     "C7",
     "Fmaj7",
     "F#dim7",
     "Abdim7"
    ],
    "bars": 4
   },
   {
    "section": "Dominant pedal on G (bars 24-31)",
    "chords": [
     "G7",
     "C/G",
     "G7",
     "G7",
     "F#dim7/G",
     "C/G",
     "G7",
     "G7"
    ],
    "bars": 8
   },
   {
    "section": "Coda over C pedal (bars 32-35)",
    "chords": [
     "C7",
     "F/C",
     "G7/C",
     "C"
    ],
    "bars": 4
   }
  ]
 },
 "The Blue Danube (waltz)": {
  "status": "uncertain",
  "key": "D major",
  "bpm": 150,
  "beatsPerBar": 3,
  "durationSec": 600,
  "chords": [
   "D",
   "A7"
  ],
  "structure": [
   {
    "section": "Introduction (A major, tremolo strings and horn call)",
    "chords": [
     "A",
     "A",
     "E7",
     "A"
    ],
    "per": 4,
    "bars": 48
   },
   {
    "section": "Introduction (lead-in on the dominant of D)",
    "chords": [
     "A7"
    ],
    "bars": 16
   },
   {
    "section": "Waltz 1A (D major, main theme, with repeat)",
    "chords": [
     "D",
     "A7",
     "A7",
     "D",
     "D",
     "G",
     "A7",
     "D"
    ],
    "per": 4,
    "bars": 64
   },
   {
    "section": "Waltz 1B (D major)",
    "chords": [
     "D",
     "A7",
     "A7",
     "D"
    ],
    "per": 4,
    "bars": 32
   },
   {
    "section": "Waltz 2A (D major)",
    "chords": [
     "D",
     "D",
     "A7",
     "A7",
     "A7",
     "A7",
     "D",
     "D"
    ],
    "per": 2,
    "bars": 32
   },
   {
    "section": "Waltz 2B (B-flat major)",
    "chords": [
     "Bb",
     "F7",
     "F7",
     "Bb"
    ],
    "per": 4,
    "bars": 32
   },
   {
    "section": "Waltz 3A (G major)",
    "chords": [
     "G",
     "D7",
     "D7",
     "G"
    ],
    "per": 4,
    "bars": 32
   },
   {
    "section": "Waltz 3B (G major)",
    "chords": [
     "G",
     "D7",
     "D7",
     "G"
    ],
    "per": 4,
    "bars": 16
   },
   {
    "section": "Waltz 4A (F major)",
    "chords": [
     "F",
     "C7",
     "C7",
     "F"
    ],
    "per": 4,
    "bars": 32
   },
   {
    "section": "Waltz 4B (F major)",
    "chords": [
     "F",
     "C7",
     "C7",
     "F"
    ],
    "per": 4,
    "bars": 16
   },
   {
    "section": "Waltz 5A (A major, climax)",
    "chords": [
     "A",
     "E7",
     "E7",
     "A"
    ],
    "per": 4,
    "bars": 32
   },
   {
    "section": "Waltz 5B (A major)",
    "chords": [
     "A",
     "E7",
     "E7",
     "A"
    ],
    "per": 4,
    "bars": 16
   },
   {
    "section": "Coda: recall of Waltz 3A (G major)",
    "chords": [
     "G",
     "D7",
     "D7",
     "G"
    ],
    "per": 4,
    "bars": 32
   },
   {
    "section": "Coda: recall of Waltz 2A (D major)",
    "chords": [
     "D",
     "A7",
     "A7",
     "D"
    ],
    "per": 4,
    "bars": 32
   },
   {
    "section": "Coda: quiet return of main theme (D major)",
    "chords": [
     "D",
     "A7",
     "A7",
     "D"
    ],
    "per": 4,
    "bars": 32
   },
   {
    "section": "Coda: fast closing (D major)",
    "chords": [
     "D",
     "A7"
    ],
    "per": 2,
    "bars": 40
   }
  ]
 },
 "Hungarian Rhapsody No. 2": {
  "status": "uncertain",
  "key": "C# minor (Lassan) / F# major (Friska)",
  "bpm": 120,
  "beatsPerBar": 2,
  "durationSec": 600,
  "chords": [
   "C#m",
   "G#7",
   "F#",
   "C#7"
  ],
  "structure": [
   {
    "section": "Lassan: introduction (Lento a capriccio, opens on C# major)",
    "chords": [
     "C#",
     "C#",
     "G#7",
     "C#m"
    ],
    "per": 2,
    "bars": 30
   },
   {
    "section": "Lassan: main theme (Andante mesto, C# minor)",
    "chords": [
     "C#m",
     "C#m",
     "G#7",
     "C#m"
    ],
    "per": 2,
    "bars": 90
   },
   {
    "section": "Lassan: playful middle episode",
    "chords": [
     "C#m",
     "F#m",
     "G#7",
     "C#m"
    ],
    "per": 2,
    "bars": 60
   },
   {
    "section": "Lassan: return of theme and cadenza",
    "chords": [
     "C#m",
     "G#7",
     "C#m",
     "G#7"
    ],
    "per": 2,
    "bars": 60
   },
   {
    "section": "Friska: opening (F# minor)",
    "chords": [
     "C#7",
     "F#m/C#"
    ],
    "per": 2,
    "bars": 40
   },
   {
    "section": "Friska: main theme (F# major)",
    "chords": [
     "C#7",
     "F#"
    ],
    "per": 2,
    "bars": 96
   },
   {
    "section": "Friska: episode on the dominant (C# major)",
    "chords": [
     "C#",
     "D7",
     "C",
     "C#",
     "B"
    ],
    "per": 2,
    "bars": 40
   },
   {
    "section": "Friska: episode in A major",
    "chords": [
     "A",
     "E7",
     "E7",
     "A"
    ],
    "per": 2,
    "bars": 40
   },
   {
    "section": "Friska: return and build (F# major)",
    "chords": [
     "F#",
     "C#7"
    ],
    "per": 2,
    "bars": 64
   },
   {
    "section": "Cadenza (optional, on the dominant)",
    "chords": [
     "C#7"
    ],
    "bars": 16
   },
   {
    "section": "Prestissimo finale (F# major)",
    "chords": [
     "F#",
     "F#m",
     "C#7",
     "F#"
    ],
    "per": 2,
    "bars": 64
   }
  ]
 },
 "Les Champs-Elysées": {
  "status": "corrected",
  "key": "E major",
  "capoNote": "Capo 4 with C shapes (C, G/B, Am, C7/G, F, C/E, D7, G7) sounds in the original key",
  "bpm": 112,
  "beatsPerBar": 4,
  "durationSec": 159,
  "chords": [
   "E",
   "B/D#",
   "C#m",
   "E7/B",
   "A",
   "E/G#",
   "F#7",
   "B7"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "E",
     "B7"
    ],
    "bars": 2
   },
   {
    "section": "Verse 1",
    "chords": [
     "E",
     "B/D#",
     "C#m",
     "E7/B",
     "A",
     "E/G#",
     "F#7",
     "B7",
     "E",
     "B/D#",
     "C#m",
     "E7/B",
     "A",
     "E/G#",
     "B7",
     "E"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "E",
     "G#7/D#",
     "C#m7",
     "E7/B",
     "A",
     "E",
     "B7",
     "E"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "E",
     "B/D#",
     "C#m",
     "E7/B",
     "A",
     "E/G#",
     "F#7",
     "B7",
     "E",
     "B/D#",
     "C#m",
     "E7/B",
     "A",
     "E/G#",
     "B7",
     "E"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "E",
     "G#7/D#",
     "C#m7",
     "E7/B",
     "A",
     "E",
     "B7",
     "E"
    ],
    "bars": 8
   },
   {
    "section": "Verse 3",
    "chords": [
     "E",
     "B/D#",
     "C#m",
     "E7/B",
     "A",
     "E/G#",
     "F#7",
     "B7",
     "E",
     "B/D#",
     "C#m",
     "E7/B",
     "A",
     "E/G#",
     "B7",
     "E"
    ],
    "bars": 16
   },
   {
    "section": "Chorus (to end)",
    "chords": [
     "E",
     "G#7/D#",
     "C#m7",
     "E7/B",
     "A",
     "E",
     "B7",
     "E"
    ],
    "bars": 8
   }
  ]
 },
 "Je veux": {
  "status": "uncertain",
  "key": "D minor",
  "bpm": 155,
  "beatsPerBar": 4,
  "durationSec": 217,
  "chords": [
   "Dm",
   "C",
   "Bb",
   "A"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "Dm",
     "C",
     "Bb",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "Dm",
     "C",
     "Bb",
     "A"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "Dm",
     "C",
     "Bb",
     "A"
    ],
    "bars": 16
   },
   {
    "section": "Verse 2",
    "chords": [
     "Dm",
     "C",
     "Bb",
     "A"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "Dm",
     "C",
     "Bb",
     "A"
    ],
    "bars": 16
   },
   {
    "section": "Instrumental (vocal scat / mouth-trumpet break)",
    "chords": [
     "Dm",
     "C",
     "Bb",
     "A"
    ],
    "bars": 16
   },
   {
    "section": "Verse 3",
    "chords": [
     "Dm",
     "C",
     "Bb",
     "A"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "Dm",
     "C",
     "Bb",
     "A"
    ],
    "bars": 16
   },
   {
    "section": "Outro (scat and final cadence)",
    "chords": [
     "Dm",
     "C",
     "Bb",
     "A",
     "Dm",
     "C",
     "Bb",
     "A",
     "Dm",
     "C",
     "Bb",
     "A",
     "Dm",
     "C",
     "Bb",
     "A",
     "Bb",
     "A",
     "Dm",
     "Dm"
    ],
    "bars": 20
   }
  ]
 },
 "Papaoutai": {
  "status": "corrected",
  "key": "Bb minor",
  "capoNote": "Capo 1 with F, Dm, G, Am shapes (or capo 6 with C, Am, D, Em shapes)",
  "bpm": 116,
  "beatsPerBar": 4,
  "durationSec": 232,
  "chords": [
   "Gb",
   "Ebm",
   "Ab",
   "Bbm"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "Gb",
     "Ebm",
     "Ab",
     "Bbm"
    ],
    "bars": 4
   },
   {
    "section": "Verse 1",
    "chords": [
     "Gb",
     "Ebm",
     "Ab",
     "Bbm"
    ],
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Gb",
     "Ebm",
     "Ab",
     "Bbm"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "Gb",
     "Ebm",
     "Ab",
     "Bbm"
    ],
    "bars": 16
   },
   {
    "section": "Verse 2",
    "chords": [
     "Gb",
     "Ebm",
     "Ab",
     "Bbm"
    ],
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Gb",
     "Ebm",
     "Ab",
     "Bbm"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "Gb",
     "Ebm",
     "Ab",
     "Bbm"
    ],
    "bars": 16
   },
   {
    "section": "Bridge (chant breakdown)",
    "chords": [
     "Gb",
     "Ebm",
     "Ab",
     "Bbm"
    ],
    "bars": 8
   },
   {
    "section": "Final chorus",
    "chords": [
     "Gb",
     "Ebm",
     "Ab",
     "Bbm"
    ],
    "bars": 16
   },
   {
    "section": "Outro",
    "chords": [
     "Gb",
     "Ebm",
     "Ab",
     "Bbm"
    ],
    "bars": 4
   }
  ]
 },
 "La Vie en rose": {
  "status": "uncertain",
  "key": "G major",
  "bpm": 80,
  "beatsPerBar": 4,
  "durationSec": 188,
  "chords": [
   "G",
   "Bm",
   "Em7",
   "Am7",
   "D7"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "Am7",
     "D7"
    ],
    "bars": 2
   },
   {
    "section": "Verse",
    "chords": [
     "G",
     "Edim7",
     "Am7",
     "D7"
    ],
    "bars": 16
   },
   {
    "section": "Refrain A1",
    "chords": [
     "G",
     "G",
     "Bm",
     "Em7",
     "Am7",
     "D7",
     "G",
     "D7"
    ],
    "bars": 8
   },
   {
    "section": "Refrain A2",
    "chords": [
     "G",
     "G",
     "Bm",
     "Em7",
     "Am7",
     "D7",
     "G",
     "G"
    ],
    "bars": 8
   },
   {
    "section": "Refrain B (bridge)",
    "chords": [
     "C",
     "C",
     "G",
     "G",
     "A7",
     "A7",
     "Am7",
     "D7"
    ],
    "bars": 8
   },
   {
    "section": "Refrain A3",
    "chords": [
     "G",
     "G",
     "Bm",
     "Em7",
     "Am7",
     "D7",
     "G",
     "G"
    ],
    "bars": 8
   },
   {
    "section": "Instrumental (orchestra, bridge)",
    "chords": [
     "C",
     "C",
     "G",
     "G",
     "A7",
     "A7",
     "Am7",
     "D7"
    ],
    "bars": 8
   },
   {
    "section": "Final refrain A",
    "chords": [
     "G",
     "G",
     "Bm",
     "Em7",
     "Am7",
     "D7",
     "G",
     "G"
    ],
    "bars": 8
   }
  ]
 },
 "Non, je ne regrette rien": {
  "status": "corrected",
  "key": "G major",
  "bpm": 92,
  "beatsPerBar": 4,
  "durationSec": 142,
  "chords": [
   "G",
   "D/F#",
   "C",
   "Caug",
   "C6",
   "D7"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "G",
     "D/F#",
     "D/F#",
     "G"
    ],
    "bars": 4
   },
   {
    "section": "Refrain 1",
    "chords": [
     "G",
     "D/F#",
     "D/F#",
     "G",
     "C",
     "Caug",
     "C6",
     "D7",
     "G",
     "D/F#",
     "D/F#",
     "G",
     "C",
     "Am",
     "D7",
     "G"
    ],
    "bars": 16
   },
   {
    "section": "Verse (middle section)",
    "chords": [
     "G",
     "G",
     "D7",
     "D7",
     "D7",
     "D7",
     "G",
     "G"
    ],
    "bars": 16
   },
   {
    "section": "Refrain 2",
    "chords": [
     "G",
     "D/F#",
     "D/F#",
     "G",
     "C",
     "Caug",
     "C6",
     "D7",
     "G",
     "D/F#",
     "D/F#",
     "G",
     "C",
     "Am",
     "D7",
     "G"
    ],
    "bars": 16
   },
   {
    "section": "Outro (coda)",
    "chords": [
     "C",
     "Caug",
     "C6",
     "D7",
     "G",
     "Eb6",
     "G"
    ],
    "bars": 6
   }
  ]
 },
 "La Bamba": {
  "status": "corrected",
  "key": "C major",
  "bpm": 150,
  "beatsPerBar": 4,
  "durationSec": 126,
  "chords": [
   "C",
   "F",
   "G",
   "F"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "C",
     "F",
     "G",
     "F"
    ],
    "per": 0.5,
    "bars": 4
   },
   {
    "section": "Verse 1",
    "chords": [
     "C",
     "F",
     "G",
     "F"
    ],
    "per": 0.5,
    "bars": 12
   },
   {
    "section": "Verse 2",
    "chords": [
     "C",
     "F",
     "G",
     "F"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "C",
     "F",
     "G",
     "F"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Verse 3",
    "chords": [
     "C",
     "F",
     "G",
     "F"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Guitar solo",
    "chords": [
     "C",
     "F",
     "G",
     "F"
    ],
    "per": 0.5,
    "bars": 16
   },
   {
    "section": "Verse 4",
    "chords": [
     "C",
     "F",
     "G",
     "F"
    ],
    "per": 0.5,
    "bars": 12
   },
   {
    "section": "Chorus / Outro",
    "chords": [
     "C",
     "F",
     "G",
     "F"
    ],
    "per": 0.5,
    "bars": 12
   }
  ],
  "solos": [
   {
    "section": "Guitar solo",
    "scale": "C major pentatonic (C D E G A), box 1 at 8th fret or open position; add F from the C major scale over the F chord",
    "tips": "Keep it rhythmic with short repeated double-stops on the top two strings; land on the root of each chord (C, F, G) as it changes every two beats.",
    "chords": [
     "C",
     "F",
     "G",
     "F"
    ]
   }
  ]
 },
 "Guantanamera": {
  "status": "uncertain",
  "key": "A major",
  "capoNote": "Capo 2, G shapes (G C D7) if you learned it in G",
  "bpm": 128,
  "beatsPerBar": 4,
  "durationSec": 181,
  "chords": [
   "A",
   "D",
   "E7"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "A",
     "D",
     "E7",
     "E7"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Coro",
    "chords": [
     "A",
     "D",
     "E7",
     "E7"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Verso 1",
    "chords": [
     "A",
     "D",
     "E7",
     "E7"
    ],
    "per": 0.5,
    "bars": 16
   },
   {
    "section": "Coro",
    "chords": [
     "A",
     "D",
     "E7",
     "E7"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Verso 2",
    "chords": [
     "A",
     "D",
     "E7",
     "E7"
    ],
    "per": 0.5,
    "bars": 16
   },
   {
    "section": "Coro",
    "chords": [
     "A",
     "D",
     "E7",
     "E7"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Verso 3",
    "chords": [
     "A",
     "D",
     "E7",
     "E7"
    ],
    "per": 0.5,
    "bars": 16
   },
   {
    "section": "Coro",
    "chords": [
     "A",
     "D",
     "E7",
     "E7"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Outro",
    "chords": [
     "A",
     "D",
     "E7",
     "A"
    ],
    "per": 0.5,
    "bars": 8
   }
  ]
 },
 "Bailando": {
  "status": "corrected",
  "key": "E minor",
  "bpm": 91,
  "beatsPerBar": 4,
  "durationSec": 243,
  "chords": [
   "Em",
   "C",
   "G",
   "D"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "Em",
     "C",
     "G",
     "D"
    ],
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "Em",
     "C",
     "G",
     "D"
    ],
    "bars": 8
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Am",
     "C",
     "Em",
     "D"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "Em",
     "C",
     "G",
     "D"
    ],
    "bars": 16
   },
   {
    "section": "Gente de Zona section",
    "chords": [
     "Em",
     "C",
     "G",
     "D"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "Em",
     "C",
     "G",
     "D"
    ],
    "bars": 8
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Am",
     "C",
     "Em",
     "D"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "Em",
     "C",
     "G",
     "D"
    ],
    "bars": 16
   },
   {
    "section": "Outro (Gente de Zona chant)",
    "chords": [
     "Em",
     "C",
     "G",
     "D"
    ],
    "bars": 12
   }
  ]
 },
 "Vivir Mi Vida": {
  "status": "corrected",
  "key": "C minor",
  "capoNote": "Capo 1, Bm shapes (Bm G D A)",
  "bpm": 105,
  "beatsPerBar": 4,
  "durationSec": 252,
  "chords": [
   "Cm",
   "Ab",
   "Eb",
   "Bb"
  ],
  "structure": [
   {
    "section": "Intro (horns)",
    "chords": [
     "Cm",
     "Ab",
     "Eb",
     "Bb"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "Cm",
     "Ab",
     "Eb",
     "Bb"
    ],
    "bars": 16
   },
   {
    "section": "Verse 1",
    "chords": [
     "Ab",
     "Eb",
     "Bb",
     "Cm"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "Cm",
     "Ab",
     "Eb",
     "Bb"
    ],
    "bars": 16
   },
   {
    "section": "Verse 2",
    "chords": [
     "Ab",
     "Eb",
     "Bb",
     "Cm"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "Cm",
     "Ab",
     "Eb",
     "Bb"
    ],
    "bars": 16
   },
   {
    "section": "Mambo (horn interlude)",
    "chords": [
     "Cm",
     "Ab",
     "Eb",
     "Bb"
    ],
    "bars": 8
   },
   {
    "section": "Coro y pregón / Outro",
    "chords": [
     "Cm",
     "Ab",
     "Eb",
     "Bb"
    ],
    "bars": 16
   }
  ]
 },
 "Mas Que Nada": {
  "status": "corrected",
  "key": "G minor",
  "bpm": 89,
  "beatsPerBar": 4,
  "durationSec": 179,
  "chords": [
   "Gm7",
   "Cm7",
   "D7",
   "Gm7"
  ],
  "structure": [
   {
    "section": "Intro (chant)",
    "chords": [
     "Gm7",
     "D7"
    ],
    "bars": 4
   },
   {
    "section": "Chorus",
    "chords": [
     "Gm7",
     "Cm7",
     "D7",
     "Gm7"
    ],
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "Gm7",
     "D7",
     "Gm7",
     "D7",
     "Gm7",
     "D7",
     "D7",
     "Gm7"
    ],
    "bars": 8
   },
   {
    "section": "Bridge",
    "chords": [
     "Cm7",
     "F7",
     "Bbmaj7",
     "Ebmaj7",
     "Em7b5",
     "D7",
     "Gm7",
     "Gm7"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "Gm7",
     "D7",
     "Gm7",
     "D7",
     "Gm7",
     "D7",
     "D7",
     "Gm7"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "Gm7",
     "Cm7",
     "D7",
     "Gm7"
    ],
    "bars": 8
   },
   {
    "section": "Bridge",
    "chords": [
     "Cm7",
     "F7",
     "Bbmaj7",
     "Ebmaj7",
     "Em7b5",
     "D7",
     "Gm7",
     "Gm7"
    ],
    "bars": 8
   },
   {
    "section": "Verse 3",
    "chords": [
     "Gm7",
     "D7",
     "Gm7",
     "D7",
     "Gm7",
     "D7",
     "D7",
     "Gm7"
    ],
    "bars": 8
   },
   {
    "section": "Chorus / Outro",
    "chords": [
     "Gm7",
     "Cm7",
     "D7",
     "Gm7"
    ],
    "bars": 8
   }
  ]
 },
 "Ai Se Eu Te Pego": {
  "status": "corrected",
  "key": "B major",
  "capoNote": "Capo 4, G shapes (G D Em C)",
  "bpm": 96,
  "beatsPerBar": 4,
  "durationSec": 171,
  "chords": [
   "B",
   "F#",
   "G#m",
   "E"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "B",
     "F#",
     "G#m",
     "E"
    ],
    "bars": 4
   },
   {
    "section": "Chorus",
    "chords": [
     "B",
     "F#",
     "G#m",
     "E"
    ],
    "bars": 16
   },
   {
    "section": "Verse",
    "chords": [
     "B",
     "F#",
     "G#m",
     "E"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "B",
     "F#",
     "G#m",
     "E"
    ],
    "bars": 16
   },
   {
    "section": "Chorus (repeat)",
    "chords": [
     "B",
     "F#",
     "G#m",
     "E"
    ],
    "bars": 16
   }
  ]
 },
 "Trem-Bala": {
  "status": "corrected",
  "key": "B major",
  "capoNote": "Capo 2, A shapes (A D E)",
  "bpm": 93,
  "beatsPerBar": 4,
  "durationSec": 180,
  "chords": [
   "B",
   "E",
   "F#"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "B",
     "E",
     "B",
     "F#"
    ],
    "bars": 4
   },
   {
    "section": "Verse 1",
    "chords": [
     "B",
     "E",
     "B",
     "F#",
     "B",
     "E",
     "B",
     "F#",
     "E",
     "F#",
     "B",
     "B",
     "E",
     "F#",
     "B",
     "B"
    ],
    "bars": 16
   },
   {
    "section": "Verse 2",
    "chords": [
     "B",
     "E",
     "B",
     "F#",
     "B",
     "E",
     "B",
     "F#",
     "E",
     "F#",
     "B",
     "B",
     "E",
     "F#",
     "B",
     "B"
    ],
    "bars": 16
   },
   {
    "section": "Verse 3",
    "chords": [
     "B",
     "E",
     "B",
     "F#",
     "B",
     "E",
     "B",
     "F#",
     "E",
     "F#",
     "B",
     "B",
     "E",
     "F#",
     "B",
     "B"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "E",
     "F#",
     "B",
     "B"
    ],
    "bars": 8
   },
   {
    "section": "Outro",
    "chords": [
     "E",
     "F#",
     "B",
     "B"
    ],
    "bars": 8
   }
  ]
 },
 "Tempo Perdido": {
  "status": "corrected",
  "key": "E minor",
  "bpm": 93,
  "beatsPerBar": 4,
  "durationSec": 301,
  "chords": [
   "C",
   "Am7",
   "Bm",
   "Em"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "C",
     "Am7",
     "Bm",
     "Em"
    ],
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "C",
     "Am7",
     "Bm",
     "Em"
    ],
    "bars": 16
   },
   {
    "section": "Verse 2",
    "chords": [
     "C",
     "Am7",
     "Bm",
     "Em"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "C",
     "Am7",
     "Bm",
     "Em",
     "Bm",
     "Em"
    ],
    "bars": 12
   },
   {
    "section": "Interlude",
    "chords": [
     "C",
     "Am7",
     "Bm",
     "Em"
    ],
    "bars": 8
   },
   {
    "section": "Verse 3",
    "chords": [
     "C",
     "Am7",
     "Bm",
     "Em"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "C",
     "Am7",
     "Bm",
     "Em",
     "Bm",
     "Em"
    ],
    "bars": 12
   },
   {
    "section": "Chorus (repeat)",
    "chords": [
     "C",
     "Am7",
     "Bm",
     "Em",
     "Bm",
     "Em"
    ],
    "bars": 12
   },
   {
    "section": "Outro",
    "chords": [
     "C",
     "Am7",
     "Bm",
     "Em"
    ],
    "bars": 16
   }
  ]
 },
 "Evidências": {
  "status": "corrected",
  "key": "E major",
  "bpm": 99,
  "beatsPerBar": 4,
  "durationSec": 294,
  "chords": [
   "E",
   "G#",
   "A",
   "F#m",
   "B7"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "E",
     "A",
     "F#m",
     "A/B"
    ],
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "E",
     "B/D#",
     "C#m7",
     "Amaj7",
     "A",
     "C#7",
     "F#m",
     "B7",
     "C#m7",
     "C#m7/B",
     "F#7",
     "E/G#",
     "F#/A#",
     "B",
     "B",
     "B"
    ],
    "bars": 16
   },
   {
    "section": "Verse 2",
    "chords": [
     "E",
     "B/D#",
     "C#m",
     "Amaj7",
     "A",
     "C#7",
     "F#m",
     "B7",
     "C#m",
     "Am",
     "E",
     "A/B",
     "Esus4",
     "E",
     "A/B",
     "A/B"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "E",
     "G#",
     "A",
     "F#m",
     "B7",
     "B7",
     "E",
     "G#",
     "A",
     "F#m",
     "B7",
     "B7",
     "E",
     "A",
     "F#m",
     "B7",
     "E",
     "A",
     "F#m",
     "B7"
    ],
    "bars": 20
   },
   {
    "section": "Instrumental solo",
    "chords": [
     "C#m",
     "E/B",
     "F#/A#",
     "Am",
     "E",
     "E",
     "A/B",
     "A/B"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2 (repeat)",
    "chords": [
     "E",
     "B/D#",
     "C#m",
     "Amaj7",
     "A",
     "C#7",
     "F#m",
     "B7",
     "C#m",
     "Am",
     "E",
     "A/B",
     "Esus4",
     "E",
     "A/B",
     "A/B"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "E",
     "G#",
     "A",
     "F#m",
     "B7",
     "B7",
     "E",
     "G#",
     "A",
     "F#m",
     "B7",
     "B7",
     "E",
     "A",
     "F#m",
     "B7",
     "E",
     "A",
     "F#m",
     "B7"
    ],
    "bars": 20
   },
   {
    "section": "Final chorus",
    "chords": [
     "E",
     "G#",
     "A",
     "F#m",
     "B7",
     "B7",
     "E",
     "G#",
     "A",
     "F#m",
     "B7",
     "B7",
     "E",
     "A",
     "F#m",
     "B7",
     "E",
     "A",
     "F#m",
     "B7"
    ],
    "bars": 20
   },
   {
    "section": "Outro",
    "chords": [
     "A",
     "E/G#",
     "F#m",
     "B7"
    ],
    "bars": 4
   }
  ],
  "solos": [
   {
    "section": "Instrumental solo",
    "scale": "E major pentatonic (C# minor pentatonic), box 1 at 9th fret; use A natural (from E major) over the Am chord",
    "tips": "Play the melody line of the chorus slowly first, then add bends on the B and G strings; target G# over E and C# over C#m.",
    "chords": [
     "C#m",
     "E/B",
     "F#/A#",
     "Am",
     "E",
     "E",
     "A/B",
     "A/B"
    ]
   }
  ]
 },
 "Nel blu, dipinto di blu (Volare)": {
  "status": "corrected",
  "key": "Bb major",
  "bpm": 128,
  "beatsPerBar": 4,
  "durationSec": 216,
  "chords": [
   "Cm",
   "F7",
   "Bb",
   "Gm"
  ],
  "structure": [
   {
    "section": "Intro verse (rubato)",
    "chords": [
     "Bb",
     "Cm",
     "F7",
     "Cm",
     "F7",
     "Bb",
     "Bb",
     "Dm",
     "Cm",
     "F",
     "C7",
     "Gm7",
     "Cm",
     "F7"
    ],
    "bars": 14
   },
   {
    "section": "Chorus",
    "chords": [
     "Cm",
     "Cm",
     "F7",
     "F7",
     "Bb",
     "Bb",
     "Gm",
     "Gm",
     "Cm",
     "F7",
     "Bb",
     "Gm",
     "Cm",
     "F7",
     "Bb",
     "Bb"
    ],
    "bars": 16
   },
   {
    "section": "Bridge (minor section)",
    "chords": [
     "Gm",
     "Gm",
     "Dm",
     "Dm",
     "D7",
     "D7",
     "Gm",
     "Gm",
     "Gm",
     "Gm",
     "Dm",
     "Dm",
     "Ebm",
     "Ab",
     "F7",
     "F7"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "Cm",
     "Cm",
     "F7",
     "F7",
     "Bb",
     "Bb",
     "Gm",
     "Gm",
     "Cm",
     "F7",
     "Bb",
     "Gm",
     "Cm",
     "F7",
     "Bb",
     "Bb"
    ],
    "bars": 16
   },
   {
    "section": "Verse 2 (rubato)",
    "chords": [
     "Bb",
     "Cm",
     "F7",
     "Cm",
     "F7",
     "Bb",
     "Bb",
     "Dm",
     "Cm",
     "F",
     "C7",
     "Gm7",
     "Cm",
     "F7"
    ],
    "bars": 14
   },
   {
    "section": "Chorus",
    "chords": [
     "Cm",
     "Cm",
     "F7",
     "F7",
     "Bb",
     "Bb",
     "Gm",
     "Gm",
     "Cm",
     "F7",
     "Bb",
     "Gm",
     "Cm",
     "F7",
     "Bb",
     "Bb"
    ],
    "bars": 16
   },
   {
    "section": "Bridge (minor section)",
    "chords": [
     "Gm",
     "Gm",
     "Dm",
     "Dm",
     "D7",
     "D7",
     "Gm",
     "Gm",
     "Gm",
     "Gm",
     "Dm",
     "Dm",
     "Ebm",
     "Ab",
     "F7",
     "F7"
    ],
    "bars": 16
   },
   {
    "section": "Outro (chorus tag)",
    "chords": [
     "Cm",
     "F7",
     "Bb",
     "Gm",
     "Cm",
     "F7",
     "Bb",
     "Bb"
    ],
    "bars": 8
   }
  ]
 },
 "Bella Ciao": {
  "status": "uncertain",
  "key": "A minor",
  "bpm": 135,
  "beatsPerBar": 4,
  "durationSec": 140,
  "chords": [
   "Am",
   "Dm",
   "E7"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "Am",
     "Am",
     "E7",
     "Am"
    ],
    "bars": 4
   },
   {
    "section": "Verse 1",
    "chords": [
     "Am",
     "Am",
     "Am",
     "Am",
     "Am",
     "Am",
     "Am7",
     "Am7",
     "Dm",
     "Dm",
     "Am",
     "Am",
     "E7",
     "E7",
     "Am",
     "Am"
    ],
    "bars": 16
   },
   {
    "section": "Verse 2",
    "chords": [
     "Am",
     "Am",
     "Am",
     "Am",
     "Am",
     "Am",
     "Am7",
     "Am7",
     "Dm",
     "Dm",
     "Am",
     "Am",
     "E7",
     "E7",
     "Am",
     "Am"
    ],
    "bars": 16
   },
   {
    "section": "Verse 3",
    "chords": [
     "Am",
     "Am",
     "Am",
     "Am",
     "Am",
     "Am",
     "Am7",
     "Am7",
     "Dm",
     "Dm",
     "Am",
     "Am",
     "E7",
     "E7",
     "Am",
     "Am"
    ],
    "bars": 16
   },
   {
    "section": "Verse 4",
    "chords": [
     "Am",
     "Am",
     "Am",
     "Am",
     "Am",
     "Am",
     "Am7",
     "Am7",
     "Dm",
     "Dm",
     "Am",
     "Am",
     "E7",
     "E7",
     "Am",
     "Am"
    ],
    "bars": 16
   },
   {
    "section": "Verse 5",
    "chords": [
     "Am",
     "Am",
     "Am",
     "Am",
     "Am",
     "Am",
     "Am7",
     "Am7",
     "Dm",
     "Dm",
     "Am",
     "Am",
     "E7",
     "E7",
     "Am",
     "Am"
    ],
    "bars": 16
   }
  ]
 },
 "L'Italiano": {
  "status": "corrected",
  "key": "A minor, modulating to Bb minor",
  "bpm": 121,
  "beatsPerBar": 4,
  "durationSec": 237,
  "chords": [
   "Am",
   "Dm",
   "E"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "Dm",
     "Am",
     "E",
     "Am"
    ],
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "Am",
     "Am",
     "Am",
     "Am",
     "Am",
     "E",
     "E",
     "E",
     "E",
     "Am",
     "Am",
     "Am",
     "C",
     "Am",
     "E",
     "Am"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "Dm",
     "Dm",
     "Am",
     "Am",
     "E",
     "E",
     "Am",
     "Am"
    ],
    "bars": 16
   },
   {
    "section": "Verse 2 (key change up to Bb minor)",
    "chords": [
     "Bbm",
     "Bbm",
     "Bbm",
     "Bbm",
     "Bbm",
     "F",
     "F",
     "F",
     "F",
     "Bbm",
     "Bbm",
     "Bbm",
     "Db",
     "Bbm",
     "F",
     "Bbm"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "Ebm",
     "Ebm",
     "Bbm",
     "Bbm",
     "F",
     "F",
     "Bbm",
     "Bbm"
    ],
    "bars": 16
   },
   {
    "section": "Instrumental interlude",
    "chords": [
     "Ebm",
     "Bbm",
     "F",
     "Bbm"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "Ebm",
     "Ebm",
     "Bbm",
     "Bbm",
     "F",
     "F",
     "Bbm",
     "Bbm"
    ],
    "bars": 16
   },
   {
    "section": "Chorus (repeat)",
    "chords": [
     "Ebm",
     "Ebm",
     "Bbm",
     "Bbm",
     "F",
     "F",
     "Bbm",
     "Bbm"
    ],
    "bars": 16
   },
   {
    "section": "Outro",
    "chords": [
     "F",
     "Bbm"
    ],
    "bars": 4
   }
  ]
 },
 "Felicità": {
  "status": "corrected",
  "key": "C major, modulating to D major",
  "bpm": 108,
  "beatsPerBar": 4,
  "durationSec": 192,
  "chords": [
   "C",
   "Am",
   "Dm",
   "G7"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "C",
     "Am",
     "Dm",
     "G7"
    ],
    "bars": 4
   },
   {
    "section": "Verse 1 (Al Bano)",
    "chords": [
     "C",
     "Am",
     "Dm",
     "G7"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "C",
     "Am",
     "Dm",
     "G7"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2 (Romina)",
    "chords": [
     "C",
     "Am",
     "Dm",
     "G7"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "C",
     "Am",
     "Dm",
     "G7"
    ],
    "bars": 8
   },
   {
    "section": "Verse 3 (key change to D)",
    "chords": [
     "D",
     "Bm",
     "Em",
     "A"
    ],
    "bars": 16
   },
   {
    "section": "Chorus (D)",
    "chords": [
     "D",
     "Bm",
     "Em",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Outro (D, fade)",
    "chords": [
     "D",
     "Bm",
     "Em",
     "A"
    ],
    "bars": 8
   }
  ]
 },
 "Sarà perché ti amo": {
  "status": "corrected",
  "key": "E major",
  "capoNote": "Capo 4, C shapes (C Am F G)",
  "bpm": 120,
  "beatsPerBar": 4,
  "durationSec": 191,
  "chords": [
   "E",
   "C#m",
   "A",
   "B"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "E",
     "C#m",
     "A",
     "B"
    ],
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "E",
     "E",
     "C#m",
     "C#m",
     "A",
     "A",
     "B",
     "B"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "E",
     "E",
     "C#m",
     "C#m",
     "A",
     "A",
     "B",
     "B"
    ],
    "bars": 16
   },
   {
    "section": "Verse 2",
    "chords": [
     "E",
     "E",
     "C#m",
     "C#m",
     "A",
     "A",
     "B",
     "B"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "E",
     "E",
     "C#m",
     "C#m",
     "A",
     "A",
     "B",
     "B"
    ],
    "bars": 16
   },
   {
    "section": "Instrumental interlude",
    "chords": [
     "E",
     "C#m",
     "A",
     "B"
    ],
    "bars": 4
   },
   {
    "section": "Chorus",
    "chords": [
     "E",
     "E",
     "C#m",
     "C#m",
     "A",
     "A",
     "B",
     "B"
    ],
    "bars": 16
   },
   {
    "section": "Outro (fade)",
    "chords": [
     "E",
     "C#m",
     "A",
     "B"
    ],
    "bars": 4
   }
  ]
 },
 "99 Luftballons": {
  "status": "corrected",
  "key": "E major",
  "capoNote": "Capo 2, D shapes (D-Em-G-A)",
  "bpm": 97,
  "beatsPerBar": 4,
  "durationSec": 231,
  "chords": [
   "E",
   "F#m",
   "A",
   "B"
  ],
  "structure": [
   {
    "section": "Verse 1 (slow, rubato intro)",
    "chords": [
     "E",
     "F#m",
     "A",
     "B"
    ],
    "bars": 8
   },
   {
    "section": "Instrumental",
    "chords": [
     "E",
     "E",
     "E",
     "E",
     "E",
     "E",
     "E",
     "B"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "E",
     "F#m",
     "A",
     "B"
    ],
    "bars": 16
   },
   {
    "section": "Riff",
    "chords": [
     "E",
     "F#m",
     "A",
     "B"
    ],
    "bars": 4
   },
   {
    "section": "Verse 3",
    "chords": [
     "E",
     "F#m",
     "A",
     "B"
    ],
    "bars": 16
   },
   {
    "section": "Instrumental",
    "chords": [
     "E",
     "E",
     "E",
     "E",
     "E",
     "E",
     "E",
     "B"
    ],
    "bars": 8
   },
   {
    "section": "Verse 4",
    "chords": [
     "E",
     "F#m",
     "A",
     "B"
    ],
    "bars": 16
   },
   {
    "section": "Break (instrumental)",
    "chords": [
     "E",
     "F#m",
     "A",
     "B",
     "E",
     "F#m",
     "A",
     "B",
     "E",
     "E",
     "E",
     "E",
     "E",
     "E",
     "E",
     "B"
    ],
    "bars": 16
   },
   {
    "section": "Verse 5 (quiet ending)",
    "chords": [
     "E",
     "F#m",
     "A",
     "B"
    ],
    "bars": 8
   }
  ]
 },
 "Atemlos durch die Nacht": {
  "status": "corrected",
  "key": "B major",
  "capoNote": "Capo 4, G shapes (G-Em-D-C) or capo 2 with A shapes",
  "bpm": 128,
  "beatsPerBar": 4,
  "durationSec": 219,
  "chords": [
   "E",
   "B",
   "F#",
   "G#m"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "B",
     "B",
     "G#m",
     "G#m"
    ],
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "B",
     "B",
     "G#m",
     "F#"
    ],
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "E",
     "B",
     "F#",
     "G#m",
     "E",
     "B",
     "F#",
     "F#"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "E",
     "B",
     "F#",
     "G#m"
    ],
    "bars": 16
   },
   {
    "section": "Verse 2",
    "chords": [
     "B",
     "B",
     "G#m",
     "F#"
    ],
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "E",
     "B",
     "F#",
     "G#m",
     "E",
     "B",
     "F#",
     "F#"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "E",
     "B",
     "F#",
     "G#m"
    ],
    "bars": 16
   },
   {
    "section": "Interlude",
    "chords": [
     "E",
     "B",
     "F#",
     "G#m"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "E",
     "B",
     "F#",
     "G#m"
    ],
    "bars": 16
   },
   {
    "section": "Outro",
    "chords": [
     "E",
     "B",
     "F#",
     "G#m"
    ],
    "bars": 4
   }
  ]
 },
 "Tage wie diese": {
  "status": "corrected",
  "key": "D major",
  "bpm": 97,
  "beatsPerBar": 4,
  "durationSec": 268,
  "chords": [
   "D",
   "G",
   "Em",
   "Cadd9"
  ],
  "structure": [
   {
    "section": "Intro (guitar riff)",
    "chords": [
     "D",
     "D",
     "G",
     "G"
    ],
    "bars": 4
   },
   {
    "section": "Verse 1",
    "chords": [
     "D",
     "G",
     "Bm7",
     "G"
    ],
    "bars": 8
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Cadd9",
     "G",
     "D",
     "D"
    ],
    "bars": 4
   },
   {
    "section": "Verse 2",
    "chords": [
     "D",
     "G",
     "Bm7",
     "G"
    ],
    "bars": 8
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Cadd9",
     "G",
     "D",
     "D"
    ],
    "bars": 4
   },
   {
    "section": "Chorus",
    "chords": [
     "D",
     "G",
     "Em",
     "G",
     "Cadd9",
     "G",
     "D",
     "D"
    ],
    "bars": 16
   },
   {
    "section": "Verse 3",
    "chords": [
     "D",
     "G",
     "Bm7",
     "G"
    ],
    "bars": 8
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Cadd9",
     "G",
     "D",
     "D"
    ],
    "bars": 4
   },
   {
    "section": "Chorus",
    "chords": [
     "D",
     "G",
     "Em",
     "G",
     "Cadd9",
     "G",
     "D",
     "D"
    ],
    "bars": 16
   },
   {
    "section": "Bridge",
    "chords": [
     "G",
     "G",
     "Bm7",
     "Bm7",
     "G",
     "G",
     "A",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "D",
     "G",
     "Em",
     "G",
     "Cadd9",
     "G",
     "D",
     "D"
    ],
    "bars": 16
   },
   {
    "section": "Outro (chorus repeats, fade)",
    "chords": [
     "D",
     "G",
     "Em",
     "G",
     "Cadd9",
     "G",
     "D",
     "D",
     "G",
     "A",
     "D",
     "D"
    ],
    "bars": 16
   }
  ]
 },
 "Auf uns": {
  "status": "corrected",
  "key": "D major",
  "capoNote": "Capo 2, C shapes (C-Am-G-F)",
  "bpm": 128,
  "beatsPerBar": 4,
  "durationSec": 241,
  "chords": [
   "D",
   "Bm",
   "G",
   "A"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "D",
     "D",
     "Bm",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "D",
     "D",
     "Bm",
     "A"
    ],
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Bm",
     "Bm",
     "G",
     "A",
     "G",
     "A",
     "D",
     "D"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "G",
     "A",
     "D",
     "D"
    ],
    "bars": 16
   },
   {
    "section": "Verse 2",
    "chords": [
     "D",
     "D",
     "Bm",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Bm",
     "Bm",
     "G",
     "A",
     "G",
     "A",
     "D",
     "D"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "G",
     "A",
     "D",
     "D"
    ],
    "bars": 16
   },
   {
    "section": "Bridge",
    "chords": [
     "G",
     "A",
     "D",
     "Bm"
    ],
    "bars": 16
   },
   {
    "section": "Pre-chorus (quiet)",
    "chords": [
     "Bm",
     "Bm",
     "G",
     "A",
     "G",
     "A",
     "D",
     "D"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "G",
     "A",
     "D",
     "D"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "G",
     "A",
     "D",
     "D"
    ],
    "bars": 8
   },
   {
    "section": "Outro",
    "chords": [
     "G",
     "A",
     "D",
     "Bm",
     "G",
     "A",
     "D",
     "D"
    ],
    "bars": 8
   }
  ]
 },
 "Stille Nacht, heilige Nacht": {
  "status": "corrected",
  "key": "C major",
  "capoNote": "Guitar: capo 5 with G shapes, or play C shapes open",
  "bpm": 72,
  "beatsPerBar": 3,
  "durationSec": 200,
  "chords": [
   "C",
   "G7",
   "F",
   "Am"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "C",
     "C",
     "G7",
     "C"
    ],
    "bars": 4
   },
   {
    "section": "Verse 1",
    "chords": [
     "C",
     "C",
     "C",
     "C",
     "G7",
     "G7",
     "C",
     "C",
     "F",
     "F",
     "C",
     "C",
     "F",
     "F",
     "C",
     "C",
     "G7",
     "G#dim7",
     "C",
     "Am",
     "C/G",
     "G7",
     "C",
     "C"
    ],
    "bars": 24
   },
   {
    "section": "Verse 2",
    "chords": [
     "C",
     "C",
     "C",
     "C",
     "G7",
     "G7",
     "C",
     "C",
     "F",
     "F",
     "C",
     "C",
     "F",
     "F",
     "C",
     "C",
     "G7",
     "G#dim7",
     "C",
     "Am",
     "C/G",
     "G7",
     "C",
     "C"
    ],
    "bars": 24
   },
   {
    "section": "Verse 3",
    "chords": [
     "C",
     "C",
     "C",
     "C",
     "G7",
     "G7",
     "C",
     "C",
     "F",
     "F",
     "C",
     "C",
     "F",
     "F",
     "C",
     "C",
     "G7",
     "G#dim7",
     "C",
     "Am",
     "C/G",
     "G7",
     "C",
     "C"
    ],
    "bars": 24
   },
   {
    "section": "Outro",
    "chords": [
     "F",
     "C",
     "G7",
     "C"
    ],
    "bars": 4
   }
  ]
 },
 "Tum Hi Ho": {
  "status": "corrected",
  "key": "F minor",
  "capoNote": "Capo 1, Em shapes (Em-C-D-Bm-Am)",
  "bpm": 94,
  "beatsPerBar": 4,
  "durationSec": 262,
  "chords": [
   "Fm",
   "Db",
   "Eb",
   "Cm",
   "Bbm"
  ],
  "structure": [
   {
    "section": "Intro (piano)",
    "chords": [
     "Fm",
     "Cm",
     "Bbm",
     "Fm"
    ],
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "Fm",
     "Fm",
     "Db",
     "Db",
     "Eb",
     "Cm",
     "Db",
     "Db"
    ],
    "per": 0.5,
    "bars": 12
   },
   {
    "section": "Chorus",
    "chords": [
     "Fm",
     "Fm",
     "Bbm",
     "Bbm",
     "Eb",
     "Cm",
     "Db",
     "Db"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Instrumental",
    "chords": [
     "Fm",
     "Cm",
     "Bbm",
     "Fm"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "Fm",
     "Fm",
     "Db",
     "Db",
     "Eb",
     "Cm",
     "Db",
     "Db"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Build",
    "chords": [
     "Eb",
     "Eb",
     "Ab",
     "Ab",
     "C7",
     "C7",
     "Db",
     "Eb"
    ],
    "per": 0.5,
    "bars": 4
   },
   {
    "section": "Chorus",
    "chords": [
     "Fm",
     "Fm",
     "Bbm",
     "Bbm",
     "Eb",
     "Cm",
     "Db",
     "Db"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Bridge (interlude)",
    "chords": [
     "Fm",
     "Cm",
     "Bbm",
     "Fm",
     "Db",
     "Fm",
     "Db",
     "Fm",
     "Db",
     "Eb",
     "Fm",
     "Fm"
    ],
    "bars": 12
   },
   {
    "section": "Verse 3",
    "chords": [
     "Db",
     "Cm",
     "Db",
     "Cm",
     "Bbm",
     "Fm",
     "Bbm",
     "Fm",
     "Eb",
     "Ab",
     "C7",
     "Db"
    ],
    "bars": 12
   },
   {
    "section": "Chorus",
    "chords": [
     "Fm",
     "Fm",
     "Bbm",
     "Bbm",
     "Eb",
     "Cm",
     "Db",
     "Db"
    ],
    "per": 0.5,
    "bars": 16
   },
   {
    "section": "Outro",
    "chords": [
     "Fm",
     "Fm",
     "Fm",
     "Fm"
    ],
    "bars": 4
   }
  ]
 },
 "Channa Mereya": {
  "status": "corrected",
  "key": "A minor",
  "bpm": 90,
  "beatsPerBar": 4,
  "durationSec": 289,
  "chords": [
   "Am",
   "Fmaj7",
   "Dm7",
   "C",
   "G"
  ],
  "structure": [
   {
    "section": "Intro (guitar)",
    "chords": [
     "Am",
     "Am",
     "Dm",
     "Dm",
     "G",
     "C",
     "G",
     "C"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "Am",
     "Am",
     "Fmaj7",
     "Fmaj7",
     "Dm7",
     "C",
     "G",
     "G"
    ],
    "per": 0.5,
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "Am",
     "Am",
     "Fmaj7",
     "Fmaj7",
     "Dm7",
     "C",
     "G",
     "G"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Interlude",
    "chords": [
     "Am",
     "Fmaj7",
     "Dm7",
     "G"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "Am",
     "Am",
     "Fmaj7",
     "Fmaj7",
     "Dm7",
     "C",
     "G",
     "G"
    ],
    "per": 0.5,
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "Am",
     "Am",
     "Fmaj7",
     "Fmaj7",
     "Dm7",
     "C",
     "G",
     "G"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Interlude",
    "chords": [
     "Am",
     "Fmaj7",
     "Dm7",
     "G"
    ],
    "bars": 8
   },
   {
    "section": "Verse 3 (high)",
    "chords": [
     "Am",
     "Fmaj7",
     "Dm7",
     "C",
     "G",
     "Am",
     "Fmaj7",
     "Fmaj7",
     "Dm7",
     "C",
     "G",
     "Am"
    ],
    "per": 0.5,
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "Am",
     "Am",
     "Fmaj7",
     "Fmaj7",
     "Dm7",
     "C",
     "G",
     "G"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "Am",
     "Am",
     "Fmaj7",
     "Fmaj7",
     "Dm7",
     "C",
     "G",
     "G"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Outro",
    "chords": [
     "Am",
     "Fmaj7",
     "Dm7",
     "Am"
    ],
    "bars": 4
   }
  ]
 },
 "Kesariya": {
  "status": "uncertain",
  "key": "C major",
  "bpm": 94,
  "beatsPerBar": 4,
  "durationSec": 269,
  "chords": [
   "C",
   "G",
   "Am",
   "F"
  ],
  "structure": [
   {
    "section": "Intro (guitar)",
    "chords": [
     "F",
     "G",
     "C",
     "G"
    ],
    "bars": 4
   },
   {
    "section": "Verse 1",
    "chords": [
     "C",
     "G",
     "C",
     "G",
     "C",
     "Am",
     "F",
     "G",
     "C",
     "Am",
     "F",
     "G"
    ],
    "bars": 12
   },
   {
    "section": "Chorus",
    "chords": [
     "F",
     "C",
     "F",
     "C",
     "C7",
     "F",
     "C",
     "F",
     "G",
     "G"
    ],
    "bars": 20
   },
   {
    "section": "Verse 2",
    "chords": [
     "C",
     "C",
     "Am",
     "F",
     "G",
     "G",
     "C",
     "Am",
     "F",
     "G",
     "C",
     "Am",
     "F",
     "G"
    ],
    "bars": 28
   },
   {
    "section": "Chorus",
    "chords": [
     "F",
     "C",
     "F",
     "C",
     "C7",
     "F",
     "C",
     "F",
     "G",
     "G"
    ],
    "bars": 20
   },
   {
    "section": "Chorus (repeat)",
    "chords": [
     "F",
     "C",
     "F",
     "C",
     "C7",
     "F",
     "C",
     "F",
     "G",
     "G"
    ],
    "bars": 12
   },
   {
    "section": "Outro",
    "chords": [
     "C",
     "F",
     "C",
     "F",
     "C",
     "C"
    ],
    "bars": 6
   }
  ]
 },
 "Agar Tum Saath Ho": {
  "status": "corrected",
  "key": "Eb major",
  "capoNote": "Capo 1, D shapes (D-G-A)",
  "bpm": 62,
  "beatsPerBar": 4,
  "durationSec": 341,
  "chords": [
   "Eb",
   "Ab",
   "Bb"
  ],
  "structure": [
   {
    "section": "Intro (piano)",
    "chords": [
     "Eb",
     "Ab",
     "Bb",
     "Eb"
    ],
    "bars": 4
   },
   {
    "section": "Verse 1 (female)",
    "chords": [
     "Eb",
     "Ab",
     "Eb",
     "Ab",
     "Eb",
     "Ab",
     "Bb",
     "Bb",
     "Eb",
     "Ab",
     "Bb",
     "Bb",
     "Ab",
     "Bb",
     "Eb",
     "Eb"
    ],
    "per": 0.5,
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "Ab",
     "Bb",
     "Eb",
     "Eb"
    ],
    "bars": 8
   },
   {
    "section": "Instrumental",
    "chords": [
     "Ab",
     "Bb",
     "Ab",
     "Eb"
    ],
    "bars": 4
   },
   {
    "section": "Verse 2 (male)",
    "chords": [
     "Eb",
     "Ab",
     "Eb",
     "Ab",
     "Eb",
     "Ab",
     "Bb",
     "Bb",
     "Eb",
     "Ab",
     "Bb",
     "Bb",
     "Ab",
     "Bb",
     "Eb",
     "Eb"
    ],
    "per": 0.5,
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "Ab",
     "Bb",
     "Eb",
     "Eb"
    ],
    "bars": 8
   },
   {
    "section": "Instrumental",
    "chords": [
     "Ab",
     "Bb",
     "Ab",
     "Eb"
    ],
    "bars": 4
   },
   {
    "section": "Bridge",
    "chords": [
     "Ab",
     "Bb",
     "Ab",
     "Eb",
     "Ab",
     "Bb",
     "Ab",
     "Bb",
     "Eb",
     "Ab",
     "Bb",
     "Bb",
     "Ab",
     "Bb",
     "Eb",
     "Eb"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Verse 3",
    "chords": [
     "Eb",
     "Ab",
     "Eb",
     "Ab",
     "Eb",
     "Ab",
     "Bb",
     "Bb",
     "Eb",
     "Ab",
     "Bb",
     "Bb",
     "Ab",
     "Bb",
     "Eb",
     "Eb"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "Ab",
     "Bb",
     "Eb",
     "Eb"
    ],
    "bars": 8
   },
   {
    "section": "Outro",
    "chords": [
     "Ab",
     "Bb",
     "Eb",
     "Eb"
    ],
    "bars": 4
   }
  ]
 },
 "Pal Pal Dil Ke Paas": {
  "status": "uncertain",
  "key": "A major",
  "capoNote": "Capo 2, G shapes (Em-D-C-G)",
  "bpm": 100,
  "beatsPerBar": 4,
  "durationSec": 325,
  "chords": [
   "F#m",
   "E",
   "D",
   "A"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "F#m",
     "E",
     "D",
     "E",
     "E",
     "A",
     "F#m",
     "Bm",
     "A",
     "E",
     "C#m",
     "A",
     "F#m",
     "E",
     "D",
     "E",
     "E",
     "A"
    ],
    "per": 0.5,
    "bars": 9
   },
   {
    "section": "Mukhda",
    "chords": [
     "F#m",
     "E",
     "D",
     "E",
     "E",
     "A"
    ],
    "bars": 12
   },
   {
    "section": "Interlude",
    "chords": [
     "F#m",
     "E",
     "D",
     "E",
     "E",
     "A",
     "F#m",
     "Bm",
     "A",
     "E",
     "C#m",
     "A",
     "F#m",
     "E",
     "D",
     "E",
     "E",
     "A"
    ],
    "per": 0.5,
    "bars": 9
   },
   {
    "section": "Antara 1",
    "chords": [
     "D",
     "E",
     "A",
     "A",
     "E",
     "D",
     "E",
     "A",
     "A",
     "A",
     "F#m",
     "A",
     "D",
     "A",
     "A",
     "A",
     "A",
     "Bm",
     "E",
     "A"
    ],
    "bars": 20
   },
   {
    "section": "Mukhda",
    "chords": [
     "F#m",
     "E",
     "D",
     "E",
     "E",
     "A"
    ],
    "bars": 6
   },
   {
    "section": "Interlude",
    "chords": [
     "F#m",
     "E",
     "D",
     "E",
     "E",
     "A",
     "F#m",
     "Bm",
     "A",
     "E",
     "C#m",
     "A",
     "F#m",
     "E",
     "D",
     "E",
     "E",
     "A"
    ],
    "per": 0.5,
    "bars": 9
   },
   {
    "section": "Antara 2",
    "chords": [
     "D",
     "E",
     "A",
     "A",
     "E",
     "D",
     "E",
     "A",
     "A",
     "A",
     "F#m",
     "A",
     "D",
     "A",
     "A",
     "A",
     "A",
     "Bm",
     "E",
     "A"
    ],
    "bars": 20
   },
   {
    "section": "Mukhda",
    "chords": [
     "F#m",
     "E",
     "D",
     "E",
     "E",
     "A"
    ],
    "bars": 6
   },
   {
    "section": "Interlude",
    "chords": [
     "F#m",
     "E",
     "D",
     "E",
     "E",
     "A",
     "F#m",
     "Bm",
     "A",
     "E",
     "C#m",
     "A",
     "F#m",
     "E",
     "D",
     "E",
     "E",
     "A"
    ],
    "per": 0.5,
    "bars": 9
   },
   {
    "section": "Antara 3",
    "chords": [
     "D",
     "E",
     "A",
     "A",
     "E",
     "D",
     "E",
     "A",
     "A",
     "A",
     "F#m",
     "A",
     "D",
     "A",
     "A",
     "A",
     "C#m",
     "Bm",
     "E",
     "A"
    ],
    "bars": 20
   },
   {
    "section": "Mukhda",
    "chords": [
     "F#m",
     "E",
     "D",
     "E",
     "E",
     "A"
    ],
    "bars": 12
   },
   {
    "section": "Outro",
    "chords": [
     "F#m",
     "E",
     "D",
     "E",
     "E",
     "A"
    ],
    "bars": 6
   }
  ]
 },
 "Ue o Muite Arukō (Sukiyaki)": {
  "status": "corrected",
  "key": "G major",
  "capoNote": "Capo 7, C shapes (C-Am-F-G)",
  "bpm": 146,
  "beatsPerBar": 4,
  "durationSec": 185,
  "chords": [
   "G",
   "Em",
   "C",
   "D"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "G",
     "Em",
     "C",
     "D7"
    ],
    "bars": 4
   },
   {
    "section": "Verse 1",
    "chords": [
     "G",
     "Em",
     "G",
     "Em",
     "G",
     "Em",
     "C",
     "D",
     "G",
     "D",
     "Bm7",
     "Em",
     "C",
     "D",
     "G",
     "D7"
    ],
    "bars": 32
   },
   {
    "section": "Bridge",
    "chords": [
     "C",
     "C",
     "G",
     "G",
     "C",
     "Cm",
     "Em",
     "D"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "G",
     "Em",
     "G",
     "Em",
     "G",
     "Em",
     "C",
     "D",
     "G",
     "D",
     "Bm7",
     "Em",
     "C",
     "D",
     "G",
     "D7"
    ],
    "bars": 32
   },
   {
    "section": "Bridge",
    "chords": [
     "C",
     "C",
     "G",
     "G",
     "C",
     "Cm",
     "Em",
     "D"
    ],
    "bars": 8
   },
   {
    "section": "Verse 3 (with whistling)",
    "chords": [
     "G",
     "Em",
     "G",
     "Em",
     "G",
     "Em",
     "C",
     "D",
     "G",
     "D",
     "Bm7",
     "Em",
     "C",
     "D",
     "G",
     "D7",
     "C",
     "D",
     "G",
     "D7"
    ],
    "bars": 20
   },
   {
    "section": "Outro (whistle)",
    "chords": [
     "G",
     "Em",
     "G",
     "Em",
     "G"
    ],
    "bars": 5
   }
  ]
 },
 "Lemon": {
  "status": "corrected",
  "key": "B major",
  "capoNote": "No capo in B; alternative: tune half step down and use C/Am shapes",
  "bpm": 87,
  "beatsPerBar": 4,
  "durationSec": 256,
  "chords": [
   "E",
   "B",
   "F#",
   "G#m"
  ],
  "structure": [
   {
    "section": "Verse 1",
    "chords": [
     "G#m",
     "F#",
     "E",
     "B",
     "E",
     "B",
     "Ddim7",
     "D#7"
    ],
    "per": 0.5,
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "C#m",
     "G#m",
     "F#",
     "B",
     "C#m",
     "G#m",
     "E",
     "F#"
    ],
    "per": 0.5,
    "bars": 4
   },
   {
    "section": "Chorus",
    "chords": [
     "E",
     "B",
     "F#",
     "G#m",
     "E",
     "B",
     "F#",
     "D#7",
     "E",
     "B",
     "A#m7b5",
     "D#7",
     "C#m",
     "G#m",
     "E",
     "Fm7b5",
     "C#m",
     "G#m",
     "F#",
     "B"
    ],
    "per": 0.5,
    "bars": 10
   },
   {
    "section": "Interlude",
    "chords": [
     "G#m",
     "F#",
     "E",
     "B"
    ],
    "bars": 4
   },
   {
    "section": "Verse 2",
    "chords": [
     "G#m",
     "F#",
     "E",
     "B",
     "E",
     "B",
     "Ddim7",
     "D#7"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "C#m",
     "G#m",
     "F#",
     "B",
     "C#m",
     "G#m",
     "E",
     "F#"
    ],
    "per": 0.5,
    "bars": 4
   },
   {
    "section": "Chorus",
    "chords": [
     "E",
     "B",
     "F#",
     "G#m",
     "E",
     "B",
     "F#",
     "D#7",
     "E",
     "B",
     "A#m7b5",
     "D#7",
     "C#m",
     "G#m",
     "E",
     "Fm7b5",
     "C#m",
     "G#m",
     "F#",
     "B"
    ],
    "per": 0.5,
    "bars": 10
   },
   {
    "section": "Bridge (Ab major)",
    "chords": [
     "Fm",
     "Db",
     "Eb",
     "Ab",
     "Db",
     "Ab",
     "Eb",
     "Ab"
    ],
    "per": 0.5,
    "bars": 16
   },
   {
    "section": "Final chorus",
    "chords": [
     "E",
     "B",
     "F#",
     "G#m",
     "E",
     "B",
     "F#",
     "D#7",
     "E",
     "B",
     "A#m7b5",
     "D#7",
     "C#m",
     "G#m",
     "E",
     "Fm7b5",
     "C#m",
     "G#m",
     "F#",
     "B"
    ],
    "per": 0.5,
    "bars": 20
   },
   {
    "section": "Outro",
    "chords": [
     "C#m",
     "G#m",
     "E",
     "F#",
     "E",
     "E"
    ],
    "bars": 4
   }
  ]
 },
 "Marigold": {
  "status": "corrected",
  "key": "D major",
  "capoNote": "Open D shapes, or capo 2 with C shapes",
  "bpm": 106,
  "beatsPerBar": 4,
  "durationSec": 307,
  "chords": [
   "D",
   "A/C#",
   "Bm",
   "G"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "D",
     "D",
     "D",
     "A/C#",
     "Bm",
     "F#m",
     "G",
     "D/F#",
     "G",
     "A"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "D",
     "A/C#",
     "Bm",
     "A",
     "G",
     "D/F#",
     "G",
     "A"
    ],
    "per": 0.5,
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Bm",
     "D/F#",
     "G",
     "A"
    ],
    "bars": 4
   },
   {
    "section": "Chorus",
    "chords": [
     "D",
     "A/C#",
     "Bm",
     "A",
     "G",
     "D/F#",
     "Bm",
     "Bm",
     "G",
     "A"
    ],
    "per": 0.5,
    "bars": 16
   },
   {
    "section": "Interlude",
    "chords": [
     "D",
     "A/C#",
     "Bm",
     "A",
     "G",
     "D/F#",
     "G",
     "A"
    ],
    "per": 0.5,
    "bars": 4
   },
   {
    "section": "Verse 2",
    "chords": [
     "D",
     "A/C#",
     "Bm",
     "A",
     "G",
     "D/F#",
     "G",
     "A"
    ],
    "per": 0.5,
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Bm",
     "D/F#",
     "G",
     "A"
    ],
    "bars": 4
   },
   {
    "section": "Chorus",
    "chords": [
     "D",
     "A/C#",
     "Bm",
     "A",
     "G",
     "D/F#",
     "Bm",
     "Bm",
     "G",
     "A"
    ],
    "per": 0.5,
    "bars": 16
   },
   {
    "section": "Bridge",
    "chords": [
     "A/C#",
     "D",
     "A",
     "Bm",
     "A/C#",
     "D",
     "A",
     "D"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Instrumental",
    "chords": [
     "G",
     "A",
     "Bm",
     "Bm",
     "G",
     "A",
     "A",
     "A"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "D",
     "A/C#",
     "Bm",
     "A",
     "G",
     "D/F#",
     "Bm",
     "Bm",
     "G",
     "A"
    ],
    "per": 0.5,
    "bars": 24
   },
   {
    "section": "Outro",
    "chords": [
     "D",
     "A/C#",
     "Bm",
     "F#m",
     "G",
     "D/F#",
     "G",
     "A",
     "D",
     "D"
    ],
    "per": 0.5,
    "bars": 8
   }
  ]
 },
 "Sekai ni Hitotsu Dake no Hana": {
  "status": "corrected",
  "key": "A major",
  "bpm": 91,
  "beatsPerBar": 4,
  "durationSec": 281,
  "chords": [
   "A",
   "D",
   "E",
   "C#"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "A",
     "D",
     "E",
     "C#",
     "F#m",
     "D",
     "E",
     "A"
    ],
    "per": 0.5,
    "bars": 4
   },
   {
    "section": "Opening refrain",
    "chords": [
     "A",
     "D",
     "E",
     "F#m"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "A",
     "D",
     "E",
     "C#",
     "F#m",
     "D",
     "B",
     "E",
     "A",
     "D",
     "E",
     "C#",
     "F#m",
     "D",
     "E",
     "A"
    ],
    "per": 0.5,
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "G",
     "D",
     "G",
     "D",
     "E",
     "E/D",
     "A",
     "A",
     "B",
     "E7"
    ],
    "per": 0.5,
    "bars": 5
   },
   {
    "section": "Chorus",
    "chords": [
     "E",
     "E",
     "A",
     "D",
     "E",
     "C#",
     "F#m",
     "B",
     "E7",
     "E",
     "A",
     "D",
     "E",
     "C#",
     "F#m",
     "B",
     "E",
     "A"
    ],
    "per": 0.5,
    "bars": 9
   },
   {
    "section": "Interlude",
    "chords": [
     "A",
     "D",
     "E",
     "F#m"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "A",
     "D",
     "E",
     "C#",
     "F#m",
     "D",
     "B",
     "E",
     "A",
     "D",
     "E",
     "C#",
     "F#m",
     "D",
     "E",
     "A"
    ],
    "per": 0.5,
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "G",
     "D",
     "G",
     "D",
     "E",
     "E/D",
     "A",
     "A",
     "B",
     "E7"
    ],
    "per": 0.5,
    "bars": 5
   },
   {
    "section": "Chorus",
    "chords": [
     "E",
     "E",
     "A",
     "D",
     "E",
     "C#",
     "F#m",
     "B",
     "E7",
     "E",
     "A",
     "D",
     "E",
     "C#",
     "F#m",
     "B",
     "E",
     "A"
    ],
    "per": 0.5,
    "bars": 9
   },
   {
    "section": "Chorus (repeat)",
    "chords": [
     "D",
     "E",
     "C#",
     "F#m",
     "B",
     "E7",
     "E",
     "A",
     "D",
     "E",
     "C#",
     "F#m",
     "B",
     "E",
     "A",
     "A"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Outro",
    "chords": [
     "A",
     "D",
     "E",
     "F#m"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Ending",
    "chords": [
     "D"
    ],
    "bars": 4
   }
  ]
 },
 "Plastic Love": {
  "status": "corrected",
  "key": "D minor",
  "bpm": 103,
  "beatsPerBar": 4,
  "durationSec": 294,
  "chords": [
   "Gm9",
   "C7b9",
   "Am7",
   "Dm7"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "Bbmaj7",
     "Fmaj7/A",
     "Gm9",
     "Eb9",
     "Bbmaj7",
     "Am7",
     "Gm9",
     "Dm7"
    ],
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "Gm9",
     "C7b9",
     "Am7",
     "Dm7",
     "Gm9",
     "C7b9",
     "Am7",
     "Dm7",
     "Gm9",
     "Eb9",
     "Dm7",
     "G9",
     "Gm9",
     "C7b9",
     "Dm7",
     "Dm7"
    ],
    "bars": 16
   },
   {
    "section": "Verse 2",
    "chords": [
     "Gm9",
     "C7b9",
     "Am7",
     "Dm7",
     "Gm9",
     "C7b9",
     "Am7",
     "Dm7",
     "Gm9",
     "Eb9",
     "Dm7",
     "G9",
     "Gm9",
     "C7b9",
     "Dm7",
     "Dm7"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "Bbmaj7",
     "C",
     "Bbmaj7",
     "C",
     "Em7",
     "A7",
     "Dm7",
     "Dm7",
     "Bbmaj7",
     "C",
     "Am7",
     "Dm7",
     "Bbmaj7",
     "C",
     "Am7",
     "D7"
    ],
    "bars": 16
   },
   {
    "section": "Guitar solo",
    "chords": [
     "Gm9",
     "Eb9",
     "Dm7",
     "G9",
     "Bbmaj7",
     "C7b9",
     "Dm7",
     "D7"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "Bbmaj7",
     "C",
     "Bbmaj7",
     "C",
     "Em7",
     "A7",
     "Dm7",
     "Dm7",
     "Bbmaj7",
     "C",
     "Am7",
     "Dm7",
     "Bbmaj7",
     "C",
     "Am7",
     "D7"
    ],
    "bars": 16
   },
   {
    "section": "Verse 3",
    "chords": [
     "Gm9",
     "C7b9",
     "Am7",
     "Dm7",
     "Gm9",
     "C7b9",
     "Am7",
     "Dm7",
     "Gm9",
     "Eb9",
     "Dm7",
     "G9",
     "Gm9",
     "C7b9",
     "Dm7",
     "Dm7"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "Bbmaj7",
     "C",
     "Bbmaj7",
     "C",
     "Em7",
     "A7",
     "Dm7",
     "Dm7",
     "Bbmaj7",
     "C",
     "Am7",
     "Dm7",
     "Bbmaj7",
     "C",
     "Am7",
     "D7"
    ],
    "bars": 16
   },
   {
    "section": "Outro (fade)",
    "chords": [
     "Gm9",
     "C7b9",
     "Am7",
     "Dm7"
    ],
    "bars": 16
   }
  ],
  "solos": [
   {
    "section": "Guitar solo",
    "scale": "D minor pentatonic, box 1 at 10th fret (or 5th-fret A-shape box); add E (D Dorian) over Gm9 and Eb over Eb9",
    "tips": "Target the chord tones: land on F or A over Dm7 and on D over Bbmaj7. Keep phrases short and leave space - this is a laid-back city-pop groove.",
    "chords": [
     "Gm9",
     "Eb9",
     "Dm7",
     "G9",
     "Bbmaj7",
     "C7b9",
     "Dm7",
     "D7"
    ]
   }
  ]
 },
 "Spring Day": {
  "status": "corrected",
  "key": "Eb major",
  "capoNote": "Capo 1, D shapes (D F#m Bm G)",
  "bpm": 107,
  "beatsPerBar": 4,
  "durationSec": 274,
  "chords": [
   "Eb",
   "Gm",
   "Cm",
   "Ab"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "Eb",
     "Gm",
     "Cm",
     "Ab"
    ],
    "bars": 4
   },
   {
    "section": "Verse 1 (rap)",
    "chords": [
     "Eb",
     "Gm",
     "Cm",
     "Ab"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2 (rap)",
    "chords": [
     "Eb",
     "Gm",
     "Cm",
     "Ab"
    ],
    "bars": 8
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Eb",
     "Gm",
     "Cm",
     "Ab"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "Eb",
     "Gm",
     "Cm",
     "Ab",
     "Cm",
     "Gm",
     "Ab",
     "Abm"
    ],
    "bars": 16
   },
   {
    "section": "Interlude",
    "chords": [
     "Eb",
     "Gm",
     "Cm",
     "Ab",
     "Cm",
     "Gm",
     "Ab",
     "Abm"
    ],
    "bars": 8
   },
   {
    "section": "Verse 3 (rap)",
    "chords": [
     "Eb",
     "Gm",
     "Cm",
     "Ab"
    ],
    "bars": 8
   },
   {
    "section": "Verse 4 (rap)",
    "chords": [
     "Eb",
     "Gm",
     "Cm",
     "Ab"
    ],
    "bars": 8
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Eb",
     "Gm",
     "Cm",
     "Ab"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "Eb",
     "Gm",
     "Cm",
     "Ab",
     "Cm",
     "Gm",
     "Ab",
     "Abm"
    ],
    "bars": 16
   },
   {
    "section": "Bridge",
    "chords": [
     "Ab",
     "Bb",
     "Gm",
     "Cm",
     "Ab",
     "Bb",
     "Gm",
     "Bb"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "Eb",
     "Gm",
     "Cm",
     "Ab",
     "Cm",
     "Gm",
     "Ab",
     "Abm"
    ],
    "bars": 16
   },
   {
    "section": "Outro",
    "chords": [
     "Eb",
     "Gm",
     "Cm",
     "Ab",
     "Cm",
     "Gm",
     "Ab",
     "Abm"
    ],
    "bars": 8
   }
  ]
 },
 "Love Scenario": {
  "status": "verified",
  "key": "E minor",
  "bpm": 118,
  "beatsPerBar": 4,
  "durationSec": 210,
  "chords": [
   "C",
   "D",
   "Bm",
   "Em"
  ],
  "structure": [
   {
    "section": "Intro (chorus hook)",
    "chords": [
     "Cmaj7",
     "D",
     "Bm7",
     "Em7"
    ],
    "bars": 8
   },
   {
    "section": "Verse 1 (rap)",
    "chords": [
     "Cmaj7",
     "D",
     "Bm7",
     "Em7"
    ],
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Cmaj7",
     "D",
     "Bm7",
     "Em7"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "Cmaj7",
     "D",
     "Bm7",
     "Em7"
    ],
    "bars": 16
   },
   {
    "section": "Verse 2 (rap)",
    "chords": [
     "Cmaj7",
     "D",
     "Bm7",
     "Em7"
    ],
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Cmaj7",
     "D",
     "Bm7",
     "Em7"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "Cmaj7",
     "D",
     "Bm7",
     "Em7"
    ],
    "bars": 16
   },
   {
    "section": "Bridge",
    "chords": [
     "Cmaj7",
     "D",
     "Bm7",
     "Em7"
    ],
    "bars": 8
   },
   {
    "section": "Chorus / Outro",
    "chords": [
     "Cmaj7",
     "D",
     "Bm7",
     "Em7"
    ],
    "bars": 8
   }
  ]
 },
 "Through the Night": {
  "status": "corrected",
  "key": "Eb major",
  "capoNote": "Capo 1, D shapes (G A F#m Bm)",
  "bpm": 79,
  "beatsPerBar": 4,
  "durationSec": 253,
  "chords": [
   "Ab",
   "Bb",
   "Gm",
   "Cm"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "Ab",
     "Bb",
     "Gm",
     "Cm"
    ],
    "bars": 4
   },
   {
    "section": "Verse 1",
    "chords": [
     "Ab",
     "Bb",
     "Gm",
     "Cm",
     "Ab",
     "Bb",
     "Gm",
     "Gm",
     "C",
     "Fm",
     "Abm",
     "Eb",
     "Eb",
     "Ab",
     "Eb",
     "Ab",
     "Ab",
     "Bb",
     "Gm",
     "Cm",
     "Ab",
     "Bb",
     "Gm",
     "Gm",
     "C",
     "Fm",
     "Abm",
     "Eb",
     "Ab",
     "Ab",
     "Gm",
     "Fm",
     "Eb",
     "Eb",
     "Fm",
     "Gm"
    ],
    "per": 0.5,
    "bars": 18
   },
   {
    "section": "Chorus",
    "chords": [
     "Ab",
     "Abm",
     "Gm",
     "Cm",
     "Fm",
     "Fm",
     "G",
     "G",
     "Cm",
     "Bb",
     "Eb",
     "Eb",
     "Ab",
     "Ab",
     "Abm",
     "Abm",
     "Bb",
     "C",
     "Fm",
     "Abm",
     "Ab",
     "Abm",
     "Eb",
     "Db",
     "Ab",
     "Bb",
     "Eb",
     "Eb"
    ],
    "per": 0.5,
    "bars": 14
   },
   {
    "section": "Verse 2 (short)",
    "chords": [
     "Ab",
     "Bb",
     "Gm",
     "Cm",
     "Ab",
     "Bb",
     "Gm",
     "Gm",
     "C",
     "Fm",
     "Abm",
     "Eb",
     "Eb",
     "Ab",
     "Eb",
     "Ab",
     "Ab",
     "Bb"
    ],
    "per": 0.5,
    "bars": 9
   },
   {
    "section": "Chorus",
    "chords": [
     "Ab",
     "Abm",
     "Gm",
     "Cm",
     "Fm",
     "Fm",
     "G",
     "G",
     "Cm",
     "Bb",
     "Eb",
     "Eb",
     "Ab",
     "Ab",
     "Abm",
     "Abm",
     "Bb",
     "C",
     "Fm",
     "Abm",
     "Ab",
     "Abm",
     "Eb",
     "Db",
     "Ab",
     "Bb",
     "Eb",
     "Eb"
    ],
    "per": 0.5,
    "bars": 14
   },
   {
    "section": "Bridge",
    "chords": [
     "B",
     "Gb",
     "Abm",
     "Db",
     "Bbm",
     "Bbm",
     "Fm",
     "Eb",
     "Abm",
     "Abm",
     "Bb",
     "Bb"
    ],
    "per": 0.5,
    "bars": 6
   },
   {
    "section": "Chorus",
    "chords": [
     "Ab",
     "Abm",
     "Gm",
     "Cm",
     "Fm",
     "Fm",
     "G",
     "G",
     "Cm",
     "Bb",
     "Eb",
     "Eb",
     "Ab",
     "Ab",
     "Abm",
     "Abm",
     "Bb",
     "C",
     "Fm",
     "Abm",
     "Ab",
     "Abm",
     "Eb",
     "Db",
     "Ab",
     "Bb",
     "Eb",
     "Eb"
    ],
    "per": 0.5,
    "bars": 14
   },
   {
    "section": "Outro (verse reprise)",
    "chords": [
     "Ab",
     "Bb",
     "Gm",
     "Cm",
     "Ab",
     "Bb",
     "Gm",
     "Gm",
     "C",
     "Fm",
     "Abm",
     "Eb"
    ],
    "per": 0.5,
    "bars": 6
   }
  ]
 },
 "Stay With Me": {
  "status": "corrected",
  "key": "C minor",
  "capoNote": "Capo 1, Bm shapes (Bm G D A)",
  "bpm": 125,
  "beatsPerBar": 4,
  "durationSec": 192,
  "chords": [
   "Cm",
   "Ab",
   "Eb",
   "Bb"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "Cm",
     "Ab",
     "Eb",
     "Bb"
    ],
    "bars": 4
   },
   {
    "section": "Chorus",
    "chords": [
     "Cm",
     "Ab",
     "Eb",
     "Bb"
    ],
    "bars": 16
   },
   {
    "section": "Verse 1 (rap)",
    "chords": [
     "Cm",
     "Ab",
     "Eb",
     "Bb"
    ],
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Cm",
     "Ab",
     "Eb",
     "Bb"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "Cm",
     "Ab",
     "Eb",
     "Bb"
    ],
    "bars": 16
   },
   {
    "section": "Interlude",
    "chords": [
     "Cm",
     "Ab",
     "Eb",
     "Bb"
    ],
    "bars": 4
   },
   {
    "section": "Verse 2",
    "chords": [
     "Cm",
     "Ab",
     "Eb",
     "Bb"
    ],
    "bars": 8
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Cm",
     "Ab",
     "Eb",
     "Bb"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "Cm",
     "Ab",
     "Eb",
     "Bb"
    ],
    "bars": 16
   },
   {
    "section": "Outro",
    "chords": [
     "Cm",
     "Ab",
     "Eb",
     "Bb"
    ],
    "bars": 4
   }
  ]
 },
 "Eight": {
  "status": "corrected",
  "key": "Db major",
  "capoNote": "Capo 1, C shapes (F C Am G)",
  "bpm": 120,
  "beatsPerBar": 4,
  "durationSec": 168,
  "chords": [
   "Gb",
   "Db",
   "Bbm",
   "Ab"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "Gb",
     "Db",
     "Bbm",
     "Ab"
    ],
    "bars": 4
   },
   {
    "section": "Verse 1",
    "chords": [
     "Gb",
     "Db",
     "Bbm",
     "Ab"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "Gb",
     "Db",
     "Bbm",
     "Ab"
    ],
    "bars": 16
   },
   {
    "section": "Verse 2 (SUGA rap)",
    "chords": [
     "Gb",
     "Db",
     "Bbm",
     "Ab"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "Gb",
     "Db",
     "Bbm",
     "Ab"
    ],
    "bars": 16
   },
   {
    "section": "Bridge",
    "chords": [
     "Gb",
     "Db",
     "Bbm",
     "Ab"
    ],
    "bars": 8
   },
   {
    "section": "Outro",
    "chords": [
     "Gb",
     "Db",
     "Bbm",
     "Ab"
    ],
    "bars": 8
   }
  ]
 },
 "The Moon Represents My Heart (Yuèliàng Dàibiǎo Wǒ de Xīn)": {
  "status": "corrected",
  "key": "Db major",
  "capoNote": "Capo 1, C shapes (C Em F Am Dm G)",
  "bpm": 78,
  "beatsPerBar": 4,
  "durationSec": 211,
  "chords": [
   "Db",
   "Fm",
   "Gb",
   "Bbm",
   "Ebm",
   "Ab"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "Db",
     "Bbm",
     "Gb",
     "Ab"
    ],
    "bars": 4
   },
   {
    "section": "Verse A1",
    "chords": [
     "Db",
     "Fm",
     "Gb",
     "Db",
     "Bbm",
     "Gb",
     "Ebm",
     "Ab"
    ],
    "bars": 8
   },
   {
    "section": "Verse A2",
    "chords": [
     "Db",
     "Db",
     "Fm",
     "Fm",
     "Gb",
     "Gb",
     "Db",
     "Db",
     "Bbm",
     "Bbm",
     "Gb",
     "Gb",
     "Ebm",
     "Ab",
     "Db",
     "Db"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Bridge B",
    "chords": [
     "Db",
     "Db",
     "Fm",
     "Fm",
     "Gb",
     "Ab",
     "Db",
     "Db",
     "Db",
     "Db",
     "Fm",
     "Fm",
     "Ebm",
     "Ebm",
     "Ab",
     "Ab"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Verse A3",
    "chords": [
     "Db",
     "Db",
     "Fm",
     "Fm",
     "Gb",
     "Gb",
     "Db",
     "Db",
     "Bbm",
     "Bbm",
     "Gb",
     "Gb",
     "Ebm",
     "Ab",
     "Db",
     "Db"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Interlude (instrumental A)",
    "chords": [
     "Db",
     "Db",
     "Fm",
     "Fm",
     "Gb",
     "Gb",
     "Db",
     "Db",
     "Bbm",
     "Bbm",
     "Gb",
     "Gb",
     "Ebm",
     "Ab",
     "Db",
     "Db"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Bridge B",
    "chords": [
     "Db",
     "Db",
     "Fm",
     "Fm",
     "Gb",
     "Ab",
     "Db",
     "Db",
     "Db",
     "Db",
     "Fm",
     "Fm",
     "Ebm",
     "Ebm",
     "Ab",
     "Ab"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Verse A4",
    "chords": [
     "Db",
     "Db",
     "Fm",
     "Fm",
     "Gb",
     "Gb",
     "Db",
     "Db",
     "Bbm",
     "Bbm",
     "Gb",
     "Gb",
     "Ebm",
     "Ab",
     "Db",
     "Db"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Tag",
    "chords": [
     "Bbm",
     "Gb",
     "Ebm",
     "Ab"
    ],
    "bars": 4
   },
   {
    "section": "Outro",
    "chords": [
     "Bbm",
     "Gb",
     "Ab",
     "Db"
    ],
    "bars": 4
   }
  ]
 },
 "Tián Mì Mì": {
  "status": "corrected",
  "key": "D major",
  "bpm": 127,
  "beatsPerBar": 4,
  "durationSec": 212,
  "chords": [
   "D",
   "Em",
   "A",
   "Bm"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "D",
     "A",
     "D",
     "D"
    ],
    "bars": 4
   },
   {
    "section": "Verse A",
    "chords": [
     "D",
     "A",
     "D",
     "D",
     "D",
     "D",
     "Em",
     "D",
     "Em",
     "A",
     "D",
     "D",
     "Bm",
     "A",
     "A7",
     "A7"
    ],
    "bars": 16
   },
   {
    "section": "Verse B",
    "chords": [
     "D",
     "D",
     "Em",
     "D",
     "Em",
     "A",
     "D",
     "D",
     "Em",
     "D",
     "D",
     "D",
     "D",
     "A",
     "D",
     "D"
    ],
    "bars": 16
   },
   {
    "section": "Bridge C",
    "chords": [
     "Bm",
     "D",
     "Bm",
     "D",
     "A",
     "A7",
     "A",
     "A7"
    ],
    "bars": 8
   },
   {
    "section": "Verse B",
    "chords": [
     "D",
     "D",
     "Em",
     "D",
     "Em",
     "A",
     "D",
     "D",
     "Em",
     "D",
     "D",
     "D",
     "D",
     "A",
     "D",
     "D"
    ],
    "bars": 16
   },
   {
    "section": "Verse A",
    "chords": [
     "D",
     "A",
     "D",
     "D",
     "D",
     "D",
     "Em",
     "D",
     "Em",
     "A",
     "D",
     "D",
     "Bm",
     "A",
     "A7",
     "A7"
    ],
    "bars": 16
   },
   {
    "section": "Verse B",
    "chords": [
     "D",
     "D",
     "Em",
     "D",
     "Em",
     "A",
     "D",
     "D",
     "Em",
     "D",
     "D",
     "D",
     "D",
     "A",
     "D",
     "D"
    ],
    "bars": 16
   },
   {
    "section": "Bridge C",
    "chords": [
     "Bm",
     "D",
     "Bm",
     "D",
     "A",
     "A7",
     "A",
     "A7"
    ],
    "bars": 8
   },
   {
    "section": "Verse B (ending)",
    "chords": [
     "D",
     "D",
     "Em",
     "D",
     "Em",
     "A",
     "D",
     "D",
     "Em",
     "D",
     "D",
     "D",
     "D",
     "A",
     "D",
     "D"
    ],
    "bars": 16
   }
  ]
 },
 "Sunny Day (Qíng Tiān)": {
  "status": "corrected",
  "key": "G major",
  "bpm": 68.5,
  "beatsPerBar": 4,
  "durationSec": 270,
  "chords": [
   "Em7",
   "Cadd9",
   "G",
   "D/F#"
  ],
  "structure": [
   {
    "section": "Intro (guitar riff)",
    "chords": [
     "Em7",
     "Cadd9",
     "G",
     "D/F#"
    ],
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "Em7",
     "Cadd9",
     "G",
     "D/F#"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "Em7",
     "Cadd9",
     "G",
     "D/F#"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "G",
     "G",
     "Em",
     "Em",
     "C",
     "G",
     "B7",
     "Em",
     "C",
     "D",
     "G",
     "Em",
     "C",
     "G",
     "B7",
     "Em",
     "C",
     "D",
     "G",
     "G"
    ],
    "per": 0.5,
    "bars": 10
   },
   {
    "section": "Interlude",
    "chords": [
     "Cadd9",
     "D/F#"
    ],
    "bars": 2
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Em7",
     "Cadd9",
     "G",
     "D/F#"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "G",
     "G",
     "Em",
     "Em",
     "C",
     "G",
     "B7",
     "Em",
     "C",
     "D",
     "G",
     "Em",
     "C",
     "G",
     "B7",
     "Em",
     "C",
     "D",
     "G",
     "G"
    ],
    "per": 0.5,
    "bars": 10
   },
   {
    "section": "Guitar solo",
    "chords": [
     "G",
     "G",
     "Em",
     "Em",
     "C",
     "G",
     "B7",
     "Em",
     "C",
     "D",
     "G",
     "Em",
     "C",
     "G",
     "B7",
     "Em",
     "C",
     "D",
     "G",
     "G"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "G",
     "G",
     "Em",
     "Em",
     "C",
     "G",
     "B7",
     "Em",
     "C",
     "D",
     "G",
     "Em",
     "C",
     "G",
     "B7",
     "Em",
     "C",
     "D",
     "G",
     "G"
    ],
    "per": 0.5,
    "bars": 10
   },
   {
    "section": "Outro",
    "chords": [
     "G",
     "Cadd9",
     "D/F#",
     "D/F#"
    ],
    "bars": 4
   }
  ],
  "solos": [
   {
    "section": "Guitar solo",
    "scale": "G major pentatonic (E minor pentatonic box 1 at 12th fret / open position), adding C and F# from G major; aim for B over B7",
    "tips": "Land on chord tones (G, B, D) on the first beat of each chord change. Over the B7 chord, play D# as a passing note to give the same pull to Em the recording has.",
    "chords": [
     "G",
     "G",
     "Em",
     "Em",
     "C",
     "G",
     "B7",
     "Em",
     "C",
     "D",
     "G",
     "Em",
     "C",
     "G",
     "B7",
     "Em",
     "C",
     "D",
     "G",
     "G"
    ]
   }
  ]
 },
 "Fairy Tale (Tóng Huà)": {
  "status": "corrected",
  "key": "F# major",
  "capoNote": "Capo 6, C shapes (C Am F G)",
  "bpm": 68,
  "beatsPerBar": 4,
  "durationSec": 245,
  "chords": [
   "F#",
   "D#m",
   "B",
   "C#"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "F#",
     "D#m",
     "B",
     "C#"
    ],
    "bars": 4
   },
   {
    "section": "Verse 1",
    "chords": [
     "F#",
     "D#m",
     "B",
     "C#",
     "F#",
     "D#m",
     "B",
     "C#"
    ],
    "bars": 8
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "A#m",
     "D#m",
     "B",
     "C#",
     "A#m",
     "D#m",
     "B",
     "C#"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "F#",
     "F#",
     "A#m",
     "A#m",
     "D#m",
     "F#",
     "B",
     "B",
     "C#",
     "F#7",
     "B",
     "B",
     "C#",
     "C#",
     "F#",
     "D#m",
     "B",
     "C#",
     "F#",
     "F#"
    ],
    "per": 0.5,
    "bars": 10
   },
   {
    "section": "Interlude",
    "chords": [
     "F#",
     "D#m",
     "B",
     "C#"
    ],
    "bars": 4
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "A#m",
     "D#m",
     "B",
     "C#",
     "A#m",
     "D#m",
     "B",
     "C#"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "F#",
     "F#",
     "A#m",
     "A#m",
     "D#m",
     "F#",
     "B",
     "B",
     "C#",
     "F#7",
     "B",
     "B",
     "C#",
     "C#",
     "F#",
     "D#m",
     "B",
     "C#",
     "F#",
     "F#"
    ],
    "per": 0.5,
    "bars": 10
   },
   {
    "section": "Chorus",
    "chords": [
     "F#",
     "F#",
     "A#m",
     "A#m",
     "D#m",
     "F#",
     "B",
     "B",
     "C#",
     "F#7",
     "B",
     "B",
     "C#",
     "C#",
     "F#",
     "D#m",
     "B",
     "C#",
     "F#",
     "F#"
    ],
    "per": 0.5,
    "bars": 10
   },
   {
    "section": "Outro",
    "chords": [
     "D#m",
     "B",
     "C#",
     "F#"
    ],
    "bars": 4
   }
  ]
 },
 "Mouse Loves Rice (Lǎoshǔ Ài Dàmǐ)": {
  "status": "uncertain",
  "key": "F major (modulates up to F# then G)",
  "bpm": 144,
  "beatsPerBar": 4,
  "durationSec": 277,
  "chords": [
   "F",
   "Dm",
   "Bb",
   "C"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "F",
     "Dm",
     "F",
     "Am",
     "Bb",
     "Am",
     "Gm",
     "C"
    ],
    "bars": 8
   },
   {
    "section": "Verse A",
    "chords": [
     "F",
     "C",
     "F",
     "Bb",
     "F",
     "Dm",
     "Gm",
     "C",
     "F",
     "C",
     "Dm",
     "Am",
     "Bb",
     "C",
     "F",
     "F"
    ],
    "bars": 16
   },
   {
    "section": "Verse B",
    "chords": [
     "Am",
     "Dm",
     "Bb",
     "C",
     "F",
     "F",
     "Am",
     "Dm",
     "Gm",
     "C",
     "Am",
     "Dm",
     "Bb",
     "C",
     "Gm",
     "C"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "F",
     "Dm",
     "F",
     "Am",
     "Bb",
     "Am",
     "Gm",
     "C",
     "F",
     "Dm",
     "F",
     "Am",
     "Bb",
     "Am",
     "Gm",
     "C"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "F",
     "Dm",
     "F",
     "Am",
     "Bb",
     "Am",
     "Gm",
     "C",
     "F",
     "Dm",
     "F",
     "Am",
     "Bb",
     "Am",
     "Gm",
     "C"
    ],
    "bars": 16
   },
   {
    "section": "Interlude",
    "chords": [
     "F",
     "Dm",
     "F",
     "Am",
     "Bb",
     "Am",
     "Gm",
     "C"
    ],
    "bars": 8
   },
   {
    "section": "Verse A (up a half step)",
    "chords": [
     "F#",
     "C#",
     "F#",
     "B",
     "F#",
     "D#m",
     "G#m",
     "C#",
     "F#",
     "C#",
     "D#m",
     "A#m",
     "B",
     "C#",
     "F#",
     "F#"
    ],
    "bars": 16
   },
   {
    "section": "Verse B (up a half step)",
    "chords": [
     "A#m",
     "D#m",
     "B",
     "C#",
     "F#",
     "F#",
     "A#m",
     "D#m",
     "G#m",
     "C#",
     "A#m",
     "D#m",
     "B",
     "C#",
     "G#m",
     "C#"
    ],
    "bars": 16
   },
   {
    "section": "Chorus (up a half step)",
    "chords": [
     "F#",
     "D#m",
     "F#",
     "A#m",
     "B",
     "A#m",
     "G#m",
     "C#",
     "F#",
     "D#m",
     "F#",
     "A#m",
     "B",
     "A#m",
     "G#m",
     "C#"
    ],
    "bars": 16
   },
   {
    "section": "Chorus (up a whole step, G)",
    "chords": [
     "G",
     "Em",
     "G",
     "Bm",
     "C",
     "Bm",
     "Am",
     "D",
     "G",
     "Em",
     "G",
     "Bm",
     "C",
     "Bm",
     "Am",
     "D"
    ],
    "bars": 16
   },
   {
    "section": "Chorus (G)",
    "chords": [
     "G",
     "Em",
     "G",
     "Bm",
     "C",
     "Bm",
     "Am",
     "D",
     "G",
     "Em",
     "G",
     "Bm",
     "C",
     "Bm",
     "Am",
     "D"
    ],
    "bars": 16
   },
   {
    "section": "Ending",
    "chords": [
     "G"
    ],
    "bars": 4
   }
  ]
 },
 "Tamally Maak": {
  "status": "uncertain",
  "key": "C minor",
  "capoNote": "Capo 3, Am shapes (Am Dm G C E)",
  "bpm": 84,
  "beatsPerBar": 4,
  "durationSec": 269,
  "chords": [
   "Cm",
   "Fm",
   "Bb",
   "Eb",
   "G"
  ],
  "structure": [
   {
    "section": "Intro (guitar)",
    "chords": [
     "Cm",
     "Eb",
     "Bb",
     "Fm",
     "Cm",
     "Cm",
     "G",
     "Eb",
     "Bb",
     "Fm",
     "Cm",
     "Cm"
    ],
    "bars": 12
   },
   {
    "section": "Verse 1",
    "chords": [
     "Cm",
     "Fm",
     "Bb",
     "Ebmaj7"
    ],
    "bars": 8
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Cm",
     "Fm",
     "Bb",
     "G"
    ],
    "bars": 4
   },
   {
    "section": "Chorus",
    "chords": [
     "Eb",
     "Bb",
     "Fm",
     "Fm",
     "Ab",
     "Ab",
     "Cm",
     "Cm",
     "Cm",
     "G",
     "Fm",
     "Fm",
     "Fm",
     "Cm",
     "G",
     "Bb"
    ],
    "bars": 16
   },
   {
    "section": "Guitar solo",
    "chords": [
     "Eb",
     "Bb",
     "Fm",
     "G",
     "G",
     "Bb",
     "Fm",
     "Cm"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "Cm",
     "Fm",
     "Bb",
     "Ebmaj7"
    ],
    "bars": 8
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Cm",
     "Fm",
     "Bb",
     "G"
    ],
    "bars": 4
   },
   {
    "section": "Chorus",
    "chords": [
     "Eb",
     "Bb",
     "Fm",
     "Fm",
     "Ab",
     "Ab",
     "Cm",
     "Cm",
     "Cm",
     "G",
     "Fm",
     "Fm",
     "Fm",
     "Cm",
     "G",
     "Bb"
    ],
    "bars": 16
   },
   {
    "section": "Chorus (repeat)",
    "chords": [
     "Eb",
     "Bb",
     "Fm",
     "Fm",
     "Ab",
     "Ab",
     "Cm",
     "Cm",
     "Cm",
     "G",
     "Fm",
     "Fm",
     "Fm",
     "Cm",
     "G",
     "Bb"
    ],
    "bars": 16
   }
  ],
  "solos": [
   {
    "section": "Guitar solo",
    "scale": "C harmonic minor (G major chord uses B natural); C minor pentatonic box 1 at the 8th fret as a safe base",
    "tips": "Use B natural (not Bb) when the backing hits G major; it gives the Arabic-Spanish flavour of the recording. Play slowly with nylon-string style rest strokes and slide into target notes.",
    "chords": [
     "Eb",
     "Bb",
     "Fm",
     "G",
     "G",
     "Bb",
     "Fm",
     "Cm"
    ]
   }
  ]
 },
 "Habibi Ya Nour El Ein": {
  "status": "corrected",
  "key": "C minor",
  "bpm": 100,
  "beatsPerBar": 4,
  "durationSec": 308,
  "chords": [
   "Cm",
   "G",
   "Fm",
   "G"
  ],
  "structure": [
   {
    "section": "Intro (instrumental)",
    "chords": [
     "Cm",
     "G",
     "Fm",
     "Cm",
     "Cm",
     "Bb",
     "Ab",
     "G"
    ],
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "Cm",
     "Cm",
     "Fm",
     "G"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "Cm",
     "G",
     "Fm",
     "G"
    ],
    "bars": 16
   },
   {
    "section": "Instrumental",
    "chords": [
     "Cm",
     "G",
     "Fm",
     "Cm",
     "Cm",
     "Bb",
     "Ab",
     "G"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "Cm",
     "Cm",
     "Cm",
     "Cm",
     "Bb",
     "D/F#",
     "G",
     "G",
     "Cm",
     "Cm",
     "Cm",
     "Cm",
     "Bb",
     "D/F#",
     "G",
     "G",
     "Fm",
     "G",
     "Fm",
     "G",
     "Fm",
     "G",
     "Fm",
     "G",
     "Cm",
     "Cm",
     "G",
     "G"
    ],
    "per": 0.5,
    "bars": 14
   },
   {
    "section": "Chorus",
    "chords": [
     "Cm",
     "G",
     "Fm",
     "G"
    ],
    "bars": 16
   },
   {
    "section": "Verse 3",
    "chords": [
     "Cm",
     "Cm",
     "Fm",
     "G"
    ],
    "bars": 8
   },
   {
    "section": "Instrumental",
    "chords": [
     "Cm",
     "G",
     "Fm",
     "Cm",
     "Cm",
     "Bb",
     "Ab",
     "G"
    ],
    "bars": 8
   },
   {
    "section": "Verse 4",
    "chords": [
     "Cm",
     "Cm",
     "Cm",
     "Cm",
     "Bb",
     "D/F#",
     "G",
     "G",
     "Cm",
     "Cm",
     "Cm",
     "Cm",
     "Bb",
     "D/F#",
     "G",
     "G",
     "Fm",
     "G",
     "Fm",
     "G",
     "Fm",
     "G",
     "Fm",
     "G",
     "Cm",
     "Cm",
     "G",
     "G"
    ],
    "per": 0.5,
    "bars": 14
   },
   {
    "section": "Chorus",
    "chords": [
     "Cm",
     "G",
     "Fm",
     "G"
    ],
    "bars": 16
   },
   {
    "section": "Outro",
    "chords": [
     "Cm",
     "G",
     "Fm",
     "G"
    ],
    "bars": 4
   }
  ]
 },
 "Ya Lili": {
  "status": "uncertain",
  "key": "G minor",
  "bpm": 92,
  "beatsPerBar": 4,
  "durationSec": 201,
  "chords": [
   "Gm",
   "F",
   "Eb",
   "D"
  ],
  "structure": [
   {
    "section": "Intro (hook)",
    "chords": [
     "Gm",
     "F",
     "Eb",
     "D"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "Gm",
     "F",
     "Eb",
     "D"
    ],
    "bars": 16
   },
   {
    "section": "Verse 1 (rap)",
    "chords": [
     "Gm",
     "F",
     "Eb",
     "D"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "Gm",
     "F",
     "Eb",
     "D"
    ],
    "bars": 16
   },
   {
    "section": "Verse 2 (Hamouda)",
    "chords": [
     "Gm",
     "F",
     "Eb",
     "D"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "Gm",
     "F",
     "Eb",
     "D"
    ],
    "bars": 16
   }
  ]
 },
 "Ya Rayah": {
  "status": "uncertain",
  "key": "C# minor",
  "capoNote": "Capo 4, Am shapes (Am E Dm A G)",
  "bpm": 101,
  "beatsPerBar": 4,
  "durationSec": 373,
  "chords": [
   "C#m",
   "G#",
   "F#m",
   "C#",
   "B"
  ],
  "structure": [
   {
    "section": "Intro (instrumental)",
    "chords": [
     "C#m",
     "C#m",
     "G#",
     "G#",
     "F#m",
     "G#",
     "C#m",
     "C#m"
    ],
    "bars": 16
   },
   {
    "section": "Refrain",
    "chords": [
     "C#m",
     "C#m",
     "G#",
     "G#",
     "F#m",
     "G#",
     "C#m",
     "C#m"
    ],
    "bars": 16
   },
   {
    "section": "Verse 1",
    "chords": [
     "C#m",
     "C#",
     "F#m",
     "F#m",
     "B",
     "G#",
     "C#m",
     "C#m"
    ],
    "bars": 16
   },
   {
    "section": "Refrain",
    "chords": [
     "C#m",
     "C#m",
     "G#",
     "G#",
     "F#m",
     "G#",
     "C#m",
     "C#m"
    ],
    "bars": 16
   },
   {
    "section": "Instrumental",
    "chords": [
     "C#m",
     "C#m",
     "G#",
     "G#",
     "F#m",
     "G#",
     "C#m",
     "C#m"
    ],
    "bars": 16
   },
   {
    "section": "Verse 2",
    "chords": [
     "C#m",
     "C#",
     "F#m",
     "F#m",
     "B",
     "G#",
     "C#m",
     "C#m"
    ],
    "bars": 16
   },
   {
    "section": "Refrain",
    "chords": [
     "C#m",
     "C#m",
     "G#",
     "G#",
     "F#m",
     "G#",
     "C#m",
     "C#m"
    ],
    "bars": 16
   },
   {
    "section": "Instrumental",
    "chords": [
     "C#m",
     "C#m",
     "G#",
     "G#",
     "F#m",
     "G#",
     "C#m",
     "C#m"
    ],
    "bars": 16
   },
   {
    "section": "Verse 3",
    "chords": [
     "C#m",
     "C#",
     "F#m",
     "F#m",
     "B",
     "G#",
     "C#m",
     "C#m"
    ],
    "bars": 16
   },
   {
    "section": "Refrain / Outro",
    "chords": [
     "C#m",
     "C#m",
     "G#",
     "G#",
     "F#m",
     "G#",
     "C#m",
     "C#m"
    ],
    "bars": 16
   }
  ]
 },
 "Lamma Bada Yatathanna": {
  "status": "uncertain",
  "key": "Eb minor",
  "bpm": 88,
  "beatsPerBar": 4,
  "durationSec": 146,
  "chords": [
   "Ebm",
   "Abm",
   "Gb7",
   "Bb7"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "Ebm",
     "Abm",
     "Bb7",
     "Ebm"
    ],
    "bars": 4
   },
   {
    "section": "Verse 1",
    "chords": [
     "Ebm",
     "Abm",
     "Gb7",
     "Bb7",
     "Ebm",
     "Ebm",
     "Abm",
     "Gb7",
     "Bb7",
     "Ebm"
    ],
    "bars": 10
   },
   {
    "section": "Refrain",
    "chords": [
     "Abm",
     "Gb",
     "Bb7",
     "Ebm",
     "Bb7",
     "B",
     "Ebm",
     "Ebm"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "Ebm",
     "Abm",
     "Gb7",
     "Bb7",
     "Ebm",
     "Ebm",
     "Abm",
     "Gb7",
     "Bb7",
     "Ebm"
    ],
    "bars": 10
   },
   {
    "section": "Refrain",
    "chords": [
     "Abm",
     "Gb",
     "Bb7",
     "Ebm",
     "Bb7",
     "B",
     "Ebm",
     "Ebm"
    ],
    "bars": 8
   },
   {
    "section": "Middle section",
    "chords": [
     "Gb",
     "Gb",
     "Bb7",
     "Bb7",
     "Ebm",
     "Gb",
     "Abm",
     "Bb7"
    ],
    "bars": 8
   },
   {
    "section": "Final refrain / Outro",
    "chords": [
     "Abm",
     "Gb",
     "Bb7",
     "Ebm",
     "Bb7",
     "B",
     "Ebm",
     "Ebm"
    ],
    "bars": 6
   }
  ]
 },
 "Enter Sandman": {
  "status": "corrected",
  "key": "E minor",
  "bpm": 123,
  "beatsPerBar": 4,
  "durationSec": 331,
  "chords": [
   "E5",
   "G5",
   "F#5",
   "B5"
  ],
  "structure": [
   {
    "section": "Intro (clean riff, builds)",
    "chords": [
     "E5",
     "E5",
     "G5",
     "F#5"
    ],
    "per": 0.5,
    "bars": 28
   },
   {
    "section": "Main riff",
    "chords": [
     "E5",
     "E5",
     "G5",
     "F#5"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "E5",
     "F5",
     "E5",
     "E5",
     "G5",
     "F#5",
     "G5",
     "F#5"
    ],
    "per": 0.5,
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "F#5"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "F#5",
     "B5",
     "F#5",
     "B5",
     "F#5",
     "B5",
     "E5",
     "E5",
     "F#5",
     "B5",
     "E5",
     "E5",
     "G5",
     "F#5",
     "E5",
     "E5"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Main riff",
    "chords": [
     "E5",
     "E5",
     "G5",
     "F#5"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "E5",
     "F5",
     "E5",
     "E5",
     "G5",
     "F#5",
     "G5",
     "F#5"
    ],
    "per": 0.5,
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "F#5"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "F#5",
     "B5",
     "F#5",
     "B5",
     "F#5",
     "B5",
     "E5",
     "E5",
     "F#5",
     "B5",
     "E5",
     "E5",
     "G5",
     "F#5",
     "E5",
     "E5"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Guitar solo",
    "chords": [
     "E5",
     "E5",
     "G5",
     "F#5",
     "E5",
     "E5",
     "G5",
     "F#5",
     "F#5",
     "B5",
     "F#5",
     "B5",
     "B5",
     "E5",
     "F#5",
     "B5"
    ],
    "per": 0.5,
    "bars": 24
   },
   {
    "section": "Bridge (quiet, spoken)",
    "chords": [
     "F#5"
    ],
    "bars": 16
   },
   {
    "section": "Chorus (extended)",
    "chords": [
     "F#5",
     "B5",
     "F#5",
     "B5",
     "F#5",
     "B5",
     "E5",
     "E5",
     "F#5",
     "B5",
     "E5",
     "E5",
     "G5",
     "F#5",
     "E5",
     "E5"
    ],
    "per": 0.5,
    "bars": 16
   },
   {
    "section": "Riff",
    "chords": [
     "E5",
     "E5",
     "G5",
     "F#5"
    ],
    "per": 0.5,
    "bars": 4
   },
   {
    "section": "Outro (fade)",
    "chords": [
     "E5"
    ],
    "bars": 8
   }
  ],
  "solos": [
   {
    "section": "Guitar solo",
    "scale": "E minor pentatonic, box 1 at the 12th fret (also box 1 at open/0); add F# for E natural minor colour over the F#5-B5 bars",
    "tips": "Use wah-friendly bends on the G string at 14th fret; when the backing moves to F#5-B5, target F# and B notes so it sounds resolved.",
    "chords": [
     "E5",
     "E5",
     "G5",
     "F#5",
     "E5",
     "E5",
     "G5",
     "F#5",
     "F#5",
     "B5",
     "F#5",
     "B5",
     "B5",
     "E5",
     "F#5",
     "B5"
    ]
   }
  ]
 },
 "Nothing Else Matters": {
  "status": "corrected",
  "key": "E minor",
  "bpm": 142,
  "beatsPerBar": 6,
  "durationSec": 388,
  "chords": [
   "Em",
   "D",
   "C",
   "G",
   "B7"
  ],
  "structure": [
   {
    "section": "Intro (clean arpeggio)",
    "chords": [
     "Em",
     "Em",
     "Em",
     "Em",
     "Em",
     "Em",
     "Am",
     "Am",
     "C",
     "D",
     "Em",
     "Em",
     "Em",
     "Em"
    ],
    "bars": 14
   },
   {
    "section": "Intro riff",
    "chords": [
     "Em",
     "Em",
     "D",
     "C",
     "Em",
     "Em",
     "D",
     "C",
     "Em",
     "Em",
     "D",
     "C",
     "G",
     "B7",
     "Em",
     "Em"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "Em",
     "Em",
     "D",
     "C",
     "Em",
     "Em",
     "D",
     "C",
     "Em",
     "Em",
     "D",
     "C",
     "G",
     "B7",
     "Em",
     "Em"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Verse 1 (to chorus)",
    "chords": [
     "Em",
     "Em",
     "D",
     "C",
     "Em",
     "Em",
     "D",
     "C",
     "Em",
     "Em",
     "D",
     "C",
     "G",
     "B7",
     "C",
     "A"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "D",
     "D",
     "C",
     "A",
     "D",
     "D",
     "C",
     "A",
     "D",
     "D",
     "Em",
     "Em"
    ],
    "per": 0.5,
    "bars": 6
   },
   {
    "section": "Verse 2",
    "chords": [
     "Em",
     "Em",
     "D",
     "C",
     "Em",
     "Em",
     "D",
     "C",
     "Em",
     "Em",
     "D",
     "C",
     "G",
     "B7",
     "C",
     "A"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "D",
     "D",
     "C",
     "A",
     "D",
     "D",
     "C",
     "A",
     "D",
     "D",
     "Em",
     "Em"
    ],
    "per": 0.5,
    "bars": 6
   },
   {
    "section": "Instrumental",
    "chords": [
     "Em",
     "Em",
     "Am",
     "Am",
     "C",
     "D",
     "Em",
     "Em"
    ],
    "bars": 16
   },
   {
    "section": "Verse 3",
    "chords": [
     "Em",
     "Em",
     "D",
     "C",
     "Em",
     "Em",
     "D",
     "C",
     "Em",
     "Em",
     "D",
     "C",
     "G",
     "B7",
     "Em",
     "Em"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Verse 3 (to chorus)",
    "chords": [
     "Em",
     "Em",
     "D",
     "C",
     "Em",
     "Em",
     "D",
     "C",
     "Em",
     "Em",
     "D",
     "C",
     "G",
     "B7",
     "C",
     "A"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Chorus (extended)",
    "chords": [
     "D",
     "D",
     "C",
     "A",
     "D",
     "D",
     "C",
     "A",
     "D",
     "D",
     "C",
     "A",
     "D",
     "D",
     "C",
     "A",
     "D",
     "D",
     "Em",
     "Em"
    ],
    "per": 0.5,
    "bars": 10
   },
   {
    "section": "Guitar solo",
    "chords": [
     "Em",
     "Em",
     "D",
     "C",
     "Em",
     "Em",
     "D",
     "C",
     "Em",
     "Em",
     "D",
     "C",
     "G",
     "G",
     "B7",
     "B7"
    ],
    "per": 0.5,
    "bars": 16
   },
   {
    "section": "Post-solo",
    "chords": [
     "Em"
    ],
    "bars": 4
   },
   {
    "section": "Verse 4",
    "chords": [
     "Em",
     "Em",
     "D",
     "C",
     "Em",
     "Em",
     "D",
     "C",
     "Em",
     "Em",
     "D",
     "C",
     "G",
     "B7",
     "Em",
     "Em"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Outro (arpeggio)",
    "chords": [
     "Em"
    ],
    "bars": 18
   }
  ],
  "solos": [
   {
    "section": "Guitar solo",
    "scale": "E minor pentatonic, box 1 at the 12th fret; add the D# from B7 (E harmonic minor) when the backing hits B7",
    "tips": "Play slow, singing bends and let notes ring - the solo is melodic, not fast. Land on E or G when the progression returns to Em.",
    "chords": [
     "Em",
     "Em",
     "D",
     "C",
     "Em",
     "Em",
     "D",
     "C",
     "Em",
     "Em",
     "D",
     "C",
     "G",
     "G",
     "B7",
     "B7"
    ]
   }
  ]
 },
 "Master of Puppets": {
  "status": "corrected",
  "key": "E minor",
  "bpm": 212,
  "beatsPerBar": 4,
  "durationSec": 515,
  "chords": [
   "E5",
   "D5",
   "C#5",
   "C5"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "E5",
     "D5",
     "C#5",
     "C5",
     "E5",
     "E5",
     "E5",
     "E5"
    ],
    "bars": 48
   },
   {
    "section": "Verse 1",
    "chords": [
     "E5"
    ],
    "bars": 24
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "F#5",
     "B5"
    ],
    "per": 2,
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "E5",
     "D5",
     "E5",
     "C5",
     "B5",
     "D#5"
    ],
    "bars": 12
   },
   {
    "section": "Post-chorus",
    "chords": [
     "F5",
     "E5",
     "G5",
     "E5",
     "C5",
     "B5",
     "A5",
     "E5"
    ],
    "bars": 8
   },
   {
    "section": "Riff",
    "chords": [
     "E5",
     "D5",
     "C#5",
     "C5",
     "E5",
     "E5",
     "E5",
     "E5"
    ],
    "bars": 16
   },
   {
    "section": "Verse 2",
    "chords": [
     "E5"
    ],
    "bars": 24
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "F#5",
     "B5"
    ],
    "per": 2,
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "E5",
     "D5",
     "E5",
     "C5",
     "B5",
     "D#5"
    ],
    "bars": 12
   },
   {
    "section": "Post-chorus",
    "chords": [
     "F5",
     "E5",
     "G5",
     "E5",
     "C5",
     "B5",
     "A5",
     "E5"
    ],
    "bars": 8
   },
   {
    "section": "Riff",
    "chords": [
     "E5",
     "D5",
     "C#5",
     "C5",
     "E5",
     "E5",
     "E5",
     "E5"
    ],
    "bars": 16
   },
   {
    "section": "Clean interlude",
    "chords": [
     "Em",
     "D",
     "Cadd9",
     "Am",
     "B7",
     "B7/D#"
    ],
    "per": 2,
    "bars": 60
   },
   {
    "section": "Clean guitar solo (melodic)",
    "chords": [
     "Em",
     "D",
     "Cadd9",
     "Am",
     "B7",
     "B7/D#"
    ],
    "per": 2,
    "bars": 48
   },
   {
    "section": "Heavy bridge",
    "chords": [
     "F#5",
     "G5",
     "F#5",
     "G5",
     "F#5",
     "G5",
     "C#5",
     "G5"
    ],
    "bars": 32
   },
   {
    "section": "Guitar solo",
    "chords": [
     "E5",
     "E5",
     "D5",
     "C5"
    ],
    "bars": 40
   },
   {
    "section": "Riff",
    "chords": [
     "E5",
     "D5",
     "C#5",
     "C5",
     "E5",
     "E5",
     "E5",
     "E5"
    ],
    "bars": 8
   },
   {
    "section": "Verse 3",
    "chords": [
     "E5"
    ],
    "bars": 24
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "F#5",
     "B5"
    ],
    "per": 2,
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "E5",
     "D5",
     "E5",
     "C5",
     "B5",
     "D#5"
    ],
    "bars": 12
   },
   {
    "section": "Post-chorus",
    "chords": [
     "F5",
     "E5",
     "G5",
     "E5",
     "C5",
     "B5",
     "A5",
     "E5"
    ],
    "bars": 8
   },
   {
    "section": "Outro (riff, fades with laughter)",
    "chords": [
     "E5",
     "D5",
     "C#5",
     "C5",
     "E5",
     "E5",
     "E5",
     "E5"
    ],
    "bars": 24
   }
  ],
  "solos": [
   {
    "section": "Clean guitar solo (melodic)",
    "scale": "E harmonic minor (E natural minor with D# over B7), 7th position",
    "tips": "Follow the chords: aim for B and D# when B7 comes. Use a clean or light-gain tone and pick evenly.",
    "chords": [
     "Em",
     "D",
     "Cadd9",
     "Am",
     "B7",
     "B7/D#"
    ]
   },
   {
    "section": "Guitar solo",
    "scale": "E minor pentatonic, box 1 at the 12th fret, with E natural minor passing notes",
    "tips": "Practise short 3-note bursts in triplets at half speed first; keep palm-muting off so notes sustain.",
    "chords": [
     "E5",
     "E5",
     "D5",
     "C5"
    ]
   }
  ]
 },
 "One": {
  "status": "corrected",
  "key": "B minor",
  "bpm": 108,
  "beatsPerBar": 4,
  "durationSec": 447,
  "chords": [
   "Bm",
   "Gmaj7",
   "D/A",
   "G5",
   "A5"
  ],
  "structure": [
   {
    "section": "Intro (clean, with melody guitar)",
    "chords": [
     "Bm",
     "Gmaj7",
     "Bm",
     "Gmaj7",
     "Bm",
     "D/A",
     "Gmaj7",
     "Gmaj7"
    ],
    "bars": 24
   },
   {
    "section": "Intro tag",
    "chords": [
     "Em",
     "F#m",
     "G5",
     "A5"
    ],
    "bars": 4
   },
   {
    "section": "Verse 1",
    "chords": [
     "Bm",
     "Gmaj7",
     "Bm",
     "Gmaj7",
     "Bm",
     "D/A",
     "Gmaj7",
     "Gmaj7"
    ],
    "bars": 16
   },
   {
    "section": "Chorus (distorted)",
    "chords": [
     "G5",
     "A5",
     "B5",
     "A5",
     "G5",
     "F#5",
     "B5",
     "A5"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Interlude (clean)",
    "chords": [
     "Bm",
     "Gmaj7",
     "Bm",
     "Gmaj7",
     "Bm",
     "D/A",
     "Gmaj7",
     "Gmaj7"
    ],
    "bars": 4
   },
   {
    "section": "Verse 2",
    "chords": [
     "Bm",
     "Gmaj7",
     "Bm",
     "Gmaj7",
     "Bm",
     "D/A",
     "Gmaj7",
     "Gmaj7"
    ],
    "bars": 16
   },
   {
    "section": "Chorus (distorted)",
    "chords": [
     "G5",
     "A5",
     "B5",
     "A5",
     "G5",
     "F#5",
     "B5",
     "A5"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Guitar solo 1",
    "chords": [
     "D",
     "G",
     "F",
     "Em"
    ],
    "bars": 12
   },
   {
    "section": "Chorus (distorted)",
    "chords": [
     "G5",
     "A5",
     "B5",
     "A5",
     "G5",
     "F#5",
     "B5",
     "A5"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Transition",
    "chords": [
     "Am",
     "G",
     "B5",
     "C5"
    ],
    "bars": 4
   },
   {
    "section": "Heavy interlude (machine-gun riff, double time)",
    "chords": [
     "E5",
     "F5"
    ],
    "per": 0.5,
    "bars": 22
   },
   {
    "section": "Verse 3 (heavy)",
    "chords": [
     "E5",
     "F5",
     "G5",
     "E5"
    ],
    "per": 0.5,
    "bars": 16
   },
   {
    "section": "Guitar solo 2 (tapping)",
    "chords": [
     "E5",
     "F5",
     "G5",
     "E5"
    ],
    "per": 0.5,
    "bars": 32
   },
   {
    "section": "Outro (dual guitars)",
    "chords": [
     "E5",
     "F5",
     "G5",
     "C#5"
    ],
    "per": 0.5,
    "bars": 20
   }
  ],
  "solos": [
   {
    "section": "Guitar solo 1",
    "scale": "D major / D Mixolydian over D-G, switch to D minor pentatonic (10th fret) when F and Em arrive",
    "tips": "Keep it clean and melodic; resolve phrases on D or E when the chords change.",
    "chords": [
     "D",
     "G",
     "F",
     "Em"
    ]
   },
   {
    "section": "Guitar solo 2 (tapping)",
    "scale": "E minor pentatonic box 1 at 12th fret plus F (E Phrygian) for the dark colour",
    "tips": "Practise the gallop rhythm first, then add short pentatonic runs; mute idle strings with the picking hand.",
    "chords": [
     "E5",
     "F5",
     "G5",
     "E5"
    ]
   }
  ]
 },
 "For Whom the Bell Tolls": {
  "status": "corrected",
  "key": "E minor",
  "bpm": 118,
  "beatsPerBar": 4,
  "durationSec": 310,
  "chords": [
   "E5",
   "G5",
   "F#5",
   "F5"
  ],
  "structure": [
   {
    "section": "Intro (bell, E chugs)",
    "chords": [
     "E5"
    ],
    "bars": 17
   },
   {
    "section": "Main riff with bass melody",
    "chords": [
     "E5",
     "G5",
     "F#5",
     "F5"
    ],
    "per": 0.5,
    "bars": 36
   },
   {
    "section": "Riff B",
    "chords": [
     "E5",
     "G5",
     "E5",
     "A5",
     "E5",
     "G5",
     "Bb5",
     "F#5"
    ],
    "per": 0.5,
    "bars": 12
   },
   {
    "section": "Verse 1",
    "chords": [
     "Em",
     "G",
     "Em",
     "G",
     "C",
     "A",
     "Em",
     "Em"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "E5",
     "G5",
     "E5",
     "A5",
     "E5",
     "G5",
     "Bb5",
     "F#5"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Bridge riff",
    "chords": [
     "E5",
     "E5",
     "E5",
     "G5",
     "E5",
     "B5"
    ],
    "bars": 6
   },
   {
    "section": "Verse 2",
    "chords": [
     "Em",
     "G",
     "Em",
     "G",
     "C",
     "A",
     "Em",
     "Em"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "E5",
     "G5",
     "E5",
     "A5",
     "E5",
     "G5",
     "Bb5",
     "F#5"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Main riff",
    "chords": [
     "E5",
     "G5",
     "F#5",
     "F5"
    ],
    "per": 0.5,
    "bars": 16
   },
   {
    "section": "Outro",
    "chords": [
     "E5",
     "F#5",
     "F#5",
     "G5"
    ],
    "per": 0.5,
    "bars": 30
   }
  ]
 },
 "The Unforgiven": {
  "status": "corrected",
  "key": "A minor",
  "bpm": 70,
  "beatsPerBar": 4,
  "durationSec": 387,
  "chords": [
   "Am",
   "C",
   "G",
   "Em",
   "E"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "Am",
     "Am",
     "Am",
     "Am",
     "Am",
     "C",
     "G",
     "Em",
     "Am",
     "C",
     "G",
     "E",
     "Am",
     "Am",
     "Am",
     "Am"
    ],
    "bars": 16
   },
   {
    "section": "Verse 1",
    "chords": [
     "Am",
     "Em",
     "D",
     "Am",
     "Am",
     "Em",
     "D",
     "Am",
     "Am",
     "Em",
     "D",
     "Am",
     "Am",
     "Em",
     "D",
     "Am",
     "C",
     "G",
     "Am",
     "Am",
     "C",
     "G",
     "E",
     "E"
    ],
    "per": 0.5,
    "bars": 12
   },
   {
    "section": "Chorus",
    "chords": [
     "C",
     "G",
     "Em",
     "Am",
     "C",
     "G",
     "E",
     "Am"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "Am",
     "Em",
     "D",
     "Am",
     "Am",
     "Em",
     "D",
     "Am",
     "Am",
     "Em",
     "D",
     "Am",
     "Am",
     "Em",
     "D",
     "Am",
     "C",
     "G",
     "Am",
     "Am",
     "C",
     "G",
     "E",
     "E"
    ],
    "per": 0.5,
    "bars": 12
   },
   {
    "section": "Chorus",
    "chords": [
     "C",
     "G",
     "Em",
     "Am",
     "C",
     "G",
     "E",
     "Am"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Guitar solo",
    "chords": [
     "Am",
     "Em",
     "D",
     "Am",
     "Am",
     "Em",
     "D",
     "Am",
     "Am",
     "Em",
     "D",
     "Am",
     "Am",
     "C",
     "G",
     "G",
     "Am",
     "C",
     "G",
     "E"
    ],
    "per": 0.5,
    "bars": 20
   },
   {
    "section": "Chorus",
    "chords": [
     "C",
     "G",
     "Em",
     "Am",
     "C",
     "G",
     "E",
     "Am"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Interlude",
    "chords": [
     "Am",
     "C",
     "G",
     "Em"
    ],
    "bars": 4
   },
   {
    "section": "Outro",
    "chords": [
     "Am",
     "C",
     "G",
     "E"
    ],
    "per": 0.5,
    "bars": 24
   }
  ],
  "solos": [
   {
    "section": "Guitar solo",
    "scale": "A minor pentatonic, box 1 at the 5th fret; A natural minor for passing notes",
    "tips": "Phrase with the chord changes - target E when the backing reaches E major (G# is a nice tension note there). Slow bends with vibrato suit this ballad.",
    "chords": [
     "Am",
     "Em",
     "D",
     "Am",
     "Am",
     "Em",
     "D",
     "Am",
     "Am",
     "Em",
     "D",
     "Am",
     "Am",
     "C",
     "G",
     "G",
     "Am",
     "C",
     "G",
     "E"
    ]
   }
  ]
 },
 "Whiskey in the Jar": {
  "status": "corrected",
  "key": "F major",
  "tuning": "D standard (whole step down)",
  "bpm": 133,
  "beatsPerBar": 4,
  "durationSec": 305,
  "chords": [
   "F",
   "Dm",
   "Bb",
   "C"
  ],
  "structure": [
   {
    "section": "Intro (twin-guitar riff)",
    "chords": [
     "Dm",
     "Dm",
     "F",
     "F"
    ],
    "bars": 16
   },
   {
    "section": "Verse 1a",
    "chords": [
     "F",
     "F",
     "Dm",
     "Dm",
     "Bb",
     "Bb",
     "F",
     "F"
    ],
    "bars": 8
   },
   {
    "section": "Riff",
    "chords": [
     "Dm",
     "Dm",
     "F",
     "F"
    ],
    "bars": 8
   },
   {
    "section": "Verse 1b",
    "chords": [
     "F",
     "F",
     "Dm",
     "Dm",
     "Bb",
     "Bb",
     "F",
     "F"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "C",
     "C",
     "Bb",
     "Bb",
     "Bb",
     "Bb",
     "F",
     "F"
    ],
    "bars": 8
   },
   {
    "section": "Riff",
    "chords": [
     "Dm",
     "Dm",
     "F",
     "F"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "F",
     "F",
     "Dm",
     "Dm",
     "Bb",
     "Bb",
     "F",
     "F"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "C",
     "C",
     "Bb",
     "Bb",
     "Bb",
     "Bb",
     "F",
     "F"
    ],
    "bars": 8
   },
   {
    "section": "Riff",
    "chords": [
     "Dm",
     "Dm",
     "F",
     "F"
    ],
    "bars": 8
   },
   {
    "section": "Guitar solo",
    "chords": [
     "Dm",
     "Dm",
     "F",
     "F",
     "Dm",
     "Dm",
     "Bb",
     "Bb",
     "F",
     "F",
     "C",
     "C",
     "Bb",
     "Bb",
     "F",
     "F"
    ],
    "bars": 32
   },
   {
    "section": "Verse 3",
    "chords": [
     "F",
     "F",
     "Dm",
     "Dm",
     "Bb",
     "Bb",
     "F",
     "F"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "C",
     "C",
     "Bb",
     "Bb",
     "Bb",
     "Bb",
     "F",
     "F"
    ],
    "bars": 8
   },
   {
    "section": "Riff",
    "chords": [
     "Dm",
     "Dm",
     "F",
     "F"
    ],
    "bars": 4
   },
   {
    "section": "Outro (riff)",
    "chords": [
     "Dm",
     "Dm",
     "F",
     "F"
    ],
    "bars": 24
   }
  ],
  "solos": [
   {
    "section": "Guitar solo",
    "scale": "D minor pentatonic / F major pentatonic (same notes). In D-standard tuning use the E-minor-pentatonic box at the 12th fret - it sounds as D minor",
    "tips": "Copy the twin-guitar feel: play short melodic phrases and repeat them; land on F when the backing returns to F.",
    "chords": [
     "Dm",
     "Dm",
     "F",
     "F",
     "Dm",
     "Dm",
     "Bb",
     "Bb",
     "F",
     "F",
     "C",
     "C",
     "Bb",
     "Bb",
     "F",
     "F"
    ]
   }
  ]
 },
 "Sad but True": {
  "status": "corrected",
  "key": "D minor",
  "tuning": "D standard (whole step down)",
  "bpm": 89,
  "beatsPerBar": 4,
  "durationSec": 324,
  "chords": [
   "D5",
   "C5",
   "Ab5",
   "Eb5"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "G5",
     "Ab5",
     "G5",
     "Ab5",
     "Eb5",
     "D5",
     "D5",
     "D5"
    ],
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "D5",
     "C5",
     "D5",
     "Ab5"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "Eb5",
     "C5",
     "Eb5",
     "D5",
     "Eb5",
     "C5",
     "G5",
     "G5",
     "Ab5",
     "F5",
     "G5",
     "F5",
     "Bb5",
     "Eb5",
     "D5",
     "D5"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "D5",
     "C5",
     "D5",
     "Ab5"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "Eb5",
     "C5",
     "Eb5",
     "D5",
     "Eb5",
     "C5",
     "G5",
     "G5",
     "Ab5",
     "F5",
     "G5",
     "F5",
     "Bb5",
     "Eb5",
     "D5",
     "D5"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Bridge",
    "chords": [
     "Eb5",
     "C5",
     "Eb5",
     "D5",
     "Eb5",
     "C5",
     "G5",
     "G5",
     "Ab5",
     "F5",
     "G5",
     "F5",
     "Bb5",
     "Eb5",
     "D5",
     "D5"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Interlude",
    "chords": [
     "G5",
     "Ab5"
    ],
    "bars": 4
   },
   {
    "section": "Guitar solo",
    "chords": [
     "D5",
     "D5",
     "G5",
     "Ab5",
     "F5",
     "Ab5",
     "G5",
     "Ab5",
     "Eb5",
     "C5",
     "Eb5",
     "D5",
     "Eb5",
     "C5",
     "G5",
     "G5",
     "Ab5",
     "F5",
     "G5",
     "F5",
     "Bb5",
     "Eb5",
     "D5",
     "D5"
    ],
    "per": 0.5,
    "bars": 12
   },
   {
    "section": "Verse 3",
    "chords": [
     "D5",
     "C5",
     "D5",
     "Ab5"
    ],
    "bars": 16
   },
   {
    "section": "Chorus (extended)",
    "chords": [
     "Eb5",
     "C5",
     "Eb5",
     "D5",
     "Eb5",
     "C5",
     "G5",
     "G5",
     "Ab5",
     "F5",
     "G5",
     "F5",
     "Bb5",
     "Eb5",
     "D5",
     "D5"
    ],
    "per": 0.5,
    "bars": 16
   },
   {
    "section": "Outro",
    "chords": [
     "D5"
    ],
    "bars": 4
   }
  ],
  "solos": [
   {
    "section": "Guitar solo",
    "scale": "D minor pentatonic plus Eb (D Phrygian). In D-standard tuning use the E-minor-pentatonic box at the 12th fret - it sounds as D",
    "tips": "Lots of space between phrases suits the slow groove; use wide bends and a wah if you have one.",
    "chords": [
     "D5",
     "D5",
     "G5",
     "Ab5",
     "F5",
     "Ab5",
     "G5",
     "Ab5",
     "Eb5",
     "C5",
     "Eb5",
     "D5",
     "Eb5",
     "C5",
     "G5",
     "G5",
     "Ab5",
     "F5",
     "G5",
     "F5",
     "Bb5",
     "Eb5",
     "D5",
     "D5"
    ]
   }
  ]
 },
 "Fade to Black": {
  "status": "corrected",
  "key": "A minor",
  "bpm": 113,
  "beatsPerBar": 4,
  "durationSec": 415,
  "chords": [
   "Am",
   "C",
   "G",
   "Em"
  ],
  "structure": [
   {
    "section": "Intro (acoustic)",
    "chords": [
     "Am",
     "C",
     "G",
     "Em"
    ],
    "bars": 8
   },
   {
    "section": "Intro guitar solo",
    "chords": [
     "Am",
     "C",
     "G",
     "Em"
    ],
    "bars": 24
   },
   {
    "section": "Pre-verse melody",
    "chords": [
     "Am",
     "C",
     "G",
     "Em"
    ],
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "Am",
     "C",
     "G",
     "Em",
     "Am",
     "C",
     "G",
     "Em",
     "Am",
     "C",
     "G",
     "Em",
     "Am",
     "C",
     "G",
     "E"
    ],
    "bars": 16
   },
   {
    "section": "Heavy interlude",
    "chords": [
     "C5",
     "A5",
     "C5",
     "G#5",
     "F#5",
     "E5",
     "A5",
     "C5",
     "A5",
     "D5",
     "E5",
     "E5"
    ],
    "per": 0.5,
    "bars": 6
   },
   {
    "section": "Pre-verse melody",
    "chords": [
     "Am",
     "C",
     "G",
     "Em"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "Am",
     "C",
     "G",
     "Em",
     "Am",
     "C",
     "G",
     "Em",
     "Am",
     "C",
     "G",
     "Em",
     "Am",
     "C",
     "G",
     "E"
    ],
    "bars": 16
   },
   {
    "section": "Heavy interlude",
    "chords": [
     "C5",
     "A5",
     "C5",
     "G#5",
     "F#5",
     "E5",
     "A5",
     "C5",
     "A5",
     "D5",
     "E5",
     "E5"
    ],
    "per": 0.5,
    "bars": 12
   },
   {
    "section": "Bridge (heavy riff)",
    "chords": [
     "D5",
     "E5",
     "D5",
     "E5",
     "G5",
     "F#5",
     "D5",
     "D5"
    ],
    "per": 0.5,
    "bars": 16
   },
   {
    "section": "Verse 3 (heavy)",
    "chords": [
     "D5",
     "E5",
     "D5",
     "E5",
     "G5",
     "F#5",
     "D5",
     "D5"
    ],
    "per": 0.5,
    "bars": 16
   },
   {
    "section": "Outro guitar solo",
    "chords": [
     "D5",
     "E5",
     "D5",
     "E5",
     "G5",
     "F#5",
     "D5",
     "D5"
    ],
    "per": 0.5,
    "bars": 64
   }
  ],
  "solos": [
   {
    "section": "Intro guitar solo",
    "scale": "A minor pentatonic box 1 at 5th fret; A natural minor (Aeolian) for melody",
    "tips": "Clean-ish lead tone, slow bends; land on E when the backing reaches Em.",
    "chords": [
     "Am",
     "C",
     "G",
     "Em"
    ]
   },
   {
    "section": "Outro guitar solo",
    "scale": "B minor pentatonic box 1 at the 7th fret (same notes as D major pentatonic), B natural minor for runs",
    "tips": "Build gradually: start with long held bends, then faster pentatonic triplets toward the end.",
    "chords": [
     "D5",
     "E5",
     "D5",
     "E5",
     "G5",
     "F#5",
     "D5",
     "D5"
    ]
   }
  ]
 },
 "Fuel": {
  "status": "corrected",
  "key": "Eb minor",
  "tuning": "half step down",
  "bpm": 107,
  "beatsPerBar": 4,
  "durationSec": 269,
  "chords": [
   "Eb5",
   "Gb5",
   "Ab5",
   "Bb5"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "Eb5",
     "Gb5",
     "Ab5",
     "Gb5"
    ],
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "Eb5",
     "Gb5",
     "Eb5",
     "Eb5",
     "Bb5",
     "A5",
     "Ab5",
     "Eb5"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "Eb5",
     "Ab5",
     "Gb5",
     "Ab5",
     "Eb5",
     "Ab5",
     "B",
     "Db"
    ],
    "bars": 8
   },
   {
    "section": "Instrumental",
    "chords": [
     "Eb5",
     "Gb5",
     "Gb5",
     "Ab5"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "Eb5",
     "Gb5",
     "Eb5",
     "Eb5",
     "Bb5",
     "A5",
     "Ab5",
     "Eb5"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "Eb5",
     "Ab5",
     "Gb5",
     "Ab5",
     "Eb5",
     "Ab5",
     "B",
     "Db"
    ],
    "bars": 8
   },
   {
    "section": "Breakdown riff",
    "chords": [
     "Eb5",
     "Ab5"
    ],
    "bars": 8
   },
   {
    "section": "Bridge",
    "chords": [
     "Eb5",
     "Ab5"
    ],
    "bars": 8
   },
   {
    "section": "Guitar solo",
    "chords": [
     "Eb5",
     "Ab5",
     "Eb5",
     "Gb5"
    ],
    "bars": 12
   },
   {
    "section": "Chorus (final)",
    "chords": [
     "Eb5",
     "Ab5",
     "Gb5",
     "Ab5",
     "Eb5",
     "Ab5",
     "B",
     "Db"
    ],
    "bars": 16
   },
   {
    "section": "Outro",
    "chords": [
     "Eb5",
     "Ab5"
    ],
    "bars": 6
   }
  ],
  "solos": [
   {
    "section": "Guitar solo",
    "scale": "Eb minor pentatonic (E-minor-pentatonic shapes at the 12th fret in Eb tuning) with the blues note A",
    "tips": "The groove is fast: practise phrases in short 2-bar chunks, then link them. Keep vibrato wide.",
    "chords": [
     "Eb5",
     "Ab5",
     "Eb5",
     "Gb5"
    ]
   }
  ]
 },
 "Seek & Destroy": {
  "status": "corrected",
  "key": "E minor",
  "bpm": 141,
  "beatsPerBar": 4,
  "durationSec": 415,
  "chords": [
   "E5",
   "A5",
   "G5",
   "F#5",
   "F5"
  ],
  "structure": [
   {
    "section": "Intro (A riff)",
    "chords": [
     "A5"
    ],
    "bars": 16
   },
   {
    "section": "Intro (E riff)",
    "chords": [
     "E5"
    ],
    "bars": 16
   },
   {
    "section": "Verse 1",
    "chords": [
     "E5"
    ],
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "A5"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "G5",
     "F#5",
     "F5",
     "E5"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Interlude (E riff)",
    "chords": [
     "E5"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "E5"
    ],
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "A5"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "G5",
     "F#5",
     "F5",
     "E5"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Breakdown (A riff)",
    "chords": [
     "A5"
    ],
    "bars": 16
   },
   {
    "section": "Guitar solo",
    "chords": [
     "G5",
     "F#5",
     "F5",
     "E5",
     "G5",
     "F#5",
     "F5",
     "E5",
     "E5",
     "E5",
     "E5",
     "E5",
     "E5",
     "E5",
     "E5",
     "E5"
    ],
    "per": 0.5,
    "bars": 40
   },
   {
    "section": "Intro riffs return",
    "chords": [
     "A5",
     "A5",
     "E5",
     "E5"
    ],
    "per": 2,
    "bars": 16
   },
   {
    "section": "Verse 3",
    "chords": [
     "E5"
    ],
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "A5"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "G5",
     "F#5",
     "F5",
     "E5"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Outro",
    "chords": [
     "F#5",
     "F5",
     "E5",
     "E5"
    ],
    "per": 0.5,
    "bars": 32
   }
  ],
  "solos": [
   {
    "section": "Guitar solo",
    "scale": "E minor pentatonic, box 1 at the 12th fret and open position; E blues (add Bb)",
    "tips": "Follow the descending G-F#-F-E backing with a matching chromatic slide; aim to land on E at each cycle.",
    "chords": [
     "G5",
     "F#5",
     "F5",
     "E5",
     "G5",
     "F#5",
     "F5",
     "E5",
     "E5",
     "E5",
     "E5",
     "E5",
     "E5",
     "E5",
     "E5",
     "E5"
    ]
   }
  ]
 },
 "Wherever I May Roam": {
  "status": "corrected",
  "key": "E minor",
  "bpm": 131,
  "beatsPerBar": 4,
  "durationSec": 404,
  "chords": [
   "E5",
   "Bb5",
   "A5",
   "G5",
   "F5"
  ],
  "structure": [
   {
    "section": "Intro (sitar and bass, ambient)",
    "chords": [
     "E5"
    ],
    "bars": 16
   },
   {
    "section": "Intro riff",
    "chords": [
     "E5",
     "F5",
     "E5",
     "E5"
    ],
    "bars": 32
   },
   {
    "section": "Verse 1",
    "chords": [
     "E5",
     "E5",
     "Bb5",
     "A5",
     "Bb5",
     "E5",
     "E5",
     "Bb5",
     "G5",
     "Bb5",
     "E5",
     "E5",
     "A5",
     "Bb5",
     "C5",
     "C5"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "F5",
     "E5",
     "Bb5",
     "A5",
     "G5",
     "G5",
     "E5",
     "E5"
    ],
    "bars": 8
   },
   {
    "section": "Riff",
    "chords": [
     "E5",
     "A5",
     "Bb5",
     "C5"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "E5",
     "E5",
     "Bb5",
     "A5",
     "Bb5",
     "E5",
     "E5",
     "Bb5",
     "G5",
     "Bb5",
     "E5",
     "E5",
     "A5",
     "Bb5",
     "C5",
     "C5"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "F5",
     "E5",
     "Bb5",
     "A5",
     "G5",
     "G5",
     "E5",
     "E5"
    ],
    "bars": 8
   },
   {
    "section": "Interlude",
    "chords": [
     "E5",
     "F5",
     "E5",
     "E5",
     "Bb5",
     "A5",
     "G5",
     "G5"
    ],
    "bars": 8
   },
   {
    "section": "Guitar solo",
    "chords": [
     "E5",
     "A5",
     "Bb5",
     "B5",
     "C5",
     "E5",
     "Bb5",
     "G5"
    ],
    "bars": 32
   },
   {
    "section": "Verse 3",
    "chords": [
     "E5",
     "E5",
     "Bb5",
     "A5",
     "Bb5",
     "E5",
     "E5",
     "Bb5",
     "G5",
     "Bb5",
     "E5",
     "E5",
     "A5",
     "Bb5",
     "C5",
     "C5"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "F5",
     "E5",
     "Bb5",
     "A5",
     "G5",
     "G5",
     "E5",
     "E5"
    ],
    "bars": 16
   },
   {
    "section": "Outro",
    "chords": [
     "E5",
     "A5",
     "Bb5",
     "C5"
    ],
    "bars": 40
   }
  ],
  "solos": [
   {
    "section": "Guitar solo",
    "scale": "E minor pentatonic box 1 at the 12th fret, with F and Bb for the E Phrygian / blues sound of the riff",
    "tips": "Use the F note (one fret above E) for tension and resolve back to E. Double-stop bends sound great here.",
    "chords": [
     "E5",
     "A5",
     "Bb5",
     "B5",
     "C5",
     "E5",
     "Bb5",
     "G5"
    ]
   }
  ]
 },
 "Paranoid": {
  "status": "corrected",
  "key": "E minor",
  "bpm": 163,
  "beatsPerBar": 4,
  "durationSec": 168,
  "chords": [
   "E5",
   "D5",
   "G5",
   "C5"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "D5",
     "E5"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "E5",
     "E5",
     "D5",
     "G5",
     "D5",
     "E5",
     "E5",
     "E5"
    ],
    "per": 0.5,
    "bars": 16
   },
   {
    "section": "Verse 1 (second half)",
    "chords": [
     "E5",
     "C5",
     "D5",
     "E5"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "E5",
     "E5",
     "D5",
     "G5",
     "D5",
     "E5",
     "E5",
     "E5"
    ],
    "per": 0.5,
    "bars": 16
   },
   {
    "section": "Bridge",
    "chords": [
     "E5",
     "D5",
     "E5",
     "D5"
    ],
    "bars": 8
   },
   {
    "section": "Verse 3",
    "chords": [
     "E5",
     "E5",
     "D5",
     "G5",
     "D5",
     "E5",
     "E5",
     "E5"
    ],
    "per": 0.5,
    "bars": 16
   },
   {
    "section": "Guitar solo",
    "chords": [
     "E5",
     "E5",
     "D5",
     "G5",
     "D5",
     "E5",
     "E5",
     "E5"
    ],
    "per": 0.5,
    "bars": 16
   },
   {
    "section": "Verse 4",
    "chords": [
     "E5",
     "E5",
     "D5",
     "G5",
     "D5",
     "E5",
     "E5",
     "E5"
    ],
    "per": 0.5,
    "bars": 16
   },
   {
    "section": "Verse 4 (second half)",
    "chords": [
     "E5",
     "C5",
     "D5",
     "E5"
    ],
    "bars": 8
   },
   {
    "section": "Outro",
    "chords": [
     "E5",
     "E5",
     "D5",
     "G5",
     "D5",
     "E5",
     "E5",
     "E5"
    ],
    "per": 0.5,
    "bars": 8
   }
  ],
  "solos": [
   {
    "section": "Guitar solo",
    "scale": "E minor pentatonic, box 1 at the 12th fret",
    "tips": "The original solo uses a ring-modulated fuzz; on a normal amp, focus on fast repeated bends on the G and B strings at the 14th/15th frets.",
    "chords": [
     "E5",
     "E5",
     "D5",
     "G5",
     "D5",
     "E5",
     "E5",
     "E5"
    ]
   }
  ]
 },
 "Iron Man": {
  "status": "uncertain",
  "key": "B minor",
  "bpm": 77,
  "beatsPerBar": 4,
  "durationSec": 356,
  "chords": [
   "B5",
   "D5",
   "E5",
   "G5",
   "F#5"
  ],
  "structure": [
   {
    "section": "Intro (feedback, bends)",
    "chords": [
     "E5"
    ],
    "bars": 8
   },
   {
    "section": "Main riff",
    "chords": [
     "B5",
     "D5",
     "E5",
     "E5",
     "G5",
     "F#5",
     "D5",
     "E5"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "B5",
     "D5",
     "E5",
     "E5",
     "G5",
     "F#5",
     "D5",
     "E5"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Main riff",
    "chords": [
     "B5",
     "D5",
     "E5",
     "E5",
     "G5",
     "F#5",
     "D5",
     "E5"
    ],
    "per": 0.5,
    "bars": 4
   },
   {
    "section": "Verse 2",
    "chords": [
     "B5",
     "D5",
     "E5",
     "E5",
     "G5",
     "F#5",
     "D5",
     "E5"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Riff B",
    "chords": [
     "B5",
     "D5",
     "B5",
     "A#5",
     "A5",
     "E5",
     "A5",
     "A#5"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Fast section (guitar solo)",
    "chords": [
     "E5",
     "D5",
     "E5",
     "B5"
    ],
    "per": 0.5,
    "bars": 20
   },
   {
    "section": "Main riff",
    "chords": [
     "B5",
     "D5",
     "E5",
     "E5",
     "G5",
     "F#5",
     "D5",
     "E5"
    ],
    "per": 0.5,
    "bars": 4
   },
   {
    "section": "Verse 3",
    "chords": [
     "B5",
     "D5",
     "E5",
     "E5",
     "G5",
     "F#5",
     "D5",
     "E5"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Riff B",
    "chords": [
     "B5",
     "D5",
     "B5",
     "A#5",
     "A5",
     "E5",
     "A5",
     "A#5"
    ],
    "per": 0.5,
    "bars": 4
   },
   {
    "section": "Verse 4",
    "chords": [
     "B5",
     "D5",
     "E5",
     "E5",
     "G5",
     "F#5",
     "D5",
     "E5"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Riff B",
    "chords": [
     "B5",
     "D5",
     "B5",
     "A#5",
     "A5",
     "E5",
     "A5",
     "A#5"
    ],
    "per": 0.5,
    "bars": 4
   },
   {
    "section": "Outro (fast, guitar solo)",
    "chords": [
     "E5",
     "D5",
     "E5",
     "B5"
    ],
    "per": 0.5,
    "bars": 18
   }
  ],
  "solos": [
   {
    "section": "Fast section (guitar solo)",
    "scale": "E minor pentatonic, box 1 at the 12th fret (B minor pentatonic box 1 at the 7th fret also fits)",
    "tips": "The tempo doubles here - practise the backing riff first, then add short bluesy licks.",
    "chords": [
     "E5",
     "D5",
     "E5",
     "B5"
    ]
   },
   {
    "section": "Outro (fast, guitar solo)",
    "scale": "E minor pentatonic, 12th fret",
    "tips": "Repeat a simple 3-note phrase and add vibrato; Iommi's style is about tone and feel more than speed.",
    "chords": [
     "E5",
     "D5",
     "E5",
     "B5"
    ]
   }
  ]
 },
 "Crazy Train": {
  "status": "corrected",
  "key": "F# minor",
  "bpm": 138,
  "beatsPerBar": 4,
  "durationSec": 291,
  "chords": [
   "F#m",
   "D",
   "A",
   "E"
  ],
  "structure": [
   {
    "section": "Intro (main riff)",
    "chords": [
     "F#5",
     "F#5",
     "A5",
     "E5",
     "F#5",
     "F#5",
     "D5",
     "E5"
    ],
    "per": 0.5,
    "bars": 16
   },
   {
    "section": "Verse 1",
    "chords": [
     "A",
     "E/A",
     "D/A",
     "A"
    ],
    "per": 0.5,
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "F#m",
     "D",
     "F#m",
     "D",
     "A",
     "E",
     "F#m",
     "F#m",
     "A",
     "E",
     "F#m",
     "F#m",
     "A",
     "E",
     "F#m",
     "D",
     "E",
     "E"
    ],
    "per": 0.5,
    "bars": 9
   },
   {
    "section": "Main riff",
    "chords": [
     "F#5",
     "F#5",
     "A5",
     "E5",
     "F#5",
     "F#5",
     "D5",
     "E5"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "A",
     "E/A",
     "D/A",
     "A"
    ],
    "per": 0.5,
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "F#m",
     "D",
     "F#m",
     "D",
     "A",
     "E",
     "F#m",
     "F#m",
     "A",
     "E",
     "F#m",
     "F#m",
     "A",
     "E",
     "F#m",
     "D",
     "E",
     "E"
    ],
    "per": 0.5,
    "bars": 9
   },
   {
    "section": "Bridge",
    "chords": [
     "F#m",
     "A",
     "E",
     "F#m",
     "D",
     "D",
     "E",
     "E"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Interlude (clean break)",
    "chords": [
     "F#m",
     "D",
     "E",
     "E"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Guitar solo",
    "chords": [
     "F#m",
     "D",
     "Bm",
     "F#m"
    ],
    "bars": 24
   },
   {
    "section": "Main riff",
    "chords": [
     "F#5",
     "F#5",
     "A5",
     "E5",
     "F#5",
     "F#5",
     "D5",
     "E5"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Verse 3",
    "chords": [
     "A",
     "E/A",
     "D/A",
     "A"
    ],
    "per": 0.5,
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "F#m",
     "D",
     "F#m",
     "D",
     "A",
     "E",
     "F#m",
     "F#m",
     "A",
     "E",
     "F#m",
     "F#m",
     "A",
     "E",
     "F#m",
     "D",
     "E",
     "E"
    ],
    "per": 0.5,
    "bars": 9
   },
   {
    "section": "Outro (riff, fade)",
    "chords": [
     "F#5",
     "F#5",
     "A5",
     "E5",
     "F#5",
     "F#5",
     "D5",
     "E5"
    ],
    "per": 0.5,
    "bars": 16
   }
  ],
  "solos": [
   {
    "section": "Guitar solo",
    "scale": "F# minor pentatonic box 1 at the 14th fret (or 2nd fret), F# natural minor for runs",
    "tips": "Practise the fast passages slowly with alternate picking; outline the Bm bar by landing on B or D.",
    "chords": [
     "F#m",
     "D",
     "Bm",
     "F#m"
    ]
   }
  ]
 },
 "Breaking the Law": {
  "status": "uncertain",
  "key": "A minor",
  "bpm": 162,
  "beatsPerBar": 4,
  "durationSec": 160,
  "chords": [
   "Am",
   "F",
   "G"
  ],
  "structure": [
   {
    "section": "Intro riff",
    "chords": [
     "Am",
     "Am",
     "F",
     "G"
    ],
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "Am",
     "C",
     "G",
     "Am"
    ],
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "F",
     "C",
     "F",
     "E"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "Am"
    ],
    "bars": 8
   },
   {
    "section": "Riff",
    "chords": [
     "Am",
     "Am",
     "F",
     "G"
    ],
    "bars": 4
   },
   {
    "section": "Verse 2",
    "chords": [
     "Am",
     "C",
     "G",
     "Am"
    ],
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "F",
     "C",
     "F",
     "E"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "Am"
    ],
    "bars": 8
   },
   {
    "section": "Instrumental bridge",
    "chords": [
     "Dm",
     "F",
     "C",
     "Dm",
     "F",
     "G"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "Am"
    ],
    "bars": 8
   },
   {
    "section": "Outro riff",
    "chords": [
     "Am",
     "Am",
     "F",
     "G"
    ],
    "bars": 8
   }
  ]
 },
 "Run to the Hills": {
  "status": "corrected",
  "key": "G major (D Mixolydian verses, A Dorian intro)",
  "bpm": 174,
  "beatsPerBar": 4,
  "durationSec": 232,
  "chords": [
   "G",
   "F",
   "C",
   "G",
   "Em"
  ],
  "structure": [
   {
    "section": "Intro (drums and riff)",
    "chords": [
     "Am",
     "D",
     "Am",
     "C",
     "D"
    ],
    "bars": 15
   },
   {
    "section": "Verse 1",
    "chords": [
     "D",
     "C",
     "Bm",
     "C",
     "Bm",
     "C"
    ],
    "bars": 24
   },
   {
    "section": "Chorus",
    "chords": [
     "G",
     "F",
     "C",
     "G",
     "Em"
    ],
    "bars": 15
   },
   {
    "section": "Riff interlude",
    "chords": [
     "D",
     "C",
     "Bm",
     "C"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "D",
     "C",
     "Bm",
     "C",
     "Bm",
     "C"
    ],
    "bars": 24
   },
   {
    "section": "Chorus",
    "chords": [
     "G",
     "F",
     "C",
     "G",
     "Em"
    ],
    "bars": 15
   },
   {
    "section": "Guitar solo",
    "chords": [
     "D",
     "C",
     "Bm",
     "C"
    ],
    "bars": 16
   },
   {
    "section": "Verse 3",
    "chords": [
     "D",
     "C",
     "Bm",
     "C",
     "Bm",
     "C"
    ],
    "bars": 24
   },
   {
    "section": "Chorus",
    "chords": [
     "G",
     "F",
     "C",
     "G",
     "Em"
    ],
    "bars": 20
   },
   {
    "section": "Outro",
    "chords": [
     "G",
     "F",
     "C",
     "G"
    ],
    "bars": 8
   }
  ],
  "solos": [
   {
    "section": "Guitar solo",
    "scale": "B minor pentatonic, box 1 at 7th fret, with D Mixolydian colour (the C natural over the C chord)",
    "tips": "Lock into the galloping rhythm first; keep phrases short and land on chord tones (D, C, B) as each chord changes. Practise slowly with alternate picking before going to full tempo.",
    "chords": [
     "D",
     "C",
     "Bm",
     "C"
    ]
   }
  ]
 },
 "The Trooper": {
  "status": "uncertain",
  "key": "E minor",
  "bpm": 158,
  "beatsPerBar": 4,
  "durationSec": 243,
  "chords": [
   "Em",
   "D",
   "C",
   "D"
  ],
  "structure": [
   {
    "section": "Intro (harmony riff)",
    "chords": [
     "Em",
     "D",
     "C",
     "D"
    ],
    "bars": 16
   },
   {
    "section": "Verse 1",
    "chords": [
     "Em",
     "D",
     "C",
     "D"
    ],
    "bars": 16
   },
   {
    "section": "Verse 2",
    "chords": [
     "Em",
     "D",
     "C",
     "D"
    ],
    "bars": 16
   },
   {
    "section": "Refrain",
    "chords": [
     "C",
     "D",
     "Em",
     "Em"
    ],
    "bars": 8
   },
   {
    "section": "Riff interlude",
    "chords": [
     "Em",
     "D",
     "C",
     "D"
    ],
    "bars": 16
   },
   {
    "section": "Verse 3",
    "chords": [
     "Em",
     "D",
     "C",
     "D"
    ],
    "bars": 16
   },
   {
    "section": "Guitar solo 1",
    "chords": [
     "Em",
     "D",
     "C",
     "D"
    ],
    "bars": 16
   },
   {
    "section": "Harmony break",
    "chords": [
     "Em",
     "D",
     "C",
     "D"
    ],
    "bars": 8
   },
   {
    "section": "Guitar solo 2",
    "chords": [
     "Em",
     "D",
     "C",
     "D"
    ],
    "bars": 16
   },
   {
    "section": "Verse 4",
    "chords": [
     "Em",
     "D",
     "C",
     "D"
    ],
    "bars": 16
   },
   {
    "section": "Outro (refrain and riff)",
    "chords": [
     "C",
     "D",
     "Em",
     "Em"
    ],
    "bars": 16
   }
  ],
  "solos": [
   {
    "section": "Guitar solo 1",
    "scale": "E minor pentatonic, box 1 at 12th fret (or open position), adding F# and B from E natural minor",
    "tips": "Keep the gallop feel in your picking hand even when you rest. Aim to land on E or B when the riff returns to Em.",
    "chords": [
     "Em",
     "D",
     "C",
     "D"
    ]
   },
   {
    "section": "Guitar solo 2",
    "scale": "E natural minor (Aeolian) around the 7th to 12th frets",
    "tips": "Practise short two-note harmony shapes (thirds) to get the classic twin-guitar sound. Start at half speed with a metronome before working up to tempo.",
    "chords": [
     "Em",
     "D",
     "C",
     "D"
    ]
   }
  ]
 },
 "Fear of the Dark": {
  "status": "corrected",
  "key": "D minor",
  "bpm": 102,
  "beatsPerBar": 4,
  "durationSec": 435,
  "chords": [
   "Dm",
   "Bb",
   "C"
  ],
  "structure": [
   {
    "section": "Intro (slow, about 80 BPM)",
    "chords": [
     "Dm",
     "C"
    ],
    "per": 2,
    "bars": 20
   },
   {
    "section": "Main harmony riff",
    "chords": [
     "Dm",
     "C"
    ],
    "bars": 16
   },
   {
    "section": "Verse 1",
    "chords": [
     "Dm",
     "Bb",
     "C",
     "C"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "Bb",
     "C",
     "Dm",
     "C"
    ],
    "bars": 8
   },
   {
    "section": "Riff",
    "chords": [
     "Dm",
     "C"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "Dm",
     "Bb",
     "C",
     "C"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "Bb",
     "C",
     "Dm",
     "C"
    ],
    "bars": 8
   },
   {
    "section": "Riff",
    "chords": [
     "Dm",
     "C"
    ],
    "bars": 8
   },
   {
    "section": "Guitar solo 1",
    "chords": [
     "Dm",
     "Bb",
     "C",
     "C"
    ],
    "bars": 16
   },
   {
    "section": "Guitar solo 2",
    "chords": [
     "Dm",
     "Bb",
     "C",
     "C"
    ],
    "bars": 16
   },
   {
    "section": "Harmony riff",
    "chords": [
     "Dm",
     "C"
    ],
    "bars": 8
   },
   {
    "section": "Verse 3",
    "chords": [
     "Dm",
     "Bb",
     "C",
     "C"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "Bb",
     "C",
     "Dm",
     "C"
    ],
    "bars": 8
   },
   {
    "section": "Riff",
    "chords": [
     "Dm",
     "C"
    ],
    "bars": 8
   },
   {
    "section": "Outro (slow, clean)",
    "chords": [
     "Dm",
     "C"
    ],
    "per": 2,
    "bars": 13
   }
  ],
  "solos": [
   {
    "section": "Guitar solo 1",
    "scale": "D minor pentatonic, box 1 at 10th fret, with D natural minor colour notes (E, Bb)",
    "tips": "Target D over Dm, D or F over Bb, and E or G over C. Use slides between pentatonic boxes to cover more of the neck.",
    "chords": [
     "Dm",
     "Bb",
     "C",
     "C"
    ]
   },
   {
    "section": "Guitar solo 2",
    "scale": "D natural minor (Aeolian) from the 10th to 15th frets",
    "tips": "Practise the main riff harmony line first to learn the scale shape. Keep vibrato even on held notes.",
    "chords": [
     "Dm",
     "Bb",
     "C",
     "C"
    ]
   }
  ]
 },
 "In the End": {
  "status": "corrected",
  "key": "D# minor (Eb minor)",
  "capoNote": "Capo 1, Dm-C-Bb-C shapes",
  "bpm": 105,
  "beatsPerBar": 4,
  "durationSec": 219,
  "chords": [
   "D#m",
   "C#",
   "B",
   "C#"
  ],
  "structure": [
   {
    "section": "Piano intro",
    "chords": [
     "D#m",
     "C#",
     "B",
     "C#"
    ],
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "D#m",
     "C#",
     "B",
     "C#"
    ],
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "D#m",
     "C#",
     "B",
     "C#"
    ],
    "bars": 4
   },
   {
    "section": "Chorus",
    "chords": [
     "D#m",
     "D#m",
     "F#",
     "F#",
     "C#",
     "C#",
     "B",
     "C#"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "D#m",
     "C#",
     "B",
     "C#"
    ],
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "D#m",
     "C#",
     "B",
     "C#"
    ],
    "bars": 4
   },
   {
    "section": "Chorus",
    "chords": [
     "D#m",
     "D#m",
     "F#",
     "F#",
     "C#",
     "C#",
     "B",
     "C#"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Bridge",
    "chords": [
     "B",
     "B",
     "D#m",
     "D#m",
     "C#",
     "C#",
     "B",
     "C#"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Instrumental build",
    "chords": [
     "D#m",
     "D#m",
     "F#",
     "F#",
     "C#",
     "C#",
     "B",
     "C#"
    ],
    "per": 0.5,
    "bars": 4
   },
   {
    "section": "Chorus",
    "chords": [
     "D#m",
     "D#m",
     "F#",
     "F#",
     "C#",
     "C#",
     "B",
     "C#"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Outro chorus",
    "chords": [
     "D#m",
     "D#m",
     "F#",
     "F#",
     "C#",
     "C#",
     "B",
     "C#"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Piano outro",
    "chords": [
     "D#m",
     "C#",
     "B",
     "C#"
    ],
    "bars": 4
   }
  ]
 },
 "Numb": {
  "status": "corrected",
  "key": "F# minor",
  "capoNote": "Capo 2, Em-C-G-D shapes",
  "bpm": 110,
  "beatsPerBar": 4,
  "durationSec": 183,
  "chords": [
   "F#m",
   "Dmaj7",
   "A",
   "E"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "F#m",
     "D",
     "A",
     "E"
    ],
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "F#m",
     "Dmaj7",
     "A",
     "E"
    ],
    "bars": 8
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Dmaj7",
     "E",
     "F#m",
     "A"
    ],
    "bars": 4
   },
   {
    "section": "Chorus",
    "chords": [
     "F#m",
     "Dmaj7",
     "A",
     "E"
    ],
    "bars": 8
   },
   {
    "section": "Chorus lead-out",
    "chords": [
     "Dmaj7",
     "E",
     "F#m",
     "F#m"
    ],
    "bars": 4
   },
   {
    "section": "Verse 2",
    "chords": [
     "F#m",
     "Dmaj7",
     "A",
     "E"
    ],
    "bars": 8
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Dmaj7",
     "E",
     "F#m",
     "A"
    ],
    "bars": 4
   },
   {
    "section": "Chorus",
    "chords": [
     "F#m",
     "Dmaj7",
     "A",
     "E"
    ],
    "bars": 8
   },
   {
    "section": "Chorus lead-out",
    "chords": [
     "Dmaj7",
     "E",
     "F#m",
     "F#m"
    ],
    "bars": 4
   },
   {
    "section": "Bridge",
    "chords": [
     "F#m",
     "Dmaj7",
     "A",
     "E"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "F#m",
     "Dmaj7",
     "A",
     "E"
    ],
    "bars": 8
   },
   {
    "section": "Outro",
    "chords": [
     "Dmaj7",
     "E",
     "F#m",
     "F#m"
    ],
    "bars": 12
   }
  ]
 },
 "What I've Done": {
  "status": "corrected",
  "key": "G minor",
  "capoNote": "Capo 3, Em-G-D-Am shapes",
  "bpm": 120,
  "beatsPerBar": 4,
  "durationSec": 208,
  "chords": [
   "Gm",
   "Bb",
   "F",
   "Cm"
  ],
  "structure": [
   {
    "section": "Piano intro",
    "chords": [
     "Gm",
     "Bb",
     "F",
     "Cm"
    ],
    "bars": 8
   },
   {
    "section": "Band intro (guitar riff)",
    "chords": [
     "Gm",
     "Bb",
     "F",
     "Cm"
    ],
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "Gm",
     "Bb",
     "F",
     "Cm"
    ],
    "bars": 8
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Gm",
     "Bb",
     "F",
     "Cm"
    ],
    "bars": 4
   },
   {
    "section": "Chorus",
    "chords": [
     "Gm",
     "Bb",
     "F",
     "Cm"
    ],
    "bars": 8
   },
   {
    "section": "Post-chorus",
    "chords": [
     "Gm",
     "Bb",
     "F",
     "Cm"
    ],
    "bars": 4
   },
   {
    "section": "Verse 2",
    "chords": [
     "Gm",
     "Bb",
     "F",
     "Cm"
    ],
    "bars": 8
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "Gm",
     "Bb",
     "F",
     "Cm"
    ],
    "bars": 4
   },
   {
    "section": "Chorus",
    "chords": [
     "Gm",
     "Bb",
     "F",
     "Cm"
    ],
    "bars": 8
   },
   {
    "section": "Post-chorus",
    "chords": [
     "Gm",
     "Bb",
     "F",
     "Cm"
    ],
    "bars": 4
   },
   {
    "section": "Guitar solo",
    "chords": [
     "Gm",
     "Bb",
     "F",
     "Cm"
    ],
    "bars": 8
   },
   {
    "section": "Bridge",
    "chords": [
     "Gm",
     "Bb",
     "F",
     "Cm"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "Gm",
     "Bb",
     "F",
     "Cm"
    ],
    "bars": 8
   },
   {
    "section": "Outro",
    "chords": [
     "Gm",
     "Bb",
     "F",
     "Cm"
    ],
    "bars": 16
   }
  ],
  "solos": [
   {
    "section": "Guitar solo",
    "scale": "G minor pentatonic, box 1 at 3rd fret (or 15th fret), adding A and Eb from G natural minor",
    "tips": "The solo is melodic and slow, so focus on bends and long held notes rather than speed. Aim for G over Gm, D over Bb, F or C over F and C over Cm.",
    "chords": [
     "Gm",
     "Bb",
     "F",
     "Cm"
    ]
   }
  ]
 },
 "Bring Me to Life": {
  "status": "corrected",
  "key": "E minor",
  "bpm": 95,
  "beatsPerBar": 4,
  "durationSec": 232,
  "chords": [
   "Em",
   "G",
   "D"
  ],
  "structure": [
   {
    "section": "Piano intro",
    "chords": [
     "Em",
     "Am/E"
    ],
    "bars": 4
   },
   {
    "section": "Verse 1",
    "chords": [
     "Em",
     "Am/E"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "Em",
     "G",
     "D",
     "D"
    ],
    "bars": 8
   },
   {
    "section": "Chorus lead-out",
    "chords": [
     "C",
     "D",
     "Em",
     "Em"
    ],
    "bars": 4
   },
   {
    "section": "Verse 2",
    "chords": [
     "Em",
     "Am/E"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "Em",
     "G",
     "D",
     "D"
    ],
    "bars": 8
   },
   {
    "section": "Chorus lead-out",
    "chords": [
     "C",
     "D",
     "Em",
     "Em"
    ],
    "bars": 4
   },
   {
    "section": "Bridge",
    "chords": [
     "Am",
     "Em/G",
     "B7/F#",
     "Em"
    ],
    "bars": 8
   },
   {
    "section": "Heavy interlude",
    "chords": [
     "C",
     "D",
     "Em",
     "Em"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "Em",
     "G",
     "D",
     "D"
    ],
    "bars": 8
   },
   {
    "section": "Chorus lead-out",
    "chords": [
     "C",
     "D",
     "Em",
     "Em"
    ],
    "bars": 4
   },
   {
    "section": "Outro",
    "chords": [
     "Em"
    ],
    "bars": 4
   }
  ]
 },
 "Snuff": {
  "status": "uncertain",
  "key": "F# minor",
  "tuning": "C# standard (down 1.5 steps); A-minor shapes sound as F# minor",
  "bpm": 62,
  "beatsPerBar": 4,
  "durationSec": 276,
  "chords": [
   "F#m",
   "C#m",
   "D",
   "A"
  ],
  "structure": [
   {
    "section": "Intro (clean arpeggios)",
    "chords": [
     "F#m",
     "C#m",
     "D",
     "A"
    ],
    "bars": 4
   },
   {
    "section": "Verse 1",
    "chords": [
     "F#m",
     "C#m",
     "D",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "F#m",
     "C#m",
     "D",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "E",
     "F#m",
     "D",
     "F#m"
    ],
    "bars": 8
   },
   {
    "section": "Interlude",
    "chords": [
     "F#m",
     "C#m",
     "D",
     "A"
    ],
    "bars": 4
   },
   {
    "section": "Verse 3",
    "chords": [
     "F#m",
     "C#m",
     "D",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "E",
     "F#m",
     "D",
     "F#m"
    ],
    "bars": 8
   },
   {
    "section": "Bridge (band enters, lead guitar)",
    "chords": [
     "D",
     "A",
     "E",
     "F#m"
    ],
    "bars": 8
   },
   {
    "section": "Final chorus (full band)",
    "chords": [
     "E",
     "F#m",
     "D",
     "F#m"
    ],
    "bars": 8
   },
   {
    "section": "Outro",
    "chords": [
     "F#m",
     "C#m",
     "D",
     "A",
     "F#m",
     "F#m"
    ],
    "bars": 6
   }
  ],
  "solos": [
   {
    "section": "Bridge (band enters, lead guitar)",
    "scale": "F# minor pentatonic, box 1 at 2nd fret concert (5th-fret A-minor box if tuned to C# standard)",
    "tips": "Play long, slow notes with wide vibrato rather than fast runs; land on F# or C# when the F#m chord returns.",
    "chords": [
     "D",
     "A",
     "E",
     "F#m"
    ]
   }
  ]
 },
 "The Sound of Silence": {
  "status": "corrected",
  "key": "F# minor",
  "capoNote": "Capo 2 with Em shapes (Em-D-G-C) also works",
  "bpm": 86,
  "beatsPerBar": 4,
  "durationSec": 245,
  "chords": [
   "F#m",
   "E",
   "A",
   "D"
  ],
  "structure": [
   {
    "section": "Intro (piano)",
    "chords": [
     "F#m",
     "E",
     "F#m",
     "F#m"
    ],
    "bars": 4
   },
   {
    "section": "Verse 1 (soft, piano)",
    "chords": [
     "F#m",
     "E",
     "E",
     "F#m",
     "F#m",
     "A",
     "D",
     "A",
     "A",
     "D",
     "A",
     "D",
     "A",
     "F#m",
     "E",
     "F#m"
    ],
    "bars": 16
   },
   {
    "section": "Verse 2",
    "chords": [
     "F#m",
     "E",
     "E",
     "F#m",
     "F#m",
     "A",
     "D",
     "A",
     "A",
     "D",
     "A",
     "D",
     "A",
     "F#m",
     "E",
     "F#m"
    ],
    "bars": 16
   },
   {
    "section": "Verse 3 (strings and timpani build)",
    "chords": [
     "F#m",
     "E",
     "E",
     "F#m",
     "F#m",
     "A",
     "D",
     "A",
     "A",
     "D",
     "A",
     "D",
     "A",
     "F#m",
     "E",
     "F#m"
    ],
    "bars": 16
   },
   {
    "section": "Verse 4 (louder)",
    "chords": [
     "F#m",
     "E",
     "E",
     "F#m",
     "F#m",
     "A",
     "D",
     "A",
     "A",
     "D",
     "A",
     "D",
     "A",
     "F#m",
     "E",
     "F#m"
    ],
    "bars": 16
   },
   {
    "section": "Verse 5 (climax, full orchestra and drums)",
    "chords": [
     "F#m",
     "E",
     "E",
     "F#m",
     "F#m",
     "A",
     "D",
     "A",
     "A",
     "D",
     "A",
     "D",
     "A",
     "F#m",
     "E",
     "F#m"
    ],
    "bars": 16
   },
   {
    "section": "Outro (quiet piano ending)",
    "chords": [
     "F#m"
    ],
    "bars": 4
   }
  ]
 },
 "Drown": {
  "status": "uncertain",
  "key": "C# minor (relative E major)",
  "bpm": 143,
  "beatsPerBar": 4,
  "durationSec": 215,
  "chords": [
   "A",
   "C#m",
   "E",
   "G#m"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "A",
     "C#m",
     "E",
     "E"
    ],
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "A",
     "C#m",
     "E",
     "E"
    ],
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "A",
     "C#m",
     "G#m",
     "E"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "A",
     "C#m",
     "E",
     "B"
    ],
    "bars": 16
   },
   {
    "section": "Verse 2",
    "chords": [
     "A",
     "C#m",
     "E",
     "E"
    ],
    "bars": 8
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "A",
     "C#m",
     "G#m",
     "E"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "A",
     "C#m",
     "E",
     "B"
    ],
    "bars": 16
   },
   {
    "section": "Post-chorus",
    "chords": [
     "A",
     "C#m",
     "E",
     "E"
    ],
    "bars": 8
   },
   {
    "section": "Bridge",
    "chords": [
     "G#m",
     "C#m",
     "A",
     "C#m",
     "E",
     "A",
     "C#m",
     "G#m"
    ],
    "bars": 16
   },
   {
    "section": "Final chorus",
    "chords": [
     "A",
     "C#m",
     "E",
     "B"
    ],
    "bars": 16
   },
   {
    "section": "Outro",
    "chords": [
     "C#m",
     "B",
     "E",
     "A"
    ],
    "bars": 8
   }
  ]
 },
 "While My Guitar Gently Weeps": {
  "status": "corrected",
  "key": "A minor (bridges in A major)",
  "bpm": 114,
  "beatsPerBar": 4,
  "durationSec": 286,
  "chords": [
   "Am",
   "Am/G",
   "Am/F#",
   "Fmaj7"
  ],
  "structure": [
   {
    "section": "Intro (piano)",
    "chords": [
     "Am",
     "Am/G",
     "Am/F#",
     "Fmaj7",
     "Am",
     "G",
     "D",
     "E"
    ],
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "Am",
     "Am/G",
     "Am/F#",
     "Fmaj7",
     "Am",
     "G",
     "D",
     "E",
     "Am",
     "Am/G",
     "Am/F#",
     "Fmaj7",
     "Am",
     "G",
     "C",
     "E"
    ],
    "bars": 16
   },
   {
    "section": "Verse 2",
    "chords": [
     "Am",
     "Am/G",
     "Am/F#",
     "Fmaj7",
     "Am",
     "G",
     "D",
     "E",
     "Am",
     "Am/G",
     "Am/F#",
     "Fmaj7",
     "Am",
     "G",
     "C",
     "E"
    ],
    "bars": 16
   },
   {
    "section": "Bridge 1 (A major)",
    "chords": [
     "A",
     "C#m",
     "F#m",
     "C#m",
     "Bm",
     "Bm",
     "E",
     "E"
    ],
    "bars": 16
   },
   {
    "section": "Verse 3",
    "chords": [
     "Am",
     "Am/G",
     "Am/F#",
     "Fmaj7",
     "Am",
     "G",
     "D",
     "E",
     "Am",
     "Am/G",
     "Am/F#",
     "Fmaj7",
     "Am",
     "G",
     "C",
     "E"
    ],
    "bars": 16
   },
   {
    "section": "Guitar solo (over verse)",
    "chords": [
     "Am",
     "Am/G",
     "Am/F#",
     "Fmaj7",
     "Am",
     "G",
     "D",
     "E",
     "Am",
     "Am/G",
     "Am/F#",
     "Fmaj7",
     "Am",
     "G",
     "C",
     "E"
    ],
    "bars": 16
   },
   {
    "section": "Bridge 2 (A major)",
    "chords": [
     "A",
     "C#m",
     "F#m",
     "C#m",
     "Bm",
     "Bm",
     "E",
     "E"
    ],
    "bars": 16
   },
   {
    "section": "Verse 4",
    "chords": [
     "Am",
     "Am/G",
     "Am/F#",
     "Fmaj7",
     "Am",
     "G",
     "D",
     "E",
     "Am",
     "Am/G",
     "Am/F#",
     "Fmaj7",
     "Am",
     "G",
     "C",
     "E"
    ],
    "bars": 16
   },
   {
    "section": "Outro guitar solo (fade)",
    "chords": [
     "Am",
     "Am/G",
     "Am/F#",
     "Fmaj7",
     "Am",
     "G",
     "D",
     "E"
    ],
    "bars": 16
   }
  ],
  "solos": [
   {
    "section": "Guitar solo (over verse)",
    "scale": "A minor pentatonic, box 1 at 5th fret, adding the F# (Dorian 6th) over Am/F# and G# over E",
    "tips": "Use slow, singing bends with plenty of vibrato and leave space between phrases. Aim for the chord tone E or G# when the E chord arrives at the end of each line.",
    "chords": [
     "Am",
     "Am/G",
     "Am/F#",
     "Fmaj7",
     "Am",
     "G",
     "D",
     "E",
     "Am",
     "Am/G",
     "Am/F#",
     "Fmaj7",
     "Am",
     "G",
     "C",
     "E"
    ]
   },
   {
    "section": "Outro guitar solo (fade)",
    "scale": "A minor pentatonic, box 1 (5th fret) and box 2 (8th fret)",
    "tips": "Repeat a short phrase and vary only its ending to build intensity. Practise whole-step bends on the G string at the 7th fret until they are in tune.",
    "chords": [
     "Am",
     "Am/G",
     "Am/F#",
     "Fmaj7",
     "Am",
     "G",
     "D",
     "E"
    ]
   }
  ]
 },
 "Comfortably Numb": {
  "status": "corrected",
  "key": "B minor (choruses in D major)",
  "bpm": 64,
  "beatsPerBar": 4,
  "durationSec": 382,
  "chords": [
   "Bm",
   "A",
   "G",
   "Em",
   "D",
   "C"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "Bm"
    ],
    "bars": 2
   },
   {
    "section": "Verse 1",
    "chords": [
     "Bm",
     "Bm",
     "A",
     "A",
     "G",
     "G",
     "Em",
     "Bm"
    ],
    "bars": 16
   },
   {
    "section": "Chorus 1 (D major)",
    "chords": [
     "D",
     "A",
     "D",
     "A",
     "C",
     "G",
     "C",
     "G",
     "A",
     "G",
     "D",
     "D"
    ],
    "bars": 12
   },
   {
    "section": "Guitar solo 1 (over chorus chords)",
    "chords": [
     "D",
     "A",
     "D",
     "A",
     "C",
     "G",
     "C",
     "G"
    ],
    "bars": 16
   },
   {
    "section": "Verse 2",
    "chords": [
     "Bm",
     "Bm",
     "A",
     "A",
     "G",
     "G",
     "Em",
     "Bm"
    ],
    "bars": 16
   },
   {
    "section": "Chorus 2 (D major)",
    "chords": [
     "D",
     "A",
     "D",
     "A",
     "C",
     "G",
     "C",
     "G",
     "A",
     "G",
     "D",
     "D"
    ],
    "bars": 12
   },
   {
    "section": "Outro guitar solo (fade)",
    "chords": [
     "Bm",
     "A",
     "G",
     "D",
     "Em",
     "Em",
     "Bm",
     "Bm"
    ],
    "bars": 28
   }
  ],
  "solos": [
   {
    "section": "Guitar solo 1 (over chorus chords)",
    "scale": "D major pentatonic (same shape as B minor pentatonic, box 1 at 7th fret), adding C natural over the C chord",
    "tips": "Play slow melodic phrases that follow the chord changes; land on A over the A chord and on G over C/G. Use one-and-a-half-step bends sparingly and check they are in tune.",
    "chords": [
     "D",
     "A",
     "D",
     "A",
     "C",
     "G",
     "C",
     "G"
    ]
   },
   {
    "section": "Outro guitar solo (fade)",
    "scale": "B minor pentatonic, box 1 at 7th fret and box 1 an octave up at 19th fret; B natural minor colour notes (C#, G)",
    "tips": "Build intensity over the whole section: start low and sparse, finish high with faster repeated licks. Practise matching your bends to target pitches with a tuner.",
    "chords": [
     "Bm",
     "A",
     "G",
     "D",
     "Em",
     "Em",
     "Bm",
     "Bm"
    ]
   }
  ]
 },
 "Bamboléo": {
  "status": "uncertain",
  "key": "F# minor",
  "capoNote": "Capo 2 with Em-Am-B7 shapes is an easier option",
  "bpm": 120,
  "beatsPerBar": 4,
  "durationSec": 204,
  "chords": [
   "F#m",
   "Bm",
   "C#7"
  ],
  "structure": [
   {
    "section": "Intro (rumba guitar)",
    "chords": [
     "F#m",
     "C#7"
    ],
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "F#m",
     "C#7",
     "Bm",
     "C#7"
    ],
    "per": 2,
    "bars": 16
   },
   {
    "section": "Bridge (circle of fifths)",
    "chords": [
     "Bm",
     "E",
     "A",
     "D",
     "Bm",
     "C#7",
     "F#m",
     "F#m"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "F#m",
     "Bm",
     "C#7",
     "F#m"
    ],
    "per": 2,
    "bars": 16
   },
   {
    "section": "Verse 2",
    "chords": [
     "F#m",
     "C#7",
     "Bm",
     "C#7"
    ],
    "per": 2,
    "bars": 16
   },
   {
    "section": "Bridge (circle of fifths)",
    "chords": [
     "Bm",
     "E",
     "A",
     "D",
     "Bm",
     "C#7",
     "F#m",
     "F#m"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "F#m",
     "Bm",
     "C#7",
     "F#m"
    ],
    "per": 2,
    "bars": 16
   },
   {
    "section": "Guitar solo (flamenco break)",
    "chords": [
     "F#m",
     "C#7"
    ],
    "bars": 8
   },
   {
    "section": "Outro chorus",
    "chords": [
     "F#m",
     "Bm",
     "C#7",
     "F#m"
    ],
    "per": 2,
    "bars": 6
   }
  ],
  "solos": [
   {
    "section": "Guitar solo (flamenco break)",
    "scale": "F# harmonic minor (E# leading note) around the 2nd to 5th frets, or F# Phrygian dominant over the C#7",
    "tips": "Keep the rumba strum going in your head and play short bursts in time with it. Resolve each phrase from E# (F natural) up to F# when the chord returns to F#m.",
    "chords": [
     "F#m",
     "C#7"
    ]
   }
  ]
 },
 "Stairway to Heaven": {
  "status": "corrected",
  "key": "A minor",
  "bpm": 72,
  "beatsPerBar": 4,
  "durationSec": 480,
  "chords": [
   "Am",
   "Am/G#",
   "C/G",
   "D/F#",
   "Fmaj7",
   "G"
  ],
  "structure": [
   {
    "section": "Intro (fingerpicked, recorders)",
    "chords": [
     "Am",
     "Am/G#",
     "C/G",
     "D/F#",
     "Fmaj7",
     "G",
     "Am",
     "Am",
     "C",
     "D",
     "Fmaj7",
     "Am",
     "C",
     "G",
     "D",
     "D"
    ],
    "per": 0.5,
    "bars": 16
   },
   {
    "section": "Verse 1",
    "chords": [
     "Am",
     "Am/G#",
     "C/G",
     "D/F#",
     "Fmaj7",
     "G",
     "Am",
     "Am",
     "C",
     "D",
     "Fmaj7",
     "Am",
     "C",
     "G",
     "D",
     "D"
    ],
    "per": 0.5,
    "bars": 12
   },
   {
    "section": "Verse 2",
    "chords": [
     "Am",
     "Am/G#",
     "C/G",
     "D/F#",
     "Fmaj7",
     "G",
     "Am",
     "Am",
     "C",
     "D",
     "Fmaj7",
     "Am",
     "C",
     "G",
     "D",
     "D"
    ],
    "per": 0.5,
    "bars": 12
   },
   {
    "section": "Middle section 1 (electric 12-string)",
    "chords": [
     "Am7",
     "Dsus4",
     "Am7",
     "Em",
     "D",
     "D"
    ],
    "bars": 11
   },
   {
    "section": "Fanfare interlude",
    "chords": [
     "C",
     "D/F#",
     "Fmaj7",
     "Am",
     "C",
     "G",
     "D",
     "D"
    ],
    "per": 0.5,
    "bars": 3
   },
   {
    "section": "Verse 3",
    "chords": [
     "Am7",
     "Dsus4",
     "Am7",
     "Em",
     "D",
     "D"
    ],
    "bars": 11
   },
   {
    "section": "Middle section 2",
    "chords": [
     "Am7",
     "Dsus4",
     "Am7",
     "Em",
     "D",
     "D"
    ],
    "bars": 11
   },
   {
    "section": "Strummed section (drums enter, slightly faster)",
    "chords": [
     "C",
     "G",
     "Am",
     "Am",
     "C",
     "G",
     "F",
     "F"
    ],
    "per": 0.5,
    "bars": 20
   },
   {
    "section": "Pre-solo fanfare",
    "chords": [
     "Am",
     "G",
     "D",
     "C"
    ],
    "bars": 4
   },
   {
    "section": "Guitar solo (about 98 BPM; bars counted at 72 BPM)",
    "chords": [
     "Am",
     "G",
     "F"
    ],
    "per": 0.75,
    "bars": 21
   },
   {
    "section": "Final hard-rock section (about 98 BPM; bars counted at 72 BPM)",
    "chords": [
     "Am",
     "G",
     "F",
     "G"
    ],
    "per": 0.75,
    "bars": 18
   },
   {
    "section": "Ending (solo vocal)",
    "chords": [
     "Am"
    ],
    "bars": 5
   }
  ],
  "solos": [
   {
    "section": "Guitar solo (about 98 BPM; bars counted at 72 BPM)",
    "scale": "A minor pentatonic, box 1 at 5th fret and the extended box up to the 12th-17th frets; A natural minor colour notes (B, F)",
    "tips": "Start with phrases that repeat over each Am-G-F cycle, then let them climb up the neck. Practise in time with a backing loop of Am-G-F before trying to match the record's speed.",
    "chords": [
     "Am",
     "G",
     "F"
    ]
   }
  ]
 },
 "Something Just Like This": {
  "status": "uncertain",
  "key": "B minor",
  "bpm": 103,
  "beatsPerBar": 4,
  "durationSec": 247,
  "chords": [
   "G",
   "A",
   "Bm",
   "A"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "G",
     "A",
     "Bm",
     "A"
    ],
    "bars": 4
   },
   {
    "section": "Verse 1",
    "chords": [
     "G",
     "A",
     "Bm",
     "A"
    ],
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "G",
     "A",
     "Bm",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "G",
     "A",
     "Bm",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Drop (post-chorus)",
    "chords": [
     "G",
     "A",
     "Bm",
     "A"
    ],
    "bars": 16
   },
   {
    "section": "Verse 2",
    "chords": [
     "G",
     "A",
     "Bm",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "G",
     "A",
     "Bm",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "G",
     "A",
     "Bm",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Drop (post-chorus)",
    "chords": [
     "G",
     "A",
     "Bm",
     "A"
    ],
    "bars": 16
   },
   {
    "section": "Bridge",
    "chords": [
     "G",
     "A",
     "Bm",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Final chorus",
    "chords": [
     "G",
     "A",
     "Bm",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Outro",
    "chords": [
     "G",
     "A",
     "Bm",
     "A"
    ],
    "bars": 4
   }
  ],
  "pianoVideo": {
   "id": "4u6bWs-ZG0o",
   "title": "The Chainsmokers & Coldplay - Something Just Like This (Live at the BRITs)",
   "channel": "ChainsmokersVEVO"
  }
 },
 "Angels": {
  "status": "uncertain",
  "key": "E major",
  "bpm": 75,
  "beatsPerBar": 4,
  "durationSec": 256,
  "chords": [
   "B",
   "C#m",
   "A",
   "E"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "E",
     "E",
     "A",
     "A"
    ],
    "bars": 4
   },
   {
    "section": "Verse 1",
    "chords": [
     "E",
     "E",
     "A",
     "A",
     "E",
     "E",
     "A",
     "A",
     "C#m",
     "C#m",
     "B",
     "B",
     "A",
     "A",
     "A",
     "A"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "B",
     "C#m",
     "A",
     "E"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "E",
     "E",
     "A",
     "A",
     "E",
     "E",
     "A",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "B",
     "C#m",
     "A",
     "E"
    ],
    "bars": 8
   },
   {
    "section": "Bridge",
    "chords": [
     "C#m",
     "B",
     "A",
     "A"
    ],
    "bars": 8
   },
   {
    "section": "Chorus (breakdown)",
    "chords": [
     "B",
     "C#m",
     "A",
     "E"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "B",
     "C#m",
     "A",
     "E"
    ],
    "bars": 8
   },
   {
    "section": "Final chorus",
    "chords": [
     "B",
     "C#m",
     "A",
     "E"
    ],
    "bars": 8
   },
   {
    "section": "Outro",
    "chords": [
     "E"
    ],
    "bars": 4
   }
  ]
 },
 "My Way": {
  "status": "uncertain",
  "key": "D major",
  "bpm": 76,
  "beatsPerBar": 4,
  "durationSec": 272,
  "chords": [
   "D",
   "F#m/C#",
   "Am/C",
   "B7",
   "Em",
   "A7"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "D",
     "Dmaj7"
    ],
    "bars": 2
   },
   {
    "section": "Verse 1",
    "chords": [
     "D",
     "F#m/C#",
     "Am/C",
     "B7",
     "Em",
     "Em/D",
     "A7",
     "A7",
     "D",
     "D7",
     "G",
     "Gm",
     "D/A",
     "A7",
     "D",
     "D"
    ],
    "bars": 16
   },
   {
    "section": "Verse 2",
    "chords": [
     "D",
     "F#m/C#",
     "Am/C",
     "B7",
     "Em",
     "Em/D",
     "A7",
     "A7",
     "D",
     "D7",
     "G",
     "Gm",
     "D/A",
     "A7",
     "D",
     "D"
    ],
    "bars": 16
   },
   {
    "section": "Verse 3",
    "chords": [
     "D",
     "F#m/C#",
     "Am/C",
     "B7",
     "Em",
     "Em/D",
     "A7",
     "A7",
     "D",
     "D7",
     "G",
     "Gm",
     "D/A",
     "A7",
     "D",
     "D"
    ],
    "bars": 16
   },
   {
    "section": "Verse 4",
    "chords": [
     "D",
     "F#m/C#",
     "Am/C",
     "B7",
     "Em",
     "Em/D",
     "A7",
     "A7",
     "D",
     "D7",
     "G",
     "Gm",
     "D/A",
     "A7",
     "D",
     "D"
    ],
    "bars": 16
   },
   {
    "section": "Verse 5 (key change to Eb)",
    "chords": [
     "Eb",
     "Gm/D",
     "Bbm/Db",
     "C7",
     "Fm",
     "Fm/Eb",
     "Bb7",
     "Bb7",
     "Eb",
     "Eb7",
     "Ab",
     "Abm",
     "Eb/Bb",
     "Bb7",
     "Eb",
     "Eb"
    ],
    "bars": 16
   },
   {
    "section": "Ending",
    "chords": [
     "Eb"
    ],
    "bars": 4
   }
  ]
 },
 "Lose Control": {
  "status": "corrected",
  "key": "F# minor",
  "bpm": 54,
  "beatsPerBar": 4,
  "durationSec": 213,
  "chords": [
   "F#m",
   "A",
   "D",
   "C#sus4",
   "C#"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "F#m",
     "A"
    ],
    "bars": 2
   },
   {
    "section": "Verse 1",
    "chords": [
     "F#m",
     "F#m",
     "A",
     "A",
     "D",
     "D",
     "C#sus4",
     "C#"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "F#m",
     "F#m",
     "A",
     "A",
     "D",
     "D",
     "C#sus4",
     "C#"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "F#m",
     "F#m",
     "A",
     "A",
     "D",
     "D",
     "C#sus4",
     "C#"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "F#m",
     "F#m",
     "A",
     "A",
     "D",
     "D",
     "C#sus4",
     "C#"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Bridge (breakdown)",
    "chords": [
     "F#m",
     "F#m",
     "A",
     "A",
     "D",
     "D",
     "C#sus4",
     "C#"
    ],
    "per": 0.5,
    "bars": 4
   },
   {
    "section": "Final chorus",
    "chords": [
     "F#m",
     "F#m",
     "A",
     "A",
     "D",
     "D",
     "C#sus4",
     "C#"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Outro",
    "chords": [
     "F#m"
    ],
    "bars": 2
   }
  ]
 },
 "Aïcha": {
  "status": "corrected",
  "key": "G minor",
  "bpm": 85,
  "beatsPerBar": 4,
  "durationSec": 260,
  "chords": [
   "Gm",
   "Eb",
   "Bb",
   "F"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "Gm",
     "Eb",
     "Bb",
     "F"
    ],
    "bars": 4
   },
   {
    "section": "Verse 1",
    "chords": [
     "Gm",
     "Eb",
     "Bb",
     "F"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "Gm",
     "Eb",
     "Bb",
     "F"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "Gm",
     "Eb",
     "Bb",
     "F"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "Gm",
     "Eb",
     "Bb",
     "F"
    ],
    "bars": 8
   },
   {
    "section": "Verse 3 (Arabic)",
    "chords": [
     "Gm",
     "Eb",
     "Bb",
     "F"
    ],
    "bars": 16
   },
   {
    "section": "Instrumental",
    "chords": [
     "Gm",
     "Eb",
     "Bb",
     "F"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "Gm",
     "Eb",
     "Bb",
     "F"
    ],
    "bars": 8
   },
   {
    "section": "Outro",
    "chords": [
     "Gm",
     "Eb",
     "Bb",
     "F"
    ],
    "bars": 8
   }
  ],
  "solos": [
   {
    "section": "Instrumental",
    "scale": "G minor pentatonic, box 1 at 3rd fret; add A and Eb from G natural minor for colour (F# from G harmonic minor gives the raï flavour)",
    "tips": "Land on the root of each chord (G, Eb, Bb, F) on beat 1 of every bar. Use slow slides between notes to imitate the vocal ornaments.",
    "chords": [
     "Gm",
     "Eb",
     "Bb",
     "F"
    ]
   }
  ]
 },
 "Shchedryk": {
  "status": "uncertain",
  "key": "G minor",
  "bpm": 150,
  "beatsPerBar": 3,
  "durationSec": 90,
  "chords": [
   "Gm",
   "F",
   "Eb",
   "D"
  ],
  "structure": [
   {
    "section": "Ostinato intro",
    "chords": [
     "Gm"
    ],
    "bars": 4
   },
   {
    "section": "Theme A",
    "chords": [
     "Gm"
    ],
    "bars": 8
   },
   {
    "section": "Theme A (more voices)",
    "chords": [
     "Gm",
     "Gm",
     "F",
     "Gm"
    ],
    "bars": 8
   },
   {
    "section": "Theme B (descending bass)",
    "chords": [
     "Gm",
     "F",
     "Eb",
     "D"
    ],
    "per": 2,
    "bars": 8
   },
   {
    "section": "Theme B repeat",
    "chords": [
     "Gm",
     "F",
     "Eb",
     "D"
    ],
    "per": 2,
    "bars": 8
   },
   {
    "section": "Middle section",
    "chords": [
     "Eb",
     "Bb",
     "F",
     "Gm",
     "Cm",
     "Gm",
     "D",
     "Gm"
    ],
    "bars": 8
   },
   {
    "section": "Theme return",
    "chords": [
     "Gm",
     "F",
     "Eb",
     "D"
    ],
    "per": 2,
    "bars": 16
   },
   {
    "section": "Coda (fading ostinato, ritardando)",
    "chords": [
     "Gm"
    ],
    "bars": 8
   }
  ]
 },
 "Zorba's Dance": {
  "status": "uncertain",
  "key": "G major",
  "bpm": 120,
  "beatsPerBar": 4,
  "durationSec": 240,
  "chords": [
   "G",
   "Am",
   "D7",
   "G"
  ],
  "structure": [
   {
    "section": "Slow intro (bouzouki, free tempo)",
    "chords": [
     "G",
     "Am",
     "G",
     "Am",
     "G",
     "Am",
     "D7",
     "G"
    ],
    "bars": 8
   },
   {
    "section": "Slow theme A",
    "chords": [
     "G",
     "Am",
     "G",
     "Am",
     "G",
     "Am",
     "D7",
     "G"
    ],
    "bars": 16
   },
   {
    "section": "Slow theme B",
    "chords": [
     "G7",
     "C",
     "G",
     "Am",
     "G",
     "Am",
     "D7",
     "G"
    ],
    "bars": 8
   },
   {
    "section": "Theme A (tempo picks up)",
    "chords": [
     "G",
     "Am",
     "G",
     "Am",
     "G",
     "Am",
     "D7",
     "G"
    ],
    "bars": 8
   },
   {
    "section": "Fast theme A",
    "chords": [
     "G",
     "Am",
     "G",
     "Am",
     "G",
     "Am",
     "D7",
     "G"
    ],
    "bars": 16
   },
   {
    "section": "Fast theme B",
    "chords": [
     "G7",
     "C",
     "G",
     "Am",
     "G",
     "Am",
     "D7",
     "G"
    ],
    "bars": 8
   },
   {
    "section": "Fast section (dominant-tonic vamp)",
    "chords": [
     "D7",
     "G"
    ],
    "bars": 16
   },
   {
    "section": "Faster theme A",
    "chords": [
     "G",
     "Am",
     "G",
     "Am",
     "G",
     "Am",
     "D7",
     "G"
    ],
    "bars": 16
   },
   {
    "section": "Fastest section",
    "chords": [
     "D7",
     "G"
    ],
    "bars": 16
   },
   {
    "section": "Coda",
    "chords": [
     "D7",
     "G",
     "D7",
     "G",
     "G",
     "G"
    ],
    "bars": 6
   }
  ]
 },
 "Şımarık": {
  "status": "uncertain",
  "key": "A minor",
  "bpm": 97,
  "beatsPerBar": 4,
  "durationSec": 237,
  "chords": [
   "Am",
   "G",
   "Em",
   "Am"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "Am",
     "Em",
     "G",
     "Am"
    ],
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "Am",
     "G",
     "Em",
     "Am"
    ],
    "bars": 8
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "F",
     "G",
     "F",
     "G",
     "F",
     "G",
     "F",
     "E"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "Am",
     "G",
     "Em",
     "Am",
     "Am",
     "G",
     "Em",
     "Am"
    ],
    "bars": 16
   },
   {
    "section": "Instrumental",
    "chords": [
     "Am",
     "Em",
     "G",
     "Am"
    ],
    "bars": 4
   },
   {
    "section": "Verse 2",
    "chords": [
     "Am",
     "G",
     "Em",
     "Am"
    ],
    "bars": 8
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "F",
     "G",
     "F",
     "G",
     "F",
     "G",
     "F",
     "E"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "Am",
     "G",
     "Em",
     "Am",
     "Am",
     "G",
     "Em",
     "Am"
    ],
    "bars": 16
   },
   {
    "section": "Bridge",
    "chords": [
     "Am",
     "E7",
     "Am",
     "F",
     "E",
     "Am",
     "E7",
     "Am"
    ],
    "bars": 8
   },
   {
    "section": "Final chorus",
    "chords": [
     "Am",
     "G",
     "Em",
     "Am",
     "Am",
     "G",
     "Em",
     "Am"
    ],
    "bars": 16
   }
  ]
 },
 "Blank Space": {
  "status": "corrected",
  "key": "F major",
  "bpm": 96,
  "beatsPerBar": 4,
  "durationSec": 231,
  "chords": [
   "F",
   "Dm",
   "Gm",
   "Bb"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "F"
    ],
    "bars": 2
   },
   {
    "section": "Verse 1",
    "chords": [
     "F",
     "Dm",
     "Bb",
     "C"
    ],
    "bars": 16
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "F",
     "Dm",
     "Gm",
     "Bb"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "F",
     "Dm",
     "Gm",
     "Bb"
    ],
    "bars": 16
   },
   {
    "section": "Verse 2",
    "chords": [
     "F",
     "Dm",
     "Bb",
     "C"
    ],
    "bars": 8
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "F",
     "Dm",
     "Gm",
     "Bb"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "F",
     "Dm",
     "Gm",
     "Bb"
    ],
    "bars": 16
   },
   {
    "section": "Bridge",
    "chords": [
     "F",
     "Dm",
     "Gm",
     "Bb"
    ],
    "bars": 8
   },
   {
    "section": "Final chorus",
    "chords": [
     "F",
     "Dm",
     "Gm",
     "Bb"
    ],
    "bars": 16
   }
  ]
 },
 "Bad Romance": {
  "status": "corrected",
  "key": "A minor",
  "bpm": 119,
  "beatsPerBar": 4,
  "durationSec": 294,
  "chords": [
   "F",
   "G",
   "Am",
   "C"
  ],
  "structure": [
   {
    "section": "Intro (a cappella chorus)",
    "chords": [
     "F",
     "G",
     "Am",
     "C",
     "F",
     "G",
     "E",
     "Am"
    ],
    "bars": 8
   },
   {
    "section": "Hook",
    "chords": [
     "Am",
     "Am",
     "Fmaj7",
     "Fmaj7"
    ],
    "bars": 8
   },
   {
    "section": "Synth intro",
    "chords": [
     "Am"
    ],
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "Am",
     "C",
     "F",
     "F",
     "Am",
     "C",
     "G",
     "G"
    ],
    "bars": 8
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "F",
     "G",
     "Am",
     "C"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "F",
     "G",
     "Am",
     "C",
     "F",
     "G",
     "E",
     "Am"
    ],
    "bars": 16
   },
   {
    "section": "Post-chorus hook",
    "chords": [
     "Am",
     "Am",
     "Fmaj7",
     "Fmaj7"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "Am",
     "C",
     "F",
     "F",
     "Am",
     "C",
     "G",
     "G"
    ],
    "bars": 8
   },
   {
    "section": "Pre-chorus",
    "chords": [
     "F",
     "G",
     "Am",
     "C"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "F",
     "G",
     "Am",
     "C",
     "F",
     "G",
     "E",
     "Am"
    ],
    "bars": 16
   },
   {
    "section": "Post-chorus hook",
    "chords": [
     "Am",
     "Am",
     "Fmaj7",
     "Fmaj7"
    ],
    "bars": 8
   },
   {
    "section": "Spoken bridge",
    "chords": [
     "Am"
    ],
    "bars": 8
   },
   {
    "section": "Bridge",
    "chords": [
     "F",
     "G",
     "Am",
     "C"
    ],
    "bars": 8
   },
   {
    "section": "Final chorus",
    "chords": [
     "F",
     "G",
     "Am",
     "C",
     "F",
     "G",
     "E",
     "Am"
    ],
    "bars": 16
   },
   {
    "section": "Outro hook",
    "chords": [
     "Am",
     "Am",
     "Fmaj7",
     "Fmaj7"
    ],
    "bars": 8
   }
  ]
 },
 "What Was I Made For?": {
  "status": "uncertain",
  "key": "C major",
  "bpm": 78,
  "beatsPerBar": 4,
  "durationSec": 222,
  "chords": [
   "C",
   "Em",
   "Fmaj7"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "C",
     "Em",
     "Fmaj7",
     "Fmaj7"
    ],
    "bars": 4
   },
   {
    "section": "Verse 1",
    "chords": [
     "C",
     "Em",
     "Fmaj7",
     "Fmaj7"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "C",
     "Em",
     "Fmaj7",
     "Fmaj7"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "Fmaj7",
     "Fmaj7",
     "C",
     "Em"
    ],
    "bars": 8
   },
   {
    "section": "Verse 3",
    "chords": [
     "C",
     "Em",
     "Fmaj7",
     "Fmaj7"
    ],
    "bars": 8
   },
   {
    "section": "Chorus",
    "chords": [
     "Fmaj7",
     "Fmaj7",
     "C",
     "Em"
    ],
    "bars": 8
   },
   {
    "section": "Bridge (wordless)",
    "chords": [
     "C",
     "Em",
     "Fmaj7",
     "Fmaj7"
    ],
    "bars": 8
   },
   {
    "section": "Final chorus",
    "chords": [
     "Fmaj7",
     "Fmaj7",
     "C",
     "Em"
    ],
    "bars": 8
   },
   {
    "section": "Outro",
    "chords": [
     "C",
     "Em",
     "Fmaj7",
     "C"
    ],
    "bars": 8
   }
  ]
 },
 "Ocean Eyes": {
  "status": "corrected",
  "key": "E minor",
  "bpm": 145,
  "beatsPerBar": 4,
  "durationSec": 200,
  "chords": [
   "C",
   "D",
   "Em"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "C",
     "D",
     "Em",
     "Em"
    ],
    "per": 2,
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "C",
     "D",
     "Em",
     "Em"
    ],
    "per": 2,
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "C",
     "D",
     "Em",
     "Em"
    ],
    "per": 2,
    "bars": 16
   },
   {
    "section": "Verse 2",
    "chords": [
     "C",
     "D",
     "Em",
     "Em"
    ],
    "per": 2,
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "C",
     "D",
     "Em",
     "Em"
    ],
    "per": 2,
    "bars": 16
   },
   {
    "section": "Bridge",
    "chords": [
     "C",
     "D",
     "Em",
     "Em"
    ],
    "per": 2,
    "bars": 16
   },
   {
    "section": "Final chorus",
    "chords": [
     "C",
     "D",
     "Em",
     "Em"
    ],
    "per": 2,
    "bars": 16
   },
   {
    "section": "Outro",
    "chords": [
     "C",
     "D",
     "Em",
     "Em"
    ],
    "per": 2,
    "bars": 16
   }
  ]
 },
 "When the Party's Over": {
  "status": "corrected",
  "key": "C# minor (relative of E major)",
  "bpm": 124,
  "beatsPerBar": 3,
  "durationSec": 196,
  "chords": [
   "A",
   "B",
   "C#m",
   "E"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "A",
     "A",
     "B",
     "B",
     "C#m",
     "C#m",
     "B",
     "E"
    ],
    "bars": 8
   },
   {
    "section": "Verse 1 (near a cappella)",
    "chords": [
     "A",
     "A",
     "B",
     "B",
     "C#m",
     "C#m",
     "B",
     "E"
    ],
    "bars": 32
   },
   {
    "section": "Chorus",
    "chords": [
     "Amaj7",
     "Amaj7",
     "Bsus4",
     "Bsus4",
     "C#m7",
     "C#m7",
     "B",
     "E"
    ],
    "bars": 16
   },
   {
    "section": "Verse 2",
    "chords": [
     "A",
     "A",
     "B",
     "B",
     "C#m",
     "C#m",
     "B",
     "E"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "Amaj7",
     "Amaj7",
     "Bsus4",
     "Bsus4",
     "C#m7",
     "C#m7",
     "B",
     "E"
    ],
    "bars": 16
   },
   {
    "section": "Bridge",
    "chords": [
     "A",
     "A",
     "B",
     "B",
     "C#m",
     "C#m",
     "B",
     "E"
    ],
    "bars": 16
   },
   {
    "section": "Final chorus",
    "chords": [
     "Amaj7",
     "Amaj7",
     "Bsus4",
     "Bsus4",
     "C#m7",
     "C#m7",
     "B",
     "E"
    ],
    "bars": 16
   },
   {
    "section": "Outro",
    "chords": [
     "A",
     "A",
     "B",
     "B",
     "C#m",
     "C#m",
     "B",
     "E"
    ],
    "bars": 16
   }
  ]
 },
 "Karma Police": {
  "status": "corrected",
  "key": "A minor (verse, A Dorian colour); chorus centres on G major; outro in B minor",
  "bpm": 75,
  "beatsPerBar": 4,
  "durationSec": 264,
  "chords": [
   "Am",
   "D/F#",
   "Em",
   "G"
  ],
  "structure": [
   {
    "section": "Intro (piano)",
    "chords": [
     "Am",
     "D/F#",
     "Em",
     "G",
     "Am",
     "F",
     "Em",
     "G"
    ],
    "per": 0.5,
    "bars": 4
   },
   {
    "section": "Verse 1",
    "chords": [
     "Am",
     "D/F#",
     "Em",
     "G",
     "Am",
     "F",
     "Em",
     "G"
    ],
    "per": 0.5,
    "bars": 16
   },
   {
    "section": "Chorus 1",
    "chords": [
     "C",
     "D",
     "G",
     "F#"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "Am",
     "D/F#",
     "Em",
     "G",
     "Am",
     "F",
     "Em",
     "G"
    ],
    "per": 0.5,
    "bars": 16
   },
   {
    "section": "Chorus 2",
    "chords": [
     "C",
     "D",
     "G",
     "F#"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Outro section (B minor)",
    "chords": [
     "Bm",
     "D",
     "G",
     "D",
     "G",
     "D",
     "E",
     "F#"
    ],
    "bars": 16
   },
   {
    "section": "Ending (delay feedback)",
    "chords": [
     "Bm"
    ],
    "bars": 12
   }
  ]
 },
 "No Surprises": {
  "status": "corrected",
  "key": "F major",
  "bpm": 76,
  "beatsPerBar": 4,
  "durationSec": 229,
  "chords": [
   "F",
   "Bb/D",
   "Gm7",
   "C"
  ],
  "structure": [
   {
    "section": "Intro (guitar and glockenspiel)",
    "chords": [
     "F",
     "Bbm6"
    ],
    "bars": 4
   },
   {
    "section": "Verse 1",
    "chords": [
     "F",
     "Bb/D",
     "Gm7",
     "C"
    ],
    "bars": 8
   },
   {
    "section": "Chorus 1",
    "chords": [
     "Gm7",
     "C7"
    ],
    "bars": 6
   },
   {
    "section": "Interlude",
    "chords": [
     "F",
     "Bbm6"
    ],
    "bars": 4
   },
   {
    "section": "Verse 2",
    "chords": [
     "F",
     "Bb/D",
     "Gm7",
     "C"
    ],
    "bars": 8
   },
   {
    "section": "Chorus 2",
    "chords": [
     "Gm7",
     "C7"
    ],
    "bars": 6
   },
   {
    "section": "Interlude",
    "chords": [
     "F",
     "Bbm6"
    ],
    "bars": 4
   },
   {
    "section": "Bridge",
    "chords": [
     "C",
     "Bbm7"
    ],
    "bars": 8
   },
   {
    "section": "Verse 3",
    "chords": [
     "F",
     "Bb/D",
     "Gm7",
     "C"
    ],
    "bars": 8
   },
   {
    "section": "Chorus 3",
    "chords": [
     "Gm7",
     "C7"
    ],
    "bars": 6
   },
   {
    "section": "Outro",
    "chords": [
     "F",
     "Bbm6"
    ],
    "bars": 8
   }
  ]
 },
 "Sweet Home Alabama": {
  "status": "corrected",
  "key": "D Mixolydian (D major with C natural)",
  "bpm": 98,
  "beatsPerBar": 4,
  "durationSec": 284,
  "chords": [
   "D",
   "Cadd9",
   "G"
  ],
  "structure": [
   {
    "section": "Intro (count-in and riff)",
    "chords": [
     "D",
     "Cadd9",
     "G",
     "G"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "D",
     "Cadd9",
     "G",
     "G"
    ],
    "per": 0.5,
    "bars": 16
   },
   {
    "section": "Chorus 1",
    "chords": [
     "D",
     "Cadd9",
     "G",
     "G"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Guitar solo 1 (short)",
    "chords": [
     "D",
     "Cadd9",
     "G",
     "G"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Verse 2",
    "chords": [
     "D",
     "Cadd9",
     "G",
     "G"
    ],
    "per": 0.5,
    "bars": 16
   },
   {
    "section": "Chorus 2",
    "chords": [
     "D",
     "Cadd9",
     "G",
     "G"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Bridge",
    "chords": [
     "F",
     "C",
     "D",
     "D"
    ],
    "bars": 8
   },
   {
    "section": "Guitar solo 2",
    "chords": [
     "D",
     "Cadd9",
     "G",
     "G"
    ],
    "per": 0.5,
    "bars": 16
   },
   {
    "section": "Verse 3 (quiet)",
    "chords": [
     "D",
     "Cadd9",
     "G",
     "G"
    ],
    "per": 0.5,
    "bars": 16
   },
   {
    "section": "Chorus 3",
    "chords": [
     "D",
     "Cadd9",
     "G",
     "G"
    ],
    "per": 0.5,
    "bars": 8
   },
   {
    "section": "Outro solo with piano (fade)",
    "chords": [
     "D",
     "Cadd9",
     "G",
     "G"
    ],
    "per": 0.5,
    "bars": 12
   }
  ],
  "solos": [
   {
    "section": "Guitar solo 1 (short)",
    "scale": "D major pentatonic (same shape as B minor pentatonic box 1 at 7th fret), add C natural for D Mixolydian colour",
    "tips": "Aim phrase endings at the D, C or G chord tone under each change. Keep it bright and bouncy with double-stops and light bends.",
    "chords": [
     "D",
     "Cadd9",
     "G",
     "G"
    ]
   },
   {
    "section": "Guitar solo 2",
    "scale": "D major pentatonic / D Mixolydian, moving up to the 10th-14th fret area (D major pentatonic shape rooted at 10th fret)",
    "tips": "Practise the D-C-G two-bar cycle slowly with a metronome at 70 BPM before soloing over it. Use repeated short licks that land on the 3rd (F#) over D.",
    "chords": [
     "D",
     "Cadd9",
     "G",
     "G"
    ]
   },
   {
    "section": "Outro solo with piano (fade)",
    "scale": "D major pentatonic / D Mixolydian",
    "tips": "Leave space for the piano fills; trade short phrases rather than playing constantly.",
    "chords": [
     "D",
     "Cadd9",
     "G",
     "G"
    ]
   }
  ]
 },
 "Wonderful Tonight": {
  "status": "verified",
  "key": "G major",
  "bpm": 95,
  "beatsPerBar": 4,
  "durationSec": 225,
  "chords": [
   "G",
   "D/F#",
   "C",
   "D"
  ],
  "structure": [
   {
    "section": "Intro (guitar riff)",
    "chords": [
     "G",
     "D/F#",
     "C",
     "D"
    ],
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "G",
     "D/F#",
     "C",
     "D"
    ],
    "bars": 8
   },
   {
    "section": "Verse 1b",
    "chords": [
     "C",
     "D",
     "G",
     "D/F#",
     "Em",
     "C",
     "D",
     "G"
    ],
    "bars": 8
   },
   {
    "section": "Guitar riff",
    "chords": [
     "G",
     "D/F#",
     "C",
     "D"
    ],
    "bars": 4
   },
   {
    "section": "Verse 2",
    "chords": [
     "G",
     "D/F#",
     "C",
     "D"
    ],
    "bars": 8
   },
   {
    "section": "Verse 2b",
    "chords": [
     "C",
     "D",
     "G",
     "D/F#",
     "Em",
     "C",
     "D",
     "G"
    ],
    "bars": 8
   },
   {
    "section": "Guitar riff",
    "chords": [
     "G",
     "D/F#",
     "C",
     "D"
    ],
    "bars": 4
   },
   {
    "section": "Bridge",
    "chords": [
     "C",
     "D",
     "G",
     "D/F#",
     "Em",
     "C",
     "D",
     "C",
     "D",
     "G",
     "G"
    ],
    "bars": 11
   },
   {
    "section": "Verse 3",
    "chords": [
     "G",
     "D/F#",
     "C",
     "D"
    ],
    "bars": 8
   },
   {
    "section": "Verse 3b",
    "chords": [
     "C",
     "D",
     "G",
     "D/F#",
     "Em",
     "C",
     "D",
     "G"
    ],
    "bars": 8
   },
   {
    "section": "Outro (guitar riff and lead)",
    "chords": [
     "G",
     "D/F#",
     "C",
     "D"
    ],
    "bars": 12
   }
  ],
  "solos": [
   {
    "section": "Outro (guitar riff and lead)",
    "scale": "G major pentatonic (E minor pentatonic box 1 at 12th fret, or box at 3rd fret), G major scale colour notes",
    "tips": "Play slowly and let each note ring; aim for the chord root on the first beat of each bar (G, F#, C, D). Use gentle bends and plenty of space rather than fast runs.",
    "chords": [
     "G",
     "D/F#",
     "C",
     "D"
    ]
   }
  ]
 },
 "Over the Rainbow": {
  "status": "corrected",
  "key": "C major",
  "tuning": "standard (ukulele, GCEA)",
  "bpm": 85,
  "beatsPerBar": 4,
  "durationSec": 308,
  "chords": [
   "C",
   "Em",
   "F",
   "C",
   "G",
   "Am"
  ],
  "structure": [
   {
    "section": "Intro (hummed)",
    "chords": [
     "C",
     "Em7",
     "Am",
     "F",
     "C",
     "G",
     "Am",
     "F"
    ],
    "bars": 8
   },
   {
    "section": "Verse A",
    "chords": [
     "C",
     "Em",
     "F",
     "C",
     "F",
     "E7",
     "Am",
     "F"
    ],
    "bars": 16
   },
   {
    "section": "Verse B",
    "chords": [
     "C",
     "G",
     "Am",
     "F"
    ],
    "bars": 8
   },
   {
    "section": "Verse A",
    "chords": [
     "C",
     "Em",
     "F",
     "C",
     "F",
     "E7",
     "Am",
     "F"
    ],
    "bars": 8
   },
   {
    "section": "Wonderful World medley",
    "chords": [
     "C",
     "Em",
     "F",
     "C",
     "F",
     "E7",
     "Am",
     "F",
     "C",
     "G",
     "Am",
     "F",
     "C",
     "G",
     "Am",
     "F"
    ],
    "bars": 32
   },
   {
    "section": "Verse B",
    "chords": [
     "C",
     "G",
     "Am",
     "F"
    ],
    "bars": 8
   },
   {
    "section": "Verse A",
    "chords": [
     "C",
     "Em",
     "F",
     "C",
     "F",
     "E7",
     "Am",
     "F"
    ],
    "bars": 8
   },
   {
    "section": "Outro (hummed)",
    "chords": [
     "C",
     "Em7",
     "Am",
     "F",
     "C",
     "G",
     "Am",
     "F"
    ],
    "bars": 16
   }
  ]
 },
 "Chasing Cars": {
  "status": "corrected",
  "key": "A major",
  "bpm": 104,
  "beatsPerBar": 4,
  "durationSec": 267,
  "chords": [
   "A",
   "E/G#",
   "D"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "A",
     "E/G#",
     "D",
     "D"
    ],
    "bars": 8
   },
   {
    "section": "Verse 1",
    "chords": [
     "A",
     "E/G#",
     "D",
     "D"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "A",
     "E/G#",
     "D",
     "D"
    ],
    "bars": 16
   },
   {
    "section": "Verse 2",
    "chords": [
     "A",
     "E/G#",
     "D",
     "D"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "A",
     "E/G#",
     "D",
     "D"
    ],
    "bars": 16
   },
   {
    "section": "Bridge (builds)",
    "chords": [
     "A",
     "E/G#",
     "D",
     "D"
    ],
    "bars": 16
   },
   {
    "section": "Final chorus",
    "chords": [
     "A",
     "E/G#",
     "D",
     "D"
    ],
    "bars": 16
   },
   {
    "section": "Outro",
    "chords": [
     "A",
     "E/G#",
     "D",
     "D"
    ],
    "bars": 12
   }
  ]
 },
 "Happy": {
  "status": "corrected",
  "key": "F minor (F Dorian verses)",
  "bpm": 160,
  "beatsPerBar": 4,
  "durationSec": 233,
  "chords": [
   "Fm7",
   "Bb7",
   "Cm7",
   "Dbmaj7"
  ],
  "structure": [
   {
    "section": "Intro",
    "chords": [
     "Fm7",
     "Fm7/Ab",
     "Bb7",
     "Cm7"
    ],
    "per": 0.5,
    "bars": 4
   },
   {
    "section": "Verse 1",
    "chords": [
     "Fm7",
     "Fm7/Ab",
     "Bb7",
     "Cm7"
    ],
    "per": 0.5,
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "Dbmaj7",
     "Cm7",
     "Fm7",
     "Fm7"
    ],
    "bars": 32
   },
   {
    "section": "Verse 2",
    "chords": [
     "Fm7",
     "Fm7/Ab",
     "Bb7",
     "Cm7"
    ],
    "per": 0.5,
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "Dbmaj7",
     "Cm7",
     "Fm7",
     "Fm7"
    ],
    "bars": 32
   },
   {
    "section": "Breakdown",
    "chords": [
     "Fm7"
    ],
    "bars": 16
   },
   {
    "section": "Chorus",
    "chords": [
     "Dbmaj7",
     "Cm7",
     "Fm7",
     "Fm7"
    ],
    "bars": 32
   },
   {
    "section": "Outro",
    "chords": [
     "Dbmaj7",
     "Cm7",
     "Fm7",
     "Fm7"
    ],
    "bars": 8
   }
  ]
 }
};

export { VERIFIED };
