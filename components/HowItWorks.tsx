const steps = [
  {
    number: "01",
    title: "Data Ingestion",
    description:
      "Our pipeline continuously collects historical price data, order-book snapshots, and real-time social sentiment from multiple public sources.",
    color: "indigo",
  },
  {
    number: "02",
    title: "Model Inference",
    description:
      "Deep-learning models process the combined feature set — detecting patterns across price action, volume, and sentiment that human traders would miss.",
    color: "cyan",
  },
  {
    number: "03",
    title: "Signal Generation",
    description:
      "When the model identifies a high-probability setup, it generates a clear buy or sell signal with a confidence score and a plain-language explanation.",
    color: "teal",
  },
  {
    number: "04",
    title: "You Decide",
    description:
      "Signals arrive in your dashboard in real time. Review the rationale, check the confidence, and decide whether to act. You stay in control.",
    color: "indigo",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-28 gradient-soft data-grid">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4 text-white">How it works</h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            From raw data to actionable signal in four straightforward steps.
          </p>
        </div>

        <div className="space-y-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="flex gap-6 items-start bg-white/[0.03] rounded-2xl p-6 md:p-8 card-glow border border-white/5"
            >
              <div
                className={`flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center font-mono text-lg font-bold ${
                  step.color === "indigo"
                    ? "bg-indigo/10 text-indigo"
                    : step.color === "cyan"
                    ? "bg-cyan/10 text-cyan"
                    : "bg-electric-teal/10 text-electric-teal"
                }`}
              >
                {step.number}
              </div>
              <div>
                <h3 className="font-heading text-xl font-semibold mb-2 text-white">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
