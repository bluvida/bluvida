import { Check, Building2 } from "lucide-react";
import { Card } from "@/components/ui/card";

export function SolutionSection() {
  const features = [
    {
      icon: Building2,
      title: "Administradoras de Benefícios",
      description: ""
    },
    {
      icon: Building2,
      title: "Corretoras de Seguros",
      description: ""
    },
    {
      icon: Building2,
      title: "Consultorias Empresariais",
      description: ""
    },
    {
      icon: Building2,
      title: "Empresas de Benefícios Corporativos",
      description: ""
    },
        {
      icon: Building2,
      title: "Clínicas e Centros Médicos",
      description: ""
    },
    {
      icon: Building2,
      title: "Operadoras de Saúde",
      description: ""
    },
    {
      icon: Building2,
      title: "Associações e Sindicatos",
      description: ""
    },
    {
      icon: Building2,
      title: "Cooperativas",
      description: ""
    },
    {
      icon: Building2,
      title: "Plataformas de Benefícios",
      description: ""
    },
    {
      icon: Building2,
      title: "Empresas de Tecnologia",
      description: ""
    },
    {
      icon: Building2,
      title: "Startups de Saúde",
      description: ""
    },
    {
      icon: Building2,
      title: "Franqueadoras",
      description: ""
    },
    {
      icon: Building2,
      title: "Empresas que desejam criar um novo produto de receita recorrente",
      description: ""
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              <span className="text-primary">Para quem é o</span>{" "}
              <span className="bg-gradient-secondary bg-clip-text text-transparent">White Label BluVida</span>?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Nosso modelo foi desenvolvido para empresas que desejam atuar no mercado de saúde digital. Entre elas:
            </p>
          </div>

{/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group p-8 hover:shadow-elegant transition-all duration-300 border-primary/20 hover:border-primary/40 bg-gradient-to-br from-card to-accent/5"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-success/10 group-hover:bg-success/20 rounded-xl flex items-center justify-center transition-colors duration-300 flex-shrink-0">
                    <Check className="w-6 h-6 text-success" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300 leading-tight">
                        {feature.title}
                      </h3>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Highlight Box */}
          <div className="bg-gradient-primary rounded-3xl p-8 md:p-12 text-center shadow-primary">
            <h3 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              O mercado de saúde digital continua crescendo.<br />A pergunta é: sua empresa fará parte desse crescimento?
            </h3>
            <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed">
              Empresas de diversos segmentos estão criando operações próprias de telemedicina para oferecer serviços de saúde aos seus clientes, colaboradores e associados.
Com o modelo White Label da BluVida, você pode lançar sua própria operação utilizando sua marca, seu domínio e sua estratégia comercial, sem precisar desenvolver tecnologia ou estruturar uma operação médica.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
