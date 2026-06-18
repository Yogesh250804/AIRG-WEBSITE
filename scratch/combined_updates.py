import os
import shutil
import zipfile
import xml.etree.ElementTree as ET
import re

print("=== STARTING COMBINED UPDATES ===")

# 1. Copy remaining logos
src_logos = r"Y:\PROJECTS\AIG-WEBSITE\logo left"
dest_logos = r"Y:\PROJECTS\AIG-WEBSITE\public\logos"
if os.path.exists(src_logos):
    if not os.path.exists(dest_logos):
        os.makedirs(dest_logos)
    for f in os.listdir(src_logos):
        if f.endswith(('.jpeg', '.jpg', '.webp', '.png')):
            shutil.copy(os.path.join(src_logos, f), os.path.join(dest_logos, 'left_' + f))
            print(f"Copied logo: {f}")
else:
    print("logo left directory not found")

# 2. Extract Team Management page info from PDF
import fitz
pdf_path = r"y:\PROJECTS\AIG-WEBSITE\AIR G INTERNATIONAL PDEA (1).pdf"
if os.path.exists(pdf_path):
    doc = fitz.open(pdf_path)
    print("\n=== EXTRACTING TEAM MANAGEMENT INFO ===")
    for i, page in enumerate(doc):
        text = page.get_text()
        if "team" in text.lower() and ("management" in text.lower() or "innovation" in text.lower() or "board" in text.lower()):
            print(f"--- Page {i+1} ---")
            print(text)
else:
    print("Brochure PDF not found")

# 3. Update Store Prices from Excel
excel_path = r"C:\Users\DELL\Downloads\AIR G Kits pricing.xlsx"
tsx_path = r"Y:\PROJECTS\AIG-WEBSITE\src\components\NewDesignContent.tsx"

if os.path.exists(excel_path):
    def parse_xlsx(path):
        with zipfile.ZipFile(path) as z:
            shared_strings = []
            if 'xl/sharedStrings.xml' in z.namelist():
                ss_data = z.read('xl/sharedStrings.xml')
                root = ET.fromstring(ss_data)
                ns = {'ns': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
                for t in root.findall('.//ns:t', ns):
                    shared_strings.append(t.text)
            
            sheet_data = z.read('xl/worksheets/sheet1.xml')
            root = ET.fromstring(sheet_data)
            ns = {'ns': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
            
            rows = []
            for row in root.findall('.//ns:row', ns):
                row_data = {}
                for col_letter in ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']:
                    row_data[col_letter] = None
                
                for c in row.findall('ns:c', ns):
                    r_val = c.get('r')
                    col_letter = ''.join([char for char in r_val if char.isalpha()])
                    t_val = c.get('t')
                    v_el = c.find('ns:v', ns)
                    val = v_el.text if v_el is not None else None
                    
                    if t_val == 's' and val is not None:
                        val = shared_strings[int(val)]
                    row_data[col_letter] = val
                rows.append(row_data)
            return rows

    rows = parse_xlsx(excel_path)
    projects_prices = {}
    current_project = None
    for r in rows:
        if r['B'] and r['B'].strip():
            current_project = r['B'].strip().lower()
        if r['H'] and r['H'].strip() and current_project:
            val = r['H'].strip()
            try:
                price_num = int(float(val))
                projects_prices[current_project] = price_num
            except Exception:
                pass

    print("\n=== UPDATING STORE PRICES ===")
    with open(tsx_path, 'r', encoding='utf-8') as f:
        content = f.read()

    mapping = {
        "touchless hand dispenser": "Touchless Hand Dispenser Kit",
        "rain detection system": "Rain Detection System Kit",
        "smart dustbin system": "Smart Dustbin System",
        "temperature monitoring system": "Temperature Monitoring System",
        "smart notice board": "Smart Notice Board",
        "smart traffic light system": "Smart Traffic Light System",
        "soil moisture monitoring system": "Soil Moisture Monitoring System",
        "smart parking system": "Smart Parking System",
        "motion detection alert system": "Motion Detection Alert System",
        "gas leakage detection system": "Gas Leakage Detection System",
        "automatic street light system": "Automatic Street Light System",
        "water level indicator kit": "Water Level Indicator Kit",
        "air g polo t-shirt": "AIR G Polo T-Shirt",
        "air g keychain": "AIR G Keychain",
        "advanced sensor pack": "Advanced Sensor Pack"
    }

    updated_count = 0
    for excel_name, store_name in mapping.items():
        matched_price = None
        for k, v in projects_prices.items():
            if k in excel_name or excel_name in k:
                matched_price = v
                break
                
        if matched_price is not None:
            pattern = re.compile(
                rf'(name:\s*["\']{re.escape(store_name)}["\'],\s*price:\s*["\'])₹[0-9,]+(["\'])'
            )
            formatted_price = f"{matched_price:,}"
            new_content, count = pattern.subn(rf'\g<1>₹{formatted_price}\g<2>', content)
            if count > 0:
                content = new_content
                print(f"Updated {store_name} price to Rs. {formatted_price}")
                updated_count += count

    if updated_count > 0:
        with open(tsx_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Saved changes to {tsx_path} ({updated_count} prices updated)")
    else:
        print("No updates made")
else:
    print("Excel file not found for updates")
