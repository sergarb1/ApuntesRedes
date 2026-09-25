---
title: Boletín de Ethernet y cableado — Inicial
description: Ejercicios básicos de Infraestructura Física de Red (medios, cableado, OSI y trama)
---

# 📝 Boletín de Ethernet y cableado — Inicial

> Ejercicios básicos para afianzar los conceptos de medios físicos, cableado, crimpado, modelo OSI y trama Ethernet.

---

## 1. Identifica el cable

Relaciona cada tipo de cable con su uso:

| Cable | Uso |
|---|---|
| 1. Directo | a) PC a PC |
| 2. Cruzado | b) PC a switch |
| 3. Consola | c) Configuración inicial de un switch Cisco |

## 2. ¿Qué categoría?

Indica qué categoría de cable UTP necesitas para cada situación:

a) Red de oficina a 1 Gbps
b) Datacenter con 10 Gbps a 100 metros
c) Cableado económico para una pequeña empresa

## 3. Verdadero o falso

a) La fibra óptica usa pulsos eléctricos para transmitir datos.
b) El estándar T568B pone el par naranja en los pines 1 y 2.
c) Un cable UTP tiene 4 pares de hilos (8 hilos en total).
d) El Auto MDI-X permite usar cables directos entre switches.
e) La diafonía es la pérdida de señal con la distancia.

## 4. Ordena el crimpado

Ordena los pasos para crimpar un cable RJ45 (del 1 al 6):

a) Insertar los hilos en el conector RJ45
b) Pelar la funda exterior del cable
c) Comprobar el cable con un tester
d) Ordenar los hilos según T568B
e) Cortar los hilos rectos
f) Crimpar con la crimpadora

## 5. Relaciona concepto y definición

| Concepto | Definición |
|---|---|
| 1. Atenuación | a) Interferencia entre pares de hilos adyacentes |
| 2. Diafonía | b) Capacidad máxima de transmisión de un medio |
| 3. Ancho de banda | c) Tiempo de ida y vuelta de un paquete |
| 4. Latencia | d) Pérdida de intensidad de la señal con la distancia |

## 6. Sopa de letras de conectores

Nombra estos conectores y el medio en el que se usan:

a) RJ45
b) LC
c) SC

## 7. Cableado estructurado

Relaciona cada elemento del cableado estructurado con su función:

| Elemento | Función |
|---|---|
| 1. Latiguillo | a) Concentra los cables horizontales en el rack |
| 2. Keystone | b) Cable flexible que une el PC con la roseta (o el patch panel con el switch) |
| 3. Patch panel | c) Conector hembra RJ45 en la roseta de pared |
| 4. Cable horizontal | d) Cable sólido empotrado que va del patch panel al keystone |

## 8. Medios y estándares: verdadero o falso

Indica si cada afirmación es verdadera (V) o falsa (F) y corrige las falsas:

a) La fibra óptica se ve afectada por las interferencias electromagnéticas.
b) El cobre UTP se ve afectado por la interferencia electromagnética externa.
c) El estándar 1000BASE-T trabaja sobre par trenzado de cobre.
d) La fibra multimodo llega a distancias de más de 40 km.
e) La fibra monomodo se usa para enlaces largos (cientos de metros o kilómetros).

## 9. Modelo OSI: capas y PDUs

Relaciona cada capa OSI con la PDU que "viaja" en ella:

| Capa | PDU |
|---|---|
| 1 · Física | a) Paquete |
| 2 · Enlace | b) Bits |
| 3 · Red | c) Trama |
| 4 · Transporte | d) Segmento |

Indica además si cada frase es verdadera (V) o falsa (F) y corrige las falsas:

a) OSI es el modelo de 7 capas que corre de verdad en Internet.
b) TCP/IP es la pila real; OSI se usa como mapa para hablar y diagnosticar.
c) Esta unidad vive sobre todo en las capas 1 y 2.
d) "Capa 3" y "capa Red" son sinónimos en el lenguaje de clase.

## 10. La trama Ethernet

Contesta sobre una trama Ethernet II (la de cobre y fibra):

a) ¿Qué tres campos de dirección/tipo lleva siempre al principio (cabecera de 14 bytes)?
b) Si Wireshark muestra EtherType `0x0800`, ¿qué protocolo hay dentro?
c) ¿Qué tamaño mínimo y máximo tiene el payload de la trama Ethernet?
d) ¿Qué significa FCS y qué pasa si no cuadra?
e) ¿Quién calcula y quién comprueba el FCS en un cableado con switch?

V/F:

f) El payload mínimo de una trama Ethernet es de 46 bytes (60 con cabecera+FCS).
g) El WiFi (802.11) NO es capa 2 porque no hay cable.