---
title: Boletín U09 — Inicial
description: Ejercicios básicos de Routing y ACLs
---

# 📝 Boletín U09 — Inicial

> Ejercicios básicos para afianzar los conceptos de routing y ACLs.

---

## 1. Componentes del router

Relaciona cada componente con su función:

| Componente | Función |
|---|---|
| 1. RAM | a) Almacena el IOS |
| 2. NVRAM | b) Configuración en ejecución |
| 3. Flash | c) Startup-config |
| 4. ROM | d) Monitor de recuperación |

## 2. Verdadero o falso

a) Una ruta estática se configura manualmente.
b) La ruta por defecto es 0.0.0.0/0.
c) Las ACLs estándar filtran por IP origen y destino.
d) Al final de toda ACL hay un permit any implícito.
e) `show ip route` muestra la tabla de rutas.

## 3. ¿Qué comando?

Relaciona el comando con su función:

| Comando | Función |
|---|---|
| 1. `ip route 0.0.0.0 0.0.0.0 10.0.0.2` | a) Configurar ruta estática |
| 2. `show ip route` | b) Aplicar ACL a interfaz |
| 3. `ip access-group 10 out` | c) Configurar ruta por defecto |
| 4. `ip route 192.168.2.0 255.255.255.0 10.0.0.2` | d) Mostrar tabla de rutas |

## 4. Números de ACL

¿Qué rango de números usan las ACLs estándar y extendidas?

| Tipo | Rango |
|---|---|
| Estándar | |
| Extendida | |

## 5. Modos del router

Ordena los modos de configuración del router (de menor a mayor privilegio):

a) Configuración global (`Router(config)#`)
b) Usuario (`Router>`)
c) Configuración de interfaz (`Router(config-if)#`)
d) Privilegiado (`Router#`)

## 6. ACL básica

Escribe los comandos para:

a) Crear una ACL estándar que permita la red 192.168.1.0/24
b) Aplicarla a la interfaz G0/1 en sentido outbound

## 7. Wildcard masks

Las ACLs usan *wildcard masks*, el inverso de la máscara de subred. Para cada máscara de subred, escribe su wildcard y qué representa (qué bits quedan libres para cualquier valor):

| Máscara de subred | Wildcard | ¿Qué representa? |
|---|---|---|
| 255.255.255.0 | | |
| 255.255.255.255 | | |
| 255.255.0.0 | | |

## 8. Comandos de verificación

Relaciona cada comando de verificación con su utilidad:

| Comando | Utilidad |
|---|---|
| 1. `show ip route` | a) Ver qué ACLs están aplicadas y sus contadores |
| 2. `show access-lists` | b) Resumen de interfaces: IP, estado y protocolo |
| 3. `show ip interface brief` | c) Ver la tabla de rutas del router |