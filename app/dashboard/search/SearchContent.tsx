"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Search, TrendingUp, TrendingDown, Minus } from "lucide-react";

type StockResult = {
  ticker: string;
  company: string;
  basePrice: number;
  prediction: {
    direction: string;
    confidence: number;
    priceTarget: number;
    currentPrice: number;
  } | null;
};

export function SearchContent() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<StockResult[]>([]);
  const [loading, setLoading] = useState(false);

  const search = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/stocks?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setResults(data);
    } catch {
      setResults([]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => search(query), 300);
    return () => clearTimeout(timer);
  }, [query, search]);

  function DirectionIcon({ dir }: { dir: string }) {
    if (dir === "bullish")
      return <TrendingUp className="h-4 w-4 text-emerald-500" />;
    if (dir === "bearish")
      return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <Minus className="h-4 w-4 text-gray-400" />;
  }

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Search input */}
      <div className="relative max-w-xl">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9CA3AF]" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by ticker or company name..."
          className="w-full rounded-xl border border-[#E5E7EB] bg-white pl-10 pr-4 py-3 text-sm text-[#1F2937] placeholder-[#9CA3AF] focus:border-[#7CB9E8] focus:outline-none focus:ring-1 focus:ring-[#7CB9E8]"
          autoFocus
        />
      </div>

      {/* Results */}
      {loading && (
        <p className="text-sm text-[#6B7280]">Searching...</p>
      )}

      {!loading && query && results.length === 0 && (
        <p className="text-sm text-[#6B7280]">
          No results found for &ldquo;{query}&rdquo;
        </p>
      )}

      {results.length > 0 && (
        <div className="space-y-2">
          {results.map((stock) => (
            <Link
              key={stock.ticker}
              href={`/dashboard/predictions/${stock.ticker}`}
              className="flex items-center justify-between rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 hover:border-[#7CB9E8]/40 hover:shadow-sm transition-all"
            >
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-[#1F2937] font-mono">
                  {stock.ticker}
                </span>
                <span className="text-sm text-[#6B7280]">{stock.company}</span>
              </div>
              <div className="flex items-center gap-4">
                {stock.prediction && (
                  <>
                    <span className="text-sm font-medium text-[#1F2937]">
                      ${stock.prediction.currentPrice.toFixed(2)}
                    </span>
                    <div className="flex items-center gap-1">
                      <DirectionIcon dir={stock.prediction.direction} />
                      <span className="text-xs text-[#6B7280]">
                        {stock.prediction.confidence}%
                      </span>
                    </div>
                  </>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Default: show popular tickers */}
      {!query && (
        <div>
          <h3 className="text-sm font-medium text-[#6B7280] mb-3">
            Popular tickers
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {[
              "AAPL",
              "MSFT",
              "GOOGL",
              "AMZN",
              "NVDA",
              "TSLA",
              "META",
              "AMD",
              "NFLX",
              "JPM",
              "V",
              "SPY",
            ].map((t) => (
              <Link
                key={t}
                href={`/dashboard/predictions/${t}`}
                className="rounded-lg border border-[#E5E7EB] bg-white px-3 py-2 text-sm font-mono font-medium text-[#1F2937] hover:border-[#7CB9E8]/40 hover:shadow-sm transition-all text-center"
              >
                {t}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
