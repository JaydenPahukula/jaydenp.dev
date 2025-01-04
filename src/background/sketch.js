import p5 from "p5/lib/p5.min.js";
import { global } from "./globals.js";
import { Fish } from "./Fish.js";
import { LilyPad } from "./LilyPad.js";

const FISH_DENSITY = 0.000006; // fish per pixel
const MAX_NUM_FISH = 130;
const LILY_PAD_DENSITY = 0.000004; // lily pads per pixel
const MAX_NUM_LILY_PADS = 50;

const BACKGROUND_COLOR = "#067BB1";

const _app = new p5((sketch) => {
  let canvas;
  let fishies = [];
  let lily_pads = [];

  sketch.setup = () => {
    // initialize canvas
    global.canvas_width = document.body.clientWidth;
    global.canvas_height = document.body.scrollHeight;
    global.screen_height = document.body.clientHeight;
    global.scroll_y = 0;
    canvas = sketch
      .createCanvas(global.canvas_width, global.canvas_height)
      .parent(global.BACKGROUND_DIV_ID);
    sketch.frameRate(global.FPS);
    sketch.angleMode("DEGREES");

    // create fish
    let num_fish = Math.min(
      Math.floor(global.canvas_width * global.canvas_height * FISH_DENSITY),
      MAX_NUM_FISH
    );
    for (let i = 0; i < num_fish; i++) {
      fishies.push(new Fish());
    }
    // create lily pads
    let num_lily_pads = Math.min(
      Math.floor(global.canvas_width * global.canvas_height * LILY_PAD_DENSITY),
      MAX_NUM_LILY_PADS
    );
    for (let i = 0; i < num_lily_pads; i++) {
      lily_pads.push(new LilyPad(lily_pads));
    }
  };

  sketch.windowResized = () => {
    global.canvas_width = document.body.clientWidth;
    global.canvas_height = document.body.scrollHeight;
    global.screen_height = document.body.clientHeight;
    // create more lily pads
    let new_num_lily_pads = Math.min(
      Math.floor(global.canvas_width * global.canvas_height * LILY_PAD_DENSITY),
      MAX_NUM_LILY_PADS
    );
    for (let i = lily_pads.length; i < new_num_lily_pads; i++) {
      lily_pads.push(new LilyPad(lily_pads));
    }
    // resize canvas
    sketch
      .createCanvas(global.canvas_width, global.canvas_height)
      .parent(global.BACKGROUND_DIV_ID);
  };

  sketch.draw = () => {
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
    global.scroll_y = document.body.scrollTop * global.PARALLAX_RATIO;
  };
});
