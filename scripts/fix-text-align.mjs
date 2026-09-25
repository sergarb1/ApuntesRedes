// F2: los textos sueltos (sin contenedor) de todos los diagramas se pasan a
// textAlign "left". El cliente Excalidraw re-mide el texto al restaurar la
// escena y ancla el texto centrado en element.x, así que un "center" deja el
// texto desplazado media anchura a la izquierda (se sale de la caja y agranda
// el viewBox del SVG). Con "left" el texto empieza en x, que es como se
// compusieron los diagramas y como se exportaban los SVG aprobados del repo.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const DIR = 'public/diagrams';
let files = 0, changed = 0;

for (const e of readdirSync(DIR)) {
  if (!e.endsWith('.excalidraw') || e.startsWith('.tmp-')) continue;
  const p = join(DIR, e);
  const doc = JSON.parse(readFileSync(p, 'utf8'));
  let n = 0;
  for (const el of doc.elements ?? []) {
    if (el.type === 'text' && !el.containerId && el.textAlign !== 'left') {
      el.textAlign = 'left';
      n++;
    }
  }
  if (n > 0) {
    writeFileSync(p, JSON.stringify(doc, null, 2) + '\n');
    changed += n;
  }
  files++;
}

console.log(`${files} ficheros revisados: ${changed} textos sueltos pasados a textAlign "left"`);
