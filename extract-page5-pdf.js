const fs = require('fs');
const path = require('path');
const { PDFDocument } = require('pdf-lib');

const pdfPath = "C:\\Users\\sh4rp\\Downloads\\AIRG-WEBSITE-main\\AIR G INTERNATIONAL PDEA.pdf";
const outPdfPath = "C:\\Users\\sh4rp\\Downloads\\AIRG-WEBSITE-main\\AIRG-WEBSITE\\public\\logos\\page5.pdf";

async function main() {
  console.log("Reading full PDF...");
  const pdfBytes = fs.readFileSync(pdfPath);
  const srcDoc = await PDFDocument.load(pdfBytes);
  
  console.log("Creating page 5 sub-document...");
  const subDoc = await PDFDocument.create();
  const [copiedPage] = await subDoc.copyPages(srcDoc, [4]); // Page 5 index is 4
  subDoc.addPage(copiedPage);

  const subPdfBytes = await subDoc.save();
  fs.writeFileSync(outPdfPath, subPdfBytes);
  console.log("Successfully extracted page 5 to public/logos/page5.pdf!");
}

main().catch(console.error);
