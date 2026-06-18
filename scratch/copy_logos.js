const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\DELL\\.gemini\\antigravity-ide\\brain\\a0bfeb3a-a348-45dd-8c55-5a291ce3eed9';
const destDir = 'y:\\PROJECTS\\AIG-WEBSITE\\public\\logos';

const filesToCopy = [
  { src: 'media__1781677446304.png', dest: 'left_6.jpg' },
  { src: 'media__1781672993853.png', dest: 'logo_added_1.png' },
  { src: 'media__1781673060928.png', dest: 'logo_added_2.png' },
  { src: 'media__1781673088110.png', dest: 'logo_added_3.png' },
  { src: 'media__1781673131345.png', dest: 'logo_added_4.png' }
];

filesToCopy.forEach(f => {
  const srcPath = path.join(srcDir, f.src);
  const destPath = path.join(destDir, f.dest);
  
  if (fs.existsSync(srcPath)) {
    try {
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied ${f.src} to ${f.dest}`);
    } catch (err) {
      console.error(`Error copying ${f.src}:`, err.message);
    }
  } else {
    console.warn(`Source file not found: ${srcPath}`);
  }
});
