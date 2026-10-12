---
title: 1 — El modelo OSI
description: Siete capas de teoría para ubicar dónde juega Ethernet 🧅
---

<p><small>Siete capas de teoría para ubicar dónde juega Ethernet 🧅</small></p>

> 🗺️ **Estás en:** 🔗 **Capa de enlace y trama Ethernet** → 1 · El modelo OSI

---

## 📬 La idea en una frase

> El **modelo OSI** es un **mapa teórico de 7 capas** que reparte el trabajo de la red; en la práctica el mundo usa **TCP/IP**, pero seguimos usando el mapa OSI para **hablar el mismo idioma** y saber que esta unidad vive en la **capa 2** (con la 1, la anterior, como suelo).

---

## 🧅 ¿Qué es el modelo OSI?

El **OSI** (*Open Systems Interconnection*) lo definió la ISO en los años 80 como **modelo de referencia**: no es un protocolo que se instale, sino un **vocabulario compartido**. Corta la comunicación en **7 capas**; cada una hace una tarea y se comunica con las de al lado.

La regla de oro: **cada capa solo habla con la suya** (por encima y por debajo). Si la capa 2 no sabe cómo mover bits, no le importa: se los pide a la capa 1.

---

## 🗼 Las 7 capas (de arriba a abajo)

| # | Capa | Qué hace en una frase | PDU (lo que "viaja") | Ejemplo / dispositivo |
|---|---|---|---|---|
| 7 | **Aplicación** | Habla con el programa del usuario | Mensaje / datos | HTTP, DNS, el navegador |
| 6 | **Presentación** | Traduce, comprime, cifra | Datos | TLS, JPEG, UTF-8 |
| 5 | **Sesión** | Abre, mantiene y cierra conversaciones | Datos | Sesiones RPC, cookies de sesión |
| 4 | **Transporte** | Fiabilidad y puertos de extremo a extremo | Segmento / datagrama | TCP, UDP |
| 3 | **Red** | Direccionamiento lógico y rutas | **Paquete** | IP, routers |
| 2 | **Enlace** | Entrega en la red local por MAC | **Trama** | Ethernet, switches |
| 1 | **Física** | Bits por el medio (cable, fibra, aire) | **Bits** | Cable UTP, fibra, radio |

> 💡 **Truco de los tres abajo:** **1** = bits, **2** = trama, **3** = paquete. Si recuerdas esa escalera, ya puedes situar cualquier fallo con la [escalera del ping](/ApuntesRedes/01-introduccion/07-metodo-diagnostico).

![Modelo OSI de 7 capas con la marca de dónde estamos: las capas 1 y 2](/ApuntesRedes/diagrams/u03-modelo-osi.svg)

---

## 📍 ¿Dónde estamos en el mapa?

La unidad anterior se quedó con la **capa 1**; esta es **toda capa 2**:

- **Capa 1 — Física (unidad anterior):** los medios (cobre, fibra, aire), atenuación, crimpado, cableado del edificio.
- **Capa 2 — Enlace (aquí):** la **trama Ethernet** (punto 3): MACs, EtherType, FCS. El switch de la [unidad de switching](/ApuntesRedes/05-switching/01-que-es-un-switch) también vive aquí.

La **capa 3 (IP)** es la [unidad de dirección IP](/ApuntesRedes/04-direccionamiento-ip); el direccionamiento y las rutas **no** son tema de enlace.

| Si esto falla… | Estás en… | Dónde se ve |
|---|---|---|
| Cable suelto, LED apagado, señal débil | Capa 1 | En la unidad anterior de medios y cableado |
| Trama con FCS mal, MAC desconocida | Capa 2 | Aquí (punto 3) y en switching |
| No hay ping a la IP de la red vecina | Capa 3 | En unidades posteriores |

---

## 📚 OSI (teoría) vs TCP/IP (la realidad)

**Cultura de examen y de oficio, sin profundizar de más:** OSI es el **modelo didáctico**; TCP/IP es la **pila que corre en tu ordenador** y en Internet.

| | **OSI** (modelo teórico) | **TCP/IP** (modelo real) |
|---|---|---|
| Capas | **7**, muy separadas | **4–5** (aplicación, transporte, internet, enlace + física) |
| Quién lo usa | Normativa, exámenes, hablar entre profes | El tráfico de verdad de Internet |
| Relación | Describe *qué* haría cada función | Agrupa presentación/sesión **dentro de la aplicación** |

En la práctica:

- **Aplicación + Presentación + Sesión (OSI)** → una sola capa de **aplicación** en TCP/IP.
- **Red (3)** → capa **internet** (IP).
- **Enlace (2) + Física (1)** → capas de **acceso a la red** (lo tuyo aquí, sobre todo la 2).

> ⚠️ **Ojo con el lenguaje de clase:** cuando un profe o un manual dice *"capa 2"* o *"capa 3"*, está usando **OSI como mapa**, aunque el equipo corra TCP/IP. Nadie instala "la capa 6"; sí existen Ethernet, IP y TCP.

---

## 🧠 Mini-chequeo

1. ¿Qué PDU viaja en la capa 1, en la 2 y en la 3?
2. ¿En qué capa "vive" esta unidad y por qué?
3. ¿OSI y TCP/IP son protocolos o modelos? ¿Cuál se usa de verdad en Internet?

<details>
<summary>🔄 Respuestas</summary>

1. **1 → bits · 2 → trama · 3 → paquete.**
2. **Capa 2:** trama Ethernet con MACs. La capa 1 (medios) se estudió en la unidad anterior y la 3 (IP) vive en la unidad de dirección IP.
3. Son **modelos** (mapas). En Internet manda **TCP/IP**; OSI se usa para **nombrar** capas y diagnosticar.
</details>

---

## ✅ Resumen en 3 frases

- OSI es un **modelo teórico de 7 capas** que da un vocabulario común: cada capa tiene su tarea, su PDU y sus dispositivos.
- En el día a día corre **TCP/IP** (4–5 capas), pero seguimos diciendo "capa 2" y "capa 3" al estilo OSI.
- Esta unidad trabaja en la **capa 2 (trama Ethernet)**; la capa 1 se quedó con los medios y la IP (3) es cosa de unidades posteriores.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| OSI | Modelo teórico de 7 capas para describir la red |
| TCP/IP | Pila real de protocolos de Internet (4–5 capas) |
| PDU | Unidad de datos de cada capa (bit, trama, paquete…) |
| Capa 1 / Física | Bits por el medio |
| Capa 2 / Enlace | Tramas y MACs (Ethernet, switch) |
| Capa 3 / Red | Paquetes IP y routers |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/03-capa-de-enlace) · **Anterior:** [Índice de la unidad](/ApuntesRedes/03-capa-de-enlace) · **Siguiente:** [2 · Direcciones MAC](/ApuntesRedes/03-capa-de-enlace/02-direcciones-mac)
