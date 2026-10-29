import React, { useRef, useLayoutEffect, useEffect, useCallback, useMemo } from 'react';
import type { TabType } from '../../types';
import { Home, Car, Package, PawPrint, Phone } from 'lucide-react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MobileBottomNavProps {
  activeTab: TabType;
  onNavigate: (tab: TabType) => void;
}

interface NavItem {
  tab: TabType;
  label: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  activeColor: string;
}

// Generadores geométricos puros fuera del render para máximo rendimiento
const getBorderPath = (cx: number, w: number) => {
  const scoopHalfW = 48;
  const leftX = cx - scoopHalfW;
  const rightX = cx + scoopHalfW;
  const depth = 38;
  const endX = Math.max(w, 800);
  return `M -20,1.5 L ${Math.max(-20, leftX)},1.5 C ${cx - 26},1.5 ${cx - 15},${depth} ${cx},${depth} C ${cx + 15},${depth} ${cx + 26},1.5 ${rightX},1.5 L ${endX},1.5`;
};

const getBgPath = (cx: number, w: number) => {
  const scoopHalfW = 48;
  const leftX = cx - scoopHalfW;
  const rightX = cx + scoopHalfW;
  const depth = 38;
  const h = 48;
  const endX = Math.max(w, 800);
  return `M -20,1.5 L ${Math.max(-20, leftX)},1.5 C ${cx - 26},1.5 ${cx - 15},${depth} ${cx},${depth} C ${cx + 15},${depth} ${cx + 26},1.5 ${rightX},1.5 L ${endX},1.5 L ${endX},${h + 80} L -20,${h + 80} Z`;
};

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  onNavigate,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const borderPathRef = useRef<SVGPathElement>(null);
  const bgPathRef = useRef<SVGPathElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const navWidthRef = useRef<number>(
    typeof window !== 'undefined' ? window.innerWidth : 390
  );

  const navItems: NavItem[] = useMemo(() => [
    { tab: 'inicio', label: 'Inicio', icon: Home, activeColor: '#F59E0B' },
    { tab: 'servicios', label: 'Puerta a Puerta', icon: Car, activeColor: '#FBBF24' },
    { tab: 'encomiendas', label: 'Encomiendas', icon: Package, activeColor: '#F59E0B' },
    { tab: 'mascotas', label: 'Mascotas', icon: PawPrint, activeColor: '#FBBF24' },
    { tab: 'contactanos', label: 'Contacto', icon: Phone, activeColor: '#F59E0B' },
  ], []);

  const getActiveIndex = useCallback((): number => {
    const idx = navItems.findIndex((item) => item.tab === activeTab);
    return idx >= 0 ? idx : 0;
  }, [activeTab, navItems]);

  const activeIndex = getActiveIndex();

  // Física de resorte suave, sedosa y fluida (sin tirones)
  const rawX = useMotionValue(
    typeof window !== 'undefined' ? window.innerWidth / 2 : 195
  );
  const springX = useSpring(rawX, { stiffness: 220, damping: 26, mass: 0.9 });

  const updateNotchPosition = useCallback(() => {
    const activeItem = itemRefs.current[activeIndex];
    const menu = menuRef.current;
    if (activeItem && menu) {
      const activeRect = activeItem.getBoundingClientRect();
      const menuRect = menu.getBoundingClientRect();
      const centerX = activeRect.left - menuRect.left + activeRect.width / 2;
      navWidthRef.current = Math.max(
        menuRect.width || 0,
        window.innerWidth || 0,
        document.documentElement.clientWidth || 0,
        420
      );
      rawX.set(centerX);

      // Actualización directa inicial de los paths para evitar parpadeos
      if (borderPathRef.current && bgPathRef.current) {
        const w = navWidthRef.current;
        const currentCenter = rawX.get();
        borderPathRef.current.setAttribute('d', getBorderPath(currentCenter, w));
        bgPathRef.current.setAttribute('d', getBgPath(currentCenter, w));
      }
    }
  }, [activeIndex, rawX]);

  useLayoutEffect(() => {
    updateNotchPosition();
    const handleResize = () => {
      updateNotchPosition();
    };

    window.addEventListener('resize', handleResize);
    const rId = requestAnimationFrame(updateNotchPosition);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(rId);
    };
  }, [updateNotchPosition, activeTab]);

  // Actualización directa al DOM del SVG a 60-120fps (CERO re-renders de React)
  useEffect(() => {
    return springX.on('change', (cx) => {
      const w = navWidthRef.current;
      if (borderPathRef.current) {
        borderPathRef.current.setAttribute('d', getBorderPath(cx, w));
      }
      if (bgPathRef.current) {
        bgPathRef.current.setAttribute('d', getBgPath(cx, w));
      }
    });
  }, [springX]);

  const handleTabClick = (tab: TabType, _index: number) => {
    onNavigate(tab);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const initialW = typeof window !== 'undefined' ? Math.max(window.innerWidth, 420) : 420;
  const initialCx = initialW / 2;

  return (
    <nav
      ref={menuRef}
      className="fixed bottom-0 left-0 right-0 z-[100] h-[48px] w-full safe-area-pb select-none overflow-visible pointer-events-none"
    >
      {/* Respaldo sólido inferior para safe-area en teléfonos con fondo obsidian de Happy Travel */}
      <div className="absolute -bottom-10 left-0 right-0 h-10 bg-[#070A10] pointer-events-none -z-10" />

      {/* FONDO Y TRAZO SUPERIOR SVG DIRECTAMENTE MUTABLE (ULTRA-FLUIDO) */}
      <svg
        className="absolute inset-0 w-full h-[76px] pointer-events-none overflow-visible will-change-transform"
        style={{ filter: 'drop-shadow(0 -4px 18px rgba(0, 0, 0, 0.7))' }}
      >
        <defs>
          {/* Gradiente dorado / ámbar exclusivo de Happy Travel */}
          <linearGradient id="happy-travel-gold-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#B8860B" />
            <stop offset="25%" stopColor="#F59E0B" />
            <stop offset="50%" stopColor="#FBBF24" />
            <stop offset="75%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
          <filter id="happy-travel-glow" x="-10%" y="-30%" width="120%" height="160%">
            <feDropShadow dx="0" dy="1" stdDeviation="3" floodColor="#F59E0B" floodOpacity="0.55" />
          </filter>
        </defs>

        {/* Fondo oscuro 100% sólido (obsidian #070A10 de Happy Travel) */}
        <path
          ref={bgPathRef}
          d={getBgPath(initialCx, initialW)}
          fill="#070A10"
          fillOpacity="1"
        />

        {/* Trazo continuo con gradiente dorado ámbar (actualizado directo por ref) */}
        <path
          ref={borderPathRef}
          d={getBorderPath(initialCx, initialW)}
          fill="none"
          stroke="url(#happy-travel-gold-gradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
          filter="url(#happy-travel-glow)"
        />
      </svg>

      {/* CONTENEDOR DE LOS BOTONES CON ANIMACIÓN SUAVE */}
      <div className="flex items-center justify-around max-w-md mx-auto relative z-30 h-full pointer-events-auto px-1">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeIndex === index;

          return (
            <button
              key={item.tab}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              onClick={() => handleTabClick(item.tab, index)}
              className="relative flex-1 h-full flex items-center justify-center py-0.5 px-1 cursor-pointer select-none group"
              aria-label={item.label}
              title={item.label}
            >
              {/* CONTENEDOR DE ÍCONO: ELEVACIÓN AL SCOOP CON SPRING SUAVE */}
              <motion.div
                initial={false}
                animate={{
                  y: isActive ? -14 : 0,
                }}
                transition={{
                  duration: 0.34,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                whileTap={{ scale: 0.88 }}
                className="flex items-center justify-center will-change-transform"
              >
                {isActive ? (
                  <div className="w-[42px] h-[42px] rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-300 p-[2px] shadow-[0_4px_18px_rgba(245,158,11,0.6)] flex items-center justify-center">
                    <div className="w-full h-full rounded-full bg-[#070A10] flex items-center justify-center text-amber-400 border border-amber-500/25">
                      <Icon
                        className="w-[19px] h-[19px] stroke-[2.5]"
                        style={{ color: item.activeColor }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="w-8 h-8 flex items-center justify-center text-slate-400 group-hover:text-amber-300 transition-colors">
                    <Icon className="w-[19px] h-[19px] stroke-2" />
                  </div>
                )}
              </motion.div>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
