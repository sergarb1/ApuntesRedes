// F2: unifica la fuente de todos los diagramas Excalidraw a Casadia (fontFamily: 3)
// y sube a 16 px cualquier texto más pequeño (regla de diseño del proyecto).
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const DIR = 'public/diagrams';
const MIN_FONT_SIZE = 16;
let files = 0, texts = 0, small = 0;

for (const e of readdirSync(DIR)) {
  if (!e.endsWith('.excalidraw')) continue;
  const p = join(DIR, e);
  const raw = readFileSync(p, 'utf8');
  const doc = JSON.parse(raw);
  let changed = 0;
  for (const el of doc.elements ?? []) {
    if (el.type === 'text' && typeof el.fontSize === 'number' && el.fontSize < MIN_FONT_SIZE) {
      const ratio = MIN_FONT_SIZE / el.fontSize;
      el.fontSize = MIN_FONT_SIZE;
      if (typeof el.width === 'number') el.width = Math.round(el.width * ratio * 10) / 10;
      if (typeof el.height === 'number') el.height = Math.round(el.height * ratio * 10) / 10;
      changed++;
      small++;
    }
    // espejo de estilo de etiqueta en el contenedor (lo ignora el render, pero por coherencia)
    if (el.type !== 'text' && typeof el.fontSize === 'number' && el.fontSize < MIN_FONT_SIZE) {
      el.fontSize = MIN_FONT_SIZE;
      changed++;
    }
  }
  const walk = (o) => {
    if (!o || typeof o !== 'object') return;
    if (Array.isArray(o)) { o.forEach(walk); return; }
    if (o.fontFamily !== undefined && o.fontFamily !== 3) { o.fontFamily = 3; changed++; }
    for (const v of Object.values(o)) walk(v);
  };
  walk(doc.elements ?? []);
  if (changed > 0) {
    writeFileSync(p, JSON.stringify(doc, null, 2) + '\n');
    texts += changed;
  }
  files++;
}

console.log(`${files} ficheros revisados: ${texts} cambios de estilo (fuente/tamaño), ${small} textos subidos a ${MIN_FONT_SIZE} px`);
