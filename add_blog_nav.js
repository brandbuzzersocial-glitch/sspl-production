const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const htmlFiles = fs.readdirSync(publicDir).filter(f => f.endsWith('.html') && f !== 'admin.html' && f !== 'blog.html');

// The blog link to inject — comes after Process, before Contact
const blogLink = `<li><a href="blog.html">Blog</a></li>`;
const contactLink = `<li><a href="contact.html">Contact</a></li>`;

// Mobile menu blog link
const mobileBlogLink = `<a href="blog.html" onclick="closeMenu()">Blog</a>`;
const mobileContactLink = `<a href="contact.html" onclick="closeMenu()">Contact</a>`;

let updated = 0;
htmlFiles.forEach(file => {
  const filePath = path.join(publicDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  let changed = false;

  // Add to desktop nav (only if Blog not already there)
  if (!content.includes('href="blog.html"') && content.includes(contactLink)) {
    content = content.replace(contactLink, `${blogLink}\n    ${contactLink}`);
    changed = true;
  }

  // Add to mobile menu (only if not already there)
  if (!content.includes(`href="blog.html"`) && content.includes(mobileContactLink)) {
    content = content.replace(mobileContactLink, `${mobileBlogLink}\n    ${mobileContactLink}`);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Updated nav: ${file}`);
    updated++;
  } else {
    console.log(`Skipped (already has blog or no match): ${file}`);
  }
});

console.log(`\nDone. Updated ${updated} files.`);
