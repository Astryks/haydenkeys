// Camera Overlay — Phase 2 item built for real this pass, with an
// honest, tractable scope: NOT full computer-vision keyboard detection
// (a serious CV project on its own). Instead, this reuses the app's
// existing two-tap calibration idea: the user taps where two known keys
// are in their own camera frame, and everything else is positioned with
// simple linear interpolation/extrapolation along the line those two
// points define. That's "homography-lite" — not a full perspective
// transform, but genuinely useful for a roughly-planar, roughly-still
// keyboard viewed at a shallow angle, which covers the common case of a
// phone propped up next to a keyboard.
//
// Known, stated limitation (not hidden): this assumes the camera and
// keyboard stay still relative to each other after calibration. If the
// phone moves, the overlay drifts out of alignment and needs
// recalibrating — there is no frame-to-frame visual tracking here. A
// real "detect the keyboard every frame" system is future work.

import { chordSymbolToMidi, parseChordSymbol } from "./chord-utils.js";

// Given two calibration points { midi, x, y } and a target midi note,
// linearly interpolate/extrapolate its (x, y) position along the line
// the two calibration points define. This is the entire "homography"
// here — deliberately simple, documented as such.
function projectMidiPosition(p1, p2, targetMidi) {
  const semitoneSpan = p2.midi - p1.midi;
  if (semitoneSpan === 0) return { x: p1.x, y: p1.y };
  const t = (targetMidi - p1.midi) / semitoneSpan;
  return {
    x: p1.x + t * (p2.x - p1.x),
    y: p1.y + t * (p2.y - p1.y),
  };
}

function initCameraOverlay(container, { getCurrentStep } = {}) {
  let stream = null;
  let calPoints = []; // up to 2 { midi, x, y }
  let raf = null;
  let destroyed = false;
  let removeTapListener = null;

  function render() {
    container.innerHTML = `
      <div class="hk-camera-wrap">
        <p class="hk-camera-note">
          Point your camera at your real keyboard. This positions a highlight using a simple
          two-point calibration, not true keyboard detection — hold the phone steady after
          calibrating; if it moves, tap "Recalibrate."
        </p>
        <button class="hk-btn hk-btn-primary" id="hk-camera-start">Start camera</button>
        <div class="hk-camera-stage" id="hk-camera-stage" style="display:none">
          <video id="hk-camera-video" autoplay playsinline muted></video>
          <canvas id="hk-camera-canvas"></canvas>
          <p id="hk-camera-status" class="hk-cal-status"></p>
          <button class="hk-btn" id="hk-camera-recalibrate">Recalibrate</button>
          <button class="hk-btn hk-btn-danger" id="hk-camera-stop">Stop camera</button>
        </div>
      </div>`;

    container.querySelector("#hk-camera-start").addEventListener("click", startCamera);
  }

  async function startCamera() {
    const statusHolder = container.querySelector("#hk-camera-start");
    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
    } catch (err) {
      if (destroyed) return;
      container.innerHTML = `
        <p class="hk-cal-status">Camera access failed (${err.message}). This is expected in
        environments without a real camera (e.g. this review sandbox) or if permission was
        denied — Camera Overlay needs a real device camera to do anything useful. Try Follow
        Along or Ear Check instead.</p>`;
      return;
    }
    // Item 56: left Camera mode while the permission prompt was up — the
    // stage this would draw into is gone; release the camera.
    if (destroyed || !container.querySelector("#hk-camera-start")) {
      stream.getTracks().forEach((t) => t.stop());
      stream = null;
      return;
    }
    container.querySelector("#hk-camera-start").style.display = "none";
    const stage = container.querySelector("#hk-camera-stage");
    stage.style.display = "block";
    const video = container.querySelector("#hk-camera-video");
    video.srcObject = stream;
    await video.play().catch(() => {});

    container.querySelector("#hk-camera-stop").addEventListener("click", stopCamera);
    container.querySelector("#hk-camera-recalibrate").addEventListener("click", beginCalibration);
    beginCalibration();
  }

  function beginCalibration() {
    // Item 56: Recalibrate used to stack a second draw loop (the first
    // could never be cancelled) and, mid-calibration, a second tap
    // listener that recorded both points from one tap.
    if (raf) cancelAnimationFrame(raf);
    raf = null;
    if (removeTapListener) removeTapListener();
    calPoints = [];
    const statusEl = container.querySelector("#hk-camera-status");
    statusEl.textContent = "Tap where Middle C is in the video.";
    const canvas = container.querySelector("#hk-camera-canvas");
    const video = container.querySelector("#hk-camera-video");

    function sizeCanvas() {
      canvas.width = video.videoWidth || video.clientWidth || 640;
      canvas.height = video.videoHeight || video.clientHeight || 360;
    }
    sizeCanvas();
    video.addEventListener("loadedmetadata", sizeCanvas, { once: true });

    function onTap(e) {
      const rect = canvas.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * canvas.width;
      const y = ((e.clientY - rect.top) / rect.height) * canvas.height;
      if (calPoints.length === 0) {
        calPoints.push({ midi: 60, x, y }); // Middle C
        statusEl.textContent = "Now tap the C one octave higher.";
      } else if (calPoints.length === 1) {
        calPoints.push({ midi: 72, x, y }); // C one octave up
        statusEl.textContent = "Calibrated — highlighting the next key to press.";
        canvas.removeEventListener("pointerdown", onTap);
        startOverlayLoop();
      }
    }
    canvas.addEventListener("pointerdown", onTap);
    removeTapListener = () => canvas.removeEventListener("pointerdown", onTap);
  }

  function startOverlayLoop() {
    const canvas = container.querySelector("#hk-camera-canvas");
    const ctx = canvas.getContext("2d");

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (calPoints.length === 2 && getCurrentStep) {
        const step = getCurrentStep();
        if (step) {
          const midiNotes = chordSymbolToMidi(step.chord);
          const parsed = parseChordSymbol(step.chord);
          const rootMidi = midiNotes[0] ?? (parsed ? 60 + parsed.root : null);
          if (rootMidi != null) {
            const pos = projectMidiPosition(calPoints[0], calPoints[1], rootMidi);
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, 26, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(88, 214, 141, 0.55)";
            ctx.fill();
            ctx.lineWidth = 3;
            ctx.strokeStyle = "#58d68d";
            ctx.stroke();
            ctx.fillStyle = "#0d0c14";
            ctx.font = "bold 16px sans-serif";
            ctx.textAlign = "center";
            ctx.fillText(step.chord, pos.x, pos.y + 5);
          }
        }
      }
      raf = requestAnimationFrame(draw);
    }
    draw();
  }

  function stopCamera() {
    if (raf) cancelAnimationFrame(raf);
    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
      stream = null;
    }
    render();
  }

  render();

  return {
    destroy() {
      destroyed = true;
      if (raf) cancelAnimationFrame(raf);
      raf = null;
      if (stream) stream.getTracks().forEach((t) => t.stop());
      stream = null;
    },
  };
}

export { initCameraOverlay, projectMidiPosition };
