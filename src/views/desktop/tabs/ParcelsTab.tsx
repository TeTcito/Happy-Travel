import React, { useRef } from 'react';
import { COMPANY_INFO } from '../../../data/mockData';
import { ScrollReveal } from '../../../components/ScrollReveal';
import { 
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  ShieldCheck,
  Clock,
  Headphones,
  Navigation
} from 'lucide-react';

interface ParcelsTabProps {
  onOpenQuote: (serviceType?: string) => void;
}

export const ParcelsTab: React.FC<ParcelsTabProps> = ({ onOpenQuote }) => {
  // Ref para el carrusel de servicios de encomiendas
  const servicesCarouselRef = useRef<HTMLDivElement>(null);

  const scrollServices = (direction: 'left' | 'right') => {
    if (servicesCarouselRef.current) {
      const container = servicesCarouselRef.current;
      const scrollAmount = container.clientWidth * 0.75;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const servicesData = [
    {
      id: 'encomienda-mismo-viaje',
      title: 'Encomiendas en tu Mismo Viaje',
      category: 'Servicio Adicional al Pasajero',
      description: 'Si viajas en nuestro servicio privado puerta a puerta, aprovecha la amplia capacidad de la unidad para llevar equipaje extra, paquetes o cajas personales sin recargos sorpresa.',
      image: '/parcels/parcel-cargo-trunk.jpg',
      tag: 'Más Práctico'
    },
    {
      id: 'envio-exclusivo-vehiculo',
      title: 'Envío Exclusivo Puerta a Puerta',
      category: 'Vehículo Dedicado para tu Carga',
      description: 'Asignamos una unidad de nuestra flota para trasladar tu encomienda de ciudad a ciudad de forma directa. Recogida en tu domicilio y entrega en mano sin que tengas que viajar.',
      image: '/fleet/encomiendas-hero.jpg',
      tag: 'Directo y Seguro'
    },
    {
      id: 'documentacion-alta-seguridad',
      title: 'Documentación & Carga Delicada',
      category: 'Alta Confidencialidad y Protección',
      description: 'Contratos legales, pasaportes, laptops y equipos delicados que viajan sujetos en cabina climatizada con reporte fotográfico y entrega bajo firma autorizada.',
      image: '/parcels/parcel-secure-box.jpg',
      tag: 'Cero Pérdidas'
    },
    {
      id: 'traslados-intermunicipales-carga',
      title: 'Traslados Interciudades Express',
      category: 'Rutas Directas en Ecuador',
      description: 'Conectamos Quito, Guayaquil, Cuenca, Manta y cualquier cantón el mismo día. Sin esperar consolidación en bodegas gigantescas ni demoras innecesarias.',
      image: '/parcels/parcel-executive-van-road.jpg',
      tag: 'Entrega el Mismo Día'
    }
  ];

  return (
    <div className="bg-white text-slate-800">
      
      {/* 1. SECCIÓN HERO: ANCHO COMPLETO EDGE-TO-EDGE */}
      <section className="relative w-full min-h-[560px] sm:min-h-[620px] lg:min-h-[680px] flex items-center overflow-hidden bg-slate-950">
        
        {/* FOTOGRAFÍA PANORÁMICA DE FONDO: VEHÍCULO PUERTA A PUERTA ADAPTADO */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/fleet/encomiendas-hero.jpg" 
            alt="Vehículo de transporte puerta a puerta adaptado para encomiendas express"
            className="w-full h-full object-cover object-[78%_center] sm:object-[82%_center]"
          />
          {/* Degradado sobrio a la izquierda para contraste y legibilidad impecable, dejando totalmente visible y nítido el vehículo a la derecha */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 md:via-black/30 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30"></div>
        </div>

        {/* CONTENIDO PRINCIPAL DEL HERO (ALINEADO A LA IZQUIERDA, VEHÍCULO LIBRE A LA DERECHA) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 relative z-10 w-full">
          <div className="max-w-2xl space-y-6">
            
            {/* Titular Elegante, Corto y de Gran Escala */}
            <ScrollReveal direction="left" distance={35} duration={800} delay={80}>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-black text-white tracking-tight leading-[1.06] drop-shadow-lg">
                Tus Envíos, <br />
                <span className="font-serif italic font-normal text-slate-100">
                  a tu Horario.
                </span>
              </h1>
            </ScrollReveal>

            {/* Subtítulo Descriptivo Formal */}
            <ScrollReveal direction="left" distance={25} duration={700} delay={180}>
              <p className="text-sm sm:text-base lg:text-lg text-slate-200/90 leading-relaxed max-w-xl font-normal drop-shadow-sm">
                Adaptamos nuestra flota de transporte privado puerta a puerta para trasladar tus encomiendas, documentos confidenciales y artículos delicados. Recogida directa en tu domicilio y entrega en mano sin bodegas intermedias.
              </p>
            </ScrollReveal>

            {/* Botones de Acción (CTA) */}
            <ScrollReveal direction="up" distance={25} duration={700} delay={260}>
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  onClick={() => onOpenQuote('Encomiendas Puerta a Puerta Express')}
                  className="inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full bg-[#E11438] hover:bg-[#C20F2E] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 group cursor-pointer"
                >
                  <span>Cotizar Encomienda</span>
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white transition-transform group-hover:translate-x-1 shadow-xs">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </button>

                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent('Hola Happy Travel, deseo cotizar el envío de una encomienda puerta a puerta adaptada a mi horario.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 text-white font-semibold text-xs uppercase tracking-wider transition-all shadow-sm active:scale-95"
                >
                  <span>WhatsApp Directo</span>
                </a>
              </div>
            </ScrollReveal>

          </div>
        </div>

      </section>

      {/* 2. SECCIÓN 1 (ESTRUCTURA DE REFERENCIA 1): ALIADO CONFIABLE EN ENCOMIENDAS PRIVADAS */}
      <section className="py-20 lg:py-24 bg-[#FAF7F2] border-b border-slate-200/60 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
            
            {/* Columna Izquierda: Collage de Presentación en Capas Superpuestas con Profundidad (SIN PERSONAS) */}
            <div className="lg:col-span-6 relative flex flex-col justify-center">
              <ScrollReveal direction="left" distance={35} duration={800} className="h-full w-full">
                <div className="relative w-full h-full min-h-[460px] sm:min-h-[500px] lg:min-h-0">
                  
                  {/* Capa 1 (Fondo Superior Izquierda - Opacidad 40% para profundidad) */}
                  <div className="absolute top-0 left-0 w-[58%] sm:w-[56%] aspect-[16/10] rounded-2xl overflow-hidden shadow-lg border-2 border-white/90 bg-slate-900 opacity-40 hover:opacity-85 hover:scale-100 transition-all duration-500 scale-[0.93] transform origin-top-left z-10 group">
                    <img 
                      src="/parcels/parcel-executive-van-road.jpg" 
                      alt="Rutas interprovinciales directas"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-white text-[9px] font-bold tracking-wide">
                      • Rutas Directas
                    </span>
                    <span className="absolute bottom-2 left-2.5 text-white text-[10px] font-bold">
                      Conexión Interciudades
                    </span>
                  </div>

                  {/* Capa 2 (Fondo Superior Derecha - Opacidad 55% para profundidad) */}
                  <div className="absolute top-2 right-0 w-[58%] sm:w-[56%] aspect-[16/10] rounded-2xl overflow-hidden shadow-xl border-2 border-white/90 bg-slate-900 opacity-55 hover:opacity-90 hover:scale-100 transition-all duration-500 scale-[0.95] transform origin-top-right z-15 group">
                    <img 
                      src="/parcels/parcel-secure-box.jpg" 
                      alt="Custodia VIP de documentos y paquetes"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-amber-500/85 text-slate-950 text-[9px] font-extrabold tracking-wide">
                      • Custodia VIP
                    </span>
                    <span className="absolute bottom-2 left-2.5 text-white text-[10px] font-bold">
                      Documentos & Carga Delicada
                    </span>
                  </div>

                  {/* Capa 3 (Fondo Inferior Derecha - Opacidad 45% para profundidad) */}
                  <div className="absolute bottom-0 right-0 w-[56%] sm:w-[54%] aspect-[16/10] rounded-2xl overflow-hidden shadow-lg border-2 border-white/90 bg-slate-900 opacity-45 hover:opacity-85 hover:scale-100 transition-all duration-500 scale-[0.94] transform origin-bottom-right z-10 group">
                    <img 
                      src="/parcels/parcel-gps-tracking.jpg" 
                      alt="Monitoreo GPS en tiempo real"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-emerald-500/80 text-white text-[9px] font-bold tracking-wide">
                      • Monitoreo GPS
                    </span>
                    <span className="absolute bottom-2 left-2.5 text-white text-[10px] font-bold">
                      Seguimiento en Ruta
                    </span>
                  </div>

                  {/* Capa 4 (Capa Media Inferior Izquierda - Opacidad 75%) */}
                  <div className="absolute bottom-1 left-0 w-[64%] sm:w-[62%] aspect-[16/10] rounded-2xl overflow-hidden shadow-xl border-2 border-white bg-slate-900 opacity-75 hover:opacity-100 hover:scale-100 transition-all duration-500 scale-[0.98] transform origin-bottom-left z-20 group">
                    <img 
                      src="/parcels/parcel-cargo-trunk.jpg" 
                      alt="Espacio en cabina climatizada"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-amber-500/85 text-slate-950 text-[9px] font-extrabold tracking-wide">
                      • Bodega & Cabina
                    </span>
                    <span className="absolute bottom-2 left-3 text-white text-[11px] font-bold">
                      Espacio Climatizado Protegido
                    </span>
                  </div>

                  {/* Capa 5 (PRIMER PLANO PRINCIPAL - 100% Opacidad, Sombra Profunda, Centro Destacado) */}
                  <div className="absolute top-[48%] left-[52%] -translate-x-1/2 -translate-y-1/2 w-[74%] sm:w-[72%] aspect-[16/10] rounded-[1.8rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-950 opacity-100 z-30 group hover:shadow-[0_25px_50px_rgba(0,0,0,0.3)] transition-all duration-500">
                    <img 
                      src="/fleet/encomiendas-hero.jpg" 
                      alt="Flota de transporte puerta a puerta adaptada para encomiendas"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                    
                    {/* Badge superior del elemento principal */}
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#E11438] text-white text-[10px] font-extrabold tracking-wide shadow-md flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      <span>Flota Puerta a Puerta</span>
                    </div>
                  </div>

                </div>
              </ScrollReveal>
            </div>

            {/* Columna Derecha: Título, Sello Circular y Checklist de 3 pasos */}
            <div className="lg:col-span-6 space-y-6 relative">
              
              {/* Encabezado con Sello Circular Read More */}
              <div className="flex items-start justify-between gap-4">
                <ScrollReveal direction="right" distance={30} duration={700}>
                  <h2 className="font-display text-3xl sm:text-4xl lg:text-[42px] font-black text-slate-900 tracking-tight leading-tight">
                    Happy Travel es Tu Aliado <br />
                    <span className="text-[#E11438]">Confiable en Encomiendas</span>
                  </h2>
                </ScrollReveal>

                {/* Sello circular interactivo giratorio (inspirado en 'Read More Details') */}
                <ScrollReveal direction="zoom-in" distance={0} scale={0.85} duration={700} delay={150}>
                  <div 
                    onClick={() => onOpenQuote('Encomiendas Puerta a Puerta Express')}
                    className="hidden sm:flex relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-full bg-[#E11438] text-white items-center justify-center shadow-lg hover:scale-105 transition-transform cursor-pointer group"
                  >
                    <svg className="w-full h-full p-2 animate-[spin_25s_linear_infinite]" viewBox="0 0 100 100">
                      <path id="circlePathRef1" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="none" />
                      <text className="text-[9.5px] uppercase font-black tracking-widest fill-white">
                        <textPath href="#circlePathRef1" startOffset="0%">
                          • ENVIOS VIP • PUERTA A PUERTA •
                        </textPath>
                      </text>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-white text-[#E11438] flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              {/* Explicación de cómo se acopla como servicio adicional al transporte privado */}
              <ScrollReveal direction="right" distance={25} duration={700} delay={180}>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  En Happy Travel nuestro servicio insignia es el <strong className="text-slate-900 font-semibold">transporte privado de pasajeros</strong>, y ahora puedes incluir el <strong className="text-slate-900 font-semibold">envío de encomiendas como un servicio adicional exclusivo</strong>. Ya sea que viajes en la unidad y desees transportar paquetes extra, o que quieras enviar una encomienda en un trayecto directo sin viajar tú, aseguramos el mismo estándar de privacidad, puntualidad y cuidado VIP.
                </p>
              </ScrollReveal>

              {/* Lista numerada 1, 2, 3 con badges verdes idénticos a la referencia */}
              <ScrollReveal direction="right" distance={25} duration={700} delay={260}>
                <div className="space-y-4 pt-2">
                  
                  <div className="flex items-center gap-3.5">
                    <div className="w-7 h-7 rounded-full bg-[#16A34A] text-white flex items-center justify-center text-xs font-black shrink-0 shadow-sm">
                      1
                    </div>
                    <span className="text-sm font-bold text-slate-800">
                      Atención y Soporte 24/7 en Ruta
                    </span>
                  </div>

                  <div className="flex items-center gap-3.5">
                    <div className="w-7 h-7 rounded-full bg-[#16A34A] text-white flex items-center justify-center text-xs font-black shrink-0 shadow-sm">
                      2
                    </div>
                    <span className="text-sm font-bold text-slate-800">
                      Horarios y Recogida 100% Flexibles a tu Medida
                    </span>
                  </div>

                  <div className="flex items-center gap-3.5">
                    <div className="w-7 h-7 rounded-full bg-[#16A34A] text-white flex items-center justify-center text-xs font-black shrink-0 shadow-sm">
                      3
                    </div>
                    <span className="text-sm font-bold text-slate-800">
                      Rastreo y Monitoreo Satelital en Tiempo Real
                    </span>
                  </div>

                </div>
              </ScrollReveal>

            </div>

          </div>

          {/* Pastilla vertical decorativa de borde estilo referencia */}
          <div className="hidden xl:flex absolute -right-3 top-1/2 -translate-y-1/2 py-4 px-2 rounded-full border border-slate-300 text-slate-500 text-[10px] font-bold tracking-widest uppercase [writing-mode:vertical-rl] rotate-180 bg-white/70 shadow-xs">
            • Servicio Adicional •
          </div>

        </div>
      </section>

      {/* 3. SECCIÓN 2 (ESTRUCTURA DE REFERENCIA 2): NUESTROS SERVICIOS DE ENCOMIENDA (CARRUSEL DE 4 TARJETAS) */}
      <section className="py-20 lg:py-24 bg-[#FAF5F2] border-b border-slate-200/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Cabecera de la sección */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 relative">
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex py-3 px-1.5 rounded-full border border-slate-300 text-slate-500 text-[9px] font-bold tracking-widest uppercase [writing-mode:vertical-rl] rotate-180 bg-white/70 shadow-xs shrink-0">
                • Servicios •
              </div>
              <div className="space-y-2">
                <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#E11438]">
                  Modalidades Disponibles
                </span>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-[40px] font-black text-slate-900 tracking-tight leading-tight">
                  Servicios de Encomienda y Carga Privada
                </h2>
              </div>
            </div>
            
            <p className="text-xs sm:text-sm text-slate-600 max-w-md leading-relaxed">
              En Happy Travel adaptamos cada traslado a tus necesidades. Conoce cómo puedes aprovechar nuestras unidades privadas para mover tu carga con total seguridad.
            </p>
          </div>

          {/* Línea divisoria con enlace Explorar Todos y Controles del Carrusel (←) (→) conectada por línea punteada */}
          <div className="flex items-center gap-4 pb-8 mb-4">
            <button
              onClick={() => onOpenQuote('Servicio de Encomiendas Puerta a Puerta')}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#E11438] hover:text-[#C20F2E] border-b-2 border-[#E11438] pb-0.5 transition-colors cursor-pointer shrink-0"
            >
              <span>Explorar Todos los Servicios</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            {/* Línea punteada que conecta de lado a lado como en la referencia */}
            <div className="flex-1 border-b border-dashed border-slate-300 mx-2" />

            {/* Flechas de Navegación del Carrusel */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => scrollServices('left')}
                className="w-10 h-10 rounded-full bg-white hover:bg-slate-100 border border-slate-300 flex items-center justify-center text-slate-700 transition-all shadow-sm active:scale-95 cursor-pointer"
                aria-label="Anterior servicio"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollServices('right')}
                className="w-10 h-10 rounded-full bg-[#E11438] hover:bg-[#C20F2E] text-white flex items-center justify-center transition-all shadow-md active:scale-95 cursor-pointer"
                aria-label="Siguiente servicio"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Carrusel Desplazable de 4 Tarjetas */}
          <div 
            ref={servicesCarouselRef}
            className="flex gap-6 overflow-x-auto pb-6 pt-2 scroll-smooth snap-x snap-mandatory scrollbar-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {servicesData.map((service, idx) => (
              <div 
                key={service.id}
                className="min-w-[280px] sm:min-w-[320px] lg:min-w-[340px] flex-1 snap-start"
              >
                <ScrollReveal direction="up" distance={20} duration={600} delay={idx * 100}>
                  <div className="bg-white rounded-[2rem] p-5 sm:p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200/80 flex flex-col justify-between h-full group">
                    
                    <div>
                      {/* Imagen con bordes redondeados (SIN PERSONAS) */}
                      <div className="w-full h-44 sm:h-48 rounded-2xl overflow-hidden mb-4 relative bg-slate-100">
                        <img 
                          src={service.image} 
                          alt={service.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md text-white text-[10px] font-bold tracking-wide">
                          {service.tag}
                        </span>
                      </div>

                      {/* Categoría y Título */}
                      <span className="text-[11px] font-bold text-[#E11438] uppercase tracking-wider block mb-1">
                        {service.category}
                      </span>
                      <h3 className="font-display font-extrabold text-lg sm:text-xl text-slate-900 group-hover:text-[#E11438] transition-colors">
                        {service.title}
                      </h3>

                      {/* Descripción */}
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2.5 font-normal">
                        {service.description}
                      </p>
                    </div>

                    {/* Enlace de Acción Inferior */}
                    <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => onOpenQuote(service.title)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E11438] hover:text-[#C20F2E] transition-colors cursor-pointer group-hover:translate-x-1 duration-300"
                      >
                        <span>Cotizar Ahora</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                      <span className="text-[10px] text-slate-400 font-mono font-medium">100% Puerta a Puerta</span>
                    </div>

                  </div>
                </ScrollReveal>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. SECCIÓN 3: BANNER UNIFICADO BORDE A BORDE - SERVICIO ADICIONAL & VEHÍCULO EXCLUSIVO */}
      <section className="w-full relative overflow-hidden border-y border-slate-200/80 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
          
          {/* Mitad Izquierda: Tono Cálido Champán (Servicio Adicional al Pasajero) */}
          <div className="relative bg-[#FAF5EE] border-b lg:border-b-0 lg:border-r border-slate-200/90 px-6 py-14 sm:px-10 sm:py-20 lg:py-24 lg:pl-12 lg:pr-6 xl:pl-20 xl:pr-10 flex flex-col justify-center overflow-hidden group">
            {/* Resplandor decorativo sutil de fondo */}
            <div className="absolute top-0 left-0 w-80 h-80 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
              
              {/* Texto al extremo izquierdo */}
              <ScrollReveal direction="left" distance={30} duration={750} delay={60} className="w-full lg:w-[46%] xl:w-[44%] space-y-4">
                <h3 className="font-display text-2xl sm:text-3xl xl:text-4xl font-black text-slate-900 leading-tight">
                  Lleva Encomiendas <br />
                  <span className="font-serif italic font-normal text-amber-800">en tu Mismo Viaje</span>
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  ¿Viajas con nosotros? Aprovecha la amplia capacidad de la unidad para transportar maletas, paquetes y encargos personales sin recargos sorpresa ni complicaciones.
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => onOpenQuote('Encomiendas en tu Mismo Viaje')}
                    className="px-6 py-2.5 rounded-full bg-[#0B0F19] hover:bg-[#E11438] text-white text-xs font-bold transition-all shadow-md active:scale-95 inline-flex items-center gap-2 group cursor-pointer"
                  >
                    <span>Cotizar Servicio</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </ScrollReveal>

              {/* Vehículo hacia el centro (mirando de izquierda a derecha →) */}
              <ScrollReveal direction="right" distance={35} duration={850} delay={140} className="w-full lg:w-[54%] xl:w-[56%] flex items-end justify-center lg:justify-end pointer-events-none pt-4 lg:pt-0">
                <img
                  src="/fleet/passenger_van_facing_right.png"
                  alt="Van VIP de pasajeros con capacidad de encomiendas mirando al centro"
                  className="w-full max-w-[460px] xl:max-w-[530px] h-auto object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.18)] group-hover:scale-105 transition-all duration-500"
                />
              </ScrollReveal>

            </div>
          </div>

          {/* Mitad Derecha: Tono Obsidiana Ejecutivo con Paleta Logo (Vehículo 100% Exclusivo) */}
          <div className="relative bg-[#070A10] px-6 py-14 sm:px-10 sm:py-20 lg:py-24 lg:pr-12 lg:pl-6 xl:pr-20 xl:pl-10 flex flex-col justify-center overflow-hidden group">
            {/* Resplandor decorativo dorado de fondo */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex flex-col lg:flex-row-reverse items-center justify-between gap-8 relative z-10">
              
              {/* Texto al extremo derecho */}
              <ScrollReveal direction="right" distance={30} duration={750} delay={60} className="w-full lg:w-[46%] xl:w-[44%] space-y-4">
                <h3 className="font-display text-2xl sm:text-3xl xl:text-4xl font-black text-white leading-tight">
                  Envío Privado <br />
                  <span className="font-serif italic font-normal text-amber-400">Puerta a Puerta</span>
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  Asignamos un vehículo de nuestra flota para trasladar tu carga, documentos confidenciales o paquetes urgentes directamente hasta el destinatario final.
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => onOpenQuote('Envío Exclusivo Puerta a Puerta')}
                    className="px-6 py-2.5 rounded-full bg-white hover:bg-amber-400 hover:text-slate-950 text-slate-900 text-xs font-bold transition-all shadow-md active:scale-95 inline-flex items-center gap-2 group cursor-pointer"
                  >
                    <span>Solicitar Envío</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </ScrollReveal>

              {/* Vehículo hacia el centro (mirando de derecha a izquierda ←) */}
              <ScrollReveal direction="left" distance={35} duration={850} delay={140} className="w-full lg:w-[54%] xl:w-[56%] flex items-end justify-center lg:justify-start pointer-events-none pt-4 lg:pt-0">
                <img
                  src="/fleet/van_facing_left.png"
                  alt="Van dedicada de encomiendas puerta a puerta mirando al centro"
                  className="w-full max-w-[410px] xl:max-w-[470px] h-auto object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.65)] group-hover:scale-105 transition-all duration-500"
                />
              </ScrollReveal>

            </div>
          </div>

        </div>
      </section>

      {/* 5. SECCIÓN 4 (ESTRUCTURA DE REFERENCIA INFERIOR): EXPERIENCIA & GARANTÍA (COLLAGE 4 FOTOS + STATS + BARRA DE 4 ATRIBUTOS) */}
      <section className="py-20 lg:py-24 bg-[#FAF7F2] border-b border-slate-200/60 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Columna Izquierda: Collage de 4 Fotografías con Sello Central (SIN PERSONAS) */}
            <div className="lg:col-span-6 relative">
              <ScrollReveal direction="right" distance={30} duration={800}>
                <div className="relative max-w-lg mx-auto">
                  
                  {/* Grid de 4 fotos asimétricas con marcos blancos limpios */}
                  <div className="grid grid-cols-12 gap-3 sm:gap-4 items-center">
                    
                    {/* Foto 1: Arriba Izquierda (Habitáculo de carga seguro y organizado) */}
                    <div className="col-span-7 h-44 sm:h-52 rounded-[1.8rem] overflow-hidden shadow-md border-4 border-white bg-slate-900 group">
                      <img 
                        src="/parcels/parcel-cargo-trunk.jpg" 
                        alt="Habitáculo de transporte privado para carga segura" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Foto 2: Arriba Derecha (Van Sprinter de reparto ejecutivo) */}
                    <div className="col-span-5 h-56 sm:h-64 rounded-[1.8rem] overflow-hidden shadow-md border-4 border-white bg-slate-900 group">
                      <img 
                        src="/fleet/encomiendas-hero.jpg" 
                        alt="Vehículo de encomiendas puerta a puerta" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Foto 3: Abajo Izquierda (Custodia de documentos y objetos de alto valor) */}
                    <div className="col-span-5 h-52 sm:h-60 -mt-6 sm:-mt-8 rounded-[1.8rem] overflow-hidden shadow-md border-4 border-white bg-slate-900 group">
                      <img 
                        src="/parcels/parcel-secure-box.jpg" 
                        alt="Custodia de documentos y paquetes de alto valor" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Foto 4: Abajo Derecha (Ruta nacional segura y monitoreada) */}
                    <div className="col-span-7 h-44 sm:h-52 rounded-[1.8rem] overflow-hidden shadow-md border-4 border-white bg-slate-900 group">
                      <img 
                        src="/parcels/parcel-executive-van-road.jpg" 
                        alt="Ruta nacional interprovincial directa" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                  </div>

                  {/* Sello Circular en el Centro de la Intersección (Estilo Referencia) */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#070A10] text-white flex items-center justify-center shadow-2xl border-2 border-amber-400/80 group">
                      <svg className="w-full h-full p-2 animate-[spin_25s_linear_infinite]" viewBox="0 0 100 100">
                        <path id="circlePathCollage" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="none" />
                        <text className="text-[9px] uppercase font-black tracking-widest fill-amber-300">
                          <textPath href="#circlePathCollage" startOffset="0%">
                            • 100% SEGURO • PUERTA A PUERTA •
                          </textPath>
                        </text>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-400">
                          <ShieldCheck className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </ScrollReveal>
            </div>

            {/* Columna Derecha: Información Editorial, Caja de Métricas y Firma */}
            <div className="lg:col-span-6 space-y-6">
              
              <ScrollReveal direction="up" distance={20} duration={700}>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                  Sobre Nuestro Servicio
                </span>

                <h2 className="font-display text-3xl sm:text-4xl lg:text-[42px] font-black text-slate-900 tracking-tight leading-tight">
                  Tu Encomienda con la Máxima <br />
                  <span className="font-serif italic font-normal text-amber-600">Seguridad y Elegancia</span>
                </h2>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed pt-3">
                  En Happy Travel elevamos el estándar del transporte de encomiendas al mismo nivel de nuestro servicio de pasajeros VIP. Cada paquete viaja en el habitáculo protegido de nuestras unidades privadas, sin bodegas intermedias ni manipulaciones bruscas, garantizando llegada directa y puntual.
                </p>
              </ScrollReveal>

              {/* Caja de 3 Métricas Destacadas (Idéntica a la referencia, con paleta de color del logo) */}
              <ScrollReveal direction="up" distance={20} duration={700} delay={150}>
                <div className="bg-[#070A10] rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-amber-500/25 shadow-xl grid grid-cols-3 divide-x divide-slate-800 my-2">
                  <div className="px-2 sm:px-4 text-center first:pl-0">
                    <span className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-amber-400 block tracking-tight">
                      24/7
                    </span>
                    <span className="text-[11px] sm:text-xs font-semibold text-slate-300 block mt-1">
                      Monitoreo GPS
                    </span>
                  </div>

                  <div className="px-2 sm:px-4 text-center">
                    <span className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-amber-400 block tracking-tight">
                      0
                    </span>
                    <span className="text-[11px] sm:text-xs font-semibold text-slate-300 block mt-1">
                      Bodegas Intermedias
                    </span>
                  </div>

                  <div className="px-2 sm:px-4 text-center last:pr-0">
                    <span className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-amber-400 block tracking-tight">
                      99.8%
                    </span>
                    <span className="text-[11px] sm:text-xs font-semibold text-slate-300 block mt-1">
                      Entregas Puntuales
                    </span>
                  </div>
                </div>
              </ScrollReveal>

              {/* Firma y Respaldo Institucional (Estilo Referencia) */}
              <ScrollReveal direction="up" distance={15} duration={600} delay={250}>
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="font-serif italic font-bold text-2xl sm:text-3xl text-slate-800 tracking-wide block">
                      Happy Travel Express
                    </span>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mt-0.5">
                      Flota Privada de Pasajeros & Encomiendas
                    </span>
                  </div>

                  <button
                    onClick={() => onOpenQuote('Encomiendas Puerta a Puerta')}
                    className="px-6 py-3 rounded-full bg-[#E11438] hover:bg-[#C20F2E] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-2 self-start sm:self-auto"
                  >
                    <span>Cotizar Ahora</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </ScrollReveal>

            </div>

          </div>

          {/* Barra Inferior de 4 Atributos Destacados (Idéntica a la barra inferior de la referencia) */}
          <div className="mt-16 sm:mt-20 pt-8 sm:pt-10 border-t border-slate-200/80">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              
              <ScrollReveal direction="up" distance={20} duration={650} delay={60}>
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-700 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">Custodia en Cabina</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">Máximo cuidado y protección</p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" distance={20} duration={650} delay={140}>
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-700 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">Horarios a tu Medida</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">Recogida y entrega flexible</p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" distance={20} duration={650} delay={220}>
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-700 flex items-center justify-center shrink-0">
                    <Navigation className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">Cero Bodegas</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">Trayecto directo puerta a puerta</p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" distance={20} duration={650} delay={300}>
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-700 flex items-center justify-center shrink-0">
                    <Headphones className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">Atención 24/7</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">Soporte y monitoreo en vivo</p>
                  </div>
                </div>
              </ScrollReveal>

            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
