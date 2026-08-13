---
title: Boletín U09 — Inicial
description: Ejercicios básicos de Routing Dinámico
---

# 📝 Boletín U09 — Inicial

> Ejercicios básicos para afianzar los conceptos de OSPF y routing dinámico.

---

## 1. IGP vs EGP

Clasifica cada protocolo como IGP o EGP:

a) OSPF
b) BGP
c) RIP
d) EIGRP

## 2. Verdadero o falso

a) OSPF usa el algoritmo de Dijkstra (SPF).
b) RIP tiene un límite de 15 saltos.
c) OSPF necesita un área backbone (Área 0).
d) El Router ID de OSPF debe ser único en la red.
e) RIP converge más rápido que OSPF.

## 3. Relaciona

| Término | Descripción |
|---|---|
| 1. LSA | a) Router que conecta áreas |
| 2. LSDB | b) Anuncio de estado de enlace |
| 3. ABR | c) Base de datos de la topología |
| 4. SPF | d) Algoritmo de cálculo de rutas |

## 4. Coste OSPF

Calcula el coste OSPF para estas interfaces:

a) FastEthernet (100 Mbps)
b) GigabitEthernet (1 Gbps)
c) Serial (1.544 Mbps)

## 5. Completa

Completa los comandos OSPF:

a) `router ___ 1` (inicia el proceso OSPF)
b) `network 192.168.1.0 0.0.0.255 area ___` (área backbone)
c) `default-information ___` (propagar ruta por defecto)
d) `show ip ospf ___` (ver vecinos)

## 6. Tipos de routers

Relaciona el tipo de router OSPF con su función:

| Tipo | Función |
|---|---|
| 1. Internal Router | a) Introduce rutas externas |
| 2. ABR | b) Conecta Área 0 con otras áreas |
| 3. ASBR | c) Todas sus interfaces en la misma área |

## 7. Dinámico vs estático

a) Clasifica cada protocolo como IGP o EGP: **OSPF**, **RIP**, **BGP**, **EIGRP**.

b) Enumera **3 ventajas** del routing dinámico frente al estático y pon un caso donde convenga usar estático.

**Pista:** IGP enruta dentro de un AS y EGP entre AS (BGP). Dinámico = autoaprendizaje, convergencia automática y menos error humano; estático = determinista, útil en enlaces stub o redes muy pequeñas.

## 8. Coste OSPF: tabla de velocidades

Completa la tabla con el coste OSPF de cada velocidad usando la fórmula `coste = 10^8 / ancho_de_banda`:

| Velocidad | Cálculo | Coste OSPF |
|---|---|---|
| 10 Mbps | 10⁸ / 10⁷ | |
| 100 Mbps | 10⁸ / 10⁸ | |
| 1 Gbps | 10⁸ / 10⁹ | |
| 1.544 Mbps (T1) | 10⁸ / 1.544.000 | |

**Pista:** el coste mínimo es 1: los enlaces a partir de 100 Mbps valen lo mismo por defecto. Los decimales se redondean hacia abajo.
