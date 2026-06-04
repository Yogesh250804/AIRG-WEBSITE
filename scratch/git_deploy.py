import subprocess
import os

def run_cmd(cmd, cwd=None):
    print(f"Running: {cmd}")
    res = subprocess.run(cmd, shell=True, capture_output=True, text=True, cwd=cwd)
    print("STDOUT:")
    print(res.stdout)
    if res.stderr:
        print("STDERR:")
        print(res.stderr)
    return res.returncode

# Workspace directory
workspace = r"c:\Users\DELL\OneDrive\Desktop\AIG-WEBSITE"

print("--- Git Status ---")
run_cmd("git status", workspace)

print("--- Git Add ---")
run_cmd("git add -A", workspace)

print("--- Git Commit ---")
run_cmd('git commit -m "Update Careers page with official Google Forms and remove demo timestamps"', workspace)

print("--- Git Push ---")
run_cmd("git push", workspace)

print("--- Vercel Deploy ---")
# Check if vercel CLI is installed/available
run_cmd("vercel --version")
# Deploy to vercel
run_cmd("vercel --prod --yes", workspace)
