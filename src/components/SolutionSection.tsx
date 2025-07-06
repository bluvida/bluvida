import { Check, Smartphone, Palette, CreditCard, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";

export function SolutionSection() {
  const features = [
    {
      icon: Palette,
      title: "Aplicativo e painel com a identidade visual da sua corretora",
      description: "Logo, cores, domínio e marca 100% personalizados"
    },
    {
      icon: Shield,
      title: "Pacotes personalizáveis com os serviços que desejar incluir",
      description: "Monte seu portfólio de acordo com seu público"
    },
    {
      icon: CreditCard,
      title: "Área do cliente, CRM, meios de pagamento e suporte integrados",
      description: "Tudo em uma plataforma completa e funcional"
    },
    {
      icon: Smartphone,
      title: "Total controle: sem dependência de operadoras ou sistemas engessados",
      description: "Sua empresa, suas regras, sua autonomia"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              <span className="text-primary">Sua corretora</span>,{" "}
              <span className="bg-gradient-secondary bg-clip-text text-transparent">sua marca</span>,{" "}
              <span className="text-primary">nossa tecnologia</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Com a plataforma white-label da BluVida, você oferece um sistema completo e 
              customizado com os recursos que precisa.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
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
                      <feature.icon className="w-5 h-5 text-primary" />
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300 leading-tight">
                        {feature.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Highlight Box */}
          <div className="bg-gradient-primary rounded-3xl p-8 md:p-12 text-center shadow-primary">
            <h3 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              A diferenciação que você precisava está aqui
            </h3>
            <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed">
              Pare de competir apenas por preço. Ofereça valor real, exclusivo e com sua marca. 
              A BluVida cuida da tecnologia, você cuida dos seus clientes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
