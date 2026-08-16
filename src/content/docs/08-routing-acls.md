---
title: U08 — Routing y ACLs
description: El GPS perdido 🧭
---

<p><small>El GPS perdido 🧭</small></p>

> 🗺️ **El mapa del curso:** 🏢 U07 → **🧭 AQUÍ ESTÁS (U08)** → 🗣️ OSPF → 🌐 NAT → 🩺 Diagnóstico → ☁️ Cloud

---

*Un paquete de datos llega al borde de tu red interna. Sabe a qué edificio va (dirección IP), pero alguien tiene que decidir por qué carretera llevarlo hasta allí. Sin un router que consulte su tabla y elija la ruta, el paquete se queda parado en el arcén eternamente. El router es ese GPS silencioso que decide por todos.*

Bienvenido a la unidad donde tu red aprende a encontrar el camino. En U07 pusiste orden dentro de tu edificio: **VLANs** para separar departamentos, **trunks** para hablar entre switches y **encaminamiento inter-VLAN** para que una VLAN hablase con otra. Pero todo eso ocurre *dentro* de tu red de área local. ¿Y cuando un equipo de la VLAN de Informática quiere llegar a Internet, a otra sucursal o a un servidor que vive en otra subred? Ahí entran en juego el **routing** (elegir la ruta) y las **ACLs** (decidir a quién dejamos pasar por ella).

Esta unidad se lee como un **libro de 9 capítulos**: los 8 primeros son teoría en progresión y el 9º es el aterrizaje práctico con laboratorio. Y tranquilo, si vienes de la U07 ya olistes a router: lo que aquí hacemos es quitarle la carcasa, configurarlo de cero y ponerle listas de control de acceso.

---

## 🎯 Objetivo de la unidad

Al terminar, serás capaz de:

- Identificar los componentes de un router (CPU, RAM, NVRAM, Flash, ROM) y explicar su secuencia de arranque.
- Acceder al router por los distintos modos CLI y aplicar una configuración básica segura (hostname, contraseñas, SSH, interfaces).
- Configurar rutas estáticas y rutas por defecto, eligiendo entre siguiente salto e interfaz de salida.
- Explicar cómo decide un router qué ruta usar, aplicando el *longest prefix match* y la distancia administrativa.
- Diseñar ACLs estándar y extendidas, numeradas y nombradas, y colocarlas donde toca.
- Aplicar ACLs con `time-range` y `established` para escenarios reales (bloquear YouTube en horario laboral, permitir tráfico de retorno).
- Verificar y diagnosticar configuraciones con `show ip route`, `show access-lists`, `show running-config` y compañía.

---

## 🗺️ Mapa de la unidad

| Punto | Qué aprenderás | Nivel |
|---|---|---|
| [01 · Componentes del router](/ApuntesRedes/08-routing-acls/01-componentes-del-router) | Las tripas del router, memorias y secuencia de arranque | Todos |
| [02 · Configuración básica](/ApuntesRedes/08-routing-acls/02-configuracion-basica) | Modos CLI, configuración mínima segura y verificación | Todos |
| [03 · Rutas estáticas](/ApuntesRedes/08-routing-acls/03-rutas-estaticas) | `ip route`, next-hop vs salida, topología R1-R2 | Todos |
| [04 · Ruta por defecto](/ApuntesRedes/08-routing-acls/04-ruta-por-defecto) | 0.0.0.0/0, el último recurso y rutas flotantes | Todos |
| [05 · Cómo decide un router](/ApuntesRedes/08-routing-acls/05-como-decide-el-router) | Tabla de rutas, AD y longest prefix match | Clave |
| [06 · ACLs: concepto y tipos](/ApuntesRedes/08-routing-acls/06-acls-conceptos) | Qué es una ACL, tipos, dónde aplicarla | Todos |
| [07 · ACL estándar](/ApuntesRedes/08-routing-acls/07-acl-estandar) | Wildcards, colocación y verificación | Todos |
| [08 · ACL extendida y nombrada](/ApuntesRedes/08-routing-acls/08-acl-extendida-y-nombrada) | `eq puerto`, `time-range`, `established` y named ACLs | Avanzado |
| [09 · Cierre](/ApuntesRedes/08-routing-acls/09-cierre) | Be the Packet, Fireside, Laboratorio, Crucigrama… | Todos |

> 📖 **Flujo de lectura:** los 8 primeros puntos son teoría en progresión. El 9º es el aterrizaje práctico: léelo justo después del 8º y antes de abrir los boletines.

---

## 📝 Boletines de la unidad

> Practica con los pares del curso: empezar siempre el resuelto para ver el estilo y luego intentar el por-resolver.

<div class="ejercicio-links">
  <a href="/ApuntesRedes/boletines/boletin-u08-inicial-resuelto" class="elink">✅ Inicial resuelto</a>
  <a href="/ApuntesRedes/boletines/boletin-u08-inicial" class="elink">🟢 Inicial por resolver</a>
  <a href="/ApuntesRedes/boletines/boletin-u08-avanzado-resuelto" class="elink">💪 Avanzado resuelto</a>
  <a href="/ApuntesRedes/boletines/boletin-u08-avanzado" class="elink">⭐ Avanzado por resolver</a>
</div>

---

## ✅ Criterios de evaluación cubiertos (RA4)

**RA4: Administra las funciones básicas de un router estableciendo opciones de configuración.**

| CE | Criterio | Dónde se cubre |
|---|---|---|
| a) | LEDs del router | ✅ Punto 1 |
| b) | Acceso a configuración | ✅ Puntos 1 y 2 |
| c) | Secuencia de arranque | ✅ Punto 1 |
| d) | Comandos de configuración | ✅ Puntos 2 y 3 + ⚡ Laboratorio (punto 9) |
| f) | Rutas estáticas | ✅ Puntos 3 y 4 + ⚡ Laboratorio (punto 9) |
| i) | Filtrado de tráfico (ACLs) | ✅ Puntos 6 y 7 |
| j) | Listas de control de acceso | ✅ Puntos 7 y 8 + ⚡ Laboratorio (punto 9) |

---

## 🚪 ¿Por dónde empiezo?

- ¿Vienes de U07 y quieres recordar por qué las VLANs necesitan un router? → Repasa el [punto 4 de encaminamiento inter-VLAN](/ApuntesRedes/07-vlans/04-inter-vlan-routing).
- ¿Ya sabes lo básico? → Arranca directamente en el [punto 1](/ApuntesRedes/08-routing-acls/01-componentes-del-router).
- ¿Solo te interesan las ACLs? → Puedes saltar del [punto 2](/ApuntesRedes/08-routing-acls/02-configuracion-basica) al [punto 6](/ApuntesRedes/08-routing-acls/06-acls-conceptos), pero la tabla de rutas (puntos 3-5) te hará falta para entender la colocación.

**📍 Primer punto:** [01 · Componentes del router](/ApuntesRedes/08-routing-acls/01-componentes-del-router)  
**⏭️ Al acabar la unidad, continúa en [U09 · Routing dinámico](/ApuntesRedes/09-routing-dinamico).**