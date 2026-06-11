import type { MarketIndex } from "@/types/market";
import { DeltaPill } from "./delta-pill";
import { Sparkline } from "./sparkline";

export function IndexCard({ index }: { index: MarketIndex }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 card-glow hover:shadow-md transition-all duration-150">
      <p className="text-xs text-gray-400 mb-1">{index.name}</p>
      <p
        className="text-2xl font-bold text-[#1a1a2e] mb-1 tabular-nums"
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        {index.value.toLocaleString("en-US", { minimumFractionDigits: 2 })}
      </p>
      <div className="flex items-center justify-between">
        <DeltaPill value={index.change} />
        <Sparkline data={index.sparkline} width={100} height={30} />
      </div>
    </div>
  );
}
