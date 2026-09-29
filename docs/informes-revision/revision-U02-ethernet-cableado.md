# Revisión — U02 Ethernet y cableado

> Fecha: 2026-09-27 · Sesión 2 de la revisión vigente (12 unidades)
> Alcance: teoría (índice + 10 puntos) + boletines (6 ficheros: inicial, avanzado y Packet Tracer con sus resueltos). Diagramas: pasada aparte en el cierre transversal.

## 1. Auditoría automática

| Check | Resultado |
|---|---|
| `npm run check:unidad 02` | ✅ 0 fallos / 0 avisos |
| `node scripts/check-uds.mjs` | ✅ restos 0 |
| `scripts/check-links.mjs` | ✅ 0 rotos |
| `npm run check:diagrams` | ⚠️ 55 fallos / 19 diagramas = baseline sin tocar (pendiente la pasada de diagramas) |
| `npx astro build` | ✅ 183 páginas |

## 2. Hallazgos internos

Etiquetas: 🟡 corregir ya · 🔵 ampliar · ⚪ dejar · 🔴 mover/quitar (requiere decisión).

### 🟡 Aplicados en esta sesión — teoría

| # | Fichero:línea (original) | Hallazgo | Acción |
|---|---|---|---|
| 1 | `02-ethernet-cableado.md:16` | Duplicaba casi literal el bloque 📖 *Flujo de lectura* | Recortado a "10 puntos: 9 de teoría y el 10º, aterrizaje práctico" |
| 2 | `02-ethernet-cableado.md:32` | Objetivo decía "MACs, EtherType, **MTU** y FCS" (MTU no es campo de la trama) | "MACs, EtherType, **payload** y FCS" |
| 3 | `02-ethernet-cableado.md:57` | Práctica de boletines: "empezar **siempre** el resuelto" (mala idea) | "mira 1-2 resueltos para coger el formato; consulta el resuelto solo cuando te atasques" |
| 4 | `02-ethernet-cableado.md` (CE) | Tabla del índice desalineada con la del cierre (faltaba RA2·f) | Añadida la fila RA2·f) Integración de dispositivos |
| 5 | `01-medios-de-transmision.md:16` | Enlazaba la introducción (05-paquetes) como "viste la capa 1": esa página no enseña capa 1 | Enlaza al [punto del modelo OSI] de la propia unidad |
| 6 | `01-medios-de-transmision.md:42` | Etiqueta "punto 7" sobre el enlace a `06-conceptos-fisicos` | "punto 6" |
| 7 | `01-medios-de-transmision.md:70` | "el **punto 6** de redes inalámbricas" (no existe; apunta a `02-medios-inalambricos`) | "la **unidad** de redes inalámbricas" |
| 8 | `02-cable-utp.md:43` | "cada par usa pines **adyacentes** (1-2, 3-6, 4-5, 7-8)": 3-6 no es adyacente | Reescrito con el "salto" de 3-6 sobre 4-5 (puente al split pair del punto 4) |
| 9 | `02-cable-utp.md:55` | Analogía del ascensor ininteligible | Analogía de dos coches con ritmos de balizas distintos |
| 10 | `03-directo-cruzado-consola.md:45` | "usar el mismo par para enviar que para recibir… simplificando" (confuso) | Pines de envío y recepción **complementarios**: el que transmite por unos pines, el otro escucha por ellos |
| 11 | `03-directo-cruzado-consola.md` (tabla cruzado) | Faltaba **PC ↔ Router** (caso clásico de examen: ambos transmiten por los mismos pines) | Fila + nota en la tabla; reflejado también en la tabla-resumen |
| 12 | `03-directo-cruzado-consola.md:108` | Respuesta 2 ambigua ("podría haber problemas de enlace") | "**No: no llegan a enlazar**, porque los dos switches transmiten por los mismos pines" |
| 13 | `04-crimpado-y-comprobacion.md:25` | "según categoría que quieras" | "según la categoría que uses" |
| 14 | `04-crimpado-y-comprobacion.md:37` | Paso 2: "aplanar los pares 4-5 tras los 1-2" (incompleto y easy de malinterpretar) | Aviso explícito: **el par verde va partido** (3 y 6, con el azul 4-5 en medio) y no hay que "arreglarlo" |
| 15 | `04-crimpado-y-comprobacion.md:62` | Etiqueta "punto 7" sobre el enlace a `06-conceptos-fisicos` | "punto 6" |
| 16 | `04-crimpado-y-comprobacion.md:68` | Ejemplo de split pair erróneo ("Blanco/Naranja va al pin 3"): eso es un cable mal, y el tester sí lo ve | Ejemplo correcto: par azul en los pines 3-4 en vez del 4-5 (continuidad OK, pares rotos) |
| 17 | `04-crimpado-y-comprobacion.md:72` | "Pares invertidos … funciona como **crossover accidental**" (no lo es: es inversión de polaridad) | Reescrito: polaridad; algunos equipos la corrigen, otros no |
| 18 | `04-crimpado-y-comprobacion.md:76` | "sospecha de **faltan pares**" | "sospecha de **pares faltantes**" |
| 19 | `04-crimpado-y-comprobacion.md:94` | Mini-chequeo 1 daba la respuesta en el enunciado (lista de los 6 pasos) | Enunciado limpio; la lista queda en la `<details>` |
| 20 | `05-fibra-optica.md:24` | "el cobre se asfixia en **10**" (contradice el Cat8 25-40 Gbps del punto 2) | "el cobre se queda en 25-40 Gbps (Cat8) y solo a 30 m" |
| 21 | `05-fibra-optica.md:28` | "Peso y **envergadura**" (palabra mal usada) | "Peso y tamaño" |
| 22 | `05-fibra-optica.md:41-42` | Fuente MMF solo "LED"; "550 m (a 10 Gbps)" sin clase (chocaba con el propio mini-chequeo) | "LED (OM1/OM2) o VCSEL (OM3/OM4)"; "550 m (OM4; OM3 llega a 300 m)" |
| 23 | `05-fibra-optica.md:93` | "clases con migas o legacy" | "clases antiguas o de gama baja" |
| 24 | `06-conceptos-fisicos.md:14` | "se **gobierna** con" | "se **rive** con" → "se rige con" |
| 25 | `06-conceptos-fisicos.md:71` | Título "Diafonía: **luz de gas** entre pares" (sin sentido) | "cuando un par pisa a otro" |
| 26 | `06-conceptos-fisicos.md:97` | Fila de síntomas autocontradictoria: "Ping alto y estable \| Latencia alta **(la variación, también llamada jitter)**" (el jitter es la fila de abajo) | "Ping alto y estable \| **Latencia** alta" |
| 27 | `07-cableado-estructurado.md:16` | Etiqueta "punto 7" sobre el enlace a `06-conceptos-fisicos` | "punto 6" |
| 28 | `07-cableado-estructurado.md:89` | "Cableado **impro**" | "Cableado **improvisado** (directo de PC a switch)" |
| 29 | `07-cableado-estructurado.md:97` | "el rack sigue siendo **afición limpia**" (ininteligible) | "un rack ordenado también es una satisfacción personal" |
| 30 | `07-cableado-estructurado.md:103` | Mini-chequeo pedía "los **4 componentes**" y la respuesta enumeraba 5 tramos | "los **4 tipos** de componente (ojo, uno se repite)" |
| 31 | `07-cableado-estructurado.md:111` | Respuesta 2: "**moverse con** un latiguillo nuevo" (ininteligible) | Pasos claros: latiguillo nuevo en la roseta + mover en el rack el latiguillo al puerto correspondiente |
| 32 | `08-modelo-osi.md:85` | "`¿ OSI` y TCP/IP…" (espacio tras la interrogación) | "¿OSI y TCP/IP…" |
| 33 | `09-trama-ethernet.md:16` | Enlazaba "Wireshark" a la introducción (05-paquetes), que no menciona Wireshark | Frase sin enlace + remite a la sección Wireshark del propio punto |
| 34 | `09-trama-ethernet.md:54` | "El **"carta"** que viaja" (género) | "La "carta" que viaja" |
| 35 | `09-trama-ethernet.md:76` | Campo tipo de 802.11: "*Type / Length*" (es de 802.3/LLC, no del marco WiFi) | "*Type/Subtype* del *Frame Control* (datos, management, control…)" |
| 36 | `09-trama-ethernet.md:82` | "canales, asociación y seguridad" enlazados a `11/01-medio-inalambrico` (solo cubre canales) | Enlace al **índice** de la unidad de redes inalámbricas |
| 37 | `10-cierre.md` (tabla CE) | **Baseline F0**: RA del índice (RA1/RA2) ≠ RA del cierre (RA2); filas d)/e) con afirmaciones falsas ("WiFi 4/5/6/7 en el punto 6", "✅ (Introducción…)"); c) "puntos 4 y 7" | Tabla alineada con el índice: RA1·b, RA2·a, RA2·b, RA2·c, RA1·d, RA2·f; encabezado **(RA1/RA2)** |
| 38 | `10-cierre.md:99` | CONRAD del LED: tres hablantes en un solo párrafo | Separados en líneas (**CONRAD / Usuario / CONRAD**) |
| 39 | `10-cierre.md:181` | Crucigrama: "RJ45 (4 letras + número)" (son 2 letras) | "(2 letras + número)" |
| 40 | `10-cierre.md:189` | Crucigrama: "T568B (letra + número)" (es letra + números + letra) | "(letra, números y letra)" |

### 🟡 Aplicados en esta sesión — boletines

| # | Fichero:línea (original) | Hallazgo | Acción |
|---|---|---|---|
| B1 | `boletin-U02-inicial.md:56` (+ resuelto) | "**Sopa de letras** de conectores": no hay sopa de letras | "Conectores: nómbralos" |
| B2 | `boletin-U02-inicial.md:117` (+ resuelto c/f) | Trama mínima: "46 bytes (**60** con cabecera+FCS)" → 14+46+4 = **64** | Corregido a 64 bytes de trama en los tres sitios |
| B3 | `boletin-U02-avanzado.md:106` (ex. 8c) | Premisa falsa: "¿por qué el fallo **NO** está en la capa 1 si el tester ha pasado?" (dogma: FCS erróneo casi siempre es señal marginal de capa 1) | "¿Puedes descartar ya la capa 1? Justifica" |
| B4 | `boletin-U02-avanzado-resuelto.md:110,116` | Síntoma A rotulado "Capa 2" pero descrito como crimpado marginal; "clave de examen" que descartaba capa 1 con LED+tester | Reescrito: **alerta de capa 1 que la capa 2 delata** (el tester solo mide continuidad, no calidad de señal); clave de examen corregida |
| B5 | `boletin-U02-avanzado-resuelto.md:71` (ex. 5c) | Aut contradiction: "**Funcionará parcialmente** … no funcionará **ni a 100 Mbps**" (pin 3 = par 3-6, crítico para 10/100/1000) | "**No: no hay enlace**" + matiz: si cayera el par 7-8, sí bajarías a 100 Mbps |
| B6 | `boletin-U02-avanzado-resuelto.md:57` | "OM3/OM4 a 10 Gbps hasta 550 m" para 500 m (OM3 se queda en 300 m) | "OM4 (si fuera 1 Gbps, también llega la OM3)" |
| B7 | `boletin-U02-packettracer-resuelto.md:78` (ex. 4) | "ping de **PC1** a `192.168.1.11`": era la IP de PC1 (loopback, no prueba nada) | `ping 192.168.1.12` (PC2) |
| B8 | `boletin-U02-packettracer-resuelto.md:99` (ex. 5) | "destino MAC **del switch**" (mito: el switch es transparente, la trama lleva la MAC final) | ARP broadcast primero; ICMP con destino MAC de **PC1** |
| B9 | `boletin-U02-packettracer-resuelto.md:65-66` | Formato de MAC de ejemplo `00D0.xxxx.xxA` (bloque final de 2 dígitos) | `00D0.aaaa.bbbb` |
| B10 | `boletin-U02-packettracer-resuelto.md:120` | "MAC de PC1 (o **del switch en el 1er salto**)" | "o broadcast `FF:FF…` si capturaste el ARP previo" |
| B11 | `boletin-U02-packettracer.md:48` | Pista de Wireshark inútil ("Add Complex → Add Simple PDU" no muestra EtherType) | Pista con *Simulation mode → Details / Outbound PDU details* |

### ⚪ Dejar (revisado sin acción)

- **Cat5e a 10 Gbps < 30 m** (FAQ del cierre): matizado como "no certificado, condiciones ideales" → se queda.
- **21,3 dB de atenuación Cat6 @100 MHz** (avanzado ex. 3): es el valor de la norma para Cat6 de 24 AWG; las cuentas del resuelto (−19,3 dBm / −23,56 dBm) son correctas.
- **TLS en la capa 6** (modelo OSI): convención de manual, aceptable para FP.
- **Refuerzos repetidos** (split pair en 4 ↔ 6 ↔ cierre; "el tester no lo ve" en 4 y en el boletín avanzado): registros distintos, deliberados.
- **Wireshark sin punto propio** en la unidad: vive en la sección del punto 9 y en la instalación de la introducción (el `08-wireshark` era de la estructura antigua de 13 unidades).

## 3. Fronteras con otras unidades

| Concepto | Aparece en | Veredicto |
|---|---|---|
| ARP | Solo EtherType `0x0806` + "se explica en dirección IP" (punto 9) | ✅ puente → desarrollo en `03/01-estructura-ipv4` (con enlace de vuelta: "en Ethernet solo nombramos el 0x0806") |
| Fragmentación / MTU | Punto 9: "el MTU 1500 es el techo de la trama; la capa 3 fragmenta" → enlaza a IP | ✅ regla cumplida |
| WiFi / 802.11 | Punto 1 (aire a vista de pájaro) + punto 9 (trama 802.11 comparada) → enlaza al índice de inalámbricas | ✅ nivel correcto; canales/asociación/seguridad en UD11 |
| Switch / capa 2 | Punto 8 menciona `04-switching/01-que-es-un-switch` | ✅ mención legítima (enlace verificado) |
| Escalera del ping | Punto 8 la cita → `01-introduccion/07-metodo-diagnostico` | ✅ |
| STP | 3 ficheros de la unidad | ✅ **falso positivo del baseline**: aquí STP = cable *apantallado* (Shielded Twisted Pair), no Spanning Tree |
| DHCP / DNS / NAT / VLAN / OSPF | No aparecen | ✅ sin contenido fuera de sitio |

Sin candidatos a mover/quitar.

## 4. Boletines de la unidad

- Par `inicial` + `avanzado` con sus `-resuelto` y variante `packettracer` + `-resuelto` (6 ficheros) ✅, sin imágenes ni diagramas ✅, sin números de unidad en títulos ✅.
- Nivel: inicial (memorización y comprensión) → avanzado (diagnóstico, cálculo de atenuación, diseño) → PT (práctica guiada). Sin inversión aparente de dificultad.
- Correcciones aplicadas: B1–B11 de §2 (los más graves: B2 trama mínima 60→64 y B4 la premisa de capa 1 del síntoma A).
- Crucigrama del cierre: conteos verificados 1 a 1 contra las soluciones (RJ45 y la pista de T568B corregidos, ver #39-40).

## 5. Decisiones pendientes del profe 🔴

- [x] **Q1 — Tabla de CEs del cierre**: ✅ **aplicado** — se han añadido las filas `RA2·d)` y `RA2·e)` en índice y cierre con el marcador "→ se verá en la unidad de dirección IP / redes inalámbricas" (sin números de unidad en prosa). Los textos oficiales de a), b) ya estaban.

## 6. Verificación y commit

- [x] `check:unidad 02` 0/0 · `check-uds` 0 · `check-links` 0 · build 183 · `check:diagrams` = 54 (nuevo baseline tras Q1 de U03; era 55) — re-verificado tras la pasada de decisiones
- [x] Comprobación lingüística es-ES
- [x] DOCX regenerado (`npm run docx`): 68 generados, 0 fallos
- [x] Commit `Revisión U02: …` — hecho y pusheado (`b8afc85`); se marcaba pendiente en la sesión
- [x] Matriz de solapamientos + README de estado actualizados
