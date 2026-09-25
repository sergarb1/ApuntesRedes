---
title: Boletín de ACL y seguridad — Inicial (Resuelto)
description: Soluciones de los ejercicios básicos de ACLs y seguridad de red
---

# ✅ Boletín de ACL y seguridad — Inicial (Resuelto)

---

## 1. Verdadero o falso

a) **Verdadero.** Solo IP origen (o rechaza todo lo demás). Para origen+destino+puerto, extendida.
b) **Falso.** Al final hay un **deny any** implícito, no permit.
c) **Verdadero.** Protocolo (IP, TCP, UDP, ICMP…), IP origen/destino y puerto de origen/destino.
d) **Verdadero.** Con solo líneas deny, el deny any implícito del final rechaza todo: la ACL corta el 100% del tráfico que evalúa.
e) **Verdadero.** Y con contadores de matches por línea, muy útil para diagnosticar.

## 2. Números de ACL

| Tipo | Rango |
|---|---|
| Estándar | **1-99, 1300-1999** |
| Extendida | **100-199, 2000-2699** |

## 3. ¿Qué comando?

1 → b (`ip access-group` = aplicar ACL a interfaz)
2 → d (`access-list` numerada estándar)
3 → a (`ip access-list extended` = ACL nombrada extendida)
4 → c (`show access-lists` = ACLs y contadores)

## 4. Wildcard masks

La wildcard es el **inverso** de la máscara de subred (restando cada octeto a 255):

| Máscara de subred | Wildcard | ¿Qué representa? |
|---|---|---|
| 255.255.255.0 | `0.0.0.255` | Los 24 primeros bits fijos: una red /24 |
| 255.255.255.255 | `0.0.0.0` | Todos los bits fijos: **solo esa IP** (host exacto) |
| 255.255.0.0 | `0.0.255.255` | Los 16 primeros bits fijos: una red /16 |

## 5. ACL básica

a) `access-list 10 permit 192.168.1.0 0.0.0.255`
b) `interface g0/1` → `ip access-group 10 out`

## 6. Estándar o extendida

a) **Estándar.** Solo filtra por origen, y solo hay un origen que bloquear: el host escaneador. Además la estándar es más ligera.
b) **Extendida.** Filtra protocolo (TCP) y puerto (80/443), cosa que la estándar no puede.
c) **Estándar.** Es el escenario clásico de la estándar: menos CPU y solo interesa el origen.

## 7. ¿Dónde aplico la ACL?

a) **Cerca del destino**: en R1, interfaz hacia LAN-B, sentido **out**. (Otra opción correcta: en la interfaz que recibe el tráfico de PC1, sentido in.) La estándar se coloca cerca del destino para no filtrar de más en el camino.
b) **Cerca del origen**: en R1, interfaz hacia LAN-A, sentido **in**. La extendida filtra con precisión (protocolo+puerto), así que conviene cortar el tráfico lo antes posible y no consumir ancho de banda en vano.

## 8. Comandos de verificación

1 → b (`show access-lists` muestra contadores de matches por línea)
2 → a (`show ip interface` indica la ACL aplicada y el sentido)
3 → c (`show running-config` muestra las líneas tal como las escribiste)