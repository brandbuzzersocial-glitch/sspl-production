const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(publicDir, file);
  const html = fs.readFileSync(filePath, 'utf-8');
  const $ = cheerio.load(html);

  if ($('.ticker-content').length) {
      $('.ticker-content').html(`
        <span>Leading Yarn Importers &amp; Suppliers</span>
        <span>100% Trusted &amp; Reliable</span>
        <span>Leading Yarn Importers &amp; Suppliers</span>
        <span>100% Trusted &amp; Reliable</span>
        <span>Leading Yarn Importers &amp; Suppliers</span>
        <span>100% Trusted &amp; Reliable</span>
        <span>Leading Yarn Importers &amp; Suppliers</span>
        <span>100% Trusted &amp; Reliable</span>
        <span>Leading Yarn Importers &amp; Suppliers</span>
        <span>100% Trusted &amp; Reliable</span>
      `);
      fs.writeFileSync(filePath, $.html({ decodeEntities: false }), 'utf-8');
      console.log('Updated ticker in ' + file);
  }
});
