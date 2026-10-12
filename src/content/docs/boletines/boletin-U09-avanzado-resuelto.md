---
title: Boletín de OSPF — Avanzado (Resuelto)
description: Soluciones de los ejercicios avanzados de Routing Dinámico
---

# ✅ Boletín de OSPF — Avanzado (Resuelto)

---

## 1. Configuración OSPF multiárea

**R1:**
```bash
interface loopback 0
 ip address 1.1.1.1 255.255.255.255
interface g0/0
 ip address 192.168.1.1 255.255.255.0
interface g0/1
 ip address 192.168.2.1 255.255.255.0
interface g0/2
 ip address 10.0.0.1 255.255.255.252
router ospf 1
 router-id 1.1.1.1
 network 192.168.1.0 0.0.0.255 area 0
 network 192.168.2.0 0.0.0.255 area 0
 network 10.0.0.0 0.0.0.3 area 0
```

**R2 (ABR):**
```bash
interface loopback 0
 ip address 2.2.2.2 255.255.255.255
interface g0/0
 ip address 10.0.0.2 255.255.255.252
interface g0/1
 ip address 10.0.0.5 255.255.255.252
router ospf 1
 router-id 2.2.2.2
 network 10.0.0.0 0.0.0.3 area 0
 network 10.0.0.4 0.0.0.3 area 1
```

**R3:**
```bash
interface loopback 0
 ip address 3.3.3.3 255.255.255.255
interface g0/0
 ip address 192.168.3.1 255.255.255.0
interface g0/1
 ip address 10.0.0.6 255.255.255.252
router ospf 1
 router-id 3.3.3.3
 network 192.168.3.0 0.0.0.255 area 1
 network 10.0.0.4 0.0.0.3 area 1
```

## 2. Diagnóstico OSPF

a) **FULL/DR:** El vecino 3.3.3.3 es el DR y la adyacencia está completa (FULL). Es normal en Ethernet.

b) **2WAY/DROTHER:** El vecino 4.4.4.4 no es DR ni BDR (DROTHER). La adyacencia está en 2WAY, que es el estado normal entre DROTHERS (no intercambian LSAs directamente, solo con el DR).

c) **Porque no es necesario.** En redes multiacceso, los DROTHERS solo forman adyacencia FULL con el DR y BDR. Entre DROTHERS se quedan en 2WAY.

d) **No aparece en esa salida** (los `Neighbor ID` son los de los vecinos): no es 3.3.3.3 ni 4.4.4.4, y a juzgar por los estados este router es **DROTHER** — si fuera BDR, el vecino 4.4.4.4 estaría en FULL con él, no en 2WAY. El tuyo lo ves con `show ip ospf`.

## 3. Redistribución OSPF

a) `redistribute static subnets` inyecta las rutas estáticas configuradas en el router al proceso OSPF, para que otros routers OSPF aprendan esas rutas.

b) **Dos rutas:** la ruta por defecto (0.0.0.0/0) y la ruta estática 10.100.0.0/16.

c) **Sí.** `redistribute static subnets` inyecta en OSPF las dos estáticas de la tabla (tanto la 10.100.0.0/16 como la 0.0.0.0/0) y `default-information originate` se asegura de anunciar además la ruta por defecto como externa E2: entre los dos comandos, todos los routers OSPF terminan aprendiendo las dos rutas.

## 4. Cambio de coste OSPF

a) **Camino A** (R1→R2→R3, 2 enlaces Gigabit) tiene coste **1 + 1 = 2**. El **Camino B** (R1→R4→R5→R3, 3 enlaces FastEthernet) tiene coste **1 + 1 + 1 = 3**. OSPF elige el de menor coste total: **el Camino A**.

b) Para forzar el Camino B, aumentar el coste en los enlaces de A:
   ```bash
   R1(config-if)# ip ospf cost 10
   ```

c) `show ip ospf interface` o `show ip route` muestra el coste de cada ruta.

## 5. DR/BDR election

a) **DR: R3** (prioridad 10, la más alta). **BDR: R4** (prioridad 5, segunda más alta).

b) Cambiar la **prioridad** de R1 a un valor más alto que 10:
   ```bash
   R1(config-if)# ip ospf priority 20
   ```
   (Nota: la elección se hace al iniciar OSPF, al reiniciar el proceso o si falla el DR: el BDR asciende y se elige otro)

## 6. Troubleshooting OSPF

**Paso 1:** Verificar conectividad capa 3 → `ping` entre routers vecinos. Si no hay ping, el problema está en capa 1 o 2.

**Paso 2:** Verificar que las interfaces están activas → `show ip interface brief`. Buscar "up/up".

**Paso 3:** Verificar que OSPF está configurado → `show ip protocols`. Debe mostrar OSPF con Router ID y redes declaradas.

**Paso 4:** Verificar vecinos → `show ip ospf neighbor`. Si no hay vecinos, comprobar:
- `network` declarada correctamente (wildcard, área)
- Hello/Dead timers coinciden (por defecto 10/40 en broadcast)
- No hay ACL bloqueando protocolo 89 (OSPF)

**Paso 5:** Verificar LSDB → `show ip ospf database`. Debe haber LSAs de todos los routers.

**Paso 6:** Verificar tabla de rutas → `show ip route ospf`. Las rutas deben aparecer con prefijo O (OSPF).

## 7. Elección DR/BDR en otro segmento

a) **DR: R-B** (prioridad 200, la más alta). **BDR: R-C** (prioridad 150, segunda más alta).

b) **R-D** tiene prioridad **0**: no participa en la elección. Solo actuará como **DROTHER**, sincronizándose con el DR y el BDR sin poder ser elegido.

c) **R-B** — con prioridades empatadas (1 = 1), el desempate lo hace el **Router ID más alto** (10.0.0.2 > 10.0.0.1). La prioridad manda primero; el Router ID solo decide empates.

d) **No cambia.** La elección de DR/BDR se hace al arrancar OSPF, al reiniciar el proceso o si falla el DR (el BDR asciende); subir la prioridad de R-C a 255 no destrona al DR ya elegido (R-B). Para que cambie tendrías que **reiniciar el proceso OSPF** (o el router) en los routers del segmento, y entonces R-C (prioridad 255) ganaría.

## 8. La adyacencia que no levanta

a) Al funcionar el ping, queda **descartado el plano físico/enlace y la capa 3** del enlace: las IPs se alcanzan. El problema está en el **plano OSPF** (configuración lógica del protocolo), no en la conectividad.

b) **Orden de diagnóstico:**
1. `show ip protocols` → comprobar que OSPF arranca en ambos, que el **Router ID** no está duplicado y que las redes declaradas incluyen el enlace Serial.
2. `show ip ospf interface` → confirmar en ambos routers que la interfaz **participa** en OSPF, y comparar **área**, **wildcard** y **timers** (Hello/Dead). Si no aparece, la red no está declarada o la wildcard está mal.
3. Verificar que el **área** coincide en los dos lados del enlace (revisar el `network ... area X`).
4. Comparar los **timers Hello/Dead** en ambos lados con `show ip ospf interface`: deben coincidir (por defecto 10/40 en broadcast y punto a punto Serial; solo en redes NBMA son 30/120). Si uno quedó con valores distintos, no forman vecindad.
5. `show access-lists` (y contadores en la interfaz) → descartar una **ACL** que bloquee el **protocolo 89 (OSPF)** en el sentido de entrada/salida.
6. Solo si todo lo anterior está bien, subir un nivel: `debug ip ospf events` (con cuidado) para ver por qué se rechaza el Hello.

c) `show ip ospf interface <interfaz>`: si la interfaz aparece listada con su área y sus timers, está **participando en OSPF sin ambigüedad**. Si no sale, OSPF no la tiene declarada (falta `network` o wildcard incorrecta).