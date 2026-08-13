# Expand U10 — Design

## Estructura de la unidad

La U10 se organiza como un **libro de 9 capítulos** (patrón U01/U02):

| # | Slug | Contenido |
|---|---|---|
| 1 | `01-que-es-nat` | Concepto, motivación (agotamiento IPv4, seguridad, flexibilidad) |
| 2 | `02-tipos-de-nat` | Estático, dinámico, PAT, destino: tabla comparativa |
| 3 | `03-nat-estatico-y-dinamico` | Config 1:1 y con pool |
| 4 | `04-pat` | NAT de sobrecarga, cómo comparte puertos |
| 5 | `05-nat-destino` | Port forwarding, config |
| 6 | `06-tabla-nat-y-verificacion` | Tabla NAT, campos, show/clear/debug, timeouts |
| 7 | `07-problemas-y-soluciones` | ALGs FTP/VoIP, UPnP, NAT-T, extremo a extremo |
| 8 | `08-configuracion-completa` | Caso completo en Packet Tracer |
| 9 | `09-head-first` | ⭐ 🔥 🕵️ 🤬 ⚡ 🏆 🧠 🧩 💬 🤷 🎬 + ✅ CEs |

## Convenciones por punto

- Frontmatter con `title` y `description` (entrecomillar si hay `: `).
- Apertura: `<p><small>` + bloque `> 🗺️ **Estás en:** 🌐 U10 → N · Punto`.
- Secciones `##`, tablas, bloques de código IOS, `<details>` para soluciones.
- Cierre de navegación: `[Volver al índice](/ApuntesRedes/10-nat-internet)` + Anterior/Siguiente.

## Índice

`10-nat-internet.md` con mapa, boletines, CEs RA7 (a-e) y "¿Por dónde empiezo?". Referencias a U05 (IPv6) y U09 (OSPF).

## Boletines

- Inicial: 8 (conservar 1-6 + 2 nuevos: tipos de NAT + tabla NAT).
- Avanzado: 8 (conservar 1-6 + 2 nuevos: multi-NAT + NAT en escenario real).
- Resueltos 1:1.