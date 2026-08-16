---
title: U07 — VLANs
description: La oficina dividida 🏢
---

<p><small>La oficina dividida 🏢</small></p>

> 🗺️ **El mapa del curso:** 🔀 U06 → **🏢 AQUÍ ESTÁS (U07)** → 🧭 Routing → 🗣️ OSPF → 🌐 NAT → 🩺 Diagnóstico → ☁️ Cloud

---

*La empresa crece. Ventas no debe ver el tráfico de RRHH. IT no debe mezclarse con Dirección. Pero todos comparten los mismos switches, los mismos puertos y el mismo dominio de broadcast. ¿Solución? VLANs: redes virtuales dentro del mismo hardware.*

Viste en U06 que un switch aprende MACs, segmenta el unicast y —con ayuda de STP— sobrevive a los bucles. Ahora le toca el siguiente salto: que un solo switch físico se comporte como **varios switches lógicos**. Aquí entenderás por qué una VLAN es una "burbuja" de capa 2, cómo viajan varias VLANs por un mismo cable etiquetadas con **802.1Q**, cómo se separan los departamentos y —lo más importante— cómo volver a unirlos con routers o switches de capa 3.

Esta unidad es la más "de oficina real" del curso: es la configuración que verás en cualquier empresa seria. Cada punto es una pieza: la motivación y los tipos de VLAN, los trunks, el routing entre VLANs, los protocolos que lo complican (VTP, DTP) y la seguridad. Al final harás en Packet Tracer el montaje completo de una oficina segmentada por departamentos.

---

## 🎯 Objetivo de la unidad

Al terminar, serás capaz de:

- Explicar qué es una VLAN y por qué segmenta el dominio de broadcast dentro de un switch físico.
- Distinguir los tipos de VLAN (datos, nativa, voz, gestión) y cuándo usar asignación estática o dinámica.
- Configurar y verificar enlaces troncales 802.1Q, con su native VLAN y las VLANs permitidas.
- Habilitar inter-VLAN routing con router-on-a-stick y con SVIs en un switch capa 3.
- Explicar el funcionamiento y los riesgos de VTP y DTP, y por qué conviene desactivarlos.
- Aplicar medidas de seguridad en VLANs: VACL, PVLAN y mitigación del VLAN hopping.
- Diagnosticar incidencias típicas de VLANs con los comandos de verificación de Cisco.

---

## 🗺️ Mapa de la unidad

| Punto | Qué aprenderás | Nivel |
|---|---|---|
| [01 · ¿Qué es una VLAN?](/ApuntesRedes/07-vlans/01-que-es-una-vlan) | Red lógica, motivación, VLAN 1, tipos a vista de pájaro | Todos |
| [02 · Tipos de VLAN](/ApuntesRedes/07-vlans/02-tipos-de-vlan) | Datos, nativa, voz, gestión; estática vs dinámica | Todos |
| [03 · Trunks y 802.1Q](/ApuntesRedes/07-vlans/03-trunks-y-8021q) | La trama etiquetada, native VLAN y problemas clásicos | Todos |
| [04 · Inter-VLAN routing](/ApuntesRedes/07-vlans/04-inter-vlan-routing) | Por qué hace falta capa 3, router-on-a-stick | Todos |
| [05 · Switch capa 3 y SVIs](/ApuntesRedes/07-vlans/05-switch-capa3) | Routing en hardware, cuándo evita el cuello de botella | Medio |
| [06 · VTP y DTP](/ApuntesRedes/07-vlans/06-vtp-y-dtp) | Modos VTP, revision number, riesgos de DTP | Medio |
| [07 · Seguridad en VLANs](/ApuntesRedes/07-vlans/07-seguridad-en-vlans) | VACL, PVLAN, VLAN hopping y hardening | Medio |
| [08 · Configuración y verificación](/ApuntesRedes/07-vlans/08-configuracion-y-verificacion) | Escenario departamental paso a paso + troubleshooting | Medio |
| [09 · Cierre](/ApuntesRedes/07-vlans/09-cierre) | Be the Packet, Fireside, Laboratorio, Crucigrama… | Todos |

> 📖 **Flujo de lectura:** los 8 primeros puntos son teoría y configuración en progresión. El 9º es el aterrizaje práctico: léelo justo después del 8º y antes de abrir los boletines.

---

## 📝 Boletines de la unidad

> Practica con los pares del curso: empezar siempre el resuelto para ver el estilo y luego intentar el por-resolver.

<div class="ejercicio-links">
  <a href="/ApuntesRedes/boletines/boletin-u07-inicial-resuelto" class="elink">✅ Inicial resuelto</a>
  <a href="/ApuntesRedes/boletines/boletin-u07-inicial" class="elink">🟢 Inicial por resolver</a>
  <a href="/ApuntesRedes/boletines/boletin-u07-avanzado-resuelto" class="elink">💪 Avanzado resuelto</a>
  <a href="/ApuntesRedes/boletines/boletin-u07-avanzado" class="elink">⭐ Avanzado por resolver</a>
</div>

---

## ✅ Criterios de evaluación cubiertos (RA5)

**RA5: Configura redes locales virtuales identificando su campo de aplicación.**

| CE | Criterio | Dónde se cubre |
|---|---|---|
| a) | Ventajas de VLANs | ✅ Puntos 1 y 2 |
| b) | Implementación de VLANs | ✅ Puntos 2 y 8 + ⚡ Laboratorio |
| c) | Diagnóstico de incidencias | ✅ Puntos 3 y 8 + ⚡ Laboratorio |
| d) | Enlaces troncales | ✅ Puntos 3 y 8 |
| e) | Inter-VLAN con router | ✅ Puntos 4 y 5 + ⚡ Laboratorio |
| f) | Protocolos centralizados (VTP) | ✅ Punto 6 |

---

## 🚪 ¿Por dónde empiezo?

- ¿Necesitas refrescar el funcionamiento del switch (tabla MAC, dominios de broadcast, STP)? → Repasa la [U06 · Switching y STP](/ApuntesRedes/06-switching-stp), sobre todo los puntos de CAM table y broadcast.
- ¿Ya entiendes por qué dos VLANs no pueden verse entre sí? → Arranca directamente en el [punto 1](/ApuntesRedes/07-vlans/01-que-es-una-vlan). Los puntos 3, 4 y 8 son los que más se preguntan en el laboratorio.

**📍 Primer punto:** [01 · ¿Qué es una VLAN?](/ApuntesRedes/07-vlans/01-que-es-una-vlan)  
**⏭️ Al acabar la unidad, continúa en [U08 · Routing y ACLs](/ApuntesRedes/08-routing-acls).**