# Apuntes PAR — Planificación y Administración de Redes

> **Aprende redes como si la red se fuera a caer mañana.**  
> 12 unidades didácticas · 80% práctico · Estilo _Head First_

**CC BY-SA 4.0** — [Sergi Garcia Barea](https://github.com/sergarb1)

---

## 🌐 Web

**🧭 [https://sergarb1.github.io/ApuntesRedes/](https://sergarb1.github.io/ApuntesRedes/)**

---

## 🗺️ El Viaje de P4QU3T3

P4QU3T3 es un paquete IP perdido que intenta llegar a su destino. Cada unidad avanzamos con él.

```
U01: 🏠 Origen     → U02: 📦 Encapsulado → U03: 🔌 Cable     → U04: 🏷️ IP
U05: 🌍 IPv6       → U06: 🔀 Switch       → U07: 🏢 VLAN      → U08: 🧭 Router
U09: 🗣️ OSPF       → U10: 🌐 NAT          → U11: 🩺 Diagnóstico → U12: ☁️ Cloud
```

---

## 📚 Unidades

| # | Título | Nombre didáctico | RA | Proyecto |
|---|---|---|---|---|
| U01 | Fundamentos de redes | La red mágica que no funciona 😵‍💫 | RA1 | Montar red desde cero |
| U02 | Modelos y análisis de tráfico | El paquete perdido 🧳 | RA1 | Rastrear paquete con Wireshark |
| U03 | Infraestructura física | El cable traicionero 🔌 | RA2 | Cableado oficina + crimpado |
| U04 | IPv4 y subnetting | La calculadora maldita 🧮 | RA2 | Diseñar red IP empresarial |
| U05 | IPv6 y transición | El futuro que ya llegó 🚀 | RA2/RA7 | Migrar red a IPv6 |
| U06 | Switching y STP | El switch enfadado 😡 | RA3 | Red empresarial segmentada |
| U07 | VLANs | La oficina dividida 🏢 | RA5 | Separar departamentos en red |
| U08 | Routing y ACLs | El GPS perdido 🧭 | RA4 | Conectar sedes remotas |
| U09 | Routing dinámico | El router que habla solo 🗣️ | RA6 | Red corporativa escalable |
| U10 | NAT y acceso a Internet | Internet no funciona otra vez 🌐 | RA7 | Conectar empresa a Internet |
| U11 | Diagnóstico y monitorización | Apágalo y vuelve a encenderlo 🧠 | Transv. | NOC + reparar averías |
| U12 | Cloud, virtualización y futuro | La nube que no es vapor ☁️ | Ampliación | Infraestructura híbrida |

---

## 🧩 Secciones de cada unidad

| Sección | ¿Qué es? |
|---|---|
| ⭐ **Sé el Paquete** | Te pones en la piel de P4QU3T3 y tomas decisiones de routing |
| 🔥 **Fireside Chat** | Dos tecnologías discutiendo junto a la chimenea de datos |
| 🕵️ **¿Quién Soy?** | Adivina el concepto de red por su descripción |
| 🤬 **CONRAD VS EL MUNDO** | CONRAD (el switch cascarrabias) se queja de errores típicos |
| ⚡ **Laboratorio de Tortura** | Prácticas en Packet Tracer con fallos intencionados |
| 🧠 **Atrévete a Pensar** | Ejercicios teórico-prácticos con soluciones |
| 🧩 **Crucigrama de Bits** | Términos de red en formato puzzle |
| 💬 **Entrevista de trabajo** | Preguntas reales de procesos de selección |
| 🤷 **No Hay Preguntas Tontas** | FAQ con P4QU3T3 y CONRAD |
| 🏆 **Logros** | Gamificación: consigue todos los achievements |
| 🎬 **Post-Créditos** | Escenas cómicas con continuidad narrativa |

---

## 🛠️ Stack tecnológico

| Capa | Tecnología |
|---|---|
| **Framework** | [Astro](https://astro.build/) 5 + [Starlight](https://starlight.astro.build/) |
| **Tema** | Azul #2563eb + glassmorphism sidebar + degradados |
| **Fuente** | Inter (Google Fonts) |
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
npm run pdf       # Generar PDFs por unidad → public/pdf/
npm run epub      # Generar EPUB completo → apuntes-par.epub
npm run export    # PDF + EPUB (todo en uno)
```

### Exportación

| Formato | Cómo generarlo | Uso |
|---|---|---|
| **PDF** | `npm run pdf` | 12 PDFs individuales (uno por unidad) en `public/pdf/` |
| **EPUB** | `npm run epub` | 1 archivo EPUB completo para eBook readers |
| **Ctrl+P** | Desde el navegador | Por página, con estilos print optimizados |

---

## 📁 Estructura del proyecto

```
src/
├── content/
│   ├── docs/                     → 12 unidades en Markdown
│   │   ├── index.md              → Portada con hero + cards
│   │   ├── 01-fundamentos-redes.md
│   │   ├── 02-modelos-osi-analisis.md
│   │   └── ... → 12 unidades
│   ├── boletines/                → Ejercicios (inicial, intermedio, extras)
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
