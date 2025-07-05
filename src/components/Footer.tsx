export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">B</span>
            </div>
            <span className="text-xl font-bold">BluVida</span>
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