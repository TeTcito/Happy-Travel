/**
 * Definiciones de tipos para los módulos editables del CMS de Happy Travel.
 * Incluye los 5 carruseles y secciones configurables desde el Panel Administrativo.
 */

export interface CMSMediaItem {
  image: string;
  originalImage?: string;
  imagePosition?: string;
  imageScale?: number;
  videoUrl?: string;
  mediaType?: 'image' | 'video';
}

/**
 * 1. MÓDULO: DESTINOS POPULARES EN ECUADOR ("Conduce hacia tu Próxima Aventura")
 * Ubicación: Portada / Home (Carrusel)
 */
export interface PopularDestinationItem extends CMSMediaItem {
  id: string;
  name: string;
  province: string;
  tag: string;
  iconicHighlight: string;
  description: string;
}

/**
 * 2. MÓDULO: RUTAS MÁS POPULARES ("Trayectos puerta a puerta más elegidos por nuestros clientes con tarifas referenciales")
 * Ubicación: Servicios (Carrusel)
 */
export interface PopularRouteItem extends CMSMediaItem {
  id: string;
  title: string;
  origin: string;
  destination: string;
  duration: string;
  vehicleType: string;
  included: string;
  price: string;
}

/**
 * 3. MÓDULO: DESTINOS MÁS VISITADOS ("Explora las ciudades icónicas del Ecuador")
 * Ubicación: Servicios (Grilla Bento & Carrusel Móvil)
 */
export interface VisitedDestinationItem extends CMSMediaItem {
  id: string;
  name: string;
  province: string;
  description?: string;
}

/**
 * 4. MÓDULO: NUESTRA FLOTA / CATEGORÍAS DE VEHÍCULOS ("Clase Ejecutiva, Clase Premium, Clase de Lujo")
 * Ubicación: Servicios (Grilla de 3 tarjetas)
 */
export interface FleetClassItem extends CMSMediaItem {
  id: string;
  title: string;
  subtitle: string;
  vehicleName: string;
  description?: string;
}

/**
 * 5. MÓDULO: SERVICIOS DE ENCOMIENDA Y CARGA PRIVADA ("Modalidades Disponibles")
 * Ubicación: Encomiendas (Carrusel de 4 tarjetas)
 */
export interface ParcelServiceItem extends CMSMediaItem {
  id: string;
  title: string;
  category: string;
  tag: string;
  description: string;
}

/**
 * Paquete de datos unificado de los módulos CMS
 */
export interface CMSModulesData {
  popularDestinations: PopularDestinationItem[];
  popularRoutes: PopularRouteItem[];
  visitedDestinations: VisitedDestinationItem[];
  fleetClasses: FleetClassItem[];
  parcelServices: ParcelServiceItem[];
}
