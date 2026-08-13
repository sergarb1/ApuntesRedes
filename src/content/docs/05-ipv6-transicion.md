---
title: U05 — IPv6 y transición
description: El futuro que ya llegó 🚀
---

<p><small>El futuro que ya llegó 🚀</small></p>

> 🗺️ **El mapa del curso:** 🧮 U04 → **🚀 AQUÍ ESTÁS (U05)** → 🔀 Switching → 🏢 VLAN → 🧭 Routing → 🗣️ OSPF → 🌐 NAT → 🩺 Diagnóstico → ☁️ Cloud

---

*El agotamiento de direcciones IPv4 ya no es una hipótesis: es historia. Repartimos los últimos bloques en 2011 y los registros regionales se fueron quedando vacíos uno a uno. Con cada teléfono, bombilla o coche conectado, las 4.300 millones de direcciones IPv4 se quedaron cortas. IPv6 no es el futuro: es la respuesta que la red ya está usando.*

En la U04 hiciste subnetting y NAT con las direcciones privadas de la RFC 1918. Pues bien: aquello es un **apaño brillante**. Gracias a él millones de hogares comparten una única IP pública, pero es un apaño al fin y al cabo: NAT rompe la conectividad extremo a extremo, complica VoIP y juegos, y duplica la configuración. IPv6 llega para arreglar el problema de raíz: **128 bits**, direcciones de sobra para cada dispositivo del mundo, autoconfiguración plug-and-play y sin NAT por medio.

Esta unidad se lee como un **libro de 9 capítulos**: los 8 primeros son teoría en progresión —notación, compresión, tipos de direcciones, EUI-64, SLAAC, DHCPv6, NDP y transición— y el 9º es el cierre práctico con laboratorio en Packet Tracer.

---

## 🎯 Objetivo de la unidad

Al terminar, serás capaz de:

- Leer y escribir direcciones IPv6, saber cuántos bits tienen y por qué se representan en hexadecimal.
- Comprimir y expandir direcciones IPv6 aplicando las dos reglas sin pasarte con el `::`.
- Distinguir Global Unicast, Link-Local, Unique Local, multicast y anycast, y saber para qué sirve cada una.
- Explicar cómo se genera una interfaz IPv6 a partir de la MAC con EUI-64 y por qué se inventaron las privacy extensions.
- Diferenciar SLAAC y DHCPv6 (stateless vs stateful) y leer los flags M y O de un Router Advertisement.
- Explicar cómo NDP sustituye a ARP usando ICMPv6 y multicast en lugar de broadcast.
- Elegir el mecanismo de transición adecuado: dual stack, túneles o NAT64/DNS64.
- Configurar IPv6 estático en un PC y en un router Cisco, y verificar la conectividad.

---

## 🗺️ Mapa de la unidad

| Punto | Qué aprenderás | Nivel |
|---|---|---|
| [01 · Estructura de IPv6](/ApuntesRedes/05-ipv6-transicion/01-estructura-ipv6) | Por qué IPv6, 128 bits, 8 grupos hexadecimales | Todos |
| [02 · Compresión y prefijos](/ApuntesRedes/05-ipv6-transicion/02-compresion-y-prefijos) | Ceros a la izquierda, el `::`, prefijos /32 /48 /64 | Todos |
| [03 · Tipos de direcciones](/ApuntesRedes/05-ipv6-transicion/03-tipos-de-direcciones) | Unicast (GUA, LLA, ULA, loopback), multicast, anycast | Todos |
| [04 · EUI-64 y SLAAC](/ApuntesRedes/05-ipv6-transicion/04-eui64-y-slaac) | De la MAC a la interfaz, autoconfiguración plug-and-play | Todos |
| [05 · DHCPv6](/ApuntesRedes/05-ipv6-transicion/05-dhcpv6) | Stateless vs stateful, flags M y O del RA | Todos |
| [06 · ICMPv6 y NDP](/ApuntesRedes/05-ipv6-transicion/06-icmpv6-y-ndp) | NS/NA, RS/RA, multicast en lugar de broadcast | Todos |
| [07 · Mecanismos de transición](/ApuntesRedes/05-ipv6-transicion/07-mecanismos-de-transicion) | Dual Stack, túneles, NAT64/DNS64 | Todos |
| [08 · Configuración IPv6](/ApuntesRedes/05-ipv6-transicion/08-configuracion-ipv6) | Estática en PC y router, verificación, Packet Tracer | Todos |
| [09 · Head First (cierre)](/ApuntesRedes/05-ipv6-transicion/09-head-first) | Be the Packet, Fireside, Laboratorio, Crucigrama… | Todos |

> 📖 **Flujo de lectura:** los 8 primeros puntos son teoría en progresión. El 9º es el aterrizaje práctico: léelo justo después del 8º y antes de abrir los boletines.

---

## 📝 Boletines de la unidad

> Practica con los pares del curso: empezar siempre el resuelto para ver el estilo y luego intentar el por-resolver.

<div class="ejercicio-links">
  <a href="/ApuntesRedes/boletines/boletin-u05-inicial-resuelto" class="elink">✅ Inicial resuelto</a>
  <a href="/ApuntesRedes/boletines/boletin-u05-inicial" class="elink">🟢 Inicial por resolver</a>
  <a href="/ApuntesRedes/boletines/boletin-u05-avanzado-resuelto" class="elink">💪 Avanzado resuelto</a>
  <a href="/ApuntesRedes/boletines/boletin-u05-avanzado" class="elink">⭐ Avanzado por resolver</a>
</div>

---

## ✅ Criterios de evaluación cubiertos (RA2/RA7)

**RA2/RA7: Conecta redes privadas a redes públicas.**

| CE | Criterio | Dónde se cubre |
|---|---|---|
| a) | Direccionamiento IPv6 | ✅ Puntos 1, 2 y 3 |
| b) | Autoconfiguración | ✅ Puntos 4 y 5 |
| c) | Transición IPv4→IPv6 | ✅ Punto 7 |
| d) | Conectividad IPv6 | ✅ Punto 8 + ⚡ Laboratorio |

---

## 🚪 ¿Por dónde empiezo?

- ¿Necesitas refrescar IPv4, subnetting y NAT? → Repasa el [subnetting de la U04](/ApuntesRedes/04-ipv4-subnetting) y el [NAT de la U10](/ApuntesRedes/10-nat-internet). IPv6 se entiende mejor cuando has vivido la escasez.
- ¿Ya sabes lo básico? → Arranca directamente en el [punto 1](/ApuntesRedes/05-ipv6-transicion/01-estructura-ipv6).

**📍 Primer punto:** [01 · Estructura de IPv6](/ApuntesRedes/05-ipv6-transicion/01-estructura-ipv6)  
**⏭️ Al acabar la unidad, continúa en [U06 · Switching y STP](/ApuntesRedes/06-switching-stp).**