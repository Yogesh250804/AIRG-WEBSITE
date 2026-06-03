import os
import sys

def main():
    pdf_path = "C:\\Users\\DELL\\Downloads\\NAME and info.pdf"
    output_path = "scratch/pdf_text.txt"
    if not os.path.exists(pdf_path):
        print("PDF not found")
        return

    # Attempt to load fitz first since it threw the error
    try:
        import fitz
        doc = fitz.open(pdf_path)
        with open(output_path, "w", encoding="utf-8") as f:
            for i, page in enumerate(doc):
                f.write(f"--- Page {i+1} ---\n")
                f.write(page.get_text() + "\n")
        print("Successfully wrote PDF text to scratch/pdf_text.txt using fitz")
        return
    except Exception as e:
        print("fitz failed, trying pypdf:", e)

    try:
        import pypdf
        reader = pypdf.PdfReader(pdf_path)
        with open(output_path, "w", encoding="utf-8") as f:
            for i, page in enumerate(reader.pages):
                f.write(f"--- Page {i+1} ---\n")
                f.write(page.extract_text() + "\n")
        print("Successfully wrote PDF text to scratch/pdf_text.txt using pypdf")
        return
    except Exception as e:
        print("pypdf failed:", e)

if __name__ == "__main__":
    main()
