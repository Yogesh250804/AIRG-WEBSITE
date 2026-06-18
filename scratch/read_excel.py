import zipfile
import xml.etree.ElementTree as ET
import os

excel_path = r"C:\Users\DELL\Downloads\AIR G Kits pricing.xlsx"

if not os.path.exists(excel_path):
    print("Excel file not found")
    exit(1)

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
            # Create a full dictionary from A to H for each row
            row_data = {}
            for col_letter in ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']:
                row_data[col_letter] = None
            
            for c in row.findall('ns:c', ns):
                r_val = c.get('r')
                # Extract column letter (e.g. A from A6, H from H11)
                col_letter = ''.join([char for char in r_val if char.isalpha()])
                t_val = c.get('t')
                v_el = c.find('ns:v', ns)
                val = v_el.text if v_el is not None else None
                
                if t_val == 's' and val is not None:
                    val = shared_strings[int(val)]
                row_data[col_letter] = val
            rows.append((row.get('r'), row_data))
        return rows

try:
    data = parse_xlsx(excel_path)
    for r_num, r_data in data:
        # Check if row has any non-none data
        if any(r_data.values()):
            print(f"Row {r_num}: {r_data}")
except Exception as e:
    print("Failed parsing:", e)
