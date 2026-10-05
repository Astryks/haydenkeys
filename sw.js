// Minimal app-shell service worker — not a full offline-first
// architecture, but real enough that "Add to Home Screen" gives a
// genuine standalone launch and a second visit (even offline) can
// serve the shell from cache. Network-first for the app's own static
// files, with the cache as the offline fallback (song/lesson data is
// bundled in these same JS files, so no separate data-fetching to
// worry about). Bump CACHE_NAME on every
// deploy that changes shell files so old caches are dropped on activate.
const CACHE_NAME = "hayden-keys-v2";
const APP_SHELL = [
  "./",
  "./index.html",
  "./privacy.html",
  "./reference.html",
  "./manifest.webmanifest",
  "./css/style.css",
  "./js/about.js",
  "./js/app.js",
  "./js/badges.js",
  "./js/calibration.js",
  "./js/camera-overlay.js",
  "./js/chord-utils.js",
  "./js/computer-keys.js",
  "./js/discover.js",
  "./js/drums.js",
  "./js/how-it-works.js",
  "./js/keyboard.js",
  "./js/lessons-data-advanced.js",
  "./js/lessons-data.js",
  "./js/lessons-ui.js",
  "./js/midi.js",
  "./js/note-highway.js",
  "./js/piano-sample.js",
  "./js/pitch.js",
  "./js/practice.js",
  "./js/saved.js",
  "./js/songs-data.js",
  "./js/storage.js",
  "./js/transcribe.js",
  "./assets/icons/icon-16.png",
  "./assets/icons/icon-32.png",
  "./assets/icons/icon-180.png",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  // Never intercept cross-origin requests — those always go to the network.
  if (url.origin !== self.location.origin) return;
  if (event.request.method !== "GET") return;

  // Network-first (falling back to cache when offline). This used to be
  // cache-first, which meant every deploy showed returning visitors the
  // previous version until a second reload.
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response && response.status === 200) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
