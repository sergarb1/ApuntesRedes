---
title: Enrutamiento dinámico con OSPF
description: El router que habla con sus vecinos y elige solo 🗣️
---

<p><small>El router que habla con sus vecinos y elige solo 🗣️</small></p>

> 🗺️ **El mapa del curso:** 🧭 Routing estático → **🗣️ AQUÍ ESTÁS** → 🌐 NAT → 🛡️ ACLs

---

*Tu red crece: ya no hay dos routers, hay doce, con enlaces que se caen, caminos alternativos y planes de sucursales nuevas. Escribir rutas estáticas a mano se convierte en un trabajo titánico con errores garantizados. ¿Y si los routers se contaran entre sí dónde está cada red y eligieran sus caminos solos? Eso es el enrutamiento dinámico, y OSPF es su estándar de facto en redes de empresa.*

Bienvenido a la unidad donde los routers aprenden a hablar. Partes de lo que sabes de la [unidad de enrutamiento estático](/ApuntesRedes/07-enrutamiento-estatico) (AD, métricas, tablas) y descubres el protocolo de enlace de estado: vecinos, adyacencias, LSAs, áreas, DR/BDR y coste. Al final, configuras OSPF de verdad y dejas que la red se cure sola de un enlace muerto.

Esta unidad se lee como un **libro de 9 capítulos**: los 8 primeros son teoría en progresión y el 9º es el aterrizaje práctico con laboratorio.

---

## 🎯 Objetivo de la unidad

Al terminar, serás capaz de:

- Explicar la diferencia entre enrutamiento estático y dinámico, y entre IGP y EGP.
- Comparar RIP y OSPF y justificar por qué OSPF domina en empresa.
- Describir el proceso OSPF: hellos, vecinos, adyacencias, base de datos LSDB y SPF.
- Explicar la jerarquía de áreas (backbone, ABR, ASBR) y su utilidad.
- Entender la elección de DR/BDR en redes multiacceso.
- Calcular el coste OSPF y manipularlo para elegir caminos.
- Configurar OSPF en routers Cisco con `router ospf` y `network ... area`.
- Propagar la ruta por defecto y verificar con `show ip ospf neighbor`, `show ip route`.

---

## 🗺️ Mapa de la unidad

| Punto | Qué aprenderás | Nivel |
|---|---|---|
| [01 · De estático a dinámico](/ApuntesRedes/08-ospf/01-de-estatico-a-dinamico) | Por qué existe el routing dinámico | Todos |
| [02 · IGP vs EGP, RIP vs OSPF](/ApuntesRedes/08-ospf/02-igp-vs-egp) | La familia de protocolos y sus clases | Todos |
| [03 · Conceptos OSPF](/ApuntesRedes/08-ospf/03-conceptos-ospf) | Vecinos, LSDB, SPF: el motor | Clave |
| [04 · Áreas y tipos de routers](/ApuntesRedes/08-ospf/04-areas-y-tipos-de-routers) | Backbone, ABR, ASBR y escalado | Todos |
| [05 · DR y BDR](/ApuntesRedes/08-ospf/05-dr-y-bdr) | La elección en redes multiacceso | Todos |
| [06 · El coste OSPF](/ApuntesRedes/08-ospf/06-coste-ospf) | Cómo se eligen los caminos | Clave |
| [07 · Configuración OSPF](/ApuntesRedes/08-ospf/07-configuracion-ospf) | `router ospf`, `network`, router-id | Práctico |
| [08 · Ruta por defecto y diagnóstico](/ApuntesRedes/08-ospf/08-ruta-por-defecto-y-diagnostico) | default-information originate y show | Avanzado |
| [09 · Cierre](/ApuntesRedes/08-ospf/09-cierre) | Sé el Router OSPF, Fireside, Laboratorio, Crucigrama… | Todos |

> 📖 **Flujo de lectura:** los 8 primeros puntos son teoría en progresión. El 9º es el aterrizaje práctico: léelo justo después del 8º y antes de abrir los boletines.

---

## 📝 Boletines de la unidad

> Practica con los pares del curso: mira 1-2 resueltos para coger el formato, luego intenta el por-resolver; consulta el resuelto solo cuando te atasques.

<div class="ejercicio-links">
  <a href="/ApuntesRedes/boletines/boletin-u08-inicial" class="elink">🟢 Inicial por resolver</a>
  <a href="/ApuntesRedes/boletines/boletin-u08-inicial-resuelto" class="elink">✅ Inicial resuelto</a>
  <a href="/ApuntesRedes/boletines/boletin-u08-avanzado" class="elink">⭐ Avanzado por resolver</a>
  <a href="/ApuntesRedes/boletines/boletin-u08-avanzado-resuelto" class="elink">💪 Avanzado resuelto</a>
</div>

---

## ✅ Criterios de evaluación cubiertos (RA6)

**RA6: Realiza tareas avanzadas de administración de red analizando y utilizando protocolos dinámicos de encaminamiento.**

| CE | Criterio | Dónde se cubre |
|---|---|---|
| g) | Se ha habilitado y configurado OSPF en un «router» | ✅ Puntos 6-7 + ⚡ Laboratorio (punto 9) |
| h) | Se ha establecido y propagado una ruta por defecto usando OSPF | ✅ Punto 8 + ⚡ Laboratorio (punto 9) |

> ℹ️ El **diagnóstico de incidencias** (punto 8) es contenido oficial de la unidad, pero no tiene CE propio: el c) de diagnóstico del PAR es específico de RIP, y el i) de algunos listados es de protocolos propietarios (fuera del alcance de estos apuntes).

---

## 🚪 ¿Por dónde empiezo?

- ¿Te tiembla el pulso con `ip route`? Repasa las [rutas estáticas](/ApuntesRedes/07-enrutamiento-estatico/03-rutas-estaticas) y la [distancia administrativa](/ApuntesRedes/07-enrutamiento-estatico/05-como-decide-el-router): OSPF se compara constantemente con ellas.
- ¿Ya dominas OSPF de teoría? → Salta a la [configuración](/ApuntesRedes/08-ospf/07-configuracion-ospf) y al [diagnóstico](/ApuntesRedes/08-ospf/08-ruta-por-defecto-y-diagnostico).

**📍 Primer punto:** [01 · De estático a dinámico](/ApuntesRedes/08-ospf/01-de-estatico-a-dinamico)  
**⏭️ Al acabar la unidad, continúa en [NAT y PAT](/ApuntesRedes/09-nat-pat).**
