'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function DashboardSearch() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const ticker = query.trim().toUpperCase();
    if (ticker) {
      router.push(`/dashboard/predictions?search=${ticker}`);
      setQuery('');
      setIsOpen(false);
    }
  }

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B7280]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search ticker (e.g. AAPL, TSLA)..."
            value={query}
            onChange={(e) => setQuery(e.target.value.toUpperCase())}
            onFocus={() => setIsOpen(true)}
            onBlur={() => setTimeout(() => setIsOpen(false), 200)}
            className="w-64 rounded-lg border border-[#E5E7EB] bg-white pl-10 pr-4 py-2 text-sm text-[#1F2937] placeholder-[#9CA3AF] focus:border-[#7CB9E8] focus:outline-none focus:ring-1 focus:ring-[#7CB9E8] transition-colors"
          />
        </div>
        <button
          type="submit"
          disabled={!query.trim()}
          className="rounded-lg bg-[#7CB9E8] px-4 py-2 text-sm font-medium text-white hover:bg-[#7CB9E8]/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Search
        </button>
      </form>
    </div>
  );
}
