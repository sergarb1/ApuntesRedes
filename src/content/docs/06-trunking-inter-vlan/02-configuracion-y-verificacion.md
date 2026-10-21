---
title: 2 — Configuración y verificación de trunks
description: El escenario departamental paso a paso y cómo diagnosticarlo 🔧
---

<p><small>El escenario departamental paso a paso y cómo diagnosticarlo 🔧</small></p>

> 🗺️ **Estás en:** 🌉 **Trunking y enrutamiento inter-VLAN** → 2 · Configuración y verificación de trunks

---

## 📬 La idea en una frase

> Aquí montas el escenario estrella de la unidad —**dos switches con trunk y un router-on-a-stick** segmentando Ventas y RRHH— y aprendes el set de verificación (`show vlan brief`, `show interfaces trunk`, `show ip interface brief`) que convierte un "no funciona" en un "esto es lo que falla".

Este punto es el montaje estrella de la unidad: concentra las VLANs que ya creaste en switching, los trunks del [punto 1](/ApuntesRedes/06-trunking-inter-vlan/01-trunks-y-8021q), el router-on-a-stick del [punto 3](/ApuntesRedes/06-trunking-inter-vlan/03-inter-vlan-routing) y el native/allowed, todo en un solo escenario.

---

## 🏢 El escenario departamental

![El escenario departamental: un router con subinterfaces 10 y 20 conectado por trunk a Switch1, este unido por trunk a Switch2, con PC-A y PC-C en VLAN 10 y PC-B y PC-D en VLAN 20](/ApuntesRedes/diagrams/u06-escenario-departamental.svg)

Objetivo: que un PC de la VLAN 10 (Ventas) hable con uno de la VLAN 20 (RRHH) a través del router, y que las VLANs crucen el trunk entre switches.

---

## 🛠️ El montaje, paso a paso

**Paso 1 — VLANs y puertos access** (en Switch1; en Switch2 se repite igual):

```bash
Switch1(config)# vlan 10
Switch1(config-vlan)# name Ventas
Switch1(config)# vlan 20
Switch1(config-vlan)# name RRHH

Switch1(config)# interface range fa0/1-5
Switch1(config-if-range)# switchport mode access
Switch1(config-if-range)# switchport access vlan 10
Switch1(config)# interface range fa0/6-10
Switch1(config-if-range)# switchport mode access
Switch1(config-if-range)# switchport access vlan 20
```

> 💡 **Regla:** el PC no sabe nada de VLANs. El switch pone la etiqueta "VLAN 10" cuando el tráfico del PC entra por Fa0/1. Al PC le da igual: ve una IP y un gateway normales.

**Paso 2 — Trunk entre switches:** la configuración completa está en el [punto 1](/ApuntesRedes/06-trunking-inter-vlan/01-trunks-y-8021q); en el Fa0/24 de ambos switches, como mínimo:

```bash
Switch1(config)# interface fa0/24
Switch1(config-if)# switchport mode trunk
Switch1(config-if)# switchport trunk native vlan 99
Switch1(config-if)# switchport trunk allowed vlan 10,20
```

> ⚠️ **El fallo clásico:** si cada extremo declara una native VLAN distinta (Switch1 native 99, Switch2 native 1), `show interfaces trunk` mostrará *Native VLAN mismatch*, los switches ladrarán *"Native VLAN mismatch discovered"* y el tráfico de DHCP/ARP "va y viene a ratos". La lección: **la native VLAN debe coincidir en los dos extremos** y no ser la 1.

**Paso 3 — Router-on-a-stick:** subinterfaces por VLAN, tal como se montan en el [punto 3](/ApuntesRedes/06-trunking-inter-vlan/03-inter-vlan-routing):

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

**Ojo:** el puerto del switch que recibe al router (Fa0/23) **también debe ser trunk** (`switchport mode trunk` + `allowed vlan 10,20`), o el router solo verá la VLAN nativa.

**Paso 4 — IPs en los PCs:**

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

> 💡 **Regla del técnico:** comprueba primero la propia VLAN (VLAN existe y puerto bien asignado), luego el **trunk**, luego el **router**. El 90% de los "no me veo" están en los dos primeros pasos.

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

📚 [Volver al índice de la unidad](/ApuntesRedes/06-trunking-inter-vlan) · **Anterior:** [1 · Trunks y 802.1Q](/ApuntesRedes/06-trunking-inter-vlan/01-trunks-y-8021q) · **Siguiente:** [3 · Inter-VLAN routing](/ApuntesRedes/06-trunking-inter-vlan/03-inter-vlan-routing)
