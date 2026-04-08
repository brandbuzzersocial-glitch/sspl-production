const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

const cssUpdate = `
/* ABSOLUTE OVERRIDE FOR SINGLE LINE PARTNERS */
div.partners-wrap div.partners, div.partners {
    display: flex !important;
    flex-wrap: nowrap !important;
    flex-direction: row !important;
    justify-content: flex-start !important;
    align-items: stretch !important;
    gap: 20px !important;
    overflow-x: auto !important;
    width: 100% !important;
    max-width: 100% !important;
    padding-bottom: 20px !important;
    -webkit-overflow-scrolling: touch !important;
    scrollbar-width: thin !important;
}

div.partners-wrap div.partners::-webkit-scrollbar, div.partners::-webkit-scrollbar {
    height: 8px !important;
}
div.partners-wrap div.partners::-webkit-scrollbar-thumb, div.partners::-webkit-scrollbar-thumb {
    background-color: #E0E0E0 !important;
    border-radius: 10px !important;
}

div.partners-wrap div.partners div.partner, div.partners div.partner {
    flex: 0 0 auto !important; 
    width: 180px !important; 
    margin: 0 !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: center !important;
    align-items: center !important;
}
`;

files.forEach(file => {
  const filePath = path.join(publicDir, file);
  const html = fs.readFileSync(filePath, 'utf-8');
  const $ = cheerio.load(html);

  let styleHtml = $('style').first().html() || '';
  
  if (styleHtml.includes('/* ABSOLUTE OVERRIDE FOR SINGLE LINE PARTNERS */')) {
      styleHtml = styleHtml.replace(/\/\* ABSOLUTE OVERRIDE FOR SINGLE LINE PARTNERS \*\/[\s\S]*?(<\/style>|$)/g, '');
  }
  
  $('style').first().html(styleHtml);

  if ($('.partners').length > 0) {
      if ($('style').length) {
          $('style').first().append(cssUpdate);
      } else {
          $('head').append('<style>' + cssUpdate + '</style>');
      }

      fs.writeFileSync(filePath, $.html({ decodeEntities: false }), 'utf-8');
      console.log(`Enforced single line partners in ${file}`);
  }
});
