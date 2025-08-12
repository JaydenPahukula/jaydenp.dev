import "src/background/sketch";

// import p5 from "p5/lib/p5.min.js";
// import { draw, resize, setup } from "src/background/sketch";

// const _ = new p5((sketch) => {
//   const parentDiv = document.getElementById("background");
//   const contentDiv = document.getElementById("content");

//   function calcCanvasSize() {
//     return [document.body.clientWidth * 1.05, contentDiv?.clientHeight ?? 0];
//   }

//   sketch.setup = () => {
//     const [width, height] = calcCanvasSize();
//     sketch.createCanvas(width, height).parent(parentDiv);
//     setup(sketch, width, height);
//   };

//   sketch.windowResized = () => {
//     const [width, height] = calcCanvasSize();
//     sketch.resizeCanvas(width, height);
//     resize(sketch, width, height);
//   };

//   sketch.draw = () => {
//     draw(sketch);
//   };
// });
