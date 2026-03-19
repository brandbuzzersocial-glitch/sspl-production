const fs = require('fs');
const path = require('path');

const publicDir = 'c:/sspl website/public';
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(publicDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  const oldStart = '(function initIntro3D() {';
  const newStart = `(function initIntro3D() {
      const intro = document.getElementById('intro');
      if (sessionStorage.getItem('introPlayed')) {
        if (intro) intro.style.display = 'none';
        if (typeof startCounters === 'function') {
           // Small delay to ensure other scripts are ready
           setTimeout(startCounters, 100);
        }
        return;
      }
      `;
  
  if (content.includes(oldStart) && !content.includes('sessionStorage.getItem(\'introPlayed\')')) {
    content = content.replace(oldStart, newStart);
    
    content = content.replace(/setTimeout\(\(\) => { intro.style.display = 'none'; startCounters\(\); }, 950\);/g, 
      "setTimeout(() => { intro.style.display = 'none'; sessionStorage.setItem('introPlayed', 'true'); startCounters(); }, 950);");
    
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated intro logic in ${file}`);
  }
});
