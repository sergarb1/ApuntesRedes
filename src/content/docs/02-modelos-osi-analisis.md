---
title: U02 — Modelos OSI y análisis de tráfico
description: El paquete perdido 🧳
---

<p><small>El paquete perdido 🧳</small></p>

> 🗺️ **El mapa del curso:** 🌐 U01 → **📡 AQUÍ ESTÁS (U02)** → 🔌 Físico → 🧮 IPv4 → 🚀 IPv6 → 🔀 Switching → 🏢 VLAN → 🧭 Routing → 🗣️ OSPF → 🌐 NAT → 🩺 Diagnóstico → ☁️ Cloud

---

*Un paquete HTTP abandona el navegador y se encuentra envuelto en múltiples capas de protocolo. Cada capa añade su propia cabecera: TCP, IP, Ethernet. El paquete no entiende por qué necesita tanto envoltorio... pero cada capa es esencial para que llegue a su destino.*

Bienvenido a la unidad donde se te abre el telo de la red. En U01 viste que los equipos hablan mediante **protocolos** y que el **modelo OSI** pone orden en capas. Aquí lo llevamos al fondo: entenderás por qué el modelo tiene 7 capas, cómo se apilan TCP/IP y OSI, cómo se **encapsula** cada dato (y se desencapsula al llegar), qué esconden las cabeceras de Ethernet, IP, TCP y UDP, y cómo usar **Wireshark** para ver el alma de los paquetes.

Esta unidad se lee como un **libro de 9 capítulos**: cada punto desarrolla una idea completa y enlaza con el siguiente.

---

## 🎯 Objetivo de la unidad

Al terminar, serás capaz de:

- Explicar por qué el modelo OSI se divide en 7 capas y qué responsabilidad tiene cada una.
- Relacionar el modelo OSI con el modelo TCP/IP (4 capas) y saber cuándo usar cada mentalidad.
- Describir cómo se encapsula y desencapsula un dato, nombrando la PDU de cada capa.
- Distinguir TCP de UDP: handshake, flags, fiabilidad y casos de uso.
- Leer una cabecera IPv4 y una trama Ethernet: TTL, protocolo, MTU, EtherType, FCS.
- Explicar puertos, sockets y rangos, y localizar un servicio con su puerto.
- Capturar tráfico con Wireshark, aplicar filtros y seguir el flujo de una conversación TCP.

---

## 🗺️ Mapa de la unidad

| Punto | Qué aprenderás | Nivel |
|---|---|---|
| [01 · El modelo OSI](/ApuntesRedes/02-modelos-osi-analisis/01-modelo-osi) | Qué es, por qué 7 capas, PDU y regla de diagnóstico | Todos |
| [02 · Las 7 capas en detalle](/ApuntesRedes/02-modelos-osi-analisis/02-las-7-capas) | Capa por capa, protocolos y dispositivos | Todos |
| [03 · El modelo TCP/IP](/ApuntesRedes/02-modelos-osi-analisis/03-modelo-tcp-ip) | 4 capas, mapeo OSI ↔ TCP/IP, por qué manda en Internet | Todos |
| [04 · Encapsulación](/ApuntesRedes/02-modelos-osi-analisis/04-encapsulacion) | El viaje de los datos, PDU por capa, cabeceras reales | Todos |
| [05 · TCP y UDP](/ApuntesRedes/02-modelos-osi-analisis/05-tcp-y-udp) | Three-way handshake, flags, ventana, comparativa | Todos |
| [06 · IP y Ethernet](/ApuntesRedes/02-modelos-osi-analisis/06-ip-ethernet) | Cabecera IPv4, TTL, MTU, trama, ARP | Todos |
| [07 · Puertos y sockets](/ApuntesRedes/02-modelos-osi-analisis/07-puertos-y-sockets) | Puertos, socket, rangos, ejemplo navegación | Todos |
| [08 · Wireshark](/ApuntesRedes/02-modelos-osi-analisis/08-wireshark) | Interfaz, filtros, colores, seguimiento de flujo TCP | Todos |
| [09 · Cierre](/ApuntesRedes/02-modelos-osi-analisis/09-cierre) | Be the Packet, Fireside, Laboratorio, Crucigrama… | Todos |

> 📖 **Flujo de lectura:** los 8 primeros puntos son teoría en progresión. El 9º es el aterrizaje práctico: léelo justo después del 8º y antes de abrir los boletines.

---

## 📝 Boletines de la unidad

> Practica con los pares del curso: empezar siempre el resuelto para ver el estilo y luego intentar el por-resolver.

<div class="ejercicio-links">
  <a href="/ApuntesRedes/boletines/boletin-u02-inicial-resuelto" class="elink">✅ Inicial resuelto</a>
  <a href="/ApuntesRedes/boletines/boletin-u02-inicial" class="elink">🟢 Inicial por resolver</a>
  <a href="/ApuntesRedes/boletines/boletin-u02-avanzado-resuelto" class="elink">💪 Avanzado resuelto</a>
  <a href="/ApuntesRedes/boletines/boletin-u02-avanzado" class="elink">⭐ Avanzado por resolver</a>
</div>

---

## ✅ Criterios de evaluación cubiertos (RA1)

**RA1: Reconoce la estructura de las redes de datos identificando sus elementos y principios de funcionamiento.**

| CE | Criterio | Dónde se cubre |
|---|---|---|
| d) | Arquitecturas de red y niveles | ✅ Puntos 1, 2 y 3 |
| e) | Concepto de protocolo | ✅ Puntos 3, 5, 6 y 7 |
| f) | Pilas de protocolos | ✅ Punto 4 + ⚡ Laboratorio (punto 9) |
| g) | Elementos funcionales, físicos y lógicos | ✅ Punto 2 + 🔥 Fireside (punto 9) |

---

## 🚪 ¿Por dónde empiezo?

- ¿Necesitas refrescar capas y protocolos? → Repasa el [punto 5 del modelo OSI](/ApuntesRedes/01-fundamentos-redes/05-modelo-osi) y el [punto 6 de protocolos](/ApuntesRedes/01-fundamentos-redes/06-protocolos) de la U01.
- ¿Ya sabes lo básico? → Arranca directamente en el [punto 1](/ApuntesRedes/02-modelos-osi-analisis/01-modelo-osi).

**📍 Primer punto:** [01 · El modelo OSI](/ApuntesRedes/02-modelos-osi-analisis/01-modelo-osi)  
**⏭️ Al acabar la unidad, continúa en [U03 · Infraestructura física](/ApuntesRedes/03-infraestructura-fisica).**