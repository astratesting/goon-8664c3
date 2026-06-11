"use client";

import { useState } from "react";
import { addToWatchlist } from "./actions";

export default function WatchlistForm() {
  const [ticker, setTicker] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!ticker.trim()) return;
    setPending(true);
    setError(null);
    try {
      await addToWatchlist(ticker.trim());
      setTicker("");
    } catch {
      setError("Failed to add ticker. It may already be in your watchlist.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-3">
      <input
        type="text"
        value={ticker}
        onChange={(e) => setTicker(e.target.value.toUpperCase())}
        placeholder="Enter ticker (e.g. AAPL)"
        className="rounded-lg border border-[#E5E7EB] px-4 py-2 text-sm font-mono focus:border-[#98D8C8] focus:outline-none focus:ring-1 focus:ring-[#98D8C8]"
        disabled={pending}
      />
      <button
        type="submit"
        disabled={pending || !ticker.trim()}
        className="rounded-lg bg-[#1F2937] px-4 py-2 text-sm font-medium text-white hover:bg-[#374151] disabled:opacity-50"
      >
        {pending ? "Adding..." : "Add"}
      </button>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </form>
  );
}
