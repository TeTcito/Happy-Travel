import React, { useState, useRef } from 'react';
import { ScrollReveal } from '../../../components/ScrollReveal';
import { 
  ArrowRight, 
  ArrowLeft,
  ArrowUpRight,
  ShieldCheck,
  Layers,
  Smartphone,
  Settings,
  Headphones,
  Tag,
  Heart,
  Sparkles,
  MapPin,
  Clock,
  Car,
  Briefcase
} from 'lucide-react';
import { RouteSelectorBar } from '../../../components/RouteSelectorBar';

interface ServicesTabProps {
  onOpenQuote: (serviceType?: string, origin?: string, destination?: string) => void;
}

const featuredClientRoutes = [
  {
    id: 'quito-guayaquil',
    title: 'Quito — Guayaquil',
    origin: 'Quito',
    destination: 'Guayaquil',
    duration: '7h 30m • Directa',
    vehicleType: 'SUV / Van VIP',
    included: 'Equipaje y Peajes',
    price: 'Desde $220',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Vista_cerro_santa_ana.jpg/1280px-Vista_cerro_santa_ana.jpg',
  },
  {
    id: 'guayaquil-cuenca',
    title: 'Guayaquil — Cuenca',
    origin: 'Guayaquil',
    destination: 'Cuenca',
    duration: '3h 45m • Vía Cajas',
    vehicleType: 'Confort A/C',
    included: '100% Puerta a Puerta',
    price: 'Desde $120',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Catedral_de_la_Inmaculada_Concepci%C3%B3n%2C_Cuenca_03.jpg/1280px-Catedral_de_la_Inmaculada_Concepci%C3%B3n%2C_Cuenca_03.jpg',
  },
  {
    id: 'quito-banos',
    title: 'Quito — Baños',
    origin: 'Quito',
    destination: 'Baños de Agua Santa',
    duration: '3h 15m • Privado',
    vehicleType: 'SUV 4x4',
    included: 'Paradas a tu Medida',
    price: 'Desde $95',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/R%C3%ADo_Verde_Pail%C3%B3n_del_Diablo_trail_1.jpg/1280px-R%C3%ADo_Verde_Pail%C3%B3n_del_Diablo_trail_1.jpg',
  },
  {
    id: 'guayaquil-salinas',
    title: 'Guayaquil — Salinas',
    origin: 'Guayaquil',
    destination: 'Salinas / Montañita',
    duration: '2h 15m • Ruta Sol',
    vehicleType: 'Familiar VIP',
    included: 'Amplia Bodega',
    price: 'Desde $85',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Atardecer_en_Monta%C3%B1ita.jpg/1280px-Atardecer_en_Monta%C3%B1ita.jpg',
  },
  {
    id: 'quito-manta',
    title: 'Quito — Manta',
    origin: 'Quito',
    destination: 'Manta',
    duration: '6h 30m • Costa',
    vehicleType: 'Primera Clase',
    included: 'Mascotas en Cabina',
    price: 'Desde $190',
    image: '/destinations/manta-skyline-coastal.jpg',
  },
  {
    id: 'quito-otavalo',
    title: 'Quito — Otavalo',
    origin: 'Quito',
    destination: 'Otavalo / Ibarra',
    duration: '2h 00m • Sierra',
    vehicleType: 'Sedán VIP',
    included: 'Puerta a Puerta',
    price: 'Desde $75',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Laguna_Cuicocha_seen_from_the_visitor_center_02.jpg/1280px-Laguna_Cuicocha_seen_from_the_visitor_center_02.jpg',
  },
];

const visitedDestinations = [
  {
    name: 'Quito',
    province: 'Pichincha',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Quito_as_from_panecillo_Basilica.jpg/1280px-Quito_as_from_panecillo_Basilica.jpg',
  },
  {
    name: 'Cuenca',
    province: 'Azuay',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Catedral_de_la_Inmaculada_Concepci%C3%B3n%2C_Cuenca.jpg/1280px-Catedral_de_la_Inmaculada_Concepci%C3%B3n%2C_Cuenca.jpg',
  },
  {
    name: 'Guayaquil',
    province: 'Guayas',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Faro_de_Guayaquil.jpg/1280px-Faro_de_Guayaquil.jpg',
  },
  {
    name: 'Baños de Agua Santa',
    province: 'Tungurahua',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Ba%C3%B1os%2C_Ecuador.JPG/1280px-Ba%C3%B1os%2C_Ecuador.JPG',
  },
  {
    name: 'Manta',
    province: 'Manabí',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/2022-10-04a_Wide_view_of_the_city_of_Manta%2C_Ecuador.jpg/1280px-2022-10-04a_Wide_view_of_the_city_of_Manta%2C_Ecuador.jpg',
  },
  {
    name: 'Salinas & Montañita',
    province: 'Santa Elena',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Salinas_beach_view_in_ecuador_south_america.jpg/1280px-Salinas_beach_view_in_ecuador_south_america.jpg',
  },
];

const luxuryPillars = [
  {
    icon: ShieldCheck,
    line1: '100% Puerta',
    line2: 'a Puerta',
  },
  {
    icon: Layers,
    line1: 'Máximo',
    line2: 'Confort VIP',
  },
  {
    icon: Smartphone,
    line1: 'Monitoreo',
    line2: 'GPS en Vivo',
  },
  {
    icon: Settings,
    line1: 'Viaje a tu',
    line2: 'Medida',
  },
];

const whyTravelPillars = [
  { icon: ShieldCheck, title: 'Mejor Tarifa' },
  { icon: Headphones, title: 'Soporte 24/7' },
  { icon: Tag, title: 'Tarifas Claras' },
  { icon: Heart, title: 'Viaje Seguro' },
];

const statsMetrics = [
  { value: '45+', label: 'Vehículos de Lujo' },
  { value: '12k', label: 'Clientes Satisfechos' },
  { value: '98%', label: 'Tasa Puntualidad' },
  { value: '19+', label: 'Años Experiencia' },
];

const fleetClasses = [
  {
    id: 'business',
    title: 'Clase Ejecutiva',
    subtitle: 'Sedán Ejecutivo VIP',
    image: '/fleet/class_business.jpg',
  },
  {
    id: 'premium',
    title: 'Clase Premium',
    subtitle: 'SUV / Crossover Confort',
    image: '/fleet/class_premium.jpg',
  },
  {
    id: 'luxury',
    title: 'Clase de Lujo',
    subtitle: 'Limusina Flagship VIP',
    image: '/fleet/class_luxury.jpg',
  },
];

export const ServicesTab: React.FC<ServicesTabProps> = ({ onOpenQuote }) => {
  const popularRoutesScrollRef = useRef<HTMLDivElement>(null);
  const visitedDestinationsScrollRef = useRef<HTMLDivElement>(null);
  const [showReservationModal, setShowReservationModal] = useState(false);

  // Reservation form state
  const [resPickup, setResPickup] = useState('');
  const [resDropoff, setResDropoff] = useState('');
  const [resDateTime, setResDateTime] = useState('');
  const [resVehicleType, setResVehicleType] = useState('Clase Ejecutiva');

  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const serviceName = `Reserva ${resVehicleType}${resDateTime ? ` - ${resDateTime}` : ''}`;
    onOpenQuote(serviceName, resPickup, resDropoff);
    setShowReservationModal(false);
  };

  const scrollPopularRoutes = (direction: 'left' | 'right') => {
    if (popularRoutesScrollRef.current) {
      const container = popularRoutesScrollRef.current;
      const scrollAmount = container.clientWidth * 0.40;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const scrollVisitedDestinations = (direction: 'left' | 'right') => {
    if (visitedDestinationsScrollRef.current) {
      const container = visitedDestinationsScrollRef.current;
      const scrollAmount = container.clientWidth * 0.40;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="bg-white text-slate-800 space-y-6 pb-0">
      
      {/* 1. SECCIÓN HERO: FOTOGRAFÍA PANORÁMICA HORIZONTAL EN PROPORCIÓN 3:2 CON BARRA SUPERPUESTA */}
      <section className="relative w-full aspect-[3/2] overflow-hidden bg-[#070b14]">
        
        {/* IMAGEN DE FONDO 3:2 */}
        <img 
          src="/hero-puerta-composite.jpg" 
          alt="Servicio Puerta a Puerta"
          className="w-full h-full object-cover object-[75%_center] block"
        />
        
        {/* Sutil sombra lateral detrás del texto para contraste */}
        <div className="absolute inset-y-0 left-0 w-3/5 bg-gradient-to-r from-black/85 via-black/40 to-transparent pointer-events-none" />

        {/* Gradiente inferior suave para que la barra destaque con elegancia */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

        {/* TEXTO SUPERPUESTO (A ~10PX DEL MARGEN SUPERIOR, ESTILO ELEGANTE, NO PASA DE LA MITAD) */}
        <div className="absolute inset-0 z-10 pt-[10px] pl-3.5 sm:pl-6 pr-2 pb-2 flex flex-col justify-start pointer-events-none">
          <div className="max-w-[50%] sm:max-w-[48%] space-y-1 sm:space-y-1.5 pointer-events-auto">
            
            {/* Titular Principal aumentado en un 25% */}
            <ScrollReveal direction="up" distance={12} duration={650} delay={60}>
              <h1 className="font-serif text-[28px] sm:text-[38px] font-black text-white tracking-tight leading-[0.92] drop-shadow-2xl">
                Puerta a <br />
                <span className="italic font-bold text-amber-400 inline-block">Puerta.</span>
              </h1>
            </ScrollReveal>

            {/* Iconos de Lujo Debajo del Título (Uno encima de otro en vertical) */}
            <div className="flex flex-col space-y-1 pt-0.5 max-w-[200px]">
              {luxuryPillars.map((item, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-[#D5B895]/80 bg-[#141414]/90 flex items-center justify-center text-[#DFC29D] shrink-0 shadow-xs">
                    <item.icon className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#DFC29D] stroke-[1.8]" />
                  </div>
                  <span className="text-[8px] sm:text-[9.5px] font-semibold text-slate-100 leading-tight drop-shadow-sm whitespace-nowrap">
                    {item.line1} {item.line2}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* BARRA DE COTIZAR SUPERPUESTA EN LA PARTE INFERIOR DE LA PRIMERA SECCIÓN */}
        <div className="absolute bottom-2 sm:bottom-3 left-0 right-0 z-20 px-2 sm:px-4 flex justify-center">
          <RouteSelectorBar onOpenQuote={onOpenQuote} />
        </div>

      </section>

      {/* 2. SECCIÓN: RUTAS POPULARES (CARRUSEL 2.5 TARJETAS CON FLECHAS A LA DERECHA) */}
      <section className="w-full pt-1 pb-2 bg-white">
        {/* Cabecera: Título reducido a la izquierda y Botones de desplazamiento a la derecha */}
        <div className="flex items-center justify-between gap-3 mb-2 px-4">
          <ScrollReveal direction="right" distance={15} duration={600} delay={60}>
            <h2 className="font-display text-lg sm:text-xl font-black text-slate-900 leading-tight">
              Rutas Populares
            </h2>
          </ScrollReveal>

          {/* Flechas a la derecha cerca del margen */}
          <ScrollReveal direction="left" distance={15} duration={600} delay={100}>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => scrollPopularRoutes('left')}
                className="w-7 h-7 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-800 transition-all shadow-2xs active:scale-95 cursor-pointer"
                aria-label="Ruta anterior"
              >
                <ArrowLeft className="w-3 h-3" />
              </button>
              <button
                type="button"
                onClick={() => scrollPopularRoutes('right')}
                className="w-7 h-7 rounded-full bg-[#FF5B22] hover:bg-[#E04812] text-white flex items-center justify-center transition-all shadow-sm active:scale-95 font-bold cursor-pointer"
                aria-label="Siguiente ruta"
              >
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </ScrollReveal>
        </div>

        {/* Carrusel Horizontal de Rutas: 2.5 tarjetas visuales y scroll completo */}
        <div
          ref={popularRoutesScrollRef}
          className="w-full flex gap-2.5 overflow-x-auto scroll-smooth snap-x snap-mandatory py-1 px-4 scroll-pl-4 scroll-pr-4 no-scrollbar [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {featuredClientRoutes.map((route) => (
            <div
              key={route.id}
              className="w-[38vw] sm:w-[160px] shrink-0 snap-start"
            >
              <div
                onClick={() => onOpenQuote('Transporte Puerta a Puerta Privado', route.origin, route.destination)}
                className="group relative h-[210px] sm:h-[225px] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-end p-2.5 pb-2.5 border border-slate-200/90 hover:border-amber-400"
              >
                <img
                  src={route.image}
                  alt={route.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent" />

                {/* Info Inferior */}
                <div className="relative z-10 space-y-1">
                  <h3 className="font-display text-xs sm:text-sm font-bold text-white group-hover:text-amber-300 transition-colors leading-tight drop-shadow-sm truncate">
                    {route.title}
                  </h3>

                  {/* Características de la Ruta */}
                  <div className="space-y-0.5 text-[8.5px] sm:text-[9.5px] text-slate-200/90 pt-0.5">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-2.5 h-2.5 text-[#DFC29D] shrink-0" />
                      <span className="truncate">{route.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Car className="w-2.5 h-2.5 text-[#DFC29D] shrink-0" />
                      <span className="truncate">{route.vehicleType}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Briefcase className="w-2.5 h-2.5 text-[#DFC29D] shrink-0" />
                      <span className="truncate">{route.included}</span>
                    </div>
                  </div>

                  {/* Fila de Precio & Acción */}
                  <div className="flex items-center justify-between gap-1 pt-1.5 border-t border-white/20">
                    <span className="text-[9.5px] sm:text-[10px] font-bold text-amber-400 truncate">
                      {route.price}
                    </span>
                    <div className="w-5 h-5 rounded-full bg-white/20 group-hover:bg-[#FF5B22] text-white flex items-center justify-center transition-colors shrink-0">
                      <ArrowUpRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. SECCIÓN: DESTINOS MÁS VISITADOS (CARRUSEL 2.5 TARJETAS CON FLECHAS A LA DERECHA) */}
      <section className="w-full pt-1 pb-2 bg-white">
        {/* Cabecera: Título reducido a la izquierda y Botones de desplazamiento a la derecha */}
        <div className="flex items-center justify-between gap-3 mb-2 px-4">
          <ScrollReveal direction="right" distance={15} duration={600} delay={60}>
            <h2 className="font-display text-lg sm:text-xl font-black text-slate-900 leading-tight">
              Destinos Más Visitados
            </h2>
          </ScrollReveal>

          {/* Flechas a la derecha cerca del margen */}
          <ScrollReveal direction="left" distance={15} duration={600} delay={100}>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => scrollVisitedDestinations('left')}
                className="w-7 h-7 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-800 transition-all shadow-2xs active:scale-95 cursor-pointer"
                aria-label="Destino anterior"
              >
                <ArrowLeft className="w-3 h-3" />
              </button>
              <button
                type="button"
                onClick={() => scrollVisitedDestinations('right')}
                className="w-7 h-7 rounded-full bg-[#FF5B22] hover:bg-[#E04812] text-white flex items-center justify-center transition-all shadow-sm active:scale-95 font-bold cursor-pointer"
                aria-label="Siguiente destino"
              >
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </ScrollReveal>
        </div>

        {/* Carrusel Horizontal de Destinos: 2.5 tarjetas visuales y scroll completo */}
        <div
          ref={visitedDestinationsScrollRef}
          className="w-full flex gap-2.5 overflow-x-auto scroll-smooth snap-x snap-mandatory py-1 px-4 scroll-pl-4 scroll-pr-4 no-scrollbar [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {visitedDestinations.map((dest, idx) => (
            <div
              key={idx}
              className="w-[37vw] sm:w-[155px] shrink-0 snap-start"
            >
              <div
                onClick={() => onOpenQuote('Transporte Puerta a Puerta Privado', '', dest.name)}
                className="group relative h-[185px] sm:h-[200px] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-end p-2.5 pb-3 border border-slate-200/90 hover:border-amber-400"
              >
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

                {/* Badge Provincia */}
                <div className="absolute top-2 left-2 z-10">
                  <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[9px] font-semibold bg-black/60 backdrop-blur-md text-amber-300 border border-white/20">
                    <MapPin className="w-2.5 h-2.5" />
                    {dest.province}
                  </span>
                </div>

                {/* Info Inferior */}
                <div className="relative z-10 space-y-0.5">
                  <h3 className="font-display text-xs sm:text-sm font-bold text-white group-hover:text-amber-300 transition-colors leading-tight drop-shadow-sm truncate">
                    {dest.name}
                  </h3>
                  <div className="flex items-center justify-between gap-1 pt-0.5">
                    <span className="text-[9px] font-bold text-amber-400 truncate">
                      Ver Ruta
                    </span>
                    <div className="w-5 h-5 rounded-full bg-white/20 group-hover:bg-[#FF5B22] text-white flex items-center justify-center transition-colors shrink-0">
                      <ArrowUpRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SECCIÓN: ¿POR QUÉ VIAJAR CON NOSOTROS? & MÉTRICAS (DISEÑO PREMIUM DORADO / CHAMPAGNE) */}
      <section className="w-full relative overflow-hidden border-y border-[#DFC29D]/60 bg-gradient-to-r from-[#EDE3D2] via-[#FAF7F1] to-[#EDE3D2] py-7 sm:py-9 shadow-clean">
        
        {/* Elementos Decorativos Laterales de Transporte Vial/GPS */}
        <svg
          viewBox="0 0 140 200"
          className="hidden sm:block absolute left-0 bottom-0 h-full w-28 lg:w-40 text-[#B8860B]/20 pointer-events-none select-none"
          fill="none"
        >
          <path
            d="M-10 190 C 30 140, 20 80, 75 20"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeDasharray="6 6"
          />
          <path
            d="M-15 160 C 25 130, 45 95, 95 45"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <circle cx="75" cy="20" r="5" fill="currentColor" />
          <circle cx="42" cy="95" r="3.5" fill="currentColor" />
          <circle cx="95" cy="45" r="4" stroke="currentColor" strokeWidth="2" />
        </svg>

        <svg
          viewBox="0 0 140 200"
          className="hidden sm:block absolute right-0 bottom-0 h-full w-28 lg:w-40 text-[#B8860B]/20 pointer-events-none select-none"
          fill="none"
        >
          <path
            d="M150 190 C 110 140, 120 80, 65 20"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeDasharray="6 6"
          />
          <path
            d="M155 160 C 115 130, 95 95, 45 45"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <circle cx="65" cy="20" r="5" fill="currentColor" />
          <circle cx="98" cy="95" r="3.5" fill="currentColor" />
          <circle cx="45" cy="45" r="4" stroke="currentColor" strokeWidth="2" />
        </svg>

        <ScrollReveal direction="up" distance={20} delay={60} className="max-w-7xl mx-auto px-4 relative z-10">
          {/* Título Centrado con Líneas Laterales */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-5">
            <span className="w-8 sm:w-16 h-[1.5px] bg-gradient-to-r from-transparent to-[#080A0E]/50" />
            <h2 className="font-serif italic font-bold text-xl sm:text-2xl text-[#080A0E] text-center tracking-tight leading-none">
              ¿Por Qué Viajar Con Nosotros?
            </h2>
            <span className="w-8 sm:w-16 h-[1.5px] bg-gradient-to-l from-transparent to-[#080A0E]/50" />
          </div>

          {/* 4 Pilares Horizontales con Círculo Obsidiana/Oro y Texto Resumido Debajo */}
          <div className="grid grid-cols-4 gap-2 sm:gap-4">
            {whyTravelPillars.map((pillar, idx) => (
              <div
                key={idx}
                onClick={() => onOpenQuote('Transporte Puerta a Puerta Privado')}
                className="flex flex-col items-center text-center group cursor-pointer"
              >
                {/* Círculo Sólido en Tono Obsidiana & Dorado acorde al tema Puerta a Puerta */}
                <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#080A0E] border-2 border-[#DFC29D]/80 flex items-center justify-center shrink-0 shadow-[0_6px_18px_rgba(8,10,14,0.18)] group-hover:scale-105 group-hover:border-amber-400 transition-all duration-300 mb-1.5">
                  <pillar.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#DFC29D] stroke-[1.8]" />
                </div>
                {/* Texto Resumido Debajo del Icono */}
                <span className="font-display font-bold text-[10px] sm:text-xs text-[#080A0E] leading-tight">
                  {pillar.title}
                </span>
              </div>
            ))}
          </div>

          {/* Línea Divisoria Sutil entre Pilares y Métricas */}
          <div className="w-full h-[1px] bg-[#DFC29D]/60 my-5" />

          {/* SECCIÓN DE NÚMEROS / MÉTRICAS EN HORIZONTAL CON TÍTULOS DEBAJO */}
          <div className="grid grid-cols-4 gap-1 sm:gap-3">
            {statsMetrics.map((stat, idx) => (
              <div
                key={idx}
                className={`flex flex-col items-center text-center px-1 ${
                  idx > 0 ? 'border-l border-[#080A0E]/15' : ''
                }`}
              >
                <span className="font-sans font-black text-lg sm:text-2xl lg:text-3xl text-[#080A0E] leading-none tracking-tight">
                  {stat.value}
                </span>
                <span className="text-[8.5px] sm:text-xs text-slate-700 font-bold mt-1 leading-tight">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* 5. SECCIÓN: TÍTULO RESUMIDO Y CENTRADO CON DIVISIÓN + CARRUSEL DE CATEGORÍAS */}
      <section className="w-full pt-3 pb-2 bg-white">
        {/* Título Resumido y Centrado con Diseño Divisorio a los Lados */}
        <div className="w-full px-4 flex items-center justify-center gap-2.5 mb-3">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-200 to-amber-300" />
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50/90 border border-amber-200/60 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-700">
              Viajes de Lujo & Confort
            </span>
          </div>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent via-slate-200 to-amber-300" />
        </div>

        {/* Carrusel de Tarjetas de Categorías de la Flota (Imágenes ocupan el ancho completo) */}
        <div className="w-full flex gap-2.5 overflow-x-auto scroll-smooth snap-x snap-mandatory px-4 py-1.5 scroll-pl-4 scroll-pr-4 no-scrollbar [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {fleetClasses.map((item) => (
            <div
              key={item.id}
              className="w-[50vw] sm:w-[200px] shrink-0 snap-start"
            >
              <div
                onClick={() => {
                  setResVehicleType(item.title);
                  setShowReservationModal(true);
                }}
                className="group flex flex-col justify-between h-[215px] rounded-2xl bg-white border border-slate-200/90 hover:border-amber-400 transition-all cursor-pointer shadow-2xs overflow-hidden"
              >
                {/* Imagen que ocupa el 100% del ancho de la tarjeta */}
                <div className="w-full h-28 overflow-hidden bg-slate-100 relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500 block"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Info y Botón Reservar */}
                <div className="p-3 pt-2 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-amber-600 transition-colors truncate">
                      {item.title}
                    </h3>
                    <p className="text-[9px] text-slate-500 leading-tight mt-0.5 truncate">
                      {item.subtitle}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[10px] font-bold text-amber-600">
                    <span>Reservar</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. ÚLTIMA SECCIÓN: CON TEXTO A LA IZQUIERDA AUMENTADO 50% Y EXTENDIDO 10PX BAJO LA BARRA */}
      <section className="w-full relative min-h-[240px] sm:min-h-[270px] pb-20 sm:pb-24 overflow-hidden bg-slate-950 mt-4 mb-0">
        <img
          src="/fleet/luxury-interior-bg.jpg"
          alt="Interior de lujo en cuero caramelo"
          className="absolute inset-0 w-full h-full object-cover object-center block"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-transparent pointer-events-none" />

        {/* Columna Izquierda con texto aumentado en un 50% */}
        <div className="relative z-10 w-[75%] sm:w-[60%] p-4 sm:p-6 flex flex-col justify-center text-white">
          <ScrollReveal direction="right" distance={15} duration={600} delay={60}>
            <h3 className="font-sans text-[18px] sm:text-[21px] md:text-2xl font-black tracking-tight leading-tight text-white drop-shadow-md">
              Chófer Ejecutivo VIP
            </h3>
          </ScrollReveal>

          <ScrollReveal direction="right" distance={15} duration={600} delay={120}>
            <p className="text-[13.5px] sm:text-[16px] text-slate-200 leading-snug mt-1.5 font-medium drop-shadow-sm">
              Traslado de lujo privado, puntual y seguro en todo Ecuador.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="right" distance={15} duration={600} delay={180}>
            <div className="pt-3">
              <button
                type="button"
                onClick={() => setShowReservationModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#DFC29D] hover:bg-[#D5B895] text-slate-950 font-bold text-xs sm:text-sm shadow-lg active:scale-95 transition-all cursor-pointer"
              >
                <span>Reservar Ahora</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* MODAL DE RESERVACIÓN (SE ABRE AL DAR CLIC EN 'RESERVAR AHORA') */}
      {showReservationModal && (
        <div className="fixed inset-0 z-[200] bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#12151D] border border-white/10 rounded-2xl p-5 w-full max-w-sm text-white shadow-2xl relative">
            <button
              onClick={() => setShowReservationModal(false)}
              className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xs font-bold transition-all cursor-pointer"
              aria-label="Cerrar modal"
            >
              ✕
            </button>

            <h3 className="font-sans text-base sm:text-lg font-bold text-white tracking-tight mb-3">
              Hacer una Reserva
            </h3>

            <form onSubmit={handleReservationSubmit} className="space-y-3">
              <div>
                <label className="block text-[10px] font-semibold text-slate-300 mb-1">
                  Lugar de Recogida
                </label>
                <input
                  type="text"
                  value={resPickup}
                  onChange={(e) => setResPickup(e.target.value)}
                  placeholder="Ciudad o dirección de origen..."
                  className="w-full bg-[#1A1E29] border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#DFC29D]"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-slate-300 mb-1">
                  Lugar de Destino
                </label>
                <input
                  type="text"
                  value={resDropoff}
                  onChange={(e) => setResDropoff(e.target.value)}
                  placeholder="Ciudad o dirección de destino..."
                  className="w-full bg-[#1A1E29] border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#DFC29D]"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-slate-300 mb-1">
                  Fecha y Hora
                </label>
                <input
                  type="text"
                  value={resDateTime}
                  onChange={(e) => setResDateTime(e.target.value)}
                  placeholder="Ej: 25 de Octubre, 08:30 AM"
                  className="w-full bg-[#1A1E29] border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#DFC29D]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-slate-300 mb-1">
                  Tipo de Vehículo
                </label>
                <select
                  value={resVehicleType}
                  onChange={(e) => setResVehicleType(e.target.value)}
                  className="w-full bg-[#1A1E29] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#DFC29D] cursor-pointer"
                >
                  <option value="Clase Ejecutiva">Clase Ejecutiva (Sedán Ejecutivo)</option>
                  <option value="Clase Premium">Clase Premium (SUV Confort)</option>
                  <option value="Clase de Lujo">Clase de Lujo (VIP Flagship)</option>
                </select>
              </div>

              <div className="pt-1">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg font-bold text-xs tracking-wide text-[#080A0E] bg-[#DFC29D] hover:bg-[#D5B895] shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  Confirmar y Reservar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};