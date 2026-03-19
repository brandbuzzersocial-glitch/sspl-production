const fs = require('fs');
const path = require('path');

const publicDir = 'c:/sspl website/public';
const files = fs.readdirSync(publicDir);

files.forEach(file => {
  if (file.endsWith('.html')) {
    const filePath = path.join(publicDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace "About Us" with "About" in navigation and footer
    // We want to be careful not to replace it if it's in the middle of a sentence that makes sense as "About Us"
    // but usually in this site it's a menu label.
    // Let's target common patterns like ">About Us</a>", ">About Us</li>", "About Us</h5>"
    
    let original = content;
    content = content.replace(/>About Us<\/a>/g, '>About</a>');
    content = content.replace(/'About Us'/g, "'About'");
    content = content.replace(/"About Us"/g, '"About"');
    
    // Check for "About Us" in headers or lists
    content = content.replace(/About Us<\/h5>/g, 'About</h5>');
    content = content.replace(/About Us<\/h2>/g, 'About</h2>');
    content = content.replace(/About Us<\/title>/g, 'About</title>');

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated ${file}`);
    }
  }
});
