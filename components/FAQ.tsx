"use client";

import { useState } from "react";

const faqs = [
  {
    question: "How accurate are Goon's AI predictions?",
    answer:
      "Our deep-learning models are trained on years of historical market data and alternative data sources. While no model can guarantee future results, our signals are probability-backed with confidence scores so you can gauge conviction levels. We never claim 100% accuracy — trading always involves risk, and you should size positions accordingly.",
  },
  {
    question: "What alternative data sources does Goon use?",
    answer:
      "Our models analyze executive speech patterns from earnings calls, supply chain logistics data, social sentiment across multiple platforms, satellite imagery, and traditional market data. This gives us signal dimensions that price charts alone cannot provide — helping surface opportunities before they show up in conventional analysis.",
  },
  {
    question: "How much does Goon cost?",
    answer:
      "Goon offers three tiers: Free ($0 forever) gives you 3 signals per day with basic confidence scores. Pro ($29/month) unlocks unlimited signals, detailed plain-English rationale, real-time dashboard, and custom watchlists. Premium ($79/month) adds API access, multi-timeframe analysis, and dedicated support. Start free and upgrade when you're ready.",
  },
  {
    question: "Is this financial advice?",
    answer:
      "No. Goon provides algorithmically generated signals based on machine-learning models for informational purposes only. It is not financial advice. You are always responsible for your own trading decisions. Trading involves risk, and past model performance does not guarantee future results. Always conduct your own research before making investment decisions.",
  },
  {
    question: "What kind of data do you use?",
    answer:
      "Our pipeline continuously collects executive speech patterns from earnings calls, supply chain logistics signals, social sentiment from multiple platforms, satellite data, and traditional market data from dozens of sources. This multi-dimensional approach lets our models detect cross-signal patterns invisible to human traders.",
  },
  {
    question: "How are signals delivered?",
    answer:
      "Signals appear in your real-time dashboard. Free-tier users also receive a daily email digest. Pro and Premium users get instant dashboard updates and can configure additional delivery preferences. You stay in control — Goon does not execute trades on your behalf.",
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/5 last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full py-5 flex items-center justify-between text-left hover:text-white transition-colors"
      >
        <span className="font-heading text-base font-bold text-white pr-4">
          {question}
        </span>
        <svg
          className={`w-5 h-5 flex-shrink-0 text-cobalt transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="pb-5 pr-8">
          <p className="text-gray-400 text-sm leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="py-20 md:py-28 gradient-soft">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4 text-white">
            Frequently asked questions
          </h2>
          <p className="text-gray-400 text-lg">
            Everything you need to know about Goon.
          </p>
        </div>

        <div className="bg-white/[0.02] rounded-2xl border border-white/5 p-6 md:p-8">
          {faqs.map((faq) => (
            <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}
