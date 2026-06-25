---
title: Boletín U03 — Avanzado
description: Ejercicios avanzados de Infraestructura Física de Red
---

# 📝 Boletín U03 — Avanzado

> Ejercicios que requieren aplicar los conceptos de cableado y medios físicos de forma más profunda.

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

Un cable UTP Cat6 tiene una atenuación máxima de 21.3 dB a 100 MHz para 100 metros. La señal del transmisor tiene una potencia de 2 dBm.

a) ¿Qué potencia llega al receptor después de 100 m?
b) Si el receptor necesita al menos -20 dBm para interpretar la señal, ¿funciona?
c) ¿Qué pasa si el cable mide 120 metros?

**Pista:** Potencia recibida = Potencia transmitida - Atenuación. La atenuación es proporcional a la distancia.

## 4. Fibra vs Cobre: caso real

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
