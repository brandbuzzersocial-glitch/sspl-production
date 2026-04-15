const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const htmlFiles = fs.readdirSync(publicDir).filter(f => f.endsWith('.html') && f !== 'admin.html');

const oldTickerBlock = `  <style id="tickerCSS">
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
      animation: bannerTicker 50s linear infinite;
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
  </style>`;

const newTickerBlock = `  <style id="tickerCSS">
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
      animation: bannerTicker 50s linear infinite;
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

    /* Mobile: slimmer ticker */
    @media (max-width: 768px) {
      .top-ticker {
        padding: 5px 0;
        font-size: 9px;
        letter-spacing: 1px;
      }
      nav#navbar { top: 24px !important; }
      #hero { padding-top: 90px !important; }
      .process-sticky-bar { top: 90px !important; }
      .mobile-menu { top: 24px !important; }
    }
  </style>`;

let updated = 0;
htmlFiles.forEach(file => {
  const filePath = path.join(publicDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  if (content.includes(oldTickerBlock)) {
    content = content.replace(oldTickerBlock, newTickerBlock);
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Updated: ${file}`);
    updated++;
  } else {
    console.warn(`Ticker block not found in: ${file} (may already be updated or uses different format)`);
  }
});

console.log(`\nDone. Updated ${updated} files.`);
