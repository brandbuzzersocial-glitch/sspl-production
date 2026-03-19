const fs = require('fs');
const path = require('path');

const publicDir = 'c:/sspl website/public';
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

const replacements = [
  {
    old: /From Waste to Wonder/g,
    new: 'From Polymer to Excellence'
  },
  {
    old: /the transformation from post-consumer plastic waste to premium textile-ready yarn/g,
    new: 'the precision engineering of high-purity virgin polymers into premium textile-ready yarn'
  },
  {
    old: /Post-consumer plastic waste is collected and sorted\. This is where innovation meets\s*ecology — turning discarded PET into a resource for the future of textiles\./g,
    new: 'Our process begins with the selection of high-purity virgin polymer chips. Every batch is rigorously inspected to ensure the highest standards of clarity and molecular consistency.'
  },
  {
    old: /Sustainability/g,
    new: 'Quality Focus' 
  },
  {
    old: /The Origin:<br>Sustainable Futures/g,
    new: 'The Origin:<br>Virgin Purity'
  },
  {
    old: /Collected plastic waste is cleaned, melted, and refined\. Solid waste is transformed\s*into a high-quality liquid polymer, ready for the next stage\./g,
    new: 'The selected polymers are melted and refined through advanced filtration. This creates a high-grade liquid polymer of unmatched purity, optimized for precision spinning.'
  },
  {
    old: /The recycled yarn arrives at its destination — ready to be woven into sustainable\s*textiles/g,
    new: 'Our first-grade yarn arrives at its destination — ready to be woven into premium high-end textiles'
  },
  {
    old: /Sustainable & Ethical Sourcing Practices/g,
    new: 'Reliable & Ethical Sourcing Practices'
  },
  {
    old: /recycled yarn/g,
    new: 'first-grade yarn'
  },
  {
    old: /sustainable textiles/g,
    new: 'premium textiles'
  },
  {
    old: /turning discarded PET into a resource/g,
    new: 'transforming premium polymers into elite fibers'
  }
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

  // Special case for sustainability in about.html (Vishal's bio) - keep it as it's general business growth
  if (file === 'about.html') {
    // but the journey steps in about.html (if any) should be fixed.
    // Actually about.html doesn't have the journey steps yet, I only put them on Home.
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated quality descriptions in ${file}`);
  }
});
