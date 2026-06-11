import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getPrediction } from "@/lib/predictions";
import { notFound } from "next/navigation";
import { SignalChip } from "@/components/SignalChip";
import { ConfidenceBar } from "@/components/ConfidenceBar";
import Card from "@/components/ui/Card";

export default async function PredictionDetailPage({
  params,
}: {
  params: Promise<{ ticker: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect("/auth/signin");

  const { ticker } = await params;
  const prediction = getPrediction(ticker);
  if (!prediction) notFound();

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-[#1F2937]">{prediction.ticker}</h1>
          <SignalChip direction={prediction.direction} />
        </div>
        <p className="text-sm text-[#6B7280] mt-1">{prediction.companyName}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <p className="text-sm text-[#6B7280] mb-1">Current Price</p>
          <p className="text-2xl font-semibold text-[#1F2937]">${prediction.currentPrice.toFixed(2)}</p>
        </Card>
        <Card>
          <p className="text-sm text-[#6B7280] mb-1">Price Target</p>
          <p className="text-2xl font-semibold text-[#1F2937]">${prediction.priceTarget.toFixed(2)}</p>
          <p className="text-xs text-[#6B7280] mt-1">
            {prediction.priceTarget > prediction.currentPrice ? "+" : ""}
            {(((prediction.priceTarget - prediction.currentPrice) / prediction.currentPrice) * 100).toFixed(1)}% potential
          </p>
        </Card>
        <Card>
          <p className="text-sm text-[#6B7280] mb-1">Confidence</p>
          <p className="text-2xl font-semibold text-[#1F2937]">{prediction.confidence}%</p>
          <ConfidenceBar confidence={prediction.confidence / 100} className="mt-2" />
        </Card>
      </div>

      <Card>
        <h2 className="text-lg font-semibold text-[#1F2937] mb-3">Reasoning</h2>
        <ul className="space-y-2">
          {prediction.factors.map((r: string, i: number) => (
            <li key={i} className="flex items-start gap-2">
              <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#7CB9E8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-[#6B7280]">{r}</p>
            </li>
          ))}
        </ul>
      </Card>

      <p className="text-xs text-[#9CA3AF] text-center">
        Updated {new Date(prediction.createdAt).toLocaleString()} — this is not financial advice.
      </p>
    </div>
  );
}
