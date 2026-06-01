import subprocess
import os

repo_url = "https://github.com/Yogesh250804/My-Portfolio.git"
clone_dir = "scratch/portfolio-clone"

if not os.path.exists(clone_dir):
    print(f"Cloning {repo_url}...")
    subprocess.run(["git", "clone", repo_url, clone_dir])
else:
    print("Clone directory already exists.")

# Inspect files to find loader/animation
loader_files = []
for root, dirs, files in os.walk(clone_dir):
    if '.git' in root:
        continue
    for file in files:
        if any(term in file.lower() for term in ['load', 'intro', 'anim', 'splash', 'welcome', 'logo', 'preloader']):
            loader_files.append(os.path.join(root, file))

print("Found potential loader files:")
for f in loader_files[:10]:
    print(f)

# Also list top-level files
print("Top-level items:")
if os.path.exists(clone_dir):
    print(os.listdir(clone_dir))
