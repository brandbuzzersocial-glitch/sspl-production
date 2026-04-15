const fs = require('fs');
const path = require('path');
const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(publicDir, file);
  let html = fs.readFileSync(filePath, 'utf-8');
  // Match the style block with id="mobile-fixes" and all its contents
  const updatedHtml = html.replace(/<style id="mobile-fixes">([\s\S]*?)<\/style>/, '');
  if (html !== updatedHtml) {
    fs.writeFileSync(filePath, updatedHtml, 'utf-8');
    console.log('Removed mobile-fixes from ' + file);
  }
});
