import pdfImgConvert from 'pdf-img-convert';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pdfPath = "C:\\Users\\sh4rp\\Downloads\\AIRG-WEBSITE-main\\AIR G INTERNATIONAL PDEA.pdf";
const outputDir = path.join(__dirname, 'public', 'logos');

async function main() {
  console.log("Rendering page 5 of PDF at high resolution...");
  const pdfImages = await pdfImgConvert.convert(pdfPath, {
    page_numbers: [5],
    width: 3000
  });

  const page5ImageBuffer = pdfImages[0];
  const page5Path = path.join(outputDir, 'page5_highres.png');
  fs.writeFileSync(page5Path, page5ImageBuffer);
  console.log("Page 5 rendered to page5_highres.png successfully.");

  const metadata = await sharp(page5Path).metadata();
  console.log(`Page dimensions: ${metadata.width} x ${metadata.height}`);
  
  // Symbiosis SCEI (approx 2nd column)
  const sceiCrop = {
    left: Math.round(metadata.width * 0.32),
    top: Math.round(metadata.height * 0.32),
    width: Math.round(metadata.width * 0.14),
    height: Math.round(metadata.height * 0.23)
  };

  // Pratham (approx 3rd column)
  const prathamCrop = {
    left: Math.round(metadata.width * 0.49),
    top: Math.round(metadata.height * 0.32),
    width: Math.round(metadata.width * 0.12),
    height: Math.round(metadata.height * 0.23)
  };

  console.log("Cropping Symbiosis SCEI...");
  await sharp(page5Path)
    .extract(sceiCrop)
    .png()
    .toFile(path.join(outputDir, 'scei_cropped.png'));

  console.log("Cropping Pratham...");
  await sharp(page5Path)
    .extract(prathamCrop)
    .png()
    .toFile(path.join(outputDir, 'pratham_cropped.png'));

  console.log("Crops completed successfully!");
}

main().catch(console.error);
