---
title: Boletín de Trunking e inter-VLAN — Packet Tracer
description: Prácticas guiadas de trunks, VLANs e inter-VLAN en Packet Tracer 🖥️
---

# 🖥️ Boletín de Trunking e inter-VLAN — Packet Tracer

> **Variante práctica de nivel único** (no es el par inicial/avanzado). Ocho micro-prácticas de baja dificultad en **Packet Tracer** para montar de cero una red con VLANs: crear VLANs, pasar tráfico por trunks, enrutar entre VLANs con router-on-a-stick y con switch capa 3, repartir IPs por VLAN y endurecer los trunks. Tres de ellas llevan un **fallo intencionado** que tienes que diagnosticar. Ideal tras leer los puntos 1–7 de la unidad.

> 🧰 **Requisitos:** Cisco Packet Tracer. Necesitas 2 switches (`2960`), 1 router (`2911`), 3 PCs y, para el ejercicio 6, un switch de capa 3 (`3560`). El resuelto está justo al lado: úsalo solo cuando te atasques.

---

## 1. VLANs: separar sin tocar un cable

Monta **Switch1 + PC0 (Fa0/1) + PC1 (Fa0/2)**. Crea la VLAN `10 Ventas` y la VLAN `20 RRHH`, mete `PC0` en la 10 y `PC1` en la 20 (`switchport mode access` + `switchport access vlan`) y haz un `ping` de `PC0` a `PC1`.

> 💡 **Pista:** el ping **no debe funcionar**: dos VLANs son dos dominios de broadcast. Verifica con `show vlan brief` que cada puerto está en su VLAN.

## 2. Trunk: la VLAN 10 cruza el edificio

Añade **Switch2** con `PC2` en Fa0/1 (también VLAN 10) y conecta `Switch1 Fa0/24 ↔ Switch2 Fa0/24`. Configura los dos puertos como trunk y comprueba con `show interfaces trunk` qué VLANs cruzan. Ahora ping: `PC0 ↔ PC2` (misma VLAN, switches distintos) y `PC1 → PC2` (distinta VLAN).

> 💡 **Pista:** ambos extremos deben decir `Mode: on` y `Native vlan` igual; `PC1 → PC2` sigue sin poder (la inter-VLAN llega en el ejercicio 4).

## 3. Fallo 1: native VLAN que no coincide

Deja `Switch1` con `switchport trunk native vlan 99` y `Switch2` en su native por defecto (1). Espera unos segundos y mira los mensajes que aparecen y la salida de `show interfaces trunk` en ambos switches.

Diagnostica qué tráfico acaba en la VLAN equivocada y arréglalo para que los dos extremos hablen igual, **sin perder el ping** de `PC0 ↔ PC2`.

> 💡 **Pista:** las tramas de la VLAN nativa viajan **sin etiquetar**; si cada extremo las asocia a una VLAN distinta, cada uno las entrega donde no toca. El comando es el mismo en los dos lados.

## 4. Inter-VLAN: router-on-a-stick

Conecta el **router G0/0 a Switch1 Fa0/23** (puerto trunk en el switch) y crea las subinterfaz `G0/0.10` (dot1Q 10 → `192.168.10.1/24`) y `G0/0.20` (dot1Q 20 → `192.168.20.1/24`). Dale IP estática a las PCs: `PC0 192.168.10.10`, `PC2 192.168.10.11` (gateway `.10.1`) y `PC1 192.168.20.10` (gateway `.20.1`).

Prueba `PC0 → PC1` (entre VLANs) y `PC0 → PC2` (entre switches).

> 💡 **Pista:** en router-on-a-stick la IP **no va en la interfaz física**, solo en las subinterfaz; y no olvides `no shutdown`. Si el ping al gateway falla, `show ip interface brief` es tu primer espejo.

## 5. Fallo 2: tag equivocado en la subinterfaz

"Copia" el error típico: cambia en `G0/0.10` la encapsulación a `encapsulation dot1Q 30` **sin tocar las IPs**. Prueba el ping de `PC0` a su gateway y explica exactamente dónde se rompe la cadena (¿llega el ARP? ¿quién contesta y con qué etiqueta?). Restaura la encapsulación correcta.

> 💡 **Pista:** la subinterfaz solo "escucha" las tramas etiquetadas con ese número; la PC está en la VLAN 10, no en la 30. Comprueba con `show ip interface brief` y un *Simulation mode* mirando el ARP.

## 6. El mismo trabajo en un switch capa 3

Topología nueva y pequeña: **3560 + PC3 (Fa0/1, VLAN 30) + PC4 (Fa0/2, VLAN 40)**. Crea las VLANs, da IP a las PCs (`192.168.30.10` y `192.168.40.10`, gateways `.30.1` y `.40.1`) y monta las SVIs en el switch para que hagan de gateway.

Ping `PC3 → PC4`. Ahora **quita el comando que activa el routing global** y vuelve a probar: ¿qué pasa aunque las SVIs estén Up/Up?

> 💡 **Pista:** sin `ip routing` el switch enruta... nada. Es el fallo nº1 de este ejercicio; `show ip interface brief` no te lo dice, prueba el ping y mira `show ip route`.

## 7. DHCP por VLAN: que nadie teclee IPs

Vuelve al router-on-a-stick del ejercicio 4 y conviértelo en servidor DHCP: un pool por VLAN (`network`, `default-router` de su subred, `dns-server 8.8.8.8`) con sus `ip dhcp excluded-address` para los primeros números. Pon las tres PCs en **DHCP** y comprueba que cada una recibe una IP **de su subred** con `show ip dhcp binding`.

> 💡 **Pista:** la regla es **un VLAN = una subred = un pool**; el router entrega del pool cuya red coincide con la interfaz por la que llegó el Discover. Si una PC queda en `169.254.x.x`, revisa pool y exclusiones.

## 8. Fallo 3 + hardening: allowed y DTP

Endurece los trunks: `switchport trunk allowed vlan 10,20` en los dos extremos, `switchport nonegotiate` en los puertos trunk y `switchport mode access` + `switchport nonegotiate` en los puertos de usuario. Verifica todo con `show interfaces trunk`.

Ahora provoca el fallo clásico: en `Switch2` cambia el trunk a `switchport trunk allowed vlan 20` (fuera la 10). ¿Qué enlaces mueren? Diagnóstica con `show interfaces trunk` y restaura el allowed correcto.

> 💡 **Pista:** los trunks son puentes vigilados: si los dos extremos no permiten las mismas VLANs, lo que "no llega" es lo que uno de ellos filtra. Compara `VLANs allowed on trunk` en ambos.

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

📚 [Volver al índice de la unidad](/ApuntesRedes/06-trunking-inter-vlan) · **También:** [Resuelto](/ApuntesRedes/boletines/boletin-u06-packettracer-resuelto)
