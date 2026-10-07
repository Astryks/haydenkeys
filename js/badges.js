// Real, earnable achievements — unlock logic reads the exact same
// completion-tracking data the tier-gating system (Discover) and lesson
// progress already use, rather than a second parallel progress system.

import { LESSONS } from "./lessons-data.js";
import { SONGS, getDifficulty } from "./songs-data.js";
import { isLessonComplete, getSavedSongs, getStreak, getEarnedBadges, markBadgeEarned } from "./storage.js";

function songByTitle(title) {
  return SONGS.find((s) => s.title === title);
}

function countCompletedByDifficulty(difficulty) {
  const saved = getSavedSongs();
  return SONGS.filter((s) => saved[s.title]?.status === "completed" && getDifficulty(s) === difficulty).length;
}

function anyCompletedSong() {
  return Object.values(getSavedSongs()).some((s) => s.status === "completed");
}

function anyCompletedAdvancedSong() {
  return Object.entries(getSavedSongs()).some(([title, info]) => {
    if (info.status !== "completed") return false;
    const song = songByTitle(title);
    return song && getDifficulty(song) === "Advanced";
  });
}

const BADGE_DEFS = [
  { id: "first-lesson", title: "First Steps", icon: "🎹", desc: "Finish your first lesson.", check: () => isLessonComplete("lesson-1") },
  { id: "first-song", title: "First Song", icon: "🎵", desc: "Mark any song as completed.", check: anyCompletedSong },
  { id: "streak-5", title: "5-Day Streak", icon: "🔥", desc: "Practice 5 days in a row.", check: () => getStreak().count >= 5 },
  { id: "streak-30", title: "30-Day Streak", icon: "🏆", desc: "Practice 30 days in a row.", check: () => getStreak().count >= 30 },
  { id: "intermediate-unlocked", title: "Leveling Up", icon: "⬆️", desc: "Finish 5 Beginner songs to unlock Intermediate songs.", check: () => countCompletedByDifficulty("Beginner") >= 5 },
  { id: "advanced-unlocked", title: "Going Pro", icon: "🚀", desc: "Finish 5 Intermediate songs to unlock Advanced songs.", check: () => countCompletedByDifficulty("Intermediate") >= 5 },
  { id: "first-advanced-song", title: "Jazz Hands", icon: "🎷", desc: "Complete your first Advanced song.", check: anyCompletedAdvancedSong },
  { id: "halfway-curriculum", title: "Halfway There", icon: "📈", desc: `Complete at least half of the ${LESSONS.length} lessons.`, check: () => LESSONS.filter((l) => isLessonComplete(l.id)).length >= Math.ceil(LESSONS.length / 2) },
  { id: "curriculum-complete", title: "Curriculum Complete", icon: "🎓", desc: `Finish all ${LESSONS.length} lessons.`, check: () => LESSONS.every((l) => isLessonComplete(l.id)) },
];

// Re-checks every badge definition against current real state, persists
// any newly-earned ones, and returns both the full set and which (if
// any) were earned just now — for a "you unlocked X!" moment. Safe to
// call often (e.g. every tab switch); already-earned badges are no-ops.
function checkBadges() {
  const newlyEarned = [];
  BADGE_DEFS.forEach((b) => {
    if (b.check()) {
      if (markBadgeEarned(b.id)) newlyEarned.push(b);
    }
  });
  return { newlyEarned, earned: getEarnedBadges(), all: BADGE_DEFS };
}

export { BADGE_DEFS, checkBadges };
