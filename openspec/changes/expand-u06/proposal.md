---
id: expand-u06
title: Expandir U06 — Switching y STP
feature: contenido-unidad
---

## Contexto

Tras las ampliaciones de U01-U05, U07 y U08, la U06 (`06-switching-stp.md`) sigue el patrón antiguo: un único archivo que comprime teoría y secciones Head First. Incumple los estándares `contenido-unidad` y `contenido-boletin` (6 ejercicios).

## Propuesta

- Transformar `06-switching-stp.md` en **índice de unidad** con ruta, objetivo, mapa de puntos, boletines y tabla de CEs (RA3: a, e, i, j, k).
- Crear `06-switching-stp/` con **8 puntos de teoría ampliados** + **1 cierre Head First**, reutilizando el contenido factual (switch interno, tabla MAC/CAM, dominios de colisión y broadcast, tormentas de broadcast, STP 802.1D, BPDU, Root Bridge, puertos y estados, RSTP, PortFast, Port Security).
- Continuidad encadenada: PRÓXIMAMENTE EN U07.
- Sin diagramas D2 nuevos.
- Sidebar: clave `06-switching-stp` en `unidadesExpandidas` (ya añadida).
- Boletines: ampliar a 8 ejercicios conservando 1-6, con pistas y soluciones 1:1.

## Ficheros

- `src/content/docs/06-switching-stp.md` (índice)
- `src/content/docs/06-switching-stp/*.md` (9 puntos)
- `src/content/docs/boletines/boletin-U06-*.md` y `-resuelto.md`

## Impacto

- Cero cambios en scripts. CEs RA3 conservados y declarados en el índice.