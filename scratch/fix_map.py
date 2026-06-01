import re

filepath = 'src/components/InteractiveIndiaMap.tsx'

with open(filepath, 'r', encoding='utf-8') as file:
    content = file.read()

# Replace the broken style block in regions mapping
pattern = r'const isClickable = region\.isClickable;\s+style=\{\{'
replacement = '''const isClickable = region.isClickable;

                return (
                  <path
                    key={region.id}
                    d={region.path}
                    fill={isHovered ? "url(#state-hover-gradient)" : "rgba(0,0,0,0.04)"}
                    stroke={isHovered ? "#ff4d4d" : "rgba(0,0,0,0.12)"}
                    strokeWidth={isHovered ? "1.5" : "0.5"}
                    style={{'''

if re.search(pattern, content):
    content = re.sub(pattern, replacement, content)
    with open(filepath, 'w', encoding='utf-8') as file:
        file.write(content)
    print("Map file fixed successfully!")
else:
    print("Pattern not found. Checking if already fixed.")
