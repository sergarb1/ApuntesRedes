---
title: Boletín U08 — Simple
description: Ejercicios básicos de Routing y ACLs
---

# 📝 Boletín U08 — Simple

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

Escribe el comando para:

a) Crear una ACL estándar que permita la red 192.168.1.0/24
b) Aplicarla a la interfaz G0/1 en sentido outbound
