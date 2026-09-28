# Revisión — U09 NAT y PAT

> Fecha: 2026-09-28 · Sesión de la revisión vigente (12 unidades)
> Unidad: `09-nat-pat` (índice + 8 puntos + cierre) y boletín inicial/avanzado (+resueltos).
> Las líneas citadas son las **previas a la edición** de esta sesión.

## 1. Auditoría automática

| Check | Resultado |
|---|---|
| `npm run check:unidad 09` | ✅ 0 FALLO / 0 AVISO (pre y post) |
| `node scripts/check-uds.mjs` | ✅ 0 restos de numeración (pre y post) |
| `scripts/check-links.mjs` | ✅ OK (pre y post) |
| `npm run check:diagrams` | 55 fallos preexistentes (sin tocar diagramas en esta sesión) |
| `npx astro build` | ✅ 183 páginas |
| `npm run docx` | ✅ 68/68 |

## 2. Hallazgos internos

Etiquetas: 🟡 corregir ya · 🔵 ampliar · ⚪ dejar · 🔴 mover/quitar (requiere decisión).

| # | Fichero:línea | Etiqueta | Hallazgo | Acción/estado |
|---|---|---|---|---|
| 1 | `09-nat-pat/01-que-es-nat.md:18` | 🟡 | "ya lo rozaste en las **unidades** de IPv4" (plural: solo hay una unidad de dirección IP) | ✅ → "en la unidad de dirección IP" |
| 2 | `09-nat-pat/03-nat-estatico-y-dinamico.md:55` | 🟡 | Pool "/29 (ej. 83.45.12.80-83.45.12.85, 6 IPs utilizables)": `.80` es dirección de red y falta `.86` (las 6 utilizables de `.80/29` son `.81-.86`) | ✅ → `.81-.86` + red `.80/29` |
| 3 | `…/03-nat-estatico-y-dinamico.md:57-62` | 🟡 | Diagrama del pool: `.78/.79/.80` — pisaba la IP estática `192.168.1.10 ↔ 83.45.12.78` del propio punto (L25) y la de WAN | ✅ → `.81/.82/.83` (`.84` libre) |
| 4 | `…/03-nat-estatico-y-dinamico.md:69` | 🟡 | `ip nat pool PUBLICO 83.45.12.78 83.45.12.81 netmask 255.255.255.248` cruza dos bloques /29 y arranca en la IP de WAN | ✅ → `83.45.12.81 83.45.12.86` (netmask ya correcta) |
| 5 | `…/06-tabla-nat-y-verificacion.md:40-46` | 🟡 | Tabla "dos PCs" corrupta: *Inside global* truncado (`192.168.1.`), sin puertos; contradice la frase siguiente que cita `60001`/`60002` | ✅ → filas completas `.78:60001 → .10:54321` y `.78:60002 → .20:54321` |
| 6 | `…/07-problemas-y-soluciones.md:71` | 🟡 | Párrafo NAT-T corrupto (texto pegado de dos borradores: "…en UDP:4500.**ridad falla**…", solución contada dos veces) | ✅ → párrafo limpio: AH autentica la cabecera, ESP cifra los puertos, NAT-T encapsula en UDP:4500 |
| 7 | `…/07-problemas-y-soluciones.md:97` | 🟡 | 802.11n solo "2,4 GHz" (n es dual-band) | ✅ → "2,4 y 5 GHz" |
| 8 | `…/07-problemas-y-soluciones.md:126` | 🟡 | Resumen incomprensible: "de n/ac/ax/be a la familia 802.11 le va muy bien" | ✅ → frase reescrita (WiFi va de la n a la be; WiMax se quedó en 802.16) |
| 9 | `…/08-configuracion-completa.md:35-38` | 🟡 | PCs en `.10, .20, .30` chocan con el servidor `.10` (L36), con la propia salida (`L90-91` usa `.11/.12`) y con el lab del cierre (`.11-.13`); el aviso "Detalle que confunde" tapaba el error | ✅ → PCs `.11-.13` y borrado del aviso |
| 10 | `09-nat-pat.md:29` | 🟡 | El objetivo promete "DNS roto tras NAT" y "doble NAT": grep 0 en la unidad (el punto 7 cubre FTP/VoIP/juegos/VPN) | ✅ → objetivo ajustado a lo cubierto (ampliación posible en 🔵) |
| 11 | `09-nat-pat.md:41` | 🟡 | Fila del mapa `05 · NAT de destino` abreviada ≠ título `5 — NAT destino (port forwarding)` | ✅ → título completo (patrón de la sesión U06) |
| 12 | `09-nat-pat.md:45` | 🟡 | Fila del cierre: desc "Sé el Paquete" pero el bloque ⭐ real es `⭐ Sé el NAT` (variante aprobada; precedente U02 "Sé el Bit") | ✅ → "Sé el NAT" |
| 13 | `09-nat-pat/09-cierre.md:2,8,248` | 🟡 | Numeración **simple** en el cierre (`9 — Cierre`, `→ 9 ·`, `Anterior: [8 · …]`): el cierre lleva relleno (U02/U03/U05/U06/U07/U10/U11/U12) | ✅ → `09 —`, `09 ·`, `08 ·` |
| 14 | `…/09-cierre.md:59` | 🟡 | ¿Quién Soy? 4: pista "2,4 GHz, 5 GHz, hasta 1,3 Gbps" → respuesta `802.11ac`, que es **solo 5 GHz** | ✅ → pista solo 5 GHz |
| 15 | `…/09-cierre.md:177,185-186` | 🟡 | Crucigrama: **V2 repite enunciado y respuesta de H7** (NATESTATICO) y H7 no aparece en la línea de respuestas Horizontal | ✅ → H7 con su respuesta en Horizontal; V2 nueva = **ALG** (traductor de IPs en el payload, 3 letras) |
| 16 | `…/09-cierre.md:216` | 🟡 | "con 65535 puertos" sin formato es-ES (el punto 4 ya usa 65.535) | ✅ → `65.535` |
| 17 | `boletines/boletin-U09-inicial.md:42-46` | 🟡 | Ejercicio 4: misma tabla corrupta que el punto 6 — la resuelto contesta "2 dispositivos (.10/.20)" y puerto "50001" que **no se ven** en el enunciado | ✅ → filas udp `.78:50001 → .10` y `.78:50002 → .20` |
| 18 | `…/boletin-U09-inicial.md:80-85` | 🟡 | Ejercicio 8: las dos primeras filas rotas; la resuelto cita 60001/60002 que no aparecen | ✅ →3 filas completas (60001/60002/60003) |
| 19 | `…/boletin-U09-inicial.md:70` | 🟡 | Ejercicio 7b: pool "(83.45.12.78-81)" mete la IP del router en el pool y pisa el `.78` del apartado a) | ✅ → `(83.45.12.81-84)` (las 4 del /29 sin la WAN) |
| 20 | `…/boletin-U09-avanzado-resuelto.md:106` | 🟡 | El enunciado 8 da WAN `203.0.113.2/30` pero la solución espera entradas `83.45.12.78:puerto` | ✅ → `203.0.113.2:puerto` |

### ⚪ Dejar (documentados, sin tocar)

- `01-que-es-nat.md:46` — `8.8.8.1` como IP pública del PC en el diagrama (ejemplo abstracto; el repo usa IPs públicas arbitrarias en varios sitios).
- `03-nat-estatico-y-dinamico.md:25` — estático 1:1 usando la IP de WAN (`.78`) como *inside global*: simplificación didáctica (igual que el punto 8 con `203.0.113.1`).
- `02-tipos-de-nat.md:77-79` — enlaces con relleno `[03 · …]` en el listado "Cada tipo, en su punto" (estilo mini-mapa; dentro de puntos el patrón habitual es `[punto N]`, sin precedente de corrección).
- `06-tabla-nat-y-verificacion.md:85` vs `:119` — timeout TCP "variable según el estado" (tabla) vs "~24 h" (mini-chequeo): compatible (24 h es el valor por defecto de sesión).
- `05-nat-destino.md:81` — cliente externo `200.50.10.5` (misma política de IPs arbitrarias que `200.100.50.1` de los boletines).
- Boletines — rangos de puertos "49152-65535" sin separador de millares: se leen como identificadores, no como cantidades.
- `08-configuracion-completa.md:117` — "El diagnóstico (de la práctica inicial)": referencia vaga, inofensiva.

### 🔵 Ampliar (opcionales, fuera de esta sesión)

- **NAT inverso** — el BC7 oficial lo lista ("NAT estático, dinámico, de sobrecarga (PAT) e **inverso**") y la unidad ni lo nombra; encajaría como nota en la tabla comparativa del punto 2.
- **Doble NAT y DNS tras NAT** — si el profe prefiere no recortar el objetivo (hallazgo 10), serían dos bloques cortos en el punto 7 en lugar del recorte aplicado.

## 3. Fronteras con otras unidades

| Concepto | Aparece en | Veredicto |
|---|---|---|
| WiFi / 802.11 y WiMax | punto 7 (bonus CE e), vocabulario, cierre (¿Quién Soy? y crucigrama 6E) | ✅ legítimo: el CE e) oficial de RA7 exige "analogías y diferencias entre Wifi y Wimax"; el detalle (canales, seguridad, APs) sigue siendo de inalámbricas (sesión pendiente) |
| Frame Relay, RDSI, ADSL · UMTS/HSDPA | **ninguna unidad** (grep del repo: solo trivia de timers NBMA en un boletín de OSPF) | 🔴 ver §5 — CEs d) y f) oficiales sin cubrir en ningún sitio |
| DNS | solo ejemplos de tabla (UDP/53) en los puntos 6 y cierre | ✅ sin desarrollo propio (casa = servicios de red, ya cerrada) |
| ALG, UPnP, STUN/TURN/ICE, NAT-T | punto 7 completo | ✅ casa de NAT (problemas e "incidencias de NAT" del BC7) |
| ACL / firewalls | checklist del punto 5, CONRAD del cierre | ✅ mención operativa con enlace; la casa de ACL ya está cerrada en la sesión U10 |

### Observaciones cross-unit (hallazgos NUEvos en unidades ya revisadas — no se tocan aquí)

- **U08 OSPF**: su cierre usa numeración simple (`9 — Cierre`, `→ 9 ·`) — mismo caso que el corregido en esta sesión; y el índice describe el bloque ⭐ como "Sé el Paquete" cuando el cierre es `⭐ Sé el Router OSPF`.
- **U07 Enrutamiento estático**: `05-como-decide-el-router.md:39` menciona "el ⭐ Sé el Router del cierre", pero su cierre es `⭐ Sé el Paquete`.
- **U11 Redes inalámbricas**: `08-configuracion-wlan.md:171` — pie "Siguiente: [09 · Cierre]" con relleno dentro de una página de punto (dentro de puntos es dígito simple).

## 4. Boletines de la unidad

- Par inicial/avanzado (+resueltos), sin variantes; sin imágenes ni diagramas ✅; sin números de unidad en títulos ni prosa ✅; pistas en `<details>` ✅.
- **Inicial**: graduación correcta (concepto → config PAT → leer tabla → tipos → NAT destino). Hallazgos #17, #18 (tablas corruptas: los ejercicios 4 y 8 no eran resolubles con lo que se veía) y #19 (pool con la IP de la WAN).
- **Avanzado**: nivel coherente con la teoría (traducción manual, FTP activo con `PORT 192,168,1,10,4,1` correcto, multi-NAT con sintaxis `static tcp` válida, IPsec/NAT-T, timeouts, servidores duales, diagnóstico con fallo de marcas). Hallazgo #20 (IP de WAN de la solución, equivocada).
- Las soluciones de ambos resueltos quedan consistentes con los enunciados tras los arreglos.

## 5. Decisiones pendientes del profe 🔴

- [ ] **R1 · CEs oficiales de RA7 — tabla actual ≠ oficial.** Verificado por 5 fuentes independientes (BOE RD 1629/2009, centro con el PDF de criterios, AAPRI, cursodeinstalador, IES Aldebarán). Oficial:
  - a) ventajas e inconvenientes del uso de NAT ✅ (la tabla la tiene, como paráfrasis)
  - b) traducción estática ✅ · c) traducción dinámica ✅
  - **d) características de «Frame Relay», RDSI y ADSL** — la tabla dice **"Port forwarding"** (CE inventado en `00ca5d4`; el port forwarding sí es contenido oficial del BC7 "NAT destino", pero no es el CE d)
  - e) analogías y diferencias Wifi/WiMax ✅ (cubierto en el punto 7)
  - **f) características de UMTS y HSDPA** — **ausente** de la tabla y de todo el curso
  - Ninguna unidad cubre d) ni f). Opciones:
    - **A (recomendada)**: añadir en el punto 7, junto al bonus WiFi/WiMax, dos bloques cortos — *WAN heredada* (Frame Relay, RDSI, ADSL) y *móvil 3G/3.5G* (UMTS, HSDPA) — y dejar la tabla a)–f) con el **texto oficial literal** → 6/6 ✅. El BC7 oficial solo pide "describir características" (verbo débil), y el tono del apunte ya absorbe bloques así (el propio bonus WiFi/WiMax es el precedente).
    - **B**: conservar d) "Port forwarding" (respaldado por el BC7 "NAT destino") y añadir f) marcado como pendiente → tabla a medias respecto de lo oficial.
    - **C**: tabla solo a)–c) y e) con nota explícita de que d) y f) quedan fuera del alcance de los apuntes.

## 6. Verificación y commit

- [x] `check:unidad 09` sin FALLOs · `check-uds` en 0 · `check-links` OK · build 183 páginas
- [x] DOCX regenerado (`npm run docx`, 68/68)
- [x] Comprobación lingüística es-ES (textos nuevos: es-ES natural, sin LatAM ni anglicismos)
- [ ] Commit `Revisión U09: …` (tras confirmación)
- [x] Matriz de solapamientos + README de estado actualizados
