# Expand U09 — Design

## Estructura de la unidad

La U09 se organiza como un **libro de 9 capítulos** (patrón U01/U02):

| # | Slug | Contenido |
|---|---|---|
| 1 | `01-de-estatico-a-dinamico` | Por qué routing dinámico, ventajas vs estático (U08) |
| 2 | `02-igp-vs-egp` | IGP vs EGP, comparativa RIP vs OSPF vs EIGRP |
| 3 | `03-conceptos-ospf` | LSA, LSDB, SPF/Dijkstra, Router ID, Hello |
| 4 | `04-areas-y-tipos-de-routers` | Área 0, internal, ABR, backbone, ASBR |
| 5 | `05-dr-y-bdr` | Elección DR/BDR en redes multiacceso |
| 6 | `06-coste-ospf` | Cálculo 10⁸/bandwidth, cambio de coste |
| 7 | `07-configuracion-ospf` | Config básica y multiárea, verificación |
| 8 | `08-ruta-por-defecto-y-diagnostico` | default-information originate, show/debug |
| 9 | `09-cierre` | ⭐ 🔥 🕵️ 🤬 ⚡ 🏆 🧠 🧩 💬 🤷 🎬 + ✅ CEs |

## Convenciones por punto

- Frontmatter con `title` y `description` (entrecomillar si hay `: `).
- Apertura: `<p><small>` + bloque `> 🗺️ **Estás en:** 🗣️ U09 → N · Punto`.
- Secciones `##`, tablas, bloques de código IOS, `<details>` para soluciones.
- Cierre de navegación: `[Volver al índice](/ApuntesRedes/09-routing-dinamico)` + Anterior/Siguiente.

## Índice

`09-routing-dinamico.md` con mapa, boletines, CEs RA6 (g, h, i) y "¿Por dónde empiezo?". Referencias a U08 (estáticas) y U10 (NAT).

## Boletines

- Inicial: 8 (conservar 1-6 + 2 nuevos: IGP/EGP + costes).
- Avanzado: 8 (conservar 1-6 + 2 nuevos: DR/BDR election + troubleshooting).
- Resueltos 1:1.