import PricingTeaser from "@/components/sections/PricingTeaser";
import StickyNav from "@/components/nav/StickyNav";
import Footer from "@/components/sections/Footer";

export default function PricingPage() {
  return (
    <>
      <StickyNav />
      <main className="pt-16">
        <PricingTeaser />
      </main>
      <Footer />
    </>
  );
}
