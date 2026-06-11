export function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function hashString(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash + str.charCodeAt(i)) & 0xffffffff;
  }
  return Math.abs(hash);
}

export function generateSeries(rng: () => number, length: number, start: number, volatility: number): number[] {
  const series = [start];
  for (let i = 1; i < length; i++) {
    const change = (rng() - 0.48) * volatility;
    series.push(Math.max(1, series[i - 1] + change));
  }
  return series;
}
