// All persistence for Hayden Keys lives in localStorage. No backend, no
// accounts, zero server cost — matches the project's hard cost
// constraint. Everything here degrades gracefully if localStorage is
// unavailable (e.g. private browsing in some browsers).

const KEYS = {
  SAVED_SONGS: "hk_saved_songs",
  LESSON_PROGRESS: "hk_lesson_progress",
  STREAK: "hk_streak",
  CALIBRATION: "hk_calibration",
  DAILY_GOAL: "hk_daily_goal",
  BADGES: "hk_badges",
  XP: "hk_xp",
  QUESTS: "hk_quests",
  FREEZES: "hk_streak_freezes",
  STARS: "hk_stars",
};

const DAILY_GOAL_TARGET = 1; // complete 1 lesson or 1 song per day to meet the daily goal

function safeGet(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    console.warn("Hayden Keys: localStorage read failed", e);
    return fallback;
  }
}

function safeSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn("Hayden Keys: localStorage write failed", e);
  }
}

// --- Saved songs (Saved tab) -----------------------------------------

function getSavedSongs() {
  return safeGet(KEYS.SAVED_SONGS, {}); // { [songTitle]: { status: 'started'|'completed', updatedAt } }
}

function markSongStatus(title, status) {
  const saved = getSavedSongs();
  const wasCompleted = saved[title]?.status === "completed";
  saved[title] = { status, updatedAt: Date.now() };
  safeSet(KEYS.SAVED_SONGS, saved);
  if (status === "completed") {
    recordDailyProgress();
    if (!wasCompleted) {
      awardXp(15, "Song completed");
      completeQuest("song");
    }
  }
}

function removeSavedSong(title) {
  const saved = getSavedSongs();
  delete saved[title];
  safeSet(KEYS.SAVED_SONGS, saved);
}

// --- Lesson progress (Lessons tab) ------------------------------------

function getLessonProgress() {
  return safeGet(KEYS.LESSON_PROGRESS, {}); // { [lessonId]: { completed: true, completedAt } }
}

function markLessonComplete(lessonId) {
  const progress = getLessonProgress();
  const firstTime = !progress[lessonId]?.completed;
  progress[lessonId] = { completed: true, completedAt: Date.now() };
  safeSet(KEYS.LESSON_PROGRESS, progress);
  recordDailyProgress();
  if (firstTime) {
    awardXp(20, "Lesson complete");
    completeQuest("lesson");
    emit("hk-celebrate", { lessonId });
  }
}

function isLessonComplete(lessonId) {
  const progress = getLessonProgress();
  return Boolean(progress[lessonId]?.completed);
}

// --- Streak ------------------------------------------------------------

// Item 56: the user's LOCAL calendar day as YYYY-MM-DD. This used to be
// toISOString(), which is the UTC date — e.g. in US Pacific time the
// "day" rolled over at 4-5pm, so practicing Monday afternoon and Tuesday
// evening could count as two days apart and silently break the streak.
function localDay(offsetDays = 0) {
  const now = new Date();
  const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + offsetDays);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function getStreak() {
  const streak = safeGet(KEYS.STREAK, { count: 0, lastDay: null });
  // A streak that wasn't continued yesterday or today is over — show 0
  // rather than the last stored count forever. Item 60: unless a streak
  // freeze can cover exactly one missed day (it's spent on the next
  // practice day, in bumpStreak).
  if (streak.lastDay === localDay() || streak.lastDay === localDay(-1)) return streak;
  if (streak.lastDay === localDay(-2) && getStreakFreezes() > 0) return { ...streak, frozen: true };
  return { ...streak, count: 0 };
}

// --- Streak freezes (item 60) ------------------------------------------
// Earned one per 7-day streak milestone (max 2 held); one covers a single
// missed day so a streak survives a day off, like Duolingo's.
function getStreakFreezes() {
  return safeGet(KEYS.FREEZES, 0);
}

function bumpStreak() {
  const streak = getStreak();
  const today = localDay();
  if (streak.lastDay === today) return streak; // already counted today
  const yesterday = localDay(-1);
  let count = streak.lastDay === yesterday ? streak.count + 1 : 1;
  if (streak.lastDay === localDay(-2) && getStreakFreezes() > 0) {
    safeSet(KEYS.FREEZES, getStreakFreezes() - 1);
    count = streak.count + 1;
    emit("hk-toast", { text: "❄️ Streak freeze used — your streak survived a day off!" });
  }
  if (count > 0 && count % 7 === 0 && getStreakFreezes() < 2) {
    safeSet(KEYS.FREEZES, getStreakFreezes() + 1);
    emit("hk-toast", { text: `🔥 ${count}-day streak! You earned a ❄️ streak freeze.` });
  }
  const next = { count, lastDay: today };
  safeSet(KEYS.STREAK, next);
  return next;
}

// --- Daily goal (real Duolingo-style pacing, not just the streak) ------
//
// The streak only means something if it's tied to actually doing
// something each day, not just opening the app — so completing a
// lesson or a song increments *today's* progress count, and only once
// that reaches DAILY_GOAL_TARGET does the streak itself advance
// (bumpStreak already dedupes within a day, so calling it multiple
// times after the goal is met on the same day is harmless).

function getDailyGoal() {
  const today = localDay();
  const stored = safeGet(KEYS.DAILY_GOAL, { date: today, count: 0 });
  if (stored.date !== today) return { date: today, count: 0, target: DAILY_GOAL_TARGET, metToday: false };
  return { ...stored, target: DAILY_GOAL_TARGET, metToday: stored.count >= DAILY_GOAL_TARGET };
}

function recordDailyProgress() {
  const today = localDay();
  const current = getDailyGoal();
  const count = current.date === today ? current.count + 1 : 1;
  safeSet(KEYS.DAILY_GOAL, { date: today, count });
  if (count >= DAILY_GOAL_TARGET) bumpStreak();
  return { date: today, count, target: DAILY_GOAL_TARGET, metToday: count >= DAILY_GOAL_TARGET };
}

// --- XP, levels, daily quests, stars (item 60) -------------------------
// Pure localStorage, like everything else. UI listens for the window
// events emitted here ("hk-xp", "hk-toast", "hk-celebrate") — app.js
// shows the toasts — so this file stays free of DOM/UI code.
function emit(name, detail) {
  try {
    window.dispatchEvent(new CustomEvent(name, { detail }));
  } catch (e) {
    // non-browser context: nothing to show
  }
}

const LEVEL_TITLES = [
  "Newcomer", "Key Finder", "Chord Starter", "Song Player", "Rhythm Keeper",
  "Two-Hander", "Sight Reader", "Performer", "Maestro", "Virtuoso",
];
// Level n needs 50·n·(n−1) XP: 0, 100, 300, 600, 1000, 1500, ...
function levelForXp(xp) {
  let level = 1;
  while (50 * (level + 1) * level <= xp) level++;
  const floor = 50 * level * (level - 1);
  const next = 50 * (level + 1) * level;
  return { level, title: LEVEL_TITLES[Math.min(level, LEVEL_TITLES.length) - 1], xp, floor, next };
}
function getXp() {
  return safeGet(KEYS.XP, 0);
}
function getLevel() {
  return levelForXp(getXp());
}
function awardXp(amount, reason) {
  if (!amount) return;
  const before = levelForXp(getXp());
  const total = getXp() + amount;
  safeSet(KEYS.XP, total);
  const after = levelForXp(total);
  emit("hk-xp", { amount, reason, total, level: after });
  if (after.level > before.level) emit("hk-toast", { text: `⭐ Level ${after.level}: ${after.title}!`, big: true });
}

// Three quests a day; each pays 10 XP, all three a 20 XP bonus.
const QUEST_DEFS = [
  { id: "lesson", text: "Finish a lesson" },
  { id: "review", text: "Do your 2-minute daily review" },
  { id: "practice", text: "Score 80%+ in wait mode or play-in-time" },
];
function getQuests() {
  const stored = safeGet(KEYS.QUESTS, { date: null, done: {} });
  const done = stored.date === localDay() ? stored.done : {};
  return QUEST_DEFS.map((q) => ({ ...q, done: Boolean(done[q.id]) }));
}
function completeQuest(id) {
  if (!QUEST_DEFS.some((q) => q.id === id)) return;
  const stored = safeGet(KEYS.QUESTS, { date: null, done: {} });
  const done = stored.date === localDay() ? { ...stored.done } : {};
  if (done[id]) return;
  done[id] = true;
  safeSet(KEYS.QUESTS, { date: localDay(), done });
  const q = QUEST_DEFS.find((d) => d.id === id);
  awardXp(10, `Quest: ${q.text}`);
  if (QUEST_DEFS.every((d) => done[d.id])) {
    awardXp(20, "All daily quests");
    emit("hk-toast", { text: "🏆 All 3 daily quests done! +20 XP bonus", big: true });
  }
}

// Best stars (1-3) per practice piece.
function starsFor(accuracy) {
  return accuracy >= 95 ? 3 : accuracy >= 80 ? 2 : accuracy >= 60 ? 1 : 0;
}
function recordStars(key, stars) {
  const all = safeGet(KEYS.STARS, {});
  const best = Math.max(all[key] || 0, stars);
  const improved = best > (all[key] || 0);
  all[key] = best;
  safeSet(KEYS.STARS, all);
  return { best, improved };
}
function getStars() {
  return safeGet(KEYS.STARS, {});
}

// --- Badges/achievements ------------------------------------------------
// Earned badges are a plain { [badgeId]: { earnedAt } } map. The badge
// *definitions* and unlock-check logic live in badges.js (which needs
// SONGS/LESSONS data storage.js deliberately doesn't depend on, to keep
// this file a pure, dependency-free localStorage layer) — this is just
// the persistence half.

function getEarnedBadges() {
  return safeGet(KEYS.BADGES, {});
}

// Returns true if this badge was newly earned just now (false if it was
// already earned before, so callers can tell "new!" from "still has it").
function markBadgeEarned(id) {
  const badges = getEarnedBadges();
  if (badges[id]) return false;
  badges[id] = { earnedAt: Date.now() };
  safeSet(KEYS.BADGES, badges);
  return true;
}

// --- Calibration ---------------------------------------------------------

function getCalibration() {
  return safeGet(KEYS.CALIBRATION, null); // { audioConfirmedMidi, visualOffsetMidi, calibratedAt }
}

function saveCalibration(data) {
  safeSet(KEYS.CALIBRATION, { ...data, calibratedAt: Date.now() });
}

export {
  getXp,
  getLevel,
  awardXp,
  getQuests,
  completeQuest,
  starsFor,
  recordStars,
  getStars,
  getStreakFreezes,
  getSavedSongs,
  markSongStatus,
  removeSavedSong,
  getLessonProgress,
  markLessonComplete,
  isLessonComplete,
  getStreak,
  getCalibration,
  saveCalibration,
  getDailyGoal,
  recordDailyProgress,
  getEarnedBadges,
  markBadgeEarned,
};
