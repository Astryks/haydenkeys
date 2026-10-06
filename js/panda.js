// Hayden the panda: a flat, chubby, logo-style mascot drawn in SVG so it
// stays crisp at any size and can move. Big round head, droopy eye
// patches, shiny eyes, little hands and stubby legs with paw pads.
// No mouth: the eyes do the talking.
//
// Hayden looks alive but calm: breathing, blinking, glancing around. Bigger
// moves (a wave, a spin, a kung-fu kick) play once or twice and then settle
// back into that natural waiting pose — nothing loops endlessly.
//
// Poses:
//   idle    breathing, blinking, glancing   wave    two waves, then rests
//   cheer   one quick spin, then happy      think   head tilt
//   oops    wide eyes, sweat drop           play    tapping the held piano
//   sing    happy eyes, notes               sleep   eyes shut, z z z
// Tricks (celebrations, and trying hard):
//   spin    a quick twirl                   kungfu  headband, chop and a kick, HI-YA!
//   noodles slurping a bowl of noodles      qi      floating, old-school energy ball
//   pushups bobbing down to the floor       situps  lying back, struggling to sit up
//
// Things Hayden holds (pandaSvg(pose, { item })); "surprise" rotates them:
//   piano  sunglasses  headphones  maracas  bamboo  mic  balloon

const POSES = ["idle", "wave", "cheer", "think", "oops", "play", "sing", "sleep", "spin", "kungfu", "noodles", "qi", "pushups", "situps"];
const ITEMS = ["piano", "sunglasses", "headphones", "maracas", "bamboo", "mic", "balloon"];
const POSE_ITEM = { idle: "piano", play: "piano", think: "bamboo", sing: "mic", sleep: "headphones" };

// Celebrations for a right answer, and a funny "keep trying" for a wrong one.
const YAY_TRICKS = ["spin", "kungfu", "noodles", "qi", "pushups", "cheer"];
const TRY_TRICKS = ["situps", "oops"];
const turn = { yay: Math.floor(Math.random() * YAY_TRICKS.length), try: 0, item: Math.floor(Math.random() * ITEMS.length) };
function nextTrick(kind = "yay") {
  const list = kind === "yay" ? YAY_TRICKS : TRY_TRICKS;
  return list[turn[kind]++ % list.length];
}

// Eye centres
const LX = 72, RX = 128, EY = 96;

function eyes(pose) {
  const line = (d) => `<path class="hp-line hp-white-line" d="${d}"/>`;
  if (pose === "sleep" || pose === "qi") return line(`M${LX - 9} ${EY} Q${LX} ${EY + 6} ${LX + 9} ${EY}`) + line(`M${RX - 9} ${EY} Q${RX} ${EY + 6} ${RX + 9} ${EY}`);
  if (pose === "pushups" || pose === "situps") return line(`M${LX - 7} ${EY - 7} L${LX + 6} ${EY} L${LX - 7} ${EY + 7}`) + line(`M${RX + 7} ${EY - 7} L${RX - 6} ${EY} L${RX + 7} ${EY + 7}`);
  if (pose === "cheer" || pose === "sing" || pose === "spin" || pose === "noodles") return line(`M${LX - 9} ${EY + 3} Q${LX} ${EY - 9} ${LX + 9} ${EY + 3}`) + line(`M${RX - 9} ${EY + 3} Q${RX} ${EY - 9} ${RX + 9} ${EY + 3}`);
  const big = pose === "oops" ? 11.5 : 10;
  const brows = pose === "kungfu" ? `<path class="hp-line" d="M52 64 L82 74 M148 64 L118 74"/>` : "";
  const eye = (x) => `<circle cx="${x}" cy="${EY}" r="${big}" fill="#fff"/>
      <g class="hp-look"><circle class="hp-pupil" cx="${x + (x === LX ? 1.5 : -1.5)}" cy="${EY + 1.5}" r="${big - 2}"/>
      <circle cx="${x + (x === LX ? 4 : 2)}" cy="${EY - 3}" r="3.4" fill="#fff"/><circle cx="${x + (x === LX ? -2 : -4)}" cy="${EY + 5}" r="1.6" fill="#fff"/></g>`;
  return `${brows}<g class="hp-eyes">${eye(LX)}${eye(RX)}</g>`;
}

function props(pose) {
  if (pose === "sing") return '<g class="hp-notes"><text x="150" y="56">♪</text><text x="166" y="36">♫</text></g>';
  if (pose === "sleep") return '<g class="hp-zzz"><text x="150" y="50">z</text><text x="164" y="34">z</text><text x="176" y="18">Z</text></g>';
  if (pose === "oops") return '<path class="hp-sweat" d="M160 58 Q168 70 160 76 Q152 70 160 58Z"/>';
  if (pose === "cheer") return '<g class="hp-sparkles"><path d="M24 40l4 10 10 4-10 4-4 10-4-10-10-4 10-4z"/><path d="M172 26l3 7 7 3-7 3-3 7-3-7-7-3 7-3z"/></g>';
  if (pose === "spin") return '<g class="hpt-swoosh"><path d="M12 130 q-8 -44 22 -76 M188 130 q8 -44 -22 -76" fill="none" stroke="#b9a7f0" stroke-width="5" stroke-linecap="round"/></g>';
  if (pose === "noodles") return `<g class="hpt-noodles"><path class="hpt-strand" d="M90 178 q-6 -20 4 -34 q8 -14 2 -28"/><path class="hpt-strand" d="M100 178 q6 -22 -2 -36 q-6 -14 2 -26"/><path class="hpt-strand" d="M110 178 q-4 -20 6 -34 q8 -14 -6 -28"/></g>
      <path d="M56 176 h88 q-4 38 -44 38 q-40 0 -44 -38z" fill="#e4573d"/><path d="M64 190 h72" stroke="#f2b630" stroke-width="4" stroke-dasharray="6 6"/><ellipse cx="100" cy="176" rx="44" ry="6" fill="#f7d58a"/>
      <g class="hpt-steam"><path d="M66 160 q-6 -8 0 -16 q6 -8 0 -16 M134 160 q-6 -8 0 -16 q6 -8 0 -16" fill="none" stroke="#c9c3dc" stroke-width="3" stroke-linecap="round"/></g>`;
  if (pose === "qi") return `<g class="hpt-orb"><circle cx="100" cy="172" r="24" fill="#8fd0f5" opacity=".35"/><circle cx="100" cy="172" r="15" fill="#e8f7ff"/><circle cx="100" cy="172" r="9" fill="#fff"/></g>
      <g class="hpt-swirl"><path d="M70 172 a30 30 0 0 1 30 -30 M130 172 a30 30 0 0 1 -30 30" fill="none" stroke="#f2b630" stroke-width="3" stroke-linecap="round"/></g>
      <g class="hp-sparkles"><path d="M26 60l3 8 8 3-8 3-3 8-3-8-8-3 8-3z"/><path d="M174 90l3 7 7 3-7 3-3 7-3-7-7-3 7-3z"/></g>`;
  if (pose === "pushups") return '<path class="hp-sweat" d="M166 52 Q174 64 166 70 Q158 64 166 52Z"/>';
  return "";
}

// Things that stay put while Hayden moves: the floor, shouts, shadows.
function stage(pose) {
  const floor = '<path d="M4 218 h192" stroke="#d9d0f5" stroke-width="4" stroke-linecap="round"/>';
  if (pose === "kungfu") return '<text class="hpt-shout hpt-hiya" x="0" y="20">HI-YA!</text>';
  if (pose === "qi") return '<ellipse class="hpt-shadow" cx="100" cy="222" rx="46" ry="5" fill="#2a2a3a" opacity=".12"/>';
  if (pose === "pushups") return `${floor}<text class="hpt-shout hpt-count" x="150" y="24">+1</text>`;
  if (pose === "situps") return `${floor}<path class="hp-sweat" d="M26 92 Q34 104 26 110 Q18 104 26 92Z"/><text class="hpt-shout hpt-ugh" x="92" y="74">nngh…</text>`;
  return "";
}

// Paw-held props live inside the arm groups so they move with the arm.
// Arm-local coordinates: shoulder (56|144, 142), paw at y ≈ 184.
function armItem(item, side) {
  const x = side === "l" ? 56 : 144;
  if (item === "maracas") return `<g class="hpi-maraca"><rect x="${x - 3}" y="180" width="6" height="18" rx="3" fill="#b0773a"/><ellipse cx="${x}" cy="206" rx="11" ry="13" fill="${side === "l" ? "#f08a3c" : "#3fb363"}"/><path d="M${x - 8} 204 h16 M${x - 7} 210 h14" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/></g>`;
  if (side !== "r") return "";
  if (item === "mic") return `<g class="hpi-mic"><rect x="${x - 4}" y="180" width="8" height="20" rx="3" fill="#4a4a5e"/><circle cx="${x}" cy="206" r="10" fill="#c9c3dc"/><path d="M${x - 7} 203h14M${x - 7} 208h14M${x} 197v18" stroke="#8a8399" stroke-width="1.6"/></g>`;
  if (item === "bamboo") return `<g class="hpi-bamboo"><rect x="${x - 5}" y="172" width="10" height="62" rx="4" fill="#5fb85a"/><path d="M${x - 5} 192h10M${x - 5} 214h10" stroke="#3d8a3a" stroke-width="2.5"/><path class="hpi-leaf" d="M${x + 5} 224 q16 -2 22 10 q-14 4 -22 -10z" fill="#7fcf6a"/></g>`;
  if (item === "balloon") return `<g class="hpi-balloon"><path d="M${x} 186 q6 20 -2 36 q-6 14 2 26" fill="none" stroke="#8a8399" stroke-width="1.6"/><g class="hpi-balloon-ball"><ellipse cx="${x}" cy="270" rx="20" ry="24" fill="#8a63d2"/><ellipse cx="${x - 7}" cy="260" rx="5" ry="8" fill="#fff" opacity=".45"/><path d="M${x - 4} 246 l4 -6 4 6z" fill="#6a45b5"/></g></g>`;
  return "";
}

function headItem(item) {
  if (item === "sunglasses") return `<g class="hpi-shades"><path d="M48 86 h46 v8 q0 16 -16 16 h-12 q-18 0 -18 -16z M106 86 h46 v8 q0 16 -18 16 h-12 q-16 0 -16 -16z" fill="#2a2a3a"/><path d="M94 90 h12" stroke="#2a2a3a" stroke-width="4"/><path d="M46 86 h108" stroke="#8a63d2" stroke-width="4" stroke-linecap="round"/><path class="hpi-glint" d="M56 96 l10 -6 M114 96 l10 -6" stroke="#fff" stroke-width="3" stroke-linecap="round"/></g>`;
  if (item === "headphones") return `<g class="hpi-phones"><path d="M30 96 Q28 22 100 20 Q172 22 170 96" fill="none" stroke="#8a63d2" stroke-width="9" stroke-linecap="round"/><rect x="18" y="78" width="22" height="38" rx="10" fill="#8a63d2"/><rect x="160" y="78" width="22" height="38" rx="10" fill="#8a63d2"/><rect x="22" y="84" width="8" height="26" rx="4" fill="#f4b6cb"/><rect x="170" y="84" width="8" height="26" rx="4" fill="#f4b6cb"/></g>`;
  return "";
}

// A hand: round black paw with a soft pad.
function paw(cx, cy, cls = "") {
  return `<g class="hp-paw ${cls}"><ellipse cx="${cx}" cy="${cy}" rx="13" ry="11" class="hp-black"/><ellipse cx="${cx}" cy="${cy + 2}" rx="5.5" ry="4.5" class="hp-pad"/></g>`;
}

// A mini keyboard held in front of the tummy, notes popping out.
const MINI_PIANO = `<g class="hpi-keyboard">
    <rect x="40" y="158" width="120" height="34" rx="7" fill="#8a63d2"/>
    <rect x="46" y="164" width="108" height="22" rx="3" fill="#fff"/>
    <path d="M59.5 164v22M73 164v22M86.5 164v22M100 164v22M113.5 164v22M127 164v22M140.5 164v22" stroke="#d9d0f5" stroke-width="1.6"/>
    <rect x="55.5" y="164" width="8" height="12" rx="1.5" fill="#2a2a3a"/><rect x="69" y="164" width="8" height="12" rx="1.5" fill="#2a2a3a"/>
    <rect x="96" y="164" width="8" height="12" rx="1.5" fill="#2a2a3a"/><rect x="109.5" y="164" width="8" height="12" rx="1.5" fill="#2a2a3a"/><rect x="123" y="164" width="8" height="12" rx="1.5" fill="#2a2a3a"/>
    ${paw(60, 162, "hpi-paw-l")}${paw(140, 162, "hpi-paw-r")}
  </g>
  <g class="hp-notes hpi-pop"><text x="14" y="146">♪</text><text x="168" y="136">♫</text></g>`;

// A stubby leg with a foot pad and three toe beans facing the viewer.
function leg(cx, side) {
  return `<g class="hp-leg hp-leg-${side}"><ellipse cx="${cx}" cy="204" rx="21" ry="16" class="hp-black"/>
    <ellipse cx="${cx}" cy="207" rx="8" ry="6.5" class="hp-pad"/>
    <circle cx="${cx - 9}" cy="197" r="3" class="hp-pad"/><circle cx="${cx}" cy="194" r="3" class="hp-pad"/><circle cx="${cx + 9}" cy="197" r="3" class="hp-pad"/></g>`;
}

function arm(side, item) {
  const x = side === "l" ? 44 : 132;
  return `<g class="hp-arm hp-arm-${side}"><rect x="${x}" y="136" width="24" height="48" rx="12" class="hp-black"/>
    <ellipse cx="${x + 12}" cy="178" rx="5" ry="4" class="hp-pad"/>${armItem(item, side)}</g>`;
}

// Accessories unlocked by streaks (see rewards.js): a crown beats a hat.
function accessory() {
  let u = {};
  try { u = JSON.parse(localStorage.getItem("hk_unlocks") || "{}"); } catch (e) { /* ignore */ }
  if (u.crown) return `<g class="hp-crown"><path d="M70 28 L80 42 L100 20 L120 42 L130 28 L126 54 L74 54 Z" fill="#f2b630" stroke="#d99a12" stroke-width="2"/><circle cx="100" cy="44" r="5" fill="#d9678f"/><circle cx="84" cy="48" r="3.5" fill="#4a9bc9"/><circle cx="116" cy="48" r="3.5" fill="#4a9bc9"/></g>`;
  if (u.hat) return `<g class="hp-hat"><path d="M100 -2 L122 44 L78 44 Z" fill="#d9678f"/><path d="M88 20 h24 M83 32 h34" stroke="#f2b630" stroke-width="4"/><circle cx="100" cy="0" r="7" fill="#f2b630"/></g>`;
  return "";
}

function pandaSvg(pose = "idle", { label = "Hayden the panda", item } = {}) {
  if (!POSES.includes(pose)) pose = "idle";
  if (item === "surprise") item = ITEMS[turn.item++ % ITEMS.length];
  if (item === undefined) item = POSE_ITEM[pose];
  if (!ITEMS.includes(item)) item = "";
  const band = pose === "kungfu" ? `<g class="hpt-band"><path d="M32 64 Q100 38 168 64 L166 77 Q100 52 34 77Z" fill="#e4573d"/><path class="hpt-tails" d="M162 66 q22 -4 34 8 q-16 0 -22 4 q14 6 18 18 q-20 -10 -32 -18z" fill="#e4573d"/></g>` : "";
  return `<svg class="hk-panda hp-${pose}${item ? ` hpi-${item}` : ""}" viewBox="0 -10 200 230" role="img" aria-label="${label}">
    <g class="hp-all"><g class="hp-live">
      ${leg(68, "l")}${leg(132, "r")}
      <g class="hp-body">
        <ellipse cx="100" cy="166" rx="54" ry="44" class="hp-black"/>
        <ellipse cx="100" cy="174" rx="33" ry="29" fill="#fff"/>
      </g>
      ${arm("l", item)}${arm("r", item)}
      <g class="hp-head">
        <g class="hp-ear hp-ear-l"><circle cx="44" cy="44" r="21" class="hp-black"/><circle cx="45" cy="46" r="10" class="hp-ear-in"/></g>
        <g class="hp-ear hp-ear-r"><circle cx="156" cy="44" r="21" class="hp-black"/><circle cx="155" cy="46" r="10" class="hp-ear-in"/></g>
        <ellipse cx="100" cy="92" rx="72" ry="60" fill="#fff"/>
        <ellipse cx="${LX}" cy="${EY + 1}" rx="19" ry="24" transform="rotate(28 ${LX} ${EY + 1})" class="hp-black"/>
        <ellipse cx="${RX}" cy="${EY + 1}" rx="19" ry="24" transform="rotate(-28 ${RX} ${EY + 1})" class="hp-black"/>
        ${eyes(pose)}
        <ellipse cx="54" cy="124" rx="10" ry="6" class="hp-cheek"/><ellipse cx="146" cy="124" rx="10" ry="6" class="hp-cheek"/>
        <path d="M93 116 Q100 112 107 116 Q105 122 100 123 Q95 122 93 116Z" class="hp-black"/>
        ${band}${headItem(item)}${accessory()}
      </g>
      <g class="hp-bow"><path d="M100 154 L83 145 Q79 154 83 163 Z"/><path d="M100 154 L117 145 Q121 154 117 163 Z"/><circle cx="100" cy="154" r="5.5"/></g>
      ${item === "piano" ? MINI_PIANO : ""}
      ${props(pose)}
    </g></g>
    ${stage(pose)}
  </svg>`;
}

export { pandaSvg, POSES, ITEMS, nextTrick };
