import { pandaSvg } from "./panda.js";
// "About" — an in-app, site-styled presentation of README.md and
// THIRD_PARTY_NOTICES.md, for a curious visitor who doesn't want to go
// dig through raw markdown files on GitHub. Every fact here is the same
// real fact as in those files — this is a presentation layer, not a new
// source of truth. If the two ever drift, the .md files are the ones to
// trust (this page should be re-synced to match).
import { SONGS } from "./songs-data.js";
import { LESSONS } from "./lessons-data.js";

function initAboutTab(root) {
  const songCount = SONGS.length;
  const lessonCount = LESSONS.length;

  root.innerHTML = `
    <div class="hk-how">
      <h2>About Hayden Keys</h2>
      <p class="hk-how-sub">What Hayden Keys is, how it works, and who to thank.</p>
      <div class="hk-about-hero">${pandaSvg("play", { label: "Hayden the panda playing piano" })}</div>

      <section class="hk-how-section">
        <h3>What this is</h3>
        <p>A free piano app that feels like a game, a bit like Duolingo. You learn chords as numbers and shapes first
           ("this is the 1, this is the 5"), and note names and sheet music come later. There are
           <strong>${lessonCount} lessons</strong> and <strong>${songCount} songs</strong> to learn.</p>
      </section>

      <section class="hk-how-section">
        <h3>Why it's free, forever</h3>
        <p>There's no account, no server and no database to pay for, so it costs almost nothing to run. Your
           progress, streak, saved songs and settings stay on your device.</p>
      </section>

      <section class="hk-how-section">
        <h3>Where the AI comes in</h3>
        <p>The "upload your own recording" feature uses <strong>basic-pitch</strong>, an open-source AI model from Spotify,
           to work out which notes were played. It runs <strong>entirely on your device</strong>, so your recording is never uploaded.</p>
      </section>

      <section class="hk-how-section">
        <h3>Why there's no YouTube import</h3>
        <p>You can't import songs from YouTube or streaming apps, on purpose: taking their audio without permission breaks
           their rules. To learn a song that's not in the library, upload your own recording instead.</p>
      </section>

      <section class="hk-how-section">
        <h3>Where the chords come from</h3>
        <p>Every song's chords are checked against several sources, never copied from one chord chart. We never include
           lyrics, not even a line. If we're not yet sure about a song's chords, the app says so.</p>
      </section>

      <section class="hk-how-section">
        <h3>How classical pieces are handled</h3>
        <p>Classical pieces are public domain: every composer here died more than 70 years ago. We use the well-known tune
           and chords, never a modern publisher's edition. Jazz standards are still under copyright, so we only teach their chords.</p>
      </section>

      <section class="hk-how-section">
        <h3>Open-source credit</h3>
        <p>Note detection uses Spotify's <strong>basic-pitch</strong> (Apache License 2.0), built right into the app. The piano
           sound is the Splendid Grand Piano (Steinway samples released into the public domain by Akai), played with
           <strong>smplr</strong> (MIT License). Full details are in the
           <a href="https://github.com/Astryks/haydenkeys/blob/main/THIRD_PARTY_NOTICES.md" target="_blank" rel="noopener">third-party notices</a>.</p>
      </section>

      <section class="hk-how-section">
        <h3>Privacy</h3>
        <p>No account and no data collection. The <a href="privacy.html">Privacy Policy</a> explains how the camera and
           microphone are used and what's saved on your device.</p>
      </section>

      <section class="hk-how-section">
        <h3>Want the techy details?</h3>
        <p>See <a href="https://github.com/Astryks/haydenkeys/blob/main/README.md" target="_blank" rel="noopener">README.md</a> and
           <a href="https://github.com/Astryks/haydenkeys/blob/main/STATUS.md" target="_blank" rel="noopener">STATUS.md</a> in the project's source code on GitHub.</p>
      </section>
    </div>`;
}

export { initAboutTab };
