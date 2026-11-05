-- ============================================================================
-- HAPPY TRAVEL - ESQUEMA DE BASE DE DATOS SUPABASE
-- ============================================================================

-- 1. TABLA SITE CONFIG (Almacena configuración global y CMS de módulos)
CREATE TABLE IF NOT EXISTS public.site_config (
    id TEXT PRIMARY KEY,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    data JSONB NOT NULL
);

-- 2. TABLA LEADS / COTIZACIONES (Reservas y cotizaciones de clientes)
CREATE TABLE IF NOT EXISTS public.leads (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    client_name TEXT NOT NULL,
    email TEXT,
    phone TEXT NOT NULL,
    service_type TEXT NOT NULL, -- 'viajes_privados', 'encomiendas', 'pet_travel', 'turismo'
    origin TEXT,
    destination TEXT,
    travel_date TEXT,
    passengers INTEGER DEFAULT 1,
    vehicle_class TEXT,
    notes TEXT,
    status TEXT DEFAULT 'Nuevo' -- 'Nuevo', 'Contactado', 'Cotizado', 'Confirmado', 'Finalizado'
);

-- 3. TABLA MENSAJES DE CONTACTO
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'Pendiente'
);

-- 4. TABLA DESTINOS POPULARES EN ECUADOR (Carrusel Inicio)
CREATE TABLE IF NOT EXISTS public.popular_destinations (
    id TEXT PRIMARY KEY,
    badge TEXT,
    title TEXT NOT NULL,
    location TEXT NOT NULL,
    duration TEXT,
    highlight TEXT,
    description TEXT,
    image_url TEXT,
    order_index INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. TABLA RUTAS MÁS POPULARES (Carrusel Servicios)
CREATE TABLE IF NOT EXISTS public.popular_routes (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    origin TEXT NOT NULL,
    destination TEXT NOT NULL,
    duration TEXT,
    distance TEXT,
    vehicle_type TEXT,
    price_reference NUMERIC,
    inclusions JSONB DEFAULT '[]'::jsonb,
    image_url TEXT,
    order_index INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. TABLA DESTINOS MÁS VISITADOS (Destinos Emblemáticos)
CREATE TABLE IF NOT EXISTS public.visited_destinations (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    province TEXT NOT NULL,
    region TEXT,
    description TEXT,
    badge TEXT,
    image_url TEXT,
    order_index INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. TABLA NUESTRA FLOTA / CLASES (Clase Ejecutiva, Premium, Lujo)
CREATE TABLE IF NOT EXISTS public.fleet_classes (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    subtitle TEXT,
    vehicle_model TEXT,
    capacity TEXT,
    description TEXT,
    features JSONB DEFAULT '[]'::jsonb,
    image_url TEXT,
    order_index INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. TABLA SERVICIOS DE ENCOMIENDA (Modalidades Encomienda)
CREATE TABLE IF NOT EXISTS public.parcel_services (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    tag TEXT,
    description TEXT,
    features JSONB DEFAULT '[]'::jsonb,
    image_url TEXT,
    order_index INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- HABILITAR ROW LEVEL SECURITY (RLS)
-- ============================================================================
ALTER TABLE public.site_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.popular_destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.popular_routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visited_destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fleet_classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parcel_services ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- POLÍTICAS DE ACCESO
-- ============================================================================
DO $$
BEGIN
    -- site_config
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'site_config' AND policyname = 'Lectura publica site_config') THEN
        CREATE POLICY "Lectura publica site_config" ON public.site_config FOR SELECT TO anon, authenticated USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'site_config' AND policyname = 'Escritura site_config') THEN
        CREATE POLICY "Escritura site_config" ON public.site_config FOR ALL TO anon, authenticated USING (true);
    END IF;

    -- leads
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'leads' AND policyname = 'Insercion publica leads') THEN
        CREATE POLICY "Insercion publica leads" ON public.leads FOR INSERT TO anon, authenticated WITH CHECK (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'leads' AND policyname = 'Lectura publica leads') THEN
        CREATE POLICY "Lectura publica leads" ON public.leads FOR SELECT TO anon, authenticated USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'leads' AND policyname = 'Actualizacion leads') THEN
        CREATE POLICY "Actualizacion leads" ON public.leads FOR ALL TO anon, authenticated USING (true);
    END IF;

    -- contact_messages
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'contact_messages' AND policyname = 'Insercion publica contact_messages') THEN
        CREATE POLICY "Insercion publica contact_messages" ON public.contact_messages FOR INSERT TO anon, authenticated WITH CHECK (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'contact_messages' AND policyname = 'Lectura contact_messages') THEN
        CREATE POLICY "Lectura contact_messages" ON public.contact_messages FOR SELECT TO anon, authenticated USING (true);
    END IF;

    -- popular_destinations
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'popular_destinations' AND policyname = 'Lectura popular_destinations') THEN
        CREATE POLICY "Lectura popular_destinations" ON public.popular_destinations FOR SELECT TO anon, authenticated USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'popular_destinations' AND policyname = 'Gestion popular_destinations') THEN
        CREATE POLICY "Gestion popular_destinations" ON public.popular_destinations FOR ALL TO anon, authenticated USING (true);
    END IF;

    -- popular_routes
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'popular_routes' AND policyname = 'Lectura popular_routes') THEN
        CREATE POLICY "Lectura popular_routes" ON public.popular_routes FOR SELECT TO anon, authenticated USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'popular_routes' AND policyname = 'Gestion popular_routes') THEN
        CREATE POLICY "Gestion popular_routes" ON public.popular_routes FOR ALL TO anon, authenticated USING (true);
    END IF;

    -- visited_destinations
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'visited_destinations' AND policyname = 'Lectura visited_destinations') THEN
        CREATE POLICY "Lectura visited_destinations" ON public.visited_destinations FOR SELECT TO anon, authenticated USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'visited_destinations' AND policyname = 'Gestion visited_destinations') THEN
        CREATE POLICY "Gestion visited_destinations" ON public.visited_destinations FOR ALL TO anon, authenticated USING (true);
    END IF;

    -- fleet_classes
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'fleet_classes' AND policyname = 'Lectura fleet_classes') THEN
        CREATE POLICY "Lectura fleet_classes" ON public.fleet_classes FOR SELECT TO anon, authenticated USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'fleet_classes' AND policyname = 'Gestion fleet_classes') THEN
        CREATE POLICY "Gestion fleet_classes" ON public.fleet_classes FOR ALL TO anon, authenticated USING (true);
    END IF;

    -- parcel_services
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'parcel_services' AND policyname = 'Lectura parcel_services') THEN
        CREATE POLICY "Lectura parcel_services" ON public.parcel_services FOR SELECT TO anon, authenticated USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'parcel_services' AND policyname = 'Gestion parcel_services') THEN
        CREATE POLICY "Gestion parcel_services" ON public.parcel_services FOR ALL TO anon, authenticated USING (true);
    END IF;
END $$;

-- ============================================================================
-- STORAGE BUCKET PARA MULTIMEDIA
-- ============================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('happy-travel-media', 'happy-travel-media', true)
ON CONFLICT (id) DO NOTHING;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND policyname = 'Permitir subida publica happy-travel-media') THEN
        CREATE POLICY "Permitir subida publica happy-travel-media" ON storage.objects
        FOR INSERT TO anon, authenticated WITH CHECK (bucket_id = 'happy-travel-media');
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND policyname = 'Permitir lectura publica happy-travel-media') THEN
        CREATE POLICY "Permitir lectura publica happy-travel-media" ON storage.objects
        FOR SELECT TO anon, authenticated USING (bucket_id = 'happy-travel-media');
    END IF;
END $$;
