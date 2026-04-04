const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(publicDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // 1. Email replacements
  content = content.replace(/Import\.suratsales@gmail\.com/g, 'imports.suratsales@gmail.com');
  content = content.replace(/import\.suratsales@gmail\.com/g, 'imports.suratsales@gmail.com');

  // 2. Remove GST Number sections
  content = content.replace(/<li>GSTIN:\s*24AADCS1500K1ZR<\/li>/g, '');
  content = content.replace(/<div class="cd-l">GSTIN<\/div>\s*<div class="cd-v">24AADCS1500K1ZR<\/div>/g, '');

  // 3. Update Company Name
  content = content.replace(/Jinlun shanli/gi, 'Jinlun');

  // 4. Remove Wanghong
  // Use a targeted replacement that won't span multiple divs.
  content = content.replace(/<div class="partner">[^<]*<img[^>]*?alt="Wanghong"[^>]*>[^<]*Wanghong[^<]*<\/div>/g, '');

  // 5. Remove Nylon DTY from navigation and timeline
  content = content.replace(/<li>\s*<a href="products\.html">Nylon DTY<\/a>\s*<\/li>/g, '');
  content = content.replace(/Yarn, and Nylon DTY/g, 'and Yarn');

  // 6. Global supply area wording (Adding to Sourcing / Exports)
  // Let's hold off on complex replacements and do them manually.

  fs.writeFileSync(filePath, content, 'utf-8');
});

console.log('Global text replacements applied correctly.');
