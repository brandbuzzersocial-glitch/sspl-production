const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

function download(url, dest, maxRedirects = 5) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    protocol.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location && maxRedirects > 0) {
        let redirectUrl = res.headers.location;
        if (!redirectUrl.startsWith('http')) {
           const parsed = new URL(url);
           redirectUrl = `${parsed.protocol}//${parsed.host}${redirectUrl}`;
        }
        console.log('Redirecting to: ' + redirectUrl);
        resolve(download(redirectUrl, dest, maxRedirects - 1));
      } else if (res.statusCode === 200) {
        const file = fs.createWriteStream(dest);
        res.pipe(file);
        file.on('finish', () => { file.close(); resolve(true); });
      } else {
        reject(new Error('Status: ' + res.statusCode + ' for ' + url));
      }
    }).on('error', reject);
  });
}

(async () => {
  const url = 'http://www.wkai.cc/images/logo-wk.png';
  const tempPath = path.join(__dirname, 'public/images/partners/Wankai_temp.png');
  const finalPath = path.join(__dirname, 'public/images/partners/Wankai.webp');

  try {
    console.log('Trying to download: ' + url);
    await download(url, tempPath);
    console.log('Downloaded PNG. Converting to WebP...');
    
    await sharp(tempPath)
      .webp({ quality: 80 })
      .toFile(finalPath);
    
    fs.unlinkSync(tempPath);
    console.log('Done! Wankai.webp created.');
  } catch (e) {
    console.error('Failed: ' + e.message);
  }
})();
