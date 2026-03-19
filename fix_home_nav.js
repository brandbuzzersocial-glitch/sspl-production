const fs = require('fs');
const homePath = 'c:/sspl website/public/surat-sales.html';
if (fs.existsSync(homePath)) {
  let content = fs.readFileSync(homePath, 'utf8');
  content = content.replace(/href="process.html"/g, 'href="#process"');
  content = content.replace(/href="why.html"/g, 'href="#why"');
  content = content.replace(/href="products.html"/g, 'href="#products"');
  content = content.replace(/href="sourcing.html"/g, 'href="#sourcing"');
  
  // Also, "Home" should point to #hero instead of surat-sales.html on the homepage
  content = content.replace(/href="surat-sales.html"/g, 'href="#hero"');
  
  fs.writeFileSync(homePath, content, 'utf8');
  console.log('Fixed navigation anchors on the homepage.');
}
