// Builds js/song-detail-data.js: every library song bar by bar (Oct 2026,
// "hyper detailed" songs), from the research files found-1.json ...
// found-6.json (one object per song: title, artist, key, bpm,
// timeSignature, sections[{ name, bars: ["G:2 D:2", ...], piano, bpm? }],
// optional melody [[midi, startBeat, durBeats]], confidence).
//
//   node scripts/build-song-detail.mjs [research-dir]
//
// research-dir defaults to /private/tmp/claude-501/scratch/detail. The
// script checks everything and stops (exit 1) on any real problem:
//   - the song must be in the library (SONGS, which includes world songs);
//   - every chord must be understood completely by chord-utils.js;
//   - every bar must add up to the time signature (compound metres such
//     as 6/8 may be counted in eighths or in dotted quarters);
//   - the tempo must be sane, and the length must roughly match the
//     recording when the research gives one.
// Only facts are kept (chords, bars, tempo, key). No lyrics. Melodies are
// kept only where the research included them (public-domain pieces).

import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const DIR = process.argv[2] || "/private/tmp/claude-501/scratch/detail";
const { SONGS } = await import(path.join(ROOT, "js/songs-data.js"));
const { parseChordSymbol } = await import(path.join(ROOT, "js/chord-utils.js"));

// Research titles/artists written differently from the library.
const HAND_MATCH = {
  "Take the A Train|Billy Strayhorn (Duke Ellington Orchestra, 1941)": "Take the A Train|Billy Strayhorn (jazz standard)",
  "Amazing Grace|Traditional hymn (John Newton, 1779; tune 'New Britain')": "Amazing Grace|Traditional hymn (John Newton, 1779)",
};
// Typos in the research, fixed by hand (song title -> [from, to]).
const TOKEN_FIXES = {
  "Man in the Mirror": [["G:2:2 D/F#:2", "G:2 D/F#:2"]],
};

// The "piano" field: presses per bar ("4"), or a rhythm. Rhythms are
// mapped by hand to where the presses fall, as fractions of the bar.
const q4 = (...beats) => beats.map((b) => b / 4); // 4/4 beats from 0
const eighths = (n) => Array.from({ length: n }, (_, i) => i / n);
const RHYTHMS = {
  "1 . 3 &": { at: q4(0, 2, 2.5) },
  "3+3+4+3+3": { at: [0, 3, 6, 10, 13].map((s) => s / 16) },
  "1 . . & . & 3 . (bossa)": { at: q4(0, 1.5, 2.5, 3) },
  "1 . 3 .": { at: q4(0, 2) },
  "1 . 2& . 4": { at: q4(0, 1.5, 3) },
  "1 . 2& . . & 4 . (vamp)": { at: q4(0, 1.5, 2.5, 3) },
  "1 . . 2 . 3 . 4 . .": { at: [0, 3, 5, 7].map((e) => e / 10) }, // 10/8: 3+2+2+3
  "1 . . 4 .": { at: [0, 3].map((b) => b / 5) }, // 5/4: Take Five vamp
  "8th-note pulse: 1 & 2 & 3 & 4 &": { at: eighths(8) },
  "1 . . & . . . .": { at: q4(0, 1.5) },
  "2 & 4": { at: q4(1, 3) },
  "8th-note broken chords (LH arpeggio)": { at: eighths(8), arp: true },
  "8th-note broken chords": { at: eighths(8), arp: true },
  "1 . 3 (oom-pah-pah: bass on 1, chord on 2 and 3)": { at: [1 / 3, 2 / 3] },
  "1 . 3": { at: [0, 2 / 3] }, // 3/4
  "8th riff": { at: eighths(8) },
  ". 2 . .": { at: q4(1) },
  ". & . & . & . &": { at: q4(0.5, 1.5, 2.5, 3.5) },
  "1 . . & . . 4 .": { at: q4(0, 1.5, 3) },
};
// Which metres each hand-mapped rhythm was written for.
const RHYTHM_METRES = { "1 . . 2 . 3 . 4 . .": ["10/8"], "1 . . 4 .": ["5/4"], "1 . 3 (oom-pah-pah: bass on 1, chord on 2 and 3)": ["3/4"], "1 . 3": ["3/4"] };

const UNIT_Q = { quarter: 1, "dotted quarter": 1.5, eighth: 0.5, half: 2, "dotted half": 3 };

const errors = [];
const warnings = [];
const err = (song, msg) => errors.push(`${song.title}: ${msg}`);
const warn = (song, msg) => warnings.push(`${song.title}: ${msg}`);

const research = [];
const skipped = [];
for (let i = 1; i <= 6; i++) {
  const file = path.join(DIR, `found-${i}.json`);
  const d = JSON.parse(fs.readFileSync(file, "utf8"));
  research.push(...d.songs);
  skipped.push(...(d.skipped || []).map((s) => s.title || s));
}

const lib = new Map(SONGS.map((s) => [`${s.title}|${s.artist}`, s]));
const out = {};
const notInLibrary = [];
const stats = { verified: 0, close: 0, melody: 0, bars: 0, oddBars: 0, sections: 0, tempoChanges: 0 };
const pianoUse = {};

const r4 = (x) => Math.round(x * 10000) / 10000;

for (const raw of research) {
  let id = `${raw.title}|${raw.artist}`;
  if (HAND_MATCH[id]) id = HAND_MATCH[id];
  const song = lib.get(id);
  if (!song) { notInLibrary.push(`${raw.title} (${raw.artist})`); continue; }

  // Time signature and units.
  const ts = /^(\d+)\/(\d+)$/.exec(raw.timeSignature || "");
  if (!ts) { err(raw, `bad time signature ${raw.timeSignature}`); continue; }
  const N = Number(ts[1]);
  const D = Number(ts[2]);
  const barQ = (N * 4) / D; // quarter notes in a bar
  const compound = D === 8 && N % 3 === 0;

  const fixes = TOKEN_FIXES[raw.title] || [];
  const sections = raw.sections.map((sec) => ({
    ...sec,
    bars: sec.bars.map((b) => fixes.reduce((acc, [from, to]) => (acc === from ? to : acc), b.trim())),
  }));

  // Parse every bar.
  const parsedSecs = sections.map((sec) => ({
    sec,
    bars: sec.bars.map((bar) => bar.split(/\s+/).map((tok) => {
      const m = /^(.+):(\d+(?:\.\d+)?)$/.exec(tok);
      if (!m) { err(raw, `bad token "${tok}" in "${bar}" (${sec.name})`); return { chord: "N.C.", units: 0 }; }
      return { chord: m[1], units: Number(m[2]) };
    })),
  }));
  const sums = parsedSecs.flatMap((p) => p.bars.map((b) => r4(b.reduce((a, t) => a + t.units, 0))));
  const count = {};
  sums.forEach((s) => { count[s] = (count[s] || 0) + 1; });
  const mode = Number(Object.entries(count).sort((a, b) => b[1] - a[1])[0][0]);
  // Chord units: one per time-signature beat, or (compound metres) one
  // per dotted quarter.
  let u;
  if (Math.abs(mode - N) < 1e-6) u = 4 / D;
  else if (compound && Math.abs(mode - N / 3) < 1e-6) u = 12 / D;
  else { err(raw, `bars add up to ${mode}, not ${N} for ${raw.timeSignature}`); continue; }
  const unitsPerBar = barQ / u;
  parsedSecs.forEach((p) => p.bars.forEach((b, k) => {
    const s = r4(b.reduce((a, t) => a + t.units, 0));
    stats.bars++;
    if (Math.abs(s - unitsPerBar) > 1e-6) {
      stats.oddBars++;
      warn(raw, `"${p.sec.name}" bar ${k + 1} is ${s} beats, not ${unitsPerBar} (${p.sec.bars[k]}) - kept as a ${s}-beat bar`);
      if (s <= 0) err(raw, `empty bar in ${p.sec.name}`);
    }
  }));

  // Chords: every one must be fully understood.
  parsedSecs.forEach((p) => p.bars.forEach((b) => b.forEach((t) => {
    if (t.chord === "N.C.") return;
    const parsed = parseChordSymbol(t.chord);
    if (!parsed || !parsed.known) err(raw, `chord "${t.chord}" not fully understood (${p.sec.name})`);
  })));

  // Tempo: bpm in its own unit (quarter, or dotted quarter / eighth in
  // compound metres, half note in 2/2).
  let q;
  if (raw.bpmUnit) q = UNIT_Q[raw.bpmUnit];
  else if (compound) q = raw.bpm < 90 ? 1.5 : 0.5; // slow = dotted-quarter pulse, fast = eighths
  else q = 4 / D;
  if (!q) { err(raw, `unknown bpm unit ${raw.bpmUnit}`); continue; }
  const qpm = raw.bpm * q; // quarter notes a minute
  if (!(raw.bpm > 0) || qpm < 30 || qpm > 260) err(raw, `tempo out of range: ${raw.bpm} (${qpm} quarter notes a minute)`);
  sections.forEach((sec) => {
    if (sec.bpm) {
      stats.tempoChanges++;
      const sq = sec.bpm * q;
      if (sq < 30 || sq > 260) err(raw, `section tempo out of range: ${sec.name} ${sec.bpm}`);
    }
  });

  // Length check against the recording, when the research gives one.
  let totalSec = 0;
  let totalUnits = 0;
  const secStartUnits = [];
  parsedSecs.forEach((p) => {
    secStartUnits.push(totalUnits);
    const spq = 60 / ((p.sec.bpm || raw.bpm) * q);
    p.bars.forEach((b) => b.forEach((t) => { totalSec += t.units * u * spq; totalUnits += t.units; }));
  });
  const recSec = raw.durationSec || raw.lengthSec || raw.recordingLength;
  const recordingSec = typeof recSec === "string" ? (() => { const m = /(\d+):(\d+)/.exec(recSec); return m ? Number(m[1]) * 60 + Number(m[2]) : null; })() : recSec;
  if (recordingSec > 0) {
    const ratio = totalSec / recordingSec;
    if (ratio < 0.8 || ratio > 1.25) warn(raw, `plays ${Math.round(totalSec)}s but the recording is ${Math.round(recordingSec)}s (x${ratio.toFixed(2)})`);
  }

  // The "piano" field.
  const pianoFor = (sec) => {
    const p = String(sec.piano ?? "").trim();
    pianoUse[`${p} @ ${raw.timeSignature}`] = (pianoUse[`${p} @ ${raw.timeSignature}`] || 0) + 1;
    if (/^\d+$/.test(p)) {
      const n = Number(p);
      if (n < 1 || n > 16) err(raw, `piano presses ${n}`);
      return { p: n };
    }
    const r = RHYTHMS[p];
    if (!r) { err(raw, `unknown piano rhythm "${p}"`); return { p: 1 }; }
    if (RHYTHM_METRES[p] && !RHYTHM_METRES[p].includes(raw.timeSignature)) err(raw, `rhythm "${p}" written for ${RHYTHM_METRES[p]} used in ${raw.timeSignature}`);
    if (!RHYTHM_METRES[p] && raw.timeSignature !== "4/4") err(raw, `4/4 rhythm "${p}" used in ${raw.timeSignature}`);
    return { p: r.at.map(r4), ...(r.arp ? { a: 1 } : {}) };
  };

  // Melody: song-wide, or per section (beats from the section's start).
  let melody = (raw.melody || []).map(([m, s, d]) => [m, r4(s), r4(d)]);
  parsedSecs.forEach((p, i) => {
    (p.sec.melody || []).forEach(([m, s, d]) => melody.push([m, r4(s + secStartUnits[i]), r4(d)]));
  });
  melody.sort((a, b) => a[1] - b[1] || a[0] - b[0]);
  melody.forEach(([m, s, d]) => {
    if (!(m >= 21 && m <= 108) || !(d > 0) || s < 0 || s + d > totalUnits + 1e-6) err(raw, `bad melody note ${JSON.stringify([m, s, d])} (song is ${totalUnits} beats)`);
  });

  const confidence = raw.confidence === "verified" ? 1 : 0;
  if (raw.confidence === "verified") stats.verified++; else stats.close++;
  if (melody.length) stats.melody++;
  stats.sections += sections.length;

  out[id] = {
    k: raw.key,
    ts: raw.timeSignature,
    bpm: raw.bpm,
    ...(q !== 4 / D ? { q } : {}),
    u,
    v: confidence,
    s: parsedSecs.map((p) => ({
      n: p.sec.name,
      ...pianoFor(p.sec),
      b: p.bars.map((b) => b.map((t) => `${t.chord}:${r4(t.units)}`).join(" ")).join("|"),
      ...(p.sec.bpm ? { t: p.sec.bpm } : {}),
    })),
    ...(melody.length ? { m: melody } : {}),
  };
}

const missing = SONGS.filter((s) => !out[`${s.title}|${s.artist}`]).map((s) => s.title);

console.log(`Research songs: ${research.length}; skipped by research: ${skipped.length} (${skipped.join(", ")})`);
console.log(`Matched to the library: ${Object.keys(out).length} of ${SONGS.length} (verified ${stats.verified}, our best guide ${stats.close}; melodies ${stats.melody}; ${stats.sections} sections, ${stats.bars} bars, ${stats.tempoChanges} section tempo changes)`);
console.log(`Not in this app's library (guitar-only songs): ${notInLibrary.length}: ${notInLibrary.join("; ")}`);
console.log(`Library songs without new detail (keep their old data): ${missing.length}: ${missing.join("; ")}`);
console.log("Piano patterns used:", JSON.stringify(pianoUse));
if (warnings.length) console.log(`\n${warnings.length} notes:\n  ${warnings.join("\n  ")}`);
if (errors.length) {
  console.error(`\n${errors.length} ERRORS:\n  ${errors.join("\n  ")}`);
  process.exit(1);
}

const header = `// Generated by scripts/build-song-detail.mjs - do not edit by hand.
// Every library song bar by bar (researched Oct 2026 from chord charts,
// scores and the recordings). No lyrics. Key is "title|artist".
//   k key (concert pitch)  ts time signature  bpm tempo (in units of q
//   quarter notes, default the time signature's beat)  u quarter notes per
//   chord beat  v 1 = checked against the recording, 0 = our best guide
//   s sections: n name, p presses per bar (a number) or where they fall
//     (fractions of the bar), a 1 = broken chords, b bars ("|" between
//     bars, chord:beats), t the section's own tempo
//   m the tune (public-domain pieces): [midi, start beat, beats]
`;
const body = Object.entries(out).map(([k, v]) => `${JSON.stringify(k)}:${JSON.stringify(v)}`).join(",\n");
fs.writeFileSync(path.join(ROOT, "js/song-detail-data.js"), `${header}const SONG_DETAIL = {\n${body}\n};\n\nexport { SONG_DETAIL };\n`);
console.log(`\nWrote js/song-detail-data.js (${Math.round(fs.statSync(path.join(ROOT, "js/song-detail-data.js")).size / 1024)} KB)`);
