---
title: U01 — Fundamentos de redes
description: La red mágica que no funciona 😵‍💫
---

<p><small>La red mágica que no funciona 😵‍💫</small></p>

> 🗺️ **El mapa del paquete:** 🚪 Bienvenida → **🌐 AQUÍ ESTÁS (U01)** → 📦 OSI → 🔌 Físico → 🧮 IPv4 → 🚀 IPv6 → 🔀 Switching → 🏢 VLAN → 🧭 Routing → 🗣️ OSPF → 🌐 NAT → 🩺 Diagnóstico → ☁️ Cloud

---

Bienvenido a la primera unidad de verdad. El Tema 0 te dio la vuelta al castillo: ya sabes *de qué hablamos*. Ahora toca poner los cimientos: qué es una red en profundidad, cuáles son sus piezas, cómo se organizan los dispositivos y cómo se hablan entre sí. No se necesita experiencia previa; solo ganas de montar tu primera red.

Esta unidad se lee como un **libro de 9 capítulos**: cada punto desarrolla una idea completa y enlaza con el siguiente.

---

## 🎯 Objetivo de la unidad

Al terminar, serás capaz de:

- Explicar qué es una red y distinguir los tipos por alcance, medio y arquitectura.
- Reconocer las topologías físicas y lógicas y sus ventajas e inconvenientes.
- Identificar qué dispositivo (hub, switch, router, AP…) trabaja en qué capa y por qué.
- Describir el modelo OSI en 7 capas y su diferencia con el modelo TCP/IP.
- Explicar qué es un protocolo, para qué sirven los puertos y cuándo usar TCP o UDP.
- Diferenciar direcciones MAC e IP y saber qué son máscara y gateway.
- Diagnosticar conectividad básica con `ping`, `ipconfig`, `arp` y `tracert`.

---

## 🗺️ Mapa de la unidad

| Punto | Qué aprenderás | Nivel |
|---|---|---|
| [01 · ¿Qué es una red?](/ApuntesRedes/01-fundamentos-redes/01-que-es-una-red) | Definición, los 4 componentes, cliente/servidor vs P2P | Todos |
| [02 · Tipos de red y alcance](/ApuntesRedes/01-fundamentos-redes/02-tipos-y-alcance) | PAN, LAN, CAN, MAN, WAN y criterios de clasificación | Todos |
| [03 · Topologías](/ApuntesRedes/01-fundamentos-redes/03-topologias) | Física vs lógica, estrella, bus, anillo, malla, árbol | Todos |
| [04 · Dispositivos de red](/ApuntesRedes/01-fundamentos-redes/04-dispositivos) | Hub, switch, router, AP, módem, firewall y su capa | Todos |
| [05 · El modelo OSI](/ApuntesRedes/01-fundamentos-redes/05-modelo-osi) | Por qué 7 capas, qué añade cada una, OSI vs TCP/IP | Todos |
| [06 · Protocolos, el idioma](/ApuntesRedes/01-fundamentos-redes/06-protocolos) | Qué son, puertos, TCP vs UDP | Todos |
| [07 · Direcciones MAC e IP](/ApuntesRedes/01-fundamentos-redes/07-direcciones-mac-ip) | MAC, IPv4 y máscara, especiales, públicas vs privadas | Todos |
| [08 · Conectividad básica](/ApuntesRedes/01-fundamentos-redes/08-conectividad-basica) | Gateway, ping, arp, tracert y método de diagnóstico | Todos |
| [09 · Cierre](/ApuntesRedes/01-fundamentos-redes/09-cierre) | Be the Packet, Fireside, Quién Soy, Laboratorio, Crucigrama… | Todos |

> 📖 **Flujo de lectura:** los 8 primeros puntos son teoría en progresión. El 9º es el aterrizaje práctico: léelo justo después del 8º y antes de abrir los boletines.

---

## 📝 Boletines de la unidad

> Practica con los pares del curso: empezar siempre el resuelto para ver el estilo y luego intentar el por-resolver.

<div class="ejercicio-links">
  <a href="/ApuntesRedes/boletines/boletin-u01-inicial-resuelto" class="elink">✅ Inicial resuelto</a>
  <a href="/ApuntesRedes/boletines/boletin-u01-inicial" class="elink">🟢 Inicial por resolver</a>
  <a href="/ApuntesRedes/boletines/boletin-u01-avanzado-resuelto" class="elink">💪 Avanzado resuelto</a>
  <a href="/ApuntesRedes/boletines/boletin-u01-avanzado" class="elink">⭐ Avanzado por resolver</a>
</div>

---

## ✅ Criterios de evaluación cubiertos (RA1)

**RA1: Reconoce la estructura de las redes de datos identificando sus elementos y principios de funcionamiento.**

| CE | Criterio | Dónde se cubre |
|---|---|---|
| a) | Factores que impulsan la evolución de las redes | ✅ Puntos 1 y 2 |
| b) | Medios de transmisión | ✅ Puntos 2, 4 y 8 |
| c) | Tipos de red y topologías | ✅ Puntos 2 y 3 |
| g) | Elementos funcionales, físicos y lógicos | ✅ Puntos 1, 4 y 5 |
| h) | Dispositivos de interconexión | ✅ Punto 4 + 🔥 Fireside (punto 9) |

---

## 🚪 ¿Por dónde empiezo?

- ¿Cero conocimientos? → Vuelve al [Tema 0](/ApuntesRedes/00-introduccion), te deja en la puerta de esta unidad.
- ¿Ya sabes lo básico? → Arranca directamente en el [punto 1](/ApuntesRedes/01-fundamentos-redes/01-que-es-una-red).

**📍 Primer punto:** [01 · ¿Qué es una red?](/ApuntesRedes/01-fundamentos-redes/01-que-es-una-red)  
**⏭️ Al acabar la unidad, continúa en [U02 · Modelos OSI y análisis](/ApuntesRedes/02-modelos-osi-analisis).**