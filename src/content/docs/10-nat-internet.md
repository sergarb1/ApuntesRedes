---
title: U10 — NAT y acceso a Internet
description: Internet no funciona otra vez 🌐
---

<p><small>Internet no funciona otra vez 🌐</small></p>

> 🗺️ **Ruta del paquete:** 🏠 Origen → 📦 Encapsulado → 🔌 Cable → 🏷️ IP → 🌍 IPv6 → 🔀 Switch → 🏢 VLAN → 🧭 Router → 🗣️ OSPF → 🌐 **NAT** → 🩺 Diagnóstico → ☁️ Cloud

---

*Una IP privada (192.168.1.10) no puede viajar por Internet. Las direcciones públicas son el único idioma que entiende la red global. Alguien debe traducir esa dirección para poder salir al mundo.*

Ese alguien es NAT. Y hoy vamos a entender cómo funciona, por qué existe y cómo configurarlo.

---

## 📚 Contenidos

- NAT: concepto, motivación y tipos
- NAT estático (1:1)
- NAT dinámico (pool)
- PAT (NAT de sobrecarga)
- NAT destino (port forwarding)
- Tabla NAT: entradas, timeouts, verificación
- ALGs para protocolos problemáticos (FTP, VoIP)
- Configuración NAT en router Cisco
- WiFi: estándares 802.11 n/ac/ax/be

---

## 🌐 ¿Qué es NAT?

**NAT** (Network Address Translation) traduce direcciones IP privadas de una LAN a una o más IPs públicas al salir a Internet.

### ¿Por qué existe NAT?

| Razón | Explicación |
|---|---|
| **Agotamiento de IPv4** | No hay suficientes IPs públicas. NAT permite que muchas IPs privadas compartan una pública |
| **Seguridad aparente** | Los dispositivos internos no son visibles directamente desde Internet |
| **Flexibilidad** | Puedes cambiar de ISP sin reconfigurar toda la LAN |

### Tipos de NAT

| Tipo | Descripción | Uso |
|---|---|---|
| **NAT estático** | 1 IP privada ↔ 1 IP pública (fijo) | Servidores accesibles desde fuera |
| **NAT dinámico** | Pool de IPs públicas, asignación dinámica | Varias IPs públicas disponibles |
| **PAT (NAT overload)** | Muchas IPs privadas ↔ 1 IP pública (diferentes puertos) | El método más común |
| **NAT destino** | Puerto público ↔ IP:puerto privado (port forwarding) | Exponer servicios internos |

---

## 🔧 Configuración NAT en Cisco

### PAT (NAT de sobrecarga)

```bash
R1(config)# ip nat inside source list 1 interface g0/1 overload
R1(config)# access-list 1 permit 192.168.1.0 0.0.0.255
R1(config)# interface g0/0
R1(config-if)# ip nat inside
R1(config)# interface g0/1
R1(config-if)# ip nat outside
```

### NAT estático

```bash
R1(config)# ip nat inside source static 192.168.1.10 83.45.12.78
R1(config)# interface g0/0
R1(config-if)# ip nat inside
R1(config)# interface g0/1
R1(config-if)# ip nat outside
```

### NAT destino (port forwarding)

```bash
R1(config)# ip nat inside source static tcp 192.168.1.10 80 83.45.12.78 80
R1(config)# ip nat inside source static tcp 192.168.1.10 443 83.45.12.78 443
```

### Verificación

```bash
R1# show ip nat translations          → Tabla NAT activa
R1# show ip nat statistics            → Estadísticas NAT
R1# clear ip nat translation *        → Borrar todas las traducciones
R1# debug ip nat                     → Ver traducciones en tiempo real
```

### Tabla NAT

Cuando un PC (192.168.1.10:54321) accede a Google (8.8.8.8:80):

```
Pro Inside global      Inside local       Outside local      Outside global
tcp 83.45.12.78:60001  192.168.1.10:54321  8.8.8.8:80         8.8.8.8:80
```

- **Inside local:** IP real del PC en la LAN
- **Inside global:** IP pública traducida
- **Outside local:** IP destino (tal como la ve el PC)
- **Outside global:** IP destino real

---

## ⚠️ Problemas con NAT

NAT rompe el principio de **extremo a extremo** de Internet. Problemas típicos:

| Aplicación | Problema | Solución |
|---|---|---|
| **FTP activo** | El servidor intenta conectar al cliente por un puerto, pero NAT no sabe a quién | ALG FTP en el router, o FTP pasivo |
| **VoIP/SIP** | Las IPs en el payload del protocolo no se traducen | ALG SIP, STUN, TURN |
| **P2P/Juegos** | Necesitan puertos abiertos dinámicamente | UPnP, NAT-PMP, port forwarding manual |
| **VPN** | IPsec no pasa NAT sin configuración especial | NAT-T (NAT Traversal) |

---

## ⭐ Sé el NAT

> *Eres el router con NAT. Te llega un paquete de 192.168.1.10:54321 hacia 8.8.8.8:53 (DNS). Tu IP pública es 83.45.12.78.*

**¿Qué haces?**

1. **Cambias IP origen 192.168.1.10 → 83.45.12.78.** Cambias puerto 54321 → 60001 (nuevo). Guardas la traducción en la tabla NAT.
2. El paquete viaja a 8.8.8.8 con origen 83.45.12.78:60001.
3. Cuando 8.8.8.8 responde a 83.45.12.78:60001, consultas la tabla NAT.
4. Traduces de vuelta: destino 83.45.12.78:60001 → 192.168.1.10:54321.
5. Reenvías a la LAN.

**¿Y si otro PC (192.168.1.20) también usa el puerto 54321?** PAT asigna otro puerto (60002). Así múltiples IPs privadas comparten una IP pública.

---

## 🔥 Fireside Chat: NAT vs No NAT

> *Un router con NAT y un router sin NAT debaten en una conferencia.*

**Con NAT:** — Tengo 200 empleados con IPs privadas. Todos salen a Internet por mi única IP pública. Ahorro, seguridad, flexibilidad.

**Sin NAT:** — Cada dispositivo tiene su IP pública. Fin a extremo real. Sin traducciones. Sin tablas. Puro IPv6.

**Con NAT:** — IPv6 no llega a todas partes. Mientras tanto, NAT es necesario.

**Sin NAT:** — NAT rompe la filosofía de Internet. Extremo a extremo. Aplicaciones P2P, VoIP... todo sufre con NAT.

**Con NAT:** — Para eso está UPnP, STUN, ICE... nos adaptamos.

**Sin NAT:** — *Sonríe* En 10 años, IPv6 habrá matado a NAT. Y no me harás falta.

**Con NAT:** — Ya llevas 20 años diciendo eso.

---

## 🕵️ ¿Quién Soy?

1. Traduzco una IP privada a una IP pública. Todos los PC comparten la misma IP pública con diferentes puertos.

2. Traduzco siempre la misma IP privada a la misma IP pública. Útil para servidores.

3. Traduzco tráfico entrante de un puerto público a un servidor interno.

4. Soy el estándar WiFi más común hoy en día. 2.4 GHz, 5 GHz, hasta 1.3 Gbps.

5. Soy el protocolo que abre puertos automáticamente en el router. Cómodo pero inseguro.

<details>
<summary>🔄 Respuestas</summary>

1. **PAT** (Port Address Translation) — NAT de sobrecarga.
2. **NAT estático** — Asignación fija 1 a 1.
3. **NAT destino** (o port forwarding) — Redirige puertos a servidores internos.
4. **802.11ac** (WiFi 5).
5. **UPnP** — Universal Plug and Play.

</details>

---

## 🤬 CONRAD VS EL MUNDO: "He abierto un puerto pero no funciona"

**CONRAD:** — "Clásico. Abres el puerto 80 en NAT para que tu servidor web sea accesible desde fuera. Pero: 1) El firewall del router tiene el puerto cerrado. 2) El firewall del Windows tiene el puerto cerrado. 3) El servicio web no corre en el PC destino. 4) La IP del PC destino cambió por DHCP. 4 problemas, ninguna solución."

**CONRAD:** — "Y luego: *es que he abierto el puerto, ¿por qué no funciona?* — Pues porque el Windows Firewall lo bloquea. Y porque la IP privada del servidor ha cambiado. Y porque el router tiene otro firewall. Diagnóstico: `telnet IP_PUBLICA 80` desde fuera. Si no responde, revisa los 4 puntos."

---

## ⚡ Laboratorio de Tortura: Configuración NAT

> **Duración:** 1 hora
> **Herramienta:** Packet Tracer

**Escenario:**
- Router con IP pública (203.0.113.1) y IP privada (192.168.1.1)
- LAN con 3 PCs (192.168.1.10, .20, .30)
- Servidor web interno en 192.168.1.10:80

**Tareas:**
1. Configura PAT para que los 3 PCs salgan a Internet.
2. Verifica con `show ip nat translations`.
3. Configura NAT estático para que el servidor web sea accesible desde fuera (puerto 80 público → 192.168.1.10:80).
4. Borra las traducciones NAT con `clear ip nat translation *`.

**Fallo intencionado:** Olvida `ip nat inside` en la interfaz LAN y `ip nat outside` en la WAN. ¿Funciona NAT? No. NAT necesita saber qué interfaces son inside y outside. Sin esa configuración, el router no sabe qué tráfico traducir.

---

## 🏆 Logros de esta unidad

| Logro | Cómo conseguirlo |
|---|---|
| 🏅 **PAT Master** | Configurar PAT y verificar que 3 PCs comparten la IP pública |
| 🏅 **Port Forwarder** | Exponer un servidor web interno a Internet con NAT destino |
| 🏅 **NAT Troubleshooter** | Diagnosticar por qué NAT no funciona (inside/outside mal configurado) |
| 🏅 **NAT Table Reader** | Leer e interpretar la tabla NAT (`show ip nat translations`) |

---

## 🧠 Atrévete a Pensar

1. ¿Cuántas IPs públicas necesitas para que 500 empleados salgan a Internet con PAT?
2. ¿Qué problema tiene NAT con aplicaciones que usan IPs en los datos (como FTP o VoIP)?
3. ¿Qué es UPnP? ¿Por qué es peligroso tenerlo activado?
4. ¿Cuál es la diferencia entre NAT y PAT?
5. ¿Qué pasa si la tabla NAT se llena? ¿Cuántas entradas puede tener?

<details>
<summary>💡 Soluciones</summary>

1. **Una sola.** PAT permite que todos compartan una IP pública usando diferentes puertos.
2. NAT no traduce IPs dentro del payload de la aplicación. FTP, VoIP y juegos online pueden fallar. Para eso están **ALGs** (Application Layer Gateways).
3. **UPnP** permite que dispositivos abran puertos automáticamente. Es cómodo pero inseguro: cualquier programa malicioso puede abrir puertos sin que lo sepas.
4. **NAT** traduce IPs (1 a 1 o muchos a pocos). **PAT** es un tipo de NAT que también traduce puertos, permitiendo que muchas IPs compartan una sola IP pública.
5. La tabla NAT tiene un límite (depende del router, típicamente miles de entradas). Cuando se llena, los nuevos paquetes se descartan hasta que expiren entradas antiguas (timeout típico 24h para UDP, variable para TCP).

</details>

---

## 🧩 Crucigrama de Bits

```
Horizontal:
1. Técnica que permite a múltiples IPs compartir una IP pública (3 letras)
4. Estándar WiFi de 6 GHz (3+2 caracteres)
5. Red privada virtual (3 letras)
7. Técnica de traducción 1 a 1 fija (4+7 letras, 2 palabras)
8. Comando que muestra la tabla NAT (3+3+11 letras, 3 palabras)

Vertical:
2. Técnica de traducción 1 a 1 fija (4+7 letras, 2 palabras)
3. Protocolo que abre puertos automáticamente (4 letras)
6. Interfaz que mira a la LAN en NAT (5 letras)
```

<details>
<summary>📝 Soluciones</summary>

**Horizontal:** 1. PAT, 4. 6E, 5. VPN, 8. SHOWIPNATTRANSLATIONS
**Vertical:** 2. NATESTATICO, 3. UPnP, 6. INSIDE

</details>

---

## 💬 Preguntas de Entrevista de Trabajo

1. **"Explica cómo NAT permite que 500 empleados salgan a Internet con una sola IP pública."**
2. **"Configura PAT en un router Cisco."**
3. **"¿Qué es port forwarding? ¿Para qué sirve?"**
4. **"¿Problemas de NAT con aplicaciones? ¿Cómo se solucionan?"**
5. **"¿Cuál es la diferencia entre NAT estático, dinámico y PAT?"**

---

## 🤷 No hay preguntas tontas

> ❓ **¿Cómo sabe NAT a qué dispositivo interno debe enviar el tráfico de respuesta?**

NAT mantiene una tabla de traducción que asocia cada conexión saliente (IP privada + puerto origen) con una combinación de IP pública y puerto efímero. Cuando el tráfico de respuesta llega al router NAT, este consulta la tabla para reemplazar la IP pública de destino por la IP privada correspondiente y reenviar el paquete al dispositivo correcto. Sin esta tabla, no sería posible la traducción inversa.

---

> ❓ **¿NAT es seguro?**

NAT no es un firewall, pero da una falsa sensación de seguridad. Los dispositivos internos no son directamente accesibles desde fuera a menos que se abran puertos explícitamente. Sin embargo, un atacante puede usar técnicas como UPnP, NAT traversal o simplemente esperar a que un usuario interno inicie una conexión para secuestrarla.

---

> ❓ **¿Cuántas conexiones puede manejar PAT simultáneamente?**

Depende del router y del tiempo de expiración. Teóricamente, con 65535 puertos disponibles por IP pública, PAT puede manejar hasta ~65000 conexiones simultáneas. En la práctica, los routers domésticos manejan unos pocos miles antes de saturarse.

---

## 🎬 Post-Créditos

> *Un paquete con IP privada sale a Internet. Atraviesa NAT, cruza routers, pasa por múltiples sistemas autónomos.*

*Al llegar a un firewall de perímetro, el paquete es inspeccionado.*

**Firewall:** — Documentación, por favor. IP de origen no registrada. Puerto no autorizado. Protocolo no especificado en las políticas de seguridad.

*El paquete es descartado por falta de reglas de acceso.*

**PRÓXIMAMENTE EN U11:** *Troubleshooting y monitorización. Wireshark, SNMP, y la habilidad más importante: saber por qué algo no funciona.*

---

## ✅ Criterios de evaluación cubiertos

**RA7: Conecta redes privadas a redes públicas.**

| Criterio | Cubierto |
|---|---|
| a) Ventajas e inconvenientes de NAT | ✅ Teoría + Fireside Chat |
| b) NAT estático | ✅ Configuración |
| c) NAT dinámico/PAT | ✅ Laboratorio |
| d) Port forwarding | ✅ NAT destino |
| e) WiFi vs WiMax | ✅ Estándares 802.11 |
