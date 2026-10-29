import React, { useState, useEffect, useRef } from 'react';
import { ScrollReveal } from './ScrollReveal';

interface CarDoorScrollExperienceProps {
  onOpenQuote?: (serviceType?: string) => void;
}

const TOTAL_FRAMES = 7; // frames 0 to 6

export const CarDoorScrollExperience: React.FC<CarDoorScrollExperienceProps> = ({ onOpenQuote }) => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Preload all frames on mount for buttery smooth 60fps frame scrubbing
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `/fleet/doors_sequence/frame_${i}.jpg`;
      images.push(img);
    }
  }, []);

  // Scroll listener to update car frame smoothly as user scrolls the tab/page
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!containerRef.current) return;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!containerRef.current) return;
          const rect = containerRef.current.getBoundingClientRect();
          const totalDistance = rect.height - window.innerHeight;

          if (totalDistance > 0) {
            // progress: 0 when top of container reaches top of viewport, 1 when bottom reaches bottom
            const progress = -rect.top / totalDistance;
            const clampedProgress = Math.max(0, Math.min(1, progress));
            const frame = Math.min(TOTAL_FRAMES - 1, Math.floor(clampedProgress * TOTAL_FRAMES));
            setCurrentFrame(frame);
          } else {
            // Fallback for smaller viewports
            const windowHeight = window.innerHeight;
            const start = windowHeight * 0.7;
            const end = -windowHeight * 0.3;
            const progress = (start - rect.top) / (start - end);
            const clamped = Math.max(0, Math.min(1, progress));
            setCurrentFrame(Math.min(TOTAL_FRAMES - 1, Math.floor(clamped * TOTAL_FRAMES)));
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stats = [
    { value: '45+', label: 'Vehículos de Lujo' },
    { value: '12k', label: 'Clientes Satisfechos' },
    { value: '98%', label: 'Tasa de Puntualidad' },
    { value: '19+', label: 'Años de Experiencia' },
  ];

  return (
    <section ref={containerRef} className="w-full relative h-[175vh] select-none">
      {/* Sticky Frame: pins during scroll and scrubs the doors seamlessly */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden">
        
        {/* Background split behind: top half #080A0E, bottom half #FFFFFF */}
        <div className="absolute inset-0 flex flex-col pointer-events-none -z-10">
          <div className="h-[55%] bg-[#080A0E]" />
          <div className="h-[45%] bg-white" />
        </div>

        {/* 1. Upper Dark Header & Metrics (matching Image 1) */}
        <div className="w-full pt-16 sm:pt-20 px-4 sm:px-6 lg:px-8 text-center text-white z-10">
          <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
            
            {/* Header Subtitle en Español */}
            <ScrollReveal direction="up" distance={15} delay={40}>
              <p className="text-slate-300 text-xs sm:text-sm lg:text-[15px] max-w-xl mx-auto font-normal tracking-wide leading-relaxed">
                La elección de confianza para miles de clientes que eligen nuestro servicio de chófer de lujo cada día
              </p>
            </ScrollReveal>

            {/* 4 Stats con Líneas Divisorias Verticales en Español */}
            <ScrollReveal direction="up" distance={20} delay={80}>
              <div className="grid grid-cols-2 md:grid-cols-4 items-center justify-center gap-y-6 md:gap-y-0 max-w-4xl mx-auto pt-1">
                {stats.map((stat, idx) => (
                  <div key={idx} className="relative flex flex-col items-center text-center px-4">
                    {idx > 0 && (
                      <span className="hidden md:block absolute left-0 top-1 bottom-1 w-[1px] bg-white/20" />
                    )}
                    <span className="font-display text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-white tracking-tight">
                      {stat.value}
                    </span>
                    <span className="text-xs sm:text-[13px] text-slate-400 font-medium mt-1 tracking-wide">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollReveal>

          </div>
        </div>

        {/* 2. Centered Car Stage on Horizon Line (No borders, no cards, pure car) */}
        <div className="relative w-full flex items-center justify-center px-4 sm:px-6 my-auto z-20">
          <div
            onClick={() => onOpenQuote?.('Flota VIP - Rolls-Royce Ghost')}
            className="w-full max-w-[1020px] mx-auto cursor-pointer"
            title="Rolls-Royce Ghost VIP"
          >
            <img
              src={`/fleet/doors_sequence/frame_${currentFrame}.jpg`}
              alt="Vehículo ejecutivo con puertas abatibles Rolls-Royce Ghost"
              className="w-full h-auto object-contain block mx-auto drop-shadow-2xl"
            />
          </div>
        </div>

        {/* 3. Bottom White Quote Area (matching Image 1 en Español) */}
        <div className="w-full pb-10 sm:pb-14 px-4 sm:px-6 text-center z-10">
          <div className="max-w-3xl mx-auto">
            <p className="font-sans text-xl sm:text-2xl lg:text-[28px] text-slate-900 font-bold tracking-tight">
              Nos aseguramos de que cada uno de sus viajes sea{' '}
              <span className="font-serif italic font-normal text-amber-700">lujoso.</span>
            </p>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
              Confort inigualable, privacidad absoluta y atención ejecutiva de primer nivel en todo el Ecuador.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
