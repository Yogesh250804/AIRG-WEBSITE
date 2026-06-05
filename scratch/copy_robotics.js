const fs = require('fs');
const path = require('path');

const src = 'C:\\Users\\DELL\\.gemini\\antigravity-ide\\brain\\6f741482-d580-4a00-8e90-8b8634720d01\\robotics_kit_1780643531166.png';
const dest = 'c:\\Users\\DELL\\OneDrive\Desktop\\AIG-WEBSITE\\public\\robotics-kit-v2.png';

console.log('Src exists:', fs.existsSync(src));
if (fs.existsSync(src)) {
  fs.copyFileSync(src, dest);
  console.log('Copied successfully to', dest);
} else {
  console.error('Source does not exist!');
}
