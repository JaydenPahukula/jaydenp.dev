import p5 from "p5/lib/p5.min.js";
import { draw, resize, setup } from "src/background/sketch";

const _ = new p5((sketch) => {
  sketch.setup = () => {
    const width = document.body.clientWidth;
    const height = document.body.clientHeight;
    sketch.createCanvas(width, height).parent(document.body);
    setup(sketch, width, height);
  };

  sketch.windowResized = () => {
    const width = document.body.clientWidth;
    const height = document.body.clientHeight;
    sketch.resizeCanvas(width, height);
    resize(sketch, width, height);
  };

  sketch.draw = () => {
    draw(sketch);
  };
});
