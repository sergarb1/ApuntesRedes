---
title: Boletín de Medios y cableado — Inicial (Resuelto)
description: Soluciones de los ejercicios básicos de Infraestructura Física de Red
---

# ✅ Boletín de Medios y cableado — Inicial (Resuelto)

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

## 6. Conectores: nómbralos

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


## 9. Topologías: identifícalas

a) **Punto a punto** — dos equipos y un solo enlace; simple, pero sin alternativa si se cae.
b) **Bus** — un cable central compartido; barato, pero el cable es un punto único de fallo para toda la red.
c) **Estrella** — cada puesto con su cable al switch: el fallo se queda en un PC.
d) **Anillo** — circuito cerrado con un vecino a cada lado.
e) **Malla** — enlaces directos entre nodos con caminos alternativos.

## 10. Topologías: elige y justifica

a) **Estrella:** al cada PC tener su propio cable al switch, el que se desconecta se queda solo sin tocar al resto.
b) **Estrella (la solución):** en bus, el corte del cable central paraba toda la red; con estrella el fallo se aísla por puesto. (El enunciado describe el problema clásico de la bus.)
c) **Punto a punto:** son dos extremos y un solo enlace; no hace falta nada más.
d) **Malla (parcial):** los caminos alternativos permiten esquivar la caída de un enlace; por eso los núcleos de operadores y los datacenters se diseñan en malla.
