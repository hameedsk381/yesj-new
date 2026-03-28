import fs from 'fs';
import path from 'path';

const dirsToSearch = [
  'C:/Users/cogni/yesj-new/components',
  'C:/Users/cogni/yesj-new/app'
];

function walkDir(dir) {
  if (!fs.existsSync(dir)) return [];
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walkDir(filePath));
    } else {
      if (filePath.endsWith('.tsx') || filePath.endsWith('.ts') || filePath.endsWith('.jsx') || filePath.endsWith('.js')) {
        results.push(filePath);
      }
    }
  }
  return results;
}

let changedCount = 0;
for (const dir of dirsToSearch) {
  const files = walkDir(dir);
  for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // Standardize section paddings (massive paddings to unified smart spacing)
    content = content.replace(/py-32|py-24|md:py-24 lg:py-32/g, 'py-16 lg:py-24');
    
    // Tighten excessive internal vertical rhythm gaps
    content = content.replace(/space-y-12/g, 'space-y-8');
    content = content.replace(/space-y-10/g, 'space-y-8');
    content = content.replace(/space-y-8/g, 'space-y-6');
    
    // Tighten grid gaps slightly for unified components
    content = content.replace(/gap-12/g, 'gap-8');
    content = content.replace(/gap-10/g, 'gap-8');
    // We'll leave gap-8 or gap-6 as they are usually already smart for smaller areas.

    // Also fix massive text-5xl on mobile, make it responsive if not already
    // content = content.replace(/text-5xl md:text-6xl lg:text-7xl/g, 'text-4xl md:text-5xl lg:text-6xl');
    
    if (content !== original) {
      fs.writeFileSync(file, content, 'utf8');
      changedCount++;
    }
  }
}
console.log(`Updated ${changedCount} files to implement smart spacing rules.`);
