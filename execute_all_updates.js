const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(publicDir, file);
  const html = fs.readFileSync(filePath, 'utf-8');
  const $ = cheerio.load(html);

  // 1. Process overall products list on all navigation lists & footer
  $('ul').each((i, ul) => {
    const text = $(ul).text();
    if (text.includes('POY') && text.includes('FDY') && text.includes('Fake Cotton')) {
      $(ul).empty();
      $(ul).append(`
          <li><a href="products.html">POY – SD, FD, Bright</a></li>
          <li><a href="products.html">FDY – SD, FD, Bright</a></li>
          <li><a href="products.html">DTY – Draw Textured</a></li>
          <li><a href="products.html">Fake Cotton Yarn</a></li>
          <li><a href="products.html">Nylon Mother Yarn – SD, Bright</a></li>
          <li><a href="products.html">PET Chips (Wankai)</a></li>
          <li><a href="products.html">PTA (Purified Terephthalic Acid)</a></li>
          <li><a href="products.html">PSF Yarn</a></li>
      `);
    }
  });

  // 2. Remove duplicate "About" and "Contact Us" on pages
  // Let's target nav lists specifically
  $('nav .nav-links').each((i, ul) => {
    let seenAbout = false;
    let seenContact = false;
    $(ul).find('li').each((j, el) => {
        let txt = $(el).text().trim().toLowerCase();
        if (txt === 'about') {
            if (seenAbout) $(el).remove();
            seenAbout = true;
        }
        if (txt.includes('contact us') || txt === 'contact') {
            if (seenContact) $(el).remove();
            seenContact = true;
        }
    });
  });

  // 3. Change single page scroll navigation to distinct pages
  $('nav .nav-links a, .mobile-menu a, .footer-links a, .fc a').each((i, a) => {
      let href = $(a).attr('href');
      if (!href) return;
      if(href === '#about') $(a).attr('href', 'about.html');
      if(href === '#contact') $(a).attr('href', 'contact.html');
      if(href === '#sourcing') $(a).attr('href', 'sourcing.html');
      if(href === '#process') $(a).attr('href', 'process.html');
      if(href === '#products' && file !== 'products.html') $(a).attr('href', 'products.html');
  });

  // 4. Email replacement
  $('*').contents().filter((i, el) => el.nodeType === 3).each((i, el) => {
     if(el.data.includes('Import.suratsales@gmail.com') || el.data.includes('import.suratsales@gmail.com')) {
         el.data = el.data.replace(/Import\.suratsales@gmail\.com/gi, 'imports.suratsales@gmail.com');
     }
  });

  // 5. Query form action to email
  $('form').each((i, f) => {
      $(f).attr('action', 'mailto:imports.suratsales@gmail.com');
      $(f).attr('method', 'post');
      $(f).attr('enctype', 'text/plain');
  });

  // 6. Global supply area wording
  $('.fb-desc').each((i, div) => {
      $(div).text('Reliable Yarn Import & Supply Across India from Global Sourcing. Your trusted textile raw material partner for imports and exports globally.');
  });
  
  // Update sourcing intro if exists
  $('#sourcing .sec-p').each((i, p) => {
    if($(p).text().includes('India')) {
        $(p).text('We procure premium yarn from top-tier international manufacturers directly, ensuring high standards for global supply and exports worldwide.');
    }
  });

  // 7. Remove Wanghong
  $('.partner').each((i, p) => {
     if($(p).text().includes('Wanghong')) {
         $(p).remove();
     }
  });

  // 8. Jinlun Shanli -> Jinlun
  $('.partner').each((i, p) => {
     if($(p).text().toLowerCase().includes('jinlun')) {
         let htmlContent = $(p).html();
         $(p).html(htmlContent.replace(/Jinlun\s*shanli/gi, 'Jinlun'));
         $(p).find('img').attr('alt', 'Jinlun');
     }
  });

  // 9. Remove GST number
  $('.footer-gstin').remove();
  $('li:contains("GSTIN: 24AADCS1500K1ZR")').remove();
  $('li:contains("GSTIN")').remove();
  $('.cd-l:contains("GSTIN")').each((i, el) => {
      $(el).next('.cd-v').remove(); // value
      $(el).remove(); // label
  });

  // 10. Fix product cards in surat-sales.html and products.html
  if (file === 'surat-sales.html' || file === 'products.html') {
      // Update POY specs
      $('.pcard-type:contains("POY")').text('Polyester · POY (SD, FD, Bright)');
      // Update FDY specs
      $('.pcard-type:contains("FDY")').text('Polyester · FDY (SD, FD, Bright)');
      // Update Mother Yarn specs
      $('.pcard-type:contains("Mother Yarn")').text('Specialty · Nylon Mother Yarn (SD, Bright)');
      
      // Remove Nylon DTY
      $('.pcard-type:contains("Nylon · DTY")').closest('.pcard').remove();
      
      // Remove DTY Nylon from table too
      $('td:contains("Nylon DTY")').closest('tr').remove();
      $('img[alt="Nylon DTY"]').closest('.pcard').remove();

      // Add new products to .pgrid
      let pgrid = $('#pgrid');
      if (pgrid.length) {
         let newCards = `
<div class="pcard reveal" data-cat="specialty">
  <div class="pcard-body">
    <div class="pcard-type">Raw Material · PET Chips</div>
    <div class="pcard-name">PET Chips (Wankai)</div>
    <div class="pcard-desc">Premium quality PET Chips for varied textile and packaging applications.</div>
    <button class="pcard-btn" onclick="window.location.href='contact.html'">Request Quote →</button>
  </div>
</div>
<div class="pcard reveal" data-cat="specialty">
  <div class="pcard-body">
    <div class="pcard-type">Raw Material · PTA</div>
    <div class="pcard-name">PTA (Purified Terephthalic Acid)</div>
    <div class="pcard-desc">Essential raw material for producing high-quality polyester.</div>
    <button class="pcard-btn" onclick="window.location.href='contact.html'">Request Quote →</button>
  </div>
</div>
<div class="pcard reveal" data-cat="polyester">
  <div class="pcard-body">
    <div class="pcard-type">Polyester · PSF Yarn</div>
    <div class="pcard-name">PSF Yarn</div>
    <div class="pcard-desc">Polyester Staple Fiber Yarn for blending and general applications.</div>
    <button class="pcard-btn" onclick="window.location.href='contact.html'">Request Quote →</button>
  </div>
</div>`;
         if(!pgrid.html().includes('PET Chips (Wankai)')) {
             pgrid.append(newCards);
         }
      }
  }

  // Inject CSS directly to <style> block or head
  
  const additionalCSS = `
    /* Improved Hero Image */
    .hero-img { filter: brightness(1) contrast(1.1) saturate(1.2) !important; }
    .hero-img-fade { background: linear-gradient(to right, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0) 50%) !important; }
    
    /* Footer Styling Improvements */
    footer { background: #0A0A0A !important; color: #f5f5f5 !important; border-top: none !important; }
    footer h5 { color: #F5C518 !important; }
    footer ul li a { color: #ccc !important; }
    footer ul li a:hover { color: #fff !important; }
    /* Form input alignment */
    .contact-form .fg { display: flex; flex-direction: column; align-items: stretch; justify-content: flex-start; }
    .contact-form textarea { min-height: 120px; }
    .form-row { display: flex; gap: 16px; flex-wrap: wrap; }
    .form-row > * { flex: 1; min-width: 250px; }
    
    /* Process Flow Color Tweaks */
    .psb-fill { background: linear-gradient(90deg, #F5C518, #FF512F) !important; }
    .journey-line-fill { background: linear-gradient(to bottom, #F5C518, #FF512F) !important; }
    .jstep-node.active .jstep-icon { background: #F5C518 !important; color: #111 !important; box-shadow: 0 0 15px rgba(245,197,24,0.5) !important; }
    
    /* Global Adjustments */
    .fb-desc, .cd-v { color: #d0d0d0 !important; }
  `;
  
  if ($('style').length) {
      $('style').first().append(additionalCSS);
  } else {
      $('head').append('<style>' + additionalCSS + '</style>');
  }

  fs.writeFileSync(filePath, $.html({ decodeEntities: false }), 'utf-8');
});

console.log('Cheerio complex DOM modifications applied.');
