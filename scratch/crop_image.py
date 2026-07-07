from PIL import Image

img_path = r"y:\PROJECTS\AIG-WEBSITE\public\extracted-images\page_5_img_1_53.png"
img = Image.open(img_path)
width, height = img.size
print(f"Image dimensions: {width}x{height}")

# Let's crop the three server box renders from the slide.
# In a 1920x1080 slide:
# School Edition box is on the left
# Professional Edition box is in the middle
# Enterprise Edition box is on the right

# Let's crop regions around the server box renders:
# School box:
# Left box: x around 200 to 500, y around 400 to 800
school_box = img.crop((int(width * 0.05), int(height * 0.40), int(width * 0.22), int(height * 0.65)))
school_box.save(r"y:\PROJECTS\AIG-WEBSITE\public\extracted-images\school_server_box.png")

# Professional box:
# Middle box: x around 700 to 1000, y around 400 to 800
pro_box = img.crop((int(width * 0.36), int(height * 0.44), int(width * 0.52), int(height * 0.65)))
pro_box.save(r"y:\PROJECTS\AIG-WEBSITE\public\extracted-images\pro_server_box.png")

# Enterprise box:
# Right box: x around 1200 to 1500, y around 400 to 800
enterprise_box = img.crop((int(width * 0.66), int(height * 0.40), int(width * 0.82), int(height * 0.65)))
enterprise_box.save(r"y:\PROJECTS\AIG-WEBSITE\public\extracted-images\enterprise_server_box.png")

print("Cropped images saved!")
