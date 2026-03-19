const fs = require('fs');
const path = require('path');

const publicDir = 'c:/sspl website/public';
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(publicDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // 1. Remove Footer reference
  if (content.includes('ISO 9001 CERTIFIED')) {
    content = content.replace(/ISO 9001 CERTIFIED · /g, '');
    content = content.replace(/ISO 9001 CERTIFIED/g, '');
    changed = true;
  }

  // 2. Remove Hero Card (specific to surat-sales.html)
  if (file === 'surat-sales.html') {
    const heroCardRegex = /<div class="hero-card">[\s\S]*?<\/div>\s*<\/div>/i;
    if (heroCardRegex.test(content)) {
      content = content.replace(heroCardRegex, '</div>');
      changed = true;
    }
  }

  // 3. Remove Stat Cards in Why/Home
  const statCardRegex = /<div class="stat-card">\s*<div class="big">ISO<\/div>[\s\S]*?<\/div>/gi;
  if (statCardRegex.test(content)) {
    content = content.replace(statCardRegex, '');
    changed = true;
  }

  // 4. Remove Checklist items
  const clItemRegex = /<div class="cl-item">[\s\S]*?ISO 9001 Certified Processes\s*<\/div>/gi;
  if (clItemRegex.test(content)) {
    content = content.replace(clItemRegex, '');
    changed = true;
  }

  // 5. Remove About page feature
  const aboutFeatRegex = /<div class="about-feat">[\s\S]*?ISO 9001 Certified[\s\S]*?<\/div>/gi;
  if (aboutFeatRegex.test(content)) {
    content = content.replace(aboutFeatRegex, '');
    changed = true;
  }

  // 6. Remove Timeline Milestone (timeline.html)
  if (file === 'timeline.html') {
    const milestoneRegex = /<div class="ms-card reveal">[\s\S]*?ISO 9001 Certification[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/gi;
    if (milestoneRegex.test(content)) {
      content = content.replace(milestoneRegex, '');
      changed = true;
    }
  }

  // 7. General cleanup for any stray "ISO" strings that are obvious certification references
  content = content.replace(/Achieved ISO 9001:2015 certification — formalizing our unwavering commitment to quality\./g, '');
  content = content.replace(/ISO Certified/g, '');

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Cleaned ISO references in ${file}`);
  }
});
