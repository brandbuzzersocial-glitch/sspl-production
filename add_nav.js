const fs = require('fs');

function addAboutLink(file) {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('about.html')) {
    console.log(`Already has about link in ${file}`);
    return;
  }

  // Find the nav links ul
  const linksRegex = /<ul class="nav-links">[\s\S]*?<\/ul>/;
  const match = content.match(linksRegex);
  
  if (match) {
    const ulBlock = match[0];
    const newUlBlock = ulBlock.replace('</ul>', '  <li><a href="about.html">About</a></li>\n      </ul>');
    content = content.replace(ulBlock, newUlBlock);
    
    // Also add to mobile menu
    const mobileRegex = /<div class="mobile-menu"[^>]*>[\s\S]*?<\/div>/;
    const mMatch = content.match(mobileRegex);
    if(mMatch) {
      const mbBlock = mMatch[0];
      const newMbBlock = mbBlock.replace('</div>', '  <a href="about.html" onclick="toggleMenu()">About</a>\n    </div>');
      content = content.replace(mbBlock, newMbBlock);
    }
    
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated nav in ${file}`);
  } else {
    // maybe it doesn't use ul
    const navTextRegex = /<div class="nav-links">[\s\S]*?<\/div>/;
    const nMatch = content.match(navTextRegex);
    if (nMatch) {
       const block = nMatch[0];
       const newBlock = block.replace('</div>', '  <a href="about.html">About</a>\n      </div>');
       content = content.replace(block, newBlock);
       fs.writeFileSync(file, content, 'utf8');
       console.log(`Updated div nav in ${file}`);
    } else {
       console.log(`Could not find nav-links in ${file}`);
    }
  }
}

addAboutLink('c:/sspl website/public/surat-sales.html');
addAboutLink('c:/sspl website/public/about.html');
