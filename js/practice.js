import { SONGS, SONG_STRUCTURES } from "./songs-data.js";
import { renderKeyboard, playChord, playTone } from "./keyboard.js";
import { chordSymbolToMidi, parseChordSymbol } from "./chord-utils.js";
import { initCalibration } from "./calibration.js";
import { getCalibration } from "./storage.js";
import { startLivePitchDetection } from "./pitch.js";
import { initCameraOverlay } from "./camera-overlay.js";
import { renderNoteHighway, stepsToHighwayNotes } from "./note-highway.js";

const CHORD_DURATION_SEC = 1.6;
const MODES = ["follow", "ear", "camera"];
const MODE_LABELS = {
  follow: "Follow Along",
  ear: "Ear Check",
  camera: "Camera Overlay",
};

// Flattens a song into a sequence of {chord, section} steps. Songs with
// a full SONG_STRUCTURES entry play through once, start to finish, with
// real section labels. Songs without one fall back to looping their
// simple 4-ish-chord `chords` array forever — the honest "main riff"
// view, not pretending every song has full-structure data.
function getSongSteps(song) {
  const structure = SONG_STRUCTURES[song.title];
  if (structure) {
    const steps = [];
    structure.forEach((section) => {
      section.chords.forEach((chord) => steps.push({ chord, section: section.section }));
    });
    return { steps, loops: false };
  }
  return { steps: song.chords.map((c) => ({ chord: c, section: null })), loops: true };
}

function initPracticeTab(root, { initialSong } = {}) {
  let currentSong = initialSong || SONGS[0];
  let mode = "follow";
  let raf = null;
  let playing = false;
  let pausedAt = 0; // seconds into the song/loop
  let playStartedAt = 0;
  let lastChordIndex = -1;
  let kb = null;
  let highway = null;
  let highwayNotes = [];
  let songMeta = getSongSteps(currentSong);
  let ended = false; // true once a non-looping structured song finishes

  // Ear Check mode state
  let stopListening = null;
  let earCheckIndex = 0;

  function totalDuration() {
    return songMeta.steps.length * CHORD_DURATION_SEC;
  }

  function currentTime() {
    if (!playing) return pausedAt;
    return pausedAt + (performance.now() - playStartedAt) / 1000;
  }

  function render() {
    songMeta = getSongSteps(currentSong);
    ended = false;
    root.innerHTML = `
      <div class="hk-practice">
        <div class="hk-practice-header">
          <select id="hk-song-select">
            ${SONGS.map((s) => `<option value="${s.title}" ${s.title === currentSong.title ? "selected" : ""}>${s.title} — ${s.artist}</option>`).join("")}
          </select>
          <button class="hk-btn" id="hk-open-calibration">Calibrate keyboard</button>
        </div>
        <p class="hk-practice-meta">
          Key: ${currentSong.key} &middot; ${currentSong.degreeSequence}
          ${SONG_STRUCTURES[currentSong.title] ? `<span class="hk-badge hk-badge-match">Full song structure</span>` : `<span class="hk-badge" title="Only the main repeating loop is mapped for this song">Main loop only</span>`}
        </p>
        <div class="hk-mode-picker" id="hk-mode-picker">
          ${MODES.map((m) => `<button class="hk-mode-btn ${m === mode ? "hk-mode-active" : ""}" data-mode="${m}">${MODE_LABELS[m]}</button>`).join("")}
        </div>
        <p class="hk-mode-desc">${modeDescription()}</p>
        <div id="hk-highway" class="hk-highway-slot ${mode === "follow" ? "" : "hk-hidden"}"></div>
        <div id="hk-practice-keyboard" class="hk-keyboard-wrap"></div>
        <div id="hk-sections" class="hk-sections"></div>
        <div class="hk-timeline" id="hk-timeline">
          <div class="hk-timeline-track"></div>
          <div class="hk-timeline-cursor" id="hk-timeline-cursor"></div>
          ${songMeta.steps.map((s, i) => `<div class="hk-timeline-chord" style="left:${(i / songMeta.steps.length) * 100}%; width:${100 / songMeta.steps.length}%">${s.chord}</div>`).join("")}
        </div>
        <div class="hk-practice-controls" id="hk-practice-controls"></div>
        <div id="hk-ear-status" class="hk-cal-status"></div>
        <div id="hk-camera-panel" class="hk-camera-panel hk-hidden"></div>
        <div id="hk-calibration-panel" class="hk-calibration-panel hk-hidden"></div>
        <section class="hk-upload-section">
          <h3>Practice with your own recording</h3>
          <p>Upload a recording you made or legally own. Transcription runs
             locally in your browser using Spotify's <code>basic-pitch</code>
             (Apache-2.0, via TensorFlow.js), vendored directly in this repo
             — no CDN, nothing uploaded to a server. See
             THIRD_PARTY_NOTICES.md for license details.</p>
          <input type="file" id="hk-audio-upload" accept="audio/*" />
          <div id="hk-upload-status" class="hk-cal-status"></div>
        </section>
      </div>`;

    const kbWrap = root.querySelector("#hk-practice-keyboard");
    kb = renderKeyboard(kbWrap, { startMidi: 48, endMidi: 84 });

    const highwayWrap = root.querySelector("#hk-highway");
    if (highway) highway.destroy();
    highway = renderNoteHighway(highwayWrap, kb.keyLayout);
    highwayNotes = stepsToHighwayNotes(songMeta.steps, CHORD_DURATION_SEC, chordSymbolToMidi);

    root.querySelector("#hk-song-select").addEventListener("change", (e) => {
      stopAll();
      currentSong = SONGS.find((s) => s.title === e.target.value);
      render();
    });
    root.querySelectorAll("[data-mode]").forEach((btn) => {
      btn.addEventListener("click", () => {
        stopAll();
        mode = btn.dataset.mode;
        render();
      });
    });
    root.querySelector("#hk-open-calibration").addEventListener("click", toggleCalibration);
    root.querySelector("#hk-timeline").addEventListener("pointerdown", onPlayheadDown);
    root.querySelector("#hk-audio-upload").addEventListener("change", handleUpload);

    renderSections();
    renderControls();
    updateCursor();
    if (mode === "follow" && highway) highway.render(pausedAt, highwayNotes);

    if (mode === "camera") startCameraMode();
  }

  function modeDescription() {
    if (mode === "follow") return "Notes fall down the highway toward the hit line above each key, timed so they arrive exactly when you should play them — plus the keyboard highlights each chord as it plays. Amber = left hand, purple = right hand. No microphone needed.";
    if (mode === "ear") return "Play each chord's root note on your real piano — the mic listens via the same pitch tracker used for calibration and advances when you get it right.";
    return "Point your camera at your real keyboard. After a quick two-tap calibration, the next key to press is highlighted right on the video.";
  }

  function renderControls() {
    const controls = root.querySelector("#hk-practice-controls");
    if (mode === "camera") {
      controls.innerHTML = "";
      return;
    }
    if (mode === "ear") {
      controls.innerHTML = `<button class="hk-btn" id="hk-rewind">⏮ Restart</button>`;
      controls.querySelector("#hk-rewind").addEventListener("click", () => {
        stopEarCheck();
        startEarCheck();
      });
      startEarCheck();
      return;
    }
    controls.innerHTML = `
      <button class="hk-btn" id="hk-rewind">⏮ Rewind</button>
      <button class="hk-btn hk-btn-primary" id="hk-playpause">▶ Play</button>`;
    controls.querySelector("#hk-playpause").addEventListener("click", togglePlay);
    controls.querySelector("#hk-rewind").addEventListener("click", rewind);
  }

  function renderSections() {
    const el = root.querySelector("#hk-sections");
    const structure = SONG_STRUCTURES[currentSong.title];
    if (!structure) {
      el.innerHTML = "";
      return;
    }
    el.innerHTML = structure
      .map((s) => `<span class="hk-section-pill" data-section="${s.section}">${s.section}</span>`)
      .join("");
  }

  function highlightActiveSection(section) {
    root.querySelectorAll(".hk-section-pill").forEach((el) => {
      el.classList.toggle("hk-section-active", el.dataset.section === section);
    });
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

  // --- Draggable playhead ------------------------------------------------
  // Real pointer-drag scrubbing on the timeline, not just click-to-seek.
  // Snaps to the nearest chord-cell boundary (chords don't have a
  // meaningful "position within a cell") rather than arbitrary sub-cell
  // positions. Pauses playback during the drag (resuming afterward if it
  // was playing) so chord audio doesn't rapid-fire while scrubbing, but
  // the keyboard highlight, active section pill, and falling-note highway
  // all update live on every pointermove — not just the visual line —
  // because they're driven by the same seekToStep() that actually moves
  // pausedAt/playStartedAt, the real playback clock.
  let dragging = false;
  let wasPlayingBeforeDrag = false;

  function stepIndexFromClientX(clientX) {
    const track = root.querySelector("#hk-timeline");
    const rect = track.getBoundingClientRect();
    const fraction = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    const rawIndex = Math.floor(fraction * songMeta.steps.length);
    return Math.max(0, Math.min(songMeta.steps.length - 1, rawIndex));
  }

  // Moves actual playback position to the start of the given chord-step
  // index and refreshes every view that depends on current position
  // (timeline cursor, keyboard hand-highlight, active section pill, and
  // the Follow Along falling-note highway).
  function seekToStep(stepIndex) {
    pausedAt = stepIndex * CHORD_DURATION_SEC;
    playStartedAt = performance.now();
    ended = false;
    lastChordIndex = stepIndex;
    const step = songMeta.steps[stepIndex];
    if (step) {
      const midiNotes = chordSymbolToMidi(step.chord);
      if (kb && midiNotes.length) {
        kb.highlightHands({ left: [midiNotes[0] - 12], right: midiNotes, rightLabel: step.chord });
      }
      highlightActiveSection(step.section);
    }
    updateCursor();
    if (mode === "follow" && highway) {
      const loopedT = songMeta.loops ? pausedAt % totalDuration() : pausedAt;
      highway.render(loopedT, highwayNotes);
    }
  }

  function onPlayheadDown(e) {
    if (mode === "ear" || mode === "camera") return;
    dragging = true;
    wasPlayingBeforeDrag = playing;
    if (playing) {
      playing = false;
      cancelAnimationFrame(raf);
      const btn = root.querySelector("#hk-playpause");
      if (btn) btn.textContent = "▶ Play";
    }
    seekToStep(stepIndexFromClientX(e.clientX));
    window.addEventListener("pointermove", onPlayheadMove);
    window.addEventListener("pointerup", onPlayheadUp, { once: true });
  }
  function onPlayheadMove(e) {
    if (!dragging) return;
    seekToStep(stepIndexFromClientX(e.clientX));
  }
  function onPlayheadUp() {
    dragging = false;
    window.removeEventListener("pointermove", onPlayheadMove);
    if (wasPlayingBeforeDrag) {
      playing = true;
      const btn = root.querySelector("#hk-playpause");
      if (btn) btn.textContent = "⏸ Pause";
      playStartedAt = performance.now();
      loop();
    }
  }

  function togglePlay() {
    if (ended) rewind();
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
    ended = false;
    updateCursor();
    if (mode === "follow" && highway) highway.render(0, highwayNotes);
  }

  function stopAll() {
    playing = false;
    cancelAnimationFrame(raf);
    pausedAt = 0;
    lastChordIndex = -1;
    ended = false;
    stopEarCheck();
    stopCameraMode();
  }

  function updateCursor() {
    const total = totalDuration();
    const t = songMeta.loops ? currentTime() % total : Math.min(currentTime(), total);
    const pct = total > 0 ? (t / total) * 100 : 0;
    const cursor = root.querySelector("#hk-timeline-cursor");
    if (cursor) cursor.style.left = `${pct}%`;
  }

  function loop() {
    const total = totalDuration();
    let t = currentTime();
    if (!songMeta.loops && t >= total) {
      t = total;
      playing = false;
      ended = true;
      const btn = root.querySelector("#hk-playpause");
      if (btn) btn.textContent = "▶ Play";
      const step = songMeta.steps[songMeta.steps.length - 1];
      if (step) highlightActiveSection(step.section);
      updateCursor();
      if (mode === "follow" && highway) highway.render(t, highwayNotes);
      return;
    }
    const loopedT = songMeta.loops ? t % total : t;
    const chordIndex = Math.min(songMeta.steps.length - 1, Math.floor(loopedT / CHORD_DURATION_SEC));
    if (chordIndex !== lastChordIndex) {
      lastChordIndex = chordIndex;
      const step = songMeta.steps[chordIndex];
      const midiNotes = chordSymbolToMidi(step.chord);
      if (kb && midiNotes.length) {
        kb.highlightHands({ left: [midiNotes[0] - 12], right: midiNotes, rightLabel: step.chord });
        playChord(midiNotes, { duration: CHORD_DURATION_SEC * 0.9 });
      }
      highlightActiveSection(step.section);
    }
    updateCursor();
    if (mode === "follow" && highway) highway.render(loopedT, highwayNotes);
    if (playing) raf = requestAnimationFrame(loop);
  }

  // --- Ear Check mode: mic-verified step-by-step practice ---------------
  //
  // Honest scope limit: the reused pitch tracker (pitch.js) is a
  // monophonic detector — it finds one fundamental frequency, not a full
  // chord. So Ear Check verifies that you played the chord's ROOT note
  // correctly (e.g. the G in a G major chord), not all three notes of
  // the triad. That's a real, stated limitation, not silently glossed
  // over — true polyphonic chord detection is a much bigger undertaking
  // than this pass's scope.
  async function startEarCheck() {
    earCheckIndex = 0;
    pausedAt = 0;
    updateCursor();
    showEarCheckStep();
    const statusEl = root.querySelector("#hk-ear-status");
    try {
      stopListening = await startLivePitchDetection((result) => {
        if (!result || earCheckIndex >= songMeta.steps.length) return;
        const step = songMeta.steps[earCheckIndex];
        const parsed = parseChordSymbol(step.chord);
        if (!parsed) return;
        const expectedPitchClass = parsed.root;
        const heardPitchClass = ((Math.round(result.noteMidi) % 12) + 12) % 12;
        if (heardPitchClass === expectedPitchClass && Math.abs(result.cents) < 45) {
          statusEl.textContent = `Correct — that's ${step.chord}'s root note.`;
          statusEl.classList.add("hk-ear-correct");
          earCheckIndex++;
          pausedAt = earCheckIndex * CHORD_DURATION_SEC;
          updateCursor();
          if (earCheckIndex >= songMeta.steps.length) {
            statusEl.textContent = songMeta.loops
              ? "Loop complete — starting over."
              : "Song complete! Press Restart to go again.";
            if (songMeta.loops) {
              earCheckIndex = 0;
              pausedAt = 0;
            }
          }
          setTimeout(showEarCheckStep, 400);
        }
      });
    } catch (err) {
      statusEl.textContent = `Microphone access failed (${err.message}) — Ear Check needs the mic. Try Follow Along instead.`;
    }
  }

  function showEarCheckStep() {
    if (earCheckIndex >= songMeta.steps.length) return;
    const step = songMeta.steps[earCheckIndex];
    const midiNotes = chordSymbolToMidi(step.chord);
    if (kb && midiNotes.length) kb.highlightChord(midiNotes, { letter: step.chord, rootMidi: midiNotes[0] });
    highlightActiveSection(step.section);
    const statusEl = root.querySelector("#hk-ear-status");
    if (statusEl) {
      statusEl.classList.remove("hk-ear-correct");
      statusEl.textContent = `Play the root of ${step.chord} on your real piano...`;
    }
  }

  function stopEarCheck() {
    if (stopListening) {
      stopListening();
      stopListening = null;
    }
    const statusEl = root.querySelector("#hk-ear-status");
    if (statusEl) statusEl.textContent = "";
  }

  // --- Camera Overlay mode -----------------------------------------------
  function startCameraMode() {
    const panel = root.querySelector("#hk-camera-panel");
    panel.classList.remove("hk-hidden");
    initCameraOverlay(panel, {
      getCurrentStep: () => songMeta.steps[earCheckIndex] || songMeta.steps[0],
      calibration: getCalibration(),
    });
  }
  function stopCameraMode() {
    const panel = root.querySelector("#hk-camera-panel");
    if (panel) {
      panel.classList.add("hk-hidden");
      panel.innerHTML = "";
    }
  }

  // --- Upload-your-own-audio transcription (basic-pitch, Apache-2.0) ---
  // basic-pitch requires mono audio at exactly 22050 Hz. decodeAudioData
  // gives back whatever sample rate the source file/container actually
  // used (commonly 44100/48000 Hz, and stereo) — e.g. a real bug caught
  // in testing: uploading fortnite.mp4 decoded fine (decodeAudioData
  // already pulls the audio track out of a video container on its own)
  // but then failed inside basic-pitch with "Input audio buffer is not
  // at correct sample rate! Is 48000. Should be 22050." This resamples
  // AND downmixes to mono via an OfflineAudioContext rendered at the
  // target rate — a standard technique, no new dependency. Connecting a
  // multi-channel source to a 1-channel destination downmixes
  // automatically per the Web Audio spec's channel-interpretation rules
  // (equal-power sum of channels), which is the normal mono-summing
  // approach.
  async function resampleToMono22050(audioBuffer) {
    const targetRate = 22050;
    if (audioBuffer.sampleRate === targetRate && audioBuffer.numberOfChannels === 1) {
      return audioBuffer; // already in the right format, nothing to do
    }
    const length = Math.ceil(audioBuffer.duration * targetRate);
    const offlineCtx = new OfflineAudioContext(1, length, targetRate);
    const source = offlineCtx.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(offlineCtx.destination);
    source.start(0);
    return offlineCtx.startRendering();
  }

  async function handleUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const statusEl = root.querySelector("#hk-upload-status");

    // Decode first (format/sample-rate issues are unrelated to network
    // access, and reported with their own distinct message).
    let audioBuffer;
    try {
      statusEl.textContent = "Decoding audio...";
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const arrayBuffer = await file.arrayBuffer();
      const decoded = await audioCtx.decodeAudioData(arrayBuffer);
      statusEl.textContent = `Resampling from ${decoded.sampleRate} Hz / ${decoded.numberOfChannels}ch to 22050 Hz mono...`;
      audioBuffer = await resampleToMono22050(decoded);
    } catch (err) {
      statusEl.textContent = `Couldn't decode this file: ${err.message}. Try a standard mp3, wav, or mp4/mov file.`;
      console.error(err);
      return;
    }

    // basic-pitch (code + model weights) is vendored locally in
    // js/vendor/basic-pitch/ — no runtime CDN dependency. This protects
    // against unpkg/esm.sh dropping the package or Spotify archiving the
    // project out from under a live site; Apache-2.0 explicitly permits
    // redistribution. See THIRD_PARTY_NOTICES.md for exact version/
    // provenance. A failure here now means a genuinely different problem
    // than "no internet" (since nothing is fetched from a CDN anymore) —
    // most likely the browser itself lacking WebGL/WASM support that
    // TensorFlow.js needs — reported as such rather than blaming the
    // network for something no longer network-dependent.
    let BasicPitch, outputToNotesPoly, addPitchBendsToNoteEvents, noteFramesToTime, basicPitch;
    try {
      statusEl.textContent = "Loading transcription model (vendored locally, no network needed)...";
      ({ BasicPitch, outputToNotesPoly, addPitchBendsToNoteEvents, noteFramesToTime } =
        await import("./vendor/basic-pitch/basic-pitch.bundle.js"));
      basicPitch = new BasicPitch(new URL("./vendor/basic-pitch/model/model.json", import.meta.url).href);
    } catch (err) {
      statusEl.textContent = `Couldn't load the local transcription model (${err.message}). This usually means your browser lacks WebGL/WASM support for TensorFlow.js.`;
      console.error(err);
      return;
    }

    try {
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
      statusEl.textContent = `Transcription failed: ${err.message}.`;
      console.error(err);
    }
  }

  render();
}

export { initPracticeTab };
