import { renderKeyboard, playChord, playTone } from "./keyboard.js";
import {
  LESSON1_CHORDS,
  LESSON1_SEQUENCE,
  LESSON2_DEGREES,
  MINOR_DEGREES,
  ODE_TO_JOY_MELODY,
  LESSONS,
} from "./lessons-data.js";
import { ONE_FIVE_SIX_FOUR_SONGS } from "./songs-data.js";
import { isLessonComplete, markLessonComplete, getStreak } from "./storage.js";

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
      ${rows}
    </div>`;
}

function initLessonsTab(root) {
  function showMap() {
    root.innerHTML = lessonMapHtml();
    root.querySelectorAll("[data-lesson]").forEach((btn) => {
      btn.addEventListener("click", () => startLesson(btn.dataset.lesson));
    });
  }

  function startLesson(id) {
    if (id === "lesson-1") runLesson1();
    else if (id === "lesson-2") runLesson2();
    else if (id === "lesson-3") runLesson3();
  }

  function lessonShell(title) {
    root.innerHTML = `
      <div class="hk-lesson-player">
        <button class="hk-lesson-exit" id="hk-lesson-exit">&larr; Lessons</button>
        <h2>${title}</h2>
        <div class="hk-lesson-content" id="hk-lesson-content"></div>
        <div id="hk-lesson-keyboard" class="hk-keyboard-wrap"></div>
        <div class="hk-lesson-controls" id="hk-lesson-controls"></div>
      </div>`;
    root.querySelector("#hk-lesson-exit").addEventListener("click", showMap);
    return {
      content: root.querySelector("#hk-lesson-content"),
      keyboardWrap: root.querySelector("#hk-lesson-keyboard"),
      controls: root.querySelector("#hk-lesson-controls"),
    };
  }

  // ----- Lesson 1: 1-5-6-4 -------------------------------------------
  function runLesson1() {
    const { content, keyboardWrap, controls } = lessonShell("Your first 4 chords: 1-5-6-4");
    const kb = renderKeyboard(keyboardWrap, { startMidi: 55, endMidi: 79 });
    let step = 0; // 0..3 = teach each chord, 4 = quiz, 5 = payoff

    function renderStep() {
      if (step < 4) {
        const key = LESSON1_SEQUENCE[step];
        const chord = LESSON1_CHORDS[key];
        kb.highlightChord(chord.notes, { number: chord.number, letter: chord.letter, rootMidi: chord.root });
        content.innerHTML = `
          <p class="hk-step-indicator">Chord ${step + 1} of 4</p>
          <div class="hk-big-degree">${chord.number}<span class="hk-big-letter">${chord.letter}</span></div>
          <p>This is "the ${ordinal(chord.number)}" — in the key of G, that's <strong>${chord.letter} ${chord.quality}</strong>.
             Tap the highlighted keys to hear it, then press Next.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-next">Next</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => {
          step++;
          renderStep();
        });
        playChord(chord.notes, { delay: 0.1 });
      } else if (step === 4) {
        content.innerHTML = `
          <p>Now play them in order: <strong>1 (G) &rarr; 5 (D) &rarr; 6 (Em) &rarr; 4 (C)</strong>.
             Click the root key for each chord, in sequence.</p>
          <p id="hk-quiz-progress">Press the <strong>1 chord (G)</strong> root key.</p>`;
        controls.innerHTML = "";
        kb.clearHighlights();
        const roots = LESSON1_SEQUENCE.map((k) => LESSON1_CHORDS[k].root);
        let idx = 0;
        kb.onKeyPress((midi) => {
          if (midi === roots[idx]) {
            idx++;
            if (idx < roots.length) {
              const nextKey = LESSON1_SEQUENCE[idx];
              const nextChord = LESSON1_CHORDS[nextKey];
              content.querySelector("#hk-quiz-progress").innerHTML =
                `Press the <strong>${nextChord.number} chord (${nextChord.letter})</strong> root key.`;
            } else {
              step = 5;
              renderStep();
            }
          }
        });
      } else {
        markLessonComplete("lesson-1");
        kb.clearHighlights();
        kb.onKeyPress(() => {});
        const exact = ONE_FIVE_SIX_FOUR_SONGS.filter((s) => s.oneFiveSixFourMatch === "exact");
        const variant = ONE_FIVE_SIX_FOUR_SONGS.filter((s) => s.oneFiveSixFourMatch === "variant");
        content.innerHTML = `
          <h3>You just learned the most common chord pattern in pop music.</h3>
          <p>Out of the 25 songs in this app's library, <strong>${ONE_FIVE_SIX_FOUR_SONGS.length}</strong> use this
             exact four-chord family:</p>
          <p><strong>Same 1-5-6-4 loop, different starting point (${exact.length}):</strong></p>
          <ul>${exact.map((s) => `<li>${s.title} — ${s.artist} (${s.degreeSequence})</li>`).join("")}</ul>
          <p><strong>Same 4 chords, different order (${variant.length}):</strong></p>
          <ul>${variant.map((s) => `<li>${s.title} — ${s.artist} (${s.degreeSequence})</li>`).join("")}</ul>
          <p class="hk-honest-note">Honest count: that's ${ONE_FIVE_SIX_FOUR_SONGS.length} of 25 — not all 25. The rest use other
             (often minor-key or more complex) progressions, which is exactly what later lessons will cover.</p>`;
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
          <p>In G major, the ${ordinal(String(d.degree))} chord is <strong>${d.quality}</strong>.</p>`;
        controls.innerHTML = `<button class="hk-btn hk-btn-primary" id="hk-next">Next</button>`;
        controls.querySelector("#hk-next").addEventListener("click", () => {
          step++;
          renderStep();
        });
        playChord(d.notes, { delay: 0.1 });
      } else if (step === 7) {
        kb.clearHighlights();
        content.innerHTML = `
          <h3>This is true in every key, not just G.</h3>
          <p>In <strong>any</strong> major key: degrees <strong>1, 4, 5</strong> are always major.
             Degrees <strong>2, 3, 6</strong> are always minor. Degree <strong>7</strong> is diminished.</p>
          <p>That's the whole trick — transpose the pattern, not the memorization.</p>`;
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

    const STAFF_Y = { 60: 115, 62: 107.5, 64: 100, 65: 92.5, 67: 85 }; // C4..G4

    function renderStaff(upToIndex) {
      const noteWidth = 28;
      const notes = ODE_TO_JOY_MELODY.map((midi, i) => {
        const x = 40 + i * noteWidth;
        const y = STAFF_Y[midi];
        const dim = i > upToIndex ? "hk-staff-note-dim" : "";
        const ledger = midi === 60 ? `<line x1="${x - 8}" y1="115" x2="${x + 8}" y2="115" class="hk-staff-line" />` : "";
        return `${ledger}<ellipse cx="${x}" cy="${y}" rx="6" ry="4.5" class="hk-staff-note ${dim}" />`;
      }).join("");
      const lines = [40, 55, 70, 85, 100]
        .map((y) => `<line x1="20" y1="${y}" x2="${40 + ODE_TO_JOY_MELODY.length * noteWidth}" y2="${y}" class="hk-staff-line" />`)
        .join("");
      return `<svg viewBox="0 0 ${60 + ODE_TO_JOY_MELODY.length * noteWidth} 140" class="hk-staff">${lines}${notes}</svg>`;
    }

    function renderStep() {
      if (step === 0) {
        content.innerHTML = `
          <h3>Traditional notation: an optional, deeper layer</h3>
          <p>Everything so far used numbers and letters. Professional sheet music uses a 5-line <strong>staff</strong> instead —
             each vertical position is a different note. You don't need this to play along in this app, but it's worth knowing.</p>
          <p>Here's "Ode to Joy" (Beethoven, 1824 — public domain), one note at a time:</p>
          <div id="hk-staff-wrap">${renderStaff(-1)}</div>`;
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
          <div id="hk-staff-wrap">${renderStaff(i)}</div>`;
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

  function ordinal(n) {
    const map = { 1: "1st", 2: "2nd", 3: "3rd", 4: "4th", 5: "5th", 6: "6th", 7: "7th" };
    return map[n] || `${n}th`;
  }

  showMap();
}

export { initLessonsTab };
