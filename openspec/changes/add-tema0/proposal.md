## Why

Los apuntes empiezan hoy directamente en U01 asumiendo conceptos (paquete, IP, MAC, gateway…) que una persona sin conocimientos de redes no maneja. El alumno que llega nuevo se pierde desde la primera página.

## What Changes

- Se crea un **Tema 0 de introducción** para principiantes absolutos.
- El Tema 0 consta de una página índice y 6 puntos: qué es una red, términos básicos, mapa del curso, herramientas de laboratorio, método de diagnóstico y glosario/FAQ.
- El Tema 0 lleva **boletines con el mismo patrón que el resto** (inicial, avanzado y sus resueltos) para no quedar vacío ni romper la dinámica del curso.
- La portada (`docs/index.md`), el sidebar (`astro.config.mjs`) y la ruta del paquete del curso se actualizan para incluir el Tema 0 como punto de partida.
- Los scripts de exportación (EPUB/PDF) incluirán el Tema 0 y sus boletines en el orden correcto.
- Se añade la capacidad `tema-cero` (ya creada como estándar) con requisitos verificables de nivel cero, mapa, herramientas, método y boletines integrados.

## Capabilities

### New Capabilities
- `tema-cero`: Estándar del Tema 0 de introducción (nivel cero, mapa del curso, herramientas, método de diagnóstico, boletines integrados).

### Modified Capabilities
- `contenido-unidad`: el Tema 0 también debe enlazar con la U01 de forma natural (ya recogido en la capacidad base).
- `contenido-boletin`: los boletines del Tema 0 siguen el mismo estándar de pares resuelto/por-resolver y graduación.

## Impact

- `src/content/docs/00-introduccion.md` (nueva, índice)
- `src/content/docs/00-introduccion/*.md` (6 puntos nuevos)
- `astro.config.mjs` (sidebar + lista de unidades/emojis)
- `src/content/docs/index.md` (tarjeta del Tema 0)
- `scripts/generate-epub.ps1` (recorrido del Tema 0)
- `public/portada` no cambia (solo contenido de texto) — alt: sin cambios