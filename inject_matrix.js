const fs = require('fs');
const path = require('path');

const publicDir = 'c:/sspl website/public';

// The Technical Matrix HTML
const matrixHtml = `
  <div class="matrix-wrap reveal" style="margin-top: 60px;">
    <div class="matrix-header" style="text-align: center; margin-bottom: 40px;">
      <span class="sec-tag">Technical Specifications</span>
      <h2 class="sec-h2">Yarn Luster &amp; <em>Availability Matrix</em></h2>
      <p class="sec-p">A quick reference guide for luster availability across our core product range.</p>
    </div>
    <div style="overflow-x: auto; background: #fff; border-radius: 12px; box-shadow: var(--shadow); border: 1px solid #eee;">
      <table style="width: 100%; border-collapse: collapse; min-width: 600px; font-family: 'Plus Jakarta Sans', sans-serif;">
        <thead>
          <tr style="background: var(--bg-section); text-align: left;">
            <th style="padding: 20px; border-bottom: 2px solid #eee; color: var(--black); font-weight: 700;">Yarn Type</th>
            <th style="padding: 20px; border-bottom: 2px solid #eee; color: var(--black); font-weight: 700;">Semi Dull</th>
            <th style="padding: 20px; border-bottom: 2px solid #eee; color: var(--black); font-weight: 700;">Full Dull</th>
            <th style="padding: 20px; border-bottom: 2px solid #eee; color: var(--black); font-weight: 700;">Bright</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 18px 20px; font-weight: 600; color: var(--black);">POY (Mother Yarn)</td>
            <td style="padding: 18px 20px; color: #22C55E;">✅</td>
            <td style="padding: 18px 20px; color: var(--gray); font-size: 13px;">❌ (generally not made)</td>
            <td style="padding: 18px 20px; color: #22C55E;">✅</td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 18px 20px; font-weight: 600; color: var(--black);">FDY</td>
            <td style="padding: 18px 20px; color: #22C55E;">✅</td>
            <td style="padding: 18px 20px; color: #22C55E;">✅</td>
            <td style="padding: 18px 20px; color: #22C55E;">✅</td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 18px 20px; font-weight: 600; color: var(--black);">DTY</td>
            <td style="padding: 18px 20px; color: #22C55E;">✅</td>
            <td style="padding: 18px 20px; color: #22C55E;">✅</td>
            <td style="padding: 18px 20px; color: #22C55E;">✅</td>
          </tr>
          <tr>
            <td style="padding: 18px 20px; font-weight: 600; color: var(--black);">Fake Cotton (DTY type)</td>
            <td style="padding: 18px 20px; color: #22C55E;">✅ <span style="font-size: 12px; color: var(--gray);">(most common)</span></td>
            <td style="padding: 18px 20px; color: #22C55E;">✅</td>
            <td style="padding: 18px 20px; color: var(--gray); font-size: 13px;">❌ (rare)</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
`;

function injectMatrix(file) {
  const filePath = path.join(publicDir, file);
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  // Insert before the bulk banner or end of section
  if (content.includes('class="bulk-banner')) {
    content = content.replace(/<div class="bulk-banner/i, matrixHtml + '\n    <div class="bulk-banner');
  } else if (content.includes('</section>')) {
     // Find the last </section> of products
     const lastSectionIdx = content.lastIndexOf('</section>');
     content = content.substring(0, lastSectionIdx) + matrixHtml + '\n  ' + content.substring(lastSectionIdx);
  }

  // Also update luster text in cards if needed
  content = content.replace(/Semi-Dull, Bright/g, 'Semi Dull, Full Dull, Bright');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Injected matrix into ${file}`);
}

injectMatrix('surat-sales.html');
injectMatrix('products.html');
