export function shuffle<T>(arr: T[]): T[] {
  let out = [...arr];
  let i = out.length;
  while (i > 0) {
    let r = Math.floor(Math.random() * i);
    i--;
    [out[i], out[r]] = [out[r], out[i]];
  }
  return out;
}
