---
id: expand-u03
title: Expandir U03 — Infraestructura física
feature: contenido-unidad
---

## Contexto

Tras las ampliaciones de U01, U02, U07 y U08, la U03 (`03-infraestructura-fisica.md`) sigue el patrón antiguo: un único archivo que comprime teoría y secciones Head First. Incumple los estándares `contenido-unidad` y `contenido-boletin` (≥8 ejercicios).

## Propuesta

- Transformar `03-infraestructura-fisica.md` en **índice de unidad** con ruta del paquete, objetivo, mapa de puntos, boletines y tabla de CEs (RA2: a–f).
- Crear `03-infraestructura-fisica/` con **8 puntos de teoría ampliados** + **1 cierre Head First**, reutilizando el contenido factual (medios, UTP, T568A/B, directo/cruzado/consola, fibra, WiFi, conceptos físicos, cableado estructurado) y expandiéndolo con contexto, analogías, tablas y referencias cruzadas.
- Cierre Head First con laboratorio de crimpado con fallos intencionados y "PRÓXIMAMENTE EN U04".
- Sin diagramas D2 nuevos (ningún diagrama existente aplicable).
- Sidebar: U03 pasa a grupo desplegable con Índice + 9 puntos.
- Boletines: ampliar a 8 ejercicios cada uno (conservando los 6 actuales), con soluciones 1:1.

## Ficheros

- `src/content/docs/03-infraestructura-fisica.md` (índice)
- `src/content/docs/03-infraestructura-fisica/*.md` (9 puntos)
- `src/content/docs/boletines/boletin-U03-*.md` y `-resuelto.md`
- `astro.config.mjs` (sidebar U03)

## Impacto

- Cero cambios en scripts de exportación. CEs RA2 conservados y declarados en el índice.