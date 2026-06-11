"use client";

import { Star } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/toast";
import {
  getStoredWatchlist,
  addToWatchlist,
  removeFromWatchlist,
} from "@/lib/storage/local-watchlist";
import { generateWatchlistItem } from "@/lib/mock/watchlist";

export function StarButton({
  ticker,
  companyName,
}: {
  ticker: string;
  companyName: string;
}) {
  const [starred, setStarred] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const items = getStoredWatchlist("anonymous");
    setStarred(items.some((w) => w.ticker === ticker));
  }, [ticker]);

  const toggle = () => {
    if (starred) {
      removeFromWatchlist("anonymous", ticker);
      setStarred(false);
      toast(`${ticker} removed from watchlist`, "info");
    } else {
      const item = generateWatchlistItem(ticker);
      addToWatchlist("anonymous", item);
      setStarred(true);
      toast(`${ticker} added to your watchlist`, "success");
    }
  };

  return (
    <button
      onClick={toggle}
      className={`p-2 rounded-xl transition-all duration-150 ${
        starred
          ? "text-amber-500 hover:text-amber-600 bg-amber-50"
          : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
      }`}
      aria-label={starred ? "Remove from watchlist" : "Add to watchlist"}
    >
      <Star
        className="w-5 h-5"
        fill={starred ? "currentColor" : "none"}
      />
    </button>
  );
}
