import { pandaSvg } from "./panda.js";
import { SONGS } from "./songs-data.js";
import { getSavedSongs, removeSavedSong, markSongStatus, getLessonProgress } from "./storage.js";
import { LESSONS } from "./lessons-data.js";

function initSavedTab(root, { onOpenSong } = {}) {
  function render() {
    const saved = getSavedSongs();
    const entries = Object.entries(saved);
    const lessonProgress = getLessonProgress();
    const completedLessons = LESSONS.filter((l) => lessonProgress[l.id]?.completed);

    root.innerHTML = `
      <div class="hk-saved">
        <h2>Your progress</h2>
        <section>
          <h3>Lessons completed (${completedLessons.length}/${LESSONS.length})</h3>
          ${completedLessons.length
            ? `<ul>${completedLessons.map((l) => `<li>${l.title}</li>`).join("")}</ul>`
            : `<div class="hk-empty-state">
                 <div class="hk-empty-mascot">${pandaSvg("sleep")}</div>
                 <p class="hk-empty">None yet — head to the Lessons tab.</p>
               </div>`}
        </section>
        <section>
          <h3>Songs (${entries.length})</h3>
          ${entries.length ? "" : `<div class="hk-empty-state">
                 <div class="hk-empty-mascot">${pandaSvg("sleep")}</div>
                 <p class="hk-empty">Nothing saved yet — start a song from the Discover tab.</p>
               </div>`}
          <div class="hk-saved-list" id="hk-saved-list"></div>
        </section>
      </div>`;

    const list = root.querySelector("#hk-saved-list");
    entries
      .sort((a, b) => b[1].updatedAt - a[1].updatedAt)
      .forEach(([title, info]) => {
        const song = SONGS.find((s) => s.title === title);
        const row = document.createElement("div");
        row.className = "hk-saved-row";
        row.innerHTML = `
          <div>
            <strong>${title}</strong> — ${song ? song.artist : "?"}
            <span class="hk-badge">${info.status}</span>
          </div>
          <div class="hk-saved-actions">
            <button class="hk-btn hk-btn-small" data-practice>Practice</button>
            <button class="hk-btn hk-btn-small" data-complete>${info.status === "completed" ? "Mark started" : "Mark completed"}</button>
            <button class="hk-btn hk-btn-small hk-btn-danger" data-remove>Remove</button>
          </div>`;
        row.querySelector("[data-practice]").addEventListener("click", () => song && onOpenSong && onOpenSong(song));
        row.querySelector("[data-complete]").addEventListener("click", () => {
          markSongStatus(title, info.status === "completed" ? "started" : "completed");
          render();
        });
        row.querySelector("[data-remove]").addEventListener("click", () => {
          removeSavedSong(title);
          render();
        });
        list.appendChild(row);
      });
  }
  render();
  return { refresh: render };
}

export { initSavedTab };
