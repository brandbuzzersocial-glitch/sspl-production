const fs = require('fs');
const path = require('path');
const dir = path.join('c:/sspl website', 'public');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // 1. Replace the marquee-override CSS block
  const oldCSSRegex = /<style id="marquee-override">[\s\S]*?<\/style>/;
  const newCSS = `<style id="marquee-override">
  .partners-lbl-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px !important;
  }
  @media(max-width:600px) {
    .partners-lbl-wrap {
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
    }
  }
  .partners-lbl {
    font-size: 28px !important;
    font-weight: 900 !important;
    color: var(--black, #1a1a1a) !important;
    letter-spacing: 2px !important;
    text-transform: uppercase;
    margin-bottom: 0 !important;
  }
  .partners-nav-btns {
    display: flex;
    gap: 12px;
  }
  .partner-nav-btn {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: #fff;
    border: 1px solid #eaeaea;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 4px 10px rgba(0,0,0,0.03);
    transition: all 0.2s ease;
    color: #1a1a1a;
  }
  .partner-nav-btn:hover {
    background: #F5C518;
    color: #111;
    border-color: #F5C518;
    box-shadow: 0 4px 15px rgba(245, 197, 24, 0.3);
    transform: translateY(-2px);
  }
  .partners-wrap {
    width: 100% !important;
    position: relative;
    padding: 10px 0;
  }
  
  div.partners-wrap div.partners, div.partners {
    display: flex !important;
    flex-wrap: nowrap !important;
    gap: 30px !important;
    overflow-x: auto !important;
    scroll-behavior: smooth;
    padding-bottom: 20px !important;
    -ms-overflow-style: none; /* IE/Edge */
    scrollbar-width: none; /* Firefox */
  }
  div.partners::-webkit-scrollbar { display: none !important; }

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
</style>`;

  if (oldCSSRegex.test(content)) {
    content = content.replace(oldCSSRegex, newCSS);
    changed = true;
  }

  // 2. Replace the HTML:
  // We want to replace `<div class="partners-lbl">Our Valued Sourcing Partners</div>`
  // with the new `.partners-lbl-wrap`
  const oldHTML = '<div class="partners-lbl">Our Valued Sourcing Partners</div>';
  const newHTML = `<div class="partners-lbl-wrap">
          <div class="partners-lbl">Our Valued Sourcing Partners</div>
          <div class="partners-nav-btns">
            <button class="partner-nav-btn prev-btn" aria-label="Previous" onclick="const p = this.parentElement.parentElement.nextElementSibling; p.scrollBy({left: -230, behavior:'smooth'})">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button class="partner-nav-btn next-btn" aria-label="Next" onclick="const p = this.parentElement.parentElement.nextElementSibling; p.scrollBy({left: 230, behavior:'smooth'})">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
        </div>`;

  if (content.includes(oldHTML) && !content.includes('partners-lbl-wrap')) {
    content = content.replace(oldHTML, newHTML);
    changed = true;
  }

  // 3. Remove duplicate logos block
  const duplicateLogos = `
          <div class="partner"><img src="images/partners/Tongkun.webp" alt="Tongkun Group">Tongkun Group</div>
          <div class="partner"><img src="images/partners/Hengyi.webp" alt="Hengyi Petrochemical">Hengyi Petrochemical</div>
          <div class="partner"><img src="images/partners/Hengli.webp" alt="Hengli Group">Hengli Group</div>
          <div class="partner"><img src="images/partners/XFM.webp" alt="Xinfengming Group">Xinfengming Group</div>
          <div class="partner"><img src="images/partners/Wankai.webp" alt="Wankai">Wankai</div>
          <div class="partner"><img src="images/partners/Billion.webp" alt="Billion">Billion</div>
          <div class="partner"><img src="images/partners/Highsun.webp" alt="Highsun">Highsun</div>
          
          <div class="partner"><img src="images/partners/Jinlun.webp" alt="Jinlun">Jinlun</div>`;
          
  // To avoid whitespace errors, let's just make a regex to remove the second half of .partners if we see twin blocks
  // Since we know exactly where it is, it's easier to just match from Tongkun down to Jinlun and delete the 2nd occurance.
  if (content.includes('Tongkun Group')) {
    let parts = content.split('<div class="partner"><img src="images/partners/Tongkun.webp" alt="Tongkun Group">Tongkun Group</div>');
    if (parts.length > 2) {
      // There are duplicates! Remove everything after the second Tongkun up to the end of Jinlun
      const regexDupes = /<div class="partner"><img src="images\/partners\/Tongkun\.webp" alt="Tongkun Group">Tongkun Group<\/div>[\s\S]*?<div class="partner"><img src="images\/partners\/Jinlun\.webp" alt="Jinlun">Jinlun<\/div>/g;
      
      let matchCount = 0;
      content = content.replace(regexDupes, (match) => {
        matchCount++;
        if (matchCount === 2) {
          return ''; // Remove the second instance entirely!
        }
        return match;
      });
      changed = true;
    }
  }

  // Also remove 'doubled' class which is no longer needed
  if (content.includes('class="partners doubled"')) {
    content = content.replace('class="partners doubled"', 'class="partners"');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content);
    console.log('Updated ' + file);
  }
});
