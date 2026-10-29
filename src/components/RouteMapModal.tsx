import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  X, 
  Navigation, 
  RotateCcw, 
  Check, 
  Car, 
  Clock, 
  Sparkles,
  Search,
  MapPin,
  Maximize2,
  Layers
} from 'lucide-react';

export interface RoutePoint {
  lat: number;
  lng: number;
  name: string;
}

export interface RouteSelectionData {
  origin: RoutePoint | null;
  destination: RoutePoint | null;
  distanceKm: number | null;
  durationText: string | null;
}

interface RouteMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmRoute: (data: RouteSelectionData) => void;
  initialOrigin?: string;
  initialDestination?: string;
  initialStep?: 'origin' | 'destination';
}

interface SearchSuggestion {
  displayName: string;
  shortName: string;
  lat: number;
  lng: number;
  zoom?: number;
}

// Base local index of popular Ecuador zones, streets, avenues, malls, airports & cities for 0ms instant search
const ECUADOR_ZONES_INDEX: SearchSuggestion[] = [
  // Quito - Zonas, Barrios y Avenidas
  { shortName: 'La Carolina, Quito', displayName: 'Parque La Carolina / Av. Amazonas, Quito', lat: -0.1833, lng: -78.4847, zoom: 16 },
  { shortName: 'Iñaquito, Quito', displayName: 'Iñaquito / Zona Financiera, Quito', lat: -0.1725, lng: -78.4852, zoom: 16 },
  { shortName: 'La Mariscal, Quito', displayName: 'La Mariscal / Plaza Foch, Quito', lat: -0.2028, lng: -78.4905, zoom: 16 },
  { shortName: 'Centro Histórico, Quito', displayName: 'Centro Histórico / Plaza Grande, Quito', lat: -0.2201, lng: -78.5123, zoom: 16 },
  { shortName: 'Cumbayá, Quito', displayName: 'Cumbayá (Parque Central / USFQ), Quito', lat: -0.2035, lng: -78.4312, zoom: 15 },
  { shortName: 'Tumbaco, Quito', displayName: 'Tumbaco Centro / Vía Interoceánica, Quito', lat: -0.2121, lng: -78.4030, zoom: 15 },
  { shortName: 'Aeropuerto Tababela (UIO)', displayName: 'Aeropuerto Internacional Mariscal Sucre, Tababela', lat: -0.1293, lng: -78.3575, zoom: 15 },
  { shortName: 'González Suárez, Quito', displayName: 'Av. González Suárez, Quito', lat: -0.1945, lng: -78.4810, zoom: 16 },
  { shortName: 'República del Salvador, Quito', displayName: 'Av. República del Salvador, Quito', lat: -0.1795, lng: -78.4801, zoom: 16 },
  { shortName: 'Av. Los Shyris, Quito', displayName: 'Av. Los Shyris / Naciones Unidas, Quito', lat: -0.1762, lng: -78.4819, zoom: 16 },
  { shortName: 'Av. Amazonas, Quito', displayName: 'Av. Amazonas, Quito', lat: -0.1885, lng: -78.4882, zoom: 16 },
  { shortName: 'Av. 6 de Diciembre, Quito', displayName: 'Av. 6 de Diciembre, Quito', lat: -0.1850, lng: -78.4795, zoom: 16 },
  { shortName: 'Quicentro Shopping, Quito', displayName: 'Quicentro Shopping (Av. Naciones Unidas), Quito', lat: -0.1763, lng: -78.4802, zoom: 17 },
  { shortName: 'Quicentro Sur, Quito', displayName: 'Quicentro Sur (Av. Morán Valverde), Quito', lat: -0.2852, lng: -78.5432, zoom: 16 },
  { shortName: 'Scala Shopping, Cumbayá', displayName: 'Scala Shopping / Primavera, Cumbayá', lat: -0.1973, lng: -78.4366, zoom: 16 },
  { shortName: 'Valle de los Chillos / San Rafael', displayName: 'San Rafael / Sangolquí (Valle de los Chillos)', lat: -0.3112, lng: -78.4585, zoom: 15 },
  { shortName: 'Carcelén, Quito', displayName: 'Carcelén / Terminal Norte, Quito', lat: -0.0915, lng: -78.4765, zoom: 15 },
  { shortName: 'Calderón / Carapungo, Quito', displayName: 'Calderón / Carapungo, Quito', lat: -0.0972, lng: -78.4220, zoom: 15 },
  { shortName: 'El Condado / Ponceano, Quito', displayName: 'El Condado / Ponceano, Quito', lat: -0.1055, lng: -78.4970, zoom: 15 },
  { shortName: 'Mitad del Mundo / Pomasqui', displayName: 'Ciudad Mitad del Mundo / Pomasqui, Quito', lat: -0.0022, lng: -78.4558, zoom: 15 },
  { shortName: 'Quitumbe, Quito', displayName: 'Terminal Terrestre Quitumbe, Sur de Quito', lat: -0.2935, lng: -78.5540, zoom: 16 },
  { shortName: 'Villaflora / El Recreo, Quito', displayName: 'Villaflora / El Recreo, Sur de Quito', lat: -0.2495, lng: -78.5210, zoom: 16 },

  // Guayaquil y Samborondón - Zonas, Barrios y Avenidas
  { shortName: 'Urdesa, Guayaquil', displayName: 'Urdesa Central / Av. Víctor Emilio Estrada, Guayaquil', lat: -2.1680, lng: -79.9082, zoom: 16 },
  { shortName: 'Kennedy Norte, Guayaquil', displayName: 'Kennedy Norte / Av. Francisco de Orellana, Guayaquil', lat: -2.1605, lng: -79.8975, zoom: 16 },
  { shortName: 'Samborondón / La Puntilla', displayName: 'La Puntilla / Av. Samborondón, Guayas', lat: -2.1325, lng: -79.8665, zoom: 15 },
  { shortName: 'Ciudad Celeste, Samborondón', displayName: 'Ciudad Celeste / El Buijo, Samborondón', lat: -2.0785, lng: -79.8520, zoom: 15 },
  { shortName: 'Mall del Sol, Guayaquil', displayName: 'Mall del Sol / Ciudad del Sol, Guayaquil', lat: -2.1552, lng: -79.8923, zoom: 16 },
  { shortName: 'Aeropuerto de Guayaquil (GYE)', displayName: 'Aeropuerto Internacional José Joaquín de Olmedo, Guayaquil', lat: -2.1574, lng: -79.8836, zoom: 16 },
  { shortName: 'Malecón 2000 / Centro, Guayaquil', displayName: 'Malecón 2000 / Av. 9 de Octubre, Guayaquil', lat: -2.1932, lng: -79.8825, zoom: 16 },
  { shortName: 'Puerto Santa Ana, Guayaquil', displayName: 'Puerto Santa Ana / Las Peñas, Guayaquil', lat: -2.1812, lng: -79.8765, zoom: 16 },
  { shortName: 'Alborada / Garzota, Guayaquil', displayName: 'La Alborada / La Garzota, Guayaquil', lat: -2.1380, lng: -79.8970, zoom: 15 },
  { shortName: 'Los Ceibos, Guayaquil', displayName: 'Los Ceibos / Riocentro Ceibos, Guayaquil', lat: -2.1655, lng: -79.9390, zoom: 15 },
  { shortName: 'Vía a la Costa, Guayaquil', displayName: 'Vía a la Costa / Puerto Azul, Guayaquil', lat: -2.1850, lng: -79.9680, zoom: 15 },
  { shortName: 'La Aurora / Vía Salitre, Daule', displayName: 'La Aurora / La Joya, Daule', lat: -2.0495, lng: -79.9120, zoom: 15 },
  { shortName: 'Samanes / Sauces, Guayaquil', displayName: 'Parque Samanes / Sauces, Guayaquil', lat: -2.1110, lng: -79.8950, zoom: 15 },

  // Cuenca
  { shortName: 'Centro Histórico, Cuenca', displayName: 'Parque Calderón / Centro Histórico, Cuenca', lat: -2.8974, lng: -79.0045, zoom: 16 },
  { shortName: 'El Vergel / Av. Solano, Cuenca', displayName: 'El Vergel / Av. Fray Vicente Solano, Cuenca', lat: -2.9055, lng: -79.0010, zoom: 16 },
  { shortName: 'Puertas del Sol / Ordóñez Lasso, Cuenca', displayName: 'Av. Ordóñez Lasso / Puertas del Sol, Cuenca', lat: -2.8910, lng: -79.0255, zoom: 16 },
  { shortName: 'Mall del Río, Cuenca', displayName: 'Mall del Río / Av. Felipe II, Cuenca', lat: -2.9178, lng: -79.0172, zoom: 16 },
  { shortName: 'Aeropuerto de Cuenca (CUE)', displayName: 'Aeropuerto Mariscal La Mar, Cuenca', lat: -2.8895, lng: -78.9844, zoom: 16 },

  // Otras ciudades y zonas principales
  { shortName: 'Manta (Playa Murciélago / Barbasquillo)', displayName: 'Manta / Malecón Escénico / Barbasquillo, Manabí', lat: -0.9495, lng: -80.7315, zoom: 15 },
  { shortName: 'Portoviejo, Manabí', displayName: 'Portoviejo Centro / La Rotonda, Manabí', lat: -1.0546, lng: -80.4545, zoom: 15 },
  { shortName: 'Ambato (Ficoa / Centro)', displayName: 'Ambato Centro / Ficoa / Mall de los Andes', lat: -1.2491, lng: -78.6168, zoom: 15 },
  { shortName: 'Baños de Agua Santa', displayName: 'Baños de Agua Santa Centro, Tungurahua', lat: -1.3964, lng: -78.4247, zoom: 16 },
  { shortName: 'Riobamba, Chimborazo', displayName: 'Riobamba Centro / UNACH, Chimborazo', lat: -1.6635, lng: -78.6546, zoom: 15 },
  { shortName: 'Latacunga, Cotopaxi', displayName: 'Latacunga Centro, Cotopaxi', lat: -0.9346, lng: -78.6156, zoom: 15 },
  { shortName: 'Santo Domingo de los Tsáchilas', displayName: 'Santo Domingo Centro / Círculo de los Continentes', lat: -0.2530, lng: -79.1754, zoom: 15 },
  { shortName: 'Ibarra, Imbabura', displayName: 'Ibarra Centro / Laguna de Yahuarcocha, Imbabura', lat: 0.3517, lng: -78.1223, zoom: 15 },
  { shortName: 'Otavalo, Imbabura', displayName: 'Otavalo / Plaza de los Ponchos, Imbabura', lat: 0.2343, lng: -78.2625, zoom: 15 },
  { shortName: 'Salinas / Chipipe, Santa Elena', displayName: 'Salinas Malecón / Chipipe, Santa Elena', lat: -2.2145, lng: -80.9558, zoom: 15 },
  { shortName: 'Montañita / Olón, Santa Elena', displayName: 'Montañita / Olón Ruta del Spondylus', lat: -1.8265, lng: -80.7525, zoom: 15 },
  { shortName: 'Machala, El Oro', displayName: 'Machala Centro, El Oro', lat: -3.2581, lng: -79.9554, zoom: 15 },
  { shortName: 'Loja Centro', displayName: 'Loja Centro Histórico', lat: -3.9931, lng: -79.2042, zoom: 15 },
  { shortName: 'Esmeraldas / Atacames / Tonsupa', displayName: 'Tonsupa / Atacames, Esmeraldas', lat: 0.8885, lng: -79.8055, zoom: 15 },
  { shortName: 'Quevedo, Los Ríos', displayName: 'Quevedo Centro, Los Ríos', lat: -1.0286, lng: -79.4635, zoom: 15 },
  { shortName: 'Babahoyo, Los Ríos', displayName: 'Babahoyo Centro, Los Ríos', lat: -1.8019, lng: -79.5346, zoom: 15 },
  { shortName: 'Tena, Napo', displayName: 'Tena Centro, Napo', lat: -0.9938, lng: -77.8129, zoom: 15 },
  { shortName: 'Puyo, Pastaza', displayName: 'Puyo Centro, Pastaza', lat: -1.4837, lng: -78.0026, zoom: 15 },
];

export const RouteMapModal: React.FC<RouteMapModalProps> = ({
  isOpen,
  onClose,
  onConfirmRoute,
  initialOrigin = '',
  initialDestination = '',
  initialStep = 'origin',
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const originMarkerRef = useRef<L.Marker | null>(null);
  const destMarkerRef = useRef<L.Marker | null>(null);
  const routePolylineRef = useRef<L.Polyline | null>(null);

  const [origin, setOrigin] = useState<RoutePoint | null>(null);
  const [destination, setDestination] = useState<RoutePoint | null>(null);
  const [distanceKm, setDistanceKm] = useState<number | null>(null);
  const [durationText, setDurationText] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState<'origin' | 'destination'>(initialStep);
  const [mapStyle, setMapStyle] = useState<'roadmap' | 'hybrid'>('roadmap');

  // Search box states for Origin and Destination
  const [originQuery, setOriginQuery] = useState('');
  const [destQuery, setDestQuery] = useState('');
  const [originSuggestions, setOriginSuggestions] = useState<SearchSuggestion[]>([]);
  const [destSuggestions, setDestSuggestions] = useState<SearchSuggestion[]>([]);
  const [showOriginDropdown, setShowOriginDropdown] = useState(false);
  const [showDestDropdown, setShowDestDropdown] = useState(false);
  const [isSearchingZone, setIsSearchingZone] = useState(false);

  // Refs to avoid stale closures inside Leaflet event listeners (Zero-Lag architecture)
  const activeStepRef = useRef<'origin' | 'destination'>(activeStep);
  useEffect(() => {
    activeStepRef.current = activeStep;
  }, [activeStep]);

  useEffect(() => {
    if (isOpen) {
      setActiveStep(initialStep);
    }
  }, [isOpen, initialStep]);

  // Custom Google-Maps-Style Pin Icon
  const createPinIcon = (color: string, label: string) => {
    return L.divIcon({
      className: 'custom-gmaps-pin',
      html: `
        <div style="position: relative; display: flex; flex-direction: column; align-items: center; width: 48px; height: 54px; pointer-events: auto; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.45));">
          <div style="background: ${color}; color: #000; font-weight: 800; font-size: 11px; padding: 2px 8px; border-radius: 9999px; border: 2px solid #FFFFFF; white-space: nowrap; margin-bottom: 2px;">
            ${label}
          </div>
          <svg width="30" height="36" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0C5.37 0 0 5.37 0 12C0 20.25 12 28 12 28C12 28 24 20.25 24 12C24 5.37 18.63 0 12 0Z" fill="${color}" stroke="#FFFFFF" stroke-width="2"/>
            <circle cx="12" cy="11.5" r="4.5" fill="#FFFFFF"/>
          </svg>
        </div>
      `,
      iconSize: [48, 54],
      iconAnchor: [24, 52],
    });
  };

  // Reverse geocode asynchronously WITHOUT blocking pin placement
  const resolveAddressAsync = async (lat: number, lng: number, target: 'origin' | 'destination') => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=17&addressdetails=1`,
        { headers: { 'Accept-Language': 'es' } }
      );
      if (res.ok) {
        const data = await res.json();
        const addr = data.address || {};
        const road = addr.road || addr.pedestrian || addr.Cycleway || '';
        const suburb = addr.suburb || addr.neighbourhood || addr.quarter || addr.residential || '';
        const city = addr.city || addr.town || addr.village || addr.county || '';

        const parts = [road, suburb, city].filter(Boolean);
        const formatted = parts.length > 0
          ? parts.slice(0, 3).join(', ')
          : data.display_name?.split(',').slice(0, 2).join(',') || `Punto (${lat.toFixed(4)}, ${lng.toFixed(4)})`;

        if (target === 'origin') {
          setOrigin((prev) => (prev ? { ...prev, name: formatted } : { lat, lng, name: formatted }));
          setOriginQuery(formatted);
        } else {
          setDestination((prev) => (prev ? { ...prev, name: formatted } : { lat, lng, name: formatted }));
          setDestQuery(formatted);
        }
      }
    } catch {
      // Keep fallback coordinate name if offline
    }
  };

  // Instant 0ms Pin Placement on Map Click
  const placePinInstant = (lat: number, lng: number, step: 'origin' | 'destination') => {
    const map = mapInstanceRef.current;
    if (!map) return;

    const tempName = `Ubicación seleccionada (${lat.toFixed(4)}, ${lng.toFixed(4)})`;

    if (step === 'origin') {
      const currentName = originQuery.trim() || tempName;
      const newOrigin: RoutePoint = { lat, lng, name: currentName };
      setOrigin(newOrigin);
      setOriginQuery(currentName);

      if (originMarkerRef.current) {
        originMarkerRef.current.setLatLng([lat, lng]);
      } else {
        const marker = L.marker([lat, lng], {
          icon: createPinIcon('#22C55E', 'Inicio'),
          draggable: true,
        }).addTo(map);

        marker.on('dragend', (e) => {
          const pos = (e.target as L.Marker).getLatLng();
          setOrigin({ lat: pos.lat, lng: pos.lng, name: `Ajustando...` });
          resolveAddressAsync(pos.lat, pos.lng, 'origin');
        });
        originMarkerRef.current = marker;
      }

      resolveAddressAsync(lat, lng, 'origin');
      setActiveStep('destination');
    } else {
      const currentName = destQuery.trim() || tempName;
      const newDest: RoutePoint = { lat, lng, name: currentName };
      setDestination(newDest);
      setDestQuery(currentName);

      if (destMarkerRef.current) {
        destMarkerRef.current.setLatLng([lat, lng]);
      } else {
        const marker = L.marker([lat, lng], {
          icon: createPinIcon('#F59E0B', 'Destino'),
          draggable: true,
        }).addTo(map);

        marker.on('dragend', (e) => {
          const pos = (e.target as L.Marker).getLatLng();
          setDestination({ lat: pos.lat, lng: pos.lng, name: `Ajustando...` });
          resolveAddressAsync(pos.lat, pos.lng, 'destination');
        });
        destMarkerRef.current = marker;
      }

      resolveAddressAsync(lat, lng, 'destination');
    }
  };

  const placePinCallbackRef = useRef<(lat: number, lng: number) => void>(() => {});
  placePinCallbackRef.current = (lat: number, lng: number) => {
    setShowOriginDropdown(false);
    setShowDestDropdown(false);
    placePinInstant(lat, lng, activeStep);
  };

  // Search Zone / Street / Reference (Local 0ms + Live Ecuador Geocoder)
  const searchEcuadorLocations = async (query: string, target: 'origin' | 'destination') => {
    const q = query.trim().toLowerCase();
    if (!q) {
      if (target === 'origin') setOriginSuggestions(ECUADOR_ZONES_INDEX.slice(0, 6));
      else setDestSuggestions(ECUADOR_ZONES_INDEX.slice(0, 6));
      return;
    }

    // 1. Instant local matches
    const localMatches = ECUADOR_ZONES_INDEX.filter(
      (item) =>
        item.shortName.toLowerCase().includes(q) ||
        item.displayName.toLowerCase().includes(q)
    ).slice(0, 5);

    if (target === 'origin') setOriginSuggestions(localMatches);
    else setDestSuggestions(localMatches);

    if (q.length < 3) return;

    // 2. Live street/reference search in Ecuador via Nominatim
    try {
      setIsSearchingZone(true);
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&countrycodes=ec&q=${encodeURIComponent(query)}&addressdetails=1&limit=5`,
        { headers: { 'Accept-Language': 'es' } }
      );
      if (res.ok) {
        const data = await res.json();
        const remoteSuggestions: SearchSuggestion[] = data.map((item: any) => {
          const parts = (item.display_name || '').split(',').map((s: string) => s.trim());
          return {
            shortName: parts.slice(0, 2).join(', '),
            displayName: parts.slice(0, 4).join(', '),
            lat: parseFloat(item.lat),
            lng: parseFloat(item.lon),
            zoom: 16,
          };
        });

        // Merge local + remote avoiding duplicates
        const combined = [...localMatches];
        for (const rem of remoteSuggestions) {
          const exists = combined.some(
            (c) => Math.abs(c.lat - rem.lat) < 0.005 && Math.abs(c.lng - rem.lng) < 0.005
          );
          if (!exists) combined.push(rem);
        }

        if (target === 'origin') setOriginSuggestions(combined.slice(0, 7));
        else setDestSuggestions(combined.slice(0, 7));
      }
    } catch {
      // Keep local matches
    } finally {
      setIsSearchingZone(false);
    }
  };

  // Debounced search effects
  useEffect(() => {
    const t = setTimeout(() => {
      if (showOriginDropdown) searchEcuadorLocations(originQuery, 'origin');
    }, 200);
    return () => clearTimeout(t);
  }, [originQuery, showOriginDropdown]);

  useEffect(() => {
    const t = setTimeout(() => {
      if (showDestDropdown) searchEcuadorLocations(destQuery, 'destination');
    }, 200);
    return () => clearTimeout(t);
  }, [destQuery, showDestDropdown]);

  // Redirect map to selected zone so user can click exact spot
  const handleSelectZoneSuggestion = (suggestion: SearchSuggestion, target: 'origin' | 'destination') => {
    const map = mapInstanceRef.current;
    if (target === 'origin') {
      setOriginQuery(suggestion.shortName);
      setShowOriginDropdown(false);
      setActiveStep('origin');
    } else {
      setDestQuery(suggestion.shortName);
      setShowDestDropdown(false);
      setActiveStep('destination');
    }

    if (map) {
      map.flyTo([suggestion.lat, suggestion.lng], suggestion.zoom || 16, {
        animate: true,
        duration: 0.65,
      });
    }
  };

  // Direct redirect when pressing Enter or clicking the Search button
  const redirectMapToQuery = async (query: string, target: 'origin' | 'destination') => {
    const q = query.trim().toLowerCase();
    setActiveStep(target);
    if (!q) {
      if (target === 'origin') {
        setShowOriginDropdown(true);
        searchEcuadorLocations('', 'origin');
      } else {
        setShowDestDropdown(true);
        searchEcuadorLocations('', 'destination');
      }
      return;
    }

    // Check current suggestions or local index first for 0ms redirect
    const currentList = target === 'origin' ? originSuggestions : destSuggestions;
    if (currentList.length > 0) {
      handleSelectZoneSuggestion(currentList[0], target);
      return;
    }

    const localMatch = ECUADOR_ZONES_INDEX.find(
      (item) =>
        item.shortName.toLowerCase().includes(q) ||
        item.displayName.toLowerCase().includes(q)
    );
    if (localMatch) {
      handleSelectZoneSuggestion(localMatch, target);
      return;
    }

    // Fallback to live Nominatim Ecuador lookup and fly there immediately
    try {
      setIsSearchingZone(true);
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&countrycodes=ec&q=${encodeURIComponent(query)}&addressdetails=1&limit=1`,
        { headers: { 'Accept-Language': 'es' } }
      );
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) {
          const item = data[0];
          const parts = (item.display_name || '').split(',').map((s: string) => s.trim());
          handleSelectZoneSuggestion(
            {
              shortName: parts.slice(0, 2).join(', '),
              displayName: parts.slice(0, 4).join(', '),
              lat: parseFloat(item.lat),
              lng: parseFloat(item.lon),
              zoom: 16,
            },
            target
          );
        }
      }
    } catch {
      // Ignore network error
    } finally {
      setIsSearchingZone(false);
    }
  };

  // Handle pressing Enter in search input
  const handleSearchKeyDown = async (
    e: React.KeyboardEvent<HTMLInputElement>,
    target: 'origin' | 'destination'
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      await redirectMapToQuery(target === 'origin' ? originQuery : destQuery, target);
    }
  };

  // Calculate Route Polyline & Distance without yanking camera zoom
  const calculateRoute = async (ptA: RoutePoint, ptB: RoutePoint) => {
    // Immediate Haversine estimate so UI updates in 0ms
    const rad = (x: number) => (x * Math.PI) / 180;
    const R = 6371;
    const dLat = rad(ptB.lat - ptA.lat);
    const dLon = rad(ptB.lng - ptA.lng);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(rad(ptA.lat)) * Math.cos(rad(ptB.lat)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const estKm = Math.max(1, Math.round(R * c * 1.3));
    const estHours = Math.floor(estKm / 60);
    const estMins = Math.max(5, Math.round(((estKm % 60) / 60) * 60));

    setDistanceKm(estKm);
    setDurationText(estHours > 0 ? `${estHours}h ${estMins}m` : `${estMins} min`);

    try {
      const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${ptA.lng},${ptA.lat};${ptB.lng},${ptB.lat}?overview=full&geometries=geojson`;
      const res = await fetch(osrmUrl);
      if (res.ok) {
        const data = await res.json();
        if (data.routes && data.routes.length > 0) {
          const route = data.routes[0];
          const distKm = Math.max(1, Math.round(route.distance / 1000));
          const durSec = route.duration;
          const hours = Math.floor(durSec / 3600);
          const minutes = Math.max(5, Math.round((durSec % 3600) / 60));
          const durText = hours > 0 ? `${hours}h ${minutes}m` : `${minutes} min`;

          setDistanceKm(distKm);
          setDurationText(durText);

          if (mapInstanceRef.current) {
            if (routePolylineRef.current) {
              mapInstanceRef.current.removeLayer(routePolylineRef.current);
            }
            const coordinates = route.geometry.coordinates.map(
              (coord: [number, number]) => [coord[1], coord[0]] as [number, number]
            );
            routePolylineRef.current = L.polyline(coordinates, {
              color: '#2563EB', // Google Maps classic route blue with high visibility
              weight: 6,
              opacity: 0.9,
              lineJoin: 'round',
            }).addTo(mapInstanceRef.current);
          }
          return;
        }
      }
    } catch {
      // Fallback dashed line if OSRM offline
      if (mapInstanceRef.current) {
        if (routePolylineRef.current) {
          mapInstanceRef.current.removeLayer(routePolylineRef.current);
        }
        routePolylineRef.current = L.polyline(
          [
            [ptA.lat, ptA.lng],
            [ptB.lat, ptB.lng],
          ],
          {
            color: '#2563EB',
            weight: 5,
            dashArray: '8, 8',
            opacity: 0.85,
          }
        ).addTo(mapInstanceRef.current);
      }
    }
  };

  // Fit entire route in view when user clicks "Ver Ruta Completa"
  const handleFitFullRoute = () => {
    const map = mapInstanceRef.current;
    if (!map) return;
    if (routePolylineRef.current) {
      map.fitBounds(routePolylineRef.current.getBounds(), { padding: [50, 50], maxZoom: 15 });
    } else if (origin && destination) {
      map.fitBounds(
        [
          [origin.lat, origin.lng],
          [destination.lat, destination.lng],
        ],
        { padding: [50, 50], maxZoom: 15 }
      );
    }
  };

  // Switch between Google Roadmap and Google Hybrid Satellite
  const toggleMapStyle = () => {
    const map = mapInstanceRef.current;
    if (!map) return;
    const nextStyle = mapStyle === 'roadmap' ? 'hybrid' : 'roadmap';
    setMapStyle(nextStyle);

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }
    const lyrs = nextStyle === 'roadmap' ? 'm' : 'y';
    tileLayerRef.current = L.tileLayer(
      `https://{s}.google.com/vt/lyrs=${lyrs}&hl=es&x={x}&y={y}&z={z}`,
      {
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        maxZoom: 20,
        attribution: '&copy; Google Maps',
      }
    ).addTo(map);
  };

  // Initialize Map ONCE when modal opens (Zero-Lag)
  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      if (!mapContainerRef.current) return;

      if (!mapInstanceRef.current) {
        const map = L.map(mapContainerRef.current, {
          center: [-0.1807, -78.4678], // Default Quito view
          zoom: 12,
          zoomControl: false,
          preferCanvas: true,
        });

        L.control.zoom({ position: 'bottomright' }).addTo(map);

        // Native Google Maps Road Tiles (Ultra fast CDN, identical to Google Maps)
        tileLayerRef.current = L.tileLayer(
          'https://{s}.google.com/vt/lyrs=m&hl=es&x={x}&y={y}&z={z}',
          {
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
            maxZoom: 20,
            attribution: '&copy; Google Maps',
          }
        ).addTo(map);

        // Instant click handler using fresh callback ref
        map.on('click', (e: L.LeafletMouseEvent) => {
          placePinCallbackRef.current(e.latlng.lat, e.latlng.lng);
        });

        mapInstanceRef.current = map;
      } else {
        mapInstanceRef.current.invalidateSize();
      }

      // If user typed something in the bar before opening modal, redirect there immediately
      if (initialOrigin && !origin) {
        setOriginQuery(initialOrigin);
        if (initialStep === 'origin') {
          const match = ECUADOR_ZONES_INDEX.find(
            (p) =>
              p.shortName.toLowerCase().includes(initialOrigin.toLowerCase()) ||
              p.displayName.toLowerCase().includes(initialOrigin.toLowerCase())
          );
          if (match && mapInstanceRef.current) {
            mapInstanceRef.current.setView([match.lat, match.lng], match.zoom || 15);
          }
        }
      }
      if (initialDestination && !destination) {
        setDestQuery(initialDestination);
        if (initialStep === 'destination') {
          const match = ECUADOR_ZONES_INDEX.find(
            (p) =>
              p.shortName.toLowerCase().includes(initialDestination.toLowerCase()) ||
              p.displayName.toLowerCase().includes(initialDestination.toLowerCase())
          );
          if (match && mapInstanceRef.current) {
            mapInstanceRef.current.setView([match.lat, match.lng], match.zoom || 15);
          }
        }
      }
    }, 50);

    const timer2 = setTimeout(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    }, 150);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, [isOpen]);

  // Destroy map cleanly when modal closes so re-opening is always fresh & fast
  useEffect(() => {
    if (!isOpen && mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
      originMarkerRef.current = null;
      destMarkerRef.current = null;
      routePolylineRef.current = null;
    }
  }, [isOpen]);

  // Recalculate route when both points exist
  useEffect(() => {
    if (origin && destination) {
      calculateRoute(origin, destination);
    }
  }, [origin?.lat, origin?.lng, destination?.lat, destination?.lng]);

  // Reset Points
  const handleReset = () => {
    if (mapInstanceRef.current) {
      if (originMarkerRef.current) mapInstanceRef.current.removeLayer(originMarkerRef.current);
      if (destMarkerRef.current) mapInstanceRef.current.removeLayer(destMarkerRef.current);
      if (routePolylineRef.current) mapInstanceRef.current.removeLayer(routePolylineRef.current);
    }
    originMarkerRef.current = null;
    destMarkerRef.current = null;
    routePolylineRef.current = null;
    setOrigin(null);
    setDestination(null);
    setOriginQuery('');
    setDestQuery('');
    setDistanceKm(null);
    setDurationText(null);
    setActiveStep('origin');
  };

  // Confirm Route to Bar
  const handleConfirm = () => {
    onConfirmRoute({
      origin,
      destination,
      distanceKm,
      durationText,
    });
    onClose();
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] w-screen h-[100dvh] bg-white flex flex-col overflow-hidden text-slate-900"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="relative w-full h-full flex flex-col overflow-hidden bg-white">
        {/* Top Header */}
        <div className="px-4 sm:px-6 py-3 border-b border-slate-200/80 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-slate-950 flex items-center justify-center text-[#DFC29D] shadow-xs">
              <Navigation className="w-4 h-4" />
            </div>
            <h3 className="text-sm sm:text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span>Selecciona tu Ruta</span>
              <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                Ecuador
              </span>
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            aria-label="Cerrar mapa"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Barra de Bloques de Búsqueda (Inicio & Destino) */}
        <div className="px-4 sm:px-6 py-2.5 bg-white border-b border-slate-200/80 grid grid-cols-1 md:grid-cols-2 gap-2 shrink-0 relative z-[2000]">
          
          {/* Bloque 1: INICIO */}
          <div className="relative">
            <div
              onClick={() => setActiveStep('origin')}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all cursor-text ${
                activeStep === 'origin'
                  ? 'bg-slate-100 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs'
                  : 'bg-slate-100/85 border-slate-200/90 hover:bg-slate-100 hover:border-slate-300'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-600">
                    Inicio
                  </span>
                  {origin && (
                    <span className="text-[9px] text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded font-bold flex items-center gap-0.5">
                      <Check className="w-2.5 h-2.5" /> Listo
                    </span>
                  )}
                </div>
                <input
                  type="text"
                  value={originQuery}
                  onFocus={() => {
                    setActiveStep('origin');
                    setShowOriginDropdown(true);
                    setShowDestDropdown(false);
                    searchEcuadorLocations(originQuery, 'origin');
                  }}
                  onChange={(e) => {
                    setOriginQuery(e.target.value);
                    setActiveStep('origin');
                    setShowOriginDropdown(true);
                  }}
                  onKeyDown={(e) => handleSearchKeyDown(e, 'origin')}
                  placeholder="Buscar ciudad o dirección de inicio..."
                  className="w-full bg-transparent text-slate-900 text-xs sm:text-[13px] font-semibold placeholder:text-slate-400 placeholder:font-normal focus:outline-none"
                />
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  redirectMapToQuery(originQuery, 'origin');
                }}
                className="px-2 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold flex items-center gap-1 transition-colors shrink-0 cursor-pointer"
                title="Ir a zona de inicio en el mapa"
              >
                <Search className="w-3.5 h-3.5 text-emerald-400" />
              </button>
            </div>

            {/* Dropdown Sugerencias Inicio */}
            {showOriginDropdown && originSuggestions.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-slate-200 rounded-xl shadow-2xl overflow-hidden z-[3000] max-h-60 overflow-y-auto">
                <div className="px-3 py-1.5 bg-slate-100 border-b border-slate-200 text-[10px] font-bold uppercase tracking-wider text-slate-600 flex items-center justify-between">
                  <span>Zonas sugeridas</span>
                  {isSearchingZone && <Sparkles className="w-3 h-3 animate-spin text-emerald-600" />}
                </div>
                {originSuggestions.map((sug, i) => (
                  <button
                    key={`${sug.shortName}-${i}`}
                    type="button"
                    onClick={() => handleSelectZoneSuggestion(sug, 'origin')}
                    className="w-full text-left px-3 py-2 hover:bg-slate-100 flex items-start gap-2 border-b border-slate-100 last:border-none transition-colors cursor-pointer"
                  >
                    <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 truncate">{sug.shortName}</p>
                      <p className="text-[10px] text-slate-500 truncate">{sug.displayName}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Bloque 2: DESTINO */}
          <div className="relative">
            <div
              onClick={() => setActiveStep('destination')}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all cursor-text ${
                activeStep === 'destination'
                  ? 'bg-slate-100 border-amber-500 ring-2 ring-amber-500/20 shadow-xs'
                  : 'bg-slate-100/85 border-slate-200/90 hover:bg-slate-100 hover:border-slate-300'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-600">
                    Destino
                  </span>
                  {destination && (
                    <span className="text-[9px] text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded font-bold flex items-center gap-0.5">
                      <Check className="w-2.5 h-2.5" /> Listo
                    </span>
                  )}
                </div>
                <input
                  type="text"
                  value={destQuery}
                  onFocus={() => {
                    setActiveStep('destination');
                    setShowDestDropdown(true);
                    setShowOriginDropdown(false);
                    searchEcuadorLocations(destQuery, 'destination');
                  }}
                  onChange={(e) => {
                    setDestQuery(e.target.value);
                    setActiveStep('destination');
                    setShowDestDropdown(true);
                  }}
                  onKeyDown={(e) => handleSearchKeyDown(e, 'destination')}
                  placeholder="Buscar ciudad o dirección de destino..."
                  className="w-full bg-transparent text-slate-900 text-xs sm:text-[13px] font-semibold placeholder:text-slate-400 placeholder:font-normal focus:outline-none"
                />
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  redirectMapToQuery(destQuery, 'destination');
                }}
                className="px-2 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold flex items-center gap-1 transition-colors shrink-0 cursor-pointer"
                title="Ir a zona de destino en el mapa"
              >
                <Search className="w-3.5 h-3.5 text-amber-400" />
              </button>
            </div>

            {/* Dropdown Sugerencias Destino */}
            {showDestDropdown && destSuggestions.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-slate-200 rounded-xl shadow-2xl overflow-hidden z-[3000] max-h-60 overflow-y-auto">
                <div className="px-3 py-1.5 bg-slate-100 border-b border-slate-200 text-[10px] font-bold uppercase tracking-wider text-slate-600 flex items-center justify-between">
                  <span>Zonas sugeridas</span>
                  {isSearchingZone && <Sparkles className="w-3 h-3 animate-spin text-amber-600" />}
                </div>
                {destSuggestions.map((sug, i) => (
                  <button
                    key={`${sug.shortName}-${i}`}
                    type="button"
                    onClick={() => handleSelectZoneSuggestion(sug, 'destination')}
                    className="w-full text-left px-3 py-2 hover:bg-slate-100 flex items-start gap-2 border-b border-slate-100 last:border-none transition-colors cursor-pointer"
                  >
                    <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 truncate">{sug.shortName}</p>
                      <p className="text-[10px] text-slate-500 truncate">{sug.displayName}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Map Container (Ocupa todo el espacio vertical disponible) */}
        <div className="relative w-full flex-1 min-h-0 bg-slate-100 select-none">
          <div
            ref={mapContainerRef}
            className="absolute inset-0 w-full h-full cursor-crosshair"
          />

          {/* Botones de Control Flotantes (Solo Iconos) */}
          <div className="absolute top-3 right-3 z-[1000] flex items-center gap-2 pointer-events-auto">
            {origin && destination && (
              <button
                type="button"
                onClick={handleFitFullRoute}
                title="Ver Ruta Completa"
                aria-label="Ver Ruta Completa"
                className="w-9 h-9 rounded-xl bg-white/95 hover:bg-white text-slate-900 border border-slate-200 shadow-md flex items-center justify-center transition-all active:scale-95 cursor-pointer"
              >
                <Maximize2 className="w-4 h-4 text-amber-600" />
              </button>
            )}

            <button
              type="button"
              onClick={toggleMapStyle}
              title={mapStyle === 'roadmap' ? 'Modo Satélite' : 'Modo Calles'}
              aria-label="Cambiar estilo de mapa"
              className="w-9 h-9 rounded-xl bg-white/95 hover:bg-white text-slate-900 border border-slate-200 shadow-md flex items-center justify-center transition-all active:scale-95 cursor-pointer"
            >
              <Layers className="w-4 h-4 text-slate-700" />
            </button>
          </div>
        </div>

        {/* Barra Inferior (Resumen y Botón de Confirmar) */}
        <div className="px-4 sm:px-6 py-2.5 sm:py-3 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2.5 shrink-0">
          {/* Summary Blocks */}
          <div className="w-full sm:w-auto flex-1 grid grid-cols-2 gap-2 text-xs">
            <div
              onClick={() => setActiveStep('origin')}
              className={`flex items-center gap-2 px-2.5 py-1.5 rounded-xl border cursor-pointer transition-colors ${
                activeStep === 'origin'
                  ? 'bg-slate-100 border-emerald-500/80'
                  : 'bg-slate-100/80 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              <div className="truncate min-w-0">
                <span className="text-slate-500 text-[9px] block uppercase font-extrabold tracking-wider leading-none">
                  Inicio
                </span>
                <span className="font-bold text-slate-900 truncate block text-[11px]">
                  {origin?.name || 'Por definir'}
                </span>
              </div>
            </div>

            <div
              onClick={() => setActiveStep('destination')}
              className={`flex items-center gap-2 px-2.5 py-1.5 rounded-xl border cursor-pointer transition-colors ${
                activeStep === 'destination'
                  ? 'bg-slate-100 border-amber-500/80'
                  : 'bg-slate-100/80 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
              <div className="truncate min-w-0">
                <span className="text-slate-500 text-[9px] block uppercase font-extrabold tracking-wider leading-none">
                  Destino
                </span>
                <span className="font-bold text-slate-900 truncate block text-[11px]">
                  {destination?.name || 'Por definir'}
                </span>
              </div>
            </div>
          </div>

          {/* Distancia y Tiempo */}
          {distanceKm && (
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-900 text-[11px] font-bold shrink-0">
              <div className="flex items-center gap-1">
                <Car className="w-3.5 h-3.5 text-amber-600" />
                <span>~{distanceKm} km</span>
              </div>
              <span className="text-slate-300">|</span>
              <div className="flex items-center gap-1 text-slate-600 font-semibold">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>~{durationText}</span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end shrink-0">
            <button
              type="button"
              onClick={handleReset}
              title="Reiniciar ruta"
              className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Reiniciar</span>
            </button>

            <button
              type="button"
              onClick={handleConfirm}
              disabled={!origin || !destination}
              className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 disabled:opacity-40 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <Check className="w-4 h-4 text-[#DFC29D] stroke-[2.5]" />
              <span>Confirmar</span>
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
