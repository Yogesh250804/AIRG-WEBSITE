import shutil
import os

src = r"Y:\PROJECTS\AIG-WEBSITE\logo left"
dest = r"Y:\PROJECTS\AIG-WEBSITE\public\logos"

if not os.path.exists(dest):
    os.makedirs(dest)

for f in os.listdir(src):
    if f.endswith(('.jpeg', '.jpg', '.webp', '.png')):
        shutil.copy(os.path.join(src, f), os.path.join(dest, 'left_' + f))
        print(f"Copied {f}")
