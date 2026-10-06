import { icon } from "./icons.js";
import { SONGS, getDifficulty } from "./songs-data.js";
import { markSongStatus, getSavedSongs } from "./storage.js";
import { transcribeFile, renderTranscribedPlayback } from "./transcribe.js";

const TIER_ORDER = ["Beginner", "Intermediate", "Advanced"];
const UNLOCK_THRESHOLD = 5; // complete 5 songs in a tier to unlock the next

// ----- Album art via the iTunes Search API (item 25) ---------------------
// https://itunes.apple.com/search — a free, no-API-key, explicitly public
// lookup service Apple provides for exactly this purpose: letting
// third-party apps display cover art for song identification. We do NOT
// scrape image search or any other source — this is the one legitimate,
// defensible path, same "real public lookup" reasoning already used for
// chord verification elsewhere in this app. Results are cached in memory
// (per session) so re-rendering the grid on search/filter changes doesn't
// re-fetch art we already have. Any failure (network, no match, CORS)
// falls back to the existing plain card style — never breaks the layout.
//
// Item 56: caches the in-flight PROMISE (not just the finished result),
// so re-rendering on every search keystroke can't fire duplicate
// lookups, and cards only look up art once they scroll near the screen
// (IntersectionObserver below) — the first render used to fire ~100
// requests at once, enough to get rate-limited so most cards got no art.
const albumArtCache = new Map();
function fetchAlbumArt(song) {
  const key = `${song.title}|${song.artist}`;
  if (!albumArtCache.has(key)) albumArtCache.set(key, lookupAlbumArt(song));
  return albumArtCache.get(key);
}
async function lookupAlbumArt(song) {
  try {
    const term = encodeURIComponent(`${song.title} ${song.artist}`);
    const res = await fetch(`https://itunes.apple.com/search?term=${term}&entity=song&limit=1`);
    if (!res.ok) throw new Error(`iTunes lookup failed: ${res.status}`);
    const data = await res.json();
    const raw = data.results && data.results[0] && data.results[0].artworkUrl100;
    // iTunes's own documented trick: swap the 100x100 thumbnail size in
    // the URL for a larger one, same image, no extra API call.
    return raw ? raw.replace("100x100", "300x300") : null;
  } catch (e) {
    return null;
  }
}

function escapeAttr(text) {
  return String(text ?? "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

function confidenceBadge(song) {
  return song.confidence === "confirmed"
    ? `<span class="hk-badge hk-badge-confirmed">Chords verified</span>`
    : `<span class="hk-badge hk-badge-unverified" title="${escapeAttr(song.notes)}">Needs verification</span>`;
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

// Fire off the async art lookup and swap it into the card's art slot
// whenever it resolves — the card itself renders synchronously first
// (with the plain fallback style) so slow/failed lookups never block or
// break the grid.
const artObserver = typeof IntersectionObserver !== "undefined"
  ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        artObserver.unobserve(entry.target);
        loadArtInto(entry.target, entry.target._hkSong);
      });
    }, { rootMargin: "300px" })
  : null;

function loadArtInto(div, song) {
  const slot = div.querySelector(".hk-song-art-slot");
  if (!slot) return;
  fetchAlbumArt(song).then((url) => {
    if (!url) return; // graceful fallback: leave the plain placeholder in place
    // Built as an element, not an HTML string, since the URL comes from
    // a third-party response.
    const img = document.createElement("img");
    img.src = url;
    img.alt = `${song.title} album art`;
    img.className = "hk-song-art";
    img.loading = "lazy";
    slot.replaceChildren(img);
  });
}

function hydrateArt(div, song) {
  if (!artObserver) return loadArtInto(div, song);
  div._hkSong = song;
  artObserver.observe(div);
}

// Item 44: a real display bug Sid caught via screenshot — a handful of
// songs store a prose caveat ("insufficient agreement for a simple
// chart — see notes") as a literal entry in their `chords` array
// (meant for the detail notes, not a chord chip), so the card rendered
// that whole sentence as if it were a chord. Filter those out here
// rather than ever joining prose into the chord list; if a song has
// zero real chords left after filtering, say so plainly instead of
// showing nothing or a broken fragment.
function realChords(song) {
  return song.chords.filter((c) => !/insufficient|see notes/i.test(c));
}
function chordsDisplay(song) {
  const real = realChords(song);
  return real.length ? real.join(" · ") : "Chords: still being verified — see details";
}

function songCard(song, onStart) {
  const saved = getSavedSongs()[song.title];
  const difficulty = getDifficulty(song);
  const lock = tierUnlockStatus(difficulty);
  const div = document.createElement("div");
  div.className = "hk-song-card" + (song.advanced ? " hk-song-card-advanced" : "") + (!lock.unlocked ? " hk-song-card-locked" : "");
  const artSlot = `<div class="hk-song-art-slot hk-song-art-fallback">&#127925;</div>`;
  // Chords shown right under the title on every card (even locked ones)
  // so the chord family is visible while browsing, not hidden behind a
  // click into the song's own detail state.
  const chordsLine = `<p class="hk-song-chords-glance">${chordsDisplay(song)}</p>`;

  if (!lock.unlocked) {
    div.innerHTML = `
      ${artSlot}
      <div class="hk-song-card-body">
        <div class="hk-song-card-top">
          <h3>${song.title}</h3>
          ${difficultyBadge(difficulty)}
        </div>
        ${chordsLine}
        <p class="hk-song-artist">${song.artist} &middot; ${song.genre}</p>
        <p class="hk-lock-message">&#128274; Complete ${lock.need - lock.have} more ${lock.priorTier} song${lock.need - lock.have === 1 ? "" : "s"}
           (${lock.have}/${lock.need} so far) to unlock ${difficulty} songs like this one.</p>
      </div>`;
    hydrateArt(div, song);
    return div;
  }

  div.innerHTML = `
    ${artSlot}
    <div class="hk-song-card-body">
      <div class="hk-song-card-top">
        <h3>${song.title}</h3>
        ${song.advanced ? `<span class="hk-badge hk-badge-advanced" title="Not part of the beginner curriculum">Advanced / bonus</span>` : ""}
        ${difficultyBadge(difficulty)}
        ${confidenceBadge(song)}
      </div>
      ${chordsLine}
      <p class="hk-song-artist">${song.artist} &middot; ${song.genre}</p>
      <p class="hk-song-key">Key: ${song.key}</p>
      <p class="hk-song-chords">${chordsDisplay(song)} <span class="hk-song-degrees">(${song.degreeSequence})</span> ${matchBadge(song)}</p>
      <p class="hk-song-notes">${song.notes}</p>
      <button class="hk-btn hk-btn-small" data-start="${escapeAttr(song.title)}">
        ${saved ? `Saved (${saved.status})` : "Start learning"}
      </button>
    </div>`;
  div.querySelector("[data-start]").addEventListener("click", () => {
    // Item 56: only for songs not saved yet — reopening a COMPLETED song
    // used to downgrade it to "started", which could re-lock a tier.
    if (!getSavedSongs()[song.title]) markSongStatus(song.title, "started");
    onStart(song);
  });
  hydrateArt(div, song);
  return div;
}

function initDiscoverTab(root, { onStartSong } = {}) {
  const genres = Array.from(new Set(SONGS.map((s) => s.genre))).sort();
  root.innerHTML = `
    <div class="hk-discover">
      <div class="hk-upload-banner hk-upload-banner-top">
        <h2>${icon("song", 28)} Upload any song and we'll find the chords for you!</h2>
        <p>Not in the library? Pick a song from your phone. We'll work out the notes and easy chords, and show songs that use the same chords.</p>
        <label class="hk-upload-pick" for="hk-discover-upload">${icon("folder", 24)} Choose a song</label>
        <p class="hk-upload-fine">(Hayden Keys is for entertainment and learning only. We don't support copying songs from YouTube or other links without the artist's permission. This feature is here so you can learn the songs you love, and support the artists who create beautiful things in our world. It all runs on your device; nothing is uploaded.)</p>
        <input type="file" id="hk-discover-upload" class="hk-upload-input" accept="audio/*,video/*" />
        <div id="hk-discover-upload-status" class="hk-cal-status"></div>
        <div id="hk-discover-upload-playback"></div>
        <p class="hk-scope-note">
          Note: Hayden Keys teaches from a curated library of real, chord-verified songs below.
          It does <strong>not</strong> support pasting a YouTube link or any other URL to import
          arbitrary audio — that would require extracting audio from streaming platforms, which
          violates their terms of service. Your own recordings are welcome via the
          <strong>upload button above</strong> instead (transcribed locally in your browser,
          nothing uploaded to a server).
        </p>
      </div>
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
    const playbackEl = root.querySelector("#hk-discover-upload-playback");
    playbackEl.innerHTML = "";
    try {
      const notes = await transcribeFile(file, (text) => {
        statusEl.textContent = text;
      });
      // Item 44: replaces the old bare "Play it + one highlighted key"
      // view with the real falling-notes highway + speed control the
      // curated lesson flow uses (renderTranscribedPlayback, shared
      // from transcribe.js — not a second visualizer built here).
      statusEl.textContent = `Done — detected ${notes.length} notes.`;
      renderTranscribedPlayback(playbackEl, notes, { file });
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
    // Item 44: a tile at the end of the grid pointing back up to the
    // existing "Upload any song" banner — makes upload discoverable
    // from inside the browsing flow, not just its own separate section.
    grid.appendChild(uploadTile());
  }

  function uploadTile() {
    const div = document.createElement("div");
    div.className = "hk-song-card hk-song-card-upload";
    div.innerHTML = `
      <div class="hk-song-card-upload-inner">
        <div class="hk-song-card-upload-plus">+</div>
        <p>Upload any song</p>
      </div>`;
    div.addEventListener("click", () => {
      const banner = root.querySelector(".hk-upload-banner-top");
      if (banner) banner.scrollIntoView({ behavior: "smooth", block: "start" });
      const fileInput = root.querySelector("#hk-discover-upload");
      if (fileInput) fileInput.focus();
    });
    return div;
  }

  searchInput.addEventListener("input", render);
  genreSelect.addEventListener("change", render);
  tierSelect.addEventListener("change", render);
  render();

  return { refresh: render };
}

export { initDiscoverTab };
