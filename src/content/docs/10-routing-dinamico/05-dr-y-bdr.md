---
title: 05 — DR y BDR
description: El portavoz que evita el caos en redes multiacceso 🗣️
---

<p><small>El portavoz que evita el caos en redes multiacceso 🗣️</small></p>

> 🗺️ **Estás en:** 🗣️ **U10 · Routing dinámico OSPF** → 05 · DR y BDR

---

## 📬 La idea en una frase

> En una red Ethernet con varios routers, OSPF elige un **DR** (Designated Router) y un **BDR** (Backup DR) para que todos se adyacenten solo con ellos y no entre sí: menos vecindades, menos LSAs, menos ruido.

Imagina 5 routers colgados del mismo switch. Si todos hablaran con todos, cada uno tendría que mantener 4 adyacencias e intercambiar su LSDB con cada uno. El DR actúa como **portavoz**: todos se sincronizan con él y, en la práctica, con el BDR de respaldo.

---

## 📊 El problema de las redes multiacceso

En un enlace **punto a punto** (dos routers cara a cara) solo hay una adyacencia y no pasa nada. El problema aparece en **redes multiacceso** (Ethernet con varios routers en el mismo segmento), donde el número de adyacencias crece de golpe:

```
Sin DR: N*(N-1)/2 adyacencias (cada router con cada uno)
Con DR: N-1 adyacencias (todos con el DR)
```

Con 5 routers:

```
Sin DR → 5*4/2 = 10 adyacencias       Con DR → 5-1 = 4 adyacencias
   R1─R2                                 R1   R2   R3   R4
   R1─R3                                 │    │    │    │
   R1─R4                                 └────┴─┐──┴────┘
   R1─R5                                        │
   R2─R3 ...                                ┌───┴───┐
                                            │  DR   │
                                            │  BDR  │
                                            └───────┘
```

Cada router forma adyacencia **FULL** solo con el DR y el BDR. Los routers "de a pie" (DROTHER) se quedan en estado **2WAY** entre sí: se ven, se saludan, pero no intercambian LSDB directamente.

> 💡 **Analogía de la redacción:** en una redacción de periódico nadie publica avisos personales entre compañeros. Todo se publica en el **tablón de anuncios (DR)**: cada uno lee el tablón y se entera de todo, y el tablón tiene un **redactor suplente (BDR)** por si el titular se pone malo.

---

## 🏆 La elección del DR y el BDR

Cuando un segmento arranca, OSPF elige DR y BDR con estas reglas, en orden:

1. **Prioridad más alta** (`ip ospf priority`, por defecto **1**).
2. Si empatan, **Router ID más alto**.

```
| Router | Prioridad | Router ID | ¿Resultado?          |
|--------|-----------|-----------|----------------------|
| R1     | 1         | 1.1.1.1   |                      |
| R2     | 0         | 2.2.2.2   | No participa         |
| R3     | 10        | 3.3.3.3   | ✔ DR                 |
| R4     | 5         | 4.4.4.4   | ✔ BDR                |
```

**Detalles que salen en el examen:**

- Prioridad **0** = el router **no participa** en la elección: nunca será DR ni BDR.
- **La elección solo ocurre al arrancar** OSPF (o al reiniciar el proceso). Cambiar prioridades a mitad de partida no destrona al DR existente: hay que reiniciar.
- El DR/BDR se eligen **por segmento**, no por router: un router puede ser DR en un enlace y DROTHER en otro.

> ⚠️ **Trampa típica:** el DR y el BDR son roles **en ese segmento**. En un router con varias interfaces Ethernet, cada red multiacceso tiene su propia elección independiente.

---

## 🔁 Estados de vecindad: FULL vs 2WAY

En `show ip ospf neighbor` (lo usarás en el [punto 7](/ApuntesRedes/10-routing-dinamico/07-configuracion-ospf) y en los boletines) verás dos estados que hay que saber leer:

| Estado | Significado | Con quién ocurre |
|---|---|---|
| **FULL** | Adyacencia completa: intercambio de LSAs y LSDB sincronizada | Con el DR y el BDR |
| **2WAY** | Se ven y se saludan, pero no intercambian LSDB | Entre DROTHERs |
| **DROTHER** | Rol de "router de a pie" (ni DR ni BDR) | Todos los no elegidos |

> 💡 **Pregunta de examen clásica:** *"Veo vecinos en 2WAY/DROTHER, ¿hay un fallo?"* → **No.** Es el comportamiento normal entre routers que no son DR ni BDR: solo sincronizan con el portavoz. El fallo sería ver al DR en otro estado distinto de FULL.

**Y una pieza de control útil:** si quieres **forzar una nueva elección** (por ejemplo tras subir prioridades), reinicia el proceso OSPF en el router y los vecinos del segmento:

```bash
R3# clear ip ospf process
Reset ALL OSPF processes? [no]: yes
```

> ⚠️ **Aviso:** `clear ip ospf process` tira las adyacencias y las vuelve a levantar: es un reset breve pero visible. En producción se programa con cuidado, no a media mañana sin avisar.

---

## 🧠 Mini-chequeo

1. ¿Cuántas adyacencias hay en un segmento con 6 routers OSPF y DR?
2. Prioridad 0, ¿qué significa para la elección?
3. R3 tiene prioridad 10 y R4 prioridad 5 en el mismo segmento. ¿Quién es el DR?

<details>
<summary>🔄 Respuestas</summary>

1. **5 adyacencias** (N-1): cada uno con el DR (y de paso con el BDR; la cuenta clásica es 5 con el DR, aunque en la práctica son con DR y BDR).
2. Que **no participa**: prioridad 0 impide ser DR o BDR (solo actúa como DROTHER).
3. **R3** — mayor prioridad (10 > 5).
</details>

---

## ✅ Resumen en 3 frases

- El **DR** (con su respaldo **BDR**) reduce las adyacencias de N(N-1)/2 a N-1 en cada segmento multiacceso.
- La elección la decide la **prioridad** y, en empate, el **Router ID** más alto; prioridad 0 queda fuera.
- La elección se hace **por segmento** y solo al inicio o reinicio: cambiar prioridades no derriba al DR ya elegido.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| Red multiacceso | Segmento con varios routers (Ethernet, por ejemplo) |
| DR | Designated Router: portavoz del segmento |
| BDR | Backup DR: asume si el DR falla |
| DROTHER | Router que no es ni DR ni BDR |
| 2WAY | Estado entre DROTHERs: se ven pero no sincronizan LSDB |
| Prioridad OSPF | Valor (0-255) que decide la elección; 0 = no participa |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/10-routing-dinamico) · **Anterior:** [04 · Áreas y tipos de routers](/ApuntesRedes/10-routing-dinamico/04-areas-y-tipos-de-routers) · **Siguiente:** [06 · El coste OSPF](/ApuntesRedes/10-routing-dinamico/06-coste-ospf)