import { icon } from "./icons.js";
import { renderTipJar } from "./tipjar.js";
// "How It Works" — a fun-but-real explanation of how the own-audio-
// upload feature (basic-pitch) figures out notes/chords from a sound
// file. Every technical idea here is real and substantive; only the
// jargon is cut, not the substance, per the brief this content is
// based on. A lightweight animated wave + a static harmonics diagram
// make the two hardest ideas (waves have a frequency; a real note is a
// stack of frequencies, not one) visible rather than just described.

// The page opens with a short, visual tour of the technology and the tip
// jar (app only), then the full explanation of how the app hears notes.
const TECH = [
  ["song", "Upload any song", "A music AI from Spotify, called Basic Pitch, runs right on your phone. It listens to your recording and writes down every note it hears. Then we group the notes into the chords you can play."],
  ["search", "Guess the song", "Apple's ShazamKit turns a few seconds of the song into a tiny audio fingerprint and finds its name. Only the fingerprint is sent, never the recording."],
  ["hand", "Wait for me", "The microphone listens only for your piano keys. It works out the pitch of a single note, and for a chord it checks how strong each of the 12 notes is in the sound, many times a second."],
  ["piano", "A real grand piano", "Every note you hear is a real recording of a Steinway grand piano, key by key, built into the app."],
  ["star", "All on your phone", "No servers and no account. Your progress, your uploads and the AI all stay on your device."],
];

function initHowItWorksTab(root) {
  root.innerHTML = `
    <div class="hk-how">
      <section class="hk-tech">
        <h2>How Hayden Keys works</h2>
        <p class="hk-how-sub">Some amazing technology, packed into a free app.</p>
        <div class="hk-tech-grid">${TECH.map(([ic, t, d]) => `<div class="hk-tech-card">${icon(ic, 40)}<b>${t}</b><p>${d}</p></div>`).join("")}</div>
      </section>
      <div id="hk-tipjar-slot"></div>
      <h2>How does the app know what notes you played?</h2>
      <p class="hk-how-sub">A real, honest explanation of the "upload your own recording" feature — no jargon, no substance cut.</p>

      <section class="hk-how-section">
        <h3>1. Sound is just air wiggling</h3>
        <p>Every sound is air pressure going up and down, over and over, really fast. "Hz" just means
           <strong>how many times per second it wiggles</strong>. Middle C wiggles about
           <strong>261.6 times every second</strong> — that's it, that's a pitch.</p>
        <div class="hk-wave-demo">
          <canvas id="hk-wave-canvas" width="600" height="120"></canvas>
          <div class="hk-wave-controls">
            <label>Frequency: <span id="hk-wave-freq-label">262 Hz (Middle C)</span></label>
            <input type="range" id="hk-wave-freq" min="80" max="800" value="262" />
          </div>
        </div>
        <p class="hk-honest-note">Quick detour on the name: "Hz" is short for Hertz, and it just means
           "wiggles per second" — if a string wiggles back and forth 100 times every second, that's
           100 Hz. It's named after a real scientist, <strong>Heinrich Hertz</strong>, who in the 1880s
           was the first person to actually create and detect invisible waves traveling through the air
           (the same kind radios use today), proving a big theory that had only existed on paper before.
           Scientists later named the unit after him — before that, it was just called "cycles per
           second," which means exactly the same thing (one wiggle = one cycle), just a plainer name.</p>
      </section>

      <section class="hk-how-section">
        <h3>2. A real note is secretly a whole stack of frequencies</h3>
        <p>Here's the part most people never learn: a piano playing "one note" isn't making one clean
           wiggle. It's making a <strong>main frequency</strong> (the "fundamental" — the pitch you
           actually hear) plus a bunch of quieter extra wiggles on top, at exact whole-number multiples
           of it (2×, 3×, 4×...). Those extras are called <strong>overtones</strong> or
           <strong>harmonics</strong>. A piano and a guitar playing "the same note" have the same
           fundamental — but totally different overtone mixes, which is the actual reason they sound
           different. That's it, that's timbre.</p>
        <div class="hk-overtone-diagram" id="hk-overtone-diagram"></div>
      </section>

      <section class="hk-how-section">
        <h3>3. A chord is one messy, tangled-up wave</h3>
        <p>Now play three notes together. You don't get three separate signals — you get
           <strong>one single wave</strong> where every note's fundamental AND every note's overtones
           are all mashed into each other, some literally overlapping at the same frequency. Figuring
           out "which original notes are hiding in this one messy wave" is the actual hard problem.
           You can't just "look" at the wiggly wave and read the notes off it — it's too tangled.</p>
      </section>

      <section class="hk-how-section">
        <h3>4. The trick: turn the sound into a picture, then pattern-match it</h3>
        <p>The model doesn't try to untangle the raw wave directly. First, it converts a short slice of
           audio into something like a bar chart: <strong>"how much energy is at each pitch, right
           now"</strong> (the same basic idea as a spectrogram, if you've seen one). Then a neural
           network — one that was shown thousands of real audio clips <em>where the correct notes were
           already known</em>, during training, long before you ever uploaded anything — recognizes the
           <strong>pattern</strong> of energy that usually means "these specific notes are sounding,"
           even when their overtones overlap confusingly. Learning to recognize that pattern reliably is
           the genuinely hard part — plain math alone can't do it well, which is exactly why this needs
           a trained model instead of a formula.</p>
      </section>

      <section class="hk-how-section">
        <h3>5. The fun detail almost everyone misses</h3>
        <p>The model's actual output is just: <strong>"C, E, and G are sounding together right
           now."</strong> It has no idea that's called a "C major chord" — chord names aren't part of
           what it learned. Turning a note list into a chord name is a completely separate, much
           simpler step: just checking the combination against a lookup table of known chord shapes.
           <strong>Plain pattern-matching, not AI</strong> — the exact same kind of lookup logic this
           app's own 92-song library already uses to label a verified chord progression.</p>
      </section>

      <p class="hk-honest-note">This explanation covers basic-pitch's real approach honestly, simplified
         in wording only. See THIRD_PARTY_NOTICES.md for exactly which model is running and under what
         license.</p>
    </div>`;
  renderTipJar(root.querySelector("#hk-tipjar-slot"));

  initWaveDemo();
  initOvertoneDiagram();
}

function initWaveDemo() {
  const canvas = document.getElementById("hk-wave-canvas");
  const slider = document.getElementById("hk-wave-freq");
  const label = document.getElementById("hk-wave-freq-label");
  if (!canvas || !slider) return;
  const ctx = canvas.getContext("2d");
  let freq = 262;
  let raf = null;
  let t = 0;

  function noteNear(f) {
    if (f > 240 && f < 285) return " (Middle C)";
    if (f > 420 && f < 460) return " (A4, 440 Hz)";
    return "";
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#7c5cff";
    ctx.lineWidth = 2;
    ctx.beginPath();
    const cyclesVisible = freq / 60; // scale so higher freq = visibly more wiggles
    for (let x = 0; x < canvas.width; x++) {
      const phase = (x / canvas.width) * cyclesVisible * 2 * Math.PI + t;
      const y = canvas.height / 2 + Math.sin(phase) * (canvas.height / 2 - 10);
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    t += 0.08;
    raf = requestAnimationFrame(draw);
  }

  slider.addEventListener("input", () => {
    freq = Number(slider.value);
    label.textContent = `${freq} Hz${noteNear(freq)}`;
  });

  draw();
  return () => cancelAnimationFrame(raf);
}

function initOvertoneDiagram() {
  const el = document.getElementById("hk-overtone-diagram");
  if (!el) return;
  const rows = [
    { label: "Fundamental (1×) — the pitch you hear", cycles: 1, opacity: 1 },
    { label: "2nd harmonic (2×)", cycles: 2, opacity: 0.7 },
    { label: "3rd harmonic (3×)", cycles: 3, opacity: 0.5 },
    { label: "4th harmonic (4×)", cycles: 4, opacity: 0.35 },
  ];
  const width = 560;
  const rowHeight = 50;
  const svgRows = rows
    .map((r, i) => {
      const y = i * rowHeight + rowHeight / 2;
      const points = [];
      const steps = 120;
      for (let s = 0; s <= steps; s++) {
        const x = (s / steps) * width;
        const yy = y - Math.sin((s / steps) * r.cycles * 2 * Math.PI) * (rowHeight / 2 - 8);
        points.push(`${x},${yy}`);
      }
      return `
        <text x="0" y="${i * rowHeight + 12}" class="hk-overtone-label">${r.label}</text>
        <polyline points="${points.join(" ")}" fill="none" stroke="#58d68d" stroke-width="2" opacity="${r.opacity}" />`;
    })
    .join("");
  el.innerHTML = `<svg viewBox="0 0 ${width} ${rows.length * rowHeight}" class="hk-overtone-svg">${svgRows}</svg>`;
}

export { initHowItWorksTab };
