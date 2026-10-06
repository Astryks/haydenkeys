// Rewards that make streaks and finished days mean something (like
// Duolingo): each one actually changes the app.
//   songs        appear on Today as "your unlocked song" (opens in Practice)
//   party hat /  Hayden wears it everywhere
//   crown
//   golden keys  every piano keyboard turns gold
//   freeze       a streak freeze (one missed day won't break the streak)

import { getStreak } from "./storage.js";
import { icon } from "./icons.js";
import { pandaSvg } from "./panda.js";
import { shareButton } from "./share.js";

const KEY = "hk_unlocks";
const REWARDS = [
  { id: "song-let-it-be", when: { day: 1 }, icon: "song", title: "New song: Let It Be", text: "The Beatles. All white keys!", song: "Let It Be" },
  { id: "hat", when: { streak: 2 }, icon: "hat", title: "A party hat for Hayden", text: "Hayden wears it everywhere 🎉" },
  { id: "song-stand-by-me", when: { day: 2 }, icon: "song", title: "New song: Stand By Me", text: "Ben E. King. A classic!", song: "Stand By Me" },
  { id: "song-someone-like-you", when: { streak: 3 }, icon: "song", title: "New song: Someone Like You", text: "Adele. Same 4-chord idea!", song: "Someone Like You" },
  { id: "song-no-woman", when: { day: 3 }, icon: "song", title: "New song: No Woman No Cry", text: "Bob Marley. C G Am F.", song: "No Woman No Cry" },
  { id: "gold", when: { streak: 5 }, icon: "goldkeys", title: "Golden piano keys", text: "Every keyboard in the app turns gold ✨" },
  { id: "freeze", when: { streak: 7 }, icon: "freeze", title: "Streak freeze", text: "Miss a day and your streak stays safe" },
  { id: "crown", when: { streak: 14 }, icon: "crown", title: "A crown for Hayden", text: "Two weeks! You're piano royalty 👑" },
  { id: "song-dont-stop", when: { streak: 30 }, icon: "trophy", title: "Legend: Don't Stop Believin'", text: "30 days! A full song, start to finish", song: "Don't Stop Believin'" },
];

function unlocked() {
  try { return JSON.parse(localStorage.getItem(KEY) || "{}"); } catch (e) { return {}; }
}
function has(id) { return Boolean(unlocked()[id]); }

// Check what's newly earned. `daysDone` = how many Day lessons are finished.
function claimRewards(daysDone) {
  const u = unlocked();
  const streak = getStreak().count;
  const fresh = REWARDS.filter((r) => !u[r.id] && ((r.when.streak && streak >= r.when.streak) || (r.when.day && daysDone >= r.when.day)));
  fresh.forEach((r) => (u[r.id] = Date.now()));
  try { localStorage.setItem(KEY, JSON.stringify(u)); } catch (e) { /* ignore */ }
  applyRewards();
  return fresh;
}

function nextReward() {
  const u = unlocked();
  return REWARDS.find((r) => !u[r.id] && r.when.streak) || null;
}

function unlockedSongs() {
  const u = unlocked();
  return REWARDS.filter((r) => r.song && u[r.id]).map((r) => r.song);
}

// Visible effects: golden keys on <body>; the panda reads has("hat"/"crown").
function applyRewards() {
  document.body.classList.toggle("hk-gold-keys", has("gold"));
}

// Full-screen "Day N complete!" card. Resolves when they tap Keep going.
function showDayComplete(day, fresh) {
  return new Promise((resolve) => {
    const streak = getStreak().count;
    const nxt = nextReward();
    const el = document.createElement("div");
    el.className = "hk-daydone";
    el.innerHTML = `
      <div class="hk-daydone-card">
        <div class="hk-daydone-panda">${pandaSvg("cheer")}</div>
        <h2>Day ${day} complete!</h2>
        <div class="hk-daydone-streak">${icon("flame", 34)}<b>${streak}</b><span>day streak</span></div>
        ${fresh.length ? `<div class="hk-daydone-label">You unlocked</div>${fresh.map((r) => `<div class="hk-reward">${icon(r.icon, 36)}<div><b>${r.title}</b><span>${r.text}</span></div></div>`).join("")}` : ""}
        ${nxt ? `<div class="hk-daydone-next">${icon("gift", 22)} Come back tomorrow: a <b>${nxt.when.streak}-day streak</b> unlocks <b>${nxt.title.replace(/^New song: /, "")}</b></div>` : ""}
        <div class="hk-daydone-share">${shareButton(null, "Share my progress")}</div>
        <button class="hk-daydone-go">Keep going ▶</button>
      </div>`;
    document.body.appendChild(el);
    el.querySelector(".hk-daydone-go").addEventListener("click", () => {
      el.classList.add("hk-daydone-out");
      setTimeout(() => { el.remove(); resolve(); }, 300);
    });
  });
}

export { REWARDS, claimRewards, nextReward, unlockedSongs, applyRewards, has as hasReward, showDayComplete };
