---
title: 8 — El modelo OSI
description: Siete capas de teoría para ubicar dónde juega Ethernet 🧅
---

<p><small>Siete capas de teoría para ubicar dónde juega Ethernet 🧅</small></p>

> 🗺️ **Estás en:** 📡 **UD2 · Ethernet y cableado** → 8 · El modelo OSI

---

## 📬 La idea en una frase

> El **modelo OSI** es un **mapa teórico de 7 capas** que reparte el trabajo de la red; en la práctica el mundo usa **TCP/IP**, pero seguimos usando el mapa OSI para **hablar el mismo idioma** y saber que esta unidad vive en las **capas 1 y 2**.

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

> 💡 **Truco de los tres abajo:** **1** = bits, **2** = trama, **3** = paquete. Si recuerdas esa escalera, ya puedes situar cualquier fallo con la [escalera del ping de UD1](/ApuntesRedes/01-introduccion/06-metodo-diagnostico).

![Modelo OSI de 7 capas con la marca de dónde estamos: las capas 1 y 2 de la UD2](/ApuntesRedes/diagrams/u02-modelo-osi.svg)

---

## 📍 ¿Dónde estamos en el mapa?

Esta unidad (UD2) es **casi toda capa 1 y capa 2**:

- **Capa 1 — Física:** los medios que ya viste (cobre, fibra, aire), atenuación, crimpado, cableado del edificio.
- **Capa 2 — Enlace:** la **trama Ethernet** (punto 9): MACs, EtherType, FCS. El switch de la [UD4](/ApuntesRedes/04-switching/01-que-es-un-switch) también vive aquí.

La **capa 3 (IP)** es la [UD3](/ApuntesRedes/03-direccionamiento-ip); el direccionamiento y las rutas **no** son tema de cableado.

| Si esto falla… | Estás en… | Unidad |
|---|---|---|
| Cable suelto, LED apagado, señal débil | Capa 1 | UD2 (puntos 1–7) |
| Trama con FCS mal, MAC desconocida | Capa 2 | UD2 (punto 9) y UD4 |
| No hay ping a la IP de la red vecina | Capa 3 | UD3, UD6, UD7 |

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
- **Enlace (2) + Física (1)** → capas de **acceso a la red** (lo tuyo en esta unidad).

> ⚠️ **Ojo con el lenguaje de clase:** cuando un profe o un manual dice *"capa 2"* o *"capa 3"*, está usando **OSI como mapa**, aunque el equipo corra TCP/IP. Nadie instala "la capa 6"; sí existen Ethernet, IP y TCP.

---

## 🧠 Mini-chequeo

1. ¿Qué PDU viaja en la capa 1, en la 2 y en la 3?
2. ¿En qué capas "vive" esta unidad (UD2) y por qué?
3. ¿ OSI y TCP/IP son protocolos o modelos? ¿Cuál se usa de verdad en Internet?

<details>
<summary>🔄 Respuestas</summary>

1. **1 → bits · 2 → trama · 3 → paquete.**
2. **Capas 1 y 2:** medios y cableado (1) y trama Ethernet con MACs (2). La capa 3 (IP) es UD3.
3. Son **modelos** (mapas). En Internet manda **TCP/IP**; OSI se usa para **nombrar** capas y diagnosticar.
</details>

---

## ✅ Resumen en 3 frases

- OSI es un **modelo teórico de 7 capas** que da un vocabulario común: cada capa tiene su tarea, su PDU y sus dispositivos.
- En el día a día corre **TCP/IP** (4–5 capas), pero seguimos diciendo "capa 2" y "capa 3" al estilo OSI.
- La UD2 trabaja en las **capas 1 (bits) y 2 (trama Ethernet)**; la IP y las rutas son capa 3 (UD3 en adelante).

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

📚 [Volver al índice de la unidad](/ApuntesRedes/02-ethernet-cableado) · **Anterior:** [7 · Cableado estructurado](/ApuntesRedes/02-ethernet-cableado/07-cableado-estructurado) · **Siguiente:** [9 · La trama Ethernet](/ApuntesRedes/02-ethernet-cableado/09-trama-ethernet)
