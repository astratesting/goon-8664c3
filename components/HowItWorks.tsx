const steps = [
  {
    number: "01",
    title: "Ingest Alternative Data",
    description:
      "Our pipeline continuously collects executive speech patterns, supply chain signals, social sentiment, and traditional market data from dozens of sources.",
    accent: "flame-orange",
  },
  {
    number: "02",
    title: "Deep-Learning Inference",
    description:
      "Proprietary neural networks process the combined feature set — detecting cross-signal patterns that no human trader could spot on their own.",
    accent: "magenta",
  },
  {
    number: "03",
    title: "Generate Predictions",
    description:
      "When the model identifies a high-probability setup, it generates a clear buy or sell signal weeks ahead — with a confidence score and plain-English rationale.",
    accent: "acid-green",
  },
  {
    number: "04",
    title: "You Decide",
    description:
      "Signals arrive in your dashboard in real time. Review the rationale, check the confidence, and decide whether to act. You stay in full control.",
    accent: "flame-orange",
  },
];

const accentMap: Record<string, { bg: string; text: string; border: string }> = {
  "flame-orange": { bg: "bg-flame-orange/10", text: "text-flame-orange", border: "border-flame-orange/20" },
  magenta: { bg: "bg-magenta/10", text: "text-magenta", border: "border-magenta/20" },
  "acid-green": { bg: "bg-acid-green/10", text: "text-acid-green", border: "border-acid-green/20" },
};

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-28 gradient-soft data-grid">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4 text-white">How it works</h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            From raw alternative data to actionable prediction in four straightforward steps.
          </p>
        </div>

        <div className="space-y-8">
          {steps.map((step) => {
            const colors = accentMap[step.accent];
            return (
              <div
                key={step.number}
                className="flex gap-6 items-start bg-white/[0.03] rounded-2xl p-6 md:p-8 card-glow border border-white/5"
              >
                <div className={`flex-shrink-0 w-14 h-14 rounded-2xl ${colors.bg} border ${colors.border} flex items-center justify-center`}>
                  <span className={`font-heading text-lg font-bold ${colors.text}`}>
                    {step.number}
                  </span>
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
