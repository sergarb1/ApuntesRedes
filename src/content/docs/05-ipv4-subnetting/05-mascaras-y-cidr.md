---
title: 05 — Máscaras y notación CIDR
description: La frontera que separa red de host, del /30 al /8 🪟
---

<p><small>La frontera que separa red de host, del /30 al /8 🪟</small></p>

> 🗺️ **Estás en:** 🧮 **U05 · IPv4 y subnetting** → 05 · Máscaras y notación CIDR

---

## 📬 La idea en una frase

> La **máscara de subred** es un número de 32 bits con 1s donde está la red y 0s donde está el host; la **notación CIDR** la abrevia como `/n` con el número de bits a 1.

Si la IP es tu número de casa, la máscara es la frontera del vecindario. Sin máscara, una IP es una isla: el equipo no sabe quién es vecino suyo (con quién habla directo) y quién vive en otro barrio (con quién necesita usar el gateway).

---

## 🪟 ¿Qué es la máscara de subred?

Una máscara es también un número de 32 bits, pero con una regla fija: **primero van los 1s y después los 0s**. Los 1s marcan la porción de **red**; los 0s la porción de **host**.

```
255.255.255.0  →  11111111.11111111.11111111.00000000
                  │────── red (24 bits) ──────││ host │
```

La forma decimal de la máscara sale de convertir cada octeto: `11111111` = 255, `00000000` = 0. Por eso la clásica `255.255.255.0`.

### Notación CIDR: `/n`

En vez de escribir los cuatro octetos, se cuenta cuántos bits a 1 tiene la máscara:

```
255.255.255.0  = /24   (24 bits a 1)
255.255.255.192 = /26  (26 bits a 1)
255.255.0.0    = /16   (16 bits a 1)
```

`/24` y `255.255.255.0` son exactamente lo mismo, dicho de dos formas.

### ¿De dónde sale el decimal de una máscara?

Cada octeto de la máscara solo puede ser (on notación de 8 bits) un grupo de **unos consecutivos seguidos de ceros**. Los valores posibles, del más sencillo al más denso:

```
00000000 = 0      · 10000000 = 128
11000000 = 192    · 11100000 = 224
11110000 = 240    · 11111000 = 248
11111100 = 252    · 11111110 = 254
11111111 = 255
```

Solo existen esos 9 valores por octeto. Si un día "ves" un octeto de máscara distinto (como 172, por ejemplo), es que algo está mal configurado: la máscara siempre es una racha de 1s y después 0s.

### Cálculo mental sin tabla

`32 − n` te da los bits de host `h`, y con la potencia de 2 sabes el tamaño:

```
/24 → h = 8 → 2⁸ = 256 IPs   →  254 hosts útiles
/27 → h = 5 → 2⁵ = 32 IPs    →  30 hosts útiles
/30 → h = 2 → 2² = 4 IPs     →  2 hosts útiles
```

Cada vez que subes 1 en la /n, **pierdes la mitad** de las direcciones; cada vez que bajas, las **duplicas**. Del /24 (256) al /23 (512), al /22 (1024)… siempre ×2 al bajar un bit.

---

## 📋 Tabla rápida completa de máscaras

Esta es la tabla que debes tener *grabada a fuego* (o al menos a mano). Desde las redes infinitesimales /30 hasta las enormes /8:

| CIDR | Máscara | Nº IPs totales | Nº hosts útiles | Uso típico |
|---|---|---|---|---|
| /30 | 255.255.255.252 | 4 | **2** | Enlace punto a punto |
| /29 | 255.255.255.248 | 8 | **6** | Red muy pequeña |
| /28 | 255.255.255.240 | 16 | **14** | Grupo pequeño |
| /27 | 255.255.255.224 | 32 | **30** | Departamento pequeño |
| /26 | 255.255.255.192 | 64 | **62** | Departamento mediano |
| /25 | 255.255.255.128 | 128 | **126** | Departamento grande |
| /24 | 255.255.255.0 | 256 | **254** | Oficina estándar |
| /23 | 255.255.254.0 | 512 | **510** | Oficina grande |
| /22 | 255.255.252.0 | 1024 | **1022** | Edificio |
| /21 | 255.255.248.0 | 2048 | **2046** | Edificio grande |
| /16 | 255.255.0.0 | 65536 | **65534** | Empresa mediana |
| /8 | 255.0.0.0 | 16M | **~16M** | Gran empresa |

> ⚠️ **Por qué "hosts útiles" ≠ "IPs totales":** de cada red, la primera dirección es la de **red** y la última el **broadcast**. Ninguna se asigna a un equipo. Por eso se restan 2 (en detalle en el [punto 6](/ApuntesRedes/05-ipv4-subnetting/06-subnetting-paso-a-paso)).

### Cómo leer la tabla

- **Nº hosts útiles = 2ʰ − 2**, donde `h` es el número de bits de host (32 − n).
- Cada salto de máscara (**/24 → /23**) **duplica** el tamaño: del /24 (254) al /23 (510)… porque al bajar 1 bit de red, ganas 1 bit de host, y eso dobla las direcciones.
- El **/30** es el ejemplo favorito de los exámenes: solo 2 hosts útiles, justo lo que necesita un enlace entre dos routers.

---

## 🧠 Mini-chequeo

1. Convierte `/26` a su máscara decimal. ¿Cuántos hosts útiles tiene?
2. ¿Cuál es la máscara decimal de `/30` y para qué se usa típicamente?
3. Si una red tiene 254 hosts útiles, ¿qué notación /n le corresponde?

<details>
<summary>🔄 Respuestas</summary>

1. `/26` = **255.255.255.192** (`11111111.11111111.11111111.11000000`). Hosts: 2⁶ − 2 = **62**.
2. `/30` = **255.255.255.252**. Se usa en **enlaces punto a punto**, porque solo necesita 2 IPs de host.
3. 254 = 2⁸ − 2 → 8 bits de host → 32 − 8 = **/24**.
</details>

---

## ✅ Resumen en 3 frases

- La máscara separa **red** (1s) de **host** (0s) y se abrevia con notación **/n**.
- La tabla /30→/8 te da de un vistazo IPs totales y hosts útiles de cualquier /n.
- Los hosts útiles son `2ʰ − 2`: se descuentan la red y el broadcast.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| Máscara de subred | 32 bits con 1s en la red y 0s en el host |
| Notación CIDR /n | Número de bits a 1 (bits de red) |
| Bits de host | 32 − n: los que quedan para direccionar equipos |
| IPs totales | 2ʰ, todas las direcciones del bloque |
| Hosts útiles | 2ʰ − 2, quitando red y broadcast |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/05-ipv4-subnetting) · **Anterior:** [04 · IPs privadas y públicas](/ApuntesRedes/05-ipv4-subnetting/04-ip-privadas-y-publicas) · **Siguiente:** [06 · Subnetting paso a paso](/ApuntesRedes/05-ipv4-subnetting/06-subnetting-paso-a-paso)