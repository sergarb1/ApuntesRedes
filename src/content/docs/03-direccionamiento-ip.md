---
title: U03 — Direccionamiento IP y subnetting
description: La calculadora maldita, ahora con IPv6 🧮
---

<p><small>La calculadora maldita, ahora con IPv6 🧮</small></p>

> 🗺️ **El mapa del curso:** 📡 Ethernet → **🧮 AQUÍ ESTÁS (U03)** → 🔀 Switching → 🌉 Trunking

---

*Dos ordenadores se cruzan en un cable: uno quiere hablar, el otro se llama 192.168.1.10 y ni siquiera sabe si la pregunta es para él. El direccionamiento IP es el sistema postal de las redes: sin direcciones bien repartidas, los paquetes acaban en el buzón equivocado o en ninguno. Y cuando una red crece, el arte de partirla en subredes se convierte en la habilidad más pedida (y más temida) de la profesión.*

Bienvenido a la unidad que convierte binario en oficio. Primero dominas IPv4: estructura, clases, máscaras, CIDR, VLSM y el subnetting clásico con papel y boli. Después saltas al futuro: IPv6, su notación, sus tipos de dirección, SLAAC, DHCPv6 y los mecanismos que permiten que ambos mundos convivan. DHCP aparece aquí en versión introductoria; en la [UD10](/ApuntesRedes/10-servicios-red) lo despliega a fondo.

Esta unidad se lee como un **libro de 17 capítulos**: los 16 primeros son teoría en progresión y el 17º es el aterrizaje práctico.

---

## 🎯 Objetivo de la unidad

Al terminar, serás capaz de:

- Explicar la estructura de una dirección IPv4 y convertirla a binario sin calculadora.
- Distinguir clases, rangos privados/públicos y direcciones especiales.
- Aplicar la máscara con la operación AND para saber si dos IPs son de la misma red.
- Calcular subredes con CIDR y diseñar esquemas con VLSM.
- Describir la estructura de IPv6, comprimir notación y distinguir tipos de direcciones.
- Explicar EUI-64, SLAAC, DHCPv6 y el papel de ICMPv6/NDP.
- Configurar direccionamiento IPv4/IPv6 estático y dinámico en equipos y routers.

---

## 🗺️ Mapa de la unidad

| Punto | Qué aprenderás | Nivel |
|---|---|---|
| [01 · Estructura de IPv4](/ApuntesRedes/03-direccionamiento-ip/01-estructura-ipv4) | Octetos, binario, notación | Todos |
| [02 · Binario y la operación AND](/ApuntesRedes/03-direccionamiento-ip/02-binario-y-and) | Máscara, AND y "¿misma red?" | Clave |
| [03 · Clases de direcciones](/ApuntesRedes/03-direccionamiento-ip/03-clases-de-direcciones) | A/B/C, bucle local y especiales | Todos |
| [04 · IPs privadas y públicas](/ApuntesRedes/03-direccionamiento-ip/04-ip-privadas-y-publicas) | RFC 1918 y NAT como adelanto | Todos |
| [05 · Máscaras y notación CIDR](/ApuntesRedes/03-direccionamiento-ip/05-mascaras-y-cidr) | /24, /26… y el cálculo de redes | Clave |
| [06 · Subnetting paso a paso](/ApuntesRedes/03-direccionamiento-ip/06-subnetting-paso-a-paso) | El método del bloque para partir redes | Clave |
| [07 · VLSM](/ApuntesRedes/03-direccionamiento-ip/07-vlsm) | Subredes de tamaños distintos, al detalle | Avanzado |
| [08 · DHCP](/ApuntesRedes/03-direccionamiento-ip/08-dhcp) | DORA en versión introductoria | Todos |
| [09 · Estructura de IPv6](/ApuntesRedes/03-direccionamiento-ip/09-estructura-ipv6) | 128 bits, prefijos, notación | Todos |
| [10 · Compresión y prefijos](/ApuntesRedes/03-direccionamiento-ip/10-compresion-y-prefijos) | Los dos puntos dobles y las reglas | Todos |
| [11 · Tipos de direcciones](/ApuntesRedes/03-direccionamiento-ip/11-tipos-de-direcciones) | Global, link-local, multicast, anycast | Todos |
| [12 · EUI-64 y SLAAC](/ApuntesRedes/03-direccionamiento-ip/12-eui64-y-slaac) | Autoconfiguración de IPv6 | Clave |
| [13 · DHCPv6](/ApuntesRedes/03-direccionamiento-ip/13-dhcpv6) | Stateful vs stateless | Todos |
| [14 · ICMPv6 y NDP](/ApuntesRedes/03-direccionamiento-ip/14-icmpv6-y-ndp) | El ARP del mundo IPv6 | Clave |
| [15 · Mecanismos de transición](/ApuntesRedes/03-direccionamiento-ip/15-mecanismos-de-transicion) | Dual stack, túneles, traducción | Todos |
| [16 · Configuración IPv4/IPv6](/ApuntesRedes/03-direccionamiento-ip/16-configuracion-ipv6) | Práctica de direccionamiento | Práctico |
| [17 · Cierre](/ApuntesRedes/03-direccionamiento-ip/17-cierre) | Sé el Paquete, Fireside, Laboratorio, Crucigrama… | Todos |

> 📖 **Flujo de lectura:** los 16 primeros puntos son teoría en progresión. El 17º es el aterrizaje práctico: léelo justo después del 16º y antes de abrir los boletines.

---

## 📝 Boletines de la unidad

> Esta unidad tiene dos pares de boletines: uno de IPv4/subnetting y otro específico de IPv6.

<div class="ejercicio-links">
  <a href="/ApuntesRedes/boletines/boletin-u03-inicial" class="elink">🟢 IPv4 inicial por resolver</a>
  <a href="/ApuntesRedes/boletines/boletin-u03-inicial-resuelto" class="elink">✅ IPv4 inicial resuelto</a>
  <a href="/ApuntesRedes/boletines/boletin-u03-avanzado" class="elink">⭐ IPv4 avanzado por resolver</a>
  <a href="/ApuntesRedes/boletines/boletin-u03-avanzado-resuelto" class="elink">💪 IPv4 avanzado resuelto</a>
  <a href="/ApuntesRedes/boletines/boletin-u03-ipv6-inicial" class="elink">🟢 IPv6 inicial por resolver</a>
  <a href="/ApuntesRedes/boletines/boletin-u03-ipv6-inicial-resuelto" class="elink">✅ IPv6 inicial resuelto</a>
  <a href="/ApuntesRedes/boletines/boletin-u03-ipv6-avanzado" class="elink">⭐ IPv6 avanzado por resolver</a>
  <a href="/ApuntesRedes/boletines/boletin-u03-ipv6-avanzado-resuelto" class="elink">💪 IPv6 avanzado resuelto</a>
</div>

---

## ✅ Criterios de evaluación cubiertos (RA1/RA2/RA4/RA6)

| CE | Criterio | Dónde se cubre |
|---|---|---|
| RA2·d) | Direccionamiento lógico IPv4/IPv6 | ✅ Puntos 1-5 y 9-12 + ⚡ Laboratorio (punto 17) |
| RA1·c) | Subredes y diseño lógico | ✅ Puntos 5-7 (CIDR/VLSM) |
| RA2·g) | Servicios de configuración automática | ✅ Puntos 8 y 12-13 |
| RA6 | Fundamentos para el encaminamiento | ✅ Puntos 2 y 5 (máscaras/redes) |

---

## 🚪 ¿Por dónde empiezo?

- ¿El binario te da respeto? El [punto 2](/ApuntesRedes/03-direccionamiento-ip/02-binario-y-and) es tu mandatorio: todo lo demás se apoya en él.
- ¿Ya calculas subredes? Salta directo a la parte IPv6 en el [punto 9](/ApuntesRedes/03-direccionamiento-ip/09-estructura-ipv6).

**📍 Primer punto:** [01 · Estructura de IPv4](/ApuntesRedes/03-direccionamiento-ip/01-estructura-ipv4)  
**⏭️ Al acabar la unidad, continúa en [UD4 · Switching y VLAN](/ApuntesRedes/04-switching).**
