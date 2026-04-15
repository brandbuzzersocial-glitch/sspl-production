const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const publicDir = path.join(__dirname, 'public');
const partnersDir = path.join(publicDir, 'images', 'partners');

(async () => {
  console.log('Converting partner images to WebP...');
  const files = fs.readdirSync(partnersDir);

  for (const file of files) {
    // Skip already-converted webp files
    if (file.toLowerCase().endsWith('.webp')) {
      console.log('Already WebP, skipping: ' + file);
      continue;
    }

    const inputPath = path.join(partnersDir, file);
    // Derive clean base name (strip all extensions like .jpg.jpeg -> base)
    const baseName = file.replace(/(\.[a-z]+)+$/i, '');
    const outputPath = path.join(partnersDir, `${baseName}.webp`);

    try {
      await sharp(inputPath)
        .webp({ quality: 80 })
        .toFile(outputPath);
      
      fs.unlinkSync(inputPath);
      console.log(`Converted: ${file} -> ${baseName}.webp`);
    } catch (err) {
      console.error(`Failed on ${file}:`, err.message);
    }
  }

  console.log('Partner images converted. Updating HTML references...');

  const htmlFiles = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

  // Build a replacement map from old filenames to new webp filenames
  const conversionMap = {
    'Billion.PNG': 'Billion.webp',
    'Hengli.jpg.jpeg': 'Hengli.webp',
    'Hengyi.png': 'Hengyi.webp',
    'Highsun.PNG': 'Highsun.webp',
    'Jinlun.png': 'Jinlun.webp',
    'XFM.jpg.jpeg': 'XFM.webp',
  };

  htmlFiles.forEach(file => {
    const filePath = path.join(publicDir, file);
    let html = fs.readFileSync(filePath, 'utf-8');
    let updated = false;

    // Fix any broken .png.webp or .jpg.webp or .jpeg.webp references from previous script
    html = html.replace(/images\/partners\/([^"']+?)\.(png|jpg|jpeg|PNG|JPEG)\.webp/g, (match, base) => {
      return `images/partners/${base}.webp`;
    });

    // Fix uppercase extensions: .PNG.webp -> .webp
    // Also fix Billion.PNG -> Billion.webp etc
    Object.entries(conversionMap).forEach(([oldName, newName]) => {
      if (html.includes(`images/partners/${oldName}`)) {
        html = html.split(`images/partners/${oldName}`).join(`images/partners/${newName}`);
        updated = true;
      }
    });

    fs.writeFileSync(filePath, html, 'utf-8');
    if (updated) console.log('Updated partner refs in: ' + file);
  });

  console.log('Done!');
})();
