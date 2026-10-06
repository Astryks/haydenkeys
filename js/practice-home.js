// Practice tab: "Upload any song", then "Or try these songs". Tapping a
// song opens the piano and starts playing straight away: the chords fall
// like Tetris blocks and the learner follows along on their own piano
// (no need to touch the screen). ← All songs / Next song → move between them.

import { SONGS, getDifficulty } from "./songs-data.js";
import { initPracticeTab } from "./practice.js";
import { transcribeFile, renderTranscribedPlayback } from "./transcribe.js";
import { unlockedSongs } from "./rewards.js";
import { getSavedSongs, markSongStatus } from "./storage.js";
import { saveUpload } from "./my-uploads.js";
import { icon } from "./icons.js";
import { pandaSvg } from "./panda.js";
import { shareButton } from "./share.js";

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
          <p class="hk-upload-fine">(Hayden Keys is for entertainment and learning only. We don't support copying songs from YouTube or other links without the artist's permission. This feature is here so you can learn the songs you love, and support the artists who create beautiful things in our world. It all runs on your device; nothing is uploaded.)</p>
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

  function openSong(i, { autoplay = true } = {}) {
    const song = list[i];
    if (!song) return showHome();
    root.innerHTML = `
      <div class="hk-player-bar">
        <button class="hk-btn hk-player-back">← All songs</button>
        <div class="hk-player-title"><b>${esc(song.title)}</b><span>${esc(song.artist)}</span></div>
        <button class="hk-btn hk-btn-primary hk-player-next">Next song →</button>
      </div>
      <div class="hk-player-tip">${icon("piano", 20)} Watch the chords fall and play along on your own piano. No need to touch the screen!</div>
      <div class="hk-player-share">${shareButton(song.title, "I learned it! Share")}</div>
      <div class="hk-practice-simple" id="hk-player"></div>`;
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
