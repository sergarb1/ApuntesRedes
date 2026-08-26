---
id: expand-u07
title: Expandir U07 — VLANs
feature: contenido-unidad
---

## Contexto

Tras las ampliaciones de U01 (`expand-u01`) y U02 (`expand-u02`), la U07 (`07-vlans.md`) sigue el patrón antiguo: un único archivo que comprime teoría y secciones de consolidación en un solo documento. Incumple el estándar `contenido-unidad` (puntos de teoría en profundidad ≈120–200 líneas, cierre de unidad obligatorio, índice con tabs de CEs y flujo encadenado) y el estándar `contenido-boletin` (boletines con ≥8 ejercicios y pistas).

El mismo patrón de U01/U02 debe aplicarse a U07: índice + subcarpeta de puntos en formato libro + cierre de unidad separado + boletines ampliados.

## Propuesta

- Se transforma `07-vlans.md` en un **índice de la unidad**: ruta del paquete, objetivo, mapa de los 9 puntos, enlace a los 4 boletines y **tabla de CEs** (RA5: a–f) con estado de cobertura.
- Se crea la subcarpeta `07-vlans/` con **8 puntos de teoría ampliados** en formato libro + **1 cierre de unidad** (`09-cierre.md`), reutilizando el contenido factual actual (qué es una VLAN, tipos, 802.1Q, trunks, inter-VLAN routing, VTP, DTP, seguridad, configuración en Packet Tracer) y expandiéndolo con contexto, analogías, tablas y referencias cruzadas.
- Cierre de unidad con todas las secciones de consolidación, laboratorio con fallo intencionado (native VLAN) y Poscréditos con "PRÓXIMAMENTE EN U08".
- Sin diagramas D2 nuevos (decisión de proyecto: reutilizar los 9 existentes, ninguno aplicable a VLANs).
- Sidebar: U07 pasa a grupo desplegable con Índice + 9 puntos.
- Boletines: inicial y avanzado se amplían a **8 ejercicios** (conservando los 6 actuales), con pistas y soluciones desarrolladas 1:1.

## Ficheros

- `src/content/docs/07-vlans.md` (reformado como índice de unidad)
- `src/content/docs/07-vlans/*.md` (9 puntos nuevos)
- `src/content/docs/boletines/boletin-U07-*.md` y `-resuelto.md` (4 boletines ampliados)
- `astro.config.mjs` (grupo sidebar U07)

## Impacto

- Cero cambios en scripts de exportación (PDF/EPUB ya recorren subcarpetas y sidebar).
- CEs RA5 (a–f) conservados y declarados en el índice.