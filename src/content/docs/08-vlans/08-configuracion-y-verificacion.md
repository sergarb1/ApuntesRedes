---
title: 08 — Configuración y verificación
description: El escenario departamental paso a paso y cómo diagnosticarlo 🔧
---

<p><small>El escenario departamental paso a paso y cómo diagnosticarlo 🔧</small></p>

> 🗺️ **Estás en:** 🏢 **U08 · VLANs** → 08 · Configuración y verificación

---

## 📬 La idea en una frase

> Aquí montas el escenario estrella de la unidad —**dos switches con trunk y un router-on-a-stick** segmentando Ventas y RRHH— con los comandos exactos de Cisco IOS y el set de verificación (`show vlan brief`, `show interface trunk`, `show ip interface brief`) que convierte un "no funciona" en un "esto es lo que falla".

Este punto es el punto 8 porque condensa todo lo anterior en un solo montaje: VLANs (puntos 1-2), trunks (3), router (4) y hardening (7). Es también la base del ⚡ Laboratorio de tortura del punto 9.

---

## 🏢 El escenario departamental

```
                        ┌─────────────┐
                        │  ROUTER     │
                        │ Fa0/0.10 .1 │
                        │ Fa0/0.20 .1 │
                        └──────┬──────┘
                         Fa0/0 │
                    [trunk 802.1Q]
                        ┌──────┴──────┐
                     Fa0/24│           │ Fa0/24
               ┌───────────┴─────┐  ┌──┴───────────┐
               │ Switch1         │  │ Switch2       │
               │ Fa0/1-5 VLAN 10 │  │ Fa0/1-5 VL 10 │
               │ Fa0/6-10 VL 20  │  │ Fa0/6-10 VL20 │
               └───────────────┬─┘  └┬─────────────┘
                VLAN 10 Ventas │     │ VLAN 20 RRHH
                VLAN 20 RRHH   │     │ (mismas VLANs)
              PC-A(10) PC-B(20)│     PC-C(10) PC-D(20)
```

Objetivo: que un PC de la VLAN 10 (Ventas) hable con uno de la VLAN 20 (RRHH) a través del router, y que las VLANs crucen el trunk entre switches.

---

## 🛠️ Paso 1 — Crear las VLANs en Switch1

```bash
Switch1(config)# vlan 10
Switch1(config-vlan)# name Ventas
Switch1(config)# vlan 20
Switch1(config-vlan)# name RRHH
```

## 🛠️ Paso 2 — Asignar puertos access

```bash
Switch1(config)# interface range fa0/1-5
Switch1(config-if-range)# switchport mode access
Switch1(config-if-range)# switchport access vlan 10
Switch1(config)# interface range fa0/6-10
Switch1(config-if-range)# switchport mode access
Switch1(config-if-range)# switchport access vlan 20
```

> 💡 **Regla:** el PC no sabe nada de VLANs. El switch pone la etiqueta "VLAN 10" cuando el tráfico del PC entra por Fa0/1. Al PC le da igual: ve una IP y un gateway normales.

## 🛠️ Paso 3 — Configurar el trunk entre switches (ambos)

En Switch1 y en Switch2, el puerto que mira al otro switch:

```bash
Switch1(config)# interface fa0/24
Switch1(config-if)# switchport mode trunk
Switch1(config-if)# switchport trunk native vlan 99
Switch1(config-if)# switchport trunk allowed vlan 10,20
```

#### El fallo intencionado de esta unidad

Configura ahora la **native VLAN distinta** en cada extremo (Switch1 native 99, Switch2 native 1), exactamente como lo hará el Laboratorio del punto 9. El resultado:

- `show interface trunk` en ambos switches: verás *Native VLAN mismatch*.
- Las tramas del DHCP/ARP de la native "van y vienen a ratos".
- Los logs del switch ladran *"Native VLAN mismatch discovered"*.

La lección: **la native VLAN debe coincidir en los dos extremos** y fuera de la 1.

## 🛠️ Paso 4 — Configurar al router (router-on-a-stick)

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

## 🛠️ Paso 5 — IPs en los PCs

| PC | VLAN | IP | Gateway |
|---|---|---|---|
| PC-A | 10 | 192.168.10.10 | 192.168.10.1 |
| PC-B | 20 | 192.168.20.10 | 192.168.20.1 |
| PC-C | 10 | 192.168.10.11 | 192.168.10.1 |
| PC-D | 20 | 192.168.20.11 | 192.168.20.1 |

> ⚠️ Error típico: subred mal puesta o gateway apuntando a la subinterfaz equivocada. Cada VLAN, SU subred y SU gateway.

---

## 🔍 Kit de verificación (los 5 shows de oro)

| Comando | Qué te dice |
|---|---|
| `show vlan brief` | VLANs existentes y qué **puertos access** están en cada una |
| `show interfaces trunk` | Qué puertos son trunk, **native VLAN**, allowed VLANs y mismatches |
| `show ip interface brief` | Estado de subinterfaces del router (Up/Up) e IPs |
| `show running-config interface fa0/24` | La config exacta del puerto (trunk, native, allowed) |
| `show mac address-table` | Qué MACs han aprendido los puertos de cada VLAN |

**Secuencia de diagnóstico** cuando "no se ve":

```
1. show vlan brief            ¿Existen las VLANs? ¿Están los puertos correctos?
2. show interfaces trunk      ¿El puerto es trunk? ¿Native igual? ¿allowed correcto?
3. ping PC-A → PC-B           ¿Hay conectividad dentro del mismo switch?
4. ping PC-A → gateway        ¿Llega el tráfico al router?
5. show ip interface brief    ¿Están las subinterfaces Up/Up del router?
```

> 💡 **Regla del técnico:** comprueba primero la propia VLAN (VLAN existe y puerto bien asignado), luego el **trunk**, luego el **router**. El 90% de los "no me veo" están en la lista de los dos primeros.

---

## 📋 Plan de troubleshooting rápido

| Síntoma | Causa probable | Comando clave |
|---|---|---|
| PCs de la misma VLAN no se ven dentro del switch | Puerto mal `switchport access vlan` | `show vlan brief` |
| Una VLAN llega al switch A pero no al B | No permitida en `allowed vlan` | `show interfaces trunk` |
| Todo "funciona a ratos" | **Native VLAN distinta** en el trunk | `show interfaces trunk` (mismatch) |
| PCs de VLANs distintas no se ven con subinterfaces OK | `no shutdown` olvidado en Fa0/0, o gateway mal | `show ip interface brief` |
| Un puerto de repente se vuelve trunk | **DTP** negociando solo | `switchport mode access` + `nonegotiate` |
| Un PC "cambia de VLAN" al mover el cable | Asignación por puerto (estática) y una MAC nueva | `show mac address-table` |

Este plan es el que usarás en el **Laboratorio de tortura** del punto 9: el fallo intencionado de native VLAN se diagnostica exactamente con la fila 3.

---

## 🧠 Mini-chequeo

1. ¿Qué tres pasos (resumen) configuran una VLAN en un switch y con qué comandos?
2. ¿Qué comando te descubre el *native VLAN mismatch* en un trunk?
3. Los PCs de VLAN 10 y 20 no se ven; el `show vlan brief` está bien y el `show interfaces trunk` no muestra mismatch. ¿Dónde miras ahora?

<details>
<summary>🔄 Respuestas</summary>

1. **Crear la VLAN** (`vlan 10` + `name Ventas`), **asignar puertos access** (`switchport mode access` + `switchport access vlan 10`) y **configurar el trunk** si toca (`switchport mode trunk` + `allowed vlan`).
2. `show interfaces trunk`: muestra la native VLAN y avisa de *"Native VLAN mismatch"* si difieren entre extremos.
3. Sube a **capa 3**: `show ip interface brief` del router (¿subinterfaces Up/Up?, ¿`no shutdown` en Fa0/0?), y comprueba el **gateway de los PCs** (¿apuntan a 192.168.10.1 y 192.168.20.1?). También `ping` al gateway desde cada PC para ver hasta dónde llega.

</details>

---

## ✅ Resumen en 3 frases

- El montaje completo es **crear VLANs → asignar puertos access → trunk entre switches → router-on-a-stick**.
- La verificación es **`show vlan brief` + `show interfaces trunk` + `show ip interface brief`**, siempre en ese orden.
- El fallo campeón de esta unidad —native VLAN distinta en el trunk— se detecta con `show interfaces trunk`.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| Escenario departamental | 2 switches + trunk + router, VLANs por departamento |
| `show vlan brief` | Ver VLANs y puertos access de cada una |
| `show interfaces trunk` | Ver trunks, native VLAN, allowed, mismatches |
| `show ip interface brief` | Estado Up/Up de subinterfaces del router |
| Troubleshooting | Método de diagnóstico: VLAN → trunk → router |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/08-vlans) · **Anterior:** [07 · Seguridad en VLANs](/ApuntesRedes/08-vlans/07-seguridad-en-vlans) · **Siguiente:** [09 · Cierre: consolida lo aprendido](/ApuntesRedes/08-vlans/09-cierre)