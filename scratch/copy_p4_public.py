import os
import shutil

src_dir = r"y:\PROJECTS\AIG-WEBSITE\scratch\pmo_all_extracted"
dest_dir = r"y:\PROJECTS\AIG-WEBSITE\public\extracted-images"
os.makedirs(dest_dir, exist_ok=True)

# List of files we want to copy
files_to_copy = [
    "page_4_img_1_xref_254.jpeg",
    "page_4_img_2_xref_257.jpeg",
    "page_4_img_3_xref_281.png",
    "page_4_img_4_xref_284.jpeg",
    "page_4_img_5_xref_287.png",
    "page_4_img_6_xref_310.jpeg",
    "page_5_img_0_xref_165.jpeg",
    "page_5_img_1_xref_320.jpeg",
    "page_6_img_0_xref_170.jpeg"
]

for filename in files_to_copy:
    src_path = os.path.join(src_dir, filename)
    if os.path.exists(src_path):
        dest_path = os.path.join(dest_dir, filename)
        shutil.copyfile(src_path, dest_path)
        print(f"Copied {filename} to {dest_path}")
    else:
        print(f"File not found: {filename}")
