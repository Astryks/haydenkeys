// Builds the static SEO pages for the website (not the iOS app):
//   learn/*.html, songs/*.html, sitemap.xml, robots.txt, llms.txt,
//   and the crawlable landing + FAQ + JSON-LD block in index.html
//   (between the SEO:START / SEO:END markers).
// Run from the repo root: node scripts/build-seo.mjs
// Song pages show title, artist, key and chord NAMES only. Never lyrics.
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const isGuitar = fs.existsSync(path.join(ROOT, "js/guitar-theory.js"));
const TODAY = new Date().toISOString().slice(0, 10);
const { SONGS, ONE_FIVE_SIX_FOUR_SONGS, getDifficulty } = await import(path.join(ROOT, "js/songs-data.js"));
const gt = isGuitar ? await import(path.join(ROOT, "js/guitar-theory.js")) : null;
const cu = await import(path.join(ROOT, isGuitar ? "/js/chord-utils.js" : "/js/chord-utils.js")).catch(() => null);

const C = isGuitar ? {
  name: "Jaxx Guitar", store: "Jaxx Guitar: Free Lessons", id: "6819445036", site: "https://jaxxguitar.com",
  inst: "guitar", accent: "#b85c1e", bg: "#fbf4ea", image: "https://jaxxguitar.com/assets/og-image.jpg",
  icon: "https://jaxxguitar.com/assets/icons/icon-512.png", sibling: { name: "Hayden Keys", url: "https://haydenkeys.com", what: "piano" },
  tagline: "Free guitar lessons with Jaxx the beagle: 65+ lessons, 270 songs, a mic tuner and play-along fretboard. No ads, no account, ever.",
  lead: "Learn guitar for free with Jaxx the beagle, from your very first chord to full songs. 65+ guided lessons, 270 songs with chord diagrams, and a built-in mic tuner, all in one app. No ads. No account. No paywall.",
  features: [
    ["Learn step by step", "65+ lessons that take you from the basics to barre chords and solos, teacher videos that show what your hands should do, daily review and streaks."],
    ["Play 270 songs", "Chord diagrams for every song, capo and key info, solo cards for lead parts, and upload any song to get its chords, worked out on your device."],
    ["Falling notes on a fretboard", "Three modes: Listen to hear it first, Wait for me (it listens to your guitar and waits for the right note), and Play in time."],
    ["Tune up in seconds", "The mic tuner supports Standard, Drop D, DADGAD and Open G tunings."],
    ["Train your ear and timing", "Chord Ear Gym teaches you to recognise chords by sound, plus a built-in metronome."],
    ["Made for every player", "Left-handed mode flips the fretboard and diagrams. Works for acoustic and electric guitar. No sign-up."],
  ],
  faq: [
    ["Is Jaxx Guitar free?", "Yes. Jaxx Guitar is completely free, with no ads, no subscription and no paywall. There is an optional tip jar in the iPhone and iPad app if you want to support development, and a tip unlocks nothing extra."],
    ["Do I need an account?", "No. There is no sign-up, so you can start in seconds. Your progress and streaks stay on your own device."],
    ["What are the best beginner guitar chords?", "Start with G, D, Em and C. Jaxx Guitar's first lesson teaches these four chords and the G - D - Em - C loop, the I - V - vi - IV pattern behind a huge number of pop songs."],
    ["Does Jaxx Guitar have a tuner?", "Yes. The mic tuner listens to your guitar and supports Standard, Drop D, DADGAD and Open G tunings."],
    ["Does it work for left-handed players?", "Yes. Left-handed mode flips the fretboard and the chord diagrams."],
    ["Does it work for acoustic and electric guitar?", "Yes. Jaxx Guitar works for both acoustic and electric guitar."],
    ["Is my microphone audio recorded or uploaded?", "No. The microphone is optional and the sound is analysed on your device. It is never recorded or sent anywhere."],
    ["Do the song pages include lyrics?", "No. Song pages show the key and chord names only, never lyrics."],
  ],
} : {
  name: "Hayden Keys", store: "Hayden Keys Free Piano Lessons", id: "6819420632", site: "https://haydenkeys.com",
  inst: "piano", accent: "#b03a78", bg: "#fdf6fa", image: "https://haydenkeys.com/land.png",
  icon: "https://haydenkeys.com/assets/icons/icon-512.png", sibling: { name: "Jaxx Guitar", url: "https://jaxxguitar.com", what: "guitar" },
  tagline: "Free piano lessons with Ginger and Pepper: 250+ lessons, 240+ songs and play-along that listens to your real piano. No ads, no account.",
  lead: "Learn piano for free with Ginger and Pepper, two cats who make practice fun. 250+ lessons and 240+ songs, with chords for every section and falling notes to play along. No ads. No account. No paywall.",
  features: [
    ["Learn at your own pace", "250+ lessons to guide you from your first notes onward, teacher videos, inspiration videos and streaks to help you practise a little every day."],
    ["Play 240+ songs", "Chords for every section of every song, falling-note play-along so you can see what's coming, and upload a song to get its chords."],
    ["Wait for me, on a real piano", "Wait for me listens to your real piano and waits until you play the right note. No piano nearby? Use the on-screen keyboard."],
    ["Train your ear", "Chord Ear Gym teaches 24 chords by sound, and Guess the song tells you which song a recording is, then lets you jump into learning it."],
    ["Great for beginners", "Friendly mascots Ginger and Pepper, no sign-up, and it works with a real piano or the on-screen keyboard."],
  ],
  faq: [
    ["Is Hayden Keys free?", "Yes. Hayden Keys is completely free, with no ads, no subscription and no paywall. There is an optional tip jar in the iPhone and iPad app if you want to support development, and a tip unlocks nothing extra."],
    ["Do I need an account?", "No. There is no sign-up, so you can start in seconds. Your progress and streaks stay on your own device."],
    ["What are the best beginner piano chords?", "Start with G, D, Em and C. Hayden Keys' first lesson teaches these as the 1 - 5 - 6 - 4 pattern in G major, the I - V - vi - IV loop behind a huge number of pop songs."],
    ["Do I need a real piano or keyboard?", "Hayden Keys works with a real piano or keyboard, and Wait for me listens to the notes you play. No piano nearby? Use the on-screen keyboard."],
    ["Is my microphone audio recorded or uploaded?", "No. The microphone is optional and the sound is analysed on your device. It is never recorded or sent anywhere."],
    ["Do the song pages include lyrics?", "No. Song pages show the key and chord names only, never lyrics."],
  ],
};
const APP = `https://apps.apple.com/app/id${C.id}`;
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const slug = (s) => s.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const NN = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const FN = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];

// --- chord helpers ---------------------------------------------------------
function guitarFrets(sym) {
  try { const s = gt.chordShape(sym); return s ? s.frets.map((f) => (f < 0 ? "x" : f)).join(" ") : null; } catch { return null; }
}
function pianoNotes(sym) {
  if (!cu) return null;
  const flat = /b/.test(sym.slice(1, 2)) || ["F", "Dm", "Gm", "Cm", "Fm"].includes(sym);
  const m = cu.chordSymbolToMidi(sym);
  return m.length ? m.map((n) => (flat ? FN : NN)[n % 12]).join(" - ") : null;
}
function chordTable(chords) {
  const rows = chords.map((c) => {
    const v = isGuitar ? guitarFrets(c) : pianoNotes(c);
    return `<tr><th scope="row">${esc(c)}</th><td>${v ? esc(v) : "-"}</td></tr>`;
  }).join("");
  const head = isGuitar ? "Frets (low E to high e, x = don't play)" : "Notes";
  return `<table class="chords"><thead><tr><th>Chord</th><th>${head}</th></tr></thead><tbody>${rows}</tbody></table>`;
}

// --- page shell -------------------------------------------------------------
const CSS = `body{margin:0;font:17px/1.6 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;background:${C.bg};color:#2b2420}
.wrap{max-width:760px;margin:0 auto;padding:20px}a{color:${C.accent}}header.top{display:flex;gap:12px;align-items:center}
header.top img{border-radius:12px}h1{line-height:1.2;margin:.6em 0 .3em}.cta{display:inline-block;background:${C.accent};color:#fff;
padding:12px 20px;border-radius:12px;text-decoration:none;font-weight:600;margin:8px 8px 8px 0}.cta.alt{background:#fff;color:${C.accent};border:2px solid ${C.accent}}
table.chords{border-collapse:collapse;margin:12px 0;width:100%}table.chords th,table.chords td{border:1px solid #e3d6c8;padding:6px 10px;text-align:left;background:#fff}
.pill{display:inline-block;background:#fff;border:1px solid #e3d6c8;border-radius:999px;padding:2px 12px;margin:2px;font-weight:600}
ul.list{columns:2;padding-left:18px}footer{font-size:14px;color:#6b5d52;margin-top:40px;border-top:1px solid #e3d6c8;padding-top:12px}
nav.crumbs{font-size:14px}@media(max-width:560px){ul.list{columns:1}}`;

function page({ rel, title, desc, h1, body, jsonld = [] }) {
  const url = `${C.site}/${rel}`;
  const up = rel.includes("/") ? "../" : "";
  const ld = [
    { "@type": "BreadcrumbList", itemListElement: crumbs(rel, h1).map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c[0], item: c[1] })) },
    ...jsonld,
  ];
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}" />
<link rel="canonical" href="${url}" />
<meta name="apple-itunes-app" content="app-id=${C.id}" />
<meta property="og:type" content="article" />
<meta property="og:site_name" content="${C.name}" />
<meta property="og:title" content="${esc(title)}" />
<meta property="og:description" content="${esc(desc)}" />
<meta property="og:url" content="${url}" />
<meta property="og:image" content="${C.image}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${esc(title)}" />
<meta name="twitter:description" content="${esc(desc)}" />
<meta name="twitter:image" content="${C.image}" />
<link rel="icon" href="${up}assets/icons/icon-32.png" sizes="32x32" type="image/png" />
<link rel="apple-touch-icon" href="${up}assets/icons/icon-180.png" />
<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": ld })}</script>
<style>${CSS}</style>
</head>
<body>
<div class="wrap">
<header class="top"><a href="${up}index.html"><img src="${up}assets/icons/icon-180.png" width="48" height="48" alt="${C.name} app icon" /></a>
<strong><a href="${up}index.html">${C.name}</a></strong></header>
<nav class="crumbs">${crumbs(rel, h1).map((c, i, a) => (i < a.length - 1 ? `<a href="${c[1].replace(C.site + "/", up || "./") || "./"}">${esc(c[0])}</a> › ` : esc(c[0]))).join("")}</nav>
<main>
<h1>${esc(h1)}</h1>
${body}
${ctaBlock(up)}
</main>
<footer><p>${C.name} is a free ${C.inst} lessons app by Astryks: no ads, no account, with an optional tip jar. ·
<a href="${up}learn/index.html">${cap(C.inst)} lessons</a> · <a href="${up}songs/index.html">Song chords</a> · <a href="${up}privacy.html">Privacy</a> ·
Learning ${C.sibling.what}? Try <a href="${C.sibling.url}">${C.sibling.name}</a>.</p></footer>
</div>
</body>
</html>
`;
}
const cap = (s) => s[0].toUpperCase() + s.slice(1);
function crumbs(rel, h1) {
  const out = [[C.name, `${C.site}/`]];
  if (rel.startsWith("learn/")) out.push([`${cap(C.inst)} lessons`, `${C.site}/learn/index.html`]);
  if (rel.startsWith("songs/")) out.push(["Song chords", `${C.site}/songs/index.html`]);
  if (!rel.endsWith("index.html")) out.push([h1, `${C.site}/${rel}`]);
  return out;
}
function ctaBlock(up) {
  return `<section><h2>Practise this in ${C.name}</h2><p>${esc(C.tagline)}</p>
<p><a class="cta" href="${APP}">Get ${esc(C.store)} on the App Store</a><a class="cta alt" href="${up}index.html">Open the free web app</a></p></section>`;
}

// --- songs ------------------------------------------------------------------
const picked = SONGS.filter((s) => s.confidence === "confirmed" && s.title && s.artist && s.key && s.chords?.length && !s.world)
  .sort((a, b) => (a.popularityRank ?? 999) - (b.popularityRank ?? 999));
const seen = new Set();
const songs = [];
for (const s of picked) { const sl = slug(`${s.title}-${s.artist}`); if (seen.has(sl)) continue; seen.add(sl); songs.push({ ...s, difficulty: getDifficulty(s), slug: sl }); if (songs.length >= 50) break; }
songs.sort((a, b) => a.title.localeCompare(b.title));

const files = {}; // rel -> html
for (const s of songs) {
  const rel = `songs/${s.slug}.html`;
  const chords = [...new Set(s.chords)];
  const capo = isGuitar ? (() => { try { return gt.suggestCapo(chords); } catch { return null; } })() : null;
  const sameKey = songs.filter((o) => o !== s && o.key === s.key).slice(0, 6);
  const facts = [["Artist", s.artist], s.year && ["Year", s.year], s.genre && ["Genre", s.genre], ["Key", s.key],
    s.degreeSequence && ["Progression", s.degreeSequence], s.difficulty && ["Level", s.difficulty], s.bpm && ["Tempo", `about ${s.bpm} BPM`]].filter(Boolean);
  let capoHtml = "";
  const hard = (c) => { try { const sh = gt.chordShape(c); return !sh || sh.barre; } catch { return true; } };
  if (capo && capo.capo > 0 && chords.some(hard) && chords.every((c) => !hard(capo.map[c]))) capoHtml = `<h2>Easier with a capo</h2><p>Put a capo on fret ${capo.capo} and play these shapes: ${chords.map((c) => `${esc(c)} → <strong>${esc(capo.map[c])}</strong>`).join(", ")}.</p>`;
  const body = `<p>${esc(s.title)} by ${esc(s.artist)} is in <strong>${esc(s.key)}</strong> and uses ${chords.length} chords: ${chords.map((c) => `<span class="pill">${esc(c)}</span>`).join(" ")}.</p>
<table class="chords"><tbody>${facts.map(([k, v]) => `<tr><th scope="row">${k}</th><td>${esc(v)}</td></tr>`).join("")}</tbody></table>
<h2>${cap(C.inst)} chords for ${esc(s.title)}</h2>
${chordTable(chords)}
${capoHtml}
<p>This page shows chord names and the key only. No lyrics. In the app you get the chords section by section${isGuitar ? " with chord diagrams" : ""} and falling notes to play along.</p>
${sameKey.length ? `<h2>More songs in ${esc(s.key)}</h2><ul>${sameKey.map((o) => `<li><a href="${o.slug}.html">${esc(o.title)} - ${esc(o.artist)}</a></li>`).join("")}</ul>` : ""}`;
  files[rel] = page({ rel, title: `${s.title} chords (${s.artist}) - easy ${C.inst} chords | ${C.name}`,
    desc: `${s.title} by ${s.artist} ${C.inst} chords: key of ${s.key}, chords ${chords.join(", ")}. Free, no lyrics, play along in ${C.name}.`,
    h1: `${s.title} ${C.inst} chords`, body });
}
files["songs/index.html"] = page({ rel: "songs/index.html", title: `Easy ${C.inst} chords for ${songs.length} popular songs | ${C.name}`,
  desc: `Key and chords for ${songs.length} popular songs on the ${C.inst}, for beginners. Chord names only, no lyrics. Play them in ${C.name}, free.`,
  h1: `${cap(C.inst)} chords for popular songs`,
  body: `<p>Each page shows the song's key and the chord names you need. No lyrics. The app has ${isGuitar ? "270" : "240+"} songs in total.</p>
<ul class="list">${songs.map((s) => `<li><a href="${s.slug}.html">${esc(s.title)}</a> - ${esc(s.artist)}</li>`).join("")}</ul>` });

// --- learn pages ------------------------------------------------------------
const songLink = (s) => `<a href="../songs/${s.slug}.html">${esc(s.title)} - ${esc(s.artist)}</a>`;
const fourChord = songs.filter((s) => s.oneFiveSixFourMatch || ONE_FIVE_SIX_FOUR_SONGS?.some((o) => o.title === s.title));
const beginner = songs.filter((s) => s.difficulty === "Beginner");
const learn = [];
if (isGuitar) {
  const g4 = songs.filter((s) => s.chords.every((c) => ["G", "D", "Em", "C"].includes(c)));
  learn.push(
    ["beginner-guitar-chords", "The 4 beginner guitar chords: G, D, Em and C", "Learn the four easiest guitar chords for beginners, G, D, Em and C, with finger positions, and the G - D - Em - C loop behind hundreds of songs.",
      `<p>If you are new to guitar, learn <strong>G, D, Em and C</strong> first. Together they make the G - D - Em - C loop, which is the I - V - vi - IV progression in G major. That pattern sits under a huge number of pop songs, which is why it is Lesson 1 in ${C.name}.</p>
${chordTable(["G", "D", "Em", "C"])}
<h2>How to practise them</h2><ol><li>Tune your guitar first (see <a href="how-to-tune-a-guitar.html">how to tune a guitar</a>).</li><li>Press just behind the fret with your fingertips, not on top of it.</li><li>Strum once on each chord, then switch. Speed comes later.</li><li>Loop G - D - Em - C slowly until the changes feel easy.</li></ol>
${g4.length ? `<h2>Songs you can play with these chords</h2><ul>${g4.map((s) => `<li>${songLink(s)}</li>`).join("")}</ul>` : ""}
${fourChord.length ? `<h2>Songs that use the same I - V - vi - IV pattern</h2><p>In other keys, or with a capo.</p><ul class="list">${fourChord.map((s) => `<li>${songLink(s)}</li>`).join("")}</ul>` : ""}`],
    ["guitar-chord-chart", "Guitar chord chart for beginners", "Free beginner guitar chord chart: the common open chords C, D, E, G, A, Am, Em, Dm and more, with fret numbers for every string.",
      `<p>These are the open chords most songs for beginners use. Read the numbers from the thickest string (low E) to the thinnest (high e). <strong>x</strong> means don't play that string and <strong>0</strong> means play it open.</p>
${chordTable(["C", "D", "E", "G", "A", "Am", "Em", "Dm", "E7", "A7", "D7", "B7", "F"])}
<p>F is the first barre chord most players learn. In ${C.name}, Practice → All chords covers 12 roots × 10 chord types.</p>`],
    ["how-to-tune-a-guitar", "How to tune a guitar (Standard, Drop D, DADGAD, Open G)", "How to tune a guitar for beginners: standard tuning E A D G B E, plus Drop D, DADGAD and Open G. Use the free mic tuner in Jaxx Guitar.",
      `<p>Tune before every practice. Even perfect chords sound wrong on an out-of-tune guitar.</p>
<table class="chords"><thead><tr><th>Tuning</th><th>Strings, low to high</th></tr></thead><tbody>
<tr><th scope="row">Standard</th><td>E A D G B E</td></tr><tr><th scope="row">Drop D</th><td>D A D G B E</td></tr>
<tr><th scope="row">DADGAD</th><td>D A D G A D</td></tr><tr><th scope="row">Open G</th><td>D G D G B D</td></tr></tbody></table>
<h2>Using a mic tuner</h2><ol><li>Play one string at a time and let it ring.</li><li>If the note is flat (too low), tighten the tuning peg a little; if sharp, loosen it.</li><li>Tune up to the note rather than down to it, so the string holds its pitch.</li></ol>
<p>${C.name}'s mic tuner listens to your guitar and supports all four tunings above.</p>`],
    ["how-to-use-a-capo", "How to use a capo on guitar", "What a capo does and how to use it: play songs in hard keys with easy open chord shapes. Examples with real songs.",
      `<p>A capo clamps across every string at one fret, raising the pitch of the open strings. That lets you play a song in its original key using easy open shapes like G, C and D instead of barre chords.</p>
<p>Example: with a capo on fret 2, a G shape sounds as A. Put the capo right behind the fret, not on top of it, and retune if needed.</p>
${(() => { const ex = songs.map((s) => ({ s, c: gt.suggestCapo([...new Set(s.chords)]) })).filter((x) => { const h = (c) => { const sh = gt.chordShape(c); return !sh || sh.barre; }; const ch = [...new Set(x.s.chords)]; return x.c && x.c.capo > 0 && ch.some(h) && ch.every((c) => !h(x.c.map[c])); }).slice(0, 8);
  return ex.length ? `<h2>Songs that are easier with a capo</h2><ul>${ex.map(({ s, c }) => `<li>${songLink(s)}: capo ${c.capo}</li>`).join("")}</ul>` : ""; })()}
<p>${C.name} shows the capo and key info for every song.</p>`],
    ["easy-guitar-songs", "Easy guitar songs for beginners", "Easy guitar songs for beginners with their key and chords. Free chord pages, no lyrics, and play-along in Jaxx Guitar.",
      `<p>These songs are marked Beginner in ${C.name}: few chords and simple changes. Each page shows the key and chords only.</p><ul class="list">${beginner.map((s) => `<li>${songLink(s)}</li>`).join("")}</ul>`],
    ["left-handed-guitar", "Learning guitar left-handed", "Left-handed guitar for beginners: what changes, and how Jaxx Guitar's left-handed mode flips the fretboard and chord diagrams.",
      `<p>Left-handed players usually fret with the right hand and strum with the left. Chord diagrams drawn for right-handed players then appear mirrored, which makes learning harder.</p>
<p>${C.name} has a left-handed mode that flips the fretboard and the chord diagrams so they match a left-handed guitar. The chords themselves are the same: start with <a href="beginner-guitar-chords.html">G, D, Em and C</a>.</p>`],
  );
} else {
  const triad = (r, minor) => { const i = minor ? [0, 3, 7] : [0, 4, 7]; const n = NN.indexOf(r); return i.map((x) => NN[(n + x) % 12]).join(" - "); };
  learn.push(
    ["beginner-piano-chords", "Beginner piano chords: G, D, Em and C", "Learn your first piano chords, G, D, Em and C, the 1-5-6-4 pattern behind hundreds of songs. Notes for each chord, free.",
      `<p>Hayden Keys starts with four chords: <strong>G, D, Em and C</strong>. In the key of G major they are chords 1, 5, 6 and 4, so the loop is called 1 - 5 - 6 - 4 (I - V - vi - IV). It sits under a huge number of pop songs.</p>
${chordTable(["G", "D", "Em", "C"])}
<h2>How to practise</h2><ol><li>Find <a href="find-middle-c.html">middle C</a> first.</li><li>Play each chord with fingers 1, 3 and 5 of your right hand.</li><li>Loop G - D - Em - C slowly, then add the root note in your left hand.</li></ol>
${fourChord.length ? `<h2>Songs that use the 1-5-6-4 pattern</h2><ul class="list">${fourChord.map((s) => `<li>${songLink(s)}</li>`).join("")}</ul>` : ""}`],
    ["piano-chord-chart", "Piano chord chart: every major and minor chord", "Free piano chord chart with the notes of all 12 major and 12 minor chords. A simple reference for beginners.",
      `<p>A major chord is a root, a major third (4 semitones up) and a fifth (7 semitones up). A minor chord lowers the middle note by one semitone.</p>
<table class="chords"><thead><tr><th>Root</th><th>Major</th><th>Minor</th></tr></thead><tbody>${NN.map((r) => `<tr><th scope="row">${r}</th><td>${triad(r, false)}</td><td>${triad(r, true)}</td></tr>`).join("")}</tbody></table>
<p>Chord Ear Gym in ${C.name} teaches you to recognise 24 chords by sound.</p>`],
    ["find-middle-c", "How to find middle C on the piano", "How to find middle C on any piano or keyboard: look for the groups of two black keys. A first piano lesson for beginners.",
      `<p>Black keys come in groups of two and three. <strong>Every C is the white key just to the left of a group of two black keys.</strong> Middle C (also called C4) is the C closest to the middle of the keyboard, usually right in front of you when you sit centred.</p>
<p>On a full 88-key piano the keys run from A0 at the bottom to C8 at the top. Smaller keyboards have fewer keys, but the pattern of two and three black keys is the same.</p>
<p>Next step: <a href="beginner-piano-chords.html">your first four chords</a>.</p>`],
    ["major-and-minor-chords", "Major and minor chords in a key", "Why some chords in a key are major and others minor: the I ii iii IV V vi pattern, with the chords of G major and C major.",
      `<p>In any major key, the chords built on the scale follow the same pattern: <strong>I, IV and V are major; ii, iii and vi are minor</strong> (vii is diminished). It is a pattern, not something to memorise key by key.</p>
<table class="chords"><thead><tr><th>Degree</th><th>C major</th><th>G major</th></tr></thead><tbody>
<tr><th>I</th><td>C</td><td>G</td></tr><tr><th>ii</th><td>Dm</td><td>Am</td></tr><tr><th>iii</th><td>Em</td><td>Bm</td></tr><tr><th>IV</th><td>F</td><td>C</td></tr><tr><th>V</th><td>G</td><td>D</td></tr><tr><th>vi</th><td>Am</td><td>Em</td></tr><tr><th>vii°</th><td>Bdim</td><td>F#dim</td></tr></tbody></table>
<p>That is why G - D - Em - C (I - V - vi - IV) works: <a href="beginner-piano-chords.html">see the beginner chords</a>.</p>`],
    ["easy-piano-songs", "Easy piano songs for beginners", "Easy piano songs for beginners with their key and chords. Free chord pages, no lyrics, and play-along in Hayden Keys.",
      `<p>These songs are marked Beginner in ${C.name}: few chords and simple changes. Each page shows the key and chords only.</p><ul class="list">${beginner.map((s) => `<li>${songLink(s)}</li>`).join("")}</ul>`],
  );
}
for (const [sl, h1, desc, body] of learn) {
  files[`learn/${sl}.html`] = page({ rel: `learn/${sl}.html`, title: `${h1} | ${C.name}`, desc, h1, body,
    jsonld: [{ "@type": "Article", headline: h1, description: desc, dateModified: TODAY, image: C.image, author: { "@type": "Organization", name: "Astryks" }, publisher: { "@id": `${C.site}/#org` }, mainEntityOfPage: `${C.site}/learn/${sl}.html` }] });
}
files["learn/index.html"] = page({ rel: "learn/index.html", title: `Free ${C.inst} lessons for beginners | ${C.name}`,
  desc: `Free beginner ${C.inst} lessons: first chords, chord charts and easy songs. Then keep going in the ${C.name} app, free with no ads.`,
  h1: `Free ${C.inst} lessons for beginners`,
  body: `<ul>${learn.map(([sl, h1, desc]) => `<li><a href="${sl}.html">${esc(h1)}</a><br />${esc(desc)}</li>`).join("")}</ul><p><a href="../songs/index.html">${cap(C.inst)} chords for popular songs</a></p>` });

// --- write pages ------------------------------------------------------------
for (const d of ["learn", "songs"]) { fs.rmSync(path.join(ROOT, d), { recursive: true, force: true }); fs.mkdirSync(path.join(ROOT, d)); }
for (const [rel, html] of Object.entries(files)) fs.writeFileSync(path.join(ROOT, rel), html);

// --- index.html: JSON-LD + crawlable landing + FAQ ----------------------
const graph = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", "@id": `${C.site}/#org`, name: "Astryks", url: "https://astryks.com" },
    { "@type": "WebSite", "@id": `${C.site}/#website`, url: `${C.site}/`, name: C.name, publisher: { "@id": `${C.site}/#org` }, inLanguage: "en" },
    { "@type": "MobileApplication", "@id": `${C.site}/#app`, name: C.name, alternateName: C.store, url: `${C.site}/`,
      description: C.lead, operatingSystem: "iOS", applicationCategory: "EducationalApplication", applicationSubCategory: "Music education",
      image: C.icon, screenshot: C.image, inLanguage: "en", isAccessibleForFree: true, installUrl: APP, downloadUrl: APP, sameAs: [APP],
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock" },
      publisher: { "@id": `${C.site}/#org` }, author: { "@id": `${C.site}/#org` } },
    { "@type": "FAQPage", "@id": `${C.site}/#faq`, mainEntity: C.faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) },
  ],
};
const landing = `<section class="seo-landing" id="about-app" aria-labelledby="seo-h2">
<h2 id="seo-h2">Free ${C.inst} lessons for beginners</h2>
<p>${esc(C.lead)}</p>
<p><a class="seo-cta" href="${APP}">Get ${esc(C.store)} on the App Store</a></p>
${C.features.map(([h, p]) => `<h3>${esc(h)}</h3><p>${esc(p)}</p>`).join("\n")}
<h3>Free lessons and song chords</h3>
<ul>${learn.map(([sl, h1]) => `<li><a href="learn/${sl}.html">${esc(h1)}</a></li>`).join("")}<li><a href="songs/index.html">${cap(C.inst)} chords for popular songs</a></li></ul>
<h2>Frequently asked questions</h2>
${C.faq.map(([q, a]) => `<h3>${esc(q)}</h3><p>${esc(a)}</p>`).join("\n")}
<p>${C.name} is made by Astryks. Learning ${C.sibling.what}? Try <a href="${C.sibling.url}">${C.sibling.name}</a>.</p>
</section>`;
const LANDING_CSS = `<style>.seo-landing{max-width:760px;margin:24px auto;padding:0 20px;font-size:16px;line-height:1.6}.seo-landing h2{margin-top:1.4em}
.seo-landing h3{margin:1em 0 .2em;font-size:1.05em}.seo-cta{display:inline-block;padding:10px 18px;border-radius:12px;background:${C.accent};color:#fff!important;text-decoration:none;font-weight:600}
html.native .seo-landing{display:none}
html.hk-app-ready .seo-landing:not(.seo-open){display:none}</style>`;
const NATIVE = `<script>if(location.protocol==="capacitor:"||window.Capacitor)document.documentElement.classList.add("native");</script>`;
let idx = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
const put = (name, html) => {
  const re = new RegExp(`<!-- SEO:${name}:START -->[\\s\\S]*?<!-- SEO:${name}:END -->`);
  const block = `<!-- SEO:${name}:START -->\n${html}\n<!-- SEO:${name}:END -->`;
  if (!re.test(idx)) throw new Error(`marker SEO:${name} missing in index.html`);
  idx = idx.replace(re, block);
};
put("JSONLD", `<script type="application/ld+json">\n${JSON.stringify(graph, null, 2)}\n</script>\n${NATIVE}\n${LANDING_CSS}`);
put("LANDING", landing);
fs.writeFileSync(path.join(ROOT, "index.html"), idx);

// --- sitemap, robots, llms.txt ----------------------------------------------
const urls = [["", "1.0", "weekly"], ["privacy.html", "0.3", "yearly"], ...(fs.existsSync(path.join(ROOT, "reference.html")) ? [["reference.html", "0.5", "monthly"]] : []),
  ["learn/index.html", "0.8", "monthly"], ...learn.map(([sl]) => [`learn/${sl}.html`, "0.8", "monthly"]),
  ["songs/index.html", "0.7", "monthly"], ...songs.map((s) => [`songs/${s.slug}.html`, "0.6", "monthly"])];
fs.writeFileSync(path.join(ROOT, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(([u, p, f]) => `  <url>\n    <loc>${C.site}/${u}</loc>\n    <lastmod>${TODAY}</lastmod>\n    <changefreq>${f}</changefreq>\n    <priority>${p}</priority>\n  </url>`).join("\n")}
</urlset>
`);
const bots = ["Googlebot", "Bingbot", "Google-Extended", "GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "Claude-User", "PerplexityBot", "Perplexity-User", "Applebot", "Applebot-Extended"];
const dis = ["/ios/", "/node_modules/", "/www/", "/scripts/"];
fs.writeFileSync(path.join(ROOT, "robots.txt"), `# ${C.name} - search engines and AI search crawlers are welcome.
${[...bots, "*"].map((b) => `User-agent: ${b}\nAllow: /\n${dis.map((d) => `Disallow: ${d}`).join("\n")}`).join("\n\n")}

Sitemap: ${C.site}/sitemap.xml
`);
fs.writeFileSync(path.join(ROOT, "llms.txt"), `# ${C.name}

> ${C.tagline}

${C.name} ("${C.store}" on the App Store, app ID ${C.id}) is a free ${C.inst} learning app for iPhone and iPad, also playable in a web browser at ${C.site}/. It is made by Astryks. It has no ads, no account and no paywall; the only purchase is an optional tip jar that unlocks nothing. Song pages give the key and chord names only, never lyrics.

## Features
${C.features.map(([h, p]) => `- ${h}: ${p}`).join("\n")}

## Links
- [App Store](${APP})
- [Web app](${C.site}/)
- [Free ${C.inst} lessons](${C.site}/learn/index.html)
- [${cap(C.inst)} chords for popular songs](${C.site}/songs/index.html)
- [Privacy policy](${C.site}/privacy.html)

## Lessons
${learn.map(([sl, h1, desc]) => `- [${h1}](${C.site}/learn/${sl}.html): ${desc}`).join("\n")}

## FAQ
${C.faq.map(([q, a]) => `- ${q} ${a}`).join("\n")}

## Sibling app
- [${C.sibling.name}](${C.sibling.url}): free ${C.sibling.what} lessons by Astryks, with the same no ads, no account approach.
`);
console.log(`${C.name}: ${Object.keys(files).length} pages (${learn.length} lessons + index, ${songs.length} songs + index), ${urls.length} sitemap URLs`);
