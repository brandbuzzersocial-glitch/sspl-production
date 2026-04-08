const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

const footerCSSUpdate = `
  /* Enhanced Footer Alignments */
  footer { padding: 60px 40px 20px !important; }
  .footer-grid { grid-template-columns: 1.5fr 1fr 1fr 1.5fr !important; gap: 40px !important; margin-bottom: 40px !important; }
  .fc h5 { margin-bottom: 16px !important; font-size: 13px !important; letter-spacing: 1.5px !important; }
  .fc ul { display: flex; flex-direction: column; gap: 10px !important; margin: 0; padding: 0; }
  .fc ul li { margin-bottom: 0 !important; line-height: 1.4 !important; }
  .fc ul li div { align-items: flex-start !important; }
  .fb-logo { margin-bottom: 16px !important; display: flex; align-items: center; gap: 12px; }
  .fb-desc { margin-bottom: 24px !important; line-height: 1.6 !important; max-width: 320px; font-size: 14px !important; }
  .fb-socials { display: flex; gap: 12px; }
`;

files.forEach(file => {
  const filePath = path.join(publicDir, file);
  const html = fs.readFileSync(filePath, 'utf-8');
  const $ = cheerio.load(html);

  // Clean old appended CSS from previous scripts if they look bad, but we can just append a stronger override.
  // Actually, let's remove any previous Enhanced Footer Alignments block
  let styleHtml = $('style').first().html() || '';
  if (styleHtml.includes('/* Enhanced Footer Alignments */')) {
      styleHtml = styleHtml.replace(/\/\* Enhanced Footer Alignments \*\/[\s\S]*?(<\/style>|$)/g, '');
      $('style').first().html(styleHtml);
  }

  if ($('style').length) {
      $('style').first().append(footerCSSUpdate);
  } else {
      $('head').append('<style>' + footerCSSUpdate + '</style>');
  }

  // Also fix the SVG and text alignment in Contact column
  $('.fc ul li div').each((i, div) => {
     $(div).attr('style', 'display:flex; gap:10px; align-items:flex-start;');
     let svg = $(div).find('svg');
     if (svg.length) {
        svg.attr('style', 'margin-top:2px; color:var(--yellow); flex-shrink:0;');
     }
  });

  fs.writeFileSync(filePath, $.html({ decodeEntities: false }), 'utf-8');
  console.log(`Updated footer in ${file}`);
});
