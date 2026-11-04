import React, { createContext, useContext, useState, useEffect } from 'react';
import type {
  PopularDestinationItem,
  PopularRouteItem,
  VisitedDestinationItem,
  FleetClassItem,
  ParcelServiceItem,
  CMSModulesData,
} from '../types/cms';
import {
  saveModulesToSupabase,
  fetchModulesFromSupabase,
} from '../lib/supabase';

const STORAGE_KEY = 'happy_travel_cms_modules_v2';

export const DEFAULT_POPULAR_DESTINATIONS: PopularDestinationItem[] = [
  {
    id: 'dest-quito',
    name: 'Quito',
    province: 'Pichincha',
    tag: 'Patrimonio de la Humanidad',
    iconicHighlight: 'Centro Histórico & Mitad del Mundo',
    description:
      'Maravíllate con el centro colonial mejor preservado de América, templos barrocos bañados en pan de oro como La Compañía y la experiencia única de pararte sobre la mítica línea equinoccial.',
    image:
      'https://images.unsplash.com/photo-1589802829985-817e51171b92?auto=format&fit=crop&w=800&q=80',
    mediaType: 'image',
  },
  {
    id: 'dest-guayaquil',
    name: 'Guayaquil',
    province: 'Guayas',
    tag: 'La Perla del Pacífico',
    iconicHighlight: 'Malecón 2000 & Cerro Santa Ana',
    description:
      'Siente la vibrante energía porteña a orillas del majestuoso río Guayas, sube los 444 escalones del cerro Santa Ana entre casas coloniales de colores y degusta su insuperable gastronomía marina.',
    image:
      'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=800&q=80',
    mediaType: 'image',
  },
  {
    id: 'dest-cuenca',
    name: 'Cuenca',
    province: 'Azuay',
    tag: 'Atenas del Ecuador',
    iconicHighlight: 'Catedral de la Inmaculada & Calle Larga',
    description:
      'Camina entre calles adoquinadas, cúpulas celestes y orillas floridas junto al río Tomebamba. Descubre talleres tradicionales de sombreros de paja toquilla y arquitectura republicana sin igual.',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Catedral_de_la_Inmaculada_Concepci%C3%B3n%2C_Cuenca_03.jpg/1280px-Catedral_de_la_Inmaculada_Concepci%C3%B3n%2C_Cuenca_03.jpg',
    mediaType: 'image',
  },
  {
    id: 'dest-banos',
    name: 'Baños de Agua Santa',
    province: 'Tungurahua',
    tag: 'Capital de la Aventura',
    iconicHighlight: 'Pailón del Diablo & Casa del Árbol',
    description:
      'El paraíso andino donde los manantiales termales y cascadas imponentes abren la puerta mágica a la Amazonía ecuatoriana.',
    image:
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80',
    mediaType: 'image',
  },
  {
    id: 'dest-manta',
    name: 'Manta',
    province: 'Manabí',
    tag: 'Ruta del Spondylus',
    iconicHighlight: 'Playa El Murciélago & Gastronomía Marina',
    description:
      'Disfruta de la mejor brisa costera, atardeceres dorados y la capital del mejor marisco ecuatoriano.',
    image: '/destinations/manta-skyline-coastal.webp',
    mediaType: 'image',
  },
  {
    id: 'dest-montanita',
    name: 'Montañita',
    province: 'Santa Elena',
    tag: 'Paraíso Surf & Relax',
    iconicHighlight: 'Olas de Clase Mundial & Vida Bohemia',
    description:
      'El punto de encuentro internacional para los amantes del surf, atardeceres mágicos del Pacífico y una vibra bohemia inigualable.',
    image: '/destinations/montanita-pacific-sunset.webp',
    mediaType: 'image',
  },
];

export const DEFAULT_POPULAR_ROUTES: PopularRouteItem[] = [
  {
    id: 'route-quito-guayaquil',
    title: 'Quito - Guayaquil',
    origin: 'Quito',
    destination: 'Guayaquil',
    duration: '7h 30m   Ruta Directa',
    vehicleType: 'SUV / Van Ejecutiva VIP',
    included: 'Equipaje y Peajes Incluidos',
    price: 'Desde $220',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Vista_cerro_santa_ana.jpg/1280px-Vista_cerro_santa_ana.jpg',
    mediaType: 'image',
  },
  {
    id: 'route-guayaquil-cuenca',
    title: 'Guayaquil - Cuenca',
    origin: 'Guayaquil',
    destination: 'Cuenca',
    duration: '3h 45m   Vía El Cajas',
    vehicleType: 'Confort Ejecutivo A/C',
    included: '100% Puerta a Puerta',
    price: 'Desde $120',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Catedral_de_la_Inmaculada_Concepci%C3%B3n%2C_Cuenca_03.jpg/1280px-Catedral_de_la_Inmaculada_Concepci%C3%B3n%2C_Cuenca_03.jpg',
    mediaType: 'image',
  },
  {
    id: 'route-quito-banos',
    title: 'Quito - Baños',
    origin: 'Quito',
    destination: 'Baños',
    duration: '3h 15m   Avenida Volcanes',
    vehicleType: 'SUV Familiar Premium',
    included: 'Paradas Panorámicas',
    price: 'Desde $110',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Ba%C3%B1os%2C_Ecuador.JPG/1280px-Ba%C3%B1os%2C_Ecuador.JPG',
    mediaType: 'image',
  },
  {
    id: 'route-quito-manta',
    title: 'Quito - Manta',
    origin: 'Quito',
    destination: 'Manta',
    duration: '6h 30m   Costa Manabita',
    vehicleType: 'Van VIP / Sedán de Lujo',
    included: 'Servicio Puerta a Puerta',
    price: 'Desde $190',
    image: '/destinations/manta-skyline-coastal.webp',
    mediaType: 'image',
  },
  {
    id: 'route-guayaquil-salinas',
    title: 'Guayaquil - Salinas / Montañita',
    origin: 'Guayaquil',
    destination: 'Salinas / Montañita',
    duration: '2h 15m   Ruta del Sol',
    vehicleType: 'Confort & Climatización',
    included: 'Directo al Hotel o Playa',
    price: 'Desde $85',
    image: '/destinations/montanita-pacific-sunset.webp',
    mediaType: 'image',
  },
  {
    id: 'route-cuenca-loja',
    title: 'Cuenca - Loja',
    origin: 'Cuenca',
    destination: 'Loja',
    duration: '3h 30m   Sur Andino',
    vehicleType: 'Sedán / Camioneta VIP',
    included: 'Monitoreo Satelital GPS',
    price: 'Desde $95',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Catedral_de_la_Inmaculada_Concepci%C3%B3n%2C_Cuenca.jpg/1280px-Catedral_de_la_Inmaculada_Concepci%C3%B3n%2C_Cuenca.jpg',
    mediaType: 'image',
  },
];

export const DEFAULT_VISITED_DESTINATIONS: VisitedDestinationItem[] = [
  {
    id: 'vis-quito',
    name: 'Quito',
    province: 'Pichincha • Capital del Ecuador',
    description: 'Centro colonial mejor conservado de América y Mitad del Mundo',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Quito_as_from_panecillo_Basilica.jpg/1280px-Quito_as_from_panecillo_Basilica.jpg',
    mediaType: 'image',
  },
  {
    id: 'vis-cuenca',
    name: 'Cuenca',
    province: 'Azuay • Patrimonio Cultural',
    description: 'Atenas del Ecuador con sus cúpulas celestes y río Tomebamba',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Catedral_de_la_Inmaculada_Concepci%C3%B3n%2C_Cuenca.jpg/1280px-Catedral_de_la_Inmaculada_Concepci%C3%B3n%2C_Cuenca.jpg',
    mediaType: 'image',
  },
  {
    id: 'vis-guayaquil',
    name: 'Guayaquil',
    province: 'Guayas • Puerto Principal',
    description: 'Malecón 2000, Cerro Santa Ana y energía porteña',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Faro_de_Guayaquil.jpg/1280px-Faro_de_Guayaquil.jpg',
    mediaType: 'image',
  },
  {
    id: 'vis-banos',
    name: 'Baños de Agua Santa',
    province: 'Tungurahua • Aventura Andina',
    description: 'Cascadas imponentes, aguas termales y la puerta a la Amazonía',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Ba%C3%B1os%2C_Ecuador.JPG/1280px-Ba%C3%B1os%2C_Ecuador.JPG',
    mediaType: 'image',
  },
];

export const DEFAULT_FLEET_CLASSES: FleetClassItem[] = [
  {
    id: 'fleet-ejecutiva',
    title: 'Clase Ejecutiva',
    subtitle: 'Para ejecutivos',
    vehicleName: 'Sedán Ejecutivo',
    description: 'Vehículos elegantes con máxima insonorización para traslados ejecutivos y de negocios.',
    image: '/fleet/class_business.jpg',
    mediaType: 'image',
  },
  {
    id: 'fleet-premium',
    title: 'Clase Premium',
    subtitle: 'Para su comodidad',
    vehicleName: 'Crossover Confort',
    description: 'Crossovers y SUVs amplias con climatizador bizona y suspensión suave de máximo confort.',
    image: '/fleet/class_premium.jpg',
    mediaType: 'image',
  },
  {
    id: 'fleet-lujo',
    title: 'Clase de Lujo',
    subtitle: 'Para la máxima experiencia',
    vehicleName: 'Limusina Flagship VIP',
    description: 'La máxima expresión en confort, amplitud y elegancia con conductor de traje.',
    image: '/fleet/class_luxury.jpg',
    mediaType: 'image',
  },
];

export const DEFAULT_PARCEL_SERVICES: ParcelServiceItem[] = [
  {
    id: 'srv-mismo-viaje',
    title: 'Encomiendas en tu Mismo Viaje',
    category: 'Servicio Adicional al Pasajero',
    tag: 'Más Práctico',
    description:
      'Si viajas en nuestro servicio privado puerta a puerta, aprovecha la amplia capacidad de la unidad para llevar equipaje extra, paquetes o cajas personales sin recargos sorpresa.',
    image: '/parcels/parcel-cargo-trunk.jpg',
    mediaType: 'image',
  },
  {
    id: 'srv-envio-exclusivo',
    title: 'Envío Exclusivo Puerta a Puerta',
    category: 'Vehículo Dedicado para tu Carga',
    tag: 'Directo y Seguro',
    description:
      'Asignamos una unidad de nuestra flota para trasladar tu encomienda de ciudad a ciudad de forma directa. Recogida en tu domicilio y entrega en mano sin que tengas que viajar.',
    image: '/fleet/encomiendas-hero.jpg',
    mediaType: 'image',
  },
  {
    id: 'srv-doc-delicada',
    title: 'Documentación & Carga Delicada',
    category: 'Alta Confidencialidad y Protección',
    tag: 'Máxima Prioridad',
    description:
      'Traslado seguro de documentos corporativos, licitaciones, contratos, dispositivos tecnológicos o encomiendas frágiles con custodia directa del conductor.',
    image: '/parcels/parcel-secure-box.jpg',
    mediaType: 'image',
  },
  {
    id: 'srv-carga-comercial',
    title: 'Carga Comercial & Paquetería',
    category: 'Logística Ligera Puerta a Puerta',
    tag: 'Tarifa por Volumen',
    description:
      'Solución ágil para emprendedores y empresas que necesitan abastecer sucursales o enviar mercadería urgente entre provincias sin demoras de intermediarios.',
    image: '/parcels/parcel-executive-van-road.webp',
    mediaType: 'image',
  },
];

interface CMSContextType {
  // 1. Destinos Populares
  popularDestinations: PopularDestinationItem[];
  addPopularDestination: (item: Omit<PopularDestinationItem, 'id'>) => void;
  updatePopularDestination: (item: PopularDestinationItem) => void;
  deletePopularDestination: (id: string) => void;

  // 2. Rutas Más Populares
  popularRoutes: PopularRouteItem[];
  addPopularRoute: (item: Omit<PopularRouteItem, 'id'>) => void;
  updatePopularRoute: (item: PopularRouteItem) => void;
  deletePopularRoute: (id: string) => void;

  // 3. Destinos Más Visitados
  visitedDestinations: VisitedDestinationItem[];
  addVisitedDestination: (item: Omit<VisitedDestinationItem, 'id'>) => void;
  updateVisitedDestination: (item: VisitedDestinationItem) => void;
  deleteVisitedDestination: (id: string) => void;

  // 4. Categorías de Flota
  fleetClasses: FleetClassItem[];
  addFleetClass: (item: Omit<FleetClassItem, 'id'>) => void;
  updateFleetClass: (item: FleetClassItem) => void;
  deleteFleetClass: (id: string) => void;

  // 5. Servicios de Encomienda
  parcelServices: ParcelServiceItem[];
  addParcelService: (item: Omit<ParcelServiceItem, 'id'>) => void;
  updateParcelService: (item: ParcelServiceItem) => void;
  deleteParcelService: (id: string) => void;

  // Guardado manual o forzado
  saveAllModules: (data?: Partial<CMSModulesData>) => Promise<boolean>;
  resetToDefaults: () => void;
}

const CMSContext = createContext<CMSContextType>({} as CMSContextType);

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [popularDestinations, setPopularDestinations] = useState<PopularDestinationItem[]>(
    DEFAULT_POPULAR_DESTINATIONS
  );
  const [popularRoutes, setPopularRoutes] = useState<PopularRouteItem[]>(
    DEFAULT_POPULAR_ROUTES
  );
  const [visitedDestinations, setVisitedDestinations] = useState<VisitedDestinationItem[]>(
    DEFAULT_VISITED_DESTINATIONS
  );
  const [fleetClasses, setFleetClasses] = useState<FleetClassItem[]>(
    DEFAULT_FLEET_CLASSES
  );
  const [parcelServices, setParcelServices] = useState<ParcelServiceItem[]>(
    DEFAULT_PARCEL_SERVICES
  );

  // Carga inicial: LocalStorage primero, luego Supabase
  useEffect(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed.popularDestinations) setPopularDestinations(parsed.popularDestinations);
        if (parsed.popularRoutes) setPopularRoutes(parsed.popularRoutes);
        if (parsed.visitedDestinations) setVisitedDestinations(parsed.visitedDestinations);
        if (parsed.fleetClasses) setFleetClasses(parsed.fleetClasses);
        if (parsed.parcelServices) setParcelServices(parsed.parcelServices);
      }
    } catch (e) {
      console.warn('Error al leer caché local de módulos:', e);
    }

    fetchModulesFromSupabase().then((remoteData) => {
      if (remoteData) {
        if (remoteData.popularDestinations) setPopularDestinations(remoteData.popularDestinations);
        if (remoteData.popularRoutes) setPopularRoutes(remoteData.popularRoutes);
        if (remoteData.visitedDestinations) setVisitedDestinations(remoteData.visitedDestinations);
        if (remoteData.fleetClasses) setFleetClasses(remoteData.fleetClasses);
        if (remoteData.parcelServices) setParcelServices(remoteData.parcelServices);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(remoteData));
      }
    });
  }, []);

  const persistLocally = (nextData: CMSModulesData) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextData));
    } catch (e) {
      console.warn('Error guardando en localStorage:', e);
    }
  };

  // 1. Destinos Populares
  const addPopularDestination = (item: Omit<PopularDestinationItem, 'id'>) => {
    const newItem: PopularDestinationItem = { ...item, id: `dest-${Date.now()}` };
    const updated = [...popularDestinations, newItem];
    setPopularDestinations(updated);
    persistLocally({
      popularDestinations: updated,
      popularRoutes,
      visitedDestinations,
      fleetClasses,
      parcelServices,
    });
  };

  const updatePopularDestination = (item: PopularDestinationItem) => {
    const updated = popularDestinations.map((d) => (d.id === item.id ? item : d));
    setPopularDestinations(updated);
    persistLocally({
      popularDestinations: updated,
      popularRoutes,
      visitedDestinations,
      fleetClasses,
      parcelServices,
    });
  };

  const deletePopularDestination = (id: string) => {
    const updated = popularDestinations.filter((d) => d.id !== id);
    setPopularDestinations(updated);
    persistLocally({
      popularDestinations: updated,
      popularRoutes,
      visitedDestinations,
      fleetClasses,
      parcelServices,
    });
  };

  // 2. Rutas Más Populares
  const addPopularRoute = (item: Omit<PopularRouteItem, 'id'>) => {
    const newItem: PopularRouteItem = { ...item, id: `route-${Date.now()}` };
    const updated = [...popularRoutes, newItem];
    setPopularRoutes(updated);
    persistLocally({
      popularDestinations,
      popularRoutes: updated,
      visitedDestinations,
      fleetClasses,
      parcelServices,
    });
  };

  const updatePopularRoute = (item: PopularRouteItem) => {
    const updated = popularRoutes.map((r) => (r.id === item.id ? item : r));
    setPopularRoutes(updated);
    persistLocally({
      popularDestinations,
      popularRoutes: updated,
      visitedDestinations,
      fleetClasses,
      parcelServices,
    });
  };

  const deletePopularRoute = (id: string) => {
    const updated = popularRoutes.filter((r) => r.id !== id);
    setPopularRoutes(updated);
    persistLocally({
      popularDestinations,
      popularRoutes: updated,
      visitedDestinations,
      fleetClasses,
      parcelServices,
    });
  };

  // 3. Destinos Más Visitados
  const addVisitedDestination = (item: Omit<VisitedDestinationItem, 'id'>) => {
    const newItem: VisitedDestinationItem = { ...item, id: `vis-${Date.now()}` };
    const updated = [...visitedDestinations, newItem];
    setVisitedDestinations(updated);
    persistLocally({
      popularDestinations,
      popularRoutes,
      visitedDestinations: updated,
      fleetClasses,
      parcelServices,
    });
  };

  const updateVisitedDestination = (item: VisitedDestinationItem) => {
    const updated = visitedDestinations.map((v) => (v.id === item.id ? item : v));
    setVisitedDestinations(updated);
    persistLocally({
      popularDestinations,
      popularRoutes,
      visitedDestinations: updated,
      fleetClasses,
      parcelServices,
    });
  };

  const deleteVisitedDestination = (id: string) => {
    const updated = visitedDestinations.filter((v) => v.id !== id);
    setVisitedDestinations(updated);
    persistLocally({
      popularDestinations,
      popularRoutes,
      visitedDestinations: updated,
      fleetClasses,
      parcelServices,
    });
  };

  // 4. Categorías de Flota
  const addFleetClass = (item: Omit<FleetClassItem, 'id'>) => {
    const newItem: FleetClassItem = { ...item, id: `fleet-${Date.now()}` };
    const updated = [...fleetClasses, newItem];
    setFleetClasses(updated);
    persistLocally({
      popularDestinations,
      popularRoutes,
      visitedDestinations,
      fleetClasses: updated,
      parcelServices,
    });
  };

  const updateFleetClass = (item: FleetClassItem) => {
    const updated = fleetClasses.map((f) => (f.id === item.id ? item : f));
    setFleetClasses(updated);
    persistLocally({
      popularDestinations,
      popularRoutes,
      visitedDestinations,
      fleetClasses: updated,
      parcelServices,
    });
  };

  const deleteFleetClass = (id: string) => {
    const updated = fleetClasses.filter((f) => f.id !== id);
    setFleetClasses(updated);
    persistLocally({
      popularDestinations,
      popularRoutes,
      visitedDestinations,
      fleetClasses: updated,
      parcelServices,
    });
  };

  // 5. Servicios de Encomienda
  const addParcelService = (item: Omit<ParcelServiceItem, 'id'>) => {
    const newItem: ParcelServiceItem = { ...item, id: `srv-${Date.now()}` };
    const updated = [...parcelServices, newItem];
    setParcelServices(updated);
    persistLocally({
      popularDestinations,
      popularRoutes,
      visitedDestinations,
      fleetClasses,
      parcelServices: updated,
    });
  };

  const updateParcelService = (item: ParcelServiceItem) => {
    const updated = parcelServices.map((p) => (p.id === item.id ? item : p));
    setParcelServices(updated);
    persistLocally({
      popularDestinations,
      popularRoutes,
      visitedDestinations,
      fleetClasses,
      parcelServices: updated,
    });
  };

  const deleteParcelService = (id: string) => {
    const updated = parcelServices.filter((p) => p.id !== id);
    setParcelServices(updated);
    persistLocally({
      popularDestinations,
      popularRoutes,
      visitedDestinations,
      fleetClasses,
      parcelServices: updated,
    });
  };

  const saveAllModules = async (customData?: Partial<CMSModulesData>): Promise<boolean> => {
    const payload: CMSModulesData = {
      popularDestinations: customData?.popularDestinations || popularDestinations,
      popularRoutes: customData?.popularRoutes || popularRoutes,
      visitedDestinations: customData?.visitedDestinations || visitedDestinations,
      fleetClasses: customData?.fleetClasses || fleetClasses,
      parcelServices: customData?.parcelServices || parcelServices,
    };
    persistLocally(payload);
    return await saveModulesToSupabase(payload);
  };

  const resetToDefaults = () => {
    setPopularDestinations(DEFAULT_POPULAR_DESTINATIONS);
    setPopularRoutes(DEFAULT_POPULAR_ROUTES);
    setVisitedDestinations(DEFAULT_VISITED_DESTINATIONS);
    setFleetClasses(DEFAULT_FLEET_CLASSES);
    setParcelServices(DEFAULT_PARCEL_SERVICES);
    const defaults: CMSModulesData = {
      popularDestinations: DEFAULT_POPULAR_DESTINATIONS,
      popularRoutes: DEFAULT_POPULAR_ROUTES,
      visitedDestinations: DEFAULT_VISITED_DESTINATIONS,
      fleetClasses: DEFAULT_FLEET_CLASSES,
      parcelServices: DEFAULT_PARCEL_SERVICES,
    };
    persistLocally(defaults);
    saveModulesToSupabase(defaults);
  };

  return (
    <CMSContext.Provider
      value={{
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

        saveAllModules,
        resetToDefaults,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => useContext(CMSContext);
