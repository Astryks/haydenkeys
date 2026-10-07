import { icon } from "./icons.js";
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
  ["piano", "A real grand piano", "Every note you hear comes from real recordings of a Steinway grand piano, built into the app."],
  ["star", "All on your phone", "No account and no sign-up. Your progress, your uploads and the AI all stay on your device."],
];

function initHowItWorksTab(root) {
  root.innerHTML = `
    <div class="hk-how">
      <section class="hk-tech">
        <h2>How Hayden Keys works</h2>
        <p class="hk-how-sub">Some amazing technology, packed into a free app.</p>
        <div class="hk-tech-grid">${TECH.map(([ic, t, d]) => `<div class="hk-tech-card">${icon(ic, 40)}<b>${t}</b><p>${d}</p></div>`).join("")}</div>
      </section>
      <h2>How does the app know what notes you played?</h2>
      <p class="hk-how-sub">How the "upload your own recording" feature works, in plain words.</p>

      <section class="hk-how-section">
        <h3>1. Sound is just air wiggling</h3>
        <p>Every sound is air wiggling back and forth, really fast. "Hz" means <strong>how many wiggles per second</strong>, and
           Middle C wiggles about <strong>261.6 times every second</strong>.</p>
        <div class="hk-wave-demo">
          <canvas id="hk-wave-canvas" width="600" height="120"></canvas>
          <div class="hk-wave-controls">
            <label>Frequency: <span id="hk-wave-freq-label">262 Hz (Middle C)</span></label>
            <input type="range" id="hk-wave-freq" min="80" max="800" value="262" />
          </div>
        </div>
        <p class="hk-honest-note">"Hz" is short for Hertz, named after scientist <strong>Heinrich Hertz</strong>. In the 1880s he was
           the first to make and detect invisible radio waves. Before that, people just said "cycles per second".</p>
      </section>

      <section class="hk-how-section">
        <h3>2. A note is really a stack of wiggles</h3>
        <p>A piano note isn't one clean wiggle. It has a <strong>main frequency</strong> (the "fundamental", the pitch you hear)
           plus quieter <strong>overtones</strong> on top, at (almost exactly) whole-number multiples (2×, 3×, 4×...).</p>
        <p>A piano and a guitar playing the same note have different overtone mixes. That's a big part of why they
           sound different.</p>
        <div class="hk-overtone-diagram" id="hk-overtone-diagram"></div>
      </section>

      <section class="hk-how-section">
        <h3>3. A chord is one tangled wave</h3>
        <p>Play three notes and you don't get three separate sounds. You get <strong>one single wave</strong>, with all
           their notes and overtones mixed together. Working out which notes are hiding in it is the hard part.</p>
      </section>

      <section class="hk-how-section">
        <h3>4. The trick: turn sound into a picture</h3>
        <p>First, the model turns a tiny slice of sound into a kind of bar chart: <strong>how much energy is at each pitch
           right now</strong>. Then a neural network spots the <strong>pattern</strong> that means "these notes are playing".</p>
        <p>It learned by studying thousands of clips where the right notes were already known. Plain math can't do this
           well, which is why it needs a trained model.</p>
      </section>

      <section class="hk-how-section">
        <h3>5. The AI doesn't know chord names</h3>
        <p>The model only says <strong>"C, E and G are playing now."</strong> It doesn't know that's called a "C major chord".</p>
        <p>Naming the chord is a separate, simple step: matching the notes against a list of chord shapes. That's
           <strong>plain pattern-matching, not AI</strong>, the same kind the app's song library uses.</p>
      </section>

      <p class="hk-honest-note">This is how Spotify's open-source basic-pitch model really works, just in simpler words.
         It's free to use under the Apache License 2.0.</p>
    </div>`;

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
    // Only animate while the How it works page is on screen; the observer
    // below starts it again when the page is shown.
    if (!canvas.isConnected || canvas.offsetParent === null) { raf = null; return; }
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
  if (typeof IntersectionObserver !== "undefined") {
    new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting) && !raf) draw();
    }).observe(canvas);
  }
  return () => cancelAnimationFrame(raf);
}

function initOvertoneDiagram() {
  const el = document.getElementById("hk-overtone-diagram");
  if (!el) return;
  const rows = [
    { label: "Fundamental (1×): the pitch you hear", cycles: 1, opacity: 1 },
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
