import { initDiscoverTab } from "./discover.js";
import { initPracticeTab } from "./practice.js";
import { initSavedTab } from "./saved.js";
import { initLessonsTab } from "./lessons-ui.js";
import { initHowItWorksTab } from "./how-it-works.js";
import { initAboutTab } from "./about.js";
import { initMidiTab } from "./midi.js";
import { checkBadges } from "./badges.js";

// Stripe Payment Link for the footer's "Support Hayden Keys" link —
// empty until Sid creates one in his own Stripe dashboard.
const STRIPE_PAYMENT_LINK = "";

const TABS = ["discover", "practice", "saved", "lessons", "how", "about", "midi"];
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

  showTab("lessons");
}

document.addEventListener("DOMContentLoaded", init);
