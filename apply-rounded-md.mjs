import fs from 'fs';
import path from 'path';

const dirsToSearch = [
  'C:/Users/cogni/yesj-new/components',
  'C:/Users/cogni/yesj-new/app'
];

const classesToReplace = /rounded-none/g;

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
    if (classesToReplace.test(content)) {
      const newContent = content.replace(classesToReplace, 'rounded-md');
      if (newContent !== content) {
        fs.writeFileSync(file, newContent, 'utf8');
        changedCount++;
      }
    }
  }
}
console.log(`Updated ${changedCount} files to have slightly curved corners (rounded-md).`);
