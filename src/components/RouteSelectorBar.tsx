import React, { useState } from 'react';
import { 
  ArrowRight, 
  Car,
  MapPin
} from 'lucide-react';
import { RouteMapModal, type RouteSelectionData } from './RouteMapModal';

interface RouteSelectorBarProps {
  onOpenQuote: (serviceType?: string, origin?: string, destination?: string) => void;
}

const POPULAR_ZONES = [
  'La Carolina, Quito',
  'Iñaquito, Quito',
  'La Mariscal, Quito',
  'Cumbayá, Quito',
  'Aeropuerto Tababela (UIO)',
  'Urdesa, Guayaquil',
  'Kennedy Norte, Guayaquil',
  'Samborondón / La Puntilla',
  'Mall del Sol, Guayaquil',
  'Aeropuerto de Guayaquil (GYE)',
  'Centro Histórico, Cuenca',
  'El Vergel, Cuenca',
  'Manta (Barbasquillo)',
  'Ambato (Ficoa / Centro)',
  'Baños de Agua Santa',
  'Santo Domingo',
  'Salinas / Chipipe',
];

export const RouteSelectorBar: React.FC<RouteSelectorBarProps> = ({ onOpenQuote }) => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [distanceKm, setDistanceKm] = useState<number | null>(null);
  const [durationText, setDurationText] = useState<string | null>(null);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [mapStep, setMapStep] = useState<'origin' | 'destination'>('origin');

  const handleRouteConfirmed = (data: RouteSelectionData) => {
    if (data.origin) setOrigin(data.origin.name);
    if (data.destination) setDestination(data.destination.name);
    if (data.distanceKm) setDistanceKm(data.distanceKm);
    if (data.durationText) setDurationText(data.durationText);
  };

  const openMapAtStep = (step: 'origin' | 'destination') => {
    setMapStep(step);
    setIsMapOpen(true);
  };

  const handleQuoteClick = () => {
    const orig = origin.trim() || 'Por definir';
    const dest = destination.trim() || 'Por definir';
    onOpenQuote('Transporte Puerta a Puerta Privado', orig, dest);
  };

  return (
    <div className="w-full max-w-[740px] mx-auto">
      {/* Barra Principal con Fondo Blanco Puro y Bloques en Contraste */}
      <div className="bg-white rounded-2xl p-1.5 sm:p-2.5 shadow-[0_10px_35px_rgba(0,0,0,0.15)] border border-slate-200/90">
        <div className="flex flex-row items-center gap-1.5 sm:gap-2">
          
          {/* Bloque 1: INICIO */}
          <div
            onClick={() => {
              if (!origin) openMapAtStep('origin');
            }}
            className="flex-1 min-w-0 flex items-center bg-slate-100 hover:bg-slate-200/70 focus-within:bg-slate-100 focus-within:ring-2 focus-within:ring-slate-900/15 border border-slate-200/90 rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 transition-all cursor-pointer"
          >
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-500 shrink-0 mr-1.5 sm:mr-2 shadow-[0_0_6px_rgba(16,185,129,0.5)]" />
            <div className="flex-1 min-w-0" onClick={(e) => e.stopPropagation()}>
              <label className="hidden sm:block text-[9px] uppercase font-extrabold text-slate-500 tracking-wider leading-none">
                Inicio
              </label>
              <input
                type="text"
                list="popular-origins"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    openMapAtStep('origin');
                  }
                }}
                placeholder="Inicio..."
                className="w-full bg-transparent text-slate-900 text-[11px] sm:text-xs font-semibold placeholder:text-slate-400 placeholder:font-medium focus:outline-none truncate"
              />
              <datalist id="popular-origins">
                {POPULAR_ZONES.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                openMapAtStep('origin');
              }}
              title="Abrir mapa interactivo / Google Maps"
              aria-label="Abrir mapa interactivo de origen"
              className="ml-1 p-1 rounded-md bg-white hover:bg-emerald-50 text-emerald-600 border border-emerald-200/80 shadow-xs transition-colors shrink-0 cursor-pointer active:scale-90"
            >
              <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600 fill-emerald-100/50" />
            </button>
          </div>

          {/* Bloque 2: DESTINO */}
          <div
            onClick={() => {
              if (!destination) openMapAtStep('destination');
            }}
            className="flex-1 min-w-0 flex items-center bg-slate-100 hover:bg-slate-200/70 focus-within:bg-slate-100 focus-within:ring-2 focus-within:ring-slate-900/15 border border-slate-200/90 rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 transition-all cursor-pointer"
          >
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-amber-500 shrink-0 mr-1.5 sm:mr-2 shadow-[0_0_6px_rgba(245,158,11,0.5)]" />
            <div className="flex-1 min-w-0" onClick={(e) => e.stopPropagation()}>
              <label className="hidden sm:block text-[9px] uppercase font-extrabold text-slate-500 tracking-wider leading-none">
                Destino
              </label>
              <input
                type="text"
                list="popular-destinations"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    openMapAtStep('destination');
                  }
                }}
                placeholder="Destino..."
                className="w-full bg-transparent text-slate-900 text-[11px] sm:text-xs font-semibold placeholder:text-slate-400 placeholder:font-medium focus:outline-none truncate"
              />
              <datalist id="popular-destinations">
                {POPULAR_ZONES.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                openMapAtStep('destination');
              }}
              title="Abrir mapa interactivo / Google Maps"
              aria-label="Abrir mapa interactivo de destino"
              className="ml-1 p-1 rounded-md bg-white hover:bg-amber-50 text-amber-600 border border-amber-200/80 shadow-xs transition-colors shrink-0 cursor-pointer active:scale-90"
            >
              <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-600 fill-amber-100/50" />
            </button>
          </div>

          {/* Botón Único: COTIZAR (en la misma fila) */}
          <button
            type="button"
            onClick={handleQuoteClick}
            className="shrink-0 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-[#FF5B22] hover:bg-[#E04812] text-white font-bold text-[11px] sm:text-xs flex items-center justify-center gap-1 shadow-md transition-all active:scale-95 group cursor-pointer"
          >
            <span>Cotizar</span>
            <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>

        </div>

        {/* Resumen compacto si ya se trazó ruta en el mapa */}
        {distanceKm && (
          <div className="mt-2 pt-2 border-t border-slate-100 px-2 flex items-center justify-between text-[11px] text-slate-600">
            <div className="flex items-center gap-1.5 font-semibold text-slate-800">
              <Car className="w-3.5 h-3.5 text-amber-600" />
              <span>Ruta seleccionada: ~{distanceKm} km</span>
              {durationText && <span className="text-slate-400 font-normal">({durationText})</span>}
            </div>
            <button
              type="button"
              onClick={() => openMapAtStep('origin')}
              className="text-slate-900 hover:text-amber-600 font-bold underline underline-offset-2 transition-colors"
            >
              Ver en mapa
            </button>
          </div>
        )}
      </div>

      {/* Ventana Emergente del Mapa (Fondo Blanco Puro y Bloques Acordes) */}
      <RouteMapModal
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        onConfirmRoute={handleRouteConfirmed}
        initialOrigin={origin}
        initialDestination={destination}
        initialStep={mapStep}
      />
    </div>
  );
};
