---
title: Boletín U06 — Inicial
description: Ejercicios básicos de Switching y STP
---

# 📝 Boletín U06 — Inicial

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

## 7. Reenvío de tramas y la tabla CAM

Observa la tabla CAM de un switch:

```
Vlan    Mac Address       Type        Ports
----    -----------       --------    -----
   1    0050.7966.6800    DYNAMIC     Fa0/1
   1    0050.7966.6801    DYNAMIC     Fa0/2
   1    00D0.BC96.1A01    DYNAMIC     Fa0/3
```

Indica qué hace el switch en cada caso:

a) Llega una trama por Fa0/2 con MAC origen `0050.7966.6801` y destino `00D0.BC96.1A01`.
b) Llega una trama por Fa0/1 con MAC origen `0050.7966.6800` y destino `0050.7966.6802` (desconocida).
c) Llega una trama por Fa0/3 con destino `FFFF.FFFF.FFFF` (broadcast).
d) Llega una trama por Fa0/4 con MAC origen `0050.7966.6801`, una MAC que ya estaba aprendida en Fa0/2. ¿Qué hace el switch con la tabla CAM?

**Pista:** si la MAC destino está en la tabla, reenvío selectivo; si no está, inundo. Y si la misma MAC origen aparece por un puerto distinto, la tabla se actualiza con el puerto más reciente.

## 8. Estados STP

Completa la tabla de estados STP:

| Estado | ¿Reenvía tráfico? | ¿Aprende MACs? | Tiempo |
|---|---|---|---|
| Blocking | No | ... | ... |
| Listening | ... | No | 15 s |
| Learning | No | ... | ... |
| Forwarding | ... | Sí | Indefinido |

a) ¿Cuál es el orden exacto de los estados desde que se activa el puerto?
b) ¿Cuánto tarda un puerto STP en pasar de blocking a forwarding si no hay fallos?
c) ¿En qué estado está un puerto que ya reenvía tráfico y aprende MACs?

**Pista:** solo Learning aprende sin reenviar, y solo Forwarding reenvía. Suma los tiempos de los estados intermedios.