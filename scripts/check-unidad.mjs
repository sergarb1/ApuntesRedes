#!/usr/bin/env node
// Auditoría estructural por unidad — revisión tema a tema.
// Uso: node scripts/check-unidad.mjs [unidad|all]
//   unidad: "02", "2", "02-ethernet-cableado" o sustringo ("ethernet")
// Sin argumentos = todas las unidades.
// FALLO (sale con 1) = incumple convención obligatoria.
// AVISO (no falla) = inconsistencia a decidir/confirmar en la sesión de revisión.

import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = 'src/content/docs';
const PUB = 'public';

// ---------- Secciones obligatorias agregadas (índice + puntos) ----------
const SECC_OBLIG = [
  ['Bloque ⭐ (Sé el …)', /##\s*⭐/],
  ['Fireside Chat', /##\s*🔥 Fireside Chat/],
  ['¿Quién Soy?', /##\s*🕵️/],
  ['CONRAD VS EL MUNDO', /CONRAD VS EL MUNDO/],
  ['Laboratorio de tortura', /##\s*⚡ Laboratorio de tortura/],
  ['Atrévete a pensar', /##\s*🧠 Atrévete a pensar/],
  ['Crucigrama de bits', /##\s*🧩 Crucigrama/],
  ['Entrevista de trabajo', /##\s*💬[^\n]*entrevista de trabajo/i],
  ['No hay preguntas tontas', /##\s*🤷 No hay preguntas tontas/],
  ['Poscréditos', /##\s*🎬 Poscréditos/],
];

function indexSecciones(dir) {
  const comunes = ['Criterios de evaluación cubiertos'];
  if (dir.startsWith('01-')) {
    return [
      '## 👋 ¿Empiezas aquí?',
      '## 📚 Qué encontrarás en este tema',
      '## 🧭 Cómo usar estos apuntes',
      ...comunes.map((c) => '✅ ' + c),
    ];
  }
  return [
    '## 🎯 Objetivo de la unidad',
    '## 🗺️ Mapa de la unidad',
    '## 📝 Boletines de la unidad',
    '## ✅ Criterios de evaluación cubiertos',
    '## 🚪 ¿Por dónde empiezo?',
  ];
}

const md = (p) => readFileSync(p, 'utf8').replace(/\r\n/g, '\n');
const frontmatterOk = (t) => /^---\n[\s\S]*?^title:/m.test(t) && /^description:/m.test(t);

function extraerEnlaces(texto) {
  const out = [];
  const md1 = /\]\((\/ApuntesRedes\/[^)\s#"]+)(?:#[^)]*)?\)/g;
  const html = /href="(\/ApuntesRedes\/[^"#]+)(?:#[^"]*)?"/g;
  let m;
  while ((m = md1.exec(texto))) out.push(m[1]);
  while ((m = html.exec(texto))) out.push(m[1]);
  return out;
}

function existeCI(ruta) {
  if (existsSync(ruta)) return true;
  const { dirname, basename } = { dirname: ruta.slice(0, ruta.lastIndexOf('/')) || '.', basename: ruta.slice(ruta.lastIndexOf('/') + 1) };
  try {
    return readdirSync(dirname).some((f) => f.toLowerCase() === basename.toLowerCase());
  } catch {
    return false;
  }
}

function enlaceOk(target) {
  let t = decodeURIComponent(target.replace(/^\/ApuntesRedes\//, ''));
  if (t.endsWith('/')) t = t.slice(0, -1);
  if (t === '') return existeCI(join(ROOT, 'index.md'));
  if (/\.(svg|png|jpe?g|pdf|epub|webp)$/i.test(t)) return existeCI(join(PUB, t));
  if (existeCI(join(ROOT, t + '.md'))) return true;
  if (existeCI(join(ROOT, t, 'index.md'))) return true;
  return false;
}

function raDelCriterios(texto) {
  const m = texto.match(/Criterios de evaluación cubiertos \(([^)]*)\)/);
  return m ? m[1].trim() : null;
}

function auditarUnidad(dir) {
  const fallos = [];
  const avisos = [];
  const F = (s) => fallos.push(s);
  const A = (s) => avisos.push(s);

  const idxPath = join(ROOT, dir + '.md');
  if (!existsSync(idxPath)) {
    F('no existe el índice ' + dir + '.md');
    return { fallos, avisos };
  }
  const idx = md(idxPath);
  const num = (dir.match(/^(\d+)-/) || [])[1];
  const puntos = readdirSync(join(ROOT, dir))
    .filter((f) => f.endsWith('.md'))
    .sort();

  // 1) Frontmatter
  if (!frontmatterOk(idx)) F('índice sin frontmatter title/description');
  for (const p of puntos) {
    if (!frontmatterOk(md(join(ROOT, dir, p)))) F(p + ': sin frontmatter title/description');
  }

  // 2) Secciones del índice
  for (const s of indexSecciones(dir)) {
    if (!idx.includes(s)) F('índice: falta la sección «' + s.replace(/^## /, '') + '»');
  }

  // 3) Secciones obligatorias agregadas en la unidad
  const todo = idx + '\n' + puntos.map((p) => md(join(ROOT, dir, p))).join('\n');
  for (const [label, re] of SECC_OBLIG) {
    if (!re.test(todo)) {
      if (label.startsWith('Bloque') && dir.startsWith('01-'))
        A('unidad sin bloque ⭐ (¿exento por ser la introducción?)');
      else F('unidad: falta la sección «' + label + '»');
    }
  }

  // 4) Breadcrumb «Estás en» + pie Anterior/Siguiente en cada punto
  for (const p of puntos) {
    const t = md(join(ROOT, dir, p));
    if (!t.includes('**Estás en:**')) F(p + ': falta el breadcrumb «Estás en»');
    if (!t.includes('**Anterior:**')) F(p + ': falta el pie «Anterior»');
    if (!t.includes('**Siguiente:**')) F(p + ': falta el pie «Siguiente»');
  }

  // 5) Enlaces del índice + puntos resuelven
  const ficheros = [idxPath, ...puntos.map((p) => join(ROOT, dir, p))];
  for (const f of ficheros) {
    for (const l of extraerEnlaces(md(f))) {
      if (!enlaceOk(l)) F(f.split(/[\\/]/).pop() + ': enlace roto ' + l);
    }
  }

  // 6) Criterios: RA del índice vs RA del cierre
  const raIdx = raDelCriterios(idx);
  const cierre = puntos.map((p) => md(join(ROOT, dir, p))).join('\n');
  const raCierre = raDelCriterios(cierre);
  if (raIdx && raCierre && raIdx !== raCierre)
    A('RA del índice (' + raIdx + ') ≠ RA del cierre (' + raCierre + ')');

  // 7) Puntos enlazados desde el índice
  for (const p of puntos) {
    if (!idx.includes(p.replace(/\.md$/, ''))) A('el índice no enlaza el punto ' + p);
  }

  // 8) Boletines de la unidad
  const bolDir = join(ROOT, 'boletines');
  if (num && existsSync(bolDir)) {
    const bols = readdirSync(bolDir).filter((f) => f.startsWith('boletin-U' + num + '-'));
    const bases = bols.filter((f) => !f.endsWith('-resuelto.md'));
    if (bases.length === 0) A('sin boletines propios (¿exenta?)');
    for (const b of bases) {
      if (!bols.includes(b.replace(/\.md$/, '-resuelto.md'))) F('boletin: falta ' + b.replace(/\.md$/, '-resuelto.md'));
      if (!idx.toLowerCase().includes(b.replace(/\.md$/, '').toLowerCase())) F('índice: no enlaza ' + b);
    }
    for (const b of bols) {
      const t = md(join(bolDir, b));
      if (!frontmatterOk(t)) F(b + ': sin frontmatter title/description');
      if (/\]\(\/ApuntesRedes\/(diagrams|photos)\//.test(t)) F(b + ': lleva imágenes/diagramas (los boletines son texto puro)');
      for (const l of extraerEnlaces(t)) {
        if (!enlaceOk(l)) F(b + ': enlace roto ' + l);
      }
    }
  }

  return { fallos, avisos, npuntos: puntos.length };
}

// ---------- CLI ----------
const arg = (process.argv[2] || 'all').toLowerCase();
const todos = readdirSync(ROOT)
  .filter((d) => d !== 'boletines' && statSync(join(ROOT, d)).isDirectory())
  .sort();

let elegidas = todos;
if (arg !== 'all') {
  const norm = /^\d+$/.test(arg) ? arg.padStart(2, '0') : arg;
  elegidas = todos.filter((d) => d === norm || d.startsWith(norm + '-') || d.includes(arg));
  if (elegidas.length === 0) {
    console.error('No encuentro la unidad «' + arg + '». Usa: ' + todos.join(', ') + ' | all');
    process.exit(2);
  }
}

let totalF = 0;
let totalA = 0;
for (const dir of elegidas) {
  const { fallos, avisos } = auditarUnidad(dir);
  const tag = fallos.length ? '❌' : '✅';
  console.log(tag + ' ' + dir + (fallos.length ? ' — ' + fallos.length + ' fallo(s)' : '') + (avisos.length ? ' — ' + avisos.length + ' aviso(s)' : ''));
  for (const f of fallos) console.log('   FALLO  ' + f);
  for (const a of avisos) console.log('   AVISO  ' + a);
  totalF += fallos.length;
  totalA += avisos.length;
}
console.log('---');
console.log(elegidas.length + ' unidad(es) · ' + totalF + ' fallo(s) · ' + totalA + ' aviso(s)');
process.exit(totalF > 0 ? 1 : 0);
