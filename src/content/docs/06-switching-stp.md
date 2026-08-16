---
title: U06 — Switching y STP
description: El switch enfadado 😡
---

<p><small>El switch enfadado 😡</small></p>

> 🗺️ **Ruta del paquete:** 🏠 Origen → 📦 Encapsulado → 🔌 Cable → 🏷️ IP → 🌍 IPv6 → 🔀 **SWITCH** → 🏢 VLAN → 🧭 Router → 🗣️ OSPF → 🌐 NAT → 🩺 Diagnóstico → ☁️ Cloud

---

*Un paquete de datos llega a un switch, el dispositivo encargado de segmentar la red local. Los switches aprenden direcciones MAC, toman decisiones de reenvío y, si no se configuran correctamente, pueden generar bucles que colapsan la red.*

Los switches son el corazón de la red local. Aprenden, segmentan, y si los dejas sin STP, provocan tormentas de broadcast que destruyen civilizaciones.

Esta unidad se lee como un **libro de 9 capítulos**: cada punto desarrolla una idea completa y enlaza con el siguiente. Empieza entendiendo qué es un switch por dentro, sigue por el peligro de los bucles y termina dominando STP, RSTP y la seguridad de puertos.

---

## 🎯 Objetivo de la unidad

Al terminar, serás capaz de:

- Explicar cómo un switch aprende direcciones MAC y reenvía tramas Ethernet.
- Distinguir hub, switch y router según dominios de colisión y broadcast.
- Describir por qué se produce una tormenta de broadcast y cómo evitarla.
- Explicar el funcionamiento de STP: BPDU, elección del Root Bridge, roles y estados de puerto.
- Configurar RSTP, PortFast y BPDUGuard en puertos de acceso.
- Aplicar Port Security (maximum, sticky, violaciones) para blindar puertos.
- Diagnosticar bucles, fallos de puerto y violaciones de seguridad con comandos Cisco.

---

## 🗺️ Mapa de la unidad

| Punto | Qué aprenderás | Nivel |
|---|---|---|
| [01 · ¿Qué es un switch?](/ApuntesRedes/06-switching-stp/01-que-es-un-switch) | Funcionamiento interno, capa 2, switch vs hub | Todos |
| [02 · Aprendizaje de MACs](/ApuntesRedes/06-switching-stp/02-aprendizaje-mac) | Tabla MAC, memoria CAM, flooding, `show mac address-table` | Todos |
| [03 · Dominios de colisión y broadcast](/ApuntesRedes/06-switching-stp/03-dominios-colision-broadcast) | Colisiones, broadcasts y quién los segmenta | Todos |
| [04 · La tormenta de broadcast](/ApuntesRedes/06-switching-stp/04-tormenta-de-broadcast) | Bucles, ARP infinito y colapso de la red | Todos |
| [05 · STP: fundamentos](/ApuntesRedes/06-switching-stp/05-stp-fundamentos) | IEEE 802.1D, BPDU, elección del Root Bridge | Todos |
| [06 · Puertos y estados STP](/ApuntesRedes/06-switching-stp/06-puertos-y-estados-stp) | Roles Root/Designated/Alternate y los estados | Todos |
| [07 · RSTP y PortFast](/ApuntesRedes/06-switching-stp/07-rstp-y-portfast) | Convergencia rápida, edge ports, BPDUGuard | Todos |
| [08 · Port Security](/ApuntesRedes/06-switching-stp/08-port-security) | Maximum, sticky MAC, violaciones y errdisable | Todos |
| [09 · Cierre](/ApuntesRedes/06-switching-stp/09-cierre) | Sé el Switch, Fireside, Laboratorio, Crucigrama… | Todos |

> 📖 **Flujo de lectura:** los 8 primeros puntos son teoría en progresión. El 9º es el aterrizaje práctico: léelo justo después del 8º y antes de abrir los boletines.

---

## 📝 Boletines de la unidad

> Practica con los pares del curso: empezar siempre el resuelto para ver el estilo y luego intentar el por-resolver.

<div class="ejercicio-links">
  <a href="/ApuntesRedes/boletines/boletin-u06-inicial-resuelto" class="elink">✅ Inicial resuelto</a>
  <a href="/ApuntesRedes/boletines/boletin-u06-inicial" class="elink">🟢 Inicial por resolver</a>
  <a href="/ApuntesRedes/boletines/boletin-u06-avanzado-resuelto" class="elink">💪 Avanzado resuelto</a>
  <a href="/ApuntesRedes/boletines/boletin-u06-avanzado" class="elink">⭐ Avanzado por resolver</a>
</div>

---

## ✅ Criterios de evaluación cubiertos (RA3)

**RA3: Administra conmutadores estableciendo opciones de configuración para su integración en la red.**

| CE | Criterio | Dónde se cubre |
|---|---|---|
| a) | Conexión de conmutadores | ✅ Punto 3 + ⚡ Laboratorio (punto 9) |
| e) | Tabla de direcciones MAC | ✅ Puntos 1 y 2 |
| i) | Spanning Tree Protocol | ✅ Puntos 4, 5, 6 y 7 |
| j) | Parámetros de selección del puente raíz | ✅ Punto 5 |
| k) | Seguridad en conmutadores | ✅ Punto 8 + ⚡ Laboratorio (punto 9) |

---

## 🚪 ¿Por dónde empiezo?

¿Llegas desde la [U05 de IPv6](/ApuntesRedes/05-ipv6-transicion) y quieres el plato fuerte directo? Arranca en el [punto 5 · STP](/ApuntesRedes/06-switching-stp/05-stp-fundamentos), donde está el corazón de la unidad: el protocolo que convierte los bucles en árbol. Si necesitas refrescar qué es una MAC o cómo reenvía el switch, pasa primero por el [punto 1](/ApuntesRedes/06-switching-stp/01-que-es-un-switch) y el [punto 2](/ApuntesRedes/06-switching-stp/02-aprendizaje-mac).

¿Ya has recorrido los 8 puntos de teoría y quieres la prueba de fuego? Cierra con el [punto 9 · Cierre](/ApuntesRedes/06-switching-stp/09-cierre) y después ataca los [boletines de la unidad](/ApuntesRedes/boletines/boletin-u06-inicial-resuelto). Y si lo que te falta es reforzar la base de dispositivos y capas, repasa el [punto 4 de dispositivos de la U01](/ApuntesRedes/01-fundamentos-redes/04-dispositivos).

**📍 Primer punto:** [01 · ¿Qué es un switch?](/ApuntesRedes/06-switching-stp/01-que-es-un-switch)  
**⏭️ Al acabar la unidad, continúa en [U07 · VLANs](/ApuntesRedes/07-vlans).**
