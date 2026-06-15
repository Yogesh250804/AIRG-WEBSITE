import os
import shutil

brain_dir = r"C:\Users\DELL\.gemini\antigravity-ide\brain\21cf3e04-826c-4d08-b6cf-7cfdbf54558c"
public_logos_dir = r"c:\Users\DELL\OneDrive\Desktop\AIG-WEBSITE\public\logos"

mapping = {
    "media__1781520172028.png": "symbiosis.png",
    "media__1781520313670.png": "maha60.png",
    "media__1781520369203.png": "sharjah.png",
    "media__1781520386739.png": "unesco.png",
    "media__1781520449591.png": "mitadt.png",
    "media__1781520485596.png": "dyp.png"
}

os.makedirs(public_logos_dir, exist_ok=True)

for src_name, dest_name in mapping.items():
    src_path = os.path.join(brain_dir, src_name)
    dest_path = os.path.join(public_logos_dir, dest_name)
    if os.path.exists(src_path):
        shutil.copy2(src_path, dest_path)
        print(f"Copied {src_name} -> {dest_name}")
    else:
        print(f"Source file not found: {src_path}")

# Copy MoE logo from Downloads
downloads_moe = r"C:\Users\DELL\Downloads\mod_logo_1781075519780.png"
if os.path.exists(downloads_moe):
    dest_path = os.path.join(public_logos_dir, "moe.png")
    shutil.copy2(downloads_moe, dest_path)
    print(f"Copied MoE logo from Downloads: {dest_path}")
else:
    print(f"MoE logo not found at {downloads_moe}")
