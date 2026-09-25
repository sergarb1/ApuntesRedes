---
title: Boletín de Direccionamiento IP — Inicial
description: Ejercicios básicos de IPv4, cabecera, ARP, fragmentación y subnetting
---

# 📝 Boletín de Direccionamiento IP — Inicial

> Ejercicios básicos para afianzar los conceptos de direccionamiento IPv4, máscaras, cabecera, ARP y fragmentación.

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

Relaciona la notación CIDR con la máscara decimal (escribe la letra):

| CIDR | Letra |
|---|---|
| /24 | ___ |
| /16 | ___ |
| /30 | ___ |
| /8 | ___ |

| Opciones de máscara | |
|---|---|
| a) | 255.255.255.252 |
| b) | 255.255.255.0 |
| c) | 255.255.0.0 |
| d) | 255.0.0.0 |

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

## 9. Cabecera IPv4

Relaciona cada campo de la cabecera con su función:

| Campo | Función |
|---|---|
| 1. TTL | a) Dice qué hay dentro: TCP (6), UDP (17), ICMP (1) |
| 2. Protocolo | b) IP origen y destino del paquete |
| 3. IP origen / destino | c) Contador de saltos; a 0 el paquete se descarta |
| 4. Offset + flags MF | d) Coordinan la fragmentación y el reensamblado |

V/F:

e) La cabecera IPv4 mínima mide 20 bytes.
f) El checksum de la cabecera IP protege el payload de los datos.
g) TTL evita bucles de rutas indefinidas.

## 10. ARP en la red local

Una PC `192.168.1.10` quiere hacer ping a `192.168.1.20` y su tabla ARP está vacía.

a) ¿Qué mensaje ARP se envía primero y con qué dirección MAC de destino (capa 2)?
b) ¿Quién contesta y con qué tipo de mensaje?
c) ¿Qué guarda la PC en su tabla al terminar? ¿Con qué comando lo compruebas en Windows?
d) ¿ARP resuelve IP→MAC o MAC→IP?

## 11. MTU y fragmentación

Un host envía un datagrama IPv4 de **4000 bytes de datos** + 20 de cabecera por un enlace con **MTU 1500**.

a) ¿Cuántos bytes de payload caben en cada fragmento (recuerda el múltiplo de 8 y la cabecera)?
b) ¿Cuántos fragmentos salen en total? ¿Cuánto mide el último?
c) ¿Qué flag indica al destino que aún faltan fragmentos?
d) ¿Quién reensambla: el router intermedio o el host destino?
