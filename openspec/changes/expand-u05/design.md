# Expand U05 — Design

## Estructura de la unidad

La U05 se organiza como un **libro de 9 capítulos**, replicando el patrón de U01/U02:

| # | Slug | Contenido |
|---|---|---|
| 1 | `01-estructura-ipv6` | Por qué IPv6, 128 bits, 8 grupos hex, notación |
| 2 | `02-compresion-y-prefijos` | Reglas de compresión (ceros, ::), prefijos /32 /48 /64 |
| 3 | `03-tipos-de-direcciones` | Unicast (GUA, LLA, ULA), multicast, anycast, loopback |
| 4 | `04-eui64-y-slaac` | EUI-64 paso a paso, privacy extensions, SLAAC |
| 5 | `05-dhcpv6` | Stateless vs stateful, flags M/O en Router Advertisement |
| 6 | `06-icmpv6-y-ndp` | NS/NA, RS/RA, tabla IPv4↔IPv6 |
| 7 | `07-mecanismos-de-transicion` | Dual Stack, túneles, NAT64/DNS64 |
| 8 | `08-configuracion-ipv6` | Estática en PC y router, `ipv6 unicast-routing`, Packet Tracer |
| 9 | `09-cierre` | ⭐ 🔥 🕵️ 🤬 ⚡ 🏆 🧠 🧩 💬 🤷 🎬 + ✅ CEs |

## Convenciones por punto

- Frontmatter con `title` y `description`; si contienen `: ` se entrecomillan.
- Apertura: `<p><small>` con descripción, bloque `> 🗺️ **Estás en:** 🚀 U05 → N · Punto`.
- Secciones `##`, tablas, bloques de código IOS; ejercicios con solución en `<details>`.
- Referencias cruzadas a U04 (IPv4) y U10 (NAT).
- Cierre de navegación: `[Volver al índice](/ApuntesRedes/05-ipv6-transicion)` + Anterior/Siguiente.

## Índice de unidad

`05-ipv6-transicion.md` mantiene frontmatter y gana: mapa del paquete, objetivo, tabla de puntos, boletines (`.ejercicio-links`), tabla de CEs RA2/RA7 (a–d) y "¿Por dónde empiezo?".

## Sidebar

Clave `05-ipv6-transicion` en `unidadesExpandidas` (patrón U01/U02).

## Boletines

- Inicial: 8 (conservar los 6 actuales + 2 nuevos: compresión simple, clasificación de tipos).
- Avanzado: 8 (conservar los 6 actuales + 2 nuevos: diseño de transición, análisis de RA).
- Resueltos 1:1 con compresiones y cálculos mostrados.