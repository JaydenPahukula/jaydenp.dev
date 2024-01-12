
// random float between [low, high)
export function float(low, high){
  return Math.random()*(high-low)+low
}

// random int between [low, high)
export function int(low, high){
  return Math.floor(float(low, high));
}

// random bool (true or false)
export function bool(){
  return float(0,1) < 0.5;
}