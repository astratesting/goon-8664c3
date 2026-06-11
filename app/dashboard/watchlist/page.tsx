"use client";

import { useEffect, useState } from "react";
import SignalChip from "@/components/SignalChip";
import ConfidenceBar from "@/components/ConfidenceBar";
import EmptyState from "@/components/EmptyState";
import { useSession } from "next-auth/react";

interface WatchlistItem {
  id: string;
  ticker: string;
  addedAt: string;
}

export default function WatchlistPage() {
  const { data: session } = useSession();
  const [items, setItems] = useState<WatchlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [ticker, setTicker] = useState("");
  const [adding, setAdding] = useState(false);

  async function loadWatchlist() {
    try {
      const res = await fetch("/api/watchlist");
      const data = await res.json();
      setItems(data.items || []);
    } catch {
      // ignore
    }
    setLoading(false);
  }

  useEffect(() => {
    loadWatchlist();
  }, []);

  async function addTicker(e: React.FormEvent) {
    e.preventDefault();
    if (!ticker.trim()) return;
    setAdding(true);
    try {
      await fetch("/api/watchlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticker: ticker.trim().toUpperCase() }),
      });
      setTicker("");
      await loadWatchlist();
    } catch {
      // ignore
    }
    setAdding(false);
  }

  async function removeTicker(id: string) {
    await fetch(`/api/watchlist?id=${id}`, { method: "DELETE" });
    await loadWatchlist();
  }

  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-16 rounded-lg border border-[#E5E7EB] bg-white animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <form onSubmit={addTicker} className="flex gap-3">
        <input
          type="text"
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
          placeholder="Add ticker (e.g. AAPL)"
          className="flex-1 rounded-lg border border-[#D1D5DB] px-3 py-2.5 text-sm text-[#1F2937] placeholder-[#9CA3AF] focus:outline-none focus:border-[#7CB9E8] focus:ring-1 focus:ring-[#7CB9E8]"
        />
        <button
          type="submit"
          disabled={adding}
          className="rounded-lg bg-[#1A1A2E] text-white px-5 py-2.5 text-sm font-medium hover:bg-[#1A1A2E]/90 transition-colors disabled:opacity-50"
        >
          {adding ? "Adding..." : "Add"}
        </button>
      </form>

      {items.length === 0 ? (
        <EmptyState
          icon={
            <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          }
          title="Your watchlist is empty"
          description="Add tickers to track predictions for stocks you care about."
        />
      ) : (
        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-lg border border-[#E5E7EB] bg-white p-4"
            >
              <div className="flex items-center gap-3">
                <span className="font-semibold text-[#1F2937]">{item.ticker}</span>
                <span className="text-xs text-[#9CA3AF]">
                  Added {new Date(item.addedAt).toLocaleDateString()}
                </span>
              </div>
              <button
                onClick={() => removeTicker(item.id)}
                className="text-sm text-[#9CA3AF] hover:text-red-500 transition-colors"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
