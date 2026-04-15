const fs = require('fs');
const path = require('path');
const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

const baseDescription = "Surat Sales Private Limited - Reliable Yarn Import & Supply Across India. Delivering premium yarn solutions, POY, FDY, DTY, PSF, connecting global manufacturers with a strong global sourcing network.";
const baseKeywords = "Surat Sales, yarn import India, textile raw material, POY, FDY, DTY, PSF, polyester yarn, nylon yarn, Wankai PET chips, global yarn sourcing";
const defaultImage = "https://yourdomain.com/images/sspl_logo.jpg"; // Placeholder URL, standard practice for OG image

files.forEach(file => {
  const filePath = path.join(publicDir, file);
  let html = fs.readFileSync(filePath, 'utf-8');

  // Skip if already contains SEO tags (rudimentary check)
  if (html.includes('<meta name="description"')) return;

  // Extract Title to use in OG tags
  const titleMatch = html.match(/<title>(.*?)<\/title>/);
  const title = titleMatch ? titleMatch[1] : 'Surat Sales Private Limited';

  const seoTags = `
  <!-- SEO Metadata -->
  <meta name="description" content="${baseDescription}">
  <meta name="keywords" content="${baseKeywords}">
  
  <!-- Open Graph / Social -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${baseDescription}">
  <meta property="og:image" content="${defaultImage}">
  <meta property="og:site_name" content="Surat Sales Private Limited">
  
  <!-- Twitter Cards -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${baseDescription}">
  <meta name="twitter:image" content="${defaultImage}">
  <meta name="robots" content="index, follow">`;

  // Inject right after the <title> tag
  if (titleMatch) {
    html = html.replace(titleMatch[0], titleMatch[0] + seoTags);
    fs.writeFileSync(filePath, html, 'utf-8');
    console.log('Added SEO tags to ' + file);
  }
});
