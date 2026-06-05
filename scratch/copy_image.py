import shutil
import os

src = r"C:\Users\DELL\.gemini\antigravity-ide\brain\6f741482-d580-4a00-8e90-8b8634720d01\robotics_kit_1780643531166.png"
dest = r"c:\Users\DELL\OneDrive\Desktop\AIG-WEBSITE\public\robotics-kit-v2.png"

print("Src exists:", os.path.exists(src))
if os.path.exists(src):
    shutil.copy(src, dest)
    print("Copied successfully to", dest)
else:
    print("Source not found")
