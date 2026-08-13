---
title: U09 — Routing dinámico OSPF
description: El router que habla solo 🗣️
---

<p><small>El router que habla solo 🗣️</small></p>

> 🗺️ **Ruta del paquete:** 🏠 Origen → 📦 Encapsulado → 🔌 Cable → 🏷️ IP → 🌍 IPv6 → 🔀 Switch → 🏢 VLAN → 🧭 Router → 🗣️ **OSPF** → 🌐 NAT → 🩺 Diagnóstico → ☁️ Cloud

---

*Configurar rutas estáticas manualmente en 50 routers es inviable. Con routing dinámico, los routers intercambian información de forma autónoma y construyen tablas de rutas sin intervención humana. Bienvenido al routing dinámico.*

En la U08 configuraste rutas estáticas a mano: perfectas para 2-3 routers, una pesadilla para una red de oficina con decenas de equipos. Aquí llega OSPF, el protocolo que permite a los routers compartir conocimiento de red y reaccionar solos ante caídas, cambios de enlace y nuevas redes. Entenderás por qué los routers "se hablan", cómo eligen la mejor ruta y cómo configurarlo en tu propia red.

Esta unidad se lee como un **libro de 9 capítulos**: los 8 primeros son teoría en progresión y el 9º aterriza todo en la práctica.

---

## 🎯 Objetivo de la unidad

Al terminar, serás capaz de:

- Explicar por qué el routing dinámico supera al estático cuando la red crece.
- Distinguir IGP de EGP y comparar RIP, OSPF y EIGRP con criterio.
- Describir cómo funciona OSPF: LSA, LSDB, SPF (Dijkstra), Router ID y Hello.
- Explicar para qué sirven las áreas OSPF y quién es quién (interno, ABR, ASBR, backbone).
- Calcular la elección de DR/BDR en redes multiacceso.
- Calcular el coste OSPF de una ruta a partir del ancho de banda.
- Configurar OSPF básico y multiárea en routers Cisco (Packet Tracer).
- Propagar una ruta por defecto con `default-information originate`.
- Diagnosticar adyacencias, LSDB y tabla de rutas con los comandos de verificación.

---

## 🗺️ Mapa de la unidad

| Punto | Qué aprenderás | Nivel |
|---|---|---|
| [01 · De estático a dinámico](/ApuntesRedes/09-routing-dinamico/01-de-estatico-a-dinamico) | Por qué el routing estático no escala y qué ganas con lo dinámico | Todos |
| [02 · IGP vs EGP y RIP vs OSPF](/ApuntesRedes/09-routing-dinamico/02-igp-vs-egp) | Protocolos interiores vs exteriores y la comparativa RIP/OSPF/EIGRP | Todos |
| [03 · Conceptos OSPF](/ApuntesRedes/09-routing-dinamico/03-conceptos-ospf) | LSA, LSDB, SPF (Dijkstra), Router ID y Hello | Todos |
| [04 · Áreas y tipos de routers](/ApuntesRedes/09-routing-dinamico/04-areas-y-tipos-de-routers) | Área 0, por qué todo pasa por el backbone, ABR, ASBR… | Todos |
| [05 · DR y BDR](/ApuntesRedes/09-routing-dinamico/05-dr-y-bdr) | La elección de router designado en redes multiacceso | Todos |
| [06 · El coste OSPF](/ApuntesRedes/09-routing-dinamico/06-coste-ospf) | Cómo OSPF convierte ancho de banda en coste | Todos |
| [07 · Configuración OSPF](/ApuntesRedes/09-routing-dinamico/07-configuracion-ospf) | Configuración básica, multiárea y verificación inicial | Todos |
| [08 · Ruta por defecto y diagnóstico](/ApuntesRedes/09-routing-dinamico/08-ruta-por-defecto-y-diagnostico) | `default-information originate` y comandos de diagnóstico | Todos |
| [09 · Head First (cierre)](/ApuntesRedes/09-routing-dinamico/09-head-first) | Be the Router, Fireside, Laboratorio, Crucigrama… | Todos |

> 📖 **Flujo de lectura:** los 8 primeros puntos son teoría en progresión. El 9º es el aterrizaje práctico: léelo justo después del 8º y antes de abrir los boletines.

---

## 📝 Boletines de la unidad

> Practica con los pares del curso: empezar siempre el resuelto para ver el estilo y luego intentar el por-resolver.

<div class="ejercicio-links">
  <a href="/ApuntesRedes/boletines/boletin-u09-inicial-resuelto" class="elink">✅ Inicial resuelto</a>
  <a href="/ApuntesRedes/boletines/boletin-u09-inicial" class="elink">🟢 Inicial por resolver</a>
  <a href="/ApuntesRedes/boletines/boletin-u09-avanzado-resuelto" class="elink">💪 Avanzado resuelto</a>
  <a href="/ApuntesRedes/boletines/boletin-u09-avanzado" class="elink">⭐ Avanzado por resolver</a>
</div>

---

## ✅ Criterios de evaluación cubiertos (RA6)

**RA6: Realiza tareas avanzadas de administración de red analizando y utilizando protocolos dinámicos de encaminamiento.**

| CE | Criterio | Dónde se cubre |
|---|---|---|
| g) | Configuración y uso de OSPF en un router | ✅ Puntos 6 y 7 + ⚡ Laboratorio (punto 9) |
| h) | Ruta por defecto con OSPF | ✅ Punto 8 + ⚡ Laboratorio (punto 9) |
| i) | Diagnóstico de incidencias en el encaminamiento | ✅ Punto 8 + ⚡ Laboratorio (punto 9) |

---

## 🚪 ¿Por dónde empiezo?

¿Vienes de la U08 y dominas las rutas estáticas? Perfecto, ese es el trampolín ideal: repasa la [U08 · Routing y ACLs](/ApuntesRedes/08-routing-acls) para tener frescos los comandos `ip route` y `show ip route`, y arranca en el [punto 1](/ApuntesRedes/09-routing-dinamico/01-de-estatico-a-dinamico), que parte justo de ahí: de estático a dinámico.

¿Ya sabes qué es OSPF y solo necesitas configurarlo? Ve directo al [punto 7](/ApuntesRedes/09-routing-dinamico/07-configuracion-ospf) y al [punto 8](/ApuntesRedes/09-routing-dinamico/08-ruta-por-defecto-y-diagnostico). Si vienes de cero en routing, no te saltes los puntos 1 a 3: los conceptos de LSA y SPF son la base de todo lo demás.

**📍 Primer punto:** [01 · De estático a dinámico](/ApuntesRedes/09-routing-dinamico/01-de-estatico-a-dinamico)  
**⏭️ Al acabar la unidad, continúa en [U10 · NAT y acceso a Internet](/ApuntesRedes/10-nat-internet).**
