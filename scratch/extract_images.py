import fitz # PyMuPDF
import os

pdf_path = "Y:\\PROJECTS\\AIG-WEBSITE\\AIR G INTERNATIONAL PDEA.pdf"
output_dir = "Y:\\PROJECTS\\AIG-WEBSITE\\public\\extracted-members"

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

doc = fitz.open(pdf_path)
print(f"Total pages: {len(doc)}")

image_count = 0
for page_num in range(len(doc)):
    page = doc[page_num]
    image_list = page.get_images(full=True)
    print(f"Page {page_num + 1} has {len(image_list)} images")
    
    for img_idx, img in enumerate(image_list):
        xref = img[0]
        try:
            pix = fitz.Pixmap(doc, xref)
            
            # If it's CMYK or other formats, convert to RGB first
            if pix.n - pix.alpha > 3:
                pix1 = fitz.Pixmap(fitz.csRGB, pix)
                img_name = f"page_{page_num+1}_img_{img_idx+1}_{xref}.png"
                pix1.save(os.path.join(output_dir, img_name))
                pix1 = None
            else:
                img_name = f"page_{page_num+1}_img_{img_idx+1}_{xref}.png"
                pix.save(os.path.join(output_dir, img_name))
            
            pix = None
            image_count += 1
            print(f"  Extracted: {img_name}")
        except Exception as e:
            print(f"  Error extracting image {xref}: {e}")

print(f"Extraction completed. Total images extracted: {image_count}")
