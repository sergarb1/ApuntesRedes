---
id: expand-u05
title: Expandir U05 — IPv6 y transición
feature: contenido-unidad
---

## Contexto

Tras las ampliaciones de U01, U02, U07 y U08, la U05 (`05-ipv6-transicion.md`) sigue el patrón antiguo: un único archivo que comprime teoría y secciones de consolidación. Incumple los estándares `contenido-unidad` y `contenido-boletin`.

## Propuesta

- Se transforma `05-ipv6-transicion.md` en un **índice de la unidad**: ruta del paquete, objetivo, mapa de los 9 puntos, enlace a los 4 boletines y **tabla de CEs** (RA2/RA7: a–d).
- Se crea la subcarpeta `05-ipv6-transicion/` con **8 puntos de teoría ampliados** + **1 cierre de unidad**, reutilizando el contenido factual actual (estructura, compresión, tipos, EUI-64, SLAAC/DHCPv6, ICMPv6/NDP, transición, configuración) y expandiéndolo con ejemplos resueltos.
- Cierre de unidad con laboratorio Packet Tracer con fallo intencionado y "PRÓXIMAMENTE EN U06".
- Sin diagramas D2 nuevos.
- Sidebar: U05 pasa a grupo desplegable con Índice + 9 puntos.
- Boletines: ampliar a 8 ejercicios (conservando los 6 actuales), con pistas y soluciones 1:1.

## Ficheros

- `src/content/docs/05-ipv6-transicion.md` (índice)
- `src/content/docs/05-ipv6-transicion/*.md` (9 puntos)
- `src/content/docs/boletines/boletin-U05-*.md` y `-resuelto.md`
- `astro.config.mjs` (grupo sidebar U05)

## Impacto

- Cero cambios en scripts de exportación. CEs RA2/RA7 (a–d) conservados y declarados en el índice.