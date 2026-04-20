const fs = require('fs');
const path = require('path');
const dir = path.join('c:/sspl website', 'public');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Replace nav-logo href
  if (content.includes('<a href="#hero" class="nav-logo">')) {
    content = content.replace(/<a href="#hero" class="nav-logo">/g, '<a href="surat-sales.html" class="nav-logo">');
    changed = true;
  }

  // Replace footer logo div with anchor tag
  // We can just use string replacement for the exact current format.
  // We will replace `<div class="fb-logo">` with `<a href="surat-sales.html" class="fb-logo" style="display:block; text-decoration:none;">`
  // And we will replace `</div>\n        <div class="fb-desc">` with `</a>\n        <div class="fb-desc">` 
  // Wait, let's just use string replace carefully!
  if (content.includes('<div class="fb-logo">')) {
    content = content.replace('<div class="fb-logo"><img', '<a href="surat-sales.html" class="fb-logo" style="display:block; text-decoration:none;"><img');
    
    // Now replace the closing div that belongs to fb-logo
    // The format is:
    // <div class="fb-logo"><img ...>
    //   <div class="fb-name">...</div>
    // </div>
    // <div class="fb-desc">
    
    // To be safe, let's just replace `</div>\n        <div class="fb-desc">` with `</a>\n        <div class="fb-desc">`
    content = content.replace(/<\/div>\s*<div class="fb-desc">/g, '</a>\n        <div class="fb-desc">');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content);
    console.log('Updated ' + file);
  }
});
