const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

const mobileFixesCSS = `
<style id="mobile-fixes">
  /* --- GLOBAL MOBILE RESPONSIVENESS FIXES --- */
  html, body {
    overflow-x: hidden !important;
    width: 100% !important;
    max-width: 100vw !important;
    box-sizing: border-box;
  }
  
  *, *::before, *::after {
    box-sizing: border-box;
  }

  .container {
    padding-left: 20px !important;
    padding-right: 20px !important;
    width: 100% !important;
    max-width: 100vw !important;
  }
  
  /* Restrict marquee width to viewport so it doesn't cause page scroll */
  .partners-wrap {
    max-width: 100vw !important;
  }

  @media (max-width: 800px) {
    /* Scale down oversized text and spacing */
    section[style*="padding: 160px"] {
      padding-top: 110px !important;
      padding-bottom: 60px !important;
    }
    
    section[style*="padding: 100px"] {
      padding: 60px 20px !important;
    }

    .sec-h2, .hero-h1, .intro-name {
      font-size: clamp(32px, 8vw, 42px) !important;
      line-height: 1.2 !important;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }

    h3 { font-size: 26px !important; }
    
    .sec-p { 
      font-size: 16px !important; 
      padding: 0 5px !important;
    }
    
    /* Convert rigid multi-column grids to single column stacks */
    .contact-grid, .footer-grid, .pgrid {
      display: flex !important;
      flex-direction: column !important;
      gap: 30px !important;
      width: 100% !important;
    }

    /* Target specific hardcoded inline grids (like minmax 400px columns) */
    div[style*="grid-template-columns: repeat"] {
      grid-template-columns: 1fr !important;
      gap: 30px !important;
    }
    
    /* Fix Contact Form width */
    .form-wrap {
      padding: 24px !important;
    }

    /* Shrink the scrolling partner cards to fit small screens */
    div.partners div.partner {
      width: 150px !important;
      padding: 15px !important;
    }
    
    .partners-lbl {
      font-size: 22px !important;
      margin-bottom: 20px !important;
      line-height: 1.3 !important;
    }
  }

  @media (max-width: 480px) {
    .container {
      padding-left: 15px !important;
      padding-right: 15px !important;
    }
    .sec-h2, .hero-h1 {
      font-size: 32px !important;
    }
  }
</style>
`;

files.forEach(file => {
  const filePath = path.join(publicDir, file);
  let html = fs.readFileSync(filePath, 'utf-8');
  const $ = cheerio.load(html, { decodeEntities: false });

  let updated = false;

  if ($('style#mobile-fixes').length) {
    if ($('style#mobile-fixes').html() !== $(mobileFixesCSS).html()) {
      $('style#mobile-fixes').replaceWith(mobileFixesCSS);
      updated = true;
    }
  } else {
    $('head').append(mobileFixesCSS);
    updated = true;
  }

  // Ensure ALL inline styling grids referencing 400px minimum width are mobile-ready
  // Note: the CSS target div[style*="grid-template-columns: repeat"] handles most, 
  // but if we see hardcoded non-responsive elements, we patch them.

  if (updated) {
    fs.writeFileSync(filePath, $.html(), 'utf-8');
    console.log(`Applied mobile fixes to ${file}`);
  }
});
console.log('Mobile optimization complete!');
