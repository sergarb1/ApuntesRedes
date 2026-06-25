---
title: Boletín U09 — Avanzado (Resuelto)
description: Soluciones ejercicios avanzados de Routing Dinámico
---

# ✅ Boletín U09 — Avanzado (Resuelto)

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

d) **No se ve directamente.** Pero por contexto, si este router tiene vecinos en G0/0 y G0/1, su Router ID podría ser otro (el más alto de sus loopbacks o interfaces físicas).

## 3. Redistribución OSPF

a) `redistribute static subnets` inyecta las rutas estáticas configuradas en el router al proceso OSPF, para que otros routers OSPF aprendan esas rutas.

b) **Dos rutas:** la ruta por defecto (0.0.0.0/0) y la ruta estática 10.100.0.0/16.

c) **Sí.** La redistribución + `default-information originate` propaga ambas rutas a todos los routers OSPF en todos los áreas.

## 4. Cambio de coste OSPF

a) **Camino A** (coste 1+1+1 = 3) aunque tenga más routers en FastEthernet (cada enlace tiene coste 1). OSPF elige el camino con menor coste total. Los dos caminos tienen el mismo coste si todos los enlaces son del mismo tipo. Si ambos tienen coste 1+1+1 vs 1+1+1+1, gana el de 3 saltos (menos coste).

b) Para forzar el Camino B, aumentar el coste en los enlaces de A:
   ```bash
   R1(config-if)# ip ospf cost 10
   ```

c) `show ip ospf interface` o `show ip route` muestra el coste de cada ruta.

## 5. DR/BDR election

a) **DR: R3** (prioridad 10, la más alta). **BDR: R4** (prioridad 5, segunda más alta).

b) Prioridad **0** significa que el router **no participa** en la elección de DR/BDR. Nunca será DR ni BDR.

c) Cambiar la **prioridad** de R1 a un valor más alto que 10:
   ```bash
   R1(config-if)# ip ospf priority 20
   ```
   (Nota: la elección solo ocurre al iniciar OSPF o al reiniciar el proceso)

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
