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
