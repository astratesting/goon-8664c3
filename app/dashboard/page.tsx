import { auth } from "@/lib/auth";
import { getWatchlistItems, getWatchlistCount } from "@/lib/db";
import { getTopPredictions, getMarketSentiment, getAccuracy, getSignalsTodayCount } from "@/lib/predictions";
import { getPortfolioValue, getHoldings } from "@/lib/portfolio";
import { formatPrice, formatPercent } from "@/lib/format";
import { StatTile } from "@/components/StatTile";
import { SignalChip } from "@/components/SignalChip";
import { ConfidenceBar } from "@/components/ConfidenceBar";
import Link from "next/link";
import { DashboardSearch } from "@/components/DashboardSearch";

export default async function DashboardPage() {
  const session = await auth();
  const name = session?.user?.name?.split(" ")[0] || "there";

  const predictions = getTopPredictions(5);
  const sentiment = getMarketSentiment();
  const accuracy = getAccuracy();
  const signalsToday = getSignalsTodayCount();
  const holdings = getHoldings();
  const portfolioValue = getPortfolioValue(holdings);

  const watchlistCount = getWatchlistCount(session!.user.id);

  const topWatchlist = getWatchlistItems(session!.user.id).slice(0, 3);

  const watchlistWithPredictions = topWatchlist.map((item) => {
    const pred = getTopPredictions(50).find(
      (p) => p.ticker.toUpperCase() === item.ticker.toUpperCase()
    );
    return {
      id: item.id,
      ticker: item.ticker,
      price: pred?.currentPrice ?? 0,
      direction: pred?.direction ?? "neutral",
      change: pred ? ((pred.priceTarget - pred.currentPrice) / pred.currentPrice) * 100 : 0,
    };
  });

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Welcome */}
      <div className="rounded-lg border border-[#E5E7EB] bg-white p-6">
        <h1 className="text-2xl font-semibold text-[#1F2937]">
          Good morning, {name}
        </h1>
        <p className="text-sm text-[#6B7280] mt-1">{today}</p>
        <p className="text-sm text-[#6B7280] mt-2">
          Markets are cautiously optimistic today.
        </p>
      </div>

      {/* Search bar */}
      <DashboardSearch />

      {/* Stat tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatTile
          label="Prediction Accuracy"
          value={`${(accuracy * 100).toFixed(1)}%`}
          delta="+2.1% vs last week"
        />
        <StatTile
          label="Signals Today"
          value={String(signalsToday)}
          delta="Active signals"
        />
        <StatTile
          label="Watchlist Items"
          value={String(watchlistCount)}
          delta={`${watchlistCount} tracked`}
        />
        <StatTile
          label="Portfolio Value"
          value={formatPrice(portfolioValue)}
          delta={formatPercent(((portfolioValue - 43000) / 43000) * 100)}
        />
      </div>

      {/* Two-column: Predictions + Sentiment */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 rounded-lg border border-[#E5E7EB] bg-white p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[#1F2937]">
              Top predictions for today
            </h2>
            <Link
              href="/dashboard/predictions"
              className="text-sm text-[#7CB9E8] hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#E5E7EB]">
                  <th className="text-left py-3 px-2 text-[#6B7280] font-medium">Ticker</th>
                  <th className="text-left py-3 px-2 text-[#6B7280] font-medium">Company</th>
                  <th className="text-left py-3 px-2 text-[#6B7280] font-medium">Direction</th>
                  <th className="text-left py-3 px-2 text-[#6B7280] font-medium">Confidence</th>
                  <th className="text-right py-3 px-2 text-[#6B7280] font-medium">Target</th>
                </tr>
              </thead>
              <tbody>
                {predictions.map((p) => (
                  <tr
                    key={p.ticker}
                    className="border-b border-[#E5E7EB] last:border-0"
                  >
                    <td className="py-3 px-2">
                      <span className="inline-block rounded bg-[#EEF2F6] px-2 py-0.5 font-mono font-bold text-[#1F2937] text-xs">
                        {p.ticker}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-[#1F2937]">{p.companyName}</td>
                    <td className="py-3 px-2">
                      <SignalChip direction={p.direction} />
                    </td>
                    <td className="py-3 px-2 w-32">
                      <ConfidenceBar confidence={p.confidence} />
                    </td>
                    <td className="py-3 px-2 text-right font-medium text-[#1F2937]">
                      {formatPrice(p.priceTarget)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="lg:col-span-4 rounded-lg border border-[#E5E7EB] bg-white p-6">
          <h2 className="text-lg font-semibold text-[#1F2937] mb-4">
            Market sentiment
          </h2>
          <div className="flex flex-col items-center justify-center py-6">
            <div className="relative w-32 h-32">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#EEF2F6"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke={
                    sentiment.score >= 55
                      ? "#98D8C8"
                      : sentiment.score >= 45
                      ? "#E8D5B7"
                      : "#E8D5B7"
                  }
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${(sentiment.score / 100) * 251.3} 251.3`}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-[#1F2937]">
                  {sentiment.score}
                </span>
                <span className="text-xs text-[#6B7280]">/ 100</span>
              </div>
            </div>
            <p className="mt-4 text-sm font-medium text-[#1F2937]">
              {sentiment.label}
            </p>
            <p className="text-xs text-[#6B7280] mt-1">
              Based on {predictions.length}+ predictions
            </p>
          </div>
        </div>
      </div>

      {/* Two-column: Watchlist + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 rounded-lg border border-[#E5E7EB] bg-white p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[#1F2937]">
              Your watchlist
            </h2>
            <Link
              href="/dashboard/watchlist"
              className="text-sm text-[#7CB9E8] hover:underline"
            >
              View all
            </Link>
          </div>
          {watchlistWithPredictions.length === 0 ? (
            <p className="text-sm text-[#6B7280] py-4">
              No items in your watchlist yet.
            </p>
          ) : (
            <div className="space-y-3">
              {watchlistWithPredictions.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-2 border-b border-[#E5E7EB] last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-block rounded bg-[#EEF2F6] px-2 py-0.5 font-mono font-bold text-[#1F2937] text-xs">
                      {item.ticker}
                    </span>
                    <span
                      className={`text-xs font-medium ${
                        item.change >= 0 ? "text-[#98D8C8]" : "text-red-500"
                      }`}
                    >
                      {item.change >= 0 ? "+" : ""}
                      {item.change.toFixed(2)}%
                    </span>
                  </div>
                  <span className="text-sm font-medium text-[#1F2937]">
                    {formatPrice(item.price)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-6 rounded-lg border border-[#E5E7EB] bg-white p-6">
          <h2 className="text-lg font-semibold text-[#1F2937] mb-4">
            Recent activity
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="mt-1 h-2 w-2 rounded-full bg-[#7CB9E8]" />
              <div>
                <p className="text-sm text-[#1F2937]">
                  {signalsToday} new predictions generated
                </p>
                <p className="text-xs text-[#6B7280]">Today</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 h-2 w-2 rounded-full bg-[#98D8C8]" />
              <div>
                <p className="text-sm text-[#1F2937]">
                  Market sentiment shifted to {sentiment.label.toLowerCase()}
                </p>
                <p className="text-xs text-[#6B7280]">Today</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 h-2 w-2 rounded-full bg-[#E8D5B7]" />
              <div>
                <p className="text-sm text-[#1F2937]">
                  Prediction accuracy at {(accuracy * 100).toFixed(1)}%
                </p>
                <p className="text-xs text-[#6B7280]">This week</p>
              </div>
            </div>
          </div>
          <Link
            href="/dashboard/predictions"
            className="inline-block mt-4 text-sm text-[#7CB9E8] hover:underline"
          >
            View recent predictions
          </Link>
        </div>
      </div>
    </div>
  );
}
