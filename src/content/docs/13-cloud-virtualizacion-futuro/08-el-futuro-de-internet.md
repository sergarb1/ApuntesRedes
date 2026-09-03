---
title: 08 — El futuro de Internet
description: IPv8, RINA y NDN, el más allá de IP 🚀
---

<p><small>IPv8, RINA y NDN, el más allá de IP 🚀</small></p>

> 🗺️ **Estás en:** ☁️ U13 → 08 · El futuro de Internet

---

## 📬 La idea en una frase

> Internet está construida sobre **IP**, y aunque **IPv6** resolvió el agotamiento de direcciones, hay propuestas para **rediseñar Internet desde cero**: **IPv8**, **RINA** y **NDN** — ninguna de ellas es un estándar, pero son el laboratorio de ideas del futuro.

Para entender este punto, piensa en la historia que has recorrido: primero hubo redes de conmutación de circuitos (RDSI, ADSL), luego IP conquistó el mundo, y ahora las tablas de BGP crecen sin control y las direcciones se agotan. Este es el capítulo donde miras al horizonte. Y recuerda: las propuestas aquí son **investigación, no tecnología desplegada**.

---

## 🕰️ De Frame Relay a la era IP

Antes de soñar con el futuro, conviene recordar el pasado (y de paso, cumplir con los CEs de la asignatura):

| Tecnología histórica | Qué era |
|---|---|
| **Frame Relay** | Red de conmutación de tramas para WAN (años 90) |
| **RDSI** | Red digital de servicios integrados: voz y datos digitales sobre cobre |
| **ADSL** | Acceso a Internet sobre la línea telefónica (asimetría: más bajada que subida) |

Estas tecnologías fueron el andamiaje sobre el que creció Internet. Hoy son historia, pero **toda red tiene un pasado y un futuro**: lo que ahora es "clásico", en su día fue vanguardia. Ese es el punto de partida para hablar de lo que viene.

---

## 🌍 El problema que IPv6 no termina de resolver

**IPv6** (U06) resolvió el problema más urgente: el **agotamiento de direcciones** (128 bits, autoconfiguración, sin NAT). Pero hay problemas que IPv6 no toca:

- Las **tablas de BGP crecen sin control**: cada año hay más rutas que propagar, y el sistema de rutas globales se vuelve frágil.
- Internet sigue siendo **host-centric**: el modelo es "¿quién tiene esa IP?", no "¿quién tiene ese contenido?".
- El **routing global** depende de una jerarquía de ASNs que no escala para siempre.

Es exactamente el debate de la U06 y de la entrevista: **¿IPv6 es suficiente o necesitamos otra Internet?** No hay respuesta única; este punto te da las cartas para argumentar.

---

## 🚀 Las tres propuestas del futuro

| Propuesta | Idea central | Problema que intenta resolver |
|---|---|---|
| **IPv8** | Direcciones basadas en **ASN + IPv4** (ej. `AS13335:8.8.8.8`) | Escalabilidad de BGP + agotamiento de IPv4 |
| **RINA** | Rediseño completo con **capas DIF** (inter-process communication) | Complejidad de la pila TCP/IP actual |
| **NDN** | Enrutar por **nombre del contenido**, no por IP | Modelo host-centric vs content-centric |

### 🧪 IPv8 (draft-thain-ipv8)

La propuesta **experimental** que combina el número de sistema autónomo (ASN) con la dirección IPv4: una dirección IPv8 sería algo como **`AS13335:8.8.8.8`**. La idea es aprovechar que los ASNs ya identifican "a quién pertenece" cada bloque, simplificando el routing global.

**La realidad:** no es un estándar, no tiene implementación real y **no es compatible con Internet actual**. Es más una **reflexión teórica** —una manera de pensar el direccionamiento— que una solución viable. Por eso aparece en exámenes como "propuesta experimental (no es un estándar oficial)".

### 🧬 RINA (Recursive InterNetwork Architecture)

Rediseña Internet desde cero con un principio elegante: la red como **capas recursivas de comunicación entre procesos** (DIF, *Distributed IPC Facilities*). En lugar de la pila TCP/IP fija de 4 o 7 capas, RINA repite la misma estructura una y otra vez a distintos niveles.

### 📦 NDN (Named Data Networking)

Cambia la pregunta central: en vez de "¿dónde está la IP que tiene este contenido?", pregunta **"¿quién tiene este contenido por su nombre?"**. El router pide datos por nombre (como si fueras a buscar `"/peliculas/starwars.mp4"`), y cualquier caché intermedia puede responder. Es el modelo *content-centric*, más próximo a cómo funcionan hoy las CDN.

> 💡 **Para no perderte:** IPv6 es **lo que hay** y funciona. IPv8, RINA y NDN son **ideas de investigación**. Cuando alguien te pregunte "¿IPv6 es suficiente?", esta tabla es tu respuesta: IPv6 resuelve direcciones, pero el resto de problemas (BGP, host-centric) siguen abiertos.

---

## 🧭 Cómo se relacionan estas propuestas entre sí

Cada propuesta ataca un frente distinto del mismo problema:

| Propuesta | Frente que ataca | Cambio fundamental |
|---|---|---|
| **IPv6** | Agotamiento de direcciones | Más bits, autoconfiguración, sin NAT |
| **IPv8** | Crecimiento de tablas BGP | Direccionamiento basado en el dueño (ASN) |
| **RINA** | Complejidad de la pila | Capas recursivas en vez de una pila fija |
| **NDN** | Modelo host-centric | Enrutar por nombre de contenido |

No son alternativas excluyentes entre sí: una Internet futura podría, en teoría, usar el direccionamiento de IPv8, la estructura de RINA y el enrutado por contenido de NDN. Pero cada una lleva décadas de investigación detrás y ninguna tiene un despliegue real que amenace a IP. Lo realista: **IPv6 seguirá ganando terreno, y las ideas de estas propuestas inspirarán mejoras incrementales** (por ejemplo, los enrutadores ya hacen caché de contenido — un guiño a NDN).

---

## 🧠 Mini-chequeo

1. ¿Qué formato de dirección propone IPv8?
2. ¿Es IPv8 un estándar oficial? ¿Por qué?
3. Nombra dos problemas que IPv6 NO resuelve y que motivan RINA/NDN.

<details>
<summary>🔄 Respuestas</summary>

1. **ASN + IPv4**, por ejemplo `AS13335:8.8.8.8`.
2. **No**. Es un draft experimental (draft-thain-ipv8), sin implementación real ni compatibilidad con Internet actual. Es una reflexión teórica.
3. El **crecimiento descontrolado de las tablas BGP** y el modelo **host-centric** (las redes no entienden de "contenido", solo de direcciones). RINA ataca la complejidad de la pila y NDN el modelo por-nombre.
</details>

---

## ✅ Resumen en 3 frases

- IPv6 resolvió las direcciones, pero **BGP y el modelo host-centric siguen siendo un problema abierto**.
- **IPv8** propone direcciones ASN:IPv4 (experimental, no estándar); **RINA** un rediseño recursivo; **NDN** enrutar por nombre de contenido.
- Ninguna ha reemplazado a IP: son **el laboratorio de ideas** donde se piensa el futuro.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| IPv8 | Draft experimental ASN:IPv4 (no estándar) |
| RINA | Arquitectura recursiva en capas DIF |
| NDN | Redes centradas en el contenido (enrutar por nombre) |
| BGP | Protocolo de rutas entre ASNs (el "mapa" global) |
| Host-centric | Modelo actual: todo gira en torno a la dirección del host |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/13-cloud-virtualizacion-futuro) · **Anterior:** [07 · IoT, 5G y edge computing](/ApuntesRedes/13-cloud-virtualizacion-futuro/07-iot-5g-y-edge) · **Siguiente:** [09 · Cierre](/ApuntesRedes/13-cloud-virtualizacion-futuro/09-cierre)