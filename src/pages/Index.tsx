import { HeroSection } from "@/components/HeroSection";
import { ProblemsSection } from "@/components/ProblemsSection";
import { SolutionSection } from "@/components/SolutionSection";
import { BenefitsSection } from "@/components/BenefitsSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { WhatsAppWidget } from "@/components/WhatsAppWidget";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <ProblemsSection />
      <SolutionSection />
      <BenefitsSection />
      <CTASection />
      <Footer />
      <WhatsAppWidget />
    </div>
  );
};

export default Index;
