import fitz

doc = fitz.open("Y:\\PROJECTS\\AIG-WEBSITE\\AIR G INTERNATIONAL PDEA.pdf")
names = ["Haggai", "Yassin", "Aniket", "Murhib", "Pawar", "Chubado", "Alahmar", "Mosses"]

for page_num in range(len(doc)):
    text = doc[page_num].get_text()
    for name in names:
        if name.lower() in text.lower():
            print(f"Page {page_num+1} contains '{name}'")
