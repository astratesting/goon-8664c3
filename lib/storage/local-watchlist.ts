import type { WatchlistItem } from "@/types/watchlist";

const KEYS = {
  watchlist: (userId: string) => `goon:watchlist:${userId}`,
};

export function getStoredWatchlist(userId: string): WatchlistItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEYS.watchlist(userId));
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addToWatchlist(userId: string, item: WatchlistItem): void {
  if (typeof window === "undefined") return;
  const existing = getStoredWatchlist(userId);
  const filtered = existing.filter((w) => w.ticker !== item.ticker);
  const updated = [item, ...filtered];
  localStorage.setItem(KEYS.watchlist(userId), JSON.stringify(updated));
}

export function removeFromWatchlist(userId: string, ticker: string): void {
  if (typeof window === "undefined") return;
  const existing = getStoredWatchlist(userId);
  const updated = existing.filter((w) => w.ticker !== ticker);
  localStorage.setItem(KEYS.watchlist(userId), JSON.stringify(updated));
}

export function isInWatchlist(userId: string, ticker: string): boolean {
  if (typeof window === "undefined") return false;
  const existing = getStoredWatchlist(userId);
  return existing.some((w) => w.ticker === ticker);
}
