const fs = require('fs');
const path = require('path');
const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

const oldSpans = [
  '<span>Leading Yarn Importers &amp; Suppliers</span>',
  '<span>100% Trusted &amp; Reliable</span>'
];

const newSpan = '<span>Global Yarn Sourcing | Trusted Quality &amp; Consistent Supply</span>';

files.forEach(file => {
  const filePath = path.join(publicDir, file);
  let html = fs.readFileSync(filePath, 'utf-8');
  
  let updated = false;
  oldSpans.forEach(span => {
    if (html.includes(span)) {
      html = html.split(span).join(newSpan);
      updated = true;
    }
  });

  if (updated) {
    fs.writeFileSync(filePath, html, 'utf-8');
    console.log('Fixed ticker in: ' + file);
  }
});
