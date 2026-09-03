---
title: "05 — STP: fundamentos"
description: BPDUs, Root Bridge y el árbol sin bucles 🌳
---

<p><small>BPDUs, Root Bridge y el árbol sin bucles 🌳</small></p>

> 🗺️ **Estás en:** 🔀 U07 → 05 · STP: fundamentos

---

## 📬 La idea en una frase

> **STP** (*Spanning Tree Protocol*, IEEE 802.1D) es el protocolo que convierte una red con bucles en un **árbol** sin caminos redundantes activos: los switches eligen un **Root Bridge** y bloquean los puertos que crearían bucles, desbloqueándolos si el camino principal falla.

Es la pieza que nos faltaba del punto anterior: la tormenta de broadcast (punto 4) tiene cura, y esta es la vacuna.

---

## 🌳 ¿Qué hace STP?

STP trabaja **sobre la marcha**: los switches se intercambian información constantemente para mantener un único camino activo entre cualquier par de equipos.

- **Detecta** bucles analizando la topología.
- **Bloquea** los puertos que crearían el bucle (los deja "en espera").
- **Reacciona** si un enlace activo falla: desbloquea el de respaldo automáticamente.

```
Red física:                   Red lógica (tras STP):
┌────┐      ┌────┐            ┌────┐      ┌────┐
│ A  │──┬───│ B  │            │ A  │──┬───│ B  │
└────┘  │   └────┘            └────┘  ╳   └────┘
        │                                 ╳ = puerto bloqueado
        └──────┐                          (sin tráfico de datos)
```

> 💡 **Analogía del metro:** STP es como un mapa de metro que solo deja activa UNA línea entre dos estaciones, y mantiene las demás cerradas por si la principal se corta. La red siempre tiene camino... pero nunca dos a la vez.

---

## 📡 Las BPDUs: el idioma de STP

Los switches intercambian **BPDU** (*Bridge Protocol Data Unit*) cada **2 segundos** (hello time). Cada BPDU es una tarjeta de presentación con datos de la topología:

| Campo de la BPDU | Qué contiene |
|---|---|
| **Bridge ID** | Prioridad (2 bytes) + MAC (6 bytes) del switch emisor |
| **Root Bridge ID** | El ID del switch que el emisor cree que es la raíz |
| **Coste del camino** | Coste acumulado desde el switch hasta el Root Bridge |
| **Temporizadores** | Hello, Max Age y Forward Delay |

Con esa información, todos los switches construyen la misma foto de la red y llegan a un acuerdo democrático sobre quién manda.

---

## 👑 La elección del Root Bridge

El objetivo de STP es elegir una **raíz** del árbol: el **Root Bridge**. El criterio es simple: **el switch con el Bridge ID más bajo gana**.

```
Bridge ID = Prioridad (2 bytes) + MAC (6 bytes)
Ejemplo:
  Switch A: Prioridad 32768, MAC 0011.2233.4400 → ID = 32768.0011.2233.4400
  Switch B: Prioridad 28672, MAC 0011.2233.4401 → ID = 28672.0011.2233.4401
  → ¡Gana Switch B! (prioridad más baja: 28672 < 32768)
```

Dos reglas de desempate:

1. **Primero, la prioridad más baja** (por defecto todos valen 32768).
2. **Si empatan en prioridad, gana la MAC más baja.**

Por eso los administradores cambian la prioridad a un switch para **forzarlo como raíz**:

```bash
# Forzar a este switch como Root Bridge (prioridad 4096)
Switch(config)# spanning-tree vlan 1 priority 4096
```

> ⚠️ **Idea clave:** el Root Bridge no es el "más potente": es el que tiene el **Bridge ID más bajo**. En una red bien diseñada lo elegimos NOSOTROS, no el azar. Es el criterio de selección del puente raíz que pide el RA3 (CE j).

---

## 🧠 Mini-chequeo

1. ¿Cada cuánto envían BPDUs los switches?
2. ¿Qué es el Bridge ID y cómo se calcula?
3. Dos switches tienen prioridad 32768. ¿Cuál gana la elección del Root Bridge?

<details>
<summary>🔄 Respuestas</summary>

1. Cada **2 segundos** (hello time por defecto).
2. **Prioridad (2 bytes) + MAC (6 bytes)**. Ejemplo: `32768.0011.2233.4400`.
3. El de la **MAC más baja**: empatados a prioridad, la MAC desempata.
</details>

---

## ✅ Resumen en 3 frases

- STP (IEEE 802.1D) convierte la red en un árbol sin bucles bloqueando puertos redundantes.
- Los switches se coordinan con **BPDUs** cada 2 segundos.
- La elección del **Root Bridge** usa el Bridge ID más bajo: prioridad primero, MAC como desempate.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| STP | Spanning Tree Protocol (IEEE 802.1D) |
| BPDU | Mensaje de control de STP (cada 2 s) |
| Bridge ID | Prioridad + MAC que identifica y ordena a cada switch |
| Root Bridge | El switch elegido como raíz del árbol |
| Hello time | Intervalo entre BPDUs (2 s por defecto) |
| Coste del camino | Número que mide la distancia al Root Bridge |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/07-switching-stp) · **Anterior:** [04 · La tormenta de broadcast](/ApuntesRedes/07-switching-stp/04-tormenta-de-broadcast) · **Siguiente:** [06 · Puertos y estados STP](/ApuntesRedes/07-switching-stp/06-puertos-y-estados-stp)