# Revisión — U06 Servicios de red: DHCP, DNS y NTP

> Fecha: 2026-09-28 · Sesión de la revisión vigente (12 unidades)
> Plantilla: copiar este fichero como `revision-UXX-<nombre>.md`.

## 1. Auditoría automática

| Check | Resultado |
|---|---|
| `npm run check:unidad 06` | ✅ 0 FALLOs · 0 avisos (restos: 0) |
| `node scripts/check-uds.mjs` | ✅ 0 |
| `scripts/check-links.mjs` | ✅ OK: todos los enlaces internos existen |
| `npm run check:diagrams` | ✅ sin fallos nuevos (55 en 19 diagramas, baseline) |
| `npx astro build` | ✅ 183 páginas |
| `npm run docx` | ✅ 68 generados, 0 fallos |

## 2. Hallazgos internos

Etiquetas: 🟡 corregir ya · 🔵 ampliar · ⚪ dejar · 🔴 mover/quitar (requiere decisión).

Líneas referidas al estado **pre-edición**.

| # | Fichero:línea | Etiqueta | Hallazgo | Acción/estado |
|---|---|---|---|---|
| 1 | `06-servicios-red/01-…-08-…` (todos los puntos) | 🟡 | Numeración con relleno en las tres ubicaciones de los puntos (`title: "02 —`, `→ 02 ·`, pie `[02 ·`) frente a la convención "puntos = dígito simple" ya aplicada en U10 (índice y cierre = relleno, como sigue quedando) | ✅ 31 sustituciones (8 títulos + 8 migajas + 15 referencias de pie, incluida `[9 · Cierre]`) |
| 2 | `06-servicios-red.md:40` | 🟡 | Fila del mapa abreviada: "03 · DHCP en Cisco y helper" ≠ título del punto "DHCP en Cisco y el agente de reenvío" | ✅ título completo en la fila |
| 3 | `06-servicios-red.md:41` | 🟡 | "04 · DNS: la guía telefónica" ≠ título "DNS: la guía telefónica de Internet" | ✅ título completo |
| 4 | `06-servicios-red.md:44` | 🟡 | "07 · NTP en Cisco" ≠ título "NTP en Cisco: configuración y verificación" | ✅ título completo |
| 5 | `06-servicios-red.md:69-74` | 🟡 | Tabla CE del índice ≠ tabla CE del cierre (textos, orden de letras y coberturas distintas: g/h/i/d vs d/g/h/i) — incumple la regla "índice == cierre carácter a carácter" | ✅ ambas tablas unificadas (orden d, g, h, i) |
| 6 | `09-cierre.md:27` | 🟡 | "`ntp server` en el portátil": comando IOS aplicado a un portátil | ✅ "pon el portátil en hora con el servidor NTP" |
| 7 | `09-cierre.md:104` | 🟡 | "NTP activado como stratum 4": atributo del servidor NTP de Packet Tracer no garantizado y arbitrario | ✅ "y NTP activado" |
| 8 | `09-cierre.md:223,226` | 🟡 | Filas d e i de la tabla CE sin el sufijo "(punto 9)" que sí llevan g y h (patrón de la tabla) | ✅ normalizadas a `(punto 9)` / `(punto 9, NTP)` |
| 9 | `03-dhcp-cisco.md:87` | 🟡 | Lista de broadcasts del helper duplicaba TFTP y decía "DNS antiguo": "(TFTP, DNS antiguo, NetBIOS, TFTP…)" | ✅ "(TFTP, DNS, NetBIOS, syslog…)" |
| 10 | `03-dhcp-cisco.md:113` | 🟡 | "direcciones ofrecidas, **S**olicitado, expiradas": mayúscula incongruente en medio de la lista | ✅ "solicitadas" |
| 11 | `06-ntp.md:65` | 🟡 | "servidores **volunteering** en España" (anglicismo) | ✅ "servidores voluntarios en España" |
| 12 | `07-ntp-cisco.md:90,99` | 🟡 | `ntp authentication-key 1 md7 …` — `md7` no es keyword de NTP en IOS (el único algoritmo válido en el comando es `md5`) | ✅ `md5` en los dos bloques (core y cliente) |
| 13 | `07-ntp-cisco.md:104` | 🟡 | Justificación inventada de `md7` ("en versiones modernas, que cifra la clave en la config") que contradecía además el mini-chequeo (que ya decía `md5`) | ✅ frase simplificada: "En Packet Tracer la sintaxis `md5` funciona entre routers y switches igual" |
| 14 | `07-ntp-cisco.md:123` | 🟡 | `show ntp status` de un **cliente** del máster `ntp master 3` decía "stratum 3" (el cliente debe ser 4) | ✅ "stratum 4" |
| 15 | `07-ntp-cisco.md:129` | 🟡 | `show ntp associations` bajo el epígrafe "cliente **bien sincronizado**" mostraba `~10.0.0.1 .INIT. … reach 0` (exactamente lo contrario: sin sincronizar) | ✅ ejemplo saludable `*10.0.0.1 127.127.1.0 3 … reach 377` |
| 16 | `07-ntp-cisco.md:141` | 🟡 | Frase corrupta: "un testigo de la mancomunidad de horarios impossibles" | ✅ "una colección de relojes que no se ponen de acuerdo" |
| 17 | `08-diagnostico-servicios.md:117` | 🟡 | Respuesta 5 priorizaba `show ntp status` en una pregunta que pedía comandos de **cliente Windows**; y la cola era contradictoria: "hasta que el actual falla o está verde" | ✅ "`w32tm /query /status` en Windows; `show ntp status` en los equipos de red" + "hasta que el actual esté verde" |

**⚪ Dejados (con motivo):**

| Fichero:línea | Motivo |
|---|---|
| `06-ntp.md:50` | NTP Pool presentado como "stratum 1": en la práctica la mayoría del pool es stratum 2. Simplificación didáctica aceptada (la jerarquía explicada arriba es correcta). |
| `06-servicios-red.md:8` | "Routing estático" en el mapa del curso: patrón de casa (unidades 05, 06 y 08 usan nombre corto). |
| `07-ntp-cisco.md:133,162` | ACL mencionada como causa posible de `reach = 0` / fallos de NTP: mención operativa, sin contenido propio (no duplica U10). |
| `09-cierre.md:143` | Desfase "10:00 / 13:01" en los logs: hipérbole deliberada de CONRAD. |
| `09-cierre.md:131` | Logro "Cronometrista = NTP autenticado" es más exigente que el laboratorio: gamificación aspiracional, se mantiene. |
| `09-cierre.md` (frontmatter, migaja, pie) | Numeración con relleno `09`/`08`: patrón de casa para el cierre (igual que U10). |
| `boletin-U06-inicial`, ex. 5 | Ítem 2 ("consultar un servidor DNS concreto") frente al enunciado (`@8.8.8.8`): imprecisión menor, el par se entiende. |

## 3. Fronteras con otras unidades

| Concepto | Aparece en | Veredicto |
|---|---|---|
| DHCP concepto (DORA, pools) | intro `06-dns-y-dhcp.md` · IP `08-dhcp.md` · trunking `07-dhcp-por-vlan` | ✅ reparto ya cerrado en las sesiones 03 y 05; aquí se cierra el **lado servidor** (punto 3: pool en router, exclusiones, reservas, `ip helper-address`, lab del cierre) |
| DNS concepto | intro `06-dns-y-dhcp.md` (43 menciones, todas conceptuales: sin registros de zona, ni `nslookup`, ni zonas) | ✅ frontera intro ↔ servicios **cerrada**: intro = qué y por qué; servicios = cómo (puntos 4-5 y diagnóstico) |
| NTP | intro (1) · IP (2) · trunking (2) · AD (1) · **servicios (72)** | ✅ fuera de casa solo puentes: "PRÓXIMAMENTE", "ya lo montaste", opción 42/DHCPv6; casa = esta unidad |
| RA4·h — "router como servidor de direcciones IP dinámicas" | CE oficial de RA4; el punto 3 lo cubre de lleno | ✅ complemento legítimo (la atribución de CEs se decide en §5) |
| ACL | `07-ntp-cisco.md:133,162` | ✅ dos menciones operativas de diagnóstico, sin desarrollo propio (U10 sigue siendo la casa) |
| Escalera del ping | `08-diagnostico-servicios.md:20` | ✅ "en unidades anteriores", sin número de unidad |
| RA2·g (IP) · RA2·e,g (inalámbricas) · RA6·i (OSPF) | unidades 03, 11 y 08 | 🔴 misma familia de CEs no oficiales que aquí — ver §5; no se toca en esta sesión |

## 4. Boletines de la unidad

- Par inicial/avanzado (+resueltos), 4 ficheros, **sin variantes** (`packettracer`/`ipv6` no aplican a esta unidad).
- ✅ Sin números de unidad en títulos ni prosa · sin imágenes ni diagramas (criterio de casa) · soluciones en `<details>` · crucigrama con solución coherente.
- ✅ Soluciones correctas: DORA, registros (`10.0.0.5`, MX), `nslookup`/`-type=MX`, jerarquía de strata, y DHCPv6 stateless con `ipv6 nd other-config-flag` (comprobado).
- Hallazgos: solo el ⚪ del ejercicio 5 del inicial (ver §2).

## 5. Decisiones pendientes del profe 🔴

- [x] **CEs de la tabla de evaluación (asunto principal).** ✅ **Aprobada O1 y aplicada:** la tabla de índice y cierre usa el CE oficial **RA2·d)** con texto literal, respaldo en **RA4·h** y nota de que DNS/NTP son ampliación sin CE propio en PAR. (El resto de la decisión, con el análisis completo del RD 1629/2009, queda como histórico.) Las letras g) h) i) —y la d) con el añadido "(automatizado)"— de nuestras tablas **no existen en el Real Decreto oficial del título**: **RD 1629/2009** (BOE-A-2009-18355). El RA2 oficial es *"Integra ordenadores y periféricos en redes cableadas e inalámbricas, evaluando su funcionamiento y prestaciones"* con CEs **a)–k)** que **no incluyen servicios de red**: el más cercano es **d) "Direccionamiento lógico IP (direcciones y máscaras)"**. Para DHCP existe CE oficial en **RA4·h: "Se ha configurado el router como servidor de direcciones IP dinámicas"** (cubierto de lleno por el punto 3). **DNS solo aparece como "concepto" en los contenidos y NTP no tiene CE ni contenido oficial en PAR** (es ampliación de la casa). ⚠️ Errata de referencia: en sesiones anteriores se citó el "RD 1575/2011", que es del *Técnico en Construcción* — el correcto es **RD 1629/2009**.
  - **O1 (recomendada):** reescribir la tabla con el CE oficial **d)** de RA2 + nota de que DHCP se respalda en **RA4·h** y que DNS/NTP son ampliación sin CE propio en PAR.
  - **O2:** mantener los textos actuales pero etiquetar la tabla como *"criterios propios de programación del módulo"* (no oficiales).
  - **O3:** dejar como está (con la desviación documentada).
- [x] **Misma familia en otras unidades** ✅ **aplicado en la pasada de decisiones:** U03 (fila `RA2·g` → `RA4·h` oficial en índice y cierre), U08 (fila `RA6·i` eliminada, g)/h) con texto oficial + nota de que el diagnóstico no tiene CE propio), U11 (resuelto con su R1), U09 y U12 (resueltos con sus R1).

## 6. Verificación y commit

- [x] `check:unidad 06` sin FALLOs · `check-uds` en 0 · `check-links` OK · build 183 · diagrams 54 (nuevo baseline tras Q1 de U03; era 55) — re-verificado tras la pasada de decisiones
- [x] DOCX regenerado (`npm run docx` → 68/68)
- [x] Comprobación lingüística es-ES ("voluntarios", "colección de relojes…", "solicitadas"; `syslog`/`w32tm`/`nslookup` como términos técnicos)
- [x] Matriz de solapamientos + README de estado actualizados
- [x] Commit `Revisión U06: …` — hecho y pusheado (`8dadbf5`); se marcaba pendiente en la sesión
