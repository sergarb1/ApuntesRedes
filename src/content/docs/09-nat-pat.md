---
title: U09 — NAT y PAT
description: Disfraces para salir a Internet 🌐
---

<p><small>Disfraces para salir a Internet 🌐</small></p>

> 🗺️ **El mapa del curso:** 🛡️ ACLs → **🌐 AQUÍ ESTÁS (U09)** → 🗄️ Servicios → 📶 WiFi

---

*Tu oficina tiene 200 equipos con direcciones privadas (192.168.x.x) que Internet no sabe alcanzar. Aun así, todos navegan, sincronizan y videollaman con una sola IP pública. ¿Truco? No: NAT, el traductor de direcciones que convierte una limitación del mundo IPv4 en una infraestructura universal.*

Bienvenido a la unidad donde tu red privada sale al mundo. Tras la seguridad de la [UD8](/ApuntesRedes/08-acl-seguridad), aquí juegas con la frontera: qué es NAT, sus tipos (estático, dinámico, PAT), cómo se configura en el router Cisco, cómo publicar servicios hacia fuera (port forwarding) y qué problemas trae de regalo. Todo lo que enseñaste al router se pone a trabajar en la puerta de casa.

Esta unidad se lee como un **libro de 9 capítulos**: los 8 primeros son teoría en progresión y el 9º es el aterrizaje práctico con laboratorio.

---

## 🎯 Objetivo de la unidad

Al terminar, serás capaz de:

- Explicar por qué existe NAT y qué problema de agotamiento de IPv4 resuelve.
- Diferenciar NAT estático, dinámico y PAT (sobrecarga), y elegir el adecuado.
- Identificar inside/outside, local/global en cada sentido del tráfico.
- Configurar PAT en un router Cisco y verificarlo con `show ip nat translations`.
- Publicar servicios internos hacia Internet (NAT de destino / port forwarding).
- Diagnosticar problemas típicos: DNS roto tras NAT, aplicaciones que no funcionan, doble NAT.

---

## 🗺️ Mapa de la unidad

| Punto | Qué aprenderás | Nivel |
|---|---|---|
| [01 · ¿Qué es NAT?](/ApuntesRedes/09-nat-pat/01-que-es-nat) | El problema de IPv4 y la idea del traductor | Todos |
| [02 · Tipos de NAT](/ApuntesRedes/09-nat-pat/02-tipos-de-nat) | Estático, dinámico y PAT a vista de pájaro | Todos |
| [03 · NAT estático y dinámico](/ApuntesRedes/09-nat-pat/03-nat-estatico-y-dinamico) | Uno a uno y por pool | Todos |
| [04 · PAT (sobrecarga)](/ApuntesRedes/09-nat-pat/04-pat) | Puertos como identificador, tabla de traducciones | Clave |
| [05 · NAT de destino](/ApuntesRedes/09-nat-pat/05-nat-destino) | Port forwarding: publicar servicios | Todos |
| [06 · Tabla NAT y verificación](/ApuntesRedes/09-nat-pat/06-tabla-nat-y-verificacion) | show ip nat translations/statistics | Práctico |
| [07 · Problemas y soluciones](/ApuntesRedes/09-nat-pat/07-problemas-y-soluciones) | Lo que NAT rompe y cómo se arregla | Clave |
| [08 · Configuración completa](/ApuntesRedes/09-nat-pat/08-configuracion-completa) | El laboratorio paso a paso | Práctico |
| [09 · Cierre](/ApuntesRedes/09-nat-pat/09-cierre) | Sé el Paquete, Fireside, Laboratorio, Crucigrama… | Todos |

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

## ✅ Criterios de evaluación cubiertos (RA7)

**RA7: Configura y administra el acceso de las redes locales a servicios exteriores.**

| CE | Criterio | Dónde se cubre |
|---|---|---|
| a) | Salida de redes privadas a públicas | ✅ Puntos 1-4 + ⚡ Laboratorio (punto 9) |
| b) | NAT/PAT en el router | ✅ Puntos 3-4 y 8 + ⚡ Laboratorio (punto 9) |
| c) | Publicación de servicios internos | ✅ Punto 5 + 🧠 Atrévete a pensar (punto 9) |
| d) | Verificación y diagnóstico | ✅ Puntos 6-7 + 💬 Entrevista (punto 9) |

---

## 🚪 ¿Por dónde empiezo?

- ¿Las IPs privadas no te suenan? Repasa el [punto 4 de la UD3](/ApuntesRedes/03-direccionamiento-ip/04-ip-privadas-y-publicas): NAT nace de esa separación.
- ¿Ya conoces NAT de casa? El [punto 4 (PAT)](/ApuntesRedes/09-nat-pat/04-pat) es donde se explica de verdad cómo funciona tu router.

**📍 Primer punto:** [01 · ¿Qué es NAT?](/ApuntesRedes/09-nat-pat/01-que-es-nat)  
**⏭️ Al acabar la unidad, continúa en [UD10 · Servicios de red: DHCP, DNS y NTP](/ApuntesRedes/10-servicios-red).**
