---
title: Boletín de Enrutamiento estático — Packet Tracer resuelto
description: Soluciones paso a paso de las rutas estáticas y la ruta por defecto en Packet Tracer ✅
---

> Misma numeración y enunciados que el [por-resolver](/ApuntesRedes/boletines/boletin-u08-packettracer). Comandos, valores exactos y qué deberías ver en cada paso.

---

## 1. La red de dos routers, en pie

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
```

**Esperado:** `show ip interface brief` con `192.168.1.1`, `10.0.0.1`, `10.0.0.2` y `192.168.2.1` en `up/up`; ping de `PC1` a `192.168.1.1` y de `R1` a `10.0.0.2` con respuestas.

> ℹ️ Un enlace `/30` se escribe `255.255.255.252`. Solo hay dos direcciones utilizables (`10.0.0.1` y `10.0.0.2`), justo las del enlace.

---

## 2. La primera ruta estática: R1 ya sabe dónde está la LAN2

**Solución:**

```
R1(config)# ip route 192.168.2.0 255.255.255.0 10.0.0.2
```

**Esperado en `show ip route` de R1:**

```
S    192.168.2.0/24 [1/0] via 10.0.0.2
```

Y el `ping` de `PC1` a `PC2` **todavía falla** (`Request timed out`): la ida ya tiene camino, la vuelta no.

---

## 3. La vuelta: la ruta que casi todos olvidan

**Solución:**

```
R2(config)# ip route 192.168.1.0 255.255.255.0 10.0.0.1
```

**Esperado:** ping de `PC1` a `PC2` con 4 respuestas y `traceroute 192.168.2.10` desde `PC1` con **2 saltos** (su gateway `192.168.1.1` y `10.0.0.2`, antes de llegar al destino).

---

## 4. Fallo 1: la máscara que se come medio mundo

**Solución:**

1. `no ip route 192.168.2.0 255.255.255.0 10.0.0.2` y después:
```
R1(config)# ip route 192.168.2.0 255.255.255.128 10.0.0.2
```
2. Diagnóstico:
   - `show ip route` en R1 → `S 192.168.2.0/25 [1/0] via 10.0.0.2`: la ruta solo cubre `.0`–`.127`.
   - Ping a `PC2` (`192.168.2.10`) → **OK** (cae dentro del /25).
   - Ping a `PC3` (`192.168.2.200`) → **falla**: se va por la ruta por defecto... o se descarta, porque no hay ruta que lo cubra.
   - En R2 la LAN está **conectada** como `/24`; el problema es solo de R1, que no tiene camino para la mitad alta.
3. Arreglo: `no ip route 192.168.2.0 255.255.255.128 10.0.0.2` y volver al `/24` (`255.255.255.0`) → los dos pings funcionan.

**Lección:** en `ip route` la máscara es la **normal** (como en el ejercicio), y un prefijo más largo no es «más preciso»: es **otra red**.

---

## 5. La ruta por defecto: una línea para el resto del mundo

**Solución:**

```
! ISP
ISP(config)# interface g0/0
ISP(config-if)# ip address 203.0.113.1 255.255.255.252
ISP(config-if)# no shutdown
ISP(config)# interface loopback 0
ISP(config-if)# ip address 8.8.8.8 255.255.255.255
ISP(config)# ip route 192.168.1.0 255.255.255.0 203.0.113.2

! R2
R2(config)# interface g0/2
R2(config-if)# ip address 203.0.113.2 255.255.255.252
R2(config-if)# no shutdown
R2(config)# ip route 0.0.0.0 0.0.0.0 203.0.113.1

! R1
R1(config)# ip route 0.0.0.0 0.0.0.0 10.0.0.2
```

**Esperado en `show ip route` de R1 y R2:**

```
S*   0.0.0.0/0 [1/0] via 10.0.0.2      ← R1
S*   0.0.0.0/0 [1/0] via 203.0.113.1   ← R2
```

`ping 8.8.8.8` desde `PC1` con respuestas. La ruta del ISP de vuelta hacia la LAN1 es imprescindible: sin ella, la ida sale y el eco no vuelve.

---

## 6. Fallo 2: la ruta por defecto que no existe

**Solución:**

1. `no ip route 0.0.0.0 0.0.0.0 10.0.0.2` y luego `ip route 0.0.0.0 0.0.0.0 10.0.0.9`.
2. Diagnóstico:
   - `show ip route` → **no hay ninguna `S*`**: la ruta no se ha instalado porque `10.0.0.9` no es alcanzable por ninguna interfaz.
   - `show running-config | include ip route` → el comando **sí está escrito**. Ese contraste es la clave: configurado no es lo mismo que instalado.
   - `ping 8.8.8.8` desde `PC1` → `Reply from 192.168.1.1: Destination host unreachable` (el propio router contesta que no sabe por dónde salir).
3. Arreglo: `no ip route 0.0.0.0 0.0.0.0 10.0.0.9` + `ip route 0.0.0.0 0.0.0.0 10.0.0.2` y comprobar que reaparece la `S*`.

---

## 7. Ruta flotante: el plan B con distancia administrativa

**Solución:**

```
! ISP: cara hacia R1 y vuelta hacia la LAN1 (por su enlace directo)
ISP(config)# interface g0/1
ISP(config-if)# ip address 198.51.100.1 255.255.255.252
ISP(config-if)# no shutdown
ISP(config)# ip route 192.168.1.0 255.255.255.0 198.51.100.2

! R1: enlace directo con el ISP + respaldo con AD 5
R1(config)# interface g0/2
R1(config-if)# ip address 198.51.100.2 255.255.255.252
R1(config-if)# no shutdown
R1(config)# ip route 0.0.0.0 0.0.0.0 198.51.100.1 5
```

**Esperado:**

1. `show ip route 0.0.0.0` en R1 → solo la primaria: `S* 0.0.0.0/0 [1/0] via 10.0.0.2`. La de AD 5 está configurada pero **no instalada**.
2. `shutdown` en `G0/1` de R1 y unos segundos de espera → la tabla cambia a `S* 0.0.0.0/0 [5/0] via 198.51.100.1`.
3. `ping 8.8.8.8` desde `PC1` → sigue respondiendo (ida por el ISP, vuelta por el enlace directo del ISP).
4. `no shutdown` en `G0/1` → vuelve a instalarse la primaria con AD 1.

**Lección:** la AD solo decide **entre rutas del mismo destino**; la de 5 es un salvavidas que duerme hasta que la primaria pierde su next-hop.

---

## 8. Fallo 3 + reto: la ruta en el router equivocado

**Solución:**

1. En R1: `no ip route 192.168.2.0 255.255.255.0 10.0.0.2`. En R2: `ip route 192.168.2.0 255.255.255.0 192.168.2.1`.
2. Diagnóstico:
   - `show ip route static` en **R1** → vacío: R1 no tiene camino hacia la LAN2.
   - `show ip route static` en **R2** → sale la ruta nueva, pero es inútil: `192.168.2.0/24` ya está como `C` (conectada, AD 0) y le gana a cualquier estática (AD 1).
   - `ping` de `PC1` a `PC2` → falla; `traceroute` desde `PC1` se corta en `192.168.1.1`.
3. Arreglo: borrar la ruta de R2 y crearla en R1 con next-hop `10.0.0.2`.
4. Checklist final, en este orden:
   - `show ip interface brief` → ¿están las interfaces `up/up` y con la IP correcta?
   - `show ip route` → ¿existe una `S` hacia el destino y una `S*` que cubra el resto?
   - `ping` al siguiente salto y luego al destino.
   - `traceroute` → hasta dónde llega el paquete (dónde se rompe la cadena).

**Lección:** cada router decide con **su** tabla. Una ruta estática configurada en el vecino no arregla el router que no sabe salir.

---

## 📋 Criterios de esta práctica

| Ejercicio | Concepto | Punto |
|---|---|---|
| 1 | Interfaces, direccionamiento y verificación | 2 |
| 2 | Ruta estática con next-hop | 3 |
| 3 | Ruta de vuelta y traceroute | 3 |
| 4 | Máscara incorrecta (fallo) | 3, 5 |
| 5 | Ruta por defecto | 4 |
| 6 | Next-hop inalcanzable (fallo) | 4, 5 |
| 7 | Ruta flotante y distancia administrativa | 4 |
| 8 | Ruta en el router equivocado (fallo) + checklist | 5 |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/08-enrutamiento-estatico) · **También:** [Por resolver](/ApuntesRedes/boletines/boletin-u08-packettracer)
