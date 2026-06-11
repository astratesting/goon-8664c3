"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { formatDate } from "@/lib/utils/format";
import { StatusBadge } from "@/components/ui/StatusBadge";

interface HistoryEntry {
  id: string;
  ticker: string;
  direction: "bullish" | "bearish" | "neutral";
  priceTarget: number;
  createdAt: string;
  status: "pending" | "resolved";
  outcome?: number;
}

export function HistoryTable({ predictions }: { predictions: HistoryEntry[] }) {
  const [sortAsc, setSortAsc] = useState(false);

  const sorted = [...predictions].sort((a, b) => {
    const dA = new Date(a.createdAt).getTime();
    const dB = new Date(b.createdAt).getTime();
    return sortAsc ? dA - dB : dB - dA;
  });

  if (!sorted.length) {
    return (
      <div className="text-center py-12 text-gray-400 text-sm">
        No predictions yet. Search a ticker above to get started.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wide">Ticker</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wide">Direction</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wide">Target</th>
            <th
              className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wide cursor-pointer select-none hover:text-gray-600"
              onClick={() => setSortAsc(!sortAsc)}
            >
              Date {sortAsc ? "↑" : "↓"}
            </th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wide">Status</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wide">Outcome</th>
            <th className="py-3 px-2"></th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((p) => (
            <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
              <td className="py-3 px-4">
                <span className="font-semibold text-sky">{p.ticker}</span>
              </td>
              <td className="py-3 px-4">
                <StatusBadge variant={p.direction} />
              </td>
              <td className="py-3 px-4 tabular-nums" style={{ fontVariantNumeric: "tabular-nums" }}>
                ${p.priceTarget.toFixed(2)}
              </td>
              <td className="py-3 px-4 text-gray-500">{formatDate(p.createdAt)}</td>
              <td className="py-3 px-4">
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  p.status === "resolved"
                    ? "bg-gray-100 text-gray-600"
                    : "bg-sky/10 text-sky"
                }`}>
                  {p.status === "resolved" ? "Resolved" : "Pending"}
                </span>
              </td>
              <td className="py-3 px-4 tabular-nums" style={{ fontVariantNumeric: "tabular-nums" }}>
                {p.outcome !== undefined ? (
                  <span className={p.outcome >= 0 ? "text-emerald-600" : "text-rose-500"}>
                    {p.outcome >= 0 ? "▲" : "▼"} {Math.abs(p.outcome * 100).toFixed(1)}%
                  </span>
                ) : (
                  <span className="text-gray-400">—</span>
                )}
              </td>
              <td className="py-3 px-2">
                <Link href={`/dashboard/predictions/${p.ticker}`} className="text-gray-400 hover:text-sky transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
