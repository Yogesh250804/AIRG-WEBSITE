import os
import fitz

pdf_path = r"y:\PROJECTS\AIG-WEBSITE\Copy of PMO, Delhi.pdf"
extract_dir = r"y:\PROJECTS\AIG-WEBSITE\scratch\pmo_all_extracted"
os.makedirs(extract_dir, exist_ok=True)

doc = fitz.open(pdf_path)
for page_idx in range(len(doc)):
    page = doc[page_idx]
    images = page.get_images(full=True)
    print(f"Page {page_idx + 1} has {len(images)} images.")
    for img_idx, img_info in enumerate(images):
        xref = img_info[0]
        base_image = doc.extract_image(xref)
        image_bytes = base_image["image"]
        ext = base_image["ext"]
        
        out_name = f"page_{page_idx + 1}_img_{img_idx}_xref_{xref}.{ext}"
        out_path = os.path.join(extract_dir, out_name)
        with open(out_path, "wb") as f:
            f.write(image_bytes)
        print(f"  Extracted: {out_name}")

doc.close()
print("All images extracted successfully!")
