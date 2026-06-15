import os
import fitz  # PyMuPDF

pdf_path = r"C:\Users\DELL\Downloads\AIR G INTERNATIONAL PDEA.pdf"
output_dir = r"c:\Users\DELL\OneDrive\Desktop\AIG-WEBSITE\public\logos"

if not os.path.exists(output_dir):
    os.makedirs(output_dir, exist_ok=True)

doc = fitz.open(pdf_path)

# Page indices are 0-based: Page 4 is index 3, Page 5 is index 4, Page 6 is index 5
target_pages = [3, 4, 5]

print("Extracting images from PDF...")
for page_num in target_pages:
    if page_num >= len(doc):
        continue
    page = doc[page_num]
    image_list = page.get_images(full=True)
    print(f"Page {page_num+1} has {len(image_list)} images")
    
    for img_idx, img_info in enumerate(image_list):
        xref = img_info[0]
        base_image = doc.extract_image(xref)
        image_bytes = base_image["image"]
        image_ext = base_image["ext"]
        
        filename = f"extracted_p{page_num+1}_img{img_idx+1}.{image_ext}"
        filepath = os.path.join(output_dir, filename)
        
        with open(filepath, "wb") as f:
            f.write(image_bytes)
        print(f"Saved: {filename} ({len(image_bytes)} bytes)")
