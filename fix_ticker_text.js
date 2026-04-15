const fs = require('fs');
const path = require('path');
const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

const oldSpan1 = '<span>Global Yarn Sourcing | Trusted Quality &amp; Consistent Supply</span>';
const oldSpan2 = '<span>Global Yarn Sourcing | Trusted Quality & Consistent Supply</span>';
const newSpan = '<span>Global Yarn Sourcing &nbsp;&nbsp;&nbsp; Trusted Quality &amp; Consistent Supply</span>';

files.forEach(file => {
  const filePath = path.join(publicDir, file);
  let html = fs.readFileSync(filePath, 'utf-8');
  let updated = false;

  if (html.includes(oldSpan1)) {
    html = html.split(oldSpan1).join(newSpan);
    updated = true;
  }
  if (html.includes(oldSpan2)) {
    html = html.split(oldSpan2).join(newSpan);
    updated = true;
  }

  if (updated) {
    fs.writeFileSync(filePath, html, 'utf-8');
    console.log('Fixed ticker text in: ' + file);
  }
});
