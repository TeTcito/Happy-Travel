import { useState, useEffect, lazy, Suspense } from 'react';
import type { TabType } from './types';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';

const MobileView = lazy(() => import('./views/mobile/MobileView'));
const DesktopView = lazy(() => import('./views/desktop/DesktopView'));
const QuoteModal = lazy(() => import('./components/QuoteModal').then(m => ({ default: m.QuoteModal })));

export function App() {
  const [activeTab, setActiveTab] = useState<TabType>('inicio');
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [quoteService, setQuoteService] = useState('Transporte Puerta a Puerta Privado');
  const [quoteOrigin, setQuoteOrigin] = useState('');
  const [quoteDestination, setQuoteDestination] = useState('');

  // Detección responsiva de pantalla móvil (< 1024px)
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 1024 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as TabType;
      const validTabs: TabType[] = ['inicio', 'servicios', 'encomiendas', 'mascotas', 'contactanos'];
      if (validTabs.includes(hash)) {
        setActiveTab(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    window.location.hash = tab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenQuote = (serviceName?: string, origin?: string, destination?: string) => {
    if (serviceName) setQuoteService(serviceName);
    if (origin !== undefined) setQuoteOrigin(origin);
    if (destination !== undefined) setQuoteDestination(destination);
    setIsQuoteOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 font-sans selection:bg-brand-yellow selection:text-black">
      {/* Vistas Independientes Lazy Loaded: Desktop (>=1024px) y Mobile (<1024px) */}
      <Suspense fallback={<div className="min-h-screen bg-white" />}>
        {isMobile ? (
          <MobileView 
            activeTab={activeTab} 
            setActiveTab={handleTabChange} 
            onOpenQuote={handleOpenQuote} 
          />
        ) : (
          <DesktopView 
            activeTab={activeTab} 
            setActiveTab={handleTabChange} 
            onOpenQuote={handleOpenQuote} 
          />
        )}
      </Suspense>

      {/* Modales e Interacciones Globales */}
      {isQuoteOpen && (
        <Suspense fallback={null}>
          <QuoteModal 
            isOpen={isQuoteOpen} 
            onClose={() => setIsQuoteOpen(false)} 
            defaultService={quoteService} 
            defaultOrigin={quoteOrigin}
            defaultDestination={quoteDestination}
          />
        </Suspense>
      )}

      <WhatsAppFloatingButton />
    </div>
  );
}

export default App;
