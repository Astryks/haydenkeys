# App Store Connect listing copy - copy-paste ready (ASO pass, 2026-10-07)

Every value below is final and fits Apple's limits (character counts in
brackets). Counts were checked against the code on 2026-10-07:
`LESSONS` in `js/lessons-data.js` = 258 lessons, `SONGS` in
`js/songs-data.js` = 241 songs. The copy says "250+" and "240+" so it
stays true as both grow. Re-check if either number ever drops.

App Store Connect app ID: **6819420632** (used by the Smart App Banner
in `index.html`). Version: **1.0** (build 35).

ASO rules used here:
- Apple indexes the app name, subtitle and keyword field together, so no
  word is repeated across them.
- Keyword field: comma-separated, no spaces, singular forms (Apple
  matches simple plurals), no competitor brand names, nothing the app
  doesn't do (no ukulele, no guitar).
- Words already in the name/subtitle: hayden, keys, learn, piano,
  lessons, chords, easy, songs.

## App name (max 30)

```
Hayden Keys: Learn Piano
```
[24] Puts the two highest-intent words ("learn piano") in the most
heavily weighted field while keeping the brand first.

## Subtitle (max 30)

```
Lessons, Chords & Easy Songs
```
[28] Adds "lessons", "chords", "easy" and "songs", so searches such as
"piano lessons", "easy piano songs" and "piano chords" match name +
subtitle together.

## Keywords (max 100)

```
keyboard,beginner,sheet,note,practice,tutor,teacher,theory,jazz,scale,ear,training,play,kid,game
```
[96] Combines with the name/subtitle for searches like "piano for
beginners", "learn keyboard", "piano sheet music", "piano notes",
"piano tutor", "music theory", "ear training", "play piano", "piano
game", "piano for kids", "jazz piano", "piano scales". Every term is a
real feature (sheet-music lessons, note reading, scales, jazz tricks,
Chord Ear Gym).

## Promotional text (max 170, editable anytime without review)

```
Learn the 4 chords behind 100+ songs in your first lesson. Then the notes fall onto the keys and Wait for me listens to your real piano. Free, no ads, no account.
```
[162]

## Description (max 4000)

The first three lines are what people see before "more", so they carry
the main benefit, "free", and the hook.

```
Learn piano with real songs from your very first lesson. Hayden Keys is a free piano app for beginners: no ads, no account, no subscription.

In about a minute you learn G, D, Em and C, the 4 chords behind more than 100 popular songs. Then the notes fall onto the keys, and "Wait for me" listens to your real piano and waits until you play the right note.

WHAT YOU GET, ALL FREE
- 250+ bite-sized lessons: find middle C, learn the key names, play your first chords, then left hand, right hand and both hands together, reading notes, scales, 7th chords and fun jazz tricks
- 240+ songs in a Netflix-style library: pop, rock, ballads, jazz, classical, film themes and hits from around the world, with album covers
- Chords for every section of every song, plus the song's key and the official video to listen along
- Falling-note play-along with three modes: Listen, Wait for me and Play in time
- Upload any song: pick a recording you love and the app finds the chords for you, right on your device
- Guess the song: upload a recording and the app tells you which song it is, then jump straight to learning it
- Teacher videos and inspiration videos from great pianists
- Chord Ear Gym: train your ears to name all 24 major and minor chords
- Streaks, rewards, a 2-minute daily review and fun facts about the piano

MEET GINGER AND PEPPER
Two friendly cats cheer you on through every lesson, so practice feels like a game, not homework.

MADE FOR YOUR REAL PIANO OR KEYBOARD
Hayden Keys shows you what to press, and the real practice happens on your own piano or keyboard. The microphone is optional and is only used to hear your keys. Sound is analysed on your device and never recorded or sent. No piano nearby? Tap the on-screen keyboard.

CHORDS YOU CAN TRUST
Song chords are checked against several sources. Chords only: no lyrics are included.

FREE, FOR REAL
Everything in Hayden Keys is free. There is an optional tip jar if you'd like to support the app. A tip earns a warm thank-you from Ginger and Pepper. It unlocks no features, because nothing is locked.

NO ACCOUNT, NO ADS
No sign-up and no ads. Your progress stays on your device.

Also on the web at haydenkeys.com.
```
[2110]

## What's New (version 1.0)

```
Welcome to Hayden Keys! Learn piano free with 250+ bite-sized lessons and 240+ songs with chords for every section. Play along with falling notes, let Wait for me listen to your real piano, upload any song to find its chords, and meet Ginger and Pepper. No ads, no account.
```
[273] (Apple doesn't show What's New for a first release, but the field
is kept ready for 1.0.1 onwards; replace it with the real changes then.)

## Screenshot captions (6, matching `ios/screenshots/app-store/` order)

Short enough to read at thumbnail size (aim for 35 characters or less):

| # | Screenshot | Caption | Chars |
|---|---|---|---|
| 1 | home | Play your first chord in a minute | 33 |
| 2 | middle C | Find middle C on your own piano | 31 |
| 3 | play-along | Falling notes wait for your piano | 33 |
| 4 | library | 240+ songs with chords, all free | 32 |
| 5 | two hands | Left hand, right hand, then both | 32 |
| 6 | Chord Ear Gym | Train your ear on 24 chords | 27 |

Screenshot captions aren't indexed for search, but App Store search
results show the first 3 screenshots, so 1-3 do most of the converting.

## Category, price, age rating

- Primary category: **Education**
- Secondary category: **Music**
- Price: **Free** (optional tip jar In-App Purchases, unlock nothing)
- Age rating: **4+** (questionnaire answers below)

## Localizations worth adding later (extra keyword space, free)

Adding English variants gives each storefront more indexed words
without changing the app. As commonly observed (Apple doesn't document
it officially): the **Australia** store indexes English (Australia) and
English (UK) metadata; the **UK** store indexes English (UK); the
**Canada** store indexes English (Canada) and French (Canada); the **US**
store indexes English (US) and Spanish (Mexico). So the AU and UK sets
below use different words from each other and from the US set.

For each new localization, copy the name, subtitle, description,
promotional text and screenshots from English (US) (Australian/UK
spelling is fine, e.g. "practise" as a verb), and paste the keyword
field below.

**English (Australia), keywords**
```
tutorial,pianist,classical,pop,melody,left,right,falling,daily,streak,ballad,movie,christmas,duet
```
[97]

**English (UK), keywords**
```
major,minor,progression,improvise,blues,finder,carol,listen,upload,transcribe,identify,recognise
```
[96]

**Later:** English (Canada) with a third set built from runner-up terms
(e.g. `read,hand,finder,chart,tile,both,daily,exercise,warmup,octave`),
and Spanish (Mexico) / French (Canada) only once the app itself is
translated (foreign-language metadata for an English-only app
disappoints users and hurts ratings).

## Support URL

```
https://github.com/Astryks/haydenkeys/issues
```

## Marketing URL

```
https://haydenkeys.com
```

## Privacy Policy URL (required: microphone use makes this mandatory)

```
https://haydenkeys.com/privacy.html
```

## Age rating questionnaire - suggested answers, with reasoning

For every category below the honest answer is **"None"**, because the
app contains none of it:

| Question | Answer | Why |
|---|---|---|
| Cartoon or Fantasy Violence | None | No violence of any kind |
| Realistic Violence | None | - |
| Sexual Content or Nudity | None | - |
| Profanity or Crude Humor | None | - |
| Alcohol, Tobacco, or Drug Use | None | - |
| Mature/Suggestive Themes | None | - |
| Horror/Fear Themes | None | - |
| Gambling (Simulated) | None | No simulated gambling mechanics |
| Medical/Treatment Information | None | - |
| Unrestricted Web Access | No | The app doesn't embed a general web browser |
| User-Generated Content shared with others | No | No social features, no sharing, no public posting; uploaded audio is processed locally and never leaves the device |
| Contests | No | - |

This qualifies for **4+**. Double-check in App Store Connect that
"User-Generated Content" and "Unrestricted Web Access" are both "No".

## App Privacy (App Store Connect → App Privacy)

- **Data collection:** answer **"No, we do not collect data from this app."** Progress, uploads and settings are stored only on the device. The app has no accounts, analytics or ads.
- Things that leave the device, all disclosed in the privacy policy and none of them collected by us:
  - **Guess the song (optional):** an audio fingerprint, not the audio itself, goes to Apple's ShazamKit.
  - **Cover art:** the song title and artist go to Apple's iTunes Search to fetch the picture.
  - **Videos:** these open on YouTube only when the user taps them.

## Notes for App Review (App Review Information → Notes)

```
Hayden Keys is a free piano-learning app. No account or sign-in is needed.

The microphone is optional. It's used only to hear the user's real piano in "Wait for me", the Middle C sound check and lesson listening steps. Audio is analysed on the device and never recorded or sent.

"Upload any song" lets users pick a recording from their own phone; it is transcribed on the device. The optional "Guess the song" button uses ShazamKit (an audio signature only).

Song pages show chord progressions only (no lyrics). Album art comes from the iTunes Search API, and "Watch" buttons open official videos on YouTube.

The optional Tip jar (bottom of the home screen, collapsed by default) offers three consumable In-App Purchases (com.haydenkeys.app.tip.small / .medium / .large). Tips are donations: they unlock no content or features, and everything in the app stays free.
```

## Content rights (App Store Connect → App Information)

- **"Does your app contain, show, or access third-party content?"** Answer **Yes**: chord progressions of popular songs, album art from the iTunes Search API, and links to official YouTube videos.
- **Checklist for "Do you have all the rights you need?"** (Sid to confirm):
  - **Chord progressions** aren't copyrightable, and no lyrics are included.
  - **Album art** is used through Apple's iTunes Search API, as intended for linking to the store.
  - **Videos** are links to the artists' own official uploads.
  - **Melodies:** where a melody is copyrighted, the lessons teach its chords instead. Sheet-music lessons use public-domain pieces only.

## Screenshots

In `ios/screenshots/app-store/`: 6 for iPhone 6.9" (1320×2868) and 6 for iPad 13" (2064×2752). Order: 1 home, 2 middle C, 3 play-along, 4 song library, 5 two hands, 6 Chord Ear Gym. Captions above.

See `ios/SEARCH_ADS_PLAN.md` for the Apple Search Ads and website SEO plan.
