import { SquareCode, BriefcaseMedical, Hourglass, ShoppingCart, Ribbon } from "lucide-react";

export function ProblemsSection() {
  const problems = [
    {
      icon: SquareCode,
      title: "Preciso desenvolver um aplicativo?",
      description: "Não. A plataforma já está pronta e é personalizada com a identidade da sua empresa."
    },
    {
      icon: BriefcaseMedical,
      title: "Preciso contratar médicos?",
      description: "Não. A operação médica é disponibilizada pela BluVida."
    },
    {
      icon: Hourglass,
      title: "Quanto tempo leva a implantação?",
      description: "A implantação é planejada conforme o projeto e inclui personalização, treinamento e configuração da operação."
    },
    {
      icon: ShoppingCart,
      title: "Posso vender para empresas e pessoas físicas?",
      description: "Sim. O modelo White Label permite que sua empresa defina sua estratégia comercial."
    },
    {
      icon: Ribbon,
      title: "Posso utilizar minha própria marca?",
      description: "Sim. O White Label foi desenvolvido para fortalecer a identidade da sua empresa."
    }
  ];

  return (
    <section id="problemas" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Perguntas{" "}
            <span className="text-destructive">frequentes</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {problems.map((problem, index) => (
              <div
                key={index}
                className="group bg-card hover:bg-card/80 rounded-2xl p-8 shadow-float hover:shadow-elegant transition-all duration-300 border border-border/50 hover:border-destructive/20"
              >
                <div className="w-16 h-16 bg-destructive/10 group-hover:bg-destructive/20 rounded-2xl flex items-center justify-center mb-6 mx-auto transition-colors duration-300">
                  <problem.icon className="w-8 h-8 text-destructive" />
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-4 group-hover:text-destructive transition-colors duration-300">
                  {problem.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {problem.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 p-8 bg-destructive/5 border border-destructive/20 rounded-2xl">
            <p className="text-lg text-foreground/80 italic">
              "Sempre oferecemos os mesmos produtos que todo mundo... Como vamos nos destacar da concorrência?"
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              — Pergunta comum entre corretores
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
