# Revisión — U11 Redes inalámbricas

> Fecha: 2026-09-28 · Sesión de la revisión vigente (12 unidades)
> Unidad: `11-redes-inalambricas` (índice + 8 puntos + cierre) y boletín inicial/avanzado (+resueltos).
> Las líneas citadas son las **previas a la edición** de esta sesión.

## 1. Auditoría automática

| Check | Resultado |
|---|---|
| `npm run check:unidad 11` | ✅ 0 FALLO / 0 AVISO (pre y post) |
| `node scripts/check-uds.mjs` | ✅ 0 restos de numeración (pre y post) |
| `scripts/check-links.mjs` | ✅ OK (pre y post) |
| `npm run check:diagrams` | 55 fallos preexistentes (sin tocar diagramas en esta sesión) |
| `npx astro build` | ✅ 183 páginas |
| `npm run docx` | ✅ 68/68 |

## 2. Hallazgos internos

Etiquetas: 🟡 corregir ya · 🔵 ampliar · ⚪ dejar · 🔴 mover/quitar (requiere decisión).

| # | Fichero:línea | Etiqueta | Hallazgo | Acción/estado |
|---|---|---|---|---|
| 1 | `11-redes-inalambricas/01-medio-inalambrico.md:89` | 🟡 | "Medir señal sin ruido es **media diagnosis**" (giro inexistente en español) | ✅ → "es solo la mitad del diagnóstico" |
| 2 | `…/04-topologias.md:27` | 🟡 | `ESS (Extended SS)` — truncado: los demás acrónimos se expanden completo | ✅ → `Extended Service Set` |
| 3 | `…/05-cobertura-y-diseno.md:71` | 🟡 | "con una **laptop**/app" — es-ES obligatorio: portátil | ✅ → "portátil/app" |
| 4 | `…/07-aps-y-wlc.md:65` | 🟡 | `el modelo **cloud/ embedded**` (barra pegada con espacio raro) | ✅ → "**en la nube o embebido**" |
| 5 | `…/08-configuracion-wlan.md:66` | 🟡 | Concordancia: "**en los AP domésticos** de Packet Tracer **trabaja** con una SSID principal" | ✅ → "solo **se trabaja** con una SSID principal" |
| 6 | `…/08-configuracion-wlan.md:39-45` | 🟡 | El lab promete INVITADOS "aislada" (objetivo L28, diagrama L62-63) y el paso 5 (L78) espera que el ping falle, pero **no se configura ninguna ACL** y el router rutea entre subinterfaces → el ping SÍ funciona | ✅ → ACL 110 (deny 99→10 / permit any) entrante en la subinterfaz .99 + nota con enlace a la unidad de ACL |
| 7 | `…/08-configuracion-wlan.md:96` | 🟡 | Fragmento de AP: `AP(config-subif)# encapsulation dot1Q 10` aparece sin entrar antes en la subinterfaz (el prompt cambia de la nada) | ✅ → añadir `AP(config)# interface dot11Radio 0.10` |
| 8 | `…/08-configuracion-wlan.md:112` | 🟡 | "WiFi analyzer (móvil/**laptop**)" | ✅ → "móvil/portátil" |
| 9 | `…/08-configuracion-wlan.md:163` | 🟡 | "Adaptador inalámbrico de **laptop**" (prosa) | ✅ → "de portátil" |
| 10 | `…/09-cierre.md:94,96,102` | 🟡 | "**laptops**" ×3 en el material/montaje/verificación del laboratorio | ✅ → "portátiles" |
| 11 | `…/09-cierre.md:99` | 🟡 | El lab exige "invitados NO pingen a 192.168.10.x" (L102) y el logro "Aguafiestas… sin ver la LAN" (L128), pero el "Configura al inicio" no pide ACL → mismo caso que el hallazgo 6 | ✅ → ACL 110 añadida al paso 1 de configuración |
| 12 | Los **8 puntos** (título L2, migaja L8, pie L113/L100/L104/L111/L132/L123/L141/L171) | 🟡 | Numeración con **relleno** en páginas de punto (`01 —`, `→ 01 ·`, `[02 ·`): el patrón de casa (verificado en U02–U10, 9 unidades) es **dígito simple en puntos** (`1 —`, `→ 1 ·`, `[2 ·`) y relleno **solo en cierres**. U11 y U12 son las únicas unidades con puntos rellenos (U12, pendiente, se corregirá en su sesión) | ✅ → 8 ficheros: títulos y migajas a simple en la misma línea que las migajas, pies a simple |
| 13 | `boletines/boletin-U11-inicial.md:41` | 🟡 | "cada **marketing-name**" (anglicismo en prosa) | ✅ → "cada nombre comercial" |
| 14 | `boletines/boletin-U11-avanzado.md:31` | 🟡 | "**sinonimo**" sin tilde | ✅ → "sinónimo" |
| 15 | `…/boletin-U11-avanzado.md:83` | 🟡 | "un único AP **wifi**" (grafía inconsistente: todo el repo usa "WiFi") | ✅ → "WiFi" |
| 16 | `…/boletin-U11-avanzado.md:97` | 🟡 | "¿Por qué el **OS** de arriba **(IPv4)**…?" — IPv4 no es un sistema operativo; la resuelto (L103) lo entiende como "arriba de la trama" | ✅ → "la capa de arriba (IPv4)" |
| 17 | `…/boletin-U11-avanzado-resuelto.md:12` | 🟡 | "**atenuina**" (no es verbo español) | ✅ → "atenúa" |
| 18 | `…/boletin-U11-avanzado-resuelto.md:16` | 🟡 | Concordancia: "**profesores** requiere… **alumnos** solo necesita" (sujeto plural con verbo singular) | ✅ → "el SSID `Profesores` requiere… el SSID `Alumnos` solo necesita" |
| 19 | `…/boletin-U11-avanzado-resuelto.md:26` | 🟡 | "**utilisation**" (anglicismo) | ✅ → "uso del canal" |
| 20 | `…/boletin-U11-avanzado-resuelto.md:30` | 🟡 | Ejemplo `36, 44, 52, 60` con "(separación de **4 números × 20 MHz**)" — la separación real es de **8 canales (40 MHz)**; la aritmética no cuadra | ✅ → "(separación de 8 canales = 40 MHz; solape nulo)" |
| 21 | `…/boletin-U11-avanzado-resuelto.md:54` | 🟡 | "1-1-1-6-1-11 **apila tres APs** en el canal 1" — el canal 1 aparece **cuatro** veces (coherente con el enunciado L57) | ✅ → "cuatro APs" |
| 22 | `…/boletin-U11-avanzado-resuelto.md:56` | 🟡 | Dos erratas: "**el roving** tarda" → roaming; "**microscaída**" → microcaída | ✅ → ambas corregidas |
| 23 | `…/boletin-U11-avanzado-resuelto.md:66` | 🟡 | Dos erratas: "perfiles/**limites**" (falta tilde) y "**monopilice**" (errata por monopolicen/monopolice) | ✅ → "límites" y "monopolice" |

### ⚪ Dejar (documentados, sin tocar)

- `08-configuracion-wlan.md:25,72` — `Laptop-1` es el **nombre del equipo** de Packet Tracer, no prosa (igual que `PC-1`).
- `05-cobertura-y-diseno.md:90` — "la cobertura —las barras— están preciosas": el paréntesis cambia el sujeto a propósito; suena bien leído.
- `03-estandares-80211.md:60` — "Aula con 30 portátiles antiguos → WiFi 5 como suelo": recomendación discutible (los antiguos no ven 5 GHz) pero defendible como mínimo de despliegue.
- Boletines — "30 %/50 %" con el símbolo pegado: en los cuatro boletines de la unidad es consistente entre sí (los puntos usan "15-20 %"; estilo de boletines).
- `05-cobertura-y-diseno.md:116` — "las tres, en ese orden de dificultad": ordenación opinable, no errónea.
- `09-cierre.md:24` — "la cafetería del edificio vecino": el campus puede ser de la misma organización; sin ambigüedad que rompa nada.
- Introducción (unidad 01) — migajas con relleno (`→ 02 ·`): plantilla propia de la introducción, fuera del patrón 02–12.

### 🔵 Ampliar (opcionales, fuera de esta sesión)

- **Hidden node / RTS-CTS** — aparece solo en los boletines (inicial 6c y su resuelto) y en el vocabulario de la teoría no; un recuadro corto en el punto 5 (cobertura) o en el 1 cerraría el circuito teoría→boletín.
- El punto 3 trata 6 GHz como fila de tabla; una frase sobre el estado regulatorio europeo de WiFi 6E/7 (ya está en la nota L33, podría engordarse) solo si el profe quiere.

## 3. Fronteras con otras unidades

| Concepto | Aparece en | Veredicto |
|---|---|---|
| WiFi / 802.11 y WiMax | casa de esta unidad (todo el temario) + bonus del punto 7 de NAT (CE e) oficial de RA7) | ✅ sin solape: NAT solo tiene la analogía de alto nivel, aquí va el detalle |
| VLANs / trunks | puntos 4, 6, 7, 8 y lab del cierre | ✅ integración declarada ("todo lo de trunking servirá"), sin repetir teoría de trunks |
| ACLs / aislamiento | lab del punto 8 y del cierre | ✅ tras los hallazgos 6 y 11, se cita y **se aplica** con enlace a la unidad de ACL (cierre U10 ya revisada) |
| DHCP / DNS | lab (pools por VLAN) y diagnóstico | ✅ uso operativo; la casa de servicios ya está cerrada |
| Medios de transmisión no guiados | RA1·b — casa compartida con Ethernet (U02 cubre los guiados) | ✅ mención y desarrollo de no guiados aquí; sin repetir cableado |

### Observaciones cross-unit (fuera de esta unidad)

- **U01 Introducción — títulos frontmatter desordenados** (nuevo, unidad ya cerrada): el H1 de cada página no coincide ni con su migaja ni con el sidebar (`02-instalacion-packet-tracer.md` tiene `title: 07 —…` con migaja `→ 02 ·` y sidebar `2 ·`). Permuta detectada en 9 de 10 ficheros: 02→"07", 03→"02", 04→"03", 05→"04", 06→"05", 07→"06", 08→"09", 09→"10", 10→"08". → ver §5 **R2**.
- **U12 Alta disponibilidad** — mismos puntos con numeración rellenada que U11 (hallazgo 12): se corregirá en su sesión pendiente.
- Siguen abiertos los cross-unit de la sesión U09 (U08 cierre simple + desc "Sé el Paquete" vs ⭐ "Sé el Router OSPF"; U07:39 "Sé el Router"; U11 pie `[09 ·` — este último queda **resuelto** con el hallazgo 12).

## 4. Boletines de la unidad

- Par inicial/avanzado (+resueltos), 4 ficheros, **sin variantes**; sin imágenes ni diagramas ✅; sin números de unidad en títulos ni prosa ✅; pistas en `<details>` ✅.
- **Inicial**: graduación correcta (identificar → bandas/canales → T/F → escala de cifrado → nombres comerciales → cobertura → config → Enterprise → V/F de medios). Hallazgo #13 (anglicismo) y nada más: soluciones correctas (1/6/11, WPA3-SAE, WiFi 4→7, hidden node con RTS/CTS, "WiFi sí es capa 2").
- **Avanzado**: nivel coherente (diseño de instituto, diagnóstico DFS, throughput CSMA/CA, caso integrador PT). Hallazgos #14–#16 (sinónimo, grafía wifi, "OS (IPv4)").
- **Avanzado resuelto**: soluciones técnicas sólidas (36/44/52/60 y 80 MHz en 36/52/100/116 correctos; tabla 802.11 con hasta 4 MACs correcta). Hallazgos #17–#23 (erratas y aritmética del paso de canales).

## 5. Decisiones pendientes del profe 🔴

- [x] **R1 · Tablas CE de la unidad: letras oficiales.** ✅ **Aprobada A y aplicada:** las dos tablas (índice y cierre) usan el **texto oficial literal** de RA2·a/e/f/g + RA1·b (con "sobre distintas configuraciones" en g) y nota de que la seguridad WLAN es contenido de la unidad sin CE propio). El análisis de las 5 fuentes queda como histórico.
  - **RA2** «Integra ordenadores y periféricos en redes cableadas e inalámbricas…»: **a)** identificar estándares cableados e inalámbricos · **e)** configurar adaptadores cableados e inalámbricos bajo distintos SO · **f)** integrar dispositivos en redes cableadas e inalámbricas · **g)** comprobar la conectividad entre dispositivos y adaptadores inalámbricos · (j) IPv6 · (k) ARP/RARP.
  - **RA1** «Reconoce la estructura…»: **b)** «Se han diferenciado los distintos medios de transmisión utilizados en las redes» ✓ (la atribución RA1·b actual es correcta).
  - La tabla actual dice **RA2·e) = "Estándares"** (en realidad es el **a)** oficial) y **RA2·g) = "Seguridad en redes inalámbricas"** (el g) oficial es **comprobar conectividad inalámbrica**; la seguridad WLAN **no es CE oficial** de PAR). El **f) sí coincide** con el oficial.
  - El **contenido** de la unidad cubre de sobra los oficiales a), e), f) y g) (estándares → puntos 1/3/5; adaptadores → punto 8 + lab; integración → 4/7/8; conectividad inalámbrica → punto 8). Opciones:
    - **A (recomendada)**: reescribir las dos tablas (índice y cierre) con el **texto oficial literal** de a), e), f), g) + RA1·b) y su mapeo de puntos → 5/5 letras oficiales; el punto 6 (seguridad) queda como contenido de la unidad sin CE propio (o se anota como transversal). Misma filosofía que la opción A de U09.
    - **B**: dejar las letras actuales (familia de CEs no oficiales ya abierta en la sesión U06 y en U09).
    - **C**: corregir solo las dos letras erróneas (e→a, g→"conectividad") sin cambiar el resto.
  - Nota: este R1 comparte decisión con el R1 de la sesión U06 (tablas "g)/h)/i)" no oficiales) y con el R1 de U09 (CE d)/f) de RA7).
- [x] **R2 · Títulos de la introducción (U01).** ✅ **Aprobada A y aplicada:** los 9 `title:` de `01-introduccion` permutados a su número de fichero/sidebar (canónico = `astro.config.mjs`).

## 6. Verificación y commit

- [x] `check:unidad 11` sin FALLOs · `check-uds` en 0 · `check-links` OK · `check:diagrams` 54 (nuevo baseline; era 55) · build 183 páginas — re-verificado tras la pasada de decisiones (R1 + R2)
- [x] DOCX regenerado (`npm run docx`, 68/68)
- [x] Comprobación lingüística es-ES (23 textos corregidos revisados: no quedan "laptop" en prosa, anglicismos ni acentos sueltos)
- [ ] Commit `Revisión U11: …` (tras confirmación)
- [x] Matriz de solapamientos + README de estado actualizados
