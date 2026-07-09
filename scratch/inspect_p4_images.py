import os
from PIL import Image

dir_path = r"y:\PROJECTS\AIG-WEBSITE\scratch\pmo_extracted"
files = [f for f in os.listdir(dir_path) if f.startswith("page4_img_")]

out_lines = []
for f in sorted(files):
    p = os.path.join(dir_path, f)
    img = Image.open(p)
    out_lines.append(f"{f}: {img.size[0]}x{img.size[1]} (mode: {img.mode})")

out_text = "\n".join(out_lines)
print(out_text)

with open(r"y:\PROJECTS\AIG-WEBSITE\scratch\p4_dims.txt", "w") as f_out:
    f_out.write(out_text)
