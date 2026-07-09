import zipfile
import os
import fitz  # PyMuPDF

pdf_path = r"y:\PROJECTS\AIG-WEBSITE\Copy of PMO, Delhi.pdf"
extract_dir = r"y:\PROJECTS\AIG-WEBSITE\scratch\pmo_extracted"

os.makedirs(extract_dir, exist_ok=True)

if os.path.exists(pdf_path):
    print("Found PDF:", pdf_path)
    
    doc = fitz.open(pdf_path)
    print("Total pages:", len(doc))
    
    # Page 2 is index 1 (0-based)
    page = doc[1]
    image_list = page.get_images(full=True)
    print(f"Page 2 has {len(image_list)} images")
    
    for img_idx, img in enumerate(image_list):
        xref = img[0]
        base_image = doc.extract_image(xref)
        image_bytes = base_image["image"]
        image_ext = base_image["ext"]
        
        out_name = f"extracted_pmo_page2_img_{img_idx}.{image_ext}"
        out_path = os.path.join(extract_dir, out_name)
        with open(out_path, "wb") as f:
            f.write(image_bytes)
        print(f"Extracted image to: {out_path}")
else:
    print("No PDF file found inside the zip.")
