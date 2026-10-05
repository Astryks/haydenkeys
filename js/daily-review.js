// Item 59: the 2-minute daily review — short, daily, spaced practice of
// things you've ALREADY learned (short daily practice beats occasional
// long sessions, and spacing reviews out makes them stick).
//
// Items come only from completed lessons: chords you've learned ("play
// the D chord"), finding notes ("find any F#"), reading notes on the
// staff (after "Reading sheet music"), and naming chords by ear (after
// the chord quiz). Scheduling is a simple Leitner system: get an item
// right and it moves up a box and comes back later (1, 2, 4, 7, 14, 30
// days); miss it and it drops to box 0 and comes back today. Stored in
// localStorage like everything else in the app.

import { isLessonComplete, getSavedSongs, recordDailyProgress } from "./storage.js";
import { chordSymbolToMidi, parseChordSymbol } from "./chord-utils.js";
import { SONGS } from "./songs-data.js";
import { onNoteOn } from "./input-hub.js";
import { playChord } from "./keyboard.js";
import { renderGrandStaff } from "./staff.js";

const STORE_KEY = "hk_review";
const DAY_KEY = "hk_review_day";
const INTERVALS = [0, 1, 2, 4, 7, 14, 30];
const SESSION_SEC = 120;
const NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

function localDay(offset = 0) {
  const n = new Date();
  const d = new Date(n.getFullYear(), n.getMonth(), n.getDate() + offset);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function load() {
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY) || "{}");
  } catch (e) {
    return {};
  }
}
function save(state) {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(state));
  } catch (e) {
    // private mode: the review still works, it just won't remember spacing
  }
}
function reviewDoneToday() {
  try {
    return localStorage.getItem(DAY_KEY) === localDay();
  } catch (e) {
    return false;
  }
}
function markDoneToday() {
  try {
    localStorage.setItem(DAY_KEY, localDay());
  } catch (e) {
    // ignore
  }
}

// Simple major/minor triads only — the shapes a review can fairly ask for.
function isSimpleTriad(sym) {
  return /^[A-G](#|b)?m?$/.test(sym) && parseChordSymbol(sym);
}

function availableItems() {
  const items = [];
  const chords = new Set();
  if (isLessonComplete("lesson-1")) ["G", "D", "Em", "C"].forEach((c) => chords.add(c));
  if (isLessonComplete("lesson-lastchristmas")) ["D", "Bm", "Em", "A"].forEach((c) => chords.add(c));
  if (isLessonComplete("lesson-5")) chords.add("Am");
  const saved = getSavedSongs();
  SONGS.forEach((s) => {
    if (saved[s.title]?.status === "completed") s.chords.filter(isSimpleTriad).forEach((c) => chords.add(c));
  });
  chords.forEach((c) => items.push({ id: `chord:${c}`, kind: "chord", chord: c }));
  if (isLessonComplete("lesson-1") || isLessonComplete("lesson-getstarted")) {
    ["C", "D", "E", "F", "G", "A", "B"].forEach((n) => items.push({ id: `note:${n}`, kind: "note", pc: NOTE_NAMES.indexOf(n) }));
  }
  if (isLessonComplete("lesson-1")) ["F#", "C#", "A#"].forEach((n) => items.push({ id: `note:${n}`, kind: "note", pc: NOTE_NAMES.indexOf(n) }));
  if (isLessonComplete("lesson-sheet")) {
    [60, 62, 64, 65, 67, 69, 71, 72, 74, 76, 77].forEach((m) => items.push({ id: `staff:r${m}`, kind: "staff", midi: m, hand: "right" }));
    [43, 45, 47, 48, 50, 52, 53, 55, 57].forEach((m) => items.push({ id: `staff:l${m}`, kind: "staff", midi: m, hand: "left" }));
  }
  if (isLessonComplete("lesson-chordquiz")) ["G", "C", "D", "Em", "Am"].forEach((c) => items.push({ id: `ear:${c}`, kind: "ear", chord: c }));
  return items;
}

// Due items first (most overdue first), then everything else shuffled.
function pickQueue() {
  const state = load();
  const today = localDay();
  const items = availableItems();
  const due = [];
  const later = [];
  items.forEach((it) => {
    const st = state[it.id];
    (!st || st.due <= today ? due : later).push(it);
  });
  const shuffle = (a) => a.map((x) => [Math.random(), x]).sort((p, q) => p[0] - q[0]).map((p) => p[1]);
  due.sort((a, b) => (state[a.id]?.due || "").localeCompare(state[b.id]?.due || ""));
  return [...due, ...shuffle(later)];
}

function grade(id, correct) {
  const state = load();
  const st = state[id] || { box: 0 };
  st.box = correct ? Math.min(INTERVALS.length - 1, st.box + 1) : 0;
  st.due = localDay(INTERVALS[st.box]);
  state[id] = st;
  save(state);
}

function itemPrompt(it) {
  if (it.kind === "chord") return `Play the <strong>${it.chord}</strong> chord <span class="hk-honest-note">(any octave — all its notes)</span>`;
  if (it.kind === "note") return `Find any <strong>${NOTE_NAMES[it.pc]}</strong> <span class="hk-honest-note">(any octave)</span>`;
  if (it.kind === "staff") return `Play this note <span class="hk-honest-note">(the exact one shown — ${it.hand === "left" ? "bass" : "treble"} clef)</span>`;
  return "Which chord is this? <span class=\"hk-honest-note\">(listen)</span>";
}

// Runs a review session inside a lesson screen. `ui` = { content,
// controls, kb, mascotSay, onExit }.
function runDailyReviewSession({ content, controls, kb, mascotSay, onExit, onLessonExit }) {
  let queue = pickQueue();
  let timeLeft = SESSION_SEC;
  let timer = null;
  let unsubscribe = null;
  let score = { right: 0, total: 0 };
  let current = null;
  let firstTry = true;
  let finished = false;

  function cleanupItem() {
    if (unsubscribe) unsubscribe();
    unsubscribe = null;
  }
  onLessonExit(() => {
    cleanupItem();
    if (timer) clearInterval(timer);
  });

  if (!queue.length) {
    content.innerHTML = mascotSay(`<h3>Nothing to review yet.</h3>
      <p>Finish your first lesson ("The 4 chords to play 100 songs") and the daily review will start quizzing you
         on what you've learned.</p>`);
    controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-done">Back to lessons</button>`;
    controls.querySelector("#hk-done").addEventListener("click", onExit);
    return;
  }

  function intro() {
    content.innerHTML = mascotSay(`<h3>🧠 Your 2-minute daily review</h3>
      <p>Quick-fire questions on things you've already learned — as many as you can in 2 minutes. Things you
         miss come back sooner; things you know well come back less often.</p>
      <p class="hk-honest-note">Play on the keys below, your laptop keyboard, or a connected MIDI keyboard.</p>`,
      "assets/mascot-poses/metronome.png");
    controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-go">Start (2:00)</button>`;
    controls.querySelector("#hk-go").addEventListener("click", start);
  }

  function start() {
    timer = setInterval(() => {
      timeLeft--;
      const el = content.querySelector("#hk-review-timer");
      if (el) el.textContent = `${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, "0")}`;
      if (timeLeft <= 0) {
        clearInterval(timer);
        timer = null;
      }
    }, 1000);
    nextItem();
  }

  function nextItem() {
    cleanupItem();
    kb.clearHighlights();
    if (timeLeft <= 0 || finished) return end();
    if (!queue.length) queue = pickQueue();
    current = queue.shift();
    firstTry = true;
    const pressed = new Set();
    content.innerHTML = `
      <div class="hk-review-head"><span>⏱ <strong id="hk-review-timer">${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, "0")}</strong></span>
        <span>✓ ${score.right} / ${score.total}</span></div>
      ${mascotSay(`<p class="hk-review-prompt">${itemPrompt(current)}</p>`)}
      ${current.kind === "staff" ? `<div class="hk-staff-scroll">${renderGrandStaff({ title: "Read this note", beatsPerBar: 4, beatUnit: 4, bars: 1, keySig: [], events: [{ midi: current.midi, start: 0, dur: 4, hand: current.hand }] }, { showTime: false })}</div>` : ""}
      ${current.kind === "ear" ? `<div class="hk-quiz-options">${["G", "C", "D", "Em", "Am"].map((c) => `<button class="hk-btn hk-quiz-option" data-ear="${c}">${c}</button>`).join("")}
         <button class="hk-btn" id="hk-ear-again">&#9658; Again</button></div>` : ""}
      <p id="hk-review-feedback" class="hk-quiz-feedback"></p>`;
    controls.innerHTML = `<button class="hk-btn" id="hk-show">Show me</button>
      <button class="hk-btn" id="hk-end">End review</button>`;
    const feedback = content.querySelector("#hk-review-feedback");
    controls.querySelector("#hk-end").addEventListener("click", () => { finished = true; end(); });

    function resolve(correct, msg) {
      cleanupItem();
      score.total++;
      if (correct) score.right++;
      grade(current.id, correct);
      if (!correct) queue.splice(Math.min(3, queue.length), 0, current); // see it again soon
      feedback.textContent = msg;
      feedback.className = `hk-quiz-feedback ${correct ? "hk-quiz-feedback-correct" : "hk-quiz-feedback-wrong"}`;
      setTimeout(nextItem, correct ? 650 : 1500);
    }

    controls.querySelector("#hk-show").addEventListener("click", () => {
      if (current.kind === "chord") {
        const n = chordSymbolToMidi(current.chord);
        kb.highlightChord(n, { letter: current.chord, rootMidi: n[0] });
      } else if (current.kind === "note") kb.highlightChord([60 + current.pc], { letter: NOTE_NAMES[current.pc], rootMidi: 60 + current.pc });
      else if (current.kind === "staff") kb.highlightChord([current.midi], { letter: NOTE_NAMES[current.midi % 12], rootMidi: current.midi });
      resolve(false, "Here it is — it'll come back again soon.");
    });

    if (current.kind === "ear") {
      const notes = chordSymbolToMidi(current.chord);
      const play = () => playChord(notes, { delay: 0.05 });
      setTimeout(play, 250);
      content.querySelector("#hk-ear-again").addEventListener("click", play);
      content.querySelectorAll("[data-ear]").forEach((b) => b.addEventListener("click", () => {
        const ok = b.dataset.ear === current.chord;
        resolve(ok, ok ? `Yes — ${current.chord}.` : `It was ${current.chord}.`);
      }));
      return;
    }

    unsubscribe = onNoteOn((midi) => {
      const pc = ((midi % 12) + 12) % 12;
      if (current.kind === "note") {
        if (pc === current.pc) resolve(firstTry, firstTry ? `Yes — that's ${NOTE_NAMES[pc]}.` : "Got it (second try).");
        else { firstTry = false; feedback.textContent = `That's ${NOTE_NAMES[pc]} — try again.`; }
      } else if (current.kind === "staff") {
        if (midi === current.midi) resolve(firstTry, firstTry ? `Yes — ${NOTE_NAMES[pc]}.` : "Got it (second try).");
        else if (pc === current.midi % 12) { firstTry = false; feedback.textContent = "Right letter — wrong octave. Look at where it sits on the staff."; }
        else { firstTry = false; feedback.textContent = `That's ${NOTE_NAMES[pc]} — try again.`; }
      } else {
        const want = new Set(chordSymbolToMidi(current.chord).map((m) => m % 12));
        if (want.has(pc)) {
          pressed.add(pc);
          feedback.textContent = `${[...pressed].map((p) => NOTE_NAMES[p]).join(" + ")}…`;
          if ([...want].every((p) => pressed.has(p))) resolve(firstTry, firstTry ? `Yes — ${current.chord}.` : "Got it.");
        } else { firstTry = false; feedback.textContent = `${NOTE_NAMES[pc]} isn't in ${current.chord} — keep going.`; }
      }
    });
  }

  function end() {
    cleanupItem();
    if (timer) clearInterval(timer);
    timer = null;
    kb.clearHighlights();
    if (!reviewDoneToday() && score.total > 0) {
      markDoneToday();
      recordDailyProgress();
    }
    content.innerHTML = mascotSay(`<h3>Review done: ${score.right} of ${score.total} right.</h3>
      <p>${score.total && score.right === score.total ? "Perfect — those will come back less often now." : "The ones you missed will show up again soon — that's how they stick."}
         See you tomorrow!</p>`, "assets/mascot-poses/maestro-conducting.png");
    controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-done">Back to lessons</button>`;
    controls.querySelector("#hk-done").addEventListener("click", onExit);
  }

  intro();
}

export { runDailyReviewSession, reviewDoneToday, availableItems };
