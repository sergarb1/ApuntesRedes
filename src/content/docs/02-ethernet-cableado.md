---
title: U02 — Ethernet, medios de transmisión y cableado
description: Donde todo viaje empieza por un cable 📡
---

<p><small>Donde todo viaje empieza por un cable 📡</small></p>

> 🗺️ **El mapa del curso:** 🚪 Introducción → **📡 AQUÍ ESTÁS (U02)** → 🧮 IP → 🔀 Switching

---

*Antes de cualquier IP, antes de cualquier VLAN, hay alguien que convierte un 1 binario en un pulso eléctrico, un destello de luz o una onda de radio. Y alguien más tiene que garantizar que ese 1 llegue entero a su destino, sin que una silla lo pise ni un motor eléctrico le susurre tonterías. Ese alguien es la capa física, y Ethernet es su idioma.*

Bienvenido a la primera unidad de contenidos. Aquí estudias el mundo físico que sostiene todo lo demás: los medios guiados (cobre, fibra) y no guiados (radio), las normas de cableado, cómo se crimpa un RJ45, cómo se organiza el cableado de un edificio y, como broche, la trama Ethernet: el sobre que envuelve todos los datos de tu red local.

Esta unidad se lee como un **libro de 10 capítulos**: los 9 primeros son teoría en progresión y el 10º es el aterrizaje práctico con laboratorio.

---

## 🎯 Objetivo de la unidad

Al terminar, serás capaz de:

- Comparar los medios de transmisión (cobre, fibra, aire) por velocidad, distancia, coste e inmunidad.
- Explicar la estructura del cable UTP, las categorías y el papel del trenzado.
- Diferenciar cable directo, cruzado y de consola, y conocer los pinouts T568A/B.
- Crimpar y comprobar un cable con tester, diagnosticando fallos típicos (split pair, par muerto).
- Elegir entre fibra monomodo y multimodo según distancia y presupuesto.
- Aplicar conceptos físicos clave: atenuación, diafonía, anchura de banda vs velocidad.
- Diseñar el cableado estructurado de un edificio (TIA/EIA-568): rack, patch panel, horizontal.
- Situar las capas 1 y 2 en el modelo OSI (y distinguirlo de TCP/IP como modelo real).
- Analizar la trama Ethernet: MACs, EtherType, MTU y FCS; comparar 802.3 (guiado) y 802.11 (no guiado).

---

## 🗺️ Mapa de la unidad

| Punto | Qué aprenderás | Nivel |
|---|---|---|
| [01 · Medios de transmisión](/ApuntesRedes/02-ethernet-cableado/01-medios-de-transmision) | Cobre, fibra y aire a vista de pájaro | Todos |
| [02 · El cable UTP](/ApuntesRedes/02-ethernet-cableado/02-cable-utp) | Categorías, pares y trenzado | Todos |
| [03 · Directo, cruzado y consola](/ApuntesRedes/02-ethernet-cableado/03-directo-cruzado-consola) | Pinouts T568A/B y cuándo usar cada cable | Todos |
| [04 · Crimpado y comprobación](/ApuntesRedes/02-ethernet-cableado/04-crimpado-y-comprobacion) | El laboratorio real: crimpar y tester | Práctico |
| [05 · Fibra óptica](/ApuntesRedes/02-ethernet-cableado/05-fibra-optica) | Monomodo vs multimodo, conectores y usos | Todos |
| [06 · Conceptos físicos clave](/ApuntesRedes/02-ethernet-cableado/06-conceptos-fisicos) | Atenuación, diafonía, Mbps vs MHz | Clave |
| [07 · Cableado estructurado](/ApuntesRedes/02-ethernet-cableado/07-cableado-estructurado) | TIA/EIA-568: rack, patch panel, horizontal | Todos |
| [08 · El modelo OSI](/ApuntesRedes/02-ethernet-cableado/08-modelo-osi) | 7 capas, TCP/IP de cultura, dónde estamos | Clave |
| [09 · La trama Ethernet](/ApuntesRedes/02-ethernet-cableado/09-trama-ethernet) | Capa 2: MACs, EtherType, FCS, 802.3 y 802.11 | Clave |
| [10 · Cierre](/ApuntesRedes/02-ethernet-cableado/10-cierre) | Sé el Bit, Fireside, Laboratorio, Crucigrama… | Todos |

> 📖 **Flujo de lectura:** los 9 primeros puntos son teoría en progresión. El 10º es el aterrizaje práctico: léelo justo después del 9º y antes de abrir los boletines.

---

## 📝 Boletines de la unidad

> Practica con los pares del curso: empezar siempre el resuelto para ver el estilo y luego intentar el por-resolver.

<div class="ejercicio-links">
  <a href="/ApuntesRedes/boletines/boletin-u02-inicial" class="elink">🟢 Inicial por resolver</a>
  <a href="/ApuntesRedes/boletines/boletin-u02-inicial-resuelto" class="elink">✅ Inicial resuelto</a>
  <a href="/ApuntesRedes/boletines/boletin-u02-avanzado" class="elink">⭐ Avanzado por resolver</a>
  <a href="/ApuntesRedes/boletines/boletin-u02-avanzado-resuelto" class="elink">💪 Avanzado resuelto</a>
  <a href="/ApuntesRedes/boletines/boletin-u02-packettracer" class="elink">🖥️ Packet Tracer por resolver</a>
  <a href="/ApuntesRedes/boletines/boletin-u02-packettracer-resuelto" class="elink">✅ Packet Tracer resuelto</a>
</div>

---

## ✅ Criterios de evaluación cubiertos (RA1/RA2)

| CE | Criterio | Dónde se cubre |
|---|---|---|
| RA1·b) | Medios de transmisión | ✅ Puntos 1, 2 y 5 |
| RA2·a) | Estándares para redes cableadas | ✅ Puntos 2-3 y 7 |
| RA2·b) | Montaje de cables | ✅ Punto 4 + ⚡ Laboratorio (punto 10) |
| RA2·c) | Comprobadores de conectividad | ✅ Puntos 4 y 6 |
| RA1·d) | Trama y encapsulación Ethernet | ✅ Puntos 8–9 + 🧠 Atrévete a pensar (punto 10) |

---

## 🚪 ¿Por dónde empiezo?

- ¿Vienes de la Unidad 01? Perfecto: ahí viste el mapa; aquí empieza el viaje de verdad.
- ¿Ya crimpeas cables? Salta al [modelo OSI](/ApuntesRedes/02-ethernet-cableado/08-modelo-osi) y a la [trama Ethernet](/ApuntesRedes/02-ethernet-cableado/09-trama-ethernet), lo más "examen" de la unidad.

**📍 Primer punto:** [01 · Medios de transmisión](/ApuntesRedes/02-ethernet-cableado/01-medios-de-transmision)  
**⏭️ Al acabar la unidad, continúa en [UD3 · Direccionamiento IP y subnetting](/ApuntesRedes/03-direccionamiento-ip).**
