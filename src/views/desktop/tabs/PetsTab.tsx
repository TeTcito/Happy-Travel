import React from 'react';
import { ScrollReveal } from '../../../components/ScrollReveal';
import { 
  ArrowRight,
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

  return (
    <div className="pb-16 bg-white text-slate-800">
      
      {/* =========================================================================
          SECCIÓN 1: HERO DE ANCHO COMPLETO EDGE-TO-EDGE
          - 100% en Español
          - Título en exactamente 2 líneas con colores puros de alto contraste
          - Fondo con desenfoque suave sobre el texto y lado derecho 100% nítido
          - Botón único: "Cotizar Viaje"
      ========================================================================= */}
      <section className="relative w-full min-h-[580px] sm:min-h-[640px] lg:min-h-[720px] flex items-center overflow-hidden bg-slate-950">
        
        {/* FOTOGRAFÍA PANORÁMICA DE FONDO (ANCHO COMPLETO) */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/pets/hero_panoramic_pets.jpg" 
            alt="Mascotas viajando cómodas y seguras en Happy Travel"
            className="w-full h-full object-cover object-[80%_center] sm:object-[75%_center] md:object-[70%_center] lg:object-right"
          />
          
          {/* DESENFOQUE ÓPTICO LOCALIZADO EXCLUSIVAMENTE SOBRE EL ÁREA DEL TEXTO:
              Oscurecimiento suave cinematográfico con desenfoque bokeh a la izquierda
              para que el texto puro (blanco y dorado) resalte con máxima definición,
              desvaneciéndose suavemente a la derecha para que las mascotas se vean 100% claras */}
          <div 
            className="absolute inset-y-0 left-0 w-full lg:w-[60%] backdrop-blur-md bg-black/45 z-[1] pointer-events-none"
            style={{
              WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 60%, rgba(0,0,0,0) 100%)',
              maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 60%, rgba(0,0,0,0) 100%)'
            }}
          />
        </div>

        {/* CONTENIDO PRINCIPAL DEL HERO */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28 relative z-10 w-full">
          <div className="max-w-2xl space-y-6">
            
            {/* Titular Principal en 2 Líneas 100% en Español con Colores Puros de Máximo Contraste */}
            <ScrollReveal direction="left" distance={35} duration={750} delay={80}>
              <div>
                <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.06] drop-shadow-[0_2px_14px_rgba(0,0,0,0.8)]">
                  Viajar con <span className="text-amber-400 font-serif italic drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">Mascotas</span> <br />
                  es Más Fácil
                </h1>
                
                {/* Subtítulo en Oro Luminoso de Gran Contraste */}
                <p className="mt-4 text-xs sm:text-sm md:text-base font-extrabold uppercase tracking-widest text-amber-300 font-sans drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
                  Una Forma Cómoda y Segura de Viajar Juntos
                </p>
              </div>
            </ScrollReveal>

            {/* Mensaje Descriptivo en Blanco Puro y Luminoso */}
            <ScrollReveal direction="left" distance={25} duration={750} delay={180}>
              <p className="text-sm sm:text-base lg:text-lg text-white font-medium leading-relaxed max-w-xl drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)]">
                Sabemos que son familia. En <strong className="font-bold text-amber-300 underline decoration-amber-400/50 underline-offset-4">Happy Travel</strong> jamás enviamos una mascota a un maletero cerrado o bodega de carga. Viajan en cabina climatizada con transportines acolchados, arnés seguro, paradas de hidratación en carretera y reporte fotográfico en tiempo real.
              </p>
            </ScrollReveal>

            {/* Botón Único de Acción: "Cotizar Viaje" */}
            <ScrollReveal direction="up" distance={20} duration={700} delay={260}>
              <div className="pt-2">
                <button
                  onClick={() => onOpenQuote('Transporte Exclusivo de Mascotas')}
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 border border-amber-200 shadow-xl text-xs uppercase tracking-wider transition-all hover:scale-105 active:scale-95 group cursor-pointer"
                >
                  <span>Cotizar Viaje</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-950 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </ScrollReveal>

          </div>
        </div>

      </section>

      {/* =========================================================================
          SECCIÓN DE 6 ATRIBUTOS VISUALES
          - Separación exacta de SOLO 20px verticalmente desde el Hero (mt-[20px])
          - Tamaño de iconos aumentado en 20px (de ~96px a 116px)
          - Separación exacta de 10px entre iconos (gap-[10px])
          - Sin contenedor externo que deje márgenes en blanco
      ========================================================================= */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-[20px] mb-14 sm:mb-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-[10px]">
          
          {/* 1. VIAJES MÁS SEGUROS */}
          <ScrollReveal direction="left" distance={25} duration={600} delay={60}>
            <div className="flex flex-col items-center text-center group cursor-default">
              <div className="w-[100px] h-[100px] sm:w-[110px] sm:h-[110px] md:w-[116px] md:h-[116px] rounded-full overflow-hidden shadow-md group-hover:scale-108 transition-all duration-300">
                <img 
                  src="/pets/icon_secure_travel.png" 
                  alt="Seguridad certificada para mascotas" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="mt-3.5 font-black text-xs sm:text-sm uppercase tracking-wider text-slate-900 leading-tight font-sans">
                VIAJES MÁS<br />SEGUROS
              </h3>
              <p className="mt-1 text-[11px] text-slate-500 font-medium">Seguridad Total</p>
            </div>
          </ScrollReveal>

          {/* 2. CONFORT EN RUTA */}
          <ScrollReveal direction="down" distance={20} duration={600} delay={120}>
            <div className="flex flex-col items-center text-center group cursor-default">
              <div className="w-[100px] h-[100px] sm:w-[110px] sm:h-[110px] md:w-[116px] md:h-[116px] rounded-full overflow-hidden shadow-md group-hover:scale-108 transition-all duration-300">
                <img 
                  src="/pets/icon_comfort.png" 
                  alt="Confort y camas suaves para mascotas" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="mt-3.5 font-black text-xs sm:text-sm uppercase tracking-wider text-slate-900 leading-tight font-sans">
                CONFORT<br />EN RUTA
              </h3>
              <p className="mt-1 text-[11px] text-slate-500 font-medium">Comodidad Plena</p>
            </div>
          </ScrollReveal>

          {/* 3. TRAYECTOS SUAVES */}
          <ScrollReveal direction="up" distance={20} duration={600} delay={180}>
            <div className="flex flex-col items-center text-center group cursor-default">
              <div className="w-[100px] h-[100px] sm:w-[110px] sm:h-[110px] md:w-[116px] md:h-[116px] rounded-full overflow-hidden shadow-md group-hover:scale-108 transition-all duration-300">
                <img 
                  src="/pets/icon_easier_ride.png" 
                  alt="Conducción suave y sin mareos" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="mt-3.5 font-black text-xs sm:text-sm uppercase tracking-wider text-slate-900 leading-tight font-sans">
                TRAYECTOS<br />SUAVES
              </h3>
              <p className="mt-1 text-[11px] text-slate-500 font-medium">Cero Mareos</p>
            </div>
          </ScrollReveal>

          {/* 4. CERO ESTRÉS ANIMAL */}
          <ScrollReveal direction="down" distance={20} duration={600} delay={240}>
            <div className="flex flex-col items-center text-center group cursor-default">
              <div className="w-[100px] h-[100px] sm:w-[110px] sm:h-[110px] md:w-[116px] md:h-[116px] rounded-full overflow-hidden shadow-md group-hover:scale-108 transition-all duration-300">
                <img 
                  src="/pets/icon_less_stress.png" 
                  alt="Cero estrés y tranquilidad animal" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="mt-3.5 font-black text-xs sm:text-sm uppercase tracking-wider text-slate-900 leading-tight font-sans">
                CERO ESTRÉS<br />ANIMAL
              </h3>
              <p className="mt-1 text-[11px] text-slate-500 font-medium">Calma y Paz</p>
            </div>
          </ScrollReveal>

          {/* 5. CABINA CLIMATIZADA */}
          <ScrollReveal direction="up" distance={20} duration={600} delay={300}>
            <div className="flex flex-col items-center text-center group cursor-default">
              <div className="w-[100px] h-[100px] sm:w-[110px] sm:h-[110px] md:w-[116px] md:h-[116px] rounded-full overflow-hidden shadow-md group-hover:scale-108 transition-all duration-300">
                <img 
                  src="/pets/icon_climate_control.png" 
                  alt="Cabina con climatización y aire fresco" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="mt-3.5 font-black text-xs sm:text-sm uppercase tracking-wider text-slate-900 leading-tight font-sans">
                CABINA<br />CLIMATIZADA
              </h3>
              <p className="mt-1 text-[11px] text-slate-500 font-medium">Aire Puro y Fresco</p>
            </div>
          </ScrollReveal>

          {/* 6. PASEOS E HIDRATACIÓN */}
          <ScrollReveal direction="right" distance={25} duration={600} delay={360}>
            <div className="flex flex-col items-center text-center group cursor-default">
              <div className="w-[100px] h-[100px] sm:w-[110px] sm:h-[110px] md:w-[116px] md:h-[116px] rounded-full overflow-hidden shadow-md group-hover:scale-108 transition-all duration-300">
                <img 
                  src="/pets/icon_hydration_walks.png" 
                  alt="Paradas de hidratación y paseos" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="mt-3.5 font-black text-xs sm:text-sm uppercase tracking-wider text-slate-900 leading-tight font-sans">
                PASEOS E<br />HIDRATACIÓN
              </h3>
              <p className="mt-1 text-[11px] text-slate-500 font-medium">Paradas Seguras</p>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* =========================================================================
          SECCIÓN 2: 4 TARJETAS DE CARACTERÍSTICAS Y EQUIPAMIENTO (100% EN ESPAÑOL)
          Sin la etiqueta encima del título
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        
        {/* Cabecera de la Sección 2 (Limpia, sin etiqueta encima del título) */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <ScrollReveal direction="up" distance={20} duration={700} delay={60}>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Diseñado para el Bienestar de tu <span className="text-amber-600 font-serif italic">Mascota</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" distance={20} duration={700} delay={120}>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              Cada transportín y vehículo cuenta con especificaciones de confort certificadas para que perros y gatos viajen tranquilos, frescos y protegidos en cualquier ruta.
            </p>
          </ScrollReveal>
        </div>

        {/* Grid de 4 Tarjetas de Características */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6">
          
          {/* Tarjeta 1: ACCESO SUPERIOR */}
          <ScrollReveal direction="left" distance={28} duration={700} delay={80}>
            <div className="group flex flex-col h-full bg-[#FFFDF9] rounded-3xl p-3.5 border border-slate-200/80 hover:border-amber-500/40 shadow-clean hover:shadow-card-hover transition-all">
              <div className="aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/60 shadow-2xs">
                <img 
                  src="/pets/pure_card_1.png" 
                  alt="Acceso superior fácil para mascotas" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="pt-4 pb-2 px-1 text-center flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-black text-slate-900 text-sm sm:text-base tracking-wide uppercase font-sans">
                    ACCESO SUPERIOR
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    Facilita la entrada y salida de tu mascota de forma dócil y sin forzarla ni causarle ansiedad.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Tarjeta 2: VENTILACIÓN CONSTANTE */}
          <ScrollReveal direction="up" distance={24} duration={700} delay={140}>
            <div className="group flex flex-col h-full bg-[#FFFDF9] rounded-3xl p-3.5 border border-slate-200/80 hover:border-amber-500/40 shadow-clean hover:shadow-card-hover transition-all">
              <div className="aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/60 shadow-2xs">
                <img 
                  src="/pets/pure_card_2.png" 
                  alt="Flujo de aire constante y rejillas de ventilación" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="pt-4 pb-2 px-1 text-center flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-black text-slate-900 text-sm sm:text-base tracking-wide uppercase font-sans">
                    VENTILACIÓN CONSTANTE
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    Múltiples rejillas y cabina climatizada para mantener un flujo de aire fresco y agradable.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Tarjeta 3: ESTRUCTURA SEGURA */}
          <ScrollReveal direction="up" distance={24} duration={700} delay={200}>
            <div className="group flex flex-col h-full bg-[#FFFDF9] rounded-3xl p-3.5 border border-slate-200/80 hover:border-amber-500/40 shadow-clean hover:shadow-card-hover transition-all">
              <div className="aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/60 shadow-2xs">
                <img 
                  src="/pets/pure_card_3.png" 
                  alt="Estructura rígida y segura con puerta reforzada" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="pt-4 pb-2 px-1 text-center flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-black text-slate-900 text-sm sm:text-base tracking-wide uppercase font-sans">
                    ESTRUCTURA SEGURA
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    Diseño resistente con cierre hermético y cama ultra suave para máxima protección en carretera.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Tarjeta 4: DISEÑO PORTÁTIL */}
          <ScrollReveal direction="right" distance={28} duration={700} delay={260}>
            <div className="group flex flex-col h-full bg-[#FFFDF9] rounded-3xl p-3.5 border border-slate-200/80 hover:border-amber-500/40 shadow-clean hover:shadow-card-hover transition-all">
              <div className="aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/60 shadow-2xs">
                <img 
                  src="/pets/pure_card_4.png" 
                  alt="Diseño portátil con asa ergonómica" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="pt-4 pb-2 px-1 text-center flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-black text-slate-900 text-sm sm:text-base tracking-wide uppercase font-sans">
                    DISEÑO PORTÁTIL
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    Cómodo y ligero de transportar en cada parada y hasta la puerta de tu destino final.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

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
            <div className="lg:col-span-8 xl:col-span-8 py-10 sm:py-12 lg:py-14 px-6 sm:px-10 lg:px-12 xl:px-16 flex flex-col justify-center">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                
                {/* Columna de Texto: Propuesta de Seguridad VIP (Sin Precios) */}
                <ScrollReveal direction="up" distance={25} duration={700} delay={120} className="lg:col-span-7 space-y-4 text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-[10px] font-black uppercase tracking-widest">
                    <span>SERVICIO EXCLUSIVO PUERTA A PUERTA</span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-white leading-tight">
                    Viaje Privado & <br />
                    <span className="text-amber-400 font-serif italic">Máxima Seguridad</span>
                  </h3>

                  <p className="text-xs sm:text-sm lg:text-base text-slate-300 leading-relaxed font-normal max-w-xl">
                    Al contratar nuestro servicio privado, la unidad es 100% exclusiva para ti y tu mascota. Sin compartir espacio con desconocidos ni otros animales, con chofer capacitado en bienestar animal, cabina climatizada y supervisión continua en carretera.
                  </p>

                  <div className="pt-2">
                    <button
                      onClick={() => onOpenQuote('Transporte Exclusivo de Mascotas')}
                      className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 border border-amber-200 shadow-xl text-xs uppercase tracking-wider transition-all hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      <span>Cotizar Servicio Privado</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
                    </button>
                  </div>
                </ScrollReveal>

                {/* Columna de 3 Pilares de Seguridad con Iconos Ámbar */}
                <ScrollReveal direction="right" distance={30} duration={750} delay={180} className="lg:col-span-5 space-y-4 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-white/10 lg:pl-8">
                  
                  {/* Pilar 1 */}
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-400/30 text-amber-400 shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-xs sm:text-sm">Calidad y Seguridad VIP</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">Arnés certificado y vehículo higienizado.</p>
                    </div>
                  </div>

                  {/* Pilar 2 */}
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-400/30 text-amber-400 shrink-0">
                      <Heart className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-xs sm:text-sm">Atención 100% Dedicada</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">Fotos y videos en tiempo real por WhatsApp.</p>
                    </div>
                  </div>

                  {/* Pilar 3 */}
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-400/30 text-amber-400 shrink-0">
                      <Car className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-xs sm:text-sm">Ideal para Cualquier Ruta</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">Traslados directos sin desvíos ni esperas.</p>
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
