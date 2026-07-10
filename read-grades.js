const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

const grades = [1, 2, 5];

async function run() {
  for (const grade of grades) {
    const pdfPath = path.join(__dirname, 'public', 'class', `Grade ${grade} Book.pdf`);
    if (!fs.existsSync(pdfPath)) {
      console.log(`Grade ${grade} PDF not found at:`, pdfPath);
      continue;
    }
    const dataBuffer = fs.readFileSync(pdfPath);
    // Parse only first 1 page
    const data = await pdf(dataBuffer, { max: 1 });
    console.log(`\n=== GRADE ${grade} BOOK TEXT ===`);
    console.log(data.text.trim().substring(0, 1000));
  }
}

run().catch(console.error);
