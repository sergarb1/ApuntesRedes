---
title: Capa de enlace y trama Ethernet
description: Donde los bits se convierten en tramas con nombre y apellidos 🔗
---

<p><small>Donde los bits se convierten en tramas con nombre y apellidos 🔗</small></p>

> 🗺️ **El mapa del curso:** 🚪 Introducción → 📡 Medios y cableado → **🔗 AQUÍ ESTÁS** → 🧮 IP → 🔀 Switching

---

*La unidad anterior te enseñó a mover bits por un cable. Ahora viene la pregunta que todo bit teme: ¿para quién soy? Aquí vives en la capa 2 del modelo OSI: el mapa de las 7 capas, la identidad de 48 bits de cada tarjeta (MAC), el sobre Ethernet que envuelve los datos (la trama) y el arte de encapsularlo todo capa a capa.*

Esta unidad son 5 puntos: 4 de teoría —dos ya famosos, dos nuevos— y el 5º, aterrizaje con juegos y laboratorio.

---

## 🎯 Objetivo de la unidad

Al terminar, serás capaz de:

- Situar las 7 capas del modelo OSI, distinguirlo de TCP/IP y usarlo como mapa de diagnóstico.
- Leer una dirección MAC: OUI, tipo (unicast/multicast/broadcast) y diferencia frente a la IP.
- Analizar la trama Ethernet campo a campo (MACs, EtherType, payload, FCS) y comparar 802.3 con 802.11.
- Explicar la encapsulación y la desencapsulación: de segmento a paquete a trama a bits, y qué cambia en cada salto.

---

## 🗺️ Mapa de la unidad

| Punto | Qué aprenderás | Nivel |
|---|---|---|
| [01 · El modelo OSI](/ApuntesRedes/03-capa-de-enlace/01-modelo-osi) | 7 capas, TCP/IP de cultura, dónde estamos | Clave |
| [02 · Direcciones MAC](/ApuntesRedes/03-capa-de-enlace/02-direcciones-mac) | 48 bits, OUI, broadcast y MAC vs IP | Clave |
| [03 · La trama Ethernet](/ApuntesRedes/03-capa-de-enlace/03-trama-ethernet) | MACs, EtherType, FCS, 802.3 y 802.11 | Clave |
| [04 · Encapsulación: de la trama al paquete](/ApuntesRedes/03-capa-de-enlace/04-encapsulacion) | Muñecas rusas: segmento → paquete → trama → bits | Todos |
| [05 · Cierre](/ApuntesRedes/03-capa-de-enlace/05-cierre) | Sé el Paquete, Fireside, Laboratorio, Crucigrama… | Todos |

> 📖 **Flujo de lectura:** los 4 primeros puntos son teoría en progresión (el 1 es el mapa, el 2 la identidad, el 3 el sobre, el 4 el viaje). El 5º es el aterrizaje: léelo justo después del 4º y antes de abrir los boletines.

---

## 📝 Boletines de la unidad

> Practica con los pares del curso: mira 1-2 resueltos para coger el formato, luego intenta el por-resolver; consulta el resuelto solo cuando te atasques.

<div class="ejercicio-links">
  <a href="/ApuntesRedes/boletines/boletin-u03-inicial" class="elink">🟢 Inicial por resolver</a>
  <a href="/ApuntesRedes/boletines/boletin-u03-inicial-resuelto" class="elink">✅ Inicial resuelto</a>
  <a href="/ApuntesRedes/boletines/boletin-u03-avanzado" class="elink">⭐ Avanzado por resolver</a>
  <a href="/ApuntesRedes/boletines/boletin-u03-avanzado-resuelto" class="elink">💪 Avanzado resuelto</a>
</div>

---

## ✅ Criterios de evaluación cubiertos (RA1)

| CE | Criterio | Dónde se cubre |
|---|---|---|
| RA1·d) | Trama y encapsulación Ethernet | ✅ Puntos 1–4 + 🧠 Atrévete a pensar (punto 5) |

---

## 🚪 ¿Por dónde empiezo?

- ¿Vienes de la unidad de medios? Perfecto: ahí dejaste los bits listos en el cable; aquí empiezan a tener destinatario.
- ¿Ya sabes qué es OSI? Salta al [punto 2](/ApuntesRedes/03-capa-de-enlace/02-direcciones-mac) (las MAC) o al [punto 3](/ApuntesRedes/03-capa-de-enlace/03-trama-ethernet) (la trama), lo más "examen" de la unidad.

**📍 Primer punto:** [01 · El modelo OSI](/ApuntesRedes/03-capa-de-enlace/01-modelo-osi)  
**⏭️ Al acabar la unidad, continúa en [Direccionamiento IP y subnetting](/ApuntesRedes/04-direccionamiento-ip).**
