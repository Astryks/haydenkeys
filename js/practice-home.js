// Practice tab: "Upload any song", then "Or try these songs". Tapping a
// song opens the piano and starts playing straight away: the chords fall
// like Tetris blocks and the learner follows along on their own piano
// (no need to touch the screen). ← All songs / Next song → move between them.

import { SONGS, SONG_STRUCTURES, getDifficulty } from "./songs-data.js";
import { initPracticeTab } from "./practice.js";
import { transcribeFile, renderTranscribedPlayback } from "./transcribe.js";
import { unlockedSongs } from "./rewards.js";
import { getSavedSongs, markSongStatus } from "./storage.js";
import { saveUpload } from "./my-uploads.js";
import { icon } from "./icons.js";
import { pandaSvg } from "./panda.js";
import { shareButton } from "./share.js";
import { videoHtml, wireVideos } from "./media.js";
import { SONG_VIDEOS } from "./media-data.js";

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const TIERS = ["Beginner", "Intermediate", "Advanced"];

// Songs worth practising: real chords, unlocked/saved ones first, then by level.
function songList() {
  const playable = SONGS.filter((s) => (s.chords || []).some((c) => /^[A-G]/.test(c)) && !s.genre?.startsWith("World"));
  const unlocked = new Set(unlockedSongs());
  const saved = new Set(Object.keys(getSavedSongs()));
  const rank = (s) => (unlocked.has(s.title) ? 0 : saved.has(s.title) ? 1 : 2) * 10 + TIERS.indexOf(getDifficulty(s));
  return playable.sort((a, b) => rank(a) - rank(b) || (a.popularityRank || 999) - (b.popularityRank || 999));
}


// Album artwork for the song card, from Apple's public iTunes Search API
// (no account; only the song title and artist are sent). Cached on the
// device. Falls back to the artist's initials if offline.
const ART_KEY = "hk_song_art";
function artCache() {
  try { return JSON.parse(localStorage.getItem(ART_KEY) || "{}"); } catch (e) { return {}; }
}
async function songArt(song) {
  const id = `${song.title}|${song.artist}`;
  const cached = artCache()[id];
  if (cached) return cached;
  const term = encodeURIComponent(`${song.title} ${song.artist}`);
  const res = await fetch(`https://itunes.apple.com/search?term=${term}&entity=song&limit=5&country=us`);
  const data = await res.json();
  const hit = (data.results || []).find((r) => r.artistName?.toLowerCase().includes(song.artist.split(/[ ,&]/)[0].toLowerCase())) || data.results?.[0];
  if (!hit?.artworkUrl100) return null;
  const art = { img: hit.artworkUrl100.replace("100x100bb", "300x300bb"), url: hit.trackViewUrl || hit.collectionViewUrl || "" };
  try { localStorage.setItem(ART_KEY, JSON.stringify({ ...artCache(), [id]: art })); } catch (e) { /* ignore */ }
  return art;
}

// "Intro · Verse 1 · Chorus 1: D A Bm G" — the song's chords, section by
// section, with neighbouring sections that share chords grouped together.
function progressionRows(song) {
  const structure = SONG_STRUCTURES[song.title];
  if (!structure) return [{ label: "Whole song", chords: song.chords }];
  const rows = [];
  structure.forEach((part) => {
    const last = rows[rows.length - 1];
    const name = part.section.replace(/\s+\d+$/, "");
    if (last && last.chords.join() === part.chords.join()) {
      if (!last.names.includes(name)) last.names.push(name);
    } else rows.push({ names: [name], chords: part.chords });
  });
  return rows.map((r) => ({ label: r.names.join(" · "), chords: r.chords }));
}

const initials = (name) => name.split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();

function initPracticeHome(root) {
  let list = songList();
  let player = null;

  function showHome() {
    player?.suspend?.();
    player = null;
    list = songList();
    const unlocked = new Set(unlockedSongs());
    const saved = getSavedSongs();
    root.innerHTML = `
      <div class="hk-ph">
        <section class="hk-ph-upload">
          <div class="hk-ph-upload-head"><div class="hk-ph-panda">${pandaSvg("sing")}</div>
            <div><h2>Upload any song</h2><p>We'll find the chords for you and show them falling onto the piano.</p></div></div>
          <label class="hk-upload-pick" for="hk-ph-file">${icon("folder", 24)} Choose a song</label>
          <input type="file" id="hk-ph-file" class="hk-upload-input" accept="audio/*,video/*" />
          <p class="hk-upload-fine">(Hayden Keys is for entertainment and learning only. We've added this feature for you to record any song from your phone and upload it, only for the purpose of learning the songs you love and support the artists who create beautiful things in this world. The real fun begins when you get inspired and create your own original music! Our model runs on your device only, we don't store any data.)</p>
          <div id="hk-ph-status" class="hk-cal-status"></div>
          <div id="hk-ph-playback"></div>
        </section>
        <h2 class="hk-ph-title">Or try these songs</h2>
        <div class="hk-ph-list">
          ${list.map((s, i) => `
            <button class="hk-ph-song" data-i="${i}">
              ${icon(unlocked.has(s.title) ? "gift" : saved[s.title]?.status === "completed" ? "check" : "song", 34)}
              <span class="hk-ph-song-body"><b>${esc(s.title)}</b><span>${esc(s.artist)} · ${getDifficulty(s)}</span></span>
              ${unlocked.has(s.title) ? '<span class="hk-ph-tag">Unlocked</span>' : ""}
              ${icon("play", 30)}
            </button>`).join("")}
        </div>
      </div>`;
    root.querySelectorAll(".hk-ph-song").forEach((b) => b.addEventListener("click", () => openSong(Number(b.dataset.i))));
    const status = root.querySelector("#hk-ph-status");
    root.querySelector("#hk-ph-file").addEventListener("change", async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      try {
        const notes = await transcribeFile(file, (t) => { status.textContent = t; });
        status.textContent = `Done — detected ${notes.length} notes. Saved to My songs.`;
        saveUpload(file, notes);
        renderTranscribedPlayback(root.querySelector("#hk-ph-playback"), notes, { file });
      } catch (err) {
        status.textContent = err.message;
      }
    });
  }

  function openSong(i, { autoplay = false } = {}) {
    const song = list[i];
    if (!song) return showHome();
    root.innerHTML = `
      <div class="hk-player-bar">
        <button class="hk-btn hk-player-back">← All songs</button>
        <button class="hk-btn hk-btn-primary hk-player-next">Next song →</button>
      </div>
      <div class="hk-song-card">
        <a class="hk-song-art" id="hk-song-art" aria-label="${esc(song.title)} cover art"><span>${esc(initials(song.artist))}</span></a>
        <div class="hk-song-info">
          <h2>${esc(song.title)}</h2>
          <p>${esc(song.artist)}</p>
          <span class="hk-song-key">${icon("piano", 18)} Key of ${esc(song.key.replace(/\s*\(.*\)/, ""))}</span>
        </div>
      </div>
      <div class="hk-song-prog">
        <div class="hk-song-prog-title">The chords in this song</div>
        ${progressionRows(song).map((r) => `<div class="hk-song-prog-row"><span>${esc(r.label)}</span><b>${r.chords.map((c) => `<i>${esc(c)}</i>`).join("")}</b></div>`).join("")}
      </div>
      ${SONG_VIDEOS[song.title] ? `<div class="hk-player-video">${videoHtml(SONG_VIDEOS[song.title])}</div>` : ""}
      <div class="hk-player-tip">${icon("piano", 20)} Press Play, watch the chords fall and play along on your own piano.</div>
      <div class="hk-practice-simple" id="hk-player"></div>
      <div class="hk-player-share">${shareButton(song.title, "I learned it! Share")}</div>`;
    wireVideos(root);
    songArt(song).then((art) => {
      const el = root.querySelector("#hk-song-art");
      if (!art || !el) return;
      el.innerHTML = `<img src="${art.img}" alt="" />`;
      if (art.url) { el.href = art.url; el.target = "_blank"; el.rel = "noopener"; }
    }).catch(() => {});
    root.querySelector(".hk-player-back").addEventListener("click", showHome);
    root.querySelector(".hk-player-next").addEventListener("click", () => openSong((i + 1) % list.length));
    player = initPracticeTab(root.querySelector("#hk-player"), { initialSong: song });
    if (!getSavedSongs()[song.title]) markSongStatus(song.title, "started");
    window.scrollTo(0, 0);
    if (autoplay) setTimeout(() => root.querySelector("#hk-playpause")?.click(), 300);
  }

  function openByTitle(title) {
    list = songList();
    const i = list.findIndex((s) => s.title === title);
    if (i >= 0) openSong(i);
  }

  showHome();
  return { showHome, openByTitle, suspend: () => player?.suspend?.(), resume: () => player?.resume?.() };
}

export { initPracticeHome };
