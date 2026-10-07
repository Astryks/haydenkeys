// "Did you know?" — a quirky piano fact, written for young learners,
// that pops up at random between lessons (about half the time a lesson
// is finished): how the piano was invented, how a grand piano works
// inside, and legendary pianists. Each fact is shown once before any
// repeats. Kept to what's well documented; popular myths are corrected
// rather than repeated.

import { peopleHtml, videoHtml, wireVideos } from "./media.js";
import { icon } from "./icons.js";

const FACTS = [
  // --- Inventing the piano (always the 2nd fact anyone sees) ---
  {
    id: "cristofori",
    photosFirst: true,
    title: "Meet the man who invented the piano! 🎹",
    people: ["cristofori", "cristofori-piano"],
    text: `About <strong>300 years ago</strong> in Italy, <strong>Bartolomeo Cristofori</strong> swapped the harpsichord's plucking picks for tiny <strong>hammers</strong>. Now a gentle press played soft, and a hard press played LOUD! 💥<br><br>
      People called it a keyboard that plays <em>piano e forte</em> ("soft and loud"), and that's where the name <strong>piano</strong> comes from! It had only 4 octaves, about <strong>49 keys</strong>. Yours has up to 88!`,
    footnote: "Only three of Cristofori's pianos survive. The oldest, from 1720, is in the Metropolitan Museum of Art in New York (that's it in the photo). At first, hardly anyone cared!",
  },
  // --- Under the hood of a grand piano ---
  {
    title: "What happens when you press a key",
    video: "piano-action",
    text: `Every key is a <strong>seesaw</strong>! Push the front down and the back flicks a <strong>felt hammer</strong> up at the string. Just before it hits, the hammer is let go, so it can <em>bonk!</em> and bounce straight off, letting the string ring: a trick called the <strong>escapement</strong>.`,
    footnote: "A concert grand has around 12,000 parts, and most of them are in these key-and-hammer machines.",
  },
  {
    title: "Why does the sound stop when you let go?",
    text: `Little felt pads called <strong>dampers</strong> sit on the strings. Press a key and its damper lifts so the string rings; let go and it drops back to <strong>hush</strong> it. The <strong>right pedal</strong> lifts <em>all</em> the dampers at once, so every note keeps ringing!`,
  },
  {
    title: "How can thin wires be so LOUD?",
    text: `A string on its own is very quiet. Under the strings is a big, thin wooden board called the <strong>soundboard</strong>. The strings shake it, and it wobbles like a giant <strong>drum skin</strong>, pushing LOTS of air to make the sound you hear!`,
  },
  {
    title: "A piano is holding up 3 elephants",
    text: `A grand piano has about <strong>230 strings</strong>, all stretched super tight. Together they pull with about <strong>20 tonnes</strong> of force, like <strong>three elephants</strong>! A huge <strong>cast-iron frame</strong> (the gold-coloured part under the lid) holds it all together.`,
    footnote: "The one-piece iron frame was patented by Alpheus Babcock in 1825 and perfected by Steinway in the 1850s.",
  },
  {
    title: "Why are the low strings so fat?",
    text: `Low notes need strings that wobble <strong>slowly</strong>, so the bass strings are wrapped in <strong>copper wire</strong> to make them heavy. The A above Middle C vibrates <strong>440 times a second</strong>. The lowest A vibrates only about 27 times!`,
  },
  {
    title: "The trick that made fast playing possible",
    people: ["erard"],
    text: `On early pianos, a key had to come almost all the way back up before you could play that note again. In <strong>1821</strong>, <strong>Sébastien Érard</strong> invented the <strong>double escapement</strong>, so you could repeat a note really fast: <em>ratatatat!</em> Almost every grand piano still uses it.`,
    footnote: "Érard's company gave Beethoven a piano in 1803. Beethoven played so hard he often broke strings!",
  },
  // --- Legendary pianists ---
  {
    title: "The first rock star was a pianist",
    people: ["liszt"],
    video: "liszt",
    text: `About 180 years ago, fans of pianist <strong>Franz Liszt</strong> screamed, fainted and fought over his gloves. People called it <strong>"Lisztomania"</strong>! He played so hard that strings snapped mid-concert, so sometimes a spare piano waited on stage.`,
    footnote: "Players like Liszt (and bigger concert halls) pushed piano makers to build stronger pianos with iron frames.",
  },
  {
    title: "Why pianists sit sideways",
    people: ["liszt"],
    text: `<strong>Franz Liszt</strong> turned the piano <strong>sideways</strong> on stage so people could see his face and flying hands. He was also one of the first to play whole concerts <strong>from memory</strong>. His London concert in 1840 was one of the first ever called a <strong>"recital"</strong>, the word we still use for a solo concert!`,
  },
  {
    title: "Screws, bolts and rubber… inside a piano?!",
    people: ["john-cage"],
    video: "prepared-piano",
    text: `Around 1940, a composer called <strong>John Cage</strong> needed drums for a dance show, but there was only room for a piano. So he slid <strong>screws, bolts and bits of rubber</strong> between the strings, and the keys went <em>clonk</em>, <em>thud</em> and <em>bonggg</em>! He called it the <strong>prepared piano</strong>.`,
    footnote: "Please don't try this without a grown-up and a piano you're allowed to experiment on!",
  },
  {
    title: "Writing music he couldn't hear",
    people: ["beethoven"],
    text: `<strong>Beethoven</strong> was almost completely deaf when his Ninth Symphony was first played in 1824. When it ended, he was still facing the orchestra. A singer gently turned him around so he could <strong>see</strong> the crowd cheering!`,
  },
  {
    title: "Mozart's party trick",
    people: ["mozart"],
    text: `When <strong>Mozart</strong> was a little boy, his dad took him around Europe to show off his playing. For one trick, they <strong>covered the keys with a cloth</strong>, and he still played perfectly! That's why it helps to learn the keys by feel.`,
  },
  {
    title: "Why 88 keys?",
    text: `The first pianos had only about <strong>49 keys</strong> (4 octaves). Composers kept asking for higher and lower notes, so by the 1880s pianos had grown to <strong>88 keys</strong>, just over 7 octaves. Much lower or higher notes are hard for our ears to hear as music anyway!`,
  },
  {
    title: "A superstar who barely did concerts",
    people: ["chopin"],
    video: "chopin",
    text: `<strong>Chopin</strong> is one of the most famous piano composers ever, but he played only about <strong>30 public concerts</strong> in his whole life! He much preferred playing for a few friends in cosy rooms in Paris.`,
  },
  {
    title: "The pianist who hummed along",
    people: ["glenn-gould"],
    text: `Canadian pianist <strong>Glenn Gould</strong> <strong>hummed and sang</strong> while he played, and you can hear him on his recordings! He always sat on a <strong>low wobbly chair his dad made</strong>, even after the seat wore out.`,
  },
  {
    title: "Playing with an orchestra at age 11",
    people: ["herbie-hancock"],
    text: `Jazz legend <strong>Herbie Hancock</strong> played a Mozart piano concerto with the <strong>Chicago Symphony Orchestra</strong> when he was just <strong>11 years old</strong>. When he grew up, he played with Miles Davis and made some of the funkiest piano music ever.`,
  },
  {
    title: "From piano lessons to superstar",
    people: ["elton-john"],
    text: `When <strong>Elton John</strong> was a boy called Reggie, he won a place at London's <strong>Royal Academy of Music</strong> at age 11. He could play a song back after hearing it just once!`,
  },
  {
    title: "A singer who trained as a classical pianist",
    people: ["nina-simone"],
    text: `<strong>Nina Simone</strong> dreamed of being a classical pianist and practised Bach for hours every day. To earn money she played in a bar, and the owner said she had to <strong>sing too</strong>. That's how one of the greatest singers ever got started!`,
  },
];

const KEY = "hk_fun_facts_seen";

function nextFact() {
  let seen = [];
  try { seen = JSON.parse(localStorage.getItem(KEY) || "[]"); } catch (e) { /* ignore */ }
  let pool = FACTS.map((_, i) => i).filter((i) => !seen.includes(i));
  const inventor = FACTS.findIndex((f) => f.id === "cristofori");
  if (seen.length === 0) pool = pool.filter((i) => i !== inventor);
  else if (seen.length === 1 && !seen.includes(inventor)) pool = [inventor];
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
      <div class="hk-funfact-kicker">${icon("fact", 22)} Did you know?</div>
      <h3>${fact.title}</h3>
      ${fact.photosFirst ? peopleHtml(fact.people) : ""}
      <p>${fact.text}</p>
      ${fact.photosFirst ? "" : peopleHtml(fact.people)}
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
