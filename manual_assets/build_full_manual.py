import os
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import parse_xml, OxmlElement
from docx.oxml.ns import nsdecls, qn
import win32com.client

# ==============================================================================
# COLORES Y ESTILOS
# ==============================================================================
HEX_GOLD = "B8860B"         # Dorado institucional Happy Travel
HEX_AMBER = "D97706"        # Ámbar de énfasis
HEX_NAVY = "0B1E36"         # Azul marino profundo / obsidiana
HEX_SLATE = "334155"        # Gris pizarra para textos
HEX_LIGHT_BG = "F8FAFC"     # Fondo gris claro para tablas/cajas
HEX_GOLD_BG = "FEF9C3"      # Fondo amarillo dorado sutil
HEX_ALERT_BG = "FFFBEB"     # Fondo ámbar suave para advertencias/garantía
HEX_BORDER = "CBD5E1"       # Borde sutil

COLOR_GOLD = RGBColor(184, 134, 11)
COLOR_AMBER = RGBColor(217, 119, 6)
COLOR_NAVY = RGBColor(11, 30, 54)
COLOR_SLATE = RGBColor(51, 65, 85)
COLOR_MUTED = RGBColor(100, 116, 139)

def set_cell_background(cell, fill_hex):
    shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{fill_hex}"/>')
    cell._tc.get_or_add_tcPr().append(shd)

def set_cell_margins(cell, top=60, bottom=60, left=80, right=80):
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = OxmlElement('w:tcMar')
    for m, val in [('top', top), ('bottom', bottom), ('left', left), ('right', right)]:
        node = OxmlElement(f'w:{m}')
        node.set(qn('w:w'), str(val))
        node.set(qn('w:type'), 'dxa')
        tcMar.append(node)
    tcPr.append(tcMar)

def set_callout_border(cell, color_hex="B8860B", sz="36"):
    tcPr = cell._tc.get_or_add_tcPr()
    tcBorders = parse_xml(
        f'<w:tcBorders {nsdecls("w")}>'
        f'  <w:top w:val="none"/>'
        f'  <w:left w:val="single" w:sz="{sz}" w:space="0" w:color="{color_hex}"/>'
        f'  <w:bottom w:val="none"/>'
        f'  <w:right w:val="none"/>'
        f'</w:tcBorders>'
    )
    tcPr.append(tcBorders)

def add_header_footer(doc):
    for s in doc.sections:
        s.top_margin = Inches(0.75)
        s.bottom_margin = Inches(0.75)
        s.left_margin = Inches(0.75)
        s.right_margin = Inches(0.75)
        
        header = s.header
        hp = header.paragraphs[0]
        hp.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        hrun = hp.add_run("Happy Travel Ecuador • Manual de Entrega & Guía Operativa")
        hrun.font.name = "Calibri"
        hrun.font.size = Pt(8.5)
        hrun.font.color.rgb = COLOR_MUTED

        footer = s.footer
        fp = footer.paragraphs[0]
        fp.alignment = WD_ALIGN_PARAGRAPH.CENTER
        frun = fp.add_run("Documento Oficial de Entrega & Guía de Usuario • Happy Travel Ecuador © 2026")
        frun.font.name = "Calibri"
        frun.font.size = Pt(8.5)
        frun.font.color.rgb = COLOR_MUTED

def add_cover(doc):
    p_top = doc.add_paragraph()
    p_top.paragraph_format.space_before = Pt(16)
    p_top.paragraph_format.space_after = Pt(14)

    logo_path = os.path.abspath("public/logo-transparent.png")
    if os.path.exists(logo_path):
        p_logo = doc.add_paragraph()
        p_logo.alignment = WD_ALIGN_PARAGRAPH.CENTER
        run_logo = p_logo.add_run()
        run_logo.add_picture(logo_path, height=Inches(1.15))
        p_logo.paragraph_format.space_after = Pt(16)

    p_pill = doc.add_paragraph()
    p_pill.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_pill = p_pill.add_run("ACTA DE CULMINACIÓN & MANUAL TÉCNICO DE USUARIO")
    r_pill.font.name = "Calibri"
    r_pill.font.size = Pt(10)
    r_pill.font.bold = True
    r_pill.font.color.rgb = COLOR_GOLD
    p_pill.paragraph_format.space_after = Pt(8)

    p_title = doc.add_paragraph()
    p_title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_title = p_title.add_run("PLATAFORMA WEB INTEGRAL &\nPANEL DE ADMINISTRACIÓN (CMS)")
    r_title.font.name = "Calibri"
    r_title.font.size = Pt(22)
    r_title.font.bold = True
    r_title.font.color.rgb = COLOR_NAVY
    p_title.paragraph_format.space_after = Pt(10)

    p_sub = doc.add_paragraph()
    p_sub.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_sub = p_sub.add_run("Happy Travel Ecuador • Transporte Privado VIP & Encomiendas Puerta a Puerta")
    r_sub.font.name = "Calibri"
    r_sub.font.size = Pt(11)
    r_sub.font.color.rgb = COLOR_SLATE
    p_sub.paragraph_format.space_after = Pt(22)

    table = doc.add_table(rows=6, cols=2)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    table.autofit = False

    meta_items = [
        ("Proyecto:", "Desarrollo Web Responsive, Carruseles Dinámicos y Panel CMS"),
        ("URL de Producción:", "https://happy-travel-ec.web.app"),
        ("URL de Administración:", "https://happy-travel-ec.web.app/admin"),
        ("Estado de Entrega:", "CULMINADO FORMALMENTE (Cumplimiento de Cronograma)"),
        ("Garantía y Soporte:", "30 Días de Garantía Post-Entrega para Ajustes Sin Costo"),
        ("Fecha de Emisión:", "Noviembre 2026 • Versión Oficial 1.0"),
    ]

    for i, (k, v) in enumerate(meta_items):
        row = table.rows[i]
        
        c0 = row.cells[0]
        c0.width = Inches(2.2)
        p0 = c0.paragraphs[0]
        p0.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        r0 = p0.add_run(k)
        r0.font.name = "Calibri"
        r0.font.bold = True
        r0.font.size = Pt(9.5)
        r0.font.color.rgb = COLOR_NAVY
        
        c1 = row.cells[1]
        c1.width = Inches(4.3)
        p1 = c1.paragraphs[0]
        r1 = p1.add_run(v)
        r1.font.name = "Calibri"
        r1.font.size = Pt(9.5)
        if "CULMINADO" in v:
            r1.font.bold = True
            r1.font.color.rgb = COLOR_AMBER
        elif "30 Días" in v:
            r1.font.bold = True
            r1.font.color.rgb = COLOR_GOLD
        else:
            r1.font.color.rgb = COLOR_SLATE
            
        set_cell_margins(c0, top=50, bottom=50, left=80, right=80)
        set_cell_margins(c1, top=50, bottom=50, left=80, right=80)
        set_cell_background(c0, HEX_LIGHT_BG)
        set_cell_background(c1, HEX_LIGHT_BG)

    doc.add_page_break()

def add_heading_1(doc, text):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(16)
    p.paragraph_format.space_after = Pt(6)
    p.paragraph_format.keep_with_next = True
    run = p.add_run(text)
    run.font.name = "Calibri"
    run.font.size = Pt(14)
    run.font.bold = True
    run.font.color.rgb = COLOR_NAVY
    return p

def add_heading_2(doc, text):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(10)
    p.paragraph_format.space_after = Pt(4)
    p.paragraph_format.keep_with_next = True
    run = p.add_run(text)
    run.font.name = "Calibri"
    run.font.size = Pt(11.5)
    run.font.bold = True
    run.font.color.rgb = COLOR_GOLD
    return p

def add_paragraph(doc, text, bold_prefix=None, space_after=4):
    p = doc.add_paragraph()
    p.paragraph_format.space_after = Pt(space_after)
    p.paragraph_format.line_spacing = 1.15
    if bold_prefix:
        r_pre = p.add_run(bold_prefix)
        r_pre.font.name = "Calibri"
        r_pre.font.bold = True
        r_pre.font.size = Pt(9)
        r_pre.font.color.rgb = COLOR_NAVY
    run = p.add_run(text)
    run.font.name = "Calibri"
    run.font.size = Pt(9)
    run.font.color.rgb = COLOR_SLATE
    return p

def add_callout(doc, text, title=None, border_color="B8860B", bg_color="FFFBEB"):
    table = doc.add_table(rows=1, cols=1)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    table.autofit = False
    cell = table.rows[0].cells[0]
    cell.width = Inches(6.5)
    set_cell_margins(cell, top=100, bottom=100, left=150, right=150)
    set_cell_background(cell, bg_color)
    set_callout_border(cell, color_hex=border_color, sz="36")
    
    p = cell.paragraphs[0]
    p.paragraph_format.space_after = Pt(0)
    p.paragraph_format.line_spacing = 1.15
    
    if title:
        rt = p.add_run(title + "\n")
        rt.font.name = "Calibri"
        rt.font.bold = True
        rt.font.size = Pt(9.5)
        rt.font.color.rgb = COLOR_NAVY if border_color != "E11438" else RGBColor(180, 20, 40)
        
    rc = p.add_run(text)
    rc.font.name = "Calibri"
    rc.font.size = Pt(8.5)
    rc.font.color.rgb = COLOR_SLATE
    
    p_space = doc.add_paragraph()
    p_space.paragraph_format.space_before = Pt(0)
    p_space.paragraph_format.space_after = Pt(4)

def add_image_figure(doc, img_rel_path, caption_text):
    abs_path = os.path.abspath(img_rel_path)
    if os.path.exists(abs_path):
        p_img = doc.add_paragraph()
        p_img.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p_img.paragraph_format.space_before = Pt(6)
        p_img.paragraph_format.space_after = Pt(3)
        p_img.paragraph_format.keep_with_next = True
        run_img = p_img.add_run()
        run_img.add_picture(abs_path, width=Inches(5.4))
        
        p_cap = doc.add_paragraph()
        p_cap.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p_cap.paragraph_format.space_before = Pt(1)
        p_cap.paragraph_format.space_after = Pt(6)
        r_cap = p_cap.add_run(caption_text)
        r_cap.font.name = "Calibri"
        r_cap.font.size = Pt(8)
        r_cap.font.italic = True
        r_cap.font.color.rgb = COLOR_MUTED

def add_bubble_table(doc, items):
    table = doc.add_table(rows=len(items) + 1, cols=3)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    table.autofit = False

    hdr = table.rows[0]
    headers = [("Punto", Inches(0.6), WD_ALIGN_PARAGRAPH.CENTER), 
               ("Elemento / Componente", Inches(1.9), WD_ALIGN_PARAGRAPH.LEFT), 
               ("Descripción y Funcionamiento Operativo", Inches(4.0), WD_ALIGN_PARAGRAPH.LEFT)]
    
    for idx, (title, w, align) in enumerate(headers):
        c = hdr.cells[idx]
        c.width = w
        set_cell_margins(c, top=50, bottom=50, left=70, right=70)
        set_cell_background(c, HEX_NAVY)
        p = c.paragraphs[0]
        p.alignment = align
        r = p.add_run(title)
        r.font.name = "Calibri"
        r.font.bold = True
        r.font.size = Pt(8.5)
        r.font.color.rgb = RGBColor(255, 255, 255)

    for r_idx, (num_str, title_str, desc_str) in enumerate(items):
        row = table.rows[r_idx + 1]
        bg = HEX_LIGHT_BG if r_idx % 2 == 0 else "FFFFFF"
        
        c0 = row.cells[0]
        c0.width = Inches(0.6)
        set_cell_margins(c0, top=40, bottom=40, left=40, right=40)
        set_cell_background(c0, bg)
        p0 = c0.paragraphs[0]
        p0.alignment = WD_ALIGN_PARAGRAPH.CENTER
        r0 = p0.add_run(num_str)
        r0.font.name = "Calibri"
        r0.font.bold = True
        r0.font.size = Pt(10)
        r0.font.color.rgb = COLOR_GOLD

        c1 = row.cells[1]
        c1.width = Inches(1.9)
        set_cell_margins(c1, top=40, bottom=40, left=70, right=70)
        set_cell_background(c1, bg)
        p1 = c1.paragraphs[0]
        r1 = p1.add_run(title_str)
        r1.font.name = "Calibri"
        r1.font.bold = True
        r1.font.size = Pt(8.5)
        r1.font.color.rgb = COLOR_NAVY

        c2 = row.cells[2]
        c2.width = Inches(4.0)
        set_cell_margins(c2, top=40, bottom=40, left=70, right=70)
        set_cell_background(c2, bg)
        p2 = c2.paragraphs[0]
        r2 = p2.add_run(desc_str)
        r2.font.name = "Calibri"
        r2.font.size = Pt(8)
        r2.font.color.rgb = COLOR_SLATE

    p_sp = doc.add_paragraph()
    p_sp.paragraph_format.space_before = Pt(0)
    p_sp.paragraph_format.space_after = Pt(4)

def build_manual():
    print("Iniciando generación de documento Word...")
    doc = docx.Document()
    add_header_footer(doc)
    add_cover(doc)

    # ==============================================================================
    # CAPÍTULO 1: ACTA DE CULMINACIÓN FORMAL Y CLÁUSULA DE GARANTÍA
    # ==============================================================================
    add_heading_1(doc, "1. Acta de Culminación Formal y Cláusula de Garantía de 30 Días")
    
    add_paragraph(doc, 
        "El presente documento certifica la finalización y entrega oficial del desarrollo tecnológico correspondiente a la nueva plataforma web interactiva y el panel de administración centralizado (CMS) para la empresa Happy Travel Ecuador, especializada en transporte privado ejecutivo interprovincial y servicios de encomienda puerta a puerta.",
        bold_prefix="1.1 Objeto de la Entrega: ")

    add_paragraph(doc,
        "La plataforma ha sido desarrollada siguiendo estrictos estándares internacionales de ingeniería web, arquitectura por componentes modernos en React 18, estilos utilitarios Tailwind CSS, tipografías refinadas con acabado premium, animaciones cinemáticas fluidas mediante ScrollReveal, mapas de geolocalización interactivos y un completo gestor de contenidos sincronizado en la nube (Supabase Cloud).",
        bold_prefix="1.2 Alcance Técnico Ejecutado: ")

    add_callout(doc,
        "Por medio del presente instrumento se deja constancia formal de que el proyecto se declara COMPLETAMENTE CULMINADO en la fecha estipulada, en estricto apego al cronograma técnico y los compromisos de entrega acordados.\n\n"
        "No obstante, se deja expresamente asentado que existen 4 elementos externos que quedan en estado PENDIENTE DE VINCULACIÓN debido a que el cliente sobrepasó el tiempo límite establecido para remitir los datos e insumos necesarios solicitados oportunamente por el equipo de desarrollo:\n\n"
        "1. NOMBRE DE DOMINIO WEB Y GESTIÓN DNS: Delegación de los registros DNS (tipo A y CNAME) del dominio oficial definitivo (.com / .ec / .com.ec) para apuntar a la CDN global de Google Firebase Hosting.\n"
        "2. NÚMERO DE CONTACTO OFICIAL Y ENLACE DE WHATSAPP: Número telefónico corporativo final para la atención de clientes y la vinculación de llamadas directas y chats de cotización pre-formateada.\n"
        "3. ENLACE DE GEOLOCALIZACIÓN EN GOOGLE MAPS: Código o URL de ubicación satelital exacta de las oficinas comerciales / terminal matriz para el mapa interactivo de contacto.\n"
        "4. CREDENCIALES DE BASE DE DATOS PROPIA (SI APLICA): Actualmente el sistema opera 100% en la nube sincronizado con el proyecto activo de Supabase. Si el cliente requiere enlazar su propia cuenta institucional de Supabase, queda pendiente la entrega de sus llaves de acceso.\n\n"
        "CLÁUSULA DE GARANTÍA DE 30 DÍAS: Con el objetivo de brindar total tranquilidad y respaldo a Happy Travel Ecuador, el equipo técnico otorga un PERIODO DE GARANTÍA Y SOPORTE DE 30 DÍAS CALENDARIO posteriores a esta entrega. Durante estos 30 días, en el momento que el cliente proporcione el dominio, número telefónico, mapa o base de datos, el equipo técnico realizará la vinculación, configuración y puesta en marcha de dichos elementos de manera totalmente INMEDIATA Y SIN COSTO ADICIONAL ALGUNO.",
        title="DECLARACIÓN OFICIAL DE CULMINACIÓN & CLÁUSULA DE GARANTÍA VIGENTE (30 DÍAS)",
        border_color="B8860B",
        bg_color="FFFBEB"
    )

    # ==============================================================================
    # CAPÍTULO 2: PARÁMETROS TÉCNICOS Y CREDENCIALES DE ACCESO
    # ==============================================================================
    add_heading_1(doc, "2. Parámetros Técnicos y Credenciales de Acceso")
    
    add_paragraph(doc,
        "A continuación se detallan las direcciones web, accesos administrativos y credenciales operativas asignadas para la administración de la plataforma:")

    cred_data = [
        ("Sitio Web Público", "https://happy-travel-ec.web.app", "Acceso libre para clientes en web y móvil."),
        ("Panel de Control (CMS)", "https://happy-travel-ec.web.app/admin", "Acceso exclusivo para el personal autorizado."),
        ("Usuario Administrador", "admin@happytravel.com (o 'admin')", "Identificador corporativo principal."),
        ("Contraseña de Acceso", "happytravel2026", "Modificable en cualquier momento en 'Mi Perfil'."),
        ("Base de Datos Cloud", "https://ewhhibgqxpekychzemrt.supabase.co", "Sincronización en tiempo real vía Supabase."),
        ("Infraestructura CDN", "Google Firebase Hosting (Global Edge)", "Certificado SSL de seguridad HTTPS activo."),
    ]

    table_cred = doc.add_table(rows=len(cred_data) + 1, cols=3)
    table_cred.alignment = WD_TABLE_ALIGNMENT.CENTER
    table_cred.autofit = False

    cred_headers = [("Parámetro", Inches(1.8)), ("Valor / Enlace", Inches(3.2)), ("Notas de Seguridad", Inches(1.5))]
    for idx, (title, w) in enumerate(cred_headers):
        c = table_cred.rows[0].cells[idx]
        c.width = w
        set_cell_margins(c, top=60, bottom=60, left=80, right=80)
        set_cell_background(c, HEX_NAVY)
        p = c.paragraphs[0]
        r = p.add_run(title)
        r.font.name = "Calibri"
        r.font.bold = True
        r.font.size = Pt(8.5)
        r.font.color.rgb = RGBColor(255, 255, 255)

    for r_idx, (p_str, v_str, n_str) in enumerate(cred_data):
        row = table_cred.rows[r_idx + 1]
        bg = HEX_LIGHT_BG if r_idx % 2 == 0 else "FFFFFF"
        
        c0 = row.cells[0]
        c0.width = Inches(1.8)
        set_cell_margins(c0, top=50, bottom=50, left=70, right=70)
        set_cell_background(c0, bg)
        p0 = c0.paragraphs[0]
        r0 = p0.add_run(p_str)
        r0.font.name = "Calibri"
        r0.font.bold = True
        r0.font.size = Pt(8)
        r0.font.color.rgb = COLOR_NAVY

        c1 = row.cells[1]
        c1.width = Inches(3.2)
        set_cell_margins(c1, top=50, bottom=50, left=70, right=70)
        set_cell_background(c1, bg)
        p1 = c1.paragraphs[0]
        r1 = p1.add_run(v_str)
        r1.font.name = "Calibri"
        r1.font.size = Pt(8)
        if "admin" in v_str or "happytravel2026" in v_str:
            r1.font.bold = True
            r1.font.color.rgb = COLOR_AMBER
        else:
            r1.font.color.rgb = COLOR_SLATE

        c2 = row.cells[2]
        c2.width = Inches(1.5)
        set_cell_margins(c2, top=50, bottom=50, left=70, right=70)
        set_cell_background(c2, bg)
        p2 = c2.paragraphs[0]
        r2 = p2.add_run(n_str)
        r2.font.name = "Calibri"
        r2.font.size = Pt(7.5)
        r2.font.color.rgb = COLOR_MUTED

    p_sp = doc.add_paragraph()
    p_sp.paragraph_format.space_before = Pt(0)
    p_sp.paragraph_format.space_after = Pt(6)

    # ==============================================================================
    # CAPÍTULO 3: ARQUITECTURA TÉCNICA Y AUDITORÍA DE RENDIMIENTO
    # ==============================================================================
    add_heading_1(doc, "3. Arquitectura Técnica y Auditoría de Rendimiento")

    add_paragraph(doc,
        "La plataforma fue sometida a rigurosas auditorías de optimización con la herramienta oficial Google PageSpeed Insights (Lighthouse), alcanzando calificaciones sobresalientes de 80/100 en dispositivos móviles y 97/100 en computadoras de escritorio. Este logro técnico se obtuvo sin eliminar ninguna transición, manteniendo intactos todos los efectos visuales cinematográficos y la fidelidad del diseño institucional.",
        bold_prefix="3.1 Rendimiento y Core Web Vitals: ")

    add_callout(doc,
        "• Rendimiento Móvil (PageSpeed Insights): 80 / 100 (Tiempo de Bloqueo Total: 0 ms • CLS: 0)\n"
        "• Rendimiento de Escritorio (PageSpeed Insights): 97 / 100 (Pintado con Contenido Más Grande: 0.2 s)\n"
        "• Optimización de Formatos Multimedia: Conversión y renderizado en formato WebP de última generación.\n"
        "• Carga Condicional y Lazy Loading: Separación de bundles JavaScript para carga ultrarrápida bajo demanda.\n"
        "• Diseño Adaptativo (Responsive): Experiencia óptima en teléfonos inteligentes, tablets y pantallas de escritorio.",
        title="MÉTRICAS OFICIALES DE VELOCIDAD Y RENDIMIENTO AUDITADAS",
        border_color="10B981",
        bg_color="F0FDF4"
    )

    doc.add_page_break()

    # ==============================================================================
    # CAPÍTULO 4: GUÍA ILUSTRADA DEL SITIO WEB PÚBLICO
    # ==============================================================================
    add_heading_1(doc, "4. Guía Ilustrada de la Página Web Pública")
    add_paragraph(doc,
        "A continuación se presenta un recorrido detallado por cada uno de los apartados de la página web pública, con capturas de pantalla de alta resolución y burbujas numeradas que indican con precisión cada componente y su respectiva funcionalidad operativa:")

    # 4.1 Hero & Navigation
    add_heading_2(doc, "4.1 Barra Superior y Sección Hero Principal")
    add_paragraph(doc,
        "La cabecera y el hero principal constituyen la primera impresión del usuario, combinando la identidad de marca, navegación intuitiva y una propuesta de valor de transporte ejecutivo puerta a puerta.")

    add_image_figure(doc, "manual_assets/annotated/01_hero_header.png", 
        "Figura 1: Cabecera institucional, navegación interactiva y sección Hero con vehículo VIP al atardecer.")

    add_bubble_table(doc, [
        ("①", "Logotipo Corporativo Oficial", "Emblema oficial de Happy Travel Ecuador con resplandor dorado sutil. Al hacer clic, restablece la navegación y regresa suavemente a la vista principal de inicio."),
        ("②", "Menú de Navegación por Pestañas", "Permite alternar de manera instantánea entre las vistas: Inicio, Puerta a Puerta, Encomiendas, Transporte de Mascotas y Contáctanos sin recargar la página."),
        ("③", "Titular y Propuesta de Valor", "Encabezado principal con tipografía display de gran escala que comunica la exclusividad, puntualidad y seguridad de los viajes interprovinciales privados."),
        ("④", "Prueba Social (+5.000 Viajes)", "Píldora interactiva con avatares de clientes y conteo dinámico que genera confianza inmediata en el usuario desde el primer segundo de visita."),
        ("⑤", "Botón CTA 'Cotizar Viaje'", "Acción de conversión principal que despliega el modal interactivo de cotización para calcular tarifas y conectar directamente con el canal de atención."),
        ("⑥", "Fondo Fotográfico Panorámico", "Fotografía editorial de alta gama de vehículo SUV ejecutivo en carretera al atardecer con degradados oscuros que aseguran perfecta legibilidad."),
    ])

    doc.add_page_break()

    # 4.2 Destinos Populares
    add_heading_2(doc, "4.2 Carrusel de Destinos Populares en Ecuador")
    add_paragraph(doc,
        "Módulo dinámico que exhibe las principales ciudades y atractivos turísticos del país. Este carrusel es 100% administrable en tiempo real desde el panel de control.")

    add_image_figure(doc, "manual_assets/annotated/02_destinos_populares.png", 
        "Figura 2: Carrusel interactivo de Destinos Populares con tarjetas fotográficas y badges de provincia.")

    add_bubble_table(doc, [
        ("①", "Badge y Título de Sección", "Indicador animado en tonalidad ámbar con pulso activo y titular 'Conduce hacia tu Próxima Aventura' acompañado de texto descriptivo."),
        ("②", "Controles de Navegación (← / →)", "Botones circulares con control inteligente: se deshabilitan con opacidad tenue cuando se alcanza el inicio o fin del carrusel para evitar desplazamientos nulos."),
        ("③", "Fotografía HD & Badge Provincia", "Imagen de alta resolución de la ciudad con etiqueta flotante superior derecha que indica la provincia (ej. Pichincha, Guayas, Manabí, Azuay)."),
        ("④", "Ciudad e Hito Icónico", "Nombre de la localidad acompañado del atractivo representativo (ej. 'Centro Histórico & Mitad del Mundo', 'Playa El Murciélago & Puerto Atunero')."),
        ("⑤", "Botón 'Cotizar Traslado'", "Abre el cotizador emergente preseleccionando automáticamente la ciudad elegida como punto de destino para facilitar la reserva al usuario."),
    ])

    doc.add_page_break()

    # 4.3 Rutas Populares
    add_heading_2(doc, "4.3 Carrusel de Rutas Populares con Tarifas y Tiempos")
    add_paragraph(doc,
        "Presenta los trayectos interprovinciales más solicitados por los clientes con tarifas referenciales en dólares, duración estimada y beneficios incluidos.")

    add_image_figure(doc, "manual_assets/annotated/03_rutas_populares.png", 
        "Figura 3: Carrusel de Rutas Populares con tarifas referenciales en dólares, tiempos y tipo de vehículo.")

    add_bubble_table(doc, [
        ("①", "Cabecera Ornamental Dorada", "Título 'Rutas Más Populares' con isotipos dorados estilizados y línea de conexión referencial que enmarca la elegancia visual de la marca."),
        ("②", "Fotografía de la Ruta & Trayecto", "Imagen representativa del destino final (ej. Guayaquil, Cuenca, Baños, Salinas) con indicación visual del trayecto directo puerta a puerta."),
        ("③", "Duración Estimada & Tipo de Vía", "Especificación técnica del tiempo de recorrido y ruta seleccionada (ej. '7h 30m • Ruta Directa', '3h 45m • Vía El Cajas')."),
        ("④", "Tarifa Referencial en Dólares", "Precio base transparente (ej. 'Desde $120', 'Desde $220') que previene confusiones y acelera la decisión de compra del pasajero."),
        ("⑤", "Botón 'Solicitar Ruta Puerta a Puerta'", "Dispara la reserva del trayecto cargando automáticamente el origen, destino y vehículo asignado para su confirmación."),
    ])

    doc.add_page_break()

    # 4.4 Flota VIP
    add_heading_2(doc, "4.4 Nuestra Flota Ejecutiva VIP")
    add_paragraph(doc,
        "Módulo donde se clasifican y exhiben los diferentes tipos de vehículos que conforman el parque automotor de Happy Travel Ecuador.")

    add_image_figure(doc, "manual_assets/annotated/04_flota_vip.png", 
        "Figura 4: Módulo de Flota Ejecutiva VIP segmentada en Clase Ejecutiva, Clase Premium y Clase de Lujo.")

    add_bubble_table(doc, [
        ("①", "Encabezado de la Flota VIP", "Presentación de la flota con descripción de confort, aire acondicionado, mantenimiento riguroso y choferes profesionales certificados."),
        ("②", "Clase Ejecutiva (Sedán)", "Vehículos ideales para ejecutivos y traslados corporativos individuales o en pareja, con amplio maletero y máxima discreción."),
        ("③", "Clase Premium (SUV)", "Vehículos utilitarios deportivos de tracción 4x4/4x2 para viajes familiares, rutas de montaña y recorridos panorámicos con gran comodidad."),
        ("④", "Clase de Lujo (Van Ejecutiva)", "Unidades de alta capacidad para delegaciones, grupos turísticos y traslados con equipaje voluminoso sin sacrificar confort."),
    ])

    doc.add_page_break()

    # 4.5 Encomiendas
    add_heading_2(doc, "4.5 Servicios de Encomienda y Carga Puerta a Puerta")
    add_paragraph(doc,
        "Muestra las diferentes modalidades de paquetería y logística privada con garantías de cero pérdidas y entrega directa en mano.")

    add_image_figure(doc, "manual_assets/annotated/05_encomiendas.png", 
        "Figura 5: Sección de modalidades de encomiendas y logística de carga privada.")

    add_bubble_table(doc, [
        ("①", "Cabecera del Servicio de Encomiendas", "Enfoque en velocidad, custodia permanente del paquete y cero pérdidas en ruta con vehículos exclusivos."),
        ("②", "Modalidad Documentos & Valijas", "Servicio especializado para sobres confidenciales, contratos legales, pasaportes y correspondencia urgente."),
        ("③", "Modalidad Paquetería Delicada", "Transporte de artículos frágiles, tecnología y compras personales con manipulación cuidadosa."),
        ("④", "Carga Comercial Puerta a Puerta", "Traslado de cajas comerciales, mercadería para negocios y suministros industriales entre provincias."),
    ])

    doc.add_page_break()

    # 4.6 Modal de Cotización
    add_heading_2(doc, "4.6 Modal Interactivo de Cotización y Reserva VIP")
    add_paragraph(doc,
        "Ventana emergente que guía al usuario en la estructuración de su solicitud y la transmite en un mensaje limpio preformateado a WhatsApp.")

    add_image_figure(doc, "manual_assets/annotated/10_quote_modal.png", 
        "Figura 6: Modal interactivo de cotización rápida con conexión a WhatsApp.")

    add_bubble_table(doc, [
        ("①", "Cabecera del Cotizador", "Título del modal con botón de cierre (✕) y badge identificativo del servicio."),
        ("②", "Selector de Categoría", "Permite elegir entre Transporte Puerta a Puerta, Traslado Aeropuerto, Encomienda o Transporte de Mascotas."),
        ("③", "Campos de Origen, Destino y Pasajeros", "Entradas de texto dinámicas para especificar lugar de recogida exacto, destino final, fecha y número de personas."),
        ("④", "Botón 'Confirmar por WhatsApp'", "Genera automáticamente un enlace cifrado que abre WhatsApp con el mensaje estructurado con todos los datos del viaje."),
    ])

    doc.add_page_break()

    # ==============================================================================
    # CAPÍTULO 5: MANUAL OPERATIVO DEL PANEL DE ADMINISTRACIÓN (CMS)
    # ==============================================================================
    add_heading_1(doc, "5. Manual Operativo del Panel de Control de Administración (CMS)")
    add_paragraph(doc,
        "El Panel de Administración de Happy Travel es una herramienta intuitiva diseñada para que el personal de la empresa pueda modificar fotografías, textos, tarifas y duraciones de todos los carruseles sin necesidad de tocar código fuente.")

    # 5.1 Login
    add_heading_2(doc, "5.1 Pantalla de Inicio de Sesión (Login)")
    add_paragraph(doc,
        "El portal administrativo cuenta con una interfaz moderna protegida por credenciales de acceso seguras y dividida en una proporción visual 25% / 75%.")

    add_image_figure(doc, "manual_assets/annotated/06_admin_login.png", 
        "Figura 7: Pantalla de Login con logo corporativo oficial y escaparate cinematográfico del 75%.")

    add_bubble_table(doc, [
        ("①", "Enlace de Retorno al Sitio Web", "Permite volver a la navegación pública en cualquier momento sin cerrar la pestaña."),
        ("②", "Logo Institucional y Portal Administrativo", "Identidad oficial de Happy Travel con escudo de seguridad que acredita el acceso exclusivo para administradores."),
        ("③", "Campos de Correo y Contraseña", "Formulario con opción para mostrar u ocultar la clave y validación en tiempo real."),
        ("④", "Botón Autocompletar Credenciales", "Herramienta de conveniencia que rellena las credenciales por defecto para agilizar el ingreso diario."),
        ("⑤", "Escaparate Visual 75%", "Fotografía editorial de alta definición de un SUV de lujo en la cordillera de los Andes al atardecer, evocando el prestigio de la marca."),
    ])

    doc.add_page_break()

    # 5.2 Dashboard
    add_heading_2(doc, "5.2 Panel Principal y Navegación por Módulos")
    add_paragraph(doc,
        "Al ingresar al panel, se despliega la consola principal con la barra lateral oscura y la cuadrícula de tarjetas activas correspondientes al módulo seleccionado.")

    add_image_figure(doc, "manual_assets/annotated/07_admin_dashboard.png", 
        "Figura 8: Consola principal del Panel de Administración con módulos de carruseles.")

    add_bubble_table(doc, [
        ("①", "Logo Oficial en Barra Lateral", "Identificador institucional permanente con acceso directo a la home."),
        ("②", "Pestañas de los 5 Módulos CMS", "Navegación entre: Destinos Populares, Rutas Populares, Destinos Más Visitados, Flota VIP y Servicios de Encomienda."),
        ("③", "Contadores en Tiempo Real", "Badges numéricos que informan la cantidad de tarjetas activas en cada carrusel."),
        ("④", "Cuadrícula de Tarjetas Publicadas", "Vista previa organizada de las tarjetas visibles actualmente en la página web."),
        ("⑤", "Botón 'Editar' y 'Agregar Elemento'", "Permite modificar una tarjeta existente o añadir un nuevo destino o ruta a la plataforma."),
    ])

    doc.add_page_break()

    # 5.3 Editor Modal
    add_heading_2(doc, "5.3 Guía Paso a Paso para la Edición de Tarjetas y Gestión de Imágenes")
    add_paragraph(doc,
        "El editor de tarjetas es la herramienta central del CMS. Consta de una estructura de 3 columnas para garantizar total control sobre los contenidos:")

    add_image_figure(doc, "manual_assets/annotated/08_admin_editor_modal.png", 
        "Figura 9: Editor modal de 3 columnas con gestor WebP, herramienta de zoom/encuadre y previsualización 1:1.")

    add_bubble_table(doc, [
        ("①", "Columna 1: Formulario de Contenido", "Permite editar: Nombre de la ciudad, Provincia, Tag promocional, Hito icónico y la descripción turística detallada."),
        ("②", "Columna 2: Gestor Multimedia WebP", "Permite arrastrar o seleccionar una nueva fotografía desde la computadora. El sistema la optimiza y convierte automáticamente a formato WebP ultraligero."),
        ("③", "Herramienta de Zoom y Desplazamiento", "Control deslizante de zoom (100% a 300%) y marco de movimiento con el cursor. Permite reencuadrar la fotografía SIN recortarla destructivamente, preservando siempre la imagen original."),
        ("④", "Columna 3: Previsualización 1:1 en Vivo", "Muestra la tarjeta exactamente con las mismas dimensiones, proporciones, badges y tipografías que se observan en la página web pública."),
        ("⑤", "Botón 'Guardar Cambios'", "Guarda y sincroniza los cambios inmediatamente con la base de datos Supabase Cloud, actualizando el sitio web en tiempo real."),
    ])

    doc.add_page_break()

    # 5.4 Perfil
    add_heading_2(doc, "5.4 Gestión de Perfil y Cambio de Contraseña")
    add_paragraph(doc,
        "Desde la pestaña 'Mi Perfil' en la barra lateral, el administrador puede gestionar su información personal y modificar sus credenciales de seguridad.")

    add_image_figure(doc, "manual_assets/annotated/09_admin_profile.png", 
        "Figura 10: Sección de perfil de usuario y cambio de contraseña administrativa.")

    add_bubble_table(doc, [
        ("①", "Nombres del Administrador", "Campos para actualizar el nombre y apellido del encargado del panel."),
        ("②", "Correo Electrónico de Acceso", "Dirección de correo utilizada para iniciar sesión en la plataforma."),
        ("③", "Cambio de Contraseña", "Permite ingresar una nueva clave de acceso con confirmación para evitar errores tipográficos."),
        ("④", "Botón 'Guardar Cambios'", "Actualiza las credenciales de inmediato en el sistema de autenticación."),
    ])

    doc.add_page_break()

    # ==============================================================================
    # CAPÍTULO 6: PROTOCOLO PARA LA GARANTÍA DE 30 DÍAS
    # ==============================================================================
    add_heading_1(doc, "6. Protocolo para la Solicitud de Cambios durante la Garantía de 30 Días")
    
    add_paragraph(doc,
        "Para hacer efectiva la garantía de 30 días posteriores a la entrega y solicitar la vinculación de los 4 elementos pendientes (Dominio, Teléfono/WhatsApp, Google Maps y Base de Datos), el cliente únicamente debe seguir el siguiente procedimiento:",
        bold_prefix="6.1 Procedimiento de Solicitud: ")

    add_callout(doc,
        "FORMATO DE ENVÍO DE DATOS PENDIENTES:\n\n"
        "• NOMBRE DE DOMINIO: Indicar el dominio contratado (ej. www.happytravel.com.ec) y las credenciales de acceso al registrador de dominios (GoDaddy, Namecheap, Nic.ec, etc.) para crear los registros DNS de tipo A y CNAME que enrutan hacia Firebase Hosting.\n\n"
        "• LÍNEA DE WHATSAPP / LLAMADAS: Indicar el número en formato internacional (+593 9X XXX XXXX) para enlazar el botón flotante y el formulario de cotización.\n\n"
        "• GOOGLE MAPS: Remitir el enlace compartido de Google Maps de la oficina o terminal principal.\n\n"
        "• BASE DE DATOS PERSONALIZADA: En caso de requerir una cuenta de Supabase independiente, proporcionar el URL del proyecto y la Anon Key pública.\n\n"
        "TIEMPO DE RESPUESTA: Una vez recibidos estos insumos por correo electrónico o WhatsApp, el equipo técnico realizará la vinculación en un plazo de 24 a 48 horas hábiles dentro del periodo de garantía de 30 días, totalmente libre de costos.",
        title="INSTRUCCIONES PARA ACTIVAR LA GARANTÍA DE 30 DÍAS",
        border_color="B8860B",
        bg_color="FEF9C3"
    )

    # ==============================================================================
    # CAPÍTULO 7: CONCLUSIÓN Y ACTA DE FIRMAS
    # ==============================================================================
    add_heading_1(doc, "7. Conclusiones y Firmas de Entrega Oficial")
    
    add_paragraph(doc,
        "Con la expedición del presente documento y la entrega de los accesos operativos del sistema, la plataforma web y el panel de administración de Happy Travel Ecuador quedan formalmente entregados, en estado operativo y con su respectiva póliza de soporte y garantía de 30 días activa.")

    table_sign = doc.add_table(rows=2, cols=2)
    table_sign.alignment = WD_TABLE_ALIGNMENT.CENTER
    table_sign.autofit = False

    c_sign0 = table_sign.rows[0].cells[0]
    c_sign1 = table_sign.rows[0].cells[1]
    c_sign0.width = Inches(3.2)
    c_sign1.width = Inches(3.2)

    p_s0 = c_sign0.paragraphs[0]
    p_s0.paragraph_format.space_before = Pt(36)
    p_s0.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_s0.add_run("_________________________________________\n").font.color.rgb = COLOR_SLATE
    r_firm0 = p_s0.add_run("POR EL EQUIPO DE DESARROLLO\n")
    r_firm0.font.bold = True
    r_firm0.font.color.rgb = COLOR_NAVY
    p_s0.add_run("Ingeniería de Software & Arquitectura Web\nFecha: 18 de Noviembre de 2026").font.color.rgb = COLOR_MUTED

    p_s1 = c_sign1.paragraphs[0]
    p_s1.paragraph_format.space_before = Pt(36)
    p_s1.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_s1.add_run("_________________________________________\n").font.color.rgb = COLOR_SLATE
    r_firm1 = p_s1.add_run("POR HAPPY TRAVEL ECUADOR\n")
    r_firm1.font.bold = True
    r_firm1.font.color.rgb = COLOR_NAVY
    p_s1.add_run("Recepción y Aceptación de Entrega\nCon Garantía Activa de 30 Días").font.color.rgb = COLOR_MUTED

    docx_path = os.path.abspath("Manual_de_Usuario_y_Entrega_Happy_Travel.docx")
    pdf_path = os.path.abspath("Manual_de_Usuario_y_Entrega_Happy_Travel.pdf")

    print(f"Guardando documento Word en: {docx_path}")
    doc.save(docx_path)
    print("Documento Word guardado exitosamente!")

    print(f"Convirtiendo documento a PDF nativo en: {pdf_path}")
    word = win32com.client.Dispatch("Word.Application")
    word.Visible = False
    try:
        word_doc = word.Documents.Open(docx_path)
        word_doc.SaveAs(pdf_path, FileFormat=17) # 17 = wdFormatPDF
        word_doc.Close()
        print("Documento PDF generado exitosamente con Microsoft Word COM!")
    except Exception as e:
        print(f"Error en conversión Word: {e}")
    finally:
        word.Quit()

    print("Verificando existencia y tamaños:")
    if os.path.exists(docx_path):
        print(f"DOCX: {docx_path} ({os.path.getsize(docx_path)} bytes)")
    if os.path.exists(pdf_path):
        print(f"PDF: {pdf_path} ({os.path.getsize(pdf_path)} bytes)")

if __name__ == '__main__':
    build_manual()
