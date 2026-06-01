const fs = require('fs');
const path = require('path');

const source = 'C:\\Users\\DELL\\.gemini\\antigravity-ide\\brain\\18fe1d0a-44ba-41be-838a-0d666cff3503\\media__1779864998229.png';
const dest = path.join(__dirname, '..', 'public', 'logo.png');

try {
  fs.copyFileSync(source, dest);
  console.log('Logo copied successfully!');
} catch (err) {
  console.error('Error copying logo:', err);
}
