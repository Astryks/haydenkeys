# App Store Connect listing copy — copy-paste ready

Drafted to match the honest, plain-language voice already established
across the site and the in-app About page. Every factual claim here
(song/lesson counts, feature list) matches the real, current app —
re-check the counts against `STATUS.md` before submitting if time has
passed, since both numbers grow as the curriculum/library grow.

## App name (max 30 characters)

```
Hayden Keys
```
(11 characters — plenty of room if Apple ever requires more context,
but the plain name is clean and already how the app refers to itself
everywhere.)

## Subtitle (max 30 characters)

```
Learn Piano, Chord by Chord
```
(27 characters. The earlier draft, "Learn Piano, One Song at a Time,"
is 31 — one over Apple's limit — so it was swapped for this one.
Alternatives that also fit: `Piano Lessons That Stick` (24),
`Free, Gamified Piano Lessons` (28).)

## Promotional text (max 170 characters, editable anytime without a new review)

```
Learn 4 chords that play 100+ songs in your first lesson. Falling notes, a Netflix-style song library, and "Wait for me" that listens to your real piano. Free.
```

## Description (max 4000 characters) — updated 2026-10-07

```
Hayden Keys teaches piano the fun way: one tiny step at a time, with real songs from your very first lesson.

In about a minute you'll learn the 4 chords behind more than 100 popular songs: G, D, Em and C. Hayden the panda guides you through short, visual cards: find middle C on your own piano, learn the key names, play your first chord, and you're off.

WHAT YOU GET, FREE
- 200+ bite-sized lessons: middle C, key names, chords, happy and sad chords, every major and minor chord, both hands, genres (pop, rock, blues, jazz, classical), scales, 7th chords and more
- 180+ songs in a Netflix-style library, sorted by genre, with album covers. Tap a song and the chords fall onto the keys straight away
- Every song shows its key and its chords section by section, with the official video to listen along
- "Wait for me": the notes wait until you play them on your real piano. We use your phone's microphone only to hear your piano keys, nothing else
- Upload any song: record a song you love, and the app finds the chords for you, right on your device
- Chord Ear Gym: train your ears to name all 24 major and minor chords
- Movie and jazz favourites, like the Interstellar theme and Chet Baker's My Funny Valentine, made simple
- Streaks, rewards, a 2-minute daily review, and fun facts about the piano and the people who invented it

MADE FOR REAL PIANOS
Hayden Keys is a guide for your own piano or keyboard. The app shows you what to press; the real practice happens on your piano.

CHORDS YOU CAN TRUST
Song chords are checked against several sources. No lyrics are included.

NO ACCOUNT, NO ADS
No sign-up and no ads. Your progress is saved on your device.
```

## Keywords (max 100 characters, comma-separated, no spaces after commas)

```
piano,lessons,chords,keyboard,learn,beginner,music theory,songs,practice,ear training,scales,jazz
```
(Each word is indexed on its own, and words in the app name are
indexed already, so repeating "piano" in every phrase wastes room — this
version covers more distinct searches in the same 100 characters. The
earlier draft, for reference:
`piano,learn piano,piano lessons,chords,music theory,beginner piano,piano app,free piano,play piano`.)

## Support URL

```
https://github.com/Astryks/haydenkeys/issues
```
(Alternative if Sid wants an email instead: whatever contact address he
prefers — GitHub Issues is free and already public, no extra setup.)

## Marketing URL (optional)

```
https://haydenkeys.com
```

## Privacy Policy URL (required — camera/microphone usage makes this mandatory)

```
https://haydenkeys.com/privacy.html
```

## Category

- Primary: **Education**
- Secondary (optional): **Music**

## Age rating questionnaire — suggested answers, with reasoning

Apple's age rating questionnaire asks about specific content categories.
For every category below, the honest answer is **"None"** because the
app genuinely contains none of it:

| Question | Answer | Why |
|---|---|---|
| Cartoon or Fantasy Violence | None | No violence of any kind |
| Realistic Violence | None | — |
| Sexual Content or Nudity | None | — |
| Profanity or Crude Humor | None | — |
| Alcohol, Tobacco, or Drug Use | None | — |
| Mature/Suggestive Themes | None | — |
| Horror/Fear Themes | None | — |
| Gambling (Simulated) | None | No simulated gambling mechanics |
| Medical/Treatment Information | None | — |
| Unrestricted Web Access | No | The app doesn't embed a general web browser |
| User-Generated Content shared with others | No | No social features, no sharing, no public posting — uploaded audio is processed locally and never leaves the device |
| Contests | No | — |

This should qualify for Apple's lowest age rating (**4+**). The only
items worth double-checking yourself in App Store Connect: confirm
"User-Generated Content" is answered "No" (correct, since there's no
sharing/posting of anything between users), and confirm "Unrestricted
Web Access" is "No" (correct — the only external network call the app
makes is the iTunes Search API for album art, which isn't a web browser
and isn't user-navigable).

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
```

## Content rights (App Store Connect → App Information)

- **"Does your app contain, show, or access third-party content?"** Answer **Yes**: chord progressions of popular songs, album art from the iTunes Search API, and links to official YouTube videos.
- **Checklist for "Do you have all the rights you need?"** (Sid to confirm):
  - **Chord progressions** aren't copyrightable, and no lyrics or sheet music are included.
  - **Album art** is used through Apple's iTunes Search API, as intended for linking to the store.
  - **Videos** are links to the artists' own official uploads.
  - **Melodies:** where a melody is copyrighted, the lessons teach its chords instead.

## What's New (for the first version)

```
Welcome to Hayden Keys! A free, gamified piano curriculum that starts
with real songs, not just scales — 100+ lessons and a 100+ song library
to get you playing right away.
```

## Screenshots
In `ios/screenshots/app-store/`: 6 for iPhone 6.9" (1320×2868) and 6 for iPad 13" (2064×2752). Order: 1 home, 2 middle C, 3 play-along, 4 song library, 5 two hands, 6 Chord Ear Gym.
