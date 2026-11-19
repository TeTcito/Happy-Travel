import os
from PIL import Image, ImageDraw, ImageFont

def get_fonts():
    try:
        font_num = ImageFont.truetype(r"C:\Windows\Fonts\segoeuib.ttf", 20)
        font_txt = ImageFont.truetype(r"C:\Windows\Fonts\segoeuib.ttf", 13)
    except Exception:
        font_num = ImageFont.load_default()
        font_txt = ImageFont.load_default()
    return font_num, font_txt

def draw_bubble(draw, num, x, y, target_x=None, target_y=None, label="", color=(217, 119, 6), font_num=None, font_txt=None):
    radius = 18
    # 1. Target line and point
    if target_x is not None and target_y is not None:
        draw.line([(x, y), (target_x, target_y)], fill=(255, 255, 255), width=4)
        draw.line([(x, y), (target_x, target_y)], fill=color, width=2)
        # Target dot
        t_r = 5
        draw.ellipse([target_x - t_r, target_y - t_r, target_x + t_r, target_y + t_r], fill=color, outline=(255, 255, 255), width=2)

    # 2. Bubble shadow
    draw.ellipse([x - radius + 2, y - radius + 2, x + radius + 2, y + radius + 2], fill=(0, 0, 0, 120))

    # 3. Main Bubble circle
    draw.ellipse([x - radius, y - radius, x + radius, y + radius], fill=color, outline=(255, 255, 255), width=3)

    # 4. Number text
    num_str = str(num)
    bbox = draw.textbbox((0, 0), num_str, font=font_num)
    w = bbox[2] - bbox[0]
    h = bbox[3] - bbox[1]
    draw.text((x - w / 2, y - h / 2 - 2), num_str, fill=(255, 255, 255), font=font_num)

    # 5. Label pill
    if label:
        t_bbox = draw.textbbox((0, 0), label, font=font_txt)
        lw = t_bbox[2] - t_bbox[0]
        lh = t_bbox[3] - t_bbox[1]
        
        # Decide if label goes to right or left
        if x > 1100:
            px = x - radius - lw - 20
        else:
            px = x + radius + 8
        py = y - 13
        pad_x = 8
        pad_y = 4
        
        draw.rounded_rectangle([px, py, px + lw + pad_x*2, py + lh + pad_y*2], radius=7, fill=(15, 23, 42), outline=(255, 255, 255), width=1)
        draw.text((px + pad_x, py + pad_y - 1), label, fill=(255, 255, 255), font=font_txt)

def process_all():
    font_num, font_txt = get_fonts()
    os.makedirs('manual_assets/annotated', exist_ok=True)
    amber = (217, 119, 6)
    gold = (184, 134, 11)
    blue = (14, 116, 144)
    emerald = (16, 185, 129)
    red = (225, 20, 56)

    # 1. 01_hero_header.png
    im = Image.open('manual_assets/01_hero_header.png').convert('RGB')
    d = ImageDraw.Draw(im)
    draw_bubble(d, 1, 140, 100, 110, 45, "Logotipo Oficial & Enlace Inicio", gold, font_num, font_txt)
    draw_bubble(d, 2, 620, 100, 620, 45, "Menú de Navegación por Pestañas", gold, font_num, font_txt)
    draw_bubble(d, 3, 200, 210, 240, 240, "Titular & Propuesta de Valor VIP", amber, font_num, font_txt)
    draw_bubble(d, 4, 170, 440, 220, 440, "Prueba Social (+5.000 Viajes)", emerald, font_num, font_txt)
    draw_bubble(d, 5, 380, 440, 430, 440, "Botón Cotizar Viaje", red, font_num, font_txt)
    draw_bubble(d, 6, 1120, 300, 1100, 360, "Fondo Panorámico Vehículo SUV", gold, font_num, font_txt)
    im.save('manual_assets/annotated/01_hero_header.png')
    print("Annotated 01_hero_header.png")

    # 2. 02_destinos_populares.png
    im = Image.open('manual_assets/02_destinos_populares.png').convert('RGB')
    d = ImageDraw.Draw(im)
    draw_bubble(d, 1, 240, 60, 280, 80, "Título del Carrusel & Badge Activo", gold, font_num, font_txt)
    draw_bubble(d, 2, 1180, 60, 1280, 80, "Controles de Desplazamiento (← / →)", amber, font_num, font_txt)
    draw_bubble(d, 3, 220, 250, 270, 250, "Fotografía HD & Badge de Provincia", blue, font_num, font_txt)
    draw_bubble(d, 4, 220, 370, 270, 370, "Nombre de la Ciudad e Hito Icónico", emerald, font_num, font_txt)
    draw_bubble(d, 5, 220, 560, 270, 560, "Botón Cotizar Traslado Directo", amber, font_num, font_txt)
    im.save('manual_assets/annotated/02_destinos_populares.png')
    print("Annotated 02_destinos_populares.png")

    # 3. 03_rutas_populares.png
    im = Image.open('manual_assets/03_rutas_populares.png').convert('RGB')
    d = ImageDraw.Draw(im)
    draw_bubble(d, 1, 720, 60, 720, 95, "Cabecera de Rutas Populares", gold, font_num, font_txt)
    draw_bubble(d, 2, 220, 260, 260, 260, "Imagen de Ruta & Puntos de Conexión", blue, font_num, font_txt)
    draw_bubble(d, 3, 220, 390, 260, 390, "Duración Estimada & Tipo de Vía", emerald, font_num, font_txt)
    draw_bubble(d, 4, 220, 470, 260, 470, "Tarifa Referencial en USD", amber, font_num, font_txt)
    draw_bubble(d, 5, 220, 570, 260, 570, "Botón Solicitar Ruta Puerta a Puerta", red, font_num, font_txt)
    im.save('manual_assets/annotated/03_rutas_populares.png')
    print("Annotated 03_rutas_populares.png")

    # 4. 04_flota_vip.png
    im = Image.open('manual_assets/04_flota_vip.png').convert('RGB')
    d = ImageDraw.Draw(im)
    draw_bubble(d, 1, 720, 50, 720, 90, "Sección de Flota Ejecutiva VIP", gold, font_num, font_txt)
    draw_bubble(d, 2, 240, 280, 260, 320, "Clase Ejecutiva (Sedán Corporativo)", blue, font_num, font_txt)
    draw_bubble(d, 3, 720, 280, 720, 320, "Clase Premium (SUV Familiar)", emerald, font_num, font_txt)
    draw_bubble(d, 4, 1150, 280, 1180, 320, "Clase de Lujo (Van Ejecutiva)", amber, font_num, font_txt)
    im.save('manual_assets/annotated/04_flota_vip.png')
    print("Annotated 04_flota_vip.png")

    # 5. 05_encomiendas.png
    im = Image.open('manual_assets/05_encomiendas.png').convert('RGB')
    d = ImageDraw.Draw(im)
    draw_bubble(d, 1, 720, 50, 720, 90, "Servicios de Encomiendas & Carga", gold, font_num, font_txt)
    draw_bubble(d, 2, 280, 300, 320, 340, "Modalidad Documentos & Valijas", blue, font_num, font_txt)
    draw_bubble(d, 3, 720, 300, 720, 340, "Modalidad Paquetería Delicada", emerald, font_num, font_txt)
    draw_bubble(d, 4, 1140, 300, 1120, 340, "Carga Comercial & Logística Puerta a Puerta", amber, font_num, font_txt)
    im.save('manual_assets/annotated/05_encomiendas.png')
    print("Annotated 05_encomiendas.png")

    # 6. 06_admin_login.png
    im = Image.open('manual_assets/06_admin_login.png').convert('RGB')
    d = ImageDraw.Draw(im)
    draw_bubble(d, 1, 150, 60, 100, 50, "Enlace de Retorno al Sitio Web", gold, font_num, font_txt)
    draw_bubble(d, 2, 170, 140, 110, 140, "Logotipo Oficial & Identidad", gold, font_num, font_txt)
    draw_bubble(d, 3, 170, 390, 140, 390, "Campos de Correo y Contraseña", blue, font_num, font_txt)
    draw_bubble(d, 4, 170, 600, 140, 600, "Botón Autocompletar Credenciales", emerald, font_num, font_txt)
    draw_bubble(d, 5, 820, 380, 880, 420, "Escaparate Visual 75% SUV Ejecutivo", amber, font_num, font_txt)
    im.save('manual_assets/annotated/06_admin_login.png')
    print("Annotated 06_admin_login.png")

    # 7. 07_admin_dashboard.png
    im = Image.open('manual_assets/07_admin_dashboard.png').convert('RGB')
    d = ImageDraw.Draw(im)
    draw_bubble(d, 1, 150, 70, 80, 40, "Logo Corporativo en Panel Lateral", gold, font_num, font_txt)
    draw_bubble(d, 2, 150, 220, 80, 220, "Pestañas de los 5 Módulos CMS", blue, font_num, font_txt)
    draw_bubble(d, 3, 240, 220, 260, 220, "Contadores de Tarjetas en Tiempo Real", emerald, font_num, font_txt)
    draw_bubble(d, 4, 620, 260, 550, 260, "Cuadrícula de Tarjetas Publicadas", amber, font_num, font_txt)
    draw_bubble(d, 5, 1180, 180, 1260, 180, "Botones de Acción (Editar / Agregar)", red, font_num, font_txt)
    im.save('manual_assets/annotated/07_admin_dashboard.png')
    print("Annotated 07_admin_dashboard.png")

    # 8. 08_admin_editor_modal.png
    im = Image.open('manual_assets/08_admin_editor_modal.png').convert('RGB')
    d = ImageDraw.Draw(im)
    draw_bubble(d, 1, 420, 260, 360, 260, "Columna 1: Edición de Textos y Tarifas", blue, font_num, font_txt)
    draw_bubble(d, 2, 680, 260, 720, 260, "Columna 2: Carga y Conversión a WebP", emerald, font_num, font_txt)
    draw_bubble(d, 3, 680, 480, 720, 480, "Herramienta de Zoom y Encuadre Seguro", amber, font_num, font_txt)
    draw_bubble(d, 4, 1080, 260, 1120, 260, "Columna 3: Previsualización 1:1 en Vivo", gold, font_num, font_txt)
    draw_bubble(d, 5, 1150, 780, 1100, 780, "Botón Guardar Cambios en Supabase", red, font_num, font_txt)
    im.save('manual_assets/annotated/08_admin_editor_modal.png')
    print("Annotated 08_admin_editor_modal.png")

    # 9. 09_admin_profile.png
    im = Image.open('manual_assets/09_admin_profile.png').convert('RGB')
    d = ImageDraw.Draw(im)
    draw_bubble(d, 1, 550, 310, 480, 310, "Datos del Administrador (Nombres)", gold, font_num, font_txt)
    draw_bubble(d, 2, 550, 410, 480, 410, "Correo Electrónico de Acceso", blue, font_num, font_txt)
    draw_bubble(d, 3, 550, 520, 480, 520, "Actualización de Contraseña Segura", emerald, font_num, font_txt)
    draw_bubble(d, 4, 820, 700, 780, 700, "Botón Guardar Cambios de Perfil", amber, font_num, font_txt)
    im.save('manual_assets/annotated/09_admin_profile.png')
    print("Annotated 09_admin_profile.png")

    # 10. 10_quote_modal.png
    im = Image.open('manual_assets/10_quote_modal.png').convert('RGB')
    d = ImageDraw.Draw(im)
    draw_bubble(d, 1, 520, 230, 460, 230, "Modal de Cotización Interactiva VIP", gold, font_num, font_txt)
    draw_bubble(d, 2, 520, 320, 460, 320, "Selector de Categoría de Viaje", blue, font_num, font_txt)
    draw_bubble(d, 3, 520, 430, 460, 430, "Campos de Origen, Destino y Pasajeros", emerald, font_num, font_txt)
    draw_bubble(d, 4, 720, 680, 720, 650, "Botón de Enlace Directo a WhatsApp", red, font_num, font_txt)
    im.save('manual_assets/annotated/10_quote_modal.png')
    print("Annotated 10_quote_modal.png")

    print("¡Todas las imágenes anotadas se generaron exitosamente en manual_assets/annotated/!")

if __name__ == '__main__':
    process_all()
