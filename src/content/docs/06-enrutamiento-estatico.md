---
title: U06 — Enrutamiento estático
description: El router con su mapa y sus decisiones 🧭
---

<p><small>El router con su mapa y sus decisiones 🧭</small></p>

> 🗺️ **El mapa del curso:** 🌉 Trunking → **🧭 AQUÍ ESTÁS (U06)** → 🗣️ OSPF → 🛡️ ACLs

---

*Un paquete de tu LAN quiere llegar a una sucursal a 800 kilómetros de fibra. Nadie en tu red sabe el camino entero: solo hay que preguntar al router más cercano, que pregunta a su vecino, que pregunta al siguiente. Cada router consulta su mapa, elige la salida y pasa el paquete. Así funciona Internet entera: saltos y mapas.*

Bienvenido a la unidad donde tu red crece más allá de un solo router. En la [UD5](/ApuntesRedes/05-trunking-inter-vlan) hiciste hablar VLANs entre sí; aquí hacemos hablar **redes completas**: las tripas del router, la CLI, las rutas estáticas, la ruta por defecto y las reglas de decisión (longest prefix match, distancia administrativa). Es la base sobre la que se montará OSPF en la [UD7](/ApuntesRedes/07-ospf).

Esta unidad se lee como un **libro de 6 capítulos**: los 5 primeros son teoría en progresión y el 6º es el aterrizaje práctico con laboratorio.

---

## 🎯 Objetivo de la unidad

Al terminar, serás capaz de:

- Identificar los componentes de un router (CPU, RAM, NVRAM, Flash, ROM) y su secuencia de arranque.
- Acceder a la CLI por consola, auxiliar, Telnet y SSH, y aplicar una configuración básica segura.
- Configurar rutas estáticas con next-hop o interfaz de salida y saber cuándo conviene cada una.
- Crear y entender la ruta por defecto (0.0.0.0/0) como último recurso.
- Explicar cómo decide un router: longest prefix match, distancia administrativa y métrica.
- Verificar y depurar el enrutamiento con `show ip route`, `show ip interface brief` y traceroute.

---

## 🗺️ Mapa de la unidad

| Punto | Qué aprenderás | Nivel |
|---|---|---|
| [01 · Componentes del router](/ApuntesRedes/06-enrutamiento-estatico/01-componentes-del-router) | Memorias, registros y secuencia de arranque | Todos |
| [02 · Configuración básica](/ApuntesRedes/06-enrutamiento-estatico/02-configuracion-basica) | Modos CLI, SSH, interfaces y verificación | Todos |
| [03 · Rutas estáticas](/ApuntesRedes/06-enrutamiento-estatico/03-rutas-estaticas) | `ip route`, next-hop vs salida, topología de 3 routers | Todos |
| [04 · Ruta por defecto](/ApuntesRedes/06-enrutamiento-estatico/04-ruta-por-defecto) | 0.0.0.0/0, gateway of last resort y rutas flotantes | Todos |
| [05 · Cómo decide un router](/ApuntesRedes/06-enrutamiento-estatico/05-como-decide-el-router) | Longest prefix match, AD y métrica | Clave |
| [06 · Cierre](/ApuntesRedes/06-enrutamiento-estatico/06-cierre) | Sé el Paquete, Fireside, Laboratorio, Crucigrama… | Todos |

> 📖 **Flujo de lectura:** los 5 primeros puntos son teoría en progresión. El 6º es el aterrizaje práctico: léelo justo después del 5º y antes de abrir los boletines.

---

## 📝 Boletines de la unidad

> Practica con los pares del curso: empezar siempre el resuelto para ver el estilo y luego intentar el por-resolver.

<div class="ejercicio-links">
  <a href="/ApuntesRedes/boletines/boletin-u06-inicial" class="elink">🟢 Inicial por resolver</a>
  <a href="/ApuntesRedes/boletines/boletin-u06-inicial-resuelto" class="elink">✅ Inicial resuelto</a>
  <a href="/ApuntesRedes/boletines/boletin-u06-avanzado" class="elink">⭐ Avanzado por resolver</a>
  <a href="/ApuntesRedes/boletines/boletin-u06-avanzado-resuelto" class="elink">💪 Avanzado resuelto</a>
</div>

---

## ✅ Criterios de evaluación cubiertos (RA4)

**RA4: Administra las funciones básicas de un router estableciendo opciones de configuración.**

| CE | Criterio | Dónde se cubre |
|---|---|---|
| a) | LEDs y componentes del router | ✅ Punto 1 |
| b) | Acceso a la configuración | ✅ Punto 2 |
| c) | Secuencia de arranque | ✅ Punto 1 |
| d) | Comandos de configuración | ✅ Puntos 2-3 + ⚡ Laboratorio (punto 6) |
| f) | Rutas estáticas y por defecto | ✅ Puntos 3-5 + 🧠 Atrévete a pensar (punto 6) |

---

## 🚪 ¿Por dónde empiezo?

- ¿Nunca has tocado la CLI de un router? Empieza por el [punto 1](/ApuntesRedes/06-enrutamiento-estatico/01-componentes-del-router) sin saltarte nada.
- ¿Vienes de la UD5? El enrutamiento inter-VLAN ya te enseñó subinterfaces: aquí le toca el turno a las redes completas.

**📍 Primer punto:** [01 · Componentes del router](/ApuntesRedes/06-enrutamiento-estatico/01-componentes-del-router)  
**⏭️ Al acabar la unidad, continúa en [UD7 · Enrutamiento dinámico con OSPF](/ApuntesRedes/07-ospf).**
