const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, '../public/extracted-members');
const files = fs.readdirSync(dirPath).filter(file => file.endsWith('.png'));

let html = `
<!DOCTYPE html>
<html>
<head>
  <title>Extracted Images Viewer</title>
  <style>
    body { font-family: sans-serif; background: #f0f0f0; margin: 20px; }
    h1 { color: #333; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; }
    .card { background: white; border: 1px solid #ccc; border-radius: 8px; padding: 10px; text-align: center; }
    .card img { max-width: 100%; max-height: 200px; object-fit: contain; }
    .filename { font-size: 12px; margin-top: 10px; word-break: break-all; font-weight: bold; }
  </style>
</head>
<body>
  <h1>Extracted Images from PDF</h1>
  <div class="grid">
`;

files.forEach(file => {
  html += `
    <div class="card">
      <img src="/extracted-members/${file}" />
      <div class="filename">${file}</div>
    </div>
  `;
});

html += `
  </div>
</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, '../public/extracted-view.html'), html);
console.log("Created public/extracted-view.html successfully.");
