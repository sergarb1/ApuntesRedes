---
title: Boletín U09 — Simple (Resuelto)
description: Soluciones ejercicios básicos de Routing Dinámico
---

# ✅ Boletín U09 — Simple (Resuelto)

---

## 1. IGP vs EGP

a) OSPF → **IGP**
b) BGP → **EGP**
c) RIP → **IGP**
d) EIGRP → **IGP** (propietario Cisco, pero interior)

## 2. Verdadero o falso

a) **Verdadero.** OSPF usa SPF (Dijkstra) para calcular la ruta más corta.
b) **Verdadero.** RIP máximo 15 saltos. 16 = inalcanzable.
c) **Verdadero.** Todas las áreas deben conectarse al Área 0.
d) **Verdadero.** El Router ID debe ser único o las adyacencias fallan.
e) **Falso.** OSPF converge en segundos, RIP tarda minutos.

## 3. Relaciona

1 → b (LSA = Link State Advertisement)
2 → c (LSDB = Link State Database)
3 → a (ABR = Area Border Router)
4 → d (SPF = Shortest Path First)

## 4. Coste OSPF

a) 100 Mbps → **1** (10⁸ / 100×10⁶ = 1)
b) 1 Gbps → **1** (el coste mínimo es 1)
c) 1.544 Mbps → **64** (10⁸ / 1.544×10⁶ ≈ 64)

## 5. Completa

a) `router ospf 1`
b) `network 192.168.1.0 0.0.0.255 area 0`
c) `default-information originate`
d) `show ip ospf neighbor`

## 6. Tipos de routers

1 → c (Internal Router: misma área)
2 → b (ABR: conecta áreas)
3 → a (ASBR: rutas externas)
