---
title: Boletín U12 — Avanzado (Resuelto)
description: Soluciones ejercicios avanzados de Diagnóstico y monitorización
---

# ✅ Boletín U12 — Avanzado (Resuelto)

---

## 1. Análisis Wireshark

a) **Handshake TCP (3 pasos):**
   - Paquete 1: **SYN** — Cliente inicia conexión
   - Paquete 2: **SYN-ACK** — Servidor acepta
   - Paquete 3: **ACK** — Cliente confirma → conexión establecida

b) **PSH** (Push) indica que los datos deben ser entregados inmediatamente a la aplicación, sin esperar a llenar el buffer TCP.

c) **El servidor no está recibiendo la petición HTTP o no puede responder.** Las retransmisiones indican pérdida de paquetes: el cliente no recibe ACK del paquete 4 y lo reenvía una y otra vez. Causas probables: cortafuegos bloqueando, congestión, o servidor caído.

## 2. Monitorización SNMP avanzada

a) OIDs:
   - Nombre del dispositivo: `1.3.6.1.2.1.1.5.0`
   - Uptime: `1.3.6.1.2.1.1.3.0`
   - Tráfico entrante G0/0: `1.3.6.1.2.1.2.2.1.10.X` (X = índice de interfaz)
   - Tráfico saliente G0/0: `1.3.6.1.2.1.2.2.1.16.X`
   - CPU load: `1.3.6.1.2.1.25.3.3.1.2`

b) Comando:
   ```bash
   snmpget -v2c -c publicia 192.168.1.1 1.3.6.1.2.1.1.3.0
   ```

c) **Zabbix, PRTG, LibreNMS, Cacti** — todas grafican métricas SNMP.

## 3. Diagnóstico de problema real

**Plan de diagnóstico:**

1. **Verificar línea base:** ¿Qué velocidad se tenía antes de las 9? Comparar con mediciones actuales.
2. **Verificar uso de ancho de banda:** `show interface` en el router de salida. Ver si el tráfico está saturado.
3. **Identificar qué consume el ancho de banda:** NetFlow o `show ip cache flow` para ver qué IPs y puertos usan más tráfico.
4. **Verificar errores de capa 1/2:** `show interface` para CRC errors, collisions, runts.
5. **Verificar logs del router:** `show logging` para ver errores o cambios de configuración.
6. **Analizar hora:** ¿A las 9 empieza algún backup, actualización, o llegan más empleados?

**Herramientas:** Wireshark, NetFlow, SNMP (Zabbix), `iperf3` para pruebas de throughput.

## 4. Configura Syslog centralizado

a) En cada router:
   ```bash
   R1(config)# logging host 192.168.100.50
   R1(config)# logging trap notifications
   R1(config)# logging source-interface loopback 0
   R1(config)# service timestamps log datetime msec
   ```

b) En el servidor Linux:
   ```bash
   # Configurar rsyslog para recibir logs UDP en puerto 514
   sudo sed -i 's/^#module(load="imudp")/module(load="imudp")/' /etc/rsyslog.conf
   sudo sed -i 's/^#input(type="imudp" port="514")/input(type="imudp" port="514")/' /etc/rsyslog.conf
   sudo systemctl restart rsyslog
   ```

c) En producción: **nivel 5 (notifications)** o **nivel 6 (informational)**. Nivel 7 (debug) llenaría el disco muy rápido.

## 5. Comparativa de herramientas

| Herramienta | Tipo | Puerto(s) | Cifrado | Activa o pasiva |
|---|---|---|---|---|
| SNMP v2c | Monitorización | 161/162 | No | Activa (polling) |
| Syslog | Logging | 514 | No (TCP/UDP) | Pasiva (envío desde dispositivos) |
| NetFlow | Análisis tráfico | 2055/9995 | No | Pasiva (envío desde routers) |
| Wireshark | Captura paquetes | N/A | N/A | Pasiva (solo captura) |

## 6. Troubleshooting complejo

**Problema probable:** Una **ACL** en RouterA o RouterB bloquea el puerto 443 (HTTPS) pero permite ICMP. O el **firewall** en el servidor web bloquea conexiones desde 192.168.1.0/24.

**Comandos para confirmar:**
- `show access-lists` en RouterA y RouterB — buscar reglas que bloqueen tcp/443
- `telnet 10.0.0.100 443` desde RouterA (no desde un PC) — para ver si el problema está en la ACL de salida
- `show ip interface` en RouterB — verificar si hay ACL aplicada en la interfaz hacia SedeCentral
- En el servidor web: `netstat -an | find ":443"` (Windows) o `ss -tlnp | grep 443` (Linux) — verificar que el servicio escucha

## 7. Análisis de una captura con retransmisiones

a) **Sí, el handshake se completó correctamente.** Los paquetes 1 (SYN), 2 (SYN-ACK) y 3 (ACK) forman el three-way handshake completo: la conexión quedó establecida y el cliente pudo enviar la petición GET en el paquete 4.

b) Los paquetes 5 y 6 son **reenvíos del paquete 4** porque el cliente no recibió su ACK a tiempo. Es la señal clásica de **pérdida de paquetes o congestión**: la petición GET (o su ACK) se perdió en el camino, así que el emisor la reenvía tras el temporizador de retransmisión (RTO).

c) El paquete 7 (`Window=0`) indica que el **receptor está saturado** (su buffer TCP está lleno) y pide al emisor que deje de enviar datos. Conclusión global: hay una red con **pérdidas** (las retransmisiones del 4) y un **servidor ahogado** (ventana a cero). El síntoma combinado apunta a congestión del enlace o saturación del servidor web, más que a un fallo de configuración pura.

## 8. Plan de monitorización SNMP + syslog

a) **OIDs clave:**
   - `1.3.6.1.2.1.1.3.0` — sysUpTime: detectar reinicios inesperados de equipos
   - `1.3.6.1.2.1.2.2.1.10.X` — ifInOctets de la interfaz de uplink (dos lecturas separadas para velocidad)
   - `1.3.6.1.2.1.2.2.1.16.X` — ifOutOctets de la interfaz de uplink
   - `1.3.6.1.2.1.25.3.3.1.2` — hrProcessorLoad: carga de CPU de los equipos

b) **Herramienta:** **Zabbix** (o LibreNMS). Justificación: es de las más modernas y populares, soporta SNMP + syslog + NetFlow, tiene auto-descubrimiento para los 10 dispositivos (los detecta solos) y es open source. PRTG también valdría, pero la licencia gratuita de 100 sensores es más justa con 10 dispositivos × varias métricas.

c) **Configuración:**
   - SNMP en cada dispositivo: comunidad de solo lectura `monitor ro` (sin `rw`), `snmp-server location` y `snmp-server contact` identificando cada equipo, y `snmp-server host <IP-NMS> traps version 2c monitor`. Para producción real: **SNMP v3** con SHA + AES.
   - Syslog: `logging host <IP-servidor-logs>`, `logging trap notifications` (nivel 5), `logging source-interface loopback 0` y `service timestamps log datetime msec`; en el servidor, rsyslog escuchando en UDP/514 con un archivo por dispositivo.

d) **3 alarmas con umbral:**
   1. **CPU > 80% durante 5 minutos** en switches y routers → posible sobrecarga o ataque.
   2. **Tráfico de uplink > 85% del enlace durante 10 minutos** → saturación inminente (complementar con NetFlow para ver quién consume).
   3. **sysUpTime que decrece** (equipo reiniciado) fuera de la ventana de mantenimiento → reinicio no planificado.