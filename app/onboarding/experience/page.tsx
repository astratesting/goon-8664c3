'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const EXPERIENCE_LEVELS = [
  {
    value: 'beginner',
    label: 'Beginner',
    description: 'New to trading, learning the basics',
    icon: '🌱',
  },
  {
    value: 'intermediate',
    label: 'Intermediate',
    description: 'Some experience, trade regularly',
    icon: '📈',
  },
  {
    value: 'advanced',
    label: 'Advanced',
    description: 'Experienced trader, know the markets',
    icon: '🎯',
  },
];

export default function OnboardingStep2() {
  const router = useRouter();
  const [level, setLevel] = useState('');

  const handleContinue = () => {
    if (!level) return;
    localStorage.setItem('onboarding_experience', level);
    router.prefetch('/onboarding/generating');
    router.push('/onboarding/generating');
  };

  const handleSkip = () => {
    localStorage.setItem('onboarding_experience', 'intermediate');
    router.push('/onboarding/generating');
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2">
        <div className="h-2 w-12 rounded-full bg-[#22c55e]" />
        <div className="h-2 w-12 rounded-full bg-[#22c55e]" />
        <div className="h-2 w-12 rounded-full bg-[#1e293b]" />
      </div>

      <div>
        <h1 className="font-['IBM_Plex_Sans'] text-3xl font-bold text-white">
          What&apos;s your experience level?
        </h1>
        <p className="mt-2 text-[#94a3b8]">
          We&apos;ll tailor predictions and explanations to your skill level.
        </p>
      </div>

      <div className="space-y-3">
        {EXPERIENCE_LEVELS.map((exp) => (
          <button
            key={exp.value}
            onClick={() => setLevel(exp.value)}
            className={`flex w-full items-center gap-4 rounded-xl border p-5 text-left transition-all ${
              level === exp.value
                ? 'border-[#22c55e] bg-[#22c55e]/10'
                : 'border-[#1e293b] bg-[#1e293b]/30 hover:border-[#334155]'
            }`}
          >
            <span className="text-2xl">{exp.icon}</span>
            <div>
              <div className="font-['IBM_Plex_Sans'] text-lg font-bold text-white">
                {exp.label}
              </div>
              <div className="text-sm text-[#64748b]">{exp.description}</div>
            </div>
            {level === exp.value && (
              <div className="ml-auto h-5 w-5 rounded-full bg-[#22c55e] flex items-center justify-center">
                <svg className="h-3 w-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4">
        <button
          onClick={handleSkip}
          className="text-sm text-[#64748b] hover:text-white transition-colors"
        >
          Skip →
        </button>
        <button
          onClick={handleContinue}
          disabled={!level}
          className="rounded-xl bg-[#22c55e] px-6 py-3 font-semibold text-black transition-all hover:bg-[#22c55e]/90 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Generate My Predictions
        </button>
      </div>
    </div>
  );
}
