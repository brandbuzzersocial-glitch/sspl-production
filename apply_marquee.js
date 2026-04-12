const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

const additionalCSS = `
<style id="marquee-override">
  .partners-lbl {
    font-size: 28px !important;
    font-weight: 900 !important;
    color: var(--black, #1a1a1a) !important;
    margin-bottom: 32px !important;
    letter-spacing: 2px !important;
    text-transform: uppercase;
  }
  
  .partners-wrap {
    overflow: hidden !important;
    width: 100% !important;
    position: relative;
    padding: 10px 0;
  }
  
  /* Fade edges for the scrolling container */
  .partners-wrap::before, .partners-wrap::after {
    content: '';
    position: absolute;
    top: 0;
    width: 100px;
    height: 100%;
    z-index: 2;
    pointer-events: none;
  }
  .partners-wrap::before {
    left: 0;
    background: linear-gradient(to right, rgba(255,255,255,1), transparent);
  }
  .partners-wrap::after {
    right: 0;
    background: linear-gradient(to left, rgba(255,255,255,1), transparent);
  }
  
  div.partners-wrap div.partners, div.partners {
    display: flex !important;
    flex-wrap: nowrap !important;
    gap: 30px !important;
    width: max-content !important;
    overflow: visible !important;
    padding-bottom: 20px !important;
    animation: partnerScroll 40s linear infinite !important;
  }
  
  /* Stop animation on hover */
  div.partners:hover {
    animation-play-state: paused !important;
  }

  div.partners div.partner {
    flex: 0 0 auto !important; 
    width: 200px !important; 
    background: #fff;
    border: 1px solid #eaeaea;
    border-radius: 8px;
    padding: 24px 20px;
    display: flex !important;
    flex-direction: column !important;
    justify-content: center !important;
    align-items: center !important;
    box-shadow: 0 4px 10px rgba(0,0,0,0.03);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    font-weight: 700;
  }
  
  div.partners div.partner:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(245, 197, 24, 0.2);
    border-color: #F5C518;
  }

  @keyframes partnerScroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(calc(-50% - 15px)); }
  }
  
  div.partners::-webkit-scrollbar { display: none !important; }
</style>
`;

files.forEach(file => {
  const filePath = path.join(publicDir, file);
  let html = fs.readFileSync(filePath, 'utf-8');
  const $ = cheerio.load(html, { decodeEntities: false });

  let updated = false;

  // 1. Inject the CSS block if it doesn't exist
  if (!$('style#marquee-override').length) {
    $('head').append(additionalCSS);
    updated = true;
  } else {
    // Replace the old block if it exists (in case we run multiple times)
    $('style#marquee-override').replaceWith(additionalCSS);
    updated = true;
  }

  // 2. Double the inner content of .partners if not already doubled
  $('.partners').each((i, el) => {
    // If the class has "doubled" we might have already done it, but let's check class
    if (!$(el).hasClass('doubled')) {
      const innerContent = $(el).html();
      // append the cloned content to itself
      $(el).append(innerContent);
      $(el).addClass('doubled');
      updated = true;
    }
  });

  if (updated) {
    fs.writeFileSync(filePath, $.html(), 'utf-8');
    console.log(`Applied marquee and text sizes to ${file}`);
  }
});
console.log('Partner animation script finished!');
