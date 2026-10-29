import React from 'react';
import type { TabType } from '../../types';
import { MobileBottomNav } from './MobileBottomNav';
import { HomeTab } from './tabs/HomeTab';
import { ServicesTab } from './tabs/ServicesTab';
import { ParcelsTab } from './tabs/ParcelsTab';
import { PetsTab } from './tabs/PetsTab';
import { ContactTab } from './tabs/ContactTab';

export interface MobileViewProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onOpenQuote: (serviceName?: string, origin?: string, destination?: string) => void;
}

export const MobileView: React.FC<MobileViewProps> = ({
  activeTab,
  setActiveTab,
  onOpenQuote,
}) => {
  return (
    <div className="mobile-view flex flex-col min-h-screen pb-0 w-full max-w-full overflow-x-hidden">
      {/* Contenido Principal por Pestaña (Móvil - Sin header ni footer para maximizar pantalla nativa) */}
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

      {/* Barra de Navegación Inferior Flotante Móvil con Scoop y Física de Resorte */}
      <MobileBottomNav 
        activeTab={activeTab} 
        onNavigate={setActiveTab} 
      />
    </div>
  );
};

export default MobileView;
