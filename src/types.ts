export type TabType = 'inicio' | 'servicios' | 'encomiendas' | 'mascotas' | 'contactanos';

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  category: 'privado' | 'intermunicipal' | 'vip' | 'corporativo';
  features: string[];
  priceEstimate?: string;
  image: string;
  tag?: string;
}

export interface RouteItem {
  id: string;
  origin: string;
  destination: string;
  duration: string;
  frequency: string;
  doorToDoor: boolean;
  popular?: boolean;
}

export interface VehicleItem {
  id: string;
  name: string;
  capacity: string;
  luggage: string;
  description: string;
  image: string;
  features: string[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  location: string;
  comment: string;
  rating: number;
  serviceType: string;
  avatar: string;
  petIncluded?: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: 'general' | 'servicios' | 'encomiendas' | 'mascotas';
}

export interface TrackingStatus {
  trackingId: string;
  sender: string;
  recipient: string;
  origin: string;
  destination: string;
  status: 'Recibido' | 'En tránsito' | 'En ruta de entrega' | 'Entregado';
  progress: number;
  estimatedDelivery: string;
  lastUpdate: string;
  packageType: string;
  timeline: {
    title: string;
    description: string;
    time: string;
    completed: boolean;
  }[];
}
