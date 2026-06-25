---
title: Boletín U02 — Simple (Resuelto)
description: Soluciones ejercicios básicos de Modelos OSI y Análisis de Tráfico
---

# ✅ Boletín U02 — Simple (Resuelto)

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

a) **Falso.** TCP/IP tiene 4 capas: Aplicación, Transporte, Internet, Acceso a Red.
b) **Verdadero.** En capa 3 la PDU se llama paquete (o datagrama en IP).
c) **Falso.** UDP no garantiza orden ni fiabilidad. Eso es TCP.
d) **Verdadero.** SYN, SYN-ACK, ACK: el three-way handshake es la esencia de TCP.
e) **Falso.** En un switch solo ves tu propio tráfico unicast. Para ver el de otros necesitas un hub, puerto espejo, o ARP spoofing.

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
