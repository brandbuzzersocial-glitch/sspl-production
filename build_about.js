const fs = require('fs');

const path = 'c:/sspl website/public/about.html';
let html = fs.readFileSync(path, 'utf8');

const navEndIdx = html.indexOf('</nav>') + 6;
const footerStartIdx = html.indexOf('<footer>');

if (navEndIdx > 5 && footerStartIdx > -1) {
  const top = html.substring(0, navEndIdx);
  const bottom = html.substring(footerStartIdx);

  const aboutContent = `
  <!-- ABOUT HERO -->
  <section style="padding-top: 120px; background: var(--bg-section); text-align: center;">
    <div class="container">
      <span class="sec-tag">About Surat Sales</span>
      <h1 class="sec-h2" style="margin-bottom: 16px;">Our Story &amp; Leadership</h1>
      <p class="sec-p" style="margin: 0 auto;">Discover the vision and the people behind our decades of growth.</p>
    </div>
  </section>

  <!-- ABOUT THE COMPANY PLACEHOLDER -->
  <section style="background: var(--bg);">
    <div class="container" style="text-align: center; border: 2px dashed var(--border); padding: 60px; border-radius: var(--radius);">
      <h2 class="sec-h2" style="font-size: 24px; margin-bottom: 16px;">[Placeholder: About the Company]</h2>
      <p class="sec-p" style="margin: 0 auto;">Company history, vision, and operational highlights will be displayed here.</p>
    </div>
  </section>

  <!-- MEET THE DIRECTORS -->
  <section style="background: var(--bg-light);">
    <div class="container">
      <div style="text-align: center; margin-bottom: 60px;">
        <span class="sec-tag">Leadership</span>
        <h2 class="sec-h2">Meet Our <em>Directors</em></h2>
      </div>

      <div style="display: flex; flex-direction: column; gap: 40px; max-width: 900px; margin: 0 auto;">
        
        <!-- Rajkumar Agarwal -->
        <div style="background: #fff; border: 1px solid var(--border); border-radius: var(--radius); padding: 40px; box-shadow: var(--shadow); display: flex; gap: 40px; align-items: center; flex-wrap: wrap;">
          <div style="flex: 0 0 200px; height: 250px; background: #EEE; border-radius: var(--radius-sm); border: 2px dashed #CCC; display: flex; align-items: center; justify-content: center; text-align: center; color: var(--gray);">
            [Image Placeholder]<br>Rajkumar Agarwal
          </div>
          <div style="flex: 1;">
            <h3 style="font-size: 24px; font-weight: 800; color: var(--black);">Rajkumar Agarwal</h3>
            <div style="font-weight: 700; color: var(--yellow-dark); margin-bottom: 16px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Founder</div>
            <p style="color: var(--gray); font-size: 15px; margin-bottom: 12px; line-height: 1.7;">Rajkumar Agarwal founded Surat Sales in 1984 with the vision of building a reliable and trusted business in the textile industy. With decades of experience and deep understanding of the textile industry, he established the company on the principles of integrity, quality, and long-term relationships.</p>
            <p style="color: var(--gray); font-size: 15px; margin-bottom: 12px; line-height: 1.7;">Through his leadership and entrepreneurial spirit, the company developed strong relationships with suppliers and customers across the textile sector. His commitment to dependable service and consistent quality helped lay the foundation for the company’s steady growth over the years.</p>
            <p style="color: var(--gray); font-size: 15px; line-height: 1.7;">Today, his vision and values continue to guide the company as it serves textile manufacturers and wholesalers across India.</p>
          </div>
        </div>

        <!-- Nitin Agarwal -->
        <div style="background: #fff; border: 1px solid var(--border); border-radius: var(--radius); padding: 40px; box-shadow: var(--shadow); display: flex; gap: 40px; align-items: center; flex-wrap: wrap;">
          <div style="flex: 0 0 200px; height: 250px; background: #EEE; border-radius: var(--radius-sm); border: 2px dashed #CCC; display: flex; align-items: center; justify-content: center; text-align: center; color: var(--gray);">
            [Image Placeholder]<br>Nitin Agarwal
          </div>
          <div style="flex: 1;">
            <h3 style="font-size: 24px; font-weight: 800; color: var(--black);">Nitin Agarwal</h3>
            <div style="font-weight: 700; color: var(--yellow-dark); margin-bottom: 16px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Director</div>
            <p style="color: var(--gray); font-size: 15px; margin-bottom: 12px; line-height: 1.7;">Nitin Agarwal holds both B.Tech and M.Tech degrees in Computer Science and Engineering from the prestigious Indian Institute of Technology Delhi. With a strong academic foundation in technology and analytical problem-solving, he brings a strategic and systems-oriented approach to the business.</p>
            <p style="color: var(--gray); font-size: 15px; line-height: 1.7;">At the company, Nitin focuses on strengthening operational processes, improving supply chain efficiency, and supporting long-term strategic planning. His technical mindset and structured approach help enhance operational reliability and ensure smooth coordination with international suppliers and domestic clients.</p>
          </div>
        </div>

        <!-- Vishal Agarwal -->
        <div style="background: #fff; border: 1px solid var(--border); border-radius: var(--radius); padding: 40px; box-shadow: var(--shadow); display: flex; gap: 40px; align-items: center; flex-wrap: wrap;">
          <div style="flex: 0 0 200px; height: 250px; background: #EEE; border-radius: var(--radius-sm); border: 2px dashed #CCC; display: flex; align-items: center; justify-content: center; text-align: center; color: var(--gray);">
            [Image Placeholder]<br>Vishal Agarwal
          </div>
          <div style="flex: 1;">
            <h3 style="font-size: 24px; font-weight: 800; color: var(--black);">Vishal Agarwal</h3>
            <div style="font-weight: 700; color: var(--yellow-dark); margin-bottom: 16px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Director</div>
            <p style="color: var(--gray); font-size: 15px; margin-bottom: 12px; line-height: 1.7;">Vishal Agarwal holds a Master of Business Administration (MBA) and brings valuable expertise in accounting, financial management, and business operations.</p>
            <p style="color: var(--gray); font-size: 15px; line-height: 1.7;">He plays an important role in overseeing financial planning, accounting systems, and internal business processes. With a strong focus on financial discipline and operational efficiency, Vishal contributes to maintaining stability, transparency, and sustainable growth while supporting the company’s ongoing expansion in the textile yarn market.</p>
          </div>
        </div>

      </div>
    </div>
  </section>

  `;

  fs.writeFileSync(path, top + aboutContent + bottom, 'utf8');
  console.log('about.html built successfully!');
} else {
  console.error('Could not find nav and footer tags.');
}
