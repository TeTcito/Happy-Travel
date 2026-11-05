import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  User,
  Compass,
  Route,
  Building2,
  Car,
  Package,
  ArrowLeft,
  ExternalLink,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Database,
} from 'lucide-react';

export type AdminModuleTab =
  | 'profile'
  | 'destinos-populares'
  | 'rutas-populares'
  | 'destinos-visitados'
  | 'flota-clases'
  | 'encomiendas-servicios'
  | 'database';

interface AdminSidebarProps {
  activeTab: AdminModuleTab;
  setActiveTab: (tab: AdminModuleTab) => void;
  counts: {
    destinosPopulares: number;
    rutasPopulares: number;
    destinosVisitados: number;
    flotaClases: number;
    encomiendasServicios: number;
  };
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeTab,
  setActiveTab,
  counts,
}) => {
  const { profile, signOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const displayName = profile?.first_name
    ? `${profile.first_name} ${profile.last_name || ''}`.trim()
    : 'Administración Happy Travel';

  const menuItems: {
    id: AdminModuleTab;
    label: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string | number;
    badgeColor?: string;
  }[] = [
    {
      id: 'profile',
      label: 'Mi Perfil',
      description: 'Datos personales y clave de acceso',
      icon: User,
    },
    {
      id: 'destinos-populares',
      label: 'Destinos Populares',
      description: 'Conduce hacia tu Próxima Aventura (Carrusel)',
      icon: Compass,
      badge: counts.destinosPopulares,
      badgeColor: 'bg-[#B8860B] text-black',
    },
    {
      id: 'rutas-populares',
      label: 'Rutas Más Populares',
      description: 'Trayectos puerta a puerta con tarifas (Carrusel)',
      icon: Route,
      badge: counts.rutasPopulares,
      badgeColor: 'bg-[#F59E0B] text-black',
    },
    {
      id: 'destinos-visitados',
      label: 'Destinos Más Visitados',
      description: 'Ciudades emblemáticas del Ecuador (Grilla & Móvil)',
      icon: Building2,
      badge: counts.destinosVisitados,
      badgeColor: 'bg-[#B8860B] text-black',
    },
    {
      id: 'flota-clases',
      label: 'Nuestra Flota / Clases',
      description: 'Clase Ejecutiva, Premium y Lujo (Tarjetas)',
      icon: Car,
      badge: counts.flotaClases,
      badgeColor: 'bg-emerald-500 text-white',
    },
    {
      id: 'encomiendas-servicios',
      label: 'Servicios de Encomienda',
      description: 'Modalidades Disponibles y Carga Privada',
      icon: Package,
      badge: counts.encomiendasServicios,
      badgeColor: 'bg-[#E11438] text-white',
    },
    {
      id: 'database',
      label: 'Base de Datos (Supabase)',
      description: 'Estado, vinculación y sincronización de tablas',
      icon: Database,
      badge: 'En Línea',
      badgeColor: 'bg-emerald-500 text-white',
    },
  ];

  const handleSelectTab = (tab: AdminModuleTab) => {
    setActiveTab(tab);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Botón flotante móvil para abrir el menú */}
      <div className="md:hidden fixed top-3 left-3 z-50">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-xl bg-[#080A0E] text-[#F59E0B] border border-[#B8860B]/40 shadow-lg cursor-pointer"
          aria-label="Abrir panel lateral"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Backdrop móvil */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-xs z-40 transition-opacity"
        />
      )}

      {/* Contenedor del Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-40 w-72 sm:w-80 bg-[#080A0E] text-[#FAF7F2] border-r border-[#B8860B]/30 flex flex-col justify-between transition-transform duration-300 ease-in-out shadow-2xl md:shadow-none shrink-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* PARTE SUPERIOR: Identidad corporativa y perfil */}
        <div className="p-5 border-b border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#B8860B] to-[#F59E0B] p-0.5 flex items-center justify-center shadow-md">
                <div className="w-full h-full bg-[#080A0E] rounded-[10px] flex items-center justify-center">
                  <span className="font-display font-extrabold text-[#F59E0B] text-base tracking-wider">
                    HT
                  </span>
                </div>
              </div>
              <div>
                <span className="font-display font-black text-base tracking-tight text-white block group-hover:text-[#F59E0B] transition-colors leading-none">
                  Happy Travel
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#B8860B] block mt-1">
                  Panel de Administración
                </span>
              </div>
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
              aria-label="Cerrar menú"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tarjeta del Administrador en sesión */}
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#B8860B]/20 border border-[#B8860B]/40 flex items-center justify-center text-[#F59E0B] font-bold text-sm shrink-0">
              {displayName.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-xs font-bold text-white block truncate">
                {displayName}
              </span>
              <span className="text-[10px] text-slate-400 block truncate">
                admin@happytravel.com
              </span>
            </div>
          </div>
        </div>

        {/* PARTE MEDIA: Módulos de edición independientes */}
        <nav className="flex-1 overflow-y-auto p-3.5 space-y-1.5 scrollbar-thin">
          <div className="px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
            Módulos y Carruseles
          </div>

          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectTab(item.id)}
                className={`w-full text-left p-3 rounded-2xl transition-all flex items-center justify-between gap-3 group cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#B8860B] to-[#F59E0B] text-black shadow-lg font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-white/5 font-medium'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isActive
                        ? 'bg-black text-[#F59E0B]'
                        : 'bg-white/5 text-[#B8860B] group-hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-xs sm:text-[13px] block truncate leading-tight">
                      {item.label}
                    </span>
                    <span
                      className={`text-[10px] block truncate mt-0.5 ${
                        isActive ? 'text-black/80' : 'text-slate-400'
                      }`}
                    >
                      {item.description}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {item.badge !== undefined && (
                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-black text-[#F59E0B]'
                          : item.badgeColor || 'bg-white/10 text-white'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight
                    className={`w-3.5 h-3.5 transition-transform ${
                      isActive ? 'translate-x-0.5 text-black' : 'text-slate-500'
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </nav>

        {/* PARTE INFERIOR: Enlaces de navegación y Cerrar sesión */}
        <div className="p-4 border-t border-white/10 space-y-2 bg-black/30">
          <Link
            to="/"
            className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-bold flex items-center justify-between transition-colors"
          >
            <div className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4 text-[#B8860B]" />
              <span>Ver Sitio Web</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
          </Link>

          <button
            type="button"
            onClick={signOut}
            className="w-full px-3.5 py-2.5 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-200 text-xs font-bold flex items-center justify-between transition-colors cursor-pointer border border-red-500/20"
          >
            <div className="flex items-center gap-2">
              <LogOut className="w-4 h-4 text-red-400" />
              <span>Cerrar Sesión</span>
            </div>
          </button>
        </div>
      </aside>
    </>
  );
};
