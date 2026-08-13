---
title: 06 — Subnetting paso a paso
description: Prestar bits de host para crear subredes, con las fórmulas y un ejemplo completo ✂️
---

<p><small>Prestar bits de host para crear subredes, con las fórmulas y un ejemplo completo ✂️</small></p>

> 🗺️ **Estás en:** 🧮 **U04 · IPv4 y subnetting** → 06 · Subnetting paso a paso

---

## 📬 La idea en una frase

> Subnetear es **tomar bits prestados de la porción de host** para convertir una red grande en varias subredes más pequeñas, con las fórmulas `2ⁿ` subredes y `2ʰ − 2` hosts.

Cuando `192.168.1.0/24` se queda pequeña (o demasiado "ruidosa" con el broadcast), no necesitas otra red: la divides. Netflix no llama a la operadora porque no caben todos los invitados: monta una segunda sala, y si hace falta, un pasillo más. Subnetear es eso.

---

## 📐 Las fórmulas clave

Antes de cortar, memoriza estas dos fórmulas. Son TODO el subnetting clásico:

```
Nº de subredes     = 2ⁿ   (n = bits prestados a la máscara)
Nº de hosts por    = 2ʰ − 2  (h = bits de host restantes)
```

- **n** = los bits que **prestas** de la porción de host y añades a la máscara.
- **h** = 32 − nueva máscara: los bits de host que **quedan** en cada subred.
- Se restan 2 porque la primera IP es la **dirección de red** y la última el **broadcast**: ni una ni otra se asignan a un dispositivo. (La única "excepción" divertida es el /31, pero no los veremos en clase: se usa en enlaces punto a punto de algunos ISP.)

### Paso a paso mental (4 pasos)

1. **¿Cuántos bits presto?** Busca el n mínimo tal que `2ⁿ ≥ nº de subredes`.
2. **Nueva máscara:** máscara original + n. Ej. /24 + 2 = /26.
3. **Hosts restantes:** h = 32 − máscara nueva → `2ʰ − 2` hosts por subred.
4. **Calcular las subredes:** incremento = `2ʰ` (o `256 − valor del octeto mágico`), y de ahí red → primer host → último host → broadcast.

---

## ✂️ Ejemplo completo: 192.168.1.0/24 → 4 subredes

**Red original:** 192.168.1.0/24
**Necesitas:** 4 subredes

**Paso 1:** ¿Cuántos bits necesitas prestar?

```
2ⁿ ≥ 4 → n = 2   (2² = 4)
```

**Paso 2:** Nueva máscara

```
Máscara original: /24 = 255.255.255.0   (11111111.11111111.11111111.00000000)
Bits prestados:   +2
Nueva máscara:    /26 = 255.255.255.192 (11111111.11111111.11111111.11000000)
```

**Paso 3:** Bits de host restantes

```
32 − 26 = 6 bits → 2⁶ − 2 = 62 hosts por subred
```

**Paso 4:** Calcular las subredes

El incremento entre subredes es `2ʰ = 2⁶ = 64` (o lo que es lo mismo: `256 − 192 = 64`):

| Subred | Dirección de red | Primer host | Último host | Broadcast |
|---|---|---|---|---|
| 1 | 192.168.1.0/26 | 192.168.1.1 | 192.168.1.62 | 192.168.1.63 |
| 2 | 192.168.1.64/26 | 192.168.1.65 | 192.168.1.126 | 192.168.1.127 |
| 3 | 192.168.1.128/26 | 192.168.1.129 | 192.168.1.190 | 192.168.1.191 |
| 4 | 192.168.1.192/26 | 192.168.1.193 | 192.168.1.254 | 192.168.1.255 |

> 💡 **Comporbar a ojo:** cada subred empieza donde acaba la anterior + 1. La subred 2 arranca en `.64` porque la 1 se comió de `.0` a `.63` (red .0, broadcast .63). Siempre cuadra.

---

## 🛡️ ¿Para qué sirve realmente subnetear?

No es un ejercicio de sadismo académico:

- **Ahorra IPs:** una sola /24 con cuatro subredes /26 sirve a 4 departamentos en vez de a 1.
- **Reduce el dominio de broadcast:** la "megafonía" de la red ya no llega a todos, solo a la subred. Menos ruido, mejor rendimiento.
- **Segmenta por funciones:** contabilidad, ventas e IT en islas separadas, con filtros y seguridad entre ellas.

> ⚠️ **Trampa favorita de examen:** "Necesito 4 subredes con 50 hosts cada una en 192.168.1.0/24". Meten la pregunta de *subredes iguales* cuando la respuesta correcta exige **VLSM** (el [punto 7](/ApuntesRedes/04-ipv4-subnetting/07-vlsm)). Fíjate bien: con /26 tienes 4 subredes de 62 hosts… y si pidieran tamaños distintos, /26 ya no vale.

---

## 🧠 Mini-chequeo

1. Divide `192.168.1.0/24` en **2 subredes**. ¿Qué máscara usas y cuáles son las dos redes?
2. Con la nueva máscara del ejercicio 1, ¿cuántos hosts útiles tiene cada subred?
3. ¿Por qué se restan 2 en la fórmula de hosts?

<details>
<summary>🔄 Respuestas</summary>

1. Necesitas `2ⁿ ≥ 2` → **n = 1** → máscara /25 (`255.255.255.128`). Redes: **192.168.1.0/25** (hosts .1-.126, broadcast .127) y **192.168.1.128/25** (hosts .129-.254, broadcast .255).
2. h = 32 − 25 = 7 → 2⁷ − 2 = **126 hosts útiles** por subred.
3. La primera dirección de cada subred es la **red** y la última el **broadcast**; ninguna puede asignarse a un dispositivo, así que se descuentan ambas.
</details>

---

## ✅ Resumen en 3 frases

- Subnetear es **prestar bits de host** a la máscara para trocear una red.
- Fórmulas: **2ⁿ** subredes y **2ʰ − 2** hosts, descontando red y broadcast.
- El incremento entre subredes es **2ʰ**, y con él se construyen red, rangos de hosts y broadcast.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| Subnetting | Dividir una red en subredes más pequeñas |
| Bits prestados (n) | Bits de host que pasan a ser bits de red |
| Dominio de broadcast | Conjunto de equipos que reciben el mismo broadcast |
| Incremento | Salto en octeto entre subredes consecutivas (2ʰ) |
| Broadcast de subred | Última IP del rango, no asignable |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/04-ipv4-subnetting) · **Anterior:** [05 · Máscaras y notación CIDR](/ApuntesRedes/04-ipv4-subnetting/05-mascaras-y-cidr) · **Siguiente:** [07 · VLSM](/ApuntesRedes/04-ipv4-subnetting/07-vlsm)