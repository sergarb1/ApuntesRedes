# Informe docente — U13 · Cloud, virtualización y futuro (cierre del curso)

**Estado global: 4 / 5**

Unidad de cierre de altísima calidad docente: coherente, con analogías efectivas, jerga en primer uso, laboratorio con fallo intencionado y un cierre que de verdad "cierra el curso" (sin PRÓXIMAMENTE EN U14). Las reservas: una incoherencia factual real en la tabla de CEs (UMTS/HSDPA) y un par de pulidos menores.

---

## Orden docente y cierre del curso

- ✅ Orden óptimo: modelos cloud→virtualización→Docker→SDN→NFV→cloud networking→IoT/5G/edge→futuro→cierre.
- ✅ Progresión de acumulación conceptual: "qué comprar" (01) → "dónde corre" (02) → contenedores (03) → red programable (04/05) → cuadro aplicado AWS (06) → cabos (07) → horizonte (08).
- ✅ Cierre de curso impecable: **no hay "PRÓXIMAMENTE EN U14"**; Poscréditos terminan con "FIN (de la asignatura, no del aprendizaje)" (09:201-207). Recorre todas las secciones obligatorias + Logros Finales "Network Master".

## Calidad de explicación

- ✅ IaaS/PaaS/SaaS con múltiples analogías convergentes (piso, restaurante, menú, árbol de decisión).
- ✅ Hypervisors/VRF, Docker (VM vs contenedor, 4 modos, veth), SDN/OpenFlow (regla de flujo, ciclo packet-in/flow-mod, punto débil del controlador), NFV, AWS SG vs NACL, edge: todos bien explicados.
- ✅ Jerga en primer uso sistemática (IaaS/PaaS/SaaS, VRF, VXLAN, SDN, NFV/VNF, VPC/NACL, SLAAC, RINA/DIF, NDN).

## Contenido

- 🔴 **Tabla de CEs contradictoria sobre UMTS/HSDPA**: `13-cloud-virtualizacion-futuro.md:75` dice "❌ No cubierto" (correcto), pero `09-cierre.md:217` dice "✅ Mencionado en U11" (falso — verificado: UMTS/HSDPA no aparece en ningún punto del repo). Contradicción entre índice y cierre de la misma unidad.
- 🟡 Diagrama de subred pública (06:44-46): "NAT Gateway" y "Web Server" juntos en "Subnet pública"; no es error (el NAT vive en subred pública) pero puede confundir visualmente.
- ✅ SG stateful vs NACL stateless, NACL solo CIDRs (no SG), puertos Docker 4789/7946, overlay/veth (no TUN), ADSL no es conmutación de circuitos, Frame Relay/RDSI/ADSL en punto 8: correctos.

## Boletines

- ✅ 8+8 ejercicios, soluciones 1:1 completas, graduación correcta.
- ✅ Pistas en 7 y 8 de ambos.
- ✅ El avanzado 8 (incidente de seguridad que obliga a diagnosticar la defensa en profundidad) es un excelente ejercicio de cierre.
- 🟡 Avanzado 5b menciona "Route 53 (DNS)" y "ELB" no introducidos en la unidad; aceptable en boletín avanzado de investigación.

## Coherencia

- ✅ Referencias U08/U11/U12 correctas; "punto N" correctos; la cadena del paquete U01→U13 se insinúa en el Poscréditos.

## Convenciones

- ✅ `<details>`, es-ES, estilo oracional, formato numérico correctos.

## Recomendaciones

1. 🔴 Corregir `09-cierre.md:217`: UMTS/HSDPA → "❌ No cubierto" para que coincida con el índice (13:75). No dejar las dos tablas en contradicción.
2. 🟡 Etiquetar mejor el NAT Gateway en el diagrama (06:44-46) como "en subred pública".
3. No tocar el resto: orden, cierre, SG/NACL, terminología veth/VXLAN y boletines están muy bien logrados.