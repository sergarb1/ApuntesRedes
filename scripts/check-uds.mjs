// Scanner de referencias a números de unidad (UD3, U05, Unidad 01…) en el
// contenido de las unidades y en el texto de los diagramas SVG.
// Regla: ver "Números de unidad en el texto" en AGENTS.md.
// Uso: node scripts/check-uds.mjs   → 0 si todo limpio, 1 si hay restos.
import fs from 'node:fs';
import path from 'node:path';

const DOCS = path.join(process.cwd(), 'src', 'content', 'docs');
const DIAGRAMS = path.join(process.cwd(), 'public', 'diagrams');

// Patrón: UD3 / UD 3 / U05 / Unidad 3 / Unidad 03
const PAT = /\b(?:UD\s?\d{1,2}|U\d{2}|Unidad\s?\d{1,2})\b/g;

let bad = 0;
const report = (where, line, hit, ctx) => {
  console.log(`${where}:${line} [${hit}] ${String(ctx).trim().slice(0, 120)}`);
  bad++;
};

// ── Markdown (sin exenciones: landing y mapa incluidos) ──────────────────
const mdFiles = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.md')) mdFiles.push(path.relative(DOCS, p));
  }
})(DOCS);

for (const rel of mdFiles) {
  const lines = fs.readFileSync(path.join(DOCS, rel), 'utf8').split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Exentos: títulos de boletín (frontmatter y H1) — identidad del recurso
    if (/title: "?Boletín/.test(line)) continue;
    if (/^#\s.*Boletín/.test(line)) continue;
    // Limpiar rutas/URLs (ficheros, diagramas, enlaces) y código inline
    const clean = line
      .replace(/\]\((\/ApuntesRedes\/)?[^)\s]*\)/g, '](…)')
      .replace(/`[^`]*`/g, '`…`')
      .replace(/(?:src|href)="[^"]*"/g, '=""');
    PAT.lastIndex = 0;
    let m;
    while ((m = PAT.exec(clean)) !== null) report(`src/content/docs/${rel}`, i + 1, m[0], line);
  }
}

// ── Diagramas SVG (texto visible de los <text>) ──────────────────────────
if (fs.existsSync(DIAGRAMS)) {
  for (const name of fs.readdirSync(DIAGRAMS).filter((n) => n.endsWith('.svg'))) {
    const svg = fs.readFileSync(path.join(DIAGRAMS, name), 'utf8');
    const texts = [...svg.matchAll(/<text[^>]*>([^<]*)<\/text>/g)];
    texts.forEach((t, i) => {
      PAT.lastIndex = 0;
      const m = PAT.exec(t[1]);
      if (m) report(`public/diagrams/${name}`, i + 1, m[0], t[1]);
    });
  }
}

console.log(`restos: ${bad}`);
process.exit(bad ? 1 : 0);
