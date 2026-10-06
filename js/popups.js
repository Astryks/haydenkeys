// Popups that get out of the way: every popup can be swiped up (or
// tapped ✕) to dismiss. Also shows a one-time "turn your phone sideways"
// popup whenever a piano keyboard appears while the phone is upright.

const SWIPEABLE = ".hk-rotate-tip, .hk-funfact-card, .hk-toast, .hk-sideways";

function dismiss(el) {
  const target = el.classList.contains("hk-funfact-card") ? el.closest(".hk-funfact") || el : el;
  el.style.transition = "transform 0.25s ease-in, opacity 0.25s ease-in";
  el.style.transform = "translateY(-120%)";
  el.style.opacity = "0";
  setTimeout(() => target.remove(), 250);
}

function makeSwipeable(el) {
  if (el.dataset.swipe) return;
  el.dataset.swipe = "1";
  let startY = null;
  let dy = 0;
  el.addEventListener("touchstart", (e) => { startY = e.touches[0].clientY; dy = 0; el.style.transition = "none"; }, { passive: true });
  el.addEventListener("touchmove", (e) => {
    if (startY === null) return;
    dy = Math.min(0, e.touches[0].clientY - startY);
    el.style.transform = `translateY(${dy}px)`;
    el.style.opacity = String(1 + dy / 200);
  }, { passive: true });
  el.addEventListener("touchend", () => {
    if (startY === null) return;
    startY = null;
    if (dy < -40) return dismiss(el);
    el.style.transition = "transform 0.2s ease-out, opacity 0.2s";
    el.style.transform = "";
    el.style.opacity = "";
  });
}

const isUprightPhone = () => window.matchMedia("(orientation: portrait) and (max-width: 700px)").matches;
let sidewaysShown = false;
try { sidewaysShown = sessionStorage.getItem("hk_sideways_shown") === "1"; } catch (e) { /* ignore */ }

function showSideways() {
  if (sidewaysShown || !isUprightPhone() || document.querySelector(".hk-sideways")) return;
  sidewaysShown = true;
  try { sessionStorage.setItem("hk_sideways_shown", "1"); } catch (e) { /* ignore */ }
  const pop = document.createElement("div");
  pop.className = "hk-sideways";
  pop.setAttribute("role", "status");
  pop.innerHTML = `<div class="hk-sideways-phone">📱</div>
    <div><b>Turn your phone sideways!</b><br>The keys get bigger and easier to press 🎹</div>
    <button class="hk-sideways-x" aria-label="Close">✕</button>
    <div class="hk-swipe-hint">swipe up to hide</div>`;
  pop.querySelector(".hk-sideways-x").addEventListener("click", () => dismiss(pop));
  document.body.appendChild(pop);
  makeSwipeable(pop);
  setTimeout(() => pop.isConnected && dismiss(pop), 7000);
}

function initPopups() {
  const scan = (root) => {
    root.querySelectorAll?.(SWIPEABLE).forEach(makeSwipeable);
    if (root.querySelector?.(".hk-keyboard") || root.classList?.contains("hk-keyboard")) showSideways();
  };
  new MutationObserver((muts) => muts.forEach((m) => m.addedNodes.forEach((n) => n.nodeType === 1 && (n.matches?.(SWIPEABLE) ? makeSwipeable(n) : scan(n))))).observe(document.body, { childList: true, subtree: true });
  scan(document.body);
  // Turning the phone sideways removes the popup and the tip.
  window.matchMedia("(orientation: landscape)").addEventListener?.("change", (e) => {
    if (e.matches) document.querySelectorAll(".hk-sideways, .hk-rotate-tip").forEach((el) => el.remove());
  });
}

export { initPopups, makeSwipeable };
