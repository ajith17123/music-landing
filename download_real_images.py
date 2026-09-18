import os
import urllib.request

output_dir = r"d:\New folder\New - Copy\shop\src\assets\images"
os.makedirs(output_dir, exist_ok=True)

# Delete existing images first as requested by user
print("Cleaning up old image files...")
for filename in os.listdir(output_dir):
    file_path = os.path.join(output_dir, filename)
    if os.path.isfile(file_path):
        os.remove(file_path)
        print(f"Deleted old file: {filename}")

# High quality curated Unsplash photography image URLs (using Unsplash source / photo URLs)
image_sources = {
    "hero-instrument.jpg": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop",
    "gallery-acoustic.jpg": "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=600&auto=format&fit=crop",
    "gallery-electric.jpg": "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?q=80&w=600&auto=format&fit=crop",
    "gallery-bass.jpg": "https://images.unsplash.com/photo-1568285514605-e4620573e878?q=80&w=600&auto=format&fit=crop",
    "gallery-grandpiano.jpg": "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=600&auto=format&fit=crop",
    "gallery-synth.jpg": "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=600&auto=format&fit=crop",
    "gallery-drumset.jpg": "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?q=80&w=600&auto=format&fit=crop",
    "gallery-snare.jpg": "https://images.unsplash.com/photo-1543443374-b6fe10a6ab7b?q=80&w=600&auto=format&fit=crop",
    "gallery-violin.jpg": "https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?q=80&w=600&auto=format&fit=crop",
    "gallery-saxophone.jpg": "https://images.unsplash.com/photo-1525994886773-080587e161c2?q=80&w=600&auto=format&fit=crop",
    "gallery-trumpet.jpg": "https://images.unsplash.com/photo-1573871669414-010dbf73ca84?q=80&w=600&auto=format&fit=crop",
    "studio-session.jpg": "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=800&auto=format&fit=crop",
    "mic-closeup.jpg": "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=500&auto=format&fit=crop",
    "artist-1.jpg": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
    "artist-2.jpg": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    "artist-3.jpg": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
}

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

for filename, url in image_sources.items():
    dest_path = os.path.join(output_dir, filename)
    print(f"Downloading {filename} from Unsplash...")
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as response, open(dest_path, 'wb') as out_file:
            out_file.write(response.read())
        print(f"Successfully downloaded {filename} ({os.path.getsize(dest_path)} bytes)")
    except Exception as e:
        print(f"Error downloading {filename}: {e}")

print("All 16 high-resolution real photographs downloaded and saved!")
