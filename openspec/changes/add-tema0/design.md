## Context

El curso arranca en U01 asumiendo conceptos básicos. No existe ninguna página de introducción ni plano previo. OpenSpec ya está inicializado y hay tres capacidades estándar (`contenido-unidad`, `contenido-boletin`, `tema-cero`). La web es Astro + Starlight con `docsLoader`, que ya carga subcarpetas de `src/content/docs/`.

## Goals / Non-Goals

**Goals:**
- Un Tema 0 navegable de 7 páginas (índice + 6 puntos) escrito para principiantes absolutos.
- El Tema 0 se apoya en el sidebar, la portada y la ruta del paquete como punto de partida del curso.
- Las páginas son autoconsistentes: no requieren conocimientos previos ni dependencias externas.
- El Tema 0 lleva boletines con el patrón del curso (inicial/avanzado + resueltos).

**Non-Goals:**
- No ampliar U01 en este change (lo hará `expand-u01`).
- No rediseñar el tema CSS ni el layout de Starlight.

## Decisions

### D1: Estructura de archivos del Tema 0
Página índice `src/content/docs/00-introduccion.md` + 6 puntos en `src/content/docs/00-introduccion/`.
- **Razón:** `docsLoader` ya resuelve slugs `00-introduccion` y `00-introduccion/01-...`. El slug corto es estable para la portada y el PDF.
- **Alternativa descartada:** un único archivo gigante (dificulta encontrar sección exacta y el encadenado "libro").

### D2: Contenido por página
1. `01-que-es-una-red.md` — qué es, por qué existen, componentes en lenguaje cero.
2. `02-terminos-basicos.md` — vocabulario inicial: bit, byte, paquete, IP, MAC, router, switch, servidor, cliente, WiFi/cable, con paneles de vocabulario y analogías.
3. `03-mapa-del-curso.md` — las 13 etapas (Tema 0 + U01…U12) con una frase por unidad.
4. `04-herramientas.md` — Packet Tracer y Wireshark: qué son, cómo tenerlos listo y mini tarea de 5 minutos.
5. `05-metodo-diagnostico.md` — qué hace un administrador de redes y el método en capas (físico→lógico).
6. `06-glosario-y-faq.md` — glosario completo del Tema + FAQ de cero-nivel.
- **Razón:** al tamaño "libro" requerido no se llega en una sola página; los principios se desarrollan página por página.

### D3: Boletines del Tema 0
Se crean `boletin-U00-inicial`, `boletin-U00-inicial-resuelto`, `boletin-U00-avanzado` y `boletin-U00-avanzado-resuelto` en `src/content/docs/boletines/`, enlazados en la portada y el sidebar igual que el resto.
- **Razón:** el patrón del curso exige pares resuelto/por-resolver y graduación; el Tema 0 no debe parecer un añadido sin ejercicios.

### D4: Integración con la estructura de unidades
El Tema 0 se anexa al inicio del `sidebar` y de la `unitSlugs` de `astro.config.mjs`, con su propio emoji (🚪).
- **Razón:** Starlight ordena el sidebar por orden de entradas; con el slug `00-...` el PDF recoge el orden natural.

### D5: Exportaciones
- `scripts/generate-epub.ps1`: recorrer las subcarpetas de unidades por orden (incluida `00-introduccion/`) y añadir sus boletines (incluido U00).
- El PDF (starlight-to-pdf) sigue el sidebar: con el Tema 0 en el sidebar queda incluido automáticamente.
- **Razón:** mantiene "libro" web + PDF + EPUB consistentes.

## Risks / Trade-offs

- [El Tema 0 puede quedar "sin chicha" si solo ofrece teoría] → Mitigación: mini-ejercicio de 5 minutos en la página de herramientas, FAQ práctica y boletines propios del tema.
- [PDF muy largo] → Es deseado: "libro de verdad".
- [Slug `00-introduccion` debe reservarse] → no colisiona con archivos U01/U02.