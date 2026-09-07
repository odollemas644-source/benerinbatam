import { MessageCircle } from "lucide-react";
import { getWhatsAppLink } from "@/lib/constants";

export default function WaFloat() {
  return (
    <a
      href={getWhatsAppLink("Halo Benerin, saya butuh bantuan service.")}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg shadow-green-500/30 transition-all hover:scale-110 hover:bg-green-600 hover:shadow-xl hover:shadow-green-500/40"
      aria-label="Chat WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
