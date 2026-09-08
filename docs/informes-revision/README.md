# Informes de revisión docente — Apuntes PAR

Revisión unidad a unidad del curso completo (U01–U13), enfocada en **orden docente**, **calidad de la explicación**, **contenido**, **boletines**, **coherencia** y **convenciones**. Realizada con subagentes de revisión pedagógica por unidad.

## Ranking global

| Unidad | Nota | Juicio |
|---|---|---|
| U07 · Switching y STP | 5/5 | Orden impecable; única laguna: tabla de costes STP ausente en teoría |
| U08 · VLANs | 5/5 | Orden ideal, explicaciones memorables, boletines sobresalientes |
| U09 · Routing y ACLs | 5/5 | Óptimo; solo matices de presentación |
| U01 · Introducción | 4,5/5 | Excelente; pulido editorial |
| U05 · IPv4 y subnetting | 4,5/5 | Todos los cálculos correctos; pulido |
| U12 · Diagnóstico y monitorización | 4,5/5 | Muy sólida; caso práctico solo reactivo |
| U02 · Fundamentos de redes | 4/5 | Orden 04/05 invertible + error de conteo en boletín |
| U03 · Modelos OSI y análisis | 4/5 | Adelantos pedagógicos + 2 defectos de acabado |
| U04 · Infraestructura física | 4/5 | Erratas de acabado + cobre a 200m en boletín |
| U06 · IPv6 y transición | 4/5 | Técnicamente impecable; boletín avanzado ambiguo |
| U10 · Routing dinámico OSPF | 4/5 | Pista errónea de timers + incoherencias menores |
| U11 · NAT y acceso a Internet | 4/5 | Tabla NAT truncada + IPsec AH/ESP impreciso |
| U13 · Cloud, virtualización y futuro | 4/5 | Gran cierre; tabla CE UMTS/HSDPA contradictoria |

## Problemas sistémicos detectados

1. **Enlaces de boletines rotos en los índices** (sin prefijo `boletin-`): afectaba a U02-U13. **Corregido.**
2. Falta de **pistas en los boletines iniciales** de varias unidades (U01, U02, U03, U04, U05, U06, U11).
3. Algunos **crucigramas con conteos de letras erróneos** (U02, U03, U04, U05, U11).

## Recomendaciones transversales

- Unificar la ubicación de **ARP** (capa 2) en todo el curso (U02, U03).
- Añadir pistas a los boletines iniciales donde falten.
- Revisar los conteos de letras de los crucigramas.
- Corregir los matices factuales marcados en cada informe (AH/ESP, pool /29, tabla STP de costes, UMTS/HSDPA, tabla NAT truncada, timers OSPF).

## Estado de corrección

Los hallazgos identificados se aplican en la Fase E (corrección). Ver `git log` para el commit de revisión.