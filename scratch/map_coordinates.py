import fitz

doc = fitz.open("Y:\\PROJECTS\\AIG-WEBSITE\\AIR G INTERNATIONAL PDEA.pdf")
page = doc[10] # Page 11

# Print text blocks with coordinates
print("--- TEXT BLOCKS ---")
for b in page.get_text("blocks"):
    x0, y0, x1, y1, text, block_no, block_type = b
    print(f"Block {block_no}: ({x0:.1f}, {y0:.1f}) -> ({x1:.1f}, {y1:.1f})")
    print(text.strip().replace('\n', ' | '))

# Print images with coordinates
print("\n--- IMAGES ---")
images = page.get_images(full=True)
for img in images:
    xref = img[0]
    rects = page.get_image_rects(xref)
    if rects:
        rect = rects[0]
        print(f"Xref {xref}: rect=({rect.x0:.1f}, {rect.y0:.1f}) -> ({rect.x1:.1f}, {rect.y1:.1f})")
