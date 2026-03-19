const fs = require('fs');

const mainFile = 'c:/sspl website/public/surat-sales.html';
const productsFile = 'c:/sspl website/public/products.html';

const html = fs.readFileSync(mainFile, 'utf8');

// The layout boundaries for products.html (it needs the full head and nav)
const headEndIdx = html.indexOf('</nav>') + 6;
const footerStartIdx = html.indexOf('<footer>');

const headAndNav = html.substring(0, headEndIdx);
const footer = html.substring(footerStartIdx);

// Extract the products section correctly
const sectionStartRegex = /<section[^>]*id="products"[^>]*>/i;
const match = html.match(sectionStartRegex);
if (!match) {
  console.error('Could not find products section in surat-sales.html');
  process.exit(1);
}

const sectionStartIdx = match.index;
const remaining = html.substring(sectionStartIdx);

// Find matching closing </section>
let depth = 0;
const tagRegex = /<(\/?)section[^>]*>/gi;
let tagMatch;
let sectionEndIdx = remaining.length;

while ((tagMatch = tagRegex.exec(remaining)) !== null) {
   if (tagMatch[1] === '') depth++;
   else if (tagMatch[1] === '/') {
     depth--;
     if (depth === 0) {
       sectionEndIdx = tagMatch.index + tagMatch[0].length;
       break;
     }
   }
}
let productsHTML = remaining.substring(0, sectionEndIdx);

// Perform the text updates for descriptions
productsHTML = productsHTML.replace(
  /Polyester Partially Oriented Yarn<\/div>\s*<div class="pcard-desc">Versatile raw material for texturizing, suitable for DTY production. High strength and\s*elongation\.<\/div>/g,
  'Polyester Partially Oriented Yarn</div>\n          <div class="pcard-desc">Versatile raw material for texturizing, suitable for DTY production. Available in Semi Dull and Bright lusters.</div>'
);

productsHTML = productsHTML.replace(
  /Polyester Fully Drawn Yarn<\/div>\s*<div class="pcard-desc">Ready-to-use yarn for weaving and knitting\. Excellent strength, uniformity, and\s*superior luster\.<\/div>/g,
  'Polyester Fully Drawn Yarn</div>\n          <div class="pcard-desc">Ready-to-use yarn for weaving and knitting. Excellent strength and uniformity. Available in Semi Dull, Full Dull, and Bright lusters.</div>'
);

productsHTML = productsHTML.replace(
  /Polyester Drawn Textured Yarn<\/div>\s*<div class="pcard-desc">Texturized yarn with high elasticity and soft feel\. Ideal for apparel and home\s*textiles\.<\/div>/g,
  'Polyester Drawn Textured Yarn</div>\n          <div class="pcard-desc">Texturized yarn with high elasticity and soft feel. Ideal for apparel and home textiles. Available in Semi Dull, Full Dull, and Bright lusters.</div>'
);

productsHTML = productsHTML.replace(
  /Fake Cotton Yarn<\/div>\s*<div class="pcard-desc">Polyester yarn that mimics cotton's feel and appearance\. Durable, easy-care for\s*sportswear and casual wear\.<\/div>/g,
  'Fake Cotton Yarn</div>\n          <div class="pcard-desc">Premium texturized polyester yarn with a soft, natural hand-feel. Superior durability and easy-care, ideal for elite sportswear and fashion. Available in Semi Dull and Full Dull lusters.</div>'
);

productsHTML = productsHTML.replace(
  /Nylon Drawn Textured Yarn<\/div>\s*<div class="pcard-desc">Strong and resilient yarn offering excellent stretch and recovery for activewear and\s*hosiery\.<\/div>/g,
  'Nylon Drawn Textured Yarn</div>\n          <div class="pcard-desc">Strong and resilient yarn offering excellent stretch and recovery for activewear and hosiery. Available in Semi Dull and Bright lusters.</div>'
);

const finalHTML = `<!DOCTYPE html>
<html lang="en">
${headAndNav}

<div style="padding-top: 80px;"></div>

${productsHTML}

${footer}
</body>
</html>`;

fs.writeFileSync(productsFile, finalHTML, 'utf8');
// Also update back to surat-sales.html for consistency
const updatedHomeHTML = html.substring(0, sectionStartIdx) + productsHTML + html.substring(sectionStartIdx + sectionEndIdx);
fs.writeFileSync(mainFile, updatedHomeHTML, 'utf8');

console.log('Restored and updated products.html and synchronized surat-sales.html');
