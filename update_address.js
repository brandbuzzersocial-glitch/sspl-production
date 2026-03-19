const fs = require('fs');
const path = require('path');

const publicDir = 'c:/sspl website/public';
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

const oldAddress1 = /G-11, Platinum Plaza, Near P\.N\. Bank, New Palanpur Road, Surat, Gujarat 395009/g;
const oldAddress2 = /G-11, Platinum Plaza, Surat, Gujarat 395009/g;
const newAddress = '128, 4th Floor, Ring Road, Reshamwala Market, Surat, Gujarat – 395002';

files.forEach(file => {
  const filePath = path.join(publicDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  if (oldAddress1.test(content)) {
    content = content.replace(oldAddress1, newAddress);
    changed = true;
  }
  if (oldAddress2.test(content)) {
    content = content.replace(oldAddress2, newAddress);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated address in ${file}`);
  }
});
