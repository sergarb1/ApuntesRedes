---
title: 04 — La tormenta de broadcast
description: Cuando los broadcasts rebotan sin fin y la red se ahoga 🌪️
---

<p><small>Cuando los broadcasts rebotan sin fin y la red se ahoga 🌪️</small></p>

> 🗺️ **Estás en:** 🔀 U06 → 04 · La tormenta de broadcast

---

## 📬 La idea en una frase

> Si en una red conmutada hay un **bucle** (por ejemplo, dos switches conectados por dos cables) y no existe protección, las tramas broadcast **rebotan de switch en switch para siempre**: cada copia se multiplica, el tráfico se dispara y la red colapsa en segundos. A ese fenómeno se le llama **tormenta de broadcast**.

---

## 🔁 ¿Cómo se forma un bucle?

Los bucles nacen de la **redundancia bienintencionada**: para que la red no se caiga si un cable falla, conectamos los switches por dos caminos. El problema es que, sin un mecanismo que lo gestione, dos caminos entre los mismos switches forman un **circuito cerrado**.

```
Switch A ──────── Switch B
    │                │
    └───────────────┘
       (segundo cable)
```

Parece inofensivo, pero es una bomba de relojería. Un único broadcast lo demuestra.

---

## 🌪️ La tormenta, paso a paso

1. **PC1** envía un ARP broadcast ("¿quién tiene esta IP?").
2. **Switch A** lo recibe por el puerto 1 y lo **inunda** por todos los demás, incluyendo el segundo cable hacia Switch B.
3. **Switch B** lo recibe por ese cable y lo inunda por todos sus puertos... **incluyendo el otro cable hacia Switch A**.
4. **Switch A** lo vuelve a recibir por el segundo cable. ¿Qué hace? ¡Inundarlo otra vez! Y así eternamente.

```
PC1 ─▶ [Switch A] ──(1)──▶ [Switch B]
           ▲                    │
           └────(3)─────(2)────┘
   Cada vuelta duplica las copias → la red se satura
```

Cada copia que recibe un switch genera **otras tantas** hacia el resto de puertos. Es una multiplicación exponencial: en pocos segundos los LEDs del switch parpadean como una discoteca y el ancho de banda se agota.

> 💡 **¿Por qué el broadcast es el culpable?** Porque se inunda SIEMPRE, con la MAC destino conocida o no. Las tramas unicast solo rebotarían mientras la MAC sea desconocida. El broadcast es el rey de la inundación... y el bucle lo convierte en el rey del apocalipsis.

---

## 🚨 Síntomas de una tormenta

¿Cómo reconoces que estás sufriendo una tormenta de broadcast?

| Síntoma | Por qué |
|---|---|
| LEDs del switch parpadeando sin parar | Saturación total de los puertos |
| PCs que no responden al ping | La CPU del PC está ocupada procesando millones de broadcasts |
| La red va lentísima o "muerta" | El ancho de banda está consumido por copias duplicadas |
| El ping falla intermitentemente | Colisiones y pérdidas por saturación |

> ⚠️ **Trampa clásica en Packet Tracer:** conectas dos switches con dos cables, todo parece funcionar... hasta que alguien envía un ARP y la red se derrumba. El fallo no está en los cables: está en la **topología con bucle sin protección**.

---

## 🛟 La solución: STP

La respuesta al bucle es el **Spanning Tree Protocol (STP, IEEE 802.1D)**: un protocolo que detecta los caminos redundantes y **bloquea puertos** para que solo exista un camino activo entre cualquier par de switches.

```
Sin STP:                    Con STP (802.1D):
┌────┐      ┌────┐          ┌────┐      ┌────┐
│ A  │──┬───│ B  │          │ A  │──┬───│ B  │
└────┘  │   └────┘          └────┘  ╳   └────┘
        │                            ╳ = puerto BLOQUEADO
        └──────────┘                  (rompe el bucle)
```

Si un cable activo falla, STP **desbloquea** el de respaldo automáticamente y la red sigue viva. Esa es la redundancia bien hecha: dos caminos físicos, uno solo activo a la vez. Lo estudiamos al detalle en el [punto 5](/ApuntesRedes/06-switching-stp/05-stp-fundamentos).

---

## 🧠 Mini-chequeo

1. ¿Qué condición es imprescindible para que haya una tormenta de broadcast?
2. ¿Por qué un broadcast empeora el bucle más que un unicast?
3. ¿Qué hace STP para evitar la tormenta?

<details>
<summary>🔄 Respuestas</summary>

1. Un **bucle** en la red (caminos redundantes sin control) más tráfico broadcast que se pueda reenviar.
2. Porque el broadcast **siempre** se inunda por todos los puertos: cada vuelta por el bucle lo multiplica. El unicast solo rebota si la MAC destino es desconocida.
3. **Bloquea puertos** redundantes para dejar un único camino activo y, si un enlace cae, desbloquea el de respaldo.
</details>

---

## ✅ Resumen en 3 frases

- Un bucle en la red conmutada convierte los broadcasts en una multiplicación infinita: la **tormenta de broadcast**.
- Los síntomas son LEDs a tope, pings que fallan y una red que se muere en segundos.
- La solución es **STP**: bloquear los caminos redundantes y solo activarlos si el principal falla.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| Bucle | Circuito cerrado de switches con 2+ caminos |
| Tormenta de broadcast | Multiplicación infinita de broadcasts por un bucle |
| Flooding | Inundar tramas por todos los puertos menos el origen |
| Redundancia | Caminos de respaldo para que la red no se caiga |
| STP | Protocolo que rompe bucles bloqueando puertos |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/06-switching-stp) · **Anterior:** [03 · Dominios de colisión y broadcast](/ApuntesRedes/06-switching-stp/03-dominios-colision-broadcast) · **Siguiente:** [05 · STP: fundamentos](/ApuntesRedes/06-switching-stp/05-stp-fundamentos)