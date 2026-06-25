---
title: Boletín U08 — Simple (Resuelto)
description: Soluciones ejercicios básicos de Routing y ACLs
---

# ✅ Boletín U08 — Simple (Resuelto)

---

## 1. Componentes del router

1 → b (RAM: configuración activa, tabla de rutas)
2 → c (NVRAM: startup-config)
3 → a (Flash: IOS)
4 → d (ROM: ROMMON)

## 2. Verdadero o falso

a) **Verdadero.** Las rutas estáticas se configuran con `ip route`.
b) **Verdadero.** 0.0.0.0/0 es la ruta de último recurso.
c) **Falso.** Las ACLs estándar filtran solo por IP origen.
d) **Falso.** Al final hay un **deny any** implícito, no permit.
e) **Verdadero.** `show ip route` muestra las rutas del router.

## 3. ¿Qué comando?

1 → c (`ip route 0.0.0.0 0.0.0.0` = ruta por defecto)
2 → d (`show ip route` = tabla de rutas)
3 → b (`ip access-group` = aplicar ACL)
4 → a (`ip route` con red específica = ruta estática)

## 4. Números de ACL

| Tipo | Rango |
|---|---|
| Estándar | **1-99, 1300-1999** |
| Extendida | **100-199, 2000-2699** |

## 5. Modos del router

1. b) Usuario (`Router>`)
2. d) Privilegiado (`Router#`)
3. a) Configuración global (`Router(config)#`)
4. c) Configuración de interfaz (`Router(config-if)#`)

## 6. ACL básica

a) `access-list 10 permit 192.168.1.0 0.0.0.255`
b) `interface g0/1` → `ip access-group 10 out`
