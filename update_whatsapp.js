const fs = require('fs');
const path = require('path');

const publicDir = 'c:/sspl website/public';
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(publicDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Replace WhatsApp phone number in links
  // Looking for wa.me/919374713687 or similar
  const waRegex = /wa\.me\/91\d{10}/g;
  if (waRegex.test(content)) {
    content = content.replace(waRegex, 'wa.me/917990978282');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated WhatsApp number in ${file}`);
  }
});
