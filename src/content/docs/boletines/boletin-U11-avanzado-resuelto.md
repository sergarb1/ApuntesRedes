---
title: Boletín U11 — Avanzado (Resuelto)
description: Soluciones ejercicios avanzados de Diagnóstico y monitorización
---

# ✅ Boletín U11 — Avanzado (Resuelto)

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
