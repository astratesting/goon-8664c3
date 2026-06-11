"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import type { Prediction } from "@/types/prediction";
import { SignalChip } from "@/components/SignalChip";
import { ConfidenceBar } from "@/components/ConfidenceBar";
import { EmptyState } from "@/components/EmptyState";
import { formatPrice } from "@/lib/format";

interface Props {
  initialPredictions: Prediction[];
}

type Filter = "all" | "bullish" | "bearish" | "high-confidence";

function extractSignalChips(factors: string[]): { label: string; direction: "bullish" | "bearish" | "neutral" }[] {
  const bullishKeywords = ["bullish", "surge", "upward", "growth", "positive", "strong", "rally", "breakout", "momentum", "buy", "upgrade", "outperform"];
  const bearishKeywords = ["bearish", "decline", "downward", "weak", "negative", "sell-off", "rejection", "resistance", "pullback", "downgrade", "underperform", "risk"];

  return factors.map((text) => {
    const lower = text.toLowerCase();
    const hasBullish = bullishKeywords.some((k) => lower.includes(k));
    const hasBearish = bearishKeywords.some((k) => lower.includes(k));
    const label = text.length > 70 ? text.slice(0, 67) + "..." : text;

    if (hasBullish && !hasBearish) return { label, direction: "bullish" as const };
    if (hasBearish && !hasBullish) return { label, direction: "bearish" as const };
    return { label, direction: "neutral" as const };
  });
}

export default function PredictionsClient({ initialPredictions }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [filter, setFilter] = useState<Filter>(
    (searchParams.get("filter") as Filter) || "all"
  );
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = initialPredictions.filter((p) => {
    const matchesSearch =
      !search ||
      p.ticker.toUpperCase().includes(search.toUpperCase()) ||
      p.companyName.toUpperCase().includes(search.toUpperCase());

    let matchesFilter = true;
    if (filter === "bullish") matchesFilter = p.direction === "bullish";
    else if (filter === "bearish") matchesFilter = p.direction === "bearish";
    else if (filter === "high-confidence") matchesFilter = p.confidence >= 0.75;

    return matchesSearch && matchesFilter;
  });

  const updateParams = useCallback(
    (q: string, f: Filter) => {
      const params = new URLSearchParams();
      if (q) params.set("q", q);
      if (f !== "all") params.set("filter", f);
      const qs = params.toString();
      router.replace(pathname + (qs ? `?${qs}` : ""), { scroll: false });
    },
    [router, pathname]
  );

  useEffect(() => {
    updateParams(search, filter);
  }, [search, filter, updateParams]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setExpanded(null);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filterOptions: { label: string; value: Filter }[] = [
    { label: "All", value: "all" },
    { label: "Bullish", value: "bullish" },
    { label: "Bearish", value: "bearish" },
    { label: "High Confidence", value: "high-confidence" },
  ];

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Search */}
      <div>
        <input
          type="text"
          placeholder="Search a ticker — e.g. NVDA, AAPL, TSLA"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#1F2937] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#7CB9E8]/50 focus:border-[#7CB9E8]"
        />
      </div>

      {/* Filter chips */}
      <div className="flex flex-wrap gap-2">
        {filterOptions.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              filter === f.value
                ? "bg-[#7CB9E8] text-white"
                : "bg-[#EEF2F6] text-[#6B7280] hover:bg-[#E5E7EB]"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Predictions list */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          }
          title="No predictions found"
          description={
            search
              ? `No predictions match "${search}". Try a different ticker or company name.`
              : "No predictions match the selected filter."
          }
        />
      ) : (
        <div className="space-y-3">
          {filtered.map((p) => {
            const isExpanded = expanded === p.ticker;
            const signalChips = extractSignalChips(p.factors);
            const changePercent = ((p.priceTarget - p.currentPrice) / p.currentPrice) * 100;

            return (
              <div
                key={p.ticker}
                className="rounded-lg border border-[#E5E7EB] bg-white overflow-hidden"
              >
                {/* Collapsed row */}
                <button
                  onClick={() => setExpanded(isExpanded ? null : p.ticker)}
                  className="w-full text-left p-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 hover:bg-[#FAFAF5] transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <span className="inline-block rounded bg-[#EEF2F6] px-2.5 py-1 font-mono font-bold text-[#1F2937] text-sm flex-shrink-0">
                      {p.ticker}
                    </span>
                    <span className="text-sm text-[#1F2937] truncate">
                      {p.companyName}
                    </span>
                    <span className="text-sm text-[#6B7280] flex-shrink-0">
                      {formatPrice(p.currentPrice)}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 flex-shrink-0 flex-wrap">
                    <SignalChip direction={p.direction} />
                    <div className="w-24">
                      <ConfidenceBar confidence={p.confidence} />
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium text-[#1F2937]">
                        {formatPrice(p.priceTarget)}
                      </span>
                      <span
                        className={`ml-2 text-xs font-medium ${
                          changePercent >= 0 ? "text-[#98D8C8]" : "text-red-500"
                        }`}
                      >
                        {changePercent >= 0 ? "+" : ""}
                        {changePercent.toFixed(1)}%
                      </span>
                    </div>
                    <span className="text-xs text-[#6B7280] bg-[#EEF2F6] rounded px-2 py-0.5 flex-shrink-0">
                      {p.timeHorizon}
                    </span>
                    <svg
                      className={`w-4 h-4 text-[#9CA3AF] transition-transform flex-shrink-0 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {/* Expanded content */}
                {isExpanded && (
                  <div className="px-4 pb-4 border-t border-[#E5E7EB]">
                    <div className="pt-4 space-y-4">
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-[#6B7280] mb-2">
                          Reasoning
                        </h4>
                        <p className="text-sm text-[#1F2937] leading-relaxed">
                          {p.factors.join(" ")}
                        </p>
                      </div>

                      {signalChips.length > 0 && (
                        <div>
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#6B7280] mb-2">
                            Supporting signals
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {signalChips.map((chip, i) => (
                              <SignalChip
                                key={i}
                                direction={chip.direction}
                                className="text-[11px]"
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-4 text-xs text-[#6B7280]">
                        <span>
                          Updated:{" "}
                          {new Date(p.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
