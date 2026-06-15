import os

output_dir = r"c:\Users\DELL\OneDrive\Desktop\AIG-WEBSITE\public\logos"

# Sequentially map the images based on standard order of appearance in the PDF pages
page4_mapping = [
    "moe",        # 1. Ministry of Education
    "symbiosis",  # 2. SYMBIOSIS
    "maha60",     # 3. maha60
    "sharjah",    # 4. Sharjah Tech Park
    "unesco",     # 5. UNESCO
    "atal",       # 6. Atal Incubation Centre
    "azure",      # 7. Microsoft Azure
    "fisa",       # 8. FISA
    "iic",        # 9. Institution's Innovation Council
    "mitadt",     # 10. MIT-ADT University
    "western",    # 11. WESTERN
    "sidtm",      # 12. SIDTM
    "dyp"         # 13. DYP
]

page5_mapping = [
    "birla",      # 1. Aditya Birla Birla Carbon
    "scei",       # 2. Symbiosis SCEI
    "pratham",    # 3. Pratham
    "cummins",    # 4. Cummins
    "kenskyora",  # 5. Kens Kyora
    "pdea",       # 6. PDEA
    "varhad",     # 7. The Varhad Group
    "mitcon",     # 8. MITCON
    "greentech"   # 9. Green circular logo
]

print("Renaming extracted logos to match website configuration...")

# Process Page 4 images
p4_files = sorted([f for f in os.listdir(output_dir) if f.startswith("extracted_p4_")])
for idx, filename in enumerate(p4_files):
    if idx < len(page4_mapping):
        ext = os.path.splitext(filename)[1]
        new_name = f"{page4_mapping[idx]}{ext}"
        src = os.path.join(output_dir, filename)
        dst = os.path.join(output_dir, new_name)
        if os.path.exists(src):
            if os.path.exists(dst):
                os.remove(dst)
            os.rename(src, dst)
            print(f"Renamed: {filename} -> {new_name}")

# Process Page 5 images
p5_files = sorted([f for f in os.listdir(output_dir) if f.startswith("extracted_p5_")])
for idx, filename in enumerate(p5_files):
    if idx < len(page5_mapping):
        ext = os.path.splitext(filename)[1]
        new_name = f"{page5_mapping[idx]}{ext}"
        src = os.path.join(output_dir, filename)
        dst = os.path.join(output_dir, new_name)
        if os.path.exists(src):
            if os.path.exists(dst):
                os.remove(dst)
            os.rename(src, dst)
            print(f"Renamed: {filename} -> {new_name}")

print("Renaming completed successfully!")
