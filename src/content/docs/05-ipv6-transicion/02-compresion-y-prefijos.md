---
title: 02 — Compresión y prefijos
description: Las dos reglas para acortar direcciones y por qué /64 manda ✂️
---

<p><small>Las dos reglas para acortar direcciones y por qué /64 manda ✂️</small></p>

> 🗺️ **Estás en:** 🚀 **U05 · IPv6 y transición** → 02 · Compresión y prefijos

---

## 📬 La idea en una frase

> Escribir 32 caracteres hexadecimales es un coñazo, así que IPv6 define **dos reglas** para comprimir direcciones: omitir ceros a la izquierda y sustituir la cadena más larga de grupos cero por `::` (una sola vez).

Y el prefijo: lo que era una máscara en IPv4 aquí se escribe igual que CIDR (`/32`, `/48`, `/64`), con **/64 como estándar**.

---

## ✂️ Regla 1: omitir ceros a la izquierda

Dentro de cada grupo puedes eliminar los **ceros que van delante** (los ceros a la izquierda). No puedes eliminar ceros del medio ni del final del grupo.

```
2001:0DB8:0000:0000:0000:FF00:0042:8329
  ↘   ↘     ↘     ↘     ↘    ↘     ↘
2001:DB8:0:0:0:FF00:42:8329
```

- `0DB8` → `DB8` (quitamos el 0 inicial).
- `FF00` → `FF00` (no se toca: los dos ceros van al final).
- `0000` → `0` (queda un único cero que representa el grupo entero). No se puede dejar el grupo vacío.

> ❌ **Error típico:** escribir `2001:D:B::…` creyendo que comprimiste `0DB8` a `D` cuando también sobraba un `0B`. Solo se quitan *ceros*, nunca otros dígitos: `0DB8` = `DB8`, nunca `D8` ni `D`.

---

## ✂️ Regla 2: el doble dos puntos `::`

Si una dirección tiene **uno o varios grupos con todo ceros**, puedes sustituir **la cadena contigua más larga** por `::`. Con condiciones:

- **Una sola vez por dirección.** Usarlo dos veces es ilegal: el ordenador no sabría cuántos grupos cero representa cada `::`.
- Se comprime la cadena **más larga**; si hay empate, la primera.

```
2001:DB8:0:0:0:FF00:42:8329   →   2001:DB8::FF00:42:8329
       └─── 3 grupos cero ────┘     sustituidos por ::

FE80:0:0:0:2AA:FF:FE9A:4CA2   →   FE80::2AA:FF:FE9A:4CA2
                1 grupo cero            :: (una sola vez)

2001:DB8::ABCD:0:0:1234        →   no se comprime más
         │         └──2 ceros──┘   la cadena más larga ya
         │                          se llevó el :: (el par
         └── cadena mayor ya usada   de ceros se queda '0:0')
```

### 🎯 Ejemplos famosos

- **Loopback:** `::1` = `0000:0000:0000:0000:0000:0000:0000:0001`. Siete grupos cero + un 1. Equivale a `127.0.0.1`.
- **No especificada:** `::` = todos los grupos cero. Se usa como origen en DHCPv6 o al encender.

---

## 🧮 Comprimir y descomprimir paso a paso

**Comprimir:** `2001:0DB8:0000:0000:0000:FF00:0042:8329`

1. Regla 1 → `2001:DB8:0:0:0:FF00:42:8329`
2. Regla 2 → cadena de ceros `0:0:0` → `2001:DB8::FF00:42:8329`

**Descomprimir:** `2001:DB8::1` (el `::` oculta los grupos de en medio)

1. `::` = faltan `8 − 2 − 1 = 5` grupos de ceros.
2. Expandida: `2001:0DB8:0000:0000:0000:0000:0000:0001`

> 💡 **Truco mental:** cuenta cuántos grupos ves ya escritos y rellena el `::` con la diferencia que falte para llegar a 8. Siempre acaba en 8.

---

## 🧭 Prefijos: /32, /48 y /64

El prefijo se escribe igual que CIDR en IPv4: la dirección seguida de `/n` donde `n` son los **bits de red**.

```
2001:DB8::/32    →  los primeros 32 bits identifican la red
2001:DB8:1::/48  →  48 bits de red (típico de una organización)
2001:DB8:1:2::/64 → 64 bits de red: ¡el estándar para subredes!
```

**¿Qué tamaño da cada prefijo?**

| Prefijo | Tamaño de la red | Uso típico |
|---|---|---|
| /32 | 2⁹⁶ direcciones | Prefijo asignado a un ISP |
| /48 | 2⁸⁰ direcciones | Org: 65.536 subredes /64 para cada sede |
| /64 | 2⁶⁴ direcciones | **Estándar** para una subred LAN |
| /56 | 2⁷² direcciones | Hogares/pequeñas oficinas (256 subredes /64) |

---

## 🤔 ¿Por qué /64 es el estándar?

La IETF recomienda usar siempre **/64 para subredes** porque:

- Los **64 bits inferiores** quedan reservados para el **identificador de interfaz**, que se construye con EUI-64 ([punto 4](/ApuntesRedes/05-ipv6-transicion/04-eui64-y-slaac)) y habilita **SLAAC** sin servidor central.
- Con /64, cualquier prefijo más largo (por ejemplo /72) **rompe SLAAC estándar**: la autoconfiguración ya no encaja.

> ⚠️ **Ojo:** aunque parezca un desperdicio gigantesco (¡2⁶⁴ direcciones por LAN!), en IPv6 eso da igual: hay de sobra. Desperdiciar a propósito asegura que SLAAC y EUI-64 funcionen sin fricción. Eso es lo que CONRAD llama "desperdicio elegante".

---

## 🧠 Mini-chequeo

1. Comprime al máximo `2001:0DB8:0000:0000:0000:0000:0000:0001`.
2. Expande `FE80::2AA:FF:FE9A:4CA2` a sus 8 grupos completos.
3. ¿Por qué `2001:DB8::ABCD::1` es una dirección inválida?

<details>
<summary>🔄 Respuestas</summary>

1. Regla 1 → `2001:DB8:0:0:0:0:0:1`; Regla 2 → la cadena más larga son los cinco `0` consecutivos → **`2001:DB8::1`**.
2. El `::` oculta 4 grupos de ceros: `FE80:0000:0000:0000:02AA:00FF:FE9A:4CA2`. Recuerda: `2AA` → `02AA` y `FF` → `00FF` al reexpandir.
3. Porque el `::` solo puede usarse **una sola vez**: si aparece dos veces, no se puede deducir cuántos grupos cero representa cada uno. La dirección correcta sería `2001:DB8::ABCD:0:0:1`.
</details>

---

## ✅ Resumen en 3 frases

- Regla 1: omite los **ceros a la izquierda** de cada grupo; regla 2: sustituye la cadena más larga de grupos cero por **`::` una sola vez**.
- Los prefijos se expresan en CIDR: **/32 ISP, /48 organización, /64 subred**.
- **/64 es el estándar** de subred porque deja 64 bits para el identificador de interfaz, habilitando SLAAC y EUI-64.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| `::` | Doble dos puntos: sustituye la cadena más larga de grupos cero (1 vez) |
| Ceros a la izquierda | Dígitos 0 iniciales de un grupo que se pueden omitir |
| Prefijo /64 | 64 bits de red: estándar de subred, 64 bits libres para la interfaz |
| Loopback `::1` | Equivalente a 127.0.0.1 |
| Descomprimir | Rellenar el `::` hasta completar 8 grupos |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/05-ipv6-transicion) · **Anterior:** [01 · Estructura de IPv6](/ApuntesRedes/05-ipv6-transicion/01-estructura-ipv6) · **Siguiente:** [03 · Tipos de direcciones](/ApuntesRedes/05-ipv6-transicion/03-tipos-de-direcciones)