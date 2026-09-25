# AGENTS.md — Guía para LLMs sobre el proyecto Apuntes PAR

Este archivo ayuda a cualquier agente LLM (como opencode, Claude, ChatGPT, etc.) a entender la estructura y convenciones del proyecto para trabajar de forma efectiva.

---

## 📋 Descripción del proyecto

Apuntes del módulo **PAR** (Planificación y Administración de Redes) para CFGS de Administración de Sistemas Informáticos en Red. 12 unidades didácticas (Unidad 01 de introducción + 11 unidades de temario, UD2–UD12) con enfoque 80% práctico y un estilo conversacional con humor. Publicado como web estática con Astro + Starlight + GitHub Pages.

---

## 🏗️ Stack

- **Framework:** Astro 7 + Starlight 0.41
- **Idioma:** Solo castellano (NO hay versión valenciana)
- **Tema:** Azul #2563eb + teal #4ecdc4, glassmorphism, degradados, Geist Sans
- **Exportación:** PDF (starlight-to-pdf con portada) + EPUB (Pandoc) + DOCX por unidad (Pandoc **3.11**, vía winget en Windows)
- **Despliegue:** GitHub Actions → GitHub Pages en rama `main`
- **Diagramas:** D2 (Terrastruct) + Excalidraw (MCP `mcp-excalidraw-server`) → SVGs en `public/diagrams/`


---

## 📁 Estructura de directorios

```
src/content/docs/            → Secciones en Markdown (raíz, índices de unidad)
src/content/docs/01-introduccion/… → 10 puntos (01-…, 08-mapa, 09-glosario, 10-preguntas-tontas)
src/content/docs/02-ethernet-cableado/…      → UD2 · Ethernet, medios y cableado (10 puntos: 01–07 teoría, 08 modelo OSI, 09 trama, 10 cierre)
src/content/docs/03-direccionamiento-ip/…    → UD3 · Direccionamiento IP y subnetting (IPv4 + IPv6)
src/content/docs/04-switching/…              → UD4 · Switching y VLAN
src/content/docs/05-trunking-inter-vlan/…    → UD5 · Trunking e inter-VLAN
src/content/docs/06-enrutamiento-estatico/…  → UD6 · Enrutamiento estático
src/content/docs/07-ospf/…                   → UD7 · OSPF
src/content/docs/08-acl-seguridad/…          → UD8 · ACL y seguridad básica
src/content/docs/09-nat-pat/…                → UD9 · NAT y PAT
src/content/docs/10-servicios-red/…          → UD10 · Servicios: DHCP, DNS y NTP
src/content/docs/11-redes-inalambricas/…     → UD11 · Redes inalámbricas
src/content/docs/12-alta-disponibilidad/…    → UD12 · Alta disponibilidad
src/content/docs/boletines/  → Ejercicios (inicial, avanzado + resueltos, por unidad U01–U12; variante `packettracer` en U02–U03)
src/styles/custom.css        → CSS del tema (azul #2563eb + teal #4ecdc4, Geist Sans, glassmorphism)
src/assets/logo.svg          → Logo
scripts/                     → Scripts de exportación (PDF, EPUB, DOCX) y diagramas (D2)
docs/excalidraw-icons.md     → Diccionario de iconos de red para Excalidraw (los 10 de dwelle, JSON listo para copiar)
docs/network-topology-icons.excalidrawlib → Fuente local de la librería de iconos
docs/excalidraw-setup.md     → Prompt/guía reutilizable para montar Excalidraw MCP en otros proyectos Astro
public/diagrams/             → SVGs + fuentes `.excalidraw` (D2 y Excalidraw)
public/portada.svg           → Portada para web, PDF y EPUB
public/pdf/                  → PDFs generados (ApuntesPAR.pdf)
public/epub/                 → EPUBs generados (ApuntesPAR.epub)
docx/                        → DOCX por unidad (va al repo; NO está en .gitignore)
  <unidad>/<unidad>.docx     → índice + puntos de la unidad
  <unidad>/boletin-UXX-*.docx → cada boletín (y resuelto) por separado
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

### Límites de contenido por unidad (UD2 y puentes)

- **UD2 vive solo en las capas 1 y 2** (medios, cable UTP/fibra, crimpado, cableado estructurado, modelo OSI como mapa teórico y trama Ethernet). No meter en profundidad: WiFi/802.11 (→ UD11), ARP, cabecera IPv4 ni fragmentación/MTU (→ UD3, ampliada en `01-estructura-ipv4.md`).
- Se puede **nombrar** ARP o capa 3 como puente hacia UD3, sin desarrollarlos (el enlace natural es `09-trama-ethernet.md` → UD3).
- **OSI en UD2 es "solo culturilla"**: 7 capas + OSI vs TCP/IP + "aquí estamos en 1–2"; el modelo real y lo de capa 3+ se tocan en unidades posteriores.
- Trama Ethernet en UD2 cubre **medios guiados (802.3) y no guiados (802.11)** a alto nivel (mismas capas 1–2); el detalle WiFi va en UD11.
- **Boletines:** si un ejercicio de UD2 toca WiFi → moverlo al boletín de UD11; si toca ARP/MTU/cabecera → al de UD3 (añadir ahí si no existe; no duplicar en UD2).

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
- Fotos stock: `![alt es-ES](/ApuntesRedes/photos/nombre.jpg)` en `public/photos/`. Ver sección 📸 Fotos stock.
- Diagramas: D2 o Excalidraw → en `.md` referenciar como `![alt es-ES](/ApuntesRedes/diagrams/nombre.svg)`. Ver sección 📊 Diagramas Excalidraw.

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

## 📊 Diagramas Excalidraw (MCP)

Diagramas interactivos/visuales generados con **`mcp-excalidraw-server`** (canvas local `http://127.0.0.1:3000`), exportados a `public/diagrams/*.svg` (+ fuente `*.excalidraw` editable).

### Configuración (recomendada; ya hecha en este entorno)

- MCP en `C:\Users\serga\.config\opencode\opencode.json` → bloque `"excalidraw"` (`npx -y mcp-excalidraw-server`).
- **Skill (recomendada):** instalar/actualizar con  
  `npx -y mcp-excalidraw-server install-skill --dir "C:\Users\serga\.config\opencode\skills"`  
  → `C:\Users\serga\.config\opencode\skills\excalidraw-skill\SKILL.md`. **Leerla antes de dibujar** (workflow, anti-patrones, checklist de calidad).
- Si en otro equipo falta el MCP: añadir el bloque `"excalidraw"` en `opencode.json` + abrir `http://127.0.0.1:3000` en el navegador + instalar la skill como arriba.
- El canvas necesita **pestaña de navegador abierta** para `screenshot`, `export_to_image` (svg/png) y `set_viewport`. Si falla con "No frontend client": `Start-Process "http://127.0.0.1:3000/"`.
- `import_scene` con `filePath` solo acepta rutas **dentro del proyecto** (path traversal); para JSON temporal usar `data` o copiar el fichero al repo a nivel raíz y borrarlo después.
- **Fuentes reeditables:** los `.excalidraw` en `public/diagrams/` (mismo nombre que el SVG); para regenerar un diagrama, `import_scene` con `mode: "replace"` o reconstruir desde el JSON y volver a exportar.

### Workflow obligatorio por diagrama

1. Escribir JSON de elementos → `npx -y mcp-excalidraw-server add fichero.json` (o tool MCP `batch_create_elements`).
2. `describe` + **`screenshot`** → corregir solapes/texto truncado hasta que quede limpio.
3. Exportar: `export_scene` → `public/diagrams/NOMBRE.excalidraw` y `export_to_image` (svg) → `public/diagrams/NOMBRE.svg`.
4. `clear --yes` (o tool `clear_canvas`) antes del siguiente diagrama.
5. Insertar en el `.md` y verificar build.

### Reglas de diseño (evitan texto mezclado con cajas)

| Caso | Cómo | Por qué |
|---|---|---|
| Caja de contenido | `"text"` **dentro del rectángulo** | MCP crea bound-label centrado; sin coordenadas manuales |
| Zona de fondo grande | **Sin** `text`; texto libre en esquina superior-iz | Si no, la etiqueta se centra en medio y tapa el interior |
| Flecha | `startElementId` + `endElementId` + `text` | Auto-ruta a bordes; gap **≥120px** si lleva etiqueta (si no, pisa cajas) |
| Título / nota | Texto libre suelto | Solo títulos, subtítulos, anotaciones |

- `fillStyle: "solid"` en shapes (el default hachure queda “borrador”).
- Paleta: stroke `#2563eb` / `#4ecdc4`, zonas `#eff6ff` / `#f0fdf4`, texto `#0f172a` / `#1e1e1e`, gris `#868e96`, error `#e03131` + fondo `#ffe3e3`.
- Texto ≥16 (títulos ≥20–28); shapes ≥120×60; gaps entre cajas 40–80; rejilla de 20px; ≤3–4 colores de relleno por diagrama.
- Etiquetas de flecha: ≤12 caracteres, solo si aportan; no etiquetar todas.
- Evitar flechas en diagonal que crucen otras zonas (preferir ortogonales o rejilla 2×2 con hueco central libre).
- Guía completa: tool `excalidraw_read_diagram_guide` + skill instalada.

### Iconos de red

- Diccionario del proyecto: **`docs/excalidraw-icons.md`** — **los 10 iconos íntegros** de dwelle *network-topology-icons*: Computer (3 variantes), Server, Switch, Hub, Router, Client, Firewall y VPN. En JSON Excalidraw listo para copiar. Copiar el objeto, desplazar `x`/`y` del grupo, regenerar `id` si se reutiliza.
- Fuente local: **`docs/network-topology-icons.excalidrawlib`** (descarga de https://libraries.excalidraw.com/libraries/dwelle/network-topology-icons.excalidrawlib). Sirve para regenerar el diccionario o reimportar en Excalidraw.com.
- Otras librerías re-descargables: dwelle *network-elements* (5); `network-flat` corrupto (no usar).
- Regenerar el diccionario desde la `.excalidrawlib` si hace falta (script Node que vuelva cada `libraryItems` como sección `###`).

### Inserción en Markdown

```markdown
![Título descriptivo en es-ES](/ApuntesRedes/diagrams/u01-nombre.svg)
```

- Alt en español de España, tono profesor FP.
- Tras la sección conceptual correspondiente del `.md`.
- La fuente `.excalidraw` queda al lado del SVG en `public/diagrams/` para reeditar.

### Diagramas U01 existentes

| Fichero | Sección `.md` | Contenido |
|---|---|---|
| `u01-4-piezas` | `01-que-es-una-red.md` · Las 4 piezas | Topología real: Finales → Medio → Interconexión; **4. Protocolos abajo** (base) + pie con analogía del barrio |
| `u01-escalera-ping` | `06-metodo-diagnostico.md` · Escalera del Ping | 5 peldaños 0–4 de abajo arriba + caja roja de avería |
| `u01-mapa-curso` | `08-mapa-del-curso.md` · 12 etapas | 2 bandas de cuatrimestre, U01→UD12 con flechas |

### Diagramas U02 existentes

| Fichero | Sección `.md` | Contenido |
|---|---|---|
| `u02-tres-medios` | `01-medios-de-transmision.md` · Los tres medios | Cob re, fibra y aire con sus características |
| `u02-anatomia-utp` | `02-cable-utp.md` · Anatomía UTP | Funda, 4 pares trenzados, colores T568B |
| `u02-pinout-t568` | `03-directo-cruzado-consola.md` · Pinout T568B | Orden de los 8 hilos en el RJ45 |
| `u02-crimpado-pasos` | `04-crimpado-y-comprobacion.md` · Crimpado paso a paso | 6 pasos T568B + error típico de funda |
| `u02-fibra-smf-mmf` | `05-fibra-optica.md` · SMF vs MMF | Núcleo, fuente, distancia y coste |
| `u02-atenuacion-crosstalk` | `06-conceptos-fisicos.md` · Atenuación y diafonía | Señal que se debilita + NEXT/FEXT |
| `u02-recorrido-senal` | `07-cableado-estructurado.md` · Recorrido de la señal | PC → latiguillo → keystone → horizontal → patch panel → switch |
| `u02-modelo-osi` | `08-modelo-osi.md` · Modelo OSI | 7 capas apiladas, marca "AQUÍ ESTAMOS" en 1–2, nota TCP/IP |
| `u02-trama-ethernet` | `09-trama-ethernet.md` · Trama Ethernet II | MACs, EtherType, payload, FCS |
| — | `10-cierre.md` | Cierre práctico: sin diagrama (actividades, no conceptos) |

### Diagramas U03 existentes

| Fichero | Sección `.md` | Contenido |
|---|---|---|
| `u03-cabecera-ipv4` | `01-estructura-ipv4.md` · Cabecera | Campos clave de la cabecera IPv4 (ver, IHL, TTL, protocolo, direcciones) |
| `u03-fragmentacion` | `01-estructura-ipv4.md` · Fragmentación y MTU | Paquete 4000 B → 3 fragmentos (1480+1480+1040) con MF/offset |
| `u03-dora` | `08-dhcp.md` · DORA | Secuencia Discover → Offer → Request → ACK (PC ↔ servidor) |

### Fotos stock (criterio por unidad)

Las fotos **solo proceden cuando ilustran un objeto físico real** que el alumno debe reconocer (cable, conector, herramienta, panel, rack, AP…). **No** se usan para conceptos abstractos (subnetting, STP, OSPF, NAT, ACL, VLAN lógica…): ahí manda el diagrama Excalidraw o el esquema en código.

- Fuentes: **Pexels** o **Unsplash** (uso libre; no exigen atribución, pero se cita origen en esta tabla).
- Destino: `public/photos/uXX-nombre.jpg` (jpg, ~1260 px de ancho).
- Inserción: `![alt es-ES](/ApuntesRedes/photos/uXX-nombre.jpg)` junto a la sección conceptual; alt en español de España.
- **De momento solo UD2 tiene fotos** (4, en los puntos 02, 04, 05 y 07). **UD3 no lleva fotos stock** (todo es abstracto: subnetting, DORA, cabeceras…). Al ampliar otra unidad, evaluar caso a caso con la regla de arriba y no saturar: 1–2 fotos por página como máximo. **Los boletines nunca llevan fotos ni diagramas** (ver ⚠️ Notas, punto 6).

| Fichero | `.md` | Muestra | Origen |
|---|---|---|---|
| `u02-cable-utp` | `02-cable-utp.md` | Cable UTP con RJ45 | Pexels |
| `u02-rj45` | `04-crimpado-y-comprobacion.md` | Conector RJ45 | Pexels |
| `u02-fibra-conectores` | `05-fibra-optica.md` | Conectores de fibra | Pexels |
| `u02-patch-panel` | `07-cableado-estructurado.md` | Patch panel etiquetado | Pexels |

### CLI útil

```bash
npx -y mcp-excalidraw-server status
npx -y mcp-excalidraw-server add archivo.json
npx -y mcp-excalidraw-server describe
npx -y mcp-excalidraw-server screenshot --out captura.png
npx -y mcp-excalidraw-server export --out public/diagrams/x.excalidraw
npx -y mcp-excalidraw-server clear --yes
npx -y mcp-excalidraw-server install-skill --dir <skills-root>
```

---

## 🚀 Comandos

```bash
npm run dev       # Servidor local
npm run build     # Build producción
npm run preview   # Previsualizar build
npm run pdf       # Generar PDFs
npm run pdf:local # Generar PDF desde localhost
npm run epub      # Generar EPUB
npm run docx      # Generar DOCX por unidad → docx/
npm run export    # PDF + EPUB + DOCX
npm run diagrams  # Generar diagramas con D2 (Terrastruct)
npx astro build   # Solo Astro (si D2 NO está instalado; npm run build ejecuta diagrams antes)
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
6. **Los boletines siguen el patrón:** `inicial` (fácil) y `avanzado` (difícil), cada uno con su `-resuelto`, en `src/content/docs/boletines/` con nombre `boletin-UXX-inicial(-resuelto).md` / `boletin-UXX-avanzado(-resuelto).md`. **Son texto puro por diseño: NO llevan diagramas ni fotos** (mismo criterio en las 60 hojas U01–U12; pegar el diagrama de la unidad bajo un ejercicio de recall regalaría la respuesta). La UD3 tiene además la variante `boletin-U03-ipv6-*`. UD2 y UD3 tienen además la variante **`boletin-U02-packettracer-*` / `boletin-U03-packettracer-*`**: práctica guiada de nivel único (no es el par inicial/avanzado), 8 micro-prácticas + resuelto 1:1; se enlaza en el sidebar como grupo "· Packet Tracer" y en los índices de cada unidad.
7. **El CSS no debe romperse** — probar con `npm run build` después de cambios.
8. **CI/CD en rama `main`**.
9. **Puppeteer** instalado para PDFs, pero con `PUPPETEER_SKIP_DOWNLOAD=true` en CI. En local, si la versión cacheada de Chrome falla, se usa el Chrome del sistema con `PUPPETEER_EXECUTABLE_PATH="C:\Program Files\Google\Chrome\Application\chrome.exe"`.
10. **D2 (Terrastruct)** para diagramas — script en `scripts/generate-diagrams.mjs`, ejecuta D2 antes del build. Referenciar en `.mdx` como `/ApuntesRedes/diagrams/nombre.svg`. Requiere D2 CLI instalado.
11. **El build ejecuta `npm run build` que genera diagramas automáticamente** (prependido en el script).
12. **PDF** se genera con `starlight-to-pdf` — un único PDF con todas las unidades y portada. Ver `scripts/pdf-*.html`.
13. **EPUB** se genera con Pandoc — `scripts/generate-epub.ps1` + `scripts/epub.css`. El script reescribe las rutas `/ApuntesRedes/diagrams/` → `public/diagrams/` para que Pandoc encuentre los SVGs.
14. **DOCX por unidad** — `scripts/generate-docx.mjs` (`npm run docx`, requiere Pandoc CLI en PATH). Crea `docx/<unidad>/` con un `.docx` de la unidad completa y un `.docx` suelto por cada boletín (incl. `-resuelto` y variantes `U03-ipv6-*` y `U02/U03-packettracer-*`). **Sí va al repo** (no está en `.gitignore`). Tras editar contenido de unidades o boletines, regenerar con `npm run docx` y commitear los DOCX juntos. Mismas reescrituras de rutas que el EPUB (`/ApuntesRedes/…` → `public/…` para diagrams/photos).
14b. **Pandoc 3.11** instalado en local con winget (`winget upgrade JohnMacFarlane.Pandoc`). Tras actualizar, refrescar el PATH de la shell (`$env:Path = [System.Environment]::GetEnvironmentVariable('Path','Machine') + ';' + [System.Environment]::GetEnvironmentVariable('Path','User')`) o abrir una terminal nueva.
15. **Lenguaje es-ES obligatorio** — todo texto nuevo o editado cumple la sección 🗣️ Requisito lingüístico; hacer la comprobación lingüística antes de cerrar.
15. **Excalidraw** — MCP + skill instalados; **recomendado reinstalar/actualizar la skill** si se cambia de entorno (`install-skill --dir …`); seguir workflow y reglas de la sección 📊; verificar con screenshot antes de exportar; NO subir sin comprobar solapes.
16. **D2 puede no estar instalado** — en local usar `npx astro build` para validar Markdown/CSS sin fallar por D2; `npm run build` solo si hay D2 CLI.
17. **Antes de un diagrama Excalidraw nuevo:** leer `excalidraw-skill/SKILL.md` + `excalidraw_read_diagram_guide`; comprobar `npx -y mcp-excalidraw-server status` y pestaña abierta; iconos en `docs/excalidraw-icons.md`.

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
- [ ] `npm run build` exitoso (o `npx astro build` si no hay D2)
- [ ] Boletín creado (inicial + avanzado + resueltos; o variante `packettracer`/`ipv6` si aplica)
- [ ] (Opcional) Diagrama Excalidraw: screenshot limpio → SVG en `public/diagrams/` + `![alt](/ApuntesRedes/diagrams/…)` en el `.md`
