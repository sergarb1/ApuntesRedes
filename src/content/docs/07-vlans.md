---
title: U07 — VLANs
description: La oficina dividida 🏢
---

<p><small>La oficina dividida 🏢</small></p>

> 🗺️ **Ruta del paquete:** 🏠 Origen → 📦 Encapsulado → 🔌 Cable → 🏷️ IP → 🌍 IPv6 → 🔀 Switch → 🏢 **VLAN** → 🧭 Router → 🗣️ OSPF → 🌐 NAT → 🩺 Diagnóstico → ☁️ Cloud

---

*La empresa crece. Ventas no debe ver el tráfico de RRHH. IT no debe mezclarse con Dirección. Pero todos comparten los mismos switches. ¿Solución? VLANs: redes virtuales dentro del mismo hardware.*

Es como tener varios switches dentro de uno solo. La magia de la segmentación lógica.

---

## 📚 Contenidos

- ¿Qué es una VLAN? Motivación y ventajas
- Tipos de VLAN: estática, dinámica, nativa, de voz
- Enlaces troncales (trunks) y 802.1Q (etiquetado)
- Native VLAN y VLAN de voz
- Inter-VLAN routing (router-on-a-stick)
- VTP (VLAN Trunking Protocol) modos
- DTP (Dynamic Trunking Protocol)
- Seguridad en VLANs: VACL, PVLAN
- Configuración en Packet Tracer

---

## 🏢 ¿Qué es una VLAN?

Una **VLAN** (Virtual Local Area Network) es una red lógica creada dentro de un switch físico. Los dispositivos en la misma VLAN se comportan como si estuvieran en el mismo switch (o misma red), aunque estén en switches diferentes.

### Ventajas

| Ventaja | Descripción |
|---|---|
| **Segmentación** | Separa tráfico de diferentes departamentos sin switches adicionales |
| **Reducción de broadcast** | Cada VLAN tiene su propio dominio de broadcast |
| **Seguridad** | Los dispositivos de VLAN10 no ven el tráfico de VLAN20 |
| **Flexibilidad** | Un dispositivo puede estar en cualquier VLAN cambiando la configuración del puerto |
| **Rendimiento** | Menos tráfico broadcast = mejor rendimiento |

### VLAN por defecto

Todos los switches Cisco tienen **VLAN 1** por defecto. Todos los puertos están en VLAN 1 hasta que se configuren. Es buena práctica **no usar VLAN 1** para datos por seguridad.

### Tipos de VLAN

| Tipo | Descripción |
|---|---|
| **VLAN de datos** | Transporta tráfico de usuario (Ventas, RRHH, etc.) |
| **VLAN nativa** | VLAN sin etiquetar en el trunk (por defecto VLAN 1, configurable) |
| **VLAN de voz** | VLAN separada para teléfonos IP (prioridad QoS) |
| **VLAN de gestión** | VLAN para administrar el switch (SSH, SNMP) |

### VLAN estática vs dinámica

| Característica | Estática | Dinámica |
|---|---|---|
| Asignación | Puerto → VLAN (manual) | MAC → VLAN (automática vía VMPS) |
| Flexibilidad | Baja (cambiar el puerto cambia la VLAN) | Alta (el dispositivo mantiene su VLAN) |
| Administración | Simple para redes pequeñas | Compleja (requiere servidor VMPS) |
| Uso típico | 90% de las implementaciones | Redes muy grandes con movilidad frecuente |

---

## 🔖 802.1Q: etiquetado VLAN

Cuando varias VLANs viajan por el mismo cable (trunk), es necesario **etiquetar** cada trama para saber a qué VLAN pertenece.

### Trama 802.1Q

```
┌─────────────────────────────────────────────────────────────┐
│ MAC Dest │ MAC Orig │ *802.1Q* │ EtherType │ Payload │ FCS │
└─────────────────────────────────────────────────────────────┘
                              │
                        4 bytes insertados:
                        ┌──────────────┬──────────────┐
                        │ TPID (0x8100)│  PRI  │ VLAN ID │
                        └──────────────┴───────┴─────────┘
                        2 bytes       3 bits  12 bits
```

- **TPID (Tag Protocol ID):** 0x8100 indica que es una trama etiquetada 802.1Q
- **PRI (Priority):** 3 bits para QoS (802.1p)
- **VLAN ID:** 12 bits → 4096 VLANs posibles (0-4095, reservadas 0 y 4095)

### Enlace troncal (trunk)

Un **trunk** es un enlace que transporta tráfico de múltiples VLANs entre switches:

```
Switch A (puerto Fa0/24, trunk) ──── Switch B (puerto Fa0/24, trunk)
        │                                    │
   VLAN 10 (Ventas)                    VLAN 10 (Ventas)
   VLAN 20 (RRHH)                      VLAN 20 (RRHH)
   VLAN 30 (IT)                        VLAN 30 (IT)
```

### Configuración de trunk

```bash
Switch1(config)# interface fa0/24
Switch1(config-if)# switchport mode trunk
Switch1(config-if)# switchport trunk native vlan 99
Switch1(config-if)# switchport trunk allowed vlan 10,20,30
```

### Native VLAN

La **native VLAN** es la única VLAN que **no se etiqueta** en el trunk. Por defecto es VLAN 1. Los dos extremos del trunk deben tener la **misma native VLAN**, o habrá problemas.

> ⚠️ **Problema común:** Si un extremo tiene native VLAN 1 y el otro native VLAN 99, las tramas sin etiquetar de un extremo se interpretarán como VLAN diferente en el otro, causando errores de conectividad.

---

## 🔄 Inter-VLAN routing

Las VLANs aíslan en capa 2. Para que dispositivos de diferentes VLANs se comuniquen, necesitan un **router** (o un switch multicapa que haga routing).

### Router-on-a-stick

Un router con una sola interfaz física atiende múltiples VLANs usando **subinterfaces**:

```
Router Fa0/0.10 → VLAN 10 (192.168.10.1/24)
Router Fa0/0.20 → VLAN 20 (192.168.20.1/24)
Router Fa0/0.30 → VLAN 30 (192.168.30.1/24)
         │
      [Trunk 802.1Q]
         │
      [Switch]
```

### Configuración router-on-a-stick

```bash
Router(config)# interface fa0/0
Router(config-if)# no shutdown

Router(config)# interface fa0/0.10
Router(config-subif)# encapsulation dot1Q 10
Router(config-subif)# ip address 192.168.10.1 255.255.255.0

Router(config)# interface fa0/0.20
Router(config-subif)# encapsulation dot1Q 20
Router(config-subif)# ip address 192.168.20.1 255.255.255.0
```

### Switch multicapa (SVIs)

Un switch capa 3 (como Cisco 3560) puede hacer routing interno usando **SVIs** (Switch Virtual Interfaces):

```bash
Switch(config)# ip routing
Switch(config)# interface vlan 10
Switch(config-if)# ip address 192.168.10.1 255.255.255.0
Switch(config)# interface vlan 20
Switch(config-if)# ip address 192.168.20.1 255.255.255.0
```

**Ventaja:** El routing ocurre a velocidad de hardware (sin cuello de botella de una sola interfaz).

---

## 📡 VTP — VLAN Trunking Protocol

VTP distribuye la base de datos de VLANs entre switches automáticamente.

### Modos VTP

| Modo | Descripción |
|---|---|
| **Server** | Crea/modifica/elimina VLANs y las propaga |
| **Client** | Recibe VLANs del server, no puede crear/modificar |
| **Transparent** | No participa en VTP, pero reenvía anuncios |

⚠️ **Problema:** Si conectas un switch server con revision number más alto, puede **borrar todas las VLANs** de la red. Por eso, en redes modernas se recomienda **no usar VTP** o usar VTP version 3.

---

## 🔒 Seguridad en VLANs

### VACL (VLAN Access Control List)

Filtra tráfico dentro de una VLAN (no confundir con ACL de router):

```bash
Switch(config)# vlan access-map BLOQUEA 10
Switch(config-access-map)# match ip address 101
Switch(config-access-map)# action drop
Switch(config)# vlan filter BLOQUEA vlan-list 10
```

### PVLAN (Private VLAN)

Aísla puertos dentro de la misma VLAN. Útil en entornos ISP/dmz:

- **Promiscuous:** Puede hablar con todos
- **Isolated:** Solo habla con el promiscuous
- **Community:** Habla con su comunidad y el promiscuous

### DTP (Dynamic Trunking Protocol)

DTP negocia automáticamente si un puerto debe ser trunk o access. **Riesgo de seguridad:** un atacante podría negociar un trunk y acceder a todas las VLANs. Por seguridad, deshabilita DTP:

```bash
Switch(config-if)# switchport nonegotiate
```

---

## ⭐ Sé la VLAN

> *Eres la VLAN 10 (Ventas). En tu VLAN hay 20 PCs. En la VLAN 20 (RRHH) hay 15 PCs. Compartís el mismo switch físico, pero no os veis.*

**Escenario:** Un PC de Ventas (VLAN 10) quiere comunicarse con un PC de RRHH (VLAN 20).

1. **Pueden hacerlo directamente por el switch** → ❌ Falso. Las VLANs aíslan en capa 2. Necesitan un router.
2. **Necesitan un router o un switch capa 3** → ✅ Correcto. El tráfico entre VLANs necesita routing.
3. **Si configuras un trunk, se comunican** → No, el trunk sirve para transportar múltiples VLANs entre switches, no para inter-VLAN routing.

---

## 🔥 Fireside Chat: VLAN Estática vs VLAN Dinámica

> *Dos VLANs discuten en la sala de servidores.*

**Estática:** — Yo asigno puertos manualmente. Puerto 1-10 = VLAN 10. Simple, claro, predecible.

**Dinámica:** — Yo uso la MAC del dispositivo. Da igual dónde se conecte, siempre caerá en su VLAN. Más flexible.

**Estática:** — Flexible, dices. ¿Y cuando cambias la tarjeta de red? La MAC cambia y el dispositivo aparece en la VLAN incorrecta.

**Dinámica:** — Para eso están los servidores VMPS. Centralizas la asignación.

**Estática:** — Prefiero saber que si conecto un cable en el puerto 5, sé exactamente qué VLAN es. Sin sorpresas.

**Dinámica:** — Y cuando el usuario se muda de mesa... ¿vas a cambiar la VLAN del puerto manualmente?

**Estática:** — Bueno, para eso está el administrador de redes. Que para eso cobra.

---

## 🕵️ ¿Quién Soy?

1. Soy el protocolo que etiqueta las tramas con el número de VLAN en los enlaces troncales.

2. Soy un enlace que transporta tráfico de múltiples VLANs entre switches.

3. Soy una técnica donde un router con una sola interfaz física atiende múltiples VLANs usando subinterfaces.

4. Soy el protocolo que distribuye la base de datos de VLANs entre switches automáticamente.

5. Soy la VLAN que viaja sin etiquetar por el trunk. Por defecto soy la VLAN 1.

6. Soy un switch que puede enrutar entre VLANs sin necesidad de router externo.

<details>
<summary>🔄 Respuestas</summary>

1. **802.1Q** — Estándar de etiquetado VLAN.
2. **Trunk** — Enlace troncal.
3. **Router-on-a-stick** — Inter-VLAN routing con una interfaz.
4. **VTP** — VLAN Trunking Protocol.
5. **Native VLAN** — VLAN sin etiquetar en el trunk.
6. **Switch capa 3** (o switch multicapa).

</details>

---

## 🤬 CONRAD VS EL MUNDO: "He configurado VLANs y ahora nadie se ve"

**CONRAD:** — *Risa malvada.* Clásico. Configuras VLAN10 en el Switch1 y VLAN20 en el Switch2. Conectas los switches por un puerto normal (access). Los de VLAN10 no ven a los de VLAN20. ¡LÓGICO! Necesitas un TRUNK para que las VLANs viajen entre switches. Y no olvides el 802.1Q.

**CONRAD:** — "Y luego: *es que configuré el trunk y sigue sin funcionar*. ¿Seguro que los dos extremos tienen la misma native VLAN? ¿Seguro que permites las VLANs correctas en `allowed vlan`? ¡Ah! Y si tienes VTP, cuidado con el revision number. Que cuando borras todas las VLANs sin querer... acuérdate de mí."

---

## ⚡ Laboratorio de Tortura: Segmentación por departamentos

> **Duración:** 1 hora
> **Herramienta:** Packet Tracer

**Escenario:**
- Switch1: puertos 1-5 = VLAN 10 (Ventas), puertos 6-10 = VLAN 20 (RRHH)
- Switch2: puertos 1-5 = VLAN 10, puertos 6-10 = VLAN 20
- Conexión entre switches: trunk 802.1Q
- Router conectado al Switch1 para inter-VLAN routing (router-on-a-stick)

**Tareas:**
1. Configura las VLANs en ambos switches.
2. Configura el trunk entre switches.
3. Configura el router con subinterfaces (VLAN10 y VLAN20).
4. Verifica que PCs de distintas VLANs se vean (a través del router).

**Fallo intencionado:** Configura el trunk pero con native VLAN diferente en cada extremo (Switch1 native 99, Switch2 native 1). Verás que algunos paquetes se pierden o llegan a la VLAN incorrecta. El diagnóstico: `show interface trunk` muestra la discrepancia.

---

## 🏆 Logros de esta unidad

| Logro | Cómo conseguirlo |
|---|---|
| 🏅 **VLAN Architect** | Diseñar e implementar VLANs para 4 departamentos en Packet Tracer |
| 🏅 **Trunk Master** | Configurar un trunk 802.1Q y verificar con `show interface trunk` |
| 🏅 **Router-on-a-stick** | Configurar inter-VLAN routing con subinterfaces y verificar conectividad |
| 🏅 **Troubleshooter** | Diagnosticar y arreglar un problema de native VLAN mal configurada |

---

## 🧠 Atrévete a Pensar

1. ¿Cuántas VLANs puedes crear en un switch estándar? ¿Y cuántas VLANs pueden estar activas simultáneamente?
2. ¿Qué pasa si dos switches tienen la misma VLAN pero no hay trunk entre ellos?
3. ¿Por qué router-on-a-stick se llama así? ¿Qué alternativa hay?
4. ¿Cuándo usarías un switch capa 3 en lugar de router-on-a-stick?
5. ¿Qué riesgo de seguridad tiene VTP?

<details>
<summary>💡 Soluciones</summary>

1. **Hasta 4094 VLANs** (el estándar 802.1Q tiene 12 bits para VLAN ID). Pero los switches económicos soportan menos.
2. **No se comunicarán entre switches.** Los puertos access no transportan etiquetas VLAN. Necesitan un trunk.
3. Porque parece un "palo" (una sola interfaz física) con varias "pelotas" (subinterfaces) girando. Alternativa: switch capa 3 que hace routing internamente.
4. Cuando el tráfico entre VLANs es intenso. Un switch capa 3 hace routing a velocidad de hardware. El router-on-a-stick tiene el cuello de botella de una sola interfaz.
5. **VTP puede borrar toda la base de datos de VLANs.** Si conectas un switch con revision number más alto que el server actual, propagará su base de datos (posiblemente vacía) a toda la red.

</details>

---

## 🧩 Crucigrama de Bits

```
Horizontal:
1. Estándar de etiquetado VLAN (número + letra)
4. Enlace que transporta múltiples VLANs (5 letras)
5. Switch que puede enrutar entre VLANs (4+3 letras)
7. VLAN que no se etiqueta en el trunk (6 letras)
8. Comando para la native VLAN (6 letras)

Vertical:
2. Protocolo de administración centralizada de VLANs (3 letras)
3. Configuración router para inter-VLAN con una interfaz (4+2+4 letras, con guiones)
6. Bits del campo VLAN ID en 802.1Q (2 dígitos)
```

<details>
<summary>📝 Soluciones</summary>

**Horizontal:** 1. 8021Q, 4. TRUNK, 5. CAPA3, 7. NATIVE, 8. SWITCHPORT
**Vertical:** 2. VTP, 3. ROUTER-ON-A-STICK, 6. 12

</details>

---

## 💬 Preguntas de Entrevista de Trabajo

1. **"¿Cómo separarías el tráfico de dos departamentos que comparten el mismo switch?"**
2. **"Explica qué es un trunk y por qué es necesario."**
3. **"¿Cómo harías que PCs de diferentes VLANs se comuniquen?"**
4. **"¿Ventajas y desventajas de VTP?"**
5. **"¿Qué es la native VLAN? ¿Qué problema puede causar si está mal configurada?"**

---

## 🤷 No hay preguntas tontas

> ❓ **¿Puede un dispositivo tener una IP en la VLAN 10 y otra en la VLAN 20?**

Sí, pero requiere que el dispositivo tenga al menos dos interfaces de red físicas o virtuales, cada una asignada a una VLAN diferente. También es posible con una única interfaz configurada como trunk 802.1Q y subinterfaces lógicas en el router, técnica conocida como router-on-a-stick. En máquinas virtuales, el hipervisor puede asignar varias interfaces virtuales a distintas VLANs.

---

> ❓ **¿Cómo sé en qué VLAN está un puerto?**

Con `show vlan brief` en el switch. Muestra todas las VLANs y qué puertos están asignados a cada una.

---

> ❓ **¿VLAN 1 es insegura?**

No es insegura intrínsecamente, pero es la VLAN por defecto y todos los puertos están en ella hasta que se configuren. Por seguridad: cambia la native VLAN a un número no estándar (ej. 999), deshabilita DTP, y no uses VLAN 1 para datos.

---

> ❓ **¿Puedo tener 5000 VLANs en un switch?**

El estándar 802.1Q permite hasta 4094 VLANs (IDs 1-4094). Pero los switches tienen límites de hardware (ej. 1000 VLANs activas simultáneamente, 64-128 MST instances). Consulta las especificaciones de tu switch.

---

## 🎬 Post-Créditos

Las VLANs segmentan la red de forma efectiva: el tráfico de Ventas no es visible para RRHH, y el departamento de IT permanece aislado de Dirección. Sin embargo, la segmentación lógica no es una solución de seguridad completa. La conexión de dispositivos externos o no autorizados puede introducir riesgos que las VLANs por sí solas no mitigan.

**PRÓXIMAMENTE EN U08:** Abordaremos el routing entre redes y la configuración de ACLs para controlar el tráfico de forma granular.

---

## ✅ Criterios de evaluación cubiertos

**RA5: Configura redes locales virtuales identificando su campo de aplicación.**

| Criterio | Cubierto |
|---|---|
| a) Ventajas de VLANs | ✅ Teoría |
| b) Implementación de VLANs | ✅ Laboratorio |
| c) Diagnóstico de incidencias | ✅ Fallos intencionados |
| d) Enlaces troncales | ✅ Trunk 802.1Q |
| e) Inter-VLAN con router | ✅ Router-on-a-stick, SVI |
| f) Protocolos centralizados (VTP) | ✅ VTP modos y riesgos |
