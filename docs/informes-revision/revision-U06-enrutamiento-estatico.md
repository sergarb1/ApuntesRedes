# Revisión de la unidad de Enrutamiento estático

- **Unidad:** 06 · Enrutamiento estático (`src/content/docs/06-enrutamiento-estatico.md` + `06-enrutamiento-estatico/01…06`)
- **Boletines:** `boletin-U06-inicial(-resuelto)` y `boletin-U06-avanzado(-resuelto)`
- **Fecha:** 2026-09-27
- **Alcance:** teoría (índice + 5 puntos + cierre), 4 boletines, tablas CE, fronteras con OSPF, ACL y alta disponibilidad

---

## 1. Auditoría inicial

| Comprobación | Resultado |
|---|---|
| `node scripts/check-unidad.mjs 06` | **0 fallos · 0 avisos** (headers `RA4` coinciden; las filas CE, que el checker no compara, sí estaban desalineadas — ver hallazgo 4) |
| `node scripts/check-uds.mjs` | 0 |
| `node scripts/check-links.mjs` | 0 |
| `npm run check:diagrams` | 55 (baseline) — la U06 no usa diagramas Excalidraw (solo esquemas ASCII) |
| `npx astro build` | 183 páginas (estado previo) |
| `npm run docx` | 68/68 (estado previo) |

**Lectura completa:** índice, puntos 01-06, 4 boletines y fronteras entrantes (OSPF, ACL, alta disponibilidad, trunking). Unidad sólida: plantilla correcta, secciones obligatorias todas presentes, sin números de unidad en prosa y sin puentes competidores. Los problemas son de **contenido** (una ruta que se apunta a sí mismo, un laboratorio con una red sin definir y defaults que enmascaran los fallos), de **tres erratas claras** y del **desalineado de la tabla CE**.

---

## 2. Hallazgos y decisiones

### 🟡 Corregir ya — índice

| # | Ubicación | Hallazgo | Acción |
|---|---|---|---|
| 1 | `06-enrutamiento-estatico.md:50` | "empezar siempre el resuelto para ver el estilo" — redacción no canónica (en U02/U04/U05 ya se cambió) | → "mira 1-2 resueltos para coger el formato, luego intenta el por-resolver; consulta el resuelto solo cuando te atasques" |
| 2 | `06-enrutamiento-estatico.md:29` | Objetivo: "Verificar **y depurar** el enrutamiento con `show ip route`…" — la unidad no enseña ningún `debug` | → "Verificar el enrutamiento con `show ip route`, `show ip interface brief` y `traceroute`" |
| 3 | `06-enrutamiento-estatico.md:24-25` | Objetivos por delante del contenido: el CE a) promete "LEDs y componentes" pero el punto 1 solo menciona los LEDs de pasada en la introducción, y se promete acceso por **auxiliar (AUX)** que ningún punto menciona (Telnet sí queda cubierto en el VTY del punto 2) | → objetivo con "sus LEDs"; mini-sección de LEDs en el punto 1; mención del puerto AUX en el punto 2 |

### 🟡 Corregir ya — tablas CE índice ↔ cierre

| # | Ubicación | Hallazgo | Acción |
|---|---|---|---|
| 4 | `06.md:67-71` ↔ `06-cierre:222-226` | Filas desalineadas (patrón de las sesiones 04/05; el checker solo compara los paréntesis del header): a) "LEDs y componentes" vs "Componentes y LEDs"; d) cobertura "Puntos 2-3" vs "Punto 2"; f) "Atrévete a pensar" vs "Atrévete" | → filas carácter a carácter iguales salvo la última columna: a) **Componentes y LEDs del router**; d) **✅ Puntos 2-3 + ⚡ Laboratorio (punto 6)** (el `ip route` es punto 3); f) **✅ Puntos 3-5 + 🧠 Atrévete a pensar (punto 6)**. `RA4` no tiene línea de texto oficial en el repo para estas letras (el bold ya está en ambos) |

### 🟡 Corregir ya — teoría

| # | Ubicación | Hallazgo | Acción |
|---|---|---|---|
| 5 | `02:43-71` | Bloque "configuración mínima" con `transport input ssh` pero **sin** `ip domain-name`, `crypto key generate rsa` ni usuario: copiado tal cual, el acceso remoto queda **muerto** (ni SSH arranca ni Telnet está permitido). Además `08-acl-seguridad:64` da por cubierto aquí el **banner**, que no aparece | → completar el bloque (usuario + `login local`, `ip domain-name`, `crypto key generate rsa`, `banner motd`) con sus bullets; así la afirmación de la unidad de ACL queda verdadera |
| 6 | `02:75` | "`enable password`, que viaja en claro" — no viaja: se guarda en claro (o casi) en la configuración | → "que se guarda casi en claro en la configuración" |
| 7 | `02:80` | "Las rutas `ip route` ya las configuré para adelantar el punto 3 — no corras todavía" ambiguo (¿"no corras"?) | → "las retomaremos en el punto 3; ahora solo míralas" |
| 8 | `02:139` | "**Adminstrativamente** abajo" (typo) | → "Administrativamente" |
| 9 | `03:74-75` | 🔴 **Error de contenido:** la ruta por defecto de R2 ("hacia el ISP, usando interfaz de salida") es `ip route 0.0.0.0 0.0.0.0 10.0.0.2` — `10.0.0.2` es **la IP propia de R2** en el enlace: R2 se apunta a sí mismo y, además, el comentario dice "interfaz de salida" mientras el comando usa next-hop | → `ip route 0.0.0.0 0.0.0.0 <next-hop del ISP>` con comentario acorde (p. ej. `203.0.113.1`) |
| 10 | `03:39` | "La topología **pomo** de la unidad" — coloquialismo regional muy marcado para un texto de FP | → "La topología de cabecera de la unidad" |
| 11 | `03:107` | En el `show ip route` de ejemplo hay una línea duplicada sin código (`192.168.1.0/24 is directly connected…`) además de la `C` de la línea siguiente | → eliminar la línea duplicada |
| 12 | `04:54` | "**cuánto** menor, más fiable" — correlativo, sin interrogativo | → "cuanto menor, más fiable" |
| 13 | `04:81` | "`show ip route static` → Ver **ambas**, marcadas como candidate": la flotante **no está en la tabla** (no instalada); solo aparece la primaria | → "Ver las rutas estáticas instaladas (la de respaldo no aparece hasta que falle la primaria)" |
| 14 | `04:99` | "La de AD=5 queda **instalada** 'en frío'" — contradice el resto (no está instalada) | → "queda en espera" |
| 15 | `05:39` | 🔴 "La frase del ⭐ Sé el Router **del primer borrador de esta unidad**…" — fuga de metadatos de edición en contenido de alumno | → "La frase del ⭐ Sé el Router de cierre sigue siendo cierta" |
| 16 | `05:67-70` | `show ip route 192.168.1.66` **con dos rutas**: en IOS esa orden muestra la ruta ganadora, no todas las candidatas | → plantearlo como fragmento de `show ip route` (sin argumento) con las dos entradas |
| 17 | `05:76-80` | La tabla de jerarquía usa `/28` (.16-.31) mientras el ejemplo de arriba trabaja con `/26` (.64-.127, destino `.66`) — dos escalas distintas en el mismo epígrafe | → armonizar la tabla al ejemplo del `/26` |

### 🟡 Corregir ya — cierre

| # | Ubicación | Hallazgo | Acción |
|---|---|---|---|
| 18 | `06-cierre:41` | "**publication** la alternativa en segundos" — palabra en inglés metida en mitad de una frase en español | → "publico la alternativa en segundos" |
| 19 | `06-cierre:51` | "dina**mica** dentro" (sin tilde) | → "dinámica" |
| 20 | `06-cierre:81` | "tu paquete es **unOne-Way** a la nada" (palabra pegada + anglicismo) | → "tu paquete se convierte en un viaje de ida sin vuelta" |
| 21 | `06-cierre:96-104` | 🔴 **Laboratorio con la "red B" sin definir:** el diagrama etiqueta `(red A)(red B)(red C)` y las instrucciones mandan rutas "a la red B" (R1 y R3), pero la lista de redes solo define A y los /30 — B (la LAN de R2) no existe en ningún sitio; los /30 tampoco tienen IPs asignadas | → definir B (192.168.2.0/24, la LAN de R2) y asignar los /30 (R1 `.1`/R2 `.2`; R2 `.1`/R3 `.2`) en la línea de redes |
| 22 | `06-cierre:104` | 🔴 **El paso 3 enmascara los fallos:** "Ruta por defecto en R1 y R3 hacia el centro" en el montaje inicial hace que el fallo A (R3 sin ruta a A) y el fallo C (R1 sin ruta a C) **se curan solos** vía la default → el reto de diagnóstico no tiene síntoma | → sacar la default del montaje inicial (3 pasos) y dejarla como **extra posterior** al diagnóstico, aprovechando para ligarlo al longest prefix |
| 23 | `06-cierre:110` + pista 3 | 🔴 **Fallo C roto en dos sitios:** `172.16.23.3` es la **dirección de broadcast** de `172.16.23.0/30` (solo `.1` y `.2` son usables), y la orden "**añade**" una segunda ruta a la red C junto a la buena: como la nueva no se instala (next-hop no alcanzable), la vieja sigue mandando → **sin síntoma** | → "sustituye" (borra la buena con `no`), next-hop `172.16.23.2` (IP de R3 con el /30 ya asignado) y pista ajustada: la ruta **ni se instala** — coherente con el V/F del boletín inicial ("escrita en la config pero no en la tabla") |

### 🟡 Corregir ya — boletines

| # | Ubicación | Hallazgo | Acción |
|---|---|---|---|
| 24 | `boletin-U06-inicial-resuelto.md:52` | "Sin el `via`: en IOS el next-hop se escribe tal cual al final del comando" — frase ilegible | → "En `show ip route` aparece con `via 10.0.0.2`, pero al configurar no hay ninguna palabra clave: el next-hop va tal cual al final del comando" |
| 25 | `boletin-U06-inicial-resuelto.md:61` | "mira `show ip interface brief` **(punto 3)**" — un boletín no tiene puntos (y `show ip interface brief` es el punto 2) | → "(paso 3)" |
| 26 | `boletin-U06-avanzado-resuelto.md:101` | ex6a responde "**Cuatro**" rutas y luego enumera dos estáticas + una default = **tres** | → "Tres" |
| 27 | `boletin-U06-avanzado-resuelto.md:118` | ex7: "verías **ambas entradas**: la `C`… y la `S` entre corchetes como alternativa" — falso: con el mismo prefijo gana la conectada (AD 0) y la estática **no se instala**; además contradice la propia pista del ejercicio ("la conectada (0) manda sobre la estática (1)") | → "verías solo la `C`; la estática no llega a la tabla (AD 0 < 1) — es config de sobra, quítala con `no ip route`" |

### ⚪ Dejar (revisado, sin cambio)

- `01-componentes-del-router` — secuencia de arranque (POST → boot ROM → IOS → startup-config) correcta; tabla de memorias y `show`s impecables; salvo la mini-sección de LEDs que gana por el hallazgo 3.
- `04` tabla AD (0/1/5/90/110/120 incluido EIGRP resumen) correcta; definición y activación de la flotante correctas.
- `05` cascada de decisión y longest prefix match correctos; respuesta 3 del mini-chequeo correcta.
- Cierre: ⭐, Fireside, 4 ¿Quién Soy?, CONRAD (ruta sin retorno), laboratorio con 3 fallos + extra de máscara, 4 Atrévete, crucigrama (soluciones revisadas), 5 entrevistas, 3 FAQ (ECMP incluida) y Poscréditos con "PRÓXIMAMENTE: OSPF" correcto.
- Boletín avanzado: diseño de 3 routers (10.0.0.0/30 y 10.0.0.4/30 con `.1/.2` y `.5/.6`), flotantes, LPM (`.30`→/28, `.200`→/24, `3.44`→/16, `.15`→/24) y diagnóstico: todos correctos.

---

## 3. Fronteras

| Frontera | Veredicto |
|---|---|
| **Entrante desde OSPF** (`07-ospf.md:14,82`, `07/01:16`, `07/08:22`) | ✅ puentes forward correctos (AD, métricas, `ip route 0.0.0.0/0` previo); los 5 usos de OSPF dentro de la U06 son la tabla de AD (punto 4/5) y puentes — sin desarrollo |
| **Entrante desde ACL** (`08-acl-seguridad.md:14,75`, `08/01:20,64`) | ✅ enlaces correctos; la afirmación "SSH, contraseñas y **banner** incluidos" se cumplirá tras el hallazgo 5 |
| **Entrante desde alta disponibilidad** (`12/07:20`) | ✅ usa AD/flotante tal y como se enseñan en el punto 4 |
| **Entrante desde trunking** (`05` índice y cierre) | ✅ enlaces de navegación correctos |
| **Salientes** | ✅ a trunking (índice: "en la unidad de trunking… hiciste hablar VLANs") y a OSPF (Poscréditos "PRÓXIMAMENTE" sin números) |
| **Matriz** | Fila **Ruta por defecto**: el lado enrutamiento es la casa (punto 4) ✅. Fila **OSPF**: anotar sesión 06 (usos = AD + puentes). Filas **ARP/ICMP**: usos operativos, ya cerradas |

---

## 4. Verificación final

- [x] `node scripts/check-unidad.mjs 06` → 0 fallos · 0 avisos
- [x] `node scripts/check-uds.mjs` → 0
- [x] `node scripts/check-links.mjs` → OK
- [x] `npm run check:diagrams` → 55 (baseline, sin cambios)
- [x] `npx astro build` → 183 páginas
- [x] `npm run docx` → 68/68
- [x] Comprobación lingüística es-ES
- [x] README de informes y matriz de solapamientos actualizados

---

## 5. Pendientes para sesiones siguientes

- Texto de boletines no canónico: quedan los índices de **07-12** para sus sesiones (el de la introducción tiene patrón propio y queda como está).
- Sin candidatos a mover/quitar: ARP, ICMP, ruta por defecto y OSPF quedan con el reparto ya cerrado por sesiones anteriores o con esta.
