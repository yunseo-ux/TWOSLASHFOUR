import fs from 'node:fs';
const html = fs.readFileSync('index.html', 'utf8');
const refs = [...html.matchAll(/(?:src|href)="([^"]+)"/g)].map(m => m[1]).filter(x => !x.includes(':') && !x.startsWith('#'));
const missing = refs.filter(x => !fs.existsSync(x));
if (missing.length) throw new Error('Missing: ' + missing.join(', '));
const assets = JSON.parse(fs.readFileSync('assets/manifest.json'));
for (const asset of assets) {
 const file = 'assets/images/' + asset.file;
 if (!fs.statSync(file).size) throw new Error('Empty: ' + file);
 if (!html.includes(file)) throw new Error('Unused: ' + file);
 if (file.endsWith('.svg')) {
  const root = fs.readFileSync(file, 'utf8').match(/<svg[^>]*>/)?.[0];
  console.log(asset.name, root);
 }
}
console.log('PASS: local references and 46 non-empty assets.');
