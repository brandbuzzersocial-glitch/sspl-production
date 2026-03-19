const fs = require('fs');
const path = require('path');

const publicDir = 'c:/sspl website/public';
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(publicDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Replace 15+ in about-badge
  const badgeRegex = /<div class="about-badge">[\s\S]*?<div class="n">15\+<\/div>[\s\S]*?<\/div>/gi;
  if (badgeRegex.test(content)) {
    content = content.replace(/<div class="n">15\+<\/div>/gi, '<div class="n">43+</div>');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated about badge in ${file}`);
  }
});
