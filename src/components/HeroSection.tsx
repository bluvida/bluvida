import { Button } from "@/components/ui/button";
import { DemoModal } from "./DemoModal";
import { ArrowDown, Play } from "lucide-react";
import heroImage from "@/assets/hero-telemedicine.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Telemedicina moderna" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-hero/80" />
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 z-10">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-secondary/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <div className="mb-8 animate-fade-in">
            <img 
              src="/lovable-uploads/fafc99d5-5f39-4626-b055-f72bdbe00e48.png" 
              alt="BluVida - Saúde + Benefícios" 
              className="h-20 mx-auto"
            />
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-accent/20 backdrop-blur-sm border border-accent/30 rounded-full px-4 py-2 mb-8 animate-fade-in">
            <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
            <span className="text-sm font-medium text-primary-foreground">
              Plataforma White Label #1 em Telemedicina
            </span>
          </div>

          {/* Main headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight animate-fade-in">
            Transforme sua corretora em uma{" "}
            <span className="bg-gradient-secondary bg-clip-text text-transparent">
              plataforma digital de saúde
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in">
            — com sua marca, seu modelo e{" "}
            <strong className="text-secondary">zero complicação técnica</strong>.
          </p>

          <div className="bg-card/10 backdrop-blur-sm border border-card/20 rounded-2xl p-6 mb-10 animate-fade-in">
            <p className="text-base md:text-lg text-primary-foreground/80 leading-relaxed">
              Chega de vender os mesmos planos que todos os concorrentes. Tenha seu próprio sistema de telemedicina,
              <span className="text-secondary font-semibold"> personalizado, white-label</span> e pronto para revenda com
              <span className="text-secondary font-semibold"> mais margem e fidelização</span>.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in">
            <DemoModal
              trigger={
                <Button variant="cta" size="xl" className="group">
                  <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Agendar Demonstração
                </Button>
              }
            />
            <Button 
              variant="outline-hero" 
              size="xl"
              onClick={() => {
                document.getElementById('problemas')?.scrollIntoView({ 
                  behavior: 'smooth' 
                });
              }}
            >
              <ArrowDown className="w-5 h-5" />
              Ver Como Funciona
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-primary-foreground/60 text-sm animate-fade-in">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-success/20 rounded-full flex items-center justify-center">
                <span className="text-success text-lg">✓</span>
              </div>
              <span>Implementação rápida</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-success/20 rounded-full flex items-center justify-center">
                <span className="text-success text-lg">✓</span>
              </div>
              <span>Suporte técnico completo</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-success/20 rounded-full flex items-center justify-center">
                <span className="text-success text-lg">✓</span>
              </div>
              <span>Sua marca, seu domínio</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-6 h-6 text-primary-foreground/60" />
      </div>
    </section>
  );
}
