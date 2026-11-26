---
title: Boletín de OSPF — Packet Tracer
description: Prácticas guiadas de OSPF de una sola área en Packet Tracer 🖥️
---

> **Variante práctica de nivel único** (no es el par inicial/avanzado). Ocho micro-prácticas de baja dificultad en **Packet Tracer** para montar OSPF en **una sola área**: declarar redes con `network` y su wildcard, comprobar vecinos en `FULL`, ver las rutas `O` llegar solas, ajustar el coste y propagar una ruta por defecto. Tres de ellas llevan un **fallo intencionado** que tienes que diagnosticar. Ideal tras leer los puntos 3–8 de la unidad.

> 🧰 **Requisitos:** Cisco Packet Tracer. Necesitas 3 routers (`2911`), 3 PCs y, para el ejercicio 7, un cuarto router que hará de **ISP** (con una `Loopback0` en `8.8.8.8/32` que simula Internet). El resuelto está justo al lado: úsalo solo cuando te atasques.

---

## 📋 Direccionamiento de la práctica

| Equipo | Interfaz | IP / máscara | Para qué |
|---|---|---|---|
| R1 | G0/0 | 192.168.1.1/24 | LAN1 |
| R1 | G0/1 | 10.0.0.1/30 | Enlace con R2 |
| R2 | G0/0 | 10.0.0.2/30 | Enlace con R1 |
| R2 | G0/1 | 192.168.2.1/24 | LAN2 |
| R2 | G0/2 | 10.0.1.1/30 | Enlace con R3 |
| R3 | G0/0 | 10.0.1.2/30 | Enlace con R2 |
| R3 | G0/1 | 192.168.3.1/24 | LAN3 |
| R3 | G0/2 | 203.0.113.2/30 | Salida al ISP (ejercicio 7) |
| ISP | G0/0 | 203.0.113.1/30 | Cara hacia R3 |
| ISP | Lo0 | 8.8.8.8/32 | «Internet» de mentirijillas |
| PC1 | Fa0 | 192.168.1.10/24 · gw .1 | Cliente de la LAN1 |
| PC2 | Fa0 | 192.168.2.10/24 · gw .1 | Cliente de la LAN2 |
| PC3 | Fa0 | 192.168.3.10/24 · gw .1 | Cliente de la LAN3 |

**Routers en línea:** `PC1 — R1 — R2 — R3 — PC3`, con la LAN2 colgando de R2.

---

## 1. Las tres redes, en pie y sin OSPF

Monta la topología con el direccionamiento de la tabla y configura las interfaces de los tres routers (`ip address` + `no shutdown`). Da IP estática a las tres PCs.

Comprueba los enlaces con `ping` desde cada router a su vecino directo (`10.0.0.2`, `10.0.0.1`, `10.0.1.1`, `10.0.1.2`). Después mira `show ip route` en R1 y localiza qué redes conoce: solo las suyas y el enlace.

> 💡 **Pista:** en un enlace `/30` la máscara es `255.255.255.252`. Sin OSPF, R1 no tiene ni idea de `192.168.2.0/24` ni de `192.168.3.0/24`.

## 2. OSPF en R1 y R2: los vecinos se saludan

Arranca OSPF en R1 y R2 con el proceso `1`, un `router-id` manual (`1.1.1.1` y `2.2.2.2`) y un `network` por cada red conectada, **con su wildcard** y `area 0`: la LAN y el enlace.

Comprueba tres cosas: `show ip ospf neighbor` (estado `FULL`), `show ip route ospf` y un `ping` de `PC1` a `PC2`.

> 💡 **Pista:** la wildcard es la máscara **invertida**: `/24` → `0.0.0.255`, `/30` → `0.0.0.3`. Y no hace falta declarar la red de la LAN2 en R1: OSPF la aprende de su vecino.

## 3. R3 se une a la fiesta

Configura OSPF en R3 (`router-id 3.3.3.3`) declarando su enlace con R2 y su LAN, también en `area 0`.

Verifica que R1 ya ve `O 192.168.3.0/24` sin que le hayas escrito nada, y prueba `ping` y `traceroute` de `PC1` a `PC3`. Anota la métrica de la ruta y explica de dónde sale.

> 💡 **Pista:** cada enlace GigabitEthernet suma coste **1** (100 Mbps de referencia ÷ 1000 Mbps, redondeado a 1) y OSPF acumula el coste de todos los enlaces del camino: de ahí la métrica que ves entre corchetes.

## 4. Fallo 1: la wildcard que no es una wildcard

En R1, cambia la línea de la LAN por esta: `network 192.168.1.0 255.255.255.0 area 0`. Espera unos segundos y observa qué pasa en `show ip ospf interface`, `show ip protocols` y `show ip route` de R2 y R3.

Diagnostica por qué R2 deja de tener ruta hacia la LAN1 y arréglalo.

> 💡 **Pista:** `255.255.255.0` como wildcard significa «solo coinciden las direcciones con los bits de host a cero», así que **ninguna interfaz** cae dentro. OSPF no activa el protocolo en `G0/0`… pero el vecino del enlace sigue en `FULL`: el fallo está en la red anunciada, no en la adyacencia.

## 5. Fallo 2: un área que no coincide

Cambia el `area 0` del enlace de R3 por `area 1` (solo el `network` de `10.0.1.0`). Mira `show ip ospf neighbor` en R2 y en R3, y también `show ip ospf interface g0/2` en R2.

¿Qué estado ves y qué te dice el campo *Area*? Deja otra vez las dos puntas en `area 0` y comprueba que los vecinos vuelven.

> 💡 **Pista:** dos routers en áreas distintas del mismo enlace **no forman adyacencia**: comparten segmento y se ven los hellos, pero el área es parte de la «contraseña» de la vecindad. Este fallo se diagnostica con `show ip ospf interface`, no con `ping`.

## 6. El coste: cambiar la nota del camino

En R2, sube el coste del enlace hacia R3 con `ip ospf cost 50` en `G0/2`. Mira antes y después `show ip route 192.168.3.0` en R1 y `show ip ospf interface g0/2` en R2.

Vuelve al coste automático (`no ip ospf cost 50`) y explica en una frase qué cambiaría si existiera un segundo camino hacia la LAN3.

> 💡 **Pista:** el coste es la métrica que OSPF usa para elegir camino; con un solo camino el paquete llega igual, pero el número entre corchetes cambia. Lo importante es entender que OSPF **siempre** suma costes, no cuenta saltos.

## 7. La ruta por defecto también viaja por OSPF

Añade el **ISP** con `G0/0` en `203.0.113.1/30`, una `Loopback0` con `8.8.8.8/32` y una ruta de vuelta hacia las tres LANs (`192.168.0.0 255.255.252.0` vía `203.0.113.2`). Conecta `R3 G0/2 ↔ ISP G0/0`.

En R3: crea una ruta por defecto hacia el ISP y propágala al resto del área. Comprueba en R1 y R2 que aparece una `O*E2 0.0.0.0/0` y haz un `ping` de `PC1` a `8.8.8.8`.

> 💡 **Pista:** `default-information originate` **no inventa** la ruta por defecto: solo la anuncia si ya existe en la tabla de R3. Si no la has creado antes, el comando no propaga nada (o tendrías que usar `always`, que aquí no toca).

## 8. Fallo 3 + reto: la red que se quedó fuera

En R3, escribe mal la red de su LAN: `network 192.168.30.0 0.0.0.255 area 0` (un cero de más). Espera, y comprueba en R1 `show ip route 192.168.3.0` y `show ip ospf interface` en R3.

Explica por qué los vecinos siguen en `FULL` mientras la LAN3 ha desaparecido del mapa, y arréglalo. Cierra con tu checklist de diagnóstico OSPF, en orden.

> 💡 **Pista:** la adyacencia va por el enlace (que sí está bien declarado); lo que falta es la **red** en la LSDB. Checklist: `show ip ospf neighbor` → `show ip ospf interface` → `show ip protocols` → `show ip route ospf` → `show ip ospf database`.

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

📚 [Volver al índice de la unidad](/ApuntesRedes/09-ospf) · **También:** [Resuelto](/ApuntesRedes/boletines/boletin-u09-packettracer-resuelto)
