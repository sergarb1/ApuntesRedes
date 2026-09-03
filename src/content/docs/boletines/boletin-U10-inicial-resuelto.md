---
title: Boletín U10 — Inicial (Resuelto)
description: Soluciones de los ejercicios básicos de Routing Dinámico
---

# ✅ Boletín U10 — Inicial (Resuelto)

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

## 7. Dinámico vs estático

a)
- **OSPF → IGP**
- **RIP → IGP**
- **BGP → EGP**
- **EIGRP → IGP** (interior, aunque propietario de Cisco)

b) **Ventajas del dinámico:**
1. **Autoaprendizaje:** las redes nuevas se comparten solas, sin ir router por router.
2. **Convergencia automática:** si cae un enlace, la red recalcula y se reencamina sin intervención.
3. **Menos error humano:** la tabla de rutas la calcula el protocolo, no un administrador tecleando.

**Caso para estático:** redes muy pequeñas (2-3 routers), un enlace **stub** con una única salida, o una ruta de respaldo a mano (`floating static`): ahí el dinámico solo añadiría tráfico y complejidad.

## 8. Coste OSPF: tabla de velocidades

| Velocidad | Cálculo | Coste OSPF |
|---|---|---|
| 10 Mbps | 10⁸ / 10⁷ | **10** |
| 100 Mbps | 10⁸ / 10⁸ | **1** |
| 1 Gbps | 10⁸ / 10⁹ = 0,1 | **1** (mínimo) |
| 1.544 Mbps (T1) | 10⁸ / 1.544.000 ≈ 64,8 | **64** |

> El coste mínimo es **1**: todos los enlaces de 100 Mbps en adelante valen lo mismo por defecto, salvo que subas el `auto-cost reference-bandwidth`.