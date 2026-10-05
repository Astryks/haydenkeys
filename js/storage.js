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
  saved[title] = { status, updatedAt: Date.now() };
  safeSet(KEYS.SAVED_SONGS, saved);
  if (status === "completed") recordDailyProgress();
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
  progress[lessonId] = { completed: true, completedAt: Date.now() };
  safeSet(KEYS.LESSON_PROGRESS, progress);
  recordDailyProgress();
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
  // rather than the last stored count forever.
  if (streak.lastDay !== localDay() && streak.lastDay !== localDay(-1)) return { ...streak, count: 0 };
  return streak;
}

function bumpStreak() {
  const streak = getStreak();
  const today = localDay();
  if (streak.lastDay === today) return streak; // already counted today
  const yesterday = localDay(-1);
  const count = streak.lastDay === yesterday ? streak.count + 1 : 1;
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
