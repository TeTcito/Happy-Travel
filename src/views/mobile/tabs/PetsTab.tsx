import React, { useRef } from 'react';
import { ScrollReveal } from '../../../components/ScrollReveal';
import { 
  ArrowRight,
  ArrowLeft,
  Camera,
  Star,
  ShieldCheck,
  Heart,
  Car
} from 'lucide-react';

interface PetsTabProps {
  onOpenQuote: (serviceType?: string) => void;
}

export const PetsTab: React.FC<PetsTabProps> = ({ onOpenQuote }) => {
  const wellnessCarouselRef = useRef<HTMLDivElement>(null);

  const scrollWellness = (direction: 'left' | 'right') => {
    if (wellnessCarouselRef.current) {
      const container = wellnessCarouselRef.current;
      const scrollAmount = container.clientWidth * 0.40;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const wellnessCards = [
    {
      id: 'acceso-superior',
      title: 'Acceso Superior',
      description: 'Facilita la entrada y salida de tu mascota de forma dócil y sin causarle ansiedad.',
      image: '/pets/pure_card_1.png',
      tag: 'Fácil Acceso'
    },
    {
      id: 'ventilacion-constante',
      title: 'Ventilación Constante',
      description: 'Múltiples rejillas y cabina climatizada para mantener un flujo de aire fresco y agradable.',
      image: '/pets/pure_card_2.png',
      tag: 'Aire Fresco'
    },
    {
      id: 'estructura-segura',
      title: 'Estructura Segura',
      description: 'Diseño resistente con cierre hermético y cama ultra suave para máxima protección en ruta.',
      image: '/pets/pure_card_3.png',
      tag: 'Protección Total'
    },
    {
      id: 'diseno-portatil',
      title: 'Diseño Portátil',
      description: 'Cómodo y ligero de transportar en cada parada y hasta la puerta de tu destino final.',
      image: '/pets/pure_card_4.png',
      tag: 'Transportable'
    }
  ];

  return (
    <div className="pb-20 bg-white text-slate-800">
      
      {/* 1. SECCIÓN HERO: FORMATO 16:9 EDGE-TO-EDGE */}
      <section className="relative w-full aspect-[16/9] overflow-hidden bg-slate-950">
        
        {/* FOTOGRAFÍA PANORÁMICA DE FONDO: MASCOTAS EN CARRETERA */}
        <img 
          src="/pets/hero_panoramic_pets.jpg" 
          alt="Mascotas viajando cómodas y seguras en Happy Travel"
          className="w-full h-full object-cover object-[82%_center] block"
        />
        
        {/* Degradado lateral izquierdo para alto contraste y legibilidad impecable */}
        <div className="absolute inset-y-0 left-0 w-[65%] sm:w-3/5 bg-gradient-to-r from-black/95 via-black/60 to-transparent pointer-events-none" />

        {/* CONTENIDO PRINCIPAL DEL HERO (A LA IZQUIERDA, MÁXIMO LA MITAD DE LA SECCIÓN) */}
        <div className="absolute inset-0 z-10 pt-[10px] sm:pt-4 pl-3.5 sm:pl-6 pr-2 pb-2 flex flex-col justify-center">
          <div className="max-w-[58%] sm:max-w-[52%] space-y-1 sm:space-y-1.5">
            
            {/* Título Principal (+50% tamaño y justificado) */}
            <ScrollReveal direction="up" distance={10} duration={600} delay={60}>
              <h1 className="font-serif text-[36px] sm:text-[48px] font-black text-white tracking-tight leading-[0.92] drop-shadow-2xl text-justify">
                Viajar con <br />
                <span className="italic font-bold text-amber-400 inline-block">Mascotas.</span>
              </h1>
            </ScrollReveal>

            {/* Mensaje resumido (+50% tamaño y justificado) */}
            <ScrollReveal direction="up" distance={8} duration={600} delay={120}>
              <p className="text-[15px] sm:text-[18px] text-slate-200/90 leading-snug font-normal drop-shadow-sm text-justify">
                Cabina climatizada, transportines acolchados, arnés seguro y paradas de hidratación.
              </p>
            </ScrollReveal>

            {/* Botón único de Cotizar Viaje */}
            <ScrollReveal direction="up" distance={8} duration={600} delay={180}>
              <div className="pt-1">
                <button
                  onClick={() => onOpenQuote('Transporte Exclusivo de Mascotas')}
                  className="inline-flex items-center gap-2 pl-3 sm:pl-3.5 pr-1.5 py-1 sm:py-1.5 rounded-full bg-white text-slate-950 hover:bg-slate-100 font-bold text-[10px] sm:text-xs uppercase tracking-wider transition-all shadow-xl active:scale-95 group cursor-pointer"
                >
                  <span>Cotizar Viaje</span>
                  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-amber-500 group-hover:bg-amber-600 flex items-center justify-center text-white transition-colors shadow-2xs">
                    <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </button>
              </div>
            </ScrollReveal>

          </div>
        </div>

      </section>

      {/* 2. SECCIÓN: 6 ATRIBUTOS VISUALES EN UNA SOLA FILA (+50% TAMAÑO) */}
      <section className="w-full max-w-5xl mx-auto px-1 sm:px-4 my-3.5 sm:my-5 overflow-hidden">
        <div className="grid grid-cols-6 gap-0.5 xs:gap-1 sm:gap-2 text-center items-start">
          
          {/* 1. VIAJES MÁS SEGUROS */}
          <div className="flex flex-col items-center">
            <div className="w-[52px] h-[52px] xs:w-[56px] xs:h-[56px] sm:w-[62px] sm:h-[62px] rounded-full overflow-hidden shadow-xs border border-amber-400/30">
              <img 
                src="/pets/icon_secure_travel.png" 
                alt="Viajes Seguros" 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="mt-1 text-[8.5px] sm:text-[10px] font-bold text-slate-800 leading-tight">
              Viajes<br />Seguros
            </span>
          </div>

          {/* 2. CONFORT EN RUTA */}
          <div className="flex flex-col items-center">
            <div className="w-[52px] h-[52px] xs:w-[56px] xs:h-[56px] sm:w-[62px] sm:h-[62px] rounded-full overflow-hidden shadow-xs border border-amber-400/30">
              <img 
                src="/pets/icon_comfort.png" 
                alt="Confort en Ruta" 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="mt-1 text-[8.5px] sm:text-[10px] font-bold text-slate-800 leading-tight">
              Confort<br />en Ruta
            </span>
          </div>

          {/* 3. TRAYECTOS SUAVES */}
          <div className="flex flex-col items-center">
            <div className="w-[52px] h-[52px] xs:w-[56px] xs:h-[56px] sm:w-[62px] sm:h-[62px] rounded-full overflow-hidden shadow-xs border border-amber-400/30">
              <img 
                src="/pets/icon_easier_ride.png" 
                alt="Trayectos Suaves" 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="mt-1 text-[8.5px] sm:text-[10px] font-bold text-slate-800 leading-tight">
              Trayectos<br />Suaves
            </span>
          </div>

          {/* 4. CERO ESTRÉS ANIMAL */}
          <div className="flex flex-col items-center">
            <div className="w-[52px] h-[52px] xs:w-[56px] xs:h-[56px] sm:w-[62px] sm:h-[62px] rounded-full overflow-hidden shadow-xs border border-amber-400/30">
              <img 
                src="/pets/icon_less_stress.png" 
                alt="Cero Estrés" 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="mt-1 text-[8.5px] sm:text-[10px] font-bold text-slate-800 leading-tight">
              Cero<br />Estrés
            </span>
          </div>

          {/* 5. CABINA CLIMATIZADA */}
          <div className="flex flex-col items-center">
            <div className="w-[52px] h-[52px] xs:w-[56px] xs:h-[56px] sm:w-[62px] sm:h-[62px] rounded-full overflow-hidden shadow-xs border border-amber-400/30">
              <img 
                src="/pets/icon_climate_control.png" 
                alt="Cabina Climatizada" 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="mt-1 text-[8.5px] sm:text-[10px] font-bold text-slate-800 leading-tight">
              Cabina<br />Climatizada
            </span>
          </div>

          {/* 6. PASEOS E HIDRATACIÓN */}
          <div className="flex flex-col items-center">
            <div className="w-[52px] h-[52px] xs:w-[56px] xs:h-[56px] sm:w-[62px] sm:h-[62px] rounded-full overflow-hidden shadow-xs border border-amber-400/30">
              <img 
                src="/pets/icon_hydration_walks.png" 
                alt="Paseos e Hidratación" 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="mt-1 text-[8.5px] sm:text-[10px] font-bold text-slate-800 leading-tight">
              Paseos &<br />Agua
            </span>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECCIÓN 3: BIENESTAR PARA TU MASCOTA (CARRUSEL 2.5 TARJETAS)
          - Título resumido a la izquierda sin mensaje debajo
          - Botones de navegación (izquierda/derecha) a la derecha cerca del margen
          - 2.5 tarjetas visibles en pantalla con carrusel horizontal fluido
      ========================================================================= */}
      <section className="py-5 sm:py-6 bg-[#FFFDF9] border-y border-slate-200/60 relative overflow-hidden mb-12">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* Cabecera: Título a la izquierda y botones de dirección a la derecha */}
          <div className="flex items-center justify-between gap-3 mb-3.5">
            <ScrollReveal direction="right" distance={15} duration={600} delay={60}>
              <h2 className="font-display text-lg sm:text-xl font-black text-slate-900 leading-tight">
                Bienestar de tu Mascota
              </h2>
            </ScrollReveal>

            {/* Botones de dirección a la derecha cerca del margen */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => scrollWellness('left')}
                className="w-7 h-7 rounded-full bg-white hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 transition-all shadow-2xs active:scale-95 cursor-pointer"
                aria-label="Anterior característica"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => scrollWellness('right')}
                className="w-7 h-7 rounded-full bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center transition-all shadow-2xs active:scale-95 cursor-pointer"
                aria-label="Siguiente característica"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Carrusel desplazable de 2.5 tarjetas (sin scrollbar interno) */}
          <div 
            ref={wellnessCarouselRef}
            className="-mx-4 px-4 flex gap-2.5 overflow-x-auto overflow-y-hidden pb-2.5 pt-1 scroll-smooth snap-x snap-mandatory no-scrollbar [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden touch-pan-x overscroll-x-contain scroll-pl-4 scroll-pr-4"
          >
            {wellnessCards.map((card, idx) => (
              <div 
                key={card.id}
                className="w-[38vw] sm:w-[165px] shrink-0 snap-start"
              >
                <ScrollReveal direction="up" distance={15} duration={500} delay={idx * 60}>
                  <div className="bg-white rounded-2xl overflow-hidden shadow-2xs hover:shadow-md transition-all duration-300 border border-slate-200/80 flex flex-col justify-between h-[244px] sm:h-[258px] group">
                    <div>
                      {/* Imagen ocupando el ancho del contenedor de la tarjeta */}
                      <div className="w-full h-22 sm:h-24 overflow-hidden relative bg-slate-100">
                        <img 
                          src={card.image} 
                          alt={card.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                        <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-md bg-black/75 backdrop-blur-xs text-white text-[7.5px] font-bold">
                          {card.tag}
                        </span>
                      </div>

                      <div className="p-2 sm:p-2.5 pb-1">
                        <h3 className="font-display font-extrabold text-[11px] sm:text-xs text-slate-900 group-hover:text-amber-600 transition-colors leading-tight line-clamp-1 mt-0.5">
                          {card.title}
                        </h3>

                        {/* Descripción concisa que entra completamente */}
                        <p className="text-[9.5px] sm:text-[10px] text-slate-500 leading-snug mt-1 line-clamp-3 font-normal">
                          {card.description}
                        </p>
                      </div>
                    </div>

                    {/* Botón inferior de acción (+10px altura vertical para holgura total) */}
                    <div className="p-2 sm:p-2.5 pt-2 pb-2.5 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => onOpenQuote(card.title)}
                        className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-600 hover:text-amber-700 transition-colors cursor-pointer group-hover:translate-x-0.5 duration-200"
                      >
                        <span>Cotizar</span>
                        <ArrowRight className="w-3 h-3" />
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

      {/* =========================================================================
          SECCIÓN NUEVA 1: HISTORIAS DE VIAJE DE NUESTROS CLIENTES
          - Ocupa todo el ancho (w-full)
          - Imágenes en alta resolución y cristalinas (perros y gatos)
          - Foto grande izquierda + Cita testimonial central + Grid 2x2 derecha
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 w-full">
        
        {/* Cabecera con icono de cámara y enlace a la derecha */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-50 text-amber-800 border border-amber-200/60 shadow-2xs">
              <Camera className="w-5 h-5 text-amber-700" />
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Historias de Viaje de Nuestros Clientes
            </h2>
          </div>

          <button
            onClick={() => onOpenQuote('Transporte Exclusivo de Mascotas')}
            className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-slate-800 hover:text-amber-600 transition-colors group cursor-pointer"
          >
            <span>Ver Todas las Historias</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-600 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Layout en 3 Columnas (Foto Principal, Testimonio Central, Grid 2x2) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          
          {/* Columna Izquierda: Foto Grande Principal (Ultra HD) */}
          <div className="lg:col-span-4 flex">
            <ScrollReveal direction="left" distance={30} duration={700} delay={80} className="w-full">
              <div className="rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-auto lg:h-full border border-slate-200/80 shadow-clean bg-slate-100 group">
                <img 
                  src="/pets/story_hero_dog.jpg" 
                  alt="Mascota feliz en viaje junto a lago de montaña" 
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700"
                />
              </div>
            </ScrollReveal>
          </div>

          {/* Columna Central: Cita Testimonial Destacada */}
          <div className="lg:col-span-4 flex">
            <ScrollReveal direction="up" distance={25} duration={700} delay={140} className="w-full">
              <div className="h-full bg-[#FFFDF9] border border-amber-200/70 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-clean">
                <div className="space-y-4">
                  <h3 className="font-serif text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                    “¡Nuestro viaje por carretera fue increíble!”
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    El servicio fue súper puntual, cómodo y sin nada de estrés para mi peludo. Los conductores son atentos, el vehículo impecable y las paradas de hidratación hicieron que el viaje fuera un paseo feliz. ¡100% recomendado!
                  </p>
                </div>

                <div className="pt-6 border-t border-amber-100/80 space-y-2">
                  <p className="text-xs sm:text-sm font-bold text-slate-800">
                    — Jessica y Cooper
                  </p>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Columna Derecha: Grid 2x2 de 4 Fotos Nítidas (Perros y Gatos) */}
          <div className="lg:col-span-4">
            <ScrollReveal direction="right" distance={30} duration={700} delay={200}>
              <div className="grid grid-cols-2 gap-3 h-full">
                {/* 1. Perro en auto */}
                <div className="rounded-2xl overflow-hidden aspect-[4/3] border border-slate-200/80 shadow-2xs group bg-slate-100">
                  <img 
                    src="/pets/story_grid_1.jpg" 
                    alt="Perro feliz en asiento de auto con cinturón" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {/* 2. Gato relajado en cabina */}
                <div className="rounded-2xl overflow-hidden aspect-[4/3] border border-slate-200/80 shadow-2xs group bg-slate-100">
                  <img 
                    src="/pets/story_grid_2.jpg" 
                    alt="Gato tranquilo y cómodo en cabina climatizada" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {/* 3. Cachorro en cama de viaje */}
                <div className="rounded-2xl overflow-hidden aspect-[4/3] border border-slate-200/80 shadow-2xs group bg-slate-100">
                  <img 
                    src="/pets/story_grid_3.jpg" 
                    alt="Perrito cómodo en cama de viaje" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {/* 4. Gato esponjoso en viaje */}
                <div className="rounded-2xl overflow-hidden aspect-[4/3] border border-slate-200/80 shadow-2xs group bg-slate-100">
                  <img 
                    src="/pets/story_grid_4.jpg" 
                    alt="Gato esponjoso disfrutando viaje tranquilo" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECCIÓN NUEVA 2: BANNER DE SERVICIO PRIVADO & SEGURIDAD VIP (SIN PRECIOS)
          - Ancho completo de la página (w-full edge-to-edge)
          - La imagen cubre tanto verticalmente como hasta el lateral izquierdo sin márgenes vacíos
          - El contenido se adapta de forma fluida a todo el ancho
      ========================================================================= */}
      <section className="relative w-full bg-[#0B1A2C] border-y border-amber-500/20 overflow-hidden text-white mb-16">
        <div className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[460px] lg:min-h-[420px]">
            
            {/* FOTOGRAFÍA LATERAL FLUSH: CUBRE 100% VERTICAL Y HASTA EL BORDE LATERAL IZQUIERDO */}
            <ScrollReveal direction="left" distance={35} duration={750} delay={60} className="lg:col-span-4 xl:col-span-4 relative h-64 sm:h-80 lg:h-auto min-h-full">
              <img 
                src="/pets/safety_bundle_gear.jpg" 
                alt="Equipamiento completo de seguridad para mascotas" 
                className="w-full h-full object-cover object-center"
              />
              {/* Degradado para fundir la imagen hacia el fondo oscuro */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0B1A2C] hidden lg:block"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1A2C] via-transparent to-transparent lg:hidden"></div>
            </ScrollReveal>

            {/* CONTENIDO ADAPTADO AL ANCHO COMPLETO */}
            <div className="lg:col-span-8 xl:col-span-8 py-8 sm:py-10 lg:py-12 px-5 sm:px-8 lg:px-12 flex flex-col justify-center">
              <div className="max-w-2xl space-y-4 text-left">
                
                {/* Título Principal (Sin la etiqueta superior) */}
                <ScrollReveal direction="up" distance={20} duration={600} delay={80}>
                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">
                    Viaje Privado & <br />
                    <span className="text-amber-400 font-serif italic">Máxima Seguridad</span>
                  </h3>
                </ScrollReveal>

                {/* Mensaje descriptivo */}
                <ScrollReveal direction="up" distance={15} duration={600} delay={120}>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    Al contratar nuestro servicio privado, la unidad es 100% exclusiva para ti y tu mascota. Sin compartir espacio con desconocidos ni otros animales, con chofer capacitado en bienestar animal, cabina climatizada y supervisión continua en carretera.
                  </p>
                </ScrollReveal>

                {/* Botón de Cotización */}
                <ScrollReveal direction="up" distance={15} duration={600} delay={160}>
                  <div className="pt-1">
                    <button
                      onClick={() => onOpenQuote('Transporte Exclusivo de Mascotas')}
                      className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 border border-amber-200 shadow-xl text-xs uppercase tracking-wider transition-all hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      <span>Cotizar Servicio Privado</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
                    </button>
                  </div>
                </ScrollReveal>

                {/* 3 ICONOS EN UNA SOLA FILA ABAJO DEL TEXTO */}
                <ScrollReveal direction="up" distance={20} duration={700} delay={200}>
                  <div className="pt-5 mt-4 border-t border-white/10">
                    <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
                      
                      {/* Pilar 1 */}
                      <div className="flex flex-col items-center">
                        <div className="p-2 sm:p-2.5 rounded-xl bg-amber-500/10 border border-amber-400/30 text-amber-400 mb-1.5 shrink-0">
                          <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <h4 className="font-bold text-white text-[11px] sm:text-xs leading-tight">Seguridad VIP</h4>
                        <p className="text-[9.5px] text-slate-400 mt-0.5 leading-tight">Arnés certificado</p>
                      </div>

                      {/* Pilar 2 */}
                      <div className="flex flex-col items-center">
                        <div className="p-2 sm:p-2.5 rounded-xl bg-amber-500/10 border border-amber-400/30 text-amber-400 mb-1.5 shrink-0">
                          <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <h4 className="font-bold text-white text-[11px] sm:text-xs leading-tight">100% Dedicado</h4>
                        <p className="text-[9.5px] text-slate-400 mt-0.5 leading-tight">Fotos en WhatsApp</p>
                      </div>

                      {/* Pilar 3 */}
                      <div className="flex flex-col items-center">
                        <div className="p-2 sm:p-2.5 rounded-xl bg-amber-500/10 border border-amber-400/30 text-amber-400 mb-1.5 shrink-0">
                          <Car className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <h4 className="font-bold text-white text-[11px] sm:text-xs leading-tight">Cualquier Ruta</h4>
                        <p className="text-[9.5px] text-slate-400 mt-0.5 leading-tight">Traslados directos</p>
                      </div>

                    </div>
                  </div>
                </ScrollReveal>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECCIÓN NUEVA 3: SIGUE NUESTRAS AVENTURAS (@happytravel.pets)
          - Imágenes en alta resolución nítidas de perros Y gatos
          - Galería fluida de 6 fotografías
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 w-full">
        
        {/* Cabecera de la Galería */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
              Sigue Nuestras Aventuras
            </h3>
            <span className="text-xs sm:text-sm font-semibold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
              @happytravel.pets
            </span>
          </div>

          <p className="text-xs text-slate-500 font-medium hidden sm:block">
            Momentos reales de nuestros consentidos en carretera
          </p>
        </div>

        {/* Grid de 6 Fotos de Aventuras (Perros y Gatos en Ultra HD) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          
          {/* 1. Perro en ventana de auto */}
          <ScrollReveal direction="left" distance={20} duration={600} delay={60}>
            <div className="rounded-2xl overflow-hidden aspect-[4/3] border border-slate-200/80 shadow-2xs group bg-slate-100">
              <img 
                src="/pets/gallery_1.jpg" 
                alt="Perro asomado en la ventana del vehículo en carretera" 
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
              />
            </div>
          </ScrollReveal>

          {/* 2. Gato con gafas de sol */}
          <ScrollReveal direction="down" distance={20} duration={600} delay={100}>
            <div className="rounded-2xl overflow-hidden aspect-[4/3] border border-slate-200/80 shadow-2xs group bg-slate-100">
              <img 
                src="/pets/gallery_2.jpg" 
                alt="Gato genial con gafas de sol viajando de vacaciones" 
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
              />
            </div>
          </ScrollReveal>

          {/* 3. Perro en descanso de ruta */}
          <ScrollReveal direction="up" distance={20} duration={600} delay={140}>
            <div className="rounded-2xl overflow-hidden aspect-[4/3] border border-slate-200/80 shadow-2xs group bg-slate-100">
              <img 
                src="/pets/gallery_3.jpg" 
                alt="Perro feliz en descanso de carretera" 
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
              />
            </div>
          </ScrollReveal>

          {/* 4. Gato curioso mirando la ruta */}
          <ScrollReveal direction="up" distance={20} duration={600} delay={180}>
            <div className="rounded-2xl overflow-hidden aspect-[4/3] border border-slate-200/80 shadow-2xs group bg-slate-100">
              <img 
                src="/pets/gallery_4.jpg" 
                alt="Gatito curioso disfrutando del paisaje en carretera" 
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
              />
            </div>
          </ScrollReveal>

          {/* 5. Perro y gato juntos */}
          <ScrollReveal direction="down" distance={20} duration={600} delay={220}>
            <div className="rounded-2xl overflow-hidden aspect-[4/3] border border-slate-200/80 shadow-2xs group bg-slate-100">
              <img 
                src="/pets/gallery_5.jpg" 
                alt="Perro y gato viajando juntos como hermanos" 
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
              />
            </div>
          </ScrollReveal>

          {/* 6. Cachorro feliz */}
          <ScrollReveal direction="right" distance={20} duration={600} delay={260}>
            <div className="rounded-2xl overflow-hidden aspect-[4/3] border border-slate-200/80 shadow-2xs group bg-slate-100">
              <img 
                src="/pets/gallery_6.jpg" 
                alt="Cachorro sonriente en parada de paseo" 
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
              />
            </div>
          </ScrollReveal>

        </div>
      </section>

    </div>
  );
};
