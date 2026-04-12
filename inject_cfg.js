/**
 * inject_cfg.js
 * - Injects <script src="/js/cfg.js"></script> before </body> on all pages
 * - Adds data-cfg attributes to known contact/address elements
 */
const fs   = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir)
  .filter(f => f.endsWith('.html') && f !== 'admin.html');

// Map of text patterns → data-cfg keys (for text replacement)
const TEXT_REPLACEMENTS = [
  { selector: '.cd-v',    text: 'imports.suratsales@gmail.com',       key: 'contact.email' },
  { selector: '.cd-v',    text: '93747 13687',                         key: 'contact.phone' },
  { selector: '.cd-v',    text: '128, 4th Floor, Ring Road',           key: 'address.full',   partial: true },
  { selector: 'p',        text: 'imports.suratsales@gmail.com',        key: 'contact.email' },
  { selector: 'p',        text: 'Send message to +91-7990978282',      key: null }, // handled by href
];

files.forEach(file => {
  const filePath = path.join(publicDir, file);
  let html = fs.readFileSync(filePath, 'utf-8');
  const $ = cheerio.load(html, { decodeEntities: false });

  let changed = false;

  // 1. Inject cfg.js before </body> if not already there
  if (!html.includes('/js/cfg.js')) {
    $('body').append('<script src="/js/cfg.js"></script>');
    changed = true;
  }

  // 2. Add data-cfg to phone number text nodes
  $('*').contents().each(function () {
    if (this.type === 'text') {
      const text = this.data.trim();
      const parent = $(this.parent);
      
      if (text === '93747 13687' && !parent.attr('data-cfg')) {
        parent.attr('data-cfg', 'contact.phone');
        changed = true;
      }
      if (text === 'imports.suratsales@gmail.com' && !parent.attr('data-cfg')) {
        parent.attr('data-cfg', 'contact.email');
        changed = true;
      }
      if (text === '128, 4th Floor, Ring Road, Reshamwala Market, Surat, Gujarat – 395002' && !parent.attr('data-cfg')) {
        parent.attr('data-cfg', 'address.full');
        changed = true;
      }
      if (text === 'Surat, Gujarat – 395002' && !parent.attr('data-cfg')) {
        parent.attr('data-cfg', 'address.full');
        changed = true;
      }
    }
  });

  // 3. Add data-cfg-href to mailto and whatsapp links
  $('a[href^="mailto:"]').each(function () {
    if (!$(this).attr('data-cfg-href')) {
      $(this).attr('data-cfg-href', 'mailto:{contact.email}');
      changed = true;
    }
  });

  $('a[href^="https://wa.me/"]').each(function () {
    if (!$(this).attr('data-cfg-href')) {
      $(this).attr('data-cfg-href', 'https://wa.me/{contact.whatsapp}');
      changed = true;
    }
  });

  if (changed) {
    fs.writeFileSync(filePath, $.html(), 'utf-8');
    console.log(`✓ Injected cfg into ${file}`);
  } else {
    console.log(`  Skipped ${file} (no changes needed)`);
  }
});

console.log('\nDone! cfg.js is now active on all pages.');
