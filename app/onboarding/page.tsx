'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const POPULAR = ['AAPL', 'TSLA', 'MSFT', 'GOOGL', 'AMZN', 'NVDA', 'META', 'NFLX'];

const TICKER_NAMES: Record<string, string> = {
  AAPL: 'Apple Inc.',
  TSLA: 'Tesla Inc.',
  MSFT: 'Microsoft Corp.',
  GOOGL: 'Alphabet Inc.',
  AMZN: 'Amazon.com Inc.',
  NVDA: 'NVIDIA Corp.',
  META: 'Meta Platforms Inc.',
  NFLX: 'Netflix Inc.',
  SPY: 'SPDR S&P 500 ETF',
  QQQ: 'Invesco QQQ Trust',
};

const LOADING_STEPS = [
  'Crunching market data\u2026',
  'Analyzing sentiment\u2026',
  'Running prediction models\u2026',
  'Evaluating alternative data\u2026',
  'Generating your prediction\u2026',
];

interface Prediction {
  ticker: string;
  currentPrice: number;
  predictedDirection: 'bullish' | 'bearish';
  confidence: number;
  priceTarget: number;
  keyFactors: string[];
  riskLevel: string;
  generatedAt?: string;
}

type Phase = 'input' | 'loading' | 'result';

export default function OnboardingPage() {
  const router = useRouter();
  const [ticker, setTicker] = useState('');
  const [phase, setPhase] = useState<Phase>('input');
  const [stepIndex, setStepIndex] = useState(0);
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const sym = ticker.trim().toUpperCase();
    if (!sym) return;

    setError('');
    setPhase('loading');
    setStepIndex(0);

    // Cycle loading messages
    const interval = setInterval(() => {
      setStepIndex((i) => (i + 1) % LOADING_STEPS.length);
    }, 1200);

    try {
      const res = await fetch(`/api/predictions/${sym}`);
      if (!res.ok) throw new Error('Prediction not available for this ticker');
      const data: Prediction = await res.json();
      clearInterval(interval);
      setPrediction(data);
      setPhase('result');
    } catch (err: unknown) {
      clearInterval(interval);
      setPhase('input');
      setError(err instanceof Error ? err.message : 'Something went wrong. Try another ticker.');
    }
  };

  const handleQuickPick = (sym: string) => {
    setTicker(sym);
    setError('');
  };

  const isBullish = prediction?.predictedDirection === 'bullish';
  const companyName = prediction ? (TICKER_NAMES[prediction.ticker] || prediction.ticker) : '';

  return (
    <div className="min-h-screen bg-[#0f172a]">
      <div className="mx-auto max-w-xl px-4 py-16">
        {/* Brand */}
        <p className="mb-10 text-center text-2xl font-semibold text-white">
          Goon
        </p>

        {/* ── Phase: Input ── */}
        {phase === 'input' && (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-white" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
                What stock are you interested in?
              </h1>
              <p className="mt-2 text-[#94a3b8]">
                Enter a ticker and get your first AI prediction in seconds.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={ticker}
                  onChange={(e) => { setTicker(e.target.value.toUpperCase()); setError(''); }}
                  placeholder="e.g. AAPL, TSLA"
                  maxLength={6}
                  className="w-full rounded-xl border border-[#1e293b] bg-[#1e293b]/50 px-5 py-4 text-center text-2xl font-bold tracking-wider text-white placeholder-[#64748b] focus:border-[#22c55e] focus:outline-none focus:ring-1 focus:ring-[#22c55e]"
                />
              </div>

              {error && (
                <p className="text-center text-sm text-red-400">{error}</p>
              )}

              <button
                type="submit"
                disabled={!ticker.trim()}
                className="w-full rounded-xl bg-[#22c55e] py-4 text-lg font-semibold text-black transition-all hover:bg-[#22c55e]/90 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Get Prediction
              </button>
            </form>

            {/* Quick picks */}
            <div>
              <p className="mb-3 text-center text-xs uppercase tracking-wider text-[#64748b]">
                Popular picks
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {POPULAR.map((sym) => (
                  <button
                    key={sym}
                    onClick={() => handleQuickPick(sym)}
                    className="rounded-lg border border-[#1e293b] bg-[#1e293b]/30 px-3 py-1.5 text-sm font-medium text-[#94a3b8] transition-all hover:border-[#22c55e] hover:text-[#22c55e]"
                  >
                    {sym}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Phase: Loading ── */}
        {phase === 'loading' && (
          <div className="flex flex-col items-center gap-8 py-12">
            {/* Spinner */}
            <div className="relative h-24 w-24">
              <div className="absolute inset-0 animate-spin rounded-full border-4 border-[#1e293b] border-t-[#22c55e]" />
              <div className="absolute inset-3 animate-spin rounded-full border-4 border-[#1e293b] border-b-[#22c55e]" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-bold text-white">{ticker.trim().toUpperCase()}</span>
              </div>
            </div>

            {/* Stepping messages */}
            <div className="h-8">
              <p key={stepIndex} className="animate-pulse text-lg text-[#94a3b8]">
                {LOADING_STEPS[stepIndex]}
              </p>
            </div>

            {/* Progress bar */}
            <div className="h-1 w-64 overflow-hidden rounded-full bg-[#1e293b]">
              <div className="h-full rounded-full bg-[#22c55e] transition-all duration-1000" style={{ width: `${Math.min(90, (stepIndex + 1) * 18)}%` }} />
            </div>
          </div>
        )}

        {/* ── Phase: Result ── */}
        {phase === 'result' && prediction && (
          <div className="space-y-8">
            {/* Success header */}
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#22c55e]/20">
                <svg className="h-8 w-8 text-[#22c55e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-white" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
                Your prediction is ready!
              </h1>
            </div>

            {/* Prediction card */}
            <div className="rounded-2xl border border-[#1e293b] bg-[#1e293b]/40 p-6">
              {/* Header row */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
                    {prediction.ticker}
                  </h2>
                  <p className="text-sm text-[#64748b]">{companyName}</p>
                </div>
                <span className={`rounded-full px-4 py-1.5 text-sm font-bold ${isBullish ? 'bg-[#22c55e]/20 text-[#22c55e]' : 'bg-red-500/20 text-red-400'}`}>
                  {isBullish ? '\u25B2 BULLISH' : '\u25BC BEARISH'}
                </span>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="rounded-xl bg-[#0f172a] p-4 text-center">
                  <p className="text-xs uppercase tracking-wider text-[#64748b]">Current Price</p>
                  <p className="mt-1 text-xl font-bold text-white" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
                    ${prediction.currentPrice.toFixed(2)}
                  </p>
                </div>
                <div className="rounded-xl bg-[#0f172a] p-4 text-center">
                  <p className="text-xs uppercase tracking-wider text-[#64748b]">7-Day Target</p>
                  <p className={`mt-1 text-xl font-bold ${isBullish ? 'text-[#22c55e]' : 'text-red-400'}`} style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
                    ${prediction.priceTarget.toFixed(2)}
                  </p>
                </div>
                <div className="rounded-xl bg-[#0f172a] p-4 text-center">
                  <p className="text-xs uppercase tracking-wider text-[#64748b]">Confidence</p>
                  <p className="mt-1 text-xl font-bold text-white" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
                    {prediction.confidence}%
                  </p>
                </div>
              </div>

              {/* Confidence gauge */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-[#64748b]">Confidence</span>
                  <span className="text-xs text-[#64748b]">{prediction.confidence}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-[#0f172a]">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${prediction.confidence > 80 ? 'bg-[#22c55e]' : prediction.confidence > 70 ? 'bg-yellow-400' : 'bg-red-400'}`}
                    style={{ width: `${prediction.confidence}%` }}
                  />
                </div>
              </div>

              {/* Key factors */}
              <div>
                <p className="mb-2 text-xs uppercase tracking-wider text-[#64748b]">Key Factors</p>
                <ul className="space-y-2">
                  {prediction.keyFactors.map((factor, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#94a3b8]">
                      <span className={`mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full ${isBullish ? 'bg-[#22c55e]' : 'bg-red-400'}`} />
                      {factor}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <button
                onClick={() => router.push('/dashboard')}
                className="w-full rounded-xl bg-[#22c55e] py-4 text-lg font-semibold text-black transition-all hover:bg-[#22c55e]/90"
              >
                Go to Dashboard
              </button>
              <button
                onClick={() => { setPhase('input'); setPrediction(null); setTicker(''); }}
                className="w-full rounded-xl border border-[#1e293b] py-3 text-sm font-medium text-[#94a3b8] transition-all hover:border-[#22c55e] hover:text-[#22c55e]"
              >
                Try another ticker
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
