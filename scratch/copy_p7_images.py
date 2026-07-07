import os
import shutil

src_dir = "Y:\\PROJECTS\\AIG-WEBSITE\\public\\extracted-members"
dest_dir = "Y:\\PROJECTS\\AIG-WEBSITE\\public\\hubs"

if not os.path.exists(dest_dir):
    os.makedirs(dest_dir)

files = os.listdir(src_dir)
p7_files = [f for f in files if f.startswith("page_7_")]

for f in p7_files:
    shutil.copy(os.path.join(src_dir, f), os.path.join(dest_dir, f))
    print(f"Copied {f} to public/hubs/")
