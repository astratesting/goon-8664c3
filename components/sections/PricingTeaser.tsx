import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    features: ["3 predictions per day", "Basic confidence scores", "Email delivery", "Community access"],
    cta: "Get started",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    features: ["Unlimited predictions", "Detailed rationale per signal", "Real-time dashboard", "Custom watchlists", "Priority model updates"],
    cta: "Start free trial",
    highlight: true,
  },
  {
    name: "Elite",
    price: "$79",
    period: "/month",
    features: ["Everything in Pro", "API access for algo integration", "Multi-timeframe analysis", "Dedicated support", "Early access to new models"],
    cta: "Start free trial",
    highlight: false,
  },
];

export default function PricingTeaser() {
  return (
    <Section id="pricing" className="bg-white">
      <Reveal>
        <p className="mb-2 text-sm font-medium text-[#1A1A2E]/50">Pricing</p>
        <h2 className="mb-4 text-3xl font-semibold leading-tight text-[#1A1A2E] md:text-4xl">
          Simple, transparent pricing
        </h2>
        <p className="mb-12 text-base text-[#1A1A2E]/60 max-w-lg">
          Institutional-grade AI at retail-friendly prices. Start free, upgrade when you&apos;re ready.
        </p>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan, i) => (
          <Reveal key={plan.name} delay={i * 80}>
            <Card
              variant={plan.highlight ? "sand" : "default"}
              className={`relative h-full ${plan.highlight ? "border-[#7CB9E8]/30 shadow-lg" : ""}`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge variant="sky">Most popular</Badge>
                </div>
              )}
              <h3 className="text-lg font-semibold text-[#1A1A2E]">{plan.name}</h3>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-[#1A1A2E]">{plan.price}</span>
                <span className="text-sm text-[#1A1A2E]/50">{plan.period}</span>
              </div>
              <ul className="mt-6 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-[#1A1A2E]/70">
                    <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#7CB9E8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <a href="/register">
                  <Button variant={plan.highlight ? "primary" : "secondary"} className="w-full">
                    {plan.cta}
                  </Button>
                </a>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
