---
title: Boletín U06 — Simple
description: Ejercicios básicos de Switching y STP
---

# 📝 Boletín U06 — Simple

> Ejercicios básicos para afianzar los conceptos de switching y STP.

---

## 1. ¿Qué hace el switch?

Relaciona la situación con la acción del switch:

| Situación | Acción |
|---|---|
| 1. Llega una trama con MAC destino conocida | a) Inunda por todos los puertos menos el origen |
| 2. Llega una trama con MAC destino desconocida | b) Reenvía solo por el puerto correspondiente |
| 3. Llega una trama broadcast | c) Inunda por todos los puertos |

## 2. Verdadero o falso

a) Un switch segmenta los dominios de colisión.
b) Un switch segmenta los dominios de broadcast.
c) STP evita bucles en redes conmutadas.
d) RSTP converge más rápido que STP.
e) La tabla MAC de un switch se llama tabla ARP.

## 3. Estados STP

Ordena los estados STP por los que pasa un puerto desde que se activa hasta que reenvía tráfico:

a) Learning
b) Forwarding
c) Blocking
d) Listening

## 4. Identifica el rol

Indica qué rol STP tiene cada puerto:

a) Puerto del Root Bridge hacia un switch no-root
b) Puerto que mira hacia el Root Bridge (en un switch no-root)
c) Puerto bloqueado que proporciona un camino alternativo

## 5. ¿Qué comando?

Relaciona el comando con su función:

| Comando | Función |
|---|---|
| 1. `show mac address-table` | a) Ver estado STP |
| 2. `show spanning-tree` | b) Configurar PortFast |
| 3. `spanning-tree portfast` | c) Ver tabla MAC del switch |
| 4. `switchport port-security` | d) Activar seguridad de puerto |

## 6. Tormenta de broadcast

¿Qué es necesario para que ocurra una tormenta de broadcast?

a) Un solo switch con muchos PCs
b) Un bucle en la red (switches conectados formando un círculo)
c) Un cable defectuoso
d) Un router mal configurado
