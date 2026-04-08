const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

const compressedFooterCSS = `
  /* COMPRESSED FOOTER ALIGNMENTS */
  footer { padding: 35px 40px 15px !important; }
  .footer-grid { grid-template-columns: 1.5fr 1fr 1fr 1.5fr !important; gap: 20px !important; margin-bottom: 20px !important; }
  .fc h5 { margin-bottom: 12px !important; font-size: 12px !important; letter-spacing: 1.2px !important; }
  .fc ul { display: flex; flex-direction: column; gap: 6px !important; margin: 0; padding: 0; }
  .fc ul li { margin-bottom: 0 !important; line-height: 1.3 !important; font-size: 12px !important; }
  .fc ul li div { align-items: flex-start !important; }
  .fb-logo { margin-bottom: 12px !important; display: flex; align-items: center; gap: 10px; }
  .fb-desc { margin-bottom: 16px !important; line-height: 1.4 !important; max-width: 320px; font-size: 12px !important; }
  .fb-socials { display: flex; gap: 10px; }
  .footer-bottom { border-top: 1px solid #1A1A1A !important; padding: 16px 0 0 !important; margin-top: 0 !important; color: #666 !important; font-size: 11px !important; }
  .brand-credits { margin: 0 !important; }
`;

files.forEach(file => {
  const filePath = path.join(publicDir, file);
  const html = fs.readFileSync(filePath, 'utf-8');
  const $ = cheerio.load(html);

  let styleHtml = $('style').first().html() || '';
  
  // Remove earlier Enhanced Footer Alignments block
  if (styleHtml.includes('/* Enhanced Footer Alignments */')) {
      styleHtml = styleHtml.replace(/\/\* Enhanced Footer Alignments \*\/[\s\S]*?(<\/style>|$)/g, '');
  }
  
  // Remove earlier Compressed Footer block if testing repeatedly
  if (styleHtml.includes('/* COMPRESSED FOOTER ALIGNMENTS */')) {
      styleHtml = styleHtml.replace(/\/\* COMPRESSED FOOTER ALIGNMENTS \*\/[\s\S]*?(<\/style>|$)/g, '');
  }
  
  $('style').first().html(styleHtml);

  if ($('style').length) {
      $('style').first().append(compressedFooterCSS);
  } else {
      $('head').append('<style>' + compressedFooterCSS + '</style>');
  }

  fs.writeFileSync(filePath, $.html({ decodeEntities: false }), 'utf-8');
  console.log(`Compressed footer in ${file}`);
});
