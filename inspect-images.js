const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public', 'logos');
if (!fs.existsSync(dir)) {
  console.log('Directory does not exist:', dir);
  process.exit(1);
}

fs.readdirSync(dir).forEach(file => {
  const filePath = path.join(dir, file);
  const stats = fs.statSync(filePath);
  if (stats.isFile()) {
    console.log(`${file}: ${stats.size} bytes`);
  }
});
