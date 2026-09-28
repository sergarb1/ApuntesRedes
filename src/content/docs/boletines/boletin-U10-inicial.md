---
title: Boletín de ACL y seguridad — Inicial
description: Ejercicios básicos de ACLs y seguridad de red
---

# 📝 Boletín de ACL y seguridad — Inicial

> Ejercicios básicos para afianzar los conceptos de ACLs y seguridad de red.

---

## 1. Verdadero o falso

a) Las ACLs estándar filtran solo por IP origen.
b) Al final de toda ACL hay un permit any implícito.
c) Una ACL extendida puede filtrar por protocolo y puerto.
d) Una ACL sin ninguna línea `permit` bloquea todo el tráfico que le llega.
e) `show access-lists` muestra las ACLs configuradas y sus contadores.

## 2. Números de ACL

¿Qué rango de números usan las ACLs estándar y extendidas?

| Tipo | Rango |
|---|---|
| Estándar | |
| Extendida | |

## 3. ¿Qué comando?

Relaciona el comando con su función:

| Comando | Función |
|---|---|
| 1. `ip access-group 10 out` | a) Crear ACL nombrada extendida |
| 2. `access-list 10 permit ...` | b) Aplicar ACL a interfaz |
| 3. `ip access-list extended MI_ACL` | c) Ver las ACLs y sus contadores |
| 4. `show access-lists` | d) Crear ACL numerada estándar |

## 4. Wildcard masks

Las ACLs usan *wildcard masks*, el inverso de la máscara de subred. Para cada máscara de subred, escribe su wildcard y qué representa (qué bits quedan libres para cualquier valor):

| Máscara de subred | Wildcard | ¿Qué representa? |
|---|---|---|
| 255.255.255.0 | | |
| 255.255.255.255 | | |
| 255.255.0.0 | | |

## 5. ACL básica

Escribe los comandos para:

a) Crear una ACL estándar que permita la red 192.168.1.0/24
b) Aplicarla a la interfaz G0/1 en sentido outbound

## 6. Estándar o extendida

¿Qué tipo de ACL usarías en cada caso y por qué?

a) Bloquear a un host concreto de la LAN que hace escaneos.
b) Permitir solo HTTP/HTTPS de la VLAN 30 hacia el servidor web interno.
c) Filtrar por IP origen en un router antiguo con muy poca CPU.

## 7. ¿Dónde aplico la ACL?

Regla práctica: la estándar se coloca **cerca del destino** y la extendida **cerca del origen**. En este escenario (PC1 en LAN-A, servidor en LAN-B, R1 en medio), ¿dónde aplicarías cada ACL y en qué sentido?

a) ACL estándar que bloquea a PC1 llegar al servidor.
b) ACL extendida que permite solo HTTP de LAN-A al servidor.

## 8. Comandos de verificación

Relaciona cada comando de verificación con su utilidad:

| Comando | Utilidad |
|---|---|
| 1. `show access-lists` | a) Ver qué ACL está aplicada a cada interfaz y sentido |
| 2. `show ip interface` | b) Ver contadores de matches por línea de la ACL |
| 3. `show running-config` | c) Ver las líneas exactas de la ACL tal como se configuraron |
