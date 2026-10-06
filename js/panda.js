// Hayden the panda: a flat, bold, logo-style mascot drawn in SVG so it
// stays crisp at any size and can move. One drawing, many poses — each
// pose just moves the arms, mouth, eyes and props (CSS in style.css):
//   idle   gentle bob + blink           wave   one paw waving hello
//   cheer  both paws up, jumping        think  head tilt, paw on chin
//   oops   wide eyes, sweat drop        play   paws tapping piano keys
//   sing   mouth open, notes floating   sleep  eyes shut, z z z

const POSES = ["idle", "wave", "cheer", "think", "oops", "play", "sing", "sleep"];

function mouth(pose) {
  if (pose === "cheer" || pose === "sing") return '<path class="hp-mouth-open" d="M86 122 Q100 142 114 122 Z"/><path class="hp-tongue" d="M93 131 Q100 138 107 131 Q100 127 93 131Z"/>';
  if (pose === "oops") return '<ellipse class="hp-mouth-open" cx="100" cy="127" rx="6" ry="8"/>';
  if (pose === "sleep") return '<path class="hp-line" d="M93 125 Q100 129 107 125"/>';
  if (pose === "think") return '<path class="hp-line" d="M92 126 Q101 124 108 121"/>';
  return '<path class="hp-line" d="M88 121 Q100 134 112 121"/>';
}

function eyes(pose) {
  if (pose === "sleep") return '<path class="hp-line hp-white-line" d="M66 94 Q76 100 86 94"/><path class="hp-line hp-white-line" d="M114 94 Q124 100 134 94"/>';
  const look = pose === "think" ? -4 : 0;
  const big = pose === "oops" ? 13 : 11;
  return `<g class="hp-eyes">
      <circle cx="76" cy="92" r="${big}" fill="#fff"/><circle cx="124" cy="92" r="${big}" fill="#fff"/>
      <circle class="hp-pupil" cx="${78 + look / 2}" cy="${93 + look}" r="6.5"/><circle class="hp-pupil" cx="${122 + look / 2}" cy="${93 + look}" r="6.5"/>
      <circle cx="${80 + look / 2}" cy="${90 + look}" r="2.3" fill="#fff"/><circle cx="${124 + look / 2}" cy="${90 + look}" r="2.3" fill="#fff"/>
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

function pandaSvg(pose = "idle", { label = "Hayden the panda" } = {}) {
  if (!POSES.includes(pose)) pose = "idle";
  return `<svg class="hk-panda hp-${pose}" viewBox="0 0 200 220" role="img" aria-label="${label}">
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
        <ellipse cx="58" cy="118" rx="11" ry="7" class="hp-cheek"/><ellipse cx="142" cy="118" rx="11" ry="7" class="hp-cheek"/>
        <path d="M91 108 Q100 104 109 108 Q106 117 100 118 Q94 117 91 108Z" class="hp-black"/>
        ${mouth(pose)}
      </g>
      <g class="hp-bow"><path d="M100 152 L82 142 Q78 152 82 162 Z"/><path d="M100 152 L118 142 Q122 152 118 162 Z"/><circle cx="100" cy="152" r="6"/></g>
      ${props(pose)}
    </g>
  </svg>`;
}

export { pandaSvg, POSES };
