---
title: 03 — Clases de direcciones
description: El antiguo régimen de clases A-E y cómo CIDR lo derrocó 👑
---

<p><small>El antiguo régimen de clases A-E y cómo CIDR lo derrocó 👑</small></p>

> 🗺️ **Estás en:** 🧮 **U05 · IPv4 y subnetting** → 03 · Clases de direcciones

---

## 📬 La idea en una frase

> Antes de 1993, las IPv4 se repartían en **clases fijas (A, B, C, D, E)** según sus primeros bits; **CIDR** llegó y eliminó las clases, dejando que cualquier máscara se use con cualquier red.

Entender las clases es entender la historia de Internet y, de paso, por qué se desperdiciaron millones de IPs. Aunque ya no se usan para asignar direcciones, siguen apareciendo en exámenes y en textos legacy. Y CONRAD las menciona con la misma nostalgia que un abuelo sus cromos.

---

## 👑 El antiguo régimen: clases A-E

Originalmente la dirección se *leía* en los primeros bits: según cómo empezara el primer octeto, sabías de qué clase era y qué máscara le tocaba por defecto.

| Clase | Primeros bits | Rango | Máscara por defecto | Uso |
|---|---|---|---|---|
| **A** | 0 | 0.0.0.0 - 127.255.255.255 | /8 | Grandes redes (16M hosts) |
| **B** | 10 | 128.0.0.0 - 191.255.255.255 | /16 | Redes medianas (65K hosts) |
| **C** | 110 | 192.0.0.0 - 223.255.255.255 | /24 | Redes pequeñas (254 hosts) |
| **D** | 1110 | 224.0.0.0 - 239.255.255.255 | — | Multicast |
| **E** | 1111 | 240.0.0.0 - 255.255.255.255 | — | Experimental |

### ¿Cómo saber la clase al vuelo? Mira el primer octeto en decimal

| Primer octeto | Clase |
|---|---|
| 0 - 127 | A |
| 128 - 191 | B |
| 192 - 223 | C |
| 224 - 239 | D (multicast) |
| 240 - 255 | E (experimental) |

**Ejemplos:** `10.0.0.5` es clase **A** (10 está entre 0 y 127). `172.16.0.1` es clase **B**. `192.168.1.1` es clase **C**.

> 💡 **El problema histórico:** una clase A era una pasada de grande para casi cualquiera (16 millones de hosts) y una clase C demasiado pequeña para la mayoría. Si tenías 50.000 hosts, "tocaba" una clase B entera y desaprovechabas miles de IPs. Ese desperdicio aceleró el agotamiento del espacio IPv4.

### Identificar la clase "al vuelo" sin calculadora

Truco infalible con el primer octeto en decimal:

```
 0  - 127  → A   128 - 191 → B   192 - 223 → C
224 - 239  → D (multicast)   240 - 255 → E (experimental)
```

| Ejemplo | Primer octeto | Clase |
|---|---|---|
| 10.0.0.5 | 10 | A |
| 172.16.0.1 | 172 | B |
| 192.168.1.1 | 192 | C |
| 224.0.0.5 | 224 | D (multicast, OSPF) |

### ¿Y qué pasa con la clase D y la E?

- **D** no se usa para equipos: es la reserva del **multicast** (envío de "uno a muchos dentro de un grupo"). Ahí viven OSPF y otros protocolos que verás en la U10.
- **E** es experimental: reservada por la IETF, no se asigna nunca en producción. Si un router recibe un destino en clase E, normalmente lo descarta.

---

## 🗡️ CIDR: el golpe de estado que eliminó las clases

En 1993 llegó **CIDR** (*Classless Inter-Domain Routing*), conceptos clave en negrita:

- **Sin clases:** ya no se mira *de qué clase es* la IP; se mira la **máscara /n** que la acompaña.
- **Sin máscaras fijas:** cualquier máscara puede usarse con cualquier red, del tamaño que se necesite.
- **Rutas agregadas:** permite agrupar varias redes en una sola ruta (se verá al hablar de sumarización en el boletín avanzado).

Con CIDR, el límite entre red y host ya **no está fijo**. La misma "forma" de IP puede significar cosas distintas según su /n:

```
10.0.0.0/8       → Red: 8 bits (10.x.x.x), Host: 24 bits
172.16.0.0/16    → Red: 16 bits (172.16.x.x), Host: 16 bits
192.168.1.0/24   → Red: 24 bits, Host: 8 bits
192.168.1.128/25 → Red: 25 bits, Host: 7 bits
```

> ⚠️ **Un detalle que confunde:** `10.0.0.0/8` es la "red clase A" de toda la vida, y sigue siendo un **rango privado RFC 1918** (lo verás en el [punto 4](/ApuntesRedes/05-ipv4-subnetting/04-ip-privadas-y-publicas)). Pero que la llama "clase A" históricamente no significa que hoy se trate con reglas de clase A: su tamaño lo decide el /8.

### Ejemplo práctico: dos formas de leer el mismo número

| Dirección | Lectura de clases (legacy) | Lectura CIDR (actual) |
|---|---|---|
| 10.0.0.0/8 | "Clase A": red = 10.0.0.0, máscara fija /8 | Red de 8 bits, host de 24: tamaño libremente definido |
| 192.168.1.0/24 | "Clase C": red = 192.168.1.0, máscara fija /24 | Red de 24 bits, host de 8: tamaño libremente definido |

En ambos mundos la red "por defecto" coincide con la máscara de su clase. La revolución de CIDR llega cuando quieres **otras máscaras**: con CIDR puedes dar a `192.168.1.0` un /26 o un /30 y nadie discute. Con clases habría sido un pecado.

---

## 🧠 Mini-chequeo

1. ¿De qué clase es `172.20.30.40`? ¿Y `8.8.8.8`?
2. ¿Qué máscara por defecto tiene una clase A? ¿Y una clase C?
3. ¿Qué problema resolvió CIDR?

<details>
<summary>🔄 Respuestas</summary>

1. `172.20.30.40` → **clase B** (primer octeto 172, entre 128 y 191). `8.8.8.8` → **clase A** (primer octeto 8, entre 0 y 127).
2. Clase A → **/8** (255.0.0.0). Clase C → **/24** (255.255.255.0).
3. CIDR eliminó las **clases fijas** y permitió usar máscaras a medida, reduciendo el **desperdicio** de direcciones y permitiendo **agregar rutas** (routing sin clases).
</details>

---

## ✅ Resumen en 3 frases

- Las clases A-E repartían las IPs por primeros bits, con máscaras fijas por defecto y muchísimo desperdicio.
- CIDR (1993) acabó con las clases: hoy manda la **notación /n**, no el primer octeto.
- Aunque las clases son legacy, saberlas sigue siendo útil para leer rangos y aprobar exámenes.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| Clase A-E | Antigua clasificación de IPv4 por primeros bits |
| Máscara por defecto | Máscara que "tocaba" por clase (/8, /16, /24) |
| CIDR | Classless Inter-Domain Routing: direccionamiento sin clases |
| Notación /n | Número de bits de red de una dirección |
| Legacy | Término de "lo que ya no se usa pero sigue apareciendo por ahí" |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/05-ipv4-subnetting) · **Anterior:** [02 · Binario y la operación AND](/ApuntesRedes/05-ipv4-subnetting/02-binario-y-and) · **Siguiente:** [04 · IPs privadas y públicas](/ApuntesRedes/05-ipv4-subnetting/04-ip-privadas-y-publicas)