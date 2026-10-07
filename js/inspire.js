// "Get inspired" blocks: a legendary live piano performance under a song
// (the same song when we have one, otherwise a great one in the same
// style for advanced songs) and on the jazz, blues and classical lessons.
import { INSPIRE_SONGS, INSPIRE_GENERAL } from "./inspire-data.js";

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const styleOf = (genre = "") =>
  /jazz/i.test(genre) ? "jazz" : /blues|soul|gospel|r&b/i.test(genre) ? "blues" : /classical|baroque|romantic/i.test(genre) ? "classical"
  : /film|soundtrack|contemporary piano/i.test(genre) ? "film" : /world/i.test(genre) ? "world" : /rock|alternative|grunge|metal/i.test(genre) ? "rock" : "pop";
const pickStyle = (style, seed = "") => {
  const list = INSPIRE_GENERAL.filter((g) => g.style === style);
  const pool = list.length ? list : INSPIRE_GENERAL;
  let h = 0;
  for (const ch of seed) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return pool[h % pool.length];
};
const block = (v, heading) => !v ? "" : `<div class="hk-inspire"><div class="hk-inspire-title">🔥 ${heading}</div>
  <div class="hk-video" data-yt="${esc(v.id)}"><button class="hk-btn hk-video-load" type="button">▶ ${esc(v.title)}</button>
  <span class="hk-note">${esc(v.author_name)}${v.views ? ` · ${esc(v.views)} views` : ""}</span></div>
  ${v.blurb ? `<p class="hk-inspire-blurb">${esc(v.blurb)}</p>` : ""}</div>`;

function songInspireHtml(song, { advanced = false } = {}) {
  const own = INSPIRE_SONGS[song.title];
  if (own) return block(own, "Get inspired: see it played live");
  return advanced ? block(pickStyle(styleOf(song.genre), song.title), "Get inspired") : "";
}

const LESSON_STYLE = {
  "d4-jazz": "jazz", "d4-blues": "blues", "lesson-36": "jazz", "lesson-jazz-preview": "jazz", "lesson-handsloop": "jazz",
  "lesson-almostblue": "jazz", "lesson-pedals": "classical", "lesson-35": "classical", "d4-genres": "pop",
};
function lessonInspireHtml(lessonId) {
  const style = LESSON_STYLE[lessonId];
  return style ? block(pickStyle(style, lessonId), "Get inspired") : "";
}

export { songInspireHtml, lessonInspireHtml };
