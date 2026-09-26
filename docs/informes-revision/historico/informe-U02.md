# Informe docente — U02 · Fundamentos de redes

**Estado global: 4 / 5**

Unidad didácticamente sólida: estructura coherente, analogías de alta calidad, mini-chequeos con `<details>`, cierre rico en secciones y referencias cruzadas correctas. Se penaliza por el problema real de orden (punto 04 usa OSI antes de que el 05 lo explique), un error de conteo en el boletín resuelto y tres deslices factuales menores.

---

## Orden docente

- 🔴 **Punto 04 usa el modelo OSI antes de que el 05 lo defina.** `04-dispositivos.md:14` ("el truco está en saber en qué **capa del modelo OSI** trabaja"), tabla "El mapa por capas" (04:20-31), "capa 2 (Enlace)" (04:96). Progresión óptima sería 01→02→03→05→04 (primero el concepto de capa, luego dispositivos por capa). Recuperable con un `<details>` de 2 líneas en 04 o invirtiendo 04↔05.
- 🟡 El mini-chequeo de 04:135-141 exige gateway y DNS, conceptos que solo se definen en el punto 08. Dependencia problemática en un autotest.
- 🟡 04 usa IP/MAC/gateway antes del punto 07; menor (01 y 06 ya anticipan IP).
- ✅ Referencias hacia delante como "sigue leyendo" bien usadas.

## Calidad de explicación

- ✅ Analogías de gran calidad (barrio, carretera/carriles, oficina/secretaria-mensajero-jefe, DNI/código postal, cartero/megáfono).
- ✅ Jerga definida en primer uso: PDU, RTT, OUI, APIPA, three-way handshake, next-hop, encapsulación.
- ✅ Ejemplos resueltos completos (cablear 30 PCs, red de casa, aprendizaje del switch, petición web, ping 8.8.8.8). El ejemplo guiado del switch (04:115-128) es excelente.
- 🟡 "inunda la trama" (04:51) sin analogía previa. La explicación de la máscara (07:60) es densa. La analogía de la oficina salta las capas 5-6 (05:24-28).

## Contenido

- 🔴 `boletin-U02-avanzado-resuelto.md:36-39` — conteo de dominios de colisión: el enunciado incluye "un router al final" (avanzado.md:35) pero la solución cuenta 5 (3 PCs + 2 enlaces) omitiendo el enlace Switch3→router → debería ser **6**.
- 🟡 `02:32` — "PAN (del latín *personal*)": personal es inglés, no latín.
- 🟡 `02:142` — "MAN o una WAN de distrito": contradice la definición de WAN; para 3 edificios la respuesta correcta es CAN/MAN.
- 🟡 `05:50` — SQL como ejemplo de capa de Sesión (discutible); `05:49` TLS en Presentación (ubicación debatible).
- ✅ Velocidades Ethernet (10/100/1000/10G), puertos, rangos privados, /24, MAC 48 bits, comandos: todos correctos.

## Boletines

- ✅ 8+8 ejercicios, soluciones 1:1, graduación correcta, pistas en todo el avanzado.
- 🟡 El inicial no tiene pistas (rompe simetría).
- 🟡 Ningún boletín evalúa la arquitectura cliente-servidor vs P2P (objetivo del índice).

## Coherencia

- ✅ Todas las referencias "punto N"/"U0X" correctas (verificadas contra los ficheros).

## Convenciones

- ✅ `<details>` en todo, es-ES natural, estilo oracional, formato numérico correcto.
- 🟡 Los puntos 01-08 no incluyen la sección "📚 Contenidos" que pide AGENTS.md (decisión de diseño consistente).

## Recomendaciones

1. 🔴 Invertir 04↔05 o añadir mini-introducción de capas en 04.
2. 🔴 Corregir el conteo de dominios de colisión del boletín avanzado (6, no 5).
3. 🟡 Resolver dependencia del mini-chequeo 04:135-141.
4. 🟡 PAN (inglés, no latín); "WAN de distrito" (CAN/MAN); TLS/SQL.
5. 🟡 Añadir pistas al boletín inicial y un ejercicio cliente-servidor.