"use client";

import Link from "next/link";
import { TrendingUp, TrendingDown, Minus, Sparkles, ArrowUpRight } from "lucide-react";
import type { Prediction } from "@/types/prediction";
import { TickerPill } from "./ticker-pill";
import { DeltaPill } from "./delta-pill";
import { ConfidenceRing } from "./confidence-ring";

export function PredictionCard({ prediction }: { prediction: Prediction }) {
  const { ticker, companyName, direction, confidence, priceTarget, timeHorizon, currentPrice, delta, factors } = prediction;

  const directionConfig = {
    bullish: { icon: TrendingUp, label: "Bullish", color: "text-emerald-600", bg: "bg-emerald-50" },
    bearish: { icon: TrendingDown, label: "Bearish", color: "text-rose-500", bg: "bg-rose-50" },
    neutral: { icon: Minus, label: "Neutral", color: "text-gray-500", bg: "bg-gray-50" },
  };

  const config = directionConfig[direction];
  const DirIcon = config.icon;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 card-glow transition-all duration-150 hover:shadow-md">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <TickerPill ticker={ticker} size="lg" />
          <span className="text-gray-500 text-sm">{companyName}</span>
        </div>
        <ConfidenceRing value={confidence} />
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className={`w-12 h-12 rounded-xl ${config.bg} flex items-center justify-center`}>
          <DirIcon className={`w-6 h-6 ${config.color}`} />
        </div>
        <span className={`text-2xl font-bold ${config.color}`}>{config.label}</span>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-400 mb-1">Price Target</p>
          <p className="text-lg font-bold text-[#1a1a2e] tabular-nums" style={{ fontVariantNumeric: "tabular-nums" }}>
            ${priceTarget.toFixed(2)}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-400 mb-1">Time Horizon</p>
          <p className="text-sm font-medium text-[#1a1a2e]">{timeHorizon}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400 mb-1">Current Price</p>
          <p className="text-lg font-bold text-[#1a1a2e] tabular-nums" style={{ fontVariantNumeric: "tabular-nums" }}>
            ${currentPrice.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="mb-6">
        <DeltaPill value={delta} />
      </div>

      <div className="bg-gray-50 rounded-xl p-4 mb-4">
        <p className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wide">Why we think this</p>
        <ul className="space-y-2">
          {factors.map((f, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
              <Sparkles className="w-4 h-4 text-sky flex-shrink-0 mt-0.5" />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </div>

      <Link
        href={`/dashboard/predictions/${ticker}`}
        className="inline-flex items-center gap-1 text-sm font-medium text-sky hover:underline"
      >
        View details <ArrowUpRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
