import fitz

doc = fitz.open("Y:\\PROJECTS\\AIG-WEBSITE\\AIR G INTERNATIONAL PDEA.pdf")
page = doc[10]

# Print detailed text spans with their coordinates
for block in page.get_text("dict")["blocks"]:
    if "lines" in block:
        for line in block["lines"]:
            for span in line["spans"]:
                print(f"'{span['text']}' at ({span['bbox'][0]:.1f}, {span['bbox'][1]:.1f})")
