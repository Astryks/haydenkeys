// Tip jar: an optional, collapsed line at the bottom of the home screen.
// Tips go through Apple's In-App Purchase (consumables that unlock
// nothing), so it only appears inside the iPhone/iPad app, never on the
// website. Prices come from Apple, already in the person's currency.
// After a tip: a thank-you card from Ginger and Pepper (js/thanks.js), and
// small cosmetic keepsakes for supporters (html.hk-supporter: a gold heart
// by the logo, gold bows for the cats on the home stage). Nothing is locked.
import { showThanks } from "./thanks.js";
const APP = "Hayden Keys";
const P = "hk";
const TIPS = [
  { id: "com.haydenkeys.app.tip.small", label: "Thank you" },
  { id: "com.haydenkeys.app.tip.medium", label: "Bravo" },
  { id: "com.haydenkeys.app.tip.large", label: "Encore" },
];
const THANKED = `${P}_tipped`;
const TIER_KEY = `${P}_tip_tier`;
const TIER_RANK = { small: 1, medium: 2, large: 3 };

const JAR = `<svg class="${P}-tip-icon" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M8 3.5h8M8.5 3.5v2.2c-1.9.9-3 2.6-3 4.8v7.3A2.7 2.7 0 0 0 8.2 20.5h7.6a2.7 2.7 0 0 0 2.7-2.7v-7.3c0-2.2-1.1-3.9-3-4.8V3.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="14.5" r="2.4" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M12 13.4v2.2" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>`;

function tipPlugin() {
  const cap = window.Capacitor;
  if (!cap?.isNativePlatform?.()) return null;
  return cap.registerPlugin ? cap.registerPlugin("TipJar") : cap.Plugins?.TipJar;
}

function thanked() {
  try { return localStorage.getItem(THANKED) === "1"; } catch { return false; }
}

// "small" | "medium" | "large" from a product id like "...tip.medium".
function tierOf(id) {
  const t = String(id || "").split(".").pop();
  return TIER_RANK[t] ? t : "small";
}
// The biggest tip given so far (for "Replay thank you").
function bestTier() {
  try { const t = localStorage.getItem(TIER_KEY); return TIER_RANK[t] ? t : "small"; } catch { return "small"; }
}
function rememberTier(tier) {
  try { if ((TIER_RANK[tier] || 0) > (TIER_RANK[localStorage.getItem(TIER_KEY)] || 0)) localStorage.setItem(TIER_KEY, tier); } catch { /* storage off */ }
}

const GOLD_HEART = `<svg viewBox="0 0 24 24" aria-hidden="true"><defs><radialGradient id="${P}-sup-gold" cx="35%" cy="30%" r="80%"><stop offset="0" stop-color="#fff4c2"/><stop offset="0.5" stop-color="#f2c94c"/><stop offset="1" stop-color="#b07f1c"/></radialGradient></defs><path d="M12 21 C5 15.5 2 12 2 8.2 C2 5.2 4.3 3 7.1 3 C9 3 10.9 4.1 12 5.8 C13.1 4.1 15 3 16.9 3 C19.7 3 22 5.2 22 8.2 C22 12 19 15.5 12 21 Z" fill="url(#${P}-sup-gold)" stroke="#a8761a" stroke-width="0.8"/><path d="M6 6.4 C7 5.4 8.4 5.2 9.4 5.8" stroke="#fff" stroke-width="1.3" fill="none" stroke-linecap="round" opacity="0.85"/></svg>`;

// Supporter keepsakes: the class on <html> (gold bows/bandana in the art)
// and a little gold heart next to the header logo. Safe to call any time.
function applySupporter() {
  try {
    if (!thanked()) return;
    document.documentElement.classList.add(`${P}-supporter`);
    const logo = document.querySelector(`.${P}-header .${P}-logo`);
    if (logo && !logo.querySelector(`.${P}-supporter-heart`)) {
      const h = document.createElement("span");
      h.className = `${P}-supporter-heart`;
      h.setAttribute("role", "img");
      h.setAttribute("aria-label", "Supporter - thank you!");
      h.title = "Supporter - thank you!";
      h.innerHTML = GOLD_HEART;
      logo.appendChild(h);
    }
  } catch { /* cosmetic only */ }
}
// On start: the class right away, the heart once the header logo is drawn
// (the app fills the logo in on DOMContentLoaded, so wait one more tick).
applySupporter();
if (typeof document !== "undefined") {
  const later = () => setTimeout(applySupporter, 0);
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", later);
  else later();
}

const REPLAY = `<button class="${P}-tip-replay" type="button" data-tip-replay>♥ Replay thank you</button>`;

// Markup for the home screen ("" outside the app).
function tipJarHtml() {
  if (!tipPlugin()) return "";
  return `<details class="${P}-tipjar">
    <summary>${JAR}<span>Tip jar</span><small>${thanked() ? "thank you ♥" : "optional"}</small></summary>
    <div class="${P}-tipjar-body">
      <p>${APP} is free, with no ads and no account. If it has helped you play, a tip helps keep it that way. It doesn't unlock any features; everything stays free for everyone.</p>
      <div class="${P}-tip-list"><span class="${P}-tip-note">Loading…</span></div>
      <p class="${P}-tip-note" data-tip-note>Paid securely through Apple.</p>
      ${thanked() ? REPLAY : ""}
    </div>
  </details>`;
}

// Loads Apple's prices the first time the jar is opened.
function wireTipJar(root) {
  const box = root.querySelector(`.${P}-tipjar`);
  const plugin = tipPlugin();
  if (!box || !plugin) return;
  const list = box.querySelector(`.${P}-tip-list`);
  const note = box.querySelector("[data-tip-note]");
  const wireReplay = () => box.querySelector("[data-tip-replay]")?.addEventListener("click", (e) => { e.preventDefault(); showThanks(bestTier()); });
  wireReplay();
  let loaded = false;
  box.addEventListener("toggle", () => {
    if (!box.open || loaded) return;
    loaded = true;
    plugin.getProducts({ ids: TIPS.map((t) => t.id) }).then(({ products }) => {
      if (!products?.length) { list.innerHTML = `<span class="${P}-tip-note">Tips will be available soon.</span>`; return; }
      const byId = Object.fromEntries(products.map((p) => [p.id, p]));
      list.innerHTML = TIPS.filter((t) => byId[t.id]).map((t) =>
        `<button class="${P}-tip" type="button" data-tip="${t.id}"><b>${byId[t.id].price}</b><span>${t.label}</span></button>`).join("");
      list.querySelectorAll("[data-tip]").forEach((b) => b.addEventListener("click", async () => {
        const buttons = list.querySelectorAll("button");
        buttons.forEach((x) => (x.disabled = true));
        try {
          const { status } = await plugin.purchase({ id: b.dataset.tip });
          if (status === "success") {
            const tier = tierOf(b.dataset.tip);
            try { localStorage.setItem(THANKED, "1"); } catch {}
            rememberTier(tier);
            applySupporter();
            box.querySelector("summary small").textContent = "thank you ♥";
            note.innerHTML = "<b>Thank you.</b> It truly means a lot.";
            box.classList.add(`${P}-tip-thanks`);
            if (!box.querySelector("[data-tip-replay]")) { note.insertAdjacentHTML("afterend", REPLAY); wireReplay(); }
            showThanks(tier);
          } else if (status === "pending") {
            note.textContent = "Waiting for approval. Thank you!";
          }
        } catch (e) {
          note.textContent = "That didn't go through. Please try again later.";
        } finally {
          buttons.forEach((x) => (x.disabled = false));
        }
      }));
    }).catch(() => { loaded = false; list.innerHTML = `<span class="${P}-tip-note">Tips aren't available right now.</span>`; });
  });
}

export { tipJarHtml, wireTipJar, applySupporter, TIPS };
