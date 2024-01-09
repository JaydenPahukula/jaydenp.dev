import p5 from "p5/lib/p5.min.js";

const parentDiv = "backgroundDiv"

let s = (sk) => {    
    
    var canvasWidth, canvasHeight;
    var width, height, middle;
    function updateCanvasSize(){
        canvasWidth = document.getElementById(parentDiv).scrollWidth-0.001;
        canvasHeight = document.body.scrollHeight;
        middle = canvasWidth/2;
        sk.resizeCanvas(canvasWidth, canvasHeight);
    }

    sk.setup = () => {
        sk.createCanvas(100, 100).parent(parentDiv);
        updateCanvasSize();

        sk.textFont("Courier New");
        sk.textStyle("BOLD");
        sk.textSize(16);
        sk.textAlign("CENTER");
    }

    sk.windowResized = () => {
        updateCanvasSize();
    }
    
    sk.draw = () => {
        sk.background(1,65,95);
        sk.fill(255,0,0);
        sk.rect(220,22,22,22);
        sk.text("hello",middle,100);
    }
}

new p5(s);


/*
const cellWidth = 10;
const cellHeight = 16;

const canvasWidth = 700;
const canvasHeight = 500;

var width, height, middle;

function setup() {
  createCanvas(700, 500);
  frameRate(30);
  middle = canvasWidth/2;
  width = Math.ceil(canvasWidth / cellWidth);
  height = Math.ceil(canvasHeight / cellHeight);
}

const waveHeight = 70;//px
const waveStart = 125;//px
const waveDelta = 1;
const waveApproachTime = 50;//frames
const waveApproachSpeed = 1.12;
const waveRetractSpeed = 1.08;
const waveFadeSpeed = 4;
const waveWetSandSpeed = 0.2;

class Wave {
  
  constructor(){
    this.origin = Math.floor((2*Math.random()-0.5)*width);
    this.origin = Math.min(width-1, Math.max(0, this.origin));
    
    this.deltas = new Array(width);
    for (let x = 0; x < width; x++){
      this.deltas[x] = waveDelta*Math.abs(this.origin-x);
    }
    
    this.age = 0;
  }
  
  draw(){
    
    if (this.age < waveApproachTime){
      for (let x = 0; x < width; x++){
        let y = waveStart-waveHeight+2*waveHeight/(1+Math.pow(waveApproachSpeed, this.age))+this.deltas[x];
        fill(220);
        if (y < waveStart){
          rect(x*cellWidth, y, cellWidth, waveStart-y);
        }
      }
    } else {
      for (let x = 0; x < width; x++){
        let y = waveStart-waveHeight+2*waveHeight/(1+Math.pow(waveRetractSpeed, 50-this.age+waveApproachTime))+this.deltas[x];
        fill(220,220,220,270-(this.age-waveApproachTime)*waveFadeSpeed);
        if (y < waveStart){
          rect(x*cellWidth, y, cellWidth, waveStart-y);
        }
      }
    }
    this.age++;
  }
  
}

let waves = [];

function draw() {
  background(1,65,95);
  
  noStroke();
  fill(179, 158, 119);
  rect(0,0,canvasWidth,150);
  fill(230);
  rect(0,125,canvasWidth,50);
  
  for (let i = 0; i < waves.length; i++){
    waves[i].draw();
  }
}

function mouseClicked(){
  waves.push(new Wave());
}
*/