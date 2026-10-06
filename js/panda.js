// Hayden the panda: a flat, bold, logo-style mascot drawn in SVG so it
// stays crisp at any size and can move. One drawing, many poses — each
// pose just moves the arms, eyes and props (CSS in style.css):
//   idle   gentle bob + blink           wave   one paw waving hello
//   cheer  paws up, jumping, ^ ^ eyes    think  head tilt, paw on chin
//   oops   wide eyes, sweat drop        play   paws tapping piano keys
//   sing   happy eyes, notes floating   sleep  eyes shut, z z z

// No mouth: the eyes do the talking.
const POSES = ["idle", "wave", "cheer", "think", "oops", "play", "sing", "sleep"];

function eyes(pose) {
  if (pose === "sleep") return '<path class="hp-line hp-white-line" d="M66 96 Q76 102 86 96"/><path class="hp-line hp-white-line" d="M114 96 Q124 102 134 96"/>';
  // Happy "^ ^" eyes when cheering or singing.
  if (pose === "cheer" || pose === "sing") return '<path class="hp-line hp-white-line" d="M66 98 Q76 86 86 98"/><path class="hp-line hp-white-line" d="M114 98 Q124 86 134 98"/>';
  const look = pose === "think" ? -4 : 0;
  const big = pose === "oops" ? 14 : 12.5;
  const pr = pose === "oops" ? 7 : 9;
  return `<g class="hp-eyes">
      <circle cx="76" cy="94" r="${big}" fill="#fff"/><circle cx="124" cy="94" r="${big}" fill="#fff"/>
      <circle class="hp-pupil" cx="${77 + look / 2}" cy="${95 + look}" r="${pr}"/><circle class="hp-pupil" cx="${123 + look / 2}" cy="${95 + look}" r="${pr}"/>
      <circle cx="${80 + look / 2}" cy="${91 + look}" r="3.4" fill="#fff"/><circle cx="${126 + look / 2}" cy="${91 + look}" r="3.4" fill="#fff"/>
      <circle cx="${74 + look / 2}" cy="${99 + look}" r="1.6" fill="#fff"/><circle cx="${120 + look / 2}" cy="${99 + look}" r="1.6" fill="#fff"/>
    </g>`;
}

function props(pose) {
  if (pose === "play") return `<g class="hp-keys"><rect x="40" y="196" width="120" height="22" rx="4" fill="#fff" stroke="#2a2a3a" stroke-width="4"/>
      <path d="M64 196v22M88 196v22M112 196v22M136 196v22" stroke="#2a2a3a" stroke-width="3"/>
      <rect x="57" y="196" width="10" height="12" rx="2" fill="#2a2a3a"/><rect x="81" y="196" width="10" height="12" rx="2" fill="#2a2a3a"/><rect x="129" y="196" width="10" height="12" rx="2" fill="#2a2a3a"/></g>`;
  if (pose === "sing") return '<g class="hp-notes"><text x="150" y="60">♪</text><text x="166" y="40">♫</text></g>';
  if (pose === "sleep") return '<g class="hp-zzz"><text x="146" y="54">z</text><text x="160" y="38">z</text><text x="172" y="22">Z</text></g>';
  if (pose === "oops") return '<path class="hp-sweat" d="M156 62 Q164 74 156 80 Q148 74 156 62Z"/>';
  if (pose === "cheer") return '<g class="hp-sparkles"><path d="M30 40l4 10 10 4-10 4-4 10-4-10-10-4 10-4z"/><path d="M168 28l3 7 7 3-7 3-3 7-3-7-7-3 7-3z"/></g>';
  return "";
}

// Accessories unlocked by streaks (see rewards.js): a crown beats a hat.
function accessory() {
  let u = {};
  try { u = JSON.parse(localStorage.getItem("hk_unlocks") || "{}"); } catch (e) { /* ignore */ }
  if (u.crown) return `<g class="hp-crown"><path d="M70 30 L80 44 L100 22 L120 44 L130 30 L126 56 L74 56 Z" fill="#f2b630" stroke="#d99a12" stroke-width="2"/><circle cx="100" cy="46" r="5" fill="#d9678f"/><circle cx="84" cy="50" r="3.5" fill="#4a9bc9"/><circle cx="116" cy="50" r="3.5" fill="#4a9bc9"/></g>`;
  if (u.hat) return `<g class="hp-hat"><path d="M100 0 L122 46 L78 46 Z" fill="#d9678f"/><path d="M88 22 h24 M83 34 h34" stroke="#f2b630" stroke-width="4"/><circle cx="100" cy="2" r="7" fill="#f2b630"/></g>`;
  return "";
}

function pandaSvg(pose = "idle", { label = "Hayden the panda" } = {}) {
  if (!POSES.includes(pose)) pose = "idle";
  return `<svg class="hk-panda hp-${pose}" viewBox="0 -10 200 230" role="img" aria-label="${label}">
    <g class="hp-all">
      <g class="hp-body">
        <ellipse cx="100" cy="178" rx="58" ry="40" class="hp-black"/>
        <ellipse cx="100" cy="184" rx="34" ry="27" fill="#fff"/>
      </g>
      <g class="hp-arm hp-arm-l"><rect x="40" y="148" width="26" height="46" rx="13" class="hp-black"/></g>
      <g class="hp-arm hp-arm-r"><rect x="134" y="148" width="26" height="46" rx="13" class="hp-black"/></g>
      <g class="hp-head">
        <circle cx="52" cy="44" r="22" class="hp-black"/><circle cx="148" cy="44" r="22" class="hp-black"/>
        <circle cx="52" cy="46" r="10" class="hp-ear-in"/><circle cx="148" cy="46" r="10" class="hp-ear-in"/>
        <ellipse cx="100" cy="92" rx="66" ry="60" fill="#fff"/>
        <ellipse cx="74" cy="93" rx="21" ry="26" transform="rotate(-24 74 93)" class="hp-black"/>
        <ellipse cx="126" cy="93" rx="21" ry="26" transform="rotate(24 126 93)" class="hp-black"/>
        ${eyes(pose)}
        <ellipse cx="56" cy="120" rx="13" ry="8" class="hp-cheek"/><ellipse cx="144" cy="120" rx="13" ry="8" class="hp-cheek"/>
        <path d="M94 113 Q100 110 106 113 Q104 119 100 120 Q96 119 94 113Z" class="hp-black"/>
        ${accessory()}
      </g>
      <g class="hp-bow"><path d="M100 152 L82 142 Q78 152 82 162 Z"/><path d="M100 152 L118 142 Q122 152 118 162 Z"/><circle cx="100" cy="152" r="6"/></g>
      ${props(pose)}
    </g>
  </svg>`;
}

export { pandaSvg, POSES };
