
export class Vector {
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
  // deep copy
  copy(){
    return new Vector(this.x, this.y);
  }
  // get magnitude
  magnitude(){
    return Math.hypot(this.x, this.y);
  }
  // get direction
  direction(){
    if (this.x == 0){
      if (this.y > 0) return Math.PI/2;
      return Math.PI*3/2;
    }
    let angle = Math.atan(this.y/this.x);
    if (this.x > 0 && this.y > 0) return angle;
    else if (this.x < 0) return Math.PI+angle;
    else return 2*Math.PI+angle;
  }
}

// scale vector
export function scale(v, n){
  return new Vector(v.x*n, v.y*n);
}

// add any number of vectors
export function add(){
  let total = new Vector(0,0);
  for (let i = 0; i < arguments.length; i++){
    total.x += arguments[i].x;
    total.y += arguments[i].y;
  }
  return total;
}

// subtract two vectors
export function subtract(v1, v2){
  return new Vector(v1.x-v2.x, v1.y-v2.y);
}

// get normalized vector
export function norm(v){
  let len = v.magnitude();
  if (len == 0) return v;
  return new Vector(v.x/len, v.y/len);
}

// get orthogonal vector
export function orth(v){
  return new Vector(v.y, -v.x);
}

// get rotated vector
export function rotated(v, angle){
  let c = Math.cos(angle);
  let s = Math.sin(angle);
  return new Vector(c*v.x-s*v.y, s*v.x+c*v.y);
}

// dot product
export function dot(v1, v2){
  return v1.x*v2.x + v1.y*v2.y;
}

// bound angle between -pi and pi
export function boundAngle(angle){
  while (angle < 0) angle += 2*Math.PI;
  return (angle + Math.PI) % (2*Math.PI) - Math.PI;
}