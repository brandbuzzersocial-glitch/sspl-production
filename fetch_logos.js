const fs = require('fs');
const https = require('https');
const path = require('path');

const partners = [
  { name: 'tongkun', domain: 'zjtkgf.com' },
  { name: 'hengyi', domain: 'hengyishihua.com' },
  { name: 'hengli', domain: 'hengli.com' },
  { name: 'xinfengming', domain: 'xinfengming.com' },
  { name: 'wankai', domain: 'wkai.cc' },
  { name: 'billion', domain: 'baihong.com' },
  { name: 'highsun', domain: 'hscc.com' },
  { name: 'wanghong', domain: 'whtex.cn' },
  { name: 'jinlun', domain: 'fjsjlgx.com' }
];

const dir = path.join(__dirname, 'public', 'images', 'partners');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

async function downloadLogo(partner) {
  const url = `https://logo.clearbit.com/${partner.domain}`;
  const dest = path.join(dir, `${partner.name}.png`);
  
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 200 || res.statusCode === 302) {
        if (res.statusCode === 302) {
          // Follow redirect once
          https.get(res.headers.location, (res2) => {
            if (res2.statusCode === 200) {
              const file = fs.createWriteStream(dest);
              res2.pipe(file);
              file.on('finish', () => resolve(true));
            } else {
              resolve(false);
            }
          });
        } else {
          const file = fs.createWriteStream(dest);
          res.pipe(file);
          file.on('finish', () => resolve(true));
        }
      } else {
        // Fallback to favicon
        const fbUrl = `https://www.google.com/s2/favicons?domain=${partner.domain}&sz=128`;
        https.get(fbUrl, (resFb) => {
          if (resFb.statusCode === 200) {
            const file = fs.createWriteStream(dest);
            resFb.pipe(file);
            file.on('finish', () => resolve(true));
          } else {
            resolve(false);
          }
        });
      }
    }).on('error', () => resolve(false));
  });
}

async function main() {
  for (const partner of partners) {
    const success = await downloadLogo(partner);
    console.log(`${partner.name}: ${success ? 'Downloaded' : 'Failed'}`);
  }
}
main();
