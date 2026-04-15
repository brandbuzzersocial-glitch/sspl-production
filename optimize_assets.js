const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const publicDir = path.join(__dirname, 'public');
const imagesDir = path.join(publicDir, 'images');

(async () => {
  console.log('Starting image conversion...');
  const files = fs.readdirSync(imagesDir);

  for (const file of files) {
    if (file.match(/\.(png|jpe?g)$/i)) {
      const isFavicon = file.includes('favicon'); 
      // Often better to keep favicon as .jpg/.png/.ico for widespread browser support, but we can convert it too if we want, let's skip favicon.jpg just to be safe.
      if (isFavicon) continue;

      const inputPath = path.join(imagesDir, file);
      const parsed = path.parse(file);
      const outputPath = path.join(imagesDir, `${parsed.name}.webp`);

      try {
        await sharp(inputPath)
          .webp({ quality: 80 })
          .toFile(outputPath);
        
        fs.unlinkSync(inputPath); // Delete old image
        console.log(`Converted and removed: ${file}`);
      } catch (err) {
        console.error(`Failed on ${file}:`, err);
      }
    }
  }

  console.log('Images converted to WebP successfully.');

  console.log('Updating HTML references...');
  const htmlFiles = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

  htmlFiles.forEach(file => {
    const filePath = path.join(publicDir, file);
    let html = fs.readFileSync(filePath, 'utf-8');

    // Only replace references that are not favicon.jpg
    // Fast global replace with negative lookahead or explicit replacements:
    let newHtml = html
      .replace(/(?<!favicon)\.png/g, '.webp')
      .replace(/(?<!favicon)\.jpg/g, '.webp')
      .replace(/(?<!favicon)\.jpeg/g, '.webp');

    if (html !== newHtml) {
      fs.writeFileSync(filePath, newHtml, 'utf-8');
      console.log(`Updated image links in: ${file}`);
    }
  });
  
  console.log('Optimization complete!');
})();
