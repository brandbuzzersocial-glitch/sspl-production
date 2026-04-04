const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(publicDir, file);
  const html = fs.readFileSync(filePath, 'utf-8');
  
  // Quick string replacement that preserves HTML entity exactly
  let newHtml = html.replace(/sz=128/g, 'sz=512');
  
  // Some occurrences might have '&amp;sz=128', the regex covers 'sz=128' anyway
  
  // For Jinlun logo, if the old domain "fjsjlgx.com" only gives bad logos, maybe search web, but clearbit handles 512px natively.
  
  fs.writeFileSync(filePath, newHtml, 'utf-8');
});

console.log('HD Logos updated in all HTML files.');
