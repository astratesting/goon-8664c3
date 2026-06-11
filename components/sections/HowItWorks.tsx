import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";

const steps = [
  {
    num: "01",
    title: "Connect what you watch",
    body: "Pick the tickers or sectors you care about. Goon builds a custom watch context around your interests.",
  },
  {
    num: "02",
    title: "Goon reads the market",
    body: "Our deep-learning model fuses historical price action with live social sentiment to identify emerging patterns.",
  },
  {
    num: "03",
    title: "You get a clear call",
    body: "A probability, a direction, a plain-English explanation, and a risk level — everything you need, nothing you don't.",
  },
];

export default function HowItWorks() {
  return (
    <Section id="how">
      <Reveal>
        <p className="mb-2 text-sm font-medium text-[#1A1A2E]/50">How it works</p>
        <h2 className="mb-12 text-3xl font-semibold leading-tight text-[#1A1A2E] md:text-4xl">
          Three steps to a smarter thesis
        </h2>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-3">
        {steps.map((step, i) => (
          <Reveal key={step.num} delay={i * 100}>
            <Card className="relative h-full">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#F5E6CC]/60 text-sm font-semibold text-[#1A1A2E]">
                {step.num}
              </div>
              <h3 className="mb-2 text-lg font-semibold text-[#1A1A2E]">{step.title}</h3>
              <p className="text-sm leading-relaxed text-[#1A1A2E]/70">{step.body}</p>

              {i < steps.length - 1 && (
                <div className="pointer-events-none absolute -right-3 top-1/2 hidden -translate-y-1/2 md:block">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A1A2E" strokeWidth="1" opacity="0.2">
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </div>
              )}
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
