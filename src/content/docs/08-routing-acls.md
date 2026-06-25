---
title: U08 — Routing y ACLs
description: El GPS perdido 🧭
---

<p><small>El GPS perdido 🧭</small></p>

> 🗺️ **Ruta del paquete:** 🏠 Origen → 📦 Encapsulado → 🔌 Cable → 🏷️ IP → 🌍 IPv6 → 🔀 Switch → 🏢 VLAN → 🧭 **ROUTER** → 🗣️ OSPF → 🌐 NAT → 🩺 Diagnóstico → ☁️ Cloud

---

*Un paquete de datos necesita atravesar redes hasta llegar a su destino en otra ubicación. Sin un router que determine la ruta adecuada, el paquete no puede ser reenviado. El router es el dispositivo responsable de tomar estas decisiones de encaminamiento.*

Los routers son los que toman decisiones. Y las ACLs son las reglas que les decimos para que dejen pasar a unos y bloqueen a otros.

---

## 📚 Contenidos

- Componentes del router (CPU, RAM, NVRAM, Flash, ROM, IOS)
- Secuencia de arranque del router
- Configuración básica: hostname, interfaces, passwords, banners
- Rutas estáticas: `ip route`
- Ruta por defecto (default route)
- ACLs estándar (1-99, 1300-1999) y extendida (100-199, 2000-2699)
- ACLs numeradas vs nombradas
- Aplicación de ACLs a interfaces (inbound vs outbound)
- Regla implícita deny any
- Verificación y troubleshooting de ACLs

---

## 🖥️ Componentes del router

| Componente | Tipo | Descripción |
|---|---|---|
| **CPU** | Procesador | Ejecuta el IOS, procesa paquetes (en routers modernos, el routing se hace en hardware) |
| **RAM** | Volátil | Almacena tabla de rutas, tabla ARP, configuración en ejecución, buffers de paquetes |
| **NVRAM** | No volátil | Almacena la configuración de arranque (startup-config) |
| **Flash** | No volátil | Almacena el IOS (sistema operativo) |
| **ROM** | Solo lectura | Contiene el monitor ROM (ROMMON) para recuperación de emergencias |
| **Interfaces** | E/S | Puertos físicos (GigabitEthernet, Serial, FastEthernet) |

### Secuencia de arranque

1. **POST** (Power-On Self Test): Verifica hardware básico
2. **Boot ROM:** Carga el monitor ROM (ROMMON) si es necesario
3. **Carga del IOS:** Busca IOS en Flash (o por TFTP si no hay)
4. **Carga de configuración:** Busca startup-config en NVRAM (o entra en setup mode si no hay)

```
Router# show version          → Muestra IOS, uptime, memoria
Router# show running-config   → Configuración actual activa
Router# show startup-config   → Configuración guardada
```

---

## 🔧 Configuración básica del router

### Modos CLI

| Modo | Prompt | Comando |
|---|---|---|
| Usuario | `Router>` | Acceso limitado |
| Privilegiado | `Router#` | `enable` |
| Configuración global | `Router(config)#` | `configure terminal` |
| Configuración de interfaz | `Router(config-if)#` | `interface g0/0` |
| Configuración de línea | `Router(config-line)#` | `line console 0` |

### Configuración mínima

```bash
Router> enable
Router# configure terminal
Router(config)# hostname R1
R1(config)# enable secret MiClaveSegura

R1(config)# line console 0
R1(config-line)# password consola123
R1(config-line)# login
R1(config-line)# exit

R1(config)# line vty 0 4
R1(config-line)# password ssh123
R1(config-line)# login
R1(config-line)# transport input ssh

R1(config)# interface gigabitethernet 0/0
R1(config-if)# ip address 192.168.1.1 255.255.255.0
R1(config-if)# no shutdown
R1(config-if)# description LAN Oficina

R1(config)# interface gigabitethernet 0/1
R1(config-if)# ip address 10.0.0.1 255.255.255.252
R1(config-if)# no shutdown
R1(config-if)# description WAN Enlace R1-R2

R1(config)# ip route 0.0.0.0 0.0.0.0 10.0.0.2
R1(config)# ip route 192.168.2.0 255.255.255.0 10.0.0.2
```

### Comandos de verificación

```bash
R1# show ip interface brief     → Resumen de interfaces (IP, estado)
R1# show ip route               → Tabla de rutas
R1# show interfaces             → Estadísticas detalladas
R1# ping 192.168.2.1            → Prueba conectividad
R1# traceroute 8.8.8.8          → Traza la ruta hasta el destino
```

---

## 🗺️ Rutas estáticas

Una **ruta estática** se configura manualmente. Es útil para redes pequeñas o enlaces específicos.

### Sintaxis

```bash
ip route {red_destino} {máscara} {siguiente_salto | interfaz_salida}
```

### Ejemplos prácticos

**Router R1** conecta LAN1 (192.168.1.0/24) y WAN (10.0.0.0/30)

```
R1 ──── 10.0.0.0/30 ──── R2 ──── Internet
 │                           │
192.168.1.0/24           192.168.2.0/24
```

```bash
# En R1
R1(config)# ip route 192.168.2.0 255.255.255.0 10.0.0.2
R1(config)# ip route 0.0.0.0 0.0.0.0 10.0.0.2  # Default

# En R2
R2(config)# ip route 192.168.1.0 255.255.255.0 10.0.0.1
R2(config)# ip route 0.0.0.0 0.0.0.0 serial 0/0/0  # hacia ISP
```

### Ruta por defecto

La ruta hacia **0.0.0.0/0** es la "ruta de último recurso". Todo el tráfico sin una ruta específica se envía por ella:

```bash
R1(config)# ip route 0.0.0.0 0.0.0.0 10.0.0.2
```

### Ruta flotante (floating static)

Combinación de ruta estática y dinámica: se usa una ruta estática con **distancia administrativa** mayor (por defecto 1) para que solo se active si falla la ruta dinámica:

```bash
R1(config)# ip route 0.0.0.0 0.0.0.0 10.0.0.2        # AD=1 (primaria)
R1(config)# ip route 0.0.0.0 0.0.0.0 10.0.1.2 5      # AD=5 (respaldo)
```

---

## 🛡️ ACLs — Access Control Lists

Las ACL son listas de reglas secuenciales que **permiten o deniegan** tráfico. Se aplican a interfaces (entrada o salida).

### Regla fundamental

> Al final de toda ACL hay un **deny any implícito**. Si ninguna línea coincide, el paquete se descarta.

### Tipos de ACL

| Tipo | Rango | Filtra por | Regla de colocación |
|---|---|---|---|
| **Estándar** | 1-99, 1300-1999 | IP origen | Lo más cerca posible del **destino** |
| **Extendida** | 100-199, 2000-2699 | Origen, destino, protocolo, puerto | Lo más cerca posible del **origen** |
| **Nombrada** | Nombre personalizado | Igual que extendida | Según el nombre |

### ACL estándar

```bash
R1(config)# access-list 10 permit 192.168.1.0 0.0.0.255
R1(config)# access-list 10 deny any                    # Opcional (ya implícito)
R1(config)# interface g0/1
R1(config-if)# ip access-group 10 out
```

**Wildcard:** La máscara wildcard es el inverso de la máscara de subred:
- `0.0.0.255` → coincide con los primeros 24 bits (como /24)
- `0.0.0.0` → coincide con una IP exacta (host)

### ACL extendida

```bash
R1(config)# access-list 101 permit tcp 192.168.1.0 0.0.0.255 host 8.8.8.8 eq 80
R1(config)# access-list 101 permit udp 192.168.1.0 0.0.0.255 any eq 53
R1(config)# access-list 101 deny ip any any
R1(config)# interface g0/1
R1(config-if)# ip access-group 101 out
```

**Sintaxis extendida:**
```
access-list [número] [permit|deny] [protocolo] [origen wildcard] [destino wildcard] [eq puerto]
```

### ACL nombrada

```bash
R1(config)# ip access-list extended BLOQUEAR_YOUTUBE
R1(config-ext-nacl)# deny tcp any host 173.194.0.0 eq 80
R1(config-ext-nacl)# deny tcp any host 173.194.0.0 eq 443
R1(config-ext-nacl)# permit ip any any
R1(config-ext-nacl)# exit
R1(config)# interface g0/1
R1(config-if)# ip access-group BLOQUEAR_YOUTUBE out
```

### Dónde aplicar la ACL

| Aplicación | Evalúa | Ejemplo |
|---|---|---|
| **Inbound** | Antes de enrutar | Filtrar tráfico que entra a una red |
| **Outbound** | Después de enrutar | Restringir qué sale de la red |

**Regla práctica:** Las ACL extendidas cerca del origen (ahorran ancho de banda). Las ACL estándar cerca del destino (no pueden filtrar por destino).

### Verificación

```bash
R1# show access-lists              → Todas las ACLs y contadores
R1# show access-lists 101          → ACL específica
R1# show ip interface g0/1         → ACLs aplicadas a la interfaz
R1# debug ip packet 101            → Debug de paquetes filtrados (usar con cuidado)
```

---

## ⭐ Sé el Router

> *Eres el Router1. Tienes 2 interfaces: G0/0 (192.168.1.1/24) y G0/1 (10.0.0.1/30). Te llega un paquete para 8.8.8.8.*

**¿Qué haces?**
1. **Consultas tu tabla de rutas** → ¿Hay ruta para 8.8.8.8?
2. **No hay ruta específica** → ¿Hay ruta por defecto (0.0.0.0/0)?
3. **Tampoco hay ruta por defecto** → Lo descartas. ICMP "Destination Net Unreachable".

**Lección:** Sin rutas, un router no es más que un switch caro.

---

## 🔥 Fireside Chat: Ruta Estática vs Ruta Dinámica

> *Dos rutas discuten en la tabla de routing.*

**Estática:** — Me configuran a mano. Sé fija, no cambio. Sin sorpresas.

**Dinámica:** — Yo aprendo automáticamente con mis vecinos. Si un enlace cae, me adapto. Tú te quedas obsoleta hasta que un humano te actualice.

**Estática:** — Soy predecible. En redes pequeñas, soy la mejor opción. Y no consumo ancho de banda con actualizaciones.

**Dinámica:** — En redes grandes, sin mí no funcionas. ¿Vas a configurar 200 rutas a mano en 50 routers? Buena suerte.

**Estática:** — Pero soy más segura. No dependo de nadie.

**Dinámica:** — Y yo converjo automáticamente cuando algo falla. Tú, estática, te quedas señalando a un destino que ya no existe.

---

## 🕵️ ¿Quién Soy?

1. Guardo la configuración de arranque del router. No pierdo datos al apagar.

2. Soy una ruta especial hacia 0.0.0.0/0. Atrapo todo el tráfico sin destino específico.

3. Soy una lista de condiciones que permiten o deniegan tráfico basado en IP origen.

4. Soy un tipo de ACL que filtra también por IP destino y puerto.

5. Soy un comando que muestra la tabla de rutas del router.

6. Soy la memoria donde se almacena el sistema operativo del router (IOS).

<details>
<summary>🔄 Respuestas</summary>

1. **NVRAM** — Memoria no volátil del router.
2. **Ruta por defecto** (Default route) — También llamada "ruta de último recurso".
3. **ACL estándar** — Filtra solo por IP origen.
4. **ACL extendida** — Filtra por origen, destino, puerto y protocolo.
5. **show ip route** — Muestra la tabla de rutas.
6. **Flash** — Almacena el IOS.

</details>

---

## 🤬 CONRAD VS EL MUNDO: "He configurado una ruta estática pero no funciona"

**CONRAD:** — "Revisa: 1) ¿Está bien la IP de destino? 2) ¿Está bien la máscara? 3) ¿La interfaz de salida existe y está activa? 4) ¿El siguiente salto es accesible? Normalmente fallo en el paso 3: la interfaz está administratively down. O en el paso 4: no hago ping al siguiente salto antes de configurar la ruta."

**CONRAD:** — "Y con las ACLs: *he puesto permit any y no funciona*. ¡CLARO! Porque el deny any implícito está al final. Si tu permit any está en la línea 10 pero tienes un deny en la línea 5, ¡no pasa nada!"

---

## ⚡ Laboratorio de Tortura: Rutas y ACLs

> **Duración:** 1.5 horas
> **Herramienta:** Packet Tracer

**Escenario:**
- Router1: conectado a LAN1 (192.168.1.0/24) y a Router2 por enlace serie (10.0.0.0/30)
- Router2: conectado a LAN2 (192.168.2.0/24) y a Internet (simulado como otro router)

**Tareas:**
1. Configura IPs en todas las interfaces y actívalas (`no shutdown`).
2. Configura rutas estáticas en ambos routers para que LAN1 y LAN2 se vean.
3. Configura ruta por defecto en Router2 hacia Internet.
4. Configura ACL estándar en Router1 que permita solo a 192.168.1.10 acceder a la LAN2.

**Fallo intencionado:** Configura la ruta estática con la máscara incorrecta (ej. /16 en lugar de /24). ¿Qué ocurre? La ruta apunta a una red más grande de lo debido: el router intentará enrutar tráfico que no debería, o no enrutará el tráfico correcto.

---

## 🏆 Logros de esta unidad

| Logro | Cómo conseguirlo |
|---|---|
| 🏅 **Static Route Pro** | Configurar rutas estáticas en 3 routers para que todas las LANs se vean |
| 🏅 **ACL Architect** | Diseñar e implementar una ACL extendida que permita HTTP pero bloquee SSH |
| 🏅 **Troubleshooter** | Diagnosticar por qué una ruta estática no funciona (interfaz down, máscara incorrecta, etc.) |
| 🏅 **Routing Table Reader** | Leer e interpretar la tabla de rutas de un router Cisco |

---

## 🧠 Atrévete a Pensar

1. ¿Cuántas rutas estáticas necesitas para conectar 3 routers en línea (cada uno con su LAN)?
2. ¿Qué orden se evalúan las ACLs? ¿Qué implica eso?
3. ¿Qué diferencia hay entre ACL estándar y extendida?
4. ¿Dónde se aplica una ACL: en la interfaz de entrada o de salida? ¿Cómo se decide?
5. ¿Qué es la distancia administrativa? ¿Para qué sirve?

<details>
<summary>💡 Soluciones</summary>

1. **Cada router necesita:** 1 ruta para cada LAN remota + 1 ruta por defecto. Para 3 routers: cada uno necesita rutas para las 2 LANs remotas (si no usas por defecto).
2. **Orden secuencial.** Se evalúa línea por línea. En cuanto una coincide, se ejecuta (permitir o denegar). Al final hay un `deny any` implícito.
3. **Estándar:** filtra solo por IP origen (números 1-99). **Extendida:** filtra por origen, destino, puerto, protocolo (números 100-199).
4. Depende. **Inbound:** el tráfico se evalúa antes de enrutarse. **Outbound:** después de enrutarse, antes de salir. Generalmente se aplican outbound para no afectar el routing.
5. **Distancia administrativa (AD):** mide la fiabilidad de una ruta. Rutas estáticas AD=1, OSPF AD=110, RIP AD=120. A menor AD, más preferida.

</details>

---

## 🧩 Crucigrama de Bits

```
Horizontal:
1. Ruta hacia 0.0.0.0/0 (7+6 letras, 2 palabras)
4. Memoria que guarda la configuración al apagar (6 letras)
5. ACL que permite filtrar por IP origen, destino y puerto (9 letras)
7. Protocolo que filtra una ACL extendida (3 letras)
8. Comando para guardar la configuración (5 letras)

Vertical:
2. Comando para ver la tabla de rutas (3+2+5 letras, 3 palabras)
3. Interfaz del router "administrativamente caída" (8 letras)
6. Rango de ACLs estándar (1-__) (2 dígitos)
```

<details>
<summary>📝 Soluciones</summary>

**Horizontal:** 1. DEFAULTRUTE, 4. NVRAM, 5. EXTENDIDA, 7. TCP, 8. WRITE
**Vertical:** 2. SHOWIPROUTE, 3. SHUTDOWN, 6. 99

</details>

---

## 💬 Preguntas de Entrevista de Trabajo

1. **"Configure un router con 2 interfaces, 2 rutas estáticas y una ruta por defecto."** (pregunta práctica)
2. **"¿Cuál es la diferencia entre una ACL estándar y una extendida?"**
3. **"¿Cómo harías para bloquear el acceso a YouTube en horario laboral?"** (ACL por horario)
4. **"¿Qué pasa si configuras ip route 0.0.0.0 0.0.0.0 sin una ruta específica?"**
5. **"Explica la diferencia entre una ACL inbound y outbound. ¿Cuál usarías para bloquear tráfico entrante a tu red?"**

---

## 🤷 No hay preguntas tontas

> ❓ **¿Cuál es la diferencia entre una ACL estándar y una ACL extendida?**

Una ACL estándar filtra el tráfico basándose únicamente en la dirección IP de origen, mientras que una ACL extendida permite filtrar por dirección IP de origen y destino, protocolo y puerto. Por esta razón, las ACL estándar se aplican lo más cerca posible del destino para no filtrar tráfico innecesariamente, y las ACL extendidas se colocan cerca del origen para descartar tráfico no deseado cuanto antes.

---

> ❓ **¿Qué es una wildcard mask?**

Es el inverso de la máscara de subred. `0.0.0.255` significa "coincide cualquier IP en los primeros 24 bits" (como /24). `0.0.0.0` significa "coincide solo esta IP exacta" (host). En las ACLs se usa para definir qué bits de la IP deben coincidir exactamente.

---

> ❓ **¿Por qué se dice que las ACLs tienen un deny any implícito al final?**

Porque si ninguna línea de la ACL coincide con el tráfico, el paquete se descarta automáticamente. Es una medida de seguridad: si no has permitido explícitamente algo, está denegado. Por eso, las ACLs deben tener al menos un `permit` al final si quieres permitir tráfico no explícito.

---

> ❓ **¿Las ACLs afectan el rendimiento del router?**

Sí. Cada paquete se evalúa contra las líneas de la ACL hasta encontrar una coincidencia. Cuantas más líneas tenga la ACL y más tráfico pase, más CPU consume. En routers modernos, el procesamiento de ACLs suele hacerse en hardware (ASIC), minimizando el impacto.

---

## 🎬 Post-Créditos

El router consulta su tabla de rutas y encuentra la ruta hacia el destino. Sin embargo, antes de reenviar el paquete, las ACLs aplicadas en la interfaz evalúan el tráfico. Si la IP origen no está autorizada según las reglas configuradas, el paquete es denegado. Las ACLs permiten un control granular sobre qué tráfico entra y sale de una red.

**PRÓXIMAMENTE EN U09:** Exploraremos el routing dinámico, donde los routers intercambian rutas automáticamente mediante protocolos como OSPF.

---

## ✅ Criterios de evaluación cubiertos

**RA4: Administra las funciones básicas de un router estableciendo opciones de configuración.**

| Criterio | Cubierto |
|---|---|
| a) LEDs del router | ✅ Teoría (componentes) |
| b) Acceso a configuración | ✅ CLI descrita |
| c) Secuencia de arranque | ✅ Componentes y arranque |
| d) Comandos de configuración | ✅ Laboratorio |
| f) Rutas estáticas | ✅ Laboratorio + teoría |
| i) Filtrado de tráfico (ACLs) | ✅ Laboratorio |
| j) Listas de control de acceso | ✅ ACLs estándar, extendida y nombrada |
