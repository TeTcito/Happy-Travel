import React, { useState, useRef } from 'react';
import { ScrollReveal } from '../../../components/ScrollReveal';
import { 
  Car, 
  ArrowRight, 
  ArrowLeft,
  ShieldCheck,
  Layers,
  Smartphone,
  Settings,
  Clock,
  MapPin,
  Headphones,
  Tag,
  Heart,
  Compass,
  Briefcase
} from 'lucide-react';

import { RouteSelectorBar } from '../../../components/RouteSelectorBar';
import { CarDoorScrollExperience } from '../../../components/CarDoorScrollExperience';

interface ServicesTabProps {
  onOpenQuote: (serviceType?: string, origin?: string, destination?: string) => void;
}

export const ServicesTab: React.FC<ServicesTabProps> = ({ onOpenQuote }) => {
  const popularRoutesScrollRef = useRef<HTMLDivElement>(null);

  // Reservation form state
  const [resPickup, setResPickup] = useState('');
  const [resDropoff, setResDropoff] = useState('');
  const [resDateTime, setResDateTime] = useState('');
  const [resVehicleType, setResVehicleType] = useState('Clase Ejecutiva');

  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const serviceName = `Reserva ${resVehicleType}${resDateTime ? ` - ${resDateTime}` : ''}`;
    onOpenQuote(serviceName, resPickup, resDropoff);
  };

  const scrollPopularRoutes = (direction: 'left' | 'right') => {
    if (popularRoutesScrollRef.current) {
      const container = popularRoutesScrollRef.current;
      const visibleCount = window.innerWidth >= 1280 ? 4 : window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1.15;
      const cardWidth = container.clientWidth / visibleCount;
      container.scrollBy({
        left: direction === 'left' ? -cardWidth : cardWidth,
        behavior: 'smooth',
      });
    }
  };

  const featuredClientRoutes = [
    {
      id: 'quito-guayaquil',
      title: 'Quito — Guayaquil',
      origin: 'Quito',
      destination: 'Guayaquil',
      duration: '7h 30m • Ruta Directa',
      vehicleType: 'SUV / Van Ejecutiva VIP',
      included: 'Equipaje y Peajes Incluidos',
      price: 'Desde $220',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Vista_cerro_santa_ana.jpg/1280px-Vista_cerro_santa_ana.jpg',
    },
    {
      id: 'guayaquil-cuenca',
      title: 'Guayaquil — Cuenca',
      origin: 'Guayaquil',
      destination: 'Cuenca',
      duration: '3h 45m • Vía El Cajas',
      vehicleType: 'Confort Ejecutivo A/C',
      included: '100% Puerta a Puerta',
      price: 'Desde $120',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Catedral_de_la_Inmaculada_Concepci%C3%B3n%2C_Cuenca_03.jpg/1280px-Catedral_de_la_Inmaculada_Concepci%C3%B3n%2C_Cuenca_03.jpg',
    },
    {
      id: 'quito-banos',
      title: 'Quito — Baños',
      origin: 'Quito',
      destination: 'Baños de Agua Santa',
      duration: '3h 15m • Viaje Privado',
      vehicleType: 'SUV 4x4 / Sedán VIP',
      included: 'Paradas a tu Medida',
      price: 'Desde $95',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/R%C3%ADo_Verde_Pail%C3%B3n_del_Diablo_trail_1.jpg/1280px-R%C3%ADo_Verde_Pail%C3%B3n_del_Diablo_trail_1.jpg',
    },
    {
      id: 'guayaquil-salinas',
      title: 'Guayaquil — Salinas',
      origin: 'Guayaquil',
      destination: 'Salinas / Montañita',
      duration: '2h 15m • Ruta del Sol',
      vehicleType: 'Vehículo Exclusivo Familiar',
      included: 'Amplia Bodega de Equipaje',
      price: 'Desde $85',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Atardecer_en_Monta%C3%B1ita.jpg/1280px-Atardecer_en_Monta%C3%B1ita.jpg',
    },
    {
      id: 'quito-manta',
      title: 'Quito — Manta',
      origin: 'Quito',
      destination: 'Manta',
      duration: '6h 30m • Costa Pacífica',
      vehicleType: 'SUV / Van Primera Clase',
      included: 'Mascotas en Cabina Apto',
      price: 'Desde $190',
      image: '/destinations/manta-skyline-coastal.jpg',
    },
    {
      id: 'quito-otavalo',
      title: 'Quito — Otavalo',
      origin: 'Quito',
      destination: 'Otavalo / Ibarra',
      duration: '2h 00m • Sierra Norte',
      vehicleType: 'Sedán / SUV Ejecutivo',
      included: 'Recogida Exacta en Domicilio',
      price: 'Desde $75',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Laguna_Cuicocha_seen_from_the_visitor_center_02.jpg/1280px-Laguna_Cuicocha_seen_from_the_visitor_center_02.jpg',
    },
  ];

  const whyTravelPillars = [
    {
      icon: ShieldCheck,
      titleLine1: 'Mejor Tarifa',
      titleLine2: 'Garantizada',
      description: 'Aseguramos precios fijos y justos para todos tus trayectos.',
    },
    {
      icon: Headphones,
      titleLine1: 'Soporte al Cliente',
      titleLine2: '24/7 en Ruta',
      description: 'Estamos aquí para ayudarte y monitorear tu viaje a cualquier hora.',
    },
    {
      icon: Tag,
      titleLine1: 'Tarifas y Rutas',
      titleLine2: 'Exclusivas',
      description: 'Accede a beneficios especiales en traslados privados y corporativos.',
    },
    {
      icon: Heart,
      titleLine1: 'Viajes Seguros',
      titleLine2: 'que Perduran',
      description: 'Creamos traslados puerta a puerta cómodos, puntuales y sin estrés.',
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

  return (
    <div className="-mt-[80px] space-y-16 pb-0 bg-white text-slate-800">
      
      {/* =========================================================================
          SECCIÓN 1: HERO PUERTA A PUERTA FULL-WIDTH DE LADO A LADO (ESTILO AVELUX)
          ========================================================================= */}
      <section className="relative w-full bg-[#080A0E] text-white overflow-hidden select-none">
        
        {/* Background Image Layer: Cubre de lado a lado y sube completamente hasta el tope de la ventana detrás del header */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
          <img
            src="/hero-puerta-composite.jpg"
            alt="Servicio Puerta a Puerta Ejecutivo"
            className="w-full h-full object-cover object-right"
          />
          {/* Oscurecimiento suave adicional solo en móviles para garantizar legibilidad */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#080A0E] via-[#080A0E]/90 to-[#080A0E]/40 lg:bg-none" />
        </div>

        {/* Contenido Principal con padding-top de 80px para comenzar con holgura debajo del header transparente */}
        <div className="relative z-10 w-full min-h-[640px] sm:min-h-[700px] lg:min-h-[760px] xl:min-h-[800px] flex items-center pt-[80px]">
          
          {/* Contenedor Principal Alineado a la Izquierda sobre el Corte Diagonal */}
          <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 pt-4 sm:pt-6 lg:pt-6 pb-28 sm:pb-28 lg:pb-24">
            <div className="w-full lg:w-[52%] xl:w-[50%] space-y-5 sm:space-y-6 ml-0 sm:ml-5 lg:ml-5">
              
              {/* 1. Título Principal en 2 Líneas (Blanco Serif + Dorado Champagne Cursiva) */}
              <div className="space-y-1">
                <ScrollReveal direction="up" distance={25} delay={120} blur={true}>
                  <h1 className="font-serif text-4xl sm:text-5xl lg:text-[54px] xl:text-[60px] font-bold text-white tracking-tight leading-[1.06]">
                    Puerta a Puerta
                  </h1>
                </ScrollReveal>
                <ScrollReveal direction="up" distance={28} delay={220} blur={true}>
                  <p className="font-serif italic font-normal text-[#DFC29D] text-4xl sm:text-5xl lg:text-[54px] xl:text-[60px] leading-[1.08]">
                    Servicio VIP Exclusivo
                  </p>
                </ScrollReveal>
              </div>

              {/* 3. Párrafo Descriptivo */}
              <ScrollReveal direction="up" distance={20} delay={300}>
                <p className="text-[#E2E4E8] text-sm sm:text-base lg:text-[17px] leading-[1.6] max-w-[490px] font-normal">
                  Viaja con total privacidad, puntualidad y confort en nuestra flota ejecutiva. Te recogemos en la puerta exacta de tu domicilio y te llevamos directo a tu destino en todo el Ecuador.
                </p>
              </ScrollReveal>

              {/* 4. Fila de 4 Iconos Circulares con Divisores Verticales (Idéntico a la Referencia) */}
              <div className="pt-2 sm:pt-4 max-w-[540px]">
                <div className="grid grid-cols-2 sm:grid-cols-4 items-start gap-y-6 sm:gap-y-0">
                  {luxuryPillars.map((item, idx) => (
                    <ScrollReveal key={idx} direction="up" distance={22} delay={380 + idx * 80}>
                      <div
                        onClick={() => onOpenQuote('Transporte Puerta a Puerta Privado')}
                        className="relative flex flex-col items-center text-center px-2 cursor-pointer group"
                      >
                        {/* Línea divisoria vertical izquierda (a partir del segundo ítem en pantallas sm+) */}
                        {idx > 0 && (
                          <span className="hidden sm:block absolute left-0 top-1 bottom-1 w-[1px] bg-white/20" />
                        )}

                        {/* Círculo con doble borde sutil en tono Dorado Champagne */}
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-[1.5px] border-[#D5B895]/80 bg-[#141414]/80 flex items-center justify-center text-[#DFC29D] shadow-[0_0_20px_rgba(213,184,149,0.12)] group-hover:border-[#DFC29D] group-hover:scale-105 group-hover:bg-[#D5B895]/15 transition-all duration-300 mb-3">
                          <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#DFC29D] stroke-[1.75]" />
                        </div>

                        {/* Texto en 2 líneas centrado */}
                        <span className="text-xs sm:text-[13px] font-medium text-white leading-tight tracking-wide">
                          {item.line1}
                        </span>
                        <span className="text-xs sm:text-[13px] font-medium text-white leading-tight tracking-wide mt-0.5">
                          {item.line2}
                        </span>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* 5. Selector de Ruta Interactivo Centrado y a 20px del Margen Inferior */}
          <div className="absolute bottom-[20px] left-0 right-0 z-20 flex justify-center px-4 sm:px-6">
            <ScrollReveal direction="up" distance={22} delay={580} className="w-full flex justify-center">
              <RouteSelectorBar onOpenQuote={onOpenQuote} />
            </ScrollReveal>
          </div>

          {/* 5. Firma Manuscrita Dorada en la Esquina Inferior Derecha sobre el Asfalto */}
          <div
            onClick={() => onOpenQuote('Transporte Puerta a Puerta Privado')}
            className="hidden md:block absolute right-[6%] lg:right-[8%] xl:right-[10%] bottom-[5%] lg:bottom-[6%] z-20 cursor-pointer group"
          >
            <ScrollReveal direction="up" distance={20} delay={520}>
              <div className="transform -rotate-[8deg] text-center select-none group-hover:scale-105 transition-transform duration-300">
                <p className="font-handwriting text-[#DFC29D] text-2xl lg:text-[31px] xl:text-[34px] leading-[0.92] tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                  Experiencia de<br />
                  Transporte<br />
                  Premium
                </p>
                {/* Trazo curvo dorado inferior */}
                <svg
                  viewBox="0 0 220 26"
                  className="w-40 lg:w-48 xl:w-52 h-auto mx-auto -mt-1 text-[#DFC29D]"
                  fill="none"
                >
                  <path
                    d="M6 22 C 65 14, 145 7, 212 4"
                    stroke="currentColor"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECCIÓN 1.1: RUTAS MÁS POPULARES (CON COSTOS) & DESTINOS MÁS VISITADOS DE ECUADOR
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* PARTE 1: RUTAS MÁS POPULARES + COSTOS */}
        <div>
          {/* Cabecera con título centrado, ornamentos de transporte y flechas a la derecha */}
          <div className="relative flex flex-col sm:flex-row items-center justify-center mb-8 gap-4">
            <ScrollReveal direction="up" distance={20} delay={60} className="text-center">
              <div className="inline-flex items-center justify-center gap-3 sm:gap-4">
                {/* Ornamento izquierdo temático de transporte (línea + emblema de ruta, sin plantas) */}
                <span className="hidden sm:flex items-center gap-1.5 text-[#B8860B]">
                  <span className="w-8 sm:w-14 h-[1.5px] bg-gradient-to-r from-transparent via-[#B8860B]/60 to-[#B8860B]" />
                  <svg viewBox="0 0 28 14" className="w-6 h-3.5 text-[#B8860B] shrink-0" fill="none">
                    <path d="M2 7H18M18 7L13 2.5M18 7L13 11.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="23" cy="7" r="2.5" fill="currentColor" />
                  </svg>
                </span>

                <h2 className="font-serif italic font-bold text-3xl sm:text-4xl lg:text-[40px] text-[#080A0E] tracking-tight leading-none">
                  Rutas Más Populares
                </h2>

                {/* Ornamento derecho temático de transporte */}
                <span className="hidden sm:flex items-center gap-1.5 text-[#B8860B]">
                  <svg viewBox="0 0 28 14" className="w-6 h-3.5 text-[#B8860B] shrink-0 rotate-180" fill="none">
                    <path d="M2 7H18M18 7L13 2.5M18 7L13 11.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="23" cy="7" r="2.5" fill="currentColor" />
                  </svg>
                  <span className="w-8 sm:w-14 h-[1.5px] bg-gradient-to-l from-transparent via-[#B8860B]/60 to-[#B8860B]" />
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 mt-2 font-medium">
                Trayectos puerta a puerta más elegidos por nuestros clientes con tarifas referenciales
              </p>
            </ScrollReveal>

            {/* Botones de navegación circulares a la derecha */}
            <div className="sm:absolute sm:right-0 sm:top-1/2 sm:-translate-y-1/2 flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => scrollPopularRoutes('left')}
                aria-label="Ruta anterior"
                className="w-10 h-10 rounded-full border border-slate-300/90 bg-white hover:bg-[#080A0E] text-slate-700 hover:text-[#DFC29D] hover:border-[#080A0E] flex items-center justify-center transition-all shadow-xs active:scale-95 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollPopularRoutes('right')}
                aria-label="Siguiente ruta"
                className="w-10 h-10 rounded-full border border-slate-300/90 bg-white hover:bg-[#080A0E] text-slate-700 hover:text-[#DFC29D] hover:border-[#080A0E] flex items-center justify-center transition-all shadow-xs active:scale-95 cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Carrusel de Tarjetas de Rutas: carrusel horizontal fluido con snap magnético, overflow vertical bloqueado y touch-pan-x para eliminar cualquier micro-scroll o desborde vertical */}
          <div
            ref={popularRoutesScrollRef}
            className="flex gap-5 overflow-x-auto overflow-y-hidden touch-pan-x overscroll-y-none snap-x snap-mandatory py-3 px-1 no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {featuredClientRoutes.map((route, idx) => (
              <div
                key={route.id}
                className="snap-start shrink-0 w-[85%] sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] xl:w-[calc(25%-15px)]"
              >
                <ScrollReveal direction={idx === 0 ? 'left' : idx === 3 ? 'right' : 'up'} distance={16} delay={idx * 60}>
                  <div
                    onClick={() => onOpenQuote('Transporte Puerta a Puerta Privado', route.origin, route.destination)}
                    className="relative h-[350px] sm:h-[365px] rounded-[22px] overflow-hidden group cursor-pointer shadow-md border border-slate-900/10"
                  >
                    {/* Imagen de fondo de la ruta */}
                    <img
                      src={route.image}
                      alt={route.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Degradado oscuro profundo desde la mitad inferior para lectura impecable */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#06080E] via-[#06080E]/80 via-45% to-transparent" />

                    {/* Contenido inferior de la tarjeta */}
                    <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-end text-white z-10">
                      <h3 className="font-serif italic text-lg sm:text-[19px] xl:text-[21px] font-bold text-white leading-tight mb-2.5 whitespace-nowrap truncate drop-shadow-sm group-hover:text-[#DFC29D] transition-colors">
                        {route.title}
                      </h3>

                      <div className="space-y-1 text-[11px] text-slate-200/95 mb-3.5">
                        <div className="flex items-center gap-2">
                          <Clock className="w-3 h-3 text-[#DFC29D] shrink-0" />
                          <span className="truncate">{route.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Car className="w-3 h-3 text-[#DFC29D] shrink-0" />
                          <span className="truncate">{route.vehicleType}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Briefcase className="w-3 h-3 text-[#DFC29D] shrink-0" />
                          <span className="truncate">{route.included}</span>
                        </div>
                      </div>

                      {/* Botón píldora con el costo de la ruta acorde al tema dorado/ejecutivo */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenQuote('Transporte Puerta a Puerta Privado', route.origin, route.destination);
                        }}
                        className="w-full py-2 rounded-full font-bold text-xs tracking-wide text-[#080A0E] bg-gradient-to-r from-[#DFC29D] via-[#D5B895] to-[#C4A47C] hover:from-amber-300 hover:to-amber-400 shadow-[0_4px_15px_rgba(213,184,149,0.3)] transition-all flex items-center justify-center active:scale-95 cursor-pointer"
                      >
                        {route.price}
                      </button>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            ))}
          </div>
        </div>

        {/* PARTE 2: DESTINOS MÁS VISITADOS (CIUDADES DE ECUADOR EN GRILLA BENTO) */}
        <div>
          {/* Cabecera centrada */}
          <ScrollReveal direction="up" distance={20} delay={80} className="text-center mb-8">
            <div className="inline-flex items-center justify-center gap-3 sm:gap-4">
              <span className="hidden sm:flex items-center gap-1.5 text-[#B8860B]">
                <span className="w-8 sm:w-14 h-[1.5px] bg-gradient-to-r from-transparent via-[#B8860B]/60 to-[#B8860B]" />
                <Compass className="w-4 h-4 text-[#B8860B] shrink-0" />
              </span>

              <h2 className="font-serif italic font-bold text-3xl sm:text-4xl lg:text-[40px] text-[#080A0E] tracking-tight leading-none">
                Destinos Más Visitados
              </h2>

              <span className="hidden sm:flex items-center gap-1.5 text-[#B8860B]">
                <Compass className="w-4 h-4 text-[#B8860B] shrink-0" />
                <span className="w-8 sm:w-14 h-[1.5px] bg-gradient-to-l from-transparent via-[#B8860B]/60 to-[#B8860B]" />
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 mt-2 font-medium">
              Explora las ciudades icónicas del Ecuador que nuestros clientes más visitan
            </p>
          </ScrollReveal>

          {/* Grilla Asimétrica de 4 Columnas idéntica a la estructura de referencia */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
            
            {/* Columna 1: Tarjeta Vertical Alta (Quito) */}
            <ScrollReveal direction="up" distance={24} delay={60}>
              <div
                onClick={() => onOpenQuote('Transporte Puerta a Puerta Privado', '', 'Quito')}
                className="relative w-full h-[280px] lg:h-[436px] rounded-[22px] overflow-hidden group cursor-pointer shadow-md"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Quito_as_from_panecillo_Basilica.jpg/1280px-Quito_as_from_panecillo_Basilica.jpg"
                  alt="Quito, Ecuador"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06080E]/90 via-[#06080E]/25 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                  <h3 className="font-serif italic text-xl sm:text-[22px] font-bold leading-tight whitespace-nowrap truncate drop-shadow-md group-hover:text-[#DFC29D] transition-colors">
                    Quito
                  </h3>
                  <div className="flex items-center gap-1.5 text-[11px] text-white/90 font-medium mt-0.5">
                    <MapPin className="w-3 h-3 text-[#DFC29D] shrink-0" />
                    <span className="truncate">Pichincha • Capital del Ecuador</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Columna 2: Dos Tarjetas Horizontales Apiladas (Cuenca & Guayaquil) */}
            <div className="flex flex-col gap-4">
              <ScrollReveal direction="up" distance={22} delay={120}>
                <div
                  onClick={() => onOpenQuote('Transporte Puerta a Puerta Privado', '', 'Cuenca')}
                  className="relative w-full h-[210px] rounded-[22px] overflow-hidden group cursor-pointer shadow-md"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Catedral_de_la_Inmaculada_Concepci%C3%B3n%2C_Cuenca.jpg/1280px-Catedral_de_la_Inmaculada_Concepci%C3%B3n%2C_Cuenca.jpg"
                    alt="Cuenca, Ecuador"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06080E]/90 via-[#06080E]/25 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                    <h3 className="font-serif italic text-xl sm:text-[22px] font-bold leading-tight whitespace-nowrap truncate drop-shadow-md group-hover:text-[#DFC29D] transition-colors">
                      Cuenca
                    </h3>
                    <div className="flex items-center gap-1.5 text-[11px] text-white/90 font-medium mt-0.5">
                      <MapPin className="w-3 h-3 text-[#DFC29D] shrink-0" />
                      <span className="truncate">Azuay • Atenas del Ecuador</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" distance={22} delay={180}>
                <div
                  onClick={() => onOpenQuote('Transporte Puerta a Puerta Privado', '', 'Guayaquil')}
                  className="relative w-full h-[210px] rounded-[22px] overflow-hidden group cursor-pointer shadow-md"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Faro_de_Guayaquil.jpg/1280px-Faro_de_Guayaquil.jpg"
                    alt="Guayaquil, Ecuador"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06080E]/90 via-[#06080E]/25 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                    <h3 className="font-serif italic text-xl sm:text-[22px] font-bold leading-tight whitespace-nowrap truncate drop-shadow-md group-hover:text-[#DFC29D] transition-colors">
                      Guayaquil
                    </h3>
                    <div className="flex items-center gap-1.5 text-[11px] text-white/90 font-medium mt-0.5">
                      <MapPin className="w-3 h-3 text-[#DFC29D] shrink-0" />
                      <span className="truncate">Guayas • Perla del Pacífico</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Columna 3: Dos Tarjetas Horizontales Apiladas (Baños de Agua Santa & Manta) */}
            <div className="flex flex-col gap-4">
              <ScrollReveal direction="up" distance={22} delay={150}>
                <div
                  onClick={() => onOpenQuote('Transporte Puerta a Puerta Privado', '', 'Baños de Agua Santa')}
                  className="relative w-full h-[210px] rounded-[22px] overflow-hidden group cursor-pointer shadow-md"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Ba%C3%B1os%2C_Ecuador.JPG/1280px-Ba%C3%B1os%2C_Ecuador.JPG"
                    alt="Baños de Agua Santa, Ecuador"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06080E]/90 via-[#06080E]/25 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                    <h3 className="font-serif italic text-xl sm:text-[22px] font-bold leading-tight whitespace-nowrap truncate drop-shadow-md group-hover:text-[#DFC29D] transition-colors">
                      Baños de Agua Santa
                    </h3>
                    <div className="flex items-center gap-1.5 text-[11px] text-white/90 font-medium mt-0.5">
                      <MapPin className="w-3 h-3 text-[#DFC29D] shrink-0" />
                      <span className="truncate">Tungurahua • Ruta de las Cascadas</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" distance={22} delay={210}>
                <div
                  onClick={() => onOpenQuote('Transporte Puerta a Puerta Privado', '', 'Manta')}
                  className="relative w-full h-[210px] rounded-[22px] overflow-hidden group cursor-pointer shadow-md"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/2022-10-04a_Wide_view_of_the_city_of_Manta%2C_Ecuador.jpg/1280px-2022-10-04a_Wide_view_of_the_city_of_Manta%2C_Ecuador.jpg"
                    alt="Manta, Ecuador"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06080E]/90 via-[#06080E]/25 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                    <h3 className="font-serif italic text-xl sm:text-[22px] font-bold leading-tight whitespace-nowrap truncate drop-shadow-md group-hover:text-[#DFC29D] transition-colors">
                      Manta
                    </h3>
                    <div className="flex items-center gap-1.5 text-[11px] text-white/90 font-medium mt-0.5">
                      <MapPin className="w-3 h-3 text-[#DFC29D] shrink-0" />
                      <span className="truncate">Manabí • Costa del Pacífico</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Columna 4: Tarjeta Vertical Alta (Salinas & Montañita) */}
            <ScrollReveal direction="up" distance={24} delay={240}>
              <div
                onClick={() => onOpenQuote('Transporte Puerta a Puerta Privado', '', 'Salinas / Montañita')}
                className="relative w-full h-[280px] lg:h-[436px] rounded-[22px] overflow-hidden group cursor-pointer shadow-md"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Salinas_beach_view_in_ecuador_south_america.jpg/1280px-Salinas_beach_view_in_ecuador_south_america.jpg"
                  alt="Salinas y Montañita, Ecuador"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06080E]/90 via-[#06080E]/25 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                  <h3 className="font-serif italic text-xl sm:text-[22px] font-bold leading-tight whitespace-nowrap truncate drop-shadow-md group-hover:text-[#DFC29D] transition-colors">
                    Salinas &amp; Montañita
                  </h3>
                  <div className="flex items-center gap-1.5 text-[11px] text-white/90 font-medium mt-0.5">
                    <MapPin className="w-3 h-3 text-[#DFC29D] shrink-0" />
                    <span className="truncate">Santa Elena • Ruta del Spondylus</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>

      </section>

      {/* =========================================================================
          SECCIÓN 1.2: ¿POR QUÉ VIAJAR CON NOSOTROS? (FULL-WIDTH DE ANCHO COMPLETO)
          ========================================================================= */}
      <section className="w-full relative overflow-hidden border-y border-[#DFC29D]/60 bg-gradient-to-r from-[#EDE3D2] via-[#FAF7F1] to-[#EDE3D2] py-10 sm:py-12 shadow-clean">
        
        {/* Elementos Decorativos Laterales de Transporte Vial/GPS (Reemplazan las ramas de plantas) */}
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

        <ScrollReveal direction="up" distance={25} delay={80} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Título Centrado con Líneas Laterales */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="w-10 sm:w-20 h-[1.5px] bg-gradient-to-r from-transparent to-[#080A0E]/50" />
            <h2 className="font-serif italic font-bold text-2xl sm:text-3xl lg:text-[34px] text-[#080A0E] text-center tracking-tight leading-none">
              ¿Por Qué Viajar Con Nosotros?
            </h2>
            <span className="w-10 sm:w-20 h-[1.5px] bg-gradient-to-l from-transparent to-[#080A0E]/50" />
          </div>

          {/* 4 Pilares Horizontales con Círculo + Texto a la Derecha */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
            {whyTravelPillars.map((pillar, idx) => (
              <div
                key={idx}
                onClick={() => onOpenQuote('Transporte Puerta a Puerta Privado')}
                className="flex items-center gap-3.5 group cursor-pointer"
              >
                {/* Círculo Sólido en Tono Obsidiana & Dorado acorde al tema Puerta a Puerta */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#080A0E] border-2 border-[#DFC29D]/80 flex items-center justify-center shrink-0 shadow-[0_6px_18px_rgba(8,10,14,0.18)] group-hover:scale-105 group-hover:border-amber-400 transition-all duration-300">
                  <pillar.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#DFC29D] stroke-[1.8]" />
                </div>

                {/* Texto Alineado a la Izquierda con título en 1 sola fila */}
                <div className="min-w-0">
                  <h3 className="font-display font-extrabold text-xs sm:text-[14px] text-[#080A0E] leading-tight whitespace-nowrap truncate">
                    {pillar.titleLine1} {pillar.titleLine2}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-600 leading-snug mt-1">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* =========================================================================
          SECCIÓN 1.3: VEHÍCULO CON EFECTO DE APERTURA DE PUERTAS EN SCROLL (IMAGEN 1)
          ========================================================================= */}
      <CarDoorScrollExperience onOpenQuote={onOpenQuote} />

      {/* =========================================================================
          SECCIÓN 1.4: CATEGORÍAS DE VEHÍCULOS DE LA FLOTA (IMAGEN 2)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8 sm:my-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Clase Ejecutiva (Entrada desde la izquierda) */}
          <ScrollReveal direction="left" distance={30} delay={60}>
            <div
              onClick={() => {
                setResVehicleType('Clase Ejecutiva');
                const formEl = document.getElementById('reservation-form-section');
                if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
                else onOpenQuote('Clase Ejecutiva');
              }}
              className="bg-white border border-slate-200/90 hover:border-amber-500/50 rounded-[14px] p-6 sm:p-7 shadow-clean-sm hover:shadow-clean-lg transition-all duration-300 group cursor-pointer flex flex-col justify-between overflow-hidden"
            >
              <div>
                <h3 className="font-sans font-bold text-slate-900 text-xl tracking-tight group-hover:text-amber-800 transition-colors">
                  Clase Ejecutiva
                </h3>
                <p className="text-xs sm:text-[13px] text-slate-500 mt-1 font-normal">
                  Para ejecutivos
                </p>
              </div>

              <div className="mt-4 -mx-7 -mb-7 overflow-hidden">
                <img
                  src="/fleet/class_business.jpg"
                  alt="Clase Ejecutiva - Sedán Ejecutivo"
                  className="w-full h-auto object-contain object-left block transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </ScrollReveal>

          {/* Card 2: Clase Premium (Entrada desde abajo) */}
          <ScrollReveal direction="up" distance={30} delay={120}>
            <div
              onClick={() => {
                setResVehicleType('Clase Premium');
                const formEl = document.getElementById('reservation-form-section');
                if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
                else onOpenQuote('Clase Premium');
              }}
              className="bg-white border border-slate-200/90 hover:border-amber-500/50 rounded-[14px] p-6 sm:p-7 shadow-clean-sm hover:shadow-clean-lg transition-all duration-300 group cursor-pointer flex flex-col justify-between overflow-hidden"
            >
              <div>
                <h3 className="font-sans font-bold text-slate-900 text-xl tracking-tight group-hover:text-amber-800 transition-colors">
                  Clase Premium
                </h3>
                <p className="text-xs sm:text-[13px] text-slate-500 mt-1 font-normal">
                  Para su comodidad
                </p>
              </div>

              <div className="mt-4 -mx-7 -mb-7 overflow-hidden">
                <img
                  src="/fleet/class_premium.jpg"
                  alt="Clase Premium - Crossover Confort"
                  className="w-full h-auto object-contain object-left block transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </ScrollReveal>

          {/* Card 3: Clase de Lujo (Entrada desde la derecha) */}
          <ScrollReveal direction="right" distance={30} delay={180}>
            <div
              onClick={() => {
                setResVehicleType('Clase de Lujo');
                const formEl = document.getElementById('reservation-form-section');
                if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
                else onOpenQuote('Clase de Lujo');
              }}
              className="bg-white border border-slate-200/90 hover:border-amber-500/50 rounded-[14px] p-6 sm:p-7 shadow-clean-sm hover:shadow-clean-lg transition-all duration-300 group cursor-pointer flex flex-col justify-between overflow-hidden"
            >
              <div>
                <h3 className="font-sans font-bold text-slate-900 text-xl tracking-tight group-hover:text-amber-800 transition-colors">
                  Clase de Lujo
                </h3>
                <p className="text-xs sm:text-[13px] text-slate-500 mt-1 font-normal">
                  Para la máxima experiencia
                </p>
              </div>

              <div className="mt-4 -mx-7 -mb-7 overflow-hidden">
                <img
                  src="/fleet/class_luxury.jpg"
                  alt="Clase de Lujo - Limusina Flagship VIP"
                  className="w-full h-auto object-contain object-left block transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* =========================================================================
          SECCIÓN 1.5: FORMULARIO DE RESERVA / COTIZACIÓN CON FONDO INTERIOR DE LUJO (IMAGEN 3)
          Apegada directamente al footer sin márgenes ni espacios en blanco inferiores
          ========================================================================= */}
      <section id="reservation-form-section" className="w-full relative overflow-hidden mt-16 mb-0">
        {/* Background Image: Fotografía de interior ejecutivo en cuero caramelo */}
        <div className="absolute inset-0 z-0">
          <img
            src="/fleet/luxury-interior-bg.jpg"
            alt="Interior de lujo con asientos en cuero caramelo"
            className="w-full h-full object-cover object-center"
          />
          {/* Degradado oscuro para garantizar legibilidad óptima */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#080A0E]/95 via-[#080A0E]/85 to-[#080A0E]/60 backdrop-blur-[1px]" />
        </div>

        {/* Contenido Principal */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Columna Izquierda: Información de Servicio en Español */}
            <div className="lg:col-span-7 space-y-6 text-white">
              <ScrollReveal direction="left" distance={30} delay={60}>
                <h2 className="font-sans text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight leading-[1.1]">
                  Agende Su Servicio de<br />
                  Chófer Ejecutivo VIP
                </h2>
              </ScrollReveal>

              <ScrollReveal direction="left" distance={25} delay={120}>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-lg">
                  Reserve su traslado de lujo en pocos pasos. Seguro, cómodo y con puntualidad garantizada.
                </p>
              </ScrollReveal>

              {/* 3 Checkmarks con badges dorados */}
              <ScrollReveal direction="left" distance={25} delay={180}>
                <div className="space-y-3.5 pt-2">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#DFC29D] text-[#080A0E] flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
                      ✓
                    </div>
                    <span className="text-white text-sm sm:text-base font-semibold">
                      Chóferes Profesionales Certificados
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#DFC29D] text-[#080A0E] flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
                      ✓
                    </div>
                    <span className="text-white text-sm sm:text-base font-semibold">
                      Flota de Alta Gama Exclusiva
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#DFC29D] text-[#080A0E] flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
                      ✓
                    </div>
                    <span className="text-white text-sm sm:text-base font-semibold">
                      Monitoreo y Soporte 24/7
                    </span>
                  </div>
                </div>
              </ScrollReveal>

              {/* Botón Reservar Ahora en píldora dorada champagne */}
              <ScrollReveal direction="left" distance={20} delay={240}>
                <div className="pt-3">
                  <button
                    type="button"
                    onClick={() => onOpenQuote('Transporte Puerta a Puerta Privado')}
                    className="px-8 py-3 rounded-full font-bold text-sm tracking-wide text-[#080A0E] bg-[#DFC29D] hover:bg-[#D5B895] shadow-[0_4px_20px_rgba(223,194,157,0.35)] transition-all active:scale-95 cursor-pointer"
                  >
                    Reservar Ahora
                  </button>
                </div>
              </ScrollReveal>
            </div>

            {/* Columna Derecha: Tarjeta Flotante de Reservación (Hacer una Reserva) */}
            <div className="lg:col-span-5">
              <ScrollReveal direction="right" distance={35} delay={160}>
                <form
                  onSubmit={handleReservationSubmit}
                  className="rounded-[14px] bg-[#12151D]/95 backdrop-blur-md border border-white/10 p-6 sm:p-8 shadow-2xl space-y-4"
                >
                  <h3 className="font-sans text-xl font-bold text-white tracking-tight mb-2">
                    Hacer una Reserva
                  </h3>

                  {/* Lugar de Recogida */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-300">
                      Lugar de Recogida
                    </label>
                    <input
                      type="text"
                      value={resPickup}
                      onChange={(e) => setResPickup(e.target.value)}
                      placeholder="Ingrese dirección o ciudad de origen..."
                      className="w-full bg-[#1A1E29] border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#DFC29D] transition-colors"
                      required
                    />
                  </div>

                  {/* Lugar de Destino */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-300">
                      Lugar de Destino
                    </label>
                    <input
                      type="text"
                      value={resDropoff}
                      onChange={(e) => setResDropoff(e.target.value)}
                      placeholder="Ingrese dirección o ciudad de destino..."
                      className="w-full bg-[#1A1E29] border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#DFC29D] transition-colors"
                      required
                    />
                  </div>

                  {/* Fecha y Hora */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-300">
                      Fecha y Hora
                    </label>
                    <input
                      type="text"
                      value={resDateTime}
                      onChange={(e) => setResDateTime(e.target.value)}
                      placeholder="Ej: 25 de Octubre, 08:30 AM"
                      className="w-full bg-[#1A1E29] border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#DFC29D] transition-colors"
                    />
                  </div>

                  {/* Tipo de Vehículo */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-300">
                      Tipo de Vehículo
                    </label>
                    <select
                      value={resVehicleType}
                      onChange={(e) => setResVehicleType(e.target.value)}
                      className="w-full bg-[#1A1E29] border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#DFC29D] transition-colors cursor-pointer"
                    >
                      <option value="Clase Ejecutiva">Clase Ejecutiva (Sedán Ejecutivo)</option>
                      <option value="Clase Premium">Clase Premium (SUV / Crossover Confort)</option>
                      <option value="Clase de Lujo">Clase de Lujo (Limusina Flagship VIP)</option>
                    </select>
                  </div>

                  {/* Botón Submit */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-lg font-bold text-sm tracking-wide text-[#080A0E] bg-[#DFC29D] hover:bg-[#D5B895] shadow-md transition-all active:scale-95 cursor-pointer"
                    >
                      Reservar Ahora
                    </button>
                  </div>
                </form>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
