// The thank-you moment after a tip: Ginger and Pepper on the piano bench
// lean in and nuzzle (cheeks together, eyes closed happily), their tails
// curl up into a heart, and a little heart made of piano keys rises
// between them and glows. Bigger tips add floating notes (Bravo), then a
// spotlight, a bow and a gentle fall of notes and stars (Encore).
//
// showThanks(tier): tier is "small" | "medium" | "large". Opens a centred
// card over a dimmed backdrop; tap anywhere or "×" to close, closes by
// itself after about 7 seconds. Reduced motion gets the finished picture
// without movement. A soft three-note chime plays if audio is unlocked.
// Never throws.
import { cat, DEFS } from "./cats.js";
import { getAudioContext, playTone } from "./keyboard.js";

const TIERS = ["small", "medium", "large"];
const SUBLINE = {
  small: "You made our day.",
  medium: "Bravo to you!",
  large: "Encore! You are a star.",
};

// Closed, smiling eyes and a little blush, drawn over the open eyes (the
// open ones squeeze shut underneath during the nuzzle).
function happyFace(coat) {
  const calico = coat === "calico";
  const arc = (x) => `M${x - 7.5} 38.4 Q${x} 31.6 ${x + 7.5} 38.4`;
  const under = calico ? `<path d="${arc(37)} ${arc(63)}" class="hk-ty-arc-rim"/>` : "";
  return `<g class="hk-ty-happy">${under}<path d="${arc(37)} ${arc(63)}" class="hk-ty-arc"/>
    <ellipse cx="29" cy="47.5" rx="5.6" ry="2.8" class="hk-ty-blush"/><ellipse cx="71" cy="47.5" rx="5.6" ry="2.8" class="hk-ty-blush"/></g>`;
}

// A heart filled with a run of piano keys (white keys, with black keys in
// the real 2 + 3 pattern), outlined in gold. Centred on (0, 0), ~58 wide.
const HEART_D = "M0 -15 C-4 -26 -17 -30 -25 -23 C-33 -16 -30 -3 -22 5 L0 25 L22 5 C30 -3 33 -16 25 -23 C17 -30 4 -26 0 -15 Z";
function keyHeart() {
  const kw = 5.2, n = 12, x0 = -kw * n / 2;
  const whites = Array.from({ length: n }, (_, i) => `<rect x="${(x0 + i * kw).toFixed(2)}" y="-32" width="${kw}" height="60" class="hk-ty-wkey"/>`).join("");
  // Black keys sit after C, D, F, G and A (positions 0, 1, 3, 4, 5 in each octave of 7).
  const blacks = Array.from({ length: n - 1 }, (_, i) => [0, 1, 3, 4, 5].includes(i % 7)
    ? `<rect x="${(x0 + (i + 1) * kw - 1.7).toFixed(2)}" y="-32" width="3.4" height="30" rx="0.6" class="hk-ty-bkey"/>` : "").join("");
  return `<g class="hk-ty-keyheart"><g class="hk-ty-keyheart-in">
      <path d="${HEART_D}" class="hk-ty-halo" style="transform-box:view-box" transform="scale(1.14)"/>
      <g clip-path="url(#hk-ty-clip)">${whites}${blacks}<rect x="-32" y="-32" width="64" height="16" fill="url(#hk-ty-gloss)"/></g>
      <path d="${HEART_D}" class="hk-ty-rim"/>
      <path d="M-20 -19 C-15 -24 -9 -23 -6 -19" class="hk-ty-shine"/>
    </g></g>`;
}

// A padded piano bench: plum leather with buttons, a walnut frame, turned legs.
const BENCH = `<g class="hk-ty-bench">
    <ellipse cx="150" cy="262" rx="124" ry="5" fill="#2a1d24" opacity="0.18"/>
    <g filter="url(#hc-vol-big)">
      <rect x="44" y="214" width="10" height="46" rx="3" class="hc-wood-dark"/><rect x="246" y="214" width="10" height="46" rx="3" class="hc-wood-dark"/>
      <rect x="34" y="206" width="232" height="14" rx="3" class="hc-wood"/>
      <path d="M30 206 C30 196 36 193 46 193 L254 193 C264 193 270 196 270 206 Z" fill="url(#hk-ty-leather)"/>
    </g>
    <rect x="34" y="206" width="232" height="14" rx="3" filter="url(#hc-grain)" opacity="0.22"/>
    <path d="M40 206.5 H260" stroke="#3a1c2c" stroke-width="1.2" opacity="0.6"/>
    <g fill="#d9b2c4" opacity="0.7"><circle cx="70" cy="200" r="1.3"/><circle cx="110" cy="200" r="1.3"/><circle cx="190" cy="200" r="1.3"/><circle cx="230" cy="200" r="1.3"/></g>
    <path d="M46 195.5 C90 194 210 194 254 195.5" stroke="#fff" stroke-width="1.4" opacity="0.28" fill="none" stroke-linecap="round"/>
  </g>`;

// Each tail rises from behind its cat and draws half of the heart; the
// lower part (where they cross) hides behind the two heads.
const TAIL_L = "M114 178 C120 158 138 134 150 116 C134 104 112 92 114 72 C116 52 142 48 150 66";
const TAIL_R = "M186 178 C180 158 162 134 150 116 C166 104 188 92 186 72 C184 52 158 48 150 66";

function sceneSvg(tier) {
  const notes = tier !== "small" ? `<g class="hk-ty-notes"><text x="58" y="118">♪</text><text x="226" y="104">♫</text><text x="40" y="168">♫</text><text x="246" y="160">♪</text></g>` : "";
  const spot = tier === "large" ? `<g class="hk-ty-spot"><path d="M124 -10 L176 -10 L272 236 Q150 262 28 236 Z" fill="url(#hk-ty-beam)"/><ellipse cx="150" cy="232" rx="128" ry="22" fill="url(#hk-ty-pool)"/></g>` : "";
  const sparkles = `<g class="hk-ty-sparkles"><path d="M92 46 l2.2 5.4 5.4 2.2 -5.4 2.2 -2.2 5.4 -2.2 -5.4 -5.4 -2.2 5.4 -2.2 z"/><path d="M212 36 l1.8 4.4 4.4 1.8 -4.4 1.8 -1.8 4.4 -1.8 -4.4 -4.4 -1.8 4.4 -1.8 z"/><path d="M226 82 l1.4 3.4 3.4 1.4 -3.4 1.4 -1.4 3.4 -1.4 -3.4 -3.4 -1.4 3.4 -1.4 z"/></g>`;
  return `<svg class="hc-cats hk-ty-svg" viewBox="15 24 270 243" role="img" aria-label="Ginger and Pepper nuzzle on the piano bench; their tails make a heart and a heart of piano keys glows between them">${DEFS}
    <defs>
      <clipPath id="hk-ty-clip"><path d="${HEART_D}"/></clipPath>
      <linearGradient id="hk-ty-leather" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9b4d72"/><stop offset="1" stop-color="#5e2645"/></linearGradient>
      <linearGradient id="hk-ty-gloss" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0.55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
      <radialGradient id="hk-ty-halo-gr" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#ffe9a8" stop-opacity="0.95"/><stop offset="0.6" stop-color="#ffd27a" stop-opacity="0.45"/><stop offset="1" stop-color="#ffc06a" stop-opacity="0"/></radialGradient>
      <linearGradient id="hk-ty-beam" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff6d8" stop-opacity="0.75"/><stop offset="1" stop-color="#fff6d8" stop-opacity="0.08"/></linearGradient>
      <radialGradient id="hk-ty-pool" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#fff3c8" stop-opacity="0.8"/><stop offset="1" stop-color="#fff3c8" stop-opacity="0"/></radialGradient>
      <filter id="hk-ty-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur in="SourceGraphic" stdDeviation="5"/></filter>
    </defs>
    ${spot}${BENCH}
    <g class="hk-ty-tails" filter="url(#hc-fur)"><g filter="url(#hc-vol)">
      <path d="${TAIL_L}" pathLength="100" class="hk-ty-tail hk-ty-tail-g"/>
      <path d="${TAIL_R}" pathLength="100" class="hk-ty-tail hk-ty-tail-c"/>
    </g></g>
    <g style="transform-box:view-box" transform="translate(150 84) scale(0.8)">${keyHeart()}</g>
    <g style="transform-box:view-box" transform="translate(62 90)"><g class="hk-ty-cat hk-ty-ginger">${cat("ginger", { face: happyFace("ginger") })}</g></g>
    <g style="transform-box:view-box" transform="translate(138 90)"><g class="hk-ty-cat hk-ty-pepper">${cat("calico", { blink: 1.3, face: happyFace("calico") })}</g></g>
    ${notes}${sparkles}
  </svg>`;
}

// A soft, warm three-note rising chime on the app's own piano. Quietly
// does nothing if the audio engine is not unlocked yet.
function chime() {
  try {
    const ctx = getAudioContext();
    if (!ctx || ctx.state !== "running") return;
    [76, 79, 84].forEach((m, i) => playTone(m, { delay: i * 0.17, duration: i === 2 ? 1.6 : 0.9, velocity: 88 }));
  } catch (e) { /* no sound is fine */ }
}

function confettiHtml() {
  const glyphs = ["♪", "★", "♫", "✦", "♩", "★"];
  const colors = ["#f2c94c", "#e7849c", "#8a63d2", "#f0a35e", "#ffffff"];
  return Array.from({ length: 30 }, (_, i) => {
    const left = (i * 37 + 11) % 100, dur = 3.4 + ((i * 7) % 10) / 6, delay = ((i * 13) % 20) / 10;
    return `<span style="left:${left}%;color:${colors[i % colors.length]};font-size:${12 + ((i * 5) % 12)}px;animation-duration:${dur.toFixed(2)}s,${(1.2 + (i % 4) * 0.3).toFixed(2)}s;animation-delay:calc(var(--hk-ty-d) + ${(2.6 + delay).toFixed(2)}s),0s">${glyphs[i % glyphs.length]}</span>`;
  }).join("");
}

let current = null;

function closeThanks() {
  const el = current;
  if (!el) return;
  current = null;
  clearTimeout(el._timer);
  document.removeEventListener("keydown", el._onKey, true);
  el.classList.add("hk-ty-out");
  setTimeout(() => { try { el.remove(); } catch (e) { /* gone */ } }, 320);
  try { el._returnFocus?.focus?.({ preventScroll: true }); } catch (e) { /* ignore */ }
}

function showThanks(tier = "small") {
  try {
    if (!TIERS.includes(tier)) tier = "small";
    if (current) { current.remove(); current = null; }
    const el = document.createElement("div");
    el.className = `hk-ty hk-ty-${tier}`;
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-modal", "true");
    el.setAttribute("aria-label", "Thank you");
    el.innerHTML = `<div class="hk-ty-card">
        <button class="hk-ty-x" type="button" aria-label="Close">×</button>
        <div class="hk-ty-stage">${sceneSvg(tier)}</div>
        <p class="hk-ty-cap">Thank you, from Ginger &amp; Pepper ♥</p>
        <p class="hk-ty-sub">${SUBLINE[tier]}</p>
      </div>${tier === "large" ? `<div class="hk-ty-confetti" aria-hidden="true">${confettiHtml()}</div>` : ""}`;
    el._returnFocus = document.activeElement;
    el.addEventListener("click", closeThanks);
    el._onKey = (e) => { if (e.key === "Escape") closeThanks(); };
    document.addEventListener("keydown", el._onKey, true);
    document.body.appendChild(el);
    current = el;
    el.querySelector(".hk-ty-x")?.focus({ preventScroll: true });
    el._timer = setTimeout(closeThanks, tier === "large" ? 8000 : 7000);
    chime();
  } catch (e) {
    try { console.warn("Hayden Keys: thank-you card could not open.", e); } catch (_) { /* ignore */ }
  }
}

export { showThanks, closeThanks };
