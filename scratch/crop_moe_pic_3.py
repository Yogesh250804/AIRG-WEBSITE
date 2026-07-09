import shutil
from PIL import Image

src_original = r"y:\PROJECTS\AIG-WEBSITE\scratch\pmo_extracted\2.png"
dest_target = r"y:\PROJECTS\AIG-WEBSITE\public\extracted-images\moe_pradhan.png"

# 1. Restore original first
shutil.copyfile(src_original, dest_target)

# 2. Open and crop exactly to the photo frame (removing orange header and white footer texts)
img = Image.open(dest_target)
width, height = img.size

# Let's crop just the photo rectangle:
left = int(width * 0.085)
top = int(height * 0.362)
right = int(width * 0.535)
bottom = int(height * 0.735)

cropped = img.crop((left, top, right, bottom))
cropped.save(dest_target)
print("Recropped exactly to the photo frame successfully!")
