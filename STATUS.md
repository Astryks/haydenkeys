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
