import React from 'react';
import type { TabType } from '../../types';
import { COMPANY_INFO } from '../../data/mockData';
import { ScrollReveal } from '../../components/ScrollReveal';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  Sparkles
} from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: TabType) => void;
  onOpenQuote: () => void;
}

const currentYear = new Date().getFullYear();

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenQuote }) => {
  const handleNav = (tab: TabType) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#070A10] border-t border-amber-500/20 text-slate-300 pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Col 1: Brand Info (4 cols) */}
          <div className="lg:col-span-4">
            <ScrollReveal direction="up" distance={25} delay={60} duration={700} className="space-y-4">
              <div className="flex items-center">
                <img 
                  src="/logo-transparent.png" 
                  alt="Happy Travel" 
                  className="h-14 w-auto object-contain drop-shadow-[0_4px_16px_rgba(245,158,11,0.25)]" 
                />
              </div>

              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                Tu servicio privado puerta a puerta. Rutas de una ciudad a otra, encomiendas seguras y transporte especializado de mascotas con total confort.
              </p>

              <div className="pt-2">
                <button
                  onClick={onOpenQuote}
                  className="px-5 py-2.5 rounded-full text-xs font-bold text-black bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 transition-all shadow-[0_2px_12px_rgba(245,158,11,0.3)] hover:shadow-[0_4px_20px_rgba(245,158,11,0.5)] active:scale-95 flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-black" />
                  <span>Cotizar Trayecto Directo</span>
                </button>
              </div>
            </ScrollReveal>
          </div>

          {/* Col 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2">
            <ScrollReveal direction="up" distance={25} delay={140} duration={700} className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white border-l-2 border-amber-500 pl-2">
                Enlaces Rápidos
              </h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>
                  <button onClick={() => handleNav('inicio')} className="hover:text-amber-400 transition-colors">
                    Inicio
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav('servicios')} className="hover:text-amber-400 transition-colors">
                    Puerta a Puerta
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav('encomiendas')} className="hover:text-amber-400 transition-colors">
                    Encomiendas Express
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav('mascotas')} className="hover:text-amber-400 transition-colors">
                    Transporte de Mascotas
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav('contactanos')} className="hover:text-amber-400 transition-colors">
                    Contáctanos
                  </button>
                </li>
              </ul>
            </ScrollReveal>
          </div>

          {/* Col 3: Our Services (3 cols) */}
          <div className="lg:col-span-3">
            <ScrollReveal direction="up" distance={25} delay={220} duration={700} className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white border-l-2 border-amber-500 pl-2">
                Nuestros Servicios
              </h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>Transporte Puerta a Puerta 100% Privado</li>
                <li>Rutas de una Ciudad a Otra Ciudad</li>
                <li>Traslado VIP para Artistas & Celebridades</li>
                <li>Mascotas en Cabina con Aire Acondicionado</li>
                <li>Encomiendas de Mano y Carga Delicada</li>
                <li>Traslados Aeropuerto con Monitoreo de Vuelo</li>
              </ul>
            </ScrollReveal>
          </div>

          {/* Col 4: Contact Us + Handwritten Note (3 cols) */}
          <div className="lg:col-span-3">
            <ScrollReveal direction="up" distance={25} delay={300} duration={700} className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white border-l-2 border-amber-500 pl-2">
                Contacto Directo
              </h4>
              <div className="space-y-2.5 text-xs text-slate-400">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span className="text-slate-300">{COMPANY_INFO.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                  <a href={`tel:${COMPANY_INFO.phone}`} className="hover:text-amber-400 text-slate-300 font-medium transition-colors">
                    {COMPANY_INFO.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                  <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-amber-400 text-slate-300 font-medium transition-colors">
                    {COMPANY_INFO.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-emerald-400 font-medium">Operaciones 24/7 Nacional</span>
                </div>
              </div>

              {/* Handwritten note */}
              <div className="pt-4 font-handwriting text-2xl text-amber-200/90 rotate-[-4deg] drop-shadow-sm">
                Viaja Más, Preocúpate Menos ♡
              </div>
            </ScrollReveal>
          </div>

        </div>

        {/* Bottom Bar */}
        <ScrollReveal direction="up" distance={15} delay={380} duration={650}>
          <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>© {currentYear} Happy Travel. Todos los derechos reservados.</p>
            <div className="flex items-center gap-6">
              <span className="hover:text-slate-300 transition-colors cursor-pointer">Política de Privacidad</span>
              <span className="hover:text-slate-300 transition-colors cursor-pointer">Términos del Servicio</span>
              <span className="hover:text-slate-300 transition-colors cursor-pointer">Protocolo Pet-Friendly</span>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </footer>
  );
};
