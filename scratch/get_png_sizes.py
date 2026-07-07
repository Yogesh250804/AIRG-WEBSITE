import os
import struct

output_dir = "Y:\\PROJECTS\\AIG-WEBSITE\\public\\extracted-members"

def get_png_size(filepath):
    with open(filepath, 'rb') as f:
        data = f.read(24)
        if len(data) >= 24 and data[:8] == b'\x89PNG\r\n\x1a\n':
            # Offset 16 contains width, 20 contains height (both 4-byte big-endian integers)
            w, h = struct.unpack('>II', data[16:24])
            return w, h
    return None

files = os.listdir(output_dir)
png_files = [f for f in files if f.endswith('.png')]

# Group by page
pages = {}
for f in png_files:
    parts = f.split('_')
    if len(parts) >= 2:
        page_num = parts[1]
        if page_num not in pages:
            pages[page_num] = []
        pages[page_num].append(f)

for page in sorted(pages.keys(), key=int):
    print(f"\n=== Page {page} ===")
    for f in sorted(pages[page]):
        size = get_png_size(os.path.join(output_dir, f))
        bytes_size = os.path.getsize(os.path.join(output_dir, f))
        print(f"  {f}: {size} (File size: {bytes_size / 1024:.1f} KB)")
