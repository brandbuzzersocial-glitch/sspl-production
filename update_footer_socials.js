const fs = require('fs');
const path = require('path');

const linkedinIcon = '<a href="https://www.linkedin.com/company/surat-sales-private-limited/" target="_blank" class="social" style="display:flex;align-items:center;justify-content:center;"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></a>';

const files = [
  'about.html','contact.html','process.html','products.html',
  'sourcing.html','surat-sales.html','timeline.html','tracking.html','why.html'
];

files.forEach(f => {
  const fp = path.join(__dirname, 'public', f);
  if (!fs.existsSync(fp)) { console.log('Not found: ' + f); return; }
  let html = fs.readFileSync(fp, 'utf8');
  // Replace entire fb-socials div content with just LinkedIn
  html = html.replace(
    /<div class="fb-socials">[\s\S]*?<\/div>/,
    '<div class="fb-socials">' + linkedinIcon + '</div>'
  );
  fs.writeFileSync(fp, html, 'utf8');
  console.log('Updated: ' + f);
});
