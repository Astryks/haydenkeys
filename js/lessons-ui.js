import { renderKeyboard, playChord, playTone, midiToName } from "./keyboard.js";
import { initCalibration } from "./calibration.js";
import { chordSymbolToMidi } from "./chord-utils.js";
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
} from "./lessons-data.js";
import { SONGS, ONE_FIVE_SIX_FOUR_SONGS } from "./songs-data.js";
import { isLessonComplete, markLessonComplete, getStreak, getDailyGoal } from "./storage.js";
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

function lessonMapHtml() {
  const streak = getStreak();
  const rows = LESSONS.map((lesson, i) => {
    const prevId = LESSONS[i - 1]?.id;
    const locked = prevId && !isLessonComplete(prevId);
    const done = isLessonComplete(lesson.id);
    return `
      <button class="hk-lesson-node ${locked ? "hk-locked" : ""} ${done ? "hk-done" : ""}"
              data-lesson="${lesson.id}" ${locked ? "disabled" : ""}>
        <div class="hk-lesson-node-icon">${done ? "&#10003;" : locked ? "&#128274;" : i + 1}</div>
        <div class="hk-lesson-node-body">
          <div class="hk-lesson-node-title">${lesson.title}</div>
          <div class="hk-lesson-node-subtitle">${lesson.subtitle}</div>
          <div class="hk-lesson-node-desc">${lesson.description}</div>
        </div>
      </button>`;
  }).join("");

  return `
    <div class="hk-lesson-map">
      <div class="hk-streak">🔥 ${streak.count}-day streak</div>
      ${dailyGoalHtml()}
      ${badgesStripHtml()}
      ${rows}
    </div>`;
}

// Persistent right-side roadmap (item 22): every single entry here is a
// real, built, clickable lesson — no "coming soon" placeholders, since
// interleaving real song-mastery lessons (see lessons-data.js) got the
// real total to 102 without padding. Completed lessons fill in purple
// (a deliberate accent distinct from the site's blue/pink base theme);
// the next lesson up gets its own "you are here" treatment.
function timelineHtml() {
  const nextId = LESSONS.find((l) => !isLessonComplete(l.id))?.id;
  const rows = LESSONS.map((lesson, i) => {
    const prevId = LESSONS[i - 1]?.id;
    const locked = prevId && !isLessonComplete(prevId);
    const done = isLessonComplete(lesson.id);
    const current = lesson.id === nextId;
    return `
      <button class="hk-roadmap-node ${done ? "hk-roadmap-done" : ""} ${current ? "hk-roadmap-current" : ""} ${locked ? "hk-roadmap-locked" : ""}"
              data-lesson="${lesson.id}" ${locked ? "disabled" : ""} title="${lesson.title}">
        <span class="hk-roadmap-num">${done ? "&#10003;" : i + 1}</span>
        <span class="hk-roadmap-label">${lesson.title}</span>
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

  function showMap() {
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
    };
    // "Master this song" lessons (item 22's path toward ~100 real
    // lessons) are generated from real song data rather than hand-listed
    // here one at a time — wire them up the same way.
    LESSONS.forEach((l) => {
      if (l.songTitle) {
        runners[l.id] = () => runMasterSongLesson(SONGS.find((s) => s.title === l.songTitle), l.id);
      }
    });
    (runners[id] || showMap)();
    renderSidebar();
  }

  function lessonShell(title) {
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

  // The wallaby mascot narrates the simplified, numbers-first copy
  // throughout the lesson flow (items 22/23) — a small consistent avatar
  // next to whatever it's "saying," Duolingo-owl-style.
  function mascotSay(html) {
    return `<div class="hk-mascot-row">
      <img src="assets/mascot-face.svg" alt="" class="hk-mascot-avatar" />
      <div class="hk-mascot-bubble">${html}</div>
    </div>`;
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
      <p>Check <strong>Facebook Marketplace</strong>, <strong>Craigslist or OfferUp</strong>, and thrift stores.</p>
      <p>Also look for <strong>"free" listings</strong>, not just "for sale" ones — people often give pianos away
         for free, because moving a real piano is expensive and hard.</p>
      <p>Ask your <strong>school</strong> (music rooms often sit empty during free periods) or a local
         <strong>church or community center</strong> — many have a piano you can use.</p>
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
    controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-next">I've got something to play on — let's go</button>`;
    controls.querySelector("#hk-next").addEventListener("click", () => {
      markLessonComplete("lesson-piano");
      showMap();
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
    initCalibration(content.querySelector("#hk-getstarted-cal"), { onComplete: finish });

    function finish() {
      markLessonComplete("lesson-getstarted");
      showMap();
    }
  }

  // ----- "Master this song" lessons: real songs, lightweight format -----
  // Reuses the exact chord data already verified in songs-data.js and
  // the same chord-symbol parser practice.js/camera-overlay.js use —
  // genuinely playable chords, not a new simplified-for-kids fake
  // version of the song.
  function runMasterSongLesson(song, lessonId) {
    const { content, keyboardWrap, controls } = lessonShell(`Master: ${song.title}`);
    const kb = renderKeyboard(keyboardWrap, { startMidi: 48, endMidi: 84 });
    let step = "intro";
    let idx = 0;

    function renderStep() {
      if (step === "intro") {
        content.innerHTML = mascotSay(`
          <h3>${song.title}</h3>
          <p>By ${song.artist}. Real, verified chords: <strong>${song.chords.join(" - ")}</strong>.</p>
          <p>Let's press them one at a time, together.</p>`);
        controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-next">Start</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step = "play"; idx = 0; renderStep(); });
      } else if (step === "play") {
        const symbol = song.chords[idx];
        const notes = chordSymbolToMidi(symbol);
        kb.highlightChord(notes, { letter: symbol, rootMidi: notes[0] });
        playChord(notes, { delay: 0.1 });
        content.innerHTML = `
          <p class="hk-step-indicator">Chord ${idx + 1} of ${song.chords.length}</p>
          ${mascotSay(`<p><strong>Press and hold ${symbol}.</strong> It's the lit-up keys below.</p>`)}`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-next">Next chord</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => {
          if (idx < song.chords.length - 1) { idx++; renderStep(); }
          else { step = "done"; renderStep(); }
        });
      } else {
        markLessonComplete(lessonId);
        kb.clearHighlights();
        const { newlyEarned } = checkBadges();
        content.innerHTML = mascotSay(`
          <h3>You just played "${song.title}" start to finish!</h3>
          ${newlyEarned.length
            ? `<p>You also just unlocked: ${newlyEarned.map((b) => `${b.icon} ${b.title}`).join(", ")}.</p>`
            : `<p>More real songs are waiting for you in the lesson timeline.</p>`}`);
        controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-done">Back to lessons</button>`;
        controls.querySelector("#hk-done").addEventListener("click", showMap);
      }
    }
    renderStep();
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
    const kb = renderKeyboard(keyboardWrap, { startMidi: 55, endMidi: 79 });

    // The featured "let's play a song" pick: must be a song whose real,
    // verified chords are LITERALLY G-D-Em-C (not just "same family in a
    // different key" with a capo caveat) — Shallow is the cleanest match
    // in the library (confirmed, no capo/alternate-version note).
    const FEATURED_SONG = SONGS.find((s) => s.title === "Shallow");
    const montageSongs = ONE_FIVE_SIX_FOUR_SONGS.filter((s) => s.title !== FEATURED_SONG.title);

    // Finding your starting key now has its own earlier lesson ("Get
    // Started" — see runGetStarted below), so this lesson starts
    // straight at teaching the first chord.
    let step = "teach";
    let teachIdx = 0;
    let songIdx = 0;
    let montageIdx = 0;

    function renderStep() {
      if (step === "teach") {
        const key = LESSON1_SEQUENCE[teachIdx];
        const chord = LESSON1_CHORDS[key];
        const noteNames = chord.notes.map((n) => noteLetter(n));
        kb.highlightChord(chord.notes, { number: chord.number, letter: chord.letter, rootMidi: chord.root });
        const chordIntro =
          teachIdx === 0
            ? `<p>Hi! I'm your guide. A <strong>chord</strong> means pressing a few keys at once, together.</p>`
            : "";
        content.innerHTML = `
          <p class="hk-step-indicator">Chord ${teachIdx + 1} of 4</p>
          <div class="hk-big-degree">${chord.number}<span class="hk-big-letter">${chord.letter}</span></div>
          ${mascotSay(`${chordIntro}
            <p>This chord is called <strong>${chord.letter}</strong>.</p>
            <p>It's <strong>${chord.notes.length} keys, all lit up below: ${noteNames.join(", ")}</strong>.</p>
            <p><strong>Press all ${chord.notes.length} lit-up keys now.</strong> Then tap Next.</p>`)}`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-next">Next</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => {
          if (teachIdx < LESSON1_SEQUENCE.length - 1) { teachIdx++; renderStep(); }
          else { step = "quiz"; renderStep(); }
        });
        playChord(chord.notes, { delay: 0.1 });
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
              step = "song-intro";
              renderStep();
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
        controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-next">Play along</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { songIdx = 0; step = "song"; renderStep(); });
      } else if (step === "song") {
        const key = FEATURED_SONG.chords[songIdx];
        const chord = LESSON1_CHORDS[key];
        kb.highlightChord(chord.notes, { number: chord.number, letter: chord.letter, rootMidi: chord.root });
        content.innerHTML = `
          <p class="hk-step-indicator">${FEATURED_SONG.title} — chord ${songIdx + 1} of ${FEATURED_SONG.chords.length}</p>
          <div class="hk-big-degree">${chord.number}<span class="hk-big-letter">${chord.letter}</span></div>
          ${mascotSay(`<p>Press and hold <strong>${chord.letter}</strong> along with the song.</p>`)}`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-next">Next chord</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => {
          if (songIdx < FEATURED_SONG.chords.length - 1) { songIdx++; renderStep(); }
          else { step = "montage-intro"; renderStep(); }
        });
        playChord(chord.notes, { delay: 0.1 });
      } else if (step === "montage-intro") {
        kb.clearHighlights();
        content.innerHTML = mascotSay(`
          <h3>You already know more songs than you think.</h3>
          <p>Same four chords, same order — here's a quick run through ${montageSongs.length} more real songs in the
             library that use this exact pattern. Just tap through, next song, next song.</p>`);
        controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-next">Go</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { montageIdx = 0; step = "montage"; renderStep(); });
      } else if (step === "montage") {
        const s = montageSongs[montageIdx];
        content.innerHTML = `
          <p class="hk-step-indicator">Song ${montageIdx + 1} of ${montageSongs.length}</p>
          ${mascotSay(`<h3>${s.title}</h3><p>${s.artist} — same 4 chords (${s.degreeSequence}).</p>`)}`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-next">Next song</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => {
          if (montageIdx < montageSongs.length - 1) { montageIdx++; renderStep(); }
          else { step = "social"; renderStep(); }
        });
      } else if (step === "social") {
        content.innerHTML = mascotSay(`
          <h3>Next lesson: get a friend and sing along.</h3>
          <p>You've got these 4 chords down. The next step isn't more theory — it's playing a full song (verse,
             chorus, the works) while someone else sings on top. Genuinely the most fun part of this whole thing.</p>`);
        controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-next">Continue</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step = "levelup"; renderStep(); });
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
              : `<h3>Lesson complete.</h3><p>Nice work going through Lesson 1 again.</p>`)}
            <p>Out of the ${SONGS.length} songs in this app's library, <strong>${ONE_FIVE_SIX_FOUR_SONGS.length}</strong> use this
               same four-chord family (${exact.length} the exact same loop, ${variant.length} the same 4 chords in a
               different order). The rest use other — often minor-key or more complex — patterns, which is exactly
               what later lessons cover.</p>
          </div>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-done">Back to lessons</button>`;
        controls.querySelector("#hk-done").addEventListener("click", showMap);
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
        controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-next">Next</button>`;
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
        controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-next">Try it</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => {
          step = 8;
          renderStep();
        });
      } else if (step === 8) {
        content.innerHTML = `
          <p>Click every key (1-7) below that you think is a <strong>minor</strong> chord in a major key.</p>
          <p id="hk-quiz-status"></p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-check">Check my answer</button>`;
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
        controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-done">Back to lessons</button>`;
        controls.querySelector("#hk-done").addEventListener("click", showMap);
      }
    }
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
          <h3>Traditional notation: an optional, deeper layer</h3>
          <p>Everything so far used numbers and letters. Professional sheet music uses a 5-line <strong>staff</strong> instead —
             each vertical position is a different note. You don't need this to play along in this app, but it's worth knowing.</p>
          <p>Here's "Ode to Joy" (Beethoven, 1824 — public domain), one note at a time:</p>
          <div id="hk-staff-wrap">${renderStaffSvg(ODE_TO_JOY_MELODY, -1)}</div>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-next">Start</button>`;
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
          <p>Note ${i + 1} of ${ODE_TO_JOY_MELODY.length}. Find it highlighted on the keyboard, then press Next.</p>
          <div id="hk-staff-wrap">${renderStaffSvg(ODE_TO_JOY_MELODY, i)}</div>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-next">Next</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => {
          step++;
          renderStep();
        });
      } else {
        markLessonComplete("lesson-3");
        kb.clearHighlights();
        content.innerHTML = `
          <h3>You just read your first melody from staff notation.</h3>
          <p>This "go deeper" track is just getting started — full staff-reading lessons for chords and rhythm are a
             Phase 2 roadmap item (see the README).</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-done">Back to lessons</button>`;
        controls.querySelector("#hk-done").addEventListener("click", showMap);
      }
    }
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
          <p>Same shape you already know from Lesson 1 — <strong>${chord.letter} ${chord.quality}</strong> — just visited in a
             different order this time: 1, 6, 4, 5.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-next">Next</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step++; renderStep(); });
        playChord(chord.notes, { delay: 0.1 });
      } else if (step === 4) {
        content.innerHTML = `
          <p>Play them in the new order: <strong>1 (G) &rarr; 6 (Em) &rarr; 4 (C) &rarr; 5 (D)</strong>.</p>
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
        content.innerHTML = `
          <h3>Same four chords, new order — a different set of songs.</h3>
          <p><strong>${variant.length} of ${SONGS.length}</strong> library songs use this specific I-vi-IV-V (or the very
             close I-vi-V-IV) order:</p>
          <ul>${variant.map((s) => `<li>${s.title} — ${s.artist} (${s.degreeSequence})</li>`).join("")}</ul>
          <p class="hk-honest-note">Small, honest number — most "4-chord" songs use the Lesson 1 order, not this one. Still real.
             (There's a third variant, Lesson 1's payoff screen calls out separately — same four chords walked in the opposite
             direction, which sounds different enough that we don't credit it here.)</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-done">Back to lessons</button>`;
        controls.querySelector("#hk-done").addEventListener("click", showMap);
      }
    }
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
          <p>Beyond the core four, this is "the 2nd" — in G major, that's <strong>A minor</strong>. You already know from
             Lesson 2 that degree 2 is always minor in a major key — this is that chord.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-next">Try it</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step = 1; renderStep(); });
        playChord(LESSON5_CHORD.notes, { delay: 0.1 });
      } else if (step === 1) {
        content.innerHTML = `<p>Press the <strong>2 chord (Am)</strong> root key to confirm you've got it.</p><p id="hk-quiz-progress"></p>`;
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
        content.innerHTML = `
          <h3>One more shape, more of the library unlocked.</h3>
          <p><strong>${usesIi.length} of ${SONGS.length}</strong> confirmed-chord songs use the 2 (ii) chord somewhere in their progression:</p>
          <ul>${usesIi.map((s) => `<li>${s.title} — ${s.artist} (${s.degreeSequence})</li>`).join("")}</ul>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-done">Back to lessons</button>`;
        controls.querySelector("#hk-done").addEventListener("click", showMap);
      }
    }
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
          <p>In A minor, this chord is <strong>${d.quality}</strong>.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-next">Next</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step++; renderStep(); });
        playChord(d.notes, { delay: 0.1 });
      } else if (step === 7) {
        kb.clearHighlights();
        content.innerHTML = `
          <h3>Minor keys have their own major/minor pattern — just shifted.</h3>
          <p>In <strong>any</strong> natural minor key: degrees <strong>1, 4, 5</strong> are minor. Degrees
             <strong>3, 6, 7</strong> are major. Degree <strong>2</strong> is diminished. This is the single biggest
             reason the library's minor-key songs sound the way they do.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-next">Try it</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step = 8; renderStep(); });
      } else if (step === 8) {
        content.innerHTML = `<p>Click every key (1-7) that you think is <strong>minor</strong> in a natural minor key.</p><p id="hk-quiz-status"></p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-check">Check my answer</button>`;
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
        content.innerHTML = `
          <h3>This is the big one — most of the library is minor-key.</h3>
          <p><strong>${minorKeySongs.length} of ${SONGS.length}</strong> confirmed-chord songs are in a minor key:</p>
          <ul>${minorKeySongs.map((s) => `<li>${s.title} — ${s.artist} (${s.key})</li>`).join("")}</ul>
          <p class="hk-honest-note">Knowing the pattern doesn't mean every chord choice is "obvious" yet (some songs
             borrow chords from outside the key for effect) — but it explains most of what you're hearing.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-done">Back to lessons</button>`;
        controls.querySelector("#hk-done").addEventListener("click", showMap);
      }
    }
    renderStep();
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
          <p>${step === 2 ? "Notice the top note (G) barely moves between this and the G chord before it — that's the point of an inversion: smoother motion between chords." : "Tap the highlighted keys to hear it, then press Next."}</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-next">Next</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step++; renderStep(); });
        playChord(c.notes, { delay: 0.1 });
      } else {
        markLessonComplete("lesson-7");
        kb.clearHighlights();
        content.innerHTML = `
          <h3>Lesson complete.</h3>
          <p>Inversions don't change which chord you're playing — just which note is on the bottom. Try swapping in the
             1st-inversion C the next time you play the Lesson 1 progression in Practice; it should feel smoother.</p>
          <p class="hk-honest-note">No new songs are "unlocked" by this one — it's a playing-technique lesson, not a new pattern.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-done">Back to lessons</button>`;
        controls.querySelector("#hk-done").addEventListener("click", showMap);
      }
    }
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
          <p>A 7th chord stacks one more note on top of the triad, for a richer, jazzier color.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-next">Next</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step++; renderStep(); });
        playChord(c.notes, { delay: 0.1, duration: 1.0 });
      } else {
        markLessonComplete("lesson-8");
        kb.clearHighlights();
        const sevenths = SONGS.filter((s) => s.chords.some((c) => c.includes("7")));
        content.innerHTML = `
          <h3>Lesson complete.</h3>
          <p>${sevenths.length} library songs hint at this flavor in their real recordings:
             ${sevenths.map((s) => s.title).join(", ")}.</p>
          <p class="hk-honest-note">Both are flagged "needs verification" in Discover for their full chart — we're
             confident 7th chords are involved, less confident about the exact complete voicing, so we're not
             claiming more precision than the research supports.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-done">Back to lessons</button>`;
        controls.querySelector("#hk-done").addEventListener("click", showMap);
      }
    }
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
          <h3>A key signature is just a shortcut.</h3>
          <p>Instead of writing a sharp next to every single F in a piece, the key of G major puts <strong>one sharp</strong>
             on the F line/space at the start of the staff, meaning "every F in this piece is F#, unless marked otherwise."</p>
          <p>You've already been playing that F# — it's inside the D chord and the Em chord from Lesson 1.</p>
          <div id="hk-staff-wrap">${renderStaffSvg(G_MAJOR_SCALE_FOR_STAFF, G_MAJOR_SCALE_FOR_STAFF.length, { keySignatureSharps: [77] })}</div>
          <p class="hk-step-indicator">The G major scale, with its one-sharp key signature marked at the start.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-next">Try it</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step = 1; renderStep(); });
      } else if (step === 1) {
        content.innerHTML = `<p>Press <strong>F#</strong> (not F natural) on the keyboard below — the note the key of G always sharpens.</p><p id="hk-quiz-status"></p>`;
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
        content.innerHTML = `
          <h3>Lesson complete.</h3>
          <p>Notation is just catching up to a shape you already know. ${gMajorSongs.length ? `For what it's worth, ${gMajorSongs.map((s) => s.title).join(", ")} is literally in the key of G.` : ""}</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-done">Back to lessons</button>`;
        controls.querySelector("#hk-done").addEventListener("click", showMap);
      }
    }
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
          <h3>The capstone: a real classical piece.</h3>
          <p>"Minuet in G" (BWV Anh. 114) was composed by Christian Petzold around 1720-25, and long misattributed to
             J.S. Bach because it appeared in the Notebook for Anna Magdalena Bach — public domain either way. Here's
             its famous opening phrase, in the key of G you just learned the signature for:</p>
          <div id="hk-staff-wrap">${renderStaffSvg(MINUET_IN_G_OPENING, -1, { keySignatureSharps: [77] })}</div>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-next">Start</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step = 1; renderStep(); });
      } else if (step <= MINUET_IN_G_OPENING.length) {
        const i = step - 1;
        const midi = MINUET_IN_G_OPENING[i];
        kb.highlightChord([midi], { rootMidi: midi });
        playTone(midi, { duration: 0.5 });
        content.innerHTML = `
          <p>Note ${i + 1} of ${MINUET_IN_G_OPENING.length}.</p>
          <div id="hk-staff-wrap">${renderStaffSvg(MINUET_IN_G_OPENING, i, { keySignatureSharps: [77] })}</div>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-next">Next</button>`;
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
        content.innerHTML = `
          <h3>Curriculum complete — for this release.</h3>
          <p>You've read your first real classical melody from notation, in a key whose signature you understand.</p>
          <p>Honest tally across everything taught so far: <strong>${touched.size} of ${SONGS.length}</strong> library songs use a
             progression pattern you now recognize at least the core of (the 1-5-6-4 family, the 2 chord, or the
             natural-minor pattern). The remaining ${SONGS.length - touched.size} mostly need theory beyond this release —
             borrowed chords, more seventh-chord harmony, or longer loops — which is exactly where a Phase 2
             curriculum would continue. See the README for the full honest breakdown.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-done">Back to lessons</button>`;
        controls.querySelector("#hk-done").addEventListener("click", showMap);
      }
    }
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
        controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-next">Next</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step++; renderStep(); });
        playTone(midi, { duration: 0.4 });
      } else if (step === 8) {
        const triad = [scale.notes[0], scale.notes[2], scale.notes[4]];
        kb.highlightChord(triad, { number: "1-3-5", letter: `${scale.key}`, rootMidi: triad[0] });
        content.innerHTML = `
          <h3>A chord is a scale, stacked.</h3>
          <p>Degrees 1, 3, and 5 of this scale, played together instead of in a row, are exactly the
             <strong>${scale.key} major</strong> chord you already know how to play. Same notes, different arrangement.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-next">Try it</button>`;
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
        controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-done">Back to lessons</button>`;
        controls.querySelector("#hk-done").addEventListener("click", showMap);
      }
    }
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
        controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-done">Back to lessons</button>`;
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
        controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-next">Next</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step++; renderStep(); });
        playTone(midi, { duration: 0.4 });
      } else {
        markLessonComplete("lesson-16");
        kb.clearHighlights();
        content.innerHTML = `<h3>Lesson complete.</h3><p>Next: this exact A natural minor scale turns out to share something surprising with C major.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-done">Back to lessons</button>`;
        controls.querySelector("#hk-done").addEventListener("click", showMap);
      }
    }
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
        controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-next">Next</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step++; renderStep(); });
        playTone(midi, { duration: 0.4 });
      } else if (step === 8) {
        content.innerHTML = `
          <h3>${scale.key} minor is ${scale.relativeMajor} major's relative minor.</h3>
          <p>Same notes, same key signature (${scale.accidentals}) — just a different starting ("home") note.
             This is exactly the relative-minor idea from Lesson 2, now applied to full scales instead of single chords.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-done">Back to lessons</button>`;
        controls.querySelector("#hk-done").addEventListener("click", () => {
          markLessonComplete(`lesson-${scale.day}`);
          showMap();
        });
      }
    }
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
    controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-done">Back to lessons</button>`;
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
        controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-next">Next beat</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step++; renderStep(); });
        playChord([...pattern.rightHandChord, midi], { duration: 0.6 });
      } else {
        markLessonComplete(lessonId);
        kb.clearHighlights();
        content.innerHTML = `<h3>Lesson complete.</h3><p>Try looping this pattern slowly on a real keyboard — left hand on the beats, right hand holding steady.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-done">Back to lessons</button>`;
        controls.querySelector("#hk-done").addEventListener("click", showMap);
      }
    }
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
        controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-next">Next</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step++; renderStep(); });
        playTone(midi, { duration: 0.45 });
      } else {
        markLessonComplete("lesson-23");
        kb.clearHighlights();
        content.innerHTML = `<h3>Lesson complete.</h3><p>That's a C major arpeggio — the exact technique behind Day 31-35's capstone piece.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-done">Back to lessons</button>`;
        controls.querySelector("#hk-done").addEventListener("click", showMap);
      }
    }
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
        controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-next">Next beat</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step++; renderStep(); });
        playChord([...pattern.rightHandChord, midi], { duration: 0.6 });
      } else {
        markLessonComplete("lesson-24");
        kb.clearHighlights();
        content.innerHTML = `<h3>Lesson complete.</h3><p>This is genuinely hard to coordinate at first — slow, steady practice is the only real way through it, same as for any pianist.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-done">Back to lessons</button>`;
        controls.querySelector("#hk-done").addEventListener("click", showMap);
      }
    }
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
        controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-next">Next</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step++; renderStep(); });
        playChord([...chord.notes, bass], { duration: 0.8 });
      } else {
        markLessonComplete("lesson-25");
        kb.clearHighlights();
        content.innerHTML = `<h3>Lesson complete.</h3><p>The same G-D-Em-C from Lesson 1, now with real two-hand technique — the payoff for three weeks of scale and coordination work.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-done">Back to lessons</button>`;
        controls.querySelector("#hk-done").addEventListener("click", showMap);
      }
    }
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
        controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-next">Add the 7th</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step = 1; renderStep(); });
        playChord(triad, { duration: 0.8 });
      } else if (step === 1) {
        kb.highlightChord(chordInfo.notes, { letter: chordInfo.label, rootMidi: chordInfo.notes[0] });
        content.innerHTML = `<h3>${chordInfo.label}</h3><p>One note added on top turns the plain triad into a ${label} chord — a noticeably richer, jazzier color.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-next">Try it</button>`;
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
        controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-done">Back to lessons</button>`;
        controls.querySelector("#hk-done").addEventListener("click", showMap);
      }
    }
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
        controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-next">Next</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step++; renderStep(); });
        playChord(s.notes, { duration: 0.9 });
      } else {
        markLessonComplete("lesson-29");
        kb.clearHighlights();
        content.innerHTML = `<h3>Lesson complete.</h3><p>Inversions work exactly the same way on richer chords as on plain triads.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-done">Back to lessons</button>`;
        controls.querySelector("#hk-done").addEventListener("click", showMap);
      }
    }
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
        controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-next">Next</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step++; renderStep(); });
        playChord(c.notes, { duration: 1.0 });
      } else {
        markLessonComplete("lesson-30");
        kb.clearHighlights();
        content.innerHTML = `<h3>Hear the difference?</h3><p>Same G-D-Em-C progression from Day 1, re-voiced as Gmaj7-D7-Em7-Cmaj7 — the "four chords, a hundred songs" pattern, now with real jazz color. This closes out the richer-harmony arc.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-done">Back to lessons</button>`;
        controls.querySelector("#hk-done").addEventListener("click", showMap);
      }
    }
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
        controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-next">Next</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step++; renderStep(); });
        playChord(c.notes, { duration: 0.8 });
      } else {
        markLessonComplete("lesson-31");
        kb.clearHighlights();
        content.innerHTML = `<h3>Lesson complete.</h3><p>Next: the famous bass line on its own.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-done">Back to lessons</button>`;
        controls.querySelector("#hk-done").addEventListener("click", showMap);
      }
    }
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
        controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-next">Next</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step++; renderStep(); });
        playTone(c.bass, { duration: 0.6 });
      } else {
        markLessonComplete("lesson-32");
        kb.clearHighlights();
        content.innerHTML = `<h3>Lesson complete.</h3><p>Left-hand foundation set — next, the right-hand chords go on top.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-done">Back to lessons</button>`;
        controls.querySelector("#hk-done").addEventListener("click", showMap);
      }
    }
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
        controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-next">Next</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step++; renderStep(); });
        playChord([...c.notes, c.bass], { duration: 0.8 });
      } else {
        markLessonComplete("lesson-33");
        kb.clearHighlights();
        content.innerHTML = `<h3>Lesson complete.</h3><p>That's the full Canon progression, both hands.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-done">Back to lessons</button>`;
        controls.querySelector("#hk-done").addEventListener("click", showMap);
      }
    }
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
        controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-next">Next</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step++; renderStep(); });
        playChord([...c.notes, c.bass], { duration: 0.9 });
      } else {
        markLessonComplete("lesson-34");
        kb.clearHighlights();
        content.innerHTML = `<h3>Lesson complete.</h3><p>One more day — the full performance.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-done">Back to lessons</button>`;
        controls.querySelector("#hk-done").addEventListener("click", showMap);
      }
    }
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
        controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-next">Next</button>`;
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
        controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-done">Back to lessons</button>`;
        controls.querySelector("#hk-done").addEventListener("click", showMap);
      }
    }
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

    function renderStep() {
      if (step === 0) {
        content.innerHTML = `
          <h3>Left hand comps, right hand improvises.</h3>
          <p>This is a real jazz technique: the left hand plays the chord progression (called "comping" —
             short for accompanying) while the right hand improvises a melody over it.</p>
          <p>The beginner's trick that makes this actually work: the <strong>major pentatonic scale always
             fits</strong> reasonably well over a diatonic progression in the same key, because every note in it
             is either a chord tone or a safe passing tone. No deep jazz theory required to sound musical.</p>
          <p>Left hand (pink) will loop a ii-V-I in C major (Dm7-G7-Cmaj7 — the exact 7th chords from Days
             26-28). The right hand's "safe notes" (light blue outline) are the C major pentatonic scale: C, D, E, G, A.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-next">Start noodling</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step = 1; renderStep(); });
      } else {
        content.innerHTML = `
          <p>The left hand is looping the progression. Click anywhere in the <strong>highlighted (outlined)</strong>
             keys with your mouse/finger to improvise — there's no wrong note here.</p>
          <p id="hk-jazz-timer">Time spent noodling: 0s</p>
          <p class="hk-honest-note">This lesson isn't quiz-scored — when you've had enough, just mark it complete.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-done">Mark lesson complete</button>`;
        controls.querySelector("#hk-done").addEventListener("click", finish);

        kb.clearHighlights();
        JAZZ_COMPING.pentatonicNotes.forEach((midi) => {
          const el = kb.getKeyElement(midi);
          if (el) el.classList.add("hk-key-selectable");
        });

        compInterval = setInterval(() => {
          const chord = JAZZ_COMPING.progression[compIndex % JAZZ_COMPING.progression.length];
          playChord(chord.notes.map((n) => n - 12), { duration: 1.3 });
          compIndex++;
        }, 1400);
        timerInterval = setInterval(() => {
          secondsElapsed++;
          const el = document.getElementById("hk-jazz-timer");
          if (el) el.textContent = `Time spent noodling: ${secondsElapsed}s`;
        }, 1000);
      }
    }

    function finish() {
      if (compInterval) clearInterval(compInterval);
      if (timerInterval) clearInterval(timerInterval);
      markLessonComplete("lesson-36");
      kb.clearHighlights();
      kb.onKeyPress(() => {});
      content.innerHTML = `
        <h3>Lesson complete.</h3>
        <p>That trick — major pentatonic over a diatonic progression — works in any key: find the 1, 2, 3, 5,
           and 6 of whatever key you're in, and you have a safe improvising palette.</p>`;
      controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-back">Back to lessons</button>`;
      controls.querySelector("#hk-back").addEventListener("click", showMap);
    }

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
        controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-next">Play Für Elise's opening</button>`;
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
        controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-next">Next</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step++; renderStep(); });
      } else {
        markLessonComplete("lesson-37");
        kb.clearHighlights();
        content.innerHTML = `
          <h3>Lesson complete.</h3>
          <p>That's the most famous nine notes in piano repertoire. The full piece gets considerably harder from
             here — this excerpt is a real taste, not the whole piece.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-done">Back to lessons</button>`;
        controls.querySelector("#hk-done").addEventListener("click", showMap);
      }
    }
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
  };
}

export { initLessonsTab };
