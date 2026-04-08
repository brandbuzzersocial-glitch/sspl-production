const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

const premiumProcessCSS = `
  /* Process Flow Premium Gradients - Vibrant Sunset */
  .psb-fill { background: linear-gradient(90deg, #F5C518, #FF512F, #DD2476) !important; box-shadow: 0 0 15px rgba(255,81,47,0.5) !important; }
  .journey-line-fill { background: linear-gradient(to bottom, #F5C518, #FF512F, #DD2476) !important; box-shadow: 0 0 15px rgba(255,81,47,0.5) !important; }
  .jstep-node.active { background: linear-gradient(135deg, #F5C518, #FF512F, #DD2476) !important; color: #fff !important; transform: scale(1.15) !important; transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important; box-shadow: 0 4px 20px rgba(221,36,118,0.6) !important; border: 2px solid rgba(255,255,255,0.2) !important; }
  .jstep-node.active .jstep-icon { background: transparent !important; color: #fff !important; }
`;

files.forEach(file => {
  const filePath = path.join(publicDir, file);
  const html = fs.readFileSync(filePath, 'utf-8');
  const $ = cheerio.load(html);

  let styleHtml = $('style').first().html() || '';
  
  // Remove earlier process flow blocks
  if (styleHtml.includes('/* Process Flow Color Tweaks */')) {
      styleHtml = styleHtml.replace(/\/\* Process Flow Color Tweaks \*\/[\s\S]*?(\/\* COMPRESSED FOOTER ALIGNMENTS \*\/|<\/style>|$)/g, '/* COMPRESSED FOOTER ALIGNMENTS */');
  }
  
  if (styleHtml.includes('/* Process Flow Gradient Revamp */')) {
      styleHtml = styleHtml.replace(/\/\* Process Flow Gradient Revamp \*\/[\s\S]*?(\/\* Enhanced Footer Alignments \*\/|<\/style>|$)/g, '');
  }

  if (styleHtml.includes('/* Process Flow Premium Gradients - Vibrant Sunset */')) {
      styleHtml = styleHtml.replace(/\/\* Process Flow Premium Gradients - Vibrant Sunset \*\/[\s\S]*?(\/\*|$)/g, '');
  }
  
  $('style').first().html(styleHtml);

  if ($('style').length) {
      $('style').first().append(premiumProcessCSS);
  } else {
      $('head').append('<style>' + premiumProcessCSS + '</style>');
  }

  fs.writeFileSync(filePath, $.html({ decodeEntities: false }), 'utf-8');
  console.log(`Updated process colors in ${file}`);
});
