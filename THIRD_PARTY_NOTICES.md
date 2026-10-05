# Third-Party Notices

Hayden Keys has very few dependencies by design — the zero-cost,
zero-backend constraint keeps the list short. Each one below was
checked directly against its actual LICENSE file (not just a package
description) before being added.

## Runtime dependencies (loaded in-browser)

| Component | License (verified) | What it does in Hayden Keys |
|---|---|---|
| `@spotify/basic-pitch` v1.0.1, **vendored locally** at `js/vendor/basic-pitch/` | **Apache License 2.0** — verified directly against `github.com/spotify/basic-pitch`'s LICENSE file and license badge, and against the TypeScript sibling repo `github.com/spotify/basic-pitch-ts`. License text copied in full at `js/vendor/basic-pitch/LICENSE-basic-pitch.txt`. **Correction from the original brief:** this was assumed to be MIT; it is actually Apache-2.0. Apache-2.0 is still a permissive, commercial-use-friendly license with no fees — it just additionally requires preserving the license/notice and stating changes, which this notice does. | Automatic music transcription (audio → notes) for the Practice tab's "upload your own recording" feature. Runs as a TensorFlow.js model entirely in the user's browser. **Originally loaded from the unpkg/esm.sh CDN at runtime; switched to a locally-vendored copy** (2026-10-05) specifically to remove the runtime dependency on those CDNs staying online — protects the app if Spotify archives the project or the CDN drops the package. `js/vendor/basic-pitch/basic-pitch.bundle.js` was built with `esbuild` from the real npm package (`@spotify/basic-pitch@1.0.1`, downloaded via `npm pack`, sha verified against the published npm registry tarball), bundling it together with its two actual runtime dependencies so nothing is fetched remotely: |
| ↳ `@tensorflow/tfjs` (bundled into basic-pitch.bundle.js, not a separate file) | Apache-2.0 — this package doesn't ship its own LICENSE file in the npm tarball, so the license text isn't duplicated separately, but Apache-2.0 is declared in its own `package.json` and is the same license already copied in full for basic-pitch above. | The actual ML runtime basic-pitch's model runs on. |
| ↳ `@tonejs/midi` (bundled into basic-pitch.bundle.js, not a separate file) | MIT — copied in full at `js/vendor/basic-pitch/LICENSE-tonejs-midi.txt`. | A basic-pitch-internal dependency (MIDI note-event utilities); not used directly by Hayden Keys' own code. |
| Model weights, `js/vendor/basic-pitch/model/model.json` + `group1-shard1of1.bin` | Apache-2.0 (same basic-pitch license covers the published weights, same as the code) | The actual trained transcription model — copied unmodified from the npm package's own `model/` directory. Real size: ~900 KB total (174 KB JSON + 742 KB binary weights) — small enough that vendoring it added negligible repo weight, nowhere near "tens of MB." |

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
database, no paid API calls at runtime. `basic-pitch` and its own
dependencies are vendored locally (no runtime CDN dependency), so
uploading your own audio for transcription makes zero network requests
— that specific feature is 100% on-device.

**One honest exception, added later (item 25):** the Discover tab looks
up each song's album art via Apple's free, no-API-key iTunes Search API
(`itunes.apple.com/search`) — sending a song title/artist as a search
term, nothing personal, no user data. This is a real third-party network
request, disclosed here and in the Privacy Policy, not hidden behind the
"zero network requests" claim above (which still correctly describes the
audio-transcription feature specifically).
