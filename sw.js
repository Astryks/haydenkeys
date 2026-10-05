// Minimal app-shell service worker — not a full offline-first
// architecture, but real enough that "Add to Home Screen" gives a
// genuine standalone launch and a second visit (even on a flaky
// connection) can serve the shell from cache. Cache-first for the
// app's own static files, falling through to network for everything
// else (song/lesson data is bundled in these same JS files, so no
// separate data-fetching to worry about; the one deliberate exception
// is the basic-pitch CDN import, which must always hit the network).
const CACHE_NAME = "hayden-keys-v1";
const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./css/style.css",
  "./js/app.js",
  "./js/songs-data.js",
  "./js/lessons-data.js",
  "./js/lessons-data-advanced.js",
  "./js/lessons-ui.js",
  "./js/how-it-works.js",
  "./js/keyboard.js",
  "./js/note-highway.js",
  "./js/transcribe.js",
  "./js/camera-overlay.js",
  "./js/chord-utils.js",
  "./js/discover.js",
  "./js/practice.js",
  "./js/saved.js",
  "./js/calibration.js",
  "./js/storage.js",
  "./js/pitch.js",
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
  // Never intercept cross-origin requests (e.g. the basic-pitch CDN
  // import, or its model weights) — those must always go to the network.
  if (url.origin !== self.location.origin) return;
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      const networkFetch = fetch(event.request)
        .then((response) => {
          if (response && response.status === 200) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(() => cached);
      return cached || networkFetch;
    })
  );
});
