import { readFile, writeFile } from 'node:fs/promises';
const sections = ['header', 'hero', 'new-products', 'best-products', 'tutorials', 'footer'];
let html = await readFile('scripts/page-template.html', 'utf8');
for (const section of sections) {
 const fragment = (await readFile(`components/${section}/${section}.html`, 'utf8')).trim();
 html = html.replace('{{' + section + '}}', () => fragment);
}
// Scope tracking to Hangul text, preserving English tracking and HTML attributes.
html = html.replace(/(<body[^>]*>)([\s\S]*?)(<\/body>)/, (match, open, body, close) => {
 const parts = body.split(/(<[^>]+>)/g);
 return open + parts.map((part, index) => index % 2 ? part : part.replace(/[\u1100-\u11ff\u3130-\u318f\uac00-\ud7af]+/g, text => '<span class="korean-text">' + text + '</span>')).join('') + close;
});
await writeFile('index.html', html);
console.log('컴포넌트 HTML을 index.html에 반영했습니다.');
