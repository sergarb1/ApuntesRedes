# Revisión — U12 Alta disponibilidad

> Fecha: 2026-09-28 · Sesión de la revisión vigente (12 unidades — **última unidad del temario**)
> Unidad: `12-alta-disponibilidad` (índice + 8 puntos + cierre) y boletín inicial/avanzado (+resueltos).
> Las líneas citadas son las **previas a la edición** de esta sesión.

## 1. Auditoría automática

| Check | Resultado |
|---|---|
| `npm run check:unidad 12` | ✅ 0 FALLO / 0 AVISO (pre y post) |
| `node scripts/check-uds.mjs` | ✅ 0 restos de numeración (pre y post) |
| `scripts/check-links.mjs` | ✅ OK (pre y post) |
| `npm run check:diagrams` | 55 fallos preexistentes (sin tocar diagramas en esta sesión) |
| `npx astro build` | ✅ 183 páginas |
| `npm run docx` | ✅ 68/68 |

## 2. Hallazgos internos

Etiquetas: 🟡 corregir ya · 🔵 ampliar · ⚪ dejar · 🔴 mover/quitar (requiere decisión).

### 🟡 Corregir ya

1. **`12-alta-disponibilidad.md:8` — migaja del mapa del curso desactualizada.** Dice `🌐 NAT → 🛡️ ACLs → **🔁 AQUÍ ESTÁS** → 🏁 Fin del viaje`: los dos predecesores deben ser los dos inmediatos (ACLs y WiFi), como en todas las unidades. Sobran NAT y falta WiFi.
2. **`04-stacking.md:99` — texto roto (CONRAD):** «el camino que tu **neither-probaste**» → «el camino que **nunca probaste**» (Spanglish corrupto).
3. **`04-stacking.md:49` — `MLag`** → `MLAG` (inconsistente con la tabla de la L70 y con el resto del repo).
4. **`03-etherchannel.md:121` — `SU` con significado inventado:** «canal **S**tanding/usable (en uso)» — `SU` en `show etherchannel summary` significa **S** = capa 2 (L2) y **U** = *in use* (en uso), no "Standing".
5. **`06-hsrp-cisco.md:105-107` — salida de `show standby brief` desalineada:** la cabecera es ` P   Active…` y debajo sienta el `110` (prioridad) bajo la columna P (preempt). Cabecera real: `Interface   Grp  Pri  P State   Active   Standby   Virtual IP`.
6. **`06-hsrp-cisco.md:88-96` — snippet de subinterfaces incompleto:** `interface gig 0/0.10` pasa directo a `standby` sin `encapsulation dot1Q 10` ni IP real de la subinterfaz; IOS rechaza configurar la subinterfaz. Misma familia que el snippet incompleto corregido en la sesión U11.
7. **`09-cierre.md:114 — `standby timers 1 3`` sin grupo:** el laboratorio usa grupo 1 en todo el montaje; el comando correcto es `standby 1 timers 1 3` (si no, se configura el grupo 0 y no cambia nada).
8. **`09-cierre.md:158` — crucigrama H5**: pista «(dos palabras)» con respuesta `ETHERCHANNEL` (una palabra) → quitar el aviso.
9. **`09-cierre.md:164` — crucigrama V6**: pista «(2 palabras)» con respuesta `STACKING` (una palabra) → quitar el aviso (H7 «(2 palabras)» = `IP SLA` sí es correcto).
10. **`09-cierre.md:218-221` — las filas de la tabla de CEs del cierre NO coinciden con las del índice** (L69-72): difieren en texto (`Administración de conmutadores con tolerancia a fallos` vs `Conmutadores con tolerancia a fallos`, etc.) y en el recorrido (`Puntos 2, 3 y 4` vs `Puntos 2-4`). Regla de casa: índice y cierre carácter a carácter → unificar con el texto del índice.
11. **`boletin-U12-avanzado.md:20` — errata `**Pica:**`** → `**Pista:**`.
12. **`boletin-U12-avanzado-resuelto.md:75` — texto corrupto:** `(hanza shakeProposal/agreement…)` → `(handshake *proposal/agreement*…)` (la unidad lo llama «proposal/agreement» en el punto 2).
13. **`boletin-U12-avanzado-resuelto.md:81` — dos erratas:** `Tablas ARP/dfg` → `Tablas ARP y de enrutamiento` («dfg» no existe) y `nodo " equivocado"` (espacio tras la comilla) → `nodo "equivocado"`.
14. **Numeración con relleno en los 8 puntos (01–08)** — título (`01 —`), migaja (`→ 01 ·`) y pie (`[02 ·`): desviación del patrón de casa (índice y cierre con relleno, puntos con dígito simple; ya normalizado en U11). 8 ficheros × título+migaja (un solo edit por fichero) + pie = 16 ediciones. El cierre (`09 —`) y el índice se quedan con relleno.

### 🔵 Ampliar (opcionales)

- **RTO/RPO no existen en la unidad.** El boletín avanzado 8 exige definirlos, pero el punto 8 (Plan de continuidad) solo habla de MTTR: añadir una caja de 4 líneas con RTO/RPO haría el teoría↔boletín coherente.
- **HA de servicios** (clústeres, NIC teaming) solo aparece como respuesta en el boletín (1c); en la unidad se menciona «DHCP/DNS duplicados» pero no la HA de servidores — out of scope del temario, se puede dejar una frase puente.

### ⚪ Dejar

- **```bash en configs IOS** (`boletin-U12-avanzado-resuelto.md:21,51`) — lenguaje de fence incorrecto (es IOS, no bash); cosmético.
- **`standby 10 track g0/1 20`** (`boletin-U12-avanzado-resuelto.md:28`) — forma abreviada sin `decrement`; aceptable en respuesta de boletín.
- **`stack-mac persistent timer`** (`04-stacking.md:81`) — puede requerir valor en algunos IOS; sin equipo delante no se verifica.
- **VRRP «IP virtual por defecto = IP física del maestro»** (`boletin-U12-inicial.md:64` + resuelto) — simplificación didáctica aceptable (en IOS el campo sí se configura; la IOS-idea es que puede ser la IP de interfaz como dueño).
- **«Puede bajar el ancho de banda»** (`boletin-U12-avanzado-resuelto.md:14`) — uso legítimo de *bajar* (= reducir), no calco de descarga.
- **`err-disable por inconsistencia`** (`boletin-U12-avanzado-resuelto.md:43`) — matiz discutible (on+desirable normalmente no err-disablea), pero no erróneo en todos los casos.
- **Vocabulario RTO/RPO del boletín** (ver 🔵): se resuelve ampliando, no tocando el boletín.

### Estados no tocados

- La unidad NO tiene diagramas Excalidraw (cero referencias a `/diagrams/`): correcto, es una unidad de comandos y conceptos, sin fotos stock ni esquemas que añadir.
- Los cuatro juegos obligatorios con laboratorio, crucigrama, entrevista, preguntas tontas y poscréditos están todos en el cierre ✓. Laboratorio con fallo intencionado ✓ (Fallo B exige deducir el track del enlace WAN; fallo extra con prioridad 255).
- Poscréditos: «PRÓXIMAMENTE EN… NINGUNA UNIDAD» — final del curso, coherente ✓.

## 3. Fronteras y cross-unit

- **Numeración de puntos U12 con relleno:** era la última desviación anotada en la sesión U11 («U12 relleno pendiente»); queda cerrada con el punto 2·14.
- **Migaja del mapa** (hallazgo 2·1) — única cross-unit de esta sesión; arreglada.
- **CEs abiertos de sesiones anteriores** (sin decidir): R1-U06 (CEs g/h/i no oficiales), R1-U09 (CEs d/f de RA7), cross-unit U08 (cierre con numeración simple + desc «Sé el Paquete» vs ⭐), U07:39.
- **Cross-unit contenido**: la unidad referencia switching (STP, punto 5 de U04 ✓ enlace OK), enrutamiento estático (flotantes) y servicios (DHCP/DNS/NTP duplicados) — líneas de frontera correctas, sin solape.

## 4. Boletines U12

- Inicial (8 ejercicios) y avanzado (8) + resueltos 1:1 ✓. Cálculos verificados: 8,76 h (99,9 %), 52,6 min (99,99 %), 0,995³ ≈ 98,5 % ≈ 131 h/año, costes RSTP 4/19 ✓, RFC 5798 ✓.
- Respuestas coherentes con la unidad (HSRP preempt+track idénticos al punto 6; combinaciones LACP/PAgP idénticas al punto 3).
- Erratas: hallazgos 2·11, 2·12, 2·13. Sin fotos ni diagramas ✓ (patrón de boletines).

## 5. Decisiones pendientes del profe 🔴

- [ ] **R1 · Tablas CE de la unidad: texto oficial.** Verificado hoy (BOE RD 1629/2009 + todofp.es + ticarte + BOJA + Xunta). Oficial:
  - **RA1** «Reconoce la estructura de las redes de datos identificando sus elementos y principios de funcionamiento.»
  - **RA3** «Administra conmutadores estableciendo opciones de configuración para su integración en la red.» (CE i) STP verificado, j) puente raíz, l) copia/restauración de config → encaja con HA de L2)
  - **RA5** «Configura redes locales virtuales identificando su campo de aplicación.»
  - **RA6** «Realiza tareas avanzadas de administración de red analizando y utilizando protocolos dinámicos de encaminamiento.»
  - Las tablas de U12 **no usan letras** y **parafrasean** los títulos: `RA3 = Administración de conmutadores con tolerancia a fallos`, `RA5 = Segmentación segura y continua de la red`, `RA6 = Encaminamiento con redundancia`, `RA1 = Estructura de red tolerante a fallos`. Además el mapeo es discutible: **RA5 es VLANs** (esta unidad no configura VLANs: STP/EtherChannel/stack/FHRP) y **RA6 es enrutamiento dinámico** (aquí mandan flotantes/ECMP/SLA, mayormente estáticos). Opciones:
    - **A (recomendada)**: reescribir las dos tablas (una vez unificadas) con el **texto oficial literal** de RA1/RA3/RA5/RA6 y mapeo honesto de puntos (ej.: RA5 solo lo que toque segmentación-L2-L3, RA6 solo el tramo OSPF/redundancia de rutas, o añadir RA4 si se justifica). Misma filosofía que U09/U11.
    - **B**: dejar las paráfrasis (solo valen ya unificadas entre índice y cierre — eso se hace en 2·10 aunque no se decida nada).
    - **C**: corregir solo los títulos parafraseados a los oficiales, sin añadir letras.
  - Nota: comparte familia con los R1 abiertos de U06, U09 y U11; si el profe decide uno, conviene decidir los cuatro juntos.

## 6. Verificación y commit

- [x] `check:unidad 12` sin FALLOs · `check-uds` en 0 · `check-links` OK · build 183 páginas
- [x] DOCX regenerado (`npm run docx`, 68/68)
- [x] Comprobación lingüística es-ES (escaneo post-edición: solo quedan marcas exentas — relleno de índice/cierre y "(2 palabras)" de IP SLA)
- [ ] Commit `Revisión U12: …` (tras confirmación)
- [x] Matriz de solapamientos + README de estado actualizados (las 12 unidades revisadas)
