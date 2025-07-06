import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { CalendarDays, Send } from "lucide-react";
import emailjs from '@emailjs/browser';

interface DemoModalProps {
  trigger: React.ReactNode;
}

export function DemoModal({ trigger }: DemoModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "+55 ",
    company: "",
    companySize: "",
    message: ""
  });

  const [whatsappError, setWhatsappError] = useState("");

  const handleInputChange = (field: string, value: string) => {
    if (field === 'whatsapp') {
      const formatted = formatWhatsApp(value);
      setFormData(prev => ({ ...prev, [field]: formatted }));
      validateWhatsApp(formatted);
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const formatWhatsApp = (value: string) => {
    // Remove tudo que não é número
    let numbers = value.replace(/\D/g, '');
    
    // Se não começar com 55, adiciona
    if (!numbers.startsWith('55')) {
      numbers = '55' + numbers;
    }
    
    // Limita a 13 dígitos (55 + 11 dígitos do celular)
    numbers = numbers.substring(0, 13);
    
    // Formata: +55 (XX) XXXXX-XXXX
    if (numbers.length >= 2) {
      let formatted = '+55';
      
      if (numbers.length > 2) {
        const ddd = numbers.substring(2, 4);
        formatted += ` (${ddd}`;
        
        if (numbers.length > 4) {
          formatted += ')';
          const firstPart = numbers.substring(4, 9);
          formatted += ` ${firstPart}`;
          
          if (numbers.length > 9) {
            const secondPart = numbers.substring(9, 13);
            formatted += `-${secondPart}`;
          }
        }
      }
      
      return formatted;
    }
    
    return '+55 ';
  };

  const validateWhatsApp = (whatsapp: string) => {
    const numbers = whatsapp.replace(/\D/g, '');
    
    if (numbers.length < 13) {
      setWhatsappError("WhatsApp deve ter 11 dígitos (DDD + número)");
      return false;
    }
    
    // Valida DDD (códigos válidos do Brasil)
    const ddd = numbers.substring(2, 4);
    const validDDDs = [
      '11', '12', '13', '14', '15', '16', '17', '18', '19', // SP
      '21', '22', '24', // RJ
      '27', '28', // ES
      '31', '32', '33', '34', '35', '37', '38', // MG
      '41', '42', '43', '44', '45', '46', // PR
      '47', '48', '49', // SC
      '51', '53', '54', '55', // RS
      '61', // DF
      '62', '64', // GO
      '63', // TO
      '65', '66', // MT
      '67', // MS
      '68', // AC
      '69', // RO
      '71', '73', '74', '75', '77', // BA
      '79', // SE
      '81', '87', // PE
      '82', // AL
      '83', // PB
      '84', // RN
      '85', '88', // CE
      '86', '89', // PI
      '91', '93', '94', // PA
      '92', '97', // AM
      '95', // RR
      '96', // AP
      '98', '99' // MA
    ];
    
    if (!validDDDs.includes(ddd)) {
      setWhatsappError("DDD inválido");
      return false;
    }
    
    // Valida se é celular (9º dígito deve ser 9)
    const ninthDigit = numbers.substring(4, 5);
    if (ninthDigit !== '9') {
      setWhatsappError("Número deve ser de celular (começar com 9)");
      return false;
    }
    
    setWhatsappError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação do WhatsApp antes do envio
    if (!validateWhatsApp(formData.whatsapp)) {
      toast({
        title: "Erro de validação",
        description: "Por favor, corrija o número do WhatsApp.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);

    try {
      // Configuração do EmailJS - substitua pelos seus IDs reais
      const serviceId = 'service_dkt0u4s'; // Substitua pelo seu Service ID
      const templateId = 'template_lp'; // Template ID fornecido
      const publicKey = 'EeR2CC2ldoYNUt_1M'; // Substitua pela sua Public Key

      // Mapeamento dos campos conforme solicitado
      const templateParams = {
        nome: formData.name,
        email: formData.email,
        wpp: formData.whatsapp,
        empresa: formData.company,
        nofunc: formData.companySize,
        mensagem: formData.message
      };

      // Envio do email via EmailJS
      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      toast({
        title: "Demonstração agendada!",
        description: "Nossa equipe entrará em contato em breve para agendar sua demonstração personalizada.",
      });

      setIsOpen(false);
      setFormData({
        name: "",
        email: "",
        whatsapp: "+55 ",
        company: "",
        companySize: "",
        message: ""
      });
      setWhatsappError("");

    } catch (error) {
      console.error('Erro ao enviar email:', error);
      toast({
        title: "Erro ao enviar",
        description: "Ocorreu um erro ao enviar sua solicitação. Tente novamente ou entre em contato via WhatsApp.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-card/95 backdrop-blur-sm border-primary/20">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl text-primary">
            <CalendarDays className="w-5 h-5" />
            Agendar Demonstração
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
                className="border-primary/20 focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
                className="border-primary/20 focus:border-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="whatsapp">WhatsApp *</Label>
              <Input
                id="whatsapp"
                value={formData.whatsapp}
                onChange={(e) => handleInputChange("whatsapp", e.target.value)}
                placeholder="+55 (47) 99999-9999"
                required
                className={`border-primary/20 focus:border-primary ${whatsappError ? 'border-destructive' : ''}`}
              />
              {whatsappError && (
                <p className="text-xs text-destructive mt-1">{whatsappError}</p>
              )}
              <p className="text-xs text-muted-foreground">
                Formato: +55 (DDD) 9XXXX-XXXX
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Empresa *</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
                required
                className="border-primary/20 focus:border-primary"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="companySize">Tamanho da empresa</Label>
            <Select value={formData.companySize} onValueChange={(value) => handleInputChange("companySize", value)}>
              <SelectTrigger className="border-primary/20 focus:border-primary">
                <SelectValue placeholder="Selecione o tamanho" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-10">1-10 funcionários</SelectItem>
                <SelectItem value="11-50">11-50 funcionários</SelectItem>
                <SelectItem value="51-100">51-100 funcionários</SelectItem>
                <SelectItem value="101+">101+ funcionários</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Mensagem</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              placeholder="Conte-nos mais sua área de atuação e sobre suas necessidades..."
              className="border-primary/20 focus:border-primary min-h-[80px]"
            />
          </div>

          <Button 
            type="submit" 
            variant="hero" 
            size="lg" 
            className="w-full" 
            disabled={isSubmitting || !!whatsappError}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
                Enviando...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Agendar Demonstração
              </>
            )}
          </Button>
        </form>

      </DialogContent>
    </Dialog>
  );
}
