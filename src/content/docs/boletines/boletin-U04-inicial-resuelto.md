---
title: Boletín U04 — Simple (Resuelto)
description: Soluciones ejercicios básicos de IPv4 y Subnetting
---

# ✅ Boletín U04 — Simple (Resuelto)

---

## 1. Conversión binario

a) 192 → **11000000**
b) 10 → **00001010**
c) 255 → **11111111**
d) 0 → **00000000**

## 2. Conversión a decimal

a) 11000000 → **192**
b) 10101000 → **168**
c) 00001010 → **10**
d) 11111111 → **255**

## 3. ¿Qué máscara es?

/24 → b) 255.255.255.0
/16 → c) 255.255.0.0
/30 → a) 255.255.255.252
/8 → d) 255.0.0.0

## 4. Verdadero o falso

a) **Falso.** IPv4 tiene 32 bits (4 octetos).
b) **Falso.** Cada octeto va de 0 a 255. 256 no existe en un octeto de 8 bits.
c) **Verdadero.** La última dirección del rango es el broadcast.
d) **Verdadero.** Dynamic Host Configuration Protocol.
e) **Falso.** Las IPs privadas (RFC 1918) no son enrutables en Internet. Necesitan NAT.

## 5. Calcula hosts

a) /24 → 256 - 2 = **254 hosts**
b) /27 → 32 - 2 = **30 hosts**
c) /30 → 4 - 2 = **2 hosts**
d) /29 → 8 - 2 = **6 hosts**

## 6. Identifica el tipo

a) 10.0.0.15 → **Privada** (clase A, RFC 1918)
b) 8.8.8.8 → **Pública** (DNS de Google)
c) 192.168.1.1 → **Privada** (clase C, RFC 1918)
d) 127.0.0.1 → **Especial** (loopback/localhost)
e) 172.16.0.100 → **Privada** (clase B, RFC 1918)
f) 169.254.1.1 → **Especial** (APIPA, cuando DHCP no responde)
