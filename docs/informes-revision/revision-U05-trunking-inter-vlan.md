# Revisión de la unidad de Trunking e inter-VLAN

- **Unidad:** 05 · Trunking e inter-VLAN (`src/content/docs/05-trunking-inter-vlan.md` + `05-trunking-inter-vlan/01…08`)
- **Boletines:** `boletin-U05-inicial(-resuelto)` y `boletin-U05-avanzado(-resuelto)`
- **Fecha:** 2026-09-27
- **Alcance:** teoría (índice + 7 puntos + cierre), 4 boletines, tablas CE, fronteras con switching, DHCP/servicios y ACL

---

## 1. Auditoría inicial

| Comprobación | Resultado |
|---|---|
| `node scripts/check-unidad.mjs 05` | **0 fallos · 0 avisos** (headers `RA3/RA4/RA5` ya coinciden; las filas CE, que el checker no compara, sí estaban desalineadas — ver hallazgo 3) |
| `node scripts/check-uds.mjs` | 0 |
| `node scripts/check-links.mjs` | 0 |
| `npm run check:diagrams` | 55 (baseline) — la U05 no usa diagramas Excalidraw (solo esquemas ASCII) |
| `npx astro build` | 183 páginas (estado previo) |
| `npm run docx` | 68/68 (estado previo) |

---

## 2. Hallazgos y decisiones

### 🟡 Corregir ya — índice

| # | Ubicación | Hallazgo | Acción |
|---|---|---|---|
| 1 | `05-trunking-inter-vlan.md:53` | "empezar siempre el resuelto para ver el estilo" — mala idea de estudio (mismo texto que se corrigió en las sesiones 01-04; queda en los otros 7 índices para sus sesiones) | → redacción canónica: "mira 1-2 resueltos para coger el formato, luego intenta el por-resolver; consulta el resuelto solo cuando te atasques" |
| 2 | `05-trunking-inter-vlan.md:66-70` | Tabla CE con 3 filas planas: RA4 "Encaminamiento entre redes" **no es un texto oficial de CE** y RA5 va sin letras (`expand-u07` manda declarar **RA5·a–f**; `RA4·d) Comandos de configuración` ya se usa en las unidades de dirección IP y enrutamiento) | → índice y cierre idénticos: `RA3` (texto propio, sin letras — RA3 no tiene letras en el repo) + `RA4·d)` + `RA5·c)…RA5·f)` |

### 🟡 Corregir ya — tablas CE índice ↔ cierre

- **Cierre (`08-cierre.md:217-223`):** los headers ya coinciden `(RA3/RA4/RA5)` (por eso el checker da 0 avisos), pero **las filas no**: RA3 sin el "(enlaces y segmentación)" y sin el punto 5 en la cobertura; RA4 "Enrutamiento entre redes" ≠ "Encaminamiento entre redes"; RA5 "Segmentación y aislamiento de tráfico" ≠ "Segmentación lógica y aislamiento" y coberturas distintas (punto 3 vs 5) → **filas carácter a carácter iguales en ambos** (patrón de la sesión 04).
- El cierre gana las líneas en negrita con los textos oficiales de **RA4** (de `expand-u08`/U06/U08) y **RA5** (de `expand-u07`); RA3 se queda sin línea en negrita (mismo criterio que en la U04: no hay texto oficial de RA3 en el repo).
- Cobertura reasignada por letra según el contenido real: `RA5·c` = punto 2 (verificación) + laboratorio; `RA5·d` = enlaces (puntos 1-2, 6) + CONRAD + entrevista; `RA5·e` = puntos 3-4 + ⭐ + ¿Quién Soy?; `RA5·f` = punto 5 + ¿Quién Soy?. Se aprovecha para dar al punto 2 el peso en diagnóstico que antes solo tenía en RA3.
- Nota: el pendiente de la U04 ("tablas CE de la U05 sin letras oficiales") queda **resuelto**: las letras oficiales sí existen (RA5·a–f en `openspec/changes/expand-u07`, RA4·d en `expand-u08` y en los índices de dirección IP y enrutamiento).

### 🟡 Corregir ya — teoría (numeración antigua de la U07)

La unidad se reordenó (VLANs → switching; aquí 7 teoría + cierre) y quedaron referencias a la antigua estructura de 9 puntos:

| # | Ubicación | Hallazgo | Acción |
|---|---|---|---|
| 3 | `01:63` | "(punto 4)" para el enlace switch–router — en la estructura actual ese rol lo juega el punto 3 (inter-VLAN routing) | → "[punto 3](/ApuntesRedes/05-trunking-inter-vlan/03-inter-vlan-routing)" |
| 4 | `01:114` | `show interface trunk` (singular) — la forma documentada en la propia unidad es el plural | → `show interfaces trunk` |
| 5 | `01:141` | Respuesta del mini-chequeo malformada: "**TCI** (…VLAN ID 12 bits), 802.1p) y **VLAN ID** (12 bits)" — paréntesis huérfano y campo duplicado | → "TPID (2 bytes, 0x8100) y TCI (2 bytes: PRI 3 bits + CFI 1 bit + VLAN ID 12 bits)" |
| 6 | `01:151` | Resumen: "4 bytes (TPID + PRI + VLAN ID)" — la etiqueta es TPID + TCI | → "(TPID + TCI)" |
| 7 | `02:14` | `show interface trunk` singular en la cita de verificación | → plural |
| 8 | `02:16` | "Este punto es el punto 8 porque condensa todo lo anterior… VLANs (puntos 1-2), trunks (3), router (4) y hardening (7)… base del Laboratorio del punto 9" — numeración de la antigua U07 (9 puntos; aquí el punto 2 no puede condensar "lo anterior") | → reescribir: el montaje estrella (VLANs de switching, trunk del punto 1, router-on-a-stick y native/allowed) y base del laboratorio del **punto 8** |
| 9 | `02:87` y `02:167` | "Laboratorio del punto 9" (×2) | → "punto 8" |
| 10 | `02:89` | `show interface trunk` singular | → plural |
| 11 | `02:115` | `switchport trunk native vlan 99` en Fa0/23 (enlace al router) sin ninguna contraparte en el router (las subinterfaces dot1Q no declaran native) — el ejemplo enseña native a un solo lado, justo lo contrario de la lección del propio punto ("la native debe coincidir en los dos extremos") | → quitar esa línea; el trunk Switch1↔Switch2 (Fa0/24) ya enseña `native vlan 99` con ambos extremos |
| 12 | `02:167` | (ya cubierto en el hallazgo 9) | — |
| 13 | `03:16` | "En los puntos 1 y 3 conseguiste **aislar** el tráfico" — la segmentación se aprendió en switching; los puntos 1-3 propios son trunks/config/inter-VLAN | → "En la unidad de switching conseguiste aislar el tráfico" |
| 14 | `03:61` | "el switch de capa 3 del punto 5" — el switch de capa 3 es el punto 4 | → enlace al [punto 4](/ApuntesRedes/05-trunking-inter-vlan/04-switch-capa3) |
| 15 | `04:16` | "En el punto 4 el router-on-a-stick hacía todo el trabajo" — este fichero **es** el punto 4; el router-on-a-stick es el punto 3 | → enlace al [punto 3](…) |
| 16 | `04:31` | "el cuello de botella del punto 4" — ídem | → "el cuello de botella del router-on-a-stick" (sin número) |
| 17 | `04:102` | "Este truco lo verás también en el punto 8" — promesa **falsa**: el cierre no trata la SVI de gestión; además el objetivo y el mapa del índice prometen "VLAN de gestión" y el punto 6 no la desarrolla | → apuntar a la checklist del punto 6 **y** añadir la fila de gestión a la checklist (hallazgo 20) |
| 18 | `05:16` | "En los puntos 3 y 4 te creaste las VLANs a mano" — crear VLANs es switching y el paso 1 del punto anterior | → "Ya te creaste las VLANs a mano en cada switch (unidad de switching y punto anterior)" |
| 19 | `05:77` | "(punto 7)" para el VLAN hopping — es el punto 6 | → enlace al [punto 6](/ApuntesRedes/05-trunking-inter-vlan/06-seguridad-en-vlans) |
| 20 | `06` (nuevo) | **Gap:** índice (objetivo y mapa) y `04-switch-capa3:102` prometen la **VLAN de gestión**, pero la checklist de hardening del punto 6 (8 filas) no la incluye | → fila 9 de la checklist: VLAN de gestión dedicada (`interface vlan 999` + `ip default-gateway`) y resumen "8 pasos" → "9 pasos" |
| 21 | `06:93` | "el hardening del punto 3 (cambiar la native)" — numeración antigua | → "la checklist de abajo" |
| 22 | `05:111` | Respuesta con una frase entera dentro de backticks (`propaga la base de datos…`) | → negrita |
| 23 | `08-cierre:102` | Typo "router/**SVL**" | → "SVI" |
| 24 | `08-cierre:201` | "Buen diseño no apila…" (mayúscula en mitad de frase) | → "buen diseño" |
| 25 | `08-cierre` (lab, paso 2) | Base del laboratorio con "trunk … con native 99" hacia el router sin native 99 en el router: el estado inicial ya arrancaría con native VLAN mismatch (CDP) en vez de "todo correcto", y el fallo B (native 55 solo en el switch de acceso) quedaría enmascarado | → base con **native por defecto en ambos extremos**; el fallo B entonces enfrenta 55 vs 1 y se detecta limpio con `show interfaces trunk` |

### ⚪ Dejar (revisado, sin cambio)

- `07-dhcp-por-vlan` — **limpio**: enlaces a puntos 3 y 4 correctos, puentes a dirección IP (`08-dhcp`) y a servicios verificados, DORA/relay/APIPA/diagnóstico correctos.
- `08-cierre` — juegos completos y sin números de unidad en prosa: ⭐ (SVIs), Fireside (RoAS vs L3), 4 ¿Quién Soy?, CONRAD (native a medias), laboratorio con 3 fallos + extra ISL, 4 Atrévete, crucigrama, 5 entrevistas, 3 FAQ, Poscréditos con PRÓXIMAMENTE correcto.
- Crucigrama H7 "MODETRUNK" (modo estático `switchport mode trunk`) — aceptable como "modo que fuerza trunk sin negociar".
- `01:24-34` — el esquema ASCII de la etiqueta simplifica TCI (PRI + VLAN ID sin CFI); la tabla de debajo lo detalla completo. ⚪.
- Fronteras entrantes verificadas: enlaces de la U04 a los puntos 2/3/6/7 de esta unidad, de dirección IP, servicios (`03-dhcp-cisco` cita las SVIs), inalámbricas e introducción — todos apuntan al punto correcto.

---

## 3. Boletines

### Hallazgos

| Fichero | Hallazgo | Acción |
|---|---|---|
| inicial + resuelto | Sin hallazgos: enunciados y soluciones correctos (VLAN ID 12 bits → 4094, 4 bytes, `show ip interface brief` para subinterfaces) | ⚪ |
| avanzado | **ex2 pista**: `show interface trunk` singular | → plural |
| avanzado + resuelto | **ex7a**: pide **3 vectores** de VLAN hopping; la unidad dice "los dos vectores principales" (DTP + double tagging) y el tercero del resuelto ("tráfico mislabeled / native vulnerable") es una condición, no un vector de ataque | → **2 vectores** en el enunciado, la pista y el resuelto |
| avanzado-resuelto | **ex1**: configura `native vlan 99` en Fa0/23 (enlace al router) sin contraparte en el router — mismo error de asimetría que el hallazgo 11; el trunk Fa0/24 entre switches sí es simétrico (Switch1 y Switch2 con 99) | → quitar la línea de Fa0/23; el resto (allowed 10,20, subinterfaces, Switch2 "similar") es correcto |
| avanzado-resuelto | ex3d (ACLs de Dirección) con "más adelante" — puente legítimo a ACL; ex9 pools "en el switch capa 3" coherentes con el punto 7 | ⚪ |

---

## 4. Fronteras con otras unidades

| Frontera | Decisión |
|---|---|
| **VLAN ↔ trunking** | ✅ ya cerrada en la sesión 04: aquí vive 802.1Q, configuración de trunks, VTP/DTP y seguridad; el concepto y la creación mínima se quedan en switching (el punto 2 repite `vlan 10` como montaje, no como teoría — recordatorio legítimo) |
| **DHCP (fila de la matriz)** | Lado trunking cerrado con esta sesión: `07-dhcp-por-vlan` = pools por VLAN + relay en el escenario con VLANs; el lado IP (DORA, exclusiones, DHCPv6) ya estaba cerrado en la sesión 03; **queda solo la sesión 10** (servidor DHCP: `10-servicios-red/03-dhcp-cisco` ya enlaza este punto correctamente) |
| **ACL** | ex3d del avanzado apunta ACLs de router "más adelante" y el punto 6 usa VACL — mención/puente legítimos; sin desarrollo aquí |
| **Port Security** | cerrada en la sesión 04; sin apariciones en esta unidad |
| **Matriz** | Fila **DHCP** actualizada (lado trunking cerrado); Estado: sesión 05 anotada |

---

## 5. Pendientes fuera del alcance

- ~~Los otros 7 índices con "empezar siempre el resuelto" (U06–U12) → sus sesiones.~~ → cerrados en sus sesiones (temario completo auditado).
- ~~Tablas CE de U06–U12 (baldosas planas o letras sin alinear) → sus sesiones.~~ → cerradas en sus sesiones + pasada de decisiones.
- ~~Diagramas: baseline 55 fallos → pasada transversal.~~ → hecho: `check:diagrams` = **0** (54 → 0, nuevo baseline).
- ~~Cierre transversal: recontar duplicados DHCP/trunking tras la sesión 10.~~ → hecho: recuento final sin duplicados (fila DHCP de la matriz).

---

## 6. Verificación final

- [x] `node scripts/check-unidad.mjs 05` → 0 fallos **y 0 avisos**
- [x] `node scripts/check-uds.mjs` → 0
- [x] `node scripts/check-links.mjs` → 0
- [x] `npm run check:diagrams` → 55 (baseline)
- [x] `npx astro build` → 183 páginas
- [x] `npm run docx` → 68/68
