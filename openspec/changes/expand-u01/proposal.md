## Why

La U01 (`01-fundamentos-redes.md`) es hoy un único archivo de 742 líneas que comprime la teoría en tablas y listas y coloca las secciones de consolidación al final del mismo archivo. Incumple el estándar `contenido-unidad` que pide puntos de teoría desarrollados en profundidad (≈120–200 líneas con contexto, comparativas, ejemplos resueltos y análisis), ejercicios siempre con solución y un flujo de lectura encadenado y navegable. El mismo patrón que ya aplicó el Tema 0 (índice + subcarpeta de puntos) debe replicarse en la primera unidad del curso.

## What Changes

- Se transforma `01-fundamentos-redes.md` en un **índice de la unidad**: intro, ruta del paquete, mapa de los puntos, enlace a los 4 boletines y **tabla de CEs** (RA1) con estado de cobertura.
- Se crea la subcarpeta `01-fundamentos-redes/` con **9 puntos ampliados** en formato "libro", siguiendo la estructura y navegación del Tema 0 (descripción, ruta, secciones `##`, resumen, vocabulario, enlaces anterior/siguiente).
- Se amplía el contenido teórico de las 8 secciones previas (qué es una red, tipos y alcance, topologías, dispositivos, modelo OSI, protocolos, MAC/IP, conectividad) hasta alcanzar profundidad de capítulo con tablas comparativas, ejemplos resueltos, diagramas y referencias cruzadas.
- El punto 9 (**Cierre**) conserva el cierre pedagógico de la unidad: ⭐ Sé el Paquete, 🔥 Fireside Chat, 🕵️ ¿Quién Soy?, 🤬 CONRAD VS EL MUNDO, ⚡ Laboratorio de tortura (con fallo intencionado), 🧠 Atrévete a pensar, 🧩 Crucigrama, 💬 Entrevista, 🤷 Preguntas tontas y 🎬 Poscréditos con "PRÓXIMAMENTE EN U02".
- El **sidebar** (`astro.config.mjs`) despliega al grupo Unidad 1 con sus 9 puntos subyacentes, igual que el Tema 0.
- Los scripts de exportación (EPUB/PDF) ya recorren subcarpetas, por lo que no necesitan cambios: el EPUB tratará el índice + `01-fundamentos-redes/*.md` automáticamente.

## Capabilities

### New Capabilities
- (ninguna nueva — se reutiliza la capacidad existente `contenido-unidad`.)

### Modified Capabilities
- `contenido-unidad`: se aplica por primera vez a una unidad completa (U01) con el estándar de profundidad, ejemplos y cierres de unidad. Se aprovecha para corregir la coherencia del Poscréditos (la U siguiente es la U02 y no la U03, como decía el archivo original).

## Impact

- `src/content/docs/01-fundamentos-redes.md` (reformado como índice de unidad)
- `src/content/docs/01-fundamentos-redes/*.md` (9 puntos nuevos)
- `astro.config.mjs` (grupo desplegable de la Unidad 1)
- `openspec/specs/contenido-unidad/spec.md` (sin cambios, se cumple)
- `src/content/docs/index.md` / `scripts/*` (sin cambios: ya enlazan al índice o recorren subcarpetas)