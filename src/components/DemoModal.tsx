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
    // Remove tudo que não é número ou +
    let cleaned = value.replace(/[^\d+]/g, '');

    // Se não começar com 55, adiciona
    if (!numbers.startsWith('55')) {
      numbers = '55' + numbers;
    // Se não começar com +, adiciona
    if (!cleaned.startsWith('+')) {
      cleaned = '+' + cleaned;
    }

    // Limita a 13 dígitos (55 + 11 dígitos do celular)
    numbers = numbers.substring(0, 13);
    // Se só tem +, adiciona 55 como padrão
    if (cleaned === '+') {
      return '+55 ';
    }
    
    // Extrai DDI e número
    const match = cleaned.match(/^\+(\d{1,3})(.*)$/);
    if (!match) return '+55 ';
    
    const [, ddi, numbers] = match;

    // Formata: +55 (XX) XXXXX-XXXX
    if (numbers.length >= 2) {
      let formatted = '+55';
    // Limita DDI a 3 dígitos
    const limitedDDI = ddi.substring(0, 3);
    
    // Para Brasil (+55), formata com DDD
    if (limitedDDI === '55') {
      const localNumbers = numbers.substring(0, 11); // Máximo 11 dígitos (DDD + número)

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
      if (localNumbers.length === 0) {
        return `+${limitedDDI} `;
      } else if (localNumbers.length <= 2) {
        return `+${limitedDDI} (${localNumbers}`;
      } else if (localNumbers.length <= 7) {
        const ddd = localNumbers.substring(0, 2);
        const firstPart = localNumbers.substring(2);
        return `+${limitedDDI} (${ddd}) ${firstPart}`;
      } else {
        const ddd = localNumbers.substring(0, 2);
        const firstPart = localNumbers.substring(2, 7);
        const secondPart = localNumbers.substring(7);
        return `+${limitedDDI} (${ddd}) ${firstPart}-${secondPart}`;
      }
      
      return formatted;
    } else {
      // Para outros países, formato simples
      const localNumbers = numbers.substring(0, 15); // Máximo 15 dígitos total
      return `+${limitedDDI} ${localNumbers}`;
    }
    
    return '+55 ';
  };

  const validateWhatsApp = (whatsapp: string) => {
    const numbers = whatsapp.replace(/\D/g, '');

    if (numbers.length < 13) {
      setWhatsappError("WhatsApp deve ter 11 dígitos (DDD + número)");
    if (numbers.length < 8) {
      setWhatsappError("WhatsApp deve ter pelo menos 8 dígitos");
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
    // Extrai DDI
    const ddiMatch = whatsapp.match(/^\+(\d{1,3})/);
    if (!ddiMatch) {
      setWhatsappError("DDI inválido");
      return false;
    }

    // Valida se é celular (9º dígito deve ser 9)
    const ninthDigit = numbers.substring(4, 5);
    if (ninthDigit !== '9') {
      setWhatsappError("Número deve ser de celular (começar com 9)");
      return false;
    const ddi = ddiMatch[1];
    
    // Para Brasil (+55), validações específicas
    if (ddi === '55') {
      const localNumbers = numbers.substring(2); // Remove DDI
      
      if (localNumbers.length < 10) {
        setWhatsappError("Para Brasil: DDD + 8 ou 9 dígitos");
        return false;
      }
      
      if (localNumbers.length > 11) {
        setWhatsappError("Número muito longo para Brasil");
        return false;
      }
      
      // Valida DDD brasileiro
      const ddd = localNumbers.substring(0, 2);
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
        setWhatsappError("DDD brasileiro inválido");
        return false;
      }
      
      // Para números de 9 dígitos, deve começar com 9
      if (localNumbers.length === 11) {
        const ninthDigit = localNumbers.substring(2, 3);
        if (ninthDigit !== '9') {
          setWhatsappError("Celular deve começar com 9");
          return false;
        }
      }
    }

    setWhatsappError("");
    return true;
  };

  // Função para formatar WhatsApp para API (remove parênteses e espaços)
  const formatWhatsAppForAPI = (whatsapp: string) => {
    return whatsapp.replace(/[^\d+]/g, '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

@@ -155,10 +196,11 @@
      const publicKey = 'EeR2CC2ldoYNUt_1M'; // Substitua pela sua Public Key

      // Mapeamento dos campos conforme solicitado
      // WhatsApp formatado para API (sem parênteses e espaços)
      const templateParams = {
        nome: formData.name,
        email: formData.email,
        wpp: formData.whatsapp,
        wpp: formatWhatsAppForAPI(formData.whatsapp), // Formato para API do WhatsApp
        empresa: formData.company,
        nofunc: formData.companySize,
        mensagem: formData.message
@@ -239,76 +281,76 @@
                id="whatsapp"
                value={formData.whatsapp}
                onChange={(e) => handleInputChange("whatsapp", e.target.value)}
                placeholder="+55 (47) 99999-9999"
                placeholder="+55 (11) 99999-9999"
                required
                className={`border-primary/20 focus:border-primary ${whatsappError ? 'border-destructive' : ''}`}
              />
              {whatsappError && (
                <p className="text-xs text-destructive mt-1">{whatsappError}</p>
              )}
              <p className="text-xs text-muted-foreground">
                Formato: +55 (DDD) 9XXXX-XXXX
                Brasil: +55 (DDD) 8/9 dígitos | Outros: +DDI número
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
              placeholder="Conte-nos mais sobre suas necessidades..."
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
