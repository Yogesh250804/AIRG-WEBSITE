import fitz
import sys
sys.stdout.reconfigure(encoding='utf-8')

doc = fitz.open("Y:\\PROJECTS\\AIG-WEBSITE\\AIR G INTERNATIONAL PDEA (1).pdf")
for page_num in range(len(doc)):
    text = doc[page_num].get_text()
    print(f"--- PAGE {page_num + 1} ---")
    print(text)
