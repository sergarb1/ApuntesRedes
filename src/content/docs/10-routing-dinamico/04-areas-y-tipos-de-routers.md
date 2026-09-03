---
title: 04 — Áreas y tipos de routers
description: El Área 0 como corazón y quién es quién en OSPF 🏙️
---

<p><small>El Área 0 como corazón y quién es quién en OSPF 🏙️</small></p>

> 🗺️ **Estás en:** 🗣️ **U10 · Routing dinámico OSPF** → 04 · Áreas y tipos de routers

---

## 📬 La idea en una frase

> OSPF divide la red en **áreas** para escalar, y todas deben conectarse al **Área 0 (backbone)**: el corazón por el que pasa todo el tráfico inter-área.

Si todos los routers de una red gigante compartieran la misma LSDB, cada cambio dispararía recálculos masivos. Las áreas ponen **fronteras** al ruido: un router de la Área 1 solo conoce los detalles de su área, y las rutas de otras áreas llegan ya "resumidas".

---

## 🏙️ Por qué existen las áreas

- **Escalabilidad:** la LSDB de cada área se mantiene pequeña y estable.
- **Aislamiento de fallos:** un problema en la Área 2 no obliga a recalcular a toda la red.
- **Menos recursos:** menos LSAs, menos SPF, menos memoria.

```
            ┌─────────────────┐
            │     ÁREA 0      │
            │   (backbone)    │
            │ R0a ─────── R0b │
            └───┬─────────┬───┘
                │         │
        ┌───────┴───┐   ┌─┴────────┐
        │ ÁREA 1    │   │ ÁREA 2   │
        │ R1a ─ R1b │   │ R2a      │
        └───────────┘   └──────────┘
        (R0a y R0b son ABR: conectan áreas al backbone)
```

---

## 🧭 El Área 0 (Backbone)

Es el **núcleo** del sistema OSPF. Reglas de oro:

- **Todas las áreas deben conectarse al Área 0** (directa o virtualmente).
- El **routing inter-área siempre pasa por el Área 0**: la Área 1 nunca intercambia rutas "a través" de la Área 2.
- Los **ABR** conectan áreas periféricas al Área 0.
- Si un área no puede conectarse físicamente al Área 0, se necesita un **túnel virtual** (vlink).

> ⚠️ **Por qué esta regla:** OSPF usa el Área 0 como punto de no retorno para evitar **bucles de routing inter-área**. Es la misma lógica de "todas las rutas pasan por el centro": con un único punto de entrada/salida, no hay caminos cruzados que se pisen. El fallo intencionado del [laboratorio de la unidad](/ApuntesRedes/10-routing-dinamico/09-cierre) explota exactamente esto: dos áreas conectadas entre sí sin pasar por el Área 0 **no se comunican**.

---

## 👤 Tipos de routers OSPF

| Tipo | Función |
|---|---|
| **Internal Router** | Todas sus interfaces en la misma área |
| **ABR** (Area Border Router) | Conecta el Área 0 con otras áreas |
| **Backbone Router** | Router en el Área 0 (sea o no ABR) |
| **ASBR** (AS Boundary Router) | Introduce rutas externas a OSPF (redistribución) |

> 💡 **La diferencia que más confunde:** el **ABR** conecta *áreas internas* (Área 0 ↔ Área 1), mientras que el **ASBR** mete *rutas de fuera* del dominio OSPF (una red estática, RIP, BGP...). Un router puede ser ambos a la vez: basta con que esté en el borde del Área 0 y además redistribuya rutas externas.

**Ejemplo de clasificación en una red:**

```
   Área 0              Área 1
  ┌──────┐            ┌──────┐
  │  R1  │───R2───────│  R3  │── LAN3
  └──────┘   (ABR)    └──────┘
      │                  │
    R0 ─── (red estática 172.16.0.0/16)
    (ASBR: redistribuye esa red a OSPF)
```

- R1 y R3 → **internos** (R3 en Área 1, R1 en Área 0).
- R2 → **ABR** (conecta Área 0 y Área 1) y además *backbone router*.
- R0 → **ASBR** (introduce la ruta estática en OSPF) y backbone router.

---

## 🧠 Mini-chequeo

1. ¿Por qué no puedes conectar la Área 1 y la Área 2 directamente y olvidarte del Área 0?
2. Un router tiene interfaces en el Área 0 y en el Área 1. ¿Qué tipo de router es?
3. ¿Qué tipo de router introduce en OSPF una ruta aprendida por un protocolo externo?

<details>
<summary>🔄 Respuestas</summary>

1. Porque **todo el tráfico inter-área debe pasar por el Área 0**: sin conexión al backbone, las áreas 1 y 2 no intercambiarán rutas entre sí (es el fallo del laboratorio de la unidad).
2. **ABR** (Area Border Router).
3. **ASBR** (AS Boundary Router), mediante redistribución.
</details>

---

## ✅ Resumen en 3 frases

- Las áreas hacen que OSPF escale: cada una mantiene su propia LSDB y aísla sus cambios.
- El **Área 0** es obligatoria como corazón, y todo el tráfico inter-área pasa por ella (directa o virtualmente).
- **Internal**, **ABR**, **backbone** y **ASBR** son los cuatro roles, y un router puede ejercer varios a la vez.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| Área OSPF | Subdivisión lógica de la red para escalar |
| Área 0 | El backbone: corazón del routing OSPF |
| Internal Router | Todas sus interfaces en la misma área |
| ABR | Router que conecta el Área 0 con otras áreas |
| Backbone Router | Router dentro del Área 0 |
| ASBR | Router que redistribuye rutas externas a OSPF |
| Túnel virtual | Unión lógica de un área con el Área 0 sin enlace físico |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/10-routing-dinamico) · **Anterior:** [03 · Conceptos OSPF](/ApuntesRedes/10-routing-dinamico/03-conceptos-ospf) · **Siguiente:** [05 · DR y BDR](/ApuntesRedes/10-routing-dinamico/05-dr-y-bdr)