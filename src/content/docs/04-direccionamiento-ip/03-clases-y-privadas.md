---
title: "3 — Clases, IPs privadas y públicas"
description: Las clases A-E de toda la vida, CIDR y el mapa privado vs público 🏠
---

<p><small>Las clases A-E de toda la vida, CIDR y el mapa privado vs público 🏠</small></p>

> 🗺️ **Estás en:** 🧮 **Direccionamiento IP y subnetting** → 3 · Clases, IPs privadas y públicas

---

## 📬 La idea en una frase

> Las direcciones IPv4 se repartían en **clases fijas** hasta que **CIDR** las abolió; hoy lo que importa es saber distinguir **privadas** (RFC 1918, para dentro de tu red) de **públicas** (únicas en Internet).

Las clases son historia (y salen en examen); las privadas y públicas son tu mapa diario. Aunque ya nadie asigne direcciones por clase, CONRAD las menciona con la misma nostalgia que un abuelo sus cromos.

---

## 👑 El antiguo régimen: clases A-E

Antes de 1993 la dirección se *leía* en los primeros bits: según empezara el primer octeto, sabías de qué clase era y qué máscara le tocaba por defecto.

| Clase | Primeros bits | Rango | Máscara por defecto | Uso |
|---|---|---|---|---|
| **A** | 0 | 0.0.0.0 - 127.255.255.255 | /8 | Grandes redes (16.777.214 hosts) |
| **B** | 10 | 128.0.0.0 - 191.255.255.255 | /16 | Redes medianas (65.534 hosts) |
| **C** | 110 | 192.0.0.0 - 223.255.255.255 | /24 | Redes pequeñas (254 hosts) |
| **D** | 1110 | 224.0.0.0 - 239.255.255.255 | — | Multicast (OSPF y compañía) |
| **E** | 1111 | 240.0.0.0 - 255.255.255.255 | — | Experimental, nunca en producción |

Al vuelo: primer octeto **0-127** → A (`8.8.8.8`), **128-191** → B (`172.16.0.1`), **192-223** → C (`192.168.1.1`).

> 💡 **El problema histórico:** una clase A era demasiado grande para casi cualquiera y una clase C, demasiado pequeña. Si tenías 50.000 hosts, "tocaba" una clase B entera y desaprovechabas miles de IPs. Ese desperdicio aceleró el agotamiento de IPv4.

---

## 🗡️ CIDR: el golpe de estado que eliminó las clases

En 1993 llegó **CIDR** (*Classless Inter-Domain Routing*):

- **Sin clases:** ya no se mira *de qué clase es* la IP; manda la **máscara /n**.
- **Sin máscaras fijas:** cualquier máscara, con cualquier red, del tamaño que haga falta.
- **Rutas agregadas:** se pueden agrupar varias redes en una sola ruta (sumarización, en los boletines).

```
10.0.0.0/8        → Red: 8 bits,  Host: 24 bits   (la vieja "clase A")
192.168.1.128/25  → Red: 25 bits, Host: 7 bits    (imposible con clases)
```

La misma dirección puede significar cosas distintas según su `/n`: con CIDR puedes dar a `192.168.1.0` un /26 o un /30 y nadie discute. Con clases habría sido un pecado.

---

## 🏠 Las IPs privadas (RFC 1918)

La **IANA** reservó tres rangos **solo para uso interno**. **No son enrutables en Internet**: ningún router público sabe (ni quiere saber) hacia dónde mandar un paquete con este destino.

| Rango | Máscara CIDR | Nº de IPs | Uso típico |
|---|---|---|---|
| **10.0.0.0 - 10.255.255.255** | /8 | 16.777.216 | Grandes empresas |
| **172.16.0.0 - 172.31.255.255** | /12 | 1.048.576 | Empresas medianas |
| **192.168.0.0 - 192.168.255.255** | /16 | 65.536 | Hogar y pequeña oficina |

> ⚠️ **Ojo con el rango B:** el bloque es **172.16.0.0/12**, no todo el 172.x.x.x: solo del `172.16.0.0` al `172.31.255.255`. `172.32.0.1` ya es pública.

Al vuelo: `10.x.x.x` ✅ · `172.16.x.x` a `172.31.x.x` ✅ · `192.168.x.x` ✅ · cualquier otro valor ❌. Ojo: `10.0.0.15` es privada; `172.40.5.5` no lo es (el 40 está fuera del 16-31).

### ¿Por qué existen?

El espacio IPv4 se agotó (4.294 millones de direcciones no bastaron). Con las privadas:

- Miles de equipos internos sin costar **ni un céntimo de espacio público**.
- Mismo rango **reutilizable a la vez** en millones de redes del planeta.
- Al salir, el router hace **NAT** y le presta una IP pública (lo verás en el [punto de NAT](/ApuntesRedes/10-nat-pat)).

---

## 🌍 Las IPs públicas: únicas en el mundo

Las direcciones **públicas** son las que viajan por Internet. Reglas del juego:

- **Únicas a nivel mundial**: nadie más puede usar la misma a la vez.
- El reparto va en pirámide: **IANA** → bloques a los **RIR** (RIPE en Europa, ARIN en Norteamérica…) → **ISP** → a ti. Nunca "compras" una IP: **la alquilas**, por eso cambias de dirección si cambias de operador.
- **Van por Internet sin traductor**: DNS, servidores web, VoIP… todo lo que se ofrece desde fuera vive en una pública.

> 💡 **Ejemplo real:** `8.8.8.8` es un DNS público de Google: única, y todo el mundo la usa. Nadie más puede "ponerse" ese número.

---

## 🔗 Privada, pública… o especial

Ahora encajan las piezas: **NAT** traduce tu privada a la pública del router al salir (un solo `83.45.12.78` sostiene cientos de PCs internas), y con **IPv6** cada dispositivo podrá tener dirección pública *de verdad* sin NAT.

Hay rangos que parecen privados y no lo son:

- **127.0.0.0/8 (loopback):** no sale de tu equipo, no viaja por ninguna red.
- **169.254.0.0/16 (APIPA):** el rango de emergencia que se ponen solos los hosts cuando no hay DHCP (más en el [punto de DHCP](/ApuntesRedes/04-direccionamiento-ip/07-dhcp)).

> ⚠️ **Error común de examen:** decir "las IPs privadas no se pueden usar". Falso: se usan constantemente *dentro* de la red. Lo que no pueden hacer es **circular por Internet sin traducirse**.

Un buen examen valora que distingas **privado** (RFC 1918, lo eliges tú), **público** (lo reparte un ISP) y **especial** (reservado: loopback, APIPA, multicast, broadcast).

---

## 🧠 Mini-chequeo

1. ¿De qué clase es `172.20.30.40`? ¿Y `8.8.8.8`?
2. Nombra los tres rangos privados de RFC 1918 con su CIDR.
3. ¿Qué problema resolvió CIDR?
4. Dos empresas tienen `192.168.0.0/24` en su interior. ¿Hay conflicto? ¿Por qué?

<details>
<summary>🔄 Respuestas</summary>

1. `172.20.30.40` → **clase B** (172 está entre 128 y 191). `8.8.8.8` → **clase A** (8 entre 0 y 127).
2. **10.0.0.0/8**, **172.16.0.0/12** y **192.168.0.0/16**.
3. Acabó con las **clases fijas**: manda la máscara /n, lo que reduce el **desperdicio** y permite **agregar rutas**.
4. **No hay conflicto**: son ámbitos aislados; al salir, cada router aplica **NAT** con su pública.
</details>

---

## ✅ Resumen en 3 frases

- Las clases A-E repartían IPv4 por primeros bits con máscaras fijas y muchísimo desperdicio; CIDR (1993) las eliminó: hoy manda la **/n**.
- RFC 1918 reserva `10/8`, `172.16/12` y `192.168/16` como **privadas**, reutilizables en cualquier red; las **públicas** son únicas y viajan por Internet.
- Privada + NAT + IPv6 es la respuesta al agotamiento: un apaño que funciona… hasta que IPv6 lo resuelva de verdad.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| Clase A-E | Antigua clasificación de IPv4 por primeros bits (legacy) |
| CIDR | Direccionamiento sin clases: manda la notación /n |
| RFC 1918 | Documento que define los tres rangos privados |
| IP privada | Dirección interna, no enrutable en Internet |
| IP pública | Dirección única mundial, enrutable por Internet |
| NAT | Traducción de IP privada a pública al salir |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/04-direccionamiento-ip) · **Anterior:** [2 · Binario y la operación AND](/ApuntesRedes/04-direccionamiento-ip/02-binario-y-and) · **Siguiente:** [4 · Máscaras y notación CIDR](/ApuntesRedes/04-direccionamiento-ip/04-mascaras-y-cidr)
