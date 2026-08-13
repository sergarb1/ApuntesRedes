---
id: expand-u02
title: Expandir U02 — Modelos OSI y análisis de tráfico
feature: contenido-unidad
---

## Contexto

Tras la ampliación de U01 (`expand-u01`), la U02 (`02-modelos-osi-analisis.md`) es la segunda unidad del curso y sigue el patrón antiguo: un único archivo de ~590 líneas que comprime la teoría en un bloque y coloca las secciones Head First al final del mismo archivo. Incumple el estándar `contenido-unidad` (puntos de teoría en profundidad ≈120–200 líneas, cierre Head First obligatorio, tablas de CEs en el índice, flujo encadenado) y el estándar `contenido-boletin` (boletines con ≥8 ejercicios y pistas).

El mismo patrón que se replicó en U01 debe aplicarse a U02: índice + subcarpeta de puntos en formato libro + cierre Head First separado + boletines ampliados.

## Propuesta

- Se transforma `02-modelos-osi-analisis.md` en un **índice de la unidad**: ruta del paquete, objetivo, mapa de los 9 puntos, enlace a los 4 boletines y **tabla de CEs** (RA1: d, e, f, g) con estado de cobertura.
- Se crea la subcarpeta `02-modelos-osi-analisis/` con **8 puntos de teoría ampliados** en formato "libro" + **1 cierre Head First** (`09-head-first.md`), reutilizando el contenido factual actual (OSI, TCP/IP, encapsulación, TCP/UDP, IP/Ethernet, puertos, Wireshark) y expandiéndolo con contexto, analogías, tablas, ejemplos resueltos y referencias cruzadas.
- Se añade el cierre Head First con todas las secciones de consolidación, laboratorio con fallo intencionado y Post-Créditos coherente con U03.
- Los 3 diagramas D2 ya existentes aplicables (`modelo-osi-capas`, `dispositivos-osi`, `flujo-encapsulacion`) se reutilizan por referencia.
- Sidebar: la unidad pasa a grupo desplegable con Índice + 9 puntos (patrón `u01Puntos`).
- Boletines: inicial y avanzado se amplían a **8 ejercicios** con pistas en los por-resolver y soluciones desarrolladas 1:1 en los resueltos.

## Ficheros

- `src/content/docs/02-modelos-osi-analisis.md` (reformado como índice de unidad)
- `src/content/docs/02-modelos-osi-analisis/*.md` (9 puntos nuevos)
- `src/content/docs/boletines/boletin-U02-*.md` y `-resuelto.md` (4 boletines ampliados)
- `astro.config.mjs` (grupo sidebar U02)

## Impacto

- Cero cambios en scripts de exportación (PDF/EPUB ya recorren subcarpetas y sidebar).
- CEs RA1 (d, e, f, g) conservados y declarados en el índice.
- Sin diagramas nuevos (decisión de proyecto: reutilizar los 9 existentes).