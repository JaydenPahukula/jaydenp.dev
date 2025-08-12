import { COLORS } from "src/background/colors";
import { initCtx, randFloat, randInt } from "src/background/util";

// =============== LILY PAD PARAMETERS ===============
const LILY_PAD_DENSITY = 0.0000015; // lily pads per pixel
const MAX_LILY_PADS = 30;
const MIN_RADIUS = 120;
const MAX_RADIUS = 260;
const BITE_ANGLE = 0.35;
const SHADOW_OFFSET_X = 15;
const SHADOW_OFFSET_Y = 15;
// ===================================================

const [canvas, ctx] = initCtx("canvas-lilypads");
const [_, shadowCtx] = initCtx("canvas-lilypad-shadows");

const NUM_LILY_PADS = Math.min(
  Math.floor(canvas.width * canvas.height * LILY_PAD_DENSITY),
  MAX_LILY_PADS,
);

const lilypads: [number, number, number, number][] = [];
for (let i = 0; i < 1000; i++) {
  // try to place a lily pad
  const r = randInt(MIN_RADIUS, MAX_RADIUS);

  const margin = r * 0.5;
  const [x, y] = [
    randInt(-margin, canvas.width + margin),
    randInt(-margin, canvas.height + margin),
  ];

  // check not overlapping
  let overlapping = false;
  for (const [r1, x1, y1] of lilypads) {
    if (Math.hypot(x - x1, y - y1) < r + r1) {
      overlapping = true;
      break;
    }
  }
  if (!overlapping) {
    const angle = randFloat(0, 2 * Math.PI);
    lilypads.push([r, x, y, angle]);
  }

  if (lilypads.length >= NUM_LILY_PADS) break;
}

export function drawLilyPads() {
  lilypads.forEach(([r, x, y, a]) => {
    shadowCtx.fillStyle = COLORS.SHADOW;
    shadowCtx.beginPath();
    shadowCtx.arc(
      x + SHADOW_OFFSET_X,
      y + SHADOW_OFFSET_Y,
      r,
      a,
      a - BITE_ANGLE,
    );
    shadowCtx.lineTo(x + SHADOW_OFFSET_X, y + SHADOW_OFFSET_Y);
    shadowCtx.fill();

    ctx.fillStyle = COLORS.LILY_PAD;
    ctx.beginPath();
    ctx.arc(x, y, r, a, a - BITE_ANGLE);
    ctx.lineTo(x, y);
    ctx.fill();
  });
}
