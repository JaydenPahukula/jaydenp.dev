import words from 'src/data/words.json';
import { shuffle } from 'src/sketch/shuffle';

const wordsArr: string[] = shuffle(words);
const wordsSet = new Set<string>(wordsArr);

const getRandomWord = (): string => wordsArr[Math.floor(Math.random() * wordsArr.length)];

const isWord = (word: string): boolean => wordsSet.has(word);

export { getRandomWord, isWord };
