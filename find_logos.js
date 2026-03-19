const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const missing = [
  { name: 'tongkun', url: 'http://www.zjtkgf.com' },
  { name: 'hengyi', url: 'http://www.hengyishihua.com' },
  { name: 'wankai', url: 'http://www.wkai.cc' },
  { name: 'highsun', url: 'http://www.hscc.com' },
  { name: 'wanghong', url: 'http://www.whtex.cn' }
];

async function findLogo(site) {
  try {
    const res = await axios.get(site.url, { timeout: 10000 });
    const $ = cheerio.load(res.data);
    let logoUrl = null;
    
    $('img').each((i, el) => {
      const src = $(el).attr('src');
      if (src && src.toLowerCase().includes('logo')) {
        if (!logoUrl) logoUrl = src;
      }
    });

    if (logoUrl) {
      if (!logoUrl.startsWith('http')) {
        if (logoUrl.startsWith('//')) {
          logoUrl = 'http:' + logoUrl;
        } else if (logoUrl.startsWith('/')) {
          logoUrl = site.url + logoUrl;
        } else {
          logoUrl = site.url + '/' + logoUrl;
        }
      }
      console.log(`${site.name} logo found: ${logoUrl}`);
    } else {
      console.log(`${site.name} logo not found directly on homepage.`);
    }
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
