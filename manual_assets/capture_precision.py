import os
import sys
import json
import time
from playwright.sync_api import sync_playwright

OUT_DIR = os.path.abspath("manual_assets/raw_v2")
os.makedirs(OUT_DIR, exist_ok=True)

def scroll_to_element_top(page, selector, offset_y=95):
    """Scrolls window so the element starts exactly offset_y pixels below top of viewport."""
    ok = page.evaluate("""([sel, offset]) => {
        const el = document.querySelector(sel);
        if (!el) return false;
        document.documentElement.style.scrollBehavior = 'auto';
        const rect = el.getBoundingClientRect();
        const targetY = window.scrollY + rect.top - offset;
        window.scrollTo(0, Math.max(0, targetY));
        return true;
    }""", [selector, offset_y])
    time.sleep(1.3)
    return ok

def scroll_to_text_top(page, text_query, offset_y=105):
    """Finds first visible element containing exact text and scrolls its ancestor/itself to offset_y."""
    ok = page.evaluate("""([txt, offset]) => {
        document.documentElement.style.scrollBehavior = 'auto';
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        let node;
        while (node = walker.nextNode()) {
            if (node.textContent && node.textContent.trim().includes(txt)) {
                const el = node.parentElement;
                if (el && el.offsetParent !== null) {
                    const rect = el.getBoundingClientRect();
                    if (rect.width > 0 && rect.height > 0) {
                        window.scrollTo(0, Math.max(0, window.scrollY + rect.top - offset));
                        return true;
                    }
                }
            }
        }
        return false;
    }""", [text_query, offset_y])
    time.sleep(1.4)
    return ok

def get_box(locator, clip_y=0):
    """Returns exact bounding box dict {x, y, w, h} relative to clipped viewport."""
    try:
        if locator.count() == 0:
            return None
        b = locator.first.bounding_box()
        if not b or b["width"] <= 0 or b["height"] <= 0:
            return None
        return {
            "x": round(b["x"], 1),
            "y": round(b["y"] - clip_y, 1),
            "w": round(b["width"], 1),
            "h": round(b["height"], 1),
        }
    except Exception as e:
        print(f"  [WARN] get_box error: {e}")
        return None

def get_union_box(locators, clip_y=0):
    """Returns union bounding box covering multiple locators."""
    boxes = [get_box(l, clip_y) for l in locators]
    boxes = [b for b in boxes if b]
    if not boxes:
        return None
    x1 = min(b["x"] for b in boxes)
    y1 = min(b["y"] for b in boxes)
    x2 = max(b["x"] + b["w"] for b in boxes)
    y2 = max(b["y"] + b["h"] for b in boxes)
    return {"x": round(x1, 1), "y": round(y1, 1), "w": round(x2 - x1, 1), "h": round(y2 - y1, 1)}

def run():
    meta = {}
    with sync_playwright() as p:
        browser = p.chromium.launch(
            executable_path=r"C:\Program Files\Google\Chrome\Application\chrome.exe",
            headless=True
        )
        page = browser.new_page(viewport={"width": 1440, "height": 900})

        # =====================================================================
        # 01. INICIO — CABECERA Y PORTADA HERO
        # =====================================================================
        print("[01] Capturando Inicio - Hero y Navegación...")
        sys.stdout.flush()
        page.goto("https://happy-travel-ec.web.app", wait_until="networkidle")
        time.sleep(1.8)
        # Hide floating WhatsApp tooltip briefly if it cuts at corner, or keep clean
        clip_h = 840
        page.screenshot(path=os.path.join(OUT_DIR, "01_inicio_hero.png"), clip={"x": 0, "y": 0, "width": 1440, "height": clip_h})
        meta["01_inicio_hero"] = {
            "img": "01_inicio_hero.png",
            "width": 1440,
            "height": clip_h,
            "items": [
                {"num": 1, "label": "Logotipo Oficial", "side": "top", "box": get_box(page.locator("header button[aria-label*='Happy Travel']"))},
                {"num": 2, "label": "Menú de 5 Pestañas", "side": "top", "box": get_box(page.locator("header nav"))},
                {"num": 3, "label": "Botón Rápido Cotizar", "side": "top", "box": get_box(page.locator("header button:has-text('Cotizar Viaje')"))},
                {"num": 4, "label": "Titular de Propuesta VIP", "side": "left", "box": get_box(page.locator("main section").first.locator("h1"))},
                {"num": 5, "label": "Prueba Social (+5.000)", "side": "bottom", "box": get_box(page.locator("text=+5.000 viajes realizados").locator(".."))},
                {"num": 6, "label": "Botón CTA Cotizar Viaje", "side": "bottom", "box": get_box(page.locator("main section").first.locator("button:has-text('Cotizar Viaje')"))},
            ]
        }

        # =====================================================================
        # 02. INICIO — CARRUSEL DE DESTINOS POPULARES EN ECUADOR (CMS)
        # =====================================================================
        print("[02] Capturando Destinos Populares en Ecuador...")
        sys.stdout.flush()
        scroll_to_text_top(page, "DESTINOS POPULARES EN ECUADOR", offset_y=100)
        clip_h = 720
        page.screenshot(path=os.path.join(OUT_DIR, "02_destinos_populares.png"), clip={"x": 0, "y": 80, "width": 1440, "height": clip_h})
        dest_sec = page.locator("section", has_text="DESTINOS POPULARES EN ECUADOR").first
        dest_cards = dest_sec.locator("div.snap-start")
        meta["02_destinos_populares"] = {
            "img": "02_destinos_populares.png",
            "width": 1440,
            "height": clip_h,
            "items": [
                {"num": 1, "label": "Encabezado de Módulo", "side": "top", "box": get_union_box([dest_sec.locator("text=DESTINOS POPULARES EN ECUADOR"), dest_sec.locator("h2")], clip_y=80)},
                {"num": 2, "label": "Controles Carrusel (← / →)", "side": "top", "box": get_union_box([dest_sec.locator("button:has-text('Ver Todos')"), dest_sec.locator("button[aria-label='Siguientes destinos']")], clip_y=80)},
                {"num": 3, "label": "Tarjeta Editable (CMS)", "side": "left", "box": get_box(dest_cards.nth(0), clip_y=80)},
                {"num": 4, "label": "Badge de Provincia", "side": "bottom", "box": get_box(dest_cards.nth(1).locator("span", has_text="Guayas"), clip_y=80) or get_box(dest_cards.nth(1).locator("span").first, clip_y=80)},
                {"num": 5, "label": "Acción Cotizar Traslado", "side": "bottom", "box": get_box(dest_cards.nth(2).locator("text=Cotizar Traslado").locator(".."), clip_y=80)},
            ]
        }

        # =====================================================================
        # 03. PUERTA A PUERTA — RUTAS MÁS POPULARES CON TARIFAS (CMS)
        # =====================================================================
        print("[03] Capturando Rutas Más Populares (Puerta a Puerta)...")
        sys.stdout.flush()
        page.locator("header button:has-text('Puerta a Puerta')").click()
        time.sleep(1.6)
        scroll_to_text_top(page, "Rutas Más Populares", offset_y=105)
        clip_h = 520
        page.screenshot(path=os.path.join(OUT_DIR, "03_rutas_populares.png"), clip={"x": 0, "y": 80, "width": 1440, "height": clip_h})
        rutas_h2 = page.locator("h2:has-text('Rutas Más Populares')").first
        rutas_block = rutas_h2.locator("xpath=ancestor::div[3]")
        # Exact card 1 (Quito - Guayaquil), price button on card 2 (Desde $120), metadata on card 3 (Quito - Baños)
        ruta_card_1 = page.locator("h3:has-text('Quito - Guayaquil'), h3:has-text('Quito — Guayaquil')").first.locator("xpath=ancestor::div[contains(@class,'overflow-hidden')][1]")
        ruta_price_2 = page.locator("text=Desde $120").first
        ruta_card_3_meta = page.locator("h3:has-text('Quito - Baños'), h3:has-text('Quito — Baños')").first.locator("xpath=ancestor::div[1]")
        meta["03_rutas_populares"] = {
            "img": "03_rutas_populares.png",
            "width": 1440,
            "height": clip_h,
            "items": [
                {"num": 1, "label": "Cabecera Ornamental", "side": "top", "box": get_box(rutas_h2, clip_y=80)},
                {"num": 2, "label": "Flechas de Navegación", "side": "top", "box": get_union_box([rutas_block.locator("button[aria-label*='anterior'], button[aria-label*='Anterior']"), rutas_block.locator("button[aria-label*='siguiente'], button[aria-label*='Siguiente']")], clip_y=80)},
                {"num": 3, "label": "Tarjeta de Ruta VIP", "side": "bottom", "box": get_box(ruta_card_1, clip_y=80)},
                {"num": 4, "label": "Tarifa Referencial USD", "side": "bottom", "box": get_box(ruta_price_2, clip_y=80)},
                {"num": 5, "label": "Duración y Vehículo", "side": "bottom", "box": get_box(ruta_card_3_meta, clip_y=80)},
            ]
        }

        # =====================================================================
        # 04. PUERTA A PUERTA — CLASES DE FLOTA EJECUTIVA VIP (CMS)
        # =====================================================================
        print("[04] Capturando Clases de Flota Ejecutiva VIP...")
        sys.stdout.flush()
        scroll_to_text_top(page, "Clase Ejecutiva", offset_y=190)
        clip_h = 620
        page.screenshot(path=os.path.join(OUT_DIR, "04_flota_clases.png"), clip={"x": 0, "y": 80, "width": 1440, "height": clip_h})
        card_exec = page.locator("h3:has-text('Clase Ejecutiva')").first.locator("xpath=ancestor::div[2]")
        card_prem = page.locator("h3:has-text('Clase Premium')").first.locator("xpath=ancestor::div[2]")
        card_lux = page.locator("h3:has-text('Clase de Lujo')").first.locator("xpath=ancestor::div[2]")
        meta["04_flota_clases"] = {
            "img": "04_flota_clases.png",
            "width": 1440,
            "height": clip_h,
            "items": [
                {"num": 1, "label": "Clase Ejecutiva (Sedán)", "side": "bottom", "box": get_box(card_exec, clip_y=80)},
                {"num": 2, "label": "Clase Premium (SUV)", "side": "bottom", "box": get_box(card_prem, clip_y=80)},
                {"num": 3, "label": "Clase de Lujo (VIP)", "side": "bottom", "box": get_box(card_lux, clip_y=80)},
            ]
        }

        # =====================================================================
        # 05. ENCOMIENDAS — SERVICIOS DE ENCOMIENDA Y CARGA PRIVADA (CMS)
        # =====================================================================
        print("[05] Capturando Servicios de Encomienda y Carga Privada...")
        sys.stdout.flush()
        page.locator("header button:has-text('Encomiendas')").click()
        time.sleep(1.6)
        scroll_to_text_top(page, "Modalidades Disponibles", offset_y=95)
        clip_h = 740
        page.screenshot(path=os.path.join(OUT_DIR, "05_encomiendas.png"), clip={"x": 0, "y": 80, "width": 1440, "height": clip_h})
        enc_h2 = page.locator("h2:has-text('Servicios de Encomienda y Carga Privada')").first
        enc_sec = enc_h2.locator("xpath=ancestor::section[1]")
        enc_cards = enc_sec.locator("div.snap-start")
        meta["05_encomiendas"] = {
            "img": "05_encomiendas.png",
            "width": 1440,
            "height": clip_h,
            "items": [
                {"num": 1, "label": "Encabezado Encomiendas", "side": "top", "box": get_box(enc_h2, clip_y=80)},
                {"num": 2, "label": "Controles Carrusel", "side": "top", "box": get_union_box([enc_sec.locator("button[aria-label='Anterior servicio']"), enc_sec.locator("button[aria-label='Siguiente servicio']")], clip_y=80)},
                {"num": 3, "label": "Tarjeta Modalidad (CMS)", "side": "bottom", "box": get_box(enc_cards.nth(0), clip_y=80)},
                {"num": 4, "label": "Etiqueta y Categoría", "side": "top", "box": get_box(enc_cards.nth(1).locator("span").first, clip_y=80)},
                {"num": 5, "label": "Botón Cotizar Envío", "side": "bottom", "box": get_box(enc_cards.nth(2).locator("button, a").filter(has_text="Cotizar").first, clip_y=80) or get_box(enc_cards.nth(2).locator("text=Cotizar Ahora").first, clip_y=80)},
            ]
        }

        # =====================================================================
        # 06. CONTÁCTANOS — DATOS, FORMULARIO Y REFERENCIA DE MAPA
        # =====================================================================
        print("[06] Capturando Pestaña Contáctanos...")
        sys.stdout.flush()
        page.locator("header button:has-text('Contáctanos')").click()
        time.sleep(1.6)
        scroll_to_text_top(page, "Ponte en contacto", offset_y=120)
        clip_h = 720
        page.screenshot(path=os.path.join(OUT_DIR, "06_contacto.png"), clip={"x": 0, "y": 80, "width": 1440, "height": clip_h})
        oficina_card = page.locator("h4:has-text('Oficina Principal')").first.locator("xpath=ancestor::div[1]")
        telefono_card = page.locator("h4:has-text('Llámanos')").first.locator("xpath=ancestor::div[1]")
        redes_block = page.locator("h4:has-text('Síguenos en nuestras redes')").first.locator("xpath=ancestor::div[1]")
        form_block = page.locator("h2:has-text('Envíanos un mensaje')").first.locator("xpath=ancestor::div[2]")
        meta["06_contacto"] = {
            "img": "06_contacto.png",
            "width": 1440,
            "height": clip_h,
            "items": [
                {"num": 1, "label": "Oficina / Google Maps (Pendiente)", "side": "top", "box": get_box(oficina_card, clip_y=80)},
                {"num": 2, "label": "Línea Telefónica (Pendiente)", "side": "top", "box": get_box(telefono_card, clip_y=80)},
                {"num": 3, "label": "Redes Sociales Corporativas", "side": "bottom", "box": get_box(redes_block, clip_y=80)},
                {"num": 4, "label": "Formulario de Contacto Directo", "side": "right", "box": get_box(form_block, clip_y=80)},
            ]
        }

        # =====================================================================
        # 07. MODAL INTERACTIVO DE COTIZACIÓN Y RESERVA POR WHATSAPP
        # =====================================================================
        print("[07] Capturando Modal de Cotización Interactiva...")
        sys.stdout.flush()
        page.locator("header button:has-text('Cotizar Viaje')").click()
        time.sleep(1.0)
        page.screenshot(path=os.path.join(OUT_DIR, "07_cotizador_modal.png"))
        modal = page.locator("div:has(h3:has-text('Reserva tu Viaje')), div:has-text('COTIZACIÓN INMEDIATA')").last
        select_srv = page.locator("select").first
        origen_inp = page.locator("input[placeholder*='Bogotá'], input[placeholder*='Origen']").first
        destino_inp = page.locator("input[placeholder*='Medellín'], input[placeholder*='Destino']").first
        fecha_inp = page.locator("input[type='date']").first
        wa_btn = page.locator("button:has-text('Enviar Cotización Directa por WhatsApp')").first
        meta["07_cotizador_modal"] = {
            "img": "07_cotizador_modal.png",
            "width": 1440,
            "height": 900,
            "items": [
                {"num": 1, "label": "Selector Tipo de Servicio", "side": "left", "box": get_box(select_srv)},
                {"num": 2, "label": "Origen y Destino del Viaje", "side": "right", "box": get_union_box([origen_inp, destino_inp])},
                {"num": 3, "label": "Fecha, Hora y Pasajeros", "side": "left", "box": get_box(fecha_inp)},
                {"num": 4, "label": "Envío Directo a WhatsApp", "side": "bottom", "box": get_box(wa_btn)},
            ]
        }

        # =====================================================================
        # 08. ADMIN LOGIN — PANTALLA DE ACCESO AL PORTAL ADMINISTRATIVO
        # =====================================================================
        print("[08] Capturando Login del Panel de Administración...")
        sys.stdout.flush()
        page.goto("https://happy-travel-ec.web.app/admin", wait_until="networkidle")
        time.sleep(1.5)
        page.screenshot(path=os.path.join(OUT_DIR, "08_admin_login.png"))
        back_link = page.locator("a:has-text('Regresar al Sitio Web')").first
        brand_box = page.locator("div:has(img[alt='Happy Travel Logo'])").last
        email_inp = page.locator("input[placeholder*='admin@happytravel.com']").first
        pass_inp = page.locator("input[type='password']").first
        submit_btn = page.locator("button[type='submit']").first
        auto_box = page.locator("button:has-text('Autocompletar')").first.locator("xpath=ancestor::div[2]")
        right_panel = page.locator("img[src*='admin-login-hero']").first
        meta["08_admin_login"] = {
            "img": "08_admin_login.png",
            "width": 1440,
            "height": 900,
            "items": [
                {"num": 1, "label": "Retorno al Sitio Web", "side": "top", "box": get_box(back_link)},
                {"num": 2, "label": "Logotipo Oficial Portal", "side": "left", "box": get_box(brand_box)},
                {"num": 3, "label": "Credenciales de Acceso", "side": "left", "box": get_union_box([email_inp, pass_inp])},
                {"num": 4, "label": "Botón Ingresar al Panel", "side": "left", "box": get_box(submit_btn)},
                {"num": 5, "label": "Acceso Rápido / Autocompletar", "side": "bottom", "box": get_box(auto_box)},
                {"num": 6, "label": "Escaparate Visual 75%", "side": "right", "box": get_box(right_panel)},
            ]
        }

        # =====================================================================
        # 09. ADMIN DASHBOARD — CONSOLA PRINCIPAL Y MÓDULOS CMS
        # =====================================================================
        print("[09] Iniciando sesión y capturando Dashboard CMS...")
        sys.stdout.flush()
        page.locator("button:has-text('Autocompletar')").first.click()
        time.sleep(0.4)
        submit_btn.click()
        time.sleep(2.5)
        page.screenshot(path=os.path.join(OUT_DIR, "09_admin_dashboard.png"))

        aside = page.locator("aside").first
        sidebar_logo = aside.locator("a").first
        sidebar_nav = get_union_box([aside.locator("nav button").first, aside.locator("nav button").last])
        btn_nuevo = page.locator("button:has-text('NUEVO DESTINO'), button:has-text('Nuevo Destino')").first
        first_card = page.locator("button:has-text('Editar')").first.locator("xpath=ancestor::div[contains(@class,'overflow-hidden')][1]")
        edit_btn_card2 = page.locator("button:has-text('Editar')").nth(1)
        top_return = page.locator("a:has-text('Regresar al Sitio Web'), button:has-text('Regresar al Sitio Web')").first
        meta["09_admin_dashboard"] = {
            "img": "09_admin_dashboard.png",
            "width": 1440,
            "height": 900,
            "items": [
                {"num": 1, "label": "Logo Oficial en Sidebar", "side": "top", "box": get_box(sidebar_logo)},
                {"num": 2, "label": "Módulos CMS y Contadores", "side": "bottom", "box": sidebar_nav},
                {"num": 3, "label": "Agregar Nuevo Elemento", "side": "top", "box": get_box(btn_nuevo)},
                {"num": 4, "label": "Tarjetas Publicadas", "side": "bottom", "box": get_box(first_card)},
                {"num": 5, "label": "Botón Editar Tarjeta", "side": "bottom", "box": get_box(edit_btn_card2)},
                {"num": 6, "label": "Regresar al Sitio Web", "side": "top", "box": get_box(top_return)},
            ]
        }

        # =====================================================================
        # 10. ADMIN EDITOR — 3 COLUMNAS + ZOOM/ENCUADRE ACTIVO + VISTA PREVIA 1:1
        # =====================================================================
        print("[10] Abriendo Editor de Tarjeta y activando modo Zoom/Encuadre...")
        sys.stdout.flush()
        page.locator("button:has-text('Editar')").first.click()
        time.sleep(1.5)
        acomodar_btn = page.locator("button:has-text('Acomodar')").first
        if acomodar_btn.count() > 0:
            acomodar_btn.click(force=True)
            time.sleep(0.8)
            slider = page.locator("input[type='range']").first
            if slider.count() > 0:
                slider.fill("1.25")
                time.sleep(0.5)
        page.screenshot(path=os.path.join(OUT_DIR, "10_admin_editor.png"))

        col1 = page.locator("text=1. INFORMACIÓN DEL DESTINO").first.locator("xpath=ancestor::div[2]")
        photo_box = page.locator("input[type='range']").first.locator("xpath=ancestor::div[contains(@class,'overflow-hidden')][1]")
        zoom_bar = page.locator("input[type='range']").first.locator("xpath=ancestor::div[1]")
        col3 = page.locator("text=3. VISTA PREVIA EN LA WEB").first.locator("xpath=ancestor::div[2]")
        save_btn = page.locator("button:has-text('GUARDAR CAMBIOS')").first
        meta["10_admin_editor"] = {
            "img": "10_admin_editor.png",
            "width": 1440,
            "height": 900,
            "items": [
                {"num": 1, "label": "Col. 1: Textos y Campos", "side": "top", "box": get_box(col1)},
                {"num": 2, "label": "Col. 2: Encuadre WebP", "side": "top", "box": get_box(photo_box)},
                {"num": 3, "label": "Barra de Zoom (100%-300%)", "side": "bottom", "box": get_box(zoom_bar)},
                {"num": 4, "label": "Col. 3: Vista Previa 1:1", "side": "top", "box": get_box(col3)},
                {"num": 5, "label": "Guardar en Supabase", "side": "bottom", "box": get_box(save_btn)},
            ]
        }

        # =====================================================================
        # 11. ADMIN PERFIL — SEGURIDAD Y ACTUALIZACIÓN DE CREDENCIALES
        # =====================================================================
        print("[11] Capturando Mi Perfil y Credenciales...")
        sys.stdout.flush()
        page.locator("aside button:has-text('Mi Perfil')").first.click()
        time.sleep(1.5)
        page.screenshot(path=os.path.join(OUT_DIR, "11_admin_perfil.png"))

        name_inp = page.locator("label:has-text('NOMBRE')").first.locator("xpath=following-sibling::div[1]")
        email_prof = page.locator("label:has-text('USUARIO O CORREO')").first.locator("xpath=following-sibling::div[1]")
        pass_prof = page.locator("label:has-text('CAMBIAR CONTRASEÑA')").first.locator("xpath=following-sibling::div[1]")
        phone_prof = page.locator("label:has-text('TELÉFONO')").first.locator("xpath=following-sibling::div[1]")
        save_prof = page.locator("button:has-text('Guardar Cambios de Perfil')").first
        meta["11_admin_perfil"] = {
            "img": "11_admin_perfil.png",
            "width": 1440,
            "height": 900,
            "items": [
                {"num": 1, "label": "Nombre y Apellido / Cargo", "side": "top", "box": get_box(name_inp)},
                {"num": 2, "label": "Correo de Acceso al Panel", "side": "left", "box": get_box(email_prof)},
                {"num": 3, "label": "Cambio de Contraseña Segura", "side": "right", "box": get_box(pass_prof)},
                {"num": 4, "label": "Teléfono / WhatsApp Admin", "side": "left", "box": get_box(phone_prof)},
                {"num": 5, "label": "Guardar Cambios de Perfil", "side": "bottom", "box": get_box(save_prof)},
            ]
        }

        browser.close()

    with open(os.path.join(OUT_DIR, "boxes.json"), "w", encoding="utf-8") as f:
        json.dump(meta, f, indent=2, ensure_ascii=False)

    print("\n=== RESUMEN DE BOUNDING BOXES CAPTURADOS ===")
    for k, v in meta.items():
        nulls = [it["label"] for it in v["items"] if not it["box"]]
        print(f"  {k}: {len(v['items']) - len(nulls)}/{len(v['items'])} exactos" + (f" [FALTAN: {nulls}]" if nulls else " OK"))

if __name__ == "__main__":
    run()
