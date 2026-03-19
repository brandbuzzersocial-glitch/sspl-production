const fs = require('fs');
const html = fs.readFileSync('c:/sspl website/public/surat-sales.html', 'utf8');

const regex = /<section[^>]*id="([^"]+)"[^>]*>/g;
let match;
const sections = [];

while ((match = regex.exec(html)) !== null) {
  sections.push(match[1]);
}

console.log("Sections found:");
console.log(sections);
