const steps = [
  {
    number: "01",
    title: "Select your interests",
    description:
      "Sign up in seconds and pick the stocks or sectors you care about. Build a custom watchlist — no financial expertise needed.",
    accent: "cobalt",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "AI analyzes the data",
    description:
      "Our deep-learning models process alternative data — executive speech patterns, supply chain logistics, social sentiment — detecting patterns invisible to human traders.",
    accent: "green",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Get your prediction",
    description:
      "Receive a clear buy or sell signal with a confidence score and plain-English rationale — delivered to your dashboard in under 60 seconds. You stay in full control.",
    accent: "cobalt",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
];

const accentMap: Record<string, { bg: string; text: string; border: string }> = {
  cobalt: { bg: "bg-cobalt/10", text: "text-cobalt", border: "border-cobalt/20" },
  green: { bg: "bg-goon-green/10", text: "text-goon-green", border: "border-goon-green/20" },
};

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-28 gradient-soft data-grid">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4 text-white">
            From sign-up to your first prediction in{" "}
            <span className="text-goon-green">60 seconds</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Three steps. No financial background required. Just read and decide.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const colors = accentMap[step.accent];
            return (
              <div key={step.number} className="relative">
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-px bg-white/10" />
                )}
                <div className="bg-white/[0.03] rounded-2xl p-8 border border-white/5 hover:border-white/10 transition-all text-center relative">
                  <div className={`w-16 h-16 rounded-2xl ${colors.bg} border ${colors.border} flex items-center justify-center mx-auto mb-6 ${colors.text}`}>
                    {step.icon}
                  </div>
                  <div className={`font-heading text-xs font-bold uppercase tracking-widest mb-3 ${colors.text}`}>
                    Step {step.number}
                  </div>
                  <h3 className="font-heading text-xl font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Timer accent */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 bg-white/[0.03] border border-white/5 rounded-full px-6 py-3">
            <svg className="w-5 h-5 text-goon-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm text-gray-300 font-medium">
              Average time to first prediction: <span className="text-goon-green font-bold">47 seconds</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
