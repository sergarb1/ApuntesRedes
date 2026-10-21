#!/usr/bin/env node
/**
 * lib-add.mjs — Usar items de librerías .excalidrawlib en el canvas de mcp-excalidraw-server.
 *
 * El canvas del agente (mcp-excalidraw-server) no soporta cargar .excalidrawlib directamente;
 * este helper extrae los items (formato v2 `libraryItems` y legacy v1 `library`) y emite un
 * batch JSON de elementos normalizados que se canaliza a `add -`:
 *
 *   node scripts/lib-add.mjs docs/libraries/network-topology-icons.excalidrawlib 8 9 \
 *     | npx -y mcp-excalidraw-server add -
 *
 * Uso:
 *   node scripts/lib-add.mjs --list <fichero.excalidrawlib>
 *       Muestra el catálogo de items (índice, tamaño, nº de elementos, etiqueta).
 *
 *   node scripts/lib-add.mjs <fichero.excalidrawlib> [--width N] [índice...]
 *       Emite a stdout un array JSON con los items seleccionados (por defecto, todos),
 *       colocados en fila, listos para `npx -y mcp-excalidraw-server add -`.
 *
 * Normalización aplicada a cada item:
 * - Traslación al origen (0,0) y re-escalado proporcional al ancho objetivo (--width, 220 por defecto).
 * - Regeneración de ids, groupIds, bindings de flechas y containerId de textos ligados.
 * - fontSize escalado (mínimo 12 para que siga siendo legible).
 * - Colocación de los items en fila (gap 40 px) para que no se solapen en el lienzo.
 */

import { readFileSync } from 'node:fs'

const args = process.argv.slice(2)

function usage(code = 2) {
  console.error(`Uso:
  node scripts/lib-add.mjs --list <fichero.excalidrawlib>
  node scripts/lib-add.mjs <fichero.excalidrawlib> [--width N] [índice...] > items.json

  # Insertar items 8 y 9 (router, firewall) en el lienzo:
  node scripts/lib-add.mjs docs/libraries/network-topology-icons.excalidrawlib 8 9 \\
    | npx -y mcp-excalidraw-server add -`)
  process.exit(code)
}

if (args.length === 0) usage()

const listMode = args[0] === '--list'
const file = listMode ? args[1] : args[0]
if (!file) usage()

let targetWidth = 220
const rest = []
for (let i = listMode ? 2 : 1; i < args.length; i++) {
  if (args[i] === '--width') {
    targetWidth = Number(args[++i])
    if (!Number.isFinite(targetWidth) || targetWidth <= 0) usage(2)
  } else {
    rest.push(args[i])
  }
}
const indices = rest.map(Number).filter(n => Number.isInteger(n) && n >= 0)

let data
try {
  data = JSON.parse(readFileSync(file, 'utf8'))
} catch (err) {
  console.error(`No se pudo leer ${file}: ${err.message}`)
  process.exit(1)
}

// ---- Formato v2 (libraryItems: [{elements, name?}, ...]) y legacy v1 (library: [[el,...],...])
const items = (data.libraryItems ?? data.library ?? [])
  .map(it => {
    const elements = Array.isArray(it) ? it : (it.elements ?? [])
    return {
      name: Array.isArray(it) ? undefined : it.name,
      elements: elements.filter(e => e && !e.isDeleted),
    }
  })
  .filter(it => it.elements.length > 0)

if (items.length === 0) {
  console.error(`Sin items utilizables en ${file} (¿formato excalidrawlib válido?)`)
  process.exit(1)
}

const bbox = elements => {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
  for (const el of elements) {
    minX = Math.min(minX, el.x ?? 0)
    minY = Math.min(minY, el.y ?? 0)
    maxX = Math.max(maxX, (el.x ?? 0) + (el.width ?? 0))
    maxY = Math.max(maxY, (el.y ?? 0) + (el.height ?? 0))
  }
  return { minX, minY, width: maxX - minX, height: maxY - minY }
}

const r2 = v => Math.round(v * 100) / 100

function normalizeItem(elements, { width: targetW, idBase }) {
  const clone = structuredClone(elements)
  const box = bbox(clone)
  const scale = box.width > 0 ? targetW / box.width : 1

  // Mapas de re-indentificación (ids de elemento y de grupo)
  const idMap = new Map()
  clone.forEach((el, i) => idMap.set(el.id, `${idBase}-e${i}`))
  const gidMap = new Map()
  for (const el of clone) {
    for (const gid of el.groupIds ?? []) {
      if (!gidMap.has(gid)) gidMap.set(gid, `${idBase}-g${gidMap.size}`)
    }
  }

  for (const el of clone) {
    el.id = idMap.get(el.id)
    el.groupIds = (el.groupIds ?? []).map(gid => gidMap.get(gid)).filter(Boolean)
    if (el.containerId) el.containerId = idMap.get(el.containerId) ?? null
    if (el.boundElements) {
      el.boundElements = el.boundElements
        .map(b => ({ ...b, id: idMap.get(b.id) }))
        .filter(b => b.id)
    }
    if (el.startBinding?.elementId) {
      el.startBinding = { ...el.startBinding, elementId: idMap.get(el.startBinding.elementId) ?? el.startBinding.elementId }
    }
    if (el.endBinding?.elementId) {
      el.endBinding = { ...el.endBinding, elementId: idMap.get(el.endBinding.elementId) ?? el.endBinding.elementId }
    }

    el.x = r2((el.x - box.minX) * scale)
    el.y = r2((el.y - box.minY) * scale)
    if (typeof el.width === 'number') el.width = r2(el.width * scale)
    if (typeof el.height === 'number') el.height = r2(el.height * scale)
    if (typeof el.fontSize === 'number') el.fontSize = Math.max(12, r2(el.fontSize * scale))
    if (Array.isArray(el.points)) el.points = el.points.map(p => [r2(p[0] * scale), r2(p[1] * scale)])
    el.seed = Math.floor(Math.random() * 2 ** 31)
  }

  return { elements: clone, width: r2(box.width * scale) }
}

if (listMode) {
  console.log(`# ${file} — ${items.length} items (formato ${data.libraryItems ? 'v2' : 'v1 legacy'})`)
  items.forEach((it, i) => {
    const b = bbox(it.elements)
    const firstText = it.elements.find(e => e.type === 'text')?.text
    const label = it.name ?? (firstText ? firstText.replace(/\n/g, ' ').slice(0, 48) : `${it.elements[0].type} (+${it.elements.length - 1} elems)`)
    console.log(String(i).padStart(3), `${Math.round(b.width)}x${Math.round(b.height)}`.padStart(10), `${it.elements.length} els`, label)
  })
  process.exit(0)
}

// ---- Modo batch: items seleccionados (o todos) normalizados y colocados en fila
const selected = indices.length ? indices.filter(i => i < items.length) : items.map((_, i) => i)
if (selected.length === 0) {
  console.error('Ningún índice válido para esta librería')
  process.exit(1)
}

const GAP = 40
const stamp = Date.now().toString(36)
let cursorX = 0
const out = []
for (const i of selected) {
  const { elements, width } = normalizeItem(items[i].elements, { width: targetWidth, idBase: `lib${stamp}-${i}` })
  for (const el of elements) {
    el.x = r2(el.x + cursorX)
    out.push(el)
  }
  cursorX += width + GAP
}

console.log(JSON.stringify(out))
