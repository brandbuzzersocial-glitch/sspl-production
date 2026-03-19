const fs = require('fs');
const path = require('path');

const publicDir = 'c:/sspl website/public';
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

const shieldIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
</svg>`;

files.forEach(file => {
  const filePath = path.join(publicDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Replace recycle icon block in jstep-node
  const recycleRegex = /<div class="jstep-node" data-emoji="recycle"[\s\S]*?<\/svg><\/div>/gi;
  if (recycleRegex.test(content)) {
    content = content.replace(recycleRegex, `<div class="jstep-node" data-emoji="quality" style="color:var(--black);">${shieldIcon}</div>`);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated icons in ${file}`);
  }
});
