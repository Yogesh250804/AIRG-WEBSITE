import shutil
import os

src = r"C:\Users\DELL\.gemini\antigravity-ide\brain\5c7dbb00-5e35-49e4-894f-69d843d913f2\bharat_ai_server_1783511274520.png"
dest = r"y:\PROJECTS\AIG-WEBSITE\public\extracted-images\bharat_ai_server.png"

try:
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    shutil.copy2(src, dest)
    print("SUCCESS")
except Exception as e:
    print("ERROR:", e)
