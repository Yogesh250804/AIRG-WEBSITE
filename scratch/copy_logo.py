import shutil
source = r"C:\Users\DELL\.gemini\antigravity-ide\brain\18fe1d0a-44ba-41be-838a-0d666cff3503\media__1779864998229.png"
dest = r"c:\Users\DELL\OneDrive\Desktop\AIG-WEBSITE\public\logo.png"
try:
    shutil.copy2(source, dest)
    print("Logo copied successfully via python!")
except Exception as e:
    print("Error:", e)
