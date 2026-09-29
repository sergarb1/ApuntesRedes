# Revisión — U01 Introducción

> Fecha: 2026-09-26 · Sesión 1 de la revisión vigente (12 unidades)
> Alcance: teoría (índice + 10 puntos) + boletines. Diagramas: pasada aparte en el cierre transversal.

## 1. Auditoría automática

| Check | Resultado |
|---|---|
| `npm run check:unidad 01` | ✅ 0 fallos / 0 avisos (baseline F0: 4 fallos + 1 aviso) |
| `node scripts/check-uds.mjs` | ✅ restos 0 |
| `scripts/check-links.mjs` | ✅ 0 rotos (antes: 19 falsos positivos de assets; el checker ahora valida `public/`) |
| `npm run check:diagrams` | ⚠️ 55 fallos / 19 diagramas = baseline sin tocar (pendiente la pasada de diagramas) |
| `npx astro build` | ✅ 183 páginas |

## 2. Hallazgos internos

Etiquetas: 🟡 corregir ya · 🔵 ampliar · ⚪ dejar · 🔵/🔴 decisión.

### 🟡 Aplicados en esta sesión

| # | Fichero:línea (original) | Hallazgo | Acción |
|---|---|---|---|
| 1 | `01-que-es-una-red.md:71` | `funcione!.` (puntuación duplicada) | `¡No necesitas Internet para que funcione!` |
| 2 | `01-que-es-una-red.md:92,94,96` | Fireside Cable/WiFi corrupta (`te hacesPuerto`, `sin.catalogar`, `follows sus normas`) | Tres frases reescritas con sentido original (apagas/desplomas · sin canalizar · mando yo) |
| 3 | `01-que-es-una-red.md:123` | CONRAD: `"¿has visto una LAN sin router? ¡Pues eso!"` — no secuacia (una LAN sin router es normal) | `"¿has visto alguna vez una LAN funcionando sin salir a Internet? ¡Pues eso!"` |
| 4 | `01-que-es-una-red.md` (pie) | Primer punto sin `**Anterior:**` (FALLO del checker) | Añadido con la convención de 02/03: `Anterior: Índice de la unidad` |
| 5 | `02-aparatitos.md:75` | `"Cuando yo falla un módulo"` + LatAm `"acá"` | `"Cuando me falla…"` + `"aquí"` |
| 6 | `03-mac-ip-puertos.md:99` | CONRAD: `"las dos viajan juntas en cada paquete"` — la MAC viaja en la trama, no en el sobre del paquete (choca con el punto 04) | `"…en cada trama"` |
| 7 | `04-paquetes-y-protocolos.md:113-126` | **Laboratorio falso**: con IPs solapadas, `/16` vs `/24` NO rompía el ping (ambas PC se veían locales y el ARP resolvía) | Rediseñado: PC-A `192.168.1.10/28` vs PC-B `192.168.1.20/24` → PC-B queda fuera de la subred de PC-A, sin gateway ⇒ ping cae de verdad; pistas y solución actualizadas |
| 8 | `05-dns-y-dhcp.md:85,104,117` | `IP's` · `tengasInternet` · `"8.8.8.9 (una IP que no existe)"` (sí existe; el fallo es que no es DNS) | `IPs` · `tengas Internet` · `"(que no es un servidor DNS)"` |
| 9 | `06-metodo-diagnostico.md:52` | `"Tus 4 peldaños"` vs peldaño 0 + tabla + diagrama (0–4) | `"Los 5 peldaños, del 0 al 4"` |
| 10 | `06-metodo-diagnostico.md:141` | `8.8.8.9 "(una IP que no existe)"` | `"(que no es un servidor DNS)"` |
| 11 | `06-metodo-diagnostico.md:236` | Poscréditos `"PRÓXIMAMENTE: Ethernet"` saltaba los puntos 07–10 | `"PRÓXIMAMENTE EN 07: Instalación de Packet Tracer…"` |
| 12 | `06-metodo-diagnostico.md:240` | Pie `Siguiente: [07 · Glosario](09-glosario)` — etiqueta y destino falsos en ambos órdenes | `Siguiente: [07 · Instalación de Packet Tracer](07-instalacion-packet-tracer)` |
| 13 | `07-instalacion-packet-tracer.md:42,102,126` | `te trabas` · `cableEthernet` · `Limitaciones` (mayúscula media frase) | `te atasca` · `cable Ethernet` · `limitaciones` |
| 14 | `08-mapa-del-curso.md:20,38` | `"Las 12 etapas"` sobre una tabla de 11 filas; alt truncado `": a la alta disponibilidad"` | `"El viaje, etapa a etapa"`; alt completo `"de Ethernet a Alta disponibilidad"` |
| 15 | `09-glosario.md:70,120` | `¿Paper mojado?` (anglicismo) · `te trabas` | `¿Papel mojado?` · `te atascas` |
| 16 | `10-preguntas-tontas.md:97,107` | `medio tonta` (LatAM) · `Ves?` sin abrir interrogante | `media tonta` · `¿Ves?` |
| 17 | `10-preguntas-tontas.md:69,81` | Referencias `"Punto 5"` / `"Punto 2"` (número de fichero en prosa) | `"lo del DNS"` / `"el aviso del punto de los aparatitos"` |
| 18 | `10-preguntas-tontas.md:162,169` | Duplicado con `05-dns-y-dhcp.md:145` (`"no me va la web, pero sí el correo"` + misma solución) | Atrévete 1 reescrito: `"ping 8.8.8.8 responde pero google.com no"` (respuesta nueva, más rica) |
| 19 | `10-preguntas-tontas.md:163,170` | Duplicado interno con el FAQ del cable (línea 75) | Atrévete 2 reescrito: diagnóstico por la escalera (peldaño 2) |
| 20 | `10-preguntas-tontas.md:153-157` | Caza de mitos sin solución (5 enunciados, 0 respuestas) | Añadido `<details>` con las 5 respuestas (F/F/F/V/V) coherentes con los FAQ de la propia página |
| 21 | `10-preguntas-tontas.md:226` | `Conrad` en minúsculas ×3 | `CONRAD` |
| 22 | `01-introduccion.md:31,35` | Índice sin sección de boletines (FALLO) · `"Las 12 etapas"` en la tabla del índice | Sección `📝 Boletines de la unidad` con los 4 enlaces u01 · `"El viaje de 12 paradas…"` |
| 23 | `scripts/check-unidad.mjs` | Checker exigía Criterios y ⭐ en la introducción | **Exención `"sin CEs"`** documentada: índice de 01 sin tabla de CEs, sin bloque ⭐, y exige ahora `📝 Boletines` |
| 24 | `scripts/check-links.mjs` | Marcaba ROTO cualquier enlace a `diagrams/`/`photos/` | Valida assets contra `public/` |
| 25 | Crucigramas (8 ficheros) | 22 conteos `(X letras)` incorrectos respecto a sus soluciones | Corregidos (ver §4); `09` ya estaba bien; `08` no tiene crucigrama |

### Boletines

| # | Fichero:línea | Hallazgo | Acción |
|---|---|---|---|
| B1 | `boletin-U01-inicial.md` (ex. 2, 4, 6, 7) | Sin pistas (el avanzado tiene 7) | Añadidas 4 pistas sin spoilear |
| B2 | `boletin-U01-inicial-resuelto.md:47` | 5b responde `"entregar los boletines"` pero el enunciado es la base de datos de **notas** | `"guarda las notas de todos y espera a que alguien pida consultarlo"` |
| B3 | `boletin-U01-avanzado-resuelto.md:51` | Aritmética: `"30 PC + 1 impresora = 31 puertos, sobran 17"` — olvidaba el router del enunciado | `32 puertos (…+1 router), sobran 16` |
| B4 | `boletin-U01-avanzado-resuelto.md:76` | Solución 8b cita un `"Foro de la Unidad de la plataforma"` que no existe en el curso | Reescrito: documentar excepción + captura + pasos y pedir ayuda con todo eso delante |
| B5 | `boletin-U01-inicial.md:47` (analogía MAC) | Revisada: la tabla "une con flechas" mezcla filas a propósito y el resuelto asigna `matrícula inmutable → MAC` correctamente | ⚪ sin acción |
| B6 | Par inicial/avanzado | 🔵 Inversión confirmada: el avanzado #6 "Mente binaria" (4×8 de memoria) era más fácil que el inicial #7 (diagnóstico DNS) | ✅ **reescrito el #6 del avanzado** (+ su resuelto): conversión con razonamiento, KB→bytes y detección del error de unidades; cierre transversal |

### 🔵 Ampliar / ⚪ dejar (sin tocar)

- 🔵 ~~**`08-mapa-del-curso.md` no tiene NINGÚN bloque de juegos**~~ → **decidido (Q3):** se queda sin juegos, con excepción documentada en `AGENTS.md`; el mapa es la página de navegación y los juegos ya viven en los otros 9 puntos (tras el reordenado es `10-mapa-del-curso.md`).
- 🔵 **Glosario (`09`)**: se puede ampliar con los términos que el propio curso cita ya (VLAN, ACL, OSPF); ahora solo aparecen en el CONRAD como "palabras que llegarán".
- ⚪ **DNS caído explicado 3 veces** (CONRAD + laboratorio de `05`, escalera de `06`, Atrévete 1 de `10`): es refuerzo deliberado en registros distintos; se deja.
- ⚪ **CONRAD de `09` y el mapa citan VLAN/ACL/OSPF**: son menciones de vocabulario a futuro, sin desarrollo → legítimas.

## 3. Fronteras con otras unidades

| Concepto | Aparece en la introducción | Veredicto |
|---|---|---|
| DHCP / DNS | Explicados como "qué son y por qué existen" (punto 05) | ✅ mención legítima → desarrollo en Servicios de red |
| ARP | Puente en el punto de MAC/IP | ✅ → desarrollo en Dirección IP |
| WiFi / 802.11 | Fireside cable-WiFi y aparatos del punto 02 | ✅ conceptos capa 1–2 → desarrollo en Redes inalámbricas |
| VLAN / OSPF / NAT / STP | Solo vocabulario (mapa, glosario, CONRAD) | ✅ sin contenido fuera de sitio |
| Escalera del ping / método | Punto 06 (dueño absoluto dentro de la intro) | ✅ |

No hay candidatos a mover/quitar entre unidades en la introducción (los duplicados detectados eran internos: 05↔10 y FAQ↔Atrévete dentro del punto 10, ambos resueltos).

## 4. Boletines de la unidad

- Par `inicial` + `avanzado` con su `-resuelto` (4 ficheros), sin imágenes ni diagramas ✅, soluciones en `<details>` ✅.
- **Crucigramas: 22 conteos corregidos en 8 puntos** (`01`, `02`, `03`, `04`, `05`, `06`, `07`, `10`); `09` correcto; `08` sin crucigrama (ver 🔵 de §2). Verificación cruzada pista↔solución de las 42 pistas: 0 problemas.

## 5. Decisiones del profe — APLICADAS en la sesión de reordenado

- [x] **Q1 — Orden de la introducción**: el canónico es el **orden del sidebar** (`8 Glosario · 9 Preguntas · 10 Mapa`); el sidebar ya estaba bien y se reordenaron los ficheros a su vez.
- [x] **Q2 — `07-instalacion-packet-tracer` movido a la posición 2** (renombrado a `02-instalacion-packet-tracer`).
- [x] **Q3 — `10-mapa-del-curso` se queda sin bloque de juegos**: excepción documentada en `AGENTS.md` ("página de navegación; no replicar").

### Nuevo orden de los puntos (canonical)

| # | Fichero | Antiguo |
|---|---|---|
| 01 | `01-que-es-una-red` | igual |
| 02 | `02-instalacion-packet-tracer` | era 07 |
| 03 | `03-aparatitos` | era 02 |
| 04 | `04-mac-ip-puertos` | era 03 |
| 05 | `05-paquetes-y-protocolos` | era 04 |
| 06 | `06-dns-y-dhcp` | era 05 |
| 07 | `07-metodo-diagnostico` | era 06 |
| 08 | `08-glosario` | era 09 |
| 09 | `09-preguntas-tontas` | era 10 |
| 10 | `10-mapa-del-curso` | era 08 |

Se actualizaron: sidebar (`astro.config.mjs`), tabla del índice, breadcrumbs, pies (cadena completa; `10-mapa` ahora cierra con **Siguiente:** *Ethernet y cableado*), poscréditos (los 10 teasers apuntan al nuevo sucesor; `09-preguntas` gana teaser de EN 10), enlaces cruzados desde `02-ethernet-cableado` (3), prosa (`06-dns`: "En el punto de MAC, IP y puertos" en vez de número), árbol de estructura de `README.md` y `AGENTS.md`, y tabla de diagramas de `AGENTS.md`. Los nombres viejos siguen en las tablas históricas de este informe a propósito.

## 6. Verificación y commit

- [x] `check:unidad 01` 0/0 · `check-uds` 0 · `check-links` 0 · build 183 · `check:diagrams` = baseline (55)
- [x] Reordenado Q1/Q2/Q3 aplicado y re-verificado: mismos checks en verde con los nuevos slugs (las 10 URLs nuevas existen en `dist/01-introduccion/`)
- [x] Comprobación lingüística es-ES
- [x] DOCX regenerado (`npm run docx`)
- [x] Commit `Revisión U01: …`
- [x] Matriz de solapamientos + README de estado actualizados
