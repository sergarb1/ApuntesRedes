# Revisión de la unidad de Enrutamiento dinámico con OSPF

- **Unidad:** 07 · Enrutamiento dinámico con OSPF (`src/content/docs/07-ospf.md` + `07-ospf/01…09`)
- **Boletines:** `boletin-U07-inicial(-resuelto)` y `boletin-U07-avanzado(-resuelto)`
- **Fecha:** 2026-09-27
- **Alcance:** teoría (índice + 9 puntos + cierre), 4 boletines, tablas CE, fronteras con enrutamiento estático y ACL

---

## 1. Auditoría inicial

| Comprobación | Resultado |
|---|---|
| `node scripts/check-unidad.mjs 07` | **0 fallos · 0 avisos** (headers `RA6` coinciden; la tabla de filas, que el checker no compara, estaba inventada — ver hallazgo 1) |
| `node scripts/check-uds.mjs` | 0 |
| `node scripts/check-links.mjs` | 0 |
| `npm run check:diagrams` | 55 (baseline) — la U07 no usa diagramas Excalidraw (solo esquemas ASCII) |
| `npx astro build` | 183 páginas (estado previo) |
| `npm run docx` | 68/68 (estado previo) |

**Lectura completa:** índice, puntos 01-09, 4 boletines y fronteras entrantes/salientes. Unidad madura: plantilla correcta, secciones obligatorias todas presentes, sin números de unidad en prosa y sin puentes competidores. Los problemas son de **una tabla CE inventada con texto de RA6 que no es el oficial**, **dos fragmentos de texto corruptos**, **un fallo intencionado de laboratorio que describe mal lo que verá el alumno** y una colección de erratas y esquemas ASCII poco legibles.

---

## 2. Hallazgos y decisiones

### 🔴 Corregir ya — tabla CE / RA6

| # | Ubicación | Hallazgo | Acción |
|---|---|---|---|
| 1 | `07-ospf.md:66-76` | 🔴 **Tabla CE inventada:** letras a–e propias ("Ventajas del enrutamiento dinámico", "Clasificación de protocolos"…) y texto de RA6 **que no es el oficial** ("Aplica protocolos de encaminamiento dinámico en redes IP"). El cierre sí usa el RA6 oficial con las letras **g, h, i** de `openspec/changes/expand-u09` | → índice con **RA6 oficial** (`**RA6: Realiza tareas avanzadas de administración de red analizando y utilizando protocolos dinámicos de encaminamiento.**`) y filas g/h/i carácter a carácter iguales al cierre (columna de cobertura libre): g) **✅ Puntos 6-7 + ⚡ Laboratorio (punto 9)**; h) **✅ Punto 8 + ⚡ Laboratorio (punto 9)**; i) **✅ Punto 8 + 🧠 Atrévete a pensar (punto 9)** |

### 🟡 Corregir ya — índice

| # | Ubicación | Hallazgo | Acción |
|---|---|---|---|
| 2 | `07-ospf.md:12` | "se convierte en un trabajo de **titánico**" — errata | → "se convierte en un trabajo titánico" |
| 3 | `07-ospf.md:55` | Blockquote de boletines con redacción no canónica (mismo patrón ya corregido en U02-U06) | → "mira 1-2 resueltos para coger el formato, luego intenta el por-resolver; consulta el resuelto solo cuando te atasques" |

### 🟡 Corregir ya — teoría

| # | Ubicación | Hallazgo | Acción |
|---|---|---|---|
| 4 | `07/01:71-74` | Enlace Markdown **dentro de un bloque `bash`** (no se renderiza: sale el texto crudo) y comentarios con `;`, cuando la casa usa `#` | → comentario de línea propia `# Ruta principal: …` sin enlace + `# respaldo estático, AD 150 > 110`; el enlace al punto 8 se mueve a la prosa de debajo |
| 5 | `07/04:68-80` | El esquema dibuja a **R0 fuera de la caja del Área 0** pero el bullet lo llama "backbone router": ambiguo (¿en qué área está R0?) | → rotular en el esquema `(Área 0 · ASBR: redistribuye esa red a OSPF)` y en el bullet "como está en el Área 0, también es **backbone router**" |
| 6 | `07/05:107` | **Texto corrupto:** "La cuenta clásica de examen es 2N-3**.ctica son con DR y BDR).**" — restos de una edición | → "1. **9 adyacencias** (2N−3 con N = 6): cada router se adyacentia con el DR y con el BDR. Si solo contaras las del DR serían N−1 = 5." |
| 7 | `07/05:32` y `:116` | Recuentos incoherentes: el diagrama dice "Con DR → 5−1 = 4" **pero dibuja también el BDR** (serían 2N−3 = 7) y el resumen dice "reduce… a N−1" | → diagrama: `Con DR y BDR → 2*5-3 = 7 adyacencias` (el bloque de arriba ya explica que solo con el DR es N−1); resumen: "reduce las adyacencias de N·(N−1)/2 a **2N−3** con DR y BDR" |
| 8 | `07/05:68`, `07/09-cierre:203`, `boletin-U07-avanzado:106`, `-resuelto:96` y `-resuelto:123` | "La elección **solo** ocurre al arrancar o reiniciar" omite que, si falla el DR, **el BDR asciende y se elige un nuevo BDR sin reiniciar** (RFC 2328 §9.2) | → matizar en los 5 sitios: "se hace al arrancar OSPF, al reiniciar el proceso **o cuando falla el DR** (el BDR asciende)"; el punto clave (cambiar prioridades no destrona al DR) se mantiene |
| 9 | `07/06:40-46` | El diagrama de 4 nodos se publica **sin la leyenda de costes** que sí tiene el punto 3, de ahí que el coste 5 de A–B no aparezca en la imagen | → añadir la misma leyenda `(costes: A-C=5, A-B=5, B-D=2, C-D=1)` |
| 10 | `07/06:64` y `:91` | Comentarios inline con `;` (la casa usa `#`) | → `# 1 Gbps como coste 1` y `# Camino A pasa a coste 50+1 = 51 > 20` |
| 11 | `07/06:75-82` | 🔴 **ASCII del "caso completo" ilegible:** la caja lleva de título R2 pero dentro pone "FastEth", R3 aparece pegado a la caja y la rama de R4 queda suelta debajo | → redibujar con los dos caminos separados y rotulados (`Camino A · FastEthernet 100 Mbps` / `Camino B · Serial 10 Mbps`) |
| 12 | `07/06:90` | Prompt inválido: `R1(config-if)# interface gigabitethernet 0/0` (un `interface` no se teclea en modo `config-if`) | → `R1(config)# interface gigabitethernet 0/0` + `R1(config-if)# ip ospf cost 50` |
| 13 | `07/06:87` | "si la **fibra** de R2 está saturada" — el ejemplo trabaja con FastEthernet | → "si el enlace de R2 está saturada" |
| 14 | `07/07:33` | "OSPF activará OSPF en las interfaces" — redundancia | → "OSPF activará la negociación en las interfaces cuyas direcciones caigan dentro de esa red" |
| 15 | `07/08:92` | En el `show ip route ospf` de ejemplo **falta el prefijo `O`** de la primera ruta (las otras dos sí lo traen) | → alinear como en IOS: `O` + 4 espacios antes de `10.1.0.0/24` |
| 16 | `07/08:86` | `O*E2` sin explicar el **asterisco** (que es justo la pista visual de la ruta por defecto) | → "Ruta externa con `*` de **candidata a ruta por defecto** (la default que anuncia el ASBR, tipo E2)" |
| 17 | `07/08:25` y `:27` | Comentarios inline con `;` (la casa usa `#`) | → `# ruta por defecto local` / `# la anuncia a OSPF` |

### 🟡 Corregir ya — cierre

| # | Ubicación | Hallazgo | Acción |
|---|---|---|---|
| 18 | `07/09-cierre:114` | 🔴 **El fallo intencionado describe mal el síntoma:** "Verás los vecinos en el enlace directo (R3-R4) en estado FULL" es **falso** — con el Área 1 en un extremo y el Área 2 en el otro, OSPF **no forma vecindad** (los paquetes de áreas distintas no se aceptan) | → explicar lo que verá de verdad: `show ip ospf neighbor` **no muestra al otro** en ese enlace; y si el alumno declara ambos extremos en la misma área para "arreglarlo" y llegan a FULL, **igual no hay rutas inter-área** sin pasar por el backbone. La conclusión pedagógica (todo inter-área pasa por el Área 0) se mantiene y queda mejor explicada |

### 🟡 Corregir ya — boletines

| # | Ubicación | Hallazgo | Acción |
|---|---|---|---|
| 19 | `boletin-U07-inicial:67` | 🔴 **El ejercicio 7a es calco exacto del ejercicio 1** (misma lista IGP/EGP) | → reescribir 7a con ángulo nuevo: "Explica qué es la **convergencia** y por qué el dinámico la consigue solo mientras que en el estático depende del administrador" + respuesta en el resuelto |
| 20 | `boletin-U07-avanzado:103` | 7c **contradice su propia tabla**: dice "R-A y R-B empiezan con la misma prioridad (1)" pero en la tabla R-B tiene prioridad 200 | → plantearlo como hipótesis: "Si R-A y R-B tuvieran la misma prioridad (1), ¿quién ganaría y por qué?" (el resuelto ya responde sobre el emparejamiento, no cambia) |
| 21 | `boletin-U07-avanzado:83` | El 5b duplica el 7b (los dos preguntan por la prioridad 0) en un boletín **avanzado** | → eliminar el 5b y renumerar 5c→5b (enunciado y resuelto); la prioridad 0 queda cubierta por el 7b |
| 22 | `boletin-U07-avanzado-resuelto:77` | **Oración corrupta y contradictoria** en el 4a: "…el Camino A. el mismo coste si todos los enlaces son del mismo tipo. Si ambos tienen coste 1+1+1 vs 1+1+1+1, gana el de 3 saltos (menos coste)" | → reescribir limpio: A = 1+1 = 2, B = 1+1+1 = 3, gana A por menor coste total |
| 23 | `boletin-U07-avanzado-resuelto:65` | El 2d queda en ambiguo ("su Router ID **podría** ser otro…") cuando la salida sí permite deducir cosas | → "No aparece en esa salida (los `Neighbor ID` son los de los vecinos): no es 3.3.3.3 ni 4.4.4.4, y a juzgar por los estados este router es **DROTHER** (si fuera BDR, el 4.4.4.4 estaría en FULL). El tuyo lo ves con `show ip ospf`" |
| 24 | `boletin-U07-avanzado-resuelto:73` | El 3c atribuye el anuncio de **ambas** rutas al par "redistribute + default-information originate" sin distinguir quién hace qué | → precisar: `redistribute static subnets` inyecta las dos estáticas (incluida la 0.0.0.0/0) y `default-information originate` se asegura del anuncio de la default como externa E2 |

### ⚪ Dejar (revisado, sin cambio)

- `02-igp-vs-egp` — IGP/EGP, RIP vs OSPF, comparativa y "trampa del enlace único": correctos.
- `03-conceptos-ospf` — cadena de montaje, orden de selección del Router ID (manual → loopback → física), timers 10/40 y mini-chequeo (2.2.2.2) correctos; el diagrama de 4 nodos se apoya en su leyenda de costes.
- `07-configuracion-ospf` — `router ospf`, wildcard, process ID local, ABR por configuración y `show`s correctos. Los comentarios inline con `#` son **estilo de la casa** (U04-U06 los usan): no se tocan.
- `08-ruta-por-defecto-y-diagnostico` — escalera de diagnóstico, causas típicas, `always`, prefijos O/O IA/O*E2 y tabla AD (0/1/20/110/120) correctos.
- Cierre — ⭐ Sé el Router OSPF, Fireside RIP vs OSPF (timers 30/180/15 correctos), 6 ¿Quién Soy?, CONRAD, laboratorio de 3 áreas con regla del backbone, 4 Logros, 5 Atrévete, crucigrama (SPF/LSA/CERO/DIEZ/ABR/TREINTA/ASBR/QUINCE verificados), 5 entrevistas y 3 FAQ.
- Boletín inicial — contenidos correctos (costes 10/1/64, redondeo hacia abajo, DORA-free) salvo el duplicado 7a (hallazgo 19).
- Boletín avanzado — multiárea con IPs coherentes (10.0.0.0/30 y 10.0.0.4/30 con `.1/.2` y `.5/.6`), redistribución, costes y escalera: correctos salvo lo apuntado (20-24).

---

## 3. Fronteras

| Frontera | Veredicto |
|---|---|
| **Saliente hacia ACL** (`07-ospf.md:86`, `07/09-cierre:215,231`) | ✅ correcto bajo la numeración actual (ACL = 8); el Poscréditos "PRÓXIMAMENTE: Filtrado y seguridad" también |
| **Entrante desde enrutamiento estático** (`06-enrutamiento-estatico.md:14,81`, `06/06-cierre:231`, `06/05:120`) | ✅ enlaces correctos; la U06 se anuncia como "base sobre la que se monta OSPF" |
| **Saliente/entrante con enrutamiento estático** (`07-ospf.md:14,82`, `07/08:22`) | ✅ puentes AD/métricas/`ip route` correctos |
| **Matriz** | Fila **OSPF**: anotar sesión 07 (casa de la teoría + `default-information originate`). Fila **Ruta por defecto**: ya en casa desde la sesión 06; la pata OSPF queda cubierta con esta |
| **Diagramas** | U07 no usa Excalidraw (solo ASCII) → `check:diagrams` en baseline 55 |

---

## 4. Verificación final

- [x] `node scripts/check-unidad.mjs 07` → 0 fallos · 0 avisos
- [x] `node scripts/check-uds.mjs` → 0
- [x] `node scripts/check-links.mjs` → OK
- [x] `npm run check:diagrams` → 55 (baseline, sin cambios)
- [x] `npx astro build` → 183 páginas
- [x] `npm run docx` → 68/68
- [x] Comprobación lingüística es-ES
- [x] README de informes y matriz de solapamientos actualizados

---

## 5. Pendientes para sesiones siguientes

- **Reordenación aprobada** (mover la unidad de Servicios a la posición 6 y cerrar la 7 antes de reorganizar): tras este cierre, sesión dedicada — U10→6, estático→7, OSPF→8, NAT→9, ACL→10 (renombres de slug + boletines, `astro.config.mjs`, pies y "⏭️ continúa en", mapa del curso y landing, diagramas `uXX-*`, regenerar DOCX/PDF/EPUB). Verificar que los contenidos de servicios encajan en la posición 6.
- Texto de boletines no canónico: quedan los índices de **08-12** para sus sesiones.
- Sin candidatos a mover/quitar dentro de la unidad.
