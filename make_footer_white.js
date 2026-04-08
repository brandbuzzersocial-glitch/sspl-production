const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

const whiteFooterCSS = `
  /* White Footer Override */
  footer { 
      background-color: #FFFFFF !important; 
      color: #1a1a1a !important; 
      border-top: 1px solid #E8E8E8 !important; 
  }
  footer * {
      /* Reset any dark background overrides if there are any inline */
  }
  footer .fb-name { color: #1a1a1a !important; }
  footer .fb-name span { color: #666 !important; }
  footer .fb-desc { color: #666 !important; }
  footer .social { 
      background: #f5f5f5 !important; 
      color: #1a1a1a !important; 
      border: 1px solid #ddd !important; 
  }
  footer .social:hover {
      background: #F5C518 !important;
      color: #111 !important;
      border-color: #F5C518 !important;
  }
  footer .fc h5 { color: #1a1a1a !important; font-weight: 800 !important; }
  footer .fc ul li, footer .fc ul li a, footer .fc ul li span { color: #555 !important; }
  footer .fc ul li a:hover { color: #F5C518 !important; }
  footer .footer-bottom { 
      border-top: 1px solid #eee !important; 
      color: #666 !important; 
  }
  footer .footer-bottom p { color: #666 !important; }
  footer .footer-gstin { color: #555 !important; font-weight: 600 !important; }
  footer svg { color: #1a1a1a !important; }
  
  /* Make sure the main phone/email icons in the footer contact list are visible */
  footer .fc ul li svg { color: #F5C518 !important; } /* Yellow icons */
  footer .fb-logo svg { color: #F5C518 !important; }
`;

files.forEach(file => {
  const filePath = path.join(publicDir, file);
  const html = fs.readFileSync(filePath, 'utf-8');
  const $ = cheerio.load(html);

  // Remove existing White Footer Override if any
  let styleHtml = $('style').last().html() || '';
  let updated = false;

  $('style').each((i, el) => {
    let text = $(el).html();
    if (text.includes('/* White Footer Override */')) {
        $(el).html(text.replace(/\/\* White Footer Override \*\/[\s\S]*?(\n\s*<\/style>|(?=<\/style>)|$)/g, ''));
    }
  });

  // Also remove footer styling from fix_footer.js that might conflict, or specific background overrides inside existing <style>
  // Actually, !important will override anyway.

  if ($('style#white-footer').length) {
    $('style#white-footer').html(whiteFooterCSS);
  } else {
    $('head').append('<style id="white-footer">' + whiteFooterCSS + '</style>');
  }

  // Remove any inline styles on the footer that set dark background
  $('footer').css('background', '');
  $('footer').css('background-color', '');

  fs.writeFileSync(filePath, $.html({ decodeEntities: false }), 'utf-8');
  console.log(`Updated footer to white background in ${file}`);
});
