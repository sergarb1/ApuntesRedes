---
title: Boletín U10 — Inicial (Resuelto)
description: Soluciones ejercicios básicos de NAT
---

# ✅ Boletín U10 — Inicial (Resuelto)

---

## 1. ¿Qué es NAT?

**NAT** (Network Address Translation) traduce direcciones IP privadas (no enrutables en Internet) a direcciones IP públicas (enrutables). Es necesario porque:
- Las IPv4 públicas son limitadas.
- Una LAN completa puede compartir una o pocas IPs públicas.

## 2. Tipos de NAT

| Tipo | Descripción |
|---|---|
| NAT estático | **B** — Una IP privada fija se traduce a una IP pública fija |
| NAT dinámico | **C** — Se asigna una IP pública de un pool disponible |
| PAT | **A** — Muchas IPs privadas comparten una IP pública variando puertos |

## 3. Configura PAT

```bash
R1(config)# access-list 1 permit 192.168.1.0 0.0.0.255
R1(config)# ip nat inside source list 1 interface g0/1 overload
R1(config)# interface g0/0
R1(config-if)# ip nat inside
R1(config)# interface g0/1
R1(config-if)# ip nat outside
```

## 4. Tabla NAT

a) **2 dispositivos** (192.168.1.10 y 192.168.1.20).
b) **83.45.12.78**.
c) **50001**.

## 5. Verdadero o falso

a) **Falso.** NAT estático es 1 a 1. PAT permite compartir una IP.
b) **Verdadero.** NAT necesita saber qué interfaz es inside y cuál outside.
c) **Falso.** NAT estático hace eso. NAT dinámico asigna de un pool, no es fijo.
d) **Verdadero.**

## 6. NAT destino (port forwarding)

```bash
R1(config)# ip nat inside source static tcp 192.168.1.10 80 83.45.12.78 80
R1(config)# interface g0/0
R1(config-if)# ip nat inside
R1(config)# interface g0/1
R1(config-if)# ip nat outside
```

## 7. ¿Qué tipo de NAT es?

| Escenario | Tipo |
|---|---|
| a) Servidor web 192.168.1.10 ↔ 83.45.12.78 fijo | **NAT estático** (1:1) |
| b) Pool de 4 IPs públicas asignadas al vuelo | **NAT dinámico** (pool) |
| c) 300 alumnos saliendo por una IP pública | **PAT** (sobrecarga) |
| d) Puerto público 8080 → 192.168.1.10:80 | **NAT destino** (port forwarding) |

## 8. Lee la tabla NAT

a) **3 conexiones activas:** dos consultas DNS (8.8.8.8:53) y una sesión HTTPS (142.250.184.4:443).
b) **49152** — es el puerto efímero original del PC 192.168.1.30 (columna *Inside local*).
c) Porque **NAT asigna un puerto global distinto** a cada conexión (60001, 60002, 60003): los puertos efímeros duplicados no chocan porque el *Inside global* los desambigua.
d) Las dos primeras van a **8.8.8.8:53 (DNS)**; la tercera a **142.250.184.4:443 (HTTPS)**.