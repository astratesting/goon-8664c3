import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

export default function FinalCTA() {
  return (
    <div className="bg-[#F5E6CC]/20">
      <Section id="cta" className="py-20 md:py-28">
        <Reveal className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-[#1A1A2E] md:text-4xl">
            Ready to trade with a thesis?
          </h2>
          <p className="mt-4 text-base text-[#1A1A2E]/60">
            Join the waitlist to get early access and be the first to know when
            new models go live.
          </p>
          <div className="mt-8">
            <a href="/register">
              <Button variant="primary" className="px-8">
                Join the waitlist
              </Button>
            </a>
          </div>
          <p className="mt-4 text-xs text-[#1A1A2E]/40">
            No credit card required. Cancel anytime.
          </p>
        </Reveal>
      </Section>
    </div>
  );
}
