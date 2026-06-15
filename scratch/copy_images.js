const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\DELL\\Downloads';
const destDir = path.join(__dirname, '..', 'public', 'products');

const files = [
  'WhatsApp Image 2026-06-09 at 12.36.05 PM.jpeg',
  'WhatsApp Image 2026-06-09 at 12.36.05 PM (1).jpeg',
  'WhatsApp Image 2026-06-09 at 12.36.05 PM (2).jpeg',
  'WhatsApp Image 2026-06-09 at 12.36.05 PM (3).jpeg',
  'WhatsApp Image 2026-06-09 at 12.36.06 PM.jpeg',
  'WhatsApp Image 2026-06-09 at 12.36.06 PM (1).jpeg',
  'WhatsApp Image 2026-06-09 at 12.36.06 PM (2).jpeg',
  'WhatsApp Image 2026-06-09 at 12.36.06 PM (3).jpeg',
  'WhatsApp Image 2026-06-09 at 12.36.07 PM.jpeg',
  'WhatsApp Image 2026-06-09 at 12.36.07 PM (1).jpeg',
  'WhatsApp Image 2026-06-09 at 12.36.07 PM (2).jpeg',
  'WhatsApp Image 2026-06-09 at 12.36.07 PM (3).jpeg',
  'WhatsApp Image 2026-06-09 at 12.36.08 PM.jpeg',
  'WhatsApp Image 2026-06-09 at 12.36.08 PM (1).jpeg',
  'WhatsApp Image 2026-06-09 at 12.36.08 PM (2).jpeg'
];

if (!fs.existsSync(destDir)){
    fs.mkdirSync(destDir, { recursive: true });
}

files.forEach((file, index) => {
  const srcPath = path.join(srcDir, file);
  const destPath = path.join(destDir, `product_${index + 1}.jpeg`);
  try {
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied ${file} to product_${index + 1}.jpeg`);
    } else {
      console.error(`Source file not found: ${srcPath}`);
    }
  } catch (err) {
    console.error(`Error copying ${file}:`, err);
  }
});
