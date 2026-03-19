const fs = require('fs');
const path = require('path');

const publicDir = 'c:/sspl website/public';
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

const replacements = [
  { old: /\+91 98765 43210/g, new: '93747 13687' },
  { old: /919876543210/g, new: '919374713687' }, // WhatsApp links
  { old: /info@suratsales\.com/gi, new: 'Import.suratsales@gmail.com' },
  { old: /imports\.suratsales@gmail\.com/gi, new: 'Import.suratsales@gmail.com' },
  { old: /Mon–Fri: 9:00 AM – 6:00 PM/g, new: 'Mon–Sat: 10:00 AM – 8:00 PM | Sunday: Closed' },
  { old: /ABCDE12345F6G7H/g, new: '24AADCS1500K1ZR' }
];

files.forEach(file => {
  const filePath = path.join(publicDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  replacements.forEach(r => {
    if (r.old.test(content)) {
      content = content.replace(r.old, r.new);
      changed = true;
    }
  });

  // Special handle for contact.html multiple hour lines
  if (file === 'contact.html') {
     content = content.replace(/Mon – Fri: 9:00 AM – 6:00 PM/g, 'Mon – Sat: 10:00 AM – 8:00 PM');
     content = content.replace(/Sat – Sun: Closed/g, 'Sunday: Closed');
     changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated contact info in ${file}`);
  }
});
