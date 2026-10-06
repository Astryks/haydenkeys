import { WORLD_SONGS, WORLD_LANGUAGES, WORLD_ALSO } from "./world-songs.js";

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
//   "exact"    — the progression is a true cyclic rotation of
//                I-V-vi-IV in the SAME direction (i.e. every chord is
//                followed by the same next chord as in I->V->vi->IV->I
//                — e.g. starting instead at V gives V-vi-IV-I). A loop
//                played in the opposite direction (e.g. vi-V-I-IV) uses
//                the identical four chords but is a genuinely different
//                progression to the ear, not an "exact" match — see
//                `fourChordOrderFamily` below. (An earlier draft of
//                this data incorrectly called two reverse-direction
//                songs — Riptide, The Night We Met — "exact"; fixed
//                after re-deriving each song's chord-to-chord adjacency
//                by hand and catching the error.)
//   "variant"  — uses the same four chords {I, IV, V, vi} but in a
//                functionally different order/direction.
//   false      — does not reduce to that four-chord family.
//
// fourChordOrderFamily (only set on "variant" entries): which of the
// non-Lesson-1 four-chord cyclic orders a song uses, so Lesson 4 (which
// specifically teaches the I-vi-IV-V reordering) can credit only the
// families that actually match it, not every "variant" song generically:
//   "B" — I-IV-vi-V direction (e.g. Riptide, The Night We Met)
//   "C" — I-vi-IV-V direction (e.g. Perfect) — this is what Lesson 4 teaches
//   "D" — I-vi-V-IV direction (e.g. Photograph) — close to Lesson 4's order

const SONGS = [
  {
    title: "Creep",
    artist: "Radiohead",
    genre: "Alternative/Rock",
    popularityRank: 123,
    year: 1992,
    key: "G major",
    chords: ["G", "B", "C", "Cm"],
    degreeSequence: "I - III - IV - iv",
    confidence: "confirmed",
    oneFiveSixFourMatch: false,
    difficulty: "Beginner",
    notes:
      "Radiohead's first single (1992, on the album Pablo Honey, 1993). The whole song loops G - B - C - Cm. The B major is a 'borrowed' chord, and the last chord turns C major into C minor by lowering one note (E to E flat), which gives the song its sad, aching sound.",
  },
  {
    title: "Linger",
    artist: "The Cranberries",
    genre: "Alternative/Rock",
    popularityRank: 122,
    year: 1993,
    key: "D major",
    chords: ["D", "A", "C", "G"],
    degreeSequence: "I - V - bVII - IV",
    confidence: "confirmed",
    oneFiveSixFourMatch: false,
    difficulty: "Beginner",
    notes:
      "The whole song loops D-A-C-G in D major (the C is a borrowed bVII chord), at around 90 BPM. Taught in the Day 3 'Song: Linger' lesson.",
  },
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
    confidence: "confirmed",
    oneFiveSixFourMatch: false,
    notes:
      "Re-verified independently (item 25): the verse/intro/interlude chords D-Bm-Em-A are consistently confirmed across multiple independent chord-chart sources, including the exact lyric-to-chord mapping (D: \"Once bitten and twice shy\", Bm: \"I keep my distance...\", Em: \"Tell me baby...\", A: \"...it doesn't surprise me\"). Upgraded from needs-verification to confirmed on that basis. Important honesty note: this is I-vi-ii-V, NOT the Lesson 1 pattern (I-V-vi-IV) — it shares 2 of 4 chords/degrees (I, vi) but is a genuinely different progression, not \"the same 4 chords.\" The in-app lesson that teaches this song says so plainly rather than overstating the connection to Lesson 1.",
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
    oneFiveSixFourMatch: false,
    notes:
      "Widely simplified/taught as a I-V-vi-IV pattern (commonly shown as C-G-Am-F using a capo/transposed teaching key), but the real recording has considerably more harmonic movement (secondary dominants, a minor-plagal Cmin6/Eb cadence) that the simplified version leaves out. Not counted in the Lesson 1 payoff list since we're not confident enough in the simplification to call it a real match — flagging as needs-verification instead of guessing.",
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
    key: "G major (original recording in A major)",
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
    degreeSequence: "i - III - iv (minor)",
    confidence: "confirmed",
    oneFiveSixFourMatch: false,
    notes: "Sparse minor-key dancehall loop, often simplified to Am-C-Dm with a capo.",
  },
  {
    title: "Perfect",
    artist: "Ed Sheeran",
    genre: "Pop Ballad",
    popularityRank: 14,
    key: "G major (original recording in Ab major)",
    chords: ["G", "Em", "C", "D"],
    degreeSequence: "I - vi - IV - V",
    confidence: "confirmed",
    oneFiveSixFourMatch: "variant",
    fourChordOrderFamily: "C",
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
    key: "A major (original recording in B major)",
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
    oneFiveSixFourMatch: "variant",
    fourChordOrderFamily: "B",
    notes:
      "Uses the same four chords as 1-5-6-4, but walked in the opposite direction around the cycle (vi to V to I to IV, vs. Lesson 1's I to V to vi to IV) — correcting an earlier draft of this data that called it an exact match. Same ingredients, genuinely different-sounding progression, not just a different starting point.",
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
    oneFiveSixFourMatch: "variant",
    fourChordOrderFamily: "B",
    notes:
      "The famous ukulele-driven Am-G-C-F loop — same four chords as 1-5-6-4, but (like The Night We Met) walked in the opposite cyclic direction, not an exact match to Lesson 1's specific loop. Corrected from an earlier draft that called it exact.",
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
    key: "C major (original recording in E major)",
    chords: ["C", "Am", "G", "F"],
    degreeSequence: "I - vi - V - IV",
    confidence: "confirmed",
    oneFiveSixFourMatch: "variant",
    fourChordOrderFamily: "D",
    notes:
      "Four chords for the entire song (I-vi-V-IV in its common teaching key) — same four-chord family as 1-5-6-4, different order.",
  },

  // --- Second batch, added after launch (2026-10-05) ---------------------
  // Sid pasted a 55-song wishlist with suggested chords. Those pasted
  // chords were explicitly NOT trusted (tells: the identical G-D-Em-C /
  // Am-F-C-G progression was assigned to a suspicious number of unrelated
  // songs, including "Despacito," which has a very different harmonic
  // character on its face; "Shape of You"'s entry had a garbled chord
  // symbol). Every song below was independently re-researched the same
  // way as the original 25 — titles only were taken from the list, not
  // chords. A few pasted guesses turned out to hold up under independent
  // verification anyway (Despacito genuinely does reduce to the 1-5-6-4
  // family once correctly read as Bm-G-D-A in D major — see its entry);
  // most did not, and are marked needs-verification or corrected below.
  //
  // This pass also caught and fixed a real bug in the ORIGINAL 25: two
  // songs (Riptide, The Night We Met) were marked as "exact" 1-5-6-4
  // matches, but re-deriving their chord-to-chord adjacency by hand
  // showed they actually walk the same four chords in the OPPOSITE
  // cyclic direction — a genuinely different-sounding progression, not
  // an exact match. Fixed in those entries above with a correction note.
  {
    title: "You Belong With Me",
    artist: "Taylor Swift",
    genre: "Pop/Country",
    popularityRank: 26,
    key: "F# (sources disagree on the practical chord reading)",
    chords: ["D", "A", "Em", "G"],
    degreeSequence: "disputed — sources give inconsistent readings",
    confidence: "needs-verification",
    oneFiveSixFourMatch: false,
    notes:
      "Sources conflict: one cites key F# with a very different chord set, another gives D-A-Em-G (which would be I-V-ii-IV in D major, not our vi-based family), and yet another claims a simplified G-D-Em-C teaching version. Too inconsistent across sources to present one confident chart.",
  },
  {
    title: "Lover",
    artist: "Taylor Swift",
    genre: "Pop",
    popularityRank: 27,
    key: "G major",
    chords: ["G", "D", "C"],
    degreeSequence: "I - V - IV (core loop; bridge adds vi and other chords)",
    confidence: "confirmed",
    oneFiveSixFourMatch: false,
    notes:
      "Verse/chorus center on G-D-C (with Dsus4/Cadd9 color tones) — three chords, no vi in the main loop. The bridge is more harmonically complex (adds Em, F, Am, C/B) but that's not the core progression.",
  },
  {
    title: "Shake It Off",
    artist: "Taylor Swift",
    genre: "Pop",
    popularityRank: 28,
    key: "G major",
    chords: ["Am", "C", "G"],
    degreeSequence: "ii - IV - I (3-chord loop, no V)",
    confidence: "confirmed",
    oneFiveSixFourMatch: false,
    notes: "A genuinely simple, well-documented three-chord song — Am-C-G repeating, never resolving to D (V). (Item 57: was mislabelled vi - IV - I; Am in the key of G is the 2, not the 6.)",
  },
  {
    title: "Wildest Dreams",
    artist: "Taylor Swift",
    genre: "Pop",
    popularityRank: 29,
    key: "F minor",
    chords: ["varies by capo position — see notes"],
    degreeSequence: "needs verification",
    confidence: "needs-verification",
    oneFiveSixFourMatch: false,
    notes:
      "Key (F minor) is well agreed on, but sources describe the actual chords only in terms of various capo positions (capo 1, 4, or 6, each implying different absolute chord names) without agreeing on one real-sounding chord set — not confident enough to present a single chart.",
  },
  {
    title: "Shallow",
    artist: "Lady Gaga, Bradley Cooper",
    genre: "Pop/Soundtrack",
    popularityRank: 30,
    key: "G major",
    chords: ["Em", "D", "G", "C", "G", "D"],
    degreeSequence: "vi - V - I - IV - I - V",
    confidence: "confirmed",
    oneFiveSixFourMatch: "variant",
    notes:
      "Re-checked: the verse is Em-D-G, C-G-D in G major (vi-V-I, IV-I-V). It uses the same four chords as Lesson 1 but in a different order, so it isn't the exact I-V-vi-IV loop. Corrected from an earlier entry that listed G-D-Em-C.",
  },
  {
    title: "Million Reasons",
    artist: "Lady Gaga",
    genre: "Pop",
    popularityRank: 31,
    key: "C major",
    chords: ["C", "Am", "F", "G"],
    degreeSequence: "I - vi - IV - V (reported; limited independent corroboration)",
    confidence: "needs-verification",
    oneFiveSixFourMatch: false,
    notes:
      "One source explicitly describes an I-vi-IV-V progression that 'inverts itself for the chorus,' which would make this a Lesson-4-family song — but this wasn't independently cross-confirmed by a second source with the same specificity, so flagging rather than claiming it solidly.",
  },
  {
    title: "Always Remember Us This Way",
    artist: "Lady Gaga",
    genre: "Pop/Soundtrack",
    popularityRank: 32,
    key: "A minor (relative to C major)",
    chords: ["Am", "F", "C", "G"],
    degreeSequence: "vi - IV - I - V",
    confidence: "confirmed",
    oneFiveSixFourMatch: "exact",
    notes:
      "Verse is Am-F-C-G, relative to C major. Re-derived its chord-to-chord adjacency by hand (vi→IV, IV→I, I→V, V→vi) and confirmed it's the identical edge set to Lesson 1's G-D-Em-C loop, just starting at a different point in the cycle — a genuine exact match, not just a superficial 'same chords' claim.",
  },
  {
    title: "Have Yourself a Merry Little Christmas",
    artist: "Various (originally Judy Garland)",
    genre: "Christmas/Jazz Standard",
    popularityRank: 33,
    key: "G major (one common version; varies a lot by arrangement)",
    chords: ["G", "Em7", "Am7", "D7"],
    degreeSequence: "I - vi7 - ii7 - V7",
    confidence: "needs-verification",
    oneFiveSixFourMatch: false,
    notes:
      "A 1944 jazz standard with many different published arrangements/keys (G and C both common) — a ii-V-I-style turnaround, not our 4-chord family. Too many materially different chord charts across sources to call one definitive.",
  },
  {
    title: "Thinking Out Loud",
    artist: "Ed Sheeran",
    genre: "Pop Ballad",
    popularityRank: 34,
    key: "D major",
    chords: ["D", "D/F#", "G", "A"],
    degreeSequence: "I - I/III - IV - V",
    confidence: "confirmed",
    oneFiveSixFourMatch: false,
    notes:
      "The D/F# walking-bass chord (not a plain D) is the signature of this progression. No vi chord in the main loop.",
  },
  {
    title: "The A Team",
    artist: "Ed Sheeran",
    genre: "Pop/Folk",
    popularityRank: 35,
    key: "G major (original recording in A major)",
    chords: ["G", "D", "Em", "C"],
    degreeSequence: "I - V - vi - IV",
    confidence: "confirmed",
    oneFiveSixFourMatch: "exact",
    notes: "The capo-2 teaching version is explicitly G-D-Em-C shapes — the exact Lesson 1 order.",
  },
  {
    title: "Galway Girl",
    artist: "Ed Sheeran",
    genre: "Pop/Folk",
    popularityRank: 36,
    key: "G major (original recording in A major)",
    chords: ["Em", "G", "D", "Cadd9"],
    degreeSequence: "needs verification (chord set confirmed, exact order not)",
    confidence: "needs-verification",
    oneFiveSixFourMatch: false,
    notes:
      "Sources agree on the four chords (Em, G, D, Cadd9) but didn't give a crisply confirmed sequential order strong enough to classify which four-chord family this belongs to.",
  },
  {
    title: "Drop It Like It's Hot",
    artist: "Snoop Dogg ft. Pharrell",
    genre: "Hip-Hop",
    popularityRank: 37,
    key: "Db major (reported)",
    chords: ["insufficient data"],
    degreeSequence: "needs verification",
    confidence: "needs-verification",
    oneFiveSixFourMatch: false,
    notes:
      "Extremely sparse, beat-driven production (tongue clicks, minimal keyboard) — sources agree on key but not on a chord-by-chord progression; may not have a conventional one to document.",
  },
  {
    title: "Gin and Juice",
    artist: "Snoop Dogg",
    genre: "Hip-Hop",
    popularityRank: 38,
    key: "F Phrygian / F minor",
    chords: ["Fm", "F#", "G#", "C#"],
    degreeSequence: "Phrygian-mode progression — not a standard major/minor pattern",
    confidence: "needs-verification",
    oneFiveSixFourMatch: false,
    notes:
      "Built on the Phrygian mode (interpolates Slave's 'Watching You' and samples George McRae's 'I Get Lifted') — unusual enough harmonically that it doesn't fit this app's major/minor beginner framework well, and sources don't agree on a precise chord-by-chord chart.",
  },
  {
    title: "Young, Wild & Free",
    artist: "Snoop Dogg, Wiz Khalifa ft. Bruno Mars",
    genre: "Hip-Hop",
    popularityRank: 39,
    key: "D major",
    chords: ["insufficient data"],
    degreeSequence: "needs verification",
    confidence: "needs-verification",
    oneFiveSixFourMatch: false,
    notes: "Key is reasonably well corroborated, but no source gave a confident full chord-by-chord progression.",
  },
  {
    title: "Let It Be",
    artist: "The Beatles",
    genre: "Rock/Pop",
    popularityRank: 40,
    key: "C major",
    chords: ["C", "G", "Am", "F"],
    degreeSequence: "I - V - vi - IV",
    confidence: "confirmed",
    oneFiveSixFourMatch: "exact",
    notes: "Verse is explicitly C-G-Am-F, with sources directly naming it an I-V-vi-IV progression — textbook Lesson 1 match.",
  },
  {
    title: "No Woman No Cry",
    artist: "Bob Marley & The Wailers",
    genre: "Reggae",
    popularityRank: 41,
    key: "C major",
    chords: ["C", "G", "Am", "F"],
    degreeSequence: "I - V - vi - IV",
    confidence: "confirmed",
    oneFiveSixFourMatch: "exact",
    notes: "The same C-G-Am-F loop as Let It Be, repeating unchanged for the entire song — no bridge, no key change.",
  },
  {
    title: "With or Without You",
    artist: "U2",
    genre: "Rock",
    popularityRank: 42,
    key: "D major",
    chords: ["D", "A", "Bm", "G"],
    degreeSequence: "I - V - vi - IV",
    confidence: "confirmed",
    oneFiveSixFourMatch: "exact",
    notes: "Explicitly described as an I-V-vi-IV progression (D-A-Bm-G) that repeats for the entire song.",
  },
  {
    title: "Don't Stop Believin'",
    artist: "Journey",
    genre: "Rock",
    popularityRank: 43,
    key: "G major (commonly taught; originally E major)",
    chords: ["G", "D", "Em", "C", "G", "D", "Bm", "C"],
    degreeSequence: "I - V - vi - IV - I - V - iii - IV (8-chord loop)",
    confidence: "confirmed",
    oneFiveSixFourMatch: "variant",
    fourChordOrderFamily: "A",
    notes:
      "An 8-chord extension, not a pure 4-chord loop — but the first half is literally Lesson 1's G-D-Em-C (I-V-vi-IV) before continuing on to iii (Bm) and IV again. Counted as a variant match since the full loop isn't identical to Lesson 1's, but it's the closest possible relative.",
  },
  {
    title: "I'm Yours",
    artist: "Jason Mraz",
    genre: "Pop/Reggae",
    popularityRank: 44,
    key: "B major",
    chords: ["B", "F#", "G#m", "E"],
    degreeSequence: "I - V - vi - IV",
    confidence: "confirmed",
    oneFiveSixFourMatch: "exact",
    notes: "Explicitly described as following the I-V-vi-IV pattern for the entire verse and chorus.",
  },
  {
    title: "Despacito",
    artist: "Luis Fonsi ft. Daddy Yankee",
    genre: "Latin Pop/Reggaeton",
    popularityRank: 45,
    key: "B minor (relative to D major)",
    chords: ["Bm", "G", "D", "A"],
    degreeSequence: "vi - IV - I - V",
    confidence: "confirmed",
    oneFiveSixFourMatch: "exact",
    notes:
      "This one was specifically flagged as suspicious in a pasted draft list that assigned the same progression to many unrelated songs — but independent verification actually bears it out: Bm-G-D-A, read relative to D major, has the identical chord-to-chord adjacency as Lesson 1's loop (vi→IV→I→V→vi...). A case where double-checking confirmed rather than debunked the claim.",
  },
  {
    title: "Someone Like You",
    artist: "Adele",
    genre: "Pop Ballad",
    popularityRank: 46,
    key: "A major",
    chords: ["A", "E", "F#m", "D"],
    degreeSequence: "I - V - vi - IV",
    confidence: "confirmed",
    oneFiveSixFourMatch: "exact",
    notes: "Explicitly confirmed as a I-V-vi-IV progression (A-E-F#m-D) repeating through verse and chorus.",
  },
  {
    title: "Let Her Go",
    artist: "Passenger",
    genre: "Folk/Pop",
    popularityRank: 47,
    key: "C major (recording in G, capo 7)",
    chords: ["G", "D", "Em", "C"],
    degreeSequence: "disputed — see notes",
    confidence: "needs-verification",
    oneFiveSixFourMatch: false,
    notes:
      "Sources gave two descriptions that don't actually agree with each other once compared chord-by-chord: one cites a no-capo verse of Am-F-G-Em (which includes iii, not a repeat of vi), another separately summarizes the chords as simply 'G, D, Em, and C' without a confirmed order. Flagging the inconsistency rather than picking one arbitrarily.",
  },
  {
    title: "Stand By Me",
    artist: "Ben E. King",
    genre: "Soul/R&B",
    popularityRank: 48,
    key: "A major",
    chords: ["A", "F#m", "D", "E"],
    degreeSequence: "I - vi - IV - V",
    confidence: "confirmed",
    oneFiveSixFourMatch: "variant",
    fourChordOrderFamily: "C",
    notes: "Classic doo-wop progression, I-vi-IV-V — the same family as Lesson 4 and Perfect, not Lesson 1's exact order.",
  },
  {
    title: "A Horse With No Name",
    artist: "America",
    genre: "Folk Rock",
    popularityRank: 49,
    key: "E minor",
    chords: ["Em", "D6/9"],
    degreeSequence: "i - VII (2-chord loop)",
    confidence: "confirmed",
    oneFiveSixFourMatch: false,
    notes: "Genuinely a two-chord song — Em and a D variant, looped for the entire track. About as simple as it gets.",
  },
  {
    title: "Knockin' on Heaven's Door",
    artist: "Bob Dylan",
    genre: "Rock/Folk",
    popularityRank: 50,
    key: "G major",
    chords: ["G", "D", "Am", "C"],
    degreeSequence: "I - V - ii - IV",
    confidence: "confirmed",
    oneFiveSixFourMatch: false,
    notes: "Uses the 2 (ii, Am) chord instead of the 6 (vi) — a Lesson 5 song, not a Lesson 1 match.",
  },
  {
    title: "Wonderwall",
    artist: "Oasis",
    genre: "Britpop/Rock",
    popularityRank: 51,
    key: "F# minor / G major (genuinely ambiguous)",
    chords: ["Em7", "G", "Dsus4", "A7sus4"],
    degreeSequence: "needs verification",
    confidence: "needs-verification",
    oneFiveSixFourMatch: false,
    notes:
      "Sources themselves describe this song as 'meandering between the keys of E minor and G major' — a real harmonic ambiguity, not just conflicting research. Not confident enough to assign one clean roman-numeral analysis.",
  },
  {
    title: "Love Yourself",
    artist: "Justin Bieber",
    genre: "Pop",
    popularityRank: 52,
    key: "E major",
    chords: ["E", "B/D#", "C#m", "F#m"],
    degreeSequence: "I - V - vi - ii",
    confidence: "needs-verification",
    oneFiveSixFourMatch: false,
    notes:
      "A simplified G-D-Em-C 'teaching version' is widely shared online, but the real recording's chords (E-B/D#-C#m-F#m) are actually I-V-vi-ii, not I-V-vi-IV — the popular teaching simplification appears to be musically inaccurate to the actual recording. Flagging rather than repeating the inaccurate popular version.",
  },
  {
    title: "Count on Me",
    artist: "Bruno Mars",
    genre: "Pop",
    popularityRank: 53,
    key: "C major",
    chords: ["C", "Em", "Am", "G", "F"],
    degreeSequence: "uses I, iii, vi, V, IV — richer than a simple 4-chord loop",
    confidence: "confirmed",
    oneFiveSixFourMatch: false,
    notes: "Five chords across verse/chorus/bridge; key and chord set are well corroborated, but not a clean 4-chord loop.",
  },
  {
    title: "Zombie",
    artist: "The Cranberries",
    genre: "Alternative Rock",
    popularityRank: 54,
    key: "E minor (relative to G major)",
    chords: ["Em", "C", "G", "D"],
    degreeSequence: "vi - IV - I - V",
    confidence: "confirmed",
    oneFiveSixFourMatch: "exact",
    notes:
      "Em-C-G-D repeats for the entire song. Read relative to its relative major (G), this has the identical chord-to-chord adjacency as Lesson 1's loop — a genuine exact match, not just a shared chord set.",
  },
  {
    title: "Hey Soul Sister",
    artist: "Train",
    genre: "Pop Rock",
    popularityRank: 55,
    key: "E major",
    chords: ["E", "B", "C#m", "A"],
    degreeSequence: "I - V - vi - IV",
    confidence: "confirmed",
    oneFiveSixFourMatch: "exact",
    notes:
      "Re-checked: the song loops E-B-C#m-A, the I-V-vi-IV progression in E major (commonly played with a capo on 4 using G-D-Em-C shapes). Corrected from an earlier, internally inconsistent entry.",
  },
  {
    title: "Viva La Vida",
    artist: "Coldplay",
    genre: "Alternative Rock",
    popularityRank: 56,
    key: "G major (original recording in Ab major)",
    chords: ["C", "D", "G", "Em"],
    degreeSequence: "IV - V - I - vi",
    confidence: "confirmed",
    oneFiveSixFourMatch: "variant",
    notes: "Re-checked: the song loops IV-V-I-vi (Db-Eb-Ab-Fm in the original Ab major), so in the teaching key of G it's C-D-G-Em. Same four chords as Lesson 1 in a different order (the I-vi-IV-V family, rotated), not the exact I-V-vi-IV loop. Corrected from an earlier entry that listed G-D-Em-C.",
  },
  {
    title: "Let It Go",
    artist: "Idina Menzel (Frozen)",
    genre: "Soundtrack/Pop",
    popularityRank: 57,
    key: "E minor (original recording in F minor; builds through several sections)",
    chords: ["Em", "C", "G", "D", "Am"],
    degreeSequence: "needs verification",
    confidence: "needs-verification",
    oneFiveSixFourMatch: false,
    notes:
      "A through-composed power ballad that builds across multiple sections rather than looping one progression — sources list chords used but not a single confident chart, similar in spirit to Die With a Smile's complexity.",
  },
  {
    title: "Budapest",
    artist: "George Ezra",
    genre: "Folk/Pop",
    popularityRank: 58,
    key: "G major",
    chords: ["G", "C", "D"],
    degreeSequence: "I - IV - V (3-chord loop, no vi)",
    confidence: "confirmed",
    oneFiveSixFourMatch: false,
    notes: "A genuinely simple three-chord song, well corroborated — verse is mostly G and C, chorus brings in D.",
  },
  {
    title: "Sweet Home Alabama",
    artist: "Lynyrd Skynyrd",
    genre: "Southern Rock",
    popularityRank: 59,
    key: "G major (sources conflict — see notes)",
    chords: ["D", "C", "G"],
    degreeSequence: "V - IV - I (as commonly simplified)",
    confidence: "needs-verification",
    oneFiveSixFourMatch: false,
    notes:
      "Sources gave genuinely conflicting chord sets for this one — a simple D-C-G (V-IV-I) loop in G is the most commonly cited, but another source described entirely different chords (C-A-F-G, or even Bb-Ab-Db-G) in a different key. Flagging the real disagreement rather than picking one.",
  },
  {
    title: "Wonderful Tonight",
    artist: "Eric Clapton",
    genre: "Rock Ballad",
    popularityRank: 60,
    key: "G major",
    chords: ["G", "Em", "C", "D"],
    degreeSequence: "I - vi - IV - V",
    confidence: "confirmed",
    oneFiveSixFourMatch: "variant",
    fourChordOrderFamily: "C",
    notes: "Explicitly listed as 'G Em C D' — the same I-vi-IV-V family as Lesson 4 and Perfect.",
  },
  {
    title: "Over the Rainbow",
    artist: "Israel Kamakawiwo'ole",
    genre: "Ukulele/Pop Standard",
    popularityRank: 61,
    key: "C major",
    chords: ["C", "Em", "F", "G", "Am"],
    degreeSequence: "uses I, iii, IV, V, vi — richer than a simple 4-chord loop",
    confidence: "confirmed",
    oneFiveSixFourMatch: false,
    notes: "The famous ukulele medley uses five chords including both iii (Em) and vi (Am) — not a clean 4-chord loop.",
  },
  {
    title: "Chasing Cars",
    artist: "Snow Patrol",
    genre: "Alternative Rock",
    popularityRank: 62,
    key: "A major",
    chords: ["A", "D", "E"],
    degreeSequence: "I - IV - V (3-chord loop; F#m appears occasionally)",
    confidence: "confirmed",
    oneFiveSixFourMatch: false,
    notes: "Core progression is a simple I-IV-V; the vi chord (F#m) shows up only as an occasional variation, not the main loop.",
  },
  {
    title: "Happy",
    artist: "Pharrell Williams",
    genre: "Pop/Soul",
    popularityRank: 63,
    key: "genuinely disputed — see notes",
    chords: ["insufficient agreement across sources"],
    degreeSequence: "needs verification",
    confidence: "needs-verification",
    oneFiveSixFourMatch: false,
    notes:
      "Sources describe this song using at least three different modal frameworks (Em with capo, F with a flat-heavy chord set, B Phrygian Dominant, F Dorian with dominant 7th extensions) — a genuinely unusual, funk-influenced harmony that doesn't reduce to a simple major/minor chart.",
  },
  {
    title: "Banana Pancakes",
    artist: "Jack Johnson",
    genre: "Folk/Acoustic",
    popularityRank: 64,
    key: "G major",
    chords: ["G7", "D7", "Am7", "C7"],
    degreeSequence: "I7 - V7 - ii7 - IV7",
    confidence: "confirmed",
    oneFiveSixFourMatch: false,
    notes: "Built entirely on dominant-7th chords and uses the 2 (ii, Am7) chord — relevant to both Lesson 5 and Lesson 8.",
  },
  {
    title: "Can You Feel the Love Tonight",
    artist: "Elton John (The Lion King)",
    genre: "Soundtrack/Pop",
    popularityRank: 65,
    key: "G major (simplified; original recording in Bb major)",
    chords: ["G", "D", "Em", "C"],
    degreeSequence: "I - V - vi - IV (alternate G-major chorus version)",
    confidence: "needs-verification",
    oneFiveSixFourMatch: false,
    notes:
      "The recording is in Bb major with richer chords (Bb, F/A, Gm, Eb and more). The G-D-Em-C version here is a simplified teaching loop that we couldn't confirm against the actual chorus, so it's shown as a close version, not a confirmed chart.",
  },
  {
    title: "Sweet Caroline",
    artist: "Neil Diamond",
    genre: "Pop/Rock",
    popularityRank: 66,
    key: "G major (original recording in B major)",
    chords: ["G", "C", "D"],
    degreeSequence: "I - IV - V (3-chord loop; A7 turnaround, no vi)",
    confidence: "confirmed",
    oneFiveSixFourMatch: false,
    notes: "A simple, well-documented three-chord singalong — no vi chord in the main loop.",
  },
  {
    title: "Livin' on a Prayer",
    artist: "Bon Jovi",
    genre: "Rock",
    popularityRank: 67,
    key: "E minor, modulating through G minor and C minor",
    chords: ["Em", "C", "D"],
    degreeSequence: "needs verification — genuine key changes",
    confidence: "needs-verification",
    oneFiveSixFourMatch: false,
    notes:
      "This one genuinely modulates key more than once (sources describe a move from E minor to G minor, then to C minor for the second chorus) — too much real harmonic movement to reduce to one simple chart.",
  },
  {
    title: "I Will Survive",
    artist: "Gloria Gaynor",
    genre: "Disco",
    popularityRank: 68,
    key: "A minor",
    chords: ["Am", "Dm", "G", "Cmaj7", "Fmaj7", "Bm7b5", "E"],
    degreeSequence: "a circle-of-fifths-style descending minor progression",
    confidence: "confirmed",
    oneFiveSixFourMatch: false,
    notes: "A rich, 7-chord descending progression (including two major-7th chords) — relevant to Lesson 8's seventh-chord theme.",
  },
  {
    title: "Mr. Brightside",
    artist: "The Killers",
    genre: "Rock",
    popularityRank: 69,
    key: "C major (original recording in Db major)",
    chords: ["C", "F", "G", "F"],
    degreeSequence: "I - IV - V - IV (no vi)",
    confidence: "needs-verification",
    oneFiveSixFourMatch: false,
    notes: "The verse rocks between I and IV (Db and Gb in the original Db major; C and F in the teaching key of C). The chorus chords vary between sources, so the C-F-G-F loop here is a close version, not a confirmed chart.",
  },
  {
    title: "Dancing Queen",
    artist: "ABBA",
    genre: "Disco/Pop",
    popularityRank: 70,
    key: "A major",
    chords: ["A", "D", "F#m", "E"],
    degreeSequence: "uses I, IV, vi, V — exact sequential order not clearly confirmed",
    confidence: "needs-verification",
    oneFiveSixFourMatch: false,
    notes:
      "All four of the 1-5-6-4 chords show up somewhere in this song, which is why a pasted draft list guessed it matches — but no source gave a clean, confidently-ordered 4-chord loop the way Let It Be or No Woman No Cry have. Flagging the order rather than assuming it matches just because the chords overlap.",
  },
  {
    title: "Summer Nights",
    artist: "John Travolta, Olivia Newton-John (Grease)",
    genre: "Soundtrack/Pop",
    popularityRank: 71,
    key: "D major",
    chords: ["D", "G", "A"],
    degreeSequence: "I - IV - V (3-chord loop, no vi)",
    confidence: "confirmed",
    oneFiveSixFourMatch: false,
    notes: "A simple three-chord showtune progression, well corroborated across sources.",
  },
  {
    title: "Africa",
    artist: "Toto",
    genre: "Pop Rock",
    popularityRank: 72,
    key: "genuinely disputed — modulates between C#m/B/A sections",
    chords: ["insufficient agreement across sources"],
    degreeSequence: "needs verification",
    confidence: "needs-verification",
    oneFiveSixFourMatch: false,
    notes:
      "Sources disagree on the home key (C minor vs C# minor) and describe the song moving through multiple keys/modes across its verse and chorus — a genuinely complex song, not simplified here.",
  },
  {
    title: "Bohemian Rhapsody",
    artist: "Queen",
    genre: "Rock/Advanced",
    popularityRank: 73,
    key: "Modulates through Bb, Eb, A, and F major across distinct sections",
    chords: ["varies dramatically by section — see notes"],
    degreeSequence: "not applicable — not a loop-based song",
    confidence: "confirmed",
    oneFiveSixFourMatch: false,
    advanced: true,
    notes:
      "Added as a clearly-labeled advanced/bonus entry, not part of the beginner curriculum — Sid's own instinct going in was correct, this is genuinely not a simple beginner song. It moves through at least four different keys across a ballad intro, an operatic section with diminished/augmented chords and rapid changes, and a hard-rock section. For what it's worth, the ballad intro alone (commonly cited as C-G-Am-F) is literally Lesson 1's exact I-V-vi-IV shape — a fun 'you already know the first 20 seconds' fact — but the rest of the song is well beyond this app's beginner scope, and no simplified version is presented here to avoid misrepresenting its real difficulty.",
  },

  // --- Jazz standards, added for the Day 26-30+ "richer harmony" / jazz ---
  // comping-and-improv lesson. Sourced from a cited list (jazz educator
  // Mark Rapp's top-10, via South Carolina Public Radio) plus two of
  // Sid's own specific requests (My Funny Valentine — already on the
  // cited list; Almost Blue — not on it, researched separately). Jazz
  // standards are, honestly, harder to pin to one simple chart than pop
  // songs — most published "changes" vary by recording/arranger, and
  // several of these are explicitly documented as harmonically complex
  // even by jazz-education sources. Where that's the case, confidence is
  // marked needs-verification with the real reason, exactly like
  // Bohemian Rhapsody and the pop-song entries above — no fake
  // simplified chart invented just to mark something "done."
  {
    title: "Autumn Leaves",
    artist: "Joseph Kosma (jazz standard)",
    genre: "Jazz Standard",
    popularityRank: 74,
    key: "G minor (also commonly played in E minor or C minor)",
    chords: ["Am7b5", "D7", "Gm7", "Cmaj7"],
    degreeSequence: "ii7b5 - V7 - i - IV (relative-major turnaround)",
    confidence: "needs-verification",
    oneFiveSixFourMatch: false,
    notes:
      "Sources themselves disagree on which key is 'the' home key (G minor vs E minor vs C minor readings all appear), reflecting that this tune is genuinely played in whichever key suits the singer/soloist. The ii-V-i-IV snippet above is a commonly cited fragment, not a full confident chart.",
  },
  {
    title: "All the Things You Are",
    artist: "Jerome Kern (jazz standard)",
    genre: "Jazz Standard",
    popularityRank: 75,
    key: "Ab major (opening section; modulates extensively)",
    chords: ["Fm7", "Bbm7", "Eb7", "Abmaj7"],
    degreeSequence: "vi - ii - V - I (opening 4 bars only)",
    confidence: "needs-verification",
    oneFiveSixFourMatch: false,
    notes:
      "The opening vi-ii-V-I in Ab is well corroborated, but the full 36-bar form is explicitly documented as moving through a circle-of-fifths modulation to multiple keys with an unusual AA2BA3 structure — genuinely too harmonically complex to reduce to one chart here.",
  },
  {
    title: "Blue Bossa",
    artist: "Kenny Dorham (jazz standard)",
    genre: "Jazz Standard",
    popularityRank: 76,
    key: "C minor (modulates to Db for 4 bars)",
    chords: ["Cm7", "Fm7", "Dm7b5", "G7b9"],
    degreeSequence: "i - iv - ii7b5 - V7b9 (first 8 of 16 bars)",
    confidence: "confirmed",
    oneFiveSixFourMatch: false,
    notes:
      "One of the most consistently-documented jazz standards for beginners — a classic minor ii-V-i, 75% in C minor with a clearly-documented 4-bar modulation to Db in the middle. A real, approachable entry point into jazz minor harmony.",
  },
  {
    title: "There Will Never Be Another You",
    artist: "Harry Warren (jazz standard)",
    genre: "Jazz Standard",
    popularityRank: 77,
    key: "Eb major",
    chords: ["insufficient agreement for a simple chart — see notes"],
    degreeSequence: "needs verification",
    confidence: "needs-verification",
    oneFiveSixFourMatch: false,
    notes:
      "Key (Eb major) is solid, but sources explicitly describe secondary dominants, a 'backdoor' bVII7 progression, and a tritone substitution in the final four bars — genuinely advanced jazz harmony, not simplified here to avoid misrepresenting it.",
  },
  {
    title: "Misty",
    artist: "Erroll Garner (jazz standard)",
    genre: "Jazz Standard",
    popularityRank: 78,
    key: "Eb major",
    chords: ["Ebmaj7", "insufficient agreement beyond bar 1 — see notes"],
    degreeSequence: "I (bar 1); ii-V to IV (bars 2-3); backdoor bVII7 (bar 4)",
    confidence: "needs-verification",
    oneFiveSixFourMatch: false,
    notes:
      "Key is solid and well documented, and the bar-1 tonic chord is simple enough — but bars 2 onward include a backdoor ii-V borrowed from the parallel minor, which is real, interesting harmony but too specific to commit to one simplified chart here.",
  },
  {
    title: "Take the A Train",
    artist: "Billy Strayhorn (jazz standard)",
    genre: "Jazz Standard",
    popularityRank: 79,
    key: "C major",
    chords: ["C6", "D7b5", "Dm7", "G7"],
    degreeSequence: "I - II7(b5) - ii7 - V7 (opening A section)",
    confidence: "confirmed",
    oneFiveSixFourMatch: false,
    notes:
      "A well-documented, specific opening progression — the classic 'tonic to V7/V, then resolve home via ii-V' trick that gives the tune its distinctive sound. Full tune (AABA, 32 bars) has more harmonic movement in the B section not covered here.",
  },
  {
    title: "So What",
    artist: "Miles Davis (Kind of Blue)",
    genre: "Jazz Standard / Modal Jazz",
    popularityRank: 80,
    key: "D Dorian (modal, not a conventional major/minor key)",
    chords: ["Dm7", "Ebm7"],
    degreeSequence: "D Dorian for 16 bars, up a half-step to Eb Dorian for 8 bars, back to D Dorian for 8 (32-bar AABA, only 2 chords total)",
    confidence: "confirmed",
    oneFiveSixFourMatch: false,
    notes:
      "One of the most famous and simplest-harmonically jazz standards ever recorded — foundational to modal jazz specifically because it reduces an entire 32-bar form to two chords. An excellent, well-documented entry point for the pentatonic-improvisation lesson.",
  },
  {
    title: "Stella by Starlight",
    artist: "Victor Young (jazz standard)",
    genre: "Jazz Standard",
    popularityRank: 81,
    key: "Bb major (also commonly played in G major)",
    chords: ["insufficient agreement for a simple chart — see notes"],
    degreeSequence: "needs verification",
    confidence: "needs-verification",
    oneFiveSixFourMatch: false,
    notes:
      "Sources explicitly describe this tune's harmony as 'not very straightforward,' with non-diatonic chords and minor ii-V progressions that don't resolve conventionally — and note that the commonly-played changes today have evolved significantly from the original film score through later recordings by Miles Davis, Bill Evans, and others. Too genuinely disputed for one confident beginner chart.",
  },
  {
    title: "Blue Monk",
    artist: "Thelonious Monk",
    genre: "Jazz Standard / Blues",
    popularityRank: 82,
    key: "Bb major (12-bar blues form)",
    chords: ["Bb7", "Eb7", "Bb7", "Bb7", "Eb7", "Eb7", "Bb7", "Bb7", "F7", "Eb7", "Bb7", "F7"],
    degreeSequence: "Standard quick-change 12-bar blues: I-IV-I-I-IV-IV-I-I-V-IV-I-V",
    confidence: "confirmed",
    oneFiveSixFourMatch: false,
    notes:
      "The 12-bar blues FORM in Bb is well documented and confirmed. The chords shown are the standard generic 12-bar-blues changes, not Monk's own famously idiosyncratic chord substitutions and voicings on his recordings — those are real but not captured in this simplified beginner version, flagged honestly rather than presented as Monk's exact harmony.",
  },
  {
    title: "My Funny Valentine",
    artist: "Rodgers & Hart (jazz standard)",
    genre: "Jazz Standard",
    popularityRank: 83,
    key: "C minor",
    chords: ["Cm", "CmMaj7", "Cm7", "Cm6"],
    degreeSequence: "i - i(maj7) - i7 - i6 (the 'minor line cliché' — a descending chromatic line C-B-Bb-A)",
    confidence: "confirmed",
    oneFiveSixFourMatch: false,
    notes:
      "The opening 4-chord 'minor line cliché' is extremely well documented (it's commonly nicknamed the 'My Funny Valentine progression' specifically because of this tune) and a genuinely useful piece of jazz vocabulary on its own. The tune's full 36-bar form has more disputed harmonic variation between recordings, not covered here.",
  },
  {
    title: "Almost Blue",
    artist: "Elvis Costello (famously covered by Chet Baker)",
    genre: "Jazz Standard / Ballad",
    popularityRank: 84,
    key: "D minor (with a descending A minor pattern)",
    chords: ["Am", "Dm9", "insufficient independent corroboration beyond the intro — see notes"],
    degreeSequence: "needs verification",
    confidence: "needs-verification",
    oneFiveSixFourMatch: false,
    notes:
      "Only one real source with specific chord detail was found (Am-Dm9-E+ for the intro, with a ii-V-i in A minor recurring through the tune) — not independently cross-confirmed by a second source with matching specificity, so flagged rather than presented as solid, per this project's two-source standard.",
  },

  // --- Third batch: a church-hymn request, a title correction batch, ---
  // and net-new top-streamed love songs (2026-10-05)
  {
    title: "Amazing Grace",
    artist: "Traditional hymn (John Newton, 1779)",
    genre: "Hymn/Gospel",
    popularityRank: 85,
    key: "G major",
    chords: ["G", "Em", "C", "D"],
    degreeSequence: "I - vi - IV - V",
    confidence: "confirmed",
    oneFiveSixFourMatch: "variant",
    fourChordOrderFamily: "C",
    notes:
      "The classic, nearly-universal arrangement of this hymn — same I-vi-IV-V family as Lesson 4 and Perfect. Public domain (1779 text; the tune 'New Britain' predates any modern copyright by well over a century).",
  },
  {
    title: "When I Was Your Man",
    artist: "Bruno Mars",
    genre: "Pop Ballad",
    popularityRank: 86,
    key: "Ab major (original); sources disagree on a practical chord reading",
    chords: ["insufficient agreement for a simple chart — see notes"],
    degreeSequence: "needs verification",
    confidence: "needs-verification",
    oneFiveSixFourMatch: false,
    notes:
      "Sources genuinely conflict: one gives Bm7-G-D-A, another gives Em7-C-G-D (not the same relative progression), another lists an entirely different basic chord set (C, Dm, F, Am, G, Em), and one describes modal interchange between A major and A minor sections. Too inconsistent to present one confident chart.",
  },
  {
    title: "Break My Heart Again",
    artist: "FINNEAS",
    genre: "Pop/Alternative",
    popularityRank: 87,
    key: "E minor",
    chords: ["C", "D", "D7", "Bm", "Em"],
    degreeSequence: "needs verification — see notes",
    confidence: "needs-verification",
    oneFiveSixFourMatch: false,
    notes:
      "Only one source with real chord specificity was found (intro C-D-D7-Bm-Em, chorus built on C-D-D7/G-Em) — not independently cross-confirmed by a second source with matching detail, so flagged per this project's two-source standard despite looking plausible.",
  },
  {
    title: "Can't Help Falling in Love",
    artist: "Elvis Presley",
    genre: "Pop Standard",
    popularityRank: 88,
    key: "C major (original recording in D major)",
    chords: ["C", "Em", "Am", "F"],
    degreeSequence: "I - iii - vi - IV (verse, in the common C teaching key)",
    confidence: "confirmed",
    oneFiveSixFourMatch: false,
    notes:
      "Verse progression (C-Em-Am-F) is consistently documented across sources, though the exact key varies by recording/version (studio 1961 vs. 1968 vs. 1973 performances differ) — normal for a 60+ year old standard. The bridge uses different, more complex chords (Em7, Bm11, B11b9, A7) not covered here.",
  },
  {
    title: "Say You Won't Let Go",
    artist: "James Arthur",
    genre: "Pop Ballad",
    popularityRank: 89,
    key: "G major",
    chords: ["G", "D", "Em", "C"],
    degreeSequence: "I - V - vi - IV",
    confidence: "confirmed",
    oneFiveSixFourMatch: "exact",
    notes: "Explicitly documented as G-D-Em-C (sometimes Em7) throughout — the exact Lesson 1 shape.",
  },
  {
    title: "Die for You",
    artist: "The Weeknd",
    genre: "R&B/Synth-pop",
    popularityRank: 90,
    key: "D minor (sources disagree on the chart)",
    chords: ["insufficient agreement for a simple chart — see notes"],
    degreeSequence: "needs verification",
    confidence: "needs-verification",
    oneFiveSixFourMatch: false,
    notes:
      "Sources give three materially different chord sets (Am-Bb-Dm-Gm; Cmaj7-Dm9-F6 for intro with Fmaj7-Fm6-Cmaj7-Asus2-Dm7-Fm6 for pre-chorus; and an entirely separate G-F#m-Bm-Em reading, possibly a different transposition or a different section) — genuinely too inconsistent to present one confident chart.",
  },
  {
    title: "All of Me",
    artist: "John Legend",
    genre: "Pop Ballad",
    popularityRank: 91,
    key: "Ab major",
    chords: ["Fm", "Db", "Ab", "Eb"],
    degreeSequence: "vi - IV - I - V",
    confidence: "confirmed",
    oneFiveSixFourMatch: "exact",
    notes:
      "Verse is explicitly documented as a vi-IV-I-V progression (Fm-Db-Ab-Eb) — re-derived its chord-to-chord adjacency by hand and confirmed it's the identical edge set to Lesson 1's loop, just starting at a different point in the cycle. A genuine exact match.",
  },
  {
    title: "Just the Way You Are",
    artist: "Bruno Mars",
    genre: "Pop/R&B",
    popularityRank: 92,
    key: "C major (original recording in F major)",
    chords: ["C", "Am", "F", "C"],
    degreeSequence: "I - vi - IV - I",
    confidence: "confirmed",
    oneFiveSixFourMatch: false,
    notes: "Re-checked: the main loop is F-Dm-Bb-F (I-vi-IV-I) in F major; in the teaching key of C it's C-Am-F-C. Corrected from an earlier entry that listed C-G-Am-F (that's a different progression).",
  },

  // --- Fourth batch (2026-10-05): classic rock, Adele, and two more ---
  // title corrections confirmed with Sid (Set Fire to the Rain;
  // 25 Minutes, not "21 Minutes")
  {
    title: "November Rain",
    artist: "Guns N' Roses",
    genre: "Rock Ballad",
    popularityRank: 93,
    key: "B major (shifts through related keys/modes)",
    chords: ["insufficient agreement for a simple chart — see notes"],
    degreeSequence: "needs verification",
    confidence: "needs-verification",
    oneFiveSixFourMatch: false,
    notes:
      "Sources agree the intro is Bmaj-C#m-G#m-E-F#-D#m, but give two materially different verse/chorus chord sets (F-Dm-C-G vs. E-C#m-B-A) with no clear resolution of which is correct — plus the song genuinely shifts through related keys/modes across its 9 minutes. Too inconsistent for one confident chart.",
  },
  {
    title: "Sweet Child O' Mine",
    artist: "Guns N' Roses",
    genre: "Rock",
    popularityRank: 94,
    key: "D major (recorded a half-step down, Eb)",
    chords: ["D", "C", "G", "D"],
    degreeSequence: "intro: I-VII-IV-I (borrowed VII, not fully diatonic) — see notes",
    confidence: "confirmed",
    oneFiveSixFourMatch: false,
    notes:
      "Intro riff (D-C-G) and chorus (G-D-Am-C) are consistently documented, but include a borrowed/non-diatonic chord (C major, the bVII, is outside D major's own key) — common in rock but not reducible to a clean roman-numeral analysis, so degrees are described rather than forced into a false-precision roman numeral reading.",
  },
  {
    title: "Hotel California",
    artist: "Eagles",
    genre: "Rock",
    popularityRank: 95,
    key: "B minor",
    chords: ["Bm", "F#7", "A", "E", "G", "D", "Em", "F#"],
    degreeSequence: "i - V7 - VII - IV - VI - III - iv - V (8-chord loop, borrows from the parallel major)",
    confidence: "confirmed",
    oneFiveSixFourMatch: false,
    notes:
      "One of the most consistently-documented chord progressions in rock — an 8-chord loop, not a simple 4-chord pattern, deliberately mixing minor-key and parallel-major-borrowed chords for its distinctive, unsettled color.",
  },
  {
    title: "Summer of '69",
    artist: "Bryan Adams",
    genre: "Rock",
    popularityRank: 96,
    key: "A major",
    chords: ["A", "E", "F#m", "D"],
    degreeSequence: "I - V - vi - IV",
    confidence: "confirmed",
    oneFiveSixFourMatch: "exact",
    notes: "Explicitly documented as an I-V-vi-IV verse progression (A-E-F#m-D) — the exact Lesson 1 shape.",
  },
  {
    title: "Make You Feel My Love",
    artist: "Adele (originally Bob Dylan)",
    genre: "Pop Ballad",
    popularityRank: 97,
    key: "disputed — varies by version, see notes",
    chords: ["insufficient agreement for a simple chart — see notes"],
    degreeSequence: "needs verification",
    confidence: "needs-verification",
    oneFiveSixFourMatch: false,
    notes:
      "Sources give several materially different chord sets (D-A-Bm-G; G-Em-C-D/G-Em-D-D7; C-G-Am-F), most likely reflecting real differences between Dylan's original and Adele's cover and various transposed teaching versions — too inconsistent to single out one as 'the' Adele chart without a source that specifically confirms which version it's transcribing.",
  },
  {
    title: "Set Fire to the Rain",
    artist: "Adele",
    genre: "Pop Ballad",
    popularityRank: 98,
    key: "D minor",
    chords: ["Dm", "F", "C", "Bb"],
    degreeSequence: "i - III - VII - VI (verse)",
    confidence: "confirmed",
    oneFiveSixFourMatch: false,
    notes:
      "A detailed, internally-consistent source gives verse (i-III-VII-VI) and chorus (Dm-F-C-Gm, using the natural-minor iv) progressions — a real minor-key loop, not a 1-5-6-4 match.",
  },
  {
    title: "Somebody's Me",
    artist: "Enrique Iglesias",
    genre: "Pop",
    popularityRank: 99,
    key: "Ab major",
    chords: ["Ab", "Eb", "Db"],
    degreeSequence: "I - V - IV (3-chord loop, no vi)",
    confidence: "confirmed",
    oneFiveSixFourMatch: false,
    notes: "A simple three-chord loop built around Ab major — no minor chord in the main progression.",
  },
  {
    title: "Still D.R.E.",
    artist: "Dr. Dre ft. Snoop Dogg",
    genre: "Hip-Hop",
    popularityRank: 100,
    key: "disputed — see notes",
    chords: ["insufficient agreement for a simple chart — see notes"],
    degreeSequence: "needs verification",
    confidence: "needs-verification",
    oneFiveSixFourMatch: false,
    notes:
      "Item 44 re-check: still genuinely disputed after fresh research. Several 'how to play on piano' results sharing identical text (syndicated/mirrored across different domains, not independent) converge on A minor (all-white-keys), but other distinct sources describe a C major I-V-vi-IV reading or a G-major-bass intro instead — real disagreement between actually-different sources, not resolved by finding more mirrors of the same article. Reported honestly rather than picking one arbitrarily.",
  },
  {
    title: "25 Minutes",
    artist: "Michael Learns to Rock",
    genre: "Pop Rock",
    popularityRank: 101,
    key: "G major (original key F#, commonly taught/played in G)",
    chords: ["G", "D", "Em", "Bm", "C", "A", "C9", "F"],
    degreeSequence: "uses 8 chords across the song — richer than a simple 4-chord loop",
    confidence: "confirmed",
    oneFiveSixFourMatch: false,
    notes: "A real, well-documented 8-chord arrangement in G major — too rich to reduce to one 4-chord pattern.",
  },
  {
    title: "Someday",
    artist: "Michael Learns to Rock",
    genre: "Pop Rock",
    popularityRank: 102,
    key: "D major",
    chords: ["Bm", "G", "D", "A", "Em"],
    degreeSequence: "vi - IV - I - V repeating through the intro/verse, ii (Em) appears later",
    confidence: "confirmed",
    oneFiveSixFourMatch: false,
    notes:
      "Item 44 re-verification: real chord/tab data found this pass (the song-titled 'Michael Learns to Rock' and not the unrelated same-titled songs by other artists that an earlier search had returned instead) — Bm-G-D-A repeating, with Em appearing later in the progression, cross-checked across two independent tab sources (Ultimate Guitar, Chordu). Not the same 4-chord family as Lesson 1 (starts on vi, not I).",
  },
  {
    // Item 39: independently researched and cross-checked across
    // multiple sources (a UkuTabs-style chord chart, a separate
    // "Creep progression" reference discussing this exact song, and a
    // third general chord-chart result) — all agree on the same chord
    // set and all independently identify it as using the famous
    // "Creep" borrowed-chord progression (I-III7-IV-iv in A major,
    // the same trick Radiohead's "Creep" uses in G), which is also a
    // real, musically-sensible fact on its own (not just "sources
    // agree," the harmony itself checks out). Confident enough to mark
    // confirmed rather than needs-verification.
    title: "My Love Mine All Mine",
    artist: "Mitski",
    genre: "Indie Pop",
    popularityRank: 103,
    key: "A major",
    chords: ["Amaj7", "Db7", "D", "Dm"],
    degreeSequence: "I(maj7) - III7 - IV - iv (the \"Creep progression\" — a borrowed major III and minor iv)",
    confidence: "confirmed",
    oneFiveSixFourMatch: false,
    notes:
      "Uses the same borrowed-chord trick as Radiohead's 'Creep' (a major chord on the 3rd degree, then the 4th degree played both major and minor) — multiple independent sources agree on this exact chord set (Amaj7, Db7, D, Dm) and independently name the Creep-progression connection, not just one site's chart copied around.",
  },

  // ===== Item 60: 32 more songs — 12 easy (incl. two Chet Baker, simplified),
  // 10 intermediate, 10 advanced (incl. Tom and Jerry's concert pieces). =====
  {
    "title": "Heart and Soul",
    "artist": "Hoagy Carmichael & Frank Loesser (1938)",
    "genre": "Standard / Piano duet",
    "popularityRank": 104,
    "key": "C major",
    "chords": [
      "C",
      "Am",
      "F",
      "G"
    ],
    "degreeSequence": "I - vi - IV - V",
    "confidence": "confirmed",
    "oneFiveSixFourMatch": "variant",
    "fourChordOrderFamily": "C",
    "notes": "The famous two-person piano duet loop — one player loops these four chords low, the other plays the tune on top. Same four chords as Lesson 1, in the I-vi-IV-V order Lesson 4 teaches."
  },
  {
    "title": "Hallelujah",
    "artist": "Leonard Cohen",
    "genre": "Folk / Ballad",
    "popularityRank": 105,
    "key": "C major (commonly taught key)",
    "chords": [
      "C",
      "Am",
      "C",
      "Am",
      "F",
      "G",
      "C",
      "G"
    ],
    "degreeSequence": "I - vi - I - vi - IV - V - I - V (verse)",
    "confidence": "confirmed",
    "oneFiveSixFourMatch": false,
    "difficulty": "Beginner",
    "notes": "The verse's slow rocking between C and Am, then up to F and G. Widely taught in C; the chorus is mostly F - Am - F - C - G - C."
  },
  {
    "title": "Imagine",
    "artist": "John Lennon",
    "genre": "Rock / Ballad",
    "popularityRank": 106,
    "key": "C major",
    "chords": [
      "C",
      "Cmaj7",
      "F"
    ],
    "degreeSequence": "I - Imaj7 - IV (verse)",
    "confidence": "confirmed",
    "oneFiveSixFourMatch": false,
    "difficulty": "Beginner",
    "notes": "Famous for its piano part: the verse just rocks between C, Cmaj7 (C with a B on top) and F. The chorus adds G and E7."
  },
  {
    "title": "Happy Birthday to You",
    "artist": "Traditional (melody by Mildred & Patty Hill, 1893)",
    "genre": "Traditional",
    "popularityRank": 107,
    "key": "C major",
    "chords": [
      "C",
      "G7",
      "C",
      "C7",
      "F",
      "C",
      "G7",
      "C"
    ],
    "degreeSequence": "I - V7 - I - I7 - IV - I - V7 - I",
    "confidence": "confirmed",
    "oneFiveSixFourMatch": false,
    "difficulty": "Beginner",
    "notes": "The melody is in the public domain in the US. Three chords — C, F and G7 (plus C7 to lead into F) — carry the whole song."
  },
  {
    "title": "Twinkle Twinkle Little Star",
    "artist": "Traditional (French melody, 1761)",
    "genre": "Traditional / Children's",
    "popularityRank": 108,
    "key": "C major",
    "chords": [
      "C",
      "F",
      "C",
      "G7",
      "C"
    ],
    "degreeSequence": "I - IV - I - V7 - I",
    "confidence": "confirmed",
    "oneFiveSixFourMatch": false,
    "difficulty": "Beginner",
    "notes": "The 18th-century French tune 'Ah! vous dirai-je, maman' — the same melody as the alphabet song. Public domain."
  },
  {
    "title": "Brown Eyed Girl",
    "artist": "Van Morrison",
    "genre": "Rock / Pop",
    "popularityRank": 109,
    "key": "G major",
    "chords": [
      "G",
      "C",
      "G",
      "D"
    ],
    "degreeSequence": "I - IV - I - V",
    "confidence": "confirmed",
    "oneFiveSixFourMatch": false,
    "difficulty": "Beginner",
    "notes": "A bright three-chord loop — G, C and D — through most of the song."
  },
  {
    "title": "Three Little Birds",
    "artist": "Bob Marley & The Wailers",
    "genre": "Reggae",
    "popularityRank": 110,
    "key": "A major",
    "chords": [
      "A",
      "D",
      "A",
      "E"
    ],
    "degreeSequence": "I - IV - I - V",
    "confidence": "confirmed",
    "oneFiveSixFourMatch": false,
    "difficulty": "Beginner",
    "notes": "Three chords, played on the off-beats in reggae style ('every little thing...')."
  },
  {
    "title": "Jingle Bells",
    "artist": "James Lord Pierpont (1857)",
    "genre": "Traditional / Holiday",
    "popularityRank": 111,
    "key": "G major",
    "chords": [
      "G",
      "C",
      "G",
      "D7",
      "G"
    ],
    "degreeSequence": "I - IV - I - V7 - I",
    "confidence": "confirmed",
    "oneFiveSixFourMatch": false,
    "difficulty": "Beginner",
    "notes": "Public domain. The chorus is almost all G, with C and D7 at the turns."
  },
  {
    "title": "Hey Jude",
    "artist": "The Beatles",
    "genre": "Rock / Pop",
    "popularityRank": 112,
    "key": "F major",
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
    "degreeSequence": "I - V - V7 - I - IV - I - V7 - I (verse)",
    "confidence": "confirmed",
    "oneFiveSixFourMatch": false,
    "difficulty": "Beginner",
    "notes": "A piano song at heart (Paul McCartney's piano part). Bb is the first flat chord many beginners meet. The long 'na-na-na' coda is F - Eb - Bb - F."
  },
  {
    "title": "Take Me Home, Country Roads",
    "artist": "John Denver",
    "genre": "Country / Folk",
    "popularityRank": 113,
    "key": "G major (original recording in A major)",
    "chords": [
      "G",
      "Em",
      "D",
      "C"
    ],
    "degreeSequence": "I - vi - V - IV (chorus)",
    "confidence": "confirmed",
    "oneFiveSixFourMatch": "variant",
    "fourChordOrderFamily": "D",
    "notes": "The chorus is the same four chords as Lesson 1 in a different order (I-vi-V-IV). Recorded in A; usually taught in G."
  },
  {
    "title": "Autumn Leaves (Chet Baker, simplified)",
    "artist": "Joseph Kosma — as recorded by Chet Baker & Paul Desmond (1974)",
    "genre": "Jazz (simplified)",
    "popularityRank": 114,
    "key": "E minor / G major",
    "chords": [
      "Am",
      "D",
      "G",
      "C",
      "F#dim",
      "B",
      "Em"
    ],
    "degreeSequence": "iv - VII - III - VI - ii° - V - i",
    "confidence": "confirmed",
    "oneFiveSixFourMatch": false,
    "difficulty": "Beginner",
    "notes": "Chet Baker's version of the jazz standard, simplified to plain 3-note chords so a beginner can play it: the real jazz chords are Am7 - D7 - Gmaj7 - Cmaj7 - F#m7b5 - B7 - Em (see the Advanced 'Autumn Leaves' entry). Same order, simpler shapes."
  },
  {
    "title": "My Funny Valentine (easy version)",
    "artist": "Rodgers & Hart — Chet Baker's signature song (1954)",
    "genre": "Jazz (simplified)",
    "popularityRank": 115,
    "key": "C minor",
    "chords": [
      "Cm",
      "CmMaj7",
      "Cm7",
      "Cm6"
    ],
    "degreeSequence": "i - i(maj7) - i7 - i6",
    "confidence": "confirmed",
    "oneFiveSixFourMatch": false,
    "difficulty": "Beginner",
    "notes": "Chet Baker's most famous recording. The opening is genuinely beginner-friendly: hold a C minor chord and move just ONE finger down a key at a time (C - B - Bb - A). The full tune is in the Advanced section."
  },
  {
    "title": "Clocks",
    "artist": "Coldplay",
    "genre": "Alternative Rock",
    "popularityRank": 116,
    "key": "Eb major",
    "chords": [
      "Eb",
      "Bbm",
      "Fm"
    ],
    "degreeSequence": "I - v - ii",
    "confidence": "confirmed",
    "oneFiveSixFourMatch": false,
    "difficulty": "Intermediate",
    "notes": "The famous rolling piano riff is broken chords over these three — one of the most recognizable piano parts in modern rock. Three flats, so lots of black keys."
  },
  {
    "title": "Piano Man",
    "artist": "Billy Joel",
    "genre": "Rock / Piano",
    "popularityRank": 117,
    "key": "C major",
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
    "degreeSequence": "I - V/7 - IV/6 - I/5 - IV - I/3 - II7 - V (verse)",
    "confidence": "confirmed",
    "oneFiveSixFourMatch": false,
    "difficulty": "Intermediate",
    "notes": "A walking-down bass line (C - B - A - G - F - E - D) under the chords — the slash chords show the bass note. In 3/4 (waltz) time."
  },
  {
    "title": "Hello",
    "artist": "Adele",
    "genre": "Pop / Ballad",
    "popularityRank": 118,
    "key": "F minor",
    "chords": [
      "Fm",
      "Ab",
      "Eb",
      "Db"
    ],
    "degreeSequence": "i - III - VII - VI",
    "confidence": "confirmed",
    "oneFiveSixFourMatch": false,
    "difficulty": "Intermediate",
    "notes": "Four chords on piano under the whole verse, all in F minor with four flats."
  },
  {
    "title": "Creep",
    "artist": "Radiohead",
    "genre": "Alternative Rock",
    "popularityRank": 119,
    "key": "G major",
    "chords": [
      "G",
      "B",
      "C",
      "Cm"
    ],
    "degreeSequence": "I - III - IV - iv",
    "confidence": "confirmed",
    "oneFiveSixFourMatch": false,
    "difficulty": "Intermediate",
    "notes": "Famous for two 'borrowed' chords: B major (not normally in G) and C minor (the minor iv) — that's the sad lift."
  },
  {
    "title": "Counting Stars",
    "artist": "OneRepublic",
    "genre": "Pop",
    "popularityRank": 120,
    "key": "C# minor",
    "chords": [
      "C#m",
      "E",
      "B",
      "A"
    ],
    "degreeSequence": "i - III - VII - VI",
    "confidence": "confirmed",
    "oneFiveSixFourMatch": false,
    "difficulty": "Intermediate",
    "notes": "Recorded in C# minor (often played as Am - C - G - F with a capo). The same four-chord loop runs through the song."
  },
  {
    "title": "Comptine d'un autre été",
    "artist": "Yann Tiersen (Amélie, 2001)",
    "genre": "Film / Piano",
    "popularityRank": 121,
    "key": "E minor",
    "chords": [
      "Em",
      "G",
      "Bm",
      "D"
    ],
    "degreeSequence": "i - III - v - VII",
    "confidence": "confirmed",
    "oneFiveSixFourMatch": false,
    "difficulty": "Intermediate",
    "notes": "The Amélie piano piece: the left hand rocks through these four chords while the right hand repeats a fast pattern. Intermediate mainly for the hand speed."
  },
  {
    "title": "River Flows in You",
    "artist": "Yiruma (2001)",
    "genre": "Contemporary Piano",
    "popularityRank": 122,
    "key": "A major",
    "chords": [
      "A",
      "E",
      "F#m",
      "D"
    ],
    "degreeSequence": "I - V - vi - IV",
    "confidence": "confirmed",
    "oneFiveSixFourMatch": "exact",
    "difficulty": "Intermediate",
    "notes": "One of the most-learned piano pieces online. The same four chords as Lesson 1 (I-V-vi-IV), in A — but as a full flowing piano piece, so it's Intermediate."
  },
  {
    "title": "Radioactive",
    "artist": "Imagine Dragons",
    "genre": "Alternative Rock",
    "popularityRank": 123,
    "key": "B minor",
    "chords": [
      "Bm",
      "D",
      "A",
      "E"
    ],
    "degreeSequence": "i - III - VII - IV",
    "confidence": "confirmed",
    "oneFiveSixFourMatch": false,
    "difficulty": "Intermediate",
    "notes": "The same four chords throughout the song."
  },
  {
    "title": "Billie Jean",
    "artist": "Michael Jackson",
    "genre": "Pop / Funk",
    "popularityRank": 124,
    "key": "F# minor",
    "chords": [
      "F#m",
      "G#m/F#",
      "A/F#",
      "G#m/F#"
    ],
    "degreeSequence": "i - ii - III - ii (over an F# bass)",
    "confidence": "confirmed",
    "oneFiveSixFourMatch": false,
    "difficulty": "Intermediate",
    "notes": "The famous bass line stays rooted on F# while the chords change on top — the '/F#' means F# stays in the bass."
  },
  {
    "title": "Sweet Dreams (Are Made of This)",
    "artist": "Eurythmics",
    "genre": "Synth-pop",
    "popularityRank": 125,
    "key": "C minor",
    "chords": [
      "Cm",
      "Ab",
      "G"
    ],
    "degreeSequence": "i - VI - V",
    "confidence": "confirmed",
    "oneFiveSixFourMatch": false,
    "difficulty": "Intermediate",
    "notes": "A three-chord minor loop; the G major chord (not G minor) gives it the pull back to C minor."
  },
  {
    "title": "Fly Me to the Moon",
    "artist": "Bart Howard (1954)",
    "genre": "Jazz Standard",
    "popularityRank": 126,
    "key": "C major (A section starts on A minor)",
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
    "degreeSequence": "vi7 - ii7 - V7 - Imaj7 - IVmaj7 - vii7b5 - V7/vi - vi7",
    "confidence": "confirmed",
    "oneFiveSixFourMatch": false,
    "notes": "A textbook 'circle of fifths' progression — every chord's root falls by a fifth to the next. Made famous by Frank Sinatra (1964)."
  },
  {
    "title": "Take Five",
    "artist": "Paul Desmond — Dave Brubeck Quartet (1959)",
    "genre": "Jazz Standard",
    "popularityRank": 127,
    "key": "Eb minor",
    "chords": [
      "Ebm",
      "Bbm7"
    ],
    "degreeSequence": "i - v7 (vamp)",
    "confidence": "confirmed",
    "oneFiveSixFourMatch": false,
    "notes": "In 5/4 time — five beats per bar, the whole point of the piece. The piano vamps between Ebm and Bbm7 under the sax melody."
  },
  {
    "title": "All of Me (jazz standard)",
    "artist": "Gerald Marks & Seymour Simons (1931)",
    "genre": "Jazz Standard",
    "popularityRank": 128,
    "key": "C major",
    "chords": [
      "C",
      "E7",
      "A7",
      "Dm",
      "E7",
      "Am",
      "D7",
      "Dm7",
      "G7"
    ],
    "degreeSequence": "I - III7 - VI7 - ii - III7 - vi - II7 - ii7 - V7",
    "confidence": "confirmed",
    "oneFiveSixFourMatch": false,
    "notes": "Not the John Legend song — the 1931 standard. Famous for its chain of dominant 7th chords (E7 → A7 → Dm, D7 → G7 → C)."
  },
  {
    "title": "Summertime",
    "artist": "George Gershwin (Porgy and Bess, 1935)",
    "genre": "Jazz Standard",
    "popularityRank": 129,
    "key": "A minor",
    "chords": [
      "Am6",
      "E7",
      "Am6",
      "Dm6",
      "Bm7b5",
      "E7",
      "Am6"
    ],
    "degreeSequence": "i6 - V7 - i6 - iv6 - ii7b5 - V7 - i6",
    "confidence": "needs-verification",
    "oneFiveSixFourMatch": false,
    "notes": "The basic minor shape (Am - E7 - Am - Dm - E7 - Am) is well established; exact chord colors and bar placement vary a lot between lead sheets, so treat these as a simplified guide."
  },
  {
    "title": "Satin Doll",
    "artist": "Duke Ellington & Billy Strayhorn (1953)",
    "genre": "Jazz Standard",
    "popularityRank": 130,
    "key": "C major",
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
      "Cmaj7"
    ],
    "degreeSequence": "ii7 - V7 (×2) - ii7/ii - V7/ii (×2) - ii7/V - V7/V - (chromatic ii-V) - Imaj7",
    "confidence": "confirmed",
    "oneFiveSixFourMatch": false,
    "notes": "The A section is a chain of ii-V pairs, each one a step lower — the classic jazz 'ii-V' workout."
  },
  {
    "title": "Cantaloupe Island",
    "artist": "Herbie Hancock (1964)",
    "genre": "Jazz Standard",
    "popularityRank": 131,
    "key": "F minor",
    "chords": [
      "Fm7",
      "Db7",
      "Dm7",
      "Fm7"
    ],
    "degreeSequence": "i7 - bVI7 - vi7 - i7 (4 bars each)",
    "confidence": "confirmed",
    "oneFiveSixFourMatch": false,
    "notes": "A 16-bar modal tune: four bars of each chord. The piano riff on Fm7 is the hook."
  },
  {
    "title": "Gymnopédie No. 1",
    "artist": "Erik Satie (1888)",
    "genre": "Classical",
    "popularityRank": 132,
    "key": "D major",
    "chords": [
      "Gmaj7",
      "Dmaj7"
    ],
    "degreeSequence": "IVmaj7 - Imaj7 (alternating)",
    "confidence": "confirmed",
    "oneFiveSixFourMatch": false,
    "advanced": true,
    "notes": "Public domain. The famous opening slowly alternates two gentle 7th chords, one per bar, in 3/4 time."
  },
  {
    "title": "Prelude in C major, BWV 846",
    "artist": "Johann Sebastian Bach (1722)",
    "genre": "Classical",
    "popularityRank": 133,
    "key": "C major",
    "chords": [
      "C",
      "Dm7/C",
      "G7/B",
      "C",
      "Am/C",
      "D7/C",
      "G/B",
      "Cmaj7/B"
    ],
    "degreeSequence": "I - ii7/1 - V7/7 - I - vi/3 - V7/V - V/7 - Imaj7/7 (bars 1-8)",
    "confidence": "confirmed",
    "oneFiveSixFourMatch": false,
    "advanced": true,
    "notes": "Public domain — the first 8 bars, one chord per bar, each played as the same broken-chord pattern. Taught note by note in the Bach lesson."
  },
  {
    "title": "The Blue Danube (waltz)",
    "artist": "Johann Strauss II (1866)",
    "genre": "Classical",
    "popularityRank": 134,
    "key": "D major",
    "chords": [
      "D",
      "A7"
    ],
    "degreeSequence": "I - V7",
    "confidence": "needs-verification",
    "oneFiveSixFourMatch": false,
    "advanced": true,
    "notes": "Strauss's most famous waltz — Tom and Jerry's Oscar-winning 'Johann Mouse' (1953) is all about Strauss's waltzes, played by concert pianist Jakob Gimpel (which waltzes it uses isn't something we've confirmed). Only the main theme's two core chords are given here (it begins over D major and moves to A7); the full waltz goes much further."
  },
  {
    "title": "Hungarian Rhapsody No. 2",
    "artist": "Franz Liszt (1847)",
    "genre": "Classical",
    "popularityRank": 135,
    "key": "C# minor → F# major",
    "chords": [
      "C#m",
      "F#"
    ],
    "degreeSequence": "i (slow 'lassan') → V of i, ending in F# major ('friska')",
    "confidence": "needs-verification",
    "oneFiveSixFourMatch": false,
    "advanced": true,
    "notes": "The piece Tom plays in Tom and Jerry's Oscar-winning 'The Cat Concerto' (1947) — and Bugs Bunny in 'Rhapsody Rabbit'. A virtuoso showpiece: a slow, dramatic 'lassan' in C# minor, then a wild, fast 'friska' that ends in F# major. Only those two home chords are given here — the real harmony is far richer."
  },
];

// Precomputed, honestly-reported summary for the Lesson 1 payoff screen.
// Advanced/bonus entries (e.g. Bohemian Rhapsody) are deliberately
// excluded from this beginner-curriculum payoff count even if some
// section of theirs happens to share the pattern.
const ONE_FIVE_SIX_FOUR_SONGS = SONGS.filter((s) => s.oneFiveSixFourMatch && !s.advanced);

// --- Full song structures (Practice tab "play the whole song" mode) ----
//
// Most of the 73 entries above only have a single 4-chord loop recorded
// — real, but a simplification (the "main riff," not the whole
// arrangement). For a subset of the already-highest-confidence songs,
// this maps the actual section-by-section structure (Intro, Verse,
// Chorus, Bridge, etc.) with each section's own chord sequence, so the
// Practice tab can play/scroll through an entire song once instead of
// just looping the main 4 chords forever.
//
// Scope, stated honestly: this is NOT done for all 73 songs — that
// would be a much bigger research lift than the simple-loop version,
// and rushing it would mean guessing bridge/pre-chorus chords without
// real confidence. Covered here: 12 of the highest-confidence,
// best-documented songs, prioritizing ones with genuinely well-sourced
// section detail (not just "it's the same 4 chords the whole time"
// restated as fake "structure"). Bar counts are approximate (rounded
// to musically typical phrase lengths — 4 or 8 bars), not pulled from
// a measure-by-measure transcription. No lyrics anywhere, per the
// product's legal scope — sections are labeled structurally only
// ("Chorus," "Bridge"), never with lyric text.
//
// Songs NOT in this map fall back to the existing simple-loop Practice
// view using their top-level `chords` array, looped indefinitely.
const SONG_STRUCTURES = {
  "Creep": [
    { section: "Intro", chords: ["G", "B", "C", "Cm"], bars: 4 },
    { section: "Verse 1", chords: ["G", "B", "C", "Cm"], bars: 8 },
    { section: "Chorus 1", chords: ["G", "B", "C", "Cm"], bars: 8 },
    { section: "Verse 2", chords: ["G", "B", "C", "Cm"], bars: 8 },
    { section: "Chorus 2", chords: ["G", "B", "C", "Cm"], bars: 8 },
    { section: "Bridge", chords: ["G", "B", "C", "Cm"], bars: 8 },
    { section: "Chorus 3", chords: ["G", "B", "C", "Cm"], bars: 8 },
    { section: "Outro", chords: ["G", "B", "C", "Cm"], bars: 4 },
  ],
  "Let It Be": [
    { section: "Intro", chords: ["C", "G", "Am", "F"], bars: 4 },
    { section: "Verse 1", chords: ["C", "G", "Am", "F", "C", "G", "F", "C"], bars: 8 },
    { section: "Chorus 1", chords: ["Am", "G", "F", "C", "C", "G", "F", "C"], bars: 8 },
    { section: "Verse 2", chords: ["C", "G", "Am", "F", "C", "G", "F", "C"], bars: 8 },
    { section: "Chorus 2", chords: ["Am", "G", "F", "C", "C", "G", "F", "C"], bars: 8 },
    { section: "Bridge / Solo", chords: ["C", "G", "Am", "F"], bars: 8, note: "Simplified to the core loop here — some recordings add extra turnaround chords in this section that aren't confidently documented across sources." },
    { section: "Final Chorus", chords: ["Am", "G", "F", "C", "C", "G", "F", "C"], bars: 8 },
    { section: "Outro", chords: ["C", "G", "Am", "F", "C"], bars: 5 },
  ],
  "No Woman No Cry": [
    { section: "Intro", chords: ["C", "G", "Am", "F"], bars: 4 },
    { section: "Verse 1", chords: ["C", "G", "Am", "F"], bars: 8 },
    { section: "Chorus 1", chords: ["C", "G", "Am", "F"], bars: 8 },
    { section: "Verse 2", chords: ["C", "G", "Am", "F"], bars: 8 },
    { section: "Chorus 2 (extended, fades out)", chords: ["C", "G", "Am", "F"], bars: 16, note: "Sources agree this song never deviates from the one loop — no bridge, no key change, for the entire track." },
  ],
  "Love Story": [
    { section: "Intro", chords: ["D", "A", "Bm", "G"], bars: 4 },
    { section: "Verse 1", chords: ["D", "A", "Bm", "G"], bars: 8 },
    { section: "Chorus 1", chords: ["D", "A", "Bm", "G"], bars: 8 },
    { section: "Verse 2", chords: ["D", "A", "Bm", "G"], bars: 8 },
    { section: "Chorus 2", chords: ["D", "A", "Bm", "G"], bars: 8 },
    { section: "Bridge", chords: ["Bm", "A", "G", "D"], bars: 8 },
    { section: "Final Chorus (key change to E major)", chords: ["E", "B", "C#m", "A"], bars: 6, note: "The famous 'Marry me, Juliet' moment — the whole song steps up a whole tone from D major to E major." },
  ],
  "Perfect": [
    { section: "Intro", chords: ["G", "Em", "C", "D"], bars: 4 },
    { section: "Verse 1", chords: ["G", "Em", "C", "D"], bars: 8 },
    { section: "Chorus 1", chords: ["Em", "C", "G", "D"], bars: 8 },
    { section: "Verse 2", chords: ["G", "Em", "C", "D"], bars: 8 },
    { section: "Chorus 2", chords: ["Em", "C", "G", "D"], bars: 8 },
    { section: "Bridge", chords: ["G", "Em", "C", "D"], bars: 8, note: "Sources explicitly describe this progression looping 'the entire way through — every verse, every chorus, every bridge' with no deviation." },
    { section: "Final Chorus", chords: ["Em", "C", "G", "D"], bars: 8 },
  ],
  "Photograph": [
    { section: "Intro", chords: ["C", "Am", "G", "F"], bars: 4 },
    { section: "Verse 1", chords: ["C", "Am", "G", "F"], bars: 8 },
    { section: "Chorus 1", chords: ["C", "Am", "G", "F"], bars: 8 },
    { section: "Verse 2", chords: ["C", "Am", "G", "F"], bars: 8 },
    { section: "Chorus 2", chords: ["C", "Am", "G", "F"], bars: 8, note: "Sources describe this as 'four chords for the entire song' — no bridge deviation documented." },
  ],
  "With or Without You": [
    { section: "Intro", chords: ["D", "A", "Bm", "G"], bars: 8 },
    { section: "Verse 1", chords: ["D", "A", "Bm", "G"], bars: 8 },
    { section: "Verse 2", chords: ["D", "A", "Bm", "G"], bars: 8 },
    { section: "Chorus", chords: ["D", "A", "Bm", "G"], bars: 8 },
    { section: "Bridge / Climax", chords: ["D", "A", "Bm", "G"], bars: 8, note: "Sources are explicit that this progression 'repeats for nearly five minutes without a single deviation' — the climax is a dynamic/vocal change, not a chord change." },
    { section: "Outro", chords: ["D", "A", "Bm", "G"], bars: 4 },
  ],
  "I'm Yours": [
    { section: "Intro", chords: ["B", "F#", "G#m", "E"], bars: 4 },
    { section: "Verse 1", chords: ["B", "F#", "G#m", "E"], bars: 8 },
    { section: "Verse 2", chords: ["B", "F#", "G#m", "E"], bars: 8, note: "The 'open up your mind' verse — same four chords as verse 1." },
    { section: "Chorus", chords: ["B", "F#", "G#m", "E"], bars: 8 },
    { section: "Bridge", chords: ["B", "D#m", "G#m", "F#", "E", "C#7"], bars: 6, note: "The one section that steps outside the core four chords — adds D#m and a turnaround C#7. (Item 57: transposed from the guitar capo-4 G shapes to the real key, B, so it matches this song's key and chord list.)" },
    { section: "Final Chorus", chords: ["B", "F#", "G#m", "E"], bars: 8 },
  ],
  "Stand By Me": [
    { section: "Intro", chords: ["A", "F#m", "D", "E"], bars: 4 },
    { section: "Verse 1", chords: ["A", "F#m", "D", "E"], bars: 8 },
    { section: "Chorus 1", chords: ["A", "F#m", "D", "E"], bars: 8 },
    { section: "Verse 2", chords: ["A", "F#m", "D", "E"], bars: 8 },
    { section: "Chorus 2", chords: ["A", "F#m", "D", "E"], bars: 8, note: "Sources describe the entire song revolving around this one repeated I-vi-IV-V progression." },
  ],
  "Shape of You": [
    { section: "Intro", chords: ["C#m", "F#m", "A", "B"], bars: 4 },
    { section: "Verse 1", chords: ["C#m", "F#m", "A", "B"], bars: 8 },
    { section: "Pre-Chorus", chords: ["C#m", "F#m", "A", "B"], bars: 8 },
    { section: "Chorus", chords: ["C#m", "F#m", "A", "B"], bars: 8, note: "Sources agree this exact four-chord loop repeats for the entire song, across every section." },
    { section: "Verse 2", chords: ["C#m", "F#m", "A", "B"], bars: 8 },
    { section: "Final Chorus", chords: ["C#m", "F#m", "A", "B"], bars: 8 },
  ],
  "Don't Stop Believin'": [
    { section: "Intro", chords: ["G", "D", "Em", "C"], bars: 8 },
    { section: "Verse 1", chords: ["G", "D", "Em", "C", "G", "D", "Bm", "C"], bars: 8, note: "This is the full 8-chord pattern sources describe: I-V-vi-IV-I-V-iii-IV." },
    { section: "Verse 2 (half-length)", chords: ["G", "D", "Em", "C"], bars: 4 },
    { section: "Pre-Chorus 1", chords: ["C", "C", "G", "G"], bars: 4, note: "Pre-choruses alternate IV and I before a short turnaround." },
    { section: "Verse 3", chords: ["G", "D", "Em", "C", "G", "D", "Bm", "C"], bars: 8 },
    { section: "Pre-Chorus 2", chords: ["C", "C", "G", "G"], bars: 4 },
    { section: "Chorus (until fade)", chords: ["G", "D", "Em", "C", "G", "D", "Bm", "C"], bars: 8, note: "Famously, the chorus doesn't arrive until the song is nearly finished — two verses and two pre-choruses come first." },
  ],
  "Riptide": [
    { section: "Intro", chords: ["Am", "G", "C"], bars: 4 },
    { section: "Verse 1", chords: ["Am", "G", "C"], bars: 8 },
    { section: "Chorus 1", chords: ["Am", "G", "C", "F"], bars: 8 },
    { section: "Verse 2", chords: ["Am", "G", "C"], bars: 8 },
    { section: "Chorus 2", chords: ["Am", "G", "C", "F"], bars: 8, note: "The verse's 3-chord loop (Am-G-C) adds the F only in the chorus, per the most commonly cited ukulele tutorials." },
  ],
  "Someone Like You": [
    { section: "Intro", chords: ["A", "E", "F#m", "D"], bars: 4 },
    { section: "Verse 1", chords: ["A", "E", "F#m", "D"], bars: 8 },
    { section: "Pre-Chorus", chords: ["D", "D", "E", "F#m"], bars: 4 },
    { section: "Chorus", chords: ["A", "E", "F#m", "D"], bars: 8 },
    { section: "Verse 2", chords: ["A", "E", "F#m", "D"], bars: 8 },
    { section: "Bridge", chords: ["D", "D", "F#m", "F#m", "E", "E", "A", "Bm", "D"], bars: 8, note: "The one section that steps outside the core four chords, adding Bm as a passing chord." },
    { section: "Final Chorus", chords: ["A", "E", "F#m", "D"], bars: 8 },
  ],
};

// --- Difficulty tiers (Beginner / Intermediate / Advanced) --------------
// Computed from the chord data already researched and verified above,
// not assigned by genre-name vibes (genre only enters it once, for jazz
// standards specifically — see below — because that category's harmonic
// complexity was independently confirmed while researching every one of
// those songs, not assumed from the label "jazz").
//
//   Beginner     — a confirmed, simple 4-chord-family song (an exact or
//                  reordered 1-5-6-4 relative). The "G-D-Em-C plays 100
//                  songs" category this whole app opens with.
//   Advanced     — a jazz standard (genuinely confirmed harmonically
//                  complex while researching that whole batch — see
//                  THIRD_PARTY_NOTICES/README), or a song explicitly
//                  marked `advanced` (Bohemian Rhapsody).
//   Intermediate — everything else: minor-key loops, 7th-chord/8-chord
//                  progressions, and needs-verification songs (if we're
//                  not even confident enough to call its chords solid,
//                  it isn't honest to call it Beginner-simple either).
function getDifficulty(song) {
  // Item 60: an explicit difficulty wins (e.g. a simple 3-chord song that
  // isn't in the 1-5-6-4 family is still Beginner).
  if (song.difficulty) return song.difficulty;
  if (song.advanced) return "Advanced";
  if (song.genre && song.genre.startsWith("Jazz Standard")) return "Advanced";
  if (song.oneFiveSixFourMatch && song.confidence === "confirmed") return "Beginner";
  return "Intermediate";
}

// Item 60: the optional "World songs" section — popular songs in 10
// other languages (world-songs.js), part of the library (Discover,
// Practice) but taught only in their own skippable lessons at the end.
SONGS.push(...WORLD_SONGS);
SONGS.forEach((s) => {
  if (WORLD_ALSO[s.title]) s.alsoWorld = WORLD_ALSO[s.title];
});

export { SONGS, ONE_FIVE_SIX_FOUR_SONGS, SONG_STRUCTURES, getDifficulty, WORLD_LANGUAGES };
