---
title: Boletín U04 — Avanzado (Resuelto)
description: Soluciones ejercicios avanzados de IPv4 y Subnetting
---

# ✅ Boletín U04 — Avanzado (Resuelto)

---

## 1. Diseño VLSM

Red base: 172.16.0.0/24 (256 direcciones totales)

**Ordenando de mayor a menor:** Producción (60) → Desarrollo (30) → Testing (10) → 3 enlaces WAN (2 c/u)

| Subred | Hosts | CIDR | Red | Rango | Broadcast |
|---|---|---|---|---|---|
| Producción | 60 (62) | /26 | 172.16.0.0 | .1 - .62 | .63 |
| Desarrollo | 30 (30) | /27 | 172.16.0.64 | .65 - .94 | .95 |
| Testing | 10 (14) | /28 | 172.16.0.96 | .97 - .110 | .111 |
| WAN 1 | 2 (2) | /30 | 172.16.0.112 | .113 - .114 | .115 |
| WAN 2 | 2 (2) | /30 | 172.16.0.116 | .117 - .118 | .119 |
| WAN 3 | 2 (2) | /30 | 172.16.0.120 | .121 - .122 | .123 |

**Sobran:** 172.16.0.124 - 172.16.0.255 = **132 direcciones** (132 - 2 = 130 hosts útiles).

## 2. Diagnóstico DHCP

a) Es una **dirección APIPA** (Automatic Private IP Addressing), rango 169.254.0.0/16.

b) Windows asigna automáticamente una IP APIPA cuando el **servidor DHCP no responde** o no está disponible.

c) **Soluciones:**
   1. Verificar que el servidor DHCP esté encendido y funcionando
   2. Comprobar la conectividad con el servidor DHCP (¿está en la misma red? ¿hay switches funcionando?)
   3. Hacer `ipconfig /release` y `ipconfig /renew` para forzar una nueva solicitud DHCP
   4. Asignar una IP estática si el DHCP no es recuperable

## 3. Subnetting binario

a) **IP en binario:** 200.100.50.30 = 11001000.01100100.00110010.00011110
   **Máscara en binario:** 255.255.255.224 = 11111111.11111111.11111111.11100000

b) **AND → Dirección de red:** 11001000.01100100.00110010.00000000 = **200.100.50.0/27**

c) **Broadcast:** 200.100.50.31 (todos los bits de host a 1: 00011111)

d) **Hosts útiles:** 2⁵ - 2 = 32 - 2 = **30 hosts**

e) **200.100.50.62 → binario:** 11001000.01100100.00110010.00111110
   Red de .62 con /27: 200.100.50.32/27 (bits de red fijos, 00100000)
   **NO está en la misma subred.** .30 está en 200.100.50.0/27, .62 está en 200.100.50.32/27.

## 4. Resumen de subredes

a) **Bits a pedir:** 2ⁿ = 8 → n = 3 bits

b) Máscara original: /16. Nuevos bits: 16 + 3 = **/19** (255.255.224.0)

c) **Hosts por subred:** 32 - 19 = 13 bits de host → 2¹³ - 2 = **8190 hosts**

d) **Subredes:**
   - 10.0.0.0/19
   - 10.0.32.0/19
   - 10.0.64.0/19
   - 10.0.96.0/19
   - 10.0.128.0/19
   - 10.0.160.0/19
   - 10.0.192.0/19
   - 10.0.224.0/19

(El incremento entre subredes es 32 en el tercer octeto: 2¹⁹⁻¹⁶ = 2³ = 32)

## 5. Sumarización de rutas

a) **Ruta resumida:** 192.168.0.0/22

**Razonamiento:**
- 192.168.0.0/24: bits 22-23 = 00
- 192.168.1.0/24: bits 22-23 = 01
- 192.168.2.0/24: bits 22-23 = 10
- 192.168.3.0/24: bits 22-23 = 11

Los primeros 22 bits son idénticos. La ruta /22 engloba las 4 subredes.

b) **Máscara:** /22 (255.255.252.0)

c) **IPs totales:** 2^(32-22) - 2 = 2¹⁰ - 2 = **1022 hosts** (1024 direcciones totales)

## 6. Plan de direccionamiento para una empresa

Red base: 10.0.0.0/22 (1024 direcciones, 1022 hosts útiles)

**Ordenando de mayor a menor:**
- Administración: 200 → /24 (254 hosts)
- Producción: 100 → /25 (126 hosts)
- IT: 50 → /26 (62 hosts)
- Ventas: 50 → /26 (62 hosts)
- Almacén: 20 → /27 (30 hosts)
- Dirección: 10 → /28 (14 hosts)
- Enlace /30

**Plan VLSM:**

| Subred | CIDR | Red | Rango | Broadcast |
|---|---|---|---|---|
| Administración | /24 | 10.0.0.0 | .1 - .254 | .255 |
| Producción | /25 | 10.0.1.0 | .1 - .126 | .127 |
| IT | /26 | 10.0.1.128 | .129 - .190 | .191 |
| Ventas | /26 | 10.0.1.192 | .193 - .254 | .255 |
| Almacén | /27 | 10.0.2.0 | .1 - .30 | .31 |
| Dirección | /28 | 10.0.2.32 | .33 - .46 | .47 |
| Enlace | /30 | 10.0.2.48 | .49 - .50 | .51 |

**Sobran:** 10.0.2.52 - 10.0.3.255 → **~460 IPs**

**Problemas si crece al doble:** Si cada departamento duplica sus hosts, Administración necesitaría /23 (510 hosts), lo que rompe el plan VLSM actual. Habría que rediseñar usando una red base más grande (ej. /20) desde el principio.
