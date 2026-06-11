import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";

const items = [
  {
    title: "Built for retail",
    body: "Designed for self-directed traders, not hedge funds. No Bloomberg terminal required.",
  },
  {
    title: "Calm by design",
    body: "No flashing dashboards, no pump energy. Just clear signals and quiet confidence.",
  },
  {
    title: "Honest about uncertainty",
    body: "Every signal shows a probability, not a guarantee. We don't hide the risk.",
  },
];

export default function DifferentiatorStrip() {
  return (
    <div className="bg-[#F5E6CC]/40">
      <Section className="py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-3">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 80}>
              <div className="text-center">
                <h3 className="mb-2 text-lg font-semibold text-[#1A1A2E]">{item.title}</h3>
                <p className="text-sm leading-relaxed text-[#1A1A2E]/60">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </div>
  );
}
