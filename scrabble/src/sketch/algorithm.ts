import { shuffle } from 'src/sketch/shuffle';
import { getRandomWord, isWord } from 'src/sketch/words';
import Letter, { isLetter } from 'src/types/letter';

const NUM_TRIES = 200;

let tileCoords: [number, number][] = [];

export function resetAlgorithm() {
  tileCoords = [];
}

export function shiftAlgorithmUp() {
  tileCoords = tileCoords.map<[number, number]>(([x, y]) => [x, y - 1]).filter(([_, y]) => y > 0);
}

export function getNumTilesPlaced() {
  return tileCoords.length;
}

export function placeFirstWord(grid: Letter[][]): Letter[][] {
  const centerX = Math.floor(grid[0].length / 2);
  let word;
  while ((word = getRandomWord()).length >= grid.length);
  for (let y = 0; y < word.length; y++) {
    const c = word[y];
    if (!isLetter(c)) break;
    grid[y][centerX] = c;
    tileCoords.push([centerX, y]);
  }
  return grid;
}

export function placeWord(grid: Letter[][]): Letter[][] {
  const W = grid[0].length;
  const H = grid.length;
  for (let _ = 0; _ < NUM_TRIES; _++) {
    const word = getRandomWord();
    // try all available tiles
    for (const [x, y] of shuffle(tileCoords)) {
      const c = grid[y][x];
      let i = 0;
      while (i < word.length && (i = word.indexOf(c, i)) !== -1) {
        let fail = false;
        // try horizontally
        for (let j = 0; j < word.length; j++) {
          const x1 = x - i + j;
          if (x1 < 0 || x1 >= W || (grid[y][x1] !== '' && grid[y][x1] !== word[j])) {
            fail = true;
            break;
          }
        }
        if (!fail) {
          let newGrid = grid.map((row) => [...row]);
          let newTiles: [number, number][] = [];
          for (let j = 0; j < word.length; j++) {
            const x1 = x - i + j;
            const c = word[j];
            if (newGrid[y][x1] === '') newTiles.push([x1, y]);
            if (!isLetter(c)) break;
            newGrid[y][x1] = c;
          }
          if (newTiles.length > 0 && checkGrid(newGrid, x - i, y, false)) {
            tileCoords = tileCoords.concat(newTiles);
            return newGrid;
          }
        }
        // try vertically
        fail = false;
        for (let j = 0; j < word.length; j++) {
          const y1 = y - i + j;
          if (y1 < 0 || y1 >= H) {
            fail = true;
            break;
          }
          if (grid[y1][x] !== '' && grid[y1][x] !== word[j]) {
            fail = true;
            break;
          }
        }
        if (!fail) {
          let newGrid = grid.map((row) => [...row]);
          let newTiles: [number, number][] = [];
          for (let j = 0; j < word.length; j++) {
            const y1 = y - i + j;
            const c = word[j];
            if (newGrid[y1][x] === '') newTiles.push([x, y1]);
            if (!isLetter(c)) break;
            newGrid[y1][x] = c;
          }
          if (newTiles.length > 0 && checkGrid(newGrid, x, y - i, true)) {
            tileCoords = tileCoords.concat(newTiles);
            return newGrid;
          }
        }
        i++;
      }
    }
  }
  console.error('STUCK');
  // if failed because grid is empty
  if (!grid.map((row) => row.every((x) => x === '')).includes(false)) grid = placeFirstWord(grid);
  return grid;
}

// find the word at the given tile
function findWord(grid: Letter[][], x: number, y: number, vertical: boolean): string {
  if (grid[y][x] === '') return '';
  let out = grid[y][x];
  if (vertical) {
    for (let y1 = y - 1; y1 >= 0 && grid[y1][x] !== ''; y1--) out = grid[y1][x] + out;
    for (let y1 = y + 1; y1 < grid.length && grid[y1][x] !== ''; y1++) out = out + grid[y1][x];
  } else {
    for (let x1 = x - 1; x1 >= 0 && grid[y][x1] !== ''; x1--) out = grid[y][x1] + out;
    for (let x1 = x + 1; x1 < grid[y].length && grid[y][x1] !== ''; x1++) out = out + grid[y][x1];
  }
  return out;
}

// check that the grid is still valid after adding a new word at the given tile
function checkGrid(grid: Letter[][], x: number, y: number, vertical: boolean): boolean {
  const word = findWord(grid, x, y, vertical);
  // check parallel word
  if (!isWord(word)) return false;
  // check perpendicular words
  if (vertical) {
    for (let i = 0; i < word.length; i++) {
      const perpWord = findWord(grid, x, y + i, false);
      if (perpWord.length > 1 && !isWord(perpWord)) return false;
    }
  } else {
    for (let i = 0; i < word.length; i++) {
      const perpWord = findWord(grid, x + i, y, true);
      if (perpWord.length > 1 && !isWord(perpWord)) return false;
    }
  }
  return true;
}
