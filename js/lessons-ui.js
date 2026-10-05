import { renderKeyboard, playChord, playTone, midiToName } from "./keyboard.js";
import { initCalibration } from "./calibration.js";
import { chordSymbolToMidi } from "./chord-utils.js";
import { createTunerWidget } from "./pitch.js";
import { registerComputerKeyboardTarget } from "./computer-keys.js";
import {
  LESSON1_CHORDS,
  LESSON1_SEQUENCE,
  LESSON2_DEGREES,
  MINOR_DEGREES,
  ODE_TO_JOY_MELODY,
  LESSON4_SEQUENCE,
  LESSON5_CHORD,
  LESSON6_DEGREES,
  MINOR_KEY_MINOR_DEGREES,
  LESSON7_CHORDS,
  LESSON8_CHORDS,
  G_MAJOR_SCALE_FOR_STAFF,
  MINUET_IN_G_OPENING,
  LESSONS,
  CHOOSE_SONGS,
} from "./lessons-data.js";
import { SONGS, ONE_FIVE_SIX_FOUR_SONGS } from "./songs-data.js";
import { isLessonComplete, markLessonComplete, getStreak, getDailyGoal, markSongStatus } from "./storage.js";
import { checkBadges } from "./badges.js";
import {
  MAJOR_SCALES,
  MINOR_SCALES,
  TWO_HAND_PATTERNS,
  SEVENTH_CHORDS,
  LESSON1_WITH_SEVENTHS,
  CANON_IN_D,
  JAZZ_COMPING,
  ADVANCED_REPERTOIRE,
  FUR_ELISE_OPENING,
} from "./lessons-data-advanced.js";

// --- Shared staff-notation rendering (used by Lessons 3, 9, 10) -------
// Vertical position is by diatonic letter (C/D/E/F/G/A/B), ignoring
// accidentals — exactly how real staff notation works: F and F# sit on
// the same line, distinguished only by a sharp symbol.
const LETTER_INDEX_BY_PITCH_CLASS = [0, 0, 1, 1, 2, 3, 3, 4, 4, 5, 5, 6];
const SHARP_PITCH_CLASSES = new Set([1, 3, 6, 8, 10]);

function diatonicStep(midi) {
  const pc = ((midi % 12) + 12) % 12;
  const octave = Math.floor(midi / 12) - 1;
  return LETTER_INDEX_BY_PITCH_CLASS[pc] + 7 * octave - 28; // 0 = C4
}
function staffY(midi) {
  return 115 - diatonicStep(midi) * 7.5;
}
function isSharpMidi(midi) {
  return SHARP_PITCH_CLASSES.has(((midi % 12) + 12) % 12);
}

// Plain note letter, no octave digit (e.g. "F#" not "F#4") — used when
// we're explicitly spelling out a chord's notes for a total beginner,
// where the octave number is just noise.
function noteLetter(midi) {
  return midiToName(midi).replace(/-?\d+$/, "");
}

function renderStaffSvg(melody, upToIndex, { keySignatureSharps = [] } = {}) {
  const noteWidth = 28;
  const width = 60 + melody.length * noteWidth;
  const notes = melody
    .map((midi, i) => {
      const x = 60 + keySignatureSharps.length * 8 + i * noteWidth;
      const y = staffY(midi);
      const dim = i > upToIndex ? "hk-staff-note-dim" : "";
      let ledger = "";
      if (y >= 107.5) ledger = `<line x1="${x - 8}" y1="115" x2="${x + 8}" y2="115" class="hk-staff-line" />`;
      else if (y <= 40) ledger = `<line x1="${x - 8}" y1="32.5" x2="${x + 8}" y2="32.5" class="hk-staff-line" />`;
      const accidental = isSharpMidi(midi)
        ? `<text x="${x - 13}" y="${y + 4}" class="hk-staff-accidental">#</text>`
        : "";
      return `${ledger}${accidental}<ellipse cx="${x}" cy="${y}" rx="6" ry="4.5" class="hk-staff-note ${dim}" />`;
    })
    .join("");
  const lineWidth = width + keySignatureSharps.length * 8;
  const lines = [40, 55, 70, 85, 100]
    .map((y) => `<line x1="20" y1="${y}" x2="${lineWidth}" y2="${y}" class="hk-staff-line" />`)
    .join("");
  const sharpMarks = keySignatureSharps
    .map((midi, i) => `<text x="${30 + i * 9}" y="${staffY(midi) + 4}" class="hk-staff-keysig">#</text>`)
    .join("");
  return `<svg viewBox="0 0 ${lineWidth + 20} 140" class="hk-staff">${lines}${sharpMarks}${notes}</svg>`;
}

function badgesStripHtml() {
  const { all, earned } = checkBadges();
  return `
    <div class="hk-badges-strip">
      ${all.map((b) => {
        const has = Boolean(earned[b.id]);
        return `<span class="hk-badge-chip ${has ? "hk-badge-chip-earned" : "hk-badge-chip-locked"}" title="${b.desc}">${b.icon} ${b.title}</span>`;
      }).join("")}
    </div>`;
}

function dailyGoalHtml() {
  const goal = getDailyGoal();
  const pct = Math.min(100, Math.round((goal.count / goal.target) * 100));
  return `
    <div class="hk-daily-goal">
      <div class="hk-daily-goal-label">Today's goal: ${goal.count}/${goal.target} lesson${goal.target === 1 ? "" : "s"} or song${goal.target === 1 ? "" : "s"} ${goal.metToday ? "— done! ✓" : ""}</div>
      <div class="hk-daily-goal-bar"><div class="hk-daily-goal-fill" style="width:${pct}%"></div></div>
    </div>`;
}

// Pre-lessons ("Get yourself a piano," "Get Started") sit before the
// numbered sequence and are shown as "Pre-lesson," not "Lesson N" — so
// Lesson 1 is genuinely "The 4 keys to play 100 songs," matching Sid's
// exact spec, not pushed down by the setup steps ahead of it.
function lessonDisplayNumber(lesson, index) {
  if (lesson.pre) return null;
  let n = 0;
  for (let i = 0; i <= index; i++) if (!LESSONS[i].pre) n++;
  return n;
}

function lessonCountLabel() {
  const numbered = LESSONS.filter((l) => !l.pre).length;
  return `${numbered} real lessons (plus ${LESSONS.length - numbered} pre-lesson step${LESSONS.length - numbered === 1 ? "" : "s"})`;
}

function lessonMapHtml() {
  const streak = getStreak();
  const rows = LESSONS.map((lesson, i) => {
    const prevId = LESSONS[i - 1]?.id;
    const locked = prevId && !isLessonComplete(prevId);
    const done = isLessonComplete(lesson.id);
    const num = lessonDisplayNumber(lesson, i);
    return `
      <button class="hk-lesson-node ${locked ? "hk-locked" : ""} ${done ? "hk-done" : ""}"
              data-lesson="${lesson.id}" ${locked ? "disabled" : ""}>
        <div class="hk-lesson-node-icon">${done ? "&#10003;" : locked ? "&#128274;" : (num ?? "•")}</div>
        <div class="hk-lesson-node-body">
          <div class="hk-lesson-node-title">${lesson.pre ? "Pre-lesson" : `Lesson ${num}`}: ${lesson.title}</div>
          <div class="hk-lesson-node-subtitle">${lesson.subtitle}</div>
          <div class="hk-lesson-node-desc">${lesson.description}</div>
        </div>
      </button>`;
  }).join("");

  return `
    <div class="hk-lesson-map">
      <h2 class="hk-lessons-title">100 Lessons to Learn Any Song — START HERE.</h2>
      <p class="hk-honest-note">${lessonCountLabel()} — real and clickable, nothing padded.</p>
      <div class="hk-streak">🔥 ${streak.count}-day streak</div>
      ${dailyGoalHtml()}
      ${badgesStripHtml()}
      ${rows}
    </div>`;
}

// Persistent right-side roadmap (item 22): every single entry here is a
// real, built, clickable lesson — no "coming soon" placeholders.
// Completed lessons fill in purple (a deliberate accent distinct from
// the site's blue/pink base theme); the next lesson up gets its own
// "you are here" treatment.
function timelineHtml() {
  const nextId = LESSONS.find((l) => !isLessonComplete(l.id))?.id;
  const rows = LESSONS.map((lesson, i) => {
    const prevId = LESSONS[i - 1]?.id;
    const locked = prevId && !isLessonComplete(prevId);
    const done = isLessonComplete(lesson.id);
    const current = lesson.id === nextId;
    const num = lessonDisplayNumber(lesson, i);
    return `
      <button class="hk-roadmap-node ${done ? "hk-roadmap-done" : ""} ${current ? "hk-roadmap-current" : ""} ${locked ? "hk-roadmap-locked" : ""}"
              data-lesson="${lesson.id}" ${locked ? "disabled" : ""} title="${lesson.title}">
        <span class="hk-roadmap-num">${done ? "&#10003;" : (num ?? "•")}</span>
        <span class="hk-roadmap-label">${lesson.pre ? "Pre: " : ""}${lesson.title}</span>
        ${current ? '<span class="hk-roadmap-here">you are here</span>' : ""}
      </button>`;
  }).join("");
  return `
    <div class="hk-roadmap">
      <h3 class="hk-roadmap-heading">Your roadmap</h3>
      <p class="hk-honest-note hk-roadmap-count">${LESSONS.filter((l) => isLessonComplete(l.id)).length} of ${LESSONS.length} done</p>
      <div class="hk-roadmap-list">${rows}</div>
    </div>`;
}

// Item 56: real Back support for the counter-driven lessons (Lessons
// 2-37, scale/seventh/two-hand templates, the early previews) — the
// remaining screens that only had item 42's history-based Back on
// Lesson 1 and the shared templates. Every one of these drives its
// screen purely from a few local counters (`step`, `idx`, `hits`) and
// re-renders via renderStep(), so rather than hand-writing a history
// stack into ~35 functions, this wraps renderStep(): whenever it renders
// a different state than last time, the previous state is pushed onto
// a history stack; Back pops it, restores the counters, and re-renders.
// Re-renders of the SAME state (e.g. a quiz re-showing itself) don't
// add history. Back also detaches any quiz key-press handler / selectable
// outlines so a quiz step's listener can't keep firing on the screen
// you went back to. No Back on a lesson's final "done" screen (the one
// with the #hk-done "Back to lessons" button) — the lesson is already
// marked complete there.
function withStepBack(render, { controls, kb, getState, setState, onBack }) {
  const history = [];
  let lastKey = null;
  let restoring = false;
  function wrapped() {
    const key = JSON.stringify(getState());
    if (!restoring && lastKey !== null && key !== lastKey) history.push(lastKey);
    restoring = false;
    lastKey = key;
    render();
    if (!history.length || controls.querySelector("#hk-done")) return;
    const backBtn = document.createElement("button");
    backBtn.type = "button";
    backBtn.className = "hk-btn hk-btn-lesson-back";
    backBtn.id = "hk-back";
    backBtn.textContent = "Back";
    backBtn.addEventListener("click", () => {
      if (!history.length) return;
      if (kb) {
        kb.onKeyPress(() => {});
        kb.keyElements.forEach((el) => el.classList.remove("hk-key-selectable"));
      }
      if (onBack) onBack();
      restoring = true;
      setState(JSON.parse(history.pop()));
      wrapped();
    });
    controls.insertBefore(backBtn, controls.firstChild);
  }
  return wrapped;
}

function initLessonsTab(root) {
  // Persistent two-column layout: lesson content on the left, the
  // roadmap timeline pinned on the right — set up once, not rebuilt on
  // every navigation, so the sidebar can refresh independently of
  // whatever's showing in the main area.
  root.innerHTML = `
    <div class="hk-lessons-layout">
      <div class="hk-lesson-main" id="hk-lesson-main"></div>
      <aside class="hk-lesson-sidebar" id="hk-lesson-sidebar"></aside>
    </div>`;
  const main = root.querySelector("#hk-lesson-main");
  const sidebarEl = root.querySelector("#hk-lesson-sidebar");

  function renderSidebar() {
    sidebarEl.innerHTML = timelineHtml();
    sidebarEl.querySelectorAll("[data-lesson]").forEach((btn) => {
      btn.addEventListener("click", () => startLesson(btn.dataset.lesson));
    });
  }

  // Item 56: lessons that run their own timers (the two jazz backing
  // loops) register a cleanup here, run whenever the lesson is left —
  // via "<- Lessons", the roadmap sidebar, or starting another lesson.
  // Before this, leaving mid-loop kept the backing chords playing
  // forever over whatever screen came next.
  const exitCleanups = [];
  function onLessonExit(fn) {
    exitCleanups.push(fn);
  }
  function runLessonExitCleanups() {
    exitCleanups.splice(0).forEach((fn) => fn());
  }

  function showMap() {
    runLessonExitCleanups();
    main.innerHTML = lessonMapHtml();
    main.querySelectorAll("[data-lesson]").forEach((btn) => {
      btn.addEventListener("click", () => startLesson(btn.dataset.lesson));
    });
    renderSidebar();
  }

  function startLesson(id) {
    const runners = {
      "lesson-piano": runPianoIntro,
      "lesson-getstarted": runGetStarted,
      "lesson-1": runLesson1,
      "lesson-2": runLesson2,
      "lesson-3": runLesson3,
      "lesson-4": runLesson4,
      "lesson-5": runLesson5,
      "lesson-6": runLesson6,
      "lesson-7": runLesson7,
      "lesson-touch": runLessonTouch,
      "lesson-8": runLesson8,
      "lesson-9": runLesson9,
      "lesson-10": runLesson10,
      "lesson-11": () => runMajorScaleLesson(MAJOR_SCALES[0]),
      "lesson-12": () => runMajorScaleLesson(MAJOR_SCALES[1]),
      "lesson-13": () => runMajorScaleLesson(MAJOR_SCALES[2]),
      "lesson-14": () => runMajorScaleLesson(MAJOR_SCALES[3]),
      "lesson-15": runLesson15,
      "lesson-16": runLesson16,
      "lesson-17": () => runMinorScaleLesson(MINOR_SCALES[0]),
      "lesson-18": () => runMinorScaleLesson(MINOR_SCALES[1]),
      "lesson-19": () => runMinorScaleLesson(MINOR_SCALES[2]),
      "lesson-20": runLesson20,
      "lesson-21": () => runTwoHandLesson("lesson-21", "Alternating bass", TWO_HAND_PATTERNS.alternatingBass),
      "lesson-22": () => runTwoHandLesson("lesson-22", "Alberti bass", TWO_HAND_PATTERNS.albertiBass),
      "lesson-23": runLesson23,
      "lesson-24": runLesson24,
      "lesson-25": runLesson25,
      "lesson-26": () => runSeventhChordLesson("lesson-26", SEVENTH_CHORDS.dominant7, "dominant 7th"),
      "lesson-27": () => runSeventhChordLesson("lesson-27", SEVENTH_CHORDS.major7, "major 7th"),
      "lesson-28": () => runSeventhChordLesson("lesson-28", SEVENTH_CHORDS.minor7, "minor 7th"),
      "lesson-29": runLesson29,
      "lesson-30": runLesson30,
      "lesson-31": runLesson31,
      "lesson-32": runLesson32,
      "lesson-33": runLesson33,
      "lesson-34": runLesson34,
      "lesson-35": runLesson35,
      "lesson-36": runLesson36,
      "lesson-37": runLesson37,
      "lesson-lastchristmas": runLastChristmas,
      "lesson-choose": runChooseSong,
      "lesson-twohand-preview": runTwoHandPreview,
      "lesson-jazz-preview": runJazzPreview,
      "lesson-eartraining": runEarTraining,
      "lesson-almostblue": runAlmostBluePreview,
      "lesson-myfunnyvalentine": runMyFunnyValentinePreview,
      "lesson-beethoven": runBeethovenShowcase,
      "lesson-vivaldi": runVivaldiAttempt,
      "lesson-chopin": runChopinShowcase,
      "lesson-chordquiz": runChordQuizLesson,
      "lesson-pedals": runPedalFunLesson,
    };
    // "Master this song" lessons (item 22's path toward ~100 real
    // lessons) are generated from real song data rather than hand-listed
    // here one at a time — wire them up the same way.
    LESSONS.forEach((l) => {
      if (l.songTitle) {
        runners[l.id] = () =>
          runMasterSongLesson(SONGS.find((s) => s.title === l.songTitle), l.id, {
            intermediateUnlock: Boolean(l.intermediateUnlock),
          });
      }
    });
    (runners[id] || showMap)();
    renderSidebar();
  }

  function lessonShell(title) {
    runLessonExitCleanups();
    main.innerHTML = `
      <div class="hk-lesson-player">
        <button class="hk-lesson-exit" id="hk-lesson-exit">&larr; Lessons</button>
        <h2>${title}</h2>
        <div class="hk-lesson-content" id="hk-lesson-content"></div>
        <div id="hk-lesson-keyboard" class="hk-keyboard-wrap"></div>
        <div class="hk-lesson-controls" id="hk-lesson-controls"></div>
      </div>`;
    main.querySelector("#hk-lesson-exit").addEventListener("click", showMap);
    return {
      content: main.querySelector("#hk-lesson-content"),
      keyboardWrap: main.querySelector("#hk-lesson-keyboard"),
      controls: main.querySelector("#hk-lesson-controls"),
    };
  }

  // The panda mascot narrates the simplified, numbers-first copy
  // throughout the lesson flow (items 22/23) — a small consistent avatar
  // next to whatever it's "saying," Duolingo-owl-style.
  // `pose` picks which hand-drawn panda illustration narrates this
  // moment (item 35) — defaults to the standard face (ordinary
  // step-by-step teaching), but specific call sites pass one of the
  // extracted assets/mascot-poses/*.png files for a matching mood
  // (classical repertoire, jazz, a level-up celebration, an idle/empty
  // state), so the mascot isn't visually identical on every screen. The
  // primary brand mark (header/favicon/app icon) intentionally stays
  // fixed on the main piano pose — only these narrator moments vary.
  function mascotSay(html, pose = "assets/mascot-face.png") {
    return `<div class="hk-mascot-row">
      <img src="${pose}" alt="" class="hk-mascot-avatar" />
      <div class="hk-mascot-bubble">${html}</div>
    </div>`;
  }

  // A small, stable-per-song pool of fun poses for the many "Master this
  // song" lessons, so dozens of song screens aren't all the identical
  // static face — picked deterministically from the song title (so the
  // same song always shows the same pose) rather than re-randomized.
  const SONG_POSE_POOL = [
    "assets/mascot-poses/grand-piano.png",
    "assets/mascot-poses/harp.png",
    "assets/mascot-poses/trombone.png",
    "assets/mascot-poses/violin-dozing.png",
    "assets/mascot-poses/metronome.png",
    "assets/mascot-poses/maestro-flute.png",
  ];
  function poseForSong(title) {
    let hash = 0;
    for (let i = 0; i < title.length; i++) hash = (hash * 31 + title.charCodeAt(i)) >>> 0;
    return SONG_POSE_POOL[hash % SONG_POSE_POOL.length];
  }

  // ----- Step 1: Get yourself a piano (info card, no keyboard needed) ---
  // Real, researched advice, not filler — see commit message for the
  // sourcing. No quiz here: the whole point is this step requires
  // nothing except reading it and clicking through.
  function runPianoIntro() {
    const { content, keyboardWrap, controls } = lessonShell("Get yourself a piano");
    keyboardWrap.innerHTML = "";
    content.innerHTML = mascotSay(`
      <h3>You don't need a fancy piano to start.</h3>
      <p>A basic 61-key keyboard is enough. You can get a nicer one later, once you know you'll stick with it.</p>
      <h3>Where to find one, cheap or free</h3>
      <p>Check <strong>Facebook Marketplace</strong>. Also look for <strong>"free" listings</strong>, not just "for
         sale" ones — people often give pianos away for free, because moving a real piano is expensive and hard.</p>
      <p>Or borrow access to one: ask your <strong>school</strong> (music rooms often sit empty during free
         periods) or a local <strong>church or community center</strong> — many have a piano you can use.</p>
      <h3>What to check before you take one home</h3>
      <p>Press <strong>every single key</strong>, not just a few — old keyboards often have one or two that stick
         or stay silent.</p>
      <p>Make sure the <strong>power adapter</strong> is included — some used keyboards are sold without one.</p>
      <p>A <strong>sustain pedal</strong> (or a spot to plug one in) is nice to have, but not required to start.</p>
      <h3>"Weighted" vs. "unweighted" keys</h3>
      <p><strong>Weighted</strong> keys push back like a real piano, which helps build finger strength over time.</p>
      <p><strong>Unweighted</strong> keys (most cheap keyboards) are lighter and easier to press — totally fine for
         starting out. Don't let this stop you today.</p>
      <h3>Budget, honestly</h3>
      <p>A basic new keyboard usually costs around <strong>$100</strong>. A used one can often be much less —
         sometimes free.</p>
      <p class="hk-honest-note">One caution: a free <em>real, acoustic</em> piano can hide expensive problems
         (rusty strings, cracked parts). Fine to take one in obviously good condition — but a cheap electronic
         keyboard is the safer, zero-risk way to start.</p>`);
    controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">I've got something to play on — let's go</button>`;
    controls.querySelector("#hk-next").addEventListener("click", () => {
      markLessonComplete("lesson-piano");
      startNextLesson();
    });
  }

  // ----- Lesson: Get Started — find your starting key (calibration) -----
  function runGetStarted() {
    const { content, keyboardWrap, controls } = lessonShell("Get Started");
    keyboardWrap.innerHTML = "";
    content.innerHTML = `
      ${mascotSay(`<h3>Hi! I'm your guide for Hayden Keys.</h3>
        <p>Before we play any songs, let's make sure your piano and this app agree on where Middle C is.</p>`)}
      <div id="hk-getstarted-cal"></div>`;
    controls.innerHTML = `<button class="hk-btn" id="hk-skip-cal">Skip — I already know where Middle C is</button>`;
    controls.querySelector("#hk-skip-cal").addEventListener("click", finish);
    const calibration = initCalibration(content.querySelector("#hk-getstarted-cal"), { onComplete: finish });
    onLessonExit(() => calibration.destroy());

    function finish() {
      markLessonComplete("lesson-getstarted");
      startNextLesson();
    }
  }

  // ----- "Master this song" lessons: real songs, lightweight format -----
  // Reuses the exact chord data already verified in songs-data.js and
  // the same chord-symbol parser practice.js/camera-overlay.js use —
  // genuinely playable chords, not a new simplified-for-kids fake
  // version of the song.
  function runMasterSongLesson(song, lessonId, { intermediateUnlock = false } = {}) {
    const { content, keyboardWrap, controls } = lessonShell(`Master: ${song.title}`);
    const kb = renderKeyboard(keyboardWrap, { startMidi: 48, endMidi: 84 });
    let step = "intro";
    let idx = 0;
    // Item 42: real Back support for this shared template — used by
    // every auto-generated "Master: X" lesson (the large majority of
    // lesson screens in the app), same pattern as Lesson 1.
    const history = [];
    function goForward(next) {
      history.push({ step, idx });
      if ("step" in next) step = next.step;
      if ("idx" in next) idx = next.idx;
      renderStep();
    }
    function goBack() {
      if (!history.length) return;
      const prev = history.pop();
      step = prev.step;
      idx = prev.idx;
      renderStep();
    }

    function renderStep() {
      if (step === "intro") {
        content.innerHTML = mascotSay(`
          ${intermediateUnlock ? "<h3>Intermediate unlocked!</h3><p>You've completed enough Beginner songs to get here for real.</p>" : `<h3>${song.title}</h3>`}
          <p>${intermediateUnlock ? `"${song.title}" by ${song.artist}` : `By ${song.artist}`}. Key: <strong>${song.key}</strong>. Real, verified chords: <strong>${song.chords.join(" - ")}</strong>${song.degreeSequence ? ` (as numbers: ${song.degreeSequence})` : ""}.</p>
          <p>Let's press them one at a time, together.</p>`, intermediateUnlock ? "assets/mascot-poses/maestro-conducting.png" : poseForSong(song.title));
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Start</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => goForward({ step: "play", idx: 0 }));
      } else if (step === "play") {
        const symbol = song.chords[idx];
        const notes = chordSymbolToMidi(symbol);
        kb.highlightChord(notes, { letter: symbol, rootMidi: notes[0] });
        playChord(notes, { delay: 0.1 });
        content.innerHTML = `
          <p class="hk-step-indicator">Chord ${idx + 1} of ${song.chords.length}</p>
          ${mascotSay(`<p><strong>Press and hold ${symbol}.</strong> It's the lit-up keys below.</p>`)}`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Next chord</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => {
          if (idx < song.chords.length - 1) goForward({ idx: idx + 1 });
          else goForward({ step: "done" });
        });
      } else {
        markLessonComplete(lessonId);
        // Mark the SONG itself completed too (not just the lesson) — this
        // is what Discover's tier-gating and the badge thresholds actually
        // read (getSavedSongs()/countCompletedByDifficulty), so finishing
        // a "Master this song" lesson genuinely counts toward unlocking
        // the next difficulty tier, not just toward lesson progress.
        markSongStatus(song.title, "completed");
        kb.clearHighlights();
        const { newlyEarned } = checkBadges();
        content.innerHTML = mascotSay(`
          <h3>You just played "${song.title}" start to finish!</h3>
          ${newlyEarned.length
            ? `<p>You also just unlocked: ${newlyEarned.map((b) => `${b.icon} ${b.title}`).join(", ")}.</p>`
            : `<p>More real songs are waiting for you in the lesson timeline.</p>`}`,
          newlyEarned.length ? "assets/mascot-poses/maestro-conducting.png" : poseForSong(song.title));
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Back to lessons</button>`;
        controls.querySelector("#hk-done").addEventListener("click", showMap);
      }
      if (history.length > 0) {
        const backBtn = document.createElement("button");
        backBtn.type = "button";
        backBtn.className = "hk-btn hk-btn-lesson-back";
        backBtn.id = "hk-back";
        backBtn.textContent = "Back";
        backBtn.addEventListener("click", goBack);
        controls.insertBefore(backBtn, controls.firstChild);
      }
    }
    renderStep();
  }

  // ----- Lesson 2: Last Christmas (item 25) ------------------------------
  // Independently re-verified chords (D-Bm-Em-A, I-vi-ii-V) — honestly
  // NOT the same progression as Lesson 1 (shares the I and vi chords,
  // but is genuinely a different 4-chord pattern). Said plainly here
  // instead of overstating the connection, per this app's honesty rule.
  function runLastChristmas() {
    const song = SONGS.find((s) => s.title === "Last Christmas");
    const { content, keyboardWrap, controls } = lessonShell("Last Christmas");
    const kb = renderKeyboard(keyboardWrap, { startMidi: 48, endMidi: 84 });
    let step = "intro";
    let idx = 0;

    function renderStep() {
      if (step === "intro") {
        content.innerHTML = mascotSay(`
          <h3>Last Christmas — Wham!</h3>
          <p>Honest heads-up: this song does NOT use Lesson 1's exact chords. It's its own 4-chord
             pattern: <strong>${song.chords.join(" - ")}</strong> (D, Bm, Em, A).</p>
          <p>It's also in a different <strong>key</strong>: this song's home is <strong>D</strong>, not G. In the
             key of D, the 1 chord is D, 6 is Bm, 2 is Em and 5 is A — so its pattern is <strong>1-6-2-5</strong>.
             Same numbering idea, new home, new letters.</p>
          <p>Two chords here have black keys: Bm has F#, and A has C# (the black key just right of C).
             Let's press them one at a time.</p>`);
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Start</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step = "play"; idx = 0; renderStep(); });
      } else if (step === "play") {
        const symbol = song.chords[idx];
        const notes = chordSymbolToMidi(symbol);
        kb.highlightChord(notes, { letter: symbol, rootMidi: notes[0] });
        playChord(notes, { delay: 0.1 });
        content.innerHTML = `
          <p class="hk-step-indicator">Chord ${idx + 1} of ${song.chords.length}</p>
          ${mascotSay(`<p><strong>Press and hold ${symbol}.</strong> It's the lit-up keys below.</p>`)}`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Next chord</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => {
          if (idx < song.chords.length - 1) { idx++; renderStep(); }
          else { step = "done"; renderStep(); }
        });
      } else {
        markLessonComplete("lesson-lastchristmas");
        markSongStatus(song.title, "completed");
        kb.clearHighlights();
        content.innerHTML = mascotSay(`<h3>Nice — a second real song down, a different pattern learned.</h3>
          <p>Not every song reuses Lesson 1's exact shape — and that's normal. Recognizing when it's the
             same pattern (and when it's genuinely different) is half the skill.</p>`);
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Back to lessons</button>`;
        controls.querySelector("#hk-done").addEventListener("click", showMap);
      }
    }
    renderStep = withStepBack(renderStep, { controls, kb, getState: () => ({ step, idx }), setState: (s) => ({ step, idx } = s) });
    renderStep();
  }

  // ----- Lesson 3: Choose your song (item 25) -----------------------------
  // A real choice menu, not a forced one-at-a-time montage — 10 real
  // 1-5-6-4-family songs (see lessons-data.js CHOOSE_SONGS), pick one.
  function runChooseSong() {
    const { content, keyboardWrap, controls } = lessonShell("Choose your song");
    keyboardWrap.innerHTML = "";
    content.innerHTML = mascotSay(`
      <h3>Pick a song — every one uses the 1-5-6-4 pattern you just learned.</h3>
      <p>All ${CHOOSE_SONGS.length} use the same number pattern as your first 4 chords. Some are in a different
         key, so the letters change (and you may meet a new chord shape) — the lit-up keys show you exactly
         what to press.</p>`) +
      `<div class="hk-choose-list">${CHOOSE_SONGS.map((s) => `
        <button class="hk-btn hk-choose-btn" data-song="${s.title}">${s.title} — ${s.artist}
          <span class="hk-choose-chords">${s.chords.join(" · ")}</span></button>`).join("")}</div>`;
    controls.innerHTML = "";
    content.querySelectorAll("[data-song]").forEach((btn) => {
      btn.addEventListener("click", () => playChosenSong(btn.dataset.song));
    });

    function playChosenSong(title) {
      const song = CHOOSE_SONGS.find((s) => s.title === title);
      const kb = renderKeyboard(keyboardWrap, { startMidi: 48, endMidi: 84 });
      let idx = 0;
      function renderChord() {
        if (idx < song.chords.length) {
          const symbol = song.chords[idx];
          const notes = chordSymbolToMidi(symbol);
          kb.highlightChord(notes, { letter: symbol, rootMidi: notes[0] });
          playChord(notes, { delay: 0.1 });
          content.innerHTML = `
            <p class="hk-step-indicator">${song.title} — chord ${idx + 1} of ${song.chords.length}</p>
            ${mascotSay(`<p><strong>Press and hold ${symbol}.</strong></p>`)}`;
          controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Next chord</button>`;
          controls.querySelector("#hk-next").addEventListener("click", () => { idx++; renderChord(); });
        } else {
          markLessonComplete("lesson-choose");
          markSongStatus(song.title, "completed");
          kb.clearHighlights();
          content.innerHTML = mascotSay(`<h3>You just played "${song.title}" start to finish!</h3>
            <p>Your choice, your song — the same 1-5-6-4 pattern from your first lesson.</p>`);
          controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Back to lessons</button>`;
          controls.querySelector("#hk-done").addEventListener("click", showMap);
        }
      }
      renderChord = withStepBack(renderChord, { controls, kb, getState: () => ({ idx }), setState: (st) => ({ idx } = st) });
      renderChord();
    }
  }

  // ----- Lesson 4: Left hand vs. right hand (early preview) ---------------
  // Deliberately lightweight — the real two-hand coordination depth
  // (alternating bass, Alberti bass, arpeggios) stays later in the arc
  // (Days 21-25). This is just a first, easy taste of the idea: left
  // hand holds the chord root, right hand plays one simple note on top.
  function runTwoHandPreview() {
    const { content, keyboardWrap, controls } = lessonShell("Left hand vs. right hand");
    // endMidi goes up to 88 (not 79) so the right hand's note — one
    // octave above the chord's own top note, up to G's 74+12=86 — is
    // actually within the rendered range. Real bug caught while
    // verifying item 30's color sweep: at endMidi 79, midi 86 fell
    // outside the keyboard entirely, so highlightHands() silently never
    // rendered a right-hand note (getKeyElement(86) was undefined) —
    // looked like only the left hand ever lit up.
    const kb = renderKeyboard(keyboardWrap, { startMidi: 45, endMidi: 88 });
    let step = 0;

    function renderStep() {
      if (step === 0) {
        content.innerHTML = mascotSay(`
          <h3>A quick first taste of two hands.</h3>
          <p>Your left hand and right hand can do two different jobs at once. Here: left hand holds down
             the chord (low, pink), right hand taps one simple note on top (high, light blue).</p>`);
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Try it</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step = 1; renderStep(); });
      } else if (step < 1 + LESSON1_SEQUENCE.length) {
        const key = LESSON1_SEQUENCE[step - 1];
        const chord = LESSON1_CHORDS[key];
        const topNote = chord.notes[chord.notes.length - 1] + 12; // one octave above the chord's top note
        kb.highlightHands({ left: chord.notes.map((n) => n - 12), right: [topNote], leftLabel: chord.letter });
        playChord([...chord.notes.map((n) => n - 12), topNote], { duration: 0.8 });
        content.innerHTML = `
          <p class="hk-step-indicator">Chord ${step} of ${LESSON1_SEQUENCE.length}</p>
          ${mascotSay(`<p>Left hand: ${chord.letter} chord, low. Right hand: one note, high. Press both.</p>`)}`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Next</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step++; renderStep(); });
      } else {
        markLessonComplete("lesson-twohand-preview");
        kb.clearHighlights();
        content.innerHTML = mascotSay(`<h3>That's the whole idea.</h3>
          <p>Two hands, two different jobs, at the same time. The real depth (busier left-hand patterns,
             real melodies) comes later — Days 21-25. This was just the taste.</p>`);
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Back to lessons</button>`;
        controls.querySelector("#hk-done").addEventListener("click", showMap);
      }
    }
    renderStep = withStepBack(renderStep, { controls, kb, getState: () => ({ step }), setState: (s) => ({ step } = s) });
    renderStep();
  }

  // ----- Lesson 5: The jazz trick (early preview) --------------------------
  // Short, fun preview of left-hand-comps/right-hand-improvises, using
  // chords the user already knows by Lesson 5 (Lesson 1's G-D-Em-C) —
  // not full jazz theory. The deeper version (ii-V-I, 7th chords) stays
  // at the bonus Jazz comping lesson later in the arc.
  function runJazzPreview() {
    const { content, keyboardWrap, controls } = lessonShell("The jazz trick");
    const kb = renderKeyboard(keyboardWrap, { startMidi: 48, endMidi: 84 });
    let step = 0;
    let compInterval = null;
    onLessonExit(() => { if (compInterval) clearInterval(compInterval); });
    const safeNotes = [60, 62, 64, 67, 69]; // C major pentatonic, safe over G-D-Em-C

    function renderStep() {
      if (step === 0) {
        content.innerHTML = mascotSay(`
          <h3>Here's a fun trick real jazz musicians use.</h3>
          <p>Left hand loops the G-D-Em-C chords you already know. Right hand plays ANY of a few
             "safe" notes, in any order, any rhythm — it'll sound good no matter what.</p>`, "assets/mascot-poses/maestro-flute.png");
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Try noodling</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step = 1; renderStep(); });
      } else {
        content.innerHTML = `
          ${mascotSay(`<p>The left hand is looping the chords. Tap any of the <strong>outlined</strong> keys —
             there's no wrong note here.</p>`, "assets/mascot-poses/maestro-flute.png")}
          <p class="hk-honest-note">Just a preview — when you've noodled a bit, mark it complete.</p>`;
        // Playback controls (item 31): this is a real continuous loop
        // playing through time, so it gets the same pause/resume parity
        // as Practice's playback controls — not just a static chord-tap
        // step, which deliberately doesn't need this.
        controls.innerHTML = `
          <button class="hk-btn" id="hk-pause">Pause loop</button>
          <button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-finish">Mark complete</button>`;
        controls.querySelector("#hk-finish").addEventListener("click", finish);
        kb.clearHighlights();
        safeNotes.forEach((midi) => {
          const el = kb.getKeyElement(midi);
          if (el) el.classList.add("hk-key-selectable");
        });
        let i = 0;
        let paused = false;
        function startLoop() {
          compInterval = setInterval(() => {
            const key = LESSON1_SEQUENCE[i % LESSON1_SEQUENCE.length];
            const chord = LESSON1_CHORDS[key];
            playChord(chord.notes.map((n) => n - 12), { duration: 1.1 });
            i++;
          }, 1200);
        }
        startLoop();
        controls.querySelector("#hk-pause").addEventListener("click", (e) => {
          paused = !paused;
          if (paused) {
            if (compInterval) clearInterval(compInterval);
            e.target.textContent = "Resume loop";
          } else {
            startLoop();
            e.target.textContent = "Pause loop";
          }
        });
      }
    }
    function finish() {
      if (compInterval) clearInterval(compInterval);
      markLessonComplete("lesson-jazz-preview");
      kb.clearHighlights();
      kb.onKeyPress(() => {});
      content.innerHTML = mascotSay(`<h3>That's the jazz trick in miniature.</h3>
        <p>Loop known chords, improvise over "safe" notes. The real, deeper version (with 7th chords and
           a proper ii-V-I) is later in the arc, at the Jazz comping bonus lesson.</p>`);
      controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Back to lessons</button>`;
      controls.querySelector("#hk-done").addEventListener("click", showMap);
    }
    renderStep = withStepBack(renderStep, { controls, kb, getState: () => ({ step }), setState: (s) => ({ step } = s), onBack: () => { if (compInterval) clearInterval(compInterval); compInterval = null; kb.clearHighlights(); } });
    renderStep();
  }

  // ----- Lesson 6: Train your ear -----------------------------------------
  // Honesty note (item 25): Sid's original worked example was Hans
  // Zimmer's "Interstellar" main theme. That piece is (a) a complex,
  // non-public-domain film score by a living composer — not the kind of
  // 70-years-dead-composer public domain material this app's classical
  // catalog is built on — and (b) genuinely not reducible to a simple
  // beginner pattern without misrepresenting it. Rather than fake a
  // "simplified Interstellar chart" with neither of those things true,
  // this lesson uses "Ode to Joy" (Beethoven, public domain, already
  // verified elsewhere in this app for Lesson 3) as the honest worked
  // example instead — the EAR-TRAINING SKILL is what's meant to transfer
  // to songs like Interstellar on the user's own instrument, not a
  // canned chart we can't responsibly provide for that specific piece.
  function runEarTraining() {
    const { content, keyboardWrap, controls } = lessonShell("Train your ear");
    const kb = renderKeyboard(keyboardWrap, { startMidi: 55, endMidi: 79 });
    let step = 0;

    function renderStep() {
      if (step === 0) {
        content.innerHTML = mascotSay(`
          <h3>The real skill: figuring out a song just by listening.</h3>
          <p>Every musician does this. Pick any song you hear on the radio, hum the melody back slowly,
             and try to find those notes on your piano by trial and error. That's it — that's the whole
             trick, just practiced over and over.</p>
          <p class="hk-honest-note">Honest note: we originally planned to use Hans Zimmer's "Interstellar"
             theme as the worked example here. We're skipping that — it's a complex, modern film score by
             a living composer, not something we can responsibly turn into a "simplified official chart"
             without either misrepresenting it or straying past this app's own public-domain-only rule for
             full pieces. Instead, here's the exact same ear-training process on a simple, honest example
             you can fully trust: "Ode to Joy" (Beethoven, public domain).</p>`);
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Try it</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step = 1; renderStep(); });
      } else if (step <= ODE_TO_JOY_MELODY.length) {
        // Item 56: genuinely by ear — the key used to be lit up before
        // you'd even listened, which gave the answer away. Now nothing is
        // shown until you find it (or tap "Show me").
        const i = step - 1;
        const midi = ODE_TO_JOY_MELODY[i];
        kb.clearHighlights();
        playTone(midi, { duration: 0.5 });
        content.innerHTML = `
          <p class="hk-step-indicator">Note ${i + 1} of ${ODE_TO_JOY_MELODY.length}</p>
          ${mascotSay(`<p>Listen, then find this exact note on the keyboard by ear — tap keys until one sounds
             the same.${i > 0 ? " Tip: it's often the same note as last time, or a key right next to it." : ""}</p>`)}
          <p id="hk-ear-feedback" class="hk-quiz-feedback"></p>`;
        controls.innerHTML = `
          <button class="hk-btn" id="hk-ear-replay">&#9658; Hear it again</button>
          <button class="hk-btn" id="hk-ear-show">Show me</button>
          <button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Skip</button>`;
        const feedback = content.querySelector("#hk-ear-feedback");
        const found = (how) => {
          kb.highlightChord([midi], { letter: noteLetter(midi), rootMidi: midi });
          feedback.textContent = how === "found" ? `Yes — that's ${noteLetter(midi)}!` : `It was ${noteLetter(midi)}.`;
          feedback.className = `hk-quiz-feedback ${how === "found" ? "hk-quiz-feedback-correct" : ""}`;
          const next = controls.querySelector("#hk-next");
          if (next) next.textContent = "Next note";
          kb.onKeyPress(() => {});
        };
        kb.onKeyPress((pressed) => {
          if (pressed === midi) found("found");
          else feedback.textContent = pressed < midi ? "Higher — try further right." : "Lower — try further left.";
        });
        controls.querySelector("#hk-ear-replay").addEventListener("click", () => playTone(midi, { duration: 0.5 }));
        controls.querySelector("#hk-ear-show").addEventListener("click", () => found("shown"));
        controls.querySelector("#hk-next").addEventListener("click", () => { kb.onKeyPress(() => {}); step++; renderStep(); });
      } else {
        markLessonComplete("lesson-eartraining");
        kb.clearHighlights();
        content.innerHTML = mascotSay(`<h3>That's ear training.</h3>
          <p>You just found a whole melody by trial and error — no sheet music, no chart. Try this same
             process on a song you actually like next; it gets faster every time you do it.</p>`);
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Back to lessons</button>`;
        controls.querySelector("#hk-done").addEventListener("click", showMap);
      }
    }
    renderStep = withStepBack(renderStep, { controls, kb, getState: () => ({ step }), setState: (s) => ({ step } = s) });
    renderStep();
  }

  // ----- Lesson 11: Almost Blue (early jazz preview) -----------------------
  // Honesty note: Almost Blue's own song-data entry is flagged
  // "needs-verification" — only its intro (Am, Dm9) has solid sourcing;
  // a third chord in the raw data is literally placeholder text ("see
  // notes"), not a real chord, so it's excluded here. This lesson
  // teaches only the two confidently-sourced intro chords, explicitly
  // labeled as a glimpse, not the full tune's harmony.
  function runAlmostBluePreview() {
    const song = SONGS.find((s) => s.title === "Almost Blue");
    const { content, keyboardWrap, controls } = lessonShell("Almost Blue");
    const kb = renderKeyboard(keyboardWrap, { startMidi: 48, endMidi: 84 });
    const introChords = ["Am", "Dm9"]; // the only two chords with solid independent sourcing
    let idx = 0;

    function renderStep() {
      if (idx < introChords.length) {
        const symbol = introChords[idx];
        const notes = chordSymbolToMidi(symbol);
        kb.highlightChord(notes, { letter: symbol, rootMidi: notes[0] });
        playChord(notes, { delay: 0.1 });
        content.innerHTML = `
          <p class="hk-step-indicator">Chord ${idx + 1} of ${introChords.length}</p>
          ${mascotSay(idx === 0
            ? `<h3>Almost Blue — a glimpse of real jazz ballad harmony.</h3>
               <p>Elvis Costello wrote it; Chet Baker's version made it a jazz standard. Honest heads-up:
                  only its first two chords are confidently sourced for this app — the rest of the tune's
                  harmony needs more research, so we're not guessing at it.</p>
               <p><strong>Press and hold ${symbol}.</strong></p>`
            : `<p><strong>Press and hold ${symbol}.</strong></p>`, "assets/mascot-poses/trombone.png")}`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Next chord</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { idx++; renderStep(); });
      } else {
        markLessonComplete("lesson-almostblue");
        kb.clearHighlights();
        content.innerHTML = mascotSay(`<h3>That's a real taste of jazz ballad harmony.</h3>
          <p>Just 2 chords of a much richer tune — an early preview of where the Jazz comping bonus lesson
             (later in the arc) goes much deeper.</p>`, "assets/mascot-poses/trombone.png");
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Back to lessons</button>`;
        controls.querySelector("#hk-done").addEventListener("click", showMap);
      }
    }
    renderStep = withStepBack(renderStep, { controls, kb, getState: () => ({ idx }), setState: (s) => ({ idx } = s) });
    renderStep();
  }

  // ----- Lesson 15: My Funny Valentine (the "minor line cliché") ----------
  function runMyFunnyValentinePreview() {
    const song = SONGS.find((s) => s.title === "My Funny Valentine");
    const { content, keyboardWrap, controls } = lessonShell("My Funny Valentine");
    const kb = renderKeyboard(keyboardWrap, { startMidi: 48, endMidi: 84 });
    let idx = 0;

    function renderStep() {
      if (idx < song.chords.length) {
        const symbol = song.chords[idx];
        // Item 56: voice the first Cm with a top C, so the famous line is
        // what you SEE move along the top: C → B → Bb → A, one half-step
        // per chord (CmMaj7/Cm7/Cm6 already end on B/Bb/A).
        const notes = symbol === "Cm" ? [...chordSymbolToMidi(symbol), 72] : chordSymbolToMidi(symbol);
        kb.highlightChord(notes, { letter: symbol, rootMidi: notes[0] });
        playChord(notes, { delay: 0.1 });
        content.innerHTML = `
          <p class="hk-step-indicator">Chord ${idx + 1} of ${song.chords.length}</p>
          ${mascotSay(idx === 0
            ? `<h3>My Funny Valentine — the "minor line cliché."</h3>
               <p>This exact 4-chord descending line is so famous it's nicknamed after this very song —
                  you'll hear it in countless other jazz tunes and film scores once you know to listen
                  for it. One note moves down by a half-step each chord: C, B, Bb, A.</p>
               <p>Watch the <strong>top key</strong>: it slides down one key at a time.</p>
               <p><strong>Press and hold ${symbol}.</strong></p>`
            : `<p><strong>Press and hold ${symbol}.</strong> The top key is now <strong>${({ 71: "B", 70: "Bb", 69: "A" })[notes[notes.length - 1]] || noteLetter(notes[notes.length - 1])}</strong>.</p>`, "assets/mascot-poses/harp.png")}`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Next chord</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { idx++; renderStep(); });
      } else {
        markLessonComplete("lesson-myfunnyvalentine");
        markSongStatus(song.title, "completed");
        kb.clearHighlights();
        content.innerHTML = mascotSay(`<h3>That descending line is real jazz vocabulary.</h3>
          <p>Keep an ear out for it — once you've heard it once, you'll start noticing it everywhere.</p>`, "assets/mascot-poses/harp.png");
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Back to lessons</button>`;
        controls.querySelector("#hk-done").addEventListener("click", showMap);
      }
    }
    renderStep = withStepBack(renderStep, { controls, kb, getState: () => ({ idx }), setState: (s) => ({ idx } = s) });
    renderStep();
  }

  // ----- Lesson 25: Für Elise (early classical preview) --------------------
  // Reuses the exact same verified FUR_ELISE_OPENING data as the Bonus:
  // Advanced repertoire lesson later in the arc — same real excerpt,
  // surfaced early as a taste per Sid's exact placement request.
  function runBeethovenShowcase() {
    const { content, keyboardWrap, controls } = lessonShell("Für Elise");
    const kb = renderKeyboard(keyboardWrap, { startMidi: 40, endMidi: 79 });
    let step = 0;

    function renderStep() {
      if (step === 0) {
        content.innerHTML = mascotSay(`
          <h3>An early preview: a real piece by a legend.</h3>
          <p>Beethoven's "Für Elise" (1810) — one of the most famous nine notes in piano repertoire.
             The full capstone two-hand treatment is still ahead in the arc; this is just a taste.</p>`, "assets/mascot-poses/composer.png");
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Play it</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step = 1; renderStep(); });
      } else if (step <= FUR_ELISE_OPENING.rightHand.length) {
        const i = step - 1;
        const midi = FUR_ELISE_OPENING.rightHand[i];
        kb.highlightHands({ left: FUR_ELISE_OPENING.leftHand, right: [midi], leftLabel: "A" });
        playTone(midi, { duration: 0.4 });
        if (i === 0) playChord(FUR_ELISE_OPENING.leftHand, { duration: 2.0, gain: 0.1 });
        content.innerHTML = `
          <p class="hk-step-indicator">Note ${i + 1} of ${FUR_ELISE_OPENING.rightHand.length}</p>
          ${mascotSay(`<p>Right hand (light blue) plays the melody; left hand (pink) holds the low A and E
             underneath, giving it that A-minor feel.</p>`)}`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Next</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step++; renderStep(); });
      } else {
        markLessonComplete("lesson-beethoven");
        kb.clearHighlights();
        content.innerHTML = mascotSay(`<h3>That's the most famous nine notes in piano repertoire.</h3>
          <p>The full piece gets considerably harder from here — a real taste, not the whole piece.</p>`, "assets/mascot-poses/composer.png");
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Back to lessons</button>`;
        controls.querySelector("#hk-done").addEventListener("click", showMap);
      }
    }
    renderStep = withStepBack(renderStep, { controls, kb, getState: () => ({ step }), setState: (s) => ({ step } = s) });
    renderStep();
  }

  // ----- Lesson 30: Vivaldi's Spring — an honest attempt -------------------
  // Sid's own word was "attempt." The full violin melodic theme is NOT
  // confidently reducible to a verified simple excerpt this pass (it's
  // genuinely a string-orchestra texture, and no independently-confirmed
  // simplified note-for-note version was found) — so rather than fake
  // one, this is honestly scoped down to just the single most iconic,
  // extremely well-documented fragment: the bright, repeated E major
  // chord hits that open the piece's ritornello, before the solo violin
  // melody even begins. Real, scoped, honest — not the full theme.
  function runVivaldiAttempt() {
    const { content, keyboardWrap, controls } = lessonShell("Vivaldi's Spring (an attempt)");
    const kb = renderKeyboard(keyboardWrap, { startMidi: 55, endMidi: 79 });
    const eMajor = chordSymbolToMidi("E");
    let hits = 0;
    const TOTAL_HITS = 4;

    function renderStep() {
      if (hits < TOTAL_HITS) {
        kb.highlightChord(eMajor, { letter: "E", rootMidi: eMajor[0] });
        playChord(eMajor, { duration: 0.4 });
        content.innerHTML = `
          <p class="hk-step-indicator">Chord hit ${hits + 1} of ${TOTAL_HITS}</p>
          ${mascotSay(hits === 0
            ? `<h3>An honest attempt, not the full piece.</h3>
               <p>Vivaldi's "Spring" opens with a bright, repeated E major chord, announcing the famous
                  theme before the solo violin even enters. That's what you're about to play.</p>
               <p class="hk-honest-note">Scoped down on purpose: the actual violin melody that follows is a
                  real string-orchestra texture that isn't confidently reducible to a verified beginner
                  excerpt yet — so rather than guess at it, this stays honestly limited to the iconic
                  opening gesture. The full catalog entry (still "attempt not complete") is in the
                  repertoire list on the Bonus: Advanced repertoire lesson.</p>
               <p><strong>Press the E chord.</strong></p>`
            : `<p><strong>Press the E chord again.</strong></p>`, "assets/mascot-poses/music-stand.png")}`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Next hit</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { hits++; renderStep(); });
      } else {
        markLessonComplete("lesson-vivaldi");
        kb.clearHighlights();
        content.innerHTML = mascotSay(`<h3>That's the honest attempt.</h3>
          <p>A real, scoped-down fragment — not a fabricated "simplified Spring." The full piece stays a
             verified catalog entry until it can be simplified responsibly.</p>`, "assets/mascot-poses/music-stand.png");
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Back to lessons</button>`;
        controls.querySelector("#hk-done").addEventListener("click", showMap);
      }
    }
    renderStep = withStepBack(renderStep, { controls, kb, getState: () => ({ hits }), setState: (s) => ({ hits } = s) });
    renderStep();
  }

  // ----- Lesson 35: Chopin's Nocturne — honest catalog showcase ------------
  // No fabricated note-by-note excerpt: independent verification of the
  // opening phrase's exact notes wasn't confidently obtained this pass,
  // so rather than guess, this lesson presents real, verified facts
  // about the piece and is explicit that it's catalog-only.
  function runChopinShowcase() {
    const entry = ADVANCED_REPERTOIRE.find((p) => p.title === "Nocturne Op. 9 No. 2");
    const { content, keyboardWrap, controls } = lessonShell("Chopin's Nocturne");
    keyboardWrap.innerHTML = "";
    content.innerHTML = mascotSay(`
      <h3>Nocturne Op. 9 No. 2 — Frédéric Chopin (1832)</h3>
      <p>Chopin's single most iconic piece, in ${entry ? entry.key : "Eb major"} — a flowing, lyrical
         melody over a broken-chord left hand, repeated three times with increasingly elaborate
         ornamentation each time.</p>
      <p class="hk-honest-note">Honest note: we did not build a note-by-note excerpt for this one.
         Independent sources confirm the piece's key, structure, and character, but not a specific,
         confidently-verified opening note sequence we'd be comfortable teaching as "the real thing" —
         rather than guess at the melody, this stays a real, verified catalog entry, same as several
         other pieces in the Bonus: Advanced repertoire lesson.</p>`, "assets/mascot-poses/mozart-scores.png");
    controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Back to lessons</button>`;
    controls.querySelector("#hk-done").addEventListener("click", () => {
      markLessonComplete("lesson-chopin");
      showMap();
    });
  }

  // ----- Lesson 1: 1-5-6-4 ---------------------------------------------
  // Redesigned per Sid's specific feedback on the old version (a "chord 2
  // of 4" screen that highlighted 2 keys with zero explanation of why).
  // Flow: find your starting key -> teach each chord one at a time with
  // every note spelled out plainly -> quiz -> play a real song -> rapid
  // "next song" montage -> tease the next lesson's social payoff -> a
  // genuine level-up moment tied to the real badge system. This is meant
  // to be the template other lessons eventually follow, not a one-off.
  function runLesson1() {
    const { content, keyboardWrap, controls } = lessonShell("Your first 4 chords: 1-5-6-4");
    // Item 50: widened from 55-79 to 41-79 so the "fingers" step's
    // left-hand mirror position (down to F3/MIDI 41) actually renders
    // on this lesson's keyboard instead of silently falling outside
    // its range.
    const kb = renderKeyboard(keyboardWrap, { startMidi: 41, endMidi: 79 });
    // Item 42: same computer-keyboard mapping as the standalone MIDI tab
    // (item 28), reused via the shared module — not a second mapping.
    // Touch/mouse tapping already works here for free (keyboard.js's
    // shared pointerdown/pointerup handling, same as every other tab).
    registerComputerKeyboardTarget(kb, keyboardWrap);

    // The featured "let's play a song" pick: must be a song whose real,
    // verified chords are LITERALLY G-D-Em-C (not just "same family in a
    // different key" with a capo caveat) — Shallow is the cleanest match
    // in the library (confirmed, no capo/alternate-version note).
    const FEATURED_SONG = SONGS.find((s) => s.title === "Shallow");
    // The opening hook (item 41) names two instantly-recognizable songs
    // directly in its headline — both independently verified as a true
    // G-D-Em-C / I-V-vi-IV match (not "same family, different key" or a
    // capo caveat). Sid's first suggestion, "Careless Whisper" by George
    // Michael, was checked and does NOT fit: its real chords are
    // Dm-Gm7-Bb-Am (i-iv-VI-v in D minor), a different progression
    // entirely — so "Let It Be" (The Beatles) is used instead, which the
    // library already has as an exact, confirmed match.
    const HOOK_SONG_1 = SONGS.find((s) => s.title === "Love Story");
    const HOOK_SONG_2 = SONGS.find((s) => s.title === "Let It Be");
    const montageSongs = ONE_FIVE_SIX_FOUR_SONGS.filter(
      (s) => s.title !== FEATURED_SONG.title && s.title !== HOOK_SONG_1.title && s.title !== HOOK_SONG_2.title
    );
    const montageSongsAfterTeaser = montageSongs;

    // Item 38/40: anchor every early chord to the one landmark already
    // established in "Get Started" (Middle C), the same equipment-
    // agnostic reasoning — "count white keys from Middle C" works no
    // matter how big or small the keyboard is, unlike counting from an
    // edge. C's root IS Middle C itself, a nice concrete callback.
    const CHORD_ANCHOR = {
      C: "Its root is <strong>Middle C itself</strong> — the exact key you found in Get Started.",
      D: "Its root is the <strong>2nd white key, counting Middle C as 1</strong>: C, D — the white key right next to Middle C. (Landmark: D always sits between the 2 black keys.)",
      Em: "Its root is the <strong>3rd white key, counting Middle C as 1</strong>: C, D, E. (Landmark: E is just right of the 2 black keys.)",
      G: "Its root is the <strong>5th white key, counting Middle C as 1</strong>: C, D, E, F, G. (Landmark: G sits inside the group of 3 black keys, after F.)",
    };

    // Optional, non-blocking reference link (item 38) — never inserted
    // into the required flow, just a small escape hatch for anyone
    // curious about the full keyboard/more chords than these 4.
    const REFERENCE_LINK = `<p class="hk-ref-link"><a href="reference.html" target="_blank" rel="noopener">
      Curious about all the keys and chords? Tap here — you don't need this right now to keep going.</a></p>`;

    // Item 42: a small, easy-to-ignore hint about the laptop-keyboard
    // shortcut — tap works everywhere already, this is just a bonus for
    // anyone without a real piano/keyboard handy and not touching a
    // touchscreen either.
    // Item 56: matches computer-keys.js's piano-shaped two-hand layout.
    const KEYBOARD_HINT = `<p class="hk-keyboard-hint">No piano handy? Tap the keys above, or on a laptop use
      your right hand on <strong>T Y U I O P [ ] \\</strong> (white keys, Middle C up to D) with the black keys on the
      number row just above — that covers this whole progression. The MIDI tab has the full key chart.</p>`;

    // Finding your starting key itself now has its own earlier lesson
    // ("Get Started" — see runGetStarted below); this lesson opens with
    // a hook/teaser instead of jumping straight into teaching (item 40).
    // Item 41: the hook is now one concrete, instantly-recognizable
    // screen (two real named songs + the actual 4 chords shown up
    // front) instead of cycling through abstract "proof" cards.
    let step = "teaser";
    let teachIdx = 0;
    let songIdx = 0;
    let montageIdx = 0;
    // Item 41: tracks the currently-mounted tuner widget (if any) so its
    // mic stream is released before the next step's content replaces
    // the DOM it's attached to — otherwise the mic would stay open.
    let activeTuner = null;
    function mountTuner(mountEl, targetMidi, opts) {
      if (activeTuner) activeTuner.destroy();
      activeTuner = createTunerWidget(mountEl, targetMidi, opts);
    }
    onLessonExit(() => activeTuner && activeTuner.stop());

    // Item 42: a real Back button, not just a visual flicker — every
    // forward transition below pushes a full snapshot of this lesson's
    // state onto `history` via `goForward()`; Back pops it and restores
    // the exact same variables renderStep() reads, so re-rendering the
    // previous step shows the same content it showed the first time.
    const history = [];
    function goForward(nextState) {
      history.push({ step, teachIdx, songIdx, montageIdx });
      Object.assign(lessonState, nextState);
      renderStep();
    }
    const lessonState = {
      get step() { return step; }, set step(v) { step = v; },
      get teachIdx() { return teachIdx; }, set teachIdx(v) { teachIdx = v; },
      get songIdx() { return songIdx; }, set songIdx(v) { songIdx = v; },
      get montageIdx() { return montageIdx; }, set montageIdx(v) { montageIdx = v; },
    };
    function goBack() {
      if (!history.length) return;
      const prev = history.pop();
      step = prev.step;
      teachIdx = prev.teachIdx;
      songIdx = prev.songIdx;
      montageIdx = prev.montageIdx;
      renderStep();
    }

    function renderStep() {
      if (activeTuner) { activeTuner.destroy(); activeTuner = null; }
      if (step === "teaser") {
        content.innerHTML = mascotSay(`
          <h3>Did you know 4 chords play over 100 songs?</h3>
          <p>From <strong>"${HOOK_SONG_1.title}"</strong> by ${HOOK_SONG_1.artist} to
             <strong>"${HOOK_SONG_2.title}"</strong> by ${HOOK_SONG_2.artist} — the same 4-chord pattern, every
             time. Each song just starts it from a different note.</p>
          <p>Chords are usually called by letters, but we'll learn them with <strong>numbers first</strong>
             (1-5-6-4) — it's easier, because the numbers stay the same in every song while the letters change.
             Here's the pattern starting from G, the version we'll learn first:</p>
          <div class="hk-chord-preview-row">
            ${LESSON1_SEQUENCE.map((k) => {
              const c = LESSON1_CHORDS[k];
              return `<span class="hk-chord-preview-pill">${c.number}<span class="hk-chord-preview-letter">${c.letter}</span></span>`;
            }).join("")}
          </div>
          <p><strong>Let's learn how.</strong></p>`, "assets/mascot-poses/maestro-conducting.png");
        // Item 50: this button used to say "Let's start with G" — but
        // the very next screen was the generic "what's a chord"
        // explainer, not G itself. That mismatch is exactly the
        // jump/non-sequitur Sid reported ("a step says let's learn G,
        // the next step jumps to slow down..."). Fixed by keeping this
        // transition's promise generic; the step that actually leads
        // into G (below) is the one that now says "G" in its button.
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Okay, show me how</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => goForward({ step: "key-and-numbers" }));
      } else if (step === "key-and-numbers") {
        // Item 52: two words/ideas just got used in the teaser ("key",
        // "numbers") that have never actually been explained — fixed
        // right here, at their first real use, same pattern as item
        // 51's numbering clarification.
        content.innerHTML = mascotSay(`
          <h3>Two quick words before we start: "key" and "numbers."</h3>
          <p>Every song has a <strong>"home" note</strong> — like home base in a game. In the songs we're
             about to play, G is home. We say they're <strong>"in the key of G."</strong> All the other chords
             are described by how far they are from home.</p>
          <p class="hk-honest-note">Heads up: that's a totally different "key" from the piano keys you press
             with your fingers. Same word, two different things — sorry about that!</p>
          <p>Here's a secret about the <strong>numbers</strong> (1-5-6-4): the exact same song pattern can
             start from ANY home note. Starting from G, it's G-D-Em-C. Starting from C instead, the very
             same pattern becomes C-G-Am-F — different letters, but it's still the same dance moves, just
             done in a different spot! The numbers are the dance moves — they never change. The letters are
             just which spot you're standing in. Learn the number-dance once, and you can spot it in ANY
             song, in ANY key, even when the letters look totally different.</p>`,
          "assets/mascot-poses/maestro-conducting.png");
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Got it</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => goForward({ step: "slowdown" }));
      } else if (step === "slowdown") {
        content.innerHTML = mascotSay(`
          <h3>Okay — let's slow down and actually learn this.</h3>
          <p>A <strong>chord</strong> just means pressing a few keys at once, together, so they ring out as
             one sound. That's the whole concept. One more quick thing before we press anything — where do
             your fingers actually go?</p>`);
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Show me</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => goForward({ step: "fingers" }));
      } else if (step === "fingers") {
        // Item 50: "where do my other fingers go?" — never explained
        // before. Standard beginner five-finger position: thumb = 1 on
        // both hands, fingers rest on the next 4 consecutive white keys
        // going outward from the thumb. Right hand's thumb sits on the
        // Middle C just taught in Get Started; left hand mirrors the
        // same shape downward so both thumbs meet near the middle.
        const RIGHT_FINGERS = [{ midi: 60, finger: 1 }, { midi: 62, finger: 2 }, { midi: 64, finger: 3 }, { midi: 65, finger: 4 }, { midi: 67, finger: 5 }];
        const LEFT_FINGERS = [{ midi: 48, finger: 1 }, { midi: 47, finger: 2 }, { midi: 45, finger: 3 }, { midi: 43, finger: 4 }, { midi: 41, finger: 5 }];
        kb.clearHighlights();
        kb.highlightHands({
          left: LEFT_FINGERS.map((f) => f.midi),
          right: RIGHT_FINGERS.map((f) => f.midi),
        });
        [...RIGHT_FINGERS, ...LEFT_FINGERS].forEach(({ midi, finger }) => {
          const el = kb.getKeyElement(midi);
          if (!el) return;
          const badge = document.createElement("div");
          badge.className = "hk-finger-badge";
          badge.textContent = finger;
          el.appendChild(badge);
        });
        content.innerHTML = mascotSay(`
          <h3>Thumb = finger 1, on both hands.</h3>
          <p>Rest your <strong>right thumb on Middle C</strong> — your other right-hand fingers naturally land
             on the next 4 white keys going up: <strong>C(1) D(2) E(3) F(4) G(5)</strong>.</p>
          <p>Your <strong>left hand mirrors it</strong>, going down from the C an octave below: <strong>C(1)
             B(2) A(3) G(4) F(5)</strong>. Both thumbs rest near the middle.</p>
          <p class="hk-honest-note">That's it for now — just a natural resting position, not a rule you have
             to force. We'll come back to real fingering later in the course.</p>`);
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Got it — find our first chord</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => goForward({ step: "find-g" }));
      } else if (step === "find-g") {
        const gChord = LESSON1_CHORDS.G;
        kb.highlightChord([gChord.root], { letter: "G", rootMidi: gChord.root });
        playTone(gChord.root, { duration: 0.6 });
        content.innerHTML = mascotSay(`
          <h3>First, find G — no matter what keyboard you've got.</h3>
          <p>Start from the <strong>Middle C you found in Get Started</strong>. Now count 5 white keys to the
             right, including Middle C itself: <strong>C, D, E, F, G</strong>. That last one, G, is lit up
             below. This works the same way whether your keyboard has 25 keys or 88 — always count from
             Middle C, never from the edge.</p>
          <p><strong>Press that G key now.</strong></p>
          <div class="hk-tuner-mount"></div>`) + KEYBOARD_HINT;
        // Item 41: an optional, genuinely non-forced tuner-style match
        // button — same mic pitch-detector as Get Started's Middle-C
        // calibration and Practice's Ear Check, just made available
        // right here too for anyone who wants extra confidence.
        mountTuner(content.querySelector(".hk-tuner-mount"), gChord.root, { label: "Tune this note (optional)" });
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Got it</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => goForward({ step: "teach", teachIdx: 0 }));
      } else if (step === "teach") {
        const key = LESSON1_SEQUENCE[teachIdx];
        const chord = LESSON1_CHORDS[key];
        const noteNames = chord.notes.map((n) => noteLetter(n));
        kb.highlightChord(chord.notes, { number: chord.number, letter: chord.letter, rootMidi: chord.root });
        content.innerHTML = `
          <p class="hk-step-indicator">Chord ${teachIdx + 1} of 4</p>
          <div class="hk-big-degree">${chord.number}<span class="hk-big-letter">${chord.letter}</span></div>
          ${mascotSay(`
            <p>This chord's <strong>name is ${chord.letter}</strong> — named after its <strong>root</strong>, the
               note it's built up from (here that's also its lowest note). It's made of ${chord.notes.length}
               individual keys, <strong>named ${noteNames.join(", ")}</strong>: press all ${chord.notes.length}
               together and that's the ${chord.letter} chord. ${teachIdx === 0 ? `So "G" on its own means one key;
               "the G chord" means these three keys together, built up from G.` : ""}</p>
            <p>${CHORD_ANCHOR[key]}</p>
            ${/m$/.test(chord.letter) ? `<p class="hk-honest-note">The small <strong>"m"</strong> means
               <strong>minor</strong>: ${chord.letter} is "${chord.letter.replace(/m$/, "")} minor" — a softer, sadder-sounding
               chord than a plain (major) one. You'll hear the difference properly in "Major or minor? It's a pattern."</p>` : ""}
            ${noteNames.some((n) => n.includes("#")) ? `<p class="hk-honest-note"><strong>Your first black key!</strong>
               Black keys are named after the white key next to them. The black key just to the RIGHT of a white
               key is its <strong>sharp</strong> (#): the black key right of F is <strong>F#</strong> ("F sharp").
               The black key just to the LEFT of a white key is its <strong>flat</strong> (b): that same key is also
               called G♭. One key over — black or white — is called a <strong>half-step</strong>.</p>` : ""}
            ${teachIdx === 0 ? `<p class="hk-honest-note">Quick heads-up: the big <strong>1</strong> next to G
               here is a totally different "number" from the 5 we counted earlier to physically find G on the
               keyboard. That counting was about location (5 white keys from Middle C). This 1-5-6-4 numbering
               is about position in the SONG — G is always "1" because it's this song's home base (its key),
               no matter where it physically sits on your keyboard. Don't mix the two up.</p>` : ""}
            <p><strong>Press all ${chord.notes.length} lit-up keys now.</strong> Then tap Next.</p>
            <div class="hk-tuner-mount"></div>`)}
          ${KEYBOARD_HINT}`;
        mountTuner(content.querySelector(".hk-tuner-mount"), chord.root, {
          label: `Tune this note (${chord.letter}'s root, optional)`,
        });
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Next</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => {
          if (teachIdx < LESSON1_SEQUENCE.length - 1) goForward({ teachIdx: teachIdx + 1 });
          else goForward({ step: "other-chords" });
        });
        playChord(chord.notes, { delay: 0.1 });
      } else if (step === "other-chords") {
        kb.clearHighlights();
        content.innerHTML = `
          ${mascotSay(`<h3>These 4 are the most useful to start.</h3>
            <p>There are other chords out there too — you don't need them yet, these 4 alone unlock a huge
               number of real songs.</p>`)}
          ${REFERENCE_LINK}`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Quiz me</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => goForward({ step: "quiz" }));
      } else if (step === "quiz") {
        content.innerHTML = `
          ${mascotSay(`<p>Now play all four in order: <strong>1 (G) &rarr; 5 (D) &rarr; 6 (Em) &rarr; 4 (C)</strong>.
             Press the bottom note of each chord, one at a time, and I'll follow along.</p>`)}
          <p id="hk-quiz-progress">Press the <strong>1 chord (G)</strong> root key.</p>`;
        controls.innerHTML = "";
        kb.clearHighlights();
        const roots = LESSON1_SEQUENCE.map((k) => LESSON1_CHORDS[k].root);
        let idx = 0;
        kb.onKeyPress((midi) => {
          if (midi === roots[idx]) {
            idx++;
            if (idx < roots.length) {
              const nextChord = LESSON1_CHORDS[LESSON1_SEQUENCE[idx]];
              content.querySelector("#hk-quiz-progress").innerHTML =
                `Press the <strong>${nextChord.number} chord (${nextChord.letter})</strong> root key.`;
            } else {
              goForward({ step: "song-intro" });
            }
          }
        });
      } else if (step === "song-intro") {
        kb.clearHighlights();
        kb.onKeyPress(() => {});
        content.innerHTML = mascotSay(`
          <h3>Let's play a real song.</h3>
          <p>"<strong>${FEATURED_SONG.title}</strong>" by ${FEATURED_SONG.artist} uses exactly these four chords, in
             exactly this order — G, D, Em, C. Nothing new to learn, just the shapes you already know.</p>`);
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Play along</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => goForward({ songIdx: 0, step: "song" }));
      } else if (step === "song") {
        const key = FEATURED_SONG.chords[songIdx];
        const chord = LESSON1_CHORDS[key];
        kb.highlightChord(chord.notes, { number: chord.number, letter: chord.letter, rootMidi: chord.root });
        content.innerHTML = `
          <p class="hk-step-indicator">${FEATURED_SONG.title} — chord ${songIdx + 1} of ${FEATURED_SONG.chords.length}</p>
          <div class="hk-big-degree">${chord.number}<span class="hk-big-letter">${chord.letter}</span></div>
          ${mascotSay(`<p>Press and hold <strong>${chord.letter}</strong> along with the song.</p>`)}`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Next chord</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => {
          if (songIdx < FEATURED_SONG.chords.length - 1) goForward({ songIdx: songIdx + 1 });
          else goForward({ step: "montage-intro" });
        });
        playChord(chord.notes, { delay: 0.1 });
      } else if (step === "montage-intro") {
        kb.clearHighlights();
        content.innerHTML = mascotSay(`
          <h3>Remember "${HOOK_SONG_1.title}" and "${HOOK_SONG_2.title}" from the very start? Here's even more proof.</h3>
          <p>Same 1-5-6-4 pattern, same order — here's a quick run through ${montageSongsAfterTeaser.length} more real
             songs in the library that use it (in whatever key each song is in). Just tap through, next song, next song.</p>
          <p class="hk-honest-note">You'll see the pattern written as <strong>I - V - vi - IV</strong>. Those are just
             Roman numerals for the same numbers (I = 1, IV = 4, V = 5, vi = 6). <strong>CAPITALS</strong> mean a
             major chord, <strong>lowercase</strong> means minor — that's why the 6 (Em) is written small.</p>`);
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Go</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => goForward({ montageIdx: 0, step: "montage" }));
      } else if (step === "montage") {
        const s = montageSongsAfterTeaser[montageIdx];
        content.innerHTML = `
          <p class="hk-step-indicator">Song ${montageIdx + 1} of ${montageSongsAfterTeaser.length}</p>
          ${mascotSay(`<h3>${s.title}</h3><p>${s.artist} — same 1-5-6-4 pattern (${s.degreeSequence})${s.key ? `, in ${s.key}` : ""}: <strong>${s.chords.join(" - ")}</strong>.</p>`)}`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Next song</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => {
          if (montageIdx < montageSongsAfterTeaser.length - 1) goForward({ montageIdx: montageIdx + 1 });
          else goForward({ step: "social" });
        });
      } else if (step === "social") {
        content.innerHTML = mascotSay(`
          <h3>Next lesson: get a friend and sing along.</h3>
          <p>You've got these 4 chords down. The next step isn't more theory — it's playing a full song (verse,
             chorus, the works) while someone else sings on top. Genuinely the most fun part of this whole thing.</p>`);
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Continue</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => goForward({ step: "levelup" }));
      } else {
        // levelup
        markLessonComplete("lesson-1");
        const { newlyEarned } = checkBadges();
        const earned = newlyEarned.find((b) => b.id === "first-lesson");
        const exact = ONE_FIVE_SIX_FOUR_SONGS.filter((s) => s.oneFiveSixFourMatch === "exact");
        const variant = ONE_FIVE_SIX_FOUR_SONGS.filter((s) => s.oneFiveSixFourMatch === "variant");
        content.innerHTML = `
          <div class="hk-levelup">
            ${mascotSay(earned
              ? `<h3>You unlocked a level!</h3>
                 <div class="hk-levelup-badge">${earned.icon} <strong>${earned.title}</strong></div>
                 <p>${earned.desc}</p>`
              : `<h3>Lesson complete.</h3><p>Nice work going through Lesson 1 again.</p>`,
              earned ? "assets/mascot-poses/maestro-conducting.png" : "assets/mascot-face.png")}
            <p>Out of the ${SONGS.length} songs in this app's library, <strong>${ONE_FIVE_SIX_FOUR_SONGS.length}</strong> use this
               same four-chord family (${exact.length} the exact same loop, ${variant.length} the same 4 chords in a
               different order). The rest use other — often minor-key or more complex — patterns, which is exactly
               what later lessons cover.</p>
          </div>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Back to lessons</button>`;
        controls.querySelector("#hk-done").addEventListener("click", showMap);
      }
      // Item 42: a real "Back" control, added uniformly after whichever
      // branch above just rendered this step's Next/done button — pops
      // the history stack and restores the exact previous state rather
      // than just visually flickering. Hidden on the very first step
      // (nothing to go back to).
      if (history.length > 0) {
        const backBtn = document.createElement("button");
        backBtn.type = "button";
        backBtn.className = "hk-btn hk-btn-lesson-back";
        backBtn.id = "hk-back";
        backBtn.textContent = "Back";
        backBtn.addEventListener("click", goBack);
        controls.insertBefore(backBtn, controls.firstChild);
      }
    }
    renderStep();
  }

  // ----- Lesson 2: major/minor pattern --------------------------------
  function runLesson2() {
    const { content, keyboardWrap, controls } = lessonShell("Major or minor? It's a pattern");
    const kb = renderKeyboard(keyboardWrap, { startMidi: 60, endMidi: 84 });
    let step = 0; // 0..6 walk degrees 1-7, 7 = explanation, 8 = quiz, 9 = done

    function renderStep() {
      if (step < 7) {
        const d = LESSON2_DEGREES[step];
        kb.highlightChord(d.notes, { number: String(d.degree), letter: d.letter, rootMidi: d.notes[0] });
        content.innerHTML = `
          <p class="hk-step-indicator">Degree ${d.degree} of 7</p>
          <div class="hk-big-degree">${d.degree}<span class="hk-big-letter">${d.letter}</span></div>
          ${mascotSay(`<p>This is the ${ordinal(String(d.degree))} chord. In the key of G, it's <strong>${d.letter}</strong>,
             and it sounds <strong>${d.quality}</strong>.</p>`)}`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Next</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => {
          step++;
          renderStep();
        });
        playChord(d.notes, { delay: 0.1 });
      } else if (step === 7) {
        kb.clearHighlights();
        content.innerHTML = mascotSay(`
          <h3>This is true in every key, not just G.</h3>
          <p>In <strong>any</strong> major key: degrees <strong>1, 4, 5</strong> always sound major.
             Degrees <strong>2, 3, 6</strong> always sound minor. Degree <strong>7</strong> sounds unstable,
             like it wants to resolve somewhere else (musicians call this "diminished" — you don't need the
             word, just the sound).</p>
          <p>That's the whole trick: learn the pattern of numbers once, and it works in every key.</p>`);
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Try it</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => {
          step = 8;
          renderStep();
        });
      } else if (step === 8) {
        content.innerHTML = `
          <p>Click every key (1-7) below that you think is a <strong>minor</strong> chord in a major key.</p>
          <p id="hk-quiz-status"></p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-check">Check my answer</button>`;
        kb.clearHighlights();
        const selected = new Set();
        LESSON2_DEGREES.forEach((d) => {
          const el = kb.getKeyElement(d.notes[0]);
          if (!el) return;
          el.classList.add("hk-key-selectable");
          el.dataset.degree = String(d.degree);
        });
        kb.onKeyPress((midi) => {
          const d = LESSON2_DEGREES.find((x) => x.notes[0] === midi);
          if (!d) return;
          if (selected.has(d.degree)) {
            selected.delete(d.degree);
            kb.getKeyElement(midi).classList.remove("hk-key-highlight");
          } else {
            selected.add(d.degree);
            kb.getKeyElement(midi).classList.add("hk-key-highlight");
          }
        });
        controls.querySelector("#hk-check").addEventListener("click", () => {
          const correct =
            selected.size === MINOR_DEGREES.length &&
            MINOR_DEGREES.every((d) => selected.has(d));
          content.querySelector("#hk-quiz-status").innerHTML = correct
            ? "Correct — 2, 3, and 6 are the minor chords in any major key."
            : "Not quite — the minor chords in any major key are 2, 3, and 6. Try again or move on.";
          if (correct) {
            step = 9;
            setTimeout(renderStep, 1200);
          }
        });
      } else {
        markLessonComplete("lesson-2");
        kb.clearHighlights();
        kb.onKeyPress(() => {});
        content.innerHTML = `<h3>Lesson complete.</h3><p>You now know why some chords "just sound" minor — it's not random, it's the major-scale pattern.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Back to lessons</button>`;
        controls.querySelector("#hk-done").addEventListener("click", showMap);
      }
    }
    renderStep = withStepBack(renderStep, { controls, kb, getState: () => ({ step }), setState: (s) => ({ step } = s) });
    renderStep();
  }

  // ----- Lesson 3: staff notation (optional "go deeper" track) --------
  function runLesson3() {
    const { content, keyboardWrap, controls } = lessonShell("Go deeper: reading real notation");
    const kb = renderKeyboard(keyboardWrap, { startMidi: 55, endMidi: 79 });
    let step = 0;

    function renderStep() {
      if (step === 0) {
        content.innerHTML = `
          ${mascotSay(`<h3>Traditional notation: an optional, deeper layer</h3>
          <p>Everything so far used numbers and letters. Professional sheet music uses a 5-line <strong>staff</strong> instead —
             each vertical position is a different note. You don't need this to play along in this app, but it's worth knowing.</p>
          <p>Here's "Ode to Joy" (Beethoven, 1824 — public domain), one note at a time:</p>`, "assets/mascot-poses/music-stand.png")}
          <div id="hk-staff-wrap">${renderStaffSvg(ODE_TO_JOY_MELODY, -1)}</div>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Start</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => {
          step = 1;
          renderStep();
        });
      } else if (step <= ODE_TO_JOY_MELODY.length) {
        const i = step - 1;
        const midi = ODE_TO_JOY_MELODY[i];
        kb.highlightChord([midi], { rootMidi: midi });
        playTone(midi, { duration: 0.5 });
        content.innerHTML = `
          <p class="hk-step-indicator">Note ${i + 1} of ${ODE_TO_JOY_MELODY.length}</p>
          ${mascotSay(`<p>Find it highlighted on the keyboard, then press Next.</p>`)}
          <div id="hk-staff-wrap">${renderStaffSvg(ODE_TO_JOY_MELODY, i)}</div>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Next</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => {
          step++;
          renderStep();
        });
      } else {
        markLessonComplete("lesson-3");
        kb.clearHighlights();
        content.innerHTML = mascotSay(`
          <h3>You just read your first melody from staff notation.</h3>
          <p>This "go deeper" track is just getting started — full staff-reading lessons for chords and rhythm are a
             Phase 2 roadmap item (see the README).</p>`);
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Back to lessons</button>`;
        controls.querySelector("#hk-done").addEventListener("click", showMap);
      }
    }
    renderStep = withStepBack(renderStep, { controls, kb, getState: () => ({ step }), setState: (s) => ({ step } = s) });
    renderStep();
  }

  // ----- Lesson 4: flip the order, 1-6-4-5 -----------------------------
  function runLesson4() {
    const { content, keyboardWrap, controls } = lessonShell("Flip the order: 1-6-4-5");
    const kb = renderKeyboard(keyboardWrap, { startMidi: 55, endMidi: 79 });
    let step = 0; // 0..3 teach, 4 quiz, 5 payoff

    function renderStep() {
      if (step < 4) {
        const key = LESSON4_SEQUENCE[step];
        const chord = LESSON1_CHORDS[key];
        kb.highlightChord(chord.notes, { number: chord.number, letter: chord.letter, rootMidi: chord.root });
        content.innerHTML = `
          <p class="hk-step-indicator">Chord ${step + 1} of 4</p>
          <div class="hk-big-degree">${chord.number}<span class="hk-big-letter">${chord.letter}</span></div>
          ${mascotSay(`<p>Same shape you already know from Lesson 1 — <strong>${chord.letter} ${chord.quality}</strong> — just visited in a
             different order this time: 1, 6, 4, 5.</p>`)}`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Next</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step++; renderStep(); });
        playChord(chord.notes, { delay: 0.1 });
      } else if (step === 4) {
        content.innerHTML = `
          ${mascotSay(`<p>Play them in the new order: <strong>1 (G) &rarr; 6 (Em) &rarr; 4 (C) &rarr; 5 (D)</strong>.</p>`)}
          <p id="hk-quiz-progress">Press the <strong>1 chord (G)</strong> root key.</p>`;
        controls.innerHTML = "";
        kb.clearHighlights();
        const roots = LESSON4_SEQUENCE.map((k) => LESSON1_CHORDS[k].root);
        let idx = 0;
        kb.onKeyPress((midi) => {
          if (midi === roots[idx]) {
            idx++;
            if (idx < roots.length) {
              const nextChord = LESSON1_CHORDS[LESSON4_SEQUENCE[idx]];
              content.querySelector("#hk-quiz-progress").innerHTML =
                `Press the <strong>${nextChord.number} chord (${nextChord.letter})</strong> root key.`;
            } else {
              step = 5;
              renderStep();
            }
          }
        });
      } else {
        markLessonComplete("lesson-4");
        kb.clearHighlights();
        kb.onKeyPress(() => {});
        const variant = SONGS.filter((s) => s.fourChordOrderFamily === "C" || s.fourChordOrderFamily === "D");
        content.innerHTML = mascotSay(`
          <h3>Same four chords, new order — a different set of songs.</h3>
          <p><strong>${variant.length} of ${SONGS.length}</strong> library songs use this specific I-vi-IV-V (or the very
             close I-vi-V-IV) order:</p>
          <ul>${variant.map((s) => `<li>${s.title} — ${s.artist} (${s.degreeSequence})</li>`).join("")}</ul>
          <p class="hk-honest-note">Small, honest number — most "4-chord" songs use the Lesson 1 order, not this one. Still real.
             (There's a third variant, Lesson 1's payoff screen calls out separately — same four chords walked in the opposite
             direction, which sounds different enough that we don't credit it here.)</p>`);
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Back to lessons</button>`;
        controls.querySelector("#hk-done").addEventListener("click", showMap);
      }
    }
    renderStep = withStepBack(renderStep, { controls, kb, getState: () => ({ step }), setState: (s) => ({ step } = s) });
    renderStep();
  }

  // ----- Lesson 5: the 2 chord ------------------------------------------
  function runLesson5() {
    const { content, keyboardWrap, controls } = lessonShell("A fifth chord: meet the 2");
    const kb = renderKeyboard(keyboardWrap, { startMidi: 55, endMidi: 79 });
    let step = 0; // 0 teach, 1 quiz (press it), 2 payoff

    function renderStep() {
      if (step === 0) {
        kb.highlightChord(LESSON5_CHORD.notes, { number: LESSON5_CHORD.number, letter: LESSON5_CHORD.letter, rootMidi: LESSON5_CHORD.root });
        content.innerHTML = `
          <p class="hk-step-indicator">A new shape</p>
          <div class="hk-big-degree">2<span class="hk-big-letter">Am</span></div>
          ${mascotSay(`<p>Beyond the core four, this is "the 2nd" — in G major, that's <strong>A minor</strong>. You already know from
             "Major or minor? It's a pattern" that degree 2 is always minor in a major key — this is that chord.</p>`)}`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Try it</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step = 1; renderStep(); });
        playChord(LESSON5_CHORD.notes, { delay: 0.1 });
      } else if (step === 1) {
        content.innerHTML = mascotSay(`<p>Press the <strong>2 chord (Am)</strong> root key to confirm you've got it.</p><p id="hk-quiz-progress"></p>`);
        controls.innerHTML = "";
        kb.onKeyPress((midi) => {
          if (midi === LESSON5_CHORD.root) {
            step = 2;
            renderStep();
          }
        });
      } else {
        markLessonComplete("lesson-5");
        kb.clearHighlights();
        kb.onKeyPress(() => {});
        const usesIi = SONGS.filter((s) => s.confidence === "confirmed" && /\bii\b/.test(s.degreeSequence));
        content.innerHTML = mascotSay(`
          <h3>One more shape, more of the library unlocked.</h3>
          <p><strong>${usesIi.length} of ${SONGS.length}</strong> confirmed-chord songs use the 2 (ii) chord somewhere in their progression:</p>
          <ul>${usesIi.map((s) => `<li>${s.title} — ${s.artist} (${s.degreeSequence})</li>`).join("")}</ul>`);
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Back to lessons</button>`;
        controls.querySelector("#hk-done").addEventListener("click", showMap);
      }
    }
    renderStep = withStepBack(renderStep, { controls, kb, getState: () => ({ step }), setState: (s) => ({ step } = s) });
    renderStep();
  }

  // ----- Lesson 6: minor keys have a pattern too -------------------------
  function runLesson6() {
    const { content, keyboardWrap, controls } = lessonShell("Minor keys have a pattern too");
    const kb = renderKeyboard(keyboardWrap, { startMidi: 50, endMidi: 79 });
    let step = 0; // 0..6 walk degrees, 7 explain, 8 quiz, 9 done

    function renderStep() {
      if (step < 7) {
        const d = LESSON6_DEGREES[step];
        kb.highlightChord(d.notes, { number: d.degree, letter: d.letter, rootMidi: d.notes[0] });
        content.innerHTML = `
          <p class="hk-step-indicator">Degree ${d.degree} of 7 (A natural minor)</p>
          <div class="hk-big-degree">${d.roman}<span class="hk-big-letter">${d.letter}</span></div>
          ${mascotSay(`<p>In A minor, this chord is <strong>${d.quality}</strong>.</p>`)}`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Next</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step++; renderStep(); });
        playChord(d.notes, { delay: 0.1 });
      } else if (step === 7) {
        kb.clearHighlights();
        content.innerHTML = mascotSay(`
          <h3>Minor keys have their own major/minor pattern — just shifted.</h3>
          <p>In <strong>any</strong> natural minor key: degrees <strong>1, 4, 5</strong> are minor. Degrees
             <strong>3, 6, 7</strong> are major. Degree <strong>2</strong> is diminished. This is the single biggest
             reason the library's minor-key songs sound the way they do.</p>`);
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Try it</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step = 8; renderStep(); });
      } else if (step === 8) {
        content.innerHTML = mascotSay(`<p>Click every key (1-7) that you think is <strong>minor</strong> in a natural minor key.</p><p id="hk-quiz-status"></p>`);
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-check">Check my answer</button>`;
        kb.clearHighlights();
        const selected = new Set();
        kb.onKeyPress((midi) => {
          const d = LESSON6_DEGREES.find((x) => x.notes[0] === midi);
          if (!d) return;
          if (selected.has(d.degree)) { selected.delete(d.degree); kb.getKeyElement(midi).classList.remove("hk-key-highlight"); }
          else { selected.add(d.degree); kb.getKeyElement(midi).classList.add("hk-key-highlight"); }
        });
        controls.querySelector("#hk-check").addEventListener("click", () => {
          const correct = selected.size === MINOR_KEY_MINOR_DEGREES.length && MINOR_KEY_MINOR_DEGREES.every((d) => selected.has(d));
          content.querySelector("#hk-quiz-status").innerHTML = correct
            ? "Correct — 1, 4, and 5 are minor in any natural minor key."
            : "Not quite — the minor chords are degrees 1, 4, and 5. Try again or move on.";
          if (correct) { step = 9; setTimeout(renderStep, 1200); }
        });
      } else {
        markLessonComplete("lesson-6");
        kb.clearHighlights();
        kb.onKeyPress(() => {});
        const minorKeySongs = SONGS.filter((s) => s.confidence === "confirmed" && /minor/i.test(s.key));
        content.innerHTML = mascotSay(`
          <h3>This is the big one — most of the library is minor-key.</h3>
          <p><strong>${minorKeySongs.length} of ${SONGS.length}</strong> confirmed-chord songs are in a minor key:</p>
          <ul>${minorKeySongs.map((s) => `<li>${s.title} — ${s.artist} (${s.key})</li>`).join("")}</ul>
          <p class="hk-honest-note">Knowing the pattern doesn't mean every chord choice is "obvious" yet (some songs
             borrow chords from outside the key for effect) — but it explains most of what you're hearing.</p>`);
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Back to lessons</button>`;
        controls.querySelector("#hk-done").addEventListener("click", showMap);
      }
    }
    renderStep = withStepBack(renderStep, { controls, kb, getState: () => ({ step }), setState: (s) => ({ step } = s) });
    renderStep();
  }

  // ----- Lesson "touch": dynamics, rubato, legato (item 46) --------------
  // HOW a key is pressed, not just which key — kept general/defensible
  // (soft-to-intense contrast, legato phrasing, slight tempo flexibility)
  // rather than inventing bar-by-bar dynamic markings for a specific
  // commercial recording nobody here has actually transcribed.
  function runLessonTouch() {
    const { content, controls } = lessonShell("Touch matters, not just which keys");
    const touchSong = SONGS.find((s) => s.title === "Make You Feel My Love");
    let step = "intro";
    const history = [];
    function goForward(next) {
      history.push(step);
      step = next;
      renderStep();
    }
    function goBack() {
      if (!history.length) return;
      step = history.pop();
      renderStep();
    }

    function renderStep() {
      if (step === "intro") {
        content.innerHTML = mascotSay(`
          <h3>Pause — let's see if touch matters as much as the keys themselves.</h3>
          <p>Everything so far has been about <strong>which</strong> keys to press. This lesson is about
             <strong>how</strong> you press them — pressing the exact same chord two different ways can make
             it sound like two completely different moments in a song.</p>`);
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Let's go</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => goForward("velocity"));
      } else if (step === "velocity") {
        content.innerHTML = mascotSay(`
          <h3>1. Velocity — how HARD you press.</h3>
          <p>Press a key harder and it plays <strong>louder and more intense</strong>. Press it softer and it's
             <strong>gentler, more intimate</strong>. Real pianists use this on purpose: a quiet, soft touch for
             a hushed verse, then pressing harder to match a big emotional chorus.</p>`);
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Next</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => goForward("rubato"));
      } else if (step === "rubato") {
        content.innerHTML = mascotSay(`
          <h3>2. Rubato — bending the timing on purpose.</h3>
          <p><strong>Rubato</strong> is just a fancy Italian word (it literally means "robbed time") for a
             simple idea: slowing down slightly right at a moment that matters, or letting a note "linger" a
             touch longer than written, for emotional emphasis. You'll hear this constantly in slow ballads —
             the tempo isn't perfectly robotic, it breathes.</p>`);
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Next</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => goForward("legato"));
      } else if (step === "legato") {
        content.innerHTML = mascotSay(`
          <h3>3. Legato — connecting the notes.</h3>
          <p><strong>Legato</strong> means holding/connecting notes smoothly into each other, rather than
             playing them short and detached (that detached style is called "staccato" — the opposite). For
             slow, romantic songs, legato is what makes a chord progression sound like it's flowing, not
             choppy.</p>
          <p class="hk-honest-note">One more small trick while we're here: try pressing the very first beat
             of a chord progression a touch harder than the rest — it gives the ear a clear sense of "here's
             where the pattern restarts," the same way a drummer accents beat 1.</p>`);
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">See it in a real song</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => goForward("example"));
      } else if (step === "example") {
        content.innerHTML = mascotSay(`
          <h3>Worked example: "${touchSong ? touchSong.title : "Make You Feel My Love"}" — ${touchSong ? touchSong.artist : "Adele"}</h3>
          <p>This is a slow piano ballad with real soft-to-intense contrast: quieter, more restrained verses
             building toward a more intense, emotional peak later in the song. It's also a great candidate for
             <strong>legato</strong> phrasing — holding each chord smoothly into the next — and a little
             <strong>rubato</strong>, easing the tempo slightly at the most emotional phrases rather than
             keeping strict, robotic timing.</p>
          <p class="hk-honest-note">We're keeping this general on purpose: "softer verses, more intense peak,
             legato, slight rubato" are real, defensible things about how a song like this is usually played —
             not specific bar-by-bar dynamic markings from a transcription of one particular recording.</p>`,
          "assets/mascot-poses/dreaming-notes.png");
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Got it</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => goForward("done"));
      } else {
        markLessonComplete("lesson-touch");
        content.innerHTML = mascotSay(`
          <h3>Lesson complete.</h3>
          <p>Next time you play a chord you already know, try it two ways on purpose — soft and held
             (legato), then firmer and a touch rushed — and notice how different the exact same notes can
             feel.</p>`);
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Back to lessons</button>`;
        controls.querySelector("#hk-done").addEventListener("click", showMap);
      }
      if (history.length > 0) {
        const backBtn = document.createElement("button");
        backBtn.type = "button";
        backBtn.className = "hk-btn hk-btn-lesson-back";
        backBtn.id = "hk-back";
        backBtn.textContent = "Back";
        backBtn.addEventListener("click", goBack);
        controls.insertBefore(backBtn, controls.firstChild);
      }
    }
    renderStep();
  }

  // ----- Chord-recognition ear-training quiz (item 47) -------------------
  // End-of-Intermediate checkpoint: no new chords, just testing whether
  // the ear recognizes what the eyes already learned to read. Reuses
  // LESSON2_DEGREES' real chord data (already taught back in Lesson 2)
  // rather than inventing a separate chord pool.
  const QUIZ_CHORD_POOL = LESSON2_DEGREES.filter((d) => d.quality !== "diminished");

  function runChordQuizLesson() {
    const { content, controls } = lessonShell("Can you guess the chord?");
    let step = "intro";
    let round = 0;
    const TOTAL_ROUNDS = 5;
    let correctCount = 0;
    let currentCorrect = null;
    let currentOptions = [];
    let answered = false;

    function newRound() {
      const correctIdx = Math.floor(Math.random() * QUIZ_CHORD_POOL.length);
      currentCorrect = QUIZ_CHORD_POOL[correctIdx];
      const distractorPool = QUIZ_CHORD_POOL.filter((_, i) => i !== correctIdx);
      // Shuffle and take 3 distractors — "plausible" here just means
      // "other real chords from the same already-taught set," a real
      // ear-training challenge rather than a random unrelated guess.
      const shuffled = [...distractorPool].sort(() => Math.random() - 0.5).slice(0, 3);
      currentOptions = [currentCorrect, ...shuffled].sort(() => Math.random() - 0.5);
      answered = false;
    }

    function playCurrentChord() {
      playChord(currentCorrect.notes, { delay: 0.05 });
    }

    function renderStep() {
      if (step === "intro") {
        content.innerHTML = mascotSay(`
          <h3>Pause — let's see if your ears know these chords as well as your eyes do.</h3>
          <p>No new chords here. I'll play one you already know, you pick which one it was by ear — ${TOTAL_ROUNDS}
             quick rounds.</p>`, "assets/mascot-poses/music-stand.png");
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Start</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => {
          round = 0;
          correctCount = 0;
          newRound();
          step = "quiz";
          renderStep();
        });
      } else if (step === "quiz") {
        content.innerHTML = `
          <p class="hk-step-indicator">Question ${round + 1} of ${TOTAL_ROUNDS}</p>
          ${mascotSay(`<p>Listen — which chord is this?</p>`)}
          <button class="hk-btn" id="hk-quiz-replay">&#9658; Play it again</button>
          <div class="hk-quiz-options">
            ${currentOptions.map((o, i) => `<button class="hk-btn hk-quiz-option" data-opt="${i}">${o.letter}</button>`).join("")}
          </div>
          <p id="hk-quiz-feedback" class="hk-quiz-feedback"></p>`;
        controls.innerHTML = "";
        content.querySelector("#hk-quiz-replay").addEventListener("click", playCurrentChord);
        content.querySelectorAll(".hk-quiz-option").forEach((btn, i) => {
          btn.addEventListener("click", () => {
            if (answered) return;
            answered = true;
            const picked = currentOptions[i];
            const feedback = content.querySelector("#hk-quiz-feedback");
            const isCorrect = picked.letter === currentCorrect.letter;
            if (isCorrect) {
              correctCount++;
              btn.classList.add("hk-quiz-correct");
              feedback.textContent = `Correct — that was ${currentCorrect.letter}.`;
              feedback.className = "hk-quiz-feedback hk-quiz-feedback-correct";
              playTone(currentCorrect.notes[0], { duration: 0.3 });
            } else {
              btn.classList.add("hk-quiz-wrong");
              content.querySelectorAll(".hk-quiz-option").forEach((b2, j) => {
                if (currentOptions[j].letter === currentCorrect.letter) b2.classList.add("hk-quiz-correct");
              });
              feedback.textContent = `Not quite — that was ${currentCorrect.letter}, not ${picked.letter}.`;
              feedback.className = "hk-quiz-feedback hk-quiz-feedback-wrong";
            }
            controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">${round < TOTAL_ROUNDS - 1 ? "Next question" : "See results"}</button>`;
            controls.querySelector("#hk-next").addEventListener("click", () => {
              round++;
              if (round < TOTAL_ROUNDS) {
                newRound();
                step = "quiz";
              } else {
                step = "done";
              }
              renderStep();
            });
          });
        });
        setTimeout(playCurrentChord, 300);
      } else {
        markLessonComplete("lesson-chordquiz");
        content.innerHTML = mascotSay(`
          <h3>${correctCount} of ${TOTAL_ROUNDS} by ear.</h3>
          <p>${correctCount === TOTAL_ROUNDS
            ? "Perfect score — your ears genuinely know these chords now, not just your eyes."
            : "That's real ear training, not a pass/fail test — the more you do this, the faster you'll recognize chords without looking."}</p>`,
          "assets/mascot-poses/maestro-conducting.png");
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Back to lessons</button>`;
        controls.querySelector("#hk-done").addEventListener("click", showMap);
      }
    }
    renderStep();
  }

  // ----- Fun bonus: piano pedals, heard side by side (item 53) -----------
  // Explicitly "just for fun," not rigorous — no real pedal physics,
  // just a clear audible before/after using playTone's existing
  // duration/overlap control: "without pedal" = short, non-overlapping
  // notes (choppy); "with pedal" = the same notes held long enough to
  // overlap and ring together. Reuses keyboard.js's shared playTone
  // (which automatically benefits from item 45's sampled-piano upgrade
  // if it's loaded) — no new audio path.
  function runPedalFunLesson() {
    const { content, keyboardWrap, controls } = lessonShell("Pedals! (just for fun)");
    const kb = renderKeyboard(keyboardWrap, { startMidi: 55, endMidi: 79 });
    const PHRASE = [60, 64, 67, 72]; // C-E-G-C, a simple arpeggio
    const NOTE_GAP_SEC = 0.35;

    function playPhrase(withPedal) {
      kb.clearHighlights();
      PHRASE.forEach((midi, i) => {
        const delay = i * NOTE_GAP_SEC;
        setTimeout(() => {
          kb.highlightChord([midi], { rootMidi: midi });
          // Without the pedal: each note is cut short before the next
          // one starts (detached, "staccato"). With the pedal: each
          // note is held well past when the next one starts, so they
          // overlap and blend/ring together — the actual audible
          // effect of "holding notes after you lift your fingers."
          playTone(midi, { duration: withPedal ? NOTE_GAP_SEC * 3.5 : NOTE_GAP_SEC * 0.6 });
        }, delay * 1000);
      });
      const totalMs = (PHRASE.length * NOTE_GAP_SEC + (withPedal ? NOTE_GAP_SEC * 3.5 : 0.5)) * 1000;
      setTimeout(() => kb.clearHighlights(), totalMs);
    }

    content.innerHTML = mascotSay(`
      <h3>Quick fun one: what does the pedal actually do?</h3>
      <p>The big pedal under a piano (the <strong>sustain</strong> or "damper" pedal) holds notes ringing even
         after you lift your fingers off the keys — instead of stopping dead the moment you let go. It's the
         one pedal almost everyone actually uses.</p>
      <p class="hk-honest-note">Two other pedals exist on most pianos — a <strong>soft pedal</strong> (quieter,
         gentler tone) and a <strong>sostenuto pedal</strong> (sustains only the notes already held when you
         press it) — but sustain is the one worth hearing right now.</p>
      <p>Same 4 notes, twice. Listen for the difference:</p>
      <div class="hk-pedal-buttons">
        <button class="hk-btn" id="hk-pedal-off">&#9658; Without the pedal</button>
        <button class="hk-btn hk-btn-primary" id="hk-pedal-on">&#9658; With the pedal</button>
      </div>
      <p class="hk-honest-note">(Not a real pedal simulation — just the notes held short vs. held long enough
         to overlap, which is the actual audible effect.)</p>`,
      "assets/mascot-poses/grand-piano.png");
    controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Fun, got it — back to lessons</button>`;
    content.querySelector("#hk-pedal-off").addEventListener("click", () => playPhrase(false));
    content.querySelector("#hk-pedal-on").addEventListener("click", () => playPhrase(true));
    controls.querySelector("#hk-done").addEventListener("click", () => {
      markLessonComplete("lesson-pedals");
      showMap();
    });
  }

  // ----- Lesson 7: inversions --------------------------------------------
  function runLesson7() {
    const { content, keyboardWrap, controls } = lessonShell("Same chord, different shape: inversions");
    const kb = renderKeyboard(keyboardWrap, { startMidi: 55, endMidi: 79 });
    let step = 0;

    function renderStep() {
      if (step < LESSON7_CHORDS.length) {
        const c = LESSON7_CHORDS[step];
        kb.highlightChord(c.notes, { rootMidi: c.notes[0] });
        content.innerHTML = `
          <p class="hk-step-indicator">${step + 1} of ${LESSON7_CHORDS.length}</p>
          <p style="font-size:1.3rem">${c.label}</p>
          ${mascotSay(`<p>${step === 2 ? "Notice the top note (G) barely moves between this and the G chord before it — that's the point of an inversion: smoother motion between chords." : "Tap the highlighted keys to hear it, then press Next."}</p>`)}`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Next</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step++; renderStep(); });
        playChord(c.notes, { delay: 0.1 });
      } else {
        markLessonComplete("lesson-7");
        kb.clearHighlights();
        content.innerHTML = mascotSay(`
          <h3>Lesson complete.</h3>
          <p>Inversions don't change which chord you're playing — just which note is on the bottom. Try swapping in the
             1st-inversion C the next time you play the Lesson 1 progression in Practice; it should feel smoother.</p>
          <p class="hk-honest-note">No new songs are "unlocked" by this one — it's a playing-technique lesson, not a new pattern.</p>`);
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Back to lessons</button>`;
        controls.querySelector("#hk-done").addEventListener("click", showMap);
      }
    }
    renderStep = withStepBack(renderStep, { controls, kb, getState: () => ({ step }), setState: (s) => ({ step } = s) });
    renderStep();
  }

  // ----- Lesson 8: seventh chords -----------------------------------------
  function runLesson8() {
    const { content, keyboardWrap, controls } = lessonShell("A touch of jazz: seventh chords");
    const kb = renderKeyboard(keyboardWrap, { startMidi: 55, endMidi: 79 });
    let step = 0;

    function renderStep() {
      if (step < LESSON8_CHORDS.length) {
        const c = LESSON8_CHORDS[step];
        kb.highlightChord(c.notes, { rootMidi: c.notes[0] });
        content.innerHTML = `
          <p class="hk-step-indicator">${step + 1} of ${LESSON8_CHORDS.length}</p>
          <p style="font-size:1.3rem">${c.label}</p>
          ${mascotSay(`<p>A 7th chord stacks one more note on top of the triad, for a richer, jazzier color.</p>`)}`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Next</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step++; renderStep(); });
        playChord(c.notes, { delay: 0.1, duration: 1.0 });
      } else {
        markLessonComplete("lesson-8");
        kb.clearHighlights();
        const sevenths = SONGS.filter((s) => s.chords.some((c) => c.includes("7")));
        content.innerHTML = mascotSay(`
          <h3>Lesson complete.</h3>
          <p>${sevenths.length} library songs hint at this flavor in their real recordings:
             ${sevenths.map((s) => s.title).join(", ")}.</p>
          <p class="hk-honest-note">Both are flagged "needs verification" in Discover for their full chart — we're
             confident 7th chords are involved, less confident about the exact complete voicing, so we're not
             claiming more precision than the research supports.</p>`);
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Back to lessons</button>`;
        controls.querySelector("#hk-done").addEventListener("click", showMap);
      }
    }
    renderStep = withStepBack(renderStep, { controls, kb, getState: () => ({ step }), setState: (s) => ({ step } = s) });
    renderStep();
  }

  // ----- Lesson 9: key signatures -----------------------------------------
  function runLesson9() {
    const { content, keyboardWrap, controls } = lessonShell("Reading key signatures: one sharp = G");
    const kb = renderKeyboard(keyboardWrap, { startMidi: 55, endMidi: 79 });
    let step = 0;

    function renderStep() {
      if (step === 0) {
        content.innerHTML = `
          ${mascotSay(`<h3>A key signature is just a shortcut.</h3>
          <p>Instead of writing a sharp next to every single F in a piece, the key of G major puts <strong>one sharp</strong>
             on the F line/space at the start of the staff, meaning "every F in this piece is F#, unless marked otherwise."</p>
          <p>You've already been playing that F# — it's the middle note of the D chord (D-F#-A) from your first 4 chords.</p>`)}
          <div id="hk-staff-wrap">${renderStaffSvg(G_MAJOR_SCALE_FOR_STAFF, G_MAJOR_SCALE_FOR_STAFF.length, { keySignatureSharps: [77] })}</div>
          <p class="hk-step-indicator">The G major scale, with its one-sharp key signature marked at the start.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Try it</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step = 1; renderStep(); });
      } else if (step === 1) {
        content.innerHTML = mascotSay(`<p>Press <strong>F#</strong> (not F natural) on the keyboard below — the note the key of G always sharpens.</p><p id="hk-quiz-status"></p>`);
        controls.innerHTML = "";
        kb.onKeyPress((midi) => {
          if (midi === 66) { // F#4
            step = 2;
            renderStep();
          } else if (midi === 65) {
            content.querySelector("#hk-quiz-status").textContent = "That's F natural — try the black key just to its right.";
          }
        });
      } else {
        markLessonComplete("lesson-9");
        kb.clearHighlights();
        kb.onKeyPress(() => {});
        const gMajorSongs = SONGS.filter((s) => s.key.startsWith("G major"));
        content.innerHTML = mascotSay(`
          <h3>Lesson complete.</h3>
          <p>Notation is just catching up to a shape you already know. ${gMajorSongs.length ? `For what it's worth, ${gMajorSongs.map((s) => s.title).join(", ")} is literally in the key of G.` : ""}</p>`);
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Back to lessons</button>`;
        controls.querySelector("#hk-done").addEventListener("click", showMap);
      }
    }
    renderStep = withStepBack(renderStep, { controls, kb, getState: () => ({ step }), setState: (s) => ({ step } = s) });
    renderStep();
  }

  // ----- Lesson 10: capstone — Minuet in G --------------------------------
  function runLesson10() {
    const { content, keyboardWrap, controls } = lessonShell("Day 10: Minuet in G");
    const kb = renderKeyboard(keyboardWrap, { startMidi: 55, endMidi: 79 });
    let step = 0;

    function renderStep() {
      if (step === 0) {
        content.innerHTML = `
          ${mascotSay(`<h3>The capstone: a real classical piece.</h3>
          <p>"Minuet in G" (BWV Anh. 114) was composed by Christian Petzold around 1720-25, and long misattributed to
             J.S. Bach because it appeared in the Notebook for Anna Magdalena Bach — public domain either way. Here's
             its famous opening phrase, in the key of G you just learned the signature for:</p>`)}
          <div id="hk-staff-wrap">${renderStaffSvg(MINUET_IN_G_OPENING, -1, { keySignatureSharps: [77] })}</div>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Start</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step = 1; renderStep(); });
      } else if (step <= MINUET_IN_G_OPENING.length) {
        const i = step - 1;
        const midi = MINUET_IN_G_OPENING[i];
        kb.highlightChord([midi], { rootMidi: midi });
        playTone(midi, { duration: 0.5 });
        content.innerHTML = `
          <p class="hk-step-indicator">Note ${i + 1} of ${MINUET_IN_G_OPENING.length}</p>
          <div id="hk-staff-wrap">${renderStaffSvg(MINUET_IN_G_OPENING, i, { keySignatureSharps: [77] })}</div>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Next</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step++; renderStep(); });
      } else {
        markLessonComplete("lesson-10");
        kb.clearHighlights();
        const matches = (pred) => SONGS.filter((s) => s.confidence === "confirmed" && pred(s));
        const touched = new Set([
          ...ONE_FIVE_SIX_FOUR_SONGS.map((s) => s.title),
          ...matches((s) => /\bii\b/.test(s.degreeSequence)).map((s) => s.title),
          ...matches((s) => /minor/i.test(s.key)).map((s) => s.title),
        ]);
        content.innerHTML = mascotSay(`
          <h3>Curriculum complete — for this release.</h3>
          <p>You've read your first real classical melody from notation, in a key whose signature you understand.</p>
          <p>Honest tally across everything taught so far: <strong>${touched.size} of ${SONGS.length}</strong> library songs use a
             progression pattern you now recognize at least the core of (the 1-5-6-4 family, the 2 chord, or the
             natural-minor pattern). The remaining ${SONGS.length - touched.size} mostly need theory beyond this release —
             borrowed chords, more seventh-chord harmony, or longer loops — which is exactly where a Phase 2
             curriculum would continue. See the README for the full honest breakdown.</p>`);
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Back to lessons</button>`;
        controls.querySelector("#hk-done").addEventListener("click", showMap);
      }
    }
    renderStep = withStepBack(renderStep, { controls, kb, getState: () => ({ step }), setState: (s) => ({ step } = s) });
    renderStep();
  }

  // ===== Days 11-35: extended "strong early-intermediate" arc ===========

  // ----- Days 11-14: major scales (generic) ------------------------------
  function runMajorScaleLesson(scale) {
    const { content, keyboardWrap, controls } = lessonShell(`Day ${scale.day}: ${scale.key} major scale`);
    const kb = renderKeyboard(keyboardWrap, { startMidi: scale.notes[0] - 5, endMidi: scale.notes[7] + 5 });
    let step = 0; // 0..7 walk the scale, 8 = chord connection, 9 = quiz, 10 = done

    function renderStep() {
      if (step < 8) {
        const midi = scale.notes[step];
        const finger = scale.fingeringRH[step];
        kb.highlightChord([midi], { number: String(step + 1), letter: `finger ${finger}`, rootMidi: midi });
        content.innerHTML = `
          <p class="hk-step-indicator">Note ${step + 1} of 8</p>
          <div class="hk-big-degree">${step + 1}<span class="hk-big-letter">finger ${finger}</span></div>
          <p>${scale.key} major scale, degree ${step + 1}. Key signature: <strong>${scale.accidentals}</strong>.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Next</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step++; renderStep(); });
        playTone(midi, { duration: 0.4 });
      } else if (step === 8) {
        const triad = [scale.notes[0], scale.notes[2], scale.notes[4]];
        kb.highlightChord(triad, { number: "1-3-5", letter: `${scale.key}`, rootMidi: triad[0] });
        content.innerHTML = `
          <h3>A chord is a scale, stacked.</h3>
          <p>Degrees 1, 3, and 5 of this scale, played together instead of in a row, are exactly the
             <strong>${scale.key} major</strong> chord you already know how to play. Same notes, different arrangement.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Try it</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step = 9; renderStep(); });
        playChord(triad, { delay: 0.1 });
      } else if (step === 9) {
        content.innerHTML = `<p>Press the <strong>1st</strong> degree, then the <strong>5th</strong> degree of the scale (the tonic, then the dominant).</p><p id="hk-quiz-progress"></p>`;
        controls.innerHTML = "";
        kb.clearHighlights();
        const targets = [scale.notes[0], scale.notes[4]];
        let idx = 0;
        kb.onKeyPress((midi) => {
          if (midi === targets[idx]) {
            idx++;
            if (idx >= targets.length) { step = 10; renderStep(); }
            else content.querySelector("#hk-quiz-progress").textContent = "Now the 5th degree.";
          }
        });
      } else {
        markLessonComplete(`lesson-${scale.day === 11 ? 11 : scale.day === 12 ? 12 : scale.day === 13 ? 13 : 14}`);
        kb.clearHighlights();
        kb.onKeyPress(() => {});
        content.innerHTML = `<h3>Lesson complete.</h3><p>Same shape, new key — that's the whole trick behind every major scale.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Back to lessons</button>`;
        controls.querySelector("#hk-done").addEventListener("click", showMap);
      }
    }
    renderStep = withStepBack(renderStep, { controls, kb, getState: () => ({ step }), setState: (s) => ({ step } = s) });
    renderStep();
  }

  // ----- Day 15: scales review — the scale/chord connection, quizzed ----
  function runLesson15() {
    const { content, keyboardWrap, controls } = lessonShell("Day 15: Scales review");
    const kb = renderKeyboard(keyboardWrap, { startMidi: 55, endMidi: 79 });
    const cMajor = MAJOR_SCALES[0];
    let step = 0;

    function renderStep() {
      if (step === 0) {
        content.innerHTML = `
          <h3>Four scales, one shape.</h3>
          <p>This week you played C, G, D, and F major — all the same 1-2-3-1-2-3-4-5 shape (F's thumb tuck aside),
             just starting from a different key. That's the same "same shape, new key" idea from Lesson 1's chords,
             now applied to scales.</p>
          <p>Quick check: press the <strong>1st, 3rd, and 5th</strong> degrees of the C major scale, in any order —
             the three notes that make up the C major chord.</p>
          <p id="hk-quiz-status"></p>`;
        controls.innerHTML = "";
        const targets = new Set([cMajor.notes[0], cMajor.notes[2], cMajor.notes[4]]);
        const pressed = new Set();
        kb.onKeyPress((midi) => {
          if (targets.has(midi)) {
            pressed.add(midi);
            kb.getKeyElement(midi).classList.add("hk-key-highlight");
            if (pressed.size === targets.size) {
              content.querySelector("#hk-quiz-status").textContent = "Correct — that's the C major chord, built right out of the scale.";
              step = 1;
              setTimeout(renderStep, 1200);
            }
          }
        });
      } else {
        markLessonComplete("lesson-15");
        kb.clearHighlights();
        kb.onKeyPress(() => {});
        content.innerHTML = `<h3>Lesson complete.</h3><p>Up next: minor scales, and the relative-minor connection from Lesson 2.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Back to lessons</button>`;
        controls.querySelector("#hk-done").addEventListener("click", showMap);
      }
    }
    renderStep();
  }

  // ----- Day 16: the natural minor scale pattern --------------------------
  function runLesson16() {
    const { content, keyboardWrap, controls } = lessonShell("Day 16: The minor scale pattern");
    const kb = renderKeyboard(keyboardWrap, { startMidi: 52, endMidi: 72 });
    const aMinor = MINOR_SCALES[0];
    let step = 0;

    function renderStep() {
      if (step < 8) {
        const midi = aMinor.notes[step];
        kb.highlightChord([midi], { number: String(step + 1), rootMidi: midi });
        content.innerHTML = `
          <p class="hk-step-indicator">Note ${step + 1} of 8</p>
          <div class="hk-big-degree">${step + 1}</div>
          <p>A natural minor scale, degree ${step + 1}. Notice it's a different 7-note shape from major —
             its own pattern of whole and half steps.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Next</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step++; renderStep(); });
        playTone(midi, { duration: 0.4 });
      } else {
        markLessonComplete("lesson-16");
        kb.clearHighlights();
        content.innerHTML = `<h3>Lesson complete.</h3><p>Next: this exact A natural minor scale turns out to share something surprising with C major.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Back to lessons</button>`;
        controls.querySelector("#hk-done").addEventListener("click", showMap);
      }
    }
    renderStep = withStepBack(renderStep, { controls, kb, getState: () => ({ step }), setState: (s) => ({ step } = s) });
    renderStep();
  }

  // ----- Days 17-19: relative minor scales (generic) ----------------------
  function runMinorScaleLesson(scale) {
    const { content, keyboardWrap, controls } = lessonShell(`Day ${scale.day}: ${scale.key} minor scale`);
    const kb = renderKeyboard(keyboardWrap, { startMidi: scale.notes[0] - 5, endMidi: scale.notes[7] + 5 });
    let step = 0;

    function renderStep() {
      if (step < 8) {
        const midi = scale.notes[step];
        kb.highlightChord([midi], { number: String(step + 1), rootMidi: midi });
        content.innerHTML = `
          <p class="hk-step-indicator">Note ${step + 1} of 8</p>
          <div class="hk-big-degree">${step + 1}</div>
          <p>${scale.key} natural minor — key signature: <strong>${scale.accidentals}</strong>.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Next</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step++; renderStep(); });
        playTone(midi, { duration: 0.4 });
      } else if (step === 8) {
        content.innerHTML = `
          <h3>${scale.key} minor is ${scale.relativeMajor} major's relative minor.</h3>
          <p>Same notes, same key signature (${scale.accidentals}) — just a different starting ("home") note.
             This is exactly the relative-minor idea from Lesson 2, now applied to full scales instead of single chords.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Back to lessons</button>`;
        controls.querySelector("#hk-done").addEventListener("click", () => {
          markLessonComplete(`lesson-${scale.day}`);
          showMap();
        });
      }
    }
    renderStep = withStepBack(renderStep, { controls, kb, getState: () => ({ step }), setState: (s) => ({ step } = s) });
    renderStep();
  }

  // ----- Day 20: minor scales review / payoff -----------------------------
  function runLesson20() {
    const { content, keyboardWrap, controls } = lessonShell("Day 20: Minor scales review");
    const kb = renderKeyboard(keyboardWrap, { startMidi: 55, endMidi: 79 });
    kb.clearHighlights();
    const minorKeySongs = SONGS.filter((s) => s.confidence === "confirmed" && /minor/i.test(s.key));
    content.innerHTML = `
      <h3>Every major key has a relative minor — and vice versa.</h3>
      <p>C/Am, G/Em, F/Dm: same notes, same key signature, different home note. Combined with Lesson 6's
         "minor keys have a pattern too," you now have real tools for the <strong>${minorKeySongs.length} of ${SONGS.length}</strong>
         confirmed-chord library songs written in a minor key.</p>
      <p class="hk-honest-note">This is review, not new material — the goal is making sure the relative-minor
         connection actually stuck before moving on to two-hand technique.</p>`;
    controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Back to lessons</button>`;
    controls.querySelector("#hk-done").addEventListener("click", () => {
      markLessonComplete("lesson-20");
      showMap();
    });
  }

  // ----- Days 21-22: two-hand bass patterns (generic) ---------------------
  function runTwoHandLesson(lessonId, title, pattern) {
    const { content, keyboardWrap, controls } = lessonShell(title);
    const kb = renderKeyboard(keyboardWrap, { startMidi: 45, endMidi: 79 });
    let step = 0;

    function renderStep() {
      if (step < pattern.leftHand.length) {
        const midi = pattern.leftHand[step];
        kb.highlightHands({ left: [midi], right: pattern.rightHandChord, leftLabel: `beat ${step + 1}` });
        content.innerHTML = `
          <p class="hk-step-indicator">Beat ${step + 1} of ${pattern.leftHand.length}</p>
          <p>${pattern.description}</p>
          <p>Left hand (pink) plays this bass note, down in its own lower register, while the right hand
             (light blue) holds the chord, higher up — each hand's real position and color are shown separately.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Next beat</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step++; renderStep(); });
        playChord([...pattern.rightHandChord, midi], { duration: 0.6 });
      } else {
        markLessonComplete(lessonId);
        kb.clearHighlights();
        content.innerHTML = `<h3>Lesson complete.</h3><p>Try looping this pattern slowly on a real keyboard — left hand on the beats, right hand holding steady.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Back to lessons</button>`;
        controls.querySelector("#hk-done").addEventListener("click", showMap);
      }
    }
    renderStep = withStepBack(renderStep, { controls, kb, getState: () => ({ step }), setState: (s) => ({ step } = s) });
    renderStep();
  }

  // ----- Day 23: arpeggios -------------------------------------------------
  function runLesson23() {
    const { content, keyboardWrap, controls } = lessonShell("Day 23: Arpeggios");
    const kb = renderKeyboard(keyboardWrap, { startMidi: 55, endMidi: 79 });
    const pattern = TWO_HAND_PATTERNS.arpeggio;
    let step = 0;

    function renderStep() {
      if (step < pattern.notes.length) {
        const midi = pattern.notes[step];
        kb.highlightChord([midi], { rootMidi: midi });
        content.innerHTML = `<p class="hk-step-indicator">Note ${step + 1} of ${pattern.notes.length}</p><p>${pattern.description}</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Next</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step++; renderStep(); });
        playTone(midi, { duration: 0.45 });
      } else {
        markLessonComplete("lesson-23");
        kb.clearHighlights();
        content.innerHTML = `<h3>Lesson complete.</h3><p>That's a C major arpeggio — the exact technique behind Day 31-35's capstone piece.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Back to lessons</button>`;
        controls.querySelector("#hk-done").addEventListener("click", showMap);
      }
    }
    renderStep = withStepBack(renderStep, { controls, kb, getState: () => ({ step }), setState: (s) => ({ step } = s) });
    renderStep();
  }

  // ----- Day 24: two hands together ---------------------------------------
  function runLesson24() {
    const { content, keyboardWrap, controls } = lessonShell("Day 24: Two hands together");
    const kb = renderKeyboard(keyboardWrap, { startMidi: 45, endMidi: 79 });
    const pattern = TWO_HAND_PATTERNS.albertiBass;
    let step = 0;

    function renderStep() {
      if (step < pattern.leftHand.length) {
        const midi = pattern.leftHand[step];
        kb.highlightHands({ left: [midi], right: pattern.rightHandChord });
        content.innerHTML = `<p class="hk-step-indicator">Beat ${step + 1} of ${pattern.leftHand.length}</p><p>Combining Alberti bass (left hand, pink) with a held chord (right hand, light blue) — real two-hand coordination, each hand's actual register shown separately.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Next beat</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step++; renderStep(); });
        playChord([...pattern.rightHandChord, midi], { duration: 0.6 });
      } else {
        markLessonComplete("lesson-24");
        kb.clearHighlights();
        content.innerHTML = `<h3>Lesson complete.</h3><p>This is genuinely hard to coordinate at first — slow, steady practice is the only real way through it, same as for any pianist.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Back to lessons</button>`;
        controls.querySelector("#hk-done").addEventListener("click", showMap);
      }
    }
    renderStep = withStepBack(renderStep, { controls, kb, getState: () => ({ step }), setState: (s) => ({ step } = s) });
    renderStep();
  }

  // ----- Day 25: two-hand payoff — apply to Lesson 1's progression --------
  function runLesson25() {
    const { content, keyboardWrap, controls } = lessonShell("Day 25: Two-hand review — your Lesson 1 song");
    const kb = renderKeyboard(keyboardWrap, { startMidi: 45, endMidi: 79 });
    let step = 0;

    function renderStep() {
      if (step < LESSON1_SEQUENCE.length) {
        const key = LESSON1_SEQUENCE[step];
        const chord = LESSON1_CHORDS[key];
        const bass = chord.root - 12;
        kb.highlightHands({ left: [bass], right: chord.notes, leftLabel: chord.number, rightLabel: chord.letter });
        content.innerHTML = `<p class="hk-step-indicator">Chord ${step + 1} of 4</p><p>${chord.number} (${chord.letter}) — right-hand chord (light blue) over a left-hand root (pink), a full octave down.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Next</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step++; renderStep(); });
        playChord([...chord.notes, bass], { duration: 0.8 });
      } else {
        markLessonComplete("lesson-25");
        kb.clearHighlights();
        content.innerHTML = `<h3>Lesson complete.</h3><p>The same G-D-Em-C from Lesson 1, now with real two-hand technique — the payoff for three weeks of scale and coordination work.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Back to lessons</button>`;
        controls.querySelector("#hk-done").addEventListener("click", showMap);
      }
    }
    renderStep = withStepBack(renderStep, { controls, kb, getState: () => ({ step }), setState: (s) => ({ step } = s) });
    renderStep();
  }

  // ----- Days 26-28: seventh chords (generic) ------------------------------
  function runSeventhChordLesson(lessonId, chordInfo, label) {
    const { content, keyboardWrap, controls } = lessonShell(chordInfo.label);
    const kb = renderKeyboard(keyboardWrap, { startMidi: 55, endMidi: 84 });
    let step = 0; // 0 = triad, 1 = seventh, 2 = quiz, 3 = done
    const triad = chordInfo.notes.slice(0, 3);
    const seventhNote = chordInfo.notes[3];

    function renderStep() {
      if (step === 0) {
        kb.highlightChord(triad, { rootMidi: triad[0] });
        content.innerHTML = `<h3>First, the plain triad.</h3><p>This is the three-note chord you already know.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Add the 7th</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step = 1; renderStep(); });
        playChord(triad, { duration: 0.8 });
      } else if (step === 1) {
        kb.highlightChord(chordInfo.notes, { letter: chordInfo.label, rootMidi: chordInfo.notes[0] });
        content.innerHTML = `<h3>${chordInfo.label}</h3><p>One note added on top turns the plain triad into a ${label} chord — a noticeably richer, jazzier color.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Try it</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step = 2; renderStep(); });
        playChord(chordInfo.notes, { duration: 1.0 });
      } else if (step === 2) {
        content.innerHTML = `<p>Press the <strong>added 7th note</strong> on its own.</p><p id="hk-quiz-status"></p>`;
        controls.innerHTML = "";
        kb.onKeyPress((midi) => {
          if (midi === seventhNote) { step = 3; renderStep(); }
        });
      } else {
        markLessonComplete(lessonId);
        kb.clearHighlights();
        kb.onKeyPress(() => {});
        content.innerHTML = `<h3>Lesson complete.</h3><p>Keep an ear out for this color — it's a real part of several library songs' actual recordings.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Back to lessons</button>`;
        controls.querySelector("#hk-done").addEventListener("click", showMap);
      }
    }
    renderStep = withStepBack(renderStep, { controls, kb, getState: () => ({ step }), setState: (s) => ({ step } = s) });
    renderStep();
  }

  // ----- Day 29: inversions with 7th chords --------------------------------
  function runLesson29() {
    const { content, keyboardWrap, controls } = lessonShell("Day 29: Inversions with 7th chords");
    const kb = renderKeyboard(keyboardWrap, { startMidi: 55, endMidi: 84 });
    const steps = [
      { label: "Gmaj7 (root position)", notes: [67, 71, 74, 78] },
      { label: "Gmaj7 (1st inversion)", notes: [71, 74, 78, 79] },
    ];
    let step = 0;

    function renderStep() {
      if (step < steps.length) {
        const s = steps[step];
        kb.highlightChord(s.notes, { rootMidi: s.notes[0] });
        content.innerHTML = `<p class="hk-step-indicator">${step + 1} of ${steps.length}</p><p>${s.label} — same chord, same idea as Lesson 7, now with a 4-note chord.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Next</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step++; renderStep(); });
        playChord(s.notes, { duration: 0.9 });
      } else {
        markLessonComplete("lesson-29");
        kb.clearHighlights();
        content.innerHTML = `<h3>Lesson complete.</h3><p>Inversions work exactly the same way on richer chords as on plain triads.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Back to lessons</button>`;
        controls.querySelector("#hk-done").addEventListener("click", showMap);
      }
    }
    renderStep = withStepBack(renderStep, { controls, kb, getState: () => ({ step }), setState: (s) => ({ step } = s) });
    renderStep();
  }

  // ----- Day 30: richer harmony payoff -------------------------------------
  function runLesson30() {
    const { content, keyboardWrap, controls } = lessonShell("Day 30: Your Lesson 1 song, re-voiced");
    const kb = renderKeyboard(keyboardWrap, { startMidi: 55, endMidi: 84 });
    let step = 0;

    function renderStep() {
      if (step < LESSON1_WITH_SEVENTHS.length) {
        const c = LESSON1_WITH_SEVENTHS[step];
        kb.highlightChord(c.notes, { letter: c.label, rootMidi: c.notes[0] });
        content.innerHTML = `<p class="hk-step-indicator">${step + 1} of 4</p><p style="font-size:1.2rem">${c.label}</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Next</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step++; renderStep(); });
        playChord(c.notes, { duration: 1.0 });
      } else {
        markLessonComplete("lesson-30");
        kb.clearHighlights();
        content.innerHTML = `<h3>Hear the difference?</h3><p>Same G-D-Em-C progression from Day 1, re-voiced as Gmaj7-D7-Em7-Cmaj7 — the "four chords, a hundred songs" pattern, now with real jazz color. This closes out the richer-harmony arc.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Back to lessons</button>`;
        controls.querySelector("#hk-done").addEventListener("click", showMap);
      }
    }
    renderStep = withStepBack(renderStep, { controls, kb, getState: () => ({ step }), setState: (s) => ({ step } = s) });
    renderStep();
  }

  // ----- Days 31-35: capstone — Pachelbel's Canon in D ---------------------
  function runLesson31() {
    const { content, keyboardWrap, controls } = lessonShell("Day 31: Canon in D — the capstone progression");
    const kb = renderKeyboard(keyboardWrap, { startMidi: 40, endMidi: 79 });
    let step = 0;

    function renderStep() {
      if (step < CANON_IN_D.chords.length) {
        const c = CANON_IN_D.chords[step];
        kb.highlightChord(c.notes, { number: c.roman, letter: c.label, rootMidi: c.notes[0] });
        content.innerHTML = `
          <p class="hk-step-indicator">Chord ${step + 1} of 8</p>
          <div class="hk-big-degree">${c.roman}<span class="hk-big-letter">${c.label}</span></div>
          ${step === 0 ? `<p>Pachelbel's Canon in D (c. 1680-1706) — public domain, and the direct ancestor of Lesson 1's
             I-V-vi-IV pattern, extended to 8 chords: I-V-vi-iii-IV-I-IV-V.</p>` : ""}`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Next</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step++; renderStep(); });
        playChord(c.notes, { duration: 0.8 });
      } else {
        markLessonComplete("lesson-31");
        kb.clearHighlights();
        content.innerHTML = `<h3>Lesson complete.</h3><p>Next: the famous bass line on its own.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Back to lessons</button>`;
        controls.querySelector("#hk-done").addEventListener("click", showMap);
      }
    }
    renderStep = withStepBack(renderStep, { controls, kb, getState: () => ({ step }), setState: (s) => ({ step } = s) });
    renderStep();
  }

  function runLesson32() {
    const { content, keyboardWrap, controls } = lessonShell("Day 32: Canon's bass line");
    const kb = renderKeyboard(keyboardWrap, { startMidi: 38, endMidi: 67 });
    let step = 0;

    function renderStep() {
      if (step < CANON_IN_D.chords.length) {
        const c = CANON_IN_D.chords[step];
        kb.highlightChord([c.bass], { rootMidi: c.bass });
        content.innerHTML = `<p class="hk-step-indicator">Bass note ${step + 1} of 8 (under the ${c.label} chord)</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Next</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step++; renderStep(); });
        playTone(c.bass, { duration: 0.6 });
      } else {
        markLessonComplete("lesson-32");
        kb.clearHighlights();
        content.innerHTML = `<h3>Lesson complete.</h3><p>Left-hand foundation set — next, the right-hand chords go on top.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Back to lessons</button>`;
        controls.querySelector("#hk-done").addEventListener("click", showMap);
      }
    }
    renderStep = withStepBack(renderStep, { controls, kb, getState: () => ({ step }), setState: (s) => ({ step } = s) });
    renderStep();
  }

  function runLesson33() {
    const { content, keyboardWrap, controls } = lessonShell("Day 33: Canon's chords, over the bass");
    const kb = renderKeyboard(keyboardWrap, { startMidi: 38, endMidi: 79 });
    let step = 0;

    function renderStep() {
      if (step < CANON_IN_D.chords.length) {
        const c = CANON_IN_D.chords[step];
        kb.highlightHands({ left: [c.bass], right: c.notes, rightLabel: c.label });
        content.innerHTML = `<p class="hk-step-indicator">${step + 1} of 8</p><p>${c.label} (light blue, right hand) over its bass note (pink, left hand).</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Next</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step++; renderStep(); });
        playChord([...c.notes, c.bass], { duration: 0.8 });
      } else {
        markLessonComplete("lesson-33");
        kb.clearHighlights();
        content.innerHTML = `<h3>Lesson complete.</h3><p>That's the full Canon progression, both hands.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Back to lessons</button>`;
        controls.querySelector("#hk-done").addEventListener("click", showMap);
      }
    }
    renderStep = withStepBack(renderStep, { controls, kb, getState: () => ({ step }), setState: (s) => ({ step } = s) });
    renderStep();
  }

  function runLesson34() {
    const { content, keyboardWrap, controls } = lessonShell("Day 34: Canon, with richer color");
    const kb = renderKeyboard(keyboardWrap, { startMidi: 38, endMidi: 79 });
    const plain = CANON_IN_D.chords[2]; // Bm
    const richer = { label: "Bm7", notes: [59, 62, 66, 69], bass: 47 };
    let step = 0;
    const steps = [plain, richer];

    function renderStep() {
      if (step < steps.length) {
        const c = steps[step];
        kb.highlightHands({ left: [c.bass], right: c.notes, rightLabel: c.label });
        content.innerHTML = `<p class="hk-step-indicator">${step + 1} of 2</p><p>${c.label}${step === 1 ? " — swapping in a 7th chord for one more color, the same trick from Day 26-30" : " (the plain version, for comparison)"}.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Next</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step++; renderStep(); });
        playChord([...c.notes, c.bass], { duration: 0.9 });
      } else {
        markLessonComplete("lesson-34");
        kb.clearHighlights();
        content.innerHTML = `<h3>Lesson complete.</h3><p>One more day — the full performance.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Back to lessons</button>`;
        controls.querySelector("#hk-done").addEventListener("click", showMap);
      }
    }
    renderStep = withStepBack(renderStep, { controls, kb, getState: () => ({ step }), setState: (s) => ({ step } = s) });
    renderStep();
  }

  function runLesson35() {
    const { content, keyboardWrap, controls } = lessonShell("Day 35: Full performance");
    const kb = renderKeyboard(keyboardWrap, { startMidi: 38, endMidi: 79 });
    let step = 0;

    function renderStep() {
      if (step < CANON_IN_D.chords.length) {
        const c = CANON_IN_D.chords[step];
        kb.highlightHands({ left: [c.bass], right: c.notes, leftLabel: c.roman, rightLabel: c.label });
        content.innerHTML = `<p class="hk-step-indicator">${step + 1} of 8</p><div class="hk-big-degree">${c.roman}<span class="hk-big-letter">${c.label}</span></div>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Next</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step++; renderStep(); });
        playChord([...c.notes, c.bass], { duration: 0.8 });
      } else {
        markLessonComplete("lesson-35");
        kb.clearHighlights();
        const touched = new Set([
          ...ONE_FIVE_SIX_FOUR_SONGS.map((s) => s.title),
          ...SONGS.filter((s) => s.confidence === "confirmed" && /\bii\b/.test(s.degreeSequence)).map((s) => s.title),
          ...SONGS.filter((s) => s.confidence === "confirmed" && /minor/i.test(s.key)).map((s) => s.title),
        ]);
        content.innerHTML = `
          <h3>35 days done.</h3>
          <p>To be honest about what this is and isn't: you now have real scale technique in four major and three
             minor keys, basic two-hand coordination, a working vocabulary of 7th chords and inversions, and you've
             performed two public-domain classical pieces from real notation. That's a genuine, meaningful step —
             best described as <strong>strong early-intermediate</strong>, not "advanced." Real advanced piano takes
             years of study, not 35 lessons, and this app won't pretend otherwise.</p>
          <p>Across the whole curriculum, you now recognize at least the core pattern behind
             <strong>${touched.size} of ${SONGS.length}</strong> library songs.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Back to lessons</button>`;
        controls.querySelector("#hk-done").addEventListener("click", showMap);
      }
    }
    renderStep = withStepBack(renderStep, { controls, kb, getState: () => ({ step }), setState: (s) => ({ step } = s) });
    renderStep();
  }

  // ----- Bonus: jazz comping & improvisation -------------------------------
  // Deliberately NOT quiz-scored — there's no "correct" improvisation.
  // Completion criteria is time spent experimenting, not matching an
  // exact sequence, per the real pedagogy this lesson is teaching.
  function runLesson36() {
    const { content, keyboardWrap, controls } = lessonShell("Bonus: Jazz comping & improv");
    const kb = renderKeyboard(keyboardWrap, { startMidi: 45, endMidi: 79 });
    let step = 0; // 0 = explain, 1 = free-play
    let compIndex = 0;
    let compInterval = null;
    let secondsElapsed = 0;
    let timerInterval = null;
    onLessonExit(() => {
      if (compInterval) clearInterval(compInterval);
      if (timerInterval) clearInterval(timerInterval);
    });

    function renderStep() {
      if (step === 0) {
        content.innerHTML = mascotSay(`
          <h3>Left hand comps, right hand improvises.</h3>
          <p>This is a real jazz technique: the left hand plays the chord progression (called "comping" —
             short for accompanying) while the right hand improvises a melody over it.</p>
          <p>The beginner's trick that makes this actually work: the <strong>major pentatonic scale always
             fits</strong> reasonably well over a diatonic progression in the same key, because every note in it
             is either a chord tone or a safe passing tone. No deep jazz theory required to sound musical.</p>
          <p>Left hand (pink) will loop a ii-V-I in C major (Dm7-G7-Cmaj7 — the exact 7th chords from Days
             26-28). The right hand's "safe notes" (light blue outline) are the C major pentatonic scale: C, D, E, G, A.</p>`, "assets/mascot-poses/trombone.png");
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Start noodling</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step = 1; renderStep(); });
      } else {
        content.innerHTML = `
          ${mascotSay(`<p>The left hand is looping the progression. Click anywhere in the <strong>highlighted (outlined)</strong>
             keys with your mouse/finger to improvise — there's no wrong note here.</p>`, "assets/mascot-poses/trombone.png")}
          <p id="hk-jazz-timer">Time spent noodling: 0s</p>
          <p class="hk-honest-note">This lesson isn't quiz-scored — when you've had enough, just mark it complete.</p>`;
        // Playback controls (item 31): a real continuous backing loop
        // playing through time gets pause/resume parity with Practice.
        controls.innerHTML = `
          <button class="hk-btn" id="hk-pause">Pause loop</button>
          <button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-finish">Mark lesson complete</button>`;
        controls.querySelector("#hk-finish").addEventListener("click", finish);

        kb.clearHighlights();
        JAZZ_COMPING.pentatonicNotes.forEach((midi) => {
          const el = kb.getKeyElement(midi);
          if (el) el.classList.add("hk-key-selectable");
        });

        function startLoop() {
          compInterval = setInterval(() => {
            const chord = JAZZ_COMPING.progression[compIndex % JAZZ_COMPING.progression.length];
            playChord(chord.notes.map((n) => n - 12), { duration: 1.3 });
            compIndex++;
          }, 1400);
        }
        startLoop();
        timerInterval = setInterval(() => {
          secondsElapsed++;
          const el = document.getElementById("hk-jazz-timer");
          if (el) el.textContent = `Time spent noodling: ${secondsElapsed}s`;
        }, 1000);
        let paused = false;
        controls.querySelector("#hk-pause").addEventListener("click", (e) => {
          paused = !paused;
          if (paused) {
            if (compInterval) clearInterval(compInterval);
            e.target.textContent = "Resume loop";
          } else {
            startLoop();
            e.target.textContent = "Pause loop";
          }
        });
      }
    }

    function finish() {
      if (compInterval) clearInterval(compInterval);
      if (timerInterval) clearInterval(timerInterval);
      markLessonComplete("lesson-36");
      kb.clearHighlights();
      kb.onKeyPress(() => {});
      content.innerHTML = mascotSay(`
        <h3>Lesson complete.</h3>
        <p>That trick — major pentatonic over a diatonic progression — works in any key: find the 1, 2, 3, 5,
           and 6 of whatever key you're in, and you have a safe improvising palette.</p>`);
      controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Back to lessons</button>`;
      controls.querySelector("#hk-done").addEventListener("click", showMap);
    }

    renderStep = withStepBack(renderStep, { controls, kb, getState: () => ({ step }), setState: (s) => ({ step } = s), onBack: () => { if (compInterval) clearInterval(compInterval); if (timerInterval) clearInterval(timerInterval); compInterval = null; timerInterval = null; kb.clearHighlights(); } });
    renderStep();
  }

  // ----- Bonus: advanced repertoire (Für Elise excerpt + verified catalog) -
  function runLesson37() {
    const { content, keyboardWrap, controls } = lessonShell("Bonus: Advanced repertoire");
    const kb = renderKeyboard(keyboardWrap, { startMidi: 40, endMidi: 79 });
    let step = 0; // 0 = intro/catalog, 1..9 = Für Elise notes, 10 = done

    function catalogHtml() {
      return `<ul class="hk-repertoire-list">${ADVANCED_REPERTOIRE.map((p) => `
        <li><strong>${p.title}</strong> — ${p.composer}${p.year ? ` (${p.year})` : ""}, ${p.key}.
          ${p.built ? '<span class="hk-badge hk-badge-match">excerpt built</span>' : '<span class="hk-badge">catalog only</span>'}
          <br/><span class="hk-honest-note">${p.difficulty}</span></li>`).join("")}</ul>`;
    }

    function renderStep() {
      if (step === 0) {
        content.innerHTML = `
          <h3>Beyond the capstone: a verified repertoire catalog.</h3>
          <p>All public domain (every composer below died more than 70 years ago) — but researched for real, not
             guessed. One piece, Beethoven's "Für Elise," gets a genuine interactive excerpt below. The rest are a
             real, honestly-labeled catalog for later, not faked excerpts.</p>
          ${catalogHtml()}`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Play Für Elise's opening</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step = 1; renderStep(); });
      } else if (step <= FUR_ELISE_OPENING.rightHand.length) {
        const i = step - 1;
        const midi = FUR_ELISE_OPENING.rightHand[i];
        kb.highlightHands({ left: FUR_ELISE_OPENING.leftHand, right: [midi], leftLabel: "Am" });
        playTone(midi, { duration: 0.4 });
        if (i === 0) playChord(FUR_ELISE_OPENING.leftHand, { duration: 2.0, gain: 0.1 });
        content.innerHTML = `
          <p class="hk-step-indicator">Note ${i + 1} of ${FUR_ELISE_OPENING.rightHand.length}</p>
          <p>The famous opening of Beethoven's "Für Elise" (1810) — right hand (light blue) plays the melody while
             left hand (pink) holds a simple A minor broken chord underneath.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Next</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step++; renderStep(); });
      } else {
        markLessonComplete("lesson-37");
        kb.clearHighlights();
        content.innerHTML = `
          <h3>Lesson complete.</h3>
          <p>That's the most famous nine notes in piano repertoire. The full piece gets considerably harder from
             here — this excerpt is a real taste, not the whole piece.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Back to lessons</button>`;
        controls.querySelector("#hk-done").addEventListener("click", showMap);
      }
    }
    renderStep = withStepBack(renderStep, { controls, kb, getState: () => ({ step }), setState: (s) => ({ step } = s) });
    renderStep();
  }

  function ordinal(n) {
    const map = { 1: "1st", 2: "2nd", 3: "3rd", 4: "4th", 5: "5th", 6: "6th", 7: "7th" };
    return map[n] || `${n}th`;
  }

  // Zero-friction entry: landing on the Lessons tab drops straight into
  // the next actionable lesson (the first incomplete one — Day 1 itself
  // for a brand-new user) instead of a map the user has to parse first.
  // The map is still one tap away via the "<- Lessons" exit link inside
  // every lesson screen, for anyone who wants to browse/pick something
  // else instead.
  function startNextLesson() {
    const next = LESSONS.find((l) => !isLessonComplete(l.id));
    if (next) startLesson(next.id);
    else showMap(); // everything complete — show the full map instead
  }

  startNextLesson();

  // Exposed so the tab router can refresh the streak/daily-goal/badges
  // display when returning to this tab — but only if the user is
  // currently sitting on the map (checking a badge chip's title
  // shouldn't yank someone back out of an in-progress lesson).
  return {
    refresh() {
      if (root.querySelector(".hk-lesson-map")) showMap();
      else renderSidebar();
    },
    // Item 56: called when another tab is shown — pauses a running jazz
    // backing loop (through its own Pause button, so the button label
    // stays truthful) instead of letting it play under another tab.
    suspend() {
      const pauseBtn = root.querySelector("#hk-pause");
      if (pauseBtn && pauseBtn.textContent === "Pause loop") pauseBtn.click();
    },
  };
}

export { initLessonsTab };
