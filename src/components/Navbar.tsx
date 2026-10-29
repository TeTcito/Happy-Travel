import React, { useState, useEffect } from 'react';
import type { TabType } from '../types';
import { COMPANY_INFO } from '../data/mockData';
import { 
  Menu, 
  X, 
  Sparkles, 
  ArrowRight
} from 'lucide-react';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onOpenQuote: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenQuote }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeTab]);

  const navLinks: { id: TabType; label: string }[] = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'servicios', label: 'Puerta a Puerta' },
    { id: 'encomiendas', label: 'Encomiendas' },
    { id: 'mascotas', label: 'Transporte de Mascotas' },
    { id: 'contactanos', label: 'Contáctanos' },
  ];

  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isTransparentTab = activeTab === 'servicios' || activeTab === 'contactanos';
  const showTransparent = isTransparentTab && !isScrolled && !mobileMenuOpen;

  return (
    <header className={`sticky top-0 z-50 text-white transition-all duration-300 ${
      showTransparent 
        ? 'bg-transparent shadow-none border-none' 
        : 'bg-[#070A10]/95 backdrop-blur-md border-b border-amber-500/25 shadow-xl'
    }`}>
      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo with High Contrast Background */}
          <button 
            onClick={() => handleTabClick('inicio')}
            className="flex items-center text-left focus:outline-none h-full"
            aria-label="Happy Travel - Inicio"
          >
            <div className="h-full flex items-center py-0 px-1">
              <img 
                src="/logo-transparent.png" 
                alt="Happy Travel Logo" 
                className="h-[65px] sm:h-[73px] w-auto object-contain"
              />
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`relative text-sm font-semibold transition-colors py-2 ${
                    isActive
                      ? 'text-amber-400 font-bold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {tab.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 rounded-full shadow-[0_0_8px_rgba(245,158,11,0.6)]"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action button */}
          <div className="hidden sm:flex items-center gap-4">
            <button
              onClick={onOpenQuote}
              className="px-6 py-2.5 rounded-full text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 transition-all shadow-gold-sm flex items-center gap-2 active:scale-95 group cursor-pointer"
            >
              <span>Cotizar Viaje</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-950 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-200 hover:bg-slate-800/80 focus:outline-none"
            aria-label="Menú"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#090E18] border-t border-slate-800 px-4 py-4 space-y-2 animate-in fade-in duration-200">
          {navLinks.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`block w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-amber-500/15 text-amber-400 font-bold border-l-4 border-amber-500'
                    : 'text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                {tab.label}
              </button>
            );
          })}

          <div className="pt-4 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-sm shadow-md flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              Cotizar Viaje Puerta a Puerta
            </button>
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm"
            >
              WhatsApp Directo
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
