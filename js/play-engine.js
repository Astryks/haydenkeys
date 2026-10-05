// Item 59: the practice engine behind wait mode, "play in time" mode,
// hands-separately practice and section looping. It drives a lesson
// keyboard's falling-blocks highway (lessons-ui.js lessonKeyboard() →
// kb.takeOver()) from a piece's events (sheet-data.js), and listens to
// every input source through input-hub.js.
//
//   mode "wait"  — the blocks fall, and STOP at the keys until you press
//                  the right note(s); then they carry on. Wrong keys are
//                  counted and flash red. Nothing can be "too late".
//   mode "timed" — the blocks never stop. Each note counts as a hit if
//                  you press it within ±0.25s of when it lands; otherwise
//                  it's a miss. Scored at the end, with early/late timing.
//
//   hands "both" | "left" | "right" — practice one hand: the OTHER hand's
//                  notes are played for you (faded blocks) so you still
//                  hear the full music.
//   loop [fromBar, toBar) — repeat just those bars until you stop.
//   speed        — tempo multiplier (0.5 = half speed).

import { onNoteOn } from "./input-hub.js";
import { playTone } from "./keyboard.js";

const LEAD_SEC = 1.6; // time for the first blocks to fall in
const HIT_WINDOW_SEC = 0.25;
const EARLY_SEC = 0.4; // wait mode: how early a press can count for the next note

function createPracticePlayer({
  kb,
  piece,
  mode = "wait",
  hands = "both",
  loop = null,
  speed = 1,
  showKeyHints = true,
  onStep,
  onFinish,
}) {
  const ctl = kb.takeOver();
  const fromBar = loop ? loop[0] : 0;
  const toBar = loop ? loop[1] : piece.bars;
  const startBeat = fromBar * piece.beatsPerBar;
  const endBeat = toBar * piece.beatsPerBar;
  const beatSec = 60 / piece.bpm / speed;

  const events = piece.events
    .map((ev, i) => ({ ...ev, i }))
    .filter((ev) => ev.start >= startBeat - 1e-9 && ev.start < endBeat - 1e-9)
    .map((ev) => ({
      ...ev,
      required: hands === "both" || ev.hand === hands,
      t: (ev.start - startBeat) * beatSec + LEAD_SEC,
    }));
  const endT = (endBeat - startBeat) * beatSec + LEAD_SEC;
  const notes = events.map((ev) => ({
    midi: ev.midi,
    time: ev.t,
    duration: Math.max(0.08, ev.dur * beatSec * 0.94),
    hand: ev.hand,
    ghost: !ev.required,
  }));

  // Required notes grouped into "steps" (everything that starts together).
  let steps;
  function buildSteps() {
    const byTime = new Map();
    events.filter((ev) => ev.required).forEach((ev) => {
      const k = ev.t.toFixed(4);
      if (!byTime.has(k)) byTime.set(k, { t: ev.t, evs: [], pressed: new Set(), done: false, hadMistake: false });
      byTime.get(k).evs.push(ev);
    });
    steps = [...byTime.values()].sort((a, b) => a.t - b.t);
  }
  buildSteps();

  // combo = notes in a row without a wrong key or a miss (item 60).
  const stats = { right: 0, wrong: 0, steps: steps.length, cleanSteps: 0, hits: 0, misses: 0, timing: [], loops: 0, combo: 0, maxCombo: 0 };
  const bumpCombo = () => { stats.combo++; stats.maxCombo = Math.max(stats.maxCombo, stats.combo); };
  const breakCombo = () => { stats.combo = 0; };
  let clock = 0; // seconds into the (looped) section, including the lead-in
  let lastFrame = null;
  let raf = null;
  let running = false;
  let nextSchedule = 0;
  let stepIdx = 0; // first unfinished step
  const hitEvents = new Set(); // timed mode
  let lastReported = -1;

  function flash(midi, cls) {
    const el = kb.getKeyElement(midi);
    if (!el) return;
    el.classList.remove("hk-key-right", "hk-key-wrong");
    void el.offsetWidth;
    el.classList.add(cls);
    setTimeout(() => el.classList.remove(cls), 380);
  }

  function currentStep() {
    return steps[stepIdx] || null;
  }

  function showHints() {
    if (!showKeyHints) return;
    const st = mode === "wait" ? currentStep() : null;
    // Lit only once the note can actually be played — so a repeated note
    // visibly goes off and on again instead of staying lit.
    if (st && st.t - clock <= EARLY_SEC) {
      ctl.hands({
        left: st.evs.filter((e) => e.hand === "left" && !st.pressed.has(e.midi)).map((e) => e.midi),
        right: st.evs.filter((e) => e.hand === "right" && !st.pressed.has(e.midi)).map((e) => e.midi),
      });
    } else if (mode === "wait") ctl.clear();
  }

  function report() {
    if (!onStep) return;
    const key = mode === "wait" ? stepIdx : Math.floor(clock * 8);
    if (key === lastReported) return;
    lastReported = key;
    const current = new Set();
    const done = new Set();
    if (mode === "wait") {
      steps.forEach((st, k) => st.evs.forEach((e) => (k < stepIdx ? done : k === stepIdx ? current : null)?.add(e.i)));
    } else {
      events.forEach((e) => {
        if (clock >= e.t && clock < e.t + e.dur * beatSec) current.add(e.i);
        else if (clock >= e.t) done.add(e.i);
      });
    }
    const st = currentStep();
    onStep({ current, done, bar: st ? Math.floor(st.evs[0].start / piece.beatsPerBar) : toBar - 1, stats, clock });
  }

  const unsubscribe = onNoteOn((midi) => {
    if (!running) return;
    if (mode === "wait") {
      const st = currentStep();
      if (!st || st.t - clock > EARLY_SEC) {
        stats.wrong++;
        flash(midi, "hk-key-wrong");
        return;
      }
      if (st.evs.some((e) => e.midi === midi)) {
        st.pressed.add(midi);
        stats.right++;
        bumpCombo();
        flash(midi, "hk-key-right");
        if (st.evs.every((e) => st.pressed.has(e.midi))) {
          st.done = true;
          if (!st.hadMistake) stats.cleanSteps++;
          stepIdx++;
          report();
        }
        showHints();
      } else {
        stats.wrong++;
        breakCombo();
        st.hadMistake = true;
        flash(midi, "hk-key-wrong");
      }
    } else {
      // timed: nearest unhit required note of this pitch inside the window
      let best = null;
      events.forEach((e) => {
        if (!e.required || hitEvents.has(e) || e.midi !== midi) return;
        const err = clock - e.t;
        if (Math.abs(err) <= HIT_WINDOW_SEC && (!best || Math.abs(err) < Math.abs(best.err))) best = { e, err };
      });
      if (best) {
        hitEvents.add(best.e);
        stats.hits++;
        bumpCombo();
        stats.timing.push(best.err);
        flash(midi, "hk-key-right");
      } else {
        stats.wrong++;
        breakCombo();
        flash(midi, "hk-key-wrong");
      }
    }
  });

  function resetLoop() {
    clock = 0;
    nextSchedule = 0;
    stepIdx = 0;
    hitEvents.clear();
    buildSteps();
    lastReported = -1;
  }

  function frame(now) {
    if (!running) return;
    const dt = lastFrame === null ? 0 : Math.min(0.1, (now - lastFrame) / 1000);
    lastFrame = now;
    let next = clock + dt;
    // Wait mode: time can't pass a step until it's played.
    const st = currentStep();
    if (mode === "wait" && st && next > st.t) next = st.t;
    clock = next;

    // Auto-play the other hand's notes (and nothing else), ~0.25s ahead.
    while (nextSchedule < events.length && events[nextSchedule].t < clock + 0.25) {
      const ev = events[nextSchedule++];
      if (!ev.required && ev.t >= clock - 0.05) {
        const waitFor = steps.find((s) => !s.done && s.t <= ev.t + 1e-6);
        // In wait mode, never sound accompaniment ahead of the note you're stuck on.
        if (mode === "wait" && waitFor && waitFor.t < ev.t - 1e-6) {
          nextSchedule--;
          break;
        }
        playTone(ev.midi, { duration: ev.dur * beatSec * 0.94, delay: Math.max(0, ev.t - clock) });
      }
    }

    // Timed mode: notes whose window has passed unplayed are misses.
    if (mode === "timed") {
      events.forEach((e) => {
        if (e.required && !hitEvents.has(e) && !e.missed && clock > e.t + HIT_WINDOW_SEC) {
          e.missed = true;
          stats.misses++;
          breakCombo();
        }
      });
      const sounding = events.filter((e) => e.required && clock >= e.t - 0.05 && clock < e.t + e.dur * beatSec);
      if (showKeyHints) {
        ctl.hands({ left: sounding.filter((e) => e.hand === "left").map((e) => e.midi), right: sounding.filter((e) => e.hand === "right").map((e) => e.midi) });
      }
    } else {
      showHints();
    }

    ctl.render(clock, notes);
    report();

    if (clock >= endT) {
      if (loop) {
        stats.loops++;
        events.forEach((e) => { e.missed = false; });
        resetLoop();
      } else {
        finish();
        return;
      }
    }
    raf = requestAnimationFrame(frame);
  }

  function finish() {
    running = false;
    unsubscribe();
    if (raf) cancelAnimationFrame(raf);
    const avgTiming = stats.timing.length ? stats.timing.reduce((a, b) => a + b, 0) / stats.timing.length : 0;
    const result = {
      ...stats,
      accuracy: mode === "wait"
        ? Math.round((100 * stats.right) / Math.max(1, stats.right + stats.wrong))
        : Math.round((100 * stats.hits) / Math.max(1, events.filter((e) => e.required).length)),
      avgTimingMs: Math.round(avgTiming * 1000),
    };
    if (onFinish) onFinish(result);
  }

  return {
    start() {
      if (running) return;
      running = true;
      lastFrame = null;
      raf = requestAnimationFrame(frame);
    },
    stop() {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      unsubscribe();
      ctl.release();
    },
    stats,
  };
}

export { createPracticePlayer };
