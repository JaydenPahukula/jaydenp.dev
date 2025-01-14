import { Fish } from "./Fish.js";
import { global } from "./globals.js";
import { LilyPad } from "./LilyPad.js";

const FISH_DENSITY = 0.00001; // fish per pixel
const MAX_NUM_FISH = 130;
const LILY_PAD_DENSITY = 0.000004; // lily pads per pixel
const MAX_NUM_LILY_PADS = 50;

const BACKGROUND_COLOR = "#278eab";

let fishies = [];
let lily_pads = [];

export function setup(sketch, width, height) {
  // initialize canvas
  global.canvas_width = document.body.clientWidth * 1.02;
  global.canvas_height = document.body.scrollHeight;

  sketch.frameRate(global.FPS);
  sketch.angleMode("DEGREES");

  // create fish
  let num_fish = Math.min(
    Math.floor(global.canvas_width * global.canvas_height * FISH_DENSITY),
    MAX_NUM_FISH,
  );
  for (let i = 0; i < num_fish; i++) {
    fishies.push(new Fish());
  }
  // create lily pads
  let num_lily_pads = Math.min(
    Math.floor(global.canvas_width * global.canvas_height * LILY_PAD_DENSITY),
    MAX_NUM_LILY_PADS,
  );
  for (let i = 0; i < num_lily_pads; i++) {
    lily_pads.push(new LilyPad(lily_pads));
  }
}

export function resize(sketch, width, height) {
  global.canvas_width = width;
  global.canvas_height = height;
  // create more lily pads
  let new_num_lily_pads = Math.min(
    Math.floor(global.canvas_width * global.canvas_height * LILY_PAD_DENSITY),
    MAX_NUM_LILY_PADS,
  );
  for (let i = lily_pads.length; i < new_num_lily_pads; i++) {
    lily_pads.push(new LilyPad(lily_pads));
  }
}

export function draw(sketch) {
  sketch.background(BACKGROUND_COLOR);

  // move fish
  for (let i = 0; i < fishies.length; i++) fishies[i].move();

  // draw shadows
  for (let i = 0; i < fishies.length; i++) fishies[i].drawShadow(sketch);
  for (let i = 0; i < lily_pads.length; i++) lily_pads[i].drawShadow(sketch);

  // draw fish
  for (let i = 0; i < fishies.length; i++) fishies[i].draw(sketch);
  // draw lily pads
  for (let i = 0; i < lily_pads.length; i++) lily_pads[i].draw(sketch);

  global.t++;
}
