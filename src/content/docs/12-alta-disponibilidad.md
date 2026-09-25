---
title: Alta disponibilidad y redundancia
description: Diseñar para que fallar no importe 🔁
---

<p><small>Diseñar para que fallar no importe 🔁</small></p>

> 🗺️ **El mapa del curso:** 🗄️ Servicios → 📶 WiFi → **🔁 AQUÍ ESTÁS** → 🏁 Fin del viaje

---

*El switch principal se apaga a las 9:47 de un lunes. Nadie llama al servicio técnico. Nadie nota nada. No es magia: es una red diseñada para fallar bien, con caminos alternativos que se activan solos antes de que un usuario llegue a quejarse.*

Bienvenido a la última unidad del curso. Hasta ahora has construido redes que **funcionan**; aquí aprendes a construir redes que **siguen funcionando** cuando algo se rompe. STP y EtherChannel para no morir de bucles ni de cables cortados, stacking para que un switch no sea un punto único de fallo, HSRP para que el gateway nunca muera, rutas flotantes para sobrevivir a la caída de un enlace y un plan de continuidad para que la red se recupere con orden.

Esta unidad se lee como un **libro de 9 capítulos**: los 8 primeros son teoría en progresión y el 9º es el aterrizaje práctico con laboratorio.

---

## 🎯 Objetivo de la unidad

Al terminar, serás capaz de:

- Razonar sobre disponibilidad (los famosos "nueves"), SPOFs y el coste real del tiempo de parada.
- Usar STP como herramienta de redundancia (y no como enemigo): root bridge planificado, PortFast, BPDU Guard.
- Agregar enlaces con EtherChannel (LACP/PAgP) para ganar ancho de banda y tolerancia a fallos a la vez.
- Explicar el stacking de switches y las arquitecturas de chassis virtuales (VSS/MLAG).
- Configurar y verificar HSRP para dar redundancia de gateway mediante una IP virtual.
- Diseñar redundancia capa 3: rutas flotantes, ECMP y tracking con IP SLA.
- Montar un plan básico de continuidad: copias de seguridad de configuración, servicios duplicados y documentación.

---

## 🗺️ Mapa de la unidad

| Punto | Qué aprenderás | Nivel |
|---|---|---|
| [01 · Disponibilidad y SPOFs](/ApuntesRedes/12-alta-disponibilidad/01-disponibilidad-y-spofs) | Los nueves, el coste del parón y los puntos únicos de fallo | Todos |
| [02 · STP: redundancia sin bucles](/ApuntesRedes/12-alta-disponibilidad/02-stp-redundancia) | Recap de switching con ojos de HA: diseño y protecciones | Todos |
| [03 · EtherChannel](/ApuntesRedes/12-alta-disponibilidad/03-etherchannel) | LACP, PAgP, balanceo y verificación | Todos |
| [04 · Stacking y chassis virtuales](/ApuntesRedes/12-alta-disponibilidad/04-stacking) | StackWise, VSS, MLAG: varios equipos, un cerebro | Clave |
| [05 · FHRP: gateway redundante](/ApuntesRedes/12-alta-disponibilidad/05-fhrp) | HSRP, VRRP, GLBP: la IP virtual | Clave |
| [06 · HSRP en Cisco](/ApuntesRedes/12-alta-disponibilidad/06-hsrp-cisco) | Configuración, prioridades, preempt y verificación | Avanzado |
| [07 · Redundancia capa 3](/ApuntesRedes/12-alta-disponibilidad/07-redundancia-l3) | Rutas flotantes, ECMP, IP SLA y tracking | Avanzado |
| [08 · Plan de continuidad](/ApuntesRedes/12-alta-disponibilidad/08-plan-continuidad) | Backups, servicios duplicados, documentación | Todos |
| [09 · Cierre](/ApuntesRedes/12-alta-disponibilidad/09-cierre) | Sé el Paquete, Fireside, Laboratorio, Crucigrama… | Todos |

> 📖 **Flujo de lectura:** los 8 primeros puntos son teoría en progresión. El 9º es el aterrizaje práctico: léelo justo después del 8º y antes de abrir los boletines.

---

## 📝 Boletines de la unidad

> Practica con los pares del curso: empezar siempre el resuelto para ver el estilo y luego intentar el por-resolver.

<div class="ejercicio-links">
  <a href="/ApuntesRedes/boletines/boletin-u12-inicial" class="elink">🟢 Inicial por resolver</a>
  <a href="/ApuntesRedes/boletines/boletin-u12-inicial-resuelto" class="elink">✅ Inicial resuelto</a>
  <a href="/ApuntesRedes/boletines/boletin-u12-avanzado" class="elink">⭐ Avanzado por resolver</a>
  <a href="/ApuntesRedes/boletines/boletin-u12-avanzado-resuelto" class="elink">💪 Avanzado resuelto</a>
</div>

---

## ✅ Criterios de evaluación cubiertos (RA1/RA3/RA5/RA6)

| CE | Criterio | Dónde se cubre |
|---|---|---|
| RA3 | Administración de conmutadores con tolerancia a fallos | ✅ Puntos 2, 3 y 4 + ⚡ Laboratorio (punto 9) |
| RA5 | Segmentación segura y continua de la red | ✅ Puntos 2-5 |
| RA6 | Encaminamiento con redundancia | ✅ Puntos 5, 6 y 7 + 🧠 Atrévete a pensar (punto 9) |
| RA1 | Estructura de red tolerante a fallos | ✅ Puntos 1 y 8 + 💬 Entrevista (punto 9) |

---

## 🚪 ¿Por dónde empiezo?

- ¿STP te suena a chino? Repasa primero el [punto 5 (STP)](/ApuntesRedes/04-switching/05-stp-fundamentos): aquí damos por sabido que STP bloquea puertos para evitar bucles.
- ¿Vienes directo por el routing? → El trío [FHRP → HSRP → capa 3](/ApuntesRedes/12-alta-disponibilidad/05-fhrp) es tu camino.

**📍 Primer punto:** [01 · Disponibilidad y SPOFs](/ApuntesRedes/12-alta-disponibilidad/01-disponibilidad-y-spofs)  
**⏭️ Al acabar la unidad… enhorabuena: has llegado al final del curso. 🏁**
