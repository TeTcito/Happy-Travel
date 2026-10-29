import React, { useRef } from 'react';
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
      const scrollAmount = container.clientWidth * 0.40;
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
    <div className="bg-white text-slate-800 pb-0">
      
      {/* 1. SECCIÓN HERO: FORMATO 16:9 EDGE-TO-EDGE */}
      <section className="relative w-full aspect-[16/9] overflow-hidden bg-slate-950">
        
        {/* FOTOGRAFÍA PANORÁMICA DE FONDO: VEHÍCULO PUERTA A PUERTA ADAPTADO */}
        <img 
          src="/fleet/encomiendas-hero.jpg" 
          alt="Vehículo de transporte puerta a puerta adaptado para encomiendas express"
          className="w-full h-full object-cover object-[75%_center] block"
        />
        
        {/* Degradado sobrio a la izquierda para contraste y legibilidad impecable */}
        <div className="absolute inset-y-0 left-0 w-[65%] sm:w-3/5 bg-gradient-to-r from-black/90 via-black/55 to-transparent pointer-events-none" />

        {/* CONTENIDO PRINCIPAL DEL HERO (A LA IZQUIERDA) */}
        <div className="absolute inset-0 z-10 pt-[10px] sm:pt-4 pl-3.5 sm:pl-6 pr-2 pb-2 flex flex-col justify-center">
          <div className="max-w-[55%] sm:max-w-[50%] space-y-1 sm:space-y-1.5">
            
            {/* Título Principal sin etiquetas */}
            <ScrollReveal direction="up" distance={10} duration={600} delay={60}>
              <h1 className="font-serif text-[24px] sm:text-[34px] font-black text-white tracking-tight leading-[0.92] drop-shadow-2xl">
                Tus Envíos, <br />
                <span className="italic font-bold text-amber-400 inline-block">a tu Horario.</span>
              </h1>
            </ScrollReveal>

            {/* Mensaje resumido estrictamente en 2 líneas */}
            <ScrollReveal direction="up" distance={8} duration={600} delay={120}>
              <p className="text-[10px] sm:text-xs text-slate-200/90 leading-tight font-normal drop-shadow-sm line-clamp-2">
                Traslado directo y seguro de encomiendas y documentos sin bodegas intermedias en Ecuador.
              </p>
            </ScrollReveal>

            {/* Un solo botón abajo */}
            <ScrollReveal direction="up" distance={8} duration={600} delay={180}>
              <div className="pt-1">
                <button
                  onClick={() => onOpenQuote('Encomiendas Puerta a Puerta Express')}
                  className="inline-flex items-center gap-2 pl-3 sm:pl-3.5 pr-1.5 py-1 sm:py-1.5 rounded-full bg-white text-slate-950 hover:bg-slate-100 font-bold text-[10px] sm:text-xs uppercase tracking-wider transition-all shadow-xl active:scale-95 group cursor-pointer"
                >
                  <span>Cotizar Encomienda</span>
                  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#E11438] group-hover:bg-[#C20F2E] flex items-center justify-center text-white transition-colors shadow-2xs">
                    <ArrowUpRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </button>
              </div>
            </ScrollReveal>

          </div>
        </div>

      </section>

      {/* 2. SECCIÓN: ALIADO CONFIABLE EN ENCOMIENDAS PRIVADAS */}
      <section className="py-6 sm:py-8 bg-[#FAF7F2] border-b border-slate-200/60 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          {/* PRIMERO: EL TÍTULO */}
          <div className="mb-4">
            <ScrollReveal direction="up" distance={15} duration={600}>
              <h2 className="font-display text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight">
                Happy Travel es Tu Aliado <br className="hidden sm:inline" />
                <span className="text-[#E11438]">Confiable en Encomiendas</span>
              </h2>
            </ScrollReveal>
          </div>

          {/* LUEGO: LAS IMÁGENES REDUCIDAS EN TAMAÑO PARA QUE ENTREN TODAS Y NO ESTÉN SUPERPUESTAS */}
          <ScrollReveal direction="up" distance={15} duration={650} delay={80}>
            <div className="grid grid-cols-2 gap-2.5 max-w-lg mx-auto mb-4">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-2xs border border-slate-200/80 bg-slate-900 group">
                <img 
                  src="/parcels/parcel-executive-van-road.jpg" 
                  alt="Rutas interprovinciales directas"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-white text-[8.5px] font-bold">
                  • Rutas Directas
                </span>
                <span className="absolute bottom-1.5 left-2 right-2 text-white text-[9.5px] font-bold truncate">
                  Conexión Interciudades
                </span>
              </div>

              <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-2xs border border-slate-200/80 bg-slate-900 group">
                <img 
                  src="/parcels/parcel-secure-box.jpg" 
                  alt="Custodia VIP de documentos y paquetes"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded-md bg-amber-500/90 text-slate-950 text-[8.5px] font-extrabold">
                  • Custodia VIP
                </span>
                <span className="absolute bottom-1.5 left-2 right-2 text-white text-[9.5px] font-bold truncate">
                  Documentos & Carga
                </span>
              </div>

              <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-2xs border border-slate-200/80 bg-slate-900 group">
                <img 
                  src="/parcels/parcel-gps-tracking.jpg" 
                  alt="Monitoreo GPS en tiempo real"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded-md bg-emerald-500/90 text-white text-[8.5px] font-bold">
                  • Monitoreo GPS
                </span>
                <span className="absolute bottom-1.5 left-2 right-2 text-white text-[9.5px] font-bold truncate">
                  Seguimiento en Ruta
                </span>
              </div>

              <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-2xs border border-slate-200/80 bg-slate-900 group">
                <img 
                  src="/parcels/parcel-cargo-trunk.jpg" 
                  alt="Espacio en cabina climatizada"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded-md bg-amber-500/90 text-slate-950 text-[8.5px] font-extrabold">
                  • Bodega & Cabina
                </span>
                <span className="absolute bottom-1.5 left-2 right-2 text-white text-[9.5px] font-bold truncate">
                  Espacio Climatizado
                </span>
              </div>
            </div>
          </ScrollReveal>

          {/* MENSAJE REMOVIDO, ABAJO DE LAS IMÁGENES: LOS 3 PUNTOS QUE ESTABAN VIÑETADOS */}
          <ScrollReveal direction="up" distance={15} duration={650} delay={160}>
            <div className="space-y-2 max-w-md mx-auto">
              
              <div className="flex items-center gap-3 bg-white/90 p-2.5 rounded-xl border border-slate-200/70 shadow-2xs">
                <div className="w-6 h-6 rounded-full bg-[#16A34A] text-white flex items-center justify-center text-xs font-black shrink-0 shadow-2xs">
                  1
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-800">
                  Atención y Soporte 24/7 en Ruta
                </span>
              </div>

              <div className="flex items-center gap-3 bg-white/90 p-2.5 rounded-xl border border-slate-200/70 shadow-2xs">
                <div className="w-6 h-6 rounded-full bg-[#16A34A] text-white flex items-center justify-center text-xs font-black shrink-0 shadow-2xs">
                  2
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-800">
                  Horarios y Recogida 100% Flexibles a tu Medida
                </span>
              </div>

              <div className="flex items-center gap-3 bg-white/90 p-2.5 rounded-xl border border-slate-200/70 shadow-2xs">
                <div className="w-6 h-6 rounded-full bg-[#16A34A] text-white flex items-center justify-center text-xs font-black shrink-0 shadow-2xs">
                  3
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-800">
                  Rastreo y Monitoreo Satelital en Tiempo Real
                </span>
              </div>

            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* 3. SECCIÓN: MODALIDADES DISPONIBLES (CARRUSEL DE 2.5 TARJETAS) */}
      <section className="py-5 sm:py-6 bg-[#FAF5F2] border-b border-slate-200/60 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* Cabecera de la sección: Solo el título y botones de desplazamiento */}
          <div className="flex items-center justify-between gap-3 mb-3">
            <ScrollReveal direction="right" distance={15} duration={600} delay={60}>
              <h2 className="font-display text-lg sm:text-xl font-black text-slate-900 leading-tight">
                Modalidades Disponibles
              </h2>
            </ScrollReveal>

            {/* Flechas de Navegación del Carrusel a la derecha */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => scrollServices('left')}
                className="w-7 h-7 rounded-full bg-white hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 transition-all shadow-2xs active:scale-95 cursor-pointer"
                aria-label="Anterior modalidad"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => scrollServices('right')}
                className="w-7 h-7 rounded-full bg-[#E11438] hover:bg-[#C20F2E] text-white flex items-center justify-center transition-all shadow-2xs active:scale-95 cursor-pointer"
                aria-label="Siguiente modalidad"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Carrusel desplazable a todo el ancho de la pestaña */}
          <div 
            ref={servicesCarouselRef}
            className="-mx-4 px-4 flex gap-2.5 overflow-x-auto pb-2 pt-1 scroll-smooth snap-x snap-mandatory no-scrollbar scroll-pl-4 scroll-pr-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {servicesData.map((service, idx) => (
              <div 
                key={service.id}
                className="w-[38vw] sm:w-[160px] shrink-0 snap-start"
              >
                <ScrollReveal direction="up" distance={15} duration={500} delay={idx * 60}>
                  <div className="bg-white rounded-2xl overflow-hidden shadow-2xs hover:shadow-md transition-all duration-300 border border-slate-200/80 flex flex-col justify-between h-[235px] sm:h-[248px] group">
                    <div>
                      {/* Imagen ocupando el 100% del ancho superior de la tarjeta */}
                      <div className="w-full h-22 sm:h-24 overflow-hidden relative bg-slate-100">
                        <img 
                          src={service.image} 
                          alt={service.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                        <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-md bg-black/75 backdrop-blur-xs text-white text-[7.5px] font-bold">
                          {service.tag}
                        </span>
                      </div>

                      <div className="p-2 sm:p-2.5 pb-0">
                        {/* Categoría y Título */}
                        <span className="text-[8.5px] font-bold text-[#E11438] uppercase tracking-wider block truncate">
                          {service.category}
                        </span>
                        <h3 className="font-display font-extrabold text-[11px] sm:text-xs text-slate-900 group-hover:text-[#E11438] transition-colors leading-tight line-clamp-2 mt-0.5">
                          {service.title}
                        </h3>

                        {/* Descripción resumida */}
                        <p className="text-[9.5px] text-slate-500 leading-tight mt-1 line-clamp-2 font-normal">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    {/* Botón de Acción Inferior */}
                    <div className="p-2 sm:p-2.5 pt-2 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => onOpenQuote(service.title)}
                        className="inline-flex items-center gap-1 text-[10px] font-bold text-[#E11438] hover:text-[#C20F2E] transition-colors cursor-pointer group-hover:translate-x-0.5 duration-200"
                      >
                        <span>Cotizar</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                      <span className="text-[8px] text-slate-400 font-mono">100% VIP</span>
                    </div>

                  </div>
                </ScrollReveal>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. SECCIÓN: BANNER UNIFICADO BORDE A BORDE - SERVICIO ADICIONAL & VEHÍCULO EXCLUSIVO */}
      <section className="w-full relative overflow-hidden border-y border-slate-200/80 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
          
          {/* Bloque 1: Tono Cálido Champán (Vehículo a la IZQUIERDA, Texto a la DERECHA) */}
          <div className="relative bg-[#FAF5EE] border-b lg:border-b-0 lg:border-r border-slate-200/90 px-4 py-5 sm:px-8 sm:py-8 flex flex-col justify-center overflow-hidden group">
            {/* Resplandor decorativo sutil de fondo */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex flex-row items-center justify-between gap-3 sm:gap-6 relative z-10">
              
              {/* IMAGEN DEL VEHÍCULO A LA IZQUIERDA */}
              <ScrollReveal direction="left" distance={25} duration={750} delay={60} className="w-[42%] sm:w-[45%] flex items-center justify-center shrink-0">
                <img
                  src="/fleet/passenger_van_facing_right.png"
                  alt="Van de pasajeros adaptada para encomiendas"
                  className="w-full h-auto object-contain drop-shadow-[0_12px_20px_rgba(0,0,0,0.16)] group-hover:scale-105 transition-all duration-500"
                />
              </ScrollReveal>

              {/* TEXTO A LA DERECHA */}
              <ScrollReveal direction="right" distance={25} duration={750} delay={120} className="w-[58%] sm:w-[55%] space-y-1.5 sm:space-y-2">
                <h3 className="font-display text-sm sm:text-lg font-black text-slate-900 leading-tight">
                  Lleva Encomiendas <br />
                  <span className="font-serif italic font-normal text-amber-800">en tu Mismo Viaje</span>
                </h3>

                <p className="text-[10px] sm:text-xs text-slate-600 leading-tight line-clamp-2 font-normal">
                  Aprovecha la capacidad de tu unidad privada para llevar equipaje y paquetes sin costos ocultos.
                </p>

                <div className="pt-1">
                  <button
                    onClick={() => onOpenQuote('Encomiendas en tu Mismo Viaje')}
                    className="px-3.5 py-1.5 sm:px-5 sm:py-2 rounded-full bg-[#0B0F19] hover:bg-[#E11438] text-white text-[10px] sm:text-xs font-bold transition-all shadow-xs active:scale-95 inline-flex items-center gap-1.5 group cursor-pointer"
                  >
                    <span>Cotizar</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </ScrollReveal>

            </div>
          </div>

          {/* Bloque 2: Tono Obsidiana Ejecutivo (Texto a la IZQUIERDA, Imagen a la DERECHA) */}
          <div className="relative bg-[#070A10] px-4 py-5 sm:px-8 sm:py-8 flex flex-col justify-center overflow-hidden group">
            {/* Resplandor decorativo dorado de fondo */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex flex-row items-center justify-between gap-3 sm:gap-6 relative z-10">
              
              {/* TEXTO A LA IZQUIERDA */}
              <ScrollReveal direction="left" distance={25} duration={750} delay={60} className="w-[58%] sm:w-[55%] space-y-1.5 sm:space-y-2">
                <h3 className="font-display text-sm sm:text-lg font-black text-white leading-tight">
                  Envío Privado <br />
                  <span className="font-serif italic font-normal text-amber-400">Puerta a Puerta</span>
                </h3>

                <p className="text-[10px] sm:text-xs text-slate-300 leading-tight line-clamp-2 font-normal">
                  Asignamos una unidad de nuestra flota para transportar tu encomienda o carga de forma directa y segura.
                </p>

                <div className="pt-1">
                  <button
                    onClick={() => onOpenQuote('Envío Exclusivo Puerta a Puerta')}
                    className="px-3.5 py-1.5 sm:px-5 sm:py-2 rounded-full bg-white hover:bg-amber-400 hover:text-slate-950 text-slate-900 text-[10px] sm:text-xs font-bold transition-all shadow-xs active:scale-95 inline-flex items-center gap-1.5 group cursor-pointer"
                  >
                    <span>Solicitar</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </ScrollReveal>

              {/* IMAGEN DEL VEHÍCULO A LA DERECHA */}
              <ScrollReveal direction="right" distance={25} duration={750} delay={120} className="w-[42%] sm:w-[45%] flex items-center justify-center shrink-0">
                <img
                  src="/fleet/van_facing_left.png"
                  alt="Van dedicada de encomiendas puerta a puerta"
                  className="w-full h-auto object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.65)] group-hover:scale-105 transition-all duration-500"
                />
              </ScrollReveal>

            </div>
          </div>

        </div>
      </section>

      {/* 5. SECCIÓN: EXPERIENCIA, GARANTÍA & MÉTRICAS */}
      <section className="pt-6 sm:pt-8 pb-[calc(95px+env(safe-area-inset-bottom,0px))] sm:pb-[105px] bg-[#FAF7F2] border-b border-slate-200/60 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          {/* PRIMERO: TÍTULO "TU ENCOMIENDA CON LA MÁXIMA SEGURIDAD Y ELEGANCIA" */}
          <div className="text-center sm:text-left mb-4">
            <ScrollReveal direction="up" distance={15} duration={600}>
              <h2 className="font-display text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight">
                Tu Encomienda con la Máxima <br />
                <span className="font-serif italic font-normal text-amber-600">Seguridad y Elegancia</span>
              </h2>
            </ScrollReveal>
          </div>

          {/* LUEGO: EL CONJUNTO DE IMÁGENES */}
          <ScrollReveal direction="up" distance={15} duration={650} delay={80}>
            <div className="relative max-w-md mx-auto mb-4">
              <div className="grid grid-cols-12 gap-2.5 items-center">
                <div className="col-span-7 h-28 sm:h-36 rounded-2xl overflow-hidden shadow-xs border-2 border-white bg-slate-900 group">
                  <img 
                    src="/parcels/parcel-cargo-trunk.jpg" 
                    alt="Habitáculo de carga seguro" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                <div className="col-span-5 h-36 sm:h-44 rounded-2xl overflow-hidden shadow-xs border-2 border-white bg-slate-900 group">
                  <img 
                    src="/fleet/encomiendas-hero.jpg" 
                    alt="Vehículo de encomiendas" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                <div className="col-span-5 h-32 sm:h-40 -mt-4 sm:-mt-6 rounded-2xl overflow-hidden shadow-xs border-2 border-white bg-slate-900 group">
                  <img 
                    src="/parcels/parcel-secure-box.jpg" 
                    alt="Custodia VIP" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                <div className="col-span-7 h-28 sm:h-36 rounded-2xl overflow-hidden shadow-xs border-2 border-white bg-slate-900 group">
                  <img 
                    src="/parcels/parcel-executive-van-road.jpg" 
                    alt="Ruta interprovincial directa" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
              </div>

              {/* Sello Circular en el Centro */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#070A10] text-white flex items-center justify-center shadow-xl border-2 border-amber-400/80 group">
                  <svg className="w-full h-full p-1.5 animate-[spin_25s_linear_infinite]" viewBox="0 0 100 100">
                    <path id="circlePathCollage" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="none" />
                    <text className="text-[9px] uppercase font-black tracking-widest fill-amber-300">
                      <textPath href="#circlePathCollage" startOffset="0%">
                        • 100% SEGURO • PUERTA A PUERTA •
                      </textPath>
                    </text>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-400">
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* ABAJO DE LA IMAGEN: LAS MÉTRICAS */}
          <ScrollReveal direction="up" distance={15} duration={650} delay={140}>
            <div className="bg-[#070A10] rounded-2xl p-3.5 sm:p-5 border border-amber-500/25 shadow-lg grid grid-cols-3 divide-x divide-slate-800 max-w-md mx-auto mb-4">
              <div className="px-2 text-center first:pl-0">
                <span className="font-display font-black text-xl sm:text-2xl text-amber-400 block tracking-tight">
                  24/7
                </span>
                <span className="text-[10px] sm:text-xs font-semibold text-slate-300 block mt-0.5">
                  Monitoreo GPS
                </span>
              </div>

              <div className="px-2 text-center">
                <span className="font-display font-black text-xl sm:text-2xl text-amber-400 block tracking-tight">
                  0
                </span>
                <span className="text-[10px] sm:text-xs font-semibold text-slate-300 block mt-0.5">
                  Bodegas
                </span>
              </div>

              <div className="px-2 text-center last:pr-0">
                <span className="font-display font-black text-xl sm:text-2xl text-amber-400 block tracking-tight">
                  99.8%
                </span>
                <span className="text-[10px] sm:text-xs font-semibold text-slate-300 block mt-0.5">
                  Puntualidad
                </span>
              </div>
            </div>
          </ScrollReveal>

          {/* BARRA DE 4 ATRIBUTOS EN UNA SOLA FILA: ICONOS AUMENTADOS, SIN CONTENEDOR EXTERNO Y CON SEPARACIÓN DE 10PX */}
          <ScrollReveal direction="up" distance={15} duration={650} delay={200}>
            <div className="pt-4 border-t border-slate-200/80 max-w-sm mx-auto">
              <div className="grid grid-cols-4 gap-[10px]">
                
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-600 flex items-center justify-center shrink-0 mb-1.5 shadow-2xs">
                    <ShieldCheck className="w-6 h-6 text-amber-600 stroke-[2.2]" />
                  </div>
                  <span className="text-[10px] sm:text-xs font-bold text-slate-900 leading-tight">
                    Custodia VIP
                  </span>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-600 flex items-center justify-center shrink-0 mb-1.5 shadow-2xs">
                    <Clock className="w-6 h-6 text-amber-600 stroke-[2.2]" />
                  </div>
                  <span className="text-[10px] sm:text-xs font-bold text-slate-900 leading-tight">
                    Horario Flexible
                  </span>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-600 flex items-center justify-center shrink-0 mb-1.5 shadow-2xs">
                    <Navigation className="w-6 h-6 text-amber-600 stroke-[2.2]" />
                  </div>
                  <span className="text-[10px] sm:text-xs font-bold text-slate-900 leading-tight">
                    Cero Bodegas
                  </span>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-600 flex items-center justify-center shrink-0 mb-1.5 shadow-2xs">
                    <Headphones className="w-6 h-6 text-amber-600 stroke-[2.2]" />
                  </div>
                  <span className="text-[10px] sm:text-xs font-bold text-slate-900 leading-tight">
                    Soporte 24/7
                  </span>
                </div>

              </div>
            </div>
          </ScrollReveal>

          {/* Botón de Cotización ubicado a 15px sobre la barra de navegación inferior */}
          <div className="pt-4 text-center">
            <button
              onClick={() => onOpenQuote('Encomiendas Puerta a Puerta')}
              className="px-6 py-2.5 rounded-full bg-[#E11438] hover:bg-[#C20F2E] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer inline-flex items-center gap-2"
            >
              <span>Cotizar Ahora</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};
