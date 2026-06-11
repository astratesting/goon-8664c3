import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";

const items = ["Deep learning", "Social sentiment", "Explainable signals", "No financial advice"];

export default function TrustStrip() {
  return (
    <Section className="py-8 md:py-10">
      <Reveal>
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-[#1A1A2E]/50">
          <span className="font-medium text-[#1A1A2E]/70">How Goon is built</span>
          <span className="hidden sm:inline">·</span>
          {items.map((item, i) => (
            <span key={item} className="flex items-center gap-3">
              {i > 0 && <span className="hidden sm:inline">·</span>}
              <span>{item}</span>
            </span>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
