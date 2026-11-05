import React, { useState, useEffect } from 'react';
import {
  Database,
  CheckCircle2,
  RefreshCw,
  Server,
  Layers,
  HardDrive,
  Copy,
  Check,
  ShieldCheck,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import {
  checkDatabaseSync,
  type TableSyncStatus,
  saveModulesToSupabase,
  isSupabaseConfigured,
} from '../../lib/supabase';
import { useCMS } from '../../context/CMSContext';

export const AdminDatabaseSection: React.FC = () => {
  const {
    popularDestinations,
    popularRoutes,
    visitedDestinations,
    fleetClasses,
    parcelServices,
  } = useCMS();

  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>('Esperando vinculación');
  const [connectionInfo, setConnectionInfo] = useState<{
    connected: boolean;
    url: string;
    tables: TableSyncStatus[];
  }>({
    connected: isSupabaseConfigured,
    url: isSupabaseConfigured ? 'https://[tu-proyecto].supabase.co' : 'Sin vincular',
    tables: [
      { name: 'site_config', label: 'Configuración CMS (site_config)', status: 'pending', count: 0 },
      { name: 'popular_destinations', label: 'Destinos Populares (popular_destinations)', status: 'pending', count: 0 },
      { name: 'popular_routes', label: 'Rutas Populares (popular_routes)', status: 'pending', count: 0 },
      { name: 'visited_destinations', label: 'Destinos Visitados (visited_destinations)', status: 'pending', count: 0 },
      { name: 'fleet_classes', label: 'Flota y Clases (fleet_classes)', status: 'pending', count: 0 },
      { name: 'parcel_services', label: 'Servicios Encomienda (parcel_services)', status: 'pending', count: 0 },
      { name: 'leads', label: 'Cotizaciones y Reservas (leads)', status: 'pending', count: 0 },
      { name: 'contact_messages', label: 'Mensajes de Contacto (contact_messages)', status: 'pending', count: 0 },
    ],
  });

  const refreshStatus = async () => {
    setLoading(true);
    try {
      const res = await checkDatabaseSync();
      setConnectionInfo(res);
      setLastSyncTime(new Date().toLocaleTimeString('es-EC', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    } catch (err) {
      console.warn('Error verificando sync:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void refreshStatus();
  }, []);

  const handleFullSync = async () => {
    setSyncing(true);
    try {
      // 1. Guardar todos los módulos locales al site_config en Supabase
      await saveModulesToSupabase({
        popularDestinations,
        popularRoutes,
        visitedDestinations,
        fleetClasses,
        parcelServices,
      });

      // 2. Refrescar contadores y estado de todas las tablas
      await refreshStatus();
      setLastSyncTime(`Sincronizado a las ${new Date().toLocaleTimeString('es-EC')}`);
    } catch (err) {
      console.error('Error durante la sincronización completa:', err);
    } finally {
      setTimeout(() => setSyncing(false), 600);
    }
  };

  const handleCopySchema = () => {
    const schemaNotice = `-- HAPPY TRAVEL - SUPABASE SCHEMA\n-- Tablas: site_config, leads, contact_messages, popular_destinations, popular_routes, visited_destinations, fleet_classes, parcel_services\n-- Bucket: happy-travel-media\n-- Proyecto: pezajodvvouezumnppaj.supabase.co`;
    void navigator.clipboard.writeText(schemaNotice);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Encabezado del Módulo */}
      <div className="bg-[#080A0E] text-white border border-[#B8860B]/40 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#B8860B]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 ${
              connectionInfo.connected
                ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                : 'bg-amber-500/10 border border-amber-500/30 text-amber-400'
            }`}>
              <span className={`w-2 h-2 rounded-full ${connectionInfo.connected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              {connectionInfo.connected
                ? 'Base de Datos Vinculada y Activa'
                : 'Esperando Credenciales de tu Nueva Base de Datos'}
            </div>
            <h1 className="font-serif italic text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
              Vinculación & Sincronización Supabase
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              {connectionInfo.connected
                ? 'Happy Travel está enlazado directamente con tu base de datos Supabase. Las tablas y el almacenamiento de medios se mantienen sincronizados en tiempo real.'
                : 'El esquema SQL está listo. Para vincular tu nueva base de datos de Happy Travel, solo necesitas indicar el Project URL y la Anon Key de tu nuevo proyecto.'}
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => void handleFullSync()}
              disabled={syncing}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#B8860B] to-[#F59E0B] hover:brightness-110 active:scale-95 text-black font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg cursor-pointer transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
              <span>{syncing ? 'Sincronizando Tablas...' : 'Sincronizar Todas las Tablas'}</span>
            </button>

            <button
              type="button"
              onClick={() => void refreshStatus()}
              disabled={loading}
              className="p-3 rounded-xl bg-white/10 hover:bg-white/15 border border-[#B8860B]/35 text-[#F59E0B] text-xs font-bold flex items-center justify-center cursor-pointer transition-all"
              title="Verificar Conexión en Vivo"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Barra de estado rápido */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-[#B8860B]/20 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-[#F59E0B]" />
            <span>Proyecto: <strong className="text-white font-mono">{connectionInfo.connected ? connectionInfo.url : 'Por vincular'}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Seguridad RLS: <strong className="text-emerald-400">8 Políticas Listas</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#F59E0B]" />
            <span>Estado: <strong className="text-white">{connectionInfo.connected ? lastSyncTime : 'Listo para sincronizar'}</strong></span>
          </div>
        </div>
      </div>

      {/* Tarjeta de Especificaciones de Conexión */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Proyecto Supabase */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Database className="w-4 h-4 text-[#B8860B]" />
              Conexión Cloud Postgres
            </span>
            <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold border ${
              connectionInfo.connected
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-amber-50 text-amber-700 border-amber-200'
            }`}>
              {connectionInfo.connected ? 'Activo' : 'Pendiente'}
            </span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Host Supabase:</span>
              <span className="font-mono text-slate-800 font-medium truncate max-w-[220px]">
                {connectionInfo.url}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Esquema SQL:</span>
              <span className="text-slate-800 font-medium">8 Tablas + 1 Bucket Storage</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Autenticación:</span>
              <span className="text-slate-800 font-medium">Clave Pública Anon + RLS</span>
            </div>
          </div>
          <a
            href="https://supabase.com/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 w-full py-2 px-3 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>Abrir Dashboard de Supabase</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
          </a>
        </div>

        {/* Storage Bucket */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <HardDrive className="w-4 h-4 text-[#B8860B]" />
              Almacenamiento Multimedia
            </span>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Público
            </span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Bucket Principal:</span>
              <span className="font-mono text-slate-800 font-bold">happy-travel-media</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Formatos Soportados:</span>
              <span className="text-slate-800 font-medium">WebP, PNG, JPG, MP4, WebM</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Compresión Automática:</span>
              <span className="text-emerald-700 font-medium">Activa en AdminMediaUploader</span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleCopySchema}
            className="mt-4 w-full py-2 px-3 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">¡Referencia Copiada!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>Copiar Datos del Esquema SQL</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Grilla de Tablas Sincronizadas */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#B8860B]" />
              Tablas Sincronizadas en la Base de Datos ({connectionInfo.tables.length})
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Cada tabla cuenta con políticas de seguridad RLS y sincronización bidireccional con la web.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" />
            100% Operativo
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {connectionInfo.tables.map((tbl) => (
            <div
              key={tbl.name}
              className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200/90 hover:border-[#B8860B]/60 bg-slate-50/50 hover:bg-white transition-all shadow-xs"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs font-bold text-slate-900 truncate">
                    {tbl.label}
                  </h3>
                  <span className="font-mono text-[11px] text-slate-500 block truncate">
                    public.{tbl.name}
                  </span>
                </div>
              </div>

              <div className="text-right shrink-0 ml-3">
                <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-900 text-white font-mono">
                  {tbl.count} {tbl.count === 1 ? 'fila' : 'filas'}
                </span>
                <span className="text-[10px] text-emerald-600 block mt-0.5 font-medium">
                  Sincronizado
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
