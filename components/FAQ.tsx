"use client";

import { useState } from "react";

const faqs = [
  {
    question: "What exactly does Goon do?",
    answer:
      "Goon runs deep-learning models that analyze alternative data — executive speech patterns, supply chain logistics, social sentiment — to generate stock price predictions weeks ahead. Each prediction comes with a clear buy or sell signal, a confidence score, and a plain-English explanation.",
  },
  {
    question: "Is this financial advice?",
    answer:
      "No. Goon provides algorithmically generated signals based on machine-learning models. It is not financial advice. You are always responsible for your own trading decisions. Past model performance does not guarantee future results.",
  },
  {
    question: "What kind of alternative data do you use?",
    answer:
      "Our models analyze executive speech patterns from earnings calls, supply chain logistics data, social sentiment from multiple platforms, satellite imagery, and traditional market data. This gives us signals that price charts alone cannot provide.",
  },
  {
    question: "How far ahead can Goon predict?",
    answer:
      "Our models are designed to forecast price movements weeks in advance, not just days. This gives you time to research, plan entries, and manage risk — rather than chasing intraday noise.",
  },
  {
    question: "How are signals delivered?",
    answer:
      "Signals appear in your real-time dashboard. Free-tier users also receive a daily email digest. Pro and Premium users get instant dashboard updates and can configure additional delivery preferences.",
  },
  {
    question: "Can I use Goon with my existing broker?",
    answer:
      "Goon delivers signals to your dashboard — it does not execute trades on your behalf. You review the signal and place the trade through your own broker, maintaining full control of your account.",
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
          className={`w-5 h-5 flex-shrink-0 text-flame-orange transition-transform duration-200 ${
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
