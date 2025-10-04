import { drawFish, updateFish } from "src/background/fish";
import { drawLilyPads } from "src/background/lilypads";

const FPS = 30;

// draw static stuff
// drawLilyPads();

// animate dynamic stuff
const FRAME_PERIOD_MS = 1000 / FPS;
let lastFrame = Date.now();
function animate() {
  requestAnimationFrame(animate);
  const now = Date.now();
  const elapsed = now - lastFrame;
  if (elapsed >= FRAME_PERIOD_MS) {
    lastFrame = now;
    updateFish(elapsed / 1000);
    drawFish();
  }
}
requestAnimationFrame(animate);

window.addEventListener("resize", () => {
  // redraw stuff because the canvas clears
  drawLilyPads();
  drawFish();
});
