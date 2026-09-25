---
title: Boletín de Enrutamiento estático — Avanzado
description: Ejercicios avanzados de enrutamiento estático
---

# 📝 Boletín de Enrutamiento estático — Avanzado

> Ejercicios que requieren aplicar rutas estáticas con criterio. En los difíciles tienes pista.

---

## 1. Configuración multi-router

Diseña la configuración para 3 routers en línea:

```
R1 (192.168.1.0/24) ──── R2 ──── R3 (192.168.3.0/24)
                          │
                     (192.168.2.0/24)
```

**Enlaces:**
- R1-R2: 10.0.0.0/30
- R2-R3: 10.0.0.4/30

Escribe la **configuración completa** de R1, R2 y R3 (interfaces, rutas estáticas, rutas por defecto). Nota: R2 es el router central sin salida externa, así que **no lleva ruta por defecto** (solo rutas específicas hacia R1 y R3).

## 2. Rutas flotantes

Configura un router con:
- Ruta por defecto primaria hacia 10.0.0.2 (AD=1)
- Ruta por defecto de respaldo hacia 10.0.1.2 (AD=5)
- Ruta estática hacia 192.168.100.0/24 vía 10.0.0.2

a) Escribe los comandos
b) ¿Cuándo se activa la ruta de respaldo?
c) ¿Cómo verificarías que la ruta de respaldo está activa?

**Pista:** la AD se escribe al final del `ip route`.

## 3. Resolución de problemas de rutas

Un router tiene esta configuración:

```
interface g0/0
 ip address 192.168.1.1 255.255.255.0
 no shutdown
interface g0/1
 ip address 10.0.0.1 255.255.255.252
 shutdown
ip route 0.0.0.0 0.0.0.0 10.0.0.2
```

a) ¿Funciona la ruta por defecto? ¿Por qué?
b) ¿Qué comando muestra el problema?
c) ¿Qué cambiarías para que funcione?

## 4. Longest prefix match

Un router tiene estas rutas en su tabla:

```
192.168.0.0/16  via 10.0.0.2
192.168.1.0/24  via 10.0.0.6
192.168.1.16/28 via 10.0.0.10
```

Decide por cuál de los tres next-hops enviará el router cada paquete destinado a:

a) 192.168.1.30
b) 192.168.1.200
c) 192.168.3.44
d) 192.168.1.15

**Pista:** el *longest prefix match* manda: gana la ruta con la máscara más larga que coincida con la IP destino. La /28 solo cubre de 192.168.1.16 a 192.168.1.31.

## 5. V/F con matices

a) Si configuras una ruta estática y no aparece en `show ip route`, el IOS la descartó por un error de sintaxis.
b) Una ruta estática con interfaz de salida en lugar de next-hop solo funciona bien en enlaces punto a punto.
c) Dos rutas a la misma red con distinta AD: se instala la de menor AD y la otra queda como respaldo (flotante).
d) La ruta por defecto se usa solo si no existe ninguna otra ruta más específica para el destino.
e) Un `ip route` hacia un next-hop que está en una subred que el router no tiene configurada se instala sin problemas.

## 6. Diseño de rutas para una sede

Tu empresa tiene un router central (R1) y dos sucursales (R2 y R3). R1-R2 usa 10.0.0.0/30, R1-R3 usa 10.0.0.4/30. Las LANs: R2 tiene 192.168.2.0/24 y R3 tiene 192.168.3.0/24. R1 tiene 192.168.1.0/24 y sale a Internet por G0/2.

a) ¿Cuántas rutas estáticas necesita R1 para llegar a todas las LANs y a Internet?
b) Escribe las de R1.
c) ¿Qué única ruta necesitan R2 y R3 para "verlo todo" (sucursales + Internet)? Escribe una para R2.

## 7. Interferencia con rutas conectadas

Escribe en R1: `ip route 192.168.1.0 255.255.255.0 10.0.0.2`, siendo 192.168.1.0/24 la propia LAN de R1 conectada en G0/0. ¿Qué pasa? ¿Qué tipo de entrada verías en `show ip route` y por qué no rompe el encaminamiento local?

**Pista:** el IOS prioriza por AD: la conectada (0) manda sobre la estática (1).

## 8. Escenario completo de diagnóstico

Escenario: R1 y R2 conectados por 10.0.0.0/30. LAN R1: 192.168.1.0/24, LAN R2: 192.168.2.0/24. El PC de R1 hace ping a la LAN de R2 y falla. `show ip route` en R2 muestra:

```
C  10.0.0.0/30 is directly connected, G0/1
C  192.168.2.0/24 is directly connected, G0/0
```

a) ¿Qué le falta a R2?
b) ¿Qué le falta a R1 (supón que R2 ya está arreglado)?
c) El ping del PC ya llega a la LAN de R2 pero el traceroute se queda a medias. ¿Por qué puede pasar aunque el routing esté bien?
