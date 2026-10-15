// Little delights (fun-animations): tiny, quick (< 1 s) touches that never
// block anything. Everything here is skipped under prefers-reduced-motion.
//  - Music notes float off a pressed piano key.
//  - Sparkles and little hearts pop when a lesson is completed.
//  - Ginger or Pepper sits beside the keyboard and reacts: tail swishes to
//    your notes, bats at a key, pounces after a run of right notes, hops in
//    surprise at a wrong one, stretches/yawns and then curls up asleep when
//    you pause, and gives a paw high-five when a lesson is done.
import { onNoteOn } from "./input-hub.js";
import { cat } from "./cats.js";

const reduce = () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
const NOTES = ["♪", "♫", "♩", "♬"];

function burst(x, y, chars, cls, n) {
  for (let i = 0; i < n; i++) {
    const s = document.createElement("span");
    s.className = `hk-fx ${cls}`;
    s.textContent = chars[(Math.random() * chars.length) | 0];
    s.style.left = `${x}px`;
    s.style.top = `${y}px`;
    s.style.setProperty("--dx", `${Math.round((Math.random() - 0.5) * (n > 1 ? 120 : 24))}px`);
    s.style.setProperty("--dy", `${-30 - Math.round(Math.random() * (n > 1 ? 70 : 30))}px`);
    s.style.animationDelay = `${i * 40}ms`;
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 1000 + i * 40);
  }
}

// --- Cat buddy beside the keyboard -------------------------------------
let buddy = null, idleT = 0, sleepT = 0, rights = 0;
function act(name, ms = 800) {
  if (!buddy) return;
  buddy.classList.remove("hk-buddy-sleep");
  buddy.dataset.act = name;
  clearTimeout(buddy._t);
  buddy._t = setTimeout(() => { if (buddy) buddy.dataset.act = ""; }, ms);
}
function armIdle() {
  clearTimeout(idleT); clearTimeout(sleepT);
  idleT = setTimeout(() => act("stretch", 1000), 6000);
  sleepT = setTimeout(() => buddy?.classList.add("hk-buddy-sleep"), 12000);
}
function placeBuddy() {
  const kb = [...document.querySelectorAll(".hk-keyboard")].find((k) => k.offsetParent && k.getBoundingClientRect().width > 120);
  if (!kb) { buddy?.remove(); buddy = null; return; }
  if (buddy && buddy.parentElement === kb.parentElement) return;
  buddy?.remove();
  const coat = Math.random() < 0.5 ? "ginger" : "calico";
  buddy = document.createElement("div");
  buddy.className = "hk-buddy";
  buddy.setAttribute("aria-hidden", "true");
  buddy.innerHTML = `<svg class="hc-cats hk-buddy-awake" viewBox="0 0 100 110">${cat(coat)}</svg><svg class="hc-cats hk-buddy-zz" viewBox="0 0 100 110">${cat(coat, { sleep: true })}</svg><span class="hk-buddy-z">z</span><span class="hk-buddy-paw">🐾</span>`;
  const host = kb.parentElement;
  if (getComputedStyle(host).position === "static") host.style.position = "relative";
  host.appendChild(buddy);
  armIdle();
}

function init() {
  if (reduce()) return;
  onNoteOn((midi) => {
    const key = document.querySelector(`.hk-keyboard [data-midi="${midi}"]`);
    if (key && key.offsetParent) {
      const r = key.getBoundingClientRect();
      burst(r.left + r.width / 2, r.top + 4, NOTES, "hk-fx-note", 1);
    }
    if (buddy) {
      rights++;
      act(rights % 8 === 0 ? "pounce" : rights % 5 === 0 ? "bat" : "swish", rights % 8 === 0 ? 900 : 500);
      armIdle();
    }
  });
  window.addEventListener("hk-wrong-note", () => { rights = 0; act("hop", 600); });
  window.addEventListener("hk-celebrate", () => {
    const w = window.innerWidth, h = window.innerHeight;
    burst(w / 2, h * 0.45, ["✦", "✧", "♥", "✦", "♥"], "hk-fx-sparkle", 12);
    act("five", 1000);
  });
  let pending = 0;
  new MutationObserver(() => { if (!pending) pending = requestAnimationFrame(() => { pending = 0; placeBuddy(); }); })
    .observe(document.body, { childList: true, subtree: true });
}
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
