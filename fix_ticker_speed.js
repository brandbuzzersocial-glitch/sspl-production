const fs = require('fs');
const path = require('path');
const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

const targetStr = 'animation: bannerTicker 25s linear infinite;';
const replaceStr = 'animation: bannerTicker 50s linear infinite;';

files.forEach(file => {
  const filePath = path.join(publicDir, file);
  let html = fs.readFileSync(filePath, 'utf-8');
  
  if (html.includes(targetStr)) {
    let newHtml = html.replace(targetStr, replaceStr);
    fs.writeFileSync(filePath, newHtml, 'utf-8');
    console.log('Fixed ticker speed in: ' + file);
  }
});
