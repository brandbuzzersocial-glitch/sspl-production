const fs = require('fs');
const path = require('path');
const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(publicDir, file);
  let html = fs.readFileSync(filePath, 'utf-8');
  let updated = false;

  const targetContent = `.jstep:nth-child(odd) .jstep-content,
      .jstep:nth-child(even) .jstep-content {
        order: 2;
        padding: 16px 0 16px 16px;
        text-align: left;
      }`;
  
  const replaceContent = `.jstep:nth-child(odd) .jstep-content,
      .jstep:nth-child(even) .jstep-content {
        order: 2;
        grid-column: 2;
        padding: 16px 0 16px 16px;
        text-align: left;
      }`;
      
  const targetMid = `.jstep:nth-child(odd) .jstep-mid,
      .jstep:nth-child(even) .jstep-mid {
        order: 1;
      }`;
      
  const replaceMid = `.jstep:nth-child(odd) .jstep-mid,
      .jstep:nth-child(even) .jstep-mid {
        order: 1;
        grid-column: 1;
      }`;

  if (html.includes(targetContent)) {
    html = html.replace(targetContent, replaceContent);
    updated = true;
  }
  
  if (html.includes(targetMid)) {
    html = html.replace(targetMid, replaceMid);
    updated = true;
  }

  if (updated) {
    fs.writeFileSync(filePath, html, 'utf-8');
    console.log('Fixed mobile journey grid layout in: ' + file);
  }
});
