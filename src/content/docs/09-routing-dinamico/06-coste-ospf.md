---
title: 06 — El coste OSPF
description: Cómo OSPF convierte ancho de banda en coste ⚖️
---

<p><small>Cómo OSPF convierte ancho de banda en coste ⚖️</small></p>

> 🗺️ **Estás en:** 🗣️ **U09 · Routing dinámico OSPF** → 06 · El coste OSPF

---

## 📬 La idea en una frase

> OSPF no cuenta saltos: convierte cada enlace en un **coste** con la fórmula `coste = 10^8 / ancho_de_banda`, y la ruta óptima es la que suma **menor coste total**.

RIP decide por "menos routers"; OSPF decide por "menos coste". Un enlace de fibra vale menos que uno de cobre, aunque meta más saltos. De ahí la gracia de Dijkstra (visto en el [punto 3](/ApuntesRedes/09-routing-dinamico/03-conceptos-ospf)): no busca la ruta más corta en routers, sino la de menor coste acumulado.

---

## 🧮 La fórmula

```
coste = 10^8 / ancho_de_banda (en bps)
```

El valor de referencia **10^8 = 100 Mbps** es el "coste 1" por defecto. A partir de ahí:

| Velocidad | Cálculo | Coste por defecto |
|---|---|---|
| 10 Mbps | 10⁸ / 10⁷ | **10** |
| 100 Mbps | 10⁸ / 10⁸ | **1** |
| 1 Gbps | 10⁸ / 10⁹ = 0,1 | **1** (mínimo) |
| 10 Gbps | 10⁸ / 10¹⁰ = 0,01 | **1** (mínimo) |
| 1.544 Mbps (T1) | 10⁸ / 1.544.000 ≈ 64,8 | **64** |

> ⚠️ **Trampa del 1 Gbps:** con la fórmula clásica, **todos los enlaces de 100 Mbps en adelante valen lo mismo: 1**. Un Gigabit no es "mejor" que un FastEthernet para OSPF hasta que no cambias el ancho de banda de referencia (`auto-cost reference-bandwidth`). En redes modernas se suele subir a 1 Gbps o 10 Gbps para que OSPF vuelva a "ver" la diferencia.

**Coste de una ruta completa:** se suman los costes de todos los enlaces del camino. Ejemplo, con el mapa del [punto 3](/ApuntesRedes/09-routing-dinamico/03-conceptos-ospf):

```
        A ───── B
        │ 5     │ 2
        │       │
        C ───── D
           1
```

- A → B → D = 5 + 2 = **7**
- A → C → D = 5 + 1 = **6** ← OSPF elige este camino (menor coste total)

---

## 🔧 Controlar el coste a mano

A veces quieres que OSPF prefiera (o evite) un enlace aunque físicamente sea el mismo. Dos formas:

1. **Forzar el coste de una interfaz:**
   ```bash
   R1(config-if)# ip ospf cost 10
   ```

2. **Cambiar el ancho de banda de referencia** (global):
   ```bash
   R1(config-router)# auto-cost reference-bandwidth 1000   ; 1 Gbps como coste 1
   ```

> 💡 **¿Cómo ver el coste de una ruta?** Con `show ip ospf interface` verás el coste de cada interfaz, y `show ip route` muestra la métrica (coste total) de cada ruta OSPF.

---

## 🧮 Un caso completo, de extremo a extremo

Montemos una mini-red y calculemos qué decide OSPF. R1 quiere llegar a la LAN de R3 y tiene **dos caminos**:

```
                    R2
              ┌──────────┐
   LAN ── R1 ─┤ Gigabit  ├── R3 ── LAN
              │  100Mbps │  100Mbps
              └──────────┘
   R1 ─── R4 ─── R3     (todo el camino por 10 Mbps)
```

**Camino A: R1 → R2 → R3 (FastEthernet 100 Mbps):** coste por enlace = 1 → total = **1 + 1 = 2**.
**Camino B: R1 → R4 → R3 (Serial 10 Mbps):** coste por enlace = 10 → total = **10 + 10 = 20**.

OSPF elige el **Camino A** (coste 2 < 20), aunque los dos caminos tengan el mismo número de saltos. Y ahora el truco del administrador: si la fibra de R2 está saturada y queremos mover tráfico por R4 aunque sea lento, subimos el coste de las interfaces de R2:

```bash
R1(config-if)# interface gigabitethernet 0/0
R1(config-if)# ip ospf cost 50          ; Camino A pasa a coste 50+1 = 51 > 20
```

Con el coste tocado, OSPF recorre su SPF, ve 51 frente a 20 y **redirige el tráfico a R4**. Ese mismo mecanismo es el que usarás en el [Laboratorio de Tortura](/ApuntesRedes/09-routing-dinamico/09-head-first) para "forzar una ruta alternativa".

---

## 🧠 Mini-chequeo

1. Calcula el coste de una interfaz **FastEthernet (100 Mbps)** y de una **Serial (1.544 Mbps)**.
2. Un camino tiene 2 enlaces de 100 Mbps y otro tiene 1 enlace de 100 Mbps + 1 de 10 Mbps. ¿Cuál elige OSPF?
3. ¿Por qué OSPF da el mismo coste a un FastEthernet y a un Gigabit por defecto?

<details>
<summary>🔄 Respuestas</summary>

1. 100 Mbps → **1**; 1.544 Mbps → **64** (10⁸ / 1.544.000 ≈ 64).
2. El **primer camino**: 1 + 1 = **2** frente a 1 + 10 = **11**. Menor coste total.
3. Porque el **coste mínimo es 1**: 10⁸/10⁹ = 0,1 se redondea a 1. Para distinguirlos hay que subir el `auto-cost reference-bandwidth`.
</details>

---

## ✅ Resumen en 3 frases

- OSPF calcula `coste = 10^8 / ancho_de_banda`: enlace lento = coste alto, enlace rápido = coste bajo.
- La ruta elegida es la de **menor coste acumulado** (Dijkstra), no la de menos saltos.
- Se puede forzar a mano con `ip ospf cost` o ajustando el ancho de banda de referencia, y verificarlo con `show ip ospf interface`.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| Coste OSPF | Métrica del enlace (10⁸ / ancho de banda) |
| Coste acumulado | Suma de costes de todos los enlaces del camino |
| ip ospf cost | Comando para fijar el coste de una interfaz |
| auto-cost reference-bandwidth | Ancho de banda de referencia para calcular costes |
| Ancho de banda de referencia | Velocidad a la que OSPF le asigna coste 1 (10⁸ bps) |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/09-routing-dinamico) · **Anterior:** [05 · DR y BDR](/ApuntesRedes/09-routing-dinamico/05-dr-y-bdr) · **Siguiente:** [07 · Configuración OSPF](/ApuntesRedes/09-routing-dinamico/07-configuracion-ospf)