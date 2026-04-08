const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

const button3DCSS = `
  /* 3D INTERACTIVE BUTTONS */
  .btn-primary, .btn-nav, .pcard-btn, button[type="submit"] {
    background: linear-gradient(180deg, #FAD961 0%, #F5C518 100%) !important;
    color: #1a1a1a !important;
    border: none !important;
    box-shadow: 0 4px 0 #C49800, 0 8px 15px rgba(245, 197, 24, 0.3) !important;
    border-radius: 8px !important;
    transition: all 0.15s ease-in-out !important;
    text-shadow: 0 1px 1px rgba(255,255,255,0.4);
    font-weight: 700 !important;
    cursor: pointer !important;
    position: relative;
    top: 0;
  }
  
  .btn-primary:hover, .btn-nav:hover, .pcard-btn:hover, button[type="submit"]:hover {
    transform: translateY(-2px) !important;
    box-shadow: 0 6px 0 #C49800, 0 12px 20px rgba(245, 197, 24, 0.4) !important;
    background: linear-gradient(180deg, #FBE283 0%, #F5C518 100%) !important;
  }
  
  .btn-primary:active, .btn-nav:active, .pcard-btn:active, button[type="submit"]:active {
    transform: translateY(4px) !important;
    box-shadow: 0 0 0 #C49800, 0 2px 5px rgba(245, 197, 24, 0.2) !important;
  }
  
  .btn-outline {
    position: relative;
    background-color: #111 !important;
    color: #F5C518 !important;
    border: 2px solid #FAD961 !important;
    box-shadow: 0 4px 0 #C49800, 0 8px 15px rgba(0, 0, 0, 0.3) !important;
    transition: all 0.15s ease-in-out !important;
    font-weight: 700 !important;
    border-radius: 8px !important;
    cursor: pointer !important;
    top: 0;
  }
  
  .btn-outline:hover {
    transform: translateY(-2px) !important;
    box-shadow: 0 6px 0 #C49800, 0 12px 20px rgba(0, 0, 0, 0.4) !important;
    background-color: #1a1a1a !important;
    color: #FBE283 !important;
    border-color: #FBE283 !important;
  }
  
  .btn-outline:active {
    transform: translateY(4px) !important;
    box-shadow: 0 0 0 #C49800, 0 2px 5px rgba(0, 0, 0, 0.2) !important;
  }
  
  /* Prevent outline shifting links strangely */
  a.btn-primary, a.btn-outline, a.btn-nav, a.pcard-btn {
      display: inline-block;
  }
`;

files.forEach(file => {
  const filePath = path.join(publicDir, file);
  const html = fs.readFileSync(filePath, 'utf-8');
  const $ = cheerio.load(html);

  let styleHtml = $('style').first().html() || '';
  
  if (styleHtml.includes('/* 3D INTERACTIVE BUTTONS */')) {
      styleHtml = styleHtml.replace(/\/\* 3D INTERACTIVE BUTTONS \*\/[\s\S]*?(<\/style>|$)/g, '');
  }
  
  $('style').first().html(styleHtml);

  if ($('style').length) {
      $('style').first().append(button3DCSS);
  } else {
      $('head').append('<style>' + button3DCSS + '</style>');
  }

  // Find buttons that might not have the correct classes and attach styling globally if necessary. 
  // However target classes (.btn-primary, etc.) cover mostly everything.
  
  fs.writeFileSync(filePath, $.html({ decodeEntities: false }), 'utf-8');
  console.log(`Updated 3D buttons in ${file}`);
});
