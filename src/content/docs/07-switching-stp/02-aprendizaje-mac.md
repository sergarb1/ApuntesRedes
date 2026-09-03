---
title: 02 — Aprendizaje de MACs
description: La tabla CAM, cómo el switch memoriza quién vive en cada puerto 🧠
---

<p><small>La tabla CAM, cómo el switch memoriza quién vive en cada puerto 🧠</small></p>

> 🗺️ **Estás en:** 🔀 U07 → 02 · Aprendizaje de MACs

---

## 📬 La idea en una frase

> El switch mantiene una **tabla de direcciones MAC** (la tabla CAM) que asocia cada MAC aprendida con el **puerto** por el que se alcanza. Cuando una trama entra por un puerto, el switch **aprende** la MAC origen y la guarda; a partir de ahí reenvía con precisión.

En el punto anterior vimos que el switch inunda lo desconocido. Aquí descubrimos el mecanismo secreto que convierte ese caos inicial en orden: **aprender de cada trama que pasa**.

---

## 📝 El proceso de aprendizaje paso a paso

Cuando una trama entra por un puerto, el switch registra dos cosas:

1. **MAC origen** → la asocia al **puerto de entrada** (si aún no la conoce).
2. Cuando luego llegue una trama dirigida a esa MAC, ya sabrá **por qué puerto reenviarla**.

```
Paso 1: PC-A envía a PC-B (MAC B desconocida)
  PC-A ──trama(SRC=A, DST=B)──▶ [SWITCH]
    → Aprende: A está en Fa0/1
    → DST B desconocida → inunda por todos los puertos

Paso 2: PC-B responde a PC-A (MAC A YA conocida)
  PC-B ──trama(SRC=B, DST=A)──▶ [SWITCH]
    → Aprende: B está en Fa0/2
    → DST A conocida → reenvía SOLO por Fa0/1
```

Resultado: con solo dos tramas, el switch ya sabe **A→Fa0/1** y **B→Fa0/2**. A partir de ahí, la conversación fluye sin inundaciones.

> 💡 **Las entradas no son eternas:** las MACs aprendidas dinámicamente **caducan** (el envejecimiento típico es de 300 segundos). Si un equipo se apaga o cambia de puerto, el switch lo olvida y puede reaprender. Si no caducaran, una MAC que se mudara de puerto dejaría al switch apuntando a un lugar vacío.

---

## 🗄️ La tabla MAC en acción

Para ver qué ha aprendido un switch Cisco usamos `show mac address-table`:

```
Switch# show mac address-table
Vlan    Mac Address       Type        Ports
----    -----------       --------    -----
   1    0050.7966.6800    DYNAMIC     Fa0/1
   1    0050.7966.6801    DYNAMIC     Fa0/2
   1    00D0.BC96.1A01    DYNAMIC     Fa0/3
```

| Columna | Qué significa |
|---|---|
| Vlan | La VLAN en la que se aprendió la MAC (por defecto VLAN 1) |
| Mac Address | La dirección MAC aprendida |
| Type | DYNAMIC (aprendida), STATIC (configurada) o SECURE (port security) |
| Ports | El puerto por el que se alcanza esa MAC |

También existen las MACs **estáticas**: se configuran a mano (por ejemplo, la de un servidor) y no caducan. La entrada `FFFF.FFFF.FFFF` apuntando a la CPU es la del **broadcast**: el switch siempre la procesa internamente además de reenviarla.

---

## ⚡ ¿Por qué "memoria CAM"?

Técnicamente, la tabla MAC se almacena en **memoria CAM** (*Content-Addressable Memory*), un tipo especial de memoria que hace **búsquedas por contenido** en vez de por dirección. En vez de recorrer toda la tabla, la CAM devuelve en un solo ciclo "¿en qué puerto está esta MAC?".

```
Memoria normal:  índice → buscar → comparar (lento)
Memoria CAM:     MAC    → puerto al instante (rápido)
```

| Característica | Valor típico |
|---|---|
| Búsqueda | Una única operación (en hardware) |
| Capacidad | Limitada (ej. 8.000 entradas en switches pequeños) |
| ¿Qué pasa si se llena? | El switch no puede aprender más y **empieza a inundar** |

> ⚠️ **Cuidado con el llenado de la CAM:** si un atacante llena la tabla con MACs falsas (ataque de *CAM flooding*), el switch deja de aprender y reenvía todo por inundación, convirtiéndose en un hub gigante que permite esnifar el tráfico ajeno. La defensa es la **Port Security** del [punto 8](/ApuntesRedes/07-switching-stp/08-port-security).

---

## 🧠 Mini-chequeo

1. ¿Qué aprende el switch cuando una trama entra por un puerto?
2. ¿Qué hace el switch con una trama destinada a una MAC que ya está en su tabla?
3. ¿Por qué caducan las entradas dinámicas de la tabla MAC?

<details>
<summary>🔄 Respuestas</summary>

1. La **MAC origen** y el **puerto** por el que llegó.
2. La reenvía **solo por el puerto correspondiente** a esa MAC.
3. Para que una MAC que se mueve de puerto o se apaga no deje al switch apuntando a un puerto obsoleto. (Eso sí, el envejecimiento no protege del ataque de CAM flooding: la tabla se llena igualmente).
</details>

---

## ✅ Resumen en 3 frases

- El switch aprende asociando MAC origen con puerto de entrada en la tabla CAM.
- `show mac address-table` muestra las MACs dinámicas, su VLAN y su puerto.
- La CAM es una memoria ultrarrápida pero limitada: si se llena, el switch empieza a inundar como un hub.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| Tabla CAM | Memoria donde el switch guarda MAC → puerto |
| MAC dinámica | Aprendida automáticamente, caduca (300 s típico) |
| MAC estática | Configurada a mano, no caduca |
| Aging (envejecimiento) | Tiempo que vive una entrada sin refrescarse |
| CAM flooding | Ataque que llena la tabla para forzar inundaciones |
| Flooding | Reenvío por todos los puertos menos el de origen |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/07-switching-stp) · **Anterior:** [01 · ¿Qué es un switch?](/ApuntesRedes/07-switching-stp/01-que-es-un-switch) · **Siguiente:** [03 · Dominios de colisión y broadcast](/ApuntesRedes/07-switching-stp/03-dominios-colision-broadcast)