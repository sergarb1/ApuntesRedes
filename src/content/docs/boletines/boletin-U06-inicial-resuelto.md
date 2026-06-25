---
title: Boletín U06 — Simple (Resuelto)
description: Soluciones ejercicios básicos de Switching y STP
---

# ✅ Boletín U06 — Simple (Resuelto)

---

## 1. ¿Qué hace el switch?

1 → b (MAC destino conocida → reenvío selectivo)
2 → a (MAC destino desconocida → inunda)
3 → c (Broadcast → inunda)

## 2. Verdadero o falso

a) **Verdadero.** Cada puerto es un dominio de colisión independiente.
b) **Falso.** Los switches no segmentan dominios de broadcast. Eso lo hacen los routers.
c) **Verdadero.** STP bloquea puertos redundantes para romper bucles.
d) **Verdadero.** RSTP (IEEE 802.1w) converge en 1-3 segundos frente a los 30-50 de STP.
e) **Falso.** La tabla MAC se llama tabla MAC o CAM table. La tabla ARP está en los hosts, no en los switches.

## 3. Estados STP

1. c) **Blocking** (20s escuchando BPDUs)
2. d) **Listening** (15s, escucha pero no aprende MACs)
3. a) **Learning** (15s, aprende MACs pero no reenvía)
4. b) **Forwarding** (reenvía tráfico normalmente)

Tiempo total: ~50 segundos.

## 4. Identifica el rol

a) **Designated Port** — El Root Bridge tiene todos sus puertos como Designated.
b) **Root Port** — Cada switch no-root tiene un Root Port hacia el Root Bridge.
c) **Alternate Port** — Puerto bloqueado como respaldo.

## 5. ¿Qué comando?

1 → c (`show mac address-table`)
2 → a (`show spanning-tree`)
3 → b (`spanning-tree portfast`)
4 → d (`switchport port-security`)

## 6. Tormenta de broadcast

**b) Un bucle en la red.** Si hay caminos redundantes sin STP, los broadcasts rebotan infinitamente entre switches, saturando la red.
