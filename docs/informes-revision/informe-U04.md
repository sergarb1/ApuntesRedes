# Informe docente — U04 · Infraestructura física

**Estado global: 4 / 5**

Unidad de muy alta calidad docente: progresión motivadora, explicaciones con contexto y analogías, jerga en primer uso, datos técnicos verificados correctos y boletines sólidos. El lastre son erratas de acabado (typo en laboratorio, tres pistas de crucigrama erróneas, solución del boletín avanzado con 200m de cobre) e imprecisiones menores.

---

## Orden docente

- ✅ Progresión buena: tangible (medios, UTP) → práctica (crimpado en el punto 4, motivador) → teoría abstracta (conceptos físicos en el punto 7) → cableado estructurado (8).
- ✅ El punto 7 recibe 3 referencias hacia delante, todas con mini-definiciones de contexto. No recomendado moverlo (adelantar física abstracta mataría el arranque). Opcional: encajaría mejor justo antes del punto 6 (WiFi).

## Calidad de explicación

- ✅ Analogías memorables: ascensor para el trenzado, autopista/peajes para ancho de banda vs throughput, "el bit agotado".
- ✅ Jerga en primer uso: UTP, T568A/B, monomodo/multimodo, SFP, latencia/atenuación/diafonía/jitter/SNR, OM/OS.
- ✅ Ejemplos numéricos con contexto: latencias, 100 Mbps = 12,5 MB/s, umbral en dB, distancias.
- ✅ Dosificación just-in-time del split pair.
- 🟡 El "fallo clásico de examen" (03:92) está redactado de forma enrevesada (Auto MDI-X).
- 🟡 La ficha de vocabulario dice que throughput es "la realidad medida en bytes" (07:131); se mide en bps.

## Contenido

- 🔴 `09-cierre.md:133` — typo: "unos pares **incorrectosares incorrectos** (split pair)" (palabra duplicada/cortada).
- 🔴 `09-cierre.md:182,184,190` — pistas de longitud del crucigrama erróneas: TESTER (6 no 8), AC (2 no 9), LATENCIA (8 no 7).
- 🔴 `boletin-U04-avanzado-resuelto.md:53` — "200 m: Cobre Cat6a (funciona a 10 Gbps hasta 100 m) o fibra multimodo": ofrece cobre para 200 m contradiciendo el límite de 100 m que la propia unidad enseña; contradice además la respuesta b) (57: fibra OM3/OM4).
- 🟡 `01-medios-de-transmision.md:28` — el aire "0,1-9,6 Gbps" contradice el WiFi 7 a 46 Gbps del punto 6.
- 🟡 `02:39` — "pines adyacentes (1-2, 3-6, 4-5, 7-8)": los pares naranja/verde (3-6) no son adyacentes.
- 🟡 `04:54` — tabla del tester: split pair detectado con "LEDs del 4 al 7" contradice "el tester básico a veces muestra todo en orden" (04:64).
- 🟡 `09:124-133` — los cables 1 y 3 tienen el mismo fallo planificado (crossover) + el 3 un segundo fallo; ambigüedad.
- ✅ Categorías UTP, pinouts, distancias, velocidades WiFi, dB, pares: correctos.

## Boletines

- ✅ Cobertura completa de los 9 puntos, graduación correcta, 8+8, soluciones 1:1 (salvo el caso del cobre de 200m), pistas en 7/8 del avanzado.
- 🟡 El título "Sopa de letras de conectores" (inicial Q6) no es una sopa de letras.

## Coherencia y convenciones

- ✅ 16 referencias "punto N" todas correctas; U0X correctas; CEs índice/cierre coherentes.
- ✅ `<details>`, es-ES, estilo oracional, formato numérico es-ES correctos.

## Recomendaciones

1. Corregir el typo "incorrectosares incorrectos".
2. Arreglar las tres pistas del crucigrama (TESTER 6, AC sin conteo o 8, LATENCIA 8).
3. Eliminar "Cobre Cat6a" de la solución de 200 m.
4. Actualizar el techo WiFi del punto 1 a 46 Gbps o matizar generación.
5. "pines adyacentes" → "pines asignados a cada par".
6. Matizar la fila de split pair de la tabla del tester.
7. Aclarar en el laboratorio que el cable 3 lleva dos fallos.
8. Reescribir el "fallo clásico de examen" (03:92).