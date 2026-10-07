// Falling-notes "highway" — the Synthesia-style visualization: notes
// scroll downward from the top of a canvas toward a fixed hit line
// positioned directly above the real on-screen keyboard, horizontally
// aligned to the exact key(s) each note corresponds to (reusing
// keyboard.js's own computeKeyLayout, not a second layout system).
//
// Color is by hand, reusing the SAME pink-left/light-blue-right
// convention the keyboard itself uses (.hk-key-hand-left/-right) for
// every two-hand lesson. Item 55 polish: this used to be a second,
// hand-picked pair of hex values (amber/purple) that silently drifted
// out of sync when item 30 repainted the keyboard's hand colors to
// pastel pink/light-blue — the canvas never got updated, so the
// highway and the keyboard beneath it disagreed on hand colors. Fixed
// by reading the SAME CSS custom properties the keyboard CSS uses, so
// they can't drift apart again.
//
// Timing: each note carries an absolute `time` (seconds from the start
// of the song/loop) and `duration`. At render time, a note's vertical
// position is computed from how far `time` is in the future relative to
// the playback clock and a fixed `lookaheadSec` window — e.g. with a
// 2-second lookahead, a note due in exactly 2 seconds starts at the top
// of the canvas and reaches the hit line exactly when it's due. This is
// the actual mechanism that gives real anticipation, not a cosmetic
// scroll — verified directly against the clock in practice.js (same
// `currentTime()` driving both the keyboard highlight and the highway).

function handColors() {
  const style = getComputedStyle(document.documentElement);
  return {
    left: style.getPropertyValue("--hk-accent-2-soft").trim() || "#f4b8d0",
    right: style.getPropertyValue("--hk-accent-soft").trim() || "#a7d8f0",
  };
}

function renderNoteHighway(container, keyLayout, { lookaheadSec = 2.2, hitLineFrac = 0.88 } = {}) {
  container.innerHTML = "";
  container.classList.add("hk-highway-wrap");
  const canvas = document.createElement("canvas");
  canvas.className = "hk-highway-canvas";
  container.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  function resize() {
    const rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height || 160;
  }
  resize();
  const resizeObserver = typeof ResizeObserver !== "undefined" ? new ResizeObserver(resize) : null;
  if (resizeObserver) resizeObserver.observe(container);

  // Returns the canvas y-coordinate the TOP of a note due at `noteTime`
  // (with the given duration) should currently be drawn at, given the
  // current playback time `now`. y == hitLineY exactly when the note's
  // start reaches the hit line (now == noteTime).
  function yForTime(noteTime, now, hitLineY) {
    const secondsUntilHit = noteTime - now;
    return hitLineY - (secondsUntilHit / lookaheadSec) * hitLineY;
  }

  function render(now, notes) {
    const w = canvas.width;
    const h = canvas.height;
    const hitLineY = h * hitLineFrac;
    ctx.clearRect(0, 0, w, h);
    const colors = handColors();

    // Hit line
    ctx.strokeStyle = "rgba(255,255,255,0.25)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, hitLineY);
    ctx.lineTo(w, hitLineY);
    ctx.stroke();

    notes.forEach((note) => {
      const pos = keyLayout.get(note.midi);
      if (!pos) return;
      const endTime = note.time + note.duration;
      // Skip notes fully outside the visible window (already passed, or
      // further away than the lookahead).
      if (note.time > now + lookaheadSec) return;

      // Item 57 fix: a note's START is its LOWER edge (it reaches the hit
      // line first) and its END is its upper edge. Blocks are as tall as
      // the note is long and keep flowing at the same speed past the hit
      // line into the keys (no stopping while they sound), so the stream
      // never looks like it pauses.
      const startY = yForTime(note.time, now, hitLineY);
      const endY = yForTime(endTime, now, hitLineY);
      if (endY >= h) return;
      const topY = Math.max(0, endY);
      const bottomY = Math.min(h, startY);
      if (bottomY <= 0) return;
      const x = (pos.xPct / 100) * w;
      const blockWidth = (pos.widthPct / 100) * w;
      const blockHeight = Math.max(6, bottomY - topY);

      ctx.fillStyle = note.hand === "left" ? colors.left : colors.right;
      // Item 59: "ghost" notes (the hand the app is playing for you in
      // hands-separately practice) are drawn faded.
      ctx.globalAlpha = note.ghost ? 0.3 : note.time <= now && endTime > now ? 1 : 0.85;
      ctx.fillRect(x + 1, topY, Math.max(2, blockWidth - 2), blockHeight);
      // "L" / "R" on each block (when there's room), so the hand is
      // clear from the falling notes too, not only from the colour.
      if (!note.ghost && blockHeight >= 16 && blockWidth >= 12) {
        ctx.fillStyle = note.hand === "left" ? "#7a2e49" : "#1d4f6e";
        ctx.font = `800 ${Math.min(13, Math.floor(blockWidth * 0.6))}px system-ui, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";
        ctx.fillText(note.hand === "left" ? "L" : "R", x + blockWidth / 2, bottomY - 3);
      }
      ctx.globalAlpha = 1;
    });
  }

  function destroy() {
    if (resizeObserver) resizeObserver.disconnect();
  }

  return { render, destroy, yForTime };
}

// Splits a chord-loop step (as used by practice.js) into left-hand
// (root, an octave down) and right-hand (full chord) note events with
// absolute timing, matching the same convention used by the Day 21-25
// two-hand lessons and Canon capstone — one hand-assignment convention
// reused everywhere, not a second one invented for this feature.
function stepsToHighwayNotes(steps, chordDurationSec, midiForChord) {
  const notes = [];
  let at = 0;
  steps.forEach((step) => {
    // Item 57: steps may carry their own length (`len`, in chord slots /
    // bars); defaults to 1 so every existing caller is unchanged.
    const len = step.len ?? 1;
    const time = at * chordDurationSec;
    at += len;
    const midiNotes = midiForChord(step.chord);
    if (!midiNotes.length) return;
    const root = midiNotes[0];
    notes.push({ midi: root - 12, time, duration: chordDurationSec * len * 0.9, hand: "left" });
    midiNotes.forEach((midi) => notes.push({ midi, time, duration: chordDurationSec * len * 0.9, hand: "right" }));
  });
  return notes;
}

export { renderNoteHighway, stepsToHighwayNotes };
