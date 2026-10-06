// Share "I just learned <song> on Hayden Keys!" to WhatsApp, Facebook,
// Messages… In the iPhone app this opens the native share sheet; in the
// browser it uses the web share sheet, or falls back to quick links.

import { icon } from "./icons.js";

const SITE = "https://haydenkeys.com";

function shareMessage(song) {
  return song ? `I just learned ${song} on Hayden Keys! 🎹 Check it out` : "I'm learning piano on Hayden Keys! 🎹 Check it out";
}

async function shareSong(song) {
  const text = shareMessage(song);
  const native = window.Capacitor?.isNativePlatform?.() && window.Capacitor.Plugins?.Share;
  try {
    if (native) return await native.share({ title: "Hayden Keys", text, url: SITE, dialogTitle: "Share" });
    if (navigator.share) return await navigator.share({ title: "Hayden Keys", text, url: SITE });
  } catch (e) {
    if (e && (e.name === "AbortError" || /cancel/i.test(e.message || ""))) return; // they closed the sheet
  }
  showShareLinks(text);
}

// Fallback: a small popup with WhatsApp / Facebook / X / copy.
function showShareLinks(text) {
  const full = `${text} ${SITE}`;
  const el = document.createElement("div");
  el.className = "hk-share-pop";
  el.innerHTML = `<div class="hk-share-card"><b>Share</b><p>${text} haydenkeys.com</p>
    <div class="hk-share-row">
      <a class="hk-btn" target="_blank" rel="noopener" href="https://wa.me/?text=${encodeURIComponent(full)}">WhatsApp</a>
      <a class="hk-btn" target="_blank" rel="noopener" href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(SITE)}&quote=${encodeURIComponent(text)}">Facebook</a>
      <a class="hk-btn" target="_blank" rel="noopener" href="https://twitter.com/intent/tweet?text=${encodeURIComponent(full)}">X</a>
      <button class="hk-btn hk-share-copy">Copy</button>
    </div><button class="hk-btn hk-share-close">Close</button></div>`;
  document.body.appendChild(el);
  el.querySelector(".hk-share-copy").addEventListener("click", async (e) => {
    try { await navigator.clipboard.writeText(full); e.target.textContent = "Copied!"; } catch (err) { e.target.textContent = "Couldn't copy"; }
  });
  el.querySelector(".hk-share-close").addEventListener("click", () => el.remove());
  el.addEventListener("click", (e) => { if (e.target === el) el.remove(); });
}

function shareButton(song, label = "Share") {
  return `<button class="hk-btn hk-share-btn" data-share-song="${String(song || "").replace(/"/g, "&quot;")}">${icon("gift", 20)} ${label}</button>`;
}

// One listener for every share button in the app.
document.addEventListener("click", (e) => {
  const b = e.target.closest("[data-share-song]");
  if (b) shareSong(b.dataset.shareSong || null);
});

export { shareSong, shareButton };
