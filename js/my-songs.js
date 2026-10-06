// "My songs" tab: songs you've practised and songs you've uploaded, all
// kept on your device. Tap one to play it again.

import { SONGS, getDifficulty } from "./songs-data.js";
import { getSavedSongs } from "./storage.js";
import { listUploads, getUpload, deleteUpload } from "./my-uploads.js";
import { renderTranscribedPlayback } from "./transcribe.js";
import { icon } from "./icons.js";
import { pandaSvg } from "./panda.js";

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

function initMySongs(root, { openSong }) {
  async function render() {
    const saved = getSavedSongs();
    const practiced = Object.entries(saved).sort((a, b) => b[1].updatedAt - a[1].updatedAt).map(([title, v]) => ({ song: SONGS.find((s) => s.title === title), status: v.status })).filter((x) => x.song);
    const uploads = await listUploads();
    root.innerHTML = `
      <div class="hk-ph">
        <div class="hk-ph-upload-head"><div class="hk-ph-panda">${pandaSvg("play")}</div><div><h2>My songs</h2><p>Everything you've practised and uploaded, saved on this device.</p></div></div>
        <h3 class="hk-ph-title">Your uploads</h3>
        ${uploads.length ? `<div class="hk-ph-list">${uploads.map((u) => `
          <div class="hk-ph-song hk-ms-upload" data-up="${u.id}">
            ${icon("cassette", 34)}
            <span class="hk-ph-song-body"><b>${esc(u.name)}</b><span>${new Date(u.date).toLocaleDateString()} · ${u.notes.length} notes</span></span>
            <button class="hk-btn hk-btn-small hk-ms-del" data-del="${u.id}" aria-label="Delete">Delete</button>
            ${icon("play", 30)}
          </div>`).join("")}</div>` : `<p class="hk-honest-note">No uploads yet. Upload any song in Practice and it'll be saved here.</p>`}
        <div id="hk-ms-playback"></div>
        <h3 class="hk-ph-title">Songs you've practised</h3>
        ${practiced.length ? `<div class="hk-ph-list">${practiced.map(({ song, status }) => `
          <button class="hk-ph-song" data-song="${esc(song.title)}">
            ${icon(status === "completed" ? "check" : "song", 34)}
            <span class="hk-ph-song-body"><b>${esc(song.title)}</b><span>${esc(song.artist)} · ${status === "completed" ? "Learned" : "Practising"}</span></span>
            ${icon("play", 30)}
          </button>`).join("")}</div>` : `<p class="hk-honest-note">Songs you play in Practice will show up here.</p>`}
      </div>`;
    root.querySelectorAll("[data-song]").forEach((b) => b.addEventListener("click", () => openSong(b.dataset.song)));
    root.querySelectorAll("[data-del]").forEach((b) => b.addEventListener("click", async (e) => {
      e.stopPropagation();
      await deleteUpload(b.dataset.del);
      render();
    }));
    root.querySelectorAll("[data-up]").forEach((row) => row.addEventListener("click", async () => {
      const u = await getUpload(row.dataset.up);
      if (!u) return;
      const file = new File([u.blob], u.name, { type: u.type || u.blob.type });
      const pb = root.querySelector("#hk-ms-playback");
      renderTranscribedPlayback(pb, u.notes, { file });
      pb.scrollIntoView({ behavior: "smooth", block: "start" });
    }));
  }
  render();
  return { refresh: render };
}

export { initMySongs };
