---
title: U06 — Switching y STP
description: El switch enfadado 😡
---

<p><small>El switch enfadado 😡</small></p>

> 🗺️ **Ruta del paquete:** 🏠 Origen → 📦 Encapsulado → 🔌 Cable → 🏷️ IP → 🌍 IPv6 → 🔀 **SWITCH** → 🏢 VLAN → 🧭 Router → 🗣️ OSPF → 🌐 NAT → 🩺 Diagnóstico → ☁️ Cloud

---

*Un paquete de datos llega a un switch, el dispositivo encargado de segmentar la red local. Los switches aprenden direcciones MAC, toman decisiones de reenvío y, si no se configuran correctamente, pueden generar bucles que colapsan la red.*

Los switches son el corazón de la red local. Aprenden, segmentan, y si los dejas sin STP, provocan tormentas de broadcast que destruyen civilizaciones.

---

## 📚 Contenidos

- Funcionamiento del switch: tabla MAC, aprendizaje, forwarding
- CAM table: cómo almacena y gestiona las direcciones MAC
- Diferencias entre hub, switch y router (repaso ampliado)
- Broadcast storms: por qué ocurren y cómo evitarlas
- Spanning Tree Protocol (STP): objetivo y funcionamiento
- BPDU, Root Bridge, puertos root, designados y bloqueados
- Estados STP: blocking, listening, learning, forwarding
- RSTP: evolución rápida
- Seguridad de puerto: MAC limit, sticky MAC, violaciones
- Configuración básica de switch Cisco

---

## 🔀 El switch: funcionamiento interno

Un switch opera en **capa 2** (Enlace). Su trabajo es reenviar tramas basándose en direcciones MAC. A diferencia del hub (que lo repite todo), el switch **aprende** y **segmenta**.

### Aprendizaje de MACs

Cuando una trama entra por un puerto, el switch registra:

1. **MAC origen** → la asocia al puerto de entrada
2. **Puerto** → para futuras tramas con ese destino

La tabla MAC (CAM table) se almacena en memoria de contenido direccionable (CAM):

```
Switch# show mac address-table
Vlan    Mac Address       Type        Ports
----    -----------       --------    -----
   1    0050.7966.6800    DYNAMIC     Fa0/1
   1    0050.7966.6801    DYNAMIC     Fa0/2
   1    00D0.BC96.1A01    DYNAMIC     Fa0/3
```

**Comportamiento del switch:**

| Situación | Acción |
|---|---|
| MAC destino conocida | Reenvía solo por el puerto correspondiente |
| MAC destino desconocida | Inunda (envía por todos los puertos excepto el de origen) |
| MAC destino = broadcast (FFFF.FFFF.FFFF) | Inunda por todos los puertos |
| MAC destino = multicast | Depende de IGMP snooping |

### CAM table vs tabla MAC

Técnicamente, la tabla MAC se almacena en **memoria CAM** (*Content-Addressable Memory*), un tipo especial de memoria que permite búsquedas muy rápidas. La CAM tiene un tamaño limitado (ej. 8000 entradas en switches pequeños). Si se llena, el switch empieza a inundar tráfico porque no puede almacenar nuevas MACs.

### Dominios de colisión y broadcast

- **Hub:** 1 dominio de colisión para todos los puertos
- **Switch:** 1 dominio de colisión por puerto
- **Router:** segmenta dominios de broadcast

```
Hub:    [PC1]─┐                  PC1 y PC2 NO pueden
              ├─[Hub]─[PC2]      hablar a la vez (colisión)
              
Switch: [PC1]─┐                  PC1 y PC2 SÍ pueden
              ├─[Switch]─[PC2]   hablar a la vez
```

---

## 🌪️ Tormentas de broadcast (Broadcast Storm)

Si hay un **bucle** en la red (ej. dos switches conectados por dos cables), una trama broadcast rebota infinitamente:

```
Switch A ──────── Switch B
    │                │
    └───────────────┘
         (segundo cable)
```

1. PC1 envía un ARP broadcast
2. Switch A lo recibe por puerto 1, lo inunda por el resto (incluyendo el puerto 2 hacia Switch B)
3. Switch B lo recibe, lo inunda por todos sus puertos (incluyendo el otro cable hacia Switch A)
4. Switch A lo recibe de nuevo... ¡y vuelta a empezar!
5. La red se satura en segundos. LEDs parpadean como discoteca.

**Solución:** **STP** (Spanning Tree Protocol).

---

## 🌳 STP — Spanning Tree Protocol (IEEE 802.1D)

STP detecta bucles y **bloquea puertos** para romperlos, manteniendo un único camino activo. Si un enlace activo falla, STP desbloquea el de respaldo automáticamente.

### BPDU — Bridge Protocol Data Unit

Los switches intercambian **BPDUs** cada 2 segundos para compartir información sobre la topología. Una BPDU contiene:

- **Bridge ID:** Prioridad (2 bytes) + MAC (6 bytes)
- **Root Bridge ID:** ID del switch que creen que es la raíz
- **Coste del camino** hacia el Root Bridge
- **Temporizadores:** Hello, Max Age, Forward Delay

### Elección del Root Bridge

El switch con el **Bridge ID más bajo** se convierte en Root Bridge:

```
Bridge ID = Prioridad + MAC
Ejemplo:
  Switch A: Prioridad 32768, MAC 0011.2233.4400 → ID = 32768.0011.2233.4400
  Switch B: Prioridad 28672, MAC 0011.2233.4401 → ID = 28672.0011.2233.4401
  → ¡Switch B gana! (prioridad más baja)
```

Si las prioridades son iguales (por defecto 32768), gana el de **MAC más baja**.

### Puertos STP

Cada puerto en la red STP tiene un **rol**:

| Rol | Descripción |
|---|---|
| **Root Port (RP)** | El mejor puerto hacia el Root Bridge (cada switch no-root tiene 1) |
| **Designated Port (DP)** | El mejor puerto en cada segmento (1 por segmento) |
| **Alternate Port (AP)** | Puerto bloqueado que proporciona un camino alternativo al Root |
| **Backup Port (BP)** | Puerto bloqueado redundante (raro en redes típicas) |

### Estados STP

Un puerto STP pasa por estos estados:

| Estado | ¿Reenvía tráfico? | ¿Aprende MACs? | Tiempo |
|---|---|---|---|
| **Blocking** | No | No | 20s (Max Age) |
| **Listening** | No | No | 15s |
| **Learning** | No | Sí | 15s |
| **Forwarding** | Sí | Sí | Indefinido |
| **Disabled** | No | No | Administrativo |

**Tiempo total de convergencia STP:** 30-50 segundos. ¡Una eternidad en redes modernas!

### Comandos STP en Cisco

```bash
# Ver estado STP
Switch# show spanning-tree

# Cambiar prioridad (más baja = más probable de ser root)
Switch(config)# spanning-tree vlan 1 priority 4096

# Ver BPDUs recibidas
Switch# debug spanning-tree bpdu

# Configurar PortFast (para puertos de acceso, acelera convergencia)
Switch(config-if)# spanning-tree portfast
```

---

## ⚡ RSTP — Rapid Spanning Tree Protocol (IEEE 802.1w)

RSTP mejora STP con convergencia en **1-3 segundos** (vs 30-50s):

| Característica | STP (802.1D) | RSTP (802.1w) |
|---|---|---|
| Convergencia | 30-50 segundos | 1-3 segundos |
| Roles de puerto | Root, Designated, Blocked | Root, Designated, Alternate, Backup |
| Estados | 5 (Blocking, Listening, Learning, Forwarding, Disabled) | 3 (Discarding, Learning, Forwarding) |
| Tipos de enlace | No distingue | Edge (acceso), Point-to-Point, Shared |
| Propuesta/Acuerdo | No | Sí (handshake rápido) |

**PortFast:** En STP, un puerto de acceso (conectado a un PC, no a otro switch) puede configurarse con **PortFast** para saltar los estados Listening y Learning, pasando directamente a Forwarding.

```bash
# PortFast en puerto de acceso
Switch(config-if)# spanning-tree portfast
Switch(config-if)# spanning-tree bpduguard enable
```

> 💡 **BPDUGuard:** Si un puerto con PortFast recibe una BPDU, se deshabilita (errdisable). Esto evita que alguien conecte un switch no autorizado.

---

## 🔒 Port Security

La seguridad de puerto limita cuántas MACs pueden aprenderse en un puerto:

### Configuración básica

```bash
Switch(config-if)# switchport mode access
Switch(config-if)# switchport port-security
Switch(config-if)# switchport port-security maximum 2
Switch(config-if)# switchport port-security mac-address sticky
Switch(config-if)# switchport port-security violation shutdown
```

### Parámetros

| Parámetro | Descripción |
|---|---|
| `maximum` | Nº máximo de MACs permitidas (por defecto 1) |
| `mac-address sticky` | Aprende la MAC automáticamente y la guarda en la config |
| `violation shutdown` | Deshabilita el puerto si se supera el máximo |
| `violation restrict` | Descarta tráfico pero no deshabilita |
| `violation protect` | Descarta tráfico sin notificar |

### Verificación

```bash
Switch# show port-security
Switch# show port-security interface fa0/1
Switch# show mac address-table secure
```

---

## ⭐ Sé el Switch

> *Eres un switch Cisco de 24 puertos. Acaban de conectarte 5 PCs. Tu tabla MAC está vacía.*

**Escenario:** Llega una trama por el puerto 1 con MAC origen AA:AA:AA:AA:AA:AA y MAC destino BB:BB:BB:BB:BB:BB.

**¿Qué haces?**

1. **Aprendes que AA:AA:AA:AA:AA:AA está en el puerto 1. Buscas BB:BB:BB:BB:BB:BB en tu tabla. No está. Reenvías la trama por todos los puertos excepto el 1.** → ✅ Exacto. Así aprenden los switches.
2. **La descartas porque no conoces la MAC destino** → ❌ Un switch inunda cuando no conoce la MAC destino. Eso es lo correcto.
3. **La reenvías solo al puerto 1** → ❌ No, la recibió por el 1, no la reenvía por el mismo puerto.

---

## 🔥 Fireside Chat: Hub vs Switch (la revancha)

> *Se encuentran en un armario de comunicaciones abandonado.*

**Hub:** — Todavía me usan en algunos sitios. Para monitorización de tráfico, soy útil: como repito todo, ves todo el tráfico.

**Switch:** — Técnicamente tienes razón. Los puertos SPAN (port mirroring) hacen lo mismo sin necesidad de ti. Y además, conmigo no pierdes rendimiento.

**Hub:** — Pero soy más barato...

**Switch:** — *Se ríe* ¿Todavía con esa? Un switch de 24 puertos cuesta 30€. En serio, solo te usan en museos.

**Hub:** — Bueno, y en laboratorios de diagnóstico...

**Switch:** — OK, te concedo eso. Y en redes OT (industrial) a veces. Pero en una LAN moderna, no pases por ahí.

---

## 🕵️ ¿Quién Soy?

1. Soy un protocolo que evita bucles en redes con switches. Bloqueo puertos para que no haya caminos redundantes activos.

2. Soy el switch que gana la elección de STP. Todos los demás se organizan alrededor de mí.

3. Soy una técnica de seguridad que limita cuántas MACs pueden aprenderse en un puerto.

4. Soy el estado de un puerto STP que no reenvía tráfico pero escucha BPDUs.

5. Soy la versión rápida de STP. Converjo en 1-3 segundos.

6. Soy la memoria donde el switch guarda las tablas MAC. Permito búsquedas ultrarrápidas.

<details>
<summary>🔄 Respuestas</summary>

1. **STP** (IEEE 802.1D) — Spanning Tree Protocol.
2. **Root Bridge** — El switch elegido como raíz del árbol.
3. **Port Security** — Limita MACs por puerto.
4. **Bloqueo (Blocking)** — Estado STP que previene bucles.
5. **RSTP** — Rapid Spanning Tree Protocol.
6. **Memoria CAM** — Content-Addressable Memory.

</details>

---

## 🤬 CONRAD VS EL MUNDO: "He conectado dos switches y la red ha muerto"

**CONRAD:** — Grito número 1 en mi carrera: "HE CREADO UN BUCLE". Conectas dos switches con DOS cables (por si acaso) y ¡pum! Tormenta de broadcast. La red se colapsa. PCs que no responden. Luces que parpadean como discoteca.

**CONRAD:** — "Y luego: *es que puse dos cables para redundancia*. ¡REDUNDANCIA CON STP! No sin. Si pones dos cables sin STP, creas un bucle. Los paquetes rebotan entre switches hasta saturar la CPU y el ancho de banda. Y el usuario: *Ay, pues no sabía*."

**La solución:** STP. Actívalo siempre. Si tienes enlaces redundantes, STP bloquea los que sobran para evitar bucles. Y si un cable falla, STP desbloquea el de respaldo.

---

## ⚡ Laboratorio de Tortura: Bucles y STP

> **Duración:** 1 hora
> **Herramienta:** Packet Tracer

**Escenario:**
1. Conecta 3 switches en triángulo (Switch1-Switch2, Switch2-Switch3, Switch3-Switch1).
2. Conecta un PC a cada switch.
3. Activa STP (por defecto está en muchos switches).

**Tareas:**
a) ¿Cuál es el Root Bridge? (pista: el de menor Bridge ID)
b) ¿Qué puertos están bloqueados?
c) Desconecta el cable entre Root Bridge y otro switch. ¿Qué pasa? (convergencia)
d) Cambia la prioridad de un switch para forzarlo como Root Bridge:
   ```
   Switch(config)# spanning-tree vlan 1 priority 4096
   ```
e) Verifica con `show spanning-tree` el cambio.

**Fallo intencionado:** Desactiva STP en todos los switches con `no spanning-tree vlan 1` y haz un ping continuo entre PCs. Verás cómo el ping falla intermitentemente hasta que la tormenta de broadcast colapsa la red. Luego reactiva STP y observa la recuperación.

---

## 🏆 Logros de esta unidad

| Logro | Cómo conseguirlo |
|---|---|
| 🏅 **Bucle Breaker** | Configurar STP y demostrar que no hay tormenta de broadcast con enlaces redundantes |
| 🏅 **Root Bridge Master** | Forzar un switch específico como Root Bridge cambiando su prioridad |
| 🏅 **Port Security Pro** | Configurar un puerto para que acepte solo la MAC del PC conectado |
| 🏅 **STP Speedrun** | Explicar los 4 estados STP y el tiempo de cada uno sin apuntes |

---

## 🧠 Atrévete a Pensar

1. ¿Cuánto tarda STP en converger por defecto? ¿Y RSTP?
2. ¿Qué es Bridge ID? ¿Cómo se calcula?
3. ¿Por qué un switch inunda tramas con destino desconocido?
4. ¿Qué diferencia hay entre puerto Root y puerto Designado en STP?
5. ¿Qué pasa si conectas 2 switches con un solo cable y activas STP? ¿Y si conectas 3 cables?
6. ¿Qué ventaja tiene PortFast en un puerto de acceso?

<details>
<summary>💡 Soluciones</summary>

1. **STP: 30-50 segundos** (15s listening + 15s learning + 20s max age). **RSTP: 1-3 segundos**.
2. **Bridge ID** = Prioridad (2 bytes) + MAC del switch (6 bytes). A menor Bridge ID, más posibilidades de ser root.
3. Porque no sabe por dónde está el destino. Inundar garantiza que llegue. Es mejor que descartar.
4. **Root Port**: el mejor puerto hacia el Root Bridge (cada switch no-root tiene 1). **Designated Port**: el mejor puerto en cada segmento (1 por segmento).
5. Con **1 cable** no hay bucle (topología lineal). Con **3 cables** STP bloquea los necesarios para romper el bucle, dejando solo un camino activo.
6. PortFast permite que el puerto pase directamente a forwarding sin esperar 30 segundos de listening+learning. Esencial en puertos de acceso para que los PCs obtengan IP rápidamente.

</details>

---

## 🧩 Crucigrama de Bits

```
Horizontal:
3. Estado STP donde el puerto aprende MACs pero no reenvía datos (8 letras)
4. Protocolo que evita bucles en switches (3 letras)
5. Versión rápida de STP (4 letras)
7. Medida en segundos que tarda un puerto STP en pasar a forwarding sin PortFast (2 dígitos)
8. Acción de enviar una trama por todos los puertos menos el origen (7 letras)

Vertical:
1. Switch elegido como referencia en STP (4+5 letras, 2 palabras)
2. Trama de control de STP (4 letras)
6. Tipo de memoria para búsquedas rápidas de MACs (3 letras)
```

<details>
<summary>📝 Soluciones</summary>

**Horizontal:** 3. LEARNING, 4. STP, 5. RSTP, 7. 30, 8. INUNDAR
**Vertical:** 1. ROOTBRIDGE, 2. BPDU, 6. CAM

</details>

---

## 💬 Preguntas de Entrevista de Trabajo

1. **"¿Qué pasa si conectas dos switches con dos cables sin STP?"**
2. **"Explica cómo elige STP el Root Bridge."**
3. **"¿Cuál es la diferencia entre STP y RSTP?"**
4. **"Configura la seguridad de puerto para que solo la MAC del PC del jefe pueda conectarse."**
5. **"¿Cómo funciona el proceso de aprendizaje de un switch? ¿Qué hace cuando llega una trama con destino desconocido?"**
6. **"¿Cuánto tarda STP en converger? ¿Por qué es un problema?"**

---

## 🤷 No hay preguntas tontas

> ❓ **¿Por qué los switches tienen nombres tan genéricos como Switch0 o Switch1?**

En entornos de simulación como Packet Tracer, los switches reciben nombres genéricos por defecto porque son dispositivos de referencia sin configuración previa. En redes reales, los administradores asignan nombres descriptivos —como SW-OFICINA-01 o SW-PLANTA-BAJA— siguiendo un estándar de nomenclatura (hostname) que facilita la identificación del dispositivo, su ubicación y su función dentro de la infraestructura de red.

---

> ❓ **¿Y si enciendo un switch sin configurar nada, funciona?**

Sí, un switch Cisco sin configurar funciona "out of the box": todos los puertos están en VLAN 1, STP está activo, y el switch empieza a aprender MACs automáticamente. Para una red pequeña, enchufar y listo. Para una red corporativa, necesitarás configurar VLANs, port security, SNMP, y más.

---

> ❓ **¿Puedo deshabilitar STP para que la red vaya más rápido?**

Nunca. Sin STP, cualquier bucle (accidental o no) colapsará la red. Si quieres más velocidad, usa RSTP (converge en 1-3 segundos) en lugar de STP clásico (30-50 segundos). Pero nunca lo deshabilites en una red con más de un switch.

---

> ❓ **¿Qué es errdisable?**

En switches Cisco, **errdisable** es un estado en el que el switch deshabilita automáticamente un puerto cuando detecta una condición de error (BPDUGuard, Port Security violation, etc.). Para recuperar el puerto: `shutdown` + `no shutdown` o configurar `errdisable recovery`.

---

## 🎬 Post-Créditos

Con STP activo, la red elige un Root Bridge y los switches restantes bloquean los puertos redundantes para prevenir bucles. La red permanece estable incluso con enlaces redundantes. Sin embargo, si un administrador conecta un cable adicional entre dos switches ya enlazados, STP detecta el bucle potencial y bloquea el puerto correspondiente, evitando la temida tormenta de broadcast.

**PRÓXIMAMENTE EN U07:** La oficina está dividida en departamentos. Aprenderemos VLANs para separar tráfico de forma lógica sin necesidad de añadir más switches.

---

## ✅ Criterios de evaluación cubiertos

**RA3: Administra conmutadores estableciendo opciones de configuración para su integración en la red.**

| Criterio | Cubierto |
|---|---|
| a) Conexión de conmutadores | ✅ Laboratorio |
| e) Tabla de direcciones MAC | ✅ CAM table, aprendizaje |
| i) Spanning Tree Protocol | ✅ STP, RSTP, BPDU, estados |
| j) Parámetros de selección del puente raíz | ✅ Prioridad, Bridge ID |
| k) Seguridad en conmutadores | ✅ Port Security, BPDUGuard |
