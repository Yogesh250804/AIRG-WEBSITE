import urllib.request
from PIL import Image

url = 'https://gurujiair.com/wp-content/uploads/2023/04/WhatsApp-Image-2023-03-28-at-1.01.02-PM.jpeg'
output_path = 'exhibition.jpg'

try:
    print("Downloading image...")
    urllib.request.urlretrieve(url, output_path)
    img = Image.open(output_path)
    print(f"Original size: {img.size}, format: {img.format}")
    
    # Let's crop it to 21:9 or 16:9 to match the format
    # The format of the other image (autonomous drone navigation) is 800x381 (Unsplash aspect ratio ~2.1)
    # Let's crop it to 21:9 aspect ratio or similar.
    w, h = img.size
    target_aspect = 21 / 9 # 2.33
    current_aspect = w / h
    
    if current_aspect > target_aspect:
        # Image is wider than 21:9 - crop horizontally
        new_w = int(h * target_aspect)
        offset = (w - new_w) // 2
        img_cropped = img.crop((offset, 0, offset + new_w, h))
    else:
        # Image is taller than 21:9 - crop vertically
        # Usually, the main action is in the middle-top or middle.
        new_h = int(w / target_aspect)
        # We can crop from center/top
        offset = (h - new_h) // 3  # Shift slightly up to keep heads/faces in view
        if offset < 0:
            offset = 0
        img_cropped = img.crop((0, offset, w, offset + new_h))
        
    print(f"Cropped size: {img_cropped.size}")
    img_cropped.save('c:/Users/DELL/OneDrive/Desktop/AIG-WEBSITE/public/exhibition-display.jpg', 'JPEG', quality=95)
    print("Saved to public/exhibition-display.jpg")
except Exception as e:
    print("Error:", e)
