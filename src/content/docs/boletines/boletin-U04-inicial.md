---
title: Boletín U04 — Inicial
description: Ejercicios básicos de IPv4 y Subnetting
---

# 📝 Boletín U04 — Inicial

> Ejercicios básicos para afianzar los conceptos de direccionamiento IPv4 y máscaras.

---

## 1. Conversión binario

Convierte a binario (8 bits):

a) 192
b) 10
c) 255
d) 0

## 2. Conversión a decimal

Convierte a decimal:

a) 11000000
b) 10101000
c) 00001010
d) 11111111

## 3. ¿Qué máscara es?

Relaciona la notación CIDR con la máscara decimal:

| CIDR | Máscara |
|---|---|
| /24 | a) 255.255.255.252 |
| /16 | b) 255.255.255.0 |
| /30 | c) 255.255.0.0 |
| /8 | d) 255.0.0.0 |

## 4. Verdadero o falso

a) Una dirección IPv4 tiene 48 bits.
b) 192.168.1.256 es una IP válida.
c) La dirección de broadcast de 192.168.1.0/24 es 192.168.1.255.
d) DHCP asigna IPs automáticamente.
e) Las IPs privadas pueden viajar por Internet.

## 5. Calcula hosts

¿Cuántos hosts útiles tiene cada subred?

a) /24
b) /27
c) /30
d) /29

## 6. Identifica el tipo

Indica si cada IP es pública, privada o especial:

a) 10.0.0.15
b) 8.8.8.8
c) 192.168.1.1
d) 127.0.0.1
e) 172.16.0.100
f) 169.254.1.1

## 7. Calcula la dirección de red

Para cada par de IP y máscara, haz el **AND** bit a bit y di cuál es la **dirección de red**:

a) IP: 192.168.1.37 · Máscara: 255.255.255.0
b) IP: 10.0.0.150 · Máscara: 255.0.0.0
c) IP: 172.16.0.200 · Máscara: 255.255.255.128
d) IP: 192.168.1.66 · Máscara: 255.255.255.192

**Pista:** pasa el octeto "mágico" (el último de la máscara que no es 255) a binario y haz el AND con el octeto correspondiente de la IP. El resto de octetos se copian tal cual (si la máscara es 255) o se ponen a 0 (si la máscara es 0).

## 8. Subredes iguales

Divide la red **192.168.5.0/24** en **4 subredes del mismo tamaño**.

a) ¿Cuántos bits debes prestar a la máscara?
b) ¿Cuál es la nueva máscara (CIDR y decimal)?
c) ¿Cuántos hosts útiles tiene cada subred?
d) Enumera las 4 direcciones de red con su rango de hosts.
