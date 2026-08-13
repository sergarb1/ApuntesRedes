---
id: expand-u08
title: Expandir U08 — Routing y ACLs
feature: contenido-unidad
---

## Contexto

Tras las ampliaciones de U01 (`expand-u01`) y U02 (`expand-u02`), la U08 (`08-routing-acls.md`) sigue el patrón antiguo: un único archivo que comprime teoría y secciones Head First en un solo documento. Incumple el estándar `contenido-unidad` (puntos de teoría en profundidad ≈120–200 líneas, cierre Head First obligatorio, índice con tablas de CEs y flujo encadenado) y el estándar `contenido-boletin` (boletines con ≥8 ejercicios y pistas).

El mismo patrón de U01/U02 debe aplicarse a U08: índice + subcarpeta de puntos en formato libro + cierre Head First separado + boletines ampliados.

## Propuesta

- Se transforma `08-routing-acls.md` en un **índice de la unidad**: ruta del paquete, objetivo, mapa de los 9 puntos, enlace a los 4 boletines y **tabla de CEs** (RA4: a, b, c, d, f, i, j) con estado de cobertura.
- Se crea la subcarpeta `08-routing-acls/` con **8 puntos de teoría ampliados** en formato libro + **1 cierre Head First** (`09-head-first.md`), reutilizando el contenido factual actual (componentes y arranque del router, configuración básica, rutas estáticas, ruta por defecto, ACLs estándar/extendida/nombrada, dónde aplicar, verificación) y expandiéndolo con contexto, analogías, tablas, ejemplos resueltos y referencias cruzadas.
- Cierre Head First con todas las secciones de consolidación, laboratorio con fallo intencionado y Post-Créditos con "PRÓXIMAMENTE EN U09".
- Sin diagramas D2 nuevos (decisión de proyecto: reutilizar los 9 existentes, ninguno aplicable a routing/ACLs).
- Sidebar: U08 pasa a grupo desplegable con Índice + 9 puntos.
- Boletines: inicial y avanzado se amplían a **8 ejercicios** (conservando los 6 actuales), con pistas y soluciones desarrolladas 1:1.

## Ficheros

- `src/content/docs/08-routing-acls.md` (reformado como índice de unidad)
- `src/content/docs/08-routing-acls/*.md` (9 puntos nuevos)
- `src/content/docs/boletines/boletin-U08-*.md` y `-resuelto.md` (4 boletines ampliados)
- `astro.config.mjs` (grupo sidebar U08)

## Impacto

- Cero cambios en scripts de exportación (PDF/EPUB ya recorren subcarpetas y sidebar).
- CEs RA4 (a, b, c, d, f, i, j) conservados y declarados en el índice.