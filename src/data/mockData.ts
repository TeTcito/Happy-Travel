import type { ServiceItem, RouteItem, VehicleItem, TestimonialItem, FaqItem, TrackingStatus } from '../types';

export const COMPANY_INFO = {
  name: 'Happy Travel',
  tagline: 'Tu Experiencia Premium en Transporte Puerta a Puerta',
  description: 'Especialistas en transporte privado de pasajeros, traslados intermunicipales exclusivos, encomiendas seguras y movilidad de mascotas con los más altos estándares de confort y confidencialidad.',
  phone: '+57 310 987 6543',
  whatsappNumber: '573109876543',
  email: 'contacto@happytravel.com',
  address: 'Sede Principal: Centro Empresarial El Trébol, Of. 402 - Cobertura Nacional',
  hours: 'Operaciones 24 Horas / 7 Días a la semana (Atención al cliente 6:00 AM - 10:00 PM)',
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'puerta-a-puerta-privado',
    title: 'Transporte Puerta a Puerta Privado',
    shortDesc: 'Vehículo exclusivo para ti y tus acompañantes. Te recogemos en la puerta de tu casa u hotel y te llevamos directo a tu destino.',
    fullDesc: 'Olvídate de terminales congestionados y transbordos agotadores. En Happy Travel asignamos una camioneta o sedán de gama alta exclusivamente para ti y tus acompañantes. Conductor profesional certificado, aire acondicionado bizona, Wi-Fi a bordo y flexibilidad total en paradas.',
    category: 'privado',
    features: [
      'Sin pasajeros extraños ni desvíos',
      'Puntualidad garantizada al minuto',
      'Conductores verificados con antecedentes',
      'Espacio amplio para equipaje voluminoso',
      'Bebidas de cortesía y cargadores a bordo'
    ],
    priceEstimate: 'Tarifa fija por trayecto reservado',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
    tag: 'Más Solicitado'
  },
  {
    id: 'rutas-interciudades',
    title: 'Rutas Intermunicipales e Interdepartamentales',
    shortDesc: 'Conectamos ciudades principales, municipios y destinos turísticos con máxima seguridad en carretera.',
    fullDesc: 'Rutas directas punto a punto entre ciudades clave (ej. Bogotá, Medellín, Cali, Eje Cafetero, Boyacá, Costa Atlántica). Viaja de noche o de día con monitoreo satelital en tiempo real, seguro contractual de viaje y la comodidad de un automóvil privado.',
    category: 'intermunicipal',
    features: [
      'Monitoreo satelital GPS 24/7',
      'Seguro de viaje integral para todos los pasajeros',
      'Paradas programadas en restaurantes de primer nivel',
      'Disponibilidad los 365 días del año',
      'Tarifas corporativas y para familias'
    ],
    priceEstimate: 'Cotización personalizada según kilómetros',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
    tag: 'Ruta Directa'
  },
  {
    id: 'traslado-vip-celebridades',
    title: 'Traslado VIP & Figuras Públicas',
    shortDesc: 'Discreción absoluta, vehículos polarizados de alta gama y conductores con protocolo de seguridad para celebridades y ejecutivos.',
    fullDesc: 'Diseñado para artistas, influencers, ejecutivos y personas con altos estándares de privacidad. Garantizamos acuerdos de confidencialidad (NDA), vehículos con blindaje o cristales tintados de seguridad, traslados con mascotas en cabina y coordinación con equipos de seguridad privada.',
    category: 'vip',
    features: [
      'Acuerdo de confidencialidad estricta (NDA)',
      'Vehículos premium ejecutivos (Blindaje disponible)',
      'Acompañamiento VIP para mascotas de la figura pública',
      'Conductores bilingües bajo solicitud',
      'Acceso expedito a zonas privadas de aeropuertos y hoteles'
    ],
    priceEstimate: 'Atención personalizada Concierge',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80',
    tag: 'Servicio Exclusivo'
  },
  {
    id: 'aeropuerto-ejecutivo',
    title: 'Traslados Aeropuerto & Puerta a Puerta',
    shortDesc: 'Monitoreo de vuelo en vivo, recepción con letrero digital de bienvenida y cero estrés por retrasos de aerolíneas.',
    fullDesc: 'Recogida puntual en aeropuertos nacionales e internacionales. Monitoreamos tu número de vuelo en tiempo real para esperarte en caso de retraso sin recargos sorpresa. Asistencia completa con tu equipaje hasta la puerta de tu residencia u oficina.',
    category: 'corporativo',
    features: [
      'Monitoreo del vuelo en tiempo real',
      '60 minutos de espera libre de costo en aeropuerto',
      'Recepción personalizada en sala de llegadas',
      'Manejo cuidadoso de equipaje frágil',
      'Facturación electrónica corporativa inmediata'
    ],
    priceEstimate: 'Tarifa plana todo incluido',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    tag: 'Corporativo'
  }
];

export const POPULAR_ROUTES: RouteItem[] = [
  { id: '1', origin: 'Quito', destination: 'Guayaquil', duration: '7h 30m', frequency: 'Salidas diarias', doorToDoor: true, popular: true },
  { id: '2', origin: 'Guayaquil', destination: 'Cuenca', duration: '3h 45m', frequency: 'Salidas diarias', doorToDoor: true, popular: true },
  { id: '3', origin: 'Quito', destination: 'Baños de Agua Santa', duration: '3h 15m', frequency: 'Salidas continuas', doorToDoor: true, popular: true },
  { id: '4', origin: 'Quito', destination: 'Manta', duration: '6h 30m', frequency: 'Salidas diarias', doorToDoor: true },
  { id: '5', origin: 'Cuenca', destination: 'Loja', duration: '3h 30m', frequency: 'Bajo reserva', doorToDoor: true },
  { id: '6', origin: 'Guayaquil', destination: 'Salinas / Montañita', duration: '2h 15m', frequency: 'Salidas continuas', doorToDoor: true, popular: true },
  { id: '7', origin: 'Quito', destination: 'Otavalo / Ibarra', duration: '2h 00m', frequency: 'Salidas 24/7', doorToDoor: true },
  { id: '8', origin: 'Ruta Personalizada', destination: 'Cualquier cantón o provincia del Ecuador', duration: 'A convenir', frequency: '100% A tu medida', doorToDoor: true }
];

export const VEHICLES_DATA: VehicleItem[] = [
  {
    id: 'van-premium',
    name: 'Van Ejecutiva Mercedes-Benz / Hyundai H1 VIP',
    capacity: '6 a 9 Pasajeros',
    luggage: 'Hasta 10 Maletas grandes',
    description: 'Sillones tipo capitán reclinables en cuero, climatización individual, pantallas de entretenimiento y tomas de 110V para trabajar en el camino.',
    image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80',
    features: ['Sillones Capitán en Cuero', 'Wi-Fi 5G & Tomas 110V', 'Apta para Mascotas en Cabina', 'Vidrios de Privacidad']
  },
  {
    id: 'suv-luxury',
    name: 'SUV Familiar Premium (Toyota Prado / Chevrolet Tahoe)',
    capacity: '4 a 6 Pasajeros',
    luggage: '6 Maletas medianas',
    description: 'Potencia, seguridad y máximo confort en cualquier tipo de terreno montañoso o carretera intermunicipal con tracción integral 4x4.',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
    features: ['Tracción 4x4 Segura', 'Climatizador Bi-zona', 'Suspension Suave Ultra Confort', 'Sistema Sonido Premium']
  },
  {
    id: 'sedan-vip',
    name: 'Sedán Ejecutivo VIP (Audi / BMW / Corolla Hybrid)',
    capacity: '1 a 3 Pasajeros',
    luggage: '3 Maletas medianas',
    description: 'La opción predilecta para traslados ejecutivos al aeropuerto, reuniones de negocios o viajes rápidos de ciudad a ciudad en solitario o en pareja.',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80',
    features: ['Máxima Insonorización', 'Asientos Ergonómicos', 'Conducción Eco-Silenciosa', 'Conductor de Traje']
  }
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: '1',
    name: 'Mariana Duque & "Toby"',
    role: 'Cliente Frecuente con Golden Retriever',
    location: 'Bogotá a Pereira',
    comment: 'Viajar con un perro grande siempre era una pesadilla en buses y aviones. Con Happy Travel, Toby viajó conmigo en el asiento trasero con su arnés, nos hicieron dos paradas para que hiciera sus necesidades y el conductor fue increíblemente cariñoso. No los cambio por nada.',
    rating: 5,
    serviceType: 'Transporte de Mascotas Puerta a Puerta',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    petIncluded: true
  },
  {
    id: '2',
    name: 'Camilo Restrepo',
    role: 'Director de Producción y Eventos VIP',
    location: 'Medellín a Llanogrande',
    comment: 'Trabajamos con artistas reconocidos que exigen máxima discreción, puntualidad y vehículos impecables. Happy Travel ha cumplido al 100% con los protocolos de confidencialidad, incluso cuando los talentos viajan con sus mascotas. Servicio de talla internacional.',
    rating: 5,
    serviceType: 'Traslado VIP & Famosos',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: '3',
    name: 'Dra. Valentina Morales',
    role: 'Gerente de Laboratorio Clínico',
    location: 'Cali a Eje Cafetero',
    comment: 'El servicio de encomiendas es el único que nos garantiza que los paquetes delicados no son golpeados ni arrojados en una bodega. Lo recogen en el laboratorio y 4 horas después lo entregan en la puerta del especialista con foto y firma. Excelente tranquilidad.',
    rating: 5,
    serviceType: 'Encomiendas Puerta a Puerta',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: '4',
    name: 'David Sánchez & Familia',
    role: 'Viajero Familiar',
    location: 'Bogotá a Villa de Leyva',
    comment: 'Nos recogieron a las 6:00 am en la puerta de nuestro conjunto en Bogotá y nos dejaron en la cabaña en Boyacá. Con dos niños pequeños y nuestras maletas, viajar así es un verdadero descanso. La camioneta estaba impecable.',
    rating: 5,
    serviceType: 'Transporte Privado Intermunicipal',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
  }
];

export const MOCK_TRACKING_EXAMPLES: Record<string, TrackingStatus> = {
  'HT-8829': {
    trackingId: 'HT-8829',
    sender: 'Valeria Osorio (Bogotá Norte)',
    recipient: 'Carlos Méndez (Medellín El Poblado)',
    origin: 'Bogotá D.C. (Recogida a domicilio)',
    destination: 'Medellín, Antioquia (Entrega en puerta)',
    status: 'En tránsito',
    progress: 65,
    estimatedDelivery: 'Hoy, 6:30 PM',
    lastUpdate: 'Paso por peaje Guaduas - Conductor Juan Carlos Pérez',
    packageType: 'Documentación corporativa y equipos tecnológicos frágiles',
    timeline: [
      { title: 'Recogida en Domicilio', description: 'Paquete recibido y embalado con precinto de seguridad.', time: '08:15 AM', completed: true },
      { title: 'Inspección & Salida de Ciudad', description: 'Monitoreo GPS activo e inicio de ruta intermunicipal.', time: '09:30 AM', completed: true },
      { title: 'En Tránsito Seguro en Carretera', description: 'Unidad en trayecto continuo bajo control satelital.', time: '01:45 PM', completed: true },
      { title: 'En Ruta de Entrega Final', description: 'Vehículo aproximándose a Medellín para entrega en puerta.', time: '05:30 PM (Est.)', completed: false },
      { title: 'Entregado con Firma & Fotografía', description: 'Entrega en mano al destinatario.', time: '06:30 PM (Est.)', completed: false },
    ]
  },
  'HT-9104': {
    trackingId: 'HT-9104',
    sender: 'Clínica Veterinaria San Patricio',
    recipient: 'Dra. Andrea Londoño',
    origin: 'Pereira, Risaralda',
    destination: 'Manizales, Caldas',
    status: 'Entregado',
    progress: 100,
    estimatedDelivery: 'Hoy, 11:15 AM',
    lastUpdate: 'Entregado con éxito. Firma recibida.',
    packageType: 'Caja térmica con suministros médicos urgentes',
    timeline: [
      { title: 'Recogida Express', description: 'Recolección prioritaria en sede.', time: '09:00 AM', completed: true },
      { title: 'En Tránsito Directo', description: 'Ruta autopista del Café sin paradas intermedias.', time: '09:40 AM', completed: true },
      { title: 'Llegada a Destino', description: 'Confirmación de dirección y acceso.', time: '11:00 AM', completed: true },
      { title: 'Entregado con Firma Digital', description: 'Entregado a Dra. Andrea Londoño en recepción.', time: '11:15 AM', completed: true }
    ]
  }
};

export const FAQ_DATA: FaqItem[] = [
  {
    category: 'general',
    question: '¿Qué significa exactamente "transporte puerta a puerta"?',
    answer: 'Significa que nuestro conductor llega exactamente a la dirección que tú indiques (tu casa, edificio, hotel, finca o empresa) y te lleva directamente a la dirección de destino sin que tengas que desplazarte a ninguna terminal de transporte ni hacer trasbordos molestos.'
  },
  {
    category: 'servicios',
    question: '¿El servicio es 100% privado o viajan personas desconocidas?',
    answer: 'En Happy Travel todos nuestros viajes principales son 100% privados y exclusivos. El vehículo completo se reserva para ti y las personas o mascotas que decidas llevar, garantizando total privacidad, seguridad, aire acondicionado a tu gusto y la música o silencio que prefieras.'
  },
  {
    category: 'mascotas',
    question: '¿Cómo viajan las mascotas? ¿Van en jaulas en el maletero?',
    answer: '¡Jamás en el maletero! En Happy Travel las mascotas viajan en cabina con sus dueños o en asientos adaptados con cojinería impermeable, arnés de seguridad certificado o guacal ventilado dentro del habitáculo climatizado. Además, en viajes largos realizamos paradas de hidratación y descanso.'
  },
  {
    category: 'encomiendas',
    question: '¿Qué tipo de encomiendas pueden transportar puerta a puerta?',
    answer: 'Llevamos desde documentos confidenciales y tecnología (laptops, celulares), hasta paquetes de regalos, compras especiales, piezas industriales o equipaje extra. A diferencia de las empresas de mensajería masiva, no arrojamos los paquetes en bodegas gigantes; van protegidos en el vehículo y se entregan de mano a mano.'
  },
  {
    category: 'servicios',
    question: '¿Hacen traslados para personas famosas, artistas o directivos?',
    answer: 'Sí. Contamos con una línea VIP de atención exclusiva que incluye conductores bajo acuerdo de confidencialidad estricta (NDA), vidrios polarizados de seguridad, coordinación de itinerarios especiales y máxima discreción en aeropuertos, hoteles y eventos.'
  },
  {
    category: 'general',
    question: '¿Cómo puedo cotizar o reservar un viaje?',
    answer: 'Puedes utilizar nuestro cotizador en línea en esta página o hacer clic en el botón de WhatsApp. Uno de nuestros coordinadores de operaciones te enviará la tarifa fija exacta en menos de 5 minutos, sin cargos ocultos.'
  }
];
