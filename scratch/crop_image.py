import os
from PIL import Image

image_path = "Y:\\PROJECTS\\AIG-WEBSITE\\public\\extracted-members\\page_10_img_3_388.png"
output_path = "Y:\\PROJECTS\\AIG-WEBSITE\\public\\extracted-members\\page_10_img_3_388_cropped.png"

if not os.path.exists(image_path):
    print(f"Error: {image_path} does not exist.")
    exit(1)

img = Image.open(image_path)
print(f"Original image size: {img.size}")

# Convert to grayscale to find non-black bounding box
gray_img = img.convert("L")
# Find bbox of pixels with intensity > 5 (solid black background is 0, but allow slight noise)
bbox = gray_img.getbbox()

if bbox:
    print(f"Detected bounding box: {bbox}")
    # Add a tiny padding to the bounding box if possible
    left, top, right, bottom = bbox
    padding = 10
    left = max(0, left - padding)
    top = max(0, top - padding)
    right = min(img.width, right + padding)
    bottom = min(img.height, bottom + padding)
    
    cropped_img = img.crop((left, top, right, bottom))
    cropped_img.save(output_path)
    print(f"Cropped image saved successfully to: {output_path} (Size: {cropped_img.size})")
else:
    print("No bounding box detected (image might be completely black).")
