---
title: Boletín U06 — Inicial (Resuelto)
description: Soluciones ejercicios básicos de IPv6 y Transición
---

# ✅ Boletín U06 — Inicial (Resuelto)

---

## 1. Compresión de direcciones

a) `2001:DB8::1`
b) `FE80::2AA:FF:FE9A:4CA2`
c) `::1`
d) `2001:DB8::ABCD:0:0:1234` (solo un ::, la secuencia de ceros más larga)

## 2. Identifica el tipo

a) `2001:DB8::1` → **Global Unicast** (2000::/3)
b) `FE80::1` → **Link-Local** (FE80::/10)
c) `::1` → **Loopback**
d) `FC00::1` → **Unique Local** (FC00::/7)
e) `FF02::1` → **Multicast** (todos los nodos)

## 3. Completa

a) IPv4 tiene **32** bits, IPv6 tiene **128** bits.
b) IPv4 se representa en decimal, IPv6 en **hexadecimal**.
c) El prefijo de Link-Local es **FE80::/10**.
d) El prefijo de Global Unicast es **2000::/3**.
e) **NDP** (Neighbor Discovery Protocol) reemplaza a ARP en IPv6.

## 4. Verdadero o falso

a) **Falso.** Las Link-Local solo funcionan en el mismo enlace. No son enrutables.
b) **Verdadero.** SLAAC se basa en Router Advertisements del router. Sin servidor central.
c) **Falso.** :: solo puede usarse UNA vez por dirección. Si no, el router no sabe cuántos grupos cero hay.
d) **Verdadero básicamente**, pero DHCPv6 tiene dos modos (stateless y stateful) que no existen en IPv4.
e) **Verdadero.** Dual Stack ejecuta ambas pilas de protocolos simultáneamente.

## 5. NDP

1 → c (Neighbor Solicitation: "¿Quién tiene esta IP?")
2 → d (Neighbor Advertisement: "Yo, aquí está mi MAC")
3 → b (Router Solicitation: dispositivo busca routers)
4 → a (Router Advertisement: router anuncia su prefijo)

## 6. Mecanismos de transición

1 → b (Dual Stack: ambos protocolos a la vez)
2 → c (Túnel 6to4: encapsula IPv6 en IPv4)
3 → a (NAT64: traduce IPv6→IPv4)

## 7. Expande direcciones

a) `2001:DB8::1` → **`2001:0DB8:0000:0000:0000:0000:0000:0001`**
   (el `::` oculta 5 grupos de ceros entre `DB8` y el `1`).

b) `FE80::2AA:FF:FE9A:4CA2` → **`FE80:0000:0000:0000:02AA:00FF:FE9A:4CA2`**
   (el `::` oculta 4 grupos de ceros; al expandir, `2AA` → `02AA` y `FF` → `00FF`).

c) `::1` → **`0000:0000:0000:0000:0000:0000:0000:0001`**
   (siete grupos de ceros + el `1`).

## 8. Clasifica tipo y ámbito

| Dirección | Tipo | Ámbito |
|---|---|---|
| a) `2001:DB8::1` | **Global Unicast** (GUA, 2000::/3) | **Global** (Internet) |
| b) `FE80::1` | **Link-Local** (LLA, FE80::/10) | **Enlace local** (misma LAN) |
| c) `FC00::1` | **Unique Local** (ULA, FC00::/7) | **Privado/organización** |
| d) `::1` | **Loopback** | **Este nodo** (local) |
| e) `FF02::1` | **Multicast** (todos los nodos) | **Enlace local** (el `02` en FF02) |
| f) `2001:DB8:1:2:21A:2BFF:FE3C:4D5E` | **Global Unicast** (2000::/3) | **Global** (Internet) |
