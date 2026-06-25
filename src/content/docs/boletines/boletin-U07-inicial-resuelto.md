---
title: Boletín U07 — Simple (Resuelto)
description: Soluciones ejercicios básicos de VLANs
---

# ✅ Boletín U07 — Simple (Resuelto)

---

## 1. ¿Qué VLAN soy?

1 → c (VLAN de datos: tráfico normal de usuario)
2 → a (VLAN de voz: teléfonos IP, QoS)
3 → d (VLAN nativa: sin etiquetar en el trunk)
4 → b (VLAN de gestión: administración del switch)

## 2. Verdadero o falso

a) **Verdadero.** Cada VLAN es un dominio de broadcast independiente.
b) **Verdadero.** IEEE 802.1Q es el estándar de etiquetado.
c) **Falso.** Las VLANs aíslan en capa 2. Necesitan un router (o switch capa 3).
d) **Verdadero.** Un trunk transporta todas las VLANs permitidas.
e) **Verdadero.** VLAN 1 es la native y la VLAN por defecto.

## 3. Identifica

a) **Puerto access** — Solo una VLAN, sin etiquetar.
b) **Puerto trunk** — Múltiples VLANs etiquetadas con 802.1Q.

## 4. Números

a) **12 bits** para el VLAN ID.
b) **4094 VLANs** (12 bits = 4096, reservadas 0 y 4095).
c) **4 bytes** insertados entre MAC origen y EtherType.

## 5. Relaciona

1 → b (`switchport mode trunk`)
2 → a (`vlan 10`)
3 → c (`show vlan brief`)
4 → d (`encapsulation dot1Q 10`)

## 6. ¿Qué necesito?

**b) Un router o switch capa 3.** Las VLANs aíslan en capa 2. Para comunicarse entre VLANs se necesita routing (inter-VLAN routing).
