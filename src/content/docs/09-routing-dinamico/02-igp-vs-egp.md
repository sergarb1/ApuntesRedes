---
title: 02 — IGP vs EGP y RIP vs OSPF
description: Protocolos de dentro y de fuera, y por qué OSPF le gana a RIP 🌍
---

<p><small>Protocolos de dentro y de fuera, y por qué OSPF le gana a RIP 🌍</small></p>

> 🗺️ **Estás en:** 🗣️ **U09 · Routing dinámico OSPF** → 02 · IGP vs EGP y RIP vs OSPF

---

## 📬 La idea en una frase

> Los routers se dividen en dos ligas: los **IGP** que enrutan *dentro* de un sistema autónomo (OSPF, RIP, EIGRP) y los **EGP** que enrutan *entre* sistemas autónomos (BGP, el pegamento de Internet). Y dentro de los IGP, OSPF es hoy el rey de las redes de empresa.

Antes de hablar de OSPF hay que saber dónde vive. Este punto te da el mapa: qué es un **sistema autónomo**, qué protocolo usar en cada sitio, y la comparativa clásica de entrevista: RIP vs OSPF vs EIGRP.

---

## 🗂️ El sistema autónomo (AS)

Un **AS** (Autonomous System) es un conjunto de redes bajo **una única administración**: la red de tu instituto, la de una empresa, la de un operador. Cada AS tiene un número público (ASN) para identificarse en Internet.

```
            AS 65001 (tu empresa)
   ┌──────────────────────────────┐
   │   R1 ── R2 ── R3             │  ← aquí dentro → IGP (OSPF/RIP/EIGRP)
   │   │         │                │
   │   └─── LAN1 └──── LAN2       │
   └──────────┬───────────────────┘
              │ ← aquí entre AS → EGP (BGP)
   ┌──────────┴───────────────────┐
   │         AS del operador      │
   └──────────────────────────────┘
```

- **Dentro** de un AS usas un **IGP**: decide la mejor ruta hacia cada red interna.
- **Entre** AS distintos usas un **EGP**: decide cómo llegar a la red de "los otros". El único EGP relevante es **BGP**, el protocolo que sostiene Internet.

| Tipo | Ámbito | Ejemplos |
|---|---|---|
| **IGP** (Interior Gateway Protocol) | Dentro de un AS | OSPF, RIP, EIGRP |
| **EGP** (Exterior Gateway Protocol) | Entre AS distintos | **BGP** (el de Internet) |

> 💡 **Regla mental:** IGP = "la ruta más corta y barata" (optimiza coste). EGP = "la política" (BGP elige según contratos, preferencias y reglas de negocio, no solo por coste).

---

## 🥊 RIP vs OSPF vs EIGRP: la comparativa

Dentro de los IGP hay tres estilos: **vector distancia** (RIP), **estado de enlace** (OSPF) y un híbrido (EIGRP). Esta tabla es oro para exámenes y entrevistas:

| Característica | RIP | OSPF | EIGRP (Cisco) |
|---|---|---|---|
| Tipo | Vector distancia | Estado de enlace | Vector distancia avanzado |
| Métrica | Saltos (máx 15) | Coste (ancho de banda) | Compuesta (ancho de banda, retardo, carga, fiabilidad) |
| Convergencia | Lenta (~3 min) | Rápida (< 10s) | Muy rápida |
| Escalabilidad | Pequeña (< 15 routers) | Grande (miles) | Grande |
| Actualizaciones | Cada 30s (completas) | Solo cambios (parciales) | Solo cambios |
| Estándar | Abierto | Abierto (RFC) | Propietario Cisco |

**Dos ideas para quedarse:**

- **RIP cuenta saltos** y limita la red a 15 routers: un router a 16 saltos es "inalcanzable". Su convergencia puede tardar minutos porque sus vecinos se van avisando uno a uno.
- **OSPF mira el ancho de banda** y calcula un **coste** por enlace (lo verás en el [punto 6](/ApuntesRedes/09-routing-dinamico/06-coste-ospf)): puede elegir una ruta con más saltos si es por fibra. Y como todos los routers de un área conocen la topología completa, convergen mucho más rápido.

---

## 🎯 ¿Cuál elijo? La guía rápida

Cuando el examen (o tu jefe) pregunta "¿qué protocolo pongo?", la respuesta no es siempre OSPF. Sigue este árbol:

| Situación | Elección | Motivo |
|---|---|---|
| Red de empresa multi-router | **OSPF** | Escala, converge rápido, estándar abierto |
| Red de 3-5 routers, todo en un edificio | **RIP** o estático | Suficiente y trivial de configurar |
| Solo equipo Cisco | **EIGRP** posible | Convergencia muy rápida, pero propietario |
| Conexión con otro operador / Internet | **BGP (EGP)** | Es el único EGP real |
| Red con un solo camino de salida | **Estático** | No pagas protocolo por una ruta |

> ⚠️ **Y una trampa frecuente:** "¿OSPF o RIP?" en una red que solo tiene **un único enlace** a cada red. Si no hay caminos alternativos, el protocolo dinámico decide siempre lo mismo que diría una estática... gastando recursos y complicando el diagnóstico. La herramienta correcta ahí es el estático (lo viste en el [punto 1](/ApuntesRedes/09-routing-dinamico/01-de-estatico-a-dinamico)).

---

## 🧠 Mini-chequeo

1. Un router conecta tu red con la de un operador de Internet. ¿IGP o EGP?
2. ¿Por qué una red con 20 routers encadenados no funcionaría bien con RIP?
3. ¿Cuál es la gran diferencia de métrica entre RIP y OSPF?

<details>
<summary>🔄 Respuestas</summary>

1. **EGP (BGP)**: está en el borde entre tu AS y el del operador.
2. Porque RIP limita a **15 saltos** (16 = inalcanzable) y además su convergencia es muy lenta. Con 20 routers, algunos quedarían fuera y las caídas tardarían minutos en propagarse.
3. RIP usa **saltos** (cuenta routers) y OSPF usa **coste** (basado en ancho de banda): OSPF elige la ruta óptima aunque tenga más saltos.
</details>

---

## ✅ Resumen en 3 frases

- IGP enruta dentro de un AS (OSPF, RIP, EIGRP) y EGP enruta entre AS (BGP).
- RIP es simple pero no escala: 15 saltos y minutos de convergencia.
- OSPF es estado de enlace, mira el ancho de banda y converge en segundos: por eso domina las redes de empresa.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| AS | Sistema autónomo: redes bajo una sola administración |
| IGP | Protocolo de routing interior (dentro del AS) |
| EGP | Protocolo de routing exterior (entre AS) |
| Vector distancia | Cada router solo conoce "la dirección y distancia" hacia cada red |
| Estado de enlace | Cada router conoce la topología completa de su área |
| BGP | El EGP de Internet, basado en políticas |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/09-routing-dinamico) · **Anterior:** [01 · De estático a dinámico](/ApuntesRedes/09-routing-dinamico/01-de-estatico-a-dinamico) · **Siguiente:** [03 · Conceptos OSPF](/ApuntesRedes/09-routing-dinamico/03-conceptos-ospf)