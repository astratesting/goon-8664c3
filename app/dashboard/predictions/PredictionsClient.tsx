"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SignalChip from "@/components/SignalChip";
import ConfidenceBar from "@/components/ConfidenceBar";
import Sparkline from "@/components/Sparkline";
import EmptyState from "@/components/EmptyState";

interface PredictionItem {
  ticker: string;
  name: string;
  direction: "bullish" | "bearish" | "neutral";
  confidence: number;
  priceTarget: number;
  currentPrice: number;
  sparklineData: number[];
}

export default function PredictionsClient() {
  const [predictions, setPredictions] = useState<PredictionItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/predictions")
      .then((r) => r.json())
      .then((data) => {
        setPredictions(data.predictions || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-20 rounded-lg border border-[#E5E7EB] bg-white animate-pulse" />
        ))}
      </div>
    );
  }

  if (predictions.length === 0) {
    return (
      <EmptyState
        icon={
          <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
          </svg>
        }
        title="No predictions yet"
        description="Predictions will appear here once our models generate signals for your watchlist."
      />
    );
  }

  return (
    <div className="space-y-3">
      {predictions.map((p) => (
        <Link
          key={p.ticker}
          href={`/dashboard/predictions/${p.ticker}`}
          className="flex items-center justify-between rounded-lg border border-[#E5E7EB] bg-white p-4 transition-colors hover:border-[#7CB9E8]/30"
        >
          <div className="flex items-center gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#1F2937]">{p.ticker}</span>
                <SignalChip direction={p.direction} />
              </div>
              <p className="text-sm text-[#6B7280] mt-0.5">{p.name}</p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-6">
            <Sparkline data={p.sparklineData} />
            <div className="w-32">
              <ConfidenceBar value={p.confidence} />
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-[#1F2937]">${p.priceTarget.toFixed(2)}</p>
              <p className="text-xs text-[#6B7280]">
                {p.priceTarget > p.currentPrice ? "+" : ""}
                {(((p.priceTarget - p.currentPrice) / p.currentPrice) * 100).toFixed(1)}%
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
