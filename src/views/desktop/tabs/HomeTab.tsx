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
  Headphones
} from 'lucide-react';

interface HomeTabProps {
  setActiveTab: (tab: TabType) => void;
  onOpenQuote: (serviceType?: string) => void;
}

export const HomeTab: React.FC<HomeTabProps> = ({ setActiveTab, onOpenQuote }) => {
  const [activeCardIndex, setActiveCardIndex] = useState(0);

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
      const scrollAmount = container.clientWidth * 0.75;
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

  const handlePrevCard = () => {
    setActiveCardIndex((prev) => (prev - 1 + serviceCards.length) % serviceCards.length);
  };

  const handleNextCard = () => {
    setActiveCardIndex((prev) => (prev + 1) % serviceCards.length);
  };

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
      
      {/* 1. SECCIÓN HERO: DISEÑO PANORÁMICO AL ATARDECER CON VEHÍCULO SUV AL LADO DERECHO */}
      <section className="relative min-h-[580px] sm:min-h-[640px] lg:min-h-[720px] flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#070b14] via-[#191024] to-[#c2410c]">
        
        {/* FOTOGRAFÍA PANORÁMICA DE FONDO: VEHÍCULO SUV EN EL LADO DERECHO */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=2400&q=90" 
            alt="Vehículo SUV en carretera al atardecer"
            className="w-full h-full object-cover object-[78%_center] sm:object-[82%_center]"
          />
          {/* Capas de contraste y degradado para garantizar legibilidad del texto a la izquierda y visibilidad del SUV a la derecha */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 md:via-black/30 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#c2410c]/45 via-transparent to-black/35"></div>
        </div>

        {/* CONTENIDO PRINCIPAL DEL HERO */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 lg:pt-32 pb-14 sm:pb-20 lg:pb-24 relative z-10 w-full flex-1 flex flex-col justify-center">
          <div className="max-w-2xl space-y-6">
            
            {/* Titular Principal en Blanco, Grueso y de Gran Escala */}
            <ScrollReveal direction="up" distance={36} duration={850} delay={60} blur={true}>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white tracking-tight leading-[1.08] drop-shadow-md">
                Transporte Que Impulsa <br />
                Tus Viajes al <br />
                Siguiente Nivel.
              </h1>
            </ScrollReveal>

            {/* Subtítulo descriptivo en español */}
            <ScrollReveal direction="up" distance={24} duration={800} delay={180}>
              <p className="text-sm sm:text-base lg:text-lg text-white/90 leading-relaxed font-normal max-w-xl drop-shadow-sm">
                Desde la recogida en tu puerta hasta tu destino final, gestionamos cada trayecto con máxima puntualidad, confort y seguridad para ti, tu familia, tus encomiendas y tus mascotas.
              </p>
            </ScrollReveal>

            {/* Fila de 2 Píldoras de Acción (Avatares de Prueba Social y Botón Cotizar ↗) */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              
              {/* Píldora de Prueba Social con Avatares */}
              <ScrollReveal direction="right" distance={22} duration={700} delay={280}>
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white text-xs font-semibold shadow-sm">
                  <div className="flex -space-x-2">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Cliente" className="w-6 h-6 rounded-full border-2 border-slate-900 object-cover" />
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Cliente" className="w-6 h-6 rounded-full border-2 border-slate-900 object-cover" />
                    <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80" alt="Cliente" className="w-6 h-6 rounded-full border-2 border-slate-900 object-cover" />
                  </div>
                  <span className="text-white/95 font-bold">+5.000 viajes realizados</span>
                </div>
              </ScrollReveal>

              {/* Botón Píldora Cotizar con Flecha en Círculo Naranja */}
              <ScrollReveal direction="up" distance={22} duration={700} delay={360}>
                <button
                  onClick={() => onOpenQuote()}
                  className="inline-flex items-center gap-3 pl-5 pr-2 py-1.5 rounded-full bg-white text-slate-950 hover:bg-slate-100 font-bold text-xs uppercase tracking-wider transition-all shadow-xl active:scale-95 group"
                >
                  <span>Cotizar Viaje</span>
                  <div className="w-7 h-7 rounded-full bg-[#FF5B22] group-hover:bg-[#E04812] flex items-center justify-center text-white transition-colors shadow-sm">
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </button>
              </ScrollReveal>

            </div>

          </div>
        </div>

        {/* BARRA INFERIOR DEL HERO: "| SERVICIOS" Y CONTROLES DEL CARRUSEL (←) (→) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 sm:pb-14 lg:pb-16 relative z-10 w-full flex items-center justify-between">
          {/* Indicador de Sección: Barra Naranja y Texto "Servicios" */}
          <ScrollReveal direction="right" distance={20} duration={650} delay={420}>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#FF5B22] rounded-full inline-block"></span>
              <span className="font-display text-xl sm:text-2xl font-bold text-white tracking-wide drop-shadow-sm">
                Servicios
              </span>
            </div>
          </ScrollReveal>

          {/* Flechas Circulares de Navegación del Carrusel */}
          <ScrollReveal direction="left" distance={20} duration={650} delay={480}>
            <div className="flex items-center gap-2">
              <button 
                onClick={handlePrevCard}
                className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 flex items-center justify-center text-white transition-all active:scale-95 shadow-sm"
                aria-label="Servicio anterior"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={handleNextCard}
                className="w-10 h-10 rounded-full bg-[#FF5B22] hover:bg-[#E04812] text-white flex items-center justify-center transition-all shadow-md active:scale-95"
                aria-label="Siguiente servicio"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </ScrollReveal>
        </div>

        {/* DIVISOR DE ARCO CURVADO HACIA ABAJO (EL ATARDECER DESCIENDE EN EL CENTRO) */}
        <div className="absolute -bottom-1 left-0 right-0 overflow-hidden leading-none z-10 pointer-events-none">
          <svg 
            viewBox="0 0 1440 100" 
            preserveAspectRatio="none" 
            className="w-full h-14 sm:h-20 lg:h-[100px] text-white fill-current block"
          >
            <path d="M 0,0 Q 720,180 1440,0 L 1440,100 L 0,100 Z" />
          </svg>
        </div>

      </section>

      {/* DEFINICIÓN DEL CLIP-PATH LENS PARA LAS 4 TARJETAS CURVADAS (MISMO GRADO ARRIBA Y ABAJO) */}
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <clipPath id="lens-cards-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0,0 Q 0.5,0.20 1,0 L 1,1 Q 0.5,0.80 0,1 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* 2. SECCIÓN: 4 TARJETAS CURVADAS DE SERVICIOS & ENCABEZADO DE SATISFACCIÓN (SEPARACIÓN EXACTA DE 10PX) */}
      <section className="relative pb-10 z-20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* CUADRÍCULA DE 4 TARJETAS ACOPLADAS A LA CURVA DE LA PRIMERA SECCIÓN CON GAP EXACTO DE 10PX */}
          <div className="lens-curved-cards -mt-[18px] sm:-mt-[28px] lg:-mt-[44px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[10px] items-stretch">
            {serviceCards.map((card, idx) => {
              const isSelected = activeCardIndex === idx;
              return (
                <ScrollReveal
                  key={card.id}
                  direction="up"
                  distance={32}
                  delay={idx * 110}
                  duration={750}
                  className="h-full"
                >
                  <div
                    onClick={() => {
                      setActiveCardIndex(idx);
                      setActiveTab(card.tab);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`group relative h-80 sm:h-96 lg:h-[450px] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-end p-6 pb-8 sm:pb-10 lg:pb-14 border ${
                      idx === 0 
                        ? 'rounded-l-sm rounded-r-2xl sm:rounded-r-3xl' 
                        : idx === serviceCards.length - 1 
                          ? 'rounded-r-sm rounded-l-2xl sm:rounded-l-3xl' 
                          : 'rounded-2xl sm:rounded-3xl'
                    } ${
                      isSelected 
                        ? 'border-[#FF5B22] ring-2 ring-[#FF5B22]/30 shadow-xl' 
                        : 'border-slate-200/80 hover:border-amber-400'
                    }`}
                  >
                    {/* Imagen de fondo a sangre completa */}
                    <img
                      src={card.image}
                      alt={card.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Degradado oscuro para que el texto y el botón siempre resalten */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent"></div>

                    {/* Contenido inferior: Título, Subtítulo y Botón Circular (↗) */}
                    <div className="relative z-10 space-y-2">
                      <div className="flex items-end justify-between gap-3">
                        <div className="flex-1">
                          <h3 className="font-display text-lg sm:text-xl font-bold text-white group-hover:text-amber-300 transition-colors leading-tight">
                            {card.title}
                          </h3>
                          <p className="text-xs text-slate-300 line-clamp-2 mt-1 font-normal">
                            {card.subtitle}
                          </p>
                        </div>

                        {/* Botón Circular con Flecha (↗) como en el Mockup */}
                        <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center group-hover:bg-[#FF5B22] group-hover:border-[#FF5B22] group-hover:text-white transition-all shadow-sm shrink-0">
                          <ArrowUpRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          {/* ENCABEZADO "DONDE TU SATISFACCIÓN ES NUESTRA MÁXIMA PRIORIDAD" */}
          <div className="pt-16 sm:pt-20 lg:pt-24 pb-4 text-center max-w-4xl mx-auto space-y-3">
            <ScrollReveal direction="up" distance={30} delay={60} duration={800} blur={true}>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-slate-900 tracking-tight leading-tight">
                Donde Tu Satisfacción es Nuestra <br />
                Máxima <span className="text-[#FF5B22]">Prioridad</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal direction="up" distance={20} delay={180} duration={750}>
              <p className="text-xs sm:text-sm lg:text-base text-slate-600 max-w-2xl mx-auto font-normal">
                Puntualidad garantizada, vehículos higienizados, conductores profesionales y acompañamiento continuo en cada kilómetro de carretera.
              </p>
            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* 3. SECCIÓN: POR QUÉ ELEGIR HAPPY TRAVEL - 3 COLUMNAS SIMÉTRICAS DE IGUAL TAMAÑO */}
      <section className="w-full bg-[#0B1E36] -mt-2 lg:mt-4 mb-8 lg:mb-14 overflow-hidden shadow-sm">
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 items-stretch">
          
          {/* COLUMNA 1 (1/3): Texto, Botón y Métricas con Stagger Individual */}
          <div className="p-6 sm:p-8 lg:p-7 xl:p-10 flex flex-col justify-between space-y-6 bg-[#0B1E36] h-full">
            
            <div className="space-y-3.5">
              {/* Subtítulo en bronce/ámbar con espaciado amplio */}
              <ScrollReveal direction="down" distance={15} duration={600} delay={60}>
                <div className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#D49856]">
                  POR QUÉ ELEGIR HAPPY TRAVEL
                </div>
              </ScrollReveal>

              {/* Titular Principal en blanco negrita */}
              <ScrollReveal direction="up" distance={25} duration={750} delay={120} blur={true}>
                <h2 className="font-display text-xl sm:text-2xl xl:text-3xl font-black text-white leading-[1.18] tracking-tight">
                  Tu Aliado de Transporte <br className="hidden sm:inline" />
                  en el que Puedes Confiar
                </h2>
              </ScrollReveal>

              {/* Párrafo descriptivo en gris suave */}
              <ScrollReveal direction="up" distance={20} duration={750} delay={200}>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal pt-1">
                  Combinamos experiencia, confort y atención personalizada para garantizar viajes privados seguros, traslados VIP y encomiendas express puerta a puerta sin preocupaciones.
                </p>
              </ScrollReveal>

              {/* Botón Naranja Píldora */}
              <ScrollReveal direction="up" distance={15} duration={700} delay={280}>
                <div className="pt-2">
                  <button
                    onClick={() => onOpenQuote()}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#FF5B22] hover:bg-[#E04812] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-95 group"
                  >
                    <span>Nuestra Historia</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </ScrollReveal>
            </div>

            {/* Fila Inferior de Estadísticas con Divisores Verticales y Stagger Individual */}
            <div className="pt-5 border-t border-slate-700/50 grid grid-cols-3 gap-1 sm:gap-2">
              <ScrollReveal direction="up" distance={20} duration={650} delay={340}>
                <div className="pr-1 sm:pr-2">
                  <div className="text-lg sm:text-xl xl:text-2xl font-black text-white tracking-tight leading-none">
                    10+
                  </div>
                  <div className="text-[10px] xl:text-[11px] text-slate-400 font-medium leading-tight mt-1">
                    Años de Exp.
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" distance={20} duration={650} delay={420}>
                <div className="px-1 sm:px-2 border-l border-slate-700/60">
                  <div className="text-lg sm:text-xl xl:text-2xl font-black text-white tracking-tight leading-none">
                    10K+
                  </div>
                  <div className="text-[10px] xl:text-[11px] text-slate-400 font-medium leading-tight mt-1">
                    Viajes Hechos
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" distance={20} duration={650} delay={500}>
                <div className="pl-1 sm:pl-2 border-l border-slate-700/60">
                  <div className="text-lg sm:text-xl xl:text-2xl font-black text-white tracking-tight leading-none">
                    100+
                  </div>
                  <div className="text-[10px] xl:text-[11px] text-slate-400 font-medium leading-tight mt-1">
                    Rutas Activas
                  </div>
                </div>
              </ScrollReveal>
            </div>

          </div>

          {/* COLUMNA 2 (1/3): Fotografía con Texto Manuscrito Flotante y Trazo Naranja */}
          <div className="relative min-h-[320px] lg:min-h-full overflow-hidden bg-slate-800 h-full">
            <ScrollReveal direction="zoom-in" scale={0.93} duration={850} delay={100} className="w-full h-full">
              <img
                src="https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=1000&q=85"
                alt="Operaciones y conductores Happy Travel"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E36]/40 via-transparent to-transparent lg:hidden"></div>
            </ScrollReveal>

            {/* Texto Manuscrito Angulado con Pincelada Naranja */}
            <ScrollReveal direction="down" distance={25} duration={800} delay={300} className="absolute top-6 right-6 sm:top-8 sm:right-8 text-right select-none pointer-events-none z-10">
              <div>
                <div className="font-handwriting text-2xl sm:text-3xl lg:text-3xl xl:text-4xl text-slate-800 font-bold leading-none rotate-[-4deg] drop-shadow-sm">
                  Personas<br />
                  Rutas<br />
                  Confianza
                </div>
                <svg className="w-24 sm:w-28 h-5 ml-auto mt-1 text-[#FF5B22] rotate-[-4deg]" viewBox="0 0 120 20" fill="none">
                  <path d="M 5,6 Q 60,18 115,4" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  <path d="M 25,14 Q 70,22 105,12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
                </svg>
              </div>
            </ScrollReveal>
          </div>

          {/* COLUMNA 3 (1/3): 6 Filas de Beneficios con Cascada Individual */}
          <div className="bg-[#F0F5FA] p-6 sm:p-8 lg:p-7 xl:p-10 flex flex-col justify-center space-y-6 lg:space-y-[26px] border-t lg:border-t-0 lg:border-l border-slate-200/80 h-full">
            
            {/* Beneficio 1: Monitoreo en Tiempo Real */}
            <ScrollReveal direction="left" distance={22} duration={650} delay={80}>
              <div className="flex items-center gap-3.5 sm:gap-4">
                <div className="w-11 h-11 xl:w-12 xl:h-12 rounded-full bg-[#DFECF8] text-[#0A2540] flex items-center justify-center shrink-0 shadow-xs">
                  <Clock className="w-5 h-5 xl:w-6 xl:h-6 stroke-[1.8]" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base xl:text-lg font-bold text-[#0B1E36] leading-snug">
                    Monitoreo en Tiempo Real
                  </h4>
                  <p className="text-xs sm:text-sm xl:text-[15px] text-slate-600 font-normal leading-relaxed mt-0.5">
                    Rastreo GPS continuo y reportes en cada paso de tu trayecto.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Beneficio 2: Seguridad Garantizada */}
            <ScrollReveal direction="left" distance={22} duration={650} delay={160}>
              <div className="flex items-center gap-3.5 sm:gap-4">
                <div className="w-11 h-11 xl:w-12 xl:h-12 rounded-full bg-[#DFECF8] text-[#0A2540] flex items-center justify-center shrink-0 shadow-xs">
                  <ShieldCheck className="w-5 h-5 xl:w-6 xl:h-6 stroke-[1.8]" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base xl:text-lg font-bold text-[#0B1E36] leading-snug">
                    Seguridad Garantizada
                  </h4>
                  <p className="text-xs sm:text-sm xl:text-[15px] text-slate-600 font-normal leading-relaxed mt-0.5">
                    Tus encomiendas y seres queridos siempre en las mejores manos.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Beneficio 3: Equipo Calificado */}
            <ScrollReveal direction="left" distance={22} duration={650} delay={240}>
              <div className="flex items-center gap-3.5 sm:gap-4">
                <div className="w-11 h-11 xl:w-12 xl:h-12 rounded-full bg-[#DFECF8] text-[#0A2540] flex items-center justify-center shrink-0 shadow-xs">
                  <Users className="w-5 h-5 xl:w-6 xl:h-6 stroke-[1.8]" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base xl:text-lg font-bold text-[#0B1E36] leading-snug">
                    Equipo Calificado
                  </h4>
                  <p className="text-xs sm:text-sm xl:text-[15px] text-slate-600 font-normal leading-relaxed mt-0.5">
                    Conductores certificados y profesionales con amplia trayectoria.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Beneficio 4: Flota Moderna y Sanitizada */}
            <ScrollReveal direction="left" distance={22} duration={650} delay={320}>
              <div className="flex items-center gap-3.5 sm:gap-4">
                <div className="w-11 h-11 xl:w-12 xl:h-12 rounded-full bg-[#DFECF8] text-[#0A2540] flex items-center justify-center shrink-0 shadow-xs">
                  <Leaf className="w-5 h-5 xl:w-6 xl:h-6 stroke-[1.8]" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base xl:text-lg font-bold text-[#0B1E36] leading-snug">
                    Flota Moderna y Sanitizada
                  </h4>
                  <p className="text-xs sm:text-sm xl:text-[15px] text-slate-600 font-normal leading-relaxed mt-0.5">
                    Vehículos confortables, climatizados y listos para viajar.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Beneficio 5: Servicio Puerta a Puerta */}
            <ScrollReveal direction="left" distance={22} duration={650} delay={400}>
              <div className="flex items-center gap-3.5 sm:gap-4">
                <div className="w-11 h-11 xl:w-12 xl:h-12 rounded-full bg-[#DFECF8] text-[#0A2540] flex items-center justify-center shrink-0 shadow-xs">
                  <MapPin className="w-5 h-5 xl:w-6 xl:h-6 stroke-[1.8]" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base xl:text-lg font-bold text-[#0B1E36] leading-snug">
                    Servicio Puerta a Puerta
                  </h4>
                  <p className="text-xs sm:text-sm xl:text-[15px] text-slate-600 font-normal leading-relaxed mt-0.5">
                    Recogida y llegada en tu ubicación exacta sin transbordos.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Beneficio 6: Atención Personalizada 24/7 */}
            <ScrollReveal direction="left" distance={22} duration={650} delay={480}>
              <div className="flex items-center gap-3.5 sm:gap-4">
                <div className="w-11 h-11 xl:w-12 xl:h-12 rounded-full bg-[#DFECF8] text-[#0A2540] flex items-center justify-center shrink-0 shadow-xs">
                  <Headphones className="w-5 h-5 xl:w-6 xl:h-6 stroke-[1.8]" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base xl:text-lg font-bold text-[#0B1E36] leading-snug">
                    Atención Personalizada 24/7
                  </h4>
                  <p className="text-xs sm:text-sm xl:text-[15px] text-slate-600 font-normal leading-relaxed mt-0.5">
                    Acompañamiento continuo y soporte directo en todo momento.
                  </p>
                </div>
              </div>
            </ScrollReveal>

          </div>

        </div>
      </section>

      {/* 4. SECCIÓN: CARRUSEL DE DESTINOS POPULARES EN ECUADOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div className="space-y-1.5">
            <ScrollReveal direction="down" distance={15} duration={600} delay={50}>
              <div className="text-xs font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                DESTINOS POPULARES EN ECUADOR
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" distance={25} duration={750} delay={110} blur={true}>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight">
                Conduce hacia tu <br className="hidden sm:inline" />
                Próxima Aventura
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="up" distance={20} duration={750} delay={180}>
              <p className="text-xs sm:text-sm text-slate-500 max-w-xl font-normal leading-relaxed pt-0.5">
                Descubre las maravillas patrimoniales, costeras y andinas más fascinantes del Ecuador con la exclusividad, confort y puntualidad de nuestro servicio de transporte privado puerta a puerta.
              </p>
            </ScrollReveal>
          </div>

          <div className="flex items-center gap-3 shrink-0 self-start sm:self-auto">
            <ScrollReveal direction="left" distance={15} duration={650} delay={220}>
              <button
                onClick={() => setActiveTab('servicios')}
                className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 hover:border-amber-400 bg-white hover:bg-amber-50/50 text-xs font-bold text-slate-900 hover:text-amber-800 transition-all shadow-xs mr-1"
              >
                <span>Ver Todos</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-600" />
              </button>
            </ScrollReveal>

            {/* Controles del Carrusel (Flechas Anterior / Siguiente) */}
            <ScrollReveal direction="left" distance={15} duration={650} delay={280}>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => scrollDestinations('left')}
                  disabled={!canScrollDestLeft}
                  className="w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-800 disabled:opacity-30 disabled:cursor-not-allowed hover:border-amber-400 transition-all shadow-xs active:scale-95"
                  aria-label="Destinos anteriores"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollDestinations('right')}
                  disabled={!canScrollDestRight}
                  className="w-10 h-10 rounded-full bg-black hover:bg-slate-900 border border-black text-amber-400 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm active:scale-95"
                  aria-label="Siguientes destinos"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Contenedor Carrusel Horizontal (Cada tarjeta con revelación escalonada individual) */}
        <div
          ref={destinationsCarouselRef}
          className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory py-3 px-1 no-scrollbar [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {popularDestinations.map((dest, idx) => (
            <ScrollReveal
              key={idx}
              direction="up"
              distance={28}
              duration={700}
              delay={Math.min(idx * 75, 380)}
              className="w-[84%] sm:w-[calc((100%-1.25rem)/1.6)] md:w-[calc((100%-2*1.25rem)/2.5)] lg:w-[calc((100%-3*1.25rem)/3.5)] xl:w-[calc((100%-4*1.25rem)/4.5)] shrink-0 snap-start"
            >
              <div
                onClick={() => onOpenQuote(`Destino: ${dest.name}`)}
                className="w-full group bg-white border border-slate-200/90 hover:border-amber-400/90 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col h-full"
              >
                {/* Imagen con Badges e Hito Icónico */}
                <div className="h-48 sm:h-52 overflow-hidden relative">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/5" />

                  {/* Badge Superior Derecho: Provincia */}
                  <div className="absolute top-3.5 right-3.5">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-white/95 backdrop-blur-md text-slate-800 border border-white/60 shadow-sm">
                      <MapPin className="w-3 h-3 text-amber-600" />
                      {dest.province}
                    </span>
                  </div>

                  {/* Nombre de la Ciudad e Hito Icónico */}
                  <div className="absolute bottom-3.5 left-4 right-4">
                    <h3 className="font-display text-xl sm:text-2xl font-black text-white tracking-tight drop-shadow-md">
                      {dest.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-amber-300 text-xs font-semibold mt-0.5 drop-shadow-sm truncate">
                      <Compass className="w-3.5 h-3.5 shrink-0 text-amber-400" />
                      <span className="truncate">{dest.iconicHighlight}</span>
                    </div>
                  </div>
                </div>

                {/* Contenido con Descripción Atractiva e Invitación para Turistas */}
                <div className="p-5 flex flex-col flex-1 justify-between gap-4 bg-white">
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal line-clamp-3">
                    {dest.description}
                  </p>

                  {/* Botón de Acción / CTA */}
                  <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between mt-auto">
                    <span className="text-xs font-bold text-slate-900 group-hover:text-amber-700 transition-colors flex items-center gap-1.5">
                      Cotizar Traslado
                    </span>
                    <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-800 group-hover:bg-black group-hover:text-amber-400 flex items-center justify-center transition-all duration-300 group-hover:translate-x-1 shadow-xs border border-amber-200/60 group-hover:border-black">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Barra de Progreso y Sugerencia de Desplazamiento */}
        <div className="flex items-center justify-between pt-3 px-1">
          <ScrollReveal direction="right" distance={15} duration={650} delay={80}>
            <div className="flex items-center gap-2.5">
              <div className="w-28 sm:w-36 h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-200"
                  style={{ width: `${Math.max(16, destScrollProgress)}%` }}
                />
              </div>
              <span className="text-[11px] font-semibold text-slate-500 hidden sm:inline">
                Desliza o usa las flechas para explorar
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="left" distance={15} duration={650} delay={140}>
            <span className="text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200/60 px-3 py-1 rounded-full">
              8 Destinos Icónicos
            </span>
          </ScrollReveal>
        </div>
      </section>

      {/* 5. SECCIÓN: CÓMO FUNCIONA (CON NÚMEROS DORADOS/NEGROS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-t border-slate-200 pt-10">
          
          {/* Título Izquierdo: CÓMO FUNCIONA */}
          <div className="lg:col-span-4 space-y-1">
            <ScrollReveal direction="down" distance={15} duration={600} delay={50}>
              <div className="text-xs font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                CÓMO FUNCIONA
              </div>
            </ScrollReveal>
            <ScrollReveal direction="up" distance={25} duration={750} delay={120} blur={true}>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                Inicia tu Viaje <br />
                en 3 Pasos Sencillos
              </h2>
            </ScrollReveal>
          </div>

          {/* Cadena de 3 Pasos a la Derecha con Flechas */}
          <div className="lg:col-span-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Paso 1 */}
            <ScrollReveal direction="up" distance={25} delay={140} duration={700} className="flex-1 w-full">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-black border border-amber-500/50 text-amber-400 font-bold flex items-center justify-center text-xs shrink-0 shadow-sm">
                  1
                </div>
                <div className="w-9 h-9 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-center justify-center text-amber-800 shrink-0">
                  <Calendar className="w-4 h-4 text-slate-800" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Reserva en Línea</h4>
                  <p className="text-[10px] text-slate-500 leading-tight">Elige tu origen, fechas y vehículo.</p>
                </div>
              </div>
            </ScrollReveal>

            {/* Flecha Conectora 1 */}
            <ScrollReveal direction="right" distance={15} delay={230} duration={600} className="hidden sm:block text-slate-400">
              <ArrowRight className="w-4 h-4" />
            </ScrollReveal>

            {/* Paso 2 */}
            <ScrollReveal direction="up" distance={25} delay={310} duration={700} className="flex-1 w-full">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-black border border-amber-500/50 text-amber-400 font-bold flex items-center justify-center text-xs shrink-0 shadow-sm">
                  2
                </div>
                <div className="w-9 h-9 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-center justify-center text-amber-800 shrink-0">
                  <Key className="w-4 h-4 text-slate-800" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Recogida en tu Puerta</h4>
                  <p className="text-[10px] text-slate-500 leading-tight">Tu vehículo asignado listo para la ruta.</p>
                </div>
              </div>
            </ScrollReveal>

            {/* Flecha Conectora 2 */}
            <ScrollReveal direction="right" distance={15} delay={390} duration={600} className="hidden sm:block text-slate-400">
              <ArrowRight className="w-4 h-4" />
            </ScrollReveal>

            {/* Paso 3 */}
            <ScrollReveal direction="up" distance={25} delay={470} duration={700} className="flex-1 w-full">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-black border border-amber-500/50 text-amber-400 font-bold flex items-center justify-center text-xs shrink-0 shadow-sm">
                  3
                </div>
                <div className="w-9 h-9 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-center justify-center text-amber-800 shrink-0">
                  <Compass className="w-4 h-4 text-slate-800" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Explora y Disfruta</h4>
                  <p className="text-[10px] text-slate-500 leading-tight">Crea recuerdos inolvidables.</p>
                </div>
              </div>
            </ScrollReveal>

          </div>

        </div>
      </section>

      {/* 6. SECCIÓN: LO QUE DICEN NUESTROS CLIENTES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-t border-slate-200 pt-10">
          
          {/* Título Izquierdo: LO QUE DICEN NUESTROS CLIENTES */}
          <div className="lg:col-span-3 space-y-1">
            <ScrollReveal direction="down" distance={15} duration={600} delay={50}>
              <div className="text-xs font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                LO QUE DICEN NUESTROS CLIENTES
              </div>
            </ScrollReveal>
            <ScrollReveal direction="up" distance={25} duration={750} delay={120} blur={true}>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                Personas Reales. <br />
                Viajes Inolvidables.
              </h2>
            </ScrollReveal>
          </div>

          {/* 3 Tarjetas de Reseñas Horizontales */}
          <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-4">
            {testimonials.map((item, idx) => (
              <ScrollReveal key={item.id} direction="up" distance={28} delay={idx * 130 + 80} duration={700} className="h-full">
                <div className="bg-white border border-slate-200 hover:border-amber-400/50 rounded-2xl p-5 shadow-sm hover:shadow-gold-sm transition-all flex flex-col justify-between h-full">
                  <p className="text-xs text-slate-600 leading-relaxed italic mb-5">
                    "{item.quote}"
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={item.avatar}
                        alt={item.name}
                        className="w-8 h-8 rounded-full object-cover border border-amber-300"
                      />
                      <span className="text-xs font-bold text-slate-900">{item.name}</span>
                    </div>

                    <div className="flex text-amber-500">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>

      {/* 7. SECCIÓN: NUESTRA FLOTA & ENCUENTRA TU VIAJE (ANCHO COMPLETO / FULL-WIDTH) */}
      <section className="w-full mt-16 sm:mt-24 mb-0">
        
        {/* PARTE 1: NUESTRA FLOTA (FONDO BLANCO, ANCHO COMPLETO) */}
        <div className="w-full bg-white py-14 sm:py-20 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2">
            <ScrollReveal direction="down" distance={15} duration={650} delay={60} blur={true}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-[0.25em] text-slate-900 uppercase font-sans">
                NUESTRA FLOTA
              </h2>
            </ScrollReveal>
            <ScrollReveal direction="up" distance={15} duration={650} delay={140}>
              <p className="text-xs sm:text-sm text-slate-500 font-normal max-w-xl mx-auto">
                Elige el vehículo que mejor se adapta a tu estilo, grupo y presupuesto
              </p>
            </ScrollReveal>

            {/* Fila de los 5 Vehículos */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 lg:gap-10 max-w-6xl mx-auto mt-10 sm:mt-14 items-end">
              {fleetVehicles.map((car, idx) => (
                <ScrollReveal key={car.id} direction="up" distance={25} delay={idx * 80 + 80} duration={650}>
                  <div
                    onClick={() => onOpenQuote(`Vehículo: ${car.name}`)}
                    className="group flex flex-col items-center cursor-pointer transition-all duration-300"
                  >
                    <div className="h-28 sm:h-32 md:h-36 flex items-end justify-center w-full">
                      <img
                        src={car.image}
                        alt={car.name}
                        className="max-h-full max-w-[130px] sm:max-w-[150px] md:max-w-full object-contain group-hover:-translate-y-2.5 group-hover:scale-105 transition-all duration-300 drop-shadow-xs"
                      />
                    </div>
                    <span className="mt-4 text-xs sm:text-sm font-medium text-slate-800 group-hover:text-amber-600 transition-colors tracking-wide">
                      {car.name}
                    </span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>

        {/* PARTE 2: BUSCADOR NOCTURNO (FONDO URBANO, ANCHO COMPLETO, PEGA DIRECTO AL FOOTER) */}
        <div 
          className="w-full relative bg-cover bg-center py-20 sm:py-28 px-4 text-center text-white overflow-hidden"
          style={{ backgroundImage: `url('/fleet/clean-night-bg.png')` }}
        >
          {/* Capa de contraste y gradiente para legibilidad óptima */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[0.5px]"></div>

          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <ScrollReveal direction="up" distance={25} duration={750} delay={60} blur={true}>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-light text-white tracking-wide">
                Encuentra tu Happy Travel más cercano
              </h3>
            </ScrollReveal>

            <ScrollReveal direction="up" distance={20} duration={750} delay={140}>
              <p className="text-xs sm:text-sm text-slate-200 font-light max-w-xl mx-auto leading-relaxed">
                Disfruta hoy de un viaje cómodo, profesional, seguro y confiable con Happy Travel
              </p>
            </ScrollReveal>

            {/* Formulario con Input y Botón Submit */}
            <form onSubmit={handleNearestSubmit} className="pt-4 space-y-4 max-w-md mx-auto">
              <ScrollReveal direction="up" distance={20} duration={700} delay={220}>
                <input
                  type="text"
                  value={nearestLocation}
                  onChange={(e) => setNearestLocation(e.target.value)}
                  placeholder="Ingresa tu ciudad, dirección o punto de partida"
                  className="w-full px-5 py-3 rounded-md bg-white text-slate-900 placeholder-slate-400 text-xs sm:text-sm font-normal text-center shadow-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </ScrollReveal>

              <ScrollReveal direction="up" distance={20} duration={700} delay={300}>
                <div>
                  <button
                    type="submit"
                    className="px-8 py-2 rounded-sm border border-white/80 hover:border-amber-400 hover:bg-black/80 bg-black/50 text-white font-normal text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md active:scale-95"
                  >
                    Buscar y Cotizar
                  </button>
                </div>
              </ScrollReveal>
            </form>
          </div>

          {/* Marca de esquina inferior derecha */}
          <ScrollReveal direction="left" distance={20} duration={700} delay={380} className="absolute bottom-4 right-4 z-10">
            <div className="bg-black/85 border border-white/20 px-3.5 py-1.5 rounded-lg flex items-center gap-2 shadow-lg backdrop-blur-sm">
              <img src="/logo-transparent.png" alt="Happy Travel" className="h-5 w-auto object-contain" />
              <span className="text-[10px] font-bold text-white tracking-wider">HAPPY TRAVEL</span>
            </div>
          </ScrollReveal>
        </div>

      </section>

    </div>
  );
};
