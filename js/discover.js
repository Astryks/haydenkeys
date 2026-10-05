import { SONGS, getDifficulty } from "./songs-data.js";
import { markSongStatus, getSavedSongs } from "./storage.js";
import { transcribeFile } from "./transcribe.js";

const TIER_ORDER = ["Beginner", "Intermediate", "Advanced"];
const UNLOCK_THRESHOLD = 5; // complete 5 songs in a tier to unlock the next

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

function difficultyBadge(difficulty) {
  const cls = { Beginner: "hk-badge-beginner", Intermediate: "hk-badge-intermediate", Advanced: "hk-badge-advanced-tier" }[difficulty];
  return `<span class="hk-badge ${cls}">${difficulty}</span>`;
}

// Counts how many songs of a given difficulty the user has marked
// "completed" (localStorage-backed, the same mechanism lesson
// completion already uses) — the real gating signal, not a guess.
function countCompleted(difficulty) {
  const saved = getSavedSongs();
  return SONGS.filter((s) => saved[s.title]?.status === "completed" && getDifficulty(s) === difficulty).length;
}

// Tier gating: Beginner is always unlocked. Intermediate unlocks after
// 5 completed Beginner songs; Advanced after 5 completed Intermediate
// songs. Gating is per-TIER only — once a tier is unlocked, every song
// in it is freely reachable in any order (no song-by-song sequencing).
function tierUnlockStatus(difficulty) {
  if (difficulty === "Beginner") return { unlocked: true };
  if (difficulty === "Intermediate") {
    const have = countCompleted("Beginner");
    return { unlocked: have >= UNLOCK_THRESHOLD, have, need: UNLOCK_THRESHOLD, priorTier: "Beginner" };
  }
  const have = countCompleted("Intermediate");
  return { unlocked: have >= UNLOCK_THRESHOLD, have, need: UNLOCK_THRESHOLD, priorTier: "Intermediate" };
}

function songCard(song, onStart) {
  const saved = getSavedSongs()[song.title];
  const difficulty = getDifficulty(song);
  const lock = tierUnlockStatus(difficulty);
  const div = document.createElement("div");
  div.className = "hk-song-card" + (song.advanced ? " hk-song-card-advanced" : "") + (!lock.unlocked ? " hk-song-card-locked" : "");

  if (!lock.unlocked) {
    div.innerHTML = `
      <div class="hk-song-card-top">
        <h3>${song.title}</h3>
        ${difficultyBadge(difficulty)}
      </div>
      <p class="hk-song-artist">${song.artist} &middot; ${song.genre}</p>
      <p class="hk-lock-message">&#128274; Complete ${lock.need - lock.have} more ${lock.priorTier} song${lock.need - lock.have === 1 ? "" : "s"}
         (${lock.have}/${lock.need} so far) to unlock ${difficulty} songs like this one.</p>`;
    return div;
  }

  div.innerHTML = `
    <div class="hk-song-card-top">
      <h3>${song.title}</h3>
      ${song.advanced ? `<span class="hk-badge hk-badge-advanced" title="Not part of the beginner curriculum">Advanced / bonus</span>` : ""}
      ${difficultyBadge(difficulty)}
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
        <select id="hk-tier-filter">
          <option value="">All levels</option>
          ${TIER_ORDER.map((t) => `<option value="${t}">${t}</option>`).join("")}
        </select>
      </div>
      <p class="hk-tier-progress">
        ${TIER_ORDER.map((t) => {
          const lock = tierUnlockStatus(t);
          return lock.unlocked
            ? `<span class="hk-tier-status hk-tier-unlocked">${t} unlocked</span>`
            : `<span class="hk-tier-status">${t}: ${lock.have}/${lock.need} ${lock.priorTier} songs completed</span>`;
        }).join(" &middot; ")}
      </p>
      <div class="hk-upload-banner">
        <h3>Upload any song and learn it with Hayden Keys!</h3>
        <input type="file" id="hk-discover-upload" accept="audio/*,video/*" />
        <div id="hk-discover-upload-status" class="hk-cal-status"></div>
        <p class="hk-scope-note">
          Note: Hayden Keys teaches from a curated library of real, chord-verified songs below.
          It does <strong>not</strong> support pasting a YouTube link or any other URL to import
          arbitrary audio — that would require extracting audio from streaming platforms, which
          violates their terms of service. Your own recordings are welcome via the
          <strong>upload button above</strong> instead (transcribed locally in your browser,
          nothing uploaded to a server).
        </p>
      </div>
      <div class="hk-song-grid" id="hk-song-grid"></div>
    </div>`;

  const grid = root.querySelector("#hk-song-grid");
  const searchInput = root.querySelector("#hk-search");
  const genreSelect = root.querySelector("#hk-genre-filter");
  const tierSelect = root.querySelector("#hk-tier-filter");

  root.querySelector("#hk-discover-upload").addEventListener("change", async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const statusEl = root.querySelector("#hk-discover-upload-status");
    try {
      const notes = await transcribeFile(file, (text) => {
        statusEl.textContent = text;
      });
      statusEl.textContent = `Done — detected ${notes.length} notes. Head to the Practice tab to play along with a library song while you're at it. (Turning your own upload into a playable lesson is a Phase 2 item — this confirms transcription itself works.)`;
    } catch (err) {
      statusEl.textContent = err.message;
      console.error(err);
    }
  });

  function render() {
    const query = searchInput.value.trim().toLowerCase();
    const genre = genreSelect.value;
    const tier = tierSelect.value;
    grid.innerHTML = "";
    root.querySelector(".hk-tier-progress").innerHTML = TIER_ORDER.map((t) => {
      const lock = tierUnlockStatus(t);
      return lock.unlocked
        ? `<span class="hk-tier-status hk-tier-unlocked">${t} unlocked</span>`
        : `<span class="hk-tier-status">${t}: ${lock.have}/${lock.need} ${lock.priorTier} songs completed</span>`;
    }).join(" &middot; ");
    SONGS
      .filter((s) => (!genre || s.genre === genre))
      .filter((s) => (!tier || getDifficulty(s) === tier))
      .filter((s) => !query || s.title.toLowerCase().includes(query) || s.artist.toLowerCase().includes(query))
      .sort((a, b) => a.popularityRank - b.popularityRank)
      .forEach((song) => grid.appendChild(songCard(song, onStartSong || (() => {}))));
  }

  searchInput.addEventListener("input", render);
  genreSelect.addEventListener("change", render);
  tierSelect.addEventListener("change", render);
  render();

  return { refresh: render };
}

export { initDiscoverTab };
