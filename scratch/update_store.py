import os
import re

try:
    import pypdf
except ImportError:
    print("pypdf is required, installing...")
    import subprocess
    import sys
    subprocess.check_call([sys.executable, "-m", "pip", "install", "pypdf"])
    import pypdf

pdf_dir = r"C:\Users\DELL\Downloads\kits info"
target_file = r"C:\Users\DELL\OneDrive\Desktop\AIG-WEBSITE\src\components\NewDesignContent.tsx"

# Load the list of PDF files
pdf_files = [f for f in os.listdir(pdf_dir) if f.endswith(".pdf")]

# Function to clean and extract first paragraph
def extract_desc(pdf_name):
    pdf_path = os.path.join(pdf_dir, pdf_name)
    try:
        reader = pypdf.PdfReader(pdf_path)
        page = reader.pages[0]
        text = page.extract_text()
        
        lines = text.split("\n")
        desc_lines = []
        capture = False
        for line in lines:
            line_str = line.strip()
            if not line_str:
                continue
            if "Project" in line_str or "Water" in line_str or "Touchless" in line_str or "Automatic" in line_str or "Smart" in line_str or "Bluetooth" in line_str or "Line" in line_str or "Obstacle" in line_str or "Rain" in line_str or "Gas" in line_str or "Soil" in line_str or "Motion" in line_str:
                capture = True
                continue
            if "Objectives" in line_str or "Sr No" in line_str or "Components" in line_str:
                break
            if capture:
                desc_lines.append(line_str)
        
        desc = " ".join(desc_lines).strip()
        desc = re.sub(r'\s+', ' ', desc)
        if len(desc) > 220:
            desc = desc[:217] + "..."
        return desc
    except Exception as e:
        print(f"Error reading {pdf_name}: {e}")
        return ""

# Map names from code to files
def get_best_match(prod_name):
    prod_name_clean = prod_name.lower()
    
    # Custom matches
    if "dispenser" in prod_name_clean:
        return "Touchless Hand Dispenser Kit (2).pdf"
    if "notice" in prod_name_clean:
        return "Smart Notice Board.pdf"
    if "traffic" in prod_name_clean:
        return "Smart Traffic Light System.pdf"
    if "dustbin" in prod_name_clean:
        return "Smart Dustbin System.pdf"
    if "parking" in prod_name_clean:
        return "Smart Parking System.pdf"
    if "irrigation" in prod_name_clean or "moisture" in prod_name_clean or "soil" in prod_name_clean:
        return "Soil Moisture Monitoring System.pdf"
    if "rain" in prod_name_clean:
        return "Rain Detection Syetem Kit.pdf"
    if "gas" in prod_name_clean or "leakage" in prod_name_clean:
        return "Gas Leakage Detection System.pdf"
    if "motion" in prod_name_clean:
        return "Motion Detection Alert System.pdf"
    if "street" in prod_name_clean or "light" in prod_name_clean:
        return "Automatic Street Light System.pdf"
    if "water" in prod_name_clean or "level" in prod_name_clean:
        return "Water Level Indicator Kit.pdf"
    if "obstacle" in prod_name_clean:
        return "Obstacle Avoiding Robot.pdf"
    if "bluetooth" in prod_name_clean:
        return "Bluetooth Controlled Car.pdf"
    if "line" in prod_name_clean:
        return "Line Following Robot.pdf"
        
    return None

if os.path.exists(target_file):
    with open(target_file, "r", encoding="utf-8") as f:
        content = f.read()

    # Regex to find the store mapping array in NewDesignContent.tsx
    # It starts with: `[ { name: "Touchless Hand Dispenser" ...` or similar
    pattern = re.compile(r'(\[\s*\{\s*name:\s*"Touchless Hand Dispenser".*?\}\s*\])', re.DOTALL)
    
    match = pattern.search(content)
    if match:
        arr_str = match.group(1)
        
        # Extract items
        items_pattern = re.compile(r'\{\s*name:\s*"(.*?)",\s*price:\s*"(.*?)",\s*img:\s*"(.*?)",\s*tag:\s*"(.*?)"\s*\}', re.DOTALL)
        items = items_pattern.findall(arr_str)
        
        new_items_str = "[\n"
        for item in items:
            name, price, img, tag = item
            pdf_file = get_best_match(name)
            desc = ""
            if pdf_file:
                desc = extract_desc(pdf_file)
                # If we matched but description extraction failed, set default
                if not desc:
                    desc = f"Advanced modular learning kit for building a {name} using standard microcontrollers and electronic modules."
            else:
                desc = "Exclusive learning kit and high-performance educational resource designed for technical training."
            
            # Clean up the name for the final array to match the PDF if appropriate
            final_name = name
            if pdf_file:
                # Remove '.pdf' and make title case
                final_name = pdf_file.replace(".pdf", "").replace(" (2)", "").replace(" Syetem", " System")
            
            new_items_str += f'                  {{ name: "{final_name}", price: "{price}", img: "{img}", tag: "{tag}", desc: "{desc}" }},\n'
        
        new_items_str = new_items_str.rstrip(",\n") + "\n                ]"
        
        # Replace in content
        updated_content = content.replace(arr_str, new_items_str)
        
        # Also let's update the React rendering block to show the description under the heading
        h4_pattern = '<h4 className="text-lg font-headline font-black text-[#1a1a2e] mb-2 uppercase tracking-tight">{product.name}</h4>'
        h4_replacement = h4_pattern + '\n                      <p className="text-xs text-[#1a1a2e]/55 font-sans mt-1.5 mb-3 line-clamp-3 leading-relaxed min-h-[48px]">{product.desc}</p>'
        
        if h4_pattern in updated_content and '{product.desc}' not in updated_content:
            updated_content = updated_content.replace(h4_pattern, h4_replacement)
            
        with open(target_file, "w", encoding="utf-8") as f:
            f.write(updated_content)
        print("Successfully updated NewDesignContent.tsx store array and JSX layout with PDF descriptions!")
    else:
        print("Could not find the target array in NewDesignContent.tsx.")
else:
    print(f"Target file not found: {target_file}")
