// Custom native plugins (TipJar, SongRecognizer). The app doesn't load
// @capacitor/core, so the iOS bridge gives us Capacitor.nativePromise but no
// registerPlugin; without this fallback the plugins were never found (the
// tip jar stayed hidden and song recognition was skipped).
export function nativePlugin(name) {
  const cap = window.Capacitor;
  if (!cap?.isNativePlatform?.()) return null;
  if (cap.registerPlugin) return cap.registerPlugin(name);
  if (cap.Plugins?.[name]) return cap.Plugins[name];
  if (typeof cap.nativePromise !== "function") return null;
  // "then" stays undefined so the object isn't mistaken for a promise.
  return new Proxy({}, {
    get: (_, method) => (typeof method === "string" && method !== "then")
      ? (opts = {}) => cap.nativePromise(name, method, opts)
      : undefined,
  });
}
