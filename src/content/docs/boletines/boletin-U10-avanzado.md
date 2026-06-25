---
title: Boletín U10 — Avanzado
description: Ejercicios avanzados de NAT
---

# 📝 Boletín U10 — Avanzado

> Ejercicios que requieren comprender NAT en profundidad.

---

## 1. Traducción manual

Dado el siguiente escenario:

- PC1: 192.168.1.10, accede a 8.8.8.8:80 (HTTP)
- PC2: 192.168.1.20, accede a 8.8.8.8:53 (DNS)
- Router NAT IP pública: 83.45.12.78

El PC1 usa puerto origen 50000 y PC2 puerto 50000 también. Completa la tabla NAT:

| Pro | Inside global | Inside local | Outside local | Outside global |
|---|---|---|---|---|
| tcp | 83.45.12.78:___ | 192.168.1.10:50000 | 8.8.8.8:80 | 8.8.8.8:80 |
| udp | ___ | 192.168.1.20:50000 | 8.8.8.8:53 | 8.8.8.8:53 |

## 2. Problema con FTP

Un usuario interno (192.168.1.10) intenta usar FTP activo para enviar un archivo a un servidor externo (200.100.50.1). El protocolo FTP activo funciona así:

- El cliente abre puerto 1025 para datos.
- El cliente envía el comando PORT 192,168,1,10,4,1 (puerto 4×256+1=1025).
- El servidor intenta conectar a 192.168.1.10:1025.

¿Por qué falla? ¿Cómo lo solucionas?

## 3. Configuración multi-NAT

Una empresa tiene dos servidores internos:
- Servidor web en 192.168.1.10:80 y 192.168.1.10:443
- Servidor SSH en 192.168.1.20:22
- IP pública: 83.45.12.78

Quieren:
- Web accesible desde fuera como 83.45.12.78:8080 → 192.168.1.10:80
- HTTPS accesible como 83.45.12.78:8443 → 192.168.1.10:443
- SSH accesible como 83.45.12.78:2222 → 192.168.1.20:22

Configura el NAT destino necesario.

## 4. NAT + VPN

Un empleado necesita conectar por VPN (IPsec) a la oficina. El router de la oficina hace NAT.

Pero IPsec no funciona a través de NAT. ¿Por qué? ¿Qué solución existe?

## 5. Análisis de timeouts

Un usuario se queja de que su conexión SSH se corta después de 5 minutos de inactividad. La tabla NAT tiene un timeout de 24 horas para UDP y configurable para TCP.

¿Por qué se corta la conexión aunque el timeout NAT no haya expirado? ¿Dónde está el verdadero problema?

## 6. NAT y servidores duales

Una empresa tiene:
- 2 IPs públicas: 83.45.12.78 y 83.45.12.79
- Servidor web interno: 192.168.10.10
- Servidor de correo interno: 192.168.10.20

Quieren que el web sea accesible por 83.45.12.78 y el correo por 83.45.12.79. Los PCs internos deben salir por PAT con la IP 83.45.12.78.

Configura todo.
