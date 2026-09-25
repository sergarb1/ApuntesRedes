---
title: Trunking y enrutamiento inter-VLAN
description: Un cable para todas las VLANs y una frontera entre ellas 🌉
---

<p><small>Un cable para todas las VLANs y una frontera entre ellas 🌉</small></p>

> 🗺️ **El mapa del curso:** 🔀 Switching → **🌉 AQUÍ ESTÁS** → 🧭 Routing estático → 🗣️ OSPF

---

*El switch de acceso tiene 48 puertos y tres departamentos. El cable que sube al núcleo es uno solo. ¿Cómo viajan Ventas, RRHH e Informática por el mismo latiguillo sin mezclarse? Y cuando alguien de Ventas necesita hablar con RRHH, ¿quién construye la frontera con su aduana?*

Bienvenido a la unidad que conecta la segmentación con el enrutamiento. En la [unidad de switching](/ApuntesRedes/04-switching) creaste VLANs; aquí aprendes a **transportarlas entre switches** (trunks 802.1Q, native VLAN, VTP) y a **hacerlas hablar entre sí** (router-on-a-stick y switch de capa 3 con SVIs). Es el puente natural entre el mundo de la conmutación y el del encaminamiento.

Esta unidad se lee como un **libro de 8 capítulos**: los 7 primeros son teoría en progresión y el 8º es el aterrizaje práctico con laboratorio.

---

## 🎯 Objetivo de la unidad

Al terminar, serás capaz de:

- Configurar y verificar trunks 802.1Q con native VLAN y VLANs permitidas.
- Explicar la etiqueta 802.1Q y el papel de la native VLAN (y sus riesgos).
- Configurar router-on-a-stick con subinterfaces dot1Q.
- Configurar un switch capa 3 con `ip routing` y SVIs para enrutamiento inter-VLAN.
- Entender VTP y DTP, sus modos y por qué se desactivan en redes seguras.
- Aplicar hardening a enlaces: nonegotiate, VLAN de gestión separada, seguridad en trunks.
- Repartir IPs automáticamente con un **pool DHCP por VLAN** y activar el relay (`ip helper-address`) cuando el servidor está en otra red.

---

## 🗺️ Mapa de la unidad

| Punto | Qué aprenderás | Nivel |
|---|---|---|
| [01 · Trunks y 802.1Q](/ApuntesRedes/05-trunking-inter-vlan/01-trunks-y-8021q) | La etiqueta, el trunk y la native VLAN | Todos |
| [02 · Configuración y verificación](/ApuntesRedes/05-trunking-inter-vlan/02-configuracion-y-verificacion) | switchport mode trunk, allowed VLANs, show | Todos |
| [03 · Enrutamiento inter-VLAN](/ApuntesRedes/05-trunking-inter-vlan/03-inter-vlan-routing) | El problema de las VLANs aisladas y sus soluciones | Todos |
| [04 · Switch de capa 3 y SVIs](/ApuntesRedes/05-trunking-inter-vlan/04-switch-capa3) | ip routing, interface vlan X, rutas conectadas | Clave |
| [05 · VTP y DTP](/ApuntesRedes/05-trunking-inter-vlan/05-vtp-y-dtp) | Protocolos automáticos de Cisco y sus peligros | Todos |
| [06 · Seguridad en VLANs y trunks](/ApuntesRedes/05-trunking-inter-vlan/06-seguridad-en-vlans) | Native aparte, nonegotiate, VLAN de gestión | Clave |
| [07 · DHCP por VLAN](/ApuntesRedes/05-trunking-inter-vlan/07-dhcp-por-vlan) | Un pool por VLAN, relay y captura del DORA | Todos |
| [08 · Cierre](/ApuntesRedes/05-trunking-inter-vlan/08-cierre) | Sé el Paquete, Fireside, Laboratorio, Crucigrama… | Todos |

> 📖 **Flujo de lectura:** los 7 primeros puntos son teoría en progresión. El 8º es el aterrizaje práctico: léelo justo después del 7º y antes de abrir los boletines.

---

## 📝 Boletines de la unidad

> Practica con los pares del curso: empezar siempre el resuelto para ver el estilo y luego intentar el por-resolver.

<div class="ejercicio-links">
  <a href="/ApuntesRedes/boletines/boletin-u05-inicial" class="elink">🟢 Inicial por resolver</a>
  <a href="/ApuntesRedes/boletines/boletin-u05-inicial-resuelto" class="elink">✅ Inicial resuelto</a>
  <a href="/ApuntesRedes/boletines/boletin-u05-avanzado" class="elink">⭐ Avanzado por resolver</a>
  <a href="/ApuntesRedes/boletines/boletin-u05-avanzado-resuelto" class="elink">💪 Avanzado resuelto</a>
</div>

---

## ✅ Criterios de evaluación cubiertos (RA3/RA4/RA5)

| CE | Criterio | Dónde se cubre |
|---|---|---|
| RA3 | Administración de conmutadores (enlaces y segmentación) | ✅ Puntos 1-2, 5 y 7 + ⚡ Laboratorio (punto 8) |
| RA4 | Encaminamiento entre redes | ✅ Puntos 3-4 y 7 (relay) + 🧠 Atrévete a pensar (punto 8) |
| RA5 | Segmentación lógica y aislamiento | ✅ Puntos 1, 3 y 6 + 💬 Entrevista (punto 8) |

---

## 🚪 ¿Por dónde empiezo?

- ¿Las VLANs te suenan vagas? Repasa el [punto 8 de switching](/ApuntesRedes/04-switching/08-que-es-una-vlan): aquí seguimos exactamente desde donde te dejaste.
- ¿Ya conoces los trunks? → Salta al [enrutamiento inter-VLAN](/ApuntesRedes/05-trunking-inter-vlan/03-inter-vlan-routing), el corazón de la unidad.

**📍 Primer punto:** [01 · Trunks y 802.1Q](/ApuntesRedes/05-trunking-inter-vlan/01-trunks-y-8021q)  
**⏭️ Al acabar la unidad, continúa en [Enrutamiento estático](/ApuntesRedes/06-enrutamiento-estatico).**
