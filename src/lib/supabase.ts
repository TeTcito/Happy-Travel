import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  SUPABASE_URL && SUPABASE_ANON_KEY && SUPABASE_URL.startsWith('http')
);

export const supabase = isSupabaseConfigured
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : createClient('https://placeholder.supabase.co', 'placeholder-anon-key');

// ============================================================================
// 1. CMS MODULES (CARRUSELES Y SECCIONES DEL PANEL ADMINISTRATIVO)
// ============================================================================
export async function saveModulesToSupabase(modulesData: any): Promise<boolean> {
  if (!isSupabaseConfigured) {
    return false;
  }
  try {
    const { error } = await supabase.from('site_config').upsert([
      {
        id: 'happy_travel_cms_modules_v1',
        updated_at: new Date().toISOString(),
        data: modulesData,
      },
    ]);

    if (error) {
      console.warn('Aviso al guardar módulos en Supabase:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Error de red al guardar módulos en Supabase:', err);
    return false;
  }
}

export async function fetchModulesFromSupabase(): Promise<any | null> {
  if (!isSupabaseConfigured) {
    return null;
  }
  try {
    const { data, error } = await supabase
      .from('site_config')
      .select('data')
      .eq('id', 'happy_travel_cms_modules_v1')
      .maybeSingle();

    if (error || !data?.data) return null;
    return data.data;
  } catch (err) {
    console.warn('Error al cargar módulos desde Supabase:', err);
    return null;
  }
}

// ============================================================================
// 2. MEDIA UPLOAD (IMÁGENES WEBP Y VIDEOS MP4/WEBM EN SUPABASE STORAGE)
// ============================================================================
export async function uploadMediaToSupabase(
  file: File,
  prefix = 'media'
): Promise<string | null> {
  if (!isSupabaseConfigured) {
    return null;
  }
  try {
    const ext = file.name.split('.').pop()?.toLowerCase() || 'webp';
    const safeName = file.name
      .replace(/\.[^/.]+$/, '')
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, '-');
    const fileName = `${prefix}-${safeName}-${Date.now()}.${ext}`;

    // Usamos el bucket oficial 'happy-travel-media'
    const targetBucket = 'happy-travel-media';

    const { error: uploadError } = await supabase.storage
      .from(targetBucket)
      .upload(fileName, file, {
        contentType: file.type || (ext === 'webp' ? 'image/webp' : 'video/mp4'),
        upsert: true,
      });

    if (uploadError) {
      console.warn('Aviso al subir archivo a Supabase Storage:', uploadError.message);
      return null;
    }

    const { data: publicUrlData } = supabase.storage
      .from(targetBucket)
      .getPublicUrl(fileName);

    return publicUrlData?.publicUrl || null;
  } catch (err) {
    console.warn('Error subiendo archivo a Supabase Storage:', err);
    return null;
  }
}

// ============================================================================
// 3. ESTADO Y SINCRONIZACIÓN DE BASE DE DATOS
// ============================================================================
export interface TableSyncStatus {
  name: string;
  label: string;
  status: 'synced' | 'pending' | 'error';
  count: number;
}

export async function checkDatabaseSync(): Promise<{
  connected: boolean;
  url: string;
  tables: TableSyncStatus[];
}> {
  const tableList: { name: string; label: string }[] = [
    { name: 'site_config', label: 'Configuración CMS (site_config)' },
    { name: 'leads', label: 'Cotizaciones y Reservas (leads)' },
    { name: 'contact_messages', label: 'Mensajes de Contacto (contact_messages)' },
    { name: 'popular_destinations', label: 'Destinos Populares (popular_destinations)' },
    { name: 'popular_routes', label: 'Rutas Populares (popular_routes)' },
    { name: 'visited_destinations', label: 'Destinos Visitados (visited_destinations)' },
    { name: 'fleet_classes', label: 'Flota y Clases (fleet_classes)' },
    { name: 'parcel_services', label: 'Servicios Encomienda (parcel_services)' },
  ];

  if (!isSupabaseConfigured) {
    return {
      connected: false,
      url: 'Pendiente de Configurar en .env',
      tables: tableList.map((t) => ({
        name: t.name,
        label: t.label,
        status: 'pending',
        count: 0,
      })),
    };
  }

  try {
    const results: TableSyncStatus[] = [];
    for (const t of tableList) {
      const { count, error } = await supabase
        .from(t.name)
        .select('*', { count: 'exact', head: true });

      if (error) {
        results.push({
          name: t.name,
          label: t.label,
          status: 'error',
          count: 0,
        });
      } else {
        results.push({
          name: t.name,
          label: t.label,
          status: 'synced',
          count: count ?? 0,
        });
      }
    }

    const connected = results.some((r) => r.status === 'synced');
    return {
      connected,
      url: SUPABASE_URL,
      tables: results,
    };
  } catch (err) {
    return {
      connected: false,
      url: SUPABASE_URL,
      tables: tableList.map((t) => ({
        name: t.name,
        label: t.label,
        status: 'error',
        count: 0,
      })),
    };
  }
}
