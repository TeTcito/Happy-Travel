import time
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(executable_path=r'C:\Program Files\Google\Chrome\Application\chrome.exe')
    page = browser.new_page(viewport={'width': 1440, 'height': 900})
    page.goto('https://happy-travel-ec.web.app', wait_until='networkidle')
    time.sleep(1)
    
    # Click on 'Puerta a Puerta' in navbar
    tab = page.query_selector('button:has-text("Puerta a Puerta")')
    if tab:
        print("Clicking Puerta a Puerta...")
        tab.click()
        time.sleep(2)
        
        # Scroll down to Rutas Más Populares
        rutas_heading = page.query_selector('text=Rutas Más Populares')
        if rutas_heading:
            rutas_heading.scroll_into_view_if_needed()
            time.sleep(1)
            page.evaluate('window.scrollBy(0, -50)')
            time.sleep(1)
            page.screenshot(path='manual_assets/03_rutas_populares.png', clip={'x': 0, 'y': 0, 'width': 1440, 'height': 680})
            print('Captured 03_rutas_populares.png')
            
        # Click on Cotizar Traslado on a route card to open QuoteModal
        btn_cotizar = page.query_selector('text=Cotizar Traslado') or page.query_selector('button:has-text("Cotizar")')
        if btn_cotizar:
            print("Opening Quote Modal...")
            btn_cotizar.click()
            time.sleep(1.5)
            page.screenshot(path='manual_assets/10_quote_modal.png')
            print('Captured 10_quote_modal.png')

    browser.close()
