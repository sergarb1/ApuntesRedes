---
title: Boletín U07 — Inicial (Resuelto)
description: Soluciones ejercicios básicos de VLANs
---

# ✅ Boletín U07 — Inicial (Resuelto)

---

## 1. ¿Qué VLAN soy?

1 → c (VLAN de datos: tráfico normal de usuario)
2 → a (VLAN de voz: teléfonos IP, QoS 802.1p)
3 → d (VLAN nativa: sin etiquetar en el trunk)
4 → b (VLAN de gestión: administración del switch, SSH/SNMP)

## 2. Verdadero o falso

a) **Verdadero.** Cada VLAN es un dominio de broadcast independiente: un broadcast de VLAN 10 no llega a la VLAN 20.
b) **Verdadero.** IEEE 802.1Q es el estándar de etiquetado VLAN (TPID 0x8100, 4 bytes).
c) **Falso.** Las VLANs aíslan en capa 2. Necesitan un router (o un switch capa 3) para hacer inter-VLAN routing.
d) **Verdadero.** Un trunk transporta todas las VLANs permitidas, etiquetadas con 802.1Q (salvo la native).
e) **Verdadero.** VLAN 1 es la native y la VLAN por defecto del switch. Por seguridad conviene cambiarla.

## 3. Identifica

a) **Puerto access** — Solo una VLAN, tráfico sin etiquetar.
b) **Puerto trunk** — Múltiples VLANs etiquetadas con 802.1Q (y la native sin etiquetar).

## 4. Números

a) **12 bits** para el VLAN ID.
b) **4094 VLANs** (12 bits = 4096, reservadas 0 y 4095).
c) **4 bytes** insertados entre la MAC de origen y el EtherType: TPID (2 bytes) + PRI (3 bits) + VLAN ID (12 bits).

## 5. Relaciona

1 → b (`switchport mode trunk` configura el puerto como trunk)
2 → a (`vlan 10` crea la VLAN 10)
3 → c (`show vlan brief` muestra las VLANs y sus puertos)
4 → d (`encapsulation dot1Q 10` etiqueta la subinterfaz con la VLAN 10)

## 6. ¿Qué necesito?

**b) Un router o switch capa 3.** Las VLANs aíslan en capa 2. Para comunicarse entre VLANs se necesita routing (inter-VLAN routing): router-on-a-stick con subinterfaces o un switch multicapa con SVIs.

## 7. Comandos de resolución

1 → c (`show vlan brief` → VLANs y puertos access)
2 → a (`show interfaces trunk` → native VLAN, allowed y mismatches)
3 → b (`show running-config` → configuración completa actual)

d) **`show ip interface brief`** — en el router-on-a-stick, te muestra las subinterfaces (Fa0/0.10, Fa0/0.20…) con su estado **Up/Up** y sus IPs. Si una subinterfaz está *down/down*, el problema suele ser la interfaz física sin `no shutdown`, o que la VLAN no exista en el switch.

## 8. V/F inter-VLAN

a) **Verdadero.** Cada VLAN necesita su subinterfaz (`interface fa0/0.10`) con `encapsulation dot1Q 10` y su IP de gateway.
b) **Verdadero.** Un switch capa 3 enruta entre VLANs con SVIs (`interface vlan X`) + `ip routing`, sin router externo.
c) **Verdadero.** El router-on-a-stick enruta todo por la única interfaz física: es el cuello de botella del diseño.
d) **Verdadero.** Sin `ip routing`, los SVIs están Up/Up pero NO enrutan entre VLANs. Es el fallo nº1 al probar.
e) **Verdadero.** Todo el tráfico inter-VLAN atraviesa la misma interfaz: si las VLANs generan más de su ancho de banda, se satura (por eso se usa Gigabit o un switch capa 3).