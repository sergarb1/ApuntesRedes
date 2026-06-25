---
title: U11 — Diagnóstico y monitorización
description: Apágalo y vuelve a encenderlo 🧠
---

<p><small>Apágalo y vuelve a encenderlo 🧠</small></p>

> 🗺️ **Ruta del paquete:** 🏠 Origen → 📦 Encapsulado → 🔌 Cable → 🏷️ IP → 🌍 IPv6 → 🔀 Switch → 🏢 VLAN → 🧭 Router → 🗣️ OSPF → 🌐 NAT → 🩺 **DIAGNÓSTICO** → ☁️ Cloud

---

*En el camino de un paquete a través de la red pueden ocurrir múltiples fallos: cables rotos, ACLs que bloquean tráfico legítimo, NAT mal configurado, rutas perdidas... ¿Cómo se diagnostica una red cuando algo falla?*

Bienvenido al arte del troubleshooting. La habilidad más valiosa de un administrador de redes.

---

## 📚 Contenidos

- Metodología de troubleshooting (OSI de abajo arriba)
- Comandos esenciales: ping, traceroute, telnet, nslookup, pathping, mtr
- Wireshark: filtros, estadísticas, seguimiento de flujo (Follow TCP Stream)
- Análisis de TCP: handshake, retransmisiones, ventanas, RTT
- SNMP: arquitectura, MIB, OID, comunidades v1/v2c/v3
- Syslog: niveles, logging centralizado, rsyslog
- NetFlow/IPFIX: análisis de tráfico
- Herramientas de monitorización (Zabbix, PRTG, Nagios, LibreNMS)

---

## 🩺 Metodología de troubleshooting

### Modelo OSI de abajo arriba

| Capa | Qué comprobar | Comandos |
|---|---|---|
| **1 Física** | Cable conectado, LEDs, CRC errors | `show interface`, `show port` |
| **2 Enlace** | MAC table, VLAN, STP | `show mac address-table`, `show spanning-tree` |
| **3 Red** | IP, máscara, gateway, rutas | `ping`, `ipconfig`, `show ip route` |
| **4 Transporte** | Puertos abiertos, ACLs | `telnet`, `netstat`, `show access-lists` |
| **5-7 Aplicación** | DNS, HTTP, aplicación | `nslookup`, `curl`, logs de aplicación |

**Regla de oro:** Pingea tu gateway primero. Si funciona, pingea más allá. Si falla, revisa capas 1 y 2.

---

## 🔧 Comandos esenciales

### Ping

```bash
# Linux/Windows
ping 8.8.8.8
ping -c 4 8.8.8.8    # Linux: 4 paquetes
ping -n 4 8.8.8.8    # Windows: 4 paquetes
```

**Códigos ICMP:** 0 = Echo Reply, 3 = Destination Unreachable, 8 = Echo Request, 11 = Time Exceeded

### Traceroute

```bash
tracert 8.8.8.8        # Windows
traceroute 8.8.8.8     # Linux
```

Cada salto muestra:
- Número de salto
- IP del router intermedio
- RTT (3 mediciones)
- `* * *` si no responde (puede ser firewall que bloquea ICMP)

### Netstat

```bash
netstat -ano           # Windows: conexiones activas
netstat -tulpn         # Linux: puertos en escucha
```

### Nslookup / Dig

```bash
nslookup google.com
nslookup google.com 8.8.8.8    # Usar DNS específico
dig google.com                  # Linux, más detallado
```

---

## 📡 Wireshark avanzado

### Filtros esenciales

| Filtro | Qué muestra |
|---|---|
| `ip.addr == 192.168.1.10` | Tráfico de/a esa IP |
| `tcp.port == 80` | Tráfico HTTP |
| `http.request` | Solo peticiones HTTP |
| `tcp.flags.syn == 1` | Paquetes SYN (inicio conexión) |
| `tcp.analysis.retransmission` | Retransmisiones TCP |
| `dns` | Tráfico DNS |
| `icmp` | Tráfico ICMP |

### Análisis TCP con Wireshark

1. **Handshake:** SYN → SYN-ACK → ACK (3 paquetes)
2. **Retransmisiones:** Si hay muchas, hay pérdida de paquetes o congestión
3. **Window size:** Si baja a 0, el receptor está saturado
4. **RTT:** Tiempo de ida y vuelta. Alto = latencia alta

### Follow TCP Stream

Wireshark → Click derecho en paquete → Follow → TCP Stream. Muestra la conversación completa entre cliente y servidor.

---

## 🔭 SNMP

**SNMP** (Simple Network Management Protocol) permite monitorizar dispositivos de red.

### Arquitectura

```
Gestor (NMS) ←────→ Agente SNMP (router, switch, servidor)
```

- **NMS** (Network Management System): Zabbix, PRTG, Nagios
- **Agente SNMP:** software en el dispositivo monitorizado
- **MIB** (Management Information Base): base de datos de variables
- **OID** (Object Identifier): identificador único de cada variable

### Versiones SNMP

| Versión | Seguridad | Uso |
|---|---|---|
| **v1** | Comunidad en texto claro | Obsoleto |
| **v2c** | Comunidad en texto claro | Común en redes internas |
| **v3** | Cifrado y autenticación (SHA + AES) | Recomendado para producción |

### OIDs comunes

```bash
1.3.6.1.2.1.1.5.0    → sysName (nombre del dispositivo)
1.3.6.1.2.1.1.3.0    → sysUpTime (tiempo activo)
1.3.6.1.2.1.2.2.1.10 → ifInOctets (tráfico entrante)
1.3.6.1.2.1.2.2.1.16 → ifOutOctets (tráfico saliente)
1.3.6.1.2.1.25.3.3.1.2 → hrProcessorLoad (CPU)
```

### Configurar SNMP en Cisco

```bash
R1(config)# snmp-server community publicia ro     # comunidad RO
R1(config)# snmp-server community privatilla rw   # comunidad RW
R1(config)# snmp-server location SalaServidores
R1(config)# snmp-server contact admin@empresa.com
R1(config)# snmp-server enable traps              # enviar traps
R1(config)# snmp-server host 192.168.1.100 traps version 2c publicia
```

---

## 📝 Syslog y logging

### Configurar syslog en Cisco

```bash
R1(config)# logging host 192.168.1.100
R1(config)# logging trap debugging            # Nivel máximo
R1(config)# logging source-interface loopback 0
R1(config)# service timestamps log datetime msec
```

### Niveles de syslog

| Nivel | Severidad | Descripción |
|---|---|---|
| 0 | Emergency | Sistema inusable |
| 1 | Alert | Acción inmediata |
| 2 | Critical | Condición crítica |
| 3 | Error | Error |
| 4 | Warning | Advertencia |
| 5 | Notice | Normal pero significativo |
| 6 | Informational | Informativo |
| 7 | Debug | Depuración |

---

## ⭐ Sé el Diagnóstico

> *Un usuario dice: "No puedo acceder a intranet.empresa.com". Tú, como administrador, sigues el método OSI de abajo arriba:*

1. **Capa 1:** ¿El cable está conectado? ¿LEDs? ✅ Sí.
2. **Capa 2:** ¿La MAC está aprendida en el switch? `show mac address-table` ✅.
3. **Capa 3:** ¿Tiene IP? `ipconfig`. Sí. ¿Hace ping al gateway? Sí. ¿Hace ping a 8.8.8.8? No.
4. **Capa 4:** ¿Puerto 443 accesible? `telnet intranet.empresa.com 443` — No responde.
5. **Capa 7:** ¿El DNS resuelve? `nslookup intranet.empresa.com` — ¡Resuelve a otra IP! El registro DNS está obsoleto.

**Problema:** DNS desactualizado. Solución: Actualizar registro DNS o limpiar caché local.

---

## 🔥 Fireside Chat: Ping vs Traceroute

> *Dos comandos de diagnóstico discuten en la terminal.*

**Ping:** — Yo soy el primero en usarse. Mando un Echo Request y espero un Reply. Si lo recibo, hay conectividad. Simple.

**Traceroute:** — Simple, sí. Pero si falla, no dices nada más. Yo te muestro CADA SALTO. Te digo dónde se pierde el paquete.

**Ping:** — A veces es suficiente saber que no hay comunicación.

**Traceroute:** — Y a veces necesitas saber si el problema está en tu router, en el ISP, o al otro lado del mundo. Para eso estoy yo.

**SNMP:** — Callaos los dos. Mientras vosotros esperáis a que alguien grite, yo monitorizo 24/7 y os aviso antes de que el usuario se queje.

**Syslog:** — Y yo guardo el historial de todo lo que pasa. Cuando algo falla, tengo los logs.

**Ping:** — Vale, vale. Pero sin mí, ninguno sabríais si hay conectividad básica.

---

## 🕵️ ¿Quién Soy?

1. Te digo si un host está reachable. Mando ICMP Echo Request. Espero Echo Reply.

2. Muestro cada salto que da un paquete hasta el destino.

3. Capturo paquetes en tiempo real. Analizo protocolos. Soy la navaja suiza del administrador.

4. Soy un protocolo que permite monitorizar dispositivos de red. Leo variables como uso de CPU, tráfico, temperatura.

5. Soy un sistema de logging centralizado. Recibo mensajes de routers, switches y servidores.

<details>
<summary>🔄 Respuestas</summary>

1. **Ping** (ICMP).
2. **Traceroute** (tracert en Windows, traceroute en Linux).
3. **Wireshark**.
4. **SNMP** (Simple Network Management Protocol).
5. **Syslog**.

</details>

---

## 🤬 CONRAD VS EL MUNDO: "He probado ping y no funciona"

**CONRAD:** — "Usuario dice: *He probado ping y no funciona*. Vale, ¿a dónde? *A no sé, a Internet*. ¿Qué es 'Internet'? ¿8.8.8.8? ¿google.com? ¿El ping a tu gateway funciona? *No lo he probado*. Pues PRUÉBALO. Si el ping al gateway falla, el problema está en tu casa. Si funciona pero a 8.8.8.8 no, el problema está más allá."

**Regla de oro:** Ping a tu gateway primero. Luego a 8.8.8.8. Luego a google.com. Aísla el problema progresivamente.

---

## ⚡ Laboratorio de Tortura: Red averiada

> **Duración:** 1.5 horas
> **Herramienta:** Packet Tracer, Wireshark

**Escenario:** Te dan una red preconfigurada con 5 fallos ocultos:
1. Un cable desconectado
2. Una interfaz de router "shutdown"
3. Una ACL que bloquea ICMP
4. Una ruta estática con máscara incorrecta
5. Un servidor DNS con IP incorrecta

**Tareas:**
1. Usa ping para identificar dónde falla la comunicación.
2. Usa traceroute para ver hasta dónde llega.
3. Usa Wireshark para capturar y analizar el tráfico.
4. Documenta cada fallo y cómo lo resolviste.

---

## 🏆 Logros de esta unidad

| Logro | Cómo conseguirlo |
|---|---|
| 🏅 **Ping Master** | Diagnosticar un fallo de conectividad en menos de 5 minutos |
| 🏅 **Wireshark Ninja** | Capturar y analizar un handshake TCP completo |
| 🏅 **SNMP Explorer** | Leer una OID remota y obtener un valor |
| 🏅 **Troubleshooter** | Resolver los 5 fallos del laboratorio |

---

## 🧠 Atrévete a Pensar

1. ¿Qué comando usarías para ver la ruta completa hasta un destino?
2. ¿Cómo detectarías un bucle de routing con traceroute?
3. ¿Qué diferencia hay entre SNMP v1, v2c y v3?
4. ¿Qué es una OID en SNMP? Pon un ejemplo.
5. Si ves muchos "TCP Retransmission" en Wireshark, ¿qué está pasando?

<details>
<summary>💡 Soluciones</summary>

1. **traceroute** (Linux) o **tracert** (Windows).
2. Si ves los mismos routers repitiéndose en la salida de traceroute (RouterA → RouterB → RouterA → RouterB...), hay un bucle.
3. **v1:** básico, comunidades en texto claro. **v2c:** mejoras en rendimiento, sigue texto claro. **v3:** cifrado y autenticación.
4. **OID** (Object Identifier) identifica una variable SNMP. Ej: `1.3.6.1.2.1.1.5.0` = nombre del sistema.
5. Hay **pérdida de paquetes** o **congestión** en la red. El emisor no recibe ACKs y reenvía. Causas: buffer lleno, ancho de banda insuficiente, cable defectuoso.

</details>

---

## 🧩 Crucigrama de Bits

```
Horizontal:
1. Protocolo de monitorización de dispositivos (4 letras)
4. Variable que identifica un recurso SNMP (3 letras)
5. Puerto por defecto de SNMP (2 dígitos)
7. Sistema de logging centralizado (6 letras)
8. Herramienta de captura de paquetes (9 letras)

Vertical:
2. Herramienta gráfica de captura de paquetes (9 letras)
3. Comando que muestra la ruta hasta un destino en Windows (6 letras)
6. Protocolo usado por ping (4 letras)
```

<details>
<summary>📝 Soluciones</summary>

**Horizontal:** 1. SNMP, 4. OID, 5. 161, 7. SYSLOG, 8. WIRESHARK
**Vertical:** 2. WIRESHARK, 3. TRACERT, 6. ICMP

</details>

---

## 💬 Preguntas de Entrevista de Trabajo

1. **"Un usuario no puede navegar. Descríbeme tu proceso de diagnóstico paso a paso."**
2. **"¿Qué diferencia ves entre SNMP v2c y v3?"**
3. **"Has visto en Wireshark muchos paquetes TCP Retransmission. ¿Qué significa?"**
4. **"Configura un sistema de monitorización básico con SNMP."**
5. **"¿Qué es NetFlow? ¿En qué se diferencia de SNMP?"**

---

## 🤷 No hay preguntas tontas

> ❓ **¿Cuál es el comando de diagnóstico más eficaz en routers Cisco?**

No existe un único comando más eficaz, ya que depende del problema. Sin embargo, `show running-config | include <patrón>` permite filtrar la configuración en ejecución para mostrar solo las líneas que contienen un término específico, lo que agiliza la localización de configuraciones concretas. Otros comandos esenciales son `show ip interface brief`, `show ip route`, `ping` y `traceroute`. La clave está en aplicar una metodología estructurada de diagnóstico.

---

> ❓ **¿Wireshark puede ver el tráfico de todos los PCs de la red?**

Solo si la red está configurada para ello. En un switch normal, cada puerto solo ve su tráfico. Para capturar todo, necesitas: **port mirroring** (SPAN) en el switch, un hub (obsoleto), o una tap de red.

---

> ❓ **¿SNMP es seguro?**

Depende de la versión. SNMP v1 y v2c envían la comunidad (contraseña) en texto claro. Cualquiera con Wireshark puede leerla. Para entornos de producción, usa **SNMP v3** con cifrado AES y autenticación SHA.

---

## 🎬 Post-Créditos

> *La red es un organismo vivo: a veces se cae, a veces se recupera. La clave está en tener una metodología de diagnóstico sólida.*

*El enemigo no es el router, el switch o el cable. El enemigo es la falta de metodología.*

**PRÓXIMAMENTE EN U12:** *El futuro. Cloud, virtualización, SDN, IPv8. La red ya no es solo cables y routers. Es software.*

---

## ✅ Criterios de evaluación cubiertos

**RA2/Transversal: Diagnóstico y monitorización.**

| Criterio | Cubierto |
|---|---|
| h) Mapa físico y lógico | ✅ Metodología OSI |
| i) Monitorización SNMP | ✅ Teoría y configuración |
| j) Herramientas de diagnóstico | ✅ Ping, traceroute, Wireshark |
| k) Syslog y logging | ✅ Configuración y niveles |
