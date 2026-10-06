import { initDiscoverTab } from "./discover.js";
import { initPracticeTab } from "./practice.js";
import { initSavedTab } from "./saved.js";
import { initLessonsTab, renderRoadmapTab } from "./lessons-ui.js";
import { initHowItWorksTab } from "./how-it-works.js";
import { initAboutTab } from "./about.js";
import { initMidiTab } from "./midi.js";
import { checkBadges } from "./badges.js";
import { getLevel } from "./storage.js";
import { maybeShowFunFact, showFunFact } from "./fun-facts.js";
import { initPopups } from "./popups.js";

// Stripe Payment Link for the footer's "Support Hayden Keys" link —
// empty until Sid creates one in his own Stripe dashboard.
const STRIPE_PAYMENT_LINK = "";

const TABS = ["discover", "practice", "saved", "lessons", "roadmap", "how", "about", "midi"];
const panels = {};
let savedApi = null;
let discoverApi = null;
let lessonsApi = null;
let practiceApi = null;

function showTab(name) {
  TABS.forEach((t) => {
    panels[t].classList.toggle("hk-hidden", t !== name);
    document.querySelector(`[data-tab="${t}"]`).classList.toggle("hk-tab-active", t === name);
  });
  if (name === "saved" && savedApi) savedApi.refresh();
  // Discover's tier-gating (locked/unlocked Intermediate/Advanced songs)
  // depends on completion state that can change elsewhere (Practice,
  // Saved) — refresh it every time the tab is shown so lock status is
  // never stale.
  if (name === "discover" && discoverApi) discoverApi.refresh();
  if (name === "roadmap" && lessonsApi) {
    renderRoadmapTab(panels.roadmap, (id) => {
      showTab("lessons");
      lessonsApi.open(id);
    });
  }
  if (name !== "lessons") document.body.classList.remove("hk-lesson-open");
  if (name === "lessons" && lessonsApi) lessonsApi.refresh();
  else if (lessonsApi) lessonsApi.suspend();
  // Item 56: leaving Practice stops its audio, mic and camera (they used
  // to keep running in the hidden panel); coming back resumes live modes.
  if (practiceApi) {
    if (name === "practice") practiceApi.resume();
    else practiceApi.suspend();
  }
  // Badges can be earned from actions on any tab (completing a song in
  // Saved, unlocking a tier in Discover, finishing a lesson) — re-check
  // on every switch so a freshly-earned badge shows up promptly next
  // time the Lessons map (where badges are displayed) is viewed.
  checkBadges();
}

function init() {
  // Item 56: Capacitor injects window.Capacitor into the native iOS
  // shell — flag it so web-only UI (.hk-web-only) can be hidden there.
  if (window.Capacitor?.isNativePlatform?.()) document.documentElement.classList.add("hk-native");

  TABS.forEach((t) => {
    panels[t] = document.getElementById(`panel-${t}`);
  });
  initPopups();

  document.querySelectorAll("[data-tab]").forEach((btn) => {
    btn.addEventListener("click", () => showTab(btn.dataset.tab));
  });

  // Item 43/56: the "Support Hayden Keys" link. Paste the Stripe Payment
  // Link (Stripe Dashboard -> Payment Links -> Create, e.g.
  // https://buy.stripe.com/...) into STRIPE_PAYMENT_LINK at the top of this file — that's
  // the only change needed to go live. Until then, clicking it says
  // plainly that it isn't live yet instead of doing nothing. The link is
  // hidden inside the iOS app either way (.hk-web-only), see index.html.
  const supportLink = document.getElementById("hk-support-link");
  if (supportLink) {
    if (/^https:\/\/(buy|donate)\.stripe\.com\//.test(STRIPE_PAYMENT_LINK)) {
      supportLink.href = STRIPE_PAYMENT_LINK;
      supportLink.target = "_blank";
      supportLink.rel = "noopener";
      delete supportLink.dataset.stripeLinkPending;
    } else {
      supportLink.addEventListener("click", (e) => {
        e.preventDefault();
        alert("Support link coming soon -- not wired up to a real payment page yet.");
      });
    }
  }

  discoverApi = initDiscoverTab(panels.discover, {
    onStartSong: (song) => {
      practiceApi = initPracticeTab(panels.practice, { initialSong: song });
      showTab("practice");
    },
  });
  practiceApi = initPracticeTab(panels.practice, {});
  savedApi = initSavedTab(panels.saved, {
    onOpenSong: (song) => {
      practiceApi = initPracticeTab(panels.practice, { initialSong: song });
      showTab("practice");
    },
  });
  lessonsApi = initLessonsTab(panels.lessons);
  initHowItWorksTab(panels.how);
  initAboutTab(panels.about);
  initMidiTab(panels.midi);

  renderLevelChip();
  showTab("lessons");
}

// --- Item 60: gamification feedback -------------------------------------
// XP / level in the header, toasts for XP and milestones, and a short
// confetti burst when a lesson is finished for the first time. Driven by
// window events from storage.js, so any screen that awards XP gets this
// for free.
function renderLevelChip() {
  const el = document.getElementById("hk-level-chip");
  if (!el) return;
  const lv = getLevel();
  const pct = Math.round((100 * (lv.xp - lv.floor)) / Math.max(1, lv.next - lv.floor));
  el.innerHTML = `<span class="hk-level-num">Lv ${lv.level}</span> <span class="hk-level-title">${lv.title}</span>
    <span class="hk-level-bar"><span style="width:${pct}%"></span></span> <span class="hk-level-xp">${lv.xp} XP</span>`;
  el.title = `${lv.next - lv.xp} XP to level ${lv.level + 1}`;
}

function toast(text, { big = false } = {}) {
  let host = document.getElementById("hk-toasts");
  if (!host) {
    host = document.createElement("div");
    host.id = "hk-toasts";
    host.setAttribute("aria-live", "polite");
    document.body.appendChild(host);
  }
  const t = document.createElement("div");
  t.className = `hk-toast ${big ? "hk-toast-big" : ""}`;
  t.textContent = text;
  host.appendChild(t);
  setTimeout(() => t.classList.add("hk-toast-out"), big ? 2600 : 1600);
  setTimeout(() => t.remove(), big ? 3100 : 2100);
}

function confetti() {
  // Tiny musical notes drifting down from the sky, each swaying as it falls.
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const host = document.createElement("div");
  host.className = "hk-notefall";
  host.setAttribute("aria-hidden", "true");
  const glyphs = ["♪", "♫", "♩", "♬"];
  const colors = ["#4a9bc9", "#d9678f", "#8a63d2", "#3fb363", "#e8b84b"];
  for (let i = 0; i < 46; i++) {
    const n = document.createElement("span");
    n.textContent = glyphs[i % glyphs.length];
    n.style.left = `${Math.random() * 100}%`;
    n.style.color = colors[i % colors.length];
    n.style.fontSize = `${14 + Math.random() * 18}px`;
    n.style.animationDuration = `${2.4 + Math.random() * 1.8}s, ${0.9 + Math.random() * 0.8}s`;
    n.style.animationDelay = `${Math.random() * 1.2}s, 0s`;
    host.appendChild(n);
  }
  document.body.appendChild(host);
  setTimeout(() => host.remove(), 5200);
}

window.addEventListener("hk-xp", (e) => {
  toast(`+${e.detail.amount} XP · ${e.detail.reason}`);
  renderLevelChip();
});
window.addEventListener("hk-toast", (e) => toast(e.detail.text, { big: e.detail.big }));
document.addEventListener("click", (e) => {
  if (e.target.closest(".hk-funfact-open")) showFunFact();
});
window.addEventListener("hk-celebrate", (e) => {
  confetti();
  // Day 1's tiny steps celebrate with notes only; a fun fact at the end.
  const id = e.detail?.lessonId || "";
  if (!/^(m|d\d)-/.test(id) || ["m-another-song", "d2-key-c", "d3-song"].includes(id)) maybeShowFunFact();
});

document.addEventListener("DOMContentLoaded", init);
