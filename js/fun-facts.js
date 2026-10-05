// "Did you know?" — a quirky piano fact, written for young learners,
// that pops up at random between lessons (about half the time a lesson
// is finished): how the piano was invented, how a grand piano works
// inside, and legendary pianists. Each fact is shown once before any
// repeats. Kept to what's well documented; popular myths are corrected
// rather than repeated.

import { peopleHtml, videoHtml, wireVideos } from "./media.js";

const FACTS = [
  // --- Inventing the piano ---
  {
    title: "Someone had to INVENT the piano!",
    people: ["cristofori"],
    text: `About 300 years ago, in Italy, a clever instrument maker called <strong>Bartolomeo Cristofori</strong> had a problem. The keyboard everyone played, the <strong>harpsichord</strong>, plucks its strings with tiny picks — so every note is the same loudness, no matter how hard you press. Boring!<br><br>
      His big idea: instead of plucking, <strong>hit</strong> the string with a tiny <strong>hammer</strong> that bounces right off again. Tap a key gently → a soft note. Press hard → a LOUD note! He named it "harpsichord that plays soft and loud" — in Italian, <em>piano e forte</em>. That's why we call it a <strong>piano</strong>!`,
    footnote: "Around 1700, in Florence. His first hammers were covered in leather; today they're covered in thick wool felt.",
  },
  // --- Under the hood of a grand piano ---
  {
    title: "Inside a grand piano: what happens when you press a key",
    video: "piano-action",
    text: `Every key is a <strong>seesaw</strong>! When you push the front of the key down, the back pops up and flicks a <strong>felt hammer</strong> toward the strings.<br><br>
      Here's the clever part: just before the hammer reaches the string, it gets <strong>let go</strong> and flies the last bit on its own — <em>bonk!</em> — then falls straight back. If it stayed pressed against the string, the string couldn't ring. Piano makers call this trick the <strong>escapement</strong>, because the hammer "escapes".`,
    footnote: "A concert grand has around 12,000 parts, and most of them live inside these key-and-hammer machines.",
  },
  {
    title: "Why does the sound stop when you let go?",
    text: `Sitting on top of the strings are little <strong>felt pads called dampers</strong> — like tiny pillows. When you press a key, its damper lifts up so the string can ring. When you let go, the damper drops back down and <strong>hushes</strong> the string.<br><br>
      The <strong>right pedal</strong> lifts <em>all</em> the dampers at once — that's why notes keep ringing when you hold it down, like a big echoey cave!`,
  },
  {
    title: "How can thin wires be so LOUD?",
    text: `A string on its own is very quiet — it's too thin to push much air. So underneath the strings is a big, thin wooden board called the <strong>soundboard</strong> (usually spruce). The strings rest on a wooden <strong>bridge</strong> glued to it, and their shaking passes into the board, which wobbles like a giant <strong>drum skin</strong> or a speaker and pushes LOTS of air. That's the sound you hear!`,
  },
  {
    title: "A piano is holding up 3 elephants",
    text: `A grand piano has about <strong>230 strings</strong> (most keys have 3 strings, so they're extra loud). Every string is stretched super tight — all together they pull with about <strong>20 tonnes</strong> of force. That's like <strong>three elephants</strong> pulling on the piano!<br><br>
      Wood alone would bend, so inside every modern piano is a huge <strong>cast-iron frame</strong>, called the <strong>plate</strong> — it's the gold-coloured part you see when you open the lid.`,
    footnote: "The one-piece iron frame was patented by Alpheus Babcock in 1825 and perfected by Steinway in the 1850s.",
  },
  {
    title: "Why are the low strings so fat?",
    text: `Low notes need strings that vibrate <strong>slowly</strong>. A heavier string wobbles more slowly, so the bass strings are wrapped in <strong>copper wire</strong> to make them chunky and heavy. The A above Middle C vibrates <strong>440 times every second</strong>; the lowest A only about 27 times!`,
  },
  {
    title: "The trick that made fast playing possible",
    people: ["erard"],
    text: `On early pianos, you had to let a key come almost all the way back up before you could play that note again — so super-fast repeated notes were hard. In <strong>1821</strong>, a French inventor, <strong>Sébastien Érard</strong>, built a <strong>double escapement</strong>: an extra set of levers that "re-arms" the hammer while the key is only halfway up. Now you could play the same note again and again, really fast — <em>ratatatat!</em> Almost every grand piano still uses his invention.`,
    footnote: "Érard's company gave Beethoven a piano in 1803. Beethoven played so hard he often broke strings!",
  },
  // --- Legendary pianists ---
  {
    title: "The first rock star was a pianist",
    people: ["liszt"],
    video: "liszt",
    text: `About 180 years ago, a pianist called <strong>Franz Liszt</strong> was SO exciting that fans screamed, fainted and fought over his gloves and broken piano strings. A poet named it <strong>"Lisztomania"</strong>. He played so hard that strings snapped and hammers broke in the middle of concerts — sometimes a spare piano waited on stage, just in case!`,
    footnote: "Players like Liszt (and bigger concert halls) pushed piano makers to build stronger pianos with iron frames.",
  },
  {
    title: "Why pianists sit sideways",
    people: ["liszt"],
    text: `<strong>Franz Liszt</strong> is famous for turning the piano <strong>sideways</strong> on stage so people could see his face and his flying hands. He was also one of the first to play whole concerts <strong>from memory</strong>, and he called them <strong>"recitals"</strong> — the word we still use for a solo concert!`,
  },
  {
    title: "Screws, bolts and rubber… inside a piano?!",
    people: ["john-cage"],
    video: "prepared-piano",
    text: `In 1940 a composer called <strong>John Cage</strong> needed drums for a dance show, but the stage only had room for one piano. So he turned the piano INTO a drum kit: he carefully slid <strong>screws, bolts and bits of rubber</strong> between the strings. Now the keys went <em>clonk</em>, <em>thud</em> and <em>bonggg</em>! He called it the <strong>prepared piano</strong>.`,
    footnote: "Please don't try this without a grown-up and a piano you're allowed to experiment on!",
  },
  {
    title: "Writing music he couldn't hear",
    people: ["beethoven"],
    text: `<strong>Beethoven</strong> slowly lost his hearing, and by the time his famous Ninth Symphony was first played in 1824 he was almost completely deaf. When it ended, he was still facing the orchestra — a singer gently turned him around so he could <strong>see</strong> the crowd cheering and waving.`,
  },
  {
    title: "Mozart's party trick",
    people: ["mozart"],
    text: `When <strong>Mozart</strong> was a little boy, his dad took him around Europe to show off his playing. One trick: they <strong>covered the keys with a cloth</strong> — and he could still play perfectly without seeing them! (That's why it helps to learn where the keys are by feel.)`,
  },
  {
    title: "Why 88 keys?",
    text: `The first pianos had only about <strong>60 keys</strong>. Composers kept asking for higher and lower notes, so pianos grew and grew — until around the 1880s they settled on <strong>88 keys</strong>, just over 7 octaves. Notes much lower or higher than that are hard for our ears to hear as music anyway!`,
  },
  {
    title: "A superstar who barely did concerts",
    people: ["chopin"],
    video: "chopin",
    text: `<strong>Chopin</strong> is one of the most famous piano composers ever — but he only played about <strong>30 public concerts</strong> in his whole life! He liked playing for a few friends in cosy rooms in Paris much more than for big crowds.`,
  },
  {
    title: "The pianist who hummed along",
    people: ["glenn-gould"],
    text: `A famous Canadian pianist, <strong>Glenn Gould</strong>, <strong>hummed and sang</strong> while he played — you can hear him on his recordings! And he always sat on a <strong>low wobbly chair his dad made</strong>, even after the seat wore out.`,
  },
  {
    title: "Playing with an orchestra — at age 11",
    people: ["herbie-hancock"],
    text: `Jazz legend <strong>Herbie Hancock</strong> played a Mozart piano concerto with the <strong>Chicago Symphony Orchestra</strong> when he was just <strong>11 years old</strong>. When he grew up, he played with Miles Davis and made some of the funkiest piano music ever.`,
  },
  {
    title: "From piano lessons to superstar",
    people: ["elton-john"],
    text: `When <strong>Elton John</strong> was a boy called Reggie, he won a place at London's <strong>Royal Academy of Music</strong> at age 11 — he could play a song back after hearing it just once!`,
  },
  {
    title: "A singer who trained as a classical pianist",
    people: ["nina-simone"],
    text: `<strong>Nina Simone</strong> dreamed of being a classical concert pianist and practised Bach for hours every day. To earn money she played in a bar — and the owner said she had to <strong>sing too</strong>. That's how one of the greatest singers ever got started!`,
  },
];

const KEY = "hk_fun_facts_seen";

function nextFact() {
  let seen = [];
  try { seen = JSON.parse(localStorage.getItem(KEY) || "[]"); } catch (e) { /* ignore */ }
  let pool = FACTS.map((_, i) => i).filter((i) => !seen.includes(i));
  if (!pool.length) {
    seen = [];
    pool = FACTS.map((_, i) => i);
  }
  const i = pool[Math.floor(Math.random() * pool.length)];
  try { localStorage.setItem(KEY, JSON.stringify([...seen, i])); } catch (e) { /* ignore */ }
  return FACTS[i];
}

function showFunFact(fact = nextFact()) {
  document.querySelector(".hk-funfact")?.remove();
  const card = document.createElement("div");
  card.className = "hk-funfact";
  card.setAttribute("role", "dialog");
  card.setAttribute("aria-label", "Did you know?");
  card.innerHTML = `
    <div class="hk-funfact-card">
      <div class="hk-funfact-kicker">🎹 Did you know?</div>
      <h3>${fact.title}</h3>
      <p>${fact.text}</p>
      ${peopleHtml(fact.people)}
      ${videoHtml(fact.video)}
      ${fact.footnote ? `<p class="hk-funfact-note">${fact.footnote}</p>` : ""}
      <button class="hk-btn hk-btn-primary hk-funfact-close">Cool! Keep going</button>
    </div>`;
  document.body.appendChild(card);
  wireVideos(card);
  const close = () => card.remove();
  card.querySelector(".hk-funfact-close").addEventListener("click", close);
  card.addEventListener("click", (e) => { if (e.target === card) close(); });
}

// At random, between lessons: about half the time a lesson is finished
// for the first time — always on the very first one, so it's discovered.
function maybeShowFunFact() {
  let shown = 0;
  try { shown = JSON.parse(localStorage.getItem(KEY) || "[]").length; } catch (e) { /* ignore */ }
  if (shown === 0 || Math.random() < 0.5) setTimeout(() => showFunFact(), 1400);
}

export { FACTS, showFunFact, maybeShowFunFact };
