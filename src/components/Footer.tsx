import { Facebook, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/logo_bluVida_white.png" 
              alt="BluVida - Saúde + Benefícios" 
              className="h-12"
            />
          </div>
          
          {/* Social Media Links */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-primary-foreground/80">Siga-nos:</span>
            <a 
              href="https://www.facebook.com/bluvida" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 bg-primary-foreground/10 hover:bg-primary-foreground/20 rounded-full flex items-center justify-center transition-colors duration-300 group"
              aria-label="Facebook da BluVida"
            >
              <Facebook className="w-5 h-5 text-primary-foreground group-hover:scale-110 transition-transform duration-300" />
            </a>
            <a 
              href="https://www.instagram.com/bluvidasaude" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 bg-primary-foreground/10 hover:bg-primary-foreground/20 rounded-full flex items-center justify-center transition-colors duration-300 group"
              aria-label="Instagram da BluVida"
            >
              <Instagram className="w-5 h-5 text-primary-foreground group-hover:scale-110 transition-transform duration-300" />
            </a>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-sm text-primary-foreground/80">
              © 2025 BluVida. Todos os direitos reservados.
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