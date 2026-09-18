---
title: U08 — ACLs y seguridad de red
description: El portero con lista y mal carácter 🛡️
---

<p><small>El portero con lista y mal carácter 🛡️</small></p>

> 🗺️ **El mapa del curso:** 🧭 Routing → 🗣️ OSPF → **🛡️ AQUÍ ESTÁS (U08)** → 🌐 NAT → 🗄️ Servicios

---

*Un paquete llega al router de la empresa desde la red de invitados y pide paso hacia el servidor de nóminas. Antes de que la tabla de rutas decida por dónde, un guardián silencioso revisa su origen, su destino y el puerto que solicita. "Tu nombre no está en la lista." El paquete se desvanece y nadie, ni siquiera el remitente, recibirá confirmación.*

Bienvenido a la unidad de la seguridad perimetral e interna. En la [UD6](/ApuntesRedes/06-enrutamiento-estatico) tu router aprendió a encaminar; aquí aprenderá a **decidir quién merece ser encaminado**. Las ACLs son el filtro más fundamental de la administración de redes: unas pocas líneas que definen qué tráfico pasa, cuándo pasa y por dónde deja de hacerlo.

Esta unidad se lee como un **libro de 6 capítulos**: los 5 primeros son teoría en progresión y el 6º es el aterrizaje práctico con laboratorio.

---

## 🎯 Objetivo de la unidad

Al terminar, serás capaz de:

- Explicar dónde actúan las ACLs en el flujo de un paquete (in/out por interfaz) y por qué el punto de vista del router lo es todo.
- Escribir ACLs estándar y extendidas, numeradas y nombradas, con wildcards correctos.
- Colocar cada tipo donde toca: extendidas cerca del origen, estándar cerca del destino.
- Aplicar listas a las líneas VTY para proteger la administración del equipo.
- Usar time-range y established para políticas con contexto temporal y de sesión.
- Configurar Port Security y elegir modo de violación según el entorno.

---

## 🗺️ Mapa de la unidad

| Punto | Qué aprenderás | Nivel |
|---|---|---|
| [01 · De las rutas a las ACLs](/ApuntesRedes/08-acl-seguridad/01-enrutamiento-y-acls) | El flujo del paquete y las dos aduanas del router | Todos |
| [02 · ACLs: concepto y tipos](/ApuntesRedes/08-acl-seguridad/02-acls-conceptos) | Qué es una ACL, estándar vs extendida, deny implícito | Todos |
| [03 · ACL estándar](/ApuntesRedes/08-acl-seguridad/03-acl-estandar) | Wildcards, colocación y verificación | Todos |
| [04 · ACL extendida y nombrada](/ApuntesRedes/08-acl-seguridad/04-acl-extendida-y-nombrada) | `eq puerto`, time-range, established y named ACLs | Avanzado |
| [05 · Port Security](/ApuntesRedes/08-acl-seguridad/05-port-security) | Seguridad de capa 2: MACs por puerto y modos de violación | Todos |
| [06 · Cierre](/ApuntesRedes/08-acl-seguridad/06-cierre) | Sé el Paquete, Fireside, Laboratorio, Crucigrama… | Todos |

> 📖 **Flujo de lectura:** los 5 primeros puntos son teoría en progresión. El 6º es el aterrizaje práctico: léelo justo después del 5º y antes de abrir los boletines.

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
| i) | Filtrado de tráfico | ✅ Puntos 1-3 + ⚡ Laboratorio (punto 6) |
| j) | Listas de control de acceso | ✅ Puntos 2-4 + 🧠 Atrévete a pensar (punto 6) |
| b) | Gestión segura del equipo | ✅ Puntos 1 y 5 + 💬 Entrevista (punto 6) |

---

## 🚪 ¿Por dónde empiezo?

- ¿La tabla de rutas te suena lejana? Repasa el [flujo de decisión del router](/ApuntesRedes/06-enrutamiento-estatico/05-como-decide-el-router) de la UD6: aquí damos eso por sabido.
- ¿Ya escribes ACLs? → Salta a [extendidas y nombradas](/ApuntesRedes/08-acl-seguridad/04-acl-extendida-y-nombrada), donde viven time-range y established.

**📍 Primer punto:** [01 · De las rutas a las ACLs](/ApuntesRedes/08-acl-seguridad/01-enrutamiento-y-acls)  
**⏭️ Al acabar la unidad, continúa en [UD9 · NAT y PAT](/ApuntesRedes/09-nat-pat).**
