const fs = require('fs');
const path = require('path');
const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

const targetStr = `.jstep-canvas-wrap {
        display: none;
      }`;

const replaceStr = `.jstep-canvas-wrap {
        display: flex;
        justify-content: center;
        grid-column: 1 / -1;
        order: 3;
        margin-top: 12px;
        width: 100%;
      }
      .jstep-canvas {
        max-width: 100%;
        height: auto;
      }`;

files.forEach(file => {
  const filePath = path.join(publicDir, file);
  let html = fs.readFileSync(filePath, 'utf-8');
  
  if (html.includes(targetStr)) {
    let newHtml = html.replace(targetStr, replaceStr);
    fs.writeFileSync(filePath, newHtml, 'utf-8');
    console.log('Fixed animation display in: ' + file);
  }
});
