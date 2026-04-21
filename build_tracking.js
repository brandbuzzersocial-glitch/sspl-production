const fs = require('fs');

const baseHtml = fs.readFileSync('c:/sspl website/public/surat-sales.html', 'utf8');

const navEndIdx = baseHtml.indexOf('</nav>') + 6;
const footerStartIdx = baseHtml.indexOf('<footer>');

const headAndNav = baseHtml.substring(0, navEndIdx);
const footer = baseHtml.substring(footerStartIdx);

const trackingContent = `
  <section style="padding-top: 120px; padding-bottom: 80px; background: var(--bg-section); min-height: 80vh;">
    <div class="container">
      <div style="text-align: center; margin-bottom: 60px;">
        <span class="sec-tag">Logistics Tools</span>
        <h1 class="sec-h2" style="font-size: 42px;">Vessel &amp; Container <br><em>Tracking</em></h1>
        <p class="sec-p" style="margin: 16px auto 0;">Easily track your cargo status in real-time. Please select your shipping line below to access their official tracking portal.</p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 24px; max-width: 1000px; margin: 0 auto;">
        
        <a href="https://ct.shipmentlink.com/servlet/TDB1_CargoTracking.do" target="_blank" rel="noopener" style="display: flex; align-items: center; gap: 20px; background: #fff; padding: 24px 30px; border-radius: var(--radius); border: 1px solid var(--border); box-shadow: var(--shadow); transition: var(--t);">
          <div style="flex: 0 0 50px; height: 50px; background: var(--yellow-light); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--yellow-dark);"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3-9L9 3l-3 9H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/><line x1="6" y1="16" x2="6.01" y2="16"/><line x1="10" y1="16" x2="10.01" y2="16"/></svg></div>
          <div>
            <h3 style="font-size: 18px; font-weight: 800; color: var(--black); margin-bottom: 4px;">Evergreen</h3>
            <span style="font-size: 12px; color: var(--yellow-dark); font-weight: 600;">Track Shipment &rarr;</span>
          </div>
        </a>

        <a href="https://www.goldstarline.com/tools/track_shipment" target="_blank" rel="noopener" style="display: flex; align-items: center; gap: 20px; background: #fff; padding: 24px 30px; border-radius: var(--radius); border: 1px solid var(--border); box-shadow: var(--shadow); transition: var(--t);">
          <div style="flex: 0 0 50px; height: 50px; background: var(--yellow-light); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--yellow-dark);"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h20"/><path d="M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8"/><path d="M4 12v-2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2"/></svg></div>
          <div>
            <h3 style="font-size: 18px; font-weight: 800; color: var(--black); margin-bottom: 4px;">Goldstar</h3>
            <span style="font-size: 12px; color: var(--yellow-dark); font-weight: 600;">Track Shipment &rarr;</span>
          </div>
        </a>

        <a href="https://www.ekmtc.com/index.html#/cargo-tracking" target="_blank" rel="noopener" style="display: flex; align-items: center; gap: 20px; background: #fff; padding: 24px 30px; border-radius: var(--radius); border: 1px solid var(--border); box-shadow: var(--shadow); transition: var(--t);">
          <div style="flex: 0 0 50px; height: 50px; background: var(--yellow-light); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--yellow-dark);"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg></div>
          <div>
            <h3 style="font-size: 18px; font-weight: 800; color: var(--black); margin-bottom: 4px;">KMTC</h3>
            <span style="font-size: 12px; color: var(--yellow-dark); font-weight: 600;">Track Shipment &rarr;</span>
          </div>
        </a>

        <a href="https://www.emiratesline.com/track/" target="_blank" rel="noopener" style="display: flex; align-items: center; gap: 20px; background: #fff; padding: 24px 30px; border-radius: var(--radius); border: 1px solid var(--border); box-shadow: var(--shadow); transition: var(--t);">
          <div style="flex: 0 0 50px; height: 50px; background: var(--yellow-light); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--yellow-dark);"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="22" y1="12" x2="18" y2="12"/><line x1="6" y1="12" x2="2" y2="12"/><line x1="12" y1="6" x2="12" y2="2"/><line x1="12" y1="22" x2="12" y2="18"/></svg></div>
          <div>
            <h3 style="font-size: 18px; font-weight: 800; color: var(--black); margin-bottom: 4px;">Emirates</h3>
            <span style="font-size: 12px; color: var(--yellow-dark); font-weight: 600;">Track Shipment &rarr;</span>
          </div>
        </a>

        <a href="https://www.msc.com/en/track-a-shipment" target="_blank" rel="noopener" style="display: flex; align-items: center; gap: 20px; background: #fff; padding: 24px 30px; border-radius: var(--radius); border: 1px solid var(--border); box-shadow: var(--shadow); transition: var(--t);">
          <div style="flex: 0 0 50px; height: 50px; background: var(--yellow-light); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--yellow-dark);"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg></div>
          <div>
            <h3 style="font-size: 18px; font-weight: 800; color: var(--black); margin-bottom: 4px;">MSC</h3>
            <span style="font-size: 12px; color: var(--yellow-dark); font-weight: 600;">Track Shipment &rarr;</span>
          </div>
        </a>

        <a href="https://www.cma-cgm.com/ebusiness/tracking" target="_blank" rel="noopener" style="display: flex; align-items: center; gap: 20px; background: #fff; padding: 24px 30px; border-radius: var(--radius); border: 1px solid var(--border); box-shadow: var(--shadow); transition: var(--t);">
          <div style="flex: 0 0 50px; height: 50px; background: var(--yellow-light); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--yellow-dark);"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m16 12-4-4-4 4"/><path d="M12 16V8"/></svg></div>
          <div>
            <h3 style="font-size: 18px; font-weight: 800; color: var(--black); margin-bottom: 4px;">CMA CGM</h3>
            <span style="font-size: 12px; color: var(--yellow-dark); font-weight: 600;">Track Shipment &rarr;</span>
          </div>
        </a>

        <a href="https://www.oocl.com/eng/ourservices/eservices/cargotracking/pages/cargotracking.aspx" target="_blank" rel="noopener" style="display: flex; align-items: center; gap: 20px; background: #fff; padding: 24px 30px; border-radius: var(--radius); border: 1px solid var(--border); box-shadow: var(--shadow); transition: var(--t);">
          <div style="flex: 0 0 50px; height: 50px; background: var(--yellow-light); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--yellow-dark);"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg></div>
          <div>
            <h3 style="font-size: 18px; font-weight: 800; color: var(--black); margin-bottom: 4px;">OOCL</h3>
            <span style="font-size: 12px; color: var(--yellow-dark); font-weight: 600;">Track Shipment &rarr;</span>
          </div>
        </a>

      </div>
    </div>
  </section>

  <style>
    /* Add specific hover state for cards inside tracking */
    a[target="_blank"]:hover {
      transform: translateY(-4px) !important;
      border-color: var(--yellow) !important;
      box-shadow: 0 12px 24px rgba(245,197,24,0.15) !important;
    }
  </style>
`;

fs.writeFileSync('c:/sspl website/public/tracking.html', headAndNav + trackingContent + footer, 'utf8');
console.log('tracking.html generated.');

// Now add 'Tracking' to the navigation menu on all pages
const files = fs.readdirSync('c:/sspl website/public').filter(f => f.endsWith('.html'));

files.forEach(file => {
  const filePath = "c:/sspl website/public/" + file;
  let content = fs.readFileSync(filePath, 'utf8');

  // Prevent double adding
  if(!content.includes('tracking.html')) {
    // Nav links
    content = content.replace(/<a href="contact\.html">Contact Us<\/a>\s*<\/li>/i, '<a href="contact.html">Contact Us</a></li>\n        <li><a href="tracking.html">Tracking</a></li>');
    
    // Also inject for div-based menus if li isn't matching perfectly
    content = content.replace(/<a href="contact\.html">Contact Us<\/a>\s*<\/div>/i, '<a href="contact.html">Contact Us</a>\n        <a href="tracking.html">Tracking</a>\n      </div>');

    // Special catch just in case:
    if(!content.includes('tracking.html')) {
        content = content.replace('</ul>', '  <li><a href="tracking.html">Tracking</a></li>\n      </ul>');
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated nav in ' + file);
  }
});
