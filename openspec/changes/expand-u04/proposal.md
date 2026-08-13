---
id: expand-u04
title: Expandir U04 — IPv4 y subnetting
feature: contenido-unidad
---

## Contexto

Tras las ampliaciones de U01, U02, U07 y U08, la U04 (`04-ipv4-subnetting.md`) sigue el patrón antiguo: un único archivo que comprime teoría y secciones Head First en un solo documento. Incumple el estándar `contenido-unidad` (puntos de teoría en profundidad ≈120–200 líneas, cierre Head First obligatorio, índice con tablas de CEs y flujo encadenado) y el estándar `contenido-boletin` (boletines con ≥8 ejercicios y pistas).

## Propuesta

- Se transforma `04-ipv4-subnetting.md` en un **índice de la unidad**: ruta del paquete, objetivo, mapa de los 9 puntos, enlace a los 4 boletines y **tabla de CEs** (RA2: d, g).
- Se crea la subcarpeta `04-ipv4-subnetting/` con **8 puntos de teoría ampliados** en formato libro + **1 cierre Head First**, reutilizando el contenido factual actual (estructura de IPv4, binario y AND, clases, públicas/privadas, máscaras/CIDR, subnetting, VLSM, DHCP) y expandiéndolo con ejemplos resueltos paso a paso.
- Cierre Head First con laboratorio (VLSM + fallo intencionado) y "PRÓXIMAMENTE EN U05".
- Sin diagramas D2 nuevos (ninguno aplicable a direccionamiento).
- Sidebar: U04 pasa a grupo desplegable con Índice + 9 puntos.
- Boletines: ampliar a 8 ejercicios (conservando los 6 actuales), con pistas y soluciones 1:1.

## Ficheros

- `src/content/docs/04-ipv4-subnetting.md` (índice)
- `src/content/docs/04-ipv4-subnetting/*.md` (9 puntos)
- `src/content/docs/boletines/boletin-U04-*.md` y `-resuelto.md`
- `astro.config.mjs` (grupo sidebar U04)

## Impacto

- Cero cambios en scripts de exportación. CEs RA2 (d, g) conservados y declarados en el índice.