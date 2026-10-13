---
title: Boletín de Servicios de red — Packet Tracer resuelto
description: Soluciones paso a paso de las prácticas de DHCP, DNS y NTP en Packet Tracer ✅
---

# ✅ Boletín de Servicios de red — Packet Tracer resuelto

> Misma numeración y enunciados que el [por-resolver](/ApuntesRedes/boletines/boletin-u07-packettracer). Comandos, valores exactos y qué deberías ver en cada paso.

---

## 1. DHCP en el router: la IP sale sola

**Solución:**

```
Router(config)# interface g0/0
Router(config-if)# ip address 192.168.1.1 255.255.255.0
Router(config-if)# no shutdown
Router(config)# ip dhcp excluded-address 192.168.1.1 192.168.1.10
Router(config)# ip dhcp pool RED
Router(dhcp-config)# network 192.168.1.0 255.255.255.0
Router(dhcp-config)# default-router 192.168.1.1
Router(dhcp-config)# dns-server 8.8.8.8
```

**Esperado (en la PC, `ipconfig /all`):**

```
IPv4 Address. . . . . . : 192.168.1.11
Subnet Mask . . . . . . : 255.255.255.0
Default Gateway . . . . : 192.168.1.1
DNS Servers . . . . . . : 8.8.8.8
```

Confirmación en el router: `show ip dhcp binding` lista MAC → IP con su caducidad. La primera IP fuera del rango excluido confirma que el pool reparte.

---

## 2. Fallo 1: gateway que no existe

**Solución:**

1. En el pool: `default-router 192.168.1.254` → en la PC: `ipconfig /release` + `ipconfig /renew`.
2. Diagnóstico:
   - PC: `ping 192.168.1.1` → **falla** (no hay nadie en esa IP); `ping 192.168.1.11` (su propia IP) → OK.
   - Router: `show ip dhcp pool` → el pool reparte perfecto; `show ip dhcp binding` → concesión entregada.
   - Conclusión: **DHCP asigna** (escalón 1 en verde) pero **no navega** (escalón 2 roto): el `default-router` del pool no corresponde a ninguna interfaz del router.
3. Arreglo: `default-router 192.168.1.1` en el pool y `ipconfig /renew` en la PC → ping al gateway OK.

---

## 3. Relay entre subredes

**Solución:**

1. `G0/1` con `192.168.10.1 255.255.255.0` + `no shutdown`, y pool para esa subred:
```
ip dhcp pool SUCURSAL
 network 192.168.10.0 255.255.255.0
 default-router 192.168.10.1
 dns-server 8.8.8.8
```
2. **Sin helper:** `PC2` en DHCP → se queda en `169.254.x.x` (APIPA). ¿Por qué? El Discover es broadcast y **el router no reenvía broadcasts de una interfaz a otra**.
3. Arreglo, en la interfaz **por la que llega el cliente**:
```
Router(config)# interface g0/1
Router(config-if)# ip helper-address 192.168.1.1
```
(Se puede apuntar al propio router: el servidor es él.)

**Esperado:** `PC2` renueva → `192.168.10.2` (o similar) con gateway `.10.1`; `show ip dhcp binding` muestra las concesiones de las dos subredes.

---

## 4. DNS en PT: nombres que funcionan

**Solución:**

1. Server (Services → DNS): **ON**, registros:
   - `www.empresa.local → 192.168.1.10` (tipo A)
   - `web.empresa.local → www.empresa.local` (tipo CNAME)
2. El pool pasa a `dns-server 192.168.1.10` (y renueva las PCs) — o ponlo a mano en la PC.
3. Desde la PC:

```
nslookup www.empresa.local      → 192.168.1.10
nslookup web.empresa.local      → alias → www.empresa.local → 192.168.1.10
ping www.empresa.local          → replies con la IP del Server
```

**Esperado:** los tres comandos resuelven. Si el navegador del escritorio abre la web del Server (HTTP ON con index.html), mejor que mejor: has completado la cadena DHCP → DNS → HTTP.

---

## 5. Fallo 2: el DNS que no está

**Solución:**

1. Borra el registro `www.empresa.local` (o Services → DNS OFF).
2. Diagnóstico en orden:
   - `ping 192.168.1.10` → **OK** (la red y el Server están vivos: escalones 1–3 en verde).
   - `nslookup www.empresa.local` → `** server can't find www.empresa.local: NXDOMAIN` (o timeout si el servicio está off) → **escalón 4 roto**.
   - `nslookup www.empresa.local 192.168.1.10` → respuesta forzada contra el servidor: si él tampoco sabe, el fallo es del registro/servicio, no de la PC.
3. Restaura el registro → `nslookup` vuelve a dar IP → el navegador carga.

**Lección:** la prueba maestra (comparar resolvers) aquí se hace contra el servidor directamente, porque el laboratorio no tiene Internet.

---

## 6. NTP entre routers: todos con el mismo reloj

**Solución:**

```
! R1 (fuente)
Router1(config)# ntp master 2

! R2 (cliente)
Router2(config)# ntp server 10.0.0.1     ← la IP de R1 (en PT, IP y no nombre)
```

**Esperado en R2:**

```
Router2# show ntp status
Clock is synchronized, stratum 3, reference is 10.0.0.1
...
Router2# show ntp associations
  address         ref clock       st   when   poll reach  delay  offset
 *10.0.0.1        .LOCL.           2      14    64   377  0.000    0.00
```

El `*` marca el peer elegido y `reach 377` = 8/8 sondeos correctos. `show clock` en `R2` ya muestra la hora "de verdad" (la del master).

---

## 7. Fallo 3: hora de la mentira

**Solución:**

1. En `R2`: `no ntp server 10.0.0.1` y luego (modo **privilegiado**):
```
Router2# clock set 03:00:00 1 Jan 2019
```
2. Comprobaciones:
   - `show clock` → `03:00:00.000 UTC Wed Jan 1 2019` (la hora de la mentira).
   - `show ntp status` → `Clock is unsynchronized` (o sin línea de peer).
   - `show ntp associations` → sin `*`, o `reach` bajando a 0.
3. Restaura `ntp server 10.0.0.1` en `R2` → a los pocos segundos: `Clock is synchronized` y `show clock` corrige sola (NTP ajusta gradualmente; si el salto es enorme, como años, IOS puede tardar o corregirlo de golpe según configuración).

**Lección:** dos equipos con horas distintas = logs que no se correlacionan. `clock set` es un yeso; NTP es el hueso.

---

## 8. El reto: la escalera de principio a fin

**Solución esperada (documenta síntoma → escalón → causa → solución):**

| # | Síntoma | Escalón | Causa típica | Solución |
|---|---|---|---|---|
| 1 | `PC1` en `169.254.x.x` | 1 · IP | Pool sin esa subred, helper ausente o servicio DHCP caído | Revisar `show ip dhcp pool`, `ip helper-address` en la interfaz correcta y renew |
| 2 | IP bien, `nslookup` falla | 4 · Nombres | Registro `www.empresa.local` borrado o DNS de DHCP mal apuntado | `nslookup www.empresa.local 192.168.1.10` → restaurar registro / `dns-server` del pool |
| 3 | Logs sin cuadrar | 5 · Hora | Equipos sin fuente NTP (o `clock set` a mano) | `ntp server <IP>` + `show ntp status` en cada equipo |

**Orden obligatorio:** no toques el DNS antes de que el escalón 1 esté en verde, ni el NTP antes de que los nombres resuelvan. Y **antes de reconfigurar**: `show` / `ipconfig /all` / `nslookup` para capturar el estado — la evidencia primero, el arreglo después.

---

## 📋 Criterios de esta práctica

| Ejercicio | Concepto | Punto |
|---|---|---|
| 1 | Pool DHCP, exclusiones, binding | 2–3 |
| 2 | default-router (fallo) | 3 |
| 3 | Relay con ip helper-address | 3 |
| 4 | Registros DNS en PT | 4–5 |
| 5 | Diagnóstico DNS con nslookup (fallo) | 5, 8 |
| 6 | Jerarquía NTP en IOS | 6–7 |
| 7 | Hora desajustada (fallo) | 6–7 |
| 8 | Escalera del servicio | 8 |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/07-servicios-red) · **También:** [Por resolver](/ApuntesRedes/boletines/boletin-u07-packettracer)
