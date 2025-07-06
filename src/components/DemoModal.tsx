import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { CalendarDays, Send } from "lucide-react";
import emailjs from "@emailjs/browser";
import { parsePhoneNumberFromString } from "libphonenumber-js";

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
    whatsapp: "",
    company: "",
    companySize: "",
    message: "",
  });

  const [whatsappError, setWhatsappError] = useState("");

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field === "whatsapp") {
      validateWhatsApp(value);
    }
  };

  const validateWhatsApp = (whatsapp: string): boolean => {
    const phoneNumber = parsePhoneNumberFromString(whatsapp);
    if (!phoneNumber || !phoneNumber.isValid()) {
      setWhatsappError(
        "Número inválido. Use o formato internacional, ex: +55 11 99999-9999"
      );
      return false;
    }
    setWhatsappError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateWhatsApp(formData.whatsapp)) {
      toast({
        title: "Erro de validação",
        description: "Por favor, insira um número de WhatsApp válido.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const serviceId = "service_dkt0u4s";
      const templateId = "template_lp";
      const publicKey = "EeR2CC2ldoYNUt_1M";

      const phoneNumber = parsePhoneNumberFromString(formData.whatsapp);
      const formattedPhone = phoneNumber?.formatInternational() ?? formData.whatsapp;
      const cleanNumber = phoneNumber?.number.replace("+", "") ?? "";
      const whatsappLink = `https://wa.me/${cleanNumber}`;

      const templateParams = {
        nome: formData.name,
        email: formData.email,
        wpp: formattedPhone,
        wpp_link: whatsappLink,
        empresa: formData.company,
        nofunc: formData.companySize,
        mensagem: formData.message,
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      toast({
        title: "Demonstração agendada!",
        description:
          "Nossa equipe entrará em contato em breve para agendar sua demonstração personalizada.",
      });

      setIsOpen(false);
      setFormData({
        name: "",
        email: "",
        whatsapp: "",
        company: "",
        companySize: "",
        message: "",
      });
      setWhatsappError("");
    } catch (error) {
      console.error("Erro ao enviar email:", error);
      toast({
        title: "Erro ao enviar",
        description:
          "Ocorreu um erro ao enviar sua solicitação. Tente novamente ou entre em contato via WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
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
                placeholder="+55 11 99999-9999"
                required
                className={`border-primary/20 focus:border-primary ${
                  whatsappError ? "border-destructive" : ""
                }`}
              />
              {whatsappError && (
                <p className="text-xs text-destructive mt-1">{whatsappError}</p>
              )}
              <p className="text-xs text-muted-foreground">
                Formato internacional: +55 11 99999-9999
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
            <Select
              value={formData.companySize}
              onValueChange={(value) => handleInputChange("companySize", value)}
            >
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
}
