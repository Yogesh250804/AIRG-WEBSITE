import fitz

doc = fitz.open("Y:\\PROJECTS\\AIG-WEBSITE\\AIR G INTERNATIONAL PDEA.pdf")
print("PAGE 11 TEXT:")
print(doc[10].get_text())

print("\nPAGE 12 TEXT:")
print(doc[11].get_text())
