# Expand U04 — Design

## Estructura de la unidad

La U04 se organiza como un **libro de 9 capítulos**, replicando el patrón de U01/U02:

| # | Slug | Contenido |
|---|---|---|
| 1 | `01-estructura-ipv4` | 32 bits, 4 octetos, notación punteada, IPs especiales |
| 2 | `02-binario-y-and` | Conversión decimal↔binario, pesos, AND, dirección de red |
| 3 | `03-clases-de-direcciones` | Clases A-E, máscaras por defecto, CIDR |
| 4 | `04-ip-privadas-y-publicas` | RFC 1918, rangos, por qué existen (NAT, agotamiento) |
| 5 | `05-mascaras-y-cidr` | Máscara, notación /n, tabla rápida de máscaras y hosts |
| 6 | `06-subnetting-paso-a-paso` | Prestar bits, fórmulas 2ⁿ y 2ʰ-2, ejemplo /24→4 subredes |
| 7 | `07-vlsm` | Máscaras variables, ejemplo 4 departamentos con cálculo por paso |
| 8 | `08-dhcp` | DORA, configuración router Cisco, Packet Tracer, exclusions |
| 9 | `09-cierre` | ⭐ 🔥 🕵️ 🤬 ⚡ 🏆 🧠 🧩 💬 🤷 🎬 + ✅ CEs |

## Convenciones por punto

- Frontmatter con `title` y `description`; si contienen `: ` se entrecomillan (lección de `expand-u01`).
- Apertura: `<p><small>` con descripción, bloque `> 🗺️ **Estás en:** 🧮 U04 → N · Punto`.
- Secciones `##`, tablas de binario/subredes, bloques de código IOS; ejercicios con solución en `<details>`.
- Referencias cruzadas a U03 (física), U05 (IPv6) y U10 (NAT).
- Cierre de navegación: `[Volver al índice](/ApuntesRedes/04-ipv4-subnetting)` + Anterior/Siguiente.

## Índice de unidad

`04-ipv4-subnetting.md` mantiene frontmatter y gana: mapa del paquete, objetivo, tabla de puntos, boletines (`.ejercicio-links`), tabla de CEs RA2 (d, g) y "¿Por dónde empiezo?".

## Sidebar

Clave `04-ipv4-subnetting` en `unidadesExpandidas` (patrón U01/U02).

## Boletines

- Inicial: 8 (conservar los 6 actuales + 2 nuevos: subredes iguales simples, cálculo de dirección de red).
- Avanzado: 8 (conservar los 6 actuales + 2 nuevos: VLSM con requisitos, crecimiento de red).
- Resueltos 1:1 con cálculos mostrados.