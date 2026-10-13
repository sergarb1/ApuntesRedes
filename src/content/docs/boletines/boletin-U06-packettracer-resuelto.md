---
title: Boletín de Trunking e inter-VLAN — Packet Tracer resuelto
description: Soluciones paso a paso de las prácticas de trunks e inter-VLAN en Packet Tracer ✅
---

# ✅ Boletín de Trunking e inter-VLAN — Packet Tracer resuelto

> Misma numeración y enunciados que el [por-resolver](/ApuntesRedes/boletines/boletin-u06-packettracer). Comandos, valores exactos y qué deberías ver en cada paso.

---

## 1. VLANs: separar sin tocar un cable

**Solución:**

1. `Switch1` CLI:
```
vlan 10
 name Ventas
vlan 20
 name RRHH
interface fa0/1
 switchport mode access
 switchport access vlan 10
interface fa0/2
 switchport mode access
 switchport access vlan 20
```
2. PCs con IP estática de la misma subred (`192.168.1.10/24` y `.11/24`) y `ping` de `PC0` a `PC1`.

**Esperado:** timeout. `show vlan brief` muestra Fa0/1 en VLAN 10 y Fa0/2 en VLAN 20: cada VLAN es un dominio de broadcast y, sin capa 3, no hay puente entre ellas.

---

## 2. Trunk: la VLAN 10 cruza el edificio

**Solución:**

1. `Switch2`: misma VLAN 10 con `PC2` en Fa0/1 (`switchport mode access` + `switchport access vlan 10`).
2. En **ambos** extremos del enlace 24↔24:
```
interface fa0/24
 switchport mode trunk
```

**Esperado de `show interfaces trunk`:**

```
Fa0/24    on        802.1q     ...  VLANs allowed: 1-4094
          Native vlan: 1
```

- `ping PC0 ↔ PC2` → **OK** (misma VLAN 10 cruzando el trunk).
- `ping PC1 → PC2` → **no** (VLAN 20 vs 10; la inter-VLAN aún no existe).

---

## 3. Fallo 1: native VLAN que no coincide

**Solución:**

1. `Switch1`: `interface fa0/24` → `switchport trunk native vlan 99` (y crea la VLAN 99 si tu IOS lo pide).
2. `Switch2` la deja en 1 → en unos segundos aparecen avisos tipo `%CDP-4-NATIVE_VLAN_MISMATCH` (y el log lo confirma).

**Diagnóstico:** `show interfaces trunk` en cada switch → `Native vlan: 99` frente a `Native vlan: 1`. Las tramas de la VLAN nativa viajan **sin etiquetar**: Switch1 las pone en la 99 y Switch2 las entrega en la 1, así que el tráfico (y CDP/STP) acaba donde no toca.

**Arreglo (sin perder ping):** igualar la native en el extremo que falta:

```
Switch2(config)# interface fa0/24
Switch2(config-if)# switchport trunk native vlan 99
```

El cambio es inmediato: solo afecta a las tramas sin etiquetar; las VLANs 10 y 20 etiquetadas no se enteran.

---

## 4. Inter-VLAN: router-on-a-stick

**Solución:**

```
Router(config)# interface g0/0
Router(config-if)# no shutdown
Router(config)# interface g0/0.10
Router(config-subif)# encapsulation dot1Q 10
Router(config-subif)# ip address 192.168.10.1 255.255.255.0
Router(config)# interface g0/0.20
Router(config-subif)# encapsulation dot1Q 20
Router(config-subif)# ip address 192.168.20.1 255.255.255.0
```

En el switch, `Fa0/23` debe quedar como trunk (si no, créalo: `switchport mode trunk`). PCs:

| PC | IP | Gateway |
|---|---|---|
| PC0 | 192.168.10.10/24 | 192.168.10.1 |
| PC2 | 192.168.10.11/24 | 192.168.10.1 |
| PC1 | 192.168.20.10/24 | 192.168.20.1 |

**Esperado:** `ping PC0 → PC1` replies al 100% (pasa por la subinterfaz .10, sale etiquetada por la .20); `ping PC0 → PC2` también. Ojo: **ninguna IP en G0/0 físico** — en router-on-a-stick la interfaz física solo "traspasa" tramas etiquetadas.

---

## 5. Fallo 2: tag equivocado en la subinterfaz

**Solución:**

1. `G0/0.10` → `encapsulation dot1Q 30` (IP sigue siendo `192.168.10.1`).
2. `ping 192.168.10.1` desde `PC0` → **falla**.

**Por qué, cadena en mano:**

1. `PC0` manda el ARP: *"¿quién es 192.168.10.1?"* → llega etiquetado con **VLAN 10**.
2. El router recibe el ARP (la IP vive en `G0/0.10`, por eso **sí contesta**)...
3. ...pero su respuesta sale etiquetada con **dot1Q 30** → `PC0` (VLAN 10) la descarta: nunca ve la MAC de su gateway.
4. Sin ARP resuelto, no hay trama completa → ping muerto.

**Restaura** `encapsulation dot1Q 10` y vuelve a probar. Verificación rápida: `show ip interface brief` muestra la subinterfaz Up/Up (¡no te confíes!) — el fallo está en la etiqueta, no en la IP.

---

## 6. El mismo trabajo en un switch capa 3

**Solución:**

```
SwitchL3(config)# vlan 30
SwitchL3(config-vlan)# name Ventas
SwitchL3(config)# vlan 40
SwitchL3(config-vlan)# name RRHH
SwitchL3(config)# ip routing
SwitchL3(config)# interface vlan 30
SwitchL3(config-if)# ip address 192.168.30.1 255.255.255.0
SwitchL3(config-if)# no shutdown
SwitchL3(config)# interface vlan 40
SwitchL3(config-if)# ip address 192.168.40.1 255.255.255.0
SwitchL3(config-if)# no shutdown
```

Puertos access: Fa0/1 → VLAN 30, Fa0/2 → VLAN 40. PCs: `192.168.30.10/24` y `192.168.40.10/24`, gateways `.30.1` y `.40.1`.

**Esperado:** `ping PC3 → PC4` → OK. Si quitas `ip routing`: el ping **muere** aunque `show ip interface brief` diga que las SVI están Up/Up, y `show ip route` muestra que la tabla está vacía. Ese es el truco: las SVI existen, pero el switch no enruta entre ellas.

---

## 7. DHCP por VLAN: que nadie teclee IPs

**Solución (en el router del ejercicio 4):**

```
ip dhcp excluded-address 192.168.10.1 192.168.10.10
ip dhcp excluded-address 192.168.20.1 192.168.20.10
ip dhcp pool VENTAS
 network 192.168.10.0 255.255.255.0
 default-router 192.168.10.1
 dns-server 8.8.8.8
ip dhcp pool RRHH
 network 192.168.20.0 255.255.255.0
 default-router 192.168.20.1
 dns-server 8.8.8.8
```

Cada PC en *IP Configuration → DHCP*.

**Esperado:** `PC0/PC2` sacan de `.11` en adelante en `192.168.10.x`, `PC1` saca de `192.168.20.x`. Confirmación en el router:

```
Router# show ip dhcp binding
IP address      Hardware address       Lease expiration
192.168.10.11   00D0.xxxx.xxxx         ...
192.168.20.11   00D0.xxxx.xxxx         ...
```

**Regla:** un VLAN = una subred = un pool; el router elige el pool cuya red coincide con la interfaz por la que llegó el Discover (aquí, la subinterfaz correspondiente).

---

## 8. Fallo 3 + hardening: allowed y DTP

**Solución (hardening):**

```
! Trunks (en ambos extremos)
interface fa0/24
 switchport mode trunk
 switchport trunk allowed vlan 10,20
 switchport trunk native vlan 99
 switchport nonegotiate
! Puertos de usuario
interface range fa0/1-2
 switchport mode access
 switchport nonegotiate
```

**Fallo provocado:** en `Switch2` → `switchport trunk allowed vlan 20`.

**Esperado:** `show interfaces trunk` en `Switch2` ya no lista la VLAN 10 (`VLANs allowed: 20`), mientras `Switch1` sigue permitiendo `10,20` → **muere `PC0 ↔ PC2`** (todo lo que depende de la VLAN 10 deja de cruzar). La VLAN 20 sigue permitida en los dos lados: si tuvieras una PC de la VLAN 20 en `Switch2`, seguiría hablando con `PC1` sin enterarse del filtro.

**Diagnóstico:** compara `VLANs allowed on trunk` en ambos extremos: el trunk es un acuerdo, y un solo lado filtrando ya rompe el puente.

**Arreglo:** restaurar `switchport trunk allowed vlan 10,20` en `Switch2` → el ping de la VLAN 10 vuelve.

---

## 📋 Criterios de esta práctica

| Ejercicio | Concepto | Punto |
|---|---|---|
| 1 | VLANs y puertos access | 1 |
| 2 | Trunk 802.1Q y verificación | 1–2 |
| 3 | Native VLAN mismatch (fallo) | 2, 6 |
| 4 | Router-on-a-stick | 3 |
| 5 | Encapsulación de subinterfaz (fallo) | 3 |
| 6 | Switch capa 3 y SVIs | 4 |
| 7 | DHCP por VLAN | 7 |
| 8 | DTP, allowed y hardening (fallo) | 5–6 |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/06-trunking-inter-vlan) · **También:** [Por resolver](/ApuntesRedes/boletines/boletin-u06-packettracer)
