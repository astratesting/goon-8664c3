import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Explore Goon with limited daily signals.",
    features: [
      "3 signals per day",
      "Basic confidence scores",
      "Email delivery",
      "Community access",
    ],
    cta: "Get started free",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "Full signal access for active day traders.",
    features: [
      "Unlimited signals",
      "Detailed rationale for each signal",
      "Real-time dashboard",
      "Priority model updates",
      "Custom watchlists",
    ],
    cta: "Start free trial",
    highlight: true,
  },
  {
    name: "Elite",
    price: "$79",
    period: "/month",
    description: "Everything in Pro plus advanced tooling.",
    features: [
      "Everything in Pro",
      "API access for algo integration",
      "Multi-timeframe analysis",
      "Dedicated support",
      "Early access to new models",
    ],
    cta: "Start free trial",
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-5xl font-bold mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Institutional-grade AI at retail-friendly prices. Start free, upgrade when you are ready.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-7 transition-all duration-300 ${
                plan.highlight
                  ? "bg-white border-2 border-sky/40 card-glow ring-1 ring-sky/10 scale-[1.02]"
                  : "bg-softwhite border border-gray-100 hover:border-gray-200"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="gradient-sky-mint text-white text-xs font-semibold px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-serif text-xl font-semibold mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="font-serif text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-400 text-sm">{plan.period}</span>
                </div>
                <p className="text-sm text-gray-500">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <svg className="w-5 h-5 text-mint flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/auth/signup"
                className={`block text-center py-3 px-6 rounded-xl font-semibold text-sm transition-opacity ${
                  plan.highlight
                    ? "gradient-sky-mint text-white hover:opacity-90"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
