import os
import fitz  # PyMuPDF

pdf_path = r"y:\PROJECTS\AIG-WEBSITE\Copy of PMO, Delhi.pdf"
extract_dir = r"y:\PROJECTS\AIG-WEBSITE\scratch\pmo_extracted"

os.makedirs(extract_dir, exist_ok=True)

doc = fitz.open(pdf_path)

# Page 4 (0-indexed = page 3)
page = doc[3]
images = page.get_images(full=True)
print(f"Page 4 has {len(images)} images")

for i, img_info in enumerate(images):
    xref = img_info[0]
    base_image = doc.extract_image(xref)
    image_bytes = base_image["image"]
    ext = base_image["ext"]
    w = base_image["width"]
    h = base_image["height"]
    
    out_path = os.path.join(extract_dir, f"page4_img_{i}.{ext}")
    with open(out_path, "wb") as f:
        f.write(image_bytes)
    print(f"  Image {i}: {w}x{h} ({ext}) -> {out_path}")

doc.close()
print("Done extracting page 4 images!")
