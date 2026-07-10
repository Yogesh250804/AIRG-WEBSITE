const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

const pdfPath = "C:\\Users\\sh4rp\\Downloads\\AIR G LAB EQUIPMENTS LIST NGO.pdf";
const outputPath = path.join(__dirname, 'scratch', 'pdf_extracted_list.txt');

if (!fs.existsSync(pdfPath)) {
  console.error("PDF file not found at:", pdfPath);
  process.exit(1);
}

const dataBuffer = fs.readFileSync(pdfPath);

pdf(dataBuffer).then(function(data) {
  fs.writeFileSync(outputPath, data.text);
  console.log("Successfully extracted PDF text to scratch/pdf_extracted_list.txt");
  console.log("Length of text:", data.text.length);
}).catch(err => {
  console.error("Error parsing PDF:", err);
});
