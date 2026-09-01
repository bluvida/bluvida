import { TrendingUp, Heart, Users2, MessageCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

export function BenefitsSection() {
  const benefits = [
    {
      icon: TrendingUp,
      stat: "35%",
      title: "Aumento no ticket médio",
      description: "Com produtos próprios e maior margem"
    },
    {
      icon: Heart,
      stat: "90%",
      title: "Fidelização de clientes",
      description: "Com valor agregado empresarial"
    },
    {
      icon: Users2,
      stat: "100%",
      title: "Escalabilidade garantida",
      description: "Sem equipe médica ou técnica própria"
    },
    {
      icon: MessageCircle,
      stat: "70%",
      title: "Redução de suporte",
      description: "Com atendimento via WhatsApp automatizado"
    }
  ];

  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              <span className="bg-gradient-secondary bg-clip-text text-transparent">Quanto</span> é necessário para <span className="text-primary">iniciar</span>?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Criar uma operação própria de telemedicina exige tecnologia, estrutura, personalização e implantação.<br /><br />
Por isso, o modelo White Label BluVida prevê um investimento inicial de implantação, destinado à configuração da plataforma, personalização da identidade visual, treinamento da equipe e preparação da operação para o início das atividades.<br /><br />
Após a implantação, a operação passa a funcionar em um modelo de receita recorrente, permitindo que sua empresa comercialize os serviços utilizando sua própria marca.<br /><br />
Cada projeto é apresentado de forma personalizada, de acordo com o perfil e o modelo de negócio do parceiro.

            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="group p-6 text-center hover:shadow-elegant transition-all duration-300 border-primary/20 hover:border-secondary/40 bg-gradient-to-br from-card to-secondary/5 hover:scale-105"
              >
                <div className="w-16 h-16 bg-secondary/10 group-hover:bg-secondary/20 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                  <benefit.icon className="w-8 h-8 text-secondary" />
                </div>

                <div className="text-3xl font-bold text-secondary mb-2 group-hover:scale-110 transition-transform duration-300">
                  {benefit.stat}
                </div>

                <h3 className="font-semibold text-foreground mb-2 group-hover:text-secondary transition-colors duration-300">
                  {benefit.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </Card>
            ))}
          </div>

          {/* Testimonial */}
          <div className="bg-card rounded-3xl p-8 md:p-12 shadow-float border border-primary/10">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <div className="text-6xl text-secondary/20 mb-4">"</div>
                <blockquote className="text-xl md:text-2xl text-foreground leading-relaxed font-medium">
                  "Em 3 meses, nossa receita com serviços de saúde aumentou 40%. 
                  Os clientes empresariais adoraram ter nossa marca na plataforma de telemedicina."
                </blockquote>
              </div>
              
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground font-bold">MG</span>
                </div>
                <div>
                  <div className="font-semibold text-foreground">Maria Gonzalez</div>
                  <div className="text-sm text-muted-foreground">Diretora Comercial - Corretora Líder MG</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
