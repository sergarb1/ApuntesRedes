---
title: 03 — Dominios de colisión y broadcast
description: Quién puede hablar a la vez y quién lo oye todo 🌐
---

<p><small>Quién puede hablar a la vez y quién lo oye todo 🌐</small></p>

> 🗺️ **Estás en:** 🔀 U06 → 03 · Dominios de colisión y broadcast

---

## 📬 La idea en una frase

> Un **dominio de colisión** es el conjunto de equipos que compiten por el mismo medio (solo uno puede hablar a la vez); un **dominio de broadcast** es el conjunto de equipos que reciben los mensajes broadcast de los demás. El **hub** no segmenta ninguno, el **switch** segmenta colisiones y el **router** segmenta broadcasts.

---

## 💥 Dominio de colisión

Cuando dos equipos envían a la vez por el mismo medio, sus señales chocan: eso es una **colisión**. Todos los equipos que comparten ese medio forman un **dominio de colisión**.

```
HUB (1 dominio de colisión):
  [PC1]──┐
         ├─[HUB]──[PC2]
  [PC3]──┘
  PC1 y PC2 NO pueden hablar a la vez → colisión

SWITCH (1 dominio por puerto):
  [PC1]──┐
         ├─[SWITCH]──[PC2]
  [PC3]──┘
  PC1 y PC2 SÍ pueden hablar a la vez (sin colisión)
```

Cada puerto de un switch es un dominio de colisión independiente: dos PCs conectados a puertos distintos pueden transmitir **simultáneamente** sin pisarse. Esto multiplica la capacidad efectiva de la red: es una de las grandes ventajas del switch frente al hub.

> 💡 **Ethernet conmutada:** hoy en día la mayoría de conexiones a switch son **full-duplex**, donde se puede transmitir y recibir a la vez (dos canales por par). En esas condiciones las colisiones ni siquiera existen. Solo aparecen en enlaces **half-duplex** o compartidos.

---

## 📢 Dominio de broadcast

Un **broadcast** es una trama dirigida a `FFFF.FFFF.FFFF` que TODOS los equipos de la LAN deben recibir y procesar (aunque luego la descarten). El conjunto de equipos que recibe esos broadcasts es el **dominio de broadcast**.

| Dispositivo | ¿Segmenta colisiones? | ¿Segmenta broadcasts? |
|---|---|---|
| Hub | No | No |
| Switch | Sí (1 por puerto) | **No** (reenvía los broadcasts a todos sus puertos) |
| Router | Sí | **Sí** (detiene el broadcast en cada interfaz) |

El switch, aunque separe colisiones, **propaga los broadcasts** por todos sus puertos: una trama de broadcast que entra por Fa0/1 sale por todos los demás. Por eso todos los switches interconectados forman **un solo dominio de broadcast**... y eso tiene consecuencias, como verás en el [punto 4](/ApuntesRedes/06-switching-stp/04-tormenta-de-broadcast).

```
Router: corta el broadcast
  [VLAN A]──[Router]──[VLAN B]
  Broadcast de VLAN A  → NO llega a VLAN B (lo para el router)
```

---

## 🧮 Contar dominios: el examen clásico

En los exámenes de redes (y en las entrevistas) hay una pregunta recurrente: **¿cuántos dominios de colisión y de broadcast hay?**

Reglas de oro para contarlos:

- **Colisión:** hub = 1 (compartido); switch = 1 por puerto activo.
- **Broadcast:** hub o switch = 1 por cada "trozo" de LAN separado por routers.

```
1 switch 24 puertos (sin router):
  → 24 dominios de colisión, 1 dominio de broadcast

1 hub 4 puertos + 1 router con 2 redes:
  → 1 dominio de colisión, 2 dominios de broadcast
```

> ⚠️ **Trampa clásica:** un switch conectado a otro switch NO crea un dominio de broadcast nuevo: siguen siendo uno solo. Solo el router (o un switch de capa 3 con SVIs, como verás en la [U07](/ApuntesRedes/07-vlans)) divide dominios de broadcast.

---

## 🧠 Mini-chequeo

1. ¿Cuántos dominios de colisión tiene un hub de 8 puertos? ¿Y un switch de 8 puertos?
2. ¿Quién divide los dominios de broadcast?
3. Un switch reenvía un broadcast a todos sus puertos: ¿qué consecuencias tiene si hay muchos equipos?

<details>
<summary>🔄 Respuestas</summary>

1. El hub: **1** (todos comparten el medio). El switch: **8** (uno por puerto).
2. El **router** (o un switch de capa 3).
3. Que todos los equipos procesan cada broadcast (gasto de CPU) y el tráfico broadcast satura el medio. Si hay demasiados, la red se degrada... y si además hay un bucle, se produce una tormenta (punto 4).
</details>

---

## ✅ Resumen en 3 frases

- Los **dominios de colisión** los divide el switch (1 por puerto); el hub no divide ninguno.
- Los **dominios de broadcast** solo los divide el router; el switch los propaga por toda la LAN.
- Contar dominios es la pregunta estrella de exámenes: hub = colisión global, switch = por puerto, router = parte el broadcast.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| Colisión | Choque de dos señales en el mismo medio |
| Dominio de colisión | Equipos que compiten por el medio (1 solo habla a la vez) |
| Dominio de broadcast | Equipos que reciben los broadcasts de los demás |
| Full-duplex | Transmitir y recibir a la vez (sin colisiones) |
| Half-duplex | Alternar transmisión/recepción (con colisiones) |
| Broadcast | Trama para `FFFF.FFFF.FFFF`, todos la reciben |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/06-switching-stp) · **Anterior:** [02 · Aprendizaje de MACs](/ApuntesRedes/06-switching-stp/02-aprendizaje-mac) · **Siguiente:** [04 · La tormenta de broadcast](/ApuntesRedes/06-switching-stp/04-tormenta-de-broadcast)