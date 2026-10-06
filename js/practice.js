import { icon } from "./icons.js";
import { pandaSvg } from "./panda.js";
import { SONGS, SONG_STRUCTURES, ONE_FIVE_SIX_FOUR_SONGS } from "./songs-data.js";
import { renderKeyboard, playChord, playTone } from "./keyboard.js";
import { chordSymbolToMidi, parseChordSymbol } from "./chord-utils.js";
import { initCalibration } from "./calibration.js";
import { getCalibration } from "./storage.js";
import { startLivePitchDetection } from "./pitch.js";
import { initCameraOverlay } from "./camera-overlay.js";
import { renderNoteHighway, stepsToHighwayNotes } from "./note-highway.js";
import { transcribeFile, renderTranscribedPlayback } from "./transcribe.js";
import { playBeat } from "./drums.js";
import { getAudioContext } from "./keyboard.js";
import { onNoteOn, onChroma, enableMic, disableMic, micOn } from "./input-hub.js";

const BASE_CHORD_DURATION_SEC = 1.6; // duration per chord at 1x (normal) speed
const SPEEDS = [0.5, 0.75, 1];
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
//
// Item 56: only real, parseable chord symbols become steps. A handful of
// songs keep a prose caveat ("insufficient data — see notes") inside
// their `chords` array; as a step it showed that sentence on the
// timeline, played nothing, and left Ear Check waiting forever for a
// root note that doesn't exist. Same filter idea as Discover's
// realChords().
// part "whole": the song start to finish from its section map (verses,
// bridge, solos, key changes); part "main": just the main chords, looping.
function getSongSteps(song, part = "whole") {
  const isReal = (c) => parseChordSymbol(c) !== null;
  const structure = part === "main" ? null : SONG_STRUCTURES[song.title];
  if (structure) {
    const steps = [];
    // Item 57: each chord gets its real share of the section's length
    // (`bars` / number of chords — e.g. 4 chords over an 8-bar verse =
    // 2 bars each). This used to give every chord the same length, so
    // a section's timing only matched the song when bars = chords.
    structure.forEach((section) => {
      const real = section.chords.filter(isReal);
      const len = section.bars && real.length ? section.bars / real.length : 1;
      real.forEach((chord) => steps.push({ chord, section: section.section, len }));
    });
    if (steps.length) return withTiming({ steps, loops: false });
  }
  const steps = song.chords.filter(isReal).map((c) => ({ chord: c, section: null, len: 1 }));
  // Nothing playable at all: one harmless C step so the tab still
  // renders, with the song's own notes explaining the gap.
  return withTiming({ steps: steps.length ? steps : [{ chord: "C", section: null, len: 1 }], loops: true, noRealChords: !steps.length });
}

// Cumulative start of each step, in bars, plus the total length.
function withTiming(meta) {
  let acc = 0;
  meta.starts = meta.steps.map((st) => {
    const at = acc;
    acc += st.len;
    return at;
  });
  meta.totalBars = acc;
  return meta;
}

// Index of the step sounding at `bars` into the song.
function stepIndexAtBars(meta, bars) {
  let i = 0;
  while (i + 1 < meta.starts.length && meta.starts[i + 1] <= bars + 1e-9) i++;
  return i;
}

// Item 56: Practice used to be re-initialised (initPracticeTab) every
// time a song was opened from Discover/Saved, on the SAME panel, without
// stopping the previous copy — its playback loop, Ear Check mic, camera
// and calibration mic all kept running underneath the new one (ghost
// chords, a live mic indicator on iOS). Exactly one live instance now:
// starting a new one tears the previous one down first.
let activePractice = null;

function initPracticeTab(root, { initialSong, part = "whole" } = {}) {
  if (activePractice) activePractice.destroy();
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
  let songMeta = getSongSteps(currentSong, part);
  let ended = false; // true once a non-looping structured song finishes
  let playbackSpeed = 1;
  // Item 45: optional drum layer under Follow Along playback, default
  // off (same spirit as every other optional add-on in this app — on
  // by explicit choice, never forced into the default experience).
  let drumsOn = false;
  let lastBeatSlot = -1;
  // Item 56: optional bass line (the chord's root, low, on beats 1 and
  // 3) — a second backing instrument alongside the beat, same off-by-
  // default rule and same clock.
  let bassOn = false;
  let lastBassSlot = -1;
  // Item 57: the default practice tempo is the same for every song (one
  // bar = BASE_CHORD_DURATION_SEC at 1x) — this app has no verified
  // per-song BPM data, and says so. Tap tempo lets you match the real
  // recording: tap 4+ times on the beat, and one bar becomes 4 of those
  // beats.
  let tappedBpm = null;
  let tapTimes = [];

  // "Wait for me": the falling chords stop at the line until the learner
  // plays that chord — on the screen, a MIDI keyboard, or their real piano
  // through the microphone (only used to hear the piano keys).
  let waitOn = false;
  let holding = false;
  let waitIdx = -1;
  let heard = [];
  let chromaHits = 0;
  let micForWait = false;
  let micPaused = false;
  const targetPcs = () => {
    const step = songMeta.steps[waitIdx];
    return step ? [...new Set(chordSymbolToMidi(step.chord).map((m) => ((m % 12) + 12) % 12))] : [];
  };
  function waitSatisfied() {
    if (!holding) return;
    holding = false;
    heard = [];
    chromaHits = 0;
    playStartedAt = performance.now();
    showWait(`${icon("check", 20)} Nice!`, true);
  }
  function showWait(html, ok = false) {
    const el = root.querySelector("#hk-wait-status");
    if (!el) return;
    el.classList.toggle("hk-hidden", !waitOn);
    el.classList.toggle("hk-wait-ok", ok);
    el.innerHTML = html;
  }
  const unsubWaitNote = onNoteOn((midi, source) => {
    if (!waitOn || !holding) return;
    const now = performance.now();
    heard = heard.filter((h) => now - h.t < 3000);
    heard.push({ pc: ((midi % 12) + 12) % 12, t: now });
    const want = targetPcs();
    const got = new Set(heard.map((h) => h.pc).filter((pc) => want.includes(pc)));
    // The microphone hears one clear note at a time; for a chord, its root
    // or any two of its notes count (the chord check below hears the rest).
    const enough = source === "mic" ? got.has(want[0]) || got.size >= 2 : got.size >= want.length;
    if (enough) waitSatisfied();
  });
  const unsubWaitChroma = onChroma((chroma, level) => {
    if (!waitOn || !holding || level < 0.004) { chromaHits = 0; return; }
    const want = targetPcs();
    const inside = want.map((pc) => chroma[pc]);
    const outside = chroma.filter((_, pc) => !want.includes(pc));
    const inMean = inside.reduce((a, b) => a + b, 0) / inside.length;
    const outMean = outside.reduce((a, b) => a + b, 0) / outside.length;
    const match = Math.min(...inside) > 0.25 && inMean > outMean * 2.2;
    chromaHits = match ? chromaHits + 1 : 0;
    if (chromaHits >= 3) waitSatisfied();
  });

  // Ear Check mode state
  let stopListening = null;
  let earCheckIndex = 0;
  // Item 56: after a correct note, ignore input until the next step is
  // on screen — and if the next chord has the same root, until the mic
  // hears a gap first — so one held note can't skip through several
  // back-to-back identical chords.
  let earMatchLocked = false;
  let earNeedSilence = false;

  // Camera Overlay mode: its own step index (stepped with Prev/Next),
  // not Ear Check's — camera mode never advanced before.
  let cameraOverlay = null;
  let cameraStepIndex = 0;
  let calibration = null;
  let suspended = false;

  // The single tempo multiplier every piece of playback timing math
  // derives from — chord-change timing, the falling-note highway's fall
  // speed, and the draggable playhead's scrubbing all read this same
  // value, so they can't disagree or drift out of sync with each other.
  // 0.5x genuinely doubles each chord's on-screen duration (slower), not
  // just a CSS animation slowed down independently of the real timing.
  function chordDuration() {
    return BASE_CHORD_DURATION_SEC / playbackSpeed;
  }

  // Changing speed preserves *which chord* is currently at the playhead
  // (expressed as a fractional step position) rather than preserving the
  // raw elapsed seconds — e.g. "3.2 chords in" stays "3.2 chords in"
  // whether that's 5.12s at 1x or 10.24s at 0.5x. Every view that reads
  // position (timeline cursor, keyboard highlight, falling-note highway)
  // is re-derived from this same chordDuration(), so they can't drift
  // apart from each other when speed changes.
  function setSpeed(newSpeed) {
    const stepFraction = currentTime() / chordDuration();
    playbackSpeed = newSpeed;
    pausedAt = stepFraction * chordDuration();
    playStartedAt = performance.now();
    highwayNotes = stepsToHighwayNotes(songMeta.steps, chordDuration(), chordSymbolToMidi);
    root.querySelectorAll("[data-speed]").forEach((btn) => {
      btn.classList.toggle("hk-speed-active", Number(btn.dataset.speed) === playbackSpeed);
    });
    updateCursor();
    if (mode === "follow" && highway) {
      const total = totalDuration();
      const loopedT = songMeta.loops ? pausedAt % total : pausedAt;
      highway.render(loopedT, highwayNotes);
    }
  }

  function totalDuration() {
    return songMeta.totalBars * chordDuration();
  }

  function currentTime() {
    if (!playing || holding) return pausedAt;
    return pausedAt + (performance.now() - playStartedAt) / 1000;
  }

  function render() {
    songMeta = getSongSteps(currentSong, part);
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
        ${songMeta.noRealChords ? `<p class="hk-honest-note">This song's chords are still being verified, so there's nothing real to practice yet — the C chord below is only a placeholder. ${currentSong.notes || ""}</p>` : ""}
        <div class="hk-mode-picker" id="hk-mode-picker">
          ${MODES.map((m) => `<button class="hk-mode-btn ${m === mode ? "hk-mode-active" : ""}" data-mode="${m}">${MODE_LABELS[m]}</button>`).join("")}
        </div>
        <p class="hk-mode-desc">${modeDescription()}</p>
        <div class="hk-speed-picker" id="hk-speed-picker">
          <div class="hk-speed-mascot">${pandaSvg("think")}</div>
          <span class="hk-speed-label">Speed:</span>
          ${SPEEDS.map((s) => `<button class="hk-speed-btn ${s === playbackSpeed ? "hk-speed-active" : ""}" data-speed="${s}">${s}×${s === 1 ? " (normal)" : s === 0.5 ? " (slow)" : ""}</button>`).join("")}
          <button class="hk-btn hk-btn-small hk-drums-toggle ${drumsOn ? "hk-drums-on" : ""}" id="hk-drums-toggle"
                  title="Adds a simple drum beat while the song plays">
            ${drumLabel()}
          </button>
          <button class="hk-btn hk-btn-small" id="hk-tap-tempo"
                  title="Tap along with the real recording (4+ taps, one per beat) to practice at its actual tempo">
            ${icon("tap", 18)} Tap tempo${tappedBpm ? ` (♩ = ${tappedBpm})` : ""}
          </button>
          <button class="hk-btn hk-btn-small hk-drums-toggle hk-wait-toggle" id="hk-wait-toggle"
                  title="The notes wait at the line until you play them">
            ${waitLabel()}
          </button>
          <button class="hk-btn hk-btn-small hk-drums-toggle ${bassOn ? "hk-drums-on" : ""}" id="hk-bass-toggle"
                  title="Adds a low bass note (each chord's root) while the song plays">
            ${bassLabel()}
          </button>
        </div>
        <div id="hk-wait-panel" class="hk-wait-panel hk-hidden"></div>
        <div id="hk-wait-status" class="hk-wait-status hk-hidden"></div>
        <div id="hk-highway" class="hk-highway-slot ${mode === "follow" ? "" : "hk-hidden"}"></div>
        <div id="hk-practice-keyboard" class="hk-keyboard-wrap"></div>
        <div id="hk-sections" class="hk-sections"></div>
        <div class="hk-timeline" id="hk-timeline">
          <div class="hk-timeline-track"></div>
          <div class="hk-timeline-cursor" id="hk-timeline-cursor"></div>
          ${songMeta.steps.map((s, i) => `<div class="hk-timeline-chord" style="left:${(songMeta.starts[i] / songMeta.totalBars) * 100}%; width:${(s.len / songMeta.totalBars) * 100}%" title="${s.chord}"><span class="hk-timeline-chord-label">${s.chord}</span></div>`).join("")}
        </div>
        <div class="hk-practice-controls" id="hk-practice-controls"></div>
        <div id="hk-ear-status" class="hk-cal-status"></div>
        <div id="hk-camera-panel" class="hk-camera-panel hk-hidden"></div>
        <div id="hk-calibration-panel" class="hk-calibration-panel hk-hidden"></div>
        <section class="hk-upload-section">
          <h3>${icon("song", 26)} Upload any song and we'll find the chords for you!</h3>
          <p>Pick a song from your phone (a few seconds is enough). We'll show the notes falling onto the piano, the easy chords to play, and songs that use the same chords.</p>
          <label class="hk-upload-pick" for="hk-audio-upload">${icon("cassette", 24)} Choose a song</label>
          <p class="hk-upload-fine">(Hayden Keys is for entertainment and learning only. We've added this feature for you to record any song from your phone and upload it, only for the purpose of learning the songs you love and support the artists who create beautiful things in this world. The real fun begins when you get inspired and create your own original music! Our model runs on your device only, we don't store any data.)</p>
          <input type="file" id="hk-audio-upload" class="hk-upload-input" accept="audio/*,video/*" />
          <div id="hk-upload-status" class="hk-cal-status"></div>
          <div id="hk-upload-playback"></div>
        </section>
        <section class="hk-playbyear-section" id="hk-playbyear-section">
          <h3>🎧 Play what you hear</h3>
          <p>A different kind of practice: no falling notes, no chord names shown up front. Pick a song, listen
             to its chord progression, then try to replicate it on the keyboard below by ear. Replay as many
             times as you want, then reveal the real chords to check yourself.</p>
          <select id="hk-playbyear-song"></select>
          <div class="hk-playbyear-controls">
            <button class="hk-btn hk-btn-primary" id="hk-playbyear-play">&#9658; Play clip</button>
            <button class="hk-btn" id="hk-playbyear-reveal">Reveal chords</button>
          </div>
          <div id="hk-playbyear-answer" class="hk-honest-note"></div>
        </section>
      </div>`;

    const kbWrap = root.querySelector("#hk-practice-keyboard");
    kb = renderKeyboard(kbWrap, { startMidi: 48, endMidi: 84 });

    const highwayWrap = root.querySelector("#hk-highway");
    if (highway) highway.destroy();
    highway = renderNoteHighway(highwayWrap, kb.keyLayout);
    highwayNotes = stepsToHighwayNotes(songMeta.steps, chordDuration(), chordSymbolToMidi);

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
    root.querySelectorAll("[data-speed]").forEach((btn) => {
      btn.addEventListener("click", () => {
        tappedBpm = null;
        tapTimes = [];
        const tap = root.querySelector("#hk-tap-tempo");
        if (tap) tap.innerHTML = `${icon("tap", 18)} Tap tempo`;
        setSpeed(Number(btn.dataset.speed));
      });
    });
    root.querySelector("#hk-tap-tempo").addEventListener("click", () => {
      const now = performance.now();
      if (tapTimes.length && now - tapTimes[tapTimes.length - 1] > 2000) tapTimes = [];
      tapTimes.push(now);
      tapTimes = tapTimes.slice(-8);
      const btn = root.querySelector("#hk-tap-tempo");
      if (tapTimes.length < 4) {
        btn.innerHTML = `${icon("tap", 18)} Tap tempo (${4 - tapTimes.length} more…)`;
        return;
      }
      const gaps = tapTimes.slice(1).map((t, i) => t - tapTimes[i]);
      const beatSec = gaps.reduce((a, b) => a + b, 0) / gaps.length / 1000;
      tappedBpm = Math.round(60 / beatSec);
      const speed = Math.min(2.5, Math.max(0.25, BASE_CHORD_DURATION_SEC / (4 * beatSec)));
      setSpeed(speed);
      btn.innerHTML = `${icon("tap", 18)} Tap tempo (♩ = ${tappedBpm})`;
    });
    root.querySelector("#hk-bass-toggle").addEventListener("click", () => {
      bassOn = !bassOn;
      lastBassSlot = -1;
      const btn = root.querySelector("#hk-bass-toggle");
      btn.innerHTML = bassLabel();
      btn.classList.toggle("hk-drums-on", bassOn);
    });
    root.querySelector("#hk-wait-toggle").addEventListener("click", () => {
      if (waitOn) return setWait(false);
      const panel = root.querySelector("#hk-wait-panel");
      panel.innerHTML = `
        <b>${icon("hand", 22)} Wait for me</b>
        <p>Play along on your real piano. Each chord waits at the line until you play it.</p>
        <p class="hk-wait-mic-note">${icon("speaker", 18)}<span>We'll use your phone's microphone <b>only to hear your piano keys, nothing else</b>. Nothing is recorded or saved.</span></p>
        <div class="hk-wait-actions">
          <button class="hk-btn hk-btn-primary" id="hk-wait-mic">Use my microphone</button>
          <button class="hk-btn" id="hk-wait-tap">I'll tap the screen or use a MIDI keyboard</button>
        </div>
        <div class="hk-cal-status" id="hk-wait-err"></div>`;
      panel.classList.remove("hk-hidden");
      panel.querySelector("#hk-wait-mic").addEventListener("click", async () => {
        try {
          if (!micOn()) await enableMic();
          setWait(true, { mic: true });
        } catch (e) {
          console.warn("Hayden Keys: microphone failed", e?.name, e?.message);
          panel.querySelector("#hk-wait-err").textContent = e?.name === "NotAllowedError"
            ? "Microphone access is turned off. Turn it on in Settings → Hayden Keys → Microphone, then try again."
            : `The microphone isn't available (${e?.message || e}). You can still tap the screen or use a MIDI keyboard.`;
        }
      });
      panel.querySelector("#hk-wait-tap").addEventListener("click", () => setWait(true));
    });
    root.querySelector("#hk-drums-toggle").addEventListener("click", () => {
      drumsOn = !drumsOn;
      lastBeatSlot = -1;
      const btn = root.querySelector("#hk-drums-toggle");
      btn.innerHTML = drumLabel();
      btn.classList.toggle("hk-drums-on", drumsOn);
    });
    root.querySelector("#hk-open-calibration").addEventListener("click", toggleCalibration);
    root.querySelector("#hk-timeline").addEventListener("pointerdown", onPlayheadDown);
    root.querySelector("#hk-audio-upload").addEventListener("change", handleUpload);
    initPlayByEar();

    renderSections();
    renderControls();
    updateCursor();
    if (mode === "follow" && highway) highway.render(pausedAt, highwayNotes);

    if (mode === "camera") startCameraMode();
  }

  // Backing band toggles: a clear on/off switch with our own icons.
  function drumLabel() {
    return `${icon("drum", 20)} Drum beat <span class="hk-switch ${drumsOn ? "hk-switch-on" : ""}">${drumsOn ? "On" : "Off"}</span>`;
  }
  function waitLabel() {
    return `${icon("hand", 20)} Wait for me <span class="hk-switch ${waitOn ? "hk-switch-on" : ""}">${waitOn ? "On" : "Off"}</span>`;
  }
  function setWait(on, { mic = false } = {}) {
    waitOn = on;
    holding = false;
    if (!on && micForWait) { disableMic(); micForWait = false; }
    if (on && mic) micForWait = true;
    const btn = root.querySelector("#hk-wait-toggle");
    if (btn) btn.innerHTML = waitLabel();
    root.querySelector("#hk-wait-panel")?.classList.add("hk-hidden");
    showWait(on ? `${icon("hand", 20)} The chords will wait for you. Press Play!` : "");
    if (!on && playing) playStartedAt = performance.now();
  }
  function bassLabel() {
    return `${icon("bass", 20)} Bass line <span class="hk-switch ${bassOn ? "hk-switch-on" : ""}">${bassOn ? "On" : "Off"}</span>`;
  }

  function modeDescription() {
    if (mode === "follow") return "Notes fall down the highway toward the hit line above each key, timed so they arrive exactly when you should play them — plus the keyboard highlights each chord as it plays. Pink = left hand, light blue = right hand. No microphone needed. The default speed is a comfortable practice tempo, the same for every song (one chord box = one bar) — use Tap tempo to match the real recording.";
    if (mode === "ear") return "Play each chord's root note on your real piano — the mic listens via the same pitch tracker used for calibration and advances when you get it right.";
    return "Point your camera at your real keyboard. After a quick two-tap calibration, the next key to press is highlighted right on the video.";
  }

  function renderControls() {
    const controls = root.querySelector("#hk-practice-controls");
    if (mode === "camera") {
      controls.innerHTML = `
        <button class="hk-btn" id="hk-cam-prev">◀ Previous chord</button>
        <button class="hk-btn hk-btn-primary" id="hk-cam-next">Next chord ▶</button>`;
      controls.querySelector("#hk-cam-prev").addEventListener("click", () => showCameraStep(cameraStepIndex - 1));
      controls.querySelector("#hk-cam-next").addEventListener("click", () => showCameraStep(cameraStepIndex + 1));
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
    closeCalibration();
    if (!hidden) {
      calibration = initCalibration(panel, {
        onComplete: () => {
          panel.classList.add("hk-hidden");
          closeCalibration();
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
    return stepIndexAtBars(songMeta, Math.min(fraction, 0.9999) * songMeta.totalBars);
  }

  // Moves actual playback position to the start of the given chord-step
  // index and refreshes every view that depends on current position
  // (timeline cursor, keyboard hand-highlight, active section pill, and
  // the Follow Along falling-note highway).
  function seekToStep(stepIndex) {
    pausedAt = songMeta.starts[stepIndex] * chordDuration();
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
    if (playing) {
      // Read the position BEFORE flipping `playing` — currentTime() only
      // adds elapsed time while playing, so the old order always saved
      // the position from the last Play press.
      pausedAt = currentTime();
      playing = false;
      cancelAnimationFrame(raf);
      updateCursor();
    } else {
      playing = true;
      playStartedAt = performance.now();
      loop();
    }
    root.querySelector("#hk-playpause").textContent = playing ? "⏸ Pause" : "▶ Play";
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
    closeCalibration();
    const uploadEl = root.querySelector("#hk-upload-playback");
    if (uploadEl && uploadEl._hkStopPlayback) uploadEl._hkStopPlayback();
  }

  function closeCalibration() {
    if (calibration) calibration.destroy();
    calibration = null;
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
    // Item 45: an optional drum layer, treating each chord/bar as 4
    // beats. Driven off the same `t` the highway/keyboard already use
    // (via chordDuration(), which already divides by playbackSpeed),
    // so it can't drift out of sync with the falling notes or desync
    // on a speed change — there's no separate scheduling clock to
    // disagree with this one.
    if (drumsOn && mode === "follow" && playing) {
      const beatLenSec = chordDuration() / 4;
      const beatSlot = Math.floor(t / beatLenSec);
      if (beatSlot !== lastBeatSlot) {
        lastBeatSlot = beatSlot;
        playBeat(getAudioContext(), beatSlot, getAudioContext().currentTime);
      }
    }
    const chordIndex = stepIndexAtBars(songMeta, loopedT / chordDuration());
    if (bassOn && mode === "follow" && playing) {
      const beatLenSec = chordDuration() / 4;
      const beatSlot = Math.floor(t / beatLenSec);
      if (beatSlot !== lastBassSlot) {
        lastBassSlot = beatSlot;
        const notes = chordSymbolToMidi(songMeta.steps[chordIndex].chord);
        if (notes.length && beatSlot % 2 === 0) {
          let bass = notes[0] - 24;
          while (bass < 28) bass += 12;
          playTone(bass, { duration: beatLenSec * 1.8 });
        }
      }
    }
    if (chordIndex !== lastChordIndex) {
      lastChordIndex = chordIndex;
      const step = songMeta.steps[chordIndex];
      const midiNotes = chordSymbolToMidi(step.chord);
      if (kb && midiNotes.length) {
        kb.highlightHands({ left: [midiNotes[0] - 12], right: midiNotes, rightLabel: step.chord });
        if (!waitOn) playChord(midiNotes, { duration: chordDuration() * step.len * 0.9 });
      }
      if (waitOn && mode === "follow") {
        pausedAt = t;
        holding = true;
        waitIdx = chordIndex;
        heard = [];
        chromaHits = 0;
        const names = [...new Set(midiNotes.map((m) => ["C", "C♯", "D", "E♭", "E", "F", "F♯", "G", "A♭", "A", "B♭", "B"][((m % 12) + 12) % 12]))];
        showWait(`${icon("hand", 20)} Your turn: play <b>${step.chord}</b> <span>(${names.join(" · ")})</span>`);
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
    earMatchLocked = false;
    earNeedSilence = false;
    pausedAt = 0;
    updateCursor();
    showEarCheckStep();
    const statusEl = root.querySelector("#hk-ear-status");
    try {
      const stop = await startLivePitchDetection((result) => {
        if (!result) {
          earNeedSilence = false;
          return;
        }
        if (earMatchLocked || earNeedSilence || earCheckIndex >= songMeta.steps.length) return;
        const step = songMeta.steps[earCheckIndex];
        const parsed = parseChordSymbol(step.chord);
        if (!parsed) return;
        const expectedPitchClass = parsed.root;
        const heardPitchClass = ((Math.round(result.noteMidi) % 12) + 12) % 12;
        if (heardPitchClass === expectedPitchClass && Math.abs(result.cents) < 45) {
          statusEl.textContent = `Correct — that's ${step.chord}'s root note.`;
          statusEl.classList.add("hk-ear-correct");
          earMatchLocked = true;
          earCheckIndex++;
          pausedAt = (songMeta.starts[earCheckIndex] ?? songMeta.totalBars) * chordDuration();
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
          setTimeout(() => {
            const next = songMeta.steps[earCheckIndex];
            const nextParsed = next && parseChordSymbol(next.chord);
            earNeedSilence = Boolean(nextParsed && nextParsed.root === expectedPitchClass);
            earMatchLocked = false;
            showEarCheckStep();
          }, 400);
        }
      });
      // Left Ear Check (or the tab) while the mic permission prompt was
      // still up — release the mic right away instead of leaking it.
      if (mode !== "ear" || suspended || !root.querySelector("#hk-ear-status")) stop();
      else {
        if (stopListening) stopListening();
        stopListening = stop;
      }
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
    if (cameraOverlay) cameraOverlay.destroy();
    cameraOverlay = initCameraOverlay(panel, {
      getCurrentStep: () => songMeta.steps[cameraStepIndex] || songMeta.steps[0],
      calibration: getCalibration(),
    });
    showCameraStep(0);
  }
  function showCameraStep(i) {
    const n = songMeta.steps.length;
    cameraStepIndex = ((i % n) + n) % n;
    const step = songMeta.steps[cameraStepIndex];
    const midiNotes = chordSymbolToMidi(step.chord);
    if (kb && midiNotes.length) kb.highlightChord(midiNotes, { letter: step.chord, rootMidi: midiNotes[0] });
    highlightActiveSection(step.section);
    pausedAt = songMeta.starts[cameraStepIndex] * chordDuration();
    updateCursor();
  }
  function stopCameraMode() {
    if (cameraOverlay) cameraOverlay.destroy();
    cameraOverlay = null;
    const panel = root.querySelector("#hk-camera-panel");
    if (panel) {
      panel.classList.add("hk-hidden");
      panel.innerHTML = "";
    }
  }

  // --- "Play what you hear" ear-training practice mode (item 48) -------
  // Deliberately open-ended practice, not a graded lesson: pick a real
  // song with a simple, well-known progression (the 1-5-6-4 family,
  // same pool Lesson 1's montage uses), listen to its chords played
  // once, try to find them by ear on the keyboard below with NO chord
  // names or falling notes shown, replay as many times as wanted, then
  // reveal the real answer to check yourself. Reuses playChord() — the
  // same chord-progression audio every lesson already uses — not a
  // second audio path.
  const PLAY_BY_EAR_SONGS = ONE_FIVE_SIX_FOUR_SONGS.slice(0, 15);
  function initPlayByEar() {
    const select = root.querySelector("#hk-playbyear-song");
    select.innerHTML = PLAY_BY_EAR_SONGS.map(
      (s) => `<option value="${s.title}">${s.title} — ${s.artist}</option>`
    ).join("");
    const answerEl = root.querySelector("#hk-playbyear-answer");
    answerEl.textContent = "";

    function currentPick() {
      return PLAY_BY_EAR_SONGS.find((s) => s.title === select.value) || PLAY_BY_EAR_SONGS[0];
    }
    function playClip() {
      const song = currentPick();
      let t = 0;
      song.chords.forEach((symbol) => {
        const notes = chordSymbolToMidi(symbol);
        playChord(notes, { delay: t });
        t += 1.1;
      });
    }
    select.addEventListener("change", () => {
      answerEl.textContent = "";
    });
    root.querySelector("#hk-playbyear-play").addEventListener("click", playClip);
    root.querySelector("#hk-playbyear-reveal").addEventListener("click", () => {
      const song = currentPick();
      answerEl.innerHTML = `<strong>${song.title}</strong> by ${song.artist}: <code>${song.chords.join(" - ")}</code>
        (${song.degreeSequence}). How close did you get?`;
    });
  }

  // --- Upload-your-own-audio transcription (basic-pitch, Apache-2.0) ---
  // Shared with the Discover tab's upload entry point via transcribe.js
  // — one real implementation, not a parallel copy.
  async function handleUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const statusEl = root.querySelector("#hk-upload-status");
    const playbackEl = root.querySelector("#hk-upload-playback");
    playbackEl.innerHTML = "";
    try {
      const notes = await transcribeFile(file, (text) => {
        statusEl.textContent = text;
      });
      // Item 44: shared falling-notes highway + speed control
      // (renderTranscribedPlayback, transcribe.js) replaces the old
      // bare "Play it + one highlighted key" view — same function
      // Discover's upload flow calls, not a second implementation.
      statusEl.textContent = `Done — detected ${notes.length} notes.`;
      renderTranscribedPlayback(playbackEl, notes, { file });
    } catch (err) {
      statusEl.textContent = err.message;
      console.error(err);
    }
  }

  render();

  activePractice = {
    destroy() {
      unsubWaitNote();
      unsubWaitChroma();
      if (micForWait) disableMic();
      stopAll();
      if (highway) highway.destroy();
      if (activePractice === this) activePractice = null;
    },
    // Called when another tab is shown: stop sound, mic and camera
    // (keeping the song position), and bring live modes back on return.
    suspend() {
      if (suspended) return;
      suspended = true;
      if (playing) togglePlay();
      if (micForWait) { disableMic(); micPaused = true; }
      stopEarCheck();
      stopCameraMode();
      closeCalibration();
      root.querySelector("#hk-calibration-panel")?.classList.add("hk-hidden");
      const uploadEl = root.querySelector("#hk-upload-playback");
      if (uploadEl && uploadEl._hkStopPlayback) uploadEl._hkStopPlayback();
    },
    resume() {
      if (!suspended) return;
      suspended = false;
      if (micPaused) { micPaused = false; enableMic().catch(() => {}); }
      if (mode === "ear") startEarCheck();
      if (mode === "camera") startCameraMode();
    },
  };
  return activePractice;
}

export { initPracticeTab };
