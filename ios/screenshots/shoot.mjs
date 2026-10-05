import puppeteer from "puppeteer-core";
import fs from "fs";

const BASE = "http://localhost:8743/";
const OUT = process.argv[2] || "/private/tmp/claude-501/shots/out";
fs.mkdirSync(OUT, { recursive: true });
const DEVICES = [
  { name: "iphone-6.9", width: 956, height: 440, dpr: 3 },
  { name: "ipad-13", width: 1376, height: 1032, dpr: 2 },
];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: "new",
  args: ["--autoplay-policy=no-user-gesture-required", "--hide-scrollbars"],
});

async function prep(page, progressUpTo) {
  await page.goto(BASE, { waitUntil: "networkidle0" });
  await page.evaluate((upTo) => {
    localStorage.clear();
    const ids = window.__HK_LESSON_IDS__ || [];
    return ids.length + upTo;
  }, progressUpTo);
  // Realistic state: first N lessons done, some XP, a streak.
  await page.evaluate(async (upTo) => {
    const { LESSONS } = await import("/js/lessons-data.js");
    const p = {};
    LESSONS.slice(0, upTo).forEach((l) => (p[l.id] = { completed: true, completedAt: Date.now() }));
    localStorage.setItem("hk_lesson_progress", JSON.stringify(p));
    const d = new Date();
    const day = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    localStorage.setItem("hk_streak", JSON.stringify({ count: 6, lastDay: day }));
    localStorage.setItem("hk_xp", JSON.stringify(640));
    localStorage.setItem("hk_quests", JSON.stringify({ date: day, done: { lesson: true } }));
  }, progressUpTo);
  await page.reload({ waitUntil: "networkidle0" });
  await page.evaluate(() => document.documentElement.classList.add("hk-native"));
}

for (const dev of DEVICES) {
  const page = await browser.newPage();
  await page.setViewport({ width: dev.width, height: dev.height, deviceScaleFactor: dev.dpr, isMobile: true, hasTouch: true, isLandscape: true });
  let n = 0;
  const shot = async (label) => {
    n++;
    await sleep(500);
    await page.screenshot({ path: `${OUT}/${dev.name}-${String(n).padStart(2, "0")}-${label}.png` });
  };
  const click = (sel) => page.evaluate((s) => document.querySelector(s)?.click(), sel);
  const scrollTo = (sel, block = "start") => page.evaluate((s, b) => document.querySelector(s)?.scrollIntoView({ block: b }), sel, block);

  // 1. Lesson 1, the G chord with blocks landed on the keys
  await prep(page, 2);
  for (let i = 0; i < 5; i++) await click("#hk-next");
  await sleep(300);
  await page.evaluate(() => window.scrollTo(0, document.querySelector(".hk-lesson-player").offsetTop - 4));
  await shot("lesson-first-chords");

  // 2. Lesson map with quests, level, streak
  await prep(page, 30);
  await click("#hk-lesson-exit");
  await sleep(300);
  await scrollTo(".hk-streak", "start");
  await shot("roadmap-quests");

  // 3. Song play-along with falling blocks mid-song
  await click('[data-lesson="song-1"]');
  await sleep(300);
  await page.evaluate(() => [...document.querySelectorAll("#hk-lesson-controls button")].find((b) => /Play along/.test(b.textContent))?.click());
  await sleep(4200);
  await page.evaluate(() => window.scrollTo(0, document.querySelector(".hk-lesson-player").offsetTop - 4));
  await shot("play-along-blocks");

  // 4. Sheet music: Bach Prelude, wait mode running
  await prep(page, 140);
  await click('[data-lesson="lesson-sheet-bach"]');
  await sleep(300);
  await click("[data-pstart]");
  await sleep(2600);
  await scrollTo("[data-pstaff]", "start");
  await page.evaluate(() => window.scrollBy(0, -50));
  await shot("sheet-music-wait-mode");

  // 5. Middle C tuner in Get Started (static, before listening)
  await prep(page, 1);
  await sleep(200);
  await scrollTo("#hk-cal-tuner", "center");
  await shot("middle-c-check");

  // 6. Discover library
  await click('[data-tab="discover"]');
  await sleep(2500);
  await scrollTo(".hk-discover-controls", "start");
  await shot("discover-library");

  // 7. MIDI tab
  await click('[data-tab="midi"]');
  await sleep(400);
  await scrollTo(".hk-midi-layout-picker", "start");
  await shot("midi-keyboard");

  await page.close();
}
await browser.close();
console.log("done");
