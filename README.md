# Hayden Keys

A free, gamified, Duolingo-style piano learning web app for
haydenkeys.com. Teaches pop piano the way guitar apps teach chords —
numbers and shapes first, letter names absorbed through repetition,
traditional notation unlocked later.

## Objective (and the non-negotiable constraint behind it)

This must cost **nothing to run, forever**. No backend, no database, no
per-request compute, no account system. It's a pure static site —
plain HTML/CSS/JS, zero build step — deployable to GitHub Pages (or any
static host) at effectively zero hosting cost. Every piece of state
(lesson progress, streak, saved songs, keyboard calibration) lives in
the browser's `localStorage`. The only "AI" in the product
(`basic-pitch`, for the optional own-audio-upload path) runs as a
TensorFlow.js model entirely client-side — nothing is ever uploaded to
a server.

This mirrors the sibling Dawsons project's own "100% local, free
forever" philosophy and the same per-dependency license discipline (see
`THIRD_PARTY_NOTICES.md`).

## What this product is

Four tabs:

1. **Discover** — browse the curated 25-song library by genre, search
   by title/artist. A prominent note explains that pasting a YouTube
   (or any other) link to import arbitrary audio is **not supported**
   and never will be — extracting audio from streaming platforms
   violates their terms of service, full stop. This was a deliberate,
   explicit scope decision, not an oversight.
2. **Practice** — an on-screen piano keyboard you play along with.
   Playback of a song's chord loop can be paused, rewound, and scrubbed
   via a draggable timeline cursor. Includes the two-part keyboard
   calibration flow (below) and an "upload your own recording" path
   that transcribes audio to notes locally via `basic-pitch`.
3. **Saved** — songs you've started/completed and lessons you've
   finished, all from `localStorage`. No account needed, nothing
   server-side.
4. **Lessons** — the gamified curriculum (see Pedagogy below): a lesson
   map, sequential unlocks, and a streak counter.

Phone-camera hand/finger overlay is explicitly **not** in this build —
see "Phase 2" below.

## Pedagogy

Taught by ear/shape first, not jargon:

- **Numbers and shapes lead, letters follow.** A chord is "the 1," "the
  5," shown as a highlighted shape on the on-screen keyboard — the same
  way a guitar app shows a chord diagram before requiring music theory.
  The letter name (G, D, Em, C) is shown as a small label under the big
  number from day one, so it's absorbed through repetition, not taught
  as separate vocabulary.
- **Lesson 1 is the real 1-5-6-4 pattern**, built *correctly*: in the
  key of G major that is **G (1) – D (5) – Em (6) – C (4)** — not
  "G-A-C-D," which was an earlier rough approximation in conversation
  that doesn't correspond to any real diatonic chord built on G. The
  lesson teaches "press 1, press 5, press 6, press 4" with the keyboard
  highlighting each chord in turn, then a quiz, then a payoff screen.
- **The payoff is real, not fabricated.** After Lesson 1, the app shows
  which of the 25 library songs actually share this four-chord family —
  see "The 1-5-6-4 payoff, honestly counted" below for the real number
  and the method used to get it.
- **Major/minor as a pattern (Lesson 2).** Scale degrees 1/4/5 are
  always major and 2/3/6 are always minor in *any* major key, 7 is
  diminished — taught by walking all seven diatonic triads of G major,
  then quizzing on which are minor, framed explicitly as "this is true
  in every key."
- **Traditional notation is a later, optional layer (Lesson 3).**
  "Go deeper: reading real notation" introduces a 5-line staff and
  walks through Beethoven's "Ode to Joy" melody (1824, unambiguously
  public domain; melody only, no lyrics, no copyrighted arrangement)
  one note at a time, matched against the on-screen keyboard. This
  proves the "simple shapes → real notation" progression arc works
  end-to-end, even though the full 10-day curriculum from the original
  pitch isn't entirely built out yet (see Phase 2).

### The 1-5-6-4 payoff, honestly counted

Method: for each of the 25 songs, `js/songs-data.js` records its real
chord progression as scale degrees in its own key (sourced from
cross-checked, independently-corroborated chord-site/tutorial
consensus — see that file's header comment and
`oneFiveSixFourMatch` field). A song counts as a match if its
progression is either:

- an exact rotation of I-V-vi-IV (e.g. vi-IV-I-V — same four chords,
  same cyclic order, different starting point), or
- the same four chords {I, IV, V, vi} in a *different* functional order
  (e.g. I-vi-IV-V) — still "the same four chords," just arranged
  differently, which is the broader version of the well-known
  "four chords, a hundred songs" phenomenon.

**Real result: 7 of the 25 songs**, not all 25:

| Exact 1-5-6-4 rotation | Same 4 chords, different order |
|---|---|
| Love Story — Taylor Swift | Perfect — Ed Sheeran |
| Someone You Loved — Lewis Capaldi | Photograph — Ed Sheeran |
| Yellow — Coldplay | |
| The Night We Met — Lord Huron | |
| Riptide — Vance Joy | |

The other 18 songs use other progressions — mostly minor-key loops
(Bad Guy, Blinding Lights, Shape of You, Starboy, Stay, Believer, I
Wanna Be Yours, Heat Waves's variant, Levitating, Lucid Dreams, One
Dance), or progressions that are harder to pin down with confidence
from public sources (flagged `needs-verification` in the data — see
below). That's a real, smaller number than "all 25," reported
honestly rather than rounded up.

### Chord-verification confidence

Every song's `confidence` field is either:

- `"confirmed"` — multiple independent sources agreed closely on key
  and chords.
- `"needs-verification"` — sources conflicted (on key, exact chords, or
  both), or the song uses enough jazz/seventh-chord harmony that we
  aren't confident presenting one definitive chart. These are flagged
  in the Discover tab UI with a visible "Needs verification" badge and
  an explanatory note — never silently presented as solid.

Songs flagged `needs-verification`: **Last Christmas, All I Want for
Christmas Is You, Die With a Smile, Blinding Lights, As It Was,
Believer, Closer** (7 of 25). See each entry's `notes` field in
`js/songs-data.js` for exactly what conflicted.

No lyrics or literal sheet-music transcriptions are bundled anywhere —
chord *names and progressions* are treated as the commonly-known
musical facts they are (the same reasoning that lets any
chord-reference site exist), not copied from one site's formatted
chart.

## Keyboard calibration

Two real parts, both built:

1. **Audio pitch-match anchor** (`js/calibration.js` + `js/pitch.js`).
   The app plays a 261.63 Hz reference tone (Middle C) and tells the
   user to "find the white key just left of the two black keys nearest
   the middle of your keyboard" — the universal, keyboard-size-
   independent way to find Middle C, deliberately *not* "count N keys
   from the left edge" (unreliable across differently-sized keyboards).
   The user plays that key into their mic; the app runs real
   autocorrelation pitch detection to confirm or correct ("that sounds
   like an octave low, try the next C up").
2. **Visual/on-screen calibration.** A full camera-based keyboard
   overlay was explicitly scoped out of this release (see Phase 2). As
   the MVP substitute, the user taps Middle C and the C an octave above
   on the app's own virtual keyboard, which is enough to confirm/store
   an octave offset for practice mode — a complete, real flow, just not
   camera-based.

The pitch-detection algorithm itself (`js/pitch.js`) is reused,
unmodified in its core autocorrelation/parabolic-interpolation logic,
from the Dawsons project's already-debugged `website/js/pitch.js` —
including the fix for the classic harmonic-misdetection bug (locking
onto an overtone/subharmonic instead of the true fundamental). See
`THIRD_PARTY_NOTICES.md`.

## What's built vs. Phase 2 (being explicit, not cutting scope silently)

**Fully built and verified this pass:**
- Discover tab: search, genre filter, all 25 songs with chord data,
  confidence badges, the "no arbitrary audio import" notice.
- Practice tab: on-screen keyboard, chord-loop playback synthesized via
  Web Audio, play/pause/rewind, draggable timeline scrubber.
- Saved tab: localStorage-backed song and lesson progress list.
- Lessons tab: lesson map with sequential unlock + streak counter;
  Lesson 1 (1-5-6-4, fully interactive, real payoff count), Lesson 2
  (major/minor pattern, fully interactive quiz), Lesson 3 (staff
  notation intro via Ode to Joy, fully interactive).
- Keyboard calibration: audio pitch-match (real mic + pitch detection)
  and on-screen visual calibration (real, stores an offset).
- Own-audio-upload transcription via `basic-pitch` (Apache-2.0,
  TensorFlow.js, runs client-side) — wired up to real decode →
  transcribe → note-list flow. **Verified for real, not just by
  reading code:** loaded the exact CDN import used in `practice.js`
  in a live browser, instantiated `BasicPitch` against the real
  `unpkg` model URL, and ran `evaluateModel` against a synthesized
  1-second 440 Hz test tone (A4). It correctly returned one note with
  `pitchMidi: 69` (A4) spanning nearly the full duration — a genuine
  audio-in, correct-note-out result, entirely in-browser, no server
  round-trip. What was *not* exhaustively evaluated is transcription
  accuracy on real, complex, polyphonic piano recordings — that would
  need a longer audio-ML tuning cycle and is noted as a follow-up, not
  claimed as done.

**Explicitly deferred to Phase 2 (not faked, not half-built):**
- Full real-time camera overlay (detecting the physical keyboard
  through the phone camera, drawing live finger/hand guidance). This is
  a serious computer-vision project on its own; building a fake or
  non-functional version would be worse than being upfront that it
  isn't here yet.
- The full 10-day curriculum implied by the original pitch — only
  Lessons 1-3 are built. The lesson-map UI is designed to extend
  cleanly (add entries to `js/lessons-data.js` + a handler in
  `js/lessons-ui.js`).
- Played-back audio of the *user's own transcribed* recording (today,
  upload confirms transcription works and logs the note list to the
  console; turning that into a playable/practiceable lesson is Phase 2).
- Any deeper theory track beyond the Lesson 3 staff-notation taste
  (rhythm notation, key signatures, chord inversions, etc).

## Architecture

Pure static site, no build step:

```
index.html          Tab shell, loads js/app.js as an ES module
css/style.css        All styling
js/
  app.js             Tab routing/wiring
  songs-data.js       The 25-song library + confidence/match metadata
  lessons-data.js     Lesson 1-3 content (chords, scale degrees, melody)
  lessons-ui.js       Lesson map + interactive lesson flows
  keyboard.js         On-screen piano component + Web Audio synth
  chord-utils.js      Chord-symbol → MIDI-notes parser (for Practice)
  discover.js         Discover tab
  practice.js         Practice tab (playback, timeline, upload)
  saved.js            Saved tab
  calibration.js      Two-part keyboard calibration flow
  storage.js          All localStorage reads/writes
  pitch.js            Pitch detection (reused from Dawsons) + live wrapper
```

Deploy: push to `main`, enable GitHub Pages on the repo (Settings →
Pages → Deploy from branch → `main` → `/`). No build step, no secrets,
no server.

## Verification

No backend to test against, so verification meant serving the site
locally (`python3 -m http.server`) and driving a real Chromium browser
against it. What was actually checked, end to end, not just by reading
the code:

- **Discover tab**: all 25 songs render with correct chord data,
  confidence badges, and the no-URL-import notice; search and genre
  filter both work; zero console errors.
- **Lesson 1**: stepped through all four chord-teaching screens,
  confirmed the keyboard highlights exactly G→D→Em→C (via DOM
  `data-midi` inspection, not just visually) with the right number/
  letter badges; completed the play-in-order quiz by dispatching real
  key presses in sequence; confirmed the payoff screen computes and
  displays "7 of 25" with the correct song lists; confirmed
  `localStorage` records the lesson as complete and the streak
  increments to 1.
- **Lesson 2**: walked all seven G-major diatonic triads; completed the
  minor-degree quiz (selecting 2, 3, 6) and confirmed the "Correct"
  branch fires exactly on that selection.
- **Lesson 3**: stepped through all 15 notes of the Ode to Joy melody
  against the staff rendering and keyboard highlighting, confirmed
  completion.
- **Pitch detection**: ran the actual `detectPitchInFrame` function
  (unmodified from Dawsons) against a synthesized 261.63 Hz sine wave —
  returned 261.6298 Hz (MIDI 60.0003, i.e. dead-on Middle C). Also
  tested a synthesized 523.25 Hz tone (C5) and confirmed it's correctly
  read as exactly one octave (12 semitones) above Middle C, which is
  the calibration flow's "try the next C up/down" branch condition.
- **Calibration flow**: confirmed the mic-permission-denied path shows
  a clear error and a working "skip" button (this sandboxed browser
  has no mic access); completed the two-tap visual calibration and
  confirmed it's saved to `localStorage`.
- **Practice tab**: confirmed chord-loop playback advances the timeline
  cursor correctly in real time, highlights the correct chord on the
  keyboard at each step, and that starting a song from Discover
  switches tabs and shows up correctly in Saved.
- **basic-pitch (own-audio-upload)**: loaded the exact CDN module used
  in `practice.js` in a live browser, instantiated `BasicPitch` against
  the real model URL, and ran it against a synthesized 440 Hz test tone
  — it correctly returned a transcribed note at `pitchMidi: 69` (A4)
  spanning nearly the full clip. Real, working, in-browser transcription,
  not just a code review.
- **Zero console errors** throughout the entire session (checked
  explicitly with an errors-only filter after every major flow).

One real bug was caught and fixed during this pass: the Lesson 1 quiz
initially appeared not to respond to key presses. Root cause was in the
*test* methodology, not the app — `document.querySelector` was matching
a same-ID keyboard key in the hidden Practice tab (rendered earlier in
the DOM) before the visible Lessons tab's keyboard. Scoping the selector
to the visible panel resolved it; this uncovered no actual app defect,
but is recorded here in the interest of not quietly editing out a
debugging detour.

## License / legal boundaries honored

- No YouTube or other streaming-platform audio extraction, anywhere,
  ever — ruled out explicitly, see Discover tab's own in-UI notice.
- No scraped chord charts from Ultimate Guitar, Songsterr, Hooktheory's
  TheoryTab database, or similar — progressions are treated as
  cross-checked musical facts, independently written into
  `songs-data.js`, never copy-pasted from one site's formatted chart,
  and never bundled with lyrics.
- User-uploaded audio is transcribed via a properly-licensed,
  client-side model (`basic-pitch`, Apache-2.0) — see
  `THIRD_PARTY_NOTICES.md`.
