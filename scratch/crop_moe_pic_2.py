import shutil
from PIL import Image

src_original = r"y:\PROJECTS\AIG-WEBSITE\scratch\pmo_extracted\2.png"
dest_target = r"y:\PROJECTS\AIG-WEBSITE\public\extracted-images\moe_pradhan.png"

# 1. Restore original first
shutil.copyfile(src_original, dest_target)
print("Restored original image.")

# 2. Open and crop with wider coordinates
img = Image.open(dest_target)
width, height = img.size
print(f"Original dimensions: {width}x{height}")

# Wider bounds to keep the full photo
left = int(width * 0.01)
top = int(height * 0.10)
right = int(width * 0.55)
bottom = int(height * 0.77)

cropped = img.crop((left, top, right, bottom))
cropped.save(dest_target)
print("Recropped with wider coordinates successfully!")
