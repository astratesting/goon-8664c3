'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const RISK_OPTIONS = [
  { value: 'conservative', label: 'Conservative', desc: 'Preserve capital, steady gains', icon: '🛡️' },
  { value: 'moderate', label: 'Moderate', desc: 'Balanced risk and reward', icon: '⚖️' },
  { value: 'aggressive', label: 'Aggressive', desc: 'Maximum growth potential', icon: '🚀' },
];

const SECTOR_OPTIONS = [
  { value: 'tech', label: 'Technology' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'finance', label: 'Finance' },
  { value: 'energy', label: 'Energy' },
  { value: 'consumer', label: 'Consumer' },
];

const STYLE_OPTIONS = [
  { value: 'day-trading', label: 'Day Trading', desc: 'Quick in-and-out moves', icon: '⚡' },
  { value: 'swing', label: 'Swing Trading', desc: 'Days to weeks hold time', icon: '📊' },
  { value: 'long-term', label: 'Long-Term', desc: 'Months to years horizon', icon: '🌱' },
];

const LOADING_MESSAGES = [
  'Calibrating AI models to your profile\u2026',
  'Scanning market data\u2026',
  'Analyzing sentiment signals\u2026',
  'Generating your first prediction\u2026',
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

type Step = 'risk' | 'sectors' | 'style' | 'loading' | 'result';

const STEP_INDEX: Record<Step, number> = { risk: 0, sectors: 1, style: 2, loading: 3, result: 3 };

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('risk');
  const [riskTolerance, setRiskTolerance] = useState('');
  const [sectors, setSectors] = useState<string[]>([]);
  const [investmentStyle, setInvestmentStyle] = useState('');
  const [loadingMsg, setLoadingMsg] = useState(0);
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [error, setError] = useState('');

  const progress = step === 'risk' ? 33 : step === 'sectors' ? 66 : step === 'style' ? 100 : 100;

  function toggleSector(val: string) {
    setSectors((prev) =>
      prev.includes(val) ? prev.filter((s) => s !== val) : [...prev, val]
    );
  }

  async function savePreferences() {
    try {
      await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ riskTolerance, sectors, investmentStyle }),
      });
    } catch {
      // non-critical
    }
  }

  async function generatePrediction() {
    setStep('loading');
    setLoadingMsg(0);

    const msgInterval = setInterval(() => {
      setLoadingMsg((i) => (i + 1) % LOADING_MESSAGES.length);
    }, 1000);

    // Pick a ticker based on user preferences for a more personalized feel
    const sectorTickers: Record<string, string[]> = {
      tech: ['AAPL', 'MSFT', 'NVDA', 'GOOGL', 'META'],
      healthcare: ['JNJ', 'UNH', 'PFE', 'ABBV', 'LLY'],
      finance: ['JPM', 'BAC', 'V', 'MA', 'GS'],
      energy: ['XOM'],
      consumer: ['AMZN', 'NFLX', 'COST', 'NKE', 'KO'],
    };

    const pool = sectors.length > 0
      ? sectors.flatMap((s) => sectorTickers[s] || [])
      : ['AAPL', 'TSLA', 'NVDA', 'MSFT', 'AMZN'];
    const ticker = pool[Math.floor(Math.random() * pool.length)] || 'AAPL';

    try {
      const res = await fetch(`/api/predictions/${ticker}`);
      if (!res.ok) throw new Error('Failed to generate prediction');
      const data: Prediction = await res.json();
      clearInterval(msgInterval);
      setPrediction(data);

      // Save preferences in parallel
      await savePreferences();

      setStep('result');
    } catch {
      clearInterval(msgInterval);
      setError('Something went wrong. Please try again.');
      setStep('style');
    }
  }

  const isBullish = prediction?.predictedDirection === 'bullish';
  const companyName = prediction ? (TICKER_NAMES[prediction.ticker] || prediction.ticker) : '';

  return (
    <div className="min-h-screen bg-[#0f172a]">
      <div className="mx-auto max-w-xl px-4 py-12">
        {/* Brand */}
        <Link href="/" className="mb-8 block text-center text-2xl font-semibold text-white">
          Goon
        </Link>

        {/* Progress bar — only show on preference steps */}
        {(step === 'risk' || step === 'sectors' || step === 'style') && (
          <div className="mb-10">
            <div className="flex justify-between mb-2">
              <span className="text-xs text-[#94a3b8]">
                Step {STEP_INDEX[step] + 1} of 3
              </span>
              <span className="text-xs text-[#94a3b8]">
                {progress}%
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#1e293b]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#FF6B35] to-[#E91E8C] transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* ── Step: Risk Tolerance ── */}
        {step === 'risk' && (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-white" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
                How do you feel about risk?
              </h1>
              <p className="mt-2 text-[#94a3b8]">
                This helps us tailor predictions to your comfort level.
              </p>
            </div>

            <div className="space-y-3">
              {RISK_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setRiskTolerance(opt.value)}
                  className={`w-full flex items-center gap-4 rounded-xl border px-5 py-4 text-left transition-all ${
                    riskTolerance === opt.value
                      ? 'border-[#FF6B35] bg-[#FF6B35]/10 shadow-[0_0_20px_rgba(255,107,53,0.15)]'
                      : 'border-[#1e293b] bg-[#1e293b]/30 hover:border-[#334155]'
                  }`}
                >
                  <span className="text-2xl">{opt.icon}</span>
                  <div>
                    <p className="font-semibold text-white">{opt.label}</p>
                    <p className="text-sm text-[#94a3b8]">{opt.desc}</p>
                  </div>
                  {riskTolerance === opt.value && (
                    <svg className="ml-auto h-5 w-5 text-[#FF6B35]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep('sectors')}
              disabled={!riskTolerance}
              className="w-full rounded-xl bg-[#FF6B35] py-4 text-lg font-semibold text-white transition-all hover:bg-[#FF6B35]/90 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </div>
        )}

        {/* ── Step: Sectors ── */}
        {step === 'sectors' && (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-white" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
                Which sectors interest you?
              </h1>
              <p className="mt-2 text-[#94a3b8]">
                Pick one or more — we&apos;ll prioritize predictions in these areas.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {SECTOR_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => toggleSector(opt.value)}
                  className={`rounded-xl border px-6 py-3.5 text-sm font-semibold transition-all ${
                    sectors.includes(opt.value)
                      ? 'border-[#E91E8C] bg-[#E91E8C]/15 text-[#E91E8C] shadow-[0_0_20px_rgba(233,30,140,0.15)]'
                      : 'border-[#1e293b] bg-[#1e293b]/30 text-[#94a3b8] hover:border-[#334155] hover:text-white'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep('risk')}
                className="flex-1 rounded-xl border border-[#1e293b] py-4 text-sm font-medium text-[#94a3b8] transition-all hover:border-[#334155]"
              >
                Back
              </button>
              <button
                onClick={() => setStep('style')}
                disabled={sectors.length === 0}
                className="flex-[2] rounded-xl bg-[#FF6B35] py-4 text-lg font-semibold text-white transition-all hover:bg-[#FF6B35]/90 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* ── Step: Investment Style ── */}
        {step === 'style' && (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-white" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
                What&apos;s your trading style?
              </h1>
              <p className="mt-2 text-[#94a3b8]">
                We&apos;ll adjust time horizons to match how you trade.
              </p>
            </div>

            {error && (
              <p className="text-center text-sm text-red-400">{error}</p>
            )}

            <div className="space-y-3">
              {STYLE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setInvestmentStyle(opt.value)}
                  className={`w-full flex items-center gap-4 rounded-xl border px-5 py-4 text-left transition-all ${
                    investmentStyle === opt.value
                      ? 'border-[#E91E8C] bg-[#E91E8C]/10 shadow-[0_0_20px_rgba(233,30,140,0.15)]'
                      : 'border-[#1e293b] bg-[#1e293b]/30 hover:border-[#334155]'
                  }`}
                >
                  <span className="text-2xl">{opt.icon}</span>
                  <div>
                    <p className="font-semibold text-white">{opt.label}</p>
                    <p className="text-sm text-[#94a3b8]">{opt.desc}</p>
                  </div>
                  {investmentStyle === opt.value && (
                    <svg className="ml-auto h-5 w-5 text-[#E91E8C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep('sectors')}
                className="flex-1 rounded-xl border border-[#1e293b] py-4 text-sm font-medium text-[#94a3b8] transition-all hover:border-[#334155]"
              >
                Back
              </button>
              <button
                onClick={generatePrediction}
                disabled={!investmentStyle}
                className="flex-[2] rounded-xl bg-gradient-to-r from-[#FF6B35] to-[#E91E8C] py-4 text-lg font-semibold text-white transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Generate My First Prediction
              </button>
            </div>
          </div>
        )}

        {/* ── Step: Loading ── */}
        {step === 'loading' && (
          <div className="flex flex-col items-center gap-8 py-16">
            {/* Animated spinner */}
            <div className="relative h-24 w-24">
              <div className="absolute inset-0 animate-spin rounded-full border-4 border-[#1e293b] border-t-[#FF6B35]" />
              <div className="absolute inset-3 animate-spin rounded-full border-4 border-[#1e293b] border-b-[#E91E8C]" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="h-8 w-8 text-[#FF6B35]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>

            <div className="h-8">
              <p key={loadingMsg} className="animate-pulse text-lg text-[#94a3b8]">
                {LOADING_MESSAGES[loadingMsg]}
              </p>
            </div>

            <div className="h-1.5 w-64 overflow-hidden rounded-full bg-[#1e293b]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#FF6B35] to-[#E91E8C] transition-all duration-1000"
                style={{ width: `${Math.min(90, (loadingMsg + 1) * 22)}%` }}
              />
            </div>
          </div>
        )}

        {/* ── Step: Result ── */}
        {step === 'result' && prediction && (
          <div className="space-y-8">
            {/* Success header */}
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#FF6B35]/20">
                <svg className="h-8 w-8 text-[#FF6B35]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-white" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
                You&apos;re all set!
              </h1>
              <p className="mt-2 text-[#94a3b8]">
                Here&apos;s your first AI prediction, personalized just for you.
              </p>
            </div>

            {/* Prediction card */}
            <div className="rounded-2xl border border-[#1e293b] bg-[#1e293b]/40 overflow-hidden">
              {/* Gradient header */}
              <div className="bg-gradient-to-r from-[#FF6B35] to-[#E91E8C] p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
                      {prediction.ticker}
                    </h2>
                    <p className="text-sm text-white/80">{companyName}</p>
                  </div>
                  <span className={`rounded-full px-4 py-1.5 text-sm font-bold bg-white/20 text-white`}>
                    {isBullish ? '\u25B2 BULLISH' : '\u25BC BEARISH'}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Stats grid */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="rounded-xl bg-[#0f172a] p-4 text-center">
                    <p className="text-xs uppercase tracking-wider text-[#64748b]">Current</p>
                    <p className="mt-1 text-lg font-bold text-white" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
                      ${prediction.currentPrice.toFixed(2)}
                    </p>
                  </div>
                  <div className="rounded-xl bg-[#0f172a] p-4 text-center">
                    <p className="text-xs uppercase tracking-wider text-[#64748b]">7-Day Target</p>
                    <p className={`mt-1 text-lg font-bold ${isBullish ? 'text-[#98D8C8]' : 'text-red-400'}`} style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
                      ${prediction.priceTarget.toFixed(2)}
                    </p>
                  </div>
                  <div className="rounded-xl bg-[#0f172a] p-4 text-center">
                    <p className="text-xs uppercase tracking-wider text-[#64748b]">Confidence</p>
                    <p className="mt-1 text-lg font-bold text-white" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
                      {prediction.confidence}%
                    </p>
                  </div>
                </div>

                {/* Confidence bar */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-[#64748b]">Confidence</span>
                    <span className="text-xs text-[#64748b]">{prediction.confidence}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-[#0f172a]">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${prediction.confidence > 80 ? 'bg-[#98D8C8]' : prediction.confidence > 70 ? 'bg-[#E8D5B7]' : 'bg-red-400'}`}
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
                        <span className={`mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full ${isBullish ? 'bg-[#98D8C8]' : 'bg-red-400'}`} />
                        {factor}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <button
                onClick={() => router.push('/dashboard')}
                className="w-full rounded-xl bg-gradient-to-r from-[#FF6B35] to-[#E91E8C] py-4 text-lg font-semibold text-white transition-all hover:opacity-90"
              >
                Go to Dashboard
              </button>
              <button
                onClick={() => {
                  setStep('risk');
                  setPrediction(null);
                  setRiskTolerance('');
                  setSectors([]);
                  setInvestmentStyle('');
                  setError('');
                }}
                className="w-full rounded-xl border border-[#1e293b] py-3 text-sm font-medium text-[#94a3b8] transition-all hover:border-[#FF6B35] hover:text-[#FF6B35]"
              >
                Get Another Prediction
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
