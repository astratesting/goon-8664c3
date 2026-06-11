import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getPrediction } from "@/lib/predictions";
import { formatPrice, formatPercent } from "@/lib/format";
import { SignalChip } from "@/components/SignalChip";
import { EmptyState } from "@/components/EmptyState";
import WatchlistForm from "./WatchlistForm";
import RemoveButton from "./RemoveButton";

export default async function WatchlistPage() {
  const session = await auth();
  if (!session?.user?.id) return null;

  const items = await prisma.watchlistItem.findMany({
    where: { userId: session.user.id },
    orderBy: { addedAt: "desc" },
  });

  const enriched = items.map((item) => {
    const prediction = getPrediction(item.ticker);
    return {
      id: item.id,
      ticker: item.ticker,
      addedAt: item.addedAt,
      price: prediction?.currentPrice ?? null,
      direction: prediction?.direction ?? null,
      target: prediction?.priceTarget ?? null,
      confidence: prediction?.confidence ?? null,
    };
  });

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <WatchlistForm />

      {enriched.length === 0 ? (
        <EmptyState
          icon={
            <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          }
          title="Your watchlist is empty"
          description="Add tickers above to track predictions for stocks you care about."
        />
      ) : (
        <div className="space-y-2">
          {enriched.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-lg border border-[#E5E7EB] bg-white p-4"
            >
              <div className="flex items-center gap-4">
                <span className="inline-block rounded bg-[#EEF2F6] px-2.5 py-1 font-mono font-bold text-[#1F2937] text-sm">
                  {item.ticker}
                </span>
                {item.direction && <SignalChip direction={item.direction} />}
                {item.confidence !== null && (
                  <span className="text-xs text-[#6B7280]">
                    {(item.confidence * 100).toFixed(0)}% conf.
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4">
                {item.price !== null && (
                  <span className="text-sm font-medium text-[#1F2937]">
                    {formatPrice(item.price)}
                  </span>
                )}
                {item.target !== null && item.price !== null && (
                  <span className="text-xs text-[#98D8C8]">
                    Target {formatPrice(item.target)} (
                    {formatPercent(((item.target - item.price) / item.price) * 100)})
                  </span>
                )}
                <span className="text-xs text-[#9CA3AF]">
                  Added {new Date(item.addedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </span>
                <RemoveButton id={item.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
