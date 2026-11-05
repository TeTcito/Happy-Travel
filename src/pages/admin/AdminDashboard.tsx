import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCMS } from '../../context/CMSContext';
import { saveModulesToSupabase } from '../../lib/supabase';
import { AdminSidebar, type AdminModuleTab } from '../../components/admin/AdminSidebar';
import { AdminProfileSection } from '../../components/admin/AdminProfileSection';
import { AdminDatabaseSection } from '../../components/admin/AdminDatabaseSection';
import { AdminMediaUploader } from '../../components/admin/AdminMediaUploader';
import { AdminSaveModal, type SaveModalState } from '../../components/admin/AdminSaveModal';
import type {
  PopularDestinationItem,
  PopularRouteItem,
  VisitedDestinationItem,
  FleetClassItem,
  ParcelServiceItem,
} from '../../types/cms';
import {
  ArrowLeft,
  ExternalLink,
  Plus,
  Pencil,
  Trash2,
  CheckCircle2,
  X,
  Save,
  Compass,
  Route as RouteIcon,
  Building2,
  Car,
  Package,
  FileText,
  MapPin,
  Shield,
  ArrowUpRight,
  Eye,
  Database,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    popularDestinations,
    addPopularDestination,
    updatePopularDestination,
    deletePopularDestination,

    popularRoutes,
    addPopularRoute,
    updatePopularRoute,
    deletePopularRoute,

    visitedDestinations,
    addVisitedDestination,
    updateVisitedDestination,
    deleteVisitedDestination,

    fleetClasses,
    addFleetClass,
    updateFleetClass,
    deleteFleetClass,

    parcelServices,
    addParcelService,
    updateParcelService,
    deleteParcelService,
  } = useCMS();

  const [activeTab, setActiveTab] = useState<AdminModuleTab>('destinos-populares');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3800);
  };

  const [isMediaUploading, setIsMediaUploading] = useState(false);

  const [saveModal, setSaveModal] = useState<{
    isOpen: boolean;
    state: SaveModalState;
    savingTitle?: string;
    savingMessage?: string;
    successTitle?: string;
    successMessage?: string;
    errorMessage?: string;
    onComplete?: () => void;
  }>({
    isOpen: false,
    state: 'idle',
  });

  // =========================================================================
  // ESTADOS DE EDICIÓN / CREACIÓN
  // =========================================================================

  // Módulo 1: Destinos Populares (Carrusel Inicio)
  const [editingDest, setEditingDest] = useState<PopularDestinationItem | null>(null);
  const [isCreatingDest, setIsCreatingDest] = useState(false);
  const activeDest: PopularDestinationItem | null =
    editingDest || (popularDestinations.length > 0 ? popularDestinations[0] : null);

  // Módulo 2: Rutas Más Populares (Carrusel Servicios)
  const [editingRoute, setEditingRoute] = useState<PopularRouteItem | null>(null);
  const [isCreatingRoute, setIsCreatingRoute] = useState(false);
  const activeRoute: PopularRouteItem | null =
    editingRoute || (popularRoutes.length > 0 ? popularRoutes[0] : null);

  // Módulo 3: Destinos Más Visitados (Grilla & Móvil)
  const [editingVisDest, setEditingVisDest] = useState<VisitedDestinationItem | null>(null);
  const [isCreatingVisDest, setIsCreatingVisDest] = useState(false);
  const activeVisDest: VisitedDestinationItem | null =
    editingVisDest || (visitedDestinations.length > 0 ? visitedDestinations[0] : null);

  // Módulo 4: Nuestra Flota / Clases
  const [editingFleet, setEditingFleet] = useState<FleetClassItem | null>(null);
  const [isCreatingFleet, setIsCreatingFleet] = useState(false);
  const activeFleet: FleetClassItem | null =
    editingFleet || (fleetClasses.length > 0 ? fleetClasses[0] : null);

  // Módulo 5: Servicios de Encomienda
  const [editingParcel, setEditingParcel] = useState<ParcelServiceItem | null>(null);
  const [isCreatingParcel, setIsCreatingParcel] = useState(false);
  const activeParcel: ParcelServiceItem | null =
    editingParcel || (parcelServices.length > 0 ? parcelServices[0] : null);

  // =========================================================================
  // HANDLERS: MÓDULO 1 - DESTINOS POPULARES
  // =========================================================================
  const handleStartNewDest = () => {
    setIsCreatingDest(true);
    setEditingDest({
      id: `dest-${Date.now()}`,
      name: '',
      province: 'Ecuador',
      tag: 'Destino Destacado',
      iconicHighlight: 'Atractivo Icónico',
      description: 'Descripción del destino turístico y traslado privado puerta a puerta.',
      image: '/destinations/manta-skyline-coastal.webp',
      mediaType: 'image',
    });
  };

  const handleSaveDest = async (e: React.FormEvent) => {
    e.preventDefault();
    const itemToSave = editingDest || activeDest;
    if (!itemToSave || !itemToSave.name.trim()) return;
    if (isMediaUploading) {
      showToast('⏳ Espere un momento mientras termina de subirse la imagen.');
      return;
    }
    const isCreating = isCreatingDest;
    const itemName = itemToSave.name;

    setSaveModal({
      isOpen: true,
      state: 'saving',
      savingTitle: isCreating ? 'Guardando Nuevo Destino...' : 'Guardando Destino Popular...',
      savingMessage: `Sincronizando "${itemName}" con la web de Happy Travel...`,
      successTitle: '¡Destino Guardado con Éxito!',
      successMessage: `"${itemName}" se actualizó correctamente en el carrusel de inicio.`,
      onComplete: () => {
        setIsCreatingDest(false);
        setEditingDest(null);
        setSaveModal((prev) => ({ ...prev, isOpen: false, state: 'idle' }));
      },
    });

    try {
      let nextDestinations = popularDestinations;
      if (isCreating) {
        const { id: _unusedId, ...rest } = itemToSave;
        void _unusedId;
        const newItem = { ...rest, id: `dest-${Date.now()}` };
        addPopularDestination(rest);
        nextDestinations = [...popularDestinations, newItem];
      } else {
        updatePopularDestination(itemToSave);
        nextDestinations = popularDestinations.map((d) => (d.id === itemToSave.id ? itemToSave : d));
      }

      await saveModulesToSupabase({
        popularDestinations: nextDestinations,
        popularRoutes,
        visitedDestinations,
        fleetClasses,
        parcelServices,
      });

      await new Promise((resolve) => setTimeout(resolve, 850));
      setSaveModal((prev) => ({ ...prev, state: 'success' }));
    } catch (err: any) {
      setSaveModal((prev) => ({
        ...prev,
        state: 'error',
        errorMessage: err?.message || 'No se pudo guardar el destino.',
      }));
    }
  };

  // =========================================================================
  // HANDLERS: MÓDULO 2 - RUTAS MÁS POPULARES
  // =========================================================================
  const handleStartNewRoute = () => {
    setIsCreatingRoute(true);
    setEditingRoute({
      id: `route-${Date.now()}`,
      title: 'Quito - Cuenca',
      origin: 'Quito',
      destination: 'Cuenca',
      duration: '8h 00m   Ruta Directa',
      vehicleType: 'SUV / Van Ejecutiva VIP',
      included: 'Equipaje y Peajes Incluidos',
      price: 'Desde $180',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Vista_cerro_santa_ana.jpg/1280px-Vista_cerro_santa_ana.jpg',
      mediaType: 'image',
    });
  };

  const handleSaveRoute = async (e: React.FormEvent) => {
    e.preventDefault();
    const itemToSave = editingRoute || activeRoute;
    if (!itemToSave || !itemToSave.title.trim()) return;
    if (isMediaUploading) {
      showToast('⏳ Espere mientras termina de procesarse la multimedia.');
      return;
    }
    const isCreating = isCreatingRoute;
    const routeTitle = itemToSave.title;

    setSaveModal({
      isOpen: true,
      state: 'saving',
      savingTitle: isCreating ? 'Guardando Nueva Ruta...' : 'Guardando Ruta Popular...',
      savingMessage: `Sincronizando "${routeTitle}" en la base de datos...`,
      successTitle: '¡Ruta Guardada con Éxito!',
      successMessage: `"${routeTitle}" se guardó y sincronizó correctamente en la web.`,
      onComplete: () => {
        setIsCreatingRoute(false);
        setEditingRoute(null);
        setSaveModal((prev) => ({ ...prev, isOpen: false, state: 'idle' }));
      },
    });

    try {
      let nextRoutes = popularRoutes;
      if (isCreating) {
        const { id: _unusedId, ...rest } = itemToSave;
        void _unusedId;
        const newItem = { ...rest, id: `route-${Date.now()}` };
        addPopularRoute(rest);
        nextRoutes = [...popularRoutes, newItem];
      } else {
        updatePopularRoute(itemToSave);
        nextRoutes = popularRoutes.map((r) => (r.id === itemToSave.id ? itemToSave : r));
      }

      await saveModulesToSupabase({
        popularDestinations,
        popularRoutes: nextRoutes,
        visitedDestinations,
        fleetClasses,
        parcelServices,
      });

      await new Promise((resolve) => setTimeout(resolve, 850));
      setSaveModal((prev) => ({ ...prev, state: 'success' }));
    } catch (err: any) {
      setSaveModal((prev) => ({
        ...prev,
        state: 'error',
        errorMessage: err?.message || 'No se pudo guardar la ruta.',
      }));
    }
  };

  // =========================================================================
  // HANDLERS: MÓDULO 3 - DESTINOS MÁS VISITADOS
  // =========================================================================
  const handleStartNewVisDest = () => {
    setIsCreatingVisDest(true);
    setEditingVisDest({
      id: `vis-${Date.now()}`,
      name: '',
      province: 'Ecuador • Destino Turístico',
      description: 'Atractivos turísticos y gastronomía.',
      image: '/destinations/cotopaxi-volcano.webp',
      mediaType: 'image',
    });
  };

  const handleSaveVisDest = async (e: React.FormEvent) => {
    e.preventDefault();
    const itemToSave = editingVisDest || activeVisDest;
    if (!itemToSave || !itemToSave.name.trim()) return;
    if (isMediaUploading) {
      showToast('⏳ Espere mientras termina de procesarse la multimedia.');
      return;
    }
    const isCreating = isCreatingVisDest;
    const destName = itemToSave.name;

    setSaveModal({
      isOpen: true,
      state: 'saving',
      savingTitle: isCreating ? 'Guardando Destino...' : 'Guardando Cambios...',
      savingMessage: `Sincronizando "${destName}" en la nube...`,
      successTitle: '¡Destino Guardado con Éxito!',
      successMessage: `"${destName}" ya está actualizado en la sección de Destinos Más Visitados.`,
      onComplete: () => {
        setIsCreatingVisDest(false);
        setEditingVisDest(null);
        setSaveModal((prev) => ({ ...prev, isOpen: false, state: 'idle' }));
      },
    });

    try {
      let nextVis = visitedDestinations;
      if (isCreating) {
        const { id: _unusedId, ...rest } = itemToSave;
        void _unusedId;
        const newItem = { ...rest, id: `vis-${Date.now()}` };
        addVisitedDestination(rest);
        nextVis = [...visitedDestinations, newItem];
      } else {
        updateVisitedDestination(itemToSave);
        nextVis = visitedDestinations.map((v) => (v.id === itemToSave.id ? itemToSave : v));
      }

      await saveModulesToSupabase({
        popularDestinations,
        popularRoutes,
        visitedDestinations: nextVis,
        fleetClasses,
        parcelServices,
      });

      await new Promise((resolve) => setTimeout(resolve, 850));
      setSaveModal((prev) => ({ ...prev, state: 'success' }));
    } catch (err: any) {
      setSaveModal((prev) => ({
        ...prev,
        state: 'error',
        errorMessage: err?.message || 'No se pudo guardar el destino visitado.',
      }));
    }
  };

  // =========================================================================
  // HANDLERS: MÓDULO 4 - NUESTRA FLOTA / CATEGORÍAS
  // =========================================================================
  const handleStartNewFleet = () => {
    setIsCreatingFleet(true);
    setEditingFleet({
      id: `fleet-${Date.now()}`,
      title: 'Clase Especial',
      subtitle: 'Para ocasiones VIP',
      vehicleName: 'SUV Blindada / Van Ejecutiva',
      description: 'Vehículos de alta gama con chófer profesional.',
      image: '/fleet/class_luxury.jpg',
      mediaType: 'image',
    });
  };

  const handleSaveFleet = async (e: React.FormEvent) => {
    e.preventDefault();
    const itemToSave = editingFleet || activeFleet;
    if (!itemToSave || !itemToSave.title.trim()) return;
    if (isMediaUploading) {
      showToast('⏳ Espere mientras termina de procesarse la multimedia.');
      return;
    }
    const isCreating = isCreatingFleet;
    const fleetTitle = itemToSave.title;

    setSaveModal({
      isOpen: true,
      state: 'saving',
      savingTitle: isCreating ? 'Guardando Categoría de Flota...' : 'Guardando Cambios de Flota...',
      savingMessage: `Sincronizando "${fleetTitle}"...`,
      successTitle: '¡Flota Guardada con Éxito!',
      successMessage: `"${fleetTitle}" se sincronizó y ya está visible en la sección de flota.`,
      onComplete: () => {
        setIsCreatingFleet(false);
        setEditingFleet(null);
        setSaveModal((prev) => ({ ...prev, isOpen: false, state: 'idle' }));
      },
    });

    try {
      let nextFleet = fleetClasses;
      if (isCreating) {
        const { id: _unusedId, ...rest } = itemToSave;
        void _unusedId;
        const newItem = { ...rest, id: `fleet-${Date.now()}` };
        addFleetClass(rest);
        nextFleet = [...fleetClasses, newItem];
      } else {
        updateFleetClass(itemToSave);
        nextFleet = fleetClasses.map((f) => (f.id === itemToSave.id ? itemToSave : f));
      }

      await saveModulesToSupabase({
        popularDestinations,
        popularRoutes,
        visitedDestinations,
        fleetClasses: nextFleet,
        parcelServices,
      });

      await new Promise((resolve) => setTimeout(resolve, 850));
      setSaveModal((prev) => ({ ...prev, state: 'success' }));
    } catch (err: any) {
      setSaveModal((prev) => ({
        ...prev,
        state: 'error',
        errorMessage: err?.message || 'No se pudo guardar la clase de vehículo.',
      }));
    }
  };

  // =========================================================================
  // HANDLERS: MÓDULO 5 - SERVICIOS DE ENCOMIENDA
  // =========================================================================
  const handleStartNewParcel = () => {
    setIsCreatingParcel(true);
    setEditingParcel({
      id: `srv-${Date.now()}`,
      title: 'Nueva Modalidad de Encomienda',
      category: 'Servicio Dedicado',
      tag: 'Directo y Seguro',
      description: 'Descripción del traslado de encomienda y paquetería puerta a puerta.',
      image: '/parcels/parcel-cargo-trunk.jpg',
      mediaType: 'image',
    });
  };

  const handleSaveParcel = async (e: React.FormEvent) => {
    e.preventDefault();
    const itemToSave = editingParcel || activeParcel;
    if (!itemToSave || !itemToSave.title.trim()) return;
    if (isMediaUploading) {
      showToast('⏳ Espere mientras termina de procesarse la multimedia.');
      return;
    }
    const isCreating = isCreatingParcel;
    const parcelTitle = itemToSave.title;

    setSaveModal({
      isOpen: true,
      state: 'saving',
      savingTitle: isCreating ? 'Guardando Servicio de Encomienda...' : 'Guardando Cambios...',
      savingMessage: `Sincronizando "${parcelTitle}" con la web...`,
      successTitle: '¡Servicio Guardado con Éxito!',
      successMessage: `"${parcelTitle}" se guardó y sincronizó correctamente en la sección de encomiendas.`,
      onComplete: () => {
        setIsCreatingParcel(false);
        setEditingParcel(null);
        setSaveModal((prev) => ({ ...prev, isOpen: false, state: 'idle' }));
      },
    });

    try {
      let nextParcels = parcelServices;
      if (isCreating) {
        const { id: _unusedId, ...rest } = itemToSave;
        void _unusedId;
        const newItem = { ...rest, id: `srv-${Date.now()}` };
        addParcelService(rest);
        nextParcels = [...parcelServices, newItem];
      } else {
        updateParcelService(itemToSave);
        nextParcels = parcelServices.map((p) => (p.id === itemToSave.id ? itemToSave : p));
      }

      await saveModulesToSupabase({
        popularDestinations,
        popularRoutes,
        visitedDestinations,
        fleetClasses,
        parcelServices: nextParcels,
      });

      await new Promise((resolve) => setTimeout(resolve, 850));
      setSaveModal((prev) => ({ ...prev, state: 'success' }));
    } catch (err: any) {
      setSaveModal((prev) => ({
        ...prev,
        state: 'error',
        errorMessage: err?.message || 'No se pudo guardar el servicio de encomienda.',
      }));
    }
  };

  // Enlace contextual de previsualización según la pestaña activa
  const getModulePreviewRoute = (): { hash: string; label: string } => {
    switch (activeTab) {
      case 'destinos-populares':
        return { hash: '/#inicio', label: 'Ver Carrusel en Inicio' };
      case 'rutas-populares':
      case 'destinos-visitados':
      case 'flota-clases':
        return { hash: '/#servicios', label: 'Ver en Página de Servicios' };
      case 'encomiendas-servicios':
        return { hash: '/#encomiendas', label: 'Ver en Página de Encomiendas' };
      default:
        return { hash: '/', label: 'Ver Sitio Web' };
    }
  };

  const previewLink = getModulePreviewRoute();

  return (
    <div className="h-screen bg-[#F5F2EB] flex flex-col md:flex-row font-sans text-slate-900 overflow-hidden">
      {/* =================================================================
          PANEL LATERAL IZQUIERDO (SIDEBAR)
         ================================================================= */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setIsCreatingDest(false);
          setEditingDest(null);
          setIsCreatingRoute(false);
          setEditingRoute(null);
          setIsCreatingVisDest(false);
          setEditingVisDest(null);
          setIsCreatingFleet(false);
          setEditingFleet(null);
          setIsCreatingParcel(false);
          setEditingParcel(null);
        }}
        counts={{
          destinosPopulares: popularDestinations.length,
          rutasPopulares: popularRoutes.length,
          destinosVisitados: visitedDestinations.length,
          flotaClases: fleetClasses.length,
          encomiendasServicios: parcelServices.length,
        }}
      />

      {/* =================================================================
          PANEL DERECHO: BARRA SUPERIOR FIJA + CONTENIDO SCROLLABLE INDEPENDIENTE
         ================================================================= */}
      <div className="flex-1 min-w-0 flex flex-col h-full overflow-hidden">
        {/* BARRA SUPERIOR FIJA */}
        <header className="shrink-0 z-20 bg-[#080A0E] text-white border-b border-[#B8860B]/30 px-5 sm:px-8 py-3.5 shadow-md flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#F59E0B] block">
                Administración Happy Travel · Sincronización Activa
              </span>
              <span className="text-xs text-slate-300 hidden sm:block">
                Todos los cambios se reflejan inmediatamente en el sitio web y en la nube.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setActiveTab('database')}
              className={`px-3.5 py-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'database'
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50'
                  : 'bg-white/10 hover:bg-white/15 text-slate-200 border-[#B8860B]/35'
              }`}
            >
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              <span>Base de Datos (Supabase)</span>
            </button>

            <a
              href={previewLink.hash}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-[#F59E0B] border border-[#B8860B]/35 text-xs font-bold flex items-center gap-1.5 transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>{previewLink.label}</span>
            </a>

            <Link
              to="/"
              className="px-4 py-2 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-black font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Regresar al Sitio Web</span>
            </Link>
          </div>
        </header>

        {/* NOTIFICACIÓN FLOTANTE TOAST */}
        {toastMsg && (
          <div className="fixed bottom-5 right-5 z-50 max-w-md p-4 rounded-2xl bg-[#080A0E] text-white border border-[#B8860B] shadow-xl flex items-center justify-between gap-3 animate-fadeIn">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <span className="text-xs sm:text-sm font-semibold">{toastMsg}</span>
            </div>
            <button
              type="button"
              onClick={() => setToastMsg(null)}
              className="text-slate-400 hover:text-white p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* VENTANA EMERGENTE CON ANIMACIÓN DE GUARDADO */}
        <AdminSaveModal
          isOpen={saveModal.isOpen}
          state={saveModal.state}
          savingTitle={saveModal.savingTitle}
          savingMessage={saveModal.savingMessage}
          successTitle={saveModal.successTitle}
          successMessage={saveModal.successMessage}
          errorMessage={saveModal.errorMessage}
          onClose={() => setSaveModal((prev) => ({ ...prev, isOpen: false, state: 'idle' }))}
          onSuccessComplete={() => {
            if (saveModal.onComplete) {
              saveModal.onComplete();
            } else {
              setSaveModal((prev) => ({ ...prev, isOpen: false, state: 'idle' }));
            }
          }}
        />

        {/* CONTENIDO PRINCIPAL SCROLLABLE */}
        <main className="flex-1 overflow-y-auto min-w-0 flex flex-col justify-between p-[15px] space-y-[15px]">
          {/* ===============================================================
              MÓDULO: MI PERFIL
             =============================================================== */}
          {activeTab === 'profile' && <AdminProfileSection />}

          {/* ===============================================================
              MÓDULO: BASE DE DATOS Y SUPABASE
             =============================================================== */}
          {activeTab === 'database' && <AdminDatabaseSection />}

          {/* ===============================================================
              MÓDULO 1: DESTINOS POPULARES EN ECUADOR
             =============================================================== */}
          {activeTab === 'destinos-populares' && (
            <div className="space-y-[15px]">
              {!editingDest && !isCreatingDest ? (
                /* ESTANTE GENERAL DE DESTINOS POPULARES */
                <div className="space-y-[15px]">
                  <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#B8860B]/15 text-[#92400E] text-[11px] font-bold uppercase tracking-wider mb-1.5">
                        <Compass className="w-3.5 h-3.5" />
                        <span>Página: Inicio · Carrusel Destinos Populares en Ecuador</span>
                      </div>
                      <h2 className="font-display font-extrabold text-xl sm:text-2xl text-slate-900">
                        Destinos Populares ({popularDestinations.length})
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        &quot;Conduce hacia tu Próxima Aventura&quot;. Seleccione una tarjeta para editar o agregue un nuevo destino.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleStartNewDest}
                      className="px-4 py-2.5 rounded-xl bg-black hover:bg-slate-900 text-[#F59E0B] text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all shrink-0 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>+ Nuevo Destino</span>
                    </button>
                  </div>

                  {/* Grilla de Tarjetas */}
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[15px]">
                    {popularDestinations.map((dest, idx) => (
                      <div
                        key={dest.id}
                        className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between group"
                      >
                        <div>
                          <div className="relative aspect-video overflow-hidden bg-black">
                            <img
                              src={dest.image}
                              alt={dest.name}
                              style={{ objectPosition: dest.imagePosition || '50% 50%' }}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                              <span className="px-2 py-0.5 rounded-full bg-black/85 text-[#F59E0B] text-[10px] font-bold">
                                #{idx + 1} · {dest.province}
                              </span>
                            </div>
                            <div className="absolute bottom-2.5 left-2.5 right-2.5">
                              <span className="px-2 py-0.5 rounded-md bg-amber-500/90 text-black text-[10px] font-bold tracking-wide">
                                {dest.tag}
                              </span>
                            </div>
                          </div>

                          <div className="p-4 space-y-2">
                            <h3 className="font-display font-extrabold text-lg text-slate-900 leading-snug">
                              {dest.name}
                            </h3>
                            <p className="text-xs font-semibold text-[#B8860B] line-clamp-1">
                              {dest.iconicHighlight}
                            </p>
                            <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                              {dest.description}
                            </p>
                          </div>
                        </div>

                        <div className="px-4 py-3 bg-[#FAF7F2] border-t border-slate-200/80 flex items-center justify-between">
                          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                            Carrusel Inicio
                          </span>
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => {
                                setEditingDest(dest);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }}
                              className="px-2.5 py-1 rounded-lg bg-black hover:bg-slate-900 text-[#F59E0B] text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              <Pencil className="w-3 h-3" />
                              <span>Editar</span>
                            </button>
                            {popularDestinations.length > 1 && (
                              <button
                                type="button"
                                onClick={() => {
                                  if (window.confirm(`¿Eliminar "${dest.name}" del carrusel de inicio?`)) {
                                    deletePopularDestination(dest.id);
                                    showToast('Destino eliminado del carrusel.');
                                  }
                                }}
                                className="p-1 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer"
                                title="Eliminar tarjeta"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                /* EDICIÓN DE DESTINO POPULAR (3 BLOQUES EN LÍNEA) */
                <form onSubmit={handleSaveDest} className="space-y-[15px] animate-fadeIn">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-300/80">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setIsCreatingDest(false);
                          setEditingDest(null);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 text-xs font-bold flex items-center gap-1.5 border border-slate-300 shadow-2xs transition-colors cursor-pointer"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Volver a las tarjetas</span>
                      </button>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
                        {isCreatingDest ? 'Creando Nuevo Destino Popular' : `Editando: ${editingDest?.name || 'Destino'}`}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-[15px] items-stretch">
                    {/* COLUMNA 1: FORMULARIO DE DATOS */}
                    <div className="space-y-4 bg-white p-5 rounded-2xl border border-slate-200">
                      <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                        <FileText className="w-4 h-4 text-[#B8860B]" />
                        <h3 className="font-bold text-xs sm:text-sm uppercase text-slate-900">
                          1. Información del Destino
                        </h3>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Ciudad / Destino <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={editingDest?.name || ''}
                          onChange={(e) =>
                            setEditingDest((prev) => prev ? { ...prev, name: e.target.value } : null)
                          }
                          placeholder="Ej: Quito, Baños, Cuenca..."
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-semibold text-slate-900 focus:outline-none focus:border-black"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Provincia / Región
                        </label>
                        <input
                          type="text"
                          value={editingDest?.province || ''}
                          onChange={(e) =>
                            setEditingDest((prev) => prev ? { ...prev, province: e.target.value } : null)
                          }
                          placeholder="Pichincha, Guayas, Tungurahua..."
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-900"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Etiqueta / Badge Superior
                        </label>
                        <input
                          type="text"
                          value={editingDest?.tag || ''}
                          onChange={(e) =>
                            setEditingDest((prev) => prev ? { ...prev, tag: e.target.value } : null)
                          }
                          placeholder="Patrimonio de la Humanidad"
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-900"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Atractivo Icónico / Highlight
                        </label>
                        <input
                          type="text"
                          value={editingDest?.iconicHighlight || ''}
                          onChange={(e) =>
                            setEditingDest((prev) => prev ? { ...prev, iconicHighlight: e.target.value } : null)
                          }
                          placeholder="Centro Histórico & Mitad del Mundo"
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-900"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Descripción Resumida
                        </label>
                        <textarea
                          rows={3}
                          value={editingDest?.description || ''}
                          onChange={(e) =>
                            setEditingDest((prev) => prev ? { ...prev, description: e.target.value } : null)
                          }
                          placeholder="Detalle los atractivos y ventajas del viaje puerta a puerta..."
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 resize-none"
                        />
                      </div>
                    </div>

                    {/* COLUMNA 2: MULTIMEDIA */}
                    <div className="bg-white p-5 rounded-2xl border border-slate-200">
                      <AdminMediaUploader
                        label="2. Fotografía del Destino (WebP)"
                        imageUrl={editingDest?.image || ''}
                        imagePosition={editingDest?.imagePosition || '50% 50%'}
                        onImageChange={(url) =>
                          setEditingDest((prev) => prev ? { ...prev, image: url } : null)
                        }
                        onImagePositionChange={(pos) =>
                          setEditingDest((prev) => prev ? { ...prev, imagePosition: pos } : null)
                        }
                        allowVideo={false}
                        onProcessingChange={setIsMediaUploading}
                      />
                    </div>

                    {/* COLUMNA 3: VISTA PREVIA EXACTA & GUARDAR */}
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center gap-2 pb-2 border-b border-slate-200 mb-3">
                          <Eye className="w-4 h-4 text-[#B8860B]" />
                          <h3 className="font-bold text-xs sm:text-sm uppercase text-slate-900">
                            3. Vista Previa en el Carrusel
                          </h3>
                        </div>

                        {/* Tarjeta idéntica a HomeTab */}
                        <div className="relative rounded-2xl overflow-hidden shadow-md border border-slate-200 bg-black aspect-[4/3] group">
                          <img
                            src={editingDest?.image || '/destinations/manta-skyline-coastal.webp'}
                            alt={editingDest?.name}
                            style={{ objectPosition: editingDest?.imagePosition || '50% 50%' }}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                          <div className="absolute top-3 left-3">
                            <span className="px-2.5 py-1 rounded-full bg-amber-500 text-black text-[10px] font-extrabold uppercase tracking-wider">
                              {editingDest?.tag || 'Destino'}
                            </span>
                          </div>
                          <div className="absolute bottom-3 left-3 right-3 text-white">
                            <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider block">
                              {editingDest?.province || 'Ecuador'}
                            </span>
                            <h4 className="font-display font-extrabold text-xl text-white">
                              {editingDest?.name || 'Nombre del Destino'}
                            </h4>
                            <p className="text-[11px] text-slate-200 mt-1 line-clamp-2">
                              {editingDest?.description}
                            </p>
                          </div>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isMediaUploading}
                        className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#B8860B] via-[#F59E0B] to-[#B8860B] hover:brightness-105 text-black font-extrabold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all"
                      >
                        <Save className="w-4 h-4" />
                        <span>Guardar Cambios del Destino</span>
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* ===============================================================
              MÓDULO 2: RUTAS MÁS POPULARES
             =============================================================== */}
          {activeTab === 'rutas-populares' && (
            <div className="space-y-[15px]">
              {!editingRoute && !isCreatingRoute ? (
                <div className="space-y-[15px]">
                  <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#F59E0B]/20 text-[#92400E] text-[11px] font-bold uppercase tracking-wider mb-1.5">
                        <RouteIcon className="w-3.5 h-3.5" />
                        <span>Página: Servicios · Carrusel Rutas Más Populares con Costos</span>
                      </div>
                      <h2 className="font-display font-extrabold text-xl sm:text-2xl text-slate-900">
                        Rutas Más Populares ({popularRoutes.length})
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        &quot;Trayectos puerta a puerta más elegidos por nuestros clientes con tarifas referenciales&quot;.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleStartNewRoute}
                      className="px-4 py-2.5 rounded-xl bg-black hover:bg-slate-900 text-[#F59E0B] text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all shrink-0 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>+ Nueva Ruta</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[15px]">
                    {popularRoutes.map((route, idx) => (
                      <div
                        key={route.id}
                        className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between group"
                      >
                        <div>
                          <div className="relative aspect-[16/10] overflow-hidden bg-black">
                            <img
                              src={route.image}
                              alt={route.title}
                              style={{ objectPosition: route.imagePosition || '50% 50%' }}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-2.5 left-2.5">
                              <span className="px-2 py-0.5 rounded-full bg-black/85 text-[#F59E0B] text-[10px] font-bold">
                                #{idx + 1} · {route.duration}
                              </span>
                            </div>
                            <div className="absolute top-2.5 right-2.5">
                              <span className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-xs font-extrabold shadow">
                                {route.price}
                              </span>
                            </div>
                          </div>

                          <div className="p-4 space-y-2">
                            <h3 className="font-serif italic font-bold text-xl text-slate-900">
                              {route.title}
                            </h3>
                            <div className="space-y-1 text-xs text-slate-600 pt-1">
                              <div className="flex items-center gap-1.5">
                                <Car className="w-3.5 h-3.5 text-[#B8860B] shrink-0" />
                                <span>{route.vehicleType}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <Shield className="w-3.5 h-3.5 text-[#B8860B] shrink-0" />
                                <span>{route.included}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="px-4 py-3 bg-[#FAF7F2] border-t border-slate-200/80 flex items-center justify-between">
                          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                            Carrusel Servicios
                          </span>
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => {
                                setEditingRoute(route);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }}
                              className="px-2.5 py-1 rounded-lg bg-black hover:bg-slate-900 text-[#F59E0B] text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              <Pencil className="w-3 h-3" />
                              <span>Editar</span>
                            </button>
                            {popularRoutes.length > 1 && (
                              <button
                                type="button"
                                onClick={() => {
                                  if (window.confirm(`¿Eliminar la ruta "${route.title}"?`)) {
                                    deletePopularRoute(route.id);
                                    showToast('Ruta eliminada.');
                                  }
                                }}
                                className="p-1 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                /* EDICIÓN DE RUTA POPULAR */
                <form onSubmit={handleSaveRoute} className="space-y-[15px] animate-fadeIn">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-300/80">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setIsCreatingRoute(false);
                          setEditingRoute(null);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 text-xs font-bold flex items-center gap-1.5 border border-slate-300 shadow-2xs transition-colors cursor-pointer"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Volver a las tarjetas</span>
                      </button>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
                        {isCreatingRoute ? 'Creando Nueva Ruta' : `Editando: ${editingRoute?.title || 'Ruta'}`}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-[15px] items-stretch">
                    {/* COLUMNA 1: DATOS */}
                    <div className="space-y-4 bg-white p-5 rounded-2xl border border-slate-200">
                      <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                        <FileText className="w-4 h-4 text-[#B8860B]" />
                        <h3 className="font-bold text-xs sm:text-sm uppercase text-slate-900">
                          1. Información de la Ruta
                        </h3>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Título de la Ruta <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={editingRoute?.title || ''}
                          onChange={(e) =>
                            setEditingRoute((prev) => prev ? { ...prev, title: e.target.value } : null)
                          }
                          placeholder="Quito - Guayaquil"
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-semibold text-slate-900 focus:outline-none focus:border-black"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                            Origen
                          </label>
                          <input
                            type="text"
                            value={editingRoute?.origin || ''}
                            onChange={(e) =>
                              setEditingRoute((prev) => prev ? { ...prev, origin: e.target.value } : null)
                            }
                            placeholder="Quito"
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-900"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                            Destino
                          </label>
                          <input
                            type="text"
                            value={editingRoute?.destination || ''}
                            onChange={(e) =>
                              setEditingRoute((prev) => prev ? { ...prev, destination: e.target.value } : null)
                            }
                            placeholder="Guayaquil"
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-900"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                            Duración / Trayecto
                          </label>
                          <input
                            type="text"
                            value={editingRoute?.duration || ''}
                            onChange={(e) =>
                              setEditingRoute((prev) => prev ? { ...prev, duration: e.target.value } : null)
                            }
                            placeholder="7h 30m   Ruta Directa"
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-900"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                            Tarifa Referencial
                          </label>
                          <input
                            type="text"
                            value={editingRoute?.price || ''}
                            onChange={(e) =>
                              setEditingRoute((prev) => prev ? { ...prev, price: e.target.value } : null)
                            }
                            placeholder="Desde $220"
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-900"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Tipo de Vehículo
                        </label>
                        <input
                          type="text"
                          value={editingRoute?.vehicleType || ''}
                          onChange={(e) =>
                            setEditingRoute((prev) => prev ? { ...prev, vehicleType: e.target.value } : null)
                          }
                          placeholder="SUV / Van Ejecutiva VIP"
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-900"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Inclusiones / Beneficios
                        </label>
                        <input
                          type="text"
                          value={editingRoute?.included || ''}
                          onChange={(e) =>
                            setEditingRoute((prev) => prev ? { ...prev, included: e.target.value } : null)
                          }
                          placeholder="Equipaje y Peajes Incluidos"
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-900"
                        />
                      </div>
                    </div>

                    {/* COLUMNA 2: MULTIMEDIA */}
                    <div className="bg-white p-5 rounded-2xl border border-slate-200">
                      <AdminMediaUploader
                        label="2. Fotografía de la Ruta (WebP)"
                        imageUrl={editingRoute?.image || ''}
                        imagePosition={editingRoute?.imagePosition || '50% 50%'}
                        onImageChange={(url) =>
                          setEditingRoute((prev) => prev ? { ...prev, image: url } : null)
                        }
                        onImagePositionChange={(pos) =>
                          setEditingRoute((prev) => prev ? { ...prev, imagePosition: pos } : null)
                        }
                        allowVideo={false}
                        onProcessingChange={setIsMediaUploading}
                      />
                    </div>

                    {/* COLUMNA 3: VISTA PREVIA Y GUARDAR */}
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center gap-2 pb-2 border-b border-slate-200 mb-3">
                          <Eye className="w-4 h-4 text-[#B8860B]" />
                          <h3 className="font-bold text-xs sm:text-sm uppercase text-slate-900">
                            3. Vista Previa en Servicios
                          </h3>
                        </div>

                        {/* Tarjeta idéntica a ServicesTab */}
                        <div className="relative h-[320px] rounded-[22px] overflow-hidden shadow-md border border-slate-900/10 group bg-black">
                          <img
                            src={editingRoute?.image || 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Vista_cerro_santa_ana.jpg/1280px-Vista_cerro_santa_ana.jpg'}
                            alt={editingRoute?.title}
                            style={{ objectPosition: editingRoute?.imagePosition || '50% 50%' }}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20" />
                          <div className="absolute top-3.5 left-3.5">
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/60 text-[#F59E0B] border border-[#B8860B]/30">
                              {editingRoute?.duration || 'Ruta Directa'}
                            </span>
                          </div>
                          <div className="absolute top-3.5 right-3.5">
                            <span className="px-3 py-1 rounded-xl text-xs font-black bg-emerald-500 text-white shadow">
                              {editingRoute?.price || 'Tarifa'}
                            </span>
                          </div>
                          <div className="absolute bottom-4 left-4 right-4 text-white">
                            <h4 className="font-serif italic font-bold text-2xl text-white">
                              {editingRoute?.title || 'Ruta'}
                            </h4>
                            <p className="text-xs text-amber-200 mt-1 font-medium">
                              {editingRoute?.vehicleType}
                            </p>
                            <p className="text-[11px] text-slate-300 mt-0.5">
                              {editingRoute?.included}
                            </p>
                          </div>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isMediaUploading}
                        className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#B8860B] via-[#F59E0B] to-[#B8860B] hover:brightness-105 text-black font-extrabold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all"
                      >
                        <Save className="w-4 h-4" />
                        <span>Guardar Cambios de la Ruta</span>
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* ===============================================================
              MÓDULO 3: DESTINOS MÁS VISITADOS
             =============================================================== */}
          {activeTab === 'destinos-visitados' && (
            <div className="space-y-[15px]">
              {!editingVisDest && !isCreatingVisDest ? (
                <div className="space-y-[15px]">
                  <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#B8860B]/15 text-[#92400E] text-[11px] font-bold uppercase tracking-wider mb-1.5">
                        <Building2 className="w-3.5 h-3.5" />
                        <span>Página: Servicios · Destinos Más Visitados (Grilla &amp; Carrusel Móvil)</span>
                      </div>
                      <h2 className="font-display font-extrabold text-xl sm:text-2xl text-slate-900">
                        Destinos Más Visitados ({visitedDestinations.length})
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        &quot;Explora las ciudades icónicas del Ecuador que nuestros clientes más visitan&quot;.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleStartNewVisDest}
                      className="px-4 py-2.5 rounded-xl bg-black hover:bg-slate-900 text-[#F59E0B] text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all shrink-0 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>+ Nuevo Destino Visitado</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[15px]">
                    {visitedDestinations.map((dest, idx) => (
                      <div
                        key={dest.id}
                        className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between group"
                      >
                        <div>
                          <div className="relative aspect-square overflow-hidden bg-black">
                            <img
                              src={dest.image}
                              alt={dest.name}
                              style={{ objectPosition: dest.imagePosition || '50% 50%' }}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-2.5 left-2.5">
                              <span className="px-2 py-0.5 rounded-full bg-black/85 text-[#F59E0B] text-[10px] font-bold">
                                #{idx + 1}
                              </span>
                            </div>
                            <div className="absolute bottom-2.5 left-2.5 right-2.5">
                              <span className="text-[10px] font-semibold text-amber-300 flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {dest.province}
                              </span>
                            </div>
                          </div>

                          <div className="p-4 space-y-1">
                            <h3 className="font-serif italic font-bold text-lg text-slate-900">
                              {dest.name}
                            </h3>
                            {dest.description && (
                              <p className="text-xs text-slate-500 line-clamp-2">
                                {dest.description}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="px-4 py-3 bg-[#FAF7F2] border-t border-slate-200/80 flex items-center justify-between">
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                            Grilla Servicios
                          </span>
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => {
                                setEditingVisDest(dest);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }}
                              className="px-2.5 py-1 rounded-lg bg-black hover:bg-slate-900 text-[#F59E0B] text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              <Pencil className="w-3 h-3" />
                              <span>Editar</span>
                            </button>
                            {visitedDestinations.length > 1 && (
                              <button
                                type="button"
                                onClick={() => {
                                  if (window.confirm(`¿Eliminar "${dest.name}"?`)) {
                                    deleteVisitedDestination(dest.id);
                                    showToast('Destino eliminado.');
                                  }
                                }}
                                className="p-1 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                /* EDICIÓN DE DESTINO VISITADO */
                <form onSubmit={handleSaveVisDest} className="space-y-[15px] animate-fadeIn">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-300/80">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setIsCreatingVisDest(false);
                          setEditingVisDest(null);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 text-xs font-bold flex items-center gap-1.5 border border-slate-300 shadow-2xs transition-colors cursor-pointer"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Volver a las tarjetas</span>
                      </button>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
                        {isCreatingVisDest ? 'Creando Destino Visitado' : `Editando: ${editingVisDest?.name}`}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-[15px] items-stretch">
                    <div className="space-y-4 bg-white p-5 rounded-2xl border border-slate-200">
                      <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                        <FileText className="w-4 h-4 text-[#B8860B]" />
                        <h3 className="font-bold text-xs sm:text-sm uppercase text-slate-900">
                          1. Datos de la Ciudad / Destino
                        </h3>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Nombre del Destino <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={editingVisDest?.name || ''}
                          onChange={(e) =>
                            setEditingVisDest((prev) => prev ? { ...prev, name: e.target.value } : null)
                          }
                          placeholder="Quito"
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-semibold text-slate-900 focus:outline-none focus:border-black"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Provincia / Subtítulo
                        </label>
                        <input
                          type="text"
                          value={editingVisDest?.province || ''}
                          onChange={(e) =>
                            setEditingVisDest((prev) => prev ? { ...prev, province: e.target.value } : null)
                          }
                          placeholder="Pichincha • Capital del Ecuador"
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-900"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Descripción Corta
                        </label>
                        <textarea
                          rows={3}
                          value={editingVisDest?.description || ''}
                          onChange={(e) =>
                            setEditingVisDest((prev) => prev ? { ...prev, description: e.target.value } : null)
                          }
                          placeholder="Centro colonial mejor conservado de América..."
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 resize-none"
                        />
                      </div>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-slate-200">
                      <AdminMediaUploader
                        label="2. Fotografía del Destino"
                        imageUrl={editingVisDest?.image || ''}
                        imagePosition={editingVisDest?.imagePosition || '50% 50%'}
                        onImageChange={(url) =>
                          setEditingVisDest((prev) => prev ? { ...prev, image: url } : null)
                        }
                        onImagePositionChange={(pos) =>
                          setEditingVisDest((prev) => prev ? { ...prev, imagePosition: pos } : null)
                        }
                        allowVideo={false}
                        onProcessingChange={setIsMediaUploading}
                      />
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center gap-2 pb-2 border-b border-slate-200 mb-3">
                          <Eye className="w-4 h-4 text-[#B8860B]" />
                          <h3 className="font-bold text-xs sm:text-sm uppercase text-slate-900">
                            3. Vista Previa
                          </h3>
                        </div>

                        <div className="relative aspect-square rounded-[22px] overflow-hidden shadow-md bg-black group">
                          <img
                            src={editingVisDest?.image || 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Quito_as_from_panecillo_Basilica.jpg/1280px-Quito_as_from_panecillo_Basilica.jpg'}
                            alt={editingVisDest?.name}
                            style={{ objectPosition: editingVisDest?.imagePosition || '50% 50%' }}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                          <div className="absolute bottom-4 left-4 right-4 text-white">
                            <h4 className="font-serif italic text-2xl font-bold leading-tight">
                              {editingVisDest?.name || 'Ciudad'}
                            </h4>
                            <div className="flex items-center gap-1.5 text-xs text-amber-300 font-medium mt-1">
                              <MapPin className="w-3.5 h-3.5 shrink-0" />
                              <span>{editingVisDest?.province}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isMediaUploading}
                        className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#B8860B] via-[#F59E0B] to-[#B8860B] hover:brightness-105 text-black font-extrabold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all"
                      >
                        <Save className="w-4 h-4" />
                        <span>Guardar Cambios</span>
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* ===============================================================
              MÓDULO 4: NUESTRA FLOTA / CATEGORÍAS DE VEHÍCULOS
             =============================================================== */}
          {activeTab === 'flota-clases' && (
            <div className="space-y-[15px]">
              {!editingFleet && !isCreatingFleet ? (
                <div className="space-y-[15px]">
                  <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold uppercase tracking-wider mb-1.5">
                        <Car className="w-3.5 h-3.5" />
                        <span>Página: Servicios · Categorías de la Flota (3 Tarjetas)</span>
                      </div>
                      <h2 className="font-display font-extrabold text-xl sm:text-2xl text-slate-900">
                        Categorías de la Flota ({fleetClasses.length})
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Clase Ejecutiva, Clase Premium y Clase de Lujo con sus especificaciones e imágenes.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleStartNewFleet}
                      className="px-4 py-2.5 rounded-xl bg-black hover:bg-slate-900 text-[#F59E0B] text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all shrink-0 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>+ Nueva Categoría</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-[15px]">
                    {fleetClasses.map((fleet, idx) => (
                      <div
                        key={fleet.id}
                        className="bg-white border border-slate-200/90 rounded-[14px] p-6 shadow-clean-sm hover:shadow-clean-lg transition-all flex flex-col justify-between group"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-black/5 text-slate-700">
                              #{idx + 1}
                            </span>
                            <span className="text-xs text-[#B8860B] font-bold">
                              {fleet.vehicleName}
                            </span>
                          </div>
                          <h3 className="font-sans font-bold text-slate-900 text-xl tracking-tight">
                            {fleet.title}
                          </h3>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {fleet.subtitle}
                          </p>
                          <div className="mt-4 -mx-6 overflow-hidden bg-slate-50">
                            <img
                              src={fleet.image}
                              alt={fleet.title}
                              style={{ objectPosition: fleet.imagePosition || '50% 50%' }}
                              className="w-full h-40 object-contain object-left block transform group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        </div>

                        <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingFleet(fleet);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="px-3 py-1.5 rounded-lg bg-black hover:bg-slate-900 text-[#F59E0B] text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                          >
                            <Pencil className="w-3 h-3" />
                            <span>Editar</span>
                          </button>
                          {fleetClasses.length > 1 && (
                            <button
                              type="button"
                              onClick={() => {
                                if (window.confirm(`¿Eliminar "${fleet.title}"?`)) {
                                  deleteFleetClass(fleet.id);
                                  showToast('Categoría eliminada.');
                                }
                              }}
                              className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                /* EDICIÓN DE CLASE DE FLOTA */
                <form onSubmit={handleSaveFleet} className="space-y-[15px] animate-fadeIn">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-300/80">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setIsCreatingFleet(false);
                          setEditingFleet(null);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 text-xs font-bold flex items-center gap-1.5 border border-slate-300 shadow-2xs transition-colors cursor-pointer"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Volver a las tarjetas</span>
                      </button>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
                        {isCreatingFleet ? 'Creando Categoría de Flota' : `Editando: ${editingFleet?.title}`}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-[15px] items-stretch">
                    <div className="space-y-4 bg-white p-5 rounded-2xl border border-slate-200">
                      <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                        <FileText className="w-4 h-4 text-[#B8860B]" />
                        <h3 className="font-bold text-xs sm:text-sm uppercase text-slate-900">
                          1. Datos de la Categoría
                        </h3>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Título <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={editingFleet?.title || ''}
                          onChange={(e) =>
                            setEditingFleet((prev) => prev ? { ...prev, title: e.target.value } : null)
                          }
                          placeholder="Clase Ejecutiva"
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-semibold text-slate-900 focus:outline-none focus:border-black"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Subtítulo
                        </label>
                        <input
                          type="text"
                          value={editingFleet?.subtitle || ''}
                          onChange={(e) =>
                            setEditingFleet((prev) => prev ? { ...prev, subtitle: e.target.value } : null)
                          }
                          placeholder="Para ejecutivos"
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-900"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Nombre del Vehículo / Tipo
                        </label>
                        <input
                          type="text"
                          value={editingFleet?.vehicleName || ''}
                          onChange={(e) =>
                            setEditingFleet((prev) => prev ? { ...prev, vehicleName: e.target.value } : null)
                          }
                          placeholder="Sedán Ejecutivo"
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-900"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Descripción
                        </label>
                        <textarea
                          rows={3}
                          value={editingFleet?.description || ''}
                          onChange={(e) =>
                            setEditingFleet((prev) => prev ? { ...prev, description: e.target.value } : null)
                          }
                          placeholder="Vehículo con máxima insonorización..."
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 resize-none"
                        />
                      </div>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-slate-200">
                      <AdminMediaUploader
                        label="2. Fotografía del Vehículo"
                        imageUrl={editingFleet?.image || ''}
                        imagePosition={editingFleet?.imagePosition || '50% 50%'}
                        onImageChange={(url) =>
                          setEditingFleet((prev) => prev ? { ...prev, image: url } : null)
                        }
                        onImagePositionChange={(pos) =>
                          setEditingFleet((prev) => prev ? { ...prev, imagePosition: pos } : null)
                        }
                        allowVideo={false}
                        onProcessingChange={setIsMediaUploading}
                      />
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center gap-2 pb-2 border-b border-slate-200 mb-3">
                          <Eye className="w-4 h-4 text-[#B8860B]" />
                          <h3 className="font-bold text-xs sm:text-sm uppercase text-slate-900">
                            3. Vista Previa en Servicios
                          </h3>
                        </div>

                        {/* Tarjeta idéntica a ServicesTab */}
                        <div className="bg-white border border-slate-200/90 rounded-[14px] p-6 shadow-clean-sm flex flex-col justify-between overflow-hidden">
                          <div>
                            <h3 className="font-sans font-bold text-slate-900 text-xl tracking-tight">
                              {editingFleet?.title || 'Clase Ejecutiva'}
                            </h3>
                            <p className="text-xs sm:text-[13px] text-slate-500 mt-1 font-normal">
                              {editingFleet?.subtitle || 'Para ejecutivos'}
                            </p>
                          </div>
                          <div className="mt-4 -mx-6 -mb-6 overflow-hidden">
                            <img
                              src={editingFleet?.image || '/fleet/class_business.jpg'}
                              alt={editingFleet?.title}
                              className="w-full h-auto object-contain object-left block"
                            />
                          </div>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isMediaUploading}
                        className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#B8860B] via-[#F59E0B] to-[#B8860B] hover:brightness-105 text-black font-extrabold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all"
                      >
                        <Save className="w-4 h-4" />
                        <span>Guardar Cambios de Flota</span>
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* ===============================================================
              MÓDULO 5: SERVICIOS DE ENCOMIENDA Y CARGA PRIVADA
             =============================================================== */}
          {activeTab === 'encomiendas-servicios' && (
            <div className="space-y-[15px]">
              {!editingParcel && !isCreatingParcel ? (
                <div className="space-y-[15px]">
                  <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[11px] font-bold uppercase tracking-wider mb-1.5">
                        <Package className="w-3.5 h-3.5 text-[#E11438]" />
                        <span>Página: Encomiendas · Carrusel de Modalidades Disponibles</span>
                      </div>
                      <h2 className="font-display font-extrabold text-xl sm:text-2xl text-slate-900">
                        Servicios de Encomienda y Carga ({parcelServices.length})
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        &quot;Modalidades Disponibles&quot;. Encomiendas en tu mismo viaje, envío exclusivo puerta a puerta, documentación y carga.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleStartNewParcel}
                      className="px-4 py-2.5 rounded-xl bg-[#E11438] hover:bg-[#C20F2E] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all shrink-0 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>+ Nueva Modalidad</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[15px]">
                    {parcelServices.map((service, idx) => (
                      <div
                        key={service.id}
                        className="bg-white rounded-[2rem] p-5 shadow-sm hover:shadow-xl transition-all border border-slate-200/80 flex flex-col justify-between group"
                      >
                        <div>
                          <div className="w-full h-44 rounded-2xl overflow-hidden mb-3 relative bg-slate-100">
                            <img
                              src={service.image}
                              alt={service.title}
                              style={{ objectPosition: service.imagePosition || '50% 50%' }}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/75 text-white text-[10px] font-bold">
                              {service.tag}
                            </span>
                            <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-white/90 text-slate-800 text-[10px] font-extrabold">
                              #{idx + 1}
                            </span>
                          </div>

                          <span className="text-[10px] font-bold text-[#E11438] uppercase tracking-wider block mb-1">
                            {service.category}
                          </span>
                          <h3 className="font-display font-extrabold text-base text-slate-900 group-hover:text-[#E11438] transition-colors leading-snug">
                            {service.title}
                          </h3>
                          <p className="text-xs text-slate-600 line-clamp-3 mt-2 leading-relaxed">
                            {service.description}
                          </p>
                        </div>

                        <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingParcel(service);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="px-2.5 py-1 rounded-lg bg-black hover:bg-slate-900 text-[#F59E0B] text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                          >
                            <Pencil className="w-3 h-3" />
                            <span>Editar</span>
                          </button>
                          {parcelServices.length > 1 && (
                            <button
                              type="button"
                              onClick={() => {
                                if (window.confirm(`¿Eliminar "${service.title}"?`)) {
                                  deleteParcelService(service.id);
                                  showToast('Servicio eliminado.');
                                }
                              }}
                              className="p-1 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                /* EDICIÓN DE MODALIDAD DE ENCOMIENDA */
                <form onSubmit={handleSaveParcel} className="space-y-[15px] animate-fadeIn">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-300/80">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setIsCreatingParcel(false);
                          setEditingParcel(null);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 text-xs font-bold flex items-center gap-1.5 border border-slate-300 shadow-2xs transition-colors cursor-pointer"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Volver a las tarjetas</span>
                      </button>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
                        {isCreatingParcel ? 'Creando Nueva Modalidad' : `Editando: ${editingParcel?.title}`}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-[15px] items-stretch">
                    <div className="space-y-4 bg-white p-5 rounded-2xl border border-slate-200">
                      <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                        <FileText className="w-4 h-4 text-[#E11438]" />
                        <h3 className="font-bold text-xs sm:text-sm uppercase text-slate-900">
                          1. Datos de la Modalidad
                        </h3>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Título del Servicio <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={editingParcel?.title || ''}
                          onChange={(e) =>
                            setEditingParcel((prev) => prev ? { ...prev, title: e.target.value } : null)
                          }
                          placeholder="Encomiendas en tu Mismo Viaje"
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-semibold text-slate-900 focus:outline-none focus:border-black"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Categoría / Subtítulo
                        </label>
                        <input
                          type="text"
                          value={editingParcel?.category || ''}
                          onChange={(e) =>
                            setEditingParcel((prev) => prev ? { ...prev, category: e.target.value } : null)
                          }
                          placeholder="Servicio Adicional al Pasajero"
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-900"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Etiqueta / Tag
                        </label>
                        <input
                          type="text"
                          value={editingParcel?.tag || ''}
                          onChange={(e) =>
                            setEditingParcel((prev) => prev ? { ...prev, tag: e.target.value } : null)
                          }
                          placeholder="Más Práctico"
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-900"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Descripción Completa
                        </label>
                        <textarea
                          rows={4}
                          value={editingParcel?.description || ''}
                          onChange={(e) =>
                            setEditingParcel((prev) => prev ? { ...prev, description: e.target.value } : null)
                          }
                          placeholder="Detalle de la capacidad, vehículo y condiciones..."
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 resize-none"
                        />
                      </div>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-slate-200">
                      <AdminMediaUploader
                        label="2. Fotografía del Servicio"
                        imageUrl={editingParcel?.image || ''}
                        imagePosition={editingParcel?.imagePosition || '50% 50%'}
                        onImageChange={(url) =>
                          setEditingParcel((prev) => prev ? { ...prev, image: url } : null)
                        }
                        onImagePositionChange={(pos) =>
                          setEditingParcel((prev) => prev ? { ...prev, imagePosition: pos } : null)
                        }
                        allowVideo={false}
                        onProcessingChange={setIsMediaUploading}
                      />
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center gap-2 pb-2 border-b border-slate-200 mb-3">
                          <Eye className="w-4 h-4 text-[#E11438]" />
                          <h3 className="font-bold text-xs sm:text-sm uppercase text-slate-900">
                            3. Vista Previa en Encomiendas
                          </h3>
                        </div>

                        {/* Tarjeta idéntica a ParcelsTab */}
                        <div className="bg-white rounded-[2rem] p-5 shadow-sm border border-slate-200/80 flex flex-col justify-between">
                          <div>
                            <div className="w-full h-44 rounded-2xl overflow-hidden mb-3 relative bg-slate-100">
                              <img
                                src={editingParcel?.image || '/parcels/parcel-cargo-trunk.jpg'}
                                alt={editingParcel?.title}
                                style={{ objectPosition: editingParcel?.imagePosition || '50% 50%' }}
                                className="w-full h-full object-cover"
                              />
                              <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-black/75 text-white text-[10px] font-bold">
                                {editingParcel?.tag || 'Tag'}
                              </span>
                            </div>
                            <span className="text-[10px] font-bold text-[#E11438] uppercase tracking-wider block mb-1">
                              {editingParcel?.category || 'Categoría'}
                            </span>
                            <h3 className="font-display font-extrabold text-base text-slate-900">
                              {editingParcel?.title || 'Título'}
                            </h3>
                            <p className="text-xs text-slate-600 line-clamp-3 mt-2">
                              {editingParcel?.description}
                            </p>
                          </div>
                          <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-[#E11438] font-bold">
                            <span>Cotizar Ahora</span>
                            <ArrowUpRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isMediaUploading}
                        className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#B8860B] via-[#F59E0B] to-[#B8860B] hover:brightness-105 text-black font-extrabold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all"
                      >
                        <Save className="w-4 h-4" />
                        <span>Guardar Cambios de Encomienda</span>
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
