# Revisión — U03 Direccionamiento IP

> Fecha: 2026-09-27 · Sesión 3 de la revisión vigente (12 unidades)
> Alcance: teoría (índice + 17 puntos + cierre) + boletines (10 ficheros: inicial, avanzado, Packet Tracer e IPv6 inicial/avanzado con sus resueltos). Diagramas: pasada aparte en el cierre transversal.

## 1. Auditoría automática

| Check | Resultado |
|---|---|
| `npm run check:unidad 03` | ✅ 0 fallos / 0 avisos (al cerrar; al inicio 1 aviso **F0** de RA, resuelto) |
| `node scripts/check-uds.mjs` | ✅ restos 0 |
| `scripts/check-links.mjs` | ✅ 0 rotos |
| `npm run check:diagrams` | ⚠️ 55 fallos / 19 diagramas = baseline sin tocar (pendiente la pasada de diagramas) |
| `npx astro build` | ✅ 183 páginas |

## 2. Hallazgos internos

Etiquetas: 🟡 corregir ya · 🔵 ampliar · ⚪ dejar · 🔴 mover/quitar (requiere decisión).

### 🟡 Aplicados en esta sesión — teoría

| # | Fichero:línea (original) | Hallazgo | Acción |
|---|---|---|---|
| 1 | `01-estructura-ipv4.md:110` | Esquema ASCII decía "Paquete de 4000 B" con fragmentos 1480+1480+1040 (= 4000 de *payload*; la cabecera no viaja entera) | "Paquete con 4000 B de payload" |
| 2 | `01-estructura-ipv4.md:127` | Alt del SVG no reflejaba lo anterior | Alt con "paquete con 4000 B de payload" |
| 3 | `01-estructura-ipv4.md:193` | Mini-chequeo 5: "Un paquete de 3000 B" (¿payload o total?) | "Un datagrama con **3000 B de payload**" (la respuesta ya decía payload) |
| 4 | `03-clases-de-direcciones.md:26` | Clase A "16.777.216 hosts" (no se restan red/broadcast) | "16.777.214" |
| 5 | `03-clases-de-direcciones.md:27` | "65K hosts" (formato US/coloquial) | "65.534" |
| 6 | `05-mascaras-y-cidr.md:88` | Fila /8 con "**~16M**" de hosts útiles (impreciso y en desacuerdo con `04:26`, ya exacto) | "**16.777.214**" |
| 7 | `06-subnetting-paso-a-paso.md:90` | Trampa **invertida**: afirmaba que "4 subredes de 50 hosts en /24 exige VLSM" — con subredes iguales basta /26 sin VLSM | Reescrito: /26 cumple de sobra; la trampa real son tamaños distintos (puente al punto 7 intacto) |
| 8 | `08-dhcp.md:74` | Ruta de PT "*Config → DHCP*" (no existe; DHCP vive en *Services*) | "*Services → DHCP*" |
| 9 | `10-compresion-y-prefijos.md:14` | "es un coñazo" (coloquialismo duro para el tono del curso) | "es un rollo" |
| 10 | `10-compresion-y-prefijos.md:52-56` | Diagrama del empate decía "la cadena más larga ya se llevó el ::" (falso: aquí **hay empate**) | Diagrama + nota: dos cadenas de 2 ceros, el :: va en la primera y la segunda queda `0:0` |
| 11 | `11-tipos-de-direcciones.md:45` | "Son los 'DNS' internos" (analogía falsa: DNS no es gateway) | Analogía de "direcciones de casa": NDP/SLAAC y el RA llega desde la LLA |
| 12 | `12-eui64-y-slaac.md:40` | "la primera cifra del IID **suele ser** `02, 06, 12, 16`" (presenta ejemplos como regla fija) | "suele empezar por **algo como**…" |
| 13 | `12-eui64-y-slaac.md:69` | Dirección **temporal** de ejemplo `6dfa:79ff:fe5b:21c4`: lleva `FF:FE` → ¡es EUI-64, no temporal! | IID aleatorio sin FF:FE: `6dfa:c41a:9b3e:7721` |
| 14 | `14-icmpv6-y-ndp.md:80` | "(los switches no inundan el grupo pretendido)" (con MLD solo a nivel host el switch sí inundaría) | NICs solo despiertan para su grupo + **MLD snooping** (mención) |
| 15 | `14-icmpv6-y-ndp.md:87` | Frase rota: "lo que hace escalable al [enlace a transición]" | Puente neutro: "Siguiente parada: los mecanismos de transición…" |
| 16 | `15-mecanismos-de-transicion.md:35` | "overhead" (anglicismo en prosa) | "sobrecarga" |
| 17 | `15-mecanismos-de-transicion.md:37` | "Dual Stack… (lo verás en el cierre)" — el cierre **no** contiene dual stack | Enlace al boletín avanzado de IPv6 (que sí lo monta) |
| 18 | `15-mecanismos-de-transicion.md:57` | "están de capa caída" (giro incomprensible) | "han caído en desuso" |
| 19 | `15-mecanismos-de-transicion.md:71` | "Es el *NAT inverso* de la unidad de NAT" (NAT64 no es NAT inverso; y la unidad de NAT es posterior) | "'NAT' de la traducción entre familias (lo verás en la unidad de NAT)" |
| 20 | `17-ipv8.md:29` | "~18 **billones** (2⁶⁴)" (billón = 10¹² en es-ES; la columna vecina usa sextillones → escala larga) | "~18 **trillones**" |
| 21 | `18-cierre.md:33` | Escenario 2, opción c): "Lo ignoras… conceptualmente el SO sabe que debe ir al gateway" — era tan válida como b) y empaña el juego | Opción claramente falsa: "Lo devuelves al emisor" |
| 22 | `18-cierre.md:90` | "#NoAlcancen" (conjugación) | "#NoAlcanzan" |
| 23 | `18-cierre.md:92` | "es **agarrar** 2 bits" (LatAm) | "es **prestar** 2 bits" |
| 24 | `18-cierre.md:113` | "no queda margen de crecimiento" (exagerado: caben 44) | "solo quedan **44 direcciones libres** (de la 212 a la 255)" |
| 25 | `18-cierre.md:119` (tarea 4) | "Configura rutas estáticas…" sin decir que es contenido de una unidad posterior | Referencia adelantada explícita a la unidad de enrutamiento estático |
| 26 | `18-cierre.md` (nueva tarea 5) | 4 textos prometían IPv6/dual stack en este lab (`16:89`, `16:98`, `16:113`, PT-resuelto `:169`) y el lab no lo tenía | **Tarea 5 dual stack**: `ipv6 unicast-routing` + GUA `/64` en la LAN, PCs estáticas/SLAAC, verificación con `show ipv6 interface brief` y `ping -6` |
| 27 | `18-cierre.md:128-133` (fallo 2) | ACL mal escrita = contenido de la unidad de seguridad, no de esta | **Fallo 2 nuevo: DHCP sin `ip dhcp excluded-address`** (pool con la IP del router; pistas: `ipconfig`, `show ip dhcp binding`/`conflict`, `show run`) — coherente con CONRAD, "Atrévete" y el avanzado ex. 8 |
| 28 | `18-cierre.md` (nuevo fallo 3) | Las 4 refs anteriores exigían un fallo IPv6 con `show ipv6 interface brief` **silencioso** | **Fallo 3**: dirección IPv6 configurada en la interfaz del *enlace* en vez de la de la *LAN* → el brief no muestra la dirección (pistas: ruta *connected*, `ipv6 unicast-routing`) |
| 29 | `18-cierre.md:169` | "el propio DHCP se lo **crea** él solito" (el conflicto) | "se lo **reparte** él solito" |
| 30 | `18-cierre.md:218` | Trampa de entrevista 1: "3 subredes de 50 hosts **no** se resuelven con /25 a lo loco" (con /25 solo caben 2: nunca) | Explicación correcta: /25 da 2 subredes → pide 2 bits (/26, 4 subredes, una sobrante); VLSM si los tamaños difieren |
| 31 | `18-cierre.md:224` | "¿Si dos dispositivos…, ¿cómo evitan conflictos?" (interrogación doble) | Una sola interrogación |
| 32 | `18-cierre.md` (tabla CE) | **Baseline F0**: encabezado `(RA2)` ≠ índice `(RA1/RA2/RA4/RA6)`; filas con letras sueltas, c) con "(RA1)" incrustado | Tabla idéntica al índice (RA2·d, RA1·c, RA2·g, RA4·d, RA6) con encabezado **(RA1/RA2/RA4/RA6)** y línea negrita RA2 (patrón U02) |
| 33 | `03-direccionamiento-ip.md` (tabla CE) | Faltaba **RA4·d)** (Comandos de configuración): el landing y el propio encabezado ya declaraban RA4 sin fila que lo justificara; RA2·g) no citaba el lab | Fila RA4·d) (punto 16 + lab) y "+ ⚡ Laboratorio (punto 18)" en RA2·g) |

### 🟡 Aplicados en esta sesión — boletines

| # | Fichero:línea (original) | Hallazgo | Acción |
|---|---|---|---|
| B1 | `boletin-U03-avanzado-resuelto.md:25` (ex. 1c) | "132 direcciones (**132 − 2 = 130 hosts útiles**)" — un hueco no alineado no tiene red/broadcast propios | "132 direcciones; la mayor subred alineada que cabe es **172.16.0.128/25** (126 hosts); .124-.127 no se aprovechan" |
| B2 | `boletin-U03-avanzado-resuelto.md:132` (ex. 7b) | "140 direcciones (**138 hosts útiles en /24**)" (cifra sin sentido) | "140 direcciones; mayor alineada **192.168.1.128/25** (126 hosts); .116-.127 no alineados" |
| B3 | `boletin-U03-avanzado-resuelto.md:138` (ex. 8a) | "ping/**ARProbe**" (término inventado) | "ping o **ARP probe**" (RFC 5227) |
| B4 | `boletin-U03-avanzado-resuelto.md:146` (ex. 8b) | Contradicción: "si la impresora estática sigue **borrada del pool** verás la entrada en conflictos" (si estuviera excluida, no habría conflicto) | "sigue **dentro del rango sin excluir**" |
| B5 | `boletin-U03-avanzado.md:126-133` (ex. 9) | Enunciado mezclaba "el primer router (o el origen)" en un solo salto (Gigabit 1500 → WAN 1000) | Dos etapas explícitas: a) fragmentación en origen (1500), b) refragmentación en el router (1000); pista ampliada (múltiplo de 8 y offsets heredados) |
| B6 | `boletin-U03-avanzado-resuelto.md:156-172` (ex. 9) | Respondía **6 fragmentos** calculados directos a 976, ignorando el salto Gigabit | a) 4 fragmentos en origen (1480×3 + 560); b) **7 fragmentos** en el WAN con tabla (976/504, offsets 0, 122, 185, 307, 370, 492, 555) — suma verificada = 5000 B |
| B7 | `boletin-U03-ipv6-inicial-resuelto.md:15` (ex. 1d) | "la secuencia de ceros **más larga**" (aquí hay **empate**) | "empate: el :: se lleva la primera y la segunda queda `0:0`" |
| B8 | `boletin-U03-ipv6-inicial-resuelto.md:38` (ex. 4d) | "**Verdadero básicamente**" para "DHCPv6 funciona igual que DHCP en IPv4" | **Falso**: stateless/stateful, sin máscara y el **gateway lo da el RA** — coherente con el punto de DHCPv6 |
| B9 | `boletin-U03-ipv6-avanzado.md:78` (ex. 5) | Faltaba la pregunta del gateway (la referencia de `12-eui64:89` prometía que este boletín la cubría) | Nueva pregunta **e)** "¿De dónde saca el cliente el default gateway?" + pista (origen del RA) |
| B10 | `boletin-U03-ipv6-avanzado-resuelto.md` (ex. 5) | Respuesta que faltaba | **e)** LLA de origen del propio RA (no hace falta DHCPv6 para el gateway) |
| B11 | `boletin-U03-ipv6-avanzado.md:123` + `…-resuelto.md:104` (ex. 8) | "**La hacen** cualquier router intermedio" (cacografía) | "Los routers intermedios la hacen" |
| B12 | `boletin-U03-ipv6-avanzado-resuelto.md:85` (ex. 7b) | `ping -6 …%<id-interfaz>` a una **GUA** (la zona `%` solo aplica a link-local) | Sin `%<id-interfaz>` |
| B13 | `boletin-U03-packettracer.md:42` | "el rango lo viste en el punto 1 de la teoría de **esta UD**" | "de **esta unidad**" (la referencia al punto 1 es correcta: APIPA está en `01-estructura-ipv4`) |
| B14 | `boletin-U03-packettracer.md:58` | Ruta "*Config → IPv6 Configuration*" (PT no la tiene) | "*Desktop → IPv6 Configuration*" (igual que el punto 16) |
| B15 | `boletin-U03-packettracer-resuelto.md:96` | Comando inexistente `no ip service dhcp` | `no service dhcp` |
| B16 | `boletin-U03-packettracer-resuelto.md:120` | "**Mensión**" (typo en la cabecera de la tabla DORA) | "Mensaje" |
| B17 | `boletin-U03-packettracer-resuelto.md:159` | "*Config → IPv6*" | "*Desktop → IPv6 Configuration*" |

### ⚪ Dejar (revisado sin acción)

- **"Jamie Thain"** (`17-ipv8:35`): el borrador dice "Author: J. Thain, One Limited" y el datatracker lo indexa como *James Thain*, pero su dirección de autor publicada (p. ej. `draft-thain-zoneserver`) es "**Jamie Thain**, One Limited" → se mantiene. **Fechas verificadas** contra el borrador: 17 abril 2026 / expira 19 octubre 2026 ✓ y `-02` es la revisión vigente ✓.
- **Diagrama `u03-fragmentacion.svg`**: la etiqueta "Paquete IPv4 original = 4000 B" sigue sin matizar *payload* y su fallo `u03-frag-hdr` ya estaba en el baseline → **fuera de alcance** (pasada de diagramas); los `.md` ya hablan de payload. Anotado en §5.
- **Matemáticas de los 10 boletines**: verificadas 1 a 1 (inicial ex. 1-9; avanzado ex. 1-8; IPv6 ambos; PT). Todo cuadra salvo B1/B2/B6 corregidos.
- **Referencias cruzadas internas correctas**: `08-dhcp:40` (APIPA = inicial ex. 6), `08-dhcp:87` (conflicto = avanzado ex. 8), `03-clases:59` (sumarización = avanzado ex. 5).
- **RDNSS** (`ipv6-avanzado-resuelto` ex. 5c): extensión real (RFC 8106) — correcto.
- **Desequilibrio IPv6**: 8 de los 17 puntos (09-16). Es el peso curricular del RA2·d "IPv4/IPv6" y esta es la **única** unidad que cubre IPv6 → se mantiene (matriz: fila IPv6 cerrada con este veredicto).
- **Práctica de boletines**: soluciones en `<details>`, sin imágenes, sin números de unidad en títulos ✓.

## 3. Fronteras con otras unidades

| Concepto | Aparece en | Veredicto |
|---|---|---|
| Rutas estáticas | ⚡ Laboratorio, tarea 4 del cierre | ✅ reencuadrado como **referencia adelantada** ("el cómo en la unidad de enrutamiento estático"; aquí solo importa que el diseño funcione) — 1 sola mención, sin desarrollo |
| ACL / seguridad | ⚡ Laboratorio, fallo 2 (antes) | ✅ **sustituido**: el fallo 2 ahora es DHCP sin exclusiones (contenido propio); las ACL quedan para su unidad, que tendrá su laboratorio |
| NAT | `04-privadas` (motivo de RFC1918), `15` (NAT64/DNS64), cierre (FAQ/poscréditos) | ✅ puentes forward correctos; NAT64 ya no se llama "NAT inverso" (hallazgo 19) |
| Dual stack / túneles | `15` → boletín avanzado IPv6 | ✅ la promesa "lo verás en el cierre" se redirige al boletín, que sí lo cubre |
| Fragmentación / MTU | `01` (desarrollo) ← puente del punto 9 de Ethernet | ✅ regla de la sesión 02 cumplida en ambos lados |
| ARP | `02` (solo EtherType) → `01`/`02`/`10` de IP | ✅ cadena Ethernet → IP completa |
| DHCP | `08` + `13` (DHCPv6) = la casa del DORA, la config y las exclusiones; U10 servicios lo retoma | ✅ lado IP resuelto (matriz actualizada); cruce con servicios queda para la sesión 10 |
| DNS | Solo como opción DHCP, "máquina DNS" y **DNS64** (transición) | ✅ mención/tema propio; el servidor DNS va en servicios |
| OSPF | 4 menciones, todas forward ("lo verás en OSPF") | ✅ puente sin desarrollo |
| WiFi / 802.11 | No aparece | ✅ (check-uds restos 0) |

Sin candidatos a mover/quitar (🔴 resueltos: tarea 4 reencuadrada y fallo 2 sustituido, ambos en §2).

## 4. Boletines de la unidad

- Par `inicial` + `avanzado`, variante `ipv6` (inicial/avanzado) y variante `packettracer`, todos con `-resuelto` → **10 ficheros** ✅, sin imágenes ni diagramas ✅, sin números de unidad en títulos ✅.
- Nivel: inicial (binario/subredes básicas) → avanzado (VLSM, diagnóstico, fragmentación real) → IPv6 por separado → PT (práctica guiada). Sin inversión de dificultad aparente.
- Correcciones aplicadas: B1-B17 de §2. Las más graves: **B6** (el ex. 9 ignoraba el primer salto: 6 → 7 fragmentos con la tabla real), **B8** ("DHCPv6 = DHCPv4" se respondía como verdadero) y **B4** (contradicción sobre la tabla de conflictos).
- **Ex. 9 reescrito en paralelo** enunciado/resuelto con la misma estructura de dos etapas; offsets y suma (3 × 1480 + 560 = 5000) verificados.

## 5. Decisiones pendientes del profe 🔴

- [x] **Q1 — Diagrama de fragmentación**: ✅ **aplicado** — la etiqueta del paquete original ahora dice "Paquete IPv4 con 4000 B de payload (MTU del enlace = 1500 B)" y el texto `u03-frag-hdr` se parte en dos líneas para caber en la zona. `check:diagrams` → **54 fallos (nuevo baseline; el fallo `u03-frag-hdr` queda resuelto)**.
- [x] **Q2 — Tarea 4 del lab**: se mantiene la decisión de reencuadrar como referencia adelantada a enrutamiento estático (no se elimina).

## 6. Verificación y commit

- [x] `check:unidad 03` 0/0 · `check-uds` 0 · `check-links` 0 · build 183 · `check:diagrams` = **54 (nuevo baseline tras Q1; era 55)**
- [x] Comprobación lingüística es-ES (sin LatAM ni "UD" en prosa; números con formato es-ES)
- [x] DOCX regenerado (`npm run docx`): 68 generados, 0 fallos
- [ ] Commit `Revisión U03: …`
- [x] Matriz de solapamientos + README de estado actualizados
