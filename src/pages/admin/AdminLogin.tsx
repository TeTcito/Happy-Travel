import React, { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getAdminAccount } from '../../config/adminAccount';
import {
  ShieldCheck,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  ArrowRight,
  AlertCircle,
  Loader2,
  CheckCircle2,
  KeyRound,
  Sparkles,
} from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const { user, loading: authLoading, signIn } = useAuth();
  const navigate = useNavigate();

  const currentAccount = getAdminAccount();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!authLoading && user) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!email.trim() || !password) {
      setErrorMsg('Por favor ingrese sus credenciales de administrador.');
      return;
    }

    try {
      setSubmitting(true);
      await signIn(email, password);
      navigate('/admin');
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : 'Error al intentar iniciar sesión.';
      setErrorMsg(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const fillCredentials = () => {
    const acc = getAdminAccount();
    setEmail(acc.email);
    setPassword(acc.password);
    setErrorMsg(null);
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#080A0E] font-sans overflow-hidden">
      {/* =================================================================
          PANEL IZQUIERDO (1/4 DEL ESPACIO - 25%): FORMULARIO COMPACTO
         ================================================================= */}
      <div className="w-full lg:w-1/4 lg:min-w-[360px] lg:max-w-[440px] min-h-screen bg-[#FAF7F2] flex flex-col justify-between p-6 sm:p-8 z-20 shadow-2xl border-r border-[#B8860B]/30">
        {/* Cabecera: Enlace de retorno */}
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 text-xs font-bold uppercase tracking-wider transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#B8860B]" />
            <span>Regresar al Sitio Web</span>
          </Link>
        </div>

        {/* Cuerpo Central del Formulario */}
        <div className="my-auto py-6">
          <div className="inline-flex items-center gap-3 mb-6 bg-[#080A0E] p-3.5 rounded-2xl shadow-lg border border-[#B8860B]/40 w-full">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#B8860B] to-[#F59E0B] p-0.5 flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-[#080A0E] rounded-[10px] flex items-center justify-center">
                <span className="font-display font-black text-[#F59E0B] text-lg tracking-wider">
                  HT
                </span>
              </div>
            </div>
            <div className="border-l border-white/15 pl-3">
              <span className="font-display font-black text-base tracking-tight text-white block leading-none">
                Happy Travel
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#F59E0B] block mt-1">
                Portal Administrativo
              </span>
            </div>
          </div>

          <div className="mb-5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/10 text-slate-900 text-[11px] font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B8860B]" />
              <span>Acceso Exclusivo Administrador</span>
            </div>
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
              Iniciar Sesión
            </h1>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Gestione los carruseles de destinos, rutas con tarifas referenciales, flota ejecutiva y encomiendas.
            </p>
          </div>

          {/* Alerta de error */}
          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2 text-red-700 text-xs">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span className="font-medium">{errorMsg}</span>
            </div>
          )}

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                Correo / Usuario Administrador
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@happytravel.com"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:border-black focus:ring-2 focus:ring-[#B8860B]/25 text-xs sm:text-sm text-slate-900 transition-all font-medium"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:border-black focus:ring-2 focus:ring-[#B8860B]/25 text-xs sm:text-sm text-slate-900 transition-all font-medium"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 px-4 rounded-xl bg-black hover:bg-slate-900 text-[#F59E0B] font-bold text-xs uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer border border-[#B8860B]/30"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verificando...</span>
                </>
              ) : (
                <>
                  <span>Ingresar al Panel</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Acceso directo de credenciales configuradas */}
          <div className="mt-6 pt-5 border-t border-slate-200">
            <div className="bg-white rounded-xl p-3.5 border border-[#B8860B]/30 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1">
                  <KeyRound className="w-3.5 h-3.5 text-[#B8860B]" />
                  Credenciales de Acceso Rápido
                </span>
                <button
                  type="button"
                  onClick={fillCredentials}
                  className="text-[10px] font-bold text-black bg-[#F59E0B]/30 hover:bg-[#F59E0B]/60 px-2 py-0.5 rounded-md transition-colors cursor-pointer"
                >
                  Autocompletar
                </button>
              </div>
              <div className="text-[11px] text-slate-600 space-y-0.5 font-mono">
                <div className="truncate">
                  <strong className="text-slate-800">Usuario:</strong> {currentAccount.email}
                </div>
                <div>
                  <strong className="text-slate-800">Clave:</strong> {currentAccount.password}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pie del Panel Izquierdo */}
        <div className="pt-3 border-t border-slate-200 text-center">
          <p className="text-[11px] text-slate-500">
            &copy; {new Date().getFullYear()} Happy Travel Ecuador. Todos los derechos reservados.
          </p>
        </div>
      </div>

      {/* =================================================================
          PANEL DERECHO (3/4 DEL ESPACIO - 75%): ESCAPARATE VISUAL
         ================================================================= */}
      <div className="hidden lg:flex lg:w-3/4 relative bg-[#080A0E] items-center justify-center p-12 overflow-hidden">
        {/* Imagen de fondo con overlay elegante */}
        <div className="absolute inset-0 z-0">
          <img
            src="/hero-suv.webp"
            alt="Happy Travel Ecuador Transporte Ejecutivo"
            className="w-full h-full object-cover opacity-30 scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#080A0E] via-[#080A0E]/85 to-[#1C2232]/70" />
        </div>

        {/* Luces decorativas */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#B8860B]/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        {/* Contenido central en los 3/4 */}
        <div className="relative z-10 max-w-3xl w-full text-white space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#B8860B]/30 text-[#F59E0B] text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-4 h-4 text-[#F59E0B]" />
            <span>Sistema de Gestión de Contenidos &amp; Carruseles</span>
          </div>

          <h2 className="font-display font-extrabold text-4xl xl:text-5xl leading-tight tracking-tight text-white">
            Control total de sus{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F59E0B] via-[#FBBF24] to-[#B8860B] italic">
              Destinos, Rutas con Tarifas, Flota y Encomiendas
            </span>{' '}
            en tiempo real.
          </h2>

          <p className="text-slate-300 text-base xl:text-lg leading-relaxed max-w-2xl">
            Administre desde un solo lugar las tarjetas de cada carrusel, suba fotografías optimizadas automáticamente a formato WebP, acomode encuadres y actualice la información que sus clientes ven en la web.
          </p>

          {/* Tarjetas de módulos incluidos */}
          <div className="grid grid-cols-3 gap-5 pt-4">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 hover:border-[#B8860B]/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#B8860B]/20 text-[#F59E0B] flex items-center justify-center mb-3 font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="font-sans font-bold text-sm uppercase text-white mb-1">
                Destinos &amp; Rutas
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Carruseles de Destinos Populares en Ecuador y Rutas con tarifas referenciales y tiempos.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 hover:border-[#B8860B]/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#B8860B]/20 text-[#F59E0B] flex items-center justify-center mb-3 font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="font-sans font-bold text-sm uppercase text-white mb-1">
                Nuestra Flota VIP
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Edite las 3 categorías: Clase Ejecutiva, Clase Premium y Clase de Lujo con sus imágenes y detalles.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 hover:border-[#B8860B]/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#B8860B]/20 text-[#F59E0B] flex items-center justify-center mb-3 font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="font-sans font-bold text-sm uppercase text-white mb-1">
                Servicios de Encomienda
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Gestione las 4 tarjetas del carrusel de modalidades de encomiendas y carga privada puerta a puerta.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
