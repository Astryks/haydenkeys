// Item 59: grand-staff (treble + bass) notation renderer for the
// sheet-music lessons. Draws real notation from a piece's events
// (sheet-data.js): clefs, key and time signature, note heads (hollow for
// half/whole notes), stems, flags, dots, ledger lines, sharps/naturals,
// and bar lines — plus highlighting for the notes you're on now and the
// ones already played. Deliberately simplified engraving (flags instead
// of beams, no rests needed by these pieces), but every pitch and
// rhythm is drawn where it really goes.

const LETTER_INDEX_BY_PC = [0, 0, 1, 1, 2, 3, 3, 4, 4, 5, 5, 6];
const BLACK_PCS = new Set([1, 3, 6, 8, 10]);
const HS = 5; // half a staff space (line to space), in px

// Diatonic step, 0 = C4 (Middle C), +1 per letter name.
function step(midi) {
  const pc = ((midi % 12) + 12) % 12;
  return LETTER_INDEX_BY_PC[pc] + 7 * (Math.floor(midi / 12) - 1) - 28;
}

const TREBLE_TOP = 40; // y of the top line (F5)
const BASS_TOP = 120; // y of the top line (A3)
function yFor(midi, hand) {
  const s = step(midi);
  // Treble: the middle line is B4 (step 6); bass: the top line is A3 (step -2).
  return hand === "left" ? BASS_TOP - (s + 2) * HS : TREBLE_TOP + 20 - (s - 6) * HS;
}

function ledgerYs(midi, hand) {
  const s = step(midi);
  const ys = [];
  if (hand === "left") {
    for (let k = 0; k <= s; k += 2) ys.push(BASS_TOP - (k + 2) * HS); // above: C4, E4...
    for (let k = -12; k >= s; k -= 2) ys.push(BASS_TOP - (k + 2) * HS); // below: E2, C2...
  } else {
    for (let k = 0; k >= s; k -= 2) ys.push(TREBLE_TOP + 20 - (k - 6) * HS); // below: C4, A3...
    for (let k = 12; k <= s; k += 2) ys.push(TREBLE_TOP + 20 - (k - 6) * HS); // above: A5, C6...
  }
  return ys;
}

function accidentalFor(midi, keySig) {
  const pc = ((midi % 12) + 12) % 12;
  if (BLACK_PCS.has(pc)) return keySig.includes(pc) ? "" : "♯";
  // A natural note whose sharp is in the key signature needs a ♮.
  return keySig.includes((pc + 1) % 12) && LETTER_INDEX_BY_PC[pc] === LETTER_INDEX_BY_PC[(pc + 1) % 12] ? "♮" : "";
}

// Renders bars [fromBar, toBar) of `piece`. `state.current` / `state.done`
// are Sets of event indices to color. `hands` limits which staff gets
// notes (the other is still drawn, empty, so the layout doesn't jump).
function renderGrandStaff(piece, { fromBar = 0, toBar = piece.bars, current = new Set(), done = new Set(), dimHand = null, showTime = true, labels = null } = {}) {
  const bars = toBar - fromBar;
  const keySig = piece.keySig || [];
  const headerW = 58 + keySig.length * 10 + (showTime ? 18 : 0);
  // Bars widen to fit their busiest bar (e.g. Bach's 16ths), so notes never overlap.
  const groupsPerBar = new Map();
  piece.events.forEach((ev) => {
    const b = Math.floor(ev.start / piece.beatsPerBar);
    if (!groupsPerBar.has(b)) groupsPerBar.set(b, new Set());
    groupsPerBar.get(b).add(`${ev.hand}|${ev.start}`);
  });
  const busiest = Math.max(1, ...[...groupsPerBar.values()].map((set) => {
    const starts = new Set([...set].map((k) => k.split("|")[1]));
    return starts.size;
  }));
  const barW = Math.max(150 * (piece.beatsPerBar / 4) + 30, busiest * 22 + 30);
  const width = headerW + bars * barW + 8;
  const height = 190;
  const parts = [];

  // Staff lines + brace-ish left line
  [TREBLE_TOP, BASS_TOP].forEach((top) => {
    for (let i = 0; i < 5; i++) parts.push(`<line x1="10" x2="${width - 6}" y1="${top + i * 10}" y2="${top + i * 10}" class="hk-st-line"/>`);
  });
  parts.push(`<line x1="10" x2="10" y1="${TREBLE_TOP}" y2="${BASS_TOP + 40}" class="hk-st-bar"/>`);

  // Clefs (Unicode musical symbols), key signature, time signature
  parts.push(`<text x="14" y="${TREBLE_TOP + 33}" class="hk-st-clef hk-st-treble">𝄞</text>`);
  parts.push(`<text x="16" y="${BASS_TOP + 27}" class="hk-st-clef hk-st-bass">𝄢</text>`);
  keySig.forEach((pc, i) => {
    if (pc !== 6) return; // only F# is used by these pieces
    parts.push(`<text x="${52 + i * 10}" y="${TREBLE_TOP + 4}" class="hk-st-acc">♯</text>`);
    parts.push(`<text x="${52 + i * 10}" y="${BASS_TOP + 14}" class="hk-st-acc">♯</text>`);
  });
  const tsX = 54 + keySig.length * 10 + 6;
  if (showTime) {
    [TREBLE_TOP, BASS_TOP].forEach((top) => {
      parts.push(`<text x="${tsX}" y="${top + 19}" class="hk-st-time">${piece.beatsPerBar}</text>`);
      parts.push(`<text x="${tsX}" y="${top + 39}" class="hk-st-time">${piece.beatUnit}</text>`);
    });
  }

  // Bar lines + bar numbers
  for (let b = 0; b <= bars; b++) {
    const x = headerW + b * barW;
    const last = b === bars && toBar === piece.bars;
    parts.push(`<line x1="${x}" x2="${x}" y1="${TREBLE_TOP}" y2="${BASS_TOP + 40}" class="hk-st-bar ${last ? "hk-st-final" : ""}"/>`);
    if (b < bars) parts.push(`<text x="${x + 3}" y="${TREBLE_TOP - 8}" class="hk-st-barnum">${fromBar + b + 1}</text>`);
  }

  // Notes, grouped into chords (same hand + same start). A 1¾-beat note
  // isn't a single written value: it's drawn the way scores write it —
  // a dotted eighth tied to a quarter.
  const groups = new Map();
  const ties = [];
  const drawn = [];
  piece.events.forEach((ev, i) => {
    if (Math.abs(ev.dur - 1.75) < 1e-6) {
      drawn.push({ ...ev, dur: 0.75, i, tieTo: ev.start + 0.75 });
      drawn.push({ ...ev, start: ev.start + 0.75, dur: 1, i });
    } else drawn.push({ ...ev, i });
  });
  drawn.forEach((ev) => {
    const i = ev.i;
    const bar = Math.floor(ev.start / piece.beatsPerBar);
    if (bar < fromBar || bar >= toBar) return;
    const key = `${ev.hand}|${ev.start}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push({ ...ev, i, bar });
  });
  const xOf = (start) => {
    const bar = Math.floor(start / piece.beatsPerBar);
    return headerW + (bar - fromBar) * barW + 16 + ((start - bar * piece.beatsPerBar) / piece.beatsPerBar) * (barW - 26);
  };
  groups.forEach((notes) => {
    const { hand, start, dur, bar } = notes[0];
    const beatInBar = start - bar * piece.beatsPerBar;
    const x = headerW + (bar - fromBar) * barW + 16 + (beatInBar / piece.beatsPerBar) * (barW - 26);
    const ys = notes.map((n) => yFor(n.midi, hand));
    const middleY = hand === "left" ? BASS_TOP + 20 : TREBLE_TOP + 20;
    const avg = ys.reduce((a, b) => a + b, 0) / ys.length;
    const stemUp = avg >= middleY;
    const hollow = dur >= 2;
    const dotted = [0.75, 1.5, 3].includes(dur);
    const flags = dur <= 0.25 ? 2 : dur <= 0.75 ? 1 : 0;
    const dim = dimHand && hand === dimHand;
    notes.forEach((n, k) => {
      const y = ys[k];
      if (n.tieTo !== undefined) ties.push({ x1: x + 4, x2: xOf(n.tieTo) - 4, y, below: !stemUp });
      const cls = current.has(n.i) ? "hk-st-now" : done.has(n.i) ? "hk-st-done" : "";
      ledgerYs(n.midi, hand).forEach((ly) => parts.push(`<line x1="${x - 9}" x2="${x + 9}" y1="${ly}" y2="${ly}" class="hk-st-line"/>`));
      const acc = accidentalFor(n.midi, keySig);
      if (acc) parts.push(`<text x="${x - 17}" y="${y + 4}" class="hk-st-acc ${cls}">${acc}</text>`);
      parts.push(`<ellipse cx="${x}" cy="${y}" rx="5.6" ry="4" transform="rotate(-20 ${x} ${y})" class="hk-st-head ${hollow ? "hk-st-hollow" : ""} ${cls} ${dim ? "hk-st-dim" : ""}"/>`);
      // Optional letter under/over each note (teaching pages).
      if (labels) parts.push(`<text x="${x}" y="${hand === "left" ? BASS_TOP + 58 : TREBLE_TOP - 14}" class="hk-st-label">${labels(n.midi)}</text>`);
      if (dotted) parts.push(`<circle cx="${x + 9}" cy="${y - (Math.abs((y - TREBLE_TOP) % 10) < 1 ? 3 : 0)}" r="1.6" class="hk-st-dot ${cls}"/>`);
    });
    if (dur < 4) {
      const top = Math.min(...ys);
      const bottom = Math.max(...ys);
      const sx = stemUp ? x + 5 : x - 5;
      const y1 = stemUp ? bottom : top;
      const y2 = stemUp ? top - 30 : bottom + 30;
      const anyNow = notes.some((n) => current.has(n.i));
      parts.push(`<line x1="${sx}" x2="${sx}" y1="${y1}" y2="${y2}" class="hk-st-stem ${anyNow ? "hk-st-now" : ""} ${dim ? "hk-st-dim" : ""}"/>`);
      for (let f = 0; f < flags; f++) {
        const fy = y2 + (stemUp ? f * 7 : -f * 7);
        parts.push(`<path d="M${sx} ${fy} q 8 ${stemUp ? 6 : -6} 7 ${stemUp ? 15 : -15}" class="hk-st-flag ${dim ? "hk-st-dim" : ""}"/>`);
      }
    }
  });

  ties.forEach((t) => {
    const dy = t.below ? 7 : -7;
    parts.push(`<path d="M${t.x1} ${t.y + dy / 2} Q ${(t.x1 + t.x2) / 2} ${t.y + dy * 1.8} ${t.x2} ${t.y + dy / 2}" class="hk-st-flag"/>`);
  });
  return `<svg viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" class="hk-grand-staff" role="img" aria-label="${piece.title}, bars ${fromBar + 1} to ${toBar}">${parts.join("")}</svg>`;
}

export { renderGrandStaff, step as staffStep };
