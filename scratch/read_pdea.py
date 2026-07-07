import fitz
import sys

try:
    doc = fitz.open("y:\\PROJECTS\\AIG-WEBSITE\\AIR G INTERNATIONAL PDEA.pdf")
    with open("y:\\PROJECTS\\AIG-WEBSITE\\scratch\\pdea_extracted_text.txt", "w", encoding="utf-8") as f:
        for page_num in range(len(doc)):
            text = doc[page_num].get_text()
            f.write(f"--- PAGE {page_num + 1} ---\n")
            f.write(text)
            f.write("\n\n")
    print("Success: Extracted PDF text to scratch/pdea_extracted_text.txt")
except Exception as e:
    print(f"Error: {e}")
