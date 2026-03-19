const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const https = require('https');

const missing = [
  { name: 'tongkun', url: 'https://zjtkgf.com' },
  { name: 'hengyi', url: 'https://www.hengyishihua.com' },
  { name: 'highsun', url: 'https://www.hscc.com' },
  { name: 'wanghong', url: 'http://whtex.cn' }
];

const agent = new https.Agent({ rejectUnauthorized: false });

async function findLogo(site) {
  try {
    const res = await axios.get(site.url, { timeout: 15000, httpsAgent: agent, headers: { 'User-Agent': 'Mozilla/5.0' } });
    const $ = cheerio.load(res.data);
    let images = [];
    
    $('img').each((i, el) => {
      let src = $(el).attr('src');
      if (src) {
        images.push(src);
      }
    });

    console.log(`\n--- ${site.name} images ---`);
    const potentialLogos = images.filter(s => s.toLowerCase().includes('logo') || s.toLowerCase().includes('head'));
    console.log("Potential logos:", potentialLogos.slice(0, 5));
    if (potentialLogos.length === 0) console.log("All images (first 10):", images.slice(0, 10));

  } catch (err) {
    console.log(`Failed to fetch ${site.name}: ${err.message}`);
  }
}

async function main() {
  for (const site of missing) {
    await findLogo(site);
  }
}

main();
