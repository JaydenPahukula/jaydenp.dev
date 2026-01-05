import { COLORS } from "src/background/colors";
import {
  iLerp,
  initCtx,
  lerp,
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
const MAX_SIZE = 1;
const MIN_SIZE = 1;
const BODY_WIDTH = 95; // px at widest point
const BODY_LENGTH = 300; // px tip to tail
const BODY: [number, number][] = [
  // [relative width, relative length]
  [0.0, 0.0],
  [0.3, 0.25],
  [0.46, 0.5],
  [0.57, 0.5],
  [0.73, 1.0],
  [0.86, 1.0],
  [0.97, 1.5],
  [1.0, 1.5],
  [1.0, 1.5],
  [0.98, 1.5],
  [0.94, 1.5],
  [0.86, 1.5],
  [0.76, 1.0],
  [0.69, 1.0],
  [0.59, 1.0],
  [0.5, 1.0],
  [0.41, 1.0],
  [0.32, 1.0],
  [0.21, 1.0],
  [0.12, 1.0],
  [0.0, 1.0],
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
const SPEED_DECAY = 0.8; // decay factor per second
const SPEED_MIN = 1.5; // px per frame
const SPEED_NIBBLE = 1.55;
const SPEED_SLOW = 2.5;
const SPEED_MAX = 8.0;
const BOOST_CHANCE = 0.4; // probability per second (when < SPEED_SLOW)
const BOOST_POWER = 7; // px per second per second
const BOOST_SECONDS_MIN = 0.4;
const BOOST_SECONDS_MAX = 1;
const TURN_CHANCE = 0.0015;
// const TURN_ANGLE_MAX =

const OSC_PERIOD_MIN = 3; // oscillation period (seconds) when speed = SPEED_MIN
const OSC_PERIOD_MAX = 3; // oscillation period (seconds) when speed = SPEED_MAX
const OSC_AMPLITUDE_MIN = 2;
const OSC_AMPLITUDE_MAX = 2;
const SPEED_SWING_THRESH = 1.0;
const FIN_PHASE_SPEED = 0.04;
// ===================================================

const PI2 = 2 * Math.PI;
const OSC_FREQ_MIN = PI2 / OSC_PERIOD_MIN;
const OSC_FREQ_MAX = PI2 / OSC_PERIOD_MAX;
const NUM_SEGMENTS = BODY.length;
const relativeBodyLen = BODY.reduce((x, body) => x + body[1], 0);
for (let i = 0; i < NUM_SEGMENTS; i++) {
  BODY[i][0] *= BODY_WIDTH / 2;
  BODY[i][1] *= BODY_LENGTH / relativeBodyLen;
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
  private pos = new Vector();
  private vel = new Vector();
  private dir = new Vector();
  private boost = 0;
  private turnForce = 0;
  private phase = 0;
  private turnDirection = 0;

  private body = Array(NUM_SEGMENTS)
    .fill(null)
    .map(() => new Vector());

  private size = randInt(MIN_SIZE, MAX_SIZE);

  private primary_color: string;
  private secondary_color: string;
  // each spot is a list of points [x,y][] where x is the segment index and y (in [-1,1]) is the position across the body
  private spots: [number, number][][];

  constructor() {
    this.pos.x = randInt(-MARGIN, canvas.width + MARGIN);
    this.pos.y = randInt(-MARGIN, canvas.height + MARGIN);
    this.pos.x = 500;
    this.pos.y = 500;

    const angle = randFloat(-Math.PI, Math.PI);
    this.vel.x = SPEED_MIN * Math.cos(angle);
    this.vel.y = SPEED_MIN * Math.sin(angle);

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
        const x = randInt(2, NUM_SEGMENTS);
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
    // if (this.turnDirection)
    //     this.applyTurn();

    let speed = this.vel.magnitude();

    // apply speed decay
    speed *= Math.pow(SPEED_DECAY, dt);
    if (speed < SPEED_MIN) speed = SPEED_MIN;

    // apply boost
    if (this.boost > 0) {
      this.boost -= dt;
      speed += BOOST_POWER * dt;
      if (speed > SPEED_MAX) speed = SPEED_MAX;
    }

    // idk what this is
    this.dir = this.vel.copy().normalize();
    this.vel = this.dir.copy();

    if (speed < SPEED_SLOW) {
      if (this.boost <= 0 && randFloat(0, 1) < BOOST_CHANCE * dt) {
        // start new boost
        this.boost = randFloat(BOOST_SECONDS_MIN, BOOST_SECONDS_MAX);
        console.log("BOOST!!! (for", this.boost, "seconds)");
      } else if (this.turnForce === 0 && randFloat(0, 1) < TURN_CHANCE * dt) {
        // const angle = this.direction.angle() + Math.PI + this.TURN_AMPLITUDE * (random.getFloat() * 2 - 1);
        // this.turnDirection.fromAngle(angle);
        // this.turnForce = this.TURN_FORCE;
      } else if (speed < SPEED_NIBBLE) {
        // if (--this.nibbleTime === 0) {
        //   this.nibbleTime =
        //     this.NIBBLE_TIME_MIN +
        //     Math.floor(
        //       (this.NIBBLE_TIME_MAX - this.NIBBLE_TIME_MIN) * random.getFloat(),
        //     );
        //   // WATER FLARE
        //   const turnForce =
        //     2 * (random.getFloat() - 0.5) * this.NIBBLE_TURN_FORCE;
        //   this.velocity.x += this.direction.y * turnForce;
        //   this.velocity.y -= this.direction.x * turnForce;
        //   this.velocity.normalize();
      }
    }

    this.vel.normalize(speed);
    this.pos.add(this.vel);
    // wrap around canvas
    if (this.pos.x < -MARGIN) this.pos.x = canvas.width + MARGIN;
    if (this.pos.x > canvas.width + MARGIN) this.pos.x = -MARGIN;
    if (this.pos.y < -MARGIN) this.pos.y = canvas.height + MARGIN;
    if (this.pos.y > canvas.height + MARGIN) this.pos.y = -MARGIN;

    // body direction
    let dir = this.dir
      .copy()
      .normalize(-1)
      .rotate(Math.cos(this.phase) * (speed - 1.0) * 0.2);
    console.log(
      Math.cos(this.phase) *
        lerp(
          iLerp(speed, SPEED_MIN, SPEED_MAX),
          OSC_AMPLITUDE_MIN,
          OSC_AMPLITUDE_MAX,
        ),
    );

    this.body[0] = this.pos;
    for (let i = 1; i < this.body.length; ++i) {
      const segLen = BODY[i][1] * this.size;
      const diff = this.body[i].copy().subtract(this.body[i - 1]);

      const spring = 0.4;
      const targetDiff = this.body[i - 1]
        .copy()
        .add(dir.copy().scale(segLen))
        .subtract(this.body[i]);

      // if (i === 1) {
      //   console.log(this.vel);
      //   diff,
      //   targetDiff
      // }
      const dirPrev = dir.copy();
      dir = diff.copy().normalize();

      diff.add(targetDiff.scale(spring));

      this.body[i] = this.body[i - 1].copy().add(diff.normalize(segLen));

      // update fin
    }

    // this.tail.update(this.spine);
    this.phase +=
      lerp(iLerp(speed, SPEED_MIN, SPEED_MAX), OSC_FREQ_MIN, OSC_FREQ_MAX) * dt;
    if (this.phase > PI2)
      console.log("===========================================", Date.now());
    if (this.phase > PI2) this.phase -= PI2;
    // this.finPhase = clampAngle(this.finPhase + FIN_PHASE_SPEED * dt);
  }

  // draw the fish
  draw() {
    const orths = [new Vector(), new Vector()];
    for (let i = 2; i < NUM_SEGMENTS; i++) {
      const diff = this.body[i].copy().subtract(this.body[i - 1]);
      orths.push(diff.getOrth().normalize());
    }
    // draw body
    ctx.fillStyle = this.primary_color;
    shadowCtx.fillStyle = COLORS.SHADOW;
    bothBeginPath(this.body[1]);
    for (let i = 2; i < NUM_SEGMENTS; i++) {
      bothLineTo(
        orths[i]
          .copy()
          .scale(BODY[i][0] * this.size)
          .add(this.body[i]),
      );
    }
    for (let i = NUM_SEGMENTS - 2; i > 1; i--) {
      bothLineTo(
        orths[i]
          .copy()
          .scale(-1 * BODY[i][0] * this.size)
          .add(this.body[i]),
      );
    }
    bothLineTo(this.body[1]);
    bothFill();

    if (this.primary_color != this.secondary_color) {
      // draw spots
      ctx.fillStyle = this.secondary_color;
      for (const spot of this.spots) {
        const path = spot.map(([x, y]) => {
          return orths[x]
            .copy()
            .scale(BODY[x][0] * this.size * y)
            .add(this.body[x]);
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
    // ctx.strokeStyle = this.primary_color;
    // ctx.lineCap = "round";
    // shadowCtx.strokeStyle = COLORS.SHADOW;
    // let i = 2;
    // while (i < NUM_SEGMENTS && BODY[i][3] === 0) i++;
    // bothBeginPath(this.body[i]);
    // ctx.lineWidth = BODY[i][3];
    // shadowCtx.lineWidth = BODY[i][3];
    // i++;
    // for (; i < NUM_SEGMENTS; i++) {
    //   bothLineTo(this.body[i]);
    //   bothStroke();
    //   ctx.lineWidth = BODY[i][3];
    //   shadowCtx.lineWidth = BODY[i][3];
    // }

    // ctx.strokeStyle = "magenta";
    // ctx.lineWidth = 4;
    // const pos = this.body[0];
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
    //   ctx.fillRect(this.body[i].x, this.body[i].y, 3, 3);
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
