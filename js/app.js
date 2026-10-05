import { initDiscoverTab } from "./discover.js";
import { initPracticeTab } from "./practice.js";
import { initSavedTab } from "./saved.js";
import { initLessonsTab } from "./lessons-ui.js";
import { initHowItWorksTab } from "./how-it-works.js";

const TABS = ["discover", "practice", "saved", "lessons", "how"];
const panels = {};
let savedApi = null;
let discoverApi = null;

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
}

function init() {
  TABS.forEach((t) => {
    panels[t] = document.getElementById(`panel-${t}`);
  });

  document.querySelectorAll("[data-tab]").forEach((btn) => {
    btn.addEventListener("click", () => showTab(btn.dataset.tab));
  });

  discoverApi = initDiscoverTab(panels.discover, {
    onStartSong: (song) => {
      initPracticeTab(panels.practice, { initialSong: song });
      showTab("practice");
    },
  });
  initPracticeTab(panels.practice, {});
  savedApi = initSavedTab(panels.saved, {
    onOpenSong: (song) => {
      initPracticeTab(panels.practice, { initialSong: song });
      showTab("practice");
    },
  });
  initLessonsTab(panels.lessons);
  initHowItWorksTab(panels.how);

  showTab("lessons");
}

document.addEventListener("DOMContentLoaded", init);
