import { Button } from "@/components/ui/button";
import { DemoModal } from "./DemoModal";
import { Rocket, Calendar, ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-hero relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-secondary/10 rounded-full blur-xl" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-secondary/10 rounded-full blur-2xl" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-accent/10 rounded-full blur-lg" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 bg-secondary/20 backdrop-blur-sm border border-secondary/30 rounded-full px-4 py-2 mb-8">
              <Rocket className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium text-primary-foreground">
                Transformação Digital Imediata
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6 leading-tight">
              Vamos colocar sua corretora no{" "}
              <span className="bg-gradient-secondary bg-clip-text text-transparent">
                jogo digital
              </span>?
            </h2>

            <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Agende uma demonstração e veja como sua plataforma pode estar ativa em poucos dias.
            </p>
          </div>

          {/* Benefits list */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              "Setup em 48h",
              "Treinamento incluído", 
              "Suporte dedicado"
            ].map((benefit, index) => (
              <div
                key={index}
                className="flex items-center justify-center gap-2 bg-card/10 backdrop-blur-sm border border-card/20 rounded-lg p-4"
              >
                <div className="w-6 h-6 bg-success/20 rounded-full flex items-center justify-center">
                  <span className="text-success text-sm">✓</span>
                </div>
                <span className="text-primary-foreground font-medium">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <DemoModal
              trigger={
                <Button variant="cta" size="xl" className="group">
                  <Calendar className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Agendar Demonstração Gratuita
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              }
            />
          </div>

          {/* Additional info */}
          <div className="text-center text-primary-foreground/70 text-sm">
            <p className="mb-2">✨ <b>AUMENTE</b> seu ticket médio, ✨ <b>FIDELIZE</b> pacotes próprios, ✨ <b>ESCALE</b> sem contratar equipe médica ou técnica</p>
            <p>Mais de <strong className="text-secondary">200 corretoras</strong> já transformaram seus negócios</p>
          </div>
        </div>
      </div>
    </section>
  );
}
