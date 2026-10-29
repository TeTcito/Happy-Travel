import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/mockData';
import { 
  X, 
  Send, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  HeartHandshake, 
  Sparkles, 
  ShieldCheck,
  Car
} from 'lucide-react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
  defaultOrigin?: string;
  defaultDestination?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({ 
  isOpen, 
  onClose,
  defaultService = 'Transporte Puerta a Puerta Privado',
  defaultOrigin = '',
  defaultDestination = ''
}) => {
  const [service, setService] = useState(defaultService);
  const [origin, setOrigin] = useState(defaultOrigin);
  const [destination, setDestination] = useState(defaultDestination);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [passengers, setPassengers] = useState('1 a 3 Pasajeros');
  const [hasPet, setHasPet] = useState(false);
  const [petDetails, setPetDetails] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [notes, setNotes] = useState('');

  React.useEffect(() => {
    if (defaultOrigin) setOrigin(defaultOrigin);
    if (defaultDestination) setDestination(defaultDestination);
    if (defaultService) setService(defaultService);
  }, [defaultOrigin, defaultDestination, defaultService, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = `✨ *SOLICITUD DE COTIZACIÓN - HAPPY TRAVEL* ✨
-------------------------------------
🚗 *Servicio:* ${service}
📍 *Origen:* ${origin || 'No especificado'}
🏁 *Destino:* ${destination || 'No especificado'}
📅 *Fecha:* ${date || 'Por definir'}
⏰ *Hora aprox:* ${time || 'Flexible'}
👥 *Pasajeros/Capacidad:* ${passengers}
🐾 *Mascotas:* ${hasPet ? `Sí (${petDetails || 'Detalle no indicado'})` : 'No'}
👤 *Nombre:* ${clientName || 'Cliente'}
📞 *Teléfono:* ${clientPhone || 'No especificado'}
📝 *Notas / Requerimientos:* ${notes || 'Ninguno'}
-------------------------------------
_Enviado desde el cotizador web de Happy Travel._`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Cotización Inmediata 24/7
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900">
            Reserva tu Viaje con <span className="text-slate-900">Happy</span> <span className="text-amber-500">Travel</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Recibe tu tarifa fija garantizada en menos de 5 minutos por WhatsApp
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Tipo de Servicio */}
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
              Tipo de Servicio Requerido
            </label>
            <div className="relative">
              <Car className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
              >
                <option value="Transporte Puerta a Puerta Privado">Transporte Puerta a Puerta Privado</option>
                <option value="Rutas Interciudades / Intermunicipales">Rutas Interciudades / Intermunicipales</option>
                <option value="Traslado VIP / Famosos & Celebridades">Traslado VIP / Famosos & Celebridades (Máxima Discreción)</option>
                <option value="Encomiendas & Paquetería Express Puerta a Puerta">Encomiendas & Paquetería Express Puerta a Puerta</option>
                <option value="Transporte Exclusivo de Mascotas (Pet Friendly)">Transporte Exclusivo de Mascotas (Pet Friendly)</option>
                <option value="Traslado Ejecutivo Aeropuerto">Traslado Ejecutivo Aeropuerto</option>
              </select>
            </div>
          </div>

          {/* Origen y Destino */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                Dirección / Ciudad Origen
              </label>
              <input
                type="text"
                required
                placeholder="Ej. Bogotá (Calle 127 o Aeropuerto)"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-600" />
                Dirección / Ciudad Destino
              </label>
              <input
                type="text"
                required
                placeholder="Ej. Medellín (El Poblado) o Municipio"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
              />
            </div>
          </div>

          {/* Fecha y Hora */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                Fecha Tentativa
              </label>
              <input
                type="date"
                required
                value={date}
                onClick={(e) => {
                  try {
                    e.currentTarget.showPicker();
                  } catch {}
                }}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                Hora Preferida
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
              />
            </div>
          </div>

          {/* Pasajeros y Mascota */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-slate-500" />
                Pasajeros / O Paquetes
              </label>
              <select
                value={passengers}
                onChange={(e) => setPassengers(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
              >
                <option value="1 Pasajero (Sedán Ejecutivo)">1 Pasajero (Sedán Ejecutivo)</option>
                <option value="2 a 3 Pasajeros">2 a 3 Pasajeros</option>
                <option value="4 a 6 Pasajeros (SUV Premium)">4 a 6 Pasajeros (SUV Premium)</option>
                <option value="7 a 9 Pasajeros (Van Ejecutiva)">7 a 9 Pasajeros (Van Ejecutiva)</option>
                <option value="Solo Encomienda / Paquetería">Solo Encomienda / Paquetería</option>
              </select>
            </div>

            <div className="flex flex-col justify-end">
              <label className="flex items-center gap-3 p-2.5 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer hover:border-amber-500/40 transition-colors">
                <input
                  type="checkbox"
                  checked={hasPet}
                  onChange={(e) => setHasPet(e.target.checked)}
                  className="w-4 h-4 text-amber-500 rounded focus:ring-amber-500"
                />
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <HeartHandshake className="w-4 h-4 text-amber-600" />
                  ¿Viajas con mascota en cabina?
                </span>
              </label>
            </div>
          </div>

          {hasPet && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
              <label className="block text-xs font-bold text-amber-900 mb-1">
                Detalles de tu mascota (Raza, tamaño, necesidades)
              </label>
              <input
                type="text"
                placeholder="Ej. Golden Retriever de 20kg, viaja con su propio arnés"
                value={petDetails}
                onChange={(e) => setPetDetails(e.target.value)}
                className="w-full bg-white border border-amber-300 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500"
              />
            </div>
          )}

          {/* Nombre y Teléfono */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                Tu Nombre Completo
              </label>
              <input
                type="text"
                required
                placeholder="Ej. Carlos Mendoza"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                Tu Número de Contacto
              </label>
              <input
                type="tel"
                required
                placeholder="Ej. +57 312 000 0000"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
              />
            </div>
          </div>

          {/* Notas Adicionales */}
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
              Requerimientos Especiales (Equipaje extra, paradas, privacidad VIP, etc.)
            </label>
            <textarea
              rows={2}
              placeholder="Ej. Llevamos 4 maletas grandes, requerimos factura electrónica corporativa..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors resize-none"
            ></textarea>
          </div>

          {/* Trust callout */}
          <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-medium">
            <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>Garantía de privacidad absoluta, seguro contractual de viaje y tarifa fija sin sorpresas.</span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl font-bold text-amber-300 bg-black hover:bg-slate-900 border border-amber-500/40 transition-all shadow-sm flex items-center justify-center gap-2 active:scale-98 text-sm"
          >
            <Send className="w-4 h-4 text-amber-400" />
            Enviar Cotización Directa por WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
};
