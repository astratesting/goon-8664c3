import type { Sector } from "@/types/market";

export function SectorBars({ sectors }: { sectors: Sector[] }) {
  const maxAbs = Math.max(...sectors.map((s) => Math.abs(s.change)), 0.01);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5">
      <h3 className="text-sm font-semibold text-[#1a1a2e] mb-4">Sector Performance</h3>
      <div className="space-y-2.5">
        {sectors.map((s) => {
          const pct = (s.change * 100).toFixed(2);
          const barWidth = (Math.abs(s.change) / maxAbs) * 100;
          const isPositive = s.change >= 0;

          return (
            <div key={s.name} className="flex items-center gap-3">
              <span className="text-xs text-gray-500 w-36 truncate">{s.name}</span>
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${isPositive ? "bg-sky" : "bg-rose-300"}`}
                  style={{ width: `${barWidth}%` }}
                />
              </div>
              <span
                className={`text-xs font-medium w-14 text-right tabular-nums ${isPositive ? "text-emerald-600" : "text-rose-500"}`}
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {isPositive ? "+" : ""}
                {pct}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
