import fitz

doc = fitz.open("Y:\\PROJECTS\\AIG-WEBSITE\\AIR G INTERNATIONAL PDEA.pdf")
page = doc[10] # Page 11

images = page.get_images(full=True)
print(f"Total images on Page 11: {len(images)}")

# Get image rects
image_rects = []
for img in images:
    xref = img[0]
    rects = page.get_image_rects(xref)
    if rects:
        rect = rects[0]
        image_rects.append((xref, rect))

# Sort rects top-to-bottom, then left-to-right
image_rects.sort(key=lambda item: (round(item[1].y0, 1), round(item[1].x0, 1)))

for idx, (xref, rect) in enumerate(image_rects):
    print(f"Rank {idx+1}: xref={xref}, rect={rect}")
