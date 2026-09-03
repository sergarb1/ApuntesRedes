---
title: 04 — Crimpado y comprobación
description: De cable suelto a latiguillo perfecto, con tester de por medio 🛠️
---

<p><small>De cable suelto a latiguillo perfecto, con tester de por medio 🛠️</small></p>

> 🗺️ **Estás en:** 🔌 **U04 · Infraestructura física** → 04 · Crimpado y comprobación

---

## 📬 La idea en una frase

> Crimpar un RJ45 es convertir un trozo de cable UTP suelto en un **latiguillo usable**: pelar, ordenar los hilos según T568B, cortar, insertar, crimpar y comprobar con un **tester** que los 8 pines tienen continuidad en el orden correcto. La mitad de los fallos de red son cables; la mitad de los cables malos, crimpados con prisas.

En el [punto 3](/ApuntesRedes/04-infraestructura-fisica/03-directo-cruzado-consola) decidiste qué pinout usar. Aquí pasas a la acción: manos a la crimpadora.

---

## 🧰 Material necesario

- **Crimpadora RJ45** (con cuchilla de pelado y corte incorporadas casi siempre).
- **Pelacables** o la cuchilla de la propia crimpadora.
- **Conectores RJ45** (mejor con pasador para funda).
- **Cable UTP** (Cat5e/Cat6, según categoría que quieras).
- **Comprobador de cables (tester)** para verificar el resultado.

> 💡 **Regla de oro del material:** compra conectores compatibles con el diámetro de tu cable (los hay de Cat6 con pasador reforzado). Un conector barato arruina un cable bueno.

---

## 👷 El crimpado paso a paso (norma T568B)

1. **Pelar:** retira unos **2 cm de funda** exterior con el pelacables, con cuidado de no cortar los hilos internos. Desenrolla suavemente.
2. **Ordenar:** ordena los 8 hilos según **T568B**, de izquierda a derecha con el clip del conector hacia abajo: Blanco/Naranja, Naranja, Blanco/Verde, Azul, Blanco/Azul, Verde, Blanco/Marrón, Marrón.
3. **Aplanar:** sitúa los pares 4-5 (azul) tras los 1-2, con el blanco/azul a la derecha del azul, para que el orden quede limpio y plano.
4. **Cortar:** con la cuchilla, corta los hilos **rectos y a escuadra**, dejando ~1 cm desde la funda.
5. **Insertar:** empuja los hilos en el conector RJ45 hasta ver sus puntas asomar por el frente (los contactos dorados). La funda debe quedar **dentro del conector**, sujeta por el pasador.
6. **Crimpar:** introduce el conector en la crimpadora y aprieta firmemente hasta oír el clic. Los contactos deben hundirse uniformemente.
7. **Comprobar:** usa el tester (siguiente sección) para verificar la continuidad de los 8 pines en orden.

> ⚠️ **El error más repetido:** insertar los hilos *sin* meter la funda en el conector. El pasador no agarra nada, el cable baila, y a la primera que alguien tira, se suelta. La funda es el anclaje.

---

## ✅ El tester: qué te dice con sus LEDs

El comprobador de cables tiene dos módulos conectados por los extremos del cable. Si todo está perfecto, ves los **LEDs del 1 al 8 encenderse en orden** en ambos módulos.

| Qué ves en el tester | Significado |
|---|---|
| LEDs 1-8 en orden en ambos lados | Cable **correcto** |
| Un LED de un pin no enciende (en uno o ambos lados) | **Hilo sin conectar** (no llegó a tocar el contacto) |
| LEDs de dos pines intercambiados (ej. 1 y 2 cruzados) | **Pares invertidos** |
| LEDs que solo encienden del 4 al 7 en el otro extremo | **Split pair**: el orden de hilos no respeta los pares cancelativos (ver abajo) |
| LEDs 1-8 en orden pero en el lateral destino el orden es 8-1 | **Cable de consola** (rollover) |
| LEDs 1-6 pero no 7-8 | Solo 2 pares conectados: **negociación a 100 Mbps**, no a 1 Gbps |

> 🌡️ **El tester no mide todo:** un tester básico solo comprueba continuidad y orden. No detecta atenuación ni interferencias: para eso están los certificadores (caros, de empresa certificadora) y los [conceptos del punto 7](/ApuntesRedes/04-infraestructura-fisica/07-conceptos-fisicos).

---

## 💥 Fallos típicos y cómo los delata el tester

**1. Split pair (par dividido).** El caso más traicionero: los 8 hilos están conectados, pero **no respetan los pares cancelativos** (ej. Blanco/Naranja va al pin 3 en lugar de al 1). El tester básico a veces muestra todo en orden —porque hay continuidad— y el cable parece funcionar... a baja velocidad y con errores intermitentes. Ethernet sobre cables así da problemas difíciles de pillar.

**2. Hilo sin conectar.** Un hilo no llegó a insertarse del todo. El tester muestra un LED apagado. Si es un hilo de un par crítico, el enlace cae o pierde velocidad.

**3. Pares invertidos.** En un extremo metes Naranja donde iba Blanco/Naranja y viceversa. Los LEDs 1-2 aparecen intercambiados en uno de los módulos. Funciona como crossover accidental y puede dar problemas según los dispositivos.

**4. Funda sin entrar (roto de sujeción).** No lo ves en el tester: es el fallo mecánico. El cable funciona en el banco y falla en cuanto alguien toca el RJ45.

> 💡 **Truco de diagnóstico:** si un cable "funciona a 100 en vez de a 1000", sospecha de **solo 2 pares conectados** (hilos 7-8 muertos) o de un **split pair**. El tester lo caza: repasa los LEDs 7-8 y el orden completo.

---

## 🧪 Comprobación en red: la prueba del algodón

El tester dice *continuidad*, pero la red exige más. La prueba definitiva de un latiguillo es enchufarlo y comprobar su comportamiento real:

1. **Velocidad negociada:** conecta el cable entre PC y switch y mira la velocidad del enlace (en Windows, en las propiedades de la tarjeta; en Linux, con `ethtool`). Un cable de 4 pares bien crimpado debe negociar **1 Gbps**; si negocia 100 Mbps, faltan pares o hay un split pair.
2. **Prueba de transferencia:** copia un archivo grande (o usa `iperf` si quieres chicha) y compara el resultado con lo esperado. Errores CRC y velocidad baja delatan cables enfermos que el tester básico no caza.
3. **Movimiento físico:** agarra el cable por el conector y muévelo suavemente mientras haces ping. Si el ping cae o el enlace parpadea, es un **mal contacto del RJ45** (crimpado flojo o funda sin anclar). Este test es la pesadilla de los cables hechos con prisas.

> ⚠️ **Regla del profesional:** el tester es para fabricar bien; la prueba en red es para certificar que funciona. Nunca entregues un latiguillo sin los dos pasos.

---

## 🧠 Mini-chequeo

1. Enuncia los 6 pasos esenciales del crimpado (pelar, ordenar, cortar, insertar, crimpar, comprobar).
2. El tester muestra los 8 LEDs en orden en ambos extremos pero el cable da errores intermitentes. ¿Qué sospechas y cómo lo descartas?
3. ¿Qué indica un tester donde los LEDs 7 y 8 no encienden en el extremo B?

<details>
<summary>🔄 Respuestas</summary>

1. **Pelar** la funda (~2 cm), **ordenar** los hilos según T568B, **cortar** recto a escuadra (~1 cm), **insertar** en el RJ45 con la funda dentro, **crimpar** con la crimpadora hasta el clic y **comprobar** con el tester.
2. Sospecha de **split pair**: hay continuidad (por eso el tester básico da OK) pero los pares no son cancelativos y se genera diafonía. Para descartarlo, repasa el orden de hilos pin a pin (los pares deben ser 1-2, 3-6, 4-5, 7-8) o usa un certificador que mida diafonía.
3. Que el **par 4 (7-8, marrón)** no está conectado en ese extremo: solo 2 pares operativos → el cable negociará a **100 Mbps**, nunca a 1 Gbps.
</details>

---

## ✅ Resumen en 3 frases

- Crimpar es un proceso de 6 pasos que termina **siempre en el tester**: sin comprobación, no hay certeza.
- El tester caza la mayoría de fallos: **hilos sueltos, orden incorrecto, pares invertidos y splits**; cada fallo tiene su patrón de LEDs.
- Un tester básico solo verifica **continuidad**: el split pair y los problemas de interferencia requieren un ojo entrenado o un certificador.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| Crimpar | Fijar los hilos al conector con la crimpadora |
| Tester | Comprobador de continuidad y orden de pines |
| Split pair | Par que no respeta la pareja cancelativa (error traicionero) |
| Continuidad | Que cada pin tenga su hilo conectado de punta a punta |
| Latiguillo | Cable terminado con RJ45 en ambos extremos |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/04-infraestructura-fisica) · **Anterior:** [03 · Directo, cruzado y consola](/ApuntesRedes/04-infraestructura-fisica/03-directo-cruzado-consola) · **Siguiente:** [05 · Fibra óptica](/ApuntesRedes/04-infraestructura-fisica/05-fibra-optica)