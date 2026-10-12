---
title: 8 — Estructura de IPv6
description: Por qué IPv6 y cómo leer sus 128 bits en 8 grupos hexadecimales 🧬
---

<p><small>Por qué IPv6 y cómo leer sus 128 bits en 8 grupos hexadecimales 🧬</small></p>

> 🗺️ **Estás en:** 🧮 **Direccionamiento IP y subnetting** → 8 · Estructura de IPv6

---

## 📬 La idea en una frase

> IPv6 es la versión 6 del protocolo IP con **direcciones de 128 bits** escritas en **8 grupos de 4 dígitos hexadecimales** separados por dos puntos: `2001:0DB8:0000:0000:0000:FF00:0042:8329`.

Frente a los 32 bits de IPv4, 128 bits significan *muchísimas* más direcciones: unas **340 sextillones**. Tantos que se acabó la excusa de racionar. En este punto entendemos el *porqué*, aprendemos a *leer* una dirección IPv6 y a comprimirla para que quepa en un chat.

---

## 🌍 ¿Por qué existe IPv6? El agotamiento

IPv4 tiene **32 bits**, lo que da exactamente **2³² = 4.294.967.296** direcciones posibles (unos 4.300 millones). Cuando se diseñó, parecían infinitas. El problema es que el mundo conecta mucho más que ordenadores:

- Teléfonos, tablets, relojes, bombillas, cámaras, coches… cada dispositivo quiere su IP.
- Los bloques se repartieron de forma desigual desde el principio (por la intervención de EE. UU.; Europa recibió la parte del león).
- **2011:** la IANA repartió los últimos bloques grandes. **2019:** Europa (RIPE NCC) agotó su stock. Hoy el agotamiento es un hecho consumado.

Por eso se diseñó **IPv6**: no es un parche ni una mejora de rendimiento, es la solución estructural a quedarse sin direcciones.

> 💡 **Guarda esta cifra:** IPv4 = 32 bits = 4.300 millones. IPv6 = 128 bits = 3,4 × 10³⁸. Es la primera pregunta de cualquier entrevista y la más fácil de responder.

---

## 🧬 Anatomía: los 8 grupos hexadecimales

Una dirección IPv6 se escribe en **hexadecimal** (base 16, dígitos `0-9` y letras `A-F`) agrupada de 4 en 4:

```
2001:0DB8:0000:0000:0000:FF00:0042:8329
 │     │    │    │    │    │    │    │
 └ 8 grupos de 4 dígitos hexadecimales cada uno
   = 8 × 16 bits = 128 bits por dirección
```

Cada **dígito hexadecimal = 4 bits** (un nibble), así que cada grupo de 4 dígitos son **16 bits**. Ocho grupos de 16 bits = **128 bits**. La separación es siempre con **dos puntos** `:`, nunca puntos.

El rango total de direcciones es:

```
2¹²⁸ = 340.282.366.920.938.463.463.374.607.431.768.211.456
     ≈ 3,4 × 10³⁸  →  más de 300 sextillones
```

### 🚦 La notación en práctica

- Las letras hexadecimales se pueden escribir en **mayúsculas o minúsculas** (es indistinto): `2001:db8:...` es lo mismo que `2001:DB8:...`. Los sistemas operativos dejan `ipconfig` en minúsculas y los manuales Cisco en mayúsculas.
- Los primeros 3 bits de una dirección GUA (Global Unicast) fijan su prefijo, pero de eso hablamos en el [punto de tipos de direcciones](/ApuntesRedes/04-direccionamiento-ip/09-tipos-de-direcciones).

---

## 🌐 De la teoría a tu `ipconfig`

En un PC moderno con IPv6 (que lo tendrás sin hacer nada, gracias a SLAAC), al ejecutar `ipconfig /all` verás algo como:

```
Ethernet adapter Ethernet:
   Connection-specific DNS Suffix . :
   IPv6 Address.........: 2001:db8:1:2:21a:2bff:fe3c:4d5e
   Link-local IPv6 Address: fe80::21a:2bff:fe3c:4d5e%12
   Default Gateway......: fe80::1%12
```

Fíjate en tres cosas: la dirección **Global Unicast** (la que empieza por `2001:`), la **Link-Local** (la `fe80::`) automática, y que el *Default Gateway* también es una Link-Local a la que se le añade `%12` (el Zone ID, que identifica qué interfaz física usar). Todo eso lo entenderás de verdad en los puntos de tipos de direcciones y de SLAAC.

> ⚠️ **No te asustes con el `%n`:** en Windows el número tras el `%` es el *Zone ID* de la interfaz (en Linux se usa `%eth0` o `%ifindex`). Es necesario porque una misma dirección Link-Local `fe80::1` puede existir en varias interfaces a la vez.

---

## ✂️ Compresión: dos reglas para escribir menos

Escribir los 32 caracteres completos es un rollo, así que IPv6 permite **acortar**:

**Regla 1 — omite ceros a la izquierda** de cada grupo. Del medio o del final, nunca.

```
2001:0DB8:0000:0000:0000:FF00:0042:8329
2001:DB8:0:0:0:FF00:42:8329
```

`0DB8` → `DB8` (solo ceros iniciales). `0000` → `0` (un cero que representa el grupo entero; no se deja vacío).

> ❌ **Error típico:** `2001:D:B::…` — solo se quitan *ceros*, nunca otros dígitos: `0DB8` = `DB8`, jamás `D8` ni `D`.

**Regla 2 — la cadena más larga de grupos cero → `::`**, una sola vez por dirección (con dos veces, no se sabría cuántos grupos oculta).

```
2001:0DB8:0000:0000:0000:FF00:0042:8329
2001:DB8::FF00:42:8329

::1   →  loopback (equivale a 127.0.0.1)
::    →  "no especificada" (origen en DHCPv6 o al encender)
```

**Descomprimir:** cuenta los grupos escritos y rellena el `::` hasta 8. `2001:DB8::1` → faltan `8 − 2 − 1 = 5` grupos de ceros → `2001:0DB8:0000:0000:0000:0000:0000:0001`.

## 🧭 Prefijos: /32, /48 y /64

Lo mismo que CIDR en IPv4: dirección + `/n` con los **bits de red**.

| Prefijo | Tamaño | Uso típico |
|---|---|---|
| /32 | 2⁹⁶ direcciones | Prefijo asignado a un ISP |
| /48 | 2⁸⁰ | Organización (65.536 subredes /64 por sede) |
| /56 | 2⁷² | Hogares y pequeñas oficinas |
| **/64** | 2⁶⁴ | **Estándar** para una subred LAN |

**¿Por qué /64 manda?** Porque los **64 bits inferiores** quedan para el identificador de interfaz (EUI-64) y eso permite **SLAAC** sin servidor. Cualquier prefijo más largo (/72…) rompe la autoconfiguración estándar. ¡2⁶⁴ direcciones por LAN, sí, pero en IPv6 hay de sobra: "desperdicio elegante" (dixit CONRAD)!

---

## 🤔 ¿Para qué tanta dirección?

Piensa en las tres consecuencias prácticas de quedarte con 128 bits:

- **Fin del racionamiento:** puedes asignar cada dispositivo con una dirección pública a la carta. Ya no hace falta NAT para esconderse detrás de una IP.
- **Autoconfiguración sencilla:** con 64 bits reservados para el identificador de interfaz, el dispositivo puede generarse el final de su dirección solo (eso es EUI-64, más adelante en la unidad).
- **Jerarquía de enrutamiento simple:** los prefijos largos (/48 o /32 para organizaciones) permiten agregar rutas sin que las tablas exploten.

---

## 🧠 Mini-chequeo

1. ¿Cuántos bits tiene un grupo de una dirección IPv6? ¿Y cuántos grupos hay en total?
2. ¿Cuántos bits tiene una dirección IPv6 completa? ¿Cuántas direcciones posibles hay (en notación científica)?
3. ¿Cómo distinguirías por escrito que una dirección es IPv6 y no IPv4?
4. Comprime al máximo `2001:0DB8:0000:0000:0000:0000:0000:0001`.
5. ¿Por qué `2001:DB8::ABCD::1` es inválida?

<details>
<summary>🔄 Respuestas</summary>

1. Cada grupo son **16 bits** (4 dígitos hexadecimales × 4 bits). Hay **8 grupos**, así que una dirección completa son 8 × 16 = **128 bits**.
2. **128 bits** → **2¹²⁸ ≈ 3,4 × 10³⁸** direcciones (340 sextillones).
3. La notación: IPv6 usa **8 grupos hexadecimales separados por dos puntos** (`2001:DB8::…`), mientras que IPv4 usa **4 octetos decimales separados por puntos** (`192.168.1.1`). Además, IPv6 solo contiene los dígitos `0-9` y `A-F`.
4. Regla 1 → `2001:DB8:0:0:0:0:0:1`; regla 2 → la cadena más larga es de cinco ceros → **`2001:DB8::1`**.
5. Porque el `::` solo puede usarse **una vez**: si hay dos, no se sabe cuántos grupos cero oculta cada uno.
</details>

---

## ✅ Resumen en 3 frases

- IPv6 nace del agotamiento de IPv4: direcciones de **128 bits** en 8 grupos hexadecimales.
- Se comprime omitiendo **ceros iniciales** y sustituyendo la cadena más larga de ceros por **`::`** (una sola vez).
- **/64 es el estándar** de subred: deja 64 bits para el identificador de interfaz y habilita SLAAC.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| IPv6 | Protocolo IP versión 6, direcciones de 128 bits |
| Grupo (hexteto) | Bloque de 4 dígitos hexadecimales = 16 bits |
| `::` | Sustituye la cadena más larga de grupos cero (1 vez por dirección) |
| Loopback `::1` | Equivalente a 127.0.0.1 |
| Prefijo /64 | 64 bits de red: estándar de subred; 64 libres para la interfaz |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/04-direccionamiento-ip) · **Anterior:** [7 · DHCP](/ApuntesRedes/04-direccionamiento-ip/07-dhcp) · **Siguiente:** [9 · Tipos de direcciones](/ApuntesRedes/04-direccionamiento-ip/09-tipos-de-direcciones)