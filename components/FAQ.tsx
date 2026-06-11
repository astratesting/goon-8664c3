"use client";

import { useState } from "react";

const faqs = [
  {
    question: "What exactly does Goon do?",
    answer:
      "Goon runs deep-learning models that analyze historical price action and live social sentiment to generate short-term trade signals. Each signal is a clear buy or sell recommendation with a confidence score and a plain-language rationale.",
  },
  {
    question: "Is this financial advice?",
    answer:
      "No. Goon provides algorithmically generated signals based on machine-learning models. It is not financial advice. You are always responsible for your own trading decisions. Past model performance does not guarantee future results.",
  },
  {
    question: "What markets and tickers do you cover?",
    answer:
      "Our initial models focus on high-volume US equities and ETFs. We plan to expand to additional markets based on user demand. Coverage details are available in the dashboard once you sign up.",
  },
  {
    question: "How are signals delivered?",
    answer:
      "Signals appear in your real-time dashboard. Free-tier users also receive a daily email digest. Pro and Elite users get instant dashboard updates and can configure additional delivery preferences.",
  },
  {
    question: "Can I use Goon with my existing broker?",
    answer:
      "Goon delivers signals to your dashboard — it does not execute trades on your behalf. You review the signal and place the trade through your own broker, maintaining full control of your account.",
  },
  {
    question: "What is your refund policy?",
    answer:
      "You can cancel your subscription at any time. If you cancel within the first 14 days of a paid plan, we will issue a full refund. After that, your access continues until the end of the current billing period.",
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left"
        aria-expanded={open}
      >
        <span className="font-serif text-lg font-semibold pr-4">{question}</span>
        <svg
          className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200 ${
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
          <p className="text-gray-500 leading-relaxed">{answer}</p>
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
          <h2 className="font-serif text-3xl md:text-5xl font-bold mb-4">
            Frequently asked questions
          </h2>
          <p className="text-gray-500 text-lg">
            Everything you need to know before getting started.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 md:p-8 card-glow">
          {faqs.map((faq) => (
            <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}
