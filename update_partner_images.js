const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

const mapping = {
    'tongkun': 'images/partners/Tongkun.webp',
    'hengyi': 'images/partners/Hengyi.png',
    'hengli': 'images/partners/Hengli.jpg.jpeg',
    'xinfengming': 'images/partners/XFM.jpg.jpeg',
    'billion': 'images/partners/Billion.PNG',
    'highsun': 'images/partners/Highsun.PNG',
    'jinlun': 'images/partners/Jinlun.png'
};

files.forEach(file => {
    const filePath = path.join(publicDir, file);
    const html = fs.readFileSync(filePath, 'utf-8');
    const $ = cheerio.load(html);

    let updated = false;

    $('.partner img').each((i, img) => {
        let alt = $(img).attr('alt');
        if (alt) {
            alt = alt.toLowerCase();
            for (let key in mapping) {
                if (alt.includes(key)) {
                    $(img).attr('src', mapping[key]);
                    $(img).removeAttr('onerror'); // remove fallback logic as these are local
                    updated = true;
                    break;
                }
            }
        }
    });

    if (updated) {
        fs.writeFileSync(filePath, $.html({ decodeEntities: false }), 'utf-8');
        console.log(`Updated local partner images in ${file}`);
    }
});
