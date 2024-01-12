import { global } from "./globals.js";
import * as vec from "./Vector.js";
import * as rand from "./random.js";


// =============== LILY PAD PARAMETERS ===============
const MIN_RADIUS = 90;
const MAX_RADIUS = 160;
const BITE_ANGLE = 25;
const COLOR = "#5CAF1D";
const SHADOW_OPACITY = 30; //0-255
const SHADOW_OFFSET_X = 10;
const SHADOW_OFFSET_Y = 10;
// ===================================================


export class LilyPad {

  constructor(arr){
    
    // radius
    this.rad = rand.float(MIN_RADIUS, MAX_RADIUS);

    // angle
    this.angle = rand.float(0, 360);
    
    // position (try 10,000 times to not overlap)
    for (let i = 0; i < 10000; i++){

      // place at a random spot
      let posx = rand.int(-global.CANVAS_MARGIN, global.canvas_width+global.CANVAS_MARGIN);
      let posy = rand.int(-global.CANVAS_MARGIN, global.canvas_height+global.CANVAS_MARGIN);
      this.pos = new vec.Vector(posx,posy);

      // check not overlapping
      let done = true;
      for (let j = 0; j < arr.length; j++){
        let other = arr[j];
        if (other == this) continue;
        let distance = vec.subtract(this.pos, other.pos).magnitude();
        if (distance < this.rad + other.rad){
          done = false;
          break;
        }
      }
      if (done) break;
    }
    
  }
  

  draw(sketch){
    sketch.noStroke()
    sketch.fill(COLOR);
    sketch.arc(this.pos.x, this.pos.y, this.rad, this.rad, this.angle-BITE_ANGLE, this.angle);
  }
  

  drawShadow(sketch){
    sketch.noStroke()
    sketch.fill(0,0,0,SHADOW_OPACITY);
    sketch.translate(SHADOW_OFFSET_X, SHADOW_OFFSET_Y);
    sketch.arc(this.pos.x, this.pos.y, this.rad, this.rad, this.angle-BITE_ANGLE, this.angle);
    sketch.translate(-SHADOW_OFFSET_X, -SHADOW_OFFSET_Y);
  }
}