import { SONGS } from "./songs-data.js";
import { markSongStatus, getSavedSongs } from "./storage.js";

function confidenceBadge(song) {
  return song.confidence === "confirmed"
    ? `<span class="hk-badge hk-badge-confirmed">Chords verified</span>`
    : `<span class="hk-badge hk-badge-unverified" title="${song.notes}">Needs verification</span>`;
}

function matchBadge(song) {
  if (song.oneFiveSixFourMatch === "exact") return `<span class="hk-badge hk-badge-match">1-5-6-4</span>`;
  if (song.oneFiveSixFourMatch === "variant") return `<span class="hk-badge hk-badge-match">4-chord family</span>`;
  return "";
}

function songCard(song, onStart) {
  const saved = getSavedSongs()[song.title];
  const div = document.createElement("div");
  div.className = "hk-song-card" + (song.advanced ? " hk-song-card-advanced" : "");
  div.innerHTML = `
    <div class="hk-song-card-top">
      <h3>${song.title}</h3>
      ${song.advanced ? `<span class="hk-badge hk-badge-advanced" title="Not part of the beginner curriculum">Advanced / bonus</span>` : ""}
      ${confidenceBadge(song)}
    </div>
    <p class="hk-song-artist">${song.artist} &middot; ${song.genre}</p>
    <p class="hk-song-key">Key: ${song.key}</p>
    <p class="hk-song-chords">${song.chords.join(" – ")} <span class="hk-song-degrees">(${song.degreeSequence})</span> ${matchBadge(song)}</p>
    <p class="hk-song-notes">${song.notes}</p>
    <button class="hk-btn hk-btn-small" data-start="${song.title}">
      ${saved ? `Saved (${saved.status})` : "Start learning"}
    </button>`;
  div.querySelector("[data-start]").addEventListener("click", () => {
    markSongStatus(song.title, "started");
    onStart(song);
  });
  return div;
}

function initDiscoverTab(root, { onStartSong } = {}) {
  const genres = Array.from(new Set(SONGS.map((s) => s.genre))).sort();
  root.innerHTML = `
    <div class="hk-discover">
      <div class="hk-discover-controls">
        <input type="search" id="hk-search" placeholder="Search songs or artists..." />
        <select id="hk-genre-filter">
          <option value="">All genres</option>
          ${genres.map((g) => `<option value="${g}">${g}</option>`).join("")}
        </select>
      </div>
      <p class="hk-scope-note">
        Note: Hayden Keys teaches from a curated library of real, chord-verified songs below.
        It does <strong>not</strong> support pasting a YouTube link or any other URL to import
        arbitrary audio — that would require extracting audio from streaming platforms, which
        violates their terms of service. Your own recordings are welcome in the
        <strong>Practice</strong> tab instead.
      </p>
      <div class="hk-song-grid" id="hk-song-grid"></div>
    </div>`;

  const grid = root.querySelector("#hk-song-grid");
  const searchInput = root.querySelector("#hk-search");
  const genreSelect = root.querySelector("#hk-genre-filter");

  function render() {
    const query = searchInput.value.trim().toLowerCase();
    const genre = genreSelect.value;
    grid.innerHTML = "";
    SONGS
      .filter((s) => (!genre || s.genre === genre))
      .filter((s) => !query || s.title.toLowerCase().includes(query) || s.artist.toLowerCase().includes(query))
      .sort((a, b) => a.popularityRank - b.popularityRank)
      .forEach((song) => grid.appendChild(songCard(song, onStartSong || (() => {}))));
  }

  searchInput.addEventListener("input", render);
  genreSelect.addEventListener("change", render);
  render();
}

export { initDiscoverTab };
