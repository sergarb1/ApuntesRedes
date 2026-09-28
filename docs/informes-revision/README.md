# Informes de revisión docente — Apuntes PAR

Revisión **tema a tema** del curso vigente (estructura de **12 unidades**) para dejar el temario **coherente internamente en cada unidad y en bloque entre unidades**: contenido duplicado, contenido fuera de lugar (mover/quitar), huecos, desorden y desviaciones de las convenciones.

## Revisión vigente — estado por unidad

Orden de revisión: **1 → 12** (introducción primero). Alcance por sesión: **teoría (.md) + boletines** de la unidad (diagramas: pasada aparte en el cierre transversal).

| # | Unidad | Estado | Informe |
|---|---|---|---|
| 01 | Introducción | ✅ revisada | [revision-U01-introduccion.md](revision-U01-introduccion.md) |
| 02 | Ethernet y cableado | ✅ revisada | [revision-U02-ethernet-cableado.md](revision-U02-ethernet-cableado.md) |
| 03 | Direccionamiento IP | ✅ revisada | [revision-U03-direccionamiento-ip.md](revision-U03-direccionamiento-ip.md) |
| 04 | Switching y VLAN | ✅ revisada | [revision-U04-switching-vlan.md](revision-U04-switching-vlan.md) |
| 05 | Trunking e inter-VLAN | ✅ revisada | [revision-U05-trunking-inter-vlan.md](revision-U05-trunking-inter-vlan.md) |
| 06 | Servicios de red | ✅ revisada | [revision-U06-servicios-red.md](revision-U06-servicios-red.md) |
| 07 | Enrutamiento estático | ✅ revisada | [revision-U06-enrutamiento-estatico.md](revision-U06-enrutamiento-estatico.md) |
| 08 | OSPF | ✅ revisada | [revision-U07-ospf.md](revision-U07-ospf.md) |
| 09 | NAT y PAT | ✅ revisada | [revision-U09-nat-pat.md](revision-U09-nat-pat.md) |
| 10 | ACL y seguridad | ✅ revisada | [revision-U10-acl-seguridad.md](revision-U10-acl-seguridad.md) |
| 11 | Redes inalámbricas | ✅ revisada | [revision-U11-redes-inalambricas.md](revision-U11-redes-inalambricas.md) |
| 12 | Alta disponibilidad | ✅ revisada | [revision-U12-alta-disponibilidad.md](revision-U12-alta-disponibilidad.md) |
| — | Cierre transversal | ⏳ pendiente | — |

Los informes de la revisión vigente se nombran `revision-UXX-<nombre>.md` (los de la estructura antigua eran `informe-UXX.md`: **no confundir su numeración**).

> ⚠️ **Nota de renumeración (sesión de reorganización del temario):** el orden del curso cambió — Servicios pasó de la 10 a la **6**, Enrutamiento estático de la 6 a la **7**, OSPF de la 7 a la **8** y ACL de la 8 a la **10** (NAT se mantiene en la 9). Los ficheros `revision-UXX-*` **conservan la numeración con la que se escribieron**: `revision-U06-enrutamiento-estatico.md` corresponde hoy a la unidad 07 y `revision-U07-ospf.md` a la unidad 08. Las revisiones escritas **después** de la reorganización usan ya la numeración vigente (empezando por `revision-U10-acl-seguridad.md` = ACL). Esta tabla refleja la numeración vigente.

## Pasada de decisiones aprobadas (28/09/2026)

Se aplicaron de golpe las decisiones 🔴 recomendadas de las sesiones de revisión (aprobar "A en todo"):

- **Tablas CE con texto oficial literal** (RD 1629/2009): O1 de **U06** (RA2·d + RA4·h, nota DNS/NTP), A de **U09** (RA7 a)–f) + bloques *WAN heredada* y *móvil 3G/3.5G* en el punto 7), A de **U11** (RA2·a/e/f/g + RA1·b, seguridad WLAN sin CE), A de **U12** (títulos RA oficiales + mapeo honesto + nota HA sin CE).
- **Mini-fix de la familia**: U03 (`RA2·g` → `RA4·h`) e U08 (fila `RA6·i` fuera; g)/h) oficiales + nota de que el diagnóstico no tiene CE propio).
- **R2-A**: los 9 `title:` de la introducción permutados a su número de fichero/sidebar (canónico = `astro.config.mjs`).
- **Cross-units**: cierre de U08 (relleno `08 ·`, desc "Sé el Router OSPF", footer) y U07 ("Sé el Router" → "Sé el Paquete del cierre").
- **Menores**: U02 filas `RA2·d)`/`RA2·e)` con "→ se verá en…"; enlace de `03-nat-estatico-y-dinamico` a la unidad de ACL; U03-Q1 (diagrama de fragmentación reetiquetado, `u03-frag-hdr` resuelto → `check:diagrams` 55 → **54**, nuevo baseline).
- Verificación: `check:unidad` 0 FALLOs (10 unidades) · `check-uds` 0 · `check-links` 0 · build 183 · DOCX 68/68.
- Quedan 2 decisiones menores de **U10** (CE `b)` y variante del Fallo B) y el cierre transversal.

## Ciclo por sesión (una unidad)

1. Auditoría automática: `npm run check:unidad <unidad>` + `node scripts/check-uds.mjs` + `check-links` + `npm run check:diagrams` + build.
2. Lectura completa de los puntos: orden docente, coherencia interna, datos técnicos, ejercicios/soluciones.
3. Boletines de la unidad: nivel, soluciones, crucigramas, sin spoilers ni imágenes.
4. Fronteras con otras unidades → candidatos a mover/quitar (🔴).
5. Informe con hallazgos `fichero:línea` etiquetados: 🔴 mover/quitar (decisión del profe) · 🟡 corregir ya · 🔵 ampliar · ⚪ dejar.
6. Aplicar 🟡 (+ 🔴 aprobados), regenerar DOCX, verificar, commit `Revisión UXX: …`.
7. Actualizar la matriz de solapamientos y esta tabla de estado.

## Hallazgos transversales del baseline (F0)

Detectados con `check-unidad` antes de empezar (referencia para las sesiones):

- **01 Introducción**: índice sin sección de Criterios de evaluación; `01-que-es-una-red.md` sin pie `Anterior`; índice no enlaza sus boletines; sin bloque ⭐ (¿exento?).
- **RA índice ≠ RA cierre**: 02 (RA1/RA2 vs RA2), 03 (RA1/RA2/RA4/RA6 vs RA2), 04 (RA3/RA5 vs RA5) — los tres resueltos en sus sesiones (02, 03 y 04); alineadas además las tablas CE con el patrón de letras oficial (RA5·a–f en la sesión 04).
- **Nombres de sección con variantes** (documentadas en AGENTS): `Sé el Paquete/Bit/Router OSPF/NAT`; `Entrevista de trabajo` vs `Preguntas de entrevista de trabajo`.
- Ver también [matriz-solapamientos.md](matriz-solapamientos.md).

## Revisión histórica (estructura antigua de 13 unidades)

En [`historico/`](historico/) están los informes de una revisión anterior, cuando el curso tenía **13 unidades con otra numeración** (allí U07 = Switching y STP, hoy 07 = OSPF): sirven como checklist de estilo, **no como mapa del temario actual**.

Problemas sistémicos de aquella revisión (ya corregidos entonces): enlaces de boletines rotos en los índices, pistas ausentes en boletines iniciales y conteos de crucigrama erróneos en varias unidades.
