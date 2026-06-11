'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Prediction {
  ticker: string;
  currentPrice: number;
  predictedDirection: 'bullish' | 'bearish';
  confidence: number;
  priceTarget: number;
  keyFactors: string[];
  riskLevel: 'low' | 'medium' | 'high';
}

export default function OnboardingComplete() {
  const router = useRouter();
  const [predictions, setPredictions] = useState<Prediction[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('onboarding_predictions');
    if (stored) {
      try {
        setPredictions(JSON.parse(stored));
      } catch {
        setPredictions([]);
      }
    }
  }, []);

  const handleGoToDashboard = () => {
    router.push('/dashboard');
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2">
        <div className="h-2 w-12 rounded-full bg-[#22c55e]" />
        <div className="h-2 w-12 rounded-full bg-[#22c55e]" />
        <div className="h-2 w-12 rounded-full bg-[#22c55e]" />
      </div>

      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#22c55e]/20">
          <svg className="h-8 w-8 text-[#22c55e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="font-['IBM_Plex_Sans'] text-3xl font-bold text-white">
          You&apos;re all set!
        </h1>
        <p className="mt-2 text-[#94a3b8]">
          Your first AI predictions are ready. Here&apos;s what Goon found for you.
        </p>
      </div>

      {predictions.length > 0 && (
        <div className="space-y-4">
          {predictions.map((p) => (
            <div
              key={p.ticker}
              className="rounded-xl border border-[#1e293b] bg-[#1e293b]/30 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="font-['IBM_Plex_Sans'] text-xl font-bold text-white">
                    {p.ticker}
                  </span>
                  <span className="ml-3 text-[#64748b]">
                    ${p.currentPrice.toFixed(2)}
                  </span>
                </div>
                <span
                  className={`rounded-full px-4 py-1.5 text-sm font-bold ${
                    p.predictedDirection === 'bullish'
                      ? 'bg-[#22c55e]/20 text-[#22c55e]'
                      : 'bg-red-500/20 text-red-400'
                  }`}
                >
                  {p.predictedDirection === 'bullish' ? '▲ BULLISH' : '▼ BEARISH'}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <div className="text-xs text-[#64748b] uppercase tracking-wider">Confidence</div>
                  <div className="mt-1 font-['IBM_Plex_Sans'] text-lg font-bold text-white">
                    {p.confidence}%
                  </div>
                </div>
                <div>
                  <div className="text-xs text-[#64748b] uppercase tracking-wider">7-Day Target</div>
                  <div className="mt-1 font-['IBM_Plex_Sans'] text-lg font-bold text-white">
                    ${p.priceTarget.toFixed(2)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-[#64748b] uppercase tracking-wider">Risk</div>
                  <div
                    className={`mt-1 font-['IBM_Plex_Sans'] text-lg font-bold ${
                      p.riskLevel === 'low'
                        ? 'text-[#22c55e]'
                        : p.riskLevel === 'medium'
                        ? 'text-yellow-400'
                        : 'text-red-400'
                    }`}
                  >
                    {p.riskLevel.toUpperCase()}
                  </div>
                </div>
              </div>

              <div>
                <div className="text-xs text-[#64748b] uppercase tracking-wider mb-2">Key Factors</div>
                <ul className="space-y-1">
                  {p.keyFactors.map((factor, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#94a3b8]">
                      <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#22c55e]" />
                      {factor}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-center pt-4">
        <button
          onClick={handleGoToDashboard}
          className="rounded-xl bg-[#22c55e] px-8 py-4 font-semibold text-black transition-all hover:bg-[#22c55e]/90 text-lg"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}
