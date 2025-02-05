import p5, { Font } from 'p5';
import { BOARD_PATTERN, BOARD_PATTERN_SMALL } from 'src/data/boardpattern';
import points from 'src/data/letterpoints';
import InterstateBlack from 'src/fonts/InterstateBlack.otf';
import InterstateBold from 'src/fonts/InterstateBold.otf';
import InterstateRegular from 'src/fonts/InterstateRegular.otf';
import {
  getNumTilesPlaced,
  placeFirstWord,
  placeWord,
  resetAlgorithm,
  shiftAlgorithmUp,
} from 'src/sketch/algorithm';
import Letter from 'src/types/letter';
import './index.css';

const _app = new p5(
  (p5Instance) => {
    const p5 = p5Instance as p5;

    // constants
    const FPS = 30;
    const SCROLL_SPEED = 0.7;
    const PLACE_WORD_SPEED = 5.5;
    const SIZE_THRESHOLD = 600; // px
    const CELL_RATIO = 1.05;
    const BORDER_SIZE = 0.1; // vs cell width
    const BORDER_SHADOW_SIZE = 0.6;
    const BORDER_SHADOW_OPACITY = 0.14;
    const TRIANGLE_RATIO = 1.2;
    const STAR_RADIUS = 0.2;
    const STAR_POINTINESS = 0.5;
    const BOARD_FONT_SIZE = 0.14;
    const BOARD_FONT_SPACING = 0.18;
    const TILE_SHADOW_SIZE = 0.05;
    const TILE_SHADOW_OPACITY = 0.2;
    const TILE_FONT_SIZE = 0.62;
    const TILE_FONT_SIZE_SMALL = 0.2;

    // colors
    const BORDER_COLOR = '#f2f1eb';
    const CELL_COLORS = ['#decea9', '#acdffa', '#3397cc', '#f5c0a9', '#f58453', '#f5c0a9'];
    const CELL_TEXT_COLOR = '#242322';
    const TILE_COLOR = '#6b1d03';
    const TILE_TEXT_COLOR = '#f0d59e';

    const reflect = (i: number, n: number): number =>
      Math.floor(i / (n - 1)) % 2 == 0 ? i % (n - 1) : n - 1 - (i % (n - 1));

    const isSmall = () => document.body.clientWidth > SIZE_THRESHOLD;

    let updateTimer = 0;
    let scrollOffset = 0;
    let cellOffset = 0;
    let W = 0;
    let H = 0;
    let cW = 0; // cell width
    let cH = 0; // cell height
    let wasSmall = isSmall();
    let grid: (Letter | '')[][] = [];
    let boardPattern: number[][];
    let fontRegular: Font | undefined;
    let fontBold: Font | undefined;
    let fontBlack: Font | undefined;

    function resize() {
      const small = isSmall();
      if (small) {
        W = 15;
        boardPattern = BOARD_PATTERN;
      } else {
        W = 9;
        boardPattern = BOARD_PATTERN_SMALL;
      }
      cW = document.body.clientWidth / W;
      cH = cW * CELL_RATIO;
      H = Math.ceil(document.body.clientHeight / cH) + 1;
      // add more rows to the grid if needed
      while (grid.length < H) grid.push(Array(W).fill(''));
      // reset if switching to/from mobile
      if (small !== wasSmall) reset();
      wasSmall = small;
    }

    function reset() {
      grid = Array(H + 1)
        .fill(undefined)
        .map((_) => Array(W).fill(''));
      resetAlgorithm();
      resetUpdateTimer();
      grid = placeFirstWord(grid);
    }

    function resetUpdateTimer() {
      updateTimer = Math.floor(FPS * (0.5 + PLACE_WORD_SPEED * (getNumTilesPlaced() / (W * H))));
      // console.log(getNumTilesPlaced() / (W * H), updateTimer);
    }

    p5.preload = () => {
      fontBlack = p5.loadFont(InterstateBlack);
      fontBold = p5.loadFont(InterstateBold);
      fontRegular = p5.loadFont(InterstateRegular);
    };

    p5.setup = () => {
      p5.createCanvas(document.body.clientWidth, document.body.clientHeight);
      p5.frameRate(FPS);
      p5.noStroke();
      p5.textAlign(p5.CENTER, p5.CENTER);
      resize();
      reset();
    };

    p5.windowResized = () => {
      p5.resizeCanvas(document.body.clientWidth, document.body.clientHeight);
      resize();
    };

    p5.draw = () => {
      // scroll
      p5.translate(0, -scrollOffset);

      p5.background(BORDER_COLOR);

      // draw cells
      for (let i = 0; i < H; i++) {
        for (let j = 0; j < W; j++) {
          const x = j * cW;
          const y = i * cH;
          const b = (cW * BORDER_SIZE) / 2;
          const type =
            boardPattern[reflect(i + cellOffset, boardPattern.length)][
              reflect(j, boardPattern[0].length)
            ];

          p5.fill(CELL_COLORS[type]);
          p5.rect(x + b, y + b, cW - 2 * b, cH - 2 * b);

          const T = TRIANGLE_RATIO * 2 * b;
          const xC = x + cW / 2; // horizontal center
          const yC = y + cH / 2; // vertical center
          if (type === 1 || type === 3 || type === 5) {
            // double triangles
            p5.triangle(xC - T, y + b + 1, xC - T / 2, y - b, xC, y + b + 1);
            p5.triangle(xC, y + b + 1, xC + T / 2, y - b, xC + T, y + b + 1);
            p5.triangle(x + b + 1, yC - T, x - b, yC - T / 2, x + b + 1, yC);
            p5.triangle(x + b + 1, yC, x - b, yC + T / 2, x + b + 1, yC + T);
            p5.triangle(xC - T, y + cH - b - 1, xC - T / 2, y + cH + b, xC, y + cH - b - 1);
            p5.triangle(xC, y + cH - b - 1, xC + T / 2, y + cH + b, xC + T, y + cH - b - 1);
            p5.triangle(x + cW - b - 1, yC - T, x + cW + b, yC - T / 2, x + cW - b - 1, yC);
            p5.triangle(x + cW - b - 1, yC, x + cW + b, yC + T / 2, x + cW - b - 1, yC + T);
          } else if (type === 2 || type === 4) {
            // triple triangles
            p5.triangle(xC - T * 1.5, y + b + 1, xC - T, y - b, xC - T / 2, y + b + 1);
            p5.triangle(xC - T / 2, y + b + 1, xC, y - b, xC + T / 2, y + b + 1);
            p5.triangle(xC + T / 2, y + b + 1, xC + T, y - b, xC + T * 1.5, y + b + 1);
            p5.triangle(x + b + 1, yC - T * 1.5, x - b, yC - T, x + b + 1, yC - T / 2);
            p5.triangle(x + b + 1, yC - T / 2, x - b, yC, x + b + 1, yC + T / 2);
            p5.triangle(x + b + 1, yC + T / 2, x - b, yC + T, x + b + 1, yC + T * 1.5);
            p5.triangle(
              xC - T * 1.5,
              y + cH - b - 1,
              xC - T,
              y + cH + b,
              xC - T / 2,
              y + cH - b - 1,
            );
            p5.triangle(xC - T / 2, y + cH - b - 1, xC, y + cH + b, xC + T / 2, y + cH - b - 1);
            p5.triangle(
              xC + T / 2,
              y + cH - b - 1,
              xC + T,
              y + cH + b,
              xC + T * 1.5,
              y + cH - b - 1,
            );
            p5.triangle(
              x + cW - b - 1,
              yC - T * 1.5,
              x + cW + b,
              yC - T,
              x + cW - b - 1,
              yC - T / 2,
            );
            p5.triangle(x + cW - b - 1, yC - T / 2, x + cW + b, yC, x + cW - b - 1, yC + T / 2);
            p5.triangle(
              x + cW - b - 1,
              yC + T / 2,
              x + cW + b,
              yC + T,
              x + cW - b - 1,
              yC + T * 1.5,
            );
          }

          // border shadow
          const S = (1 - BORDER_SHADOW_SIZE) * b;
          p5.fill(0, 0, 0, 255 * BORDER_SHADOW_OPACITY);
          p5.beginShape();
          p5.vertex(x + S, y + cH - S);
          p5.vertex(x + S, y + S);
          p5.vertex(x + cW - S, y + S);
          p5.vertex(x + cW - b, y + b);
          p5.vertex(x + b, y + b);
          p5.vertex(x + b, y + cH - b);
          p5.endShape();

          if (grid[i][j] === '') {
            // text/designs
            p5.fill(CELL_TEXT_COLOR);
            const R = STAR_RADIUS * cW;
            const P = R * (1 - STAR_POINTINESS);
            if (type === 5) {
              // star
              p5.beginShape();
              p5.vertex(xC, yC - R);
              p5.vertex(xC + 0.5877 * P, yC - 0.809 * P);
              p5.vertex(xC + 0.9511 * R, yC - 0.309 * R);
              p5.vertex(xC + 0.9511 * P, yC + 0.309 * P);
              p5.vertex(xC + 0.5877 * R, yC + 0.809 * R);
              p5.vertex(xC, yC + P);
              p5.vertex(xC - 0.5877 * R, yC + 0.809 * R);
              p5.vertex(xC - 0.9511 * P, yC + 0.309 * P);
              p5.vertex(xC - 0.9511 * R, yC - 0.309 * R);
              p5.vertex(xC - 0.5877 * P, yC - 0.809 * P);
              p5.endShape(p5.CLOSE);
            } else if (type !== 0) {
              p5.textSize(cH * BOARD_FONT_SIZE);
              fontBlack && p5.textFont(fontBlack);
              p5.text(
                type === 1 || type == 3 ? 'DOUBLE' : 'TRIPLE',
                xC,
                yC - cH * BOARD_FONT_SPACING,
              );
              p5.text(type === 1 || type == 2 ? 'LETTER' : 'WORD', xC, yC);
              p5.text('SCORE', xC, yC + cH * BOARD_FONT_SPACING);
            }
          } else {
            // tile shadow
            const S = TILE_SHADOW_SIZE * cW;
            p5.fill(0, 0, 0, 255 * TILE_SHADOW_OPACITY);
            p5.beginShape();
            p5.vertex(x + cW - b, y + b);
            p5.vertex(x + cW - b, y + cH - b);
            p5.vertex(x + b, y + cH - b);
            p5.vertex(x + b + S, y + cH - b + S);
            p5.vertex(x + cW - b + S, y + cH - b + S);
            p5.vertex(x + cW - b + S, y + b + S);
            p5.endShape(p5.CLOSE);

            p5.fill(TILE_COLOR);
            p5.rect(x + b, y + b, cW - 2 * b, cH - 2 * b);

            p5.fill(TILE_TEXT_COLOR);
            fontRegular && p5.textFont(fontRegular);
            p5.textSize(cH * TILE_FONT_SIZE);
            p5.text(grid[i][j], x + cW * 0.46, y + cH * 0.45);
            p5.textSize(cH * TILE_FONT_SIZE_SMALL);
            fontBold && p5.textFont(fontBold);
            p5.text(points(grid[i][j]), x + cW * 0.76, y + cH * 0.72);
          }
        }
      }
      updateTimer--;
      if (updateTimer <= 0) {
        grid = placeWord(grid);
        resetUpdateTimer();
      }
      scrollOffset += SCROLL_SPEED;
      while (scrollOffset > cH) {
        scrollOffset -= cH;
        cellOffset++;
        grid = grid.slice(1);
        // add more rows to the grid if needed
        while (grid.length < H) grid.push(Array(W).fill(''));
        shiftAlgorithmUp();
      }
    };
  },
  document.getElementById('root') ?? undefined,
);
