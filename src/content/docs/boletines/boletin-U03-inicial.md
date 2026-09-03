---
title: Boletín U03 — Inicial
description: Ejercicios básicos de Modelos OSI y Análisis de Tráfico
---

# 📝 Boletín U03 — Inicial

> Ejercicios básicos para afianzar los conceptos de capas OSI, TCP/IP, encapsulación y Wireshark.

---

## 1. Ordena las capas OSI

Ordena de menor a mayor (de capa 1 a capa 7):

a) Transporte
b) Aplicación
c) Red
d) Enlace
e) Sesión
f) Física
g) Presentación

## 2. ¿Qué capa soy?

Relaciona cada función con la capa OSI correspondiente:

| Función | Capa |
|---|---|
| a) Direccionamiento IP y enrutamiento | |
| b) Transmisión de bits por el cable | |
| c) Segmentación y control de flujo | |
| d) Interfaz con el usuario/aplicación | |
| e) Direccionamiento MAC y detección de errores | |

## 3. Verdadero o falso

a) El modelo TCP/IP tiene 7 capas como el OSI.
b) La PDU de la capa de Red se llama "paquete".
c) UDP garantiza que los datos lleguen en orden.
d) El three-way handshake es propio de TCP.
e) Wireshark puede capturar el tráfico unicast de otros equipos en un switch sin configuración especial.

## 4. Identifica el puerto

Indica qué puerto y protocolo (TCP/UDP) usa cada servicio:

a) HTTP
b) HTTPS
c) DNS
d) SSH
e) DHCP

## 5. Tamaños de cabeceras

Completa la tabla:

| Cabecera | Tamaño mínimo (bytes) |
|---|---|
| Ethernet | |
| IPv4 | |
| TCP | |
| UDP | |

## 6. ¿Qué PDU es?

Relaciona cada capa con su PDU:

| Capa | PDU |
|---|---|
| 4. Transporte | a) Bits |
| 3. Red | b) Trama |
| 2. Enlace | c) Paquete |
| 1. Física | d) Segmento/Datagrama |

## 7. El campo TTL

a) ¿Para qué sirve el campo **TTL** de la cabecera IPv4?
b) Un paquete sale con TTL = 64 y llega a su destino con TTL = 57. ¿Cuántos routers (saltos) ha cruzado?
c) ¿Qué EtherType esperas en la cabecera Ethernet de una trama que contiene un paquete IPv4?

## 8. Origen y destino

Observa esta conexión:

```
Origen:  192.168.1.10:54321
Destino: 142.250.184.4:443
```

a) ¿Cuál de los dos puertos es *efímero*? ¿En qué rango está?
b) ¿Qué servicio reconoce el puerto 443?
c) ¿Qué identifica exactamente un *socket*?