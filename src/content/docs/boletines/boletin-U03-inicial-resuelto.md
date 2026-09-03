---
title: Boletín U03 — Inicial (Resuelto)
description: Soluciones de los ejercicios básicos de Modelos OSI y Análisis de Tráfico
---

# ✅ Boletín U03 — Inicial (Resuelto)

---

## 1. Ordena las capas OSI

1. **Física** — Capa 1
2. **Enlace** — Capa 2
3. **Red** — Capa 3
4. **Transporte** — Capa 4
5. **Sesión** — Capa 5
6. **Presentación** — Capa 6
7. **Aplicación** — Capa 7

## 2. ¿Qué capa soy?

a) Direccionamiento IP y enrutamiento → **Capa 3 (Red)**
b) Transmisión de bits por el cable → **Capa 1 (Física)**
c) Segmentación y control de flujo → **Capa 4 (Transporte)**
d) Interfaz con el usuario/aplicación → **Capa 7 (Aplicación)**
e) Direccionamiento MAC y detección de errores → **Capa 2 (Enlace)**

## 3. Verdadero o falso

a) **Falso.** TCP/IP tiene 4 capas: Aplicación, Transporte, Internet y Acceso a Red.
b) **Verdadero.** En la capa de Red la PDU se llama paquete (datagrama en UDP).
c) **Falso.** UDP no garantiza orden ni fiabilidad: eso es TCP.
d) **Verdadero.** SYN, SYN-ACK, ACK: el three-way handshake es la esencia de TCP.
e) **Falso.** Con un switch solo ves tu tráfico unicast; el de otros necesita un hub, puerto espejo o ARP spoofing.

## 4. Identifica el puerto

a) HTTP → **80/TCP**
b) HTTPS → **443/TCP**
c) DNS → **53/UDP** (y TCP para transferencias de zona)
d) SSH → **22/TCP**
e) DHCP → **67-68/UDP**

## 5. Tamaños de cabeceras

| Cabecera | Tamaño mínimo (bytes) |
|---|---|
| Ethernet | 14 (+ 4 FCS) |
| IPv4 | 20 |
| TCP | 20 |
| UDP | 8 |

## 6. ¿Qué PDU es?

| Capa | PDU |
|---|---|
| 4. Transporte → d) | Segmento/Datagrama |
| 3. Red → c) | Paquete |
| 2. Enlace → b) | Trama |
| 1. Física → a) | Bits |

## 7. El campo TTL

a) **Evitar bucles infinitos:** cada router lo decrementa en 1 y, si llega a 0, el paquete se descarta.
b) **64 - 57 = 7 saltos**.
c) **0x0800** — el EtherType de IPv4 (0x86DD es IPv6 y 0x0806 es ARP).

## 8. Origen y destino

a) El **54321** es el efímero: está en el rango **49152-65535**.
b) El **443** es **HTTPS** (web cifrada), un puerto *well-known* (0-1023).
c) Un **socket** es la combinación `IP:puerto` que identifica un extremo completo de la conversación (aquí `192.168.1.10:54321` y `142.250.184.4:443`).

>La conexión se define por DOS sockets: el de origen y el de destino.