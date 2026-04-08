const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

const tickerHTML = `
  <div class="top-ticker" id="topTicker">
    <div class="ticker-wrap">
      <div class="ticker-content">
        <span>Leading Yarn Importers &amp; Suppliers</span>
        <span>Leading Yarn Importers &amp; Suppliers</span>
        <span>Leading Yarn Importers &amp; Suppliers</span>
        <span>Leading Yarn Importers &amp; Suppliers</span>
        <span>Leading Yarn Importers &amp; Suppliers</span>
        <span>Leading Yarn Importers &amp; Suppliers</span>
        <span>Leading Yarn Importers &amp; Suppliers</span>
        <span>Leading Yarn Importers &amp; Suppliers</span>
      </div>
    </div>
  </div>
`;

const tickerCSS = `
  <style id="tickerCSS">
    .top-ticker {
      background: #F5C518;
      color: #111;
      font-weight: 800;
      font-size: 11px;
      letter-spacing: 2px;
      text-transform: uppercase;
      padding: 8px 0;
      overflow: hidden;
      white-space: nowrap;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 99999;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    .ticker-wrap {
      width: 100%;
      overflow: hidden;
    }
    .ticker-content {
      display: inline-block;
      white-space: nowrap;
      animation: bannerTicker 25s linear infinite;
    }
    .ticker-content span {
      display: inline-block;
      padding-right: 50px;
    }
    @keyframes bannerTicker {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    
    /* Adjust fixed elements for the 30px ticker */
    nav#navbar { top: 30px !important; }
    #hero { padding-top: 96px !important; }
    .process-sticky-bar { top: 96px !important; }
    .mobile-menu { top: 30px !important; }
  </style>
`;

files.forEach(file => {
  const filePath = path.join(publicDir, file);
  const html = fs.readFileSync(filePath, 'utf-8');
  const $ = cheerio.load(html);

  if ($('#topTicker').length === 0) {
      $('body').prepend(tickerHTML);
  } else {
      $('#topTicker').replaceWith(tickerHTML);
  }

  if ($('#tickerCSS').length === 0) {
      $('head').append(tickerCSS);
  } else {
      $('#tickerCSS').replaceWith(tickerCSS);
  }

  fs.writeFileSync(filePath, $.html({ decodeEntities: false }), 'utf-8');
  console.log(`Added ticker to ${file}`);
});
