---
title: 02 — Binario y la operación AND
description: El idioma materno de las redes, con pesos, conversión y AND 🔢
---

<p><small>El idioma materno de las redes, con pesos, conversión y AND 🔢</small></p>

> 🗺️ **Estás en:** 🧮 **U04 · IPv4 y subnetting** → 02 · Binario y la operación AND

---

## 📬 La idea en una frase

> Todo direccionamiento IPv4 se decide en binario: cada octeto es un grupo de 8 bits con **pesos** (128, 64, 32, 16, 8, 4, 2, 1), y la **operación AND** bit a bit con la máscara te dice a qué red pertenece una IP.

Las redes no piensan en decimal: piensan en 0s y 1s. Si entiendes los pesos de cada bit y sabes hacer un AND, ya has ganado el 80% de exámenes de esta unidad. CONRAD lo repite hasta hartarse: *"hazlo en binario"*.

---

## ⚖️ El peso de cada bit

Un octeto tiene 8 posiciones. Cada una tiene un **peso** que es una potencia de 2:

```
Bit:      1    1    0    0    0    0    0    0
Peso:   128   64   32   16    8    4    2    1
        ─────────────────────────────────────
2⁷=128 2⁶=64 2⁵=32 2⁴=16 2³=8 2²=4 2¹=2 2⁰=1

Si el bit vale 1, sumas su peso. Si vale 0, olvídalo.
```

Un bit a `1` suma su peso; a `0` no suma nada. Por eso:

- `11111111` = 128+64+32+16+8+4+2+1 = **255** (el máximo)
- `00000000` = **0** (el mínimo)
- `10000000` = **128**
- `00000001` = **1**

---

## 🔄 Convertir decimal a binario

Técnica infalible: restar los pesos de mayor a menor hasta que no quede nada.

**Ejemplo: 192 en binario**

```
192  - 128 = 64   → bit 128 = 1
64   - 64  = 0    → bit 64  = 1
el resto vale 0
192 = 1 1 0 0 0 0 0 0  = 128 + 64
```

**Ejemplo: 168 en binario**

```
168  - 128 = 40   → bit 128 = 1
40   - 64  = no   → bit 64  = 0
40   - 32  = 8    → bit 32  = 1
8    - 16  = no   → bit 16  = 0
8    - 8   = 0    → bit 8   = 1
resto = 0
168 = 1 0 1 0 1 0 0 0  = 128 + 32 + 8
```

Para convertir **binario a decimal** es la operación inversa: multiplica cada bit por su peso y suma.

### Tabla de conversión rápida

| Decimal | Binario | Decimal | Binario |
|---|---|---|---|
| 0 | 00000000 | 128 | 10000000 |
| 1 | 00000001 | 192 | 11000000 |
| 2 | 00000010 | 224 | 11100000 |
| 3 | 00000011 | 240 | 11110000 |
| ... | ... | 248 | 11111000 |
| 15 | 00001111 | 252 | 11111100 |
| 16 | 00010000 | 254 | 11111110 |
| 32 | 00100000 | 255 | 11111111 |
| 64 | 01000000 | | |
| 127 | 01111111 | | |

> 💡 **Trucos útiles:** `240` son 4 unos (`11110000`), `252` son 6 unos (`11111100`), `255` son 8 unos. Los valores pares "redondos" en el mundo de las redes siempre son una racha de unos seguida de ceros.

---

## 🧮 La operación AND

La **operación AND** compara bit a bit: dos valores se ponen cara a cara y, solo si **los dos son 1**, el resultado es 1.

```
1 AND 1 = 1
1 AND 0 = 0
0 AND 1 = 0
0 AND 0 = 0
```

Se parece a la lógica "el que da y no quita": solo gana cuando ambos aportan.

### ¿Para qué sirve en redes?

Un dispositivo con IP `192.168.1.10` quiere saber a qué red pertenece. Hace el **AND de su IP con la máscara `255.255.255.0`**:

```
IP:      192.168.1.10  → 11000000.10101000.00000001.00001010
Máscara: 255.255.255.0 → 11111111.11111111.11111111.00000000
AND:                   → 11000000.10101000.00000001.00000000
Red:     192.168.1.0
```

¿Por qué funciona? La máscara tiene **bits a 1 en la porción de red** y **bits a 0 en la porción de host**. El AND con 1 "deja pasar" el bit de la IP (se conserva la red) y el AND con 0 lo borra (los bits de host saltan por la ventana).

> ⚠️ **Regla de oro:** con el AND se descubre la **dirección de red**. Es la pregunta estrella de exámenes: *"¿están 192.168.1.10 y 192.168.1.200 en la misma red?"* → calcula el AND de ambas y compara.

---

## 🧠 Mini-chequeo

1. Convierte `10` a binario de 8 bits.
2. Convierte `10101000` a decimal.
3. Un equipo con IP `10.0.0.5` y máscara /8 (`255.0.0.0`): ¿cuál es su dirección de red?

<details>
<summary>🔄 Respuestas</summary>

1. `10` = 8 + 2 → bits 8 y 2 a 1 → **`00001010`**.
2. `10101000` = 128 + 32 + 8 = **168**.
3. AND de `10.0.0.5` (00001010.00000000.00000000.00000101) con `255.0.0.0` (11111111.00000000.00000000.00000000) → `00001010.00000000.00000000.00000000` = **10.0.0.0/8**.
</details>

---

## ✅ Resumen en 3 frases

- El binario es la lengua materna de las redes: cada octeto usa pesos de potencia de 2 (128…1).
- Convertir es restar pesos o sumar bits activados; con la tabla rápida ahorrarás tiempo.
- La operación **AND** entre IP y máscara devuelve la **dirección de red** y decide si dos equipos son vecinos.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| Bit | Un dígito binario: 0 o 1 |
| Peso de un bit | Valor que aporta si está a 1 (128, 64, 32…) |
| Octal / octeto | Bloque de 8 bits |
| AND | Operación bit a bit: solo 1·1 = 1 |
| Dirección de red | Resultado del AND entre IP y máscara |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/04-ipv4-subnetting) · **Anterior:** [01 · Estructura de IPv4](/ApuntesRedes/04-ipv4-subnetting/01-estructura-ipv4) · **Siguiente:** [03 · Clases de direcciones](/ApuntesRedes/04-ipv4-subnetting/03-clases-de-direcciones)