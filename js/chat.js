// Lessons as a chat, like a WhatsApp conversation: the learner asks,
// Hayden replies. Any lesson text from mascotSay() is turned into a
// thread automatically — each <h3> starts a new exchange; the learner's
// question is the h3's data-q (or a friendly default), and Hayden's reply
// is the heading plus everything up to the next one. The learner taps a
// reply chip to send the next question; Hayden "types" and answers. The
// lesson's keyboard and buttons appear once the chat reaches the end.

import { pandaSvg } from "./panda.js";

// Old image poses map to the new animated panda's poses.
function poseFor(src) {
  if (!src || !src.includes("/")) return src || "idle";
  if (/conduct|composer|mozart|scores/.test(src)) return "cheer";
  if (/metronome|music-stand|sheet/.test(src)) return "think";
  if (/piano|harp/.test(src)) return "play";
  if (/flute|trombone|violin|notes/.test(src)) return "sing";
  if (/dozing|dreaming/.test(src)) return "sleep";
  return "idle";
}

const DEFAULT_PROMPTS = ["Got it! What's next?", "Okay 👍 Then what?", "Makes sense. Tell me more!", "Cool! What else?", "Nice. Keep going!"];
const TYPING_MS = 650;

function splitExchanges(html) {
  const box = document.createElement("div");
  box.innerHTML = html;
  const out = [];
  let cur = null;
  [...box.childNodes].forEach((n) => {
    if (n.nodeType === 3 && !n.textContent.trim()) return;
    if (n.nodeName === "H3") {
      cur = { q: n.dataset.q || null, nodes: [n] };
      out.push(cur);
    } else {
      if (!cur) { cur = { q: null, nodes: [] }; out.push(cur); }
      cur.nodes.push(n);
    }
  });
  return out;
}

function buildChat(el) {
  if (el.dataset.ready) return;
  el.dataset.ready = "1";
  const pose = el.dataset.pose;
  const exchanges = splitExchanges(el.querySelector("template").innerHTML);
  const thread = document.createElement("div");
  thread.className = "hk-chat-thread";
  const chips = document.createElement("div");
  chips.className = "hk-chat-chips";
  el.replaceChildren(thread, chips);
  const player = el.closest(".hk-lesson-player");
  const holding = exchanges.length > 1;
  if (holding && player) player.classList.add("hk-chat-holding");
  let i = 0;

  const scroll = (node) => node.scrollIntoView?.({ behavior: "smooth", block: "nearest" });
  function userBubble(text) {
    const b = document.createElement("div");
    b.className = "hk-chat-msg hk-chat-me";
    b.innerHTML = `<div class="hk-chat-bubble">${text}</div>`;
    thread.appendChild(b);
    scroll(b);
  }
  function reply(ex, instant) {
    const row = document.createElement("div");
    row.className = "hk-chat-msg hk-chat-them";
    row.innerHTML = `<div class="hk-chat-avatar">${pandaSvg(poseFor(pose), { item: poseFor(pose) === "idle" ? "surprise" : undefined })}</div><div class="hk-chat-bubble"><span class="hk-chat-typing"><i></i><i></i><i></i></span></div>`;
    thread.appendChild(row);
    scroll(row);
    const fill = () => {
      const bubble = row.querySelector(".hk-chat-bubble");
      bubble.replaceChildren(...ex.nodes.map((n) => n.cloneNode(true)));
      bubble.querySelectorAll("h3").forEach((h) => h.removeAttribute("data-q"));
      scroll(row);
      afterReply();
    };
    if (instant) fill();
    else setTimeout(() => el.isConnected && fill(), TYPING_MS);
  }
  function afterReply() {
    chips.innerHTML = "";
    if (i >= exchanges.length) {
      if (player) player.classList.remove("hk-chat-holding");
      return;
    }
    const prompt = exchanges[i].q || DEFAULT_PROMPTS[(i - 1) % DEFAULT_PROMPTS.length];
    // Make the next step obvious: a hint, then one big pulsing bubble.
    chips.innerHTML = `<div class="hk-chat-hint">Tap the purple bubble to keep going 👇</div><button class="hk-chat-chip" type="button">${prompt} <span class="hk-chat-chip-go">›</span></button><button class="hk-chat-skip" type="button">Skip to the end</button>`;
    chips.querySelector(".hk-chat-chip").addEventListener("click", step);
    chips.querySelector(".hk-chat-skip").addEventListener("click", () => {
      chips.innerHTML = "";
      while (i < exchanges.length) {
        const ex = exchanges[i];
        userBubble(ex.q || DEFAULT_PROMPTS[(i - 1) % DEFAULT_PROMPTS.length]);
        i++;
        reply(ex, true);
      }
    });
  }
  function step() {
    const ex = exchanges[i];
    chips.innerHTML = "";
    if (i > 0 || ex.q) userBubble(ex.q || DEFAULT_PROMPTS[(i - 1) % DEFAULT_PROMPTS.length]);
    i++;
    reply(ex, false);
  }
  step();
}

// Turn every chat placeholder that appears inside `root` into a live chat.
function watchChats(root) {
  const scan = () => root.querySelectorAll(".hk-chat:not([data-ready])").forEach(buildChat);
  new MutationObserver(scan).observe(root, { childList: true, subtree: true });
  scan();
}

function chatHtml(html, pose) {
  // A single message (no follow-up questions) is drawn straight away, so
  // lessons can wire up the buttons and widgets inside it immediately.
  // Conversations with several questions still play out one tap at a time.
  const exchanges = (html.match(/<h3/g) || []).length;
  if (exchanges <= 1 && !/data-q=/.test(html)) {
    const p = poseFor(pose);
    return `<div class="hk-chat" data-ready="1"><div class="hk-chat-thread"><div class="hk-chat-msg hk-chat-them"><div class="hk-chat-avatar">${pandaSvg(p, { item: p === "idle" ? "surprise" : undefined })}</div><div class="hk-chat-bubble">${html}</div></div></div></div>`;
  }
  return `<div class="hk-chat" data-pose="${pose}"><template>${html}</template></div>`;
}

export { watchChats, chatHtml };
