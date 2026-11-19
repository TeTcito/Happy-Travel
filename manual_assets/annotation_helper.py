import os
from PIL import Image, ImageDraw, ImageFont

def get_fonts():
    try:
        font_num = ImageFont.truetype(r"C:\Windows\Fonts\segoeuib.ttf", 22)
        font_txt = ImageFont.truetype(r"C:\Windows\Fonts\segoeui.ttf", 15)
        font_txt_bold = ImageFont.truetype(r"C:\Windows\Fonts\segoeuib.ttf", 15)
    except Exception:
        font_num = ImageFont.load_default()
        font_txt = ImageFont.load_default()
        font_txt_bold = ImageFont.load_default()
    return font_num, font_txt, font_txt_bold

def draw_callout(draw, num, x, y, target_x=None, target_y=None, label="", color=(217, 119, 6), font_num=None, font_txt=None):
    # Colors
    bg_circle = color
    border_circle = (255, 255, 255)
    text_color = (255, 255, 255)
    radius = 18

    # 1. Draw pointer line/arrow if target is given
    if target_x is not None and target_y is not None:
        draw.line([(x, y), (target_x, target_y)], fill=(255, 255, 255), width=4)
        draw.line([(x, y), (target_x, target_y)], fill=color, width=2)
        # Target dot
        t_r = 6
        draw.ellipse([target_x - t_r, target_y - t_r, target_x + t_r, target_y + t_r], fill=color, outline=(255, 255, 255), width=2)

    # 2. Draw shadow
    draw.ellipse([x - radius + 2, y - radius + 2, x + radius + 2, y + radius + 2], fill=(0, 0, 0, 140))

    # 3. Draw circle bubble
    draw.ellipse([x - radius, y - radius, x + radius, y + radius], fill=bg_circle, outline=border_circle, width=3)

    # 4. Draw number text centered
    num_str = str(num)
    bbox = draw.textbbox((0, 0), num_str, font=font_num)
    w = bbox[2] - bbox[0]
    h = bbox[3] - bbox[1]
    draw.text((x - w / 2, y - h / 2 - 2), num_str, fill=text_color, font=font_num)

    # 5. Optional small pill tag next to bubble if label is present
    if label:
        t_bbox = draw.textbbox((0, 0), label, font=font_txt)
        lw = t_bbox[2] - t_bbox[0]
        lh = t_bbox[3] - t_bbox[1]
        px = x + radius + 6
        py = y - 14
        pad_x = 8
        pad_y = 4
        # Pill background
        draw.rounded_rectangle([px, py, px + lw + pad_x*2, py + lh + pad_y*2], radius=8, fill=(15, 23, 42, 230), outline=(255, 255, 255, 200), width=1)
        draw.text((px + pad_x, py + pad_y - 1), label, fill=(255, 255, 255), font=font_txt)

print("Annotation helper defined successfully.")
