import { execSync } from 'child_process';
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const D2 = 'C:\\Program Files\\D2\\d2.exe';
const OUT = 'public/diagrams';
const ICONS = 'public/icons';
mkdirSync(OUT, { recursive: true });

function render(name, d2code) {
  const d2Path = join(OUT, `${name}.d2`);
  const svgPath = join(OUT, `${name}.svg`);
  writeFileSync(d2Path, d2code);
  execSync(`"${D2}" "${d2Path}" "${svgPath}"`, { stdio: 'inherit' });
  console.log(`  → ${svgPath}`);
}

// Icons path relative to .d2 file location (in public/diagrams/)
const icon = (file) => `icon: ../icons/${file}`;

const box = (id, label, w, h, extra = '') => `
${id}: {
  label: "${label}"
  shape: rectangle
  style.fill: "#f8fafc"
  style.stroke: "#1e40af"
  style.stroke-width: 3
  style.border-radius: 8
  style.font-size: 13
  width: ${w}
  height: ${h}
  ${extra}
}`;

const pc = (id, label) => box(id, label, 130, 85, icon('monitor.svg'));

const link = (a, b, label = '') =>
  `${a} -> ${b}: {style.stroke: "#2563eb"; style.stroke-width: 2${label ? `; label: "${label}"` : ''}}`;

const heading = (t) => `
note: |md
# ${t}
| {
  shape: text
  near: top-center
  style.font-size: 20
}
`;

// ─────────────────────────────────────────────
// 1. Estrella
// ─────────────────────────────────────────────
render('topologia-estrella', [
  heading('Topología en Estrella'),
  'direction: up',
  '',
  `switch: {
  label: "Switch"
  shape: hexagon
  ${icon('network.svg')}
  style.fill: "#eff6ff"
  style.stroke: "#1e40af"
  style.stroke-width: 3
  style.font-size: 14
  width: 150
  height: 90
}`,
  '',
  ...['A', 'B', 'C', 'D'].map((c) => pc(`pc-${c.toLowerCase()}`, `PC-${c}`)),
  '',
  ...['A', 'B', 'C', 'D'].map((c) => link(`pc-${c.toLowerCase()}`, 'switch')),
].join('\n'));

// ─────────────────────────────────────────────
// 2. Bus
// ─────────────────────────────────────────────
render('topologia-bus', [
  heading('Topología en Bus'),
  'direction: down',
  '',
  ...['A', 'B', 'C', 'D'].map((c) => pc(`pc-${c.toLowerCase()}`, `PC-${c}`)),
  '',
  `cable: {
  label: "Cable coaxial"
  shape: rectangle
  style.fill: "#e2e8f0"
  style.stroke: "#94a3b8"
  style.stroke-width: 1
  style.font-size: 10
  style.font-color: "#64748b"
  width: 35
  height: 280
}`,
  '',
  ...['A', 'B', 'C', 'D'].map((c) => link(`pc-${c.toLowerCase()}`, 'cable')),
].join('\n'));

// ─────────────────────────────────────────────
// 3. Anillo
// ─────────────────────────────────────────────
render('topologia-anillo', [
  heading('Topología en Anillo'),
  'direction: down',
  '',
  ...['A', 'B', 'C', 'D'].map((c) => pc(`pc-${c.toLowerCase()}`, `PC-${c}`)),
  '',
  link('pc-a', 'pc-b'),
  link('pc-b', 'pc-c'),
  link('pc-c', 'pc-d'),
  link('pc-d', 'pc-a'),
].join('\n'));

// ─────────────────────────────────────────────
// 4. Malla
// ─────────────────────────────────────────────
render('topologia-malla', [
  heading('Topología en Malla'),
  'direction: up',
  '',
  ...['A', 'B', 'C', 'D'].map((c) => pc(`pc-${c.toLowerCase()}`, `PC-${c}`)),
  '',
  ...(() => {
    const ids = ['A', 'B', 'C', 'D'];
    const links = [];
    for (let i = 0; i < ids.length; i++)
      for (let j = i + 1; j < ids.length; j++)
        links.push(link(`pc-${ids[i].toLowerCase()}`, `pc-${ids[j].toLowerCase()}`));
    return links;
  })(),
].join('\n'));

// ─────────────────────────────────────────────
// 5. Modelo OSI — 7 capas
// ─────────────────────────────────────────────
const capas = [
  ['7', 'Aplicación', '#7c3aed', '#f5f3ff', 'HTTP, FTP, SMTP, DNS'],
  ['6', 'Presentación', '#8b5cf6', '#f3e8ff', 'SSL/TLS, JPEG, GIF'],
  ['5', 'Sesión', '#a78bfa', '#eef2ff', 'NetBIOS, RPC, SQL'],
  ['4', 'Transporte', '#2563eb', '#eff6ff', 'TCP, UDP'],
  ['3', 'Red', '#3b82f6', '#f0f9ff', 'IP, ICMP, ARP'],
  ['2', 'Enlace', '#60a5fa', '#f0fdf4', 'Ethernet, WiFi, MAC'],
  ['1', 'Física', '#93c5fd', '#fefce8', 'Cables, fibra, radio'],
];

render('modelo-osi-capas', [
  heading('Modelo OSI — 7 Capas'),
  capas
    .map(
      ([n, nom, stroke, fill, ej]) => `
capa-${n}: {
  label: "${n} — ${nom}\\n${ej}"
  shape: rectangle
  style.fill: "${fill}"
  style.stroke: "${stroke}"
  style.stroke-width: 2
  style.font-size: 11
  width: 360
  height: 50
}`
    )
    .join('\n'),
  '',
  ...(() => {
    const links = [];
    for (let i = 0; i < capas.length - 1; i++) {
      links.push(
        `capa-${capas[i][0]} -> capa-${capas[i + 1][0]}: {style.stroke: "#94a3b8"; style.stroke-width: 1; style.stroke-dash: 3}`
      );
    }
    return links;
  })(),
].join('\n'));

// ─────────────────────────────────────────────
// 6. Dispositivos por capa OSI
// ─────────────────────────────────────────────
render('dispositivos-osi', [
  heading('Dispositivos por Capa OSI'),
  'direction: up',
  '',
  `capa-7: {
  label: "Capa 7 — Aplicación"
  shape: rectangle
  style.fill: "#f5f3ff"
  style.stroke: "#7c3aed"
  style.stroke-width: 2
  style.font-size: 10
  width: 280
  height: 32
}`,
  `capa-4: {
  label: "Capa 4 — Transporte"
  shape: rectangle
  style.fill: "#eff6ff"
  style.stroke: "#2563eb"
  style.stroke-width: 2
  style.font-size: 10
  width: 280
  height: 32
}`,
  `capa-3: {
  label: "Capa 3 — Red"
  shape: rectangle
  style.fill: "#f0f9ff"
  style.stroke: "#3b82f6"
  style.stroke-width: 2
  style.font-size: 10
  width: 280
  height: 32
}`,
  `capa-2: {
  label: "Capa 2 — Enlace"
  shape: rectangle
  style.fill: "#f0fdf4"
  style.stroke: "#60a5fa"
  style.stroke-width: 2
  style.font-size: 10
  width: 280
  height: 32
}`,
  `capa-1: {
  label: "Capa 1 — Física"
  shape: rectangle
  style.fill: "#fefce8"
  style.stroke: "#93c5fd"
  style.stroke-width: 2
  style.font-size: 10
  width: 280
  height: 32
}`,
  '',
  `router: {
  label: "Router\\n(Capa 3)"
  shape: rectangle
  ${icon('router.svg')}
  style.fill: "#f8fafc"
  style.stroke: "#1e40af"
  style.stroke-width: 3
  style.border-radius: 8
  width: 130
  height: 85
}`,
  `switch: {
  label: "Switch\\n(Capa 2)"
  shape: hexagon
  ${icon('network.svg')}
  style.fill: "#eff6ff"
  style.stroke: "#1e40af"
  style.stroke-width: 3
  style.font-size: 12
  width: 130
  height: 80
}`,
  `pc: {
  label: "PC\\n(Capas 1-7)"
  shape: rectangle
  ${icon('monitor.svg')}
  style.fill: "#f8fafc"
  style.stroke: "#1e40af"
  style.stroke-width: 3
  style.border-radius: 8
  width: 130
  height: 85
}`,
  `firewall: {
  label: "Firewall\\n(Capas 3-4)"
  shape: rectangle
  ${icon('shield.svg')}
  style.fill: "#fef2f2"
  style.stroke: "#dc2626"
  style.stroke-width: 3
  style.border-radius: 8
  width: 130
  height: 85
}`,
  '',
  link('capa-7', 'capa-4'),
  link('capa-4', 'capa-3'),
  link('capa-3', 'capa-2'),
  link('capa-2', 'capa-1'),
  '',
  'capa-3 -> router',
  'capa-2 -> switch',
  'capa-1 -> pc',
  'capa-3 -> firewall',
  'capa-4 -> firewall',
].join('\n'));

// ─────────────────────────────────────────────
// 7. Flujo ARP/Gateway
// ─────────────────────────────────────────────
render('flujo-arp-gateway', [
  heading('Flujo ARP — Gateway por defecto'),
  'direction: right',
  '',
  `pc-a: {
  label: "PC-A\\n192.168.1.10"
  shape: rectangle
  ${icon('monitor.svg')}
  style.fill: "#f8fafc"
  style.stroke: "#1e40af"
  style.stroke-width: 3
  style.border-radius: 8
  width: 130
  height: 85
}`,
  `sw: {
  label: "Switch\\nCapa 2"
  shape: hexagon
  ${icon('network.svg')}
  style.fill: "#eff6ff"
  style.stroke: "#1e40af"
  style.stroke-width: 3
  style.font-size: 12
  width: 120
  height: 75
}`,
  `gw: {
  label: "Gateway\\n192.168.1.1"
  shape: rectangle
  ${icon('router.svg')}
  style.fill: "#f8fafc"
  style.stroke: "#2563eb"
  style.stroke-width: 3
  style.border-radius: 8
  width: 130
  height: 85
}`,
  `internet: {
  label: "Internet"
  shape: cloud
  ${icon('globe.svg')}
  style.fill: "#f0f9ff"
  style.stroke: "#3b82f6"
  style.stroke-width: 3
  style.font-size: 14
  width: 140
  height: 90
}`,
  '',
  link('pc-a', 'sw', '¿Quién tiene 192.168.1.1? (ARP)'),
  link('sw', 'gw', 'Yo, MAC: aa:bb:cc:01:01:01'),
  link('gw', 'internet', 'Salida a Internet'),
].join('\n'));

// ─────────────────────────────────────────────
// 8. Red doméstica típica
// ─────────────────────────────────────────────
render('red-domestica', [
  heading('Red Doméstica Típica'),
  'direction: right',
  '',
  `modem: {
  label: "Módem\\nFibra/ADSL"
  shape: rectangle
  ${icon('cable.svg')}
  style.fill: "#f8fafc"
  style.stroke: "#059669"
  style.stroke-width: 3
  style.border-radius: 8
  width: 120
  height: 80
}`,
  `router-wifi: {
  label: "Router WiFi\\n192.168.1.1"
  shape: rectangle
  ${icon('router.svg')}
  style.fill: "#f0f9ff"
  style.stroke: "#2563eb"
  style.stroke-width: 3
  style.border-radius: 8
  width: 130
  height: 85
}`,
  `switch-casa: {
  label: "Switch\\n4 puertos"
  shape: hexagon
  ${icon('network.svg')}
  style.fill: "#eff6ff"
  style.stroke: "#1e40af"
  style.stroke-width: 3
  style.font-size: 12
  width: 110
  height: 70
}`,
  `pc-casa: {
  label: "PC sobremesa"
  shape: rectangle
  ${icon('monitor.svg')}
  style.fill: "#f8fafc"
  style.stroke: "#1e40af"
  style.stroke-width: 3
  style.border-radius: 8
  width: 120
  height: 80
}`,
  `laptop: {
  label: "Portátil\\n(WiFi)"
  shape: rectangle
  ${icon('laptop.svg')}
  style.fill: "#f8fafc"
  style.stroke: "#7c3aed"
  style.stroke-width: 3
  style.border-radius: 8
  width: 120
  height: 80
}`,
  `phone: {
  label: "Móvil\\n(WiFi)"
  shape: rectangle
  ${icon('smartphone.svg')}
  style.fill: "#f8fafc"
  style.stroke: "#7c3aed"
  style.stroke-width: 3
  style.border-radius: 8
  width: 110
  height: 80
}`,
  `impresora: {
  label: "Impresora\\nred"
  shape: rectangle
  ${icon('hard-drive.svg')}
  style.fill: "#fefce8"
  style.stroke: "#d97706"
  style.stroke-width: 3
  style.border-radius: 8
  width: 110
  height: 80
}`,
  `internet: {
  label: "Internet"
  shape: cloud
  ${icon('globe.svg')}
  style.fill: "#f0f9ff"
  style.stroke: "#3b82f6"
  style.stroke-width: 3
  style.font-size: 14
  width: 130
  height: 85
}`,
  '',
  link('internet', 'modem'),
  link('modem', 'router-wifi'),
  link('router-wifi', 'switch-casa'),
  link('switch-casa', 'pc-casa'),
  link('switch-casa', 'impresora'),
  link('router-wifi', 'laptop'),
  link('router-wifi', 'phone'),
].join('\n'));

// ─────────────────────────────────────────────
// 9. Flujo TCP/IP — encapsulación
// ─────────────────────────────────────────────
render('flujo-encapsulacion', [
  heading('Encapsulación TCP/IP'),
  'direction: down',
  '',
  `aplicacion: {
  label: "Capa de Aplicación\\n(HTTP request)"
  shape: rectangle
  style.fill: "#f5f3ff"
  style.stroke: "#7c3aed"
  style.stroke-width: 2
  style.font-size: 11
  width: 300
  height: 40
}`,
  `transporte: {
  label: "Capa de Transporte\\nSegmento TCP (puerto 80)"
  shape: rectangle
  style.fill: "#eff6ff"
  style.stroke: "#2563eb"
  style.stroke-width: 2
  style.font-size: 11
  width: 300
  height: 40
}`,
  `red: {
  label: "Capa de Red\\nPaquete IP (origen → destino)"
  shape: rectangle
  style.fill: "#f0f9ff"
  style.stroke: "#3b82f6"
  style.stroke-width: 2
  style.font-size: 11
  width: 300
  height: 40
}`,
  `enlace: {
  label: "Capa de Enlace\\nTrama Ethernet (MACs + CRC)"
  shape: rectangle
  style.fill: "#f0fdf4"
  style.stroke: "#60a5fa"
  style.stroke-width: 2
  style.font-size: 11
  width: 300
  height: 40
}`,
  `fisica: {
  label: "Capa Física\\nBits por el cable"
  shape: rectangle
  style.fill: "#fefce8"
  style.stroke: "#93c5fd"
  style.stroke-width: 2
  style.font-size: 11
  width: 300
  height: 40
}`,
  '',
  link('aplicacion', 'transporte', 'Añade cabecera TCP'),
  link('transporte', 'red', 'Añade cabecera IP'),
  link('red', 'enlace', 'Añade cabecera Ethernet + CRC'),
  link('enlace', 'fisica', 'Codifica en bits'),
].join('\n'));

console.log('\nAll diagrams generated.');
