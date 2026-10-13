---
title: Direccionamiento IP y subnetting
description: La calculadora maldita, ahora con IPv6 🧮
---

<p><small>La calculadora maldita, ahora con IPv6 🧮</small></p>

> 🗺️ **El mapa del curso:** 📡 Ethernet → **🧮 AQUÍ ESTÁS** → 🔀 Switching → 🌉 Trunking

---

*Dos ordenadores se cruzan en un cable: uno quiere hablar, el otro se llama 192.168.1.10 y ni siquiera sabe si la pregunta es para él. El direccionamiento IP es el sistema postal de las redes: sin direcciones bien repartidas, los paquetes acaban en el buzón equivocado o en ninguno. Y cuando una red crece, el arte de partirla en subredes se convierte en la habilidad más pedida (y más temida) de la profesión.*

Bienvenido a la unidad que convierte binario en oficio. Primero dominas IPv4: estructura de la dirección y de la cabecera, ARP, fragmentación, clases, máscaras, CIDR, VLSM y el subnetting clásico con papel y boli. Después saltas al futuro: IPv6, su notación, sus tipos de dirección, SLAAC, DHCPv6 y los mecanismos que permiten que ambos mundos convivan. DHCP aparece aquí en versión introductoria; en la [unidad de servicios de red](/ApuntesRedes/07-servicios-red) lo despliega a fondo. ARP, la cabecera y la fragmentación cierran el puente con la trama de la [unidad de capa de enlace y trama Ethernet](/ApuntesRedes/03-capa-de-enlace/03-trama-ethernet).

¿Y dónde encaja esto en el modelo OSI? En la **capa 3 — la capa de red**. En Ethernet te quedaste en las capas 1 y 2 (medio físico y trama MAC); aquí subes un peldaño: la capa 3 es la del **direccionamiento lógico** (las IP), la que decide **por dónde viaja** cada paquete de punta a punta cruzando redes distintas, y la que se apoya en los routers. Dentro de tu red local manda la trama Ethernet (capa 2) y su MAC; en cuanto el paquete quiere salir de casa, manda la IP. Toda la unidad vive ahí arriba.

Esta unidad se lee como un **libro de 13 capítulos**: los 12 primeros son teoría en progresión (el último, transición, es actualidad pura) y el 13º es el aterrizaje práctico.

---

## 🎯 Objetivo de la unidad

Al terminar, serás capaz de:

- Explicar la estructura de una dirección IPv4 y convertirla a binario sin calculadora.
- Distinguir clases (legacy), rangos privados/públicos y direcciones especiales.
- Aplicar la máscara con la operación AND y calcular subredes con CIDR y VLSM.
- Describir la estructura de IPv6, comprimir su notación y distinguir tipos de direcciones.
- Explicar EUI-64, SLAAC, DHCPv6 y el papel de ICMPv6/NDP.
- Configurar direccionamiento IPv4/IPv6 estático y dinámico y elegir el mecanismo de transición adecuado.

---

## 🗺️ Mapa de la unidad

| Punto | Qué aprenderás | Nivel |
|---|---|---|
| [01 · Estructura de IPv4](/ApuntesRedes/04-direccionamiento-ip/01-estructura-ipv4) | Octetos, notación, cabecera, MTU y ARP | Clave |
| [02 · Binario y la operación AND](/ApuntesRedes/04-direccionamiento-ip/02-binario-y-and) | Máscara, AND y "¿misma red?" | Clave |
| [03 · Clases, IPs privadas y públicas](/ApuntesRedes/04-direccionamiento-ip/03-clases-y-privadas) | A/B/C, CIDR, RFC 1918 y NAT | Todos |
| [04 · Máscaras y notación CIDR](/ApuntesRedes/04-direccionamiento-ip/04-mascaras-y-cidr) | /24, /26… y el cálculo de redes | Clave |
| [05 · Subnetting paso a paso](/ApuntesRedes/04-direccionamiento-ip/05-subnetting-paso-a-paso) | El método del bloque para partir redes | Clave |
| [06 · VLSM](/ApuntesRedes/04-direccionamiento-ip/06-vlsm) | Subredes de tamaños distintos, al detalle | Avanzado |
| [07 · DHCP](/ApuntesRedes/04-direccionamiento-ip/07-dhcp) | DORA, APIPA y DHCPv6 | Todos |
| [08 · Estructura de IPv6](/ApuntesRedes/04-direccionamiento-ip/08-estructura-ipv6) | 128 bits, compresión y prefijos /64 | Todos |
| [09 · Tipos de direcciones](/ApuntesRedes/04-direccionamiento-ip/09-tipos-de-direcciones) | Global, link-local, multicast, anycast | Todos |
| [10 · EUI-64 y SLAAC](/ApuntesRedes/04-direccionamiento-ip/10-eui64-y-slaac) | Autoconfiguración de IPv6 | Clave |
| [11 · ICMPv6 y NDP](/ApuntesRedes/04-direccionamiento-ip/11-icmpv6-y-ndp) | El ARP del mundo IPv6 | Clave |
| [12 · Mecanismos de transición](/ApuntesRedes/04-direccionamiento-ip/12-mecanismos-de-transicion) | Dual stack, túneles, NAT64 y práctica | Todos |
| [13 · Cierre](/ApuntesRedes/04-direccionamiento-ip/13-cierre) | Sé el Paquete, Fireside, Laboratorio, Crucigrama… | Todos |

> 📖 **Flujo de lectura:** los 12 primeros puntos son teoría en progresión. El 13º es el aterrizaje práctico: léelo justo después del 12º y antes de abrir los boletines.

---

## 📝 Boletines de la unidad

> Esta unidad tiene dos pares de boletines: uno de IPv4/subnetting y otro específico de IPv6. Además, una variante práctica de nivel único en Packet Tracer.

<div class="ejercicio-links">
  <a href="/ApuntesRedes/boletines/boletin-u04-inicial" class="elink">🟢 IPv4 inicial por resolver</a>
  <a href="/ApuntesRedes/boletines/boletin-u04-inicial-resuelto" class="elink">✅ IPv4 inicial resuelto</a>
  <a href="/ApuntesRedes/boletines/boletin-u04-avanzado" class="elink">⭐ IPv4 avanzado por resolver</a>
  <a href="/ApuntesRedes/boletines/boletin-u04-avanzado-resuelto" class="elink">💪 IPv4 avanzado resuelto</a>
  <a href="/ApuntesRedes/boletines/boletin-u04-ipv6-inicial" class="elink">🟢 IPv6 inicial por resolver</a>
  <a href="/ApuntesRedes/boletines/boletin-u04-ipv6-inicial-resuelto" class="elink">✅ IPv6 inicial resuelto</a>
  <a href="/ApuntesRedes/boletines/boletin-u04-ipv6-avanzado" class="elink">⭐ IPv6 avanzado por resolver</a>
  <a href="/ApuntesRedes/boletines/boletin-u04-ipv6-avanzado-resuelto" class="elink">💪 IPv6 avanzado resuelto</a>
  <a href="/ApuntesRedes/boletines/boletin-u04-packettracer" class="elink">🖥️ Packet Tracer por resolver</a>
  <a href="/ApuntesRedes/boletines/boletin-u04-packettracer-resuelto" class="elink">✅ Packet Tracer resuelto</a>
</div>

---

## ✅ Criterios de evaluación cubiertos (RA1/RA2/RA4/RA6)

| CE | Criterio | Dónde se cubre |
|---|---|---|
| RA2·d) | Direccionamiento lógico IPv4/IPv6 | ✅ Puntos 1-5 y 8-10 + ⚡ Laboratorio (punto 13) |
| RA1·c) | Subredes y diseño lógico | ✅ Puntos 4-6 (CIDR/VLSM) |
| RA4·h) | Router como servidor de direcciones IP dinámicas | ✅ Punto 7 (DHCP/DHCPv6) + ⚡ Laboratorio (punto 13) |
| RA4·d) | Comandos de configuración | ✅ Punto 12 (dual stack en la práctica) + ⚡ Laboratorio (punto 13) |
| RA6 | Fundamentos para el encaminamiento | ✅ Puntos 1-2 y 4 (cabecera, ARP, máscaras/redes) |

---

## 🚪 ¿Por dónde empiezo?

- ¿El binario te da respeto? El [punto 2](/ApuntesRedes/04-direccionamiento-ip/02-binario-y-and) es tu mandatorio: todo lo demás se apoya en él.
- ¿Ya calculas subredes? Salta directo a la parte IPv6 en el [punto 8](/ApuntesRedes/04-direccionamiento-ip/08-estructura-ipv6).

**📍 Primer punto:** [01 · Estructura de IPv4](/ApuntesRedes/04-direccionamiento-ip/01-estructura-ipv4)  
**⏭️ Al acabar la unidad, continúa en [Switching y VLAN](/ApuntesRedes/05-switching).**
