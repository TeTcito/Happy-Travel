import React, { useState, useRef, useEffect } from 'react';
import type { TabType } from '../../../types';
import { ScrollReveal } from '../../../components/ScrollReveal';
import { 
  Clock, 
  MapPin, 
  ArrowRight, 
  ArrowLeft,
  ArrowUpRight,
  Star, 
  Calendar,
  Key,
  Compass,
  ShieldCheck,
  Users,
  Leaf,
  Headphones,
  Sparkles
} from 'lucide-react';

interface HomeTabProps {
  setActiveTab: (tab: TabType) => void;
  onOpenQuote: (serviceType?: string) => void;
}

const serviceCards = [
  {
    id: 'encomiendas',
    title: 'Encomiendas Express',
    subtitle: 'Cero pérdidas, entrega en mano y reporte en tiempo real',
    image: '/parcels/parcel-executive-van-road.jpg',
    tab: 'encomiendas' as TabType,
    quoteName: 'Encomiendas Express Puerta a Puerta',
  },
  {
    id: 'puerta-a-puerta',
    title: 'Transporte Puerta a Puerta',
    subtitle: 'Rutas intermunicipales sin escalas ni compartir vehículo',
    image: '/services/door-to-door-chauffeur.jpg',
    tab: 'servicios' as TabType,
    quoteName: 'Transporte Puerta a Puerta Privado',
  },
  {
    id: 'vip-celebridades',
    title: 'Traslado VIP & Celebridades',
    subtitle: 'Confidencialidad absoluta, acuerdos NDA y vehículos blindados',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&h=1000&q=80',
    tab: 'servicios' as TabType,
    quoteName: 'Traslado VIP y Celebridades',
  },
  {
    id: 'transporte-mascotas',
    title: 'Transporte de Mascotas',
    subtitle: '100% en cabina climatizada con paradas e hidratación',
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&h=1000&q=80',
    tab: 'mascotas' as TabType,
    quoteName: 'Transporte Exclusivo de Mascotas',
  },
];

const sixBenefits = [
  { icon: Clock, title: 'Monitoreo GPS' },
  { icon: ShieldCheck, title: 'Seguridad' },
  { icon: Users, title: 'Choferes PRO' },
  { icon: Leaf, title: 'Flota Limpia' },
  { icon: MapPin, title: 'Puerta a Puerta' },
  { icon: Headphones, title: 'Soporte 24/7' },
];

export const HomeTab: React.FC<HomeTabProps> = ({ setActiveTab, onOpenQuote }) => {
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  // Estados y ref para el carrusel de los 4 Bloques de Servicios
  const servicesCarouselRef = useRef<HTMLDivElement>(null);
  const [canScrollServicesLeft, setCanScrollServicesLeft] = useState(false);
  const [canScrollServicesRight, setCanScrollServicesRight] = useState(true);

  const checkServicesScrollPosition = () => {
    if (servicesCarouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = servicesCarouselRef.current;
      setCanScrollServicesLeft(scrollLeft > 10);
      setCanScrollServicesRight(scrollLeft < scrollWidth - clientWidth - 10);

      const cardWidth = clientWidth * 0.38;
      const index = Math.round(scrollLeft / (cardWidth + 10));
      setActiveCardIndex(Math.min(Math.max(index, 0), serviceCards.length - 1));
    }
  };

  useEffect(() => {
    const el = servicesCarouselRef.current;
    if (!el) return;
    checkServicesScrollPosition();
    el.addEventListener('scroll', checkServicesScrollPosition, { passive: true });
    window.addEventListener('resize', checkServicesScrollPosition);
    return () => {
      el.removeEventListener('scroll', checkServicesScrollPosition);
      window.removeEventListener('resize', checkServicesScrollPosition);
    };
  }, []);

  const scrollToServiceCard = (idx: number) => {
    if (servicesCarouselRef.current) {
      const container = servicesCarouselRef.current;
      const cardEl = container.children[idx] as HTMLElement;
      if (cardEl) {
        cardEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      } else {
        const cardWidth = container.clientWidth * 0.38;
        container.scrollTo({ left: idx * (cardWidth + 10), behavior: 'smooth' });
      }
      setActiveCardIndex(idx);
    }
  };

  const handlePrevCard = () => {
    if (servicesCarouselRef.current) {
      const container = servicesCarouselRef.current;
      const scrollAmount = container.clientWidth * 0.40;
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      setActiveCardIndex((prev) => (prev - 1 + serviceCards.length) % serviceCards.length);
    }
  };

  const handleNextCard = () => {
    if (servicesCarouselRef.current) {
      const container = servicesCarouselRef.current;
      const scrollAmount = container.clientWidth * 0.40;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    } else {
      setActiveCardIndex((prev) => (prev + 1) % serviceCards.length);
    }
  };

  // Estados y ref para el carrusel de Destinos Populares
  const destinationsCarouselRef = useRef<HTMLDivElement>(null);
  const [canScrollDestLeft, setCanScrollDestLeft] = useState(false);
  const [canScrollDestRight, setCanScrollDestRight] = useState(true);
  const [destScrollProgress, setDestScrollProgress] = useState(0);

  const checkDestScrollPosition = () => {
    if (destinationsCarouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = destinationsCarouselRef.current;
      setCanScrollDestLeft(scrollLeft > 10);
      setCanScrollDestRight(scrollLeft < scrollWidth - clientWidth - 10);
      const maxScroll = scrollWidth - clientWidth;
      setDestScrollProgress(maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0);
    }
  };

  useEffect(() => {
    const el = destinationsCarouselRef.current;
    if (!el) return;
    checkDestScrollPosition();
    el.addEventListener('scroll', checkDestScrollPosition, { passive: true });
    window.addEventListener('resize', checkDestScrollPosition);
    return () => {
      el.removeEventListener('scroll', checkDestScrollPosition);
      window.removeEventListener('resize', checkDestScrollPosition);
    };
  }, []);

  const scrollDestinations = (direction: 'left' | 'right') => {
    if (destinationsCarouselRef.current) {
      const container = destinationsCarouselRef.current;
      const scrollAmount = container.clientWidth * 0.40;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const [nearestLocation, setNearestLocation] = useState('');

  const handleNearestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nearestLocation.trim()) {
      onOpenQuote(`Punto de recogida: ${nearestLocation.trim()}`);
    } else {
      onOpenQuote('Reserva Inmediata de Vehículo');
    }
  };

  const fleetVehicles = [
    {
      id: 'economy',
      name: 'Económico',
      image: '/fleet/economy.png',
    },
    {
      id: 'max',
      name: 'Max (SUV)',
      image: '/fleet/max.png',
    },
    {
      id: 'kids',
      name: 'Niños & Familia',
      image: '/fleet/kids.png',
    },
    {
      id: 'business',
      name: 'Ejecutivo',
      image: '/fleet/business.png',
    },
    {
      id: 'first-class',
      name: 'Primera Clase',
      image: '/fleet/first-class.png',
    },
  ];

  const popularDestinations = [
    {
      name: 'Quito',
      province: 'Pichincha',
      tag: 'Patrimonio de la Humanidad',
      iconicHighlight: 'Centro Histórico & Mitad del Mundo',
      description: 'Maravíllate con el centro colonial mejor preservado de América, templos barrocos bañados en pan de oro como La Compañía y la experiencia única de pararte sobre la mítica línea equinoccial.',
      image: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Guayaquil',
      province: 'Guayas',
      tag: 'La Perla del Pacífico',
      iconicHighlight: 'Malecón 2000 & Cerro Santa Ana',
      description: 'Siente la vibrante energía porteña a orillas del majestuoso río Guayas, sube los 444 escalones del cerro Santa Ana entre casas coloniales de colores y degusta su insuperable gastronomía marina.',
      image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Cuenca',
      province: 'Azuay',
      tag: 'Atenas del Ecuador',
      iconicHighlight: 'Catedral de Cúpulas Azules & Río Tomebamba',
      description: 'Respira romanticismo e historia entre calles adoquinadas, balcones floridos, arquitectura de estilo europeo y la cuna de los afamados sombreros finos de paja toquilla.',
      image: 'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Baños de Agua Santa',
      province: 'Tungurahua',
      tag: 'Capital de la Aventura',
      iconicHighlight: 'Pailón del Diablo & Casa del Árbol',
      description: 'El umbral entre los Andes y la Amazonía: vuela en el legendario columpio del fin del mundo, siente la fuerza ensordecedora del Pailón del Diablo y renueva energías en aguas termales curativas.',
      image: 'https://images.unsplash.com/photo-1568632234157-ce7aecd03d0d?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Montañita',
      province: 'Santa Elena',
      tag: 'Surf & Playas del Pacífico',
      iconicHighlight: 'Olas de Clase Mundial & Atardeceres Dorados',
      description: 'El paraíso de costa preferido por viajeros de todo el mundo: olas perfectas para surfear, atardeceres mágicos frente al mar, deliciosa comida típica y un ambiente bohemio incomparable.',
      image: '/destinations/montanita-pacific-sunset.jpg',
    },
    {
      name: 'Cotopaxi',
      province: 'Sierra Central',
      tag: 'Santuario de los Andes',
      iconicHighlight: 'Parque Nacional & Volcán Nevado',
      description: 'Contempla la imponente cumbre nevada de uno de los volcanes activos más altos del mundo, rodeado de senderos en páramo andino virgen, la mística laguna de Limpiopungo y aire puro de montaña.',
      image: '/destinations/cotopaxi-volcano.jpg',
    },
    {
      name: 'Manta',
      province: 'Manabí',
      tag: 'Sol, Océano & Gastronomía',
      iconicHighlight: 'Playa El Murciélago & Puerto Atunero',
      description: 'La gran capital turística y pesquera de la costa: extensas playas de arena dorada, deportes náuticos de primer nivel y los más exquisitos ceviches y manjares marinos manabitas.',
      image: '/destinations/manta-skyline-coastal.jpg',
    },
    {
      name: 'Otavalo',
      province: 'Imbabura',
      tag: 'Cultura & Tradición Andina',
      iconicHighlight: 'Plaza de Ponchos & San Pablo',
      description: 'Sumérgete en el mercado indígena artesanal más grande de Sudamérica, entre tejidos tradicionales ancestrales, lagunas andinas de ensueño y vistas panorámicas al volcán Imbabura.',
      image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const testimonials = [
    {
      id: '1',
      name: 'Mariana Duque & "Toby"',
      quote: 'Proceso de reserva súper rápido, vehículo impecable y excelente atención. Toby viajó conmigo en el asiento trasero con aire acondicionado y descansos programados. ¡100% recomendado!',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    {
      id: '2',
      name: 'Camilo Restrepo',
      quote: 'La mejor experiencia de transporte privado. Tarifas transparentes sin cargos sorpresa. Conductores puntuales, discretos y altamente profesionales para viajes VIP.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    },
    {
      id: '3',
      name: 'Dra. Valentina Morales',
      quote: 'Contratamos el servicio para nuestra familia y el envío de paquetes delicados. El vehículo estaba en excelente estado y el equipo de soporte nos acompañó 24/7 en carretera.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
    }
  ];

  return (
    <div className="bg-white text-slate-800">
      
      {/* 1. SECCIÓN HERO: FOTOGRAFÍA PANORÁMICA HORIZONTAL SIN MÁSCARAS */}
      <section className="relative w-full overflow-hidden bg-[#070b14]">
        
        {/* CONTENEDOR DE LA IMAGEN EN PROPORCIÓN HORIZONTAL (3:2) */}
        <div className="relative w-full aspect-[3/2] overflow-hidden bg-[#070b14]">
          <img 
            src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=2400&q=90" 
            alt="Vehículo SUV en carretera al atardecer"
            className="w-full h-full object-cover object-[75%_center] block"
          />
          
          {/* Sutil sombra lateral detrás del texto para contraste natural sin tapar la foto */}
          <div className="absolute inset-y-0 left-0 w-3/5 bg-gradient-to-r from-black/75 via-black/35 to-transparent pointer-events-none" />

          {/* TEXTO SUPERPUESTO (INICIANDO A ~10PX DEL MARGEN SUPERIOR, ESTILO ELEGANTE Y GRAN TAMAÑO) */}
          <div className="absolute inset-0 z-10 pt-[10px] sm:pt-3 pl-4 sm:pl-6 pr-2 pb-2 flex flex-col justify-start">
            <div className="max-w-[60%] space-y-1.5">
              
              {/* Titular Principal en 3 líneas aumentado un 50% más (Playfair Display) */}
              <ScrollReveal direction="up" distance={12} duration={650} delay={60}>
                <h1 className="font-serif text-[50px] sm:text-6xl font-black text-white tracking-tight leading-[0.92] drop-shadow-2xl">
                  Viaja al <br />
                  Siguiente <br />
                  <span className="italic font-bold text-amber-400 inline-block translate-y-[2px]">Nivel.</span>
                </h1>
              </ScrollReveal>

              {/* Botón Cotizar Viaje (Bajado exactamente 5px con mt-[5px]) */}
              <ScrollReveal direction="up" distance={10} duration={600} delay={180}>
                <div className="pt-1 mt-[5px]">
                  <button
                    onClick={() => onOpenQuote()}
                    className="inline-flex items-center gap-2 pl-3.5 pr-1.5 py-1.5 rounded-full bg-white text-slate-950 hover:bg-slate-100 font-bold text-xs uppercase tracking-wider transition-all shadow-xl active:scale-95 group"
                  >
                    <span>Cotizar Viaje</span>
                    <div className="w-5 h-5 rounded-full bg-[#FF5B22] group-hover:bg-[#E04812] flex items-center justify-center text-white transition-colors shadow-sm">
                      <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </button>
                </div>
              </ScrollReveal>

            </div>
          </div>
        </div>

      </section>

      {/* 2. SECCIÓN: SERVICIOS Y CARRUSEL CON 2.5 TARJETAS Y SCROLL COMPLETO */}
      <section className="relative pt-3 pb-6 z-20 bg-white">
        <div className="w-full">
          
          {/* BARRA DE SERVICIOS Y CONTROLES DEL CARRUSEL (FONDO BLANCO LIMPIO) */}
          <div className="pt-1 pb-3 px-4 flex items-center justify-between">
            {/* Indicador de Sección: Barra Naranja y Texto "Servicios" */}
            <ScrollReveal direction="right" distance={16} duration={600} delay={100}>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-4 bg-[#FF5B22] rounded-full inline-block"></span>
                <span className="font-display text-base font-bold text-slate-900 tracking-wide">
                  Servicios
                </span>
              </div>
            </ScrollReveal>

            {/* Flechas Circulares de Navegación del Carrusel */}
            <ScrollReveal direction="left" distance={16} duration={600} delay={140}>
              <div className="flex items-center gap-1.5">
                <button 
                  onClick={handlePrevCard}
                  disabled={!canScrollServicesLeft}
                  className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed border border-slate-200 flex items-center justify-center text-slate-700 transition-all active:scale-95 shadow-2xs"
                  aria-label="Servicio anterior"
                >
                  <ArrowLeft className="w-3 h-3" />
                </button>
                <button 
                  onClick={handleNextCard}
                  disabled={!canScrollServicesRight}
                  className="w-7 h-7 rounded-full bg-[#FF5B22] hover:bg-[#E04812] disabled:opacity-30 disabled:cursor-not-allowed text-white flex items-center justify-center transition-all shadow-sm active:scale-95 font-bold"
                  aria-label="Siguiente servicio"
                >
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </ScrollReveal>
          </div>

          {/* CARRUSEL DE 4 TARJETAS CON 2.5 VISIBLES Y SCROLL EDGE-TO-EDGE */}
          <div
            ref={servicesCarouselRef}
            className="w-full flex gap-2.5 overflow-x-auto scroll-smooth snap-x snap-mandatory py-1.5 px-4 scroll-pl-4 scroll-pr-4 no-scrollbar [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {serviceCards.map((card, idx) => {
              const isSelected = activeCardIndex === idx;
              return (
                <div
                  key={card.id}
                  className="w-[37vw] sm:w-[155px] shrink-0 snap-start"
                >
                  <div
                    onClick={() => {
                      setActiveCardIndex(idx);
                      setActiveTab(card.tab);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`group relative h-[180px] sm:h-[195px] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-end p-2.5 pb-3 border ${
                      isSelected 
                        ? 'border-amber-400 ring-2 ring-amber-400/40 shadow-lg' 
                        : 'border-slate-800/15 hover:border-amber-400/80'
                    }`}
                  >
                    {/* Imagen de fondo a sangre completa */}
                    <img
                      src={card.image}
                      alt={card.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Degradado oscuro para que el texto y el botón siempre resalten con nitidez */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent"></div>

                    {/* Badge Superior: Número del Servicio */}
                    <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-black/65 backdrop-blur-md text-amber-400 border border-amber-500/30 shadow-2xs">
                        0{idx + 1}
                      </span>
                    </div>

                    {/* Contenido inferior: Título, Subtítulo y Botón Circular (↗) */}
                    <div className="relative z-10 space-y-0.5">
                      <div className="flex items-end justify-between gap-1">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-display text-xs font-bold text-white group-hover:text-amber-300 transition-colors leading-tight drop-shadow-sm truncate">
                            {card.title}
                          </h3>
                          <p className="text-[9px] text-slate-300 line-clamp-1 mt-0.5 font-normal leading-tight">
                            {card.subtitle}
                          </p>
                        </div>

                        {/* Botón Circular con Flecha (↗) con acento dorado ámbar */}
                        <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-amber-500 to-amber-400 text-slate-950 flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xs shrink-0 font-bold">
                          <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* INDICADORES DE PAGINACIÓN */}
          <div className="flex items-center justify-between pt-2.5 px-4">
            <div className="flex items-center gap-1.5">
              {serviceCards.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => scrollToServiceCard(dotIdx)}
                  className={`h-1.5 transition-all duration-300 rounded-full ${
                    activeCardIndex === dotIdx
                      ? 'w-6 bg-gradient-to-r from-amber-500 to-amber-400'
                      : 'w-1.5 bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Ir al servicio ${dotIdx + 1}`}
                />
              ))}
            </div>

            <div className="text-[11px] font-bold text-slate-500 tracking-wider">
              <span className="text-slate-900 font-extrabold text-xs">0{activeCardIndex + 1}</span>
              <span className="text-slate-400 mx-1">/</span>
              <span>0{serviceCards.length}</span>
            </div>
          </div>

        </div>
      </section>

      {/* 3. SECCIÓN: DIVISIÓN ELEGANTE + "DONDE TU SATISFACCIÓN ES NUESTRA MÁXIMA PRIORIDAD" + 6 BENEFICIOS HORIZONTALES */}
      <section className="relative pt-4 pb-0 bg-white overflow-hidden">
        {/* DISEÑO BONITO DE DIVISIÓN ENTRE SERVICIOS Y ESTA SECCIÓN */}
        <div className="w-full px-6 flex items-center justify-center gap-3 mb-5">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-200 to-amber-300"></div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50/90 border border-amber-200/60 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-700">
              Excelencia Happy Travel
            </span>
          </div>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent via-slate-200 to-amber-300"></div>
        </div>

        {/* TÍTULO CENTRADO SIN MENSAJE */}
        <div className="text-center px-4 max-w-xl mx-auto mb-6">
          <ScrollReveal direction="up" distance={20} delay={60} duration={700}>
            <h2 className="font-display text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
              Donde Tu Satisfacción es Nuestra <br />
              Máxima <span className="text-[#FF5B22]">Prioridad</span>
            </h2>
          </ScrollReveal>
        </div>

        {/* 6 ICONOS HORIZONTALES UNO AL LADO DEL OTRO SIN SCROLL Y SIN CONTENEDOR INTERNO */}
        <div className="w-full px-2 sm:px-4 max-w-2xl mx-auto grid grid-cols-6 gap-1 sm:gap-2">
          {sixBenefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <ScrollReveal
                key={idx}
                direction="up"
                distance={12}
                delay={idx * 35 + 50}
                duration={500}
                className="w-full"
              >
                <div className="flex flex-col items-center justify-center py-2 px-0.5 rounded-xl bg-slate-50/80 border border-slate-200/70 hover:border-amber-400 hover:bg-amber-50/30 transition-all text-center min-h-[74px]">
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-amber-600 stroke-[1.9] mb-1.5" />
                  <span className="text-[9px] sm:text-[10px] font-bold text-slate-800 leading-[1.15] break-words">
                    {item.title}
                  </span>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* 4. SECCIÓN: TU PRÓXIMA AVENTURA (CARRUSEL 2.5 TARJETAS CON FLECHAS A LA DERECHA) */}
      <section className="w-full pt-[15px] pb-0 bg-white">
        {/* Cabecera: Título a la izquierda y Flechas a la derecha (Sin etiqueta, sin mensaje) */}
        <div className="flex items-center justify-between gap-3 mb-3 px-4">
          <ScrollReveal direction="right" distance={15} duration={600} delay={60}>
            <h2 className="font-display text-xl sm:text-2xl font-black text-slate-900 leading-tight">
              Tu Próxima Aventura
            </h2>
          </ScrollReveal>

          {/* Flechas de desplazamiento en el lado derecho */}
          <ScrollReveal direction="left" distance={15} duration={600} delay={100}>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => scrollDestinations('left')}
                disabled={!canScrollDestLeft}
                className="w-7 h-7 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-800 disabled:opacity-30 disabled:cursor-not-allowed hover:border-amber-400 transition-all shadow-2xs active:scale-95"
                aria-label="Destinos anteriores"
              >
                <ArrowLeft className="w-3 h-3" />
              </button>
              <button
                onClick={() => scrollDestinations('right')}
                disabled={!canScrollDestRight}
                className="w-7 h-7 rounded-full bg-[#FF5B22] hover:bg-[#E04812] text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm active:scale-95 font-bold"
                aria-label="Siguientes destinos"
              >
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </ScrollReveal>
        </div>

        {/* Carrusel Horizontal de Destinos: 2.5 tarjetas visuales y scroll completo */}
        <div
          ref={destinationsCarouselRef}
          className="w-full flex gap-2.5 overflow-x-auto scroll-smooth snap-x snap-mandatory py-1.5 px-4 scroll-pl-4 scroll-pr-4 no-scrollbar [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {popularDestinations.map((dest, idx) => (
            <div
              key={idx}
              className="w-[37vw] sm:w-[155px] shrink-0 snap-start"
            >
              <div
                onClick={() => onOpenQuote(`Destino: ${dest.name}`)}
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
                      {dest.iconicHighlight}
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

        {/* Barra de Progreso */}
        <div className="flex items-center justify-between pt-2.5 px-4">
          <div className="w-24 h-1 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
            <div 
              className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-200"
              style={{ width: `${Math.max(16, destScrollProgress)}%` }}
            />
          </div>
          <span className="text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded-full">
            8 Destinos
          </span>
        </div>
      </section>

      {/* 5. SECCIÓN: INICIA TU VIAJE EN 3 PASOS SENCILLOS (HORIZONTAL, SIN NÚMEROS, SIN ETIQUETA) */}
      <section className="w-full pt-[15px] pb-2 bg-white">
        <div className="px-4">
          <div className="border-t border-slate-100 pt-3">
            <ScrollReveal direction="up" distance={20} duration={650} delay={60}>
              <h2 className="font-display text-xl sm:text-2xl font-black text-slate-900 leading-tight text-center mb-4">
                Inicia tu Viaje en 3 Pasos Sencillos
              </h2>
            </ScrollReveal>

            {/* 3 PASOS HORIZONTALES CON SU ICONO ARRIBA Y TÍTULO DEBAJO */}
            <div className="grid grid-cols-3 gap-2 text-center">
              {/* Paso 1 */}
              <ScrollReveal direction="up" distance={20} delay={100} duration={650}>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-700 flex items-center justify-center shadow-2xs mb-2">
                    <Calendar className="w-6 h-6 stroke-[1.9]" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 leading-tight">
                    Reserva en Línea
                  </h4>
                  <p className="text-[10px] text-slate-500 leading-tight mt-1 line-clamp-2">
                    Elige origen, fecha y vehículo
                  </p>
                </div>
              </ScrollReveal>

              {/* Paso 2 */}
              <ScrollReveal direction="up" distance={20} delay={180} duration={650}>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-700 flex items-center justify-center shadow-2xs mb-2">
                    <Key className="w-6 h-6 stroke-[1.9]" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 leading-tight">
                    Recogida en Puerta
                  </h4>
                  <p className="text-[10px] text-slate-500 leading-tight mt-1 line-clamp-2">
                    Vehículo en tu ubicación
                  </p>
                </div>
              </ScrollReveal>

              {/* Paso 3 */}
              <ScrollReveal direction="up" distance={20} delay={260} duration={650}>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-700 flex items-center justify-center shadow-2xs mb-2">
                    <Compass className="w-6 h-6 stroke-[1.9]" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 leading-tight">
                    Explora y Disfruta
                  </h4>
                  <p className="text-[10px] text-slate-500 leading-tight mt-1 line-clamp-2">
                    Crea recuerdos inolvidables
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SECCIÓN: LO QUE DICEN NUESTROS CLIENTES (CARRUSEL HORIZONTAL CON 2.5 TARJETAS) */}
      <section className="w-full pt-6 pb-2 bg-white">
        <div className="px-4">
          <div className="border-t border-slate-100 pt-6 mb-3">
            <ScrollReveal direction="up" distance={20} duration={650} delay={60}>
              <h2 className="font-display text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                Lo que dicen nuestros clientes
              </h2>
            </ScrollReveal>
          </div>
        </div>

        {/* CARRUSEL DE RESEÑAS CON 2.5 TARJETAS VISIBLES */}
        <div className="w-full flex gap-2.5 overflow-x-auto scroll-smooth snap-x snap-mandatory px-4 py-1.5 scroll-pl-4 scroll-pr-4 no-scrollbar [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="w-[37vw] sm:w-[160px] shrink-0 snap-start"
            >
              <div className="h-[185px] sm:h-[195px] bg-slate-50 border border-slate-200/90 hover:border-amber-400/70 rounded-2xl p-2.5 flex flex-col justify-between shadow-2xs">
                <div>
                  <div className="flex text-amber-500 mb-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <p className="text-[10px] text-slate-600 leading-snug italic line-clamp-4">
                    "{item.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-1.5 pt-2 border-t border-slate-200/60 mt-auto">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-5 h-5 rounded-full object-cover border border-amber-300 shrink-0"
                  />
                  <span className="text-[9px] font-bold text-slate-900 truncate">
                    {item.name}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. SECCIÓN: NUESTRA FLOTA EN CARRUSEL HORIZONTAL & BUSCADOR */}
      <section className="w-full mt-6 mb-0">
        
        {/* PARTE 1: NUESTRA FLOTA (CARRUSEL HORIZONTAL) */}
        <div className="w-full bg-white py-6 border-t border-slate-100">
          <div className="px-4 text-center space-y-1 mb-4">
            <ScrollReveal direction="down" distance={15} duration={650} delay={60}>
              <h2 className="text-xl sm:text-2xl font-light tracking-[0.2em] text-slate-900 uppercase font-sans">
                NUESTRA FLOTA
              </h2>
            </ScrollReveal>
            <ScrollReveal direction="up" distance={15} duration={650} delay={140}>
              <p className="text-xs text-slate-500 font-normal">
                Elige el vehículo que mejor se adapta a tu viaje
              </p>
            </ScrollReveal>
          </div>

          {/* CARRUSEL HORIZONTAL DE VEHÍCULOS */}
          <div className="w-full flex gap-2.5 overflow-x-auto scroll-smooth snap-x snap-mandatory px-4 py-2 scroll-pl-4 scroll-pr-4 no-scrollbar [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {fleetVehicles.map((car) => (
              <div
                key={car.id}
                className="w-[37vw] sm:w-[150px] shrink-0 snap-start"
              >
                <div
                  onClick={() => onOpenQuote(`Vehículo: ${car.name}`)}
                  className="group flex flex-col items-center justify-between p-3 h-[145px] rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-amber-400/80 transition-all cursor-pointer shadow-2xs"
                >
                  <div className="h-20 flex items-center justify-center w-full">
                    <img
                      src={car.image}
                      alt={car.name}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-xs"
                    />
                  </div>
                  <span className="text-xs font-semibold text-slate-800 group-hover:text-amber-600 transition-colors truncate">
                    {car.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PARTE 2: BUSCADOR NOCTURNO (FONDO URBANO, EXTENDIDO POR DEBAJO DE LA BARRA DE NAVEGACIÓN) */}
        <div 
          className="w-full relative bg-cover bg-center pt-14 pb-20 sm:pb-24 px-4 text-center text-white overflow-hidden"
          style={{ backgroundImage: `url('/fleet/clean-night-bg.png')` }}
        >
          {/* Capa de contraste y gradiente para legibilidad óptima */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[0.5px]"></div>

          <div className="relative z-10 max-w-2xl mx-auto space-y-3">
            <ScrollReveal direction="up" distance={25} duration={750} delay={60} blur={true}>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-light text-white tracking-wide">
                Encuentra tu Happy Travel más cercano
              </h3>
            </ScrollReveal>

            <ScrollReveal direction="up" distance={20} duration={750} delay={140}>
              <p className="text-xs text-slate-200 font-light max-w-xl mx-auto leading-relaxed">
                Disfruta hoy de un viaje cómodo, profesional, seguro y confiable con Happy Travel
              </p>
            </ScrollReveal>

            {/* Formulario con Input y Botón Submit */}
            <form onSubmit={handleNearestSubmit} className="pt-3 space-y-3 max-w-md mx-auto">
              <ScrollReveal direction="up" distance={20} duration={700} delay={220}>
                <input
                  type="text"
                  value={nearestLocation}
                  onChange={(e) => setNearestLocation(e.target.value)}
                  placeholder="Ingresa tu ciudad, dirección o punto de partida"
                  className="w-full px-4 py-2.5 rounded-md bg-white text-slate-900 placeholder-slate-400 text-xs sm:text-sm font-normal text-center shadow-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </ScrollReveal>

              <ScrollReveal direction="up" distance={20} duration={700} delay={300}>
                <div>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-sm border border-white/80 hover:border-amber-400 hover:bg-black/80 bg-black/50 text-white font-normal text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"
                  >
                    Buscar y Cotizar
                  </button>
                </div>
              </ScrollReveal>
            </form>
          </div>

          {/* Marca de esquina inferior derecha por encima de la barra */}
          <ScrollReveal direction="left" distance={20} duration={700} delay={380} className="absolute bottom-16 right-3 z-10">
            <div className="bg-black/85 border border-white/20 px-3 py-1 rounded-lg flex items-center gap-1.5 shadow-lg backdrop-blur-sm">
              <img src="/logo-transparent.png" alt="Happy Travel" className="h-4 w-auto object-contain" />
              <span className="text-[9px] font-bold text-white tracking-wider">HAPPY TRAVEL</span>
            </div>
          </ScrollReveal>
        </div>

      </section>

    </div>
  );
};
