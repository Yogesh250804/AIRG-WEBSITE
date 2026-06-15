import os
import shutil

src_dir = r"C:\Users\DELL\Downloads"
dest_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "public", "products")

files = [
  "WhatsApp Image 2026-06-09 at 12.36.05 PM.jpeg",
  "WhatsApp Image 2026-06-09 at 12.36.05 PM (1).jpeg",
  "WhatsApp Image 2026-06-09 at 12.36.05 PM (2).jpeg",
  "WhatsApp Image 2026-06-09 at 12.36.05 PM (3).jpeg",
  "WhatsApp Image 2026-06-09 at 12.36.06 PM.jpeg",
  "WhatsApp Image 2026-06-09 at 12.36.06 PM (1).jpeg",
  "WhatsApp Image 2026-06-09 at 12.36.06 PM (2).jpeg",
  "WhatsApp Image 2026-06-09 at 12.36.06 PM (3).jpeg",
  "WhatsApp Image 2026-06-09 at 12.36.07 PM.jpeg",
  "WhatsApp Image 2026-06-09 at 12.36.07 PM (1).jpeg",
  "WhatsApp Image 2026-06-09 at 12.36.07 PM (2).jpeg",
  "WhatsApp Image 2026-06-09 at 12.36.07 PM (3).jpeg",
  "WhatsApp Image 2026-06-09 at 12.36.08 PM.jpeg",
  "WhatsApp Image 2026-06-09 at 12.36.08 PM (1).jpeg",
  "WhatsApp Image 2026-06-09 at 12.36.08 PM (2).jpeg"
]

if not os.path.exists(dest_dir):
    os.makedirs(dest_dir, exist_ok=True)

for i, file in enumerate(files):
    src_path = os.path.join(src_dir, file)
    dest_path = os.path.join(dest_dir, f"product_{i + 1}.jpeg")
    try:
        if os.path.exists(src_path):
            shutil.copy2(src_path, dest_path)
            print(f"Copied {file} to product_{i + 1}.jpeg")
        else:
            print(f"File not found: {src_path}")
    except Exception as e:
        print(f"Error copying {file}: {e}")
