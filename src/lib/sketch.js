import p5 from "p5/lib/p5.min.js";
import { global } from "./koipond/globals.js";
import { Fish } from "./koipond/Fish.js";
import { LilyPad } from "./koipond/LilyPad.js";

const CONTENT_DIV = "content";
const PARENT_DIV = "background";

const FISH_DENSITY = 0.000032; // fish per pixel
const MAX_NUM_FISH = 200
const LILY_PAD_DENSITY = 0.000012; // lily pads per pixel
const MAX_NUM_LILY_PADS = 100;

const BACKGROUND_COLOR = "#067BB1"
// full color palatte: https://coolors.co/067bb1-5caf1d-e6e6e6-f49d2c-eb4a2a-313130


let s = (sketch) => {
  
  let fishies = [];
  let lily_pads = [];

  sketch.setup = () => {

    // initialize canvas
    global.canvas_width = document.getElementById(PARENT_DIV).clientWidth;
    global.canvas_height = document.getElementById(CONTENT_DIV).clientHeight * 0.55;
    console.log()
    sketch.createCanvas(global.canvas_width, global.canvas_height).parent(PARENT_DIV);
    sketch.frameRate(global.FPS);
    sketch.angleMode("DEGREES");

    // create fish
    let num_fish = Math.min(Math.floor(global.canvas_width * global.canvas_height * FISH_DENSITY), MAX_NUM_FISH);
    for (let i = 0; i < num_fish; i++){
      fishies.push(new Fish());
    }
    // create lily pads
    let num_lily_pads = Math.min(Math.floor(global.canvas_width * global.canvas_height * LILY_PAD_DENSITY), MAX_NUM_LILY_PADS);
    for (let i = 0; i < num_lily_pads; i++){
      lily_pads.push(new LilyPad(lily_pads));
    }

  }
  

  sketch.windowResized = () => {
    global.canvas_width = document.getElementById(PARENT_DIV).clientWidth;
    global.canvas_height = document.getElementById(CONTENT_DIV).clientHeight;
    // create more lily pads
    let new_num_lily_pads = Math.floor(global.canvas_width * global.canvas_height * LILY_PAD_DENSITY);
    for (let i = lily_pads.length; i < new_num_lily_pads; i++){
      lily_pads.push(new LilyPad(lily_pads));
    }
    // resize canvas
    sketch.createCanvas(global.canvas_width, global.canvas_height).parent(PARENT_DIV);

  }


  sketch.draw = () => {
    sketch.background(BACKGROUND_COLOR);
    
    // move fish
    for (let i = 0; i < fishies.length; i++) fishies[i].move(fishies);
    
    // draw shadows
    for (let i = 0; i < fishies.length; i++) fishies[i].drawShadow(sketch);
    for (let i = 0; i < lily_pads.length; i++) lily_pads[i].drawShadow(sketch);
    
    // draw fish
    for (let i = 0; i < fishies.length; i++) fishies[i].draw(sketch);
    // draw lily pads
    for (let i = 0; i < lily_pads.length; i++) lily_pads[i].draw(sketch);
    
    global.t++;

  }

}

new p5(s);
