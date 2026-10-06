// "Support us" tip jar: optional tips through Apple's In-App Purchase.
// Only inside the iPhone/iPad app (native TipJar plugin); tips unlock
// nothing — Hayden Keys stays free for everyone.
import { icon } from "./icons.js";

const TIP_IDS = ["com.haydenkeys.app.tip.small", "com.haydenkeys.app.tip.medium", "com.haydenkeys.app.tip.large"];
const LABELS = { small: "A little thank you", medium: "A big thank you", large: "You're amazing" };

function tipPlugin() {
  const cap = window.Capacitor;
  if (!cap?.isNativePlatform?.()) return null;
  return cap.registerPlugin ? cap.registerPlugin("TipJar") : cap.Plugins?.TipJar;
}

// Renders the tip jar into `el`. Returns false (and renders nothing)
// outside the app, so the website never shows it.
function renderTipJar(el) {
  const plugin = tipPlugin();
  if (!plugin) { el.innerHTML = ""; return false; }
  el.innerHTML = `
    <section class="hk-tipjar">
      <h3>${icon("gift", 28)} Support Hayden Keys</h3>
      <p>Hayden Keys is free, with no ads and no account. If it's helping you play, you can leave a tip to help us keep making it. Tips don't unlock anything: everything stays free for everyone.</p>
      <div class="hk-tip-list"><span class="hk-tip-status">Loading…</span></div>
      <p class="hk-tip-note">Paid through Apple. Thank you!</p>
    </section>`;
  const list = el.querySelector(".hk-tip-list");
  const note = el.querySelector(".hk-tip-note");
  plugin.getProducts({ ids: TIP_IDS }).then(({ products }) => {
    if (!products?.length) { list.innerHTML = '<span class="hk-tip-status">Tips will be available soon.</span>'; return; }
    list.innerHTML = products.map((p) => `<button class="hk-tip" data-tip="${p.id}"><b>${p.price}</b><span>${LABELS[p.id.split(".").pop()] || p.title}</span></button>`).join("");
    list.querySelectorAll("[data-tip]").forEach((b) => b.addEventListener("click", async () => {
      list.querySelectorAll("button").forEach((x) => (x.disabled = true));
      try {
        const { status } = await plugin.purchase({ id: b.dataset.tip });
        if (status === "success") {
          note.innerHTML = "<b>Thank you so much!</b> Your tip really helps. 🎉";
          window.dispatchEvent(new CustomEvent("hk-celebrate"));
        } else if (status === "pending") {
          note.textContent = "Waiting for approval. Thank you!";
        }
      } catch (e) {
        note.textContent = "That didn't go through: " + (e?.message || "please try again later.");
      } finally {
        list.querySelectorAll("button").forEach((x) => (x.disabled = false));
      }
    }));
  }).catch(() => { list.innerHTML = '<span class="hk-tip-status">Tips aren\'t available right now.</span>'; });
  return true;
}

export { renderTipJar, TIP_IDS };
