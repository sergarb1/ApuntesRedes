---
title: Boletín U07 — Simple
description: Ejercicios básicos de VLANs
---

# 📝 Boletín U07 — Simple

> Ejercicios básicos para afianzar los conceptos de VLANs.

---

## 1. ¿Qué VLAN soy?

Relaciona el tipo de VLAN con su descripción:

| Tipo | Descripción |
|---|---|
| 1. VLAN de datos | a) Para teléfonos IP, con prioridad QoS |
| 2. VLAN de voz | b) Para administrar el switch |
| 3. VLAN nativa | c) Tráfico normal de usuario |
| 4. VLAN de gestión | d) Sin etiquetar en el trunk |

## 2. Verdadero o falso

a) Una VLAN segmenta el dominio de broadcast.
b) El estándar de etiquetado VLAN es 802.1Q.
c) Dos PCs en diferentes VLANs pueden comunicarse directamente sin router.
d) Un trunk transporta tráfico de múltiples VLANs.
e) La native VLAN por defecto es VLAN 1.

## 3. Identifica

¿Qué tipo de puerto es cada uno?

a) Puerto que conecta un PC (solo una VLAN)
b) Puerto que conecta dos switches (múltiples VLANs)

## 4. Números

Completa:

a) ¿Cuántos bits tiene el VLAN ID en 802.1Q? ___
b) ¿Cuántas VLANs permite el estándar? ___
c) ¿Cuántos bytes añade 802.1Q a la trama? ___

## 5. Relaciona

| Comando | Función |
|---|---|
| 1. `switchport mode trunk` | a) Crear una VLAN |
| 2. `vlan 10` | b) Configurar puerto como trunk |
| 3. `show vlan brief` | c) Ver todas las VLANs |
| 4. `encapsulation dot1Q 10` | d) Configurar subinterfaz para VLAN 10 |

## 6. ¿Qué necesito?

Para que PCs de VLAN 10 y VLAN 20 se comuniquen, necesito:

a) Un trunk entre switches
b) Un router o switch capa 3
c) Un cable cruzado
d) STP activado
