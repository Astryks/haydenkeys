// Item 45: a real sampled piano timbre, as an optional upgrade over
// keyboard.js's plain oscillator synth. Reuses smplr (MIT) and its
// SplendidGrandPiano sample set — the exact same already-vetted
// library/instrument the sibling Dawsons project already ships in
// production (see THIRD_PARTY_NOTICES.md for full sourcing). Vendored
// unmodified at js/vendor/smplr-1.1.0.mjs, not re-fetched from a CDN
// for the *library code* itself.
//
// This IS a genuinely new network dependency, though: the sample
// AUDIO files (not the library code) stream from smplr's own public
// sample host (smpldsnds.github.io) the first time a sampled piano
// note plays. That's disclosed honestly in privacy.html/
// THIRD_PARTY_NOTICES.md, the same way the iTunes album-art lookup
// was (item 25) — this app still runs with zero account/server of its
// own, but it is not a zero-network-request app once this feature is
// used.
//
// Deliberately a progressive enhancement, never a hard dependency:
// every caller must keep sounding fine on the plain synth while the
// sample set loads (or forever, if it never loads — offline, a
// blocked request, an unsupported browser). Callers should use
// `playSampledOrSynth()` from keyboard.js rather than reaching for
// this module's loader directly, so there's exactly one fallback path.

let pianoInstance = null;
let loadPromise = null;

// Kicks off loading (idempotent — safe to call from multiple places,
// e.g. once per tab that plays audio) and returns a promise that
// resolves to the ready instrument, or null if loading fails for any
// reason. Never throws.
function loadSampledPiano(ctx) {
  if (loadPromise) return loadPromise;
  loadPromise = import("./vendor/smplr-1.1.0.mjs")
    .then(({ SplendidGrandPiano }) => {
      const piano = new SplendidGrandPiano(ctx);
      return piano.load.then(() => {
        pianoInstance = piano;
        return piano;
      });
    })
    .catch((err) => {
      console.warn("Hayden Keys: sampled piano failed to load, staying on the synth tone.", err);
      return null;
    });
  return loadPromise;
}

// Synchronous check — null until loadSampledPiano()'s promise has
// actually resolved with a usable instrument.
function getSampledPianoIfReady() {
  return pianoInstance;
}

export { loadSampledPiano, getSampledPianoIfReady };
