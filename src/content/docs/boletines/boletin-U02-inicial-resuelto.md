---
title: Boletín de Ethernet y cableado — Inicial (Resuelto)
description: Soluciones de los ejercicios básicos de Infraestructura Física, OSI y trama Ethernet
---

# ✅ Boletín de Ethernet y cableado — Inicial (Resuelto)

---

## 1. Identifica el cable

1 → b (Directo: PC a switch)
2 → a (Cruzado: PC a PC)
3 → c (Consola: configuración switch)

## 2. ¿Qué categoría?

a) **Cat6** — 1 Gbps a 100 m, estándar actual en oficinas
b) **Cat6a o superior** — 10 Gbps a 100 m
c) **Cat5e** — 1 Gbps a 100 m, más barato que Cat6

## 3. Verdadero o falso

a) **Falso.** La fibra usa pulsos de LUZ (fotones), no electricidad.
b) **Verdadero.** T568B: pin 1 = Blanco/Naranja, pin 2 = Naranja.
c) **Verdadero.** 4 pares trenzados = 8 hilos.
d) **Verdadero.** Auto MDI-X detecta el tipo de cable y ajusta la interfaz.
e) **Falso.** La diafonía (crosstalk) es la interferencia entre pares. La pérdida con la distancia es atenuación.

## 4. Ordena el crimpado

1. b) Pelar la funda exterior del cable
2. d) Ordenar los hilos según T568B
3. e) Cortar los hilos rectos
4. a) Insertar los hilos en el conector RJ45
5. f) Crimpar con la crimpadora
6. c) Comprobar el cable con un tester

## 5. Relaciona concepto y definición

1 → d (Atenuación)
2 → a (Diafonía)
3 → b (Ancho de banda)
4 → c (Latencia)

## 6. Sopa de letras de conectores

a) **RJ45** — Conector de 8 pines para cable UTP (cobre)
b) **LC** — Conector de fibra óptica, pequeño, tipo push-pull
c) **SC** — Conector de fibra óptica, cuadrado, push-pull

## 7. Cableado estructurado

1 → b (Latiguillo: flexible, une PC con roseta o patch panel con switch)
2 → c (Keystone: conector hembra RJ45 en la roseta de pared)
3 → a (Patch panel: concentra los cables horizontales en el rack)
4 → d (Cable horizontal: sólido, empotrado, del patch panel al keystone)

> 💡 **La idea:** el latiguillo es la parte flexible y desechable; el cable horizontal es la parte fija que no se toca nunca. El keystone es donde termina en la pared y el patch panel donde concentra el rack.

## 8. Medios y estándares: verdadero o falso

a) **Falso.** La fibra es INMUNE a las interferencias electromagnéticas: transmite luz, no electricidad, y los campos externos no afectan a los fotones.
b) **Verdadero.** El cobre UTP es sensible a la interferencia electromagnética externa (motor, fluorescente…): de ahí el trenzado de los pares.
c) **Verdadero.** 1000BASE-T (Gigabit Ethernet) trabaja sobre par trenzado de cobre Cat5e o superior.
d) **Falso.** Es la fibra **monomodo** la que llega a 40+ km. La **multimodo** se queda en unos 550 m a 10 Gbps.
e) **Verdadero.** La monomodo está pensada para enlaces largos (cientos de metros y kilómetros); la multimodo, para distancias cortas/medias.

## 9. Modelo OSI: capas y PDUs

**Matching:** 1 → b (bits) · 2 → c (trama) · 3 → a (paquete) · 4 → d (segmento)

**V/F:**

a) **Falso.** OSI es un **modelo teórico** (7 capas, ISO); en Internet corre **TCP/IP**.
b) **Verdadero.** TCP/IP es la pila real; OSI es el mapa de examen y de diagnóstico.
c) **Verdadero.** Medios y cableado = capa 1; trama Ethernet = capa 2.
d) **Verdadero.** "Capa 3", "capa Red" y "capa de red" apuntan a lo mismo (IP, routers).

## 10. La trama Ethernet

a) **Dest MAC (6 B), Src MAC (6 B) y EtherType (2 B).**
b) **IPv4** (0x0800).
c) **Mínimo 46 bytes** de payload (60 en total con cabecera+FCS) y **máximo 1500** (MTU); con cabeceras, la trama clásica se queda en **1518 bytes**.
d) **FCS** = CRC de 4 bytes de integridad (capa 2). Si no cuadra → la trama se **descarta** (errores CRC).
e) La calcula quien **envía** (la NIC o el switch al reenviar) y la comprueba quien la **recibe**; si falla, el receptor la descarta sin subirla.

**V/F:**

f) **Verdadero.** El mínimo de payload es 46 bytes (60 totales con cabecera de 14 y FCS de 4).
g) **Falso.** El WiFi **también es capa 2**: entrega local por MAC; el aire es solo el medio (capa 1).