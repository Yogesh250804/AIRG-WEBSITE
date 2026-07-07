import os
import sys

pdf_path = r"y:\PROJECTS\AIG-WEBSITE\BHARAT AI ENGINE KENSU KYORA.pdf"
pages_to_extract = [1, 4, 5, 8, 15, 16, 17, 19] # 1-indexed
output_txt = r"y:\PROJECTS\AIG-WEBSITE\scratch\extracted_data.txt"

print("Checking libraries...")

# Try fitz (PyMuPDF) first
try:
    import fitz
    doc = fitz.open(pdf_path)
    
    with open(output_txt, "w", encoding="utf-8") as out:
        out.write("EXTRACTED USING FITZ\n\n")
        for p_num in pages_to_extract:
            if p_num <= len(doc):
                page = doc[p_num - 1]
                out.write(f"--- Page {p_num} ---\n")
                out.write(page.get_text())
                out.write("\n\n")
                
    # Extract images
    os.makedirs(r"y:\PROJECTS\AIG-WEBSITE\public\extracted-images", exist_ok=True)
    for page_index in range(len(doc)):
        page = doc[page_index]
        image_list = page.get_images(full=True)
        for img_index, img in enumerate(image_list):
            xref = img[0]
            base_image = doc.extract_image(xref)
            image_bytes = base_image["image"]
            image_ext = base_image["ext"]
            img_name = f"page_{page_index+1}_img_{img_index+1}_{xref}.{image_ext}"
            img_path = os.path.join(r"y:\PROJECTS\AIG-WEBSITE\public\extracted-images", img_name)
            with open(img_path, "wb") as f:
                f.write(image_bytes)
    print("Success! Data written to scratch/extracted_data.txt and images saved in public/extracted-images")
    sys.exit(0)
except ImportError:
    pass

# Try pypdf
try:
    import pypdf
    reader = pypdf.PdfReader(pdf_path)
    with open(output_txt, "w", encoding="utf-8") as out:
        out.write("EXTRACTED USING PYPDF\n\n")
        for p_num in pages_to_extract:
            if p_num <= len(reader.pages):
                page = reader.pages[p_num - 1]
                out.write(f"--- Page {p_num} ---\n")
                out.write(page.extract_text() or "")
                out.write("\n\n")
                
    os.makedirs(r"y:\PROJECTS\AIG-WEBSITE\public\extracted-images", exist_ok=True)
    for page_index, page in enumerate(reader.pages):
        for count, image_file_object in enumerate(page.images):
            img_name = f"page_{page_index+1}_img_{count+1}.png"
            img_path = os.path.join(r"y:\PROJECTS\AIG-WEBSITE\public\extracted-images", img_name)
            with open(img_path, "wb") as fp:
                fp.write(image_file_object.data)
    print("Success! Data written to scratch/extracted_data.txt and images saved in public/extracted-images")
    sys.exit(0)
except ImportError:
    pass

print("No suitable PDF library found. Please pip install pypdf or PyMuPDF")
