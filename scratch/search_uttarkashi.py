import os
for root, dirs, files in os.walk('.'):
    if '.next' in root or 'node_modules' in root or '.git' in root:
        continue
    for file in files:
        if file.endswith('.txt') or file.endswith('.js') or file.endswith('.json') or file.endswith('.tsx') or file.endswith('.ts') or file.endswith('.html') or file.endswith('.doc'):
            path = os.path.join(root, file)
            try:
                with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                    if 'Uttarkashi' in content or 'Dehradun' in content or 'Pithoragarh' in content:
                        print('Found matching content in:', path)
            except Exception as e:
                pass
