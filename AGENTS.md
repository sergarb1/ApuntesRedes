# AGENTS.md — Guía para LLMs sobre el proyecto Apuntes PAR

Este archivo ayuda a cualquier agente LLM (como opencode, Claude, ChatGPT, etc.) a entender la estructura y convenciones del proyecto para trabajar de forma efectiva.

---

## 📋 Descripción del proyecto

Apuntes del módulo **PAR** (Planificación y Administración de Redes) para CFGS de Administración de Sistemas Informáticos en Red. 13 secciones didácticas (Unidad 01 de introducción + 12 unidades) con enfoque 80% práctico y un estilo conversacional con humor. Publicado como web estática con Astro + Starlight + GitHub Pages.

---

## 🏗️ Stack

- **Framework:** Astro 7 + Starlight 0.41
- **Idioma:** Solo castellano (NO hay versión valenciana)
- **Tema:** Azul #2563eb + teal #4ecdc4, glassmorphism, degradados, Geist Sans
- **Exportación:** PDF (starlight-to-pdf con portada) + EPUB (Pandoc)
- **Despliegue:** GitHub Actions → GitHub Pages en rama `main`
- **Diagramas:** D2 (Terrastruct) → SVGs en `public/diagrams/`


---

## 📁 Estructura de directorios

```
src/content/docs/            → Secciones en Markdown (raíz, índice)
src/content/docs/01-introduccion/… → 9 puntos por sección (01-…, 09-cierre)
src/content/docs/boletines/  → Ejercicios (inicial, avanzado + resueltos)
src/styles/custom.css        → CSS del tema (azul #2563eb + teal #4ecdc4, Geist Sans, glassmorphism)
src/assets/logo.svg          → Logo
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

1. **Mapa viaje / ruta del paquete** — barra de progreso con emojis
2. **📚 Contenidos** — lista de temas
3. **⭐ Sé el Paquete** — escenario interactivo con opciones múltiples
4. **🔥 Fireside Chat** — debate entre dos conceptos
5. **🕵️ ¿Quién Soy?** — adivinanzas con `<details>` para solución
6. **🤬 CONRAD VS EL MUNDO** — error típico explicado con humor
7. **⚡ Laboratorio de tortura** — práctica Packet Tracer con fallos intencionados
8. **🧠 Atrévete a pensar** — ejercicios con `<details>` solución
9. **🧩 Crucigrama de bits** — con `<details>` solución
10. **💬 Entrevista de trabajo** — preguntas reales
11. **🤷 No hay preguntas tontas** — FAQ (con CONRAD)
12. **🎬 Poscréditos** — escena cómica con "PRÓXIMAMENTE EN U0X"
13. **✅ CEs cubiertos** — tabla de criterios de evaluación

### Secciones opcionales

- **🏆 Logros** — gamificación (meter al inicio o final)
- **🐍 Spoiler / Soluciones** — usar siempre `<details><summary>...</summary>...</details>`

### Estilo de escritura

- **Lenguaje:** Conversacional, humorístico, castellano
- **Personajes fijos:**
  - **CONRAD** — switch cascarrabias, responde con sarcasmo pero correcto
  - **Fireside Chat** — personificar tecnologías (Switch vs Hub, IPv4 vs IPv6, etc.)
- **Nota:** El personaje P4QU3T3 (mascota paquete IP) se ha eliminado del contenido. Las secciones que lo usaban (Sé el Paquete, No hay preguntas tontas, Poscréditos) se mantienen con un tono más profesional, sin personificación del paquete.
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

## 🗣️ Requisito lingüístico (es-ES)

**Todo el contenido generado o modificado debe estar escrito en español de España (es-ES)**: apuntes, boletines, OpenSpec, documentación, títulos, ejemplos y comentarios. Español natural de profesor de FP de informática en España — no español latinoamericano ni traducción literal del inglés.

### Equivalencias obligatorias

| Evitar (LatAM / anglicismo) | Usar (es-ES) |
|---|---|
| computadora / computación | ordenador / informática |
| prender / prendida | encender / encendida |
| celular | móvil |
| laptop / notebook | portátil |
| manejar (gestionar/controlar) | gestionar, dominar, administrar |
| armar (montar algo) | montar |
| correr (servicio/proceso/paquete) | ejecutarse, arrancar, recorrer |
| bajar (una descarga) | descargar |
| chequear | comprobar, revisar |
| driver (en prosa) | controlador |
| email (en prosa) | correo / correo electrónico |
| monitorear / monitoreo | monitorizar / monitorización |
| ~4.3 mil millones (calco de *billion*) | unos 4.300 millones |
| Separadores miles US `16,777,216` | formato es-ES `16.777.216` |

No es sustitución mecánica: detecta también giros y construcciones que suenen a LatAm o a traducción automática y reformúlalos con naturalidad.

### Terminología técnica que se mantiene en inglés

`router`, `switch`, `firewall`, `gateway`, `socket`, `hostname`, `software`, `hardware`, `backup`… No traducir artificialmente términos asentados en la documentación profesional que leerá el alumnado.

### Reglas de estilo

- Claro, didáctico, directo y profesional, adecuado para alumnado de FP de informática.
- Sin coloquialismos excesivos ni formalidad burocrática ("se procederá a", "cabe destacar").
- Trato al alumno: tú / vosotros (nunca usted/ustedes).
- **Mayúsculas:** estilo oracional en títulos y secciones ("Laboratorio de tortura", "Atrévete a pensar", "Crucigrama de bits", "No hay preguntas tontas", "Poscréditos") — nada de Title Case ni TODO MAYÚSCULAS; las siglas técnicas (STP, VLAN, NAT…) conservan su forma.
- Formato numérico español: punto o espacio para millares (`65.536`), coma decimal.
- **Antes de dar por terminado cualquier contenido:** comprobación lingüística final — ¿suena a profesor español escribiendo en su idioma o a una traducción?

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
3. **Siempre mantener las secciones obligatorias** — cada unidad debe tener todas las secciones enumeradas arriba.
4. **Los ejercicios SIEMPRE con solución** en `<details>`.
5. **Laboratorios SIEMPRE con fallo intencionado** — el 80% práctico es obligatorio.
6. **Los boletines siguen el patrón:** `inicial` (fácil) y `avanzado` (difícil), cada uno con su `-resuelto`, en `src/content/docs/boletines/` con nombre `boletin-UXX-inicial(-resuelto).md` / `boletin-UXX-avanzado(-resuelto).md`.
7. **El CSS no debe romperse** — probar con `npm run build` después de cambios.
8. **CI/CD en rama `main`**.
9. **Puppeteer** instalado para PDFs, pero con `PUPPETEER_SKIP_DOWNLOAD=true` en CI. En local, si la versión cacheada de Chrome falla, se usa el Chrome del sistema con `PUPPETEER_EXECUTABLE_PATH="C:\Program Files\Google\Chrome\Application\chrome.exe"`.
10. **D2 (Terrastruct)** para diagramas — script en `scripts/generate-diagrams.mjs`, ejecuta D2 antes del build. Referenciar en `.mdx` como `/ApuntesRedes/diagrams/nombre.svg`. Requiere D2 CLI instalado.
11. **El build ejecuta `npm run build` que genera diagramas automáticamente** (prependido en el script).
12. **PDF** se genera con `starlight-to-pdf` — un único PDF con todas las unidades y portada. Ver `scripts/pdf-*.html`.
13. **EPUB** se genera con Pandoc — `scripts/generate-epub.ps1` + `scripts/epub.css`. El script reescribe las rutas `/ApuntesRedes/diagrams/` → `public/diagrams/` para que Pandoc encuentre los SVGs.
14. **Lenguaje es-ES obligatorio** — todo texto nuevo o editado cumple la sección 🗣️ Requisito lingüístico; hacer la comprobación lingüística antes de cerrar.

---

## 🧪 Checklist para nueva unidad

- [ ] Frontmatter (title, description con emoji)
- [ ] 🗺️ Ruta del paquete actualizada
- [ ] 📚 Contenidos listados
- [ ] ⭐ Sé el Paquete con 2-3 opciones
- [ ] 🔥 Fireside Chat entre dos conceptos
- [ ] 🕵️ ¿Quién Soy? (3-4 adivinanzas)
- [ ] 🤬 CONRAD VS EL MUNDO
- [ ] ⚡ Laboratorio de tortura (con fallo intencionado)
- [ ] 🧠 Atrévete a pensar (3-4 ejercicios)
- [ ] 🧩 Crucigrama de bits
- [ ] 💬 Entrevista de trabajo (3-5 preguntas)
- [ ] 🤷 No hay preguntas tontas (2-3 preguntas)
- [ ] 🎬 Poscréditos (con PRÓXIMAMENTE)
- [ ] ✅ CEs cubiertos (tabla)
- [ ] Sidebar actualizado en `astro.config.mjs`
- [ ] 🗣️ Comprobación lingüística es-ES superada (sección Requisito lingüístico)
- [ ] `npm run build` exitoso
- [ ] Boletín creado (inicial + avanzado + resueltos)
