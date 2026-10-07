// Hayden Keys' logo: two cats and their pianos, drawn in SVG so they stay
// crisp and can move. Ginger is an orange-and-white tabby; Pepper is a
// calico (black head with a ginger patch, white muzzle and paws).
//
// catsSvg("scene"): the opening show (12 s loop). They sit on top of the
//   two pianos, swap pianos with big jumps, walk on the keys (keys light
//   up, notes float), Ginger chases his tail, Pepper pounces on a note,
//   then they hop onto the upright and snuggle, and hop home again.
// catsSvg("logo"): the header logo. The two snuggled up on a little piano,
//   tails swishing, blinking, a heart floating up now and then.

// One cat in a 100 x 110 box, sitting, facing us a little to the side;
// its feet are at y = 105. Drawn to look like a real cat: a pear-shaped
// body, front legs as columns, tail curled round the paws, almond eyes
// with slit pupils, fur texture and light from the top left.
function cat(coat, { blink = 0 } = {}) {
  const calico = coat === "calico";
  const head = calico ? "hc-black" : "hc-ginger";
  const iris = "url(#hc-gr-iris-green)";
  const eye = (cx) => `<path d="M${cx - 7} 37 Q${cx} 30.5 ${cx + 7} 37 Q${cx} 42 ${cx - 7} 37 Z" fill="#fdfbf2"/>
      <g class="hc-look"><circle cx="${cx}" cy="36.6" r="4.4" fill="${iris}"/><ellipse cx="${cx}" cy="36.6" rx="1.2" ry="3.7" fill="#14110f"/>
      <circle cx="${cx + 1.6}" cy="34.8" r="1.3" fill="#fff"/><circle cx="${cx - 1.6}" cy="38.4" r="0.6" fill="#fff" opacity="0.8"/></g>
      <path d="M${cx - 7} 37 Q${cx} 30.5 ${cx + 7} 37" class="hc-lid"/>`;
  return `<g class="hc-cat hc-coat-${coat}">
    <ellipse cx="50" cy="106" rx="34" ry="4.5" class="hc-shadow"/>
    <g filter="url(#hc-fur)"><g filter="url(#hc-vol)">
      <path class="hc-tail" d="M74 100 C96 101 100 86 90 74" fill="none" stroke-linecap="round"/>
      <path d="M22 102 C12 82 18 58 36 52 L64 52 C82 58 88 82 78 102 Q50 108 22 102 Z" class="${calico ? "hc-white" : "hc-ginger"}"/>
      ${calico ? '<path d="M24 92 C16 76 22 60 34 56 Q38 74 30 96 Z" class="hc-black"/><path d="M70 60 C82 66 84 84 78 98 Q66 84 66 66 Z" class="hc-orange"/>' : '<path d="M26 74 q6 -2 10 2 M24 86 q6 -2 10 2 M74 74 q-6 -2 -10 2 M76 86 q-6 -2 -10 2" class="hc-stripe"/>'}
      <path d="M36 56 C36 74 38 88 42 104 L58 104 C62 88 64 74 64 56 Z" class="hc-white"/>
      <path d="M37 64 C36 80 38 94 39 104 L49 104 C49 92 49 78 48.5 66 Z M63 64 C64 80 62 94 61 104 L51 104 C51 92 51 78 51.5 66 Z" class="hc-white hc-legs"/>
      <path d="M48.5 70 C49 84 49 96 49 104 M51.5 70 C51 84 51 96 51 104" class="hc-leg-gap"/>
      <ellipse cx="44" cy="103.5" rx="6.8" ry="3.6" class="hc-white"/><ellipse cx="56" cy="103.5" rx="6.8" ry="3.6" class="hc-white"/>
      <path d="M41.5 102 v3 M44 101.6 v3.4 M46.5 102 v3 M53.5 102 v3 M56 101.6 v3.4 M58.5 102 v3" class="hc-toes"/>
      <path d="M42 66 l3 4 3 -4 3 4 3 -4 3 4" class="hc-fluff"/>
      <path d="M23 80 l-3 1 M22 88 l-3 1 M24 96 l-3 2 M77 80 l3 1 M78 88 l3 1 M76 96 l3 2 M40 60 l-2 3 M60 60 l2 3" class="hc-strands"/>
      <ellipse cx="50" cy="58" rx="20" ry="5" class="hc-ao"/></g>
      <g class="hc-head" filter="url(#hc-vol)">
        <path d="M24 31 L21 5 Q22 2 25 4 L42 17 Z" class="${head}"/><path d="M27 27 L25 10 L37 18 Z" class="hc-ear-in"/><path d="M28 24 l3 -6 M30 26 l4 -5" class="hc-ear-tuft"/>
        <path d="M76 31 L79 5 Q78 2 75 4 L58 17 Z" class="${head}"/><path d="M73 27 L75 10 L63 18 Z" class="hc-ear-in"/><path d="M72 24 l-3 -6 M70 26 l-4 -5" class="hc-ear-tuft"/>
        <path d="M20 40 C20 23 33 15 50 15 C67 15 80 23 80 40 C80 50 74 56 66 58 Q50 63 34 58 C26 56 20 50 20 40 Z" class="${head}"/>
        ${calico ? '<path d="M50 16 C40 16 30 22 28 32 Q38 34 46 28 Q50 22 50 16 Z" class="hc-orange"/>' : '<path d="M50 17 v7 M44 18 l2 6 M56 18 l-2 6 M24 38 h6 M24 43 h5 M76 38 h-6 M76 43 h-5" class="hc-stripe"/>'}
        <path d="M50 26 C45 34 40 44 38 52 Q50 60 62 52 C60 44 55 34 50 26 Z" class="hc-white"/>
        <g class="hc-eyes" style="animation-delay:${blink}s">${eye(37)}${eye(63)}</g>
        <ellipse cx="44.5" cy="51" rx="6" ry="4.4" class="hc-pad"/><ellipse cx="55.5" cy="51" rx="6" ry="4.4" class="hc-pad"/>
        <path d="M46.6 45.5 Q50 44.4 53.4 45.5 L50 49.4 Z" class="hc-nose"/><path d="M48 45.7 q2 -0.6 3.5 0" stroke="#fff" stroke-width="0.6" opacity="0.6" fill="none"/>
        <path d="M50 49.4 v2.2 M50 51.6 q-2.6 2.4 -5 0.8 M50 51.6 q2.6 2.4 5 0.8" class="hc-mouth"/>
        <g class="hc-whiskers"><path d="M43 50 Q32 48 22 49 M43 52 Q32 52 23 55 M43 53.5 Q34 56 26 60 M57 50 Q68 48 78 49 M57 52 Q68 52 77 55 M57 53.5 Q66 56 74 60" class="hc-whisker"/>
          <circle cx="42" cy="50" r="0.5"/><circle cx="41" cy="52.5" r="0.5"/><circle cx="58" cy="50" r="0.5"/><circle cx="59" cy="52.5" r="0.5"/></g>
        <path d="M24 30 C30 20 40 17 50 17" class="hc-rim"/>
        <path d="M21 44 l-3 2 M22 48 l-3 3 M24 52 l-2 3 M79 44 l3 2 M78 48 l3 3 M76 52 l2 3 M44 20 l1 -3 M50 18 v-3 M56 20 l-1 -3" class="hc-strands"/>
      </g>
    </g>
  </g>`;
}

// One cat in side view, facing right, standing/walking, in a 130 x 92 box
// with its feet at y = 88. Every leg is its own jointed group (thigh/upper
// arm + lower leg + paw) so a walk cycle can swing them; the tail, head and
// body are separate too.
function catSide(coat, { blink = 0 } = {}) {
  const calico = coat === "calico";
  const fur = calico ? "hc-white" : "hc-ginger";
  const headFur = calico ? "hc-black" : "hc-ginger";
  const leg = (cls, x, far, white) => {
    const c = white ? "hc-white" : fur;
    return `<g class="hc-sl ${cls}${far ? " hc-far" : ""}" filter="url(#hc-vol)">
      <path d="M${x - 9} 44 Q${x - 12} 60 ${x - 6} 71 L${x + 6} 71 Q${x + 11} 58 ${x + 9} 44 Z" class="${far ? "hc-shade " : ""}${c}"/>
      <g class="hc-sl-low"><path d="M${x - 6} 68 Q${x - 7} 78 ${x - 5} 84 L${x + 5} 84 Q${x + 7} 76 ${x + 6} 68 Z" class="${far ? "hc-shade " : ""}${c}"/>
      <ellipse cx="${x + 2}" cy="85" rx="7.5" ry="3.8" class="${far ? "hc-shade " : ""}hc-white"/><path d="M${x} 84 v2.6 M${x + 3} 84 v2.6 M${x + 6} 84.4 v2" class="hc-toes"/></g></g>`;
  };
  return `<g class="hc-cat-side hc-coat-${coat}">
    <ellipse cx="62" cy="89" rx="44" ry="3.5" class="hc-shadow"/>
    <g filter="url(#hc-fur)">
      ${leg("hc-sl-bf", 34, true)}${leg("hc-sl-ff", 88, true, true)}
      <path class="hc-tail hc-side-tail ${calico ? "" : "hc-ginger-tail"}" d="M28 44 C14 40 10 26 16 12" fill="none" stroke-linecap="round"/>
      <g class="hc-side-body" filter="url(#hc-vol)">
        <path d="M24 46 C24 32 40 28 62 30 C82 31 96 34 98 46 C99 58 88 64 62 64 C38 64 24 60 24 46 Z" class="${fur}"/>
        ${calico ? '<path d="M38 31 C48 28 62 29 70 31 Q66 44 50 46 Q38 44 38 31 Z" class="hc-black"/><path d="M26 44 C26 36 32 32 38 32 Q40 46 30 56 Q25 52 26 44 Z" class="hc-orange"/>' : '<path d="M44 33 q-3 8 0 14 M56 31 q-3 8 0 15 M68 31 q-3 8 0 15 M80 33 q-3 7 0 13" class="hc-stripe"/>'}
        <path d="M70 58 C78 64 92 60 96 50 Q90 64 76 64 Z" class="hc-white"/>
      </g>
      ${leg("hc-sl-bn", 40, false)}${leg("hc-sl-fn", 92, false, true)}
      <g class="hc-side-head" filter="url(#hc-vol)">
        <path d="M90 18 L92 2 L102 12 Z" class="${headFur}"/><path d="M92 15 L93 6 L99 12 Z" class="hc-ear-in"/>
        <path d="M104 14 L110 0 L114 16 Z" class="${headFur}"/><path d="M106 14 L110 5 L112 15 Z" class="hc-ear-in"/>
        <path d="M86 32 C86 18 96 12 106 12 C116 12 122 20 122 30 C122 40 114 46 104 46 C94 46 86 42 86 32 Z" class="${headFur}"/>
        ${calico ? '<path d="M104 13 C112 13 118 18 120 26 Q110 26 104 20 Z" class="hc-orange"/>' : '<path d="M100 14 v5 M105 13 v5 M110 14 v5" class="hc-stripe"/>'}
        <path d="M110 26 C116 28 124 32 122 38 C118 44 108 44 104 40 Q104 32 110 26 Z" class="hc-white"/>
        <g class="hc-eyes" style="animation-delay:${blink}s"><path d="M106 26 Q111 21.5 116 26 Q111 29.5 106 26 Z" fill="#fdfbf2"/>
          <g class="hc-look"><circle cx="112" cy="25.8" r="3.2" fill="url(#hc-gr-iris-green)"/><ellipse cx="112.4" cy="25.8" rx="0.9" ry="2.7" fill="#14110f"/><circle cx="113.4" cy="24.6" r="0.9" fill="#fff"/></g>
          <path d="M106 26 Q111 21.5 116 26" class="hc-lid"/></g>
        <path d="M120.5 33 L123.5 33.6 L121.6 36 Z" class="hc-nose"/>
        <path d="M121.6 36 q-1 2.6 -4 2.4" class="hc-mouth"/>
        <path d="M117 36 Q128 34 136 33 M117 37.5 Q127 38 134 40" class="hc-whisker"/>
      </g>
    </g>
  </g>`;
}

// An upright piano (left) and a grand (right) on a 400 x 240 stage.
function upright(x, y, w = 132) {
  const kw = (w - 16) / 11;
  const keys = Array.from({ length: 11 }, (_, i) => `<rect x="${x + 8 + i * kw}" y="${y + 70}" width="${kw - 1.2}" height="18" rx="1" class="hc-wkey"/>`).join("");
  const blacks = [0, 1, 3, 4, 5, 7, 8].map((i) => `<rect x="${x + 8 + (i + 0.68) * kw}" y="${y + 70}" width="6" height="11" rx="1" class="hc-bkey"/><rect x="${x + 9 + (i + 0.68) * kw}" y="${y + 70}" width="1.6" height="9" fill="#fff" opacity="0.25"/>`).join("");
  return `<g class="hc-upright">
    <ellipse cx="${x + w / 2}" cy="${y + 151}" rx="${w / 2 + 6}" ry="4" fill="#2a1d10" opacity="0.18"/>
    <g filter="url(#hc-vol-big)">
      <rect x="${x}" y="${y}" width="${w}" height="132" rx="8" class="hc-wood"/>
      <rect x="${x - 4}" y="${y - 4}" width="${w + 8}" height="9" rx="3" class="hc-wood"/>
      <rect x="${x - 4}" y="${y + 64}" width="${w + 8}" height="30" rx="4" class="hc-wood"/>
      <rect x="${x + 6}" y="${y + 120}" width="10" height="30" rx="2" class="hc-wood-dark"/><rect x="${x + w - 16}" y="${y + 120}" width="10" height="30" rx="2" class="hc-wood-dark"/>
    </g>
    <rect x="${x}" y="${y}" width="${w}" height="132" rx="8" filter="url(#hc-grain)" opacity="0.22"/>
    <rect x="${x + 10}" y="${y + 12}" width="${w - 20}" height="46" rx="5" class="hc-wood-dark"/>
    <rect x="${x + 14}" y="${y + 16}" width="${w - 28}" height="38" rx="3" fill="none" stroke="#c48a58" stroke-width="1.2" opacity="0.6"/>
    <rect x="${x + 4}" y="${y + 66}" width="${w - 8}" height="4" fill="#5c3418"/>
    ${keys}${blacks}
    <rect x="${x + 6}" y="${y + 88}" width="${w - 12}" height="3" fill="#000" opacity="0.18"/>
    <circle cx="${x + w / 2}" cy="${y + 108}" r="3" fill="#e8c27a"/>
  </g>`;
}
function grand(x, y) {
  const keys = Array.from({ length: 10 }, (_, i) => `<rect x="${x + 14 + i * 12}" y="${y + 52}" width="10.8" height="16" rx="1" class="hc-wkey"/>`).join("");
  const blacks = [0, 1, 3, 4, 5, 7, 8].map((i) => `<rect x="${x + 14 + i * 12 + 8}" y="${y + 52}" width="5" height="10" rx="1" class="hc-bkey"/>`).join("");
  return `<g class="hc-grand">
    <ellipse cx="${x + 80}" cy="${y + 133}" rx="84" ry="4" fill="#000" opacity="0.18"/>
    <g filter="url(#hc-vol-big)">
      <path d="M${x} ${y + 20} L${x + 150} ${y + 20} Q${x + 170} ${y + 22} ${x + 166} ${y + 44} L${x + 150} ${y + 64} L${x} ${y + 64} Z" class="hc-black-wood"/>
      <path d="M${x + 4} ${y + 18} L${x + 122} ${y - 32} L${x + 130} ${y - 26} L${x + 22} ${y + 18} Z" class="hc-black-wood"/>
      <rect x="${x + 8}" y="${y + 48}" width="130" height="22" rx="3" class="hc-black-wood"/>
      <rect x="${x + 14}" y="${y + 64}" width="8" height="68" rx="2" class="hc-black-wood"/><rect x="${x + 134}" y="${y + 64}" width="8" height="68" rx="2" class="hc-black-wood"/>
    </g>
    <path d="M${x + 70} ${y + 20} L${x + 92} ${y - 12}" stroke="#16141a" stroke-width="2.5"/>
    <path d="M${x + 6} ${y + 22} L${x + 160} ${y + 24}" stroke="#fff" stroke-width="1.6" opacity="0.35"/>
    <path d="M${x + 10} ${y + 16} L${x + 118} ${y - 28}" stroke="#fff" stroke-width="1.4" opacity="0.3"/>
    ${keys}${blacks}
    <rect x="${x + 14}" y="${y + 125}" width="8" height="7" fill="#d4af6a"/><rect x="${x + 134}" y="${y + 125}" width="8" height="7" fill="#d4af6a"/>
  </g>`;
}

// Keys that light up while a cat walks on them (timed in the CSS).
const GLOWS = `<g class="hc-glows">
  <rect x="266" y="144" width="10.5" height="16" class="hc-glow hc-glow-1"/><rect x="290" y="144" width="10.5" height="16" class="hc-glow hc-glow-2"/><rect x="314" y="144" width="10.5" height="16" class="hc-glow hc-glow-3"/>
  <rect x="50" y="148" width="10" height="18" class="hc-glow hc-glow-4"/><rect x="72" y="148" width="10" height="18" class="hc-glow hc-glow-5"/><rect x="94" y="148" width="10" height="18" class="hc-glow hc-glow-6"/>
</g>`;
const NOTES = `<g class="hc-notes"><text x="280" y="120" class="hc-n1">♪</text><text x="304" y="108" class="hc-n2">♫</text><text x="70" y="128" class="hc-n3">♪</text><text x="96" y="116" class="hc-n4">♬</text><text x="200" y="70" class="hc-n5">♪</text></g>`;
const HEART = (x, y) => `<path class="hc-heart" d="M${x} ${y + 6} C${x - 10} ${y - 4} ${x - 4} ${y - 14} ${x} ${y - 6} C${x + 4} ${y - 14} ${x + 10} ${y - 4} ${x} ${y + 6} Z"/>`;

// ----- Extra scenes, shown now and then (each loops on its own) -----

const tree = (x, y) => {
  const tier = (cy, w, h) => `<path d="M${x} ${cy - h} C${x - w * 0.3} ${cy - h * 0.5} ${x - w * 0.7} ${cy - h * 0.15} ${x - w} ${cy} Q${x - w * 0.5} ${cy + 6} ${x} ${cy + 2} Q${x + w * 0.5} ${cy + 6} ${x + w} ${cy} C${x + w * 0.7} ${cy - h * 0.15} ${x + w * 0.3} ${cy - h * 0.5} ${x} ${cy - h} Z" fill="url(#hc-gr-fir)"/>`;
  const needles = Array.from({ length: 26 }, (_, i) => { const t = i / 26; const yy = y + 20 + t * 100; const xx = x + (i % 2 ? 1 : -1) * (6 + t * 50 * ((i * 7) % 5) / 5); return `<path d="M${xx} ${yy} l${i % 2 ? 6 : -6} 5" />`; }).join("");
  const ball = (cx, cy, c) => `<circle cx="${cx}" cy="${cy}" r="5.5" fill="${c}"/><circle cx="${cx - 1.8}" cy="${cy - 1.8}" r="1.8" fill="#fff" opacity="0.75"/>`;
  return `<g class="hc-tree">
    <ellipse cx="${x}" cy="${y + 136}" rx="70" ry="4" fill="#000" opacity="0.15"/>
    <rect x="${x - 7}" y="${y + 116}" width="14" height="18" rx="2" fill="#6b3f1f"/>
    <g filter="url(#hc-vol-big)">${tier(y + 120, 62, 46)}${tier(y + 86, 48, 42)}${tier(y + 54, 34, 40)}${tier(y + 24, 20, 34)}</g>
    <g class="hc-needles">${needles}</g>
    <path d="M${x - 44} ${y + 98} Q${x} ${y + 112} ${x + 50} ${y + 92} M${x - 30} ${y + 64} Q${x} ${y + 76} ${x + 34} ${y + 60}" class="hc-tinsel"/>
    <g class="hc-orn hc-orn-1">${ball(x - 18, y + 50, "#f5c542")}</g><g class="hc-orn hc-orn-2">${ball(x + 20, y + 74, "#e04848")}</g>
    <g class="hc-orn hc-orn-3">${ball(x - 32, y + 104, "#4a9bc9")}</g><g class="hc-orn hc-orn-1">${ball(x + 34, y + 110, "#b072d6")}</g>
    <g class="hc-bauble"><path d="M${x + 40} ${y + 98} v16" stroke="#c9b8a6" stroke-width="1.5"/>${ball(x + 40, y + 120, "#e04848")}</g>
    <path d="M${x} ${y - 24} l4 10 11 1 -8 7 3 11 -10 -6 -10 6 3 -11 -8 -7 11 -1z" fill="url(#hc-gr-star)" stroke="#d9a72e" stroke-width="1"/>
    <g filter="url(#hc-vol)"><rect x="${x + 52}" y="${y + 114}" width="30" height="22" rx="2" fill="#8a63d2"/><rect x="${x + 64}" y="${y + 114}" width="6" height="22" fill="#f5c542"/></g>
  </g>`;
};
const keyboardStrip = (y) => {
  const w = Array.from({ length: 24 }, (_, i) => `<rect x="${8 + i * 16}" y="${y}" width="15" height="40" class="hc-wkey"/>`).join("");
  const b = Array.from({ length: 24 }, (_, i) => [0, 1, 3, 4, 5].includes(i % 7) && i < 23 ? `<rect x="${8 + i * 16 + 11}" y="${y}" width="9" height="24" class="hc-bkey"/>` : "").join("");
  const g = Array.from({ length: 12 }, (_, i) => `<rect x="${8 + i * 32}" y="${y}" width="15" height="40" class="hc-glow hc-run-glow" style="animation-delay:${(i * 0.16).toFixed(2)}s"/>`).join("");
  return `<rect x="0" y="${y - 14}" width="400" height="14" class="hc-black-wood"/>${w}${b}${g}`;
};
const actor = (coat, cls, blink = 0) => `<g class="hc-actor ${cls}"><g class="hc-bob">${cat(coat, { blink })}</g></g>`;

const SCENES = {
  show: () => `<path d="M0 232 H400" class="hc-floor"/>
    ${upright(26, 82)}${grand(228, 92)}${GLOWS}${NOTES}
    <g class="hc-actor hc-a-ginger">${cat("ginger")}</g>
    <g class="hc-actor hc-a-calico">${cat("calico", { blink: 1.7 })}</g>
    ${HEART(124, 14)}`,
  // Sniffing the Christmas tree; Pepper bats a bauble.
  xmas: () => `<path d="M0 232 H400" class="hc-floor"/>${tree(250, 86)}
    ${actor("ginger", "hc-x-ginger")}${actor("calico", "hc-x-calico", 1.2)}
    <g class="hc-sniff"><circle cx="196" cy="198" r="2.5"/><circle cx="204" cy="190" r="2"/><circle cx="211" cy="198" r="1.6"/></g>`,
  // Running across a long keyboard, keys lighting up under their paws.
  run: () => `${keyboardStrip(186)}<g class="hc-notes hc-run-notes"><text x="90" y="120">♪</text><text x="200" y="100">♫</text><text x="300" y="120">♪</text></g>
    ${actor("ginger", "hc-r-ginger")}${actor("calico", "hc-r-calico", 0.7)}`,
  // Trying to scoop the goldfish out of its bowl.
  fish: () => `<path d="M0 232 H400" class="hc-floor"/>
    <rect x="104" y="170" width="200" height="10" rx="3" class="hc-wood"/><rect x="116" y="180" width="8" height="52" class="hc-wood-dark"/><rect x="284" y="180" width="8" height="52" class="hc-wood-dark"/>
    <g class="hc-bowl"><ellipse cx="220" cy="170" rx="34" ry="3" fill="#000" opacity="0.15"/>
      <path d="M186 104 Q166 140 196 168 H244 Q274 140 254 104 Z" fill="url(#hc-gr-glass)"/>
      <path d="M179 126 Q220 134 261 126 Q266 150 244 168 H196 Q174 150 179 126 Z" fill="url(#hc-gr-water)"/>
      <ellipse cx="220" cy="128" rx="41" ry="4" fill="#cdeefc" opacity="0.8"/>
      <path d="M200 166 Q206 158 212 166 Q218 158 226 166 Q232 158 240 166 Z" fill="#c9b79c"/>
      <path d="M232 164 q-6 -14 2 -26 M236 164 q4 -12 -2 -22" stroke="#4fae6c" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M186 104 Q166 140 196 168 H244 Q274 140 254 104" fill="none" stroke="#a9d8ef" stroke-width="2.5"/>
      <ellipse cx="220" cy="104" rx="34" ry="4" fill="none" stroke="#a9d8ef" stroke-width="2.5"/>
      <path d="M190 116 Q182 136 194 156" stroke="#fff" stroke-width="4" opacity="0.6" fill="none" stroke-linecap="round"/>
      <g class="hc-goldfish"><path d="M210 146 q10 -9 20 0 q-10 9 -20 0z" fill="#f2994a"/><path d="M230 146 l9 -7 v14z" fill="#f2994a"/><circle cx="214" cy="145" r="1.5" fill="#2a2a3a"/></g>
      <g class="hc-bubbles"><circle cx="222" cy="128" r="2.5"/><circle cx="228" cy="118" r="2"/></g></g>
    ${actor("ginger", "hc-f-ginger")}<ellipse class="hc-paw-reach" cx="196" cy="112" rx="9" ry="7"/>
    ${actor("calico", "hc-f-calico", 1.5)}`,
  // Balancing along a plank laid between two stools.
  plank: () => `<path d="M0 232 H400" class="hc-floor"/>
    <rect x="34" y="170" width="40" height="62" class="hc-wood-dark"/><rect x="326" y="170" width="40" height="62" class="hc-wood-dark"/>
    <g class="hc-plank"><rect x="30" y="160" width="340" height="12" rx="3" class="hc-wood"/></g>
    ${actor("ginger", "hc-p-ginger")}${actor("calico", "hc-p-calico", 0.9)}`,
  // Chasing each other over and around the piano.
  chase: () => `<path d="M0 232 H400" class="hc-floor"/>${upright(134, 82)}
    ${actor("calico", "hc-c-calico", 0.5)}${actor("ginger", "hc-c-ginger")}`,
};
// ----- Cozy scenes -----
const sideActor = (coat, cls, blink = 0) => `<g class="hc-actor ${cls}"><g class="hc-bob">${catSide(coat, { blink })}</g></g>`;
const table = (y) => `<g filter="url(#hc-vol-big)"><rect x="0" y="${y}" width="400" height="14" rx="3" class="hc-wood"/></g><rect x="0" y="${y}" width="400" height="14" filter="url(#hc-grain)" opacity="0.25"/><rect x="0" y="${y + 14}" width="400" height="${240 - y - 14}" fill="#efe4d4"/>`;
const steam = (x, y) => `<g class="hc-steam"><path d="M${x - 10} ${y} q-8 -14 0 -26 q8 -12 0 -26"/><path d="M${x} ${y - 4} q-8 -14 0 -26 q8 -12 0 -26"/><path d="M${x + 10} ${y} q-8 -14 0 -26 q8 -12 0 -26"/></g>`;
const mug = (x, y) => `<g class="hc-mug"><ellipse cx="${x}" cy="${y + 64}" rx="40" ry="5" fill="#000" opacity="0.15"/>
    <g filter="url(#hc-vol-big)"><path d="M${x + 30} ${y + 14} q26 0 24 22 q-2 20 -26 18" fill="none" stroke="#e7849c" stroke-width="9" stroke-linecap="round"/>
    <path d="M${x - 34} ${y} L${x + 34} ${y} L${x + 30} ${y + 58} Q${x} ${y + 66} ${x - 30} ${y + 58} Z" fill="url(#hc-gr-mug)"/></g>
    <ellipse cx="${x}" cy="${y}" rx="34" ry="7" fill="#7a4a26"/><ellipse cx="${x}" cy="${y + 1}" rx="28" ry="5" fill="url(#hc-gr-latte)"/>
    <path d="M${x} ${y + 4} c-6 -4 -8 -9 -3 -10 q3 0 3 3 q0 -3 3 -3 c5 1 3 6 -3 10z" fill="#fff7ea"/>
    <path d="M${x - 26} ${y + 10} Q${x - 30} ${y + 34} ${x - 24} ${y + 52}" stroke="#fff" stroke-width="4" opacity="0.45" fill="none" stroke-linecap="round"/>
    <path d="M${x - 20} ${y + 30} q4 -6 8 0 q4 -6 8 0" fill="none" stroke="#fff" stroke-width="2" opacity="0.7"/>
    ${steam(x, y - 8)}</g>`;
const croissant = (x, y) => `<g filter="url(#hc-vol)"><ellipse cx="${x}" cy="${y + 8}" rx="34" ry="7" fill="#f6f1ea" stroke="#d9cfc2"/>
    <path d="M${x - 26} ${y + 4} Q${x - 18} ${y - 14} ${x} ${y - 14} Q${x + 18} ${y - 14} ${x + 26} ${y + 4} Q${x + 14} ${y - 2} ${x} ${y - 2} Q${x - 14} ${y - 2} ${x - 26} ${y + 4} Z" fill="url(#hc-gr-pastry)"/></g>
    <path d="M${x - 12} ${y - 12} q2 8 0 12 M${x} ${y - 14} v12 M${x + 12} ${y - 12} q-2 8 0 12" stroke="#a5642a" stroke-width="1.4" fill="none"/>`;
Object.assign(SCENES, {
  // A big steaming latte: Pepper reaches for the steam, Ginger sniffs.
  coffee: () => `${table(176)}
    <g style="transform-box:view-box" transform="translate(196 176) scale(0.42) translate(-196 -176)">${mug(196, 108)}</g>
    <g style="transform-box:view-box" transform="translate(330 176) scale(0.5) translate(-330 -176)">${croissant(330, 168)}</g>
    ${actor("ginger", "hc-cf-ginger")}${actor("calico", "hc-cf-calico", 1.1)}`,
  // A ticking metronome on the piano; Ginger's eyes follow the arm.
  metronome: () => `<path d="M0 232 H400" class="hc-floor"/>${upright(100, 82, 200)}
    <g class="hc-metro"><g filter="url(#hc-vol)"><path d="M262 82 L276 30 L290 30 L304 82 Z" fill="url(#hc-gr-wood)"/></g><rect x="270" y="58" width="26" height="18" rx="2" fill="#f3e6cf"/>
      <g class="hc-metro-arm"><path d="M283 74 L283 34" stroke="#c9ced6" stroke-width="2.4"/><rect x="279" y="44" width="8" height="6" rx="1.5" fill="#d4af6a"/></g></g>
    <g class="hc-sheet"><path d="M150 80 l40 -8 l6 30 l-40 8 z" fill="#fffdf6" stroke="#d8d0c2"/><path d="M156 82 l32 -6 M157 88 l32 -6 M158 94 l32 -6" stroke="#9b8f7c" stroke-width="0.8"/></g>
    <g class="hc-actor hc-mt-ginger">${cat("ginger")}</g><g class="hc-actor hc-mt-calico">${cat("calico", { blink: 0.8 })}</g>`,
  // Rain on the window, a warm lamp inside; both cats on the sill.
  window: () => `<rect x="0" y="0" width="400" height="240" fill="#f3e7d6"/>
    <g filter="url(#hc-vol-big)"><rect x="80" y="20" width="240" height="160" rx="6" fill="#8c5a33"/></g>
    <rect x="92" y="32" width="216" height="136" fill="url(#hc-gr-sky)"/>
    <g class="hc-rain">${Array.from({ length: 18 }, (_, k) => `<path d="M${100 + ((k * 37) % 200)} ${36 + ((k * 23) % 60)} l-3 10" style="animation-delay:${((k * 0.17) % 1).toFixed(2)}s"/>`).join("")}</g>
    <path d="M200 32 V168 M92 100 H308" stroke="#8c5a33" stroke-width="7"/>
    <g filter="url(#hc-vol-big)"><rect x="70" y="168" width="260" height="14" rx="3" class="hc-wood"/></g>
    <g class="hc-lamp"><ellipse cx="364" cy="120" rx="60" ry="60" fill="url(#hc-gr-glow)"/><path d="M350 100 L378 100 L386 126 L342 126 Z" fill="#f5d38a"/><rect x="362" y="126" width="4" height="70" fill="#7d4a27"/><ellipse cx="364" cy="198" rx="16" ry="4" fill="#7d4a27"/></g>
    <g filter="url(#hc-vol)"><path d="M28 196 h30 l-4 28 h-22 z" fill="#c96f45"/></g><path d="M43 196 q-14 -30 -4 -48 M43 196 q4 -36 16 -44 M43 196 q-24 -16 -26 -34" stroke="#4fae6c" stroke-width="5" fill="none" stroke-linecap="round"/>
    <g class="hc-actor hc-w-ginger">${cat("ginger")}</g><g class="hc-actor hc-w-calico">${cat("calico", { blink: 1.4 })}</g>`,
  // Tea and cookies: Pepper tiptoes over to sniff a cookie, Ginger watches the steam.
  tea: () => `${table(176)}
    <g style="transform-box:view-box" transform="translate(76 176) scale(0.5) translate(-76 -176)"><g filter="url(#hc-vol-big)"><path d="M56 120 Q30 120 32 150 Q34 176 76 176 Q118 176 120 150 Q122 120 96 120 Z" fill="url(#hc-gr-pot)"/><path d="M118 136 q20 -6 26 -24" stroke="#5a9bd0" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M34 132 q-18 4 -16 22 q2 14 18 14" stroke="#5a9bd0" stroke-width="6" fill="none"/><ellipse cx="76" cy="118" rx="22" ry="6" fill="#4a86bb"/><circle cx="76" cy="110" r="6" fill="#4a86bb"/></g>
    <path d="M48 134 q28 10 56 0" stroke="#fff" stroke-width="3" opacity="0.6" fill="none"/>${steam(146, 106)}</g>
    <g style="transform-box:view-box" transform="translate(236 176) scale(0.5) translate(-236 -176)"><g filter="url(#hc-vol)"><ellipse cx="236" cy="174" rx="30" ry="5" fill="#f6f1ea" stroke="#d9cfc2"/><path d="M216 150 h40 l-4 22 h-32 z" fill="#ffffff" stroke="#e6ddd0"/></g>${steam(236, 146)}</g>
    <g filter="url(#hc-vol)">${[346, 360, 374].map((cx) => `<ellipse cx="${cx}" cy="173" rx="6" ry="2.6" fill="#c58a4a"/><circle cx="${cx - 3}" cy="171" r="1.4" fill="#4a2a10"/><circle cx="${cx + 3}" cy="172.5" r="1.2" fill="#4a2a10"/>`).join("")}</g>
    ${sideActor("calico", "hc-t-calico", 0.6)}<g class="hc-actor hc-t-ginger">${cat("ginger")}</g>`,
});
// Running, chasing and the plank use the side-view cats, so their legs walk.
Object.assign(SCENES, {
  run: () => `${keyboardStrip(186)}<g class="hc-notes hc-run-notes"><text x="90" y="120">♪</text><text x="200" y="100">♫</text><text x="300" y="120">♪</text></g>
    ${sideActor("ginger", "hc-r-ginger")}${sideActor("calico", "hc-r-calico", 0.7)}`,
  plank: () => `<path d="M0 232 H400" class="hc-floor"/>
    <g filter="url(#hc-vol-big)"><rect x="34" y="170" width="40" height="62" class="hc-wood-dark"/><rect x="326" y="170" width="40" height="62" class="hc-wood-dark"/></g>
    <g class="hc-plank"><g filter="url(#hc-vol-big)"><rect x="30" y="160" width="340" height="12" rx="3" class="hc-wood"/></g></g>
    ${sideActor("ginger", "hc-p-ginger")}${actor("calico", "hc-p-calico", 0.9)}`,
  chase: () => `<path d="M0 232 H400" class="hc-floor"/>${upright(134, 82)}
    ${sideActor("calico", "hc-c-calico", 0.5)}${sideActor("ginger", "hc-c-ginger")}`,
});

const SCENE_ORDER = ["show", "coffee", "run", "tea", "metronome", "xmas", "window", "fish", "chase", "plank"];
// Deals scenes like a shuffled deck, so no card repeats a scene until every
// other one has been shown; the deck is remembered between visits.
function dealFrom(all, key) {
  let deck = [];
  try { deck = JSON.parse(localStorage.getItem(key) || "[]").filter((n) => all.includes(n)); } catch (e) { /* ignore */ }
  if (!deck.length) {
    deck = [...all];
    for (let i = deck.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [deck[i], deck[j]] = [deck[j], deck[i]]; }
    let last = null;
    try { last = localStorage.getItem(`${key}-last`); } catch (e) { /* ignore */ }
    if (deck[0] === last) deck.push(deck.shift());
  }
  const next = deck.shift();
  try { localStorage.setItem(key, JSON.stringify(deck)); localStorage.setItem(`${key}-last`, next); } catch (e) { /* ignore */ }
  return next;
}
// Every scene once before any repeats (dealFrom).
function nextCatScene() {
  return dealFrom(SCENE_ORDER, "hk_cat_scene_deck");
}

// Soft shading so the cats and pianos look round rather than flat.
const DEFS = `<defs>
  <radialGradient id="hc-gr-ginger" cx="35%" cy="25%" r="85%"><stop offset="0" stop-color="#f7c58a"/><stop offset="0.45" stop-color="#e09a52"/><stop offset="0.85" stop-color="#b8692a"/><stop offset="1" stop-color="#8f4f1c"/></radialGradient>
  <radialGradient id="hc-gr-black" cx="35%" cy="25%" r="85%"><stop offset="0" stop-color="#55505a"/><stop offset="0.5" stop-color="#2a272d"/><stop offset="1" stop-color="#121014"/></radialGradient>
  <radialGradient id="hc-gr-white" cx="35%" cy="25%" r="90%"><stop offset="0" stop-color="#ffffff"/><stop offset="0.6" stop-color="#f3ece2"/><stop offset="1" stop-color="#cfc2b0"/></radialGradient>
  <radialGradient id="hc-gr-orange" cx="35%" cy="25%" r="85%"><stop offset="0" stop-color="#f2b678"/><stop offset="0.6" stop-color="#d4843a"/><stop offset="1" stop-color="#9a571f"/></radialGradient>
  <linearGradient id="hc-gr-wood" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b8784a"/><stop offset="1" stop-color="#8c5530"/></linearGradient>
  <radialGradient id="hc-gr-iris-green" cx="50%" cy="45%" r="55%"><stop offset="0" stop-color="#e9f08a"/><stop offset="0.55" stop-color="#9fbf3c"/><stop offset="1" stop-color="#5d7a1e"/></radialGradient>
  <radialGradient id="hc-gr-iris-amber" cx="50%" cy="45%" r="55%"><stop offset="0" stop-color="#fbe37a"/><stop offset="0.55" stop-color="#d9a72e"/><stop offset="1" stop-color="#8a6516"/></radialGradient>
  <radialGradient id="hc-gr-ao" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#3a2a1a" stop-opacity="0.28"/><stop offset="1" stop-color="#3a2a1a" stop-opacity="0"/></radialGradient>
  <filter id="hc-fur" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="4" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="1.6" xChannelSelector="R" yChannelSelector="G"/></filter>
  <filter id="hc-vol" x="-15%" y="-15%" width="130%" height="130%"><feGaussianBlur in="SourceAlpha" stdDeviation="3.2" result="b"/>
    <feDiffuseLighting in="b" surfaceScale="4" diffuseConstant="1.1" lighting-color="#fff" result="d"><feDistantLight azimuth="235" elevation="48"/></feDiffuseLighting>
    <feSpecularLighting in="b" surfaceScale="4" specularConstant="0.45" specularExponent="24" lighting-color="#fff" result="sp"><feDistantLight azimuth="235" elevation="48"/></feSpecularLighting>
    <feComposite in="sp" in2="SourceAlpha" operator="in" result="sp2"/><feComposite in="SourceGraphic" in2="d" operator="arithmetic" k1="1.08" k2="0" k3="0" k4="0" result="lit"/>
    <feComposite in="lit" in2="SourceAlpha" operator="in" result="lit2"/><feComposite in="lit2" in2="sp2" operator="arithmetic" k1="0" k2="1" k3="0.4" k4="0"/></filter>
  <filter id="hc-vol-big" x="-5%" y="-10%" width="110%" height="120%"><feGaussianBlur in="SourceAlpha" stdDeviation="4" result="b"/>
    <feDiffuseLighting in="b" surfaceScale="4" diffuseConstant="1" lighting-color="#fff" result="d"><feDistantLight azimuth="235" elevation="45"/></feDiffuseLighting>
    <feSpecularLighting in="b" surfaceScale="4" specularConstant="0.5" specularExponent="36" lighting-color="#fff" result="sp"><feDistantLight azimuth="235" elevation="45"/></feSpecularLighting>
    <feComposite in="sp" in2="SourceAlpha" operator="in" result="sp2"/><feComposite in="SourceGraphic" in2="d" operator="arithmetic" k1="1.05" k2="0" k3="0" k4="0" result="lit"/>
    <feComposite in="lit" in2="SourceAlpha" operator="in" result="lit2"/><feComposite in="lit2" in2="sp2" operator="arithmetic" k1="0" k2="1" k3="0.4" k4="0"/></filter>
  <filter id="hc-grain"><feTurbulence type="turbulence" baseFrequency="0.012 0.32" numOctaves="2" seed="3"/><feColorMatrix values="0 0 0 0 0.25  0 0 0 0 0.13  0 0 0 0 0.05  0 0 0 1.2 -0.3"/><feComposite in2="SourceAlpha" operator="in"/></filter>
  <linearGradient id="hc-gr-fir" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4fa86a"/><stop offset="1" stop-color="#245e38"/></linearGradient>
  <radialGradient id="hc-gr-star" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#fff6c4"/><stop offset="0.6" stop-color="#f5c542"/><stop offset="1" stop-color="#c9921f"/></radialGradient>
  <linearGradient id="hc-gr-glass" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#e8f7fe" stop-opacity="0.9"/><stop offset="0.5" stop-color="#ffffff" stop-opacity="0.35"/><stop offset="1" stop-color="#cdeefc" stop-opacity="0.9"/></linearGradient>
  <linearGradient id="hc-gr-water" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fd3f7" stop-opacity="0.85"/><stop offset="1" stop-color="#3f93c9" stop-opacity="0.9"/></linearGradient>
  <linearGradient id="hc-gr-key" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="0.85" stop-color="#f1ede6"/><stop offset="1" stop-color="#cfc7bb"/></linearGradient>
  <linearGradient id="hc-gr-bkey" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a3740"/><stop offset="1" stop-color="#0d0c10"/></linearGradient>
  <linearGradient id="hc-gr-mug" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#f7b6c6"/><stop offset="0.45" stop-color="#fbd2dc"/><stop offset="1" stop-color="#d9798f"/></linearGradient>
  <radialGradient id="hc-gr-latte" cx="50%" cy="50%" r="60%"><stop offset="0" stop-color="#e9c99c"/><stop offset="1" stop-color="#b8834f"/></radialGradient>
  <linearGradient id="hc-gr-pastry" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f2b862"/><stop offset="1" stop-color="#b8702c"/></linearGradient>
  <linearGradient id="hc-gr-pot" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#9cc8ec"/><stop offset="0.45" stop-color="#cfe6f8"/><stop offset="1" stop-color="#5a9bd0"/></linearGradient>
  <linearGradient id="hc-gr-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fa8c4"/><stop offset="1" stop-color="#c9d6e4"/></linearGradient>
  <radialGradient id="hc-gr-glow" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#ffe7a8" stop-opacity="0.85"/><stop offset="1" stop-color="#ffe7a8" stop-opacity="0"/></radialGradient>
  <linearGradient id="hc-gr-ebony" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a3742"/><stop offset="1" stop-color="#17151b"/></linearGradient>
</defs>`;

function catsSvg(mode = "scene", { label = "Hayden Keys" } = {}) {
  if (mode === "logo") {
    // Two cats snuggled on a little upright piano.
    return `<svg class="hc-cats hc-logo" viewBox="0 0 200 200" role="img" aria-label="${label}">${DEFS}
      <g style="transform-box:view-box" transform="translate(50 78) scale(0.75)">${upright(0, 0, 132)}</g>
      <g style="transform-box:view-box" transform="translate(30 6) scale(0.7)">${cat("ginger")}</g>
      <g style="transform-box:view-box" transform="translate(92 8) scale(0.68)">${cat("calico", { blink: 1.3 })}</g>
      ${HEART(100, 12)}
    </svg>`;
  }
  const name = mode === "scene" ? "show" : SCENES[mode] ? mode : "show";
  return `<svg class="hc-cats hc-scene hc-s-${name}" viewBox="0 0 400 240" role="img" aria-label="${label}">${DEFS}${SCENES[name]()}</svg>`;
}

export { catsSvg, nextCatScene, SCENES };
