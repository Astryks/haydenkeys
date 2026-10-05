# Status

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
