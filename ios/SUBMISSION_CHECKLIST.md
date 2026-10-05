# iOS App Store submission checklist

Everything that can genuinely be prepared from this environment is
done (see the list below). The remaining steps all need Xcode running
interactively on a Mac with Sid's own Apple Developer account logged in
— a local, interactive, credentialed process that can't be done from an
automated coding session. This file is the exact, numbered list of what
Sid still needs to do himself.

## Already done, verified from here

- [x] Capacitor project scaffolded, `ios/App/App.xcodeproj` committed
      (item 12).
- [x] `npx cap sync` runs clean (re-verified this pass).
- [x] Camera/microphone `Info.plist` usage-description strings present
      and accurate to real app behavior.
- [x] Bundle identifier set: **`com.haydenkeys.app`** (confirm this is
      the exact string Sid wants registered in his Apple Developer
      account — easy to change in Xcode's Signing & Capabilities tab
      before first archive if not).
- [x] Version set to a sane initial value: **Marketing Version 1.0,
      Build 1** (`MARKETING_VERSION` / `CURRENT_PROJECT_VERSION` in the
      Xcode project).
- [x] App Store icon (`AppIcon.appiconset/AppIcon-512@2x.png`) replaced
      with a real 1024x1024 icon generated from the current mascot art
      (`assets/mascot-square.png`, cropped tighter to remove excess
      empty margin so it reads clearly at small sizes), no alpha
      channel, no pre-applied rounded corners — matches Apple's current
      single-size `Contents.json` icon spec (Xcode 14+ generates every
      other size from this one source automatically; there is no
      separate list of 10+ individual icon files to fill in anymore).
- [x] Launch screen (`Splash.imageset`) replaced with real branding —
      the pastel background color plus the mascot centered, not the
      generic Capacitor default (a plain blue "X" logo on white).
- [x] Real Privacy Policy page live in the repo at `privacy.html`
      (served at `https://haydenkeys.com/privacy.html` once deployed) —
      accurate to actual camera/microphone/storage/network behavior,
      cross-checked against the real `Info.plist` strings and the actual
      code paths that touch the camera, microphone, and local storage.
- [x] App Store Connect listing copy drafted and ready to copy-paste:
      see `ios/APP_STORE_LISTING.md` (name, subtitle options, promotional
      text, full description, keywords, support/marketing/privacy URLs,
      category, age-rating answers with reasoning, "What's New" text).

## What Sid needs to do himself, in order

1. **Install dependencies once**: `npm install` in the repo root
   (installs the Capacitor CLI — small, already gitignored).
2. **Open the project in Xcode**: `npx cap open ios`, or open
   `ios/App/App.xcodeproj` directly.
3. **Sign the app**: in Xcode, select the `App` target → **Signing &
   Capabilities** → choose your own Apple Developer team and signing
   certificate. This is the one step that genuinely requires your own
   account and can't be scripted or done remotely.
4. **Confirm the bundle identifier**: still in Signing & Capabilities,
   confirm `com.haydenkeys.app` is the identifier you want to register
   (or change it here first, before archiving, if you'd rather use
   something else — e.g. if you already registered a different one in
   App Store Connect).
5. **Run it once for real**: pick a simulator or your connected iPhone
   → **Run**, confirm the app launches and the site loads inside the
   native shell. Test the Camera Overlay and Ear Check permission
   prompts on a **real device** specifically — a simulator has a fake
   microphone but no real camera.
6. **Take App Store screenshots**: Apple requires screenshots for at
   least one device size per device family you support (typically a
   6.9" or 6.5" iPhone size, plus iPad if you mark the app as
   iPad-compatible). Take these on a simulator or device running the
   actual app — a few good screens: the Lessons map/roadmap, a lesson
   mid-chord (showing the keyboard highlight), the Discover tab with
   album art, and the MIDI tab.
7. **Create the app record in App Store Connect**: App Store Connect →
   My Apps → "+" → New App. Pick the bundle ID from step 4, set the
   name/subtitle/etc. using `ios/APP_STORE_LISTING.md`.
8. **Fill in the listing**: paste in the description, keywords,
   support URL, marketing URL from `ios/APP_STORE_LISTING.md`.
9. **Paste in the Privacy Policy URL**:
   `https://haydenkeys.com/privacy.html` (must be live/reachable before
   submitting — confirm it resolves after your next deploy).
10. **Answer the age rating questionnaire** using the table in
    `ios/APP_STORE_LISTING.md` — every category is "None"/"No", which
    should land on the lowest rating (4+).
11. **Answer export compliance**: when Xcode/App Store Connect asks
    "Does your app use encryption?", the standard answer for an app that
    only uses HTTPS (no custom/proprietary encryption) is **"No"** — or
    more precisely, if asked the follow-up, this app qualifies for the
    standard exemption for apps that only use encryption exempt under
    category 5D002 (HTTPS/TLS using only the OS's standard libraries,
    which is exactly what this app does — it's a common point of
    confusion, but the answer is the same simple "no custom encryption"
    answer the vast majority of apps give).
12. **Upload a build**: back in Xcode, **Product → Archive**, then use
    the Organizer window's **Distribute App** flow to upload to App
    Store Connect.
13. **Attach the build, add screenshots, submit for review**: in App
    Store Connect, select the uploaded build on the app version page,
    upload the screenshots from step 6, and submit for review.
14. **After any future web app changes**: run `npx cap sync` again
    before re-archiving in Xcode, so the native copy picks up the
    latest site files.

## A note on the mascot specifically (item 33)

The app icon and launch screen above were generated from
`assets/mascot-square.png`, Sid's own hand-drawn illustration — not a
vector drawing this project can re-pose or recolor by editing code. If
a different crop/composition is wanted for the App Store icon
specifically (the current one is tightened slightly from the raw square
to reduce empty margin), that's a quick re-crop from the same source
image, no new artwork needed — ping and it can be adjusted. A genuinely
different pose/scene needs a new image from Sid, the same as the web
mascot.
