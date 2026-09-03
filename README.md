# Apuntes PAR — Planificación y Administración de Redes

> **Aprende redes como si la red se fuera a caer mañana.**  
> 13 unidades didácticas (Unidad 01 de introducción + 12 de contenido) · 80% práctico · Estilo conversacional

**CC BY-SA 4.0** — [Sergi Garcia Barea](https://github.com/sergarb1)

---

## 🌐 Web

**🧭 [https://sergarb1.github.io/ApuntesRedes/](https://sergarb1.github.io/ApuntesRedes/)**

---

## 🗺️ El viaje del paquete

Un paquete IP viaja desde que nace en un navegador hasta la nube. Cada unidad avanza con él.

```
U01: 🚪 Bienvenida  → U02: 🏠 Origen     → U03: 📦 Encapsulado → U04: 🔌 Cable
U05: 🏷️ IP          → U06: 🌍 IPv6       → U07: 🔀 Switch      → U08: 🏢 VLAN
U09: 🧭 Router      → U10: 🗣️ OSPF        → U11: 🌐 NAT         → U12: 🩺 Diagnóstico → U13: ☁️ Cloud
```

---

## 📚 Unidades

| # | Título | Nombre didáctico | RA | Proyecto |
|---|---|---|---|---|
| U01 | Introducción | Tu punto de partida 🚪 | — | Ponerte al día |
| U02 | Fundamentos de redes | La red mágica que no funciona 😵‍💫 | RA1 | Montar red desde cero |
| U03 | Modelos y análisis de tráfico | El paquete perdido 🧳 | RA1 | Rastrear paquete con Wireshark |
| U04 | Infraestructura física | El cable traicionero 🔌 | RA2 | Cableado oficina + crimpado |
| U05 | IPv4 y subnetting | La calculadora maldita 🧮 | RA2 | Diseñar red IP empresarial |
| U06 | IPv6 y transición | El futuro que ya llegó 🚀 | RA2/RA7 | Migrar red a IPv6 |
| U07 | Switching y STP | El switch enfadado 😡 | RA3 | Red empresarial segmentada |
| U08 | VLANs | La oficina dividida 🏢 | RA5 | Separar departamentos en red |
| U09 | Routing y ACLs | El GPS perdido 🧭 | RA4 | Conectar sedes remotas |
| U10 | Routing dinámico | El router que habla solo 🗣️ | RA6 | Red corporativa escalable |
| U11 | NAT y acceso a Internet | Internet no funciona otra vez 🌐 | RA7 | Conectar empresa a Internet |
| U12 | Diagnóstico y monitorización | Apágalo y vuelve a encenderlo 🧠 | Transv. | NOC + reparar averías |
| U13 | Cloud, virtualización y futuro | La nube que no es vapor ☁️ | Ampliación | Infraestructura híbrida |

---

## 🧩 Secciones de cada unidad

| Sección | ¿Qué es? |
|---|---|
| ⭐ **Sé el Paquete** | Te pones en la piel del paquete y tomas decisiones de routing |
| 🔥 **Fireside Chat** | Dos tecnologías discutiendo junto a la chimenea de datos |
| 🕵️ **¿Quién Soy?** | Adivina el concepto de red por su descripción |
| 🤬 **CONRAD VS EL MUNDO** | CONRAD (el switch cascarrabias) se queja de errores típicos |
| ⚡ **Laboratorio de tortura** | Prácticas en Packet Tracer con fallos intencionados |
| 🧠 **Atrévete a pensar** | Ejercicios teórico-prácticos con soluciones |
| 🧩 **Crucigrama de bits** | Términos de red en formato puzzle |
| 💬 **Entrevista de trabajo** | Preguntas reales de procesos de selección |
| 🤷 **No hay preguntas tontas** | FAQ con CONRAD |
| 🏆 **Logros** | Gamificación: consigue todos los achievements |
| 🎬 **Poscréditos** | Escenas cómicas con continuidad narrativa |

---

## 🛠️ Stack tecnológico

| Capa | Tecnología |
|---|---|
| **Framework** | [Astro](https://astro.build/) 7 + [Starlight](https://starlight.astro.build/) |
| **Tema** | Azul #2563eb + teal #4ecdc4 + glassmorphism sidebar + degradados |
| **Fuente** | Geist Sans (fallback Inter) |
| **Idioma** | Castellano (raíz `/`) |
| **Buscador** | Pagefind integrado (Starlight) |
| **Renderizado** | D2 (Terrastruct) → SVGs vectoriales |
| **Despliegue** | GitHub Actions → GitHub Pages (`main` branch) |

---

---

## 📦 Scripts

```bash
npm run diagrams  # Generar diagramas con D2 → public/diagrams/
npm run dev       # Servidor local → http://localhost:4321
npm run build     # Genera diagramas + build estático → dist/
npm run preview   # Previsualizar build
npm run pdf       # PDF único (ApuntesPAR.pdf) desde GitHub Pages → public/pdf/
npm run pdf:local # PDF único desde el servidor local (localhost:4321)
npm run epub      # Generar EPUB completo → public/epub/
npm run export    # PDF + EPUB (todo en uno)
```

### Exportación

| Formato | Cómo generarlo | Uso |
|---|---|---|
| **PDF** | `npm run pdf` / `npm run pdf:local` | 1 PDF único con todas las unidades y portada → `public/pdf/ApuntesPAR.pdf` |
| **EPUB** | `npm run epub` | 1 archivo EPUB completo para eBook readers |
| **Ctrl+P** | Desde el navegador | Por página, con estilos print optimizados |

---

## 📁 Estructura del proyecto

```
src/
├── content/
│   ├── docs/                     → 13 unidades en Markdown
│   │   ├── index.md              → Portada con hero + cards
│   │   ├── 01-introduccion.md …  → Índice de cada sección
│   │   ├── 01-introduccion/      → Puntos por sección (01-…, 09-cierre)
│   │   └── boletines/            → Ejercicios (inicial, avanzado + resueltos)
│   └── config.ts                 → Colecciones de contenido
├── styles/
│   └── custom.css                → Tema azul + glassmorphism + print
├── assets/
│   └── logo.svg                  → Logo PAR
└── env.d.ts
├── scripts/
│   ├── generate-diagrams.mjs     → Generación SVG con D2
│   ├── pdf-cover.html             → Portada PDF
│   ├── pdf-header.html            → Cabecera PDF
│   ├── pdf-footer.html            → Pie PDF
│   ├── epub.css                   → Estilos EPUB
│   └── generate-epub.ps1          → Generación EPUB
├── .github/workflows/
│   └── deploy.yml                → CI/CD a GitHub Pages
├── astro.config.mjs              → Config Astro + Starlight
├── package.json
└── README.md
```

---

## 🧪 ¿Cómo contribuir / usar?

1. Clona el repo: `git clone https://github.com/sergarb1/ApuntesRedes.git`
2. Instala dependencias: `npm install`
3. Edita los `.md` en `src/content/docs/`
4. Visualiza cambios: `npm run dev`
5. Genera build: `npm run build`


---

## 📄 Licencia

[![CC BY-SA 4.0](https://licensebuttons.net/l/by-sa/4.0/88x31.png)](https://creativecommons.org/licenses/by-sa/4.0/)

**CC BY-SA 4.0** — Creative Commons Attribution-ShareAlike 4.0 International

Eres libre de:
- **Compartir** — copiar y redistribuir el material en cualquier medio
- **Adaptar** — remezclar, transformar y crear a partir del material

Bajo los siguientes términos:
- **Atribución** — Debes dar crédito adecuado, proporcionar un enlace a la licencia
- **CompartirIgual** — Si remezclas, transformas o creas, debes distribuir bajo la misma licencia

Basado libremente en [oscarmaestre.github.io/apuntes_redes](https://oscarmaestre.github.io/apuntes_redes/) como inspiración pedagógica.

---

> _"La red está viva. Y mientras haya un bit que transmitir, habrá un paquete que viaje."_  
> — CONRAD el switch, probablemente
