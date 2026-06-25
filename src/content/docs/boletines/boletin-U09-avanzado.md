---
title: Boletín U09 — Avanzado
description: Ejercicios avanzados de Routing Dinámico
---

# 📝 Boletín U09 — Avanzado

> Ejercicios que requieren aplicar conceptos de OSPF de forma más profunda.

---

## 1. Configuración OSPF multiárea

Configura OSPF para esta topología:

```
R1 (Área 0) ──── R2 (ABR) ──── R3 (Área 1)
  │                             │
LAN1 (192.168.1.0/24)      LAN3 (192.168.3.0/24)
LAN2 (192.168.2.0/24)
```

**Enlaces:**
- R1-R2: 10.0.0.0/30
- R2-R3: 10.0.0.4/30

Escribe la configuración completa de OSPF en los 3 routers.

## 2. Diagnóstico OSPF

Un router muestra esto en `show ip ospf neighbor`:

```
Neighbor ID     Pri   State           Dead Time   Address         Interface
3.3.3.3         1    FULL/DR         00:00:35    10.0.0.2        GigabitEthernet0/0
4.4.4.4         1    2WAY/DROTHER    00:00:37    10.0.0.6        GigabitEthernet0/1
```

a) ¿Qué significa FULL/DR?
b) ¿Qué significa 2WAY/DROTHER?
c) ¿Por qué el vecino 4.4.4.4 no está FULL?
d) ¿Cuál es el Router ID de este router? (pista: no se muestra)

## 3. Redistribución OSPF

Un router tiene esta configuración:

```
router ospf 1
 redistribute static subnets
 default-information originate
!
ip route 0.0.0.0 0.0.0.0 serial 0/0/0
ip route 10.100.0.0 255.255.0.0 10.0.0.2
```

a) ¿Qué hace `redistribute static subnets`?
b) ¿Qué rutas estáticas se redistribuyen a OSPF?
c) ¿Todos los routers OSPF recibirán la ruta 10.100.0.0/16?

## 4. Cambio de coste OSPF

Tienes 2 caminos de R1 a R3:
- Camino A: R1 → R2 → R3 (todos GigabitEthernet, coste 1 cada enlace)
- Camino B: R1 → R4 → R5 → R3 (todos FastEthernet, coste 1 cada enlace)

a) ¿Qué camino elige OSPF? ¿Por qué?
b) ¿Cómo forzarías OSPF a usar el Camino B?
c) ¿Qué comando usarías para verificar el coste de cada ruta?

## 5. DR/BDR election

En una red con 4 routers OSPF en el mismo segmento Ethernet:

| Router | Prioridad | Router ID |
|---|---|---|
| R1 | 1 | 1.1.1.1 |
| R2 | 0 | 2.2.2.2 |
| R3 | 10 | 3.3.3.3 |
| R4 | 5 | 4.4.4.4 |

a) ¿Quién es el DR? ¿Quién el BDR?
b) ¿Por qué R2 (prioridad 0) no puede ser DR/BDR?
c) ¿Cómo forzarías a R1 como DR sin cambiar Router ID?

## 6. Troubleshooting OSPF

Un administrador reporta que OSPF no funciona entre dos routers. Escribe el orden de diagnóstico que seguirías, incluyendo qué comandos usarías y qué esperarías ver en cada paso.
