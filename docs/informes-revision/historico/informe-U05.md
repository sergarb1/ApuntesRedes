# Informe docente — U05 · IPv4 y subnetting

**Estado global: 4,5 / 5**

Unidad muy sólida. La progresión es óptima, **todos** los cálculos verificados cuadran, la jerga se define en primer uso y las analogías aterrizan bien. No hay errores de cálculo. Defectos menores: enlace de boletines en el índice (ya corregido en Fase A), incoherencia de letras en el crucigrama y errata en un resuelto.

---

## Orden docente

- ✅ Secuencia coincide 1:1 con la óptima: estructura→binario/AND→clases→privadas/públicas→máscaras/CIDR→subnetting→VLSM→DHCP→cierre.
- ✅ Binario→clases correcto (las clases se leen por los primeros bits); clases→privadas correcto; VLSM llega en buen momento (tras subnetting de máscara fija, antes de DHCP).
- ✅ Flujo de lectura bien marcado en el índice (05:50).

## Calidad de explicación

- ✅ Subnetting paso a paso con 4 pasos memorizables y ejemplo /24→4×/26 desarrollado en binario y decimal.
- ✅ VLSM con máscara mínima justificada (2ʰ−2 ≥ hosts), encadenado verificado y bloque libre.
- ✅ Jerga en primer uso: octeto, broadcast, máscara, CIDR, "hosts útiles vs IPs totales".
- ✅ Analogías: número de casa/vecindario, Netflix segunda sala, conserje (DHCP), megáfono en biblioteca, dos Juanes en ciudades distintas.

## Contenido

- 🔴 `05-ipv4-subnetting.md:59-62` — enlaces de boletines `/boletines/u05-...` sin prefijo `boletin-` (404). **Ya corregido en la Fase A.**
- 🟡 `09-cierre.md:187` — pista "Rango de IPs privadas 192.168.0.0/16 (**4 letras**)" pero la solución es CLASE (5 letras).
- 🟡 `boletin-U05-avanzado-resuelto.md:134` — "Ventas acaba en .63" pero el ejercicio 7 usa Producción/Comercial/Soporte/Enlace WAN ("Ventas" es del ejercicio 6).
- 🟡 "tabla completa /30 a /8" (05:44, 05-mascaras:73) omite /20-/17 y /15-/9.
- 🟡 Formato "16M" (03:27, 05-mascaras:88) donde el resto usa separadores es-ES (16.777.216).
- ✅ Todos los cálculos verificados correctos (tabla hosts, subnetting /26, VLSM, laboratorio 212/256, AND, sumarización /22, plan /22).

## Boletines

- ✅ Cobertura de los 9 puntos, graduación correcta, 8+8, soluciones 1:1 verificadas (todos los cálculos cuadran).
- ✅ Pistas en 5/8 del avanzado; el inicial solo 1 (ex. 8 podría merecer una).
- 🟡 Errata "Ventas"→"Producción" en avanzado resuelto:134.

## Recomendaciones

1. Arreglar el crucigrama (CLASE = 5 letras; o cambiar pista).
2. Corregir "Ventas" → "Producción" en el resuelto avanzado.
3. Suavizar "tabla completa" → "tabla rápida /30 a /8" o completar saltos.
4. Unificar "16M" → "16.777.216".
5. Añadir pista al ejercicio 8 del inicial.
6. Aclarar en 01:73 que 0.0.0.0/0 como destino es la ruta por defecto (vs "0.0.0.0 = esta red" como origen).