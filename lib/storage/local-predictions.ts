const KEYS = {
  predictions: (userId: string) => `goon:predictions:${userId}`,
  watchlist: (userId: string) => `goon:watchlist:${userId}`,
};

export function getStoredPredictions(userId: string): unknown[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEYS.predictions(userId));
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function storePrediction(userId: string, prediction: unknown): void {
  if (typeof window === "undefined") return;
  const existing = getStoredPredictions(userId);
  const updated = [prediction, ...existing].slice(0, 100);
  localStorage.setItem(KEYS.predictions(userId), JSON.stringify(updated));
}
