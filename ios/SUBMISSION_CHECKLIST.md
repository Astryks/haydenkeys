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
- [x] `npx cap sync` runs clean (re-verified this pass, after all
      changes through item 42).
- [x] **Real gap found and fixed this pass (item 43)**: `www/` (the
      directory Capacitor actually bundles into the native app) only
      had symlinks for the files/folders that existed when it was first
      scaffolded — `reference.html` (added in item 38) and `privacy.html`
      were missing symlinks entirely, so tapping the in-lesson "Curious
      about all the keys and chords?" link would have 404'd inside the
      native iOS app specifically (it worked fine on the web since the
      web serves from the repo root directly, not through `www/`). Fixed
      by adding `www/reference.html -> ../reference.html` and
      `www/privacy.html -> ../privacy.html` symlinks; confirmed both now
      appear in `ios/App/App/public/` after `cap sync`.
- [x] App Store icon and launch screen re-confirmed current: both were
      last regenerated in the item 37 commit (the same commit that fixed
      the mascot's transparency), which is also the most recent mascot
      art change — nothing stale to regenerate.
- [x] `ios/APP_STORE_LISTING.md` re-read against the current app: song
      count (103), lesson count (101), and feature list (MIDI tab,
      upload-your-own-recording, camera overlay, ear training) all still
      match "100+" language and real current features — no stale
      numbers or references to superseded taglines found, nothing
      changed.
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

- [x] **Item 56 submission-blocker sweep (2026-10-05)** — fixed things
      that would have bounced the upload or the review:
      - `UIRequiresFullScreen = true` added. The app supports iPad
        (`TARGETED_DEVICE_FAMILY = 1,2`) but only landscape; without this
        flag App Store Connect rejects the upload (ITMS-90474: iPad
        multitasking requires all four orientations).
      - Removed the unused `@capacitor/camera` plugin. Nothing in the app
        called it (Camera Overlay uses the WebView's own camera access),
        but it linked photo-library APIs into the binary with no
        `NSPhotoLibraryUsageDescription` — an automatic ITMS-90683
        rejection.
      - `UIRequiredDeviceCapabilities` changed from the obsolete `armv7`
        to `arm64`.
      - `ITSAppUsesNonExemptEncryption = false` added, so App Store
        Connect stops asking the export-compliance question on every
        build (HTTPS only, same answer as step 12 below).
      - App privacy manifest added (`ios/App/App/PrivacyInfo.xcprivacy`,
        in the Xcode project's Resources): no tracking, no collected data,
        and the UserDefaults reason Capacitor's bridge needs.
      - "Support Hayden Keys" (an external Stripe payment link) is hidden
        inside the native app — tips/donations through an outside payment
        link are a guideline 3.1.1 rejection risk. The website keeps it.
      - Links to `README.md` / `THIRD_PARTY_NOTICES.md` / `STATUS.md` now
        open GitHub's rendered copies (in Safari, from the app) instead of
        raw .md files that aren't bundled in the app and left the WebView
        on a dead-end 404 with no way back.
      - `viewport-fit=cover` plus safe-area padding, so nothing sits under
        the notch / Dynamic Island in landscape.
      - Microphone usage string and privacy policy corrected: the mic is
        used in three places (the lessons' "Tune this note" button was
        missing), and the piano-sample download is automatic, not
        optional.
      - Verified: `npx cap sync ios` clean; `xcodebuild` Debug
        (simulator) and Release (device, unsigned) both **BUILD
        SUCCEEDED**, and `PrivacyInfo.xcprivacy` is in the built `.app`.
        Not verified here: running it — this Mac has no iOS Simulator
        runtime installed, so step 5 below is still the first real launch.

## What Sid needs to do himself, in order

1. **Install dependencies and copy the web app in**: `npm install`, then
   `npx cap sync ios`, in the repo root. Both are required on a fresh
   clone: the Xcode project resolves Capacitor from `node_modules/`, and
   the app's web files (`ios/App/App/public/`) are gitignored and only
   created by `cap sync` — skip it and the app launches to a blank
   screen.
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
   least one device size per device family you support. This app
   supports iPad, so you need **both** a 6.9" iPhone set (e.g. iPhone 17
   Pro Max simulator) **and** a 13" iPad set (e.g. iPad Pro 13-inch
   simulator) — landscape, since the app is landscape-only. (Or remove
   iPad support in Signing & Capabilities → Supported Destinations if
   you'd rather only ship iPhone for now.) Take these on a simulator or device running the
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
10. **App Privacy ("nutrition label")**: in App Store Connect → App
    Privacy, choose **"Data Not Collected"**. True for this app: no
    accounts, no analytics, progress stays on the device; the only
    network requests (album-art lookup by song title, piano-sample
    audio download) send nothing about the user. Matches
    `PrivacyInfo.xcprivacy`.
11. **Answer the age rating questionnaire** using the table in
    `ios/APP_STORE_LISTING.md` — every category is "None"/"No", which
    should land on the lowest rating (4+).
12. **Export compliance**: now pre-answered by
    `ITSAppUsesNonExemptEncryption = false` in `Info.plist`, so this
    usually won't be asked. If it is: when Xcode/App Store Connect asks
    "Does your app use encryption?", the standard answer for an app that
    only uses HTTPS (no custom/proprietary encryption) is **"No"** — or
    more precisely, if asked the follow-up, this app qualifies for the
    standard exemption for apps that only use encryption exempt under
    category 5D002 (HTTPS/TLS using only the OS's standard libraries,
    which is exactly what this app does — it's a common point of
    confusion, but the answer is the same simple "no custom encryption"
    answer the vast majority of apps give).
13. **App Review notes**: there's no login, so no demo account is needed.
    Worth adding one line for the reviewer: "Camera and microphone are
    optional — used only by Practice → Camera Overlay / Ear Check and the
    lessons' Tune this note button; everything else works without them."
14. **Upload a build**: back in Xcode, **Product → Archive**, then use
    the Organizer window's **Distribute App** flow to upload to App
    Store Connect.
15. **Attach the build, add screenshots, submit for review**: in App
    Store Connect, select the uploaded build on the app version page,
    upload the screenshots from step 6, and submit for review.
16. **After any future web app changes**: run `npx cap sync` again
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
