import os
import json
import math
from PIL import Image, ImageDraw, ImageFont

RAW_DIR = os.path.abspath("manual_assets/raw_v2")
OUT_DIR = os.path.abspath("manual_assets/annotated_v2")
os.makedirs(OUT_DIR, exist_ok=True)

SCALE = 2  # 2x supersampling for crisp vector anti-aliasing

# Formal Corporate Executive Color Palette (Restrained & Cohesive)
COL_GOLD    = (180, 125, 10)   # #B47D0A Deep Corporate Gold
COL_AMBER   = (217, 119, 6)    # #D97706 Rich Amber
COL_NAVY    = (15, 45, 92)     # #0F2D5C Executive Navy
COL_CRIMSON = (185, 28, 28)    # #B91C1C Formal Crimson (for primary CTAs / Alerts)
COL_TEAL    = (13, 116, 144)   # #0D7490 Refined Petrol Teal

# Per-figure custom placement overrides when a side placement in empty backdrop is far cleaner
# Format: { fig_key: { item_num: {"mode": "top"|"bottom"|"free", "x": ..., "y": ..., "edge": "left"|"right"|"top"|"bottom"} } }
CUSTOM_PLACEMENTS = {
    # Hero: 1,2,3 on top (navbar), 4,5,6 cleanly split (4 free on clean sky right of H1 or top/bottom, 5,6 bottom)
    "01_inicio_hero": {
        1: {"mode": "top", "color": COL_GOLD},
        2: {"mode": "top", "color": COL_NAVY},
        3: {"mode": "top", "color": COL_CRIMSON},
        4: {"mode": "free", "cx": 1030, "cy": 250, "edge": "right", "color": COL_AMBER},
        5: {"mode": "bottom", "color": COL_TEAL},
        6: {"mode": "bottom", "color": COL_CRIMSON},
    },
    "02_destinos_populares": {
        1: {"mode": "top", "color": COL_NAVY},
        2: {"mode": "top", "color": COL_GOLD},
        3: {"mode": "bottom", "color": COL_AMBER},
        4: {"mode": "top", "color": COL_TEAL},
        5: {"mode": "bottom", "color": COL_CRIMSON},
    },
    "03_rutas_populares": {
        1: {"mode": "top", "color": COL_GOLD},
        2: {"mode": "top", "color": COL_NAVY},
        3: {"mode": "bottom", "color": COL_AMBER},
        4: {"mode": "bottom", "color": COL_CRIMSON},
        5: {"mode": "bottom", "color": COL_TEAL, "crop_y_top": 205, "crop_y_bot": 58},
    },
    "04_flota_clases": {
        1: {"mode": "bottom", "color": COL_NAVY},
        2: {"mode": "bottom", "color": COL_GOLD},
        3: {"mode": "bottom", "color": COL_AMBER},
    },
    "05_encomiendas": {
        1: {"mode": "top", "color": COL_NAVY},
        2: {"mode": "top", "color": COL_CRIMSON},
        3: {"mode": "bottom", "color": COL_AMBER},
        4: {"mode": "top", "color": COL_TEAL},
        5: {"mode": "bottom", "color": COL_CRIMSON},
    },
    "06_contacto": {
        1: {"mode": "top", "color": COL_CRIMSON},
        2: {"mode": "top", "color": COL_CRIMSON},
        3: {"mode": "bottom", "color": COL_GOLD},
        4: {"mode": "top", "color": COL_NAVY},
    },
    "07_cotizador_modal": {
        1: {"mode": "free", "cx": 205, "cy": 246, "edge": "left", "color": COL_NAVY},
        2: {"mode": "free", "cx": 1235, "cy": 326, "edge": "right", "color": COL_GOLD},
        3: {"mode": "free", "cx": 205, "cy": 407, "edge": "left", "color": COL_TEAL},
        4: {"mode": "bottom", "color": COL_CRIMSON},
    },
    "08_admin_login": {
        1: {"mode": "top", "color": COL_NAVY},
        2: {"mode": "free", "cx": 575, "cy": 185, "edge": "right", "color": COL_GOLD},
        3: {"mode": "free", "cx": 575, "cy": 462, "edge": "right", "color": COL_NAVY},
        4: {"mode": "free", "cx": 575, "cy": 560, "edge": "right", "color": COL_CRIMSON},
        5: {"mode": "bottom", "color": COL_TEAL},
        6: {"mode": "top", "color": COL_AMBER, "inset": 18},
    },
    "09_admin_dashboard": {
        1: {"mode": "top", "color": COL_GOLD},
        2: {"mode": "bottom", "color": COL_NAVY},
        3: {"mode": "free", "cx": 1030, "cy": 115, "edge": "left", "color": COL_CRIMSON},
        4: {"mode": "bottom", "color": COL_AMBER},
        5: {"mode": "bottom", "color": COL_TEAL},
        6: {"mode": "top", "color": COL_GOLD},
    },
    "10_admin_editor": {
        1: {"mode": "top", "color": COL_NAVY},
        2: {"mode": "top", "color": COL_GOLD},
        3: {"mode": "bottom", "color": COL_AMBER},
        4: {"mode": "top", "color": COL_TEAL},
        5: {"mode": "bottom", "color": COL_CRIMSON},
    },
    "11_admin_perfil": {
        1: {"mode": "top", "color": COL_NAVY},
        2: {"mode": "free", "cx": 165, "cy": 620, "edge": "left_elbow", "corridor_x": 430, "color": COL_GOLD},
        3: {"mode": "top", "color": COL_CRIMSON},
        4: {"mode": "bottom", "color": COL_TEAL},
        5: {"mode": "bottom", "color": COL_AMBER},
    },
}

def get_fonts(scale=SCALE):
    f_num = ImageFont.truetype(r"C:\Windows\Fonts\segoeuib.ttf", int(19 * scale))
    f_lbl = ImageFont.truetype(r"C:\Windows\Fonts\segoeuib.ttf", int(19 * scale))
    f_badge = ImageFont.truetype(r"C:\Windows\Fonts\segoeuib.ttf", int(15 * scale))
    return f_num, f_lbl, f_badge

def measure_bubble(draw, num, label, f_lbl, scale=SCALE):
    bbox = draw.textbbox((0, 0), label, font=f_lbl)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    r_circ = int(15 * scale)
    pad_l = int(10 * scale)
    gap = int(10 * scale)
    pad_r = int(16 * scale)
    h = int(46 * scale)
    w = pad_l + (r_circ * 2) + gap + tw + pad_r
    return w, h, tw, th, r_circ

def draw_arrowhead(draw, x_from, y_from, x_to, y_to, color, scale=SCALE):
    angle = math.atan2(y_to - y_from, x_to - x_from)
    head_len = 16 * scale
    head_w = 8 * scale
    p1 = (x_to, y_to)
    p2 = (
        x_to - head_len * math.cos(angle) + head_w * math.sin(angle),
        y_to - head_len * math.sin(angle) - head_w * math.cos(angle),
    )
    p3 = (
        x_to - head_len * math.cos(angle) - head_w * math.sin(angle),
        y_to - head_len * math.sin(angle) + head_w * math.cos(angle),
    )
    # White contrast outline first
    draw.polygon([p1, p2, p3], fill=color, outline=(255, 255, 255, 245))

def draw_poly_arrow(draw, points, color, scale=SCALE):
    """Draws an anti-aliased polyline with white halo + colored shaft + solid arrowhead at final point."""
    if len(points) < 2:
        return
    # Shorten final segment slightly so line shaft doesn't poke past triangle tip
    x1, y1 = points[-2]
    x2, y2 = points[-1]
    dist = math.hypot(x2 - x1, y2 - y1)
    shaft_pts = list(points)
    if dist > 14 * scale:
        ratio = (dist - 11 * scale) / dist
        shaft_pts[-1] = (x1 + (x2 - x1) * ratio, y1 + (y2 - y1) * ratio)

    # White contrast casing
    draw.line(shaft_pts, fill=(255, 255, 255, 240), width=int(7.5 * scale), joint="curve")
    # Small circles at bends for crisp smooth corners
    r_w = int(3.5 * scale)
    for px, py in shaft_pts[1:-1]:
        draw.ellipse([px - r_w, py - r_w, px + r_w, py + r_w], fill=(255, 255, 255, 240))

    # Colored shaft
    draw.line(shaft_pts, fill=(*color, 255), width=int(3.5 * scale), joint="curve")
    r_c = int(1.8 * scale)
    for px, py in shaft_pts[1:-1]:
        draw.ellipse([px - r_c, py - r_c, px + r_c, py + r_c], fill=(*color, 255))

    # Arrowhead at exact final tip
    draw_arrowhead(draw, x1, y1, x2, y2, (*color, 255), scale=scale)

def draw_highlight_box(draw_overlay, draw_solid, rect, num, color, f_badge, scale=SCALE):
    x1, y1, x2, y2 = rect
    rad = int(10 * scale)
    # 1. Soft 8% translucent highlight tint drawn on separate alpha overlay (NEVER hides underlying UI!)
    draw_overlay.rounded_rectangle([x1, y1, x2, y2], radius=rad, fill=(*color, 20))
    # 2. Outer white contrast halo (border only, fill=None)
    draw_solid.rounded_rectangle([x1 - 2*scale, y1 - 2*scale, x2 + 2*scale, y2 + 2*scale], radius=rad + 2*scale, outline=(255, 255, 255, 240), width=int(7 * scale))
    # 3. Crisp solid accent border (remarcado de bordes, fill=None)
    draw_solid.rounded_rectangle([x1, y1, x2, y2], radius=rad, outline=(*color, 255), width=int(3.8 * scale))

    # 4. Crisp numbered corner badge on top-left corner of highlighted box
    br = int(13 * scale)
    bx = x1 + int(2 * scale)
    by = y1 + int(2 * scale)
    draw_solid.ellipse([bx - br - 2*scale, by - br - 2*scale, bx + br + 2*scale, by + br + 2*scale], fill=(255, 255, 255, 250))
    draw_solid.ellipse([bx - br, by - br, bx + br, by + br], fill=(*color, 255))
    ns = str(num)
    nb = draw_solid.textbbox((0, 0), ns, font=f_badge)
    nw, nh = nb[2] - nb[0], nb[3] - nb[1]
    draw_solid.text((bx - nw/2 - nb[0], by - nh/2 - nb[1]), ns, fill=(255, 255, 255, 255), font=f_badge)

def draw_message_bubble(draw_overlay, draw_solid, cx, cy, num, label, color, f_num, f_lbl, scale=SCALE):
    w, h, tw, th, r_circ = measure_bubble(draw_solid, num, label, f_lbl, scale)
    x1 = cx - w / 2
    y1 = cy - h / 2
    x2 = cx + w / 2
    y2 = cy + h / 2
    rad = int(14 * scale)

    # Soft translucent drop shadow on alpha overlay
    sh_off = int(4 * scale)
    draw_overlay.rounded_rectangle([x1 + sh_off, y1 + sh_off, x2 + sh_off, y2 + sh_off], radius=rad, fill=(15, 23, 42, 42))
    # White formal card + colored border
    draw_solid.rounded_rectangle([x1, y1, x2, y2], radius=rad, fill=(255, 255, 255, 255), outline=(*color, 255), width=int(2.6 * scale))

    # Left circular number badge
    circ_cx = x1 + int(10 * scale) + r_circ
    circ_cy = cy
    draw_solid.ellipse([circ_cx - r_circ, circ_cy - r_circ, circ_cx + r_circ, circ_cy + r_circ], fill=(*color, 255))
    ns = str(num)
    nb = draw_solid.textbbox((0, 0), ns, font=f_num)
    nw, nh = nb[2] - nb[0], nb[3] - nb[1]
    draw_solid.text((circ_cx - nw/2 - nb[0], circ_cy - nh/2 - nb[1]), ns, fill=(255, 255, 255, 255), font=f_num)

    # Label text
    tx = circ_cx + r_circ + int(10 * scale)
    tb = draw_solid.textbbox((0, 0), label, font=f_lbl)
    ty = cy - (tb[3] - tb[1]) / 2 - tb[1]
    draw_solid.text((tx, ty), label, fill=(10, 22, 40, 255), font=f_lbl)

    return (x1, y1, x2, y2)

def resolve_row_positions(entries, canvas_w, scale=SCALE):
    """Distributes bubbles horizontally in a gutter without overlap, ordered by target center X."""
    if not entries:
        return {}
    entries_sorted = sorted(entries, key=lambda e: e["target_cx"])
    min_gap = int(20 * scale)
    margin = int(22 * scale)

    # Start with ideal positions clamped to bounds
    xs = []
    for e in entries_sorted:
        ideal = max(margin + e["w"] / 2, min(canvas_w - margin - e["w"] / 2, e["target_cx"]))
        xs.append(ideal)

    # Iterative relaxation to eliminate overlaps
    for _ in range(30):
        moved = False
        for i in range(len(entries_sorted) - 1):
            right_i = xs[i] + entries_sorted[i]["w"] / 2
            left_j = xs[i + 1] - entries_sorted[i + 1]["w"] / 2
            overlap = (right_i + min_gap) - left_j
            if overlap > 0:
                xs[i] -= overlap / 2
                xs[i + 1] += overlap / 2
                moved = True
        # Clamp within canvas bounds
        for i in range(len(entries_sorted)):
            lo = margin + entries_sorted[i]["w"] / 2
            hi = canvas_w - margin - entries_sorted[i]["w"] / 2
            if xs[i] < lo:
                xs[i] = lo
            elif xs[i] > hi:
                xs[i] = hi
        if not moved:
            break

    # Final forward pass to enforce strict non-overlap from left
    for i in range(len(entries_sorted) - 1):
        min_next = xs[i] + entries_sorted[i]["w"] / 2 + min_gap + entries_sorted[i + 1]["w"] / 2
        if xs[i + 1] < min_next:
            xs[i + 1] = min_next
    # If pushed past right edge, shift group left
    if entries_sorted:
        overflow = (xs[-1] + entries_sorted[-1]["w"] / 2) - (canvas_w - margin)
        if overflow > 0:
            xs = [x - overflow for x in xs]

    return {entries_sorted[i]["num"]: xs[i] for i in range(len(entries_sorted))}

def render_figure(fig_key, data):
    raw_path = os.path.join(RAW_DIR, data["img"])
    src = Image.open(raw_path).convert("RGBA")
    sw, sh = src.size

    overrides = CUSTOM_PLACEMENTS.get(fig_key, {})

    # Determine if top or bottom gutter has items (so we don't waste empty space on an unused gutter!)
    has_top = any(overrides.get(it["num"], {}).get("mode", it.get("side", "top")) == "top" for it in data["items"] if it["box"])
    has_bot = any(overrides.get(it["num"], {}).get("mode", it.get("side", "bottom")) == "bottom" for it in data["items"] if it["box"])

    pad_top = 105 if has_top else 28
    pad_bot = 105 if has_bot else 28
    pad_lr = 34

    cw = (sw + pad_lr * 2) * SCALE
    ch = (sh + pad_top + pad_bot) * SCALE

    # Clean pearl-white executive diagram canvas
    canvas = Image.new("RGBA", (cw, ch), (248, 250, 252, 255))
    bg_shadow = Image.new("RGBA", (cw, ch), (0, 0, 0, 0))
    draw_bg = ImageDraw.Draw(bg_shadow)

    ox = pad_lr * SCALE
    oy = pad_top * SCALE

    # Soft translucent drop shadow behind screenshot
    s_off = int(6 * SCALE)
    draw_bg.rounded_rectangle(
        [ox + s_off, oy + s_off, ox + sw * SCALE + s_off, oy + sh * SCALE + s_off],
        radius=int(8 * SCALE), fill=(15, 23, 42, 34)
    )
    canvas = Image.alpha_composite(canvas, bg_shadow)

    # Paste upscaled crisp screenshot
    src_2x = src.resize((sw * SCALE, sh * SCALE), Image.Resampling.LANCZOS)
    canvas.alpha_composite(src_2x, (ox, oy))

    # Separate alpha-blended overlay (translucent tints + bubble shadows) and solid crisp vector layer
    overlay = Image.new("RGBA", (cw, ch), (0, 0, 0, 0))
    solid = Image.new("RGBA", (cw, ch), (0, 0, 0, 0))
    draw_overlay = ImageDraw.Draw(overlay)
    draw_solid = ImageDraw.Draw(solid)

    # Crisp hairline border framing the screenshot
    draw_solid.rectangle([ox - 1, oy - 1, ox + sw * SCALE + 1, oy + sh * SCALE + 1], outline=(203, 213, 225, 255), width=int(2 * SCALE))

    f_num, f_lbl, f_badge = get_fonts(SCALE)

    # Prepare items & highlight rects
    top_entries = []
    bot_entries = []
    free_entries = []
    prepared = []

    for it in data["items"]:
        if not it.get("box"):
            continue
        num = it["num"]
        label = it["label"]
        b = it["box"]
        ov = overrides.get(num, {})
        mode = ov.get("mode", "top" if (b["y"] + b["h"] / 2) < (sh / 2) else "bottom")
        color = ov.get("color", COL_GOLD)
        inset = ov.get("inset", -5)  # negative inset = 5px outward breathing padding

        # Clamped target rect in 2x canvas coordinates
        cy_top = ov.get("crop_y_top", 0)
        cy_bot = ov.get("crop_y_bot", 0)
        rx1 = max(ox + 4 * SCALE, ox + (b["x"] + inset) * SCALE)
        ry1 = max(oy + 4 * SCALE, oy + (b["y"] + cy_top + inset) * SCALE)
        rx2 = min(ox + sw * SCALE - 4 * SCALE, ox + (b["x"] + b["w"] - inset) * SCALE)
        ry2 = min(oy + sh * SCALE - 4 * SCALE, oy + (b["y"] + b["h"] - cy_bot - inset) * SCALE)
        rect = (rx1, ry1, rx2, ry2)
        tcx = (rx1 + rx2) / 2
        tcy = (ry1 + ry2) / 2

        bw, bh, _, _, _ = measure_bubble(draw_solid, num, label, f_lbl, SCALE)
        entry = {
            "num": num, "label": label, "mode": mode, "color": color,
            "rect": rect, "target_cx": tcx, "target_cy": tcy, "w": bw, "h": bh, "ov": ov
        }
        prepared.append(entry)
        if mode == "top":
            top_entries.append(entry)
        elif mode == "bottom":
            bot_entries.append(entry)
        else:
            free_entries.append(entry)

    # Draw ALL Highlight Borders first
    for e in prepared:
        draw_highlight_box(draw_overlay, draw_solid, e["rect"], e["num"], e["color"], f_badge, SCALE)

    # Compute non-overlapping horizontal centers in Top & Bottom gutters
    top_xs = resolve_row_positions(top_entries, cw, SCALE)
    bot_xs = resolve_row_positions(bot_entries, cw, SCALE)

    top_cy = int(42 * SCALE)
    bot_cy = ch - int(42 * SCALE)

    top_sorted = sorted(top_entries, key=lambda e: e["target_cx"])
    bot_sorted = sorted(bot_entries, key=lambda e: e["target_cx"])

    # Draw Top Gutter Bubbles + Orthogonal Directed Arrows
    for idx, e in enumerate(top_sorted):
        bcx = top_xs[e["num"]]
        b_rect = draw_message_bubble(draw_overlay, draw_solid, bcx, top_cy, e["num"], e["label"], e["color"], f_num, f_lbl, SCALE)
        rx1, ry1, rx2, ry2 = e["rect"]
        aim_x = min(rx2 - 14 * SCALE, max(rx1 + 32 * SCALE, bcx))
        if abs(bcx - aim_x) < 18 * SCALE:
            pts = [(bcx, b_rect[3]), (bcx, ry1 - 2 * SCALE)]
        else:
            aim_x = (rx1 + rx2) / 2
            if aim_x < rx1 + 30 * SCALE:
                aim_x = min(rx2 - 8 * SCALE, rx1 + 30 * SCALE)
            elbow_y = b_rect[3] + int((14 + (idx % 3) * 10) * SCALE)
            pts = [(bcx, b_rect[3]), (bcx, elbow_y), (aim_x, elbow_y), (aim_x, ry1 - 2 * SCALE)]
        draw_poly_arrow(draw_solid, pts, e["color"], SCALE)

    # Draw Bottom Gutter Bubbles + Orthogonal Directed Arrows
    for idx, e in enumerate(bot_sorted):
        bcx = bot_xs[e["num"]]
        b_rect = draw_message_bubble(draw_overlay, draw_solid, bcx, bot_cy, e["num"], e["label"], e["color"], f_num, f_lbl, SCALE)
        rx1, ry1, rx2, ry2 = e["rect"]
        aim_x = min(rx2 - 14 * SCALE, max(rx1 + 14 * SCALE, bcx))
        if abs(bcx - aim_x) < 18 * SCALE:
            pts = [(bcx, b_rect[1]), (bcx, ry2 + 2 * SCALE)]
        else:
            aim_x = (rx1 + rx2) / 2
            elbow_y = b_rect[1] - int((14 + (idx % 3) * 10) * SCALE)
            pts = [(bcx, b_rect[1]), (bcx, elbow_y), (aim_x, elbow_y), (aim_x, ry2 + 2 * SCALE)]
        draw_poly_arrow(draw_solid, pts, e["color"], SCALE)

    # Draw Free-Space Bubbles (for clean horizontal arrows in modal/login empty backdrops)
    for e in free_entries:
        ov = e["ov"]
        bcx = ox + ov["cx"] * SCALE
        bcy = oy + ov["cy"] * SCALE
        b_rect = draw_message_bubble(draw_overlay, draw_solid, bcx, bcy, e["num"], e["label"], e["color"], f_num, f_lbl, SCALE)
        rx1, ry1, rx2, ry2 = e["rect"]
        edge = ov.get("edge", "left")
        if edge == "right":
            aim_y = max(ry1 + 12 * SCALE, min(ry2 - 12 * SCALE, bcy))
            pts = [(b_rect[0], bcy), (rx2 + 2 * SCALE, aim_y)]
        elif edge == "left":
            aim_y = max(ry1 + 12 * SCALE, min(ry2 - 12 * SCALE, bcy))
            pts = [(b_rect[2], bcy), (rx1 - 2 * SCALE, aim_y)]
        elif edge == "left_elbow":
            corr_x = ox + ov.get("corridor_x", 430) * SCALE
            aim_y = (ry1 + ry2) / 2
            pts = [(b_rect[2], bcy), (corr_x, bcy), (corr_x, aim_y), (rx1 - 2 * SCALE, aim_y)]
        elif edge == "top":
            pts = [(bcx, b_rect[3]), (e["target_cx"], ry1 - 2 * SCALE)]
        else:
            pts = [(bcx, b_rect[1]), (e["target_cx"], ry2 + 2 * SCALE)]
        draw_poly_arrow(draw_solid, pts, e["color"], SCALE)

    # Composite layers cleanly: Screenshot -> Translucent Overlay -> Crisp Solid Borders/Arrows/Bubbles
    canvas = Image.alpha_composite(canvas, overlay)
    canvas = Image.alpha_composite(canvas, solid)

    # Downsample 2x -> 1x with LANCZOS for razor-sharp anti-aliased final PNG
    final_img = canvas.resize((cw // SCALE, ch // SCALE), Image.Resampling.LANCZOS).convert("RGB")
    out_path = os.path.join(OUT_DIR, data["img"])
    final_img.save(out_path, optimize=True)
    print(f"  [OK] Renderizada: {out_path} ({final_img.size[0]}x{final_img.size[1]})")

def main():
    with open(os.path.join(RAW_DIR, "boxes.json"), "r", encoding="utf-8") as f:
        meta = json.load(f)
    print(f"Renderizando {len(meta)} figuras con bordes remarcados y flechas precisas...")
    for k, v in meta.items():
        render_figure(k, v)
    print("¡Renderizado de alta precisión completado!")

if __name__ == "__main__":
    main()
