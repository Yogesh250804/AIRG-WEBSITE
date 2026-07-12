const sharp = require('sharp');
const path = require('path');

const logosDir = path.join(__dirname, 'public', 'logos');

async function removeBlackBackground(inputFile, outputFile) {
  const image = sharp(inputFile);
  const { data, info } = await image
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const output = Buffer.from(data);

  for (let i = 0; i < width * height; i++) {
    const r = output[i * channels + 0];
    const g = output[i * channels + 1];
    const b = output[i * channels + 2];
    const brightness = (r + g + b) / 3;
    if (brightness < 30) {
      output[i * channels + 3] = 0;
    } else if (brightness < 60) {
      output[i * channels + 3] = Math.round((brightness - 30) * (255 / 30));
    }
  }

  await sharp(output, {
    raw: { width, height, channels }
  })
    .png()
    .toFile(outputFile);

  console.log('Done:', path.basename(outputFile));
}

async function main() {
  await removeBlackBackground(
    path.join(logosDir, 'extracted_p5_img4.png'),
    path.join(logosDir, 'scei_clean.png')
  );
  await removeBlackBackground(
    path.join(logosDir, 'extracted_p5_img7.png'),
    path.join(logosDir, 'pratham_clean.png')
  );
  console.log('All done!');
}

main().catch(console.error);
