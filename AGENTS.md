# AGENTS.md — Guía para LLMs sobre el proyecto Apuntes PAR

Este archivo ayuda a cualquier agente LLM (como opencode, Claude, ChatGPT, etc.) a entender la estructura y convenciones del proyecto para trabajar de forma efectiva.

---

## 📋 Descripción del proyecto

Apuntes del módulo **PAR** (Planificación y Administración de Redes) para CFGS de Administración de Sistemas Informáticos en Red. 12 unidades didácticas con enfoque 80% práctico, estilo _Head First_. Publicado como web estática con Astro + Starlight + GitHub Pages.

---

## 🏗️ Stack

- **Framework:** Astro 7 + Starlight 0.41
- **Idioma:** Solo castellano (NO hay versión valenciana)
- **Tema:** Azul #2563eb + teal #4ecdc4, glassmorphism, degradados, Geist Sans
- **Exportación:** PDF (starlight-to-pdf con portada) + EPUB (Pandoc)
- **Despliegue:** GitHub Actions → GitHub Pages en rama `master`
- **Diagramas:** D2 (Terrastruct) → SVGs en `public/diagrams/`
- **WASM:** Rust + wasm-pack (código fuente didáctico)

---

## 📁 Estructura de directorios

```
src/content/docs/            → Unidades en Markdown (raíz)
src/content/boletines/       → Ejercicios (inicial, intermedio, extras)
src/styles/custom.css        → CSS del tema (azul #2563eb + teal #4ecdc4, Geist Sans, glassmorphism)
src/assets/logo.svg          → Logo
componentes-wasm/            → Código Rust para WebAssembly
scripts/                     → Scripts de exportación (PDF, EPUB) y diagramas (D2)
public/diagrams/             → SVGs generados con D2 (Terrastruct)
public/portada.svg           → Portada para web, PDF y EPUB
public/pdf/                  → PDFs generados (ApuntesPAR.pdf)
public/epub/                 → EPUBs generados (ApuntesPAR.epub)
```

---

## 📝 Convenciones para escribir unidades

### Frontmatter requerido

Cada unidad `.md` debe empezar con:

```yaml
---
title: U0X — Título
description: Descripción corta 😵
---
```

### Secciones obligatorias (en este orden)

1. **Mapa viaje P4QU3T3** — barra de progreso con emojis
2. **📚 Contenidos** — lista de temas
3. **⭐ Sé el Paquete** — escenario interactivo con opciones múltiples
4. **🔥 Fireside Chat** — debate entre dos conceptos
5. **🕵️ ¿Quién Soy?** — adivinanzas con `<details>` para solución
6. **🤬 CONRAD VS EL MUNDO** — error típico explicado con humor
7. **⚡ Laboratorio de Tortura** — práctica Packet Tracer con fallos intencionados
8. **🧠 Atrévete a Pensar** — ejercicios con `<details>` solución
9. **🧩 Crucigrama de Bits** — con `<details>` solución
10. **💬 Entrevista de trabajo** — preguntas reales
11. **🤷 No Hay Preguntas Tontas** — FAQ con P4QU3T3 y CONRAD
12. **🎬 Post-Créditos** — escena cómica con "PRÓXIMAMENTE EN U0X"
13. **✅ CEs cubiertos** — tabla de criterios de evaluación

### Secciones opcionales

- **🏆 Logros** — gamificación (meter al inicio o final)
- **🐍 Spoiler / Soluciones** — usar siempre `<details><summary>...</summary>...</details>`

### Estilo de escritura

- **Lenguaje:** Conversacional, humorístico, castellano
- **Personajes fijos:**
  - **CONRAD** — switch cascarrabias, responde con sarcasmo pero correcto
  - **Fireside Chat** — personificar tecnologías (Switch vs Hub, IPv4 vs IPv6, etc.)
- **Nota:** El personaje P4QU3T3 (mascota paquete IP) se ha eliminado del contenido. Las secciones que lo usaban (Sé el Paquete, No Hay Preguntas Tontas, Post-Créditos) se mantienen con un tono más profesional, sin personificación del paquete.
- **Formato:** Markdown con emojis, `>` blockquotes para secciones especiales
- **Código:** Usar bloques de código con lenguaje especificado
- **Soluciones:** Siempre dentro de `<details>` para no spoilear
- **Laboratorios:** Incluir SIEMPRE un fallo intencionado que el alumno deba diagnosticar

### Ejemplo de bloque de soluciones

```html
<details>
<summary>🔄 Respuestas</summary>
1. **Router** — El que siempre sabe por dónde ir.
</details>
```

---

## 🧩 WASM (Rust)

Los componentes WASM son didácticos: el código Rust debe estar comentado en castellano explicando cada paso. El alumno debe poder leer el `lib.rs` y entender qué hace.

Cada proyecto WASM sigue esta estructura:

```
componentes-wasm/nombre/
├── Cargo.toml         → wasm-bindgen como dependencia
├── src/
│   └── lib.rs         → Código comentado didácticamente
└── README.md          → Cómo compilar y qué simula
```

---

## 📄 Estilo Markdown

- Títulos: `#` para título, `##` para secciones principales, `###` para subsecciones
- Listas: `-` con espacio, anidadas con 2 espacios
- Código inline: `` `backticks` ``
- Código bloque: ` ```lenguaje `
- Tablas: pipe syntax con `|---|---|`
- Emojis: usar emojis unicode directos (✅ ❌ 😡 🎬)
- Blockquotes: `> ` para citas normales
- Enlaces: `[texto](url)` formato estándar
- Imágenes: `![alt](/ApuntesRedes/ruta.png)` para imágenes en `public/`
- Diagramas: Generar con D2 (Terrastruct) — `scripts/generate-diagrams.mjs` ejecuta D2 antes del build. Referenciar en `.mdx` como `/ApuntesRedes/diagrams/nombre.svg`. Requiere D2 CLI instalado.

---

## 🚀 Comandos

```bash
npm run dev       # Servidor local
npm run build     # Build producción
npm run preview   # Previsualizar build
npm run pdf       # Generar PDFs
npm run pdf:local # Generar PDF desde localhost
npm run epub      # Generar EPUB
npm run export    # PDF + EPUB
npm run diagrams  # Generar diagramas con D2 (Terrastruct)
```

---

## 🌐 URLs

- **Repositorio:** https://github.com/sergarb1/ApuntesRedes
- **GitHub Pages:** https://sergarb1.github.io/ApuntesRedes/
- **Base path:** `/ApuntesRedes` (configurado en `astro.config.mjs`)

---

## ⚠️ Notas importantes para el agente

1. **NO crear versiones en valenciano** — Solo castellano.
2. **NO modificar `astro.config.mjs`** a menos que sea necesario para nuevas secciones.
3. **Siempre mantener las secciones Head First** — cada unidad debe tener todas las secciones enumeradas arriba.
4. **Los ejercicios SIEMPRE con solución** en `<details>`.
5. **Laboratorios SIEMPRE con fallo intencionado** — el 80% práctico es obligatorio.
6. **Los boletines siguen el patrón:** `inicial` (fácil), `intermedio` (medio), `extras` (CodeWars/retos), cada uno con su `-resuelto`.
7. **El CSS no debe romperse** — probar con `npm run build` después de cambios.
8. **CI/CD en rama `master`** — no `main`.
9. **Puppeteer** instalado para PDFs, pero con `PUPPETEER_SKIP_DOWNLOAD=true` en CI.
10. **D2 (Terrastruct)** para diagramas — script en `scripts/generate-diagrams.mjs`, ejecuta D2 antes del build. Referenciar en `.mdx` como `/ApuntesRedes/diagrams/nombre.svg`. Requiere D2 CLI instalado.
11. **El build ejecuta `npm run build` que genera diagramas automáticamente** (prependido en el script).
12. **PDF** se genera con `starlight-to-pdf` — un único PDF con todas las unidades y portada. Ver `scripts/pdf-*.html`.
13. **EPUB** se genera con Pandoc — `scripts/generate-epub.ps1` + `scripts/epub.css`.

---

## 🧪 Checklist para nueva unidad

- [ ] Frontmatter (title, description con emoji)
- [ ] 🗺️ Ruta del paquete actualizada
- [ ] 📚 Contenidos listados
- [ ] ⭐ Sé el Paquete con 2-3 opciones
- [ ] 🔥 Fireside Chat entre dos conceptos
- [ ] 🕵️ ¿Quién Soy? (3-4 adivinanzas)
- [ ] 🤬 CONRAD VS EL MUNDO
- [ ] ⚡ Laboratorio de Tortura (con fallo intencionado)
- [ ] 🧠 Atrévete a Pensar (3-4 ejercicios)
- [ ] 🧩 Crucigrama de Bits
- [ ] 💬 Entrevista de trabajo (3-5 preguntas)
- [ ] 🤷 No Hay Preguntas Tontas (2-3 preguntas)
- [ ] 🎬 Post-Créditos (con PRÓXIMAMENTE)
- [ ] ✅ CEs cubiertos (tabla)
- [ ] Sidebar actualizado en `astro.config.mjs`
- [ ] `npm run build` exitoso
- [ ] Boletín creado (inicial + intermedio + extras + resueltos)
