import Link from "next/link"
import { Facebook, Instagram, MessageCircle, Mail, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer id="contato" className="bg-black text-white">
      <div className="container mx-auto px-4">
        {/* Newsletter Section */}
        
        


        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <span className="text-2xl font-light tracking-widest">
                RELO<span className="font-semibold">JOARIA</span>
              </span>
            </Link>
            <p className="text-gray-400 mb-6">
              Elegância e precisão em cada momento. Descubra nossa coleção exclusiva de relógios.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/relojoaria"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 text-gray-400 hover:border-white hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://facebook.com/relojoaria"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 text-gray-400 hover:border-white hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://wa.me/5500000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 text-gray-400 hover:border-white hover:text-white transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 text-lg font-medium">Links Rápidos</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors inline-block">
                  Início
                </Link>
              </li>
              <li>
                <Link href="#produtos" className="text-gray-400 hover:text-white transition-colors inline-block">
                  Coleção
                </Link>
              </li>
              <li>
                <Link href="#sobre" className="text-gray-400 hover:text-white transition-colors inline-block">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="#contato" className="text-gray-400 hover:text-white transition-colors inline-block">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-6 text-lg font-medium">Informações</h3>
            <ul className="space-y-4">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors inline-block">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors inline-block">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors inline-block">
                  Política de Trocas
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors inline-block">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-6 text-lg font-medium">Contato</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={18} className="mr-3 text-gray-400 mt-1 flex-shrink-0" />
                <span className="text-gray-400">Rua dos Andradas, 1519, Porto Alegre, RS, Brazil, 90020-011</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-3 text-gray-400 flex-shrink-0" />
                <a href="tel:+55 51 9727-4193" className="text-gray-400 hover:text-white transition-colors">
                  +55 51 9727-4193
                </a>
              </li>
              <li className="flex items-center">
                <MessageCircle size={18} className="mr-3 text-gray-400 flex-shrink-0" />
                <a
                  href="https://wa.me/555197274193?text=Olá, vim pelo seu novo site!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  WhatsApp
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-3 text-gray-400 flex-shrink-0" />
                <a href="mailto:atrmundial@hotmail.com" className="text-gray-400 hover:text-white transition-colors">
                atrmundial@hotmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="py-8 border-t border-gray-800 text-center">
          <p className="text-sm text-gray-500">&copy; {currentYear} Relojoaria. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
