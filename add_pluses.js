const fs = require('fs');

function addPluses(file) {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');

  // 1. Hero stats
  content = content.replace(/data-count="300">0<\/div>/g, 'data-count="300">0<em>+</em></div>');
  content = content.replace(/data-count="43">0<\/div>/g, 'data-count="43">0<em>+</em></div>');
  content = content.replace(/data-count="8">0<\/div>/g, 'data-count="8">0<em>+</em></div>');

  // 2. Stat cards
  content = content.replace(/<div class="big">300<\/div>/g, '<div class="big">300<em>+</em></div>');
  content = content.replace(/<div class="big">43<\/div>/g, '<div class="big">43<em>+</em></div>');
  content = content.replace(/<div class="big">8<\/div>/g, '<div class="big">8<em>+</em></div>');

  fs.writeFileSync(file, content, 'utf8');
  console.log(`Added pluses to ${file}`);
}

addPluses('c:/sspl website/public/surat-sales.html');
addPluses('c:/sspl website/public/why.html');
