# Expand U07 — Design

## Estructura de la unidad

La U07 se organiza como un **libro de 9 capítulos**, replicando el patrón de U01/U02:

| # | Slug | Contenido |
|---|---|---|
| 1 | `01-que-es-una-vlan` | Qué es, motivación, ventajas, VLAN por defecto, tipos |
| 2 | `02-tipos-de-vlan` | Datos/nativa/voz/gestión, estática vs dinámica |
| 3 | `03-trunks-y-8021q` | 802.1Q (TPID/PRI/VLAN ID), trama, trunk, native VLAN y sus problemas |
| 4 | `04-inter-vlan-routing` | Necesidad de router, router-on-a-stick, subinterfaces, `encapsulation dot1Q` |
| 5 | `05-switch-capa3` | SVIs, `ip routing`, ventajas frente a router-on-a-stick |
| 6 | `06-vtp-y-dtp` | VTP server/client/transparent, revision number y riesgo, DTP y `nonegotiate` |
| 7 | `07-seguridad-en-vlans` | VACL, PVLAN, VLAN hopping, mitigaciones |
| 8 | `08-configuracion-y-verificacion` | Packet Tracer paso a paso, `show vlan brief`, `show interface trunk`, troubleshooting |
| 9 | `09-head-first` | ⭐ 🔥 🕵️ 🤬 ⚡ 🏆 🧠 🧩 💬 🤷 🎬 + ✅ CEs |

## Convenciones por punto

- Frontmatter con `title` y `description`; si contienen `: ` se entrecomillan (lección de `expand-u01`).
- Apertura: `<p><small>` con la descripción, bloque `> 🗺️ **Estás en:** 🏢 U07 → N · Punto`.
- Secciones `##`, tablas y bloques de código IOS correctos; ejercicios con solución en `<details>`.
- Referencias cruzadas a U06 (switching) y U08 (routing/ACLs).
- Cierre de navegación: `[Volver al índice](/ApuntesRedes/07-vlans)` + Anterior/Siguiente.

## Índice de unidad

`07-vlans.md` mantiene frontmatter (title/description) y gana: mapa del paquete, objetivo, tabla de puntos con enlaces, bloque de boletines (`.ejercicio-links`), tabla de CEs RA5 (a–f) y "¿Por dónde empiezo?" con navegación.

## Sidebar

Se añade la clave `07-vlans` en `unidadesExpandidas` con los 9 slugs (patrón U01/U02).

## Boletines

- Inicial: 8 ejercicios (conservar los 6 actuales + 2 nuevos de identificación/comandos).
- Avanzado: 8 ejercicios (conservar los 6 actuales + 2 nuevos de razonamiento, ej. VLAN hopping/hardening y SVI paso a paso).
- Resueltos 1:1 con soluciones desarrolladas.