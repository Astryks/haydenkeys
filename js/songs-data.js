// Curated 25-song library for Hayden Keys.
//
// Sourcing method (per project scope rules): each chord progression below
// is a commonly-known, independently-corroborated musical fact — cross
// checked against at least two independent, generally-reliable sources
// (aggregated chord-site/tutorial consensus, not one site's literal
// formatted chart) via web search on 2026-10-05. Chord *names* and
// *progressions* are treated as facts, not copyrightable expression —
// the same reasoning that lets any chord-reference site exist. No lyrics
// or note-for-note transcriptions are bundled here, and nothing is
// scraped from Ultimate Guitar / Songsterr / Hooktheory's TheoryTab DB.
//
// `confidence`:
//   "confirmed"           — multiple independent sources agree closely.
//   "needs-verification"  — sources conflicted on key/chords, or the
//                            progression is unusually complex/jazzy and
//                            we are not confident enough to present it
//                            as solid. Shown with a visible badge in the
//                            UI rather than silently guessed.
//
// `degreeSequence` is the song's progression written as scale degrees
// (1-7, lowercase-ish intent conveyed via `quality`) in its OWN key —
// this is what Lesson 1's "songs you can already play" payoff screen
// checks against the 1-5-6-4 family (I-V-vi-IV and its rotations, plus
// the same four chords {I, IV, V, vi} in a different order, which is
// the same broader "four chords, a hundred songs" phenomenon).
//
// oneFiveSixFourMatch:
//   "exact"    — the progression is a straight rotation of I-V-vi-IV
//                (e.g. vi-IV-I-V, V-vi-IV-I — same cycle, same order).
//   "variant"  — uses the same four chords {I, IV, V, vi} but in a
//                different functional order (e.g. I-vi-IV-V).
//   false      — does not reduce to that four-chord family.

const SONGS = [
  {
    title: "Love Story",
    artist: "Taylor Swift",
    genre: "Pop/Country",
    popularityRank: 1,
    key: "D major",
    chords: ["D", "A", "Bm", "G"],
    degreeSequence: "I - V - vi - IV",
    confidence: "confirmed",
    oneFiveSixFourMatch: "exact",
    notes:
      "Verse/chorus cycle through D-A-Bm-G throughout; the final 'Marry me, Juliet' chorus modulates up to E major. This IS the 1-5-6-4 progression.",
  },
  {
    title: "Bad Guy",
    artist: "Billie Eilish",
    genre: "Pop/Electropop",
    popularityRank: 2,
    key: "G minor",
    chords: ["Gm", "Cm", "D"],
    degreeSequence: "i - iv - V (minor key)",
    confidence: "confirmed",
    oneFiveSixFourMatch: false,
    notes:
      "Minor-key, bass-riff-driven song (blues/minor-pentatonic bassline), not a major-key 1-5-6-4 song.",
  },
  {
    title: "Last Christmas",
    artist: "Wham!",
    genre: "Christmas/Pop",
    popularityRank: 3,
    key: "D major",
    chords: ["D", "Bm", "Em", "A"],
    degreeSequence: "I - vi - ii - V",
    confidence: "needs-verification",
    oneFiveSixFourMatch: false,
    notes:
      "Sources agree on key (D major) and the four main chords, but disagree on finer harmonic detail (one source rates it unusually harmonically complex for a pop song, citing an added ii(add11) chord). Treat the headline D-Bm-Em-A as a reasonable simplification, not a note-perfect chart.",
  },
  {
    title: "All I Want for Christmas Is You",
    artist: "Mariah Carey",
    genre: "Christmas/Pop",
    popularityRank: 4,
    key: "Bb major",
    chords: ["Bb", "F", "Gm", "Eb"],
    degreeSequence: "I - V - vi - IV (verse, simplified)",
    confidence: "needs-verification",
    oneFiveSixFourMatch: "variant",
    notes:
      "Widely simplified/taught as a I-V-vi-IV pattern (commonly shown as C-G-Am-F using a capo/transposed teaching key), but the real recording has considerably more harmonic movement (secondary dominants, a minor-plagal Cmin6/Eb cadence) that the simplified version leaves out. Flagging as needs-verification for the full chart; the simplified teaching version is a reasonable, honest approximation.",
  },
  {
    title: "Die With a Smile",
    artist: "Lady Gaga, Bruno Mars",
    genre: "Pop/Soul",
    popularityRank: 5,
    key: "A major",
    chords: ["Amaj7", "Dmaj7", "Bm", "E7", "C#m7", "F#m"],
    degreeSequence: "I - IV (verse); ii - V - iii - vi (chorus)",
    confidence: "needs-verification",
    oneFiveSixFourMatch: false,
    notes:
      "A 2024 release built on seventh chords (jazzier than a typical pop song); sources agree on the key and chord names but this is not a simple four-chord loop, so we're less confident in presenting one single 'the' progression.",
  },
  {
    title: "Blinding Lights",
    artist: "The Weeknd",
    genre: "Synth-pop",
    popularityRank: 6,
    key: "F minor",
    chords: ["Fm", "Cm", "Eb", "Bb"],
    degreeSequence: "i - v - VII - IV (minor key)",
    confidence: "needs-verification",
    oneFiveSixFourMatch: false,
    notes:
      "Sources disagree on whether the home key is F minor or C minor (same four chords either way: Fm-Cm-Eb-Bb repeats throughout). Minor-key loop, not a major 1-5-6-4.",
  },
  {
    title: "Shape of You",
    artist: "Ed Sheeran",
    genre: "Pop/Dancehall",
    popularityRank: 7,
    key: "C# minor",
    chords: ["C#m", "F#m", "A", "B"],
    degreeSequence: "vi - ii - IV - V (relative to E major)",
    confidence: "confirmed",
    oneFiveSixFourMatch: false,
    notes: "Same four chords loop the entire song. Not a 1-5-6-4 shape.",
  },
  {
    title: "Sweater Weather",
    artist: "The Neighbourhood",
    genre: "Indie/Alternative",
    popularityRank: 8,
    key: "Eb major (Cm-based)",
    chords: ["Cm", "Gm", "Bb", "Ab"],
    degreeSequence: "vi - iii - V - IV",
    confidence: "confirmed",
    oneFiveSixFourMatch: false,
    notes: "Minor-leaning loop over an Eb-major key center.",
  },
  {
    title: "Starboy",
    artist: "The Weeknd, Daft Punk",
    genre: "R&B/Pop",
    popularityRank: 9,
    key: "A minor",
    chords: ["Am", "G", "F"],
    degreeSequence: "i - VII - VI (minor, pedal point on A)",
    confidence: "confirmed",
    oneFiveSixFourMatch: false,
    notes: "Sparse minor-key pedal-point groove, not a four-chord major loop.",
  },
  {
    title: "As It Was",
    artist: "Harry Styles",
    genre: "Synth-pop",
    popularityRank: 10,
    key: "A major (commonly taught in C)",
    chords: ["Am", "D", "G", "C"],
    degreeSequence: "ii - V - I - IV (as reported) ",
    confidence: "needs-verification",
    oneFiveSixFourMatch: false,
    notes:
      "Our source cited an unusual ii-V-I-IV reading; this conflicts with the progression many musicians associate with this song (a vi-IV-I-V 'relative minor' loop similar to 'Someone Like You'). Flagging as needs-verification rather than presenting either as certain.",
  },
  {
    title: "Someone You Loved",
    artist: "Lewis Capaldi",
    genre: "Pop Ballad",
    popularityRank: 11,
    key: "D major (originally Db)",
    chords: ["D", "A", "Bm", "G"],
    degreeSequence: "I - V - vi - IV",
    confidence: "confirmed",
    oneFiveSixFourMatch: "exact",
    notes:
      "Multiple sources explicitly describe this as a I-V-vi-IV song (the same shape as 'Love Story' and 'Perfect'). One source's verse listing (D-G-Bm-F#m) looks like it may describe a secondary section rather than the main loop; the I-V-vi-IV identification itself is well corroborated.",
  },
  {
    title: "Sunflower",
    artist: "Post Malone, Swae Lee",
    genre: "Hip-Hop/Pop",
    popularityRank: 12,
    key: "D major",
    chords: ["D", "G", "Em", "G"],
    degreeSequence: "I - IV - ii - IV",
    confidence: "confirmed",
    oneFiveSixFourMatch: false,
    notes: "Three-chord loop (D, G, Em); Em here is the ii chord, not vi.",
  },
  {
    title: "One Dance",
    artist: "Drake, Wizkid, Kyla",
    genre: "Dancehall/Pop",
    popularityRank: 13,
    key: "Bb minor",
    chords: ["Bbm", "Db", "Ebm"],
    degreeSequence: "i - III - v (minor)",
    confidence: "confirmed",
    oneFiveSixFourMatch: false,
    notes: "Sparse minor-key dancehall loop, often simplified to Am-C-Dm with a capo.",
  },
  {
    title: "Perfect",
    artist: "Ed Sheeran",
    genre: "Pop Ballad",
    popularityRank: 14,
    key: "Ab major (commonly taught in G)",
    chords: ["G", "Em", "C", "D"],
    degreeSequence: "I - vi - IV - V",
    confidence: "confirmed",
    oneFiveSixFourMatch: "variant",
    notes:
      "Loops G-Em-C-D the entire way through (verse, chorus, bridge) — the same four chords as the 1-5-6-4 family, just in I-vi-IV-V order rather than I-V-vi-IV.",
  },
  {
    title: "Stay",
    artist: "The Kid Laroi, Justin Bieber",
    genre: "Pop",
    popularityRank: 15,
    key: "Bb minor",
    chords: ["Gb", "Ab", "Bbm", "Fm"],
    degreeSequence: "VI - VII - i - v (minor)",
    confidence: "confirmed",
    oneFiveSixFourMatch: false,
    notes: "Minor-key loop with the V chord dropped before each chorus for impact.",
  },
  {
    title: "Believer",
    artist: "Imagine Dragons",
    genre: "Pop Rock",
    popularityRank: 16,
    key: "Bb minor (one source: B minor)",
    chords: ["Bbm", "Gb", "F"],
    degreeSequence: "i - VI - V (minor, with altered bass)",
    confidence: "needs-verification",
    oneFiveSixFourMatch: false,
    notes:
      "Sources disagree on whether the home key is Bb minor or B minor; the F-major-over-A-bass alteration is a deliberate dissonant effect, not a simple diatonic chord.",
  },
  {
    title: "I Wanna Be Yours",
    artist: "Arctic Monkeys",
    genre: "Indie Rock",
    popularityRank: 17,
    key: "C minor",
    chords: ["Cm", "Fm", "Gm", "Bb", "Ab"],
    degreeSequence: "i - iv - v - VII - VI (minor)",
    confidence: "confirmed",
    oneFiveSixFourMatch: false,
    notes: "Minor-key loop, often simplified with a capo to open chords for beginners.",
  },
  {
    title: "Heat Waves",
    artist: "Glass Animals",
    genre: "Indie Pop",
    popularityRank: 18,
    key: "B major",
    chords: ["C#m", "B", "G#m", "F#", "E", "B", "C#m", "F#"],
    degreeSequence: "ii - I - vi - V - IV - I - ii - V (8-chord loop)",
    confidence: "confirmed",
    oneFiveSixFourMatch: false,
    notes:
      "Built on a longer 8-chord loop, not a simple four-chord pattern, though it does touch I, IV, V and vi along the way.",
  },
  {
    title: "Yellow",
    artist: "Coldplay",
    genre: "Alternative Rock",
    popularityRank: 19,
    key: "B major (commonly taught in A)",
    chords: ["A", "E", "F#m", "D"],
    degreeSequence: "I - V - vi - IV",
    confidence: "confirmed",
    oneFiveSixFourMatch: "exact",
    notes: "Classic I-V-vi-IV loop in its common teaching key of A major.",
  },
  {
    title: "The Night We Met",
    artist: "Lord Huron",
    genre: "Indie Folk",
    popularityRank: 20,
    key: "G major (commonly played w/ capo 2 from A)",
    chords: ["Em", "D", "G", "C"],
    degreeSequence: "vi - V - I - IV",
    confidence: "confirmed",
    oneFiveSixFourMatch: "exact",
    notes: "Same four chords as 1-5-6-4, starting on the vi chord (Em) instead of the I chord.",
  },
  {
    title: "Closer",
    artist: "The Chainsmokers, Halsey",
    genre: "Electropop",
    popularityRank: 21,
    key: "Db major / F minor (sources disagree)",
    chords: ["Dbadd9", "Eb", "Fm7", "Eb"],
    degreeSequence: "I - II - iii - II (II is a borrowed/non-diatonic chord)",
    confidence: "needs-verification",
    oneFiveSixFourMatch: false,
    notes:
      "Sources disagree on the home key (Ab major vs F minor cited); the Eb major chord doesn't sit diatonically in either reading cleanly, suggesting a borrowed chord — flagging rather than guessing at the exact function.",
  },
  {
    title: "Riptide",
    artist: "Vance Joy",
    genre: "Indie Folk",
    popularityRank: 22,
    key: "C major (recording in C#, capo 1)",
    chords: ["Am", "G", "C", "F"],
    degreeSequence: "vi - V - I - IV",
    confidence: "confirmed",
    oneFiveSixFourMatch: "exact",
    notes: "The famous ukulele-driven Am-G-C loop — the same four chords as 1-5-6-4.",
  },
  {
    title: "Levitating",
    artist: "Dua Lipa",
    genre: "Disco-Pop",
    popularityRank: 23,
    key: "B minor",
    chords: ["Bm", "D", "Em", "Bm"],
    degreeSequence: "i - III - iv - i (minor)",
    confidence: "confirmed",
    oneFiveSixFourMatch: false,
    notes: "Minor-key disco loop.",
  },
  {
    title: "Lucid Dreams",
    artist: "Juice WRLD",
    genre: "Hip-Hop/Emo Rap",
    popularityRank: 24,
    key: "F# minor",
    chords: ["F#m", "A", "Bm", "C#", "C#m", "D"],
    degreeSequence: "descending minor loop (interpolates Sting's 'Shape of My Heart')",
    confidence: "confirmed",
    oneFiveSixFourMatch: false,
    notes:
      "Built on the same descending-minor-scale harmonic idea as Sting's 'Shape of My Heart,' which it interpolates (publicly confirmed by Sting himself).",
  },
  {
    title: "Photograph",
    artist: "Ed Sheeran",
    genre: "Pop Ballad",
    popularityRank: 25,
    key: "E major (commonly taught in C)",
    chords: ["C", "Am", "G", "F"],
    degreeSequence: "I - vi - V - IV",
    confidence: "confirmed",
    oneFiveSixFourMatch: "variant",
    notes:
      "Four chords for the entire song (I-vi-V-IV in its common teaching key) — same four-chord family as 1-5-6-4, different order.",
  },
];

// Precomputed, honestly-reported summary for the Lesson 1 payoff screen.
const ONE_FIVE_SIX_FOUR_SONGS = SONGS.filter((s) => s.oneFiveSixFourMatch);

export { SONGS, ONE_FIVE_SIX_FOUR_SONGS };
