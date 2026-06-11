import { auth } from "@/lib/auth";
import { getHoldings, getPortfolioValue, getPortfolioCost, getDailyPnL, getTotalReturn, generatePortfolioSeries } from "@/lib/portfolio";
import { formatPrice, formatPercent, formatLargeNumber } from "@/lib/format";
import { StatTile } from "@/components/StatTile";
import { EmptyState } from "@/components/EmptyState";
import PortfolioChart from "./PortfolioChart";
import Link from "next/link";

export default async function PortfolioPage() {
  const session = await auth();
  if (!session?.user?.id) return null;

  const holdings = getHoldings();
  const totalValue = getPortfolioValue(holdings);
  const totalCost = getPortfolioCost(holdings);
  const dailyPnL = getDailyPnL();
  const totalReturn = getTotalReturn(holdings);
  const series = await generatePortfolioSeries(session.user.id);

  if (holdings.length === 0) {
    return (
      <div className="p-6 lg:p-8">
        <EmptyState
          icon={
            <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
            </svg>
          }
          title="No portfolio items"
          description="Add holdings from your predictions to track your portfolio performance."
          action={
            <Link
              href="/dashboard/predictions"
              className="rounded-lg bg-[#7CB9E8] px-4 py-2 text-sm font-medium text-white hover:bg-[#7CB9E8]/90 transition-colors"
            >
              Browse predictions
            </Link>
          }
        />
      </div>
    );
  }

  const returnPct = totalCost > 0 ? ((totalValue - totalCost) / totalCost) * 100 : 0;

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Stat tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatTile
          label="Portfolio Value"
          value={formatPrice(totalValue)}
          delta={formatPercent(returnPct)}
        />
        <StatTile
          label="Total Cost"
          value={formatPrice(totalCost)}
          delta={`${holdings.length} positions`}
        />
        <StatTile
          label="Daily P&L"
          value={formatPrice(dailyPnL)}
          delta={dailyPnL >= 0 ? "Up today" : "Down today"}
        />
        <StatTile
          label="Total Return"
          value={formatPrice(totalReturn)}
          delta={formatPercent(returnPct)}
        />
      </div>

      {/* Chart */}
      <div className="rounded-lg border border-[#E5E7EB] bg-white p-6">
        <h2 className="text-lg font-semibold text-[#1F2937] mb-4">
          Portfolio performance
        </h2>
        <PortfolioChart data={series} />
      </div>

      {/* Holdings table */}
      <div className="rounded-lg border border-[#E5E7EB] bg-white p-6">
        <h2 className="text-lg font-semibold text-[#1F2937] mb-4">
          Holdings
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E5E7EB]">
                <th className="text-left py-3 px-2 text-[#6B7280] font-medium">Ticker</th>
                <th className="text-right py-3 px-2 text-[#6B7280] font-medium">Shares</th>
                <th className="text-right py-3 px-2 text-[#6B7280] font-medium">Avg Cost</th>
                <th className="text-right py-3 px-2 text-[#6B7280] font-medium">Market Value</th>
                <th className="text-right py-3 px-2 text-[#6B7280] font-medium">P&L</th>
              </tr>
            </thead>
            <tbody>
              {holdings.map((h) => {
                const marketValue = h.shares * h.avgCost;
                const costBasis = h.shares * h.avgCost;
                const pnl = marketValue - costBasis;
                return (
                  <tr
                    key={h.ticker}
                    className="border-b border-[#E5E7EB] last:border-0"
                  >
                    <td className="py-3 px-2">
                      <span className="inline-block rounded bg-[#EEF2F6] px-2 py-0.5 font-mono font-bold text-[#1F2937] text-xs">
                        {h.ticker}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-right text-[#1F2937]">
                      {formatLargeNumber(h.shares)}
                    </td>
                    <td className="py-3 px-2 text-right text-[#1F2937]">
                      {formatPrice(h.avgCost)}
                    </td>
                    <td className="py-3 px-2 text-right font-medium text-[#1F2937]">
                      {formatPrice(marketValue)}
                    </td>
                    <td className={`py-3 px-2 text-right font-medium ${pnl >= 0 ? "text-[#98D8C8]" : "text-red-500"}`}>
                      {pnl >= 0 ? "+" : ""}
                      {formatPrice(pnl)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
