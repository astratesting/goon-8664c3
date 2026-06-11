const features = [
  {
    title: "AI Predictions with Confidence Scores",
    description:
      "Every signal includes a probability-backed confidence score so you know exactly how strongly the model believes in a trade. Size your positions with conviction, not guesswork.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
    accent: "cobalt",
  },
  {
    title: "Alternative Data Analysis",
    description:
      "We go beyond price charts. Our models ingest executive speech patterns from earnings calls, supply chain logistics, and satellite data to build a market picture others simply can't see.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
      </svg>
    ),
    accent: "green",
  },
  {
    title: "Plain-English Explanations",
    description:
      "Every signal comes with a human-readable rationale explaining exactly why the model is bullish or bearish. No PhD required — just read and decide.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
    accent: "cobalt",
  },
  {
    title: "Real-Time Social Sentiment",
    description:
      "Our models continuously monitor social media chatter, news sentiment, and community momentum. When the crowd shifts, you'll know before the price moves.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    accent: "green",
  },
  {
    title: "No Financial Background Needed",
    description:
      "No terminal, no Bloomberg, no coding. Sign up, pick your watchlist, and get signals delivered to a clean dashboard with plain-English reasoning. Start trading with an edge in minutes.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
    accent: "cobalt",
  },
  {
    title: "SEC PDT Rule Change — Now Open",
    description:
      "The SEC removed the $25K minimum day-trading requirement in April 2026. The playing field is wide open. Now every retail trader can act on short-term signals — and Goon gives you the AI edge to do it smartly.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    accent: "green",
  },
];

const accentColors: Record<string, { bg: string; text: string; border: string }> = {
  cobalt: { bg: "bg-cobalt/10", text: "text-cobalt", border: "border-cobalt/20" },
  green: { bg: "bg-goon-green/10", text: "text-goon-green", border: "border-goon-green/20" },
};

export default function Features() {
  return (
    <section id="features" className="py-20 md:py-28 gradient-soft lattice-pattern">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4 text-white">
            Everything you need to{" "}
            <span className="text-cobalt">trade smarter</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Institutional-grade AI, built for retail traders. No experience required.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const colors = accentColors[feature.accent];
            return (
              <div
                key={feature.title}
                className="bg-white/[0.03] rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-all"
              >
                <div className={`w-12 h-12 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center mb-4 ${colors.text}`}>
                  {feature.icon}
                </div>
                <h3 className="font-heading text-lg font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
