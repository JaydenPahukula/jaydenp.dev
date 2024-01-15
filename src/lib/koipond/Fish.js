import { global } from "./globals.js";
import * as vec from "./Vector.js";
import * as rand from "./random.js";


// ================= FISH PARAMETERS =================
// body
const MAX_SIZE = 1.7;
const MIN_SIZE = 0.9;
const BODY_WIDTH = 18;
const SEGMENT_LENGTH = 3.6;
const COLORS = ["#E6E6E6","#E6E6E6","#EB4A2A","#EB4A2A","#F49D2C","#313130"];
const NUM_SEGMENTS = 20;
const BODY_PROFILE = [0.00, 0.65, 0.85, 0.95, 0.98, 1.00, 0.98, 0.96, 0.94, 0.91,
                           0.88, 0.82, 0.70, 0.60, 0.48, 0.36, 0.21, 0.12, 0.05, 0.00];
// design
const MIN_NUM_SPOTS = 2;
const MAX_NUM_SPOTS = 6;
const MIN_SPOT_HEIGHT = 3;
const MAX_SPOT_HEIGHT = 6;
const MIN_SPOT_DEPTH = 0.2;
const MAX_SPOT_DEPTH = 2.9;
// shadow
const SHADOW_OPACITY = 30; //0-255
const SHADOW_OFFSET_X = 6;
const SHADOW_OFFSET_Y = 6;
// movement
const MAX_VEL = 2.5;
const MIN_VEL = 1;
const RESISTANCE_VAL = 0.97;
// behavior
const OSCILLATION_SPEED = 0.1;
const OSCILLATION_AMPLITUDE = 0.38;
const RANDOM_TURN_PROB = 0.01;
const RANDOM_TURN_STRENGTH = 0.12;
const SIGHT_RANGE = 50;
const SIGHT_FOV = 90;//degrees
const SEPERATION_STRENGTH = 0.002;
const ALIGNMENT_STRENGTH = 0.0019;
const COHESION_STRENGTH = 0.00002;
// ===================================================


export class Fish {

  constructor(){
    // start at random spot
    let posx = rand.int(-global.CANVAS_MARGIN, global.canvas_width+global.CANVAS_MARGIN);
    let posy = rand.int(-global.CANVAS_MARGIN, global.canvas_height+global.CANVAS_MARGIN);
    this.pos = new vec.Vector(posx,posy);
    
    // start swimming at random angle
    let angle = rand.float(0,360);
    this.vel = new vec.Vector(5*Math.cos(angle),5*Math.sin(angle));
    
    this.acc = new vec.Vector(0,0);
    
    // this.size is used for scaling all other attributes
    this.size = rand.float(MIN_SIZE, MAX_SIZE)
    
    // body
    this.segment_length = this.size * SEGMENT_LENGTH;
    this.body_width = this.size * BODY_WIDTH;
    this.body = []
    for (let i = 0; i < NUM_SEGMENTS; i++){
      this.body.push(this.pos.copy());
    }
    // these store the points along the side of the body
    this.body_left = [];
    this.body_right = [];
    
    // colors
    let color1 = rand.int(0, COLORS.length);
    let color2 = rand.int(0, COLORS.length);
    while (color1 == color2){
      color2 = rand.int(0, COLORS.length);
    }
    this.primary_color = COLORS[color1];
    this.secondary_color = COLORS[color2];
    

    this.oscillation_speed = OSCILLATION_SPEED / this.size;
    this.oscillation_amplitude = OSCILLATION_AMPLITUDE;
    this.random_turn_prob = RANDOM_TURN_PROB / this.size;
    
    // add spots
    this.spots = [];
    let num_spots = rand.int(MIN_NUM_SPOTS, MAX_NUM_SPOTS+1);
    for (let i = 0; i < num_spots; i++){
      this.spots.push({
        // which segment the center of the spot is
        loc: rand.int(1, NUM_SEGMENTS-1),
        // how many segments the spot spans up and down the fish
        height: rand.int(MIN_SPOT_HEIGHT, MAX_SPOT_HEIGHT+1),
        // how far the spot etends onto the body (1 = to the center, 2 = whole fish)
        depth: rand.float(MIN_SPOT_DEPTH, MAX_SPOT_DEPTH),
         // which side the spot is on
        side: rand.bool()
      });
    }
    
    // take 50 steps to make sure fish is not crumpled up when spawned
    for (let i = 0; i < 100; i++){
      this.move([]);
    }
  }
  
  
  // move the fish
  move(arr){

    // update acceleration
    this.acc = vec.add(this.acc, this.#getBehavior(arr));
    // apply random turn
    if (rand.int(0, Math.floor(1/this.random_turn_prob)) == 0){
      let randomTurn = new vec.Vector(rand.float(-1,1),rand.float(-1,1))
      this.acc = vec.add(this.acc, vec.scale(randomTurn, RANDOM_TURN_STRENGTH));
    }
    // resistance
    this.acc = vec.scale(this.acc, RESISTANCE_VAL);

    // update velocity
    this.vel = vec.add(this.vel, this.acc);
    // resistance
    this.vel = vec.scale(this.vel, RESISTANCE_VAL);
    // bound velocity
    if (this.vel.magnitude() > MAX_VEL){
      this.vel = vec.scale(this.vel, MAX_VEL/this.vel.magnitude());
    } else if (this.vel.magnitude() < MIN_VEL){
      this.vel = vec.scale(this.vel, MIN_VEL/this.vel.magnitude());
    }

    //if (global.t % 40 == 1) console.log(this.acc, this.vel);
    
    // update position
    this.pos = vec.add(this.pos, this.vel);
    // apply oscillations orthogonal to velocity
    let oscillation = Math.sin(this.oscillation_speed*global.t)*this.oscillation_amplitude;
    this.pos = vec.add(this.pos, vec.scale(vec.norm(vec.orth(this.vel)), oscillation));
    // wrap around canvas
    if (this.pos.x < -global.CANVAS_MARGIN) this.pos.x = global.canvas_width+global.CANVAS_MARGIN;
    if (this.pos.x > global.canvas_width+global.CANVAS_MARGIN) this.pos.x = -global.CANVAS_MARGIN;
    if (this.pos.y < -global.CANVAS_MARGIN) this.pos.y = global.canvas_height+global.CANVAS_MARGIN;
    if (this.pos.y > global.canvas_height+global.CANVAS_MARGIN) this.pos.y = -global.CANVAS_MARGIN;
    
    // move the rest of the body
    this.body[0] = this.pos;
    for (let i = 1; i < NUM_SEGMENTS; i++){
      // pull next body segment along (clamp distance to be <= this.segment_length)
      let diff = vec.subtract(this.body[i], this.body[i-1]);
      if (diff.magnitude() >= this.segment_length){
        diff = vec.scale(diff, this.segment_length/diff.magnitude());
        this.body[i] = vec.add(this.body[i-1], diff);
      }
    }
    
    // update body points
    this.body_left[0] = this.body[0];
    this.body_right[0] = this.body[0];
    for (let i = 1; i < NUM_SEGMENTS; i++){
      let vector = vec.orth(vec.subtract(this.body[i-1], this.body[i])); // get orthogonal vector
      vector = vec.scale(vec.norm(vector), BODY_PROFILE[i]*this.body_width/2); // normalize and scale
      this.body_left[i] = vec.add(this.body[i], vector);
      this.body_right[i] = vec.subtract(this.body[i], vector);
    }
  }
  
  
  // draw the fish
  draw(sketch){

    // draw body
    sketch.noStroke();
    sketch.fill(this.primary_color);
    sketch.beginShape();
    // left side of body
    for (let i = 0; i < NUM_SEGMENTS; i++){
      sketch.vertex(this.body_left[i].x, this.body_left[i].y);
    }
    // right side of body
    for (let i = NUM_SEGMENTS-1; i > 0; i--){
      sketch.vertex(this.body_right[i].x, this.body_right[i].y);
    }
    sketch.endShape();
    
    // draw spots (unless primary and secondary colors are the same)
    if (this.primary_color != this.secondary_color){
      sketch.fill(this.secondary_color);
      for (let i = 0; i < this.spots.length; i++){
        let spot = this.spots[i];
        sketch.beginShape();
        // add vertexes along the side of the body
        for (let j = Math.max(1, spot.loc-spot.height); j < Math.min(NUM_SEGMENTS, spot.loc+spot.height+1); j++){
          if (spot.side){
            sketch.vertex(this.body_left[j].x, this.body_left[j].y);
          } else {
            sketch.vertex(this.body_right[j].x, this.body_right[j].y);
          }
        }
        // add shape vertexes on the body
        for (let j = Math.min(NUM_SEGMENTS-1, spot.loc+spot.height); j > Math.max(1, spot.loc-spot.height); j--){
          let spotDepth = spot.depth*(Math.pow((j-spot.loc)/spot.height,2)-1)+1;
          let actualDepth = Math.max(BODY_PROFILE[j]*spotDepth, -BODY_PROFILE[j])
          let vector = vec.orth(vec.subtract(this.body[j-1], this.body[j])); // get vec.orthogonal vector
          vector = vec.scale(vec.norm(vector), (spot.side?1:-1)*actualDepth*this.body_width/2); // normalize and scale
          let shapePoint = vec.add(this.body[j], vector);
          sketch.vertex(shapePoint.x, shapePoint.y);
        }
        sketch.endShape();
      }
    }
    
    // // draw tail
    // sketch.fill(this.primary_color);
    // let startSeg = vec.subtract(this.body[0], this.body[1]);
    // let endSeg = vec.subtract(this.body[NUM_SEGMENTS-2], this.body[NUM_SEGMENTS-1]);
    // let angle = (endSeg.direction()-startSeg.direction()) * TAIL_SWAY;
    // let tailDirection = vec.scale(vec.norm(vec.rotated(endSeg, Math.PI+angle)), this.tail_length);
    // let point1 = this.body[NUM_SEGMENTS-1];
    // let point2 = vec.add(this.body[NUM_SEGMENTS-1], tailDirection);
    // let point3 = vec.add(point2, new vec.Vector(-1,-1));
    // point2 = vec.add(point2, new vec.Vector(1,1));
    // sketch.triangle(point1.x, point1.y, point2.x, point2.y, point3.x, point3.y);
    
    // // draw eyes
    // sketch.noStroke();
    // sketch.fill(EYE_COLOR);
    // // left eye
    // let angle1 = vec.subtract(this.body_left[0],this.body_left[1]).direction()*180/Math.PI;
    // let angle2 = vec.subtract(this.body_left[2],this.body_left[1]).direction()*180/Math.PI;
    // sketch.arc(this.body_left[1].x, this.body_left[1].y, this.eye_size, this.eye_size, angle1, angle2);
    // // right eye
    // angle1 = vec.subtract(this.body_right[0],this.body_right[1]).direction()*180/Math.PI;
    // angle2 = vec.subtract(this.body_right[2],this.body_right[1]).direction()*180/Math.PI;
    // sketch.arc(this.body_right[1].x, this.body_right[1].y, this.eye_size, this.eye_size, angle2, angle1);
  }
  
  
  // draw the fish's shadow
  drawShadow(sketch){
    sketch.noStroke();
    sketch.fill(0,0,0,SHADOW_OPACITY);
    sketch.translate(SHADOW_OFFSET_X, SHADOW_OFFSET_Y);
    sketch.beginShape();
    // left side
    for (let i = 0; i < NUM_SEGMENTS-1; i++){
      sketch.vertex(this.body_left[i].x, this.body_left[i].y);
    }
    // right side
    for (let i = NUM_SEGMENTS-1; i > 0; i--){
      sketch.vertex(this.body_right[i].x, this.body_right[i].y);
    }
    sketch.endShape();
    sketch.translate(-SHADOW_OFFSET_X, -SHADOW_OFFSET_Y);
  }
  
  
  // calculate fish's behavior (boids)
  #getBehavior(fishArr){

    let total = 0;
    let seperation = new vec.Vector(0,0);
    let alignment = new vec.Vector(0,0);
    let cohesion = new vec.Vector(0,0);

    for (let i = 0; i < fishArr.length; i++){
      // do not compare against self
      let other = fishArr[i];
      if (other == this) continue;
      // check if in sight range
      let diff = vec.subtract(this.pos, other.pos);
      if (diff.magnitude() > SIGHT_RANGE) continue;
      // check if in fov
      let angle = Math.abs(this.vel.direction() - diff.direction())*180/Math.PI;
      if (angle < SIGHT_FOV/2) continue;
      
      // add to calculations
      seperation = vec.add(seperation, vec.scale(diff, 1/diff.magnitude()));
      alignment = vec.add(alignment, other.vel);
      cohesion = vec.add(cohesion, vec.scale(diff, -1));
      total += 1;
    }

    // average and weight
    if (total > 0){
      seperation = vec.scale(seperation, SEPERATION_STRENGTH/total);
      alignment = vec.scale(alignment, ALIGNMENT_STRENGTH/total);
      cohesion = vec.scale(cohesion, COHESION_STRENGTH/total);
    }
    // add together
    let behavior = vec.add(seperation, alignment, cohesion);
    // smaller fish are influenced more
    behavior = vec.scale(behavior, MAX_SIZE/this.size);

    return behavior;
  }
  
}
