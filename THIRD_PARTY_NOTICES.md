# Third-Party Notices

Hayden Keys is a static site with no build step and very few
dependencies by design (the zero-cost, zero-backend constraint keeps
the dependency list short). Each is used under its own license, listed
below, checked directly against the actual LICENSE file / repo (not
just a package description) before being added — same discipline as
the sibling Dawsons project.

## Runtime dependencies (loaded in-browser)

| Component | License (verified) | What it does in Hayden Keys |
|---|---|---|
| `@spotify/basic-pitch` (`basic-pitch-ts`), loaded from a CDN (unpkg/esm.sh) at runtime | **Apache License 2.0** — verified directly against `github.com/spotify/basic-pitch`'s LICENSE file and license badge, and against the TypeScript sibling repo `github.com/spotify/basic-pitch-ts`. **Correction from the original brief:** this was assumed to be MIT; it is actually Apache-2.0. Apache-2.0 is still a permissive, commercial-use-friendly license with no fees — it just additionally requires preserving the license/notice and stating changes, which this notice does. | Automatic music transcription (audio → notes) for the Practice tab's "upload your own recording" feature. Runs as a TensorFlow.js model entirely in the user's browser — confirmed via Spotify's own documentation that "the model runs entirely in your browser via TensorFlow.js... your audio never leaves your device." Not bundled/vendored in this repo; fetched from a CDN at first use and cached by the browser, so it adds no weight to the base site and no server-side cost. |

No other third-party runtime code is used. The piano keyboard, chord
playback, pitch detection, and all four tabs are plain DOM/CSS/Web
Audio/Web Audio API + `getUserMedia`, written directly for this
project.

## Reused from a sibling project (same author/org, not a third-party dependency)

| Component | Source | Notes |
|---|---|---|
| Pitch detection core (`js/pitch.js`) | Dawsons project, `website/js/pitch.js` | Normalized-autocorrelation pitch detector with parabolic interpolation, reused with its documented fix for harmonic/subharmonic misdetection (scans from the shortest lag upward and takes the first local peak past threshold, rather than the global max, which could otherwise lock onto an overtone). Core detection logic (`detectPitchInFrame`, `refineLag`) copied essentially unmodified; a new `startLivePitchDetection` wrapper was added on top for Hayden Keys' live mic-based calibration flow (Dawsons' own usage was frame-batch analysis of a full recording, not live listening). Dawsons' own code header notes this is "a classical, public DSM technique... not derived from any specific product's code." |

## Explicitly not used (and why)

| Component | Reason excluded |
|---|---|
| Any YouTube/streaming-platform audio extraction library (e.g. ytdl-core, youtube-dl bindings) | Ruled out at the product-scope level, not just the dependency level — extracting audio from a streaming platform without a license violates that platform's terms of service regardless of library used. See README "License / legal boundaries honored." |
| Any chord-database/chart-scraping library or API (Ultimate Guitar, Songsterr, Hooktheory TheoryTab) | Same reasoning — chord progressions for the curated song library are independently researched, cross-checked musical facts, not scraped from a single proprietary database. |
| Any backend framework, database, or hosted-API SDK | Would violate the zero-cost, 100%-static-site constraint that is the whole point of this project. |

## Hosting

Deployed as a static site (e.g. GitHub Pages). No server-side code, no
database, no paid API calls at runtime — the only network request this
app ever makes after the initial page load is the one-time CDN fetch
of the `basic-pitch` model, and only if/when the user chooses to upload
their own audio.
