const fs = require('fs');

function extractSectionBody(filepath) {
  if (!fs.existsSync(filepath)) return '';
  const html = fs.readFileSync(filepath, 'utf8');
  // the script earlier generated exact <section id="...">...</section> chunks
  // surrounded by </nav> and <footer>
  const startIdx = html.indexOf('</nav>') + 6;
  const endIdx = html.indexOf('<footer>');
  if (startIdx > 5 && endIdx !== -1) {
    return html.substring(startIdx, endIdx).trim();
  }
  return '';
}

// Extract the 4 required sections
const processSec = extractSectionBody('c:/sspl website/public/process.html');
const whySec = extractSectionBody('c:/sspl website/public/why.html');
const productsSec = extractSectionBody('c:/sspl website/public/products.html');
const sourcingSec = extractSectionBody('c:/sspl website/public/sourcing.html');

// Read current surat-sales.html
const homePath = 'c:/sspl website/public/surat-sales.html';
let homeHtml = fs.readFileSync(homePath, 'utf8');

// The current surat-sales.html only has the hero section between </nav> and <footer>
// We want to append these 4 sections immediately after the heroic section, before <footer>
const footerStart = homeHtml.indexOf('<footer>');

if (footerStart !== -1) {
  const topPart = homeHtml.substring(0, footerStart);
  const bottomPart = homeHtml.substring(footerStart);
  
  const combinedHome = topPart + '\n\n' + processSec + '\n\n' + whySec + '\n\n' + productsSec + '\n\n' + sourcingSec + '\n\n' + bottomPart;
  
  fs.writeFileSync(homePath, combinedHome, 'utf8');
  console.log('Successfully restored Process, Why Choose Us, Products, and Sourcing sections to the Home Page.');
} else {
  console.log('Failed to locate footer in surat-sales.html');
}
