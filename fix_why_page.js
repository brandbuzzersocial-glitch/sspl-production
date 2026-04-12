const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'public', 'why.html');
let html = fs.readFileSync(filePath, 'utf-8');

const regex = /<div class="why-feats">([\s\S]*?)<footer style="">/;

const newSection = `
<section id="why" style="background:var(--bg-section); padding: 100px 60px;">
  <div class="container" style="max-width: 1240px; margin: 0 auto;">
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 60px; align-items: start;">
      
      <div class="reveal-l">
        <div class="why-feats">
          <div class="why-feat">
             <div class="why-icon" style="color:var(--yellow-dark);"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                 <polyline points="20 6 9 17 4 12"></polyline>
               </svg></div>
             <div>
               <h4>Consistent Quality</h4>
               <p>Rigorous multi-stage quality control ensures every batch meets international standards.</p>
             </div>
           </div>
           <div class="why-feat">
             <div class="why-icon" style="color:var(--yellow-dark);"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                 <circle cx="12" cy="12" r="10"></circle>
                 <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path>
                 <path d="M12 18V6"></path>
               </svg></div>
             <div>
               <h4>Competitive Pricing</h4>
               <p>Benefit from our efficient direct sourcing to get the best value for your investment.</p>
             </div>
           </div>
           <div class="why-feat">
             <div class="why-icon" style="color:var(--yellow-dark);"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                 <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11v14H5z"></path>
                 <rect x="13" y="8" width="8" height="11" rx="1"></rect>
                 <circle cx="7.5" cy="17" r="1.5"></circle>
                 <circle cx="17.5" cy="17" r="1.5"></circle>
                 <path d="M13 10h4.5l1.5 3"></path>
               </svg></div>
             <div>
               <h4>Reliable Supply</h4>
               <p>Strong logistics and inventory management guarantee on-time delivery across India.</p>
             </div>
           </div>
           <div class="why-feat">
             <div class="why-icon" style="color:var(--yellow-dark);"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                 <circle cx="12" cy="12" r="10"></circle>
                 <path d="M2 12h20"></path>
                 <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
               </svg></div>
             <div>
               <h4>Strong Sourcing Network</h4>
               <p>Direct partnerships with top manufacturers in China for diverse and quality products.</p>
             </div>
           </div>
        </div>
      </div>
      
      <div class="reveal-r">
        <div class="stat-cards">
           <div class="stat-card">
             <div class="big">300<em>+</em></div>
             <div class="sm">Containers / Month</div>
           </div>
           <div class="stat-card">
             <div class="big">43<em>+</em></div>
             <div class="sm">Years in Business</div>
           </div>
           <div class="stat-card">
             <div class="big">8<em>+</em></div>
             <div class="sm">Countries Sourced</div>
           </div>
           <div class="stat-card">
             <div class="big">7–10</div>
             <div class="sm">Day Lead Time</div>
           </div>
        </div>
        
        <div class="checklist" style="margin-top:14px;">
           <h4 style="margin-bottom: 16px;">Our Commitment to Quality & Consistency</h4>
           
           <div class="cl-item">
             <div class="cl-check" style="display:flex;align-items:center;justify-content:center;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                 <polyline points="20 6 9 17 4 12"></polyline>
               </svg></div>Rigorous Multi-Stage Quality Checks
           </div>
           <div class="cl-item">
             <div class="cl-check" style="display:flex;align-items:center;justify-content:center;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                 <polyline points="20 6 9 17 4 12"></polyline>
               </svg></div>Consistent Yarn Denier & Luster
           </div>
           <div class="cl-item">
             <div class="cl-check" style="display:flex;align-items:center;justify-content:center;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                 <polyline points="20 6 9 17 4 12"></polyline>
               </svg></div>Traceable Supply Chain Transparency
           </div>
           <div class="cl-item">
             <div class="cl-check" style="display:flex;align-items:center;justify-content:center;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                 <polyline points="20 6 9 17 4 12"></polyline>
               </svg></div>Adherence to International Standards
           </div>
           <div class="cl-item">
             <div class="cl-check" style="display:flex;align-items:center;justify-content:center;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                 <polyline points="20 6 9 17 4 12"></polyline>
               </svg></div>Sustainable & Ethical Sourcing Practices
           </div>
        </div>
      </div>
      
    </div>
  </div>
</section>

<footer style="">`;

if (regex.test(html)) {
  html = html.replace(regex, newSection);
  fs.writeFileSync(filePath, html, 'utf-8');
  console.log('Successfully fixed the why choose us page layout!');
} else {
  console.log('Could not find the target broken section.');
}
