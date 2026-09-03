---
title: 05 — Cómo decide un router
description: "El cerebro detrás de cada reenvío: tabla, AD y longest prefix match 🧠"
---

<p><small>El cerebro detrás de cada reenvío: tabla, AD y longest prefix match 🧠</small></p>

> 🗺️ **Estás en:** 🧭 **U09 · Routing y ACLs** → 05 · Cómo decide un router

---

## 📬 La idea en una frase

> Cuando llega un paquete, el router **consulta su tabla de rutas, elige la coincidencia más específica (longest prefix match) y reenvía**; si no hay ninguna coincidencia, devuelve al origen un **ICMP Destination Net Unreachable**.

Ya configuraste rutas. Ahora vamos a meter la cabeza dentro del cerebro del router: ¿qué pasa *exactamente* en los microsegundos en que un paquete entra y decide su destino? Esto es la pregunta estrella de entrevista y de examen.

---

## ➡️ El viaje de un paquete, paso a paso

Imagina que eres el router. Te llega un paquete cuyo destino es `8.8.8.8`. Tu proceso interno es una escalerita de decisiones:

1. **¿El destino es una de mis redes conectadas?** Sí → entrégalo directamente por la interfaz correspondiente.
2. **¿Tengo una ruta que coincida en la tabla?** Sí → reenvía por el next-hop de esa ruta.
3. **¿Tengo la ruta por defecto (0.0.0.0/0)?** Sí → es tu último recurso, sal por ahí.
4. **Nada coincide** → descarta el paquete y envía al origen un **ICMP Destination Net Unreachable**.

```
Paquete llega → ¿destino local? ──sí──▶ entrégalo a la interfaz
     │
     └no── ¿ruta en la tabla? ──sí──▶ reenvía por el next-hop
                 │
                 └no── ¿ruta por defecto? ──sí──▶ sale por la default
                             │
                             └no── ▶ descarta + ICMP "Destination Net Unreachable"
```

> 💡 **La lección del laboratorio:** sin rutas, un router no es más que un switch caro. La frase del ⭐ Sé el Router del primer borrador de esta unidad sigue siendo cierta: *"Sin rutas, un router no es más que un switch caro."*

---

## 🗂️ Los tipos de rutas: quién las descubre

Las rutas de la tabla se clasifican por su origen. Esa clasificación va ligada a la **distancia administrativa (AD)**, la nota de confianza que vimos en el punto 4 y que el router usa para elegir entre dos rutas hacia el mismo destino:

| Tipo de ruta | Quién la crea | AD por defecto |
|---|---|---|
| **Conectada** | Las interfaces del propio router | 0 |
| **Estática** | El administrador con `ip route` | 1 |
| **Dinámica (OSPF)** | Protocolo de routing, aprende con vecinos | 110 |
| **Dinámica (RIP)** | Protocolo de routing, salto a salto | 120 |

A menor AD, más preferida. Dos rutas distintas que apuntan al mismo destino: **se queda la de AD menor** (la estática gana a la de OSPF, y la conectada a la estática).

---

## 🎯 Longest prefix match: la más específica gana

Aquí está el corazón del asunto. Una tabla de rutas puede tener varias rutas que coinciden con el mismo paquete. ¿Cuál usa?

> **Regla del longest prefix match:** el router elige la ruta cuya máscara tenga **más bits a 1** (la coincidencia más larga y específica). No es "la que se configuró primero": es la matemáticamente más precisa.

Ejemplo con dos rutas que coinciden sobre el mismo destino:

```bash
R1# show ip route 192.168.1.66
     192.168.1.0/24 is directly connected, GigabitEthernet0/0
     192.168.1.64/26 is directly connected, GigabitEthernet0/1
```

Un paquete hacia `192.168.1.66` coincide con **ambas**: la /24 y la /26. Como /26 => 26 bits, coincidencia más larga, **sale por G0/1**. La /24 solo le gana a destinos que estén fuera de las subredes más específicas.

Tabla resumida de la jerarquía:

| Red | Máscara | Bits específicos | Gana cuando el destino... |
|---|---|---|---|
| 192.168.0.0/16 | /16 | 16 | ...no coincide con ninguna más específica |
| 192.168.1.0/24 | /24 | 24 | ...está en 192.168.1.x pero fuera de /28 |
| 192.168.1.16/28 | /28 | 28 | ...está entre .16 y .31 (¡hemos entrado en la subred!) |

Y entre **dos rutas de la misma máscara** hacia el mismo destino, ya no decide el prefix: decide la **AD** (y si empatan, la métrica). El router jamás reparte: elige una y la usa.

---

## 🧠 Mini-chequeo

1. Un paquete llega a un router sin ruta que coincida. ¿Qué hace con el paquete?
2. ¿Qué ruta gana para un destino 192.168.1.5: una 192.168.1.0/24 o una 192.168.0.0/16?
3. Entre una ruta estática y una ruta OSPF hacia el mismo destino, ¿cuál se instala? ¿Por qué?

<details>
<summary>🔄 Respuestas</summary>

1. Lo **descarta** y envía al origen un **ICMP Destination Net Unreachable** (si no hay ruta por defecto que lo atrape).
2. La **192.168.1.0/24** (máscara más larga = coincidencia más específica). El longest prefix match gana a la ruta más amplia aunque ambas coincidan.
3. La **estática** (AD=1) frente a la OSPF (AD=110): a menor distancia administrativa, más confianza, y se instala la de AD menor.
</details>

---

## ✅ Resumen en 3 frases

- El router decide en cascada: **¿destino local? → ¿ruta? → ¿default? → descarta con ICMP**.
- Las rutas se nombran por origen (conectada, estática, dinámica) y cada una trae su **AD** para desempatar.
- Entre varias rutas que coinciden, manda la **coincidencia más larga** (longest prefix match); solo proceden la AD y la métrica si hay empate.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| Longest prefix match | Elegir la ruta con la máscara más larga que coincide |
| Distancia administrativa | Nota de fiabilidad (0 conectada, 1 estática, 110 OSPF) |
| Destination Net Unreachable | ICMP que el router manda cuando no hay ruta |
| Ruta conectada | La red de una interfaz del propio router |
| Métrica | Valor de coste dentro de una misma fuente de rutas |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/09-routing-acls) · **Anterior:** [04 · Ruta por defecto](/ApuntesRedes/09-routing-acls/04-ruta-por-defecto) · **Siguiente:** [06 · ACLs: concepto y tipos](/ApuntesRedes/09-routing-acls/06-acls-conceptos)