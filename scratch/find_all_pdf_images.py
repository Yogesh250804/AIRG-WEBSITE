import fitz

doc = fitz.open(r"y:\PROJECTS\AIG-WEBSITE\Copy of PMO, Delhi.pdf")
for page_idx in range(len(doc)):
    page = doc[page_idx]
    images = page.get_images(full=True)
    print(f"Page {page_idx + 1} has {len(images)} images:")
    for img_idx, img_info in enumerate(images):
        xref = img_info[0]
        base_image = doc.extract_image(xref)
        print(f"  Img {img_idx}: xref={xref}, size={base_image['width']}x{base_image['height']}, ext={base_image['ext']}")
doc.close()
