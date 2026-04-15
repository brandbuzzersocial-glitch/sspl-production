const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const sourcePath = 'C:\\Users\\korja\\Downloads\\images.png';
const destPath = path.join(__dirname, 'public/images/partners/Wankai.webp');
const publicDir = path.join(__dirname, 'public');

async function processLogo() {
  try {
    console.log('Processing Wankai logo...');
    
    // Resize to max 800px width/height while maintaining aspect ratio
    // Pad with white background to make it square if needed (optional, but good for alignment)
    await sharp(sourcePath)
      .resize(800, 800, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      })
      .webp({ quality: 80 })
      .toFile(destPath);
    
    console.log('Processed and saved to: ' + destPath);

    const htmlFiles = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));
    const oldUrl = 'http://www.wkai.cc/images/logo-wk.webp';
    const oldUrlPng = 'http://www.wkai.cc/images/logo-wk.png';
    const newPath = 'images/partners/Wankai.webp';

    htmlFiles.forEach(file => {
      const filePath = path.join(publicDir, file);
      let html = fs.readFileSync(filePath, 'utf-8');
      let updated = false;

      if (html.includes(oldUrl)) {
        html = html.split(oldUrl).join(newPath);
        updated = true;
      }
      if (html.includes(oldUrlPng)) {
        html = html.split(oldUrlPng).join(newPath);
        updated = true;
      }

      if (updated) {
        fs.writeFileSync(filePath, html, 'utf-8');
        console.log('Updated HTML: ' + file);
      }
    });

    console.log('Success! Wankai logo fixed.');
  } catch (err) {
    console.error('Error: ' + err.message);
  }
}

processLogo();
