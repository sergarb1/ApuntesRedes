---
title: 03 — Topologías de red
description: Cómo se ordenan los cables y por qué importa 🔗
---

<p><small>Cómo se ordenan los cables y por qué importa 🔗</small></p>

> 🗺️ **Estás en:** 🌐 **U02 · Fundamentos de redes** → 03 · Topologías de red

---

## 📬 La idea en una frase

> **La topología dice cómo están conectados los dispositivos: es el "plano" de la red.**

Y, como verás, el plano físico (el cable) y el lógico (cómo viajan los datos) no siempre coinciden.

---

## 🧭 Topología física vs lógica

| | **Física** | **Lógica** |
|---|---|---|
| Qué describe | Cómo se cablean realmente los dispositivos | Cómo fluyen los datos por la red |
| Pasa por | Cables, puertos, antenas | Direcciones, protocolos, rutas |
| Cambiar | Requiere mover cables | Puede cambiar con configuración (software) |

Ejemplo clásico: puedes tener una red **física en estrella** (todo conectado a un switch) y al mismo tiempo una **lógica de anillo**, si el protocolo hace circular los datos de forma circular. El plano de cables y el flujo de datos son dos cosas distintas.

> 💡 **Consejo:** cuando un jefe dice "dibújame la topología", pregunta primero si quiere los cables (física) o los datos (lógica).

---

## ⭐ Estrella: el estándar de hoy

Todos los dispositivos se conectan a un punto central: un switch o un hub.

<figure class="diagram-figure">
  <img src="/ApuntesRedes/diagrams/topologia-estrella.svg" alt="Topología en estrella con switch central y 4 PCs" class="diagram-img" loading="lazy" />
  <figcaption class="diagram-caption">Cada PC se conecta directamente al switch. Un cable roto solo afecta a ese PC.</figcaption>
</figure>

- ✅ **Ventajas:** fácil de gestionar; un fallo de cable no tumba a los demás; añadir/quitar equipos es trivial.
- ❌ **Desventajas:** si el switch central falla, toda la red se cae; consume más cable que el bus.
- **Ejemplo real:** casi todas las redes de oficina e instituto.

---

## 🔗 Bus: un cable compartido

Todos los dispositivos comparten el mismo cable (normalmente coaxial).

<figure class="diagram-figure">
  <img src="/ApuntesRedes/diagrams/topologia-bus.svg" alt="Topología en bus con cable coaxial compartido por 4 PCs" class="diagram-img" loading="lazy" />
  <figcaption class="diagram-caption">Una rotura en cualquier punto deja la red entera fuera de servicio.</figcaption>
</figure>

- ✅ **Ventajas:** poco cable, económico, fácil en tramos lineales.
- ❌ **Inconvenientes:** si el cable se rompe en cualquier punto, cae toda la red; hay un solo dominio de colisión (solo un equipo transmite a la vez); difícil de diagnosticar; **obsoleto desde los años 90**.

---

## 💍 Anillo: todos en un círculo

Cada dispositivo se conecta al siguiente formando un anillo cerrado.

<figure class="diagram-figure">
  <img src="/ApuntesRedes/diagrams/topologia-anillo.svg" alt="Topología en anillo con 4 PCs conectados en círculo" class="diagram-img" loading="lazy" />
  <figcaption class="diagram-caption">Cada PC se conecta a sus dos vecinos; el tráfico circula en una dirección (o dos en anillos duales).</figcaption>
</figure>

- ✅ **Ventajas:** rendimiento predecible (cada equipo ha su turno), no hay colisiones.
- ❌ **Inconvenientes:** si un dispositivo falla puede romper el anillo; añadir equipos obliga a romper el anillo.
- **Uso actual:** redes SONET/SDH y algunos anillos de fibra metropolitana, donde el anillo doble da redundancia.

---

## 🕸 Malla: todos con todos

Cada dispositivo se conecta a los demás.

<figure class="diagram-figure">
  <img src="/ApuntesRedes/diagrams/topologia-malla.svg" alt="Topología en malla con 4 PCs conectados entre sí" class="diagram-img" loading="lazy" />
  <figcaption class="diagram-caption">Para n dispositivos necesitas n*(n-1)/2 enlaces. Si un cable falla, hay rutas alternativas.</figcaption>
</figure>

- ✅ **Ventaja:** máxima redundancia y fiabilidad.
- ❌ **Inconvenientes:** el cableado crece exponencialmente. Por eso se usa la **malla parcial** (no todos contra todos) en redes críticas: backbones de operadores (ISP) y centros de datos.

---

## 🌳 Árbol e híbridas: el mundo real

- **Árbol:** varias estrellas conectadas entre sí (un switch central que agrupa a varios switches). Es como se cablean los edificios grandes y los institutos: un armario central + un switch por planta.
- **Híbrida:** cualquier mezcla de las anteriores. Una red corporativa combina estrella (oficinas), malla (núcleo) y, a veces, anillos metropolitanos.

> 💡 **La topología más común hoy es la estrella.** Simple, fiable y fácil de ampliar. Cuando tienes varios switches conectados entre sí, estás construyendo un árbol.

---

## 📊 Comparativa rápida

| Topología | Cableado | Redundancia | Coste | Uso actual |
|---|---|---|---|---|
| Estrella | Medio | Baja (punto único) | Bajo | **El estándar hoy** |
| Bus | Bajo | Ninguna | Muy bajo | Obsoleta |
| Anillo | Medio | Media (dual) | Medio | SONET/SDH |
| Malla | Muy alto | Máxima | Muy alto | ISP y datacenters |
| Árbol | Alto | Baja-media | Medio | Redes de campus y grandes oficinas |

---

## 🏫 Ejemplo resuelto: ¿qué topología tiene el instituto?

Un centro suele montarse en **árbol**: un armario central en el sótano (switch principal) conectado a un switch por planta (estrellas), y cada aula es una estrella dentro de su planta. El núcleo entre armarios puede duplicarse en **malla parcial** para que, si un enlace cae, las plantas sigan comunicadas.

| Parte del instituto | Topología |
|---|---|
| Dentro de un aula | Estrella (switch de aula) |
| Plantas unidas | Árbol (switch central + uno por planta) |
| Núcleo redundante | Malla parcial (2 enlaces hacia el switch principal) |

> 💡 Fíjate: mezclar topologías es lo normal. "Híbrida" no es una rareza: es la realidad de casi todas las redes de tamaño medio.

---

## 🧠 Mini-chequeo

1. En la topología en estrella, ¿qué ocurre si se rompe el switch central?
2. Una red de 6 equipos en malla total, ¿cuántos enlaces necesita?

<details>
<summary>🔄 Respuestas</summary>

1. **Toda la red se cae**: el switch es el punto único de fallo de la estrella.
2. Con la fórmula **n×(n-1)/2** = 6×5/2 = **15 enlaces**. Por eso la malla total solo se usa donde hace falta máxima redundancia.

</details>

---

## ✅ Resumen en 3 frases

1. La topología es el plano de la red, y hay que distinguir la **física** (cables) de la **lógica** (datos).
2. Las 4 fundamentales son estrella, bus, anillo y malla; la **estrella** es el estándar real y la **malla** se reserva para lo crítico.
3. Las redes de verdad son **árboles o híbridas**: combinan topologías según presupuesto y criticidad.

> 🐛 **Vocabulario rápido**
>
> | Término | Idea general |
> |---|---|
> | Topología | El plano de cómo se conectan los dispositivos |
> | Estrella | Todo con un punto central (switch) |
> | Bus | Un solo cable compartido |
> | Anillo | Cada equipo con sus dos vecinos |
> | Malla | Muchos enlaces directos entre equipos |
> | Dominio de colisión | Segmento donde dos equipos no pueden transmitir a la vez |

📚 [Volver al índice de la unidad](/ApuntesRedes/02-fundamentos-redes) · **Anterior:** [02 · Tipos de red y alcance](/ApuntesRedes/02-fundamentos-redes/02-tipos-y-alcance) · **Siguiente:** [04 · Dispositivos de red](/ApuntesRedes/02-fundamentos-redes/04-dispositivos)