// Hayden Keys' own icons: small flat drawings in the app's colours, used
// instead of emoji everywhere except inside the chat bubbles.

const C = { blue: "#4a9bc9", pink: "#d9678f", purple: "#8a63d2", gold: "#f2b630", ink: "#2a2a3a", soft: "#e9e3fb", orange: "#f08a3c", red: "#e4573d", ice: "#8fd0f5", green: "#3fb363" };

const PATHS = {
  piano: `<rect x="2" y="5" width="20" height="14" rx="3" fill="${C.purple}"/><rect x="4" y="7" width="16" height="10" rx="1.5" fill="#fff"/>
    <path d="M8 7v10M12 7v10M16 7v10" stroke="${C.soft}" stroke-width="1"/><rect x="6.6" y="7" width="2.6" height="6" rx=".6" fill="${C.ink}"/><rect x="10.6" y="7" width="2.6" height="6" rx=".6" fill="${C.ink}"/><rect x="14.6" y="7" width="2.6" height="6" rx=".6" fill="${C.ink}"/>`,
  review: `<circle cx="12" cy="12" r="10" fill="${C.blue}"/><path d="M7 12a5 5 0 1 0 1.6-3.7" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/><path d="M7.2 6.4l1.5 2.2-2.6.6z" fill="#fff"/><circle cx="12" cy="12" r="1.8" fill="#fff"/>`,
  song: `<circle cx="12" cy="12" r="10" fill="${C.pink}"/><path d="M10 15.5V7l7-1.5v8" fill="none" stroke="#fff" stroke-width="2" stroke-linejoin="round"/><circle cx="8.6" cy="15.6" r="2.2" fill="#fff"/><circle cx="15.6" cy="13.6" r="2.2" fill="#fff"/>`,
  fact: `<circle cx="12" cy="12" r="10" fill="${C.gold}"/><path d="M12 6.5a4 4 0 0 0-2.3 7.3c.4.3.6.7.6 1.2v.5h3.4V15c0-.5.2-.9.6-1.2A4 4 0 0 0 12 6.5z" fill="#fff"/><rect x="10.3" y="16.4" width="3.4" height="1.6" rx=".8" fill="#fff"/>`,
  flame: `<path d="M12 2c1 3.5 5 5.3 5 10.2A5 5 0 0 1 12 22a5 5 0 0 1-5-5.2c0-2.6 1.5-4.2 2.6-5.5.3 1.5 1 2.3 1.8 2.6C11 10.5 10.6 5.6 12 2z" fill="${C.orange}"/><path d="M12 12.5c.6 1.6 2.4 2.4 2.4 4.6a2.4 2.4 0 0 1-4.8 0c0-1.3.7-2 1.3-2.7.1.6.4 1 .8 1.1-.3-1.1-.2-2.1.3-3z" fill="${C.gold}"/>`,
  trophy: `<path d="M7 3h10v5a5 5 0 0 1-10 0z" fill="${C.gold}"/><path d="M7 5H4v1.5A3.5 3.5 0 0 0 7.5 10M17 5h3v1.5A3.5 3.5 0 0 1 16.5 10" fill="none" stroke="${C.gold}" stroke-width="1.8"/><rect x="10.5" y="12.5" width="3" height="4" fill="${C.gold}"/><rect x="7" y="17" width="10" height="3.5" rx="1" fill="${C.purple}"/>`,
  gift: `<rect x="3" y="9" width="18" height="12" rx="2" fill="${C.pink}"/><rect x="2" y="7" width="20" height="4" rx="1.5" fill="${C.purple}"/><rect x="10.8" y="7" width="2.4" height="14" fill="${C.gold}"/><path d="M12 7c-2-4-6-4-6-1.5S10 7 12 7c2 0 6 .5 6-1.5S14 3 12 7z" fill="none" stroke="${C.gold}" stroke-width="1.8"/>`,
  star: `<path d="M12 2.5l2.9 6 6.6.8-4.9 4.5 1.3 6.5L12 17l-5.9 3.3 1.3-6.5-4.9-4.5 6.6-.8z" fill="${C.gold}"/>`,
  lock: `<rect x="5" y="10" width="14" height="11" rx="2.5" fill="${C.ink}"/><path d="M8 10V7.5a4 4 0 0 1 8 0V10" fill="none" stroke="${C.ink}" stroke-width="2.2"/><circle cx="12" cy="15.5" r="1.8" fill="#fff"/>`,
  speaker: `<path d="M4 9h4l5-4v14l-5-4H4z" fill="${C.purple}"/><path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a7.5 7.5 0 0 1 0 11" fill="none" stroke="${C.purple}" stroke-width="2" stroke-linecap="round"/>`,
  soft: `<path d="M5 9.5h3.5L13 6v12l-4.5-3.5H5z" fill="${C.blue}"/><path d="M16 10.5a2.5 2.5 0 0 1 0 3" fill="none" stroke="${C.blue}" stroke-width="2" stroke-linecap="round"/>`,
  eye: `<path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12z" fill="${C.soft}" stroke="${C.purple}" stroke-width="1.8"/><circle cx="12" cy="12" r="3.4" fill="${C.purple}"/><circle cx="13.2" cy="10.8" r="1" fill="#fff"/>`,
  folder: `<path d="M3 6.5A1.5 1.5 0 0 1 4.5 5h5l2 2h8A1.5 1.5 0 0 1 21 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5z" fill="${C.gold}"/><path d="M3 9.5h18v8a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5z" fill="#f7cd5b"/>`,
  gear: `<circle cx="12" cy="12" r="6.5" fill="${C.blue}"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" stroke="${C.blue}" stroke-width="3" stroke-linecap="round"/><circle cx="12" cy="12" r="2.6" fill="#fff"/>`,
  search: `<circle cx="10.5" cy="10.5" r="6.5" fill="${C.soft}" stroke="${C.purple}" stroke-width="2.4"/><path d="M15.5 15.5L21 21" stroke="${C.purple}" stroke-width="3" stroke-linecap="round"/>`,
  hat: `<path d="M12 2l6 14H6z" fill="${C.pink}"/><path d="M8.4 10.5h7.2M7.2 13.5h9.6" stroke="${C.gold}" stroke-width="1.6"/><circle cx="12" cy="2.6" r="2" fill="${C.gold}"/><rect x="5" y="15.5" width="14" height="3" rx="1.5" fill="${C.purple}"/>`,
  crown: `<path d="M3 8l4.5 4L12 5l4.5 7L21 8l-1.8 11H4.8z" fill="${C.gold}"/><circle cx="12" cy="13.5" r="1.6" fill="${C.pink}"/><circle cx="7" cy="15" r="1.2" fill="${C.blue}"/><circle cx="17" cy="15" r="1.2" fill="${C.blue}"/>`,
  freeze: `<circle cx="12" cy="12" r="10" fill="${C.ice}"/><path d="M12 5v14M6 8.5l12 7M18 8.5l-12 7" stroke="#fff" stroke-width="2" stroke-linecap="round"/>`,
  goldkeys: `<rect x="2" y="5" width="20" height="14" rx="3" fill="${C.gold}"/><rect x="4" y="7" width="16" height="10" rx="1.5" fill="#fff6d8"/><rect x="6.6" y="7" width="2.6" height="6" rx=".6" fill="#b8860b"/><rect x="10.6" y="7" width="2.6" height="6" rx=".6" fill="#b8860b"/><rect x="14.6" y="7" width="2.6" height="6" rx=".6" fill="#b8860b"/>`,
  play: `<circle cx="12" cy="12" r="10" fill="${C.purple}"/><path d="M10 8l6 4-6 4z" fill="#fff"/>`,
  check: `<circle cx="12" cy="12" r="10" fill="${C.green}"/><path d="M7.5 12.5l3 3 6-6.5" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`,
  quiz: `<circle cx="12" cy="12" r="10" fill="${C.purple}"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .8-1 1.5v.7" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/><circle cx="12" cy="17" r="1.3" fill="#fff"/>`,
};

function icon(name, size = 22) {
  const p = PATHS[name];
  if (!p) return "";
  return `<svg class="hk-icon hk-icon-${name}" width="${size}" height="${size}" viewBox="0 0 24 24" aria-hidden="true">${p}</svg>`;
}

export { icon };
