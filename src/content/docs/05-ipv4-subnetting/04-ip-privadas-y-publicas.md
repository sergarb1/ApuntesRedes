---
title: 04 — IPs privadas y públicas
description: Las direcciones que nunca salen de casa y las que se pasean por Internet 🏠
---

<p><small>Las direcciones que nunca salen de casa y las que se pasean por Internet 🏠</small></p>

> 🗺️ **Estás en:** 🧮 **U05 · IPv4 y subnetting** → 04 · IPs privadas y públicas

---

## 📬 La idea en una frase

> La IANA reservó unos rangos de IPv4 **solo para uso interno** (RFC 1918); esas **IPs privadas** se pueden reutilizar en cualquier red del mundo, mientras que las **públicas** son únicas y nadie más puede usarlas en Internet.

Si repartieras a cada dispositivo del planeta una dirección única, ya te habrías quedado sin espacio desde hace décadas. Las privadas son la solución pragmática: tu oficina, tu casa y la de tu vecino pueden usar todas `192.168.1.10` sin pelearse, porque nunca viajan a Internet tal cual.

---

## 🏠 Las IPs privadas (RFC 1918)

La **IANA** reservó estos tres rangos para uso interno. **No son enrutables en Internet**: ningún router de Internet sabe dónde mandar un paquete dirigido a una IP de estos rangos, a propósito.

| Rango | Máscara CIDR | Nº de IPs | Uso típico |
|---|---|---|---|
| **10.0.0.0 - 10.255.255.255** | /8 | 16.777.216 | Grandes empresas |
| **172.16.0.0 - 172.31.255.255** | /12 | 1.048.576 | Empresas medianas |
| **192.168.0.0 - 192.168.255.255** | /16 | 65.536 | Hogar y pequeña oficina |

> ⚠️ **Ojo con el rango B:** el bloque privado **172.16.0.0/12** NO es todo el 172.x.x.x: solo va de `172.16.0.0` a `172.31.255.255`. `172.32.0.1` ya es una IP normalmente pública y válida.

### ¿Cómo identifico una IP privada al vuelo?

Regla mental de tres casos (mira solo el primer octeto... salvo el 172):

| Primeros octetos | ¿Privada? |
|---|---|
| `10.x.x.x` | ✅ Sí — RFC 1918 |
| `172.16.x.x` a `172.31.x.x` | ✅ Sí — RFC 1918 (**solo del 16 al 31**) |
| `192.168.x.x` | ✅ Sí — RFC 1918 |
| Cualquier otro valor | ❌ No — es pública o especial |

**Ejemplos:** `10.0.0.15` → privada. `172.31.255.40` → privada. `192.168.0.1` → privada. `172.40.5.5` → pública (40 no está en 16-31). `8.8.8.8` → pública.

### ¿Por qué existen?

Moraleja: el espacio IPv4 se agotó porque **4.294 millones de direcciones se quedaron cortas** cuando todo se conectó. Con las privadas, la solución es de libro:

- Una organización usando `192.168.0.0/16` tiene **65.536 direcciones internas** sin costar ni un céntimo de espacio público.
- Porque esas direcciones se pueden **reutilizar simultáneamente** en millones de redes distintas del planeta.
- Y cuando un equipo de dentro necesita salir a Internet, el router hace **NAT** y le presta una IP pública a la vez (lo verás en el [punto de NAT de la U11](/ApuntesRedes/11-nat-internet)).

---

## 🌍 Las IPs públicas: únicas en el mundo

Las direcciones **públicas** son las que viajan por Internet. Reglas del juego:

- **Son únicas a nivel mundial**: no puede haber dos equipos con la misma IP pública simultáneamente, o Internet no sabría cuál es cuál.
- **Las asigna la IANA en bloques** a los registros regionales (RIR) y estos a los ISP y grandes empresas.
- **Van por Internet sin traductor**: DNS, servidores web, VoIP… todo lo que se ofrece desde fuera vive en una pública.

> 💡 **Ejemplo real:** `8.8.8.8` es un DNS público de Google. Todo el mundo usa esa IP, pero es única: solo un conjunto de servidores de Google responden a ella. Nadie más puede "ponerse" ese número.

### ¿Cómo consigue una IP pública un ISP?

El reparto es en pirámide: la **IANA** entrega bloques a los **RIR** (registros regionales: RIPE en Europa, ARIN en Norteámerica, LACNIC en Latinoamérica…), estos a los **ISP**, y el ISP te asigna a ti una parte. Nunca "compras" una IP: **la alquilas**. Por eso, si cambias de operador, tu dirección pública cambia y los servicios apuntados con DNS tardan en "enterrarse".

---

## 🔗 La relación con NAT e IPv6

Ahora encajan todas las piezas:

- **NAT (U11):** el router convierte la IP privada de la LAN en su IP pública para salir. Un solo `83.45.12.78` de la oficina puede sostener cientos de PCs internos con IPs privadas distintas.
- **Reutilización:** dos redes pueden usar la misma `10.0.1.10` sin conflicto, porque el NAT aísla sus ámbitos. Es como dos personas llamadas "Juan" en ciudades distintas.
- **IPv6 (U06):** con 128 bits, cada dispositivo puede tener una dirección pública *de verdad* sin NAT. Las privadas son un apaño brillante... pero un apaño al fin y al cabo.

> ⚠️ **Error común de examen:** decir "las IPs privadas no se pueden usar". Falso: se usan constantemente *dentro* de la red. Lo que no pueden hacer es **circular por Internet sin traducirse**.

### ¿Qué se considera "privada" pero no es RFC 1918?

Cuidado, hay dos rangos que parecen privados y no lo son:

- **127.0.0.0/8 (loopback):** no sale de tu equipo, pero tampoco viaja por ninguna red. Es "especial", no "privado" RFC 1918.
- **169.254.0.0/16 (APIPA):** tampoco es privado *asignable*: es el rango de emergencia que se ponen solos los hosts cuando no hay DHCP. Verás más en el [punto 8](/ApuntesRedes/05-ipv4-subnetting/08-dhcp).

Un buen examen valora que distingas **privado** (RFC 1918, lo eliges tú al diseñar), **público** (lo reparte un ISP) y **especial** (reservado para funciones concretas: loopback, APIPA, multicast, broadcast).

---

## 🧠 Mini-chequeo

1. Nombra los tres rangos privados de RFC 1918 con su notación CIDR.
2. ¿Por qué una IP privada no puede llegar a Internet tal cual? ¿Qué hace el router?
3. Dos empresas tienen la misma red `192.168.0.0/24` en su interior. ¿Hay conflicto? ¿Por qué?

<details>
<summary>🔄 Respuestas</summary>

1. **10.0.0.0/8**, **172.16.0.0/12** y **192.168.0.0/16**.
2. No es **enrutable en Internet**: ningún router público la sabe encaminar. Para salir, el router aplica **NAT** y la traduce a una IP pública.
3. **No hay conflicto**: son ámbitos aislados. Al salir a Internet, cada router hace NAT y las "disfraza" con su IP pública; por eso se pueden reutilizar a escala global.
</details>

---

## ✅ Resumen en 3 frases

- RFC 1918 reserva `10/8`, `172.16/12` y `192.168/16` como IPs **privadas**, reutilizables en cualquier red.
- Las IPs **públicas** son únicas en el mundo y viajan por Internet; las privadas no son enrutables sin NAT.
- El trío privada + NAT + IPv6 es la respuesta al agotamiento de IPv4: un apaño que funciona, hasta que IPv6 lo resuelva de verdad.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| RFC 1918 | Documento que define los rangos privados de IPv4 |
| IP privada | Dirección interna, no enrutable en Internet |
| IP pública | Dirección única mundial, enrutable por Internet |
| IANA | Entidad que reparte los bloques de direcciones IP globales |
| NAT | Traducción de IP privada a pública al salir (U11) |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/05-ipv4-subnetting) · **Anterior:** [03 · Clases de direcciones](/ApuntesRedes/05-ipv4-subnetting/03-clases-de-direcciones) · **Siguiente:** [05 · Máscaras y notación CIDR](/ApuntesRedes/05-ipv4-subnetting/05-mascaras-y-cidr)