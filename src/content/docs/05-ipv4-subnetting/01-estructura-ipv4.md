---
title: 01 — Estructura de IPv4
description: 32 bits repartidos en 4 octetos y las IPs con manías 🎭
---

<p><small>32 bits repartidos en 4 octetos y las IPs con manías 🎭</small></p>

> 🗺️ **Estás en:** 🧮 **U05 · IPv4 y subnetting** → 01 · Estructura de IPv4

---

## 📬 La idea en una frase

> Una dirección IPv4 es un número de **32 bits** divididos en **4 octetos** que se escriben en **notación decimal punteada** para que ningún humano pierda la cabeza.

Cuando escribes `192.168.1.10` no estás leyendo un número de corrido: son cuatro grupos de 8 bits separados por puntos. Cada grupo se llama **octeto** y solo puede valer de 0 a 255. Aprender a leer esa notación es el primer paso para dominar todo lo que viene.

---

## 🧱 Anatomía de una IPv4

Una dirección IPv4 son **32 bits** en total. Se dividen en **4 octetos** de 8 bits cada uno:

```
32 bits = 4 octetos de 8 bits

 192        . 168        . 1          . 10
│         ││         ││       ││        │
11000000 . 10101000 . 00000001 . 00001010
│____________│_______│_________│________│
     4 octetos, cada uno con 8 bits (32 bits en total)
```

- Un **bit** es 0 o 1. Un **octeto** de 8 bits es el mínimo bloque de direccionamiento que usamos.
- Con 8 bits caben `2⁸ = 256` combinaciones, así que cada octeto vale de **0 a 255**.
- Por eso `192.168.1.256` es una IP **inválida**: 256 necesita 9 bits, y el octeto solo tiene 8.

### ¿Cuántas IPs caben en total?

Con 32 bits el espacio completo es enorme para su época y diminuto para hoy:

```
2³² = 4.294.967.296  →  unos 4.294 millones de direcciones
```

Dicho así parece mucho. Lo es... en 1981. Hoy hay más dispositivos conectados que direcciones posibles, y de ahí vienen (casi) todos los dramas de esta unidad.

---

## 🌐 Notación decimal punteada

Cada octeto se convierte de binario a decimal y se separa con puntos:

| Binario (8 bits) | Decimal | 
|---|---|
| `11000000` | 192 |
| `10101000` | 168 |
| `00000001` | 1 |
| `00001010` | 10 |

Juntos forman `192.168.1.10`. Simple. Ese es todo el truco de la notación: **traducir cada octeto binario a decimal** y unirlo con puntos. En el [punto 2](/ApuntesRedes/05-ipv4-subnetting/02-binario-y-and) aprenderás a hacer esa conversión como un rayo.

> 💡 **Tip:** una IP por sí sola no dice nada: necesita saber qué parte es *red* y qué parte es *host*. Eso lo decide la **máscara**, que verás en el [punto 5](/ApuntesRedes/05-ipv4-subnetting/05-mascaras-y-cidr). Por ahora, memoriza que la IP es solo el número de casa; la máscara decide el vecindario.

---

## 🎭 Las IPs con manías

No todas las direcciones del espacio IPv4 se pueden usar para asignar a un equipo normal. Algunas tienen "reservado" escrito en la frente:

| Dirección | Significado |
|---|---|
| **0.0.0.0/8** | "Esta red" (ruta por defecto, el 0.0.0.0 es la estrella del enrutamiento) |
| **127.0.0.0/8** | Loopback (localhost: 127.0.0.1 habla contigo mismo) |
| **169.254.0.0/16** | APIPA: IP autoasignada cuando DHCP no responde y tu OS se inventa una para no llorar |
| **224.0.0.0/4** | Multicast (224.0.0.5 = OSPF, 224.0.0.1 = todos los hosts de la red local) |
| **240.0.0.0/4** | Reservado / experimental: mejor no tocarlo |
| **255.255.255.255** | Broadcast limitado (llega a todos los hosts de la red en capa 2) |

> ⚠️ **Trampa de examen:** el **loopback** (127.x.x.x) no es una IP "de la casa", es una dirección que dice "habla con este mismo equipo". Hacer `ping 127.0.0.1` no sale a ningún sitio: comprueba que tu pila TCP/IP funciona.

Una de las más odiadas es **169.254.x.x**: cuando un PC no consigue IP por DHCP, se asigna él mismo una APIPA. El día que veas esa IP en un `ipconfig /all`, sabe que el DHCP no respondió. Lo verás a fondo en el [punto 8](/ApuntesRedes/05-ipv4-subnetting/08-dhcp).

---

## 🧠 Mini-chequeo

1. ¿Cuántos bits y octetos tiene una dirección IPv4? ¿Por qué un octeto no puede valer 256?
2. ¿Cuántas direcciones IPv4 existen en total con los 32 bits?
3. Identifica qué tipo de dirección especial es cada una: `127.0.0.1`, `169.254.0.5`, `255.255.255.255`.

<details>
<summary>🔄 Respuestas</summary>

1. **32 bits en 4 octetos.** Un octeto de 8 bits solo admite `2⁸ = 256` combinaciones (0-255). El 256 necesitaría un bit más, y ese bit no existe.
2. **2³² = 4.294.967.296** direcciones: unos 4.294 millones.
3. `127.0.0.1` → **loopback** (localhost). `169.254.0.5` → **APIPA** (DHCP no respondió). `255.255.255.255` → **broadcast limitado**.
</details>

---

## ✅ Resumen en 3 frases

- Una IPv4 son **32 bits en 4 octetos**, escritos en notación decimal punteada con valores de 0 a 255.
- El espacio total es de **4.294 millones** de direcciones, que hoy se quedan cortas.
- Algunas direcciones están **reservadas** (loopback, APIPA, multicast, broadcast): no son IPs asignables.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| IPv4 | Protocolo de direccionamiento de 32 bits en 4 octetos |
| Octeto | Bloque de 8 bits; vale de 0 a 255 |
| Notación decimal punteada | Escribir los octetos en decimal separados por puntos (192.168.1.10) |
| Loopback | 127.0.0.0/8: "habla contigo mismo", test de la pila TCP/IP |
| APIPA | 169.254.0.0/16: IP autoasignada si DHCP no responde |
| Broadcast | 255.255.255.255: mensaje para todos los hosts de la red |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/05-ipv4-subnetting) · **Anterior:** [Índice de la unidad](/ApuntesRedes/05-ipv4-subnetting) · **Siguiente:** [02 · Binario y la operación AND](/ApuntesRedes/05-ipv4-subnetting/02-binario-y-and)