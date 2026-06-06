import os
from PIL import Image

# Paths
image_path = r"C:\Users\DELL\.gemini\antigravity-ide\brain\995bb356-7991-41b8-a827-89f9a9a44076\media__1780734475558.jpg"
public_dir = r"c:\Users\DELL\OneDrive\Desktop\AIG-WEBSITE\public"

# Open the image
img = Image.open(image_path)
width, height = img.size

# Calculate column width
col_width = width // 3

# Crop definitions (left, upper, right, lower)
ai_kit = img.crop((0, 0, col_width, height))
iot_kit = img.crop((col_width, 0, col_width * 2, height))
robotics_kit = img.crop((col_width * 2, 0, width, height))

# Save images
ai_kit.save(os.path.join(public_dir, "ai-kit.png"))
iot_kit.save(os.path.join(public_dir, "iot-kit.png"))
robotics_kit.save(os.path.join(public_dir, "robotics-kit.png"))

print("Successfully split and saved kits to public directory!")
