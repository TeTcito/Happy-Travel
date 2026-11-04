import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || 'https://pezajodvvouezumnppaj.supabase.co';
const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBlemFqb2R2dm91ZXp1bW5wcGFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMzMDA4ODEsImV4cCI6MjEwODg3Njg4MX0.LsQfzxKPk576WIWrNQ9UnILIXCm0a-LeIGFq_r0mDb0';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ============================================================================
// 1. CMS MODULES (CARRUSELES Y SECCIONES DEL PANEL ADMINISTRATIVO)
// ============================================================================
export async function saveModulesToSupabase(modulesData: any): Promise<boolean> {
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
  try {
    const ext = file.name.split('.').pop()?.toLowerCase() || 'webp';
    const safeName = file.name
      .replace(/\.[^/.]+$/, '')
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, '-');
    const fileName = `${prefix}-${safeName}-${Date.now()}.${ext}`;

    // Intentamos subir al bucket 'happy-travel-media' o 'hacienda-media'
    const targetBucket = 'hacienda-media';

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
