---
title: Boletín de Enrutamiento estático — Packet Tracer
description: Prácticas guiadas de rutas estáticas, ruta por defecto y rutas flotantes en Packet Tracer 🖥️
---

> **Variante práctica de nivel único** (no es el par inicial/avanzado). Ocho micro-prácticas de baja dificultad en **Packet Tracer** para montar una red de dos routers y hacerla hablar a mano: interfaces, rutas estáticas, ruta por defecto, ruta flotante y verificación con `show ip route` y `traceroute`. Tres de ellas llevan un **fallo intencionado** que tienes que diagnosticar. Ideal tras leer los puntos 1–5 de la unidad.

> 🧰 **Requisitos:** Cisco Packet Tracer. Necesitas 2 routers (`2911`), 3 PCs y, para los ejercicios 5–8, un router más que hará de **ISP** (un `2911` con una `Loopback0` que simula Internet: `8.8.8.8/32`). El resuelto está justo al lado: úsalo solo cuando te atasques.

---

## 📋 Direccionamiento de la práctica

| Equipo | Interfaz | IP / máscara | Para qué |
|---|---|---|---|
| R1 | G0/0 | 192.168.1.1/24 | LAN1 |
| R1 | G0/1 | 10.0.0.1/30 | Enlace con R2 |
| R1 | G0/2 | 198.51.100.2/30 | Enlace directo con el ISP (ejercicio 7) |
| R2 | G0/0 | 10.0.0.2/30 | Enlace con R1 |
| R2 | G0/1 | 192.168.2.1/24 | LAN2 |
| R2 | G0/2 | 203.0.113.2/30 | Salida al ISP |
| ISP | G0/0 | 203.0.113.1/30 | Cara hacia R2 |
| ISP | G0/1 | 198.51.100.1/30 | Cara hacia R1 |
| ISP | Lo0 | 8.8.8.8/32 | «Internet» de mentirijillas |
| PC1 | Fa0 | 192.168.1.10/24 · gw .1 | Cliente de la LAN1 |
| PC2 | Fa0 | 192.168.2.10/24 · gw .1 | Cliente de la LAN2 |
| PC3 | Fa0 | 192.168.2.200/24 · gw .1 | Segundo cliente de la LAN2 |

---

## 1. La red de dos routers, en pie

Monta **R1 + R2 + PC1 + PC2** con el direccionamiento de la tabla (los ejercicios 5–8 añaden el ISP y PC3; puedes dejarlos para después). Configura las cuatro interfaces con `ip address` y `no shutdown`, y da IP estática a las PCs con su gateway.

Comprueba tres cosas: `show ip interface brief` con las cuatro interfaces `up/up`, `ping` de `PC1` a su gateway y `ping` de `R1` a `10.0.0.2`.

> 💡 **Pista:** en PT, un router `2911` ya trae `G0/0`, `G0/1` y `G0/2`: no hace falta añadir módulos. Si un puerto sigue `administratively down`, te falta el `no shutdown`.

## 2. La primera ruta estática: R1 ya sabe dónde está la LAN2

R1 conoce su LAN y el enlace con R2, pero **no** la red `192.168.2.0/24`. Enséñale el camino con una única línea: red destino, máscara normal y la IP del vecino.

Después, `show ip route` y localiza la línea `S`. Y ahora prueba: `ping` de `PC1` a `PC2`. ¿Funciona?

> 💡 **Pista:** la ruta aparece como `S 192.168.2.0/24 [1/0] via 10.0.0.2`. Si el ping sigue fallando, piensa en la vuelta: R2 todavía no sabe volver.

## 3. La vuelta: la ruta que casi todos olvidan

Configura en R2 la ruta hacia `192.168.1.0/24`. Repite el `ping` de `PC1` a `PC2`: ahora sí. Lánzale un `traceroute 192.168.2.10` desde `PC1` y cuenta los saltos.

> 💡 **Pista:** un ping necesita ida **y** vuelta. Si la ida está y la vuelta no, el mensaje que ves en PT (`Request timed out`) no distingue el problema: `show ip route` en **los dos** routers es la prueba.

## 4. Fallo 1: la máscara que se come medio mundo

Borra la ruta de R1 y vuelve a crearla con esta máscara: `ip route 192.168.2.0 255.255.255.128 10.0.0.2`. Conecta **PC3** (`192.168.2.200`) a la LAN2 y prueba el ping desde `PC1` a `PC2` y a `PC3`.

Diagnostica por qué uno funciona y el otro no, y arréglalo.

> 💡 **Pista:** mira la ruta en `show ip route`: ¿qué prefijo ha quedado instalado? ¿`192.168.2.200` cae dentro de ese prefijo? Una máscara de más (o de menos) es el fallo de subnetting más rentable del curso.

## 5. La ruta por defecto: una línea para el resto del mundo

Añade el **ISP** (`2911`) con `G0/0` a `203.0.113.1/30` hacia R2 y una `Loopback0` con `8.8.8.8/32`. Conecta `R2 G0/2 ↔ ISP G0/0`.

Configura en R2 una ruta por defecto hacia el ISP y en R1 otra hacia R2. Comprueba con `show ip route` la línea `S*` y haz un `ping` de `PC1` a `8.8.8.8`.

> 💡 **Pista:** el ISP necesita saber volver a `192.168.1.0/24`; si no, la ida sale y la vuelta no llega. Y sí: es la misma lección del ejercicio 3, ahora con tres routers.

## 6. Fallo 2: la ruta por defecto que no existe

En R1, cambia la ruta por defecto para que apunte a `10.0.0.9` (una IP que no está en el enlace). Ejecuta `show ip route` y luego intenta `ping 8.8.8.8`.

¿Qué mensaje te devuelve el router y por qué la ruta no aparece en la tabla? Arréglalo.

> 💡 **Pista:** el next-hop tiene que ser alcanzable por una ruta conectada. Si no lo es, IOS acepta el comando pero **no instala** la ruta. Compara lo que ves en la tabla con lo que hay en `show running-config | include ip route`.

## 7. Ruta flotante: el plan B con distancia administrativa

Conecta `R1 G0/2 ↔ ISP G0/1` (`198.51.100.0/30`). Añade en R1 una **segunda** ruta por defecto hacia `198.51.100.1` con distancia administrativa `5`.

Mira `show ip route 0.0.0.0` (¿qué vecino manda?) y después apaga `G0/1` con `shutdown`. Espera unos segundos, vuelve a mirar la tabla y prueba el ping a `8.8.8.8`. Por último, enciende otra vez `G0/1`.

> 💡 **Pista:** mientras la primaria tenga su next-hop vivo, la de AD 5 se queda en la reserva y **no aparece** en la tabla. Al caer el enlace, la primaria desaparece y se instala el respaldo. La `[1/0]` y la `[5/0]` de `show ip route` son la AD y la métrica.

## 8. Fallo 3 + reto: la ruta en el router equivocado

Deja la red como estaba (R1 con ruta a la LAN2 y su ruta por defecto). Ahora comete el error clásico: **borra la ruta estática de R1** y créala en R2 apuntando a `192.168.2.1`.

Explica por qué el ping de `PC1` a `PC2` falla aunque «la ruta existe», y arréglalo. Cierra la práctica con tu checklist de cuatro comandos, en orden: `show ip interface brief`, `show ip route`, `ping` y `traceroute`.

> 💡 **Pista:** una ruta estática solo sirve en el router que la tiene. En R2 esa ruta además es inútil, porque `192.168.2.0/24` ya está **conectada** (AD 0 le gana a AD 1). Para saber qué tiene cada router: `show ip route static` en los dos.

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

📚 [Volver al índice de la unidad](/ApuntesRedes/08-enrutamiento-estatico) · **También:** [Resuelto](/ApuntesRedes/boletines/boletin-u08-packettracer-resuelto)
