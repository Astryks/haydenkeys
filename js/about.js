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
      <p class="hk-how-sub">What this is, what it uses, and the legal lines it won't cross — in plain language, not raw markdown.</p>
      <div class="hk-about-hero">${pandaSvg("play", { label: "Hayden the panda playing piano" })}</div>

      <section class="hk-how-section">
        <h3>What this is</h3>
        <p>A free, gamified, Duolingo-style piano learning app. It teaches piano the way guitar apps teach
           chords — numbers and shapes first ("this is the 1," "this is the 5"), letter names absorbed
           through repetition, traditional notation introduced later. The curriculum currently has
           <strong>${lessonCount} real lessons</strong>, and the song library has
           <strong>${songCount} real songs</strong> — both numbers are computed live from the app's own
           data, not typed in by hand, so they're never stale.</p>
      </section>

      <section class="hk-how-section">
        <h3>Why it's free, forever</h3>
        <p>There's no backend, no database, and no account system. Hayden Keys is a pure static site —
           plain HTML, CSS, and JavaScript, nothing to host but files — which means it costs effectively
           nothing to run, no matter how many people use it. Everything the app remembers about you
           (lesson progress, your streak, saved songs, keyboard calibration) lives in your own browser's
           local storage. It never leaves your device.</p>
      </section>

      <section class="hk-how-section">
        <h3>What AI is actually involved</h3>
        <p>Exactly one feature uses machine learning: the "upload your own recording" option, which
           listens to an audio file and figures out which notes were played. That happens using an
           open-source model called <strong>basic-pitch</strong> (built by Spotify), running as a
           TensorFlow.js model <strong>entirely inside your browser</strong>. Your recording is never
           uploaded to a server — the whole point of running it client-side is that it doesn't have to be.</p>
      </section>

      <section class="hk-how-section">
        <h3>Why there's no YouTube import</h3>
        <p>You can't paste a YouTube or streaming-platform link to import a song, and that's on purpose,
           not a missing feature. Extracting audio from those platforms without a license violates their
           terms of service — full stop. If you want to learn a song that's not in the library, the honest
           path is uploading your own recording of it instead (see above).</p>
      </section>

      <section class="hk-how-section">
        <h3>Where the song data comes from</h3>
        <p>Every song's chords are independently researched and cross-checked against multiple sources —
           never copy-pasted from one site's chord chart, and never bundled with lyrics (not even a short
           excerpt, anywhere, for any song). Each song is honestly labeled <strong>"chords verified"</strong>
           or <strong>"needs verification"</strong> right in the Discover tab — if the research was
           genuinely inconclusive or the harmony too complex for one confident chart, that's stated
           up front instead of guessed at.</p>
      </section>

      <section class="hk-how-section">
        <h3>How classical and jazz pieces are handled</h3>
        <p>Classical pieces in the app use only musical facts (melody, harmony) that are independently
           documented across many sources — never a specific modern publisher's edition, even though the
           underlying compositions are all safely public domain (every composer used died more than 70
           years ago). Where a piece couldn't be confidently simplified without misrepresenting it, it's
           listed as a real, honest "catalog entry" rather than faked into a beginner-friendly version
           that doesn't actually exist.</p>
      </section>

      <section class="hk-how-section">
        <h3>Open-source credit</h3>
        <p>Hayden Keys uses very few outside dependencies by design. The one that matters most:
           <strong>basic-pitch</strong> (Apache License 2.0), Spotify's open-source model for turning
           audio into notes, vendored locally in this app's own code rather than loaded from a CDN, so it
           keeps working even if that CDN ever goes away. Full license details, version numbers, and
           exactly what was checked before including it live in
           <a href="https://github.com/Astryks/haydenkeys/blob/main/THIRD_PARTY_NOTICES.md" target="_blank" rel="noopener">THIRD_PARTY_NOTICES.md</a>.</p>
      </section>

      <section class="hk-how-section">
        <h3>Privacy</h3>
        <p>No account, no server, no data collection — see the full
           <a href="privacy.html">Privacy Policy</a> for exactly what camera/microphone access is used for and
           what's stored (hint: only in your own browser, never sent anywhere).</p>
      </section>

      <section class="hk-how-section">
        <h3>Want the full technical detail?</h3>
        <p>This page is the friendly summary. For the complete, dated log of exactly what's been built,
           verified, and any honest gaps still open, see <a href="https://github.com/Astryks/haydenkeys/blob/main/README.md" target="_blank" rel="noopener">README.md</a> and
           <a href="https://github.com/Astryks/haydenkeys/blob/main/STATUS.md" target="_blank" rel="noopener">STATUS.md</a> in the project's source repository.</p>
      </section>
    </div>`;
}

export { initAboutTab };
