---
title: 04 — SDN
description: El plano de control, separado del plano de datos 🧠
---

<p><small>El plano de control, separado del plano de datos 🧠</small></p>

> 🗺️ **Estás en:** ☁️ U12 → 04 · SDN

---

## 📬 La idea en una frase

> **SDN (Software Defined Networking)** separa el **plano de control** (quién decide por dónde va el tráfico) del **plano de datos** (quién reenvía los paquetes), y centraliza las decisiones en un **controlador** programable.

En toda la asignatura los routers han decidido por su cuenta: cada uno ejecuta OSPF o BGP, construye su tabla de rutas y reenvía. Eso es un plano de control **distribuido**. SDN cambia el guion: un **controlador central** tiene la visión completa de la red y programa los switches, que se vuelven "tontos pero obedientes".

---

## ⚖️ Red tradicional vs SDN

| Componente | Red tradicional | SDN |
|---|---|---|
| **Plano de control** | Distribuido (cada router decide) | Centralizado (controlador) |
| **Plano de datos** | En cada router | Switches "tontos" siguen órdenes |
| **Decisión de reenvío** | Cada router (routing protocol) | Controlador programa flujos |

En una red tradicional, el router calcula y reenvía en el mismo dispositivo: es como si cada conductor de una flota decidiera su propia ruta mirando solo su mapa local. En SDN, un **controlador** (el equivalente a la central de tráfico) calcula las rutas para todos y las instala en los switches, que solo ejecutan órdenes.

```
  Red tradicional                SDN
┌───────────────┐      ┌────────────────────────┐
│ r1 ─ r2 ─ r3  │      │   CONTROLADOR SDN       │
│ cada router   │      │   (visión global)       │
│ calcula su    │      │         │ OpenFlow      │
│ propia ruta   │      │    ┌────┴────┐           │
│  (OSPF/BGP)   │      │    ▼         ▼          │
└───────────────┘      │  switch1 ─ switch2      │
                       │  (reenvían por órdenes) │
                       └────────────────────────┘
```

---

## 📄 OpenFlow: el idioma entre controlador y switch

**OpenFlow** es el protocolo estándar que permite al controlador SDN instalar **reglas de flujo** en los switches. Cada regla dice *qué paquete* y *qué hacer con él*:

```bash
# Ejemplo de regla OpenFlow (conceptual)
match: ip.src=10.0.0.0/8, tcp.dst=80
action: output=port3
```

Traducción: "todo lo que llegue desde la red `10.0.0.0/8` y vaya al puerto TCP 80, sácalo por el puerto 3". Como las ACLs de la U08 pero escritas y gestionadas de forma central. El controlador puede añadir, modificar o borrar estas reglas **sin tocar cada switch a mano**.

> 💡 **Piérdale el miedo al "tonto":** que el switch sea "tonto" no significa que no haga nada: reenvía a línea (por eso es rápido). Solo ha delegado el *pensar* (elegir ruta) en el controlador. Es como el empleado que ejecuta la orden de la central en vez de decidir por su cuenta.

---

## 🎁 Beneficios de SDN

- **Visibilidad global:** el controlador sabe todo lo que pasa en la red en cada momento, no "lo que ve cada router".
- **Programabilidad:** puedes escribir software que controle la red: políticas de seguridad, rutas dinámicas, QoS, todo por API.
- **Automatización:** los cambios de red se hacen desde el controlador sin entrar en cada router manualmente. Reducir una red de 200 routers a un cambio central es otro mundo.

Y un apunte importante: SDN no es "una cosa de laboratorio". Es el modelo que está detrás de los **datacenters cloud** y del **core de 5G** (lo verás en [el punto 7](/ApuntesRedes/12-cloud-virtualizacion-futuro/07-iot-5g-y-edge)). La nube de los puntos 1-3 no se entiende sin este salto conceptual.

---

## 🔄 El ciclo de vida de una regla de flujo

Cuando el controlador quiere cambiar el comportamiento de la red, no toca los switches uno a uno: les **empuja la regla** por OpenFlow. El ciclo típico es:

1. Un switch recibe un paquete que **no coincide con ninguna regla** de su tabla de flujo.
2. El switch **consulta al controlador** (mensaje *packet-in*).
3. El controlador decide la política (¿por dónde debe ir? ¿está permitido?) y responde con la regla (*flow-mod*).
4. El switch **instala la regla y reenvía**; los paquetes siguientes ya van a línea, sin molestar al controlador.

Este diseño explica las dos ventajas que suenan a magia: la **visibilidad global** (el controlador ve cada *packet-in* y cada flujo instalado) y la **automatización** (cambiar una política es empujar nuevas reglas, no configurar 200 routers). El controlador pasa de "guardián" a "planificador".

---

## ⚠️ El punto débil que CONRAD no dejará pasar

SDN tiene un talón de Aquiles: **el controlador es un punto único**. Si se cae, los switches se quedan con las últimas reglas instaladas y pueden seguir reenviando el tráfico conocido, pero no aprenderán rutas nuevas. Por eso en producción:

- Se despliegan **controladores redundantes** (clústeres con elección de líder).
- Los switches guardan reglas de **fallback** para los flujos críticos.
- Se combina con routing tradicional donde la resiliencia distribuida importa más que la centralización.

En resumen: SDN no es "mejor" o "peor" que la red tradicional — es **otra forma de operar**, más programable y observable, con un coste: la disponibilidad del controlador. El [Fireside del cierre](/ApuntesRedes/12-cloud-virtualizacion-futuro/09-head-first) debate exactamente esta tensión.

---

## 🧠 Mini-chequeo

1. ¿Qué plano se centraliza en SDN? ¿Qué pasa con el de datos?
2. ¿Qué protocolo usa el controlador para instalar reglas en los switches?
3. Escribe una regla OpenFlow conceptual que mande al puerto 2 todo el tráfico TCP al puerto 443.

<details>
<summary>🔄 Respuestas</summary>

1. El **plano de control** se centraliza en el controlador; el **plano de datos** queda en los switches, que reenvían según las reglas instaladas.
2. **OpenFlow** — el protocolo estándar controlador ↔ switch.
3. Ejemplo: `match: tcp.dst=443` + `action: output=port2`.
</details>

---

## ✅ Resumen en 3 frases

- SDN **separa control de datos**: el controlador decide, los switches ejecutan.
- **OpenFlow** es el protocolo que materializa esa separación mediante reglas de flujo.
- Los beneficios: **visibilidad global, programabilidad y automatización** — la base de los datacenters y del 5G.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| Plano de control | Quién decide la ruta del tráfico |
| Plano de datos | Quién reenvía los paquetes realmente |
| Controlador SDN | Centro lógico que programa la red |
| OpenFlow | Protocolo estándar controlador ↔ switch |
| Regla de flujo | Par match/action instalado en un switch |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/12-cloud-virtualizacion-futuro) · **Anterior:** [03 · Docker networking](/ApuntesRedes/12-cloud-virtualizacion-futuro/03-docker-networking) · **Siguiente:** [05 · NFV](/ApuntesRedes/12-cloud-virtualizacion-futuro/05-nfv)