const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

function download(url, dest, maxRedirects = 5) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    protocol.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location && maxRedirects > 0) {
        const redirectUrl = res.headers.location.startsWith('http') 
          ? res.headers.location 
          : new URL(res.headers.location, url).href;
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

const urls = [
  'https://wkaiglobal.com/images/logo-wk.webp',
  'https://www.wkaiglobal.com/images/logo-wk.webp',
  'https://wkaiglobal.com/wp-content/uploads/logo.png',
];
const dest = path.join(__dirname, 'public/images/partners/Wankai.webp');

(async () => {
  for (const url of urls) {
    try {
      console.log('Trying: ' + url);
      await download(url, dest);
      console.log('Downloaded successfully!');
      break;
    } catch (e) {
      console.log('Failed: ' + e.message);
    }
  }
})();
