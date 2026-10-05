#!/bin/sh
# Copies the static site into www/ — the folder Capacitor bundles into
# the iOS app. Real copies, not symlinks: Capacitor copies symlinks
# verbatim, and inside the app bundle "../js" etc. point at nothing, so
# the app would load a blank page. Run via `npm run cap:sync`.
set -e
cd "$(dirname "$0")/.."
rm -rf www
mkdir www
cp -R index.html privacy.html reference.html manifest.webmanifest sw.js css js assets www/
echo "www/ built: $(find www -type f | wc -l | tr -d ' ') files"
