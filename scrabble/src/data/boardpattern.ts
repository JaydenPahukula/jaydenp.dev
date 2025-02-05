// board cell pattern

// types:
// 0 - regular
// 1 - double letter
// 2 - triple letter
// 3 - double word
// 4 - triple word
// 5 - start

const BOARD_PATTERN: number[][] = [
  [4, 0, 0, 1, 0, 0, 0, 5],
  [0, 0, 1, 0, 0, 0, 1, 0],
  [0, 2, 0, 0, 0, 2, 0, 0],
  [0, 0, 0, 0, 3, 0, 0, 0],
  [1, 0, 0, 3, 0, 0, 0, 1],
  [0, 0, 3, 0, 0, 0, 1, 0],
  [0, 3, 0, 0, 0, 2, 0, 0],
  [4, 0, 0, 1, 0, 0, 0, 4],
];

const BOARD_PATTERN_SMALL: number[][] = [
  [4, 0, 2, 0, 5],
  [0, 0, 0, 1, 0],
  [1, 0, 3, 0, 2],
  [0, 3, 0, 0, 0],
  [2, 0, 1, 0, 4],
];

export { BOARD_PATTERN, BOARD_PATTERN_SMALL };
