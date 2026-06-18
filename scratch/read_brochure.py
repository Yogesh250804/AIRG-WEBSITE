import fitz
import os

pdf_path = r"y:\PROJECTS\AIG-WEBSITE\AIR G INTERNATIONAL PDEA (1).pdf"
output_path = r"scratch/brochure_text.txt"

if not os.path.exists(pdf_path):
    print("PDF not found")
    exit(1)

try:
    doc = fitz.open(pdf_path)
    with open(output_path, "w", encoding="utf-8") as f:
        for i, page in enumerate(doc):
            text = page.get_text()
            if "team" in text.lower() or "management" in text.lower() or "innovation" in text.lower():
                f.write(f"--- Page {i+1} ---\n")
                f.write(text + "\n")
    print(f"Done, filtered pages written to {output_path}")
except Exception as e:
    print("Failed with fitz:", e)
