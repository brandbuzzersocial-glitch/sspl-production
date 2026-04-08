const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(publicDir, file);
  const html = fs.readFileSync(filePath, 'utf-8');
  const $ = cheerio.load(html);

  const footerBottom = $('.footer-bottom');
  if (footerBottom.length && !footerBottom.html().includes('BRAND BUZZER')) {
      footerBottom.append(`
        <p class="brand-credits" style="font-size: 11px; color: #666; margin-top: 0;">
          Designed &amp; Developed by <a href="https://brandbuzzersocial.com" target="_blank" style="color: #F5C518; text-decoration: none; font-weight: 700; letter-spacing: 1px;">BRAND BUZZER</a>
        </p>
      `);
      // Make sure we have the style in the block to enforce flex layout
      if (footerBottom.attr('style') && footerBottom.attr('style').includes('space-between')) {
         // already fine
      } else {
         footerBottom.attr('style', 'display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;');
      }
      
      fs.writeFileSync(filePath, $.html({ decodeEntities: false }), 'utf-8');
      console.log(`Updated footer-bottom in ${file}`);
  }
});
