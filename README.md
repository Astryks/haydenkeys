# Hayden Keys

A free, gamified, Duolingo-style piano learning web app for
haydenkeys.com. Teaches pop piano the way guitar apps teach chords —
numbers and shapes first, letter names absorbed through repetition,
traditional notation unlocked later — then extends into a real 35-day
"strong early-intermediate" arc covering scales, two-hand technique,
richer harmony, jazz basics, and classical repertoire.

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

1. **Discover** — browse the curated 84-song library (73 pop/rock/etc.
   plus 11 jazz standards) by genre, search by title/artist. A prominent
   note explains that pasting a YouTube (or any other) link to import
   arbitrary audio is **not supported** and never will be — extracting
   audio from streaming platforms violates their terms of service, full
   stop. This was a deliberate, explicit scope decision, not an
   oversight.
2. **Practice** — three selectable practice modes (not buried in a
   settings menu):
   - **Follow Along** — the primary visual: a Synthesia-style falling-
     note "highway" scrolls chords down toward a hit line directly above
     the real keyboard, color-coded by hand (amber = left, purple =
     right), timed from the actual playback clock so a note arrives at
     the hit line exactly when it should be played. No mic needed.
   - **Ear Check** — generalizes the keyboard-calibration pitch tracker
     into an ongoing practice mode: plays/shows each chord, listens via
     mic, advances when you play the correct root note.
   - **Camera Overlay** — point a real camera at a real keyboard; after
     a two-tap calibration, the next note to press is highlighted
     directly on the video feed.

   Playback of a song's chord loop (or, for 12 of the 84 songs, its full
   verse/chorus/bridge *structure*, not just the main 4-chord riff) can
   be paused, rewound, and scrubbed via a draggable timeline. Includes
   the two-part keyboard calibration flow (below) and an "upload your
   own recording" path that transcribes audio to notes locally via
   `basic-pitch`.
3. **Saved** — songs you've started/completed and lessons you've
   finished, all from `localStorage`. No account needed, nothing
   server-side.
4. **Lessons** — a 37-lesson gamified curriculum (see Pedagogy below): a
   lesson map, sequential unlocks, and a streak counter.

## Pedagogy

Taught by ear/shape first, not jargon. **Days 1-10** (the original
pitch) build the numbers-first foundation; **Days 11-37** extend it into
scales, two-hand technique, richer harmony, jazz, and classical
repertoire — explicitly framed throughout as reaching **"strong
early-intermediate," never "advanced"** (real advanced piano takes
years, not 37 lessons).

- **Numbers and shapes lead, letters follow.** A chord is "the 1," "the
  5," shown as a highlighted shape on the on-screen keyboard. The letter
  name (G, D, Em, C) is a small label under the big number from day one.
- **Day 1 is the real 1-5-6-4 pattern**, built *correctly*: **G (1) – D
  (5) – Em (6) – C (4)** — not "G-A-C-D," an earlier rough approximation
  that isn't a real diatonic chord on G.
- **Every payoff is computed live from real data, never hardcoded.**
  After Day 1, the app shows which library songs actually share the
  four-chord family — see below for the real number and how a hand-
  verification pass caught and fixed a genuine classification bug.
- **Days 2, 6**: major-key and natural-minor-key degree patterns
  (1/4/5 major, 2/3/6 minor in major keys; 1/4/5 minor, 3/6/7 major in
  minor keys) — "this is true in every key," not memorization.
- **Day 3 and Day 10**: staff notation introduced via Beethoven's "Ode to
  Joy," then a second public-domain piece, the opening of Pachelbel's
  "Minuet in G" — proving the numbers-to-notation arc end to end.
- **Days 11-14 (major scales)** and **16-19 (natural minor scales)**:
  the same movable-shape idea applied to full scales, explicitly tied
  back to "a scale is scale degrees 1-7 in a row; a chord is 1-3-5
  stacked" and to the relative-minor concept from Day 2.
- **Days 21-25 (two-hand coordination)**: alternating bass, Alberti
  bass, and arpeggios, building to playing Day 1's own progression with
  real two-hand technique.
- **Days 26-30 (richer harmony)**: dominant/major/minor 7th chords and
  inversions, applied immediately to Day 1's progression for a "hear the
  difference" payoff.
- **Days 31-35 (capstone)**: Pachelbel's Canon in D — an 8-chord
  progression independently documented as a direct ancestor of Day 1's
  own pattern, built up over bass line → chords → richer variation →
  full two-hand performance.
- **Day 36 (bonus, jazz)**: left-hand chord comping + right-hand
  pentatonic-scale improvisation — deliberately *not* quiz-scored, since
  there's no "correct" improvisation.
- **Day 37 (bonus, classical repertoire)**: a real excerpt of
  Beethoven's "Für Elise" opening, plus a verified (not guessed) 8-piece
  catalog including Chopin, Debussy, and Satie, honestly labeled by
  which pieces got a real interactive excerpt vs. catalog-only entries.

### Hand-separation: a real gap that was caught and fixed

Early two-hand lesson data already used absolute MIDI notes per hand
(e.g. a left-hand bass note at a specific low octave, a right-hand chord
a specific octave above) — never bare scale-degree numbers divorced from
register. But the keyboard UI originally highlighted both hands' notes
in one color, with no visual way to tell which hand played what, or how
far apart the hands really are (a real problem for anything beyond
beginner range, where "the 1" means a completely different physical key
depending on hand/octave — e.g. Moonlight Sonata's low left-hand
arpeggio vs. its higher right-hand melody). Fixed with
`keyboard.js`'s `highlightHands()`: left-hand notes render amber,
right-hand notes render purple, each with an L/R badge, at their real
keyboard position (the keyboard always renders true piano key widths
across its MIDI range — never compressed) — screenshot-verified showing
genuine spatial separation between hands. This same convention is reused
by the falling-note highway, the jazz lesson, and every two-hand lesson,
rather than inventing a second hand-color system.

### The 1-5-6-4 payoff, honestly counted (and a bug fix)

Method: each song's real chord progression is recorded as scale degrees
in its own key (`js/songs-data.js`). A song counts as a match if its
progression is either an exact rotation of I-V-vi-IV (same cyclic
direction, different starting point) or the same four chords in a
different functional order (e.g. I-vi-IV-V).

**While independently verifying ~45 newly-added songs by hand** (re-
deriving each one's chord-to-chord adjacency rather than just checking
"does it use the same 4 chords"), a real bug surfaced in the *original*
25-song data: two songs (Riptide, The Night We Met) had been marked
"exact" matches, but their chords actually walk the same four-chord set
in the *opposite* cyclic direction from Day 1's loop — a genuinely
different-sounding progression, not an exact match. Fixed in the data
with a correction note, rather than left wrong.

**Current real result (computed live, not hardcoded): 22 of 73**
beginner-library songs (Bohemian Rhapsody, the one advanced/bonus entry,
is deliberately excluded from this count) share the four-chord family —
15 as exact rotations (Love Story, Someone You Loved, Yellow, Shallow,
Always Remember Us This Way, The A Team, Let It Be, No Woman No Cry,
With or Without You, I'm Yours, Despacito, Someone Like You, Zombie,
Viva La Vida, Can You Feel the Love Tonight), 7 as reordered variants
(Perfect, The Night We Met, Riptide, Photograph, Don't Stop Believin',
Stand By Me, Wonderful Tonight). The remaining 51 use other progressions
— mostly minor-key loops or harmonically complex/needs-verification
songs — which is exactly what later lessons (minor-key patterns, 7th
chords) cover.

### Chord-verification confidence

Every song's `confidence` field is `"confirmed"` (multiple independent
sources agreed) or `"needs-verification"` (sources conflicted, or the
harmony is genuinely too complex for one confident chart) — shown in
the Discover tab with a visible badge and an explanatory note, never
silently presented as solid. Of 84 total songs, roughly a third are
flagged `needs-verification` — jazz standards especially, since
published "changes" for jazz tunes genuinely vary by recording/arranger
far more than pop songs do (see each entry's `notes` field). Bohemian
Rhapsody and several classical pieces were deliberately *not* forced
into a fake simplified chart when their real difficulty didn't allow
one — same principle applied consistently from the pop library through
jazz standards to classical repertoire.

No lyrics or literal sheet-music transcriptions are bundled anywhere —
chord *names and progressions* are treated as the commonly-known musical
facts they are, not copied from one site's formatted chart. Classical
pieces use only melodic/harmonic facts independently documented across
countless sources, never a specific modern edition's engraving or
fingering (every composer used died >70 years ago, but a specific
modern print edition can still carry its own separate copyright).

## Keyboard calibration

Two real parts, both built:

1. **Audio pitch-match anchor** (`js/calibration.js` + `js/pitch.js`).
   Plays a 261.63 Hz reference tone (Middle C), tells the user to "find
   the white key just left of the two black keys nearest the middle of
   your keyboard" (keyboard-size-independent, unlike "count N keys from
   the edge"). Real autocorrelation pitch detection via mic confirms or
   corrects ("that sounds like an octave low, try the next C up").
2. **Visual/on-screen calibration.** User taps Middle C and the C an
   octave above on the app's own virtual keyboard to confirm/store an
   octave offset.

The pitch-detection algorithm (`js/pitch.js`) is reused, unmodified in
its core autocorrelation/parabolic-interpolation logic, from the
Dawsons project's `website/js/pitch.js`, including its fix for the
classic harmonic-misdetection bug. See `THIRD_PARTY_NOTICES.md`.

## Camera Overlay (`js/camera-overlay.js`)

A real, working camera-based practice mode, scoped tractably rather than
attempting full computer-vision keyboard detection: the user taps where
two known keys are in their own camera frame (reusing the two-tap
calibration idea above), and everything else is positioned via simple
linear interpolation/extrapolation along the line those two points
define — "homography-lite," not a full perspective transform. Stated,
real limitation: this assumes the camera and keyboard stay still
relative to each other after calibrating; there's no frame-to-frame
visual tracking, so a moved phone needs recalibrating.

## Falling-note highway (`js/note-highway.js`)

The Synthesia-style visualization for Follow Along mode. Horizontal
alignment reuses `keyboard.js`'s own `computeKeyLayout()` directly (one
layout source of truth for both the real keyboard and the highway, so
blocks can't drift out of alignment with their keys). Timing is real:
each note carries an absolute time and a fixed lookahead window; a
note's vertical position is computed purely from how far its time is
from the live playback clock — verified directly (not eyeballed): a
note due "now" renders with its top edge exactly on the hit line, a note
due one full lookahead-window in the future starts at the top of the
canvas. Not yet wired into Ear Check or Camera Overlay modes (explicitly
scoped as optional for this pass).

## What's built vs. Phase 2 (being explicit, not cutting scope silently)

**Fully built and verified:**
- Discover, Practice (3 modes), Saved, and Lessons tabs, all described
  above.
- 84-song library with confidence flags, 1-5-6-4 payoff matching, and
  12 songs with full verse/chorus/bridge structure data.
- 37-lesson curriculum (Days 1-37), each with real interactivity and a
  computed-live payoff where one naturally exists.
- Keyboard calibration (audio + visual), Camera Overlay, falling-note
  highway, per-hand color coding.
- Own-audio-upload transcription via `basic-pitch` (Apache-2.0,
  TensorFlow.js) — verified end-to-end against a real synthesized 440 Hz
  test tone (correctly returned `pitchMidi: 69`), not just code-reviewed.
  Transcription accuracy on real, complex, polyphonic recordings was
  *not* exhaustively evaluated — a real, stated follow-up, not claimed
  as done.

**Explicitly deferred to Phase 2 (not faked, not half-built):**
- True computer-vision keyboard detection for Camera Overlay (today's
  version is a real, working two-tap linear-mapping substitute, not a
  placeholder, but not full CV).
- Falling-note highway support for Ear Check and Camera Overlay modes.
- Full song structure data for the other 72 songs beyond the 12 covered
  (a much bigger per-song research lift than the simple-loop version).
- Interactive excerpts for 7 of the 8 advanced-repertoire catalog pieces
  (only Für Elise's opening is built out; the rest are a real, verified
  catalog entry with no fabricated chart).
- Played-back audio of the *user's own transcribed* recording (upload
  confirms transcription works and logs the note list; turning that into
  a playable lesson is Phase 2).

## Architecture

Pure static site, no build step:

```
index.html                 Tab shell, loads js/app.js as an ES module
css/style.css               All styling
.github/workflows/deploy-pages.yml   Self-deploying GitHub Pages workflow
js/
  app.js                    Tab routing/wiring
  songs-data.js             84-song library + confidence/match metadata + full-structure data
  lessons-data.js           Lesson list (Days 1-37) + Days 1-10 content
  lessons-data-advanced.js  Days 11-37 content (scales, two-hand, 7ths, jazz, classical)
  lessons-ui.js             Lesson map + all interactive lesson flows
  keyboard.js               On-screen piano, Web Audio synth, per-hand highlighting, shared key-layout math
  note-highway.js           Falling-note visualization
  camera-overlay.js         Camera-based practice mode (two-tap linear mapping)
  chord-utils.js            Chord-symbol → MIDI-notes parser
  discover.js               Discover tab
  practice.js               Practice tab (3 modes, playback, timeline, upload)
  saved.js                  Saved tab
  calibration.js            Two-part keyboard calibration flow
  storage.js                All localStorage reads/writes
  pitch.js                  Pitch detection (reused from Dawsons) + live wrapper
```

## Deploying (GitHub Pages) — current status: blocked on a one-time manual step

A self-deploying workflow (`.github/workflows/deploy-pages.yml`) is
committed — `actions/configure-pages` → `actions/upload-pages-artifact`
→ `actions/deploy-pages@v4`, triggered on every push to `main`, using
only the repo's automatic `GITHUB_TOKEN`.

**It's currently failing**, confirmed by actually running it (not just
reading the YAML): every run so far fails at "Configure Pages". Checked
via the public API (`has_pages: false` on the repo) and cross-referenced
against `actions/configure-pages`'s own changelog (PR #48) — **GitHub
deliberately blocks the default `GITHUB_TOKEN` from performing a repo's
*first* Pages enablement**, regardless of the `pages: write` permission
declared in the workflow; that scope only covers deploying to an
*already-enabled* Pages site. First-time enablement needs either:

1. A one-time manual toggle: repo Settings → Pages → Source → "GitHub
   Actions" (10 seconds, needs repo admin access neither this agent nor
   the coordinator has), or
2. A Personal Access Token with admin scope supplied as a workflow
   secret (needs the repo owner to generate one).

**Once either happens once, this workflow deploys automatically on every
future push** — the blocker is specifically first-time enablement, not
the ongoing mechanism. Live URL once enabled:
`https://astryks.github.io/haydenkeys/`.

## iOS app (Capacitor) — scaffolded, ready for Xcode, not built/submitted from here

Capacitor wraps this exact static site as-is for a native iOS app — no
rewrite, same HTML/CSS/JS. What's real and already done:

- `package.json` + `capacitor.config.json` (`appId: com.haydenkeys.app`,
  `webDir: www`) — `www/` holds symlinks to the real site files
  (`index.html`, `css/`, `js/`, `manifest.webmanifest`, `sw.js`), so
  there's one source of truth, not a duplicated copy to keep in sync.
- `npx cap add ios` has already been run — `ios/App/App.xcodeproj` is a
  real, committed Xcode project (small, ~336 KB; no CocoaPods needed —
  this Capacitor/plugin version resolves dependencies via Swift Package
  Manager, confirmed by its generated `Package.swift`).
- `@capacitor/camera` is installed (the one official Capacitor plugin
  relevant here). Camera Overlay and Ear Check's microphone use plain
  web `getUserMedia`, not a native plugin API — Capacitor's WKWebView
  supports `getUserMedia` natively (iOS 14.3+) once the right Info.plist
  usage-description keys are present, which is the actual fix needed,
  not a plugin rewrite.
- `ios/App/App/Info.plist` has real `NSCameraUsageDescription` and
  `NSMicrophoneUsageDescription` entries explaining honestly what each
  is used for (Camera Overlay's projected key guide; calibration/Ear
  Check's pitch listening) and that nothing is recorded or uploaded.
- `npm run cap:sync` (`npx cap sync`) runs clean — verified directly in
  this pass, confirmed it re-copies `www/` into
  `ios/App/App/public` and regenerates `Package.swift` with no errors.

**What genuinely cannot be done from here, and why:** actually building,
code-signing, archiving, and submitting the app needs Xcode running
interactively on a Mac with Sid's own Apple Developer signing
certificate and Apple ID logged in — that's a local, interactive,
credentialed process, not something a background coding session can do.

**Exact next steps for Sid:**
1. `npm install` once (installs the Capacitor CLI/packages — small,
   ~29 MB in `node_modules/`, already gitignored).
2. `npx cap open ios` (or open `ios/App/App.xcodeproj` directly) — opens
   the real project in Xcode.
3. In Xcode: select the `App` target → **Signing & Capabilities** → pick
   your own Apple Developer team/signing certificate (this is the one
   step that genuinely requires your own account and can't be scripted).
4. Pick a simulator or your connected iPhone → **Run** to verify it
   launches and the site loads inside the native shell, including
   testing Camera Overlay/Ear Check's permission prompts for real on a
   device (a simulator has no real camera, but does have a (fake)
   microphone — test the actual camera prompt on a real device).
5. When ready: **Product → Archive**, then use the Organizer window's
   **Distribute App** flow to upload to App Store Connect, fill in the
   store listing, and submit for review — all standard Xcode/App Store
   Connect steps from here, nothing app-specific left to figure out.
6. Any time the web app's files change, run `npx cap sync` again before
   rebuilding in Xcode, so the native copy picks up the latest site.

## Verification

No backend to test against, so verification meant serving the site
locally and driving a real Chromium browser against it, repeatedly,
across every feature added. Highlights of what was actually checked, not
just code-reviewed:

- All 84 songs render in Discover with correct data; search/genre
  filters work; jazz-genre filtering confirmed separately.
- Played through Lessons 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 15, 20, 25,
  26, 31, 35, 36, and 37 end-to-end in a real browser (quizzes, payoffs,
  and completion states all confirmed, not assumed from code reading).
- Lesson 1's payoff and Lesson 4's payoff both confirmed to recompute
  correctly from live data after the library grew from 25 → 73 songs
  (22/73 and 4/73 respectively, with Lesson 4 correctly excluding the
  reverse-direction songs after the classification-bug fix).
- Pitch detection verified against real synthesized test tones (261.63
  Hz → correctly read as Middle C; 523.25 Hz → correctly read as exactly
  +12 semitones).
- `basic-pitch` transcription verified against a real synthesized 440 Hz
  tone, run through the actual CDN import path used in production code
  — correctly returned a transcribed A4 note.
- Camera Overlay and Ear Check both confirmed to show clear, honest
  error messages when camera/mic permission is unavailable (this
  sandbox has neither), rather than failing silently. The camera
  overlay's linear-mapping math (`projectMidiPosition`) was additionally
  unit-tested directly for correct interpolation and extrapolation.
- The falling-note highway's timing math (`yForTime`) was unit-tested
  directly: a note due "now" lands exactly on the hit line, a note due
  one lookahead-window in the future starts at the canvas top — then
  confirmed visually via screenshot during real playback, correctly
  aligned over its exact key, correctly hand-colored.
- Lesson 25's hand-color fix was screenshot-verified showing genuine
  amber/purple spatial separation between a left-hand bass note and a
  right-hand chord.
- Zero console errors confirmed (errors-only filter) after every major
  feature addition across the entire session.

One real bug was caught and fixed during the first verification pass:
Lesson 1's quiz initially appeared unresponsive. Root cause was in the
*test* methodology (a `document.querySelector` matching a same-ID key in
the hidden Practice tab before the visible Lessons tab's keyboard), not
an app defect — recorded here rather than quietly edited out. A second,
real data bug (the Riptide/Night We Met 1-5-6-4 misclassification) was
caught and fixed during the song-library verification pass — see above.

## License / legal boundaries honored

- No YouTube or other streaming-platform audio extraction, anywhere,
  ever — ruled out explicitly, see Discover tab's own in-UI notice.
- No scraped chord charts from Ultimate Guitar, Songsterr, Hooktheory's
  TheoryTab database, or similar — progressions are independently
  researched, cross-checked musical facts, never copy-pasted from one
  site's formatted chart, and never bundled with lyrics.
- No full song lyrics anywhere, for any song — the full-song-structure
  data (`SONG_STRUCTURES`) labels sections structurally only ("Chorus,"
  "Bridge"), never with lyric text, even a short excerpt — synchronized
  lyric reproduction requires a real licensing deal this project
  deliberately doesn't pursue, matching the zero-cost constraint.
- Classical repertoire uses only independently-documented musical facts
  (melodies/harmony), never a specific modern edition's engraving or
  fingering, even though the underlying compositions are all safely
  public domain (every composer died >70 years ago).
- User-uploaded audio is transcribed via a properly-licensed, client-
  side model (`basic-pitch`, Apache-2.0 — corrected from an initial
  assumption of MIT) — see `THIRD_PARTY_NOTICES.md`.
