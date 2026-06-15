import os
import pypdf
import json
import re

pdf_dir = r"C:\Users\DELL\Downloads\kits info"
pdf_files = [f for f in os.listdir(pdf_dir) if f.endswith(".pdf")]

results = {}

for pdf_name in pdf_files:
    pdf_path = os.path.join(pdf_dir, pdf_name)
    try:
        reader = pypdf.PdfReader(pdf_path)
        print(f"\n--- {pdf_name} ({len(reader.pages)} pages) ---")
        
        full_text = ""
        for i, page in enumerate(reader.pages):
            full_text += f"\n--- PAGE {i+1} ---\n" + page.extract_text()
            
        results[pdf_name] = full_text
    except Exception as e:
        print(f"Error reading {pdf_name}: {e}")

# Save the raw text to a JSON file to inspect
output_path = r"C:\Users\DELL\OneDrive\Desktop\AIG-WEBSITE\scratch\extracted_raw_text.json"
with open(output_path, "w", encoding="utf-8") as f:
    json.dump(results, f, indent=2)

print(f"\nDone! Extracted text from {len(results)} PDFs to {output_path}")
