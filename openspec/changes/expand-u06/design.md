# Expand U06 — Design

## Estructura de la unidad

La U06 se organiza como un **libro de 9 capítulos** (patrón U01/U02):

| # | Slug | Contenido |
|---|---|---|
| 1 | `01-que-es-un-switch` | Rol en capa 2, hub vs switch vs router, segmentación |
| 2 | `02-aprendizaje-mac` | Tabla MAC/CAM, aprendizaje, forwarding, inundación |
| 3 | `03-dominios-colision-broadcast` | Dominios de colisión y broadcast por dispositivo |
| 4 | `04-tormenta-de-broadcast` | Bucles, broadcast storms, por qué colapsan la red |
| 5 | `05-stp-fundamentos` | 802.1D, BPDU, Bridge ID, elección de Root Bridge |
| 6 | `06-puertos-y-estados-stp` | RP/DP/AP/BP, estados y tiempos de convergencia |
| 7 | `07-rstp-y-portfast` | 802.1w, convergencia rápida, PortFast, BPDUGuard |
| 8 | `08-port-security` | maximum, sticky, violaciones, errdisable |
| 9 | `09-cierre` | ⭐ 🔥 🕵️ 🤬 ⚡ 🏆 🧠 🧩 💬 🤷 🎬 + ✅ CEs |

## Convenciones por punto

- Frontmatter con `title` y `description` (entrecomillar si hay `: `).
- Apertura: `<p><small>` + bloque `> 🗺️ **Estás en:** 🔀 U06 → N · Punto`.
- Secciones `##`, tablas, bloques de código IOS, `<details>` para soluciones.
- Cierre de navegación: `[Volver al índice](/ApuntesRedes/06-switching-stp)` + Anterior/Siguiente.

## Índice

`06-switching-stp.md` con mapa, boletines, CEs RA3 (a, e, i, j, k) y "¿Por dónde empiezo?". Referencias a U02 (capa 2) y U07 (VLANs).

## Boletines

- Inicial: 8 (conservar 1-6 + 2 nuevos: reenvío MAC + estados STP).
- Avanzado: 8 (conservar 1-6 + 2 nuevos: diseño STP/RSTP + lab port security).
- Resueltos 1:1.