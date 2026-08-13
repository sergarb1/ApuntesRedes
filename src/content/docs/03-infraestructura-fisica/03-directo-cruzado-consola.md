---
title: 03 — Directo, cruzado y consola
description: T568A vs T568B y cuándo cada cable manda 🤝
---

<p><small>T568A vs T568B y cuándo cada cable manda 🤝</small></p>

> 🗺️ **Estás en:** 🔌 **U03 · Infraestructura física** → 03 · Directo, cruzado y consola

---

## 📬 La idea en una frase

> Dependiendo del orden de los hilos en cada extremo, un cable UTP es **directo** (misma norma en ambos lados), **cruzado** (normas distintas: pares intercambiados) o de **consola** (todo invertido). Cada tipo conecta un tipo de dispositivo al otro extremo — y el Auto MDI-X moderno ha vuelto casi obsoleto al cruzado.

El [punto 2](/ApuntesRedes/03-infraestructura-fisica/02-cable-utp) te dejó la anatomía del cable. Ahora toca el mazo del pinout: qué pin va a qué pin en cada extremo y por qué eso decide quién habla con quién.

---

## 🎨 Las dos normas: T568A y T568B

Cuando crimpas un extremo del cable, ordenas los 8 hilos según una norma. Las dos que existen son:

| Pin | T568A | T568B |
|---|---|---|
| 1 | Blanco/Verde | Blanco/Naranja |
| 2 | Verde | Naranja |
| 3 | Blanco/Naranja | Blanco/Verde |
| 4 | Azul | Azul |
| 5 | Blanco/Azul | Blanco/Azul |
| 6 | Naranja | Verde |
| 7 | Blanco/Marrón | Blanco/Marrón |
| 8 | Marrón | Marrón |

Ambas son válidas para Ethernet: solo intercambian los pares 2 y 3 (naranja y verde). Lo importante es usar **la misma norma a ambos lados** cuando quieres un cable directo, y normas distintas cuando quieres un cruzado.

> 💡 **Truco de memoria T568B:** *"BlancoNaranja, Naranja, BlancoVerde, Azul, BlancoAzul, Verde, BlancoMarrón, Marrón"*. Con el clip del RJ45 hacia abajo y los contactos mirando hacia ti, el hilo 1 queda a la izquierda.

---

## ➡️ Cable directo (straight-through)

**Ambos extremos con la misma norma** (T568B y T568B, o T568A y T568A). Conecta dispositivos de **distinto tipo** — en realidad, dispositivos que usan el mismo par para enviar que para recibir... simplificando: los que NO son "iguales entre sí":

| Cable directo conecta | Ejemplo |
|---|---|
| PC ↔ Switch | El caso más común del mundo |
| Router ↔ Switch | Enlace a la red |
| PC ↔ Hub | Hub antiguo (mismo comportamiento que switch para esto) |

Es el cable que fabricas y compras de serie. Si vas a crimpar un solo tipo de cable en tu vida de estudiante, practica este.

---

## ↔️ Cable cruzado (crossover)

**Un extremo T568A y el otro T568B**: los pares 2 y 3 quedan intercambiados, de modo que el par que transmite en un lado coincide con el que recibe en el otro. Conecta dispositivos del **mismo tipo**:

| Cable cruzado conecta | Ejemplo |
|---|---|
| PC ↔ PC | Comunicación directa entre dos equipos |
| Switch ↔ Switch | Unir dos switches sin uplink automático |
| Router ↔ Router | Enlace directo entre routers |

> 💡 **Auto MDI-X:** los switches modernos detectan automáticamente si el cable es directo o cruzado y ajustan sus puertos. Desde 2006, prácticamente todos lo soportan, así que un cruzado entre PC y switch también funciona. Pero en **routers y PCs antiguos** —y en ciertos laboratorios de examen— el cable cruzado sigue siendo necesario para conexiones directas entre iguales. No lo olvides: el cruce de pares 2 y 3 es la firma del crossover.

---

## 🎛️ Cable de consola (rollover)

El tercer tipo es especial. En el **rollover**, todos los pines se invierten: 1↔8, 2↔7, 3↔6, 4↔5.

Conecta el puerto **serie** (o USB) del PC al **puerto de consola** del switch o router Cisco para la **configuración inicial**: ahí no hay IP, no hay Ethernet; es una consola serie a bajo nivel.

```
Pin del extremo A:   1  2  3  4  5  6  7  8
Pin del extremo B:   8  7  6  5  4  3  2  1
```

Cuando tengas que sacar de la caja un switch Cisco nuevo y meterle `enable`, este cable es tu llave maestra.

---

## 📊 Resumen rápido de los tres cables

| Tipo | Extremo A | Extremo B | Conecta |
|---|---|---|---|
| **Directo** | T568B | T568B | PC ↔ Switch, Router ↔ Switch |
| **Cruzado** | T568A | T568B | PC ↔ PC, Switch ↔ Switch, Router ↔ Router |
| **Consola** | Rollover (1→8) | Rollover (8→1) | PC ↔ Consola de switch/router |

> ⚠️ **El fallo clásico de examen:** conectas un PC a un switch con un cable cruzado y "no funciona". La respuesta no es "el cable está mal" en el 95% de los casos: es que **Auto MDI-X** de ambos extremos lo resolvió hace años. En scripts antiguos o simuladores estrictos, sí, el cruzado muestra su cara.

---

## 🧠 Mini-chequeo

1. ¿Qué diferencia los pinouts T568A y T568B?
2. Conectas un switch a otro switch con cable directo en un simulador antiguo sin Auto MDI-X. ¿Funcionará? ¿Qué cable usarías?
3. ¿Para qué se usa el cable de consola y a qué puerto del switch va?

<details>
<summary>🔄 Respuestas</summary>

1. T568A y T568B **intercambian los pares 2 y 3** (naranja y verde). Los pares azul y marrón ocupan los mismos pines en ambas.
2. **En un simulador antiguo no funcionará de forma fiable y podría haber problemas de enlace**: dos switches son del mismo tipo y necesitan pares intercambiados. Usarías un **cable cruzado** (T568A en un extremo, T568B en el otro).
3. Para la **configuración inicial** del switch o router: conecta el puerto serie/USB del PC al **puerto de consola** del equipo Cisco. Sin IP, sin Ethernet: puerto serie a bajo nivel.
</details>

---

## ✅ Resumen en 3 frases

- **Directo** (misma norma en ambos extremos) conecta equipos de distinto tipo; **cruzado** (normas distintas) conecta equipos del mismo tipo.
- La diferencia entre T568A y T568B es solo el **intercambio de los pares 2 y 3**.
- El **rollover** (pines invertidos) es el cable de consola para configurar switches y routers Cisco desde el PC.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| Pinout | Asignación de cada hilo a cada pin del conector |
| T568A / T568B | Normas de orden de hilos (difieren en pares 2 y 3) |
| Straight-through | Cable directo, misma norma a ambos lados |
| Crossover | Cable cruzado, pares 2-3 intercambiados |
| Rollover | Cable de consola con todos los pines invertidos |
| Auto MDI-X | Detección automática del tipo de cable en puertos modernos |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/03-infraestructura-fisica) · **Anterior:** [02 · El cable UTP](/ApuntesRedes/03-infraestructura-fisica/02-cable-utp) · **Siguiente:** [04 · Crimpado y comprobación](/ApuntesRedes/03-infraestructura-fisica/04-crimpado-y-comprobacion)