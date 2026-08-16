# Expand U02 — Design

## Estructura de la unidad

La U02 se organiza como un **libro de 9 capítulos**, replicando el patrón de U01:

| # | Slug | Contenido | Diagrama reutilizado |
|---|---|---|---|
| 1 | `01-modelo-osi` | Qué es OSI, por qué capas, PDU, tabla de las 7 capas, regla de diagnóstico | `modelo-osi-capas` |
| 2 | `02-las-7-capas` | Las 7 capas una a una, dispositivos por capa, ejemplo de tramo | `dispositivos-osi` |
| 3 | `03-modelo-tcp-ip` | Origen ARPANET, 4 capas, mapeo OSI↔TCP/IP, por qué en la práctica | — |
| 4 | `04-encapsulacion` | Encapsulación/desencapsulación, PDU por capa, tamaños reales, overhead | `flujo-encapsulacion` |
| 5 | `05-tcp-y-udp` | TCP (3WHS, flags, ventana), UDP, tabla comparativa, casos de uso | — |
| 6 | `06-ip-ethernet` | Cabecera IPv4, TTL, protocolo, MTU/fragmentación, trama Ethernet, ARP | — |
| 7 | `07-puertos-y-sockets` | Puertos, socket, rangos, ejemplo de navegación | — |
| 8 | `08-wireshark` | Interfaz, filtros, filtros por capa, colores, follow TCP stream | — |
| 9 | `09-cierre` | ⭐ 🔥 🕵️ 🤬 ⚡ 🏆 🧠 🧩 💬 🤷 🎬 + ✅ CEs | — |

## Convenciones por punto

- Frontmatter con `title` y `description`; si el `title` lleva `: `, se entrecomilla (lección de `expand-u01`).
- Apertura: `<p><small>` con la descripción, bloque `> 🗺️ **Estás en:** U02 → N · Punto`.
- Secciones `##`, tablas y bloques de código; ejercicios con solución en `<details>`.
- Referencias cruzadas a U01 y U03 donde el concepto lo pida.
- Cierre de navegación: `[Volver al índice](/ApuntesRedes/02-modelos-osi-analisis)` + Anterior/Siguiente.

## Índice de unidad

`02-modelos-osi-analisis.md` mantiene el frontmatter actual (title/description) y gana: mapa del paquete, objetivo, tabla de puntos con enlaces, bloque de boletines (`.ejercicio-links`), tabla de CEs RA1 (d–g) y "¿Por dónde empiezo?" con navegación.

## Sidebar

Se define `const u02Puntos = [...]` y se devuelve el grupo `{ label, collapsed: true, items: [ { slug, label: 'Índice de la unidad' }, ...u02Puntos ] }` para `slug === '02-modelos-osi-analisis'`, igual que U01 en `astro.config.mjs`.

## Boletines

- Inicial: 8 ejercicios de memoria/identificación directa (ordenar capas, capa-soy, V/F, puertos, tamaños de cabecera, PDU, encapsulación simple, socket).
- Avanzado: 8 ejercicios de aplicación/razonamiento (captura Wireshark, encapsulación diseñada, diagnóstico por capas, handshake perdido, TTL/fragmentación, filtros combinados, +2 nuevos que combinan conceptos).
- Resueltos con idéntica numeración y soluciones desarrolladas.