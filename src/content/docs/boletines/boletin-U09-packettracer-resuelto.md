---
title: Boletín de OSPF — Packet Tracer resuelto
description: Soluciones paso a paso de las prácticas de OSPF de una sola área en Packet Tracer ✅
---

> Misma numeración y enunciados que el [por-resolver](/ApuntesRedes/boletines/boletin-u09-packettracer). Comandos, valores exactos y qué deberías ver en cada paso.

---

## 1. Las tres redes, en pie y sin OSPF

**Solución:**

```
! R1
R1(config)# interface g0/0
R1(config-if)# ip address 192.168.1.1 255.255.255.0
R1(config-if)# no shutdown
R1(config)# interface g0/1
R1(config-if)# ip address 10.0.0.1 255.255.255.252
R1(config-if)# no shutdown

! R2
R2(config)# interface g0/0
R2(config-if)# ip address 10.0.0.2 255.255.255.252
R2(config-if)# no shutdown
R2(config)# interface g0/1
R2(config-if)# ip address 192.168.2.1 255.255.255.0
R2(config-if)# no shutdown
R2(config)# interface g0/2
R2(config-if)# ip address 10.0.1.1 255.255.255.252
R2(config-if)# no shutdown

! R3
R3(config)# interface g0/0
R3(config-if)# ip address 10.0.1.2 255.255.255.252
R3(config-if)# no shutdown
R3(config)# interface g0/1
R3(config-if)# ip address 192.168.3.1 255.255.255.0
R3(config-if)# no shutdown
```

**Esperado:** los cuatro pings de vecino responden. `show ip route` en R1 muestra solo `C` y `L` de `192.168.1.0/24` y `10.0.0.0/30`: **ninguna** ruta hacia la LAN2 ni la LAN3.

---

## 2. OSPF en R1 y R2: los vecinos se saludan

**Solución:**

```
R1(config)# router ospf 1
R1(config-router)# router-id 1.1.1.1
R1(config-router)# network 192.168.1.0 0.0.0.255 area 0
R1(config-router)# network 10.0.0.0 0.0.0.3 area 0

R2(config)# router ospf 1
R2(config-router)# router-id 2.2.2.2
R2(config-router)# network 10.0.0.0 0.0.0.3 area 0
R2(config-router)# network 192.168.2.0 0.0.0.255 area 0
```

**Esperado en `show ip ospf neighbor` de R1:**

```
Neighbor ID     Pri   State           Dead Time   Address         Interface
2.2.2.2           1   FULL/DR         00:00:36    10.0.0.2        GigabitEthernet0/1
```

Y en `show ip route ospf` de R1: `O 192.168.2.0/24 [110/2] via 10.0.0.2`. El `ping` de `PC1` a `PC2` funciona.

> ℹ️ `FULL/DR` significa adyacencia completa y que R2 es el router designado de ese segmento. En un enlace punto a punto entre dos routers verás `FULL/DR` o `FULL/BDR`; lo importante es el `FULL`.

---

## 3. R3 se une a la fiesta

**Solución:**

```
R3(config)# router ospf 1
R3(config-router)# router-id 3.3.3.3
R3(config-router)# network 10.0.1.0 0.0.0.3 area 0
R3(config-router)# network 192.168.3.0 0.0.0.255 area 0
```

**Esperado en R1:** aparecen dos rutas nuevas sin tocar nada más:

```
O    192.168.2.0/24 [110/2] via 10.0.0.2, 00:00:12, GigabitEthernet0/1
O    192.168.3.0/24 [110/3] via 10.0.0.2, 00:00:12, GigabitEthernet0/1
```

`ping` de `PC1` a `PC3` responde y `traceroute` cuenta 3 saltos (R1, R2 y R3). La métrica 3 es la suma de costes: enlace R1↔R2 (1) + enlace R2↔R3 (1) + la interfaz de salida de R3 hacia la LAN (1). Cada GigabitEthernet vale 1 porque `100 Mbps / 1000 Mbps = 0,1`, y OSPF redondea al alza a 1.

---

## 4. Fallo 1: la wildcard que no es una wildcard

**Solución:**

1. En R1: `no network 192.168.1.0 0.0.0.255 area 0` y luego `network 192.168.1.0 255.255.255.0 area 0`.
2. Diagnóstico:
   - `show ip ospf interface` en R1 → solo aparece `GigabitEthernet0/1`; `G0/0` **no** tiene OSPF activo.
   - `show ip protocols` → la red aparece listada, pero con una wildcard que no coincide con ninguna interfaz.
   - `show ip ospf neighbor` en R1 → **sigue `FULL`**: la adyacencia va por el enlace, que está bien declarado.
   - `show ip route ospf` en R2 y R3 → **no hay ruta** hacia `192.168.1.0/24`, porque nadie la ha anunciado.
3. Arreglo: volver a `0.0.0.255` → `show ip ospf interface` lista `G0/0` y la ruta `O` reaparece en los vecinos en segundos.

**Lección:** una wildcard de `255.255.255.0` no «equivale» a la máscara; selecciona direcciones completamente distintas. El síntoma (vecinos bien, red que falta) delata este fallo.

---

## 5. Fallo 2: un área que no coincide

**Solución:**

```
! En R3
R3(config)# router ospf 1
R3(config-router)# no network 10.0.1.0 0.0.0.3 area 0
R3(config-router)# network 10.0.1.0 0.0.0.3 area 1
```

**Esperado y diagnóstico:**

- `show ip ospf neighbor` en R2 y en R3 → **vacío** (o el vecino atascado en `INIT`/`DOWN`): la adyacencia no se forma.
- `show ip ospf interface g0/2` en R2 → `Area 0.0.0.0`; en R3, `G0/0` → `Area 0.0.0.1`. El área es parte de la negociación: hellos que llegan con otra área se descartan.
- El `ping` entre `10.0.1.1` y `10.0.1.2` **sí funciona**: la capa 3 está bien, el problema es del protocolo.

**Arreglo:** devolver el `no network ... area 1` + `network 10.0.1.0 0.0.0.3 area 0` en R3 → los vecinos vuelven a `FULL` y las rutas `O` reaparecen.

---

## 6. El coste: cambiar la nota del camino

**Solución:**

```
R2(config)# interface g0/2
R2(config-if)# ip ospf cost 50
```

**Esperado en R1, `show ip route 192.168.3.0`:**

```
O    192.168.3.0/24 [110/52] via 10.0.0.2, 00:00:05, GigabitEthernet0/1
```

`show ip ospf interface g0/2` en R2 muestra `Cost: 50`. El paquete sigue llegando porque solo hay un camino, pero la métrica ha pasado de 3 a 52 (1 + 50 + 1).

```
R2(config)# interface g0/2
R2(config-if)# no ip ospf cost 50
```

**Si existiera un segundo camino** hacia la LAN3, OSPF elegiría el de menor coste total; con costes iguales, instalaría las dos rutas y repartiría el tráfico (equal-cost). El coste no es «cuántos routers hay», es la suma de lo que cuesta cada enlace.

---

## 7. La ruta por defecto también viaja por OSPF

**Solución:**

```
! ISP
ISP(config)# interface g0/0
ISP(config-if)# ip address 203.0.113.1 255.255.255.252
ISP(config-if)# no shutdown
ISP(config)# interface loopback 0
ISP(config-if)# ip address 8.8.8.8 255.255.255.255
ISP(config)# ip route 192.168.0.0 255.255.252.0 203.0.113.2

! R3
R3(config)# interface g0/2
R3(config-if)# ip address 203.0.113.2 255.255.255.252
R3(config-if)# no shutdown
R3(config)# ip route 0.0.0.0 0.0.0.0 203.0.113.1
R3(config)# router ospf 1
R3(config-router)# default-information originate
```

**Esperado en R1 y R2:**

```
O*E2 0.0.0.0/0 [110/1] via 10.0.0.2, 00:00:20, GigabitEthernet0/1   ← R1
```

`ping 8.8.8.8` desde `PC1` con respuestas: ida por la ruta por defecto de OSPF hasta R3 y salida al ISP; vuelta por el resumen `192.168.0.0/22` del ISP.

> ⚠️ `E2` significa que el coste del camino externo **no se acumula** (se queda en 1): por defecto, las rutas externas de OSPF son de tipo 2.

---

## 8. Fallo 3 + reto: la red que se quedó fuera

**Solución:**

1. En R3: `no network 192.168.3.0 0.0.0.255 area 0` y `network 192.168.30.0 0.0.0.255 area 0`.
2. Diagnóstico:
   - `show ip ospf neighbor` → **FULL** en R1, R2 y R3: la vecindad va por el enlace, que está bien declarado.
   - `show ip ospf interface` en R3 → `G0/1` **no aparece**, porque ninguna de sus direcciones cae en `192.168.30.0/24`.
   - `show ip protocols` en R3 → la red anunciada es la equivocada (un cero de más).
   - `show ip route 192.168.3.0` en R1 → sin ruta; `ping` de `PC1` a `PC3` falla, pero `ping` de R1 a `10.0.1.2` funciona.
3. Arreglo: borrar la línea mal escrita y declarar la correcta → R1 recupera `O 192.168.3.0/24`.
4. Checklist de diagnóstico OSPF, en orden:
   - `show ip ospf neighbor` → ¿hay adyacencia y en qué estado?
   - `show ip ospf interface` → ¿está la interfaz en OSPF, con qué área y qué coste?
   - `show ip protocols` → ¿qué redes y wildcards se están anunciando?
   - `show ip route ospf` → ¿qué rutas han llegado?
   - `show ip ospf database` → ¿está el LSA de esa red en la LSDB?

**Lección:** `FULL` solo demuestra que dos routers se hablan. Que las **redes** estén bien declaradas es otra historia, y se comprueba en `show ip ospf interface` / `show ip protocols`.

---

## 📋 Criterios de esta práctica

| Ejercicio | Concepto | Punto |
|---|---|---|
| 1 | Direccionamiento y redes conectadas | 1–3 |
| 2 | `router ospf`, `router-id` y `network` con wildcard | 7 |
| 3 | Adyacencia y rutas `O` | 3, 7 |
| 4 | Wildcard incorrecta (fallo) | 7 |
| 5 | Área distinta entre vecinos (fallo) | 3–4 |
| 6 | Coste OSPF y métrica | 6 |
| 7 | Ruta por defecto con `default-information originate` | 8 |
| 8 | Red no anunciada (fallo) + checklist | 8 |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/09-ospf) · **También:** [Por resolver](/ApuntesRedes/boletines/boletin-u09-packettracer)
