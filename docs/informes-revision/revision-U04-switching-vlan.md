# Revisión de la unidad de Switching y VLAN

- **Unidad:** 04 · Switching y VLAN (`src/content/docs/04-switching.md` + `04-switching/01…10`)
- **Boletines:** `boletin-U04-inicial(-resuelto)` y `boletin-U04-avanzado(-resuelto)` (+ movimientos a `boletin-U08-avanzado`)
- **Fecha:** 2026-09-27
- **Alcance:** teoría (índice + 9 puntos + cierre), 4 boletines, tablas CE, fronteras con ACL y trunking

---

## 1. Auditoría inicial

| Comprobación | Resultado |
|---|---|
| `node scripts/check-unidad.mjs 04` | 0 fallos · **1 aviso F0** (`RA del índice (RA3/RA5) ≠ RA del cierre (RA5)`) |
| `node scripts/check-uds.mjs` | 0 (sin cambios desde la sesión 03) |
| `node scripts/check-links.mjs` | 0 |
| `npm run check:diagrams` | 55 (baseline) — la U04 no usa diagramas Excalidraw (solo esquemas ASCII) |
| `npx astro build` | 183 páginas (estado previo) |
| `npm run docx` | 68/68 (estado previo) |

---

## 2. Hallazgos y decisiones

### 🟡 Corregir ya — índice

| # | Ubicación | Hallazgo | Acción |
|---|---|---|---|
| 1 | `04-switching.md:14` | "La primera mitad del curso se cierra aquí" — con 12 unidades, la U04 no es la mitad (reliquia de la estructura antigua de 13 unidades) | → "Los fundamentos del switch se cierran aquí" |
| 2 | `04-switching.md:56` | "empezar siempre el resuelto para ver el estilo" — mala idea de estudio (mismo texto que ya se corrigió en las sesiones 02 y 03; queda en los otros 7 índices para sus sesiones) | → redacción canónica: "mira 1-2 resueltos para coger el formato, luego intenta el por-resolver; consulta el resuelto solo cuando te atasques" |
| 3 | `04-switching.md:67-73` | Tabla CE con fila-resumen de RA5 ("Segmentación y reducción de dominios") en vez de los CEs oficiales **RA5·a–f** que el cambio `openspec/expand-u07` mandaba declarar en el índice | → índice y cierre idénticos: `RA3`, `RA3·c)` + `RA5·a)…RA5·f)` (texto oficial conservado en el cierre) |

### 🟡 Corregir ya — F0: tablas CE índice ↔ cierre

- **Cierre (`10-cierre.md:217-228`):** encabezado `(RA5)` ≠ índice `(RA3/RA5)` → **ambos `(RA3/RA5)`** (patrón del resto del repo).
- **Refs obsoletos en la columna "Cubierto":** "puntos 1-2", "puntos 2 y 8", "puntos 3 y 8", "punto 6" pertenecen a la numeración de la **antigua U07-VLANs** (git `aeeb85e`), anterior a la reestructuración 13→12 unidades; hoy los puntos 2/3/6 son aprendizaje MAC/dominios/estados STP → **remapeados a la estructura actual** (VLAN = punto 8, tipos/nativa = punto 9, todo el juego = punto 10).
- Se conserva la línea en negrita con el texto oficial de RA5 y las letras a–f; RA3 y RA3·c) quedan como filas simples (no hay texto oficial de RA3 en el repo — mismo criterio que el RA6 de la sesión 03).

### 🟡 Corregir ya — teoría

| # | Ubicación | Hallazgo | Acción |
|---|---|---|---|
| 4 | `02:65` | "La entrada `FFFF.FFFF.FFFF` apuntando a la CPU es la del broadcast" — el broadcast **no se aprende** en la tabla MAC (se inunda por definición); la afirmación lleva a un alumno a buscar una entrada que no existe | → el broadcast no aparece en la tabla; solo las multicast de control destinadas al propio switch aparecen como `CPU` |
| 5 | `02:84` | "la Port Security del [punto 8]" — "punto 8" es el **número de unidad** en prosa y el texto del enlace no nombra la unidad | → "del [punto 5 de ACL y seguridad](/ApuntesRedes/08-acl-seguridad/05-port-security)" |
| 6 | `03:79` | Auto-referencia: "[unidad de switching](/ApuntesRedes/04-switching/08-que-es-una-vlan)" dentro de la propia unidad de switching | → enlazar [trunking e inter-VLAN](/ApuntesRedes/05-trunking-inter-vlan/04-switch-capa3) (ahí están las SVI) |
| 7 | `05:16` | "(punto 4)" sin enlace | → enlazar al punto de la tormenta |
| 8 | `07:36` | "Edge port (no aprende switches)" — incomprensible tal cual | → "conectado solo a extremos finales (nunca a otro switch)" |
| 9 | `07:71` | "Lo vemos de nuevo en el [punto 8]" — ídem nº de unidad en prosa; además errdisable recovery vive en el punto 5 de ACL (verificado) | → "en el [punto 5 de ACL y seguridad](…)" |
| 10 | `08:30` | "La tabla de ventajas que presentó la unidad anterior" — la unidad de dirección IP **no** presenta ninguna tabla de ventajas de segmentación (grep: solo existe en este fichero) | → eliminar la cláusula falsa |
| 11 | `08:85` | "la verás en el punto 3 de trunks" — en la U05 el punto 3 es inter-VLAN routing; la native está en el punto 1 | → enlace a [trunking e inter-VLAN (punto 1)](/ApuntesRedes/05-trunking-inter-vlan/01-trunks-y-8021q) |
| 12 | `08:96` | "el [punto 2](/ApuntesRedes/04-switching/08-que-es-una-vlan) la desarrolla" — auto-enlace al propio punto y número incorrecto | → "[punto 9](/ApuntesRedes/04-switching/09-tipos-de-vlan)" |
| 13 | `08:120` | "(lo verás en los puntos 4 y 5)" — puntos 4-5 propios = tormenta/STP; el enrutamiento inter-VLAN está en la U05 | → enlace a [trunking e inter-VLAN (punto 3)](/ApuntesRedes/05-trunking-inter-vlan/03-inter-vlan-routing) |
| 14 | `08` (nuevo) | **Gap de laboratorio:** el ⚡ Laboratorio de la U04 pide crear VLANs y los boletines piden comandos, pero ningún punto enseña `vlan 10` / `switchport access vlan` (solo una cita de pasada en 08:105); la config completa llega en la U05, que se lee *después* | → nuevo bloque "🛠️ Crear una VLAN en tres líneas" en el punto 8 (creación + asignación + `show vlan brief`) |
| 15 | `09:16` | "En el punto 1 viste el concepto y la motivación" — el concepto es el punto 8 | → "En el punto 8" |
| 16 | `09:37` | "(punto 3)" — apunta al punto de dominios propio; el detalle de 802.1Q/native está en la U05 | → enlace a [trunking e inter-VLAN (punto 1)](…) |
| 17 | `09:84` | Typo: "siempre que **ataques** SSH/SNMP" | → "siempre que **actives** SSH/SNMP" |
| 18 | `10-cierre:88` | "el orden de diagnóstico del punto 8" — ese orden (`show vlan brief` → `show interfaces trunk` → `show ip interface brief`) está en **U05 punto 2** (verificado, `02-configuracion-y-verificacion:191`); el punto 8 propio es el de VLANs | → enlace correcto |
| 19 | `10-cierre:109,111,115,124` | `show interface trunk` (singular) — inconsistente con `show interfaces trunk` (plural) usado en 185, 197 y 226; la forma documentada es el plural | → unificar a `show interfaces trunk` (4 sitios) |
| 20 | `10-cierre:142` | "(punto 3)" para `allowed vlan` — el comando se enseña en la U05 | → enlace a [trunking e inter-VLAN (punto 1)](/ApuntesRedes/05-trunking-inter-vlan/01-trunks-y-8021q) |
| 21 | `10-cierre:144` | "(punto 4 y 5)" para router-on-a-stick vs switch L3 — en la U05 son los puntos 3 y 4 | → "en [trunking e inter-VLAN](/ApuntesRedes/05-trunking-inter-vlan/03-inter-vlan-routing), puntos 3 y 4" |
| 22 | `10-cierre:201` | "(punto 7)" para el hardening de VLAN 1 — el punto 7 propio es RSTP/PortFast; la seguridad de VLANs está en la U05 | → enlace a [trunking e inter-VLAN (punto 6)](/ApuntesRedes/05-trunking-inter-vlan/06-seguridad-en-vlans) |
| 23 | `10-cierre:106` | "subinterfaces (VLAN10 y VLAN20)" | → "VLAN 10 y VLAN 20" |
| 24 | `10-cierre:141` | "**Dato contexto:**" | → "**Dato de contexto:**" |
| 25 | `10-cierre:153-171` | Crucigrama con longitudes que no cuadran: H5 "(4+3 letras)" vs CAPA3 (5), H8 "(6 letras)" vs SWITCHPORT (11), V3 "(4+2+4 letras)" vs ROUTER-ON-A-STICK | → corregir las tres pistas de longitud |

### ⚪ Dejar (revisado, sin cambio)

- `01`, `04`, `06` — sin errores; tiempos de STP (20+15+15 = 30-50 s), costes IEEE (100/19/4/2) y ejemplos de Bridge ID verificados.
- `05:91` — "el criterio… que pide el RA3 (CE j)": referencia al orden de evaluación; misma convención (letra de CE) que el "(CE e)" de NAT. ⚪.
- `10-cierre:16-31` — "Eres un frame Ethernet" en ⭐ Sé el Paquete: mismo tono rol-play que el "Eres la dirección IP…" de la sesión 03. ⚪.
- `10-cierre:35-53` — Fireside estática vs dinámica coherente con el 90% del mundo real que afirman el punto 9 y el propio cierre.
- Sin números de unidad en prosa (grep limpio); enlaces `boletin-u04-…` exentos.

---

## 3. Boletines

### Hallazgos

| Fichero | Hallazgo | Acción |
|---|---|---|
| inicial + resuelto | **ex5**: `switchport port-security` — concepto cuya casa es ACL (punto 5); el inicial no debe evaluarlo | → sustituir por `switchport access vlan 10` (añade VLAN al inicial, que hoy no tiene ni una pregunta) |
| inicial + resuelto | El inicial no toca **ningún** tema de VLAN siendo "Boletín de Switching y VLAN" | → añadir ex2·f) "cada VLAN es un dominio de broadcast propio" (+ resuelto) |
| inicial / avanzado (+ resueltos) | Descripciones "de Switching y STP" | → "..., STP y VLAN" |
| avanzado + resuelto | **ex1**: port-security (ACL) y trunk (U05) en el primer ejercicio | → reescribir: hostname, VLAN de gestión 999 + SVI, VLANs 10/20 en puertos, verificación con `show vlan brief` |
| avanzado + resuelto → **U08** | **ex3** (diagnóstico de port security) y **ex8** (laboratorio con sticky/aging/errdisable) — 2,5 ejercicios de 8 son de Port Security, contenido del punto 5 de ACL; la U04 solo la menciona como punta (`02:84`) | → **mover** a `boletin-U08-avanzado` como ex8 y ex9 (el mini-caso final pasa a ex10) + resueltos; allí completan el ex7 actual (que no cubre diagnóstico, recuperación de errdisable ni aging) |
| avanzado + resuelto | Hueco al quitar ex3/ex8: el avanzado debe mantener ≥8 ejercicios | → **ex3 nuevo**: diagnóstico de VLAN (puerto sin asignar → `show vlan brief` → DHCP); **ex8 nuevo**: laboratorio de segmentación en un switch (crear/asignar/verificar/aislar) |
| avanzado + resuelto | **ex4**: "2 enlaces redundantes entre cada par" — topología ambigua y resuelto no determinista ("aproximadamente 3", "depende") | → especificar: anillo SW1–SW2–SW3–SW4–SW1 + enlace extra SW1–SW3; respuesta fija: 2 puertos bloqueados (5 enlaces − (n−1)) |
| avanzado + resuelto | **ex5**: título en inglés "CAM table analysis"; fila `FFFF.FFFF.FFFF STATIC CPU` (mismo error que el hallazgo 4) | → "Análisis de la tabla CAM"; quitar la fila y convertir c) en "¿Aparece FFFF.FFFF.FFFF? ¿Por qué?" |
| avanzado-resuelto | **ex2d**: "todos los puertos pasan por blocking → listening…" — en una reelección no todos atraviesan blocking | → "listening y learning antes de reenviar…; ~30-50 s STP, ~1-3 s RSTP" |
| avanzado-resuelto | **ex6**: caminos etiquetados "A → C" cuando el sujeto del ejercicio es C | → reetiquetar "C → A directo (Fa0/3)" y "C → B → A (Fa0/2 → Fa0/1)" |

### Frontera Port Security — veredicto

- **Casa del concepto:** ACL y seguridad básica (punto 5, con `errdisable recovery` y modos de violación verificados).
- **Switching:** solo mención-puente en `02:84` (defensa del CAM flooding) → ✅ legítima.
- **Boletines:** duplicidad resuelta **moviendo** los dos ejercicios a U08 (no se duplica; U08-avanzado pasa de 8 a 10 ejercicios, ≥8 ✓).

---

## 4. Fronteras con otras unidades

| Frontera | Decisión |
|---|---|
| **VLAN ↔ trunking (U05)** | Switching = casa del **concepto** (índice + puntos 8-9 + laboratorio de segmentación); trunking = 802.1Q, configuración de trunks, VTP/DTP y seguridad. Los CEs RA5·d/e/f se cubren en la U04 solo por su parte de juegos/laboratorio; el desarrollo vive en U05 (su tabla CE se alineará en la sesión 05) |
| **Port Security ↔ ACL** | ✅ resuelto (arriba): concepto y boletines = ACL; switching solo punta |
| **DHCP** | `08:73` "Puente al DHCP" (DISCOVER no cruza VLANs → pool por VLAN o relay) = puente legítimo hacia U05/U10; sin desarrollo |
| **Diagnóstico VLAN** | El orden `show vlan brief` → `show interfaces trunk` → `show ip interface brief` es de **U05 punto 2**; la U04 solo lo cita (hallazgo 18) |
| **Matriz** | Filas **Port Security** y **VLAN** (reparto switching↔trunking) cerradas con esta sesión; fila DHCP con nota de puente |

---

## 5. Pendientes fuera del alcance

- ~~Los otros 7 índices con "empezar siempre el resuelto" (U05–U12) → sus sesiones.~~ → cerrados en sus sesiones (temario completo auditado).
- ~~Tablas CE de la U05 (RA3/RA4/RA5 sin letras oficiales) → sesión 05.~~ → resuelto en la sesión 05 (letras oficiales verificadas).
- ~~Diagramas: baseline 55 fallos → pasada transversal.~~ → hecho: `check:diagrams` = **0** (54 → 0, nuevo baseline).
- Crucigrama: se corrigen longitudes, pero no hay rejilla visible en el Markdown (solo pistas).

---

## 6. Verificación final

- [x] `node scripts/check-unidad.mjs 04` → 0 fallos **y 0 avisos** (F0 resuelto)
- [x] `node scripts/check-uds.mjs` → 0
- [x] `node scripts/check-links.mjs` → 0
- [x] `npm run check:diagrams` → 55 (baseline)
- [x] `npx astro build` → 183 páginas
- [x] `npm run docx` → 68/68
