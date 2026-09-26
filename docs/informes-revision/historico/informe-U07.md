# Informe docente — U07 · Switching y STP

**Estado global: 5 / 5**

Unidad excelente. El orden didáctico es impecable: cada punto construye el siguiente y STP llega justo cuando el alumno ya ha sentido el problema (tormenta de broadcast). La explicación de STP es de las mejores del conjunto: analogías pertinentes, jerga en primer uso y datos factuales correctos. Única laguna: la tabla de costes de camino por velocidad se exige en el boletín avanzado pero no se presenta en la teoría.

---

## Orden docente

- ✅ Secuencia óptima: switch→aprendizaje MAC→dominios→tormenta→STP→puertos/estados→RSTP/PortFast→Port Security→cierre.
- ✅ STP llega en el momento óptimo (tras la tormenta). Port Security conecta con el CAM flooding.
- ✅ Dependencias hacia delante bien gestionadas como adelantos señalizados.

## Calidad de explicación

- ✅ Analogías pertinentes y reutilizadas: metro con una línea activa, repartidor que llama a la puerta correcta, centralita, hub=altavoz.
- ✅ Jerga en primer uso: BPDU, CAM, flooding, errdisable, edge port.
- ✅ Tabla de prioridades clara (Bridge ID, desempate prioridad→MAC, ejemplo 32768 vs 28672).
- 🟡 **La tabla de costes de camino por velocidad NO está en la teoría** (el único "coste" en teoría es el campo de la BPDU, sin valores numéricos), pero el boletín avanzado la exige (100 Mbps→19, 1 Gbps→4).

## Contenido

- ✅ Todos los puntos factuales correctos: prioridades, costes 19/4 (en boletines), elección Root, estados, BPDU 2s, Max Age 20s, RSTP 1-3s, PortFast/BPDUGuard, Port Security (max/sticky/violation), convergencia 30 vs 50s matizada.
- 🟡 Omisión didáctica: falta la tabla de costes por velocidad en los puntos 5 o 6.

## Boletines

- ✅ 8+8 ejercicios, soluciones 1:1, graduación correcta, pistas en los difíciles.
- ✅ La solución del inicial matiza bien los 30s sin fallos vs 50s con Max Age.
- 🟡 El avanzado 4b responde "aproximadamente 3 puertos bloqueados" (vago).
- 🟡 Los ejercicios 6 y 7 del avanzado exigen los costes 19/4 que la teoría no enseña.

## Coherencia

- ✅ Referencias "punto N" y VLANs=U08 correctas; CEs RA3 índice/cierre coherentes.

## Convenciones

- ✅ `<details>`, es-ES, estilo oracional, formato numérico correctos.

## Recomendaciones

1. Añadir la tabla de costes STP por velocidad (10M→100, 100M→19, 1G→4, 10G→2) en el punto 5 o 6.
2. Opcional: cifra concreta en el 4b del avanzado.
3. No tocar el resto: orden, analogías, jerga, convergencia y referencias están correctos.