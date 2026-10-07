// The intro screen shown each time the app opens: Hayden waves hello,
// then one big button: "Start now" for new learners, or "Continue:
// Lesson 6 of 150" so returning learners pick up right where they left off.

import { pianoLogo } from "./cats.js";

function showIntro({ total, done, next, number }) {
  const started = done > 0;
  const el = document.createElement("div");
  el.className = "hk-intro";
  el.innerHTML = `
    <div class="hk-intro-notes" aria-hidden="true"><span>♪</span><span>♫</span><span>♩</span><span>♬</span><span>♪</span></div>
    <div class="hk-intro-logo">${pianoLogo({ label: "Hayden Keys" })}</div>
    <h1 class="hk-intro-title">Hayden Keys</h1>
    <p class="hk-intro-tag">${started ? "Welcome back! Ready to play?" : "Learn piano, one tiny step at a time"}</p>
    ${started && next ? `<div class="hk-intro-progress"><div class="hk-hero-bar"><span style="width:${Math.max(3, Math.round((100 * done) / total))}%"></span></div><div>Lesson ${number} of ${total}</div></div>` : ""}
    <button class="hk-intro-go" type="button">${started ? (next ? "Continue ▶" : "Let's play ▶") : "Start now ▶"}</button>`;
  document.body.appendChild(el);
  document.body.classList.add("hk-intro-open");
  el.querySelector(".hk-intro-go").addEventListener("click", () => {
    el.classList.add("hk-intro-out");
    document.body.classList.remove("hk-intro-open");
    setTimeout(() => el.remove(), 350);
  });
}

export { showIntro };
