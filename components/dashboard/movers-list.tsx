import { TrendingUp, TrendingDown } from "lucide-react";
import type { Mover } from "@/types/market";
import Link from "next/link";

export function MoversList({
  title,
  movers,
  type,
}: {
  title: string;
  movers: Mover[];
  type: "gainers" | "losers";
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5">
      <h3 className="text-sm font-semibold text-[#1a1a2e] mb-4">{title}</h3>
      <div className="space-y-3">
        {movers.map((m) => (
          <Link
            key={m.ticker}
            href={`/dashboard/predictions/${m.ticker}`}
            className="flex items-center justify-between hover:bg-gray-50 rounded-lg px-2 py-1.5 transition-colors"
          >
            <div className="flex items-center gap-3">
              {type === "gainers" ? (
                <TrendingUp className="w-4 h-4 text-emerald-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-rose-400" />
              )}
              <div>
                <p className="text-sm font-semibold text-[#1a1a2e]">{m.ticker}</p>
                <p className="text-xs text-gray-400 truncate max-w-[140px]">{m.companyName}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-[#1a1a2e] tabular-nums" style={{ fontVariantNumeric: "tabular-nums" }}>
                ${m.price.toFixed(2)}
              </p>
              <p
                className={`text-xs tabular-nums ${type === "gainers" ? "text-emerald-600" : "text-rose-500"}`}
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {m.change >= 0 ? "+" : ""}
                {(m.change * 100).toFixed(2)}%
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
