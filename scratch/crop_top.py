from PIL import Image

img_path = r"y:\PROJECTS\AIG-WEBSITE\public\extracted-images\page_5_img_1_53.png"
img = Image.open(img_path)
width, height = img.size
print(f"Image dimensions: {width}x{height}")

# Crop out the top header text of the slide
# Keep from Y = 28% of height down to the bottom
crop_y_start = int(height * 0.28)
cropped_img = img.crop((0, crop_y_start, width, height))
cropped_img.save(r"y:\PROJECTS\AIG-WEBSITE\public\extracted-images\page_5_no_header.png")

print("Successfully saved cropped page_5_no_header.png")
