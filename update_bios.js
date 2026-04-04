const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const filePath = path.join(__dirname, 'public', 'about.html');
const html = fs.readFileSync(filePath, 'utf-8');
const $ = cheerio.load(html);

// We need to target the containers for Rajkumar Agarwal, Nitin Agarwal, Vishal Agarwal
// Let's replace the whole section holding the directors/leadership.
// Find the h2 that has "Meet Our <em>Directors</em>"
const secH2 = $('h2.sec-h2:contains("Meet Our ")');
if (secH2.length) {
    const container = secH2.parent().next('div');
    if (container.length) {
        container.html(`
        <!-- Rajkumar Agarwal -->
        <div style="background: #fff; border: 1px solid var(--border); border-radius: var(--radius); padding: 40px; box-shadow: var(--shadow); display: flex; gap: 40px; align-items: center; flex-wrap: wrap;">
          <div style="flex: 0 0 200px; height: 250px; background: #EEE; border-radius: var(--radius-sm); border: 2px dashed #CCC; display: flex; align-items: center; justify-content: center; text-align: center; color: var(--gray);">
            [Image Placeholder]<br>Rajkumar Agarwal
          </div>
          <div style="flex: 1;">
            <h3 style="font-size: 24px; font-weight: 800; color: var(--black);">Rajkumar Agarwal</h3>
            <div style="font-weight: 700; color: var(--yellow-dark); margin-bottom: 16px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Founder</div>
            <p style="color: var(--gray); font-size: 15px; margin-bottom: 12px; line-height: 1.7;">Rajkumar Agarwal founded Surat Sales in 1984 with a vision to build a reliable and trusted business in the textile industry. Starting with textile trading, he laid the foundation of the company through his deep market understanding, strong relationships, and commitment to integrity and quality.</p>
            <p style="color: var(--gray); font-size: 15px; margin-bottom: 12px; line-height: 1.7;">Over the years, under his leadership and entrepreneurial vision, the business expanded and diversified across multiple segments. From establishing Surat Sales to growing into suit and dress material trading, fabrics, sarees, and shirting, each phase of growth has been guided by his strategic direction and dedication. He also led the company’s expansion into new sectors, including real estate, veterinary medicines, and imported yarns—where the company has built a strong presence in the Indian market.</p>
            <p style="color: var(--gray); font-size: 15px; line-height: 1.7;">Through his consistent focus on operational excellence, long-term relationships, and market adaptability, Rajkumar Agarwal has shaped Surat Sales Pvt. Ltd. into a diversified and trusted enterprise serving customers across India and globally, including exports. Today, his vision and values continue to inspire the next generation, ensuring sustained growth, reliability, and excellence in every aspect of the business.</p>
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
            <p style="color: var(--gray); font-size: 15px; margin-bottom: 12px; line-height: 1.7;">Nitin Agarwal holds both B.Tech and M.Tech degrees in Computer Science and Engineering from the prestigious Indian Institute of Technology, Delhi. He began his professional career with American Express, where he worked in the Data Science domain for a year, gaining valuable experience in analytics and data-driven decision-making.</p>
            <p style="color: var(--gray); font-size: 15px; line-height: 1.7; margin-bottom: 12px;">In 2018, he transitioned into the family business, bringing a structured and strategic approach from the outset. He initially led operations in the veterinary medicine trading segment, which he continues to oversee. In 2022, he expanded into the yarn industry, where he has played a key role in scaling operations and establishing a strong presence in imports across India.</p>
            <p style="color: var(--gray); font-size: 15px; line-height: 1.7;">At the company, Nitin focuses on strengthening operational processes, improving supply chain efficiency, and supporting long-term strategic planning. His technical mindset and systematic approach enhance operational reliability and ensure smooth coordination with international suppliers and domestic clients.</p>
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
            <p style="color: var(--gray); font-size: 15px; line-height: 1.7; margin-bottom: 12px;">He plays a key role in overseeing financial planning, managing accounting systems, and strengthening internal business processes. With a strong focus on financial discipline and operational efficiency, Vishal contributes to maintaining stability, transparency, and sustainable growth.</p>
            <p style="color: var(--gray); font-size: 15px; line-height: 1.7;">In addition, he is actively involved in day-to-day operations and marketing activities, supporting the company’s ongoing expansion in the textile yarn market.</p>
          </div>
        </div>
        `);
    }
}

// "About Surat Sales" / "Journey of Surat Sales Pvt. Ltd." 
// Let's replace the ABOUT HERO with the detailed journey if needed, or in the ABOUT "Connecting Global Quality" section
// Let's modify the #about section 
const aboutGrid = $('#about .about-grid');
if (aboutGrid.length) {
    const revealR = aboutGrid.find('.reveal-r');
    if (revealR.length) {
        revealR.html(`
        <span class="sec-tag">About Surat Sales</span>
        <h2 class="sec-h2">Journey of <em>Surat Sales Pvt. Ltd.</em></h2>
        <p class="sec-p">The foundation of the business was laid in 1984, when the promoters moved to Surat and started Surat Sales Corporation, primarily engaged in textile trading.</p>
        <p class="sec-p" style="margin-top:10px;">Over the years, the company steadily diversified its operations:</p>
        <ul style="color:var(--gray); font-size: 14px; line-height:1.7; margin-top:10px; padding-left: 20px;">
          <li>In 2005, the business expanded into real estate while simultaneously building a strong presence in suit and dress material trading, with products reaching a wide domestic market.</li>
          <li>In 2008, fabrics were added to the product portfolio.</li>
          <li>In 2012, the company entered the saree trading segment.</li>
          <li>In 2016, the shirting business was successfully launched.</li>
          <li>In 2018, the company diversified into veterinary medicines trading.</li>
          <li>From 2022 to the present, the company has established a strong foothold in the import and export of yarns, emerging as a significant player in the Indian market.</li>
        </ul>
        <p class="sec-p" style="margin-top:10px;">Today, Surat Sales Pvt. Ltd. continues to grow as a diversified and dynamic enterprise, with an AEO T1 certification and a strong presence across multiple segments, along with a commitment to quality, reliability, and long-term relationships.</p>
        `);
    }
}

fs.writeFileSync(filePath, $.html({ decodeEntities: false }), 'utf-8');
console.log('About section bios updated.');
