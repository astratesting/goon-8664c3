const steps = [
  {
    number: "01",
    title: "Data Ingestion",
    description:
      "Our pipeline continuously collects historical price data, order-book snapshots, and real-time social sentiment from multiple public sources.",
    color: "sky",
  },
  {
    number: "02",
    title: "Model Inference",
    description:
      "Deep-learning models process the combined feature set — detecting patterns across price action, volume, and sentiment that human traders would miss.",
    color: "mint",
  },
  {
    number: "03",
    title: "Signal Generation",
    description:
      "When the model identifies a high-probability setup, it generates a clear buy or sell signal with a confidence score and a plain-language explanation.",
    color: "sand",
  },
  {
    number: "04",
    title: "You Decide",
    description:
      "Signals arrive in your dashboard in real time. Review the rationale, check the confidence, and decide whether to act. You stay in control.",
    color: "sky",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-28 gradient-soft">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-5xl font-bold mb-4">How it works</h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            From raw data to actionable signal in four straightforward steps.
          </p>
        </div>

        <div className="space-y-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="flex gap-6 items-start bg-white rounded-2xl p-6 md:p-8 card-glow"
            >
              <div
                className={`flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center font-serif text-lg font-bold ${
                  step.color === "sky"
                    ? "bg-sky/10 text-sky"
                    : step.color === "mint"
                    ? "bg-mint/10 text-emerald-600"
                    : "bg-sand/30 text-amber-700"
                }`}
              >
                {step.number}
              </div>
              <div>
                <h3 className="font-serif text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-500 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
