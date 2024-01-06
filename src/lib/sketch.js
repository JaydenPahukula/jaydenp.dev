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