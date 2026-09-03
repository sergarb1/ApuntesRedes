---
title: Boletín U10 — Avanzado
description: Ejercicios avanzados de Routing Dinámico
---

# 📝 Boletín U10 — Avanzado

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

## 7. Elección DR/BDR en otro segmento

En un segmento Ethernet nuevo compiten 4 routers OSPF:

| Router | Prioridad | Router ID |
|---|---|---|
| R-A | 1 | 10.0.0.1 |
| R-B | 200 | 10.0.0.2 |
| R-C | 150 | 10.0.0.3 |
| R-D | 0 | 10.0.0.4 |

a) ¿Quién es el DR y quién el BDR?
b) ¿Qué papel juega R-D y por qué?
c) R-A y R-B empiezan con la misma prioridad (1) pero R-B tiene el Router ID más alto. ¿Quién ganaría en ese caso, y por qué?
d) La elección ya ha ocurrido y el DR es R-B. Si ahora subes la prioridad de R-C a 255, ¿cambia el DR? ¿Qué tendrías que hacer para que cambie?

**Pista:** la elección se decide por prioridad y, en empate, por el Router ID más alto. Prioridad 0 queda fuera. La elección solo ocurre al arrancar o reiniciar el proceso OSPF.

## 8. La adyacencia que no levanta

R1 y R2 están conectados por un enlace Serial, ambos con OSPF configurado, pero `show ip ospf neighbor` sale vacío en los dos. El ping entre las IPs del enlace **sí funciona**.

a) Como el ping funciona, ¿qué nivel queda descartado? ¿Por qué?
b) Escribe el orden de diagnóstico completo que seguirías, con los comandos y qué esperarías ver en cada paso, para descartar, en orden: red no declarada o wildcard mal, área incorrecta, timers Hello/Dead distintos, y ACL que bloquea OSPF (protocolo 89).
c) ¿Qué comando te confirmaría, sin ambigüedad, que una interfaz está participando en OSPF y con qué área?

**Pista:** sigue la escalera de diagnóstico del punto 8 de la unidad: `show ip protocols`, `show ip ospf interface`, `show access-lists`. Los timers de Hello/Dead por defecto son 10/40 en broadcast, pero en enlaces punto a punto Serial suelen ser 30/120.