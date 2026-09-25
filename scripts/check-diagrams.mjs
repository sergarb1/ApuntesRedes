// Checker de calidad para los diagramas Excalidraw de public/diagrams.
// Uso: node scripts/check-diagrams.mjs  (o npm run check:diagrams)
//
// Reglas:
//  1. fontFamily === 3 (Cascadia) en todos los textos.
//  2. fontSize >= 16 en todos los textos.
//  3. Contención: se toma del SVG exportado la caja que realmente renderiza
//     cada texto (translate + media anchura del grupo) y se comprueba que cabe
//     en su contenedor (su rectángulo vinculado, o el más pequeño que lo
//     contiene) con aire mínimo de 6 px a los lados y 4 px arriba/abajo; los
//     textos sueltos no van pegados a los bordes y el último de cada
//     contenedor deja >= 10 px de base.
//  4. Sin solapes AABB entre las cajas renderizadas de los textos.
//  5. El SVG existe y pesa más de 1 KB.
//  6. El título libre se parece al nombre base del fichero.
//  7. Paleta del proyecto (azul/teal + neutros + acentos de la unidad).
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, basename } from 'node:path';

const DIR = 'public/diagrams';
const MIN_FONT_SIZE = 16;
const REQUIRED_FAMILY = 3;
const PADDING_RATIO = 0.15;
const MIN_EDGE_PX = 8;
const MIN_BOTTOM_PX = 10; // aire mínimo bajo el último texto libre de una caja
const MIN_LABEL_PAD = 6; // aire lateral mínimo de una etiqueta dentro de su caja
const MIN_LABEL_PAD_V = 4; // aire vertical mínimo de una etiqueta
const OVERLAP_TOLERANCE = 1; // px de tolerancia en los solapes

const STROKES = new Set([
  '#2563eb', '#4ecdc4', '#0f172a', '#1e1e1e', '#868e96', '#495057',
  '#0f766e', '#e03131', '#e8590c', '#0c8599', '#2f9e44',
]);
const BACKGROUNDS = new Set([
  'transparent', '#eff6ff', '#f0fdf4', '#ffe3e3', '#fff7ed',
  '#ffffff', '#f1f3f5', '#f8f9fa', '#2f9e44', '#e8590c', '#2563eb',
  '#93c5fd', '#a0651f',
]);

const fold = (s) => s
  .toLowerCase()
  .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9]+/g, ' ')
  .trim();

const tokens = (s) => fold(s).split(/\s+/).filter(Boolean);

const unescape = (s) => s
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
  .replace(/&#39;/g, "'").replace(/&amp;/g, '&');

// Cajas renderizadas de los textos, leídas del SVG exportado por el cliente.
const renderedTexts = (svgPath) => {
  const svg = readFileSync(svgPath, 'utf8');
  const out = [];
  const groupRe = /<g([^>]*)>([\s\S]*?)<\/g>/g;
  let g;
  while ((g = groupRe.exec(svg))) {
    const tr = /translate\(([-\d.]+) ([-\d.]+)\)/.exec(g[1]);
    const ro = /rotate\(0 ([-\d.]+) ([-\d.]+)\)/.exec(g[1]);
    if (!tr || !ro) continue;
    const lines = [...g[2].matchAll(/<text[^>]*>([\s\S]*?)<\/text>/g)].map((m) => unescape(m[1]));
    if (!lines.length) continue;
    out.push({
      left: parseFloat(tr[1]),
      top: parseFloat(tr[2]),
      w: 2 * parseFloat(ro[1]), // media anchura del grupo = anchura real renderizada
      lines,
      content: lines.join('\n'),
    });
  }
  return out;
};

// Traslación de coordenadas del SVG a coordenadas de escena: se obtiene de un
// texto suelto alineado a la izquierda, cuya posición de diseño conocemos.
const svgOffsets = (rendered, texts) => {
  const free = texts.filter((t) => !t.containerId && t.textAlign === 'left');
  const pairs = [];
  for (const t of free) {
    const r = rendered.find((x) => x.content === t.text);
    if (r) pairs.push({ dx: r.left - t.x, dy: r.top - t.y });
  }
  if (!pairs.length) return null;
  const dx = pairs[Math.floor(pairs.length / 2)].dx;
  const dy = pairs[Math.floor(pairs.length / 2)].dy;
  return { dx, dy };
};

let failures = 0;
const fail = (file, msg) => { console.log(`  ✗ ${file}: ${msg}`); failures++; };

const files = readdirSync(DIR).filter((f) => f.endsWith('.excalidraw') && !f.startsWith('.tmp-')).sort();

for (const f of files) {
  const name = basename(f, '.excalidraw');
  const doc = JSON.parse(readFileSync(join(DIR, f), 'utf8'));
  const els = doc.elements ?? [];
  const texts = els.filter((e) => e.type === 'text' && !e.isDeleted);
  const rects = els.filter((e) => (e.type === 'rectangle' || e.type === 'ellipse' || e.type === 'diamond') && !e.isDeleted);

  // 1 y 2 — familia y tamaño
  for (const t of texts) {
    if (t.fontFamily !== REQUIRED_FAMILY) fail(name, `texto "${t.id}" con fontFamily ${t.fontFamily} (debe ser ${REQUIRED_FAMILY})`);
    if (typeof t.fontSize === 'number' && t.fontSize < MIN_FONT_SIZE) fail(name, `texto "${t.id}" con fontSize ${t.fontSize} (< ${MIN_FONT_SIZE})`);
  }

  // 3 y 4 — cajas renderizadas leídas del SVG
  const svgPath = join(DIR, `${name}.svg`);
  const boxes = [];
  if (existsSync(svgPath) && statSync(svgPath).size >= 1024) {
    const rendered = renderedTexts(svgPath);
    const off = svgOffsets(rendered, texts);
    if (!off) {
      fail(name, 'no se han podido leer las cajas de texto del SVG');
    } else {
      const used = new Set();
      for (const t of texts) {
        const idx = rendered.findIndex((r, i) => !used.has(i) && r.content === t.text);
        if (idx < 0) continue;
        used.add(idx);
        const r = rendered[idx];
        boxes.push({ t, left: r.left - off.dx, top: r.top - off.dy, w: r.w, h: 1.25 * t.fontSize * r.lines.length });
      }
      if (boxes.length !== texts.length) {
        fail(name, `${texts.length - boxes.length} textos sin caja en el SVG`);
      }
    }
  }

  const lowestFree = new Map();
  for (const b of boxes) {
    const t = b.t;
    let r = null;
    if (t.containerId) r = rects.find((q) => q.id === t.containerId) ?? null;
    else {
      const cx = b.left + b.w / 2;
      const cy = b.top + b.h / 2;
      r = rects
        .filter((q) => cx >= q.x && cx <= q.x + q.width && cy >= q.y && cy <= q.y + q.height)
        .sort((a, c) => a.width * a.height - c.width * c.height)[0] ?? null;
    }
    if (!r) continue;
    const padT = b.top - r.y;
    const padB = (r.y + r.height) - (b.top + b.h);
    const padL = b.left - r.x;
    const padR = (r.x + r.width) - (b.left + b.w);
    if (padL < -OVERLAP_TOLERANCE || padR < -OVERLAP_TOLERANCE || padT < -OVERLAP_TOLERANCE || padB < -OVERLAP_TOLERANCE) {
      fail(name, `texto "${t.id}" sobresale de "${r.id}" (L${padL.toFixed(1)} T${padT.toFixed(1)} R${padR.toFixed(1)} B${padB.toFixed(1)})`);
      continue;
    }
    if (t.containerId) {
      if (padL < MIN_LABEL_PAD || padR < MIN_LABEL_PAD) {
        fail(name, `etiqueta "${t.id}" apretada en "${r.id}" (L${padL.toFixed(1)} R${padR.toFixed(1)})`);
      }
      if (padT < MIN_LABEL_PAD_V || padB < MIN_LABEL_PAD_V) {
        fail(name, `etiqueta "${t.id}" apretada en "${r.id}" (T${padT.toFixed(1)} B${padB.toFixed(1)})`);
      }
    } else {
      if (padT < Math.min(MIN_EDGE_PX, PADDING_RATIO * b.h) - OVERLAP_TOLERANCE) {
        fail(name, `texto libre "${t.id}" pegado arriba en "${r.id}" (T${padT.toFixed(1)})`);
      }
      if (padB < Math.min(MIN_EDGE_PX, PADDING_RATIO * b.h) - OVERLAP_TOLERANCE) {
        fail(name, `texto libre "${t.id}" pegado abajo en "${r.id}" (B${padB.toFixed(1)})`);
      }
      const prev = lowestFree.get(r.id);
      if (!prev || b.top + b.h > prev.top + prev.h) lowestFree.set(r.id, b);
    }
  }
  for (const [rid, b] of lowestFree) {
    const r = rects.find((x) => x.id === rid);
    const padB = (r.y + r.height) - (b.top + b.h);
    if (padB < MIN_BOTTOM_PX - OVERLAP_TOLERANCE) {
      fail(name, `"${b.t.id}" demasiado pegado a la base de "${rid}" (B${padB.toFixed(1)} < ${MIN_BOTTOM_PX})`);
    }
  }

  for (let i = 0; i < boxes.length; i++) {
    for (let j = i + 1; j < boxes.length; j++) {
      const a = boxes[i], b = boxes[j];
      const ox = Math.min(a.left + a.w, b.left + b.w) - Math.max(a.left, b.left);
      const oy = Math.min(a.top + a.h, b.top + b.h) - Math.max(a.top, b.top);
      if (ox > OVERLAP_TOLERANCE && oy > OVERLAP_TOLERANCE) {
        fail(name, `solape entre "${a.t.id}" y "${b.t.id}" (${ox.toFixed(1)}×${oy.toFixed(1)} px)`);
      }
    }
  }

  // 5 — SVG
  if (!existsSync(svgPath)) fail(name, 'falta el SVG');
  else if (statSync(svgPath).size < 1024) fail(name, `SVG demasiado pequeño (${statSync(svgPath).size} B)`);

  // 6 — título ≈ nombre base
  const free = texts.filter((t) => !t.containerId);
  const title = [...free].sort((a, b) => (b.fontSize ?? 0) - (a.fontSize ?? 0) || a.y - b.y)[0];
  if (!title) fail(name, 'sin título libre');
  else {
    const baseTokens = tokens(name.replace(/^u\d{2}-/, '')).filter((tk) => tk.length > 1);
    const titleFold = fold(title.text);
    const hit = baseTokens.some((tk) => titleFold.includes(tk));
    if (!hit) fail(name, `título "${title.text.slice(0, 40)}" no se parece al nombre base (${name})`);
  }

  // 7 — paleta
  for (const e of els) {
    if (e.strokeColor && !STROKES.has(e.strokeColor)) fail(name, `stroke no permitido ${e.strokeColor} en "${e.id}"`);
    if (e.backgroundColor && !BACKGROUNDS.has(e.backgroundColor)) fail(name, `fondo no permitido ${e.backgroundColor} en "${e.id}"`);
  }
}

console.log(failures === 0
  ? `OK: ${files.length} diagramas sin fallos`
  : `${failures} fallos en ${files.length} diagramas`);
process.exit(failures === 0 ? 0 : 1);
