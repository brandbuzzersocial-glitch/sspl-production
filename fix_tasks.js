const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

const premiumCSS = `
  /* Premium Homepage Enhancements */
  #hero { position: relative; background: radial-gradient(circle at 80% 20%, rgba(245,197,24,0.05) 0%, transparent 40%), radial-gradient(circle at 20% 80%, rgba(245,197,24,0.05) 0%, transparent 40%); }
  #hero::before {
    content: ''; position: absolute; inset: 0; background-image: url('data:image/svg+xml,%3Csvg width="20" height="20" xmlns="http://www.w3.org/2000/svg"%3E%3Ccircle cx="2" cy="2" r="1.5" fill="rgba(0,0,0,0.02)"/%3E%3C/svg%3E');
    opacity: 0.6; z-index: -1; pointer-events: none;
  }
  .hero-card { transform-style: preserve-3d; animation: floatPremium 5s ease-in-out infinite; border-left: 4px solid #D4A800; }
  @keyframes floatPremium { 0%, 100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-12px) scale(1.02); } }

  /* Process Flow Gradient Revamp */
  .psb-fill { background: linear-gradient(90deg, #F5C518, #FF7B00) !important; box-shadow: 0 0 10px rgba(245,197,24,0.5); }
  .journey-line-fill { background: linear-gradient(to bottom, #F5C518, #FF7B00) !important; box-shadow: 0 0 10px rgba(245,197,24,0.5); }
  .jstep-node.active { background: linear-gradient(135deg, #F5C518, #FF7B00) !important; color: #fff !important; transform: scale(1.1); transition: transform 0.3s; box-shadow: 0 4px 15px rgba(245,197,24,0.4) !important; }
  .jstep-node.active .jstep-icon { background: transparent !important; color: #fff !important; }

  /* Footer Alignment & Aesthetics */
  footer { background: #0A0A0A !important; color: #E0E0E0 !important; border-top: 1px solid #1A1A1A !important; padding-top: 60px !important; }
  .footer-grid { margin-bottom: 40px !important; }
  .fc h5 { color: #FFF !important; text-transform: uppercase; letter-spacing: 2.5px; opacity: 0.9; margin-bottom: 24px !important; }
  .fc ul li { margin-bottom: 14px !important; }
  .fc ul li a { color: #888 !important; transition: all 0.3s; }
  .fc ul li a:hover { color: #F5C518 !important; padding-left: 4px; }
  .fb-desc, .cd-v { color: #888 !important; }
  .footer-bottom { border-top: 1px solid #1A1A1A !important; padding: 24px 0 !important; margin-top: 0 !important; color: #666 !important; }
`;

files.forEach(file => {
  const filePath = path.join(publicDir, file);
  const html = fs.readFileSync(filePath, 'utf-8');
  const $ = cheerio.load(html);

  // 1. Remove duplicate "About" and "Contact" from .nav-links and .mobile-menu
  $('nav .nav-links').each((i, ul) => {
    let seenAbout = false;
    let seenContact = false;
    $(ul).find('li').each((j, el) => {
        let txt = $(el).text().trim().toLowerCase();
        if (txt === 'about') {
            if (seenAbout) $(el).remove();
            seenAbout = true;
        } else if (txt.includes('contact us') || txt === 'contact') {
            if (seenContact) $(el).remove();
            seenContact = true;
        }
    });
  });

  $('.mobile-menu').each((i, menu) => {
    let seenAbout = false;
    let seenContact = false;
    $(menu).find('a').each((j, a) => {
        let txt = $(a).text().trim().toLowerCase();
        if (txt === 'about') {
            if (seenAbout) $(a).remove();
            seenAbout = true;
        } else if (txt.includes('contact us') || txt === 'contact') {
            if (seenContact) $(a).remove();
            seenContact = true;
        }
    });
  });

  // 2. Fix Home link in products.html
  if (file === 'products.html') {
      $('a').each((i, a) => {
          if ($(a).text().trim().toLowerCase() === 'home' && $(a).attr('href') === '#hero') {
              $(a).attr('href', 'surat-sales.html');
          }
      });
  }

  // 3. Email update enforce globally
  $('*').contents().filter((i, el) => el.nodeType === 3).each((i, el) => {
      let data = el.data;
      if(data.includes('Import.suratsales@gmail.com') || data.includes('import.suratsales@gmail.com')) {
          el.data = data.replace(/Import\.suratsales@gmail\.com/gi, 'imports.suratsales@gmail.com');
      }
      if(data.includes('info@suratsales.com')) {
          el.data = data.replace(/info@suratsales\.com/gi, 'imports.suratsales@gmail.com');
      }
  });

  $('form').each((i, f) => {
      let action = $(f).attr('action');
      if (action && (action.includes('info@') || action.includes('Import.suratsales'))) {
         $(f).attr('action', 'mailto:imports.suratsales@gmail.com');
      }
  });

  $('a').each((i, a) => {
      let href = $(a).attr('href');
      if (href && href.startsWith('mailto:')) {
          if (href.includes('info@suratsales.com') || href.includes('import.suratsales@gmail.com') || href.includes('Import.suratsales@gmail.com')) {
              $(a).attr('href', 'mailto:imports.suratsales@gmail.com');
          }
      }
  });

  // 4. Update the global supply mention in surat-sales.html hero
  if (file === 'surat-sales.html') {
      let heroP = $('.hero-p');
      if (heroP.length) {
          heroP.text('Your trusted partner for high-quality yarn solutions, connecting global manufacturers with the Indian market. Our supply area is global and includes regular exports.');
      }
  }

  // 5. Append premium CSS exactly once
  // Clean up duplicated CSS from previous script
  $('style').each((i, style) => {
      let css = $(style).html();
      if(css.includes('/* Improved Hero Image */') || css.includes('/* Premium Homepage Enhancements */')) {
          // Keep only the non-injected part if there's any important original css, actually let's just make sure we don't append it again
          // I will just replace the duplicates with nothing
          css = css.replace(/\/\* Improved Hero Image \*\/[\s\S]*?(\/\*|$)/g, '');
          css = css.replace(/\/\* Footer Styling Improvements \*\/[\s\S]*?(\/\*|$)/g, '');
          css = css.replace(/\/\* Form input alignment \*\/[\s\S]*?(\/\*|$)/g, '');
          css = css.replace(/\/\* Process Flow Color Tweaks \*\/[\s\S]*?(\/\*|$)/g, '');
          css = css.replace(/\/\* Global Adjustments \*\/[\s\S]*?(<\/style>|$)/g, '');
          $(style).html(css);
      }
  });

  // Ensure no lingering pieces of those old injected lines
  // We strictly append premiumCSS to the first <style> tag
  if ($('style').length) {
      // only append if not already there
      if (!$('style').first().html().includes('Premium Homepage Enhancements')) {
         $('style').first().append(premiumCSS);
      }
  } else {
      $('head').append('<style>' + premiumCSS + '</style>');
  }

  fs.writeFileSync(filePath, $.html({ decodeEntities: false }), 'utf-8');
  console.log(`Processed ${file}`);
});
console.log('All updates complete.');
