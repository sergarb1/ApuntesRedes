---
title: Boletín U05 — Simple
description: Ejercicios básicos de IPv6 y Transición
---

# 📝 Boletín U05 — Simple

> Ejercicios básicos para afianzar los conceptos de direccionamiento IPv6.

---

## 1. Compresión de direcciones

Comprime estas direcciones IPv6 al máximo:

a) `2001:0DB8:0000:0000:0000:0000:0000:0001`
b) `FE80:0000:0000:0000:02AA:00FF:FE9A:4CA2`
c) `0000:0000:0000:0000:0000:0000:0000:0001`
d) `2001:0DB8:0000:0000:ABCD:0000:0000:1234`

## 2. Identifica el tipo

Indica qué tipo de dirección IPv6 es cada una:

a) `2001:DB8::1`
b) `FE80::1`
c) `::1`
d) `FC00::1`
e) `FF02::1`

## 3. Completa

Completa las equivalencias:

a) IPv4 tiene __ bits, IPv6 tiene __ bits.
b) IPv4 se representa en decimal, IPv6 en __.
c) El prefijo de Link-Local es __.
d) El prefijo de Global Unicast es __.
e) __ reemplaza a ARP en IPv6.

## 4. Verdadero o falso

a) Las direcciones Link-Local son enrutables en Internet.
b) SLAAC no necesita un servidor central.
c) :: se puede usar varias veces en la misma dirección IPv6.
d) DHCPv6 funciona igual que DHCP en IPv4.
e) Dual Stack significa tener IPv4 e IPv6 simultáneamente.

## 5. NDP

Relaciona cada mensaje ICMPv6 con su función:

| Mensaje | Función |
|---|---|
| 1. Neighbor Solicitation | a) El router anuncia su prefijo |
| 2. Neighbor Advertisement | b) El dispositivo busca routers |
| 3. Router Solicitation | c) "¿Quién tiene esta IP?" |
| 4. Router Advertisement | d) "Yo tengo esa IP, aquí está mi MAC" |

## 6. Mecanismos de transición

Relaciona cada mecanismo con su descripción:

| Mecanismo | Descripción |
|---|---|
| 1. Dual Stack | a) Traduce IPv6 a IPv4 para acceder a servidores antiguos |
| 2. Túnel 6to4 | b) IPv4 e IPv6 funcionando a la vez |
| 3. NAT64 | c) Encapsula IPv6 dentro de IPv4 |
