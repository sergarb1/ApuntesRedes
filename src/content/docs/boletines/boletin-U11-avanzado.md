---
title: Boletín U11 — Avanzado
description: Ejercicios avanzados de Diagnóstico y monitorización
---

# 📝 Boletín U11 — Avanzado

> Ejercicios que requieren comprensión profunda de diagnóstico y SNMP.

---

## 1. Análisis Wireshark

Has capturado una comunicación TCP. Ves estos paquetes en orden:

```
1: 192.168.1.10:50000 → 93.184.216.34:80  [SYN]
2: 93.184.216.34:80 → 192.168.1.10:50000  [SYN, ACK]
3: 192.168.1.10:50000 → 93.184.216.34:80  [ACK]
4: 192.168.1.10:50000 → 93.184.216.34:80  [PSH, ACK]  (GET / HTTP/1.1)
5: 93.184.216.34:80 → 192.168.1.10:50000  [PSH, ACK]  (HTTP 200 OK)
...
```

a) Identifica las 3 fases del handshake TCP.
b) ¿Qué significa PSH?
c) Si ves 10 paquetes [TCP Retransmission] después del paquete 4, ¿qué está pasando?

## 2. Monitorización SNMP avanzada

Un administrador quiere monitorizar estos parámetros de un router:
- Nombre del dispositivo
- Tiempo activo (uptime)
- Tráfico entrante y saliente de la interfaz G0/0
- CPU load

a) Investiga y escribe las OIDs de cada parámetro.
b) ¿Cómo harías una consulta SNMP desde línea de comandos para leer el uptime?
c) ¿Qué herramienta usarías para graficar estas métricas a lo largo del tiempo?

## 3. Diagnóstico de problema real

Un usuario reporta: *"Internet va muy lento desde las 9 de la mañana. Antes de las 9 iba bien."*

Desarrolla un plan de diagnóstico completo. Incluye:
- Qué comandos usarías en cada paso
- Qué herramientas usarías
- Qué métricas compararías

## 4. Configura Syslog centralizado

Tienes 5 routers Cisco que deben enviar logs a un servidor Linux (192.168.100.50).

a) Configura el logging en los routers.
b) ¿Qué configuración necesitas en el servidor Linux para recibir logs?
c) ¿Qué nivel de logging es adecuado para producción sin llenar el disco?

## 5. Comparativa de herramientas

Completa la tabla comparativa:

| Herramienta | Tipo | Puerto(s) | Cifrado | ¿Activa o pasiva? |
|---|---|---|---|---|
| SNMP v2c | | | No | Activa (polling) |
| Syslog | | | | |
| NetFlow | | | | |
| Wireshark | | N/A | | |

## 6. Troubleshooting complejo

Un sitio remoto no puede acceder a la sede central. La topología es:

```
SitioA (192.168.1.0/24) ─── RouterA ─── Internet ─── RouterB ─── SedeCentral (10.0.0.0/24)
```

- Desde SitioA, `ping 10.0.0.1` (RouterB) funciona.
- Desde SitioA, `telnet 10.0.0.100 443` (servidor web en SedeCentral) no funciona.
- Desde SedeCentral, se puede acceder al servidor web localmente.

¿Cuál es el problema probable? ¿Qué comandos usarías para confirmarlo?
