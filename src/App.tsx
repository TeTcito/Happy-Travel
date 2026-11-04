import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CMSProvider } from './context/CMSContext';
import type { TabType } from './types';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { AdminProtectedRoute } from './components/admin/AdminProtectedRoute';

const MobileView = lazy(() => import('./views/mobile/MobileView'));
const DesktopView = lazy(() => import('./views/desktop/DesktopView'));
const QuoteModal = lazy(() => import('./components/QuoteModal').then(m => ({ default: m.QuoteModal })));

// Admin Lazy Loaded para conservar la máxima velocidad y puntuación de PageSpeed
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin').then(m => ({ default: m.AdminLogin })));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard').then(m => ({ default: m.AdminDashboard })));

const MainPublicSite: React.FC = () => {
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
};

const AppShell: React.FC = () => {
  const location = useLocation();

  // Si alguien entra con hash #admin o #/admin, redirigir al pathname
  useEffect(() => {
    if (window.location.hash === '#admin' || window.location.hash === '#/admin') {
      window.location.href = '/admin';
    }
  }, [location]);

  return (
    <Routes>
      {/* ==========================================================
          PORTAL ADMINISTRATIVO INDEPENDIENTE (HAPPY TRAVEL)
         ========================================================== */}
      <Route
        path="/admin/login"
        element={
          <Suspense fallback={<div className="min-h-screen bg-[#080A0E]" />}>
            <AdminLogin />
          </Suspense>
        }
      />
      <Route
        path="/portal-admin/login"
        element={
          <Suspense fallback={<div className="min-h-screen bg-[#080A0E]" />}>
            <AdminLogin />
          </Suspense>
        }
      />

      <Route element={<AdminProtectedRoute />}>
        <Route
          path="/admin"
          element={
            <Suspense fallback={<div className="min-h-screen bg-[#080A0E]" />}>
              <AdminDashboard />
            </Suspense>
          }
        />
        <Route
          path="/portal-admin"
          element={
            <Suspense fallback={<div className="min-h-screen bg-[#080A0E]" />}>
              <AdminDashboard />
            </Suspense>
          }
        />
      </Route>

      {/* ==========================================================
          SITIO WEB PRINCIPAL (PÁGINA PÚBLICA)
         ========================================================== */}
      <Route path="*" element={<MainPublicSite />} />
    </Routes>
  );
};

export function App() {
  return (
    <AuthProvider>
      <CMSProvider>
        <BrowserRouter>
          <AppShell />
        </BrowserRouter>
      </CMSProvider>
    </AuthProvider>
  );
}

export default App;
