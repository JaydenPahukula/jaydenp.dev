import { COLORS } from "src/background/colors";
import {
  initCtx,
  randBool,
  randFloat,
  randInt,
  Vector,
} from "src/background/util.ts";

// ================= FISH PARAMETERS =================
const MARGIN = 150;
const FISH_DENSITY = 0.00001; // fish per pixel
const MAX_NUM_FISH = 1;
// body
const MAX_SIZE = 50;
const MIN_SIZE = 20;
const BODY_WIDTH = 120;
const SEGMENT_LENGTH = 27;
const BODY_PROFILE = [
  0.0, 0.45, 0.65, 0.76, 0.85, 0.92, 0.96, 0.98, 1.0, 1.0, 1.0, 0.99, 0.98,
  0.97, 0.96, 0.945, 0.93, 0.9, 0.87, 0.835, 0.8, 0.75, 0.7, 0.645, 0.59, 0.545,
  0.5, 0.455, 0.41, 0.365, 0.32, 0.26, 0.21, 0.16, 0.12, 0.075, 0.05, 0.02, 0.0,
];
// design
const MIN_NUM_SPOTS = 4;
const MAX_NUM_SPOTS = 8;
const MIN_SPOT_WIDTH = 3;
const MAX_SPOT_WIDTH = 6;
const MIN_SPOT_DEPTH = 0.2;
const MAX_SPOT_DEPTH = 2.4;
// shadow
const SHADOW_OFFSET_X = 6;
const SHADOW_OFFSET_Y = 6;
// movement and behavior
const MAX_VEL = 5;
const MAX_TURN_ANGLE = Math.PI / 3; //rads
const BEHAVIOR_CHANGE_PROB = 60; // 1 / X per frame
// ===================================================

let mouseX = 0;
let mouseY = 0;
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

const [canvas, ctx] = initCtx("canvas-fish");
const [shadowCanvas, shadowCtx] = initCtx("canvas-fish-shadows");
shadowCtx.fillStyle = COLORS.SHADOW;

function bothBeginPath(v: Vector) {
  ctx.beginPath();
  ctx.moveTo(v.x, v.y);
  shadowCtx.beginPath();
  shadowCtx.moveTo(v.x + SHADOW_OFFSET_X, v.y + SHADOW_OFFSET_Y);
}
function bothLineTo(v: Vector) {
  ctx.lineTo(v.x, v.y);
  shadowCtx.lineTo(v.x + SHADOW_OFFSET_X, v.y + SHADOW_OFFSET_Y);
}
function bothEndPath() {
  ctx.closePath();
  ctx.fill();
  shadowCtx.closePath();
  shadowCtx.fill();
}

const NUM_FISH = Math.min(
  Math.floor(canvas.width * canvas.height * FISH_DENSITY),
  MAX_NUM_FISH,
);

const NUM_SEGMENTS = BODY_PROFILE.length;

class Fish {
  private pos = Array(NUM_SEGMENTS)
    .fill(null)
    .map(() => new Vector());
  private vel = new Vector();
  private acc = new Vector();

  private size = randInt(MIN_SIZE, MAX_SIZE) / 100;

  private primary_color: string;
  private secondary_color: string;

  // each spot is a list of points [x,y][] where x is the segment index and y (in [-1,1]) is the position across the body
  private spots: [number, number][][];

  private behavior = randInt(0, 6);

  constructor() {
    this.pos[0].x = randInt(-MARGIN, canvas.width + MARGIN);
    this.pos[0].y = randInt(-MARGIN, canvas.height + MARGIN);

    const angle = randFloat(-Math.PI, Math.PI);
    this.vel.x = MAX_VEL * Math.cos(angle);
    this.vel.y = MAX_VEL * Math.sin(angle);

    const c1 = randInt(0, COLORS.FISH.length);
    let c2 = randInt(0, COLORS.FISH.length);
    while (c1 === c2) c2 = randInt(0, COLORS.FISH.length);
    this.primary_color = COLORS.FISH[c1];
    this.secondary_color = COLORS.FISH[c2];

    // add spots
    const num_spots = randInt(MIN_NUM_SPOTS, MAX_NUM_SPOTS + 1);
    this.spots = Array(num_spots)
      .fill(null)
      .map(() => {
        let spot: [number, number][] = [];
        const x = randInt(2, NUM_SEGMENTS - 1);
        const w = randInt(MIN_SPOT_WIDTH, MAX_SPOT_WIDTH + 1);
        const h = randInt(MIN_SPOT_DEPTH, MAX_SPOT_DEPTH + 1);
        for (
          let x1 = Math.max(0, x - w);
          x1 <= Math.min(NUM_SEGMENTS - 1, x + w);
          x1++
        ) {
          spot.push([x1, -1]);
        }
        for (
          let x1 = Math.min(NUM_SEGMENTS - 1, x + w - 1);
          x1 > Math.max(0, x - w);
          x1--
        ) {
          spot.push([
            x1,
            Math.min(
              1,
              Math.max(-1, (1 - Math.pow(x1 - x, 2) / (w * w)) * h - 1),
            ),
          ]);
        }
        if (randBool()) spot = spot.map(([x, y]) => [x, -y]); // flip some spots
        return spot;
      });
  }

  move(dt: number) {
    // // random chance to change behavior
    // if (randInt(0, RANDOM_TURN_PROB) === 0) this.behavior = randInt(0, 6);
    // requestAnimationFrame;
    // // apply oscillations
    // let oscillation =
    //   Math.sin(global.t / this.oscillation_period + this.oscillation_offset) *
    //   this.oscillation_amplitude;
    // this.angle += oscillation;
    // // apply random turn
    // if (randInt(0, Math.floor(1 / this.random_turn_prob)) == 0) {
    //   let randomTurn = randFloat(-2 * MAX_TURN_ANGLE, 2 * MAX_TURN_ANGLE);
    //   this.angle += randomTurn;
    // }
    // this.angle = vec.boundAngle(this.angle);
    // // clamp turn angle
    // let turn = vec.boundAngle(this.angle - this.vel.direction()) * TURN_SPEED;
    // turn = Math.min(turn, MAX_TURN_ANGLE);
    // turn = Math.max(turn, -MAX_TURN_ANGLE);

    // // turn to velocity
    // this.vel = vec.rotated(this.vel, turn);
    // // turns produce thrust
    // let thrust = (1 - Math.pow(2, -Math.abs(turn))) * THRUST_STRENGTH; //this.thrust_strength;
    // this.vel = vec.scale(this.vel, 1 + thrust);
    // // resistance
    // this.vel = vec.scale(this.vel, 1 - RESISTANCE_VAL * this.speed_factor);
    // // bound velocity
    // if (this.vel.magnitude() > MAX_VEL) {
    //   this.vel = vec.scale(this.vel, MAX_VEL / this.vel.magnitude());
    // } else if (this.vel.magnitude() < MIN_VEL) {
    //   this.vel = vec.scale(this.vel, MIN_VEL / this.vel.magnitude());
    // }

    // // update position (and apply speed factor)
    // this.pos = vec.add(this.pos, vec.scale(this.vel, this.speed_factor));
    // // wrap around canvas
    // if (this.pos.x < -MARGIN) this.pos.x = canvas.width + MARGIN;
    // if (this.pos.x > canvas.width + MARGIN) this.pos.x = -MARGIN;
    // if (this.pos.y < -MARGIN) this.pos.y = canvas.height + MARGIN;
    // if (this.pos.y > canvas.height + MARGIN) this.pos.y = -MARGIN;

    this.pos[0].x = mouseX;
    this.pos[0].y = mouseY;
    // move the rest of the body
    const segLen = SEGMENT_LENGTH * this.size;
    // console.log(segLen);
    // console.log(this.pos[0].x, this.pos[0].y, this.pos[2].x, this.pos[2].y);
    for (let i = 1; i < NUM_SEGMENTS; i++) {
      // pull next body segment along (clamp distance to be <= this.segment_length)
      let diff = this.pos[i].copy().subtract(this.pos[i - 1]);
      if (diff.magnitude() > segLen) {
        this.pos[i] = this.pos[i - 1]
          .copy()
          .add(diff.normalize().scale(segLen));
      }
    }
  }

  // draw the fish
  draw() {
    const orths = [new Vector()];
    for (let i = 1; i < NUM_SEGMENTS; i++) {
      const diff = this.pos[i].copy().subtract(this.pos[i - 1]);
      orths.push(diff.getOrth().normalize());
    }
    // draw body
    ctx.fillStyle = this.primary_color;
    bothBeginPath(this.pos[0]);
    for (let i = 1; i < NUM_SEGMENTS; i++) {
      bothLineTo(
        orths[i]
          .copy()
          .scale(BODY_PROFILE[i] * this.size * BODY_WIDTH)
          .add(this.pos[i]),
      );
    }
    for (let i = NUM_SEGMENTS - 2; i > 0; i--) {
      bothLineTo(
        orths[i]
          .copy()
          .scale(-1 * BODY_PROFILE[i] * this.size * BODY_WIDTH)
          .add(this.pos[i]),
      );
    }
    bothEndPath();

    if (this.primary_color != this.secondary_color) {
      // draw spots
      ctx.fillStyle = this.secondary_color;
      for (const spot of this.spots) {
        const path = spot.map(([x, y]) => {
          return orths[x]
            .copy()
            .scale(BODY_PROFILE[x] * this.size * BODY_WIDTH * y)
            .add(this.pos[x]);
        });
        ctx.beginPath();
        ctx.moveTo(path[0].x, path[0].y);
        for (let i = 1; i < path.length; i++) {
          ctx.lineTo(path[i].x, path[i].y);
        }
        ctx.closePath();
        ctx.fill();
      }
    }
  }
}

const fishies: Fish[] = [];
for (let i = 0; i < NUM_FISH; i++) {
  fishies.push(new Fish());
}

export function updateFish(deltaTime: number) {
  fishies.forEach((fish) => fish.move(deltaTime));
}

export function drawFish() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  shadowCtx.clearRect(0, 0, shadowCanvas.width, shadowCanvas.height);
  fishies.forEach((fish) => fish.draw());
}
