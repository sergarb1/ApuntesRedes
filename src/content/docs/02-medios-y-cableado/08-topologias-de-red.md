---
title: 8 — Topologías de red
description: "Cómo se dibujan los cables antes de tenderlos: punto a punto, bus, anillo, estrella, malla y híbrida 🕸️"
---

<p><small>Cómo se dibujan los cables antes de tenderlos: punto a punto, bus, anillo, estrella, malla y híbrida 🕸️</small></p>

> 🗺️ **Estás en:** 📡 **Medios y cableado** → 8 · Topologías de red

---

## 📬 La idea en una frase

> La **topología de red** es el **plano** de cómo se conectan los dispositivos entre sí: quién va pegado a quién, por dónde pasan los cables y qué pasa si se cae un tramo. No es el cable en sí (eso lo estudiaste en los [puntos anteriores](/ApuntesRedes/02-medios-y-cableado/02-cable-utp)): es el dibujo que decides **antes** de tender un solo cable.

Hasta aquí has visto el material y la instalación; ahora toca el diseño. Y es que la misma longitud de cable, el mismo Cat6 y el mismo switch pueden darte una red que aguante una caída o una red que se caiga entera por un solo cable suelto. La diferencia está en el plano.

---

## 🔗 Punto a punto

La topología más simple que existe: **dos dispositivos y un solo enlace** entre ellos. Nada más.

```
[Dispositivo A] ←————————————————→ [Dispositivo B]
```

- **Ventaja:** máxima simplicidad y privacidad: si el enlace es tuyo, el tráfico solo es tuyo.
- **Desventaja:** si se cae el enlace, no hay alternativa; y conectar un tercer dispositivo obliga a crear otro enlace nuevo.
- **Dónde la ves:** un PC a un switch, un switch a un router, el enlace de fibra entre dos edificios. En realidad, casi todo empieza aquí: cualquier red grande es un montón de enlaces punto a punto unidos.

![Topología punto a punto: dos dispositivos con un único enlace entre ellos](/ApuntesRedes/diagrams/u02-topologia-punto-a-punto.svg)

---

## 🚌 Bus

Todos los dispositivos se enganchan a **un único cable central** (el *bus* o *backbone*): cada mensaje viaja por el cable y lo reciben todos.

```
     |              |              |              |
[PC-A]           [PC-B]           [PC-C]           [PC-D]
     |              |              |              |
=====[==============|==============|==============|====== cable central
 (con extremos/terminadores en los dos extremos)
```

- **Ventaja:** pocos cables y barata; ideal para tender una red pequeña de prisa.
- **Desventaja:** el cable central es **un único punto de fallo** (se parte el bus y se cae toda la red) y todos compiten por el mismo medio (colisiones).
- **Dónde la ves:** redes de los años 80-90 con coaxial y T-peques; hoy solo en museos y en la coche de telecomunicaciones del autobús escolar de la analogía.

![Topología de bus: un cable central al que se enganchan todos los dispositivos](/ApuntesRedes/diagrams/u02-topologia-bus.svg)

---

## 🔄 Anillo

Cada dispositivo se conecta a los dos vecinos y el tramo de cierre forma un **circuito cerrado**: el mensaje da la vuelta por el anillo hasta llegar a su destino.

```
[PC-A] ——— [PC-B]
  |           |
  |           |
[PC-D] ——— [PC-C]
```

- **Ventaja:** camino previsible y ordenado; en anillos gestionados (FDDI, Token Ring) se daba prioridad y no había colisiones.
- **Desventaja:** si el anillo se parte en un tramo, la comunicación se interrumpe… salvo que el anillo tenga **redundancia** (doble anillo), que es exactamente lo que se estudia en la unidad de alta disponibilidad.
- **Dónde la ves:** Token Ring (obsoleto), FDDI, y hoy en el interior de muchas redes de operadores (anillos DWDM) y en los *rings* de los datacenters.

![Topología en anillo: los dispositivos forman un circuito cerrado](/ApuntesRedes/diagrams/u02-topologia-anillo.svg)

---

## ⭐ Estrella

**Cada dispositivo tiene su propio cable hasta un punto central** (hoy: un switch; en su día: un hub).

```
           [PC-A]
             |
[PC-B] —— [Switch] —— [PC-C]
             |
           [PC-D]
```

- **Ventaja:** un cable que se rompe solo deja tirado a **un** dispositivo; el resto sigue. Fácil de diagnosticar (cada puerto es un puesto).
- **Desventaja:** el punto central es un **punto único de fallo**: se cae el switch y se cae la red (por eso luego se duplican).
- **Dónde la ves:** es **la topología de las redes actuales**. De hecho, el cableado estructurado del [punto 7](/ApuntesRedes/02-medios-y-cableado/07-cableado-estructurado) es una estrella en toda regla: cada roseta va a su patch panel y de ahí al switch.

![Topología en estrella: cada dispositivo con su cable al switch central](/ApuntesRedes/diagrams/u02-topologia-estrella.svg)

---

## 🔺 Malla

**Todos (o casi todos) conectados con todos.** En una malla completa, cada par de dispositivos tiene su propio enlace.

- **Ventaja:** es la topología más robusta: si cae un enlace, siempre hay **otro camino**.
- **Desventaja:** el número de enlaces se dispara con la fórmula `n·(n−1)/2`: a 10 dispositivos, 45 enlaces; a 100, 4.950. Nadie monta malla completa en una oficina.
- **Malla parcial:** la versión sensata: no todos con todos, sino los enlaces **justos** para que siempre quede un camino alternativo (así se diseñan las redes de operadores y los datacenters).

![Topología en malla: enlaces directos entre varios dispositivos con caminos alternativos](/ApuntesRedes/diagrams/u02-topologia-malla.svg)

---

## 🌳 Híbrida / árbol

Nadie monta una red real con una sola topología: se **combinan**. La más habitual es el **árbol jerárquico**: una estrella de switches en cada planta (acceso), unida a una estrella superior (distribución) y a otra del todo arriba (core).

```
              [Core]
             /      \
     [Distrib. A]  [Distrib. B]
        /    \        /    \
     [SW]   [SW]   [SW]   [SW]
      |      |      |      |
     PCs    PCs    PCs    PCs
```

- **Ventaja:** escala por capas, se documenta por plantas y se mantiene por niveles (mismas ideas del cableado estructurado, llevadas al diseño).
- **Desventaja:** más planificación y más enlaces redundantes que hay que gestionar bien (aquí es donde entra en juego STP, de la unidad de switching).
- **Dónde la ves:** en casi todas las redes de empresa: estrellas en el acceso, enlaces redundantes en distribución y un core que lo une todo.

![Topología híbrida en árbol: estrellas de acceso agrupadas bajo un core jerárquico](/ApuntesRedes/diagrams/u02-topologia-hibrida.svg)

---

## 🆚 Tabla resumen

| Topología | Ventaja clave | Punto débil | Dónde la ves |
|---|---|---|---|
| **Punto a punto** | Simple y privada | Sin alternativa si se cae | Enlaces de acceso, fibra entre edificios |
| **Bus** | Pocos cables | Cable central = red entera caída | Redes antiguas (coaxial) |
| **Anillo** | Orden y prioridad | Un corte puede parar el anillo | Operadores, datacenters, redes antiguas |
| **Estrella** | Fallo aislado a un puesto | El switch central es punto único | **Cableado actual de oficinas** |
| **Malla** | Caminos alternativos | Coste y cantidad de enlaces | Núcleos de operadores, datacenters |
| **Híbrida / árbol** | Escala por capas | Requiere planificación | Redes de empresa reales |

---

## 🧠 Mini-chequeo

1. Se te cae el cable de un PC en una oficina cableada al estilo de la unidad. ¿Con qué topología estás trabajando y cuántos compañeros de oficina se quedan sin red?
2. ¿Por qué una red en bus delante de la estrella era una apuesta peligrosa?
3. Tienes 6 nodos y quieres que la red aguante dos caídas de enlace. ¿Qué topología eliges y por qué?

<details>
<summary>🔄 Respuestas</summary>

1. **Estrella:** el PC que se quedó sin cable pierde conectividad, pero el resto de la oficina ni se entera. Cada puesto tiene su propio enlace al switch.
2. Porque el cable central de la bus era un **punto único de fallo**: una rotura, un conector mal puesto o un extremo sin terminador y la red entera se paraba. En estrella, el fallo se queda en el puesto.
3. **Malla** (parcial o completa): al haber varios caminos entre nodos, la caída de un enlace se esquiva por otro. Es la razón de ser de la malla y, a menor escala, de la redundancia jerárquica.
</details>

---

## ✅ Resumen en 3 frases

- La topología es el **plano de la red**: punto a punto, bus, anillo, estrella, malla y sus combinaciones (híbrida/árbol).
- Estrella es la referencia de las redes actuales porque **aisla los fallos por puesto**; bus y anillo primitivos mueren por el punto único de fallo.
- Las redes reales son **híbridas en árbol**: estrellas de acceso por planta, capas de distribución y un core, con redundancia donde importa.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| Topología | Plano de cómo se conectan los dispositivos |
| Punto a punto | Un solo enlace entre dos dispositivos |
| Bus | Cable central compartido por todos (obsoleto) |
| Anillo | Circuito cerrado con un vecino a cada lado |
| Estrella | Cada dispositivo con su cable al punto central (switch) |
| Malla | Muchos enlaces directos; completa o parcial |
| Híbrida / árbol | Combinación jerárquica de topologías |
| Punto único de fallo | Componente cuya caída deja sin servicio a muchos |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/02-medios-y-cableado) · **Anterior:** [7 · Cableado estructurado](/ApuntesRedes/02-medios-y-cableado/07-cableado-estructurado) · **Siguiente:** [9 · Cierre: consolida lo aprendido](/ApuntesRedes/02-medios-y-cableado/09-cierre)
