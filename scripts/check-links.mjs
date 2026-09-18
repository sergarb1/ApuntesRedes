// Comprueba que todos los enlaces internos /ApuntesRedes/ apuntan a páginas existentes
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const DOCS = 'src/content/docs';
const slugs = new Set();
function walk(dir) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p);
    else if (e.endsWith('.md')) {
      const s = p.split('\\').join('/').replace(/^src\/content\/docs\//, '').replace(/\.md$/, '').toLowerCase();
      if (s === 'index') slugs.add('');
      slugs.add(s);
    }
  }
}
walk(DOCS);
const files = [];
function walk2(dir) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk2(p);
    else if (e.endsWith('.md')) files.push(p.split('\\').join('/'));
  }
}
walk2(DOCS);
let bad = 0;
for (const f of files) {
  const txt = readFileSync(f, 'utf8');
  const links = [...txt.matchAll(/\]\((\/ApuntesRedes\/[^)#\s]*)/g)].map(m => m[1].replace('/ApuntesRedes/', '').replace(/\/$/, '').toLowerCase());
  for (const l of links) {
    if (!slugs.has(l)) { console.log(`ROTO: ${f} -> ${l}`); bad++; }
  }
}
console.log(bad === 0 ? 'OK: todos los enlaces internos existen' : `${bad} enlaces rotos`);
