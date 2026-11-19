import os
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import parse_xml, OxmlElement
from docx.oxml.ns import nsdecls, qn
import win32com.client

# ==============================================================================
# PALETA CORPORATIVA FORMAL — HAPPY TRAVEL ECUADOR
# ==============================================================================
HEX_NAVY        = "0A1628"   # Obsidiana / Azul Marino Profundo
HEX_NAVY_MED    = "1E293B"   # Pizarra Oscura
HEX_GOLD        = "B4821D"   # Dorado Corporativo Elegante
HEX_GOLD_LINE   = "C59B27"   # Dorado Acento
HEX_CRIMSON     = "B91C1C"   # Carmesí Formal (pendientes / alertas)
HEX_EMERALD     = "047857"   # Verde Esmeralda Formal (métricas)
HEX_BG_LIGHT    = "F8FAFC"   # Gris Perla Muy Suave
HEX_BG_WARM     = "FBF9F4"   # Alabastro Cálido (cajas formales)
HEX_BORDER      = "CBD5E1"   # Línea fina formal
HEX_BORDER_SOFT = "E2E8F0"   # Línea divisoria sutil

C_NAVY      = RGBColor(10, 22, 40)
C_INK       = RGBColor(30, 41, 59)
C_SLATE     = RGBColor(71, 85, 105)
C_MUTED     = RGBColor(100, 116, 139)
C_GOLD      = RGBColor(180, 130, 29)
C_CRIMSON   = RGBColor(185, 28, 28)
C_EMERALD   = RGBColor(4, 120, 87)
C_WHITE     = RGBColor(255, 255, 255)

FONT_MAIN = "Segoe UI"
IMG_DIR   = os.path.abspath("manual_assets/annotated_v2")


# ==============================================================================
# UTILIDADES XML PARA DISEÑO EDITORIAL FORMAL EN WORD
# ==============================================================================
def set_cell_bg(cell, fill_hex):
    shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{fill_hex}"/>')
    cell._tc.get_or_add_tcPr().append(shd)

def set_cell_margins(cell, top=80, bottom=80, left=120, right=120):
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = OxmlElement('w:tcMar')
    for m, val in [('top', top), ('bottom', bottom), ('left', left), ('right', right)]:
        node = OxmlElement(f'w:{m}')
        node.set(qn('w:w'), str(val))
        node.set(qn('w:type'), 'dxa')
        tcMar.append(node)
    tcPr.append(tcMar)

def set_cell_borders(cell, top=None, bottom=None, left=None, right=None):
    def fmt(side, spec):
        if spec is None:
            return f'<w:{side} w:val="none"/>'
        color, sz = spec
        return f'<w:{side} w:val="single" w:sz="{sz}" w:space="0" w:color="{color}"/>'
    xml = (
        f'<w:tcBorders {nsdecls("w")}>'
        f'{fmt("top", top)}{fmt("bottom", bottom)}{fmt("left", left)}{fmt("right", right)}'
        f'</w:tcBorders>'
    )
    cell._tc.get_or_add_tcPr().append(parse_xml(xml))

def set_table_borders_none(table):
    tblPr = table._tbl.tblPr
    borders = parse_xml(
        f'<w:tblBorders {nsdecls("w")}>'
        f'<w:top w:val="none"/><w:left w:val="none"/><w:bottom w:val="none"/>'
        f'<w:right w:val="none"/><w:insideH w:val="none"/><w:insideV w:val="none"/>'
        f'</w:tblBorders>'
    )
    tblPr.append(borders)

def prevent_row_split(row):
    trPr = row._tr.get_or_add_trPr()
    trPr.append(OxmlElement('w:cantSplit'))

def set_repeat_header(row):
    trPr = row._tr.get_or_add_trPr()
    trPr.append(OxmlElement('w:tblHeader'))

def add_field(paragraph, field_name, font_size=8, color=C_NAVY, bold=True):
    run = paragraph.add_run()
    run.font.name = FONT_MAIN
    run.font.size = Pt(font_size)
    run.font.color.rgb = color
    run.font.bold = bold
    fldChar1 = parse_xml(r'<w:fldChar %s w:fldCharType="begin"/>' % nsdecls('w'))
    instrText = parse_xml(r'<w:instrText %s xml:space="preserve"> %s </w:instrText>' % (nsdecls('w'), field_name))
    fldChar2 = parse_xml(r'<w:fldChar %s w:fldCharType="separate"/>' % nsdecls('w'))
    fldChar3 = parse_xml(r'<w:fldChar %s w:fldCharType="end"/>' % nsdecls('w'))
    run._r.append(fldChar1)
    run._r.append(instrText)
    run._r.append(fldChar2)
    run._r.append(fldChar3)

def add_p_bottom_border(paragraph, color_hex=HEX_GOLD, sz="12"):
    pPr = paragraph._p.get_or_add_pPr()
    pBdr = parse_xml(
        f'<w:pBdr {nsdecls("w")}>'
        f'<w:bottom w:val="single" w:sz="{sz}" w:space="4" w:color="{color_hex}"/>'
        f'</w:pBdr>'
    )
    pPr.append(pBdr)


# ==============================================================================
# CONFIGURACIÓN DE PÁGINA, ENCABEZADO Y PIE FORMAL CON NUMERACIÓN REAL
# ==============================================================================
def configure_document(doc):
    # Base Normal style
    normal = doc.styles['Normal']
    normal.font.name = FONT_MAIN
    normal.font.size = Pt(9.5)
    normal.font.color.rgb = C_INK

    for sec in doc.sections:
        sec.page_width = Inches(8.5)
        sec.page_height = Inches(11.0)
        sec.top_margin = Inches(0.65)
        sec.bottom_margin = Inches(0.65)
        sec.left_margin = Inches(0.65)
        sec.right_margin = Inches(0.65)
        sec.header_distance = Inches(0.30)
        sec.footer_distance = Inches(0.30)
        sec.different_first_page_header_footer = True

        # --- Running Header (Pages 2+) ---
        hdr = sec.header
        hp0 = hdr.paragraphs[0]
        hp0.paragraph_format.space_before = Pt(0)
        hp0.paragraph_format.space_after = Pt(0)
        htbl = hdr.add_table(rows=1, cols=2, width=Inches(7.2))
        htbl.alignment = WD_TABLE_ALIGNMENT.CENTER
        set_table_borders_none(htbl)
        # Remove empty default paragraph above header table
        hp0._element.getparent().remove(hp0._element)

        hc0, hc1 = htbl.rows[0].cells[0], htbl.rows[0].cells[1]
        hc0.width, hc1.width = Inches(3.2), Inches(4.0)
        set_cell_margins(hc0, top=0, bottom=55, left=0, right=0)
        set_cell_margins(hc1, top=0, bottom=55, left=0, right=0)
        set_cell_borders(hc0, bottom=(HEX_GOLD_LINE, "6"))
        set_cell_borders(hc1, bottom=(HEX_BORDER, "4"))

        p_hl = hc0.paragraphs[0]
        r_hl = p_hl.add_run("HAPPY TRAVEL ECUADOR")
        r_hl.font.name = FONT_MAIN
        r_hl.font.size = Pt(8)
        r_hl.font.bold = True
        r_hl.font.color.rgb = C_NAVY

        p_hr = hc1.paragraphs[0]
        p_hr.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        r_hr = p_hr.add_run("Acta de Culminación y Manual Operativo Web / CMS")
        r_hr.font.name = FONT_MAIN
        r_hr.font.size = Pt(8)
        r_hr.font.color.rgb = C_MUTED

        # --- Running Footer (Pages 2+) ---
        ftr = sec.footer
        fp0 = ftr.paragraphs[0]
        ftbl = ftr.add_table(rows=1, cols=2, width=Inches(7.2))
        ftbl.alignment = WD_TABLE_ALIGNMENT.CENTER
        set_table_borders_none(ftbl)
        fp0._element.getparent().remove(fp0._element)

        fc0, fc1 = ftbl.rows[0].cells[0], ftbl.rows[0].cells[1]
        fc0.width, fc1.width = Inches(4.8), Inches(2.4)
        set_cell_margins(fc0, top=55, bottom=0, left=0, right=0)
        set_cell_margins(fc1, top=55, bottom=0, left=0, right=0)
        set_cell_borders(fc0, top=(HEX_BORDER, "4"))
        set_cell_borders(fc1, top=(HEX_BORDER, "4"))

        p_fl = fc0.paragraphs[0]
        r_fl = p_fl.add_run("Documento Oficial de Entrega  •  Uso Confidencial  •  Noviembre 2026")
        r_fl.font.name = FONT_MAIN
        r_fl.font.size = Pt(7.5)
        r_fl.font.color.rgb = C_MUTED

        p_fr = fc1.paragraphs[0]
        p_fr.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        r1 = p_fr.add_run("Página ")
        r1.font.name = FONT_MAIN; r1.font.size = Pt(7.5); r1.font.color.rgb = C_MUTED
        add_field(p_fr, "PAGE", font_size=7.5, color=C_NAVY, bold=True)
        r2 = p_fr.add_run(" de ")
        r2.font.name = FONT_MAIN; r2.font.size = Pt(7.5); r2.font.color.rgb = C_MUTED
        add_field(p_fr, "NUMPAGES", font_size=7.5, color=C_NAVY, bold=True)


# ==============================================================================
# PORTADA EJECUTIVA FORMAL (PÁGINA 1)
# ==============================================================================
def add_formal_cover(doc):
    # Top Architectural Obsidian-Navy Banner with Official Gold Logo
    banner = doc.add_table(rows=1, cols=1)
    banner.alignment = WD_TABLE_ALIGNMENT.CENTER
    banner.autofit = False
    set_table_borders_none(banner)
    bc = banner.rows[0].cells[0]
    bc.width = Inches(7.2)
    set_cell_bg(bc, HEX_NAVY)
    set_cell_margins(bc, top=520, bottom=520, left=300, right=300)
    set_cell_borders(bc, bottom=(HEX_GOLD_LINE, "36"))

    bp = bc.paragraphs[0]
    bp.alignment = WD_ALIGN_PARAGRAPH.CENTER
    bp.paragraph_format.space_before = Pt(4)
    bp.paragraph_format.space_after = Pt(12)
    logo_path = os.path.abspath("public/logo-transparent.png")
    if os.path.exists(logo_path):
        bp.add_run().add_picture(logo_path, height=Inches(1.35))

    bp2 = bc.add_paragraph()
    bp2.alignment = WD_ALIGN_PARAGRAPH.CENTER
    bp2.paragraph_format.space_before = Pt(2)
    bp2.paragraph_format.space_after = Pt(0)
    rb = bp2.add_run("TRANSPORTE PRIVADO EJECUTIVO  •  ENCOMIENDAS PUERTA A PUERTA")
    rb.font.name = FONT_MAIN
    rb.font.size = Pt(8.5)
    rb.font.bold = True
    rb.font.color.rgb = RGBColor(218, 178, 92)

    # Editorial Title Area
    p_sp = doc.add_paragraph()
    p_sp.paragraph_format.space_before = Pt(28)
    p_sp.paragraph_format.space_after = Pt(0)

    p_kick = doc.add_paragraph()
    p_kick.paragraph_format.space_after = Pt(8)
    rk = p_kick.add_run("DOCUMENTO OFICIAL DE ENTREGA  |  VERSIÓN 1.0")
    rk.font.name = FONT_MAIN
    rk.font.size = Pt(9.5)
    rk.font.bold = True
    rk.font.color.rgb = C_GOLD

    p_t = doc.add_paragraph()
    p_t.paragraph_format.space_after = Pt(10)
    p_t.paragraph_format.line_spacing = 1.12
    rt = p_t.add_run("Manual de Operación y\nActa de Culminación del Proyecto Web")
    rt.font.name = FONT_MAIN
    rt.font.size = Pt(26)
    rt.font.bold = True
    rt.font.color.rgb = C_NAVY

    p_sub = doc.add_paragraph()
    p_sub.paragraph_format.space_after = Pt(18)
    p_sub.paragraph_format.line_spacing = 1.25
    rs = p_sub.add_run(
        "Guía ilustrada de la plataforma web pública, instructivo de uso del Panel de Administración (CMS), "
        "credenciales de acceso y constancia de garantía técnica post-entrega."
    )
    rs.font.name = FONT_MAIN
    rs.font.size = Pt(11)
    rs.font.color.rgb = C_SLATE

    # Short Gold Accent Bar
    bar = doc.add_table(rows=1, cols=2)
    bar.autofit = False
    set_table_borders_none(bar)
    bar.rows[0].cells[0].width = Inches(1.8)
    bar.rows[0].cells[1].width = Inches(5.4)
    set_cell_borders(bar.rows[0].cells[0], top=(HEX_GOLD_LINE, "24"))
    set_cell_margins(bar.rows[0].cells[0], top=0, bottom=0, left=0, right=0)
    set_cell_margins(bar.rows[0].cells[1], top=0, bottom=0, left=0, right=0)

    # Vertical breathing space before Formal Control Block
    p_gap = doc.add_paragraph()
    p_gap.paragraph_format.space_before = Pt(34)
    p_gap.paragraph_format.space_after = Pt(6)
    r_ctrl = p_gap.add_run("FICHA DE CONTROL DOCUMENTAL")
    r_ctrl.font.name = FONT_MAIN
    r_ctrl.font.size = Pt(8.5)
    r_ctrl.font.bold = True
    r_ctrl.font.color.rgb = C_MUTED

    meta = [
        ("Código / Versión", "HT-ENT-2026-01  •  Versión Oficial 1.0"),
        ("Cliente", "Happy Travel Ecuador"),
        ("URL de Producción", "https://happy-travel-ec.web.app"),
        ("Estado del Proyecto", "CULMINADO FORMALMENTE (Plazo de entrega cumplido)"),
        ("Garantía Post-Entrega", "30 días calendario para cambios e integraciones sin costo"),
        ("Fecha de Emisión", "18 de noviembre de 2026"),
    ]
    mtbl = doc.add_table(rows=len(meta), cols=2)
    mtbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    mtbl.autofit = False
    set_table_borders_none(mtbl)

    for idx, (k, v) in enumerate(meta):
        row = mtbl.rows[idx]
        prevent_row_split(row)
        c0, c1 = row.cells[0], row.cells[1]
        c0.width, c1.width = Inches(2.1), Inches(5.1)
        top_b = (HEX_NAVY, "12") if idx == 0 else None
        bot_b = (HEX_NAVY, "12") if idx == len(meta) - 1 else (HEX_BORDER_SOFT, "4")
        set_cell_borders(c0, top=top_b, bottom=bot_b)
        set_cell_borders(c1, top=top_b, bottom=bot_b)
        set_cell_margins(c0, top=75, bottom=75, left=60, right=80)
        set_cell_margins(c1, top=75, bottom=75, left=80, right=60)
        if idx % 2 == 0:
            set_cell_bg(c0, HEX_BG_LIGHT)
            set_cell_bg(c1, HEX_BG_LIGHT)

        p0 = c0.paragraphs[0]
        r0 = p0.add_run(k)
        r0.font.name = FONT_MAIN; r0.font.size = Pt(9); r0.font.bold = True; r0.font.color.rgb = C_NAVY

        p1 = c1.paragraphs[0]
        r1 = p1.add_run(v)
        r1.font.name = FONT_MAIN; r1.font.size = Pt(9)
        if "CULMINADO" in v:
            r1.font.bold = True; r1.font.color.rgb = C_GOLD
        elif "30 días" in v:
            r1.font.bold = True; r1.font.color.rgb = C_EMERALD
        else:
            r1.font.color.rgb = C_INK

    doc.add_page_break()


# ==============================================================================
# COMPONENTES EDITORIALES FORMALES
# ==============================================================================
def add_section_header(doc, code, title, subtitle=None):
    pk = doc.add_paragraph()
    pk.paragraph_format.space_before = Pt(4)
    pk.paragraph_format.space_after = Pt(2)
    pk.paragraph_format.keep_with_next = True
    rk = pk.add_run(f"SECCIÓN {code}")
    rk.font.name = FONT_MAIN; rk.font.size = Pt(8); rk.font.bold = True; rk.font.color.rgb = C_GOLD

    pt = doc.add_paragraph()
    pt.paragraph_format.space_before = Pt(0)
    pt.paragraph_format.space_after = Pt(6)
    pt.paragraph_format.keep_with_next = True
    add_p_bottom_border(pt, color_hex=HEX_NAVY, sz="12")
    rt = pt.add_run(title)
    rt.font.name = FONT_MAIN; rt.font.size = Pt(15.5); rt.font.bold = True; rt.font.color.rgb = C_NAVY

    if subtitle:
        ps = doc.add_paragraph()
        ps.paragraph_format.space_before = Pt(2)
        ps.paragraph_format.space_after = Pt(8)
        ps.paragraph_format.line_spacing = 1.15
        rs = ps.add_run(subtitle)
        rs.font.name = FONT_MAIN; rs.font.size = Pt(9.2); rs.font.color.rgb = C_SLATE

def add_module_header(doc, num_code, title, subtitle):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(2)
    p.paragraph_format.space_after = Pt(3)
    p.paragraph_format.keep_with_next = True
    add_p_bottom_border(p, color_hex=HEX_GOLD_LINE, sz="8")
    r_code = p.add_run(f"{num_code}   ")
    r_code.font.name = FONT_MAIN; r_code.font.size = Pt(11.5); r_code.font.bold = True; r_code.font.color.rgb = C_GOLD
    r_tit = p.add_run(title)
    r_tit.font.name = FONT_MAIN; r_tit.font.size = Pt(12.5); r_tit.font.bold = True; r_tit.font.color.rgb = C_NAVY

    ps = doc.add_paragraph()
    ps.paragraph_format.space_before = Pt(2)
    ps.paragraph_format.space_after = Pt(6)
    ps.paragraph_format.keep_with_next = True
    rs = ps.add_run(subtitle)
    rs.font.name = FONT_MAIN; rs.font.size = Pt(8.8); rs.font.color.rgb = C_SLATE

def add_formal_notice(doc, title, body_parts, accent_hex=HEX_GOLD, bg_hex=HEX_BG_WARM):
    """body_parts: list of tuples (text, bold_bool)"""
    tbl = doc.add_table(rows=1, cols=1)
    tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl.autofit = False
    set_table_borders_none(tbl)
    c = tbl.rows[0].cells[0]
    c.width = Inches(7.2)
    set_cell_bg(c, bg_hex)
    set_cell_margins(c, top=115, bottom=115, left=180, right=160)
    set_cell_borders(c, left=(accent_hex, "30"), top=(HEX_BORDER_SOFT, "4"), bottom=(HEX_BORDER_SOFT, "4"), right=(HEX_BORDER_SOFT, "4"))

    p = c.paragraphs[0]
    p.paragraph_format.space_after = Pt(4)
    rt = p.add_run(title)
    rt.font.name = FONT_MAIN; rt.font.size = Pt(9.5); rt.font.bold = True; rt.font.color.rgb = C_NAVY

    p2 = c.add_paragraph()
    p2.paragraph_format.space_before = Pt(0)
    p2.paragraph_format.space_after = Pt(0)
    p2.paragraph_format.line_spacing = 1.2
    for txt, is_bold in body_parts:
        r = p2.add_run(txt)
        r.font.name = FONT_MAIN; r.font.size = Pt(8.8); r.font.bold = is_bold
        r.font.color.rgb = C_NAVY if is_bold else C_INK

    sp = doc.add_paragraph()
    sp.paragraph_format.space_before = Pt(0); sp.paragraph_format.space_after = Pt(6)

def add_kpi_strip(doc, cards):
    """cards: list of (big_value, label, sublabel, accent_rgb)"""
    tbl = doc.add_table(rows=1, cols=len(cards))
    tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl.autofit = False
    set_table_borders_none(tbl)
    w_each = Inches(7.2 / len(cards))
    for i, (val, lbl, sub, col_rgb) in enumerate(cards):
        c = tbl.rows[0].cells[i]
        c.width = w_each
        set_cell_bg(c, HEX_BG_LIGHT)
        set_cell_margins(c, top=110, bottom=110, left=100, right=100)
        set_cell_borders(
            c,
            top=(HEX_NAVY, "12"),
            bottom=(HEX_BORDER, "4"),
            left=(HEX_BORDER_SOFT, "4") if i > 0 else (HEX_BORDER_SOFT, "4"),
            right=(HEX_BORDER_SOFT, "4"),
        )
        p1 = c.paragraphs[0]
        p1.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p1.paragraph_format.space_after = Pt(2)
        r1 = p1.add_run(val)
        r1.font.name = FONT_MAIN; r1.font.size = Pt(16); r1.font.bold = True; r1.font.color.rgb = col_rgb

        p2 = c.add_paragraph()
        p2.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p2.paragraph_format.space_after = Pt(1)
        r2 = p2.add_run(lbl)
        r2.font.name = FONT_MAIN; r2.font.size = Pt(8.5); r2.font.bold = True; r2.font.color.rgb = C_NAVY

        p3 = c.add_paragraph()
        p3.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p3.paragraph_format.space_after = Pt(0)
        r3 = p3.add_run(sub)
        r3.font.name = FONT_MAIN; r3.font.size = Pt(7.5); r3.font.color.rgb = C_MUTED

    sp = doc.add_paragraph()
    sp.paragraph_format.space_before = Pt(0); sp.paragraph_format.space_after = Pt(6)

def add_formal_table(doc, headers, rows_data, col_widths):
    """Formal horizontal-rule executive table (no vertical grid clutter)."""
    tbl = doc.add_table(rows=len(rows_data) + 1, cols=len(headers))
    tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl.autofit = False
    set_table_borders_none(tbl)

    # Header
    hrow = tbl.rows[0]
    set_repeat_header(hrow)
    prevent_row_split(hrow)
    for i, (htxt, align) in enumerate(headers):
        c = hrow.cells[i]
        c.width = col_widths[i]
        set_cell_bg(c, HEX_NAVY)
        set_cell_margins(c, top=75, bottom=75, left=90, right=90)
        set_cell_borders(c, bottom=(HEX_GOLD_LINE, "12"))
        p = c.paragraphs[0]
        p.alignment = align
        r = p.add_run(htxt)
        r.font.name = FONT_MAIN; r.font.size = Pt(8.5); r.font.bold = True; r.font.color.rgb = C_WHITE

    # Body
    for r_idx, rdata in enumerate(rows_data):
        row = tbl.rows[r_idx + 1]
        prevent_row_split(row)
        is_last = (r_idx == len(rows_data) - 1)
        bg = HEX_BG_LIGHT if r_idx % 2 == 1 else "FFFFFF"
        for c_idx, cell_spec in enumerate(rdata):
            c = row.cells[c_idx]
            c.width = col_widths[c_idx]
            c.vertical_alignment = WD_ALIGN_VERTICAL.CENTER
            set_cell_bg(c, bg)
            set_cell_margins(c, top=65, bottom=65, left=90, right=90)
            set_cell_borders(c, bottom=(HEX_NAVY, "10") if is_last else (HEX_BORDER_SOFT, "4"))

            p = c.paragraphs[0]
            p.paragraph_format.space_after = Pt(0)
            p.paragraph_format.line_spacing = 1.12
            p.alignment = headers[c_idx][1]

            txt, is_bold, col_rgb, fsize = cell_spec
            r = p.add_run(txt)
            r.font.name = FONT_MAIN
            r.font.size = Pt(fsize)
            r.font.bold = is_bold
            r.font.color.rgb = col_rgb

    sp = doc.add_paragraph()
    sp.paragraph_format.space_before = Pt(0); sp.paragraph_format.space_after = Pt(6)

def add_visual_module_page(doc, num_code, title, subtitle, img_filename, caption, legend_items, img_max_height_in=4.35, extra_note=None):
    add_module_header(doc, num_code, title, subtitle)

    # Embedded Precision Annotated Figure (auto-fitted cleanly so image + table fit 1 page!)
    img_path = os.path.join(IMG_DIR, img_filename)
    if os.path.exists(img_path):
        from PIL import Image as PILImage
        with PILImage.open(img_path) as im:
            iw, ih = im.size
        # Fit within width=7.05 in AND height=img_max_height_in
        target_w = 7.05
        target_h = target_w * (ih / iw)
        if target_h > img_max_height_in:
            target_h = img_max_height_in
            target_w = target_h * (iw / ih)

        p_img = doc.add_paragraph()
        p_img.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p_img.paragraph_format.space_before = Pt(2)
        p_img.paragraph_format.space_after = Pt(2)
        p_img.paragraph_format.keep_with_next = True
        p_img.add_run().add_picture(img_path, width=Inches(target_w))

        p_cap = doc.add_paragraph()
        p_cap.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p_cap.paragraph_format.space_before = Pt(0)
        p_cap.paragraph_format.space_after = Pt(6)
        p_cap.paragraph_format.keep_with_next = True
        rc = p_cap.add_run(caption)
        rc.font.name = FONT_MAIN; rc.font.size = Pt(7.8); rc.font.italic = True; rc.font.color.rgb = C_MUTED

    # Compact Formal Legend Table
    headers = [
        ("N.º", WD_ALIGN_PARAGRAPH.CENTER),
        ("Elemento Remarcado", WD_ALIGN_PARAGRAPH.LEFT),
        ("Función y Comportamiento", WD_ALIGN_PARAGRAPH.LEFT),
    ]
    rows_data = []
    for num_str, elem_name, desc in legend_items:
        rows_data.append([
            (num_str, True, C_GOLD, 9.5),
            (elem_name, True, C_NAVY, 8.3),
            (desc, False, C_INK, 8.1),
        ])
    add_formal_table(doc, headers, rows_data, [Inches(0.55), Inches(2.05), Inches(4.60)])

    if extra_note:
        add_formal_notice(doc, extra_note[0], extra_note[1], accent_hex=HEX_GOLD, bg_hex=HEX_BG_WARM)


# ==============================================================================
# CONSTRUCCIÓN INTEGRAL DEL DOCUMENTO
# ==============================================================================
def build_manual():
    print("Generando documento corporativo formal (Word + PDF)...")
    doc = docx.Document()
    configure_document(doc)

    # --------------------------------------------------------------------------
    # PÁGINA 1: PORTADA CORPORATIVA FORMAL
    # --------------------------------------------------------------------------
    add_formal_cover(doc)

    # --------------------------------------------------------------------------
    # PÁGINA 2: SECCIÓN 01 — ACTA DE CULMINACIÓN Y GARANTÍA (CONCISA Y VISUAL)
    # --------------------------------------------------------------------------
    add_section_header(
        doc, "01",
        "Acta de Culminación y Estado de Entrega",
        "Se certifica la entrega oficial de la plataforma web corporativa y del panel de administración (CMS) "
        "de Happy Travel Ecuador en estado 100 % operativo, conforme al alcance técnico pactado."
    )

    p_lbl = doc.add_paragraph()
    p_lbl.paragraph_format.space_before = Pt(4); p_lbl.paragraph_format.space_after = Pt(5)
    rl = p_lbl.add_run("Elementos Externos Pendientes de Suministro por el Cliente")
    rl.font.name = FONT_MAIN; rl.font.size = Pt(10.5); rl.font.bold = True; rl.font.color.rgb = C_NAVY

    pending_headers = [
        ("Elemento", WD_ALIGN_PARAGRAPH.LEFT),
        ("Estado", WD_ALIGN_PARAGRAPH.CENTER),
        ("Situación Actual y Dato Requerido", WD_ALIGN_PARAGRAPH.LEFT),
    ]
    pending_rows = [
        [
            ("1. Dominio Web y DNS", True, C_NAVY, 8.8),
            ("PENDIENTE", True, C_CRIMSON, 8.0),
            ("Opera en subdominio temporal (happy-travel-ec.web.app). Requiere definir nombre de dominio definitivo (.com / .ec) y acceso DNS.", False, C_INK, 8.5),
        ],
        [
            ("2. Base de Datos Propia", True, C_NAVY, 8.8),
            ("PENDIENTE", True, C_CRIMSON, 8.0),
            ("Actualmente vinculada y sincronizada en Supabase Cloud activo. Si desean cuenta corporativa propia, remitir URL y llave pública.", False, C_INK, 8.5),
        ],
        [
            ("3. Teléfono y WhatsApp", True, C_NAVY, 8.8),
            ("PENDIENTE", True, C_CRIMSON, 8.0),
            ("Presenta números de referencia. Requiere el número telefónico oficial definitivo para el botón flotante, contacto y cotizador.", False, C_INK, 8.5),
        ],
        [
            ("4. Enlace Google Maps", True, C_NAVY, 8.8),
            ("PENDIENTE", True, C_CRIMSON, 8.0),
            ("Requiere el enlace exacto de geolocalización de la oficina principal o terminal en Google Maps para la pestaña Contáctanos.", False, C_INK, 8.5),
        ],
    ]
    add_formal_table(doc, pending_headers, pending_rows, [Inches(1.85), Inches(1.05), Inches(4.30)])

    add_formal_notice(
        doc,
        "CLÁUSULA DE CULMINACIÓN Y GARANTÍA POST-ENTREGA (30 DÍAS)",
        [
            ("Debido a que los cuatro insumos listados en la tabla superior no fueron proporcionados dentro del tiempo solicitado y se sobrepasó el plazo de entrega acordado, el proyecto se da ", False),
            ("formalmente por culminado ", True),
            ("en la presente fecha.\n\nNo obstante, Happy Travel Ecuador cuenta con un periodo de ", False),
            ("garantía y soporte de 30 días calendario posteriores a la entrega ", True),
            ("para remitir dicha información y solicitar los cambios o integraciones correspondientes ", False),
            ("sin inconvenientes ni costo adicional.", True),
        ],
        accent_hex=HEX_GOLD,
        bg_hex=HEX_BG_WARM,
    )

    p_k = doc.add_paragraph()
    p_k.paragraph_format.space_before = Pt(8); p_k.paragraph_format.space_after = Pt(5)
    rk2 = p_k.add_run("Resumen del Alcance Entregado")
    rk2.font.name = FONT_MAIN; rk2.font.size = Pt(10.5); rk2.font.bold = True; rk2.font.color.rgb = C_NAVY

    add_kpi_strip(doc, [
        ("5 Pestañas", "Sitio Web Público", "Inicio, Puerta a Puerta, Encomiendas, Mascotas y Contacto", C_NAVY),
        ("5 Módulos CMS", "Panel Autoadministrable", "Carruseles, tarifas, flota, imágenes WebP y vista 1:1", C_GOLD),
        ("30 Días", "Garantía Post-Entrega", "Integración gratuita de dominio, teléfono, mapa y BD", C_EMERALD),
    ])

    doc.add_page_break()

    # --------------------------------------------------------------------------
    # PÁGINA 3: SECCIÓN 02 — CREDENCIALES, RENDIMIENTO E ÍNDICE VISUAL
    # --------------------------------------------------------------------------
    add_section_header(
        doc, "02",
        "Credenciales de Acceso y Métricas Técnicas",
        "Accesos oficiales de operación, auditoría de velocidad en producción y estructura general del instructivo."
    )

    cred_headers = [
        ("Parámetro del Sistema", WD_ALIGN_PARAGRAPH.LEFT),
        ("Dirección / Credencial Asignada", WD_ALIGN_PARAGRAPH.LEFT),
        ("Observación", WD_ALIGN_PARAGRAPH.LEFT),
    ]
    cred_rows = [
        [("Sitio Web Público", True, C_NAVY, 8.6), ("https://happy-travel-ec.web.app", False, C_INK, 8.6), ("Acceso público 24/7 con HTTPS.", False, C_MUTED, 8.2)],
        [("Panel de Control (CMS)", True, C_NAVY, 8.6), ("https://happy-travel-ec.web.app/admin", True, C_NAVY, 8.6), ("Acceso privado administrativo.", False, C_MUTED, 8.2)],
        [("Usuario / Correo Admin", True, C_NAVY, 8.6), ("admin@happytravel.com  (o 'admin')", True, C_GOLD, 8.8), ("Editable en la sección Mi Perfil.", False, C_MUTED, 8.2)],
        [("Contraseña Inicial", True, C_NAVY, 8.6), ("happytravel2026", True, C_CRIMSON, 8.8), ("Se recomienda cambiar tras ingreso.", False, C_MUTED, 8.2)],
        [("Base de Datos Cloud", True, C_NAVY, 8.6), ("Supabase Cloud (Sincronización Activa)", False, C_INK, 8.5), ("Cambios reflejados al instante.", False, C_MUTED, 8.2)],
        [("Alojamiento / CDN", True, C_NAVY, 8.6), ("Google Firebase Hosting (SSL Global)", False, C_INK, 8.5), ("Listo para vincular dominio propio.", False, C_MUTED, 8.2)],
    ]
    add_formal_table(doc, cred_headers, cred_rows, [Inches(1.85), Inches(2.95), Inches(2.40)])

    p_perf = doc.add_paragraph()
    p_perf.paragraph_format.space_before = Pt(4); p_perf.paragraph_format.space_after = Pt(5)
    rpf = p_perf.add_run("Auditoría de Rendimiento (Google PageSpeed Insights)")
    rpf.font.name = FONT_MAIN; rpf.font.size = Pt(10.5); rpf.font.bold = True; rpf.font.color.rgb = C_NAVY

    add_kpi_strip(doc, [
        ("80 / 100", "Rendimiento Móvil", "TBT: 0 ms  •  CLS: 0  •  Sin recortar animaciones", C_EMERALD),
        ("97 / 100", "Rendimiento Escritorio", "FCP: 0.2 s  •  LCP: 0.2 s  •  Carga instantánea", C_NAVY),
        ("WebP + Cloud", "Optimización Activa", "Conversión automática y diseño 100 % Responsive", C_GOLD),
    ])

    p_idx = doc.add_paragraph()
    p_idx.paragraph_format.space_before = Pt(4); p_idx.paragraph_format.space_after = Pt(5)
    ridx = p_idx.add_run("Estructura de la Guía Ilustrada")
    ridx.font.name = FONT_MAIN; ridx.font.size = Pt(10.5); ridx.font.bold = True; ridx.font.color.rgb = C_NAVY

    idx_headers = [
        ("Sección", WD_ALIGN_PARAGRAPH.LEFT),
        ("Contenido Ilustrado con Bordes Remarcados y Flechas", WD_ALIGN_PARAGRAPH.LEFT),
    ]
    idx_rows = [
        [("Sección 03  •  Web Pública", True, C_NAVY, 8.5), ("Portada Hero, Destinos Populares, Rutas con Tarifas, Flota VIP, Encomiendas, Contacto y Cotizador WhatsApp (Figuras 1 a 7).", False, C_INK, 8.4)],
        [("Sección 04  •  Panel CMS", True, C_NAVY, 8.5), ("Login Administrativo, Consola de Módulos, Editor 3 Columnas con Zoom/Encuadre WebP y Gestión de Perfil (Figuras 8 a 11).", False, C_INK, 8.4)],
        [("Sección 05  •  Garantía y Cierre", True, C_NAVY, 8.5), ("Protocolo de envío de insumos pendientes durante los 30 días de garantía y bloque de firmas de conformidad.", False, C_INK, 8.4)],
    ]
    add_formal_table(doc, idx_headers, idx_rows, [Inches(2.05), Inches(5.15)])

    doc.add_page_break()

    # --------------------------------------------------------------------------
    # PÁGINAS 4–10: SECCIÓN 03 — GUÍA VISUAL DEL SITIO WEB PÚBLICO
    # --------------------------------------------------------------------------
    add_section_header(doc, "03", "Guía Visual de la Página Web Pública")

    # Fig 1
    add_visual_module_page(
        doc, "03.1",
        "Inicio — Cabecera, Navegación y Portada Principal",
        "Vista inicial del sitio web con navegación fija superior, propuesta de valor ejecutiva y accesos inmediatos de cotización.",
        "01_inicio_hero.png",
        "Figura 1: Estructura principal de la portada de inicio y barra de navegación institucional.",
        [
            ("1", "Logotipo Oficial", "Identidad corporativa en cabecera; al pulsarlo restablece la navegación hacia la vista de Inicio."),
            ("2", "Menú de 5 Pestañas", "Navegación directa entre Inicio, Puerta a Puerta, Encomiendas, Transporte de Mascotas y Contáctanos."),
            ("3", "Botón Rápido Cotizar", "Acceso fijo en toda la navegación que despliega el cotizador interactivo de reservas."),
            ("4", "Titular de Propuesta VIP", "Encabezado principal de alto impacto acompañado de animación fluida de entrada (ScrollReveal)."),
            ("5", "Prueba Social (+5.000)", "Indicador visual de confianza con avatares y trayectoria acumulada de traslados ejecutados."),
            ("6", "Botón CTA Cotizar Viaje", "Llamado a la acción principal sobre la portada que abre el formulario paso a paso hacia WhatsApp."),
        ],
        img_max_height_in=4.20,
    )
    doc.add_page_break()

    # Fig 2
    add_visual_module_page(
        doc, "03.2",
        "Inicio — Carrusel de Destinos Populares en Ecuador (Editable)",
        "Carrusel horizontal administrable desde el CMS para destacar ciudades turísticas y corporativas del Ecuador.",
        "02_destinos_populares.png",
        "Figura 2: Carrusel interactivo de Destinos Populares con controles de desplazamiento y tarjetas dinámicas.",
        [
            ("1", "Encabezado de Módulo", "Etiqueta activa y titular principal de la sección de destinos interprovinciales."),
            ("2", "Controles Carrusel (← / →)", "Botón 'Ver Todos' y flechas de desplazamiento horizontal con deshabilitación automática en extremos."),
            ("3", "Tarjeta Editable (CMS)", "Tarjeta fotográfica completa; título, hito icónico, descripción e imagen se actualizan desde el panel."),
            ("4", "Badge de Provincia", "Etiqueta flotante superior que identifica la provincia correspondiente a cada destino."),
            ("5", "Acción Cotizar Traslado", "Al hacer clic abre el cotizador prellenando automáticamente el destino seleccionado por el cliente."),
        ],
        img_max_height_in=4.35,
    )
    doc.add_page_break()

    # Fig 3
    add_visual_module_page(
        doc, "03.3",
        "Puerta a Puerta — Rutas Más Populares con Tarifas (Editable)",
        "Sección dedicada a los trayectos interprovinciales de mayor demanda con tarifas referenciales en USD y tiempos estimados.",
        "03_rutas_populares.png",
        "Figura 3: Carrusel de Rutas Más Populares con tarifas visibles y detalle operativo por trayecto.",
        [
            ("1", "Cabecera Ornamental", "Título en tipografía serif con ornamentos dorados institucionales y subtítulo descriptivo."),
            ("2", "Flechas de Navegación", "Controles laterales para explorar todas las rutas activas publicadas desde el panel."),
            ("3", "Tarjeta de Ruta VIP", "Diseño vertical fotográfico de alto contraste editable en tiempo real desde el módulo de Rutas."),
            ("4", "Tarifa Referencial USD", "Botón destacado con precio base referencial (ej. Desde $120) que dispara la cotización del trayecto."),
            ("5", "Duración y Vehículo", "Detalle estructurado de tiempo de viaje, vía recomendada, clase de unidad y beneficios incluidos."),
        ],
        img_max_height_in=4.15,
    )
    doc.add_page_break()

    # Fig 4
    add_visual_module_page(
        doc, "03.4",
        "Puerta a Puerta — Clases de Flota Ejecutiva VIP (Editable)",
        "Exhibición segmentada de las tres categorías de vehículos disponibles, administrables desde el módulo Nuestra Flota / Clases.",
        "04_flota_clases.png",
        "Figura 4: Cuadrícula comparativa de las tres clases de vehículos ejecutivos disponibles.",
        [
            ("1", "Clase Ejecutiva (Sedán)", "Categoría enfocada en traslados corporativos y ejecutivos con máxima puntualidad y discreción."),
            ("2", "Clase Premium (SUV)", "Categoría orientada a confort familiar y viajes interprovinciales con mayor espacio de equipaje."),
            ("3", "Clase de Lujo (VIP)", "Categoría insignia de alta gama diseñada para delegaciones, gerencia y eventos especiales."),
        ],
        img_max_height_in=4.40,
        extra_note=(
            "NOTA DE GESTIÓN",
            [
                ("En la pestaña Puerta a Puerta también se incluye la grilla ", False),
                ("Destinos Más Visitados", True),
                (" y el formulario de agenda ejecutiva; todos los títulos, subtítulos y fotografías de estas tarjetas se editan directamente en el Panel CMS.", False),
            ],
        ),
    )
    doc.add_page_break()

    # Fig 5
    add_visual_module_page(
        doc, "03.5",
        "Encomiendas — Servicios de Encomienda y Carga Privada (Editable)",
        "Módulo especializado en envíos puerta a puerta sin intermediarios, con modalidades editables desde el panel administrativo.",
        "05_encomiendas.png",
        "Figura 5: Carrusel de modalidades de encomienda, paquetería delicada y carga comercial.",
        [
            ("1", "Encabezado Encomiendas", "Presentación del módulo de logística privada puerta a puerta con enfoque en seguridad."),
            ("2", "Controles Carrusel", "Botones circulares para recorrer las 4 modalidades de envío y carga disponibles."),
            ("3", "Tarjeta Modalidad (CMS)", "Bloque informativo editable con imagen WebP, descripción detallada y sello de entrega directa."),
            ("4", "Etiqueta y Categoría", "Badges de prioridad (ej. Directo y Seguro, Máxima Prioridad) configurables por cada servicio."),
            ("5", "Botón Cotizar Envío", "Enlace interactivo que abre el formulario de cotización preseleccionando la modalidad elegida."),
        ],
        img_max_height_in=4.35,
    )
    doc.add_page_break()

    # Fig 6
    add_visual_module_page(
        doc, "03.6",
        "Contáctanos — Canales de Atención, Mapa y Formulario Directo",
        "Centro de contacto corporativo donde se integrarán el número telefónico oficial y el enlace definitivo de Google Maps.",
        "06_contacto.png",
        "Figura 6: Vista de Contáctanos destacando los espacios reservados para datos definitivos pendientes.",
        [
            ("1", "Oficina / Google Maps (Pendiente)", "Tarjeta de dirección matriz y sección de mapa inferior listos para enlazar la ubicación exacta de Google Maps."),
            ("2", "Línea Telefónica (Pendiente)", "Espacio preparado para actualizar el número oficial definitivo de llamadas y WhatsApp corporativo."),
            ("3", "Redes Sociales Corporativas", "Accesos directos a Facebook, Instagram, X y YouTube con enlaces actualizables."),
            ("4", "Formulario de Contacto Directo", "Formulario interactivo para consultas comerciales y cotizaciones personalizadas 24/7."),
        ],
        img_max_height_in=4.35,
        extra_note=(
            "COBERTURA ADICIONAL: TRANSPORTE DE MASCOTAS",
            [
                ("El sitio incorpora adicionalmente la pestaña dedicada ", False),
                ("Transporte de Mascotas", True),
                (", con diseño enfocado en traslados pet-friendly en cabina, protocolos de bienestar e historias de clientes.", False),
            ],
        ),
    )
    doc.add_page_break()

    # Fig 7
    add_visual_module_page(
        doc, "03.7",
        "Cotizador Interactivo de Reservas y Enlace Directo a WhatsApp",
        "Ventana emergente accesible desde cualquier sección del sitio para estructurar solicitudes y enviarlas directo a WhatsApp.",
        "07_cotizador_modal.png",
        "Figura 7: Modal interactivo de cotización inmediata conectado a WhatsApp.",
        [
            ("1", "Selector Tipo de Servicio", "Desplegable para indicar si el requerimiento es Transporte Puerta a Puerta, Aeropuerto, Encomienda o Mascota."),
            ("2", "Origen y Destino del Viaje", "Campos exactos de dirección o ciudad de recogida y destino final, prellenados según la tarjeta pulsada."),
            ("3", "Fecha, Hora y Pasajeros", "Selectores de calendario, horario preferido, capacidad de pasajeros y opción de viaje con mascota."),
            ("4", "Envío Directo a WhatsApp", "Construye un mensaje estructurado con todos los datos ingresados y abre la conversación en WhatsApp."),
        ],
        img_max_height_in=4.55,
    )
    doc.add_page_break()

    # --------------------------------------------------------------------------
    # PÁGINAS 11–14: SECCIÓN 04 — MANUAL DEL PANEL DE CONTROL (CMS)
    # --------------------------------------------------------------------------
    add_section_header(doc, "04", "Manual de Uso del Panel de Administración (CMS)")

    # Fig 8
    add_visual_module_page(
        doc, "04.1",
        "Acceso al Portal Administrativo (Inicio de Sesión)",
        "Ingrese mediante https://happy-travel-ec.web.app/admin utilizando las credenciales provistas en la Sección 02.",
        "08_admin_login.png",
        "Figura 8: Pantalla de autenticación administrativa con identidad oficial y escaparate visual del 75 %.",
        [
            ("1", "Retorno al Sitio Web", "Enlace superior para regresar a la página pública sin cerrar la ventana del navegador."),
            ("2", "Logotipo Oficial Portal", "Cabecera institucional de Happy Travel que identifica el entorno seguro de administración."),
            ("3", "Credenciales de Acceso", "Campos de Usuario/Correo (admin@happytravel.com) y Contraseña con botón para revelar/ocultar clave."),
            ("4", "Botón Ingresar al Panel", "Valida la sesión y redirige inmediatamente a la consola de administración de carruseles."),
            ("5", "Acceso Rápido / Autocompletar", "Botón auxiliar que completa automáticamente las credenciales por defecto para agilizar pruebas."),
            ("6", "Escaparate Visual 75 %", "Composición fotográfica ejecutiva a pantalla completa diseñada a medida para la identidad de marca."),
        ],
        img_max_height_in=4.30,
    )
    doc.add_page_break()

    # Fig 9
    add_visual_module_page(
        doc, "04.2",
        "Consola Principal y Gestión de Módulos del CMS",
        "Desde la barra lateral izquierda seleccione cualquiera de los 5 módulos de carruseles para administrar sus tarjetas.",
        "09_admin_dashboard.png",
        "Figura 9: Consola principal del panel CMS con navegación lateral, contadores y grilla de tarjetas.",
        [
            ("1", "Logo Oficial en Sidebar", "Marca corporativa fija en la cabecera del menú lateral del administrador."),
            ("2", "Módulos CMS y Contadores", "Acceso a Mi Perfil, Destinos Populares, Rutas, Destinos Visitados, Flota y Encomiendas con conteo activo."),
            ("3", "Agregar Nuevo Elemento", "Crea una tarjeta nueva en el módulo actual lista para configurar textos e imagen."),
            ("4", "Tarjetas Publicadas", "Listado visual de cada tarjeta actualmente visible en el sitio web público con su etiqueta y orden."),
            ("5", "Botón Editar Tarjeta", "Abre el editor de 3 columnas de esa tarjeta; junto a él se ubica el ícono rojo para eliminarla."),
            ("6", "Regresar al Sitio Web", "Acceso directo superior para comprobar en la página pública los cambios recién guardados."),
        ],
        img_max_height_in=4.35,
    )
    doc.add_page_break()

    # Fig 10
    add_visual_module_page(
        doc, "04.3",
        "Edición de Tarjetas, Zoom No Destructivo y Vista Previa 1:1",
        "El editor de 3 columnas permite modificar textos, optimizar fotos a WebP, reencuadrar sin recortar y verificar el resultado real.",
        "10_admin_editor.png",
        "Figura 10: Editor de 3 columnas con modo 'Acomodar' activo, barra de zoom (125 %) y previsualización 1:1.",
        [
            ("1", "Col. 1: Textos y Campos", "Modifique nombre, provincia, badge superior, hito icónico, tarifa o descripción según el módulo."),
            ("2", "Col. 2: Encuadre WebP", "Pase el cursor para pulsar 'Cambiar' (convierte a WebP) o 'Acomodar' para arrastrar, centrar y confirmar ('Listo')."),
            ("3", "Barra de Zoom (100 %-300 %)", "Ajuste el acercamiento de forma NO DESTRUCTIVA: la imagen original se conserva íntegra para futuros reajustes."),
            ("4", "Col. 3: Vista Previa 1:1", "Previsualización exacta con las mismas dimensiones y proporciones con que se mostrará la tarjeta en la web."),
            ("5", "Guardar en Supabase", "Publica y sincroniza los cambios en la nube de inmediato; aparecerá un aviso de confirmación exitosa."),
        ],
        img_max_height_in=4.35,
        extra_note=(
            "FLUJO RÁPIDO DE EDICIÓN EN 3 PASOS",
            [
                ("1) Edite los textos en la Columna 1  →  ", True),
                ("2) Suba o acomode la foto con zoom en la Columna 2 y valide la Vista Previa 1:1 en la Columna 3  →  ", False),
                ("3) Pulse 'GUARDAR CAMBIOS' para reflejarlo al instante en la web.", True),
            ],
        ),
    )
    doc.add_page_break()

    # Fig 11
    add_visual_module_page(
        doc, "04.4",
        "Mi Perfil — Actualización de Datos y Seguridad",
        "Sección para personalizar la información del administrador y cambiar la contraseña de acceso cuando lo requiera.",
        "11_admin_perfil.png",
        "Figura 11: Módulo Mi Perfil para administración de cuenta y actualización de clave.",
        [
            ("1", "Nombre y Apellido / Cargo", "Datos identificativos de la cuenta administradora mostrados en la cabecera del perfil."),
            ("2", "Correo de Acceso al Panel", "Usuario o dirección de correo electrónico principal con la que inicia sesión."),
            ("3", "Cambio de Contraseña Segura", "Escriba una nueva contraseña solo cuando desee reemplazar la actual (déjelo vacío para mantenerla)."),
            ("4", "Teléfono / WhatsApp Admin", "Número de referencia asociado al perfil administrativo."),
            ("5", "Guardar Cambios de Perfil", "Aplica y almacena inmediatamente las nuevas credenciales en el sistema."),
        ],
        img_max_height_in=4.45,
    )
    doc.add_page_break()

    # --------------------------------------------------------------------------
    # PÁGINA 15: SECCIÓN 05 — PROTOCOLO DE GARANTÍA (30 DÍAS) Y FIRMAS
    # --------------------------------------------------------------------------
    add_section_header(
        doc, "05",
        "Protocolo de Garantía (30 Días) y Acta de Conformidad",
        "Procedimiento simplificado para solicitar la integración de los elementos pendientes dentro de los 30 días de garantía sin costo."
    )

    proto_headers = [
        ("Insumo Pendiente", WD_ALIGN_PARAGRAPH.LEFT),
        ("Qué Debe Remitir el Cliente", WD_ALIGN_PARAGRAPH.LEFT),
        ("Plazo de Aplicación", WD_ALIGN_PARAGRAPH.CENTER),
    ]
    proto_rows = [
        [("Dominio Web", True, C_NAVY, 8.6), ("Nombre de dominio elegido y acceso al panel DNS (GoDaddy, Namecheap, NIC.ec, etc.).", False, C_INK, 8.4), ("24–48 h hábiles", True, C_EMERALD, 8.3)],
        [("Teléfono y WhatsApp", True, C_NAVY, 8.6), ("Número oficial en formato internacional (+593 9X XXX XXXX) para llamadas y WhatsApp.", False, C_INK, 8.4), ("24 h hábiles", True, C_EMERALD, 8.3)],
        [("Google Maps", True, C_NAVY, 8.6), ("Enlace compartido de Google Maps con el pin exacto de la oficina o terminal.", False, C_INK, 8.4), ("24 h hábiles", True, C_EMERALD, 8.3)],
        [("Base de Datos Propia", True, C_NAVY, 8.6), ("(Opcional) URL y Anon Key de cuenta Supabase propia si deciden migrar la base activa.", False, C_INK, 8.4), ("24–48 h hábiles", True, C_EMERALD, 8.3)],
    ]
    add_formal_table(doc, proto_headers, proto_rows, [Inches(1.65), Inches(4.25), Inches(1.30)])

    add_formal_notice(
        doc,
        "VIGENCIA DE LA GARANTÍA TÉCNICA",
        [
            ("Vigencia: ", True),
            ("30 días calendario contados a partir del ", False),
            ("18 de noviembre de 2026 ", True),
            ("(hasta el 18 de diciembre de 2026). Toda solicitud de integración de los datos pendientes o ajuste menor enviado dentro de este periodo será atendida ", False),
            ("sin cargo adicional.", True),
        ],
        accent_hex=HEX_EMERALD,
        bg_hex="F0FDF4",
    )

    # Constancia de Cierre
    p_cls = doc.add_paragraph()
    p_cls.paragraph_format.space_before = Pt(18)
    p_cls.paragraph_format.space_after = Pt(24)
    p_cls.paragraph_format.line_spacing = 1.2
    rc = p_cls.add_run(
        "En constancia de la entrega formal del sitio web público, del Panel de Administración (CMS), de las credenciales de acceso "
        "y de la garantía activa de 30 días, suscriben las partes el presente documento:"
    )
    rc.font.name = FONT_MAIN; rc.font.size = Pt(9.2); rc.font.color.rgb = C_INK

    # Bloque Formal de Firmas
    stbl = doc.add_table(rows=1, cols=2)
    stbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    stbl.autofit = False
    set_table_borders_none(stbl)
    sc0, sc1 = stbl.rows[0].cells[0], stbl.rows[0].cells[1]
    sc0.width, sc1.width = Inches(3.6), Inches(3.6)
    set_cell_margins(sc0, top=420, bottom=60, left=140, right=140)
    set_cell_margins(sc1, top=420, bottom=60, left=140, right=140)

    for cell, role_title, org_line, date_line in [
        (sc0, "EQUIPO DE DESARROLLO", "Ingeniería Web y Sistemas CMS", "Fecha de Entrega: 18/11/2026"),
        (sc1, "HAPPY TRAVEL ECUADOR", "Recepción y Conformidad del Cliente", "Garantía Vigente: 30 Días"),
    ]:
        p = cell.paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p.paragraph_format.space_after = Pt(4)
        rline = p.add_run("______________________________________\n")
        rline.font.name = FONT_MAIN; rline.font.size = Pt(9); rline.font.color.rgb = C_MUTED
        rt = p.add_run(role_title + "\n")
        rt.font.name = FONT_MAIN; rt.font.size = Pt(9.5); rt.font.bold = True; rt.font.color.rgb = C_NAVY
        ro = p.add_run(org_line + "\n")
        ro.font.name = FONT_MAIN; ro.font.size = Pt(8.5); ro.font.color.rgb = C_SLATE
        rd = p.add_run(date_line)
        rd.font.name = FONT_MAIN; rd.font.size = Pt(8); rd.font.color.rgb = C_GOLD

    # Save DOCX & Convert via Microsoft Word COM to Native PDF
    docx_path = os.path.abspath("Manual_de_Usuario_y_Entrega_Happy_Travel.docx")
    pdf_path  = os.path.abspath("Manual_de_Usuario_y_Entrega_Happy_Travel.pdf")

    doc.save(docx_path)
    print(f"[OK] Word guardado: {docx_path} ({os.path.getsize(docx_path):,} bytes)")

    word = win32com.client.Dispatch("Word.Application")
    word.Visible = False
    try:
        wdoc = word.Documents.Open(docx_path)
        wdoc.Fields.Update()
        wdoc.SaveAs(pdf_path, FileFormat=17)  # 17 = wdFormatPDF
        wdoc.Close(SaveChanges=False)
        print(f"[OK] PDF nativo generado: {pdf_path} ({os.path.getsize(pdf_path):,} bytes)")
    finally:
        word.Quit()

if __name__ == "__main__":
    build_manual()
