# Hayden Keys - Apple Search Ads plan and search checklist

Written 2026-10-07. App: **Hayden Keys** (com.haydenkeys.app, App Store
app ID 6819420632). Free, no ads, no account, optional tip jar that
unlocks nothing.

**Start ads only after version 1.0 is approved and live.** Ads can't run
for an app that isn't on the store, and the first reviews/ratings make
every ad cheaper (better tap-through and conversion).

Apple has renamed Search Ads to **Apple Ads** (ads.apple.com); the
options below are the same. Everything about money here is a
suggestion: **the budget, bids and whether to advertise at all are the
owner's decision.**

---

## 1. Basic or Advanced?

| | Basic | Advanced |
|---|---|---|
| How it works | Set a monthly budget and a max cost per install; Apple picks the searches | You choose keywords, match types, bids, audiences and ad placements |
| Pay for | Installs | Taps (cost per tap), or impressions for Today/Search tab placements |
| Control | Almost none (no keywords, no negatives) | Full: exact match, negatives, custom product pages, per-country |
| Reporting | Installs and spend | Search terms, tap-through, conversion, cost per install by keyword |
| Best for | "Set and forget" with no time to manage | Learning which searches actually install a free piano app |

**Recommendation:** **Advanced**, with a small daily cap. A free app
earns no money per install, so every dollar should go to searches that
prove they convert, and only Advanced shows that. If Basic is still
offered on the account and the owner prefers zero management, set a
small monthly budget and a low max cost per install and review monthly.

## 2. Suggested starting budget (owner's decision)

> **Owner to decide.** A cautious test: about **US$5-10 a day for 2-3
> weeks** across all campaigns, starting in the **US** and **Australia**
> (AU is usually cheaper per tap and is the owner's home market). Add
> the UK and Canada after the first read-out.

- Start with max cost-per-tap bids at or below Apple's suggested range
  (often around US$0.50-2.00 for music/education terms; Apple shows a
  live suggestion per keyword). Raise bids only on keywords that
  install at an acceptable cost.
- Set a **daily cap** on every campaign so nothing can overspend.
- Review after 7 days and again at 14-21 days: pause keywords with many
  taps and no installs; raise bids a little on keywords that install
  cheaply.
- A sensible target for a free app with no revenue: keep **cost per
  install (CPI)** under whatever the owner is comfortable paying to gain
  one learner (for example US$1-2). There is no revenue to pay it back,
  so this is marketing spend, not an investment that returns money.

## 3. Campaign structure (Advanced)

Use one campaign per keyword type, so budgets and results stay
separate. All keywords in the first three campaigns are **exact match**.

### Campaign A - Brand (exact)
Protects the name so no one else's ad sits above Hayden Keys when people
search for it. Usually very cheap.
```
hayden keys
haydenkeys
hayden piano
hayden keys piano
```

### Campaign B - Generic, high intent (exact)
Split into ad groups so each can be paused on its own.

**Ad group B1: learn piano**
```
learn piano
learn piano free
learn to play piano
learn piano app
how to play piano
piano learning app
```

**Ad group B2: lessons and beginners**
```
piano lessons
free piano lessons
piano app for beginners
piano for beginners
beginner piano
piano lessons for kids
piano for kids
```

**Ad group B3: chords and songs**
```
piano chords
easy piano songs
piano songs
learn piano songs
piano chord app
keyboard lessons
learn keyboard
```

**Ad group B4: features**
```
piano practice app
piano tutor
piano teacher app
music theory app
ear training
sheet music for beginners
```

### Campaign C - Competitor terms (exact, small cap, use with caution)
Apple allows bidding on other apps' names, but:
- people searching a brand usually want that app, so tap-through and
  installs are low and taps can be costly;
- the ad shows only Hayden Keys' own name, icon and metadata (never
  write another brand's name anywhere in the listing or a custom
  product page);
- some companies complain or bid back on your brand.

Keep this campaign to a small separate daily cap (for example a third
of the total), and pause it if CPI is far above Campaign B.
```
simply piano
flowkey
skoove
piano academy
playground sessions
yousician piano
```
(Owner to decide whether to run this campaign at all.)

### Campaign D - Discovery (search match + broad)
Finds new searches you didn't think of. Low bids, small cap.
- **Ad group D1:** Search Match ON, no keywords. Apple matches the ad to
  searches using the app's metadata.
- **Ad group D2:** Broad match on a few seeds: `piano`, `learn piano`,
  `piano lessons`, `piano chords`, `keyboard`.
- Every week: open the **Search terms** report, move searches that
  installed cheaply into Campaign B as **exact** keywords, and add them
  as **negative exact** keywords in Campaign D so the two campaigns don't
  compete.

## 4. Negative keywords

Add as campaign-level negatives (broad unless noted) to Campaigns B and
D, so money isn't spent on searches the app can't satisfy:
```
guitar
ukulele
violin
drum
bass
dj
karaoke
ringtone
wallpaper
tiles
magic tiles
piano tiles
roblox
mp3
download
synthesizer
organ
hire
near me
```
Notes:
- `tiles` / `piano tiles` / `magic tiles` are tap-the-tile games, not
  learning; those searchers rarely want lessons.
- Add `simply piano`, `flowkey`, `skoove` (exact) as negatives in
  Campaigns B and D, so competitor searches only go through Campaign C.
- Add `hayden keys` (exact) as a negative in B, C and D, so brand
  searches only go through Campaign A.

## 5. Custom product page ideas

Custom product pages (App Store Connect → the app → Custom Product
Pages) show different screenshots and promotional text, and in Advanced
each ad group can point at one.

1. **"Play along with your real piano"** for ad groups B1/B2.
   Screenshots: Wait for me listening, falling notes, the first-chord
   card. Promo text: "Learn piano on your own piano or keyboard. The
   notes wait for you until you play them. Free, no ads, no account."
2. **"Easy songs with chords"** for ad group B3.
   Screenshots: the song library, a song page with chords per section,
   the play-along. Promo text: "240+ songs with chords for every
   section. Pick a song and the chords fall onto the keys. Free."
3. **"Piano for kids"** for the kids keywords (only if the screenshots
   show Ginger and Pepper and the game-like rewards). Keep the wording
   honest and parent-facing; the app has no ads and no account, which
   is a strong point for parents.

## 6. Measure

- Apple Ads reports installs by keyword. In App Store Connect →
  Analytics, compare "App Store Search" vs "App Store Browse" vs "Web
  Referrer" to see whether organic search is growing.
- No analytics SDK is needed (and adding one would change the "Data Not
  Collected" privacy answer).

---

## 7. Google and website SEO checklist (owner steps)

The site changes are already in the repo (`index.html` title,
description, canonical, Open Graph/Twitter cards, JSON-LD app + FAQ, the
Smart App Banner, `robots.txt`, `sitemap.xml`). They go live with the
next push to `main` (GitHub Pages deploys the repo root).

**Google Search Console (owner must do this, needs the owner's Google
account and the domain registrar login):**
1. Go to https://search.google.com/search-console and click **Add
   property**.
2. Choose **Domain** and enter `haydenkeys.com` (covers http/https and
   www).
3. Google shows a **TXT record**. Add it in the DNS settings at the
   domain registrar (where haydenkeys.com was bought), save, wait a few
   minutes, then click **Verify**. (Alternative: a **URL prefix**
   property for `https://haydenkeys.com/` verified with an HTML tag;
   send the tag and it can be added to `index.html`.)
4. **Sitemaps** → enter `sitemap.xml` → Submit.
5. **URL inspection** → `https://haydenkeys.com/` → **Request indexing**.
6. After a few days, check **Pages** (indexed?) and **Enhancements**
   (FAQ / structured data errors).
7. Optional: **Bing Webmaster Tools** (https://www.bing.com/webmasters)
   → "Import from Google Search Console". Bing also feeds DuckDuckGo and
   others.

**Check the tags** after deploy:
- https://search.google.com/test/rich-results with `https://haydenkeys.com/`
- https://validator.schema.org
- Paste the URL into a message (iMessage, Slack, WhatsApp) to check the
  preview card. Facebook's Sharing Debugger refreshes its cached card.
- Safari on an iPhone: the Smart App Banner appears at the top once the
  app is live on the store.

**Small wins that need the owner's call:**
- Add an "Download on the App Store" badge link on the site once the
  app is live (Apple's official badge artwork and link).
- Link to Jaxx Guitar from Hayden Keys' footer (Jaxx already links to
  Hayden Keys); sibling links help both sites get crawled.
- Ask a few friendly sites (local music teachers, school newsletters,
  Reddit r/piano beginner threads where self-promotion is allowed) to
  link to haydenkeys.com. A handful of real links matter more than any
  tag.
- The site is one page that fills itself with JavaScript, so Google
  mostly sees the head tags and the short intro. If organic search
  becomes a goal, a few plain static pages would rank for long-tail
  searches: e.g. "Piano chord chart" (reference.html already exists),
  "How to find middle C", "The 4 chords behind 100 songs",
  "Easy piano songs for beginners" (song titles and chord names only,
  never lyrics).

## 8. YouTube Shorts / TikTok / Reels ideas (15-45 s, vertical)

Film the phone on the piano's music stand with real hands on the keys.
Use only the app's own sounds or the owner's own playing (no copyrighted
recordings unless the platform's licensed music library covers it), and
never show lyrics.

1. **"4 chords, 100 songs"**: play G, D, Em, C in a loop, cut to song
   titles that use it (titles only).
2. **"The app waits for you"**: Wait for me in action: a wrong note, it
   waits; the right note, it moves on.
3. **"Find middle C in 10 seconds"**: the very first lesson.
4. **"I uploaded a song and it found the chords"**: upload a recording
   the owner has the rights to (e.g. his own playing).
5. **"Left hand, right hand, then both"**: split-screen hands.
6. **"One jazz trick that makes any song sound fancy"**: from the jazz
   lessons.
7. **"Ginger and Pepper react"**: the cats' celebration after a streak.
8. **"Free, no ads, no account"**: a 10-second explainer for parents.

Every caption ends with "Free on the App Store and at haydenkeys.com".
Hashtags: #learnpiano #pianolessons #pianoforbeginners #pianochords
#easypiano #pianotutorial.
