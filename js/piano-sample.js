// Item 45: a real sampled piano timbre, as an optional upgrade over
// keyboard.js's plain oscillator synth. Reuses smplr (MIT) and its
// SplendidGrandPiano sample set — the exact same already-vetted
// library/instrument the sibling Dawsons project already ships in
// production (see THIRD_PARTY_NOTICES.md for full sourcing). Vendored
// unmodified at js/vendor/smplr-1.1.0.mjs, not re-fetched from a CDN
// for the *library code* itself.
//
// Item 60: the sample AUDIO is vendored as well (assets/piano-samples/,
// public domain), so this makes no third-party network request.
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
      // Item 60: samples are vendored in this repo (assets/piano-samples/,
      // public domain — see THIRD_PARTY_NOTICES.md), so the piano sound no
      // longer depends on smplr's sample host staying online, and the iOS
      // app makes no network request for it at all. m4a (AAC) only: every
      // target browser and iOS can play it. The custom storage encodes
      // each file name: smplr builds URLs like "FF A#2.m4a" unencoded, and
      // the "#" starts a URL fragment, so every sharp-named sample was
      // silently requested as "FF A" and failed to load.
      const piano = new SplendidGrandPiano(ctx, {
        baseUrl: new URL("../assets/piano-samples", import.meta.url).href,
        formats: ["m4a"],
        // Every note plays at the default velocity (100), so only the
        // layer covering it is loaded (~5 MB instead of all 5 layers,
        // ~23 MB). All layers are still kept in the repo.
        notesToLoad: { notes: Array.from({ length: 88 }, (_, i) => 21 + i), velocityRange: [100, 100] },
        storage: {
          fetch: (url) => {
            const cut = url.lastIndexOf("/") + 1;
            return fetch(url.slice(0, cut) + encodeURIComponent(decodeURIComponent(url.slice(cut))));
          },
        },
      });
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
