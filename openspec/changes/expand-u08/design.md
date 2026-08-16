# Expand U08 — Design

## Estructura de la unidad

La U08 se organiza como un **libro de 9 capítulos**, replicando el patrón de U01/U02:

| # | Slug | Contenido |
|---|---|---|
| 1 | `01-componentes-del-router` | CPU, RAM, NVRAM, Flash, ROM; secuencia de arranque; `show version` |
| 2 | `02-configuracion-basica` | Modos CLI, hostname, enable secret, líneas, interfaces, banners |
| 3 | `03-rutas-estaticas` | Sintaxis `ip route`, next-hop vs interfaz, ejemplos R1-R2 |
| 4 | `04-ruta-por-defecto` | 0.0.0.0/0, ruta flotante, distancia administrativa |
| 5 | `05-como-decide-el-router` | Tabla de rutas, longest match, AD, tipos de rutas, resolución de next-hop |
| 6 | `06-acls-conceptos` | Qué son, deny any implícito, tipos, in/out, colocación |
| 7 | `07-acl-estandar` | Sintaxis, wildcard, aplicación, verificación `show access-lists` |
| 8 | `08-acl-extendida-y-nombrada` | Extendida (puertos/protocolos), named, `time-range`, `established`, troubleshooting |
| 9 | `09-cierre` | ⭐ 🔥 🕵️ 🤬 ⚡ 🏆 🧠 🧩 💬 🤷 🎬 + ✅ CEs |

## Convenciones por punto

- Frontmatter con `title` y `description`; si contienen `: ` se entrecomillan (lección de `expand-u01`).
- Apertura: `<p><small>` con la descripción, bloque `> 🗺️ **Estás en:** 🧭 U08 → N · Punto`.
- Secciones `##`, tablas y bloques de código IOS correctos; ejercicios con solución en `<details>`.
- Referencias cruzadas a U07 (VLANs) y U09 (routing dinámico).
- Cierre de navegación: `[Volver al índice](/ApuntesRedes/08-routing-acls)` + Anterior/Siguiente.

## Índice de unidad

`08-routing-acls.md` mantiene frontmatter (title/description) y gana: mapa del paquete, objetivo, tabla de puntos con enlaces, bloque de boletines (`.ejercicio-links`), tabla de CEs RA4 (a, b, c, d, f, i, j) y "¿Por dónde empiezo?" con navegación.

## Sidebar

Se añade la clave `08-routing-acls` en `unidadesExpandidas` con los 9 slugs (patrón U01/U02).

## Boletines

- Inicial: 8 ejercicios (conservar los 6 actuales + 2 nuevos de identificación/comandos).
- Avanzado: 8 ejercicios (conservar los 6 actuales + 2 nuevos de razonamiento, ej. longest prefix match y ACL nombrada paso a paso o AD).
- Resueltos 1:1 con soluciones desarrolladas.