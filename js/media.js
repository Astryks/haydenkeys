// Photos of the people lessons talk about, and optional videos.
//
// Photos are freely licensed images from Wikimedia Commons, bundled in
// assets/people/ (no network request) and always shown with their
// author and licence. Videos are click-to-load: nothing is fetched from
// YouTube until the learner taps, and then only via
// youtube-nocookie.com. In the iOS app, a tap opens the video in YouTube
// instead (embedded YouTube players often refuse to play inside apps).

import { PEOPLE, VIDEOS } from "./media-data.js";

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

function peopleHtml(keys = []) {
  const cards = keys.map((k) => PEOPLE[k]).filter((p) => p && p.img);
  if (!cards.length) return "";
  return `<div class="hk-people">${cards.map((p) => `
    <figure class="hk-person">
      <img src="${p.img}" alt="${esc(p.person)}" loading="lazy">
      <figcaption><strong>${esc(p.person)}</strong><span>Photo: ${esc(p.artist || "Unknown")}, <a href="${p.pageUrl}" target="_blank" rel="noopener">${esc(p.license)}</a></span></figcaption>
    </figure>`).join("")}</div>`;
}

function videoHtml(topic) {
  const v = VIDEOS[topic];
  if (!v) return "";
  return `<div class="hk-video" data-yt="${esc(v.id)}"${v.noEmbed ? ' data-noembed="1"' : ""}>
    <button class="hk-btn hk-video-load" type="button">▶ Watch: ${esc(v.title)}</button>
    <span class="hk-note">${esc(v.author_name)} · plays from YouTube when you tap${v.kind ? `<br>${v.kind === "piano" ? "🎹 Live piano version" : v.kind === "live" ? "🎤 Live version" : "🎸 Acoustic version"}: Whole song follows the studio recording, so the timing can differ a little.` : ""}</span>
  </div>`;
}

function wireVideos(root) {
  root.querySelectorAll(".hk-video-load").forEach((b) => b.addEventListener("click", () => {
    const box = b.closest(".hk-video");
    const id = box.dataset.yt;
    if (window.Capacitor?.isNativePlatform?.() || box.dataset.noembed) {
      window.open(`https://www.youtube.com/watch?v=${encodeURIComponent(id)}`, "_blank");
      return;
    }
    box.innerHTML = `<div class="hk-video-frame"><iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?rel=0&autoplay=1" title="YouTube video" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></div>`;
  }));
}

export { peopleHtml, videoHtml, wireVideos };
