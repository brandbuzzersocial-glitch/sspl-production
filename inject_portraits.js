const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const aboutPath = path.join(__dirname, 'public', 'about.html');
const html = fs.readFileSync(aboutPath, 'utf8');
const $ = cheerio.load(html);

const imageStyle = 'flex: 0 0 200px; width: 200px; height: 250px; object-fit: cover; border-radius: var(--radius-sm); border: 1px solid var(--border); box-shadow: var(--shadow); background: transparent; padding: 0px;';

// Replacing correctly by finding the exact text node or by checking if the element is an explicit leaf
$('div').each((i, el) => {
    // Only match divs that don't have other divs inside them
    if ($(el).children('div').length === 0) {
        const txt = $(el).text();
        if (txt.includes('[Image Placeholder]')) {
            if (txt.includes('Rajkumar')) {
                $(el).replaceWith(`<img src="images/rajkumar.png" alt="Rajkumar Agarwal" style="${imageStyle}">`);
            } else if (txt.includes('Nitin')) {
                $(el).replaceWith(`<img src="images/nitin.png" alt="Nitin Agarwal" style="${imageStyle}">`);
            } else if (txt.includes('Vishal')) {
                $(el).replaceWith(`<img src="images/vishal.png" alt="Vishal Agarwal" style="${imageStyle}">`);
            }
        }
    }
});

fs.writeFileSync(aboutPath, $.html({ decodeEntities: false }), 'utf8');
console.log('Portraits integrated accurately!');
