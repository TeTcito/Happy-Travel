import os
import time
import sys
from playwright.sync_api import sync_playwright

os.makedirs('manual_assets', exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(executable_path=r'C:\Program Files\Google\Chrome\Application\chrome.exe')
    page = browser.new_page(viewport={'width': 1440, 'height': 900})
    
    print("1. Capturando Hero y Navegación...")
    sys.stdout.flush()
    page.goto('https://happy-travel-ec.web.app', wait_until='networkidle')
    time.sleep(2)
    page.screenshot(path='manual_assets/01_hero_header.png', clip={'x': 0, 'y': 0, 'width': 1440, 'height': 850})
    
    print("2. Capturando Carrusel de Destinos Populares...")
    sys.stdout.flush()
    dest_elem = page.query_selector('text=DESTINOS POPULARES EN ECUADOR')
    if dest_elem:
        dest_elem.scroll_into_view_if_needed()
        time.sleep(1)
        page.evaluate('window.scrollBy(0, -60)')
        time.sleep(1)
        page.screenshot(path='manual_assets/02_destinos_populares.png', clip={'x': 0, 'y': 0, 'width': 1440, 'height': 680})

    print("3. Capturando Carrusel de Rutas Populares...")
    sys.stdout.flush()
    rutas_elem = page.query_selector('text=Rutas Más Populares')
    if rutas_elem:
        rutas_elem.scroll_into_view_if_needed()
        time.sleep(1)
        page.evaluate('window.scrollBy(0, -50)')
        time.sleep(1)
        page.screenshot(path='manual_assets/03_rutas_populares.png', clip={'x': 0, 'y': 0, 'width': 1440, 'height': 680})

    print("4. Capturando Flota Ejecutiva VIP...")
    sys.stdout.flush()
    flota_elem = page.query_selector('text=Nuestra Flota') or page.query_selector('text=Clase Ejecutiva')
    if flota_elem:
        flota_elem.scroll_into_view_if_needed()
        time.sleep(1)
        page.evaluate('window.scrollBy(0, -50)')
        time.sleep(1)
        page.screenshot(path='manual_assets/04_flota_vip.png', clip={'x': 0, 'y': 0, 'width': 1440, 'height': 720})

    print("5. Capturando Servicios de Encomienda...")
    sys.stdout.flush()
    enc_elem = page.query_selector('text=Encomiendas') or page.query_selector('text=Servicio de Encomiendas')
    if enc_elem:
        enc_elem.scroll_into_view_if_needed()
        time.sleep(1)
        page.evaluate('window.scrollBy(0, -50)')
        time.sleep(1)
        page.screenshot(path='manual_assets/05_encomiendas.png', clip={'x': 0, 'y': 0, 'width': 1440, 'height': 720})

    print("6. Capturando Pantalla de Login de Administración...")
    sys.stdout.flush()
    page.goto('https://happy-travel-ec.web.app/admin', wait_until='networkidle')
    time.sleep(2)
    page.screenshot(path='manual_assets/06_admin_login.png')

    print("7. Autocompletando credenciales e iniciando sesión...")
    sys.stdout.flush()
    # Click on the auto-complete button if present, or fill inputs
    auto_btn = page.query_selector('text=Auto-completar credenciales')
    if auto_btn:
        auto_btn.click()
        time.sleep(0.5)
    else:
        page.fill('input[placeholder*="admin@happytravel.com"]', 'admin@happytravel.com')
        page.fill('input[type="password"]', 'happytravel2026')
    
    page.click('button[type="submit"]')
    time.sleep(3)
    
    print("8. Capturando Panel de Administración Principal...")
    sys.stdout.flush()
    page.screenshot(path='manual_assets/07_admin_dashboard.png')

    print("9. Abriendo Editor de Tarjeta...")
    sys.stdout.flush()
    edit_btn = page.query_selector('button:has-text("Editar")') or page.query_selector('[title="Editar"]')
    if edit_btn:
        edit_btn.click()
        time.sleep(2)
        page.screenshot(path='manual_assets/08_admin_editor_modal.png')
    
    print("10. Capturando Sección de Perfil y Credenciales...")
    sys.stdout.flush()
    # Close modal if open
    close_btn = page.query_selector('button:has-text("Cancelar")')
    if close_btn:
        close_btn.click()
        time.sleep(1)

    profile_btn = page.query_selector('text=Mi Perfil')
    if profile_btn:
        profile_btn.click()
        time.sleep(1.5)
        page.screenshot(path='manual_assets/09_admin_profile.png')

    print("¡Todas las capturas se completaron con éxito!")
    sys.stdout.flush()
    browser.close()
