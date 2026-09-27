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
| 05 | Trunking e inter-VLAN | ⏳ pendiente | — |
| 06 | Enrutamiento estático | ⏳ pendiente | — |
| 07 | OSPF | ⏳ pendiente | — |
| 08 | ACL y seguridad | ⏳ pendiente | — |
| 09 | NAT y PAT | ⏳ pendiente | — |
| 10 | Servicios de red | ⏳ pendiente | — |
| 11 | Redes inalámbricas | ⏳ pendiente | — |
| 12 | Alta disponibilidad | ⏳ pendiente | — |
| — | Cierre transversal | ⏳ pendiente | — |

Los informes de la revisión vigente se nombran `revision-UXX-<nombre>.md` (los de la estructura antigua eran `informe-UXX.md`: **no confundir su numeración**).

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
