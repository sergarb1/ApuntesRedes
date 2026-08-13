---
title: 02 — El cable UTP
description: 8 hilos, 4 pares y una buena razón para trenzarlos 🌊
---

<p><small>8 hilos, 4 pares y una buena razón para trenzarlos 🌊</small></p>

> 🗺️ **Estás en:** 🔌 **U03 · Infraestructura física** → 02 · El cable UTP

---

## 📬 La idea en una frase

> El cable UTP (*Unshielded Twisted Pair*, par trenzado sin apantallar) es el estándar de facto de las LAN: contiene **8 hilos de cobre** organizados en **4 pares trenzados**, cada uno con su color, y el trenzado existe para combatir interferencias y diafonía.

Probablemente lo has pisado, enrollado y maldito mil veces, pero nunca has mirado por qué es como es. Este punto te enseña la anatomía del cable que sostiene casi todas las oficinas del planeta.

---

## 🎨 Los 8 hilos y sus colores

Dentro de la funda gris se esconden 8 hilos de colores. Cada hilo pertenece a un **par** (un hilo de color y su versión "blanco/de color") y cada par tiene un **paso de trenzado** distinto, como verás en la próxima sección.

La tabla de colores depende de la **norma de crimpado** que uses al final del cable. Las dos normas que verás en el [punto 3](/ApuntesRedes/03-infraestructura-fisica/03-directo-cruzado-consola) son T568A y T568B:

| Pin | Par | Color (T568B) | Color (T568A) |
|---|---|---|---|
| 1 | 2 | Blanco/Naranja | Blanco/Verde |
| 2 | 2 | Naranja | Verde |
| 3 | 3 | Blanco/Verde | Blanco/Naranja |
| 4 | 1 | Azul | Azul |
| 5 | 1 | Blanco/Azul | Blanco/Azul |
| 6 | 3 | Verde | Naranja |
| 7 | 4 | Blanco/Marrón | Blanco/Marrón |
| 8 | 4 | Marrón | Marrón |

> 💡 **Diferencia clave:** T568B intercambia los pares 2 y 3 respecto a T568A. El estándar más común en Europa es **T568B** (pin 1 = naranja). En EE.UU. es más frecuente T568A, y es obligatorio en instalaciones gubernamentales.

Observa el patrón: los pares 1 y 4 (azul y marrón) ocupan los **mismos pines en las dos normas**; solo cambian los pares 2 y 3 (naranja y verde). El orden está pensado para que cada par cancelativo use pines adyacentes (1-2, 3-6, 4-5, 7-8).

---

## 🌀 ¿Por qué se trenzan los pares?

Esta es la pregunta que define si entiendes la capa física o solo la memorizas. El trenzado soluciona **dos problemas físicos**:

**1. Cancelación electromagnética.** Las interferencias externas (motores, fluorescentes, cables de corriente) afectan por igual a ambos hilos del par. Como el receptor resta las señales de los dos hilos, el ruido común se cancela y la señal original se recupera. Es el mismo truco del "ruido en modo común".

**2. Reducción de diafonía (crosstalk).** Cada par se trenza con un **paso diferente** (más o menos vueltas por metro). Así, un par que transmite no "acopla" su señal de forma regular sobre el vecino, y la interferencia entre pares se dispersa en vez de sumarse.

> 💡 **Analogía del ascensor:** si dos parejas suben a la vez en un ascensor lleno, se pisan los pies. Si una vez sube trenzada y otra destrenzada... en fin, cada pareja con su "paso" es menos probable que pisen al otro. Eso es el paso de trenzado.

---

## 📏 Categorías: Cat5e, Cat6, Cat6a, Cat7, Cat8

No todos los cables UTP son iguales. La **categoría** fija la frecuencia máxima de trabajo y, con ella, la velocidad que puede soportar:

| Categoría | Frecuencia máx | Velocidad máx | Distancia | Uso típico |
|---|---|---|---|---|
| **Cat5e** | 100 MHz | 1 Gbps | 100 m | Oficinas antiguas, aún funcional |
| **Cat6** | 250 MHz | 1 Gbps (10 Gbps hasta 55 m) | 100 m | Estándar actual en oficinas |
| **Cat6a** | 500 MHz | 10 Gbps | 100 m | Datacenters, redes de alta velocidad |
| **Cat7** | 600 MHz | 10 Gbps | 100 m | Entornos con alta interferencia (STP) |
| **Cat8** | 2000 MHz | 25-40 Gbps | 30 m | Datacenters, cortas distancias |

Dos detalles que suelen caer en examen:

- **Cat6 llega a 10 Gbps solo hasta 55 metros**; para 10 Gbps a 100 metros necesitas Cat6a o superior.
- **Cat8 existe pero su distancia es de solo 30 metros**: está pensada para el rack, no para el edificio.

---

## 🤔 Cat5e, Cat6... ¿qué compro?

Regla práctica de contratación:

- **Oficina normal a 1 Gbps** → **Cat6** (el estándar de hoy, a prueba de futuro).
- **Presupuesto justo** → Cat5e sigue cubriendo 1 Gbps a 100 m sin problema.
- **Datacenter o backbone a 10 Gbps** → **Cat6a**.
- **Interferencias fuertes** → Cat7/STP (apantallado) o, mejor, [fibra óptica](/ApuntesRedes/03-infraestructura-fisica/05-fibra-optica).

> ⚠️ **No confundas categoría con calidad percibida:** un Cat6 mal crimpado (lo verás en el [punto 4](/ApuntesRedes/03-infraestructura-fisica/04-crimpado-y-comprobacion)) rinde peor que un Cat5e perfecto. La categoría es el techo, no la garantía.

---

## 🧠 Mini-chequeo

1. ¿Cuántos hilos y cuántos pares tiene un cable UTP? ¿Qué relación tienen los pares con los pines?
2. ¿Por qué se trenzan los pares? Nombra los dos problemas físicos que resuelve.
3. ¿Qué categoría necesitas para 10 Gbps a 100 metros? ¿Y qué pasa con la Cat6 en esa distancia?

<details>
<summary>🔄 Respuestas</summary>

1. **8 hilos en 4 pares**. Cada par usa pines adyacentes (1-2, 3-6, 4-5, 7-8) para que la cancelación del trenzado funcione.
2. **Cancelación electromagnética** (el ruido externo afecta igual a ambos hilos y se resta en el receptor) y **reducción de diafonía** (pasos de trenzado distintos entre pares).
3. **Cat6a** (o Cat7). La Cat6 solo garantiza 10 Gbps hasta 55 metros; a 100 m se queda en 1 Gbps.
</details>

---

## ✅ Resumen en 3 frases

- El UTP son **8 hilos en 4 pares de colores**, y el esquema de pines se define con T568A o T568B (solo difieren los pares naranja/verde).
- El **trenzado** existe para cancelar interferencias electromagnéticas y minimizar la diafonía entre pares.
- La **categoría** (Cat5e → Cat8) marca la velocidad y distancia máximas; para 10 Gbps a 100 m hace falta Cat6a.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| UTP | Par trenzado sin apantallar |
| Par cancelativo | Pareja de hilos que transmite la señal y su inversa |
| Diafonía (crosstalk) | Interferencia de un par sobre otro adyacente |
| Paso de trenzado | Número de vueltas por metro, distinto en cada par |
| Categoría | Especificación de frecuencia y velocidad del cable |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/03-infraestructura-fisica) · **Anterior:** [01 · Medios de transmisión](/ApuntesRedes/03-infraestructura-fisica/01-medios-de-transmision) · **Siguiente:** [03 · Directo, cruzado y consola](/ApuntesRedes/03-infraestructura-fisica/03-directo-cruzado-consola)