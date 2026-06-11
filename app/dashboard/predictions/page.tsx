import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getPredictions } from "@/lib/predictions";
import { SignalChip } from "@/components/SignalChip";
import { ConfidenceBar } from "@/components/ConfidenceBar";
import { Sparkline } from "@/components/Sparkline";
import { EmptyState } from "@/components/EmptyState";
import Link from "next/link";

export default async function PredictionsPage() {
  const session = await auth();
  if (!session?.user) redirect("/auth/signin");

  const predictions = getPredictions();

  if (predictions.length === 0) {
    return (
      <EmptyState
        icon={
          <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
          </svg>
        }
        title="No predictions yet"
        description="Predictions will appear here once our models generate signals."
      />
    );
  }

  // Generate sparkline data deterministically from ticker
  function sparkData(ticker: string): number[] {
    const data: number[] = [];
    let hash = 0;
    for (let i = 0; i < ticker.length; i++) hash = ((hash << 5) - hash + ticker.charCodeAt(i)) | 0;
    for (let i = 0; i < 20; i++) {
      hash = ((hash * 16807) % 2147483647);
      data.push(50 + (hash % 50));
    }
    return data;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-[#1F2937]">Predictions</h2>
      <div className="space-y-3">
        {predictions.map((p) => (
          <Link
            key={p.ticker}
            href={`/dashboard/predictions/${p.ticker}`}
            className="flex items-center justify-between rounded-2xl border border-[#E5E7EB] bg-white p-4 transition-colors hover:border-[#7CB9E8]/30"
          >
            <div className="flex items-center gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[#1F2937]">{p.ticker}</span>
                  <SignalChip direction={p.direction} />
                </div>
                <p className="text-sm text-[#6B7280] mt-0.5">{p.company}</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-6">
              <Sparkline data={sparkData(p.ticker)} />
              <div className="w-32">
                <ConfidenceBar confidence={p.confidence / 100} />
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-[#1F2937]">${p.target.toFixed(2)}</p>
                <p className="text-xs text-[#6B7280]">
                  {p.target > p.price ? "+" : ""}
                  {(((p.target - p.price) / p.price) * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
