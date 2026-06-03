const fs = require('fs');
const path = require('path');

const source = 'C:\\Users\\DELL\\.gemini\\antigravity-ide\\brain\\60c256a9-f82d-4198-b876-a7af683d2ee9\\media__1780468584702.png';
const dest = path.join(__dirname, '..', 'public', 'kenya-founder.png');

try {
  fs.copyFileSync(source, dest);
  console.log('Founder image copied successfully!');
} catch (err) {
  console.error('Error copying founder image:', err);
}
