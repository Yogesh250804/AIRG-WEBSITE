from PIL import Image

img_path = r"y:\PROJECTS\AIG-WEBSITE\public\extracted-images\moe_pradhan.png"
img = Image.open(img_path)
width, height = img.size
print(f"Original dimensions: {width}x{height}")

# Let's inspect the layout. Based on standard 16:9 Canva templates:
# The left picture is approximately:
# X: from ~5% to ~52% of width
# Y: from ~35% to ~76% of height
# Let's write a script that crops it and saves it.
# We will do a bounding box crop based on percentage.
left = int(width * 0.05)
top = int(height * 0.35)
right = int(width * 0.52)
bottom = int(height * 0.77)

cropped = img.crop((left, top, right, bottom))
cropped.save(img_path)
print("Cropped successfully!")
