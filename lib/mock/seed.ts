export function mulberry32(seed: number): () => number {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash + char) | 0;
  }
  return Math.abs(hash);
}

export function seededRandom(seed: number, min: number, max: number): number {
  const rng = mulberry32(seed);
  return min + rng() * (max - min);
}

export function seededPick<T>(seed: number, arr: T[]): T {
  const rng = mulberry32(seed);
  return arr[Math.floor(rng() * arr.length)];
}

export function generateSeries(
  seed: number,
  length: number,
  start: number,
  volatility: number
): number[] {
  const rng = mulberry32(seed);
  const series: number[] = [start];
  for (let i = 1; i < length; i++) {
    const change = (rng() - 0.48) * volatility;
    series.push(Math.max(1, series[i - 1] + change));
  }
  return series;
}
