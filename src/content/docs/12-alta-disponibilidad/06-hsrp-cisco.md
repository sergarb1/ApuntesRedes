---
title: 06 — HSRP en Cisco
description: Manos a la IP virtual ⚙️
---

<p><small>Manos a la IP virtual ⚙️</small></p>

> 🗺️ **Estás en:** 🔁 **Alta disponibilidad y redundancia** → 06 · HSRP en Cisco

---

## 📬 La idea en una frase

> Configurar HSRP son cinco líneas por interfaz —IP real, IP virtual, prioridad, preempt y version— y el resto del trabajo es diseño: cuántos grupos, qué prioridades y cómo verificar que el par está sano antes de que lo esté.

---

## ⚙️ Escenario base

Dos routers como gateway de la LAN 192.168.1.0/24:

```
        [R1] .2   ← activo (prioridad 110, preempt)
           │
   ── switch ──  clientes (gateway: 192.168.1.1 = IP virtual)
           │
        [R2] .3   ← standby (prioridad por defecto 100)
           │
        salida a Internet (WANs propias en cada router)
```

### Configuración de R1 (activo deseado)

```
R1(config)# interface gigabitEthernet 0/0
R1(config-if)# ip address 192.168.1.2 255.255.255.0
R1(config-if)# standby version 2
R1(config-if)# standby 1 ip 192.168.1.1
R1(config-if)# standby 1 priority 110
R1(config-if)# standby 1 preempt
```

### Configuración de R2 (respaldo)

```
R2(config)# interface gigabitEthernet 0/0
R2(config-if)# ip address 192.168.1.3 255.255.255.0
R2(config-if)# standby version 2
R2(config-if)# standby 1 ip 192.168.1.1
```

Qué es cada pieza:

| Comando | Para qué |
|---|---|
| `standby version 2` | HSRPv2: soporta más grupos e IPv6; el habilitado por defecto en equipos modernos |
| `standby 1 ip 192.168.1.1` | El grupo 1 comparte esa **IP virtual** |
| `standby 1 priority 110` | Mayor prioridad = mejor candidato a activo (100 por defecto) |
| `standby 1 preempt` | Si R1 vuelve tras caerse, recupera el rol de activo |

> ⚠️ **Los errores clásicos:** olvidar `standby version 2` en un router y no en el otro (no se ven), asignar la IP virtual igual a la IP real de un router (funciona pero rompe el diagnóstico) y, el rey: **poner el gateway virtual en los clientes pero no en el pool DHCP**. El DHCP debe entregar 192.168.1.1 (la virtual), no .2 ni .3.

---

## 🔐 El detalle fino: track, cuando el router vivo no sirve

HSRP conmuta si el router **muere**. Pero, ¿y si el router está vivo y su **enlace WAN** muere? El activo sigue saludando, el respaldo espera… y la red entera sale a Internet por un router que no tiene salida. Ahí entra el **tracking**:

```
R1(config)# track 10 interface serial 0/0/0 line-protocol
R1(config)# interface gigabitEthernet 0/0
R1(config-if)# standby 1 track 10 decrement 20
```

Con eso: si Serial0/0/0 de R1 cae, su prioridad baja de 110 a 90, R2 (100) se convierte en activo (siempre que R2 tenga preempt) y la salida a Internet conmuta al router que sí tiene WAN. El tracking es la diferencia entre "HSRP montado" y "HSRP pensado".

---

## 🏗️ Load balancing por grupos: dos redes, dos activos

Dos subredes, dos routers, y nadie duerme:

```
VLAN 10 (192.168.10.0/24):  R1 activo del grupo 1
VLAN 20 (192.168.20.0/24):  R2 activo del grupo 2
```

```
R1(config)# interface gig 0/0.10
R1(config-subif)# standby 1 ip 192.168.10.1
R1(config-subif)# standby 1 priority 110
R1(config-subif)# standby 1 preempt
R1(config)# interface gig 0/0.20
R1(config-subif)# standby 2 ip 192.168.20.1
   (sin priority alta: R2 será activo del grupo 2)
```

En R2, espejo: prioridad 110 en el grupo 2. Cada router es activo de su VLAN y respaldo de la otra: reparto de carga (soft) y HA a la vez.

---

## 🔍 Verificación y prueba de fuego

```
R1# show standby brief
             P   Active        Standby       Virtual IP
Gi0/0        110 Active        192.168.1.3   192.168.1.1
```

Prueba de fuego en Packet Tracer (o en producción, con valor):

1. Desde un PC: `ping 8.8.8.8 -t` continuo (o Simulation Mode con paquetes constantes).
2. Apaga R1 (`shutdown` en su interfaz o apaga el equipo).
3. Observa: 1-2 pings perdidos (o menos con timers afinados) y el flujo continúa por R2.
4. Enciende R1 con preempt: recupera el activo sin pérdida adicional.

| Comando | Qué aporta |
|---|---|
| `show standby brief` | Estado de roles por grupo (Active/Standby) |
| `show standby` | Temporizadores, preempt, MAC virtual, tracking |
| `debug standby errors / events` | Transiciones en vivo |
| `show ip arp \| include 192.168.1.1` | La MAC virtual `0000.0c07.ac01` |

---

## 🤬 CONRAD VS EL MUNDO: "Tengo HSRP, ya soy redundante"

**Administrador:** — Configuré HSRP en los dos routers. Redundancia: check.

**CONRAD:** — ¿Y el track? ¿No? ¿Entonces cuando muera la WAN del activo, tus 300 usuarios seguirán "saludando" a un router que tiene salida a Internet por… nada. Felicidades, tu HA conmuta cuando muere el router, no cuando muere el servicio.

**CONRAD:** — Y otra cosa: ¿el DHCP entrega la .1? ¿O entregaste la .2, que es la IP REAL del router que ahora es activo? Porque cuando cambie el activo, media oficina tendrá gateway en la IP muerta. Repite conmigo: **en los clientes, SIEMPRE la virtual**.

**La lección:** HSRP sin tracking es media solución, y HSRP con la IP real en el DHCP es una bomba de relojería. Diseña: virtual en los clientes, tracking del enlace que importa, preempt coherente con tus prioridades.

---

## 🧠 Mini-chequeo

1. ¿Qué hace `standby 1 preempt` y cuándo lo pondrías?
2. ¿Por qué el DHCP debe entregar la IP virtual y no la del router activo?
3. ¿Qué problema resuelve `standby 1 track`? ¿Cómo funciona con prioridades?
4. En `show standby brief`, ambos routers aparecen como Active. ¿Qué sospechas?

<details>
<summary>🔄 Respuestas</summary>

1. Recupera el rol de activo al volver el router de mayor prioridad. Lo pones cuando tu prioridad refleja el diseño (el mejor equipo sirve); lo omites si prefieres estabilidad sobre "elegancia".
2. Porque la IP del activo **cambia de dueño** al conmutar. Si los clientes apuntan a una IP real, al cambiar el activo su gateway apunta a un router que ya no la tiene. La virtual es la única estable.
3. Que el activo siga vivo pero con el **enlace que importa caído** (p. ej. WAN): el track baja su prioridad (decrement) cuando el interface vigilado falla, dejando al respaldo (con preempt) hacerse con el activo y servir el servicio real.
4. Que no se ven entre ellos: mensajes hello bloqueados (ACL, VLAN mal montada), o dos grupos incoherentes. Un par sano tiene un Active y un Standby por grupo.
</details>

---

## ✅ Resumen en 3 frases

- HSRP en IOS: `standby version 2` + `standby 1 ip <virtual>` + prioridad + preempt; y la **virtual** en el DHCP de los clientes.
- El **tracking** convierte HSRP en HA real: conmuta por fallo del servicio, no solo por muerte del equipo.
- Verificación: `show standby brief` (un Active, un Standby) y prueba de fuego con ping continuo apagando al activo.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| Grupo HSRP | La instancia (1, 2…) que comparte una IP virtual |
| Prioridad / Preempt | Quién merece servir / quién recupera |
| Track + decrement | Vigilar un interfaz y penalizar la prioridad |
| HSRPv2 | Versión moderna: más grupos, IPv6, multicast mejor |
| MAC virtual 0000.0c07.acXX | La "dirección fija" del gateway |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/12-alta-disponibilidad) · **Anterior:** [05 · FHRP: el gateway redundante](/ApuntesRedes/12-alta-disponibilidad/05-fhrp) · **Siguiente:** [07 · Redundancia en capa 3](/ApuntesRedes/12-alta-disponibilidad/07-redundancia-l3)
