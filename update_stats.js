const fs = require('fs');

function updateStats(file) {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');

  // 1. Hero stats in surat-sales.html (order: Containers, Years, Countries)
  if (file.includes('surat-sales.html')) {
    // We want to reorder them or at least update them.
    // The user's order: 300 Containers, 43 Years, 8 Countries.
    
    // Replacement for the hero-stats block
    const heroStatsRegex = /<div class="hero-stats">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/i;
    const newHeroStats = `<div class="hero-stats">
        <div>
          <div class="stat-num" data-count="300">0</div>
          <div class="stat-lbl">Containers / Month</div>
        </div>
        <div>
          <div class="stat-num" data-count="43">0</div>
          <div class="stat-lbl">Years in Business</div>
        </div>
        <div>
          <div class="stat-num" data-count="8">0</div>
          <div class="stat-lbl">Countries</div>
        </div>
      </div>
    </div>`;
    
    content = content.replace(heroStatsRegex, newHeroStats);

    // 2. Why Choose Us stats in surat-sales.html
    const whyStatsRegex = /<div class="stat-cards">[\s\S]*?<\/div>\s*<\/div>/i;
    const newWhyStats = `<div class="stat-cards">
          <div class="stat-card">
            <div class="big">300</div>
            <div class="sm">Containers / Month</div>
          </div>
          <div class="stat-card">
            <div class="big">43</div>
            <div class="sm">Years in Business</div>
          </div>
          <div class="stat-card">
            <div class="big">8</div>
            <div class="sm">Countries</div>
          </div>
          <div class="stat-card">
            <div class="big">ISO</div>
            <div class="sm">9001 Certified</div>
          </div>
        </div>`;
    
    content = content.replace(whyStatsRegex, newWhyStats);
    
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated stats in ${file}`);
  } else if (file.includes('why.html')) {
    // For standalone why.html
    const whyStatsRegex = /<div class="stat-cards">[\s\S]*?<\/div>\s*<\/div>/i;
    const newWhyStats = `<div class="stat-cards">
          <div class="stat-card">
            <div class="big">300</div>
            <div class="sm">Containers / Month</div>
          </div>
          <div class="stat-card">
            <div class="big">43</div>
            <div class="sm">Years in Business</div>
          </div>
          <div class="stat-card">
            <div class="big">8</div>
            <div class="sm">Countries</div>
          </div>
          <div class="stat-card">
            <div class="big">ISO</div>
            <div class="sm">9001 Certified</div>
          </div>
        </div>`;
    
    content = content.replace(whyStatsRegex, newWhyStats);
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated stats in ${file}`);
  }
}

updateStats('c:/sspl website/public/surat-sales.html');
updateStats('c:/sspl website/public/why.html');
