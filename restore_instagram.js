const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const htmlFiles = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

const linkedinIcon = `<a href="https://www.linkedin.com/company/surat-sales-private-limited/" target="_blank" class="social" style="display:flex;align-items:center;justify-content:center;"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>`;
const instagramIcon = `<a href="https://www.instagram.com/surat__sales/" target="_blank" class="social" style="display:flex;align-items:center;justify-content:center;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>`;

const currentSocials = `<div class="fb-socials">${linkedinIcon}</div>`;
const updatedSocials = `<div class="fb-socials" style="display:flex; gap:10px;">${linkedinIcon}${instagramIcon}</div>`;

htmlFiles.forEach(file => {
  const filePath = path.join(publicDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  if (content.includes(currentSocials)) {
    const newContent = content.replace(currentSocials, updatedSocials);
    fs.writeFileSync(filePath, newContent, 'utf-8');
    console.log(`Updated ${file}`);
  } else {
    // If it doesn't match exactly, try a more flexible approach
    const fbSocialsRegex = /<div class="fb-socials">[\s\S]*?<\/div>/;
    if (fbSocialsRegex.test(content)) {
       const newContent = content.replace(fbSocialsRegex, updatedSocials);
       fs.writeFileSync(filePath, newContent, 'utf-8');
       console.log(`Updated ${file} (regex)`);
    } else {
       console.warn(`Could not find fb-socials in ${file}`);
    }
  }
});
