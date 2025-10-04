import { COLORS } from "src/background/colors";
import {
  initCtx,
  randBool,
  randFloat,
  randInt,
  Vector,
} from "src/background/util.ts";

// ================= FISH PARAMETERS =================
const MARGIN = 0; //150;
const FISH_DENSITY = 0.000002; // fish per pixel
const MAX_NUM_FISH = 1;
// body
const MAX_SIZE = 1.5;
const MIN_SIZE = 1;
const BODY_WIDTH = 95; // at widest point
const BODY_SEG_LEN_SCALE = 17;
const BODY: [number, number, number, number][] = [
  // [body width, segment length (relative), movement, tail width]
  [0.0, 0, 0, 0],
  [0.0, 0, 0, 0],
  [0.3, 0.25, 0, 0],
  [0.46, 0.5, 0, 0],
  [0.57, 0.5, 0, 0],
  [0.73, 1, 0, 0],
  [0.86, 1, 0, 0],
  [0.97, 1.5, 0, 0],
  [1.0, 1.5, 0, 0],
  [1.0, 1.5, 0, 0],
  [0.98, 1.5, 0.5, 0],
  [0.94, 1.5, 1, 0],
  [0.86, 1.5, 1, 0],
  [0.76, 1, 2, 0],
  [0.69, 1, 2, 0],
  [0.59, 1, 3, 0],
  [0.5, 1, 3, 0],
  [0.41, 1, 0, 0],
  [0.32, 1, 0, 0],
  [0.21, 1, 0, 10],
  [0.12, 1, 0, 10],
  [0, 1, 0, 9],
  [0.0, 0.5, 0, 8],
  [0.0, 0.5, 0, 7],
  [0.0, 0.5, 0, 6],
  [0.0, 0.5, 0, 5],
  [0.0, 0.5, 0, 4],
  [0.0, 0.5, 0, 4],
];
// design
const MIN_NUM_SPOTS = 4;
const MAX_NUM_SPOTS = 8;
const MIN_SPOT_WIDTH = 1;
const MAX_SPOT_WIDTH = 3;
const MIN_SPOT_DEPTH = 0.2;
const MAX_SPOT_DEPTH = 2.4;
// shadow
const SHADOW_OFFSET_X = 6;
const SHADOW_OFFSET_Y = 6;
// movement
const VEL_CONST = 2;
const MIN_VEL = 25; // px per second
const RESISTANCE = 0.35;
const TAIL_CURVE = 0.02;
const TAIL_SPEED = 0.3; // seconds
const TURN_THRUST = 35;
const THRUST_RESISTANCE = 0.23;
const MIN_TURN_ANGLE = 0.5; // rads
const MAX_TURN_ANGLE = 1.1; // rads
// behavior
const MIN_S_BETWEEN_TURNS = 0.4;
const MAX_S_BETWEEN_TURNS = 2;
// ===================================================

const NUM_SEGMENTS = BODY.length;
for (let i = 0; i < NUM_SEGMENTS; i++) {
  BODY[i][0] *= BODY_WIDTH / 2;
  BODY[i][1] *= BODY_SEG_LEN_SCALE;
  BODY[i][2] *= TAIL_CURVE;
}
let BODY_END = NUM_SEGMENTS - 1; // where the body ends so we don't put spots after the body
for (let i = NUM_SEGMENTS - 1; i > 0; i--) {
  if (BODY[i][0] !== 0) {
    BODY_END = i;
    break;
  }
}

const [canvas, ctx] = initCtx("canvas-fish");
const [shadowCanvas, shadowCtx] = initCtx("canvas-fish-shadows");

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
function bothStroke() {
  ctx.stroke();
  shadowCtx.stroke();
}
function bothFill() {
  ctx.fill();
  shadowCtx.fill();
}

class Fish {
  private pos = Array(NUM_SEGMENTS)
    .fill(null)
    .map(() => new Vector());
  private vel = new Vector();
  private acc = new Vector();

  private size = randInt(MIN_SIZE, MAX_SIZE);

  private primary_color: string;
  private secondary_color: string;

  // each spot is a list of points [x,y][] where x is the segment index and y (in [-1,1]) is the position across the body
  private spots: [number, number][][];

  private s_since_last_turn = 0;
  private next_turn = 0;
  private turn_angle = 0;
  private turn_direction = 1;

  constructor() {
    this.pos[0].x = randInt(-MARGIN, canvas.width + MARGIN);
    this.pos[0].y = randInt(-MARGIN, canvas.height + MARGIN);
    this.pos[0].x = 500;
    this.pos[0].y = 500;

    const angle = randFloat(-Math.PI, Math.PI);
    // const angle = Math.PI / 4;
    this.vel.x = MIN_VEL * Math.cos(angle);
    this.vel.y = MIN_VEL * Math.sin(angle);

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
        const x = randInt(2, BODY_END);
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
    // turning
    this.s_since_last_turn += dt;
    if (this.s_since_last_turn >= this.next_turn) {
      this.s_since_last_turn = 0;
      this.next_turn = randFloat(MIN_S_BETWEEN_TURNS, MAX_S_BETWEEN_TURNS + 1);
      this.turn_direction = -this.turn_direction;
      this.turn_angle =
        randFloat(MIN_TURN_ANGLE, MAX_TURN_ANGLE) * this.turn_direction;
      const thrust = Math.abs(this.turn_angle) * TURN_THRUST;
      console.log("TURN");
      this.acc = new Vector(
        Math.cos(this.turn_angle),
        Math.sin(this.turn_angle),
      ).scale(thrust);
    }

    this.acc.scale(1 - THRUST_RESISTANCE);

    // apply acceleration
    this.vel.add(this.acc);
    // resistance
    this.vel.scale(Math.pow(1 - RESISTANCE, dt));
    // bound velocity
    if (this.vel.magnitude() < MIN_VEL) {
      this.vel.normalize().scale(MIN_VEL);
    }

    // update position (and apply speed factor)
    this.pos[0].add(this.vel.copy().scale(dt * VEL_CONST));
    // wrap around canvas
    if (this.pos[0].x < -MARGIN) this.pos[0].x = canvas.width + MARGIN;
    if (this.pos[0].x > canvas.width + MARGIN) this.pos[0].x = -MARGIN;
    if (this.pos[0].y < -MARGIN) this.pos[0].y = canvas.height + MARGIN;
    if (this.pos[0].y > canvas.height + MARGIN) this.pos[0].y = -MARGIN;

    // calc tail movement
    let tail_angle = 0;
    if (this.s_since_last_turn < TAIL_SPEED) {
      tail_angle = -this.turn_direction * (1 + this.turn_angle / 2);
      Math.cos(((2 * Math.PI) / TAIL_SPEED) * this.s_since_last_turn) *
        TAIL_CURVE;
      // console.log(
      //   "tail_angle:",
      //   Math.sin(((2 * Math.PI) / TAIL_SPEED) * this.s_since_last_turn),
      // );
    }
    // move the rest of the body
    let total_curve = 0;
    for (let i = 1; i < NUM_SEGMENTS; i++) {
      const diff = this.pos[i].copy().subtract(this.pos[i - 1]);
      // pull next body segment along (clamp distance to be <= this.segment_length)
      const segLen = BODY[i][1] * this.size;
      if (diff.magnitude() > segLen) {
        diff.normalize().scale(segLen);
      }
      // apply tail curve
      if (tail_angle !== 0) {
        total_curve += tail_angle * BODY[i][2];
        diff.rotate(total_curve);
      }
      this.pos[i] = this.pos[i - 1].copy().add(diff);
    }
  }

  // draw the fish
  draw() {
    const orths = [new Vector(), new Vector()];
    for (let i = 2; i < NUM_SEGMENTS; i++) {
      const diff = this.pos[i].copy().subtract(this.pos[i - 1]);
      orths.push(diff.getOrth().normalize());
    }
    // draw body
    ctx.fillStyle = this.primary_color;
    shadowCtx.fillStyle = COLORS.SHADOW;
    bothBeginPath(this.pos[1]);
    for (let i = 2; i < NUM_SEGMENTS; i++) {
      bothLineTo(
        orths[i]
          .copy()
          .scale(BODY[i][0] * this.size)
          .add(this.pos[i]),
      );
    }
    for (let i = NUM_SEGMENTS - 2; i > 1; i--) {
      bothLineTo(
        orths[i]
          .copy()
          .scale(-1 * BODY[i][0] * this.size)
          .add(this.pos[i]),
      );
    }
    bothLineTo(this.pos[1]);
    bothFill();

    if (this.primary_color != this.secondary_color) {
      // draw spots
      ctx.fillStyle = this.secondary_color;
      for (const spot of this.spots) {
        const path = spot.map(([x, y]) => {
          return orths[x]
            .copy()
            .scale(BODY[x][0] * this.size * y)
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

    // draw tail
    ctx.strokeStyle = this.primary_color;
    ctx.lineCap = "round";
    shadowCtx.strokeStyle = COLORS.SHADOW;
    let i = 2;
    while (i < NUM_SEGMENTS && BODY[i][3] === 0) i++;
    bothBeginPath(this.pos[i]);
    ctx.lineWidth = BODY[i][3];
    shadowCtx.lineWidth = BODY[i][3];
    i++;
    for (; i < NUM_SEGMENTS; i++) {
      bothLineTo(this.pos[i]);
      bothStroke();
      ctx.lineWidth = BODY[i][3];
      shadowCtx.lineWidth = BODY[i][3];
    }

    // ctx.strokeStyle = "magenta";
    // ctx.lineWidth = 4;
    // const pos = this.pos[0];
    // const vel = this.vel.copy().scale(0.5);
    // ctx.beginPath();
    // ctx.moveTo(pos.x, pos.y);
    // ctx.lineTo(pos.x + vel.x, pos.y + vel.y);
    // ctx.stroke();
    // ctx.strokeStyle = "yellow";
    // const acc = this.acc.copy().scale(10);
    // ctx.beginPath();
    // ctx.moveTo(pos.x, pos.y);
    // ctx.lineTo(pos.x + acc.x, pos.y + acc.y);
    // ctx.stroke();
    // for (let i = 0; i < NUM_SEGMENTS; i++) {
    //   ctx.fillStyle = "magenta";
    //   ctx.fillRect(this.pos[i].x, this.pos[i].y, 3, 3);
    // }
  }
}

const NUM_FISH = Math.min(
  Math.floor(canvas.width * canvas.height * FISH_DENSITY),
  MAX_NUM_FISH,
);

const fishies: Fish[] = [];
for (let i = 0; i < NUM_FISH; i++) {
  fishies.push(new Fish());
}

export function updateFish(deltaSeconds: number) {
  fishies.forEach((fish) => fish.move(deltaSeconds));
}

export function drawFish() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  shadowCtx.clearRect(0, 0, shadowCanvas.width, shadowCanvas.height);
  fishies.forEach((fish) => fish.draw());
}
