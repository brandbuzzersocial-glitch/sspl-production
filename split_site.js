const fs = require('fs');

const mainFile = 'c:/sspl website/public/surat-sales.html';
const html = fs.readFileSync(mainFile, 'utf8');

// The layout boundaries
const navEndIdx = html.indexOf('</nav>') + 6;
const footerStartIdx = html.indexOf('<footer>');

const headAndNav = html.substring(0, navEndIdx);
const footer = html.substring(footerStartIdx);

const sectionsToExtract = [
  'process', 'products', 'why', 'sourcing', 'timeline', 'contact'
];

// Helper to extract a section block
function extractSection(id) {
  const startRegex = new RegExp(`<section[^>]*id="${id}"[^>]*>`, 'i');
  const match = html.match(startRegex);
  if (!match) return null;
  
  let depth = 0;
  let inSection = false;
  let startIndex = match.index;
  
  // Use a simple matching to find the closing </section>
  const remaining = html.substring(startIndex);
  const tagRegex = /<(\/?)section[^>]*>/gi;
  
  let tagMatch;
  let endIndex = remaining.length;
  
  while ((tagMatch = tagRegex.exec(remaining)) !== null) {
     if (tagMatch[1] === '') {
       depth++;
     } else if (tagMatch[1] === '/') {
       depth--;
       if (depth === 0) {
         endIndex = tagMatch.index + tagMatch[0].length;
         break;
       }
     }
  }
  
  return remaining.substring(0, endIndex);
}

// 1. Create separate pages for each section
sectionsToExtract.forEach(id => {
  const secHTML = extractSection(id);
  if (secHTML) {
    const pageHTML = headAndNav + '\n\n' + secHTML + '\n\n' + footer;
    fs.writeFileSync(`c:/sspl website/public/${id}.html`, pageHTML, 'utf8');
    console.log(`Created ${id}.html`);
  } else {
    console.log(`WARNING: Could not extract section ${id}`);
  }
});

// 2. Combine About and About page (labels)
const oldAboutHTML = extractSection('about');
const aboutFilePath = 'c:/sspl website/public/about.html';
if (fs.existsSync(aboutFilePath) && oldAboutHTML) {
  let aboutPage = fs.readFileSync(aboutFilePath, 'utf8');
  
  // Insert the oldAboutHTML right before the Meet the Directors section or right after the Hero.
  // The about.html has: "<!-- ABOUT THE COMPANY PLACEHOLDER -->\n  <section style"
  // Let's replace the placeholder section completely with the oldAboutHTML
  const placeholderRegex = /<!-- ABOUT THE COMPANY PLACEHOLDER -->[\s\S]*?(?=<!-- MEET THE DIRECTORS -->)/i;
  
  if (placeholderRegex.test(aboutPage)) {
    aboutPage = aboutPage.replace(placeholderRegex, `<!-- ORIGINAL ABOUT SECTION -->\n${oldAboutHTML}\n\n  `);
    fs.writeFileSync(aboutFilePath, aboutPage, 'utf8');
    console.log('Combined About & About page!');
  } else {
    console.log('Could not find placeholder in about.html to merge original about section.');
  }
}

// 3. Keep ONLY Hero in surat-sales.html (or just let it be, wait: "create seperate pages for each section")
// I will extract hero and make surat-sales.html just hero, or index.html.
const heroHTML = extractSection('hero');
if (heroHTML) {
  const heroPageHTML = headAndNav + '\n\n' + heroHTML + '\n\n' + footer;
  fs.writeFileSync(mainFile, heroPageHTML, 'utf8');
  console.log('Updated surat-sales.html to contain only Hero section.');
}

// 4. Update the Navigation Links globally across all newly created HTML files in public/
const files = fs.readdirSync('c:/sspl website/public').filter(f => f.endsWith('.html'));

files.forEach(file => {
  const filePath = `c:/sspl website/public/${file}`;
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace references like href="#about" with href="about.html"
  content = content.replace(/href="#about"/g, 'href="about.html"');
  content = content.replace(/href="#process"/g, 'href="process.html"');
  content = content.replace(/href="#products"/g, 'href="products.html"');
  content = content.replace(/href="#why"/g, 'href="why.html"');
  content = content.replace(/href="#timeline"/g, 'href="timeline.html"');
  content = content.replace(/href="#contact"/g, 'href="contact.html"');
  content = content.replace(/href="#hero"/g, 'href="surat-sales.html"'); // 'hero' maps to home
  
  // Maybe there are other links to fix.
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated navigation links in ${file}`);
});

console.log('All Done!');

