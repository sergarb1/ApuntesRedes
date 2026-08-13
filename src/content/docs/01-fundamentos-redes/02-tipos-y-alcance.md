---
title: 02 — Tipos de red y alcance
description: PAN, LAN, MAN... y cómo clasificar cualquier red 🔍
---

<p><small>PAN, LAN, MAN... y cómo clasificar cualquier red 🔍</small></p>

> 🗺️ **Estás en:** 🌐 **U01 · Fundamentos de redes** → 02 · Tipos de red y alcance

---

## 📬 La idea en una frase

> **Las redes se clasifican sobre todo por el territorio que cubren: de lo que te rodea (PAN) al planeta entero (WAN).**

Un auricular Bluetooth, un instituto, una ciudad y un continente son redes de tamaños muy distintos, y la tecnología que necesitas también lo es.

---

## 🌍 La clasificación por alcance

| Tipo | Área | Latencia típica | Ejemplo |
|---|---|---|---|
| **PAN** (Personal Area Network) | Unos metros | < 1 ms | Bluetooth del móvil con sus auriculares |
| **LAN** (Local Area Network) | Un edificio o planta | < 1 ms | Red de una oficina, de un instituto o tu casa |
| **CAN** (Campus Area Network) | Varios edificios cercanos | 1-5 ms | Campus universitario, polígono industrial |
| **MAN** (Metropolitan Area Network) | Una ciudad | 5-50 ms | Fibra óptica municipal |
| **WAN** (Wide Area Network) | Un país o continente | 20-300 ms | Internet, unión entre sedes de una empresa |

### Lectura fácil de la tabla

- **PAN** (del latín *personal*): lo que alcanzas con el brazo. El Bluetooth de tus cascos es una PAN.
- **LAN**: la red que administrarás en tu día a día: una clase, una oficina, un edificio. Rápida y barata.
- **CAN**: une varias LAN cercanas, como los edificios de un campus universitario.
- **MAN**: una red que cruza una ciudad. Normalmente la despliega el ayuntamiento o un operador con fibra óptica.
- **WAN**: la que une ciudades, países y continentes. Internet es la madre de todas las WAN.

> 💡 **Analogía de los pies:** la PAN es tu mochila, la LAN tu barrio, la MAN tu ciudad, la WAN tu país. Según a dónde quieras llegar, necesitas una infraestructura distinta.

---

## 🧭 De dónde vienen las siglas

No hay que memorizarlas a ciegas: vienen del inglés y son autoexplicativas.

| Sigla | Inglés | Idea |
|---|---|---|
| **PAN** | Personal Area Network | Lo que te rodea |
| **LAN** | Local Area Network | Tu edificio o planta |
| **MAN** | Metropolitan Area Network | Tu ciudad |
| **WAN** | Wide Area Network | Países y continentes |

Si recuerdas que *local*, *metropolitan* y *wide* son radios de acción crecientes, jamás confundirás LAN con WAN en un examen.

---

## ⏱ Los dos botones de una red: ancho de banda y latencia

Todos los tipos de red se comparan con dos medidores:

- **Ancho de banda (velocidad):** cuántos datos caben por segundo. Una LAN gigabit `mueve` datos en un instante; un enlace WAN contratado, menos.
- **Latencia:** cuánto tarda un paquete en llegar. Se mide con `ping` y se llama **RTT** (*Round Trip Time*).

| Criterio | LAN | WAN |
|---|---|---|
| Ancho de banda | Alto y barato | Limitado y caro |
| Latencia | < 1 ms (inapreciable) | 20–300 ms (perceptible) |
| Control | 100% tuyo | Depende del operador |

> 💡 **Analogía de la carretera:** el ancho de banda son los carriles (cuántos coches pueden pasar a la vez) y la latencia el tiempo que tarda un coche en recorrer la distancia. Puedes tener muchos carriles y tardar igual por trayecto; por eso no son lo mismo.

---

## ⚖️ Qué implica cada tipo en la práctica

- **LAN**: baja latencia y alta velocidad. Ideal para aplicaciones locales (archivos compartidos, impresoras, servidores internos).
- **WAN**: mayor latencia y menor ancho de banda. Se contrata a operadores y cuesta dinero mantener (enlaces, fibra, satélite).
- **PAN y LAN** son cosa tuya (las montas tú). **MAN y WAN** son cosa de operadores: tu responsabilidad termina donde empieza el enlace contratado.

> 💡 **Para este curso nos focalizamos en LAN y WAN.** Las LAN son lo que administrarás a diario. Las WAN son cómo se conectan esas LAN entre sí. La mayoría de ejercicios usan LAN, pero sin WAN no entendemos Internet.

---

## 🗂 Las otras formas de clasificar una red

El tamaño no es el único criterio. Un técnico clasifica las redes por varios ejes a la vez:

| Criterio | Categorías |
|---|---|
| **Medio físico** | Cableadas (UTP, fibra, coaxial) vs inalámbricas (WiFi, satélite, 5G) |
| **Propiedad** | Pública (Internet) vs privada (intranet corporativa) |
| **Topología** | Estrella, bus, anillo, malla, árbol, híbrida (veremos en [03](/ApuntesRedes/01-fundamentos-redes/03-topologias)) |
| **Arquitectura** | Cliente-Servidor vs Peer-to-Peer (visto en [01](/ApuntesRedes/01-fundamentos-redes/01-que-es-una-red)) |
| **Nivel de acceso** | Intranet (privada), extranet (con socios), Internet (pública) |
| **Velocidad** | Ethernet (100 Mbps), Fast Ethernet (1 Gbps), 10GbE (10 Gbps) |

### Ejemplo: clasifica la red de una oficina

> Una empresa con 40 empleados en una planta:
> - **Por alcance:** LAN (todo en un edificio).
> - **Por medio:** cableada (UTP) + WiFi para visitas.
> - **Por propiedad:** privada (intranet).
> - **Por arquitectura:** cliente-servidor (hay un servidor de ficheros).
> - **Por velocidad:** Fast Ethernet (1 Gbps) en la entrada de cada PC.

---

## 💡 Punto de partida sobre medios

Cuando hablamos de "medio de transmisión" nos referimos al canal físico por donde viajan los datos: cable de cobre trenzado (UTP), **fibra óptica** (pulsos de luz) u **ondas electromagnéticas** (WiFi, 5G, satélite). En la U03 los estudiaremos a fondo:

- El cable **no equivale a Internet**: es solo el tubo.
- La **fibra** viaja por luz y es más rápida y con menos interferencias que el cobre.
- El **WiFi** es práctico pero comparte el medio y sufre más interferencias.

---

## 🏠 Ejemplo resuelto: la red de tu casa

Clasifica tu infraestructura doméstica con los criterios del punto:

| Criterio | Clasificación |
|---|---|
| **Alcance** | LAN dentro del hogar; el enlace del operador es una WAN |
| **Medio** | WiFi (móviles, portátil) + UTP (PC fijo, TV) + fibra de bajada |
| **Propiedad** | Privada tuya (la red de tu salón) sobre infraestructura de un operador |
| **Arquitectura** | Cliente-servidor: tu móvil pide al router y este a los servidores de Internet |

El único punto donde tu LAN toca el mundo es el **router**: ahí acabas tú y empieza la red del operador. Por eso, cuando "no hay Internet", primero decides si el fallo está en tu LAN (pasos vistos en [08](/ApuntesRedes/01-fundamentos-redes/08-conectividad-basica)) o en el enlace contratado.

---

## 🧠 Mini-chequeo

1. El Bluetooth entre tu móvil y tus cascos, ¿qué tipo de red es?
2. Una empresa contrata fibra para unir sus 3 edificios dentro de la misma ciudad: ¿LAN, MAN o WAN? ¿Por qué?

<details>
<summary>🔄 Respuestas</summary>

1. Una **PAN**: cubre unos metros alrededor de tu cuerpo.
2. Una **MAN o una WAN de distrito**: cruza varios edificios (CAN) o una ciudad (MAN). No es una LAN porque no es un solo edificio; tampoco es un país entero.

</details>

---

## ✅ Resumen en 3 frases

1. Según el territorio cubierto, las redes son PAN, LAN, CAN, MAN o WAN; cuanto más enorme, mayor latencia y más contratación externa.
2. Un técnico clasifica cada red por varios criterios a la vez: alcance, medio, propiedad, topología, arquitectura, acceso y velocidad.
3. La **LAN** es tu territorio de trabajo; la **WAN** une LANs entre sí y es lo que gobierna Internet.

> 🐛 **Vocabulario rápido**
>
> | Término | Idea general |
> |---|---|
> | LAN | Red local: un edificio o una planta |
> | WAN | Red extensa: une ciudades o países |
> | MAN | Red metropolitana: atraviesa una ciudad |
> | PAN | Red personal: lo que te rodea (Bluetooth) |
> | Intranet | Red privada de una organización |
> | Extranet | Extiende la intranet a socios externos |

📚 [Volver al índice de la unidad](/ApuntesRedes/01-fundamentos-redes) · **Anterior:** [01 · ¿Qué es una red?](/ApuntesRedes/01-fundamentos-redes/01-que-es-una-red) · **Siguiente:** [03 · Topologías](/ApuntesRedes/01-fundamentos-redes/03-topologias)