import React, { useState } from 'react';
import { COMPANY_INFO } from '../../../data/mockData';
import { ScrollReveal } from '../../../components/ScrollReveal';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  Navigation,
  CheckCircle2
} from 'lucide-react';

interface ContactTabProps {
  onOpenQuote?: (serviceType?: string) => void;
}

export const ContactTab: React.FC<ContactTabProps> = () => {
  // Form fields
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedMessage = `✨ *NUEVO MENSAJE DE CONTACTO - HAPPY TRAVEL* ✨
━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 *Nombre:* ${name}
🏢 *Empresa:* ${company || 'Particular'}
📞 *Teléfono:* ${phone}
✉️ *Email:* ${email}
📌 *Asunto:* ${subject || 'Consulta General'}
💬 *Mensaje:*
${message}
━━━━━━━━━━━━━━━━━━━━━━━━━━
_Enviado desde el formulario de contacto web de Happy Travel._`;

    const encoded = encodeURIComponent(formattedMessage);
    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encoded}`, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="-mt-[80px] w-full bg-[#FAF9F5] text-slate-800 font-sans">
      
      {/* 1. HERO HEADER SECTION */}
      <section className="relative w-full bg-[#070A10] overflow-hidden pt-32 sm:pt-36 lg:pt-40 pb-36 sm:pb-44 lg:pb-48 text-white">
        
        {/* Background photo - Generated specifically for Happy Travel Contact Hero */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/contact-hero-generated.jpg"
            alt="Atención al Cliente Happy Travel"
            className="w-full h-full object-cover object-right md:object-center opacity-90 brightness-95 contrast-105"
          />
          {/* Subtle brand tint gradient for high contrast and readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#070A10]/65 via-[#070A10]/45 to-[#070A10]/95" />
        </div>

        {/* Hero Title & Subtitle in Spanish with Entry/Exit Animations */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <ScrollReveal direction="down" distance={28} duration={750} delay={60}>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight drop-shadow-md">
              Contáctanos
            </h1>
          </ScrollReveal>
          
          <ScrollReveal direction="up" distance={20} duration={750} delay={180}>
            <p className="mt-4 text-slate-200 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto font-normal leading-relaxed drop-shadow-sm">
              Happy Travel está listo para brindarte la mejor solución a la medida de tus necesidades
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. FLOATING CONTACT CARD (Overlapping Hero) */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 sm:-mt-32 lg:-mt-36">
        <ScrollReveal direction="up" distance={35} duration={800} delay={120}>
          <div className="bg-white rounded-3xl sm:rounded-[36px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.12)] border border-slate-100 p-6 sm:p-10 lg:p-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
              
              {/* LEFT COLUMN: Ponte en contacto (Entradas desde la izquierda) */}
              <div className="lg:col-span-5 flex flex-col justify-between lg:pr-6 lg:border-r lg:border-slate-100">
                <div>
                  <ScrollReveal direction="left" distance={30} duration={700} delay={160}>
                    <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                      Ponte en contacto
                    </h2>
                    <p className="mt-3 text-xs sm:text-sm text-slate-500 leading-relaxed max-w-sm">
                      Nuestro equipo de atención al cliente y coordinación de rutas está disponible 24/7 para responder todas tus consultas de manera inmediata.
                    </p>
                  </ScrollReveal>

                  {/* 3 Datos de contacto de manera horizontal en una sola fila */}
                  <div className="mt-6 grid grid-cols-3 gap-2.5 sm:gap-3 text-center">
                    
                    {/* Oficina Principal */}
                    <ScrollReveal direction="up" distance={15} duration={500} delay={200}>
                      <div className="flex flex-col items-center p-3 rounded-2xl bg-slate-50/80 border border-slate-100 hover:border-amber-200 transition-colors h-full">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 text-slate-950 flex items-center justify-center shrink-0 shadow-xs mb-2">
                          <MapPin className="w-4 h-4 text-slate-950" />
                        </div>
                        <h4 className="font-bold text-xs text-slate-900 leading-tight">
                          Oficina Principal
                        </h4>
                        <p className="text-[10px] text-slate-500 mt-1 leading-tight">
                          El Trébol, Of. 402<br />Bogotá D.C.
                        </p>
                      </div>
                    </ScrollReveal>

                    {/* Correo Electrónico */}
                    <ScrollReveal direction="up" distance={15} duration={500} delay={260}>
                      <div className="flex flex-col items-center p-3 rounded-2xl bg-slate-50/80 border border-slate-100 hover:border-amber-200 transition-colors h-full">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 text-slate-950 flex items-center justify-center shrink-0 shadow-xs mb-2">
                          <Mail className="w-4 h-4 text-slate-950" />
                        </div>
                        <h4 className="font-bold text-xs text-slate-900 leading-tight">
                          Escríbenos
                        </h4>
                        <a 
                          href={`mailto:${COMPANY_INFO.email}`} 
                          className="text-[10px] text-slate-600 hover:text-amber-600 transition-colors mt-1 leading-tight font-medium block truncate max-w-full"
                          title={COMPANY_INFO.email}
                        >
                          {COMPANY_INFO.email}
                        </a>
                      </div>
                    </ScrollReveal>

                    {/* Línea Telefónica */}
                    <ScrollReveal direction="up" distance={15} duration={500} delay={320}>
                      <div className="flex flex-col items-center p-3 rounded-2xl bg-slate-50/80 border border-slate-100 hover:border-amber-200 transition-colors h-full">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 text-slate-950 flex items-center justify-center shrink-0 shadow-xs mb-2">
                          <Phone className="w-4 h-4 text-slate-950" />
                        </div>
                        <h4 className="font-bold text-xs text-slate-900 leading-tight">
                          Llámanos
                        </h4>
                        <a 
                          href={`tel:${COMPANY_INFO.phone}`} 
                          className="text-[10px] text-slate-700 hover:text-amber-600 font-bold mt-1 leading-tight block truncate max-w-full"
                        >
                          {COMPANY_INFO.phone}
                        </a>
                      </div>
                    </ScrollReveal>

                  </div>
                </div>

                {/* Redes Sociales */}
                <ScrollReveal direction="up" distance={20} duration={650} delay={460}>
                  <div className="mt-10 pt-6 border-t border-slate-100">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-800 mb-3.5">
                      Síguenos en nuestras redes
                    </h4>
                    <div className="flex items-center gap-3">
                      
                      {/* Facebook */}
                      <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Facebook"
                        className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 text-slate-950 hover:from-amber-300 hover:to-amber-500 transition-all flex items-center justify-center shadow-[0_2px_8px_rgba(245,158,11,0.25)] hover:scale-110 active:scale-95"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      </a>

                      {/* Instagram */}
                      <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                        className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 text-slate-950 hover:from-amber-300 hover:to-amber-500 transition-all flex items-center justify-center shadow-[0_2px_8px_rgba(245,158,11,0.25)] hover:scale-110 active:scale-95"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </a>

                      {/* Twitter / X */}
                      <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Twitter / X"
                        className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 text-slate-950 hover:from-amber-300 hover:to-amber-500 transition-all flex items-center justify-center shadow-[0_2px_8px_rgba(245,158,11,0.25)] hover:scale-110 active:scale-95"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                      </a>

                      {/* YouTube */}
                      <a
                        href="https://youtube.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="YouTube"
                        className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 text-slate-950 hover:from-amber-300 hover:to-amber-500 transition-all flex items-center justify-center shadow-[0_2px_8px_rgba(245,158,11,0.25)] hover:scale-110 active:scale-95"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                      </a>

                    </div>
                  </div>
                </ScrollReveal>
              </div>

              {/* RIGHT COLUMN: Envíanos un mensaje Form (Entradas desde la derecha) */}
              <div className="lg:col-span-7">
                <ScrollReveal direction="right" distance={30} duration={700} delay={180}>
                  <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Envíanos un mensaje
                  </h2>
                </ScrollReveal>

                {submitted ? (
                  <ScrollReveal direction="zoom-in" duration={500} delay={50}>
                    <div className="mt-6 p-8 text-center space-y-4 bg-amber-50/60 border border-amber-200 rounded-3xl animate-in fade-in duration-300">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 text-slate-950 flex items-center justify-center mx-auto shadow-sm">
                        <CheckCircle2 className="w-6 h-6 text-slate-950" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-slate-900">
                          ¡Mensaje Enviado Correctamente!
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-md mx-auto">
                          Se ha abierto tu solicitud por WhatsApp para una atención inmediata con nuestros coordinadores. Te responderemos en cuestión de minutos.
                        </p>
                      </div>
                      <div className="pt-2">
                        <button
                          onClick={() => setSubmitted(false)}
                          className="text-xs font-bold text-amber-700 hover:text-amber-800 underline uppercase tracking-wider"
                        >
                          Enviar otro mensaje
                        </button>
                      </div>
                    </div>
                  </ScrollReveal>
                ) : (
                  <form onSubmit={handleFormSubmit} className="mt-6 space-y-4">
                    
                    {/* Fila 1: Nombre y Empresa */}
                    <ScrollReveal direction="right" distance={25} duration={650} delay={220}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                            Nombre
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Tu nombre completo"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-[#F8FAFC] border border-slate-200/90 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20 transition-all shadow-2xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                            Empresa
                          </label>
                          <input
                            type="text"
                            placeholder="Empresa o particular"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            className="w-full bg-[#F8FAFC] border border-slate-200/90 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20 transition-all shadow-2xs"
                          />
                        </div>
                      </div>
                    </ScrollReveal>

                    {/* Fila 2: Teléfono y Correo */}
                    <ScrollReveal direction="right" distance={25} duration={650} delay={290}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                            Teléfono
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder="+57 310 000 0000"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full bg-[#F8FAFC] border border-slate-200/90 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20 transition-all shadow-2xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                            Correo Electrónico
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="correo@ejemplo.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-[#F8FAFC] border border-slate-200/90 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20 transition-all shadow-2xs"
                          />
                        </div>
                      </div>
                    </ScrollReveal>

                    {/* Fila 3: Asunto */}
                    <ScrollReveal direction="right" distance={25} duration={650} delay={360}>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Asunto
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="¿En qué servicio estás interesado?"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          className="w-full bg-[#F8FAFC] border border-slate-200/90 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20 transition-all shadow-2xs"
                        />
                      </div>
                    </ScrollReveal>

                    {/* Fila 4: Mensaje */}
                    <ScrollReveal direction="right" distance={25} duration={650} delay={430}>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Mensaje
                        </label>
                        <textarea
                          rows={4}
                          required
                          placeholder="Cuéntanos los detalles de tu viaje, ruta, fecha o requerimiento..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className="w-full bg-[#F8FAFC] border border-slate-200/90 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20 transition-all resize-none shadow-2xs"
                        ></textarea>
                      </div>
                    </ScrollReveal>

                    {/* Botón de Enviar */}
                    <ScrollReveal direction="up" distance={20} duration={650} delay={500}>
                      <div className="pt-2">
                        <button
                          type="submit"
                          className="w-full py-4 rounded-xl font-extrabold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 transition-all shadow-gold-sm hover:shadow-gold-md active:scale-[0.99] text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <span>Enviar Mensaje</span>
                          <Send className="w-4 h-4 text-slate-950" />
                        </button>
                      </div>
                    </ScrollReveal>
                  </form>
                )}
              </div>

            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 3. FULL-WIDTH MAP SECTION (Bottom - Ajustado al ancho completo de la pestaña) */}
      <section className="w-full relative mt-16 sm:mt-20 lg:mt-24 bg-slate-100 border-t border-slate-200/80 overflow-hidden">
        
        {/* Floating Google Maps Location Card (Like reference image top-left card) */}
        <ScrollReveal direction="right" distance={30} duration={750} delay={180} className="absolute top-5 left-5 sm:top-6 sm:left-6 z-20 pointer-events-auto">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200/80 p-4 sm:p-5 max-w-[290px] sm:max-w-sm">
            <div className="space-y-1">
              <h4 className="font-extrabold text-sm sm:text-base text-slate-900 leading-tight">
                Happy Travel - Sede Principal
              </h4>
              <p className="text-xs text-slate-500 leading-snug">
                Centro Empresarial El Trébol, Of. 402 • Bogotá D.C.
              </p>
              <div className="flex items-center gap-1.5 pt-1 text-xs">
                <span className="font-extrabold text-amber-600">4.9</span>
                <div className="flex text-amber-500 text-xs">
                  {'★★★★★'}
                </div>
                <span className="text-slate-400 text-[11px]">(184 reseñas)</span>
              </div>
            </div>

            <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <a
                href="https://maps.google.com/?q=Centro+Empresarial+El+Trebol"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-amber-600 hover:text-amber-700 hover:underline flex items-center gap-1.5"
              >
                <Navigation className="w-3.5 h-3.5" />
                Cómo llegar
              </a>
              <a
                href="https://maps.google.com/?q=Centro+Empresarial+El+Trebol"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-slate-800 hover:underline"
              >
                Ver mapa más grande
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* Embedded Interactive Map - Ajustado al 100% del ancho de la pestaña */}
        <ScrollReveal direction="up" distance={35} duration={800} delay={220} className="w-full">
          <div className="w-full h-[420px] sm:h-[480px] lg:h-[520px] relative overflow-hidden block">
            <iframe
              src="https://maps.google.com/maps?q=Centro%20Empresarial%20El%20Tr%C3%A9bol&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Happy Travel Ubicación"
              className="w-full h-full block filter saturate-[1.05]"
            />
          </div>
        </ScrollReveal>
      </section>

    </div>
  );
};
