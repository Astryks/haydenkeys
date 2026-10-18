// Real teachers' hands on video, shown at the top of the lessons they
// match (owner rule: no Pianote, only videos over 1M views;
// IDs checked with YouTube oEmbed, 2026-10-07).
import { videoHtml, firstTeacherNote, markTeacherNoteSeen } from "./media.js";

const TEACH = {
  "m-find-c": ["teach-hands"],
  "m-hands-loose": ["teach-hand-placement"],
  "m-two-hands": ["teach-two-hands"],
  "d2-all-chords": ["teach-all-chords"],
  "d3-song": ["teach-lh-accompaniment"],
  "d2-all-chords-2h": ["teach-two-hands"],
  "lesson-24": ["teach-two-hands"],
  "d4-blues": ["teach-blues-improv"],
  "lesson-36": ["teach-jazz-improv"],
  "lesson-jazz-preview": ["teach-jazz-improv"],
  "lesson-pedals": ["teach-pedal"],
};

// A small "Watch a teacher" strip (videos load only when tapped).
function teachHtml(lessonId) {
  const keys = TEACH[lessonId];
  if (!keys) return "";
  return `<details class="hk-teach"><summary>👀 Watch a real teacher's hands</summary>${keys.map((k) => videoHtml(k)).join("")}${firstTeacherNote({ shownNow: false })}</details>`;
}
// Opening the strip shows its video (and the first-time note under it).
function wireTeach(root) {
  root.querySelectorAll(".hk-teach").forEach((d) => d.addEventListener("toggle", () => { if (d.open && d.querySelector(".hk-teacher-note")) markTeacherNoteSeen(); }));
}

export { teachHtml, wireTeach, TEACH };
