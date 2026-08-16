---
title: 03 — Conceptos OSPF
description: "LSA, LSDB, SPF, Router ID y Hello: la maquinaria interna de OSPF 🧠"
---

<p><small>LSA, LSDB, SPF, Router ID y Hello: la maquinaria interna de OSPF 🧠</small></p>

> 🗺️ **Estás en:** 🗣️ **U09 · Routing dinámico OSPF** → 03 · Conceptos OSPF

---

## 📬 La idea en una frase

> OSPF (*Open Shortest Path First*) es un protocolo de **estado de enlace**: cada router construye un **mapa completo** de su área (LSDB) a partir de los anuncios de todos (LSAs) y calcula la mejor ruta con el algoritmo de **SPF (Dijkstra)**.

A diferencia de RIP, que solo mira "hacia dónde y a cuántos saltos", OSPF quiere saber *todo*: qué enlaces existen, quién los tiene, a qué velocidad. Con ese mapa global, cada router calcula la ruta óptima por su cuenta. Eso es lo que hace su convergencia tan rápida.

---

## 🧩 Las piezas de la maquinaria

| Término | Descripción |
|---|---|
| **LSA** (Link State Advertisement) | Anuncio que cada router genera sobre sus enlaces ("tengo la red X conectada por Y") |
| **LSDB** (Link State Database) | Base de datos con todos los LSAs del área: el mapa completo |
| **SPF** (Shortest Path First) | Algoritmo (Dijkstra) que calcula la ruta más corta desde la LSDB |
| **Área OSPF** | Subdivisión lógica para escalar (lo verás en el [punto 4](/ApuntesRedes/09-routing-dinamico/04-areas-y-tipos-de-routers)) |
| **Router ID** | Identificador único del router (IP más alta de loopback o interfaces) |
| **Hello** | Paquete OSPF para descubrir y mantener vecinos |

**La cadena de montaje en 5 pasos:**

```
1. Router descubre vecinos  →  paquetes Hello (cada 10s en broadcast)
2. Vecinos se sincronizan    →  intercambio de LSAs
3. Cada router almacena      →  LSDB (todos los LSAs del área)
4. Cada router calcula       →  SPF (Dijkstra) sobre su LSDB
5. Cada router instala       →  la mejor ruta en su tabla
```

> 💡 **Analogía del mapa colaborativo:** cada vecino del barrio aporta una ficha con "las calles que yo conozco". Todos comparten sus fichas (LSAs), cada uno pega todas en su tablero (LSDB) y, con el tablero completo, cada uno traza su propia ruta más corta al trabajo (SPF). Si alguien descubre que una calle se ha cortado, lo anuncia y todos recalculan.

---

## 🗺️ El algoritmo SPF (Dijkstra)

Dijkstra calcula el **camino de menor coste** desde un origen hacia todos los demás nodos. En OSPF se ejecuta sobre la LSDB cada vez que hay un cambio, y el resultado alimenta la tabla de rutas. Un ejemplo mínimo:

```
        A ───── B
        │ 5     │ 2
        │       │
        C ───── D
           1        (costes: A-C=5, A-B=5, B-D=2, C-D=1)
```

Desde A, ¿cuál es la mejor ruta a D? **A → C → D** (5 + 1 = 6) frente a A → B → D (5 + 2 = 7). OSPF elige la de coste menor, no la de menos routers. El coste de cada enlace lo aprenderás en el [punto 6](/ApuntesRedes/09-routing-dinamico/06-coste-ospf).

---

## 🆔 El Router ID

Es el **DNI del router** dentro de OSPF. Cisco lo elige así, en este orden:

1. Un `router-id` configurado a mano (lo más recomendable).
2. La **IP más alta** de las interfaces **loopback**.
3. La IP más alta de las interfaces **físicas activas**.

> ⚠️ **Ojo:** el Router ID **debe ser único**. Si dos routers usan el mismo, OSPF no formará adyacencias correctamente y verás vecinos que se "caen". Por eso en producción se configura a mano (habitualmente un `1.1.1.1`, `2.2.2.2`...). El `router-id` es distinto del **process ID** (el número de `router ospf 1`), que es solo local y no necesita coincidir entre routers.

---

## 👋 El paquete Hello

El Hello es el "¿hay alguien ahí?" de OSPF. Se envía periódicamente para **descubrir vecinos, verificar que siguen vivos y negociar parámetros** (área, timers, tipo de red, autenticación). Por defecto:

- **Intervalo Hello:** 10 segundos en redes broadcast.
- **Intervalo Dead:** 40 segundos (4 × Hello). Si un vecino no oye Hello en 40s, lo declara muerto.

> ⚠️ **Los timers deben coincidir** entre los dos lados del enlace. Si un router manda Hello cada 10s y el otro cada 30s, nunca formarán vecindad. Es la causa clásica de "OSPF no levanta" que verás en el [punto 8](/ApuntesRedes/09-routing-dinamico/08-ruta-por-defecto-y-diagnostico) y en el laboratorio del [cierre](/ApuntesRedes/09-routing-dinamico/09-cierre).

---

## 🧠 Mini-chequeo

1. ¿Cuál es la diferencia entre un LSA y la LSDB?
2. Un router tiene loopback 2.2.2.2 y dos interfaces físicas 192.168.1.1 y 10.0.0.1, sin router-id configurado. ¿Cuál será su Router ID?
3. ¿Cuánto tarda OSPF en declarar muerto a un vecino en una red broadcast si no recibe Hello?

<details>
<summary>🔄 Respuestas</summary>

1. El **LSA** es el anuncio individual ("yo tengo la red X"); la **LSDB** es la colección de todos los LSAs del área, el mapa completo.
2. **2.2.2.2** — Cisco prefiere la IP más alta de loopback sobre las físicas.
3. **40 segundos** — el Dead timer (4 × 10s de Hello) en redes broadcast.
</details>

---

## ✅ Resumen en 3 frases

- OSPF es estado de enlace: cada router mantiene el **mapa completo** de su área en la LSDB.
- Ese mapa se arma con **LSAs** y se recorre con el **algoritmo SPF (Dijkstra)** para elegir la ruta de menor coste.
- El **Hello** descubre y vigila vecinos, y el **Router ID** debe ser único y, a ser posible, configurado a mano.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| OSPF | Protocolo IGP de estado de enlace (RFC) |
| LSA | Anuncio de estado de un enlace |
| LSDB | Base de datos con todos los LSAs del área |
| SPF / Dijkstra | Algoritmo del camino de menor coste |
| Router ID | Identificador único del router OSPF |
| Hello | Paquete de descubrimiento y mantenimiento de vecinos |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/09-routing-dinamico) · **Anterior:** [02 · IGP vs EGP y RIP vs OSPF](/ApuntesRedes/09-routing-dinamico/02-igp-vs-egp) · **Siguiente:** [04 · Áreas y tipos de routers](/ApuntesRedes/09-routing-dinamico/04-areas-y-tipos-de-routers)