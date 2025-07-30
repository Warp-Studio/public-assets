import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const inputDir = './input';
const outputDir = './output';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

const compressImage = async (filePath, fileName) => {
  const outputFileName = path.basename(fileName, path.extname(fileName)) + '.webp';
  const outputPath = path.join(outputDir, outputFileName);

  try {
    const compressedBuffer = await sharp(filePath)
      .toFormat('webp')
      .resize({ width: 1440, withoutEnlargement: true })
      .toBuffer();

    fs.writeFileSync(outputPath, compressedBuffer);
    console.log(`✅ Compressed: ${fileName} → ${outputFileName}`);
  } catch (error) {
    console.error(`❌ Failed to compress ${fileName}:`, error.message);
  }
};

const files = fs.readdirSync(inputDir);

for (const file of files) {
  const ext = path.extname(file).toLowerCase();
  if (['.jpg', '.jpeg', '.png'].includes(ext)) {
    const filePath = path.join(inputDir, file);
    await compressImage(filePath, file);
  }
}
