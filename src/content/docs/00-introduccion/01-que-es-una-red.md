---
title: 01 — ¿Qué es una red?
description: La explicación que tu abuela entendería 💡
---

<p><small>La explicación que tu abuela entendería 💡</small></p>

> 🗺️ **Estás en:** 🚪 **Tema 0** → 01 · ¿Qué es una red?

---

## 📬 La idea en una frase

> **Una red de ordenadores es un grupo de ordenadores conectados entre sí que se hablan y se comparten cosas.**

Si tu grupo de amigos intercambia apuntes y favores en una conversación de grupo, una red hace lo mismo con los ordenadores: les da una "conversación compartida" para **intercambiar archivos, mensajes y recursos** al instante.

---

## 🔍 ¿Por qué el mundo necesita redes?

Un ordenador **aislado** (sin conexión) es como un isleño rodeado de agua: puede hacer muchísimas cosas solo, pero no puede recibir ni enviar nada hasta que se conecta con alguien.

Con una red, en segundos puedes:

- **Compartir archivos**: enviar una foto, un PDF o un vídeo a otro equipo sin lápiz de memoria.
- **Compartir recursos caros**: una sola impresora sirve a toda la oficina, en lugar de una por persona.
- **Comunicarte en tiempo real**: correo, mensajería, videollamadas.
- **Centralizar la información**: los datos viven en un servidor y todos los consultan desde su sitio.
- **Coordinar sedes**: la oficina de Madrid quiere lo que se acabó de generar en Barcelona.
- **Llegar al mundo**: Internet es la red que reúne todas las redes.

> 💡 **Ejemplo típico:** el cable o el WiFi que sale del router de tu casa es lo que "conecta" tu ordenador con los demás. Sin ese medio no hay red; solo ordenadores que se ignoran.

---

## 🧩 Las 4 piezas de toda red

Da igual si hablamos de la red de un instituto, de un hospital o de tu salón: toda red se monta con los mismos 4 ladrillos.

| Pieza | Qué es | Ejemplo |
|---|---|---|
| **Dispositivos finales** | Los equipos que usan las personas | PC, portátil, móvil, impresora, servidor |
| **Dispositivos de interconexión** | Los "intermediarios" que conectan y organizan | Switch, router, antena WiFi (AP), módem |
| **Medio de transmisión** | El canal por donde viajan los datos | Cable de red, fibra óptica, ondas WiFi |
| **Protocolos** | Las "reglas del idioma" que todos respetan | El lenguaje común para que se entiendan |

### Analogía del barrio

Imagina que tu barrio es una red:

- **Los vecinos** son los *dispositivos finales*: los que viven y usan el barrio.
- **Las calles y las aceras** son el *medio de transmisión*: por donde pasa toda la movida.
- **Las señales de tráfico y las reglas** son los *protocolos*: sin reglas, caos.
- **El repartidor, el conserje o la empresa de paquetería** son los *dispositivos de interconexión*: no viven en el barrio, pero hacen que el barrio funcione.

---

## 🗝️ Dos roles que se repiten todo el curso: cliente y servidor

Apunta estas dos palabras, porque **van a aparecer en todas las unidades**:

- **Cliente**: el que pide algo. Tu navegador es un cliente; tu aplicación de correo, un cliente; tu móvil, el cliente de miles de servicios.
- **Servidor**: el que sirve, una máquina pensada para atender a mucha gente: el servidor web de Google, el servidor de correo de tu centro, la base de datos de una empresa.

Ejemplo real: cuando abres `google.com`, **tu ordenador es el cliente** y el servidor de Google es el **servidor**. El cliente pide la página; el servidor la envía. Esa pareja *pido-entrego* se llama **arquitectura cliente-servidor** y domina casi todas las redes de verdad (la alternativa punto a punto la verás en la U01).

> 🧠 **Truco de memoria:** los clientes *piden* (y pueden ser muchos); los servidores *sirven* (suelen ser pocos, pero potentes). En el barrio: los vecinos piden el pan (clientes) y la panadería lo sirve (servidor).

---

## 🌍 Según su tamaño: local, grande o gigante

No es lo mismo cablear tu cuarto que una ciudad entera. Según el terreno cubierto, las redes se clasifican en:

| Tipo | ¿Qué cubre? | Analogía |
|---|---|---|
| **PAN** | Lo que te rodea (bluetooth del móvil con sus auriculares) | Lo que alcanza tu brazo |
| **LAN** | Una casa, una oficina, una planta (cable o WiFi) | El barrio |
| **MAN** | Una ciudad (la fibra municipal) | La ciudad |
| **WAN** | Un país o el mundo (lo que une ciudades entre sí) | El país, el mundo |

> 📌 **No hace falta memorizar aún las siglas.** Con que hoy te quede claro que existen distintos tamaños y que Internet es la mayor red WAN imaginable, es suficiente. En la U01 las veremos todas en detalle.

---

## 🚨 Ojo novato: red ≠ Internet

Uno de los errores clásicos del principiante:

- **Internet** es *la red de redes*: la red mundial que conecta millones de redes entre sí.
- **Un servicio de Internet** (Google, WhatsApp, la banca online) son proyectos *que se ofrecen sobre* Internet.

Cuando montes tu primera red en Packet Tracer **no necesitas Internet para que funcione**: dos PC conectados por un switch que se hacen ping forman una red perfectamente válida. Internet solo aparece cuando unes *esa* red con el resto del mundo (y justo eso será el hilo conductor para aprender routers, IPs y NAT durante todo el curso).

---

## ✅ Resumen en 3 frases

1. Una red es un grupo de dispositivos conectados que comparten recursos e información.
2. Toda red tiene 4 piezas: dispositivos finales, dispositivos de interconexión, medio de transmisión y protocolos.
3. Los dispositivos actúan de **cliente** (pide) o de **servidor** (sirve), y esa relación es la base de casi todo lo que viene.

> 🐛 **Vocabulario rápido (para que nada se te atragante)**
>
> | Término | Idea general |
> |---|---|
> | Red | Varios dispositivos que se hablan y se comparten cosas |
> | LAN / WAN | Red pequeña (edificio) / red grande (país y más) |
> | Switch | El "enchufe inteligente" que conecta los equipos de una red |
> | Router | El "portero" que une tu red con otras o con Internet |
> | Cliente / Servidor | El que pide / el que sirve |
> | Protocolo | Las reglas para que los equipos se entiendan |

📚 [Volver al índice del Tema 0](/ApuntesRedes/00-introduccion) · **Siguiente:** [02 · Términos que no se ven](/ApuntesRedes/00-introduccion/02-terminos-basicos)