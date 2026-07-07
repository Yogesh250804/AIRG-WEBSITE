import sys

packages = ['fitz', 'pdfplumber', 'pypdf', 'pdf2image', 'PIL', 'openpyxl', 'pandas']
for pkg in packages:
    try:
        __import__(pkg)
        print(f"{pkg}: installed")
    except ImportError:
        print(f"{pkg}: NOT installed")
