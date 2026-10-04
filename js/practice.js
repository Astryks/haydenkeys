import { SONGS } from "./songs-data.js";
import { renderKeyboard, playChord } from "./keyboard.js";
import { chordSymbolToMidi } from "./chord-utils.js";
import { initCalibration } from "./calibration.js";
import { getCalibration } from "./storage.js";

const CHORD_DURATION_SEC = 1.6;

function initPracticeTab(root, { initialSong } = {}) {
  let currentSong = initialSong || SONGS[0];
  let raf = null;
  let playing = false;
  let pausedAt = 0; // seconds into the loop
  let playStartedAt = 0; // performance.now() reference
  let lastChordIndex = -1;
  let kb = null;

  function totalDuration() {
    return currentSong.chords.length * CHORD_DURATION_SEC;
  }

  function currentTime() {
    if (!playing) return pausedAt;
    return pausedAt + (performance.now() - playStartedAt) / 1000;
  }

  function render() {
    root.innerHTML = `
      <div class="hk-practice">
        <div class="hk-practice-header">
          <select id="hk-song-select">
            ${SONGS.map((s) => `<option value="${s.title}" ${s.title === currentSong.title ? "selected" : ""}>${s.title} — ${s.artist}</option>`).join("")}
          </select>
          <button class="hk-btn" id="hk-open-calibration">Calibrate keyboard</button>
        </div>
        <p class="hk-practice-meta">Key: ${currentSong.key} &middot; ${currentSong.degreeSequence}</p>
        <div id="hk-practice-keyboard" class="hk-keyboard-wrap"></div>
        <div class="hk-timeline" id="hk-timeline">
          <div class="hk-timeline-track"></div>
          <div class="hk-timeline-cursor" id="hk-timeline-cursor"></div>
          ${currentSong.chords.map((c, i) => `<div class="hk-timeline-chord" style="left:${(i / currentSong.chords.length) * 100}%; width:${100 / currentSong.chords.length}%">${c}</div>`).join("")}
        </div>
        <div class="hk-practice-controls">
          <button class="hk-btn" id="hk-rewind">⏮ Rewind</button>
          <button class="hk-btn hk-btn-primary" id="hk-playpause">▶ Play</button>
        </div>
        <div id="hk-calibration-panel" class="hk-calibration-panel hk-hidden"></div>
        <section class="hk-upload-section">
          <h3>Practice with your own recording</h3>
          <p>Upload a recording you made or legally own. Transcription runs
             locally in your browser using Spotify's <code>basic-pitch</code>
             (Apache-2.0, via TensorFlow.js) — nothing is uploaded to a server.
             See THIRD_PARTY_NOTICES.md for license details.</p>
          <input type="file" id="hk-audio-upload" accept="audio/*" />
          <div id="hk-upload-status" class="hk-cal-status"></div>
        </section>
      </div>`;

    const kbWrap = root.querySelector("#hk-practice-keyboard");
    kb = renderKeyboard(kbWrap, { startMidi: 48, endMidi: 84 });

    root.querySelector("#hk-song-select").addEventListener("change", (e) => {
      stop();
      currentSong = SONGS.find((s) => s.title === e.target.value);
      render();
    });
    root.querySelector("#hk-playpause").addEventListener("click", togglePlay);
    root.querySelector("#hk-rewind").addEventListener("click", rewind);
    root.querySelector("#hk-open-calibration").addEventListener("click", toggleCalibration);
    root.querySelector("#hk-timeline").addEventListener("pointerdown", scrub);
    root.querySelector("#hk-audio-upload").addEventListener("change", handleUpload);

    updateCursor();
  }

  function toggleCalibration() {
    const panel = root.querySelector("#hk-calibration-panel");
    const hidden = panel.classList.toggle("hk-hidden");
    if (!hidden) {
      initCalibration(panel, {
        onComplete: () => {
          panel.classList.add("hk-hidden");
        },
      });
    }
  }

  function scrub(e) {
    const track = e.currentTarget;
    const rect = track.getBoundingClientRect();
    const fraction = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    pausedAt = fraction * totalDuration();
    playStartedAt = performance.now();
    lastChordIndex = -1;
    updateCursor();
  }

  function togglePlay() {
    playing = !playing;
    root.querySelector("#hk-playpause").textContent = playing ? "⏸ Pause" : "▶ Play";
    if (playing) {
      playStartedAt = performance.now();
      loop();
    } else {
      pausedAt = currentTime();
      cancelAnimationFrame(raf);
    }
  }

  function rewind() {
    pausedAt = 0;
    playStartedAt = performance.now();
    lastChordIndex = -1;
    updateCursor();
  }

  function stop() {
    playing = false;
    cancelAnimationFrame(raf);
    pausedAt = 0;
    lastChordIndex = -1;
  }

  function updateCursor() {
    const t = currentTime() % totalDuration();
    const pct = (t / totalDuration()) * 100;
    const cursor = root.querySelector("#hk-timeline-cursor");
    if (cursor) cursor.style.left = `${pct}%`;
  }

  function loop() {
    const t = currentTime() % totalDuration();
    const chordIndex = Math.floor(t / CHORD_DURATION_SEC);
    if (chordIndex !== lastChordIndex) {
      lastChordIndex = chordIndex;
      const symbol = currentSong.chords[chordIndex];
      const midiNotes = chordSymbolToMidi(symbol);
      if (kb && midiNotes.length) {
        kb.highlightChord(midiNotes, { letter: symbol, rootMidi: midiNotes[0] });
        playChord(midiNotes, { duration: CHORD_DURATION_SEC * 0.9 });
      }
    }
    updateCursor();
    if (playing) raf = requestAnimationFrame(loop);
  }

  // --- Upload-your-own-audio transcription (basic-pitch, Apache-2.0) ---
  async function handleUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const statusEl = root.querySelector("#hk-upload-status");
    statusEl.textContent = "Loading transcription model (first use downloads ~a few MB, cached after)...";
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const arrayBuffer = await file.arrayBuffer();
      const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

      const { BasicPitch, outputToNotesPoly, addPitchBendsToNoteEvents, noteFramesToTime } =
        await import("https://esm.sh/@spotify/basic-pitch@1.0.1?bundle");
      const basicPitch = new BasicPitch(
        "https://unpkg.com/@spotify/basic-pitch@1.0.1/model/model.json"
      );

      const frames = [];
      const onsets = [];
      const contours = [];
      statusEl.textContent = "Transcribing in your browser (this can take a while for longer clips)...";
      await basicPitch.evaluateModel(
        audioBuffer,
        (f, o, c) => {
          frames.push(...f);
          onsets.push(...o);
          contours.push(...c);
        },
        (progress) => {
          statusEl.textContent = `Transcribing... ${Math.round(progress * 100)}%`;
        }
      );
      const notes = noteFramesToTime(
        addPitchBendsToNoteEvents(contours, outputToNotesPoly(frames, onsets, 0.25, 0.25, 5))
      );
      statusEl.textContent = `Done — detected ${notes.length} notes. (Playback of transcribed notes is a Phase 2 item; this confirms transcription itself works.)`;
      console.log("Hayden Keys: basic-pitch transcription result", notes);
    } catch (err) {
      statusEl.textContent = `Transcription failed in this browser/environment: ${err.message}. This feature needs network access to fetch the model and a browser with WebGL/TensorFlow.js support.`;
      console.error(err);
    }
  }

  render();
}

export { initPracticeTab };
