# Expand U11 — Design

## Estructura de la unidad

La U11 se organiza como un **libro de 9 capítulos** (patrón U01/U02):

| # | Slug | Contenido |
|---|---|---|
| 1 | `01-metodologia-de-diagnostico` | Método OSI de abajo arriba, regla de oro |
| 2 | `02-comandos-esenciales` | ping, traceroute, netstat, nslookup/dig, pathping/mtr |
| 3 | `03-wireshark` | Filtros, análisis TCP (handshake, retransmisiones, window, RTT), Follow TCP Stream |
| 4 | `04-snmp` | Arquitectura NMS/agente, MIB, OID, versiones, configuración Cisco |
| 5 | `05-syslog-y-logging` | Niveles, configuración, rsyslog centralizado |
| 6 | `06-netflow-y-ipfix` | Análisis de tráfico, exportación, casos de uso |
| 7 | `07-herramientas-de-monitorizacion` | Zabbix, PRTG, Nagios, LibreNMS |
| 8 | `08-caso-practico-de-diagnostico` | Caso completo de troubleshooting en Packet Tracer |
| 9 | `09-cierre` | ⭐ 🔥 🕵️ 🤬 ⚡ 🏆 🧠 🧩 💬 🤷 🎬 + ✅ CEs |

## Convenciones por punto

- Frontmatter con `title` y `description` (entrecomillar si hay `: `).
- Apertura: `<p><small>` + bloque `> 🗺️ **Estás en:** 🩺 U11 → N · Punto`.
- Secciones `##`, tablas, bloques de código, `<details>` para soluciones.
- Cierre de navegación: `[Volver al índice](/ApuntesRedes/11-diagnostico-monitorizacion)` + Anterior/Siguiente.

## Índice

`11-diagnostico-monitorizacion.md` con mapa, boletines, CEs RA2/Transversal (h, i, j, k) y "¿Por dónde empiezo?". Referencias a U01 (método diagnóstico) y U08/U10 (ACLs, NAT).

## Boletines

- Inicial: 8 (conservar 1-6 + 2 nuevos: filtros Wireshark + niveles syslog).
- Avanzado: 8 (conservar 1-6 + 2 nuevos: análisis de captura + plan de monitorización SNMP/syslog).
- Resueltos 1:1.