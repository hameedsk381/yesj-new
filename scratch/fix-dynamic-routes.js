const fs = require('fs');
const path = require('path');

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (file === 'route.ts' || file === 'route.js') {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (!content.includes('export const dynamic =')) {
        fs.writeFileSync(fullPath, 'export const dynamic = "force-dynamic";\n' + content);
        console.log('Updated: ' + fullPath);
      }
    }
  });
}

walk('app/api');
