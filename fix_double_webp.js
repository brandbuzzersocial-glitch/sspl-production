const fs = require('fs');
const path = require('path');
const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(publicDir, file);
  let html = fs.readFileSync(filePath, 'utf-8');
  
  // Fix double .webp.webp extensions
  const original = html;
  html = html.replace(/\.webp\.webp/g, '.webp');
  
  if (html !== original) {
    fs.writeFileSync(filePath, html, 'utf-8');
    console.log('Fixed double .webp.webp in: ' + file);
  }
});
console.log('Done fixing double webp extensions.');
