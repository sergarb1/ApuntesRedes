---
title: Boletín de Enrutamiento estático — Inicial
description: Ejercicios básicos de enrutamiento estático
---

# 📝 Boletín de Enrutamiento estático — Inicial

> Ejercicios básicos para afianzar los conceptos del router y las rutas estáticas.

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
c) Una ruta estática con next-hop inalcanzable se instala igualmente en la tabla.
d) La métrica de una ruta estática es siempre 0.
e) `show ip route` muestra la tabla de rutas.

## 3. ¿Qué comando?

Relaciona el comando con su función:

| Comando | Función |
|---|---|
| 1. `ip route 0.0.0.0 0.0.0.0 10.0.0.2` | a) Ver interfaces: IP, estado y protocolo |
| 2. `show ip route` | b) Ver solo la tabla de rutas |
| 3. `show ip interface brief` | c) Configurar ruta por defecto |
| 4. `ip route 192.168.2.0 255.255.255.0 10.0.0.2` | d) Configurar ruta estática a una red concreta |

## 4. Modos del router

Ordena los modos de configuración del router (de menor a mayor privilegio):

a) Configuración global (`Router(config)#`)
b) Usuario (`Router>`)
c) Configuración de interfaz (`Router(config-if)#`)
d) Privilegiado (`Router#`)

## 5. Anatomía de una ruta

En la salida `S 192.168.3.0/24 [1/0] via 10.0.0.2`, identifica qué es cada trozo:

| Trozo | ¿Qué significa? |
|---|---|
| `S` | |
| `192.168.3.0/24` | |
| `[1/0]` | |
| `via 10.0.0.2` | |

## 6. Tu primera ruta estática

R1 tiene la LAN 192.168.1.0/24 y en G0/1 la IP 10.0.0.1/30. R2 está en 10.0.0.2 y detrás de él vive la red 192.168.2.0/24.

Escribe el comando exacto para que R1 llegue a 192.168.2.0/24.

## 7. ¿Ruta por defecto o ruta específica?

Un router de una sucursal pequeña con una única salida a Internet. ¿Qué prefieres configurar: una ruta por defecto o 50 rutas específicas? ¿Por qué?

## 8. Verificación

Has configurado una ruta estática pero el ping falla. ¿Qué tres comandos usarías, en qué orden y qué mirarías en cada uno?
