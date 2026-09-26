# Informe docente — U08 · VLANs

**Estado global: 5 / 5**

Unidad didáctica de calidad sobresaliente. El orden docente es exactamente el ideal, las explicaciones son claras y con analogías memorables, la jerga se expande en el primer uso, el contenido es riguroso (solo un desliz menor en el desglose del tag 802.1Q) y los boletines están bien graduados y resueltos 1:1. Cumplimiento disciplinado de convenciones.

---

## Orden docente

- ✅ Orden real coincide punto a punto con el ideal: qué es VLAN→tipos→trunks/802.1Q→inter-VLAN routing→switch capa 3→VTP/DTP→seguridad→configuración→cierre.
- ✅ Configuración (punto 8) tras toda la teoría, justificado explícitamente (08:16).
- ✅ Transición "aislar" (1-3) → "volver a unir" (4-5) lógica. VTP/DTP y seguridad bien colocados.

## Calidad de explicación

- ✅ Analogías memorables: pasaporte/frontera Schengen, "el palo y las pelotas", bibliotecario/biblioteca, celdas de biblioteca (PVLAN), bomba de relojería (revision number VTP).
- ✅ Jerga en primer uso: VLAN, 802.1Q, trunk, VTP/DTP, VACL/PVLAN, SVI.
- ✅ Desglose visual del tag 802.1Q con diagrama ASCII.
- 🟡 El mini-chequeo de 02:99 cita "802.1p (PRI)" antes de su explicación formal en el punto 3 (referencia adelantada menor).

## Contenido

- 🟡 **Omisión del bit CFI/DEI en el desglose del tag 802.1Q**: `03-trunks-y-8021q.md:30-33,36-42` descomponen "TPID (2 bytes) | PRI (3 bits) | VLAN ID (12 bits)" = 31 bits, no los 4 bytes (32) que se declaran. Falta el bit DEI/CFI (1 bit) del TCI. Se repite en el mini-chequeo (03:140) y en el boletín inicial resuelto (:34).
- ✅ VLAN IDs 1-4094, native sin etiquetar, subinterfaces + encapsulation dot1Q, VACL con forward/drop, double tagging, topología Fa0/23/Fa0/24: correctos.

## Boletines

- ✅ 8+8 ejercicios, soluciones 1:1 razonadas, graduación excelente, pistas en el avanzado.
- ✅ El avanzado 5 (aritmética 120 Mbps sobre 100/1000) es un buen puente teoría-diseño.

## Coherencia

- ✅ Referencias U07/U09 correctas y bidireccionales; "punto N" correctos; CEs RA5 coherentes.

## Convenciones

- ✅ `<details>`, es-ES (0 anglicismos en prosa), estilo oracional, formato numérico, personajes: correctos.

## Recomendaciones

1. Completar el desglose del tag 802.1Q con el bit DEI/CFI (1 bit) en 03:30-33, 03:140 y boletin-U08-inicial-resuelto:34.
2. Opcional: nota "lo verás en el punto 3" en 02:99.
3. Opcional: unificar el valor de referencia native (99 vs 999) en los ejemplos.