const fs = require('fs');
const path = require('path');

const src = "C:\\Users\\DELL\\.gemini\\antigravity-ide\\brain\\3cdb48ab-3a89-422e-9bab-8ba893d63a04\\air_lab_about_1783061799646.png";
const dest = path.join(__dirname, "..", "public", "air-lab-about.png");

try {
  fs.copyFileSync(src, dest);
  console.log("SUCCESS: Copied", src, "to", dest);
} catch (err) {
  console.error("ERROR:", err.message);
}
