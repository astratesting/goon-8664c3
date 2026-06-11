'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const POPULAR_TICKERS = [
  { symbol: 'AAPL', name: 'Apple Inc.' },
  { symbol: 'TSLA', name: 'Tesla Inc.' },
  { symbol: 'MSFT', name: 'Microsoft Corp.' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.' },
  { symbol: 'NVDA', name: 'NVIDIA Corp.' },
  { symbol: 'META', name: 'Meta Platforms Inc.' },
  { symbol: 'NFLX', name: 'Netflix Inc.' },
  { symbol: 'SPY', name: 'SPDR S&P 500 ETF' },
  { symbol: 'QQQ', name: 'Invesco QQQ Trust' },
];

export default function OnboardingStep1() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string[]>([]);

  const filtered = POPULAR_TICKERS.filter(
    (t) =>
      t.symbol.toLowerCase().includes(search.toLowerCase()) ||
      t.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleTicker = (symbol: string) => {
    setSelected((prev) =>
      prev.includes(symbol)
        ? prev.filter((s) => s !== symbol)
        : prev.length < 3
        ? [...prev, symbol]
        : prev
    );
  };

  const handleContinue = () => {
    if (selected.length === 0) return;
    localStorage.setItem('onboarding_tickers', JSON.stringify(selected));
    router.push('/onboarding/experience');
  };

  const handleSkip = () => {
    localStorage.setItem('onboarding_tickers', JSON.stringify(['AAPL']));
    router.push('/onboarding/experience');
  };

  return (
    <div className="space-y-8">
      {/* Progress indicator */}
      <div className="flex items-center gap-2">
        <div className="h-2 w-12 rounded-full bg-[#22c55e]" />
        <div className="h-2 w-12 rounded-full bg-[#1e293b]" />
        <div className="h-2 w-12 rounded-full bg-[#1e293b]" />
      </div>

      <div>
        <h1 className="font-['IBM_Plex_Sans'] text-3xl font-bold text-white">
          What stocks interest you?
        </h1>
        <p className="mt-2 text-[#94a3b8]">
          Pick 1–3 tickers to get your first AI-powered predictions.
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tickers (e.g. AAPL, TSLA)..."
          className="w-full rounded-xl border border-[#1e293b] bg-[#1e293b]/50 px-4 py-3 text-white placeholder-[#64748b] focus:border-[#22c55e] focus:outline-none focus:ring-1 focus:ring-[#22c55e]"
        />
      </div>

      {/* Selected chips */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selected.map((s) => (
            <span
              key={s}
              className="inline-flex items-center gap-1 rounded-full bg-[#22c55e]/20 px-3 py-1 text-sm font-medium text-[#22c55e]"
            >
              {s}
              <button
                onClick={() => toggleTicker(s)}
                className="ml-1 text-[#22c55e]/70 hover:text-[#22c55e]"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Ticker grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {filtered.map((t) => (
          <button
            key={t.symbol}
            onClick={() => toggleTicker(t.symbol)}
            className={`rounded-xl border p-4 text-left transition-all ${
              selected.includes(t.symbol)
                ? 'border-[#22c55e] bg-[#22c55e]/10'
                : 'border-[#1e293b] bg-[#1e293b]/30 hover:border-[#334155]'
            }`}
          >
            <div className="font-['IBM_Plex_Sans'] text-lg font-bold text-white">
              {t.symbol}
            </div>
            <div className="mt-1 text-xs text-[#64748b]">{t.name}</div>
          </button>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4">
        <button
          onClick={handleSkip}
          className="text-sm text-[#64748b] hover:text-white transition-colors"
        >
          Skip →
        </button>
        <button
          onClick={handleContinue}
          disabled={selected.length === 0}
          className="rounded-xl bg-[#22c55e] px-6 py-3 font-semibold text-black transition-all hover:bg-[#22c55e]/90 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
