import os
from PIL import Image, ImageDraw

output_dir = r"d:\New folder\New - Copy\shop\src\assets\images"
os.makedirs(output_dir, exist_ok=True)

def create_gradient_image(filename, width, height, colors, title, subtitle="", icon_type="guitar"):
    base = Image.new("RGB", (width, height), colors[0])
    draw = ImageDraw.Draw(base)
    
    # Diagonal gradient
    for y in range(height):
        r = int(colors[0][0] + (colors[1][0] - colors[0][0]) * (y / height))
        g = int(colors[0][1] + (colors[1][1] - colors[0][1]) * (y / height))
        b = int(colors[0][2] + (colors[1][2] - colors[0][2]) * (y / height))
        draw.line([(0, y), (width, y)], fill=(r, g, b))
    
    overlay = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    odraw = ImageDraw.Draw(overlay)
    
    accent = colors[2] if len(colors) > 2 else (255, 255, 255, 60)
    odraw.ellipse([int(width*0.1), int(height*0.1), int(width*0.9), int(height*0.8)], fill=(accent[0], accent[1], accent[2], 50))
    odraw.ellipse([int(-width*0.2), int(height*0.3), int(width*0.6), int(height*1.1)], fill=(255, 255, 255, 35))
    
    base = Image.alpha_composite(base.convert("RGBA"), overlay)
    draw = ImageDraw.Draw(base)
    
    cx, cy = width // 2, height // 2
    
    if icon_type == "hero":
        # Draw stylized guitar body and neck
        draw.polygon([(cx, cy - 60), (cx + 60, cy + 40), (cx + 35, cy + 90), (cx - 35, cy + 90), (cx - 60, cy + 40)], fill=(255, 255, 255, 230))
        draw.ellipse([cx - 22, cy, cx + 22, cy + 44], fill=(20, 20, 35, 240))
        draw.rectangle([cx - 7, cy - 170, cx + 7, cy - 50], fill=(240, 240, 255, 250))
        draw.ellipse([cx - 12, cy - 180, cx + 12, cy - 156], fill=(255, 110, 50, 250))
    elif icon_type == "avatar":
        draw.ellipse([cx - 55, cy - 55, cx + 55, cy + 55], fill=(255, 255, 255, 240))
        draw.ellipse([cx - 26, cy - 42, cx + 26, cy + 10], fill=(colors[0][0], colors[0][1], colors[0][2], 255))
        draw.ellipse([cx - 44, cy + 20, cx + 44, cy + 70], fill=(colors[0][0], colors[0][1], colors[0][2], 255))
    else:
        draw.ellipse([cx - 45, cy - 45, cx + 45, cy + 45], fill=(255, 255, 255, 200))
        draw.ellipse([cx - 26, cy - 26, cx + 26, cy + 26], fill=(colors[0][0], colors[0][1], colors[0][2], 230))
        draw.line([(cx - 60, cy + 60), (cx + 60, cy - 60)], fill=(255, 255, 255, 230), width=5)
    
    base.convert("RGB").save(os.path.join(output_dir, filename), "JPEG", quality=92)
    print(f"Generated {filename}")

p_orange = [(255, 94, 58), (255, 149, 0), (255, 214, 10)]
p_blue = [(24, 119, 242), (0, 198, 255), (100, 230, 255)]
p_purple = [(112, 0, 255), (190, 0, 255), (240, 100, 255)]
p_dark = [(30, 32, 45), (60, 65, 90), (120, 130, 170)]
p_teal = [(0, 180, 160), (0, 230, 200), (150, 255, 230)]
p_rose = [(245, 87, 108), (240, 140, 160), (255, 200, 210)]

images = [
    ("hero-instrument.jpg", 600, 750, p_orange, "Hero Guitar", "SoundCraft Masterpiece", "hero"),
    ("gallery-acoustic.jpg", 400, 400, p_orange, "Acoustic Guitar", "Solid Spruce Top", "instrument"),
    ("gallery-electric.jpg", 400, 400, p_blue, "Electric Guitar", "Custom Pickups", "instrument"),
    ("gallery-bass.jpg", 400, 400, p_purple, "Bass Guitar", "Deep 5-String", "instrument"),
    ("gallery-grandpiano.jpg", 400, 400, p_dark, "Grand Piano", "Concert Grade", "instrument"),
    ("gallery-synth.jpg", 400, 400, p_teal, "Analog Synth", "Polyphonic Module", "instrument"),
    ("gallery-drumset.jpg", 400, 400, p_rose, "Stage Drumset", "7-Piece Birch", "instrument"),
    ("gallery-snare.jpg", 400, 400, p_orange, "Snare Drum", "Brass Shell", "instrument"),
    ("gallery-violin.jpg", 400, 400, p_purple, "Violin", "Hand-crafted Maple", "instrument"),
    ("gallery-saxophone.jpg", 400, 400, p_blue, "Alto Saxophone", "Vintage Gold Lacquer", "instrument"),
    ("gallery-trumpet.jpg", 400, 400, p_teal, "Brass Trumpet", "Bb Professional", "instrument"),
    ("studio-session.jpg", 600, 500, p_dark, "Studio Session", "Live Mixing Desk", "hero"),
    ("mic-closeup.jpg", 350, 350, p_purple, "Condenser Mic", "Studio Grade", "instrument"),
    ("artist-1.jpg", 250, 250, p_orange, "Elena Rostova", "Vocalist & Producer", "avatar"),
    ("artist-2.jpg", 250, 250, p_blue, "Marcus Vance", "Lead Guitarist", "avatar"),
    ("artist-3.jpg", 250, 250, p_teal, "Chloe Bennett", "Audio Engineer", "avatar"),
]

for item in images:
    create_gradient_image(item[0], item[1], item[2], item[3], item[4], item[5], item[6])

print("All 16 image assets created successfully!")
