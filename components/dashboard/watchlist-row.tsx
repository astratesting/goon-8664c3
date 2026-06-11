"use client";

import Link from "next/link";
import { X } from "lucide-react";
import type { WatchlistItem } from "@/types/watchlist";
import { TickerPill } from "./ticker-pill";
import { DeltaPill } from "./delta-pill";
import { Badge } from "@/components/ui/badge";
import { Sparkline } from "./sparkline";

export function WatchlistRow({
  item,
  onRemove,
}: {
  item: WatchlistItem;
  onRemove: (ticker: string) => void;
}) {
  return (
    <div className="flex items-center gap-4 bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-md transition-all duration-150 group">
      <Link href={`/dashboard/predictions/${item.ticker}`} className="flex-1 flex items-center gap-4">
        <TickerPill ticker={item.ticker} />
        <span className="text-sm text-gray-500 hidden sm:block">{item.companyName}</span>
        <div className="ml-auto flex items-center gap-4">
          <span className="font-bold text-[#1a1a2e] tabular-nums" style={{ fontVariantNumeric: "tabular-nums" }}>
            ${item.currentPrice.toFixed(2)}
          </span>
          <DeltaPill value={item.dailyChange} size="sm" />
          <Badge variant={item.prediction} />
          <Sparkline data={item.sparkline} width={80} height={24} className="hidden md:block" />
        </div>
      </Link>
      <button
        onClick={(e) => {
          e.preventDefault();
          onRemove(item.ticker);
        }}
        className="p-1.5 rounded-lg text-gray-300 hover:text-rose-500 hover:bg-rose-50 transition-all opacity-0 group-hover:opacity-100"
        aria-label={`Remove ${item.ticker}`}
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
