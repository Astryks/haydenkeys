# Hayden Keys

A free, gamified, Duolingo-style piano learning web app for
haydenkeys.com. It teaches pop piano the way guitar apps teach chords —
numbers and shapes first, letter names second, traditional notation
later — then grows into a real curriculum covering scales, two-hand
technique, richer harmony, jazz basics, and classical repertoire.

For a detailed, dated log of exactly what's been built and verified
(including real bugs found and fixed along the way), see
[`STATUS.md`](STATUS.md). This file is the stable overview; STATUS.md is
the living changelog.

## Why it's free, forever

No backend, no database, no account system, no per-request cost. It's a
pure static site — plain HTML/CSS/JS, zero build step — deployable to
any static host (GitHub Pages included) at effectively zero hosting
cost. Everything the app remembers about you (lesson progress, streak,
saved songs, keyboard calibration) lives in your browser's
`localStorage` — nothing is ever sent to a server. The one "AI" feature
(automatic note detection for uploaded recordings) runs as a
TensorFlow.js model entirely in your browser too.

## The four tabs

1. **Lessons** — a large, numbers-first curriculum (100+ lessons and
   counting — see STATUS.md for the exact, current count). Real songs
   from the library are woven directly into the lessons, not bolted on
   as an afterthought.
2. **Discover** — browse a curated library of 100+ songs by genre or
   search by title/artist, each with its real chords shown up front, a
   confidence badge (chords independently verified vs. still being
   double-checked), and album art. Upload your own recording to have the
   app figure out its notes. Pasting a YouTube or streaming-platform
   link is **not supported and never will be** — extracting audio from
   those platforms violates their terms of service, full stop.
3. **Practice** — three ways to practice a song: a falling-note
   "highway" synced to playback, an ear-training mode that listens via
   your microphone, and a camera mode that overlays the next note onto a
   video of your real keyboard.
4. **Saved** — everything you've started or finished, pulled straight
   from your browser's local storage.

## The teaching philosophy

- **Numbers and shapes lead, letters follow.** A chord is "the 1," "the
  5," shown as a highlighted shape on the on-screen keyboard — the
  letter name is a small label underneath, absorbed through repetition.
- **Real songs, early.** The curriculum gets you playing actual,
  recognizable songs within the first few lessons, not after weeks of
  pure theory.
- **Every payoff is computed live from real data, never hardcoded.**
  When a lesson says "N songs in the library use this pattern," that
  number is calculated from the actual song data every time, not typed
  in once and left to go stale.
- **Honest difficulty, always.** The curriculum is explicitly framed as
  building toward "strong early-intermediate" — never "advanced." Real
  advanced piano takes years of study, and this app doesn't pretend
  otherwise.
- **No fact is presented more confidently than the research supports.**
  Every song's chords are tagged "confirmed" or "needs verification,"
  visibly, in the UI. Several songs and classical pieces were
  deliberately left as honest "catalog only" entries rather than forced
  into a fabricated simplified chart.

## Legal boundaries this project holds to

- **No YouTube or streaming-platform audio extraction**, anywhere, ever.
- **No scraped chord charts** from Ultimate Guitar, Songsterr,
  Hooktheory, or similar — every progression is independently
  researched and cross-checked, never copy-pasted from one site's
  formatted chart.
- **No song lyrics, anywhere, ever** — not even a short excerpt. Song
  structure (verse/chorus/bridge) is labeled by section name only.
- **Classical repertoire uses only independently-documented musical
  facts** (melody, harmony), never a specific modern edition's
  engraving or fingering — the compositions are public domain, but a
  modern printed edition can still carry its own separate copyright.
- **Uploaded audio is transcribed by a properly-licensed, client-side
  model** — see [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md) for
  exactly which one and under what license.

## Architecture

Pure static site, no build step:

```
index.html                 Tab shell, loads js/app.js as an ES module
css/style.css               All styling
.github/workflows/deploy-pages.yml   Self-deploying GitHub Pages workflow
js/
  app.js                    Tab routing/wiring
  songs-data.js             Song library + confidence/match metadata + full-structure data
  lessons-data.js           The lesson sequence + early-lesson content
  lessons-data-advanced.js  Scales, two-hand technique, 7ths, jazz, classical content
  lessons-ui.js             Lesson map + every interactive lesson flow
  keyboard.js               On-screen piano, Web Audio synth, per-hand highlighting
  note-highway.js           Falling-note visualization
  camera-overlay.js         Camera-based practice mode
  chord-utils.js            Chord-symbol → MIDI-notes parser
  discover.js               Discover tab (incl. album art lookup)
  practice.js               Practice tab (3 modes, playback, timeline, upload)
  saved.js                  Saved tab
  about.js                  In-app About/Credits page
  calibration.js            Keyboard calibration flow
  storage.js                All localStorage reads/writes
  pitch.js                  Pitch detection (reused from the sibling Dawsons project)
```

## Deploying (GitHub Pages)

A self-deploying workflow (`.github/workflows/deploy-pages.yml`) runs on
every push to `main`. First-time enablement needs a one-time manual
step from a repo admin (Settings → Pages → Source → "GitHub Actions") —
GitHub deliberately blocks the default workflow token from doing this
itself the very first time. Once enabled once, every future push
deploys automatically. See STATUS.md for the current, exact status of
this.

## iOS app (Capacitor)

The project is scaffolded as a native iOS app via Capacitor (same
HTML/CSS/JS, no rewrite) and is ready to open in Xcode. Actually
building, signing, and submitting the app needs Xcode running on a Mac
with a real Apple Developer account logged in — a local, interactive,
credentialed step that can't be done from here. See STATUS.md for the
exact current state and next steps.

## Questions a curious visitor might have

See the in-app **About** page (linked from the footer) for a friendlier,
illustrated version of everything above, plus answers to "why no
YouTube import," "what AI does this actually use," and "is my data
private."
