#!/usr/bin/env node
/**
 * Genera DOCX por unidad con Pandoc:
 *   docx/<unidad>/<unidad>.docx          → índice + puntos de la unidad
 *   docx/<unidad>/boletin-UXX-*.docx     → cada boletín (y resuelto) por separado
 *
 * Uso: npm run docx
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = path.join(root, 'src', 'content', 'docs');
const boletinesDir = path.join(srcDir, 'boletines');
const outRoot = path.join(root, 'docx');

const unitSlugs = [
  '01-introduccion',
  '02-ethernet-cableado',
  '03-direccionamiento-ip',
  '04-switching',
  '05-trunking-inter-vlan',
  '06-enrutamiento-estatico',
  '07-ospf',
  '08-acl-seguridad',
  '09-nat-pat',
  '10-servicios-red',
  '11-redes-inalambricas',
  '12-alta-disponibilidad',
];

function stripFrontmatter(content) {
  return content.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '').trim();
}

function getFrontTitle(content, fallback) {
  const m = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (m) {
    const t = m[1].match(/^title:\s*"?([^"\r\n]+)"?/m);
    if (t) return t[1].trim();
  }
  return fallback;
}

function rewriteAssets(content) {
  return content
    .replaceAll('/ApuntesRedes/diagrams/', 'public/diagrams/')
    .replaceAll('/ApuntesRedes/photos/', 'public/photos/')
    .replaceAll('/ApuntesRedes/cc-by-sa.png', 'public/cc-by-sa.png');
}

function demoteHeadings(content) {
  return content.replace(/^(#{1,6}) /gm, '#### $1 ');
}

function toSectionMarkdown(filePath, { headingLevel = 1, demote = false } = {}) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const base = path.basename(filePath, '.md');
  const title = getFrontTitle(raw, base);
  let body = rewriteAssets(stripFrontmatter(raw));
  if (demote) body = demoteHeadings(body);
  const h = '#'.repeat(headingLevel);
  return `${h} ${title}\n\n${body}\n`;
}

function runPandoc(md, outFile) {
  const tmp = path.join(
    root,
    `.tmp-docx-${path.basename(outFile, '.docx')}-${process.pid}.md`,
  );
  fs.writeFileSync(tmp, md, 'utf8');
  try {
    execFileSync(
      'pandoc',
      [
        tmp,
        '--from', 'markdown+raw_html',
        '--to', 'docx',
        '--toc',
        '--toc-depth=3',
        '--resource-path', `${root}${path.delimiter}${path.join(root, 'public')}`,
        '--metadata', 'lang=es-ES',
        '-o', outFile,
      ],
      { cwd: root, stdio: ['ignore', 'pipe', 'pipe'], encoding: 'utf8' },
    );
  } finally {
    fs.rmSync(tmp, { force: true });
  }
}

function listBoletines(code) {
  if (!fs.existsSync(boletinesDir)) return [];
  const prefix = `boletin-U${code}-`;
  return fs
    .readdirSync(boletinesDir)
    .filter((f) => f.endsWith('.md') && f.startsWith(prefix))
    .sort((a, b) => a.localeCompare(b, 'es'))
    .map((f) => path.join(boletinesDir, f));
}

function unitFiles(slug) {
  const files = [];
  const index = path.join(srcDir, `${slug}.md`);
  if (fs.existsSync(index)) files.push(index);
  const dir = path.join(srcDir, slug);
  if (fs.existsSync(dir)) {
    const puntos = fs
      .readdirSync(dir)
      .filter((f) => f.endsWith('.md'))
      .sort((a, b) => a.localeCompare(b, 'es'));
    for (const p of puntos) files.push(path.join(dir, p));
  }
  return files;
}

function main() {
  if (!fs.existsSync(path.join(root, 'public', 'diagrams'))) {
    console.warn('Aviso: no existe public/diagrams; los SVG pueden faltar en los DOCX.');
  }

  let ok = 0;
  let fail = 0;

  for (const slug of unitSlugs) {
    const code = slug.slice(0, 2);
    const outDir = path.join(outRoot, slug);
    fs.mkdirSync(outDir, { recursive: true });

    const files = unitFiles(slug);
    if (files.length > 0) {
      const parts = files.map((f, i) =>
        toSectionMarkdown(f, { headingLevel: i === 0 ? 1 : 1 }),
      );
      const unitOut = path.join(outDir, `${slug}.docx`);
      try {
        runPandoc(parts.join('\n'), unitOut);
        console.log(`OK  ${path.relative(root, unitOut)}`);
        ok += 1;
      } catch (e) {
        console.error(`FAIL ${slug}: ${e.message}`);
        fail += 1;
      }
    }

    for (const bf of listBoletines(code)) {
      const name = path.basename(bf, '.md');
      const out = path.join(outDir, `${name}.docx`);
      try {
        const md = toSectionMarkdown(bf, { headingLevel: 1 });
        runPandoc(md, out);
        console.log(`OK  ${path.relative(root, out)}`);
        ok += 1;
      } catch (e) {
        console.error(`FAIL ${name}: ${e.message}`);
        fail += 1;
      }
    }
  }

  console.log(`\nDOCX: ${ok} generados, ${fail} fallos → ${path.relative(root, outRoot)}/`);
  if (fail > 0) process.exitCode = 1;
}

main();
