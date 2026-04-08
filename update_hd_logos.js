const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

const cssUpdate = `
  /* HD Logos & Single Line Partners Override */
  .partners {
    display: flex !important;
    flex-wrap: nowrap !important;
    gap: 15px !important;
    overflow-x: auto !important;
    justify-content: center !important;
    padding-bottom: 20px;
    align-items: stretch !important;
  }
  .partners::-webkit-scrollbar { height: 8px; }
  .partners::-webkit-scrollbar-thumb { background: #CCC; border-radius: 4px; }
  .partner {
    flex: 0 0 auto !important;
    width: 140px !important;
    min-width: 0 !important; /* overrides minmax grid if any */
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    justify-content: center !important;
    padding: 16px 10px !important;
  }
  .partner img {
    width: 80px !important;
    height: 80px !important;
    object-fit: contain !important;
    margin-bottom: 8px !important;
  }
`;

files.forEach(file => {
  const filePath = path.join(publicDir, file);
  const html = fs.readFileSync(filePath, 'utf-8');
  const $ = cheerio.load(html);

  let updated = false;

  // Enhance clearbit logos with high-res parameters
  $('.partner img').each((i, img) => {
      let src = $(img).attr('src');
      if (src && src.includes('logo.clearbit.com') && !src.includes('?size=')) {
          $(img).attr('src', src + '?size=512');
          updated = true;
      }
      
      // Some domains might be better known
      if (src && src.includes('baihong.com')) $(img).attr('src', 'https://logo.clearbit.com/billionindustrial.com?size=512'); // Billion Industrial
  });

  // Inject CSS if partners section exists
  if ($('.partners').length > 0) {
      if ($('style').length) {
          if (!$('style').first().html().includes('HD Logos & Single Line Partners Override')) {
             $('style').first().append(cssUpdate);
             updated = true;
          }
      } else {
          $('head').append('<style>' + cssUpdate + '</style>');
          updated = true;
      }
  }

  if (updated) {
      fs.writeFileSync(filePath, $.html({ decodeEntities: false }), 'utf-8');
      console.log(`Updated high-res logos & single line in ${file}`);
  }
});
