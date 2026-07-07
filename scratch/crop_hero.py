from PIL import Image

img_path = r"y:\PROJECTS\AIG-WEBSITE\public\extracted-images\page_1_img_1_39.png"
img = Image.open(img_path)
width, height = img.size
print(f"Original image dimensions: {width}x{height}")

# Precise crop to only hide the absolute bottom banner (AIRG, Pratap Pawar, emails)
# Keep from Y = 0 down to Y = 92.5% of height so the server rack and icons are fully preserved.
crop_y_end = int(height * 0.925)
cropped_img = img.crop((0, 0, width, crop_y_end))
cropped_img.save(r"y:\PROJECTS\AIG-WEBSITE\public\extracted-images\hero_bharat_cropped.png")

print("Successfully cropped and saved hero_bharat_cropped.png with precise crop!")
