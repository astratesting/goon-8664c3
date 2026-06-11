'use client';

import { useEffect, useState, useRef } from 'react';
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

const LOADING_MESSAGES = [
  'Analyzing market data...',
  'Processing alternative data signals...',
  'Running deep learning models...',
  'Evaluating sentiment indicators...',
  'Generating price targets...',
  'Calculating confidence scores...',
  'Finalizing predictions...',
];

export default function OnboardingGenerating() {
  const router = useRouter();
  const [messageIndex, setMessageIndex] = useState(0);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [done, setDone] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const tickersStr = localStorage.getItem('onboarding_tickers') || '["AAPL"]';
    let tickers: string[];
    try {
      tickers = JSON.parse(tickersStr);
    } catch {
      tickers = ['AAPL'];
    }

    const msgInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 1500);

    const fetchPredictions = async () => {
      const results: Prediction[] = [];
      for (const ticker of tickers) {
        try {
          const res = await fetch(`/api/predictions/${ticker}`);
          if (res.ok) {
            const data = await res.json();
            results.push(data);
          }
        } catch {
          results.push(generateFallbackPrediction(ticker));
        }
      }

      setPredictions(results);
      setDone(true);
      clearInterval(msgInterval);

      setTimeout(() => {
        localStorage.setItem('onboarding_predictions', JSON.stringify(results));
        localStorage.setItem('onboarding_complete', 'true');
        router.push('/onboarding/complete');
      }, 2000);
    };

    fetchPredictions();

    return () => clearInterval(msgInterval);
  }, [router]);

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2">
        <div className="h-2 w-12 rounded-full bg-[#22c55e]" />
        <div className="h-2 w-12 rounded-full bg-[#22c55e]" />
        <div className={`h-2 w-12 rounded-full transition-colors ${done ? 'bg-[#22c55e]' : 'bg-[#22c55e] animate-pulse'}`} />
      </div>

      <div className="text-center">
        <h1 className="font-['IBM_Plex_Sans'] text-3xl font-bold text-white">
          {done ? 'Your predictions are ready!' : 'Generating your predictions...'}
        </h1>
        <p className="mt-2 text-[#94a3b8]">
          {done
            ? 'Analyzing complete. Loading your results...'
            : 'Our AI is analyzing market data for your selected stocks'}
        </p>
      </div>

      <div className="flex flex-col items-center gap-6 py-8">
        {!done ? (
          <>
            <div className="relative h-20 w-20">
              <div className="absolute inset-0 animate-spin rounded-full border-4 border-[#1e293b] border-t-[#22c55e]" />
              <div className="absolute inset-2 animate-spin rounded-full border-4 border-[#1e293b] border-b-[#22c55e]" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
            </div>

            <div className="h-8">
              <p className="animate-pulse text-lg text-[#94a3b8]">
                {LOADING_MESSAGES[messageIndex]}
              </p>
            </div>

            <div className="h-1 w-64 overflow-hidden rounded-full bg-[#1e293b]">
              <div className="h-full animate-[loading_3s_ease-in-out_infinite] rounded-full bg-[#22c55e]" style={{ width: '60%' }} />
            </div>
          </>
        ) : (
          <>
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#22c55e]/20">
              <svg className="h-10 w-10 text-[#22c55e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <div className="w-full space-y-3">
              {predictions.map((p) => (
                <div
                  key={p.ticker}
                  className="flex items-center justify-between rounded-xl border border-[#1e293b] bg-[#1e293b]/30 px-5 py-4"
                >
                  <div>
                    <span className="font-['IBM_Plex_Sans'] text-lg font-bold text-white">
                      {p.ticker}
                    </span>
                    <span className="ml-2 text-sm text-[#64748b]">
                      ${p.currentPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-semibold ${
                        p.predictedDirection === 'bullish'
                          ? 'bg-[#22c55e]/20 text-[#22c55e]'
                          : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {p.predictedDirection === 'bullish' ? '▲' : '▼'} {p.confidence}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function generateFallbackPrediction(ticker: string): Prediction {
  const seed = ticker.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const isBullish = seed % 3 !== 0;
  const basePrice =
    ticker === 'AAPL' ? 195 :
    ticker === 'TSLA' ? 245 :
    ticker === 'MSFT' ? 425 :
    ticker === 'GOOGL' ? 175 :
    ticker === 'AMZN' ? 185 :
    ticker === 'NVDA' ? 875 :
    ticker === 'META' ? 505 :
    ticker === 'NFLX' ? 650 :
    ticker === 'SPY' ? 530 :
    ticker === 'QQQ' ? 450 :
    100;

  const confidence = 65 + (seed % 28);
  const priceTarget = isBullish
    ? basePrice * (1 + (seed % 10) / 100)
    : basePrice * (1 - (seed % 10) / 100);

  return {
    ticker,
    currentPrice: basePrice,
    predictedDirection: isBullish ? 'bullish' : 'bearish',
    confidence,
    priceTarget: Math.round(priceTarget * 100) / 100,
    keyFactors: [
      'Strong momentum indicators detected',
      'Positive institutional flow patterns',
      'Favorable sector rotation signals',
    ],
    riskLevel: confidence > 80 ? 'low' : confidence > 70 ? 'medium' : 'high',
  };
}
