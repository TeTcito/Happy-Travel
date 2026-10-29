import React from 'react';
import type { TabType } from '../../types';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { HomeTab } from './tabs/HomeTab';
import { ServicesTab } from './tabs/ServicesTab';
import { ParcelsTab } from './tabs/ParcelsTab';
import { PetsTab } from './tabs/PetsTab';
import { ContactTab } from './tabs/ContactTab';

export interface DesktopViewProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onOpenQuote: (serviceName?: string, origin?: string, destination?: string) => void;
}

export const DesktopView: React.FC<DesktopViewProps> = ({
  activeTab,
  setActiveTab,
  onOpenQuote,
}) => {
  return (
    <div className="desktop-view flex flex-col min-h-screen">
      {/* Sticky Navbar de Escritorio */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenQuote={() => onOpenQuote()} 
      />

      {/* Contenido Principal por Pestaña (Escritorio) */}
      <main className="flex-1">
        {activeTab === 'inicio' && (
          <HomeTab 
            setActiveTab={setActiveTab} 
            onOpenQuote={onOpenQuote} 
          />
        )}

        {activeTab === 'servicios' && (
          <ServicesTab 
            onOpenQuote={onOpenQuote} 
          />
        )}

        {activeTab === 'encomiendas' && (
          <ParcelsTab 
            onOpenQuote={onOpenQuote} 
          />
        )}

        {activeTab === 'mascotas' && (
          <PetsTab 
            onOpenQuote={onOpenQuote} 
          />
        )}

        {activeTab === 'contactanos' && (
          <ContactTab 
            onOpenQuote={onOpenQuote} 
          />
        )}
      </main>

      {/* Footer de Escritorio */}
      <Footer 
        setActiveTab={setActiveTab} 
        onOpenQuote={() => onOpenQuote()} 
      />
    </div>
  );
};

export default DesktopView;
