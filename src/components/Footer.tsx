export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/fafc99d5-5f39-4626-b055-f72bdbe00e48.png" 
              alt="BluVida - Saúde + Benefícios" 
              className="h-12"
            />
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-sm text-primary-foreground/80">
              © 2024 BluVida. Todos os direitos reservados.
            </p>
            <p className="text-xs text-primary-foreground/60 mt-1">
              Plataforma White Label de Telemedicina para Corretoras
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}