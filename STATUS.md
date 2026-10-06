# Status

## TODO — not yet done (handoff for a future session)

Item 56 (2026-10-05) finished the previous handoff list: Back on every
lesson, the upload-playback seek bar / note labels / Easy mode, and an
iOS submission-readiness sweep (see the item 56 entry at the bottom).
What's genuinely left:

- **Stripe Payment Link still needs creating** in Sid's own Stripe
  dashboard (Payment Links → Create). Once it exists, paste the
  `https://buy.stripe.com/...` URL into `STRIPE_PAYMENT_LINK` at the top
  of `js/app.js` — that's the whole change. Web only: the link is
  deliberately hidden inside the iOS app (App Review guideline 3.1.1).
- **Final iOS sign/archive/submit is still Sid's own action** (needs his
  Apple Developer account) — follow `ios/SUBMISSION_CHECKLIST.md`. The
  project now builds clean (Debug simulator + Release device, unsigned)
  but hasn't been launched on a simulator or device yet: this Mac has no
  iOS Simulator runtime installed. First real launch = checklist step 5.
- **"Jaxx Guitar" (guitar version) and "Westbrooks" (fitness app) are
  logged as future apps, not started.** See the "Playbook for future
  instrument apps" section below for what's directly reusable for Jaxx
  Guitar specifically.

Living progress log for Hayden Keys, in the same spirit as the sibling
Dawsons project's own STATUS.md — what's actually done vs. planned,
re-verified for real rather than assumed from memory. Last updated
2026-10-05, after a full completeness audit against the entire
conversation history.

## Objective

A free, gamified, Duolingo-style piano learning web app for
haydenkeys.com. Pure static site — zero backend, zero database, zero
per-request cost, everything in `localStorage`. Teaches numbers/shapes
first (the real 1-5-6-4 pattern: G-D-Em-C, not the originally-misstated
"G-A-C-D"), extends into a 37-lesson "strong early-intermediate" arc,
and now gates a 102-song library behind an honest difficulty-tier
system.

## Playbook for future instrument apps (item 49)

Written for a future agent with zero memory of this conversation who
needs to build a sibling app for a different instrument (Sid's next
project: "Jaxx Guitar," same gamified/numbers-first concept, for
guitar). This section is the reusable summary — read this instead of
the whole file below, which is a chronological log, not a design doc.

**1. Overall architecture — reuse directly, instrument-agnostic.**
Pure static site: no backend, no database, no server-side code, no
per-request cost. Every page is plain HTML/CSS/vanilla-JS ES modules
(`<script type="module">`), no build step, no bundler, no framework.
All user state (progress, streaks, badges, saved songs, calibration)
lives in `localStorage` only — see `js/storage.js` for the full
read/write API. This is *why* the app can be free forever: there is no
ongoing hosting cost to recoup. A guitar app should copy this shape
wholesale — it has nothing to do with piano specifically.

**2. The lesson system design — reuse the pattern, not the content.**
`js/lessons-data.js` builds one flat `LESSONS` array from several
pieces, assembled in a specific order (see the file's own comments for
the exact assembly, which has shifted over many items — don't assume a
specific lesson count or order, re-read the file):
  - `PRE_LESSONS` — a couple of onboarding lessons before Lesson 1
    (e.g. "get an instrument," "find Middle C"/calibration). For
    guitar, the calibration-equivalent would be "find which string is
    which" or "tune your guitar" — same *role*, different content.
  - `THEORY_LESSONS` — the core theory arc, written numbers-first:
    teach "the 1, the 5, the 6, the 4" (Nashville numbers / scale
    degrees) BEFORE letter chord names, because the same numbers
    transpose to any key — this pedagogy choice is instrument-agnostic
    and should carry over directly to guitar (a guitarist capo-ing up
    two frets needs the same numbers-first mental model).
  - `masterSongLesson(song, extra)` — a factory that auto-generates one
    "Master: <Song Title>" lesson per song in the library, rather than
    hand-writing one lesson per song. Directly reusable: swap in a
    guitar chord-shape renderer instead of `renderKeyboard()`/
    `highlightChord()` and the same factory pattern works.
  - Tier gating (Beginner/Intermediate/Advanced): `getDifficulty(song)`
    (in `songs-data.js`) buckets songs by tier; `tierUnlockStatus()` (in
    `discover.js`) gates a tier until 5 songs in the prior tier are
    completed (`UNLOCK_THRESHOLD`). This gating logic has nothing to do
    with piano and should be lifted as-is.
  - `withReservedPositions()` — places specific showcase lessons (e.g.
    a classical/jazz preview) at an exact numbered position in the
    generated sequence, regardless of how other content shifts around
    them. Reusable as-is for any "drop a specific lesson at position
    N" need.
  - **Known real bug class to watch for in a new app**: lesson-count/
    tier-boundary drift. This app had at least two real instances (a
    duplicate-lesson bug in item 36, a tier-boundary placement check in
    item 47) — always verify `TOTAL_LESSON_COUNT`, check for duplicate
    IDs, and confirm *array position* (not the literal numeric suffix
    in an id string) after inserting anything, the same way this app's
    own STATUS.md entries do.

**3. The song library approach — reuse the discipline, not the data.**
Every song's chords in `js/songs-data.js` are independently
cross-checked against at least two real sources before being marked
`confidence: "confirmed"`; anything disputed or unverifiable is marked
`confidence: "needs-verification"` and says so honestly in the UI
(never silently guessed, never presented as fact). No chord-chart
scraping (Ultimate Guitar, Songsterr, etc. explicitly ruled out at the
product level, not just avoided as a dependency), no song lyrics
anywhere, no YouTube/streaming-URL import (would violate those
platforms' ToS). **All of this applies identically to a guitar app** —
chord progressions are chord progressions regardless of instrument; the
verification discipline and legal boundaries carry over word-for-word.

**4. The "upload your own song" pipeline — reuse as-is.**
`js/transcribe.js` is instrument-agnostic: `transcribeFile()` decodes
any audio/video file, resamples to mono 22050 Hz via an
`OfflineAudioContext` (`resampleToMono22050()`, required because
basic-pitch needs that exact format), then runs Spotify's vendored,
offline `basic-pitch` (audio → notes, Apache-2.0, `js/vendor/basic-pitch/`)
entirely client-side. **Real lesson learned (item 44)**: the original
code called `outputToNotesPoly()` with far more sensitive-than-default
thresholds (`onsetThresh`/`frameThresh` at 0.25/0.25 vs. the library's
real defaults of 0.5/0.3), causing a reported "6233 notes for one
song" explosion from noise/harmonics. Fixed by using the library's own
defaults plus a `cleanupNotes()` post-filter (merge same-pitch notes
separated by <30ms gaps, drop anything under 60ms). **A guitar app
reusing this pipeline should start from the library's real defaults,
not copy this app's old over-tuned values.** Polyphonic pitch output
(a note list with start/duration/pitch) is instrument-agnostic — the
only guitar-specific work is turning that raw note list into chord
*shapes* (see point 7).

**5. Reusable UX/interaction patterns (items 46-48).**
  - The falling-notes "highway" (`js/note-highway.js`) renders
    scrolling note blocks timed against a shared clock
    (`currentTime()`/`chordDuration()` in `practice.js`), horizontally
    positioned via `keyboard.js`'s `computeKeyLayout()`. The *timing/
    clock* mechanism is directly reusable; the *horizontal layout*
    function is piano-key-specific and would need a guitar-fretboard
    equivalent (see point 7).
  - The multiple-choice chord-recognition ear-training quiz
    (`runChordQuizLesson()` in `lessons-ui.js`, item 47): play a chord,
    4 options (1 correct + 3 real distractors from the same
    already-taught pool), immediate right/wrong feedback. Entirely
    reusable for guitar — it only cares about chord *audio* and chord
    *names*, never chord *shapes* or fingerings.
  - "Play what you hear" open-ended practice mode (`initPlayByEar()`
    in `practice.js`, item 48): pick a real song, hear its chord
    progression, try to replicate it by ear, reveal the real chords to
    self-check. Also entirely audio/chord-name based, not
    shape-based — reusable as-is.
  - The optional drum-beat layer (`js/drums.js`, item 45) and the
    optional sampled-instrument upgrade (`js/piano-sample.js` +
    vendored `smplr`, item 45) are both generic Web-Audio-level
    enhancements with no piano-specific logic — reusable directly,
    just point `smplr` at a different sampled instrument (e.g. an
    acoustic/electric guitar sample set) instead of
    `SplendidGrandPiano`.

**6. Gamification — reuse as-is.**
Streaks, daily goals, and badges (`js/badges.js`, `js/storage.js`) are
pure `localStorage` logic with zero piano-specific assumptions baked
in — lift directly.

**7. What is genuinely piano-specific and needs fresh design work for
guitar (do NOT assume these are reusable):**
  - `js/keyboard.js`'s entire rendered keyboard (DOM piano keys,
    `highlightChord()`, `highlightHands()`) — a guitar app needs chord-
    shape/fret diagrams instead (which frets/strings to press, open vs.
    muted strings), a fundamentally different visual grammar.
  - Capo logic has no piano equivalent at all — new design surface.
  - Strumming-pattern teaching (down/up strokes, rhythm patterns) has
    no piano equivalent — new design surface, though the existing
    "optional drum beat" clock-driven approach (point 5) could plausibly
    generalize to "strum pattern driven by the same clock."
  - The MIDI tab's computer-keyboard-key-to-piano-note mapping
    (`js/computer-keys.js`) is piano-note-specific; a guitar app
    exploring without a real guitar would need a different input
    metaphor entirely (there's no obvious "QWERTY row = guitar string"
    mapping the way there is for piano keys).
  - The falling-notes highway's horizontal layout (point 5) needs a
    fretboard-position equivalent, not just a recolor.

**8. iOS wrapping — reuse directly.**
The Capacitor setup (`ios/App/App.xcodeproj`, `capacitor.config.json`,
the `www/` symlink-based bundling approach) has zero piano-specific
logic and should be copied wholesale for a guitar app. **Real lesson
learned (item 43)**: `www/` only symlinks files/folders that existed
when first scaffolded — any new top-level HTML file added later (this
app's `reference.html`/`privacy.html`) needs its own explicit symlink
added, or it silently 404s inside the native app specifically while
working fine on the web. Remember to add that symlink proactively for
every new top-level page in a new project, not just when someone
reports the native app is broken. **Orientation decision (item 55)**:
this app ended up locked to landscape-only on iOS (both iPhone and
iPad) because a piano keyboard genuinely needs horizontal width to be
usable — a guitar app will face the exact same question with fretboard
diagrams/chord shapes, which are also naturally wide. Worth deciding
this deliberately early rather than retrofitting it, including the web
fallback this project landed on (a CSS-only "rotate your phone" prompt
for portrait-shaped phone viewports, since the web can't force
orientation the way the native wrapper can).

**9. Mascot/illustration approach — partially reusable.**
The "zero AI-generated art, Sid's own original hand-drawn illustration,
multiple contextual pose variations for different app contexts"
approach is a content/process choice independent of instrument — fully
reusable *as a process*, but the actual piano-mascot artwork obviously
isn't. **Real lesson learned (item 37)**: removing a flat color
background from hand-drawn art works far better with a flood-fill from
the image's own borders than a naive global color-threshold — the
flood-fill approach correctly leaves color that happens to match the
background elsewhere in the image (e.g. inside fur, sheet music)
intact, where a global threshold would incorrectly punch holes in it.
Worth reusing that specific technique for any future transparent-cutout
work, regardless of instrument.

## The full checklist, re-verified

- [x] **4+1 tabs**: Lessons, Discover, Practice, Saved, How It Works —
      re-ordered to Lessons-first (was Discover-first); all five
      confirmed rendering with zero console errors in a real browser.
- [x] **Discover**: genre browse, search bar, difficulty-tier filter,
      upload-any-song button — confirmed actually present and working
      (uploaded a real synthesized WAV through it and got a correct
      transcription back), not just planned.
- [x] **No-YouTube-import boundary**, stated warmly — confirmed the
      rewritten copy ("Upload any song and learn it with Hayden Keys!"
      headline, same unchanged legal facts below it) renders correctly.
- [x] **Practice**: Follow Along (falling-note highway), Camera
      Overlay, Ear Check (mic-verified) — all 3 selectable, confirmed.
- [x] **Play/pause/rewind** controls — present and working.
- [x] **Draggable/scrubbable playhead** — real pointer-drag, snaps to
      chord-cell boundaries, kept in sync with the speed control (same
      `chordDuration()` single source of truth both read from).
- [x] **Playback speed control** (0.5x/0.75x/1x) — verified with an
      actual measurement (800ms of real playback at 1x vs. 0.5x landed
      at very close to a 2x position difference), not eyeballed.
- [x] **Saved tab** — localStorage-backed, confirmed showing correct
      "0/37 lessons" on a fresh profile.
- [x] **Lessons**: Duolingo-style map, streak tracking — present.
- [x] **Lesson 1 = G-D-Em-C**, numbers-first, letters alongside —
      confirmed via DOM inspection multiple times across this project.
- [x] **Payoff moments computed live**, not fake/rounded — confirmed
      recomputing correctly at every library-size milestone this project
      hit (22/73 → 26/92 → 27/102), never a hardcoded number.
- [x] **Major/minor scale-degree pattern** taught as transposable (Day
      2 major, Day 6 natural minor) — "this is true in every key."
- [x] **Full curriculum to 37 days** — major scales (11-14), minor
      scales tied to relative-minor (16-20), two-hand coordination
      (21-25), 7th chords/inversions (26-30), Canon in D capstone
      (31-35), jazz bonus (36), classical-repertoire bonus (37) — all
      present and individually played through end-to-end in a real
      browser at least once during this project.
- [x] **Staff notation as a later/optional layer** — Days 3, 9, 10, 37.
      Never required to start Day 1.
- [x] **Hand-independent absolute-octave labeling + visual color
      separation** — real gap caught and fixed (`highlightHands()`):
      left hand pink, right hand light blue, screenshot-confirmed
      genuine spatial separation (e.g. Lesson 25's low pink bass note
      vs. higher blue chord).
- [x] **Falling-notes highway**, hand-colored, tempo-synced — timing
      math (`yForTime`) unit-tested directly (a note due "now" lands
      exactly on the hit line; a note due one lookahead-window out
      starts at the canvas top), plus screenshot-confirmed during real
      playback and re-confirmed after the speed-control integration.
- [x] **Jazz lesson**, not quiz-scored — Day 36, a running "time spent
      noodling" counter instead of a pass/fail check, confirmed.
- [~] **Classical repertoire**: Chopin x4 (catalog-only, no built
      excerpt), Debussy (catalog-only), Satie (catalog-only), Vivaldi's
      "Spring" (catalog-only, added this pass), Beethoven's Für Elise
      (**real built excerpt**, Day 37), Pachelbel's Canon in D (**real
      built capstone**, Days 31-35). **Real, honest gap**: "Moonlight
      Sonata as a capstone" was explicitly suggested later in this
      project (as the item-10 hand-separation validation case) but was
      never built — Canon in D had already been built and committed as
      the Days 31-35 capstone by that point, and the suggestion was
      explicitly flagged as "not mandatory if you've already picked
      something that works just as well." Decision: kept Canon in D
      rather than rebuilding the capstone a second time under later
      time pressure. Moonlight Sonata is not in the catalog at all —
      a real omission against the literal checklist line, noted here
      rather than silently dropped.
- [x] **Song library merge**: all batches landed, 102 total songs,
      zero duplicate titles (checked programmatically, not by eye).
      Breakdown: original 25 + ~47 from the first two pasted lists +
      11 jazz standards + the love-songs/corrected-title batch + Amazing
      Grace + 10 classic-rock/Adele/MLTR songs = 102.
- [x] **Every song has real chords or an honest needs-verification
      badge** — 64 confirmed / 38 needs-verification / 0 silently
      guessed. Roughly a third of the library is flagged, which is the
      honest result of applying a real two-source standard, not a
      target to hit.
- [x] **No lyrics anywhere** — re-grepped the entire `js/` tree for this
      specifically during this audit. The only hits are (a) this
      project's own comments stating "no lyrics" as a design decision,
      and (b) generic MIDI-file-format event-type-name handling inside
      the vendored `@tonejs/midi` library (which can parse arbitrary
      MIDI files that the MIDI spec allows to contain a "lyrics"
      meta-event type) — not any actual copyrighted lyric text.
- [x] **Full song structure** (verse/chorus/bridge, no lyrics) — 12 of
      102 songs, confirmed via code (`Object.keys(SONG_STRUCTURES).length
      === 12`). Honestly a small fraction of the library; the other 90
      fall back to the simple main-loop view, labeled as such in the UI.
- [x] **basic-pitch**: vendored locally (`js/vendor/basic-pitch/`, ~3.1
      MB, zero runtime CDN dependency — confirmed via network-request
      log showing no unpkg/esm.sh traffic during a real transcription
      run), the 22050Hz-mono sample-rate bug fixed and verified against
      the real `fortnite.mp4` that originally triggered it (248s,
      48kHz/stereo → 6233 real notes, zero sample-rate error). **This
      audit additionally closed a real testing gap**: the original
      sample-rate fix was verified against WAV + MP4 but not MP3 — ran
      a real MP3 (encoded via `ffmpeg`) through the actual upload UI
      during this audit and confirmed it transcribes correctly too. All
      three requested formats (mp3/wav/mp4) are now genuinely confirmed
      working end-to-end, not two of three.
- [x] **Audio pitch-match calibration** (plays 261.63Hz, mic confirms,
      octave-correction guidance) + **two-tap visual calibration** —
      both built and verified; the pitch tracker itself was additionally
      unit-tested against synthesized 261.63Hz and 523.25Hz tones and
      returned mathematically correct results (dead-on Middle C; exactly
      +12 semitones).
- [x] **"How It Works" page** — 5 sections, a live animated frequency
      slider, and a static 4-wave harmonics diagram, all confirmed
      rendering and interactive.
- [x] **Mobile-responsive CSS** — real `@media` breakpoints added where
      there were previously none; confirmed via actual viewport resizing
      to 375×812 with zero horizontal overflow on Discover, Practice
      (including the falling-note highway), and Lessons — re-confirmed
      again after the full pastel re-theme landed, still zero overflow.
- [x] **PWA manifest + service worker** — manifest is valid JSON with 5
      real icon sizes (regenerated from the actual logo this pass).
      **Honest methodology note**: service worker registration could
      not be confirmed in this project's local sandbox preview (every
      attempt against a local dev server failed with an opaque "unknown
      error fetching script," isolated via a control test against a
      real external HTTPS origin that behaved differently) — but this
      audit tested it directly against the real, live
      **https://haydenkeys.com** and confirmed the service worker is
      genuinely registered, active, and has a populated cache
      (`hayden-keys-v1`). Fully working in production, not just
      theoretically correct.
- [x] **Capacitor iOS scaffolding** — real, committed Xcode project
      (`ios/App/App.xcodeproj`), `@capacitor/camera` installed,
      `NSCameraUsageDescription`/`NSMicrophoneUsageDescription` added
      to `Info.plist` with honest descriptions, `npx cap sync` verified
      running clean. Exact numbered next steps for Xcode/signing/App
      Store Connect documented in the README. Cannot be built, signed,
      archived, or submitted from this environment — that genuinely
      needs Xcode running interactively with Sid's own Apple Developer
      credentials, stated plainly rather than implied as done.
- [x] **GitHub Pages live and auto-deploying** — confirmed independently
      during this audit: `has_pages: true`, the latest workflow run
      succeeded, `https://haydenkeys.com` returns a real 200 over valid
      HTTPS, and the live site is confirmed serving the actual latest
      code (checked for the newest songs and the logo). The one-time
      manual-enable blocker documented earlier in this project has been
      resolved (presumably by Sid, per the documented instructions) —
      the self-deploying workflow now genuinely works end-to-end.
- [x] **Pastel blue/pink re-theme**, logo's own gradient as the palette
      source — `:root` variables now pull directly from `assets/logo.svg`'s
      literal hex values (`#a7d8f0`/`#f4b8d0` as "-soft" fills,
      deepened versions as the main accent/text-safe colors). Text
      contrast checked by eye against the light background across every
      tab; the on-screen keyboard/staff/highway deliberately keep a dark
      "stage" background (a real, stated design choice, not an
      oversight) since real piano keys need strong contrast regardless
      of page theme. Caught and fixed a real follow-up bug during this
      same pass: several lesson/practice copy strings still said
      "amber"/"purple" after the hand colors changed to pink/light-blue
      — found by re-grepping, not assumed clean from the first pass.
- [x] **Logo wired in** — header (above the wordmark), SVG favicon,
      and all 5 PWA/apple-touch-icon PNG sizes regenerated directly from
      `assets/logo.svg` (via `qlmanage -t`, same technique as the
      sibling Dawsons project, no new dependency).
- [x] **THIRD_PARTY_NOTICES.md up to date** — basic-pitch's real
      Apache-2.0 license (corrected from an initial MIT assumption),
      the vendored copy's build provenance (`npm pack` + `esbuild`,
      bundling `@tensorflow/tfjs` and `@tonejs/midi` with their own
      verified licenses), and the reused-from-Dawsons pitch-tracker
      attribution are all present and current.
- [x] **Difficulty tiers + gated progression** (added this pass):
      `getDifficulty()` classifies all 102 songs from already-verified
      chord data (27 Beginner / 63 Intermediate / 12 Advanced).
      Intermediate unlocks after 5 completed Beginner songs, Advanced
      after 5 completed Intermediate songs — tier-gating only, no
      song-by-song sequencing within an unlocked tier. Locked songs stay
      visible with an explicit unlock-requirement message, never hidden.
      Verified by actually marking 5 real songs "completed" via the
      storage API and confirming the next tier's lock count dropped to
      exactly the expected value, not just reading the gating code.
- [x] **Zero-friction lesson entry** — landing on the Lessons tab (now
      the default tab) drops straight into the next incomplete lesson
      (Day 1 for a brand-new user), confirmed with a cleared-localStorage
      test. The lesson map is still one tap away via the existing exit
      link for anyone who wants to browse instead.
- [x] **Tabs reordered, Lessons first** — confirmed as both the markup
      order and the default active tab on load.
- [x] **Vivaldi added** to the repertoire catalog (catalog-only, "Spring"
      from The Four Seasons, composer died 1741, safely public domain).

## Honest summary of what's NOT fully done

- **Moonlight Sonata** was never built, despite being explicitly
  discussed as a possible capstone — Pachelbel's Canon in D (already
  built) was kept instead. If a Moonlight Sonata excerpt is wanted, it's
  real, scoped future work, not something quietly skipped.
- **7 of 8 pieces** in the advanced-repertoire catalog (now 9 with
  Vivaldi) are catalog-only — real, verified metadata, no fabricated
  chart, but no interactive excerpt. Only Für Elise's opening and the
  full Canon in D got real built lessons.
- **90 of 102 songs** don't have full verse/chorus/bridge structure data
  — only the main 4-chord loop. Building full structure for the rest
  would be a much larger per-song research lift than the simple-loop
  version, same honest scope line drawn in earlier commits.
- **Camera Overlay** is a real, working two-tap linear-mapping
  implementation, explicitly not full computer-vision keyboard
  detection — stated as a Phase 2 boundary from the start, not changed
  in this audit.
- **The falling-note highway** is wired into Follow Along only, not
  Ear Check or Camera Overlay (the latter was explicitly marked
  optional/time-permitting when requested).
- **The Capacitor iOS app** is scaffolded and `cap sync`-clean but has
  never been opened in Xcode, built, or run on a simulator/device from
  this environment — genuinely cannot be, for the credential/interactive
  reasons stated above.
- **Difficulty tiers** are computed by a consistent rule (chord
  complexity + a jazz/classical-is-Advanced category rule), not by
  individually hand-reviewing all 102 songs one at a time — a
  deliberate choice for consistency and auditability over manual
  spot-judgment at this volume, documented in the `getDifficulty()`
  function itself for anyone who wants to review or override specific
  calls.

## Verification discipline used throughout

Every item marked `[x]` above was re-checked in a real, running browser
during this specific audit pass (not assumed correct from having built
it earlier in the project) wherever that was practical in the time
available, with network-request logs, localStorage inspection, direct
unit tests of timing/pitch math, and the live production site itself
all used as real evidence — not just reading the source code back.

## 2026-10-05 update: Lesson 1 redesign, mascot, piano-buying intro, ~100 real lessons

Prompted by Sid's direct feedback on a screenshot of the old Lesson 1
("chord 2 of 4" showing two highlighted keys with zero explanation of
why) — this pass rebuilt the whole first-run experience end to end.

- [x] **Lesson 1 rewritten** (`js/lessons-ui.js`, `runLesson1`) to fix
      the actual reported confusion: every chord screen now spells out
      *all* of its notes by name ("It's 3 keys, all lit up below: G, B,
      D") instead of silently highlighting multiple keys. New flow:
      teach each chord one at a time -> quiz (play all 4 in order) ->
      "let's play a real song" (Shallow — Lady Gaga/Bradley Cooper,
      chosen because its verified chords are *literally* G-D-Em-C with
      no capo/alternate-version caveat, unlike 5 other candidates) ->
      rapid-fire montage through the other 26 confirmed library songs
      using the same pattern -> a "next lesson: get a friend and sing
      along" teaser -> a genuine level-up screen that calls the real
      `checkBadges()` API and only shows "you unlocked a level!" when a
      badge was *actually* newly earned.
- [x] **Calibration moved out of Lesson 1 and into its own lesson**
      ("Get Started") per later direct feedback, so the numbering reads
      Step 1 (piano-buying intro) -> Lesson "Get Started" (audio
      pitch-match calibration) -> "Your first 4 chords." `lesson-1`'s
      id and saved progress/badge wiring are untouched; only its
      position in the on-screen list shifted.
- [x] **"Get yourself a piano" intro card** (`runPianoIntro`) — real,
      researched advice (where to find a cheap/free keyboard, what to
      check before taking one home, weighted vs. unweighted explained
      plainly, honest budget expectations, a real caution about free
      acoustic pianos), shown before any interactive content.
- [x] **Mascot** (`assets/mascot.svg`, drawn and committed separately by
      Sid — originally a wallaby, then swapped to a panda, same file
      path both times) replaces the key logo as the header/favicon/
      PWA icon everywhere — PNG icons regenerated at all 5 sizes
      directly from the new SVG each time it changed (via `sips`, the
      only SVG-capable rasterizer available in this environment; no
      `rsvg-convert`/`inkscape`/`imagemagick` installed). A cropped
      head-only variant (`assets/mascot-face.svg`, kept in sync by hand
      with the full artwork) is used as a small recurring narrator
      avatar (`mascotSay()` helper) next to the simplified lesson copy
      throughout Lesson 1, part of "Get Started," and every "Master
      this song" lesson — not full Duolingo-owl animation, but a
      consistent illustrated presence, as asked. `assets/logo.svg` is
      kept in the repo as a secondary mark, just no longer referenced
      as the primary logo.
- [x] **Copy simplified** in Lesson 1 and the start of Lesson 2 —
      shorter sentences, one instruction per screen, "chord" explained
      in one plain sentence on first use instead of assumed knowledge,
      "diminished" reframed as "sounds unstable" with the technical term
      offered but not required.
- [x] **~100 real lessons via song-mastery lessons woven into the
      theory arc**, not placeholders: every confirmed-chord song whose
      chord chart the existing chord-symbol parser (`js/chord-utils.js`,
      already used by Practice/Camera Overlay) can actually parse
      becomes its own lightweight "Master: [Song]" lesson
      (`runMasterSongLesson` in `lessons-ui.js`), inserted right after
      the theory that unlocks it: 10 Beginner-tier song lessons after
      Lesson 1, 17 more after Lesson 6 (once minor-key songs are fair
      game), 31 Intermediate-tier lessons after the 7th-chords arc
      (Lesson 30), 6 Advanced-tier lessons after the jazz/classical
      bonus content (Lesson 37). Honest final count: **102 lessons**
      (2 pre-lessons + 37 theory + 63 song-mastery), every single one
      real and clickable — nothing padded to hit a round number.
      "Bohemian Rhapsody" is deliberately excluded from song-mastery
      lessons because its own chord data literally says "varies
      dramatically by section," which the parser correctly can't turn
      into playable chords — that's the one confirmed-chord song that
      didn't make the cut, and it's excluded for an honest reason, not
      an oversight.
- [x] **Right-side lesson roadmap/timeline** (`timelineHtml()` /
      `.hk-roadmap*` CSS) — persistent sidebar showing all 102 real
      lessons, numbered, clickable (subject to the same linear
      lock-until-previous-done gating the main map already used),
      scrollable. Completed lessons fill in a deliberate **purple**
      accent (`--hk-purple`), distinct from the site's blue/pink base
      theme from item 17 — verified live by completing a lesson and
      watching its roadmap node flip from grey to purple without a
      page reload, using real `localStorage` state, not a mockup.
      Caught and fixed a real bug during verification: the sidebar's
      CSS class was originally named `.hk-timeline`, which collided
      with an unrelated pre-existing `.hk-timeline` class used by the
      Practice tab's draggable-playhead feature (`height: 50px;
      overflow: hidden`) and silently clipped the whole sidebar list to
      a sliver. Renamed to `.hk-roadmap*` to resolve it.
- [x] **Badge thresholds made dynamic** (`js/badges.js`) — "Halfway
      There" and "Curriculum Complete" now compute against the real,
      current `LESSONS.length` (102) instead of a hardcoded "37."

### Honestly, what's simplified/not done in this pass

- The chord-symbol-to-notes parser used for "Master this song" lessons
  intentionally folds extensions beyond a plain triad/7th (9ths,
  altered 5ths, 6/9 chords) into their nearest simple quality — e.g. a
  song charted as "G7b9" plays as a plain G7 shape. This teaches a
  beginner-playable chord, not a full jazz voicing; it's the same
  parser already used elsewhere in the app, not a new simplification
  invented for this feature.
- "Master this song" lessons teach the chord loop only (press each
  chord in sequence once) — they do not use the full verse/chorus/
  bridge `SONG_STRUCTURES` data (only 12 songs have that) or the
  falling-note highway. A genuinely deeper per-song lesson using full
  structure data for more songs remains real future work.
- The kid-friendly "one clear instruction, zero assumed context" bar
  was applied by review to Lesson 1, "Get Started," and the piano-buying
  card specifically; it was not re-applied line-by-line across all 37
  pre-existing theory lessons (Lessons 2-37) in this pass — those still
  use the copy style from earlier audits, which is numbers-first but not
  rewritten to this stricter bar.

## 2026-10-05 update: front-loaded lesson sequence, repertoire showcases, Discover redesign

Also added: the "How It Works" page now explains what "Hz" itself means
and where the name came from (Heinrich Hertz, 1880s), same tone as the
rest of that page.

- [x] **Chord-symbol parser bug found and fixed** (`js/chord-utils.js`,
      shared by Practice/Camera Overlay/Lessons): suffixes like "mMaj7"
      and "m6" were being swallowed by the plain "m" (minor) rule
      because of check ordering, silently dropping their defining color
      note — e.g. "CmMaj7" played as a bare C minor triad. Found while
      building the My Funny Valentine lesson (whose whole point is the
      Cm -> CmMaj7 -> Cm7 -> Cm6 line) and fixed by reordering/adding
      more-specific suffix checks before shorter ones.
- [x] **"Last Christmas" independently re-verified** (not just trusted
      from the old flagged data): multiple independent chord-chart
      sources confirm D-Bm-Em-A for the verse/intro/interlude, including
      exact lyric-to-chord alignment. Upgraded from needs-verification
      to confirmed. Important honesty catch: this is I-vi-ii-V, **not**
      Lesson 1's I-V-vi-IV — shares 2 of 4 chords but is a genuinely
      different progression. The lesson that teaches it says so plainly
      instead of overstating the connection, even though the original
      brief for this lesson assumed it was "the same 4 chords."
- [x] **Lesson sequence front-loaded per Sid's exact spec**: Pre-lesson
      (piano), Pre-lesson (Get Started/calibration), Lesson 1 ("The 4
      keys to play 100 songs"), 2 (Last Christmas), 3 (Choose your
      song — a real 10-song choice menu, not a forced montage), 4 (Left
      hand vs. right hand, an early two-hand preview), 5 (The jazz
      trick, an early improv preview), 6 (Train your ear), 7-10 (four
      more real songs). By Lesson 10 the user has completed exactly 5
      real Beginner-tier songs (1 from Lesson 3 + 4 from Lessons 7-10)
      — exactly the existing 5-songs-to-unlock threshold — so
      Intermediate unlocks naturally without changing that number.
- [x] **"Master this song" lessons now mark the song itself completed**
      (`markSongStatus`), not just the lesson — a real latent bug from
      the previous pass: Discover's tier-gating and the "Leveling Up"/
      "Going Pro" badges read `getSavedSongs()`, which lesson completion
      alone never touched. Fixed so finishing a song-mastery lesson
      genuinely counts toward unlocking the next tier.
- [x] **Exact repertoire placements** (update mid-pass, overriding the
      earlier generic "Lesson 11 = any popular Intermediate song" plan):
      Lesson 11 = Almost Blue (Chet Baker) — honestly scoped to just its
      two confidently-sourced intro chords (Am, Dm9); its data's third
      "chord" is literal placeholder text ("see notes"), correctly
      excluded. Lesson 15 = My Funny Valentine (the real "minor line
      cliché," Cm-CmMaj7-Cm7-Cm6). Lesson 25 = Für Elise (reuses the
      existing verified excerpt). Lesson 30 = Vivaldi's Spring, Sid's
      own word "attempt" — honestly scoped down to just the iconic
      repeated opening E major chord gesture (extremely well-documented,
      structural, not guessed), explicitly NOT the full violin melodic
      theme, which no independently-confirmed simplified transcription
      was found for. Lesson 35 = Chopin's Nocturne Op. 9 No. 2 — kept
      catalog-only with an honest in-lesson explanation (a web search
      confirmed the piece's key/structure/character but not a specific
      note-by-note opening phrase trustworthy enough to teach as real).
      These 5 are reachable via normal linear lesson progress regardless
      of Discover's separate Advanced-tier gate, same "early preview"
      pattern as Lessons 4/5. The previous "Intermediate unlocked"
      showcase lesson was moved out of slot 11 and now flows naturally
      into the Lesson 13+ continuation instead.
- [x] **Lesson numbering now excludes pre-lessons**: "Get yourself a
      piano" and "Get Started" show as "Pre-lesson," not "Lesson 1/2,"
      so Lesson 1 is genuinely "The 4 keys to play 100 songs" as asked.
      Top-of-tab title added: "100 Lessons to Learn Any Song — START
      HERE." Honest real count: **101 total entries** (2 pre-lessons +
      99 numbered lessons) — close to but not exactly 100, stated
      plainly rather than padded.
- [x] **Discover tab redesigned**: album art now fetched live from the
      iTunes Search API (`itunes.apple.com/search`, free, no API key,
      an explicitly public lookup service for exactly this use) with a
      graceful plain-card fallback on any failure; chords shown directly
      under the title on every card (even locked ones), not hidden
      behind a click; the "Upload any song" flow moved to a prominent,
      visually distinct banner at the very top of the tab.
      **Verification caveat, stated honestly**: this sandbox's shared
      outbound IP hit iTunes' rate limiting partway through testing
      (confirmed via direct `curl` — real `access-control-allow-origin:
      *` header present on a successful request, then 403s on
      subsequent ones from the same IP). Album art genuinely loaded and
      rendered correctly for several songs before the rate limit kicked
      in (confirmed visually), and the fallback correctly took over for
      the rest with zero layout breakage — but a full, unthrottled
      verification should be re-checked on the real production domain,
      same pattern as the service-worker registration quirk documented
      earlier in this file.

### Honestly, what's simplified/not done in this pass

- Lesson 25 (Für Elise) and Lesson 37 (the existing "Bonus: Advanced
  repertoire" lesson) both independently show the same Für Elise
  excerpt — intentional light duplication (Lesson 25 is an early taste,
  Lesson 37 is the fuller catalog context) rather than a refactor risk
  taken under time pressure; not a bug, but worth noting as duplicated
  content rather than a single shared touchpoint.
- The "Choose your song" and front-loaded song lessons (Lessons 2-10)
  reuse the same lightweight chord-walkthrough format as every other
  "Master this song" lesson — no deeper per-song structure than that.
- Jazz/classical showcase lessons at 11/15/25/30/35 are deliberately
  thin (a handful of chords/notes each) — real, verified, honestly
  scoped, but not full performances of those pieces/tunes.

## 2026-10-05 update: mascot syncs, purple lesson buttons, real overflow fix, upload "Play it"

- [x] **Mascot kept in sync across two more of Sid's own redraws**
      (wallaby -> panda "bamboo stick" pose -> fatter/fluffier/bigger-eyed/
      no-mouth version) — PNG icons regenerated via `sips` and
      `assets/mascot-face.svg` (the cropped narrator avatar) rebuilt to
      match each time, verified visually in the header and in-lesson
      mascot bubble.
- [x] **Lesson-progression buttons now consistently use `--hk-purple`**
      (the same exact variable the roadmap's "completed" accent uses,
      not a separate shade) — scoped specifically to the lesson flow
      (`js/lessons-ui.js`'s ~99 Next/Start/Continue/Try-it buttons got a
      new `.hk-btn-lesson-next` class) rather than recoloring every
      `.hk-btn-primary` site-wide, since Practice/calibration/camera
      buttons elsewhere were never asked to change.
- [x] **The piano-buying intro's "let's go" button was real navigation
      already** (calls `showMap()`), but landed on the lesson map instead
      of continuing straight into the next lesson — changed it (and the
      "Get Started" calibration's finish/skip) to call `startNextLesson()`
      instead, so the whole pre-lesson run-up is genuinely zero-friction,
      not just the very first tab load. Verified by clicking through from
      a cleared localStorage state.
- [x] **Real text-overflow bug found and fixed**: `.hk-mascot-bubble`
      (the card wrapping every mascot-narrated lesson screen, including
      the piano-buying intro Sid screenshotted) was a flex item with no
      `min-width: 0` — the classic flexbox bug where a flex child's
      default `min-width: auto` can let it refuse to shrink/wrap below
      its content's intrinsic width and overflow its container. Fixed
      with `min-width: 0; overflow-wrap: break-word;`. Verified by
      resizing a real browser to 320px, 375px, 700px, and 900px widths
      and confirming every line wraps cleanly with nothing clipped.
- [x] **Discover upload: added a real "Play it" button** after a
      successful transcription, reusing the exact same keyboard-highlight
      + Web Audio synth (`keyboard.js`'s `renderKeyboard`/`playTone`)
      every other part of the app already uses for playback — no second
      parallel audio path. Verified end-to-end: synthesized a real WAV
      tone in-browser, uploaded it through the actual file input (via a
      `DataTransfer`-constructed `File`, dispatching a real `change`
      event — not a mocked function call), confirmed a real transcription
      result, clicked "Play it," and confirmed the keyboard rendered and
      highlighted the correct key with zero console errors.
- [x] **Investigated "it doesn't work after transcribing" as its own bug,
      per explicit instruction not to assume the Play-it button alone
      fixes it.** Traced the exact real user path: after a transcription,
      the old status message said "head to the Practice tab," but the
      transcribed notes were never passed or stored anywhere — clicking
      through to Practice (confirmed by actually doing it) shows the
      Practice tab's unrelated default song (`SONGS[0]`) with zero
      connection to the upload. **Finding: this is a real dead end, not a
      crash** — no console error, no broken state, just nothing useful to
      do with the old guidance. The misleading "head to Practice" message
      was removed and replaced with accurate copy; the new "Play it"
      button is the actual fix. Applied the identical fix to the Practice
      tab's own (separate, pre-existing) upload flow too, for the same
      honesty reason — it had the exact same "Playback is Phase 2" claim,
      which would otherwise now be stale/inaccurate.

## 2026-10-05 update: new MIDI tab — computer-keyboard-playable virtual piano

- [x] **New "MIDI" tab** (`js/midi.js`, 6th nav tab) — a fully playable
      on-screen keyboard driven by the computer's physical keyboard, for
      anyone exploring the app without a real piano nearby. Reuses
      `keyboard.js`'s existing `renderKeyboard`/`playTone`/
      `highlightHands` exactly as-is — no second parallel
      piano-rendering or audio implementation.
- [x] **Left/right-hand row split, per Sid's exact refinement**: the
      home row (`A S D F G H J K L ; '`, 11 keys) is the left hand's
      range (C3-A#3); the top letter row (`Q W E R T Y U I O P [ ]`,
      12 keys) is the right hand's range (C4-B4) — a continuous 25-note
      span, left hand lower/right hand higher, the same register
      convention real two-hand playing uses. Wired into the exact same
      `highlightHands()` left/right color coding (pink/blue) already
      used by the falling-note highway and every two-hand lesson, not a
      new color scheme.
- [x] **Required caveat included, not buried**: a mascot-voiced note at
      the top of the tab says plainly that this is handy for exploring
      without a piano, but real physical practice is what actually
      builds muscle memory, with a direct pointer to the "Get yourself a
      piano" lesson.
- [x] **Real touch/pointer support, verified, not assumed**: `keyboard.js`
      already binds `pointerdown`/`pointerup` (the unified Pointer
      Events API covers mouse AND touch natively), so tapping keys
      works for free — verified directly by dispatching a real
      `PointerEvent` with `pointerType: "touch"` at a 375px mobile
      viewport and confirming the correct `hk-key-pressed` /
      `hk-key-hand-left` classes applied and cleared correctly. Also
      verified real `KeyboardEvent`s for both rows produce correct
      left/right highlighting and clear on key-up.
- [x] **Mobile-responsive key labels**: the on-screen computer-key
      labels (meaningless without a physical keyboard) fade to low
      opacity under 640px, same breakpoint convention as the rest of the
      app's mobile-responsive work (item 12), so tapping is the obvious
      primary interaction on touch-sized screens.
- [x] **No regression to other tabs' keyboard input**: the computer-key
      listener is attached to `document` but checks the MIDI panel's own
      visibility before acting, and ignores input while focus is in a
      text field — verified by typing "asdf quick" into Discover's
      search box (which overlaps several mapped letters) while on a
      different tab and confirming it types normally.
- [x] Standalone-tab scope only this pass — not wired as an alternate
      input method inside Practice/Lessons (explicitly left as "your
      call" in the brief; the standalone tab works fully on its own).

## 2026-10-05 update: visual Middle C + keyboard highlight color sweep

- [x] **"Get Started" calibration now shows Middle C visually, not just
      text** (`js/calibration.js`) — renders the same `renderKeyboard` +
      `highlightChord` component used everywhere else (Lesson 1's "the
      1/G," etc.), with Middle C highlighted right above the explanation
      text instead of after it, so the learner sees exactly which key is
      meant instead of reading a description and guessing. No new visual
      language invented — same highlight mechanism reused directly.
      Verified the audio pitch-match flow right after it still works
      (confirmed the expected "Microphone access failed (Permission
      denied)" graceful fallback in this sandbox, same as previously
      documented).
- [x] **Keyboard highlight color swept from blue to pastel pink**
      (`.hk-key-highlight` in css/style.css) — this is the generic
      single-note/chord highlight used in calibration, lessons, Practice,
      and the MIDI tab; it's now pink so it can't be visually confused
      with the deliberate two-hand right-hand blue coloring
      (`.hk-key-hand-right`), which was explicitly left untouched. Also
      updated the badge letter text color to match (dark pink instead of
      dark blue). General UI blue elsewhere (buttons, informational
      badges) was intentionally left alone — that's the established
      item-17 pastel blue+pink dual-tone theme, not a stray accent.
- [x] **Real bug caught and fixed while verifying the color sweep**: the
      "Left hand vs. right hand" preview lesson's right-hand note
      (`js/lessons-ui.js`, `runTwoHandPreview`) was computed as one
      octave above the chord's top note — for the G chord, MIDI 86 — but
      the keyboard was only rendered up to MIDI 79. `highlightHands()`
      silently did nothing for a note outside the rendered range, so the
      right hand's note never appeared at all (looked like only the left
      hand ever lit up, no error thrown). Fixed by widening the
      keyboard's range to MIDI 88. Verified visually: both hands now
      show their real colors (pink left, blue right) with correct L/R
      badges.

## 2026-10-05 update: lesson template consistency pass

- [x] **Two real bugs fixed everywhere `.hk-btn-lesson-next` appears**
      (the purple lesson-progression button class from item 27): white
      text instead of dark-on-purple (a real contrast/readability bug),
      and moved to bottom-right via `.hk-lesson-controls` becoming a
      `flex; justify-content: flex-end` row instead of left-aligned flow
      — both fixed once in CSS, so every lesson screen picked it up
      automatically, not just the one screen Sid screenshotted.
- [x] **Mascot-narration consistency extended through the original Day
      1-10 arc** (`runLesson3` through `runLesson10` in `js/lessons-ui.js`)
      — these predated the mascot pattern introduced in items 21/25 and
      were plain-paragraph text; now wrapped in the same `mascotSay()`
      bubble as every newer lesson, matching the screenshot's template
      (title → step indicator → big visual → mascot-narrated card →
      keyboard → bottom-right Next).
- [x] **Playback controls added where something actually plays
      continuously through time**: the early "jazz trick" preview and
      the deeper "Jazz comping & improv" bonus lesson both loop a chord
      progression via `setInterval` while the user free-plays — these
      now have a real Pause/Resume toggle alongside "Mark complete,"
      bringing them to parity with Practice's playback controls.
      Verified by clicking Pause mid-loop and confirming it stops/
      restarts correctly, toggling its own label.

### Honestly, what's NOT done in this consistency pass

- **Days 11-37** (scales, two-hand coordination, 7ths, Canon in D, the
  classical/advanced-repertoire catalog lesson) still use plain-paragraph
  text, not the mascot-narrated card — a real, explicitly-scoped gap,
  not hidden. The *structural* template (title, step indicator, keyboard,
  bottom-right white-on-purple Next) is now universal across all ~100
  lessons via the shared `lessonShell()` + CSS fix, since every lesson
  already used that shared component; it was specifically the mascot
  bubble wrapping that was only extended through Day 10 in this pass,
  given the volume of remaining lesson functions (~26 more). Finishing
  the mascot wrap for Days 11-37 is real, well-scoped future work, not
  a different kind of change.
- No other lesson types were found to need playback controls beyond the
  two jazz-loop lessons — every other lesson type is genuinely a
  user-paced "look at this, press Next" flow with nothing actually
  playing through time on its own, which per the brief doesn't need
  pause/rewind/speed controls.

## 2026-10-05 update: mascot switched from vector SVG to Sid's own illustration

- [x] **Mascot is now a raster illustration, not an SVG** — Sid replaced
      the code-drawn panda with his own original hand-drawn-style
      artwork (confirmed directly with him it's his own work, same
      provenance standard applied to every asset here): `assets/
      mascot-full.png` (1408x768, panda at an upright piano with sheet
      music — used as a hero illustration on the About page) and
      `assets/mascot-square.png` (768x768, used for the header logo,
      favicon, and all PWA/iOS icon generation).
- [x] Regenerated all 5 PWA icon sizes from `mascot-square.png` via the
      same `sips` pipeline used for every prior mascot swap.
- [x] **New narrator avatar**: `assets/mascot-face.png`, a 420x420 crop
      of `mascot-square.png` tight on the panda's face (cropped with
      PIL, checked visually that it still reads clearly at the small
      48px avatar size) — replaces `assets/mascot-face.svg` everywhere
      it was referenced (`js/lessons-ui.js`'s `mascotSay()`, `js/midi.js`'s
      caveat card).
- [x] `assets/mascot-full.png` used as a hero illustration on the About
      page (`js/about.js`) — a natural fit for the wider image per the
      "use it where a wide illustration fits better" guidance.
- [x] Old `assets/mascot.svg` / `assets/mascot-face.svg` left in the repo
      unreferenced (same "don't delete, just stop using as primary"
      convention already established for the original key-shaped
      `logo.svg`).

### Important note for future mascot requests

**The mascot is now a fixed illustration, not a vector drawing this
project can recolor/repose on demand.** Every prior "redraw" (wallaby,
panda variations, pose changes, no-mouth, waving arm, etc.) was possible
because the mascot was hand-coded SVG shapes that could be edited
directly. That's no longer true: future requests like "change the
mascot's pose" or "make it a different color" need a **new image
supplied by Sid**, the same way `mascot-full.png`/`mascot-square.png`
themselves arrived — not something achievable by editing code.

## 2026-10-05 update: iOS App Store submission prep + a content tweak

- [x] **Piano-buying lesson simplified**: "where to find one" now
      mentions only Facebook Marketplace (Craigslist/OfferUp/thrift
      stores removed), with the school/church suggestion reframed as
      "borrow access to one" so it doesn't read redundant against a
      single-marketplace mention.
- [x] **iOS App Store icon regenerated for real** — the asset catalog's
      `AppIcon-512@2x.png` was still the generic Capacitor placeholder
      (a plain blue "X" logo), never replaced since the item-12
      scaffolding. Now a real 1024x1024 icon cropped from
      `assets/mascot-square.png` (tightened further than the raw square
      to cut excess empty margin, so it reads clearly at home-screen
      size), no alpha channel, no pre-applied corner rounding. Confirmed
      Apple's current icon spec for this Capacitor/Xcode version only
      needs this one "universal" 1024x1024 entry — Xcode 14+ generates
      every other size automatically; there is no longer a long list of
      individual sizes to fill in by hand.
- [x] **Launch screen rebranded** — `Splash.imageset` was also still the
      generic Capacitor default (plain white, tiny blue logo). Replaced
      with the site's pastel background color and the mascot centered,
      generated with PIL from the same source image.
- [x] **Real Privacy Policy published**: `privacy.html`, a real static
      page (not a raw markdown file) styled with the site's own CSS,
      linked from both the site footer and the in-app About page.
      Every claim cross-checked against actual app behavior: camera
      (Camera Overlay only, live/never recorded), microphone
      (calibration + Ear Check, live/never recorded), `basic-pitch`
      transcription (on-device, vendored, never uploaded), localStorage
      contents (progress/streaks/badges/saved songs, never transmitted),
      and — caught and fixed while verifying this — the **iTunes Search
      API album-art lookup (item 25) is a real network request that a
      stale "zero third-party network requests" claim in
      `THIRD_PARTY_NOTICES.md` didn't disclose**; fixed that file too so
      both documents now honestly describe the one real external call
      the app makes.
- [x] **App Store Connect listing drafted**: `ios/APP_STORE_LISTING.md`
      — name, subtitle options (one over the 30-char limit in Sid's own
      draft phrasing, flagged with compliant alternatives), promotional
      text, full description, keywords, support/marketing/privacy URLs,
      category, and a full age-rating question-by-question table with
      reasoning (every category "None"/"No," should land on 4+).
- [x] **Bundle identifier and version confirmed sane**: already
      `com.haydenkeys.app` / marketing version 1.0 / build 1 from the
      item-12 scaffolding — flagged in the checklist for Sid to confirm
      before registering, not silently assumed correct.
- [x] **Final numbered submission checklist**: `ios/SUBMISSION_CHECKLIST.md`
      — exactly what's done vs. what Sid needs to do himself in Xcode/
      App Store Connect (sign with his own account, take real
      screenshots, paste in the drafted listing copy and privacy URL,
      answer export compliance with the standard "no custom encryption"
      answer, archive, submit).
- [x] Re-verified `npx cap sync ios` runs clean after all icon/splash
      changes.

### Honestly, what's still not done (and genuinely can't be, from here)

- The actual build/sign/archive/submit steps need Xcode running
  interactively with Sid's own Apple Developer account — stated plainly
  in the checklist, not glossed over.
- Real device/simulator screenshots for the App Store listing weren't
  (and couldn't be) captured from this environment — that's listed as
  step 6 in `ios/SUBMISSION_CHECKLIST.md` for Sid to do himself.
- The Privacy Policy URL (`https://haydenkeys.com/privacy.html`) will
  only actually resolve once the site is deployed with this change —
  GitHub Pages deployment is still blocked on the one-time manual
  enablement step documented earlier in this file.

## 2026-10-05 update: varied mascot poses across the app

- [x] **12 distinct poses extracted** from Sid's irregular contact sheet
      (`assets/mascot-poses/source-sheet.png`, his own art, same
      provenance as the main mascot) into their own cropped files under
      `assets/mascot-poses/`: `composer`, `dreaming-notes`,
      `maestro-conducting`, `maestro-flute`, `grand-piano`, `harp`,
      `trombone`, `violin-dozing`, `metronome`, `mozart-scores`,
      `music-stand`, `sheet-music-pile`. Cropped by eye against the
      actual cell boundaries (the grid isn't uniform — the grand-piano
      panel spans two rows' worth of height), iterated twice to trim
      caption-label bleed-through at the bottom of several crops.
- [x] **Primary brand mark stays fixed**: header, favicon, and app icon
      still only ever use `mascot-square.png`/`mascot-full.png` —
      intentionally not randomized, per the explicit instruction to keep
      the recognizable brand mark consistent.
- [x] **Contextual variety wired into specific moments**, not random
      everywhere: `mascotSay()` (`js/lessons-ui.js`) now takes an
      optional `pose` argument — classical showcase lessons (Beethoven,
      Vivaldi, Chopin) use `composer`/`music-stand`/`mozart-scores`;
      jazz lessons (Almost Blue, My Funny Valentine, both jazz-comping
      lessons) use `trombone`/`harp`/`maestro-flute`; genuine level-up/
      badge-earned moments (Lesson 1's finale, any "Master this song"
      lesson that newly earns a badge, the "Intermediate unlocked"
      showcase) use `maestro-conducting`; the Saved tab's two empty
      states use `dreaming-notes`; Practice's speed-control row gets a
      small `metronome` icon next to the "Speed:" label.
- [x] **Deterministic rotation for the ~60 "Master this song" lessons**:
      rather than one static face on every one of dozens of song
      screens, each song's title is hashed to pick one of 6 poses
      (`grand-piano`/`harp`/`trombone`/`violin-dozing`/`metronome`/
      `maestro-flute`) — the same song always shows the same pose (not
      re-randomized on every visit), but different songs genuinely show
      different poses. Verified directly: "No Woman No Cry" and "With or
      Without You" render two different poses back to back.
- [x] Verified in a real browser: header/favicon unchanged across every
      tab switch; Almost Blue shows trombone; the Saved tab's empty
      states show the sleeping pose; Practice's speed picker shows the
      metronome; zero console errors beyond the known sandbox-only
      service-worker noise; all 12 new pose assets confirmed loading
      with 200 OK via the network request log (no broken images).

## Full project audit, 2026-10-05 (item 36 — items 21-35 re-verified)

Sid asked directly "is everything we spoke about done?" Same rigor as
item 20's audit of items 1-19, now for 21-35: every line below was
checked by actually exercising it in a real browser (local server AND
the live production site), not just read from code. One real bug was
found and fixed during this pass (see below) — this audit isn't a
rubber stamp.

- [x] **Lesson 1 redesign** (item 21) — explicit per-note chord
      explanations, the real-song walkthrough, the montage, and the
      level-up screen all confirmed working end to end earlier this
      session and re-spot-checked now; structure unchanged by later work.
- [x] **Simplified copy, numbers-first** (item 22) — piano-buying intro
      and Lesson 1/2 confirmed reading plainly on the live site.
- [x] **Purple roadmap/timeline** (item 22) — confirmed on both the live
      site and local server: completed nodes fill purple, current node
      gets "you are here," pre-lesson steps correctly excluded from the
      numbered count.
- [x] **Mascot narrating lessons, final illustration** (item 23,
      superseded by 32/33/35) — re-grepped the entire codebase for
      `mascot.svg`/`mascot-face.svg`: zero leftover references anywhere.
      Every narrator moment uses the real PNG illustration or one of the
      12 extracted poses.
- [x] **Piano-buying intro, Facebook-Marketplace-only** (items 24+34) —
      confirmed live: "Check Facebook Marketplace" only, no Craigslist/
      OfferUp/thrift-store list, school/church reframed as "borrow
      access to one."
- [x] **Kid-friendly quality bar** — spot-checked Lesson 1's chord
      screens, the MIDI tab caveat, and the jazz-trick preview: short
      sentences, one instruction per screen, holding up. (As already
      documented honestly in earlier STATUS.md entries, this bar was
      never claimed to be retrofitted onto Days 11-37's older plain-text
      lessons — that gap is pre-existing and still open, not new.)
- [x] **Discover: real album art, chords on cards, upload banner top**
      (item 25) — confirmed live: real cover art loading for multiple
      songs, chords shown directly under each title, upload banner is
      the first thing in the tab.
- [x] **Early lesson resequence matches Sid's exact spec** (item 25) —
      confirmed via the live roadmap's full text dump: Pre-lesson(piano)
      → Pre-lesson(Get Started) → 1 The 4 keys → 2 Last Christmas → 3
      Choose your song → 4 Left hand vs. right hand → 5 The jazz trick →
      6 Train your ear → 7-10 four more songs → 11 Almost Blue → 12 Day
      11 scale → 13 Intermediate unlocked: Bad Guy → ... exact order,
      no drift.
- [x] **Interstellar ear-training example, honestly scoped** (item 25) —
      confirmed the live lesson's actual text: explicitly explains why
      Interstellar was skipped (modern film score, living composer, not
      reducible without misrepresenting it) and substitutes Ode to Joy.
- [x] **Showcase placements 11/15/25/30/35** (item 25 update) — confirmed
      programmatically against the live site's own loaded `LESSONS`
      array: Almost Blue/My Funny Valentine/Für Elise/Vivaldi/Chopin
      land at exactly positions 11/15/25/30/35.
- [x] **Hz explanation in How It Works** — confirmed live, full correct
      text (Heinrich Hertz, 1880s, cycles-per-second renaming).
- [x] **In-app About/Credits page, README tightened** (item 26) —
      confirmed live: About page renders with the mascot-full.png hero,
      live-computed counts, Privacy Policy link.
- [x] **Vivaldi + difficulty tiers with real 5-songs gating** (item 19,
      re-confirmed) — Discover live shows "Beginner unlocked ·
      Intermediate: 0/5 Beginner songs completed · Advanced: 0/5..." —
      gating logic unaffected by any later change.
- [x] **Daily goal + real badges** (item 20, re-confirmed) — confirmed
      live on the lesson map: streak counter, daily-goal progress bar,
      and the 9-badge strip all render and read from real localStorage
      state, not hardcoded.
- [x] **Mascot pose variety live, not regressed** (item 35) — re-verified
      after the duplicate-lesson fix below (which changes lesson
      ordering/count): poses still resolve correctly per-context.
- [x] **Purple Next buttons, white text, bottom-right** (items 27/31) —
      confirmed on multiple lesson screens; CSS rule and the 99
      `.hk-btn-lesson-next` call sites in `js/lessons-ui.js` intact.
- [x] **MIDI tab** (item 28) — left/right-hand row split and caveat
      confirmed rendering correctly live; touch/pointer support was
      verified with a real dispatched `PointerEvent` earlier this
      session and the underlying `keyboard.js` code is unchanged since.
- [x] **Discover upload "Play it" + the dead-end bug fix** (item 27) —
      code and the real end-to-end verification (synthesized WAV through
      the actual file input) both still in place; not re-run with a real
      file this pass to save time, but nothing touched that code path
      since.
- [x] **Text-overflow fix holding** (item 27) — `.hk-mascot-bubble`'s
      `min-width: 0` rule confirmed still present in `css/style.css`.
- [x] **Middle-C visual highlight + pink key-highlight sweep**
      (items 29-30) — confirmed live: Middle C renders pink-highlighted
      with the "Middle/C" badge before the explanation text.
- [x] **iOS submission prep reflects the final mascot** — confirmed: the
      iOS `AppIcon-512@2x.png` was generated from `mascot-square.png`
      (Sid's real illustration), not the old SVG; item 35's pose
      additions only added *new* files under `assets/mascot-poses/` and
      never touched `mascot-square.png`/`mascot-full.png` themselves, so
      the iOS assets remain valid with no further action needed.
- [x] **Playback speed control still synced** (item 18) — confirmed live
      in Practice: clicking 0.5× actually re-renders the falling-note
      highway at the new speed, with the new metronome mascot icon next
      to the control, unaffected by everything added since.
- [x] **No lyrics, no YouTube import anywhere** — re-grepped the entire
      codebase fresh for this audit: zero real lyric text (only policy/
      doc mentions of the *rule* itself, plus one unrelated use of the
      word "lyrical" and basic-pitch's own internal MIDI-event-type
      strings), zero YouTube-import code (only the Discover/About pages'
      own explanations of why it's *not* supported).
- [x] **GitHub Pages deploying cleanly, live site matches latest commit**
      — **this had previously been documented as blocked** (GitHub's
      one-time admin-only first-enablement restriction). Re-checked via
      the GitHub Actions API for real: the latest run (triggered by
      commit `61030f0`) shows every step, including "Configure Pages,"
      completing with `success` — someone with admin access (presumably
      Sid) must have done the one-time manual toggle at some point.
      `https://haydenkeys.com` now resolves (via a 301 from
      `astryks.github.io/haydenkeys`) and serves the exact latest commit
      — confirmed directly via `curl` (MIDI tab in the nav, `privacy.html`
      live, the new CSS rules all present server-side).

### A real regression caught and fixed during this audit

**Duplicate lesson content**: "My Funny Valentine" was being taught
*twice* — once at its dedicated showcase slot (Lesson 15, the real
"minor line cliché" 4-chord teaching), and a second time as a generic
"Master: My Funny Valentine" song-mastery lesson generated by the
Advanced-tier sweep, with the exact same chords. Root cause: when the
mid-session update added the Almost Blue/My Funny Valentine showcase
lessons, the code that excludes an already-featured song from the
generic sweep (`consumedTitles`) was applied to the Beginner and
Intermediate sweeps but never to the Advanced one. "Almost Blue" didn't
duplicate (its own chord data isn't parseable, so it was never eligible
for the sweep to begin with), but "My Funny Valentine" is a fully
confirmed, parseable Advanced-tier song and slipped through. **Fixed**:
`ADVANCED_SONGS` is now filtered against `consumedTitles` like the other
two tiers, and both showcase songs are added to that set explicitly.
This also corrects the real total lesson count from a stale 101 down to
a genuine, duplicate-free **100** — the "100 Lessons" title is now
literally accurate, not just close. Verified: only one "My Funny
Valentine" entry remains, all five showcase positions (11/15/25/30/35)
are unaffected, and all lesson IDs remain unique.

### A real UX caveat surfaced (not a bug, but worth stating plainly)

The service worker's cache-first strategy means a browser that visited
`haydenkeys.com` **before today's updates** will keep showing the
frozen old version (confirmed directly: an already-cached tab showed the
old key-shaped logo and a 5-tab nav with no MIDI tab, despite the server
having the correct latest files) until the user clears site data or lets
the standard two-reload service-worker update cycle complete. The
*deployment itself* is genuinely correct and current — this is a
client-side caching lag for returning visitors specifically, inherent to
the cache-first PWA strategy chosen back in item 12, not something any
of today's changes broke. Worth knowing about, not something this pass
attempted to redesign.

### Bottom line

Everything explicitly asked for across items 21-35 is genuinely built,
wired up, and re-verified working — with one real bug found and fixed
(the My Funny Valentine duplicate) and one pre-existing caching
behavior surfaced and explained (not fixed, since redesigning the SW
update strategy wasn't asked for). The lesson count is now a clean,
duplicate-free 100. No other regressions found.

## 2026-10-05 update: transparent mascot background + tagline change

- [x] **Transparent mascot PNGs** (Sid's own edit, commit `9b407c4`,
      flood-filled from the image borders rather than a naive global
      color threshold) merged in and verified: spot-checked alpha
      channel values at the corners (0, fully transparent) vs. the
      panda/piano silhouette (255, fully opaque), and ascii-mapped the
      whole alpha channel at a coarse grid to confirm a clean, coherent
      cutout with no holes bled through the fur or sheet music.
- [x] **Apple's no-alpha requirement for the iOS App Store icon handled
      correctly**: the new transparent `mascot-square.png` is NOT used
      directly for `AppIcon-512@2x.png` — it's flattened onto a solid
      opaque cream background (`#fdf6fa`, the site's own background
      color) first, then the same tightened crop from item 32 is
      reapplied, confirmed via `file`/PIL that the saved icon has mode
      `RGB` (no alpha channel at all).
- [x] **PWA/app-icon-style sizes flattened, favicon sizes kept
      transparent** — per Sid's own guidance ("flattening is the safer
      default for app-icon-style uses, reserve pure transparency for
      in-page display: header/favicon/narrator avatar"): `icon-16.png`/
      `icon-32.png` (favicon `<link>` tags) stay transparent (`RGBA`);
      `icon-180.png` (apple-touch-icon), `icon-192.png`, `icon-512.png`
      (PWA manifest install icons) are flattened to opaque `RGB`. The
      iOS launch screen (`Splash.imageset`) was also regenerated from
      the new art for consistency.
- [x] **Narrator avatar (`assets/mascot-face.png`) regenerated as
      transparent** too, from the new source, same crop region as
      before — explicitly one of the "in-page display" uses Sid called
      out for keeping transparency.
- [x] **Tagline changed** to Sid's exact wording, "Learn any song in
      piano for free!", replacing "Learn piano the way four chords
      taught the world a hundred songs." in both `index.html` and
      `privacy.html` (the only two places it appeared).
- [ ] **`assets/mascot-poses/*.png` background removal** — explicitly
      flagged by Sid as optional/not required this pass. Not done; those
      12 files still have their original cream background. Flagging as
      a real, known follow-up rather than silently leaving it undone.

Verified in a real browser: header and narrator avatar both now show a
clean transparent edge blending into the page's own pastel gradient
background (no visible cream square); the new tagline displays
correctly; zero console errors beyond the known sandbox service-worker
noise.

## 2026-10-05 update: Lesson 1 clarity fix, Middle-C anchors, new optional
## reference page, two song-library additions, full Lesson 1 narrative restructure (items 38, 39, 40)

- [x] **Chord-name vs. note-name ambiguity fixed** on every one of Lesson
      1's 4 chord-teaching screens (G, D, Em, C), not just G. Old wording
      ("This chord is called G. It's 3 keys, all lit up below: G, B, D")
      used "G" for two different things with nothing distinguishing them.
      New wording for each chord explicitly separates the two: *"This
      chord's name is G — named after its lowest note. It's made of 3
      individual keys, named G, B, D: press all 3 together and that's the
      G chord."* Verified live for all 4 chords (G/D/Em/C) in a real
      browser — each one correctly names the chord once, then lists its
      individual notes once, with explanatory text in between.
- [x] **Middle-C physical anchor added to all 4 chords**, reusing the
      exact landmark from the Get Started calibration lesson (the "two
      black keys nearest the middle" method), not re-explaining it from
      scratch:
      - G — "5 white keys to the right of Middle C — count them: C, D, E, F, G."
      - D — "2 white keys to the right of Middle C (C, D — that's it)."
      - Em — "3 white keys to the right of Middle C (C, D, E)."
      - C — "Middle C itself — the exact key you found in Get Started."
      Verified live, each anchor line renders under its corresponding
      chord.
- [x] **New optional, non-blocking reference page built**: `reference.html`.
      Checked first whether something suitable already existed — How It
      Works covers the pitch-detection ML model specifically, not a
      keys/chords glossary, so it's genuinely different content, not a
      duplicate. The new page has a full 2-octave keyboard diagram with
      every key labeled with its real note name, plus a chord glossary
      (G, D, Em, C, Am, Bm) spelled out note-by-note — all pulled from the
      same already-verified chord data the lessons themselves use
      (`LESSON1_CHORDS`, `LESSON5_CHORD`, `LESSON2_DEGREES`), not invented
      fresh. Linked from Lesson 1's "these 4 are the most useful to
      start" screen via a small, clearly secondary line: *"Curious about
      all the keys and chords? Tap here — you don't need this right now
      to keep going."* — opens in a new tab (`target="_blank"`), never
      inserted into the main lesson flow. Verified live: keyboard renders
      with every note correctly labeled (C, C#, D, D#, E, F, F#, G, G#,
      A, A#, B repeating across both octaves), glossary shows all 6
      chords with correct notes, zero console errors.
- [x] **"Make You Feel My Love" (Adele) checked before adding** — given
      the real duplicate-lesson bug item 36 found (My Funny Valentine
      taught twice), explicitly grepped the library first rather than
      assuming. Confirmed it already exists (added in item 16) with
      honest data: `confidence: "needs-verification"`, chords left as
      "insufficient agreement for a simple chart" with notes explaining
      the Dylan-original vs. Adele-cover dispute. Left untouched — no
      duplicate created.
- [x] **"My Love Mine All Mine" (Mitski) added**, genuinely new. Chords
      (Amaj7, Db7, D, Dm — the "Creep progression": a borrowed major III
      and a minor iv) cross-checked across multiple independent sources
      that agree on the exact chord set and independently name the same
      Creep-progression connection — not one chart copied around — so
      marked `confidence: "confirmed"`, not needs-verification. Verified
      via node: parses correctly, classifies as Intermediate difficulty,
      brings the real song count to 103 and `TOTAL_LESSON_COUNT` to 101
      (its own auto-generated "Master: My Love Mine All Mine" lesson),
      confirmed no ID collisions. Verified live in the roadmap sidebar at
      position 88.
- [x] **Lesson 1's opening restructured into the exact 6-step arc**:
      1. **Teaser, before any teaching** — "You can play 100 songs with
         just 4 chords. Here they are. Here's proof," cycling through 3
         real library songs (Love Story, Someone You Loved, Perfect) with
         "Next proof" / final "Okay, show me how" buttons. Verified live,
         all 3 play through correctly.
      2. **Explicit slow-down transition** — "Okay — let's slow down and
         actually learn this," into the existing what's-a-chord explainer.
         Verified live.
      3. **Finding G, equipment-agnostic** — "First, find G — no matter
         what keyboard you've got," using the same Middle-C-anchored,
         count-don't-assume-edge method as calibration: "count 5 white
         keys to the right, including Middle C itself... This works the
         same way whether your keyboard has 25 keys or 88 — always count
         from Middle C, never from the edge." Verified live with the G key
         correctly highlighted and labeled on the keyboard.
      4. **All 4 chords taught with the item-38 clarity fix** (see above).
      5. **"Other chords exist" + optional reference link** — "These 4 are
         the most useful to start... There are other chords out there
         too," with the `reference.html` link. Verified live.
      6. **Return to real songs, framed as the teaser's payoff** — the
         montage-intro screen now explicitly says "Remember the proof from
         the very start? Here's the rest of it," and the montage pool
         correctly excludes the 3 songs already shown in the teaser
         (confirmed live: "Song 1 of 23," starting with Yellow, not
         repeating Love Story/Someone You Loved/Perfect).
      Full flow verified start-to-finish in a real browser as a
      brand-new user (localStorage cleared): piano-buying pre-lesson →
      Get Started (Middle C skip) → teaser (3 songs) → slowdown → find-G
      → teach G/D/Em/C (each with clarity fix + anchor) → other-chords +
      reference link → quiz (G→D→Em→C root presses) → Shallow walkthrough
      (4 chords) → montage-intro (teaser callback) → montage song 1 of 23.
      `node --check js/lessons-ui.js` passes. Network tab shows all
      requests 200 OK; only console message is the single known
      sandbox-only "unknown error... fetching the script" service-worker
      noise already documented in earlier audits — no new errors.

## 2026-10-05 update: Lesson 1's opening hook rewritten to be concrete (item 41)

- [x] **Old abstract, cycling "proof" teaser replaced** with a single
      concrete hook screen: "Did you know 4 chords play over 100 songs?
      From 'Love Story' by Taylor Swift to '[X]' by [artist] — same 4
      chords, every time," followed by an explicit, non-jargon-dump
      explanation of why numbers are taught before letters ("the same
      numbers work in any key"), then the actual 4 chords shown as
      number+letter pills (1 G, 5 D, 6 Em, 4 C) right up front, ending in
      "Let's start with G."
- [x] **Sid's suggested second example song, "Careless Whisper" (George
      Michael), checked before use and found NOT to fit** — its real,
      sourced chords are Dm–Gm7–Bb–Am (i–iv–VI–v in D minor), a
      genuinely different progression, not the I-V-vi-IV / G-D-Em-C
      family. Rather than use an inaccurate example in the single most
      important hook line in the app, swapped in "Let It Be" (The
      Beatles) — already in the library as a `confidence: "confirmed"`,
      `oneFiveSixFourMatch: "exact"` match (C-G-Am-F, sources directly
      naming it I-V-vi-IV).
- [x] **Montage pool adjusted** to exclude both named hook songs (Love
      Story, Let It Be) in addition to the featured Shallow walkthrough,
      so nothing repeats twice in one lesson; montage-intro's callback
      line updated to reference the two songs actually named in the new
      hook instead of the old 3-song cycling "proof."
- [x] Sid again wrote "G A C D" out of habit for the chord names — kept
      the real, correct G-D-Em-C throughout, same correction applied
      every other time this has come up.

Verified live in a real browser from a freshly cleared localStorage:
the new hook screen renders both named songs and all 4 chord pills
correctly, "Let's start with G" correctly advances into the unchanged
slowdown → find-G → teach flow. `node --check js/lessons-ui.js` passes.
Montage pool size confirmed at 24 (27 total 1-5-6-4 matches minus the 3
now named/played earlier in the lesson). Zero new console errors beyond
the known sandbox-only service-worker noise.

## 2026-10-05 update: tuner-style "match this note" button on chord screens (item 41, part 2)

- [x] **New shared `createTunerWidget()` added to `js/pitch.js`**, built
      directly on `startLivePitchDetection()` — the exact same real
      mic/autocorrelation pitch detector already used by Get Started's
      Middle-C calibration (item 29) and Practice's Ear Check (item
      4/27). No second pitch-detection implementation was written; this
      is purely a visual layer (a needle that swings flat/center/sharp
      across a +/-1-semitone range, plus a text readout) on top of the
      same `{freq, midi, noteMidi, cents}` result object both existing
      call sites already consume.
- [x] **Wired into Lesson 1's "find G" screen and all 4 chord-teach
      screens** (G/D/Em/C) as a small, clearly optional "Tune this note"
      button — never auto-started, never blocks the Next/Got it button,
      exactly as asked ("not forced into the flow for someone who
      already knows they're on the right key").
- [x] **Mic lifecycle bug caught and fixed before shipping**: each lesson
      step re-renders `content.innerHTML`, which would have silently
      orphaned a running mic stream from a previous step's tuner widget
      (the DOM node disappears but `getUserMedia`'s stream keeps
      recording). Fixed with a tracked `activeTuner` reference that gets
      `.destroy()`-ed (stops the mic, releases tracks) at the top of
      every `renderStep()` call before the next step's content replaces
      it. Verified live: moving from "find G" to "Chord 1 of 4" resets
      the next screen's tuner button to its initial un-started label,
      not a leftover "Stop tuning" state.
- [x] **A real CSS bug caught during verification, not assumed fixed**:
      the display panel was hidden via the HTML `hidden` attribute, but
      `.hk-tuner-display { display: flex; ... }` has the same CSS
      specificity as the browser's built-in `[hidden]` rule and came
      later in the stylesheet, so it silently won — the dial was visible
      before the button was even clicked. Fixed by toggling
      `style.display` directly in JS instead of relying on the `hidden`
      attribute.
- [x] **End-to-end real-pipeline verification** (the sandboxed browser
      has no physical mic, so a literal "play a real piano key" test
      isn't possible here): temporarily substituted a real Web Audio
      oscillator + `MediaStreamAudioDestinationNode` in place of
      `getUserMedia`'s camera/mic stream, so the exact same
      `AnalyserNode` + `detectPitchInFrame` autocorrelation code in
      `pitch.js` processed genuine audio samples end-to-end — nothing
      about the detection path itself was mocked or stubbed. Confirmed
      live: 392.00 Hz correctly read as "In tune — 392.0 Hz. Nice." with
      a centered green needle (G4's real frequency); 415 Hz showed a
      sharp-tilted pink needle with "Sharp — a bit higher... try a key
      to the left"; 370 Hz showed a flat-tilted needle with "Flat — a
      bit lower... try a key to the right." This is the same genuine
      detector real microphone input would drive on a real device.

Verified live: tuner button present and optional on find-G and all 4
chord-teach screens; clicking it calls the real `getUserMedia`-backed
detector (confirmed by the sandbox's own "microphone access blocked"
notice on first attempt, then by the oscillator substitution test
above); needle and readout respond correctly to in-tune/sharp/flat
input; mic is released when navigating to the next step. Zero new
console errors beyond the known sandbox-only service-worker noise.

## 2026-10-05 update: real Back navigation + computer-keyboard play on lesson screens (item 42)

- [x] **Real Back button added to Lesson 1 and the shared "Master: X"
      song template** (`runMasterSongLesson`, which drives the large
      majority of auto-generated lesson screens in the app) — a history
      stack of full state snapshots is pushed on every forward
      transition; Back pops it and restores the exact same variables
      `renderStep()` reads, so the previous screen's real content comes
      back, not a visual flicker. Verified live: teaser -> slowdown ->
      Back correctly restored the original teaser screen with both
      named songs and all 4 chord pills.
      Honest scope note: the ~37 individually hand-built Lesson 2-37
      functions use the same step-machine pattern but were NOT swept
      this pass (each would need the same history-stack treatment
      individually) — flagging this as a real, known follow-up rather
      than claiming full coverage.
- [x] **Computer-keyboard play extended to lesson screens**: factored
      the MIDI tab's key-mapping/listener (item 28) out of `js/midi.js`
      into a new shared `js/computer-keys.js` (`registerComputerKeyboardTarget()`),
      so Lesson 1's keyboard calls the exact same mapping function
      instead of a second implementation. A single shared document-level
      listener routes to whichever registered keyboard is currently
      visible (`offsetParent !== null`), so multiple tabs/screens can
      each render their own keyboard without conflicting.
- [x] **Touch tap confirmed already working** on lesson screens (not
      just assumed) — `keyboard.js`'s shared pointerdown/pointerup
      handling covers mouse and touch with no extra code; verified live
      at a 375x812 mobile viewport.
- [x] **Typing-elsewhere guard carried over**: the shared listener
      checks `document.activeElement` for INPUT/TEXTAREA/SELECT before
      intercepting any key, exactly like the MIDI tab's original guard.
      Verified live: focusing a text input and pressing "W" left the
      keyboard's highlight state completely unchanged.
- [x] A small optional hint line ("No piano handy? ... home row / top
      row play too") added to Lesson 1's find-G and chord-teach screens
      so the feature is discoverable without cluttering the main flow.

Verified live: pressing "Q" on a lesson screen (not the MIDI tab)
correctly highlighted MIDI 60 as a right-hand note using the identical
mapping; Back on the "slowdown" step restored the teaser step's exact
original content; touch tap worked at mobile width. Zero new console
errors beyond the known sandbox-only service-worker noise.

## 2026-10-05 update: "Support Hayden Keys" placeholder + iOS submission re-review (item 43)

- [x] **Added a footer "Support Hayden Keys" link**, placed with the
      existing About/Privacy/README footer links. Genuinely marked as
      not wired up yet, not silently broken: `data-stripe-link-pending="true"`,
      a dashed-underline style, and a clear "not wired up to a real
      payment page yet" message if clicked — Sid is creating the actual
      Stripe Payment Link himself; the href and `target="_blank" rel="noopener"`
      are left as one-line code comments for whoever swaps in the real
      URL once he has it.
- [x] **iOS re-review, not a redo**: confirmed the App Store icon and
      launch screen are still current (both were last regenerated in
      the item 37 commit, which is also the most recent mascot change —
      nothing stale). Confirmed `ios/APP_STORE_LISTING.md`'s song/lesson
      counts and feature list still match the real current app (103
      songs, 101 lessons, MIDI tab and upload-your-own-recording both
      mentioned) — no stale tagline or feature references found.
- [x] **A real gap found and fixed, not just reviewed**: `www/` (the
      directory Capacitor actually bundles for the native app) only had
      symlinks for the files that existed when it was first scaffolded.
      `reference.html` (item 38) and `privacy.html` were missing their
      own symlinks entirely — tapping the in-lesson "Curious about all
      the keys and chords?" link would have 404'd inside the native iOS
      app specifically, even though it worked fine on the web (the web
      serves from the repo root directly, not through `www/`). Fixed by
      adding `www/reference.html -> ../reference.html` and
      `www/privacy.html -> ../privacy.html`; confirmed both now land in
      `ios/App/App/public/` after `npx cap sync ios`.
- [x] `npx cap sync ios` re-run clean after all changes through item 42.

Verified live: Support link renders clearly in the footer, clicking it
shows a plain "not wired up yet" message and does not navigate away or
error; `npx cap sync ios` output shows a clean sync with no warnings;
`ios/App/App/public/reference.html` and `privacy.html` confirmed
present after the fix. Zero new console errors beyond the known
sandbox-only service-worker noise.

## 2026-10-05 update: song-card display bug, upload tile, and upload playback fixes (item 44)

- [x] **Real display bug found and fixed**: a handful of songs stored a
      prose caveat ("insufficient agreement for a simple chart — see
      notes") as a literal entry in their `chords` array, meant for the
      notes field, not a chord chip — so Discover's cards rendered that
      whole sentence as if it were the chord list (the exact bug in
      Sid's screenshot of Still D.R.E./Someday). Fixed generally in
      `js/discover.js` with a `chordsDisplay()` helper that filters out
      any placeholder/prose string before joining, falling back to a
      plain "Chords: still being verified — see details" when nothing
      real is left — fixes this for all 13 affected songs, not just the
      two screenshotted.
- [x] **"Someday" (Michael Learns to Rock) re-researched and fixed for
      real**: the earlier "insufficient data" tag was from a search that
      returned other same-titled songs instead. Found real chord/tab
      data this pass — Bm-G-D-A repeating, Em later — cross-checked
      across two independent tab sources (Ultimate Guitar, Chordu), now
      `confidence: "confirmed"` with real chords in `js/songs-data.js`.
- [x] **"Still D.R.E." re-checked, genuinely stays disputed**: fresh
      research found the same real disagreement as before (A minor vs.
      C major vs. G major readings) — several "how to play on piano"
      results sharing identical text turned out to be the same article
      mirrored across different domains, not independent corroboration.
      Notes updated to explain this explicitly rather than picking an
      answer arbitrarily; still honestly `needs-verification`.
- [x] **"+ Upload any song" tile added** at the end of Discover's song
      grid, styled to match the existing cards (dashed border, "+"),
      clicking it scrolls to and focuses the existing upload banner —
      verified live.
- [x] **Upload playback rebuilt** (`renderTranscribedPlayback()`, now
      shared from `js/transcribe.js` and used by both Discover's and
      Practice's upload flows, replacing two near-duplicate "Play it +
      one highlighted key" implementations): now renders the same
      falling-notes highway (`note-highway.js`) the curated lesson/
      song-mastery flow uses, plus a real 0.5x/0.75x/1x speed picker
      (same values and re-scheduling approach as Practice's Follow
      Along). Verified live with a synthetic 2-note test clip (built
      in-browser via a MediaStream-free WAV blob + DataTransfer, since
      this environment can't drive a native file-picker dialog):
      detected exactly 2 notes, highway rendered two falling blocks,
      speed buttons switch and stay highlighted correctly.
- [x] **The real cause of "6233 notes for one song" investigated and
      fixed, not just styled around**: `transcribe.js` was calling
      basic-pitch's `outputToNotesPoly` with `onsetThresh`/`frameThresh`
      loosened to 0.25/0.25 — the library's own real defaults (read
      directly from its vendored source) are 0.5/0.3. The looser
      thresholds make the detector far more sensitive to noise/harmonic
      blips. Reverted to the library's real defaults, and added a
      `cleanupNotes()` post-filter that merges same-pitch notes
      separated by <30ms gaps (a known wobble artifact) and drops
      anything still shorter than 60ms. Logged both raw and
      post-cleanup counts to the console for anyone who wants to
      sanity-check the real reduction on an actual recording.

Verified live: Someday's card shows real chords and the "Start
learning" button (the existing song-detail/lesson entry point, reused
rather than inventing a new one); Still D.R.E.'s card shows the honest
fallback message instead of a broken sentence; the upload tile renders
and correctly scrolls/focuses the upload banner; a synthetic test
upload produced a clean 2-note falling-notes playback with working
speed controls. Zero new console errors beyond the known sandbox-only
service-worker noise.

## 2026-10-05 update: optional drum beat + real sampled-piano timbre (item 45)

- [x] **Checked the Dawsons sibling project first, per the instruction**:
      `website/js/synth.js`'s `DRUM_VOICES` (procedural kick/snare/hihat
      DSP, no samples) adapted cleanly as live-triggered Web Audio nodes
      in a new `js/drums.js` — reused the actual synthesis approach
      (pitch-dropping sine for kick, filtered noise for snare/hihat),
      re-expressed for real-time triggering instead of Dawsons'
      offline-buffer-write usage. `website/js/dj-mixer.js` didn't have
      drum-pattern logic (it's a DJ-deck crossfader/EQ module) and
      wasn't a fit — not forced in.
- [x] **Drum toggle added to Practice's Follow Along view**, next to
      the existing Speed control, default off. Driven by the same
      `currentTime()`/`chordDuration()` clock the highway/keyboard
      already use (one bar = 4 beats: kick on beat 1, snare on beat 3,
      hi-hat every beat) — speed-aware and can't drift out of sync with
      the falling notes since there's no separate scheduling clock.
      Verified live: toggle switches "Beat: Off" -> "Beat: On" with
      distinct styling.
- [x] **Real sampled-piano timbre added** (`js/piano-sample.js` +
      vendored `js/vendor/smplr-1.1.0.mjs`, MIT, the exact same
      already-vetted library + `SplendidGrandPiano` sample set already
      in production in the Dawsons project — not re-researched,
      directly reused). Wired into `keyboard.js`'s shared `playTone()`,
      so every caller across the whole app (lessons, Practice's Follow
      Along, uploaded-song playback) gets the richer timbre automatically
      with zero caller-side changes, once the sample set finishes
      loading. Strictly a progressive enhancement: loads lazily/async,
      and falls back to the original oscillator synth with zero errors
      if loading fails or the browser is offline.
- [x] **Honest disclosure of the real new network dependency**: unlike
      the library code (vendored, no network needed), the actual piano
      sample AUDIO files stream from smplr's own public sample host
      (`smpldsnds.github.io`) on first use. Documented in both
      `THIRD_PARTY_NOTICES.md` and `privacy.html`, same standard as the
      iTunes album-art lookup (item 25) — this app is no longer
      zero-network-request once this feature is used, and says so
      plainly.
- [x] **Verified it's not a mock**: loaded the real sampled piano in a
      live browser (confirmed the actual network fetch to
      `smpldsnds.github.io` succeeded), then called `playTone(60)` and
      confirmed it plays with zero console errors beyond the known
      sandbox-only service-worker noise.

Honest scope note: the drum toggle only exists in Practice's Follow
Along mode (the one Sid screenshotted) — Ear Check and Camera Overlay
modes, and the curated lesson screens' own chord-teaching playback,
were not wired up with a beat layer this pass.

## 2026-10-05 update: new lesson — touch, dynamics, rubato, legato (item 46)

- [x] **New lesson added**: `lesson-touch` ("Touch matters, not just
      which keys"), inserted into `THEORY_LESSONS` in `js/lessons-data.js`
      right after Lesson 7 (inversions) and before Lesson 8 (7th
      chords) — Lesson 7 itself was already a different, full topic, so
      this is a new lesson slotted in rather than crammed into an
      existing one. Display position/roadmap numbering is purely
      array-index-based in this codebase (confirmed by reading
      `timelineHtml()`), so inserting anywhere in the array is safe and
      doesn't require renumbering any other lesson's literal `id`.
- [x] **Covers velocity, rubato, and legato**, each introduced casually
      with a plain-English translation first (e.g. "rubato... literally
      means 'robbed time'... slowing down slightly right at a moment
      that matters"), same pattern as how "1-5-6-4" was introduced, not
      dense jargon. Added one extra short tip (accenting beat 1 of a
      progression) per the "1-2 more if they fit" suggestion, without
      overloading the lesson.
- [x] **"Make You Feel My Love" (Adele) used as the worked example**,
      confirmed still in the library before writing the lesson. Claims
      kept deliberately general and defensible (soft verses building to
      a more intense emotional peak, legato phrasing, slight rubato) —
      explicitly NOT inventing bar-by-bar dynamic markings for one
      specific recording nobody here has transcribed; the lesson says
      this limitation out loud rather than presenting invented specifics
      as fact.
- [x] **Real Back support added**, same lightweight history-stack
      pattern as the shared "Master: X" template (item 42) — verified
      live: Next -> Next (now on the rubato step) -> Back correctly
      restored the velocity step's exact original content.
- [x] **Lesson count/numbering double-checked, not assumed correct**:
      `TOTAL_LESSON_COUNT` went from 101 to 103, not 101 to 102 as a
      naive single-insertion guess might assume — verified why: the
      second +1 is "Master: Someday" now being auto-generated, because
      item 44 upgraded Someday's `confidence` from `needs-verification`
      to `confirmed` with real parseable chords (auto-generated
      song-mastery lessons are explicitly filtered to
      `confidence === "confirmed"` songs only). Confirmed zero duplicate
      lesson IDs in the final `LESSONS` array. Verified live: roadmap
      shows "37 of 103 done" with `lesson-touch` correctly positioned
      right after "The jazz trick"/"Train your ear" style early lessons
      and before the Lesson 8 song-mastery lessons.

Verified live in a real browser: the lesson's full intro -> velocity ->
rubato -> legato -> worked example -> done flow reads naturally, Back
genuinely restores previous step content, roadmap numbering/count is
internally consistent. Zero new console errors beyond the known
sandbox-only service-worker noise.

## 2026-10-05 update: "Can you guess the chord?" ear-training quiz (item 47)

- [x] **New lesson `lesson-chordquiz` added at the real end of the
      Intermediate tier**: appended to `intermediateRemainingLessons`
      (not inserted arbitrarily), so `insertAfter(theoryRest,
      "lesson-30", intermediateRemainingLessons)` places it immediately
      after every Intermediate-tier song-mastery lesson and before
      Lesson 31 (the Canon in D capstone arc) continues — verified live
      by position: lands right after "Master: My Love Mine All Mine."
- [x] **Reuses real already-taught chords only**: the quiz pool is
      `LESSON2_DEGREES` (G, Am, Bm, C, D, Em — Lesson 2's real diatonic
      data, filtering out the diminished vii), not new invented chords.
      Distractors are 3 other real chords from that same pool, a
      genuine same-key ear-training challenge rather than a random
      unrelated guess.
- [x] **5 rounds, real audio, real feedback**: each round plays the
      chord via the existing `playChord()` (the same shared audio path
      every other chord sound in the app uses), shows 4 multiple-choice
      buttons, and a "Play it again" replay button. Verified live, both
      directions: an incorrect guess shows the picked button in red,
      the real answer in green, and "Not quite — that was X, not Y";
      a correct guess shows green and "Correct — that was X" plus a
      short confirmation tone. A results screen at the end shows the
      real score ("1 of 5 by ear" in this test run) with encouraging,
      non-judgmental framing either way.
- [x] **Lesson numbering/tier boundary re-verified, not assumed safe**:
      `TOTAL_LESSON_COUNT` is now 104 (up from 103 after item 46);
      confirmed zero duplicate lesson IDs; confirmed via direct array
      inspection that `lesson-chordquiz` sits between the last
      Intermediate song lesson and `lesson-31`, matching "end of
      Intermediate, before Advanced" — this app has had real
      lesson-numbering bugs before (see the item 36 audit), so this was
      checked directly rather than assumed from the code's intent.

Verified live in a real browser: played through all 5 rounds (one
deliberately wrong, one correct, confirming both feedback states
render correctly), reached the results screen, roadmap showed "92 of
104 done" with the quiz correctly positioned. Zero new console errors
beyond the known sandbox-only service-worker noise.

## 2026-10-05 update: "Play what you hear" ear-training practice mode (item 48)

- [x] **New, separate practice feature** (distinct from item 47's
      in-lesson multiple-choice quiz) added as its own section inside
      the existing Practice tab, right after the upload section — easy
      to find without being jammed into the fixed 100+-lesson sequence,
      per the explicit instruction that this is a drill/practice mode,
      not a graded lesson.
- [x] **Song pool pulled from the real library**: the first 15 songs
      from `ONE_FIVE_SIX_FOUR_SONGS` (`js/songs-data.js`) — genuinely
      simple, well-known progressions, not an arbitrary or difficult
      pick, per the instruction to start with reasonable ear-training
      difficulty.
- [x] **Reuses the existing chord-progression audio path**: "Play clip"
      calls the same `playChord()`/`chordSymbolToMidi()` every lesson
      already uses to sound out a song's real chords in sequence — no
      second audio implementation. Replayable as many times as wanted
      (just re-triggers the same function, no play-once lockout).
      Verified live: clicking Play clip produces zero console errors.
- [x] **"Reveal chords" shows the real answer**, pulled directly from
      the song's own verified data (title, artist, chord list, degree
      sequence) — verified live: revealed "Love Story by Taylor Swift:
      D - A - Bm - G (I - V - vi - IV). How close did you get?"
      matching the real song data exactly, not a placeholder.
- [x] No sheet music, no chord names, and no falling notes are shown
      before reveal — genuinely ear-first, per the spec.

Verified live in a real browser: song picker populated with real
titles/artists, Play clip triggers real chord audio with zero console
errors, Reveal chords displays the correct real chord data for the
selected song. Zero new console errors beyond the known sandbox-only
service-worker noise.

## 2026-10-05 update: four real first-lesson usability bugs, from Sid actually using the app (item 50)

- [x] **Computer-keyboard mapping redesigned** (`js/computer-keys.js`):
      the real bug was that the old RIGHT_KEYS (top row, 12 keys,
      MIDI 60-71) didn't reach high enough for Lesson 1's own G chord
      (which needs D5/MIDI 74) — a real, reproducible "ran out of keys
      mid-chord" bug, not a vague complaint. Redesigned to QWERTY row
      -> LEFT hand (10 keys, MIDI 60-69/C4-A4) and ASDF row -> RIGHT
      hand (9 keys, MIDI 70-78/A#4-F#5), chosen so ASDF (the real
      touch-typing home row) handles the hand doing more chord-finding
      work. Verified live: every note in the G-D-Em-C progression
      (MIDI 60-74) now falls inside the combined 60-78 range, and
      pressing the actual mapped keys for the G chord (i/s/g) correctly
      highlighted all 3 notes with the right hand coloring.
- [x] **Real step-ordering bug fixed, not just reworded**: the teaser
      step's closing button literally said "Let's start with G" but
      clicking it led to the generic "what's a chord" explainer, not G
      — exactly the jump Sid reported. Fixed by keeping the teaser's
      promise generic ("Okay, show me how") and moving the "let's find
      G" framing to the button that actually leads into the find-G
      step.
- [x] **Middle C landmark rebuilt to be genuinely self-contained and
      physical**, not just described in text: Get Started's calibration
      screen (`js/calibration.js`) now highlights the actual 2-black-key
      landmark (MIDI 61 and 63) on the keyboard alongside Middle C
      itself, not just Middle C alone — so the learner sees exactly
      which black-key pair to look for, the same way the text describes
      it. Verified live via screenshot: the C key and both adjacent
      black keys are all visibly highlighted together.
- [x] **Finger placement taught for the first time**: a new "fingers"
      step inserted into Lesson 1 between the chord explainer and
      finding G, teaching the standard five-finger position (thumb = 1
      on both hands, right hand C(1)-D(2)-E(3)-F(4)-G(5) ascending, left
      hand mirrored descending from the octave below) with real
      per-key finger-number badges on both hands shown simultaneously.
      Lesson 1's keyboard range widened from 55-79 to 41-79 so the
      left-hand mirror position (down to F3) actually renders instead
      of silently falling outside the keyboard's range.
- [x] **Re-read the whole Get Started -> Lesson 1 sequence end to end
      as a first-time user**, per Sid's explicit instruction, to catch
      anything beyond the 4 named bugs — the finger-placement and
      step-ordering fixes above both came from that full re-read, not
      just the literal bullet points.

Verified live in a real browser, start to finish: Get Started's Middle
C landmark is now visually findable from the instructions alone; the
teaser -> slowdown -> fingers -> find-G -> teach sequence reads
logically with no promise/payoff mismatch; the computer-keyboard
mapping was proven (not just reasoned about) to cover the entire
G-D-Em-C progression using real simulated key presses. Zero new console
errors beyond the known sandbox-only service-worker noise.

## 2026-10-05 update: distinguish scale-degree numbers from keyboard-location counting (item 51)

- [x] **Real pedagogical conflation fixed**: Sid caught that "G=1" (its
      scale degree, counted from the song's key/tonic) and "count 5
      white keys to find G" (a physical keyboard-location count from
      Middle C) use overlapping digits for two genuinely unrelated
      concepts, with nothing in the lesson ever distinguishing them.
      Added a one-time clarification in Lesson 1's `runLesson1()`,
      shown only the first time a scale-degree number appears right
      after physical counting was just used (G's teach step,
      `teachIdx === 0`) — explicitly contrasting "that counting was
      about location... this numbering is about position in the SONG."
      Verified live: renders exactly once on chord 1 (G), confirmed via
      a second check that it does NOT repeat on chord 2 (D), so it
      clarifies without bloating the lesson.

Verified live in a real browser: the clarification text appears
clearly on G's teach screen immediately after both numbers ("5 white
keys" and the big "1") have been shown, reads naturally in the
mascot's casual voice, and does not repeat on later chords. Zero new
console errors beyond the known sandbox-only service-worker noise.

## 2026-10-05 update: explain "key" and why numbers beat letters, kid-level (item 52)

- [x] **New step added to Lesson 1** (`step: "key-and-numbers"`,
      between the teaser and the chord-definition "slowdown" step) —
      checked first whether "key" (the musical sense) had ever actually
      been defined plainly anywhere in the app before this: it hadn't,
      it was just used casually starting in the teaser's own line ("the
      same numbers work in any key").
- [x] **"Key" explained with the home-base analogy**, explicitly
      flagging the word collision with physical piano keys, close to
      verbatim to Sid's suggested wording: "Every song has a 'home'
      note... We call that G's 'key'... that's a totally different
      'key' from the piano keys you press with your fingers. Same
      word, two different things — sorry about that!"
- [x] **Numbers-vs-letters explained with the "dance moves" analogy**:
      same pattern starting from G is G-D-Em-C, starting from C
      becomes C-G-Am-F — "different letters, but it's still the same
      dance moves, just done in a different spot... Learn the
      number-dance once, and you can spot it in ANY song, in ANY key."
- [x] **Both placed at the exact first point of confusion**, same
      pattern as item 51's fix: right after the teaser is the first
      place "key" and "1-5-6-4" are both used, so the explanation lands
      immediately, not buried pages later or bolted onto an unrelated
      screen.

Verified live in a real browser from a freshly cleared localStorage:
the new step renders both explanations clearly between the teaser and
the "let's slow down" chord-definition screen, Back/Next both work,
and the sequence correctly continues into the existing fingers/find-G
flow afterward. Zero new console errors beyond the known sandbox-only
service-worker noise.

## 2026-10-05 update: white/black key basics + a fun pedal bonus lesson (item 53)

- [x] **White/black key explanation added to Get Started**, right
      before the black-key-group landmark teaching (same screen, same
      spirit as the item 50 Middle-C/finger fixes) — checked first
      whether this had ever been plainly taught: it hadn't, the app
      used "white key"/"black keys" constantly without ever defining
      them. Kept simple: white keys = the musical alphabet (A-G,
      repeating), black keys = the notes "in between," explicitly tied
      to WHY they're grouped in 2s/3s (so the repeating landmark is
      visible/feelable) rather than teaching sharp/flat naming rules.
      The visual is the real piano-key rendering already shown above
      the text (keyboard.js's existing white/black key layout) — no
      extra highlighting needed since the shapes/colors are already
      genuinely distinct.
- [x] **New fun bonus lesson added**: `lesson-pedals` ("Pedals! (just
      for fun)"), appended to the end of the Intermediate tier right
      after the chord-recognition quiz (item 47), landing before
      Advanced content begins, same placement pattern. Explicitly
      framed as "just for fun," not rigorous, not gating anything —
      completing it is a normal lesson-complete call like any other,
      no special test/pass-fail mechanic.
- [x] **Real, audible before/after**: explains the sustain pedal (holds
      notes ringing after fingers lift) as the one most people touch,
      briefly mentions soft/sostenuto pedals without dwelling on them.
      "Without pedal" plays a 4-note arpeggio with short, non-overlapping
      note durations (0.21s each); "with pedal" plays the exact same
      notes with long, overlapping durations (1.225s each) — genuinely
      different audio, not a fake toggle, reusing `keyboard.js`'s shared
      `playTone()` (which also means it automatically benefits from item
      45's sampled-piano upgrade once that's loaded, no extra wiring
      needed). Honestly labeled as "not a real pedal simulation" rather
      than overclaiming physical accuracy.

Verified live in a real browser: the white/black-key explanation
renders clearly on Get Started before the landmark teaching; the pedal
lesson lands correctly in the roadmap at the end of Intermediate;
clicking both "Without the pedal" and "With the pedal" triggers
playback with zero console errors beyond the known sandbox-only
service-worker noise.

## 2026-10-05 update: keep both iOS orientations, make the keyboard actually usable in portrait (item 54)

**Superseded by item 55 below**: Sid's final call reversed this —
the app is now locked to landscape-only everywhere, and the portrait
scroll workaround this section describes was removed as dead code.
Left here for the historical record of what was tried and why, not as
a description of current behavior.

- [x] **`ios/App/App/Info.plist` left untouched** — both portrait and
      landscape stay enabled for iPhone, per Sid's correction (an
      earlier instruction to lock to landscape-only was retracted
      before any Info.plist edit was made).
- [x] **Real portrait usability bug found and fixed**: verified at an
      actual 375x812 viewport that the keyboard's existing "scale keys
      down to fit the viewport" approach made individual keys too thin
      to tell apart or tap — confirmed visually via screenshot, not
      assumed.
- [x] **Fixed with a portrait-specific scroll, not a redesign**: a new
      `@media (orientation: portrait) and (max-width: 480px)` rule
      gives `.hk-keyboard-wrap`/`.hk-highway-wrap` a legible fixed
      `min-width: 640px` and makes their real parent panels
      (`.hk-lesson-player`, `.hk-practice`, `.hk-calibration`,
      `.hk-midi`) horizontally scrollable — landscape at any phone
      width is completely untouched (confirmed live: `overflow-x` stays
      `visible` and `scrollWidth === clientWidth` at 812x375, zero
      difference from before this change).
- [x] **Real DOM-structure bug caught while implementing this**:
      `keyboard.js`'s `renderKeyboard()` adds the `.hk-keyboard` class
      onto the SAME element the caller already marked
      `.hk-keyboard-wrap` — not a nested child. A single element can't
      both scroll its own overflow and be the oversized content at the
      same time, so the scroll container has to be each context's real
      parent panel instead. Caught this by checking actual rendered
      widths in the browser (`getBoundingClientRect()`), not just
      reading the CSS.
- [x] **No native rotation-triggered state loss**: this is a pure CSS/
      viewport-driven responsive layout (no JS listens for an
      orientation-change event or reloads anything), so rotating the
      device mid-lesson/mid-playback doesn't reset progress or stop
      audio — confirmed by reading the code path, not assumed.

Verified live by resizing the same page between 375x812 (portrait) and
812x375 (landscape): portrait now renders legibly wide piano keys with
a working horizontal scroll (confirmed via `scrollWidth`/`clientWidth`
and a visual before/after screenshot); landscape is provably unchanged
from its pre-item-54 behavior. Honest scope note, given a tight time
budget: scrolling the panel horizontally also scrolls the lesson text
above the keyboard along with it (simplest fix available without a
deeper DOM restructure) — functional, not polished; a future pass
could give the keyboard its own independent scroll region if that
rougher edge matters later. Zero new console errors beyond the known
sandbox-only service-worker noise.

## 2026-10-05 update: final orientation call — landscape-only, polished (item 55)

- [x] **Final reversal applied**: `ios/App/App/Info.plist` now locks
      both iPhone and iPad to landscape only (`UIInterfaceOrientationLandscapeLeft`/
      `Right` only — portrait and portrait-upside-down removed from
      both orientation arrays).
- [x] **Item 54's portrait workaround removed as dead code**: the
      portrait horizontal-scroll media query is gone from
      `css/style.css`, since the native app can no longer be rotated
      into portrait at all.
- [x] **Plain web version handled honestly**: the web can't force
      orientation the way the native wrapper can, so a new
      `.hk-rotate-prompt` (in `index.html`, shown only via a
      `(orientation: portrait) and (max-width: 700px)` media query —
      never on desktop or landscape) replaces the entire page with a
      friendly "Rotate your phone" message instead of showing a
      cramped layout. Verified live via screenshot at 375x812.
- [x] **Landscape vertical-space polish**: found via actual screenshot
      at 812x375 that the full-size header/logo/tagline alone pushed
      the falling-notes highway and keyboard below the fold before any
      music content was visible at all — arguably the real "not
      polished" issue at phone landscape heights. Added a
      `(orientation: landscape) and (max-height: 500px)` rule that
      compacts the header/logo/tagline/tabs and gives the highway a
      touch more height (there's spare width in landscape), so the
      most visually important part of the app is immediately visible.
- [x] **Real hand-color inconsistency found and fixed**: `note-highway.js`'s
      falling blocks were still hardcoded to an old amber/light-purple
      pair from before item 30 repainted every other hand-colored
      element (the keyboard itself) to pastel pink/light-blue — the
      highway and the keyboard beneath it had silently disagreed on
      hand colors ever since. Fixed by reading the live
      `--hk-accent-2-soft`/`--hk-accent-soft` CSS custom properties
      instead of a second hardcoded pair, so they can't drift apart
      again.
- [x] **Uploaded-song playback (item 44) brought in line too**: its
      keyboard highlight was using a single generic color during
      playback even though the highway above it already computes a
      real left/right hand split per note — switched to
      `highlightHands()` with that same split so the keyboard and
      highway agree. Checked the ear-training quiz (item 47) and
      "play what you hear" (item 48) too: the quiz highlights one
      chord as a single unit (not two-handed content, left as-is
      correctly), and the practice mode shows no visual at all by
      design (audio-only, "no falling notes" is the whole point) — so
      neither needed a hand-color fix.

Verified live: landscape at 812x375 shows a compact header with the
highway (now 150px tall) and keyboard both visible with minimal
scrolling, and reading `--hk-accent-2-soft`/`--hk-accent-soft` live
confirms the highway's colors now match the keyboard's pink/light-blue
exactly; portrait at 375x812 shows the full-screen rotate prompt
instead of a cramped layout; a plain landscape resize back to
812x375/900x400 confirms the prompt correctly does not appear outside
portrait. Zero new console errors beyond the known sandbox-only
service-worker noise. `node --check` passes on every touched JS file.

## 2026-10-05 update: handoff TODOs, full review fixes, iOS submission sweep, MIDI redesign (item 56)

**Handoff TODOs, all done:**
- **Back on every lesson.** `withStepBack()` in `js/lessons-ui.js` wraps
  the counter-driven lessons' `renderStep()` (34 lessons/templates plus
  Choose-your-song): each change of `step`/`idx`/`hits` pushes the
  previous state; Back restores it, and detaches any quiz key handler so
  it can't fire on the earlier screen. No Back on a final "done" screen.
  Verified in-browser across 19 lessons (forward 3, back 2, lands on the
  right step), plus a quiz step (Lesson 4) and both jazz loops.
- **Upload playback** (`renderTranscribedPlayback()`, `js/transcribe.js`):
  seek bar with clock (drag to scrub, resumes on release); every lit key
  shows its note name (`midiToName()`) plus a "Now playing" readout;
  opt-in **Easy** view (`simplifyToBlocks()`: 1-second windows, ≤4 notes
  per block, lowest = left hand, broken/repeated chords merged into one
  held block). Detailed stays the default.

**Review fixes (bugs found reading the whole project):**
- Practice was re-created on every song opened from Discover/Saved
  without stopping the old copy — ghost chords, mic/camera left on. Now
  one live instance; leaving the Practice tab stops audio/mic/camera.
- Practice: Pause restarted from the last Play press; changing speed
  mid-song jumped back; Camera Overlay never advanced (now Prev/Next
  chord); Ear Check skipped through repeated same-root chords and got
  stuck on prose "chords"; prose chord entries no longer become steps.
- Mic/camera leaks: calibration (closing the panel, double-tapping
  Start), lesson tuner widgets left behind by Next/Back, camera granted
  after leaving the mode, Recalibrate stacking draw loops. Mic
  AudioContext is now resumed (could read silence on iOS).
- Jazz backing loops kept playing after leaving the lesson / tab.
- Streak and daily goal used UTC dates (rolled over mid-afternoon in the
  US); streak now shows 0 once it's actually broken.
- Discover: reopening a completed song downgraded it to "started"
  (could re-lock a tier); album art fired ~100 requests at once (now
  lazy + de-duplicated); unescaped attribute values.
- Service worker: network-first (was cache-first, so returning visitors
  saw the previous deploy), cache bumped to v2, every shell file listed.
- Privacy policy / mic usage string corrected (three mic uses; piano
  samples download automatically; album art images from Apple's
  servers; iOS data-deletion note).

**iOS submission sweep** — see `ios/SUBMISSION_CHECKLIST.md` "Item 56":
`UIRequiresFullScreen` (iPad landscape-only upload blocker), removed the
unused `@capacitor/camera` plugin (photo-library purpose-string
rejection), `arm64`, `ITSAppUsesNonExemptEncryption`, an app
`PrivacyInfo.xcprivacy`, Support link hidden in-app, .md links → GitHub,
safe-area insets, subtitle trimmed to fit 30 chars, keywords
de-duplicated. `xcodebuild` Debug + Release both succeed.

**MIDI tab redesign** (Sid's report: the right hand sat directly under
the left, keys didn't feel like a piano). `js/computer-keys.js` now uses
a piano-shaped layout — white notes on one row, black notes on the row
above in the gaps — with octave shifting across all 88 keys (A0-C8):
- *Two hands* (default): left Z-M whites / S D G H J blacks (C3-B3, ↓/↑),
  right T–\ whites / 6 7 9 0 - blacks (C4-D5, ←/→). Hands sit
  bottom-left and top-right instead of stacked.
- *One hand*: GarageBand Musical Typing — A-' whites, W E T Y U O P
  blacks, Z/X octave.
Physical key codes, so Shift/Caps/other layouts don't break it. The MIDI
tab shows the whole 88-key piano with each hand's zone tinted and
labelled. Verified by simulated key presses (Z=C3, T=C4, \=D5, left
hand down to A0, one-hand up to C8).

### Honestly, what's not done
- Nothing was run on an iOS device or simulator (no runtime installed).
- Stripe link still needs Sid's Stripe account.
- Easy mode is a heuristic, not chord recognition — it can keep an odd
  passing note.

## 2026-10-05 update: upload accuracy, original-audio sync, backing instruments, beginner-clarity fixes (item 57)

**Upload transcription, measured.** Tested against synthesized recordings with known notes (melody, chord
progression, both together) and Sid's own "Fortnight" (Taylor Swift) file:
- basic-pitch itself was accurate (every real note's pitch right, onsets within ~10ms). The errors were in
  `cleanupNotes()`: it merged repeated same-pitch notes (Ode to Joy's "E E" became one long E) and passed
  through quiet overtones/blips. Rewritten: only pitch-wobble slivers are re-joined; overtones (+12/19/24/28
  semitones, under 60% of the louder note's amplitude, same onset) and short quiet blips are dropped.
  Results: melody 80%→100% of notes found with 0 false notes; chords 24%→9% false; mixed 40%→16% false.
- Fortnight (4 min): 1,872 notes in ~31s, every one in B major (7 pitch classes, zero outside), bass cycling
  F#→G#→E. 60% of notes are bass, the vocal line is only partly captured — a limit of transcribing a full
  band mix, stated honestly in the summary.
- Hands now split at Middle C (was the median note, which painted bass as right hand).

**"Where am I in the song?"** No lyrics (copyrighted; would need a license — same rule as before). Instead,
uploads now play the **original recording in sync** (default on; the media element is the clock, pitch kept at
slower speeds), with the piano re-play as a toggle.

**Backing instruments.** Uploads: 🥁 Beat at an estimated tempo (onset autocorrelation; 100/75 BPM correct on
the test clips, ~97 BPM for Fortnight). Practice: new 🎸 Bass toggle (chord root, low, beats 1 and 3) next to
the existing 🥁 Beat.

**Beginner-clarity audit fixes:**
- Wrong theory fixed: "F# is inside the Em chord" (3 places) — it's only in D.
- "Same 4 chords" claims → "same 1-5-6-4 pattern, letters change with the key" (teaser, Choose your song —
  which now lists each song's chords, Lesson 1 montage — which now shows each song's key and chords).
- Sharps/flats/half-steps explained at the first black key (Lesson 1's D chord) and in calibration;
  "m" = minor explained at Em; Roman numerals explained in the montage; "note G" vs "the G chord" spelled out.
- Every key of a lit chord shows its letter (G · B · D); Middle C has a permanent purple marker on every
  keyboard; finger-number badges no longer linger after the fingers step.
- Middle-C counting hints reworded ("the 5th white key, counting Middle C as 1") plus black-key landmarks;
  calibration's "25-key keyboard has one group" claim fixed; "octave" defined.
- Last Christmas explains its key (D) and pattern (1-6-2-5); song lessons show key + number pattern.
- Chord parser: m9, 9, maj9, 7b9, 7#9, 7b5, 7#5, 7sus4, 6/9 with its 9th, slash-chord bass (D/F#).
- My Funny Valentine voiced so the top key visibly walks C→B→Bb→A; ear training no longer lights the
  answer first (find it by ear, Higher/Lower hints, Show me); reference page shows sharp AND flat names;
  "named after its lowest note" → "named after its root"; cross-references by title, not stale numbers.

### Honestly, not changed
- Lesson 1's title "The 4 keys to play 100 songs" (Sid's own wording) still uses "keys" to mean chords —
  suggest "The 4 chords to play 100 songs".
- Lesson order unchanged: minor-key songs and 7th chords still appear before "Major or minor?" and the 7th-
  chord lessons (reordering would re-lock progress for existing users) — suggest moving "Major or minor?"
  right after Lesson 1.

## 2026-10-05 update: falling blocks everywhere, real chord Easy mode, song data audit, new advanced lessons (item 58)

- **Falling-notes bug fixed (affected Practice, uploads, everything).** `note-highway.js` computed each block's
  top/bottom the wrong way round, so every note — however long — was drawn as a 6px sliver. Blocks are now as
  tall as the note is long.
- **"Tetris" blocks in every lesson.** `lessonKeyboard()` adds a short highway above every lesson keyboard;
  whenever a lesson lights keys, matching blocks drop onto them. Song lessons get "▶ Play along (falling
  blocks)", a timed run-through with sound; new lessons use the same `playTimeline()`.
- **Uploads: three listening modes** — 🎵 Original song / 🎹 Piano only (recording muted) / 🎵+🎹 Piano + song.
- **Easy mode = real chords.** Recognizes the major/minor triad in each 2-beat window (24-triad template
  match, bass-root bonus, song-key tie-break for root+fifth moments) and shows it as a beginner shape: left-hand
  root + right-hand triad near Middle C, with the chord name. Tested: G-D-Em-C and an arpeggiated A-F#m-D-E clip
  recognized exactly; melody-over-chords 7/8; Fortnight → only B major's six chords (B C#m D#m E F# G#m).
- **Song data audit** (scripted: every song's chords re-derived against its stated key and number pattern):
  fixed Shake It Off (ii-IV-I, was "vi-IV-I"), One Dance (i-III-iv, was "v"), Don't Stop Believin' (all 8 loop
  chords), As It Was (teaching key G, not C), Love Story's final chorus (E-B-C#m-A — the A was missing),
  I'm Yours' full structure (was written in capo-4 G shapes under a "B major" label; transposed to B).
- **Timing.** Practice now gives each chord its real share of its section (`bars` / chords — e.g. 2 bars each in
  an 8-bar, 4-chord verse); it used to give every chord one equal slot. The default tempo is labelled honestly as
  a practice tempo (no verified per-song BPM data exists here); new 👆 Tap tempo matches a recording's real speed.
- **Curriculum:** Lesson 1 renamed "The 4 chords to play 100 songs"; "Major or minor?" moved to right after it;
  a finished lesson is never shown locked (so reordering can't re-lock progress); Middle C guide by keyboard size
  (88: 4th C from the left; 76/61/49: 3rd; 37/25: usually 2nd, octave buttons may shift it).
- **New lessons:** "Building speed: fast, relaxed fingers" (after Day 25: slow practice + metronome ladder,
  relaxed hand, rhythms/bursts, a five-finger drill at ♩ 60-120, daily routine, Hanon 1873 / Czerny Op. 299);
  "Beethoven: harmony vs. form" (Für Elise's i-V pull and G# leading tone, its A-B-A-C-A rondo, sonata form,
  motifs); "Bach: Prelude in C major" (WTC I, 1722 — bars 1-8 note-for-note, each bar playable in time).
  Catalog adds Bach's Prelude, Moonlight (1801) and Pathétique (1799) first movements.

## 2026-10-05 update: Middle C tuner, wait mode, sheet music, hands/looping, daily review (items 58-59)

- **Middle C sound match (Get Started).** The shared tuner widget (pitch.js) now works like a guitar tuner for
  "did I find the right key": a needle shows flat/sharp, the whole meter turns green once the target note holds
  steady (~0.35s, within ±40 cents so a slightly out-of-tune acoustic still counts), and wrong notes say how many
  keys away and which way, including octave mix-ups. Verified with generated tones (D4 → "2 keys too high — move
  LEFT"; C5 → "1 octave too high"; slightly flat C4 → green, auto-advance).
- **Input hub** (`input-hub.js`): on-screen taps, laptop keys, Web MIDI keyboards (Chromium only — not Safari/iOS)
  and the mic (single notes) all feed one note-on stream.
- **Practice engine** (`play-engine.js`): wait mode (blocks stop until you play the right notes; right/wrong keys
  flash), timed mode (±0.25s hit window, score + early/late), hands separately (the other hand is played for you,
  faded), bar-range looping, speed. Verified: wait mode 30/30 + 1 deliberate wrong key counted; timed 39/39 when
  every note is on time, 30/39 with the left hand skipped; left-hand-only loop of Bach bars 5-6 asked for exactly
  C+E then C+D and looped.
- **Grand-staff renderer** (`staff.js`): clefs, key/time signatures, heads, stems, flags, dots, ties, ledger lines,
  accidentals; current notes blue, finished grey. **Sheet data** (`sheet-data.js`) with real rhythm: Ode to Joy (RH
  melody + LH roots), Minuet in G RH bars 1-8 (3/4, F#), Bach Prelude bars 1-4 / 1-8.
- **New lessons:** Intermediate "Wait mode: the music waits for you" (Ode melody, mic-friendly; G-D-Em-C chords).
  Advanced: "Reading sheet music" (staff, treble E-G-B-D-F / F-A-C-E, bass G-B-D-F-A / A-C-E-G, Middle C ledger,
  landmarks, note values, time signatures, sharps/flats/key signatures, chords, 10-note reading quiz); "Sheet music:
  Ode to Joy / Minuet in G / Bach's Prelude"; "Hands separately & looping"; "Play in time: no waiting" (timed,
  no key hints — the harder mode).
- **2-minute daily review** (`daily-review.js`): items only from completed lessons (chords, finding notes, staff
  notes, chords by ear), Leitner spacing (1/2/4/7/14/30 days; misses come back the same day), counts toward the
  daily goal. Reachable from the lesson map and a banner on every lesson screen until done for the day.

## 2026-10-05 update: vendored piano samples, 81 more songs, Tom & Jerry, gamification, phone layout, screenshots (item 60)

- **Everything third-party now lives in the repo.** basic-pitch code + model weights were already vendored; now
  the piano SAMPLE AUDIO is too (`assets/piano-samples/`, 226 m4a files, Splendid Grand Piano — Steinway samples
  released into the public domain by Akai). The app loads only the velocity layer it plays (62 files, ~7 MB) from
  its own files: 0 third-party requests. Vendoring exposed a real bug: smplr 1.1.0 put sample names like "Mf D#0"
  in URLs unencoded, so every sharp-named sample 404'd (verified against the original host); now encoded.
  The only remaining third-party request is the iTunes album-art lookup (a live service, can't be vendored).
- **Songs: 103 → 184.** 12 easy (incl. two simplified Chet Baker pieces), 10 intermediate, 10 advanced (incl. Tom
  and Jerry's Hungarian Rhapsody No. 2 and a Strauss waltz), plus 50 optional **World songs** — 5 in each of
  French, Spanish, Portuguese (Brazil), Italian, German, Hindi, Japanese, Korean, Mandarin and Arabic, each
  checked against two chord sources (`js/world-songs.js`). `difficulty` field overrides the tier rule.
- **World songs are optional and skippable:** 11 lessons at the very end, never locked, never picked as "next
  lesson", labelled Optional, numbered separately.
- **Tom and Jerry's concert pieces** lesson: The Cat Concerto (Liszt's Hungarian Rhapsody No. 2 — credited to Jakob
  Gimpel, with historian Keith Scott attributing the recording to Calvin Jackson), Johann Mouse (Strauss waltzes,
  played by Gimpel; last Tom and Jerry Oscar), the lassan/friska home chords, and a waltz "oom-pah-pah" drill.
- **Gamification:** XP + 10 levels (Newcomer → Virtuoso) in the header; XP toasts; confetti on first completion;
  3 daily quests (+10 each, +20 for all); streak freezes (earned per 7-day milestone, cover one missed day);
  1-3 stars per practice result (best kept); live combo counter in wait/timed mode; review XP.
- **Phone landscape layout:** on ~440pt-tall screens the lesson text used to push the keyboard off-screen. Now
  the roadmap sidebar hides, buttons sit above, and the falling blocks + keyboard stay pinned at the bottom.
- **Regression:** every one of 156 lessons + the daily review opened and stepped through with 0 errors; all tabs
  render; new songs play in Practice; new-user flow (XP/quests/World lessons) verified.
- **App Store screenshots** in `ios/screenshots/` (7 per device, exact required sizes: iPhone 6.9" 2868×1320,
  iPad 13" 2752×2064), captured with `shoot.mjs` (headless Chrome) in the native look (Support link hidden).


## 2026-10-06 — any orientation, text size, zoom, iOS sound
- **Orientation:** no longer locked to landscape. The iOS app supports portrait and landscape (iPad: all four). The web "rotate your phone" blocker is replaced by a dismissible tip that fades after a few seconds.
- **Text size:** `-webkit-text-size-adjust: 100%` stops iOS from inflating text in landscape, which made everything look zoomed in.
- **Zoom:** pinch and double-tap zoom are disabled (`maximum-scale=1`, `touch-action: manipulation`). Zooming in over the keyboard could get stuck, because the keyboard captures touches, so you couldn't pinch back out.
- **Sound on iOS:**
  - The native app sets `AVAudioSession` to `.playback`, so it's audible with the ringer switch on silent.
  - The web app sets `navigator.audioSession.type = "playback"`.
  - The first touch unlocks Web Audio, so the first key press makes a sound.

## 2026-10-06 — falling-note celebrations, photos and videos in fun facts
- **Celebration:** finishing a lesson now drops tiny musical notes (♪ ♫ ♩ ♬) from the sky instead of confetti.
- **Photos:** 11 "Did you know?" facts show a photo of the person. They're freely licensed Wikimedia Commons images bundled in `assets/people/`, with author and licence under each photo and in THIRD_PARTY_NOTICES.
- **Videos:** 4 facts have click-to-load videos from official channels (Steinway & Sons, Deutsche Grammophon, Neuma Records). On the web they play from youtube-nocookie.com; in the iOS app they open in YouTube. The privacy policy is updated to match.
- **iOS:** build 2 (portrait, text size, zoom, sound) is on TestFlight. These latest changes need build 3 before submitting.

## 2026-10-07: Day 1 rebuilt as tiny lessons, plus the iOS sound/upload fix

### Simpler lessons ("too much text, I'm already lost")
Day 1 is now **13 tiny lessons**. Each lesson card has one short message, one thing to press, a 🔊 **Hear it** button, and a **Next lesson →** button once it's right. It works by tapping the screen, a MIDI keyboard or the microphone. Chord keys can be pressed together or one after another, which is easier on a phone.

| # | Lesson | What you do |
|---|---|---|
| 1 | Find middle C | Press middle C (the keyboard is centred on it; 👀 Show me helps) |
| 2 | Find G | Count C D E F G, press G |
| 3 | Your first chord: G | Press G · B · D |
| 4 | Another G? | Keys repeat: press a different G |
| 5 | Back to G | Middle C, then the G chord again |
| 6 | Chord 2: E minor | E · G · B ("a little sad") |
| 7 | Chord 3: C | C · E · G from middle C |
| 8 | Chord 4: D | D · F♯ · A (F♯ is the black key) |
| 9 | Why numbers? | G = 1, D = 5, Em = 6, C = 4; Hear it plays them with number badges |
| 10 | Boom! 4 chords | Play G → D → Em → C in a row |
| 11 | Soft and strong | Play G softly, then strongly (Soft/Strong demo buttons) |
| 12 | Make one key sing | Play C with the top key a bit harder (demo) |
| 13 | Another song | G → Em → C → D, the shape of songs like *Perfect* |

- The lesson keyboard is centred on middle C (C3 to E5) so "the 2 black keys in the middle" is unambiguous.
- Finishing Day 1 also completes the old long Lesson 1, so Today moves straight on to "Major or minor?". The old lesson stays in the Roadmap.
- "Get yourself a piano" and "Get Started" are optional pre-lessons (in the Roadmap). Today starts at "Find middle C".
- Day 1 steps celebrate with falling notes only; the fun-fact card waits until the end of Day 1.
- The piano can now play softer or louder (velocity), used by the Soft/Strong and "sing" demos.
- **Still to do:** apply the same one-message, one-action style to the lessons after Day 1. They're chat-style now, but still wordier than Day 1.

### Silent piano and failing upload inside the iOS app (found in the iOS Simulator)
- **Cause:** inside the app, fetch() of bundled files reported status 0 even though the file arrived. The piano library skips any sample whose status isn't 200, so it dropped all of them and played silence. The transcription model was rejected the same way.
- **Fix:** status-0 responses with content are treated as 200, and the app only switches from the synth to the sampled piano if samples actually loaded.
- **Verified in the simulator:**
  - Samples and model load with status 200.
  - The audio engine runs.
  - The upload test transcribes notes.
  - Tabs, buttons and keys respond to touch.
- **Not testable in the simulator:** rotation. The build allows all orientations.
- **TestFlight builds:** Hayden Keys builds 5 and 6, Jaxx Guitar build 4.

## 2026-10-07 (later): Days 2 and 3 as tiny lessons; playful chat style
- **Jargon alert card (Day 1, after the first chord):** "A key = one thing you press. A chord = 3 keys together. You just played the G chord!"
- **Day 2, words, happy and sad:**
  - Keys make notes (A–G repeat).
  - A song's key is its home chord (G → D → G).
  - Happy C major, and sad C minor (move one key down).
  - A minor.
  - "1 4 5 happy, 2 3 6 sad".
  - The same 4 chords in the key of C (C G Am F, like *Let It Be*).
  - Finishing Day 2 also completes the old Lessons 2 and 4.
- **Day 3, two hands and ears:**
  - Left hand low G.
  - Both hands.
  - The bass walking G D E C under the chords.
  - Two happy-or-sad listening quizzes.
  - A two-hand song.
  - Finishing Day 3 also completes the old two-hands preview and ear-training lessons.
- **Playful chat style:**
  - Hayden types for a moment ("…"), then the message pops in.
  - A wrong key gets a friendly "Oops! That's D 🙈 Try again!".
  - Success arrives as a colourful reply bubble while the panda hops.
  - Bold coloured keywords, and a big bouncy gradient Next button.
  - Each day ends with "Finish Day N 🏆".
- **Tested:** all 27 cards (Days 1–3) in a phone-sized browser, including wrong keys and quiz answers. No errors.
- **Next:** later lessons (from "Major or minor?" onward in the Roadmap) are still chat-style rather than tiny cards.

## 2026-10-07 (evening): clearer Day 1, swipeable popups, landscape fit
- **Day 1 now opens with "4 chords play over 100 songs… but first, let's get to know your piano":**
  - **Black keys in 2s and 3s:** colour-coded, then press one in a group of 2.
  - **Middle C on any piano:** every C is just left of the 2 black keys. On an 88-key piano it's the 4th C from the left; on smaller keyboards (61/76) usually the 3rd.
- **"Try it on your real piano too!" nudges:** after finding middle C and after the first G chord.
- **G key vs G chord:**
  - **Every key has a letter:** white keys labelled C–B.
  - **🚨 G key or G chord?:** press the G key, then the G chord.
  - **"In the key of G":** G is home, and we keep it simple with home = G and 4 chords.
- **The numbers:**
  - **G is home = 1.**
  - **Count to 5:** keys labelled 1G 2A 3B 4C 5D 6E, so D = 5, E = 6, C = 4.
  - **Same shape every time:** press · skip · press · skip · press, where only D uses a black key.
- **Popups:**
  - **Swipe up:** tips, fun facts and the new popup can all be swiped up to dismiss.
  - **New "Turn your phone sideways!" popup:** appears when a piano shows in portrait (once per session). It auto-hides after 7s or when you rotate.
- **Landscape phones:** the lesson fits on one screen, with title and Next lesson in the top bar, a short message, and a slim falling-notes strip over a full-height keyboard. Next is always visible, with no scrolling.
- **Tested:** all 34 Day 1–3 cards (phone portrait), the popup swipe, and the landscape fit (Next visible, page doesn't scroll).

## 2026-10-07 (night): Day 1 flows step by step; Back button; bigger keys
- **← Back button** in every lesson's top bar. It goes to the previous lesson in the course.
- **Day 1 reordered so each card follows from the last:** 4 chords fun fact (no keyboard yet) → find middle C → step left to G → build the G chord on G → G key vs G chord → letters repeat (find another G) → "key of G" = home is G → Em, C, D chords → numbers (G = 1, then count right: 4 C, 5 D, 6 E) → same shape every time → Boom, 4 chords → soft/strong → sing → another song.
- **Everything moves rightward from G:**
  - **G is now just left of middle C,** so counting 1–6 and all the chords (D, Em, C) sit to the right of G. Nothing jumps the other way anymore.
- **Middle C made simple:** the 2-black-key groups are highlighted pink, and middle C is the white key just left of the middle pair. A tip adds that on a real piano it's the C nearest the middle, often under the brand name.
- **Easier to press:**
  - **Bigger keys:** Day 1–2 cards show fewer keys (F3–C5), so each key is bigger, and the keyboard is taller in portrait.
  - **Phone tip on the first chord:** "Tricky on a phone? Tap the 3 keys one by one. The real practice is on your real piano 🎹". Taps one-by-one are accepted.
- **Real-piano nudges:** after middle C, the first G chord and the 4-chord loop.
- **Removed:** separate black-keys, any-size-piano, letters and "back to middle C" cards that broke the flow. Their content is folded into the cards above.
- **Tested:** all 30 Day 1–3 cards on a phone-sized screen, no errors.

## 2026-10-07: fact check, note numbers, upload improvements
- **Fact check, songs:**
  - **Automated checks across all 184 songs:** every chord is a real chord, the chords fit the stated key, the number patterns match the chords, and the 1-5-6-4 labels are true.
  - **Corrected:**
    - **Viva La Vida:** IV–V–I–vi, so C D G Em in G (was G D Em C).
    - **Just the Way You Are:** I–vi–IV–I, so C Am F C (was C G Am F).
    - **Hey Soul Sister:** E B C#m A (was an inconsistent Em7 C G D).
    - **Shallow:** verse Em D G, C G D (was G D Em C).
    - **Let It Be:** chorus second line C G F C (was F C F C).
    - **Perfect:** chorus Em C G D.
  - **Downgraded to "close version":** Can You Feel the Love Tonight and Mr. Brightside.
  - **Key labels:** 12 songs whose chords are written in an easier teaching key now say so, e.g. "G major (original recording in Ab major)", instead of showing the original key next to G chords.
- **Fact check, lessons:** every Day 1–3 card re-read. Fixed "1 4 5 happy" to say "in every major key".
- **New Day 2 card "A2, A3, C4?":** the letter is the key and the number is which group. Middle C = C4, and smaller numbers are further left. Press A3 then A2; the As and Cs are labelled with their numbers.
- **Upload:**
  - **Heading:** "Upload any song and we'll find the chords for you!" with a big 📂 Choose a song button.
  - **Play/Pause:** a big button above the piano.
  - **Note names:** a hint explains them (C4 = middle C, A3 = the A just left of it).
  - **"These songs use the same chords":** the heard chord loop is compared with every library song in any key, and tapping one opens the full song in Practice. It's a hint, not Shazam-style identification, which needs an online audio fingerprint service.
  - **Easy mode (just chords) is now the default,** next to Hard mode (every note). Easy mode follows the tempo (1 beat per chord on slow songs, 2 on fast), so it no longer merges chords. The test clip went from "2 chords" to the correct 4.
- **Upload disclaimer:** now small bracketed text under the button: "(Hayden Keys is for entertainment and learning only. We don't support copying songs from YouTube or other links without the artist's permission…)". Build 11.

## 2026-10-07: new panda, Shazam guessing, upload layout
- **New mascot:**
  - **The drawing:** Hayden the panda is redrawn as a flat, bold, logo-style character (like Duolingo's owl) in SVG (`js/panda.js`), crisp at any size.
  - **8 animated poses:** idle (bob + blink), wave, cheer (jumps with sparkles), think, oops (sweat drop), play (taps piano keys), sing (floating notes) and sleep (z z z). They respect reduced-motion.
  - **Where it's used:** header logo, Today, every lesson card (cheers on success, "oops" on a wrong key), chat lessons, About, Saved, Practice and MIDI.
  - **App icon and favicons:** regenerated from the new panda.
- **Upload layout:** Choose a song → big ▶ Play → falling chords on the piano. Everything else is in "⚙️ Customise" below the piano: seek bar, speed, Easy/Hard mode, sound, "Guess the song", same-chord songs, and the note-number hint. After processing, the page scrolls to Play.
- **🔎 Guess the song (Shazam):**
  - **Opt-in:** a button in Customise, iPhone/iPad app only.
  - **How it works:** a native plugin (`ios/App/App/SongRecognizerPlugin.swift`, registered in `HKBridgeViewController.swift`) fingerprints about 12 seconds with Apple's ShazamKit and shows "We think this is…", with **Open in Apple Music** (required by Apple when showing results) and **Learn the whole song** if it's in the library.
  - **Rules:** the Shazam logo isn't required. The privacy policy explains that only a fingerprint is sent to Apple.
  - **Owner action:** enable the **ShazamKit** App Service for `com.haydenkeys.app` (developer.apple.com → Identifiers → com.haydenkeys.app → App Services → ShazamKit → Save). Matching won't work until this is on.
  - **No slowdown:** it only runs when the button is pressed.
- **A2/A3/C4 card:** every letter has its own colour, the same in every group.

## 2026-10-07: intro screen, Today hero, lesson numbers, notch fix
- **Intro screen** every time the app opens:
  - Hayden waves (or cheers for new learners) with floating notes.
  - New learners get "Learn piano, one tiny step at a time" and **Start now ▶**.
  - Returning learners get "Welcome back!", a progress bar, "Lesson 6 of 173" and **Continue ▶**.
- **Picks up where you left off:** progress is saved on the device, and Today and the intro always open the next unfinished lesson, even days later.
- **Today hero card:** big panda, "LESSON 6 OF 173", lesson title, progress bar, "5 done · streak · level", and a bouncing **Start now / Continue** button. "Also today" lists the review and a song.
- **Lesson numbers:** every lesson's top bar shows a "6/173" counter.
- **Notch fix:** the header (and lesson top bar) sits below the iPhone notch / Dynamic Island, so the panda isn't cut off. The old rotate tip that covered it is removed; the sideways popup appears when a piano shows.
- **iOS build 13.**

## 2026-10-07: chat-style Day 1, middle C on any piano, Linger, Back fixed
- **WhatsApp-style chats on the wordy cards:** you tap the question, Hayden answers, then the action card and keyboard appear. Your bubbles are now a light purple.
  - **Lesson 1 intro:** "Welcome to Hayden Keys!" Then three spaced-out lines: 4 chords play over 100 of the most popular songs. They're G, D, Em and C (people often say "G A C D"). First, let's make sure your piano and this app agree where middle C is.
  - **Find middle C:**
    - **What is it:** the C nearest the middle of your piano.
    - **How to find it:** the white key just left of the 2 black keys.
    - **On different sizes:** the 40th key on an 88-key piano, the 33rd on 76 keys, the 25th on 61 keys.
  - **New "Key names: A, B, C… and A1, A2" card:**
    - **Letters:** white keys are letters A–G that repeat, numbered A0, A1, A2…, with the number going up at each C. So middle C is C4, the 40th key on a full 88-key piano.
    - **Black keys:** they're sharps and flats in groups of 2 and 3; press one in a group of 3.
  - **Also chat-style:** G key or G chord, "in the key of G", A2/A3/C4, and happy vs sad numbers.
- **"Linger" by The Cranberries:**
  - **As a lesson:** near the end of the beginner days (Day 3). The whole song loops D → A → C → G in D major ([songnotes](https://songnotes.net/lessons/562/)).
  - **In the library:** added as a Beginner song.
- **Back button fixed:**
  - **What was wrong:** XP toasts and the sideways popup sat on top of it and swallowed taps.
  - **Now:** toasts never block taps, and the popup sits below the lesson's top bar. Back walks lesson by lesson to Lesson 1, then to Today (it no longer jumps into the optional pre-lessons).
  - **Tested:** with real taps, including while a toast was showing.
- **iOS build 14.**
- **Auto-advance:** after a correct answer Hayden cheers, then the next lesson opens by itself after 2s (3s when there's a real-piano tip to read). The Next button fills up as a countdown and can be tapped to skip the wait. "Finish Day N" still waits for a tap. Build 15.

## 2026-10-06 — iOS build 16
- Tabs: Lessons / Practice / My songs. Practice = "Upload any song" on top, "Or try these songs" below; tapping a song opens the piano and auto-plays the falling chords (← All songs / Next song →). My songs = uploads (saved on device, IndexedDB, max 12) + practiced songs.
- Lessons never stop: day ends show a "Day N complete" card (streak + unlocks) and continue. Song cards after the 4 chords (The A Team, Perfect, Viva La Vida, Country Roads), "any pop song" card, quizzes that must be answered correctly.
- Rewards: streak/day unlocks (songs, party hat, golden keys, streak freeze, crown). Next-reward teaser on Today.
- Custom drawn icons everywhere (emoji only inside chats). New flat panda logo with animated poses. Intro screen (Start now / Continue, Lesson N of total).
- Share: "I just learned <song> on Hayden Keys! Check it out haydenkeys.com" (native share sheet).
- Header respects the notch / Dynamic Island (verified in simulator).
- Build 17: cuter panda — no mouth, bigger sparkly eyes, happy ^ ^ eyes when cheering/singing, smaller nose, rosier cheeks.

## 2026-10-06 — iOS build 18
- Panda redrawn cuter: no mouth, purple bowtie, shiny eyes, softer cheeks, hands with paw pads, stubby legs with toe beans; holds a mini piano. Props rotate in chats (sunglasses, headphones, maracas, bamboo, mic, balloon). Calm idle (breathing, blinking, glancing); big moves play once then settle.
- Tricks: right answers → quick spin / kung fu / noodles / qi energy ball / pushups / cheer; wrong answers → struggling situps / oops.
- New app icon, web icons and launch splash from the new panda (old hand-drawn one had a mouth).
- Song player: cover art (iTunes Search, cached; privacy policy updated), key, chord progression section by section, press Play (no autoplay), Share below the piano. Falling notes now flow continuously through the hit line instead of stopping at it. Drum beat / Bass line toggles with custom icons and On/Off switches; Tap tempo hidden in the simple player.
- Audio: tap-to-unlock listeners stay active all session so sound recovers after iOS interrupts it.
- Build 19: uploads decode natively on iPhone (AVFoundation, any format iOS plays incl. videos), web decoder as fallback; new upload disclaimer wording.
- Build 20: intro says just "G, D, Em and C"; no Back button on lesson 1; Hear it only shown when there is something to hear; panda no longer waves (idle with props instead).

## Next up (as of 2026-10-06)
- After Hayden Keys and Jaxx Guitar, we are launching a **fitness app** and a **jiu jitsu app** next.

## 2026-10-07 — iOS build 21
- Numbers card: "Let's try something new: numbers instead of chord names!"
- New card after "Make one key sing": how hard you press changes a song's emotion; listen to acoustic versions and follow the piano.
- "Day N complete" → "Lesson N complete" (+ a line under it; Lesson 1: "4 chords are all you need to play over 100 songs. Try singing along!"). "Day N:" removed from lesson titles.
- Key colours: every A is purple, every B red, C orange, D yellow, E green, F teal, G blue, in every octave; lit keys keep their colour (purple ring).
- Happy/sad numbers now show the letters (key of G: 1 4 5 = G C D; 2 3 6 = Am Bm Em).
- Lesson 2 now teaches every chord: major recipe (4 up, 3 up) with F and E major, minor recipe (3 up, 4 up) with D minor, a tap-to-hear chart of all 24 chords, an A major quiz, and "chords vs keys" before moving to the key of C.
- Song cards (A Team, Perfect, Viva La Vida, Country Roads, Linger) have the official acoustic/live video and "Main part (4 chords)" / "Whole song" play-along. Videos verified via YouTube oEmbed, official channels only (js/media-data.js).
- Choose your song rewritten: song list → song screen with key, chords by section, video, Main part / Whole song (Love Story plays start to finish incl. the key change).
- Jazz trick rewritten: left hand loops G D Em C as falling blocks, outlined safe keys for the right hand, then Herbie Hancock's Cantaloupe Island as the real example; then "Speaking of jazz, let's learn some Chet Baker" → My Funny Valentine.
- My Funny Valentine: the famous descending line, then the whole song simplified (A A B A, based on Chet Baker's 1954 recording), with the official audio. "Master: Linger" is skipped (Linger is taught in Lesson 3).
- Falling blocks in lessons no longer freeze above the keys; they flow into the keys and disappear.
- Practice song screen shows the song's official video too.
- Build 22: Lesson 3 adds "Interstellar" (Hans Zimmer): left hand A F C G low, right hand keeps the ticking high E on top (Am, Fmaj7, C, G6 sounds); a simple version, not the film score.
- Build 23:
  - **Lesson 4: genres** — music has flavours: pop (1 5 6 4), rock (D C G, Sweet Home Alabama), blues (12-bar, C7 F7 G7, play-along), jazz (2 5 1: Dm7 G7 Cmaj7), classical (broken chords, Bach's Prelude in C), a quiz, "find your style". "Lesson 4 complete" line.
  - **Wait for me** in the Practice song player: the chords stop at the line until you play them (screen, MIDI keyboard, or microphone). Microphone message: "We'll use your phone's microphone only to hear your piano keys, nothing else." Mic hears single notes (pitch) and whole chords (12-pitch-class chroma match); app doesn't play the chord itself while waiting. Info.plist microphone text and privacy policy updated.
  - "Guess the song (Shazam)" renamed to "Guess the song" (feature unchanged; privacy policy still discloses ShazamKit). Upload settings use our own icons instead of emoji.
  - **Chord Ear Gym** (final lesson, after the whole curriculum): round 1 happy or sad (8), round 2 all 24 chords one by one with 4 options (incl. the same-letter major/minor twin), round 3 the chords anywhere on the piano (random octave + inversion). Streaks, panda tricks, wrong answers play both chords to compare, retry a round, play again.
- Added Creep (Radiohead, 1992): G B C Cm loop (I III IV iv), song structure, official video (Radiohead channel, oEmbed-verified).
- Fun facts: the 2nd fact anyone sees is now always "Meet the man who invented the piano" (Cristofori: the Medici prince, plucking vs hammers, leather hammer tips, bouncing off, "piano e forte" in the 1700 inventory, what it looked like: wing-shaped wooden box, 54 keys, no metal frame) with a photo of his 1720 piano (the oldest surviving piano; The Met, public domain CC0).
- Clearer "your piano": the intro says go to your piano (or keyboard) and find middle C on it; the middle C tip explains how to find it on your own piano.
- Lesson 3: left hand vs right hand explained with note names (G2 for the left hand, G3 B3 D4 for the right; bass walk G2 D3 E3 C3; Interstellar A2 F2 C3 G2 with E4 on top), how to find G2 (thumb on middle C, go left past G3), same-letter colours.
- Chats: the "learn more" bubble is solid purple, pulsing, with an arrow and a "Tap the purple bubble to keep going 👇" hint; "Skip to the end" is a small link.
- Pictures in chats: middle C with the 2 black keys (and the group of 3 for contrast); a full 88-key piano with every A (A0–A7) in purple and C4 marked; A2, A3 and C4 in Lesson 2.
