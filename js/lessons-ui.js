import { renderKeyboard, playChord, playTone, midiToName, isBlackKey } from "./keyboard.js";
import { renderNoteHighway, stepsToHighwayNotes } from "./note-highway.js";
import { initCalibration } from "./calibration.js";
import { chordSymbolToMidi } from "./chord-utils.js";
import { createTunerWidget } from "./pitch.js";
import { registerComputerKeyboardTarget } from "./computer-keys.js";
import { createPracticePlayer } from "./play-engine.js";
import { renderGrandStaff } from "./staff.js";
import { onNoteOn, midiSupported, enableMidi, connectedMidiNames, enableMic, disableMic, micOn } from "./input-hub.js";
import { runDailyReviewSession, reviewDoneToday } from "./daily-review.js";
import { WALTZ_PATTERN, ODE_TO_JOY, ODE_MELODY_ONLY, MINUET_IN_G, BACH_PRELUDE_SHEET, BACH_PRELUDE_8, LESSON1_CHORD_DRILL } from "./sheet-data.js";
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
  MICRO_LESSONS,
  CHOOSE_SONGS,
} from "./lessons-data.js";
import { SONGS, SONG_STRUCTURES, ONE_FIVE_SIX_FOUR_SONGS, WORLD_LANGUAGES } from "./songs-data.js";
import { songSteps, barSeconds } from "./song-map.js";
import { watchChats, chatHtml } from "./chat.js";
import { pandaSvg, nextTrick } from "./panda.js";
import { catsSvg, nextCatScene, nextHomeScene } from "./cats.js";
// One home scene per visit: the pianos, with the cats doing something new each time.
let homeSceneThisVisit = null;
import { icon } from "./icons.js";
import { videoHtml, wireVideos } from "./media.js";
import { teachHtml } from "./teach-videos.js";
import { songInspireHtml, lessonInspireHtml } from "./inspire.js";
import { SONG_VIDEOS } from "./media-data.js";
import { shareButton } from "./share.js";
import { claimRewards, showDayComplete, unlockedSongs, nextReward } from "./rewards.js";
import { isLessonComplete, markLessonComplete, getStreak, getDailyGoal, markSongStatus, getQuests, completeQuest, awardXp, starsFor, recordStars, getStreakFreezes, getLevel } from "./storage.js";
import { checkBadges } from "./badges.js";
import { tipJarHtml, wireTipJar } from "./tipjar.js";
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
  BACH_PRELUDE_C,
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
      // Ledger lines only for notes beyond the staff: C4 and below
      // (lines at 115, 130...) and A5 and above (lines at 25, 10...).
      // D4 and G5 sit just outside the staff in a space and need none.
      let ledger = "";
      for (let ly = 115; ly <= y + 0.1; ly += 15) ledger += `<line x1="${x - 8}" y1="${ly}" x2="${x + 8}" y2="${ly}" class="hk-staff-line" />`;
      for (let ly = 25; ly >= y - 0.1; ly -= 15) ledger += `<line x1="${x - 8}" y1="${ly}" x2="${x + 8}" y2="${ly}" class="hk-staff-line" />`;
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
      <div class="hk-daily-goal-label">Today's goal: ${goal.count}/${goal.target} lesson${goal.target === 1 ? "" : "s"}, song${goal.target === 1 ? "" : "s"} or review${goal.target === 1 ? "" : "s"} ${goal.metToday ? "· done! ✓" : ""}</div>
      <div class="hk-daily-goal-bar"><div class="hk-daily-goal-fill" style="width:${pct}%"></div></div>
    </div>`;
}

// Pre-lessons ("Get yourself a piano," "Get Started") sit before the
// numbered sequence and are shown as "Pre-lesson," not "Lesson N" — so
// Lesson 1 is genuinely "The 4 keys to play 100 songs," matching Sid's
// exact spec, not pushed down by the setup steps ahead of it.
function lessonDisplayNumber(lesson, index) {
  if (lesson.pre || lesson.optional) return null;
  let n = 0;
  for (let i = 0; i <= index; i++) if (!LESSONS[i].pre && !LESSONS[i].optional) n++;
  return n;
}

function lessonCountLabel() {
  const numbered = LESSONS.filter((l) => !l.pre && !l.optional).length;
  const pre = LESSONS.filter((l) => l.pre).length;
  const optional = LESSONS.filter((l) => l.optional).length;
  return `${numbered} lessons (plus ${pre} pre-lesson step${pre === 1 ? "" : "s"} and ${optional} optional World songs lessons)`;
}

// Item 60: today's three daily quests (each +10 XP, all three +20).
function questsHtml() {
  const qs = getQuests();
  const lv = getLevel();
  return `<div class="hk-quests">
    <h4>Today's quests <span class="hk-honest-note">· Level ${lv.level} ${lv.title}, ${lv.xp} XP</span></h4>
    ${qs.map((q) => `<div class="hk-quest ${q.done ? "hk-quest-done" : ""}">${q.done ? "✅" : "⬜"} ${q.text} <span class="hk-honest-note">+10 XP</span></div>`).join("")}
    <div class="hk-quest hk-honest-note">Finish all three for a +20 XP bonus.</div>
    <button class="hk-btn hk-funfact-open" type="button">🎹 Did you know? A piano fun fact</button>
  </div>`;
}

function lessonMapHtml() {
  const streak = getStreak();
  const rows = LESSONS.map((lesson, i) => {
    const prevId = LESSONS[i - 1]?.id;
    const done = isLessonComplete(lesson.id);
    // Item 57: a lesson you've already finished is never locked, even if
    // a lesson before it is new or was moved (lesson order can change
    // between updates).
    const locked = !lesson.optional && prevId && !isLessonComplete(prevId) && !done;
    const num = lessonDisplayNumber(lesson, i);
    return `
      <button class="hk-lesson-node ${locked ? "hk-locked" : ""} ${done ? "hk-done" : ""}"
              data-lesson="${lesson.id}" ${locked ? "disabled" : ""}>
        <div class="hk-lesson-node-icon">${done ? "&#10003;" : locked ? "&#128274;" : (num ?? "•")}</div>
        <div class="hk-lesson-node-body">
          <div class="hk-lesson-node-title">${lesson.pre ? "Pre-lesson" : lesson.optional ? "🌍 Optional" : `Lesson ${num}`}: ${lesson.title}</div>
          <div class="hk-lesson-node-subtitle">${lesson.subtitle}</div>
          <div class="hk-lesson-node-desc">${lesson.description}</div>
        </div>
      </button>`;
  }).join("");

  return `
    <div class="hk-lesson-map">
      <h2 class="hk-lessons-title">100 Lessons to Learn Any Song: Start Here</h2>
      <p class="hk-honest-note">${lessonCountLabel()}</p>
      <div class="hk-streak">🔥 ${streak.count}-day streak${getStreakFreezes() ? ` · ❄️ ${getStreakFreezes()} streak freeze${getStreakFreezes() === 1 ? "" : "s"}` : ""}</div>
      ${questsHtml()}
      <button class="hk-btn ${reviewDoneToday() ? "" : "hk-btn-primary"}" data-lesson="daily-review">🧠 2-minute daily review${reviewDoneToday() ? " · done today ✓" : ""}</button>
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
  const nextId = LESSONS.find((l) => !l.optional && !isLessonComplete(l.id))?.id;
  const rows = LESSONS.map((lesson, i) => {
    const prevId = LESSONS[i - 1]?.id;
    const done = isLessonComplete(lesson.id);
    // Item 57: a lesson you've already finished is never locked, even if
    // a lesson before it is new or was moved (lesson order can change
    // between updates).
    const locked = !lesson.optional && prevId && !isLessonComplete(prevId) && !done;
    const current = lesson.id === nextId;
    const num = lessonDisplayNumber(lesson, i);
    return `
      <button class="hk-roadmap-node ${done ? "hk-roadmap-done" : ""} ${current ? "hk-roadmap-current" : ""} ${locked ? "hk-roadmap-locked" : ""}"
              data-lesson="${lesson.id}" ${locked ? "disabled" : ""} title="${lesson.title}">
        <span class="hk-roadmap-num">${done ? "&#10003;" : (num ?? "•")}</span>
        <span class="hk-roadmap-label">${lesson.pre ? "Pre: " : ""}${lesson.title}${lesson.optional ? '<span class="hk-optional-tag">Optional</span>' : ""}</span>
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


// ----- Day 1: one tiny step per lesson ----------------------------------
// One short message, one thing to press, a "Hear it" button. The card
// moves on when the learner plays it (screen, MIDI keyboard or mic).
// G sits just left of middle C, so every chord after it is to the right.
const G = [55, 59, 62], D = [62, 66, 69], EM = [64, 67, 71], C = [60, 64, 67];
const CMIN = [60, 63, 67], AM = [57, 60, 64];
// The same loop in the key of C, kept close to middle C.
const KC_C = [60, 64, 67], KC_G = [55, 59, 62], KC_AM = [57, 60, 64], KC_F = [53, 57, 60];
// Two hands: a low left-hand note (the chord's letter) under the right-hand chord.
const LG_D = [62, 66, 69], LG_A = [57, 61, 64], LG_C = [60, 64, 67], LG_G = [55, 59, 62];
const H_G = [43, ...G], H_D = [50, ...D], H_EM = [52, ...EM], H_C = [48, ...C];
// The last card of each day also completes the older, wordier lessons it
// replaces, so Today moves straight on (they stay in the Roadmap).
const DAY_ENDS = { "m-pop-song": [1, ["lesson-1"]], "d2-key-c": [2, ["lesson-2", "lesson-4"]], "d3-song": [3, ["lesson-twohand-preview", "lesson-eartraining", "song-1"]], "d4-your-style": [4, []] };
// A little picture of piano keys for chat bubbles. `marks` colours keys
// and labels them: { midi: { fill, label, above } }.
function keysPic(lo, hi, marks = {}, { w = 20, font = 0, captions = [] } = {}) {
  const isBlack = (m) => [1, 3, 6, 8, 10].includes(((m % 12) + 12) % 12);
  const whites = [];
  for (let m = lo; m <= hi; m++) if (!isBlack(m)) whites.push(m);
  const H = 80, BH = 50, bw = w * 0.6;
  const fs = font || Math.max(10, w * 0.65);
  const width = whites.length * w;
  let white = "", black = "", labels = "";
  const label = (x, m, mk) => {
    if (!mk.label) return "";
    return `<text x="${x}" y="${mk.above ? -8 : H + fs + 4}" text-anchor="middle" font-size="${fs}" font-weight="800" fill="${mk.text || "#3a2d6b"}">${mk.label}</text>`;
  };
  // A coloured key keeps its white/black face; only its bottom part is coloured.
  whites.forEach((m, i) => {
    const mk = marks[m] || {};
    white += `<rect x="${i * w}" y="0" width="${w}" height="${H}" rx="${w * 0.15}" fill="#fff" stroke="#2a2a3a" stroke-width="1.2"/>`;
    if (mk.fill) white += `<rect x="${i * w + 1.2}" y="${H * 0.66}" width="${w - 2.4}" height="${H * 0.34 - 1.2}" rx="${w * 0.12}" fill="${mk.fill}"/>`;
    labels += label(i * w + w / 2, m, mk);
  });
  for (let m = lo; m <= hi; m++) {
    if (!isBlack(m)) continue;
    const i = whites.filter((x) => x < m).length;
    const mk = marks[m] || {};
    const x = i * w - bw / 2;
    black += `<rect x="${x}" y="0" width="${bw}" height="${BH}" rx="${bw * 0.15}" fill="#2a2a3a" stroke="#2a2a3a" stroke-width="1"/>`;
    if (mk.fill) black += `<rect x="${x + 1}" y="${BH * 0.7}" width="${bw - 2}" height="${BH * 0.3 - 1}" rx="${bw * 0.15}" fill="${mk.fill}"/>`;
    labels += label(x + bw / 2, m, mk);
  }
  // Captions centred over a group of keys, e.g. "2 black keys".
  const xOf = (m) => {
    const i = whites.filter((x) => x < m).length;
    return isBlack(m) ? i * w : i * w + w / 2;
  };
  captions.forEach((c) => {
    labels += `<text x="${(xOf(c.from) + xOf(c.to)) / 2}" y="-8" text-anchor="middle" font-size="${fs}" font-weight="800" fill="${c.color || "#3a2d6b"}">${c.text}</text>`;
  });
  return `<svg class="hk-keys-pic" viewBox="${-fs} ${-fs - 12} ${width + fs * 2} ${H + fs * 2 + 20}" role="img" aria-label="Piano keys">${white}${black}${labels}</svg>`;
}
const PIC_MIDDLE_C = keysPic(53, 65, {
  60: { fill: "#fcc98a", label: "Middle C" },
  61: { fill: "#f4a6c0" },
  63: { fill: "#f4a6c0" },
}, { w: 26, font: 15, captions: [{ from: 54, to: 58, text: "3 black", color: "#8a8399" }, { from: 61, to: 63, text: "2 black", color: "#c2457a" }] });
const PIC_ALL_AS = keysPic(21, 108, Object.fromEntries([
  ...[21, 33, 45, 57, 69, 81, 93, 105].map((m, i) => [m, { fill: "#c9b6f7", label: `A${i}` }]),
  [60, { fill: "#fcc98a", label: "C4", above: true, text: "#c2701a" }],
]), { w: 10, font: 20 });
const PIC_BLACK = keysPic(60, 71, { 61: { fill: "#f4a6c0", label: "C♯", above: true }, 63: { fill: "#f4a6c0", label: "D♯", above: true }, 66: { fill: "#9ec9f2", label: "F♯", above: true }, 68: { fill: "#9ec9f2", label: "G♯", above: true }, 70: { fill: "#9ec9f2", label: "A♯", above: true } }, { w: 26, font: 14 });
const PIC_A2_A3_C4 = keysPic(43, 62, { 45: { fill: "#c9b6f7", label: "A2" }, 57: { fill: "#c9b6f7", label: "A3" }, 60: { fill: "#fcc98a", label: "C4" } }, { w: 22 });

// Moves a chord up or down whole octaves until it fits the keyboard shown.
function voiceIn(notes, lo, hi) {
  let n = [...notes];
  while (n.length && Math.max(...n) > hi && Math.min(...n) - 12 >= lo) n = n.map((m) => m - 12);
  while (n.length && Math.min(...n) < lo) n = n.map((m) => m + 12);
  return n;
}
// A song's whole-song map as timed chords ({ chord, len } in bars), with
// each section's pattern looping until its bars are filled (song-map.js).
function wholeSongChords(structure) {
  return songSteps(structure);
}
// Whole-song steps as falling-note events at the song's real tempo:
// lowest note left hand, the rest right hand.
// A chord that fits the lesson keyboard: the root low in the left hand,
// every chord note above it folded into range for the right hand.
function fitChord(symbol, lo, hi) {
  const notes = chordSymbolToMidi(symbol);
  if (!notes.length) return [];
  let bass = notes[0];
  while (bass >= lo + 12) bass -= 12;
  while (bass < lo) bass += 12;
  const upper = [...new Set(notes.map((m) => {
    let n = m;
    while (n > hi) n -= 12;
    while (n <= bass) n += 12;
    return n;
  }).filter((n) => n <= hi))].sort((a, b) => a - b);
  return [bass, ...upper];
}
function stepsToEvents(steps, barSec, voice) {
  const events = [];
  let at = 0;
  steps.forEach(({ chord, len }) => {
    const notes = voice(chord);
    notes.forEach((midi, k) => events.push({ midi, start: at * barSec, dur: len * barSec * 0.95, hand: k === 0 && notes.length > 1 ? "left" : "right" }));
    at += len;
  });
  return events;
}
// Chord voicings (MIDI arrays) in time, one per bar: lowest note left hand.
function voicingsToEvents(voicings, barSec = 2.2) {
  const events = [];
  voicings.forEach((notes, i) => notes.forEach((midi, k) => events.push({ midi, start: i * barSec, dur: barSec * 0.92, hand: k === 0 && notes.length > 3 ? "left" : "right" })));
  return events;
}

// Interstellar (simple version): left hand A, F, C, G low; right hand keeps
// E on top (Am, Fmaj7, C, G6 sounds — the high E is the film's ticking pedal).
const IS_AM = [45, 57, 60, 64], IS_F = [41, 57, 60, 64], IS_C = [48, 55, 60, 64], IS_G = [43, 55, 59, 64];
// Lesson 4: 7th chords for blues and jazz, in reach of the lesson keyboard.
const C7 = [60, 64, 67, 70], F7 = [53, 57, 60, 63], G7 = [55, 59, 62, 65], DM7 = [62, 65, 69, 72], CMAJ7 = [60, 64, 67, 71];
const F_MAJ = [65, 69, 72], E_MAJ = [64, 68, 71], D_MIN = [62, 65, 69];
const MICRO_CARDS = {
  "m-intro": { say: "Welcome to Hayden Keys! 🎹<br>In about <b>a minute</b> you'll learn <b>4 chords</b> that play <b>100+ songs</b>:<br><b>G · D · Em · C</b> 🎶<br><br>But <b>bear</b> 🐻 with us while we cover the <b>basics</b> first. It'll only take a few seconds! ⏱️<br><br>Go to <b>your piano</b> (or keyboard) 🎹", want: { tap: true }, ok: "I'm at my piano! 🎹", noKeys: true, done: "Let's find middle C! 🚀" },
  "m-black-keys": { say: "Look at the <b>black keys</b> 👀<br>They come in groups of <b>2</b> and <b>3</b>, again and again.<br>Press any black key in a group of <b>2</b>!", want: { pcs: [1, 3] }, labels: "groups", done: "That's your map! 🗺️ Every piano has it." },
  "m-any-piano": { say: "Pianos come in <b>all sizes</b> 🎹<br>Middle C isn't always in the exact middle!<br>🔎 Every <b>C</b> is just <b>left of the 2 black keys</b>.<br>Big piano (88 keys): the <b>4th C</b> from the left.<br>Smaller keyboard: usually the <b>3rd C</b>.", want: { tap: true }, ok: "Got it 👍", done: "Find the 2 black keys, go left. Easy! 🎉" },
  "m-find-c": { say: `Welcome to Hayden Keys! 🎹<br>Soon you'll know <b>4 chords</b> that play <b>100+ songs</b>: <b>G · D · Em · C</b> 🎶<br>Bear 🐻 with us for the basics first. It only takes a minute! ⏱️<br><br><b>Let's find middle C</b> 🏠<br>On <b>your piano</b>, look in the <b>middle</b>. Middle C is the white key just <b>left</b> of the <b>2 black keys</b>.${PIC_MIDDLE_C}Found it on your piano?`, want: { tap: true }, ok: "Found it! ✅", cantFind: `<b>No problem! Count from the left</b> 👇<br>🎹 <b>88 keys</b> (full piano): the <b>40th</b> key<br>🎹 <b>76 keys</b>: the <b>33rd</b> key<br>🎹 <b>61 keys</b> (keyboard): the <b>25th</b> key<br><small>Count every key, white and black.</small>`, labels: "groups", show: [60], hideMiddleC: true, done: "That's middle C, home base! 🏠" },
  "m-white-black": { say: `When you look at all the keys on your piano, every <b>white key is a letter</b>: <b>A B C D E F G A B</b>… and they repeat again and again 🔤<br>Each one gets a number: <b>A0, A1, A2</b>…${PIC_ALL_AS}Same letter, same colour. Middle C is <b>C4</b>.`, labels: "octave", want: { tap: true }, ok: "Got it 👍", done: "Letters + numbers = every key's name! 🔤" },
  "m-black": { say: `Black keys are the notes <b>in between</b> ♯ ♭<br>They come in groups of <b>2</b> and <b>3</b>.${PIC_BLACK}Press a black key in a group of <b>3</b> 💙`, labels: "groups3", want: { pcs: [6, 8, 10] }, done: "That's a black key! ♯ 🎉" },
  "m-find-g": { say: "Our home key is <b>G</b> 🏠<br>From middle C, step <b>left</b>:<br><b>C → B → A → G</b><br>Press <b>G</b>!", labels: "letters", want: { notes: [55] }, help: [55], done: "That's G, our home! 🏠" },
  "m-chord-g": { say: "Let's make a <b>chord</b> on G!<br>Press <b>G</b>, skip one, <b>B</b>, skip one, <b>D</b>.<br>That's the <b>G chord</b>!", want: { notes: G }, show: G, tip: "🎹 Now play the G chord on <b>your piano</b> too!", done: "Your first chord! 🎹" },
  "m-letters": { say: "Every key has a <b>letter</b> 🔤<br>The white keys go <b>C D E F G A B</b>… then start again!<br>Find <b>G</b> and press it.", labels: "letters", want: { notes: [67] }, done: "There's G! 🎉" },
  "m-jargon": { chat: `<h3 data-q="Wait, is G a key or a chord? 🤯">Good question! Both, kind of 😄</h3>
      <p>🎹 The <b>G key</b> is just one key.</p>
      <p>🎹🎹🎹 The <b>G chord</b> is G plus 2 friends: <b>B</b> and <b>D</b>, pressed together.</p>`,
    say: "Press the <b>G key</b>… then the <b>G chord</b>!", labels: "letters", want: { seq: [[55], G] }, demoSeq: [[[55], "key"], [G, "chord"]], done: "G key 👆 G chord ✋ Got it!" },
  "m-key-of-g": { chat: `<h3 data-q="What does 'in the key of G' mean? 🤔">It means G is home 🏠</h3>
      <p>A song <b>in the key of G</b> keeps coming back to the <b>G chord</b>, like coming home.</p>
      <p>We'll keep it simple: home is <b>G</b>, and we play <b>4 chords</b>.</p>`,
    say: "Listen: away… and back <b>home</b> to G 🏠", want: { tap: true }, ok: "Got it 👍", noKeys: true, demoSeq: [[G, "home"], [D, ""], [G, "home"]], done: "Home is G 🏠 Now chord 2!" },
  "m-another-g": { say: "Every key has a <b>letter</b>: <b>C D E F G A B</b>… then they start again!<br>So there's more than one G. Press <b>another G</b>!", labels: "letters", want: { pc: 7, not: 55 }, help: [67], done: "Letters repeat! 🔁" },
  "m-back-g": { say: "Back to <b>middle C</b>…<br>now play the <b>G chord</b> again.", want: { notes: G }, show: G, done: "Nice! 👏" },
  "m-chord-em": { say: "Chord 2: <b>E minor</b> (Em)<br>Same shape, starting on <b>E</b> (right of middle C):<br><b>E · G · B</b> 🥲 a little sad", want: { notes: EM }, show: EM, done: "That's E minor! 🎉" },
  "m-chord-c": { say: "Chord 3: <b>C</b><br>Same shape, starting on <b>middle C</b>:<br><b>C · E · G</b>", want: { notes: C }, show: C, done: "That's C! 🎉" },
  "m-chord-d": { say: "Chord 4: <b>D</b><br>Same shape, starting on <b>D</b>:<br><b>D · F♯ · A</b><br>F♯ is the <b>black</b> key ⚫", want: { notes: D }, show: D, done: "That's D! You know 4 chords! 🎉" },
  "q-chord-keys": { say: "Quick quiz! 🧠<br>Which keys make the <b>G chord</b>?", want: { choice: "G · B · D" }, options: ["G · A · B", "G · B · D", "C · E · G"], noKeys: true, done: "Yes! G · B · D 🎉" },
  "m-num-home": { say: "Let's try something new: <b>numbers</b> instead of chord names! 🔢<br><b>G</b> is home, so G = <b>1</b>.<br>Press G, then count up the white keys to the right!", labels: "fromG", want: { notes: [55] }, show: [55], done: "G = 1 🏠" },
  "m-numbers": { say: "Counting from G:<br><b>C</b> is the <b>4th</b> key → 4<br><b>D</b> is the <b>5th</b> → 5<br><b>E</b> is the <b>6th</b> → 6<br>Press <b>1 · 5 · 6 · 4</b>: G, D, E, C", labels: "fromG", want: { seq: [[55], [62], [64], [60]] }, demoSeq: [[[55], "1"], [[62], "5"], [[64], "6"], [[60], "4"]], done: "1 · 5 · 6 · 4 = G · D · Em · C 🎉" },
  "q-number": { say: "Quick quiz! 🧠<br>In the key of G, what <b>number</b> is <b>D</b>?", want: { choice: "5" }, options: ["1", "4", "5", "6"], noKeys: true, done: "Yes! D is 5 🎉" },
  "m-num-shape": { say: "See the pattern? ✋<br>Every chord is the <b>same shape</b>:<br><b>press · skip · press · skip · press</b><br>Play <b>G</b>, then slide the shape to <b>C</b>!", want: { seq: [G, C] }, demoSeq: [[G, "G"], [C, "C"], [EM, "Em"], [D, "D ⚫"]], tip: "The only twist: <b>D</b> uses one <b>black key</b> (F♯) ⚫", done: "Same shape, any chord! ✋🎉" },
  "m-boom": { say: "<b>Boom!</b> You know 4 chords 💥<br>Play them in a row:<br><b>G → D → Em → C</b>", want: { seq: [G, D, EM, C] }, demoSeq: [[G, "G"], [D, "D"], [EM, "Em"], [C, "C"]], tip: "🎹 Now play the loop on your <b>real piano</b>!", done: "That's the loop in 100+ songs! 🎉" },
  "m-two-hands": { say: `Two hands! 🙌<br>Your <b>left hand</b> plays a low note. Your <b>right hand</b> plays the chord.<br>We use <b>colours</b> so it's easy to see:<br><span class="hk-hand-l">L</span> pink = <b>left hand</b><br><span class="hk-hand-r">R</span> blue = <b>right hand</b><br>Watch the keys: your left hand is on low <b>G2</b>, and your right hand plays the <b>G chord</b> higher up. 😄`, want: { tap: true }, ok: "Got it! 🙌", range: [36, 76], hands: { left: [43], right: [67, 71, 74], leftLabel: "G", rightLabel: "G chord" }, demo: [43, 67, 71, 74], done: "Pink = left, blue = right 🎨" },
  "m-song-ateam": { say: "Now try <b>The A Team</b> by Ed Sheeran 🎶<br><b>G → D → Em → C</b><br><small>(Shown in the easy key of G.)</small>", want: { seq: [G, D, EM, C] }, demoSeq: [[G, "G"], [D, "D"], [EM, "Em"], [C, "C"]], tip: "🎹 Now play along with the real song!", done: "You just played The A Team! 🎉" , video: "the-a-team", song: "The A Team", shareSong: "The A Team" },
  "m-song-perfect": { say: "Now <b>Perfect</b> by Ed Sheeran 💕<br>Same chords, new order:<br><b>G → Em → C → D</b><br><small>(Shown in the easy key of G.)</small>", want: { seq: [G, EM, C, D] }, demoSeq: [[G, "G"], [EM, "Em"], [C, "C"], [D, "D"]], tip: "🎹 Now play along with the real song!", done: "You just played Perfect! 💕" , video: "perfect", song: "Perfect", shareSong: "Perfect" },
  "m-song-viva": { say: "Now <b>Viva La Vida</b> by Coldplay 👑<br><b>C → D → G → Em</b><br><small>(Shown in the easy key of G.)</small>", want: { seq: [C, D, G, EM] }, demoSeq: [[C, "C"], [D, "D"], [G, "G"], [EM, "Em"]], tip: "🎹 Now play along with the real song!", done: "You just played Viva La Vida! 👑" , video: "viva-la-vida", song: "Viva La Vida", shareSong: "Viva La Vida" },
  "m-song-roads": { say: "One more: <b>Country Roads</b> by John Denver 🛣️<br><b>G → Em → D → C</b><br><small>(Shown in the easy key of G.)</small>", want: { seq: [G, EM, D, C] }, demoSeq: [[G, "G"], [EM, "Em"], [D, "D"], [C, "C"]], tip: "🎹 Now play along with the real song!", done: "Take me home! 🎉" , video: "country-roads", song: "Take Me Home, Country Roads", shareSong: "Take Me Home, Country Roads" },
  "q-which-song": { say: "Quick quiz! 🧠<br>Which song goes <b>G → D → Em → C</b>?", want: { choice: "The A Team" }, options: ["Perfect", "The A Team", "Viva La Vida"], noKeys: true, done: "Yes! The A Team 🎉" },
  "m-soft-strong": { say: "Play <b>G</b> <b>softly</b>… then <b>strong</b> 💪<br>It feels different!<br><small>(Best on a real piano.)</small>", want: { times: 2, notes: G }, show: G, soft: true, done: "Soft and strong. Nice! 🎉" },
  "m-sing": { say: "Play <b>C</b> and press the <b>top key</b> a bit <b>harder</b>.<br>Now it sings! 🎶", want: { notes: C }, show: C, sing: true, done: "Beautiful! 🎶" },
  "m-another-song": { say: "Same 4 chords, <b>new order</b>:<br><b>G → Em → C → D</b><br>That's the shape of songs like <i>Perfect</i>!", want: { seq: [G, EM, C, D] }, demoSeq: [[G, "G"], [EM, "Em"], [C, "C"], [D, "D"]], done: "Two songs' worth of chords! 🏆" },
  "m-feel": { chat: `<h3 data-q="Why does soft or strong matter? 🤔">Your touch is the feeling 💛</h3>
      <p>The same chords can sound gentle, sad or powerful. It all depends on <b>how hard you press the keys</b>.</p>
      <p>That's how a song's <b>emotion</b> and <b>overall feeling</b> change as it goes: soft and quiet in one part, big and strong in another.</p>
      <h3 data-q="How do I get better at that? 🎧">Listen like a pianist 🎧</h3>
      <p>Put on <b>acoustic versions</b> of your favourite songs.</p>
      <p><b>Really listen</b> to the piano in different parts of the song. When does it get softer? When does it get stronger?</p>`,
    say: "Next time you hear a song, follow the piano 🎧", want: { tap: true }, ok: "I'll listen! 🎧", noKeys: true, done: "Your ears are your best teacher 👂💛" },
  "m-pop-song": { chat: `<h3 data-q="Can I play other songs too? 🎶">Yes! Hundreds of them 🎉</h3>
      <p>Lots of pop songs use the same <b>4 chords</b> you know.</p>
      <p>Pick one in <b>Practice</b>, or <b>upload any song</b> there and we'll find the chords for you!</p>`,
    say: "Pick a song you love and play along 🎹", want: { tap: true }, ok: "I played one! 🎉", noKeys: true, extra: "pop", done: "You're a real piano player now! 🎉" },
  "d2-note": { say: "Each key plays a <b>note</b> 🎵<br>Notes are letters: <b>A B C D E F G</b>… then they start again!<br>Press <b>E</b>.", want: { notes: [64] }, help: [64], done: "That's E! 🎉" },
  "d2-octave": { chat: `<h3 data-q="What do A2, A3 and C4 mean? 🔢">The number tells you where 📍</h3>
      <p>The <b>letter</b> is the key. The <b>number</b> says which group of keys it's in.</p>
      <p><b>Middle C is C4.</b> Smaller numbers are further <b>left</b> (lower). Bigger numbers are further <b>right</b>.</p>
      <h3 data-q="So A3 and A2 are both A?">Yes! Same letter, same colour 🎨</h3>
      <p><b>A3</b> is the A just left of middle C. <b>A2</b> is the A one group further left.</p>
      ${PIC_A2_A3_C4}`,
    say: "Press <b>A3</b>, then <b>A2</b>!", labels: "octave", want: { seq: [[57], [45]] }, demoSeq: [[[57], "A3"], [[45], "A2"]], done: "Same colour, same letter, one group lower! 🎉" },
  "d2-song-key": { say: "Songs have a <b>key</b> too! 🏠<br>It's the song's <b>home</b> chord.<br>Play <b>G → D → G</b>. Back home!", want: { seq: [G, D, G] }, demoSeq: [[G, "home"], [D, "away"], [G, "home"]], done: "This song is in the key of G 🏠" },
  "d2-major": { say: "This is <b>C major</b>: <b>C · E · G</b><br>It sounds <b>happy</b> 😀", want: { notes: C }, show: C, done: "Happy! 😀" },
  "d2-minor": { say: "Now move the middle key <b>one step down</b> to the black key: <b>C · E♭ · G</b><br>It sounds <b>sad</b> 🥲 That's <b>C minor</b>!", want: { notes: CMIN }, show: CMIN, done: "Sad! 🥲 One key changed it." },
  "q-sad": { say: "Quick quiz! 🧠<br>Which one sounds <b>sad</b>?", want: { choice: "C minor" }, options: ["C major", "C minor"], noKeys: true, done: "Yes! Minor sounds sad 🥲" },
  "d2-am": { say: "<b>A minor</b>: <b>A · C · E</b><br>All white keys, and it's sad 🥲", want: { notes: AM }, show: AM, done: "That's A minor! 🎉" },
  "d2-pattern": { chat: `<h3 data-q="Which chords are happy and which are sad? 🤔">Here's a secret 🤫</h3>
      <p>In every <b>major</b> key, chords <b>1, 4 and 5</b> are happy 😀 (in the key of G: <b>G, C and D</b>)</p>
      <p>Chords <b>2, 3 and 6</b> are sad 🥲 (in the key of G: <b>Am, Bm and Em</b>)</p>
      <p>That's why <b>Em</b> (chord 6 in the key of G) sounds sad!</p>`,
    say: "Hear them: <b>1 · 4 · 5</b> happy, then <b>6</b> sad.", want: { tap: true }, ok: "Got it 👍", demoSeq: [[G, "1 😀"], [C, "4 😀"], [D, "5 😀"], [EM, "6 🥲"]], done: "1 4 5 happy · 2 3 6 sad 👍" },
  "q-chord6": { say: "Quick quiz! 🧠<br>In a major key, chord <b>6</b> sounds…", want: { choice: "Sad 🥲" }, options: ["Happy 😀", "Sad 🥲"], noKeys: true, done: "Yes! Chord 6 is sad 🥲" },
  "d2-recipe-major": { chat: `<h3 data-q="Can I play ANY chord? 🤔">Yes! Every chord has a recipe 🧑‍🍳</h3>
      <p>A <b>major</b> chord (happy 😀): start on any key, count <b>4 keys up</b>, then <b>3 more</b>. Count the black keys too!</p>
      <p>C major: <b>C</b> → 4 up → <b>E</b> → 3 up → <b>G</b>.</p>`,
    say: "Use the recipe: build <b>F major</b> 😀<br><b>F · A · C</b>", want: { notes: F_MAJ }, help: F_MAJ, done: "F major! 😀 The recipe works!" },
  "d2-e-major": { say: "Now <b>E major</b>: <b>E · G♯ · B</b><br>The recipe lands on a <b>black key</b> ⚫ That's fine!", want: { notes: E_MAJ }, help: E_MAJ, done: "E major! 😀 Black keys are part of the recipe." },
  "d2-recipe-minor": { chat: `<h3 data-q="And the sad chords? 🥲">Minor is the recipe flipped 🔄</h3>
      <p>A <b>minor</b> chord (sad 🥲): count <b>3 keys up</b>, then <b>4 more</b>.</p>
      <p>Shortcut: play the major chord and move the <b>middle key one step down</b>.</p>`,
    say: "Build <b>D minor</b> 🥲<br><b>D · F · A</b>", want: { notes: D_MIN }, help: D_MIN, done: "D minor! 🥲" },
  "d2-all-chords": { say: "Here are <b>all 24</b> major and minor chords 🎹<br>Tap any of them to see and hear it.", want: { tap: true }, ok: "Got it 👍", chart: true, done: "12 happy + 12 sad = every chord! 🎉" },
  "q-chord-recipe": { say: "Quick quiz! 🧠<br>Which notes make <b>A major</b>?<br><small>(4 keys up, then 3 more)</small>", want: { choice: "A · C♯ · E" }, options: ["A · C · E", "A · C♯ · E"], noKeys: true, done: "Yes! A · C♯ · E 😀 (A · C · E is A minor 🥲)" },
  "d2-keys-chords": { chat: `<h3 data-q="What's the difference between a chord and a key? 🤔">Good question! 🙌</h3>
      <p>A <b>chord</b> is 3 or more notes played together, like <b>G</b> or <b>Em</b>.</p>
      <p>A <b>key</b> is a <b>family of chords</b> that sound good together, with one <b>home</b> chord. The key of G's family: <b>G, Am, Bm, C, D, Em</b>.</p>
      <h3 data-q="Can a song move to a different key?">Yes, and the numbers stay the same 🔢</h3>
      <p>Move a song to a new key and the letters change, but the numbers <b>1 · 5 · 6 · 4</b> stay the same. Let's try it!</p>`,
    say: "Ready to play in a new key? 🚀", want: { tap: true }, ok: "Let's go! 🚀", noKeys: true, done: "Same numbers, new letters 🎉" },
  "d2-key-c": { say: "Same 4 chords, new <b>key</b> (C):<br><b>C → G → Am → F</b><br>Songs like <i>Let It Be</i>!", want: { seq: [KC_C, KC_G, KC_AM, KC_F] }, demoSeq: [[KC_C, "C"], [KC_G, "G"], [KC_AM, "Am"], [KC_F, "F"]], done: "Same numbers, new key! 🏆" },
  "d3-left": { chat: `<h3 data-q="Where does my left hand go? 👈">Further left, lower down the piano 👈</h3>
      <p><b>Middle C is C4</b>. Smaller numbers are further <b>left</b> (lower). Bigger numbers are further <b>right</b> (higher).</p>
      <p>🖐️ <b>Right hand</b> stays near middle C: the G chord is <b>G3 · B3 · D4</b>.</p>
      <p>👈 <b>Left hand</b> goes one group further left, to <b>G2</b>. Same letter, deeper sound.</p>
      <h3 data-q="How do I find G2 on my piano?">Count the Gs going left 🔎</h3>
      <p>Put your right thumb on middle C. Go left: the first G you reach is <b>G3</b>. Keep going left to the next G: that's <b>G2</b>, for your left hand.</p>
      <p>Same letter, same colour: every G here is <b>blue</b> 💙</p>`,
    say: "Press <b>G2</b> with your <b>left hand</b> 👈<br>(the blue key marked G 2)", labels: "octave", want: { notes: [43] }, show: [43], done: "Left hand on G2! 👈" },
  "d3-together": { say: "Now <b>both hands</b>! 🙌<br>👈 Left hand, low: <b>G2</b><br>🖐️ Right hand, near middle C: <b>G3 · B3 · D4</b>", want: { notes: H_G }, show: H_G, done: "Two hands! 🙌" },
  "d3-walk": { say: "👈 Left hand plays each chord's <b>letter</b>, down low:<br><b>G2 → D3 → E3 → C3</b><br>🖐️ Right hand plays the chords near middle C.", want: { seq: [H_G, H_D, H_EM, H_C] }, demoSeq: [[H_G, "G"], [H_D, "D"], [H_EM, "Em"], [H_C, "C"]], done: "Your bass is walking! 🚶" },
  "d3-ear-1": { say: "Use your ears 👂<br>Tap <b>🔊 Hear it</b>.<br>Is it <b>happy</b> or <b>sad</b>?", want: { choice: "sad" }, demo: AM, done: "Yes, sad! That was A minor 🥲" },
  "d3-ear-2": { say: "One more 👂<br>Happy or sad?", want: { choice: "happy" }, demo: D, done: "Yes, happy! That was D major 😀" },
  "d3-linger": { chat: `<h3 data-q="Can I play a real song now? 🎶">Yes! "Linger" by The Cranberries 💜</h3>
      <p>The whole song loops just <b>4 chords</b>: <b>D → A → C → G</b>.</p>
      <p>You know the shape! Press · skip · press · skip · press. Only <b>D</b> and <b>A</b> use one black key each.</p>`,
    say: "Play the loop: <b>D → A → C → G</b> 🎹", want: { seq: [LG_D, LG_A, LG_C, LG_G] }, demoSeq: [[LG_D, "D"], [LG_A, "A"], [LG_C, "C"], [LG_G, "G"]], tip: "🎹 Play along with the real song on your piano!", done: "That's Linger! 🎉💜", video: "linger", song: "Linger", shareSong: "Linger" },
  "d3-interstellar": { chat: `<h3 data-q="Can I play some movie music? 🎬">Yes! Hans Zimmer's Interstellar 🚀</h3>
      <p>The theme from the film <b>Interstellar</b> (2014) by <b>Hans Zimmer</b> is in <b>A minor</b>: dreamy and a little sad.</p>
      <p>In this simple version, one high <b>E</b> keeps ticking on top ⏱️, like the ticking clock in the film, while the chords change underneath.</p>
      <h3 data-q="What do my two hands do?">Left hand low, right hand keeps the E 🙌</h3>
      <p>👈 <b>Left hand</b>, low down: <b>A2 → F2 → C3 → G2</b>.</p>
      <p>🖐️ <b>Right hand</b>, near middle C: the top note is <b>always E4</b> (just right of middle C). Only the bottom notes move.</p>`,
    say: "Both hands! 🚀<br>👈 Left, low: <b>A2 → F2 → C3 → G2</b><br>🖐️ Right: keep <b>E4</b> on top", want: { seq: [IS_AM, IS_F, IS_C, IS_G] }, demoSeq: [[IS_AM, "Am"], [IS_F, "F"], [IS_C, "C"], [IS_G, "G"]], range: [41, 76], along: "interstellar", tip: "🎹 On your real piano, tap the top <b>E</b> softly again and again, like a clock ⏱️", done: "Hello, space! 🚀✨" },
  "d3-song": { say: "Two hands, 4 chords! 🎹🎹<br><b>G → D → Em → C</b>", want: { seq: [H_G, H_D, H_EM, H_C] }, demoSeq: [[H_G, "G"], [H_D, "D"], [H_EM, "Em"], [H_C, "C"]], done: "You played a song with two hands! 🏆" },
  "d4-genres": { chat: `<h3 data-q="What's Lesson 4 about? 🤔">Music has flavours 🍦</h3>
      <p>They're called <b>genres</b> (say "zhon-ruhs"): <b>pop</b>, <b>rock</b>, <b>blues</b>, <b>jazz</b>, <b>classical</b>, and many more like reggae, country and R&amp;B.</p>
      <p>Same piano, same keys. What changes is <b>which chords</b> they love and <b>how</b> they play them.</p>`,
    say: "Let's taste 5 flavours! 🎶", want: { tap: true }, ok: "Let's go! 🚀", noKeys: true, done: "Here we go! 🎹" },
  "d4-pop": { chat: `<h3 data-q="What makes a song pop? 🎤">Catchy chords, round and round 🎤</h3>
      <p><b>Pop</b> loves a short loop of 4 chords that repeats, so you can sing along. You already know the most famous one: <b>1 · 5 · 6 · 4</b>!</p>`,
    say: "Pop! Play <b>G → D → Em → C</b> 🎤", want: { seq: [G, D, EM, C] }, demoSeq: [[G, "1"], [D, "5"], [EM, "6"], [C, "4"]], done: "That's pop! 🎤 (Perfect, Let It Be…)" },
  "d4-rock": { chat: `<h3 data-q="And rock? 🎸">Big, simple, strong chords 🎸</h3>
      <p><b>Rock</b> plays simple chords <b>strong</b>, with a driving beat. A rock favourite is <b>1 · ♭7 · 4</b>.</p>
      <p>That's <i>Sweet Home Alabama</i> by Lynyrd Skynyrd: <b>D · C · G</b>.</p>`,
    say: "Rock it! Play <b>D → C → G</b>, strong 💪", want: { seq: [D, C, G] }, demoSeq: [[D, "D"], [C, "C"], [G, "G"]], done: "That's rock! 🎸" },
  "d4-blues": { chat: `<h3 data-q="What's the blues? 🎺">The parent of rock and jazz 🎺</h3>
      <p>The <b>blues</b> came from African American musicians in the southern United States in the late 1800s. Rock and jazz both grew out of it.</p>
      <h3 data-q="How do I play it?">3 chords, 12 bars 🔢</h3>
      <p>The famous <b>12-bar blues</b> uses just chords <b>1, 4 and 5</b>. In C: <b>C, F and G</b>, in this order:</p>
      <p><b>C C C C · F F C C · G F C G</b></p>
      <p>For that bluesy sound, add a 4th key on top: a <b>7th chord</b> (C7, F7, G7). Songs like <i>Johnny B. Goode</i> use it.</p>`,
    say: "Play the blues chords: <b>C7 → F7 → G7</b> 🎺", want: { seq: [C7, F7, G7] }, demoSeq: [[C7, "C7"], [F7, "F7"], [G7, "G7"]], along: "blues", done: "You've got the blues! 🎺😎" },
  "d4-jazz": { chat: `<h3 data-q="And jazz? 🎷">Rich chords and a famous move 🎷</h3>
      <p><b>Jazz</b> grew out of the blues in <b>New Orleans</b> in the early 1900s. It loves rich <b>4-note chords</b> and making things up as you go.</p>
      <p>Its most famous move is <b>2 · 5 · 1</b>. In C: <b>Dm7 → G7 → Cmaj7</b>. You'll hear it in <i>Autumn Leaves</i> and <i>Fly Me to the Moon</i>.</p>`,
    say: "Play <b>2 · 5 · 1</b>: <b>Dm7 → G7 → Cmaj7</b> 🎷", want: { seq: [DM7, G7, CMAJ7] }, demoSeq: [[DM7, "2"], [G7, "5"], [CMAJ7, "1"]], done: "Smooth! That's jazz 🎷" },
  "d4-classical": { chat: `<h3 data-q="What about classical? 🎻">One note at a time 🎻</h3>
      <p><b>Classical</b> music (Bach, Mozart, Beethoven) often plays a chord <b>one key at a time</b>, called a <b>broken chord</b>.</p>
      <p>Bach's famous <i>Prelude in C</i> is broken chords all the way through!</p>`,
    say: "Play a broken C chord: <b>C → E → G</b>, one at a time 🎻", want: { seq: [[60], [64], [67]] }, demoSeq: [[[60], "C"], [[64], "E"], [[67], "G"]], done: "Beautiful. That's classical 🎻" },
  "q-genre": { say: "Quick quiz! 🧠<br>Which style is famous for the <b>12-bar</b> pattern?", want: { choice: "Blues" }, options: ["Pop", "Blues", "Classical"], noKeys: true, done: "Yes! The 12-bar blues 🎺" },
  "d4-your-style": { chat: `<h3 data-q="Which style should I play? 🤔">The one you love most 💜</h3>
      <p>Every style uses the same piano and the chords you know. Pick songs from the style you love and you'll practise more.</p>
      <p>Find them in <b>Practice</b>, or upload any song and we'll find the chords.</p>`,
    say: "Which flavour is yours? 🍦", want: { tap: true }, ok: "I know my style! 🎶", noKeys: true, done: "Now go play it! 🎉" },
};

// Today: the day's tasks as big full-width cards, one thing each.
// Where the learner is in the course: "Lesson 6 of 150".
function courseProgress() {
  const core = LESSONS.filter((l) => !l.optional && !l.pre);
  const doneCount = core.filter((l) => isLessonComplete(l.id)).length;
  const next = core.find((l) => !isLessonComplete(l.id)) || null;
  return { total: core.length, done: doneCount, next, number: next ? core.indexOf(next) + 1 : core.length };
}

// Today: the day's tasks as big full-width cards, one thing each.
function todayHtml() {
  const { total, done: doneCount, next, number } = courseProgress();
  const quests = getQuests();
  const done = (id) => quests.find((q) => q.id === id)?.done;
  const streak = getStreak();
  const lv = getLevel();
  const started = doneCount > 0;
  const pct = Math.round((100 * doneCount) / Math.max(1, total));
  const card = (ic, title, sub, attrs, isDone, cta) => `
    <button class="hk-task ${isDone ? "hk-task-done" : ""}" ${attrs}>
      <span class="hk-task-icon">${icon(isDone ? "check" : ic, 40)}</span>
      <span class="hk-task-body"><strong>${title}</strong><span>${sub}</span></span>
      <span class="hk-task-cta">${isDone ? "Done" : cta}</span>
    </button>`;
  const hero = next ? `
      <button class="hk-hero" data-lesson="${next.id}">
        <div class="hk-hero-body">
          <div class="hk-hero-kicker">${started ? `Lesson ${number} of ${total}` : "Start here"}</div>
          <div class="hk-hero-title">${next.title}</div>
          <div class="hk-hero-bar"><span style="width:${Math.max(3, pct)}%"></span></div>
          ${streak.count ? `<div class="hk-hero-meta">${icon("flame", 16)} ${streak.count}-day streak</div>` : ""}
          <span class="hk-hero-cta">${started ? "Continue ▶" : "Start now ▶"}</span>
        </div>
      </button>`
    : card("trophy", "Every lesson done!", "Pick any topic again from the Roadmap", "data-go-roadmap", false, "Open");
  // Home: just the one big "continue" card. Everything else lives in the
  // tabs (and the lesson list opens from the lesson screen).
  homeSceneThisVisit = homeSceneThisVisit || nextHomeScene();
  return `<div class="hk-today hk-today-clean"><div class="hk-home-stage">${catsSvg(homeSceneThisVisit, { label: "Ginger and Pepper at the pianos" })}</div>${hero}
    <button class="hk-home-upload" data-home-upload type="button">
      ${icon("cassette", 44)}
      <span><b>Upload any song</b><span>and we'll find the chords for you</span></span>
      <span class="hk-home-upload-go">Upload</span>
    </button>
    <button class="hk-home-how" data-home-how type="button">${icon("star", 18)} How it works</button>
    ${tipJarHtml()}
    <p class="hk-home-credit">Supported by the Astryks Group (<a href="https://astryks.com" target="_blank" rel="noopener">astryks.com</a>)</p></div>`;
}

// Roadmap tab: every topic, grouped; tap any one to open it.
function roadmapPageHtml() {
  const nextId = LESSONS.find((l) => !l.optional && !l.pre && !isLessonComplete(l.id))?.id;
  const node = (lesson, i) => {
    const done = isLessonComplete(lesson.id);
    const num = lessonDisplayNumber(lesson, i);
    return `<button class="hk-roadmap-node ${done ? "hk-roadmap-done" : ""} ${lesson.id === nextId ? "hk-roadmap-current" : ""}" data-lesson="${lesson.id}">
        <span class="hk-roadmap-num">${done ? "&#10003;" : (num ?? "•")}</span>
        <span class="hk-roadmap-label">${lesson.title}<span class="hk-roadmap-sub">${lesson.subtitle || ""}</span></span>
        ${lesson.id === nextId ? '<span class="hk-roadmap-here">up next</span>' : ""}
      </button>`;
  };
  const groups = [
    ["Before you start", (l) => l.pre],
    ["Lessons", (l) => !l.pre && !l.optional],
    ["Optional: World songs", (l) => l.optional],
  ];
  return `<div class="hk-roadmap-page">
      <h2>Your roadmap</h2>
      <p class="hk-honest-note">${LESSONS.filter((l) => isLessonComplete(l.id)).length} of ${LESSONS.length} done. Tap any topic to open it.</p>
      ${groups.map(([name, fn]) => `<h3 class="hk-roadmap-group">${name}</h3><div class="hk-roadmap-list">${LESSONS.map((l, i) => (fn(l) ? node(l, i) : "")).join("")}</div>`).join("")}
    </div>`;
}

function renderRoadmapTab(panel, onOpen) {
  panel.innerHTML = roadmapPageHtml();
  panel.querySelectorAll("[data-lesson]").forEach((b) => b.addEventListener("click", () => onOpen(b.dataset.lesson)));
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

const DAILY_REVIEW_TITLE = "Daily review";

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
  watchChats(main);

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

  // The Lessons tab is "Today": a short, full-screen list of today's
  // tasks, one big card each. The full course lives in the Roadmap tab.
  function showMap() {
    runLessonExitCleanups();
    document.body.classList.remove("hk-lesson-open");
    main.innerHTML = todayHtml();
    main.querySelectorAll("[data-lesson]").forEach((btn) => {
      btn.addEventListener("click", () => startLesson(btn.dataset.lesson));
    });
    main.querySelector("[data-go-practice]")?.addEventListener("click", () => document.querySelector('[data-tab="practice"]')?.click());
    main.querySelector("[data-home-how]")?.addEventListener("click", () => window.dispatchEvent(new CustomEvent("hk-show-tab", { detail: "how" })));
    wireTipJar(main);
    // Home "Upload any song": open Practice and the file picker in the same tap.
    main.querySelector("[data-home-upload]")?.addEventListener("click", () => {
      document.querySelector('[data-tab="practice"]')?.click();
      const input = document.querySelector("#hk-ph-file");
      if (input) input.click();
    });
    main.querySelector("[data-unlocked-song]")?.addEventListener("click", (e) => window.dispatchEvent(new CustomEvent("hk-open-song", { detail: { title: e.currentTarget.dataset.unlockedSong } })));
    main.querySelectorAll("[data-go-roadmap]").forEach((b) => b.addEventListener("click", () => window.dispatchEvent(new CustomEvent("hk-show-tab", { detail: "roadmap" }))));
    renderSidebar();
  }

  let currentLessonId = null;
  function startLesson(id) {
    currentLessonId = id;
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
      "lesson-11": () => runMajorScaleLesson(MAJOR_SCALES[0], "lesson-11"),
      "lesson-12": () => runMajorScaleLesson(MAJOR_SCALES[1], "lesson-12"),
      "lesson-13": () => runMajorScaleLesson(MAJOR_SCALES[2], "lesson-13"),
      "lesson-14": () => runMajorScaleLesson(MAJOR_SCALES[3], "lesson-14"),
      "lesson-15": runLesson15,
      "lesson-16": runLesson16,
      "lesson-17": () => runMinorScaleLesson(MINOR_SCALES[0], "lesson-17"),
      "lesson-18": () => runMinorScaleLesson(MINOR_SCALES[1], "lesson-18"),
      "lesson-19": () => runMinorScaleLesson(MINOR_SCALES[2], "lesson-19"),
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
      "lesson-ear-gym": runEarGym,
      "lesson-pedals": runPedalFunLesson,
      "lesson-technique": runTechniqueLesson,
      "lesson-waitmode": runWaitModeLesson,
      "lesson-sheet": runSheetMusicLesson,
      "lesson-sheet-ode": () => runSheetSongLesson("lesson-sheet-ode", ODE_TO_JOY, { hands: true }),
      "lesson-sheet-minuet": () => runSheetSongLesson("lesson-sheet-minuet", MINUET_IN_G, { hands: false }),
      "lesson-sheet-bach": () => runSheetSongLesson("lesson-sheet-bach", BACH_PRELUDE_SHEET, { hands: true }),
      "lesson-handsloop": runHandsLoopLesson,
      "lesson-tomjerry": runTomJerryLesson,
      "lesson-timed": runTimedLesson,
      "daily-review": runDailyReview,
      "lesson-beethoven-form": runBeethovenFormLesson,
      "lesson-bach-prelude": runBachPreludeLesson,
    };
    // "Master this song" lessons (item 22's path toward ~100 real
    // lessons) are generated from real song data rather than hand-listed
    // here one at a time — wire them up the same way.
    LESSONS.forEach((l) => {
      if (MICRO_CARDS[l.id]) runners[l.id] = () => runMicroLesson(l.id);
      if (l.world) runners[l.id] = () => runWorldLesson(l);
      if (l.worldIntro) runners[l.id] = runWorldIntro;
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
        <div class="hk-lesson-topbar"><button class="hk-lesson-exit" id="hk-lesson-exit" aria-label="Close lesson">✕</button><button class="hk-lesson-back" id="hk-lesson-back" aria-label="Previous lesson">← Back</button><h2>${title}</h2><span class="hk-lesson-count" id="hk-lesson-count"></span></div>
        ${teachHtml(currentLessonId)}${lessonInspireHtml(currentLessonId)}
        <div class="hk-lesson-content" id="hk-lesson-content"></div>
        <div id="hk-lesson-highway" class="hk-lesson-highway hk-hidden"></div>
        <div id="hk-lesson-keyboard" class="hk-keyboard-wrap"></div>
        <div class="hk-lesson-controls" id="hk-lesson-controls"></div>
      </div>`;
    main.querySelector("#hk-lesson-exit").addEventListener("click", showMap);
    main.querySelectorAll(".hk-teach, .hk-inspire").forEach((el) => wireVideos(el));
    // ← Back: the lesson before this one in the course.
    const order = LESSONS.filter((l) => !l.optional && !l.pre);
    const at = order.findIndex((l) => l.id === currentLessonId);
    const backBtn = main.querySelector("#hk-lesson-back");
    // Lesson 1 has nothing before it, so no Back button there.
    if (at > 0) backBtn.addEventListener("click", () => startLesson(order[at - 1].id));
    else backBtn.style.visibility = "hidden";
    const core = LESSONS.filter((l) => !l.optional && !l.pre);
    const ci = core.findIndex((l) => l.id === currentLessonId);
    if (ci >= 0) main.querySelector("#hk-lesson-count").textContent = `${ci + 1}/${core.length}`;
    else {
      // Pre-lessons and optional World songs: Back goes to the entry
      // before this one in the full list (the very first one has none).
      const ai = LESSONS.findIndex((l) => l.id === currentLessonId);
      if (ai > 0) {
        backBtn.style.visibility = "";
        backBtn.addEventListener("click", () => startLesson(LESSONS[ai - 1].id));
      } else backBtn.style.visibility = "hidden";
    }
    document.body.classList.add("hk-lesson-open");
    window.scrollTo(0, 0);
    return {
      content: main.querySelector("#hk-lesson-content"),
      keyboardWrap: main.querySelector("#hk-lesson-keyboard"),
      controls: main.querySelector("#hk-lesson-controls"),
    };
  }

  // Item 57: the falling-blocks ("Tetris") view in every lesson, not
  // just Practice. lessonKeyboard() is renderKeyboard() plus a short
  // note highway above it: whenever a lesson lights up keys
  // (highlightChord / highlightHands), matching blocks drop down and
  // land on exactly those keys, in the same pink-left / blue-right
  // colors — so every step reads the same way the falling-notes
  // practice view does. playAlong() runs a whole chord sequence in time
  // on the highway, for the song lessons.
  function lessonKeyboard(wrap, opts) {
    const kb = renderKeyboard(wrap, opts);
    const highwayEl = main.querySelector("#hk-lesson-highway");
    if (!highwayEl || wrap.id !== "hk-lesson-keyboard") return kb;
    highwayEl.classList.remove("hk-hidden");
    const LOOKAHEAD = 1.2;
    const highway = renderNoteHighway(highwayEl, kb.keyLayout, { lookaheadSec: LOOKAHEAD, hitLineFrac: 0.97 });
    let dropRaf = null;
    let along = null;
    // Blocks fall from the very top, flow into the keys and melt away
    // (no frozen blocks sitting above the keys); the keys stay lit.
    const DROP_SPEED = 2.2; // highway seconds per real second
    function drop(blocks) {
      if (dropRaf) cancelAnimationFrame(dropRaf);
      const notes = blocks.map((b) => ({ ...b, time: LOOKAHEAD, duration: 0.45 }));
      const t0 = performance.now();
      const end = LOOKAHEAD + 0.45 + LOOKAHEAD * 0.1;
      const frame = () => {
        const t = ((performance.now() - t0) / 1000) * DROP_SPEED;
        highway.render(Math.min(t, end), notes);
        if (t < end) dropRaf = requestAnimationFrame(frame);
      };
      frame();
    }
    const origChord = kb.highlightChord;
    const origHands = kb.highlightHands;
    const origClear = kb.clearHighlights;
    kb.highlightChord = (notes, o) => {
      origChord(notes, o);
      if (!along) drop(notes.map((midi) => ({ midi, hand: "left" })));
    };
    kb.highlightHands = (h = {}) => {
      origHands(h);
      if (!along) drop([...(h.left || []).map((midi) => ({ midi, hand: "left" })), ...(h.right || []).map((midi) => ({ midi, hand: "right" }))]);
    };
    kb.clearHighlights = () => {
      origClear();
      if (!along) {
        if (dropRaf) cancelAnimationFrame(dropRaf);
        highway.render(0, []);
      }
    };
    // Plays a timeline of notes — [{ midi, start, dur, hand }] in
    // seconds — as falling blocks, with sound and live key highlights.
    // Calls onDone when it finishes. Returns stop().
    kb.playTimeline = (events, { lead = 1.0, onDone } = {}) => {
      kb.stopPlayAlong();
      const notes = events.map((e) => ({ midi: e.midi, time: e.start + lead, duration: e.dur, hand: e.hand || "right" }));
      const total = Math.max(...notes.map((n) => n.time + n.duration)) + 0.2;
      const t0 = performance.now();
      // Notes are handed to the audio clock ~0.25s ahead (precise timing
      // even in fast passages), but never further — so Stop is near-instant.
      const SCHEDULE_AHEAD = 0.25;
      let nextToSchedule = 0;
      notes.sort((a, b) => a.time - b.time);
      let lastKey = "";
      along = { raf: null };
      const frame = () => {
        if (!along) return;
        const t = (performance.now() - t0) / 1000;
        while (nextToSchedule < notes.length && notes[nextToSchedule].time < t + SCHEDULE_AHEAD) {
          const n = notes[nextToSchedule++];
          if (n.time >= t - 0.05) playTone(n.midi, { duration: n.duration * 0.95, delay: Math.max(0, n.time - t) });
        }
        highway.render(t, notes);
        const sounding = notes.filter((n) => t >= n.time && t < n.time + n.duration);
        const key = sounding.map((n) => n.midi + n.hand).join();
        if (key !== lastKey) {
          lastKey = key;
          if (sounding.length) {
            origHands({ left: sounding.filter((n) => n.hand === "left").map((n) => n.midi), right: sounding.filter((n) => n.hand === "right").map((n) => n.midi) });
          } else origClear();
        }
        if (t >= total || !wrap.isConnected) {
          kb.stopPlayAlong();
          if (onDone && wrap.isConnected) onDone();
          return;
        }
        along.raf = requestAnimationFrame(frame);
      };
      frame();
      return kb.stopPlayAlong;
    };
    // Chord symbols in time: left hand root + right hand chord, one
    // chord per `barSec`.
    // `chords` are symbols (one bar each) or { chord, len } steps.
    kb.playAlong = (chords, { barSec = 2.4, onDone } = {}) => {
      const events = [];
      let at = 0;
      chords.forEach((item) => {
        const { chord, len = 1 } = typeof item === "string" ? { chord: item } : item;
        const midis = chordSymbolToMidi(chord);
        const start = at * barSec;
        at += len;
        if (!midis.length) return;
        events.push({ midi: midis[0] - 12, start, dur: len * barSec * 0.92, hand: "left" });
        midis.forEach((midi) => events.push({ midi, start, dur: len * barSec * 0.92, hand: "right" }));
      });
      return kb.playTimeline(events, { onDone });
    };
    // Item 59: hands the highway and raw highlight functions to an
    // external driver (play-engine.js), with the drop animation off.
    kb.takeOver = () => {
      kb.stopPlayAlong();
      if (dropRaf) cancelAnimationFrame(dropRaf);
      along = { external: true };
      return {
        render: (t, notes) => highway.render(t, notes),
        hands: (h) => origHands(h),
        clear: () => origClear(),
        release: () => {
          if (along && along.external) along = null;
          origClear();
          highway.render(0, []);
        },
      };
    };
    kb.stopPlayAlong = () => {
      if (!along) return;
      if (along.raf) cancelAnimationFrame(along.raf);
      along = null;
      origClear();
      highway.render(0, []);
    };
    onLessonExit(() => kb.stopPlayAlong());
    return kb;
  }

  // A "play it in time" button for song lessons: the chords fall as
  // blocks onto the keys at a steady practice tempo (twice through),
  // with sound. Toggles to Stop while running.
  function addPlayAlongButton(controls, kb, chords, label = "▶ Play along (falling blocks)") {
    if (!kb.playAlong || !chords || !chords.length) return;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "hk-btn";
    btn.textContent = label.startsWith("▶") ? label : `▶ ${label}`;
    let running = false;
    btn.addEventListener("click", () => {
      if (running) {
        kb.stopPlayAlong();
        running = false;
        btn.textContent = label.startsWith("▶") ? label : `▶ ${label}`;
        return;
      }
      running = true;
      btn.textContent = "■ Stop";
      kb.playAlong([...chords, ...chords], {
        onDone: () => {
          running = false;
          btn.textContent = label.startsWith("▶") ? label : `▶ ${label}`;
        },
      });
    });
    controls.appendChild(btn);
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
    return chatHtml(html, pose);
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


  // ----- Day 1 micro-lesson (one card) -----
  function runMicroLesson(id) {
    const card = MICRO_CARDS[id];
    const lesson = LESSONS.find((l) => l.id === id);
    const { content, keyboardWrap, controls } = lessonShell(lesson.title);
    // Chat style: Hayden "types" for a moment, then the message pops in.
    content.innerHTML = (card.chat ? chatHtml(card.chat, "idle") : "") + `<div class="hk-micro-thread" id="hk-micro-thread"><div class="hk-micro">${card.chat ? "" : `<div class="hk-micro-avatar hk-avatar-scene">${catsSvg(nextCatScene(), { label: "Ginger and Pepper" })}</div>`}<div class="hk-micro-bubble" id="hk-micro-say"><span class="hk-chat-typing"><i></i><i></i><i></i></span></div></div></div>`;
    const thread = content.querySelector("#hk-micro-thread");
    setTimeout(() => { if (!finished) say.innerHTML = card.say; }, 550);
    // Chord cards: pressing 3 keys at once on a phone is hard; say so.
    const w0 = card.want;
    // Shown once, the first time a chord card appears, then never again.
    const PHONE_NOTE_KEY = "hk_phone_note_seen";
    let phoneNoteSeen = false;
    try { phoneNoteSeen = localStorage.getItem(PHONE_NOTE_KEY) === "1"; } catch (e) { /* ignore */ }
    if (!phoneNoteSeen && ((w0.notes && w0.notes.length >= 3) || (w0.seq && w0.seq.some((c) => c.length >= 3)))) {
      try { localStorage.setItem(PHONE_NOTE_KEY, "1"); } catch (e) { /* ignore */ }
      thread.insertAdjacentHTML("beforeend", `<div class="hk-phone-note">${icon("piano", 20)}<span>On the screen, tap the keys <b>one at a time</b>. On <b>your piano</b>, press them <b>together</b>.</span></div>`);
    }
    const reply = (html, cls = "") => {
      thread.querySelector(".hk-micro-oops")?.remove();
      thread.insertAdjacentHTML("beforeend", `<div class="hk-micro hk-micro-reply ${cls}"><div class="hk-micro-bubble">${html}</div></div>`);
      thread.lastElementChild.scrollIntoView?.({ behavior: "smooth", block: "nearest" });
    };
    // C3 to E5: middle C sits right in the middle of the screen.
    // Narrow range = bigger keys. Day 3 adds the low bass notes.
    const [lo, hi] = card.range || (id.startsWith("d3-") || id === "d2-octave" ? [43, 72] : [53, 72]);
    const kb = lessonKeyboard(keyboardWrap, { startMidi: lo, endMidi: hi, markMiddleC: !card.hideMiddleC });
    if (card.noKeys) { keyboardWrap.style.display = "none"; main.querySelector("#hk-lesson-highway")?.classList.add("hk-hidden"); }
    // Labels on the keys: every white key's letter, or numbers counted from G.
    const FROM_G = { 55: "1\nG", 57: "2\nA", 59: "3\nB", 60: "4\nC", 62: "5\nD", 64: "6\nE" };
    const relabel = () => {
      if (!card.labels) return;
      if (card.labels === "groups" || card.labels === "groups3") {
        kb.keyElements.forEach((el, m) => { if ([1, 3].includes(m % 12)) el.classList.add("hk-key-group2"); if (card.labels === "groups3" && [6, 8, 10].includes(m % 12)) el.classList.add("hk-key-group3");  });
        return;
      }
      const map = card.labels === "fromG" ? FROM_G : card.labels === "octave" ? Object.fromEntries([...kb.keyElements.keys()].filter((m) => ![1, 3, 6, 8, 10].includes(m % 12)).map((m) => {
        kb.keyElements.get(m).classList.add(`hk-letter-${midiToName(m)[0]}`);
        return [m, midiToName(m).replace(/^([A-G])(\d)$/, "$1\n$2")];
      })) : Object.fromEntries([...kb.keyElements.keys()].filter((m) => ![1, 3, 6, 8, 10].includes(m % 12)).map((m) => [m, midiToName(m).replace(/-?\d+$/, "")]));
      Object.entries(map).forEach(([m, label]) => {
        const el = kb.keyElements.get(Number(m));
        if (!el || el.querySelector(".hk-key-notename")) return;
        const t = document.createElement("div");
        t.className = "hk-key-notename hk-key-notename-big";
        t.textContent = label;
        el.appendChild(t);
      });
    };
    const hl = kb.highlightChord.bind(kb);
    const clr = kb.clearHighlights.bind(kb);
    kb.highlightChord = (n, o) => { hl(n, o); relabel(); };
    kb.clearHighlights = () => { clr(); relabel(); };
    relabel();
    if (card.show) kb.highlightChord(card.show);
    if (card.hands) kb.highlightHands(card.hands);
    const say = content.querySelector("#hk-micro-say");
    const demoNotes = card.demo || card.show || card.help || (card.want.notes || []);
    controls.innerHTML = `
      ${card.want.choice && card.options ? "" : card.soft ? `<button class="hk-btn" id="hk-micro-soft">${icon("soft", 20)} Soft</button><button class="hk-btn" id="hk-micro-strong">${icon("speaker", 20)} Strong</button>` : card.extra === "pop" || !(demoNotes.length || card.demoSeq) ? "" : `<button class="hk-btn" id="hk-micro-hear">${icon("speaker", 20)} Hear it</button>`}
      ${card.help ? `<button class="hk-btn" id="hk-micro-help">${icon("eye", 20)} Show me</button>` : ""}
      ${card.cantFind ? `<button class="hk-btn" id="hk-micro-cant">I can't find it 🤔</button>` : ""}
      ${card.want.tap ? `<button class="hk-btn hk-btn-primary" id="hk-micro-ok">${card.ok || "Got it!"}</button>` : ""}
      ${card.want.choice ? (card.options || ["happy", "sad"]).map((o) => `<button class="hk-btn hk-micro-choice" data-choice="${o}">${o === "happy" ? "😀 Happy" : o === "sad" ? "🥲 Sad" : o}</button>`).join("") : ""}
      ${card.extra === "pop" ? `<button class="hk-btn" data-go-tab="practice">${icon("song", 20)} Find a song in Practice</button>` : ""}
      ${card.song || card.video ? `<button class="hk-btn hk-micro-skip" id="hk-micro-skip">Next →</button>` : ""}`;
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    async function playSeq(seq) {
      for (const [notes, label] of seq) {
        if (!content.isConnected) return;
        kb.highlightChord(notes, { number: label, rootMidi: notes[0] });
        playChord(notes, { duration: 0.9 });
        await sleep(900);
      }
      if (card.show) kb.highlightChord(card.show); else kb.clearHighlights();
    }
    controls.querySelector("#hk-micro-hear")?.addEventListener("click", () => {
      if (card.demoSeq) return playSeq(card.demoSeq);
      if (card.sing) { playChord(demoNotes.slice(0, -1), { duration: 1.2, velocity: 55 }); playTone(demoNotes[demoNotes.length - 1], { duration: 1.2, velocity: 120 }); return; }
      if (card.want.pc !== undefined) { playTone(55, { duration: 0.8 }); setTimeout(() => playTone(67, { duration: 0.8 }), 450); return; }
      playChord(demoNotes, { duration: 1.2 });
    });
    controls.querySelector("#hk-micro-soft")?.addEventListener("click", () => playChord(demoNotes, { duration: 1.2, velocity: 35 }));
    controls.querySelector("#hk-micro-strong")?.addEventListener("click", () => playChord(demoNotes, { duration: 1.2, velocity: 120 }));
    controls.querySelector("#hk-micro-help")?.addEventListener("click", () => kb.highlightChord(card.help));
    controls.querySelector("#hk-micro-cant")?.addEventListener("click", (e) => {
      reply(card.cantFind);
      kb.highlightChord([60]);
      playTone(60, { duration: 1 });
      e.currentTarget.remove();
      const ok = controls.querySelector("#hk-micro-ok");
      if (ok) ok.textContent = "Found it now! ✅";
    });

    // All 24 chords: tap one to see it on the keys and hear it.
    if (card.chart) {
      const ROOTS = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];
      const chip = (sym) => `<button class="hk-chord-chip" data-chord="${sym}">${sym.replace("#", "♯").replace(/^([A-G])b/, "$1♭")}</button>`;
      thread.insertAdjacentHTML("beforeend", `<div class="hk-chord-chart">
        <div class="hk-chord-chart-row"><span>😀 Major</span>${ROOTS.map(chip).join("")}</div>
        <div class="hk-chord-chart-row"><span>🥲 Minor</span>${ROOTS.map((r) => chip(r + "m")).join("")}</div></div>`);
      thread.querySelectorAll("[data-chord]").forEach((b) => b.addEventListener("click", () => {
        const notes = voiceIn(chordSymbolToMidi(b.dataset.chord), lo, hi);
        kb.highlightChord(notes, { letter: b.textContent, rootMidi: notes[0] });
        playChord(notes, { duration: 1.2 });
        thread.querySelectorAll(".hk-chord-chip").forEach((c) => c.classList.toggle("hk-chord-chip-on", c === b));
      }));
    }

    // The 12-bar blues, in time.
    if (card.along === "blues") {
      thread.insertAdjacentHTML("beforeend", `<div class="hk-micro-song"><div class="hk-micro-song-btns"><button class="hk-btn" id="hk-along-blues">${icon("play", 20)} Hear the 12-bar blues</button></div></div>`);
      const btn = thread.querySelector("#hk-along-blues");
      const label = btn.innerHTML;
      btn.addEventListener("click", () => {
        if (btn.dataset.running) { kb.stopPlayAlong(); return; }
        btn.dataset.running = "1";
        btn.innerHTML = "■ Stop";
        const bars = [C7, C7, C7, C7, F7, F7, C7, C7, G7, F7, C7, G7];
        kb.playTimeline(voicingsToEvents(bars, 2.0).map((e) => ({ ...e, hand: "right" })), { onDone: () => { delete btn.dataset.running; btn.innerHTML = label; } });
      });
    }

    // Interstellar: the chords held, with the high E ticking in eighths.
    if (card.along === "interstellar") {
      thread.insertAdjacentHTML("beforeend", `<div class="hk-micro-song"><div class="hk-micro-song-btns"><button class="hk-btn" id="hk-along-is">${icon("play", 20)} Hear both hands in time</button></div></div>`);
      const btn = thread.querySelector("#hk-along-is");
      const label = btn.innerHTML;
      btn.addEventListener("click", () => {
        if (btn.dataset.running) { kb.stopPlayAlong(); return; }
        btn.dataset.running = "1";
        btn.innerHTML = "■ Stop";
        const events = [];
        const BAR = 2.4;
        [IS_AM, IS_F, IS_C, IS_G, IS_AM, IS_F, IS_C, IS_G].forEach((ch, i) => {
          events.push({ midi: ch[0], start: i * BAR, dur: BAR * 0.95, hand: "left" });
          ch.slice(1, -1).forEach((m) => events.push({ midi: m, start: i * BAR, dur: BAR * 0.95, hand: "right" }));
          for (let k = 0; k < 8; k++) events.push({ midi: 64, start: i * BAR + k * (BAR / 8), dur: BAR / 8 * 0.6, hand: "right" });
        });
        kb.playTimeline(events, { onDone: () => { delete btn.dataset.running; btn.innerHTML = label; } });
      });
    }

    // Song cards: the real song (official video) and the chords in time,
    // either the main 4-chord part or the whole song.
    if (card.video || card.song) {
      const structure = SONG_STRUCTURES[card.song];
      const loop = (card.demoSeq || []).map(([n]) => n);
      thread.insertAdjacentHTML("beforeend", `<div class="hk-micro-song">
        ${card.video ? videoHtml(card.video) : ""}
        <div class="hk-micro-song-btns">
          <button class="hk-btn" data-along="main">${icon("play", 20)} Main part (4 chords)</button>
          ${structure ? `<button class="hk-btn" data-along="whole">${icon("song", 20)} Whole song</button>` : ""}
        </div></div>`);
      wireVideos(thread);
      thread.querySelectorAll("[data-along]").forEach((b) => b.addEventListener("click", () => {
        const label = b.innerHTML;
        if (b.dataset.running) { kb.stopPlayAlong(); return; }
        thread.querySelectorAll("[data-along]").forEach((x) => { if (x.dataset.running) { delete x.dataset.running; x.innerHTML = x.dataset.label; } });
        const events = b.dataset.along === "whole"
          ? stepsToEvents(wholeSongChords(structure), barSeconds(SONGS.find((x) => x.title === card.song)) || 2.2, (c) => fitChord(c, lo, hi))
          : voicingsToEvents([...loop, ...loop, ...loop, ...loop], 2.2);
        b.dataset.label = label;
        b.dataset.running = "1";
        b.innerHTML = "■ Stop";
        kb.playTimeline(events, { onDone: () => { delete b.dataset.running; b.innerHTML = label; } });
      }));
    }

    // Watch what's played: chord keys may be pressed together or one after
    // another within a couple of seconds (easier with one finger on a phone).
    const recent = [];
    let step = 0;
    let times = 0;
    let finished = false;
    const has = (notes) => notes.every((n) => recent.some((r) => r.midi === n && performance.now() - r.t < 2500));
    const unsub = onNoteOn((midi) => {
      if (finished) return;
      recent.push({ midi, t: performance.now() });
      const w = card.want;
      if (w.pcs) {
        if (w.pcs.includes(((midi % 12) + 12) % 12)) return success();
        reply(!isBlackKey(midi) ? "Try a <b>black</b> key 🖤" : w.pcs.includes(1) ? "That's a group of <b>3</b> 😄 Find a group of <b>2</b>!" : "That's a group of <b>2</b> 😄 Find a group of <b>3</b>!", "hk-micro-oops");
        return;
      }
      if (w.pc !== undefined) {
        if (((midi % 12) + 12) % 12 === w.pc && midi !== w.not) return success();
        if (midi === w.not) reply("That's the same G 😄 Find a <b>different</b> one!", "hk-micro-oops");
        else reply(`That's <b>${midiToName(midi).replace(/\d+$/, "")}</b> 🙈 Look for the letter <b>G</b>!`, "hk-micro-oops");
        return;
      }
      if (w.notes && w.notes.length === 1 && midi !== w.notes[0]) {
        reply(`Oops! That's <b>${midiToName(midi).replace(/\d+$/, "")}</b> 🙈 Try again!`, "hk-micro-oops");
        return;
      }
      if (w.seq) {
        const target = w.seq[step];
        kb.highlightChord(target);
        if (has(target)) {
          recent.length = 0;
          step++;
          if (step >= w.seq.length) return success();
          kb.highlightChord(w.seq[step]);
          say.innerHTML = card.say + `<div class="hk-micro-progress">${"●".repeat(step)}${"○".repeat(w.seq.length - step)}</div>`;
        }
        return;
      }
      if (w.notes && has(w.notes)) {
        recent.length = 0;
        times++;
        if (times >= (w.times || 1)) return success();
        say.innerHTML = card.say + `<div class="hk-micro-progress">Now <b>strong</b>! 💪</div>`;
      }
    });
    onLessonExit(unsub);
    if (card.want.seq) kb.highlightChord(card.want.seq[0]);
    if (card.want.tap) controls.querySelector("#hk-micro-ok").addEventListener("click", success);
    // Song cards: you can always move on without pressing the chords.
    controls.querySelector("#hk-micro-skip")?.addEventListener("click", () => success({ skipped: true }));
    controls.querySelectorAll("[data-go-tab]").forEach((b) => b.addEventListener("click", () => {
      success();
      setTimeout(() => window.dispatchEvent(new CustomEvent("hk-show-tab", { detail: b.dataset.goTab === "discover" ? "practice" : b.dataset.goTab })), 200);
    }));
    controls.querySelectorAll(".hk-micro-choice").forEach((b) => b.addEventListener("click", () => {
      if (b.dataset.choice === card.want.choice) return success();
      b.classList.add("hk-micro-wrong");
      if (card.options) reply("Not quite! 🙈 Have another look and try again.", "hk-micro-oops");
      else { say.innerHTML = card.say + '<div class="hk-micro-progress">Listen again 👂</div>'; playChord(demoNotes, { duration: 1.2 }); }
    }));

    function success({ skipped = false } = {}) {
      if (finished) return;
      finished = true;
      unsub();
      say.innerHTML = card.say;
      if (card.tip && !skipped) reply(card.tip);
      reply(`<div class="hk-micro-done">${skipped ? "No problem! Find this song in Practice anytime 🎶" : card.done}</div>`, "hk-micro-yay");
      const ids = MICRO_LESSONS.map((l) => l.id);
      const nextId = ids[ids.indexOf(id) + 1];
      const dayEnd = DAY_ENDS[id];
      controls.innerHTML = (card.shareSong ? shareButton(card.shareSong) : "") + `<button class="hk-btn hk-btn-primary hk-micro-next" id="hk-micro-next">${dayEnd ? `Finish Lesson ${dayEnd[0]} ${icon("trophy", 22)}` : "Next lesson →"}</button>`;
      markLessonComplete(id);
      if (dayEnd) dayEnd[1].forEach((l) => markLessonComplete(l));
      let going = false;
      const go = async () => {
        // A second tap (or the auto-advance timer) must not open a second
        // "Lesson complete" card or skip a lesson.
        if (going) return;
        going = true;
        if (dayEnd) {
          const fresh = claimRewards(dayEnd[0]);
          await showDayComplete(dayEnd[0], fresh);
          return startNextLesson();
        }
        return nextId ? startLesson(nextId) : startNextLesson();
      };
      const nextBtn = controls.querySelector("#hk-micro-next");
      nextBtn.addEventListener("click", go);
      // Got it right: move on by itself (the button fills up as a countdown).
      if (!dayEnd && nextId && !card.video) {
        const wait = card.tip ? 3200 : 2000;
        nextBtn.classList.add("hk-micro-next-auto");
        nextBtn.style.setProperty("--hk-auto", `${wait}ms`);
        let cancelled = false;
        controls.querySelector("[data-share-song]")?.addEventListener("click", () => { cancelled = true; nextBtn.classList.remove("hk-micro-next-auto"); });
        setTimeout(() => { if (content.isConnected && !cancelled) go(); }, card.shareSong ? wait + 1500 : wait);
      }
    }
  }

  // ----- Step 1: Get yourself a piano (info card, no keyboard needed) ---
  // Real, researched advice, not filler — see commit message for the
  // sourcing. No quiz here: the whole point is this step requires
  // nothing except reading it and clicking through.
  function runPianoIntro() {
    const { content, keyboardWrap, controls } = lessonShell("Get yourself a piano");
    keyboardWrap.innerHTML = "";
    content.innerHTML = mascotSay(`
      <h3 data-q="Where do I begin? 🎹">First, get a piano!</h3>
      <p>You don't need a fancy one. A basic 61-key keyboard is plenty to start.</p>
      <h3 data-q="Where can I find one cheap?">Where to find one, cheap or free</h3>
      <p>Check <strong>Facebook Marketplace</strong>, including the <strong>"free" listings</strong>. People often give pianos away because they're hard to move.</p>
      <p>Or ask your <strong>school</strong> or a local <strong>church or community center</strong>. Many have a piano you can use.</p>
      <h3 data-q="What should I check first?">Before you take one home</h3>
      <p>Press <strong>every key</strong>. Old keyboards often have one or two that stick or stay silent.</p>
      <p>Make sure the <strong>power adapter</strong> comes with it.</p>
      <p>A <strong>sustain pedal</strong> is nice to have, but you don't need one to start.</p>
      <h3 data-q="What are weighted keys?">"Weighted" vs. "unweighted" keys</h3>
      <p><strong>Weighted</strong> keys feel like a real piano and build finger strength.</p>
      <p><strong>Unweighted</strong> keys (most cheap keyboards) are lighter. They're totally fine for starting out.</p>
      <h3 data-q="How much will it cost?">How much it costs</h3>
      <p>A basic new keyboard costs around <strong>$100</strong>. A used one can be much less, sometimes free.</p>
      <p class="hk-honest-note">Careful: a free <em>acoustic</em> piano can hide expensive problems, like rusty strings or cracked parts. A cheap electronic keyboard is the safest way to start.</p>`);
    controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">I've got something to play on. Let's go!</button>`;
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
        <p>First, go to your piano or keyboard. Let's find Middle C, so your piano and the app match.</p>`)}
      <div id="hk-getstarted-cal"></div>`;
    controls.innerHTML = `<button class="hk-btn" id="hk-skip-cal">Skip: I know where Middle C is</button>`;
    controls.querySelector("#hk-skip-cal").addEventListener("click", finish);
    // Get Started has its own Skip button below, so no second one inside.
    const calibration = initCalibration(content.querySelector("#hk-getstarted-cal"), { onComplete: finish, showSkip: false });
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
    const kb = lessonKeyboard(keyboardWrap, { startMidi: 48, endMidi: 84 });
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
      if (kb.stopPlayAlong) kb.stopPlayAlong();
      if (step === "intro") {
        content.innerHTML = mascotSay(`
          ${intermediateUnlock ? "<h3>Intermediate unlocked!</h3><p>You've finished enough Beginner songs to get here.</p>" : `<h3>${song.title}</h3>`}
          <p>${intermediateUnlock ? `"${song.title}" by ${song.artist}` : `By ${song.artist}`}. Key: <strong>${song.key}</strong>. Chords: <strong>${song.chords.join(" - ")}</strong>${song.degreeSequence ? ` (as numbers: ${song.degreeSequence})` : ""}.</p>
          <p>Let's press them one at a time.</p>`, intermediateUnlock ? "assets/mascot-poses/maestro-conducting.png" : poseForSong(song.title));
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Start</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => goForward({ step: "play", idx: 0 }));
        addPlayAlongButton(controls, kb, song.chords);
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
            : `<p>More songs are waiting in your roadmap.</p>`}`,
          newlyEarned.length ? "assets/mascot-poses/maestro-conducting.png" : poseForSong(song.title));
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Next lesson →</button>`;
        controls.querySelector("#hk-done").addEventListener("click", startNextLesson);
        addPlayAlongButton(controls, kb, song.chords, "Now play it in time");
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
    const kb = lessonKeyboard(keyboardWrap, { startMidi: 48, endMidi: 84 });
    let step = "intro";
    let idx = 0;

    function renderStep() {
      if (kb.stopPlayAlong) kb.stopPlayAlong();
      if (step === "intro") {
        content.innerHTML = mascotSay(`
          <h3>Last Christmas by Wham!</h3>
          <p>This song uses a different 4-chord pattern: <strong>${song.chords.join(" - ")}</strong>.</p>
          <p>It's in a different <strong>key</strong> too: its home is <strong>D</strong>, not G. D is 1, Bm is 6, Em is 2 and A is 5, so the pattern is <strong>1-6-2-5</strong>.</p>
          <p>Two chords use black keys: Bm has F#, and A has C# (the black key just right of C). Let's press them one at a time.</p>`);
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Start</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step = "play"; idx = 0; renderStep(); });
        addPlayAlongButton(controls, kb, song.chords);
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
        content.innerHTML = mascotSay(`<h3>Nice! A new song and a new pattern.</h3>
          <p>Not every song uses the same chords, and that's normal. Spotting the pattern is half the skill.</p>`);
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Next lesson →</button>`;
        controls.querySelector("#hk-done").addEventListener("click", startNextLesson);
        addPlayAlongButton(controls, kb, song.chords, "Now play it in time");
      }
    }
    renderStep = withStepBack(renderStep, { controls, kb, getState: () => ({ step, idx }), setState: (s) => ({ step, idx } = s) });
    renderStep();
  }

  // ----- Lesson 3: Choose your song (item 25) -----------------------------
  // A real choice menu, not a forced one-at-a-time montage — 10 real
  // 1-5-6-4-family songs (see lessons-data.js CHOOSE_SONGS), pick one.
  // A song lesson: cover art-style header, the key, the chords section by
  // section, the real song (official video), and the chords falling in
  // time — the main 4-chord part, or the whole song start to finish.
  function songLessonView({ content, controls, kb, song, intro = "", onNext, nextLabel = "Next lesson →" }) {
    const structure = SONG_STRUCTURES[song.title];
    const rows = structure ? (() => {
      const out = [];
      structure.forEach((part) => {
        const name = part.section.replace(/\s+\d+$/, "");
        const last = out[out.length - 1];
        if (last && last.chords.join() === part.chords.join()) { if (!last.names.includes(name)) last.names.push(name); }
        else out.push({ names: [name], chords: part.chords });
      });
      return out.map((r) => ({ label: r.names.join(" · "), chords: r.chords.filter((c, i) => c !== r.chords[i - 1]) }));
    })() : [{ label: "Main part", chords: song.chords }];
    const video = SONG_VIDEOS[song.title];
    content.innerHTML = chatHtml(intro || `<h3>${song.title} 🎶</h3><p>By <b>${song.artist}</b>. Watch the chords fall onto the keys and play along on your piano.</p>`, "idle") + `
      <div class="hk-song-lesson">
        <div class="hk-song-lesson-head"><b>${song.title}</b><span>${song.artist}</span><span class="hk-song-key">${icon("piano", 18)} Key of ${song.key.replace(/\s*\(.*\)/, "")}</span></div>
        <div class="hk-song-prog">
          <div class="hk-song-prog-title">The chords in this song</div>
          ${rows.map((r) => `<div class="hk-song-prog-row"><span>${r.label}</span><b>${r.chords.map((c) => `<i>${c}</i>`).join("")}</b></div>`).join("")}
        </div>
        ${video ? videoHtml(video) : ""}
        ${songInspireHtml(song, { advanced: true })}
      </div>`;
    wireVideos(content);
    controls.innerHTML = `
      <button class="hk-btn" data-along="main">${icon("play", 20)} Main part (4 chords)</button>
      ${structure ? `<button class="hk-btn" data-along="whole">${icon("song", 20)} Whole song</button>` : ""}
      <button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-song-next">${nextLabel}</button>`;
    controls.querySelectorAll("[data-along]").forEach((btn) => {
      const label = btn.innerHTML;
      btn.addEventListener("click", () => {
        if (btn.dataset.running) { kb.stopPlayAlong(); return; }
        controls.querySelectorAll("[data-along]").forEach((x) => { if (x.dataset.running) { delete x.dataset.running; x.innerHTML = x.dataset.label; } });
        btn.dataset.label = label;
        btn.dataset.running = "1";
        btn.innerHTML = "■ Stop";
        const steps = btn.dataset.along === "whole" ? wholeSongChords(structure) : [...song.chords, ...song.chords, ...song.chords, ...song.chords].map((chord) => ({ chord, len: 1 }));
        kb.playAlong(steps, { barSec: barSeconds(song) || 2.2, onDone: () => { delete btn.dataset.running; btn.innerHTML = label; } });
      });
    });
    controls.querySelector("#hk-song-next").addEventListener("click", () => { kb.stopPlayAlong(); onNext(); });
  }

  function runChooseSong() {
    const { content, keyboardWrap, controls } = lessonShell("Choose your song");
    const kb = lessonKeyboard(keyboardWrap, { startMidi: 48, endMidi: 84 });
    function showList() {
      kb.stopPlayAlong();
      content.innerHTML = chatHtml(`<h3>Pick a song you love 🎶</h3>
        <p>All of these use the <b>1 · 5 · 6 · 4</b> pattern you know, some in a different key. The falling blocks show you what to press.</p>`, "idle") +
        `<div class="hk-choose-list">${CHOOSE_SONGS.map((s) => `
          <button class="hk-ph-song" data-song="${s.title}">${icon("song", 32)}
            <span class="hk-ph-song-body"><b>${s.title}</b><span>${s.artist} · ${s.chords.join(" · ")}</span></span>${icon("play", 28)}</button>`).join("")}</div>`;
      controls.innerHTML = "";
      content.querySelectorAll("[data-song]").forEach((btn) => btn.addEventListener("click", () => openSong(CHOOSE_SONGS.find((s) => s.title === btn.dataset.song))));
    }
    function openSong(song) {
      songLessonView({ content, controls, kb, song,
        onNext: () => {
          markLessonComplete("lesson-choose");
          markSongStatus(song.title, "completed");
          startNextLesson();
        } });
      controls.insertAdjacentHTML("afterbegin", `<button class="hk-btn" id="hk-song-list">← Songs</button>`);
      controls.querySelector("#hk-song-list").addEventListener("click", showList);
    }
    showList();
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
    const kb = lessonKeyboard(keyboardWrap, { startMidi: 45, endMidi: 88 });
    let step = 0;

    function renderStep() {
      if (step === 0) {
        content.innerHTML = mascotSay(`
          <h3>Your first taste of two hands</h3>
          <p>Your left hand holds the chord (low, pink). Your right hand taps one note on top (high, light blue).</p>`);
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
          <p>Two hands, two jobs, at the same time. Busier left-hand patterns and real tunes come later.</p>`);
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Next lesson →</button>`;
        controls.querySelector("#hk-done").addEventListener("click", startNextLesson);
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
    const kb = lessonKeyboard(keyboardWrap, { startMidi: 43, endMidi: 76 });
    const SAFE = [55, 57, 59, 62, 64, 67, 69, 71, 74, 76]; // G major pentatonic: safe over G-D-Em-C
    const LOOP = [[43, 47, 50], [38 + 12, 42 + 12, 45 + 12], [40 + 12, 43 + 12, 47 + 12], [36 + 12, 40 + 12, 43 + 12]]; // G D Em C, low
    let stopLoop = null;
    let markTimer = null;
    onLessonExit(() => { stopLoop?.(); clearInterval(markTimer); });
    function startLoop() {
      const events = [];
      for (let bar = 0; bar < 32; bar++) LOOP[bar % 4].forEach((midi) => events.push({ midi, start: bar * 2, dur: 1.9, hand: "left" }));
      stopLoop = kb.playTimeline(events, { lead: 0.6 });
      const mark = () => SAFE.forEach((m) => kb.getKeyElement(m)?.classList.add("hk-key-selectable"));
      mark();
      clearInterval(markTimer);
      markTimer = setInterval(() => { if (!content.isConnected) return clearInterval(markTimer); mark(); }, 300);
    }
    function step1() {
      content.innerHTML = chatHtml(`<h3 data-q="What's the jazz trick? 🎷">Loop with one hand, play anything with the other 🎷</h3>
        <p>Your <b>left hand</b> loops the 4 chords you know: <b>G · D · Em · C</b>.</p>
        <p>Your <b>right hand</b> plays any of the <b>outlined keys</b>, in any order, any rhythm. There's no wrong note!</p>`, "idle");
      controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-jazz-go">${icon("play", 20)} Start the loop</button>`;
      controls.querySelector("#hk-jazz-go").addEventListener("click", step2);
    }
    function step2() {
      content.innerHTML = chatHtml(`<h3>Now play! 🎹</h3><p>The left hand is looping (pink blocks). Tap the <b>outlined keys</b> with your right hand, any order, any rhythm. Make it up!</p>`, "play");
      controls.innerHTML = `<button class="hk-btn" id="hk-jazz-stop">■ Stop loop</button><button class="hk-btn hk-btn-primary" id="hk-jazz-next">Next →</button>`;
      startLoop();
      controls.querySelector("#hk-jazz-stop").addEventListener("click", (e) => {
        if (stopLoop && e.target.dataset.on !== "0") { kb.stopPlayAlong(); e.target.dataset.on = "0"; e.target.textContent = "▶ Loop"; }
        else { startLoop(); e.target.dataset.on = "1"; e.target.textContent = "■ Stop loop"; }
      });
      controls.querySelector("#hk-jazz-next").addEventListener("click", () => { kb.stopPlayAlong(); step3(); });
    }
    function step3() {
      content.innerHTML = chatHtml(`<h3 data-q="Do real jazz players do this? 🤔">All the time! Listen to Herbie Hancock 🎹</h3>
        <p>In <b>Cantaloupe Island</b>, Herbie Hancock's left hand repeats one short piano loop under the whole tune.</p>
        <p>Over the top, the trumpet and then Herbie's right hand <b>make it up</b> as they go. That's the jazz trick!</p>`, "sing") + videoHtml("jazz-loop");
      wireVideos(content);
      controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-jazz-done">Next →</button>`;
      controls.querySelector("#hk-jazz-done").addEventListener("click", finish);
    }
    function finish() {
      markLessonComplete("lesson-jazz-preview");
      kb.clearHighlights();
      content.innerHTML = chatHtml(`<h3>Speaking of jazz… 🎺</h3><p>Let's learn some <b>Chet Baker</b>! Next up: <b>My Funny Valentine</b>.</p>`, "cheer");
      controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Let's go! →</button>`;
      controls.querySelector("#hk-done").addEventListener("click", startNextLesson);
    }
    step1();
  }

  function runEarTraining() {
    const { content, keyboardWrap, controls } = lessonShell("Train your ear");
    const kb = lessonKeyboard(keyboardWrap, { startMidi: 55, endMidi: 79 });
    let step = 0;

    function renderStep() {
      if (step === 0) {
        content.innerHTML = mascotSay(`
          <h3>Learn songs just by listening</h3>
          <p>Every musician does this. Hum a tune slowly, then find its notes on your piano by trial and error.</p>
          <p class="hk-honest-note">We use "Ode to Joy" (Beethoven) here because it's easy to hear.</p>`);
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
          ${mascotSay(`<p>Listen, then tap keys until you find the same note.${i > 0 ? " Tip: it's often the same note as last time, or a key right next to it." : ""}</p>`)}
          <p id="hk-ear-feedback" class="hk-quiz-feedback"></p>`;
        controls.innerHTML = `
          <button class="hk-btn" id="hk-ear-replay">&#9658; Hear it again</button>
          <button class="hk-btn" id="hk-ear-show">Show me</button>
          <button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Skip</button>`;
        const feedback = content.querySelector("#hk-ear-feedback");
        const found = (how) => {
          kb.highlightChord([midi], { letter: noteLetter(midi), rootMidi: midi });
          feedback.textContent = how === "found" ? `Yes, that's ${noteLetter(midi)}!` : `It was ${noteLetter(midi)}.`;
          feedback.className = `hk-quiz-feedback ${how === "found" ? "hk-quiz-feedback-correct" : ""}`;
          const next = controls.querySelector("#hk-next");
          if (next) next.textContent = "Next note";
          kb.onKeyPress(() => {});
        };
        kb.onKeyPress((pressed) => {
          if (pressed === midi) found("found");
          else feedback.textContent = pressed < midi ? "Higher! Try further right." : "Lower! Try further left.";
        });
        controls.querySelector("#hk-ear-replay").addEventListener("click", () => playTone(midi, { duration: 0.5 }));
        controls.querySelector("#hk-ear-show").addEventListener("click", () => found("shown"));
        controls.querySelector("#hk-next").addEventListener("click", () => { kb.onKeyPress(() => {}); step++; renderStep(); });
      } else {
        markLessonComplete("lesson-eartraining");
        kb.clearHighlights();
        content.innerHTML = mascotSay(`<h3>That's ear training.</h3>
          <p>You found a whole tune just by listening. Try it on a song you love next. It gets easier every time!</p>`);
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Next lesson →</button>`;
        controls.querySelector("#hk-done").addEventListener("click", startNextLesson);
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
    const kb = lessonKeyboard(keyboardWrap, { startMidi: 48, endMidi: 84 });
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
            ? `<h3>Almost Blue: a jazz ballad</h3>
               <p>Elvis Costello wrote it, and Chet Baker's version made it a jazz standard. Here are its first two chords.</p>
               <p><strong>Press and hold ${symbol}.</strong></p>`
            : `<p><strong>Press and hold ${symbol}.</strong></p>`, "assets/mascot-poses/trombone.png")}`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Next chord</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { idx++; renderStep(); });
      } else {
        markLessonComplete("lesson-almostblue");
        kb.clearHighlights();
        content.innerHTML = mascotSay(`<h3>A taste of jazz ballad chords</h3>
          <p>Just 2 chords of a much richer tune. The Jazz comping lesson later on goes much deeper.</p>`, "assets/mascot-poses/trombone.png");
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Next lesson →</button>`;
        controls.querySelector("#hk-done").addEventListener("click", startNextLesson);
      }
    }
    renderStep = withStepBack(renderStep, { controls, kb, getState: () => ({ idx }), setState: (s) => ({ idx } = s) });
    renderStep();
  }

  // ----- Lesson 15: My Funny Valentine (the "minor line cliché") ----------
  // A simple version of the whole song, based on Chet Baker's 1954
  // recording (32 bars, A A B A, in C minor). Jazz players change the
  // chords a little every time; these are the common, simple ones.
  const MFV_SIMPLE = [
    { section: "A", chords: ["Cm", "CmMaj7", "Cm7", "Cm6", "Ab", "Fm", "Dm7b5", "G7"], bars: 8 },
    { section: "A", chords: ["Cm", "CmMaj7", "Cm7", "Cm6", "Ab", "Fm", "Dm7b5", "G7"], bars: 8 },
    { section: "B (the bridge)", chords: ["Eb", "Bb7", "Eb", "Bb7", "Eb", "G7", "Ab", "G7"], bars: 8 },
    { section: "A (the ending)", chords: ["Cm", "CmMaj7", "Cm7", "Cm6", "Ab", "Dm7b5", "G7", "Cm"], bars: 8 },
  ];
  function runMyFunnyValentinePreview() {
    const song = SONGS.find((s) => s.title === "My Funny Valentine");
    const { content, keyboardWrap, controls } = lessonShell("My Funny Valentine");
    const kb = lessonKeyboard(keyboardWrap, { startMidi: 48, endMidi: 84 });
    let idx = 0;
    const LINE = ["Cm", "CmMaj7", "Cm7", "Cm6"];
    function intro() {
      content.innerHTML = chatHtml(`<h3 data-q="Who is Chet Baker? 🎺">A jazz legend 🎺</h3>
        <p><b>Chet Baker</b> played trumpet and sang, softly and beautifully. His <b>My Funny Valentine</b> is one of the most famous jazz recordings ever.</p>
        <p>The song is from <b>1937</b>, by Rodgers and Hart. It's in <b>C minor</b>, so it sounds a little sad and dreamy.</p>
        <h3 data-q="What's special about it?">One note slides down 👀</h3>
        <p>The first 4 chords keep the same shape while the <b>top note</b> slides down one key at a time: <b>C → B → B♭ → A</b>.</p>`, "sing") + videoHtml("my-funny-valentine");
      wireVideos(content);
      controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-mfv-go">Play the famous part →</button>`;
      controls.querySelector("#hk-mfv-go").addEventListener("click", () => { idx = 0; line(); });
    }
    function line() {
      const symbol = LINE[idx];
      const notes = symbol === "Cm" ? [...chordSymbolToMidi(symbol), 72] : chordSymbolToMidi(symbol);
      kb.highlightChord(notes, { letter: symbol, rootMidi: notes[0] });
      playChord(notes, { delay: 0.1, duration: 1.6 });
      const top = ({ 72: "C", 71: "B", 70: "B♭", 69: "A" })[notes[notes.length - 1]];
      content.innerHTML = chatHtml(`<h3>Chord ${idx + 1} of 4: ${symbol}</h3><p>Press and hold it. The top key is <b>${top}</b>.</p>`, "play");
      controls.innerHTML = `<button class="hk-btn" id="hk-mfv-hear">${icon("speaker", 20)} Hear it</button><button class="hk-btn hk-btn-primary" id="hk-mfv-next">${idx < 3 ? "Next chord →" : "Now the whole song →"}</button>`;
      controls.querySelector("#hk-mfv-hear").addEventListener("click", () => playChord(notes, { duration: 1.6 }));
      controls.querySelector("#hk-mfv-next").addEventListener("click", () => { if (idx < 3) { idx++; line(); } else whole(); });
    }
    function whole() {
      kb.clearHighlights();
      const asSong = { ...song, title: "My Funny Valentine", artist: "Chet Baker (Rodgers & Hart, 1937)", chords: LINE };
      SONG_STRUCTURES["My Funny Valentine"] = SONG_STRUCTURES["My Funny Valentine"] || MFV_SIMPLE;
      songLessonView({ content, controls, kb, song: asSong,
        intro: `<h3>The whole song, simplified 🎺</h3><p>It goes <b>A · A · B · A</b>: the same 8 chords twice, a brighter middle part (the <b>bridge</b>), then the start again, a bit longer, to finish.</p><p>Tap <b>Whole song</b> and follow the blocks from start to finish.</p>`,
        onNext: () => {
          markLessonComplete("lesson-myfunnyvalentine");
          markSongStatus("My Funny Valentine", "completed");
          startNextLesson();
        } });
    }
    intro();
  }

  function runBeethovenShowcase() {
    const { content, keyboardWrap, controls } = lessonShell("Für Elise");
    const kb = lessonKeyboard(keyboardWrap, { startMidi: 40, endMidi: 79 });
    let step = 0;

    function renderStep() {
      if (step === 0) {
        content.innerHTML = mascotSay(`
          <h3>A famous piece by a legend</h3>
          <p>Beethoven's "Für Elise" (1810) starts with nine of the most famous notes in piano music. Here's a quick taste.</p>`, "assets/mascot-poses/composer.png");
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
          ${mascotSay(`<p>Right hand (light blue) plays the tune. Left hand (pink) holds a low A and E, for that A-minor feel.</p>`)}`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Next</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step++; renderStep(); });
      } else {
        markLessonComplete("lesson-beethoven");
        kb.clearHighlights();
        content.innerHTML = mascotSay(`<h3>The most famous nine notes in piano music!</h3>
          <p>The full piece gets harder from here. This was just a taste.</p>`, "assets/mascot-poses/composer.png");
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Next lesson →</button>`;
        controls.querySelector("#hk-done").addEventListener("click", startNextLesson);
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
    const { content, keyboardWrap, controls } = lessonShell("Vivaldi's Spring");
    const kb = lessonKeyboard(keyboardWrap, { startMidi: 55, endMidi: 79 });
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
            ? `<h3>A taste of Vivaldi's Spring</h3>
               <p>Spring starts with the whole orchestra playing a bright, bouncy tune in E major. Here you'll tap its home chord, E major.</p>
               <p><strong>Press the E chord.</strong></p>`
            : `<p><strong>Press the E chord again.</strong></p>`, "assets/mascot-poses/music-stand.png")}`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Next hit</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { hits++; renderStep(); });
      } else {
        markLessonComplete("lesson-vivaldi");
        kb.clearHighlights();
        content.innerHTML = mascotSay(`<h3>Nice! That's Spring's home chord.</h3>
          <p>Listen for that bright E major chord next time you hear Spring!</p>`, "assets/mascot-poses/music-stand.png");
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Next lesson →</button>`;
        controls.querySelector("#hk-done").addEventListener("click", startNextLesson);
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
      <h3>Nocturne Op. 9 No. 2 by Frédéric Chopin (1832)</h3>
      <p>One of Chopin's most famous pieces, in ${entry ? entry.key : "Eb major"}. A flowing tune sings over a rolling left hand. The main tune comes back four times, fancier each time.</p>
      <p class="hk-honest-note">We don't teach the notes for this one yet. Find a recording and have a listen!</p>`, "assets/mascot-poses/mozart-scores.png");
    controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Next lesson →</button>`;
    controls.querySelector("#hk-done").addEventListener("click", () => {
      markLessonComplete("lesson-chopin");
      startNextLesson();
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
    const kb = lessonKeyboard(keyboardWrap, { startMidi: 41, endMidi: 79 });
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
      C: "Its root is <strong>Middle C</strong>, the key you found in Get Started.",
      D: "Its root is the <strong>2nd white key from Middle C</strong>: C, D. (D sits between the 2 black keys.)",
      Em: "Its root is the <strong>3rd white key from Middle C</strong>: C, D, E. (E is just right of the 2 black keys.)",
      G: "Its root is the <strong>5th white key from Middle C</strong>: C, D, E, F, G. (G sits inside the group of 3 black keys.)",
    };

    // Optional, non-blocking reference link (item 38) — never inserted
    // into the required flow, just a small escape hatch for anyone
    // curious about the full keyboard/more chords than these 4.
    const REFERENCE_LINK = `<p class="hk-ref-link"><a href="reference.html" target="_blank" rel="noopener">
      Curious about all the keys and chords? Tap here. You don't need it yet.</a></p>`;

    // Item 42: a small, easy-to-ignore hint about the laptop-keyboard
    // shortcut — tap works everywhere already, this is just a bonus for
    // anyone without a real piano/keyboard handy and not touching a
    // touchscreen either.
    // Item 56: matches computer-keys.js's piano-shaped two-hand layout.
    const KEYBOARD_HINT = `<p class="hk-keyboard-hint">No piano? Tap the keys above, or use
      <strong>T Y U I O P [ ] \\</strong> on a laptop (white keys, Middle C up to D). The black keys are on the
      number row. The MIDI tab has the full chart.</p>`;

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
          <h3>4 chords, over 100 songs!</h3>
          <p>From <strong>"${HOOK_SONG_1.title}"</strong> by ${HOOK_SONG_1.artist} to
             <strong>"${HOOK_SONG_2.title}"</strong> by ${HOOK_SONG_2.artist}, it's the same 4-chord pattern.</p>
          <p>We'll learn it with <strong>numbers</strong> (1-5-6-4), because the numbers stay the same in every song.
             Here it is starting from G:</p>
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
          <h3>Two words: "key" and "numbers"</h3>
          <p>Every song has a <strong>home note</strong>, like home base in a game. Here G is home, so we say
             the song is <strong>"in the key of G."</strong></p>
          <p class="hk-honest-note">This "key" isn't the piano key you press. Same word, two meanings!</p>
          <p>The <strong>numbers</strong> (1-5-6-4) work from any home note. From G it's G-D-Em-C. From C it's
             C-G-Am-F. The letters change, but the numbers stay the same.</p>`,
          "assets/mascot-poses/maestro-conducting.png");
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Got it</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => goForward({ step: "slowdown" }));
      } else if (step === "slowdown") {
        content.innerHTML = mascotSay(`
          <h3>What's a chord?</h3>
          <p>A <strong>chord</strong> is a few keys pressed together, so they ring out as one sound.
             But first, where do your fingers go?</p>`);
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
          <h3>Your thumb is finger 1</h3>
          <p>Rest your <strong>right thumb on Middle C</strong>. Your other fingers land on the next white keys:
             <strong>C(1) D(2) E(3) F(4) G(5)</strong>.</p>
          <p>Your <strong>left hand mirrors it</strong>, going down: <strong>C(1) B(2) A(3) G(4) F(5)</strong>.
             Your left thumb rests on the C just below middle C.</p>
          <p class="hk-honest-note">This is just a comfy resting spot. We'll learn more fingering later.</p>`);
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Find our first chord</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => goForward({ step: "find-g" }));
      } else if (step === "find-g") {
        const gChord = LESSON1_CHORDS.G;
        kb.highlightChord([gChord.root], { letter: "G", rootMidi: gChord.root });
        playTone(gChord.root, { duration: 0.6 });
        content.innerHTML = mascotSay(`
          <h3>First, find G</h3>
          <p>Start on <strong>Middle C</strong> and count 5 white keys to the right: <strong>C, D, E, F, G</strong>.
             G is lit up below. Always count from Middle C, not from the edge.</p>
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
            <p>This is the <strong>${chord.letter} chord</strong>, named after its <strong>root</strong>, the
               note it's built on. Its ${chord.notes.length} keys are <strong>${noteNames.join(", ")}</strong>.
               All ${chord.notes.length} together make ${chord.letter}. ${teachIdx === 0 ? `"G" is one key. "The G chord" is these three keys together.` : ""}</p>
            <p>${CHORD_ANCHOR[key]}</p>
            ${/m$/.test(chord.letter) ? `<p class="hk-honest-note">The small <strong>"m"</strong> means
               <strong>minor</strong>: ${chord.letter} is "${chord.letter.replace(/m$/, "")} minor". Minor chords sound softer and sadder.</p>` : ""}
            ${noteNames.some((n) => n.includes("#")) ? `<p class="hk-honest-note"><strong>Your first black key!</strong>
               The black key just right of F is <strong>F#</strong> ("F sharp"). It's also called G♭ ("G flat"),
               because it's just left of G. Moving one key over is a <strong>half-step</strong>.</p>` : ""}
            ${teachIdx === 0 ? `<p class="hk-honest-note">The big <strong>1</strong> isn't the 5 keys we counted
               to find G. It means G is home base in this song.</p>` : ""}
            <p><strong>Press all ${chord.notes.length} lit-up keys.</strong> Then tap Next.</p>
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
          ${mascotSay(`<h3>The 4 most useful chords</h3>
            <p>There are lots more chords, but these 4 already unlock loads of songs.</p>`)}
          ${REFERENCE_LINK}`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Quiz me</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => goForward({ step: "quiz" }));
      } else if (step === "quiz") {
        content.innerHTML = `
          ${mascotSay(`<p>Now play all four in order: <strong>1 (G) &rarr; 5 (D) &rarr; 6 (Em) &rarr; 4 (C)</strong>.
             Press the bottom note of each chord, one at a time.</p>`)}
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
          <p>"<strong>${FEATURED_SONG.title}</strong>" by ${FEATURED_SONG.artist} uses the same 4 chords in a
             different order. No new shapes to learn!</p>`);
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Play along</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => goForward({ songIdx: 0, step: "song" }));
      } else if (step === "song") {
        // The song's chart has colour chords (Em7, D/F#); play each as the
        // plain shape this lesson teaches (Em, D). Looking them up as-is
        // returned nothing and crashed this step.
        const key = FEATURED_SONG.chords[songIdx];
        const chord = LESSON1_CHORDS[key] || LESSON1_CHORDS[key.replace(/\/.*$/, "").replace(/(maj7|7|sus\d|add\d|6)$/, "")] || LESSON1_CHORDS.G;
        kb.highlightChord(chord.notes, { number: chord.number, letter: chord.letter, rootMidi: chord.root });
        content.innerHTML = `
          <p class="hk-step-indicator">${FEATURED_SONG.title}: chord ${songIdx + 1} of ${FEATURED_SONG.chords.length}</p>
          <div class="hk-big-degree">${chord.number}<span class="hk-big-letter">${chord.letter}</span></div>
          ${mascotSay(`<p>Press and hold <strong>${chord.letter}</strong>.</p>`)}`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Next chord</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => {
          if (songIdx < FEATURED_SONG.chords.length - 1) goForward({ songIdx: songIdx + 1 });
          else goForward({ step: "montage-intro" });
        });
        playChord(chord.notes, { delay: 0.1 });
      } else if (step === "montage-intro") {
        kb.clearHighlights();
        content.innerHTML = mascotSay(`
          <h3>Remember "${HOOK_SONG_1.title}" and "${HOOK_SONG_2.title}"? Here are more!</h3>
          <p>Same 4 chords. Most use this exact order, some mix it up. Tap through ${montageSongsAfterTeaser.length} more
             songs from the library.</p>
          <p class="hk-honest-note">You'll see it written as <strong>I - V - vi - IV</strong>. These are Roman numerals
             for 1, 5, 6, 4. <strong>CAPITALS</strong> are major, <strong>lowercase</strong> is minor, so the 6 (Em) is small.</p>`);
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Go</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => goForward({ montageIdx: 0, step: "montage" }));
      } else if (step === "montage") {
        const s = montageSongsAfterTeaser[montageIdx];
        content.innerHTML = `
          <p class="hk-step-indicator">Song ${montageIdx + 1} of ${montageSongsAfterTeaser.length}</p>
          ${mascotSay(`<h3>${s.title}</h3><p>${s.artist}: same 4 chords (${s.degreeSequence})${s.key ? `, in ${s.key}` : ""}: <strong>${s.chords.join(" - ")}</strong>.</p>`)}`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Next song</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => {
          if (montageIdx < montageSongsAfterTeaser.length - 1) goForward({ montageIdx: montageIdx + 1 });
          else goForward({ step: "social" });
        });
      } else if (step === "social") {
        content.innerHTML = mascotSay(`
          <h3>Coming soon: play with a friend</h3>
          <p>You know 4 chords! Next: why some chords sound happy (major) and some sad (minor). Then you'll
             play full songs while a friend sings. That's the most fun part!</p>`);
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
              : `<h3>Lesson complete!</h3><p>Nice work going through this lesson again.</p>`,
              earned ? "assets/mascot-poses/maestro-conducting.png" : "assets/mascot-face.png")}
            <p>Out of ${SONGS.length} songs in the library, <strong>${ONE_FIVE_SIX_FOUR_SONGS.length}</strong> use these
               4 chords (${exact.length} in this exact order, ${variant.length} in a different order). Later lessons
               cover the rest.</p>
          </div>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Next lesson →</button>`;
        controls.querySelector("#hk-done").addEventListener("click", startNextLesson);
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
    const kb = lessonKeyboard(keyboardWrap, { startMidi: 60, endMidi: 84 });
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
             like it wants to move on (it's called "diminished").</p>
          <p>Learn this number pattern once, and it works in every key.</p>`);
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Try it</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => {
          step = 8;
          renderStep();
        });
      } else if (step === 8) {
        content.innerHTML = `
          <p>Tap every key (1-7) that is a <strong>minor</strong> chord in a major key.</p>
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
            ? "Correct! 2, 3 and 6 are the minor chords in any major key."
            : "Not quite. The minor chords are 2, 3 and 6. Try again!";
          if (correct) {
            step = 9;
            setTimeout(renderStep, 1200);
          }
        });
      } else {
        markLessonComplete("lesson-2");
        kb.clearHighlights();
        kb.keyElements.forEach((el) => el.classList.remove("hk-key-selectable"));
        kb.onKeyPress(() => {});
        content.innerHTML = `<h3>Lesson complete!</h3><p>Now you know why some chords sound minor. It's not random, it's a pattern.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Next lesson →</button>`;
        controls.querySelector("#hk-done").addEventListener("click", startNextLesson);
      }
    }
    renderStep = withStepBack(renderStep, { controls, kb, getState: () => ({ step }), setState: (s) => ({ step } = s) });
    renderStep();
  }

  // ----- Lesson 3: staff notation (optional "go deeper" track) --------
  function runLesson3() {
    const { content, keyboardWrap, controls } = lessonShell("Go deeper: reading real notation");
    const kb = lessonKeyboard(keyboardWrap, { startMidi: 55, endMidi: 79 });
    let step = 0;

    function renderStep() {
      if (step === 0) {
        content.innerHTML = `
          ${mascotSay(`<h3>Reading sheet music</h3>
          <p>Sheet music uses 5 lines called a <strong>staff</strong>. Each spot on it is a different note.
             You don't need this to play here, but it's good to know.</p>
          <p>Here's "Ode to Joy" by Beethoven, one note at a time:</p>`, "assets/mascot-poses/music-stand.png")}
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
          <h3>You read your first tune from sheet music!</h3>
          <p>More sheet-music lessons are coming soon.</p>`);
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Next lesson →</button>`;
        controls.querySelector("#hk-done").addEventListener("click", startNextLesson);
      }
    }
    renderStep = withStepBack(renderStep, { controls, kb, getState: () => ({ step }), setState: (s) => ({ step } = s) });
    renderStep();
  }

  // ----- Lesson 4: flip the order, 1-6-4-5 -----------------------------
  function runLesson4() {
    const { content, keyboardWrap, controls } = lessonShell("Flip the order: 1-6-4-5");
    const kb = lessonKeyboard(keyboardWrap, { startMidi: 55, endMidi: 79 });
    let step = 0; // 0..3 teach, 4 quiz, 5 payoff

    function renderStep() {
      if (step < 4) {
        const key = LESSON4_SEQUENCE[step];
        const chord = LESSON1_CHORDS[key];
        kb.highlightChord(chord.notes, { number: chord.number, letter: chord.letter, rootMidi: chord.root });
        content.innerHTML = `
          <p class="hk-step-indicator">Chord ${step + 1} of 4</p>
          <div class="hk-big-degree">${chord.number}<span class="hk-big-letter">${chord.letter}</span></div>
          ${mascotSay(`<p>A shape you already know: <strong>${chord.letter} ${chord.quality}</strong>. This time the order is
             1, 6, 4, 5.</p>`)}`;
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
          <h3>Same 4 chords, new songs</h3>
          <p><strong>${variant.length}</strong> songs in the library use this order (I-vi-IV-V) or the close I-vi-V-IV${variant.length ? `, like ${variant.slice(0, 4).map((s) => `<i>${s.title}</i>`).join(", ")}` : ""}.</p>`);
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Next lesson →</button>`;
        controls.querySelector("#hk-done").addEventListener("click", startNextLesson);
      }
    }
    renderStep = withStepBack(renderStep, { controls, kb, getState: () => ({ step }), setState: (s) => ({ step } = s) });
    renderStep();
  }

  // ----- Lesson 5: the 2 chord ------------------------------------------
  function runLesson5() {
    const { content, keyboardWrap, controls } = lessonShell("A fifth chord: meet the 2");
    const kb = lessonKeyboard(keyboardWrap, { startMidi: 55, endMidi: 79 });
    let step = 0; // 0 teach, 1 quiz (press it), 2 payoff

    function renderStep() {
      if (step === 0) {
        kb.highlightChord(LESSON5_CHORD.notes, { number: LESSON5_CHORD.number, letter: LESSON5_CHORD.letter, rootMidi: LESSON5_CHORD.root });
        content.innerHTML = `
          <p class="hk-step-indicator">A new shape</p>
          <div class="hk-big-degree">2<span class="hk-big-letter">Am</span></div>
          ${mascotSay(`<p>Meet the 2 chord. In G major, it's <strong>A minor</strong>. Remember, the 2 is always minor in a
             major key.</p>`)}`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Try it</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step = 1; renderStep(); });
        playChord(LESSON5_CHORD.notes, { delay: 0.1 });
      } else if (step === 1) {
        content.innerHTML = mascotSay(`<p>Press the <strong>2 chord (Am)</strong> root key.</p><p id="hk-quiz-progress"></p>`);
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
          <h3>One more shape, more songs!</h3>
          <p><strong>${usesIi.length}</strong> songs in the library use the 2 (ii) chord${usesIi.length ? `, like ${usesIi.slice(0, 4).map((s) => `<i>${s.title}</i>`).join(", ")}` : ""}.</p>`);
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Next lesson →</button>`;
        controls.querySelector("#hk-done").addEventListener("click", startNextLesson);
      }
    }
    renderStep = withStepBack(renderStep, { controls, kb, getState: () => ({ step }), setState: (s) => ({ step } = s) });
    renderStep();
  }

  // ----- Lesson 6: minor keys have a pattern too -------------------------
  function runLesson6() {
    const { content, keyboardWrap, controls } = lessonShell("Minor keys have a pattern too");
    const kb = lessonKeyboard(keyboardWrap, { startMidi: 50, endMidi: 79 });
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
          <h3>Minor keys have a pattern too</h3>
          <p>In <strong>any</strong> natural minor key: <strong>1, 4, 5</strong> are minor.
             <strong>3, 6, 7</strong> are major. <strong>2</strong> is diminished. This is why minor-key songs sound
             the way they do.</p>`);
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Try it</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step = 8; renderStep(); });
      } else if (step === 8) {
        content.innerHTML = mascotSay(`<p>Tap every key (1-7) that is <strong>minor</strong> in a natural minor key.</p><p id="hk-quiz-status"></p>`);
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-check">Check my answer</button>`;
        kb.clearHighlights();
        const selected = new Set();
        // Outline the 7 keys you can pick, like Lesson 2's quiz.
        LESSON6_DEGREES.forEach((d) => kb.getKeyElement(d.notes[0])?.classList.add("hk-key-selectable"));
        kb.onKeyPress((midi) => {
          const d = LESSON6_DEGREES.find((x) => x.notes[0] === midi);
          if (!d) return;
          if (selected.has(d.degree)) { selected.delete(d.degree); kb.getKeyElement(midi).classList.remove("hk-key-highlight"); }
          else { selected.add(d.degree); kb.getKeyElement(midi).classList.add("hk-key-highlight"); }
        });
        controls.querySelector("#hk-check").addEventListener("click", () => {
          const correct = selected.size === MINOR_KEY_MINOR_DEGREES.length && MINOR_KEY_MINOR_DEGREES.every((d) => selected.has(d));
          content.querySelector("#hk-quiz-status").innerHTML = correct
            ? "Correct! 1, 4 and 5 are minor in any natural minor key."
            : "Not quite. The minor chords are 1, 4 and 5. Try again!";
          if (correct) { step = 9; setTimeout(renderStep, 1200); }
        });
      } else {
        markLessonComplete("lesson-6");
        kb.clearHighlights();
        kb.keyElements.forEach((el) => el.classList.remove("hk-key-selectable"));
        kb.onKeyPress(() => {});
        const minorKeySongs = SONGS.filter((s) => s.confidence === "confirmed" && /minor/i.test(s.key));
        content.innerHTML = mascotSay(`
          <h3>Lots of songs in the library are in minor keys.</h3>
          <p><strong>${minorKeySongs.length}</strong> of them, like ${minorKeySongs.slice(0, 4).map((s) => `<i>${s.title}</i>`).join(", ")}.</p>
          <p class="hk-honest-note">Some songs borrow chords from outside the key, but this pattern explains most of what you hear.</p>`);
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Next lesson →</button>`;
        controls.querySelector("#hk-done").addEventListener("click", startNextLesson);
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
          <h3>How you press matters</h3>
          <p>So far you've learned <strong>which</strong> keys to press. Now let's learn <strong>how</strong>.
             The same chord played two ways can feel totally different.</p>`);
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Let's go</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => goForward("velocity"));
      } else if (step === "velocity") {
        content.innerHTML = mascotSay(`
          <h3>1. Velocity: how hard you press</h3>
          <p>Press harder and it's <strong>louder</strong>. Press softer and it's <strong>gentler</strong>.
             Pianists play quietly in a soft verse, then harder in a big chorus.</p>`);
        controls.innerHTML = `<button class="hk-btn" id="hk-hear-soft">${icon("soft", 20)} Hear soft</button><button class="hk-btn" id="hk-hear-strong">${icon("speaker", 20)} Hear strong</button><button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Next</button>`;
        controls.querySelector("#hk-hear-soft").addEventListener("click", () => playChord([55, 59, 62], { duration: 1.2, velocity: 35 }));
        controls.querySelector("#hk-hear-strong").addEventListener("click", () => playChord([55, 59, 62], { duration: 1.2, velocity: 120 }));
        controls.querySelector("#hk-next").addEventListener("click", () => goForward("rubato"));
      } else if (step === "rubato") {
        content.innerHTML = mascotSay(`
          <h3>2. Rubato: bending the timing</h3>
          <p><strong>Rubato</strong> is Italian for "robbed time". It means slowing down a little, or letting a
             note linger, at a special moment. Slow songs use it a lot, so the music breathes.</p>`);
        controls.innerHTML = `<button class="hk-btn" id="hk-hear-steady">${icon("speaker", 20)} Steady</button><button class="hk-btn" id="hk-hear-rubato">${icon("speaker", 20)} With rubato</button><button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Next</button>`;
        const line = [67, 69, 71, 72, 74, 72, 71, 67];
        controls.querySelector("#hk-hear-steady").addEventListener("click", () => line.forEach((m, i) => playTone(m, { duration: 0.45, delay: i * 0.4 })));
        // Rubato: the same line, slowing down into the top note and lingering there.
        const gaps = [0.4, 0.4, 0.45, 0.55, 0.9, 0.45, 0.4, 0.4];
        controls.querySelector("#hk-hear-rubato").addEventListener("click", () => { let t = 0; line.forEach((m, i) => { playTone(m, { duration: gaps[i] + 0.05, delay: t }); t += gaps[i]; }); });
        controls.querySelector("#hk-next").addEventListener("click", () => goForward("legato"));
      } else if (step === "legato") {
        content.innerHTML = mascotSay(`
          <h3>3. Legato: connecting the notes</h3>
          <p><strong>Legato</strong> means joining notes smoothly. The opposite, short and bouncy, is called
             "staccato". Legato makes slow songs flow instead of sounding choppy.</p>
          <p class="hk-honest-note">Bonus tip: play the first beat of the pattern a little harder, like a
             drummer does on beat 1.</p>`);
        controls.innerHTML = `<button class="hk-btn" id="hk-hear-legato">${icon("speaker", 20)} Legato</button><button class="hk-btn" id="hk-hear-staccato">${icon("speaker", 20)} Staccato</button><button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">See it in a real song</button>`;
        const scale = [60, 62, 64, 65, 67];
        controls.querySelector("#hk-hear-legato").addEventListener("click", () => scale.forEach((m, i) => playTone(m, { duration: 0.6, delay: i * 0.45 })));
        controls.querySelector("#hk-hear-staccato").addEventListener("click", () => scale.forEach((m, i) => playTone(m, { duration: 0.12, delay: i * 0.45 })));
        controls.querySelector("#hk-next").addEventListener("click", () => goForward("example"));
      } else if (step === "example") {
        content.innerHTML = mascotSay(`
          <h3>Example: "${touchSong ? touchSong.title : "Make You Feel My Love"}" by ${touchSong ? touchSong.artist : "Adele"}</h3>
          <p>This slow ballad starts soft and builds to a big, emotional peak.</p>
          <p>Play it <strong>legato</strong>, joining each chord smoothly, with a little <strong>rubato</strong>
             at the most emotional moments.</p>`,
          "assets/mascot-poses/dreaming-notes.png");
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Got it</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => goForward("done"));
      } else {
        markLessonComplete("lesson-touch");
        content.innerHTML = mascotSay(`
          <h3>Lesson complete.</h3>
          <p>Try a chord you know two ways: soft and smooth, then firm and quick. Hear how different it feels!</p>`);
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Next lesson →</button>`;
        controls.querySelector("#hk-done").addEventListener("click", startNextLesson);
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

  // ----- Chord Ear Gym: the final section -----------------------------------
  // Train your ear to name chords. Three rounds: happy or sad (major or
  // minor), then all 24 chords one by one with 4 choices, then the same
  // chords anywhere on the piano (low, high, notes in a different order),
  // the way they turn up in real songs. A wrong answer plays both chords
  // so you can hear the difference.
  function runEarGym() {
    const { content, keyboardWrap, controls } = lessonShell("Chord Ear Gym");
    const kb = lessonKeyboard(keyboardWrap, { startMidi: 36, endMidi: 84 });
    const ROOTS = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];
    const ALL = [...ROOTS, ...ROOTS.map((r) => r + "m")];
    const nice = (sym) => sym.replace("#", "♯").replace(/^([A-G])b/, "$1♭");
    const shuffle = (a) => a.map((v) => [Math.random(), v]).sort((x, y) => x[0] - y[0]).map((x) => x[1]);
    const STAGES = [
      { id: "mood", title: "Round 1: Happy or sad?", intro: "I'll play a chord. Is it <b>happy</b> (major) or <b>sad</b> (minor)? Listen to the feeling, not the notes.", chords: shuffle(ALL).slice(0, 8) },
      { id: "name", title: "Round 2: Which chord?", intro: "Now all <b>24 chords</b>, one by one. Listen, then pick the right one of 4. Tip: first decide happy or sad, then the letter.", chords: shuffle(ALL) },
      { id: "anywhere", title: "Round 3: Anywhere on the piano", intro: "Real songs play chords <b>low, high</b> and with the notes in a <b>different order</b>. Same chord, same name! Can you still tell?", chords: shuffle(ALL).slice(0, 12) },
    ];
    let stage = 0, round = 0, streak = 0, best = 0;
    const scores = STAGES.map(() => 0);
    let current = null;

    function voicing(sym, anywhere) {
      let notes = chordSymbolToMidi(sym);
      if (!anywhere) return notes;
      const shift = [-24, -12, 0, 12][Math.floor(Math.random() * 4)];
      notes = notes.map((m) => m + shift);
      const inversions = Math.floor(Math.random() * 3);
      for (let i = 0; i < inversions; i++) notes = [...notes.slice(1), notes[0] + 12];
      while (Math.max(...notes) > 84) notes = notes.map((m) => m - 12);
      while (Math.min(...notes) < 36) notes = notes.map((m) => m + 12);
      return notes;
    }
    function options(sym) {
      const minor = sym.endsWith("m");
      const root = minor ? sym.slice(0, -1) : sym;
      const twin = minor ? root : root + "m";
      const others = shuffle(ALL.filter((c) => c !== sym && c !== twin)).slice(0, 2);
      return shuffle([sym, twin, ...others]);
    }
    const hear = (notes) => playChord(notes, { duration: 1.6 });
    // Round 3 plays inversions, so the lowest note isn't always the root:
    // put the chord's name on the key that really is its root.
    const rootOf = ({ sym, notes }) => {
      const pc = ((chordSymbolToMidi(sym)[0] % 12) + 12) % 12;
      return notes.find((m) => ((m % 12) + 12) % 12 === pc) ?? notes[0];
    };

    function startStage() {
      round = 0;
      const st = STAGES[stage];
      kb.clearHighlights();
      content.innerHTML = chatHtml(`<h3>${st.title}</h3><p>${st.intro}</p><p>${st.chords.length} chords. Ready?</p>`, stage === 0 ? "think" : "idle");
      controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-gym-go">${icon("play", 20)} Start</button>`;
      controls.querySelector("#hk-gym-go").addEventListener("click", ask);
    }
    function ask() {
      const st = STAGES[stage];
      const sym = st.chords[round];
      current = { sym, notes: voicing(sym, st.id === "anywhere") };
      kb.clearHighlights();
      const choices = st.id === "mood" ? [["major", "Happy (major)"], ["minor", "Sad (minor)"]] : options(sym).map((c) => [c, nice(c)]);
      content.innerHTML = `
        <div class="hk-gym-head"><b>${st.title}</b><span>${round + 1} / ${st.chords.length}</span><span class="hk-gym-streak">${icon("flame", 18)} ${streak}</span></div>
        <div class="hk-gym-panda">${pandaSvg("idle", { item: "headphones" })}</div>
        <p class="hk-gym-ask">${st.id === "mood" ? "Happy or sad?" : "Which chord is this?"}</p>
        <div class="hk-gym-choices">${choices.map(([v, label]) => `<button class="hk-gym-choice" data-v="${v}">${label}</button>`).join("")}</div>
        <div id="hk-gym-reply"></div>`;
      controls.innerHTML = `<button class="hk-btn" id="hk-gym-again">${icon("speaker", 20)} Play it again</button>`;
      controls.querySelector("#hk-gym-again").addEventListener("click", () => hear(current.notes));
      content.querySelectorAll(".hk-gym-choice").forEach((b) => b.addEventListener("click", () => answer(b)));
      setTimeout(() => hear(current.notes), 250);
    }
    function answer(btn) {
      const st = STAGES[stage];
      const right = st.id === "mood" ? (current.sym.endsWith("m") ? "minor" : "major") : current.sym;
      content.querySelectorAll(".hk-gym-choice").forEach((b) => {
        b.disabled = true;
        if (b.dataset.v === right) b.classList.add("hk-gym-right");
      });
      kb.highlightChord(current.notes, { letter: nice(current.sym), rootMidi: rootOf(current) });
      const reply = content.querySelector("#hk-gym-reply");
      const last = round + 1 >= st.chords.length;
      if (btn.dataset.v === right) {
        scores[stage]++;
        streak++;
        best = Math.max(best, streak);
        content.querySelector(".hk-gym-panda").innerHTML = pandaSvg(nextTrick("yay"));
        reply.innerHTML = `<p class="hk-gym-yes">Yes! <b>${nice(current.sym)}</b>${streak >= 3 ? ` · ${icon("flame", 18)} ${streak} in a row!` : ""}</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-gym-next">${last ? "Finish round →" : "Next chord →"}</button>`;
        const t = setTimeout(next, 1400);
        controls.querySelector("#hk-gym-next").addEventListener("click", () => { clearTimeout(t); next(); });
      } else {
        streak = 0;
        btn.classList.add("hk-gym-wrong");
        content.querySelector(".hk-gym-panda").innerHTML = pandaSvg(nextTrick("try"));
        const picked = btn.dataset.v;
        const pickedNotes = st.id === "mood" ? null : chordSymbolToMidi(picked);
        reply.innerHTML = `<p class="hk-gym-no">It was <b>${nice(current.sym)}</b> ${current.sym.endsWith("m") ? "(sad, minor)" : "(happy, major)"}.${pickedNotes ? " Hear the difference:" : ""}</p>
          ${pickedNotes ? `<div class="hk-gym-compare"><button class="hk-btn" data-hear="right">${icon("speaker", 18)} ${nice(current.sym)}</button><button class="hk-btn" data-hear="picked">${icon("speaker", 18)} ${nice(picked)}</button></div>` : ""}`;
        reply.querySelector('[data-hear="right"]')?.addEventListener("click", () => { kb.highlightChord(current.notes, { letter: nice(current.sym), rootMidi: rootOf(current) }); hear(current.notes); });
        reply.querySelector('[data-hear="picked"]')?.addEventListener("click", () => { kb.highlightChord(pickedNotes, { letter: nice(picked), rootMidi: pickedNotes[0] }); hear(pickedNotes); });
        hear(current.notes);
        controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-gym-next">${last ? "Finish round →" : "Next chord →"}</button>`;
        controls.querySelector("#hk-gym-next").addEventListener("click", next);
      }
    }
    function next() {
      if (!content.isConnected) return;
      round++;
      if (round < STAGES[stage].chords.length) return ask();
      const st = STAGES[stage];
      const pct = scores[stage] / st.chords.length;
      kb.clearHighlights();
      stage++;
      const done = stage >= STAGES.length;
      content.innerHTML = chatHtml(`<h3>${st.title.split(":")[0]} done! ${pct >= 0.8 ? "🏆" : pct >= 0.5 ? "🎉" : "💪"}</h3>
        <p>You got <b>${scores[stage - 1]} of ${st.chords.length}</b> right. ${pct >= 0.8 ? "Amazing ears!" : pct >= 0.5 ? "Your ears are getting sharp!" : "Ears get better with practice. Try this round again any time!"}</p>
        ${done ? `<p>Best streak: <b>${best}</b> in a row. Come back any time: a few minutes a day really helps!</p>` : ""}`, pct >= 0.5 ? "cheer" : "idle");
      if (done) {
        markLessonComplete("lesson-ear-gym");
        controls.innerHTML = `<button class="hk-btn" id="hk-gym-replay">Play again</button><button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-gym-done">Next lesson →</button>`;
        controls.querySelector("#hk-gym-replay").addEventListener("click", runEarGym);
        controls.querySelector("#hk-gym-done").addEventListener("click", startNextLesson);
      } else {
        controls.innerHTML = `<button class="hk-btn" id="hk-gym-redo">Try that round again</button><button class="hk-btn hk-btn-primary" id="hk-gym-on">Next round →</button>`;
        controls.querySelector("#hk-gym-redo").addEventListener("click", () => { stage--; scores[stage] = 0; startStage(); });
        controls.querySelector("#hk-gym-on").addEventListener("click", startStage);
      }
    }
    content.innerHTML = chatHtml(`<h3 data-q="What's the Ear Gym? 🎧">Train your ears to name chords 🎧</h3>
      <p>Great musicians can hear a chord and know its name. That's how they play songs <b>by ear</b>.</p>
      <p>3 rounds: <b>happy or sad</b>, then <b>all 24 chords</b> one by one, then chords <b>anywhere on the piano</b>.</p>`, "idle");
    controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-gym-begin">Let's train! →</button>`;
    controls.querySelector("#hk-gym-begin").addEventListener("click", startStage);
  }

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
          <h3>Can your ears name these chords?</h3>
          <p>I'll play a chord you already know. Can you pick it by ear? ${TOTAL_ROUNDS} quick rounds.</p>`, "assets/mascot-poses/music-stand.png");
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
          ${mascotSay(`<p>Listen. Which chord is this?</p>`)}
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
              feedback.textContent = `Correct! That was ${currentCorrect.letter}.`;
              feedback.className = "hk-quiz-feedback hk-quiz-feedback-correct";
              playTone(currentCorrect.notes[0], { duration: 0.3 });
            } else {
              btn.classList.add("hk-quiz-wrong");
              content.querySelectorAll(".hk-quiz-option").forEach((b2, j) => {
                if (currentOptions[j].letter === currentCorrect.letter) b2.classList.add("hk-quiz-correct");
              });
              feedback.textContent = `Not quite. That was ${currentCorrect.letter}, not ${picked.letter}.`;
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
          <h3>You got ${correctCount} of ${TOTAL_ROUNDS}!</h3>
          <p>${correctCount === TOTAL_ROUNDS
            ? "Perfect score! Your ears really know these chords now."
            : "Your ears get better every time you do this. Soon you'll know chords without looking."}</p>`,
          "assets/mascot-poses/maestro-conducting.png");
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Next lesson →</button>`;
        controls.querySelector("#hk-done").addEventListener("click", startNextLesson);
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
    const kb = lessonKeyboard(keyboardWrap, { startMidi: 55, endMidi: 79 });
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
      <h3>What do the pedals do?</h3>
      <p>The right pedal (<strong>sustain</strong>) keeps notes ringing after you lift your fingers. It's the pedal almost everyone uses.</p>
      <p class="hk-honest-note">Grand pianos also have a <strong>soft pedal</strong> (left) and a <strong>sostenuto pedal</strong> (middle). Many uprights have a quiet practice pedal in the middle instead.</p>
      <p>Same 4 notes, twice. Listen for the difference:</p>
      <div class="hk-pedal-buttons">
        <button class="hk-btn" id="hk-pedal-off">&#9658; Without the pedal</button>
        <button class="hk-btn hk-btn-primary" id="hk-pedal-on">&#9658; With the pedal</button>
      </div>
      <p class="hk-honest-note">(A simple demo: with the pedal, the notes just ring longer and blend together.)</p>`,
      "assets/mascot-poses/grand-piano.png");
    controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Fun, got it! Next lesson →</button>`;
    // The buttons live inside the chat bubble, which is built a moment
    // later, so listen on the container.
    content.addEventListener("click", (e) => {
      if (e.target.closest("#hk-pedal-off")) playPhrase(false);
      if (e.target.closest("#hk-pedal-on")) playPhrase(true);
    });
    controls.querySelector("#hk-done").addEventListener("click", () => {
      markLessonComplete("lesson-pedals");
      startNextLesson();
    });
  }

  // ----- Lesson 7: inversions --------------------------------------------
  function runLesson7() {
    const { content, keyboardWrap, controls } = lessonShell("Same chord, different shape: inversions");
    const kb = lessonKeyboard(keyboardWrap, { startMidi: 55, endMidi: 79 });
    let step = 0;

    function renderStep() {
      if (step < LESSON7_CHORDS.length) {
        const c = LESSON7_CHORDS[step];
        kb.highlightChord(c.notes, { rootMidi: c.notes[0] });
        content.innerHTML = `
          <p class="hk-step-indicator">${step + 1} of ${LESSON7_CHORDS.length}</p>
          <p style="font-size:1.3rem">${c.label}</p>
          ${mascotSay(`<p>${step === 2 ? "Notice G stays in the same place (it's in both chords), and the other notes only move a little." : "Tap the highlighted keys to hear it, then press Next."}</p>`)}`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Next</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step++; renderStep(); });
        playChord(c.notes, { delay: 0.1 });
      } else {
        markLessonComplete("lesson-7");
        kb.clearHighlights();
        content.innerHTML = mascotSay(`
          <h3>Lesson complete.</h3>
          <p>An inversion is the same chord with a different note on the bottom. Next time you practise your first 4 chords, try this C shape. It feels smoother!</p>`);
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Next lesson →</button>`;
        controls.querySelector("#hk-done").addEventListener("click", startNextLesson);
      }
    }
    renderStep = withStepBack(renderStep, { controls, kb, getState: () => ({ step }), setState: (s) => ({ step } = s) });
    renderStep();
  }

  // ----- Lesson 8: seventh chords -----------------------------------------
  function runLesson8() {
    const { content, keyboardWrap, controls } = lessonShell("A touch of jazz: seventh chords");
    const kb = lessonKeyboard(keyboardWrap, { startMidi: 55, endMidi: 79 });
    let step = 0;

    function renderStep() {
      if (step < LESSON8_CHORDS.length) {
        const c = LESSON8_CHORDS[step];
        kb.highlightChord(c.notes, { rootMidi: c.notes[0] });
        content.innerHTML = `
          <p class="hk-step-indicator">${step + 1} of ${LESSON8_CHORDS.length}</p>
          <p style="font-size:1.3rem">${c.label}</p>
          ${mascotSay(`<p>A 7th chord adds one more note on top. It sounds richer and jazzier.</p>`)}`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Next</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step++; renderStep(); });
        playChord(c.notes, { delay: 0.1, duration: 1.0 });
      } else {
        markLessonComplete("lesson-8");
        kb.clearHighlights();
        const sevenths = SONGS.filter((s) => s.chords.some((c) => c.includes("7")));
        content.innerHTML = mascotSay(`
          <h3>Lesson complete.</h3>
          <p>Listen for 7th chords in songs like ${sevenths.slice(0, 4).map((s) => `<i>${s.title}</i>`).join(", ")}.</p>`);
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Next lesson →</button>`;
        controls.querySelector("#hk-done").addEventListener("click", startNextLesson);
      }
    }
    renderStep = withStepBack(renderStep, { controls, kb, getState: () => ({ step }), setState: (s) => ({ step } = s) });
    renderStep();
  }

  // ----- Lesson 9: key signatures -----------------------------------------
  function runLesson9() {
    const { content, keyboardWrap, controls } = lessonShell("Reading key signatures: one sharp = G");
    const kb = lessonKeyboard(keyboardWrap, { startMidi: 55, endMidi: 79 });
    let step = 0;

    function renderStep() {
      if (step === 0) {
        content.innerHTML = `
          ${mascotSay(`<h3>A key signature is just a shortcut.</h3>
          <p>Instead of a sharp on every F, G major puts <strong>one sharp</strong> at the start of the staff. It means "every F is F#".</p>
          <p>You already play F#: it's the middle note of your D chord (D-F#-A).</p>`)}
          <div id="hk-staff-wrap">${renderStaffSvg(G_MAJOR_SCALE_FOR_STAFF, G_MAJOR_SCALE_FOR_STAFF.length, { keySignatureSharps: [77] })}</div>
          <p class="hk-step-indicator">The G major scale. Spot the sharp at the start?</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Try it</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step = 1; renderStep(); });
      } else if (step === 1) {
        content.innerHTML = mascotSay(`<p>Press <strong>F#</strong> on the keyboard below. It's a black key!</p><p id="hk-quiz-status"></p>`);
        controls.innerHTML = "";
        kb.onKeyPress((midi) => {
          if (midi % 12 === 6) { // any F#
            step = 2;
            renderStep();
          } else if (midi % 12 === 5) {
            content.querySelector("#hk-quiz-status").textContent = "That's F. Try the black key just to its right.";
          }
        });
      } else {
        markLessonComplete("lesson-9");
        kb.clearHighlights();
        kb.onKeyPress(() => {});
        const gMajorSongs = SONGS.filter((s) => s.key.startsWith("G major"));
        content.innerHTML = mascotSay(`
          <h3>Lesson complete.</h3>
          <p>Now you can read a shape you already play. ${gMajorSongs.length ? `Fun fact: ${gMajorSongs.slice(0, 3).map((s) => s.title).join(", ")} ${gMajorSongs.length > 1 ? "are" : "is"} in the key of G.` : ""}</p>`);
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Next lesson →</button>`;
        controls.querySelector("#hk-done").addEventListener("click", startNextLesson);
      }
    }
    renderStep = withStepBack(renderStep, { controls, kb, getState: () => ({ step }), setState: (s) => ({ step } = s) });
    renderStep();
  }

  // ----- Lesson 10: capstone — Minuet in G --------------------------------
  function runLesson10() {
    const { content, keyboardWrap, controls } = lessonShell("Minuet in G");
    const kb = lessonKeyboard(keyboardWrap, { startMidi: 55, endMidi: 79 });
    let step = 0;

    function renderStep() {
      if (step === 0) {
        content.innerHTML = `
          ${mascotSay(`<h3>Your first classical piece</h3>
          <p>"Minuet in G" was written by Christian Petzold around 1720-25. People thought Bach wrote it, because it's in the Notebook for Anna Magdalena Bach.</p>
          <p>Here's its famous opening, in the key of G:</p>`)}
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
          <h3>Big milestone! 🎉</h3>
          <p>You just read your first classical tune from sheet music.</p>
          <p>You now know the main pattern in <strong>${touched.size} of ${SONGS.length}</strong> library songs: the 1-5-6-4 family, the 2 chord or the minor pattern.</p>
          <p>The other ${SONGS.length - touched.size} use ideas still to come, like borrowed chords and more 7th chords.</p>`);
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Next lesson →</button>`;
        controls.querySelector("#hk-done").addEventListener("click", startNextLesson);
      }
    }
    renderStep = withStepBack(renderStep, { controls, kb, getState: () => ({ step }), setState: (s) => ({ step } = s) });
    renderStep();
  }

  // ===== Days 11-35: extended "strong early-intermediate" arc ===========

  // ----- Days 11-14: major scales (generic) ------------------------------
  function runMajorScaleLesson(scale, lessonId) {
    const { content, keyboardWrap, controls } = lessonShell(`${scale.key} major scale`);
    const kb = lessonKeyboard(keyboardWrap, { startMidi: scale.notes[0] - 5, endMidi: scale.notes[7] + 5 });
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
          <p>Play degrees 1, 3 and 5 of this scale together, and you get the <strong>${scale.key} major</strong> chord you already know!</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Try it</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step = 9; renderStep(); });
        playChord(triad, { delay: 0.1 });
      } else if (step === 9) {
        content.innerHTML = `<p>Press the <strong>1st</strong> degree of the scale, then the <strong>5th</strong>.</p><p id="hk-quiz-progress"></p>`;
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
        markLessonComplete(lessonId);
        kb.clearHighlights();
        kb.onKeyPress(() => {});
        content.innerHTML = `<h3>Lesson complete.</h3><p>Same pattern, new key. That's the trick behind every major scale.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Next lesson →</button>`;
        controls.querySelector("#hk-done").addEventListener("click", startNextLesson);
      }
    }
    renderStep = withStepBack(renderStep, { controls, kb, getState: () => ({ step }), setState: (s) => ({ step } = s) });
    renderStep();
  }

  // ----- Day 15: scales review — the scale/chord connection, quizzed ----
  function runLesson15() {
    const { content, keyboardWrap, controls } = lessonShell("Scales review");
    const kb = lessonKeyboard(keyboardWrap, { startMidi: 55, endMidi: 79 });
    const cMajor = MAJOR_SCALES[0];
    let step = 0;

    function renderStep() {
      if (step === 0) {
        content.innerHTML = `
          <h3>Four scales, one shape.</h3>
          <p>You played C, G, D and F major. They all follow the same pattern, just starting on a different key.</p>
          <p>Quick check: press the <strong>1st, 3rd and 5th</strong> degrees of the C major scale, in any order. Together they make the C major chord.</p>
          <p id="hk-quiz-status"></p>`;
        const targets = new Set([cMajor.notes[0], cMajor.notes[2], cMajor.notes[4]]);
        // A way forward for anyone stuck: light up the three keys.
        controls.innerHTML = `<button class="hk-btn" id="hk-show-135">Show me</button>`;
        controls.querySelector("#hk-show-135").addEventListener("click", () => kb.highlightChord([...targets]));
        const pressed = new Set();
        kb.onKeyPress((midi) => {
          if (targets.has(midi)) {
            pressed.add(midi);
            kb.getKeyElement(midi).classList.add("hk-key-highlight");
            if (pressed.size === targets.size) {
              content.querySelector("#hk-quiz-status").textContent = "Correct! That's the C major chord, built from the scale.";
              step = 1;
              setTimeout(renderStep, 1200);
            }
          }
        });
      } else {
        markLessonComplete("lesson-15");
        kb.clearHighlights();
        kb.onKeyPress(() => {});
        content.innerHTML = `<h3>Lesson complete.</h3><p>Up next: minor scales, and a new idea: the relative minor.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Next lesson →</button>`;
        controls.querySelector("#hk-done").addEventListener("click", startNextLesson);
      }
    }
    renderStep();
  }

  // ----- Day 16: the natural minor scale pattern --------------------------
  function runLesson16() {
    const { content, keyboardWrap, controls } = lessonShell("The minor scale pattern");
    const kb = lessonKeyboard(keyboardWrap, { startMidi: 52, endMidi: 72 });
    const aMinor = MINOR_SCALES[0];
    let step = 0;

    function renderStep() {
      if (step < 8) {
        const midi = aMinor.notes[step];
        kb.highlightChord([midi], { number: String(step + 1), rootMidi: midi });
        content.innerHTML = `
          <p class="hk-step-indicator">Note ${step + 1} of 8</p>
          <div class="hk-big-degree">${step + 1}</div>
          <p>A natural minor scale, degree ${step + 1}. Its pattern of steps is different from major.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Next</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step++; renderStep(); });
        playTone(midi, { duration: 0.4 });
      } else {
        markLessonComplete("lesson-16");
        kb.clearHighlights();
        content.innerHTML = `<h3>Lesson complete.</h3><p>Next: A minor shares a surprising secret with C major.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Next lesson →</button>`;
        controls.querySelector("#hk-done").addEventListener("click", startNextLesson);
      }
    }
    renderStep = withStepBack(renderStep, { controls, kb, getState: () => ({ step }), setState: (s) => ({ step } = s) });
    renderStep();
  }

  // ----- Days 17-19: relative minor scales (generic) ----------------------
  // lessonId is passed in: the scale data's `day` numbers are one behind
  // the lesson ids (A minor is day 16 but lesson-17), so marking
  // `lesson-${scale.day}` completed the wrong lesson and D minor could
  // never be finished.
  function runMinorScaleLesson(scale, lessonId) {
    const { content, keyboardWrap, controls } = lessonShell(`${scale.key} minor scale`);
    const kb = lessonKeyboard(keyboardWrap, { startMidi: scale.notes[0] - 5, endMidi: scale.notes[7] + 5 });
    let step = 0;

    function renderStep() {
      if (step < 8) {
        const midi = scale.notes[step];
        kb.highlightChord([midi], { number: String(step + 1), rootMidi: midi });
        content.innerHTML = `
          <p class="hk-step-indicator">Note ${step + 1} of 8</p>
          <div class="hk-big-degree">${step + 1}</div>
          <p>${scale.key} natural minor. Key signature: <strong>${scale.accidentals}</strong>.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Next</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step++; renderStep(); });
        playTone(midi, { duration: 0.4 });
      } else if (step === 8) {
        content.innerHTML = `
          <h3>${scale.key} minor is ${scale.relativeMajor} major's relative minor.</h3>
          <p>Same notes, same key signature (${scale.accidentals}), just a different home note. That's a new idea: the relative minor.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Next lesson →</button>`;
        controls.querySelector("#hk-done").addEventListener("click", () => {
          markLessonComplete(lessonId);
          startNextLesson();
        });
      }
    }
    renderStep = withStepBack(renderStep, { controls, kb, getState: () => ({ step }), setState: (s) => ({ step } = s) });
    renderStep();
  }

  // ----- Day 20: minor scales review / payoff -----------------------------
  function runLesson20() {
    const { content, keyboardWrap, controls } = lessonShell("Minor scales review");
    const kb = lessonKeyboard(keyboardWrap, { startMidi: 55, endMidi: 79 });
    kb.clearHighlights();
    const minorKeySongs = SONGS.filter((s) => s.confidence === "confirmed" && /minor/i.test(s.key));
    content.innerHTML = `
      <h3>Every major key has a relative minor</h3>
      <p>C/Am, G/Em, F/Dm: same notes, different home note. Now you have the tools for the <strong>${minorKeySongs.length} of ${SONGS.length}</strong> library songs in a minor key.</p>
      <p class="hk-honest-note">A quick review before you start playing with both hands.</p>`;
    controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Next lesson →</button>`;
    controls.querySelector("#hk-done").addEventListener("click", () => {
      markLessonComplete("lesson-20");
      startNextLesson();
    });
  }

  // ----- Days 21-22: two-hand bass patterns (generic) ---------------------
  function runTwoHandLesson(lessonId, title, pattern) {
    const { content, keyboardWrap, controls } = lessonShell(title);
    const kb = lessonKeyboard(keyboardWrap, { startMidi: 45, endMidi: 79 });
    let step = 0;

    function renderStep() {
      if (step < pattern.leftHand.length) {
        const midi = pattern.leftHand[step];
        kb.highlightHands({ left: [midi], right: pattern.rightHandChord, leftLabel: `beat ${step + 1}` });
        content.innerHTML = `
          <p class="hk-step-indicator">Beat ${step + 1} of ${pattern.leftHand.length}</p>
          <p>${pattern.description}</p>
          <p>Left hand (pink) plays this low note. Right hand (light blue) holds the chord higher up.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Next beat</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step++; renderStep(); });
        playChord([...pattern.rightHandChord, midi], { duration: 0.6 });
      } else {
        markLessonComplete(lessonId);
        kb.clearHighlights();
        content.innerHTML = `<h3>Lesson complete.</h3><p>Try it slowly on a real piano: left hand on the beats, right hand holding the chord.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Next lesson →</button>`;
        controls.querySelector("#hk-done").addEventListener("click", startNextLesson);
      }
    }
    renderStep = withStepBack(renderStep, { controls, kb, getState: () => ({ step }), setState: (s) => ({ step } = s) });
    renderStep();
  }

  // ----- Day 23: arpeggios -------------------------------------------------
  function runLesson23() {
    const { content, keyboardWrap, controls } = lessonShell("Arpeggios");
    const kb = lessonKeyboard(keyboardWrap, { startMidi: 55, endMidi: 79 });
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
        content.innerHTML = `<h3>Lesson complete.</h3><p>That's a C major arpeggio, a technique you'll hear in lots of classical music, like Bach's Prelude in C.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Next lesson →</button>`;
        controls.querySelector("#hk-done").addEventListener("click", startNextLesson);
      }
    }
    renderStep = withStepBack(renderStep, { controls, kb, getState: () => ({ step }), setState: (s) => ({ step } = s) });
    renderStep();
  }

  // ----- Day 24: two hands together ---------------------------------------
  function runLesson24() {
    const { content, keyboardWrap, controls } = lessonShell("Two hands together");
    const kb = lessonKeyboard(keyboardWrap, { startMidi: 45, endMidi: 79 });
    const pattern = TWO_HAND_PATTERNS.albertiBass;
    let step = 0;

    function renderStep() {
      if (step < pattern.leftHand.length) {
        const midi = pattern.leftHand[step];
        kb.highlightHands({ left: [midi], right: pattern.rightHandChord });
        content.innerHTML = `<p class="hk-step-indicator">Beat ${step + 1} of ${pattern.leftHand.length}</p><p>Alberti bass in the left hand (pink), a held chord in the right hand (light blue). Two hands at once!</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Next beat</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step++; renderStep(); });
        playChord([...pattern.rightHandChord, midi], { duration: 0.6 });
      } else {
        markLessonComplete("lesson-24");
        kb.clearHighlights();
        content.innerHTML = `<h3>Lesson complete.</h3><p>This is tricky at first. Go slow and steady: that's how every pianist learns it.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Next lesson →</button>`;
        controls.querySelector("#hk-done").addEventListener("click", startNextLesson);
      }
    }
    renderStep = withStepBack(renderStep, { controls, kb, getState: () => ({ step }), setState: (s) => ({ step } = s) });
    renderStep();
  }

  // ----- Day 25: two-hand payoff — apply to Lesson 1's progression --------
  function runLesson25() {
    const { content, keyboardWrap, controls } = lessonShell("Two hands on your first song");
    const kb = lessonKeyboard(keyboardWrap, { startMidi: 45, endMidi: 79 });
    let step = 0;

    function renderStep() {
      if (step < LESSON1_SEQUENCE.length) {
        const key = LESSON1_SEQUENCE[step];
        const chord = LESSON1_CHORDS[key];
        const bass = chord.root - 12;
        kb.highlightHands({ left: [bass], right: chord.notes, leftLabel: chord.number, rightLabel: chord.letter });
        content.innerHTML = `<p class="hk-step-indicator">Chord ${step + 1} of 4</p><p>${chord.number} (${chord.letter}): right hand plays the chord (light blue), left hand plays the root an octave lower (pink).</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Next</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step++; renderStep(); });
        playChord([...chord.notes, bass], { duration: 0.8 });
      } else {
        markLessonComplete("lesson-25");
        kb.clearHighlights();
        content.innerHTML = `<h3>Lesson complete.</h3><p>Your first 4 chords, G-D-Em-C, now with both hands. All that practice paid off!</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Next lesson →</button>`;
        controls.querySelector("#hk-done").addEventListener("click", startNextLesson);
      }
    }
    renderStep = withStepBack(renderStep, { controls, kb, getState: () => ({ step }), setState: (s) => ({ step } = s) });
    renderStep();
  }

  // ----- Days 26-28: seventh chords (generic) ------------------------------
  function runSeventhChordLesson(lessonId, chordInfo, label) {
    const { content, keyboardWrap, controls } = lessonShell(chordInfo.label);
    const kb = lessonKeyboard(keyboardWrap, { startMidi: 55, endMidi: 84 });
    let step = 0; // 0 = triad, 1 = seventh, 2 = quiz, 3 = done
    const triad = chordInfo.notes.slice(0, 3);
    const seventhNote = chordInfo.notes[3];

    function renderStep() {
      if (step === 0) {
        kb.highlightChord(triad, { rootMidi: triad[0] });
        content.innerHTML = `<h3>First, the plain chord</h3><p>This is the 3-note chord you already know.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Add the 7th</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step = 1; renderStep(); });
        playChord(triad, { duration: 0.8 });
      } else if (step === 1) {
        kb.highlightChord(chordInfo.notes, { letter: chordInfo.label, rootMidi: chordInfo.notes[0] });
        content.innerHTML = `<h3>${chordInfo.label}</h3><p>Add one note on top and it becomes a ${label} chord. Hear how much richer and jazzier it sounds?</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Try it</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step = 2; renderStep(); });
        playChord(chordInfo.notes, { duration: 1.0 });
      } else if (step === 2) {
        content.innerHTML = `<p>Now press just the <strong>new 7th note</strong>.</p><p id="hk-quiz-status"></p>`;
        controls.innerHTML = `<button class="hk-btn" id="hk-show-7th">${icon("eye", 20)} Show me</button>`;
        controls.querySelector("#hk-show-7th").addEventListener("click", () => { kb.highlightChord([seventhNote]); playTone(seventhNote, { duration: 0.8 }); });
        kb.onKeyPress((midi) => {
          if (midi === seventhNote) { step = 3; renderStep(); return; }
          const status = content.querySelector("#hk-quiz-status");
          if (status) status.textContent = "Not that one. It's the highest of the 4 notes.";
        });
      } else {
        markLessonComplete(lessonId);
        kb.clearHighlights();
        kb.onKeyPress(() => {});
        content.innerHTML = `<h3>Lesson complete.</h3><p>Listen out for this sound. Lots of songs in the library use it.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Next lesson →</button>`;
        controls.querySelector("#hk-done").addEventListener("click", startNextLesson);
      }
    }
    renderStep = withStepBack(renderStep, { controls, kb, getState: () => ({ step }), setState: (s) => ({ step } = s) });
    renderStep();
  }

  // ----- Day 29: inversions with 7th chords --------------------------------
  function runLesson29() {
    const { content, keyboardWrap, controls } = lessonShell("Inversions with 7th chords");
    const kb = lessonKeyboard(keyboardWrap, { startMidi: 55, endMidi: 84 });
    const steps = [
      { label: "Gmaj7 (root position)", notes: [67, 71, 74, 78] },
      { label: "Gmaj7 (1st inversion)", notes: [71, 74, 78, 79] },
    ];
    let step = 0;

    function renderStep() {
      if (step < steps.length) {
        const s = steps[step];
        kb.highlightChord(s.notes, { rootMidi: s.notes[0] });
        content.innerHTML = `<p class="hk-step-indicator">${step + 1} of ${steps.length}</p><p>${s.label}. Same chord, notes in a new order, just like the inversions you learned earlier.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Next</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step++; renderStep(); });
        playChord(s.notes, { duration: 0.9 });
      } else {
        markLessonComplete("lesson-29");
        kb.clearHighlights();
        content.innerHTML = `<h3>Lesson complete.</h3><p>Inversions work the same way on 4-note chords as on 3-note chords.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Next lesson →</button>`;
        controls.querySelector("#hk-done").addEventListener("click", startNextLesson);
      }
    }
    renderStep = withStepBack(renderStep, { controls, kb, getState: () => ({ step }), setState: (s) => ({ step } = s) });
    renderStep();
  }

  // ----- Day 30: richer harmony payoff -------------------------------------
  function runLesson30() {
    const { content, keyboardWrap, controls } = lessonShell("Your first song, jazzed up");
    const kb = lessonKeyboard(keyboardWrap, { startMidi: 55, endMidi: 84 });
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
        content.innerHTML = `<h3>Hear the difference?</h3><p>The same G-D-Em-C chords from your first lesson, now played as Gmaj7-D7-Em7-Cmaj7. Same 4-chord pattern, with a jazzy sound.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Next lesson →</button>`;
        controls.querySelector("#hk-done").addEventListener("click", startNextLesson);
      }
    }
    renderStep = withStepBack(renderStep, { controls, kb, getState: () => ({ step }), setState: (s) => ({ step } = s) });
    renderStep();
  }

  // ----- Days 31-35: capstone — Pachelbel's Canon in D ---------------------
  function runLesson31() {
    const { content, keyboardWrap, controls } = lessonShell("Canon in D chords");
    const kb = lessonKeyboard(keyboardWrap, { startMidi: 40, endMidi: 79 });
    let step = 0;

    function renderStep() {
      if (step < CANON_IN_D.chords.length) {
        const c = CANON_IN_D.chords[step];
        kb.highlightChord(c.notes, { number: c.roman, letter: c.label, rootMidi: c.notes[0] });
        content.innerHTML = `
          <p class="hk-step-indicator">Chord ${step + 1} of 8</p>
          <div class="hk-big-degree">${c.roman}<span class="hk-big-letter">${c.label}</span></div>
          ${step === 0 ? `<p>Pachelbel's Canon in D is about 300 years old. It's a famous older cousin of the 4-chord pattern: it starts with the same 1-5-6.</p>
             <p>It uses 8 chords: I-V-vi-iii-IV-I-IV-V.</p>` : ""}`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Next</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step++; renderStep(); });
        playChord(c.notes, { duration: 0.8 });
      } else {
        markLessonComplete("lesson-31");
        kb.clearHighlights();
        content.innerHTML = `<h3>Lesson complete.</h3><p>Next: the famous bass line.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Next lesson →</button>`;
        controls.querySelector("#hk-done").addEventListener("click", startNextLesson);
      }
    }
    renderStep = withStepBack(renderStep, { controls, kb, getState: () => ({ step }), setState: (s) => ({ step } = s) });
    renderStep();
  }

  function runLesson32() {
    const { content, keyboardWrap, controls } = lessonShell("Canon's bass line");
    const kb = lessonKeyboard(keyboardWrap, { startMidi: 38, endMidi: 67 });
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
        content.innerHTML = `<h3>Lesson complete.</h3><p>Your left hand knows the bass. Next, the right hand adds chords on top.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Next lesson →</button>`;
        controls.querySelector("#hk-done").addEventListener("click", startNextLesson);
      }
    }
    renderStep = withStepBack(renderStep, { controls, kb, getState: () => ({ step }), setState: (s) => ({ step } = s) });
    renderStep();
  }

  function runLesson33() {
    const { content, keyboardWrap, controls } = lessonShell("Canon's chords, over the bass");
    const kb = lessonKeyboard(keyboardWrap, { startMidi: 38, endMidi: 79 });
    let step = 0;

    function renderStep() {
      if (step < CANON_IN_D.chords.length) {
        const c = CANON_IN_D.chords[step];
        kb.highlightHands({ left: [c.bass], right: c.notes, rightLabel: c.label });
        content.innerHTML = `<p class="hk-step-indicator">${step + 1} of 8</p><p>${c.label}: right hand plays the chord (light blue), left hand plays the bass note (pink).</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Next</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step++; renderStep(); });
        playChord([...c.notes, c.bass], { duration: 0.8 });
      } else {
        markLessonComplete("lesson-33");
        kb.clearHighlights();
        content.innerHTML = `<h3>Lesson complete.</h3><p>You played all 8 Canon chords with both hands!</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Next lesson →</button>`;
        controls.querySelector("#hk-done").addEventListener("click", startNextLesson);
      }
    }
    renderStep = withStepBack(renderStep, { controls, kb, getState: () => ({ step }), setState: (s) => ({ step } = s) });
    renderStep();
  }

  function runLesson34() {
    const { content, keyboardWrap, controls } = lessonShell("Canon, with richer color");
    const kb = lessonKeyboard(keyboardWrap, { startMidi: 38, endMidi: 79 });
    const plain = CANON_IN_D.chords[2]; // Bm
    const richer = { label: "Bm7", notes: [59, 62, 66, 69], bass: 47 };
    let step = 0;
    const steps = [plain, richer];

    function renderStep() {
      if (step < steps.length) {
        const c = steps[step];
        kb.highlightHands({ left: [c.bass], right: c.notes, rightLabel: c.label });
        content.innerHTML = `<p class="hk-step-indicator">${step + 1} of 2</p><p>${c.label}${step === 1 ? ": swap in a 7th chord for a richer sound, like you learned earlier" : " (the plain version, to compare)"}.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Next</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step++; renderStep(); });
        playChord([...c.notes, c.bass], { duration: 0.9 });
      } else {
        markLessonComplete("lesson-34");
        kb.clearHighlights();
        content.innerHTML = `<h3>Lesson complete.</h3><p>One more day: the full performance!</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Next lesson →</button>`;
        controls.querySelector("#hk-done").addEventListener("click", startNextLesson);
      }
    }
    renderStep = withStepBack(renderStep, { controls, kb, getState: () => ({ step }), setState: (s) => ({ step } = s) });
    renderStep();
  }

  function runLesson35() {
    const { content, keyboardWrap, controls } = lessonShell("Full performance");
    const kb = lessonKeyboard(keyboardWrap, { startMidi: 38, endMidi: 79 });
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
          <p>You can play scales in four major and three minor keys, use both hands together, and play 7th chords and inversions. You've also played two classical pieces!</p>
          <p>That makes you a <strong>strong early-intermediate</strong> player. Advanced piano takes years, so keep going!</p>
          <p>You now know the main pattern behind <strong>${touched.size} of ${SONGS.length}</strong> songs in the library.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Next lesson →</button>`;
        controls.querySelector("#hk-done").addEventListener("click", startNextLesson);
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
    const kb = lessonKeyboard(keyboardWrap, { startMidi: 45, endMidi: 79 });
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
          <h3>Left hand chords, right hand makes it up</h3>
          <p>Jazz players do this: the left hand plays chords (called "comping") and the right hand makes up a tune.</p>
          <p>The trick: notes from the <strong>major pentatonic scale</strong> fit nicely over chords in the same key. No hard theory needed!</p>
          <p>The left hand (pink) loops Dm7-G7-Cmaj7, the 7th chords you learned earlier. Your "safe notes" (light blue outline) are C, D, E, G and A.</p>`, "assets/mascot-poses/trombone.png");
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Start noodling</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step = 1; renderStep(); });
      } else {
        content.innerHTML = `
          ${mascotSay(`<p>The chords are looping. Tap any <strong>outlined</strong> key to make up your own tune. There are no wrong notes here!</p>`, "assets/mascot-poses/trombone.png")}
          <p id="hk-jazz-timer">Time spent noodling: 0s</p>
          <p class="hk-honest-note">There's no score here. When you're done, tap "Mark lesson complete".</p>`;
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
        <p>This trick works in any key. Play notes 1, 2, 3, 5 and 6 of the key's scale, and they'll sound good.</p>`);
      controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Next lesson →</button>`;
      controls.querySelector("#hk-done").addEventListener("click", startNextLesson);
    }

    renderStep = withStepBack(renderStep, { controls, kb, getState: () => ({ step }), setState: (s) => ({ step } = s), onBack: () => { if (compInterval) clearInterval(compInterval); if (timerInterval) clearInterval(timerInterval); compInterval = null; timerInterval = null; kb.clearHighlights(); } });
    renderStep();
  }

  // ----- Bonus: advanced repertoire (Für Elise excerpt + verified catalog) -
  function runLesson37() {
    const { content, keyboardWrap, controls } = lessonShell("Bonus: Advanced repertoire");
    const kb = lessonKeyboard(keyboardWrap, { startMidi: 40, endMidi: 79 });
    let step = 0; // 0 = intro/catalog, 1..9 = Für Elise notes, 10 = done

    function catalogHtml() {
      return `<ul class="hk-repertoire-list">${ADVANCED_REPERTOIRE.map((p) => `
        <li><strong>${p.title}</strong> - ${p.composer}${p.year ? ` (${p.year})` : ""}, ${p.key}.
          ${p.built ? '<span class="hk-badge hk-badge-match">excerpt built</span>' : '<span class="hk-badge">catalog only</span>'}
          <br/><span class="hk-honest-note">${p.difficulty}</span></li>`).join("")}</ul>`;
    }

    function renderStep() {
      if (step === 0) {
        content.innerHTML = `
          <h3>Pieces to learn next</h3>
          <p>These classical pieces are all free to play (the composers died long ago). You can try the start of Beethoven's "Für Elise" now. The rest are ideas for later.</p>
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
          <p>The famous start of Beethoven's "Für Elise" (1810). Your right hand (light blue) plays the tune. Your left hand (pink) plays A minor notes underneath.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Next</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step++; renderStep(); });
      } else {
        markLessonComplete("lesson-37");
        kb.clearHighlights();
        content.innerHTML = `
          <h3>Lesson complete.</h3>
          <p>Those are some of the most famous notes in piano music! The full piece gets harder from here.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Next lesson →</button>`;
        controls.querySelector("#hk-done").addEventListener("click", startNextLesson);
      }
    }
    renderStep = withStepBack(renderStep, { controls, kb, getState: () => ({ step }), setState: (s) => ({ step } = s) });
    renderStep();
  }

  // ----- Intermediate: building speed (item 57) ---------------------------
  // Standard, widely taught practice method — nothing exotic: speed is a
  // side-effect of accurate, relaxed repetition, raised gradually. The
  // drill uses the falling blocks at four metronome tempos.
  function runTechniqueLesson() {
    const { content, keyboardWrap, controls } = lessonShell("Building speed: fast, relaxed fingers");
    const kb = lessonKeyboard(keyboardWrap, { startMidi: 55, endMidi: 79 });
    let step = 0;
    const DRILL = [60, 62, 64, 65, 67, 65, 64, 62, 60]; // C D E F G F E D C — fingers 1 2 3 4 5 4 3 2 1
    const FINGERS = [1, 2, 3, 4, 5, 4, 3, 2, 1];
    function drillEvents(bpm) {
      const eighth = 60 / bpm / 2;
      const ev = [];
      for (let rep = 0; rep < 2; rep++) {
        DRILL.forEach((midi, i) => ev.push({ midi, start: (rep * DRILL.length + i) * eighth, dur: eighth * 0.9, hand: "right" }));
      }
      return ev;
    }
    const pages = [
      () => mascotSay(`<h3>Fast fingers are relaxed fingers</h3>
        <p>You can't force speed. It comes when you play <strong>accurately</strong> with a <strong>relaxed</strong> hand, again and again.</p>
        <p class="hk-honest-note">If your wrist, arm or fingers hurt, stop and rest. Pain never helps you get faster.</p>`, "assets/mascot-poses/metronome.png"),
      () => mascotSay(`<h3>1. Slow first, then speed up</h3>
        <p>Play <strong>slowly enough to get it right every time</strong>: right notes, right fingers, even rhythm.</p>
        <p>Use a metronome. Once you play it cleanly <strong>3 times in a row</strong>, speed up a little (4-8 beats per minute).</p>
        <p>Playing fast with mistakes just practises the mistakes.</p>`, "assets/mascot-poses/metronome.png"),
      () => mascotSay(`<h3>2. A relaxed hand</h3>
        <ul>
          <li><strong>Curved fingers</strong>, like holding a small ball. Play on your fingertips.</li>
          <li><strong>Stay close to the keys.</strong> Small movements are fast movements.</li>
          <li><strong>Loose wrist and shoulders.</strong> Let your arm's weight help.</li>
          <li><strong>Same fingers every time.</strong> Then the movement becomes automatic.</li>
        </ul>`),
      () => mascotSay(`<h3>3. Rhythms and bursts</h3>
        <p><strong>Change the rhythm</strong> of a fast run: long-short, then short-long. Then the even version gets easier.</p>
        <p><strong>Play in bursts:</strong> 3-5 quick notes, pause, then the next group. Then join the groups.</p>
        <p>Practise <strong>hands separately</strong> before hands together.</p>`),
      () => mascotSay(`<h3>4. Try it: the five-finger drill</h3>
        <p>Right thumb on middle C. Play <strong>C D E F G F E D C</strong> with fingers <strong>${FINGERS.join(" ")}</strong>, following the falling blocks.</p>
        <p>Start at 60. Go faster only when it feels even and easy.</p>
        <div class="hk-pedal-buttons">
          ${[60, 80, 100, 120].map((bpm) => `<button class="hk-btn" data-bpm="${bpm}">&#9658; ♩ = ${bpm}</button>`).join("")}
        </div>`),
      () => mascotSay(`<h3>5. A short daily routine</h3>
        <p>5-10 minutes before your songs:</p>
        <ul>
          <li>Five-finger patterns like the drill, both hands.</li>
          <li>Scales and arpeggios in a few keys, hands separately, then together.</li>
          <li>One hard bar from a song, slowly, with the metronome.</li>
        </ul>
        <p>A little practice every day beats one long session a week. Your brain keeps learning while you rest, even overnight!</p>
        <p class="hk-honest-note">Want more? Try two classic exercise books: Hanon's <em>The Virtuoso Pianist</em> (1873) and Czerny's <em>School of Velocity</em>, Op. 299.</p>`),
    ];
    function renderStep() {
      if (kb.stopPlayAlong) kb.stopPlayAlong();
      if (step < pages.length) {
        kb.clearHighlights();
        content.innerHTML = `<p class="hk-step-indicator">${step + 1} of ${pages.length}</p>${pages[step]()}`;
        if (step === 4) {
          kb.highlightChord(DRILL.slice(0, 5), { letter: "C", rootMidi: 60 });
          content.querySelectorAll("[data-bpm]").forEach((btn) => {
            btn.addEventListener("click", () => kb.playTimeline(drillEvents(Number(btn.dataset.bpm))));
          });
        }
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">${step === pages.length - 1 ? "Finish" : "Next"}</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step++; renderStep(); });
      } else {
        markLessonComplete("lesson-technique");
        kb.clearHighlights();
        content.innerHTML = mascotSay(`<h3>Lesson complete.</h3>
          <p>Slow and correct, relaxed, a little faster each time. That's the secret, for beginners and concert pianists alike.</p>`, "assets/mascot-poses/metronome.png");
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Next lesson →</button>`;
        controls.querySelector("#hk-done").addEventListener("click", startNextLesson);
      }
    }
    renderStep = withStepBack(renderStep, { controls, kb, getState: () => ({ step }), setState: (st) => ({ step } = st) });
    renderStep();
  }

  // ----- Advanced: Beethoven, harmony vs. form (item 57) -----------------
  function runBeethovenFormLesson() {
    const { content, keyboardWrap, controls } = lessonShell("Beethoven: harmony vs. form");
    const kb = lessonKeyboard(keyboardWrap, { startMidi: 45, endMidi: 81 });
    let step = 0;
    const A_MINOR = [57, 60, 64]; // A3 C4 E4
    const E_MAJOR = [52, 56, 59]; // E3 G#3 B3
    function hearPull() {
      kb.playTimeline([
        ...A_MINOR.map((midi) => ({ midi, start: 0, dur: 1.1, hand: "left" })),
        ...E_MAJOR.map((midi) => ({ midi, start: 1.2, dur: 1.1, hand: "right" })),
        ...A_MINOR.map((midi) => ({ midi, start: 2.4, dur: 1.6, hand: "left" })),
      ], { lead: 0.6 });
    }
    function hearTheme() {
      kb.playTimeline(FUR_ELISE_OPENING.rightHand.map((midi, i) => ({ midi, start: i * 0.28, dur: i === 8 ? 0.8 : 0.26, hand: "right" })), { lead: 0.6 });
    }
    const pages = [
      () => mascotSay(`<h3>Harmony and form</h3>
        <p><strong>Harmony</strong> is what's happening <em>right now</em>: which chord plays under the tune.</p>
        <p><strong>Form</strong> is the <em>map of the whole piece</em>: its sections, their order, and when the main tune comes back.</p>
        <p>Knowing both makes Beethoven's music easier to learn and remember.</p>`,
        "assets/mascot-poses/composer.png"),
      () => mascotSay(`<h3>Harmony: going home</h3>
        <p>Für Elise is in <strong>A minor</strong>. Its home chord is <strong>A-C-E</strong>. The main tune swings to <strong>E major</strong> (E-G#-B), then back home.</p>
        <p>The secret is <strong>G#</strong>. It's just below A, so your ear wants it to go up to A. You'll hear this pull in lots of classical music.</p>
        <div class="hk-pedal-buttons"><button class="hk-btn hk-btn-primary" id="hk-hear-pull">&#9658; Hear A minor, E, A minor</button></div>`,
        "assets/mascot-poses/composer.png"),
      () => mascotSay(`<h3>Form: A B A C A</h3>
        <p>The famous tune (<strong>A</strong>) keeps coming back, with two different parts in between:</p>
        <div class="hk-form-row">
          <span class="hk-form-box hk-form-a">A</span><span class="hk-form-box hk-form-b">B</span>
          <span class="hk-form-box hk-form-a">A</span><span class="hk-form-box hk-form-c">C</span>
          <span class="hk-form-box hk-form-a">A</span>
        </div>
        <p><strong>A:</strong> the E-D#-E-D# tune, in A minor. <strong>B:</strong> a brighter part that starts in F major. <strong>C:</strong> a stormy part over a low, repeated A. Then A one last time.</p>
        <p>This shape is called a <strong>rondo</strong>. Learn A well and you know over half the piece!</p>
        <div class="hk-pedal-buttons"><button class="hk-btn" id="hk-hear-theme">&#9658; Hear the A theme</button></div>`),
      () => mascotSay(`<h3>The big one: sonata form</h3>
        <p>Many Beethoven pieces, like the first part of the <em>Pathétique</em> Sonata, use <strong>sonata form</strong>. It has three parts:</p>
        <ul>
          <li><strong>Exposition:</strong> two different tunes. The first is in the home key, the second in a new key.</li>
          <li><strong>Development:</strong> the tunes get broken up and moved through new keys. The most dramatic part.</li>
          <li><strong>Recapitulation:</strong> both tunes come back in the home key. Often a short ending follows, called the <strong>coda</strong>.</li>
        </ul>
        <p>Leaving home builds tension. Coming back home feels like relief.</p>`),
      () => mascotSay(`<h3>Big buildings from tiny bricks</h3>
        <p>Beethoven loved building music from a tiny idea, called a <strong>motif</strong>. The most famous is his Fifth Symphony: short-short-short-<strong>long</strong>. In Für Elise, it's the little E-D#-E-D#.</p>
        <p><strong>Tip:</strong> learn a piece <em>section by section</em>. Spot when a tune comes back (you already know it!), and practise the new-key parts extra slowly.</p>`),
    ];
    function renderStep() {
      if (kb.stopPlayAlong) kb.stopPlayAlong();
      if (step < pages.length) {
        kb.clearHighlights();
        content.innerHTML = `<p class="hk-step-indicator">${step + 1} of ${pages.length}</p>${pages[step]()}`;
        content.querySelector("#hk-hear-pull")?.addEventListener("click", hearPull);
        content.querySelector("#hk-hear-theme")?.addEventListener("click", hearTheme);
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">${step === pages.length - 1 ? "Finish" : "Next"}</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step++; renderStep(); });
      } else {
        markLessonComplete("lesson-beethoven-form");
        kb.clearHighlights();
        content.innerHTML = mascotSay(`<h3>Lesson complete.</h3>
          <p>Harmony is the chords right now. Form is the map. Next time you learn a piece, find its sections first!</p>`, "assets/mascot-poses/composer.png");
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Next lesson →</button>`;
        controls.querySelector("#hk-done").addEventListener("click", startNextLesson);
      }
    }
    renderStep = withStepBack(renderStep, { controls, kb, getState: () => ({ step }), setState: (st) => ({ step } = st) });
    renderStep();
  }

  // ----- Advanced: Bach, Prelude in C major BWV 846 (item 57) -------------
  function runBachPreludeLesson() {
    const { content, keyboardWrap, controls } = lessonShell("Bach: Prelude in C major");
    const kb = lessonKeyboard(keyboardWrap, { startMidi: 55, endMidi: 84 });
    let step = 0; // 0 intro, 1..8 bars, 9 play all, 10 done
    const SIXTEENTH = 0.2; // a comfortable practice tempo (♩ = 75)
    // One bar: in each half, the two lowest notes (left hand, held)
    // start the figure, then the top three notes go up twice.
    function barEvents(bar, offset) {
      const n = bar.notes;
      const ev = [];
      for (let half = 0; half < 2; half++) {
        const h = offset + half * 8 * SIXTEENTH;
        ev.push({ midi: n[0], start: h, dur: 8 * SIXTEENTH * 0.97, hand: "left" });
        ev.push({ midi: n[1], start: h + SIXTEENTH, dur: 7 * SIXTEENTH * 0.97, hand: "left" });
        [n[2], n[3], n[4], n[2], n[3], n[4]].forEach((midi, i) => ev.push({ midi, start: h + (2 + i) * SIXTEENTH, dur: SIXTEENTH * 0.95, hand: "right" }));
      }
      return ev;
    }
    function renderStep() {
      if (kb.stopPlayAlong) kb.stopPlayAlong();
      if (step === 0) {
        kb.clearHighlights();
        content.innerHTML = mascotSay(`
          <h3>A piece almost every pianist learns</h3>
          <p>Bach's <strong>Prelude in C major</strong> (1722) is the first piece in his <em>Well-Tempered Clavier, Book I</em>. It's mostly <strong>one pattern</strong>: a broken chord, with a new chord each bar.</p>
          <p>Your <strong>left hand</strong> (pink) plays the two lowest notes and holds them. Your <strong>right hand</strong> (blue) plays the top three notes going up, twice. Then the whole half-bar repeats.</p>
          <p>Let's learn the first 8 bars. Watch how little your hands move from bar to bar.</p>`, "assets/mascot-poses/mozart-scores.png");
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Bar 1</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step = 1; renderStep(); });
      } else if (step <= BACH_PRELUDE_C.length) {
        const bar = BACH_PRELUDE_C[step - 1];
        kb.highlightHands({ left: bar.notes.slice(0, 2), right: bar.notes.slice(2), rightLabel: bar.chord });
        content.innerHTML = `
          <p class="hk-step-indicator">Bar ${step} of ${BACH_PRELUDE_C.length}</p>
          <div class="hk-big-degree">${bar.chord}</div>
          ${mascotSay(`<p>Notes, low to high: <strong>${bar.notes.map(noteLetter).join(" - ")}</strong>.
             ${bar.chord.includes("/") ? `The "/${bar.chord.split("/")[1]}" means <strong>${bar.chord.split("/")[1]}</strong> is the lowest note.` : ""}</p>
             <p>Left hand: ${noteLetter(bar.notes[0])} and ${noteLetter(bar.notes[1])}. Right hand:
             ${bar.notes.slice(2).map(noteLetter).join(" - ")}, twice. Tap ▶ to watch, then play along.</p>`)}`;
        controls.innerHTML = `
          <button class="hk-btn" id="hk-play-bar">&#9658; Play bar ${step}</button>
          <button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">${step < BACH_PRELUDE_C.length ? `Bar ${step + 1}` : "Put it together"}</button>`;
        controls.querySelector("#hk-play-bar").addEventListener("click", () => kb.playTimeline(barEvents(bar, 0)));
        controls.querySelector("#hk-next").addEventListener("click", () => { step++; renderStep(); });
      } else if (step === BACH_PRELUDE_C.length + 1) {
        kb.clearHighlights();
        content.innerHTML = mascotSay(`<h3>All 8 bars together</h3>
          <p>${BACH_PRELUDE_C.map((b) => b.chord).join(", ")}</p>
          <p>Play along with the falling blocks. Slow is perfect! The full prelude is 35 bars, with the same pattern until the last few bars.</p>`, "assets/mascot-poses/mozart-scores.png");
        controls.innerHTML = `
          <button class="hk-btn" id="hk-play-all">&#9658; Play bars 1-8</button>
          <button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Finish</button>`;
        controls.querySelector("#hk-play-all").addEventListener("click", () => {
          kb.playTimeline(BACH_PRELUDE_C.flatMap((bar, i) => barEvents(bar, i * 16 * SIXTEENTH)));
        });
        controls.querySelector("#hk-next").addEventListener("click", () => { step++; renderStep(); });
      } else {
        markLessonComplete("lesson-bach-prelude");
        kb.clearHighlights();
        content.innerHTML = mascotSay(`<h3>You've played real Bach.</h3>
          <p>Eight bars of one of the most famous keyboard pieces ever! Keep going with a free score (like IMSLP). The pattern stays the same almost to the end.</p>`,
          "assets/mascot-poses/maestro-conducting.png");
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Next lesson →</button>`;
        controls.querySelector("#hk-done").addEventListener("click", startNextLesson);
      }
    }
    renderStep = withStepBack(renderStep, { controls, kb, getState: () => ({ step }), setState: (st) => ({ step } = st) });
    renderStep();
  }

  // ===== Item 59: wait mode, sheet music, hands/looping, daily review =====

  // Input sources row: on-screen + laptop keys always work; a MIDI
  // keyboard (Chromium browsers) and the mic (single notes) are opt-in.
  function inputSourcesHtml({ allowMic }) {
    return `<div class="hk-pp-row">
      <span class="hk-speed-label">Play with:</span>
      <span class="hk-input-status">on-screen keys · laptop keys</span>
      ${midiSupported() ? `<button class="hk-btn hk-btn-small" data-input="midi">🎹 Connect MIDI keyboard</button>`
        : `<span class="hk-input-status">(MIDI keyboards: use Chrome, Edge or Firefox on a computer)</span>`}
      ${allowMic ? `<button class="hk-btn hk-btn-small" data-input="mic">🎤 ${micOn() ? "Mic on" : "Use microphone"}</button>` : ""}
      <span class="hk-input-status" id="hk-input-msg"></span>
    </div>`;
  }
  function wireInputSources(scope) {
    const msg = scope.querySelector("#hk-input-msg");
    scope.querySelector('[data-input="midi"]')?.addEventListener("click", async (e) => {
      const status = await enableMidi();
      const names = connectedMidiNames();
      msg.textContent = status === "ready"
        ? (names.length ? `Connected: ${names.join(", ")}` : "MIDI is on. Plug in or switch on your keyboard.")
        : status === "denied" ? "MIDI access was blocked by the browser." : "This browser doesn't support MIDI keyboards.";
      if (status === "ready") e.target.textContent = "🎹 MIDI on";
    });
    scope.querySelector('[data-input="mic"]')?.addEventListener("click", async (e) => {
      if (micOn()) {
        disableMic();
        e.target.textContent = "🎤 Use microphone";
        msg.textContent = "";
        return;
      }
      try {
        await enableMic();
        onLessonExit(disableMic); // never leave the mic on after the lesson
        e.target.textContent = "🎤 Mic on";
        msg.textContent = "Listening! Play one note at a time (the mic can't hear chords well).";
      } catch (err) {
        msg.textContent = `Microphone unavailable (${err.message}).`;
      }
    });
  }

  // A full practice panel: input sources, mode / hands / loop / speed
  // controls, optional sheet music that follows along, and a result.
  function mountPracticePanel(container, kb, piece, {
    modes = ["wait"], hands = false, loop = false, allowMic = false, staff = false, hints = true, onResult,
  } = {}) {
    let player = null;
    let opts = { mode: modes[0], hands: "both", from: 0, to: piece.bars - 1, loopOn: false, speed: 1, hints };
    const barOptions = (sel) => Array.from({ length: piece.bars }, (_, i) => `<option value="${i}" ${i === sel ? "selected" : ""}>${i + 1}</option>`).join("");
    container.innerHTML = `
      ${inputSourcesHtml({ allowMic })}
      ${modes.length > 1 ? `<div class="hk-pp-row"><span class="hk-speed-label">Mode:</span>
        ${modes.map((m) => `<button class="hk-speed-btn ${m === opts.mode ? "hk-speed-active" : ""}" data-pmode="${m}">${m === "wait" ? "⏸ Wait for me" : "⏱ Play in time"}</button>`).join("")}</div>` : ""}
      ${hands ? `<div class="hk-pp-row"><span class="hk-speed-label">Hands:</span>
        ${["both", "left", "right"].map((h) => `<button class="hk-speed-btn ${h === "both" ? "hk-speed-active" : ""}" data-phand="${h}">${h === "both" ? "Both" : h === "left" ? "Left only (app plays right)" : "Right only (app plays left)"}</button>`).join("")}</div>` : ""}
      ${loop ? `<div class="hk-pp-row"><span class="hk-speed-label">Bars:</span>
        <select data-pfrom>${barOptions(0)}</select> to <select data-pto>${barOptions(piece.bars - 1)}</select>
        <label class="hk-input-status"><input type="checkbox" data-ploop /> Loop these bars</label></div>` : ""}
      <div class="hk-pp-row"><span class="hk-speed-label">Speed:</span>
        ${[0.5, 0.75, 1].map((sp) => `<button class="hk-speed-btn ${sp === 1 ? "hk-speed-active" : ""}" data-pspeed="${sp}">${sp === 1 ? "Normal" : sp === 0.5 ? "Slow" : "0.75×"}</button>`).join("")}
        <button class="hk-btn hk-btn-primary" data-pstart>▶ Start</button>
      </div>
      ${staff ? `<div class="hk-staff-scroll" data-pstaff></div>` : ""}
      <p class="hk-combo" data-pcombo></p>
      <p class="hk-pp-score" data-pscore></p>`;
    wireInputSources(container);
    const staffEl = container.querySelector("[data-pstaff]");
    const scoreEl = container.querySelector("[data-pscore]");
    const startBtn = container.querySelector("[data-pstart]");
    function drawStaff(state) {
      if (!staffEl) return;
      const per = 4;
      const lo = loop ? opts.from : 0;
      const bar = state ? state.bar : lo;
      const sysFrom = Math.max(0, Math.min(piece.bars - per, Math.floor(bar / per) * per));
      staffEl.innerHTML = renderGrandStaff(piece, {
        fromBar: sysFrom,
        toBar: Math.min(piece.bars, sysFrom + per),
        current: state ? state.current : new Set(),
        done: state ? state.done : new Set(),
        dimHand: opts.hands === "both" ? null : opts.hands === "left" ? "right" : "left",
      });
    }
    drawStaff(null);
    function stop() {
      if (player) player.stop();
      player = null;
      startBtn.textContent = "▶ Start";
    }
    function start() {
      stop();
      scoreEl.textContent = opts.mode === "wait" ? "Play the lit keys as the blocks land. The music waits for you." : "Hit each note as its block lands. Ready…";
      const from = Number(opts.from);
      const to = Math.max(from + 1, Number(opts.to) + 1);
      const useLoop = loop && (opts.loopOn || from > 0 || to < piece.bars);
      player = createPracticePlayer({
        kb,
        piece,
        mode: opts.mode,
        hands: opts.hands,
        loop: useLoop ? [from, to] : null,
        speed: opts.speed,
        showKeyHints: opts.hints,
        onStep: (st) => {
          drawStaff(st);
          const c = container.querySelector("[data-pcombo]");
          if (c) c.textContent = st.stats.combo >= 5 ? `🔥 Combo ×${st.stats.combo}` : "";
          if (opts.loopOn && st.stats.loops) scoreEl.textContent = `Loop ${st.stats.loops + 1}: keep going, or press Stop when it feels easy.`;
        },
        onFinish: (r) => {
          startBtn.textContent = "▶ Again";
          player = null;
          scoreEl.textContent = opts.mode === "wait"
            ? `Done! ${r.right} right, ${r.wrong} wrong key${r.wrong === 1 ? "" : "s"}. ${r.cleanSteps} of ${r.steps} played first try (${r.accuracy}% accuracy).`
            : `Score: ${r.hits} of ${r.hits + r.misses} notes on time (${r.accuracy}%).${r.timing.length ? ` On average you were ${Math.abs(r.avgTimingMs)}ms ${r.avgTimingMs > 0 ? "late" : "early"}.` : ""}${r.wrong ? ` ${r.wrong} extra/wrong key${r.wrong === 1 ? "" : "s"}.` : ""}`;
          // Item 60: stars (best per piece+mode), XP and the practice quest.
          const stars = starsFor(r.accuracy);
          const { best, improved } = recordStars(`${piece.id}|${opts.mode}|${opts.hands}`, stars);
          scoreEl.innerHTML = `<span class="hk-stars">${"★".repeat(stars)}${"☆".repeat(3 - stars)}</span> ${scoreEl.textContent}
            ${r.maxCombo >= 5 ? ` Best combo: ×${r.maxCombo}.` : ""}${improved && best > 0 ? " New best!" : ""}`;
          awardXp(5 + stars * 5, `${stars} star${stars === 1 ? "" : "s"}: ${piece.title}`);
          if (r.accuracy >= 80) completeQuest("practice");
          if (onResult) onResult(r, opts);
        },
      });
      player.start();
      startBtn.textContent = "■ Stop";
    }
    startBtn.addEventListener("click", () => (player ? stop() : start()));
    const pick = (attr, key, conv = (v) => v) => container.querySelectorAll(`[${attr}]`).forEach((b) => b.addEventListener("click", () => {
      opts[key] = conv(b.getAttribute(attr));
      container.querySelectorAll(`[${attr}]`).forEach((x) => x.classList.toggle("hk-speed-active", x === b));
      if (player) start();
      drawStaff(null);
    }));
    pick("data-pmode", "mode");
    pick("data-phand", "hands");
    pick("data-pspeed", "speed", Number);
    container.querySelector("[data-pfrom]")?.addEventListener("change", (e) => { opts.from = Number(e.target.value); if (opts.to < opts.from) opts.to = opts.from; drawStaff(null); });
    container.querySelector("[data-pto]")?.addEventListener("change", (e) => { opts.to = Number(e.target.value); drawStaff(null); });
    container.querySelector("[data-ploop]")?.addEventListener("change", (e) => { opts.loopOn = e.target.checked; });
    onLessonExit(stop);
    return { stop };
  }

  // Simple multi-page lesson shell for the new lessons: pages are
  // functions that fill `content` (and may mount panels); Back works.
  function runPagedLesson(lessonId, title, range, pages, doneHtml) {
    const { content, keyboardWrap, controls } = lessonShell(title);
    const kb = lessonKeyboard(keyboardWrap, range);
    registerComputerKeyboardTarget(kb, keyboardWrap);
    let step = 0;
    let panel = null;
    function renderStep() {
      if (panel) panel.stop();
      panel = null;
      if (kb.stopPlayAlong) kb.stopPlayAlong();
      kb.clearHighlights();
      if (step < pages.length) {
        content.innerHTML = `<p class="hk-step-indicator">${step + 1} of ${pages.length}</p><div data-page></div>`;
        panel = pages[step](content.querySelector("[data-page]"), kb) || null;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">${step === pages.length - 1 ? "Finish" : "Next"}</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => { step++; renderStep(); });
      } else {
        markLessonComplete(lessonId);
        content.innerHTML = doneHtml;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Next lesson →</button>`;
        controls.querySelector("#hk-done").addEventListener("click", startNextLesson);
      }
    }
    renderStep = withStepBack(renderStep, { controls, kb, getState: () => ({ step }), setState: (st) => ({ step } = st) });
    renderStep();
  }

  // ----- Intermediate: wait mode ---------------------------------------------
  function runWaitModeLesson() {
    runPagedLesson("lesson-waitmode", "Wait mode: the music waits for you", { startMidi: 48, endMidi: 79 }, [
      (el) => {
        el.innerHTML = mascotSay(`<h3>Play at your own pace</h3>
          <p>In <strong>wait mode</strong> the blocks <strong>stop at the keys</strong> until you press the right ones.
             Right keys flash green, wrong keys flash red.</p>
          <p>Use the on-screen keys, your laptop keys, a <strong>MIDI keyboard</strong> (Chrome, Edge or Firefox on a
             computer), or the <strong>microphone</strong> for single notes on any piano.</p>`, "assets/mascot-poses/metronome.png");
      },
      (el, kb) => {
        el.innerHTML = mascotSay(`<h3>1. A melody: Ode to Joy</h3>
          <p>Right hand, one note at a time. It's the tune you met earlier, now with its real rhythm.
             The microphone works here too.</p>`) + `<div data-panel></div>`;
        return mountPracticePanel(el.querySelector("[data-panel]"), kb, ODE_MELODY_ONLY, { allowMic: true });
      },
      (el, kb) => {
        el.innerHTML = mascotSay(`<h3>2. Chords: G - D - Em - C</h3>
          <p>Your first four chords. Press all three lit keys (one at a time is fine, it waits for all three).
             The mic can't hear chords well, so use the keys or MIDI here.</p>`) + `<div data-panel></div>`;
        return mountPracticePanel(el.querySelector("[data-panel]"), kb, LESSON1_CHORD_DRILL, {});
      },
    ], mascotSay(`<h3>Lesson complete.</h3><p>Wait mode is the best way to learn a new piece: no pressure, no rushing.
       Later, a harder mode won't wait for you.</p>`, "assets/mascot-poses/maestro-conducting.png"));
  }

  // ----- Advanced: play in time (harder wait mode) -------------------------
  function runTimedLesson() {
    runPagedLesson("lesson-timed", "Play in time: no waiting", { startMidi: 41, endMidi: 84 }, [
      (el) => {
        el.innerHTML = mascotSay(`<h3>This time, the music won't wait</h3>
          <p>The blocks keep falling. Press each note within a quarter of a second of it landing, or it's a miss.
             You'll get a score, and see if you play early or late.</p>
          <p>The <strong>key hints are off</strong>. Only the falling blocks and the sheet music show what's next.</p>
          <p class="hk-honest-note">Learn a piece in wait mode first. Start at 50% speed and get 90% or more
             before speeding up.</p>`, "assets/mascot-poses/metronome.png");
      },
      (el, kb) => {
        el.innerHTML = mascotSay(`<h3>Ode to Joy: both hands, in time</h3>`) + `<div data-panel></div>`;
        return mountPracticePanel(el.querySelector("[data-panel]"), kb, ODE_TO_JOY, { modes: ["timed", "wait"], hands: true, staff: true, hints: false });
      },
      (el, kb) => {
        el.innerHTML = mascotSay(`<h3>Bach's Prelude, bars 1-4, in time</h3>
          <p>Keep the notes steady and try 50% first. Even is better than fast.</p>`) + `<div data-panel></div>`;
        return mountPracticePanel(el.querySelector("[data-panel]"), kb, BACH_PRELUDE_SHEET, { modes: ["timed", "wait"], hands: true, staff: true, hints: false });
      },
    ], mascotSay(`<h3>Lesson complete.</h3><p>Playing in time from the music, with no hints. That's real performance practice!</p>`,
      "assets/mascot-poses/maestro-conducting.png"));
  }

  // ----- Advanced: reading sheet music -------------------------------------
  function miniPiece(notes, hand, title = "") {
    return { title, beatsPerBar: notes.length, beatUnit: 4, bars: 1, keySig: [], events: notes.map((m, i) => ({ midi: m, start: i, dur: 1, hand })) };
  }
  function staffBox(piece, opts = {}) {
    return `<div class="hk-staff-scroll">${renderGrandStaff(piece, { showTime: false, ...opts })}</div>`;
  }
  const letterOf = (m) => midiToName(m).replace(/-?\d+$/, "");

  function runSheetMusicLesson() {
    const NOTE_QUIZ = [
      ...[60, 62, 64, 65, 67, 69, 71, 72, 74, 76, 77, 79].map((m) => ({ midi: m, hand: "right" })),
      ...[43, 45, 47, 48, 50, 52, 53, 55, 57, 59].map((m) => ({ midi: m, hand: "left" })),
    ];
    runPagedLesson("lesson-sheet", "Reading sheet music", { startMidi: 41, endMidi: 81 }, [
      (el) => {
        el.innerHTML = mascotSay(`<h3>Sheet music is a map of the keys</h3>
          <p>Music is written on a <strong>staff</strong>: 5 lines with 4 spaces between them. Each line and each
             space is one white key.</p>
          <p><strong>Higher on the staff = higher on the keyboard</strong> (further right). Each step up is the next
             letter: C, D, E, F, G, A, B, then C again.</p>
          <p>Piano music uses <strong>two staffs</strong> joined together, called the "grand staff". The top one is
             mostly for your <strong>right hand</strong>, the bottom one for your <strong>left hand</strong>.</p>`, "assets/mascot-poses/sheet-music-pile.png")
          + staffBox(miniPiece([60, 62, 64, 65, 67, 69, 71, 72], "right"), { labels: letterOf });
      },
      (el) => {
        el.innerHTML = mascotSay(`<h3>The treble clef (top staff)</h3>
          <p>The curly <strong>treble clef</strong> 𝄞 is also called the <strong>G clef</strong>. Its curl wraps around
             the 2nd line from the bottom, and that line is <strong>G</strong> (just above Middle C).</p>
          <p>The 5 lines, bottom to top: <strong>E G B D F</strong>, "<em>Every Good Boy Does Fine</em>".
             The 4 spaces spell <strong>F A C E</strong>, "FACE".</p>`)
          + staffBox(miniPiece([64, 67, 71, 74, 77], "right"), { labels: letterOf })
          + staffBox(miniPiece([65, 69, 72, 76], "right"), { labels: letterOf });
      },
      (el) => {
        el.innerHTML = mascotSay(`<h3>The bass clef (bottom staff)</h3>
          <p>The <strong>bass clef</strong> 𝄢 is also called the <strong>F clef</strong>. Its two dots sit either side of
             the 2nd line from the top, and that line is <strong>F</strong> (just below Middle C).</p>
          <p>The 5 lines, bottom to top: <strong>G B D F A</strong>, "<em>Good Boys Do Fine Always</em>".
             The 4 spaces: <strong>A C E G</strong>, "<em>All Cows Eat Grass</em>".</p>`)
          + staffBox(miniPiece([43, 47, 50, 53, 57], "left"), { labels: letterOf })
          + staffBox(miniPiece([45, 48, 52, 55], "left"), { labels: letterOf });
      },
      (el, kb) => {
        kb.highlightChord([60], { number: "C", letter: "middle", rootMidi: 60 });
        el.innerHTML = mascotSay(`<h3>Middle C sits in between</h3>
          <p><strong>Middle C</strong> sits on its own short line, a <strong>ledger line</strong>, right between the
             two staffs. Ledger lines let music go higher or lower than the 5 lines.</p>
          <p>Use three landmarks: <strong>treble G</strong> (the clef's curl), <strong>bass F</strong>
             (between the clef's dots) and <strong>Middle C</strong>. Find the nearest one, then count steps.</p>`)
          + staffBox({ title: "Middle C", beatsPerBar: 2, beatUnit: 4, bars: 1, keySig: [], events: [{ midi: 60, start: 0, dur: 1, hand: "right" }, { midi: 60, start: 1, dur: 1, hand: "left" }] }, { labels: () => "C" });
      },
      (el) => {
        el.innerHTML = mascotSay(`<h3>Rhythm: how long notes last</h3>
          <ul>
            <li><strong>Whole note</strong> (hollow, no stem): 4 beats</li>
            <li><strong>Half note</strong> (hollow, with a stem): 2 beats</li>
            <li><strong>Quarter note</strong> (filled, with a stem): 1 beat</li>
            <li><strong>Eighth note</strong> (1 flag): ½ beat. <strong>Sixteenth</strong> (2 flags): ¼ beat.
                Often these are joined by beams instead of flags.</li>
            <li>A <strong>dot</strong> after a note adds half its length: a dotted half = 3 beats.</li>
            <li><strong>Rests</strong> are the same lengths, but silent.</li>
          </ul>
          <p>The <strong>time signature</strong> sits at the start. The top number is how many beats are in each bar.
             The bottom number says which note gets one beat (4 = a quarter note).</p>
          <p><strong>4/4</strong> = four beats per bar. <strong>3/4</strong> = three, like a waltz.</p>
          <p class="hk-honest-note">Tip: before playing a new piece, clap its rhythm while counting "1, 2, 3,
             4". Rhythm first, then notes.</p>`)
          + staffBox({ title: "Note values", beatsPerBar: 4, beatUnit: 4, bars: 4, keySig: [], events: [
              { midi: 67, start: 0, dur: 4, hand: "right" },
              { midi: 67, start: 4, dur: 2, hand: "right" }, { midi: 67, start: 6, dur: 2, hand: "right" },
              ...[8, 9, 10, 11].map((t) => ({ midi: 67, start: t, dur: 1, hand: "right" })),
              ...[12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5].map((t) => ({ midi: 67, start: t, dur: 0.5, hand: "right" })),
            ] }, { showTime: true });
      },
      (el) => {
        el.innerHTML = mascotSay(`<h3>Sharps, flats and chords</h3>
          <p>A <strong>♯ sharp</strong> means play the key just to the right (often black). A <strong>♭ flat</strong>
             means the key just to the left. A <strong>♮ natural</strong> cancels them.</p>
          <p>A <strong>key signature</strong> (sharps or flats right after the clef) changes every note with that
             letter. One ♯ on the F line means every F is F♯, like in the key of G.</p>
          <p>Notes <strong>stacked</strong> on one stem are played <strong>together</strong>: that's a chord. Read them
             bottom to top. Three notes on line-line-line (or space-space-space) make a triad:</p>`)
          + staffBox({ title: "Chords", beatsPerBar: 4, beatUnit: 4, bars: 1, keySig: [], events: [
              ...[67, 71, 74].map((m) => ({ midi: m, start: 0, dur: 2, hand: "right" })),
              ...[60, 64, 67].map((m) => ({ midi: m, start: 2, dur: 2, hand: "right" })),
            ] }, { labels: letterOf });
      },
      (el, kb) => {
        let i = 0;
        let right = 0;
        const order = NOTE_QUIZ.map((x) => [Math.random(), x]).sort((a, b) => a[0] - b[0]).map((x) => x[1]).slice(0, 10);
        let unsub = null;
        function show() {
          if (unsub) unsub();
          if (i >= order.length) {
            el.innerHTML = mascotSay(`<h3>${right} of ${order.length} first try.</h3><p>${right >= 8 ? "You're reading music!" : "Reading gets faster with practice. The daily review will keep quizzing you."}</p>`);
            return;
          }
          const n = order[i];
          el.innerHTML = mascotSay(`<h3>Note-reading quiz: ${i + 1} of ${order.length}</h3>
            <p>Play this <strong>exact</strong> key. Check which staff it's on, and use the landmarks.</p>`)
            + staffBox(miniPiece([n.midi], n.hand)) + `<p class="hk-quiz-feedback" data-fb></p>`;
          const fb = el.querySelector("[data-fb]");
          let first = true;
          unsub = onNoteOn((midi) => {
            if (midi === n.midi) {
              if (first) right++;
              fb.textContent = `Yes, ${letterOf(midi)}!`;
              fb.className = "hk-quiz-feedback hk-quiz-feedback-correct";
              unsub();
              unsub = null;
              i++;
              setTimeout(show, 700);
            } else {
              first = false;
              fb.textContent = midi % 12 === n.midi % 12 ? "Right letter, wrong octave." : `That's ${letterOf(midi)}. Try again.`;
              fb.className = "hk-quiz-feedback hk-quiz-feedback-wrong";
            }
          });
        }
        show();
        return { stop: () => unsub && unsub() };
      },
    ], mascotSay(`<h3>Lesson complete: you can read music!</h3>
      <p>Next: real pieces from sheet music, with the falling blocks to help.</p>`, "assets/mascot-poses/sheet-music-pile.png"));
  }

  // ----- Advanced: play songs from the sheet music -------------------------
  function runSheetSongLesson(lessonId, piece, { hands }) {
    runPagedLesson(lessonId, `Sheet music: ${piece.title}`, { startMidi: piece.id === "minuet" ? 55 : 41, endMidi: piece.id === "minuet" ? 84 : 81 }, [
      (el, kb) => {
        el.innerHTML = mascotSay(`<h3>${piece.title} by ${piece.composer}</h3>
          <p>Read along on the sheet music. Your notes light up <strong style="color:var(--hk-accent)">blue</strong>,
             and finished ones turn grey. The falling blocks show the same notes. It's in
             <strong>${piece.beatsPerBar}/${piece.beatUnit}</strong>${piece.keySig.length ? " with one sharp (F♯) in the key signature" : ""}.</p>
          <p class="hk-honest-note">Keep your eyes on the music, not the blocks. Start in wait mode, then try
             "Play in time" when it's easy.</p>`, "assets/mascot-poses/sheet-music-pile.png") + `<div data-panel></div>`;
        return mountPracticePanel(el.querySelector("[data-panel]"), kb, piece, { modes: ["wait", "timed"], hands, staff: true });
      },
    ], mascotSay(`<h3>Lesson complete.</h3><p>You played ${piece.title} from real sheet music.</p>`, "assets/mascot-poses/maestro-conducting.png"));
  }

  // ----- Advanced: hands separately + looping ------------------------------
  function runHandsLoopLesson() {
    runPagedLesson("lesson-handsloop", "Hands separately & looping", { startMidi: 41, endMidi: 84 }, [
      (el) => {
        el.innerHTML = mascotSay(`<h3>How pianists learn hard pieces.</h3>
          <ol>
            <li><strong>Hands separately first.</strong> Learn the right hand, then the left. The app plays
                the other hand (faded blocks), so you still hear the whole piece.</li>
            <li><strong>Loop the hard bars.</strong> Don't restart from the top. Pick the 1-2 bars that
                trip you up and repeat just those.</li>
            <li><strong>Slow down.</strong> Use 50-75% speed, then build back up.</li>
            <li><strong>Then hands together</strong>, still looping and slow at first.</li>
          </ol>`, "assets/mascot-poses/metronome.png");
      },
      (el, kb) => {
        el.innerHTML = mascotSay(`<h3>Bach, Prelude in C: bars 1-8</h3>
          <p>Try: <strong>Left only</strong>, bars 5-6, loop on, 75%. Then Right only. Then Both.</p>`) + `<div data-panel></div>`;
        return mountPracticePanel(el.querySelector("[data-panel]"), kb, BACH_PRELUDE_8, { modes: ["wait", "timed"], hands: true, loop: true, staff: true });
      },
      (el, kb) => {
        el.innerHTML = mascotSay(`<h3>Ode to Joy: both hands</h3>
          <p>Loop bars 3-4 (the dotted rhythm) with both hands until it's even.</p>`) + `<div data-panel></div>`;
        return mountPracticePanel(el.querySelector("[data-panel]"), kb, ODE_TO_JOY, { modes: ["wait", "timed"], hands: true, loop: true, staff: true });
      },
    ], mascotSay(`<h3>Lesson complete.</h3><p>Separate hands, loop the hard part, slow it down, then put it back together.
       Use this on every new piece!</p>`, "assets/mascot-poses/maestro-conducting.png"));
  }

  // ----- Advanced: Tom and Jerry's concert pieces (item 60) ---------------
  function runTomJerryLesson() {
    const C_SHARP_MINOR = [49, 61, 64, 68]; // C#3 + C#4 E4 G#4
    const F_SHARP_MAJOR = [42, 66, 70, 73]; // F#2 + F#4 A#4 C#5
    runPagedLesson("lesson-tomjerry", "Tom and Jerry's concert pieces", { startMidi: 40, endMidi: 81 }, [
      (el, kb) => {
        el.innerHTML = mascotSay(`<h3>The Cat Concerto (1947)</h3>
          <p>In this Oscar-winning cartoon, Tom is a concert pianist playing <strong>Franz Liszt's Hungarian Rhapsody
             No. 2</strong>, while Jerry, who lives inside the piano, tries to ruin it. Bugs Bunny played the same
             piece in <em>Rhapsody Rabbit</em> (1946).</p>
          <p>Who really played the piano? The credits name concert pianist <strong>Jakob Gimpel</strong>.
             Pianist <strong>Calvin Jackson</strong> also recorded piano for it, uncredited.
             Gimpel also played for <em>Rhapsody Rabbit</em>.</p>
          <p>Liszt wrote it in <strong>1847</strong>. It has two parts: a slow, dramatic <strong>lassan</strong> in
             <strong>C♯ minor</strong>, then a wild, fast <strong>friska</strong> that ends in <strong>F♯ major</strong>.</p>
          <div class="hk-pedal-buttons">
            <button class="hk-btn" data-hear="lassan">&#9658; The lassan's home: C♯ minor</button>
            <button class="hk-btn" data-hear="friska">&#9658; The friska's finish: F♯ major</button>
          </div>
          <p class="hk-honest-note">It's a showpiece for expert pianists, far beyond this course, so here you'll hear
             its two home chords.</p>`, "assets/mascot-poses/grand-piano.png");
        el.addEventListener("click", (e) => {
          const which = e.target.closest("[data-hear]")?.dataset.hear;
          if (which === "lassan") {
            kb.highlightHands({ left: [C_SHARP_MINOR[0]], right: C_SHARP_MINOR.slice(1), rightLabel: "C#m" });
            playChord(C_SHARP_MINOR, { duration: 2 });
          } else if (which === "friska") {
            kb.highlightHands({ left: [F_SHARP_MAJOR[0]], right: F_SHARP_MAJOR.slice(1), rightLabel: "F#" });
            playChord(F_SHARP_MAJOR, { duration: 2 });
          }
        });
      },
      (el, kb) => {
        el.innerHTML = mascotSay(`<h3>Johann Mouse (1953)</h3>
          <p>Tom and Jerry's last Oscar winner is all about the waltzes of <strong>Johann Strauss II</strong>, the "Waltz
             King" of Vienna. His most famous waltz is <em>The Blue Danube</em> (1866). Concert pianist
             <strong>Jakob Gimpel</strong> arranged and played the piano part.</p>
          <p>Every waltz is in <strong>3/4</strong> and uses the same left-hand trick: <strong>"oom-pah-pah"</strong>.
             A low bass note on beat 1, then the chord on beats 2 and 3.</p>
          <p>Try it in D: bass D, then the D chord twice. Then A, then the A7 chord twice. The music waits for you.</p>`, "assets/mascot-poses/maestro-conducting.png")
          + `<div data-panel></div>`;
        return mountPracticePanel(el.querySelector("[data-panel]"), kb, WALTZ_PATTERN, { modes: ["wait", "timed"], hands: true, staff: true });
      },
    ], mascotSay(`<h3>Lesson complete.</h3><p>Next time you watch The Cat Concerto, listen for the slow
       lassan turning into the racing friska. And now you know the left-hand secret behind every Strauss waltz!</p>`, "assets/mascot-poses/maestro-conducting.png"));
  }

  // ----- Optional: World songs (item 60) -----------------------------------
  function runWorldIntro() {
    const { content, keyboardWrap, controls } = lessonShell("World songs");
    keyboardWrap.innerHTML = "";
    content.innerHTML = mascotSay(`<h3>The same chords, all over the world</h3>
      <p>Every language uses the same 12 notes and the same chord shapes you've learned. A G chord is a G chord in
         Tokyo, Rio and Paris!</p>
      <p>Each lesson here has five popular songs in one language. Pick the ones you like and skip the rest: none
         of them lock anything.</p>
      <p class="hk-honest-note">Each song shows its main repeating chords.</p>`, "assets/mascot-poses/dreaming-notes.png")
      + `<div class="hk-choose-list">${WORLD_LANGUAGES.map((l) => `<button class="hk-btn hk-choose-btn" data-world="${l.slug}">${l.flag} ${l.name}</button>`).join("")}</div>`;
    content.querySelectorAll("[data-world]").forEach((b) => b.addEventListener("click", () => {
      markLessonComplete("lesson-world-intro");
      startLesson(`lesson-world-${b.dataset.world}`);
    }));
    controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Next lesson →</button>`;
    controls.querySelector("#hk-done").addEventListener("click", startNextLesson);
  }

  function runWorldLesson(lesson) {
    const songs = SONGS.filter((s) => s.world === lesson.world || s.alsoWorld === lesson.world);
    const lang = WORLD_LANGUAGES.find((l) => l.name === lesson.world);
    const { content, keyboardWrap, controls } = lessonShell(`${lang ? lang.flag + " " : ""}World songs: ${lesson.world}`);
    const kb = lessonKeyboard(keyboardWrap, { startMidi: 41, endMidi: 84 });
    function list() {
      kb.clearHighlights();
      content.innerHTML = mascotSay(`<h3>${lang ? lang.flag + " " : ""}${lesson.world}: pick a song</h3>
        <p>Each one plays chord by chord with the falling blocks, just like every song in the app.</p>`, "assets/mascot-poses/dreaming-notes.png")
        + `<div class="hk-choose-list">${songs.map((s, i) => `<button class="hk-btn hk-choose-btn" data-i="${i}">${s.title} - ${s.artist}${s.year ? ` (${s.year})` : ""}
            <span class="hk-choose-chords">Key: ${s.key} · ${s.chords.join(" · ")}${s.confidence !== "confirmed" ? " · chords may vary" : ""}</span></button>`).join("")}</div>`;
      content.querySelectorAll("[data-i]").forEach((b) => b.addEventListener("click", () => play(songs[Number(b.dataset.i)])));
      controls.innerHTML = `<button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-done">Next lesson →</button>`;
      controls.querySelector("#hk-done").addEventListener("click", startNextLesson);
    }
    function play(song) {
      let idx = 0;
      function render() {
        if (kb.stopPlayAlong) kb.stopPlayAlong();
        if (idx < song.chords.length) {
          const symbol = song.chords[idx];
          const notes = chordSymbolToMidi(symbol);
          kb.highlightChord(notes, { letter: symbol, rootMidi: notes[0] });
          playChord(notes, { delay: 0.1 });
          content.innerHTML = `<p class="hk-step-indicator">${song.title}: chord ${idx + 1} of ${song.chords.length}</p>
            ${mascotSay(`${idx === 0 ? `<p><strong>${song.title}</strong> by ${song.artist}. ${song.notes}</p>` : ""}
              <p><strong>Press and hold ${symbol}.</strong></p>`)}`;
          controls.innerHTML = `<button class="hk-btn" id="hk-list">&larr; Songs</button>
            <button class="hk-btn hk-btn-primary hk-btn-lesson-next" id="hk-next">Next chord</button>`;
          controls.querySelector("#hk-next").addEventListener("click", () => { idx++; render(); });
          controls.querySelector("#hk-list").addEventListener("click", list);
          addPlayAlongButton(controls, kb, song.chords);
        } else {
          markLessonComplete(lesson.id);
          markSongStatus(song.title, "completed");
          kb.clearHighlights();
          content.innerHTML = mascotSay(`<h3>You played "${song.title}"!</h3><p>Try another ${lesson.world} song, or another language.</p>`);
          controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-list">Another ${lesson.world} song</button>
            <button class="hk-btn" id="hk-done">Next lesson →</button>`;
          controls.querySelector("#hk-list").addEventListener("click", list);
          controls.querySelector("#hk-done").addEventListener("click", startNextLesson);
          addPlayAlongButton(controls, kb, song.chords, "Now play it in time");
        }
      }
      render();
    }
    list();
  }

  // ----- Daily review (not a numbered lesson) -------------------------------
  function runDailyReview() {
    const { content, keyboardWrap, controls } = lessonShell(DAILY_REVIEW_TITLE);
    const kb = lessonKeyboard(keyboardWrap, { startMidi: 41, endMidi: 81 });
    registerComputerKeyboardTarget(kb, keyboardWrap);
    runDailyReviewSession({ content, controls, kb, mascotSay, onExit: showMap, onLessonExit });
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
    const next = LESSONS.find((l) => !l.optional && !l.pre && !isLessonComplete(l.id));
    if (next) startLesson(next.id);
    else showMap(); // everything complete — show the full map instead
  }

  showMap();

  // Exposed so the tab router can refresh the streak/daily-goal/badges
  // display when returning to this tab — but only if the user is
  // currently sitting on the map (checking a badge chip's title
  // shouldn't yank someone back out of an in-progress lesson).
  return {
    refresh() {
      if (root.querySelector(".hk-today")) showMap();
      else renderSidebar();
    },
    open(id) {
      startLesson(id);
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

export { renderRoadmapTab, initLessonsTab, courseProgress, MICRO_CARDS };
