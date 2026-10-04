// All persistence for Hayden Keys lives in localStorage. No backend, no
// accounts, zero server cost — matches the project's hard cost
// constraint. Everything here degrades gracefully if localStorage is
// unavailable (e.g. private browsing in some browsers).

const KEYS = {
  SAVED_SONGS: "hk_saved_songs",
  LESSON_PROGRESS: "hk_lesson_progress",
  STREAK: "hk_streak",
  CALIBRATION: "hk_calibration",
};

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
  bumpStreak();
}

function isLessonComplete(lessonId) {
  const progress = getLessonProgress();
  return Boolean(progress[lessonId]?.completed);
}

// --- Streak ------------------------------------------------------------

function getStreak() {
  return safeGet(KEYS.STREAK, { count: 0, lastDay: null });
}

function bumpStreak() {
  const streak = getStreak();
  const today = new Date().toISOString().slice(0, 10);
  if (streak.lastDay === today) return streak; // already counted today
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  const count = streak.lastDay === yesterday ? streak.count + 1 : 1;
  const next = { count, lastDay: today };
  safeSet(KEYS.STREAK, next);
  return next;
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
};
