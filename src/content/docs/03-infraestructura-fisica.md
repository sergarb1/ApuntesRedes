---
title: U03 — Infraestructura física de red
description: El cable traicionero 🔌
---

<p><small>El cable traicionero 🔌</small></p>

> 🗺️ **El mapa del curso:** 📡 U02 → **🔌 AQUÍ ESTÁS (U03)** → 🧮 IPv4 → 🚀 IPv6 → 🔀 Switching → 🏢 VLAN → 🧭 Routing → 🗣️ OSPF → 🌐 NAT → 🩺 Diagnóstico → ☁️ Cloud

---

*Los bits viajan por el cable UTP a 1 Gbps. De repente, el mundo se vuelve ruido: interferencias electromagnéticas, atenuación, diafonía. Los 1s y 0s se distorsionan y las tramas comienzan a llegar con errores CRC.*

Bienvenido al mundo físico. Donde los cables son héroes anónimos... hasta que fallan. En U02 terminaste viendo cómo cada paquete se envuelve en cabeceras y viaja por la red; la capa 1 era esa casilla que todos pasaban de largo. Aquí te bajan del avión: vas a comprobar que antes de hablar de IPs o VLANs, todo se sostiene sobre **cobre, luz o aire**. Entenderás por qué el cable UTP tiene 8 hilos, por qué se trenzan en parejas, cómo se crimpa un RJ45, cuándo la fibra manda, por qué el WiFi rinde menos de lo que promete, y cómo se diseña el cableado estructurado de un edificio serio.

Esta unidad se lee como un **libro de 9 capítulos**: cada punto desarrolla una idea completa y enlaza con el siguiente.

---

## 🎯 Objetivo de la unidad

Al terminar, serás capaz de:

- Comparar los tres medios de transmisión (cobre, fibra y aire) y elegir el adecuado según velocidad, distancia y presupuesto.
- Describir la anatomía del cable UTP: 8 hilos, 4 pares trenzados, colores y categorías (Cat5e → Cat8).
- Distinguir cable directo, cruzado y de consola, y explicar los pinouts T568A y T568B y el Auto MDI-X.
- Crimpar un RJ45 con norma T568B y diagnosticar el resultado con un comprobador de cables.
- Explicar las ventajas de la fibra óptica, diferenciar monomodo/multimodo y conocer conectores y módulos SFP.
- Relacionar los estándares WiFi con sus bandas y velocidades, y sus limitaciones prácticas.
- Explicar ancho de banda, throughput, latencia, atenuación y diafonía, y el cableado estructurado de un edificio (TIA/EIA-568).

---

## 🗺️ Mapa de la unidad

| Punto | Qué aprenderás | Nivel |
|---|---|---|
| [01 · Medios de transmisión](/ApuntesRedes/03-infraestructura-fisica/01-medios-de-transmision) | Cobre vs fibra vs aire: la tabla comparativa y cuándo elegir cada uno | Todos |
| [02 · El cable UTP](/ApuntesRedes/03-infraestructura-fisica/02-cable-utp) | 8 hilos, 4 pares, colores, trenzado y categorías | Todos |
| [03 · Directo, cruzado y consola](/ApuntesRedes/03-infraestructura-fisica/03-directo-cruzado-consola) | T568A vs T568B, qué conecta cada cable, Auto MDI-X, rollover | Todos |
| [04 · Crimpado y comprobación](/ApuntesRedes/03-infraestructura-fisica/04-crimpado-y-comprobacion) | Crimpar RJ45 paso a paso, tester y fallos típicos | Todos |
| [05 · Fibra óptica](/ApuntesRedes/03-infraestructura-fisica/05-fibra-optica) | Ventajas, monomodo vs multimodo, conectores y SFP | Todos |
| [06 · WiFi](/ApuntesRedes/03-infraestructura-fisica/06-wifi) | Estándares 802.11 y las 4 mentiras de la velocidad WiFi | Todos |
| [07 · Conceptos físicos clave](/ApuntesRedes/03-infraestructura-fisica/07-conceptos-fisicos) | Ancho de banda, throughput, latencia, atenuación, diafonía | Todos |
| [08 · Cableado estructurado](/ApuntesRedes/03-infraestructura-fisica/08-cableado-estructurado) | TIA/EIA-568, latiguillos, keystones, patch panels y ventajas | Todos |
| [09 · Head First (cierre)](/ApuntesRedes/03-infraestructura-fisica/09-head-first) | Be the Bit, Fireside, Laboratorio de crimpado, Crucigrama… | Todos |

> 📖 **Flujo de lectura:** los 8 primeros puntos son teoría en progresión. El 9º es el aterrizaje práctico: léelo justo después del 8º y antes de abrir los boletines.

---

## 📝 Boletines de la unidad

> Practica con los pares del curso: empezar siempre el resuelto para ver el estilo y luego intentar el por-resolver.

<div class="ejercicio-links">
  <a href="/ApuntesRedes/boletines/boletin-u03-inicial-resuelto" class="elink">✅ Inicial resuelto</a>
  <a href="/ApuntesRedes/boletines/boletin-u03-inicial" class="elink">🟢 Inicial por resolver</a>
  <a href="/ApuntesRedes/boletines/boletin-u03-avanzado-resuelto" class="elink">💪 Avanzado resuelto</a>
  <a href="/ApuntesRedes/boletines/boletin-u03-avanzado" class="elink">⭐ Avanzado por resolver</a>
</div>

---

## ✅ Criterios de evaluación cubiertos (RA2)

**RA2: Integra ordenadores y periféricos en redes cableadas e inalámbricas.**

| CE | Criterio | Dónde se cubre |
|---|---|---|
| a) | Estándares para redes cableadas | ✅ Puntos 2 y 3 |
| b) | Montaje de cables | ✅ Punto 4 + ⚡ Laboratorio |
| c) | Comprobadores de conectividad | ✅ Puntos 4, 7 y 8 + ⚡ Laboratorio |
| d) | Direccionamiento lógico IP | ✅ Introducción (se desarrolla en U04) |
| e) | Estándares inalámbricos | ✅ Punto 6 |
| f) | Integración de dispositivos | ✅ Punto 8 |

---

## 🚪 ¿Por dónde empiezo?

- ¿Necesitas refrescar dónde vive la capa física y qué le pasa a un paquete antes de llegar al cable? → Repasa el [punto 1 del modelo OSI](/ApuntesRedes/02-modelos-osi-analisis/01-modelo-osi) de la U02, donde la capa 1 se encarga de los bits y los medios físicos.
- ¿Ya sabes lo básico? → Arranca directamente en el [punto 1](/ApuntesRedes/03-infraestructura-fisica/01-medios-de-transmision).

**📍 Primer punto:** [01 · Medios de transmisión](/ApuntesRedes/03-infraestructura-fisica/01-medios-de-transmision)  
**⏭️ Al acabar la unidad, continúa en [U04 · IPv4 y subnetting](/ApuntesRedes/04-ipv4-subnetting).**