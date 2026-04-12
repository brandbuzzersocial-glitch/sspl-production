const fs = require('fs');
const path = require('path');
const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(publicDir, file);
  let html = fs.readFileSync(filePath, 'utf-8');
  
  const original = html;
  html = html.replace(/function goContact\(\) \{ [^}]+\}/g, "function goContact() { window.location.href = 'contact.html'; }");
  
  if (original !== html) {
    fs.writeFileSync(filePath, html, 'utf-8');
    console.log(`Updated ${file}`);
  }
});
console.log('Done.');
