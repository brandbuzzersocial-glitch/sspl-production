const fs = require('fs');

// Reference from about.html which has the correct CSS/Head
const aboutHtml = fs.readFileSync('c:/sspl website/public/about.html', 'utf8');
const headEndIdx = aboutHtml.indexOf('</head>') + 7;
const head = aboutHtml.substring(0, headEndIdx);

// The 3D Intro (standard across all pages, but only visible on home usually)
const intro = `
  <!-- ─── 3D INTRO ─── -->
  <div id="intro">
    <canvas id="intro-canvas-3d"></canvas>
    <div class="intro-text-wrap">
      <div class="intro-name">Surat Sales<span>Private Limited</span></div>
      <div class="intro-tag">Reliable Yarn Import &amp; Supply Across India</div>
      <div class="intro-progress">
        <div class="intro-bar"></div>
      </div>
    </div>
  </div>
`;

// Navigation (Cleaned up)
const nav = `
  <!-- MOBILE MENU -->
  <div class="mobile-menu" id="mobileMenu">
    <button class="mobile-close" onclick="closeMenu()">×</button>
    <a href="#hero" onclick="closeMenu()">Home</a>
    <a href="#products" onclick="closeMenu()">Products</a>
    <a href="about.html" onclick="closeMenu()">About</a>
    <a href="#process" onclick="closeMenu()">Process</a>
    <a href="contact.html" onclick="closeMenu()">Contact</a>
    <a href="tracking.html" onclick="closeMenu()">Tracking</a>
  </div>

  <!-- NAV -->
  <nav id="navbar">
    <a href="#hero" class="nav-logo">
      <img src="images/sspl_logo.jpg" alt="SSPL Logo" style="height:44px; width:auto; border-radius:4px;">
      <div class="nav-logo-name">Surat Sales<span>Private Limited</span></div>
    </a>
    <ul class="nav-links">
      <li><a href="#hero">Home</a></li>
      <li><a href="#products">Products</a></li>
      <li><a href="about.html">About</a></li>
      <li><a href="#process">Process</a></li>
      <li><a href="contact.html">Contact</a></li>
      <li><a href="tracking.html">Tracking</a></li>
    </ul>
    <a href="contact.html" class="btn-nav">Contact Us</a>
    <button class="hamburger" onclick="openMenu()"><span></span><span></span><span></span></button>
  </nav>
`;

// Hero with Video
const hero = `
<section id="hero">
    <div class="hero-left">
      <div class="hero-badge"><span class="badge-dot"></span>Trusted Yarn Importer · India</div>
      <h1 class="hero-h1">Reliable Yarn Import &amp;<br><em>Supply Across India</em></h1>
      <p class="hero-p">Your trusted partner for high-quality yarn solutions, connecting global manufacturers with the
        Indian market.</p>
      <div class="hero-btns">
        <a href="#products" class="btn-primary">View Products →</a>
        <a href="contact.html" class="btn-outline">Contact Us</a>
      </div>
      <div class="hero-stats">
        <div>
          <div class="stat-num" data-count="15">0<em>+</em></div>
          <div class="stat-lbl">Years in Business</div>
        </div>
        <div>
          <div class="stat-num" data-count="8">0<em>+</em></div>
          <div class="stat-lbl">Countries Sourced</div>
        </div>
        <div>
          <div class="stat-num" data-count="500">0<em>+</em></div>
          <div class="stat-lbl">Tons / Month</div>
        </div>
      </div>
    </div>
    <div class="hero-right">
      <video class="hero-img" autoplay muted loop playsinline poster="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=900&auto=format&fit=crop&q=80">
        <source src="https://assets.mixkit.co/videos/preview/mixkit-cargo-ship-sailing-in-the-ocean-26325-large.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
      <div class="hero-img-fade"></div>
      <div class="hero-card">
        <div class="hero-card-t">ISO Certified</div>
        <div class="hero-card-v">9001:2015</div>
        <div class="hero-card-s">Quality Management</div>
      </div>
    </div>
  </section>
`;

function extractSection(file, id) {
  if (!fs.existsSync(file)) return '';
  const content = fs.readFileSync(file, 'utf8');
  const startRegex = new RegExp('<section[^>]*id="' + id + '"[^>]*>', 'i');
  const match = content.match(startRegex);
  if (!match) return '';
  
  const startIndex = match.index;
  const remaining = content.substring(startIndex);
  
  // Find matching closing </section>
  let depth = 0;
  const tagRegex = /<(\/?)section[^>]*>/gi;
  let tagMatch;
  let endIndex = remaining.length;
  
  while ((tagMatch = tagRegex.exec(remaining)) !== null) {
     if (tagMatch[1] === '') depth++;
     else if (tagMatch[1] === '/') {
       depth--;
       if (depth === 0) {
         endIndex = tagMatch.index + tagMatch[0].length;
         break;
       }
     }
  }
  return remaining.substring(0, endIndex);
}

// Re-extract the intended sections from their standalone files
const processHTML = extractSection('c:/sspl website/public/process.html', 'process');
const whyHTML = extractSection('c:/sspl website/public/why.html', 'why');
const productsHTML = extractSection('c:/sspl website/public/products.html', 'products');
const sourcingHTML = extractSection('c:/sspl website/public/sourcing.html', 'sourcing');

// Footer
const footerIdx = aboutHtml.indexOf('<footer>');
const footer = aboutHtml.substring(footerIdx);

const finalHtml = `<!DOCTYPE html>
<html lang="en">
${head}
<body>
${intro}
${nav}
${hero}
${processHTML}
${whyHTML}
${productsHTML}
${sourcingHTML}
${footer}
</body>
</html>`;

fs.writeFileSync('c:/sspl website/public/surat-sales.html', finalHtml, 'utf8');
console.log('surat-sales.html successfully REBUILT with Hero Video and restored sections.');
