---
title: 04 — Stacking y chassis virtuales
description: Varios switches, un solo equipo 🧱
---

<p><small>Varios switches, un solo equipo 🧱</small></p>

> 🗺️ **Estás en:** 🔁 **Alta disponibilidad y redundancia** → 04 · Stacking y chassis virtuales

---

## 📬 La idea en una frase

> El **stacking** une varios switches físicos en un único equipo lógico —una IP de gestión, una configuración, un plano de control compartido— para que añadir redundancia no signifique duplicar el trabajo de gestión ni crear cerebros divididos.

---

## 🤹 El problema de los "dos switches paralelos" tontos

Con dos switches independientes en paralelo (doble uplink desde cada acceso, uno a cada uno), resuelves el SPOF… y creas tres problemas:

1. **Dos configuraciones que mantener** (y que desincronizar).
2. **Dos gateways** o un router con dos enlaces: más diseño.
3. **STP entre ambos**: bucles potenciales que gestionar.

El stacking elimina esos tres: los miembros actúan como **un solo switch** con más puertos. Si un miembro muere, el stack sigue siendo "un switch" que perdió puertos, no una topología que reconverge.

```
        STACK (un solo switch lógico)
   ┌──────────────────────────────────┐
   │  [SW-1] ⇄ [SW-2] ⇄ [SW-3]        │  ← enlaces de stack (anillo)
   │  master ─ member ─ member        │
   └──────────────────────────────────┘
      │           │          │
    acceso      acceso     acceso        ← cada puerto es "del stack"
```

---

## 🧩 Conceptos del stack

| Concepto | Qué es |
|---|---|
| **Master** | El cerebro: ejecuta el plano de control y la gestión (elección por prioridad + antigüedad) |
| **Member** | Miembro controlado por el master (con sus propios puertos) |
| **Standby** | En algunos modelos, respaldo caliente del master |
| **Enlaces de stack** | Los cables/buses dedicados que unen los miembros; en serio, forman un **anillo** |
| **Anillo (ring)** | Si un enlace de stack muere, el anillo cierra por el otro lado y el stack no se rompe |
| **StackWise / VSS / MLag** | Implementaciones de la misma idea según fabricante |

Puntos de diseño que importan:

- **Anillo, no cadena:** el cable de stack en cadena deja el stack partido si el enlace del medio muere. En anillo, sobrevive.
- **Prioridad de master:** fija la del que quieres master (`stack-mac persistent` y prioridad alta), y no dejes que gane "el que arrancó antes".
- **Una única IP de gestión** para todo el stack: configuración y monitorización centralizadas.
- Los enlaces hacia otros equipos se hacen como **EtherChannel con un miembro en cada switch del stack**: cable muerto y switch muerto se toleran a la vez.

> 💡 **La pareja perfecta:** stack (capa de equipo) + EtherChannel (capa de enlace) + HSRP (capa de gateway) = la receta clásica de un núcleo de campus que no se cae.

---

## 🏗️ VSS, MLAG y demás sabores de la misma idea

La idea "varias cajas, un cerebro" tiene nombre distinto por fabricante:

| Implementación | Fabricante | Qué une |
|---|---|---|
| **StackWise** (y 480/1T) | Cisco (Catalyst acceso) | Switches apilables con cables/buses de stack |
| **VSS / StackWise Virtual** | Cisco (núcleo) | Dos chasis grandes como uno lógico |
| **MLAG / vPC** | Arista/Nexus, otros | Dos switches que parecen uno para los equipos conectados |
| **IRF** | HPE/H3C | Sabor propio de stacking |

El matiz entre stacking "real" y MLAG: en el stack comparten **plano de control** (una caja lógica); en MLAG el plano de control queda doble pero se coordinan para presentarse como un solo switch hacia los vecinos (STP, EtherChannel). Para el nivel de este curso, la idea operativa es la misma: **redundancia sin doblar la gestión**.

---

## 🛠️ Configuración y verificación (sabor StackWise)

```
SW-1(config)# switch 1 priority 15        ← quiero este como master
SW-1(config)# stack-mac persistent timer  ← la MAC del stack no baila al cambiar master
```

| Comando | Qué te cuenta |
|---|---|
| `show switch` | Miembros, roles (Master/Member/Standby), prioridades, estado |
| `show switch stack-ports` | Estado de los enlaces de stack |
| `show switch stack-ring activity` | Tráfico por el anillo |
| `show version` | Modelo de cada miembro y versión del stack |

Un stack sano: `show switch` muestra todos los miembros Ready, master estable y enlaces de stack en anillo OK. Al añadir un miembro nuevo, se provisiona con `switch <n> provision <modelo>` para que herede config y no revuelva el stack.

---

## 🤬 CONRAD VS EL MUNDO: "Tenemos dos switches en paralelo, somos redundantes"

**Administrador:** — Compré dos switches de acceso y puse uno arriba y otro abajo. Redundancia: conseguida.

**CONRAD:** — ¿Y cómo los gestionas? ¿Dos IPs, dos configuraciones, dos veces el mismo error de VLAN? ¿Y qué pasa cuando STP decide bloquear el uplink del de abajo por el camino que tu neither-probaste? ¿Y el gateway: quién lo sirve, el router con dos cables?

**CONRAD:** — Dos equipos sin plano común no son un sistema tolerante a fallos: son dos puntos de fallo que además se complican entre ellos. O los unes (stack, VSS, MLAG) y los gestionas como uno, o diseñas bien los dos con HSRP y STP explícitos. Pero "compré dos y los apilé en el rack" no es un diseño, es un decorado.

**La lección:** la redundancia sin unificación de control crea trabajo y sorpresas. Stacking (o su equivalente) convierte la duplicidad física en **un solo equipo que sobrevive a la muerte de partes de sí mismo**.

---

## 🧠 Mini-chequeo

1. ¿Qué tres problemas resuelve el stacking frente a dos switches independientes en paralelo?
2. ¿Por qué el cableado de stack debe ser anillo y no cadena?
3. ¿Qué diferencia conceptual hay entre stacking real y MLAG?
4. ¿Cómo construyes el uplink de un stack hacia otro equipo para que sea tolerante a fallo de cable Y de switch?

<details>
<summary>🔄 Respuestas</summary>

1. Doble gestión (dos configs), doble decisión de gateway/rutas y bucles STP entre ambos: el stack presenta **un switch lógico** con gestión única y sin bucles internos.
2. En cadena, la muerte del enlace central **parte el stack** en dos. En anillo, cualquier enlace de stack muerto deja el anillo cerrado por el otro lado: el stack sigue unificado.
3. En el stack los miembros comparten **plano de control** (una caja lógica real); en MLAG cada equipo conserva su plano pero se coordinan para parecer un único switch ante los vecinos (EtherChannel/STP).
4. Un **EtherChannel** cuyos miembros están repartidos en **switches distintos del stack**: si muere un cable, sigue el canal; si muere un miembro del stack, siguen los cables de los demás.
</details>

---

## ✅ Resumen en 3 frases

- El stacking convierte varios switches en **un equipo lógico**: una gestión, sin bucles internos y tolerante a fallo de miembro.
- El stack se cablea en **anillo** y su master se elige con prioridad, no por suerte.
- Stack + EtherChannel repartido + HSRP es la receta clásica del núcleo tolerante a fallos.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| Master / Member | Cerebro del stack / miembros controlados |
| Enlace de stack | Cable/bús dedicado entre miembros |
| Anillo | Cableado de stack que sobrevive a un enlace roto |
| VSS / MLAG | Sabores de "varias cajas, un switch lógico" |
| Provisioning | Dar de alta un miembro con config anticipada |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/12-alta-disponibilidad) · **Anterior:** [03 · EtherChannel](/ApuntesRedes/12-alta-disponibilidad/03-etherchannel) · **Siguiente:** [05 · FHRP: el gateway redundante](/ApuntesRedes/12-alta-disponibilidad/05-fhrp)
