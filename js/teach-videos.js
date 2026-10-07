// Real teachers' hands on video, shown at the top of the lessons they
// match (official channels only: Hoffman Academy, Pianote, Bill Hilton;
// IDs checked with YouTube oEmbed, 2026-10-07).
import { videoHtml } from "./media.js";

const TEACH = {
  "m-find-c": ["teach-hands"],
  "m-chord-g": ["teach-first-chords"],
  "m-boom": ["teach-changing"],
  "m-two-hands": ["teach-two-hands"],
  "d3-together": ["teach-two-hands"],
  "d3-song": ["teach-lh-chords-rh-melody"],
  "lesson-24": ["teach-two-hands"],
  "lesson-29": ["teach-changing-2"],
  "d4-blues": ["teach-blues-improv"],
  "d4-jazz": ["teach-jazz-improv"],
  "lesson-36": ["teach-jazz-improv"],
  "lesson-jazz-preview": ["teach-jazz-improv"],
  "lesson-handsloop": ["teach-jazz-improv"],
  "lesson-pedals": ["teach-pedal"],
};

// A small "Watch a teacher" strip (videos load only when tapped).
function teachHtml(lessonId) {
  const keys = TEACH[lessonId];
  if (!keys) return "";
  return `<details class="hk-teach"><summary>👀 Watch a real teacher's hands</summary>${keys.map((k) => videoHtml(k)).join("")}</details>`;
}

export { teachHtml, TEACH };
