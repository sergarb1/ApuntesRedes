---
title: Boletín de Ethernet y cableado — Avanzado
description: Ejercicios avanzados de Infraestructura Física, diagnóstico por capas y trama
---

# 📝 Boletín de Ethernet y cableado — Avanzado

> Ejercicios que requieren aplicar los conceptos de cableado, medios físicos, OSI y trama de forma combinada. En los difíciles tienes pista.

---

## 1. Diagnóstico de cableado

Un usuario reporta que su PC solo alcanza 100 Mbps en lugar de 1 Gbps. El switch es Gigabit, el cable es Cat5e y el PC tiene una tarjeta Gigabit.

a) ¿Cuáles pueden ser las causas?
b) ¿Qué herramienta usarías para diagnosticar?
c) ¿Cómo probarías si el problema es el cable, el PC o el switch?

**Pista:** Gigabit Ethernet requiere los 4 pares. Si solo 2 pares están conectados, la negociación cae a 100 Mbps.

## 2. Diseño de cableado estructurado

Diseña el cableado para una oficina de 2 plantas:

**Planta 1:** 40 puestos de trabajo + sala de servidores
**Planta 2:** 30 puestos de trabajo

Especifica:
a) Cuántos switches necesitas y de qué tipo
b) Qué categoría de cable usas para puestos y para uplinks
c) Dónde colocas los patch panels
d) Cómo conectas las dos plantas

**Pista:** Piensa en términos de cable horizontal, patch panels, y uplinks entre plantas. La fibra para uplinks entre plantas es una buena práctica.

## 3. Cálculo de atenuación

Un cable UTP Cat6 tiene una atenuación máxima de 21,3 dB a 100 MHz para 100 metros. La señal del transmisor tiene una potencia de 2 dBm.

a) ¿Qué potencia llega al receptor después de 100 m?
b) Si el receptor necesita al menos -20 dBm para interpretar la señal, ¿funciona?
c) ¿Qué pasa si el cable mide 120 metros?

**Pista:** Potencia recibida = Potencia transmitida - Atenuación. La atenuación es proporcional a la distancia.

## 4. Fibra vs cobre: caso real

Eres el administrador de un campus universitario con 3 edificios separados por 200, 500 y 2000 metros respectivamente.

a) ¿Qué medio usarías para conectar cada edificio? ¿Por qué?
b) Si usas fibra, ¿monomodo o multimodo? ¿Para cada distancia?
c) ¿Qué conectores y módulos SFP elegirías?

**Pista:** 200 m → multimodo (barato). 2000 m → monomodo (necesario por distancia).

## 5. Pinout y solución de problemas

Tienes un cable que no funciona. Usas un comprobador y ves esta secuencia de LEDs:

```
Extremo A: 1 2 3 4 5 6 7 8
Extremo B: 1 2 3 4 5 6 7 8
           ✓ ✓ ✗ ✓ ✓ ✓ ✓ ✓
```

a) ¿Qué pin falla?
b) ¿Qué par de hilos está afectado?
c) ¿El cable funcionará parcialmente? ¿A qué velocidad?

**Pista:** Localiza qué par (1-2, 3-6, 4-5, 7-8) corresponde al pin que falla.

## 6. Diseña el latiguillo perfecto

Describe paso a paso cómo crimpar un cable directo T568B, incluyendo:

a) Herramientas necesarias
b) Longitud recomendada de pelado de funda
c) Orden exacto de los hilos (de izquierda a derecha, con el clip hacia abajo)
d) Cómo saber si el crimpado ha sido correcto

## 7. Elección de medio a escala

Decide qué medio de transmisión usarías para cada escenario y justifícalo:

a) **Mini-oficina** de 8 puestos en un local de 60 m².
b) **Planta** de 40 puestos en un edificio de oficinas con el rack en la misma planta.
c) **Campus** de 3 edificios separados por 100, 500 y 2000 metros.

En cada caso indica: medio (cobre/fibra), categoría/estándar aproximado y, si usas fibra, monomodo o multimodo.

**Pista:** decide primero por distancia y presupuesto. 100 m es el límite del cobre, la multimodo cubre hasta ~550 m y la monomodo el resto.

## 8. Diagnóstico por capas (OSI en acción)

Síntomas en una oficina:

- **Síntoma A:** el LED del switch está verde, el tester de cables pasa al 100%, pero Wireshark muestra tramas con FCS erróneo y el ping a la IP del gateway falla a veces.
- **Síntoma B:** el LED del puerto del switch está apagado en el PC del usuario, aunque el cable está enchufado a ambos lados.
- **Síntoma C:** el cable está pelado y un par partido: no hay LED de enlace.

Para cada síntoma:

a) ¿En qué capa OSI (1, 2 o 3) sitúas el fallo? Justifica con la PDU afectada (bits, trama, paquete).
b) ¿Qué comando o herramienta usarías primero?
c) En el Síntoma A, ¿por qué el fallo NO está en la capa 1 si el tester ha pasado?

**Pista:** escalera 1→2→3 de la unidad inicial; si hay LED y tester OK, la capa 1 local funciona y el problema sube a la trama o más arriba.